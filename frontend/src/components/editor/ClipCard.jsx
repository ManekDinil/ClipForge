import React, { useRef, useState } from 'react';
import { Calendar, Edit3, Scissors, Play } from 'lucide-react';

export default function ClipCard({ clip, onEdit }) {
  const videoRef = useRef(null);

  const [activeSubtitle, setActiveSubtitle] = useState("");

  const handleTimeUpdate = (e) => {
    // Current time of the clip playback
    const time = e.target.currentTime;
    
    // We need to check if the subtitles are relative to the clip start or global.
    // Gemini returns global timestamps. Let's assume global for now.
    const currentSub = (clip.subtitles || []).find(
      s => time + clip.start >= s.start && time + clip.start <= s.end
    );
    setActiveSubtitle(currentSub ? currentSub.text : "");
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Playback failed", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Optional: reset to beginning on hover out
      // videoRef.current.currentTime = 0; 
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full group transition-all duration-500 hover:-translate-y-2">
      {/* Video Container */}
      <div
        className="relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-lg cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onEdit(clip.id)}
      >
        {clip.clipUrl ? (
          <video
            ref={videoRef}
            src={clip.clipUrl}
            className="absolute inset-0 w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            loop
            muted
            playsInline
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <span className="text-gray-500 text-sm">Processing...</span>
          </div>
        )}

        {/* Time Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono text-white">
          {formatTime(clip.start)} {formatTime(clip.end)}
        </div>

        {/* Overlay Play Icon (visible when not hovered) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm group-hover:opacity-0 transition-opacity">
            <Play className="w-5 h-5 text-white ml-1" />
          </div>
        </div>

        {/* Caption Overlay (Premium Outline Style) */}
        {activeSubtitle && (
          <div className="absolute top-[35%] left-0 w-full px-4 flex justify-center pointer-events-none transition-all duration-300 transform scale-105">
            <p 
              className="text-2xl font-black text-white text-center leading-tight uppercase tracking-tighter"
              style={{
                WebkitTextStroke: '2px black',
                textShadow: '0 0 15px rgba(0,0,0,0.5), 0 5px 5px rgba(0,0,0,0.8)',
                paintOrder: 'stroke fill'
              }}
            >
              {activeSubtitle}
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4 text-gray-400">
            <button className="hover:text-white transition-colors" title="Schedule">
              <Calendar className="w-4 h-4" />
            </button>
            <button
              className="hover:text-accent transition-colors"
              title="Edit Caption"
              onClick={() => onEdit(clip.id)}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button className="hover:text-white transition-colors" title="Trim">
              <Scissors className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-white px-1 line-clamp-2">
          {clip.title || `Viral Clip ${clip.id}`}
        </h3>

        {clip.score && (
          <div className="flex gap-2 px-1">
            <span className="text-[10px] font-medium border border-gray-700 text-gray-300 px-2 py-1 rounded-md">
              Score: {clip.score}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
