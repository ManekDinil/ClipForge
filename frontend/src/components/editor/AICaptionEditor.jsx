import React from 'react';
import { Play } from 'lucide-react';

export default function AICaptionEditor({ 
  clip, activeClipUrl, videoRef, onTimeUpdate,
  showCaptions = true, fontFamily = 'font-sans', fontSize = 36, captionPos = 35, setCaptionPos
}) {
  const [activeSubtitle, setActiveSubtitle] = React.useState("");
  const containerRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handlePointerDown = (e) => {
    if (!setCaptionPos) return;
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !containerRef.current || !setCaptionPos) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Boundary check (5% to 80%) to avoid controls
    if (newY < 5) newY = 5;
    if (newY > 80) newY = 80;
    
    setCaptionPos(newY);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  const handleTimeUpdate = (e) => {
    const time = e.target.currentTime;
    // Sync with global subtitles timestamps
    const currentSub = (clip?.subtitles || []).find(
      s => time + (clip?.start || 0) >= s.start && time + (clip?.start || 0) <= s.end
    );
    setActiveSubtitle(currentSub ? currentSub.text : "");
    if (onTimeUpdate) onTimeUpdate(time);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* 9:16 Video Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[600px] aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-surface shadow-[0_0_30px_rgba(57,255,20,0.05)] flex items-center justify-center touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        
        {activeClipUrl ? (
          <video 
            key={activeClipUrl}
            ref={videoRef}
            src={activeClipUrl} 
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            onTimeUpdate={handleTimeUpdate}
            loop 
            muted={false} // Unmute for focused editing as requested
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

        {/* Dynamic Caption Overlay (Premium Outline Style) */}
        {showCaptions && activeSubtitle && (
          <div 
            className={`absolute left-0 w-full px-6 flex justify-center transition-all ${isDragging ? 'duration-0 cursor-grabbing' : 'duration-300 cursor-grab transform scale-105'}`}
            style={{ top: `${captionPos}%` }}
            onPointerDown={handlePointerDown}
          >
            <p 
              className={`font-black text-white text-center leading-tight uppercase tracking-tighter ${fontFamily} select-none`}
              style={{
                fontSize: `${fontSize}px`,
                WebkitTextStroke: '3px black',
                textShadow: '0 0 20px rgba(0,0,0,0.5), 0 10px 10px rgba(0,0,0,0.8)',
                paintOrder: 'stroke fill'
              }}
            >
              {activeSubtitle}
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
}
