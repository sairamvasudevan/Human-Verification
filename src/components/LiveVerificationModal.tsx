import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Camera, 
  Video, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  Copy, 
  Check, 
  Lock, 
  Eye, 
  Activity,
  Maximize2
} from 'lucide-react';
import { HUD_SUBJECT_IMAGE_URL } from '../data/mockData';

interface LiveVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveVerificationModal: React.FC<LiveVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<'calibrate' | 'challenge' | 'analyzing' | 'result'>('calibrate');
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [isSpoofTest, setIsSpoofTest] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [stimulusPosition, setStimulusPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [measuredLatency, setMeasuredLatency] = useState<number>(218);
  const [copied, setCopied] = useState<boolean>(false);
  const [generatedToken, setGeneratedToken] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Setup camera when requested
  useEffect(() => {
    if (isOpen && useCamera) {
      navigator.mediaDevices
        ?.getUserMedia({ video: { width: 1280, height: 720 } })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn('Camera error:', err);
          setUseCamera(false);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isOpen, useCamera]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStep('calibrate');
      setCountdown(3);
      setIsSpoofTest(false);
      setGeneratedToken('');
    }
  }, [isOpen]);

  const startVerificationSequence = () => {
    setStep('calibrate');
    setCountdown(3);

    // Calibration countdown
    const calibInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(calibInterval);
          // Transition to spontaneous challenge
          setStep('challenge');
          // Pick a random optical cue position
          setStimulusPosition({
            x: Math.floor(25 + Math.random() * 50),
            y: Math.floor(25 + Math.random() * 50),
          });

          // Wait 1.6 seconds for reflexive gaze alignment
          setTimeout(() => {
            setStep('analyzing');
            const latency = isSpoofTest ? 890 : Math.floor(205 + Math.random() * 35);
            setMeasuredLatency(latency);

            // Generate synthetic or authentic token
            setTimeout(() => {
              const fakeJwt = `eyJhbGciOiJFZERTQTE5IiwidHlwIjoiSldUIn0.${btoa(
                JSON.stringify({
                  sub: 'user_' + Math.random().toString(36).substring(2, 8),
                  status: isSpoofTest ? 'SYNTHETIC_ANOMALY' : 'VERIFIED_HUMAN',
                  risk_level: isSpoofTest ? 'CRITICAL' : 'LOW',
                  confidence: isSpoofTest ? 0.08 : 0.994,
                  saccade_latency_ms: latency,
                  rppg_pulse_bpm: isSpoofTest ? null : 72,
                  session_nonce: Math.random().toString(36).substring(2, 10),
                  exp: Math.floor(Date.now() / 1000) + 300,
                })
              )}.ed25519_${Math.random().toString(36).substring(2, 16)}`;

              setGeneratedToken(fakeJwt);
              setStep('result');
            }, 1200);
          }, 1600);

          return 0;
        }
        return prev - 1;
      });
    }, 900);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0f131b] border border-[#31353d] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#181c23] border-b border-[#262a32]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed]">
              REACT-ID Live Verification Sandbox
            </h3>
            <span className="font-['JetBrains_Mono'] text-[11px] bg-[#262a32] text-[#4cd7f6] px-2 py-0.5 rounded uppercase">
              WASM V4.2
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUseCamera(!useCamera)}
              className="px-2.5 py-1 text-xs rounded bg-[#262a32] hover:bg-[#31353d] text-[#dfe2ed] border border-[#3c4a42] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#4cd7f6]" />
              <span>{useCamera ? 'Switch to Model' : 'Enable My Camera'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#86948a] hover:text-[#dfe2ed] hover:bg-[#262a32] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Camera Viewport */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <div className="relative aspect-[16/10] bg-[#0a0e15] border border-[#262a32] rounded-xl overflow-hidden flex items-center justify-center">
            {useCamera ? (
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
                alt="Verification test subject"
                className="w-full h-full object-cover opacity-70 mix-blend-luminosity filter contrast-110"
              />
            )}

            {/* Targeting overlay grid */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 500">
                {/* 4 corner brackets */}
                <path d="M 40 70 L 40 40 L 70 40" stroke="#4cd7f6" strokeWidth="2" fill="none" />
                <path d="M 760 70 L 760 40 L 730 40" stroke="#4cd7f6" strokeWidth="2" fill="none" />
                <path d="M 40 430 L 40 460 L 70 460" stroke="#4cd7f6" strokeWidth="2" fill="none" />
                <path d="M 760 430 L 760 460 L 730 460" stroke="#4cd7f6" strokeWidth="2" fill="none" />
                
                {/* Oval face guide */}
                <ellipse
                  cx="400"
                  cy="250"
                  rx="160"
                  ry="210"
                  fill="none"
                  stroke="#4edea3"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* Dynamic Step Overlays */}
            {step === 'calibrate' && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center mb-3">
                  <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#4edea3]">
                    {countdown > 0 ? countdown : 'Ready'}
                  </span>
                </div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-white mb-1">
                  Calibrating Optical Alignment
                </h4>
                <p className="font-['Inter'] text-xs text-[#bbcabf] max-w-sm mb-4">
                  Center your face within the guide. Zero facial identity or video frames leave your device memory.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={startVerificationSequence}
                    className="px-5 py-2 bg-[#10b981] text-[#00422b] font-semibold text-xs rounded hover:bg-[#4edea3] transition-all cursor-pointer shadow-lg"
                  >
                    Start Sequence Now
                  </button>
                  <button
                    onClick={() => {
                      setIsSpoofTest(!isSpoofTest);
                    }}
                    className={`px-3 py-2 text-xs rounded border transition-colors cursor-pointer ${
                      isSpoofTest
                        ? 'bg-[#93000a] text-white border-red-500 font-bold'
                        : 'bg-[#262a32] text-[#bbcabf] border-[#3c4a42]'
                    }`}
                  >
                    {isSpoofTest ? 'Simulating Deepfake Attack' : 'Simulate Spoof Attack'}
                  </button>
                </div>
              </div>
            )}

            {step === 'challenge' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Dynamic animated optical cue that appears unpredictably */}
                <div
                  className="absolute transition-all duration-500 flex items-center justify-center"
                  style={{
                    left: `${stimulusPosition.x}%`,
                    top: `${stimulusPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span className="relative flex h-10 w-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd7f6] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-10 w-10 bg-[#4cd7f6]/80 border-2 border-white items-center justify-center text-xs font-bold text-black shadow-[0_0_20px_#4cd7f6]">
                      •
                    </span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#4cd7f6]/50 text-center">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6] font-semibold">
                    [REFLEX TEST] Track the optical cue with your eyes
                  </span>
                </div>
              </div>
            )}

            {step === 'analyzing' && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <RefreshCw className="w-10 h-10 text-[#4edea3] animate-spin mb-3" />
                <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white mb-1">
                  Correlating 5-Channel Temporal Dynamics...
                </h4>
                <p className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6]">
                  Micro-saccade latency delta: {measuredLatency}ms • Evaluating rPPG pulse
                </p>
              </div>
            )}

            {step === 'result' && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                    isSpoofTest ? 'bg-red-500/20 text-red-400 border border-red-500' : 'bg-[#10b981]/20 text-[#4edea3] border border-[#10b981]'
                  }`}
                >
                  {isSpoofTest ? <AlertTriangle className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                </div>

                <span
                  className={`font-['JetBrains_Mono'] text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider mb-2 ${
                    isSpoofTest
                      ? 'bg-red-500/30 text-red-300'
                      : 'bg-[#10b981]/30 text-[#4edea3]'
                  }`}
                >
                  {isSpoofTest ? 'SYNTHETIC_ANOMALY DETECTED' : 'VERIFIED_HUMAN (CONFIDENCE 99.4%)'}
                </span>

                <h4 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white mb-1">
                  {isSpoofTest ? 'Synthetic Media Spoof Intercepted' : 'Live Human Physical Presence Authenticated'}
                </h4>

                <p className="font-['Inter'] text-xs text-[#bbcabf] max-w-md mb-4">
                  {isSpoofTest
                    ? 'Ocular micro-latency exceeded biological thresholds (>850ms). Temporal cross-coupling signature indicates pre-rendered deepfake or injection stream.'
                    : 'Subconscious reflex latency logged at 218ms. Biological rPPG hemoglobin pulse and optical micro-saccade phase synchrony validated.'}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={startVerificationSequence}
                    className="px-4 py-2 bg-[#262a32] hover:bg-[#31353d] text-white text-xs font-semibold rounded border border-[#3c4a42] transition-colors cursor-pointer"
                  >
                    Run Again
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-[#10b981] text-[#00422b] font-semibold text-xs rounded hover:bg-[#4edea3] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Generated Cryptographic Attestation Output */}
          {generatedToken && (
            <div className="p-3 bg-[#181c23] border border-[#262a32] rounded-lg">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4edea3] uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#4edea3]" />
                  <span>Ed25519-Signed Attestation Token</span>
                </span>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] font-['JetBrains_Mono'] text-[#bbcabf] hover:text-white px-2 py-0.5 rounded bg-[#262a32] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#4edea3]" />
                      <span className="text-[#4edea3]">Copied Token</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy JWT</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-2 bg-[#0a0e15] rounded border border-[#31353d] font-['JetBrains_Mono'] text-[11px] text-[#bbcabf] break-all leading-relaxed max-h-20 overflow-y-auto">
                {generatedToken}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
