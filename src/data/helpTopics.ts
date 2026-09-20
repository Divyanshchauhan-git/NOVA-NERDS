import { HelpTopic } from '../types';

export const HELP_TOPICS: Record<string, HelpTopic> = {
  'risk-score': {
    id: 'risk-score',
    title: 'Hydrological Risk Score',
    category: 'Predictive Modeling',
    summary: 'A dynamic composite rating (0–100) calculated continuously from sensor inputs.',
    details: 'The risk score synthesizes water level gauge elevation, 3-hour rainfall rate, downstream outfall backpressure, terrain slope, drainage saturation, and population density. A score above 75 triggers automatic emergency deployment protocols.',
    operationalImpact: 'Prioritize tactical pump assignments, barricade installations, and civilian evacuation warnings to sectors exceeding 70% risk.'
  },
  'lora-mesh': {
    id: 'lora-mesh',
    title: 'LoRa 868MHz Mesh Network',
    category: 'Resilient Communications',
    summary: 'Long-range, low-power decentralized radio mesh for telemetry transmission.',
    details: 'When commercial telecom towers, 4G/5G, or fiber lines fail due to flood waters or power collapse, 48 solar-buffered LoRa nodes form an ad-hoc peer-to-peer relay network across Meridian City. Each node transmits float gauge readings, pump status, and short operational packets without internet.',
    operationalImpact: 'Provides real-time situational telemetry to the offline command center even during catastrophic commercial telecommunications blackouts.'
  },
  'offline-inference': {
    id: 'offline-inference',
    title: 'Offline Inference & Local Models',
    category: 'Autonomous Operations',
    summary: 'Deterministic browser-based machine learning algorithms running entirely on your local device.',
    details: 'Does not depend on external cloud servers, Gemini APIs, or remote databases. In offline mode, the system executes locally compiled hydrology equations, runoff calculations, shelter capacity forecasting, and image heuristic analysis directly in your browser.',
    operationalImpact: 'Guarantees that emergency response decision-support functions remain 100% operational in field headquarters cut off from the global internet.'
  },
  'ai-confidence': {
    id: 'ai-confidence',
    title: 'AI Assessment Confidence',
    category: 'Decision Support',
    summary: 'Statistical certainty metric indicating model alignment with visual and sensor indicators.',
    details: 'Calculated based on image resolution, lighting quality, feature clarity (such as submerged tire lines, water reflections, curb visibility), and consistency with nearby hydrological gauge data. Confidence never equates to ground truth.',
    operationalImpact: 'All AI classifications—especially high-risk hazard detections—must be confirmed or overridden by a qualified human incident commander before dispatching tactical teams.'
  },
  'zero-discharge': {
    id: 'zero-discharge',
    title: 'Zero-Discharge Water Treatment',
    category: 'Environmental Protection',
    summary: 'Dual-stage filtration skids preventing hazardous urban runoff from entering coastal estuaries.',
    details: 'During flash floods, street debris, petrochemicals, and industrial sediments are swept into drainage canals. Mobile outfall skids deploy dual-stage physical and chemical filtration along with oil containment booms to meet zero-discharge standards.',
    operationalImpact: 'Monitors turbidity (NTU) and chemical parts-per-million (PPM) at outfall gates to avoid ecological poisoning of downstream fisheries and mangrove reserves.'
  },
  'vertical-evacuation': {
    id: 'vertical-evacuation',
    title: 'Vertical Evacuation Havens',
    category: 'Civilian Safety',
    summary: 'Reinforced multi-story civic structures designated for refuge when road egress is severed.',
    details: 'When horizontal evacuation routes across roads become impassable due to water depth over 0.5m, designated vertical shelters (elevated schools, municipal halls, sports complexes) provide immediate safe haven with independent rooftop microgrids, food, and water stockpiles.',
    operationalImpact: 'Directs rescue boats and amphibious vehicles to deliver provisions to vertical havens experiencing surges in unannounced civilian arrivals.'
  },
  'microgrid-islanding': {
    id: 'microgrid-islanding',
    title: 'Microgrid Islanding',
    category: 'Decentralized Utilities',
    summary: 'Autonomous solar-battery power networks operating independently from the central power grid.',
    details: 'Central high-voltage power lines are automatically shut down during urban flooding to prevent electrocution hazards. Submersible pumps, trauma tents, and shelter facilities switch immediately to islanded 48V/240V solar-battery microgrids.',
    operationalImpact: 'Ensures critical dewatering pumps and medical refrigeration operate continuously without requiring fuel deliveries for diesel generators.'
  }
};
