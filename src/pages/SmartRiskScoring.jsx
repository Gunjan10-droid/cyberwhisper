import React from "react";
import { useThreatAnalysis } from "./ThreatAnalysisContext";
import { useNavigate } from "react-router-dom";

// Visual configs for status
const STATUS_UI = {
  "Safe": {
    color: "bg-green-100 text-green-700 border-green-300",
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  "Suspicious": {
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: (
      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      </svg>
    )
  },
  "High-Risk": {
    color: "bg-red-100 text-red-700 border-red-300",
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      </svg>
    )
  }
};

const CATEGORY_COLORS = {
  "Phishing": "bg-orange-100 text-orange-700 border-orange-300",
  "Scam": "bg-yellow-200 text-yellow-800 border-yellow-400",
  "Malware": "bg-purple-100 text-purple-700 border-purple-300",
  "Harmless": "bg-green-100 text-green-700 border-green-300",
  "Other": "bg-gray-100 text-gray-700 border-gray-300"
};

// Progress bar for confidence score
function ScoreBar({ score }) {
  let barColor =
    score > 80 ? "bg-green-500"
    : score > 50 ? "bg-yellow-400"
    : score > 30 ? "bg-orange-400"
    : "bg-red-500";
  return (
    <div className="w-full h-5 bg-gray-200 rounded overflow-hidden">
      <div
        className={`h-5 ${barColor} transition-all`}
        style={{ width: `${score}%` }}
      ></div>
    </div>
  );
}

export default function SmartRiskScoring() {
  const { analysis } = useThreatAnalysis();
  const navigate = useNavigate();

  // If no analysis data, guide user to tools
  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-4">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-4">Smart Risk Scoring</h2>
          <p className="text-center text-gray-700 mb-6">
            No data to analyze yet.<br />
            Please use one of the tools below to perform a threat analysis.
          </p>
          <div className="flex gap-4 justify-center mb-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => navigate("/voice-assistant")}
            >
              Go to Voice Assistant
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => navigate("/linktextanalysis")}
            >
              Go to LinkTextAnalysis
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs">
            You have not analyzed any data yet.
          </p>
        </div>
      </div>
    );
  }

  // Visuals for existing analysis
  const statusUI = STATUS_UI[analysis.status] || STATUS_UI["Suspicious"];
  const catColor = CATEGORY_COLORS[analysis.category] || CATEGORY_COLORS["Other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-2 py-8">
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 m-12 md:p-10 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 text-center">
          Smart Risk Scoring
        </h1>
        <p className="text-center text-gray-600 text-sm">
          Analyze the risk of any message or link. Get instant, AI-powered threat scoring and explanations.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs text-gray-500 w-7 shrink-0">Input:</span>
          <div className="flex-1 font-mono bg-gray-50 rounded px-3 py-1.5 text-gray-700 break-all">{analysis.input}</div>
        </div>
        {/* Status Badge & Category */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`flex items-center gap-2 px-3 py-1 border rounded-full text-sm font-semibold ${statusUI.color}`}
            title={analysis.status}
          >
            {statusUI.icon}
            {analysis.status}
          </span>
          <span
            className={`px-3 py-1 border rounded-full text-xs font-medium ${catColor}`}
            title={analysis.category}
          >
            {analysis.category}
          </span>
          <span className="ml-auto flex items-center gap-2 text-xs text-gray-500">
            Confidence: <span className="font-bold text-base text-gray-800">{analysis.score}/100</span>
          </span>
        </div>
        {/* Score Progress Bar */}
        <ScoreBar score={analysis.score} />
        {/* Detailed Explanations */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 py-3 px-4">
          <div className="font-semibold text-gray-800 mb-1">AI Explanation:</div>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
            {analysis.explanations.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        </div>
        {/* Actions */}
        <div>
          <button
            className="w-full md:w-auto px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 font-semibold transition"
            onClick={() => navigate("/")}
          >
            Analyze Another
          </button>

        </div>
        <div className="text-xs text-gray-400 text-center mt-5">
          Powered by <span className="font-semibold">CyberWhisper</span>
        </div>
      </div>
    </div>
  );
}