/**
 * Database Setup Script for Creative Micro Inc
 *
 * This script:
 * 1. Connects to PostgreSQL
 * 2. Runs the initial migration SQL
 * 3. Creates an initial admin user with bcrypt-hashed password
 *
 * Usage: npm run db:setup
 */

import { Pool, PoolConfig } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@creativemicroink.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';
const BCRYPT_ROUNDS = 12;

// Database connection configuration
function getPoolConfig(): PoolConfig {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
    };
  }

  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'creative_micro',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
  };
}

/**
 * Read the migration SQL file
 */
function readMigrationFile(): string {
  const migrationPath = path.join(__dirname, 'migrations', '001_initial.sql');

  if (!fs.existsSync(migrationPath)) {
    throw new Error(`Migration file not found: ${migrationPath}`);
  }

  return fs.readFileSync(migrationPath, 'utf-8');
}

/**
 * Run the migration SQL
 */
async function runMigration(pool: Pool): Promise<void> {
  console.log('Reading migration file...');
  const migrationSQL = readMigrationFile();

  console.log('Running migration...');
  await pool.query(migrationSQL);
  console.log('Migration completed successfully!');
}

/**
 * Create or update the initial admin user
 */
async function createAdminUser(pool: Pool): Promise<void> {
  console.log('Creating admin user...');

  // Hash the password
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, BCRYPT_ROUNDS);

  // Check if admin user already exists
  const existingUser = await pool.query(
    'SELECT id, email FROM users WHERE email = $1',
    [ADMIN_EMAIL]
  );

  if (existingUser.rows.length > 0) {
    // Update existing admin user's password
    await pool.query(
      'UPDATE users SET password_hash = $1, name = $2 WHERE email = $3',
      [passwordHash, ADMIN_NAME, ADMIN_EMAIL]
    );
    console.log(`Admin user updated: ${ADMIN_EMAIL}`);
  } else {
    // Insert new admin user
    await pool.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)',
      [ADMIN_EMAIL, passwordHash, ADMIN_NAME]
    );
    console.log(`Admin user created: ${ADMIN_EMAIL}`);
  }

  console.log('');
  console.log('========================================');
  console.log('IMPORTANT: Admin User Credentials');
  console.log('========================================');
  console.log(`Email: ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log('');
  console.log('Please change this password immediately after first login!');
  console.log('========================================');
}

/**
 * Verify the setup was successful
 */
async function verifySetup(pool: Pool): Promise<void> {
  console.log('\nVerifying setup...');

  // Check tables exist
  const tablesResult = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);

  const tables = tablesResult.rows.map(row => row.table_name);
  console.log('Tables created:', tables.join(', '));

  // Check admin user exists
  const userResult = await pool.query('SELECT id, email, name FROM users LIMIT 1');
  if (userResult.rows.length > 0) {
    console.log('Admin user verified:', userResult.rows[0].email);
  }

  // Check site settings
  const settingsResult = await pool.query('SELECT COUNT(*) as count FROM site_settings');
  console.log('Site settings count:', settingsResult.rows[0].count);

  console.log('\nSetup verification completed!');
}

/**
 * Main setup function
 */
async function setup(): Promise<void> {
  console.log('========================================');
  console.log('Creative Micro Inc - Database Setup');
  console.log('========================================\n');

  const poolConfig = getPoolConfig();
  const pool = new Pool({
    ...poolConfig,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  try {
    // Test connection
    console.log('Connecting to database...');
    const connectionTest = await pool.query('SELECT NOW() as current_time');
    console.log('Connected successfully at:', connectionTest.rows[0].current_time);
    console.log('');

    // Run migration
    await runMigration(pool);

    // Create admin user
    await createAdminUser(pool);

    // Verify setup
    await verifySetup(pool);

    console.log('\n========================================');
    console.log('Database setup completed successfully!');
    console.log('========================================\n');

  } catch (error) {
    console.error('\n========================================');
    console.error('Database setup failed!');
    console.error('========================================');

    if (error instanceof Error) {
      console.error('Error:', error.message);

      // Provide helpful error messages for common issues
      if (error.message.includes('ECONNREFUSED')) {
        console.error('\nPossible causes:');
        console.error('- PostgreSQL is not running');
        console.error('- Wrong host or port in configuration');
        console.error('\nSolutions:');
        console.error('- Start PostgreSQL service');
        console.error('- Check DB_HOST and DB_PORT environment variables');
      } else if (error.message.includes('authentication failed')) {
        console.error('\nPossible causes:');
        console.error('- Wrong username or password');
        console.error('\nSolutions:');
        console.error('- Check DB_USER and DB_PASSWORD environment variables');
      } else if (error.message.includes('does not exist')) {
        console.error('\nPossible causes:');
        console.error('- Database does not exist');
        console.error('\nSolutions:');
        console.error('- Create the database manually: CREATE DATABASE creative_micro;');
        console.error('- Check DB_NAME environment variable');
      }

      if (process.env.NODE_ENV === 'development') {
        console.error('\nFull error stack:', error.stack);
      }
    } else {
      console.error('Unknown error:', error);
    }

    process.exit(1);
  } finally {
    await pool.end();
    console.log('Database connection closed.');
  }
}

// Run setup
setup();
