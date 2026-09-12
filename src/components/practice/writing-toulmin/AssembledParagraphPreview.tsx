"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Send,
  FileText,
} from "lucide-react";
import { ToulminElements, ToulminPromptData } from "@/data/mockToulminPrompts";
import { ArgumentIntegrityReport } from "@/hooks/useToulminBuilder";
import { cn } from "@/lib/utils";

interface AssembledParagraphPreviewProps {
  prompt: ToulminPromptData;
  toulminData: ToulminElements;
  assembledText: string;
  totalWords: number;
  integrityReport: ArgumentIntegrityReport;
  onSave: () => void;
  className?: string;
}

export function AssembledParagraphPreview({
  prompt,
  toulminData,
  assembledText,
  totalWords,
  integrityReport,
  onSave,
  className,
}: AssembledParagraphPreviewProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 space-y-5 shadow-sm select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Assembled Paragraph
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Đoạn Văn Lập Luận Hoàn Chỉnh (Toulmin Flow)
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={cn(
              "px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5",
              integrityReport.isWordCountSufficient
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
            )}
          >
            <span>{totalWords} / 90-130 từ</span>
            {integrityReport.isWordCountSufficient && <CheckCircle2 className="h-3.5 w-3.5" />}
          </span>
        </div>
      </div>

      {/* Integrity Warnings if any */}
      {integrityReport.warnings.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-500/[0.05] border border-amber-500/30 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>Đánh Giá Tính Toàn Vẹn Của Lập Luận (Score: {integrityReport.score.toFixed(1)}/9.0):</span>
          </div>
          <ul className="space-y-1 pl-5 list-disc text-[11px] text-muted-foreground">
            {integrityReport.warnings.map((w, idx) => (
              <li key={idx} className="leading-snug">
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assembled Text Display */}
      <div className="p-5 rounded-2xl bg-secondary/20 border border-border/80 text-xs sm:text-sm font-serif leading-relaxed text-foreground/90 space-y-2">
        <p className="whitespace-pre-line">
          {assembledText || "(Chưa có nội dung. Hãy nhập liệu vào các khối Toulmin bên trên hoặc bấm 'Tải bài mẫu')"}
        </p>
      </div>

      {/* Footer / Submit */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="text-xs text-muted-foreground">
          Độ chặt chẽ logic:{" "}
          <strong
            className={cn(
              integrityReport.isValid ? "text-emerald-600" : "text-amber-600"
            )}
          >
            {integrityReport.isValid ? "Hoàn hảo (Khép kín logic)" : "Cần hoàn thiện"}
          </strong>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={totalWords < 30}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
            totalWords >= 30
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          )}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Lưu & Đồng bộ đoạn văn Toulmin</span>
        </button>
      </div>
    </div>
  );
}
