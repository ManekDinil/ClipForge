import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ClipCard from '../components/editor/ClipCard';
import EditModal from '../components/editor/EditModal';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';

export default function ClipEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [transcriptions, setTranscriptions] = useState([]);
  const [editingClipId, setEditingClipId] = useState(null);
  const videoUrl = location.state?.videoUrl;

  useEffect(() => {
    // Prioritize routing state, fallback to localStorage
    let data = null;
    const aiData = location.state?.aiData;
    
    if (aiData) {
      data = aiData;
    } else {
      const stored = localStorage.getItem('clipforge_transcription');
      if (stored) {
        try {
          data = JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing stored transcriptions:", e);
        }
      }
    }

    if (data && data.segments) {
      const formatted = data.segments.map((seg, index) => ({
        id: index + 1,
        start: seg.start,
        end: seg.end,
        title: seg.title || seg.text || `Viral Moment ${index + 1}`,
        subtitles: seg.subtitles || [],
        clipUrl: seg.clipUrl,
        score: seg.score
      }));
      setTranscriptions(formatted);
      // Format received data
    } else {
      // Fallback mock data if accessed directly without uploading
      setTranscriptions([
        { id: 1, start: 0, end: 5.0, title: 'Welcome to ClipForge', subtitles: [{start: 0, end: 2.5, text: 'Welcome to ClipForge.'}, {start: 2.5, end: 5.0, text: 'The future of AI video.'}] },
        { id: 2, start: 5.0, end: 10.0, title: 'AI Automation', subtitles: [{start: 5.0, end: 10.0, text: 'Upload a video to see the magic!'}] }
      ]);
    }
  }, []);

  const handleSaveTitle = (id, newTitle) => {
    setTranscriptions(prev => 
      prev.map(t => (t.id === id ? { ...t, title: newTitle } : t))
    );
    setEditingClipId(null);
  };

  const editingClip = transcriptions.find(t => t.id === editingClipId);

  return (
    <div className="min-h-screen bg-background pt-24 px-4 sm:px-6 lg:px-8 font-sans pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-full bg-surface border border-gray-800 hover:border-accent hover:text-accent transition-colors text-gray-400"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" /> AI Caption Editor
              </h1>
              <p className="text-sm text-gray-400">Project: Viral_Moment_01.mp4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-full bg-surface border border-gray-700 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Export Video
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-black text-sm font-bold shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:scale-105 transition-transform">
              <Save className="w-4 h-4" /> Save Project
            </button>
          </div>
        </div>

        {/* Gallery Layout */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {transcriptions.map(clip => (
            <ClipCard 
              key={clip.id} 
              clip={clip} 
              onEdit={(id) => setEditingClipId(id)} 
            />
          ))}
        </div>

        {/* Edit Modal Overlay */}
        {editingClipId && editingClip && (
          <EditModal 
            clip={editingClip} 
            onClose={() => setEditingClipId(null)}
            onSave={handleSaveTitle}
          />
        )}
        
      </div>
    </div>
  );
}
