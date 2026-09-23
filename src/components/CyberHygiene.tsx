import React, { useState } from 'react';
import { 
  UserCheck, ShieldCheck, KeyRound, AlertTriangle, CheckCircle, 
  RefreshCw, Lock, Database, EyeOff, ShieldAlert, Cpu, Terminal, Radio, Bot, Zap
} from 'lucide-react';
import { CyberHygieneReport } from '../types';
import { SecurityLogs } from './SecurityLogs';

export const CyberHygiene: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<'hygiene' | 'logs'>('hygiene');
  const [emailInput, setEmailInput] = useState('user.sentinel@enterprise.org');
  const [passwordInput, setPasswordInput] = useState('Passw0rd123!');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<CyberHygieneReport | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const handleAudit = async (eEmail?: string, pPass?: string) => {
    const email = eEmail !== undefined ? eEmail : emailInput;
    const pass = pPass !== undefined ? pPass : passwordInput;

    setLoading(true);

    try {
      const res = await fetch('/api/hygiene/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passwordToEvaluate: pass }),
      });

      if (!res.ok) throw new Error('Audit failed');

      const data: CyberHygieneReport = await res.json();
      setReport(data);
    } catch (err) {
      console.error('[Hygiene Audit Error]', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (index: number) => {
    const next = new Set(completedTasks);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setCompletedTasks(next);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>bvnkv // Autonomous Cyber Hygiene & Telemetry Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-orbitron">
            Digital Footprint, Vulnerabilities & Security Logs
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Audits credential resilience, dark web breach mentions (k-anonymity model), active hardening checklists, and delivers full real-time transparency via the bvnkv system incident stream.
          </p>
        </div>
      </div>

      {/* View Switcher: Footprint & Hardening vs Security Incident Logs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubView('hygiene')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeSubView === 'hygiene'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Vulnerability & Footprint Audit</span>
        </button>

        <button
          onClick={() => setActiveSubView('logs')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeSubView === 'logs'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Security Logs & Incident Feed</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {activeSubView === 'logs' ? (
        <SecurityLogs embedded={false} />
      ) : (
        <>
          {/* Input Audit Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Primary Identity / Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Password Strength & Entropy Test
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="Enter password to test offline entropy..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 font-mono pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-2">
              <span className="text-xs font-mono text-slate-500">
                Privacy Guarantee: Client-side hash verification. Passwords are never stored or transmitted in plain text.
              </span>

              <button
                onClick={() => handleAudit()}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold font-mono text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-600/25 border border-emerald-500/40 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" />
                    <span>Auditing Posture...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4 text-emerald-200" />
                    <span>Run Autonomous Hygiene Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hygiene Audit Results */}
          {report && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Posture Score & Entropy Card */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-slate-400">Cyber Hygiene Score</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      NIST SP 800-63B
                    </span>
                  </div>

                  <div className="text-center my-4">
                    <div className={`text-6xl font-mono font-black ${
                      report.hygieneScore >= 75 ? 'text-emerald-400' : report.hygieneScore >= 50 ? 'text-amber-400' : 'text-rose-500'
                    }`}>
                      {report.hygieneScore}
                      <span className="text-2xl font-mono text-slate-500 ml-1">/100</span>
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">
                      {report.hygieneScore >= 75 ? 'Resilient Footprint' : 'Vulnerabilities Present'}
                    </div>
                  </div>

                  {/* Password Entropy Analysis */}
                  <div className="mt-6 pt-4 border-t border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Shannon Entropy:</span>
                      <span className="text-cyan-400 font-bold">{report.credentialHygiene.testedEntropyBits} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Classification:</span>
                      <span className="text-slate-200">{report.credentialHygiene.strengthClassification}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">GPU Crack Time:</span>
                      <span className="text-emerald-400">{report.credentialHygiene.bruteForceCrackTimeEstimate}</span>
                    </div>
                  </div>
                </div>

                {/* Dark Web Breach Exposure Card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
                    <Database className="w-4 h-4 text-rose-400" />
                    Data Breach & Exposure History
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between pb-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Known Corporate Breaches:</span>
                      <span className="text-rose-400 font-bold">{report.exposureProfile.knownBreachesCount} Occurrences</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Dark Web Footprint:</span>
                      <span className="text-amber-400">{report.exposureProfile.darkWebMentions}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      Exposed Classes: {report.exposureProfile.compromisedDataClasses.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardening Checklist & Action Plan */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Personalized Security Hardening Checklist
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {completedTasks.size} of {report.hardeningChecklist.length} Completed
                    </span>
                  </div>

                  <div className="space-y-3">
                    {report.hardeningChecklist.map((item, idx) => {
                      const isDone = completedTasks.has(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleTask(idx)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                            isDone
                              ? 'bg-emerald-500/10 border-emerald-500/30 opacity-70'
                              : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                  : 'border-slate-700 bg-slate-900'
                              }`}
                            >
                              {isDone && <CheckCircle className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <span
                                className={`text-sm font-medium ${
                                  isDone ? 'line-through text-slate-400' : 'text-slate-200'
                                }`}
                              >
                                {item.task}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                item.priority === 'Critical'
                                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                  : item.priority === 'High'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                              }`}
                            >
                              {item.priority}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Embedded Security Event Stream at the bottom of Cyber Hygiene for maximum transparency */}
          <SecurityLogs embedded={true} />
        </>
      )}
    </div>
  );
};

