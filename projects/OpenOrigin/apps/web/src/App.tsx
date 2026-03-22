import { useQuery } from '@tanstack/react-query';
import { Activity, ArrowRight, Database, Workflow } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { fetchApi } from '@/services/api';

type HealthResponse = {
  status: string;
  service: string;
};

export default function App() {
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: () => fetchApi<HealthResponse>('/api/v1/health'),
  });

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">OpenOrigin</h2>
              <p className="mt-1 text-sm text-slate-500">
                A client-work operating system centered on delegation and execution.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              <Activity className="h-4 w-4" />
              {healthQuery.data?.status ?? 'Connecting'}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-4">
              <Workflow className="mb-3 h-5 w-5 text-slate-700" />
              <div className="text-sm font-medium">Delegation layer</div>
              <p className="mt-2 text-sm text-slate-500">Route work across client and project agents with clear ownership.</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <Database className="mb-3 h-5 w-5 text-slate-700" />
              <div className="text-sm font-medium">Supabase-backed data</div>
              <p className="mt-2 text-sm text-slate-500">Store structured records for clients, projects, tasks, and runs.</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <ArrowRight className="mb-3 h-5 w-5 text-slate-700" />
              <div className="text-sm font-medium">Execution workflow</div>
              <p className="mt-2 text-sm text-slate-500">Track planning, execution, updates, and outcomes in one place.</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Initial modules</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Client registry</li>
              <li>Project workspace</li>
              <li>Task delegation queue</li>
              <li>Agent run history</li>
            </ul>
          </section>
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Backend status</h3>
            <p className="mt-4 text-sm text-slate-600">
              {healthQuery.isError
                ? 'API is not reachable yet. Start the FastAPI service to enable live data.'
                : `Connected to ${healthQuery.data?.service ?? 'service'}.`}
            </p>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
