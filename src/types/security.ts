
/**
 * Type definitions for the Solana Security Dashboard
 */

// Exploit types and severity levels
export type ExploitType = "smart-contract" | "protocol" | "bridge" | "flash-loan" | "other";
export type ImpactLevel = "critical" | "high" | "medium" | "low";
export type ExploitStatus = "confirmed" | "suspected" | "resolved";

// Main exploit data structure
export interface Exploit {
  id: string;
  name: string;
  date: Date;
  type: ExploitType;
  impact: ImpactLevel;
  fundsLost: number; // in USD
  target: string;
  status: ExploitStatus;
  description: string;
  technicalDetails?: string;
  postMortem?: string;
  references?: string[];
  transactions?: string[];
}

// Alert system types
export type AlertLevel = "critical" | "high" | "medium" | "low" | "info";
export type AlertSource = "on-chain" | "social-feed" | "dex-monitor" | "program-tracker" | "defi-monitor" | "governance-monitor";

export interface Alert {
  id: string;
  timestamp: Date;
  level: AlertLevel;
  title: string;
  description: string;
  source: AlertSource | string;
  verified: boolean;
  relatedAddresses?: string[];
}

// Security resources
export type ResourceType = "guide" | "tool" | "article" | "code" | "audit";

export interface SecurityResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  tags: string[];
  submittedBy?: string;
  submissionDate?: Date;
  verified?: boolean;
}

// Monitoring system configuration
export interface MonitoringConfig {
  alertThresholds: {
    transactionVolume: number;
    priceChange: number;
    tokenVelocity: number;
  };
  watchedAddresses: string[];
  enabledSources: AlertSource[];
  notificationChannels: string[];
}

// API response structures
export interface ExploitListResponse {
  exploits: Exploit[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AlertListResponse {
  alerts: Alert[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ResourceListResponse {
  resources: SecurityResource[];
  total: number;
  page: number;
  pageSize: number;
}

// Dashboard statistics
export interface DashboardStats {
  totalExploits: number;
  totalFundsLost: number;
  avgLossPerExploit: number;
  activeAlerts: number;
  exploitsByType: Record<ExploitType, number>;
  exploitsByMonth: {
    month: string;
    count: number;
    fundsLost: number;
  }[];
}
