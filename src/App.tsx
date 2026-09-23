/**
 * bvnkv - Autonomous Robotic Cyber Insecurity, Misinformation & AI Transparency Matrix
 * Root Application Component
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MisinfoShield } from './components/MisinfoShield';
import { ThreatScanner } from './components/ThreatScanner';
import { XaiMonitor } from './components/XaiMonitor';
import { CyberHygiene } from './components/CyberHygiene';
import { AuthSecurityLab } from './components/AuthSecurityLab';
import { ArchitectureBlueprint } from './components/ArchitectureBlueprint';
import { NavigationTab, SystemHealthStatus } from './types';
import { Bot, Cpu, Zap, FileCode2, Terminal, Shield, Sparkles, Sliders } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('misinfo');
  const [health, setHealth] = useState<SystemHealthStatus | null>(null);
  const [turboMode, setTurboMode] = useState<boolean>(true);

  // Poll system health and capabilities on startup
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => console.warn('Health check notification:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#05070b] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 scanlines relative">
      {/* Dynamic Cyber Grid Background */}
      <div className="fixed inset-0 cyber-grid opacity-80 pointer-events-none z-0" />

      {/* Futuristic Mecha Ambient Glow Orbs */}
      <div className="fixed top-12 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none -z-10" />

      {/* Global Navbar with Robotic Telemetry */}
      <Navbar activeTab={activeTab} onSelectTab={setActiveTab} health={health} />

      {/* Robotic Efficiency & Status Bar */}
      <div className="border-b border-cyan-500/15 bg-slate-950/70 py-1.5 px-4 text-[11px] font-mono relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-orbitron tracking-wider">bvnkv-robotics</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-300">
              ARCH: <span className="text-cyan-400 font-semibold">NEURAL-MECHA-HYBRID</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline text-slate-400">
              RESPONSE: <span className="text-emerald-400 font-bold">&lt;35ms</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTurboMode(!turboMode)}
              className={`px-2 py-0.5 rounded border text-[10px] flex items-center gap-1 transition-all ${
                turboMode 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/30' 
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Zap className={`w-3 h-3 ${turboMode ? 'text-cyan-300 fill-cyan-300' : 'text-slate-500'}`} />
              <span>{turboMode ? 'TURBO MECHA OVERDRIVE: ON' : 'ECO RUNTIME: ACTIVE'}</span>
            </button>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-emerald-400 hidden md:flex items-center gap-1 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SUBSYSTEMS: OPTIMAL</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {activeTab === 'misinfo' && <MisinfoShield />}
        {activeTab === 'threat' && <ThreatScanner />}
        {activeTab === 'xai' && <XaiMonitor />}
        {activeTab === 'hygiene' && <CyberHygiene />}
        {activeTab === 'auth' && <AuthSecurityLab />}
        {activeTab === 'blueprint' && <ArchitectureBlueprint />}
      </main>

      {/* Robotic HUD Footer */}
      <footer className="border-t border-cyan-500/20 bg-[#05070b]/95 py-6 relative z-10 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-orbitron font-bold tracking-wider text-white">bvnkv</span>
            <span className="text-slate-600">::</span>
            <span className="text-cyan-400">AUTONOMOUS DEFENSE ROBOTICS</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">ZERO-TRUST TRUTH POSTURE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setActiveTab('blueprint')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-300"
            >
              <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full System Blueprint</span>
            </button>

            <span className="text-slate-700">|</span>
            <span className="text-slate-400">OWASP TOP 10</span>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400">NIST AI RMF 1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
