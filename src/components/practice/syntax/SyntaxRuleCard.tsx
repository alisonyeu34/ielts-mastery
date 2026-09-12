"use client";

import React from "react";
import { BookOpen, Sparkles, ArrowRight, Lightbulb, CheckCircle2 } from "lucide-react";
import { SyntaxCategory } from "@/data/mockSyntaxData";
import { cn } from "@/lib/utils";

interface SyntaxRuleCardProps {
  category: SyntaxCategory;
  className?: string;
}

const CATEGORY_RULES: Record<
  SyntaxCategory,
  {
    titleVi: string;
    coreMechanism: string;
    band5Sample: string;
    band8Sample: string;
    formula: string;
  }
> = {
  nominalization: {
    titleVi: "Quy Tắc Danh Từ Hóa (Nominalization)",
    coreMechanism:
      "Biến đổi cụm động từ/tính từ miêu tả hành động thành cụm danh từ trừu tượng. Giúp câu văn cô đọng, loại bỏ đại từ nhân xưng và tăng mật độ từ vựng học thuật (Lexical Density).",
    band5Sample: "Because people are cutting down forests quickly, animals lose their homes.",
    band8Sample: "Rapid deforestation precipitates the widespread loss of natural wildlife habitats.",
    formula: "[Because S + V + O...] ➔ [Abstract Noun Phrase] + [Academic Pivot Verb] + [Result Noun Phrase]",
  },
  inversion: {
    titleVi: "Quy Tắc Đảo Ngữ Học Thuật (Inversion)",
    coreMechanism:
      "Đưa trạng từ phủ định/bán phủ định hoặc trợ động từ câu điều kiện lên đầu câu, sau đó đảo trợ động từ lên trước chủ ngữ để tạo điểm nhấn ngữ pháp mạnh mẽ (Band 8.0+ GRA).",
    band5Sample: "Governments should never compromise environmental standards for profits.",
    band8Sample: "Under no circumstances should governments compromise ecological integrity for short-term profits.",
    formula: "[Negative Adverb / Were / Had] + [Auxiliary / Modal Verb] + [Subject] + [Main Verb]...",
  },
  cleft: {
    titleVi: "Quy Tắc Câu Chẻ Nhấn Mạnh (Cleft Sentences)",
    coreMechanism:
      "Tách câu đơn thành hai mệnh đề để hướng toàn bộ sự chú ý của người đọc vào thủ phạm cốt lõi (It-cleft) hoặc giải pháp mang tính then chốt (Wh-cleft).",
    band5Sample: "Industrial wastewater causes damage to the local river.",
    band8Sample: "It is unchecked industrial wastewater discharge that inflicts irreparable harm on the river ecosystem.",
    formula: "It is/was + [Focused Element] + that + [Remaining clause] / What + [S + V] + is/was + [Key Focus]",
  },
};

export function SyntaxRuleCard({ category, className }: SyntaxRuleCardProps) {
  const rule = CATEGORY_RULES[category];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="h-4 w-4" />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground">
            {rule.titleVi}
          </h3>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
          Band 8.0+ Stylistics
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {rule.coreMechanism}
      </p>

      {/* Formula Box */}
      <div className="p-3 rounded-xl bg-secondary/40 border border-border font-mono text-xs text-foreground font-semibold">
        <span className="text-[10px] text-muted-foreground uppercase block font-sans mb-0.5">
          Công thức cú pháp:
        </span>
        <code>{rule.formula}</code>
      </div>

      {/* Before vs After Contrast Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
        <div className="p-3.5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-1">
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
            🔴 Phong cách văn nói (Band 5.5):
          </span>
          <p className="font-serif italic text-foreground/90">
            "{rule.band5Sample}"
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-1">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
            🟢 Phong cách học thuật (Band 8.0+):
          </span>
          <p className="font-serif italic text-foreground/90">
            "{rule.band8Sample}"
          </p>
        </div>
      </div>
    </div>
  );
}
