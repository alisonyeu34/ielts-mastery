"use client";

import React from "react";
import { StanceLevel } from "@/data/mockPassage3Data";
import { Compass, Sparkles, AlertCircle, Quote, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthorStanceSpectrumCardProps {
  currentStance?: StanceLevel;
  titleVi?: string;
  descriptionVi?: string;
  evidenceQuotes?: string[];
  className?: string;
}

export function AuthorStanceSpectrumCard({
  currentStance = "skeptical",
  titleVi = "Hoài Nghi Học Thuật Có Căn Cứ",
  descriptionVi = "Tác giả giữ thái độ hoài nghi sâu sắc trước những tuyên bố cho rằng AI đã đạt được ý thức thực sự; tác giả phân biệt rạch ròi giữa 'Mô phỏng cú pháp' và 'Cảm nhận chủ quan'.",
  evidenceQuotes = [],
  className,
}: AuthorStanceSpectrumCardProps) {
  const levels: Array<{
    id: StanceLevel;
    labelVi: string;
    english: string;
    color: string;
    bgActive: string;
  }> = [
    {
      id: "skeptical",
      labelVi: "Hoài Nghi / Bác Bỏ",
      english: "Skeptical / Dismissive",
      color: "text-rose-600 dark:text-rose-400 border-rose-500",
      bgActive: "bg-rose-500/20 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/40",
    },
    {
      id: "ambivalent",
      labelVi: "Lưỡng Lự / Đa Chiều",
      english: "Ambivalent / Nuanced",
      color: "text-amber-600 dark:text-amber-400 border-amber-500",
      bgActive: "bg-amber-500/20 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500/40",
    },
    {
      id: "objective_detachment",
      labelVi: "Khách Quan / Trung Lập",
      english: "Objective Detachment",
      color: "text-blue-600 dark:text-blue-400 border-blue-500",
      bgActive: "bg-blue-500/20 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/40",
    },
    {
      id: "cautiously_optimistic",
      labelVi: "Lạc Quan Có Chừng Mực",
      english: "Cautiously Optimistic",
      color: "text-indigo-600 dark:text-indigo-400 border-indigo-500",
      bgActive: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/40",
    },
    {
      id: "explicit_endorsement",
      labelVi: "Ủng Hộ Dứt Khoát",
      english: "Explicit Endorsement",
      color: "text-emerald-600 dark:text-emerald-400 border-emerald-500",
      bgActive: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/40",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-purple-600" />
          <span className="font-bold text-xs text-foreground">
            Quang Phổ Lập Trường & Thái Độ Tác Giả (Author Stance Spectrum)
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 uppercase">
          Claims & Views
        </span>
      </div>

      {/* 5-Level Spectrum Slider Visual */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-5 gap-1 text-center">
          {levels.map((lvl) => {
            const isActive = lvl.id === currentStance;
            return (
              <div
                key={lvl.id}
                className={cn(
                  "p-2 rounded-xl border text-[10px] font-mono font-bold transition-all duration-300 space-y-0.5",
                  isActive
                    ? lvl.bgActive
                    : "border-border/60 bg-secondary/30 text-muted-foreground opacity-60"
                )}
              >
                <div className="truncate">{lvl.labelVi}</div>
                <div className="text-[8px] opacity-75 hidden sm:block truncate">
                  {lvl.english}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stance Description Box */}
      <div className="p-3.5 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-purple-700 dark:text-purple-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Vị Trí Quan Điểm: {titleVi}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed pl-5">
          {descriptionVi}
        </p>

        {/* Evidence Quotes */}
        {evidenceQuotes.length > 0 && (
          <div className="space-y-1 pl-5 pt-1 border-t border-purple-500/15">
            <span className="text-[10px] font-mono font-bold text-foreground block">
              Dấu hiệu ngôn ngữ rào đón (Hedging markers):
            </span>
            <ul className="space-y-1 font-serif text-[11px] text-foreground/90 italic">
              {evidenceQuotes.map((q, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <Quote className="h-3 w-3 shrink-0 text-purple-600 mt-0.5" />
                  <span>"{q}"</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
