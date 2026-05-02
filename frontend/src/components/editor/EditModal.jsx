import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import AICaptionEditor from './AICaptionEditor';

export default function EditModal({ clip, onClose, onSave }) {
  const [text, setText] = useState(clip.title);
  const [showCaptions, setShowCaptions] = useState(true);
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [fontSize, setFontSize] = useState(36);
  const [captionPos, setCaptionPos] = useState(35); // top percentage

  // Focus lock and escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSave = () => {
    onSave(clip.id, text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-surface border border-gray-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: Video Preview */}
        <div className="w-full md:w-1/2 p-6 bg-[#0a0a0a] flex items-center justify-center border-r border-gray-800">
          <AICaptionEditor 
            clip={clip} 
            activeClipUrl={clip.clipUrl} 
            videoRef={null} 
            showCaptions={showCaptions}
            fontFamily={fontFamily}
            fontSize={fontSize}
            captionPos={captionPos}
            setCaptionPos={setCaptionPos}
          />
        </div>

        {/* Right Side: Edit Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Edit Caption</h2>
            <button 
              onClick={onClose}
              className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
            <label className="text-sm font-medium text-gray-400">Caption Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 bg-black border border-gray-800 rounded-xl p-4 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none transition-all"
              placeholder="Enter your viral caption..."
            />
            <p className="text-xs text-gray-500">
              This text will be overlaid directly on the video segment from {clip.start}s to {clip.end}s.
            </p>

            {/* Style Controls */}
            <div className="flex flex-col gap-5 pt-4 border-t border-gray-800">
              <h3 className="text-white font-semibold">Caption Styling</h3>
              
              {/* Toggle Captions */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Show Captions</span>
                <button 
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${showCaptions ? 'bg-accent' : 'bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${showCaptions ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Font Family */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Font Family</label>
                <select 
                  value={fontFamily} 
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="bg-black border border-gray-800 rounded-lg p-2.5 text-white outline-none focus:border-accent text-sm"
                >
                  <option value="font-sans">Sans Serif (Modern)</option>
                  <option value="font-serif">Serif (Classic)</option>
                  <option value="font-mono">Monospace (Code)</option>
                </select>
              </div>

              {/* Font Size */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">Font Size</label>
                  <span className="text-sm font-mono text-accent">{fontSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="16" max="72" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
              
              <p className="text-xs text-accent/80 mt-2 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full"></span>
                Tip: You can drag the captions directly on the video preview to reposition them.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-black text-sm font-bold shadow-lg hover:scale-105 transition-transform"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
