import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
// import { Sidebar } from "@/components/dashboard/Sidebar";
import { LiveMonitoring } from "@/components/dashboard/LiveMonitoring";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Bell, Shield, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { liveHackMonitor, type HackAlert } from "@/api/liveHacks";

interface MonitoringStats {
  activeMonitors: number;
  alertsToday: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  protectedProtocols: Set<string>;
}

export default function Monitoring() {
  const [stats, setStats] = useState<MonitoringStats>({
    activeMonitors: 4,
    alertsToday: {
      total: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    },
    protectedProtocols: new Set()
  });

  useEffect(() => {
    // Get initial alerts
    const fetchInitialAlerts = async () => {
      const alerts = await liveHackMonitor.getStoredAlerts();
      updateStatsFromAlerts(alerts);
    };

    // Subscribe to new alerts
    const unsubscribe = liveHackMonitor.subscribe((alert) => {
      setStats(prevStats => {
        const newStats = { ...prevStats };
        
        // Update alerts count
        newStats.alertsToday.total++;
        newStats.alertsToday[alert.severity]++;
        
        // Update protected protocols
        if (alert.protocol && alert.protocol !== "Unknown") {
          newStats.protectedProtocols.add(alert.protocol);
        }
        
        return newStats;
      });
    });

    fetchInitialAlerts();

    // Reset stats at midnight
    const midnightReset = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setStats(prev => ({
          ...prev,
          alertsToday: {
            total: 0,
            critical: 0,
            high: 0,
            medium: 0,
            low: 0
          }
        }));
      }
    }, 60000); // Check every minute

    return () => {
      unsubscribe();
      clearInterval(midnightReset);
    };
  }, []);

  const updateStatsFromAlerts = (alerts: HackAlert[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newStats = {
      activeMonitors: 4,
      alertsToday: {
        total: 0,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      },
      protectedProtocols: new Set<string>()
    };

    alerts.forEach(alert => {
      const alertDate = new Date(alert.timestamp);
      if (alertDate >= today) {
        newStats.alertsToday.total++;
        newStats.alertsToday[alert.severity]++;
      }
      if (alert.protocol && alert.protocol !== "Unknown") {
        newStats.protectedProtocols.add(alert.protocol);
      }
    });

    setStats(newStats);
  };

  return (
    <div className="container mx-auto space-y-6 pb-8">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Security Monitoring</h1>
                <p className="text-muted-foreground">
                Real-time monitoring of suspicious activities and potential exploits
                </p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Monitors
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeMonitors}</div>
                  <p className="text-xs text-muted-foreground">
                    Transaction, Social, Price, and Forta monitors
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Alerts Today
                  </CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.alertsToday.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.alertsToday.critical} critical, {stats.alertsToday.high} high, {stats.alertsToday.medium} medium
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Protected Protocols
                  </CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.protectedProtocols.size}</div>
                  <p className="text-xs text-muted-foreground">
                    Active DeFi protocols monitored
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="alerts" className="space-y-4">
              <TabsList>
                <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
                <TabsTrigger value="settings">Monitor Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="alerts" className="space-y-4">
                <LiveMonitoring />
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Monitor Settings</CardTitle>
                        <CardDescription>
                          Configure monitoring parameters and alert thresholds
                        </CardDescription>
                    </div>
                      <Settings className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Transaction Monitoring</h4>
                          <p className="text-sm text-muted-foreground">
                            Monitor large or suspicious transactions (5 req/min)
                          </p>
                        </div>
                        <Badge>Enabled</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Social Signal Monitoring</h4>
                          <p className="text-sm text-muted-foreground">
                            Track social media for hack reports
                          </p>
                        </div>
                        <Badge>Enabled</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Price Change Monitoring</h4>
                          <p className="text-sm text-muted-foreground">
                            Detect suspicious price movements
                          </p>
                        </div>
                        <Badge>Enabled</Badge>
                    </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Forta Alert Integration</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts from Forta Network
                          </p>
                    </div>
                        <Badge>Enabled</Badge>
                    </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
