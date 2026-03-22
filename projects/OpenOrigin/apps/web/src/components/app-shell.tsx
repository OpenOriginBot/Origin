import type { ReactNode } from 'react';
import { BriefcaseBusiness, FolderKanban, PanelLeftClose, PanelLeftOpen, Users } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';

type AppShellProps = {
  children: ReactNode;
};

type NavigationItem = {
  label: string;
  icon: typeof BriefcaseBusiness;
  active?: boolean;
};

const navigation: NavigationItem[] = [
  { label: 'Dashboard', icon: BriefcaseBusiness, active: true },
  { label: 'Clients', icon: Users },
  { label: 'Projects', icon: FolderKanban },
];

export function AppShell({ children }: AppShellProps) {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const ToggleIcon = sidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <div className="flex min-h-screen bg-transparent text-slate-100">
      <aside
        className={cn(
          'border-r border-slate-800/80 bg-slate-950/80 backdrop-blur transition-all',
          sidebarOpen ? 'w-72' : 'w-20',
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className={cn('font-semibold tracking-tight text-white', !sidebarOpen && 'hidden')}>OpenOrigin</div>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ToggleIcon className="h-4 w-4" />
          </button>
        </div>
        <nav className="space-y-2 px-3 py-4">
          {navigation.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors',
                active
                  ? 'bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:bg-blue-500'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white',
              )}
            >
              <Icon className="h-4 w-4" />
              {sidebarOpen ? <span>{label}</span> : null}
            </button>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-800/80 bg-slate-950/40 px-6 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold text-white">Executive Assistant Workspace</h1>
            <p className="text-sm text-slate-400">Client operations, project execution, and delegation.</p>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
