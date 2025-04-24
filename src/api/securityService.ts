
import { mockAlerts, mockExploits, mockResources, mockDashboardStats } from "./mockData";
import { 
  Alert, 
  Exploit, 
  SecurityResource,
  ExploitType,
  ImpactLevel
} from "@/types/security";
import { 
  ExploitListParams, 
  AlertListParams, 
  ResourceListParams 
} from "@/types/api";

/**
 * Security Dashboard API Service
 * 
 * In a real implementation, these methods would call actual API endpoints.
 * For this demo, we're using mock data.
 */
export const SecurityService = {
  // Exploit history methods
  getExploits: async (params?: ExploitListParams): Promise<Exploit[]> => {
    // Filter based on params
    let results = [...mockExploits];
    
    if (params?.type) {
      results = results.filter(exploit => exploit.type === params.type);
    }
    
    if (params?.impact) {
      results = results.filter(exploit => exploit.impact === params.impact);
    }
    
    if (params?.startDate) {
      const startDate = new Date(params.startDate);
      results = results.filter(exploit => exploit.date >= startDate);
    }
    
    if (params?.endDate) {
      const endDate = new Date(params.endDate);
      results = results.filter(exploit => exploit.date <= endDate);
    }
    
    if (params?.target) {
      results = results.filter(exploit => 
        exploit.target.toLowerCase().includes(params.target!.toLowerCase())
      );
    }
    
    if (params?.minAmount) {
      results = results.filter(exploit => exploit.fundsLost >= params.minAmount!);
    }
    
    if (params?.maxAmount) {
      results = results.filter(exploit => exploit.fundsLost <= params.maxAmount!);
    }
    
    // Sort results
    if (params?.sortBy) {
      const direction = params.sortDirection === 'desc' ? -1 : 1;
      results.sort((a, b) => {
        if (params.sortBy === 'date') {
          return direction * (a.date.getTime() - b.date.getTime());
        } else if (params.sortBy === 'fundsLost') {
          return direction * (a.fundsLost - b.fundsLost);
        }
        return 0;
      });
    } else {
      // Default sort by date, newest first
      results.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    
    // Paginate results
    if (params?.page && params?.pageSize) {
      const start = (params.page - 1) * params.pageSize;
      const end = start + params.pageSize;
      results = results.slice(start, end);
    }
    
    return results;
  },
  
  getExploitById: async (id: string): Promise<Exploit | null> => {
    const exploit = mockExploits.find(e => e.id === id);
    return exploit || null;
  },
  
  // Alert methods
  getAlerts: async (params?: AlertListParams): Promise<Alert[]> => {
    let results = [...mockAlerts];
    
    if (params?.level) {
      results = results.filter(alert => alert.level === params.level);
    }
    
    if (params?.source) {
      results = results.filter(alert => alert.source === params.source);
    }
    
    if (params?.verified !== undefined) {
      results = results.filter(alert => alert.verified === params.verified);
    }
    
    // Default sort by timestamp, newest first
    results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Paginate results
    if (params?.page && params?.pageSize) {
      const start = (params.page - 1) * params.pageSize;
      const end = start + params.pageSize;
      results = results.slice(start, end);
    }
    
    return results;
  },
  
  // Security resource methods
  getResources: async (params?: ResourceListParams): Promise<SecurityResource[]> => {
    let results = [...mockResources];
    
    if (params?.type) {
      results = results.filter(resource => resource.type === params.type);
    }
    
    if (params?.tags?.length) {
      results = results.filter(resource => 
        params.tags!.some(tag => resource.tags.includes(tag))
      );
    }
    
    if (params?.searchQuery) {
      const query = params.searchQuery.toLowerCase();
      results = results.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query)
      );
    }
    
    // Paginate results
    if (params?.page && params?.pageSize) {
      const start = (params.page - 1) * params.pageSize;
      const end = start + params.pageSize;
      results = results.slice(start, end);
    }
    
    return results;
  },
  
  // Dashboard statistics
  getDashboardStats: async () => {
    return mockDashboardStats;
  },
  
  // Filtering options
  getExploitTypes: async (): Promise<{label: string, value: ExploitType}[]> => {
    return [
      { label: "Smart Contract", value: "smart-contract" },
      { label: "Protocol", value: "protocol" },
      { label: "Bridge", value: "bridge" },
      { label: "Flash Loan", value: "flash-loan" },
      { label: "Other", value: "other" }
    ];
  },
  
  getImpactLevels: async (): Promise<{label: string, value: ImpactLevel}[]> => {
    return [
      { label: "Critical", value: "critical" },
      { label: "High", value: "high" },
      { label: "Medium", value: "medium" },
      { label: "Low", value: "low" }
    ];
  }
};

export default SecurityService;
