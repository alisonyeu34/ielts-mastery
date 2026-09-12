"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  BookOpen,
  Plus,
  Check,
  Award,
  ArrowRight,
} from "lucide-react";
import { DetailedC1Upgrade } from "@/types/database";
import { db } from "@/lib/db";
import { VocabCard } from "@/types/database";
import { cleanWord } from "@/lib/diffEngine";
import { cn } from "@/lib/utils";

interface C1UpgradeListProps {
  upgrades: DetailedC1Upgrade[];
  className?: string;
}

export function C1UpgradeList({ upgrades, className }: C1UpgradeListProps) {
  const [savedIndex, setSavedIndex] = useState<Record<number, boolean>>({});

  const handleSaveToFSRS = async (item: DetailedC1Upgrade, index: number) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const newCard: VocabCard = {
        id: `vocab_upgrade_${Date.now()}_${index}`,
        word: "C1/C2 Academic Structure",
        ipa: "",
        meaning: item.explanation,
        collocations: [],
        originalContext: item.upgraded,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        nextReviewDate: today,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        createdAt: new Date().toISOString(),
      };

      await db.vocab_matrix.put(newCard);
      setSavedIndex((prev) => ({ ...prev, [index]: true }));
    } catch (e) {
      console.error("Failed to save to vocab matrix:", e);
    }
  };

  if (!upgrades || upgrades.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center text-xs text-muted-foreground">
        Chưa có đề xuất nâng cấp câu nào cho bài viết này.
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Đề Xuất Nâng Cấp Câu Phức Tự Nhiên (Band 6.5 - 7.5+)
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Nâng cấp câu đơn thành câu phức tự nhiên: Mệnh đề quan hệ (which/that/who), Liên từ tương phản/nguyên nhân (Although/Whereas/Since), và Phân từ rút gọn (V-ing/V-ed). Tránh đảo ngữ hay danh từ hóa cồng kềnh gây gãy cấu trúc.
        </p>
      </div>

      <div className="space-y-4">
        {upgrades.map((item, idx) => {
          const isSaved = savedIndex[idx];

          return (
            <div
              key={idx}
              className="rounded-2xl border border-purple-500/25 bg-gradient-to-b from-card to-purple-500/[0.02] p-5 sm:p-6 space-y-4 shadow-sm"
            >
              {/* Header badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Band 8.0+ Rewriting
                </span>

                <button
                  type="button"
                  onClick={() => handleSaveToFSRS(item, idx)}
                  disabled={isSaved}
                  className={cn(
                    "px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
                    isSaved
                      ? "bg-emerald-600 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-600/20"
                  )}
                >
                  {isSaved ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Đã lưu vào FSRS</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3" />
                      <span>Lưu mẫu câu vào FSRS</span>
                    </>
                  )}
                </button>
              </div>

              {/* Before & After comparison */}
              <div className="space-y-3 text-xs sm:text-sm">
                {/* Original draft */}
                <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">
                    Câu văn gốc của bạn:
                  </span>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{item.original}"
                  </p>
                </div>

                {/* Upgraded version */}
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" /> Phiên bản nâng cấp Band 8.0+ (Advanced Stylistics):
                  </span>
                  <p className="text-foreground font-bold leading-relaxed text-sm sm:text-base">
                    "{item.upgraded}"
                  </p>
                </div>
              </div>

              {/* Why this scores higher */}
              <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/50 text-xs space-y-1 text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-500" /> Tại sao cách viết này gây ấn tượng mạnh với giám khảo?
                </span>
                <p>{item.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
