import React, { useState } from 'react';
import { ArrowLeft, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative font-sans overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      {/* Navigation */}
      <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-accent flex items-center gap-2 transition-colors z-20">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>
      
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 z-10">
        <div className="w-12 h-12 rounded-xl bg-[#252525] border border-accent/50 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.2)]">
          <Scissors className="w-6 h-6 text-accent" />
        </div>
        <span className="text-white font-extrabold text-3xl tracking-tight">
          Clip<span className="text-accent">Forge</span>
        </span>
      </div>

      {/* Glassmorphism Card */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-3xl shadow-2xl max-w-md w-full w-[90%] z-10 transition-all duration-500">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          {isLogin 
            ? 'Sign in to access your dashboard and projects.' 
            : 'Join ClipForge to automate your viral content creation.'}
        </p>
        
        {/* Form Container */}
        <div className="space-y-5">
          
          {/* Conditional Username Field */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
              <input 
                type="text" 
                placeholder="ClipCreator99" 
                className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-gray-600" 
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-gray-600" 
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-gray-600" 
            />
          </div>

          {/* Sign In Extras */}
          {isLogin && (
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-accent focus:ring-accent focus:ring-offset-0 bg-transparent cursor-pointer" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember Me</span>
              </label>
              <a href="#" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                Forgot Password?
              </a>
            </div>
          )}

          {/* Action Button */}
          <button className="w-full bg-accent text-black font-bold text-lg py-3.5 rounded-xl hover:bg-[#32e512] shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:scale-[1.02] transition-all duration-300 mt-6">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        {/* Toggle View Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-white hover:text-accent transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign up for free' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
