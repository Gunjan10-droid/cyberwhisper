import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThreatAnalysis } from "./ThreatAnalysisContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const THREAT_LABELS = [
  { level: "Safe", color: "bg-green-100 text-green-700", desc: "No threats detected." },
  { level: "Suspicious", color: "bg-yellow-100 text-yellow-700", desc: "Some signs of threat." },
  { level: "High-Risk", color: "bg-red-100 text-red-700", desc: "This link/message is dangerous." },
];

function classifyThreat(positives, total) {
  if (positives === 0) return THREAT_LABELS[0];
  if (positives / total < 0.2) return THREAT_LABELS[1];
  return THREAT_LABELS[2];
}

function isUrl(text) {
  try {
    new URL(text.trim());
    return true;
  } catch {
    return false;
  }
}

function checkTextThreat(text) {
  const lower = text.toLowerCase();
  const suspiciousWords = [
    "urgent", "password", "login", "bank", "click here", "reset", "limited time", "free", "winner", "verify", "account", "suspend"
  ];
  let matches = 0;
  suspiciousWords.forEach(word => {
    if (lower.includes(word)) matches++;
  });
  if (matches === 0) return { level: "Safe", score: 1, explanation: "No scam signs found.", category: "Harmless" };
  if (matches < 3) return { level: "Suspicious", score: 0.5, explanation: "Some suspicious words detected.", category: "Scam" };
  return { level: "High-Risk", score: 0.1, explanation: "Many scam/phishing words detected.", category: "Phishing" };
}

export default function LinkTextAnalysis() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const { setAnalysis } = useThreatAnalysis();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setErr(null);

    if (!input.trim()) {
      setErr("Please enter a message or URL.");
      toast.error("No input provided.");
      return;
    }

    setLoading(true);

    if (isUrl(input)) {
      try {
        const submitRes = await fetch(`${BACKEND_URL}/api/scan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ url: input.trim() })
        });

        
        let submitData;
        try {
          submitData = await submitRes.json();
        } catch (jsonErr) {
          throw new Error("Failed to parse server response.");
        }

        if (!submitRes.ok || !submitData.data || !submitData.data.id) {
      
          throw new Error(
            typeof submitData.error === "object"
              ? JSON.stringify(submitData.error)
              : (submitData.error || "VirusTotal submission failed.")
          );
        }
     

        const analysisId = submitData.data.id;

        let reportData;
        let tries = 0;
        while (tries < 10) {
          const reportRes = await fetch(`${BACKEND_URL}/api/report`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ analysisId }),
          });
          try {
            reportData = await reportRes.json();
          } catch (jsonErr) {
            throw new Error("Failed to parse analysis report response.");
          }
          if (reportData.data?.attributes?.status === "completed") break;
          await new Promise(res => setTimeout(res, 1200));
          tries++;
        }

        if (!reportData || !reportData.data?.attributes?.results) {
          throw new Error(
            (reportData && reportData.error)
              ? (typeof reportData.error === "object" ? JSON.stringify(reportData.error) : reportData.error)
              : "Analysis timed out or failed."
          );
        }

        const stats = reportData.data.attributes.stats;
        const positives = stats.malicious + stats.suspicious;
        const total = Object.values(stats).reduce((a, b) => a + b, 0);
        const label = classifyThreat(positives, total);
        const category = positives > 0 ? (stats.phishing ? "Phishing" : "Malware") : "Harmless";

        const analysisResult = {
          input: input.trim(),
          type: "url",
          score: Math.round((1 - positives / (total || 1)) * 100),
          status: label.level,
          category,
          explanations: [
            `Analysis from VirusTotal: ${positives} vendors flagged this URL as suspicious/malicious out of ${total}.`,
            positives > 0 ? "Some engines flagged this as risky." : "No major engines flagged this as risky.",
            `Category: ${category}.`,
          ],
          stats,
          vt_url: `https://www.virustotal.com/gui/url/search/${encodeURIComponent(input.trim())}`
        };

        setResult(analysisResult);
        setAnalysis(analysisResult);
        toast.success("Scan completed successfully!");
      } catch (e) {
        setErr(e.message || JSON.stringify(e));
        toast.error("Scan failed!");
      }
    } else {
      const threat = checkTextThreat(input);
      const analysisResult = {
        input: input.trim(),
        type: "text",
        score: Math.round(threat.score * 100),
        status: threat.level,
        category: threat.category,
        explanations: [
          threat.explanation
        ],
        stats: null,
      };
      setResult(analysisResult);
      setAnalysis(analysisResult);
      toast.success("Scan completed successfully!");
    }

    setLoading(false);
  };

  const handleViewFullAnalysis = () => {
    if (result) {
      navigate("/smartriskscoring");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center py-10 px-2">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 m-12 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[#2f66c1] text-center">Link & Text Threat Analyzer</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="input" className="font-semibold">Paste a message or URL:</label>
          <textarea
            id="input"
            rows={4}
            className="border rounded-md resize-none p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Paste a suspicious message or URL..."
            value={input}
            onChange={e => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-md shadow hover:from-blue-600 hover:to-purple-600 transition"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Analyzing...
              </span>
            ) : "Scan Now"}
          </button>
        </form>

        {err && (
          <div className="bg-red-50 text-red-700 rounded-md p-4">{err}</div>
        )}

        {result && (
          <div className={`p-5 rounded-xl shadow-inner ${THREAT_LABELS.find(t => t.level === result.status)?.color ?? ""} flex flex-col gap-2`}>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="capitalize">{result.status.replace("-", " ")}</span>
              <span className="text-xs px-2 py-0.5 bg-white/60 rounded-full font-mono">
                Confidence: {result.score}/100
              </span>
            </div>
            <div className="text-sm">{THREAT_LABELS.find(t => t.level === result.status)?.desc ?? ""}</div>
            <div className="text-xs text-gray-700">
              {result.explanations.map((ex, idx) => <div key={idx}>{ex}</div>)}
            </div>
            {result.stats && (
              <div className="mt-2 text-xs">
                <div>Engine verdicts:</div>
                <ul className="grid grid-cols-2 gap-1 mt-1">
                  {Object.entries(result.stats).map(([cat, val]) => (
                    <li key={cat} className="flex justify-between">
                      <span className="capitalize">{cat}</span>
                      <span className="font-bold">{val}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={result.vt_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500 mt-1 block"
                >
                  See full VirusTotal report
                </a>
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800 font-semibold transition"
              onClick={handleViewFullAnalysis}
            >
              View Full Analysis
            </button>
          </div>
        )}
        <div className="text-xs text-gray-500 text-center mt-4">
          Powered by <span className="font-semibold">CyberWhisper</span> &mdash; VirusTotal public API.
        </div>
      </div>
    </div>
  );
}