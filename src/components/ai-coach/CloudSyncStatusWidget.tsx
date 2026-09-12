"use client";

import React, { useRef } from "react";
import { useCloudSync } from "@/hooks/useCloudSync";
import {
  Cloud,
  CloudOff,
  RefreshCw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CloudSyncStatusWidgetProps {
  className?: string;
}

export function CloudSyncStatusWidget({ className }: CloudSyncStatusWidgetProps) {
  const {
    metrics,
    isSyncing,
    syncSuccessMessage,
    triggerCloudSync,
    exportBackup,
    importBackup,
  } = useCloudSync();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importBackup(file);
    }
  };

  const isOnline = metrics.state !== "offline";

  return (
    <div
      className={cn(
        "p-4 sm:p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3.5 select-none",
        className
      )}
    >
      {/* Header & Status Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-2xl font-bold shadow-sm",
              isOnline ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
            )}
          >
            {isOnline ? <Cloud className="h-5 w-5" /> : <CloudOff className="h-5 w-5" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-extrabold text-foreground">
                Lưu Trữ & Đồng Bộ Dữ Liệu
              </h4>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border",
                  metrics.state === "synced"
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                    : metrics.state === "offline"
                    ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                    : "bg-indigo-500/10 text-indigo-600 border-indigo-500/30 animate-pulse"
                )}
              >
                {metrics.state === "synced"
                  ? "Đã Đồng Bộ An Toàn"
                  : metrics.state === "offline"
                  ? "Lưu Trữ Trên Máy (Offline)"
                  : "Đang Đồng Bộ..."}
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Tự động lưu bài học trực tiếp trên máy của bạn và đồng bộ lên tài khoản khi có mạng.
            </p>
          </div>
        </div>

        {/* Sync Trigger Button */}
        <button
          type="button"
          onClick={triggerCloudSync}
          disabled={isSyncing || !isOnline}
          className={cn(
            "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto",
            isOnline
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
              : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50"
          )}
        >
          <RefreshCw className={cn("h-3.5 w-3.5", isSyncing ? "animate-spin" : "")} />
          <span>{isSyncing ? "Đang Đồng Bộ..." : "Đồng Bộ Ngay"}</span>
        </button>
      </div>

      {/* Sync Success Alert */}
      {syncSuccessMessage && (
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{syncSuccessMessage}</span>
        </div>
      )}

      {/* Metrics Row & Backup Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-muted-foreground font-mono text-[11px]">
          <span className="flex items-center gap-1">
            <HardDrive className="h-3.5 w-3.5 text-foreground" />
            <span>{metrics.totalLocalRecords} Mục dữ liệu trên máy</span>
          </span>

          <span>•</span>

          <span>
            Đồng bộ gần nhất:{" "}
            <strong className="text-foreground">
              {metrics.lastSyncedAt ? new Date(metrics.lastSyncedAt).toLocaleTimeString() : "Vừa xong"}
            </strong>
          </span>
        </div>

        {/* Offline Backup Export / Import */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportBackup}
            className="px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-[11px] font-bold border border-border flex items-center gap-1 cursor-pointer"
            title="Xuất toàn bộ dữ liệu ra tệp JSON dự phòng"
          >
            <Download className="h-3 w-3" />
            <span>Sao Lưu JSON</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-[11px] font-bold border border-border flex items-center gap-1 cursor-pointer"
            title="Nhập dữ liệu từ tệp JSON đã sao lưu"
          >
            <Upload className="h-3 w-3" />
            <span>Khôi Phục JSON</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
