import os
import time
import json
import traceback
import uuid
import ffmpeg
import imageio_ffmpeg
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import google.generativeai as genai

# Explicitly load the .env file from the backend directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
print(f'Attempting to load .env from: {os.path.join(BASE_DIR, ".env")}')
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI(title="ClipForge API")

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Explicit frontend ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    print("WARNING: GEMINI_API_KEY not found in environment variables.")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
EXPORTS_DIR = "exports"
os.makedirs(EXPORTS_DIR, exist_ok=True)

app.mount("/exports", StaticFiles(directory="exports"), name="exports")

@app.get("/")
def read_root():
    return {"message": "Welcome to ClipForge API"}

@app.post("/process-video")
async def process_video(request: Request, file: UploadFile = File(...)):
    print('--- New Request Received ---')
    print('DEBUG: Request received!')
    try:
        if not API_KEY:
            raise HTTPException(status_code=500, detail='API Key is missing from .env file')

        if not file.filename.endswith(".mp4"):
            raise HTTPException(status_code=400, detail="Only .mp4 files are supported")

        os.makedirs(UPLOAD_DIR, exist_ok=True)
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        
        # 1. Save uploaded file locally
        print(f'DEBUG: Attempting to save file to: {file_path}')
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        # 2. Upload to Gemini File API
        print('DEBUG: Starting Gemini upload...')
        print(f"Uploading {file.filename} to Gemini...")
        video_file = genai.upload_file(path=file_path)

        # 3. Wait for processing
        print("Waiting for video processing to complete...")
        while video_file.state.name == "PROCESSING":
            time.sleep(2)
            video_file = genai.get_file(video_file.name)
            
        if video_file.state.name == "FAILED":
            raise Exception("Gemini failed to process the video.")

        # 4. Prompt the model
        prompt = (
            'Analyze the video and find the most engaging and viral moments. '
            'Extract a maximum of 5 distinct clips. Each clip MUST be at least 15 seconds long and STRICTLY no longer than 60 seconds. '
            'If a moment is longer than 60 seconds, pick the most impactful 60-second window within it. '
            'Do NOT return granular word-by-word transcriptions for the "title". '
            'Return a JSON object strictly following this format: '
            '{"segments": [{"start": float, "end": float, "title": string, "score": int, "subtitles": [{"start": float, "end": float, "text": string}]}]} '
            'where "title" is a catchy viral hook, and "subtitles" is a phrase-by-phrase transcription synchronized with the audio.'
        )
        print("Prompting Gemini Flash Latest...")
        model = genai.GenerativeModel(model_name="gemini-flash-latest")
        response = model.generate_content(
            [video_file, prompt],
            generation_config={"response_mime_type": "application/json"},
            request_options={"timeout": 600}
        )

        # 5. Clean up from Gemini API
        try:
            genai.delete_file(video_file.name)
        except Exception as e:
            print(f"Warning: Failed to delete Gemini file: {e}")

        # 6. Parse and return JSON
        raw_text = response.text.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        
        try:
            result = json.loads(raw_text.strip(), strict=False)
        except json.JSONDecodeError as e:
            print(f"JSON Parse Error: {e}\nRaw Text from Gemini:\n{raw_text}")
            raise HTTPException(status_code=502, detail="AI generated incomplete or malformed data. Please try again.")
        
        if isinstance(result, list):
            result = {"segments": result}
            
        # 7. Trim video physically
        segments = result.get('segments', [])
        for i, segment in enumerate(segments):
            start = segment.get('start', 0)
            end = segment.get('end', 0)
            clip_filename = f"clip_{uuid.uuid4().hex[:8]}_{i}.mp4"
            export_path = os.path.join(EXPORTS_DIR, clip_filename)
            
            try:
                # Enforce hard 60s limit as a fallback
                duration = end - start
                if duration > 60:
                    print(f"Warning: Segment {i} exceeds 60s ({duration}s). Truncating to 60s.")
                    end = start + 60
                    duration = 60

                print(f"Trimming segment {i}: {start}s to {end}s...")
                # Extract clip using ffmpeg-python and imageio-ffmpeg bundled binary
                ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
                (
                    ffmpeg
                    .input(file_path, ss=start, t=duration)
                    .output(export_path, preset='ultrafast', crf=28)
                    .run(cmd=ffmpeg_exe, overwrite_output=True, capture_stdout=True, capture_stderr=True)
                )
                
                # Dynamic clip URL based on the request's host
                base_url = str(request.base_url).rstrip('/')
                segment['clipUrl'] = f"{base_url}/exports/{clip_filename}"
            except ffmpeg.Error as ffmpeg_err:
                err_msg = ffmpeg_err.stderr.decode('utf8') if ffmpeg_err.stderr else str(ffmpeg_err)
                print(f"Warning: Failed to extract clip {i}:\n{err_msg}")
                segment['clipUrl'] = None
            except Exception as e:
                print(f"Warning: Failed to extract clip {i}: {e}")
                segment['clipUrl'] = None

        return result

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f'Gemini Error: {str(e)}')
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up local file
        if 'file_path' in locals() and os.path.exists(file_path):
            os.remove(file_path)
