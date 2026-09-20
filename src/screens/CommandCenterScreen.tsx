import React from 'react';
import { 
  Droplets, 
  CloudRain, 
  Users, 
  UserCheck, 
  Building, 
  Zap, 
  AlertTriangle, 
  HeartPulse, 
  Clock, 
  ShieldAlert, 
  Radio, 
  CheckCircle2, 
  Truck, 
  ChevronRight,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { InteractiveMap } from '../components/InteractiveMap';
import { HelpBadge } from '../components/HelpBadge';

export const CommandCenterScreen: React.FC = () => {
  const { 
    neighbourhoods, 
    incidents, 
    recentOperations, 
    systemStats, 
    setCurrentScreen, 
    setSelectedNeighbourhoodId,
    deployResource,
    isScenarioRunning,
    isDemoMode
  } = useCommand();

  // Pick top water level & rainfall
  const northN = neighbourhoods.find(n => n.id === 'north') || neighbourhoods[0];
  const maxWaterLevel = Math.max(...neighbourhoods.map(n => n.waterLevel));
  const maxRainfall = Math.max(...neighbourhoods.map(n => n.rainfall3h));

  // Response Readiness calculations
  const readinessMetrics = [
    { label: 'Drainage & Pumping', value: 88, status: '17/20 Clusters Active', color: 'bg-amber-500' },
    { label: 'People & Housing', value: 84, status: '9 Shelters Operational', color: 'bg-emerald-500' },
    { label: 'Power & Microgrids', value: 96, status: 'Decentralized 100%', color: 'bg-cyan-500' },
    { label: 'Mobility & Access', value: 68, status: '4 Corridors Diverted', color: 'bg-rose-500' },
    { label: 'Environment & Outfalls', value: 82, status: '3/4 Outfalls Compliant', color: 'bg-teal-500' },
    { label: 'Communications (LoRa)', value: 100, status: 'Autonomous Mesh Active', color: 'bg-indigo-500' },
  ];

  return (
    <div className="p-5 space-y-5">
      {/* Demo Scenario Guided Alert when Demo Mode is Active */}
      {isDemoMode && (
        <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-indigo-300">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>
              <strong className="text-white">DEMO SCENARIO MODE ACTIVE:</strong> Advance stages with "RUN FLOOD SCENARIO", explore local AI image assessment in "Flood Image Analysis", or toggle "ONLINE / OFFLINE" to test disconnected local resilience.
            </span>
          </div>
          <HelpBadge topic="quick-guide" label="Demo Tour" />
        </div>
      )}

      {/* KPI Cards Row (8 cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* 1. Water Level */}
        <div className="p-3 rounded-lg bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>WATER LEVEL</span>
            <Droplets className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {northN.waterLevel}m
          </div>
          <div className="text-[10px] font-mono text-rose-400 font-semibold flex items-center space-x-1 mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>{northN.waterLevelDelta}</span>
          </div>
        </div>

        {/* 2. Rainfall */}
        <div className="p-3 rounded-lg bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>RAINFALL (3HR)</span>
            <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {maxRainfall} mm
          </div>
          <div className="text-[10px] font-mono text-cyan-400 font-semibold mt-0.5">
            Heavy Precipitation
          </div>
        </div>

        {/* 3. Population at Risk */}
        <div className="p-3 rounded-lg bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>AT RISK</span>
            <Users className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {systemStats.totalRiskPopulation.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-amber-400 font-semibold mt-0.5">
            Across 3 Zones
          </div>
        </div>

        {/* 4. Evacuated */}
        <div className="p-3 rounded-lg bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>EVACUATED</span>
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {systemStats.totalEvacuated.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-emerald-400 font-semibold mt-0.5">
            {Math.round((systemStats.totalEvacuated / systemStats.totalRiskPopulation) * 100)}% of Vulnerable
          </div>
        </div>

        {/* 5. Shelter Occupancy */}
        <div className="p-3 rounded-lg bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>SHELTERS</span>
            <Building className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {systemStats.overallShelterOccupancyPct}%
          </div>
          <div className="text-[10px] font-mono text-indigo-300 font-semibold mt-0.5">
            9 Vertical Havens
          </div>
        </div>

        {/* 6. Pump Availability */}
        <div className="p-3 rounded-lg bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>PUMPS ACTIVE</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-300 mt-1">
            {systemStats.totalActivePumps}
          </div>
          <div className="text-[10px] font-mono text-amber-400 font-semibold mt-0.5">
            87.5% Fleet Deployed
          </div>
        </div>

        {/* 7. Roads Blocked */}
        <div className="p-3 rounded-lg bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>ROADS BLOCKED</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-bold font-mono text-rose-400 mt-1">
            {systemStats.blockedRoadCount} / {systemStats.totalRoadCount}
          </div>
          <div className="text-[10px] font-mono text-rose-300 font-semibold mt-0.5">
            Arterials Diverted
          </div>
        </div>

        {/* 8. Medical Capacity */}
        <div className="p-3 rounded-lg bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>MEDICAL SURGE</span>
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            86%
          </div>
          <div className="text-[10px] font-mono text-emerald-400 font-semibold mt-0.5">
            3 Triage Tents Ready
          </div>
        </div>
      </div>

      {/* Main Center Area: Map + Active Incidents Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Central Map (2 Cols) */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>LIVE CITYWIDE TACTICAL OVERVIEW</span>
            </div>
            <button
              onClick={() => setCurrentScreen('flood-map')}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <span>FULL GIS CONSOLE</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <InteractiveMap 
            heightClass="h-[460px]" 
            onSelectNeighbourhood={(id) => {
              setSelectedNeighbourhoodId(id);
              setCurrentScreen('neighbourhoods');
            }}
          />
        </div>

        {/* Right: Active Incidents Panel (1 Col) */}
        <div className="bg-[#0b111d] rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                ACTIVE INCIDENTS
              </h2>
              <HelpBadge topic="rapid-deployment" />
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {incidents.length} ESCALATIONS
            </span>
          </div>

          {/* Incidents Scrollable List */}
          <div className="p-4 space-y-3 overflow-y-auto max-h-[400px]">
            {incidents.map((incident) => {
              const isCrit = incident.severity === 'CRITICAL';
              return (
                <div 
                  key={incident.id}
                  className={`p-3 rounded border transition-all ${
                    isCrit 
                      ? 'bg-rose-950/40 border-rose-600/60 text-slate-200' 
                      : 'bg-slate-900/80 border-amber-600/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="font-bold text-amber-400">{incident.neighbourhood}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400">{incident.timestamp}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                        isCrit ? 'bg-rose-600 text-white' : 'bg-amber-600 text-black'
                      }`}>
                        {incident.severity}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-white leading-snug">
                    {incident.title}
                  </h3>

                  <p className="text-[11px] text-slate-300/80 mt-1 leading-normal font-sans">
                    {incident.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">
                      Unit: <strong className="text-slate-200">{incident.assignedUnit || 'Dispatch in queue'}</strong>
                    </span>

                    <button
                      onClick={() => {
                        deployResource(
                          'Rescue Inflatable Zodiac B-04',
                          'Central Marine Reserve',
                          incident.location,
                          'CRITICAL',
                          'Tactical Unit Bravo'
                        );
                      }}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold"
                    >
                      DISPATCH RESOURCE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Incidents Quick Action Footer */}
          <div className="p-3 border-t border-slate-800 bg-[#070c16] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Incident Commander: EOC Alpha</span>
            <button 
              onClick={() => setCurrentScreen('mobility')}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
            >
              <span>OPEN DISPATCH CONSOLE</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Response Readiness & Recent Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Response Readiness Progress Bars */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>RESPONSE READINESS</span>
              </h2>
              <HelpBadge topic="pumps" />
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              87.2% OPERATIONAL AGGREGATE
            </span>
          </div>

          <div className="space-y-3.5">
            {readinessMetrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-medium">{m.label}</span>
                  <div className="space-x-3">
                    <span className="text-slate-400 text-[11px]">{m.status}</span>
                    <span className="font-bold text-white">{m.value}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded ${m.color} transition-all duration-500`}
                    style={{ width: `${m.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Operations Timeline */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>RECENT OPERATIONS</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">
                LIVE LOG FEED
              </span>
            </div>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
              {recentOperations.map((op) => (
                <div 
                  key={op.id}
                  className="flex items-start space-x-3 p-2 rounded bg-slate-900/60 border border-slate-800/80 text-xs font-mono"
                >
                  <span className="text-amber-400 font-bold">{op.time}</span>
                  <div className="flex-1 text-slate-200">
                    <span>{op.message}</span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">Sector: {op.sector}</span>
                  </div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Log synchronized with Municipal LoRa Hub</span>
            <span className="text-emerald-400 font-semibold">Decentralized Archive Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
