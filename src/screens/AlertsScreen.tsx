import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Radio, 
  Megaphone, 
  Plus, 
  Filter, 
  Clock,
  Volume2
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { AlertSeverity } from '../types';

export const AlertsScreen: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert, addAlert } = useCommand();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');
  const [showBroadcastNotice, setShowBroadcastNotice] = useState<string | null>(null);

  // Manual alert form
  const [newMsg, setNewMsg] = useState('');
  const [newSeverity, setNewSeverity] = useState<AlertSeverity>('HIGH');
  const [newSector, setNewSector] = useState<'North' | 'Central' | 'South' | 'Citywide'>('North');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSev = severityFilter === 'ALL' || alert.severity === severityFilter;
    const matchesSec = sectorFilter === 'ALL' || alert.sector === sectorFilter;
    return matchesSev && matchesSec;
  });

  const handleBroadcast = (alertMsg: string) => {
    setShowBroadcastNotice(alertMsg);
    setTimeout(() => setShowBroadcastNotice(null), 4000);
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    addAlert(newMsg, newSeverity, newSector);
    setNewMsg('');
  };

  return (
    <div className="p-5 space-y-5">
      {/* Top Banner */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-rose-500 animate-pulse" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              EMERGENCY WARNINGS & AUDIT LOGS
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Public warning dissemination, emergency cell broadcast triggers, and operational audit dispatch
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">TOTAL ACTIVE WARNINGS</span>
            <span className="font-bold text-white text-sm">{alerts.filter(a => !a.resolved).length} Warnings</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-rose-900/40">
            <span className="text-rose-400 text-[10px] block">CRITICAL SEVERITY</span>
            <span className="font-bold text-rose-300 text-sm">
              {alerts.filter(a => a.severity === 'CRITICAL' && !a.resolved).length} Escalated
            </span>
          </div>
        </div>
      </div>

      {/* Broadcast simulation feedback message */}
      {showBroadcastNotice && (
        <div className="p-3.5 rounded-lg bg-indigo-950/80 border border-indigo-500 text-indigo-200 text-xs font-mono flex items-center space-x-3 shadow-lg animate-pulse">
          <Megaphone className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="font-bold text-white block">CIVIL PROTECTION EMERGENCY BROADCAST TRANSMITTED:</span>
            <span>"{showBroadcastNotice}" pushed to all LoRa sirens, FM Radio overriding frequencies, and SMS cell broadcast relays.</span>
          </div>
        </div>
      )}

      {/* Filter and Create Alert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Filter bar + Alert List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters Bar */}
          <div className="bg-[#0b111d] p-3 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-[11px] flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1 text-amber-400" /> SEVERITY:
              </span>
              {(['ALL', 'CRITICAL', 'HIGH', 'STANDARD'] as const).map(sev => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    severityFilter === sev 
                      ? 'bg-amber-500 text-black font-bold' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-[11px]">SECTOR:</span>
              {(['ALL', 'North', 'Central', 'South', 'Citywide'] as const).map(sec => (
                <button
                  key={sec}
                  onClick={() => setSectorFilter(sec)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    sectorFilter === sec 
                      ? 'bg-cyan-500 text-black font-bold' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Alert Cards */}
          <div className="space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="p-8 text-center bg-[#0b111d] rounded-lg border border-slate-800 text-slate-500 font-mono text-xs">
                No alerts currently match the selected severity and sector filter.
              </div>
            ) : (
              filteredAlerts.map(alert => {
                const isCrit = alert.severity === 'CRITICAL';
                const isHigh = alert.severity === 'HIGH';
                const borderClass = isCrit ? 'border-rose-600/70 bg-rose-950/20' : isHigh ? 'border-amber-500/60 bg-[#0e121d]' : 'border-slate-800 bg-[#0b111d]';

                return (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-lg border ${borderClass} flex flex-col justify-between text-xs font-mono space-y-3 transition-all ${
                      alert.resolved ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isCrit ? 'bg-rose-600 text-white' : isHigh ? 'bg-amber-500 text-black' : 'bg-cyan-600 text-white'
                        }`}>
                          {alert.severity}
                        </span>
                        <span className="font-bold text-amber-400">{alert.sector} Sector</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{alert.time}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {alert.acknowledged && !alert.resolved && (
                          <span className="text-cyan-400 text-[10px] font-bold">
                            ACKNOWLEDGED BY EOC
                          </span>
                        )}
                        {alert.resolved && (
                          <span className="text-emerald-400 text-[10px] font-bold flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>RESOLVED</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-sans text-slate-100 font-medium leading-relaxed">
                      {alert.message}
                    </p>

                    {/* Operational Action Buttons */}
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => handleBroadcast(alert.message)}
                        className="px-2.5 py-1 rounded bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-500/50 font-bold flex items-center space-x-1 text-[11px]"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>BROADCAST TO MESH SIRENS</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        {!alert.acknowledged && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-bold"
                          >
                            ACKNOWLEDGE
                          </button>
                        )}
                        {!alert.resolved && (
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold"
                          >
                            MARK RESOLVED
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Dispatch / Issue Manual Emergency Alert */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 h-fit">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 mb-4">
            <Plus className="w-4 h-4 text-rose-500" />
            <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              ISSUE COMMAND ALERT
            </h3>
          </div>

          <form onSubmit={handleCreateAlert} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-slate-400 text-[11px] block mb-1">TARGET SECTOR:</label>
              <select
                value={newSector}
                onChange={(e) => setNewSector(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-hidden focus:border-amber-500"
              >
                <option value="North">North Meridian</option>
                <option value="Central">Central Meridian</option>
                <option value="South">South Meridian</option>
                <option value="Citywide">Citywide (All Sectors)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-[11px] block mb-1">ALERT SEVERITY:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['CRITICAL', 'HIGH', 'STANDARD'] as const).map(sev => (
                  <button
                    type="button"
                    key={sev}
                    onClick={() => setNewSeverity(sev)}
                    className={`py-1.5 rounded text-center font-bold text-[10px] border ${
                      newSeverity === sev 
                        ? sev === 'CRITICAL' ? 'bg-rose-600 text-white border-rose-500' :
                          sev === 'HIGH' ? 'bg-amber-500 text-black border-amber-400' :
                          'bg-cyan-600 text-white border-cyan-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-[11px] block mb-1">ALERT BULLETIN / DIRECTIVE:</label>
              <textarea
                rows={4}
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="E.g. Mandatory evacuation order issued for Sector 3 low-lying residents. Proceed immediately to Shelter S-01..."
                className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 text-xs font-sans"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-2"
            >
              <Megaphone className="w-4 h-4" />
              <span>DISSEMINATE EMERGENCY BULLETIN</span>
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
            Emergency broadcasts comply with CAP v1.2 (Common Alerting Protocol standard).
          </div>
        </div>
      </div>
    </div>
  );
};
