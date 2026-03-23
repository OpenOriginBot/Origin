import type { ReactNode } from 'react';
import { BriefcaseBusiness, FolderKanban, Menu, Moon, SunMedium, Users } from 'lucide-react';
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
  const { sidebarOpen, setSidebarOpen, theme, toggleTheme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'flex min-h-screen transition-colors duration-300',
        isDark
          ? 'bg-[#0a0a0b] text-zinc-100'
          : 'bg-[#f5f5f7] text-zinc-900',
      )}
    >
      <aside
        className={cn(
          'm-4 mr-0 hidden rounded-[28px] border transition-all duration-300 md:block',
          sidebarOpen ? 'md:w-72' : 'md:w-20',
          isDark
            ? 'border-white/10 bg-[#111214] shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
            : 'border-black/10 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]',
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className={cn('font-semibold tracking-tight', !sidebarOpen && 'hidden')}>OpenOrigin</div>
          <button
            className={cn(
              'hidden h-9 w-9 items-center justify-center rounded-xl border transition-colors md:inline-flex',
              isDark ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-black/10 bg-black/[0.03] text-zinc-700',
            )}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-2 px-3 py-4">
          {navigation.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors',
                active && isDark && 'bg-white text-black',
                active && !isDark && 'bg-black text-white',
                !active && isDark && 'text-zinc-300 hover:bg-white/5 hover:text-white',
                !active && !isDark && 'text-zinc-700 hover:bg-black/[0.04] hover:text-black',
              )}
            >
              <Icon className="h-4 w-4" />
              {sidebarOpen ? <span>{label}</span> : null}
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 p-4 md:pl-6">
        <header
          className={cn(
            'flex min-h-16 flex-col gap-4 rounded-[24px] border px-4 py-4 transition-colors duration-300 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0',
            isDark
              ? 'border-white/10 bg-[#111214] shadow-[0_10px_30px_rgba(0,0,0,0.22)]'
              : 'border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]',
          )}
        >
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">Executive Assistant Workspace</h1>
            <p className={cn('text-sm leading-6 sm:leading-normal', isDark ? 'text-zinc-400' : 'text-zinc-500')}>Client operations, project execution, and delegation.</p>
          </div>

          <button
            className={cn(
              'inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-sm transition-colors sm:w-auto',
              isDark ? 'border-white/10 bg-white/5 text-zinc-200' : 'border-black/10 bg-black/[0.03] text-zinc-800',
            )}
            onClick={toggleTheme}
          >
            {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </header>

        <main className="pt-6">{children}</main>
      </div>
    </div>
  );
}

