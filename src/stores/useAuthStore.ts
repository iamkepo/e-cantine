import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser, IPreference, ILocation, IClient, IAdmin } from '@/core/interfaces';
import { StatusActivation } from '@prisma/client';


interface AuthState {
  user: IUser & { scope: string } & (IClient | IAdmin) | null;
  token: string | null;
  refreshToken: string | null;
  preferences: IPreference[];
  locations: ILocation[];
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  init: () => void;
}
const initState = {
  user: null,
  token: null,
  refreshToken: null,
  preferences: [],
  locations: [],
  error: null,
  isLoading: false,
  isAuthenticated: false
}

const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'e-cantine-user' });

export const useAuthStore = create<AuthState>()(
  myMiddlewares((set) => ({
    ...initState,
    init: () => set(() => ({
      ...initState
    })),
  })),
);

export const setUser = (user: IUser & { scope: string } & (IClient | IAdmin)) => useAuthStore.setState({ user })

export const setToken = (token: string) => useAuthStore.setState({ token })
export const setRefreshToken = (refreshToken: string) => useAuthStore.setState({ refreshToken })
export const setTokenAndRefreshToken = ({token, refreshToken}: {token: string, refreshToken: string}) => useAuthStore.setState({ token, refreshToken, isAuthenticated: true })

export const getToken = () => useAuthStore.getState().token
export const getRefreshToken = () => useAuthStore.getState().refreshToken

export const setPreferences = (preferences: IPreference[]) => useAuthStore.setState(state => ({
  preferences: { ...state.preferences, ...preferences }
}))

export const addLocation = (location: ILocation) => useAuthStore.setState(state => ({
  locations: [...state.locations, location]
}))

export const updateLocation = (locationId: number, locationUpdate: ILocation) => useAuthStore.setState(state => ({
  locations: state.locations.map(loc => 
    loc.id === locationId ? { ...loc, ...locationUpdate } : loc
  )
}))

export const removeLocation = (locationId: number) => useAuthStore.setState(state => ({
  locations: state.locations.filter(loc => loc.id !== locationId)
}))

export const setLocations = (locations: ILocation[]) => useAuthStore.setState({ locations })

export const setError = (error: string) => useAuthStore.setState({ error })

export const setLoading = (isLoading: boolean) => useAuthStore.setState({ isLoading })

export const clearUser = () => useAuthStore.setState({
  ...initState
})

export const isLoggedIn = () => {
  const { user, token } = useAuthStore.getState();
  return !!user && !!token && user.status === StatusActivation.active;
}

// Check if user has a specific role
export const hasRole = (role: string) => {
  const { user } = useAuthStore.getState();
  // return !!user && user.role === role;
  return !!user && user.status === role;
}

