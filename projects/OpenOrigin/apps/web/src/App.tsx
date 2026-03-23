import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Clock, Code2, Layers3, MoreHorizontal, Plus, Square, TrendingUp, UserRound, Video, Zap } from 'lucide-react';
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

const projects = [
  { icon: Zap, color: 'bg-blue-500', title: 'Develop API Endpoints', due: 'Nov 26, 2024', health: 'On track', progress: 82 },
  { icon: Layers3, color: 'bg-cyan-500', title: 'Onboarding Flow', due: 'Nov 28, 2024', health: 'Needs review', progress: 64 },
  { icon: Code2, color: 'bg-emerald-500', title: 'Build Dashboard', due: 'Nov 30, 2024', health: 'Shipping', progress: 91 },
  { icon: Zap, color: 'bg-amber-500', title: 'Optimize Page Load', due: 'Dec 5, 2024', health: 'At risk', progress: 43 },
  { icon: CalendarDays, color: 'bg-violet-500', title: 'Cross-Browser Testing', due: 'Dec 6, 2024', health: 'Queued', progress: 28 },
] as const;

const tasks = [
  { title: 'Review pull request #42', project: 'API Development', priority: 'high', status: 'In Progress', due: 'Today' },
  { title: 'Update user documentation', project: 'Documentation', priority: 'medium', status: 'Pending', due: 'Tomorrow' },
  { title: 'Fix navigation bug on mobile', project: 'Frontend', priority: 'high', status: 'Completed', due: 'Yesterday' },
  { title: 'Design new landing page', project: 'Marketing', priority: 'low', status: 'In Progress', due: 'Dec 10' },
  { title: 'Write unit tests for auth', project: 'Testing', priority: 'medium', status: 'Pending', due: 'Dec 8' },
] as const;

const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const gridDay = index - 3;
  const isToday = gridDay === 23;
  const isCurrentMonth = gridDay > 0 && gridDay <= 31;
  return { day: gridDay <= 0 ? 30 + gridDay : gridDay, isToday, isCurrentMonth };
});

const calendarEvents = [
  { day: 23, title: 'Team Standup', time: '10:00', type: 'emerald' },
  { day: 23, title: 'Client Call', time: '14:00', type: 'blue' },
  { day: 25, title: 'Sprint Review', time: '15:00', type: 'amber' },
  { day: 27, title: 'Design Review', time: '11:00', type: 'rose' },
] as const;

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-500 hover:shadow-xl', className)}>{children}</div>;
}

function SectionHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="mb-1 text-xl font-bold text-foreground md:text-2xl lg:text-3xl">{title}</h1>
        <p className="text-xs text-muted-foreground md:text-sm">{description}</p>
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, detail, primary }: { label: string; value: string; detail: string; primary?: boolean }) {
  return (
    <Card
      className={cn(
        'group cursor-pointer p-3.5 transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl md:p-4',
        primary ? 'bg-[hsl(221.2_83.2%_53.3%)] text-primary-foreground shadow-lg shadow-[0_18px_40px_rgba(59,130,246,0.28)] hover:shadow-[0_24px_50px_rgba(59,130,246,0.36)]' : 'bg-card text-foreground shadow-lg',
      )}
    >
      <div className="mb-2.5 flex items-start justify-between">
        <h3 className="text-[11px] font-medium opacity-90">{label}</h3>
        <div className={cn('flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110', primary ? 'bg-primary-foreground/20' : 'bg-primary')}>
          <ArrowUpRight className="h-3 w-3 text-primary-foreground" />
        </div>
      </div>
      <p className="mb-2 text-3xl font-bold leading-none">{value}</p>
      <div className="flex items-center gap-1.5 text-[11px] opacity-80">
        {detail.includes('Increased') ? <TrendingUp className="h-3 w-3" /> : null}
        <span>{detail}</span>
      </div>
    </Card>
  );
}

function TeamStatusPill({ tone, text }: { tone: 'emerald' | 'amber' | 'rose'; text: string }) {
  const map = {
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  };

  return <span className={cn('whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium', map[tone])}>{text}</span>;
}

function PriorityBadge({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  const map = {
    high: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };
  return <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium uppercase', map[priority])}>{priority}</span>;
}

function ProjectIcon({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110', color)}>
      <Icon className="h-5 w-5 text-white" />
    </div>
  );
}

function DashboardView({ searchQuery }: { searchQuery: string }) {
  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const visibleProjects = searchQuery ? filteredProjects : projects;

  return (
    <div className="space-y-4 md:space-y-5">
      <SectionHeader
        title="Dashboard"
        description="Plan, prioritize, and keep every client project moving."
        action={
          <div className="flex flex-col gap-2 sm:flex-row">
            <button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
              + Add Project
            </button>
            <button className="h-9 rounded-md border border-border bg-transparent px-4 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-md">
              Import Data
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <Card className="bg-gradient-to-br from-background to-muted/20 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Project Analytics</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-emerald-600" />
                <span>Weekly Activity</span>
              </div>
            </div>
            <div className="relative mb-4 h-64 overflow-hidden rounded-xl border border-border/60 bg-gradient-to-b from-background to-muted/30 p-5">
              <div className="absolute inset-0 grid grid-rows-4 px-5 py-5">
                {[0, 1, 2, 3].map((row) => (
                  <div key={row} className="border-b border-border/50 last:border-b-0" />
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-3 px-5 pb-5">
                {[42, 55, 39, 66, 58, 78, 69, 88, 73, 92].map((height, index) => (
                  <div key={index} className="flex h-full flex-1 items-end justify-center">
                    <div className="w-full rounded-t-[10px] bg-primary shadow-[0_8px_18px_rgba(59,130,246,0.22)]" style={{ height: `${height}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-muted/50 pt-4 text-sm">
              <div><span className="text-muted-foreground">Average: </span><span className="font-semibold text-foreground">62%</span></div>
              <div><span className="text-muted-foreground">Peak: </span><span className="font-semibold text-emerald-600">92%</span></div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Projects</h2>
              <button className="inline-flex h-8 items-center rounded-md border border-border bg-transparent px-3 text-sm transition-all duration-300 hover:scale-105">
                <Plus className="mr-1 h-4 w-4" />
                New
              </button>
            </div>
            <div className="space-y-3">
              {visibleProjects.map((project) => (
                <div key={project.title} className="group rounded-lg border border-transparent p-3 transition-all duration-300 hover:border-border hover:bg-secondary/60">
                  <div className="flex items-center gap-3">
                    <ProjectIcon icon={project.icon} color={project.color} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-medium text-foreground">{project.title}</p>
                        <button className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Due {project.due}</span>
                        <span>•</span>
                        <span>{project.health}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <Card className="p-5 md:p-6">
            <h2 className="mb-5 text-xl font-semibold text-foreground">Reminders</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <h3 className="mb-1 font-semibold text-foreground">Meeting with Arc Company</h3>
                <p className="mb-4 text-sm text-muted-foreground">Time: 02:00 pm - 04:00 pm</p>
                <button className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">
                  <Video className="mr-2 h-4 w-4" />
                  Start Meeting
                </button>
              </div>
            </div>
          </Card>

          <Card className="p-5 md:p-6">
            <h2 className="mb-5 text-xl font-semibold text-foreground">Team Collaboration</h2>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.name} className="group flex items-center gap-4 rounded-lg p-3 transition-all duration-300 hover:bg-secondary">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground ring-2 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/40">
                    {member.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">Working on <span className="font-medium">{member.task}</span></p>
                  </div>
                  <TeamStatusPill tone={member.tone} text={member.status} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TasksView({ searchQuery }: { searchQuery: string }) {
  const visibleTasks = tasks.filter((task) => `${task.title} ${task.project}`.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-4 md:space-y-5">
      <SectionHeader
        title="Tasks"
        description="Track execution, priorities, and deadlines across every project."
        action={<button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">+ Add Task</button>}
      />
      <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Task Queue</h2>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{visibleTasks.length} items</span>
          </div>
          <div className="space-y-3">
            {visibleTasks.map((task) => (
              <div key={task.title} className="group flex items-start gap-3 rounded-lg border border-transparent p-3 transition-all duration-300 hover:border-border hover:bg-secondary/60">
                <div className={cn('mt-0.5 flex h-4 w-4 items-center justify-center rounded border-2', task.status === 'Completed' ? 'border-emerald-500 bg-emerald-500' : 'border-border')}>
                  {task.status === 'Completed' ? <div className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className={cn('truncate text-sm font-medium', task.status === 'Completed' && 'text-muted-foreground line-through')}>{task.title}</p>
                    <PriorityBadge priority={task.priority} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{task.project}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{task.due}</span>
                    <span>{task.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Execution Summary</h2>
          <div className="space-y-4">
            {[
              ['Completed', '28', 'bg-emerald-500'],
              ['In Progress', '12', 'bg-amber-500'],
              ['Pending', '9', 'bg-rose-500'],
            ].map(([label, value, tone]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted"><div className={cn('h-full rounded-full', tone)} style={{ width: `${Number(value) * 2.5}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function CalendarView() {
  return (
    <div className="space-y-4 md:space-y-5">
      <SectionHeader
        title="Calendar"
        description="See delivery milestones, client calls, and review windows in one place."
        action={
          <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1">
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
            <span className="px-2 text-sm font-medium">December 2024</span>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
          </div>
        }
      />
      <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-6">
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="py-2 font-medium text-muted-foreground">{day}</div>
            ))}
            {calendarDays.map(({ day, isToday, isCurrentMonth }, index) => {
              const events = calendarEvents.filter((event) => event.day === day);
              return (
                <div key={index} className={cn('min-h-24 rounded-xl border p-2 text-left', isCurrentMonth ? 'border-border bg-background' : 'border-transparent bg-muted/30 opacity-45')}>
                  {isCurrentMonth ? (
                    <>
                      <div className="mb-2 flex justify-end">
                        <span className={cn('flex h-7 w-7 items-center justify-center rounded-full text-sm', isToday ? 'bg-primary font-semibold text-primary-foreground' : 'text-foreground')}>
                          {day}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {events.map((event) => (
                          <div key={event.title} className={cn('rounded-md px-2 py-1 text-[10px] font-medium', event.type === 'emerald' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', event.type === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', event.type === 'amber' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', event.type === 'rose' && 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400')}>
                            {event.time} {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Upcoming Events</h2>
          <div className="space-y-3">
            {calendarEvents.map((event) => (
              <div key={`${event.day}-${event.title}`} className="rounded-lg border border-border p-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <span className="text-xs text-muted-foreground">Dec {event.day}</span>
                </div>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-4 md:space-y-5">
      <SectionHeader title="Analytics" description="Measure workload, delivery velocity, and team throughput." />
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['Velocity', '18 tasks/week'],
          ['Cycle Time', '2.4 days'],
          ['Client Satisfaction', '96%'],
        ].map(([label, value]) => (
          <Card key={label} className="p-6">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Weekly Delivery Trend</h2>
        <div className="flex h-56 items-end gap-3">
          {[42, 60, 58, 72, 68, 84, 76].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-lg bg-primary" style={{ height: `${height}%` }} />
              <span className="text-[11px] text-muted-foreground">W{index + 1}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function TeamView({ searchQuery }: { searchQuery: string }) {
  const visibleMembers = teamMembers.filter((member) => `${member.name} ${member.task}`.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-4 md:space-y-5">
      <SectionHeader
        title="Team"
        description="Keep delivery owners, contributors, and workstreams aligned."
        action={<button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">+ Invite Member</button>}
      />
      <Card className="p-6">
        <div className="space-y-4">
          {visibleMembers.map((member) => (
            <div key={member.name} className="flex items-center gap-4 rounded-xl border border-border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{member.initials}</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.task}</p>
              </div>
              <div className="hidden text-right text-xs text-muted-foreground md:block">
                <p>Owner</p>
                <p>4 active tasks</p>
              </div>
              <TeamStatusPill tone={member.tone} text={member.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  const { currentView, searchQuery } = useUIStore();

  return (
    <AppShell>
      {currentView === 'dashboard' ? <DashboardView searchQuery={searchQuery} /> : null}
      {currentView === 'tasks' ? <TasksView searchQuery={searchQuery} /> : null}
      {currentView === 'calendar' ? <CalendarView /> : null}
      {currentView === 'analytics' ? <AnalyticsView /> : null}
      {currentView === 'team' ? <TeamView searchQuery={searchQuery} /> : null}

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <Card className="group relative overflow-hidden bg-foreground p-4 text-background transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
            <svg className="absolute bottom-0 h-[100px] w-full" viewBox="0 0 200 60" preserveAspectRatio="none">
              <path d="M0,30 Q25,15 50,30 T100,30 T150,30 T200,30 L200,60 L0,60 Z" fill="oklch(0.42 0.15 155)" opacity="0.3" />
              <path d="M0,40 Q25,25 50,40 T100,40 T150,40 T200,40 L200,60 L0,60 Z" fill="oklch(0.42 0.15 155)" />
            </svg>
          </div>
          <div className="relative z-10">
            <UserRound className="mb-3 h-6 w-6" />
            <h2 className="mb-1 text-xl font-bold">Client Workspace Ready</h2>
            <p className="mb-4 text-xs opacity-80">Next step: connect real clients, projects, and task records.</p>
          </div>
        </Card>

        <Card className="group relative overflow-hidden bg-foreground p-4 text-background transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative z-10">
            <h2 className="mb-4 text-lg font-semibold">Focus Timer</h2>
            <div className="mb-4 font-mono text-4xl font-bold tracking-tight sm:text-5xl">24:00:08</div>
            <div className="flex gap-3">
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-300 hover:scale-110 hover:bg-background/90">
                <Video className="h-4 w-4" />
              </button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white transition-all duration-300 hover:scale-110 hover:bg-rose-600">
                <Square className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
