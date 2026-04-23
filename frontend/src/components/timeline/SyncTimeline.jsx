import React from 'react';
import { Clock, Edit3 } from 'lucide-react';

export default function SyncTimeline({ transcriptions, activeId, onTranscriptionEdit, onSetActiveId }) {
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-[600px] bg-surface border border-gray-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
      <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-surface/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-accent" />
          Transcription Timeline
        </h3>
        <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-black rounded-full border border-gray-800">
          Sync Active
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {transcriptions.map((t) => {
          const isActive = t.id === activeId;
          return (
            <div 
              key={t.id} 
              onClick={() => onSetActiveId(t.id)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                ${isActive 
                  ? 'border-accent bg-accent/5 shadow-[0_0_15px_rgba(57,255,20,0.05)]' 
                  : 'border-gray-800 bg-[#151515] hover:border-gray-600'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-gray-500'}`} />
                <span className={`text-xs font-mono font-medium ${isActive ? 'text-accent' : 'text-gray-400'}`}>
                  {formatTime(t.start)} - {formatTime(t.end)}
                </span>
              </div>
              
              <textarea
                value={t.text}
                onChange={(e) => onTranscriptionEdit(t.id, e.target.value)}
                rows={2}
                className="w-full bg-transparent text-white text-sm focus:outline-none resize-none leading-relaxed"
                placeholder="Enter caption text..."
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
