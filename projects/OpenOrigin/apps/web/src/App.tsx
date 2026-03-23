import { ArrowUpRight, Plus, TrendingUp, Video } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

const stats = [
  { label: 'Total Projects', value: '24', detail: 'Increased from last month', primary: true },
  { label: 'Ended Projects', value: '10', detail: 'Increased from last month' },
  { label: 'Running Projects', value: '12', detail: 'Increased from last month' },
  { label: 'Pending Project', value: '2', detail: 'On Discuss' },
] as const;

const teamMembers = [
  { name: 'Alexandra Deff', task: 'Github Project Repository', status: 'Completed', initials: 'AD', tone: 'emerald' },
  { name: 'Edwin Adenike', task: 'Integrate User Authentication System', status: 'In Progress', initials: 'EA', tone: 'amber' },
  { name: 'Isaac Oluwatemilorun', task: 'Develop Search and Filter Functionality', status: 'Pending', initials: 'IO', tone: 'rose' },
  { name: 'David Oshodi', task: 'Responsive Layout for Homepage', status: 'In Progress', initials: 'DO', tone: 'amber' },
] as const;

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-xl border bg-card text-card-foreground shadow-sm', className)}>{children}</div>;
}

function StatCard({ label, value, detail, primary }: { label: string; value: string; detail: string; primary?: boolean }) {
  return (
    <Card
      className={cn(
        'cursor-pointer p-4 transition-all duration-500 ease-out hover:shadow-xl',
        primary ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card text-foreground shadow-lg',
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-xs font-medium opacity-90">{label}</h3>
        <div className={cn('flex h-6 w-6 items-center justify-center rounded-full', primary ? 'bg-primary-foreground/20' : 'bg-primary')}>
          <ArrowUpRight className={cn('h-3 w-3', primary ? 'text-primary-foreground' : 'text-primary-foreground')} />
        </div>
      </div>
      <p className="mb-2 text-3xl font-bold">{value}</p>
      <div className="flex items-center gap-1.5 text-xs opacity-80">
        {detail.includes('Increased') ? <TrendingUp className="h-3 w-3" /> : null}
        <span>{detail}</span>
      </div>
    </Card>
  );
}

function TeamStatusPill({ tone, text }: { tone: 'emerald' | 'amber' | 'rose'; text: string }) {
  const map = {
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700',
  };

  return <span className={cn('whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium', map[tone])}>{text}</span>;
}

export default function App() {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <AppShell>
      <div>
        <h1 className="mb-1 text-xl font-bold text-foreground md:text-2xl lg:text-3xl">Dashboard</h1>
        <p className="text-xs text-muted-foreground md:text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button className="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 sm:w-auto">
          + Add Project
        </button>
        <button className="h-9 w-full rounded-md border border-border bg-transparent px-4 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md sm:w-auto">
          Import Data
        </button>
      </div>

      <div className="mt-4 space-y-3 md:mt-5 md:space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
          <div className="space-y-3 md:space-y-4 lg:col-span-2">
            <Card className="bg-gradient-to-br from-background to-muted/20 p-6 transition-all duration-500 hover:shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Project Analytics</h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-emerald-600" />
                  <span>Weekly Activity</span>
                </div>
              </div>

              <div className="relative mb-4 h-64 overflow-hidden rounded-xl border border-border/60 bg-gradient-to-b from-background to-muted/30 p-4">
                <div className="absolute inset-x-0 bottom-0 top-0 flex items-end gap-3 px-6 pb-6">
                  {[42, 55, 39, 66, 58, 78, 69, 88, 73, 92].map((height, index) => (
                    <div key={index} className="flex flex-1 items-end justify-center">
                      <div className="w-full rounded-t-full bg-primary/80" style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,transparent_0%,transparent_70%,rgba(255,255,255,0.02)_100%)]" />
              </div>

              <div className="flex items-center justify-between border-t border-muted/50 pt-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Average: </span>
                  <span className="font-semibold text-foreground">62%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Peak: </span>
                  <span className="font-semibold text-emerald-600">92%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 transition-all duration-500 hover:shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Team Collaboration</h2>
                <button className="inline-flex h-8 items-center rounded-md border border-border bg-transparent px-3 text-sm transition-all duration-300 hover:scale-105">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Member
                </button>
              </div>

              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-all duration-300 hover:bg-secondary">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground ring-2 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/40">
                      {member.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{member.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        Working on <span className="font-medium">{member.task}</span>
                      </p>
                    </div>
                    <TeamStatusPill tone={member.tone} text={member.status} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Card className="p-6 transition-all duration-500 hover:shadow-xl">
              <h2 className="mb-6 text-xl font-semibold text-foreground">Reminders</h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <h3 className="mb-1 font-semibold text-foreground">Meeting with Arc Company</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Time : 02.00 pm - 04.00 pm</p>
                  <button className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
                    <Video className="mr-2 h-4 w-4" />
                    Start Meeting
                  </button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden p-4 transition-all duration-500 hover:shadow-xl">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Project Progress</h2>
              <div className="flex flex-col items-center">
                <div className="relative mb-4 h-40 w-40">
                  <div className="absolute inset-0 rounded-full opacity-20 [background:repeating-linear-gradient(45deg,transparent,transparent_6px,oklch(0.42_0.15_155)_6px,oklch(0.42_0.15_155)_12px)]" />
                  <div className="absolute inset-3 rounded-full border-[12px] border-muted/30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">0%</span>
                    <span className="mt-1 text-xs text-muted-foreground">Project Ended</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                    <span className="text-muted-foreground">In Progress</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full [background:repeating-linear-gradient(45deg,transparent,transparent_2px,oklch(0.55_0.02_120)_2px,oklch(0.55_0.02_120)_4px)]" />
                    <span className="text-muted-foreground">Pending</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
