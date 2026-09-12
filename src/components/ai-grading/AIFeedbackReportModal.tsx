"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Volume2,
  ArrowRight,
  ShieldAlert,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  AIGradingReportRecord,
  C1UpgradeItem,
  DetectedErrorItem,
} from "@/lib/aiGraderAPIClient";
import { CriteriaScoreCard } from "./CriteriaScoreCard";

interface AIFeedbackReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AIGradingReportRecord | null;
  onOpenUpgrader: (item: C1UpgradeItem) => void;
}

export function AIFeedbackReportModal({
  isOpen,
  onClose,
  report,
  onOpenUpgrader,
}: AIFeedbackReportModalProps) {
  const [isSampleOpen, setIsSampleOpen] = useState<boolean>(false);

  if (!isOpen || !report) return null;

  const isWriting = report.skillType.startsWith("writing");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-border/80 bg-secondary/30 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Award className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.2 rounded-md bg-primary/10 text-primary border border-primary/20">
                  AI Examiner Report
                </span>
                <h3 className="text-xs sm:text-sm font-black text-foreground">
                  {isWriting ? "Báo Cáo Đánh Giá Bài Viết Writing" : "Báo Cáo Phân Tích Bài Nói Speaking"}
                </h3>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* 1. Official 4-Criteria Score Card */}
          <CriteriaScoreCard
            scores={report.scores}
            criteriaLabels={report.criteriaLabels}
          />

          {/* 2. General Examiner Comment */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Nhận Xét Tổng Thể Từ Giám Khảo AI:</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">
              {report.feedbackComments.generalComment}
            </p>
          </div>

          {/* 3. Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Điểm Sáng Đáng Ghi Nhận:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {report.feedbackComments.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-bold">
                <XCircle className="h-4 w-4 shrink-0" />
                <span>Lỗ Hổng Cần Khắc Phục:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {report.feedbackComments.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Multicolor Detected Errors List */}
          {report.feedbackComments.detectedErrors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-rose-500" />
                  <span>Các Điểm Lỗi Đã Được Đồng Bộ Tự Động Vào Ngân Hàng Lỗi Sai:</span>
                </span>
                <Link
                  href="/error-bank"
                  className="text-[11px] font-bold text-primary hover:underline"
                >
                  Mở Error Bank $\rightarrow$
                </Link>
              </div>

              <div className="space-y-2">
                {report.feedbackComments.detectedErrors.map((err) => (
                  <div
                    key={err.id}
                    className="p-3 rounded-xl border bg-card text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-rose-600 dark:text-rose-400 line-through">
                          {err.original}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {err.corrected}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{err.rule}</p>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase shrink-0 self-start sm:self-auto ${err.colorClass}`}>
                      {err.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. C1 Sentence Upgrades */}
          {report.feedbackComments.upgradedSentences.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Gợi Ý Nâng Cấp Câu Văn Chuẩn C1 (Bấm Để Phân Tích Sâu):</span>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {report.feedbackComments.upgradedSentences.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenUpgrader(item)}
                    className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 text-left space-y-2 transition-all hover:scale-[1.01] cursor-pointer group shadow-xs"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-rose-500 line-through truncate max-w-[200px]">
                        {item.original}
                      </span>
                      <span className="font-black px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                        Band {item.targetBand}
                      </span>
                    </div>

                    <p className="text-xs font-mono font-bold text-foreground line-clamp-2">
                      &ldquo;{item.upgraded}&rdquo;
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-primary font-bold pt-1 border-t border-border/60">
                      <span>Xem Giải Mã Cú Pháp</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 6. Hesitations Analysis for Speaking */}
          {report.feedbackComments.hesitations && report.feedbackComments.hesitations.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Phát Hiện Khoảng Lặng Ngập Ngừng (Silence & Hesitation):</span>
              </span>
              <div className="space-y-1.5 text-xs">
                {report.feedbackComments.hesitations.map((hes) => (
                  <div
                    key={hes.id}
                    className="p-2 rounded-xl bg-card border border-border flex items-center justify-between gap-2"
                  >
                    <span className="font-mono text-muted-foreground font-bold">
                      Giây thứ {hes.timestampSeconds}s ({hes.durationSeconds}s)
                    </span>
                    <span className="text-foreground">{hes.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Band 8.5+ Sample Model Answer Drawer */}
          {report.feedbackComments.band8Sample && (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsSampleOpen(!isSampleOpen)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border text-xs font-bold text-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Tham Khảo Bài Mẫu Band 8.5+ Chuẩn Cambridge</span>
                </div>
                {isSampleOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {isSampleOpen && (
                <div className="p-4 rounded-2xl bg-card border border-primary/20 text-xs text-foreground font-serif leading-relaxed animate-in slide-in-from-top-2 duration-200">
                  <p>{report.feedbackComments.band8Sample}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-border/80 bg-secondary/30 flex items-center justify-between gap-3 shrink-0">
          <Link
            href="/error-bank"
            className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Vào Ngân Hàng Lỗi Sai</span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer"
          >
            Hoàn Tất Báo Cáo
          </button>
        </div>
      </div>
    </div>
  );
}
