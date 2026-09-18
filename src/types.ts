export type ScenarioType = 'human' | 'replay' | 'deepfake' | 'access';

export type ActiveTab = 
  | 'live-verification-demo'
  | 'architecture-signals'
  | 'attack-matrix'
  | 'developer-api-sdk'
  | 'enterprise-dashboard'
  | 'research-red-team';

export interface VerificationMode {
  id: string;
  number: string;
  name: string;
  duration: string;
  description: string;
  targetAssurance: string;
  assurancePercent: string;
  features: string[];
  tagColor: 'primary' | 'secondary' | 'tertiary';
}

export interface AttackVector {
  id: string;
  letter: string;
  title: string;
  description: string;
  defenseVector: string;
  status: 'DEFEATED' | 'INTERCEPTED';
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  bypassRate: string;
}

export interface TelemetryState {
  pitch: number;
  yaw: number;
  roll: number;
  rppgActive: boolean;
  verdictPill: string;
  verdictStatus: string;
  verdictDesc: string;
  riskLevel: 'LOW' | 'HIGH' | 'CRITICAL' | 'ELEVATED';
  replayProb: number;
  syntheticRisk: number;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  t5: number;
  vectorString: string;
  stimulusInstruction: string;
  stimulusSubtext: string;
}

export interface VerificationLog {
  id: string;
  timestamp: string;
  sessionId: string;
  mode: string;
  verdict: 'VERIFIED_HUMAN' | 'REPLAY_INTERCEPTED' | 'SYNTHETIC_ANOMALY' | 'ASSISTIVE_VERIFIED';
  riskScore: number;
  latencyMs: number;
  originCountry: string;
  userAgent: string;
}
