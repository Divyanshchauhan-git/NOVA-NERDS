import React from 'react';
import { 
  Users, 
  UserCheck, 
  ArrowRight, 
  Building, 
  HeartPulse, 
  ShieldCheck, 
  Utensils, 
  Droplet, 
  Zap, 
  MapPin, 
  AlertTriangle,
  Ambulance,
  BedDouble,
  Activity,
  Plus
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const PeopleSheltersScreen: React.FC = () => {
  const { shelters, medicalTents, systemStats, updateShelterOccupancy } = useCommand();

  const totalAtRisk = systemStats.totalRiskPopulation;
  const totalSheltered = shelters.reduce((acc, s) => acc + s.currentOccupancy, 0);
  const totalInTransit = 7890;
  const totalEvacuated = systemStats.totalEvacuated;
  const totalUnaccounted = Math.max(0, totalAtRisk - totalEvacuated);
  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const overallOccupancyPct = Math.round((totalSheltered / totalCapacity) * 100);

  return (
    <div className="p-5 space-y-5">
      {/* Top Banner */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              CIVILIAN EVACUATION & VERTICAL SHELTERS COMMAND
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Operational coordination across 9 flood-resilient vertical safe havens and 3 mobile trauma surge tents
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">TOTAL SHELTER BEDDING</span>
            <span className="font-bold text-white text-sm">{totalCapacity.toLocaleString()} Slots</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-indigo-900/40">
            <span className="text-indigo-400 text-[10px] block">CITYWIDE OCCUPANCY</span>
            <span className="font-bold text-indigo-300 text-sm">{overallOccupancyPct}% Filled</span>
          </div>
        </div>
      </div>

      {/* Visual Flow: AT RISK -> EVACUATING -> SHELTERED */}
      <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
        <div className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-3">
          POPULATION LIFE-SAFETY PIPELINE
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          {/* 1. At Risk */}
          <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-600/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-rose-300">
              <span>AT RISK</span>
              <Users className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-2">
              {totalAtRisk.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-rose-400 mt-1">
              Low-basin residents
            </div>
          </div>

          <div className="hidden md:flex justify-center text-slate-600">
            <ArrowRight className="w-6 h-6 text-amber-500 animate-pulse" />
          </div>

          {/* 2. Evacuating / In Transit */}
          <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-600/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span>IN TRANSIT</span>
              <UserCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-2">
              {totalInTransit.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-amber-400 mt-1">
              Via boats & walkways
            </div>
          </div>

          <div className="hidden md:flex justify-center text-slate-600">
            <ArrowRight className="w-6 h-6 text-emerald-500 animate-pulse" />
          </div>

          {/* 3. Sheltered */}
          <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-600/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
              <span>SHELTERED</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-2">
              {totalSheltered.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1">
              {overallOccupancyPct}% Capacity Allocated
            </div>
          </div>
        </div>

        {/* Secondary pending metric */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Total Evacuated To Date: <strong className="text-emerald-400">{totalEvacuated.toLocaleString()}</strong></span>
          <span className="text-amber-400">Unaccounted / Pending Rescue: <strong>{totalUnaccounted.toLocaleString()}</strong></span>
        </div>
      </div>

      {/* Heatmap Matrix Overview */}
      <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>9 VERTICAL SHELTERS OCCUPANCY HEATMAP</span>
          </h2>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
              <span className="text-slate-300">&lt; 75%</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
              <span className="text-slate-300">75% - 90%</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
              <span className="text-slate-300">&gt; 90% (Red Alert)</span>
            </span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {shelters.map((s) => {
            const pct = Math.round((s.currentOccupancy / s.capacity) * 100);
            const statusColor = pct > 90 ? 'bg-rose-600' : pct > 75 ? 'bg-amber-500' : 'bg-emerald-500';
            const borderGlow = pct > 90 ? 'border-rose-600' : 'border-slate-800';

            return (
              <div 
                key={s.id} 
                className={`p-3.5 rounded-lg bg-slate-900/90 border ${borderGlow} flex flex-col justify-between text-xs font-mono space-y-2`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-white text-sm block font-sans">{s.id}: {s.name}</span>
                    <span className="text-[10px] text-slate-400">{s.neighbourhood}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${statusColor}`}>
                    {pct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{s.currentOccupancy} / {s.capacity} beds</span>
                    <span>{s.capacity - s.currentOccupancy} vacant</span>
                  </div>
                  <div className="w-full h-2 rounded bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded ${statusColor}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Stock & Readiness Tags */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-800/80 text-[10px]">
                  <div className="flex items-center space-x-1 text-slate-300">
                    <Utensils className="w-3 h-3 text-amber-400" />
                    <span>Food: {s.foodStockDays}d</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-300">
                    <Droplet className="w-3 h-3 text-cyan-400" />
                    <span>Water: {s.waterStockDays}d</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-300">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span>{s.powerStatus.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Evacuation Team */}
                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Team: <strong className="text-slate-200">{s.evacuationTeam}</strong></span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => updateShelterOccupancy(s.id, 50)}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold"
                      title="Intake 50 citizens"
                    >
                      +50
                    </button>
                    <button
                      onClick={() => updateShelterOccupancy(s.id, -50)}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold"
                      title="Relocate 50 citizens"
                    >
                      -50
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Medical Tents Section */}
      <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              3 MOBILE MEDICAL TRAUMA SURGE TENTS
            </h2>
          </div>
          <span className="text-xs font-mono text-rose-400 font-bold">
            180 BEDS DEPLOYED • ICU CAPABLE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {medicalTents.map((tent) => {
            const occPct = Math.round((tent.occupiedBeds / tent.surgeCapacity) * 100);
            return (
              <div 
                key={tent.id}
                className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between text-xs font-mono space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-400 text-sm">{tent.id}</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                      {occPct}% OCCUPIED
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm font-sans mt-1">
                    {tent.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-slate-400 text-[11px] mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{tent.location}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center space-x-1">
                      <BedDouble className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Surge Beds:</span>
                    </span>
                    <span className="font-bold text-white">{tent.occupiedBeds} / {tent.surgeCapacity}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center space-x-1">
                      <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Doctors on Site:</span>
                    </span>
                    <span className="font-bold text-white">{tent.doctorsOnSite} Trauma Specialists</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center space-x-1">
                      <Ambulance className="w-3.5 h-3.5 text-rose-400" />
                      <span>Ambulance Readiness:</span>
                    </span>
                    <span className="font-bold text-emerald-300">{tent.ambulancesReady} Ready for Dispatch</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
