import React from 'react';
import { Scissors, ScanFace, Sparkles, Wand2 } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="features">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-accent/30 mb-6 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold text-accent tracking-widest uppercase">AI Editing Models</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            AI that understands every <br className="hidden md:block" /> pixel of your video
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: ClipForge AI (Viral Moments) */}
          <div className="group bg-[#1A1A1A]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            
            {/* Mock UI Visual */}
            <div className="w-full bg-black/50 rounded-2xl border border-white/5 p-6 mb-8 h-64 flex flex-col justify-center items-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Prompt Box */}
              <div className="w-full max-w-sm bg-[#1A1A1A] border border-gray-800 rounded-lg p-3 flex items-center gap-3 mb-6 shadow-xl relative z-10">
                <Wand2 className="w-4 h-4 text-accent" />
                <span className="text-gray-400 text-sm font-mono typewriter-effect">Find the funniest moment...</span>
                <div className="ml-auto w-2 h-4 bg-accent animate-pulse"></div>
              </div>

              {/* Video Timeline Mock */}
              <div className="w-full max-w-sm h-12 bg-[#252525] rounded-md overflow-hidden relative flex items-center shadow-lg">
                <div className="absolute left-0 top-0 bottom-0 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIvPjxwb2x5Z29uIHBvaW50cz0iMCw0MCAyMCw0MCAyMCwyMCAwLDIwIi8+PHBvbHlnb24gcG9pbnRzPSI0MCwwIDQwLDIwIDIwLDIwIDIwLDAiLz48L2c+PC9zdmc+')] opacity-20"></div>
                {/* Highlighted Clip */}
                <div className="absolute left-[30%] right-[40%] top-0 bottom-0 bg-accent/20 border-x-2 border-accent flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-accent drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mt-auto">
              <h3 className="text-2xl font-bold text-white mb-3">ClipForge AI Model</h3>
              <p className="text-[#A1A1AA] leading-relaxed text-lg">
                Our proprietary CVAE architecture analyzes context, pacing, and retention data to automatically extract the most viral segments from hours of raw footage in seconds.
              </p>
            </div>
          </div>

          {/* Card 2: Smart Reframe */}
          <div className="group bg-[#1A1A1A]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            
            {/* Mock UI Visual */}
            <div className="w-full bg-black/50 rounded-2xl border border-white/5 p-6 mb-8 h-64 flex justify-center items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Wide Video Background */}
              <div className="w-full max-w-sm aspect-video bg-[#252525] rounded-xl relative flex items-center justify-center overflow-hidden border border-gray-800 shadow-xl">
                {/* Background scenery representation */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#333_25%,transparent_25%,transparent_75%,#333_75%,#333),linear-gradient(45deg,#333_25%,transparent_25%,transparent_75%,#333_75%,#333)]" style={{backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'}}></div>
                
                {/* Subject / Face Tracking Box */}
                <div className="absolute left-[60%] top-[40%] -translate-x-1/2 -translate-y-1/2 group-hover:left-[40%] transition-all duration-1000 ease-in-out">
                  <div className="w-16 h-16 border border-accent/50 rounded-lg flex items-center justify-center relative">
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-accent"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-accent"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-accent"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-accent"></div>
                    <ScanFace className="w-6 h-6 text-accent/80" />
                  </div>
                </div>

                {/* 9:16 Crop Overlay */}
                <div className="absolute h-full aspect-[9/16] border-2 border-accent shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] left-[60%] -translate-x-1/2 group-hover:left-[40%] transition-all duration-1000 ease-in-out flex items-end justify-center pb-4">
                   <div className="px-2 py-1 bg-accent rounded text-[10px] font-bold text-black tracking-wider">9:16 ACTIVE</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mt-auto">
              <h3 className="text-2xl font-bold text-white mb-3">Active Smart Reframe</h3>
              <p className="text-[#A1A1AA] leading-relaxed text-lg">
                Say goodbye to static crops. ClipForge dynamically tracks active speakers and core subjects, smoothly panning the 9:16 frame to keep the action centered.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
