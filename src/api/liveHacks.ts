import { Connection, PublicKey, LAMPORTS_PER_SOL, ParsedTransactionWithMeta, clusterApiUrl } from '@solana/web3.js';
import axios from 'axios';
import { dbService } from './databaseService';

export interface HackAlert {
  id: string;
  type: "suspicious-transaction" | "large-withdrawal" | "price-manipulation" | "flash-loan" | "governance-attack" | "large-transfer" | "multiple-withdrawals";
  source: string;
  timestamp: number;
  details: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  protocol: string;
  estimatedLoss?: number;
  transactionHash?: string;
  status: "investigating" | "confirmed" | "resolved";
  links: string[];
}

interface Withdrawal {
  amount: number;
  timestamp: number;
}

interface WithdrawalTracker {
  address: string;
  withdrawals: Withdrawal[];
}

type AlertSubscriber = (alert: HackAlert) => void;
type RpcUrl = string;

// Add mock data for simulation
// const MOCK_TRANSACTIONS = [
//   {
//     signature: '1',
//     from: '5YNmS1R9nNSCDwWuuD4nYTZK9tTVjjksR6ohUkVf5Uep',
//     amount: 2500,
//     token: 'SOL',
//     timestamp: Date.now()
//   },
//   {
//     signature: '2',
//     from: '7nYS1R9nNSCDwWuuD4nYTZK9tTVjjksR6ohUkVf7Ugk',
//     amount: 15000,
//     token: 'SOL',
//     timestamp: Date.now()
//   },
//   {
//     signature: '3',
//     from: '9kLmS1R9nNSCDwWuuD4nYTZK9tTVjjksR6ohUkVf9Wmp',
//     amount: 800,
//     token: 'USDC',
//     timestamp: Date.now()
//   }
// ];

const HELIUS_API_KEY = 'process.env.HELIUS_API_KEY';
const HELIUS_ENDPOINT = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

const BACKUP_RPC_ENDPOINTS = [
  clusterApiUrl('devnet'),
  'https://api.devnet.solana.com',
  'https://rpc.ankr.com/solana_devnet',
  'https://dev-rpc.solana.fm'
];

class SolanaTransactionAnalyzer {
  private rpcUrls: RpcUrl[];
  private currentRpcIndex: number = 0;
  private requestQueue: Array<() => Promise<void>> = [];
  private processing = false;
  private readonly REQUEST_DELAY = 60000; // One request per minute (60000ms)
  private readonly BATCH_SIZE = 1;
  private readonly MAX_RETRIES = 5;
  private connection: Connection;
  private heliusFailureCount: number = 0;
  private readonly MAX_HELIUS_FAILURES = 3;
  private lastRequestTime: number = 0;
  private readonly MIN_REQUEST_INTERVAL = 60000; // One minute interval
  private heliusRequestCount: number = 0;
  private heliusResetTimeout: NodeJS.Timeout | null = null;

  constructor(rpcUrls: RpcUrl[]) {
    this.rpcUrls = rpcUrls;
    this.connection = this.createConnection(this.rpcUrls[0]);
    this.startQueueProcessor();
    this.startHeliusRateLimitReset();
  }

  private createConnection(endpoint: string): Connection {
    const isHelius = endpoint.includes('helius');
    const wsEndpoint = isHelius ? 
      endpoint.replace('https://', 'wss://') : 
      undefined; // Only use WebSocket for Helius

    return new Connection(endpoint, {
      commitment: 'confirmed',
      wsEndpoint,
      confirmTransactionInitialTimeout: 60000,
      disableRetryOnRateLimit: true
    });
  }

  public getCurrentEndpoint(): string {
    return this.rpcUrls[this.currentRpcIndex];
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    retries = this.MAX_RETRIES,
    baseDelay = 1000
  ): Promise<T> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error: any) {
        if (error.message.includes('429') || error.message.includes('rate limit')) {
          const jitter = Math.random() * 500;
          const delay = Math.pow(2, attempt) * baseDelay + jitter;
          console.warn(`⏳ Rate limited. Retrying in ${Math.round(delay)}ms (Attempt ${attempt + 1}/${retries})`);
          await this.sleep(delay);
          if (attempt === retries - 1) this.switchRpc();
        } else {
          throw error;
        }
      }
    }
    throw new Error('All retries failed.');
  }

  private enqueueRequest(request: () => Promise<void>) {
    this.requestQueue.push(request);
  }

  private startQueueProcessor() {
    setInterval(() => this.processQueue(), this.REQUEST_DELAY);
  }

  private startHeliusRateLimitReset() {
    // Reset Helius request count every minute
    this.heliusResetTimeout = setInterval(() => {
      this.heliusRequestCount = 0;
    }, 60000);
  }

  private async canMakeHeliusRequest(): Promise<boolean> {
    if (!this.isCurrentEndpointHelius()) return true;
    return this.heliusRequestCount < 1; // Allow only 1 request
  }

  private isCurrentEndpointHelius(): boolean {
    return this.getCurrentEndpoint().includes('helius');
  }

  private async processQueue() {
    if (this.processing || this.requestQueue.length === 0) return;
    this.processing = true;

    try {
      while (this.requestQueue.length > 0) {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        
        if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
          await this.sleep(this.MIN_REQUEST_INTERVAL - timeSinceLastRequest);
        }

        // Check Helius rate limit before processing
        if (this.isCurrentEndpointHelius()) {
          if (!await this.canMakeHeliusRequest()) {
            console.log('⏳ Helius rate limit reached (1 req/min), waiting for next minute...');
            this.processing = false;
            return;
          }
          this.heliusRequestCount++;
          console.log('📊 Helius request made, waiting for next minute window...');
        }

        const batch = this.requestQueue.splice(0, this.BATCH_SIZE);
        
        for (const request of batch) {
          await request();
          this.lastRequestTime = Date.now();
          if (this.isCurrentEndpointHelius()) {
            await this.sleep(this.REQUEST_DELAY); // Full minute delay for Helius
          } else {
            await this.sleep(1000); // Normal delay for other RPCs
          }
        }
      }
    } catch (error) {
      console.error('Error processing queue:', error);
    } finally {
      this.processing = false;
    }
  }

  public getConnection(): Connection {
    return this.connection;
  }

  public async executeRequest<T>(fn: () => Promise<T>): Promise<T> {
    return this.retryWithBackoff(fn);
  }

  public addToQueue(request: () => Promise<void>) {
    this.enqueueRequest(request);
  }

  public switchRpc(): void {
    // If we're using Helius and hit too many failures, switch to backup RPCs
    if (this.getCurrentEndpoint().includes('helius')) {
      this.heliusFailureCount++;
      if (this.heliusFailureCount >= this.MAX_HELIUS_FAILURES) {
        console.warn('⚠️ Helius RPC experiencing issues, switching to backup RPC');
        this.currentRpcIndex = 1; // Skip Helius and move to first backup
      } else {
        console.warn(`⚠️ Helius RPC error (${this.heliusFailureCount}/${this.MAX_HELIUS_FAILURES})`);
        return; // Stay on Helius until max failures reached
      }
    } else {
      // Regular RPC rotation for backup endpoints
      this.currentRpcIndex = ((this.currentRpcIndex + 1) % (this.rpcUrls.length - 1)) + 1;
    }

    const newRpcUrl = this.rpcUrls[this.currentRpcIndex];
    console.warn(`🔄 Switching to ${this.getCurrentEndpoint().includes('helius') ? 'Helius' : 'backup'} RPC: ${newRpcUrl}`);
    this.connection = this.createConnection(newRpcUrl);
  }

  public cleanup() {
    if (this.heliusResetTimeout) {
      clearInterval(this.heliusResetTimeout);
      this.heliusResetTimeout = null;
    }
  }
}

export class LiveHackMonitor {
  private analyzer: SolanaTransactionAnalyzer;
  private subscribers: Set<AlertSubscriber>;
  private alerts: HackAlert[];
  private transactionTrackers: Map<string, WithdrawalTracker>;
  private readonly LARGE_TRANSFER_THRESHOLD = 10 * LAMPORTS_PER_SOL;
  private readonly MULTIPLE_WITHDRAWAL_COUNT = 2;
  private readonly FLASH_LOAN_TIME_WINDOW = 300;
  private instructionErrorCount: number = 0;
  private readonly MAX_INSTRUCTION_ERRORS = 15;
  private readonly INSTRUCTION_ERROR_RESET_INTERVAL = 30000;
  private lastInstructionErrorTime: number = 0;

  private isCurrentEndpointHelius(): boolean {
    return this.analyzer.getCurrentEndpoint().includes('helius');
  }

  constructor() {
    console.log('🌐 Initializing monitor with Helius RPC...');
    
    const endpoints = [HELIUS_ENDPOINT, ...BACKUP_RPC_ENDPOINTS];
    this.analyzer = new SolanaTransactionAnalyzer(endpoints);
    
    this.subscribers = new Set();
    this.alerts = [];
    this.transactionTrackers = new Map();

    // Reset instruction error count more frequently
    setInterval(() => {
      const now = Date.now();
      if (this.instructionErrorCount > 0 && now - this.lastInstructionErrorTime > this.INSTRUCTION_ERROR_RESET_INTERVAL) {
        console.log(`ℹ️ Resetting instruction error count from ${this.instructionErrorCount} to 0`);
        this.instructionErrorCount = 0;
      }
    }, this.INSTRUCTION_ERROR_RESET_INTERVAL);
  }

  subscribe(callback: AlertSubscriber) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  getAlerts() {
    return this.alerts;
  }

  getAlertsBySeverity(severity: HackAlert['severity']) {
    return this.alerts.filter(alert => alert.severity === severity);
  }

  getAlertsByType(type: HackAlert['type']) {
    return this.alerts.filter(alert => alert.type === type);
  }

  async startMonitoring() {
    try {
      console.log('🚀 Starting live monitoring with Helius RPC...');
      console.log('⚙️ Using conservative request batching:');
      console.log(`   - Delay between requests: ${this.analyzer['REQUEST_DELAY']}ms`);
      console.log(`   - Batch size: ${this.analyzer['BATCH_SIZE']} requests`);
      console.log(`   - Minimum interval: ${this.analyzer['MIN_REQUEST_INTERVAL']}ms`);
      
      const connection = this.analyzer.getConnection();
      
      connection.onLogs(
        'all',
        (logs) => {
          if (logs.err) {
            if (typeof logs.err === 'object' && logs.err !== null && 'InstructionError' in logs.err) {
              // Only process instruction errors that aren't common
              const errorInfo = logs.err.InstructionError[1];
              const errorType = typeof errorInfo === 'object' ? Object.keys(errorInfo)[0] : String(errorInfo);
              if (!['InsufficientFunds', 'Custom'].includes(errorType)) {
                this.logInstructionError(logs.err);
              }
              if (logs.signature) {
                setTimeout(() => this.analyzeTransaction(logs), this.analyzer['REQUEST_DELAY']);
              }
            } else if (typeof logs.err === 'string' && (
              logs.err.includes('429') || 
              logs.err.includes('rate limit') || 
              logs.err.includes('socket')
            )) {
              console.error('Connection error:', logs.err);
              this.analyzer.switchRpc();
            } else {
              console.warn('Non-critical log error:', logs.err);
            }
            return;
          }
          setTimeout(() => this.analyzeTransaction(logs), this.analyzer['REQUEST_DELAY']);
        },
        'confirmed'
      );
      
      // Health check with longer interval
      setInterval(async () => {
        this.analyzer.addToQueue(async () => {
          try {
            await this.analyzer.executeRequest(() => connection.getVersion());
            if (this.instructionErrorCount > 0) {
              console.log('✅ Connection healthy, resetting error count');
              this.instructionErrorCount = 0;
            }
          } catch (error) {
            console.error('❌ Connection error:', error);
            this.analyzer.switchRpc();
          }
        });
      }, 60000);

    } catch (error) {
      console.error('Failed to start monitoring:', error);
      throw error;
    }
  }

  private analyzeTransaction(logs: any) {
    this.analyzer.addToQueue(async () => {
      try {
        const txSignature = logs.signature;
        const connection = this.analyzer.getConnection();
        const tx = await this.analyzer.executeRequest(() => 
          connection.getParsedTransaction(txSignature, {
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0
          })
        );
        
        if (!tx?.meta || !tx.transaction) return;

        // Check for SOL transfers
        if (tx.meta.preBalances && tx.meta.postBalances && tx.transaction.message.accountKeys) {
          for (let i = 0; i < tx.meta.preBalances.length; i++) {
            const preBalance = tx.meta.preBalances[i];
            const postBalance = tx.meta.postBalances[i];
            const difference = Math.abs(preBalance - postBalance);
            
            if (difference > this.LARGE_TRANSFER_THRESHOLD) {
              const account = tx.transaction.message.accountKeys[i];
              await this.handleLargeTransfer({
                signature: txSignature,
                from: account.pubkey.toString(),
                amount: difference / LAMPORTS_PER_SOL,
                timestamp: Date.now()
              });

              this.trackWithdrawal(account.pubkey.toString(), difference / LAMPORTS_PER_SOL);
            }
          }
        }

        // Check for token transfers
        if (tx.meta.postTokenBalances && tx.meta.preTokenBalances) {
          for (const postBalance of tx.meta.postTokenBalances) {
            const preBalance = tx.meta.preTokenBalances.find(
              pre => pre.accountIndex === postBalance.accountIndex
            );

            if (preBalance && postBalance.uiTokenAmount && preBalance.uiTokenAmount) {
              const difference = Math.abs(
                Number(postBalance.uiTokenAmount.amount) - Number(preBalance.uiTokenAmount.amount)
              );

              if (difference > this.LARGE_TRANSFER_THRESHOLD) {
                const account = tx.transaction.message.accountKeys[postBalance.accountIndex];
                await this.handleTokenTransfer({
                  signature: txSignature,
                  from: account.pubkey.toString(),
                  amount: difference,
                  token: postBalance.mint,
                  timestamp: Date.now()
                });
              }
            }
          }
        }
      } catch (error) {
        console.error('Error analyzing transaction:', error);
      }
    });
  }

  private trackWithdrawal(address: string, amount: number) {
    const now = Date.now();
    const tracker = this.transactionTrackers.get(address) || {
      address,
      withdrawals: []
    };

    tracker.withdrawals = tracker.withdrawals.filter(
      w => (now - w.timestamp) / 1000 <= this.FLASH_LOAN_TIME_WINDOW
    );

    tracker.withdrawals.push({
      amount,
      timestamp: now
    });

    if (tracker.withdrawals.length >= this.MULTIPLE_WITHDRAWAL_COUNT) {
      const totalAmount = tracker.withdrawals.reduce((sum, w) => sum + w.amount, 0);
      this.handleMultipleWithdrawals(address, tracker.withdrawals);
      tracker.withdrawals = [];
    }

    this.transactionTrackers.set(address, tracker);
  }

  private async handleLargeTransfer(transaction: { signature: string; from: string; amount: number; timestamp: number }) {
    const alert: HackAlert = {
      id: `transfer-${transaction.timestamp}`,
      type: "large-withdrawal",
      source: transaction.from,
      timestamp: transaction.timestamp,
      details: `Large transfer detected: ${transaction.amount} SOL`,
      description: `Large transfer detected: ${transaction.amount} SOL from ${transaction.from}`,
      severity: this.determineSeverity(transaction.amount),
      protocol: "Unknown",
      status: "investigating",
      links: [`https://solscan.io/tx/${transaction.signature}`],
      transactionHash: transaction.signature,
      estimatedLoss: transaction.amount
    };

    // Save using database service
    try {
      await dbService.saveAlert(alert);
      await dbService.saveSuspiciousTransaction({
        address: transaction.from,
        amount: transaction.amount,
        timestamp: transaction.timestamp,
        transactionType: 'large-transfer',
        alertId: alert.id
      });
      console.log('✅ Large transfer alert saved');
    } catch (error) {
      console.error('❌ Failed to save large transfer alert:', error);
    }

    this.alerts.push(alert);
    this.notifySubscribers(alert);
  }

  private async handleTokenTransfer(transaction: { signature: string; from: string; amount: number; token: string; timestamp: number }) {
    const alert: HackAlert = {
      id: `token-${transaction.timestamp}`,
      type: "large-withdrawal",
      source: transaction.from,
      timestamp: transaction.timestamp,
      details: `Large token transfer detected: ${transaction.amount} ${transaction.token}`,
      description: `Large token transfer detected: ${transaction.amount} ${transaction.token} from ${transaction.from}`,
      severity: this.determineSeverity(transaction.amount),
      protocol: "Unknown",
      status: "investigating",
      links: [`https://solscan.io/tx/${transaction.signature}`],
      transactionHash: transaction.signature,
      estimatedLoss: transaction.amount
    };

    // Save using database service
    try {
      await dbService.saveAlert(alert);
      await dbService.saveSuspiciousTransaction({
        address: transaction.from,
        amount: transaction.amount,
        timestamp: transaction.timestamp,
        transactionType: 'token-transfer',
        tokenAddress: transaction.token,
        alertId: alert.id
      });
      console.log('✅ Token transfer alert saved');
    } catch (error) {
      console.error('❌ Failed to save token transfer alert:', error);
    }

    this.alerts.push(alert);
    this.notifySubscribers(alert);
  }

  private async handleMultipleWithdrawals(address: string, withdrawals: Withdrawal[]) {
    const totalAmount = withdrawals.reduce((sum, w) => sum + w.amount, 0);
    const alert: HackAlert = {
      id: `withdrawals-${Date.now()}`,
      type: "multiple-withdrawals",
      source: address,
      timestamp: Date.now(),
      details: `Multiple withdrawals detected from ${address}`,
      description: `Multiple withdrawals totaling ${totalAmount} SOL detected from ${address} within ${this.FLASH_LOAN_TIME_WINDOW} seconds`,
      severity: "high",
      protocol: "Unknown",
      status: "investigating",
      links: [`https://solscan.io/account/${address}`],
      estimatedLoss: totalAmount
    };

    // Save using database service
    try {
      await dbService.saveAlert(alert);
      // Save each withdrawal as a suspicious transaction
      for (const withdrawal of withdrawals) {
        await dbService.saveSuspiciousTransaction({
          address: address,
          amount: withdrawal.amount,
          timestamp: withdrawal.timestamp,
          transactionType: 'multiple-withdrawal',
          alertId: alert.id
        });
      }
      console.log('✅ Multiple withdrawals alert saved');
    } catch (error) {
      console.error('❌ Failed to save multiple withdrawals alert:', error);
    }

    this.alerts.push(alert);
    this.notifySubscribers(alert);
  }

  private notifySubscribers(alert: HackAlert) {
    this.subscribers.forEach(subscriber => subscriber(alert));
  }

  private determineSeverity(amount: number): "critical" | "high" | "medium" | "low" {
    if (amount > 10000) return "critical";
    if (amount > 1000) return "high";
    if (amount > 500) return "medium";
    return "low";
  }

  // Update the cleanup method to clear mock data simulation
  cleanup() {
    this.analyzer.cleanup();
  }

  private logInstructionError(error: any) {
    try {
      if (Array.isArray(error?.InstructionError)) {
        const [index, errorInfo] = error.InstructionError;
        
        // Only log if it's not a common error
        const commonErrors = ['InsufficientFunds', 'Custom'];
        const errorType = typeof errorInfo === 'object' && errorInfo !== null 
          ? Object.keys(errorInfo)[0] 
          : String(errorInfo);

        if (!commonErrors.includes(errorType)) {
          console.warn(`🔍 Instruction Error: Type=${errorType}, Index=${index}`);
          
          if (this.isCurrentEndpointHelius()) {
            const now = Date.now();
            // Only increment error count if enough time has passed since last error
            if (now - this.lastInstructionErrorTime > 1000) { // 1 second cooldown
              this.instructionErrorCount++;
              this.lastInstructionErrorTime = now;
              
              if (this.instructionErrorCount > this.MAX_INSTRUCTION_ERRORS) {
                console.warn(`⚠️ High instruction error rate (${this.instructionErrorCount}/${this.MAX_INSTRUCTION_ERRORS}), checking connection...`);
                this.checkConnectionHealth();
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('Error parsing instruction error:', e);
    }
  }

  private async checkConnectionHealth() {
    try {
      const connection = this.analyzer.getConnection();
      await this.analyzer.executeRequest(() => connection.getVersion());
      console.log('✅ Connection is healthy despite instruction errors');
      this.instructionErrorCount = 0;
    } catch (error) {
      console.error('❌ Connection health check failed:', error);
      if (this.isCurrentEndpointHelius()) {
        console.log('🔄 Switching from Helius to backup RPC due to health check failure');
        this.analyzer.switchRpc();
      }
    }
  }

  async getStoredAlerts(limit = 100) {
    try {
      return await dbService.getRecentAlerts(limit);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      return this.alerts.slice(-limit);
    }
  }

  async getTransactionsByAddress(address: string) {
    try {
      return await dbService.getTransactionsByAddress(address);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  }
}

// Create single instance for monitoring
export const liveHackMonitor = new LiveHackMonitor();
export default liveHackMonitor;
