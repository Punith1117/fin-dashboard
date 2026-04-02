import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAdmin: false,
  toggleAdminMode: () => set((state) => ({ isAdmin: !state.isAdmin })),
}));
