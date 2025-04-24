import { useEffect, useState } from 'react';
import HackAlert from '@/api/liveHacks';
import liveHackMonitor from '@/api/liveHacks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function HackAlerts() {
  const [alerts, setAlerts] = useState<HackAlert[]>([]);

  useEffect(() => {
    // Start monitoring when component mounts
    liveHackMonitor.startMonitoring();

    // Update alerts every 30 seconds
    const interval = setInterval(() => {
      setAlerts(liveHackMonitor.getAlerts());
    }, 30000);

    // Initial load
    setAlerts(liveHackMonitor.getAlerts());

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: HackAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500 border-red-500/30 bg-red-500/10';
      case 'high':
        return 'text-orange-500 border-orange-500/30 bg-orange-500/10';
      case 'medium':
        return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10';
      case 'low':
        return 'text-blue-500 border-blue-500/30 bg-blue-500/10';
    }
  };

  const getStatusColor = (status: HackAlert['status']) => {
    switch (status) {
      case 'investigating':
        return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10';
      case 'confirmed':
        return 'text-red-500 border-red-500/30 bg-red-500/10';
      case 'false-positive':
        return 'text-green-500 border-green-500/30 bg-green-500/10';
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Live Hack Alerts</CardTitle>
        <CardDescription>Real-time monitoring of suspicious activities</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {alerts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No alerts detected
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className="p-4 glass-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{alert.protocol}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {alert.description}
                      </p>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    {alert.estimatedLoss && (
                      <Badge variant="outline">
                        ${alert.estimatedLoss.toLocaleString()}
                      </Badge>
                    )}
                    <Badge variant="outline">{alert.type}</Badge>
                  </div>
                  {alert.links.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {alert.links.map((link, i) => (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          View Details
                        </a>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 