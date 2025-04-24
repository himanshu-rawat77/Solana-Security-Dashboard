import { HackAlert } from './liveHacks';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class DatabaseService {
  async saveAlert(alert: HackAlert) {
    try {
      await axios.post(`${API_BASE_URL}/alerts`, alert);
    } catch (error) {
      console.error('Failed to save alert:', error);
      throw error;
    }
  }

  async saveSuspiciousTransaction(transaction: {
    address: string;
    amount: number;
    timestamp: number;
    transactionType: string;
    tokenAddress?: string;
    tokenSymbol?: string;
    alertId?: string;
  }) {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, transaction);
      return response.data.id;
    } catch (error) {
      console.error('Failed to save transaction:', error);
      throw error;
    }
  }

  async getRecentAlerts(limit = 100) {
    try {
      const response = await axios.get(`${API_BASE_URL}/alerts`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      throw error;
    }
  }

  async getTransactionsByAddress(address: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions/${address}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw error;
    }
  }

  async getTransactionsByAlert(alertId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/alerts/${alertId}/transactions`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw error;
    }
  }
}

export const dbService = new DatabaseService();
export default dbService; 