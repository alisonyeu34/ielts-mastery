"use client";

import React from "react";
import { countWords } from "@/hooks/usePEELEditor";
import { cn } from "@/lib/utils";

export type PEELType = "point" | "explain" | "example" | "link";

interface PEELBlockCardProps {
  type: PEELType;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

const PEEL_METADATA: Record<
  PEELType,
  {
    letter: string;
    title: string;
    description: string;
    colorBadge: string;
    borderActive: string;
    starterHint: string;
    placeholder: string;
  }
> = {
  point: {
    letter: "P",
    title: "Point (Câu Chủ Đề / Topic Sentence)",
    description: "Nêu luận điểm chính trực tiếp, rõ ràng trong 1 câu duy nhất.",
    colorBadge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    borderActive: "border-blue-500/40 focus-within:border-blue-600 focus-within:ring-blue-500/20",
    starterHint: "The primary justification for X is that... / On the one hand, ...",
    placeholder: "Nêu rõ ràng luận điểm cốt lõi của đoạn văn (ví dụ: The primary catalyst behind youth inactivity is the dominance of digital entertainment...)",
  },
  explain: {
    letter: "E",
    title: "Explanation (Giải Thích Bản Chất / Cơ Chế)",
    description: "Làm rõ vì sao điều đó xảy ra? Cơ chế nhân - quả dẫn đến kết luận.",
    colorBadge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    borderActive: "border-purple-500/40 focus-within:border-purple-600 focus-within:ring-purple-500/20",
    starterHint: "This is because... / When X happens, it naturally leads to Y...",
    placeholder: "Giải thích cơ chế sâu xa tại sao luận điểm trên lại đúng (2-3 câu logic phân tích nguyên nhân - kết quả)...",
  },
  example: {
    letter: "E",
    title: "Example (Dẫn Chứng / Trường Hợp Cụ Thể)",
    description: "Đưa ra dẫn chứng thực tế, số liệu nghiên cứu hoặc mô hình thành công.",
    colorBadge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    borderActive: "border-amber-500/40 focus-within:border-amber-600 focus-within:ring-amber-500/20",
    starterHint: "For example, ... / For instance, ... / A compelling illustration is ...",
    placeholder: "Đưa ra ví dụ cụ thể minh họa có bối cảnh địa lý hoặc số liệu thống kê (1-2 câu)...",
  },
  link: {
    letter: "L",
    title: "Link (Câu Chốt Liên Kết / Tổng Kết)",
    description: "Khẳng định lại ý nghĩa luận điểm và liên kết quay trở lại câu Thesis.",
    colorBadge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    borderActive: "border-emerald-500/40 focus-within:border-emerald-600 focus-within:ring-emerald-500/20",
    starterHint: "Consequently, ... / Thus, ... / Hence, it is evident that ...",
    placeholder: "Chốt lại tầm quan trọng của luận điểm đối với câu hỏi đề bài (1 câu đanh thép)...",
  },
};

export function PEELBlockCard({
  type,
  value,
  onChange,
  className,
}: PEELBlockCardProps) {
  const meta = PEEL_METADATA[type];
  const words = countWords(value);

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 space-y-2.5 transition-all shadow-sm",
        meta.borderActive,
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-lg font-mono text-xs font-extrabold border shadow-xs",
              meta.colorBadge
            )}
          >
            {meta.letter}
          </span>
          <span className="text-xs sm:text-sm font-bold text-foreground">
            {meta.title}
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-[11px] text-muted-foreground">
          <span className="font-mono font-bold text-foreground">{words} từ</span>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        💡 <em>Gợi ý mở đầu:</em> <code className="text-foreground font-semibold">{meta.starterHint}</code>
      </p>

      <textarea
        rows={type === "explain" ? 4 : 3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={meta.placeholder}
        className="w-full rounded-xl border border-border/80 bg-secondary/20 p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-serif leading-relaxed"
      />
    </div>
  );
}
