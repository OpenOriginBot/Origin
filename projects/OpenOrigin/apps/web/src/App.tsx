import { type ReactNode } from 'react';
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarRange,
  CircleAlert,
  Clock3,
  FolderKanban,
  ListTodo,
  TrendingUp,
  Users,
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

const stats = [
  { label: 'Active clients', value: '12', change: '+2 this month', icon: Building2, tone: 'neutral' },
  { label: 'Projects in motion', value: '27', change: '8 high priority', icon: FolderKanban, tone: 'neutral' },
  { label: 'Delegated tasks', value: '64', change: '11 awaiting review', icon: BriefcaseBusiness, tone: 'neutral' },
  { label: 'Pending decisions', value: '5', change: '3 due today', icon: CircleAlert, tone: 'neutral' },
] as const;

const focusProjects = [
  { client: 'Northstar Labs', project: 'Operations redesign', stage: 'Execution', progress: 72, owner: 'Strategy agent' },
  { client: 'Asteron Capital', project: 'Investor reporting system', stage: 'Review', progress: 58, owner: 'Reporting agent' },
  { client: 'OpenOrigin', project: 'Dashboard v1', stage: 'Design', progress: 34, owner: 'Frontend agent' },
] as const;

const todayQueue = [
  { title: 'Approve client delivery plan', detail: 'Northstar Labs · Operations redesign', priority: 'High', time: '09:30' },
  { title: 'Review delegation backlog', detail: 'Cross-client execution queue', priority: 'Medium', time: '11:00' },
  { title: 'Prepare weekly status summary', detail: 'Asteron Capital · Reporting', priority: 'High', time: '16:00' },
  { title: 'Refine dashboard information architecture', detail: 'OpenOrigin · Product system', priority: 'Medium', time: '18:30' },
] as const;

const activityFeed = [
  'Design agent delivered revised dashboard wireframe.',
  'Project lead flagged 3 items that need a decision today.',
  'Execution queue dropped from 18 to 11 overdue tasks.',
  'New client onboarding draft is ready for review.',
];

const teamLoad = [
  { name: 'Frontend agent', load: 'Focused', tasks: 6 },
  { name: 'Strategy agent', load: 'Busy', tasks: 9 },
  { name: 'Reporting agent', load: 'Focused', tasks: 5 },
] as const;

function Surface({ children, className }: { children: ReactNode; className?: string }) {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'rounded-[28px] border transition-colors duration-300',
        isDark
          ? 'border-white/10 bg-[#111214] shadow-[0_20px_60px_rgba(0,0,0,0.28)]'
          : 'border-black/10 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function MutedText({ children, className }: { children: ReactNode; className?: string }) {
  const { theme } = useUIStore();
  return <p className={cn(theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500', className)}>{children}</p>;
}

function ProgressBar({ value }: { value: number }) {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <div className={cn('h-2.5 w-full overflow-hidden rounded-full', isDark ? 'bg-white/10' : 'bg-black/[0.08]')}>
      <div className={cn('h-full rounded-full', isDark ? 'bg-white' : 'bg-black')} style={{ width: `${value}%` }} />
    </div>
  );
}

function SectionCard({ title, description, badge, icon: Icon, children }: { title: string; description?: string; badge?: string; icon: typeof Activity; children: ReactNode }) {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <Surface className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          {description ? <MutedText className="mt-1 text-sm">{description}</MutedText> : null}
        </div>
        {badge ? (
          <div className={cn('rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide', isDark ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-black/10 bg-black/[0.03] text-zinc-700')}>
            {badge}
          </div>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </Surface>
  );
}

export default function App() {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  return (
    <AppShell>
      <div className="space-y-6">
        <Surface className="overflow-hidden p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm', isDark ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-black/10 bg-black/[0.03] text-zinc-700')}>
                <Activity className="h-4 w-4" />
                Dashboard overview
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight lg:text-4xl">Control center for client execution</h2>
              <MutedText className="mt-3 max-w-2xl text-sm leading-6">
                Track active clients, project momentum, delegated work, and decisions that need your attention from one place.
              </MutedText>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className={cn('rounded-2xl border px-4 py-3', isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]')}>
                <div className={cn('text-xs uppercase tracking-wide', isDark ? 'text-zinc-500' : 'text-zinc-500')}>Today</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium">
                  <CalendarRange className="h-4 w-4" />
                  Monday · 4 key reviews
                </div>
              </div>
              <div className={cn('rounded-2xl border px-4 py-3', isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]')}>
                <div className={cn('text-xs uppercase tracking-wide', isDark ? 'text-zinc-500' : 'text-zinc-500')}>Execution</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium">
                  <Clock3 className="h-4 w-4" />
                  11 tasks waiting for action
                </div>
              </div>
            </div>
          </div>
        </Surface>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, change, icon: Icon }) => (
            <Surface key={label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <MutedText className="text-sm">{label}</MutedText>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
                </div>
                <div className={cn('rounded-2xl p-2.5', isDark ? 'bg-white/5' : 'bg-black/[0.04]')}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <MutedText className="mt-4 inline-flex items-center gap-1 text-sm">
                <ArrowUpRight className="h-4 w-4" />
                {change}
              </MutedText>
            </Surface>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <SectionCard title="Priority projects" description="Projects that need active steering this week." badge="3 in focus" icon={TrendingUp}>
            <div className="space-y-4">
              {focusProjects.map((item) => (
                <div key={item.project} className={cn('rounded-2xl border p-4', isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]')}>
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className={cn('text-xs uppercase tracking-wide', isDark ? 'text-zinc-500' : 'text-zinc-500')}>{item.client}</div>
                      <div className="mt-1 text-base font-medium">{item.project}</div>
                      <MutedText className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                        <span>{item.stage}</span>
                        <span className={isDark ? 'text-zinc-600' : 'text-zinc-400'}>•</span>
                        <span>{item.owner}</span>
                      </MutedText>
                    </div>
                    <div className="min-w-44">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <MutedText>Progress</MutedText>
                        <span className={cn('rounded-full border px-2 py-0.5 text-xs', isDark ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-black/10 bg-black/[0.03] text-zinc-700')}>{item.progress}%</span>
                      </div>
                      <ProgressBar value={item.progress} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Today queue" icon={ListTodo}>
            <div className="space-y-4">
              {todayQueue.map((item) => (
                <div key={item.title} className={cn('rounded-2xl border p-4', isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]')}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <MutedText className="mt-1 text-sm">{item.detail}</MutedText>
                    </div>
                    <span className={cn('rounded-full border px-2.5 py-1 text-xs font-medium', isDark ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-black/10 bg-black/[0.03] text-zinc-700')}>
                      {item.priority}
                    </span>
                  </div>
                  <div className={cn('mt-3 text-xs uppercase tracking-wide', isDark ? 'text-zinc-500' : 'text-zinc-500')}>{item.time}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <SectionCard title="Agent load" icon={Users}>
            <div className="space-y-4">
              {teamLoad.map((item) => (
                <div key={item.name} className={cn('flex items-center justify-between rounded-2xl border px-4 py-3', isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]')}>
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <MutedText className="mt-1 text-sm">{item.tasks} active tasks</MutedText>
                  </div>
                  <span className={cn('rounded-full border px-3 py-1 text-xs font-medium', isDark ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-black/10 bg-black/[0.03] text-zinc-700')}>
                    {item.load}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recent activity" icon={Activity}>
            <div className="space-y-4">
              {activityFeed.map((item) => (
                <div key={item} className={cn('flex gap-3 rounded-2xl border p-4', isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]')}>
                  <div className={cn('mt-1 h-2.5 w-2.5 rounded-full', isDark ? 'bg-white' : 'bg-black')} />
                  <p className={cn('text-sm leading-6', isDark ? 'text-zinc-300' : 'text-zinc-700')}>{item}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>
      </div>
    </AppShell>
  );
}
