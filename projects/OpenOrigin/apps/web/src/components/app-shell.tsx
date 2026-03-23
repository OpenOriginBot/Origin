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

const brandLogo = (
  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(59,130,246,0.28)]">
    OO
  </div>
);

export function AppShell({ children }: AppShellProps) {
  const { sidebarOpen, setSidebarOpen, theme, toggleTheme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-300',
        isDark ? 'bg-[#0a0a0b] text-zinc-100' : 'bg-[#f5f5f7] text-zinc-900',
      )}
    >
      <div className="p-4">
        <header
          className={cn(
            'flex min-h-16 items-center justify-between gap-3 rounded-[18px] border px-4 py-4 transition-colors duration-300 lg:px-6 lg:py-3',
            isDark
              ? 'border-white/10 bg-[#111214] shadow-[0_10px_30px_rgba(0,0,0,0.22)]'
              : 'border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]',
          )}
        >
          <div className="flex min-w-0 items-center gap-3 lg:hidden">
            {brandLogo}
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

        <div className="pt-4 md:flex md:items-start md:gap-6">
          <aside
            className={cn(
              'hidden rounded-[28px] border transition-all duration-300 md:sticky md:top-4 md:self-start',
              sidebarOpen ? 'md:block md:w-72' : 'md:hidden',
              isDark
                ? 'border-white/10 bg-[#111214] shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
                : 'border-black/10 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]',
            )}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-3">
                {brandLogo}
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
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 pt-2 md:pt-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
