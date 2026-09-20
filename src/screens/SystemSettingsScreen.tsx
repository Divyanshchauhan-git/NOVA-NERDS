import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Radio, 
  Sliders, 
  RotateCcw, 
  Download, 
  Lock, 
  CheckCircle2, 
  Cpu,
  Terminal,
  Database,
  Volume2
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const SystemSettingsScreen: React.FC = () => {
  const { isScenarioRunning, runFloodScenario, resetSimulation, addAlert } = useCommand();

  const [meshMode, setMeshMode] = useState('P2P_MESH');
  const [pumpThreshold, setPumpThreshold] = useState(2.2);
  const [loraInterval, setLoraInterval] = useState(5);
  const [sirenVolume, setSirenVolume] = useState(95);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    addAlert('EOC System Configuration updated successfully.', 'STANDARD', 'Citywide');
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const exportTelemetry = () => {
    const data = {
      platform: "MERIDIAN FLOOD COMMAND",
      version: "3.4.1-PROD",
      timestamp: new Date().toISOString(),
      eocStation: "Meridian EOC Terminal Alpha-04",
      encryption: "AES-256-GCM / Hardware Token Enforced",
      networkStatus: "LoRa 868MHz Mesh Active",
      readinessIndex: 0.872
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meridian-eoc-telemetry-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="p-5 space-y-5">
      {/* Top Banner */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-slate-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              EOC PLATFORM CONFIGURATION & SYSTEM SETTINGS
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Operational thresholds, sub-GHz transmission parameters, and mutual-aid cryptographic session controls
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-bold flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>SESSION: AES-256 ENCRYPTED</span>
          </span>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>System configuration parameters committed to decentralized LoRa nodes!</span>
        </div>
      )}

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Section 1: Autonomous Hydrology & Pump Interlocks */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>AUTOMATED DRAINAGE INTERLOCKS</span>
          </h2>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Autonomous Pump Trigger Depth Threshold:</span>
                <strong className="text-amber-400">{pumpThreshold} meters</strong>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.5"
                step="0.1"
                value={pumpThreshold}
                onChange={(e) => setPumpThreshold(parseFloat(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                When float gauge exceeds this depth, solar battery submersible pumps activate without manual dispatch.
              </span>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <label className="text-slate-300 block mb-1.5">Sensing Mesh Protocol:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMeshMode('P2P_MESH')}
                  className={`p-2.5 rounded text-left border ${
                    meshMode === 'P2P_MESH' 
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' 
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="block font-bold">P2P Decentralized Mesh</span>
                  <span className="text-[10px] opacity-80 block">Zero central server dependency</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMeshMode('STAR_GATEWAY')}
                  className={`p-2.5 rounded text-left border ${
                    meshMode === 'STAR_GATEWAY' 
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold' 
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="block font-bold">Star Gateway Repeater</span>
                  <span className="text-[10px] opacity-80 block">High throughput star routing</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex justify-between text-slate-300 mb-1">
                <span>LoRa Node Heartbeat Polling Frequency:</span>
                <strong className="text-cyan-400">{loraInterval} seconds</strong>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={loraInterval}
                onChange={(e) => setLoraInterval(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Civil Siren & Scenario Simulation */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-rose-500" />
              <span>CIVIL ALARM & SIMULATION CONTROLS</span>
            </h2>

            <div className="space-y-4 text-xs font-mono mt-4">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Acoustic Siren Decibel Output:</span>
                  <strong className="text-rose-400">{sirenVolume} dB (1.5km Radius)</strong>
                </div>
                <input
                  type="range"
                  min="70"
                  max="130"
                  step="5"
                  value={sirenVolume}
                  onChange={(e) => setSirenVolume(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-800"
                />
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-slate-300 block mb-2 font-bold">
                  SCENARIO SIMULATION ENGINE:
                </span>
                <div className="flex space-x-3">
                  <button
                    onClick={runFloodScenario}
                    className="flex-1 py-2 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors"
                  >
                    RUN FLOOD ESCALATION (SIM-01)
                  </button>

                  <button
                    onClick={resetSimulation}
                    className="flex-1 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESET TO BASELINE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider transition-colors shadow-md text-xs font-mono"
            >
              SAVE CONFIGURATION PRESETS
            </button>

            <button
              onClick={exportTelemetry}
              className="px-4 py-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Hardware Profile Footer */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>EOC STATION #04 • OPERATOR: DEPUTY DISASTER COMMISSIONER</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <span>CPU LOAD: 14%</span>
          <span>MESH NODES ONLINE: 5/5</span>
          <span>UPTIME: 99.98%</span>
        </div>
      </div>
    </div>
  );
};
