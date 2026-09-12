"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  PenTool,
  Send,
  Sparkles,
  RotateCcw,
  Layers,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenizedDictationInputProps {
  wordsCount: number;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  hints?: string[];
  disabled?: boolean;
  className?: string;
}

export function TokenizedDictationInput({
  wordsCount,
  value,
  onChange,
  onSubmit,
  hints = [],
  disabled = false,
  className,
}: TokenizedDictationInputProps) {
  const [useScaffolding, setUseScaffolding] = useState<boolean>(true);
  const [wordSlots, setWordSlots] = useState<string[]>(Array(wordsCount).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync word slots when value changes from outside or reset
  useEffect(() => {
    if (!value) {
      setWordSlots(Array(wordsCount).fill(""));
    } else {
      const parts = value.trim().split(/\s+/);
      const newSlots = Array(wordsCount).fill("");
      parts.forEach((p, idx) => {
        if (idx < wordsCount) newSlots[idx] = p;
      });
      setWordSlots(newSlots);
    }
  }, [wordsCount, value]);

  // Handle slot changes
  const handleSlotChange = (index: number, text: string) => {
    // If user pasted or typed space in slot
    if (text.includes(" ")) {
      const words = text.split(" ").filter(Boolean);
      const updated = [...wordSlots];
      words.forEach((w, offset) => {
        if (index + offset < wordsCount) {
          updated[index + offset] = w;
        }
      });
      setWordSlots(updated);
      onChange(updated.filter(Boolean).join(" "));

      // Focus next empty slot
      const nextIdx = Math.min(wordsCount - 1, index + words.length);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const updated = [...wordSlots];
    updated[index] = text;
    setWordSlots(updated);
    onChange(updated.filter(Boolean).join(" "));
  };

  const handleSlotKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (index < wordsCount - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (e.key === "Enter") {
        onSubmit();
      }
    } else if (e.key === "Backspace" && !wordSlots[index] && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
  };

  const currentTypedWords = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div
      className={cn(
        "rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header & Scaffolding Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
            Khung Gõ Chính Tả Phân Tách
          </span>
          <h3 className="text-base font-extrabold text-foreground">
            Lắng Nghe & Gõ Lại Chính Xác Từng Từ
          </h3>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setUseScaffolding((p) => !p)}
            className="px-3 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span>{useScaffolding ? "Khung {wordsCount} Ô Từ" : "Khung Tự Do"}</span>
          </button>
        </div>
      </div>

      {/* 1. Scaffolding Slots Canvas */}
      {useScaffolding ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 p-5 rounded-2xl bg-secondary/20 border border-border min-h-[100px]">
            {Array.from({ length: wordsCount }).map((_, idx) => (
              <div key={idx} className="relative">
                <input
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  value={wordSlots[idx] || ""}
                  onChange={(e) => handleSlotChange(idx, e.target.value)}
                  onKeyDown={(e) => handleSlotKeyDown(idx, e)}
                  disabled={disabled}
                  placeholder={`Từ ${idx + 1}`}
                  className="w-24 sm:w-28 px-2.5 py-2 rounded-xl border border-border/80 bg-card text-xs sm:text-sm font-serif font-bold text-foreground placeholder:text-muted-foreground/40 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-muted-foreground">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground font-mono">
            Mẹo: Nhấn phím <strong>Space</strong> hoặc <strong>Enter</strong> để nhảy nhanh sang ô tiếp theo.
          </p>
        </div>
      ) : (
        /* 2. Freeform Textarea Canvas */
        <div className="space-y-2">
          <textarea
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="Gõ toàn bộ câu văn bạn nghe được tại đây..."
            className="w-full rounded-2xl border border-border bg-secondary/20 p-4 text-xs sm:text-sm font-serif leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      )}

      {/* Hints if available */}
      {hints.length > 0 && (
        <div className="p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-xs text-muted-foreground space-y-1">
          <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 text-[11px]">
            <HelpCircle className="h-3 w-3" /> Gợi Ý Ngữ Cảnh:
          </span>
          <ul className="list-disc pl-4 text-[11px] space-y-0.5">
            {hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-2 border-t border-border/80 flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-muted-foreground">
          {currentTypedWords} / {wordsCount} từ đã gõ
        </span>

        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || currentTypedWords === 0}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-black text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Kiểm Tra Câu Gõ (Enter)</span>
        </button>
      </div>
    </div>
  );
}
