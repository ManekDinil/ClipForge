import React from 'react';
import { Play } from 'lucide-react';

export default function AICaptionEditor({ activeCaption, activeClipUrl, videoRef, onTimeUpdate }) {
  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* 9:16 Video Container */}
      <div className="relative w-full h-[600px] aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-surface shadow-[0_0_30px_rgba(57,255,20,0.05)] flex items-center justify-center">
        
        {activeClipUrl ? (
          <video 
            key={activeClipUrl}
            ref={videoRef}
            src={activeClipUrl} 
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            onTimeUpdate={(e) => onTimeUpdate && onTimeUpdate(e.target.currentTime)}
            loop 
            muted 
            playsInline 
            autoPlay
            controls
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black opacity-80"></div>
            <Play className="w-16 h-16 text-surface/50" />
          </>
        )}
        
        {/* Safe Zone Guides (Optional UI detail for premium feel) */}
        <div className="absolute inset-4 border border-dashed border-gray-700/30 rounded-2xl pointer-events-none"></div>

        {/* Dynamic Caption Overlay */}
        <div className="absolute top-[60%] left-0 w-full px-6 flex justify-center">
          <p className="text-3xl md:text-4xl font-extrabold text-white text-center leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{
            WebkitTextStroke: '1px black'
          }}>
            <span className="text-accent">{activeCaption?.text || "No active caption"}</span>
          </p>
        </div>
      </div>
      
    </div>
  );
}
