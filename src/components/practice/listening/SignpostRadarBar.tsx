"use client";

import React, { useState } from "react";
import {
  Radio,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Compass,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SignpostRadarBarProps {
  signposts: Array<{
    id: string;
    cuePhrase: string;
    timestamp: string;
    subTopic: string;
  }>;
  activeSignpostIndex?: number;
  className?: string;
}

export function SignpostRadarBar({
  signposts,
  activeSignpostIndex = 0,
  className,
}: SignpostRadarBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={cn(
        "rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-card via-indigo-500/[0.03] to-card overflow-hidden shadow-sm transition-all",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Radio className="h-4 w-4 animate-pulse text-indigo-500" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
              <span>Bộ Radar Bắt Từ Báo Hiệu Chuyển Ý (Signposting Radar)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                Live Guide
              </span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Bắt kịp các cụm từ chuyển đoạn để không bao giờ bị mất dấu bài giảng
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
        <div className="p-4 pt-1 space-y-2.5 border-t border-border/70 text-xs animate-in fade-in duration-150">
          <p className="text-muted-foreground text-[11px]">
            Trong Section 4, giảng viên luôn dùng các cụm từ chuyển đoạn cố định để báo hiệu khi chuyển từ ý này sang ý khác. Hãy chú ý các từ khóa sau:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {signposts.map((sp, idx) => {
              const isActive = idx === activeSignpostIndex;

              return (
                <div
                  key={sp.id}
                  className={cn(
                    "p-2.5 rounded-xl border transition-all duration-200 space-y-1 text-xs",
                    isActive
                      ? "bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20"
                      : "bg-secondary/30 border-border/70 text-muted-foreground"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      ~{sp.timestamp}
                    </span>
                    {isActive && (
                      <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                    )}
                  </div>

                  <span className="font-bold text-foreground text-[11px] block">
                    "{sp.cuePhrase}"
                  </span>

                  <span className="text-[10px] text-muted-foreground block truncate">
                    ➔ {sp.subTopic}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
