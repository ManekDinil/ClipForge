import React from 'react';
import { Upload, Sparkles, Share2 } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-accent" />,
    title: "Upload",
    description: "Drop your raw, long-form footage into our high-speed drag-and-drop uploader. The real-time progress simulator handles validation instantly.",
    glowColor: "from-accent/20 to-transparent"
  },
  {
    icon: <Sparkles className="w-8 h-8 text-accent" />,
    title: "AI Magic",
    description: "Our proprietary AI analyzes your footage, automatically identifying viral hooks and dynamically cropping the frame into perfect 9:16 vertical previews.",
    glowColor: "from-accent/20 to-transparent"
  },
  {
    icon: <Share2 className="w-8 h-8 text-accent" />,
    title: "Export",
    description: "Jump into the dual-pane AI Caption Editor to tweak your text, review the Viral Score, and use our one-click social media export to share immediately.",
    glowColor: "from-accent/20 to-transparent"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background relative border-t border-gray-800" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Three steps to <span className="text-accent drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">viral content</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            From raw, hour-long footage to captivating short-form highlights in a matter of seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connection line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Number Badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-surface border-2 border-gray-800 rounded-full flex items-center justify-center z-20 shadow-[0_0_15px_rgba(57,255,20,0.2)] group-hover:scale-110 group-hover:border-accent transition-all duration-300">
                <span className="text-white font-bold text-xl">{index + 1}</span>
              </div>
              
              {/* Card */}
              <div className="bg-surface border border-gray-800 rounded-3xl p-8 pt-10 h-full relative overflow-hidden transition-all duration-300 hover:border-accent/50 hover:-translate-y-1 shadow-2xl">
                
                {/* Ambient Internal Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-background border border-gray-800 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] group-hover:border-accent/50 transition-all duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
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
