'use client';

import { useEffect, useState } from 'react';
import { apiClient, Service, GalleryImage } from '@/lib/api';

interface DashboardStats {
  totalServices: number;
  activeServices: number;
  totalImages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    activeServices: 0,
    totalImages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [services, images] = await Promise.all([
          apiClient.getServices(),
          apiClient.getGalleryImages(),
        ]);

        setStats({
          totalServices: services.length,
          activeServices: services.filter((s: Service) => s.isActive !== false).length,
          totalImages: images.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Services',
      value: stats.totalServices,
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Active Services',
      value: stats.activeServices,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Gallery Images',
      value: stats.totalImages,
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
        <p className="text-muted mt-1">Welcome to the CreativeMicroInk admin panel</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-accent mx-auto"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat) => (
              <div key={stat.label} className="card">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark">{stat.value}</p>
                    <p className="text-sm text-muted">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-dark mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/admin/services"
                className="p-4 border border-gray-200 rounded-card hover:border-rose-accent hover:bg-rose-accent/5 transition-colors"
              >
                <svg className="w-8 h-8 text-rose-accent mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="font-medium text-dark">Add New Service</h3>
                <p className="text-sm text-muted">Create a new service offering</p>
              </a>

              <a
                href="/admin/gallery"
                className="p-4 border border-gray-200 rounded-card hover:border-rose-accent hover:bg-rose-accent/5 transition-colors"
              >
                <svg className="w-8 h-8 text-rose-accent mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-medium text-dark">Upload Photos</h3>
                <p className="text-sm text-muted">Add images to the gallery</p>
              </a>

              <a
                href="/"
                target="_blank"
                className="p-4 border border-gray-200 rounded-card hover:border-rose-accent hover:bg-rose-accent/5 transition-colors"
              >
                <svg className="w-8 h-8 text-rose-accent mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <h3 className="font-medium text-dark">View Site</h3>
                <p className="text-sm text-muted">Preview your public website</p>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
