"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg text-center space-y-5">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-1">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Đã Xảy Ra Lỗi Không Mong Muốn
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Hệ thống gặp sự cố tạm thời khi tải trang. Dữ liệu học tập trong máy của bạn vẫn an toàn.
          </p>
        </div>

        {error?.message && (
          <div className="p-3 rounded-xl bg-muted text-[11px] font-mono text-muted-foreground text-left overflow-x-auto max-h-32">
            {error.message}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Tải Lại Trang</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Về Trang Chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
