"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PREDICTION_RULES = [
  {
    pattern: "a / an / the + [ ? ]",
    expectedPOS: "Danh từ (Noun)",
    example: "...sliced into micro-thin [ silicon wafers ]...",
    tip: "Nếu có mạo từ 'a/an', bắt buộc là Danh từ số ít đếm được. Nếu không có 'a/an', có thể là Danh từ số nhiều hoặc không đếm được.",
  },
  {
    pattern: "Tính từ (Adjective) + [ ? ]",
    expectedPOS: "Danh từ (Noun / Noun Phrase)",
    example: "...deploying automated [ robotic wipers ]...",
    tip: "Sau tính từ thường là đối tượng chịu tác động hoặc danh từ chính của cụm.",
  },
  {
    pattern: "Giới từ (in / within / of / for) + [ ? ]",
    expectedPOS: "Danh từ hoặc V-ing",
    example: "...particles within the [ valence band ]...",
    tip: "Xác định giới từ chỉ nơi chốn, thời gian hay phương thức để dự đoán trường nghĩa của từ cần điền.",
  },
  {
    pattern: "be (is / are / were) + [ ? ]",
    expectedPOS: "Tính từ hoặc V3/ed (Bị động)",
    example: "...fluid is directed into an expansive [ settlement chamber ]...",
    tip: "Cấu trúc bị động hoặc miêu tả trạng thái tính chất của chủ ngữ.",
  },
  {
    pattern: "Động từ khiếm khuyết (can / must / will) + [ ? ]",
    expectedPOS: "Động từ nguyên mẫu (V_inf)",
    example: "...can accumulate on the...",
    tip: "Bắt buộc giữ nguyên thể động từ, không thêm đuôi -s hay -ing.",
  },
];

export function PredictionHelperModal({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Bí Kíp Dự Đoán Từ Loại (Predictive Reading Strategy)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Dự đoán Danh từ, Động từ, Tính từ & Số lượng trước khi quét bài đọc
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
        <div className="p-4 pt-1 space-y-3 border-t border-border/70 text-xs animate-in fade-in duration-150">
          <p className="text-muted-foreground leading-relaxed">
            Trước khi nhìn vào bài đọc, hãy đọc câu chứa ô trống và dự đoán từ loại cũng như dạng thức (số ít/nhiều). Điều này giúp bạn loại bỏ ngay 80% từ gây nhiễu trong đoạn văn.
          </p>

          <div className="space-y-2">
            {PREDICTION_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-secondary/30 border border-border/70 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-[11px]">
                    {rule.pattern}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    ➔ {rule.expectedPOS}
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  💡 <strong>Ví dụ:</strong> "{rule.example}"
                </p>
                <p className="text-muted-foreground text-[11px] leading-tight">
                  {rule.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
