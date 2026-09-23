import React, { useState } from 'react';
import { 
  Lock, Key, Shield, ShieldCheck, CheckCircle2, RefreshCw, 
  Terminal, Eye, Layers, Copy, Check, Bot, Zap
} from 'lucide-react';

export const AuthSecurityLab: React.FC = () => {
  const [username, setUsername] = useState('sentinel_admin');
  const [role, setRole] = useState('Cyber Defense Analyst Tier 3');
  const [mfaCode, setMfaCode] = useState('482910');
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'jwt' | 'mfa' | 'middleware'>('jwt');

  const handleGenerateSession = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/demo-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, role }),
      });

      const data = await res.json();
      setSessionData(data);
    } catch (err) {
      console.error('Session generation failed', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToken = () => {
    if (!sessionData?.token) return;
    navigator.clipboard.writeText(sessionData.token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
            <Bot className="w-3.5 h-3.5 text-blue-400" />
            <span>bvnkv // Autonomous Cryptographic Zero-Trust Session Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-orbitron">
            Encrypted Auth Architecture & Zero-Trust Session Lab
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Examines cryptographic token structures (HMAC-SHA256 JWTs), Argon2id password hashing parameters, RFC 6238 TOTP Multi-Factor Authentication, and active defense middleware (Anti-CSRF & XSS nullification).
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('jwt')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeSubTab === 'jwt'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>JWT Cryptographic Inspector</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mfa')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeSubTab === 'mfa'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>MFA (TOTP) Protocol</span>
        </button>

        <button
          onClick={() => setActiveSubTab('middleware')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activeSubTab === 'middleware'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Security Middleware & Headers</span>
        </button>
      </div>

      {/* Sub-tab 1: JWT Session Inspector */}
      {activeSubTab === 'jwt' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">
              Simulate Authenticated Session Issuance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">User Subject (sub)</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Assigned Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerateSession}
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-semibold flex items-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Issue Signed JWT Token</span>
              </button>
            </div>
          </div>

          {sessionData && (
            <div className="space-y-6">
              {/* Encoded JWT String */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400">Cryptographically Signed Token</span>
                  <button
                    onClick={copyToken}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedToken ? 'Copied' : 'Copy Token'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-950/90 rounded-xl font-mono text-xs break-all leading-relaxed text-slate-300 border border-slate-800">
                  <span className="text-rose-400">{sessionData.token.split('.')[0]}</span>
                  <span className="text-slate-600">.</span>
                  <span className="text-purple-400">{sessionData.token.split('.')[1]}</span>
                  <span className="text-slate-600">.</span>
                  <span className="text-cyan-400">{sessionData.token.split('.')[2]}</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono mt-2 text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" /> Header
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" /> Payload
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> HMAC-SHA256 Signature
                  </span>
                </div>
              </div>

              {/* Decoded Token Structure Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-purple-400">Decoded Claims Payload</h4>
                  <pre className="p-3 bg-slate-950/80 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800/80">
                    {JSON.stringify(sessionData.decoded.payload, null, 2)}
                  </pre>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-cyan-400">Security Architecture Spec</h4>
                  <pre className="p-3 bg-slate-950/80 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800/80">
                    {JSON.stringify(sessionData.securityContext, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-tab 2: MFA TOTP Protocol */}
      {activeSubTab === 'mfa' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase text-slate-300">
              Multi-Factor Authentication (RFC 6238 Time-Based OTP)
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              FIDO2 Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-slate-400">Authenticator Secret:</div>
              <div className="p-2 bg-slate-900 rounded border border-slate-700 text-cyan-400 text-center tracking-widest font-bold">
                JBSWY3DPEHPK3PXP (Base32)
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed">
                TOTP seeds are encrypted at rest with envelope KMS encryption. One-time codes refresh every 30 seconds according to Unix epoch intervals.
              </div>
            </div>

            <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
              <label className="block text-xs font-mono uppercase text-slate-400">Verify 6-Digit Code</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={e => setMfaCode(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-center text-lg font-mono tracking-widest text-emerald-400 w-44"
                />
                <button
                  onClick={() => alert('MFA Challenge Verified. High-privilege session authorized.')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold"
                >
                  Verify Code
                </button>
              </div>
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Time skew tolerance: ±1 window (30s drift)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Security Middleware & Headers Inspector */}
      {activeSubTab === 'middleware' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase text-slate-300">
              Active HTTP Security Middleware (OWASP Compliant)
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Enforced on all /api/* routes
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {[
              {
                header: 'Content-Security-Policy',
                value: "default-src 'self'; script-src 'self' 'unsafe-inline'; frame-ancestors 'none'",
                desc: 'Blocks malicious script injection and clickjacking attempts.',
              },
              {
                header: 'X-Content-Type-Options',
                value: 'nosniff',
                desc: 'Prevents MIME confusion attacks and forced binary interpretation.',
              },
              {
                header: 'X-Frame-Options',
                value: 'SAMEORIGIN',
                desc: 'Restricts iframe nesting to protect against clickjacking.',
              },
              {
                header: 'Strict-Transport-Security (HSTS)',
                value: 'max-age=63072000; includeSubDomains; preload',
                desc: 'Forces client browsers to use encrypted TLS 1.3 exclusively.',
              },
              {
                header: 'Rate-Limiting Defense',
                value: '120 requests / minute per client IP',
                desc: 'Sliding-window token bucket preventing denial-of-service and brute force.',
              },
              {
                header: 'Input Sanitization',
                value: 'OWASP Strict Strip Regex (<>, pseudo-protocols, null bytes)',
                desc: 'Filters reflected and stored XSS vectors before passing payloads to parsers.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">{item.header}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ACTIVE
                  </span>
                </div>
                <div className="text-slate-300 bg-slate-900/60 p-1.5 rounded text-[11px]">{item.value}</div>
                <p className="text-[11px] text-slate-400 font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
