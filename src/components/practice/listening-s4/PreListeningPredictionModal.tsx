"use client";

import React from "react";
import {
  Clock,
  Sparkles,
  Zap,
  Target,
  Layers,
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";
import { S4QuestionItem } from "@/data/mockSection4LectureData";
import { cn } from "@/lib/utils";

interface PreListeningPredictionModalProps {
  isOpen: boolean;
  secondsLeft: number;
  questions: S4QuestionItem[];
  predictions: Record<number, { pos: string; anchor: string }>;
  onSetPrediction: (qNum: number, pred: { pos: string; anchor: string }) => void;
  onStartListening: () => void;
  onClose: () => void;
  className?: string;
}

export function PreListeningPredictionModal({
  isOpen,
  secondsLeft,
  questions,
  predictions,
  onSetPrediction,
  onStartListening,
  onClose,
  className,
}: PreListeningPredictionModalProps) {
  if (!isOpen) return null;

  const posOptions = [
    { value: "noun", label: "Noun (Số ít/KĐĐ)" },
    { value: "plural_noun", label: "Plural Noun (-s/-es)" },
    { value: "verb", label: "Verb" },
    { value: "adjective", label: "Adjective" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-3xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header with 60s Countdown Badge */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20">
              <Clock className="h-6 w-6 animate-spin" style={{ animationDuration: "8s" }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                  Section 4 Pre-Listening Studio
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-foreground">
                60 Giây Đọc Đề & Dự Đoán Từ Loại
              </h3>
            </div>
          </div>

          {/* Big Countdown Timer */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono font-black text-xl">
            <Clock className="h-5 w-5" />
            <span>00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</span>
          </div>
        </div>

        {/* 3 Cognitive Rules Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <div className="font-bold text-foreground flex items-center gap-1 text-[11px]">
              <Target className="h-3.5 w-3.5 text-primary" />
              <span>1. Xác định từ loại</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Xung quanh ô trống cần Danh từ số ít, số nhiều `-s`, hay Tính từ?
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <div className="font-bold text-foreground flex items-center gap-1 text-[11px]">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>2. Bắt từ neo (Anchors)</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Khoanh tròn các từ đứng trước/sau để làm cột mốc đón bắt âm thanh.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <div className="font-bold text-foreground flex items-center gap-1 text-[11px]">
              <Layers className="h-3.5 w-3.5 text-emerald-500" />
              <span>3. Chú ý Signposting</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Khi giáo sư nói từ chuyển ý là bài giảng đã chuyển sang nhánh mới.
            </p>
          </div>
        </div>

        {/* Prediction Quick Form Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-foreground">
            <span>Dự đoán nhanh cho 10 câu hỏi (Q31 - Q40):</span>
            <span className="text-[10px] font-mono text-muted-foreground">
              Quy tắc: ONE WORD ONLY
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {questions.map((q) => {
              const currentPred = predictions[q.number] || {
                pos: q.targetPos,
                anchor: q.anchorKeyword,
              };

              return (
                <div
                  key={q.number}
                  className="p-2.5 rounded-xl border border-border bg-secondary/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-secondary font-mono font-bold text-[11px] text-foreground border border-border">
                      {q.number}
                    </span>
                    <span className="font-mono text-muted-foreground truncate text-[11px]">
                      {q.noteContext}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* POS Selector */}
                    <select
                      value={currentPred.pos}
                      onChange={(e) =>
                        onSetPrediction(q.number, {
                          ...currentPred,
                          pos: e.target.value,
                        })
                      }
                      className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-card border border-border text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {posOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                      Neo: "{q.anchorKeyword}"
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-border/70">
          <span className="text-[11px] text-muted-foreground">
            Hết 60 giây, hệ thống sẽ tự động phát bài giảng.
          </span>

          <button
            type="button"
            onClick={onStartListening}
            className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <span>Bắt Đầu Nghe Bài Giảng Ngay</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
