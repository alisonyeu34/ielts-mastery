"use client";

import React from "react";
import { MockPassType } from "@/hooks/useCDIELTSMockSession";
import {
  Timer,
  SearchCode,
  Microscope,
  CheckCircle2,
  Lock,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreePassProtocolSwitcherProps {
  currentPass: MockPassType;
  onSelectPass: (pass: MockPassType) => void;
  isPass1Completed: boolean;
  isPass2Completed: boolean;
  className?: string;
}

export function ThreePassProtocolSwitcher({
  currentPass,
  onSelectPass,
  isPass1Completed,
  isPass2Completed,
  className,
}: ThreePassProtocolSwitcherProps) {
  const passes = [
    {
      id: "pass1" as MockPassType,
      number: 1,
      title: "Pass 1: Áp Lực Phòng Thi",
      subtitle: "Strict Timed Run • Không Từ Điển",
      icon: <Timer className="h-4 w-4" />,
      isLocked: false,
      isDone: isPass1Completed,
      color: "from-red-500 to-rose-600",
      badgeText: "Đo Lường Điểm Thực Tế",
    },
    {
      id: "pass2" as MockPassType,
      number: 2,
      title: "Pass 2: Đào Sâu Tự Lực",
      subtitle: "Untimed Deep Dive • Tra Từ Điển",
      icon: <SearchCode className="h-4 w-4" />,
      isLocked: !isPass1Completed,
      isDone: isPass2Completed,
      color: "from-indigo-500 to-purple-600",
      badgeText: "Cô Lập Lỗi Áp Lực Thời Gian",
    },
    {
      id: "pass3" as MockPassType,
      number: 3,
      title: "Pass 3: Giải Phẫu Khảo Thí",
      subtitle: "Forensic Audit • Thu Hoạch Từ Vựng",
      icon: <Microscope className="h-4 w-4" />,
      isLocked: !isPass1Completed,
      isDone: false,
      color: "from-emerald-500 to-teal-600",
      badgeText: "Mổ Xẻ Bẫy & Ma Trận Paraphrase",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-sm space-y-2 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          <span>Quy Trình Sư Phạm "1 Đề Làm 3 Lần" (The 3-Pass Protocol):</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {passes.map((p) => {
          const isActive = currentPass === p.id;

          return (
            <button
              key={p.id}
              type="button"
              disabled={p.isLocked}
              onClick={() => onSelectPass(p.id)}
              className={cn(
                "p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer group",
                isActive
                  ? "bg-gradient-to-r text-white shadow-md ring-2 ring-indigo-500/20 " + p.color
                  : p.isLocked
                  ? "bg-secondary/40 border-border/50 text-muted-foreground opacity-60 cursor-not-allowed"
                  : "bg-card border-border hover:border-indigo-500/40 hover:bg-secondary/60 text-foreground"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-xl",
                      isActive ? "bg-white/20 text-white" : "bg-secondary text-foreground"
                    )}
                  >
                    {p.icon}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-extrabold",
                      isActive ? "text-white" : "text-foreground"
                    )}
                  >
                    {p.title}
                  </span>
                </div>

                {p.isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : p.isLocked ? (
                  <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                ) : null}
              </div>

              <div className="space-y-1 mt-1">
                <p
                  className={cn(
                    "text-[11px] leading-tight",
                    isActive ? "text-white/90" : "text-muted-foreground"
                  )}
                >
                  {p.subtitle}
                </p>

                <span
                  className={cn(
                    "text-[9px] font-bold px-2 py-0.5 rounded inline-block uppercase font-mono",
                    isActive ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                  )}
                >
                  {p.badgeText}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
