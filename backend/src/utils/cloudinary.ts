import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import type { UploadApiOptions } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

// Resource type for Cloudinary v2.x (compatible with API expectations)
type CloudinaryResourceType = 'image' | 'video' | 'raw' | 'auto';

// Configure Cloudinary with v2.x API
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Upload options interface
export interface UploadOptions {
  folder?: string;
  publicId?: string;
  transformation?: object[];
  resourceType?: CloudinaryResourceType;
  overwrite?: boolean;
  tags?: string[];
  eager?: object[];
}

// Upload result interface
export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  thumbnailUrl?: string;
  eagerUrls?: string[];
}

// Delete result interface for v2.x API
export interface DeleteResult {
  result: 'ok' | 'not found';
}

/**
 * Upload an image to Cloudinary using v2.x Promise-based API
 * Automatically generates thumbnails via eager transformations
 * @param file - File buffer or base64 string or file path
 * @param options - Upload options
 */
export async function uploadImage(
  file: Buffer | string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  // Build upload options for Cloudinary v2.x
  const uploadOptions: UploadApiOptions = {
    folder: options.folder || 'creative-micro',
    public_id: options.publicId,
    transformation: options.transformation,
    resource_type: options.resourceType || 'image',
    overwrite: options.overwrite ?? true,
    tags: options.tags,
    // Eager transformations for automatic thumbnail generation
    eager: options.eager || [
      { width: 300, height: 300, crop: 'fill', quality: 'auto', format: 'auto' },
    ],
    eager_async: false, // Generate thumbnails synchronously
  };

  // Determine the upload source
  let uploadSource: string;

  if (Buffer.isBuffer(file)) {
    // Convert buffer to base64 data URI
    const base64 = file.toString('base64');
    uploadSource = 'data:image/jpeg;base64,' + base64;
  } else {
    uploadSource = file;
  }

  try {
    // Use Promise-based API (v2.x) - no callback needed
    const result: UploadApiResponse = await cloudinary.uploader.upload(uploadSource, uploadOptions);

    // Generate thumbnail URL using the URL helper as fallback
    const thumbnailUrl = cloudinary.url(result.public_id, {
      width: 300,
      height: 300,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      secure: true,
    });

    // Extract eager transformation URLs if available (preferred over generated URL)
    const eagerUrls = result.eager?.map((e: { secure_url: string }) => e.secure_url) || [];

    return {
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resourceType: result.resource_type,
      // Use eager-generated thumbnail if available, otherwise use generated URL
      thumbnailUrl: eagerUrls[0] || thumbnailUrl,
      eagerUrls,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    const message = error instanceof Error ? error.message : 'Failed to upload image';
    throw new Error(message);
  }
}

/**
 * Upload multiple images to Cloudinary
 * Uses Promise.all for parallel uploads
 */
export async function uploadMultipleImages(
  files: (Buffer | string)[],
  options: UploadOptions = {}
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadImage(file, options));
  return Promise.all(uploadPromises);
}

/**
 * Delete an image from Cloudinary using v2.x Promise-based API
 * @param publicId - The public ID of the image to delete
 * @returns true if deleted successfully, false if not found
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    // Use Promise-based API (v2.x) - no callback needed
    const result = await cloudinary.uploader.destroy(publicId) as DeleteResult;
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * Delete multiple images from Cloudinary
 * Uses Promise.allSettled to handle partial failures gracefully
 */
export async function deleteMultipleImages(publicIds: string[]): Promise<boolean[]> {
  const deletePromises = publicIds.map((id) => deleteImage(id));
  const results = await Promise.allSettled(deletePromises);
  return results.map((result) => result.status === 'fulfilled' && result.value);
}

/**
 * Generate a transformed image URL
 * @param publicId - The public ID of the image
 * @param transformations - Cloudinary transformation options
 */
export function getTransformedUrl(
  publicId: string,
  transformations: object
): string {
  return cloudinary.url(publicId, {
    ...transformations,
    secure: true,
  });
}

/**
 * Generate a thumbnail URL with customizable dimensions
 * @param publicId - The public ID of the image
 * @param width - Thumbnail width (default: 300)
 * @param height - Thumbnail height (default: 300)
 */
export function getThumbnailUrl(
  publicId: string,
  width: number = 300,
  height: number = 300
): string {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    secure: true,
  });
}

/**
 * Extract public ID from Cloudinary URL
 * Handles both versioned and non-versioned URLs
 * @param url - Full Cloudinary URL
 * @returns The public ID or null if extraction fails
 */
export function extractPublicId(url: string): string | null {
  try {
    // Match pattern: /upload/v{version}/{folder}/{publicId}.{ext}
    // Also handles URLs without version number
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Test Cloudinary connection without uploading
 * Uses the Admin API ping endpoint
 * @returns true if connection is successful
 */
export async function testConnection(): Promise<boolean> {
  try {
    const result = await cloudinary.api.ping();
    console.log('Cloudinary connection test successful:', result);
    return true;
  } catch (error) {
    console.error('Cloudinary connection test failed:', error);
    return false;
  }
}

/**
 * Get Cloudinary configuration status (without exposing secrets)
 * Useful for debugging configuration issues
 */
export function getConfigStatus(): {
  configured: boolean;
  cloudName: string | undefined;
  hasApiKey: boolean;
  hasApiSecret: boolean;
} {
  const config = cloudinary.config();
  return {
    configured: !!(config.cloud_name && config.api_key && config.api_secret),
    cloudName: config.cloud_name,
    hasApiKey: !!config.api_key,
    hasApiSecret: !!config.api_secret,
  };
}

/**
 * Get account usage information
 * Requires Admin API access
 */
export async function getUsage(): Promise<{
  used: number;
  limit: number;
  usedPercent: number;
} | null> {
  try {
    const result = await cloudinary.api.usage();
    return {
      used: result.credits?.used || 0,
      limit: result.credits?.limit || 0,
      usedPercent: result.credits?.used_percent || 0,
    };
  } catch (error) {
    console.error('Failed to get Cloudinary usage:', error);
    return null;
  }
}

export default cloudinary;
