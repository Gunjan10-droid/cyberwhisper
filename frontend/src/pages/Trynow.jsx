import React from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Link as LucideLink } from "lucide-react";

const TryNow = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4 py-12">
      <div className="max-w-2xl w-full text-center m-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Try CyberWhisper Now
        </h1>
        <p className="text-lg text-blue-100">
          Test our AI-powered scam detection tools below. Speak your message or paste a suspicious link to experience real-time threat analysis.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center items-center">
    
        <button
          onClick={() => navigate("/voice-assistant")}
          className="group flex-1 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/70 hover:bg-blue-900/80 border border-blue-500/30 shadow-xl transition-all duration-200 cursor-pointer text-center max-w-md"
        >
          <div className="bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-700 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
            <Mic className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-200 mb-2">Voice Assistant</h2>
          <p className="text-blue-100 text-base mb-2">
            Speak out any message and let CyberWhisper’s AI analyze it for scam or fraud attempts in real time, using your browser microphone.
          </p>
          <span className="mt-3 inline-block text-blue-400 font-semibold group-hover:underline">Start Voice Detection &rarr;</span>
        </button>

        <button
          onClick={() => navigate("/linktextanalysis")}
          className="group flex-1 flex flex-col items-center justify-center px-8 py-11 rounded-2xl bg-slate-900/70 hover:bg-blue-900/80 border border-blue-500/30 shadow-xl transition-all duration-200 cursor-pointer text-center max-w-md"
        >
          <div className="bg-gradient-to-br from-purple-500 via-blue-400 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
            <LucideLink className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-200 mb-2">Link & Text Analysis</h2>
          <p className="text-blue-100 text-base mb-2">
            Paste or type any suspicious message, email, or link and get instant, detailed scam risk detection.
          </p>
          <span className="mt-3 inline-block text-blue-400 font-semibold group-hover:underline">Analyze Text or Link &rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default TryNow;