import React from 'react';
import { 
  Activity, 
  Map as MapIcon, 
  Building2, 
  Cpu, 
  Users, 
  Zap, 
  Truck, 
  Leaf, 
  Radio, 
  DollarSign, 
  AlertTriangle, 
  Settings, 
  ShieldAlert,
  WifiOff,
  Flame,
  Camera,
  BookOpen
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { ScreenId } from '../types';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Navigation: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    systemStats, 
    isTelecomOutage,
    imageAssessments,
    setIsHowToUseOpen
  } = useCommand();

  const pendingImageCount = imageAssessments.filter(a => a.verificationStatus === 'Pending Verification').length;

  const navItems: NavItem[] = [
    { id: 'command-center', label: 'Command Center', icon: Activity },
    { id: 'flood-map', label: 'Flood Map', icon: MapIcon },
    { id: 'image-analysis', label: 'Flood Image Analysis', icon: Camera, badge: pendingImageCount },
    { id: 'neighbourhoods', label: 'Neighbourhoods', icon: Building2 },
    { id: 'infrastructure', label: 'Infrastructure', icon: Cpu },
    { id: 'people-shelters', label: 'People & Shelters', icon: Users },
    { id: 'power-utilities', label: 'Power & Utilities', icon: Zap },
    { id: 'mobility', label: 'Mobility', icon: Truck },
    { id: 'environment', label: 'Environment', icon: Leaf },
    { id: 'sensing-comms', label: 'Sensing & Communications', icon: Radio },
    { id: 'budget-deployment', label: 'Budget & Deployment', icon: DollarSign },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: systemStats.unacknowledgedAlertsCount },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#070b12] border-r border-slate-800/80 flex flex-col justify-between select-none z-30">
      {/* City & System Brand */}
      <div>
        <div className="px-5 py-4 border-b border-slate-800/70 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-9 h-9 rounded bg-rose-950/80 border border-rose-600/80 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-950/40">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            </div>
            <div>
              <div className="text-[13px] font-bold tracking-wider text-slate-100 font-display uppercase leading-tight">
                Meridian City
              </div>
              <div className="text-[10px] tracking-widest text-rose-400 font-mono font-semibold">
                FLOOD COMMAND
              </div>
            </div>
          </div>
          <div className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold animate-pulse">
            LIVE
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-[13px] font-medium transition-all ${
                  isActive 
                    ? 'bg-slate-800/90 text-amber-400 border border-amber-500/30 shadow-sm font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-600 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Guide Button */}
        <div className="px-3 pt-2">
          <button
            onClick={() => setIsHowToUseOpen(true)}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-bold transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>OPERATOR GUIDE</span>
          </button>
        </div>
      </div>

      {/* Network Outage Indicator Banner if active */}
      {isTelecomOutage && (
        <div className="mx-3 mb-2 p-2.5 rounded bg-amber-950/70 border border-amber-600/60 text-amber-300 text-[11px] font-mono">
          <div className="flex items-center space-x-2 font-bold text-amber-400 mb-1">
            <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>COMMERCIAL OUTAGE</span>
          </div>
          <p className="text-[10px] text-amber-200/80 leading-snug">
            Operating via LoRa Mesh 868MHz + Runner Relay network.
          </p>
        </div>
      )}

      {/* Bottom Emergency Status Block */}
      <div className="p-4 border-t border-slate-800/70 bg-[#05080e]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300">
              MERIDIAN CITY
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
            EMERGENCY MODE
          </span>
        </div>

        <div className="bg-slate-900/80 rounded p-2 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Flame className="w-3 h-3 text-rose-400" />
            <span>LEVEL 3 CRISIS</span>
          </div>
          <span className="text-emerald-400 font-bold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>SYSTEM ONLINE</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
