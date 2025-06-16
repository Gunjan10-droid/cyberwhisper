import React from 'react';

const CyberWhisperFooterLogo = () => (
  <svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" className="h-20 w-auto">
    <defs>

      <linearGradient id="footerShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
        <stop offset="50%" style={{stopColor:"#1E40AF", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#7C3AED", stopOpacity:1}} />
      </linearGradient>
      

      <linearGradient id="footerWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:"#06B6D4", stopOpacity:0.8}} />
        <stop offset="50%" style={{stopColor:"#3B82F6", stopOpacity:0.6}} />
        <stop offset="100%" style={{stopColor:"#8B5CF6", stopOpacity:0.4}} />
      </linearGradient>
      
  
      <filter id="footerGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    

    <text x="15" y="60" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#3B82F6">
      CyberWhisper
    </text>
    

    <circle cx="310" cy="50" r="32" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
    

    <path d="M294 35 C294 30, 298 25, 310 25 C322 25, 326 30, 326 35 L326 55 C326 65, 318 75, 310 75 C302 75, 294 65, 294 55 Z" 
          fill="url(#footerShieldGradient)" 
          filter="url(#footerGlow)" 
          stroke="rgba(255, 255, 255, 0.2)" 
          strokeWidth="1"/>

    <rect x="307" y="40" width="6" height="15" rx="3" fill="white" opacity="0.9"/>
    <rect x="305" y="58" width="10" height="3" rx="1.5" fill="white" opacity="0.7"/>
    <line x1="310" y1="61" x2="310" y2="65" stroke="white" strokeWidth="2" opacity="0.7"/>
    

    <path d="M330 40 Q335 45, 330 50" stroke="url(#footerWaveGradient)" strokeWidth="2" fill="none" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M333 35 Q340 45, 333 55" stroke="url(#footerWaveGradient)" strokeWidth="2" fill="none" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" begin="0.5s"/>
    </path>
    <path d="M336 30 Q345 45, 336 60" stroke="url(#footerWaveGradient)" strokeWidth="2" fill="none" opacity="0.4">
      <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" begin="1s"/>
    </path>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-blue-800/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <CyberWhisperFooterLogo />
            </div>
            <p className="text-blue-200 mb-4">
              Protecting users from digital fraud through advanced AI and voice recognition technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Gunjan10-droid/cyberwhisper" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                GitHub
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Documentation</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-blue-200 hover:text-blue-400 transition-colors">Features</a>
              <a href="#how-it-works" className="block text-blue-200 hover:text-blue-400 transition-colors">How it Works</a>
              <a href="#" className="block text-blue-200 hover:text-blue-400 transition-colors">API Docs</a>
              <a href="#" className="block text-blue-200 hover:text-blue-400 transition-colors">Security</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-2">
              <a href="#" className="block text-blue-200 hover:text-blue-400 transition-colors">Support</a>
              <a href="#" className="block text-blue-200 hover:text-blue-400 transition-colors">Community</a>
              <a href="#" className="block text-blue-200 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="block text-blue-200 hover:text-blue-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-blue-300">© All rights reserved. CyberWhisper. Built with 🛡️ for digital safety.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;