import React, { useState } from 'react';
import { Cpu, Lock, ShieldCheck, Activity, Brain, Radio, ArrowRight } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeSignal, setActiveSignal] = useState<number>(0);

  const signalDetails = [
    {
      title: 'Ocular Micro-Saccade Dynamics',
      channel: 'CHANNEL 01 (OPTICAL)',
      latency: '210ms - 260ms',
      tech: 'WASM Mediapipe Mesh (Landmarks 468-473)',
      desc: 'Involuntary ocular rapid shifts triggered involuntarily when an unexpected optical stimulus appears on screen. The human eye decelerates at precise mechanical limits that no software synthetic animation or mouse injection can spoof spontaneously.',
      formula: 'v_saccade(t) = dθ/dt | max_accel ≤ 35,000 deg/s²',
    },
    {
      title: 'Orbital & Facial Kinetic Deceleration',
      channel: 'CHANNEL 02 (KINEMATIC)',
      latency: '340ms - 420ms',
      tech: 'Spatial Coordinate Delta Engine',
      desc: 'Following ocular micro-saccades, human facial muscles exhibit subconscious kinetic micro-tension and relaxation. Synthetic face-swapping engines fail to coordinate this secondary orbital muscular response with the primary optical phase shift.',
      formula: 'Δ_kinetic = ||P_mesh(t) - P_mesh(t - Δt)||_2',
    },
    {
      title: 'rPPG Hemoglobin Blood Perfusion',
      channel: 'CHANNEL 03 (BIOLOGICAL)',
      latency: 'Continuous (0.8 - 2.5 Hz)',
      tech: 'Epidermal Chrominance FFT Filter',
      desc: 'Sub-pixel optical pulse extraction from forehead capillary boundaries. Every cardiac cycle causes microscopic color variations in reflected light. DeepFaceLive and synthetic avatars wipe out this biological pulse coherence.',
      formula: 'Pulse(t) = FFT( (G(t) - R(t)) / (G_mean + R_mean) )',
    },
    {
      title: 'Bidirectional Temporal Cross-Coupling',
      channel: 'CHANNEL 04 (STOCHASTIC)',
      latency: 'Real-time (< 18ms jitter)',
      tech: 'CSPRNG Nonce Seed Generator',
      desc: 'Stimuli sequences are not deterministic; each frame stimulus is seeded by a cryptographic nonce. Challenge #2 depends strictly on observed millisecond response velocity of Challenge #1, destroying pre-recorded video replay libraries.',
      formula: 'Seed_t+1 = HMAC_SHA256(Seed_t, Kinetic_response_t)',
    },
    {
      title: 'Zero-Knowledge Attestation Envelope',
      channel: 'CHANNEL 05 (CRYPTOGRAPHIC)',
      latency: 'Immediate post-session',
      tech: 'Ed25519 Curve Digital Signatures',
      desc: 'The client-side WASM engine processes pixels in volatile memory, strips raw imagery, computes mathematical vectors, and produces an Ed25519 signed JSON Web Token containing liveness confidence scores without retaining face photos.',
      formula: 'Sig = Ed25519_Sign(Sk_ephemeral, Session_ID || Status || Score)',
    },
  ];

  return (
    <div className="w-full bg-[#0f131b] py-12">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 space-y-12">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
              SYSTEM ARCHITECTURE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a]">
              SPECIFICATION V4.2
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#dfe2ed]">
            Edge WebAssembly &amp; Temporal Mathematics
          </h1>
          <p className="font-['Inter'] text-sm text-[#bbcabf] max-w-3xl mt-2 leading-relaxed">
            Examine the internal cryptographic and physiological pipeline that validates live human presence in under 5 seconds without uploading images or collecting biometric templates.
          </p>
        </div>

        {/* 5-Channel Interactive Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Signal Selector list (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {signalDetails.map((sig, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSignal(idx)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  activeSignal === idx
                    ? 'bg-[#1c2027] border-[#4edea3] shadow-[0_0_16px_rgba(78,222,163,0.15)]'
                    : 'bg-[#181c23] border-[#262a32] hover:bg-[#1c2027] hover:border-[#3c4a42]'
                }`}
              >
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#4cd7f6] uppercase font-bold block mb-1">
                  {sig.channel}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#dfe2ed] block">
                  {sig.title}
                </span>
                <span className="font-['Inter'] text-xs text-[#86948a] mt-1 block">
                  Latency: {sig.latency}
                </span>
              </button>
            ))}
          </div>

          {/* Active Signal Details View (8 cols) */}
          <div className="lg:col-span-8 p-6 bg-[#1c2027] border border-[#31353d] rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262a32] mb-6">
                <div>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3] uppercase tracking-wider font-semibold">
                    {signalDetails[activeSignal].channel}
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#dfe2ed] mt-1">
                    {signalDetails[activeSignal].title}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                    EXTRACTION RUNTIME
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6] font-semibold">
                    {signalDetails[activeSignal].tech}
                  </span>
                </div>
              </div>

              <p className="font-['Inter'] text-sm text-[#bbcabf] leading-relaxed mb-6">
                {signalDetails[activeSignal].desc}
              </p>

              <div className="bg-[#0a0e15] border border-[#262a32] p-4 rounded-xl mb-6">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a] uppercase block mb-1 font-semibold">
                  MATHEMATICAL CORRELATION FUNCTION
                </span>
                <code className="font-['JetBrains_Mono'] text-sm text-[#4edea3] block font-semibold">
                  {signalDetails[activeSignal].formula}
                </code>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#262a32]">
              <div className="p-3 bg-[#181c23] rounded border border-[#262a32] text-center">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                  EDGE MEMORY
                </span>
                <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#dfe2ed]">
                  &lt; 32 MB HEAP
                </span>
              </div>
              <div className="p-3 bg-[#181c23] rounded border border-[#262a32] text-center">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                  FPS CAPTURE
                </span>
                <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#4edea3]">
                  60 FPS LOCKED
                </span>
              </div>
              <div className="p-3 bg-[#181c23] rounded border border-[#262a32] text-center">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                  PRIVACY GUARANTEE
                </span>
                <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#4cd7f6]">
                  ZERO TEMPLATES
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Tier Security Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#181c23] border border-[#262a32] rounded-xl">
            <Cpu className="w-8 h-8 text-[#4cd7f6] mb-3" />
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              Isolated Client Sandbox
            </h4>
            <p className="font-['Inter'] text-xs text-[#bbcabf] leading-relaxed">
              Execution occurs strictly within an isolated WebAssembly virtual machine. The binary possesses no network capabilities during video processing, ensuring frames cannot leak.
            </p>
          </div>

          <div className="p-6 bg-[#181c23] border border-[#262a32] rounded-xl">
            <Radio className="w-8 h-8 text-[#4edea3] mb-3" />
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              Temporal Phase Lock
            </h4>
            <p className="font-['Inter'] text-xs text-[#bbcabf] leading-relaxed">
              High-precision microsecond timers compare browser presentation vs camera capture timestamps, neutralizing virtual camera loop delays and software injection buffers.
            </p>
          </div>

          <div className="p-6 bg-[#181c23] border border-[#262a32] rounded-xl">
            <Lock className="w-8 h-8 text-[#ffb95f] mb-3" />
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              Hardware Attestation
            </h4>
            <p className="font-['Inter'] text-xs text-[#bbcabf] leading-relaxed">
              In High Assurance mode, challenge-response tokens are bound to device TPM / Secure Enclave keys using WebAuthn PRF extensions, binding presence to physical silicon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
