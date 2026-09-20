import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useCommand } from '../context/CommandContext';

interface HelpBadgeProps {
  topicId?: string;
  topic?: string;
  className?: string;
  label?: string;
}

export const HelpBadge: React.FC<HelpBadgeProps> = ({ topicId, topic, className = '', label }) => {
  const { setActiveHelpTopic } = useCommand();
  const resolvedTopic = topicId || topic || 'quick-guide';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setActiveHelpTopic(resolvedTopic);
      }}
      className={`inline-flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer text-[10px] font-mono group p-0.5 rounded hover:bg-cyan-950/40 ${className}`}
      title={label ? `Explain: ${label}` : 'Click for operational definition'}
      aria-label={label ? `Help for ${label}` : 'Operational definition'}
    >
      <HelpCircle className="w-3 h-3 group-hover:scale-110 transition-transform text-cyan-400/80" />
      {label && <span className="text-slate-400 group-hover:text-cyan-300">{label}</span>}
    </button>
  );
};
