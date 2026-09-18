import React from 'react';
import { ShieldCheck, ShieldAlert, Zap } from 'lucide-react';
import { ATTACK_VECTORS } from '../../data/mockData';

interface AttackMatrixSectionProps {
  onSimulateAttack?: (attackId: string) => void;
}

export const AttackMatrixSection: React.FC<AttackMatrixSectionProps> = ({
  onSimulateAttack,
}) => {
  return (
    <section className="w-full bg-[#0f131b] py-16 border-b border-[#1c2027]">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="max-w-3xl mb-10">
          <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#ffb95f] uppercase tracking-wider">
            THREAT INTELLIGENCE DIRECTORY
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-semibold text-[#dfe2ed] mt-1.5">
            Attack Matrix &amp; Counter-Defense Vectors
          </h2>
          <p className="font-['Inter'] text-sm text-[#bbcabf] mt-2 leading-relaxed">
            Adversarial analysis against seven primary injection and generation attack topologies.
          </p>
        </div>

        {/* Matrix Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ATTACK_VECTORS.map((attack) => (
            <div
              key={attack.id}
              className="p-5 bg-[#1c2027] border border-[#262a32] hover:border-[#3c4a42] rounded-lg shadow-sm flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-['JetBrains_Mono'] text-[11px] font-bold px-2 py-0.5 rounded bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30">
                    {attack.letter}
                  </span>
                  <div className="flex items-center gap-1 text-[#4edea3] font-['JetBrains_Mono'] text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4edea3]" />
                    <span>{attack.status}</span>
                  </div>
                </div>

                <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed] group-hover:text-[#4cd7f6] transition-colors">
                  {attack.title}
                </h3>

                <p className="font-['Inter'] text-xs text-[#86948a] mt-1.5 mb-4 leading-relaxed">
                  {attack.description}
                </p>
              </div>

              <div className="mt-2">
                <div className="bg-[#181c23] border border-[#262a32] p-3 rounded">
                  <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#4cd7f6] uppercase tracking-wider block mb-1">
                    REACT-ID DEFENSE VECTOR
                  </span>
                  <p className="font-['Inter'] text-xs text-[#dfe2ed] leading-relaxed">
                    {attack.defenseVector}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#262a32] text-[11px]">
                  <span className="font-['JetBrains_Mono'] text-[#86948a]">
                    Bypass: <span className="text-[#4edea3] font-bold">{attack.bypassRate}</span>
                  </span>
                  {onSimulateAttack && (
                    <button
                      onClick={() => onSimulateAttack(attack.id)}
                      className="text-[#4cd7f6] hover:text-[#dfe2ed] font-['Inter'] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Zap className="w-3 h-3 text-[#ffb95f]" />
                      <span>Simulate in Engine</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
