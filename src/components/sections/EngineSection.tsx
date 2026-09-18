import React, { useState, useEffect, useRef } from 'react';
import { 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  Lock, 
  Camera, 
  Video, 
  CheckCircle2, 
  AlertTriangle,
  Fingerprint
} from 'lucide-react';
import { ScenarioType } from '../../types';
import { HUD_SUBJECT_IMAGE_URL } from '../../data/mockData';

interface EngineSectionProps {
  onOpenLiveModal: () => void;
}

export const EngineSection: React.FC<EngineSectionProps> = ({ onOpenLiveModal }) => {
  const [scenario, setScenario] = useState<ScenarioType>('human');
  const [isCycling, setIsCycling] = useState<boolean>(false);
  const [sessionTime, setSessionTime] = useState<number>(4.82);
  const [ev1Width, setEv1Width] = useState<number>(30);
  const [ev2Width, setEv2Width] = useState<number>(35);
  const [ev3Width, setEv3Width] = useState<number>(35);
  
  // Real-time jitter for pitch/yaw/roll
  const [pitch, setPitch] = useState<number>(-1.2);
  const [yaw, setYaw] = useState<number>(0.8);
  const [roll, setRoll] = useState<number>(0.0);
  const [nonce, setNonce] = useState<string>('7f9b0...c3a81');
  const [timestamp, setTimestamp] = useState<number>(1741514488);

  // Optical mesh jitter animation
  const [meshJitter, setMeshJitter] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Web camera option for inline HUD
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Subtle natural sensor jitter
  useEffect(() => {
    const interval = setInterval(() => {
      if (scenario === 'human' || scenario === 'access') {
        setPitch(Number((-1.2 + (Math.random() * 0.4 - 0.2)).toFixed(1)));
        setYaw(Number((0.8 + (Math.random() * 0.4 - 0.2)).toFixed(1)));
        setRoll(Number((0.0 + (Math.random() * 0.2 - 0.1)).toFixed(1)));
        setMeshJitter({
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
        });
      } else if (scenario === 'replay') {
        // Flat, zero micro-movements
        setPitch(-1.2);
        setYaw(0.8);
        setRoll(0.0);
        setMeshJitter({ x: 0, y: 0 });
      } else if (scenario === 'deepfake') {
        // High jitter or boundary lag
        setPitch(Number((-2.4 + (Math.random() * 1.8 - 0.9)).toFixed(1)));
        setYaw(Number((1.6 + (Math.random() * 1.6 - 0.8)).toFixed(1)));
        setRoll(Number((0.4 + (Math.random() * 0.8 - 0.4)).toFixed(1)));
        setMeshJitter({
          x: Math.random() * 5 - 2.5,
          y: Math.random() * 5 - 2.5,
        });
      }
    }, 450);

    return () => clearInterval(interval);
  }, [scenario]);

  // Handle webcam toggle
  const toggleWebcam = async () => {
    if (useWebcam) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      setUseWebcam(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setUseWebcam(true);
      } catch (err) {
        console.warn('Webcam permission not available, keeping simulated feed:', err);
        alert('Webcam permission was not granted or camera not detected. Using simulated model feed.');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const triggerNonceCycle = () => {
    setIsCycling(true);
    const newNonce = Math.random().toString(36).substring(2, 8) + '...' + Math.random().toString(36).substring(2, 7);
    const newTs = Math.floor(Date.now() / 1000);
    setNonce(newNonce);
    setTimestamp(newTs);

    setEv1Width(0);
    setEv2Width(0);
    setEv3Width(0);
    setSessionTime(0.0);

    setTimeout(() => {
      setEv1Width(30);
      setSessionTime(1.4);
    }, 350);

    setTimeout(() => {
      setEv2Width(35);
      setSessionTime(3.1);
    }, 850);

    setTimeout(() => {
      setEv3Width(35);
      setSessionTime(4.82);
      setIsCycling(false);
    }, 1350);
  };

  const handleScenarioChange = (type: ScenarioType) => {
    setScenario(type);
    triggerNonceCycle();
  };

  // Scenario specific data
  const scenarioDetails = {
    human: {
      pill: 'VERIFIED_HUMAN',
      pillClass: 'bg-[#10b981]/15 text-[#4edea3] border border-[#10b981]/30',
      status: 'HUMAN PRESENCE CONFIRMED',
      statusClass: 'text-[#4edea3]',
      desc: 'Natural involuntary neuro-motor latency distribution detected. Temporal signature matches human biometrics baseline.',
      risk: 'LOW',
      riskClass: 'text-[#4edea3]',
      replay: '0.02',
      synthetic: '0.01',
      instruction: '"Just watch for a few seconds."',
      subtext: 'Calibrating subconscious ocular saccades and micro-temporal response...',
      t1: '218ms',
      t2: '384ms',
      t3: '512ms',
      t4: '740ms',
      t5: '1,820ms',
      vector: 'R = [218ms, 384ms, 512ms, 740ms, 1820ms | Amp: 0.42 | Smoothness: 0.94 | Plausibility: 99.1%]',
      waveformColor: '#4edea3',
      rppgActive: true,
    },
    replay: {
      pill: 'ATTACK_INTERCEPTED',
      pillClass: 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40',
      status: 'REPLAY LOOP DETECTED',
      statusClass: 'text-[#ffb4ab]',
      desc: 'Zero temporal variance against dynamic challenge seed. Static video replay detected across T1-T3 intervals.',
      risk: 'CRITICAL',
      riskClass: 'text-[#ffb4ab]',
      replay: '0.98',
      synthetic: '0.84',
      instruction: '"Replay injection intercepted."',
      subtext: 'Identical repeated pixel delta discovered; temporal nonce mismatch triggered.',
      t1: '0ms (Static)',
      t2: '0ms (Decoupled)',
      t3: '0ms',
      t4: '0ms',
      t5: '0ms',
      vector: 'R = [0ms, 0ms, 0ms, 0ms, 0ms | Amp: 0.00 | Smoothness: 0.02 | Plausibility: 1.2%]',
      waveformColor: '#ffb4ab',
      rppgActive: false,
    },
    deepfake: {
      pill: 'SYNTHETIC_ANOMALY',
      pillClass: 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40',
      status: 'AI AVATAR / FACESWAP DETECTED',
      statusClass: 'text-[#ffb4ab]',
      desc: 'Subconscious saccade latency shifted >850ms. Optical rPPG blood perfusion phase completely decoupled.',
      risk: 'HIGH',
      riskClass: 'text-[#ffb4ab]',
      replay: '0.15',
      synthetic: '0.96',
      instruction: '"Synthetic phase lag detected."',
      subtext: 'Neural boundary smoothing artifacts & abnormal gaze reaction detected.',
      t1: '882ms (Lagged)',
      t2: '1,204ms',
      t3: '1,450ms',
      t4: '1,920ms',
      t5: '3,100ms',
      vector: 'R = [882ms, 1204ms, 1450ms, 1920ms, 3100ms | Amp: 0.12 | Smoothness: 0.38 | Plausibility: 6.4%]',
      waveformColor: '#ffb4ab',
      rppgActive: false,
    },
    access: {
      pill: 'ASSISTIVE_VERIFIED',
      pillClass: 'bg-[#03b5d3]/20 text-[#4cd7f6] border border-[#03b5d3]/40',
      status: 'INTERACTIVE AUDIT CONFIRMED',
      statusClass: 'text-[#4cd7f6]',
      desc: 'Keyboard temporal cadence & micro-pointer dynamics validated successfully in lieu of ocular tracking.',
      risk: 'LOW',
      riskClass: 'text-[#4cd7f6]',
      replay: '0.01',
      synthetic: '0.03',
      instruction: '"Accessibility fallback active."',
      subtext: 'Dual-frequency acoustic sync and keystroke flight-time distribution authenticated.',
      t1: '142ms (Key)',
      t2: '298ms (Delay)',
      t3: '420ms (Entropy)',
      t4: '610ms',
      t5: '1,120ms',
      vector: 'R_ACC = [Key: 142ms, Keystroke_Jitter: 0.96, Audio_Echo: 0.98 | Plausibility: 99.4%]',
      waveformColor: '#4cd7f6',
      rppgActive: true,
    },
  }[scenario];

  return (
    <section className="w-full bg-[#0a0e15] py-12 lg:py-16 border-b border-[#1c2027]" id="interactive-engine">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section Header & Scenario Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
                CORE VERIFICATION SANDBOX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbcabf]">
                ENGINE V4.2-STABLE
              </span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-semibold text-[#dfe2ed]">
              Temporal Cross-Coupling Engine
            </h2>
          </div>

          {/* Attack Simulation Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#262a32] p-1 rounded border border-[#3c4a42]/50">
            <button
              onClick={() => handleScenarioChange('human')}
              className={`px-3 py-1.5 rounded font-['Inter'] text-xs transition-all cursor-pointer ${
                scenario === 'human'
                  ? 'bg-[#10b981] text-[#00422b] font-semibold shadow-sm'
                  : 'text-[#bbcabf] hover:text-[#dfe2ed]'
              }`}
            >
              Human Normal
            </button>
            <button
              onClick={() => handleScenarioChange('replay')}
              className={`px-3 py-1.5 rounded font-['Inter'] text-xs transition-all cursor-pointer ${
                scenario === 'replay'
                  ? 'bg-[#93000a] text-[#ffdad6] font-semibold shadow-sm'
                  : 'text-[#bbcabf] hover:text-[#dfe2ed]'
              }`}
            >
              Prerecorded Replay
            </button>
            <button
              onClick={() => handleScenarioChange('deepfake')}
              className={`px-3 py-1.5 rounded font-['Inter'] text-xs transition-all cursor-pointer ${
                scenario === 'deepfake'
                  ? 'bg-[#93000a] text-[#ffdad6] font-semibold shadow-sm'
                  : 'text-[#bbcabf] hover:text-[#dfe2ed]'
              }`}
            >
              Synthetic Injection
            </button>
            <button
              onClick={() => handleScenarioChange('access')}
              className={`px-3 py-1.5 rounded font-['Inter'] text-xs transition-all cursor-pointer ${
                scenario === 'access'
                  ? 'bg-[#03b5d3] text-[#00424e] font-semibold shadow-sm'
                  : 'text-[#bbcabf] hover:text-[#dfe2ed]'
              }`}
            >
              Accessibility Fallback
            </button>
          </div>
        </div>

        {/* Main Engine Split Viewport (7 cols / 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Camera HUD & Stimulus Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative bg-[#1c2027] border border-[#31353d] rounded-xl overflow-hidden shadow-2xl aspect-[16/10] flex flex-col justify-between p-4">
              {/* Camera Feed Background: Video feed or High-Res Synthetic Subject */}
              <div className="absolute inset-0 bg-[#0a0e15] overflow-hidden">
                {useWebcam ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover -scale-x-100"
                  />
                ) : (
                  <img
                    src={HUD_SUBJECT_IMAGE_URL}
                    alt="Subject camera feed preview"
                    className="w-full h-full object-cover opacity-65 mix-blend-luminosity filter contrast-110"
                  />
                )}
                {/* Scanline texture */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
              </div>

              {/* Vector Mesh Overlay SVG (WASM Edge Landmarking Preview) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
                fill="none"
                viewBox="0 0 800 500"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: `translate(${meshJitter.x}px, ${meshJitter.y}px)`,
                }}
              >
                {/* HUD Corner targeting brackets */}
                <path d="M 40 70 L 40 40 L 70 40" stroke="#4cd7f6" strokeWidth="2"></path>
                <path d="M 760 70 L 760 40 L 730 40" stroke="#4cd7f6" strokeWidth="2"></path>
                <path d="M 40 430 L 40 460 L 70 460" stroke="#4cd7f6" strokeWidth="2"></path>
                <path d="M 760 430 L 760 460 L 730 460" stroke="#4cd7f6" strokeWidth="2"></path>

                {/* Facial Mesh Landmark Triangles */}
                <g
                  fill={scenario === 'human' || scenario === 'access' ? '#10b981' : '#ffb4ab'}
                  fillOpacity="0.18"
                  stroke={scenario === 'human' || scenario === 'access' ? '#4cd7f6' : '#ffb4ab'}
                  strokeOpacity="0.4"
                  strokeWidth="1.2"
                >
                  {/* Forehead and eyes */}
                  <polygon points="400,160 360,185 440,185" />
                  <polygon points="360,185 330,220 380,225" />
                  <polygon points="440,185 420,225 470,220" />
                  <polygon points="380,225 400,240 420,225" />
                  {/* Nose ridge */}
                  <polygon points="400,240 385,290 415,290" />
                  {/* Cheeks and lips */}
                  <polygon points="330,220 340,310 385,290" />
                  <polygon points="470,220 415,290 460,310" />
                  <polygon points="385,290 400,340 415,290" />
                  <polygon points="385,350 400,340 415,350" />
                  <polygon points="385,350 400,380 415,350" />
                  {/* Chin */}
                  <polygon points="340,310 400,410 460,310" strokeDasharray="3 3" />
                </g>

                {/* Head Pose Vector indicator */}
                <line
                  x1="400"
                  y1="240"
                  x2={400 + yaw * 18}
                  y2={240 + pitch * 12}
                  stroke="#ffb95f"
                  strokeWidth="2.5"
                />
                <circle
                  cx={400 + yaw * 18}
                  cy={240 + pitch * 12}
                  r="4"
                  fill="#ffb95f"
                  className="animate-pulse"
                />

                {/* Gaze Tracking Path */}
                <path
                  d="M 370 215 Q 395 210 405 235"
                  fill="none"
                  stroke="#4edea3"
                  strokeDasharray="4 2"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Top HUD Bar inside Camera Viewport */}
              <div className="relative z-10 flex flex-wrap items-center justify-between bg-[#0a0e15]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#262a32] shadow-sm gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
                  <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#dfe2ed]">
                    {useWebcam ? 'LIVE WEBCAM: 720p @ 60 FPS' : 'LIVE FEED: 1080p @ 60 FPS'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-['JetBrains_Mono']">
                  <div className="flex items-center gap-1">
                    <span className="text-[#86948a]">PITCH</span>
                    <span className="text-[#4cd7f6]">{pitch > 0 ? `+${pitch}` : pitch}°</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#86948a]">YAW</span>
                    <span className="text-[#4cd7f6]">{yaw > 0 ? `+${yaw}` : yaw}°</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#86948a]">ROLL</span>
                    <span className="text-[#4cd7f6]">{roll > 0 ? `+${roll}` : roll}°</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      scenarioDetails.rppgActive
                        ? 'bg-[#10b981]/20 text-[#4edea3] border border-[#10b981]/40'
                        : 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30'
                    }`}
                  >
                    {scenarioDetails.rppgActive ? 'rPPG: ACTIVE' : 'rPPG: DECOUPLED'}
                  </span>
                </div>
              </div>

              {/* Center Dynamic Interactive Stimulus Banner */}
              <div className="relative z-10 mx-auto max-w-md w-full bg-[#262a32]/90 backdrop-blur-md border border-[#3c4a42] p-4 rounded-lg shadow-2xl text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-[#4cd7f6]" />
                  <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
                    Spontaneous Stimulus Window
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#dfe2ed]">
                  {scenarioDetails.instruction}
                </h3>
                <p className="font-['Inter'] text-xs text-[#bbcabf] mt-1 leading-normal">
                  {scenarioDetails.subtext}
                </p>

                {/* Progress bar of the 3 events */}
                <div className="w-full bg-[#181c23] h-2 rounded-full mt-3 overflow-hidden flex border border-[#31353d]">
                  <div
                    className="h-full bg-[#10b981] transition-all duration-500"
                    style={{ width: `${ev1Width}%` }}
                    title="Event 01"
                  />
                  <div
                    className="h-full bg-[#4cd7f6] transition-all duration-500"
                    style={{ width: `${ev2Width}%` }}
                    title="Event 02"
                  />
                  <div
                    className="h-full bg-[#ffb95f] transition-all duration-500"
                    style={{ width: `${ev3Width}%` }}
                    title="Event 03"
                  />
                </div>
              </div>

              {/* Bottom HUD Controls & Nonce Bar */}
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#0a0e15]/85 backdrop-blur-md p-2 rounded border border-[#262a32] gap-2">
                <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-[#bbcabf] overflow-hidden truncate max-w-full">
                  <Lock className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
                  <span className="truncate">
                    NONCE: SHA256({nonce} + t:{timestamp})
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={toggleWebcam}
                    className="px-2.5 py-1 bg-[#181c23] hover:bg-[#262a32] text-[#4cd7f6] border border-[#3c4a42] font-['Inter'] text-[11px] rounded flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Toggle your webcam or model preview"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{useWebcam ? 'Use Model' : 'Use Webcam'}</span>
                  </button>

                  <button
                    onClick={triggerNonceCycle}
                    disabled={isCycling}
                    className="px-2.5 py-1 bg-[#262a32] hover:bg-[#31353d] text-[#4cd7f6] border border-[#3c4a42] font-['Inter'] text-[11px] rounded flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCycling ? 'animate-spin' : ''}`} />
                    <span>Re-trigger Nonce</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Sequential Events Timeline Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-[#1c2027] border border-[#262a32] p-3.5 rounded-xl shadow-sm">
              <div className="bg-[#181c23] border border-[#262a32] p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4edea3]">
                    EVENT 01 (T=1.4s)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                </div>
                <span className="font-['Inter'] text-sm font-semibold text-[#dfe2ed] block">
                  Visual Surprise
                </span>
                <span className="font-['Inter'] text-xs text-[#86948a] block mt-0.5">
                  Subtle unexpected physics shift. Baseline delta logged.
                </span>
              </div>

              <div className="bg-[#181c23] border border-[#262a32] p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4cd7f6]">
                    EVENT 02 (T=3.1s)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
                </div>
                <span className="font-['Inter'] text-sm font-semibold text-[#dfe2ed] block">
                  Adaptive Stimulus
                </span>
                <span className="font-['Inter'] text-xs text-[#86948a] block mt-0.5">
                  Conditioned dynamically on Event 1 response velocity.
                </span>
              </div>

              <div className="bg-[#181c23] border border-[#262a32] p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#ffb95f]">
                    EVENT 03 (T=4.8s)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span>
                </div>
                <span className="font-['Inter'] text-sm font-semibold text-[#dfe2ed] block">
                  Temporal Phase Shift
                </span>
                <span className="font-['Inter'] text-xs text-[#86948a] block mt-0.5">
                  Micro-temporal disruption proving live presence.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Telemetry & Biological Response Vectors (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Primary Verification Verdict Box */}
            <div className="p-5 rounded-xl bg-[#1c2027] border border-[#31353d] transition-all shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className={`font-['JetBrains_Mono'] text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${scenarioDetails.pillClass}`}>
                  {scenarioDetails.pill}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#86948a]">
                  SESSION ELAPSED: {sessionTime.toFixed(2)}s
                </span>
              </div>

              <h3 className={`font-['Plus_Jakarta_Sans'] text-xl font-bold tracking-tight ${scenarioDetails.statusClass}`}>
                {scenarioDetails.status}
              </h3>
              <p className="font-['Inter'] text-xs text-[#bbcabf] mt-1.5 leading-relaxed">
                {scenarioDetails.desc}
              </p>

              {/* Discretion Disclaimer */}
              <div className="mt-4 p-2.5 bg-[#181c23] border border-[#262a32] rounded flex items-center gap-2.5">
                <Fingerprint className="w-4 h-4 text-[#4cd7f6] shrink-0" />
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#dfe2ed] leading-snug">
                  NO EMOTION MEASURED. Live biological and behavioral temporal coupling validated.
                </span>
              </div>

              {/* Score Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-[#262a32] border border-[#3c4a42] p-2.5 rounded text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                    RISK LEVEL
                  </span>
                  <span className={`font-['JetBrains_Mono'] text-lg font-bold ${scenarioDetails.riskClass}`}>
                    {scenarioDetails.risk}
                  </span>
                </div>

                <div className="bg-[#262a32] border border-[#3c4a42] p-2.5 rounded text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                    REPLAY PROB
                  </span>
                  <span className="font-['JetBrains_Mono'] text-lg font-bold text-[#dfe2ed]">
                    {scenarioDetails.replay}
                  </span>
                </div>

                <div className="bg-[#262a32] border border-[#3c4a42] p-2.5 rounded text-center">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                    SYNTHETIC RISK
                  </span>
                  <span className="font-['JetBrains_Mono'] text-lg font-bold text-[#dfe2ed]">
                    {scenarioDetails.synthetic}
                  </span>
                </div>
              </div>
            </div>

            {/* T0 - T5 Micro-temporal Breakdown Card */}
            <div className="p-5 rounded-xl bg-[#1c2027] border border-[#31353d] shadow-lg flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
                  TEMPORAL SIGNATURE STAGES (T0 - T5)
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3] font-medium">
                  Δ SYNC ACTIVE
                </span>
              </div>

              {/* Waveform Canvas Mockup */}
              <div className="h-20 w-full bg-[#0a0e15] border border-[#262a32] rounded p-1 relative overflow-hidden flex items-center">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 80">
                  {/* Grid lines */}
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#31353d" strokeDasharray="2 2" />
                  <line x1="100" y1="0" x2="100" y2="80" stroke="#31353d" strokeWidth="0.5" />
                  <line x1="200" y1="0" x2="200" y2="80" stroke="#31353d" strokeWidth="0.5" />
                  <line x1="300" y1="0" x2="300" y2="80" stroke="#31353d" strokeWidth="0.5" />

                  {/* Expected human baseline curve (dashed) */}
                  <path
                    d="M 0,40 Q 60,40 80,30 T 140,10 T 200,55 T 320,40 T 400,40"
                    fill="none"
                    stroke="#86948a"
                    strokeDasharray="4 3"
                    strokeWidth="1.5"
                  />

                  {/* Actual live response curve (primary / error depending on scenario) */}
                  <path
                    d={
                      scenario === 'replay'
                        ? 'M 0,40 L 400,40' // completely flat for replay
                        : scenario === 'deepfake'
                        ? 'M 0,40 Q 90,40 120,40 T 260,15 T 350,65 T 400,40' // delayed spike
                        : 'M 0,40 Q 65,40 85,28 T 142,12 T 205,58 T 315,40 T 400,40'
                    }
                    fill="none"
                    stroke={scenarioDetails.waveformColor}
                    strokeWidth="2.5"
                    className="transition-all duration-500"
                  />
                </svg>
              </div>

              {/* Step items */}
              <div className="space-y-1.5 font-['JetBrains_Mono'] text-xs">
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#181c23] rounded border border-[#262a32]">
                  <span className="text-[#bbcabf] font-medium">T0 • Stimulus Injection</span>
                  <span className="text-[#4edea3]">0ms (Reflex Root)</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#181c23] rounded border border-[#262a32]">
                  <span className="text-[#bbcabf] font-medium">T1 • Micro-Saccade Onset</span>
                  <span className="text-[#4cd7f6]">{scenarioDetails.t1}</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#181c23] rounded border border-[#262a32]">
                  <span className="text-[#bbcabf] font-medium">T2 • Eyebrow/Orbital Kinetic Shift</span>
                  <span className="text-[#4cd7f6]">{scenarioDetails.t2}</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#181c23] rounded border border-[#262a32]">
                  <span className="text-[#bbcabf] font-medium">T3 • Peak Involuntary Reflex</span>
                  <span className="text-[#4cd7f6]">{scenarioDetails.t3}</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#181c23] rounded border border-[#262a32]">
                  <span className="text-[#bbcabf] font-medium">T4 • Mouth/Facial Tension Release</span>
                  <span className="text-[#4cd7f6]">{scenarioDetails.t4}</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#181c23] rounded border border-[#262a32]">
                  <span className="text-[#bbcabf] font-medium">T5 • Decay to Resting Equilibrium</span>
                  <span className="text-[#4cd7f6]">{scenarioDetails.t5}</span>
                </div>
              </div>

              {/* Derived Response Vector Matrix */}
              <div className="p-3 bg-[#0a0e15] border border-[#262a32] rounded">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
                  DERIVED RESPONSE VECTOR R
                </span>
                <p className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] break-all leading-relaxed">
                  {scenarioDetails.vector}
                </p>
              </div>

              {/* Launch live verification modal action */}
              <button
                onClick={onOpenLiveModal}
                className="w-full py-2.5 bg-[#181c23] hover:bg-[#262a32] border border-[#3c4a42] hover:border-[#10b981] text-[#dfe2ed] font-['Plus_Jakarta_Sans'] font-semibold text-xs rounded transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <Video className="w-4 h-4 text-[#4edea3]" />
                <span>Run Interactive Test Modal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
