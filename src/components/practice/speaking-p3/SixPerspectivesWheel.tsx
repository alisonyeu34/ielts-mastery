"use client";

import React from "react";
import {
  Users,
  Building2,
  Landmark,
  Cpu,
  Globe2,
  Trees,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  SocialPerspectiveKey,
  SocialPerspectiveDetail,
} from "@/data/mockSpeakingP3Data";
import { cn } from "@/lib/utils";

interface SixPerspectivesWheelProps {
  perspectives: Record<SocialPerspectiveKey, SocialPerspectiveDetail>;
  selectedKeys: SocialPerspectiveKey[];
  onToggleKey: (key: SocialPerspectiveKey) => void;
  className?: string;
}

const PERSPECTIVE_ICONS: Record<string, typeof Users> = {
  individual: Users,
  corporate: Building2,
  government: Landmark,
  scientific: Cpu,
  civil_society: Users,
  global: Globe2,
};

const PERSPECTIVE_COLORS: Record<
  string,
  {
    bgBadge: string;
    borderActive: string;
    text: string;
  }
> = {
  individual: {
    bgBadge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    borderActive: "border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  corporate: {
    bgBadge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    borderActive: "border-purple-500 bg-purple-500/5 ring-2 ring-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
  },
  government: {
    bgBadge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    borderActive: "border-indigo-500 bg-indigo-500/5 ring-2 ring-indigo-500/20",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  scientific: {
    bgBadge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    borderActive: "border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
  },
  civil_society: {
    bgBadge: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    borderActive: "border-pink-500 bg-pink-500/5 ring-2 ring-pink-500/20",
    text: "text-pink-600 dark:text-pink-400",
  },
  global: {
    bgBadge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    borderActive: "border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
  },
};

export function SixPerspectivesWheel({
  perspectives,
  selectedKeys,
  onToggleKey,
  className,
}: SixPerspectivesWheelProps) {
  const keys = Object.keys(perspectives) as SocialPerspectiveKey[];
  const isMultiPerspective = selectedKeys.length >= 2;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            6 Social Perspectives Matrix
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Ma Trận 6 Lăng Kính Chủ Thể Xã Hội
          </h3>
          <p className="text-xs text-muted-foreground">
            Bấm chọn ít nhất <strong>2 lăng kính</strong> để mở rộng lập luận đa chiều, thoát khỏi góc nhìn vị kỷ cá nhân.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span
            className={cn(
              "text-xs font-mono font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1",
              isMultiPerspective
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-secondary text-muted-foreground border-border"
            )}
          >
            <span>Đã chọn: {selectedKeys.length}/6</span>
            {isMultiPerspective && <CheckCircle2 className="h-3.5 w-3.5" />}
          </span>
        </div>
      </div>

      {/* 6 Perspectives Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {keys.map((key) => {
          const item = perspectives[key];
          if (!item) return null;
          const IconComp = PERSPECTIVE_ICONS[key] || Users;
          const colors = PERSPECTIVE_COLORS[key] || {
            bgBadge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
            borderActive: "border-indigo-500 bg-indigo-500/5 ring-2 ring-indigo-500/20",
            text: "text-indigo-600 dark:text-indigo-400",
          };
          const isSelected = selectedKeys.includes(key);

          return (
            <div
              key={key}
              onClick={() => onToggleKey(key)}
              className={cn(
                "p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2 flex flex-col justify-between",
                isSelected
                  ? colors.borderActive
                  : "border-border bg-secondary/20 hover:border-indigo-400/50 hover:bg-secondary/40"
              )}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("p-1.5 rounded-xl border", colors.bgBadge)}>
                      <IconComp className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {item.titleVi || item.labelVi}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border flex items-center justify-center text-[10px] font-bold",
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-border"
                    )}
                  >
                    {isSelected ? "✓" : ""}
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-snug">
                  {item.argumentPoint || item.coreAngleVi}
                </p>
              </div>

              {/* C1 Lexicon Pills */}
              <div className="pt-1 flex flex-wrap gap-1 border-t border-border/50">
                {(item.c1Lexicon || item.keyArguments || []).slice(0, 2).map((lex, lIdx) => (
                  <span
                    key={lIdx}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-secondary/80 text-foreground/80 border border-border/60"
                  >
                    {lex}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
