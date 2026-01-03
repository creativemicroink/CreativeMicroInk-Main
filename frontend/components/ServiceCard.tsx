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
  };
  showBookButton?: boolean;
}

export default function ServiceCard({ service, showBookButton = false }: ServiceCardProps) {
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="card group">
      {/* Image */}
      {service.imageUrl && (
        <div className="relative h-48 -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-card">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-dark mb-2 group-hover:text-rose-accent transition-colors">
          {service.name}
        </h3>

        <p className="text-sm text-muted mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Pricing */}
        <div className="space-y-1 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-rose-accent">${service.price}</span>
            <span className="text-sm text-muted">initial</span>
          </div>
          {service.touchUpPrice && (
            <div className="text-sm text-muted">
              Touch-up: ${service.touchUpPrice}+
            </div>
          )}
        </div>

        {/* Duration */}
        {service.duration && (
          <div className="flex items-center gap-1 text-sm text-muted mb-4">
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
            className="btn-primary w-full text-center block text-sm py-2"
          >
            Book {service.name}
          </Link>
        )}
      </div>
    </div>
  );
}
