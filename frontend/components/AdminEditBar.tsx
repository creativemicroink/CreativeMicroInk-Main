'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminEditBar() {
  const { isAdmin, isLoading, logout } = useAuth();
  const pathname = usePathname();

  // Don't show on admin pages or while loading
  if (isLoading || !isAdmin || pathname?.startsWith('/admin') || pathname === '/login') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className="bg-dark/95 backdrop-blur-sm text-white px-5 py-3 rounded-full shadow-elegant flex items-center gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Edit Mode</span>
        </div>

        <div className="h-4 w-px bg-white/20" />

        {/* Dashboard link */}
        <Link
          href="/admin"
          className="text-sm text-white/80 hover:text-gold transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          Dashboard
        </Link>

        <div className="h-4 w-px bg-white/20" />

        {/* Logout button */}
        <button
          onClick={logout}
          className="text-sm text-white/80 hover:text-red-400 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}
