import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  HelpCircle, 
  Search, 
  Settings, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal,
  Lock 
} from "lucide-react";
import { useState, useEffect } from "react";
import { Connection } from "@solana/web3.js";
import { liveHackMonitor } from "@/api/liveHacks";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState(0);

  useEffect(() => {
    const unsubscribe = liveHackMonitor.subscribe(() => {
      setAlerts(prev => prev + 1);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Navigate to monitoring page with search query
    navigate(`/monitoring?search=${encodeURIComponent(searchQuery)}`);
    toast({
      title: "Searching for exploits",
      description: `Searching for "${searchQuery}" in monitored protocols`,
    });
  };

  return (
    <header className="border-b border-hacker-border backdrop-blur-sm bg-hacker-panel/40 relative z-10">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <div className="hidden md:flex items-center mr-8">
            <div className="relative flex items-center">
              <Shield className="h-8 w-8 text-hacker-purple" />
              <div className="absolute inset-0 rounded-full border border-hacker-purple/20 animate-pulse"></div>
            </div>
          </div>
          <form onSubmit={handleSearch} className="relative hidden md:flex items-center w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hacker-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="> search exploits..."
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-hacker-panel/50 border border-hacker-border rounded-md focus:outline-none focus:ring-2 focus:ring-hacker-purple/50 focus:border-transparent placeholder-hacker-text-muted text-hacker-text-primary transition-all font-mono"
            />
          </form>
        </div>
        <div className="flex items-center gap-4">
          <NetworkStatus />
          <Button variant="ghost" size="sm" className="hidden md:flex text-hacker-text-primary hover:bg-hacker-panel/50 group">
            <HelpCircle className="h-4 w-4 mr-2 group-hover:text-hacker-purple transition-colors" />
            <span className="font-mono">Help</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative text-hacker-text-primary hover:bg-hacker-panel/50 group">
            <Bell className="h-4 w-4 group-hover:text-hacker-purple transition-colors" />
            {alerts > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-hacker-purple text-white text-xs flex items-center justify-center">
                {alerts}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="text-hacker-text-primary hover:bg-hacker-panel/50 group">
            <Terminal className="h-4 w-4 group-hover:text-hacker-cyan transition-colors" />
          </Button>
          <Button variant="ghost" size="icon" className="text-hacker-text-primary hover:bg-hacker-panel/50 group">
            <Settings className="h-4 w-4 group-hover:text-hacker-purple transition-colors" />
          </Button>
          <div className="hidden md:block w-[1px] h-5 bg-hacker-border mx-1"></div>
          <Button variant="ghost" size="icon" className="relative group">
            <div className="h-8 w-8 rounded-full bg-hacker-panel/80 flex items-center justify-center text-hacker-text-primary hover:text-hacker-purple transition-colors border border-hacker-border">
              <Lock className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NetworkStatus() {
  const [networkStats, setNetworkStats] = useState({
    status: "loading",
    tps: 0,
    blockTime: 0,
    health: "healthy" as "healthy" | "degraded" | "incident"
  });

  useEffect(() => {
    const HELIUS_API_KEY = 'process.snv.HELIUS_API_KEY';
const HELIUS_ENDPOINT = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
    const connection = new Connection(HELIUS_ENDPOINT);
    let interval: NodeJS.Timeout;

    const fetchNetworkStats = async () => {
      try {
        const [performance, slot] = await Promise.all([
          connection.getRecentPerformanceSamples(1),
          connection.getSlot()
        ]);

        // Check health by attempting to get a recent block
        let health: 'healthy' | 'degraded' | 'incident' = 'healthy';
        try {
          await connection.getLatestBlockhash();
        } catch (error) {
          health = 'degraded';
        }

        const tps = Math.round(performance[0]?.numTransactions / performance[0]?.samplePeriodSecs || 0);
        const blockTime = (performance[0]?.samplePeriodSecs || 0) / (performance[0]?.numSlots || 1);

        setNetworkStats({
          status: "connected",
          tps: tps,
          blockTime: parseFloat(blockTime.toFixed(2)),
          health: health
        });
      } catch (error) {
        console.error('Failed to fetch network stats:', error);
        setNetworkStats(prev => ({
          ...prev,
          status: "error",
          health: "incident"
        }));
      }
    };

    fetchNetworkStats();
    interval = setInterval(fetchNetworkStats, 10000); // Update every 10 seconds

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="hidden md:flex items-center gap-2">
      <Badge
        variant="outline"
        className={`group transition-all ${
          networkStats.health === "healthy"
            ? "bg-hacker-green-muted text-hacker-green border-hacker-green/50 hover:bg-hacker-green-muted/80"
            : networkStats.health === "degraded"
            ? "bg-amber-950/50 text-amber-400 border-amber-800/50 hover:bg-amber-900/30"
            : "bg-hacker-red-muted text-hacker-red border-hacker-red/50 hover:bg-hacker-red-muted/80"
        }`}
      >
        {networkStats.health === "healthy" ? (
          <ShieldCheck className="h-3 w-3 mr-1 group-hover:animate-pulse" />
        ) : networkStats.health === "degraded" ? (
          <Shield className="h-3 w-3 mr-1 group-hover:animate-pulse" />
        ) : (
          <ShieldAlert className="h-3 w-3 mr-1 group-hover:animate-pulse" />
        )}
        {networkStats.status === "loading"
          ? "Connecting..."
          : networkStats.health === "healthy"
          ? "Network Secure"
          : networkStats.health === "degraded"
          ? "Network Degraded"
          : "Network Compromised"}
      </Badge>
      {networkStats.status !== "loading" && networkStats.status !== "error" && (
      <div className="text-xs text-hacker-text-secondary font-mono">
          <span className="font-medium">{networkStats.tps} TPS</span>
        <span className="mx-1 text-hacker-purple">•</span>
          <span>{networkStats.blockTime}s block time</span>
      </div>
      )}
    </div>
  );
}
