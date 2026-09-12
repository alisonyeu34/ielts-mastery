"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Target,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const REBUTTAL_TACTICS = [
  {
    tactic: "1. Bác bỏ bằng Tính Khả Thi Kém (Feasibility Flaw)",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    description: "Chỉ ra chính sách hoặc quan điểm đối lập không thể thực thi trong thực tế.",
    phrases: [
      "However, distinguishing between X and Y is practically impossible, rendering this policy unenforceable...",
      "In reality, bureaucratic hurdles and enforcement costs would far outweigh any projected benefits...",
      "Such a regulatory mandate suffers from acute operational bottlenecks...",
    ],
  },
  {
    tactic: "2. Bác bỏ bằng Hệ Quả Ngoài Ý Muốn (Unintended Consequences)",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    description: "Cảnh báo những tác động tiêu cực gián tiếp lâu dài làm phản tác dụng.",
    phrases: [
      "Such a punitive measure would inadvertently prompt corporations to offshore operations...",
      "This policy paradoxically exacerbates the very inequality it seeks to rectify...",
      "The long-term systemic repercussions would inflict severe collateral damage on...",
    ],
  },
  {
    tactic: "3. Bác bỏ bằng Giải Pháp Thay Thế Ưu Việt (Superior Alternative)",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    description: "Đề xuất chính sách tiến bộ hơn thay vì áp dụng giải pháp cưỡng chế thô cứng.",
    phrases: [
      "Rather than penalizing X, state authorities should leverage general revenue to subsidize...",
      "A vastly more progressive and sustainable vehicle is targeted means-tested scholarships...",
      "Instead of stifling modernization, governments ought to invest in continuous upskilling...",
    ],
  },
  {
    tactic: "4. Bác bỏ bằng Mâu Thuẫn Nội Tại / Ngụy Biện (Internal Fallacy)",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    description: "Vạch trần ngụy biện phân cực giả tạo (False dichotomy) hoặc coi thị trường là chiếc bánh cố định (Fixed-pie fallacy).",
    phrases: [
      "This critique creates a false zero-sum dichotomy between scientific progress and social welfare...",
      "This reasoning commits the classic Luddite fallacy by assuming the volume of jobs is static...",
      "This premise rests on the flawed assumption that commercial growth and ecology are mutually exclusive...",
    ],
  },
];

export function RebuttalPhraseBank({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);

  const handleCopy = (phrase: string, id: string) => {
    navigator.clipboard.writeText(phrase);
    setCopiedIdx(id);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <span>Ngân Hàng 4 Chiến Thuật Bác Bỏ C1/C2 (Academic Disrupters)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                Rebuttal Arsenal
              </span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Kho mẫu câu bẻ gãy luận điểm đối lập bằng 4 đòn bẩy phản biện học thuật
            </p>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 sm:p-6 pt-1 space-y-4 border-t border-border/70 text-xs animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {REBUTTAL_TACTICS.map((tact, tIdx) => (
              <div
                key={tIdx}
                className="p-3.5 rounded-2xl bg-secondary/30 border border-border/70 space-y-2.5"
              >
                <div className="space-y-0.5">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block",
                      tact.color
                    )}
                  >
                    {tact.tactic}
                  </span>
                  <p className="text-[11px] text-muted-foreground">{tact.description}</p>
                </div>

                <div className="space-y-1.5">
                  {tact.phrases.map((phrase, pIdx) => {
                    const id = `${tIdx}-${pIdx}`;
                    const isCopied = copiedIdx === id;

                    return (
                      <div
                        key={pIdx}
                        onClick={() => handleCopy(phrase, id)}
                        className="p-2 rounded-xl bg-card border border-border/80 hover:border-indigo-500/50 flex items-start justify-between gap-2 cursor-pointer transition-colors group"
                      >
                        <p className="text-[11px] font-serif text-foreground/90 leading-snug">
                          <code>{phrase}</code>
                        </p>
                        <button
                          type="button"
                          className="text-muted-foreground group-hover:text-indigo-600 p-1 shrink-0"
                          title="Sao chép mẫu câu"
                        >
                          {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
