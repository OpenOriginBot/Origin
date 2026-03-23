import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import { queryClient } from './lib/query-client';
import { useUIStore } from './store/ui-store';

function ThemeManager() {
  const { theme } = useUIStore();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeManager />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
