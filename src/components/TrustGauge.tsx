import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, Bot, Crosshair, Cpu } from 'lucide-react';

interface TrustGaugeProps {
  score: number; // 0 - 100
  verdict?: string;
  size?: number;
  label?: string;
  metrics?: {
    factualVerifiability?: number;
    aiGeneratedLikelihood?: number;
    sourcingQuality?: number;
    deepfakeOrSyntheticMarkers?: number;
  };
}

export const TrustGauge: React.FC<TrustGaugeProps> = ({
  score,
  verdict,
  size = 240,
  label = 'bvnkv Truth Telemetry',
  metrics,
}) => {
  // Clamp score between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, score));

  // Determine color theme based on score
  const isHigh = normalizedScore >= 75;
  const isMedium = normalizedScore >= 45 && normalizedScore < 75;

  const colorClass = isHigh
    ? 'text-emerald-400 stroke-emerald-400'
    : isMedium
    ? 'text-amber-400 stroke-amber-400'
    : 'text-rose-500 stroke-rose-500';

  const badgeBg = isHigh
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    : isMedium
    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    : 'bg-rose-500/10 text-rose-400 border-rose-500/30';

  const Icon = isHigh ? ShieldCheck : isMedium ? AlertTriangle : ShieldAlert;

  // Gauge calculations for 220-degree arc
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc spans 240 degrees (from 150deg to 390deg)
  const arcLength = (240 / 360) * circumference;
  const strokeDashoffset = arcLength - (normalizedScore / 100) * arcLength;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#080d18]/90 border border-cyan-500/30 rounded-2xl shadow-xl backdrop-blur-md relative overflow-hidden">
      {/* Subtle ambient glow behind gauge */}
      <div
        className={`absolute -top-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isHigh ? 'bg-emerald-500' : isMedium ? 'bg-amber-500' : 'bg-rose-600'
        }`}
      />

      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 font-bold">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="font-orbitron text-[11px]">{label}</span>
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
          CORE: MECHA-X9
        </span>
      </div>

      {/* SVG Radial Gauge with Robotic HUD Markers */}
      <div className="relative flex items-center justify-center my-2" style={{ width: size, height: size }}>
        {/* Robotic HUD Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <Crosshair className="w-full h-full text-cyan-400 stroke-1" />
        </div>

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-[210deg] drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
        >
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#121b2b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Foreground colored arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <div className="text-5xl font-black font-orbitron tracking-tight text-white flex items-baseline">
            {normalizedScore}
            <span className="text-lg font-mono text-cyan-400/70 ml-1">/100</span>
          </div>
          <div className="text-[11px] uppercase font-mono tracking-wider text-cyan-300 font-semibold mt-1">
            {normalizedScore >= 75 ? 'VERIFIED RESILIENT' : normalizedScore >= 45 ? 'SUSPECT PAYLOAD' : 'DECEPTIVE ANOMALY'}
          </div>
        </div>
      </div>

      {/* Primary verdict badge */}
      {verdict && (
        <div className={`mt-1 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-2 ${badgeBg}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{verdict}</span>
        </div>
      )}

      {/* Granular Sub-metrics grid */}
      {metrics && (
        <div className="grid grid-cols-2 gap-2.5 w-full mt-5 pt-4 border-t border-cyan-500/20 font-mono">
          <div className="bg-[#050912]/80 p-2.5 rounded-xl border border-cyan-500/20">
            <div className="text-[10px] text-slate-400 uppercase">Fact Verifiability</div>
            <div className="text-sm font-semibold font-mono text-emerald-400 mt-0.5">
              {metrics.factualVerifiability ?? 0}%
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden border border-emerald-500/20">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-emerald-400"
                style={{ width: `${metrics.factualVerifiability ?? 0}%` }}
              />
            </div>
          </div>

          <div className="bg-[#050912]/80 p-2.5 rounded-xl border border-cyan-500/20">
            <div className="text-[10px] text-slate-400 uppercase flex items-center justify-between">
              <span>AI Content Risk</span>
              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
            </div>
            <div className="text-sm font-semibold font-mono text-purple-400 mt-0.5">
              {metrics.aiGeneratedLikelihood ?? 0}%
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden border border-purple-500/20">
              <div
                className="bg-purple-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-purple-400"
                style={{ width: `${metrics.aiGeneratedLikelihood ?? 0}%` }}
              />
            </div>
          </div>

          <div className="bg-[#050912]/80 p-2.5 rounded-xl border border-cyan-500/20">
            <div className="text-[10px] text-slate-400 uppercase">Source Integrity</div>
            <div className="text-sm font-semibold font-mono text-cyan-400 mt-0.5">
              {metrics.sourcingQuality ?? 0}%
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden border border-cyan-500/20">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-cyan-400"
                style={{ width: `${metrics.sourcingQuality ?? 0}%` }}
              />
            </div>
          </div>

          <div className="bg-[#050912]/80 p-2.5 rounded-xl border border-cyan-500/20">
            <div className="text-[10px] text-slate-400 uppercase">Synthetic Artifacts</div>
            <div className="text-sm font-semibold font-mono text-amber-400 mt-0.5">
              {metrics.deepfakeOrSyntheticMarkers ?? 0}%
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden border border-amber-500/20">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-amber-400"
                style={{ width: `${metrics.deepfakeOrSyntheticMarkers ?? 0}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
