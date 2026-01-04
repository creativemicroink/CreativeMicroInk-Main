import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxurious cream palette
        cream: {
          DEFAULT: '#FAF8F5',
          50: '#FFFFFF',
          100: '#FAF8F5',
          200: '#F5F0E8',
          300: '#EDE5D8',
          400: '#E5DAC8',
        },
        // Gold/Champagne accents (luxury feel)
        gold: {
          DEFAULT: '#C9A962',
          light: '#D4BC7D',
          dark: '#B8944A',
          muted: '#D4C4A0',
          50: '#FBF8F0',
          100: '#F5EDD8',
          200: '#EBDBB1',
          300: '#E0C88A',
          400: '#D4BC7D',
          500: '#C9A962',
          600: '#B8944A',
          700: '#9A7A3D',
          800: '#7C6231',
          900: '#5E4A25',
        },
        // Keep rose-accent for backward compatibility (maps to gold)
        rose: {
          accent: '#C9A962',
          light: '#D4BC7D',
          dark: '#B8944A',
        },
        // Refined dark tones
        dark: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
          lighter: '#4A4A4A',
        },
        // Sophisticated muted tones
        muted: {
          DEFAULT: '#8B8B8B',
          light: '#A8A8A8',
          dark: '#6B6B6B',
        },
      },
      fontFamily: {
        // Elegant serif for headings
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        // Clean sans-serif for body
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['2.25rem', { lineHeight: '1.25' }],
        'heading-3': ['1.875rem', { lineHeight: '1.3' }],
        'heading-4': ['1.5rem', { lineHeight: '1.35' }],
      },
      borderRadius: {
        'card': '16px',
        'soft': '8px',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'elegant-hover': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'gold': '0 4px 20px rgba(201, 169, 98, 0.15)',
        'gold-hover': '0 8px 30px rgba(201, 169, 98, 0.25)',
        'card': '0 6px 18px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
      },
      maxWidth: {
        'container': '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A962 0%, #D4BC7D 100%)',
        'gradient-cream': 'linear-gradient(180deg, #FAF8F5 0%, #F5F0E8 100%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
