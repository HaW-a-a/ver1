import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { mockThermalMapping } from '../data';
import { Database, FileJson, FileSpreadsheet, Thermometer } from 'lucide-react';

export default function InterfacePanel() {
  const exportAsJson = () => {
    const dataStr = JSON.stringify(mockThermalMapping, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'APPS_Thermal_Interface_Mapping.json';
    link.click();
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-serif text-ink italic">Interface & Load Mapping</h2>
          <p className="text-muted text-lg">Automated conversion of flow data to structural/thermal mesh inputs.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportAsJson}
            className="flex items-center gap-2 px-4 py-2 bg-canvas hover:bg-surface-soft text-ink rounded-md text-sm font-semibold transition-colors border border-hairline"
          >
            <FileJson className="w-4 h-4" />
            JSON
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-active text-white rounded-md text-sm font-semibold transition-colors shadow-lg shadow-primary/20">
            <FileSpreadsheet className="w-4 h-4" />
            CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-surface-dark rounded-xl space-y-6 shadow-2xl">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-primary" />
            Thermal Load Profile (Wall Convection)
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252320" />
                <XAxis 
                  type="number" 
                  dataKey="positionX" 
                  name="Position" 
                  unit="m" 
                  stroke="#6c6a64" 
                  fontSize={10} 
                />
                <YAxis 
                  type="number" 
                  dataKey="temperature" 
                  name="Temperature" 
                  unit="K" 
                  stroke="#6c6a64" 
                  fontSize={10} 
                />
                <ZAxis type="number" dataKey="heatTransferCoeff" range={[50, 400]} name="HTC" unit="W/m²K" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#1f1e1b', border: '1px solid #252320', borderRadius: '12px', fontSize: '12px' }}
                />
                <Scatter name="Load Map" data={mockThermalMapping} fill="#cc785c">
                  {mockThermalMapping.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.temperature > 1800 ? '#cc785c' : '#3b82f6'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-muted-soft text-center font-mono uppercase tracking-widest">
            X: Nozzle Length | Y: Wall Temp | Size: Heat Transfer Coeff
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-surface-card border border-hairline rounded-lg space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              Interface Metadata
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Total Mesh Nodes', value: '42,501' },
                { label: 'Mapping Tolerance', value: '0.05 mm' },
                { label: 'Ref. Frame', value: 'Axisymmetric' },
                { label: 'Last Sync', value: '12s ago', highlight: true },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-baseline border-b border-hairline pb-2">
                  <span className="text-xs text-muted font-medium">{row.label}</span>
                  <span className={cn("text-xs font-mono font-bold", row.highlight ? "text-emerald-600" : "text-ink")}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-surface-dark rounded-xl space-y-6 text-on-dark">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-soft">Structural Safety</h3>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <p className="text-xs font-medium text-emerald-400">Pressure Mapping Verified</p>
              <p className="text-[10px] text-on-dark-soft mt-1 leading-relaxed">Wall stress within elastic limit for AISI 310S alloy.</p>
            </div>
            <button className="w-full py-3 bg-surface-dark-elevated hover:bg-surface-dark-soft text-on-dark rounded-md text-xs font-semibold transition-all border border-white/5">
              Preview Mesh Delta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
