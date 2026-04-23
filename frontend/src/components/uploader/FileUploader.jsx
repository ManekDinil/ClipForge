import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, CheckCircle2, Loader2, FileVideo } from 'lucide-react';

export default function FileUploader({ onUploadComplete }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState(null);

  // Memoized callback to ensure high performance and prevent unnecessary re-renders
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setIsProcessing(true);

    // Simulate the transition into a 'Processing' state
    // In the future, this is where we'd start the FFmpeg/Whisper pipeline
    setTimeout(() => {
      setIsProcessing(false);
      if (onUploadComplete) {
        onUploadComplete(selectedFile);
      }
    }, 2500);
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1,
    disabled: isProcessing || file !== null
  });

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center w-full p-12 text-center rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out cursor-pointer overflow-hidden
          ${isDragActive ? 'border-accent bg-accent/10 shadow-[0_0_30px_rgba(57,255,20,0.2)]' : 'border-gray-700 bg-surface hover:border-accent/50'}
          ${isProcessing || file ? 'cursor-default border-accent/30' : ''}
        `}
      >
        <input {...getInputProps()} />

        {/* Dynamic State Rendering */}
        {!file && !isProcessing && (
          <>
            <div className={`p-4 rounded-full mb-4 transition-transform duration-300 ${isDragActive ? 'scale-110 bg-accent/20' : 'bg-[#252525]'}`}>
              <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-accent' : 'text-gray-400'}`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {isDragActive ? 'Drop your video here' : 'Drag & drop a video'}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              MP4, MOV, AVI, or MKV up to 2GB
            </p>
            <button className="px-6 py-2.5 rounded-full bg-[#252525] text-white border border-gray-700 hover:border-accent/50 transition-colors text-sm font-medium">
              Browse Files
            </button>
          </>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Analyzing Video</h3>
            <p className="text-accent text-sm animate-pulse">Running AI pipeline...</p>
          </div>
        )}

        {file && !isProcessing && (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div className="p-4 rounded-full bg-accent/20 mb-4">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Upload Complete!</h3>
            <div className="flex items-center gap-2 text-gray-300 text-sm bg-[#252525] px-4 py-2 rounded-lg mt-2">
              <FileVideo className="w-4 h-4 text-accent" />
              <span className="truncate max-w-[200px]">{file.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
