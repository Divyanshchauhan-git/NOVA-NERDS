import React from 'react';
import { 
  X, 
  Battery, 
  Activity, 
  Clock, 
  Users, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  Wrench, 
  Play, 
  Power, 
  Radio, 
  Send,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const AssetDetailModal: React.FC = () => {
  const { selectedAsset, setSelectedAsset, togglePump, deployResource } = useCommand();

  if (!selectedAsset) return null;

  const isPump = selectedAsset.category === 'Solar-battery submersible pump';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#0d131f] border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div>
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#080d16]">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {selectedAsset.id}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedAsset.category}
              </span>
            </div>
            <button 
              onClick={() => setSelectedAsset(null)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Asset Title & Status */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  {selectedAsset.name}
                </h2>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{selectedAsset.location} • <strong className="text-slate-300">{selectedAsset.neighbourhood}</strong></span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider border ${
                selectedAsset.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                selectedAsset.status === 'Deployed' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                selectedAsset.status === 'Warning' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}>
                {selectedAsset.status}
              </span>
            </div>

            {/* Quick KPI stats */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800">
                <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>OPERATIONAL CAPACITY</span>
                </div>
                <div className="text-sm font-bold text-white font-mono mt-1">
                  {selectedAsset.capacity}
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900/80 border border-slate-800">
                <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                  <span>POWER / FUEL RESERVES</span>
                </div>
                <div className="text-sm font-bold text-emerald-300 font-mono mt-1">
                  {selectedAsset.batteryFuel}
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry & Technical Specs */}
          <div className="p-6 space-y-5">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Telemetry & Health</span>
              </h3>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs p-2.5 rounded bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400">Primary Output Metric</span>
                  <span className="font-mono font-bold text-slate-200">{selectedAsset.telemetry.primaryMetric}</span>
                </div>

                <div className="flex justify-between items-center text-xs p-2.5 rounded bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400">Secondary Operating Metric</span>
                  <span className="font-mono font-semibold text-slate-300">{selectedAsset.telemetry.secondaryMetric}</span>
                </div>

                <div className="flex justify-between items-center text-xs p-2.5 rounded bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400">Continuous Runtime</span>
                  <span className="font-mono font-semibold text-slate-300">{selectedAsset.telemetry.runtimeHours} hours</span>
                </div>

                <div className="flex justify-between items-center text-xs p-2.5 rounded bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400">Hardware Health Score</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedAsset.telemetry.healthScore}% Nominal</span>
                </div>

                <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-mono text-[10px] block mb-1">FIELD LOG & OBSERVATIONS:</span>
                  <p className="text-slate-200 leading-relaxed font-sans">{selectedAsset.telemetry.notes}</p>
                </div>
              </div>
            </div>

            {/* Crew & Logistics */}
            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center space-x-2">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Assigned Response Unit</span>
              </h3>
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-200">{selectedAsset.assignedTeam}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">Last Check-in: {selectedAsset.lastUpdate}</div>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                  CONNECTED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls in Footer */}
        <div className="p-5 border-t border-slate-800 bg-[#080d16] space-y-2.5">
          {isPump && (
            <button
              onClick={() => togglePump(selectedAsset.id)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded text-xs font-mono font-bold tracking-wider uppercase transition-colors bg-amber-600 hover:bg-amber-500 text-white shadow-md"
            >
              <Power className="w-4 h-4" />
              <span>COMMAND PUMP {selectedAsset.status === 'Active' ? 'STANDBY' : 'START FULL DUTY'}</span>
            </button>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                deployResource(
                  selectedAsset.name,
                  selectedAsset.location,
                  'North Sector 3 Evac Hub',
                  'HIGH',
                  selectedAsset.assignedTeam
                );
                setSelectedAsset(null);
              }}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>DISPATCH REASSIGNMENT</span>
            </button>

            <button
              onClick={() => setSelectedAsset(null)}
              className="px-4 py-2 rounded text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
