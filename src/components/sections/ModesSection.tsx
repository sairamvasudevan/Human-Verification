import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { VERIFICATION_MODES } from '../../data/mockData';

interface ModesSectionProps {
  onSelectMode?: (modeId: string) => void;
}

export const ModesSection: React.FC<ModesSectionProps> = ({ onSelectMode }) => {
  const [selectedMode, setSelectedMode] = useState<string>('mode-01');

  return (
    <section className="w-full bg-[#0f131b] py-16 border-b border-[#1c2027]">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="max-w-2xl mb-10">
          <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4edea3] uppercase tracking-wider">
            FLEXIBLE ENFORCEMENT TIERS
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-semibold text-[#dfe2ed] mt-1.5">
            Four Purpose-Built Verification Modes
          </h2>
          <p className="font-['Inter'] text-sm text-[#bbcabf] mt-2 leading-relaxed">
            From completely friction-free onboarding flows to cryptographic high-value asset transfer authorizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VERIFICATION_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;

            return (
              <div
                key={mode.id}
                onClick={() => {
                  setSelectedMode(mode.id);
                  if (onSelectMode) onSelectMode(mode.id);
                }}
                className={`p-6 rounded-xl transition-all flex flex-col justify-between cursor-pointer group border ${
                  isSelected
                    ? 'bg-[#1c2027] border-[#4edea3]/60 shadow-[0_0_20px_rgba(78,222,163,0.15)]'
                    : 'bg-[#1c2027] border-[#262a32] hover:bg-[#262a32] hover:border-[#3c4a42]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-['JetBrains_Mono'] text-[11px] font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                        mode.tagColor === 'primary'
                          ? 'bg-[#10b981]/20 text-[#4edea3] border border-[#10b981]/40'
                          : mode.tagColor === 'tertiary'
                          ? 'bg-[#e29100]/20 text-[#ffb95f] border border-[#e29100]/40'
                          : 'bg-[#262a32] text-[#4cd7f6] border border-[#3c4a42]'
                      }`}
                    >
                      {mode.number}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a]">
                      {mode.duration}
                    </span>
                  </div>

                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#dfe2ed] mb-2 group-hover:text-[#4edea3] transition-colors">
                    {mode.name}
                  </h3>

                  <p className="font-['Inter'] text-xs text-[#bbcabf] mb-5 leading-relaxed">
                    {mode.description}
                  </p>

                  <div className="space-y-2 font-['Inter'] text-xs text-[#dfe2ed]">
                    {mode.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            mode.tagColor === 'primary'
                              ? 'text-[#4edea3]'
                              : mode.tagColor === 'tertiary'
                              ? 'text-[#ffb95f]'
                              : 'text-[#4cd7f6]'
                          }`}
                        />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 bg-[#181c23] border border-[#262a32] p-3 rounded">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                    TARGET ASSURANCE
                  </span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span
                      className={`font-['Plus_Jakarta_Sans'] text-base font-bold ${
                        mode.tagColor === 'primary'
                          ? 'text-[#4edea3]'
                          : mode.tagColor === 'tertiary'
                          ? 'text-[#ffb95f]'
                          : 'text-[#4cd7f6]'
                      }`}
                    >
                      {mode.targetAssurance} ({mode.assurancePercent})
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
