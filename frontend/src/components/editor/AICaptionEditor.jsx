import React from 'react';
import { Play } from 'lucide-react';

export default function AICaptionEditor({ activeCaption }) {
  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* 9:16 Video Container Placeholder */}
      <div className="relative w-full aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-surface shadow-[0_0_30px_rgba(57,255,20,0.05)] flex items-center justify-center">
        
        {/* Placeholder video background details */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black opacity-80"></div>
        <Play className="w-16 h-16 text-surface/50" />
        
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
      
      {/* Playback Controls (Mock) */}
      <div className="mt-6 flex items-center gap-4 bg-surface px-6 py-3 rounded-full border border-gray-800">
        <button className="text-gray-400 hover:text-accent transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-accent text-black rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(57,255,20,0.3)]">
          <Play className="w-5 h-5 fill-current ml-1" />
        </button>
        <button className="text-gray-400 hover:text-accent transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
        </button>
      </div>
    </div>
  );
}
