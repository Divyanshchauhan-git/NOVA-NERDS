import React, { useState } from 'react';
import { 
  MapPin, 
  Droplets, 
  CloudRain, 
  Users, 
  Building, 
  Zap, 
  HeartPulse, 
  Navigation, 
  Send, 
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { InteractiveMap } from '../components/InteractiveMap';
import { NeighbourhoodData } from '../types';

export const FloodMapScreen: React.FC = () => {
  const { 
    neighbourhoods, 
    selectedNeighbourhoodId, 
    setSelectedNeighbourhoodId, 
    deployResource,
    isScenarioRunning 
  } = useCommand();

  // Active selected zone defaults to North Meridian if none selected
  const activeZone: NeighbourhoodData = neighbourhoods.find(
    n => n.id === (selectedNeighbourhoodId || 'north')
  ) || neighbourhoods[0];

  return (
    <div className="p-5 h-[calc(100vh-65px)] flex flex-col space-y-4">
      {/* Top Banner & Quick Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#080d16] p-3.5 rounded-lg border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
          <div>
            <h1 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              FULL-SCALE GIS FLOOD INUNDATION ENGINE
            </h1>
            <p className="text-xs font-mono text-slate-400">
              Decentralized mesh telemetry • Real-time depth modeling & drainage layer analysis
            </p>
          </div>
        </div>

        {/* Quick Neighbourhood switch tabs */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-slate-400 hidden sm:inline">SELECT SECTOR:</span>
          {neighbourhoods.map(n => (
            <button
              key={n.id}
              onClick={() => setSelectedNeighbourhoodId(n.id)}
              className={`px-3 py-1.5 rounded font-bold uppercase transition-all ${
                activeZone.id === n.id
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {n.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Right Side Panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        {/* Large GIS Map View (3 Cols) */}
        <div className="lg:col-span-3 h-full flex flex-col">
          <InteractiveMap 
            heightClass="h-full min-h-[500px]"
            showLayerToggles={true}
            selectedNeighbourhoodId={activeZone.id}
            onSelectNeighbourhood={(id) => setSelectedNeighbourhoodId(id)}
          />
        </div>

        {/* Right Side: SELECTED AREA Panel (1 Col) */}
        <div className="bg-[#0b111d] rounded-lg border border-slate-800 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="p-4 border-b border-slate-800/80 bg-[#080d16] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                  SELECTED AREA
                </div>
                <h2 className="text-base font-bold text-white font-display">
                  {activeZone.name}
                </h2>
              </div>

              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                activeZone.status === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                activeZone.status === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}>
                {activeZone.status}
              </span>
            </div>

            {/* Description */}
            <div className="p-4 border-b border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans">
              {activeZone.description}
            </div>

            {/* Key Operational Indicators */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px] flex items-center space-x-1">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    <span>WATER LEVEL</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{activeZone.waterLevel}m</div>
                  <div className="text-[10px] text-rose-400 font-semibold">{activeZone.waterLevelDelta}</div>
                </div>

                <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px] flex items-center space-x-1">
                    <CloudRain className="w-3 h-3 text-indigo-400" />
                    <span>FLOOD DEPTH</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{activeZone.floodDepth}m</div>
                  <div className="text-[10px] text-slate-400">{activeZone.rainfall3h} mm rain</div>
                </div>
              </div>

              {/* Metric Item List */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Population Affected:</span>
                  </span>
                  <span className="font-bold text-white">{activeZone.populationAtRisk.toLocaleString()} citizens</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Building className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Nearest Shelter:</span>
                  </span>
                  <span className="font-bold text-emerald-300 truncate max-w-[130px] text-right" title={activeZone.nearestShelter}>
                    {activeZone.nearestShelter.split(' ')[0]}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pump Fleet Capacity:</span>
                  </span>
                  <span className="font-bold text-amber-300">{activeZone.pumpCapacity}% ({activeZone.pumpActiveCount})</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                    <span>Nearest Medical:</span>
                  </span>
                  <span className="font-bold text-rose-300 truncate max-w-[130px] text-right" title={activeZone.nearestMedical}>
                    {activeZone.nearestMedical.split(' ')[0]}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Road Accessibility:</span>
                  </span>
                  <span className={`font-bold ${activeZone.roadAccess < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {activeZone.roadAccess}% Passable
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 rounded bg-slate-900/50 border border-slate-800/80">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
                    <span>Evacuation Status:</span>
                  </span>
                  <span className="font-bold text-emerald-400">
                    {Math.round((activeZone.evacuated / activeZone.populationAtRisk) * 100)}% Evacuated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tactical Dispatch Buttons */}
          <div className="p-4 border-t border-slate-800 bg-[#080d16] space-y-2">
            <button
              onClick={() => {
                deployResource(
                  'Modular Inflatable Flood Barrier N-02',
                  'Central Logistics Depot',
                  activeZone.name,
                  'HIGH',
                  'Civil Defense Cohort Alpha'
                );
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>DEPLOY EMERGENCY BARRIER TO SECTOR</span>
            </button>

            <button
              onClick={() => {
                deployResource(
                  'Rescue Inflatable Zodiac B-01',
                  'North River Landing',
                  activeZone.name,
                  'CRITICAL',
                  'NDRF Rapid Boat Unit'
                );
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>LAUNCH RESCUE FLOTILLA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
