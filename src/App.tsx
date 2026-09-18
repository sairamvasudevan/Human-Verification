import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { EngineSection } from './components/sections/EngineSection';
import { ModesSection } from './components/sections/ModesSection';
import { SignalsSection } from './components/sections/SignalsSection';
import { AttackMatrixSection } from './components/sections/AttackMatrixSection';
import { DeveloperSection } from './components/sections/DeveloperSection';
import { PrivacySection } from './components/sections/PrivacySection';
import { ResearchSection } from './components/sections/ResearchSection';
import { ArchitectureView } from './components/views/ArchitectureView';
import { AttackMatrixView } from './components/views/AttackMatrixView';
import { DeveloperApiView } from './components/views/DeveloperApiView';
import { EnterpriseDashboardView } from './components/views/EnterpriseDashboardView';
import { ResearchRedTeamView } from './components/views/ResearchRedTeamView';
import { LiveVerificationModal } from './components/LiveVerificationModal';
import { WhitepaperModal } from './components/WhitepaperModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('live-verification-demo');
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState<boolean>(false);
  const [isWhitepaperModalOpen, setIsWhitepaperModalOpen] = useState<boolean>(false);

  const handleOpenSandbox = () => {
    setIsSandboxModalOpen(true);
  };

  const handleOpenDocs = () => {
    setActiveTab('developer-api-sdk');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSdk = () => {
    const el = document.getElementById('sdk-integration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('developer-api-sdk');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f131b] text-[#dfe2ed] font-['Inter'] flex flex-col selection:bg-[#10b981]/30 selection:text-[#4edea3]">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLiveSandbox={handleOpenSandbox}
        onOpenDocs={handleOpenDocs}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16">
        {activeTab === 'live-verification-demo' && (
          <>
            <HeroSection
              onLaunchDemo={handleOpenSandbox}
              onExploreSdk={handleScrollToSdk}
            />
            <EngineSection onOpenLiveModal={handleOpenSandbox} />
            <ModesSection />
            <SignalsSection />
            <AttackMatrixSection
              onSimulateAttack={(attackId) => {
                const engineElem = document.getElementById('interactive-engine');
                if (engineElem) {
                  engineElem.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
            <DeveloperSection />
            <PrivacySection />
            <ResearchSection
              onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
            />
          </>
        )}

        {activeTab === 'architecture-signals' && <ArchitectureView />}
        {activeTab === 'attack-matrix' && <AttackMatrixView />}
        {activeTab === 'developer-api-sdk' && <DeveloperApiView />}
        {activeTab === 'enterprise-dashboard' && <EnterpriseDashboardView />}
        {activeTab === 'research-red-team' && (
          <ResearchRedTeamView
            onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
          />
        )}
      </main>

      {/* Global Interactive Verification Modal */}
      <LiveVerificationModal
        isOpen={isSandboxModalOpen}
        onClose={() => setIsSandboxModalOpen(false)}
      />

      {/* Security Whitepaper Viewer Modal */}
      <WhitepaperModal
        isOpen={isWhitepaperModalOpen}
        onClose={() => setIsWhitepaperModalOpen(false)}
      />

      {/* Persistent Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
      />
    </div>
  );
}
