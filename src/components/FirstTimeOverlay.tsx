import React from 'react';
import { Eye, TrendingUp, Send, CheckSquare, ArrowRight, ShieldAlert, Sparkles, Wifi } from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const FirstTimeOverlay: React.FC = () => {
  const { isFirstTimeUser, dismissFirstTimeOverlay } = useCommand();

  if (!isFirstTimeUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-2xl bg-[#090d18] border-2 border-rose-600/60 rounded-2xl shadow-2xl p-6 md:p-8 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-rose-600/20 blur-3xl pointer-events-none"></div>

        {/* Header Badge & Title */}
        <div className="text-center space-y-2 mb-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>MUNICIPAL EMERGENCY OPERATIONS SYSTEM</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white uppercase">
            WELCOME TO MERIDIAN FLOOD COMMAND
          </h1>

          <p className="text-sm md:text-base text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
            Citywide flood monitoring and emergency-response decision support.
          </p>
        </div>

        {/* Four Guided Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 relative z-10">
          {/* Card 1: MONITOR */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-500/50 flex items-center justify-center text-blue-400">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-blue-400 uppercase">
                MONITOR
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              See city conditions across 3 municipal sectors, tracking water level sensors, rain gauges, and pump status.
            </p>
          </div>

          {/* Card 2: PREDICT */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-indigo-400 uppercase">
                PREDICT
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Use ML and AI forecasts for 3-hour flood depth curves, shelter surge headroom, and offline risk scoring.
            </p>
          </div>

          {/* Card 3: RESPOND */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <Send className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-amber-400 uppercase">
                RESPOND
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Deploy resources including rescue boats, mobile solar pump skids, pontoon walkways, and medical units.
            </p>
          </div>

          {/* Card 4: VERIFY */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckSquare className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-emerald-400 uppercase">
                VERIFY
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Keep humans in control. Every AI image assessment and dispatch suggestion requires operator verification.
            </p>
          </div>
        </div>

        {/* Offline Architecture Callout */}
        <div className="mb-8 p-3 rounded-lg bg-[#060a12] border border-cyan-900/60 flex items-center space-x-3 text-xs font-mono text-cyan-300/90">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></div>
          <span>
            Offline-First enabled: Full GIS maps, local ML models, and simulation run 100% locally without cloud dependency.
          </span>
        </div>

        {/* Main CTA Button */}
        <div className="text-center relative z-10">
          <button
            onClick={dismissFirstTimeOverlay}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-3 mx-auto shadow-xl shadow-rose-950/60 border border-rose-400 active:scale-98 transition-all"
          >
            <span>START COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
