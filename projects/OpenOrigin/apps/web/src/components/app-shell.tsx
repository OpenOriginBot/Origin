import type { ReactNode } from 'react';
import { BriefcaseBusiness, FolderKanban, PanelLeftClose, PanelLeftOpen, Users } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';

type AppShellProps = {
  children: ReactNode;
};

const navigation = [
  { label: 'Clients', icon: Users },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Delegation', icon: BriefcaseBusiness },
];

export function AppShell({ children }: AppShellProps) {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const ToggleIcon = sidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className={cn('border-r border-slate-200 bg-white transition-all', sidebarOpen ? 'w-64' : 'w-20')}>
        <div className="flex h-16 items-center justify-between px-4">
          <div className={cn('font-semibold tracking-tight', !sidebarOpen && 'hidden')}>OpenOrigin</div>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ToggleIcon className="h-4 w-4" />
          </button>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
            >
              <Icon className="h-4 w-4" />
              {sidebarOpen ? <span>{label}</span> : null}
            </button>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div>
            <h1 className="text-lg font-semibold">Executive Assistant Workspace</h1>
            <p className="text-sm text-slate-500">Client operations, project execution, and delegation.</p>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
