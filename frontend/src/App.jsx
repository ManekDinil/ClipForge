import React, { useState } from 'react';
import { Menu, X, Play, Scissors, Zap, ChevronRight } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import UploadDashboard from './pages/UploadDashboard';
import ClipEditor from './pages/ClipEditor';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-surface border border-accent/50 group-hover:border-accent flex items-center justify-center transition-colors shadow-[0_0_10px_rgba(57,255,20,0.1)]">
              <Scissors className="w-5 h-5 text-accent" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">
              Clip<span className="text-accent">Forge</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-all px-3 py-2 rounded-md text-sm font-medium">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-all px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
            </div>
          </div>

          {/* Desktop Action Button */}
          <div className="hidden md:block">
            <button className="bg-surface hover:bg-[#252525] text-white border border-accent/50 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-surface">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
            <button className="w-full mt-4 text-center bg-surface text-accent border border-accent/50 px-6 py-3 rounded-md font-bold">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onGetStarted }) => {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background glow effects for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent opacity-[0.04] blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">

        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-accent/30 mb-8 shadow-[0_0_15px_rgba(57,255,20,0.05)] hover:border-accent/60 transition-colors cursor-default">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-gray-300 tracking-wide">AI-Powered Clipping Engine v1.0</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
          Turn Long Videos Into <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
            Viral Masterpieces
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto mb-12 leading-relaxed">
          Automate the extraction of high-engagement clips from long-form content. Perfect for TikTok, Instagram Reels, and YouTube Shorts.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button onClick={onGetStarted} className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-black bg-accent rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(57,255,20,0.5)]">
            <span className="relative z-10 flex items-center gap-2">
              Get Started for Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-surface rounded-full hover:bg-surface hover:border-accent/30 transition-all duration-300 group">
            <Play className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
            Watch Demo
          </button>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className={`min-h-screen bg-background font-sans selection:bg-accent selection:text-black theme-${theme}`}>
      {currentPage === 'landing' && (
        <>
          <Navbar />
          <Hero onGetStarted={() => setCurrentPage('upload')} />
        </>
      )}

      {currentPage === 'upload' && (
        <UploadDashboard
          onNavigateBack={() => setCurrentPage('landing')}
          onProceedToEditor={() => setCurrentPage('editor')}
        />
      )}

      {currentPage === 'editor' && (
        <ClipEditor onNavigateBack={() => setCurrentPage('upload')} />
      )}
    </div>
  );
}
