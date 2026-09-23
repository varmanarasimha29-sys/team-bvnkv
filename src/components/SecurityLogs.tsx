import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldAlert, AlertTriangle, ShieldCheck, Bug, Terminal, RefreshCw, 
  Search, Filter, Download, Trash2, ArrowUpRight, CheckCircle2, Lock, 
  Globe, Radio, PlayCircle, Eye, ChevronDown, ChevronUp, Copy, Check, Bot, Zap
} from 'lucide-react';
import { SecurityEventLog, EventSeverity, EventCategory } from '../types';

interface SecurityLogsProps {
  embedded?: boolean; // When rendered inside Cyber Hygiene dashboard or standalone
}

export const SecurityLogs: React.FC<SecurityLogsProps> = ({ embedded = false }) => {
  const [logs, setLogs] = useState<SecurityEventLog[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    blocked: 0,
    warning: 0,
    info: 0,
  });
  const [loading, setLoading] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchLogs = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterSeverity !== 'ALL') params.append('severity', filterSeverity);
      if (filterCategory !== 'ALL') params.append('category', filterCategory);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/logs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error('[Fetch Security Logs Error]', err);
    } finally {
      if (!quiet) setLoading(false);
    }
  }, [filterSeverity, filterCategory, searchQuery]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Periodic polling when auto-refresh is toggled
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchLogs(true);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchLogs]);

  const handleSimulate = async (type: string, label: string) => {
    setSimulating(true);
    try {
      const res = await fetch('/api/logs/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      if (res.ok) {
        setStatusMessage(`Injected event: ${label}`);
        setTimeout(() => setStatusMessage(null), 3500);
        fetchLogs(true);
      }
    } catch (err) {
      console.error('Simulation error', err);
    } finally {
      setSimulating(false);
    }
  };

  const handleResetLogs = async () => {
    if (!confirm('Are you sure you want to reset the event log stream to baseline?')) return;
    try {
      const res = await fetch('/api/logs', { method: 'DELETE' });
      if (res.ok) {
        setStatusMessage('Log feed reset to baseline state.');
        setTimeout(() => setStatusMessage(null), 3000);
        fetchLogs();
      }
    } catch (err) {
      console.error('Failed to reset logs', err);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aegis-security-audit-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyTelemetry = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTimestamp = (iso: string) => {
    try {
      const date = new Date(iso);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return iso;
    }
  };

  return (
    <div className={`space-y-6 ${embedded ? 'mt-8 pt-8 border-t border-slate-800' : ''}`}>
      {/* Component Header / Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>bvnkv // Autonomous Security Telemetry & Audit Stream</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-orbitron">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span>Security Incident & Access Logs</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-mono">
            Real-time auditable stream of unauthorized access attempts, suspicious URL scans, XSS sanitization, and automated AI safety intercepts.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
              autoRefresh 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-slate-800/80 text-slate-400 border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>{autoRefresh ? 'Live Polling (5s)' : 'Polling Paused'}</span>
          </button>

          <button
            onClick={() => fetchLogs()}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all hover:text-white"
            title="Refresh logs immediately"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          <button
            onClick={handleExportJson}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all hover:text-white"
            title="Export logs as JSON"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetLogs}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-all"
            title="Reset logs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono uppercase text-slate-400">Total Events</div>
          <div className="text-xl font-bold font-mono text-white mt-1">{stats.total}</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono uppercase text-rose-400 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            <span>Critical</span>
          </div>
          <div className="text-xl font-bold font-mono text-rose-400 mt-1">{stats.critical}</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono uppercase text-red-400 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>Blocked</span>
          </div>
          <div className="text-xl font-bold font-mono text-red-400 mt-1">{stats.blocked}</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono uppercase text-amber-400 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Warnings</span>
          </div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">{stats.warning}</div>
        </div>

        <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
          <div className="text-[11px] font-mono uppercase text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified / Info</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">{stats.info}</div>
        </div>
      </div>

      {/* Simulator Test Triggers Box */}
      <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <PlayCircle className="w-4 h-4 text-cyan-400" />
            <span>Incident Trigger Simulator (Testing Console)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Inject synthetic telemetry into live stream</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => handleSimulate('unauthorized_access', 'Unauthorized Access / SSH Probe')}
            disabled={simulating}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>+ Unauthorized Access Probe</span>
          </button>

          <button
            onClick={() => handleSimulate('suspicious_scan', 'Suspicious URL Phishing Scan')}
            disabled={simulating}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>+ Suspicious URL Scan</span>
          </button>

          <button
            onClick={() => handleSimulate('xss_payload', 'Stored XSS Injection Vector Disarmed')}
            disabled={simulating}
            className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>+ XSS Payload Disarmed</span>
          </button>

          <button
            onClick={() => handleSimulate('ai_hallucination', 'AI Fabricated Citation Intercept')}
            disabled={simulating}
            className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>+ High-Risk AI Intercept</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search IP, domain, MITRE ID..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto">
          {/* Severity selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
            {['ALL', 'CRITICAL', 'BLOCKED', 'WARNING', 'INFO'].map(s => (
              <button
                key={s}
                onClick={() => setFilterSeverity(s)}
                className={`px-2.5 py-1 rounded transition-all ${
                  filterSeverity === s
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Unauthorized Access">Unauthorized Access</option>
            <option value="Suspicious URL Scan">Suspicious URL Scan</option>
            <option value="Threat Defense">Threat Defense</option>
            <option value="Misinfo Shield">Misinfo Shield</option>
            <option value="XAI Safety">XAI Safety</option>
            <option value="Session & Auth">Session & Auth</option>
            <option value="Rate Limiter">Rate Limiter</option>
          </select>
        </div>
      </div>

      {/* Security Event Feed List */}
      <div className="space-y-2.5">
        {loading && logs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
            Loading security audit stream...
          </div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
            No security events matching current criteria.
          </div>
        ) : (
          logs.map(log => {
            const isExpanded = expandedLogId === log.id;
            const severityColor =
              log.severity === 'CRITICAL'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : log.severity === 'BLOCKED'
                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                : log.severity === 'WARNING'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

            const actionColor =
              log.actionTaken === 'Blocked & Quarantined'
                ? 'text-red-400 bg-red-950/80 border-red-800'
                : log.actionTaken === 'Flagged with Warning'
                ? 'text-amber-400 bg-amber-950/80 border-amber-800'
                : log.actionTaken === 'Sanitized'
                ? 'text-cyan-400 bg-cyan-950/80 border-cyan-800'
                : 'text-emerald-400 bg-emerald-950/80 border-emerald-800';

            return (
              <div
                key={log.id}
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <div 
                  className="p-3.5 sm:p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                >
                  <div className="flex items-start gap-3">
                    {/* Severity Pill */}
                    <div className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0 ${severityColor}`}>
                      {log.severity}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-white font-mono">{log.title}</span>
                        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {log.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">{log.description}</p>
                    </div>
                  </div>

                  {/* Metadata and Quick Stats */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="text-right hidden sm:block">
                      <div className="text-[11px] font-mono text-slate-400">{formatTimestamp(log.timestamp)}</div>
                      {log.sourceIp && (
                        <div className="text-[10px] font-mono text-slate-500">IP: {log.sourceIp}</div>
                      )}
                    </div>

                    <div className={`px-2 py-0.5 rounded text-[10px] font-mono border ${actionColor}`}>
                      {log.actionTaken}
                    </div>

                    <button className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Technical Context Drawer */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/60 font-mono text-xs space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-slate-500 block">MITRE ATT&CK:</span>
                        <span className="text-amber-400 font-semibold">{log.mitreTechnique || 'N/A - General Telemetry'}</span>
                      </div>

                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-slate-500 block">Target Asset:</span>
                        <span className="text-slate-200 truncate block">{log.target || 'N/A'}</span>
                      </div>

                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-slate-500 block">ISO Timestamp:</span>
                        <span className="text-slate-300 truncate block">{log.timestamp}</span>
                      </div>
                    </div>

                    {log.details && (
                      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1">
                        <div className="text-slate-400 font-bold uppercase text-[10px] flex items-center justify-between">
                          <span>Raw Incident Telemetry Context</span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              copyTelemetry(log.id, JSON.stringify(log, null, 2));
                            }}
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[10px]"
                          >
                            {copiedId === log.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === log.id ? 'Copied' : 'Copy JSON'}</span>
                          </button>
                        </div>
                        <pre className="overflow-x-auto text-[10px] text-slate-300 max-h-36 pt-1">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
