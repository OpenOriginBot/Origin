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

const stats = [
  {
    label: 'Active clients',
    value: '12',
    change: '+2 this month',
    icon: Building2,
    tone: 'blue',
  },
  {
    label: 'Projects in motion',
    value: '27',
    change: '8 high priority',
    icon: FolderKanban,
    tone: 'green',
  },
  {
    label: 'Delegated tasks',
    value: '64',
    change: '11 awaiting review',
    icon: BriefcaseBusiness,
    tone: 'blue',
  },
  {
    label: 'Pending decisions',
    value: '5',
    change: '3 due today',
    icon: CircleAlert,
    tone: 'red',
  },
] as const;

const focusProjects = [
  {
    client: 'Northstar Labs',
    project: 'Operations redesign',
    stage: 'Execution',
    progress: 72,
    owner: 'Strategy agent',
    tone: 'green',
  },
  {
    client: 'Asteron Capital',
    project: 'Investor reporting system',
    stage: 'Review',
    progress: 58,
    owner: 'Reporting agent',
    tone: 'blue',
  },
  {
    client: 'OpenOrigin',
    project: 'Dashboard v1',
    stage: 'Design',
    progress: 34,
    owner: 'Frontend agent',
    tone: 'red',
  },
] as const;

const todayQueue = [
  {
    title: 'Approve client delivery plan',
    detail: 'Northstar Labs · Operations redesign',
    priority: 'High',
    time: '09:30',
    tone: 'red',
  },
  {
    title: 'Review delegation backlog',
    detail: 'Cross-client execution queue',
    priority: 'Medium',
    time: '11:00',
    tone: 'blue',
  },
  {
    title: 'Prepare weekly status summary',
    detail: 'Asteron Capital · Reporting',
    priority: 'High',
    time: '16:00',
    tone: 'green',
  },
  {
    title: 'Refine dashboard information architecture',
    detail: 'OpenOrigin · Product system',
    priority: 'Medium',
    time: '18:30',
    tone: 'blue',
  },
] as const;

const activityFeed = [
  'Design agent delivered revised dashboard wireframe.',
  'Project lead flagged 3 items that need a decision today.',
  'Execution queue dropped from 18 to 11 overdue tasks.',
  'New client onboarding draft is ready for review.',
];

const teamLoad = [
  { name: 'Frontend agent', load: 'Focused', tasks: 6, tone: 'blue' },
  { name: 'Strategy agent', load: 'Busy', tasks: 9, tone: 'red' },
  { name: 'Reporting agent', load: 'Focused', tasks: 5, tone: 'green' },
] as const;

function toneClasses(tone: 'red' | 'green' | 'blue') {
  switch (tone) {
    case 'red':
      return {
        soft: 'bg-red-500/15 text-red-300 border-red-500/20',
        strong: 'bg-red-500',
        icon: 'bg-red-500/15 text-red-300',
      };
    case 'green':
      return {
        soft: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
        strong: 'bg-emerald-500',
        icon: 'bg-emerald-500/15 text-emerald-300',
      };
    default:
      return {
        soft: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
        strong: 'bg-blue-500',
        icon: 'bg-blue-500/15 text-blue-300',
      };
  }
}

function ProgressBar({ value, tone }: { value: number; tone: 'red' | 'green' | 'blue' }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
      <div className={`h-full rounded-full ${toneClasses(tone).strong}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function App() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-950/70 shadow-[0_30px_80px_rgba(2,6,23,0.45)]">
          <div className="border-b border-slate-800/80 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,23,42,0.78))] p-6 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
                  <Activity className="h-4 w-4" />
                  Dashboard overview
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-4xl">Control center for client execution</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  Track active clients, project momentum, delegated work, and decisions that need your attention from one place.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                  <div className="text-xs uppercase tracking-wide text-slate-400">Today</div>
                  <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
                    <CalendarRange className="h-4 w-4 text-blue-300" />
                    Monday · 4 key reviews
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                  <div className="text-xs uppercase tracking-wide text-slate-400">Execution</div>
                  <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
                    <Clock3 className="h-4 w-4 text-emerald-300" />
                    11 tasks waiting for action
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4 lg:p-8">
            {stats.map(({ label, value, change, icon: Icon, tone }) => {
              const toneClass = toneClasses(tone);
              return (
                <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{label}</p>
                      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
                    </div>
                    <div className={`rounded-xl p-2 ${toneClass.icon}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm text-slate-400">
                    <ArrowUpRight className="h-4 w-4" />
                    {change}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.3)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Priority projects</h3>
                <p className="mt-1 text-sm text-slate-400">Projects that need active steering this week.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-200">
                <TrendingUp className="h-4 w-4" />
                3 in focus
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {focusProjects.map((item) => {
                const toneClass = toneClasses(item.tone);
                return (
                  <div key={item.project} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500">{item.client}</div>
                        <div className="mt-1 text-base font-medium text-white">{item.project}</div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <span>{item.stage}</span>
                          <span className="text-slate-600">•</span>
                          <span>{item.owner}</span>
                        </div>
                      </div>
                      <div className="min-w-44">
                        <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                          <span>Progress</span>
                          <span className={`rounded-full border px-2 py-0.5 text-xs ${toneClass.soft}`}>{item.progress}%</span>
                        </div>
                        <ProgressBar value={item.progress} tone={item.tone} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.3)]">
              <div className="flex items-center gap-2">
                <ListTodo className="h-4 w-4 text-blue-300" />
                <h3 className="text-lg font-semibold text-white">Today queue</h3>
              </div>
              <div className="mt-5 space-y-4">
                {todayQueue.map((item) => {
                  const toneClass = toneClasses(item.tone);
                  return (
                    <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="mt-1 text-sm text-slate-400">{item.detail}</div>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${toneClass.soft}`}>{item.priority}</span>
                      </div>
                      <div className="mt-3 text-xs uppercase tracking-wide text-slate-500">{item.time}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.3)]">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-300" />
              <h3 className="text-lg font-semibold text-white">Agent load</h3>
            </div>
            <div className="mt-5 space-y-4">
              {teamLoad.map((item) => {
                const toneClass = toneClasses(item.tone);
                return (
                  <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="mt-1 text-sm text-slate-400">{item.tasks} active tasks</div>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClass.soft}`}>{item.load}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.3)]">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-300" />
              <h3 className="text-lg font-semibold text-white">Recent activity</h3>
            </div>
            <div className="mt-5 space-y-4">
              {activityFeed.map((item, index) => {
                const tone = index === 1 ? 'red' : index === 2 ? 'green' : 'blue';
                return (
                  <div key={item} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <div className={`mt-1 h-2.5 w-2.5 rounded-full ${toneClasses(tone).strong}`} />
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </AppShell>
  );
}
