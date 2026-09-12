"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Trash2,
  Sparkles,
  Zap,
  Clock,
  Layers,
  FileCode2,
  Volume2,
  Crosshair,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { ERROR_CATEGORY_DETAILS, SOURCE_MODULE_LABELS } from "@/lib/errorBankAnalytics";

interface ErrorDossierCardProps {
  error: ErrorItem;
  onQuickRetry: (error: ErrorItem) => void;
  onMarkMastered: (errorId: string) => void;
  onDelete: (errorId: string) => void;
}

export function ErrorDossierCard({
  error,
  onQuickRetry,
  onMarkMastered,
  onDelete,
}: ErrorDossierCardProps) {
  const [isExplanationOpen, setIsExplanationOpen] = useState<boolean>(false);

  const meta = ERROR_CATEGORY_DETAILS[error.errorType] || ERROR_CATEGORY_DETAILS.grammar;
  const consecutive = error.consecutiveSuccesses || 0;

  const getCategoryIcon = () => {
    switch (error.errorType) {
      case "grammar":
        return <FileCode2 className="h-3.5 w-3.5 text-rose-500" />;
      case "pronunciation":
        return <Volume2 className="h-3.5 w-3.5 text-purple-500" />;
      case "paraphrase_trap":
        return <Crosshair className="h-3.5 w-3.5 text-blue-500" />;
      case "singular_plural":
        return <Layers className="h-3.5 w-3.5 text-amber-500" />;
      case "careless_reading":
        return <AlertTriangle className="h-3.5 w-3.5 text-red-500" />;
      default:
        return <BookOpen className="h-3.5 w-3.5 text-emerald-500" />;
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 bg-card p-4 sm:p-5 space-y-4 shadow-xs hover:shadow-md ${
        error.mastered
          ? "border-emerald-500/30 bg-emerald-500/[0.02]"
          : "border-border/90 hover:border-rose-500/30"
      }`}
    >
      {/* 1. Header Badges & Two-Strike Streak */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        {/* Left Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Tag */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
              error.errorType === "grammar"
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                : error.errorType === "pronunciation"
                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                : error.errorType === "paraphrase_trap"
                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                : error.errorType === "singular_plural"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
            }`}
          >
            {getCategoryIcon()}
            <span>{meta.shortLabel}</span>
          </span>

          {/* Source Module Tag */}
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/80">
            Nguồn: {SOURCE_MODULE_LABELS[error.sourceModule] || error.sourceModule}
          </span>

          {/* Retry Count */}
          <span className="text-[11px] font-mono text-muted-foreground">
            Đã luyện: <strong className="text-foreground">{error.retryCount || 0}</strong> lần
          </span>
        </div>

        {/* Right: Two-Strike Mastery Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 px-2 rounded-xl bg-secondary/60 border border-border">
            <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold">
              FSRS (3d-7d-21d):
            </span>
            <div className="flex items-center gap-1">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  (error.fsrsStage || 0) >= 1 || consecutive >= 1
                    ? "bg-amber-500 ring-2 ring-amber-500/30"
                    : "bg-muted-foreground/30"
                }`}
                title="Vòng 1: Ôn lại sau 3 ngày"
              />
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  (error.fsrsStage || 0) >= 2
                    ? "bg-indigo-500 ring-2 ring-indigo-500/30"
                    : "bg-muted-foreground/30"
                }`}
                title="Vòng 2: Ôn lại sau 7 ngày"
              />
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  (error.fsrsStage || 0) >= 3
                    ? "bg-sky-500 ring-2 ring-sky-500/30"
                    : "bg-muted-foreground/30"
                }`}
                title="Vòng 3: Ôn lại sau 21 ngày"
              />
            </div>
          </div>

          {error.mastered || (error.fsrsStage || 0) >= 4 ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" /> Phản Xạ Tiềm Thức
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <ShieldAlert className="h-3.5 w-3.5" /> FSRS Vòng {(error.fsrsStage || 0) + 1}/3
            </span>
          )}
        </div>
      </div>

      {/* 2. Question / Context Box */}
      <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/70 space-y-1">
        <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
          Ngữ cảnh câu hỏi & Đề bài:
        </span>
        <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
          {error.questionContext}
        </p>
      </div>

      {/* 3. Side-by-side Answer Dissection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* User Wrong Answer */}
        <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
            <XCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[11px] font-bold uppercase font-mono">
              Đáp Án Bạn Đã Chọn (Sai):
            </span>
          </div>
          <p className="text-xs font-mono font-medium text-rose-700 dark:text-rose-300 line-through decoration-rose-500/60 leading-relaxed">
            {error.userWrongAnswer}
          </p>
        </div>

        {/* Correct Answer */}
        <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[11px] font-bold uppercase font-mono">
              Đáp Án Chuẩn Xác Học Thuật:
            </span>
          </div>
          <p className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 leading-relaxed">
            {error.correctAnswer}
          </p>
        </div>
      </div>

      {/* 4. Deep Explanation Accordion Drawer */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setIsExplanationOpen(!isExplanationOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 hover:bg-secondary/70 border border-border/80 text-xs font-bold text-foreground transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Phân Tích Nguyên Nhân Sâu & Vạch Trần Bẫy Đề Thi</span>
          </div>
          {isExplanationOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {isExplanationOpen && (
          <div className="p-3.5 rounded-xl bg-card border border-primary/20 text-xs text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
            <p className="text-foreground font-medium">{error.deepExplanation}</p>
          </div>
        )}
      </div>

      {/* 5. Card Footer Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuickRetry(error)}
            className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Luyện Lại Ngay</span>
          </button>

          {!error.mastered && (
            <button
              type="button"
              onClick={() => onMarkMastered(error.id)}
              className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs border border-border transition-colors cursor-pointer"
            >
              Đánh dấu đã khắc phục
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDelete(error.id)}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
          title="Xóa lỗi này"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
