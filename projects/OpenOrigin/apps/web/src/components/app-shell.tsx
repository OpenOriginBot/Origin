import type { ReactNode } from 'react';
import { Bell, Calendar, ChartColumn, CircleHelp, LayoutDashboard, LogOut, Mail, Menu, Search, Settings, SquareCheckBig, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

type AppShellProps = {
  children: ReactNode;
};

type NavigationItem = {
  label: string;
  icon: typeof LayoutDashboard;
  section: 'menu' | 'general';
  badge?: string;
  active?: boolean;
};

const navigation: NavigationItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, section: 'menu', active: true },
  { label: 'Tasks', icon: SquareCheckBig, section: 'menu', badge: '124' },
  { label: 'Calendar', icon: Calendar, section: 'menu' },
  { label: 'Analytics', icon: ChartColumn, section: 'menu' },
  { label: 'Team', icon: Users, section: 'menu' },
  { label: 'Settings', icon: Settings, section: 'general' },
  { label: 'Help', icon: Bell, section: 'general' },
  { label: 'Logout', icon: LogOut, section: 'general' },
];

function BrandMark() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary transition-transform duration-300 group-hover:scale-110">
      <div className="absolute left-[30%] top-[30%] h-1.5 w-1.5 rounded-full bg-primary-foreground" />
      <div className="absolute right-[30%] top-[30%] h-1.5 w-1.5 rounded-full bg-primary-foreground" />
      <div className="absolute bottom-2.5 h-1.5 w-3 rounded-full border-b-2 border-primary-foreground" />
    </div>
  );
}

function NavGroup({ title, items }: { title: string; items: NavigationItem[] }) {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <div>
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <nav className="space-y-0.5">
        {items.map(({ label, icon: Icon, badge, active }) => (
          <button
            key={label}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-all duration-300',
              active
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm">{label}</span>
            {badge ? (
              <span
                className={cn(
                  'ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                  isDark ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground',
                )}
              >
                {badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarOpen, setSidebarOpen, theme } = useUIStore();
  const menuItems = navigation.filter((item) => item.section === 'menu');
  const generalItems = navigation.filter((item) => item.section === 'general');

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {sidebarOpen ? (
        <aside className="hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-border bg-card p-4 lg:fixed lg:left-0 lg:top-0 lg:block">
          <div className="group mb-6 flex cursor-pointer items-center gap-2">
            <a className="flex items-center gap-2" href="#">
              <BrandMark />
              <span className="text-lg font-semibold text-foreground">Tasko</span>
            </a>
          </div>

          <div className="space-y-4">
            <NavGroup title="Menu" items={menuItems} />
            <NavGroup title="General" items={generalItems} />
          </div>
        </aside>
      ) : null}

      <main className={cn('flex-1 p-3 md:p-4 lg:p-5', sidebarOpen ? 'lg:ml-64' : '')}>
        <header className="animate-in fade-in-0 slide-in-from-bottom-2 space-y-3 md:space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2">
              <button
                className="inline-flex size-9 items-center justify-center rounded-md transition-all duration-300 hover:bg-secondary lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="relative max-w-md flex-1">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search task"
                  className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm shadow-xs outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-ring focus:shadow-lg focus:shadow-primary/10"
                />
                <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground md:inline-block">
                  ⌘F
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300 hover:scale-110 hover:bg-secondary">
                <Mail className="h-4 w-4" />
              </button>
              <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300 hover:scale-110 hover:bg-secondary">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
              </button>
              <div className="flex items-center gap-2 border-l border-border pl-2 md:pl-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs ring-2 ring-primary/20 md:h-8 md:w-8">JS</div>
                <div className="hidden text-xs sm:block">
                  <p className="font-semibold text-foreground">Jessin Sam</p>
                  <p className="text-[10px] text-muted-foreground">jessin@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {children}
        </header>
      </main>
    </div>
  );
}
