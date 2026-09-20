import React, { useState } from 'react';
import { 
  Waves, 
  FlaskConical, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  Sliders, 
  ArrowUpRight, 
  Layers, 
  Anchor,
  Leaf
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const EnvironmentScreen: React.FC = () => {
  const { outfalls, isScenarioRunning, addAlert } = useCommand();

  const [boomsDeployed, setBoomsDeployed] = useState(true);
  const [dosingActive, setDosingActive] = useState(false);

  const toggleBooms = () => {
    setBoomsDeployed(!boomsDeployed);
    addAlert(
      `Containment Boom Perimeter ${boomsDeployed ? 'RETRACTED' : 'DEPLOYED'} at North-East Chemical Canal.`,
      'STANDARD',
      'Central'
    );
  };

  const toggleDosing = () => {
    setDosingActive(!dosingActive);
    addAlert(
      `Outfall Chemical Coagulant & Sorbent Dosing ${!dosingActive ? 'ACTIVATED' : 'STANDBY'}.`,
      'STANDARD',
      'South'
    );
  };

  return (
    <div className="p-5 space-y-5">
      {/* Top Banner */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Waves className="w-5 h-5 text-teal-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              HYDROLOGICAL ENVIRONMENT & CONTAMINANT CONTAINMENT
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Real-time effluent monitoring across 4 regional outfall skids and chemical hazard containment zones
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">TOTAL EFFLUENT DISCHARGE</span>
            <span className="font-bold text-teal-300 text-sm">
              {outfalls.reduce((acc, o) => acc + o.flowM3h, 0).toLocaleString()} m³/hr
            </span>
          </div>
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-emerald-900/40">
            <span className="text-emerald-400 text-[10px] block">DISCHARGE COMPLIANCE</span>
            <span className="font-bold text-emerald-300 text-sm">98.4% Safe Index</span>
          </div>
        </div>
      </div>

      {/* 4 Outfalls Cards Grid */}
      <div>
        <h2 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-3">
          4 MUNICIPAL OUTFALL TREATMENT SKIDS (O-01 to O-04)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {outfalls.map((outfall) => {
            const isWarning = outfall.status === 'WARNING';
            return (
              <div 
                key={outfall.id}
                className={`p-4 rounded-lg bg-[#0b111d] border ${
                  isWarning ? 'border-amber-500/70' : 'border-slate-800'
                } flex flex-col justify-between text-xs font-mono space-y-3`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-teal-400 text-sm">{outfall.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isWarning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {outfall.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm font-sans">{outfall.name}</h3>
                  <span className="text-slate-400 text-[11px]">{outfall.location}</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Flow Rate:</span>
                    <strong className="text-white">{outfall.flowM3h.toLocaleString()} m³/hr</strong>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Turbidity:</span>
                    <strong className={outfall.turbidityNtu > 40 ? 'text-amber-400' : 'text-emerald-400'}>
                      {outfall.turbidityNtu} NTU
                    </strong>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Water pH:</span>
                    <strong className="text-cyan-300">{outfall.ph} (Neutral)</strong>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Filtration Skid:</span>
                    <span className="text-emerald-400 font-bold">{outfall.filtrationStatus}</span>
                  </div>
                </div>

                {isWarning && (
                  <div className="p-2 rounded bg-amber-950/40 border border-amber-500/40 text-[10px] text-amber-300">
                    High urban sediment load detected. Secondary centrifugal cyclone stage active.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column: Industrial Chemical Zone & Ecological Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chemical Zone & Containment Booms */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  INDUSTRIAL CHEMICAL CONTAINMENT SECTOR
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                LEAK CONTAINED
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              North-East Industrial Basin hosts petrochemical storage. Active floodwaters pose a potential wash-off risk. 3 modular floating oil & hydrocarbon containment booms are deployed across the drainage sluice.
            </p>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span>Absorbent Boom Perimeter:</span>
                <span className="text-emerald-400 font-bold">
                  {boomsDeployed ? '1,200m Deployed & Anchored' : 'Perimeter Disengaged'}
                </span>
              </div>

              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span>Hydrocarbon Optical Sensor S-HC-04:</span>
                <span className="text-emerald-400 font-bold">0.02 ppm (SAFE - Below 0.50 Threshold)</span>
              </div>

              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span>Secondary Coagulant Dosing:</span>
                <span className={dosingActive ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                  {dosingActive ? 'ACTIVE (Polymer Injection)' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center space-x-3 text-xs font-mono">
            <button
              onClick={toggleBooms}
              className={`flex-1 py-2 rounded font-bold transition-colors ${
                boomsDeployed 
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700' 
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              {boomsDeployed ? 'RETRACT BOOM PERIMETER' : 'DEPLOY EMERGENCY BOOMS'}
            </button>

            <button
              onClick={toggleDosing}
              className={`flex-1 py-2 rounded font-bold transition-colors ${
                dosingActive 
                  ? 'bg-cyan-900 hover:bg-cyan-800 text-cyan-200 border border-cyan-700' 
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
              }`}
            >
              {dosingActive ? 'STOP COAGULANT DOSING' : 'ACTIVATE COAGULANT DOSING'}
            </button>
          </div>
        </div>

        {/* Ecological Impact & Marine Estuary Summary */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  ECOLOGICAL & ESTUARY IMPACT SUMMARY
                </h2>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                TIDAL GATE MONITOR
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">South Mangrove Reserve Salinity:</span>
                  <strong className="text-white">18.4 PSU (Optimal Brackish Balance)</strong>
                </div>
                <div className="w-full h-1.5 rounded bg-slate-800 overflow-hidden mt-1">
                  <div className="h-full bg-teal-500 rounded" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Total Silt / Sediment Displacement:</span>
                  <strong className="text-amber-400">14,200 metric tons / 24hr</strong>
                </div>
                <div className="text-[10px] text-slate-400">
                  Managed through dredging excavators E-01 and E-02 at river mouth
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Marine Outfall Bacterial Coliform:</span>
                  <strong className="text-emerald-400">&lt; 200 CFU/100ml (Compliant)</strong>
                </div>
                <div className="text-[10px] text-emerald-400">
                  UV Disinfection stage operating at Outfall O-04
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded bg-[#080d16] border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Environmental Protection Department (EPD) Station: Node 04</span>
            <span className="text-emerald-400 font-bold">Telemetry Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};
