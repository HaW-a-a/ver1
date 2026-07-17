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
import { Database, Download, FileJson, FileSpreadsheet, Thermometer } from 'lucide-react';

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
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Interface & Load Mapping</h2>
          <p className="text-zinc-400">Automated conversion of flow data to structural/thermal mesh inputs.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={exportAsJson}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-semibold transition-colors border border-zinc-700"
          >
            <FileJson className="w-4 h-4" />
            JSON
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors">
            <FileSpreadsheet className="w-4 h-4" />
            CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-rose-500" />
            Thermal Load Profile (Wall Convection)
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis 
                  type="number" 
                  dataKey="positionX" 
                  name="Position" 
                  unit="m" 
                  stroke="#71717a" 
                  fontSize={12} 
                />
                <YAxis 
                  type="number" 
                  dataKey="temperature" 
                  name="Temperature" 
                  unit="K" 
                  stroke="#71717a" 
                  fontSize={12} 
                />
                <ZAxis type="number" dataKey="heatTransferCoeff" range={[50, 400]} name="HTC" unit="W/m²K" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Scatter name="Load Map" data={mockThermalMapping} fill="#ef4444">
                  {mockThermalMapping.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.temperature > 1800 ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-zinc-500 text-center font-mono">
            X-AXIS: Nozzle/Combustor Length | Y-AXIS: Wall Temperature | SIZE: Heat Transfer Coefficient
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-blue-500" />
              Interface Metadata
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Total Mesh Nodes</span>
                <span className="font-mono">42,501</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Mapping Tolerance</span>
                <span className="font-mono">0.05 mm</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Ref. Frame</span>
                <span className="font-mono">Axisymmetric</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Last Sync</span>
                <span className="font-mono text-emerald-500">12s ago</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Structural Safety</h3>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <p className="text-xs font-medium text-emerald-400">Pressure Mapping Verified</p>
              <p className="text-[10px] text-emerald-500/70 mt-1">Wall stress within elastic limit for AISI 310S</p>
            </div>
            <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-lg border border-zinc-700 transition-colors">
              Preview Mesh Delta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
