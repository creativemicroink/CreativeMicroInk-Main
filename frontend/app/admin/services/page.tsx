'use client';

import { useState, useEffect } from 'react';
import { apiClient, Service } from '@/lib/api';

const emptyService: Omit<Service, 'id'> = {
  name: '',
  description: '',
  price: 0,
  touchUpPrice: undefined,
  duration: 60,
  imageUrl: '',
  category: 'brows',
  isActive: true,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<Service, 'id'>>(emptyService);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await apiClient.getServices();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingService(null);
    setFormData(emptyService);
    setError(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsCreating(false);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      touchUpPrice: service.touchUpPrice,
      duration: service.duration,
      imageUrl: service.imageUrl || '',
      category: service.category || 'brows',
      isActive: service.isActive !== false,
    });
    setError(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingService(null);
    setFormData(emptyService);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isCreating) {
        const newService = await apiClient.createService(formData);
        setServices([...services, newService]);
      } else if (editingService) {
        const updatedService = await apiClient.updateService(editingService.id, formData);
        setServices(services.map((s) => (s.id === editingService.id ? updatedService : s)));
      }
      handleCancel();
    } catch (err) {
      console.error('Error saving service:', err);
      setError('Failed to save service. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await apiClient.deleteService(id);
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Error deleting service:', err);
      setError('Failed to delete service');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const categories = ['brows', 'lips', 'lashes', 'other'];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Services</h1>
          <p className="text-muted mt-1">Manage your service offerings</p>
        </div>
        {!isCreating && !editingService && (
          <button onClick={handleCreate} className="btn-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Service
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-card">
          {error}
        </div>
      )}

      {/* Create/Edit Form */}
      {(isCreating || editingService) && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-dark mb-6">
            {isCreating ? 'Add New Service' : 'Edit Service'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="label-text">Service Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g., Powder Brows"
                />
              </div>

              <div>
                <label htmlFor="category" className="label-text">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="label-text">Initial Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="touchUpPrice" className="label-text">Touch-up Price ($)</label>
                <input
                  type="number"
                  id="touchUpPrice"
                  name="touchUpPrice"
                  value={formData.touchUpPrice || ''}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="input-field"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label htmlFor="duration" className="label-text">Duration (minutes)</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="0"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="label-text">Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="label-text">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="input-field resize-none"
                placeholder="Describe this service..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 text-rose-accent rounded"
              />
              <label htmlFor="isActive" className="text-sm text-dark">Active (visible on website)</label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving ? 'Saving...' : isCreating ? 'Create Service' : 'Update Service'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-accent mx-auto"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-muted">No services found. Create your first service!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`card flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !service.isActive ? 'opacity-60' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-dark">{service.name}</h3>
                  {!service.isActive && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      Inactive
                    </span>
                  )}
                  {service.category && (
                    <span className="text-xs bg-rose-accent/20 text-rose-accent px-2 py-0.5 rounded">
                      {service.category}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted mt-1">{service.description}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="text-rose-accent font-medium">${service.price}</span>
                  {service.touchUpPrice && (
                    <span className="text-muted">Touch-up: ${service.touchUpPrice}</span>
                  )}
                  {service.duration && (
                    <span className="text-muted">{service.duration} min</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-dark hover:text-rose-accent transition-colors"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-dark hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
