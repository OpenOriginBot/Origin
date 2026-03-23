import type { ReactNode } from 'react';
import { Bell, BriefcaseBusiness, FolderKanban, Mail, Menu, Moon, Search, SunMedium, Users } from 'lucide-react';
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
          <div className={cn('flex items-center gap-3', !sidebarOpen && 'hidden')}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(59,130,246,0.28)]">
              OO
            </div>
            <div className="font-semibold tracking-tight">OpenOrigin</div>
          </div>
          <button
            className={cn(
              'hidden h-9 w-9 items-center justify-center rounded-full border transition-colors md:inline-flex',
              isDark ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-black/10 bg-black/[0.03] text-zinc-700',
            )}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-3.5 w-3.5" />
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
              <Icon className="h-3.5 w-3.5" />
              {sidebarOpen ? <span>{label}</span> : null}
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 p-4 md:pl-6">
        <header
          className={cn(
            'flex min-h-16 items-center justify-between gap-3 rounded-[18px] border px-4 py-4 transition-colors duration-300 lg:justify-between lg:px-6 lg:py-3',
            isDark
              ? 'border-white/10 bg-[#111214] shadow-[0_10px_30px_rgba(0,0,0,0.22)]'
              : 'border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]',
          )}
        >
          <div className="flex min-w-0 items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(59,130,246,0.28)]">
              OO
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">OpenOrigin</div>
            </div>
          </div>

          <div
            className={cn(
              'hidden h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 lg:flex lg:max-w-[32%]',
              isDark ? 'border-white/10 bg-white/[0.04] text-zinc-300' : 'border-black/10 bg-black/[0.03] text-zinc-600',
            )}
          >
            <Search className="h-3.5 w-3.5" />
            <input
              type="text"
              placeholder="Search clients, projects, tasks"
              className={cn(
                'w-full bg-transparent text-xs outline-none placeholder:text-inherit',
                isDark ? 'text-zinc-100' : 'text-zinc-900',
              )}
            />
          </div>

          <div className="flex items-center justify-end gap-2 lg:hidden">
            <button
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                isDark ? 'border-white/10 bg-white/5 text-zinc-200' : 'border-black/10 bg-black/[0.03] text-zinc-800',
              )}
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
            <button
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                isDark ? 'border-white/10 bg-white/5 text-zinc-200' : 'border-black/10 bg-black/[0.03] text-zinc-800',
              )}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Menu"
            >
              <Menu className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="hidden items-center justify-end gap-2 lg:flex">
            <button
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                isDark ? 'border-white/10 bg-white/5 text-zinc-200' : 'border-black/10 bg-black/[0.03] text-zinc-800',
              )}
              aria-label="Mail"
            >
              <Mail className="h-3.5 w-3.5" />
            </button>
            <button
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                isDark ? 'border-white/10 bg-white/5 text-zinc-200' : 'border-black/10 bg-black/[0.03] text-zinc-800',
              )}
              aria-label="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />
            </button>
            <button
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                isDark ? 'border-white/10 bg-white/5 text-zinc-200' : 'border-black/10 bg-black/[0.03] text-zinc-800',
              )}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <SunMedium className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                isDark ? 'border-white/10 bg-white/5 text-zinc-200' : 'border-black/10 bg-black/[0.03] text-zinc-800',
              )}
              aria-label="User profile"
            >
              <Users className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        <main className="pt-6">{children}</main>
      </div>
    </div>
  );
}

