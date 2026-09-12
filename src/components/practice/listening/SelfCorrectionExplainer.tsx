"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SelfCorrectionExplainer({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <RotateCcw className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Mổ Xẻ Bẫy Người Nói Tự Đính Chính (Self-Correction Trap)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Bẫy mất điểm nhiều nhất trong Section 1
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
        <div className="p-4 pt-1 space-y-3 border-t border-border/70 text-xs animate-in fade-in duration-150">
          <p className="text-muted-foreground leading-relaxed">
            Trong Section 1, người nói thường cố tình đưa ra một thông tin ban đầu (để gài bẫy người nghe vội vàng ghi chép), sau đó dùng một từ nối chuyển hướng để đính chính lại thông tin thật.
          </p>

          {/* 3-Step Pattern Anatomy */}
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
              <span className="h-5 w-5 rounded-full bg-rose-500/20 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Thông tin giả ban đầu (Distractor):</span>
            </div>
            <p className="font-mono text-[11px] text-rose-600/90 dark:text-rose-400/90 line-through pl-7">
              "Well, I was thinking of starting on the 14th of October..."
            </p>

            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold pt-1">
              <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Tín hiệu bẻ lái (Pivot Cues):</span>
            </div>
            <p className="text-[11px] text-muted-foreground pl-7 font-semibold">
              "...oh wait, hang on, actually, sorry, let's make it..."
            </p>

            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold pt-1">
              <span className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Thông tin chốt hạ cuối cùng (Correct Answer):</span>
            </div>
            <p className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold pl-7">
              "...the 21st of October instead, please."
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-[11px] text-muted-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <span>
              <strong>Quy tắc vàng:</strong> "Không bao giờ vội viết ngay đáp án khi câu nói chưa kết thúc. Luôn kiên nhẫn nghe xem người nói có nói 'sorry' hoặc 'actually' không."
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
