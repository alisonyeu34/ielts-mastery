"use client";

import React from "react";
import Link from "next/link";
import { SentenceClinicCase } from "@/data/mockSentenceClinicData";
import { SentenceEvaluationFeedback } from "@/lib/sentenceClinicEvaluator";
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  Stethoscope,
  RotateCcw,
  ArrowRight,
  X,
  Award,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClinicDiagnosticSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  sessionResults: Array<{
    caseItem: SentenceClinicCase;
    feedback: SentenceEvaluationFeedback;
    userRevision: string;
  }>;
}

export function ClinicDiagnosticSummaryModal({
  isOpen,
  onClose,
  onRestart,
  sessionResults,
}: ClinicDiagnosticSummaryModalProps) {
  if (!isOpen) return null;

  const totalCases = sessionResults.length;
  const avgBand =
    totalCases > 0
      ? (
          sessionResults.reduce(
            (acc, r) => acc + r.feedback.estimatedBand,
            0
          ) / totalCases
        ).toFixed(1)
      : "0.0";

  const totalC1Collocations = sessionResults.reduce(
    (acc, r) => acc + r.feedback.matchedCollocations.length,
    0
  );

  const passedCasesCount = sessionResults.filter(
    (r) => r.feedback.estimatedBand >= 7.0
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:bg-secondary cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-inner">
            <Stethoscope className="h-8 w-8 text-emerald-500 animate-bounce" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            Hoàn Tất Phiên Phẫu Thuật Câu Học Thuật
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Năng Lực Nâng Cấp Cú Pháp (GRA & LR)
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Đã phẫu thuật thành công {totalCases} ca bệnh câu văn từ Band 5.0 lên chuẩn C1 Academic.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
              Band Điểm TB
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
              {avgBand}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
              Ca Đạt Band ≥ 7.0
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {passedCasesCount}/{totalCases}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
              Cụm C1 Đã Ứng Dụng
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-purple-600 dark:text-purple-400">
              {totalC1Collocations}
            </span>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="space-y-3">
          <span className="text-xs font-bold font-mono text-foreground uppercase tracking-wider block">
            Hồ Sơ Từng Ca Bệnh Đã Phẫu Thuật:
          </span>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {sessionResults.map((res, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-secondary/40 border border-border flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono font-bold shrink-0 text-[10px]">
                    #{idx + 1}
                  </span>
                  <div className="truncate">
                    <h5 className="font-bold text-foreground truncate">
                      {res.caseItem.title}
                    </h5>
                    <p className="text-[10px] text-muted-foreground truncate font-serif">
                      {res.userRevision}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-lg text-xs font-bold font-mono",
                      res.feedback.estimatedBand >= 7.5
                        ? "bg-emerald-500/10 text-emerald-600"
                        : res.feedback.estimatedBand >= 6.5
                        ? "bg-indigo-500/10 text-indigo-600"
                        : "bg-amber-500/10 text-amber-600"
                    )}
                  >
                    Band {res.feedback.estimatedBand.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:w-1/2 px-4 py-3 rounded-2xl border border-border text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Phẫu Thuật Lại Từ Đầu</span>
          </button>

          <Link
            href="/practice"
            className="w-full sm:w-1/2 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Về Trung Tâm Luyện Tập</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
