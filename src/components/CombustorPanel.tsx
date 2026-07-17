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
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-serif text-ink italic">Combustor Uniformity</h2>
        <p className="text-muted text-lg">Flow distortion index (DI &lt; 10%) and swirl number optimization for flame stability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distortion Index */}
        <div className="p-8 bg-surface-dark rounded-xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Distortion Index (DI) %
            </h3>
            <div className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold">
              THRESHOLD: 10%
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distortionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252320" vertical={false} />
                <XAxis dataKey="mach" stroke="#6c6a64" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6c6a64" fontSize={10} tickLine={false} axisLine={false} domain={[0, 15]} />
                <Tooltip 
                  cursor={{ fill: '#252320' }}
                  contentStyle={{ backgroundColor: '#1f1e1b', border: '1px solid #252320', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="di" fill="#cc785c" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Swirl Number Radar */}
        <div className="p-8 bg-surface-dark rounded-xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              Swirl Strength Profile
            </h3>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={swirlRadar}>
                <PolarGrid stroke="#252320" />
                <PolarAngleAxis dataKey="subject" stroke="#6c6a64" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 1]} stroke="#6c6a64" fontSize={8} />
                <Radar
                  name="Current Design"
                  dataKey="A"
                  stroke="#a78bfa"
                  fill="#a78bfa"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Recirculation Zone', value: '12.4 cm³', sub: 'Optimal Range', color: 'bg-emerald-500', progress: 65 },
          { label: 'Ignition Stability', value: 'HIGH', sub: 'Swirl 0.4~0.6 OK', color: 'bg-primary', progress: 88 },
          { label: 'Max Heat Release', value: '1.2 GW/m³', sub: 'Safety Margin OK', color: 'bg-amber-500', progress: 45 },
        ].map((item) => (
          <div key={item.label} className="p-6 border border-hairline rounded-lg bg-surface-card space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-soft uppercase tracking-widest">{item.label}</span>
              <p className="text-2xl font-serif italic text-ink">{item.value}</p>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 bg-hairline rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-500", item.color)} 
                  style={{ width: `${item.progress}%` }} 
                />
              </div>
              <p className="text-[10px] text-muted-soft font-medium font-mono">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
