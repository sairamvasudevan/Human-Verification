import React from 'react';
import { CameraOff, Cpu, Key, ShieldCheck, Video, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onLaunchDemo: () => void;
  onExploreSdk: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchDemo,
  onExploreSdk,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0f131b] py-14 lg:py-24 border-b border-[#1c2027]/80">
      {/* Ambient glowing radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-tr from-[#10b981]/15 via-[#4cd7f6]/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-12 right-12 w-96 h-96 bg-[#4cd7f6]/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Top Security Badge */}
          <div className="inline-flex items-center gap-2 bg-[#262a32] border border-[#3c4a42]/60 px-3.5 py-1 rounded-full shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] uppercase tracking-wider font-medium">
              NEXT-GEN HUMAN PRESENCE VERIFICATION • NO CAPTCHAS • NO EMOTION PROFILING
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#dfe2ed] tracking-tight leading-[1.12] mb-5">
            Prove there's a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4edea3] via-[#4cd7f6] to-[#6ffbbe] drop-shadow-[0_0_20px_rgba(78,222,163,0.3)]">
              human
            </span>{' '}
            behind the screen.
          </h1>

          {/* Subtitle */}
          <p className="font-['Inter'] text-base md:text-lg text-[#bbcabf] max-w-3xl mb-8 leading-relaxed font-normal">
            REACT-ID verifies live physical presence through unpredictable, adaptive challenge-response audiovisual stimuli and millisecond temporal synchronization. Engineered specifically to defeat real-time face swaps, synthetic avatars, replay injections, and browser bots.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={onLaunchDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#10b981] text-[#00422b] font-['Plus_Jakarta_Sans'] font-semibold text-sm rounded shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:bg-[#4edea3] hover:shadow-[0_0_32px_rgba(78,222,163,0.5)] transition-all cursor-pointer"
            >
              <Video className="w-5 h-5" />
              <span>Launch Live Interactive Demo</span>
            </button>

            <button
              onClick={onExploreSdk}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#262a32] text-[#dfe2ed] border border-[#3c4a42] font-['Inter'] font-semibold text-sm rounded hover:bg-[#31353d] hover:border-[#4cd7f6]/50 transition-all shadow-sm cursor-pointer"
            >
              <Terminal className="w-5 h-5 text-[#4cd7f6]" />
              <span>Explore One-Line SDK</span>
            </button>
          </div>

          {/* Micro-trust Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#181c23] border border-[#262a32] p-3 rounded-lg shadow-sm">
            <div className="flex items-center justify-center gap-2 text-left p-2">
              <CameraOff className="w-5 h-5 text-[#4edea3] shrink-0" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#bbcabf]">
                Zero facial video stored
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-left p-2">
              <Cpu className="w-5 h-5 text-[#4cd7f6] shrink-0" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#bbcabf]">
                Edge WASM landmarking
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-left p-2">
              <Key className="w-5 h-5 text-[#ffb95f] shrink-0" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#bbcabf]">
                Ephemeral CSPRNG session
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-left p-2">
              <ShieldCheck className="w-5 h-5 text-[#6ffbbe] shrink-0" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#bbcabf]">
                Anti-synthetic media proof
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
