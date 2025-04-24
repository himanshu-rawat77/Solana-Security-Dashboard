import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Shield, AlertTriangle, ArrowUpRight } from "lucide-react";
import { type HackAlert, liveHackMonitor } from "@/api/liveHacks";
import { useToast } from "@/components/ui/use-toast";

const severityColors = {
  critical: "bg-red-500 hover:bg-red-600",
  high: "bg-orange-500 hover:bg-orange-600",
  medium: "bg-yellow-500 hover:bg-yellow-600",
  low: "bg-blue-500 hover:bg-blue-600"
};

const typeIcons = {
  "suspicious-transaction": Shield,
  "large-withdrawal": ArrowUpRight,
  "price-manipulation": AlertTriangle,
  "flash-loan": Bell,
  "governance-attack": AlertTriangle
};

export const LiveMonitoring = () => {
  const [alerts, setAlerts] = useState<HackAlert[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to live hack alerts
    const unsubscribe = liveHackMonitor.subscribe((alert) => {
      setAlerts(prev => [alert, ...prev]);
      
      // Show toast notification for new alerts
      toast({
        title: `New Hack Alert: ${alert.protocol}`,
        description: alert.description,
        variant: alert.severity === 'critical' ? 'destructive' : 'default',
      });
    });

    // Start monitoring
    liveHackMonitor.startMonitoring().catch(console.error);

    return () => {
      unsubscribe();
    };
  }, [toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Live Hack Monitoring
        </CardTitle>
            <CardDescription>
          Real-time monitoring of suspicious activities and potential exploits
            </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                No alerts detected. Monitoring for suspicious activities...
                  </div>
            ) : (
              alerts.map((alert) => {
                const IconComponent = typeIcons[alert.type] || AlertTriangle;
                
                return (
                  <Alert key={alert.id} variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
                    <IconComponent className="h-4 w-4" />
                    <AlertTitle className="flex items-center gap-2">
                      {alert.protocol}
                      <Badge className={severityColors[alert.severity]}>
                        {alert.severity}
                      </Badge>
                      <Badge variant="outline">{alert.type}</Badge>
                    </AlertTitle>
                    <AlertDescription className="mt-2 space-y-2">
                      <p>{alert.description}</p>
                      {alert.estimatedLoss && (
                        <p className="font-semibold">
                          Estimated Loss: ${alert.estimatedLoss.toLocaleString()}
                        </p>
                      )}
                      {alert.transactionHash && (
                        <p className="font-mono text-sm truncate">
                          Tx: {alert.transactionHash}
                        </p>
                      )}
                      {alert.links.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {alert.links.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline"
                            >
                              Source {index + 1}
                            </a>
                          ))}
                    </div>
                      )}
                      <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                        <span>Status: {alert.status}</span>
                        <span>Source: {alert.source}</span>
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                    </AlertDescription>
                  </Alert>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

