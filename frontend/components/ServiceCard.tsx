'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    touchUpPrice?: number;
    duration?: number;
    imageUrl?: string;
    category?: string;
  };
  showBookButton?: boolean;
  featured?: boolean;
}

// Category-specific placeholder images
const categoryImages: Record<string, string> = {
  brows: 'https://images.unsplash.com/photo-1594476664682-a45e77bb6758?w=600&q=80',
  lips: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&q=80',
  lashes: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80',
  default: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
};

export default function ServiceCard({ service, showBookButton = false, featured = false }: ServiceCardProps) {
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getPlaceholderImage = () => {
    if (service.imageUrl) return service.imageUrl;
    return categoryImages[service.category || 'default'] || categoryImages.default;
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${
        featured
          ? 'shadow-xl hover:shadow-2xl'
          : 'shadow-elegant hover:shadow-xl'
      } hover:-translate-y-1`}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={getPlaceholderImage()}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Category Badge */}
        {service.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-dark text-xs font-medium uppercase tracking-wider rounded-full">
              {service.category}
            </span>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-4 py-2 bg-gold text-dark font-bold rounded-full shadow-lg">
            ${service.price}
          </div>
        </div>

        {/* Service Name on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-serif font-semibold text-white drop-shadow-lg">
            {service.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-muted leading-relaxed mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Details Row */}
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
          {/* Duration */}
          {service.duration && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatDuration(service.duration)}</span>
            </div>
          )}

          {/* Touch-up Price */}
          {service.touchUpPrice && (
            <div className="text-sm">
              <span className="text-muted">Touch-up:</span>
              <span className="ml-1 font-semibold text-dark">${service.touchUpPrice}</span>
            </div>
          )}
        </div>

        {/* Book Button */}
        {showBookButton && (
          <Link
            href="/booking"
            className="block w-full text-center py-3 px-6 bg-dark text-white font-medium rounded-xl transition-all duration-300 hover:bg-gold hover:text-dark group-hover:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              Book Now
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        )}
      </div>

      {/* Featured Indicator */}
      {featured && (
        <div className="absolute -top-1 -right-1 w-20 h-20 overflow-hidden">
          <div className="absolute top-4 right-[-35px] w-[150px] transform rotate-45 bg-gold text-dark text-xs font-bold text-center py-1 shadow-md">
            POPULAR
          </div>
        </div>
      )}
    </div>
  );
}
