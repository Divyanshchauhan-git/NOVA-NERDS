import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Map, 
  Activity, 
  Building2, 
  Bot, 
  Truck, 
  Camera, 
  Users, 
  Zap, 
  Radio, 
  Compass, 
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { ScreenId } from '../types';

interface GuideStep {
  step: number;
  title: string;
  subtitle: string;
  screenId: ScreenId;
  icon: React.ElementType;
  sections: {
    heading: string;
    items: string[];
  }[];
  warningNote?: string;
  actionButtonText?: string;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    step: 1,
    title: 'Check CITY STATUS',
    subtitle: 'Start at Command Center',
    screenId: 'command-center',
    icon: Activity,
    sections: [
      {
        heading: 'Primary Indicators to Review',
        items: [
          'Water levels & flood basin crest margins',
          'Rainfall accumulation (3h & 24h totals)',
          'Population at risk vs. confirmed evacuated count',
          'Shelter occupancy & surge headroom',
          'Solar submersible pump fleet availability (48 units)',
          'Road accessibility percentages & arterial cutoffs',
          'System connectivity (Commercial Telecom vs. LoRa Mesh)'
        ]
      }
    ],
    actionButtonText: 'Open Command Center'
  },
  {
    step: 2,
    title: 'Check the FLOOD MAP',
    subtitle: 'Open Flood Map',
    screenId: 'flood-map',
    icon: Map,
    sections: [
      {
        heading: 'Layer Controls & GIS Overlays',
        items: [
          'Flood zones (topological contour lines)',
          'Pumps (solar-battery submersible skids)',
          'Shelters (vertical evacuation safe havens)',
          'Hospitals (medical surge facilities)',
          'Roads (arterials, impassable cutoffs)',
          'Boats & amphibious transporters',
          'Excavators & levee repair units',
          'Outfalls (water treatment & zero-discharge gates)',
          'Communication nodes (LoRa radio mesh relays)'
        ]
      }
    ],
    warningNote: 'Click any marker on the map for real-time telemetry, battery state, and dispatch commands.',
    actionButtonText: 'Open Flood Map'
  },
  {
    step: 3,
    title: 'Check AI FORECAST',
    subtitle: 'Open Neighbourhoods',
    screenId: 'neighbourhoods',
    icon: Building2,
    sections: [
      {
        heading: 'Review Sector Intelligence',
        items: [
          'Current water level and surge velocity',
          '3-hour hydrological forecast curve',
          'Hydrological Risk Score (0-100)',
          'Key risk drivers (drainage backpressure, low basin topography)'
        ]
      },
      {
        heading: 'Look for Severity Flags',
        items: [
          'CRITICAL (Mandatory evacuation & pump saturation)',
          'HIGH (Rapid surge & arterial road cutoffs)',
          'MODERATE (Estuary tidal monitoring)'
        ]
      }
    ],
    actionButtonText: 'Open Neighbourhoods'
  },
  {
    step: 4,
    title: 'Review AI RECOMMENDATIONS',
    subtitle: 'Open AI Response Copilot',
    screenId: 'command-center',
    icon: Bot,
    sections: [
      {
        heading: 'Suggested Operator Queries',
        items: [
          '"Which neighbourhood is at greatest risk?"',
          '"Which shelter will reach capacity first?"',
          '"Which pumps are unavailable?"',
          '"What resources should be deployed to North Meridian?"'
        ]
      }
    ],
    warningNote: 'CRITICAL PROTOCOL: AI recommendations require human approval before tactical deployment.',
    actionButtonText: 'Open AI Copilot'
  },
  {
    step: 5,
    title: 'DEPLOY RESOURCES',
    subtitle: 'Open Mobility or Infrastructure',
    screenId: 'mobility',
    icon: Truck,
    sections: [
      {
        heading: 'Deployment Workflow',
        items: [
          'Select DEPLOY RESOURCE modal',
          'Choose Resource (Rescue Boat, Amphibious Unit, Pump Skid, Powerpack)',
          'Select Origin staging hub',
          'Select Destination neighbourhood or shelter',
          'Set Priority (CRITICAL, HIGH, STANDARD)',
          'Confirm deployment to update dispatch board'
        ]
      }
    ],
    actionButtonText: 'Open Mobility Dispatches'
  },
  {
    step: 6,
    title: 'ANALYZE A FLOOD IMAGE',
    subtitle: 'Open Flood Image Analysis',
    screenId: 'image-analysis',
    icon: Camera,
    sections: [
      {
        heading: 'Field Visual Assessment Workflow',
        items: [
          'Upload a field photograph from ground squads (or select a quick field sample)',
          'Review Flood Severity & Road Accessibility (e.g. LIKELY IMPASSABLE)',
          'Review Potential Hazards (downed electrical lines, transformer vaults)',
          'Check Estimated Water Depth & AI Confidence level',
          'Select CONFIRM, EDIT, or REJECT to record human verification status',
          'Click [ADD TO MAP] to generate an AI Flood Observation marker',
          'Click [CREATE INCIDENT] to dispatch rapid response teams'
        ]
      }
    ],
    warningNote: 'Do not treat the AI assessment as a substitute for field verification. Human verification required.',
    actionButtonText: 'Open Flood Image Analysis'
  },
  {
    step: 7,
    title: 'MONITOR SHELTERS',
    subtitle: 'Open People & Shelters',
    screenId: 'people-shelters',
    icon: Users,
    sections: [
      {
        heading: 'Shelter Vital Signs',
        items: [
          'Occupancy percentage vs. surge ceiling',
          'Food reserve buffer days',
          'Drinking water purification stock',
          'Medical trauma readiness (Optimal / Adequate / Strained)',
          'Autonomous power status (Solar Microgrid / BSS / Genset)',
          'Active civilian evacuation teams'
        ]
      }
    ],
    warningNote: 'Prioritize shelters approaching 90% capacity by redirecting bus convoys to alternate vertical havens.',
    actionButtonText: 'Open Shelters & People'
  },
  {
    step: 8,
    title: 'CHECK POWER',
    subtitle: 'Open Power & Utilities',
    screenId: 'power-utilities',
    icon: Zap,
    sections: [
      {
        heading: 'Critical Facility Verification',
        items: [
          'Verify pump sites are islanded from unstable high-voltage grid',
          'Confirm shelter battery state of charge (SoC > 70%)',
          'Verify hospital trauma tents microgrid status',
          'Monitor battery swap station (BSS-01) pack distribution',
          'Check diesel backup generator fuel burn hours'
        ]
      }
    ],
    actionButtonText: 'Open Power & Utilities'
  },
  {
    step: 9,
    title: 'CHECK COMMUNICATIONS',
    subtitle: 'Open Sensing & Communications',
    screenId: 'sensing-comms',
    icon: Radio,
    sections: [
      {
        heading: 'Resilient Telemetry Checks',
        items: [
          'Monitor 48 solar LoRa 868MHz mesh nodes',
          'Verify ultrasonic float gauges telemetry feed',
          'Inspect manual bike & foot relay runner log',
          'Track network status & pending data synchronization'
        ]
      }
    ],
    warningNote: 'If commercial telecom collapses, verify that LoRa Mesh, Manual Relay, and the Offline Local Dashboard remain operational.',
    actionButtonText: 'Open Communications'
  },
  {
    step: 10,
    title: 'RUN THE DEMO SCENARIO',
    subtitle: 'From Command Center select RUN FLOOD SCENARIO',
    screenId: 'command-center',
    icon: Compass,
    sections: [
      {
        heading: 'Observe Multi-Stage Emergency Progression',
        items: [
          'NORMAL → WATCH → ESCALATING → CRITICAL → EMERGENCY',
          'Watch water levels rise and levee wall breaches trigger',
          'Monitor real-time risk scores escalating to Critical',
          'Watch automated tactical alerts appear in the alerts feed',
          'Observe shelters filling toward capacity limits',
          'Track roads closing with dynamic detour routing',
          'Deploy resources and observe telecom degradation fallback',
          'Use RESET SCENARIO at any time to return to baseline'
        ]
      }
    ],
    actionButtonText: 'Go to Command Center & Run'
  }
];

export const HowToUseModal: React.FC = () => {
  const { isHowToUseOpen, setIsHowToUseOpen, setCurrentScreen, runFloodScenario } = useCommand();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (!isHowToUseOpen) return null;

  const currentStep = GUIDE_STEPS[activeStepIndex];
  const StepIcon = currentStep.icon;

  const handleJumpToScreen = () => {
    setCurrentScreen(currentStep.screenId);
    setIsHowToUseOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#090e1a] border border-cyan-500/40 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0c1424]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/90 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  MERIDIAN FLOOD COMMAND
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  v2.0 OFFLINE-FIRST
                </span>
              </div>
              <h2 className="text-lg font-bold font-display text-white tracking-wide">
                OPERATOR QUICK GUIDE
              </h2>
            </div>
          </div>
          
          <button
            onClick={() => setIsHowToUseOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Step Indicator Bar */}
        <div className="px-6 py-2.5 bg-[#060a12] border-b border-slate-800/80 overflow-x-auto">
          <div className="flex items-center space-x-1 min-w-max">
            {GUIDE_STEPS.map((s, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40 border border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/40 flex items-center justify-center text-[10px]">
                    {s.step}
                  </span>
                  <span className="hidden sm:inline">{s.title.replace('Check ', '').replace('Review ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step Hero */}
          <div className="flex flex-wrap items-start justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-slate-800">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-lg">
                <StepIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                  STEP {currentStep.step} OF 10
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">
                  {currentStep.title}
                </h3>
                <p className="text-sm text-slate-300 font-mono mt-1">
                  Location: <span className="text-amber-400">{currentStep.subtitle}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleJumpToScreen}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs flex items-center space-x-2 shadow-lg shadow-cyan-950 transition-all active:scale-95"
            >
              <span>{currentStep.actionButtonText || 'Open This Screen'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Checklist Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStep.sections.map((section, sIdx) => (
              <div 
                key={sIdx}
                className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-3"
              >
                <h4 className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>{section.heading}</span>
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start space-x-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Warning or Critical Note if present */}
          {currentStep.warningNote && (
            <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-500/50 flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 animate-ping"></div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                  OPERATOR MANDATE
                </span>
                <p className="text-xs text-amber-200/90 leading-relaxed font-sans font-medium">
                  {currentStep.warningNote}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#080d16]">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
              disabled={activeStepIndex === 0}
              className={`px-3 py-1.5 rounded text-xs font-mono border ${
                activeStepIndex === 0 
                  ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              PREVIOUS STEP
            </button>
            <button
              onClick={() => setActiveStepIndex(prev => Math.min(GUIDE_STEPS.length - 1, prev + 1))}
              disabled={activeStepIndex === GUIDE_STEPS.length - 1}
              className={`px-3 py-1.5 rounded text-xs font-mono border ${
                activeStepIndex === GUIDE_STEPS.length - 1
                  ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              NEXT STEP
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {currentStep.step === 10 && (
              <button
                onClick={() => {
                  runFloodScenario();
                  setCurrentScreen('command-center');
                  setIsHowToUseOpen(false);
                }}
                className="px-4 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-rose-950"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>START FLOOD SCENARIO NOW</span>
              </button>
            )}

            <button
              onClick={() => setIsHowToUseOpen(false)}
              className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono"
            >
              CLOSE GUIDE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
