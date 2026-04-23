import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: Index,
});

function Index() {
  return (
    <div className="bg-[var(--color-card-bg)] border border-[#2e323a] p-4 text-slate-400 max-w-3xl">
      <h2 className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-tight mb-2">Dashboard</h2>
      <p className="font-mono text-xs text-slate-400 mt-1">
        Nuclear Infrastructure & Environment Lock complete. Routing and Auth Guard operational.
      </p>
    </div>
  );
}
