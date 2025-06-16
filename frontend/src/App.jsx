import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LinkTextAnalysis from './pages/LinkTextAnalysis';
import VoiceAssistant from './pages/VoiceAssistant';
import SmartRiskScoring from './pages/SmartRiskScoring';
import Homepage from './pages/Homepage';
import BlockchainLogger from './pages/BlockchainLogger';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Trynow from './pages/Trynow';
import { ThreatAnalysisProvider } from "./pages/ThreatAnalysisContext";

const App = () => {
  return (
    <ThreatAnalysisProvider>
      <Router>
        <div className="app-container flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/try-now" element={<Trynow />} />
              <Route path="/linktextanalysis" element={<LinkTextAnalysis />} />
              <Route path="/voice-assistant" element={<VoiceAssistant />} />
              <Route path="/smartriskscoring" element={<SmartRiskScoring />} />
              <Route path="/blockchain-logs" element={<BlockchainLogger />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThreatAnalysisProvider>
  );
};

export default App;