import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load ENV variables
// const mnemonic = process.env.ALGO_MNEMONIC;
// const sender = process.env.ALGO_SENDER_ADDRESS ? process.env.ALGO_SENDER_ADDRESS.trim() : "";
// const receiver = process.env.ALGO_RECEIVER_ADDRESS
//   ? process.env.ALGO_RECEIVER_ADDRESS.trim()
//   : sender;
// const algodServer = process.env.ALGOD_SERVER;
// const algodPort = process.env.ALGOD_PORT || "";
// const algodToken = process.env.ALGOD_TOKEN || "";

// // Debug prints
// console.log("Loaded env file values:");
// console.log("ALGO_MNEMONIC:", mnemonic ? "[LOADED]" : "[MISSING]");
// console.log("ALGO_SENDER_ADDRESS:", sender);
// console.log("ALGO_RECEIVER_ADDRESS:", receiver);
// console.log("ALGOD_SERVER:", algodServer);

// if (!mnemonic || !sender || !receiver || !algodServer) {
//   throw new Error("Missing environment variables for Algorand config");
// }

// // Mock account log
// console.log("Recovered account object:", {
//   addr: sender,
//   sk: "[HIDDEN]",
// });
// console.log("Account addr:", sender);
// console.log("Account sk exists:", true);
// console.log("Sender address length:", sender.length);
// console.log("Receiver address length:", receiver.length);

app.post("/api/log", async (req, res) => {
  try {
    const note = req.body.note || "No message provided";
    const blockchainTxId = "BLOCKCHAIN-TXID-" + Math.random().toString(36).substring(2, 10);
    console.log("Logging note to blockchain:", note, "| blockchain txId:", blockchainTxId);
    res.json({ txId: blockchainTxId, mocked: true });
  } catch (err) {
    console.error("Blockchain log error:", err);
    res.status(500).json({
      error: "Failed to log to blockchain.",
      details: err.message,
    });
  }
});

app.listen(5000, () =>
  console.log("Algorand logger listening on http://localhost:5000")
);