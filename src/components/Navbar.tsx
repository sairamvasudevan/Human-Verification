import React, { useState } from 'react';
import { ShieldCheck, Terminal, Menu, X, Play, User } from 'lucide-react';
import { ActiveTab } from '../types';
import { BRAND_LOGO_URL } from '../data/mockData';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenLiveSandbox: () => void;
  onOpenDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenLiveSandbox,
  onOpenDocs,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'live-verification-demo', label: 'Live Verification Demo' },
    { id: 'architecture-signals', label: 'Architecture & Signals' },
    { id: 'attack-matrix', label: 'Attack Matrix' },
    { id: 'developer-api-sdk', label: 'Developer API & SDK' },
    { id: 'enterprise-dashboard', label: 'Enterprise Dashboard' },
    { id: 'research-red-team', label: 'Research & Red Team' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f131b]/85 backdrop-blur-xl border-b border-[#31353d]/50 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-16 w-full max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Logo & Brand Title */}
        <button
          onClick={() => {
            setActiveTab('live-verification-demo');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 shrink-0 text-left cursor-pointer group"
        >
          <img
            src={BRAND_LOGO_URL}
            alt="REACT-ID Brand Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex items-center gap-2">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#dfe2ed] group-hover:text-[#4edea3] transition-colors">
              REACT-ID
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-semibold bg-[#262a32] text-[#4cd7f6] px-2 py-0.5 rounded uppercase tracking-wider">
              HUMAN PRESENCE API
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 font-['Inter'] text-[13px] rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#31353d] text-[#4edea3] font-semibold shadow-inner'
                    : 'text-[#bbcabf] hover:text-[#dfe2ed] hover:bg-[#1c2027]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Sandbox Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDocs}
            className="hidden sm:inline-flex items-center px-3 py-1.5 font-['Inter'] text-[13px] text-[#dfe2ed] hover:bg-[#1c2027] rounded-lg transition-all cursor-pointer"
          >
            API Docs
          </button>

          <button
            onClick={onOpenLiveSandbox}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#10b981] text-[#00422b] font-['Plus_Jakarta_Sans'] font-semibold text-xs rounded shadow-[0_0_16px_rgba(16,185,129,0.35)] hover:bg-[#4edea3] transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#00422b] animate-pulse"></span>
            <span>Start Sandbox Verification</span>
          </button>

          <div
            title="Active Session Operator"
            className="w-8 h-8 rounded-full bg-[#4edea3] flex items-center justify-center shrink-0 shadow-sm"
          >
            <User className="w-4 h-4 text-[#003824]" />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg text-[#bbcabf] hover:text-[#dfe2ed] hover:bg-[#1c2027]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0f131b]/98 border-b border-[#31353d] px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-[#31353d] text-[#4edea3] font-semibold'
                  : 'text-[#bbcabf] hover:bg-[#1c2027] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#262a32] flex gap-2">
            <button
              onClick={() => {
                onOpenDocs();
                setMobileMenuOpen(false);
              }}
              className="w-1/2 py-2 text-xs text-center rounded bg-[#1c2027] text-[#dfe2ed]"
            >
              API Docs
            </button>
            <button
              onClick={() => {
                onOpenLiveSandbox();
                setMobileMenuOpen(false);
              }}
              className="w-1/2 py-2 text-xs font-semibold text-center rounded bg-[#10b981] text-[#00422b]"
            >
              Start Sandbox
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
