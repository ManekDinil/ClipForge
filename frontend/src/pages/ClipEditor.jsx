import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AICaptionEditor from '../components/editor/AICaptionEditor';
import SyncTimeline from '../components/timeline/SyncTimeline';
import ViralScoringBadge from '../components/editor/ViralScoringBadge';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';

export default function ClipEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [transcriptions, setTranscriptions] = useState([]);
  const [activeId, setActiveId] = useState(1);
  const [score, setScore] = useState(92); // Default mock score

  useEffect(() => {
    // Prioritize routing state, fallback to localStorage
    let data = null;
    if (location.state && location.state.videoData) {
      data = location.state.videoData;
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
        text: seg.text
      }));
      setTranscriptions(formatted);
      
      if (formatted.length > 0) {
        setActiveId(formatted[0].id);
        // If the backend provided a score on the first segment, use it
        if (data.segments[0].score) {
          setScore(data.segments[0].score);
        }
      }
    } else {
      // Fallback mock data if accessed directly without uploading
      setTranscriptions([
        { id: 1, start: 0, end: 2.5, text: 'Welcome to ClipForge.' },
        { id: 2, start: 2.5, end: 5.0, text: 'Upload a real video to see Gemini in action!' }
      ]);
    }
  }, []);

  // Two-way binding handler
  const handleTranscriptionEdit = (id, newText) => {
    setTranscriptions(prev => 
      prev.map(t => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const activeCaption = transcriptions.find(t => t.id === activeId);

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

        {/* Dual-Pane Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center">
            <AICaptionEditor activeCaption={activeCaption} />
            <div className="w-full max-w-sm mt-4">
              <ViralScoringBadge transcriptions={transcriptions} score={score} />
            </div>
          </div>
          
          {/* Right Pane: Sync Timeline */}
          <div className="lg:col-span-7 xl:col-span-8">
            <SyncTimeline 
              transcriptions={transcriptions}
              activeId={activeId}
              onTranscriptionEdit={handleTranscriptionEdit}
              onSetActiveId={setActiveId}
            />
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
