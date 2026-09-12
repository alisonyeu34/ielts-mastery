"use client";

import React from "react";
import {
  TableProperties,
  X,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { ListeningQuestion } from "@/data/mockListeningSplitData";
import { cn } from "@/lib/utils";

interface DistractorBreakdownDrawerProps {
  isOpen: boolean;
  questions: ListeningQuestion[];
  onClose: () => void;
  className?: string;
}

export function DistractorBreakdownDrawer({
  isOpen,
  questions,
  onClose,
  className,
}: DistractorBreakdownDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-card border-l border-border h-full shadow-2xl overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TableProperties className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-foreground">
                  Ma Trận Mổ Xẻ Bẫy Khảo Thí (Distractor Matrix)
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Phân tích thông tin giả, từ nối chuyển hướng và đáp án thật trong bài nghe
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Trap Cards List */}
          <div className="space-y-4 text-xs">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-primary px-2.5 py-0.5 rounded-lg bg-primary/10 border border-primary/20">
                    Câu {q.number} • {q.type === "form_completion" ? "Điền Từ" : "Trắc Nghiệm"}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Đáp án: <strong className="text-foreground">{q.correctAnswer}</strong>
                  </span>
                </div>

                {/* Prompt */}
                <p className="font-medium text-foreground text-xs leading-relaxed">
                  {q.prompt}
                </p>

                {/* Distractor vs Real Answer Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  {/* Distractor */}
                  <div className="p-3 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 space-y-1">
                    <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase block">
                      1. Thông tin gây nhiễu (Bẫy):
                    </span>
                    <p className="text-foreground font-serif">
                      "{q.distractorText || "Thông tin phủ định ban đầu"}"
                    </p>
                  </div>

                  {/* Real Answer */}
                  <div className="p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block">
                      2. Đáp án chốt hạ:
                    </span>
                    <p className="text-foreground font-serif font-bold">
                      "{q.correctAnswer}"
                    </p>
                  </div>
                </div>

                {/* Redirecting Marker & Explanation */}
                {q.redirectingMarker && (
                  <div className="p-2.5 rounded-xl bg-card border border-border/60 text-[11px] space-y-0.5">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                      Từ nối đảo hướng:
                    </span>
                    <p className="text-muted-foreground italic">
                      "{q.redirectingMarker}"
                    </p>
                  </div>
                )}

                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  💡 <strong>Chiến thuật:</strong> {q.trapExplanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            Đóng Ma Trận Bẫy
          </button>
        </div>
      </div>
    </div>
  );
}
