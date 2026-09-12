"use client";

import React from "react";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  PenLine,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import {
  HedgingTransformationItem,
  SpeakingP3Topic,
} from "@/data/mockSpeakingP3Data";
import { HedgingAnalysisResult } from "@/lib/hedgingValidator";
import { cn } from "@/lib/utils";

interface AcademicHedgingStudioProps {
  topic: SpeakingP3Topic;
  userInput: string;
  analysis: HedgingAnalysisResult;
  onChangeInput: (val: string) => void;
  onLoadSample: () => void;
  className?: string;
}

export function AcademicHedgingStudio({
  topic,
  userInput,
  analysis,
  onChangeInput,
  onLoadSample,
  className,
}: AcademicHedgingStudioProps) {
  const drill = topic.hedgingDrill;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase">
              Bước 2 • Kỹ Thuật Rào Đón
            </span>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-foreground">
            Biến Đổi Câu Võ Đoán Thành Lập Luận Rào Đón Band 8.0+
          </h4>
        </div>

        <button
          type="button"
          onClick={onLoadSample}
          className="px-3 py-1 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <BookOpen className="h-3.5 w-3.5 text-primary" />
          <span>Nạp Mẫu Band 8.5+</span>
        </button>
      </div>

      {/* Flawed Band 5.5 Statement Box */}
      <div className="p-4 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-[10px] text-rose-600 dark:text-rose-400 uppercase">
            ❌ Câu Võ Đoán Tuyệt Đối Hóa (Band 5.0 - 5.5):
          </span>
          <span className="text-[10px] text-muted-foreground">{drill.flawVi}</span>
        </div>

        <p className="font-serif italic text-foreground text-xs sm:text-sm font-medium leading-relaxed">
          "{drill.unhedgedPrompt}"
        </p>
      </div>

      {/* User Rewritten Statement */}
      <div className="space-y-2 text-xs">
        <label className="font-bold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <PenLine className="h-3.5 w-3.5 text-primary" />
            <span>Viết lại câu trên bằng cách chèn ít nhất 2 yếu tố Hedging:</span>
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Điểm Hedging: <strong className="text-primary">{analysis.score}/100</strong> ({analysis.bandLevel})
          </span>
        </label>

        <textarea
          rows={3}
          value={userInput}
          onChange={(e) => onChangeInput(e.target.value)}
          placeholder="While private enterprises are predominantly driven by profitability, they arguably cannot..."
          className={cn(
            "w-full p-3.5 rounded-2xl border bg-card text-xs sm:text-sm font-sans text-foreground leading-relaxed focus:outline-none focus:ring-2 transition-all",
            analysis.overgeneralizationFlaws.length > 0
              ? "border-rose-500 focus:ring-rose-500/40"
              : analysis.isNuanced
              ? "border-emerald-500 focus:ring-emerald-500/40"
              : "border-border focus:ring-primary"
          )}
        />
      </div>

      {/* Analysis Feedback Banner */}
      {analysis.overgeneralizationFlaws.length > 0 ? (
        <div className="p-3.5 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 text-xs text-rose-700 dark:text-rose-400 flex items-start gap-2 animate-in fade-in">
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
          <div className="space-y-0.5">
            <span className="font-bold block">Phát hiện từ ngữ phát biểu tuyệt đối hóa:</span>
            <p className="leading-relaxed">
              Các từ ({analysis.overgeneralizationFlaws.join(", ")}) làm giảm tính học thuật của câu nói. Hãy thay bằng <em>'predominantly', 'tend to', 'in many cases'</em>.
            </p>
          </div>
        </div>
      ) : analysis.isNuanced ? (
        <div className="p-3 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="font-semibold">
            Đạt chuẩn Hedging Band 8.0+! Đã nhận diện ({analysis.totalHedgingCount}) yếu tố rào đón bảo vệ lập luận.
          </span>
        </div>
      ) : userInput.length > 20 ? (
        <div className="p-3 rounded-2xl bg-secondary/40 border border-border text-xs text-muted-foreground flex items-center gap-2">
          <HelpCircle className="h-4 w-4 shrink-0 text-amber-500" />
          <span>
            Gợi ý: Hãy dùng thêm trạng từ xác suất <em>'arguably'</em> hoặc động từ <em>'tend to'</em> để tăng chiều sâu.
          </span>
        </div>
      ) : null}
    </div>
  );
}
