import { ImageAssessment } from '../types';

export const INITIAL_IMAGE_ASSESSMENTS: ImageAssessment[] = [
  {
    id: 'IMG-014',
    timestamp: '09:37',
    location: 'North Meridian / Road R-07',
    neighbourhood: 'North Meridian',
    classification: 'LIKELY IMPASSABLE',
    severity: 'HIGH',
    estimatedWaterDepth: '0.5–0.8 m',
    visibleConditions: [
      'Standing water',
      'Road debris',
      'Two stranded vehicles',
      'Curb submersion visible'
    ],
    potentialHazards: [
      'Electrical infrastructure nearby',
      'Submerged manhole displacement risk'
    ],
    recommendedAction: 'Restrict vehicle access and dispatch assessment team.',
    confidence: 82,
    analysisMode: 'GEMINI AI',
    verificationStatus: 'Confirmed',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    addedToMap: true,
    incidentCreated: true,
    coordinates: { x: 310, y: 140 }
  },
  {
    id: 'IMG-015',
    timestamp: '09:12',
    location: 'Central Meridian / Arterial Concourse 4',
    neighbourhood: 'Central Meridian',
    classification: 'LIKELY IMPASSABLE',
    severity: 'CRITICAL',
    estimatedWaterDepth: '0.9–1.2 m',
    visibleConditions: [
      'Violent surface runoff flow',
      'Floating wooden and metal debris',
      'Commercial storefront water penetration'
    ],
    potentialHazards: [
      'Active underground transformer vault inundation',
      'Strong swiftwater undertow'
    ],
    recommendedAction: 'Deploy inflatable flood gate C-Alpha and deploy amphibious unit A-01.',
    confidence: 89,
    analysisMode: 'OFFLINE SIMULATED ANALYSIS',
    verificationStatus: 'Confirmed',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    addedToMap: true,
    incidentCreated: true,
    coordinates: { x: 580, y: 310 }
  },
  {
    id: 'IMG-012',
    timestamp: '08:45',
    location: 'South Meridian / Road R-19 Estuary Link',
    neighbourhood: 'South Meridian',
    classification: 'PARTIALLY PASSABLE',
    severity: 'MODERATE',
    estimatedWaterDepth: '0.2–0.3 m',
    visibleConditions: [
      'Shallow roadside pooling',
      'Drain grate partially clogged with palm fronds',
      'High-clearance trucks traversing safely'
    ],
    potentialHazards: [
      'Tidal wave surge expected at 11:30'
    ],
    recommendedAction: 'Deploy mini excavator E-02 to clear culvert grates; restrict passenger cars.',
    confidence: 76,
    analysisMode: 'GEMINI AI',
    verificationStatus: 'Confirmed',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80',
    addedToMap: false,
    incidentCreated: false,
    coordinates: { x: 280, y: 520 }
  },
  {
    id: 'IMG-009',
    timestamp: '08:15',
    location: 'North Meridian / Sector 3 Drainage Sluice',
    neighbourhood: 'North Meridian',
    classification: 'LIKELY IMPASSABLE',
    severity: 'CRITICAL',
    estimatedWaterDepth: '1.2–1.5 m',
    visibleConditions: [
      'Full embankment breach',
      'Turbulent brown runoff with industrial scum',
      'Utility pole tilted at 15 degrees'
    ],
    potentialHazards: [
      'Downed 11kV distribution line submerged',
      'Petrochemical sheen visible on surface'
    ],
    recommendedAction: 'Cut power sector breaker N-04 immediately. Deploy oil containment boom B-01.',
    confidence: 91,
    analysisMode: 'GEMINI AI',
    verificationStatus: 'Edited',
    humanOverrideNotes: 'Commander confirmed downed line; upgraded hazard alert to mandatory life-safety perimeter.',
    originalAIAssessment: 'AI initial assessment estimated 0.8m depth and moderate chemical trace.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    addedToMap: true,
    incidentCreated: true,
    coordinates: { x: 220, y: 70 }
  }
];

// Sample presets for operators to test field image analysis immediately
export const SAMPLE_FIELD_IMAGES = [
  {
    id: 'sample-1',
    name: 'Sector 3 Residential Submersion',
    location: 'North Meridian / Road R-07',
    neighbourhood: 'North Meridian' as const,
    url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    description: 'Field photo from Sector 3 volunteer brigade showing submerged street and stranded vehicle.'
  },
  {
    id: 'sample-2',
    name: 'Central Commercial Spine Surge',
    location: 'Central Meridian / Arterial 4',
    neighbourhood: 'Central Meridian' as const,
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    description: 'High-volume runoff pouring down central commercial boulevard near metro entrance.'
  },
  {
    id: 'sample-3',
    name: 'South Meridian Mangrove Road',
    location: 'South Meridian / Road R-19',
    neighbourhood: 'South Meridian' as const,
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80',
    description: 'Tidal backflow encroaching on low-lying coastal link road with culvert blockage.'
  },
  {
    id: 'sample-4',
    name: 'Industrial Basin Chemical Sluice',
    location: 'North Meridian / Sector 3 Drainage Sluice',
    neighbourhood: 'North Meridian' as const,
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Outfall weir overflowing with industrial sediment and tilted infrastructure.'
  }
];
