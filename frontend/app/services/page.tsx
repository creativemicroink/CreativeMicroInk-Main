'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import { apiClient, Service } from '@/lib/api';
import { useSettings } from '@/contexts/SettingsContext';
import EditableText from '@/components/EditableText';

// Fallback services data
const fallbackServices: Service[] = [
  {
    id: '1',
    name: 'Powder Brows',
    description: 'Soft, filled-in, makeup-like look that gives you perfectly defined brows every day.',
    price: 380,
    touchUpPrice: 150,
    duration: 120,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '2',
    name: 'Ombre Brows',
    description: 'Beautiful gradient effect from light to dark for a natural, dimensional look.',
    price: 425,
    touchUpPrice: 100,
    duration: 120,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '3',
    name: 'Microshading',
    description: 'Soft, powdered effect using tiny dots for a subtle, natural enhancement.',
    price: 380,
    touchUpPrice: 125,
    duration: 120,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '4',
    name: 'Microblading / Nano Brows',
    description: 'Ultra-fine hair-like strokes for the most natural-looking fuller brows.',
    price: 450,
    touchUpPrice: 100,
    duration: 150,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '5',
    name: 'Combo Brows',
    description: 'The best of both worlds - hair strokes with shading and ombre tail.',
    price: 450,
    touchUpPrice: 100,
    duration: 150,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '6',
    name: 'Lip Blushing',
    description: 'Enhance your natural lip color, symmetry, and fullness for perfect lips.',
    price: 400,
    touchUpPrice: 125,
    duration: 120,
    imageUrl: '',
    category: 'lips',
    isActive: true,
  },
  {
    id: '7',
    name: 'Microblading Removal',
    description: 'Safe correction of faded or discolored pigment from previous work.',
    price: 160,
    duration: 60,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '8',
    name: 'Brow Lamination',
    description: 'Fuller, perfectly groomed brows lasting 4-6 weeks without daily styling.',
    price: 90,
    duration: 60,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '9',
    name: 'Lash Lift & Tint',
    description: 'Curls, lifts, and darkens your natural lashes for weeks of beauty.',
    price: 110,
    duration: 60,
    imageUrl: '',
    category: 'lashes',
    isActive: true,
  },
  {
    id: '10',
    name: 'Brow Wax',
    description: 'Precise hair removal and expert shaping for perfectly defined brows.',
    price: 20,
    duration: 15,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
];

// Popular service IDs for featured badges
const popularServices = ['4', '6', '5'];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const { getSetting } = useSettings();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiClient.getServices();
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories: string[] = ['all', ...Array.from(new Set(services.map((s) => s.category).filter((c): c is string => Boolean(c))))];

  const filteredServices = filter === 'all'
    ? services.filter(s => s.isActive !== false)
    : services.filter(s => s.category === filter && s.isActive !== false);

  const categoryLabels: Record<string, string> = {
    all: 'All Services',
    brows: 'Brows',
    lips: 'Lips',
    lashes: 'Lashes',
  };

  const categoryIcons: Record<string, JSX.Element> = {
    all: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    brows: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12c2-4 6-6 10-6s8 2 10 6" />
      </svg>
    ),
    lips: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18c-4 0-7-2-7-4s3-4 7-4 7 2 7 4-3 4-7 4z" />
      </svg>
    ),
    lashes: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12h4M18 12h4M12 2v4M12 18v4" />
      </svg>
    ),
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={getSetting('services_hero_image', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80')}
          alt="Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-cream" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 bg-gold/20 text-gold text-sm font-medium uppercase tracking-widest rounded-full mb-6">
            Our Services
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            <EditableText
              settingKey="services_title"
              fallback="Luxury Beauty Services"
              as="span"
            />
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            <EditableText
              settingKey="services_subtitle"
              fallback="Transform your look with our professional permanent makeup artistry. All services include consultation and premium aftercare."
              as="span"
            />
          </p>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="bg-gradient-to-r from-gold-dark via-gold to-gold-light py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="container-main relative">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span className="text-dark font-serif text-xl font-semibold">Limited Time Offers</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-dark/20" />
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-white/90 text-dark rounded-full text-sm font-medium shadow-md">
                You & Friend Brows - $400
              </span>
              <span className="px-4 py-2 bg-white/90 text-dark rounded-full text-sm font-medium shadow-md">
                Brows + Lip Blush - $400
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-main py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gold text-dark shadow-lg shadow-gold/30'
                  : 'bg-white text-dark hover:bg-gold/10 shadow-elegant'
              }`}
            >
              {categoryIcons[category]}
              {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
            <p className="text-muted mt-4">Loading services...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showBookButton
                featured={popularServices.includes(service.id)}
              />
            ))}
          </div>
        )}

        {filteredServices.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">No services found in this category.</p>
          </div>
        )}
      </section>

      {/* Pricing Note */}
      <section className="bg-white py-12">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-serif text-2xl text-dark mb-4">What&apos;s Included</h3>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-dark">Free Consultation</h4>
                <p className="text-sm text-muted">Discuss your goals and design your perfect look</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-dark">Premium Products</h4>
                <p className="text-sm text-muted">Only the highest quality pigments and tools</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-dark">Aftercare Kit</h4>
                <p className="text-sm text-muted">Complete aftercare instructions and products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark py-16">
        <div className="container-main text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Book your consultation today and take the first step towards effortless beauty.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4"
          >
            Book Your Appointment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
