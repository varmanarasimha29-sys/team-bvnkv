import React, { useState } from 'react';
import { 
  ShieldAlert, AlertTriangle, CheckCircle, Bug, Mail, Globe, 
  Terminal, ShieldCheck, ArrowRight, Copy, Check, Radio, Bot, Zap
} from 'lucide-react';
import { ThreatAnalysisResult } from '../types';

const PRESET_THREATS = [
  {
    label: 'Homoglyph Phishing URL',
    type: 'url' as const,
    target: 'http://paypa1-login-verification.top/update-billing?user=target_exec',
    description: 'Impersonates PayPal with "1" character on high-abuse TLD .top',
  },
  {
    label: 'CEO Urgency Wire Fraud Email',
    type: 'email' as const,
    target: `From: CEO Richard Sterling <richard.sterling@exec-corporation-alert.xyz>
To: accounting@company.com
Subject: URGENT: Wire Transfer Required Before 4:00 PM EST

Please execute an immediate confidential wire of $84,500 to our offshore partner escrow. 
I am boarding a flight and cannot take calls. Click here immediately to confirm authorization:
http://185.220.101.5/auth/wire-confirm?tx=88942`,
    description: 'Executive impersonation + urgent wire transfer + raw IP address link',
  },
  {
    label: 'Legitimate Corporate Domain',
    type: 'url' as const,
    target: 'https://security.google.com/settings/security',
    description: 'Verified TLS 1.3 apex domain with authentic trust reputation',
  },
];

export const ThreatScanner: React.FC = () => {
  const [scanType, setScanType] = useState<'url' | 'email'>('url');
  const [inputTarget, setInputTarget] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ThreatAnalysisResult | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleScan = async (overrideTarget?: string, overrideType?: 'url' | 'email') => {
    const target = overrideTarget !== undefined ? overrideTarget : inputTarget;
    const type = overrideType !== undefined ? overrideType : scanType;

    if (!target.trim()) {
      setError('Please provide a URL or email payload to scan.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze/threat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, type }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data: ThreatAnalysisResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error('[Threat Scan Error]', err);
      setError('Failed to complete cyber threat scanning. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (preset: typeof PRESET_THREATS[0]) => {
    setScanType(preset.type);
    setInputTarget(preset.target);
    handleScan(preset.target, preset.type);
  };

  const copyTelemetry = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono mb-3">
              <Bot className="w-3.5 h-3.5 text-rose-400" />
              <span>bvnkv // Autonomous Cyber Insecurity & Threat Shield</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-orbitron">
              Phishing, Malware & Attack Vector Scanner
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Deconstructs deceptive URLs, homoglyphs (punycode lookalikes), suspicious TLDs, and spear-phishing email headers. bvnkv generates SOC-ready indicators of compromise (IOCs) and immediate remediation protocols.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase text-rose-400">Threat Test Vectors:</span>
            <div className="flex flex-col gap-2">
              {PRESET_THREATS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => loadPreset(preset)}
                  className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-rose-500/20 hover:border-rose-500/50 text-left text-xs font-mono text-slate-300 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    {preset.type === 'url' ? <Globe className="w-3.5 h-3.5 text-cyan-400" /> : <Mail className="w-3.5 h-3.5 text-amber-400" />}
                    <span className="font-semibold">{preset.label}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input Scanner Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        {/* Toggle Mode: URL vs Email */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setScanType('url')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
              scanType === 'url'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>URL / Domain Scanner</span>
          </button>

          <button
            onClick={() => setScanType('email')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
              scanType === 'email'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email & Header Heuristics</span>
          </button>
        </div>

        <div className="space-y-4">
          {scanType === 'url' ? (
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Target URL / Hostname
              </label>
              <input
                type="text"
                value={inputTarget}
                onChange={e => setInputTarget(e.target.value)}
                placeholder="e.g. http://secure-banking-alert.xyz/login"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/50 font-mono"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Email Raw Body / RFC-822 Headers
              </label>
              <textarea
                rows={5}
                value={inputTarget}
                onChange={e => setInputTarget(e.target.value)}
                placeholder="Paste raw email message with headers (From, Subject, Body)..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/50 font-mono"
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-rose-400 font-mono hidden sm:flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-rose-400" />
              <span>Sensors: Homoglyph DB + Suspicious TLD Registry + Header Verifier</span>
            </div>

            <button
              onClick={() => handleScan()}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold font-mono text-xs tracking-wider uppercase transition-all shadow-lg shadow-rose-600/25 border border-rose-500/40 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Bug className="w-4 h-4 animate-spin text-rose-200" />
                  <span>Scanning Threat Vectors...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Inspect Threat Payload</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Threat Results Display */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Threat Metric Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-slate-400">Heuristic Threat Score</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  CVSS v3.1
                </span>
              </div>

              {/* Large Score Readout */}
              <div className="flex items-baseline justify-center my-4">
                <span className={`text-6xl font-mono font-black ${
                  result.threatScore >= 70
                    ? 'text-rose-500'
                    : result.threatScore >= 40
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}>
                  {result.threatScore}
                </span>
                <span className="text-2xl font-mono text-slate-500 ml-1">/100</span>
              </div>

              {/* Level & Category */}
              <div className="text-center space-y-2 mt-4">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                  result.threatScore >= 70
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : result.threatScore >= 40
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  {result.threatScore >= 70 ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                  <span>{result.threatLevel}</span>
                </div>

                <div className="text-sm font-semibold text-slate-200">
                  Classification: <span className="text-cyan-400">{result.category}</span>
                </div>
              </div>

              {/* Domain & Network Posture */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Apex Target:</span>
                  <span className="text-slate-200 truncate max-w-[170px]">{result.domainAnalysis.normalizedDomain}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Homoglyph / Punycode:</span>
                  <span className={result.domainAnalysis.isPunycodeOrHomoglyph ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                    {result.domainAnalysis.isPunycodeOrHomoglyph ? 'DETECTED' : 'None'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Abuse TLD Flag:</span>
                  <span className={result.domainAnalysis.suspiciousTld ? 'text-rose-400' : 'text-slate-300'}>
                    {result.domainAnalysis.suspiciousTld ? 'High Risk TLD' : 'Nominal'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>SSL Posture:</span>
                  <span className="text-slate-300">{result.domainAnalysis.sslPosture}</span>
                </div>
              </div>
            </div>

            {/* Email Header Audit (if applicable) */}
            {result.emailHeaderAudit && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  Email Authentication Posture
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">SPF</div>
                    <div className={result.emailHeaderAudit.spfStatus === 'PASS' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {result.emailHeaderAudit.spfStatus}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">DKIM</div>
                    <div className={result.emailHeaderAudit.dkimStatus === 'PASS' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {result.emailHeaderAudit.dkimStatus}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">DMARC</div>
                    <div className={result.emailHeaderAudit.dmarcStatus === 'PASS' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {result.emailHeaderAudit.dmarcStatus}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Threat Vectors & Containment Guidance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detected Threat Vectors */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2 mb-4">
                <Bug className="w-4 h-4" />
                Triggered Threat Vectors & Deception Indicators
              </h3>
              <div className="space-y-3">
                {result.detectedThreatVectors.map((vec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-start gap-3"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 font-mono leading-relaxed">{vec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SOC Incident Containment Playbook */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4" />
                Immediate Actionable Containment Steps
              </h3>
              <div className="space-y-2.5">
                {result.remediationAdvice.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-[10px] font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-slate-300 font-sans">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical IOC / Telemetry Digest */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400 truncate">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{result.technicalTelemetry}</span>
              </div>
              <button
                onClick={() => copyTelemetry(result.technicalTelemetry)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 shrink-0 transition-all"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Copied' : 'Copy IOC'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
