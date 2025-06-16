import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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


app.post('/api/scan', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL in request body' });

  try {
    const response = await fetch('https://www.virustotal.com/api/v3/urls', {
      method: 'POST',
      headers: {
        'x-apikey': process.env.VIRUSTOTAL_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `url=${encodeURIComponent(url)}`
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Scan Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/report', async (req, res) => {
  const { analysisId } = req.body;
  if (!analysisId) return res.status(400).json({ error: 'Missing analysisId in request body' });

  try {
    const response = await fetch(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: {
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
      }
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Report Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000);