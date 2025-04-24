
/**
 * API Types for the Solana Security Dashboard
 */

import { Alert, AlertLevel, Exploit, ExploitType, ImpactLevel, SecurityResource, ResourceType } from "./security";

// Base API parameters
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SortParams {
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

// API endpoints parameter types
export interface ExploitListParams extends PaginationParams, SortParams {
  type?: ExploitType;
  impact?: ImpactLevel;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  target?: string;
  minAmount?: number;
  maxAmount?: number;
  status?: string;
}

export interface ExploitDetailsParams {
  id: string;
  includeTechnical?: boolean;
  includeTransactions?: boolean;
  includeAnalysis?: boolean;
}

export interface AlertListParams extends PaginationParams, SortParams {
  level?: AlertLevel;
  source?: string;
  verified?: boolean;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string;
}

export interface ResourceListParams extends PaginationParams, SortParams {
  type?: ResourceType;
  tags?: string[];
  searchQuery?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export type ExploitListResponse = ApiResponse<Exploit[]>;
export type ExploitDetailsResponse = ApiResponse<Exploit>;
export type AlertListResponse = ApiResponse<Alert[]>;
export type ResourceListResponse = ApiResponse<SecurityResource[]>;

// Webhook configuration types
export interface WebhookConfig {
  url: string;
  secret: string;
  events: WebhookEvent[];
  active: boolean;
}

export type WebhookEvent = 
  | "new-exploit"
  | "updated-exploit"
  | "critical-alert"
  | "high-alert"
  | "all-alerts"
  | "new-resource";

export interface WebhookPayload<T> {
  event: WebhookEvent;
  timestamp: string;
  data: T;
}

// API key management
export interface ApiKey {
  id: string;
  key: string; // Partial key for display purposes
  name: string;
  createdAt: string;
  lastUsed?: string;
  permissions: string[];
}

export interface CreateApiKeyRequest {
  name: string;
  permissions: string[];
}

export interface CreateApiKeyResponse {
  id: string;
  key: string; // Full API key - shown only once
  name: string;
  createdAt: string;
  permissions: string[];
}
