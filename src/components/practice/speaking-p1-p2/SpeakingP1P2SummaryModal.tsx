"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  BookOpen,
  BookmarkPlus,
  Clock,
} from "lucide-react";
import { SpeakingCueCardItem } from "@/data/mockSpeakingP1P2Data";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface SpeakingP1P2SummaryModalProps {
  isOpen: boolean;
  recordSeconds: number;
  cueCard: SpeakingCueCardItem;
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function SpeakingP1P2SummaryModal({
  isOpen,
  recordSeconds,
  cueCard,
  onRestart,
  onClose,
  className,
}: SpeakingP1P2SummaryModalProps) {
  const [savedCollocations, setSavedCollocations] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const isDurationGood = recordSeconds >= 90;
  const estimatedBand =
    recordSeconds >= 105
      ? "Band 8.0+"
      : recordSeconds >= 90
      ? "Band 7.0 - 7.5"
      : "Band 5.0 - 5.5";

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}m ${rem}s`;
  };

  const handleSaveCollocation = async (collocation: {
    phrase: string;
    meaningVi: string;
    example: string;
  }) => {
    try {
      await db.vocab_matrix.put({
        id: `voc_spk_${Date.now()}_${collocation.phrase.replace(/\s+/g, "_")}`,
        word: collocation.phrase,
        ipa: "",
        meaning: collocation.meaningVi,
        collocations: [collocation.phrase],
        originalContext: collocation.example,
        category: "c1_academic",
        status: "learning",
        stepInterval: 1,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        sourceModule: "speaking_part2",
        createdAt: new Date().toISOString(),
      });
      setSavedCollocations((prev) => new Set(prev).add(collocation.phrase));
    } catch (e) {
      console.error("Failed to save collocation to FSRS DB:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5 text-center">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Hoàn Tất Luyện Nói Speaking Part 2
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Độ Trôi Chảy (Fluency & Coherence)
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hệ thống đã lưu bản ghi vào IndexedDB và ghi nhận nhật ký luyện tập.
          </p>
        </div>

        {/* 2 Metric Cards */}
        <div className="grid grid-cols-2 gap-3 text-xs text-center">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Thời Lượng Nói Thực Tế
            </span>
            <span
              className={cn(
                "text-2xl font-black font-mono",
                isDurationGood ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {formatTime(recordSeconds)}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band Độ Trôi Chảy Dự Phóng
            </span>
            <span className="text-2xl font-black font-mono text-primary">
              {estimatedBand}
            </span>
          </div>
        </div>

        {/* Warning if duration < 90s */}
        {!isDurationGood && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Cảnh báo thời lượng dưới 1 phút 30 giây</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Đã ghi nhận lỗi "Cạn ý tưởng Part 2" vào Error Bank để lên lịch rèn luyện thêm.
              </p>
            </div>

            <Link
              href="/error-bank"
              className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shrink-0"
            >
              Xem Lỗi
            </Link>
          </div>
        )}

        {/* Model Speech Band 8.5+ */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-primary font-mono text-xs">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Bài Nói Mẫu Band 8.5+ Tham Khảo:</span>
          </div>
          <p className="text-foreground leading-relaxed font-serif italic text-xs sm:text-sm whitespace-pre-line">
            "{cueCard.modelSpeechBand85}"
          </p>
        </div>

        {/* C1/C2 Collocations to Save to FSRS */}
        <div className="space-y-2 text-xs">
          <span className="font-mono font-bold text-[10px] text-muted-foreground uppercase block">
            Các Cụm Từ Vựng C1/C2 Nổi Bật Trong Bài Mẫu:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {cueCard.highBandCollocations.map((col) => {
              const isSaved = savedCollocations.has(col.phrase);

              return (
                <div
                  key={col.phrase}
                  className="p-3 rounded-2xl bg-card border border-border/70 flex items-start justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-foreground font-mono text-xs block">
                      {col.phrase}
                    </span>
                    <span className="text-[11px] text-muted-foreground block">
                      {col.meaningVi}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={isSaved}
                    onClick={() => handleSaveCollocation(col)}
                    className={cn(
                      "p-1.5 rounded-lg border transition-all cursor-pointer shrink-0",
                      isSaved
                        ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30"
                        : "bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary border-border"
                    )}
                    title="Lưu vào Sổ Từ Vựng FSRS"
                  >
                    {isSaved ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <BookmarkPlus className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            Đóng & Xem Lại Dàn Ý
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Lại Cue Card Này Từ Đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
