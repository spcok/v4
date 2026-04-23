import { create } from 'zustand';

export interface AuthState {
  isAuthenticated: boolean;
  userInitials: string | null;
  login: (initials: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userInitials: null,
  login: (initials) => set({ isAuthenticated: true, userInitials: initials }),
  logout: () => set({ isAuthenticated: false, userInitials: null }),
}));
