import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Camera, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Download, 
  RefreshCw,
  Maximize2,
  FileText,
  Radio,
  Clock
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const { neighbourhoods, assets, shelters, roads, incidents, isTelecomOutage } = useCommand();

  const [activeTab, setActiveTab] = useState<'chat' | 'analysis' | 'recon'>('chat');

  // 1. Chat State
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: 'Meridian Dispatch AI online. Synchronized with LoRa telemetry and EOC Alpha station. Request situational guidance, resource logistics, or evacuation protocols.',
      time: '08:40'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // 2. Situation Analysis State
  const [focusArea, setFocusArea] = useState('Citywide Tactical Assessment');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 3. Recon Image Generation State
  const [reconPrompt, setReconPrompt] = useState('High-angle drone surveillance of flooded North Meridian residential basin with orange inflatable rescue boats navigating submerged avenue');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3'>('16:9');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [reconMetadata, setReconMetadata] = useState<{
    isContingency?: boolean;
    warning?: string;
    sector?: string;
    callsign?: string;
    coordinates?: string;
    altitude?: string;
  } | null>(null);

  if (!isOpen) return null;

  // Send message to Gemini Chat
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || isChatLoading) return;

    const userText = inputMsg;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newHistory = [...messages, { role: 'user' as const, text: userText, time: nowTime }];
    setMessages(newHistory);
    setInputMsg('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.text })),
          context: {
            telecomOutage: isTelecomOutage,
            neighbourhoods: neighbourhoods.map(n => ({ name: n.name, waterLevel: n.waterLevel, status: n.status })),
            activeAlertCount: incidents.length
          }
        })
      });

      const data = await response.json();
      if (data.success && data.reply) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          text: `[DISPATCH AI OFFLINE / LORA LOCAL CACHE]: Unable to reach primary model. ${data.error || 'Check GEMINI_API_KEY configuration.'}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `[COMMUNICATION INTERRUPTED]: ${err?.message || 'Server connection error.'}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Run Situation Analysis
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          focusArea,
          telemetryData: {
            neighbourhoods,
            blockedRoads: roads.filter(r => r.status === 'BLOCKED').map(r => r.name),
            activeShelters: shelters.map(s => ({ id: s.id, occupancy: `${s.currentOccupancy}/${s.capacity}` })),
            incidents: incidents.slice(0, 4)
          }
        })
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setAnalysisResult(`Tactical briefing generation failed: ${data.error || 'Check server logs.'}`);
      }
    } catch (err: any) {
      setAnalysisResult(`Analysis connection error: ${err?.message || 'Network error'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate Aerial Reconnaissance Image
  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    setImageError(null);
    setGeneratedImage(null);
    setReconMetadata(null);

    try {
      const response = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: reconPrompt,
          imageSize,
          aspectRatio
        })
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setReconMetadata({
          isContingency: data.isContingency,
          warning: data.warning,
          sector: data.sector,
          callsign: data.callsign,
          coordinates: data.coordinates,
          altitude: data.altitude,
        });
      } else {
        setImageError(data.error || 'Failed to generate aerial reconnaissance image.');
      }
    } catch (err: any) {
      setImageError(err?.message || 'Network error occurred during image generation.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#090f1d] border border-cyan-500/50 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-[#060a14] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center space-x-2">
                <span>GEMINI INTELLIGENCE & DISPATCH COPILOT</span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                  EOC v3.8
                </span>
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                AI Situation Briefings • Multi-Turn Tactical Chatbot • 4K Aerial Drone Reconnaissance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-[#080d18] px-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-2.5 px-4 font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'chat'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>DISPATCH CHATBOT</span>
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`py-2.5 px-4 font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'analysis'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>SITUATION ANALYSIS</span>
          </button>

          <button
            onClick={() => setActiveTab('recon')}
            className={`py-2.5 px-4 font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'recon'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>AERIAL RECON (1K-4K)</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-5 text-xs font-mono">
          {/* TAB 1: MULTI-TURN CHATBOT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[520px]">
              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[
                  'Assess North Basin pump capacity shortfall',
                  'Evaluate shelter supply status if roads stay cut off 12h',
                  'Draft emergency public siren directive for Sector 2',
                  'How does the LoRa mesh maintain telemetry during power blackout?'
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInputMsg(prompt)}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[10px]"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>

              {/* Chat Message Scroll Area */}
              <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-lg bg-[#060a14] border border-slate-800/80 mb-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 mb-0.5">
                      <span>{m.role === 'user' ? 'EOC OPERATOR' : 'DISPATCH AI'}</span>
                      <span>•</span>
                      <span>{m.time}</span>
                    </div>
                    <div
                      className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-cyan-950/80 border border-cyan-600/60 text-cyan-100'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-200 font-sans'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center space-x-2 text-cyan-400 text-xs animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dispatch AI consulting hydrological neural mesh...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Ask Meridian Dispatch AI for tactical advice or resource calculations..."
                  className="flex-1 px-3 py-2 bg-slate-900 rounded-lg border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !inputMsg.trim()}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center space-x-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SITUATION APPRAISAL */}
          {activeTab === 'analysis' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#060a14] p-3 rounded-lg border border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">FOCUS REGION:</span>
                  <select
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="px-2.5 py-1.5 bg-slate-900 rounded border border-slate-700 text-white"
                  >
                    <option value="Citywide Tactical Assessment">Citywide Integrated Assessment</option>
                    <option value="North Meridian Basin (Critical Zone)">North Meridian Basin (Critical Zone)</option>
                    <option value="Central Commercial Corridor (Corridor 4)">Central Commercial Corridor (Corridor 4)</option>
                    <option value="South Estuary & Mangrove Sluice">South Estuary & Mangrove Sluice</option>
                  </select>
                </div>

                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded flex items-center space-x-2 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAnalyzing ? 'GENERATING BRIEFING...' : 'RUN TACTICAL APPRAISAL'}</span>
                </button>
              </div>

              {analysisResult ? (
                <div className="p-4 rounded-lg bg-[#060a14] border border-slate-800 text-slate-200 font-sans text-xs leading-relaxed whitespace-pre-wrap">
                  {analysisResult}
                </div>
              ) : (
                <div className="p-12 text-center bg-[#060a14] rounded-lg border border-slate-800 text-slate-500">
                  Select a regional sector and click "RUN TACTICAL APPRAISAL" to synthesize real-time water levels, shelter bed capacity, and road blockages with Gemini 3.8 Flash.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AERIAL RECON IMAGE GENERATION */}
          {activeTab === 'recon' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#060a14] border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="text-slate-300 font-bold uppercase text-[11px] block">
                    AERIAL RECONNAISSANCE PROMPT:
                  </label>

                  {/* Resolution Selector: 1K, 2K, 4K as requested */}
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 text-[10px]">RESOLUTION:</span>
                    {(['1K', '2K', '4K'] as const).map(size => (
                      <button
                        key={size}
                        onClick={() => setImageSize(size)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                          imageSize === size 
                            ? 'bg-cyan-500 text-black border-cyan-400' 
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}

                    <span className="text-slate-500 ml-2">|</span>
                    <span className="text-slate-400 text-[10px] ml-2">RATIO:</span>
                    {(['16:9', '4:3', '1:1'] as const).map(r => (
                      <button
                        key={r}
                        onClick={() => setAspectRatio(r)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                          aspectRatio === r 
                            ? 'bg-amber-500 text-black border-amber-400' 
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={reconPrompt}
                  onChange={(e) => setReconPrompt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white placeholder-slate-500 text-xs font-sans focus:outline-hidden focus:border-cyan-500"
                ></textarea>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <span className="text-slate-500">Presets:</span>
                  {[
                    'North Meridian River basin breached with floating rescue zodiacs',
                    'Commercial metro spine with 200m modular pontoon footbridge deployed',
                    'Industrial petrochemical containment boom containing flood runoff'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => setReconPrompt(preset)}
                      className="text-cyan-400 hover:underline"
                    >
                      [{preset.split(' ')[0]} {preset.split(' ')[1]}]
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded flex items-center justify-center space-x-2 transition-colors shadow-md"
                >
                  <Camera className="w-4 h-4" />
                  <span>
                    {isGeneratingImage 
                      ? `SYNTHESIZING ${imageSize} SATELLITE / DRONE RECON...` 
                      : `GENERATE ${imageSize} TACTICAL SATELLITE RECONNAISSANCE`}
                  </span>
                </button>
              </div>

              {imageError && (
                <div className="p-3 rounded bg-rose-950/80 border border-rose-600 text-rose-200 text-xs font-mono flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{imageError}</span>
                </div>
              )}

              {/* Rendered Image Display */}
              {generatedImage && (
                <div className="p-3 bg-[#060a14] rounded-lg border border-cyan-500/50 space-y-3">
                  {reconMetadata?.isContingency && (
                    <div className="p-2.5 rounded bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs font-mono flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div className="space-y-1">
                        <div className="font-bold text-amber-300 flex items-center space-x-2">
                          <span>EOC TACTICAL DRONE ARCHIVE ENGAGED</span>
                          <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono border border-amber-400/30">
                            {reconMetadata.callsign || 'DRONE-RECON'}
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-200/80 leading-relaxed">
                          {reconMetadata.warning || 'Gemini 3.1 Flash Image model is rate-limited on the current project quota (429 RESOURCE_EXHAUSTED). Autonomous EOC synthetic aerial drone reconnaissance archive active.'}
                        </p>
                        {reconMetadata.sector && (
                          <div className="text-[10px] text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 border-t border-amber-500/20">
                            <span>SECTOR: <strong className="text-white">{reconMetadata.sector}</strong></span>
                            {reconMetadata.altitude && <span>ALTITUDE: <strong className="text-white">{reconMetadata.altitude}</strong></span>}
                            {reconMetadata.coordinates && <span>GRID: <strong className="text-white">{reconMetadata.coordinates}</strong></span>}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="text-cyan-400 font-bold">
                      AERIAL RECONNAISSANCE FEED • {imageSize} RESOLUTION • {reconMetadata?.isContingency ? 'EOC DRONE ARCHIVE' : 'LIVE GEMINI 3.1 FLASH SYNTHESIS'}
                    </span>
                    <a
                      href={generatedImage}
                      download={`meridian-recon-${Date.now()}.png`}
                      className="text-amber-400 hover:underline flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>DOWNLOAD HIGH-RES</span>
                    </a>
                  </div>

                  <div className="relative rounded border border-slate-800 overflow-hidden shadow-xl">
                    <img
                      src={generatedImage}
                      alt="Tactical Flood Reconnaissance"
                      className="w-full max-h-[360px] object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Live Tactical HUD Overlay */}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-xs border border-cyan-500/40 rounded text-[10px] font-mono text-cyan-300 flex items-center space-x-2 pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{reconMetadata?.callsign || 'UAV-ALPHA-01'} // RECON FEED</span>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-xs border border-slate-700 rounded text-[10px] font-mono text-slate-300 pointer-events-none">
                      {reconMetadata?.coordinates || '28°36\'42"N 77°12\'19"E'} | AGL: {reconMetadata?.altitude || '1,450 FT'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#060a14] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Server-Side Gemini Model Engine: gemini-3.8-flash & gemini-3.1-flash-image</span>
          <span className="text-cyan-400">EOC Telemetry Encrypted</span>
        </div>
      </div>
    </div>
  );
};
