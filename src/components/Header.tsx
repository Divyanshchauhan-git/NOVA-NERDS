import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Wifi, 
  WifiOff, 
  Zap, 
  RefreshCw, 
  Clock,
  Radio,
  BookOpen,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

interface HeaderProps {
  onOpenAIModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAIModal }) => {
  const { 
    systemStats, 
    isScenarioRunning, 
    scenarioStage,
    isTelecomOutage, 
    runFloodScenario, 
    resetScenario, 
    toggleTelecomOutage,
    isOnline,
    toggleOnlineOffline,
    syncState,
    pendingSyncCount,
    lastSyncTime,
    syncNow,
    isDemoMode,
    toggleDemoMode,
    setIsHowToUseOpen,
    setActiveHelpTopic
  } = useCommand();

  const stages = ['NORMAL', 'WATCH', 'ESCALATING', 'CRITICAL', 'EMERGENCY'] as const;

  return (
    <header className="bg-[#080d16] border-b border-slate-800/90 px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20">
      {/* Title & Emergency Status */}
      <div className="flex items-center space-x-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base md:text-lg font-black tracking-tight text-white font-display uppercase">
              MERIDIAN FLOOD COMMAND
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
              LIVE EOC
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span className="text-slate-200 font-semibold">{systemStats.simulatedDate} • {systemStats.simulatedTime}</span>
            </span>
          </div>
        </div>

        {/* Demo Scenario Indicator if active */}
        {isDemoMode && (
          <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-500/50 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-300 uppercase">
              DEMO SCENARIO
            </span>
            <span className="text-slate-500 text-[10px]">|</span>
            <span className="text-[10px] font-mono font-bold text-amber-300">
              STAGE: {scenarioStage}
            </span>
          </div>
        )}
      </div>

      {/* Center/Right Telemetry & Persistent System Indicators */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* PERSISTENT OFFLINE / ONLINE SYSTEM INDICATOR (Requirement 1 & 2) */}
        <div 
          onClick={toggleOnlineOffline}
          title="Click to toggle simulated online/offline network state"
          className={`cursor-pointer px-3 py-1.5 rounded-lg border text-xs font-mono select-none transition-all shadow-md ${
            syncState === 'RESTORING'
              ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 animate-pulse'
              : syncState === 'SYNCED_NOTIFICATION'
              ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200'
              : !isOnline || syncState === 'LOCAL_MODE'
              ? 'bg-amber-950/90 border-amber-500/70 text-amber-300 hover:border-amber-400'
              : 'bg-slate-900/90 border-emerald-500/50 text-emerald-300 hover:border-emerald-400'
          }`}
        >
          {syncState === 'RESTORING' ? (
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
              <div className="leading-tight">
                <div className="font-black text-[10px] uppercase tracking-wider text-cyan-300">
                  SYNC RESTORED
                </div>
                <div className="text-[9px] text-cyan-400/80">
                  Pending: {pendingSyncCount} • Syncing...
                </div>
              </div>
            </div>
          ) : syncState === 'SYNCED_NOTIFICATION' ? (
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <div className="leading-tight">
                <div className="font-black text-[10px] uppercase tracking-wider text-emerald-300">
                  ALL DATA SYNCHRONIZED
                </div>
                <div className="text-[9px] text-emerald-400/80">
                  Last: {lastSyncTime}
                </div>
              </div>
            </div>
          ) : !isOnline || syncState === 'LOCAL_MODE' ? (
            <div className="flex items-center space-x-2">
              <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <div className="leading-tight">
                <div className="font-black text-[11px] uppercase tracking-wider text-amber-300">
                  OFFLINE
                </div>
                <div className="text-[9px] text-amber-400/90 font-bold">
                  LOCAL MODE
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <div className="leading-tight">
                <div className="font-black text-[11px] uppercase tracking-wider text-emerald-300">
                  ONLINE
                </div>
                <div className="text-[9px] text-emerald-400/90 font-bold">
                  SYNCED
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LoRa Mesh Radio Telemetry */}
        <div className="hidden md:flex px-2.5 py-1 rounded border bg-slate-900/90 border-slate-800 text-slate-300 text-[11px] font-mono items-center space-x-1.5">
          <Radio className="w-3 h-3 text-indigo-400" />
          <span className="text-slate-400 text-[9px]">LORA:</span>
          <span className="font-bold text-indigo-300">48/48</span>
        </div>

        {/* PROMINENT "HOW TO USE" BUTTON & ? HELP (Requirement 8) */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsHowToUseOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold tracking-wider uppercase border border-cyan-400 shadow-md shadow-cyan-950 transition-all active:scale-95"
            title="Open 10-step operator quick start guide"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>HOW TO USE</span>
          </button>

          <button
            onClick={() => setActiveHelpTopic('quick-guide')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
            title="Help on Emergency Response concepts"
            aria-label="Context Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* DEMO MODE TOGGLE (Requirement 11) */}
        <button
          onClick={toggleDemoMode}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-mono border transition-all ${
            isDemoMode
              ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300 font-bold shadow-xs'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle Demo Mode highlights and guidance"
        >
          {isDemoMode ? (
            <ToggleRight className="w-4 h-4 text-indigo-400" />
          ) : (
            <ToggleLeft className="w-4 h-4 text-slate-500" />
          )}
          <span className="text-[10px] tracking-wider uppercase">DEMO MODE</span>
        </button>

        {/* SCENARIO ACTION CONTROLS */}
        <div className="flex items-center space-x-1.5 pl-1.5 border-l border-slate-800">
          <button
            onClick={runFloodScenario}
            disabled={isScenarioRunning}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md ${
              isScenarioRunning
                ? 'bg-rose-950/80 text-rose-300 border border-rose-700 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 shadow-rose-900/40 hover:shadow-rose-600/30 active:scale-95'
            }`}
            title="Simulate worsening flood conditions (NORMAL → WATCH → ESCALATING → CRITICAL → EMERGENCY)"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${!isScenarioRunning ? 'animate-pulse' : ''}`} />
            <span>{isScenarioRunning ? 'SCENARIO ACTIVE' : 'RUN FLOOD SCENARIO'}</span>
          </button>

          <button
            onClick={resetScenario}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Reset simulation to initial baseline conditions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>

          {onOpenAIModal && (
            <button
              onClick={onOpenAIModal}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-mono font-bold uppercase bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white border border-cyan-400 shadow-md shadow-cyan-900/30 transition-all active:scale-95"
              title="Open AI Response Copilot"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping"></span>
              <span>AI COPILOT</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

