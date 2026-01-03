'use client';

import { useState, useEffect } from 'react';
import ServiceCard from '@/components/ServiceCard';
import { apiClient, Service } from '@/lib/api';

// Fallback services data
const fallbackServices: Service[] = [
  {
    id: '1',
    name: 'Powder Brows',
    description: 'Soft, filled-in, makeup-like look.',
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
    description: 'Gradient brow from light to dark.',
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
    description: 'Soft, powdered effect using tiny dots.',
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
    description: 'Hair-like strokes for fuller brows.',
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
    description: 'Blend of strokes and shading with ombre tail.',
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
    description: 'Enhances color, symmetry, and fullness.',
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
    description: 'Corrects faded or discolored pigment.',
    price: 160,
    duration: 60,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '8',
    name: 'Brow Lamination',
    description: 'Fuller, groomed brow lasting 4-6 weeks.',
    price: 90,
    duration: 60,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
  {
    id: '9',
    name: 'Lash Lift & Tint',
    description: 'Curls, lifts, and darkens natural lashes.',
    price: 110,
    duration: 60,
    imageUrl: '',
    category: 'lashes',
    isActive: true,
  },
  {
    id: '10',
    name: 'Brow Wax',
    description: 'Precise hair removal for brow shaping.',
    price: 20,
    duration: 15,
    imageUrl: '',
    category: 'brows',
    isActive: true,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiClient.getServices();
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Use fallback data
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

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-main py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">Services & Pricing</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Professional permanent makeup services to enhance your natural beauty.
            All prices include initial consultation and aftercare instructions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-card transition-colors ${
                filter === category
                  ? 'bg-rose-accent text-white'
                  : 'bg-white text-dark hover:bg-rose-accent/10'
              }`}
            >
              {category === 'all' ? 'All Services' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-accent mx-auto"></div>
            <p className="text-muted mt-4">Loading services...</p>
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} showBookButton />
            ))}
          </div>
        )}

        {/* Promotions Section */}
        <section className="mt-16">
          <h2 className="section-title text-center">Current Promotions</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="card bg-rose-accent/10 border border-rose-accent/20">
              <span className="font-semibold text-dark">Black Friday:</span>
              <span className="ml-2 text-muted">You & Friend Brows - $400</span>
            </div>
            <div className="card bg-rose-accent/10 border border-rose-accent/20">
              <span className="font-semibold text-dark">Black Friday:</span>
              <span className="ml-2 text-muted">Brows + Lip Blush - $400</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
