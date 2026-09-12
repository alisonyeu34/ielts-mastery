"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PEEL_STEMS = [
  {
    element: "P - Point (Câu Chủ Đề)",
    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
    stems: [
      "The primary justification for [Topic] is that...",
      "On the one hand, it is widely acknowledged that...",
      "Furthermore, another compelling argument in favor of [Topic] is...",
      "To begin with, the most significant advantage of [X] lies in...",
    ],
  },
  {
    element: "E - Explanation (Giải Thích Bản Chất)",
    color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    stems: [
      "This is largely attributable to the fact that...",
      "In other words, when [Condition occurs], it inevitably leads to [Outcome]...",
      "This mechanism ensures that...",
      "The underlying reason is that...",
    ],
  },
  {
    element: "E - Example (Dẫn Chứng Cụ Thể)",
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    stems: [
      "A compelling illustration of this can be seen in...",
      "Empirical research published by [Organization] consistently demonstrates that...",
      "For instance, recent public health initiatives in [Country] revealed that...",
      "Take [Country / Case study] as a prime example, where...",
    ],
  },
  {
    element: "L - Link (Câu Chốt Ý Nghĩa)",
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    stems: [
      "Consequently, it is evident that [Point] plays an indispensable role in...",
      "Thus, [Action] serves as a direct catalyst for resolving [Problem]...",
      "Hence, this reinforces the view that...",
      "Therefore, the pragmatic benefits of [X] are undeniable.",
    ],
  },
];

export function PEELGuidanceDrawer({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <span>Cẩm Nang Cấu Trúc Câu Mẫu & Từ Nối PEEL (Band 7.5+ Toolkit)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                Cheat Sheet
              </span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Kho câu mẫu mở đầu cho từng khối Point ➔ Explain ➔ Example ➔ Link
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
        <div className="p-4 sm:p-6 pt-1 space-y-4 border-t border-border/70 text-xs animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PEEL_STEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-secondary/30 border border-border/70 space-y-2 text-xs"
              >
                <span
                  className={cn(
                    "text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider inline-block",
                    item.color
                  )}
                >
                  {item.element}
                </span>

                <ul className="space-y-1.5 pl-4 list-disc text-[11px] text-foreground/90 font-serif">
                  {item.stems.map((stem, sIdx) => (
                    <li key={sIdx} className="leading-snug">
                      <code>{stem}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
