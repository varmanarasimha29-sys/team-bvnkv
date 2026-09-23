import React, { useState } from 'react';
import { 
  Search, ExternalLink, Sparkles, AlertOctagon, CheckCircle2, 
  HelpCircle, RefreshCw, Share2, ShieldAlert, Cpu, BookOpen, Layers, Bot, Zap
} from 'lucide-react';
import { MisinfoAnalysisResult } from '../types';
import { TrustGauge } from './TrustGauge';

const SAMPLE_PRESETS = [
  {
    label: 'Synthetic Miracle Cure',
    tag: 'Disinformation',
    content: 'BREAKING: World health authorities secretly hide miracle botanical tincture curing all degenerative ailments in 48 hours! Big Pharma threatens whistleblowers to preserve $500B chemotherapy cartel. Wake up before this post is deleted by mainstream censors!',
    url: 'https://uncensored-health-miracle-daily.xyz/urgent-cure',
  },
  {
    label: 'AI-Generated Propaganda Speech',
    tag: 'Deepfake / AI',
    content: 'Leaked high-level diplomatic audio confirms an emergency treaty was signed at 3 AM yesterday surrendering national sovereignty to an unvetted offshore council. Automated deep synthesis speech analysis indicates high biometric variance.',
    url: 'https://clandestine-geopolitics-wire.net/secret-treaty-signed',
  },
  {
    label: 'Peer-Reviewed Science Report',
    tag: 'Verified Factual',
    content: 'Astronomers using the James Webb Space Telescope have corroborated the discovery of atmospheric water vapor and carbon dioxide signatures on exoplanet K2-18b, situated within the habitable zone of its host red dwarf star.',
    url: 'https://nasa.gov/mission_pages/webb/exoplanet-k218b-atmosphere',
  },
];

export const MisinfoShield: React.FC = () => {
  const [inputContent, setInputContent] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MisinfoAnalysisResult | null>(null);

  const handleAnalyze = async (overrideContent?: string, overrideUrl?: string) => {
    const textToAnalyze = overrideContent !== undefined ? overrideContent : inputContent;
    const urlToAnalyze = overrideUrl !== undefined ? overrideUrl : inputUrl;

    if (!textToAnalyze.trim() && !urlToAnalyze.trim()) {
      setError('Please provide text or a URL to analyze.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: textToAnalyze,
          url: urlToAnalyze,
          type: urlToAnalyze ? 'url' : 'text',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data: MisinfoAnalysisResult = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error('[Misinfo Scan Error]', err);
      setError('Failed to complete content credibility analysis. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setInputContent(preset.content);
    setInputUrl(preset.url);
    handleAnalyze(preset.content, preset.url);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>bvnkv // Autonomous Misinformation & Propaganda Radar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-orbitron">
              News, Article & Social Media Truth Engine
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Ingests raw text, news URLs, and viral social posts. bvnkv cross-references claims against global fact-checking registers, extracts synthetic AI writing patterns, and computes an objective Trust Score with forensic evidence.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase text-cyan-400">Quick Test Cases:</span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => loadPreset(preset)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/20 hover:border-cyan-500/50 text-xs font-mono text-slate-300 transition-all flex items-center gap-1.5"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    preset.tag === 'Verified Factual' ? 'bg-emerald-400' : 'bg-rose-400'
                  }`} />
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input Analyzer Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              News Link / Article URL (Optional)
            </label>
            <div className="relative">
              <input
                type="url"
                value={inputUrl}
                onChange={e => setInputUrl(e.target.value)}
                placeholder="https://example.com/breaking-news-claim..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 font-mono"
              />
              {inputUrl && (
                <a
                  href={inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Paste Article Text, Social Post, or Assertions
            </label>
            <textarea
              rows={4}
              value={inputContent}
              onChange={e => setInputContent(e.target.value)}
              placeholder="Paste suspicious headline, news body, viral tweet, or AI-generated output here..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 font-sans"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-cyan-400 font-mono hidden sm:flex items-center gap-2">
              <Bot className="w-3.5 h-3.5" />
              <span>Pipeline: bvnkv-core // Gemini 3.8 Flash Neural Engine</span>
            </div>

            <button
              onClick={() => handleAnalyze()}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold font-mono text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 border border-cyan-400/40 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>Computing Truth Vectors...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 text-cyan-200" />
                  <span>Execute Autonomous Truth Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results Display */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Trust Score Gauge & Core Assessment */}
          <div className="lg:col-span-1 space-y-6">
            <TrustGauge
              score={result.trustScore}
              verdict={result.verdict}
              label="Information Integrity Gauge"
              metrics={result.metrics}
            />

            {/* Bias & Source Profile Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Source & Bias Evaluation
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Bias Spectrum:</span>
                  <span className="font-mono text-cyan-300 font-semibold">{result.metrics.biasIndex}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Evaluated Entity:</span>
                  <span className="font-mono text-slate-200 font-semibold truncate max-w-[160px]">
                    {result.sourceAttribution.domain || 'Direct Text Payload'}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Reputation Tier:</span>
                  <span className="font-mono text-amber-400">
                    {result.sourceAttribution.domainReputation || 'Unverified'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Historical Reliability:</span>
                  <span className="font-mono text-emerald-400">
                    {result.sourceAttribution.historicalReliability || 'Moderate'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Forensic Evidence & Claim Dissection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Executive Summary */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Forensic Intelligence Assessment
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  ISO/IEC 23894 Aligned
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans font-medium">
                {result.summary}
              </p>

              <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {result.plainEnglishExplanation}
              </div>
            </div>

            {/* Fact-Checking Corroborated Claims Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Corroborated Fact Checks & Extracted Claims
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  Google Fact Check Tools Explorer API
                </span>
              </div>

              <div className="space-y-3">
                {result.detectedClaims.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="text-xs text-slate-200 font-medium">"{item.claim}"</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                        <span>Corroboration:</span>
                        <span className="text-slate-300">{item.source}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                          item.status === 'Verified True'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : item.status === 'Debunked / False'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {item.status}
                      </span>
                      {item.factCheckUrl && (
                        <a
                          href={item.factCheckUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                          title="Open fact check verification repository"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cognitive Fallacies & Rhetoric Manipulation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2 mb-3">
                  <AlertOctagon className="w-4 h-4" />
                  Rhetorical Manipulation & Fallacies
                </h4>
                <div className="space-y-2">
                  {result.cognitiveFallacies.map((fallacy, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-rose-500/5 border border-rose-500/20 text-xs text-rose-300 font-mono flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span>{fallacy}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4" />
                  Counter-Evidence & Verification Steps
                </h4>
                <div className="space-y-2">
                  {result.counterEvidence.map((point, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-300 font-sans leading-snug flex items-start gap-2"
                    >
                      <span className="text-cyan-400 font-mono mt-0.5">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
