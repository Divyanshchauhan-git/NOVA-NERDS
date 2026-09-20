import React, { useState } from 'react';
import { 
  Cpu, 
  Search, 
  Filter, 
  Zap, 
  Battery, 
  Wrench, 
  MapPin, 
  Power, 
  Activity, 
  Send, 
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';
import { Asset, AssetStatus } from '../types';

export const InfrastructureScreen: React.FC = () => {
  const { assets, setSelectedAsset, togglePump } = useCommand();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filterStatuses: (string)[] = ['All', 'Active', 'Warning', 'Offline', 'Deployed', 'Needs Maintenance'];

  const categories = [
    'All',
    'Solar-battery submersible pump',
    'Flood barrier',
    'Outfall treatment skid',
    'Excavator',
    'Pontoon walkway',
    'Boat',
    'Amphibious vehicle',
    'Medical tent',
    'Microgrid',
    'Battery swap station',
    'Diesel backup generator',
    'Water treatment skid',
    'Containment boom',
    'LoRa node',
    'Float gauge'
  ];

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || asset.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-5 space-y-5">
      {/* Top Controls Bar */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              CRITICAL INFRASTRUCTURE & ASSET FLEET
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Tracking 15 asset classifications across decentralized municipal resilience nodes
          </p>
        </div>

        {/* Quick Stats Summary */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">TOTAL FLEET</span>
            <span className="font-bold text-white text-sm">{assets.length} Assets Registered</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-emerald-900/40">
            <span className="text-emerald-400 text-[10px] block">ACTIVE STATUS</span>
            <span className="font-bold text-emerald-300 text-sm">
              {assets.filter(a => a.status === 'Active' || a.status === 'Deployed').length} Operational
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b111d] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by asset ID, keyword, category or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 rounded border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 text-[11px] mr-1 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1 text-amber-400" /> STATUS:
          </span>
          {filterStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === status
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 rounded border border-slate-700 text-slate-200 focus:outline-hidden focus:border-amber-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All 15 Asset Categories' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-[#0b111d] rounded-lg border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-[#080d16] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Capacity / Specs</th>
                <th className="py-3 px-4">Battery / Fuel</th>
                <th className="py-3 px-4">Last Update</th>
                <th className="py-3 px-4">Assigned Team</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-500 font-mono">
                    No matching infrastructure assets located for this query.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => {
                  const isPump = asset.category === 'Solar-battery submersible pump';
                  const isCritical = asset.status === 'Warning' || asset.status === 'Offline';

                  return (
                    <tr 
                      key={asset.id}
                      className="hover:bg-slate-900/60 transition-colors cursor-pointer group"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      {/* Asset ID & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2.5">
                          <span className="font-bold text-amber-400 text-xs px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                            {asset.id}
                          </span>
                          <div>
                            <div className="font-bold text-white group-hover:text-amber-400 transition-colors font-sans text-xs">
                              {asset.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {asset.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
                          <span className="truncate max-w-[160px]" title={asset.location}>
                            {asset.location}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">{asset.neighbourhood}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          asset.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                          asset.status === 'Deployed' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
                          asset.status === 'Warning' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                          'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}>
                          {asset.status}
                        </span>
                      </td>

                      {/* Capacity */}
                      <td className="py-3 px-4 text-slate-200">
                        {asset.capacity}
                      </td>

                      {/* Battery / Fuel */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                          <Battery className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{asset.batteryFuel}</span>
                        </div>
                      </td>

                      {/* Last Update */}
                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {asset.lastUpdate}
                      </td>

                      {/* Assigned Team */}
                      <td className="py-3 px-4 text-slate-300">
                        {asset.assignedTeam}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-2">
                          {isPump ? (
                            <button
                              onClick={() => togglePump(asset.id)}
                              className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold"
                            >
                              {asset.status === 'Active' ? 'STANDBY' : 'START'}
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedAsset(asset)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] border border-slate-700"
                            >
                              INSPECT
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#080d16] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Displaying {filteredAssets.length} of {assets.length} decentralized assets</span>
          <span className="text-emerald-400 font-semibold">Decentralized Power & LoRa Link Active</span>
        </div>
      </div>
    </div>
  );
};
