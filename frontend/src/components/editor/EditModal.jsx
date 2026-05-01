import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import AICaptionEditor from './AICaptionEditor';

export default function EditModal({ clip, onClose, onSave }) {
  const [text, setText] = useState(clip.text);

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
            activeCaption={{ text }} 
            activeClipUrl={clip.clipUrl} 
            videoRef={null} // We don't need external ref control here
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

          <div className="flex-1 flex flex-col gap-4">
            <label className="text-sm font-medium text-gray-400">Caption Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 bg-black border border-gray-800 rounded-xl p-4 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none transition-all"
              placeholder="Enter your viral caption..."
            />
            <p className="text-xs text-gray-500">
              This text will be overlaid directly on the video segment from {clip.start}s to {clip.end}s.
            </p>
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
