'use client';

import Link from 'next/link';

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

// Category-specific colors and icons
const categoryStyles: Record<string, { gradient: string; border: string; accent: string; icon: JSX.Element }> = {
  brows: {
    gradient: 'from-gold/5 to-gold/10',
    border: 'border-gold/20 hover:border-gold/40',
    accent: 'text-gold bg-gold/20',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12c2-4 6-6 10-6s8 2 10 6M4 10c1-2 3-3.5 5-4M15 6c2 .5 4 2 5 4" />
      </svg>
    ),
  },
  lips: {
    gradient: 'from-rose-50 to-rose-100/50',
    border: 'border-rose-200/50 hover:border-rose-300',
    accent: 'text-rose-500 bg-rose-200/50',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  lashes: {
    gradient: 'from-purple-50 to-purple-100/50',
    border: 'border-purple-200/50 hover:border-purple-300',
    accent: 'text-purple-500 bg-purple-200/50',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12h4M18 12h4M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  default: {
    gradient: 'from-amber-50 to-amber-100/50',
    border: 'border-amber-200/50 hover:border-amber-300',
    accent: 'text-amber-600 bg-amber-200/50',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
};

export default function ServiceCard({ service, showBookButton = false, featured = false }: ServiceCardProps) {
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const styles = categoryStyles[service.category || 'default'] || categoryStyles.default;
  const accentColor = service.category === 'lips' ? 'text-rose-500' : service.category === 'lashes' ? 'text-purple-500' : 'text-gold';
  const buttonHover = service.category === 'lips' ? 'hover:bg-rose-500' : service.category === 'lashes' ? 'hover:bg-purple-500' : 'hover:bg-gold hover:text-dark';

  return (
    <div
      className={`group relative bg-gradient-to-br ${styles.gradient} rounded-2xl p-6 border-2 ${styles.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-gold text-dark text-xs font-bold uppercase rounded-full">
            Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="mb-5">
        <div className={`w-14 h-14 ${styles.accent} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {styles.icon}
        </div>
      </div>

      {/* Service Name */}
      <h3 className="font-serif text-xl text-dark mb-2">{service.name}</h3>

      {/* Description */}
      <p className="text-muted text-sm mb-4 line-clamp-2">{service.description}</p>

      {/* Price & Duration */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className={`text-3xl font-bold ${accentColor}`}>${service.price}</span>
        {service.touchUpPrice && (
          <span className="text-sm text-muted">
            Touch-up: ${service.touchUpPrice}
          </span>
        )}
      </div>

      {/* Duration */}
      {service.duration && (
        <div className="flex items-center gap-2 text-sm text-muted mb-5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{formatDuration(service.duration)}</span>
        </div>
      )}

      {/* Book Button */}
      {showBookButton && (
        <Link
          href="/booking"
          className={`block w-full text-center py-3 bg-dark text-white rounded-xl ${buttonHover} transition-all font-medium`}
        >
          Book Now
        </Link>
      )}
    </div>
  );
}
