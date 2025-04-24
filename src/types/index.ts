export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'normal';

export interface ChartData {
  timestamp: number;
  value: number;
}

export interface SecurityMetric {
  title: string;
  value: number;
  change: number;
  timeframe: string;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  timestamp: number;
  status: 'active' | 'resolved' | 'investigating';
  protocol?: string;
  estimatedLoss?: number;
}

export interface ResourceLink {
  title: string;
  url: string;
  description: string;
  category: 'documentation' | 'tool' | 'guide' | 'news';
}

export interface DashboardStats {
  activeAlerts: number;
  totalLoss24h: number;
  avgResponseTime: number;
  monitoredProtocols: number;
}

export interface HackAlert {
  id: string;
  timestamp: number;
  protocol: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  transactionHash?: string;
  estimatedLoss?: number;
  status: 'investigating' | 'confirmed' | 'false-positive';
  source: 'on-chain' | 'off-chain';
  links: string[];
} 