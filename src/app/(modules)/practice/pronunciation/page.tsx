"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  ArrowLeft,
  Sparkles,
  Award,
  Layers,
  Smile,
  Zap,
  BookOpen,
} from "lucide-react";
import { IPASoundboardGrid } from "@/components/practice/pronunciation/IPASoundboardGrid";
import { MinimalPairQuiz } from "@/components/practice/pronunciation/MinimalPairQuiz";
import { PronunciationStats } from "@/components/practice/pronunciation/PronunciationStats";
import { cn } from "@/lib/utils";

type MainTab = "soundboard" | "minimal_pairs";

export default function PronunciationPracticePage() {
  const [activeTab, setActiveTab] = useState<MainTab>("soundboard");

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Luyện Tập Vi Mô (Giai đoạn 1)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phòng Luyện Âm 44 Ký Tự IPA & Cặp Âm Tương Phản
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Chuẩn hóa phát âm bản xứ từ gốc: Nắm vững khẩu hình miệng, phân biệt cặp âm dễ nhầm và triệt tiêu lỗi phát âm trong IELTS Listening & Speaking.
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* Stats Summary Widget */}
      <PronunciationStats />

      {/* Main Mode Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/60 border border-border/80">
        <button
          type="button"
          onClick={() => setActiveTab("soundboard")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "soundboard"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Volume2 className="h-4 w-4 text-indigo-500" />
          <span>Bảng 44 Âm Chuẩn IPA (IPA Soundboard)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("minimal_pairs")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "minimal_pairs"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Zap className="h-4 w-4 text-purple-500" />
          <span>Thử Thách Cặp Âm (Minimal Pairs Drill)</span>
        </button>
      </div>

      {/* Tab 1: 44 IPA Soundboard */}
      {activeTab === "soundboard" && (
        <div className="animate-in fade-in duration-300">
          <IPASoundboardGrid />
        </div>
      )}

      {/* Tab 2: Minimal Pairs Quiz */}
      {activeTab === "minimal_pairs" && (
        <div className="animate-in fade-in duration-300">
          <MinimalPairQuiz />
        </div>
      )}
    </div>
  );
}
