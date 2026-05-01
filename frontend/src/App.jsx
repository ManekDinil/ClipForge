import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Play, Scissors, Zap, ChevronRight } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import UploadDashboard from './pages/UploadDashboard';
import ClipEditor from './pages/ClipEditor';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import AuthPage from './pages/AuthPage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSession = localStorage.getItem('clipforge_session');
    if (storedSession) {
      setUser(JSON.parse(storedSession));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('clipforge_session');
    setUser(null);
    setIsOpen(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const storedData = localStorage.getItem('clipforge_user');
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);

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
          <div className="hidden md:block relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface border border-accent/50 shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] hover:bg-[#252525] transition-all duration-300"
                >
                  <span className="text-gray-400 text-sm">Welcome,</span>
                  <span className="text-accent font-bold text-sm tracking-wide">{user.username}</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-gray-800 rounded-xl shadow-xl overflow-hidden z-50">
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-white hover:bg-[#252525] transition-colors text-sm border-b border-gray-800"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-surface hover:bg-[#252525] text-white border border-accent/50 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] inline-block">
                Sign In
              </Link>
            )}
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
            {user ? (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsOpen(false);
                  }}
                  className="w-full flex justify-center items-center gap-2 bg-surface border border-accent/50 px-6 py-3 rounded-md shadow-[0_0_15px_rgba(57,255,20,0.1)]"
                >
                  <span className="text-gray-400 text-sm">Welcome,</span>
                  <span className="text-accent font-bold tracking-wide">{user.username}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-red-500/10 text-red-400 border border-red-500/20 px-6 py-3 rounded-md font-bold hover:bg-red-500/20 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="w-full mt-4 block text-center bg-surface text-accent border border-accent/50 px-6 py-3 rounded-md font-bold">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
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
          <Link to="/dashboard" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-black bg-accent rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(57,255,20,0.5)]">
            <span className="relative z-10 flex items-center gap-2">
              Get Started for Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-surface rounded-full hover:bg-surface hover:border-accent/30 transition-all duration-300 group">
            <Play className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
            Watch Demo
          </button>
        </div>

      </div>
    </div>
  );
};

const LandingPage = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <Pricing />
    <FAQ />
    <Footer />
  </div>
);

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-background font-sans selection:bg-accent selection:text-black theme-${theme}`}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<UploadDashboard />} />
        <Route path="/editor" element={<ClipEditor />} />
      </Routes>
    </div>
  );
}
