import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Create a virtual download link
      const element = document.createElement('a');
      const file = new Blob(
        [
          `REACT-ID TECHNICAL WHITEPAPER (2025 EDITION)\n` +
            `Autonomous Cryptographic Human Presence Verification and Temporal Cross-Coupling Engine\n\n` +
            `ABSTRACT:\n` +
            `Traditional Identity Verification (IDV) pipelines relying on static video capture or predictable turn-head gestures are critically vulnerable to modern generative diffusion models (LivePortrait, SadTalker) and real-time deepfake pipelines (DeepFaceLive).\n\n` +
            `REACT-ID introduces a sub-millisecond temporal cross-coupling engine that verifies human presence through unpredictable, adaptive challenge-response audiovisual stimuli.\n\n` +
            `MATHEMATICAL SPECIFICATIONS:\n` +
            `R_cross = ∫ [ S_stimulus(t) * K_kinetic(t - Δt) ] dt\n` +
            `Where Δt conforms to the human subconscious involuntary neuro-motor latency distribution (180ms - 280ms).\n\n` +
            `EMPIRICAL BENCHMARKS:\n` +
            `- False Acceptance Rate (FAR): 0.001%\n` +
            `- False Rejection Rate (FRR): 0.014%\n` +
            `- Equal Error Rate (EER): 0.008%\n` +
            `- ROC-AUC Score: 0.9992\n\n` +
            `© 2025 REACT-ID Inc. All rights reserved.`,
        ],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = 'REACT-ID_Security_Whitepaper_2025.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f131b] border border-[#31353d] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181c23] border-b border-[#262a32]">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#4edea3]" />
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed]">
                2025 Autonomous Presence Security Whitepaper
              </h3>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a]">
                Document Ref: RID-SEC-2025-V4.2 • Peer-Reviewed Draft
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-3 py-1.5 bg-[#10b981] hover:bg-[#4edea3] text-[#00422b] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Downloading...' : 'Download Document'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#86948a] hover:text-white hover:bg-[#262a32] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Content */}
        <div className="p-6 overflow-y-auto space-y-6 font-['Inter'] text-sm text-[#bbcabf] leading-relaxed">
          <div className="p-4 bg-[#181c23] border border-[#262a32] rounded-lg">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#4cd7f6] uppercase font-bold block mb-1">
              EXECUTIVE ABSTRACT
            </span>
            <p className="text-xs text-[#dfe2ed]">
              Conventional identity verification pipelines based on passive selfie frames or scripted gestures ("blink twice", "turn head left") are completely bypassed by off-the-shelf generative models and virtual camera drivers. We formulate an unpredictable, bidirectional temporal cross-coupling mechanism operating at the edge in client WebAssembly, enforcing involuntary neuro-motor latency limits without retaining or reconstructing biometric templates.
            </p>
          </div>

          <section>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              1. Inadequacy of Static Video and Scripted CAPTCHAs
            </h4>
            <p className="text-xs leading-normal mb-2">
              Generative diffusion models like LivePortrait and transformer-based lip-sync models can interpolate photorealistic facial frames at 60 FPS. Turn-head liveness tests fail because attackers can either harvest historic turns from the target or simulate head pitch/yaw using standard neural warpers.
            </p>
          </section>

          <section>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              2. Mathematical Formulation of Temporal Cross-Coupling
            </h4>
            <p className="text-xs leading-normal mb-3">
              Let <em>S(t)</em> represent an unpredictable optical stimulus injected at time <em>t₀</em> with seed <em>σ ~ CSPRNG</em>. The human subconscious response vector <em>R(t)</em> is parameterized by involuntary saccade acceleration:
            </p>
            <div className="p-3 bg-[#0a0e15] border border-[#262a32] rounded font-['JetBrains_Mono'] text-xs text-[#4edea3] text-center my-2">
              C(τ) = ∫ S(t) · [ K_landmark(t - τ) + α · rPPG(t - τ) ] dt
            </div>
            <p className="text-xs leading-normal">
              For legitimate biological subjects, peak cross-correlation occurs strictly within <em>τ ∈ [180ms, 280ms]</em>. Deepfake neural bridges introduce pipeline latency (τ &gt; 600ms) or zero latency in automated bot replays (τ = 0ms).
            </p>
          </section>

          <section>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              3. Remote Photoplethysmography (rPPG) Coherence
            </h4>
            <p className="text-xs leading-normal">
              By isolating chrominance channel green-red micro-shifts across forehead epidermal boundaries, REACT-ID extracts micro-vascular blood perfusion pulses (0.8 - 2.5 Hz). Real-time synthetic face swaps destroy this natural sub-pixel hemoglobin modulation.
            </p>
          </section>

          <section>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              4. Zero-Knowledge Cryptographic Attestation
            </h4>
            <p className="text-xs leading-normal">
              Raw frames are consumed solely within the ephemeral WebAssembly execution boundary. Once latency vectors are derived, the client signs the verification packet using an ephemeral key pair attested via Ed25519, proving liveness without transmitting images.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
