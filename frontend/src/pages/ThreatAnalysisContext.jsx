import React, { createContext, useContext, useState } from "react";

const ThreatAnalysisContext = createContext();

export function useThreatAnalysis() {
  return useContext(ThreatAnalysisContext);
}

export function ThreatAnalysisProvider({ children }) {
  const [analysis, setAnalysis] = useState(null);
  return (
    <ThreatAnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </ThreatAnalysisContext.Provider>
  );
}