'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EditableText from '@/components/EditableText';
import EditableImage from '@/components/EditableImage';
import ServiceCard from '@/components/ServiceCard';
import { useSettings } from '@/contexts/SettingsContext';
import { apiClient, Service, GalleryImage } from '@/lib/api';

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
  const { getSetting, isLoading } = useSettings();
  const [services, setServices] = useState<Service[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    // Fetch services for preview
    apiClient.getServices().then((data) => {
      setServices(data.slice(0, 3));
    }).catch(console.error);

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
              <div className="aspect-[4/5] rounded-card overflow-hidden shadow-elegant">
                <EditableImage
                  settingKey="about_image"
                  fallback="/images/about-artist.png"
                  alt="About CreativeMicroInk"
                  fill
                  className="object-cover object-top"
                  containerClassName="relative w-full h-full"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-card -z-10" />
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
                  <span className="font-medium">5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-dark">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">1000+ Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
            <EditableText
              settingKey="services_title"
              fallback="Our Signature Services"
              as="h2"
              className="section-title"
            />
            <EditableText
              settingKey="services_subtitle"
              fallback="Discover our range of professional permanent makeup services designed to enhance your natural beauty"
              as="p"
              className="section-subtitle"
            />
          </div>

          <div className="services-grid stagger-fade-in">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard key={service.id} service={service} showBookButton />
              ))
            ) : (
              // Skeleton loading state
              [...Array(3)].map((_, i) => (
                <div key={i} className="card">
                  <div className="skeleton h-48 mb-4" />
                  <div className="skeleton h-6 w-3/4 mb-2" />
                  <div className="skeleton h-4 w-full mb-4" />
                  <div className="skeleton h-4 w-1/2" />
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              {getSetting('services_cta_text', 'Explore All Services')}
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
