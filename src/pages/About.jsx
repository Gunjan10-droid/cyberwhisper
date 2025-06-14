import React from "react";
import { User, Shield, Eye, Brain, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const coreValues = [
  {
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    title: "Privacy First",
    desc: "We never store your personal data. All analyses are performed with strict privacy in mind.",
  },
  {
    icon: <Eye className="w-8 h-8 text-green-400" />,
    title: "Transparency",
    desc: "Our processes and results are open—no black boxes. We log threats transparently.",
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    title: "AI for Good",
    desc: "We harness AI to help people, not exploit them. Our aim is to make technology a force for protection.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-cyan-400" />,
    title: "Open Innovation",
    desc: "We believe in rapid iteration, open feedback, and sharing our progress with the community.",
  },
];

const team = [
  {
    name: "Gunjan Agrawal",
    role: "Founder & Lead Developer",
    avatar: "https://avatars.githubusercontent.com/u/142145209?v=4", // Placeholder
  },

  // Add more or replace with actual team members as needed
];

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white font-sans">
    {/* Hero Section */}
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
          About CyberWhisper
        </h1>
        <p className="mt-2 text-xl text-blue-100">
          Built to Protect. Powered by AI. Inspired by Trust.
        </p>
      </div>
    </section>

    {/* Mission Section */}
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-blue-300 mb-4">Our Mission</h2>
        <p className="text-lg text-blue-100">
          Our mission is to empower users to identify and avoid scams before they fall victim, using intelligent, real-time voice and text analysis.
        </p>
      </div>
    </section>

    {/* Why We Built This Section */}
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-blue-300 mb-4">Why We Built This</h2>
        <p className="text-blue-100 text-lg mb-2">
          Digital scams are rising at an alarming rate, targeting everyone from individuals to large organizations. Most people lack accessible, real-time tools to spot fraud before it&rsquo;s too late.
        </p>
        <p className="text-blue-100 text-lg">
          We built CyberWhisper to create a privacy-first, AI-powered shield against scams—making advanced threat detection available to everyone.
        </p>
      </div>
    </section>

    {/* Core Values */}
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-300 text-center mb-8">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((val, i) => (
            <div
              key={i}
              className="bg-slate-800/70 rounded-2xl p-6 border border-blue-500/20 text-center hover:border-cyan-400 transition-all"
            >
              <div className="mb-4 flex justify-center">{val.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-blue-100">{val.title}</h3>
              <p className="text-blue-200 text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Meet the Team */}
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-300 text-center mb-8">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full border-2 border-blue-500 mb-3 object-cover"
              />
              <div className="text-blue-100 font-semibold">{member.name}</div>
              <div className="text-blue-400 text-sm">{member.role}</div>
            </div>
          ))}
          {/* To add real team members, replace above with actual data */}
        </div>
      </div>
    </section>

    
  </div>
);

export default About;