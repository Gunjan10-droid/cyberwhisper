# CyberWhisper

**CyberWhisper** is an AI-powered scam and phishing detection platform that enables users to speak or paste suspicious messages and links, analyze them for threats in real-time, and log severe incidents using blockchain transparency. It leverages voice recognition, advanced text analysis, and integrates with VirusTotal for robust security checks—all in a modern, privacy-first, no-login web app.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure & File Overview](#folder-structure--file-overview)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [VirusTotal Integration](#virustotal-integration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **🎙️ Voice Assistant:** Speak directly to analyze messages for scams/phishing.
- **🔗 Link & Text Analysis:** Paste any message, email, or link for instant fraud detection.
- **🧠 Smart Risk Scoring:** Get detailed confidence scores and human-friendly explanations.
- **🔒 Blockchain Logging:** Mock Algorand logging for transparent, tamper-proof threat tracking.
- **🌐 VirusTotal Integration:** URLs are checked live against VirusTotal's threat intelligence.
- **Modern UI:** Responsive, cyber-themed design using Tailwind CSS and Lucide icons.
- **No Login Required:** Privacy-first; users stay anonymous.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Express
- **Routing:** React Router
- **SVG/Icons:** Custom SVG, Lucide Icons
- **APIs:** VirusTotal Public API
- **Blockchain:** Mock Algorand logic (for demo/logging)
- **Other:** react-scroll (smooth section navigation)

---

## Folder Structure & File Overview

### Root

- **README.md** – This documentation file.
- **frontend/** – All source code:
- **api/** - server.js

### Key Files & Folders

<details>
<summary><strong>Click to expand a detailed file-by-file description</strong></summary>

#### `src/App.jsx`
- Main app wrapper. Sets up app-wide routing using React Router. Loads the Navbar and Footer components for persistent layout. Defines all primary routes—home, try-now, feature pages, about, contact, etc.

#### `src/pages/Homepage.jsx`
- **Landing page.**
- Hero section with mission statement, animated logo.
- Features grid (voice input, link/text analysis, risk scoring, blockchain logging).
- "How it Works" step-by-step guide.
- Interactive "Try It Now" demo section where users can paste/speak a message or link. Uses VirusTotal API for URL analysis, and custom logic for text messages.
- Comparison table: CyberWhisper vs. others.
- All sections are scroll-linked for navigation.

#### `src/pages/TryNow.jsx`
- Dedicated "Try Now" portal with two big cards:
  - Voice Assistant (routes to `/voice-assistant`)
  - Link & Text Analysis (routes to `/linktextanalysis`)
- Responsive, visually engaging, and encourages user interaction.

#### `src/pages/VoiceAssistant.jsx`
- Voice input tool using browser's Web Speech API.
- Listens for user speech, transcribes, sends for threat analysis.
- Returns real-time risk result with confidence score.

#### `src/pages/LinkTextAnalysis.jsx`
- Paste or type any message/link for analysis.
- If a URL is detected, sent to VirusTotal API for threat intelligence.
- For text, uses keyword-based and pattern heuristics.
- Returns result with type (safe, suspicious, high-risk) and confidence.

#### `src/pages/SmartRiskScoring.jsx`
- Shows a more detailed breakdown of the AI/heuristic risk scoring for a given input.
- Explains which features and patterns contributed to the score.

#### `src/pages/BlockchainLogs.jsx`
- Displays a simulated log/history of major threats, using mocked Algorand blockchain data structure for transparency and traceability.

#### `src/pages/ContactUs.jsx`
- Contact form (name, email, subject, message) with validation and cyber-themed UI.
- Contact info and team details.
- No backend: demo only (messages not sent).

#### `src/pages/AboutUs.jsx`
- Team and project background, vision, and roadmap.

#### `src/components/Navbar.jsx`
- Responsive navigation bar.
- Links to all major sections and pages.
- "Try Now" button routes to the Try Now page.
- Uses a custom SVG logo.

#### `src/components/Footer.jsx`
- Persistent footer with:
  - Custom SVG logo
  - Social/documentation/contact links
  - Copyright
- GitHub link points to [Gunjan10-droid/cyberwhisper](https://github.com/Gunjan10-droid/cyberwhisper).

#### `src/components/FeatureCard.jsx`
- Used to render feature sections with colorful icon backgrounds and details.
- Props: icon, title, desc, to, bg.
- Prominent in Features grid and Try Now page.

#### `public/favicon.svg`
- Custom SVG favicon: shield, mic, and waves, fitting in a circle for perfect browser visibility.

#### `tailwind.config.js`
- Tailwind CSS configuration for theme, colors, and custom utilities.

#### `.env`
- **Not committed!**  
- You must add your VirusTotal API key here as:  
  ```
  VIRUSTOTAL_API_KEY=your_key_here
  ```
</details>

---

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/Gunjan10-droid/cyberwhisper.git
   cd cyberwhisper
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Add your VirusTotal API key:**  
   Create a `.env` file in the root and add:
   ```
   VIRUSTOTAL_API_KEY=your_key_here
   ```

4. **Start development server:**
   ```sh
   npm run dev
   ```
   App runs at `http://localhost:5173` (or as printed).

---

## Environment Variables

- `VIRUSTOTAL_API_KEY` — Your [VirusTotal](https://virustotal.com/) public API key (free registration available).

---

## VirusTotal Integration

- For any pasted **URL**, the app sends a request to VirusTotal for real-time threat scoring.
- For **text/messages**, heuristic and keyword-based analysis is used.
- No user data is permanently stored on the CyberWhisper servers (frontend only).

---

## Usage

- **Try It Now:** Use the homepage demo or the /try-now page for quick access to both main features.
- **Voice Assistant:** Click the microphone, allow browser access, and speak your message.
- **Link & Text Analysis:** Paste any suspicious content and get instant feedback.
- **Review Logs:** Check the Blockchain Logging page for a transparent record of severe threats (simulated).

---

## Contributing

Contributions are welcome!

- Open issues for bugs or features.
- Fork and submit PRs for improvements.
- Please follow best practices, code style, and add documentation/comments.

---

## Hackathon & Platform

- **Built on [Bolt.new](https://bolt.new/)** 
- https://bolt.new/~/github-tkwii22n-w8t4tlsd
---

## License

[MIT](LICENSE)

---

## Contact

- **GitHub:** [Gunjan10-droid/cyberwhisper](https://github.com/Gunjan10-droid/cyberwhisper)
- **Email:** gunjanagrawal582@gmail.com

---

**Built with 🛡️ by Team CyberWhisper. Stay safe, stay ahead!**