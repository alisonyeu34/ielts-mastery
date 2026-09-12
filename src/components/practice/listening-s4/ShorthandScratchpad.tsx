"use client";

import React, { useState } from "react";
import {
  PenTool,
  Sparkles,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";
import { Section4BlankItem } from "@/data/mockSection4DenseData";
import { cn } from "@/lib/utils";

interface ShorthandScratchpadProps {
  scratchpadText: string;
  onTextChange: (text: string) => void;
  blanks: Section4BlankItem[];
  isSubmitted: boolean;
  onOpenDictionary: () => void;
  className?: string;
}

const QUICK_SYMBOLS = [
  { sym: "→", desc: "dẫn tới / kết quả" },
  { sym: "←", desc: "bắt nguồn từ" },
  { sym: "↑", desc: "tăng trưởng" },
  { sym: "↓", desc: "suy giảm" },
  { sym: "≈", desc: "xấp xỉ" },
  { sym: "≠", desc: "khác biệt" },
  { sym: "∴", desc: "do đó" },
  { sym: "∵", desc: "bởi vì" },
  { sym: "Δ", desc: "thay đổi" },
  { sym: "=", desc: "tương đương" },
];

export function ShorthandScratchpad({
  scratchpadText,
  onTextChange,
  blanks,
  isSubmitted,
  onOpenDictionary,
  className,
}: ShorthandScratchpadProps) {
  const [showModelComparison, setShowModelComparison] = useState<boolean>(false);

  const handleInputChange = (raw: string) => {
    // Perform real-time shortcut auto-replacement
    let processed = raw
      .replace(/->/g, "→")
      .replace(/<-/g, "←")
      .replace(/\^/g, "↑")
      .replace(/\\v/g, "↓")
      .replace(/\\delta/g, "Δ")
      .replace(/\\approx/g, "≈")
      .replace(/\\neq/g, "≠");

    onTextChange(processed);
  };

  const insertSymbol = (sym: string) => {
    onTextChange(scratchpadText ? `${scratchpadText} ${sym} ` : `${sym} `);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3.5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <PenTool className="h-3.5 w-3.5" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-foreground">
            Bảng Tốc Ký Học Thuật (Shorthand Scratchpad)
          </h4>
        </div>

        <button
          type="button"
          onClick={onOpenDictionary}
          className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
        >
          <BookOpen className="h-3 w-3" />
          <span>Quy tắc ký hiệu</span>
        </button>
      </div>

      <p className="text-[11px] text-muted-foreground leading-snug">
        Gõ nhanh ý chính bằng ký hiệu logic để không bị mất nhịp khi nghe. Ví dụ gõ <code>{"->"}</code> sẽ tự đổi thành <code>→</code>.
      </p>

      {/* Quick 1-tap Symbol Insertion Toolbar */}
      <div className="flex flex-wrap gap-1">
        {QUICK_SYMBOLS.map((s) => (
          <button
            key={s.sym}
            type="button"
            onClick={() => insertSymbol(s.sym)}
            className="h-7 px-2 rounded-lg bg-secondary hover:bg-purple-500/20 text-foreground font-mono font-bold text-xs border border-border transition-colors cursor-pointer"
            title={s.desc}
          >
            {s.sym}
          </button>
        ))}
      </div>

      {/* Note-Taking Textarea */}
      <textarea
        rows={6}
        value={scratchpadText}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Ghi nháp tốc độ cao trong lúc nghe... (ví dụ: clim warm -> sedentary life nr H2O | brittle stem -> seed dispersal...)"
        className="w-full rounded-2xl border border-border bg-secondary/20 p-3 text-xs font-mono leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/30"
      />

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => onTextChange("")}
          className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Xóa bảng nháp</span>
        </button>

        {isSubmitted && (
          <button
            type="button"
            onClick={() => setShowModelComparison(!showModelComparison)}
            className="text-[11px] font-bold px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-pointer"
          >
            {showModelComparison ? "Ẩn tốc ký mẫu" : "Đối chiếu Tốc ký Mẫu C1"}
          </button>
        )}
      </div>

      {/* Model Shorthand Comparison Drawer */}
      {showModelComparison && isSubmitted && (
        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border space-y-2 text-xs animate-in fade-in duration-150">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
            Bản Tốc Ký Mẫu Chuẩn Cho 10 Câu:
          </span>
          <div className="space-y-1.5 font-mono text-[11px] max-h-48 overflow-y-auto">
            {blanks.map((b) => (
              <div key={b.questionNumber} className="p-2 rounded-xl bg-card border border-border/80 flex items-start gap-2">
                <span className="font-bold text-purple-600 shrink-0">Q{b.questionNumber}:</span>
                <span className="text-foreground/90">{b.idealShorthand}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
