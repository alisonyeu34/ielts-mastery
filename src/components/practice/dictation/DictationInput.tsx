"use client";

import React, { useEffect, useRef } from "react";
import { Send, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DictationInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isSubmitted: boolean;
  onReset: () => void;
  disabled?: boolean;
  className?: string;
}

export function DictationInput({
  value,
  onChange,
  onSubmit,
  isSubmitted,
  onReset,
  disabled = false,
  className,
}: DictationInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto focus on mount and when reset
  useEffect(() => {
    if (!isSubmitted && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isSubmitted]);

  // Handle Ctrl+Enter or Enter key submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (value.trim() && !isSubmitted) {
        onSubmit();
      }
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative rounded-2xl border border-border/80 bg-card p-4 shadow-sm focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isSubmitted}
          placeholder="Gõ lại chính xác câu bạn vừa nghe (ví dụ: The government has introduced...)"
          rows={3}
          className="w-full resize-none bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none leading-relaxed font-medium"
        />

        {/* Footer info inside textarea box */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
          <span>
            Số từ đã gõ: <strong className="text-foreground">{wordCount} từ</strong>
          </span>
          <span className="hidden sm:inline">Nhấn <kbd className="px-1.5 py-0.5 rounded bg-secondary text-[10px] text-foreground font-mono">Ctrl + Enter</kbd> để kiểm tra</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3">
        {isSubmitted ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-bold text-foreground transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Gõ lại câu này</span>
          </button>
        ) : (
          <div />
        )}

        {!isSubmitted && (
          <button
            type="button"
            disabled={!value.trim() || disabled}
            onClick={onSubmit}
            className={cn(
              "inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all cursor-pointer",
              value.trim() && !disabled
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30 hover:scale-105"
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            )}
          >
            <span>Kiểm tra Kết quả</span>
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
