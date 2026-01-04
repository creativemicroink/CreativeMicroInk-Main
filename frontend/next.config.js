/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Image optimization configuration
  images: {
    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Image formats to generate
    formats: ['image/avif', 'image/webp'],
    // Minimum cache TTL for optimized images (in seconds)
    minimumCacheTTL: 60,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for next/image component
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['react', 'react-dom'],
  },

  // Custom headers for security and caching
  async headers() {
    return [
      {
        // Security headers for all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Cache fonts for a year
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [];
  },

  // Rewrites (useful for API proxying during development)
  async rewrites() {
    // Only apply rewrites in development or when API URL is different domain
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

    // If API is on a different domain, we might want to proxy requests
    // This helps avoid CORS issues during development
    if (process.env.NODE_ENV === 'development') {
      return [
        // Uncomment to enable API proxying in development
        // {
        //   source: '/api/proxy/:path*',
        //   destination: `${apiUrl}/:path*`,
        // },
      ];
    }

    return [];
  },

  // Turbopack configuration (Next.js 16+ default)
  turbopack: {},

  // Output configuration for deployment
  output: 'standalone',

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

module.exports = nextConfig;
