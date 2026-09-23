import React from 'react';
import { Bot, Radio, Terminal, FileCode2, UserCheck, Eye, Lock, Shield, Cpu, Zap, Activity } from 'lucide-react';
import { NavigationTab, SystemHealthStatus } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  health: SystemHealthStatus | null;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, health }) => {
  return (
    <header className="border-b border-cyan-500/20 bg-[#05070b]/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top Robotic HUD micro-bar */}
      <div className="px-4 py-1.5 bg-[#080d17]/80 border-b border-cyan-500/15 text-[11px] font-mono flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-orbitron font-bold tracking-wider text-[10px]">UNIT // BVNKV-X9</span>
          </span>

          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-400">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>CORE: <strong className="text-emerald-400 font-mono">100% ONLINE</strong></span>
          </span>

          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400 font-mono text-[10px]">
            SYNAPSE:{' '}
            <span className={health?.capabilities.geminiEngine ? 'text-cyan-400 font-bold' : 'text-amber-400'}>
              {health?.capabilities.geminiEngine ? 'GEMINI 3.8 FLASH [NEURAL]' : 'OFFLINE HEURISTIC'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono">
          <span className="hidden lg:flex items-center gap-1 text-slate-400">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>SHIELD: <span className="text-emerald-400 font-semibold">CSP+HSTS TITANIUM</span></span>
          </span>

          <span className="text-cyan-400 flex items-center gap-1 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            <Radio className="w-3 h-3 animate-pulse text-cyan-300" />
            <span>THROTTLE: 120 RPM</span>
          </span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand: bvnkv */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onSelectTab('misinfo')}>
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-950 flex items-center justify-center border border-cyan-400/50 shadow-lg shadow-cyan-500/25 group-hover:border-cyan-300 transition-all">
                <Bot className="w-6 h-6 text-white stroke-[2.2] animate-pulse-core" />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-widest text-white font-orbitron group-hover:text-cyan-300 transition-colors">
                  bvnkv
                </span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 tracking-wider">
                  AUTONOMOUS MECHA
                </span>
              </div>
              <p className="text-[10px] text-cyan-400/80 font-mono tracking-wider uppercase">Robotic Defense & Truth Matrix</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 font-mono">
            <button
              onClick={() => onSelectTab('misinfo')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border ${
                activeTab === 'misinfo'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Misinfo Radar</span>
            </button>

            <button
              onClick={() => onSelectTab('threat')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border ${
                activeTab === 'threat'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/60 shadow-lg shadow-rose-500/20'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Threat Defense</span>
            </button>

            <button
              onClick={() => onSelectTab('xai')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border ${
                activeTab === 'xai'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-400/60 shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>XAI Neural Hub</span>
            </button>

            <button
              onClick={() => onSelectTab('hygiene')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border ${
                activeTab === 'hygiene'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Cyber Hygiene & Logs</span>
            </button>

            <button
              onClick={() => onSelectTab('auth')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border ${
                activeTab === 'auth'
                  ? 'bg-blue-500/20 text-blue-300 border-blue-400/60 shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Auth Vault</span>
            </button>

            <button
              onClick={() => onSelectTab('blueprint')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border ${
                activeTab === 'blueprint'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>System Blueprint</span>
            </button>
          </nav>
        </div>

        {/* Mobile Tab Scroller */}
        <div className="flex md:hidden overflow-x-auto gap-2 py-2 border-t border-slate-800/80 no-scrollbar">
          {[
            { id: 'misinfo', label: 'Misinfo Radar' },
            { id: 'threat', label: 'Threat Defense' },
            { id: 'xai', label: 'XAI Neural' },
            { id: 'hygiene', label: 'Hygiene & Logs' },
            { id: 'auth', label: 'Auth Vault' },
            { id: 'blueprint', label: 'Blueprint' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id as NavigationTab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'text-slate-400 bg-slate-900 border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
