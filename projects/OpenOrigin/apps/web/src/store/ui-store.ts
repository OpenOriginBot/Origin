import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';
export type WorkspaceView = 'dashboard' | 'tasks' | 'calendar' | 'analytics' | 'team';

type UIState = {
  sidebarOpen: boolean;
  theme: ThemeMode;
  currentView: WorkspaceView;
  searchQuery: string;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setCurrentView: (view: WorkspaceView) => void;
  setSearchQuery: (query: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  currentView: 'dashboard',
  searchQuery: '',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setCurrentView: (view) => set({ currentView: view }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
