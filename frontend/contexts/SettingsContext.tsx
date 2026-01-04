'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { apiClient, SiteSettings } from '@/lib/api';

interface SettingsContextType {
  settings: SiteSettings;
  isLoading: boolean;
  error: string | null;
  getSetting: (key: string, fallback?: string) => string;
  updateSetting: (key: string, value: string) => Promise<void>;
  uploadImage: (settingKey: string, file: File) => Promise<string>;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  isLoading: true,
  error: null,
  getSetting: () => '',
  updateSetting: async () => {},
  uploadImage: async () => '',
  refreshSettings: async () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await apiClient.getSettings();
      setSettings(data || {});
      setError(null);
    } catch (err) {
      setError('Failed to load settings');
      console.error('Failed to fetch settings:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const getSetting = useCallback(
    (key: string, fallback = ''): string => {
      return settings[key] || fallback;
    },
    [settings]
  );

  const updateSetting = useCallback(async (key: string, value: string) => {
    // Optimistic update
    setSettings((prev) => ({ ...prev, [key]: value }));

    try {
      await apiClient.updateSetting(key, value);
    } catch (err) {
      // Revert on error
      console.error('Failed to update setting:', err);
      await fetchSettings();
      throw err;
    }
  }, [fetchSettings]);

  const uploadImage = useCallback(async (settingKey: string, file: File): Promise<string> => {
    try {
      const result = await apiClient.uploadSettingImage(settingKey, file);
      // Update local state with new image URL
      setSettings((prev) => ({ ...prev, [settingKey]: result.imageUrl }));
      return result.imageUrl;
    } catch (err) {
      console.error('Failed to upload image:', err);
      throw err;
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        error,
        getSetting,
        updateSetting,
        uploadImage,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
