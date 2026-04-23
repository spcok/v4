import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { AuthState } from '../features/auth/authStore';
import { SyncStatusBadge } from '../components/SyncStatusBadge';

interface RouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[var(--color-root-bg)] text-slate-200/50">
      <header className="h-12 border-b border-[#2e323a] bg-[var(--color-card-bg)] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[var(--color-primary)] rounded-sm"></div>
          <span className="font-mono text-sm font-bold tracking-tight text-white uppercase">KOA MANAGER V3</span>
          <span className="px-2 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-mono border border-[var(--color-primary)]/20 uppercase">ZLA-1981 COMPLIANT</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-mono">
          <SyncStatusBadge />
        </div>
      </header>
      <main className="flex-1 flex flex-col bg-[var(--color-input-bg)] p-6 gap-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  ),
});
