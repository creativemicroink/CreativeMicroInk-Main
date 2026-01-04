'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/booking', label: 'Book Now' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { isAdmin, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render header on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-elegant' : ''
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-serif font-bold tracking-wide text-dark group-hover:text-gold transition-colors">
              Creative
            </span>
            <span className="text-2xl font-serif font-light tracking-wide text-gold">
              MicroInk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors text-gold hover:text-gold-dark after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${
                  pathname === link.href ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth/CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {!isLoading && (
              isAdmin ? (
                <button
                  onClick={logout}
                  className="text-sm font-medium text-muted hover:text-dark transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted hover:text-dark transition-colors"
                >
                  Admin
                </Link>
              )
            )}
            <Link
              href="/booking"
              className="btn-primary text-sm py-2.5 px-6"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-dark transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-elegant p-4 mt-2">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 px-4 rounded-lg text-sm font-medium tracking-wide uppercase transition-all text-gold hover:text-gold-dark ${
                      pathname === link.href
                        ? 'bg-gold/10 border-l-2 border-gold'
                        : 'hover:bg-cream'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-gray-100 my-3" />

                {!isLoading && (
                  isAdmin ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="py-3 px-4 text-left text-sm font-medium text-muted hover:text-dark transition-colors"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-4 text-sm font-medium text-muted hover:text-dark transition-colors"
                    >
                      Admin Login
                    </Link>
                  )
                )}

                <Link
                  href="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-center text-sm mt-2"
                >
                  Book Appointment
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
