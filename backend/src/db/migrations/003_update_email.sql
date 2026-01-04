-- Migration: 003_update_email.sql
-- Description: Update contact email to correct value
-- Created: 2026-01-03

-- Update the contact email setting to the correct email address
UPDATE site_settings
SET value = 'Creativemicroink@gmail.com', updated_at = NOW()
WHERE key = 'contact_email';

-- Also ensure it exists if somehow missing
INSERT INTO site_settings (key, value)
VALUES ('contact_email', 'Creativemicroink@gmail.com')
ON CONFLICT (key) DO UPDATE SET value = 'Creativemicroink@gmail.com', updated_at = NOW();
