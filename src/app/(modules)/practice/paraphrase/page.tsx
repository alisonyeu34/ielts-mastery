"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Sparkles,
  Layers,
  Zap,
  HelpCircle,
  Clock,
  Award,
} from "lucide-react";
import { MOCK_PARAPHRASE_PAIRS } from "@/data/mockParaphraseData";
import { ParaphraseMatchBoard } from "@/components/practice/paraphrase/ParaphraseMatchBoard";
import { ScanningSpeedDrill } from "@/components/practice/paraphrase/ScanningSpeedDrill";
import { ParaphraseTrapGuide } from "@/components/practice/paraphrase/ParaphraseTrapGuide";
import { ParaphraseResultSummary } from "@/components/practice/paraphrase/ParaphraseResultSummary";
import { cn } from "@/lib/utils";

type TabMode = "matching" | "scanning" | "guide";

export default function ParaphrasePracticePage() {
  const [activeTab, setActiveTab] = useState<TabMode>("matching");

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Kỹ Thuật Định Vị Paraphrase Mapping
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Bản Đồ Đối Chiếu Từ Đồng Nghĩa & Kỹ Thuật Scanning
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Nhận diện 4 cơ chế bẫy từ đồng nghĩa của giám khảo Cambridge: Synonym, Word Class Transition, Negation of Antonym và Conceptual Restatement.
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* Summary Stats */}
      <ParaphraseResultSummary />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/60 border border-border/80">
        <button
          type="button"
          onClick={() => setActiveTab("matching")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "matching"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Layers className="h-4 w-4 text-indigo-500" />
          <span>Bản Đồ Ghép Cặp Paraphrase (Match Board)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scanning")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "scanning"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Zap className="h-4 w-4 text-purple-500" />
          <span>Quét Nhanh Đoạn Văn (Timed Scanning Drill)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("guide")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "guide"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <BookOpen className="h-4 w-4 text-amber-500" />
          <span>Bí Kíp 4 Bẫy Khảo Thí (Trap Guide)</span>
        </button>
      </div>

      {/* Tab 1: Matching Canvas */}
      {activeTab === "matching" && (
        <div className="animate-in fade-in duration-300">
          <ParaphraseMatchBoard pairs={MOCK_PARAPHRASE_PAIRS} />
        </div>
      )}

      {/* Tab 2: Timed Scanning Drill */}
      {activeTab === "scanning" && (
        <div className="animate-in fade-in duration-300">
          <ScanningSpeedDrill />
        </div>
      )}

      {/* Tab 3: Trap Guide */}
      {activeTab === "guide" && (
        <div className="animate-in fade-in duration-300">
          <ParaphraseTrapGuide />
        </div>
      )}
    </div>
  );
}
