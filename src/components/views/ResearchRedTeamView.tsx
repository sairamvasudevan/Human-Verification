import React from 'react';
import { Terminal, Download, ShieldCheck, AlertCircle, FileCode, CheckCircle2 } from 'lucide-react';

interface ResearchRedTeamViewProps {
  onOpenWhitepaper: () => void;
}

export const ResearchRedTeamView: React.FC<ResearchRedTeamViewProps> = ({
  onOpenWhitepaper,
}) => {
  return (
    <div className="w-full bg-[#0f131b] py-12">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#ffb95f] uppercase tracking-wider">
                EMPIRICAL BENCHMARKS &amp; FORENSIC AUDITING
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a]">
                DATASET V4.2
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#dfe2ed]">
              Research &amp; Red Team Evaluation
            </h1>
            <p className="font-['Inter'] text-sm text-[#bbcabf] max-w-3xl mt-2 leading-relaxed">
              Forensic validation across 450,000+ controlled adversarial sessions testing synthetic diffusion, real-time neural face swaps, and automated virtual camera injection loops.
            </p>
          </div>

          <button
            onClick={onOpenWhitepaper}
            className="px-4 py-2.5 bg-[#10b981] hover:bg-[#4edea3] text-[#00422b] font-['Plus_Jakarta_Sans'] font-semibold text-xs rounded transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Read 2025 Security Whitepaper</span>
          </button>
        </div>

        {/* Comparison Table vs Traditional IDV */}
        <div className="bg-[#1c2027] border border-[#31353d] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262a32]">
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#dfe2ed]">
              Empirical Comparative Matrix: Traditional IDV vs. REACT-ID
            </h3>
            <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3]">
              INDEPENDENT BENCHMARK
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-xs">
              <thead className="bg-[#181c23] text-[#86948a] font-['JetBrains_Mono']">
                <tr>
                  <th className="px-4 py-3">ATTACK TOPOLOGY</th>
                  <th className="px-4 py-3">TRADITIONAL PASSIVE SELFIE</th>
                  <th className="px-4 py-3">SCRIPTED TURN-HEAD TESTS</th>
                  <th className="px-4 py-3 text-[#4edea3]">REACT-ID ENGINE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262a32]">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[#dfe2ed]">
                    Real-time Face Swap (DeepFaceLive)
                  </td>
                  <td className="px-4 py-3 text-[#ffb4ab]">Bypassed (84% success)</td>
                  <td className="px-4 py-3 text-[#ffb4ab]">Bypassed (71% success)</td>
                  <td className="px-4 py-3 text-[#4edea3] font-bold">Defeated (0.003% bypass)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[#dfe2ed]">
                    Generative Diffusion (LivePortrait)
                  </td>
                  <td className="px-4 py-3 text-[#ffb4ab]">Bypassed (92% success)</td>
                  <td className="px-4 py-3 text-[#ffb4ab]">Bypassed (68% success)</td>
                  <td className="px-4 py-3 text-[#4edea3] font-bold">Defeated (0.001% bypass)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[#dfe2ed]">
                    Virtual Camera OBS Injection
                  </td>
                  <td className="px-4 py-3 text-[#ffb4ab]">Bypassed (96% success)</td>
                  <td className="px-4 py-3 text-[#ffb4ab]">Bypassed (89% success)</td>
                  <td className="px-4 py-3 text-[#4edea3] font-bold">Defeated (0.001% bypass)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[#dfe2ed]">
                    Biometric Template Privacy
                  </td>
                  <td className="px-4 py-3 text-[#86948a]">Uploads face images</td>
                  <td className="px-4 py-3 text-[#86948a]">Stores video clips</td>
                  <td className="px-4 py-3 text-[#4cd7f6] font-bold">Zero video/templates saved</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[#dfe2ed]">
                    Verification Time
                  </td>
                  <td className="px-4 py-3 text-[#bbcabf]">12s - 25s (Cloud latency)</td>
                  <td className="px-4 py-3 text-[#bbcabf]">18s - 35s (User friction)</td>
                  <td className="px-4 py-3 text-[#4edea3] font-bold">3s - 5s (Edge WASM)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dataset Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-[#181c23] border border-[#262a32] rounded-xl">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffb95f] uppercase block mb-1">
              DATASET SUITE 01
            </span>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              Neural Diffusion Avatars
            </h4>
            <p className="font-['Inter'] text-xs text-[#bbcabf] leading-relaxed">
              180,000 synthetic rendering sessions generated across SadTalker, LivePortrait, HeyGen, and ElevenLabs generative lipsync models.
            </p>
          </div>

          <div className="p-5 bg-[#181c23] border border-[#262a32] rounded-xl">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#4cd7f6] uppercase block mb-1">
              DATASET SUITE 02
            </span>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              Kernel &amp; V4L2 Injections
            </h4>
            <p className="font-['Inter'] text-xs text-[#bbcabf] leading-relaxed">
              150,000 loopback device sessions testing OBS Virtual Camera, ManyCam, DirectShow virtual capture, and Chrome devtools media stream overwrites.
            </p>
          </div>

          <div className="p-5 bg-[#181c23] border border-[#262a32] rounded-xl">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] uppercase block mb-1">
              DATASET SUITE 03
            </span>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] mb-2">
              Worldwide Human Ground Truth
            </h4>
            <p className="font-['Inter'] text-xs text-[#bbcabf] leading-relaxed">
              120,000 diverse real-world human sessions across 84 nationalities, low-light webcams, and mobile cameras establishing physiological latency baselines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
