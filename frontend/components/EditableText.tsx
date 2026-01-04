'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';

interface EditableTextProps {
  settingKey: string;
  fallback?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

export default function EditableText({
  settingKey,
  fallback = '',
  as: Component = 'p',
  className = '',
  multiline = false,
}: EditableTextProps) {
  const { isAdmin } = useAuth();
  const { getSetting, updateSetting } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  const currentValue = getSetting(settingKey, fallback);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Select all text
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (value.trim() === currentValue.trim()) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await updateSetting(settingKey, value.trim());
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      setValue(currentValue); // Revert on error
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setValue(currentValue);
      setIsEditing(false);
    }
  };

  // If not admin, just render the text
  if (!isAdmin) {
    return <Component className={className}>{currentValue}</Component>;
  }

  // If editing, show input
  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`${className} editing-active bg-white/95 w-full resize-none min-h-[100px] p-2`}
            disabled={isSaving}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`${className} editing-active bg-white/95 w-full p-2`}
            disabled={isSaving}
          />
        )}
        {isSaving && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // Show editable text with hover indicator
  return (
    <div
      className="editable group relative inline-block"
      onClick={() => setIsEditing(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsEditing(true)}
    >
      <Component className={className}>{currentValue}</Component>
      <span className="edit-indicator" aria-label="Edit">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </span>
    </div>
  );
}
