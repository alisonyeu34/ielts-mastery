"use client";

import React from "react";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Copy,
  PenLine,
  Lightbulb,
} from "lucide-react";
import { OverviewValidationResult } from "@/lib/task1SyntaxValidator";
import { cn } from "@/lib/utils";

interface OverviewBuilderCardProps {
  overviewText: string;
  wordCount: number;
  validation: OverviewValidationResult;
  modelOverview: string;
  onChangeOverview: (text: string) => void;
  className?: string;
}

export function OverviewBuilderCard({
  overviewText,
  wordCount,
  validation,
  modelOverview,
  onChangeOverview,
  className,
}: OverviewBuilderCardProps) {
  const templates = [
    {
      label: "Mẫu A (Xu hướng đối nghịch)",
      text: "Overall, what stands out from the graph is that [Category A] remained the predominant source throughout the period, whereas [Category B] experienced a contrasting downward trend.",
    },
    {
      label: "Mẫu B (Tăng trưởng vượt bậc)",
      text: "It is discernible that while [Category A] dominated the figures for the majority of the timeframe, [Category B] witnessed the most substantial expansion.",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase">
              Bước 2 • Đoạn Tổng Quan
            </span>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-foreground">
            Máy Tạo Đoạn Tổng Quan (Overview Synthesizer)
          </h4>
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          Số từ: <strong className="text-primary">{wordCount}</strong> từ
        </span>
      </div>

      {/* Templates Helper */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
          <span>Gợi Ý Khung Câu Nối Học Thuật Band 8.0+:</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {templates.map((tpl, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-primary block">
                  {tpl.label}
                </span>
                <p className="text-[11px] text-muted-foreground leading-snug italic font-serif">
                  "{tpl.text}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => onChangeOverview(tpl.text)}
                className="self-end px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary text-[10px] font-bold text-foreground flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Copy className="h-3 w-3 text-primary" />
                <span>Áp dụng mẫu này</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Text Area */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <PenLine className="h-3.5 w-3.5 text-primary" />
          <span>Soạn thảo câu Overview của bạn:</span>
        </label>

        <textarea
          rows={4}
          value={overviewText}
          onChange={(e) => onChangeOverview(e.target.value)}
          placeholder="Overall, what stands out from the chart is that..."
          className={cn(
            "w-full p-4 rounded-2xl border text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 bg-card text-foreground transition-all",
            validation.hasData
              ? "border-rose-500 focus:ring-rose-500/50"
              : "border-border focus:ring-primary"
          )}
        />
      </div>

      {/* Real-time Validation Banner */}
      {validation.hasData ? (
        <div className="p-3.5 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 text-xs text-rose-700 dark:text-rose-400 space-y-1 flex items-start gap-2 animate-in fade-in">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
          <p className="leading-relaxed font-medium">
            {validation.warningMessage}
          </p>
        </div>
      ) : overviewText.length > 25 ? (
        <div className="p-3 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="font-semibold">
            Đoạn Overview chuẩn mực Band 7.5+ (Khái quát toàn diện xu hướng, không bị vướng số liệu chi tiết).
          </span>
        </div>
      ) : null}
    </div>
  );
}
