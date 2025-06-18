// src/store/user.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser, IPreference, ILocation } from "@/core/interfaces";
import { StatusActivation } from "@/enums";

export interface UserState {
  user: IUser | null;
  token: string | null;
  preferences: IPreference;
  locations: ILocation[];
  error: string | null;
  isLoading: boolean;
  
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  setPreferences: (preferences: IPreference) => void;
  addLocation: (location: ILocation) => void;
  updateLocation: (locationId: number, location: Partial<ILocation>) => void;
  removeLocation: (locationId: number) => void;
  setLocations: (locations: ILocation[]) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
  hasRole: (role: string) => boolean;
}

const defaultPreferences: IPreference = {
  status: StatusActivation.Pending,
  tagId: 0,
  clientId: 0,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      preferences: defaultPreferences,
      locations: [],
      error: null,
      isLoading: false,
      
      // Set the current user
      setUser: (user) => set({ user }),
      
      // Set authentication token
      setToken: (token) => set({ token }),
      
      // Set user preferences
      setPreferences: (preferences) => set(state => ({
        preferences: { ...state.preferences, ...preferences }
      })),
      
      // Add a new location
      addLocation: (location) => set(state => ({
        locations: [...state.locations, location]
      })),
      
      // Update an existing location
      updateLocation: (locationId, locationUpdate) => set(state => ({
        locations: state.locations.map(loc => 
          loc.id === locationId ? { ...loc, ...locationUpdate } : loc
        )
      })),
      
      // Remove a location
      removeLocation: (locationId) => set(state => ({
        locations: state.locations.filter(loc => loc.id !== locationId)
      })),
      
      // Set all locations
      setLocations: (locations) => set({ locations }),
      
      // Set error message
      setError: (error) => set({ error }),
      
      // Set loading state
      setLoading: (isLoading) => set({ isLoading }),
      
      // Clear user data (logout)
      clearUser: () => set({
        user: null,
        token: null,
        preferences: defaultPreferences,
        locations: [],
        error: null
      }),
      
      // Check if user is logged in
      isLoggedIn: () => {
        const { user, token } = get();
        return !!user && !!token && user.status === StatusActivation.Active;
      },
      
      // Check if user has a specific role
      hasRole: (role) => {
        const { user } = get();
        // return !!user && user.role === role;
        return !!user && user.status === role;
      }
    }),
    {
      name: "e-cantine-user", // storage key
      version: 1 // version for migration management
    }
  )
);