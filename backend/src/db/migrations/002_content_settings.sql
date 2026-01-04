-- Migration: 002_content_settings.sql
-- Description: Add all editable content settings for the CMS
-- Created: 2026-01-03

-- ============================================
-- HERO SECTION SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('hero_image', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80'),
    ('hero_title', 'Enhance Your Natural Beauty'),
    ('hero_subtitle', 'Luxury permanent makeup artistry for the modern woman. Wake up every day looking effortlessly beautiful.'),
    ('hero_cta_text', 'Book Your Consultation'),
    ('hero_cta_secondary_text', 'View Our Work'),
    ('hero_overlay_opacity', '0.4')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- ABOUT SECTION SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('about_title', 'About Our Studio'),
    ('about_subtitle', 'Where Artistry Meets Precision'),
    ('about_description', 'With years of experience in permanent makeup artistry, we specialize in creating natural, beautiful enhancements that complement your unique features. Our commitment to excellence, safety, and personalized care ensures you leave feeling confident and beautiful.'),
    ('about_image', '/images/about-artist.png'),
    ('about_credentials', '["Certified PMU Artist", "5+ Years Experience", "1000+ Happy Clients"]')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- FEATURES/WHY CHOOSE US SECTION
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('features_title', 'Why Choose Us'),
    ('features_subtitle', 'Experience the difference of true artistry and dedication'),
    ('feature_1_icon', 'sparkles'),
    ('feature_1_title', 'Expert Artistry'),
    ('feature_1_description', 'Years of experience delivering beautiful, natural-looking results that enhance your unique features.'),
    ('feature_2_icon', 'gem'),
    ('feature_2_title', 'Premium Products'),
    ('feature_2_description', 'Only the finest pigments and tools are used, ensuring lasting results and your complete satisfaction.'),
    ('feature_3_icon', 'heart'),
    ('feature_3_title', 'Personalized Care'),
    ('feature_3_description', 'Every treatment is tailored to your individual needs, skin tone, and desired look.')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- SERVICES SECTION SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('services_title', 'Our Signature Services'),
    ('services_subtitle', 'Discover our range of professional permanent makeup services designed to enhance your natural beauty'),
    ('services_cta_text', 'Explore All Services')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- GALLERY SECTION SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('gallery_title', 'Our Portfolio'),
    ('gallery_subtitle', 'See the artistry in our before and after transformations'),
    ('gallery_cta_text', 'View Full Gallery')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- CTA SECTION SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('cta_title', 'Begin Your Beauty Journey'),
    ('cta_subtitle', 'Book your consultation today and discover the art of effortless beauty. Transform your morning routine forever.'),
    ('cta_button_text', 'Schedule Your Appointment'),
    ('cta_background_image', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- TESTIMONIALS SECTION SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('testimonials_title', 'Client Experiences'),
    ('testimonials_subtitle', 'Hear from our satisfied clients'),
    ('testimonials', '[{"name":"Sarah M.","text":"Absolutely beautiful work! I wake up every morning feeling confident and put-together. Best decision I ever made.","rating":5,"service":"Powder Brows"},{"name":"Jessica L.","text":"The attention to detail is incredible. My brows look so natural, everyone thinks I was born with them!","rating":5,"service":"Microblading"},{"name":"Amanda K.","text":"Professional, caring, and incredibly talented. I could not be happier with my lip blush results.","rating":5,"service":"Lip Blush"}]')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- FOOTER SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('footer_tagline', 'Professional permanent makeup services to enhance your natural beauty and give you confidence every day.'),
    ('footer_copyright', '2024 CreativeMicroInk. All rights reserved.')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- BRANDING SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('logo_text', 'CreativeMicroInk'),
    ('logo_image', ''),
    ('tagline', 'Luxury Permanent Makeup')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- SOCIAL MEDIA SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('social_instagram', 'https://www.instagram.com/creativemicroink'),
    ('social_facebook', 'https://www.facebook.com/people/Creative-Micro-Ink/100063675476894/'),
    ('social_tiktok', '')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- BOOKING PAGE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('booking_title', 'Book Your Appointment'),
    ('booking_subtitle', 'Select a service to begin your beauty journey'),
    ('booking_info_text', 'All consultations include a thorough discussion of your goals, skin analysis, and personalized recommendations.')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- CONTACT PAGE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('contact_title', 'Get In Touch'),
    ('contact_subtitle', 'We would love to hear from you. Reach out for questions or to schedule your consultation.'),
    ('contact_phone', '(718) 954-5525'),
    ('contact_email', 'Creativemicroink@gmail.com'),
    ('contact_address', '1612 W Waters Ave Suite #103, Tampa, FL 33604')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- SEO/META SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
    ('meta_title', 'CreativeMicroInk - Luxury Permanent Makeup'),
    ('meta_description', 'Experience the art of luxury permanent makeup. Expert microblading, powder brows, and lip blushing services. Wake up beautiful every day.'),
    ('meta_keywords', 'permanent makeup, microblading, powder brows, lip blush, eyebrow tattoo, PMU, beauty')
ON CONFLICT (key) DO NOTHING;
