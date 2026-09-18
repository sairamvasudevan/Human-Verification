import React from 'react';
import { Terminal, Download, FileText, CheckCircle2 } from 'lucide-react';

interface ResearchSectionProps {
  onOpenWhitepaper: () => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  onOpenWhitepaper,
}) => {
  return (
    <section className="w-full bg-[#0a0e15] py-16 border-b border-[#1c2027]">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#ffb95f] uppercase tracking-wider">
              EMPIRICAL BENCHMARKS
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-semibold text-[#dfe2ed] mt-1.5">
              Research &amp; Red Team Lab Telemetry
            </h2>
            <p className="font-['Inter'] text-sm text-[#bbcabf] mt-1 leading-relaxed">
              Evaluated continuously against 450,000+ controlled attack sessions across DeepFaceLab, LivePortrait, ElevenLabs, and Playwright headless clusters.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-[#181c23] border border-[#262a32] px-3 py-1.5 rounded">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] uppercase tracking-wider font-semibold">
              CONTINUOUS RED TEAM RE-EVALUATION ACTIVE
            </span>
          </div>
        </div>

        {/* Metric Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-[#1c2027] border border-[#262a32] rounded-xl shadow-sm">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
              FAR (FALSE ACCEPTANCE RATE)
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#4edea3] tracking-tight block">
              0.001%
            </span>
            <p className="font-['Inter'] text-xs text-[#bbcabf] mt-3 leading-relaxed">
              Only 1 in 100,000 synthetic spoof attempts passes cross-correlation thresholds.
            </p>
          </div>

          <div className="p-5 bg-[#1c2027] border border-[#262a32] rounded-xl shadow-sm">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
              FRR (FALSE REJECTION RATE)
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#4cd7f6] tracking-tight block">
              0.014%
            </span>
            <p className="font-['Inter'] text-xs text-[#bbcabf] mt-3 leading-relaxed">
              Negligible legitimate human drop-off during spontaneous stimulus phase.
            </p>
          </div>

          <div className="p-5 bg-[#1c2027] border border-[#262a32] rounded-xl shadow-sm">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
              EER (EQUAL ERROR RATE)
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#ffb95f] tracking-tight block">
              0.008%
            </span>
            <p className="font-['Inter'] text-xs text-[#bbcabf] mt-3 leading-relaxed">
              Best-in-class performance against traditional active liveness turn-head models.
            </p>
          </div>

          <div className="p-5 bg-[#1c2027] border border-[#262a32] rounded-xl shadow-sm">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
              ROC-AUC SCORE
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#6ffbbe] tracking-tight block">
              0.9992
            </span>
            <p className="font-['Inter'] text-xs text-[#bbcabf] mt-3 leading-relaxed">
              Forensic discriminatory precision validated against both injected and optical reruns.
            </p>
          </div>
        </div>

        {/* Red Team Lab Callout Card */}
        <div className="mt-6 p-5 bg-[#1c2027] border border-[#31353d] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#262a32] border border-[#3c4a42] flex items-center justify-center shrink-0 shadow-inner">
              <Terminal className="w-6 h-6 text-[#4cd7f6]" />
            </div>
            <div>
              <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed]">
                Download Full 2025 Autonomous Presence Security Whitepaper
              </h4>
              <p className="font-['Inter'] text-xs text-[#86948a] mt-0.5 leading-relaxed">
                Includes full mathematical formulas for temporal cross-coupling and sub-millisecond saccade distribution.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenWhitepaper}
            className="shrink-0 px-4 py-2.5 bg-[#262a32] hover:bg-[#31353d] text-[#dfe2ed] hover:text-[#4edea3] border border-[#3c4a42] font-['Inter'] text-xs font-semibold rounded transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-[#4cd7f6]" />
            <span>Download PDF (4.2 MB)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
