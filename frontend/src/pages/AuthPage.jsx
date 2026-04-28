import React, { useState } from 'react';
import { ArrowLeft, Scissors, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError(''); // Clear errors on toggle
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Custom Validation
    if (!email.includes('@') || !email.includes('.com')) {
      setError("Please enter a valid email address (must contain '@' and '.com').");
      return;
    }

    // Load existing accounts
    const accountsData = localStorage.getItem('clipforge_accounts');
    const accounts = accountsData ? JSON.parse(accountsData) : [];

    if (isLogin) {
      // Sign In Logic
      const matchedUser = accounts.find(u => u.email === email && u.password === password);
      if (matchedUser) {
        localStorage.setItem('clipforge_session', JSON.stringify(matchedUser));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } else {
      // Sign Up Logic
      if (!username || !password) {
        setError('Please fill in all fields.');
        return;
      }

      // Prevent duplicate emails
      const emailExists = accounts.some(u => u.email === email);
      if (emailExists) {
        setError('An account with this email already exists.');
        return;
      }

      const newUser = { email, username, password };
      accounts.push(newUser);
      localStorage.setItem('clipforge_accounts', JSON.stringify(accounts));

      // Auto-login and redirect
      localStorage.setItem('clipforge_session', JSON.stringify(newUser));
      navigate('/dashboard');
    }
  };

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
      <motion.div
        layout
        className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-3xl shadow-2xl max-w-md w-full w-[90%] z-10"
      >
        <motion.h1 layout className="text-3xl font-bold text-white mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </motion.h1>
        <motion.p layout className="text-gray-400 mb-8 text-center">
          {isLogin
            ? 'Sign in to access your dashboard and projects.'
            : 'Join ClipForge to automate your viral content creation.'}
        </motion.p>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-start gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">

          {/* Conditional Username Field */}
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                key="username"
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ClipCreator99"
                  className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder:text-gray-600"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Field */}
          <motion.div layout>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <input
              type="text" // Using text to allow custom validation trigger instead of native browser popup
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder:text-gray-600"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div layout>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder:text-gray-600"
            />
          </motion.div>

          {/* Sign In Extras */}
          <AnimatePresence mode="popLayout">
            {isLogin && (
              <motion.div
                key="extras"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between mt-2 overflow-hidden"
              >
                <label className="flex items-center gap-2 cursor-pointer group py-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-transparent cursor-pointer"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember Me</span>
                </label>
                <a href="#" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  Forgot Password?
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <motion.button layout type="submit" className="w-full bg-accent text-black font-bold text-lg py-3.5 rounded-xl hover:bg-[#32e512] shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:scale-[1.02] transition-all duration-300 mt-6">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </motion.button>
        </form>

        {/* Toggle View Link */}
        <motion.div layout className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleView}
              className="font-bold text-white hover:text-accent transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign up for free' : 'Sign In'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
