"use client";

import React, { useEffect, useState } from "react";
import { registerServiceWorker } from "@/lib/pwaServiceWorkerManager";
import { Share, PlusSquare, X, Smartphone, Sparkles } from "lucide-react";

export function PWARegister() {
  const [showIOSPrompt, setShowIOSPrompt] = useState<boolean>(false);

  useEffect(() => {
    // 1. Register Service Worker for PWA offline capabilities & fast caching
    registerServiceWorker();

    // 2. Detect if user is on iOS Safari and NOT yet in standalone mode
    if (typeof window !== "undefined") {
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as any).standalone === true;

      const isDismissed = localStorage.getItem("ielts_ios_prompt_dismissed") === "true";

      // Show gentle prompt if on iPhone/iPad Safari and not already installed
      if (isIOS && !isStandalone && !isDismissed) {
        const timer = setTimeout(() => {
          setShowIOSPrompt(true);
        }, 3000); // 3 seconds delay for smooth page load
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowIOSPrompt(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("ielts_ios_prompt_dismissed", "true");
    }
  };

  if (!showIOSPrompt) return null;

  return (
    <aside
      aria-label="Cài đặt ứng dụng trên iPhone"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-primary/30 bg-card/95 p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom duration-300 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-red-800 to-rose-600 text-white shadow-md">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-foreground">
                Cài đặt App trên iPhone
              </span>
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                iPhone X
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Mở toàn màn hình, mượt mà và không dính thanh địa chỉ
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
          aria-label="Đóng thông báo"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 space-y-2 rounded-xl bg-secondary/60 p-3 text-xs text-foreground/90 border border-border/60 font-medium">
        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[11px] font-bold">
            1
          </span>
          <span className="flex items-center gap-1.5 flex-wrap">
            Bấm vào nút <strong>Chia sẻ</strong>{" "}
            <Share className="inline h-3.5 w-3.5 text-blue-500 mx-0.5" /> ở thanh dưới Safari
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[11px] font-bold">
            2
          </span>
          <span className="flex items-center gap-1.5 flex-wrap">
            Cuộn xuống và chọn{" "}
            <strong className="text-primary flex items-center gap-1">
              <PlusSquare className="h-3.5 w-3.5 inline text-primary" /> Thêm vào MH chính
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
            ✓
          </span>
          <span className="text-muted-foreground text-[11px]">
            Icon app sẽ xuất hiện trên màn hình iPhone như app cài từ App Store!
          </span>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-xl bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Đã Hiểu
        </button>
      </div>
    </aside>
  );
}
