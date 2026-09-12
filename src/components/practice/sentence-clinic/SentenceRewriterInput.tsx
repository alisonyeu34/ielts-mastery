"use client";

import React, { useState } from "react";
import {
  PenTool,
  Send,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { SentenceClinicExercise } from "@/data/mockSentenceClinicData";
import { cn } from "@/lib/utils";

interface SentenceRewriterInputProps {
  exercise: SentenceClinicExercise;
  onSubmit: (rewrittenText: string) => void;
  className?: string;
}

export function SentenceRewriterInput({
  exercise,
  onSubmit,
  className,
}: SentenceRewriterInputProps) {
  const [inputText, setInputText] = useState<string>("");

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
  const isSubmitDisabled = wordCount < 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    onSubmit(inputText.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-md space-y-5 select-none animate-in zoom-in-95 duration-200",
        className
      )}
    >
      {/* Top Header */}
      <div className="border-b border-border/70 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Bước 3 / 3 • Phẫu Thuật Cú Pháp
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-foreground">
          Gõ Lại Câu Văn Đã Được Khắc Phục Lỗi Ngữ Pháp
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Áp dụng các kỹ thuật liên từ, dấu câu hoặc tái cấu trúc mệnh đề để biến đổi câu văn đạt chuẩn học thuật.
        </p>
      </div>

      {/* Input Textarea */}
      <div className="space-y-2">
        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập câu văn đã sửa lỗi của bạn tại đây (e.g. Because..., [mệnh đề chính] hoặc [Mệnh đề 1]; consequently, [Mệnh đề 2])..."
          className="w-full rounded-2xl border border-border bg-secondary/20 p-4 text-xs sm:text-sm font-serif leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />

        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>{wordCount} từ đã nhập</span>
          <span>Yêu cầu: Tối thiểu 5 từ</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-border/80 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setInputText(exercise.buggySentence)}
          className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Nạp câu gốc để sửa</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-black text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Nộp Câu & Xem Câu Mẫu Band 8.5+</span>
        </button>
      </div>
    </form>
  );
}
