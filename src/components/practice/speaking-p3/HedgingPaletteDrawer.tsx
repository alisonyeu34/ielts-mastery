"use client";

import React, { useState } from "react";
import { Sparkles, Plus, BookOpen, Layers, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HedgingPaletteDrawerProps {
  onInsertPhrase: (phrase: string) => void;
  className?: string;
}

export function HedgingPaletteDrawer({
  onInsertPhrase,
  className,
}: HedgingPaletteDrawerProps) {
  const [activeTier, setActiveTier] = useState<"verbs" | "adverbs" | "quantifiers" | "conditionals">("verbs");

  const hedgingTiers = {
    verbs: [
      { phrase: "tend to", meaning: "có xu hướng..." },
      { phrase: "appear to indicate", meaning: "dường như cho thấy..." },
      { phrase: "be inclined to suggest", meaning: "nghiêng về giả thuyết rằng..." },
      { phrase: "could potentially precipitate", meaning: "có tiềm năng châm ngòi cho..." },
      { phrase: "serve to", meaning: "đóng vai trò như..." },
    ],
    adverbs: [
      { phrase: "arguably", meaning: "có thể lập luận rằng..." },
      { phrase: "predominantly", meaning: "phần lớn, chủ yếu là..." },
      { phrase: "plausibly", meaning: "hoàn toàn hợp lý khi cho rằng..." },
      { phrase: "conceivably", meaning: "về mặt lý thuyết có thể xảy ra..." },
      { phrase: "statistically", meaning: "xét theo số liệu thống kê..." },
    ],
    quantifiers: [
      { phrase: "the vast majority of", meaning: "đại đa số..." },
      { phrase: "a considerable proportion", meaning: "một tỷ lệ đáng kể..." },
      { phrase: "in certain circumstances", meaning: "trong những hoàn cảnh nhất định..." },
      { phrase: "by no means", meaning: "hoàn toàn không hẳn là..." },
      { phrase: "scarcely", meaning: "hiếm khi, hầu như không..." },
    ],
    conditionals: [
      { phrase: "provided that", meaning: "với điều kiện là..." },
      { phrase: "subject to the caveat that", meaning: "với lưu ý thận trọng rằng..." },
      { phrase: "in my estimation", meaning: "theo ước lượng và nhận định của tôi..." },
      { phrase: "looking through the lens of", meaning: "nhìn qua lăng kính của..." },
      { phrase: "while it is undeniable that", meaning: "dù không thể phủ nhận rằng..." },
    ],
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <h4 className="font-bold text-xs sm:text-sm text-foreground">
            Bảng Chèn Nhanh Ngôn Ngữ Rào Đón (Hedging Palette)
          </h4>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Bấm để chèn vào câu trả lời
        </span>
      </div>

      {/* 4 Tier Tab Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl bg-secondary/40 border border-border text-[11px] font-bold">
        <button
          type="button"
          onClick={() => setActiveTier("verbs")}
          className={cn(
            "py-1.5 px-2 rounded-xl transition-all cursor-pointer text-center",
            activeTier === "verbs"
              ? "bg-card text-foreground shadow-2xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          1. Động Từ Dè Dặt
        </button>

        <button
          type="button"
          onClick={() => setActiveTier("adverbs")}
          className={cn(
            "py-1.5 px-2 rounded-xl transition-all cursor-pointer text-center",
            activeTier === "adverbs"
              ? "bg-card text-foreground shadow-2xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          2. Trạng Từ Xác Suất
        </button>

        <button
          type="button"
          onClick={() => setActiveTier("quantifiers")}
          className={cn(
            "py-1.5 px-2 rounded-xl transition-all cursor-pointer text-center",
            activeTier === "quantifiers"
              ? "bg-card text-foreground shadow-2xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          3. Lượng Từ Tương Đối
        </button>

        <button
          type="button"
          onClick={() => setActiveTier("conditionals")}
          className={cn(
            "py-1.5 px-2 rounded-xl transition-all cursor-pointer text-center",
            activeTier === "conditionals"
              ? "bg-card text-foreground shadow-2xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          4. Khung Điều Kiện
        </button>
      </div>

      {/* Quick Insert Buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        {hedgingTiers[activeTier].map((item) => (
          <button
            key={item.phrase}
            type="button"
            onClick={() => onInsertPhrase(item.phrase)}
            className="px-3 py-1.5 rounded-xl border border-border bg-secondary/30 hover:bg-primary/10 hover:border-primary/40 text-foreground text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs group"
          >
            <Plus className="h-3 w-3 text-primary group-hover:scale-125 transition-transform" />
            <span className="font-mono font-bold text-primary">{item.phrase}</span>
            <span className="text-[10px] text-muted-foreground hidden sm:inline">
              ({item.meaning})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
