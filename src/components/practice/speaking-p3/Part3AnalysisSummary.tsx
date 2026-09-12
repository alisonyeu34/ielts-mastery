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
  Layers,
  Activity,
} from "lucide-react";
import { Part3QuestionTopic, SocialPerspectiveKey } from "@/data/mockSpeakingP3Data";
import { cn } from "@/lib/utils";

interface Part3AnalysisSummaryProps {
  topic: Part3QuestionTopic;
  transcriptText: string;
  selectedPerspectives: SocialPerspectiveKey[];
  uptalkCount: number;
  fallingCadenceCount: number;
  onReset: () => void;
  className?: string;
}

export function Part3AnalysisSummary({
  topic,
  transcriptText,
  selectedPerspectives,
  uptalkCount,
  fallingCadenceCount,
  onReset,
  className,
}: Part3AnalysisSummaryProps) {
  // Hedging scan
  const lowerText = transcriptText.toLowerCase();
  const detectedHedging = topic.modelAnswer.keyHedgingPhrases.filter((phrase) =>
    lowerText.includes(phrase.toLowerCase())
  );

  const hasGoodHedging = detectedHedging.length >= 1 || lowerText.includes("may") || lowerText.includes("could") || lowerText.includes("suggest");
  const hasMultiPerspective = selectedPerspectives.length >= 2;
  const isIntonationGood = uptalkCount === 0 || fallingCadenceCount > uptalkCount;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300 select-none",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mx-auto">
        <Award className="h-7 w-7" />
      </div>

      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          Part 3 Critical Analysis
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
          Đánh Giá Tư Duy Phản Biện & Ngữ Điệu C1
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Chủ đề: <strong>{topic.topicTitle}</strong>
        </p>
      </div>

      {/* 3 Academic Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Metric 1: Perspectives */}
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              hasMultiPerspective ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-600"
            )}
          >
            {hasMultiPerspective ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Lăng kính xã hội ({selectedPerspectives.length}/6)
            </span>
            <span className="text-[11px] text-muted-foreground">
              {hasMultiPerspective ? "Đa chiều vĩ mô (Band 7.5+)" : "Cần thêm góc nhìn"}
            </span>
          </div>
        </div>

        {/* Metric 2: Academic Hedging */}
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              hasGoodHedging ? "bg-emerald-500/20 text-emerald-600" : "bg-rose-500/20 text-rose-600"
            )}
          >
            {hasGoodHedging ? <CheckCircle2 className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Rào đón học thuật (Hedging)
            </span>
            <span className="text-[11px] text-muted-foreground">
              {hasGoodHedging ? "Lập luận mềm dẻo, chuẩn C1" : "Quy chụp tuyệt đối"}
            </span>
          </div>
        </div>

        {/* Metric 3: Intonation */}
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              isIntonationGood ? "bg-emerald-500/20 text-emerald-600" : "bg-rose-500/20 text-rose-600"
            )}
          >
            {isIntonationGood ? <Activity className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Ngữ điệu & Uptalk ({uptalkCount} lỗi)
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isIntonationGood ? "Hạ giọng dứt khoát" : "Lên giọng cuối câu"}
            </span>
          </div>
        </div>
      </div>

      {/* Transcript Review */}
      <div className="p-5 rounded-2xl bg-secondary/20 border border-border/80 text-xs sm:text-sm font-serif leading-relaxed text-foreground/90 space-y-2">
        <span className="font-sans font-bold text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
          Câu trả lời đã ghi nhận:
        </span>
        <p className="italic">"{transcriptText}"</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Luyện tập lại câu hỏi này</span>
        </button>

        <Link
          href="/grading/speaking"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Chấm điểm toàn diện với AI Speaking Coach (Module 3)</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
