'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';

/**
 * Social Authentication Buttons Component
 * 
 * Provides OAuth sign-in buttons for:
 * - Google
 * - GitHub  
 * - Discord
 * 
 * Usage:
 * <SocialAuthButtons />
 */

interface SocialAuthButtonsProps {
  isLoading?: boolean;
  fields?: Array<Record<string, unknown>>;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  isLoading = false,
  fields = [],
}) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setLoading(provider);
      await authClient.signIn.social({
        provider: provider,
        callbackURL: '/',
      });
    } catch (error) {
      console.error(`${provider} sign in failed:`, error);
      setLoading(null);
    }
  };

  if (!fields || fields.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.875rem', color: '#666' }}>
        <span>or continue with</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {fields.map((field) => {
          const f = field as Record<string, unknown>;
          const id = String((f['id'] ?? f['icon'] ?? '') as string).toLowerCase();
          // Use label as fallback
          const label = (f['label'] as string) || id;
          const disabled = !!(f['disabled'] as boolean | undefined) || false;
          // Simple icon mapping
          const icons: Record<string, string> = {
            google: '🔍',
            github: '🐙',
            discord: '💬',
            apple: '',
            facebook: '📘',
          };

          const bgMap: Record<string, string> = {
            google: '#fff',
            github: '#24292e',
            discord: '#5865F2',
            apple: '#000',
            facebook: '#1877F2',
          };

          const textColorMap: Record<string, string> = {
            google: '#000',
            github: '#fff',
            discord: '#fff',
            apple: '#fff',
            facebook: '#fff',
          };

          const borderColorMap: Record<string, string> = {
            google: '#dadce0',
            github: '#24292e',
            discord: '#5865F2',
            apple: '#000',
            facebook: '#1877F2',
          };

          return (
            <button
              key={id}
              onClick={() => handleOAuthSignIn(id)}
              disabled={isLoading || loading !== null || disabled}
              style={{
                backgroundColor: bgMap[id] || '#fff',
                color: textColorMap[id] || '#000',
                border: `1px solid ${borderColorMap[id] || '#ddd'}`,
                borderRadius: '0.5rem',
                padding: '0.75rem',
                cursor: loading === null || loading === id ? 'pointer' : 'not-allowed',
                opacity: loading && loading !== id ? 0.5 : 1,
                transition: 'all 0.2s',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
              title={`Sign in with ${label}`}
              aria-label={`Sign in with ${label}`}
            >
              {loading === id ? (
                <span>⏳</span>
              ) : (
                <>
                  <span style={{ marginRight: '0.5rem' }}>{icons[id] || '🔐'}</span>
                  <span>{label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialAuthButtons;
