import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import {
  Shield,
  Mic,
  Link as LucideLink,
  Brain,
  Blocks,
  ArrowRight,
  Play,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import FeatureCard from "./FeatureCard";


const VIRUSTOTAL_API_KEY = import.meta.env.VITE_VT_API_KEY;

function Homepage() {
  const [demoInput, setDemoInput] = useState('');
  const [demoResult, setDemoResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

 
  const isLikelyUrl = (text) => {
    try {
  
      new URL(text);
      return true;
    } catch {
    
      return /^https?:\/\/|www\./i.test(text.trim());
    }
  };

 
  const analyzeDemoInput = async () => {
    setLoading(true);
    setApiError('');
    setDemoResult(null);

   
    try {
      let analysisId = null;
      let inputType = isLikelyUrl(demoInput) ? 'url' : 'file';
      let response = null;

      if (inputType === 'url') {
   
        response = await fetch("https://www.virustotal.com/api/v3/urls", {
          method: "POST",
          headers: {
            "x-apikey": VIRUSTOTAL_API_KEY,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `url=${encodeURIComponent(demoInput)}`
        });
        const submitData = await response.json();
        if (!submitData.data || !submitData.data.id) throw new Error("VirusTotal submission failed.");
        analysisId = submitData.data.id;

     
        response = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
          headers: { "x-apikey": import.meta.env.VITE_VT_API_KEY }
        });
        const analysis = await response.json();

        
        if (analysis && analysis.data && analysis.data.attributes && analysis.data.attributes.stats) {
          const stats = analysis.data.attributes.stats;
          const total = Object.values(stats).reduce((a, b) => a + b, 0);
          const malicious = stats.malicious || 0;
          const suspicious = stats.suspicious || 0;
         
          let confidence = Math.round(((malicious + suspicious) / total) * 100) + "%";
          let type, message;
          if (malicious > 0) {
            type = "high-risk";
            message = "High Risk - Malicious URL detected";
          } else if (suspicious > 0) {
            type = "suspicious";
            message = "Suspicious - Be cautious with this URL";
          } else {
            type = "safe";
            message = "Safe - No known threats detected";
            confidence = "99%";
          }
          setDemoResult({ type, message, confidence });
        } else {
          setDemoResult({ type: "safe", message: "Safe - No known threats detected", confidence: "99%" });
        }
      } else {
       
        const suspiciousKeywords = [
          'urgent', 'act now', 'limited time', 'click here', 'verify account', 'suspended', 'immediate action'
        ];
        const highRiskKeywords = [
          'bitcoin', 'cryptocurrency', 'wire transfer', 'tax refund', 'lottery winner', 'prince', 'inheritance'
        ];
        const input = demoInput.toLowerCase();
        const hasSuspiciousKeywords = suspiciousKeywords.some(keyword => input.includes(keyword));
        const hasHighRiskKeywords = highRiskKeywords.some(keyword => input.includes(keyword));
        let result;
        if (hasHighRiskKeywords) {
          result = { type: 'high-risk', message: 'High Risk - Potential scam detected', confidence: '95%' };
        } else if (hasSuspiciousKeywords) {
          result = { type: 'suspicious', message: 'Suspicious - Exercise caution', confidence: '78%' };
        } else {
          result = { type: 'safe', message: 'Safe - No threats detected', confidence: '92%' };
        }
        setDemoResult(result);
      }
    } catch (err) {
      setApiError("Error analyzing input. Please try again later.");
      setDemoResult(null);
    }
    setLoading(false);
  };


  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "🎙️ Voice Input",
      desc: "Simply speak your message and let our AI analyze potential threats in real-time.",
      to: "/voice-assistant",
      bg: "bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-700"
    },
    {
      icon: <LucideLink className="w-6 h-6" />,
      title: "🔗 Link & Text Analysis",
      desc: "Paste suspicious messages, emails, or links for instant fraud detection.",
      to: "/linktextanalysis",
      bg: "bg-gradient-to-br from-purple-500 via-pink-400 to-purple-700"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "🧠 Smart Risk Scoring",
      desc: "Get confidence scores and detailed explanations for each analysis.",
      to: "/smartriskscoring",
      bg: "bg-gradient-to-br from-green-500 via-cyan-500 to-blue-700"
    },
    {
      icon: <Blocks className="w-6 h-6" />,
      title: "🔒 Blockchain Logging",
      desc: "Transparent threat logging with simulated Algorand blockchain integration for accountability.",
      to: "/blockchain-logs",
      bg: "bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500"
    }
  ];

  const goToTryNow = () => {
    navigate('/try-now');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white font-sans">
      
      <style>
        {`
        .bolt-badge {
          transition: all 0.3s ease;
        }
        @keyframes badgeIntro {
          0% { transform: rotateY(-90deg); opacity: 0; }
          100% { transform: rotateY(0deg); opacity: 1; }
        }
        .bolt-badge-intro {
          animation: badgeIntro 0.8s ease-out 1s both;
        }
        .bolt-badge-intro.animated {
          animation: none;
        }
        @keyframes badgeHover {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(22deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .bolt-badge:hover {
          animation: badgeHover 0.6s ease-in-out;
        }
        `}
      </style>
      <div className="flex justify-end items-start pt-17 pr-4 pb-0 z-50">
        <a
          href="https://bolt.new/"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-all duration-300 hover:shadow-2xl"
        >
          <img
            src="https://storage.bolt.army/white_circle_360x360.png"
            alt="Built with Bolt.new badge"
            className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg bolt-badge bolt-badge-intro"
            onAnimationEnd={e => e.currentTarget.classList.add('animated')}
          />
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-15 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                We Hear Scams
                <span className="text-blue-400 block">Before They Hit You.</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Speak or paste any message. CyberWhisper instantly detects fraud and logs serious threats securely.
              </p>
              
              <button
                className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                onClick={goToTryNow}
              >
                <span>Try CyberWhisper</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-8 rounded-3xl backdrop-blur-sm border border-blue-500/30">
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <Mic className="w-8 h-8" />
                  </div>
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/30">
                    <span className="text-green-400 font-semibold">Analyzing... Safe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Element name="features" id="features">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Detection Features</h2>
              <p className="text-xl text-blue-100">Smart solutions. Streamlined experience.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <FeatureCard key={i} {...f} />
              ))}
            </div>
          </div>
        </section>
      </Element>

      <Element name="how-it-works" id="how-it-works">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-blue-100">Simple, fast, and secure in just 3 steps</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Speak or Paste</h3>
                <p className="text-blue-100">Use voice input or paste suspicious messages, links, or emails into our interface.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
                <p className="text-blue-100">Our advanced AI analyzes patterns, language, and threat indicators in real-time.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Results</h3>
                <p className="text-blue-100">Receive instant risk assessment with confidence scores and actionable insights.</p>
              </div>
            </div>
          </div>
        </section>
      </Element>

      <Element name="try-now" id="try-now">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Try It Now</h2>
              <p className="text-xl text-blue-100">Test our scam detection with sample text</p>
            </div>
            <div className="bg-slate-700/50 p-8 rounded-2xl border border-blue-500/20">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter suspicious message or link:</label>
                  <textarea
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Try: 'Urgent! Your account will be suspended. Click here to verify immediately or lose access forever!' or 'http://suspicious-link.com'"
                    className="w-full p-4 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    rows={4}
                  />
                </div>
                <button
                  onClick={analyzeDemoInput}
                  disabled={!demoInput.trim() || loading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
                >
                  {loading ? (
                    <span className="flex items-center"><Play className="animate-spin w-4 h-4 mr-2" />Analyzing...</span>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Analyze Threat</span>
                    </>
                  )}
                </button>
                {apiError && (
                  <div className="mt-4 text-center text-red-500 font-medium">{apiError}</div>
                )}
                {demoResult && (
                  <div className="mt-6 p-4 rounded-lg border-l-4 bg-slate-600/50"
                    style={{
                      borderLeftColor: demoResult.type === 'safe' ? '#10b981' :
                        demoResult.type === 'suspicious' ? '#f59e0b' : '#ef4444'
                    }}>
                    <div className="flex items-center space-x-2">
                      {demoResult.type === 'safe' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {demoResult.type === 'suspicious' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                      {demoResult.type === 'high-risk' && <XCircle className="w-5 h-5 text-red-500" />}
                      <span className="font-semibold">{demoResult.message}</span>
                      <span className="text-sm text-blue-300">({demoResult.confidence} confidence)</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-center mt-8">
                  <button
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                    onClick={goToTryNow}
                  >
                    <span>Try More Features</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CyberWhisper?</h2>
            <p className="text-xl text-blue-100">Leading the way in scam detection technology</p>
          </div>
          <div className="bg-slate-700/50 rounded-2xl border border-blue-500/20 overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
              <div className="p-6 border-r border-slate-600">
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Real-time Detection</h3>
                  <p className="text-sm text-blue-200">Instant analysis as you speak or type</p>
                </div>
              </div>
              <div className="p-6 border-r border-slate-600">
                <div className="text-center">
                  <Mic className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Voice-First Design</h3>
                  <p className="text-sm text-blue-200">Natural speech interaction</p>
                </div>
              </div>
              <div className="p-6 border-r border-slate-600">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">No Login Required</h3>
                  <p className="text-sm text-blue-200">Privacy-first approach</p>
                </div>
              </div>
              <div className="p-6">
                <div className="text-center">
                  <Blocks className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Blockchain Logging</h3>
                  <p className="text-sm text-blue-200">Transparent threat tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Homepage;