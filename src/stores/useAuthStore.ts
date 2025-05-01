import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const AUTH_KEY = 'mvp_authenticated';

interface User {
  email: string;
  role: string;
  preferences?: string[];
  // Add more fields as needed
}

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      error: null,
      user: null,
      login: async (email: string, password: string, role: string) => {
        if (email && password && role) {
          set({ isAuthenticated: true, error: null, user: { email, role } });
        } else {
          set({ error: 'Veuillez entrer un email et un mot de passe valides.' });
        }
      },
      logout: () => set({ isAuthenticated: false, error: null, user: null }),
    }),
    {
      name: AUTH_KEY, // clé de stockage dans localStorage
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }), // persist also user
    }
  )
);
