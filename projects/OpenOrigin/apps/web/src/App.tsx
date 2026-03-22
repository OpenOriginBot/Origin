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
  { label: 'Active clients', value: '12', change: '+2 this month', icon: Building2, tone: 'blue' },
  { label: 'Projects in motion', value: '27', change: '8 high priority', icon: FolderKanban, tone: 'green' },
  { label: 'Delegated tasks', value: '64', change: '11 awaiting review', icon: BriefcaseBusiness, tone: 'blue' },
  { label: 'Pending decisions', value: '5', change: '3 due today', icon: CircleAlert, tone: 'red' },
] as const;

const focusProjects = [
  { client: 'Northstar Labs', project: 'Operations redesign', stage: 'Execution', progress: 72, owner: 'Strategy agent', tone: 'green' },
  { client: 'Asteron Capital', project: 'Investor reporting system', stage: 'Review', progress: 58, owner: 'Reporting agent', tone: 'blue' },
  { client: 'OpenOrigin', project: 'Dashboard v1', stage: 'Design', progress: 34, owner: 'Frontend agent', tone: 'red' },
] as const;

const todayQueue = [
  { title: 'Approve client delivery plan', detail: 'Northstar Labs · Operations redesign', priority: 'High', time: '09:30', tone: 'red' },
  { title: 'Review delegation backlog', detail: 'Cross-client execution queue', priority: 'Medium', time: '11:00', tone: 'blue' },
  { title: 'Prepare weekly status summary', detail: 'Asteron Capital · Reporting', priority: 'High', time: '16:00', tone: 'green' },
  { title: 'Refine dashboard information architecture', detail: 'OpenOrigin · Product system', priority: 'Medium', time: '18:30', tone: 'blue' },
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

type Tone = 'red' | 'green' | 'blue';

function toneClasses(tone: Tone) {
  switch (tone) {
    case 'red':
      return {
        soft: 'bg-red-500/12 text-red-200 border-red-400/20',
        strong: 'bg-red-400',
        icon: 'bg-red-500/12 text-red-200 ring-1 ring-red-400/20',
      };
    case 'green':
      return {
        soft: 'bg-emerald-500/12 text-emerald-200 border-emerald-400/20',
        strong: 'bg-emerald-400',
        icon: 'bg-emerald-500/12 text-emerald-200 ring-1 ring-emerald-400/20',
      };
    default:
      return {
        soft: 'bg-blue-500/12 text-blue-200 border-blue-400/20',
        strong: 'bg-blue-400',
        icon: 'bg-blue-500/12 text-blue-200 ring-1 ring-blue-400/20',
      };
  }
}

function ProgressBar({ value, tone }: { value: number; tone: Tone }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
      <div className={`h-full rounded-full ${toneClasses(tone).strong}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function SectionCard({ title, description, badge, icon: Icon, children }: { title: string; description?: string; badge?: string; icon: typeof Activity; children: React.ReactNode }) {
  return (
    <section className="glass-panel rounded-[28px] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-blue-200" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          {description ? <p className="mt-1 text-sm text-slate-300">{description}</p> : null}
        </div>
        {badge ? <div className="glass-chip rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200">{badge}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="glass-panel relative overflow-hidden rounded-[32px] p-6 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_22%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-blue-100">
                <Activity className="h-4 w-4" />
                Dashboard overview
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-4xl">Control center for client execution</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Track active clients, project momentum, delegated work, and decisions that need your attention from one place.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="glass-panel-soft rounded-2xl px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-300">Today</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
                  <CalendarRange className="h-4 w-4 text-blue-200" />
                  Monday · 4 key reviews
                </div>
              </div>
              <div className="glass-panel-soft rounded-2xl px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-300">Execution</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
                  <Clock3 className="h-4 w-4 text-emerald-200" />
                  11 tasks waiting for action
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, change, icon: Icon, tone }) => {
            const toneClass = toneClasses(tone);
            return (
              <article key={label} className="glass-panel-soft rounded-[24px] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-300">{label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
                  </div>
                  <div className={`rounded-2xl p-2.5 ${toneClass.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-slate-300">
                  <ArrowUpRight className="h-4 w-4" />
                  {change}
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <SectionCard title="Priority projects" description="Projects that need active steering this week." badge="3 in focus" icon={TrendingUp}>
            <div className="space-y-4">
              {focusProjects.map((item) => {
                const toneClass = toneClasses(item.tone);
                return (
                  <div key={item.project} className="glass-panel-soft rounded-2xl p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-400">{item.client}</div>
                        <div className="mt-1 text-base font-medium text-white">{item.project}</div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                          <span>{item.stage}</span>
                          <span className="text-slate-500">•</span>
                          <span>{item.owner}</span>
                        </div>
                      </div>
                      <div className="min-w-44">
                        <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
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
          </SectionCard>

          <SectionCard title="Today queue" icon={ListTodo}>
            <div className="space-y-4">
              {todayQueue.map((item) => {
                const toneClass = toneClasses(item.tone);
                return (
                  <div key={item.title} className="glass-panel-soft rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-white">{item.title}</div>
                        <div className="mt-1 text-sm text-slate-300">{item.detail}</div>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${toneClass.soft}`}>{item.priority}</span>
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-wide text-slate-400">{item.time}</div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <SectionCard title="Agent load" icon={Users}>
            <div className="space-y-4">
              {teamLoad.map((item) => {
                const toneClass = toneClasses(item.tone);
                return (
                  <div key={item.name} className="glass-panel-soft flex items-center justify-between rounded-2xl px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="mt-1 text-sm text-slate-300">{item.tasks} active tasks</div>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClass.soft}`}>{item.load}</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Recent activity" icon={Activity}>
            <div className="space-y-4">
              {activityFeed.map((item, index) => {
                const tone: Tone = index === 1 ? 'red' : index === 2 ? 'green' : 'blue';
                return (
                  <div key={item} className="glass-panel-soft flex gap-3 rounded-2xl p-4">
                    <div className={`mt-1 h-2.5 w-2.5 rounded-full ${toneClasses(tone).strong}`} />
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </section>
      </div>
    </AppShell>
  );
}
