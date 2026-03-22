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
  Users,
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const stats = [
  {
    label: 'Active clients',
    value: '12',
    change: '+2 this month',
    icon: Building2,
  },
  {
    label: 'Projects in motion',
    value: '27',
    change: '8 high priority',
    icon: FolderKanban,
  },
  {
    label: 'Delegated tasks',
    value: '64',
    change: '11 awaiting review',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Pending decisions',
    value: '5',
    change: '3 due today',
    icon: CircleAlert,
  },
];

const focusProjects = [
  {
    client: 'Northstar Labs',
    project: 'Operations redesign',
    stage: 'Execution',
    progress: 72,
    owner: 'Strategy agent',
  },
  {
    client: 'Asteron Capital',
    project: 'Investor reporting system',
    stage: 'Review',
    progress: 58,
    owner: 'Reporting agent',
  },
  {
    client: 'OpenOrigin',
    project: 'Dashboard v1',
    stage: 'Design',
    progress: 34,
    owner: 'Frontend agent',
  },
];

const todayQueue = [
  {
    title: 'Approve client delivery plan',
    detail: 'Northstar Labs · Operations redesign',
    priority: 'High',
    time: '09:30',
  },
  {
    title: 'Review delegation backlog',
    detail: 'Cross-client execution queue',
    priority: 'Medium',
    time: '11:00',
  },
  {
    title: 'Prepare weekly status summary',
    detail: 'Asteron Capital · Reporting',
    priority: 'High',
    time: '16:00',
  },
  {
    title: 'Refine dashboard information architecture',
    detail: 'OpenOrigin · Product system',
    priority: 'Medium',
    time: '18:30',
  },
];

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
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-slate-900" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function App() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                <Activity className="h-4 w-4" />
                Dashboard overview
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Control center for client execution</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Track active clients, project momentum, delegated work, and decisions that need your attention from one place.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-500">Today</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
                  <CalendarRange className="h-4 w-4" />
                  Monday · 4 key reviews
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-500">Execution</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
                  <Clock3 className="h-4 w-4" />
                  11 tasks waiting for action
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, change, icon: Icon }) => (
            <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
                </div>
                <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-slate-500">
                <ArrowUpRight className="h-4 w-4" />
                {change}
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Priority projects</h3>
                <p className="mt-1 text-sm text-slate-500">Projects that need active steering this week.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                <FolderKanban className="h-4 w-4" />
                3 in focus
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {focusProjects.map((item) => (
                <div key={item.project} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-500">{item.client}</div>
                      <div className="mt-1 text-base font-medium text-slate-950">{item.project}</div>
                      <div className="mt-2 text-sm text-slate-500">{item.stage} · Owner: {item.owner}</div>
                    </div>
                    <div className="min-w-40">
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <ProgressBar value={item.progress} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <ListTodo className="h-4 w-4 text-slate-700" />
                <h3 className="text-lg font-semibold text-slate-950">Today queue</h3>
              </div>
              <div className="mt-5 space-y-4">
                {todayQueue.map((item) => (
                  <div key={item.title} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{item.title}</div>
                        <div className="mt-1 text-sm text-slate-500">{item.detail}</div>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{item.priority}</span>
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-wide text-slate-500">{item.time}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-700" />
              <h3 className="text-lg font-semibold text-slate-950">Agent load</h3>
            </div>
            <div className="mt-5 space-y-4">
              {teamLoad.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{item.name}</div>
                    <div className="mt-1 text-sm text-slate-500">{item.tasks} active tasks</div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{item.load}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-slate-700" />
              <h3 className="text-lg font-semibold text-slate-950">Recent activity</h3>
            </div>
            <div className="mt-5 space-y-4">
              {activityFeed.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 p-4">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </AppShell>
  );
}
