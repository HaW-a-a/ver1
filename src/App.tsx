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
    <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-zinc-800 bg-[#09090b] flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-xl">APPS</span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-zinc-800 rounded-md transition-colors"
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
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                activeTab === item.id ? "bg-blue-600 text-white" : "hover:bg-zinc-800 text-zinc-400"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "group-hover:text-zinc-200")} />
              {isSidebarOpen && (
                <span className="font-medium text-sm truncate">{item.label}</span>
              )}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className={cn("flex items-center gap-3 px-3 py-2", !isSidebarOpen && "justify-center")}>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">
              AI
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xs font-semibold">User System</span>
                <span className="text-[10px] text-zinc-500">Administrator</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-grid-zinc-900/[0.2]">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              Project: <span className="text-zinc-100">Aero-Propulsion Performance Standard (APPS)</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium transition-colors border border-zinc-700">
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
            <div className="h-4 w-px bg-zinc-700 mx-2" />
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                HPC: ONLINE
              </span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
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
    { label: "Pressure Recovery", value: "0.88", unit: "Avg", color: "text-blue-500", icon: Gauge },
    { label: "Distortion Index", value: "6.2", unit: "%", color: "text-amber-500", icon: Activity },
    { label: "Swirl Number", value: "0.48", unit: "Ratio", color: "text-emerald-500", icon: Wind },
    { label: "Max Wall Temp", value: "2840", unit: "K", color: "text-rose-500", icon: Thermometer },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Performance Envelope Overview</h2>
        <p className="text-zinc-400">Consolidated CFD metrics for APPS compliance monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-zinc-800", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-zinc-600 tracking-widest uppercase">Live Metric</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-xs text-zinc-500 font-medium">{stat.unit}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            Requirement Compliance Status
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'intake', name: 'Intake Pressure Recovery (PR > 0.8)', status: 'PASS', margin: '+10%' },
              { id: 'combustor', name: 'Distortion Index (DI < 10%)', status: 'PASS', margin: '+3.8%' },
              { id: 'interface', name: 'Interface Data Integrity', status: 'WARNING', margin: 'CSV Format' },
              { id: 'verification', name: 'Legacy Cross-check (Error < 5%)', status: 'PASS', margin: '2.1%' },
            ].map((req) => (
              <button 
                key={req.name}
                onClick={() => setActiveTab(req.id as Tab)}
                className="w-full flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    req.status === 'PASS' ? "bg-emerald-500" : "bg-amber-500"
                  )} />
                  <span className="text-sm font-medium">{req.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded",
                    req.status === 'PASS' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                  )}>
                    {req.status}
                  </span>
                  <span className="text-xs text-zinc-500 w-16 text-right font-mono">{req.margin}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-700" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              Run Auto-Post Process
            </button>
            <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-sm font-semibold transition-colors border border-zinc-700 flex items-center justify-center gap-2">
              <Wind className="w-4 h-4" />
              Check Mesh Sensitivity
            </button>
            <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-sm font-semibold transition-colors border border-zinc-700 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Structural Map
            </button>
          </div>
          <div className="pt-4 border-t border-zinc-800 mt-auto">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <span>SOLVER: RANS/k-w SST</span>
              <span>v1.2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

