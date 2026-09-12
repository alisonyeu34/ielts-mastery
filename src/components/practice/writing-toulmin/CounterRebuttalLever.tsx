"use client";

import React, { useState } from "react";
import {
  OppositionArgumentItem,
  RebuttalStrategyItem,
} from "@/data/mockToulminData";
import {
  Scale,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Zap,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CounterRebuttalLeverProps {
  oppositionBank: OppositionArgumentItem[];
  counterText: string;
  rebuttalText: string;
  onApplyOpposition: (opp: OppositionArgumentItem) => void;
  className?: string;
}

export function CounterRebuttalLever({
  oppositionBank,
  counterText,
  rebuttalText,
  onApplyOpposition,
  className,
}: CounterRebuttalLeverProps) {
  const hasCounter = counterText.trim().length > 10;
  const hasRebuttal = rebuttalText.trim().length > 15;

  const strategies: RebuttalStrategyItem[] = [
    {
      strategyType: "flawed_premise",
      strategyNameVi: "1. Bóc Trần Tiền Đề Sai (Flawed Premise)",
      descriptionVi: "Chứng minh phe đối lập dựa trên số liệu hoặc giả định lỗi thời.",
      samplePhrase: "This perspective rests on the flawed assumption that...",
    },
    {
      strategyType: "disproportionate_cost",
      strategyNameVi: "2. Chi Phí Bất Cân Xứng (Disproportionate Cost)",
      descriptionVi: "Chỉ ra giải pháp của đối phương mang lại lợi ích tạm thời nhưng tổn hại dài hạn.",
      samplePhrase: "While offering short-term relief, this approach exacts severe systemic costs...",
    },
    {
      strategyType: "viable_alternative",
      strategyNameVi: "3. Giải Pháp Thay Thế Ưu Việt (Viable Alternative)",
      descriptionVi: "Đã có chính sách/công nghệ khác giải quyết triệt để mối lo của đối phương.",
      samplePhrase: "This apprehension is readily neutralized by implementing progressive mechanisms...",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-amber-500" />
          <div>
            <h3 className="text-sm sm:text-base font-black text-foreground">
              Đòn Bẩy Phản Biện: Counter-Argument vs Rebuttal Studio
            </h3>
            <span className="text-[10px] text-muted-foreground">
              Vũ khí quyết định nâng điểm Task Response từ Band 6.5 lên 8.0+
            </span>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-secondary text-foreground border border-border self-start sm:self-auto">
          Cặp Bài Trùng Nhượng Bộ & Bác Bỏ
        </span>
      </div>

      {/* Teeter-Totter Visual Scale */}
      <div className="p-4 rounded-2xl bg-secondary/20 border border-border space-y-3">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-amber-600 dark:text-amber-400">
            Phe Đối Lập (Counter): {hasCounter ? "Đã Nêu" : "Chưa Nêu"}
          </span>
          <span className="text-rose-600 dark:text-rose-400">
            Sức Nặng Bác Bỏ (Rebuttal): {hasRebuttal ? "Thuyết Phục (Chốt Hạ)" : "Còn Trống"}
          </span>
        </div>

        {/* Dynamic Teeter-Totter Bar */}
        <div className="relative w-full h-8 flex items-center justify-center">
          <div
            className={cn(
              "w-full h-2 rounded-full transition-transform duration-500 flex items-center justify-between px-2",
              hasRebuttal
                ? "bg-gradient-to-r from-amber-500 via-emerald-500 to-rose-500 rotate-2"
                : hasCounter
                ? "bg-gradient-to-r from-amber-500 to-secondary -rotate-2"
                : "bg-secondary"
            )}
          >
            <span
              className={cn(
                "h-4 w-4 rounded-full border-2 transition-all",
                hasCounter ? "bg-amber-500 border-white shadow-md scale-110" : "bg-card border-border"
              )}
            />
            <span
              className={cn(
                "h-4 w-4 rounded-full border-2 transition-all",
                hasRebuttal ? "bg-rose-500 border-white shadow-md scale-125 ring-2 ring-rose-500/40" : "bg-card border-border"
              )}
            />
          </div>
          {/* Fulcrum */}
          <div className="absolute top-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-primary" />
        </div>

        <p className="text-[11px] text-center font-mono text-muted-foreground pt-1">
          {hasRebuttal
            ? "✅ Sức nặng lập luận đã nghiêng hoàn toàn về phía bạn nhờ Rebuttal sắc bén!"
            : hasCounter
            ? "⚠️ Cảnh báo: Bạn đang nhượng bộ cho đối phương mà chưa chốt hạ bằng Rebuttal!"
            : "Chưa kích hoạt đòn bẩy phản biện."}
        </p>
      </div>

      {/* 3 Rebuttal Strategy Cards */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-foreground block">
          3 Chiến Thuật Bác Bỏ Luận Điểm Đối Lập Chuẩn C1:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {strategies.map((st) => (
            <div
              key={st.strategyType}
              className="p-3.5 rounded-2xl bg-secondary/15 border border-border space-y-1.5"
            >
              <span className="font-bold text-xs text-primary block leading-tight">
                {st.strategyNameVi}
              </span>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {st.descriptionVi}
              </p>
              <p className="text-[10px] font-mono font-serif italic text-foreground/80 pt-1">
                "{st.samplePhrase}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Opposition Argument Bank Quick Selector */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-foreground block">
          Ngân Hàng Luận Điểm Đối Lập Kinh Điển (Opposition Bank):
        </span>

        <div className="space-y-2">
          {oppositionBank.map((opp) => (
            <div
              key={opp.id}
              className="p-3.5 rounded-2xl border border-border bg-card space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase">
                    Quan điểm đối lập:
                  </span>
                  <p className="text-xs font-bold text-foreground pt-0.5">
                    "{opp.opponentPointEn}"
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    ({opp.opponentPointVi})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyOpposition(opp)}
                  className="px-3.5 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs shrink-0 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Áp Dụng Phản Đề Này</span>
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/80 text-xs space-y-0.5">
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                  💡 Gợi ý Rebuttal bác bỏ chốt hạ:
                </span>
                <p className="font-serif italic text-foreground/90 text-[11px] leading-relaxed">
                  "{opp.suggestedRebuttal}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
