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
        cream: {
          DEFAULT: '#FAF7F2',
          50: '#FFFFFF',
          100: '#FAF7F2',
          200: '#F5EDE3',
          300: '#EDE0CF',
          400: '#E5D3BB',
        },
        rose: {
          accent: '#D4A574',
          light: '#E5C4A8',
          dark: '#B88A5D',
        },
        dark: {
          DEFAULT: '#2D2D2D',
          light: '#4A4A4A',
          lighter: '#6A6A6A',
        },
        muted: {
          DEFAULT: '#9B9B9B',
          light: '#B5B5B5',
          dark: '#7A7A7A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card': '0 6px 18px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
        'promo': '0 6px 18px rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
