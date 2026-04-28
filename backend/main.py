import os
import time
import json
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai

# Explicitly load the .env file from the backend directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI(title="ClipForge API")

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for local dev
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

@app.get("/")
def read_root():
    return {"message": "Welcome to ClipForge API"}

@app.post("/process-video")
async def process_video(file: UploadFile = File(...)):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")

    if not file.filename.endswith(".mp4"):
        raise HTTPException(status_code=400, detail="Only .mp4 files are supported")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        # 1. Save uploaded file locally
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        # 2. Upload to Gemini File API
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
        prompt = """
        Identify the most viral 30-60 second segments in this video. 
        For each segment, provide a start/end timestamp and a high-accuracy transcription for captions.
        Ensure your response is valid JSON. Use this schema:
        {
          "segments": [
            {
              "start": 0.0,
              "end": 30.5,
              "text": "Transcription goes here...",
              "score": 95
            }
          ]
        }
        """
        print("Prompting Gemini 1.5 Pro...")
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        response = model.generate_content(
            [video_file, prompt],
            generation_config={"response_mime_type": "application/json"}
        )

        # 5. Clean up from Gemini API
        genai.delete_file(video_file.name)

        # 6. Parse and return JSON
        result = json.loads(response.text)
        return result

    except Exception as e:
        print(f"Error processing video: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up local file
        if os.path.exists(file_path):
            os.remove(file_path)
