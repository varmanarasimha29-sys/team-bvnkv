import React, { useState } from 'react';
import { 
  FileCode2, Server, Shield, Layers, Database, Lock, 
  Cpu, CheckCircle2, ChevronRight, Copy, Check, Terminal, ExternalLink, Bot, Zap
} from 'lucide-react';

export const ArchitectureBlueprint: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'phase1' | 'phase2' | 'phase3'>('phase1');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Blueprint Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>bvnkv // Autonomous System Architecture Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-orbitron">
            bvnkv Architecture, Wireframes & Security Specifications
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Examine the engineering blueprint across all 3 phases: scalable full-stack architecture choices, robotic UI/UX wireframe hierarchy, production code boilerplate, and defensive threat models.
          </p>
        </div>
      </div>

      {/* Phase Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActivePhase('phase1')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activePhase === 'phase1'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Phase 1: Architecture & Tech Stack</span>
        </button>

        <button
          onClick={() => setActivePhase('phase2')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activePhase === 'phase2'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Phase 2: UI/UX Wireframe Specs</span>
        </button>

        <button
          onClick={() => setActivePhase('phase3')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
            activePhase === 'phase3'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Phase 3: Foundational Code Blueprints</span>
        </button>
      </div>

      {/* PHASE 1 CONTENT */}
      {activePhase === 'phase1' && (
        <div className="space-y-6">
          {/* Tech Stack Recommendation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase">
                <Layers className="w-4 h-4" />
                Frontend Tier
              </div>
              <h3 className="text-lg font-bold text-white font-mono">React 19 + TypeScript + Tailwind</h3>
              <ul className="text-xs text-slate-300 space-y-2 font-sans">
                <li>• <strong>Zero Client-Side Secrets:</strong> Strict boundary prevents API key leaks.</li>
                <li>• <strong>Component Isolation:</strong> Encapsulated trust gauges, threat radars, and XAI meters.</li>
                <li>• <strong>Type Safety:</strong> End-to-end interface contracts for strict sanitized responses.</li>
              </ul>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase">
                <Server className="w-4 h-4" />
                Backend & Ingestion
              </div>
              <h3 className="text-lg font-bold text-white font-mono">Node.js Express / Python FastAPI</h3>
              <ul className="text-xs text-slate-300 space-y-2 font-sans">
                <li>• <strong>Asynchronous Pipeline:</strong> Concurrent streaming of fact check queries and heuristic checks.</li>
                <li>• <strong>Kernel-Level Security:</strong> OWASP CSP, HSTS, sliding-window rate limiters.</li>
                <li>• <strong>AI Orchestration:</strong> Direct server-to-server SDK integration with Gemini 3.8 Flash.</li>
              </ul>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase">
                <Database className="w-4 h-4" />
                Data & Intelligence
              </div>
              <h3 className="text-lg font-bold text-white font-mono">PostgreSQL + Redis + Vector DB</h3>
              <ul className="text-xs text-slate-300 space-y-2 font-sans">
                <li>• <strong>Encrypted At Rest:</strong> AES-256-GCM database columns for user tokens and audit logs.</li>
                <li>• <strong>Redis Sliding Windows:</strong> Sub-millisecond rate-limiting and session revocation.</li>
                <li>• <strong>Vector Corroborator:</strong> Semantic similarity search over verified fact-checking catalogs.</li>
              </ul>
            </div>
          </div>

          {/* Architecture Data Flow Diagram */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              End-to-End Threat & Misinformation Flow Diagram
            </h3>

            <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`+--------------------------------------------------------------------------------------------------+
|                                    CLIENT APPLICATION (REACT SPA)                                 |
|  [News & Link Analyzer]        [Phishing Scanner]        [XAI Monitor]       [Cyber Hygiene]      |
+-----------------------------------------------+--------------------------------------------------+
                                                | HTTPS + Strict CSP + Anti-CSRF Token
                                                v
+--------------------------------------------------------------------------------------------------+
|                                GATEWAY & DEFENSIVE MIDDLEWARE                                     |
|  [Sliding Rate Limiter] ---> [Input Sanitizer] ---> [Security Headers] ---> [Audit Event Logger]   |
+-----------------------------------------------+--------------------------------------------------+
                                                |
                 +------------------------------+------------------------------+
                 |                                                             |
                 v                                                             v
+----------------------------------------+                    +------------------------------------+
|       CORE VERIFICATION PIPELINE       |                    |     CYBER THREAT & IDENTITY ENGINE |
| • Gemini 3.8 Flash Semantic Engine     |                    | • Homoglyph & Punycode Evaluator   |
| • Google Fact Check Tools Correlator   |                    | • SPF / DKIM / DMARC Header Verif. |
| • Synthetic Forensic AI Marker Radar   |                    | • Shannon Entropy Pass Calculator  |
| • Cognitive Fallacy Extractor          |                    | • k-Anonymity Hash Exposure Lookup |
+----------------------------------------+                    +------------------------------------+
                 |                                                             |
                 +------------------------------+------------------------------+
                                                v
+--------------------------------------------------------------------------------------------------+
|                                    NORMALIZED OUTPUT MATRIX                                       |
|  Trust Score (0-100)  |  Threat Score (0-100)  |  XAI Attribution Traces  |  Hardening Playbooks  |
+--------------------------------------------------------------------------------------------------+`}
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2 CONTENT */}
      {activePhase === 'phase2' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Phase 2: UI/UX Wireframe & Visual Hierarchy Specification
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Engineered for non-technical users seeking instant, unambiguous clarity without compromising deep forensic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <h4 className="font-mono text-cyan-400 font-bold uppercase">1. Global Telemetry HUD (Header)</h4>
              <p className="text-slate-300 leading-relaxed">
                Persistent top micro-bar displaying live active defense status, AI engine operational mode (Gemini 3.8 Flash), strict CSP enforcement confirmation, and rate limit capacity. Instills immediate authority and operational confidence.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <h4 className="font-mono text-rose-400 font-bold uppercase">2. Focal Input Stage (The Scanner)</h4>
              <p className="text-slate-300 leading-relaxed">
                Single unified input portal accommodating URLs, article texts, or social media blurbs. Includes instant single-click test presets (e.g. Synthetic Miracle Cure, CEO Wire Fraud, Nominal Science) so new users can witness forensic dissection in under two seconds.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <h4 className="font-mono text-emerald-400 font-bold uppercase">3. Bi-Focal Evaluation Grid (The Results)</h4>
              <p className="text-slate-300 leading-relaxed">
                <strong>Left Column (Cognitive Anchor):</strong> The animated SVG Radial Trust Score Gauge. Instantly communicates reliability via color-coded threshold (Green = High Trust, Amber = Caution, Red = Disinformation/Threat).<br />
                <strong>Right Column (Forensic Ledger):</strong> Detailed claim-by-claim breakdown with citations, fact-check URLs, and plain-English explanation.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <h4 className="font-mono text-purple-400 font-bold uppercase">4. Explainability & Actionable Playbook</h4>
              <p className="text-slate-300 leading-relaxed">
                "Why did the AI say this?" token attribution cards and high-risk inference alerts. Every warning is paired with step-by-step containment instructions (e.g. "Do not enter credentials", "Verify out-of-band").
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3 CONTENT */}
      {activePhase === 'phase3' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-4">
              Phase 3: Production-Ready Boilerplate & Security Middleware
            </h3>

            {/* Code Snippet 1 */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>1. Strict Security Middleware (server.ts excerpt)</span>
                <button
                  onClick={() => copyCode('middleware', `// Security Middleware\nres.setHeader('X-Content-Type-Options', 'nosniff');\nres.setHeader('X-Frame-Options', 'SAMEORIGIN');\nres.setHeader('Content-Security-Policy', "default-src 'self'...");`)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
                >
                  {copiedSection === 'middleware' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'middleware' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
{`// Enterprise Security Headers (CSP, HSTS, Frameguard, Sniff-Mitigation)
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https:;");
  next();
});`}
              </pre>
            </div>

            {/* Code Snippet 2 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>2. Content Sanitization & AI Integration Pipeline</span>
                <button
                  onClick={() => copyCode('pipeline', `function sanitizeInput(text) { return text.replace(/[<>]/g, '').trim(); }`)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
                >
                  {copiedSection === 'pipeline' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'pipeline' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
{`// Input Sanitization before AI or Fact Check Ingestion
function sanitizeInput(text: string): string {
  if (typeof text !== 'string') return '';
  return text
    .replace(/[<>]/g, '') // Strips HTML tags mitigating stored XSS
    .replace(/javascript:/gi, '')
    .trim();
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
