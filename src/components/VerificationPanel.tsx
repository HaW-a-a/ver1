import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { mockVerification, mockLegacyComparison } from '../data';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

export default function VerificationPanel() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-serif text-ink italic">Verification & Validation</h2>
        <p className="text-muted text-lg">Mesh convergence studies and legacy data cross-check (Target Error &lt; 5%).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mesh Convergence */}
        <div className="p-8 bg-surface-dark rounded-xl space-y-6 shadow-2xl">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Grid Independence Test
          </h3>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockVerification}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252320" vertical={false} />
                <XAxis 
                  dataKey="meshSize" 
                  stroke="#6c6a64" 
                  fontSize={10} 
                  tickFormatter={(val) => `${(val / 1e6).toFixed(0)}M`}
                />
                <YAxis 
                  stroke="#6c6a64" 
                  fontSize={10} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f1e1b', border: '1px solid #252320', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="convergenceError" stroke="#cc785c" strokeWidth={3} dot={{ r: 4, fill: '#cc785c' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-muted-soft font-mono text-center uppercase tracking-widest">Convergence reached at 8.0M nodes (&lt; 2% delta)</p>
        </div>

        {/* Legacy Data Table */}
        <div className="p-8 bg-surface-card border border-hairline rounded-lg space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Legacy Cross-check
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-hairline text-muted-soft">
                  <th className="pb-4 font-bold tracking-widest uppercase text-[10px]">Metric</th>
                  <th className="pb-4 font-bold tracking-widest uppercase text-[10px]">Legacy</th>
                  <th className="pb-4 font-bold tracking-widest uppercase text-[10px]">CFD</th>
                  <th className="pb-4 font-bold tracking-widest uppercase text-[10px] text-right">Error %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {mockLegacyComparison.map((row) => (
                  <tr key={row.parameter} className="hover:bg-surface-soft transition-colors group">
                    <td className="py-4 font-serif italic text-ink text-base">{row.parameter}</td>
                    <td className="py-4 font-mono text-muted text-xs">{row.legacyValue}</td>
                    <td className="py-4 font-mono text-ink font-bold text-xs">{row.cfdValue}</td>
                    <td className="py-4 text-right">
                      <span className={cn(
                        "font-mono text-xs font-bold px-2 py-0.5 rounded-full",
                        row.error < 3 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'
                      )}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-surface-card border border-hairline rounded-xl flex items-start gap-6 group hover:bg-surface-cream-strong transition-all">
          <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-serif italic text-ink">Validation Report</h4>
            <p className="text-sm text-body leading-relaxed">k-omega SST Turbulence Model validation vs NASA Langley reference cases. Verified for transonic regimes.</p>
            <button className="text-sm text-primary font-bold hover:underline mt-4 flex items-center gap-2">
              Download PDF Report
            </button>
          </div>
        </div>

        <div className="p-8 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-6">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-serif italic text-ink">Discrepancy Note</h4>
            <p className="text-sm text-body leading-relaxed">
              Peak temperature shows 3.2% error in combustion chamber. Potential causes: Radiative heat transfer 
              under-predicted in RANS. Suggest adding P1 radiation model for refined analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
