import React from 'react';
import { 
  Video, 
  Cpu, 
  Lock, 
  CloudCheck, 
  ShieldCheck, 
  Check, 
  Accessibility,
  HeartHandshake
} from 'lucide-react';

export const PrivacySection: React.FC = () => {
  const pipelineSteps = [
    {
      num: '1',
      title: 'Camera Feed',
      desc: 'Isolated client device',
      icon: Video,
      color: '#4cd7f6',
    },
    {
      num: '2',
      title: 'WASM Extraction',
      desc: 'Landmark temporal shifts',
      icon: Cpu,
      color: '#4edea3',
    },
    {
      num: '3',
      title: 'Ephemeral Vectors',
      desc: 'No pixels or video saved',
      icon: Lock,
      color: '#ffb95f',
    },
    {
      num: '4',
      title: 'Decision Server',
      desc: 'Zero-knowledge match',
      icon: CloudCheck,
      color: '#4cd7f6',
    },
    {
      num: '5',
      title: 'Low-Risk Token',
      desc: 'Signed Ed25519 JWT',
      icon: ShieldCheck,
      color: '#4edea3',
    },
  ];

  return (
    <section className="w-full bg-[#0f131b] py-16 border-b border-[#1c2027]">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4edea3] uppercase tracking-wider">
            PRIVACY-BY-DESIGN COMPLIANCE
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-semibold text-[#dfe2ed] mt-1.5">
            Zero Video Storage. Zero Emotion Profiling.
          </h2>
          <p className="font-['Inter'] text-sm text-[#bbcabf] mt-2 leading-relaxed">
            Unlike invasive surveillance biometrics, REACT-ID extracts mathematical vectors at the client edge and instantly purges them. We measure temporal physics, not who you are or how you feel.
          </p>
        </div>

        {/* Architectural Data-Flow Diagram */}
        <div className="bg-[#1c2027] border border-[#262a32] p-6 rounded-xl mb-8 shadow-md">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a] block text-center mb-6 uppercase tracking-wider font-semibold">
            CRYPTOGRAPHIC PIPELINE ARCHITECTURE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {pipelineSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-4 bg-[#262a32] border border-[#3c4a42]/50 hover:border-[#4cd7f6]/40 rounded text-center transition-all group"
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#181c23] flex items-center justify-center mb-2.5 shadow-inner">
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[#dfe2ed] block">
                    {step.num}. {step.title}
                  </span>
                  <span className="font-['Inter'] text-xs text-[#86948a] block mt-0.5">
                    {step.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guarantees Grid & Inclusive Accessibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ethical Guarantees */}
          <div className="p-6 bg-[#1c2027] border border-[#262a32] rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#dfe2ed] mb-4">
                Our Four Core Ethical Guarantees
              </h3>
              <ul className="space-y-3 font-['Inter'] text-xs text-[#bbcabf] leading-relaxed">
                <li className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#10b981]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#4edea3]" />
                  </div>
                  <span>
                    <strong className="text-[#dfe2ed]">Zero raw video uploaded or retained:</strong> Frames never leave user browser memory. All processing completes locally in volatile WebAssembly heaps.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#10b981]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#4edea3]" />
                  </div>
                  <span>
                    <strong className="text-[#dfe2ed]">No emotion profiling or classification:</strong> Does not classify happiness, anger, or mood. We evaluate involuntary physical latency only.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#10b981]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#4edea3]" />
                  </div>
                  <span>
                    <strong className="text-[#dfe2ed]">No persistent facial identity templates:</strong> Does not compare with past facial databases; eliminates facial recognition biometric liabilities.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#10b981]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#4edea3]" />
                  </div>
                  <span>
                    <strong className="text-[#dfe2ed]">GDPR, CCPA &amp; BIPA compliant:</strong> Clean cryptographic posture satisfies stringent European and US biometric laws without cumbersome consents.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Inclusive Accessibility */}
          <div className="p-6 bg-[#1c2027] border border-[#262a32] rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#4cd7f6] mb-3">
                <Accessibility className="w-5 h-5 text-[#4cd7f6]" />
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#dfe2ed]">
                  Universal Inclusive Accessibility
                </h3>
              </div>
              <p className="font-['Inter'] text-xs text-[#bbcabf] mb-4 leading-relaxed">
                Presence verification must never disenfranchise users with disabilities. REACT-ID includes automated zero-friction fallbacks:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-[#181c23] border border-[#262a32] rounded">
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[#dfe2ed] block">
                    Facial Paralysis &amp; Asymmetry Support
                  </span>
                  <span className="font-['Inter'] text-xs text-[#86948a] block mt-0.5 leading-relaxed">
                    Automatically prioritizes ocular and micro-head-pose channels if orbital mobility is absent.
                  </span>
                </div>

                <div className="p-3 bg-[#181c23] border border-[#262a32] rounded">
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[#dfe2ed] block">
                    Assistive Keyboard &amp; Audio Modality
                  </span>
                  <span className="font-['Inter'] text-xs text-[#86948a] block mt-0.5 leading-relaxed">
                    Alternative sound-frequency and keystroke-delay temporal synchronization for screen-reader users.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
