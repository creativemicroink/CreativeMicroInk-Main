'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { apiClient, GalleryImage } from '@/lib/api';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['brows', 'lips', 'lashes', 'other'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await apiClient.getGalleryImages();
      setImages(data.sort((a: GalleryImage, b: GalleryImage) => (a.order || 0) - (b.order || 0)));
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('category', 'brows');
        formData.append('alt', file.name.replace(/\.[^/.]+$/, ''));

        const newImage = await apiClient.uploadGalleryImage(formData);
        setImages((prev) => [...prev, newImage]);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await apiClient.deleteGalleryImage(id);
      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
  };

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      const updated = await apiClient.updateGalleryImage(editingImage.id, {
        category: editingImage.category,
        alt: editingImage.alt,
        order: editingImage.order,
      });
      setImages(images.map((img) => (img.id === editingImage.id ? updated : img)));
      setEditingImage(null);
    } catch (err) {
      console.error('Error updating image:', err);
      setError('Failed to update image');
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const index = images.findIndex((img) => img.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;

    const newImages = [...images];
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];

    // Update order values
    const updatedImages = newImages.map((img, i) => ({ ...img, order: i }));
    setImages(updatedImages);

    // Persist to backend
    try {
      await Promise.all(
        updatedImages.map((img) =>
          apiClient.updateGalleryImage(img.id, { order: img.order })
        )
      );
    } catch (err) {
      console.error('Error reordering images:', err);
      // Revert on error
      fetchImages();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Gallery</h1>
          <p className="text-muted mt-1">Manage your portfolio images</p>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Images
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-card flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="card max-w-md w-full">
            <h2 className="text-xl font-semibold text-dark mb-4">Edit Image</h2>
            <form onSubmit={handleUpdateImage} className="space-y-4">
              <div>
                <label className="label-text">Alt Text</label>
                <input
                  type="text"
                  value={editingImage.alt || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  className="input-field"
                  placeholder="Describe this image"
                />
              </div>
              <div>
                <label className="label-text">Category</label>
                <select
                  value={editingImage.category || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-accent mx-auto"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-muted">No images in gallery. Upload your first image!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="card p-0 overflow-hidden group">
              <div className="relative aspect-square bg-gray-200">
                {image.url.startsWith('/placeholder') ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-accent/20 to-cream">
                    <span className="text-muted text-sm">{image.alt || 'Image'}</span>
                  </div>
                ) : (
                  <Image
                    src={image.url}
                    alt={image.alt || 'Gallery image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleReorder(image.id, 'up')}
                    disabled={index === 0}
                    className="p-2 bg-white rounded-full text-dark hover:bg-gray-100 disabled:opacity-50"
                    title="Move up"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-2 bg-white rounded-full text-dark hover:bg-gray-100"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleReorder(image.id, 'down')}
                    disabled={index === images.length - 1}
                    className="p-2 bg-white rounded-full text-dark hover:bg-gray-100 disabled:opacity-50"
                    title="Move down"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-3">
                <p className="text-sm text-dark truncate">{image.alt || 'Untitled'}</p>
                {image.category && (
                  <span className="text-xs text-muted">{image.category}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
