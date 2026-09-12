"use client";

import React from "react";
import { Task2PEELPrompt } from "@/data/mockTask2PEELData";
import {
  FileText,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ThesisStatementBuilderProps {
  prompt: Task2PEELPrompt;
  intro: {
    backgroundParaphrase: string;
    thesisStatement: string;
  };
  hasNeutralThesis: boolean;
  onChangeIntro: (intro: {
    backgroundParaphrase: string;
    thesisStatement: string;
  }) => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  className?: string;
}

export function ThesisStatementBuilder({
  prompt,
  intro,
  hasNeutralThesis,
  onChangeIntro,
  onPrevStage,
  onNextStage,
  className,
}: ThesisStatementBuilderProps) {
  const handleFillModel = () => {
    onChangeIntro({
      backgroundParaphrase: prompt.thesisGuidance.modelBackgroundParaphrase,
      thesisStatement: prompt.thesisGuidance.modelThesisStatement,
    });
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase">
            Bước 2 / 4 • Soạn Mở Bài 2 Câu & Luận Đề
          </span>
          <span className="text-xs font-bold text-foreground">
            2-Sentence Introduction & Thesis Guard
          </span>
        </div>

        <button
          type="button"
          onClick={handleFillModel}
          className="text-[11px] font-mono text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="h-3.5 w-3.5" /> Điền Mở bài mẫu Band 8.5+
        </button>
      </div>

      {/* Pedagogical Rule Box */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1.5 text-xs">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <Layers className="h-4 w-4 text-purple-600" />
          <span>Quy tắc viết Mở bài 2 câu chuẩn Cambridge:</span>
        </div>
        <p className="text-muted-foreground leading-relaxed pl-6">
          {prompt.thesisGuidance.ruleVi}
        </p>
      </div>

      {/* Sentence 1 Input: Background Paraphrase */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500/10 text-purple-600 font-mono text-[11px] font-black">
              1
            </span>
            <span>Câu 1: Viết Lại Bối Cảnh Đề Bài (Background Paraphrase)</span>
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            Cấu trúc tương đương • Không sao chép nguyên văn
          </span>
        </label>
        <textarea
          rows={3}
          value={intro.backgroundParaphrase}
          onChange={(e) =>
            onChangeIntro({ ...intro, backgroundParaphrase: e.target.value })
          }
          placeholder="Viết lại đề bài bằng vốn từ học thuật C1..."
          className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      {/* Sentence 2 Input: Thesis Statement */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 font-mono text-[11px] font-black">
              2
            </span>
            <span>Câu 2: Khẳng Định Luận Đề Dứt Khoát (Clear Thesis Statement)</span>
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            Khẳng định lập trường • Trả lời trực diện câu hỏi
          </span>
        </label>
        <textarea
          rows={3}
          value={intro.thesisStatement}
          onChange={(e) =>
            onChangeIntro({ ...intro, thesisStatement: e.target.value })
          }
          placeholder="Nêu rõ quan điểm của bạn (Ví dụ: I firmly agree with this viewpoint as...)"
          className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Neutral Fence-sitting Warning if triggered */}
      {hasNeutralThesis && (
        <div className="p-4 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 text-xs space-y-1 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>Cảnh Báo Lỗi Ngồi Trên Hàng Rào (Neutral Fencing-Sitting Trap):</span>
          </div>
          <p className="text-rose-700 dark:text-rose-300 leading-relaxed pl-6">
            {prompt.thesisGuidance.badNeutralWarningVi}
          </p>
        </div>
      )}

      {/* Model Introduction Comparison */}
      <div className="p-4 rounded-2xl bg-secondary/15 border border-border/80 space-y-2 text-xs">
        <span className="font-mono font-bold text-primary text-[10px] uppercase tracking-wider block">
          Mở Bài Mẫu Band 8.5+ Tham Khảo:
        </span>
        <p className="font-serif italic text-foreground/90 leading-relaxed">
          "{prompt.thesisGuidance.modelBackgroundParaphrase}{" "}
          {prompt.thesisGuidance.modelThesisStatement}"
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-2 border-t border-border/70 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevStage}
          className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Quay lại Bước 1</span>
        </button>

        <button
          type="button"
          onClick={onNextStage}
          className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
        >
          <span>Chuyển Sang Bước 3: Lắp Ghép Đoạn PEEL</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
