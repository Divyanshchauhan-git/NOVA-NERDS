import { 
  NeighbourhoodData, 
  Asset, 
  Shelter, 
  MedicalTent, 
  Incident, 
  AlertItem, 
  RoadSegment, 
  OutfallPoint, 
  CommNode, 
  BudgetIntervention,
  RecentOperation,
  DispatchRecord 
} from '../types';

export const INITIAL_NEIGHBOURHOODS: NeighbourhoodData[] = [
  {
    id: 'north',
    name: 'North Meridian',
    status: 'CRITICAL',
    waterLevel: 3.84,
    waterLevelDelta: '+0.42m/hr',
    floodDepth: 2.15,
    rainfall3h: 198,
    pumpCapacity: 85,
    pumpActiveCount: '17/20',
    shelterOccupancy: 91,
    medicalCapacity: 78,
    powerAvailability: 88,
    roadAccess: 42,
    commsStatus: 'OPERATIONAL',
    populationAtRisk: 28400,
    evacuated: 14200,
    unaccounted: 1150,
    nearestShelter: 'S-01 Northern Heights College',
    nearestMedical: 'T-01 North Sector Triage Tent',
    description: 'Low-lying basin adjacent to North Canal. Inundation affecting industrial zone and dense residential wards.',
    polygon: 'M 50,40 L 420,30 L 460,260 L 320,310 L 120,290 L 40,160 Z',
    centerCoords: { x: 240, y: 150 }
  },
  {
    id: 'central',
    name: 'Central Meridian',
    status: 'HIGH',
    waterLevel: 2.92,
    waterLevelDelta: '+0.21m/hr',
    floodDepth: 1.45,
    rainfall3h: 165,
    pumpCapacity: 92,
    pumpActiveCount: '15/16',
    shelterOccupancy: 82,
    medicalCapacity: 86,
    powerAvailability: 94,
    roadAccess: 64,
    commsStatus: 'OPERATIONAL',
    populationAtRisk: 22800,
    evacuated: 11400,
    unaccounted: 480,
    nearestShelter: 'S-04 Civic Centre Complex',
    nearestMedical: 'Meridian Central District Hospital',
    description: 'Commercial core and main transport junctions. Flash water surging across arterial corridors and underpasses.',
    polygon: 'M 460,260 L 850,220 L 890,480 L 640,540 L 320,310 Z',
    centerCoords: { x: 620, y: 360 }
  },
  {
    id: 'south',
    name: 'South Meridian',
    status: 'MODERATE',
    waterLevel: 1.76,
    waterLevelDelta: '+0.06m/hr',
    floodDepth: 0.65,
    rainfall3h: 122,
    pumpCapacity: 100,
    pumpActiveCount: '12/12',
    shelterOccupancy: 68,
    medicalCapacity: 95,
    powerAvailability: 98,
    roadAccess: 88,
    commsStatus: 'OPERATIONAL',
    populationAtRisk: 13600,
    evacuated: 2850,
    unaccounted: 90,
    nearestShelter: 'S-07 Coastal Maritime Academy',
    nearestMedical: 'T-03 South Mangrove Medical Unit',
    description: 'Coastal and mangrove buffer zone. Outfall gates venting stormwater under tidal surge control.',
    polygon: 'M 120,290 L 320,310 L 640,540 L 590,750 L 160,740 L 70,520 Z',
    centerCoords: { x: 340, y: 560 }
  }
];

export const INITIAL_SHELTERS: Shelter[] = [
  {
    id: 'S-01',
    name: 'Northern Heights Multipurpose Complex',
    location: 'Ward 4, North Meridian',
    neighbourhood: 'North Meridian',
    capacity: 2200,
    currentOccupancy: 2040,
    foodStockDays: 4.5,
    waterStockDays: 5.0,
    medicalReadiness: 'Optimal',
    powerStatus: 'Solar Microgrid',
    evacuationTeam: 'Alpha Rapid Rescue',
    coordinates: { x: 180, y: 120 }
  },
  {
    id: 'S-02',
    name: 'Govt. Polytechnic Tower',
    location: 'Sector 2B, North Meridian',
    neighbourhood: 'North Meridian',
    capacity: 1800,
    currentOccupancy: 1680,
    foodStockDays: 3.5,
    waterStockDays: 4.0,
    medicalReadiness: 'Adequate',
    powerStatus: 'Hybrid BSS',
    evacuationTeam: 'Bravo Water Evac',
    coordinates: { x: 310, y: 140 }
  },
  {
    id: 'S-03',
    name: 'St. Teresa Elevated Community Hall',
    location: 'Canal Ridge, North Meridian',
    neighbourhood: 'North Meridian',
    capacity: 1400,
    currentOccupancy: 1290,
    foodStockDays: 4.0,
    waterStockDays: 4.5,
    medicalReadiness: 'Strained',
    powerStatus: 'Solar Microgrid',
    evacuationTeam: 'Delta Citizen Guard',
    coordinates: { x: 230, y: 220 }
  },
  {
    id: 'S-04',
    name: 'Meridian Central Civic Centre',
    location: 'Metro Plaza, Central Meridian',
    neighbourhood: 'Central Meridian',
    capacity: 3000,
    currentOccupancy: 2540,
    foodStockDays: 6.0,
    waterStockDays: 6.5,
    medicalReadiness: 'Optimal',
    powerStatus: 'Solar Microgrid',
    evacuationTeam: 'Central Taskforce 1',
    coordinates: { x: 580, y: 310 }
  },
  {
    id: 'S-05',
    name: 'Dr. Ambedkar High School Stadium',
    location: 'Ring Road East, Central Meridian',
    neighbourhood: 'Central Meridian',
    capacity: 2500,
    currentOccupancy: 1980,
    foodStockDays: 5.0,
    waterStockDays: 5.5,
    medicalReadiness: 'Optimal',
    powerStatus: 'Hybrid BSS',
    evacuationTeam: 'Echo Response Unit',
    coordinates: { x: 740, y: 340 }
  },
  {
    id: 'S-06',
    name: 'Commerce Tower 4 Elevated Atrium',
    location: 'Financial enclave, Central Meridian',
    neighbourhood: 'Central Meridian',
    capacity: 1600,
    currentOccupancy: 1250,
    foodStockDays: 4.0,
    waterStockDays: 4.5,
    medicalReadiness: 'Adequate',
    powerStatus: 'Solar Microgrid',
    evacuationTeam: 'Foxtrot Civil Corps',
    coordinates: { x: 670, y: 440 }
  },
  {
    id: 'S-07',
    name: 'Coastal Maritime Academy Hall',
    location: 'Harbor Gate, South Meridian',
    neighbourhood: 'South Meridian',
    capacity: 2000,
    currentOccupancy: 1420,
    foodStockDays: 7.0,
    waterStockDays: 7.0,
    medicalReadiness: 'Optimal',
    powerStatus: 'Solar Microgrid',
    evacuationTeam: 'Gulf Marine Corps',
    coordinates: { x: 280, y: 520 }
  },
  {
    id: 'S-08',
    name: 'Fisheries Cooperative Elevated Centre',
    location: 'Creek Jetty, South Meridian',
    neighbourhood: 'South Meridian',
    capacity: 1300,
    currentOccupancy: 840,
    foodStockDays: 5.5,
    waterStockDays: 6.0,
    medicalReadiness: 'Adequate',
    powerStatus: 'Hybrid BSS',
    evacuationTeam: 'Hotel Volunteer Unit',
    coordinates: { x: 420, y: 590 }
  },
  {
    id: 'S-09',
    name: 'South Sports Pavilion',
    location: 'Green Park, South Meridian',
    neighbourhood: 'South Meridian',
    capacity: 1200,
    currentOccupancy: 610,
    foodStockDays: 6.0,
    waterStockDays: 6.5,
    medicalReadiness: 'Optimal',
    powerStatus: 'Solar Microgrid',
    evacuationTeam: 'India Rescue Cohort',
    coordinates: { x: 260, y: 670 }
  }
];

export const INITIAL_MEDICAL_TENTS: MedicalTent[] = [
  {
    id: 'T-01',
    name: 'Mobile Triage Unit North',
    location: 'Sector 3 Overpass, North Meridian',
    neighbourhood: 'North Meridian',
    surgeCapacity: 60,
    occupiedBeds: 48,
    doctorsOnSite: 6,
    ambulancesReady: 4,
    coordinates: { x: 270, y: 180 }
  },
  {
    id: 'T-02',
    name: 'Central Arterial Emergency Tent',
    location: 'Metro Corridor Junction, Central Meridian',
    neighbourhood: 'Central Meridian',
    surgeCapacity: 75,
    occupiedBeds: 54,
    doctorsOnSite: 8,
    ambulancesReady: 6,
    coordinates: { x: 530, y: 390 }
  },
  {
    id: 'T-03',
    name: 'South Shore Rapid Response Tent',
    location: 'Coast Road Causeway, South Meridian',
    neighbourhood: 'South Meridian',
    surgeCapacity: 45,
    occupiedBeds: 18,
    doctorsOnSite: 4,
    ambulancesReady: 3,
    coordinates: { x: 380, y: 640 }
  }
];

export const INITIAL_ASSETS: Asset[] = [
  // 1. Solar-battery submersible pumps
  {
    id: 'PMP-N01',
    name: 'Submersible Cluster North-01',
    category: 'Solar-battery submersible pump',
    neighbourhood: 'North Meridian',
    location: 'North Canal Intake Sluice',
    status: 'Active',
    capacity: '1,200 m³/hr',
    batteryFuel: '92% SoC (LiFePO4)',
    lastUpdate: '2 mins ago',
    assignedTeam: 'Engineers Unit 1',
    coordinates: { x: 190, y: 80 },
    telemetry: {
      primaryMetric: '1,180 m³/hr output',
      secondaryMetric: '48.2 V / 140 A',
      runtimeHours: 18.5,
      healthScore: 96,
      notes: 'Operating on dedicated solar-battery microgrid. Intake clear.'
    }
  },
  {
    id: 'PMP-N04',
    name: 'Submersible Cluster North-04',
    category: 'Solar-battery submersible pump',
    neighbourhood: 'North Meridian',
    location: 'Canal Low Basin #4',
    status: 'Active',
    capacity: '1,500 m³/hr',
    batteryFuel: '84% SoC',
    lastUpdate: 'Just now',
    assignedTeam: 'Engineers Unit 2',
    coordinates: { x: 260, y: 110 },
    telemetry: {
      primaryMetric: '1,440 m³/hr output',
      secondaryMetric: '49.1 V / 185 A',
      runtimeHours: 12.0,
      healthScore: 94,
      notes: 'Activated 08:42 to relieve residential basement inundation.'
    }
  },
  {
    id: 'PMP-C02',
    name: 'Central Arterial Sump Cluster',
    category: 'Solar-battery submersible pump',
    neighbourhood: 'Central Meridian',
    location: 'Underpass Metro Interchange',
    status: 'Active',
    capacity: '2,000 m³/hr',
    batteryFuel: '89% SoC',
    lastUpdate: '1 min ago',
    assignedTeam: 'Central Drain Crew',
    coordinates: { x: 610, y: 290 },
    telemetry: {
      primaryMetric: '1,920 m³/hr output',
      secondaryMetric: '52.0 V / 210 A',
      runtimeHours: 24.2,
      healthScore: 98,
      notes: 'High volume extraction keeping arterial underpass semi-drained.'
    }
  },
  {
    id: 'PMP-S01',
    name: 'South Estuary Pump Skid S-01',
    category: 'Solar-battery submersible pump',
    neighbourhood: 'South Meridian',
    location: 'Tidal Creek Gate 3',
    status: 'Active',
    capacity: '1,000 m³/hr',
    batteryFuel: '96% SoC',
    lastUpdate: '4 mins ago',
    assignedTeam: 'South Drainage Unit',
    coordinates: { x: 330, y: 620 },
    telemetry: {
      primaryMetric: '980 m³/hr output',
      secondaryMetric: '48.8 V / 115 A',
      runtimeHours: 8.4,
      healthScore: 99,
      notes: 'Continuous counter-tidal pumping.'
    }
  },

  // 2. Flood barriers
  {
    id: 'BAR-N01',
    name: 'Modular Inflatable Barrier N-Alpha',
    category: 'Flood barrier',
    neighbourhood: 'North Meridian',
    location: 'Industrial Canal West Berm',
    status: 'Active',
    capacity: '1.8m crest height (450m length)',
    batteryFuel: 'Pressure: 4.8 bar',
    lastUpdate: '5 mins ago',
    assignedTeam: 'Civil Defense Barrier Squad 1',
    coordinates: { x: 140, y: 150 },
    telemetry: {
      primaryMetric: '450m deployed',
      secondaryMetric: '0 leaks detected',
      runtimeHours: 16.0,
      healthScore: 95,
      notes: 'Defending pharmaceutical factory cluster from runoff.'
    }
  },
  {
    id: 'BAR-C02',
    name: 'Inflatable Flood Dam Central-02',
    category: 'Flood barrier',
    neighbourhood: 'Central Meridian',
    location: 'Civic Centre Subway Entrance',
    status: 'Active',
    capacity: '2.2m crest height (280m length)',
    batteryFuel: 'Pressure: 5.1 bar',
    lastUpdate: '8 mins ago',
    assignedTeam: 'Metro Safety Team',
    coordinates: { x: 570, y: 340 },
    telemetry: {
      primaryMetric: '280m sealed',
      secondaryMetric: 'Anchor tension nominal',
      runtimeHours: 22.0,
      healthScore: 98,
      notes: 'Sealed subterranean concourses.'
    }
  },

  // 3. Outfall treatment skids
  {
    id: 'OUTF-01',
    name: 'North Canal Outfall Skid O-01',
    category: 'Outfall treatment skid',
    neighbourhood: 'North Meridian',
    location: 'North Waterway Mile 2.4',
    status: 'Active',
    capacity: '3,200 m³/hr filtration',
    batteryFuel: 'Solar 100%',
    lastUpdate: '2 mins ago',
    assignedTeam: 'Env Eco-Scout 1',
    coordinates: { x: 380, y: 70 },
    telemetry: {
      primaryMetric: 'Turbidity: 18 NTU (Pass)',
      secondaryMetric: 'Zero hydrocarbon bypass',
      runtimeHours: 29.0,
      healthScore: 92,
      notes: 'Dual-stage disc filtration with coagulant injection.'
    }
  },
  {
    id: 'OUTF-02',
    name: 'Industrial Estuary Skid O-02',
    category: 'Outfall treatment skid',
    neighbourhood: 'Central Meridian',
    location: 'East Sluice Creek',
    status: 'Warning',
    capacity: '2,800 m³/hr filtration',
    batteryFuel: 'Solar 88%',
    lastUpdate: '1 min ago',
    assignedTeam: 'Env Eco-Scout 2',
    coordinates: { x: 820, y: 310 },
    telemetry: {
      primaryMetric: 'Turbidity: 46 NTU (Warning)',
      secondaryMetric: 'Filter backwash cycle in queue',
      runtimeHours: 36.5,
      healthScore: 74,
      notes: 'Silt loading high from upstream slope runoff. Automated flush initiated.'
    }
  },

  // 4. Excavators
  {
    id: 'EXC-01',
    name: 'Shared Heavy Track Excavator E-01',
    category: 'Excavator',
    neighbourhood: 'Central Meridian',
    location: 'Central Arterial Culvert 3',
    status: 'Deployed',
    capacity: '1.4 m³ bucket / 22-ton',
    batteryFuel: 'Diesel 76%',
    lastUpdate: 'Just now',
    assignedTeam: 'Emergency Public Works 1',
    coordinates: { x: 510, y: 330 },
    telemetry: {
      primaryMetric: 'Clearing culvert debris',
      secondaryMetric: '14 tons logs/trash removed',
      runtimeHours: 14.5,
      healthScore: 91,
      notes: 'Cleared arterial corridor at 09:04. Now widening ditch flow.'
    }
  },
  {
    id: 'EXC-02',
    name: 'Dedicated Amphibious Excavator E-02',
    category: 'Excavator',
    neighbourhood: 'North Meridian',
    location: 'North Silt Trap Basin',
    status: 'Active',
    capacity: '1.0 m³ bucket / Pontoon crawler',
    batteryFuel: 'Diesel 64%',
    lastUpdate: '10 mins ago',
    assignedTeam: 'Emergency Public Works 2',
    coordinates: { x: 210, y: 190 },
    telemetry: {
      primaryMetric: 'Dredging intake channel',
      secondaryMetric: 'Depth maintained: 2.8m',
      runtimeHours: 20.1,
      healthScore: 89,
      notes: 'Preventing sediment backflow into residential storm drains.'
    }
  },

  // 5. Pontoon walkways
  {
    id: 'PONT-01',
    name: 'Modular Floating Walkway PW-01',
    category: 'Pontoon walkway',
    neighbourhood: 'North Meridian',
    location: 'Sector 3 Residential Cut-off',
    status: 'Deployed',
    capacity: '800 persons/hr (320m span)',
    batteryFuel: 'Solar LED beacons 100%',
    lastUpdate: '6 mins ago',
    assignedTeam: 'Civil Defense Team 4',
    coordinates: { x: 290, y: 200 },
    telemetry: {
      primaryMetric: '320m span anchored',
      secondaryMetric: 'Footfall: 1,420 citizens',
      runtimeHours: 11.0,
      healthScore: 97,
      notes: 'Enabling pedestrian evacuation across flooded 1.6m deep avenue.'
    }
  },
  {
    id: 'PONT-02',
    name: 'Modular Floating Walkway PW-02',
    category: 'Pontoon walkway',
    neighbourhood: 'Central Meridian',
    location: 'Hospital Link Bridge Bypass',
    status: 'Deployed',
    capacity: '600 persons/hr (210m span)',
    batteryFuel: 'Solar LED beacons 100%',
    lastUpdate: '12 mins ago',
    assignedTeam: 'Civil Defense Team 2',
    coordinates: { x: 690, y: 380 },
    telemetry: {
      primaryMetric: '210m span anchored',
      secondaryMetric: 'Patient gurney compatible',
      runtimeHours: 15.0,
      healthScore: 100,
      notes: 'Connecting ambulance drop-off with hospital dry landing.'
    }
  },

  // 6. Boats
  {
    id: 'BOAT-B01',
    name: 'Rescue Zodiac B-01 (10-Person)',
    category: 'Boat',
    neighbourhood: 'North Meridian',
    location: 'North Sector 2 Flooded Enclave',
    status: 'Deployed',
    capacity: '10 evacuees / 800 kg',
    batteryFuel: 'Electric Outboard 72%',
    lastUpdate: '3 mins ago',
    assignedTeam: 'NDRF Boat Crew 1',
    coordinates: { x: 170, y: 190 },
    telemetry: {
      primaryMetric: '42 citizens transported',
      secondaryMetric: 'Speed: 7 knots',
      runtimeHours: 7.5,
      healthScore: 94,
      notes: 'Evacuating ground-floor residences along flooded low road.'
    }
  },
  {
    id: 'BOAT-B04',
    name: 'Rescue Zodiac B-04 (12-Person)',
    category: 'Boat',
    neighbourhood: 'North Meridian',
    location: 'Canal Ridge Ward',
    status: 'Deployed',
    capacity: '12 evacuees / 950 kg',
    batteryFuel: 'Electric Outboard 68%',
    lastUpdate: 'Just now',
    assignedTeam: 'NDRF Boat Crew 4',
    coordinates: { x: 250, y: 160 },
    telemetry: {
      primaryMetric: 'Deployed at 08:56',
      secondaryMetric: 'En route to care home',
      runtimeHours: 3.2,
      healthScore: 98,
      notes: 'Evacuating high-vulnerability elderly residents to Shelter S-03.'
    }
  },
  {
    id: 'BOAT-B06',
    name: 'Rapid Shallow Draft Skiff B-06',
    category: 'Boat',
    neighbourhood: 'Central Meridian',
    location: 'Central Plaza Marina Post',
    status: 'Active',
    capacity: '8 evacuees',
    batteryFuel: 'Electric Outboard 95%',
    lastUpdate: '7 mins ago',
    assignedTeam: 'Central Marine Reserve',
    coordinates: { x: 590, y: 410 },
    telemetry: {
      primaryMetric: 'Standby on arterial lake',
      secondaryMetric: 'Equipped with first-aid kits',
      runtimeHours: 5.0,
      healthScore: 100,
      notes: 'Ready for immediate dispatch.'
    }
  },

  // 7. Amphibious vehicles
  {
    id: 'AMPH-01',
    name: 'Amphibious All-Terrain Transporter A-01',
    category: 'Amphibious vehicle',
    neighbourhood: 'North Meridian',
    location: 'North Ring Highway Section',
    status: 'Deployed',
    capacity: '24 passengers / 2.5 ton freight',
    batteryFuel: 'Hybrid Fuel: 78%',
    lastUpdate: '4 mins ago',
    assignedTeam: 'Armed Forces Relief Platoon',
    coordinates: { x: 130, y: 90 },
    telemetry: {
      primaryMetric: 'Moving across 1.8m water',
      secondaryMetric: 'Transporting MRE rations',
      runtimeHours: 9.8,
      healthScore: 96,
      notes: 'Ferrying drinking water and dry blankets to Shelter S-01.'
    }
  },
  {
    id: 'AMPH-02',
    name: 'Amphibious All-Terrain Transporter A-02',
    category: 'Amphibious vehicle',
    neighbourhood: 'Central Meridian',
    location: 'Metro Plaza Staging Depot',
    status: 'Active',
    capacity: '24 passengers / 2.5 ton freight',
    batteryFuel: 'Hybrid Fuel: 92%',
    lastUpdate: '11 mins ago',
    assignedTeam: 'Civil Defense Heavy Mobility',
    coordinates: { x: 660, y: 260 },
    telemetry: {
      primaryMetric: 'Staged for evacuation wave',
      secondaryMetric: 'Equipped with winch & ramps',
      runtimeHours: 4.1,
      healthScore: 99,
      notes: 'Available for immediate dispatch to blocked sectors.'
    }
  },

  // 8. Medical tents
  {
    id: 'MED-T01',
    name: 'North Sector Rapid Triage Tent',
    category: 'Medical tent',
    neighbourhood: 'North Meridian',
    location: 'Elevated Overpass Pier 12',
    status: 'Active',
    capacity: '60 beds / 8 ICU bays',
    batteryFuel: 'Solar Microgrid 100%',
    lastUpdate: '2 mins ago',
    assignedTeam: 'Disaster Health Team 1',
    coordinates: { x: 270, y: 180 },
    telemetry: {
      primaryMetric: '48 patients receiving care',
      secondaryMetric: 'Tetanus/IV supply: 94%',
      runtimeHours: 24.0,
      healthScore: 96,
      notes: 'Treating hypothermia, minor lacerations, and stabilizing acute asthma.'
    }
  },

  // 9. Microgrids
  {
    id: 'MCG-01',
    name: 'North Solar-Storage Microgrid MG-01',
    category: 'Microgrid',
    neighbourhood: 'North Meridian',
    location: 'Northern Elevated Substation',
    status: 'Active',
    capacity: '2.4 MW Solar / 4.8 MWh LiFePO4',
    batteryFuel: '88% SoC (4.22 MWh)',
    lastUpdate: '1 min ago',
    assignedTeam: 'Grid Resilience Taskforce',
    coordinates: { x: 210, y: 130 },
    telemetry: {
      primaryMetric: '1.64 MW active generation/draw',
      secondaryMetric: 'Islanding mode stable',
      runtimeHours: 48.0,
      healthScore: 97,
      notes: 'Powering 8 pumps, Shelter S-01, S-02, and LoRa repeater hubs.'
    }
  },
  {
    id: 'MCG-02',
    name: 'Central Hospital Resilient Microgrid MG-02',
    category: 'Microgrid',
    neighbourhood: 'Central Meridian',
    location: 'District Health Compound',
    status: 'Active',
    capacity: '1.8 MW Solar / 3.6 MWh Storage',
    batteryFuel: '94% SoC',
    lastUpdate: 'Just now',
    assignedTeam: 'Hospital Engineering Cell',
    coordinates: { x: 650, y: 350 },
    telemetry: {
      primaryMetric: '1.2 MW hospital demand met',
      secondaryMetric: 'Zero grid dependency',
      runtimeHours: 72.0,
      healthScore: 99,
      notes: 'Zero flicker critical life-support supply verified.'
    }
  },

  // 10. Battery swap stations
  {
    id: 'BSS-01',
    name: 'Mobile Battery Swap Station BSS-01',
    category: 'Battery swap station',
    neighbourhood: 'North Meridian',
    location: 'Sector 4 Service Yard',
    status: 'Active',
    capacity: '64 Pack Slot (48V 100Ah LiFePO4)',
    batteryFuel: '58 Ready / 6 Charging',
    lastUpdate: '5 mins ago',
    assignedTeam: 'Battery Logistics Squad',
    coordinates: { x: 300, y: 160 },
    telemetry: {
      primaryMetric: '34 swaps executed today',
      secondaryMetric: 'Cycle health: 98%',
      runtimeHours: 36.0,
      healthScore: 97,
      notes: 'Supplying swappable packs for boat outboards and portable sump pumps.'
    }
  },

  // 11. Diesel backup generators
  {
    id: 'GEN-01',
    name: 'Emergency Diesel Genset DG-01 (Hospital Only)',
    category: 'Diesel backup generator',
    neighbourhood: 'Central Meridian',
    location: 'District Hospital Underground Vault',
    status: 'Active',
    capacity: '1,500 kVA / 415 V',
    batteryFuel: 'Diesel 91% (72 hr reserve)',
    lastUpdate: '10 mins ago',
    assignedTeam: 'Hospital Facilities Team',
    coordinates: { x: 670, y: 330 },
    telemetry: {
      primaryMetric: 'Warm standby mode',
      secondaryMetric: 'Lube oil temp: 68°C',
      runtimeHours: 4.2,
      healthScore: 100,
      notes: 'Synchronized with Solar Microgrid MG-02. Auto-start readiness 100%.'
    }
  },

  // 12. Water treatment skids
  {
    id: 'WTR-01',
    name: 'Portable Potable Water Skid PW-01',
    category: 'Water treatment skid',
    neighbourhood: 'North Meridian',
    location: 'Shelter S-01 Staging Area',
    status: 'Active',
    capacity: '4,000 Litres/hr RO + UV',
    batteryFuel: 'Solar Direct 100%',
    lastUpdate: '3 mins ago',
    assignedTeam: 'Water Sanitation Unit',
    coordinates: { x: 200, y: 140 },
    telemetry: {
      primaryMetric: 'TDS: 62 ppm (WHO Compliant)',
      secondaryMetric: 'Coliform: 0 CFU',
      runtimeHours: 19.4,
      healthScore: 95,
      notes: 'Purifying floodwater for 2,040 sheltered residents.'
    }
  },

  // 13. Containment booms
  {
    id: 'BOOM-01',
    name: 'Rapid Deployment Oil & Chemical Boom CB-01',
    category: 'Containment boom',
    neighbourhood: 'Central Meridian',
    location: 'Industrial Chemical Canal confluence',
    status: 'Active',
    capacity: '600m heavy skirt containment',
    batteryFuel: 'Passive Barrier',
    lastUpdate: '15 mins ago',
    assignedTeam: 'Pollution Control Board',
    coordinates: { x: 710, y: 250 },
    telemetry: {
      primaryMetric: 'Zero sheen downstream',
      secondaryMetric: 'Absorbent pads deployed',
      runtimeHours: 28.0,
      healthScore: 93,
      notes: 'Containing fuel wash from flooded automotive workshops.'
    }
  },

  // 14. LoRa nodes
  {
    id: 'LORA-R07',
    name: 'LoRa Mesh Relay Node R-07',
    category: 'LoRa node',
    neighbourhood: 'North Meridian',
    location: 'Water Tower Mast, Sector 3',
    status: 'Active',
    capacity: '868 MHz / 500 mW LoRa Mesh',
    batteryFuel: 'Solar + 18650 Battery 97%',
    lastUpdate: 'Just now',
    assignedTeam: 'Comms Signal Corps',
    coordinates: { x: 240, y: 100 },
    telemetry: {
      primaryMetric: 'Packet loss: 0.12%',
      secondaryMetric: 'Hop latency: 42 ms',
      runtimeHours: 180.0,
      healthScore: 99,
      notes: 'Switched to backup route at 09:11 after cell tower failure.'
    }
  },

  // 15. Float gauges
  {
    id: 'GAUGE-G02',
    name: 'Solar Ultrasonic Float Gauge G-02',
    category: 'Float gauge',
    neighbourhood: 'North Meridian',
    location: 'Canal Bridge Abutment',
    status: 'Active',
    capacity: '0 - 10m range (±2mm accuracy)',
    batteryFuel: 'Internal Lithium 100%',
    lastUpdate: '10 sec ago',
    assignedTeam: 'Hydrology Division',
    coordinates: { x: 220, y: 70 },
    telemetry: {
      primaryMetric: 'Water depth: 3.84m',
      secondaryMetric: 'Rise rate: +0.42 m/hr',
      runtimeHours: 720.0,
      healthScore: 98,
      notes: 'Broadcasting telemetry every 10 seconds via LoRa mesh.'
    }
  }
];

export const INITIAL_ROADS: RoadSegment[] = [
  {
    id: 'RD-01',
    name: 'North Arterial Boulevard (Corridor A)',
    neighbourhood: 'North Meridian',
    status: 'BLOCKED',
    waterDepthCm: 95,
    alternativeRoute: 'Elevated Ring Flyover Ramp 4',
    coordinates: { x1: 70, y1: 100, x2: 360, y2: 120 }
  },
  {
    id: 'RD-02',
    name: 'Canal Ridge Elevated Expressway',
    neighbourhood: 'North Meridian',
    status: 'PASSABLE',
    waterDepthCm: 5,
    alternativeRoute: 'Primary Evacuation Corridor',
    coordinates: { x1: 90, y1: 60, x2: 440, y2: 90 }
  },
  {
    id: 'RD-03',
    name: 'Central Metro Arterial Corridor (Corridor 4)',
    neighbourhood: 'Central Meridian',
    status: 'CRITICAL_ARTERIAL',
    waterDepthCm: 45,
    alternativeRoute: 'Pontoon Walkway PW-02 & Metro Viaduct',
    coordinates: { x1: 460, y1: 300, x2: 780, y2: 330 }
  },
  {
    id: 'RD-04',
    name: 'Civic Centre Commercial Underpass',
    neighbourhood: 'Central Meridian',
    status: 'BLOCKED',
    waterDepthCm: 140,
    alternativeRoute: 'Diverted via East Ring Road',
    coordinates: { x1: 540, y1: 360, x2: 640, y2: 430 }
  },
  {
    id: 'RD-05',
    name: 'South Coastal Causeway',
    neighbourhood: 'South Meridian',
    status: 'PASSABLE',
    waterDepthCm: 15,
    alternativeRoute: 'Main logistics conduit for port',
    coordinates: { x1: 190, y1: 600, x2: 550, y2: 670 }
  }
];

export const INITIAL_OUTFALLS: OutfallPoint[] = [
  {
    id: 'O-01',
    name: 'North Canal Outfall Sluice',
    neighbourhood: 'North Meridian',
    location: 'North River Mile 0',
    status: 'OPERATIONAL',
    flowM3h: 8400,
    turbidityNtu: 18,
    chemicalPpm: 2.1,
    filtrationStatus: 'Dual-stage active',
    zeroDischargeCompliant: true,
    coordinates: { x: 440, y: 50 }
  },
  {
    id: 'O-02',
    name: 'Industrial Estuary Outfall Skid',
    neighbourhood: 'Central Meridian',
    location: 'East Sluice Creek',
    status: 'WARNING',
    flowM3h: 6200,
    turbidityNtu: 46,
    chemicalPpm: 6.8,
    filtrationStatus: 'Backwash required',
    zeroDischargeCompliant: false,
    coordinates: { x: 860, y: 280 }
  },
  {
    id: 'O-03',
    name: 'Central Storm Sluice Terminal',
    neighbourhood: 'Central Meridian',
    location: 'Central Creek Mile 3.1',
    status: 'OPERATIONAL',
    flowM3h: 5100,
    turbidityNtu: 22,
    chemicalPpm: 3.0,
    filtrationStatus: 'Dual-stage active',
    zeroDischargeCompliant: true,
    coordinates: { x: 620, y: 490 }
  },
  {
    id: 'O-04',
    name: 'South Mangrove Tidal Gate',
    neighbourhood: 'South Meridian',
    location: 'Estuary Tidal Mouth',
    status: 'OPERATIONAL',
    flowM3h: 9200,
    turbidityNtu: 14,
    chemicalPpm: 1.4,
    filtrationStatus: 'Booms deployed',
    zeroDischargeCompliant: true,
    coordinates: { x: 480, y: 720 }
  }
];

export const INITIAL_COMM_NODES: CommNode[] = [
  {
    id: 'HUB-CMD',
    name: 'Central EOC Command Mesh Gateway',
    type: 'LoRa Mesh Gateway',
    neighbourhood: 'Central Meridian',
    status: 'ONLINE',
    batteryPct: 100,
    packetsRelayed: 28410,
    lastPingSec: 1,
    coordinates: { x: 620, y: 360 }
  },
  {
    id: 'LORA-N01',
    name: 'North Water Tower LoRa Repeater R-07',
    type: 'Relay Node',
    neighbourhood: 'North Meridian',
    status: 'ONLINE',
    batteryPct: 97,
    packetsRelayed: 14200,
    lastPingSec: 2,
    coordinates: { x: 240, y: 100 }
  },
  {
    id: 'LORA-N02',
    name: 'North Canal Float Node F-02',
    type: 'Float Gauge',
    neighbourhood: 'North Meridian',
    status: 'ONLINE',
    batteryPct: 99,
    packetsRelayed: 8400,
    lastPingSec: 4,
    coordinates: { x: 220, y: 70 }
  },
  {
    id: 'LORA-C01',
    name: 'Civic Centre Mesh Hub H-02',
    type: 'Hub Controller',
    neighbourhood: 'Central Meridian',
    status: 'ONLINE',
    batteryPct: 95,
    packetsRelayed: 19100,
    lastPingSec: 2,
    coordinates: { x: 580, y: 310 }
  },
  {
    id: 'LORA-S01',
    name: 'South Lighthouse Relay Node R-14',
    type: 'Relay Node',
    neighbourhood: 'South Meridian',
    status: 'ONLINE',
    batteryPct: 98,
    packetsRelayed: 11200,
    lastPingSec: 3,
    coordinates: { x: 280, y: 520 }
  },
  {
    id: 'RUN-01',
    name: 'North-Central Runner Relay Post 1',
    type: 'Runner Station',
    neighbourhood: 'North Meridian',
    status: 'ONLINE',
    batteryPct: 100,
    packetsRelayed: 42,
    lastPingSec: 12,
    coordinates: { x: 380, y: 220 }
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2041',
    neighbourhood: 'North Meridian',
    title: 'Drainage threshold exceeded at North Canal Basin',
    location: 'Sector 3 Low Basin near Intake Sluice',
    description: 'Float gauge G-02 reported water level at 3.84m (+0.42m/hr). Overflow spilling into low-lying housing colony.',
    severity: 'CRITICAL',
    timestamp: '08:38 IST',
    status: 'ACTIVE',
    assignedUnit: 'Pump Cluster N-04 & Boat B-04',
    coordinates: { x: 230, y: 110 }
  },
  {
    id: 'INC-2042',
    neighbourhood: 'Central Meridian',
    title: 'Critical arterial corridor blocked by flash runoff',
    location: 'Metro Plaza Underpass & Corridor 4',
    description: 'Subterranean drainage backflow inundating 4-lane arterial road under 1.4m standing water. Emergency diversion active.',
    severity: 'HIGH',
    timestamp: '08:52 IST',
    status: 'ACTIVE',
    assignedUnit: 'Excavator E-01 & Sump Cluster C-02',
    coordinates: { x: 530, y: 320 }
  },
  {
    id: 'INC-2043',
    neighbourhood: 'South Meridian',
    title: 'Shelter occupancy > 80% at Northern Heights Complex',
    location: 'Shelter S-01 (Ward 4)',
    description: 'Shelter S-01 reached 91% capacity (2,040/2,200). Secondary intake team diverting incoming citizens to S-02.',
    severity: 'HIGH',
    timestamp: '09:05 IST',
    status: 'ACTIVE',
    assignedUnit: 'Alpha Rapid Rescue & S-02 Staff',
    coordinates: { x: 180, y: 120 }
  },
  {
    id: 'INC-2044',
    neighbourhood: 'Central Meridian',
    title: 'Outfall Treatment Skid O-02 secondary filtration offline',
    location: 'East Sluice Creek Mile 1.8',
    description: 'High suspended sediment caused backwash alert. Effluent being diverted to holding pond before discharge.',
    severity: 'HIGH',
    timestamp: '09:12 IST',
    status: 'ACTIVE',
    assignedUnit: 'Env Eco-Scout 2',
    coordinates: { x: 820, y: 310 }
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-101',
    severity: 'CRITICAL',
    title: 'North Meridian water level rising rapidly',
    message: 'Canal basin surge rate exceeds 0.40m/hr. Evacuation order Phase 2 activated for Wards 3, 4 and 5.',
    neighbourhood: 'North Meridian',
    timestamp: '08:35 IST',
    acknowledged: true,
    resolved: false,
    relatedAssetId: 'GAUGE-G02'
  },
  {
    id: 'ALT-102',
    severity: 'HIGH',
    title: 'Central arterial corridor blocked',
    message: 'Metro Underpass inundated. Amphibious transporter staged for logistics bypass.',
    neighbourhood: 'Central Meridian',
    timestamp: '08:52 IST',
    acknowledged: true,
    resolved: false,
    relatedAssetId: 'EXC-01'
  },
  {
    id: 'ALT-103',
    severity: 'HIGH',
    title: 'Outfall treatment skid offline',
    message: 'Outfall Skid O-02 automated disc backwash initiated; discharge paused to prevent creek contamination.',
    neighbourhood: 'Central Meridian',
    timestamp: '09:12 IST',
    acknowledged: false,
    resolved: false,
    relatedAssetId: 'OUTF-02'
  },
  {
    id: 'ALT-104',
    severity: 'MEDIUM',
    title: 'Shelter S-07 approaching capacity',
    message: 'Coastal Maritime Academy Shelter S-07 has reached 71% occupancy. Directing Ward 8 evacuees to S-08.',
    neighbourhood: 'South Meridian',
    timestamp: '09:14 IST',
    acknowledged: false,
    resolved: false,
    relatedAssetId: 'S-07'
  },
  {
    id: 'ALT-105',
    severity: 'INFO',
    title: 'Boat B-03 successfully deployed',
    message: 'Rescue boat B-03 reached isolated residential block on Sector 2 Island; 18 citizens accounted for.',
    neighbourhood: 'North Meridian',
    timestamp: '09:08 IST',
    acknowledged: true,
    resolved: true,
    relatedAssetId: 'BOAT-B01'
  }
];

export const INITIAL_OPERATIONS: RecentOperation[] = [
  { id: 'OP-01', time: '08:42', message: 'Pump Cluster N-04 activated', sector: 'North Meridian', type: 'pump' },
  { id: 'OP-02', time: '08:48', message: 'Shelter S-03 opened with 1,400 bed capacity', sector: 'North Meridian', type: 'shelter' },
  { id: 'OP-03', time: '08:56', message: 'Boat B-04 deployed for high-risk elderly evacuation', sector: 'North Meridian', type: 'boat' },
  { id: 'OP-04', time: '09:04', message: 'Arterial corridor cleared by Excavator E-01', sector: 'Central Meridian', type: 'road' },
  { id: 'OP-05', time: '09:11', message: 'LoRa relay node R-07 switched to backup route', sector: 'North Meridian', type: 'comms' }
];

export const INITIAL_DISPATCHES: DispatchRecord[] = [
  {
    id: 'DSP-801',
    resource: 'Rescue Boat B-04',
    origin: 'North Marine Depot',
    destination: 'Canal Ridge Ward 4',
    priority: 'CRITICAL',
    assignedTeam: 'NDRF Boat Crew 4',
    dispatchedAt: '08:56 IST',
    status: 'On Scene',
    etaMinutes: 0
  },
  {
    id: 'DSP-802',
    resource: 'Heavy Track Excavator E-01',
    origin: 'Public Works Central Depot',
    destination: 'Arterial Culvert 3',
    priority: 'HIGH',
    assignedTeam: 'Emergency Public Works 1',
    dispatchedAt: '08:45 IST',
    status: 'Completed',
    etaMinutes: 0
  },
  {
    id: 'DSP-803',
    resource: 'Amphibious Transporter A-01',
    origin: 'North Relief Staging Pier',
    destination: 'Shelter S-01 Intake',
    priority: 'HIGH',
    assignedTeam: 'Armed Forces Relief Platoon',
    dispatchedAt: '09:02 IST',
    status: 'In Transit',
    etaMinutes: 8
  }
];

// All 24 intervention packages totaling ₹60 Crore
export const BUDGET_PACKAGES: BudgetIntervention[] = [
  // Drainage & Flood Control (₹16 cr)
  {
    id: 'BGT-01',
    code: 'DFC-01',
    category: 'Drainage & Flood Control',
    name: 'Decentralized solar-battery submersible pump clusters',
    allocationCr: 8.0,
    deployedCr: 7.2,
    operationalStatus: 'Operational',
    specs: '48 units (1,000-2,000 m³/hr) with dedicated 48V LiFePO4 battery banks & solar PV'
  },
  {
    id: 'BGT-02',
    code: 'DFC-02',
    category: 'Drainage & Flood Control',
    name: 'Modular/inflatable flood barriers',
    allocationCr: 4.0,
    deployedCr: 3.6,
    operationalStatus: 'Operational',
    specs: '2,400 meters of water-filled dual-tube barriers and rapid air-inflatable berms'
  },
  {
    id: 'BGT-03',
    code: 'DFC-03',
    category: 'Drainage & Flood Control',
    name: 'Outfall filtration/treatment skids',
    allocationCr: 3.0,
    deployedCr: 2.7,
    operationalStatus: 'Operational',
    specs: '4 high-volume stormwater disc filtration skids installed at municipal trunk outfalls',
    reviewFlag: 'AUDIT FLAG: Review scope with Environment & Waste Package EW-01 (Portable water treatment skids ₹3 cr) to ensure no procurement duplication.'
  },
  {
    id: 'BGT-04',
    code: 'DFC-04',
    category: 'Drainage & Flood Control',
    name: 'Shared emergency excavator resource',
    allocationCr: 1.0,
    deployedCr: 0.95,
    operationalStatus: 'Operational',
    specs: '2 tracked long-reach hydraulic excavators on low-bed trailers for culvert declogging'
  },

  // People & Housing (₹12 cr)
  {
    id: 'BGT-05',
    code: 'PH-01',
    category: 'People & Housing',
    name: 'Vertical shelters retrofitting & provisioning',
    allocationCr: 4.0,
    deployedCr: 3.8,
    operationalStatus: 'Operational',
    specs: '9 reinforced multi-story public structures retrofitted with backup power, water & sanitation'
  },
  {
    id: 'BGT-06',
    code: 'PH-02',
    category: 'People & Housing',
    name: 'Mobile medical tents & trauma pods',
    allocationCr: 4.0,
    deployedCr: 3.5,
    operationalStatus: 'Operational',
    specs: '3 deployable negative-pressure surge tents (180 bed total capacity) with ICU kits'
  },
  {
    id: 'BGT-07',
    code: 'PH-03',
    category: 'People & Housing',
    name: 'Community evacuation teams training & equipment',
    allocationCr: 3.0,
    deployedCr: 2.6,
    operationalStatus: 'Operational',
    specs: '36 neighborhood volunteer cohorts equipped with drysuits, VHF radios, stretchers & ropes'
  },
  {
    id: 'BGT-08',
    code: 'PH-04',
    category: 'People & Housing',
    name: 'Emergency family survival kits',
    allocationCr: 1.0,
    deployedCr: 0.85,
    operationalStatus: 'Operational',
    specs: '10,000 waterproof survival backpacks distributed to vulnerable riverine families'
  },

  // Power & Utilities (₹10 cr)
  {
    id: 'BGT-09',
    code: 'PU-01',
    category: 'Power & Utilities',
    name: 'Solar-battery microgrids for critical infrastructure',
    allocationCr: 6.0,
    deployedCr: 5.4,
    operationalStatus: 'Operational',
    specs: '5.4 MW aggregate solar arrays + 10.8 MWh LiFePO4 battery storage systems'
  },
  {
    id: 'BGT-10',
    code: 'PU-02',
    category: 'Power & Utilities',
    name: 'Decentralized battery-swap stations',
    allocationCr: 2.0,
    deployedCr: 1.8,
    operationalStatus: 'Operational',
    specs: '3 automated weatherproof battery depots with 192 swappable 48V utility powerpacks'
  },
  {
    id: 'BGT-11',
    code: 'PU-03',
    category: 'Power & Utilities',
    name: 'Hand-crank/pedal backup power systems',
    allocationCr: 1.0,
    deployedCr: 0.9,
    operationalStatus: 'Operational',
    specs: '500 rugged kinetic generators for communication radios and medical torch recharging'
  },
  {
    id: 'BGT-12',
    code: 'PU-04',
    category: 'Power & Utilities',
    name: 'Hospital-only diesel genset & dedicated fuel vault',
    allocationCr: 1.0,
    deployedCr: 0.95,
    operationalStatus: 'Operational',
    specs: '1,500 kVA synchronized diesel generator with sealed 72-hour fuel storage'
  },

  // Roads & Mobility (₹9 cr)
  {
    id: 'BGT-13',
    code: 'RM-01',
    category: 'Roads & Mobility',
    name: 'Pontoon & modular floating walkways',
    allocationCr: 3.0,
    deployedCr: 2.7,
    operationalStatus: 'Operational',
    specs: '1,200 linear meters of modular HDPE floating walkways with safety handrails & solar LEDs'
  },
  {
    id: 'BGT-14',
    code: 'RM-02',
    category: 'Roads & Mobility',
    name: 'Requisitioned boats & amphibious vehicles',
    allocationCr: 3.0,
    deployedCr: 2.65,
    operationalStatus: 'Operational',
    specs: '16 motorized rescue inflatables, 6 aluminum shallow skiffs & 2 8x8 amphibious transporters'
  },
  {
    id: 'BGT-15',
    code: 'RM-03',
    category: 'Roads & Mobility',
    name: 'Dedicated flood-response excavator',
    allocationCr: 2.0,
    deployedCr: 1.85,
    operationalStatus: 'Operational',
    specs: '1 specialized pontoon-mounted amphibious marsh excavator for tidal drainage channels'
  },
  {
    id: 'BGT-16',
    code: 'RM-04',
    category: 'Roads & Mobility',
    name: 'Manual route marking & high-water signage',
    allocationCr: 1.0,
    deployedCr: 0.85,
    operationalStatus: 'Operational',
    specs: '300 reflective depth poles, high-luminance solar advisory signs & magnetic route guides'
  },

  // Environment & Waste (₹7 cr)
  {
    id: 'BGT-17',
    code: 'EW-01',
    category: 'Environment & Waste',
    name: 'Portable water treatment skids (potable/environmental)',
    allocationCr: 3.0,
    deployedCr: 2.6,
    operationalStatus: 'Operational',
    specs: '6 mobile trailer-mounted RO + UV purification units delivering 4,000 L/hr drinking water',
    reviewFlag: 'AUDIT FLAG: Potential scope overlap with Drainage Package DFC-03 (Outfall skids ₹3 cr). While DFC-03 handles stormwater discharge filtration, EW-01 handles potable water purification for shelters. Keep separate but synchronize maintenance contracts.'
  },
  {
    id: 'BGT-18',
    code: 'EW-02',
    category: 'Environment & Waste',
    name: 'Containment booms for chemical/fuel isolation',
    allocationCr: 2.0,
    deployedCr: 1.75,
    operationalStatus: 'Operational',
    specs: '1,800m heavy-duty offshore oil/chemical containment booms with vacuum skimmer attachments'
  },
  {
    id: 'BGT-19',
    code: 'EW-03',
    category: 'Environment & Waste',
    name: 'Debris collection crews & hydraulic grapples',
    allocationCr: 1.5,
    deployedCr: 1.3,
    operationalStatus: 'Operational',
    specs: '12 dedicated mobile teams equipped with chainsaw kits, grapples and winch tractors'
  },
  {
    id: 'BGT-20',
    code: 'EW-04',
    category: 'Environment & Waste',
    name: 'Community waste-bagging & sanitation points',
    allocationCr: 0.5,
    deployedCr: 0.45,
    operationalStatus: 'Operational',
    specs: '50 elevated waste drop stations to prevent municipal refuse from clogging stormwater culverts'
  },

  // Sensing & Communication (₹6 cr)
  {
    id: 'BGT-21',
    code: 'SC-01',
    category: 'Sensing & Communication',
    name: 'Solar-powered LoRa mesh radio network',
    allocationCr: 3.5,
    deployedCr: 3.2,
    operationalStatus: 'Operational',
    specs: '48 autonomous solar LoRa repeater nodes (868/433 MHz) providing citywide non-cellular data telemetry'
  },
  {
    id: 'BGT-22',
    code: 'SC-02',
    category: 'Sensing & Communication',
    name: 'Manual float gauges + runner relay equipment',
    allocationCr: 1.0,
    deployedCr: 0.9,
    operationalStatus: 'Operational',
    specs: '60 calibrated physical water gauge towers, 24 runner bicycles, waterproof dispatch tablets & VHF sets'
  },
  {
    id: 'BGT-23',
    code: 'SC-03',
    category: 'Sensing & Communication',
    name: 'Community noticeboards & e-ink warning stations',
    allocationCr: 0.5,
    deployedCr: 0.45,
    operationalStatus: 'Operational',
    specs: '30 solar e-ink municipal message displays located at shelter entries & transit hubs'
  },
  {
    id: 'BGT-24',
    code: 'SC-04',
    category: 'Sensing & Communication',
    name: 'Offline-first emergency dashboard platform',
    allocationCr: 1.0,
    deployedCr: 0.92,
    operationalStatus: 'Operational',
    specs: 'Edge-hosted municipal command console syncing peer-to-peer over local mesh with zero cloud dependency'
  }
];
