import { create } from 'zustand'

interface AppState {
  isAuthenticated: boolean
  isDemoMode: boolean
  activeFeatureId: string | null

  setAuthenticated: (value: boolean) => void
  setDemoMode: (value: boolean) => void
  setActiveFeatureId: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  isDemoMode: false,
  activeFeatureId: null,

  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setDemoMode: (value) => set({ isDemoMode: value }),
  setActiveFeatureId: (id) => set({ activeFeatureId: id }),
}))
