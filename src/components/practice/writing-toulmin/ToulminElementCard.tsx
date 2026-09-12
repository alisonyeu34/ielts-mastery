"use client";

import React from "react";
import { countWords } from "@/hooks/useToulminBuilder";
import { ToulminElements } from "@/data/mockToulminPrompts";
import { cn } from "@/lib/utils";

export type ToulminFieldKey = keyof ToulminElements;

interface ToulminElementCardProps {
  field: ToulminFieldKey;
  value: string;
  onChange: (val: string) => void;
  isWarning?: boolean;
  className?: string;
}

const TOULMIN_FIELD_METADATA: Record<
  ToulminFieldKey,
  {
    letter: string;
    titleVi: string;
    titleEn: string;
    description: string;
    colorBadge: string;
    borderActive: string;
    starterHint: string;
    placeholder: string;
  }
> = {
  claim: {
    letter: "C",
    titleVi: "1. Claim (Luận Điểm Cốt Lõi)",
    titleEn: "Core Stance",
    description: "Tuyên bố luận điểm trung tâm cần chứng minh trong đoạn văn.",
    colorBadge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    borderActive: "border-blue-500/40 focus-within:border-blue-600 focus-within:ring-blue-500/20",
    starterHint: "Levying a punitive tax on X is fundamentally counterproductive to...",
    placeholder: "Nêu rõ ràng quan điểm cốt lõi của đoạn văn (ví dụ: Levying a punitive tax on robotics is fundamentally counterproductive to economic growth...)",
  },
  data: {
    letter: "D",
    titleVi: "2. Data / Evidence (Căn Cứ / Bằng Chứng)",
    titleEn: "Empirical Evidence",
    description: "Số liệu, nghiên cứu thực chứng hoặc sự thật khách quan củng cố luận điểm.",
    colorBadge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    borderActive: "border-emerald-500/40 focus-within:border-emerald-600 focus-within:ring-emerald-500/20",
    starterHint: "Empirical studies across OECD economies demonstrate that...",
    placeholder: "Đưa ra bằng chứng thực tế hoặc nghiên cứu cụ thể (ví dụ: Empirical studies across OECD economies reveal that nations with high robot density...)",
  },
  warrant: {
    letter: "W",
    titleVi: "3. Warrant (Cầu Nối Logic / Bảo Chứng)",
    titleEn: "Logical Connector",
    description: "Nguyên lý ngầm giải thích vì sao Data chứng minh được Claim (Cốt lõi Band 8.0+).",
    colorBadge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    borderActive: "border-purple-500/40 focus-within:border-purple-600 focus-within:ring-purple-500/20",
    starterHint: "This outcome occurs because automation lowers unit production costs, which...",
    placeholder: "Giải thích cơ chế nhân - quả kết nối Data với Claim (ví dụ: This outcome occurs because automation lowers production costs, stimulating new demand...)",
  },
  backing: {
    letter: "B",
    titleVi: "4. Backing (Hậu Thuẫn / Cơ Sở Lý Thuyết)",
    titleEn: "Theoretical Foundation",
    description: "Cơ sở lý thuyết kinh tế, chính sách hoặc nguyên tắc phổ quát bổ trợ cho Warrant.",
    colorBadge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    borderActive: "border-indigo-500/40 focus-within:border-indigo-600 focus-within:ring-indigo-500/20",
    starterHint: "This logic is underpinned by economic principles of capital accumulation...",
    placeholder: "Nêu nguyên tắc học thuật hoặc chính sách bổ trợ (ví dụ: This principle is supported by economic theories of creative destruction...)",
  },
  counterArgument: {
    letter: "CA",
    titleVi: "5. Counter-Argument (Luận Điểm Đối Lập - Nhượng Bộ)",
    titleEn: "Concession",
    description: "Nhìn nhận công bằng góc nhìn của phe phản đối (Steel-manning the opposition).",
    colorBadge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    borderActive: "border-amber-500/40 focus-within:border-amber-600 focus-within:ring-amber-500/20",
    starterHint: "Admittedly, proponents legitimately point out that rapid automation causes...",
    placeholder: "Thừa nhận một lo ngại hợp lý của phe đối lập (ví dụ: Admittedly, proponents legitimately contend that rapid automation causes transitional friction...)",
  },
  rebuttal: {
    letter: "R",
    titleVi: "6. Rebuttal (Bác Bỏ / Phản Đòn Quyết Định)",
    titleEn: "Decisive Invalidation",
    description: "Chỉ ra lỗ hổng hoặc tính bất khả thi của luận điểm đối lập để khẳng định lại Claim.",
    colorBadge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    borderActive: "border-rose-500/40 focus-within:border-rose-600 focus-within:ring-rose-500/20",
    starterHint: "However, penalizing technological innovation fails to address the root issue; instead...",
    placeholder: "Bẻ gãy luận điểm đối lập và đề xuất giải pháp vượt trội (ví dụ: However, penalizing innovation fails to solve skill deficits; instead, governments should fund upskilling...)",
  },
};

export function ToulminElementCard({
  field,
  value,
  onChange,
  isWarning,
  className,
}: ToulminElementCardProps) {
  const meta = TOULMIN_FIELD_METADATA[field];
  const words = countWords(value);

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 space-y-2.5 transition-all shadow-sm",
        isWarning
          ? "border-rose-500/60 bg-rose-500/[0.02] ring-2 ring-rose-500/20"
          : meta.borderActive,
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-6 w-8 items-center justify-center rounded-lg font-mono text-xs font-extrabold border shadow-xs",
              meta.colorBadge
            )}
          >
            {meta.letter}
          </span>
          <span className="text-xs sm:text-sm font-bold text-foreground">
            {meta.titleVi}
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
        rows={field === "warrant" || field === "rebuttal" ? 3 : 2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={meta.placeholder}
        className="w-full rounded-xl border border-border/80 bg-secondary/20 p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-serif leading-relaxed"
      />
    </div>
  );
}
