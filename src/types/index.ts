export type NavigationTab = 
  | 'misinfo'
  | 'threat'
  | 'xai'
  | 'hygiene'
  | 'auth'
  | 'blueprint';

export interface MisinfoAnalysisResult {
  trustScore: number;
  verdict: 'High Credibility' | 'Questionable' | 'Likely Disinformation' | 'Synthetic Propaganda';
  summary: string;
  metrics: {
    factualVerifiability: number;
    aiGeneratedLikelihood: number;
    biasIndex: string;
    sourcingQuality: number;
    deepfakeOrSyntheticMarkers: number;
  };
  detectedClaims: Array<{
    claim: string;
    status: 'Verified True' | 'Unsubstantiated' | 'Debunked / False' | 'Needs Context';
    source: string;
    factCheckUrl?: string;
  }>;
  cognitiveFallacies: string[];
  counterEvidence: string[];
  plainEnglishExplanation: string;
  sourceAttribution: {
    domain?: string;
    domainReputation?: string;
    historicalReliability?: string;
  };
}

export interface ThreatAnalysisResult {
  threatScore: number;
  threatLevel: 'Clean' | 'Low Risk' | 'Suspicious' | 'Critical Malicious';
  category: 'Legitimate Asset' | 'Credential Harvester' | 'Spear Phishing' | 'Malware Dropper' | 'Typosquatting Trap';
  domainAnalysis: {
    normalizedDomain: string;
    isPunycodeOrHomoglyph: boolean;
    suspiciousTld: boolean;
    ipAddressHost: boolean;
    entropyScore: number;
    sslPosture: string;
  };
  emailHeaderAudit?: {
    spfStatus: 'PASS' | 'FAIL' | 'SOFTFAIL' | 'NONE';
    dkimStatus: 'PASS' | 'FAIL' | 'NONE';
    dmarcStatus: 'PASS' | 'FAIL' | 'NONE';
    senderSpoofingRisk: 'High' | 'Low' | 'Negligible';
  };
  detectedThreatVectors: string[];
  remediationAdvice: string[];
  technicalTelemetry: string;
}

export interface XaiAuditResult {
  riskScore: number;
  riskLevel: 'Nominal / Safe' | 'Moderate Risk' | 'High-Risk Inference Alert' | 'Critical Safety Breach';
  isHighRiskInference: boolean;
  highRiskDomains: string[];
  whyDidAiSayThis: {
    primaryDrivers: string[];
    latentAssociations: string[];
    attentionWeightsSummary: string;
  };
  hallucinationIndex: {
    score: number;
    unsubstantiatedAssertions: string[];
    fabricatedCitationsCount: number;
  };
  algorithmicBiasAudit: {
    biasDetected: boolean;
    biasTypes: string[];
    demographicOrStereotypeRisk: string;
  };
  safetyRecommendations: string[];
}

export interface CyberHygieneReport {
  email: string;
  exposureProfile: {
    knownBreachesCount: number;
    recentExposureYear: number;
    compromisedDataClasses: string[];
    darkWebMentions: string;
  };
  credentialHygiene: {
    testedEntropyBits: number;
    strengthClassification: string;
    bruteForceCrackTimeEstimate: string;
  };
  hygieneScore: number;
  hardeningChecklist: Array<{
    task: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    status: 'Action Required' | 'Pending' | 'Recommended' | 'Completed';
  }>;
}

export interface SystemHealthStatus {
  status: string;
  system: string;
  version: string;
  uptimeSeconds: number;
  capabilities: {
    geminiEngine: boolean;
    misinfoShield: string;
    cyberThreatScanner: string;
    xaiExplainabilityHub: string;
    cyberHygieneMonitor: string;
  };
  securityPolicies: {
    cspEnforced: boolean;
    hstsReady: boolean;
    rateLimiter: string;
    inputSanitizer: string;
  };
}

export type EventSeverity = 'CRITICAL' | 'WARNING' | 'INFO' | 'BLOCKED';

export type EventCategory = 
  | 'Unauthorized Access'
  | 'Suspicious URL Scan'
  | 'Threat Defense'
  | 'Misinfo Shield'
  | 'XAI Safety'
  | 'Session & Auth'
  | 'Rate Limiter';

export interface SecurityEventLog {
  id: string;
  timestamp: string;
  severity: EventSeverity;
  category: EventCategory;
  title: string;
  description: string;
  sourceIp?: string;
  target?: string;
  actionTaken: 'Blocked & Quarantined' | 'Logged for SOC Review' | 'Flagged with Warning' | 'Sanitized' | 'Allowed';
  mitreTechnique?: string;
  details?: Record<string, any>;
}

