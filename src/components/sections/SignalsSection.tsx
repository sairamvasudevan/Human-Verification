import React, { useState, useEffect } from 'react';
import { Brain, ShieldCheck, Activity, Cpu } from 'lucide-react';

export const SignalsSection: React.FC = () => {
  const [signals, setSignals] = useState([
    { label: 'Facial Landmark Velocity', coherence: 0.88, percent: 88, color: '#4edea3' },
    { label: 'Head Pose Kinetic Deceleration', coherence: 0.81, percent: 81, color: '#4cd7f6' },
    { label: 'Pointer Micro-Correction Latency', coherence: 0.74, percent: 74, color: '#4edea3' },
    { label: 'Biological Temporal Plausibility', coherence: 0.95, percent: 95, color: '#4edea3' },
    { label: 'Audiovisual Stimulus Phase Coupling', coherence: 0.92, percent: 92, color: '#4cd7f6' },
  ]);

  // Subtle live pulse of signals
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prev) =>
        prev.map((s) => {
          const delta = (Math.random() * 0.04 - 0.02);
          const newCoherence = Math.min(0.99, Math.max(0.65, Number((s.coherence + delta).toFixed(2))));
          return {
            ...s,
            coherence: newCoherence,
            percent: Math.round(newCoherence * 100),
          };
        })
      );
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#0a0e15] py-16 border-b border-[#1c2027]">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Explanatory Context (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
              CROSS-MODAL MATHEMATICS
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-semibold text-[#dfe2ed]">
              Multi-Signal Cross-Consistency
            </h2>
            <p className="font-['Inter'] text-sm text-[#bbcabf] leading-relaxed">
              Synthetic avatars and remote deepfake generators rely on isolated computational pipelines. They can produce plausible ocular imagery or speech, but they collapse when required to synchronously correlate multi-channel temporal physics.
            </p>

            {/* Core Callout Box */}
            <div className="p-4 rounded-lg bg-[#262a32] border border-[#3c4a42] shadow-md">
              <div className="flex items-center gap-2 text-[#4edea3] mb-2">
                <Brain className="w-5 h-5 text-[#4edea3]" />
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold">
                  Why Deepfakes Fail
                </span>
              </div>
              <p className="font-['Inter'] text-xs text-[#dfe2ed] leading-relaxed italic">
                "An AI model or remote puppeteer can generate a face or voice, but cannot spontaneously predict and temporally coordinate 5 independent physiological and kinetic signals within a 220ms window."
              </p>
            </div>

            {/* Aggregate Confidence Banner */}
            <div className="flex items-center justify-between p-4 bg-[#1c2027] border border-[#262a32] rounded-lg">
              <div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                  AGGREGATE CROSS-CONSISTENCY
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#4edea3]">
                  0.96 • RISK BAND: LOW
                </span>
              </div>
              <ShieldCheck className="w-9 h-9 text-[#4edea3]" />
            </div>
          </div>

          {/* Radar & Signals Visualizer (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c2027] border border-[#31353d] p-6 rounded-xl shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a] uppercase tracking-wider font-semibold">
                5-SIGNAL COHERENCE TELEMETRY
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6] font-medium">
                SAMPLE WINDOW: 350ms
              </span>
            </div>

            {/* Telemetry Bars */}
            <div className="space-y-4">
              {signals.map((sig, i) => (
                <div key={i}>
                  <div className="flex justify-between font-['JetBrains_Mono'] text-xs mb-1.5">
                    <span className="text-[#dfe2ed]">{sig.label}</span>
                    <span className="font-bold" style={{ color: sig.color }}>
                      +{sig.coherence} Coherence
                    </span>
                  </div>
                  <div className="w-full bg-[#181c23] border border-[#262a32] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${sig.percent}%`,
                        backgroundColor: sig.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Micro Sensor Visual Representation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[#181c23] border border-[#262a32] rounded text-center">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                  PHASE DELTA
                </span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#dfe2ed] font-bold">
                  ≤ 18ms
                </span>
              </div>

              <div className="p-3 bg-[#181c23] border border-[#262a32] rounded text-center">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                  SACCADE SYNC
                </span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#4edea3] font-bold">
                  MATCHED
                </span>
              </div>

              <div className="p-3 bg-[#181c23] border border-[#262a32] rounded text-center col-span-2 sm:col-span-1">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block">
                  ENTROPY FACTOR
                </span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#4cd7f6] font-bold">
                  9.42 bits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
