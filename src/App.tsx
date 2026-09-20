import React, { useState } from 'react';
import { CommandProvider, useCommand } from './context/CommandContext';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { AssetDetailModal } from './components/AssetDetailModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { HowToUseModal } from './components/HowToUseModal';
import { FirstTimeOverlay } from './components/FirstTimeOverlay';
import { ContextHelpModal } from './components/ContextHelpModal';

// Screens
import { CommandCenterScreen } from './screens/CommandCenterScreen';
import { FloodMapScreen } from './screens/FloodMapScreen';
import { FloodImageAnalysisScreen } from './screens/FloodImageAnalysisScreen';
import { NeighbourhoodsScreen } from './screens/NeighbourhoodsScreen';
import { InfrastructureScreen } from './screens/InfrastructureScreen';
import { PeopleSheltersScreen } from './screens/PeopleSheltersScreen';
import { PowerUtilitiesScreen } from './screens/PowerUtilitiesScreen';
import { MobilityScreen } from './screens/MobilityScreen';
import { EnvironmentScreen } from './screens/EnvironmentScreen';
import { SensingCommsScreen } from './screens/SensingCommsScreen';
import { BudgetDeploymentScreen } from './screens/BudgetDeploymentScreen';
import { AlertsScreen } from './screens/AlertsScreen';
import { SystemSettingsScreen } from './screens/SystemSettingsScreen';

const MainAppLayout: React.FC = () => {
  const { currentScreen, isDemoMode } = useCommand();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'command-center':
        return <CommandCenterScreen />;
      case 'flood-map':
        return <FloodMapScreen />;
      case 'image-analysis':
        return <FloodImageAnalysisScreen />;
      case 'neighbourhoods':
        return <NeighbourhoodsScreen />;
      case 'infrastructure':
        return <InfrastructureScreen />;
      case 'people-shelters':
        return <PeopleSheltersScreen />;
      case 'power-utilities':
        return <PowerUtilitiesScreen />;
      case 'mobility':
        return <MobilityScreen />;
      case 'environment':
        return <EnvironmentScreen />;
      case 'sensing-comms':
        return <SensingCommsScreen />;
      case 'budget-deployment':
        return <BudgetDeploymentScreen />;
      case 'alerts':
        return <AlertsScreen />;
      case 'settings':
        return <SystemSettingsScreen />;
      default:
        return <CommandCenterScreen />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060a12] text-slate-100 font-sans select-none">
      {/* Persistent Left Navigation Sidebar */}
      <Navigation />

      {/* Main Operations Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Telemetry & Scenario Header */}
        <Header onOpenAIModal={() => setIsAIModalOpen(true)} />

        {/* Dynamic Screen View with Custom Emergency Scrollbar */}
        <main className="flex-1 overflow-y-auto bg-[#070c16]">
          {renderScreen()}
        </main>

        {/* Mandatory Operational Disclosure Footer (Requirement 12) */}
        <footer className="px-4 py-1.5 bg-[#05080e] border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2 select-none z-10">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>
              Meridian Flood Command is a prototype decision-support system using simulated operational data. AI predictions and image assessments are illustrative and require human verification.
            </span>
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            OFFLINE-READY PWA • LOCAL FIRST ENGINE
          </div>
        </footer>
      </div>

      {/* Global Slide-over Modal for Asset Inspection & Controls */}
      <AssetDetailModal />

      {/* Global Gemini AI Assistant Modal (Chatbot, Situation Appraisal, 4K Drone Recon) */}
      <AIAssistantModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />

      {/* Operator Quick Guide Modal */}
      <HowToUseModal />

      {/* Contextual Concept Help Modal */}
      <ContextHelpModal />

      {/* First-Time User Onboarding Overlay */}
      <FirstTimeOverlay />
    </div>
  );
};

export default function App() {
  return (
    <CommandProvider>
      <MainAppLayout />
    </CommandProvider>
  );
}
