import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { mockCfdMetrics } from '../data';
import { Flame, Target, Sliders } from 'lucide-react';

export default function CombustorPanel() {
  // Mock data for Swirl Number and Distortion Index
  const distortionData = mockCfdMetrics.map(d => ({
    mach: `M${d.mach}`,
    di: (d.distortionIndex * 100).toFixed(1),
    limit: 10
  }));

  const swirlRadar = [
    { subject: 'Radial Swirl', A: 0.45, fullMark: 1 },
    { subject: 'Tangential', A: 0.52, fullMark: 1 },
    { subject: 'Axial Flux', A: 0.58, fullMark: 1 },
    { subject: 'Recirculation', A: 0.48, fullMark: 1 },
    { subject: 'Flame Hold', A: 0.62, fullMark: 1 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Combustor Uniformity</h2>
        <p className="text-zinc-400">Flow distortion index (DI &lt; 10%) and swirl number optimization for flame stability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distortion Index */}
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-500" />
            Distortion Index (DI) %
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distortionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="mach" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} domain={[0, 15]} />
                <Tooltip 
                  cursor={{ fill: '#27272a' }}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="di" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-[10px] text-zinc-500 font-mono">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
              Calculated DI
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-px bg-zinc-600 border-t border-dashed" />
              Safety Threshold (10%)
            </div>
          </div>
        </div>

        {/* Swirl Number Radar */}
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-500" />
            Swirl Strength Profile
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={swirlRadar}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" stroke="#71717a" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 1]} stroke="#71717a" fontSize={8} />
                <Radar
                  name="Current Design"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Recirculation Zone</span>
          <p className="text-lg font-bold mt-1">12.4 cm³</p>
          <div className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-[65%] h-full bg-emerald-500" />
          </div>
          <p className="text-[10px] text-zinc-500 mt-1">Within optimal ignition range</p>
        </div>
        <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ignition Stability</span>
          <p className="text-lg font-bold mt-1">HIGH</p>
          <div className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-[88%] h-full bg-blue-500" />
          </div>
          <p className="text-[10px] text-zinc-500 mt-1">Swirl 0.4~0.6 compliant</p>
        </div>
        <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Max Heat Release</span>
          <p className="text-lg font-bold mt-1">1.2 GW/m³</p>
          <div className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-[45%] h-full bg-rose-500" />
          </div>
          <p className="text-[10px] text-zinc-500 mt-1">Structural safety margin ok</p>
        </div>
      </div>
    </div>
  );
}
