'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiClient, GalleryImage } from '@/lib/api';

// Fallback gallery data with beauty stock images
const fallbackImages: GalleryImage[] = [
  // Brows - Beauty portraits showing eyebrows
  { id: '1', url: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800&q=80', category: 'brows', alt: 'Powder Brows', order: 1 },
  { id: '2', url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80', category: 'brows', alt: 'Ombre Brows', order: 2 },
  { id: '3', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80', category: 'brows', alt: 'Microblading', order: 3 },
  { id: '4', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', category: 'brows', alt: 'Combo Brows', order: 4 },
  { id: '5', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', category: 'brows', alt: 'Brow Lamination', order: 5 },
  { id: '6', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', category: 'brows', alt: 'Microshading', order: 6 },
  // Lips - Lip beauty shots
  { id: '7', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80', category: 'lips', alt: 'Lip Blushing', order: 7 },
  { id: '8', url: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=800&q=80', category: 'lips', alt: 'Natural Lip Color', order: 8 },
  { id: '9', url: 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=800&q=80', category: 'lips', alt: 'Lip Enhancement', order: 9 },
  // Lashes - Eye/lash beauty shots
  { id: '10', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', category: 'lashes', alt: 'Lash Lift & Tint', order: 10 },
  { id: '11', url: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80', category: 'lashes', alt: 'Natural Lash Enhancement', order: 11 },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await apiClient.getGalleryImages();
        if (data && data.length > 0) {
          setImages(data);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Use fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories: string[] = ['all', ...Array.from(new Set(images.map((img) => img.category).filter((c): c is string => Boolean(c))))];

  const filteredImages = filter === 'all'
    ? images
    : images.filter((img) => img.category === filter);

  const sortedImages = [...filteredImages].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="bg-cream min-h-screen pt-24">
      <div className="container-main py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-dark mb-4">Our Work</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Browse through our portfolio of permanent makeup transformations.
            Each result showcases our commitment to enhancing natural beauty.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                filter === category
                  ? 'bg-gold text-dark shadow-lg'
                  : 'bg-white text-dark hover:bg-gold/10 shadow-elegant'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
            <p className="text-muted mt-4">Loading gallery...</p>
          </div>
        ) : sortedImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted">No images found in this category.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {sortedImages.map((image) => (
              <div
                key={image.id}
                className="card p-0 overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square bg-gray-200">
                  {image.url.startsWith('/placeholder') ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-accent/20 to-cream">
                      <span className="text-muted text-sm">{image.alt || 'Gallery Image'}</span>
                    </div>
                  ) : (
                    <Image
                      src={image.url}
                      alt={image.alt || 'Gallery image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                {image.category && (
                  <div className="p-3">
                    <span className="text-xs text-muted uppercase tracking-wide">
                      {image.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gold transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative aspect-square bg-white rounded-card overflow-hidden">
              {selectedImage.url.startsWith('/placeholder') ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-accent/20 to-cream">
                  <span className="text-muted">{selectedImage.alt || 'Gallery Image'}</span>
                </div>
              ) : (
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || 'Gallery image'}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}
            </div>
            {selectedImage.alt && (
              <p className="text-white text-center mt-4">{selectedImage.alt}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
