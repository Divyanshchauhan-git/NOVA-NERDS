import React, { useState } from 'react';
import { 
  Building2, 
  Droplets, 
  CloudRain, 
  Zap, 
  Building, 
  HeartPulse, 
  Radio, 
  Navigation, 
  Users, 
  ShieldAlert, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Send
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { NeighbourhoodData } from '../types';

export const NeighbourhoodsScreen: React.FC = () => {
  const { 
    neighbourhoods, 
    assets, 
    shelters, 
    incidents, 
    roads, 
    selectedNeighbourhoodId, 
    setSelectedNeighbourhoodId, 
    setSelectedAsset,
    deployResource,
    setCurrentScreen 
  } = useCommand();

  const [drilldownId, setDrilldownId] = useState<'north' | 'central' | 'south' | null>(
    selectedNeighbourhoodId || null
  );

  const activeNeighbourhood = drilldownId 
    ? neighbourhoods.find(n => n.id === drilldownId) 
    : null;

  // Filter local assets for active drilldown
  const localAssets = activeNeighbourhood 
    ? assets.filter(a => a.neighbourhood === activeNeighbourhood.name)
    : [];

  const localShelters = activeNeighbourhood
    ? shelters.filter(s => s.neighbourhood === activeNeighbourhood.name)
    : [];

  const localIncidents = activeNeighbourhood
    ? incidents.filter(i => i.neighbourhood === activeNeighbourhood.name)
    : [];

  const localRoads = activeNeighbourhood
    ? roads.filter(r => r.neighbourhood === activeNeighbourhood.name)
    : [];

  return (
    <div className="p-5 space-y-5">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#080d16] p-4 rounded-lg border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              MUNICIPAL NEIGHBOURHOOD COMMAND
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Decentralized sector triage • 3 distinct hydrological basins of Meridian City
          </p>
        </div>

        {drilldownId && (
          <button
            onClick={() => setDrilldownId(null)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VIEW ALL 3 NEIGHBOURHOODS</span>
          </button>
        )}
      </div>

      {/* VIEW 1: 3 LARGE CARDS (If no drilldown active) */}
      {!drilldownId && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {neighbourhoods.map((n) => {
            const isCritical = n.status === 'CRITICAL';
            const isHigh = n.status === 'HIGH';
            const statusBg = isCritical ? 'border-rose-600/80 bg-[#120c15]' : isHigh ? 'border-amber-600/70 bg-[#12110c]' : 'border-cyan-600/70 bg-[#0c141d]';
            const badgeColor = isCritical ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : isHigh ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';

            return (
              <div 
                key={n.id}
                className={`rounded-xl border p-5 flex flex-col justify-between shadow-xl transition-all hover:scale-[1.01] ${statusBg}`}
              >
                <div>
                  {/* Card Title & Status */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-800/80">
                    <div>
                      <h2 className="text-xl font-bold text-white font-display">
                        {n.name.toUpperCase()}
                      </h2>
                      <p className="text-xs text-slate-400 font-sans mt-0.5 leading-snug">
                        {n.description}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider border ${badgeColor}`}>
                      {n.status}
                    </span>
                  </div>

                  {/* 9 Required Operational Indicators Grid */}
                  <div className="grid grid-cols-2 gap-2.5 my-4 text-xs font-mono">
                    {/* 1. Water Level */}
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>WATER LEVEL</span>
                        <Droplets className="w-3 h-3 text-cyan-400" />
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">{n.waterLevel}m</div>
                      <div className="text-[10px] text-rose-400 font-semibold">{n.waterLevelDelta}</div>
                    </div>

                    {/* 2. Flood Depth */}
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>FLOOD DEPTH</span>
                        <CloudRain className="w-3 h-3 text-indigo-400" />
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">{n.floodDepth}m</div>
                      <div className="text-[10px] text-slate-400">{n.rainfall3h} mm rain</div>
                    </div>

                    {/* 3. Pump Capacity */}
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>PUMP CAPACITY</span>
                        <Zap className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="text-base font-bold text-amber-300 mt-0.5">{n.pumpCapacity}%</div>
                      <div className="text-[10px] text-slate-400">{n.pumpActiveCount} active</div>
                    </div>

                    {/* 4. Shelter Occupancy */}
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>SHELTER OCCUPANCY</span>
                        <Building className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div className={`text-base font-bold mt-0.5 ${n.shelterOccupancy > 90 ? 'text-rose-400' : 'text-emerald-300'}`}>
                        {n.shelterOccupancy}%
                      </div>
                      <div className="text-[10px] text-slate-400">Vertical Havens</div>
                    </div>

                    {/* 5. Medical Capacity */}
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>MEDICAL SURGE</span>
                        <HeartPulse className="w-3 h-3 text-rose-400" />
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">{n.medicalCapacity}%</div>
                      <div className="text-[10px] text-slate-400">Triage beds ready</div>
                    </div>

                    {/* 6. Power Availability */}
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>POWER AVAILABILITY</span>
                        <Zap className="w-3 h-3 text-cyan-400" />
                      </div>
                      <div className="text-base font-bold text-cyan-300 mt-0.5">{n.powerAvailability}%</div>
                      <div className="text-[10px] text-emerald-400">Solar Microgrid</div>
                    </div>

                    {/* 7. Road Access */}
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>ROAD ACCESS</span>
                        <Navigation className="w-3 h-3 text-slate-300" />
                      </div>
                      <div className={`text-base font-bold mt-0.5 ${n.roadAccess < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {n.roadAccess}%
                      </div>
                      <div className="text-[10px] text-slate-400">Passable corridors</div>
                    </div>

                    {/* 8. Communication Status */}
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>COMMS STATUS</span>
                        <Radio className="w-3 h-3 text-indigo-400" />
                      </div>
                      <div className="text-xs font-bold text-indigo-300 mt-1">{n.commsStatus}</div>
                      <div className="text-[10px] text-emerald-400">LoRa Mesh 100%</div>
                    </div>
                  </div>

                  {/* 9. Population at Risk & Evacuation Progress */}
                  <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Population at Risk:</span>
                      <span className="font-bold text-white">{n.populationAtRisk.toLocaleString()} citizens</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Evacuated:</span>
                      <span className="font-bold text-emerald-400">{n.evacuated.toLocaleString()} ({Math.round((n.evacuated/n.populationAtRisk)*100)}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded"
                        style={{ width: `${(n.evacuated/n.populationAtRisk)*100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Drill Down Button */}
                <button
                  onClick={() => {
                    setDrilldownId(n.id);
                    setSelectedNeighbourhoodId(n.id);
                  }}
                  className="mt-5 w-full flex items-center justify-center space-x-2 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors shadow-md"
                >
                  <span>OPEN {n.name.toUpperCase()} OPERATIONAL COMMAND</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: DETAILED OPERATIONAL PAGE (When a neighbourhood is clicked) */}
      {drilldownId && activeNeighbourhood && (
        <div className="space-y-5">
          {/* Active Sector Header Summary Bar */}
          <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">SECTOR DESIGNATION</span>
              <span className="text-lg font-bold text-white font-display">{activeNeighbourhood.name}</span>
              <span className="text-[10px] text-amber-400 block mt-0.5">Basin Zone ID: {activeNeighbourhood.id.toUpperCase()}-01</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">CRITICAL WATER LEVEL</span>
              <span className="text-lg font-bold text-rose-400 font-mono">{activeNeighbourhood.waterLevel}m</span>
              <span className="text-[10px] text-slate-300 block mt-0.5">Delta: {activeNeighbourhood.waterLevelDelta}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">EVACUATION RATE</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">
                {Math.round((activeNeighbourhood.evacuated / activeNeighbourhood.populationAtRisk) * 100)}%
              </span>
              <span className="text-[10px] text-slate-300 block mt-0.5">{activeNeighbourhood.evacuated.toLocaleString()} of {activeNeighbourhood.populationAtRisk.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => {
                  deployResource(
                    'Amphibious All-Terrain Transporter A-01',
                    'Central Staging Pier',
                    activeNeighbourhood.name,
                    'CRITICAL',
                    'Armed Forces Relief Platoon'
                  );
                }}
                className="px-3 py-2 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                DEPLOY FLEET TO SECTOR
              </button>
            </div>
          </div>

          {/* 3 Columns: Local Assets, Shelters, and Incidents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Column 1: Local Assets */}
            <div className="bg-[#0b111d] p-4 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h3 className="text-xs font-mono font-bold uppercase text-white flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>SECTOR ASSETS & PUMPS ({localAssets.length})</span>
                </h3>
              </div>
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto">
                {localAssets.map(asset => (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className="p-3 rounded bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer text-xs font-mono transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-amber-400">{asset.id}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {asset.status}
                      </span>
                    </div>
                    <div className="font-bold text-white text-sm font-sans">{asset.name}</div>
                    <div className="text-slate-400 text-[11px] mt-1">{asset.capacity} • {asset.batteryFuel}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Local Shelters */}
            <div className="bg-[#0b111d] p-4 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h3 className="text-xs font-mono font-bold uppercase text-white flex items-center space-x-2">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span>VERTICAL SHELTERS ({localShelters.length})</span>
                </h3>
              </div>
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto">
                {localShelters.map(shelter => {
                  const occPct = Math.round((shelter.currentOccupancy / shelter.capacity) * 100);
                  return (
                    <div
                      key={shelter.id}
                      className="p-3 rounded bg-slate-900/70 border border-slate-800/80 text-xs font-mono"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-emerald-400">{shelter.id}</span>
                        <span className={`font-bold ${occPct > 90 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {occPct}% Occupancy
                        </span>
                      </div>
                      <div className="font-bold text-white text-sm font-sans">{shelter.name}</div>
                      <div className="text-slate-400 text-[11px] mt-1">
                        Capacity: {shelter.currentOccupancy} / {shelter.capacity} • Power: {shelter.powerStatus}
                      </div>
                      <div className="w-full h-1.5 rounded bg-slate-800 mt-2 overflow-hidden">
                        <div 
                          className={`h-full rounded ${occPct > 90 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${occPct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Sector Incidents & Roads */}
            <div className="bg-[#0b111d] p-4 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h3 className="text-xs font-mono font-bold uppercase text-white flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>SECTOR INCIDENTS & ROADS</span>
                </h3>
              </div>
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto">
                {localIncidents.map(inc => (
                  <div key={inc.id} className="p-3 rounded bg-rose-950/30 border border-rose-600/50 text-xs">
                    <div className="flex justify-between text-rose-400 font-mono font-bold text-[10px]">
                      <span>{inc.id}</span>
                      <span>{inc.timestamp}</span>
                    </div>
                    <div className="font-bold text-white mt-1">{inc.title}</div>
                    <div className="text-slate-300 text-[11px] mt-1">{inc.description}</div>
                  </div>
                ))}

                <div className="pt-2 border-t border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 uppercase text-[10px] block mb-1 font-bold">ROADS IN SECTOR:</span>
                  {localRoads.map(r => (
                    <div key={r.id} className="flex justify-between py-1 border-b border-slate-800/60 text-[11px]">
                      <span className="text-slate-300">{r.name.split('(')[0]}</span>
                      <span className={r.status === 'BLOCKED' ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
