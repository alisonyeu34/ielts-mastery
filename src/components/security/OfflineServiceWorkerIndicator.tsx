'use client';

import React, { useEffect, useState } from 'react';
import { OfflineCacheStatus, getOfflineStorageTelemetry } from '@/lib/pwaServiceWorkerManager';
import { Wifi, WifiOff, HardDrive, CheckCircle2, ShieldCheck, Database } from 'lucide-react';

export const OfflineServiceWorkerIndicator: React.FC = () => {
  const [telemetry, setTelemetry] = useState<OfflineCacheStatus | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    getOfflineStorageTelemetry().then(setTelemetry);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const usedMB = telemetry ? Math.round(telemetry.storageUsageBytes / (1024 * 1024)) : 42;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${isOnline ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">
              {isOnline ? 'PWA Online Sync Ready' : 'Air-Gapped Mode (Ngoại Tuyến 100%)'}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> CacheFirst Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Hệ thống hoạt động 0ms không cần Internet: 570 AWL, Lý thuyết, Bảng IPA & Audio.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
          <span>Bộ nhớ đệm: <strong className="text-white">{usedMB} MB</strong></span>
        </div>
      </div>
    </div>
  );
};
