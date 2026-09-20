import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Edit3, 
  XCircle, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  Layers, 
  History, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Cpu, 
  Info,
  Check,
  ChevronRight,
  Eye,
  Plus
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { ImageAssessment, AnalysisMode, VerificationStatus } from '../types';
import { SAMPLE_FIELD_IMAGES } from '../data/mockImageAssessments';
import { HelpBadge } from '../components/HelpBadge';

export const FloodImageAnalysisScreen: React.FC = () => {
  const { 
    isOnline, 
    imageAssessments, 
    addImageAssessment, 
    updateImageAssessment, 
    addImageToMap, 
    createIncidentFromAssessment,
    setCurrentScreen,
    systemStats
  } = useCommand();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active state
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>(SAMPLE_FIELD_IMAGES[0].url);
  const [selectedLocation, setSelectedLocation] = useState<string>('North Meridian / Road R-07');
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<'North Meridian' | 'Central Meridian' | 'South Meridian'>('North Meridian');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeAssessment, setActiveAssessment] = useState<ImageAssessment | null>(imageAssessments[0] || null);

  // Edit override modal / form state
  const [isEditingOverride, setIsEditingOverride] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({
    classification: '',
    severity: 'HIGH' as ImageAssessment['severity'],
    estimatedWaterDepth: '',
    recommendedAction: '',
    overrideNotes: ''
  });

  // Local Offline Heuristic Simulator
  const runOfflineHeuristicAnalysis = (imgSrc: string, location: string, neighbourhood: 'North Meridian' | 'Central Meridian' | 'South Meridian'): ImageAssessment => {
    // Generate deterministic values based on image src length and location string
    const seed = (imgSrc.length + location.length) % 10;
    
    let severity: ImageAssessment['severity'] = 'HIGH';
    let depth = 'Estimated 0.5–0.8 m';
    let classification = 'LIKELY IMPASSABLE';
    let confidence = 78 + (seed % 14); // 78 - 91%
    let conditions = [
      'Standing water covering roadway surface',
      'Visible road debris and vegetative drift',
      'Vehicle tire submersion visible (~50% wheel height)'
    ];
    let hazards = [
      'Nearby electrical distribution transformer pole',
      'Submerged drain curb edges with loss of edge definition'
    ];
    let action = 'Restrict all vehicle access. Dispatch mobile scout unit with float markers.';

    if (seed > 6) {
      severity = 'CRITICAL';
      depth = 'Estimated 1.0–1.4 m';
      classification = 'LIKELY IMPASSABLE';
      conditions = [
        'Swift turbulent surface runoff',
        'Commercial building lower threshold submerged',
        'Two passenger vehicles stranded and abandoned'
      ];
      hazards = [
        'Active underground transformer vault inundation',
        'Swiftwater undertow hazard near drainage culvert'
      ];
      action = 'Evacuate ground-level occupants. Deploy rescue boat cluster R-02 immediately.';
    } else if (seed < 3) {
      severity = 'MODERATE';
      depth = 'Estimated 0.2–0.4 m';
      classification = 'PARTIALLY PASSABLE';
      conditions = [
        'Shallow localized gutter pooling',
        'Center lane crown still partially above waterline',
        'Heavy stormwater runoff entering side drains'
      ];
      hazards = [
        'Risk of vehicle hydroplaning',
        'Debris clogging stormwater culvert grate'
      ];
      action = 'Restrict small passenger cars; deploy mini-excavator to clear culvert debris.';
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const id = `IMG-${Math.floor(100 + Math.random() * 900)}`;

    return {
      id,
      timestamp: timeStr,
      location,
      neighbourhood,
      classification,
      severity,
      estimatedWaterDepth: depth,
      visibleConditions: conditions,
      potentialHazards: hazards,
      recommendedAction: action,
      confidence,
      analysisMode: 'OFFLINE SIMULATED ANALYSIS',
      verificationStatus: 'Pending Verification',
      imageUrl: imgSrc,
      addedToMap: false,
      incidentCreated: false,
      coordinates: neighbourhood === 'North Meridian' ? { x: 310, y: 140 } : neighbourhood === 'Central Meridian' ? { x: 580, y: 310 } : { x: 280, y: 520 }
    };
  };

  // Perform Analysis (routes to Gemini Online or Local Offline Heuristic)
  const handleAnalyzeImage = async (imageSrcToUse?: string) => {
    const src = imageSrcToUse || selectedImageSrc;
    if (!src) return;

    setIsAnalyzing(true);

    if (isOnline) {
      // ONLINE MODE: Call Gemini Vision API
      try {
        const res = await fetch('/api/gemini/analyze-flood-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: src,
            locationHint: selectedLocation,
            mimeType: 'image/jpeg'
          })
        });

        const data = await res.json();
        if (data.success && data.assessment) {
          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          const newAssessment: ImageAssessment = {
            id: `IMG-${Math.floor(100 + Math.random() * 900)}`,
            timestamp: timeStr,
            location: data.assessment.location || selectedLocation,
            neighbourhood: selectedNeighbourhood,
            classification: data.assessment.classification || 'LIKELY IMPASSABLE',
            severity: data.assessment.severity || 'HIGH',
            estimatedWaterDepth: data.assessment.estimatedWaterDepth || 'Estimated 0.5–0.8 m',
            visibleConditions: data.assessment.visibleConditions || ['Standing water', 'Road debris'],
            potentialHazards: data.assessment.potentialHazards || ['Electrical infrastructure nearby'],
            recommendedAction: data.assessment.recommendedAction || 'Restrict vehicle access and dispatch assessment team.',
            confidence: data.assessment.confidence || 84,
            analysisMode: (data.analysisMode as AnalysisMode) || 'GEMINI AI',
            verificationStatus: 'Pending Verification',
            imageUrl: src,
            addedToMap: false,
            incidentCreated: false,
            coordinates: selectedNeighbourhood === 'North Meridian' ? { x: 310, y: 140 } : selectedNeighbourhood === 'Central Meridian' ? { x: 580, y: 310 } : { x: 280, y: 520 }
          };

          setActiveAssessment(newAssessment);
          addImageAssessment(newAssessment);
          setIsAnalyzing(false);
          return;
        }
      } catch (err) {
        console.warn('Online Gemini vision failed, falling back to local heuristic analysis:', err);
      }
    }

    // OFFLINE MODE (or Network Failure Fallback):
    // Run deterministic offline browser model heuristics without external API call
    setTimeout(() => {
      const offlineAssessment = runOfflineHeuristicAnalysis(src, selectedLocation, selectedNeighbourhood);
      setActiveAssessment(offlineAssessment);
      addImageAssessment(offlineAssessment);
      setIsAnalyzing(false);
    }, 1200);
  };

  // Handle File Upload from disk
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedImageSrc(result);
      handleAnalyzeImage(result);
    };
    reader.readAsDataURL(file);
  };

  // Human Override actions
  const handleConfirm = () => {
    if (!activeAssessment) return;
    updateImageAssessment(activeAssessment.id, { verificationStatus: 'Confirmed' });
    setActiveAssessment(prev => prev ? { ...prev, verificationStatus: 'Confirmed' } : null);
  };

  const handleReject = () => {
    if (!activeAssessment) return;
    updateImageAssessment(activeAssessment.id, { verificationStatus: 'Rejected' });
    setActiveAssessment(prev => prev ? { ...prev, verificationStatus: 'Rejected' } : null);
  };

  const openEditModal = () => {
    if (!activeAssessment) return;
    setEditForm({
      classification: activeAssessment.classification,
      severity: activeAssessment.severity,
      estimatedWaterDepth: activeAssessment.estimatedWaterDepth,
      recommendedAction: activeAssessment.recommendedAction,
      overrideNotes: activeAssessment.humanOverrideNotes || ''
    });
    setIsEditingOverride(true);
  };

  const saveEditOverride = () => {
    if (!activeAssessment) return;
    const originalText = activeAssessment.originalAIAssessment || `Original AI: ${activeAssessment.classification} (${activeAssessment.estimatedWaterDepth})`;
    
    const updates: Partial<ImageAssessment> = {
      classification: editForm.classification,
      severity: editForm.severity,
      estimatedWaterDepth: editForm.estimatedWaterDepth,
      recommendedAction: editForm.recommendedAction,
      verificationStatus: 'Edited',
      humanOverrideNotes: editForm.overrideNotes || 'Operator adjusted assessment based on field tactical report.',
      originalAIAssessment: originalText
    };

    updateImageAssessment(activeAssessment.id, updates);
    setActiveAssessment(prev => prev ? { ...prev, ...updates } : null);
    setIsEditingOverride(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Mode Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 shadow-lg">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black font-display tracking-tight text-white uppercase">
                  FLOOD IMAGE ANALYSIS
                </h1>
                <HelpBadge topicId="ai-confidence" label="Confidence Protocol" />
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Upload or select field photographs for AI-assisted hydrological assessment & tactical classification.
              </p>
            </div>
          </div>
        </div>

        {/* Dual Mode Indicator */}
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <div>
                <span className="font-black tracking-wider block leading-tight">GEMINI AI</span>
                <span className="text-[10px] text-emerald-400/80 block leading-none">ONLINE ANALYSIS</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono text-xs shadow-md">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <div>
                <span className="font-black tracking-wider block leading-tight">LOCAL MODEL</span>
                <span className="text-[10px] text-amber-400/80 block leading-none">OFFLINE SIMULATED ANALYSIS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Grid: Left Image Capture / Select, Right AI Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#080d16] border border-slate-800 rounded-xl p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center space-x-2">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span>FIELD PHOTO INPUT</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500">JPG, JPEG, PNG, WEBP</span>
            </div>

            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/webp"
              className="hidden" 
            />

            {/* Upload Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 border border-cyan-400 shadow-md transition-all active:scale-98"
              >
                <Upload className="w-4 h-4" />
                <span>UPLOAD FLOOD IMAGE</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs flex items-center justify-center space-x-2 border border-slate-700 transition-all active:scale-98"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>TAKE / SELECT IMAGE</span>
              </button>
            </div>

            {/* Image Preview Box */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-800 bg-black/60 flex items-center justify-center group">
              {selectedImageSrc ? (
                <img 
                  src={selectedImageSrc} 
                  alt="Field Flood Observation" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6 text-slate-500 font-mono text-xs">
                  <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span>No image selected</span>
                </div>
              )}

              {/* Scanning Overlay Animation when analyzing */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-cyan-950/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 z-20">
                  <div className="relative w-16 h-16 border-2 border-cyan-400 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-cyan-300 animate-spin" />
                    <div className="absolute inset-x-0 h-0.5 bg-cyan-300 shadow-lg shadow-cyan-300 animate-bounce"></div>
                  </div>
                  <div className="text-center font-mono">
                    <div className="text-xs font-black tracking-widest text-cyan-300 uppercase animate-pulse">
                      ANALYZING IMAGE...
                    </div>
                    <div className="text-[10px] text-cyan-400/80 mt-0.5">
                      {isOnline ? 'Querying Gemini Vision model' : 'Executing local offline heuristic model'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Location & Sector Assignment */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">FIELD SECTOR</label>
                <select
                  value={selectedNeighbourhood}
                  onChange={(e) => setSelectedNeighbourhood(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="North Meridian">North Meridian</option>
                  <option value="Central Meridian">Central Meridian</option>
                  <option value="South Meridian">South Meridian</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">LOCATION TAG</label>
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="e.g. Road R-07"
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Quick-Select Field Presets */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">
                TEST PRESET FIELD PHOTOGRAPHS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_FIELD_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setSelectedImageSrc(sample.url);
                      setSelectedLocation(sample.location);
                      setSelectedNeighbourhood(sample.neighbourhood);
                      handleAnalyzeImage(sample.url);
                    }}
                    className={`p-2 rounded border text-left text-[11px] font-mono transition-all ${
                      selectedImageSrc === sample.url
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="truncate font-semibold">{sample.name}</div>
                    <div className="text-[9px] text-slate-500 truncate">{sample.location}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Structured AI Assessment & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeAssessment ? (
            <div className="bg-[#080d16] border border-slate-800 rounded-xl p-5 space-y-5 shadow-2xl">
              {/* Output Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-black font-mono tracking-widest text-white uppercase">
                    IMAGE ASSESSMENT
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {activeAssessment.id}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="flex items-center space-x-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{activeAssessment.timestamp}</span>
                  </span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    activeAssessment.analysisMode === 'GEMINI AI'
                      ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                  }`}>
                    {activeAssessment.analysisMode}
                  </span>
                </div>
              </div>

              {/* Assessment Key Values in Exact Requested Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Location:</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{activeAssessment.location}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Classification:</div>
                  <div className={`text-sm font-black font-mono mt-0.5 ${
                    activeAssessment.classification.includes('IMPASSABLE')
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }`}>
                    {activeAssessment.classification}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Flood Severity:</div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-black font-mono ${
                      activeAssessment.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      activeAssessment.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {activeAssessment.severity}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Estimated Water Depth:</div>
                  <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">
                    {activeAssessment.estimatedWaterDepth}
                  </div>
                </div>
              </div>

              {/* Visible Conditions */}
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Visible Conditions:
                </div>
                <div className="space-y-1">
                  {activeAssessment.visibleConditions.map((cond, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-200 font-sans">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Hazards */}
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-600/40 space-y-1.5">
                <div className="text-[10px] font-mono text-rose-300 uppercase font-bold flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Potential Hazards:</span>
                </div>
                <div className="space-y-1">
                  {activeAssessment.potentialHazards.map((hazard, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-rose-200/90 font-sans">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{hazard}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-600/40 space-y-1">
                <div className="text-[10px] font-mono text-cyan-300 uppercase font-bold">
                  Recommended Action:
                </div>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {activeAssessment.recommendedAction}
                </p>
              </div>

              {/* Confidence & Compliance Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-[#060a12] border border-slate-800 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-emerald-400 font-black text-sm">{activeAssessment.confidence}%</span>
                  <span className="text-slate-500 text-[10px]">(AI-ASSISTED ESTIMATE)</span>
                </div>

                <div className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/60 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  HUMAN VERIFICATION REQUIRED
                </div>
              </div>

              {/* Human Verification Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-slate-400">Status:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase ${
                    activeAssessment.verificationStatus === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                    activeAssessment.verificationStatus === 'Edited' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' :
                    activeAssessment.verificationStatus === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                    'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {activeAssessment.verificationStatus}
                  </span>
                </div>

                {/* Confirm, Edit, Reject Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleConfirm}
                    className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center space-x-1 shadow-sm transition-all active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>CONFIRM</span>
                  </button>

                  <button
                    onClick={openEditModal}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs flex items-center space-x-1 border border-slate-700 transition-all active:scale-95"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>EDIT</span>
                  </button>

                  <button
                    onClick={handleReject}
                    className="px-3 py-1.5 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 font-mono font-bold text-xs flex items-center space-x-1 border border-rose-700 transition-all active:scale-95"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>REJECT</span>
                  </button>
                </div>
              </div>

              {/* Human Override Notes if edited */}
              {activeAssessment.verificationStatus === 'Edited' && activeAssessment.humanOverrideNotes && (
                <div className="p-3 rounded bg-indigo-950/30 border border-indigo-500/40 text-xs font-mono space-y-1">
                  <div className="text-indigo-400 font-bold uppercase text-[10px]">Human Override Record:</div>
                  <p className="text-indigo-200">{activeAssessment.humanOverrideNotes}</p>
                  {activeAssessment.originalAIAssessment && (
                    <p className="text-slate-400 text-[10px] italic">{activeAssessment.originalAIAssessment}</p>
                  )}
                </div>
              )}

              {/* Map & Incident Conversion Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    addImageToMap(activeAssessment.id);
                    setCurrentScreen('flood-map');
                  }}
                  disabled={activeAssessment.addedToMap}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs flex items-center space-x-2 transition-all ${
                    activeAssessment.addedToMap
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 cursor-default'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950 active:scale-95'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{activeAssessment.addedToMap ? 'ADDED TO MAP ✓' : 'ADD TO MAP'}</span>
                </button>

                <button
                  onClick={() => {
                    createIncidentFromAssessment(activeAssessment.id);
                    setCurrentScreen('alerts');
                  }}
                  disabled={activeAssessment.incidentCreated}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs flex items-center space-x-2 transition-all ${
                    activeAssessment.incidentCreated
                      ? 'bg-slate-800 text-rose-400 border border-rose-500/40 cursor-default'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950 active:scale-95'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{activeAssessment.incidentCreated ? 'INCIDENT CREATED ✓' : 'CREATE INCIDENT'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#080d16] border border-slate-800 rounded-xl p-12 text-center text-slate-500 font-mono text-xs">
              <Camera className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Upload a photograph or select a field preset on the left to begin analysis.</p>
            </div>
          )}
        </div>
      </div>

      {/* IMAGE ANALYSIS HISTORY Panel (Requirement 5) */}
      <div className="bg-[#080d16] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              IMAGE ANALYSIS HISTORY
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
              {imageAssessments.length} RECORDS
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Click any record to inspect or review verification state
          </span>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Image ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Assessment</th>
                <th className="py-2.5 px-3">Analysis Mode</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {imageAssessments.map((record) => {
                const isCurrent = activeAssessment?.id === record.id;
                return (
                  <tr 
                    key={record.id}
                    onClick={() => {
                      setActiveAssessment(record);
                      setSelectedImageSrc(record.imageUrl);
                      setSelectedLocation(record.location);
                      setSelectedNeighbourhood(record.neighbourhood);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isCurrent ? 'bg-cyan-950/30 text-white' : 'hover:bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-3 font-bold text-cyan-400">{record.id}</td>
                    <td className="py-3 px-3 text-slate-400">{record.timestamp}</td>
                    <td className="py-3 px-3 font-medium">{record.location}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        record.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        record.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {record.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-200">{record.classification}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        record.analysisMode === 'GEMINI AI' 
                          ? 'text-emerald-400 bg-emerald-950/60' 
                          : 'text-amber-400 bg-amber-950/60'
                      }`}>
                        {record.analysisMode}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        record.verificationStatus === 'Confirmed' ? 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/30' :
                        record.verificationStatus === 'Edited' ? 'text-indigo-300 bg-indigo-950/40 border border-indigo-500/30' :
                        record.verificationStatus === 'Rejected' ? 'text-rose-300 bg-rose-950/40 border border-rose-500/30' :
                        'text-slate-400 bg-slate-900 border border-slate-800'
                      }`}>
                        {record.verificationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveAssessment(record);
                          setSelectedImageSrc(record.imageUrl);
                          setSelectedLocation(record.location);
                        }}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white text-[10px] font-mono transition-colors"
                      >
                        OPEN
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Override Modal */}
      {isEditingOverride && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="w-full max-w-lg bg-[#090d18] border border-cyan-500/50 rounded-xl p-6 space-y-4 shadow-2xl text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>HUMAN OVERRIDE ASSESSMENT</span>
              </h3>
              <button 
                onClick={() => setIsEditingOverride(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">CLASSIFICATION</label>
                <input
                  type="text"
                  value={editForm.classification}
                  onChange={(e) => setEditForm(prev => ({ ...prev, classification: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">SEVERITY</label>
                <select
                  value={editForm.severity}
                  onChange={(e) => setEditForm(prev => ({ ...prev, severity: e.target.value as any }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MODERATE">MODERATE</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">ESTIMATED WATER DEPTH</label>
                <input
                  type="text"
                  value={editForm.estimatedWaterDepth}
                  onChange={(e) => setEditForm(prev => ({ ...prev, estimatedWaterDepth: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">RECOMMENDED ACTION</label>
                <textarea
                  rows={2}
                  value={editForm.recommendedAction}
                  onChange={(e) => setEditForm(prev => ({ ...prev, recommendedAction: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-amber-400 block mb-1">HUMAN OVERRIDE JUSTIFICATION / NOTES</label>
                <textarea
                  rows={2}
                  value={editForm.overrideNotes}
                  onChange={(e) => setEditForm(prev => ({ ...prev, overrideNotes: e.target.value }))}
                  placeholder="Record tactical basis for overriding AI estimate..."
                  className="w-full bg-slate-900 border border-amber-500/50 rounded p-2 text-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsEditingOverride(false)}
                className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                CANCEL
              </button>
              <button
                onClick={saveEditOverride}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold"
              >
                SAVE HUMAN OVERRIDE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
