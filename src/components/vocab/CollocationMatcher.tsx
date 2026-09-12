"use client";

import React, { useState } from "react";
import {
  Zap,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CollocationPair {
  id: string;
  left: string;
  right: string;
  meaningVi: string;
}

const DEFAULT_COLLOCATION_PAIRS: CollocationPair[] = [
  { id: "cp_1", left: "pose", right: "a serious threat", meaningVi: "Gây ra mối đe dọa nghiêm trọng" },
  { id: "cp_2", left: "spark", right: "widespread controversy", meaningVi: "Châm ngòi cho tranh cãi gay gắt" },
  { id: "cp_3", left: "wreak", right: "havoc on the climate", meaningVi: "Gây tàn phá nặng nề cho khí hậu" },
  { id: "cp_4", left: "gain", right: "substantial traction", meaningVi: "Đạt được đà phát triển mạnh mẽ" },
];

interface CollocationMatcherProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function CollocationMatcher({
  isOpen,
  onClose,
  className,
}: CollocationMatcherProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongPairAnimation, setWrongPairAnimation] = useState<boolean>(false);

  if (!isOpen) return null;

  const leftItems = DEFAULT_COLLOCATION_PAIRS;
  const rightItems = [...DEFAULT_COLLOCATION_PAIRS].sort((a, b) => (a.id > b.id ? -1 : 1));

  const handleLeftClick = (id: string) => {
    if (matchedPairs.includes(id)) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (id: string) => {
    if (!selectedLeft) return;
    if (matchedPairs.includes(id)) return;

    if (selectedLeft === id) {
      // Correct Match!
      setMatchedPairs((prev) => [...prev, id]);
      setSelectedLeft(null);
    } else {
      // Wrong Match
      setWrongPairAnimation(true);
      setTimeout(() => {
        setWrongPairAnimation(false);
        setSelectedLeft(null);
      }, 500);
    }
  };

  const isCompleted = matchedPairs.length === DEFAULT_COLLOCATION_PAIRS.length;

  const handleReset = () => {
    setSelectedLeft(null);
    setMatchedPairs([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                Đấu Trường Ghép Cặp Collocation Học Thuật
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Ghép Động từ cột trái với Danh từ cột phải để tạo thành cụm từ Band 8.0+
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

        {/* Game Canvas */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Left Column (Verbs) */}
            <div className="space-y-2">
              <span className="font-mono font-bold text-[10px] text-muted-foreground uppercase block text-center">
                Động Từ (Verbs)
              </span>
              {leftItems.map((item) => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = selectedLeft === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleLeftClick(item.id)}
                    disabled={isMatched}
                    className={cn(
                      "w-full p-3.5 rounded-2xl border text-center font-serif font-black text-sm transition-all cursor-pointer",
                      isMatched
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 opacity-60 line-through"
                        : isSelected
                        ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/30 shadow-sm"
                        : "bg-secondary/30 border-border hover:border-primary hover:bg-secondary/60 text-foreground"
                    )}
                  >
                    {item.left}
                  </button>
                );
              })}
            </div>

            {/* Right Column (Collocates) */}
            <div className="space-y-2">
              <span className="font-mono font-bold text-[10px] text-muted-foreground uppercase block text-center">
                Danh Từ Đi Kèm
              </span>
              {rightItems.map((item) => {
                const isMatched = matchedPairs.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleRightClick(item.id)}
                    disabled={isMatched}
                    className={cn(
                      "w-full p-3.5 rounded-2xl border text-center font-serif font-bold text-xs sm:text-sm transition-all cursor-pointer",
                      isMatched
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 opacity-60 line-through"
                        : "bg-secondary/30 border-border hover:border-amber-500 hover:bg-secondary/60 text-foreground",
                      wrongPairAnimation && selectedLeft ? "animate-shake bg-rose-500/20 border-rose-500" : ""
                    )}
                  >
                    {item.right}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Completion Alert */}
        {isCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 text-xs text-center space-y-2 animate-in zoom-in-95">
            <Award className="h-6 w-6 text-emerald-600 mx-auto" />
            <span className="font-black text-emerald-700 dark:text-emerald-300 text-sm block">
              Xuất Sắc! Bạn Đã Ghép Chuẩn 4/4 Collocations Vàng
            </span>
            <p className="text-[11px] text-muted-foreground">
              Các cụm này sẽ nâng điểm tiêu chí Lexical Resource (LR) của bạn lên Band 8.0+.
            </p>
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-2 border-t border-border/80 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Lại</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            {isCompleted ? "Tiếp Tục Ôn Flashcards" : "Đóng Lại"}
          </button>
        </div>
      </div>
    </div>
  );
}
