import React, { useState } from 'react';
import { 
  DollarSign, 
  PieChart, 
  ShoppingCart, 
  FileText, 
  TrendingDown, 
  CheckCircle2, 
  Plus, 
  Sliders, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useCommand } from '../context/CommandContext';

export const BudgetDeploymentScreen: React.FC = () => {
  const { addAlert, addRecentOperation } = useCommand();

  const [totalAllocated, setTotalAllocated] = useState(15000000); // $15M
  const [spent, setSpent] = useState(7850000); // $7.85M
  const [committed, setCommitted] = useState(3420000); // $3.42M
  const [auditLog, setAuditLog] = useState([
    { id: 'TX-904', item: 'Emergency Solar LiFePO4 Battery Buffers (4x 200kWh)', amount: 320000, timestamp: '08:44', approver: 'EOC Finance Lead' },
    { id: 'TX-903', item: 'Diesel Generator Bulk Fuel Infill (20,000 Liters)', amount: 48000, timestamp: '08:21', approver: 'Logistics Desk' },
    { id: 'TX-902', item: '500m Pontoon Footbridge Extender Segments', amount: 140000, timestamp: '07:55', approver: 'Public Works Chief' },
    { id: 'TX-901', item: 'Medical Trauma Surgical Supplies & Plasma Packets', amount: 85000, timestamp: '07:15', approver: 'Health Commissioner' },
  ]);

  const remaining = totalAllocated - spent - committed;

  const categories = [
    { name: 'Drainage & Pumping', amount: 4200000, pct: 28, color: 'bg-amber-500' },
    { name: 'Shelters & Humanitarian Supplies', amount: 3100000, pct: 21, color: 'bg-emerald-500' },
    { name: 'Power & Microgrid Hardening', amount: 2800000, pct: 19, color: 'bg-cyan-500' },
    { name: 'Mobility, Pontoons & Fleet', amount: 2400000, pct: 16, color: 'bg-rose-500' },
    { name: 'Environmental Containment & Water Skids', amount: 1400000, pct: 9, color: 'bg-teal-500' },
    { name: 'LoRa Mesh & Sensor Infrastructure', amount: 1100000, pct: 7, color: 'bg-indigo-500' },
  ];

  const quickProcure = (item: string, cost: number) => {
    setCommitted(prev => prev + cost);
    const newTx = {
      id: `TX-${Math.floor(Math.random() * 899 + 100)}`,
      item,
      amount: cost,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      approver: 'EOC Instant Authorization'
    };
    setAuditLog(prev => [newTx, ...prev]);
    addAlert(`Emergency procurement approved: ${item} ($${cost.toLocaleString()})`, 'STANDARD', 'Central');
    addRecentOperation(`Authorized $${cost.toLocaleString()} for ${item}`, 'Finance');
  };

  return (
    <div className="p-5 space-y-5">
      {/* Top Header */}
      <div className="bg-[#080d16] p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
              EMERGENCY BUDGET & PROCUREMENT DEPLOYMENT
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Municipal disaster relief fiscal allocations, emergency procurement authorization, and audit reconciliation
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            SPECIAL EMERGENCY POWERS: ACTIVE
          </span>
        </div>
      </div>

      {/* 4 KPI Budget Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Allocated */}
        <div className="p-4 rounded-lg bg-[#0d1322] border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 text-[10px] uppercase block">TOTAL EMERGENCY ALLOCATION</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            ${(totalAllocated / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-slate-400">Meridian Municipal Emergency Fund</span>
        </div>

        {/* Spent */}
        <div className="p-4 rounded-lg bg-[#0d1322] border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 text-[10px] uppercase block">DISBURSED / SPENT</span>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
            ${(spent / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-amber-400 font-semibold">
            {Math.round((spent / totalAllocated) * 100)}% of Budget Cleared
          </span>
        </div>

        {/* Committed */}
        <div className="p-4 rounded-lg bg-[#0d1322] border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 text-[10px] uppercase block">ENCUMBERED / COMMITTED</span>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
            ${(committed / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-cyan-400 font-semibold">
            Active Contracts & Purchase Orders
          </span>
        </div>

        {/* Remaining */}
        <div className="p-4 rounded-lg bg-[#0d1322] border border-emerald-900/50 text-xs font-mono">
          <span className="text-emerald-400 text-[10px] uppercase block">REMAINING LIQUIDITY</span>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
            ${(remaining / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            Available For Surge Orders
          </span>
        </div>
      </div>

      {/* Category Breakdown Progress Grid */}
      <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800">
        <h2 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-4 flex items-center space-x-2">
          <PieChart className="w-4 h-4 text-cyan-400" />
          <span>CAPEX & OPEX ALLOCATION BREAKDOWN</span>
        </h2>

        <div className="space-y-3.5">
          {categories.map(c => (
            <div key={c.name} className="space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-200 font-medium">{c.name}</span>
                <div className="space-x-3">
                  <span className="text-slate-400">${(c.amount / 1000000).toFixed(2)}M</span>
                  <span className="text-white font-bold">{c.pct}%</span>
                </div>
              </div>
              <div className="w-full h-2 rounded bg-slate-800 overflow-hidden">
                <div className={`h-full rounded ${c.color}`} style={{ width: `${c.pct * 2}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2 Columns: Emergency Quick-Order Panel & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Quick Order Panel */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                  EMERGENCY PROCUREMENT QUICK-ORDER
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400">Direct Vendor Dispatch</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              Authorize accelerated mutual-aid procurement vouchers without standard 30-day municipal bidding cycle.
            </p>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">5x High-Flow Submersible Pumps (600 m³/hr)</span>
                  <span className="text-slate-400 text-[10px]">Vendor: FlowServe Industrial • Delivery ETA: 2 hrs</span>
                </div>
                <button
                  onClick={() => quickProcure('5x High-Flow Submersible Pumps', 120000)}
                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                >
                  ORDER: $120k
                </button>
              </div>

              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">2x Heavy Zodiac Rescue Inflatables</span>
                  <span className="text-slate-400 text-[10px]">Vendor: Zodiac Milpro • Delivery ETA: 45 min</span>
                </div>
                <button
                  onClick={() => quickProcure('2x Heavy Zodiac Rescue Inflatables', 45000)}
                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                >
                  ORDER: $45k
                </button>
              </div>

              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">500m Modular Interlocking Flood Barrier</span>
                  <span className="text-slate-400 text-[10px]">Vendor: HydroDefense Corp • Delivery ETA: 90 min</span>
                </div>
                <button
                  onClick={() => quickProcure('500m Modular Flood Barrier', 80000)}
                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                >
                  ORDER: $80k
                </button>
              </div>

              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">5,000x High-Calorie Shelter MRE Packs</span>
                  <span className="text-slate-400 text-[10px]">Vendor: National Ration Logistics • Delivery ETA: 1 hr</span>
                </div>
                <button
                  onClick={() => quickProcure('5,000x High-Calorie Shelter MRE Packs', 25000)}
                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                >
                  ORDER: $25k
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
            All purchases logged automatically to the City Auditor Blockchain ledger with GPS timestamps.
          </div>
        </div>

        {/* Financial Audit Trail */}
        <div className="bg-[#0b111d] p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                  REAL-TIME FISCAL AUDIT TRAIL
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Live Reconciliation</span>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {auditLog.map(tx => (
                <div key={tx.id} className="p-3 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white font-sans text-xs">{tx.item}</span>
                    <span className="text-emerald-400 font-bold">${tx.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-800/60">
                    <span>Voucher {tx.id} • Auth: {tx.approver}</span>
                    <span>{tx.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-400">
            <span>Treasury Liaison: City Comptroller Office</span>
            <span className="text-emerald-400 font-semibold">Ledger Intact</span>
          </div>
        </div>
      </div>
    </div>
  );
};
