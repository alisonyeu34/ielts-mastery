"use client";

import React, { useState } from "react";
import {
  GitFork,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function TFNGDecisionTree({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <GitFork className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Cây Quyết Định 3 Bước (TFNG Decision Tree)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Phương pháp loại trừ logic: Phân biệt triệt để FALSE vs NOT GIVEN
            </p>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 space-y-4 border-t border-border/70 text-xs animate-in fade-in duration-150">
          {/* 3 Steps Visual Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1 */}
            <div
              onClick={() => setActiveStep(1)}
              className={cn(
                "p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5",
                activeStep === 1
                  ? "bg-indigo-500/10 border-indigo-500/40 shadow-sm"
                  : "bg-secondary/30 border-border/70 hover:bg-secondary/50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">
                  Bước 1: Quét Từ Khóa
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">1/3</span>
              </div>
              <p className="font-bold text-foreground text-[11px] leading-tight">
                Có tìm thấy từ khóa / paraphrase trong bài đọc không?
              </p>
              <div className="text-[10px] text-muted-foreground pt-1 border-t border-border/60">
                ❌ Không thấy ➔ 90% <strong>NOT GIVEN</strong>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setActiveStep(2)}
              className={cn(
                "p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5",
                activeStep === 2
                  ? "bg-emerald-500/10 border-emerald-500/40 shadow-sm"
                  : "bg-secondary/30 border-border/70 hover:bg-secondary/50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  Bước 2: Đối Chiếu Khẳng Định
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">2/3</span>
              </div>
              <p className="font-bold text-foreground text-[11px] leading-tight">
                Bài đọc có xác nhận thông tin khẳng định này không?
              </p>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 pt-1 border-t border-border/60 font-semibold">
                ✅ Xác nhận đúng ➔ <strong>TRUE</strong>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setActiveStep(3)}
              className={cn(
                "p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5",
                activeStep === 3
                  ? "bg-rose-500/10 border-rose-500/40 shadow-sm"
                  : "bg-secondary/30 border-border/70 hover:bg-secondary/50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">
                  Bước 3: Mâu Thuẫn vs Thiếu Dữ Liệu
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">3/3</span>
              </div>
              <p className="font-bold text-foreground text-[11px] leading-tight">
                Mâu thuẫn ngược 180° hay chỉ là không đủ dữ liệu chứng minh?
              </p>
              <div className="text-[10px] text-muted-foreground pt-1 border-t border-border/60">
                🔄 Ngược 180° ➔ <strong>FALSE</strong> | ❓ Không rõ ➔ <strong>NOT GIVEN</strong>
              </div>
            </div>
          </div>

          {/* Golden Rule Callout */}
          <div className="p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 flex items-start gap-2 text-[11px] text-muted-foreground">
            <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">Quy tắc vàng của Cambridge:</strong>{" "}
              "TRUE là đúng theo bài đọc. FALSE là bài đọc nói NGƯỢC LẠI. NOT GIVEN là bài đọc KHÔNG THỂ CHỨNG MINH là đúng hay sai (kể cả điều đó đúng ngoài đời thực)."
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
