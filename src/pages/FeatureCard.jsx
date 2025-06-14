import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon, title, desc, to, bg }) => (
  <a href={to} className="block group border border-blue-800/40 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 transition-all shadow-xl p-6 text-center h-full">
    <div className={`${bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-blue-200">{title}</h3>
    <p className="text-blue-100 text-sm">{desc}</p>
  </a>
);

export default FeatureCard;