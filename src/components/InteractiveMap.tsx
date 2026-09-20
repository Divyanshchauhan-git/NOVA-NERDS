import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  MapPin, 
  Navigation2, 
  Waves, 
  Radio, 
  AlertTriangle, 
  ShieldCheck, 
  Anchor, 
  Maximize2 
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { Asset, NeighbourhoodData, Shelter, MedicalTent } from '../types';

interface MapProps {
  interactive?: boolean;
  heightClass?: string;
  showLayerToggles?: boolean;
  onSelectNeighbourhood?: (id: 'north' | 'central' | 'south') => void;
  selectedNeighbourhoodId?: 'north' | 'central' | 'south' | null;
}

export const InteractiveMap: React.FC<MapProps> = ({
  interactive = true,
  heightClass = "h-[480px]",
  showLayerToggles = true,
  onSelectNeighbourhood,
  selectedNeighbourhoodId
}) => {
  const { 
    neighbourhoods, 
    assets, 
    shelters, 
    medicalTents, 
    roads, 
    outfalls, 
    commNodes, 
    setSelectedAsset,
    isScenarioRunning,
    imageAssessments
  } = useCommand();

  // 13 layer toggle states
  const [layers, setLayers] = useState({
    floodDepth: true,
    waterSensors: true,
    pumps: true,
    shelters: true,
    hospitals: true,
    roads: true,
    boats: true,
    excavators: true,
    outfalls: true,
    industrialZones: true,
    communicationNetwork: true,
    evacuationRoutes: true,
    aiObservations: true,
  });

  const [hoveredEntity, setHoveredEntity] = useState<{
    name: string;
    type: string;
    status: string;
    details: string;
    x: number;
    y: number;
  } | null>(null);

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Convert SVG coordinates 0-1000 width, 0-800 height
  const getMarkerCoords = (c: { x: number; y: number }) => {
    return { x: c.x, y: c.y };
  };

  return (
    <div className={`relative w-full ${heightClass} bg-[#060a12] rounded-lg border border-slate-800/90 overflow-hidden select-none`}>
      {/* Top Map HUD & Controls */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        <div className="bg-[#0b111d]/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-800 flex items-center space-x-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          <span className="text-slate-300 font-bold uppercase tracking-wider">MERIDIAN TACTICAL GIS</span>
          <span className="text-slate-400">|</span>
          <span className="text-amber-400 font-bold">1:10,000 CONTOUR</span>
        </div>

        {/* Quick Zoom/Fit Indicator */}
        <div className="hidden sm:flex bg-[#0b111d]/90 backdrop-blur-md px-2.5 py-1.5 rounded border border-slate-800 text-[11px] font-mono text-slate-400 items-center space-x-2">
          <span>COORDS: 18°58′N 72°49′E</span>
        </div>
      </div>

      {/* Layer Toggles Panel (if enabled) */}
      {showLayerToggles && (
        <div className="absolute bottom-3 left-3 z-10 max-w-[calc(100%-24px)] flex flex-wrap gap-1.5 bg-[#080d16]/95 backdrop-blur-md p-2 rounded-md border border-slate-800/90 text-[10px] font-mono shadow-xl">
          <div className="flex items-center space-x-1 px-1.5 text-slate-400 font-bold uppercase">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>LAYERS:</span>
          </div>

          {[
            { key: 'floodDepth', label: 'Flood Depth', color: 'text-rose-400' },
            { key: 'pumps', label: 'Pumps', color: 'text-amber-400' },
            { key: 'shelters', label: 'Shelters', color: 'text-emerald-400' },
            { key: 'hospitals', label: 'Medical', color: 'text-red-400' },
            { key: 'roads', label: 'Roads', color: 'text-slate-300' },
            { key: 'boats', label: 'Boats', color: 'text-cyan-300' },
            { key: 'excavators', label: 'Excavators', color: 'text-orange-400' },
            { key: 'outfalls', label: 'Outfalls', color: 'text-teal-400' },
            { key: 'communicationNetwork', label: 'LoRa Mesh', color: 'text-indigo-400' },
            { key: 'evacuationRoutes', label: 'Evac Routes', color: 'text-lime-400' },
            { key: 'aiObservations', label: 'AI Observations', color: 'text-sky-400' },
          ].map((l) => {
            const active = layers[l.key as keyof typeof layers];
            return (
              <button
                key={l.key}
                onClick={() => toggleLayer(l.key as keyof typeof layers)}
                className={`px-2 py-0.5 rounded flex items-center space-x-1 border transition-all ${
                  active 
                    ? 'bg-slate-800 border-slate-600 text-slate-100 font-bold shadow-xs' 
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 opacity-60 hover:opacity-100'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${active ? l.color.replace('text-', 'bg-') : 'bg-slate-600'}`}></span>
                <span>{l.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* SVG Canvas Map */}
      <svg 
        viewBox="0 0 1000 800" 
        className="w-full h-full object-cover cursor-crosshair"
      >
        <defs>
          {/* Grid pattern for GIS feeling */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#131c2e" strokeWidth="0.8" />
          </pattern>

          {/* Radial Gradients for flood inundation zones */}
          <radialGradient id="northFloodGlow" cx="40%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={isScenarioRunning ? "0.45" : "0.32"} />
            <stop offset="60%" stopColor="#b91c1c" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.0" />
          </radialGradient>

          <radialGradient id="centralFloodGlow" cx="65%" cy="45%" r="45%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={isScenarioRunning ? "0.38" : "0.25"} />
            <stop offset="70%" stopColor="#d97706" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.0" />
          </radialGradient>

          <radialGradient id="southFloodGlow" cx="35%" cy="70%" r="45%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* Tactical Grid Background */}
        <rect width="1000" height="800" fill="#070c16" />
        <rect width="1000" height="800" fill="url(#grid)" />

        {/* Coastline & Estuary Water Basin */}
        <path 
          d="M 0,0 L 50,0 C 80,180 30,340 70,520 C 110,700 160,740 160,800 L 0,800 Z"
          fill="#0c1726" 
          stroke="#1e3a5f" 
          strokeWidth="1.5"
        />

        {/* Main Meridian River / Central Canal Corridor */}
        <path 
          d="M 440,0 C 420,120 400,240 470,300 C 530,350 630,420 620,530 C 600,660 520,740 480,800" 
          fill="none" 
          stroke="#1e3a5f" 
          strokeWidth="24" 
          strokeLinecap="round"
        />
        <path 
          d="M 440,0 C 420,120 400,240 470,300 C 530,350 630,420 620,530 C 600,660 520,740 480,800" 
          fill="none" 
          stroke="#38bdf8" 
          strokeWidth="3.5" 
          className="animate-water-flow"
        />

        {/* East Industrial Runoff Branch */}
        <path 
          d="M 470,300 C 580,290 720,280 860,280" 
          fill="none" 
          stroke="#162c46" 
          strokeWidth="12" 
        />
        <path 
          d="M 470,300 C 580,290 720,280 860,280" 
          fill="none" 
          stroke="#0284c7" 
          strokeWidth="2" 
          strokeDasharray="6 4"
        />

        {/* 3 NEIGHBOURHOOD POLYGON BOUNDARIES */}
        {neighbourhoods.map((n) => {
          const isSelected = selectedNeighbourhoodId === n.id;
          const strokeColor = n.status === 'CRITICAL' ? '#ef4444' : n.status === 'HIGH' ? '#f59e0b' : '#38bdf8';
          const fillGrad = n.id === 'north' ? 'url(#northFloodGlow)' : n.id === 'central' ? 'url(#centralFloodGlow)' : 'url(#southFloodGlow)';

          return (
            <g key={n.id} className="transition-all duration-300">
              {/* Regional Fill & Hover Zone */}
              <path
                d={n.polygon}
                fill={layers.floodDepth ? fillGrad : '#0d1524'}
                stroke={strokeColor}
                strokeWidth={isSelected ? "3" : "1.8"}
                strokeDasharray={isSelected ? "none" : "8 3"}
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => onSelectNeighbourhood && onSelectNeighbourhood(n.id)}
                onMouseEnter={() => setHoveredEntity({
                  name: n.name,
                  type: `Neighbourhood (${n.status} Risk)`,
                  status: `Water: ${n.waterLevel}m (${n.waterLevelDelta})`,
                  details: `Pop at Risk: ${n.populationAtRisk.toLocaleString()} | Evacuated: ${n.evacuated.toLocaleString()}`,
                  x: n.centerCoords.x,
                  y: n.centerCoords.y
                })}
                onMouseLeave={() => setHoveredEntity(null)}
              />

              {/* Neighbourhood Label Banner */}
              <g transform={`translate(${n.centerCoords.x - 70}, ${n.centerCoords.y - 45})`} pointerEvents="none">
                <rect 
                  width="140" 
                  height="26" 
                  rx="4" 
                  fill="#060c18" 
                  stroke={strokeColor} 
                  strokeWidth="1.2" 
                  opacity="0.9"
                />
                <text 
                  x="70" 
                  y="16" 
                  fill="#ffffff" 
                  fontSize="10" 
                  fontWeight="bold" 
                  textAnchor="middle" 
                  fontFamily="'Chakra Petch', sans-serif"
                  letterSpacing="1"
                >
                  {n.name.toUpperCase()}
                </text>
                <circle cx="14" cy="13" r="3.5" fill={strokeColor} />
              </g>
            </g>
          );
        })}

        {/* LAYER: Industrial Hazard Zones */}
        {layers.industrialZones && (
          <g>
            <rect 
              x="720" 
              y="220" 
              width="150" 
              height="100" 
              rx="6" 
              fill="#ef4444" 
              fillOpacity="0.08" 
              stroke="#ef4444" 
              strokeWidth="1" 
              strokeDasharray="4 4" 
            />
            <text x="730" y="240" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold">
              [CHEMICAL ZONE: HAZMAT 2]
            </text>
          </g>
        )}

        {/* LAYER: Evacuation Corridors */}
        {layers.evacuationRoutes && (
          <g stroke="#84cc16" strokeWidth="2" strokeDasharray="6 4" opacity="0.85">
            {/* North Evacuation Corridor */}
            <line x1="180" y1="120" x2="310" y2="140" />
            <line x1="310" y1="140" x2="440" y2="90" />
            {/* Central Evacuation Corridor */}
            <line x1="580" y1="310" x2="740" y2="340" />
            {/* South Evacuation Corridor */}
            <line x1="280" y1="520" x2="420" y2="590" />
          </g>
        )}

        {/* LAYER: Roads */}
        {layers.roads && (
          <g>
            {roads.map((road) => {
              const isBlocked = road.status === 'BLOCKED';
              const isCritical = road.status === 'CRITICAL_ARTERIAL';
              const strokeColor = isBlocked ? '#ef4444' : isCritical ? '#f59e0b' : '#334155';

              return (
                <g key={road.id}>
                  <line 
                    x1={road.coordinates.x1} 
                    y1={road.coordinates.y1} 
                    x2={road.coordinates.x2} 
                    y2={road.coordinates.y2} 
                    stroke={strokeColor} 
                    strokeWidth={isBlocked || isCritical ? "4.5" : "2.5"} 
                    strokeLinecap="round"
                    className="cursor-pointer hover:opacity-80"
                    onMouseEnter={() => setHoveredEntity({
                      name: road.name,
                      type: `Road Segment (${road.status})`,
                      status: `Water Depth: ${road.waterDepthCm} cm`,
                      details: `Alternative: ${road.alternativeRoute}`,
                      x: (road.coordinates.x1 + road.coordinates.x2) / 2,
                      y: (road.coordinates.y1 + road.coordinates.y2) / 2
                    })}
                    onMouseLeave={() => setHoveredEntity(null)}
                  />
                  {isBlocked && (
                    <circle 
                      cx={(road.coordinates.x1 + road.coordinates.x2) / 2} 
                      cy={(road.coordinates.y1 + road.coordinates.y2) / 2} 
                      r="6" 
                      fill="#ef4444" 
                      stroke="#ffffff" 
                      strokeWidth="1.2"
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* LAYER: Communication Mesh Lines (LoRa links) */}
        {layers.communicationNetwork && (
          <g stroke="#818cf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
            <line x1="620" y1="360" x2="240" y2="100" />
            <line x1="620" y1="360" x2="280" y2="520" />
            <line x1="240" y1="100" x2="220" y2="70" />
            <line x1="620" y1="360" x2="580" y2="310" />
            <line x1="240" y1="100" x2="380" y2="220" />
          </g>
        )}

        {/* LAYER: Outfalls */}
        {layers.outfalls && outfalls.map((o) => (
          <g 
            key={o.id} 
            transform={`translate(${o.coordinates.x}, ${o.coordinates.y})`}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredEntity({
              name: o.name,
              type: 'Outfall Treatment Skid',
              status: `Status: ${o.status} | Flow: ${o.flowM3h} m³/hr`,
              details: `Filtration: ${o.filtrationStatus} (Turbidity: ${o.turbidityNtu} NTU)`,
              x: o.coordinates.x,
              y: o.coordinates.y
            })}
            onMouseLeave={() => setHoveredEntity(null)}
            onClick={() => {
              const matchedAsset = assets.find(a => a.id.includes(o.id.replace('O-', 'OUTF-')));
              if (matchedAsset) setSelectedAsset(matchedAsset);
            }}
          >
            <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        ))}

        {/* LAYER: Shelters (S-01 to S-09) */}
        {layers.shelters && shelters.map((s) => {
          const occPct = Math.round((s.currentOccupancy / s.capacity) * 100);
          const color = occPct > 90 ? '#ef4444' : occPct > 75 ? '#f59e0b' : '#10b981';

          return (
            <g 
              key={s.id}
              transform={`translate(${s.coordinates.x}, ${s.coordinates.y})`}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredEntity({
                name: `${s.id}: ${s.name}`,
                type: `Vertical Shelter (${s.neighbourhood})`,
                status: `Occupancy: ${s.currentOccupancy}/${s.capacity} (${occPct}%)`,
                details: `Power: ${s.powerStatus} | Water: ${s.waterStockDays}d reserve | Food: ${s.foodStockDays}d`,
                x: s.coordinates.x,
                y: s.coordinates.y
              })}
              onMouseLeave={() => setHoveredEntity(null)}
            >
              <circle cx="0" cy="0" r="9" fill="#08101e" stroke={color} strokeWidth="2" />
              <rect x="-4" y="-4" width="8" height="8" rx="1.5" fill={color} />
              <text x="12" y="3" fill="#e2e8f0" fontSize="9" fontFamily="monospace" fontWeight="bold">
                {s.id}
              </text>
            </g>
          );
        })}

        {/* LAYER: Medical Tents & Hospitals */}
        {layers.hospitals && medicalTents.map((t) => (
          <g 
            key={t.id}
            transform={`translate(${t.coordinates.x}, ${t.coordinates.y})`}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredEntity({
              name: t.name,
              type: 'Mobile Medical Tent (Trauma Pod)',
              status: `Beds: ${t.occupiedBeds}/${t.surgeCapacity} occupied`,
              details: `${t.doctorsOnSite} doctors on-site • ${t.ambulancesReady} ambulances active`,
              x: t.coordinates.x,
              y: t.coordinates.y
            })}
            onMouseLeave={() => setHoveredEntity(null)}
          >
            <circle cx="0" cy="0" r="9" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
            <path d="M -4,0 L 4,0 M 0,-4 L 0,4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ))}

        {/* LAYER: Assets (Pumps, Boats, Excavators, LoRa nodes, Microgrids) */}
        {assets.map((asset) => {
          const isPump = asset.category === 'Solar-battery submersible pump';
          const isBoat = asset.category === 'Boat';
          const isExcavator = asset.category === 'Excavator';
          const isComm = asset.category === 'LoRa node';
          const isFloat = asset.category === 'Float gauge';

          if (isPump && !layers.pumps) return null;
          if (isBoat && !layers.boats) return null;
          if (isExcavator && !layers.excavators) return null;
          if (isFloat && !layers.waterSensors) return null;
          if (isComm && !layers.communicationNetwork) return null;

          const { x, y } = getMarkerCoords(asset.coordinates);
          const isWarning = asset.status === 'Warning';
          const isDeployed = asset.status === 'Deployed';

          return (
            <g
              key={asset.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer group"
              onClick={() => setSelectedAsset(asset)}
              onMouseEnter={() => setHoveredEntity({
                name: asset.name,
                type: asset.category,
                status: `Status: ${asset.status} (${asset.batteryFuel})`,
                details: `${asset.capacity} • ${asset.assignedTeam}`,
                x,
                y
              })}
              onMouseLeave={() => setHoveredEntity(null)}
            >
              {isWarning && (
                <circle cx="0" cy="0" r="14" fill="#f59e0b" fillOpacity="0.3" className="animate-ping" />
              )}
              {isPump && (
                <>
                  <circle cx="0" cy="0" r="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3" fill="#f59e0b" />
                </>
              )}
              {isBoat && (
                <>
                  <polygon points="0,-8 7,6 -7,6" fill="#0891b2" stroke="#67e8f9" strokeWidth="1.5" />
                  <circle cx="0" cy="1" r="2" fill="#ffffff" />
                </>
              )}
              {isExcavator && (
                <>
                  <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#d97706" stroke="#fde68a" strokeWidth="1.5" />
                  <path d="M-3,-3 L3,3" stroke="#000000" strokeWidth="1.5" />
                </>
              )}
              {isFloat && (
                <>
                  <circle cx="0" cy="0" r="7" fill="#0f172a" stroke="#ef4444" strokeWidth="2" className="animate-radar-critical" />
                  <circle cx="0" cy="0" r="2" fill="#ffffff" />
                </>
              )}
              {isComm && (
                <>
                  <circle cx="0" cy="0" r="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M-3,-1 L0,3 L3,-1" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                </>
              )}
            </g>
          );
        })}

        {/* LAYER: AI Flood Observations from Field Photographs */}
        {layers.aiObservations && imageAssessments.filter(obs => obs.addedToMap || obs.coordinates).map((obs) => {
          const coords = obs.coordinates || { x: 310, y: 140 };
          return (
            <g
              key={`obs-${obs.id}`}
              transform={`translate(${coords.x}, ${coords.y})`}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredEntity({
                name: `AI FLOOD OBSERVATION`,
                type: `${obs.location}`,
                status: `Severity: ${obs.severity} (${obs.classification})`,
                details: `Source: Field Image • Est Depth: ${obs.estimatedWaterDepth} • Time: ${obs.timestamp} • Mode: ${obs.analysisMode}`,
                x: coords.x,
                y: coords.y
              })}
              onMouseLeave={() => setHoveredEntity(null)}
            >
              <circle cx="0" cy="0" r="14" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,2" />
              <circle cx="0" cy="0" r="8" fill="#082f49" stroke="#0ea5e9" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#38bdf8" />
              <text x="11" y="3" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">
                AI-OBS
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Tactical Tooltip */}
      {hoveredEntity && (
        <div 
          className="absolute z-30 pointer-events-none bg-[#090f1c]/95 border border-slate-700/90 rounded-md p-3 shadow-2xl backdrop-blur-md max-w-xs text-xs font-mono"
          style={{
            left: `${Math.min(75, Math.max(10, (hoveredEntity.x / 1000) * 100))}%`,
            top: `${Math.min(75, Math.max(10, (hoveredEntity.y / 800) * 100))}%`
          }}
        >
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            {hoveredEntity.type}
          </div>
          <div className="font-bold text-white text-sm mt-0.5 font-display">
            {hoveredEntity.name}
          </div>
          <div className="text-emerald-400 font-semibold mt-1">
            {hoveredEntity.status}
          </div>
          <div className="text-slate-300 text-[11px] mt-1 border-t border-slate-800 pt-1">
            {hoveredEntity.details}
          </div>
          <div className="text-[9px] text-slate-500 mt-1">
            [CLICK MARKER FOR TELEMETRY & COMMAND CONTROLS]
          </div>
        </div>
      )}

      {/* Map Legend (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-10 bg-[#080d16]/95 backdrop-blur-md p-2.5 rounded border border-slate-800 text-[10px] font-mono text-slate-300 shadow-xl hidden md:block">
        <div className="font-bold text-slate-400 mb-1.5 uppercase tracking-wider text-[9px]">FLOOD DEPTH LEGEND</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-2 rounded bg-rose-600/80 border border-rose-500"></span>
            <span>&gt; 2.5m (Critical Inundation)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-2 rounded bg-amber-600/80 border border-amber-500"></span>
            <span>1.5m – 2.5m (High Surge)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-2 rounded bg-cyan-600/80 border border-cyan-500"></span>
            <span>&lt; 1.5m (Controlled Drainage)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
