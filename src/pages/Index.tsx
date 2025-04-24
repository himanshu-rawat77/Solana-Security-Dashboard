import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ExploitHistoryTable } from "@/components/dashboard/ExploitHistoryTable";
import { ExploitStatistics } from "@/components/dashboard/ExploitStatistics";
import { ExploitTrends } from "@/components/dashboard/ExploitTrends";
import { HackAlerts } from "@/components/dashboard/HackAlerts";
import { SecurityResourceList } from "@/components/dashboard/SecurityResourceList";

import { Shield, ShieldAlert, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="flex h-screen bg-cosmic-gradient text-white overflow-hidden relative">
      {/* Cosmic elements - subtle stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-1 h-1 bg-white rounded-full opacity-40 animate-cosmic-pulse"></div>
        <div className="absolute top-[25%] left-[15%] w-0.5 h-0.5 bg-white rounded-full opacity-20 animate-cosmic-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute top-[35%] left-[30%] w-0.5 h-0.5 bg-white rounded-full opacity-30 animate-cosmic-pulse" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute top-[15%] right-[25%] w-1 h-1 bg-white rounded-full opacity-40 animate-cosmic-pulse" style={{animationDelay: '1.1s'}}></div>
        <div className="absolute top-[45%] right-[5%] w-0.5 h-0.5 bg-white rounded-full opacity-20 animate-cosmic-pulse" style={{animationDelay: '1.6s'}}></div>
        <div className="absolute top-[65%] right-[35%] w-0.5 h-0.5 bg-white rounded-full opacity-30 animate-cosmic-pulse" style={{animationDelay: '2.1s'}}></div>
        <div className="absolute bottom-[10%] left-[25%] w-1 h-1 bg-white rounded-full opacity-40 animate-cosmic-pulse" style={{animationDelay: '2.5s'}}></div>
        
        {/* Constellation patterns */}
        <div className="absolute top-[5%] right-[12%] opacity-10">
          <Star className="w-20 h-20 text-purple-300 animate-cosmic-sparkle" style={{animationDelay: '1.4s'}} />
        </div>
        <div className="absolute bottom-[15%] right-[30%] opacity-10">
          <Star className="w-24 h-24 text-cyan-300 animate-cosmic-sparkle" style={{animationDelay: '0.9s'}} />
        </div>
        
        {/* Cosmic glow effect */}
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] rounded-full bg-cosmic-glow opacity-[0.15]"></div>
        <div className="absolute bottom-[-300px] right-[-100px] w-[600px] h-[600px] rounded-full bg-cosmic-glow opacity-[0.15]"></div>
      </div>
      

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* <DashboardHeader /> */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto space-y-8 pb-8">
            <div className="flex items-start gap-4 animate-cosmic-float">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-security-badge flex items-center justify-center shadow-cosmic-inner">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-cosmic-pulse"></div>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400">
                  Solana Security Dashboard
                </h1>
                <p className="text-lg text-gray-300/80">
                  Real-time monitoring and analysis of security incidents in the Solana ecosystem
                </p>
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-cosmic-card rounded-2xl p-6 shadow-cosmic border border-white/10">
              <div className="mb-4 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-pink-400" />
                <h2 className="font-display text-xl font-semibold text-white">Security Overview</h2>
              </div>
              <ExploitStatistics />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="backdrop-blur-xl bg-cosmic-card rounded-2xl p-6 shadow-cosmic border border-white/10">
                  <div className="mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <h2 className="font-display text-xl font-semibold text-white">Exploit Trends</h2>
                  </div>
                  <ExploitTrends />
                </div>
                <div className="backdrop-blur-xl bg-cosmic-card rounded-2xl p-6 shadow-cosmic border border-white/10">
                  <div className="mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-400" />
                    <h2 className="font-display text-xl font-semibold text-white">Security Resources</h2>
                  </div>
                  <SecurityResourceList />
                </div>
              </div>
              <div className="space-y-8">
                <div className="backdrop-blur-xl bg-cosmic-card rounded-2xl p-6 shadow-cosmic border border-white/10 relative overflow-hidden">
                  <div className="mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <h2 className="font-display text-xl font-semibold text-white">Live Hack Alerts</h2>
                  </div>
                  {/* Pulsing circle in background */}
                  <div className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-green-500/5 animate-cosmic-pulse"></div>
                  <HackAlerts />
                </div>
                <div className="backdrop-blur-xl bg-cosmic-card rounded-2xl p-6 shadow-cosmic border border-white/10">
                  <div className="mb-4 flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-amber-400" />
                    <h2 className="font-display text-xl font-semibold text-white">Recent Exploits</h2>
                  </div>
                  <ExploitHistoryTable />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
