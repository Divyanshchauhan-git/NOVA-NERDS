import React from 'react';
import { X, HelpCircle, ShieldAlert, BookOpen, ExternalLink } from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { HELP_TOPICS } from '../data/helpTopics';

export const ContextHelpModal: React.FC = () => {
  const { activeHelpTopic, setActiveHelpTopic, setCurrentScreen, setIsHowToUseOpen } = useCommand();

  if (!activeHelpTopic) return null;

  const topic = HELP_TOPICS[activeHelpTopic] || {
    id: activeHelpTopic,
    title: activeHelpTopic.replace(/-/g, ' ').toUpperCase(),
    category: 'Operational Concept',
    summary: 'Standard emergency response protocol definition.',
    details: 'This parameter guides multi-agency coordination during severe flooding incidents in Meridian City.',
    operationalImpact: 'Monitor this telemetry continuously to maintain tactical control over municipal sectors.'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-[#0a0f1d] border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0c1424]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                {topic.category}
              </span>
              <h3 className="text-base font-bold font-display text-white tracking-wide">
                {topic.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setActiveHelpTopic(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-400 mb-1">Concept Summary</h4>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {topic.summary}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-400">Technical Context</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/50 p-3 rounded border border-slate-800/80">
              {topic.details}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>OPERATIONAL PROTOCOL</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
              {topic.operationalImpact}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-[#080d17] text-xs font-mono">
          <button
            onClick={() => {
              setActiveHelpTopic(null);
              setIsHowToUseOpen(true);
            }}
            className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Operator Quick Guide</span>
          </button>
          
          <button
            onClick={() => setActiveHelpTopic(null)}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-mono font-semibold"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
