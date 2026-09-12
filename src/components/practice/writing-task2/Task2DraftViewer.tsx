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
  FileText,
} from "lucide-react";
import { Task2PromptData, PEELBlockData } from "@/data/mockTask2Prompts";
import { ThesisValidationResult } from "@/hooks/usePEELEditor";
import { cn } from "@/lib/utils";

interface Task2DraftViewerProps {
  prompt: Task2PromptData;
  intro: { background: string; thesis: string };
  body1: PEELBlockData;
  body2: PEELBlockData;
  conclusion: string;
  totalWordCount: number;
  thesisValidation: ThesisValidationResult;
  onEditAgain: () => void;
  className?: string;
}

export function Task2DraftViewer({
  prompt,
  intro,
  body1,
  body2,
  conclusion,
  totalWordCount,
  thesisValidation,
  onEditAgain,
  className,
}: Task2DraftViewerProps) {
  const isWordCountSufficient = totalWordCount >= 250;
  const isThesisStrong = thesisValidation.status === "strong";

  const isBody1Complete =
    body1.point.trim().length > 10 &&
    body1.explain.trim().length > 10 &&
    body1.example.trim().length > 10;
  const isBody2Complete =
    body2.point.trim().length > 10 &&
    body2.explain.trim().length > 10 &&
    body2.example.trim().length > 10;

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
          Full Essay Preview
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
          Bản Nháp Hoàn Chỉnh Writing Task 2
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Đề tài: <strong>{prompt.topicTitle}</strong>
        </p>
      </div>

      {/* Task 2 Assessment Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Word Count */}
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              isWordCountSufficient ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-600"
            )}
          >
            {isWordCountSufficient ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Dung lượng ({totalWordCount} từ)
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isWordCountSufficient ? "Đạt chuẩn (≥ 250 từ)" : `Thiếu ${250 - totalWordCount} từ`}
            </span>
          </div>
        </div>

        {/* Thesis Statement */}
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              isThesisStrong ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-600"
            )}
          >
            {isThesisStrong ? <CheckCircle2 className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Thesis Statement
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isThesisStrong ? "Lập trường rõ ràng (Band 7.5+)" : "Cần dứt khoát hơn"}
            </span>
          </div>
        </div>

        {/* PEEL Structure */}
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              isBody1Complete && isBody2Complete ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-600"
            )}
          >
            {isBody1Complete && isBody2Complete ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Cấu trúc PEEL
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isBody1Complete && isBody2Complete ? "Đủ 4 khối P-E-E-L" : "Thiếu khối luận điểm"}
            </span>
          </div>
        </div>
      </div>

      {/* Assembled Essay Text */}
      <div className="p-5 sm:p-7 rounded-2xl bg-secondary/20 border border-border/80 text-xs sm:text-sm font-serif leading-relaxed text-foreground/90 space-y-4">
        {/* Intro */}
        <div>
          <span className="font-sans text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block uppercase tracking-wider mb-1">
            [Introduction]
          </span>
          <p>
            {intro.background} {intro.thesis}
          </p>
        </div>

        {/* Body 1 */}
        <div>
          <span className="font-sans text-[10px] font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider mb-1">
            [Body Paragraph 1 - PEEL]
          </span>
          <p>
            {body1.point} {body1.explain} {body1.example} {body1.link}
          </p>
        </div>

        {/* Body 2 */}
        <div>
          <span className="font-sans text-[10px] font-bold text-purple-600 dark:text-purple-400 block uppercase tracking-wider mb-1">
            [Body Paragraph 2 - PEEL]
          </span>
          <p>
            {body2.point} {body2.explain} {body2.example} {body2.link}
          </p>
        </div>

        {/* Conclusion */}
        <div>
          <span className="font-sans text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider mb-1">
            [Conclusion]
          </span>
          <p>
            {conclusion ||
              "In conclusion, by thoroughly addressing the key points outlined above, this multifaceted issue can be effectively navigated to achieve sustainable progress."}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onEditAgain}
          className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Tiếp tục chỉnh sửa bài viết</span>
        </button>

        <Link
          href="/grading/writing"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Chấm bài với AI Writing Grader (Module 3)</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
