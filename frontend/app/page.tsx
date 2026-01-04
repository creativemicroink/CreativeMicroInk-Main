'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EditableText from '@/components/EditableText';
import EditableImage from '@/components/EditableImage';
import { useSettings } from '@/contexts/SettingsContext';
import { apiClient, GalleryImage } from '@/lib/api';

// Feature icons
const featureIcons: Record<string, JSX.Element> = {
  sparkles: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  gem: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  heart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

export default function Home() {
  const { getSetting } = useSettings();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    // Fetch gallery images for preview
    apiClient.getGalleryImages().then((data) => {
      setGalleryImages(data.slice(0, 4));
    }).catch(console.error);
  }, []);

  // Parse testimonials from settings
  const getTestimonials = () => {
    try {
      const testimonialsJson = getSetting('testimonials', '[]');
      return JSON.parse(testimonialsJson);
    } catch {
      return [];
    }
  };

  const testimonials = getTestimonials();

  return (
    <div className="bg-cream">
      {/* Hero Section - Full viewport */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <EditableImage
          settingKey="hero_image"
          fallback="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
          alt="Luxury permanent makeup"
          fill
          priority
          className="object-cover"
          containerClassName="absolute inset-0"
        />

        {/* Overlay */}
        <div className="hero-overlay absolute inset-0" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <EditableText
            settingKey="hero_title"
            fallback="Enhance Your Natural Beauty"
            as="h1"
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight"
          />

          <EditableText
            settingKey="hero_subtitle"
            fallback="Luxury permanent makeup artistry for the modern woman. Wake up every day looking effortlessly beautiful."
            as="p"
            className="text-lg sm:text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-primary text-lg">
              {getSetting('hero_cta_text', 'Book Your Consultation')}
            </Link>
            <Link
              href="/gallery"
              className="btn-secondary border-white text-white hover:bg-white hover:text-dark"
            >
              {getSetting('hero_cta_secondary_text', 'View Our Work')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-elegant">
                <Image
                  src="/images/about-artist.png"
                  alt="About CreativeMicroInk"
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-2xl -z-10" />
            </div>

            {/* Content */}
            <div>
              <EditableText
                settingKey="about_subtitle"
                fallback="Where Artistry Meets Precision"
                as="p"
                className="text-gold font-medium tracking-wider uppercase text-sm mb-4"
              />

              <EditableText
                settingKey="about_title"
                fallback="About Our Studio"
                as="h2"
                className="font-serif text-heading-2 md:text-heading-1 text-dark mb-6"
              />

              <EditableText
                settingKey="about_description"
                fallback="With years of experience in permanent makeup artistry, we specialize in creating natural, beautiful enhancements that complement your unique features. Our commitment to excellence, safety, and personalized care ensures you leave feeling confident and beautiful."
                as="p"
                className="text-muted text-lg leading-relaxed mb-8"
                multiline
              />

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-dark">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Certified PMU Artist</span>
                </div>
                <div className="flex items-center gap-2 text-dark">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Family Owned</span>
                </div>
                <div className="flex items-center gap-2 text-dark">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Natural Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-gold/10 text-gold text-sm font-medium uppercase tracking-widest rounded-full mb-4">
              Limited Time
            </span>
            <h2 className="section-title">Special Offers</h2>
            <p className="section-subtitle">
              Take advantage of our exclusive deals and save on your beauty transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Deal 1 - Bring a Friend */}
            <div className="group relative bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl p-8 border-2 border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-gold text-dark text-xs font-bold uppercase rounded-full">
                  Best Value
                </span>
              </div>
              <div className="mb-6">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-dark mb-2">You & Friend Brows</h3>
                <p className="text-muted mb-4">Bring a friend and both get beautiful brows at a special price!</p>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-gold">$400</span>
                <span className="text-muted line-through">$760</span>
                <span className="text-sm text-green-600 font-medium">Save $360</span>
              </div>
              <Link href="/booking" className="block w-full text-center py-3 bg-dark text-white rounded-xl hover:bg-gold hover:text-dark transition-all font-medium">
                Book Together
              </Link>
            </div>

            {/* Deal 2 - Brows + Lips Combo */}
            <div className="group relative bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl p-8 border-2 border-rose-200/50 hover:border-rose-300 transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-rose-400 text-white text-xs font-bold uppercase rounded-full">
                  Popular
                </span>
              </div>
              <div className="mb-6">
                <div className="w-16 h-16 bg-rose-200/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-dark mb-2">Brows + Lip Blush</h3>
                <p className="text-muted mb-4">Complete your look with perfect brows and luscious lips!</p>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-rose-500">$400</span>
                <span className="text-muted line-through">$780</span>
                <span className="text-sm text-green-600 font-medium">Save $380</span>
              </div>
              <Link href="/booking" className="block w-full text-center py-3 bg-dark text-white rounded-xl hover:bg-rose-500 transition-all font-medium">
                Get the Combo
              </Link>
            </div>

            {/* Deal 3 - First Time Client */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-8 border-2 border-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold uppercase rounded-full">
                  New Clients
                </span>
              </div>
              <div className="mb-6">
                <div className="w-16 h-16 bg-purple-200/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-dark mb-2">First Visit Special</h3>
                <p className="text-muted mb-4">New to permanent makeup? Get a free consultation included!</p>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-purple-500">FREE</span>
                <span className="text-muted">Consultation</span>
              </div>
              <Link href="/booking" className="block w-full text-center py-3 bg-dark text-white rounded-xl hover:bg-purple-500 transition-all font-medium">
                Book Consultation
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              View All Services & Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="text-center mb-16">
            <EditableText
              settingKey="features_title"
              fallback="Why Choose Us"
              as="h2"
              className="section-title"
            />
            <EditableText
              settingKey="features_subtitle"
              fallback="Experience the difference of true artistry and dedication"
              as="p"
              className="section-subtitle"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => {
              const iconKey = getSetting(`feature_${num}_icon`, num === 1 ? 'sparkles' : num === 2 ? 'gem' : 'heart');
              return (
                <div key={num} className="card text-center group hover:shadow-gold transition-all duration-300">
                  <div className="feature-icon mx-auto group-hover:scale-110 transition-transform duration-300">
                    {featureIcons[iconKey] || featureIcons.sparkles}
                  </div>
                  <EditableText
                    settingKey={`feature_${num}_title`}
                    fallback={num === 1 ? 'Expert Artistry' : num === 2 ? 'Premium Products' : 'Personalized Care'}
                    as="h3"
                    className="font-serif text-xl text-dark mb-3"
                  />
                  <EditableText
                    settingKey={`feature_${num}_description`}
                    fallback={
                      num === 1
                        ? 'Years of experience delivering beautiful, natural-looking results that enhance your unique features.'
                        : num === 2
                        ? 'Only the finest pigments and tools are used, ensuring lasting results and your complete satisfaction.'
                        : 'Every treatment is tailored to your individual needs, skin tone, and desired look.'
                    }
                    as="p"
                    className="text-muted"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {galleryImages.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container-main">
            <div className="text-center mb-16">
              <EditableText
                settingKey="gallery_title"
                fallback="Our Portfolio"
                as="h2"
                className="section-title"
              />
              <EditableText
                settingKey="gallery_subtitle"
                fallback="See the artistry in our before and after transformations"
                as="p"
                className="section-subtitle"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square relative rounded-card overflow-hidden image-hover-zoom"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || 'Gallery image'}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/gallery" className="btn-secondary">
                {getSetting('gallery_cta_text', 'View Full Gallery')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container-main">
            <div className="text-center mb-16">
              <EditableText
                settingKey="testimonials_title"
                fallback="Client Experiences"
                as="h2"
                className="section-title"
              />
              <EditableText
                settingKey="testimonials_subtitle"
                fallback="Hear from our satisfied clients"
                as="p"
                className="section-subtitle"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial: { name: string; text: string; rating: number; service?: string }, index: number) => (
                <div key={index} className="testimonial-card">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-dark mb-6 italic leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-gold font-semibold">
                        {testimonial.name?.charAt(0) || 'C'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-dark">{testimonial.name}</p>
                      {testimonial.service && (
                        <p className="text-sm text-muted">{testimonial.service}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-24 md:py-32">
        {/* Background */}
        <EditableImage
          settingKey="cta_background_image"
          fallback="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80"
          alt="Book your appointment"
          fill
          className="object-cover"
          containerClassName="absolute inset-0"
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Content */}
        <div className="relative z-10 container-main text-center text-white">
          <EditableText
            settingKey="cta_title"
            fallback="Begin Your Beauty Journey"
            as="h2"
            className="font-serif text-heading-2 md:text-heading-1 mb-6"
          />
          <EditableText
            settingKey="cta_subtitle"
            fallback="Book your consultation today and discover the art of effortless beauty. Transform your morning routine forever."
            as="p"
            className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10"
          />
          <Link href="/booking" className="btn-primary text-lg">
            {getSetting('cta_button_text', 'Schedule Your Appointment')}
          </Link>
        </div>
      </section>
    </div>
  );
}
