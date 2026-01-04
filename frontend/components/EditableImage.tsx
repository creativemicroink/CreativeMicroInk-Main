'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';

interface EditableImageProps {
  settingKey: string;
  fallback?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  unoptimized?: boolean;
}

export default function EditableImage({
  settingKey,
  fallback = '',
  alt,
  className = '',
  containerClassName = '',
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  quality = 85,
  unoptimized = false,
}: EditableImageProps) {
  const { isAdmin } = useAuth();
  const { getSetting, uploadImage } = useSettings();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageUrl = getSetting(settingKey, fallback);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      await uploadImage(settingKey, file);

      clearInterval(progressInterval);
      setUploadProgress(100);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);

      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    if (isAdmin && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isAdmin && e.key === 'Enter' && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Build image props
  const imageProps = fill
    ? { fill: true, sizes: sizes || '100vw' }
    : { width: width || 800, height: height || 600 };

  return (
    <div
      className={`relative ${containerClassName} ${isAdmin ? 'editable group cursor-pointer' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isAdmin ? 'button' : undefined}
      tabIndex={isAdmin ? 0 : undefined}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          priority={priority}
          quality={quality}
          unoptimized={unoptimized}
          className={`${className} ${fill ? 'object-cover' : ''}`}
          {...imageProps}
        />
      ) : (
        <div
          className={`bg-cream-200 flex items-center justify-center ${className}`}
          style={!fill ? { width: width || 800, height: height || 600 } : undefined}
        >
          <div className="text-center text-muted p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">No image</span>
          </div>
        </div>
      )}

      {isAdmin && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload image"
          />

          {/* Edit overlay */}
          {!isUploading && (
            <div className="image-edit-overlay rounded-inherit">
              <div className="text-white text-center">
                <svg
                  className="w-8 h-8 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">Click to change image</span>
              </div>
            </div>
          )}

          {/* Upload progress overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50 rounded-inherit">
              <div className="w-3/4 max-w-xs h-2 bg-white/20 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gold transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-white text-sm font-medium">
                {uploadProgress < 100 ? 'Uploading...' : 'Done!'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
