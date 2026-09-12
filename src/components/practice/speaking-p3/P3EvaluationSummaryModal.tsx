"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  BookOpen,
  Activity,
} from "lucide-react";
import { SpeakingP3Topic } from "@/data/mockSpeakingP3Data";
import { PitchAnalysisResult } from "@/lib/pitchDetectionEngine";
import { HedgingAnalysisResult } from "@/lib/hedgingValidator";
import { cn } from "@/lib/utils";

interface P3EvaluationSummaryModalProps {
  isOpen: boolean;
  topic: SpeakingP3Topic;
  selectedLensesCount: number;
  hedgingAnalysis: HedgingAnalysisResult;
  terminalAnalysis: PitchAnalysisResult | null;
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function P3EvaluationSummaryModal({
  isOpen,
  topic,
  selectedLensesCount,
  hedgingAnalysis,
  terminalAnalysis,
  onRestart,
  onClose,
  className,
}: P3EvaluationSummaryModalProps) {
  if (!isOpen) return null;

  const isLensesGood = selectedLensesCount >= 2;
  const isHedgingGood = hedgingAnalysis.isNuanced;
  const isCadenceGood = terminalAnalysis?.isAuthoritative || false;

  const estimatedBand =
    isLensesGood && isHedgingGood && isCadenceGood
      ? "Band 8.0 - 8.5"
      : isLensesGood && isHedgingGood
      ? "Band 7.5"
      : isLensesGood
      ? "Band 6.5 - 7.0"
      : "Band 5.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5 text-center">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Hoàn Tất Luyện Nói Speaking Part 3
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Đánh Giá Tư Duy C1/C2 & Ngữ Điệu
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hệ thống đã lưu kết quả vào IndexedDB và tự động phân loại các lỗi phát biểu tuyệt đối / Uptalk vào Error Bank.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band Dự Phóng
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-primary">
              {estimatedBand}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Lăng Kính Xã Hội
            </span>
            <span
              className={cn(
                "text-xl sm:text-2xl font-black font-mono",
                isLensesGood ? "text-emerald-600" : "text-amber-500"
              )}
            >
              {selectedLensesCount} / 2
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Ngữ Điệu Hạ Giọng
            </span>
            <span
              className={cn(
                "text-xs font-black font-mono block pt-1",
                terminalAnalysis?.isAuthoritative
                  ? "text-emerald-600"
                  : terminalAnalysis?.isUptalk
                  ? "text-rose-600"
                  : "text-muted-foreground"
              )}
            >
              {terminalAnalysis?.isAuthoritative
                ? "Hạ Giọng ↘"
                : terminalAnalysis?.isUptalk
                ? "Bị Uptalk ↗"
                : "Bằng Phẳng"}
            </span>
          </div>
        </div>

        {/* Warning Alert if Uptalk or Overgeneralization found */}
        {(terminalAnalysis?.isUptalk || hedgingAnalysis.overgeneralizationFlaws.length > 0) && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>
                  {terminalAnalysis?.isUptalk
                    ? "Đã lưu lỗi Ngữ Điệu Uptalk vào Error Bank"
                    : "Đã lưu lỗi Tuyệt Đối Hóa vào Error Bank"}
                </span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                {terminalAnalysis?.isUptalk
                  ? "Ngữ điệu vểnh cao ở đuôi câu làm giảm tính quyết đoán học thuật."
                  : `Phát hiện các từ tuyệt đối hóa (${hedgingAnalysis.overgeneralizationFlaws.join(", ")}).`}
              </p>
            </div>

            <Link
              href="/error-bank"
              className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shrink-0"
            >
              Xem Lỗi
            </Link>
          </div>
        )}

        {/* Model Response Preview */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-primary font-mono text-xs">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Bài Nói Mẫu Band 8.5+ Đối Chiếu:</span>
          </div>
          <p className="text-foreground leading-relaxed font-serif italic text-xs sm:text-sm">
            "{topic.modelResponseBand85.fullCombined}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            Đóng & Xem Lại Lập Luận
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Lại Câu Hỏi Này Từ Đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
