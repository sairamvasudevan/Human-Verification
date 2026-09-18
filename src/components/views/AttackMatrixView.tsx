import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Zap, AlertTriangle, CheckCircle2, Play } from 'lucide-react';
import { ATTACK_VECTORS } from '../../data/mockData';

export const AttackMatrixView: React.FC = () => {
  const [selectedAttack, setSelectedAttack] = useState<string>('attack-c');
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const currentAttack = ATTACK_VECTORS.find((a) => a.id === selectedAttack) || ATTACK_VECTORS[0];

  const handleRunSimulation = () => {
    setSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      setSimulating(false);
      setSimResult('INTERCEPTED');
    }, 1200);
  };

  return (
    <div className="w-full bg-[#0f131b] py-12">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 space-y-10">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#ffb95f] uppercase tracking-wider">
              ADVERSARIAL RED TEAM DIRECTORY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a]">
              UPDATED MARCH 2025
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#dfe2ed]">
            Attack Topologies &amp; Interception Benchmarks
          </h1>
          <p className="font-['Inter'] text-sm text-[#bbcabf] max-w-3xl mt-2 leading-relaxed">
            Examine how generative video models, real-time deepfake swappers, virtual camera pipelines, and relay farms attempt to bypass liveness gates—and the mathematical mechanisms defeating them.
          </p>
        </div>

        {/* Interactive Lab View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Attack list (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {ATTACK_VECTORS.map((attack) => {
              const isSelected = attack.id === selectedAttack;
              return (
                <div
                  key={attack.id}
                  onClick={() => {
                    setSelectedAttack(attack.id);
                    setSimResult(null);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c2027] border-[#ffb95f] shadow-[0_0_16px_rgba(255,185,95,0.15)]'
                      : 'bg-[#181c23] border-[#262a32] hover:bg-[#1c2027]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-['JetBrains_Mono'] text-[11px] font-bold px-2 py-0.5 rounded bg-[#93000a]/40 text-[#ffb4ab]">
                      {attack.letter}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#4edea3] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {attack.status}
                    </span>
                  </div>

                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed]">
                    {attack.title}
                  </h3>

                  <p className="font-['Inter'] text-xs text-[#86948a] mt-1 line-clamp-2">
                    {attack.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Inspection & Simulation Box (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c2027] border border-[#31353d] p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262a32] mb-6">
                <div>
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ffb95f] uppercase tracking-wider">
                    {currentAttack.letter} • {currentAttack.severity} SEVERITY
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#dfe2ed] mt-1">
                    {currentAttack.title}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                    EMPIRICAL BYPASS
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#4edea3]">
                    {currentAttack.bypassRate}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#dfe2ed] mb-1">
                    Threat Vector Anatomy
                  </h4>
                  <p className="font-['Inter'] text-xs text-[#bbcabf] leading-relaxed">
                    {currentAttack.description} In conventional selfie verification systems, the attacker can replay recorded 4K footage or inject modified frames via OBS virtual camera bridges without triggering traditional static blink tests.
                  </p>
                </div>

                <div className="p-4 bg-[#181c23] border border-[#262a32] rounded-xl">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#4cd7f6] uppercase font-bold block mb-1">
                    REACT-ID DEFENSE FORMULATION
                  </span>
                  <p className="font-['Inter'] text-xs text-[#dfe2ed] leading-relaxed">
                    {currentAttack.defenseVector}
                  </p>
                </div>

                {/* Simulation Output Area */}
                <div className="p-4 bg-[#0a0e15] border border-[#262a32] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['JetBrains_Mono'] text-xs text-[#86948a] uppercase">
                      INTERACTION SANDBOX SIMULATOR
                    </span>
                    <button
                      onClick={handleRunSimulation}
                      disabled={simulating}
                      className="px-3 py-1 bg-[#262a32] hover:bg-[#31353d] text-[#ffb95f] border border-[#3c4a42] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Zap className={`w-3 h-3 ${simulating ? 'animate-bounce' : ''}`} />
                      <span>{simulating ? 'Analyzing Injections...' : 'Simulate Attack Injection'}</span>
                    </button>
                  </div>

                  {simulating && (
                    <div className="py-4 text-center">
                      <div className="w-6 h-6 border-2 border-[#ffb95f] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <span className="font-['JetBrains_Mono'] text-xs text-[#bbcabf]">
                        Simulating adversarial payload against temporal challenge seed...
                      </span>
                    </div>
                  )}

                  {simResult === 'INTERCEPTED' && !simulating && (
                    <div className="p-3 bg-[#93000a]/25 border border-[#ffb4ab]/40 rounded text-xs space-y-1 text-[#ffdad6]">
                      <div className="flex items-center gap-1.5 font-bold font-['JetBrains_Mono'] text-[#ffb4ab]">
                        <ShieldAlert className="w-4 h-4" />
                        <span>ATTACK INTERCEPTED • CODE: ANOMALY_T_DECOUPLE</span>
                      </div>
                      <p className="font-['Inter'] text-[11px] text-[#bbcabf]">
                        The synthetic frame injection failed temporal cross-consistency check. Observed latency: 890ms (exceeds human involuntary threshold: 240ms).
                      </p>
                    </div>
                  )}

                  {!simulating && !simResult && (
                    <div className="py-3 text-center text-[#86948a] font-['JetBrains_Mono'] text-xs">
                      Click "Simulate Attack Injection" to execute a live test against this topology.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#262a32] text-xs font-['Inter'] text-[#86948a]">
              <span>Compliance: ISO/IEC 30107-3 Level 2 Defeated</span>
              <span className="text-[#4edea3]">100% Client-Side Detection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
