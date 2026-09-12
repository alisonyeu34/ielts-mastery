"use client";

import React from "react";
import {
  Award,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreePassComparisonReportProps {
  pass1Score: number;
  pass2Score: number;
  deltaScore: number;
  pass1TimeSpent: number;
  pass2TimeSpent: number;
  totalQuestions: number;
  diagnosisSummary: {
    masteredCount: number;
    timeManagementCount: number;
    knowledgeGapCount: number;
    total: number;
  };
  onOpenVocabDrawer: () => void;
  className?: string;
}

function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

export function ThreePassComparisonReport({
  pass1Score,
  pass2Score,
  deltaScore,
  pass1TimeSpent,
  pass2TimeSpent,
  totalQuestions,
  diagnosisSummary,
  onOpenVocabDrawer,
  className,
}: ThreePassComparisonReportProps) {
  // AI advice based on Delta
  let aiAdvice = "";
  if (deltaScore >= 3) {
    aiAdvice =
      "Chỉ số Delta ấn tượng (+3 câu trở lên)! Điều này chứng minh bạn có nền tảng đọc hiểu tốt nhưng tốc độ xử lý thông tin dưới áp lực thời gian còn chậm. Bạn cần tập trung rèn luyện kỹ thuật Skimming & Scanning định vị từ khóa trong 30 giây đầu để tối ưu hóa thời gian thi thật.";
  } else if (deltaScore === 1 || deltaScore === 2) {
    aiAdvice =
      "Bạn có sự cải thiện nhẹ (+1 đến +2 câu). Một phần lỗi do đọc vội ở Pass 1, nhưng phần lớn các câu sai còn lại xuất phát từ bẫy Paraphrase hoặc suy diễn ngoài phạm vi bài đọc (Knowledge Gap). Hãy mổ xẻ kỹ các câu hỏi ở Vòng 3 bên dưới.";
  } else {
    aiAdvice =
      "Chỉ số Delta không thay đổi (Δ = 0). Dù có thêm thời gian ở Pass 2, bạn vẫn chưa tìm ra đáp án đúng. Đây là dấu hiệu của lỗ hổng từ vựng học thuật (Vocabulary Gap) hoặc chưa nhận diện được bẫy khảo thí kinh điển. Hãy nạp toàn bộ từ vựng mới vào FSRS ở Vòng 3.";
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
              3-Pass Diagnostic Report
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-foreground mt-0.5">
              Báo Cáo So Sánh Vòng 1 vs Vòng 2 & Chỉ Số Delta
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenVocabDrawer}
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 py-2 rounded-xl border border-emerald-500/20 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Thu hoạch từ vựng vào FSRS</span>
        </button>
      </div>

      {/* 3 Metric Cards: Pass 1 vs Pass 2 vs Delta */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Pass 1 Card */}
        <div className="p-4 rounded-2xl bg-blue-500/[0.05] border border-blue-500/20 space-y-1">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
            Vòng 1 (Áp Lực Thời Gian)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-foreground">
              {pass1Score}/{totalQuestions}
            </span>
            <span className="text-xs text-muted-foreground">
              ({Math.round((pass1Score / totalQuestions) * 100)}%)
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground block">
            Thời gian: {formatDuration(pass1TimeSpent)}
          </span>
        </div>

        {/* Pass 2 Card */}
        <div className="p-4 rounded-2xl bg-purple-500/[0.05] border border-purple-500/20 space-y-1">
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
            Vòng 2 (Đào Sâu Không Giới Hạn)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-foreground">
              {pass2Score}/{totalQuestions}
            </span>
            <span className="text-xs text-muted-foreground">
              ({Math.round((pass2Score / totalQuestions) * 100)}%)
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground block">
            Thời gian: {formatDuration(pass2TimeSpent)}
          </span>
        </div>

        {/* Delta Score Card */}
        <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 space-y-1">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Chỉ Số Cải Thiện (Delta Score)</span>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {deltaScore >= 0 ? `+${deltaScore}` : deltaScore} câu
            </span>
            <span className="text-xs text-muted-foreground">khi có thời gian</span>
          </div>
          <span className="text-[10px] text-muted-foreground block">
            Hiệu ứng áp lực phòng thi
          </span>
        </div>
      </div>

      {/* 3 Categories Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="p-3 rounded-2xl bg-secondary/30 border border-border flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Nắm vững (Mastered):</span>
          </span>
          <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
            {diagnosisSummary.masteredCount} câu
          </strong>
        </div>

        <div className="p-3 rounded-2xl bg-secondary/30 border border-border flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <Clock className="h-4 w-4 text-amber-600" />
            <span>Lỗi Thời Gian (Time Gap):</span>
          </span>
          <strong className="text-amber-600 dark:text-amber-400 font-mono font-bold text-sm">
            {diagnosisSummary.timeManagementCount} câu
          </strong>
        </div>

        <div className="p-3 rounded-2xl bg-secondary/30 border border-border flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <span>Hổng Kiến Thức (Knowledge Gap):</span>
          </span>
          <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold text-sm">
            {diagnosisSummary.knowledgeGapCount} câu
          </strong>
        </div>
      </div>

      {/* AI Action Advice Box */}
      <div className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
          <Brain className="h-4 w-4" />
          <span>Chẩn Đoán Sư Phạm & Lời Khuyên Hành Động:</span>
        </div>
        <p className="text-muted-foreground leading-relaxed text-[11px]">
          {aiAdvice}
        </p>
      </div>
    </div>
  );
}
