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
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-serif text-ink italic">Intake Stability Analysis</h2>
        <p className="text-muted text-lg">Shock train control and pressure recovery performance mapping (PR &gt; 0.8 Threshold).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pressure Recovery Chart - Dark Card */}
        <div className="p-8 bg-surface-dark rounded-xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Pressure Recovery Profile
            </h3>
            <div className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold">
              SOLVER: RANS
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockCfdMetrics}>
                <defs>
                  <linearGradient id="colorPr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cc785c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#cc785c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#252320" vertical={false} />
                <XAxis 
                  dataKey="mach" 
                  stroke="#6c6a64" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Mach Number', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#6c6a64', fontStyle: 'italic' }}
                />
                <YAxis 
                  domain={[0.5, 1]} 
                  stroke="#6c6a64" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f1e1b', border: '1px solid #252320', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#faf9f5' }}
                />
                <ReferenceLine y={0.8} stroke="#cc785c" strokeDasharray="5 5" label={{ value: 'Limit', position: 'right', fill: '#cc785c', fontSize: 10 }} />
                <Area type="monotone" dataKey="pressureRecovery" stroke="#cc785c" fillOpacity={1} fill="url(#colorPr)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shock Train Margin - Dark Card */}
        <div className="p-8 bg-surface-dark rounded-xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-500" />
              Shock Train Margin (%)
            </h3>
            <div className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full font-bold">
              STABILITY LIMIT
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCfdMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252320" vertical={false} />
                <XAxis 
                  dataKey="mach" 
                  stroke="#6c6a64" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6c6a64" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f1e1b', border: '1px solid #252320', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="shockMargin" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="p-8 bg-surface-card border border-hairline rounded-xl flex gap-6 items-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Info className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-serif italic text-ink">Engineering Recommendation</h4>
          <p className="text-sm text-body leading-relaxed">
            Shock margin drops below 5% at Mach 3.0+. Recommend adjusting Lip geometry (Spillage Drag Optimization) 
            to maintain shock stability during high Alpha maneuvers. Current pressure recovery remains above target 0.8 up to Mach 3.2.
          </p>
        </div>
      </div>
    </div>
  );
}
