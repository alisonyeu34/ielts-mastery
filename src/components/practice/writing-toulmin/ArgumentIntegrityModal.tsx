"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ArgumentIntegrityModal({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
        <span>Bản Đồ Tư Duy Mô Hình Toulmin</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h3 className="text-base font-extrabold text-foreground">
                  Mô Hình Lập Luận 6 Thành Phần Toulmin (Band 8.0+ Framework)
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Visual Logic Flow Diagram */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                Cơ Chế Khép Kín Của Lập Luận Chặt Chẽ:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <strong className="text-blue-600 dark:text-blue-400 block">1. Claim (Luận điểm)</strong>
                  <span className="text-[10px] text-muted-foreground">Tuyên bố cốt lõi</span>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center">
                  <strong className="text-purple-600 dark:text-purple-400 block">3. Warrant (Cầu nối)</strong>
                  <span className="text-[10px] text-muted-foreground">Vì sao Data chứng minh Claim?</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <strong className="text-emerald-600 dark:text-emerald-400 block">2. Data (Bằng chứng)</strong>
                  <span className="text-[10px] text-muted-foreground">Nghiên cứu / Số liệu</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <strong className="text-amber-600 dark:text-amber-400 block">5. Counter-Argument (Nhượng bộ)</strong>
                  <span className="text-[10px] text-muted-foreground">Góc nhìn phe đối lập</span>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <strong className="text-rose-600 dark:text-rose-400 block">6. Rebuttal (Phản đòn)</strong>
                  <span className="text-[10px] text-muted-foreground">Bẻ gãy & Củng cố Claim</span>
                </div>
              </div>
            </div>

            {/* 2 Common Critical Errors */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-600">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Bẫy 1: Nhảy cóc logic (Missing Warrant)</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Thí sinh thường đưa ra Data (ví dụ: *Nước Đức dùng nhiều robot*) rồi kết luận ngay Claim (*vậy robot tạo ra việc làm*) mà quên giải thích cơ chế ở giữa (*Warrant: robot giảm chi phí đơn vị ➔ kích thích tiêu dùng ➔ mở rộng ngành dịch vụ mới*).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-600">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Bẫy 2: Tự bắn vào chân (Orphaned Counter-Argument)</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Nêu ra luận điểm đối lập (*Admittedly, automation causes unemployment...*) nhưng câu tiếp theo lại quên viết Rebuttal bác bỏ, khiến giám khảo cảm thấy lập trường của bạn bị lung lay.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Đã nắm vững phương pháp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
