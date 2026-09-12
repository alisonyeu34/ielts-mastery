"use client";

import React, { useState } from "react";
import {
  X,
  Sparkles,
  Copy,
  Check,
  Zap,
  ArrowRight,
  BookOpen,
  Award,
} from "lucide-react";
import { C1UpgradeItem } from "@/lib/aiGraderAPIClient";

interface C1SentenceUpgraderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  upgradeItem: C1UpgradeItem | null;
}

export function C1SentenceUpgraderDrawer({
  isOpen,
  onClose,
  upgradeItem,
}: C1SentenceUpgraderDrawerProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !upgradeItem) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTechniqueLabel = (tech: string) => {
    switch (tech) {
      case "nominalization":
        return "Danh Từ Hóa (Nominalization)";
      case "cleft_sentence":
        return "Câu Chẻ Nhấn Mạnh (Cleft Sentence)";
      case "inversion":
        return "Đảo Ngữ Học Thuật (Inversion)";
      case "participle_clause":
        return "Mệnh Đề Phân Từ Rút Gọn (Participle Clause)";
      default:
        return "Collocations C1 Học Thuật";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-black text-base text-foreground">
                C1 Sentence Upgrader • Nâng Cấp Câu Văn Band 8.0+
              </h3>
              <p className="text-xs text-muted-foreground">
                Kỹ thuật: {getTechniqueLabel(upgradeItem.technique)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 1. Original Sentence (Band 5.5) */}
        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">
              Câu Gốc Của Học Viên (Band 5.5):
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Cần Nâng Cấp</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-foreground line-through decoration-rose-500/50 leading-relaxed">
            &ldquo;{upgradeItem.original}&rdquo;
          </p>
        </div>

        {/* 2. C1 Upgraded Version */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-card to-background border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
              <Award className="h-3.5 w-3.5" /> Phiên Bản Nâng Cấp Chuẩn C1 (Band {upgradeItem.targetBand}):
            </span>

            <button
              type="button"
              onClick={() => handleCopy(upgradeItem.upgraded)}
              className="px-2.5 py-1 rounded-lg bg-card border border-border/80 text-xs font-bold text-foreground hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Đã Sao Chép" : "Sao Chép"}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm font-mono font-bold text-emerald-700 dark:text-emerald-300 leading-relaxed">
            &ldquo;{upgradeItem.upgraded}&rdquo;
          </p>
        </div>

        {/* 3. Deep Rationale & Syntactic Breakdown */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
            Phân Tích Sư Phạm & Cơ Chế Cú Pháp:
          </span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {upgradeItem.explanation}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer"
          >
            Đã Hiểu & Áp Dụng
          </button>
        </div>
      </div>
    </div>
  );
}
