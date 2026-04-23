import { useStatus } from '@powersync/react';
import { Wifi, WifiOff } from 'lucide-react';

export function SyncStatusBadge() {
  const status = useStatus();

  return (
    <div className="flex items-center gap-2 bg-[#1c1f26] border border-[#2e323a] px-3 py-1.5 rounded shadow-sm relative z-50">
      {status.connected ? (
        <>
          <Wifi className="w-3.5 h-3.5 text-green-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-green-500">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">Sync Offline</span>
        </>
      )}
    </div>
  );
}
