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

      {/* Special Offers Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-gold/10 text-gold text-sm font-medium uppercase tracking-widest rounded-full mb-4">
              Limited Time
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">Special Offers</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Take advantage of our exclusive deals and save on your beauty transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Deal 1 - Brows + Friend */}
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
                <h3 className="font-serif text-2xl text-dark mb-2">Brows + Friend</h3>
                <p className="text-muted mb-4">Both you and a friend receive a brow style of your choice, for one bundled price!</p>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gold">$400</span>
              </div>
              <p className="text-sm text-muted mb-6">2 hr appointment</p>
              <Link href="/booking" className="block w-full text-center py-3 bg-dark text-white rounded-xl hover:bg-gold hover:text-dark transition-all font-medium">
                Book Together
              </Link>
            </div>

            {/* Deal 2 - Brows & Lip Blush */}
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
                <h3 className="font-serif text-2xl text-dark mb-2">Brows & Lip Blush</h3>
                <p className="text-muted mb-4">Your choice of brows plus lip blush - complete your look in one session!</p>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-rose-500">$400</span>
              </div>
              <p className="text-sm text-muted mb-6">2 hr appointment</p>
              <Link href="/booking" className="block w-full text-center py-3 bg-dark text-white rounded-xl hover:bg-rose-500 transition-all font-medium">
                Get the Combo
              </Link>
            </div>

            {/* Deal 3 - Removal Special */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-8 border-2 border-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold uppercase rounded-full">
                  Save More
                </span>
              </div>
              <div className="mb-6">
                <div className="w-16 h-16 bg-purple-200/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-dark mb-2">Removal Special</h3>
                <p className="text-muted mb-4">Safe correction of faded or discolored pigment. Buy 5 sessions and save!</p>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-purple-500">$125</span>
                <span className="text-muted">/session</span>
              </div>
              <p className="text-sm text-muted mb-6">1 hr appointment | 5 for $500</p>
              <Link href="/booking" className="block w-full text-center py-3 bg-dark text-white rounded-xl hover:bg-purple-500 transition-all font-medium">
                Book Removal
              </Link>
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
