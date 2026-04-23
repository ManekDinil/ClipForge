import React from 'react';
import { Scissors, Twitter, Github, Linkedin, Disc } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-accent/20 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Column 1: Logo & Tagline */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#252525] border border-accent/50 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-accent" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Clip<span className="text-accent">Forge</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Automating the extraction of high-engagement clips from long-form content. Build your audience 10x faster.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">API Docs</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent border border-transparent transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent border border-transparent transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent border border-transparent transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent border border-transparent transition-all">
                <Disc className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ClipForge Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <span className="text-gray-400 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
