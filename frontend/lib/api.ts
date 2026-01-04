import { getToken } from './auth';

// Build API URL - ensure it always ends with /api
function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!envUrl) {
    return 'http://localhost:3001/api';
  }

  // Remove trailing slash if present
  let baseUrl = envUrl.replace(/\/$/, '');

  // Ensure /api is at the end
  if (!baseUrl.endsWith('/api')) {
    baseUrl = baseUrl + '/api';
  }

  return baseUrl;
}

const API_BASE_URL = getApiBaseUrl();

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  touchUpPrice?: number;
  duration?: number;
  imageUrl?: string;
  category?: string;
  isActive?: boolean;
  squareBookingUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category?: string;
  alt?: string;
  order?: number;
  createdAt?: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface SiteSettings {
  [key: string]: string;
}

export interface SettingsResponse {
  settings: SiteSettings;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = {
        message: 'An error occurred',
        status: response.status,
      };

      try {
        const data = await response.json();
        error.message = data.message || data.error || error.message;
      } catch {
        // Use default error message
      }

      throw error;
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text);
  }

  // Auth
  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Services
  async getServices(): Promise<Service[]> {
    return this.request<Service[]>('/services');
  }

  async getService(id: string): Promise<Service> {
    return this.request<Service>(`/services/${id}`);
  }

  async createService(data: Omit<Service, 'id'>): Promise<Service> {
    return this.request<Service>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: Partial<Service>): Promise<Service> {
    return this.request<Service>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Gallery
  async getGalleryImages(): Promise<GalleryImage[]> {
    return this.request<GalleryImage[]>('/gallery');
  }

  async uploadGalleryImage(formData: FormData): Promise<GalleryImage> {
    const token = getToken();

    const headers: HeadersInit = {};
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/gallery`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error: ApiError = {
        message: 'Failed to upload image',
        status: response.status,
      };
      throw error;
    }

    return response.json();
  }

  async updateGalleryImage(
    id: string,
    data: Partial<GalleryImage>
  ): Promise<GalleryImage> {
    return this.request<GalleryImage>(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGalleryImage(id: string): Promise<void> {
    return this.request<void>(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderGalleryImages(imageIds: string[]): Promise<GalleryImage[]> {
    return this.request<GalleryImage[]>('/gallery/reorder', {
      method: 'POST',
      body: JSON.stringify({ imageIds }),
    });
  }

  // Settings
  async getSettings(): Promise<SiteSettings> {
    const response = await this.request<SettingsResponse>('/settings');
    return response.settings;
  }

  async updateSetting(key: string, value: string): Promise<void> {
    await this.request('/settings', {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    });
  }

  async updateSettings(settings: Record<string, string>): Promise<void> {
    await this.request('/settings/bulk', {
      method: 'PUT',
      body: JSON.stringify({ settings }),
    });
  }

  async uploadSettingImage(settingKey: string, file: File): Promise<{ imageUrl: string }> {
    const token = getToken();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('settingKey', settingKey);

    const headers: HeadersInit = {};
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/settings/upload-image`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
