import React from 'react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  BatteryCharging, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Share2, 
  ArrowRight, 
  Cpu,
  RefreshCw,
  Server
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const SensingCommsScreen: React.FC = () => {
  const { commNodes, isTelecomOutage, toggleTelecomOutage } = useCommand();

  const floatGauges = [
    { id: 'G-01', location: 'North River Basin Confluence', level: '3.84m', status: 'CRITICAL', rate: '+0.42m/hr', loraNode: 'L-01' },
    { id: 'G-02', location: 'Central Commercial Canal Lock', level: '2.45m', status: 'HIGH', rate: '+0.18m/hr', loraNode: 'L-03' },
    { id: 'G-03', location: 'South Estuary Mangrove Sluice', level: '1.42m', status: 'STABLE', rate: '-0.05m/hr', loraNode: 'L-04' },
  ];

  return (
    <div className="p-5 space-y-5">
      {/* Top Banner with Telecom Outage Simulation Button */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-indigo-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              INDEPENDENT LORA MESH & SENSING NETWORK
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Decentralized sub-GHz peer-to-peer telemetry protocol operating independently of commercial telco grids
          </p>
        </div>

        {/* Interactive Telecom Outage Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTelecomOutage}
            className={`px-3 py-2 rounded text-xs font-mono font-bold flex items-center space-x-2 transition-all shadow-md ${
              isTelecomOutage 
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse' 
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
            }`}
          >
            {isTelecomOutage ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            <span>
              {isTelecomOutage ? 'TELECOM OUTAGE SIMULATION: ACTIVE' : 'SIMULATE CELLULAR OUTAGE'}
            </span>
          </button>
        </div>
      </div>

      {/* Network Health Indicators Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Cellular Status */}
        <div className={`p-4 rounded-lg border text-xs font-mono flex items-center justify-between ${
          isTelecomOutage 
            ? 'bg-rose-950/60 border-rose-600 text-rose-200' 
            : 'bg-slate-900/80 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center space-x-3">
            <WifiOff className={`w-5 h-5 ${isTelecomOutage ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`} />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">COMMERCIAL TELCO / 5G</span>
              <span className="font-bold text-sm">
                {isTelecomOutage ? 'OUTAGE: BASE STATIONS DOWN' : 'DEGRADED (22% TOWERS FAILING)'}
              </span>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            isTelecomOutage ? 'bg-rose-600 text-white' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {isTelecomOutage ? 'OFFLINE' : 'WARNING'}
          </span>
        </div>

        {/* Municipal Fiber Status */}
        <div className={`p-4 rounded-lg border text-xs font-mono flex items-center justify-between ${
          isTelecomOutage 
            ? 'bg-rose-950/60 border-rose-600 text-rose-200' 
            : 'bg-slate-900/80 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center space-x-3">
            <Server className={`w-5 h-5 ${isTelecomOutage ? 'text-rose-400' : 'text-slate-500'}`} />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">UNDERGROUND MUNICIPAL FIBER</span>
              <span className="font-bold text-sm">
                {isTelecomOutage ? 'SEVERED (CONDUIT FLOODED)' : 'INTERMITTENT TRUNK LINK'}
              </span>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            isTelecomOutage ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            {isTelecomOutage ? 'SEVERED' : '52% TRUNK'}
          </span>
        </div>

        {/* Decentralized LoRa Mesh Status */}
        <div className="p-4 rounded-lg bg-emerald-950/70 border border-emerald-500 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-emerald-300 block uppercase">DECENTRALIZED 868MHZ LORA</span>
              <span className="font-bold text-emerald-200 text-sm">100% OPERATIONAL MESH</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white animate-pulse">
            AUTONOMOUS
          </span>
        </div>
      </div>

      {/* Interactive Visual Network Topology Map Diagram */}
      <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>DECENTRALIZED MULTI-HOP LORA MESH TOPOLOGY</span>
          </h2>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Average Packet Latency: 240 ms (3 Hops)
          </span>
        </div>

        {/* Diagram Nodes Flow */}
        <div className="p-5 rounded bg-[#080d16] border border-slate-800/90 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-xs font-mono">
            {/* Node 1 */}
            <div className="p-3 rounded bg-slate-900 border border-indigo-500/50 flex flex-col space-y-1">
              <div className="flex justify-between items-center text-indigo-400 font-bold">
                <span>NODE L-01</span>
                <span className="text-[10px] text-emerald-400">96% BAT</span>
              </div>
              <span className="text-white font-bold font-sans">North River Basin</span>
              <span className="text-[10px] text-slate-400">Gauge G-01 Ingest</span>
              <span className="text-[10px] text-amber-300">-72 dBm (Strong)</span>
            </div>

            <div className="hidden md:flex flex-col items-center text-indigo-400">
              <span className="text-[9px] mb-0.5">868.1 MHz</span>
              <div className="w-full h-0.5 bg-indigo-500/60 relative">
                <div className="absolute top-0 left-0 h-full w-3 bg-cyan-400 animate-water-flow"></div>
              </div>
              <span className="text-[9px] mt-0.5">Peer Hop</span>
            </div>

            {/* Node 2 */}
            <div className="p-3 rounded bg-slate-900 border border-indigo-500/50 flex flex-col space-y-1">
              <div className="flex justify-between items-center text-indigo-400 font-bold">
                <span>NODE L-02</span>
                <span className="text-[10px] text-emerald-400">91% BAT</span>
              </div>
              <span className="text-white font-bold font-sans">North Ridge Relay</span>
              <span className="text-[10px] text-slate-400">Solar + LiFePO4 Pack</span>
              <span className="text-[10px] text-amber-300">-68 dBm (Strong)</span>
            </div>

            <div className="hidden md:flex flex-col items-center text-indigo-400">
              <span className="text-[9px] mb-0.5">868.3 MHz</span>
              <div className="w-full h-0.5 bg-indigo-500/60 relative">
                <div className="absolute top-0 left-0 h-full w-3 bg-cyan-400 animate-water-flow"></div>
              </div>
              <span className="text-[9px] mt-0.5">Peer Hop</span>
            </div>

            {/* Central EOC Hub */}
            <div className="p-3 rounded bg-indigo-950/70 border border-indigo-400 flex flex-col space-y-1">
              <div className="flex justify-between items-center text-amber-400 font-bold">
                <span>EOC HUB</span>
                <span className="text-[10px] text-emerald-400">GATEWAY</span>
              </div>
              <span className="text-white font-bold font-sans">Municipal Command</span>
              <span className="text-[10px] text-slate-300">Dual Concentrator SX1302</span>
              <span className="text-[10px] text-emerald-400">0.0% Packet Drop</span>
            </div>
          </div>

          {/* Alert Callout for Outage Rerouting */}
          {isTelecomOutage && (
            <div className="mt-4 p-3 rounded bg-rose-950/80 border border-rose-600 text-xs font-mono text-rose-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>
                  <strong>TELECOM SEVERED ALERT:</strong> Cellular IP links unreachable. Mesh routing algorithm has promoted Node L-02 and L-03 to master forwarding relays. All 48 water sensors and 9 shelters are streaming real-time heartbeat packets over 868MHz.
                </span>
              </div>
              <span className="text-emerald-400 font-bold ml-4">100% DELIVERY</span>
            </div>
          )}
        </div>
      </div>

      {/* 2 Columns: LoRa Nodes Telemetry Table & Float Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LoRa Nodes Telemetry Table */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
              5 DEDICATED LORA MESH REPEATERS
            </h3>
            <span className="text-xs font-mono text-slate-400">Heartbeat: 10s Interval</span>
          </div>

          <div className="space-y-2.5">
            {commNodes.map((node) => (
              <div 
                key={node.id}
                className="p-3 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-indigo-400">{node.id}</span>
                    <span className="font-bold text-white font-sans">{node.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Signal: <strong className="text-slate-200">{node.signalDbm} dBm</strong> • Loss: <strong className="text-emerald-400">{node.packetLossPct}%</strong>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-emerald-400 font-bold block">{node.batteryPct}% Battery</span>
                  <span className="text-slate-500 text-[10px]">Ping {node.lastPing}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Float Gauges Real-Time Telemetry */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                ULTRASONIC & FLOAT GAUGES (G-01 to G-03)
              </h3>
              <span className="text-xs font-mono text-cyan-400 font-bold">Acoustic Doppler</span>
            </div>

            <div className="space-y-3">
              {floatGauges.map((g) => (
                <div 
                  key={g.id}
                  className="p-3.5 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-amber-400">{g.id}</span>
                      <span className="font-bold text-white font-sans text-xs">{g.location}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      g.status === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      g.status === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {g.status}
                    </span>
                  </div>

                  <div className="flex justify-between pt-1 text-slate-300">
                    <span>Current Water Height: <strong className="text-white text-sm">{g.level}</strong></span>
                    <span className="text-rose-400 font-semibold">{g.rate}</span>
                  </div>

                  <div className="text-[10px] text-slate-500 flex justify-between pt-1 border-t border-slate-800/80">
                    <span>Uplink via LoRa Node: <strong>{g.loraNode}</strong></span>
                    <span>Sampling: 1 Hz continuous</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] font-mono text-slate-400">
            <span>Redundant solar float telemetry</span>
            <span className="text-emerald-400">All 3 Gauges Transmitting</span>
          </div>
        </div>
      </div>
    </div>
  );
};
