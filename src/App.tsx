import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Wind, 
  Flame, 
  Database, 
  ShieldCheck, 
  Download, 
  ChevronRight,
  Menu,
  X,
  Zap,
  Activity,
  Thermometer,
  Gauge
} from 'lucide-react';
import { cn } from './lib/utils';

// Sub-components (to be extracted later)
import IntakePanel from './components/IntakePanel';
import CombustorPanel from './components/CombustorPanel';
import InterfacePanel from './components/InterfacePanel';
import VerificationPanel from './components/VerificationPanel';

type Tab = 'overview' | 'intake' | 'combustor' | 'interface' | 'verification';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'intake', label: 'Intake Stability', icon: Wind },
    { id: 'combustor', label: 'Combustor Uniformity', icon: Flame },
    { id: 'interface', label: 'Interface & Load', icon: Database },
    { id: 'verification', label: 'Verification & V&V', icon: ShieldCheck },
  ];

  return (
    <div className="flex h-screen bg-canvas text-body font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-hairline bg-canvas flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif font-medium tracking-tight text-xl text-ink italic">APPS</span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-surface-soft rounded-md transition-colors text-muted"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 group relative text-sm font-medium",
                activeTab === item.id 
                  ? "bg-surface-card text-ink" 
                  : "hover:bg-surface-soft text-muted hover:text-ink"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-primary" : "group-hover:text-muted")} />
              {isSidebarOpen && (
                <span className="truncate">{item.label}</span>
              )}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-hairline">
          <div className={cn("flex items-center gap-3 px-3 py-2", !isSidebarOpen && "justify-center")}>
            <div className="w-8 h-8 rounded-full bg-surface-cream-strong flex items-center justify-center text-xs font-bold text-muted-soft">
              AI
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-ink">User System</span>
                <span className="text-[10px] text-muted">Administrator</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-16 border-b border-hairline flex items-center justify-between px-8 bg-canvas/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-sm font-medium text-muted flex items-center gap-2">
              Project: <span className="text-ink font-serif italic">Aero-Propulsion Performance Standard</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-canvas hover:bg-surface-soft text-ink rounded-md text-xs font-medium transition-colors border border-hairline">
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
            <div className="h-4 w-px bg-hairline mx-2" />
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                HPC: ONLINE
              </span>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <OverviewPanel setActiveTab={setActiveTab} />}
              {activeTab === 'intake' && <IntakePanel />}
              {activeTab === 'combustor' && <CombustorPanel />}
              {activeTab === 'interface' && <InterfacePanel />}
              {activeTab === 'verification' && <VerificationPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function OverviewPanel({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  const stats = [
    { label: "Pressure Recovery", value: "0.88", unit: "Avg", color: "text-primary", icon: Gauge },
    { label: "Distortion Index", value: "6.2", unit: "%", color: "text-primary", icon: Activity },
    { label: "Swirl Number", value: "0.48", unit: "Ratio", color: "text-primary", icon: Wind },
    { label: "Max Wall Temp", value: "2840", unit: "K", color: "text-primary", icon: Thermometer },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-serif text-ink italic leading-tight">Performance Envelope Overview</h2>
        <p className="text-lg text-body max-w-2xl">Consolidated CFD metrics for APPS compliance monitoring. Performance indicators are calculated against baseline flight envelopes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-surface-card border border-hairline rounded-lg transition-all hover:bg-surface-cream-strong group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={cn("p-2 rounded-md bg-canvas border border-hairline", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-muted-soft tracking-widest uppercase">Live Metric</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-serif text-ink italic">{stat.value}</span>
              <span className="text-xs text-muted-soft font-medium font-mono">{stat.unit}</span>
            </div>
            <p className="text-sm text-muted font-medium mt-3">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-serif italic text-ink flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Requirement Compliance
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              { id: 'intake', name: 'Intake Pressure Recovery (PR > 0.8)', status: 'PASS', margin: '+10%' },
              { id: 'combustor', name: 'Distortion Index (DI < 10%)', status: 'PASS', margin: '+3.8%' },
              { id: 'interface', name: 'Interface Data Integrity', status: 'WARNING', margin: 'CSV Format' },
              { id: 'verification', name: 'Legacy Cross-check (Error < 5%)', status: 'PASS', margin: '2.1%' },
            ].map((req) => (
              <button 
                key={req.name}
                onClick={() => setActiveTab(req.id as Tab)}
                className="w-full flex items-center justify-between p-6 bg-canvas border border-hairline rounded-lg hover:bg-surface-soft transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    req.status === 'PASS' ? "bg-emerald-500" : "bg-primary"
                  )} />
                  <span className="text-base font-medium text-ink group-hover:text-primary transition-colors">{req.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className={cn(
                    "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider",
                    req.status === 'PASS' ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/10 text-primary"
                  )}>
                    {req.status}
                  </span>
                  <span className="text-xs text-muted-soft w-16 text-right font-mono">{req.margin}</span>
                  <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface-dark rounded-xl p-8 space-y-8 text-on-dark flex flex-col shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-soft">Operational Controls</h3>
            <p className="text-xs text-on-dark-soft">Execute system-wide performance verification scripts.</p>
          </div>
          
          <div className="space-y-4">
            <button className="w-full py-4 bg-primary hover:bg-primary-active text-white rounded-md text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <Activity className="w-4 h-4" />
              Run Auto-Post Process
            </button>
            <button className="w-full py-4 bg-surface-dark-elevated hover:bg-surface-dark-soft text-on-dark rounded-md text-sm font-semibold transition-all border border-white/5 flex items-center justify-center gap-2">
              <Wind className="w-4 h-4" />
              Check Mesh Sensitivity
            </button>
            <button className="w-full py-4 bg-surface-dark-elevated hover:bg-surface-dark-soft text-on-dark rounded-md text-sm font-semibold transition-all border border-white/5 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Structural Map
            </button>
          </div>

          <div className="mt-auto pt-8 border-t border-white/5">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-soft">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                RANS/k-w SST
              </span>
              <span>v1.2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

