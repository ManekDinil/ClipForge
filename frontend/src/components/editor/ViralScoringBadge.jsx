import React, { useState } from 'react';
import { TrendingUp, Copy, Check } from 'lucide-react';

export default function ViralScoringBadge({ score = 92, transcriptions = [] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Format transcriptions into a single string
    const fullText = transcriptions.map(t => t.text).join(' ');
    const hashtags = '\n\n#ClipForge #Viral #Shorts #Trending';
    const finalCaption = fullText + hashtags;

    navigator.clipboard.writeText(finalCaption).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full mt-6 bg-surface border border-gray-800 rounded-3xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Viral Potential
        </h3>
        <span className="text-3xl font-extrabold text-accent">
          {score}<span className="text-sm text-gray-500 font-medium">/100</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#151515] rounded-full h-3 mb-2 border border-gray-800 overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-accent rounded-full relative"
          style={{ width: `${score}%` }}
        >
          {/* Subtle shine effect on the progress bar */}
          <div className="absolute inset-0 bg-white/20 w-1/2 skew-x-12 animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-right mb-6">Highly engaging retention curve predicted</p>

      {/* Action Button */}
      <button 
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] hover:bg-[#252525] border border-gray-700 hover:border-accent/50 text-white font-medium rounded-xl transition-all duration-300 group"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-accent" />
            <span className="text-accent">Copied to Clipboard!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            Copy for Social Media
          </>
        )}
      </button>
    </div>
  );
}
