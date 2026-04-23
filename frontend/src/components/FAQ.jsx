import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "What is ClipForge and how does it work?",
    answer: "ClipForge is an AI-powered clipping engine that automatically extracts the most engaging moments from your long-form videos. Simply upload your video, and our AI analyzes it to generate ready-to-post, 9:16 aspect ratio clips tailored for platforms like TikTok, Reels, and Shorts."
  },
  {
    question: "How does the Viral Scoring system work?",
    answer: "Our proprietary AI analyzes historical social media trends, pacing, and retention data to assign a 'Viral Potential' score to each generated clip. This allows you to prioritize posting the content that has the highest mathematical probability of going viral."
  },
  {
    question: "Can I edit the AI-generated captions?",
    answer: "Absolutely! ClipForge provides a dual-pane AI Caption Editor. You can jump into the Sync Timeline to manually adjust the text, fix any misheard words, and instantly see your changes reflected on the dynamic 9:16 video preview overlay in real-time."
  },
  {
    question: "What video formats and sizes are supported?",
    answer: "Currently, we support standard video formats including MP4, MOV, AVI, and MKV. You can upload files up to 2GB in size. Our FFmpeg processing pipeline ensures high-speed format handling and rendering."
  },
  {
    question: "Is ClipForge better than doing it manually?",
    answer: "Yes. By automating the tedious process of finding hooks, cropping to 9:16, and manually transcribing text, ClipForge saves you hours of editing time per video. You get professional-grade, caption-ready clips at a fraction of the time and cost."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about the ClipForge platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-surface border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-accent/50 shadow-[0_0_15px_rgba(57,255,20,0.05)]' : 'border-gray-800 hover:border-gray-700'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-white font-semibold text-lg group-hover:text-accent transition-colors duration-200">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                  />
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
