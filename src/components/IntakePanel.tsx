import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine
} from 'recharts';
import { mockCfdMetrics } from '../data';
import { Info, TrendingUp, ShieldAlert } from 'lucide-react';

export default function IntakePanel() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Intake Stability Analysis</h2>
          <p className="text-zinc-400">Shock train control and pressure recovery performance (PR &gt; 0.8 Threshold).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pressure Recovery Chart */}
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Pressure Recovery (PR) vs. Mach
            </h3>
            <div className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded">
              CFD RESULTS
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockCfdMetrics}>
                <defs>
                  <linearGradient id="colorPr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="mach" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Mach Number', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#71717a' }}
                />
                <YAxis 
                  domain={[0.5, 1]} 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'PR Rate', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#71717a' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <ReferenceLine y={0.8} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Target 0.8', position: 'right', fill: '#ef4444', fontSize: 10 }} />
                <Area type="monotone" dataKey="pressureRecovery" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPr)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shock Train Margin */}
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Shock Train Margin (%)
            </h3>
            <div className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
              STABILITY LIMIT
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCfdMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="mach" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Margin (%)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#71717a' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Line type="stepAfter" dataKey="shockMargin" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl flex gap-4">
        <Info className="w-6 h-6 text-blue-500 shrink-0" />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-blue-100">Engineering Recommendation</h4>
          <p className="text-sm text-blue-100/70">
            Shock margin drops below 5% at Mach 3.0+. Recommend adjusting Lip geometry (Spillage Drag Optimization) 
            to maintain shock stability during high Alpha maneuvers. Current pressure recovery remains above target 0.8 up to Mach 3.2.
          </p>
        </div>
      </div>
    </div>
  );
}
