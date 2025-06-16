import React, { useState, useRef } from "react";
import { useThreatAnalysis } from "./ThreatAnalysisContext";
import { useNavigate } from "react-router-dom";


const THREAT_LABELS = {
  safe: {
    level: "Safe",
    color: "bg-green-100 text-green-700",
    desc: "No threats detected.",
    category: "Harmless",
  },
  suspicious: {
    level: "Suspicious",
    color: "bg-yellow-100 text-yellow-800",
    desc: "Some signs of threat detected.",
    category: "Scam",
  },
  dangerous: {
    level: "High-Risk",
    color: "bg-red-100 text-red-700",
    desc: "This message is likely a scam, phishing, or malicious.",
    category: "Phishing",
  },
};

function analyzeThreat(text) {
  const lower = text.toLowerCase();
 
  const suspiciousWords = [
    "urgent", "password", "login", "bank", "click here", "reset",
    "limited time", "free", "winner", "verify", "account", "suspend",
    "confirm", "security alert", "paypal", "ssn", "social security",
    "update info", "unusual activity", "billing", "credential", "refund",
    "bitcoin", "crypto", "transfer", "gift card", "wire transfer", "lottery",
    "compromised", "locked", "immediately", "final notice", "threat", "expire",
    "breach", "malware", "infected", "virus", "payment", "invoice", "overdue",
    "tax", "irs", "government", "fine", "penalty", "unauthorized", "limit",
    "prize", "claim now", "act now", "limited offer", "exclusive", "dear customer",
    "dear user", "dear member", "dear client", "dear friend", "dear sir", "madam",
    "lucky", "selected", "congratulations", "urgent action", "update your details",
    "security verification", "reset your password", "account verification",
    "suspended", "reactivate", "blocked", "danger", "alert", "important notice",
    "secure your account", "risk", "compromised account", "identity theft",
    "personal information", "unauthorized access", "recovery", "restore", "support",
    "customer care", "helpline", "call now", "sms", "whatsapp", "telegram",
    "cash app", "zelle", "apple pay", "google pay", "amazon", "ebay", "facebook",
    "instagram", "twitter", "snapchat", "microsoft", "outlook", "gmail", "yahoo",
    "icloud", "apple id", "android", "windows", "macos", "login attempt",
    "access your account", "unusual sign-in", "security check", "security update",
    "follow the link", "open the attachment", "download", "install", "run", "execute",
    "zip file", "exe file", "pdf file", "attachment", "unsubscribe", "opt out",
    "you have been selected", "lifetime", "100%", "guaranteed", "easy money",
    "investment", "opportunity", "double your", "get rich", "financial freedom",
    "pay now", "verify identity", "send money", "bank details", "routing number",
    "account number", "cvv", "credit card", "debit card", "card number",
    "expiration date", "pin", "unlock", "renew", "activate", "credentials",
    "personal data", "security question", "mother's maiden name", "birth date",
    "address", "phone number", "ssn", "driver's license", "passport", "national id",
    "fee", "charge", "processing", "transaction", "balance", "pending", "overpayment",
    "underpayment", "settlement", "lawsuit", "court", "legal", "law enforcement",
    "police", "fbi", "cia", "homeland security", "interpol", "customs",
    "immigration", "embassy", "consulate", "foreign", "international", "overseas",
    "shipment", "package", "tracking", "delivery", "order", "purchase", "payment failed",
    "payment declined", "reset credentials", "login here", "secure login", "click below",
    "security code", "one-time password", "otp", "2fa", "mfa", "two-factor authentication",
    "multi-factor authentication", "token", "security key", "keylogger", "spyware",
    "ransomware", "trojan", "worm", "phishing", "smishing", "vishing", "spoof", "fake",
    "fraud", "deceptive", "impersonate", "clone", "mirror", "lookalike", "spoofed",
    "phishing site", "malicious", "dangerous", "harmful", "infected", "exploit", "zero day"
  ];
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let matches = 0;
  suspiciousWords.forEach(word => {
    if (lower.includes(word)) matches++;
  });
  const foundUrls = text.match(urlRegex);


  if (matches === 0 && !foundUrls) {
    return {
      label: THREAT_LABELS.safe,
      confidence: 0.99,
      explanation: "No scam, phishing, or malicious patterns found.",
      matches,
      foundUrls
    };
  }
  if ((matches < 3 && foundUrls) || (matches >= 3 && !foundUrls)) {
    return {
      label: THREAT_LABELS.suspicious,
      confidence: 0.65,
      explanation: `Some suspicious keywords or a URL were detected. Please be cautious.${
        foundUrls ? " URL(s) found: " + foundUrls.join(", ") : ""
      }`,
      matches,
      foundUrls
    };
  }
  if ((matches >= 3 && foundUrls) || (matches > 5)) {
    return {
      label: THREAT_LABELS.dangerous,
      confidence: 0.25,
      explanation: `Multiple scam/phishing words and at least one URL detected. This message is highly risky!${
        foundUrls ? " URL(s) found: " + foundUrls.join(", ") : ""
      }`,
      matches,
      foundUrls
    };
  }
  return {
    label: THREAT_LABELS.suspicious,
    confidence: 0.7,
    explanation: "Some threat indicators found. Use caution.",
    matches,
    foundUrls
  };
}

function speak(text) {
  if ("speechSynthesis" in window && text) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.rate = 1.05;
    window.speechSynthesis.speak(utter);
  }
}

export default function VoiceAssistant() {
  const [supported] = useState(
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window
  );
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [threatReport, setThreatReport] = useState(null);
  const [ttsOn, setTtsOn] = useState(false);
  const recognitionRef = useRef(null);

  const { setAnalysis } = useThreatAnalysis();
  const navigate = useNavigate();


  const startListening = () => {
    setError("");
    setTranscript("");
    setThreatReport(null);
    if (!supported) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) {
          final += res[0].transcript;
        } else {
          interim += res[0].transcript;
        }
      }
      setTranscript(final + interim);
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (
        event.error === "not-allowed" ||
        event.error === "denied" ||
        event.error === "no-speech"
      ) {
        setError(
          "Microphone access denied or not available. Please check permissions."
        );
      } else {
        setError("Speech recognition error: " + event.error);
      }
    };

    recognition.onend = () => {
      setListening(false);
      if (transcript.trim()) {
        const report = analyzeThreat(transcript.trim());
        setThreatReport(report);
        // Optionally set full analysis here (for SmartRiskScoring)
        setAnalysis({
          input: transcript.trim(),
          type: "text",
          score: Math.round(report.confidence * 100),
          status: report.label.level,
          category: report.label.category,
          explanations: [
            report.explanation,
            `Matched suspicious keywords: ${report.matches}`,
            report.foundUrls && report.foundUrls.length > 0
              ? `Detected URLs: ${report.foundUrls.join(", ")}`
              : undefined
          ].filter(Boolean),
          matches: report.matches,
        });
        if (ttsOn) {
          speak(
            `Threat level: ${report.label.level}. Confidence: ${Math.round(
              report.confidence * 100
            )} percent. ${report.explanation}`
          );
        }
      }
    };

    recognition.start();
  };


  const stopListening = () => {
    recognitionRef.current && recognitionRef.current.stop();
    setListening(false);
  };

  const handleViewFullAnalysis = () => {
    if (threatReport && transcript.trim()) {
      navigate("/smartriskscoring");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-3 py-10">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 m-12 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center text-blue-700">Voice Assistant</h1>
        <p className="text-center text-gray-600 text-sm">
          Speak a message. The assistant will transcribe and assess its risk in real time.
        </p>
        {!supported ? (
          <div className="bg-red-100 text-red-700 rounded-md p-4 text-center font-semibold">
            Sorry, your browser does not support the Web Speech API.
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <button
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow transition text-white text-3xl ${
                  listening
                    ? "bg-red-600 animate-pulse"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={listening ? stopListening : startListening}
                aria-label={listening ? "Stop listening" : "Start listening"}
                disabled={listening}
              >
                {listening ? (
                  <svg className="w-10 h-10 animate-pulse" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <rect x="9" y="9" width="6" height="6" rx="2" fill="currentColor" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
                    <rect x="9" y="5" width="6" height="10" rx="3" fill="currentColor" />
                    <path
                      d="M19 10v2a7 7 0 01-14 0v-2m7 7v3m-4 0h8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span className="text-xs text-gray-500">
                {listening ? "Listening..." : "Tap mic to speak"}
              </span>
              <label className="flex items-center gap-2 text-xs text-gray-600 select-none mt-2">
                <input
                  type="checkbox"
                  checked={ttsOn}
                  onChange={e => setTtsOn(e.target.checked)}
                  className="accent-blue-600"
                  disabled={listening}
                />
                Read threat report aloud
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">Recognized text:</span>
              <div className="min-h-[56px] border rounded bg-gray-50 p-3 text-gray-800 font-mono text-base">
                {transcript}
              </div>
            </div>
            {error && (
              <div className="bg-red-50 text-red-700 rounded-md p-3 text-center">
                {error}
              </div>
            )}
            {threatReport && (
              <div className={`p-5 mt-2 rounded-xl shadow-inner ${threatReport.label.color} flex flex-col gap-2`}>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <span className="capitalize">{threatReport.label.level}</span>
                  <span className="text-xs px-2 py-0.5 bg-white/60 rounded-full font-mono">
                    Confidence: {Math.round(threatReport.confidence * 100)}%
                  </span>
                </div>
                <div className="text-sm">{threatReport.label.desc}</div>
                <div className="text-xs text-gray-700">{threatReport.explanation}</div>
                {threatReport.matches > 0 && (
                  <div className="text-xs text-gray-700">
                    Matched suspicious keywords: {threatReport.matches}
                  </div>
                )}
                {threatReport.foundUrls && threatReport.foundUrls.length > 0 && (
                  <div className="text-xs text-gray-700 break-all">
                    <span>Detected URL(s): </span>
                    {threatReport.foundUrls.map((url, i) => (
                      <span key={i} className="underline text-blue-600">{url}{i < threatReport.foundUrls.length - 1 ? ', ' : ''}</span>
                    ))}
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
          </>
        )}
        <div className="text-xs text-gray-400 text-center mt-3">
          Powered by <span className="font-semibold">CyberWhisper</span> &mdash; Web Speech API
        </div>
      </div>
    </div>
  );
}