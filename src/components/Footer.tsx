import React from 'react';
import { ShieldCheck, Shield, Lock, Activity } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenWhitepaper: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenWhitepaper }) => {
  return (
    <footer className="w-full bg-[#0a0e15] border-t border-[#1c2027] py-10">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col gap-6">
        {/* Upper Status & Cryptographic Badges */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#181c23]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#181c23] px-3 py-1.5 rounded border border-[#262a32]">
              <ShieldCheck className="w-4 h-4 text-[#4cd7f6]" />
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#dfe2ed] uppercase tracking-wider font-medium">
                ED25519 CRYPTOGRAPHIC AUDIT VERIFIED
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#181c23] px-3 py-1.5 rounded border border-[#262a32]">
              <Shield className="w-4 h-4 text-[#86948a]" />
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbcabf] uppercase tracking-wider font-medium">
                ZERO EMOTIONAL PROFILING COMPLIANT
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#181c23] px-3 py-1.5 rounded border border-[#262a32]">
              <Lock className="w-4 h-4 text-[#86948a]" />
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbcabf] uppercase tracking-wider font-medium">
                PRIVACY ARCHITECTURE: ZERO-KNOWLEDGE LIVENESS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#181c23] px-3 py-1.5 rounded border border-[#262a32]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] uppercase tracking-wider font-medium">
              NETWORK: 14 NODES ACTIVE
            </span>
          </div>
        </div>

        {/* Lower Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-['Inter'] text-xs text-[#86948a]">
              © 2025 REACT-ID Inc. Autonomous Cryptographic Human Presence Infrastructure.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('developer-api-sdk')}
              className="font-['Inter'] text-xs text-[#bbcabf] hover:text-[#4edea3] transition-colors cursor-pointer"
            >
              API References
            </button>
            <button
              onClick={onOpenWhitepaper}
              className="font-['Inter'] text-xs text-[#bbcabf] hover:text-[#4edea3] transition-colors cursor-pointer"
            >
              Security Whitepaper
            </button>
            <button
              onClick={() => onNavigate('attack-matrix')}
              className="font-['Inter'] text-xs text-[#bbcabf] hover:text-[#4edea3] transition-colors cursor-pointer"
            >
              Threat Intelligence
            </button>
            <button
              onClick={() => onNavigate('research-red-team')}
              className="font-['Inter'] text-xs text-[#bbcabf] hover:text-[#4edea3] transition-colors cursor-pointer"
            >
              Red Team Disclosures
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
