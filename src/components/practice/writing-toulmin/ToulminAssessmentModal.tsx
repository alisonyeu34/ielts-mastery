"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Scale,
  FileText,
} from "lucide-react";
import { ToulminPromptItem } from "@/data/mockToulminData";
import { ToulminEvaluationResult } from "@/lib/toulminLogicChecker";
import { cn } from "@/lib/utils";

interface ToulminAssessmentModalProps {
  isOpen: boolean;
  topic: ToulminPromptItem;
  evaluation: ToulminEvaluationResult;
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function ToulminAssessmentModal({
  isOpen,
  topic,
  evaluation,
  onRestart,
  onClose,
  className,
}: ToulminAssessmentModalProps) {
  if (!isOpen) return null;

  const hasIssues =
    evaluation.hasConcessionWithoutRebuttal ||
    evaluation.fallacies.detectedPhrases.length > 0 ||
    evaluation.dialecticalScore < 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Scale className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5 text-center">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Kết Quả Thẩm Định Lập Luận Toulmin
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Năng Lực Tư Duy Phản Biện C1/C2
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hệ thống đã phân tích 6 thành tố lập luận, rà soát bẫy ngụy biện và tự động lưu trữ vào nhật ký học tập.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band Task Response
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-primary">
              Band {evaluation.estimatedBand.toFixed(1)}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Độ Sắc Bén Phản Biện
            </span>
            <span
              className={cn(
                "text-xl sm:text-2xl font-black font-mono",
                evaluation.dialecticalScore >= 75
                  ? "text-emerald-600"
                  : "text-amber-500"
              )}
            >
              {evaluation.dialecticalScore}%
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Tổng Số Từ
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-foreground">
              {evaluation.totalWordCount} w
            </span>
          </div>
        </div>

        {/* 6-Block Diagnostic Checklist */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-foreground block">Tình trạng hoàn thiện 6 khối Toulmin:</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "1. Claim (Luận điểm)", ok: evaluation.hasClaim },
              { label: "2. Data (Dữ kiện thực nghiệm)", ok: evaluation.hasData },
              { label: "3. Warrant (Cơ chế liên kết)", ok: evaluation.hasWarrant },
              { label: "4. Backing (Hậu thuẫn nguyên lý)", ok: evaluation.hasBacking },
              { label: "5. Counter (Phản đề đối lập)", ok: evaluation.hasCounter },
              { label: "6. Rebuttal (Bác bỏ chốt hạ)", ok: evaluation.hasRebuttal },
            ].map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-2.5 rounded-xl border flex items-center justify-between text-xs",
                  item.ok
                    ? "bg-emerald-500/[0.04] border-emerald-500/20"
                    : "bg-rose-500/[0.04] border-rose-500/20"
                )}
              >
                <span className="font-bold text-foreground truncate">{item.label}</span>
                {item.ok ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Bank Notice */}
        {hasIssues && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Đã ghi nhận các lỗi lập luận vào Ngân Hàng Lỗi Sai</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Hệ thống đã lưu lại phân tích sư phạm để bạn ôn luyện và mài giũa lại tư duy phản biện.
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

        {/* Model Toulmin Comparison */}
        <div className="p-4 rounded-2xl bg-secondary/15 border border-border space-y-2 text-xs">
          <span className="font-mono font-bold text-primary text-[10px] uppercase tracking-wider block">
            Đoạn Lập Luận Toulmin Mẫu Band 8.5+ Đối Chứng:
          </span>
          <p className="font-serif italic text-foreground/90 leading-relaxed">
            "{topic.modelFullParagraph}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Tiếp Tục Hoàn Thiện & Mài Giũa Đoạn Văn</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Tập Lại Đề Này</span>
          </button>
        </div>
      </div>
    </div>
  );
}
