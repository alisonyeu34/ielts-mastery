"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  FileText,
} from "lucide-react";
import { ThesisValidationResult } from "@/hooks/usePEELEditor";
import { cn } from "@/lib/utils";

interface ThesisStatementBuilderProps {
  background: string;
  thesis: string;
  validation: ThesisValidationResult;
  wordCount: number;
  onSetBackground: (text: string) => void;
  onSetThesis: (text: string) => void;
  className?: string;
}

export function ThesisStatementBuilder({
  background,
  thesis,
  validation,
  wordCount,
  onSetBackground,
  onSetThesis,
  className,
}: ThesisStatementBuilderProps) {
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
            Step 2: 2-Sentence Introduction
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Mở Bài Chuẩn 2 Câu (Background & Thesis Statement)
          </h3>
        </div>

        <span className="text-xs font-mono font-bold text-muted-foreground self-start sm:self-auto">
          Dung lượng: <strong className="text-indigo-600 dark:text-indigo-400">{wordCount}</strong> từ (Chuẩn 35-50 từ)
        </span>
      </div>

      {/* Sentence 1: Background */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-secondary text-foreground font-mono text-[11px] font-bold">
              1
            </span>
            <span>Câu 1: Background Statement (Paraphrase Đề Bài)</span>
          </label>
          <span className="text-[10px] text-muted-foreground">
            Bắt đầu bằng: <em>It is often argued that... / While some believe that...</em>
          </span>
        </div>

        <textarea
          rows={3}
          value={background}
          onChange={(e) => onSetBackground(e.target.value)}
          placeholder="Viết 1 câu paraphrase lại chủ đề bài viết bằng từ đồng nghĩa và cấu trúc câu phức..."
          className="w-full rounded-2xl border border-border bg-secondary/20 p-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-serif leading-relaxed"
        />
      </div>

      {/* Sentence 2: Thesis Statement */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-600 text-white font-mono text-[11px] font-bold">
              2
            </span>
            <span>Câu 2: Thesis Statement (Luận Đề Nêu Rõ Lập Trường)</span>
          </label>
          <span className="text-[10px] text-muted-foreground font-semibold">
            Quyết định Band 7.0+ Task Response
          </span>
        </div>

        <textarea
          rows={3}
          value={thesis}
          onChange={(e) => onSetThesis(e.target.value)}
          placeholder="Nêu dứt khoát quan điểm cá nhân (ví dụ: While I acknowledge the drawbacks of X, I firmly believe that Y is more advantageous because...)"
          className={cn(
            "w-full rounded-2xl border p-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 font-serif leading-relaxed transition-colors",
            validation.status === "strong" && "border-emerald-500/60 bg-emerald-500/[0.02]",
            validation.status === "weak" && "border-amber-500/60 bg-amber-500/[0.02]",
            validation.status === "missing" && "border-border bg-secondary/20"
          )}
        />

        {/* Real-time Thesis Statement Quality Badge */}
        <div
          className={cn(
            "p-3 rounded-xl border text-xs flex items-center gap-2 transition-all",
            validation.status === "strong"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              : validation.status === "weak"
              ? "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300"
              : "bg-secondary/40 border-border/80 text-muted-foreground"
          )}
        >
          {validation.status === "strong" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
          )}
          <span className="text-[11px] leading-tight font-medium">
            {validation.message}
          </span>
        </div>
      </div>
    </div>
  );
}
