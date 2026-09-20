export type ScreenId = 
  | 'command-center'
  | 'flood-map'
  | 'image-analysis'
  | 'neighbourhoods'
  | 'infrastructure'
  | 'people-shelters'
  | 'power-utilities'
  | 'mobility'
  | 'environment'
  | 'sensing-comms'
  | 'budget-deployment'
  | 'alerts'
  | 'settings';

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'STANDARD' | 'MEDIUM' | 'INFO';

export type AssetStatus = 'Active' | 'Warning' | 'Offline' | 'Deployed' | 'Needs Maintenance';

export type AssetCategory = 
  | 'Solar-battery submersible pump'
  | 'Flood barrier'
  | 'Outfall treatment skid'
  | 'Excavator'
  | 'Pontoon walkway'
  | 'Boat'
  | 'Amphibious vehicle'
  | 'Medical tent'
  | 'Microgrid'
  | 'Battery swap station'
  | 'Diesel backup generator'
  | 'Water treatment skid'
  | 'Containment boom'
  | 'LoRa node'
  | 'Float gauge';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  location: string;
  status: AssetStatus;
  capacity: string;
  batteryFuel: string;
  lastUpdate: string;
  assignedTeam: string;
  coordinates: { x: number; y: number }; // Relative 0-100 coords for vector GIS
  telemetry: {
    primaryMetric: string;
    secondaryMetric: string;
    runtimeHours: number;
    healthScore: number;
    notes: string;
  };
}

export interface NeighbourhoodData {
  id: 'north' | 'central' | 'south';
  name: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  status: 'CRITICAL' | 'HIGH' | 'MODERATE';
  waterLevel: number; // in meters (e.g. 3.42)
  waterLevelDelta: string; // e.g. "+0.38m/hr"
  floodDepth: number; // in meters (e.g. 1.85)
  rainfall3h: number; // mm
  pumpCapacity: number; // % active
  pumpActiveCount: string; // e.g. "18/20"
  shelterOccupancy: number; // %
  medicalCapacity: number; // %
  powerAvailability: number; // %
  roadAccess: number; // % passable
  commsStatus: 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE';
  populationAtRisk: number;
  evacuated: number;
  unaccounted: number;
  nearestShelter: string;
  nearestMedical: string;
  description: string;
  polygon: string; // SVG path for GIS render
  centerCoords: { x: number; y: number };
}

export interface Shelter {
  id: string; // e.g. S-01
  name: string;
  location: string;
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  capacity: number;
  currentOccupancy: number;
  foodStockDays: number;
  waterStockDays: number;
  medicalReadiness: 'Optimal' | 'Adequate' | 'Strained';
  powerStatus: 'Solar Microgrid' | 'Hybrid BSS' | 'Diesel Genset' | 'Grid Only';
  evacuationTeam: string;
  coordinates: { x: number; y: number };
}

export interface MedicalTent {
  id: string;
  name: string;
  location: string;
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  surgeCapacity: number; // beds
  occupiedBeds: number;
  doctorsOnSite: number;
  ambulancesReady: number;
  coordinates: { x: number; y: number };
}

export interface Incident {
  id: string;
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  title: string;
  location: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  timestamp: string;
  status: 'ACTIVE' | 'RESOLVED' | 'INVESTIGATING';
  assignedUnit?: string;
  coordinates?: { x: number; y: number };
}

export interface AlertItem {
  id: string;
  severity: Severity | AlertSeverity;
  title: string;
  message: string;
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian' | 'Citywide';
  timestamp: string;
  time?: string;
  sector?: string;
  acknowledged: boolean;
  resolved: boolean;
  relatedAssetId?: string;
}

export interface RoadSegment {
  id: string;
  name: string;
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  status: 'PASSABLE' | 'BLOCKED' | 'CRITICAL_ARTERIAL';
  waterDepthCm: number;
  alternativeRoute: string;
  coordinates: { x1: number; y1: number; x2: number; y2: number };
}

export interface OutfallPoint {
  id: string;
  name: string;
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  location: string;
  status: 'OPERATIONAL' | 'WARNING' | 'OFFLINE';
  flowM3h: number;
  turbidityNtu: number;
  chemicalPpm: number;
  ph?: number;
  filtrationStatus: 'Dual-stage active' | 'Backwash required' | 'Skid Offline' | 'Booms deployed';
  zeroDischargeCompliant: boolean;
  coordinates: { x: number; y: number };
}

export interface CommNode {
  id: string;
  name: string;
  type: 'LoRa Mesh Gateway' | 'Relay Node' | 'Float Gauge' | 'Hub Controller' | 'Runner Station';
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  status: 'ONLINE' | 'OFFLINE' | 'BATTERY_BACKUP';
  batteryPct: number;
  packetsRelayed: number;
  lastPingSec: number;
  signalDbm?: number;
  packetLossPct?: number;
  lastPing?: string;
  coordinates: { x: number; y: number };
}

export interface BudgetIntervention {
  id: string;
  code: string;
  category: 
    | 'Drainage & Flood Control'
    | 'People & Housing'
    | 'Power & Utilities'
    | 'Roads & Mobility'
    | 'Environment & Waste'
    | 'Sensing & Communication';
  name: string;
  allocationCr: number;
  deployedCr: number;
  operationalStatus: 'Operational' | 'Mobilized' | 'Standby' | 'Partial Deployment';
  specs: string;
  reviewFlag?: string;
}

export interface RecentOperation {
  id: string;
  time: string;
  message: string;
  sector: string;
  type: 'pump' | 'shelter' | 'boat' | 'road' | 'comms' | 'power' | 'environment' | 'mobility' | 'budget' | 'Finance';
}

export interface DispatchRecord {
  id: string;
  resource: string;
  origin: string;
  destination: string;
  priority: 'CRITICAL' | 'HIGH' | 'STANDARD';
  assignedTeam: string;
  dispatchedAt: string;
  status: 'In Transit' | 'On Scene' | 'Standby' | 'Completed';
  etaMinutes: number;
}

export type AnalysisMode = 'GEMINI AI' | 'OFFLINE SIMULATED ANALYSIS' | 'LOCAL MODEL (OFFLINE FALLBACK)';
export type VerificationStatus = 'Pending Verification' | 'Confirmed' | 'Edited' | 'Rejected';

export interface ImageAssessment {
  id: string; // e.g. "IMG-014"
  timestamp: string; // "09:37"
  location: string; // "North Meridian / Road R-07"
  neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian';
  classification: string; // "LIKELY IMPASSABLE", "PARTIALLY PASSABLE", "RESTRICTED ACCESS"
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  estimatedWaterDepth: string; // "0.5–0.8 m"
  visibleConditions: string[]; // ["Standing water", "Road debris", "Two stranded vehicles"]
  potentialHazards: string[]; // ["Electrical infrastructure nearby"]
  recommendedAction: string; // "Restrict vehicle access and dispatch assessment team."
  confidence: number; // 82 (%)
  analysisMode: AnalysisMode;
  verificationStatus: VerificationStatus;
  humanOverrideNotes?: string;
  originalAIAssessment?: string;
  imageUrl: string;
  addedToMap?: boolean;
  incidentCreated?: boolean;
  coordinates?: { x: number; y: number };
}

export interface HelpTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  operationalImpact: string;
}

