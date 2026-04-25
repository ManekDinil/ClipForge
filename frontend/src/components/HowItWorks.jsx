import React from 'react';
import { Upload, Sparkles, Share2 } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-cyan-400" />,
    title: "Upload",
    description: "Drop your raw, long-form footage into our high-speed drag-and-drop uploader. The real-time progress simulator handles validation instantly.",
    glowColor: "from-cyan-500/20 to-transparent"
  },
  {
    icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    title: "AI Magic",
    description: "Our proprietary AI analyzes your footage, automatically identifying viral hooks and dynamically cropping the frame into perfect 9:16 vertical previews.",
    glowColor: "from-purple-500/20 to-transparent"
  },
  {
    icon: <Share2 className="w-8 h-8 text-cyan-400" />,
    title: "Export",
    description: "Jump into the dual-pane AI Caption Editor to tweak your text, review the Viral Score, and use our one-click social media export to share immediately.",
    glowColor: "from-cyan-500/20 to-transparent"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-900" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Three steps to <span className="text-accent drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">viral content</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            From raw, hour-long footage to captivating short-form highlights in a matter of seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connection line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-cyan-500/0 via-purple-500/30 to-cyan-500/0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Number Badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center z-20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">{index + 1}</span>
              </div>
              
              {/* Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 pt-10 h-full relative overflow-hidden transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 shadow-2xl">
                
                {/* Ambient Internal Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-shadow duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
