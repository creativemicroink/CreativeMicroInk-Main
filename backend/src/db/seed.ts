/**
 * Database Seed Script for Creative Micro Inc
 *
 * This script populates the database with:
 * 1. Sample services data from the single-page.html
 * 2. Sample site settings (contact info, business hours)
 *
 * Usage: npm run db:seed
 */

import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

// Service data interface
interface ServiceData {
  name: string;
  description: string;
  price: number;
  touch_up_price: number | null;
  duration: string;
  category: string;
  booking_url: string;
  display_order: number;
  is_active: boolean;
}

// Site settings interface
interface SiteSetting {
  key: string;
  value: string;
}

/**
 * Sample services from single-page.html
 */
const SERVICES_DATA: ServiceData[] = [
  {
    name: 'Powder Brows',
    description: 'Soft, filled-in, makeup-like look.',
    price: 380,
    touch_up_price: 150,
    duration: '2-3 hours',
    category: 'Brows',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/HX7Y4RYQTN6FAETXP65QRV52',
    display_order: 1,
    is_active: true,
  },
  {
    name: 'Ombre Brows',
    description: 'Gradient brow from light to dark.',
    price: 425,
    touch_up_price: 100,
    duration: '2-3 hours',
    category: 'Brows',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/Q3D2VQO5K4YT3TIOPWI2K4R3',
    display_order: 2,
    is_active: true,
  },
  {
    name: 'Microshading',
    description: 'Soft, powdered effect using tiny dots.',
    price: 380,
    touch_up_price: 125,
    duration: '2-3 hours',
    category: 'Brows',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/MKDJESN64Q36D6AS4OLGN6GE',
    display_order: 3,
    is_active: true,
  },
  {
    name: 'Microblading / Nano Brows',
    description: 'Hair-like strokes for fuller brows.',
    price: 450,
    touch_up_price: 100,
    duration: '2-3 hours',
    category: 'Brows',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/ELARJL56PO5VEGIR4H7EERAK',
    display_order: 4,
    is_active: true,
  },
  {
    name: 'Combo Brows',
    description: 'Blend of strokes and shading with ombre tail.',
    price: 450,
    touch_up_price: 100,
    duration: '2.5-3.5 hours',
    category: 'Brows',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/3FJ6EKM7SL42BCTJBTNYDNER',
    display_order: 5,
    is_active: true,
  },
  {
    name: 'Lip Blushing',
    description: 'Enhances color, symmetry, and fullness.',
    price: 400,
    touch_up_price: 125,
    duration: '2-3 hours',
    category: 'Lips',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/QKKYNGNKXQH54Q4UYNENX4FJ',
    display_order: 6,
    is_active: true,
  },
  {
    name: 'Microblading Removal',
    description: 'Corrects faded or discolored pigment.',
    price: 160,
    touch_up_price: null,
    duration: '1-2 hours',
    category: 'Correction',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/HCN6QE2WGJP55MQYL4TZ2TTZ',
    display_order: 7,
    is_active: true,
  },
  {
    name: 'Brow Lamination',
    description: 'Fuller, groomed brow lasting 4-6 weeks.',
    price: 90,
    touch_up_price: null,
    duration: '45-60 minutes',
    category: 'Brows',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/AXAHF2T4SQ22JYDJTJEWC5M5',
    display_order: 8,
    is_active: true,
  },
  {
    name: 'Lash Lift & Tint',
    description: 'Curls, lifts, and darkens natural lashes.',
    price: 110,
    touch_up_price: null,
    duration: '45-60 minutes',
    category: 'Lashes',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/4KUUQYDXLH3QKSC2ZRQC274C',
    display_order: 9,
    is_active: true,
  },
  {
    name: 'Brow Wax',
    description: 'Precise hair removal for brow shaping.',
    price: 20,
    touch_up_price: null,
    duration: '15-20 minutes',
    category: 'Brows',
    booking_url: 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/E52373UZDFMNSGRP4DGVQC4Z',
    display_order: 10,
    is_active: true,
  },
];

/**
 * Sample site settings
 */
const SITE_SETTINGS: SiteSetting[] = [
  { key: 'site_name', value: 'CreativeMicroInk' },
  { key: 'site_description', value: 'Professional permanent makeup services to give you confidence and save time every day.' },
  { key: 'contact_email', value: 'Creativemicroink@gmail.com' },
  { key: 'contact_phone', value: '(555) 123-4567' },
  { key: 'address', value: '123 Beauty Lane, Suite 100, Los Angeles, CA 90001' },
  {
    key: 'business_hours',
    value: JSON.stringify({
      monday: { open: '9:00 AM', close: '6:00 PM', closed: false },
      tuesday: { open: '9:00 AM', close: '6:00 PM', closed: false },
      wednesday: { open: '9:00 AM', close: '6:00 PM', closed: false },
      thursday: { open: '9:00 AM', close: '7:00 PM', closed: false },
      friday: { open: '9:00 AM', close: '7:00 PM', closed: false },
      saturday: { open: '10:00 AM', close: '5:00 PM', closed: false },
      sunday: { open: '', close: '', closed: true },
    }),
  },
  { key: 'social_facebook', value: 'https://facebook.com/creativemicroink' },
  { key: 'social_instagram', value: 'https://instagram.com/creativemicroink' },
  { key: 'social_twitter', value: '' },
  { key: 'social_tiktok', value: 'https://tiktok.com/@creativemicroink' },
  { key: 'hero_title', value: 'Enhance Your Natural Beauty' },
  { key: 'hero_subtitle', value: 'Professional permanent makeup services to give you confidence and save time every day.' },
  {
    key: 'about_text',
    value: 'CreativeMicroInk specializes in permanent makeup services including microblading, powder brows, lip blushing, and more. Our skilled artists use the latest techniques and highest quality pigments to create natural-looking results that enhance your unique features.',
  },
  { key: 'booking_widget_url', value: 'https://app.squareup.com/appointments/book/mqg2qbsbetp3qk/LNT7960JWJJ0Z/start' },
  { key: 'meta_keywords', value: 'microblading, powder brows, permanent makeup, lip blushing, eyebrows, beauty, Los Angeles' },
  { key: 'google_analytics_id', value: '' },
  { key: 'footer_text', value: 'CreativeMicroInk. All rights reserved.' },
];

/**
 * Seed services data
 */
async function seedServices(pool: Pool): Promise<void> {
  console.log('Seeding services...');

  // Clear existing services (optional - remove if you want to keep existing data)
  await pool.query('DELETE FROM services');
  console.log('Cleared existing services.');

  // Insert services
  for (const service of SERVICES_DATA) {
    await pool.query(
      `INSERT INTO services (name, description, price, touch_up_price, duration, category, booking_url, display_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        service.name,
        service.description,
        service.price,
        service.touch_up_price,
        service.duration,
        service.category,
        service.booking_url,
        service.display_order,
        service.is_active,
      ]
    );
    console.log(`  Added service: ${service.name}`);
  }

  console.log(`Seeded ${SERVICES_DATA.length} services.`);
}

/**
 * Seed site settings
 */
async function seedSiteSettings(pool: Pool): Promise<void> {
  console.log('\nSeeding site settings...');

  for (const setting of SITE_SETTINGS) {
    await pool.query(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [setting.key, setting.value]
    );
    console.log(`  Set: ${setting.key}`);
  }

  console.log(`Seeded ${SITE_SETTINGS.length} site settings.`);
}

/**
 * Verify seeded data
 */
async function verifySeedData(pool: Pool): Promise<void> {
  console.log('\nVerifying seeded data...');

  // Check services count
  const servicesResult = await pool.query('SELECT COUNT(*) as count FROM services');
  console.log(`Services count: ${servicesResult.rows[0].count}`);

  // List services by category
  const categoriesResult = await pool.query(`
    SELECT category, COUNT(*) as count
    FROM services
    GROUP BY category
    ORDER BY category
  `);
  console.log('Services by category:');
  for (const row of categoriesResult.rows) {
    console.log(`  ${row.category}: ${row.count}`);
  }

  // Check site settings count
  const settingsResult = await pool.query('SELECT COUNT(*) as count FROM site_settings');
  console.log(`Site settings count: ${settingsResult.rows[0].count}`);
}

/**
 * Main seed function
 */
async function seed(): Promise<void> {
  console.log('========================================');
  console.log('Creative Micro Inc - Database Seed');
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

    // Check if tables exist
    const tablesCheck = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('services', 'site_settings')
    `);

    if (tablesCheck.rows.length < 2) {
      console.error('Required tables do not exist!');
      console.error('Please run "npm run db:setup" first to create the database schema.');
      process.exit(1);
    }

    // Seed services
    await seedServices(pool);

    // Seed site settings
    await seedSiteSettings(pool);

    // Verify data
    await verifySeedData(pool);

    console.log('\n========================================');
    console.log('Database seeding completed successfully!');
    console.log('========================================\n');

  } catch (error) {
    console.error('\n========================================');
    console.error('Database seeding failed!');
    console.error('========================================');

    if (error instanceof Error) {
      console.error('Error:', error.message);

      if (error.message.includes('ECONNREFUSED')) {
        console.error('\nPossible causes:');
        console.error('- PostgreSQL is not running');
        console.error('- Wrong host or port in configuration');
      } else if (error.message.includes('does not exist')) {
        console.error('\nPossible causes:');
        console.error('- Database or tables do not exist');
        console.error('- Run "npm run db:setup" first');
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

// Run seed
seed();
