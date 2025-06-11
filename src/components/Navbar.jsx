import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const CyberWhisperLogo = () => (
  <svg width="333" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" className="h-15 w-auto">
    <defs>
      {/* Gradient for the shield */}
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
        <stop offset="50%" style={{stopColor:"#1E40AF", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#7C3AED", stopOpacity:1}} />
      </linearGradient>
      
      {/* Gradient for the mic waves */}
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:"#06B6D4", stopOpacity:0.8}} />
        <stop offset="50%" style={{stopColor:"#3B82F6", stopOpacity:0.6}} />
        <stop offset="100%" style={{stopColor:"#8B5CF6", stopOpacity:0.4}} />
      </linearGradient>
      
      {/* Glow effect */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Background circle for depth - moved even further left */}
    <circle cx="15" cy="40" r="35" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
    
    {/* Shield shape - moved even further left */}
    <path d="M0 25 C0 20, 5 15, 15 15 C25 15, 30 20, 30 25 L30 45 C30 55, 20 65, 15 65 C10 65, 0 55, 0 45 Z" 
          fill="url(#shieldGradient)" 
          filter="url(#glow)" 
          stroke="rgba(255, 255, 255, 0.2)" 
          strokeWidth="1"/>
    
    {/* Microphone in center of shield - moved even further left */}
    <rect x="12" y="30" width="6" height="15" rx="3" fill="white" opacity="0.9"/>
    <rect x="10" y="48" width="10" height="3" rx="1.5" fill="white" opacity="0.7"/>
    <line x1="15" y1="51" x2="15" y2="55" stroke="white" strokeWidth="2" opacity="0.7"/>
    
    {/* Sound waves emanating from the shield - moved even further left */}
    <path d="M35 30 Q40 35, 35 40" stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M38 25 Q45 35, 38 45" stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" begin="0.5s"/>
    </path>
    <path d="M41 20 Q50 35, 41 50" stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.4">
      <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" begin="1s"/>
    </path>
    
    {/* Text - moved even further left */}
    <text x="55" y="35" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="bold" fill="#3B82F6">
      CyberWhisper
    </text>
    <text x="55" y="58" fontFamily="Arial, sans-serif" fontSize="18" fill="#64748B">
      SCAM DETECTION
    </text>
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-blue-800/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <CyberWhisperLogo />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-blue-100 hover:text-blue-400 transition-colors">Home</a>
            <a href="#features" className="text-blue-100 hover:text-blue-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-blue-100 hover:text-blue-400 transition-colors">How it Works</a>
            <a href="#about" className="text-blue-100 hover:text-blue-400 transition-colors">About Us</a>
            <a href="#contact" className="text-blue-100 hover:text-blue-400 transition-colors">Contact</a>
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition-colors">
              Try Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-blue-100" /> : <Menu className="w-6 h-6 text-blue-100" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-blue-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-blue-100 hover:text-blue-400">Home</a>
              <a href="#features" className="block px-3 py-2 text-blue-100 hover:text-blue-400">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-blue-100 hover:text-blue-400">How it Works</a>
              <a href="#about" className="block px-3 py-2 text-blue-100 hover:text-blue-400">About Us</a>
              <a href="#contact" className="block px-3 py-2 text-blue-100 hover:text-blue-400">Contact</a>
              <button className="w-full mt-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold">
                Try Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;