import React, { useState } from 'react';
import { 
  Truck, 
  AlertTriangle, 
  CheckCircle, 
  Send, 
  Navigation, 
  Anchor, 
  Clock, 
  Activity, 
  MapPin, 
  Flame,
  ShieldAlert
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const MobilityScreen: React.FC = () => {
  const { roads, dispatches, deployResource, isScenarioRunning } = useCommand();

  const [resource, setResource] = useState('Rescue Zodiac B-04 (12-Person)');
  const [origin, setOrigin] = useState('Central Marina Staging Depot');
  const [destination, setDestination] = useState('North Sector 3 Canal Ridge');
  const [priority, setPriority] = useState<'CRITICAL' | 'HIGH' | 'STANDARD'>('CRITICAL');
  const [assignedTeam, setAssignedTeam] = useState('NDRF Flotilla Delta');
  const [isSuccess, setIsSuccess] = useState(false);

  const blockedRoads = roads.filter(r => r.status === 'BLOCKED');
  const passableRoads = roads.filter(r => r.status === 'PASSABLE');
  const criticalArterials = roads.filter(r => r.status === 'CRITICAL_ARTERIAL');

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    deployResource(resource, origin, destination, priority, assignedTeam);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-5 space-y-5">
      {/* Top Banner */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              FLOOD MOBILITY & RESOURCE DISPATCH COMMAND
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Arterial corridor status, modular pontoon bridges, amphibious vehicles and rescue flotillas
          </p>
        </div>

        {/* Quick Fleet Count */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">BOATS DEPLOYED</span>
            <span className="font-bold text-cyan-300 text-sm">12 / 16 In Action</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">AMPHIBIOUS</span>
            <span className="font-bold text-emerald-300 text-sm">2 / 2 Ready</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">PONTOONS</span>
            <span className="font-bold text-white text-sm">530m Anchored</span>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Corridor Status on Left, Dispatch Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Roads & Arterial Corridors */}
        <div className="lg:col-span-2 space-y-4">
          {/* Critical Arterial Spotlight */}
          <div className="bg-[#0b111d] p-5 rounded-lg border border-amber-600/70">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-amber-500 animate-pulse" />
                <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  CRITICAL ARTERIAL CORRIDOR 4 (METRO SPINE)
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PARTIAL RESTRICTION • PONTOON BYPASS ACTIVE
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Main east-west transit artery connecting Meridian Central with District Hospital. Submerged under 45cm flash runoff near Metro Plaza. Floatable pontoon walkway PW-02 (210m) deployed alongside to maintain ambulance patient transfer.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">PUMPING RATE</span>
                <span className="text-amber-300 font-bold">1,920 m³/hr Active</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">CLEARING EXCAVATOR</span>
                <span className="text-white font-bold">Excavator E-01 on scene</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">PASSENGER TRANSIT</span>
                <span className="text-emerald-400 font-bold">600 Persons/hr Via Pontoon</span>
              </div>
            </div>
          </div>

          {/* Road Corridors Detailed Table */}
          <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-3">
              MUNICIPAL CORRIDOR TRANSIT STATUS
            </h3>

            <div className="space-y-2.5">
              {roads.map(road => {
                const isBlocked = road.status === 'BLOCKED';
                const isCritical = road.status === 'CRITICAL_ARTERIAL';
                return (
                  <div 
                    key={road.id}
                    className="p-3 rounded bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white font-sans text-xs">{road.name}</span>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                          isBlocked ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                          isCritical ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {road.status}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Water Depth: <strong className="text-slate-200">{road.waterDepthCm} cm</strong> • Sector: {road.neighbourhood}
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-400">
                      <span>DIVERSION ROUTE:</span>
                      <div className="text-amber-400 font-semibold">{road.alternativeRoute}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: DEPLOY RESOURCE Dispatch Panel */}
        <div className="bg-[#0b111d] rounded-lg border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                  DEPLOY RESOURCE
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                EOC DISPATCH READY
              </span>
            </div>

            {isSuccess && (
              <div className="mb-4 p-3 rounded bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Resource dispatch command issued! Added to operational timeline.</span>
              </div>
            )}

            <form onSubmit={handleDeploy} className="space-y-3.5 text-xs font-mono">
              {/* Resource Select */}
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">SELECT RESOURCE:</label>
                <select
                  value={resource}
                  onChange={(e) => setResource(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-hidden focus:border-amber-500"
                >
                  <option value="Rescue Zodiac B-04 (12-Person)">Rescue Zodiac B-04 (12-Person Boat)</option>
                  <option value="Rescue Zodiac B-01 (10-Person)">Rescue Zodiac B-01 (10-Person Boat)</option>
                  <option value="Amphibious All-Terrain Transporter A-01">Amphibious Transporter A-01 (24-Pass / 2.5T)</option>
                  <option value="Amphibious All-Terrain Transporter A-02">Amphibious Transporter A-02 (24-Pass / 2.5T)</option>
                  <option value="Modular Floating Walkway PW-01">Pontoon Walkway PW-01 Unit (100m)</option>
                  <option value="Shared Heavy Track Excavator E-01">Heavy Hydraulic Excavator E-01</option>
                  <option value="Dedicated Amphibious Excavator E-02">Amphibious Silt Excavator E-02</option>
                  <option value="Mobile Medical Trauma Pod T-02">Mobile Trauma Medical Team</option>
                </select>
              </div>

              {/* Origin Select */}
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">ORIGIN STAGING POINT:</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-hidden focus:border-amber-500"
                >
                  <option value="Central Marina Staging Depot">Central Marina Staging Depot</option>
                  <option value="North Relief Staging Pier">North Relief Staging Pier</option>
                  <option value="South Harbor Logistics Yard">South Harbor Logistics Yard</option>
                  <option value="Public Works Central Depot">Public Works Central Depot</option>
                </select>
              </div>

              {/* Destination Select */}
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">DESTINATION (SECTOR/TARGET):</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-hidden focus:border-amber-500"
                >
                  <option value="North Sector 3 Canal Ridge">North Sector 3 Canal Ridge (High Flood Risk)</option>
                  <option value="North Sector 2 Flooded Enclave">North Sector 2 Flooded Enclave</option>
                  <option value="Metro Plaza Underpass (Corridor 4)">Metro Plaza Underpass (Corridor 4)</option>
                  <option value="Shelter S-01 Northern Heights Intake">Shelter S-01 Northern Heights Intake</option>
                  <option value="South Mangrove Outfall Gate">South Mangrove Outfall Gate</option>
                </select>
              </div>

              {/* Priority Select */}
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">DISPATCH PRIORITY:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['CRITICAL', 'HIGH', 'STANDARD'] as const).map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`py-1.5 rounded text-center font-bold text-[10px] transition-colors border ${
                        priority === p
                          ? p === 'CRITICAL' ? 'bg-rose-600 text-white border-rose-500' :
                            p === 'HIGH' ? 'bg-amber-500 text-black border-amber-400' :
                            'bg-cyan-600 text-white border-cyan-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assigned Team Input */}
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">ASSIGNED FIELD UNIT:</label>
                <input
                  type="text"
                  value={assignedTeam}
                  onChange={(e) => setAssignedTeam(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>CONFIRM & DEPLOY RESOURCE</span>
              </button>
            </form>
          </div>

          {/* Active Dispatches Feed */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-xs font-mono">
            <span className="text-slate-400 uppercase text-[10px] block mb-2 font-bold">
              ACTIVE DISPATCH QUEUE ({dispatches.length})
            </span>
            <div className="space-y-2 max-h-[160px] overflow-y-auto">
              {dispatches.slice(0, 3).map(d => (
                <div key={d.id} className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px]">
                  <div className="flex justify-between font-bold text-white">
                    <span>{d.resource.split('(')[0]}</span>
                    <span className="text-amber-400">{d.status}</span>
                  </div>
                  <div className="text-slate-400 text-[10px] mt-0.5">
                    To: {d.destination} • Team: {d.assignedTeam}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
