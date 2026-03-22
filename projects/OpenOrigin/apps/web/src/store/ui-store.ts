import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

type UIState = {
  sidebarOpen: boolean;
  theme: ThemeMode;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
