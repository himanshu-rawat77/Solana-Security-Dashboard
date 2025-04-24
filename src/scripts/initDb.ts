import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initializeDatabase() {
  try {
    // Create hack_alerts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hack_alerts (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        protocol VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        severity VARCHAR(20) NOT NULL,
        description TEXT NOT NULL,
        transaction_hash VARCHAR(255),
        estimated_loss DECIMAL,
        status VARCHAR(50) NOT NULL,
        source VARCHAR(100) NOT NULL,
        links JSONB
      );
    `);

    // Create monitor_settings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS monitor_settings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        enabled BOOLEAN DEFAULT true,
        config JSONB,
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert default monitor settings if they don't exist
    await pool.query(`
      INSERT INTO monitor_settings (name, enabled, config)
      VALUES 
        ('transaction_monitoring', true, '{"minAmount": 1000000, "suspiciousPatterns": ["flash_loan", "large_transfer"]}'),
        ('social_monitoring', true, '{"keywords": ["hack", "exploit", "stolen"], "sources": ["twitter", "discord"]}'),
        ('price_monitoring', true, '{"threshold": 20, "timeWindow": 3600}'),
        ('forta_alerts', true, '{"severityLevel": "CRITICAL"}')
      ON CONFLICT (name) DO NOTHING;
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

initializeDatabase(); 