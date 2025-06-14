import React, { useState } from "react";
import axios from "axios";

const ALGO_EXPLORER_BASE = "https://testnet.algoexplorer.io/tx"; 

export default function BlockchainLogger({ result, trigger = "button" }) {
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const prepareLogMessage = () => {
    const message = {
      input: result?.input ?? "",
      threatLevel: result?.status ?? "",
      confidence: result?.score ?? "",
      timestamp: new Date().toISOString(),
    };
    return JSON.stringify(message);
  };

  const logToBlockchain = async () => {
    setLoading(true);
    setError("");
    setSuccessMsg("");
    setTxId("");
    try {
      const payload = {
        note: prepareLogMessage(),
      };

      const res = await axios.post("/api/log", payload);

      if (res.data && (res.data.txId || res.data.txid || res.data.id)) {
        const realTxId = res.data.txId || res.data.txid || res.data.id;
        setTxId(realTxId);
        setSuccessMsg("Threat analysis successfully logged to Algorand blockchain!");
      } else {
        throw new Error("Unexpected response from backend: " + JSON.stringify(res.data));
      }
    } catch (e) {
      setError(
        e?.response?.data?.error ||
        e?.response?.data?.message ||
        e.message ||
        "Failed to log to blockchain."
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (trigger === "mount") {
      logToBlockchain();
    }
    
  }, []); 
  return (
    <div className="w-full max-w-lg mx-auto mt-12 bg-white shadow rounded-xl p-6 flex flex-col gap-4 border border-gray-200">
      <h2 className="text-xl font-bold text-blue-700 mb-2 flex gap-2 items-center">
        Log to Algorand Blockchain
      </h2>
      {trigger === "button" && (
        <button
          onClick={logToBlockchain}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold shadow transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging..." : "Log to Blockchain"}
        </button>
      )}
      {loading && trigger === "mount" && (
        <div className="flex gap-2 items-center text-blue-700 font-semibold">
          Logging to blockchain...
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 border border-red-300 rounded-md p-3 font-medium">
          Error: {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-green-100 text-green-800 border border-green-300 rounded-md p-3 font-medium flex flex-col gap-1">
          {successMsg}
          {txId && (
            <div>
              <span className="font-semibold">Transaction ID:</span> <span className="font-mono text-xs break-all">{txId}</span>
              <br />
              <a
                href={`${ALGO_EXPLORER_BASE}/${txId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline text-xs"
              >
                View on Algorand Explorer
              </a>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-500 mt-2">
        This logs a summary of the risk analysis to the decentralized Algorand blockchain for audit & verification.
      </div>
    </div>
  
  );
}