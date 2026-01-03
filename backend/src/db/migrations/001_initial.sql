-- Initial database migration for Creative Micro Inc
-- Run this migration to set up the initial database schema

-- Enable UUID extension (optional, for future use)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Users table
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- Services table
-- ============================================
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    touch_up_price DECIMAL(10, 2),
    duration VARCHAR(100),
    category VARCHAR(100),
    image_url TEXT,
    booking_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);

-- ============================================
-- Gallery images table
-- ============================================
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    category VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at ON gallery_images(created_at);

-- ============================================
-- Site settings table
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- ============================================
-- Insert default settings
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('site_name', 'Creative Micro Inc'),
    ('site_description', 'Professional microblading and beauty services'),
    ('contact_email', 'info@creativemicro.com'),
    ('contact_phone', ''),
    ('address', ''),
    ('business_hours', ''),
    ('social_facebook', ''),
    ('social_instagram', ''),
    ('social_twitter', ''),
    ('hero_title', 'Welcome to Creative Micro Inc'),
    ('hero_subtitle', 'Professional Microblading Services'),
    ('about_text', '')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- Create default admin user
-- Password: changeme123 (bcrypt hash with 12 rounds)
-- IMPORTANT: Change this password immediately after first login!
-- ============================================
INSERT INTO users (email, password_hash, name) VALUES
    ('admin@creativemicro.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Nq9xLvlgqK1rXi', 'Admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Add sample services (optional - can be removed)
-- ============================================
INSERT INTO services (name, description, price, touch_up_price, duration, category, display_order, is_active) VALUES
    ('Microblading', 'Natural-looking hair strokes for fuller eyebrows', 400.00, 150.00, '2-3 hours', 'Brows', 1, true),
    ('Powder Brows', 'Soft, powdered look for a more defined appearance', 450.00, 150.00, '2-3 hours', 'Brows', 2, true),
    ('Combo Brows', 'Combination of microblading and powder brows', 500.00, 175.00, '3 hours', 'Brows', 3, true),
    ('Lip Blush', 'Natural-looking lip color enhancement', 400.00, 150.00, '2-3 hours', 'Lips', 4, true),
    ('Eyeliner', 'Permanent eyeliner for defined eyes', 350.00, 125.00, '1.5-2 hours', 'Eyes', 5, true)
ON CONFLICT DO NOTHING;

-- ============================================
-- Comments and documentation
-- ============================================
COMMENT ON TABLE users IS 'Admin users for the CMS';
COMMENT ON TABLE services IS 'Services offered by the business';
COMMENT ON TABLE gallery_images IS 'Portfolio/gallery images';
COMMENT ON TABLE site_settings IS 'Key-value store for site configuration';

COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password';
COMMENT ON COLUMN services.touch_up_price IS 'Price for touch-up sessions';
COMMENT ON COLUMN services.duration IS 'Approximate duration of the service';
COMMENT ON COLUMN services.booking_url IS 'External booking link if applicable';
COMMENT ON COLUMN services.display_order IS 'Order in which services appear on the site';
COMMENT ON COLUMN gallery_images.thumbnail_url IS 'Cloudinary-generated thumbnail URL';
COMMENT ON COLUMN gallery_images.display_order IS 'Order in which images appear in gallery';
