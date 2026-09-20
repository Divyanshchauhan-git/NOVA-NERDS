import React from 'react';
import { 
  Zap, 
  Sun, 
  BatteryCharging, 
  ArrowDown, 
  Building, 
  Hospital, 
  AlertTriangle, 
  ShieldCheck, 
  Power, 
  Fuel, 
  RotateCw,
  Sliders,
  BatteryMedium,
  CheckCircle2
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const PowerUtilitiesScreen: React.FC = () => {
  const { assets } = useCommand();

  const microgrids = [
    {
      id: 'MG-01',
      name: 'North Solar-Storage Microgrid',
      solarCap: '2.4 MW Solar PV',
      batteryCap: '4.8 MWh LiFePO4',
      soc: 88,
      status: 'Islanding Nominal',
      powers: '8 Submersible Pumps, Shelters S-01, S-02, Water Treatment PW-01'
    },
    {
      id: 'MG-02',
      name: 'Central Hospital Resilient Microgrid',
      solarCap: '1.8 MW Solar PV',
      batteryCap: '3.6 MWh LiFePO4',
      soc: 94,
      status: 'Islanding Nominal',
      powers: 'District Central Hospital, Medical Tent T-02, Subway Emergency Pumps'
    },
    {
      id: 'MG-03',
      name: 'South Tidal-Solar Microgrid',
      solarCap: '1.2 MW Solar + Tidal Sluice',
      batteryCap: '2.4 MWh LiFePO4',
      soc: 96,
      status: 'Islanding Nominal',
      powers: 'Sluice Gates, Estuary Outfalls, Shelters S-07, S-08'
    }
  ];

  const swapStations = [
    { id: 'BSS-01', location: 'North Sector 4 Depot', readyPacks: 58, chargingPacks: 6, totalSwaps: 34 },
    { id: 'BSS-02', location: 'Central Metro Pier Depot', readyPacks: 60, chargingPacks: 4, totalSwaps: 29 },
    { id: 'BSS-03', location: 'South Harbor Logistics Yard', readyPacks: 62, chargingPacks: 2, totalSwaps: 18 },
  ];

  return (
    <div className="p-5 space-y-5">
      {/* Top Banner with GRID STATUS: UNSTABLE */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              DECENTRALIZED RESILIENT ENERGY COMMAND
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Decentralized solar microgrids and modular battery swappable energy architecture
          </p>
        </div>

        {/* Required Banner: GRID STATUS: UNSTABLE vs DECENTRALIZED */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded bg-rose-950/80 border border-rose-600 text-xs font-mono flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-rose-300 block leading-none font-bold">MUNICIPAL HIGHWAY GRID</span>
              <span className="text-rose-200 font-black text-sm">GRID STATUS: UNSTABLE</span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-500 text-xs font-mono flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-emerald-300 block leading-none font-bold">DECENTRALIZED RESILIENCE</span>
              <span className="text-emerald-200 font-bold text-sm">100% OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Energy Flow Architectural Diagram:
          SOLAR -> BATTERY -> PUMP / SHELTER / HOSPITAL */}
      <div className="bg-[#0b111d] p-6 rounded-lg border border-slate-800">
        <div className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center justify-between">
          <span>ZERO-FAIL EMERGENCY POWER ARCHITECTURE</span>
          <span className="text-emerald-400">Total Installed: 5.4 MW Solar / 10.8 MWh Battery</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-xs font-mono">
          {/* Node 1: SOLAR */}
          <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-500/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-300">
              <span className="font-bold">1. SOLAR PV ARRAYS</span>
              <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
            </div>
            <div className="text-2xl font-bold text-white mt-2">
              4.12 MW
            </div>
            <div className="text-[10px] text-amber-300 mt-1">
              Active Generation (Diffuse Rain Mode)
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="hidden md:flex justify-center text-slate-600">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-amber-400 mb-1">DC BUS 48V</span>
              <div className="w-12 h-0.5 bg-amber-500 relative">
                <span className="absolute -right-1.5 -top-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-500 rotate-45"></span>
              </div>
            </div>
          </div>

          {/* Node 2: BATTERY */}
          <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-300">
              <span className="font-bold">2. LIFEPO4 STORAGE</span>
              <BatteryCharging className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div className="text-2xl font-bold text-white mt-2">
              91.4% SoC
            </div>
            <div className="text-[10px] text-emerald-300 mt-1">
              9.87 MWh Stored (72hr Autonomy)
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="hidden md:flex justify-center text-slate-600">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-cyan-400 mb-1">ISLANDED INVERTER</span>
              <div className="w-12 h-0.5 bg-cyan-500 relative">
                <span className="absolute -right-1.5 -top-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-500 rotate-45"></span>
              </div>
            </div>
          </div>

          {/* Node 3: CRITICAL CONSUMERS (PUMP / SHELTER / HOSPITAL) */}
          <div className="p-4 rounded-lg bg-cyan-950/40 border border-cyan-500/60 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-cyan-300">
              <span className="font-bold">3. CRITICAL DEMAND</span>
              <Building className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-300">• 42 Pumps Active:</span>
                <strong className="text-emerald-400">100% Powered</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">• 9 Shelters:</span>
                <strong className="text-emerald-400">Full HVAC / Water</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">• Hospitals / ICU:</span>
                <strong className="text-emerald-400">0 ms Transfer</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Microgrids Grid */}
      <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-4 flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>MICROGRID TELEMETRY & SUBSTATION ISLANDING</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {microgrids.map((mg) => (
            <div 
              key={mg.id}
              className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-white text-sm block font-sans">{mg.name}</span>
                  <span className="text-amber-400 text-[10px]">{mg.id} • {mg.status}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {mg.soc}% SoC
                </span>
              </div>

              {/* SoC Bar */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Battery Energy Remaining</span>
                  <span>{mg.soc}%</span>
                </div>
                <div className="w-full h-2 rounded bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded" style={{ width: `${mg.soc}%` }}></div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-300">
                <div>Generation: <strong className="text-white">{mg.solarCap}</strong></div>
                <div>Storage: <strong className="text-white">{mg.batteryCap}</strong></div>
                <div className="text-slate-400 text-[10px] leading-tight pt-1">
                  Connected Loads: <span className="text-slate-200">{mg.powers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Battery Swap Stations & Hospital Diesel Genset */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Battery Swap Stations */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
              <RotateCw className="w-4 h-4 text-emerald-400" />
              <span>3 BATTERY SWAP STATIONS (192 UTILITY PACKS)</span>
            </h2>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              180 Ready Packs Available
            </span>
          </div>

          <div className="space-y-3">
            {swapStations.map(bss => (
              <div key={bss.id} className="p-3 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white font-sans">{bss.id}: {bss.location}</span>
                  <span className="text-emerald-400 font-bold">{bss.readyPacks} Ready / {bss.chargingPacks} Charging</span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
                  <span>Swaps Executed Today: {bss.totalSwaps} units</span>
                  <span className="text-cyan-400">Pumps & Rescue Boats</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Diesel Genset Backup */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
                <Fuel className="w-4 h-4 text-amber-400" />
                <span>HOSPITAL-ONLY DIESEL GENSET STATUS</span>
              </h2>
              <span className="text-xs font-mono text-amber-400 font-bold">
                1,500 kVA SYNCHRONIZED
              </span>
            </div>

            <div className="p-4 rounded bg-slate-900/80 border border-slate-800 space-y-3 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Generator Model:</span>
                <span className="font-bold text-white font-sans">Cummins QSK60 1500kVA Sealed Vault</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Current Status:</span>
                <span className="font-bold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>WARM STANDBY (AUTO-SYNCHRONIZED)</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Underground Fuel Reserve:</span>
                <span className="font-bold text-white">91% (72 Hours Continuous Full Load)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Solar Microgrid Interlock:</span>
                <span className="font-bold text-cyan-300">Dual Infeed Ready (0 ms Cutover)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded bg-amber-950/30 border border-amber-500/40 text-[11px] font-mono text-amber-300">
            Emergency note: Hospital power will automatically run on Solar Microgrid MG-02 during daylight; Genset triggers only if storage drops below 25%.
          </div>
        </div>
      </div>
    </div>
  );
};
