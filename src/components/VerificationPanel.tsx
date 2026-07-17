import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { mockVerification, mockLegacyComparison } from '../data';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function VerificationPanel() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Verification & Validation</h2>
        <p className="text-zinc-400">Mesh convergence studies and legacy data cross-check (Target Error &lt; 5%).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mesh Convergence */}
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            Grid Independence Test
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockVerification}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="meshSize" 
                  stroke="#71717a" 
                  fontSize={10} 
                  tickFormatter={(val) => `${(val / 1e6).toFixed(0)}M`}
                  label={{ value: 'Nodes (Millions)', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#71717a' }}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={10} 
                  label={{ value: 'Error %', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#71717a' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="convergenceError" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono text-center">Convergence reached at 8.0M nodes (&lt; 2% delta)</p>
        </div>

        {/* Legacy Data Table */}
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Legacy Cross-check (vs. Flight Data)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="pb-3 font-medium">Metric</th>
                  <th className="pb-3 font-medium">Legacy</th>
                  <th className="pb-3 font-medium">CFD</th>
                  <th className="pb-3 font-medium text-right">Error %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {mockLegacyComparison.map((row) => (
                  <tr key={row.parameter} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 font-medium text-zinc-300">{row.parameter}</td>
                    <td className="py-3 font-mono">{row.legacyValue}</td>
                    <td className="py-3 font-mono">{row.cfdValue}</td>
                    <td className="py-3 text-right">
                      <span className={row.error < 3 ? 'text-emerald-500' : 'text-amber-500'}>
                        {row.error}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <FileText className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Validation Report</h4>
            <p className="text-xs text-zinc-500">k-omega SST Turbulence Model validation vs NASA Langley reference cases.</p>
            <button className="text-xs text-blue-500 hover:underline mt-2 font-medium">Download PDF Report</button>
          </div>
        </div>

        <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-amber-100">Discrepancy Note</h4>
            <p className="text-xs text-amber-100/70">
              Peak temperature shows 3.2% error in combustion chamber. Potential causes: Radiative heat transfer 
              under-predicted in RANS. Suggest adding P1 radiation model for refined analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
