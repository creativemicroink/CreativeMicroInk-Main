import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminEditBar from '@/components/AdminEditBar';
import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CreativeMicroInk - Luxury Permanent Makeup',
  description:
    'Experience the art of luxury permanent makeup. Expert microblading, powder brows, and lip blushing services. Wake up beautiful every day.',
  keywords: [
    'permanent makeup',
    'microblading',
    'powder brows',
    'lip blush',
    'eyebrow tattoo',
    'PMU',
    'luxury beauty',
  ],
  openGraph: {
    title: 'CreativeMicroInk - Luxury Permanent Makeup',
    description: 'Expert microblading, powder brows, and lip blushing services.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <SettingsProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <AdminEditBar />
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
