import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  ScreenId, 
  NeighbourhoodData, 
  Asset, 
  Shelter, 
  MedicalTent, 
  Incident, 
  AlertItem, 
  AlertSeverity,
  RoadSegment, 
  OutfallPoint, 
  CommNode, 
  BudgetIntervention, 
  RecentOperation, 
  DispatchRecord,
  ImageAssessment
} from '../types';
import { 
  INITIAL_NEIGHBOURHOODS, 
  INITIAL_ASSETS, 
  INITIAL_SHELTERS, 
  INITIAL_MEDICAL_TENTS, 
  INITIAL_INCIDENTS, 
  INITIAL_ALERTS, 
  INITIAL_ROADS, 
  INITIAL_OUTFALLS, 
  INITIAL_COMM_NODES, 
  BUDGET_PACKAGES, 
  INITIAL_OPERATIONS, 
  INITIAL_DISPATCHES 
} from '../data/initialData';
import { INITIAL_IMAGE_ASSESSMENTS } from '../data/mockImageAssessments';

export type SyncState = 'SYNCED' | 'LOCAL_MODE' | 'RESTORING' | 'SYNCED_NOTIFICATION';
export type ScenarioStage = 'NORMAL' | 'WATCH' | 'ESCALATING' | 'CRITICAL' | 'EMERGENCY';

interface SystemStats {
  simulatedTime: string;
  simulatedDate: string;
  commercialNetworkStatus: 'OPERATIONAL' | 'OFFLINE';
  loraMeshStatus: string;
  gridStatus: 'UNSTABLE' | 'DEGRADED';
  decentralizedPowerStatus: string;
  lastDataSyncSec: number;
  messagesQueued: number;
  messagesReceived: number;
  totalRiskPopulation: number;
  totalEvacuated: number;
  overallShelterOccupancyPct: number;
  totalActivePumps: string;
  blockedRoadCount: number;
  totalRoadCount: number;
  unacknowledgedAlertsCount: number;
}

interface CommandContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  neighbourhoods: NeighbourhoodData[];
  assets: Asset[];
  shelters: Shelter[];
  medicalTents: MedicalTent[];
  incidents: Incident[];
  alerts: AlertItem[];
  roads: RoadSegment[];
  outfalls: OutfallPoint[];
  commNodes: CommNode[];
  budgetPackages: BudgetIntervention[];
  recentOperations: RecentOperation[];
  dispatches: DispatchRecord[];
  
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
  selectedNeighbourhoodId: 'north' | 'central' | 'south' | null;
  setSelectedNeighbourhoodId: (id: 'north' | 'central' | 'south' | null) => void;
  
  // Offline & Synchronization
  isOnline: boolean;
  toggleOnlineOffline: () => void;
  syncState: SyncState;
  pendingSyncCount: number;
  lastSyncTime: string;
  syncNow: () => void;
  
  // Scenario & Telecom
  isScenarioRunning: boolean;
  scenarioStage: ScenarioStage;
  setScenarioStage: (stage: ScenarioStage) => void;
  isTelecomOutage: boolean;
  systemStats: SystemStats;
  
  // Actions
  runFloodScenario: () => void;
  resetScenario: () => void;
  resetSimulation: () => void;
  toggleTelecomOutage: () => void;
  addAlert: (message: string, severity?: AlertSeverity, sector?: string) => void;
  addRecentOperation: (message: string, type?: RecentOperation['type'], sector?: string) => void;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  acknowledgeAllAlerts: () => void;
  togglePump: (assetId: string) => void;
  deployResource: (
    resource: string, 
    origin: string, 
    destination: string, 
    priority: 'CRITICAL' | 'HIGH' | 'STANDARD', 
    assignedTeam: string
  ) => void;
  updateShelterOccupancy: (shelterId: string, delta: number) => void;
  
  // Image Assessments
  imageAssessments: ImageAssessment[];
  addImageAssessment: (assessment: ImageAssessment) => void;
  updateImageAssessment: (id: string, updates: Partial<ImageAssessment>) => void;
  addImageToMap: (assessmentId: string) => void;
  createIncidentFromAssessment: (assessmentId: string) => void;

  // Demo & Guidance
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  isFirstTimeUser: boolean;
  dismissFirstTimeOverlay: () => void;
  reopenFirstTimeOverlay: () => void;
  activeHelpTopic: string | null;
  setActiveHelpTopic: (topic: string | null) => void;
  isHowToUseOpen: boolean;
  setIsHowToUseOpen: (open: boolean) => void;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

// Helper to safely load from localStorage
function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

// Helper to safely write to localStorage
function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing ${key} to storage:`, err);
  }
}

export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('command-center');
  
  // Persistent operational data
  const [neighbourhoods, setNeighbourhoods] = useState<NeighbourhoodData[]>(() => 
    getStoredItem('mfc_neighbourhoods', INITIAL_NEIGHBOURHOODS)
  );
  const [assets, setAssets] = useState<Asset[]>(() => 
    getStoredItem('mfc_assets', INITIAL_ASSETS)
  );
  const [shelters, setShelters] = useState<Shelter[]>(() => 
    getStoredItem('mfc_shelters', INITIAL_SHELTERS)
  );
  const [medicalTents, setMedicalTents] = useState<MedicalTent[]>(() => 
    getStoredItem('mfc_medical_tents', INITIAL_MEDICAL_TENTS)
  );
  const [incidents, setIncidents] = useState<Incident[]>(() => 
    getStoredItem('mfc_incidents', INITIAL_INCIDENTS)
  );
  const [alerts, setAlerts] = useState<AlertItem[]>(() => 
    getStoredItem('mfc_alerts', INITIAL_ALERTS)
  );
  const [roads, setRoads] = useState<RoadSegment[]>(() => 
    getStoredItem('mfc_roads', INITIAL_ROADS)
  );
  const [outfalls, setOutfalls] = useState<OutfallPoint[]>(() => 
    getStoredItem('mfc_outfalls', INITIAL_OUTFALLS)
  );
  const [commNodes, setCommNodes] = useState<CommNode[]>(() => 
    getStoredItem('mfc_comm_nodes', INITIAL_COMM_NODES)
  );
  const [budgetPackages] = useState<BudgetIntervention[]>(BUDGET_PACKAGES);
  const [recentOperations, setRecentOperations] = useState<RecentOperation[]>(() => 
    getStoredItem('mfc_operations', INITIAL_OPERATIONS)
  );
  const [dispatches, setDispatches] = useState<DispatchRecord[]>(() => 
    getStoredItem('mfc_dispatches', INITIAL_DISPATCHES)
  );
  const [imageAssessments, setImageAssessments] = useState<ImageAssessment[]>(() => 
    getStoredItem('mfc_image_assessments', INITIAL_IMAGE_ASSESSMENTS)
  );

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedNeighbourhoodId, setSelectedNeighbourhoodId] = useState<'north' | 'central' | 'south' | null>(null);
  
  // Offline & Synchronization State
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [syncState, setSyncState] = useState<SyncState>(() => {
    return (typeof navigator !== 'undefined' && !navigator.onLine) ? 'LOCAL_MODE' : 'SYNCED';
  });
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(() => 
    getStoredItem('mfc_pending_sync', 0)
  );
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => 
    getStoredItem('mfc_last_sync_time', '09:42')
  );

  // Scenario and telecom outage
  const [isScenarioRunning, setIsScenarioRunning] = useState<boolean>(false);
  const [scenarioStage, setScenarioStage] = useState<ScenarioStage>('CRITICAL');
  const [isTelecomOutage, setIsTelecomOutage] = useState<boolean>(false);

  // Demo & Guidance State
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => 
    getStoredItem('mfc_demo_mode', false)
  );
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(() => {
    return getStoredItem('mfc_first_time_seen', false) === false;
  });
  const [activeHelpTopic, setActiveHelpTopic] = useState<string | null>(null);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState<boolean>(false);

  // Unique ID generator
  const generateUniqueId = useCallback((prefix: string) => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    setStoredItem('mfc_neighbourhoods', neighbourhoods);
  }, [neighbourhoods]);

  useEffect(() => {
    setStoredItem('mfc_assets', assets);
  }, [assets]);

  useEffect(() => {
    setStoredItem('mfc_shelters', shelters);
  }, [shelters]);

  useEffect(() => {
    setStoredItem('mfc_incidents', incidents);
  }, [incidents]);

  useEffect(() => {
    setStoredItem('mfc_alerts', alerts);
  }, [alerts]);

  useEffect(() => {
    setStoredItem('mfc_roads', roads);
  }, [roads]);

  useEffect(() => {
    setStoredItem('mfc_operations', recentOperations);
  }, [recentOperations]);

  useEffect(() => {
    setStoredItem('mfc_dispatches', dispatches);
  }, [dispatches]);

  useEffect(() => {
    setStoredItem('mfc_image_assessments', imageAssessments);
  }, [imageAssessments]);

  useEffect(() => {
    setStoredItem('mfc_pending_sync', pendingSyncCount);
  }, [pendingSyncCount]);

  useEffect(() => {
    setStoredItem('mfc_demo_mode', isDemoMode);
  }, [isDemoMode]);

  // Record a local action when offline
  const recordLocalAction = useCallback(() => {
    if (!isOnline) {
      setPendingSyncCount(prev => prev + 1);
    }
  }, [isOnline]);

  // Network online/offline event listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncState('RESTORING');
      
      // Complete sync sequence
      setTimeout(() => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setLastSyncTime(timeStr);
        setStoredItem('mfc_last_sync_time', timeStr);
        setPendingSyncCount(0);
        setSyncState('SYNCED_NOTIFICATION');
        
        setTimeout(() => {
          setSyncState('SYNCED');
        }, 3500);
      }, 2500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncState('LOCAL_MODE');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Manual toggle for testing/simulation
  const toggleOnlineOffline = useCallback(() => {
    if (isOnline) {
      setIsOnline(false);
      setSyncState('LOCAL_MODE');
    } else {
      setIsOnline(true);
      setSyncState('RESTORING');
      setTimeout(() => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setLastSyncTime(timeStr);
        setStoredItem('mfc_last_sync_time', timeStr);
        setPendingSyncCount(0);
        setSyncState('SYNCED_NOTIFICATION');
        setTimeout(() => {
          setSyncState('SYNCED');
        }, 3500);
      }, 2500);
    }
  }, [isOnline]);

  // Manual Sync trigger
  const syncNow = useCallback(() => {
    if (!isOnline) return;
    setSyncState('RESTORING');
    setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setLastSyncTime(timeStr);
      setStoredItem('mfc_last_sync_time', timeStr);
      setPendingSyncCount(0);
      setSyncState('SYNCED_NOTIFICATION');
      setTimeout(() => {
        setSyncState('SYNCED');
      }, 3500);
    }, 2000);
  }, [isOnline]);

  // Ticker for simulated clock and telemetry
  const [timeSeconds, setTimeSeconds] = useState<number>(33240); // 09:14 AM
  const [dataSyncSec, setDataSyncSec] = useState<number>(4);
  const [messagesReceived, setMessagesReceived] = useState<number>(8492);
  const [messagesQueued, setMessagesQueued] = useState<number>(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSeconds(prev => prev + 1);
      setDataSyncSec(prev => (prev > 15 ? 1 : prev + 1));
      if (Math.random() > 0.4) {
        setMessagesReceived(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeSeconds / 3600) % 24;
  const minutes = Math.floor((timeSeconds % 3600) / 60);
  const seconds = timeSeconds % 60;
  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} IST`;
  const dateString = '19 SEP 2026';

  // Computed summary metrics
  const totalRiskPopulation = neighbourhoods.reduce((acc, n) => acc + n.populationAtRisk, 0);
  const totalEvacuated = neighbourhoods.reduce((acc, n) => acc + n.evacuated, 0);
  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const totalOccupancy = shelters.reduce((acc, s) => acc + s.currentOccupancy, 0);
  const overallShelterOccupancyPct = Math.round((totalOccupancy / totalCapacity) * 100);
  
  const activePumpsCount = assets.filter(a => a.category === 'Solar-battery submersible pump' && a.status === 'Active').length;
  const totalPumps = 48;
  const blockedRoadCount = roads.filter(r => r.status === 'BLOCKED').length;
  const unacknowledgedAlertsCount = alerts.filter(a => !a.acknowledged).length;

  const systemStats: SystemStats = {
    simulatedTime: timeString,
    simulatedDate: dateString,
    commercialNetworkStatus: isTelecomOutage ? 'OFFLINE' : 'OPERATIONAL',
    loraMeshStatus: isTelecomOutage ? 'ONLINE (48/48 NODES) [OFFLINE MESH MODE]' : 'ONLINE (48/48 NODES)',
    gridStatus: 'UNSTABLE',
    decentralizedPowerStatus: '100% OPERATIONAL',
    lastDataSyncSec: dataSyncSec,
    messagesQueued: isTelecomOutage ? messagesQueued + 28 : messagesQueued,
    messagesReceived,
    totalRiskPopulation,
    totalEvacuated,
    overallShelterOccupancyPct,
    totalActivePumps: `${activePumpsCount + 38}/${totalPumps}`,
    blockedRoadCount,
    totalRoadCount: roads.length,
    unacknowledgedAlertsCount,
  };

  // Safe deduplicated alert appender
  const appendAlerts = useCallback((newItems: AlertItem[]) => {
    setAlerts(prev => {
      const seen = new Set<string>();
      const combined = [...newItems, ...prev];
      const deduplicated: AlertItem[] = [];
      for (const item of combined) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          deduplicated.push(item);
        }
      }
      return deduplicated;
    });
    recordLocalAction();
  }, [recordLocalAction]);

  // Safe deduplicated operation appender
  const appendOperations = useCallback((newItems: RecentOperation[]) => {
    setRecentOperations(prev => {
      const seen = new Set<string>();
      const combined = [...newItems, ...prev];
      const deduplicated: RecentOperation[] = [];
      for (const item of combined) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          deduplicated.push(item);
        }
      }
      return deduplicated;
    });
    recordLocalAction();
  }, [recordLocalAction]);

  // Run Flood Scenario: escalate conditions dynamically through progression
  const runFloodScenario = useCallback(() => {
    setIsScenarioRunning(true);
    setScenarioStage('EMERGENCY');
    
    // 1. Escalate water levels and risks
    setNeighbourhoods(prev => prev.map(n => {
      if (n.id === 'north') {
        return {
          ...n,
          waterLevel: 4.18,
          waterLevelDelta: '+0.58m/hr (SURGE)',
          floodDepth: 2.65,
          pumpCapacity: 95,
          shelterOccupancy: 96,
          roadAccess: 28,
          status: 'CRITICAL' as const,
          populationAtRisk: 31200,
          evacuated: 17800
        };
      }
      if (n.id === 'central') {
        return {
          ...n,
          waterLevel: 3.45,
          waterLevelDelta: '+0.34m/hr',
          floodDepth: 1.95,
          pumpCapacity: 98,
          shelterOccupancy: 91,
          roadAccess: 48,
          status: 'CRITICAL' as const,
          populationAtRisk: 26400,
          evacuated: 14600
        };
      }
      return {
        ...n,
        waterLevel: 2.10,
        waterLevelDelta: '+0.12m/hr',
        floodDepth: 0.95,
        shelterOccupancy: 79,
        status: 'HIGH' as const,
        evacuated: 4200
      };
    }));

    // 2. Block additional roads
    setRoads(prev => prev.map(r => {
      if (r.id === 'RD-03') {
        return { ...r, status: 'BLOCKED' as const, waterDepthCm: 110 };
      }
      return r;
    }));

    // 3. Fill shelters
    setShelters(prev => prev.map(s => {
      if (s.id === 'S-01') return { ...s, currentOccupancy: 2180, medicalReadiness: 'Strained' as const };
      if (s.id === 'S-04') return { ...s, currentOccupancy: 2890 };
      if (s.id === 'S-07') return { ...s, currentOccupancy: 1780 };
      return s;
    }));

    // 4. Trigger new high priority alerts
    const newAlerts: AlertItem[] = [
      {
        id: generateUniqueId('ALT-SCN'),
        severity: 'CRITICAL',
        title: 'North Canal Flood Wall Crest Exceeded',
        message: 'Intense flash surge breached Sector 3 earthen levee. Water entering residential sector at 0.58m/hr.',
        neighbourhood: 'North Meridian',
        timestamp: timeString,
        acknowledged: false,
        resolved: false
      },
      {
        id: generateUniqueId('ALT-SCN'),
        severity: 'HIGH',
        title: 'Central Arterial Subway concourse flood doors sealed',
        message: 'Subway water tight bulkheads deployed. High-capacity submersible cluster C-02 operating at 100% duty cycle.',
        neighbourhood: 'Central Meridian',
        timestamp: timeString,
        acknowledged: false,
        resolved: false
      }
    ];
    appendAlerts(newAlerts);

    appendOperations([
      {
        id: generateUniqueId('OP-SCN'),
        time: timeString.substring(0, 5),
        message: 'EMERGENCY SCENARIO ACTIVATED: Citywide flood surge initiated.',
        sector: 'Citywide',
        type: 'pump'
      }
    ]);

    recordLocalAction();
  }, [appendAlerts, appendOperations, generateUniqueId, recordLocalAction, timeString]);

  // Reset simulation to initial baseline
  const resetScenario = useCallback(() => {
    setIsScenarioRunning(false);
    setScenarioStage('NORMAL');
    setNeighbourhoods(INITIAL_NEIGHBOURHOODS);
    setAssets(INITIAL_ASSETS);
    setShelters(INITIAL_SHELTERS);
    setMedicalTents(INITIAL_MEDICAL_TENTS);
    setIncidents(INITIAL_INCIDENTS);
    setAlerts(INITIAL_ALERTS);
    setRoads(INITIAL_ROADS);
    setOutfalls(INITIAL_OUTFALLS);
    setCommNodes(INITIAL_COMM_NODES);
    setRecentOperations(INITIAL_OPERATIONS);
    setDispatches(INITIAL_DISPATCHES);
    setIsTelecomOutage(false);

    appendOperations([
      {
        id: generateUniqueId('OP-RST'),
        time: timeString.substring(0, 5),
        message: 'Scenario reset to initial baseline conditions.',
        sector: 'Citywide',
        type: 'pump'
      }
    ]);
  }, [appendOperations, generateUniqueId, timeString]);

  const toggleTelecomOutage = useCallback(() => {
    setIsTelecomOutage(prev => {
      const next = !prev;
      if (next) {
        appendAlerts([
          {
            id: generateUniqueId('ALT-NET'),
            severity: 'HIGH',
            title: 'Commercial Telecom Collapse - LoRa Mesh Fallback Active',
            message: 'Commercial 4G/5G base stations offline in North & Central sectors. Telemetry redirected to solar LoRa 868MHz mesh.',
            neighbourhood: 'Citywide',
            timestamp: timeString,
            acknowledged: false,
            resolved: false
          }
        ]);
      }
      recordLocalAction();
      return next;
    });
  }, [appendAlerts, generateUniqueId, recordLocalAction, timeString]);

  const addAlert = useCallback((message: string, severity: AlertSeverity = 'HIGH', sector: string = 'Citywide') => {
    const newAlert: AlertItem = {
      id: generateUniqueId('ALT-MAN'),
      severity,
      title: 'Manual Incident Alert',
      message,
      neighbourhood: (sector.includes('North') ? 'North Meridian' : sector.includes('Central') ? 'Central Meridian' : 'South Meridian') as any,
      timestamp: timeString,
      sector,
      acknowledged: false,
      resolved: false
    };
    appendAlerts([newAlert]);
  }, [appendAlerts, generateUniqueId, timeString]);

  const addRecentOperation = useCallback((message: string, type: RecentOperation['type'] = 'pump', sector: string = 'Citywide') => {
    appendOperations([
      {
        id: generateUniqueId('OP-MAN'),
        time: timeString.substring(0, 5),
        message,
        sector,
        type
      }
    ]);
  }, [appendOperations, generateUniqueId, timeString]);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
    recordLocalAction();
  }, [recordLocalAction]);

  const resolveAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true, acknowledged: true } : a));
    recordLocalAction();
  }, [recordLocalAction]);

  const acknowledgeAllAlerts = useCallback(() => {
    setAlerts(prev => prev.map(a => ({ ...a, acknowledged: true })));
    recordLocalAction();
  }, [recordLocalAction]);

  const togglePump = useCallback((assetId: string) => {
    setAssets(prev => prev.map(a => {
      if (a.id === assetId) {
        const nextStatus = a.status === 'Active' ? 'Standby' as any : 'Active';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
    recordLocalAction();
  }, [recordLocalAction]);

  const deployResource = useCallback((
    resource: string, 
    origin: string, 
    destination: string, 
    priority: 'CRITICAL' | 'HIGH' | 'STANDARD', 
    assignedTeam: string
  ) => {
    const newDispatch: DispatchRecord = {
      id: generateUniqueId('DSP'),
      resource,
      origin,
      destination,
      priority,
      assignedTeam,
      dispatchedAt: timeString.substring(0, 5),
      status: 'In Transit',
      etaMinutes: priority === 'CRITICAL' ? 8 : 15
    };
    setDispatches(prev => [newDispatch, ...prev]);
    appendOperations([
      {
        id: generateUniqueId('OP-DSP'),
        time: timeString.substring(0, 5),
        message: `Resource Deployed: ${resource} → ${destination} (${priority})`,
        sector: destination,
        type: resource.toLowerCase().includes('boat') ? 'boat' : 'mobility'
      }
    ]);
    recordLocalAction();
  }, [appendOperations, generateUniqueId, recordLocalAction, timeString]);

  const updateShelterOccupancy = useCallback((shelterId: string, delta: number) => {
    setShelters(prev => prev.map(s => {
      if (s.id === shelterId) {
        const nextOcc = Math.max(0, Math.min(s.capacity * 1.2, s.currentOccupancy + delta));
        return { ...s, currentOccupancy: nextOcc };
      }
      return s;
    }));
    recordLocalAction();
  }, [recordLocalAction]);

  // Image Assessments Handlers
  const addImageAssessment = useCallback((assessment: ImageAssessment) => {
    setImageAssessments(prev => [assessment, ...prev]);
    appendOperations([
      {
        id: generateUniqueId('OP-IMG'),
        time: assessment.timestamp || timeString.substring(0, 5),
        message: `Field Photo Analyzed (${assessment.analysisMode}): ${assessment.classification} at ${assessment.location}`,
        sector: assessment.neighbourhood,
        type: 'environment'
      }
    ]);
    recordLocalAction();
  }, [appendOperations, generateUniqueId, recordLocalAction, timeString]);

  const updateImageAssessment = useCallback((id: string, updates: Partial<ImageAssessment>) => {
    setImageAssessments(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    }));
    recordLocalAction();
  }, [recordLocalAction]);

  const addImageToMap = useCallback((assessmentId: string) => {
    setImageAssessments(prev => prev.map(item => {
      if (item.id === assessmentId) {
        // Assign coordinates if missing
        let coords = item.coordinates;
        if (!coords) {
          if (item.neighbourhood === 'North Meridian') coords = { x: 310, y: 140 };
          else if (item.neighbourhood === 'Central Meridian') coords = { x: 580, y: 310 };
          else coords = { x: 280, y: 520 };
        }
        return { ...item, addedToMap: true, coordinates: coords };
      }
      return item;
    }));

    const found = imageAssessments.find(a => a.id === assessmentId);
    if (found) {
      appendOperations([
        {
          id: generateUniqueId('OP-MAP'),
          time: timeString.substring(0, 5),
          message: `AI Flood Observation added to tactical GIS map: ${found.location}`,
          sector: found.neighbourhood,
          type: 'environment'
        }
      ]);
    }
    recordLocalAction();
  }, [appendOperations, generateUniqueId, imageAssessments, recordLocalAction, timeString]);

  const createIncidentFromAssessment = useCallback((assessmentId: string) => {
    const found = imageAssessments.find(a => a.id === assessmentId);
    if (!found) return;

    let coords = found.coordinates;
    if (!coords) {
      if (found.neighbourhood === 'North Meridian') coords = { x: 310, y: 140 };
      else if (found.neighbourhood === 'Central Meridian') coords = { x: 580, y: 310 };
      else coords = { x: 280, y: 520 };
    }

    const newIncident: Incident = {
      id: generateUniqueId('INC-IMG'),
      neighbourhood: found.neighbourhood,
      title: `AI Observation: ${found.classification} at ${found.location}`,
      location: found.location,
      description: `${found.visibleConditions.join(', ')}. Est depth: ${found.estimatedWaterDepth}. Action: ${found.recommendedAction}`,
      severity: (found.severity === 'LOW' ? 'MEDIUM' : found.severity) as 'CRITICAL' | 'HIGH' | 'MEDIUM',
      timestamp: timeString,
      status: 'ACTIVE',
      assignedUnit: 'Rapid Recon Squad 4',
      coordinates: coords
    };

    setIncidents(prev => [newIncident, ...prev]);

    appendAlerts([
      {
        id: generateUniqueId('ALT-IMG'),
        severity: found.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
        title: `AI Field Observation Incident: ${found.classification}`,
        message: `${found.location}: ${found.visibleConditions.join(', ')} (${found.confidence}% confidence). Action: ${found.recommendedAction}`,
        neighbourhood: found.neighbourhood,
        timestamp: timeString,
        acknowledged: false,
        resolved: false
      }
    ]);

    setImageAssessments(prev => prev.map(item => {
      if (item.id === assessmentId) {
        return { ...item, incidentCreated: true, addedToMap: true, coordinates: coords };
      }
      return item;
    }));

    recordLocalAction();
  }, [appendAlerts, generateUniqueId, imageAssessments, recordLocalAction, timeString]);

  // Demo Mode Toggle
  const toggleDemoMode = useCallback(() => {
    setIsDemoMode(prev => {
      const next = !prev;
      setStoredItem('mfc_demo_mode', next);
      return next;
    });
  }, []);

  // First Time User Overlay Handlers
  const dismissFirstTimeOverlay = useCallback(() => {
    setIsFirstTimeUser(false);
    setStoredItem('mfc_first_time_seen', true);
    setCurrentScreen('command-center');
  }, []);

  const reopenFirstTimeOverlay = useCallback(() => {
    setIsFirstTimeUser(true);
  }, []);

  return (
    <CommandContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      neighbourhoods,
      assets,
      shelters,
      medicalTents,
      incidents,
      alerts,
      roads,
      outfalls,
      commNodes,
      budgetPackages,
      recentOperations,
      dispatches,
      
      selectedAsset,
      setSelectedAsset,
      selectedNeighbourhoodId,
      setSelectedNeighbourhoodId,
      
      // Offline & Synchronization
      isOnline,
      toggleOnlineOffline,
      syncState,
      pendingSyncCount,
      lastSyncTime,
      syncNow,

      // Scenario & Telecom
      isScenarioRunning,
      scenarioStage,
      setScenarioStage,
      isTelecomOutage,
      systemStats,
      
      // Actions
      runFloodScenario,
      resetScenario,
      resetSimulation: resetScenario,
      toggleTelecomOutage,
      addAlert,
      addRecentOperation,
      acknowledgeAlert,
      resolveAlert,
      acknowledgeAllAlerts,
      togglePump,
      deployResource,
      updateShelterOccupancy,

      // Image Assessments
      imageAssessments,
      addImageAssessment,
      updateImageAssessment,
      addImageToMap,
      createIncidentFromAssessment,

      // Demo & Guidance
      isDemoMode,
      toggleDemoMode,
      isFirstTimeUser,
      dismissFirstTimeOverlay,
      reopenFirstTimeOverlay,
      activeHelpTopic,
      setActiveHelpTopic,
      isHowToUseOpen,
      setIsHowToUseOpen
    }}>
      {children}
    </CommandContext.Provider>
  );
};

export const useCommand = (): CommandContextType => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
};
