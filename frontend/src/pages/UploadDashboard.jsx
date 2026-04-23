import React, { useState } from 'react';
import FileUploader from '../components/uploader/FileUploader';
import { ArrowLeft, Video } from 'lucide-react';

export default function UploadDashboard({ onNavigateBack, onProceedToEditor }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUploadComplete = (file) => {
    setUploadedFile(file);
    // Future integration: move to the Editor suite
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation / Header */}
        <button 
          onClick={onNavigateBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-surface rounded-xl border border-accent/30 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
            <Video className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            New Project
          </h1>
        </div>
        
        <p className="text-gray-400 text-lg mb-12">
          Upload your raw, long-form video to let ClipForge automatically extract the best viral moments.
        </p>

        {/* Upload Zone */}
        <div className="bg-surface rounded-2xl border border-gray-800 p-6 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow behind the uploader */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent opacity-[0.02] blur-[80px] rounded-full pointer-events-none"></div>
          
          <FileUploader onUploadComplete={handleUploadComplete} />

          {uploadedFile && (
            <div className="mt-8 flex justify-center animate-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={onProceedToEditor}
                className="px-8 py-4 bg-accent text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(57,255,20,0.3)]"
              >
                Proceed to Editor &rarr;
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
