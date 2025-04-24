import { Pool } from 'pg';
import { HackAlert } from './liveHacks';

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/solana_watchdog',
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : undefined
    });
  }

  async initialize() {
    // Create necessary tables
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS hack_alerts (
        id VARCHAR(255) PRIMARY KEY,
        timestamp BIGINT NOT NULL,
        protocol VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        severity VARCHAR(20) NOT NULL,
        description TEXT NOT NULL,
        transaction_hash VARCHAR(255),
        estimated_loss DECIMAL,
        status VARCHAR(20) NOT NULL,
        source VARCHAR(255) NOT NULL,
        details TEXT NOT NULL,
        links TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS suspicious_transactions (
        id SERIAL PRIMARY KEY,
        address VARCHAR(255) NOT NULL,
        amount DECIMAL NOT NULL,
        timestamp BIGINT NOT NULL,
        transaction_type VARCHAR(50) NOT NULL,
        token_address VARCHAR(255),
        token_symbol VARCHAR(50),
        alert_id VARCHAR(255) REFERENCES hack_alerts(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS monitor_settings (
        id SERIAL PRIMARY KEY,
        monitor_type VARCHAR(50) NOT NULL UNIQUE,
        is_enabled BOOLEAN DEFAULT true,
        config JSONB,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_hack_alerts_timestamp ON hack_alerts(timestamp);
      CREATE INDEX IF NOT EXISTS idx_hack_alerts_protocol ON hack_alerts(protocol);
      CREATE INDEX IF NOT EXISTS idx_hack_alerts_severity ON hack_alerts(severity);
      CREATE INDEX IF NOT EXISTS idx_suspicious_transactions_address ON suspicious_transactions(address);
      CREATE INDEX IF NOT EXISTS idx_suspicious_transactions_timestamp ON suspicious_transactions(timestamp);
    `);
  }

  async saveAlert(alert: HackAlert) {
    const query = `
      INSERT INTO hack_alerts (
        id, timestamp, protocol, type, severity, description,
        transaction_hash, estimated_loss, status, source, details, links
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        estimated_loss = EXCLUDED.estimated_loss,
        details = EXCLUDED.details,
        links = EXCLUDED.links
    `;

    await this.pool.query(query, [
      alert.id,
      alert.timestamp,
      alert.protocol,
      alert.type,
      alert.severity,
      alert.description,
      alert.transactionHash,
      alert.estimatedLoss,
      alert.status,
      alert.source,
      alert.details,
      alert.links
    ]);
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
    const query = `
      INSERT INTO suspicious_transactions (
        address, amount, timestamp, transaction_type,
        token_address, token_symbol, alert_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const result = await this.pool.query(query, [
      transaction.address,
      transaction.amount,
      transaction.timestamp,
      transaction.transactionType,
      transaction.tokenAddress,
      transaction.tokenSymbol,
      transaction.alertId
    ]);

    return result.rows[0].id;
  }

  async getRecentAlerts(limit = 100) {
    const query = `
      SELECT 
        a.*,
        COALESCE(json_agg(t) FILTER (WHERE t.id IS NOT NULL), '[]') as transactions
      FROM hack_alerts a
      LEFT JOIN suspicious_transactions t ON t.alert_id = a.id
      GROUP BY a.id
      ORDER BY a.timestamp DESC
      LIMIT $1
    `;
    
    const result = await this.pool.query(query, [limit]);
    return result.rows;
  }

  async getAlertsByProtocol(protocol: string) {
    const query = `
      SELECT * FROM hack_alerts
      WHERE protocol = $1
      ORDER BY timestamp DESC
    `;
    
    const result = await this.pool.query(query, [protocol]);
    return result.rows;
  }

  async getAlertsBySeverity(severity: string) {
    const query = `
      SELECT * FROM hack_alerts
      WHERE severity = $1
      ORDER BY timestamp DESC
    `;
    
    const result = await this.pool.query(query, [severity]);
    return result.rows;
  }

  async updateMonitorSettings(type: string, isEnabled: boolean, config: any = {}) {
    const query = `
      INSERT INTO monitor_settings (monitor_type, is_enabled, config)
      VALUES ($1, $2, $3)
      ON CONFLICT (monitor_type) DO UPDATE SET
        is_enabled = EXCLUDED.is_enabled,
        config = EXCLUDED.config,
        updated_at = CURRENT_TIMESTAMP
    `;

    await this.pool.query(query, [type, isEnabled, config]);
  }

  async getMonitorSettings() {
    const query = `
      SELECT * FROM monitor_settings
      ORDER BY monitor_type
    `;
    
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getTransactionsByAddress(address: string) {
    const query = `
      SELECT * FROM suspicious_transactions
      WHERE address = $1
      ORDER BY timestamp DESC
    `;
    
    const result = await this.pool.query(query, [address]);
    return result.rows;
  }

  async getTransactionsByAlert(alertId: string) {
    const query = `
      SELECT * FROM suspicious_transactions
      WHERE alert_id = $1
      ORDER BY timestamp DESC
    `;
    
    const result = await this.pool.query(query, [alertId]);
    return result.rows;
  }

  async close() {
    await this.pool.end();
  }
}

export const db = new Database();
export default db; 