"use client";

import React, { useState } from "react";
import { Compass, Sparkles, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const DIRECTIONAL_PHRASES = [
  { term: "Directly opposite / Facing", meaning: "Đối diện trực tiếp (băng qua đường/hồ nước)" },
  { term: "Adjacent to / Beside / Next to", meaning: "Nằm ngay sát bên cạnh" },
  { term: "Take the right-hand fork", meaning: "Rẽ theo nhánh bên tay phải ở ngã ba" },
  { term: "Clockwise / Counter-clockwise", meaning: "Theo chiều / Ngược chiều kim đồng hồ" },
  { term: "In the far north-eastern corner", meaning: "Nằm ở góc xa nhất phía Đông Bắc" },
  { term: "At the southern boundary / entrance", meaning: "Ở ranh giới phía Nam / cổng vào" },
];

export function DirectionIndicator({ className }: { className?: string }) {
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
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              La Bàn Định Vị & Từ Vựng Chỉ Phương Hướng
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Bí kíp bắt nhanh các cụm từ chỉ vị trí trong Section 2
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
          {/* Visual 8-Point Compass */}
          <div className="flex items-center justify-center py-2">
            <div className="relative h-28 w-28 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-secondary/20">
              <span className="absolute top-1 font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                NORTH (Bắc)
              </span>
              <span className="absolute bottom-1 font-bold text-muted-foreground text-xs">
                SOUTH (Nam)
              </span>
              <span className="absolute left-1 font-bold text-muted-foreground text-xs">
                WEST (Tây)
              </span>
              <span className="absolute right-1 font-bold text-muted-foreground text-xs">
                EAST (Đông)
              </span>
              <div className="h-10 w-10 rounded-full bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center">
                <Compass className="h-5 w-5 text-indigo-600 dark:text-indigo-400 animate-spin-slow" />
              </div>
            </div>
          </div>

          {/* Phrases cheat sheet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {DIRECTIONAL_PHRASES.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-secondary/30 border border-border/70 space-y-0.5"
              >
                <span className="font-bold text-foreground block text-[11px]">
                  📌 {item.term}
                </span>
                <span className="text-muted-foreground text-[10px]">
                  {item.meaning}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
