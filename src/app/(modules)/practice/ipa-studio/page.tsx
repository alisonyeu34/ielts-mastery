"use client";

import React from "react";
import Link from "next/link";
import {
  Volume2,
  ArrowLeft,
  Sparkles,
  Layers,
  Award,
  Zap,
} from "lucide-react";
import { useIPAPhonetics } from "@/hooks/useIPAPhonetics";
import { IPABoard } from "@/components/practice/ipa/IPABoard";
import { VocalTractVisualizer } from "@/components/practice/ipa/VocalTractVisualizer";
import { PhonemeDetailModal } from "@/components/practice/ipa/PhonemeDetailModal";
import { MinimalPairDrill } from "@/components/practice/ipa/MinimalPairDrill";
import { IPAMasteryProgressBar } from "@/components/practice/ipa/IPAMasteryProgressBar";
import { MinimalPairResultModal } from "@/components/practice/ipa/MinimalPairResultModal";
import { MINIMAL_PAIRS_DATA } from "@/data/mockIPAData";
import { cn } from "@/lib/utils";

export default function IPAStudioPage() {
  const {
    masteredPhonemes,
    selectedPhoneme,
    activeTab,
    minimalPairIndex,
    currentPair,
    currentTargetWord,
    earScore,
    isDrillCompleted,
    showResultModal,
    drillHistory,
    setSelectedPhoneme,
    setActiveTab,
    speakText,
    speakPhoneme,
    togglePhonemeMastered,
    answerMinimalPair,
    resetDrill,
    setShowResultModal,
  } = useIPAPhonetics();

  return (
    <div className="space-y-7 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Volume2 className="h-4 w-4" /> Nền Tảng Phase 1 • Phòng Luyện Phát Âm 44 Âm IPA & Cặp Âm
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Bảng 44 Âm IPA, Sơ Đồ Khẩu Hình & Đấu Trường Cặp Âm
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Xây gốc phát âm chuẩn bản xứ • Giải phẫu vị trí đặt lưỡi, môi, dây thanh quản & phân biệt cặp âm dễ nhầm.
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
        </Link>
      </div>

      {/* Mastery Progress Bar */}
      <IPAMasteryProgressBar masteredCount={masteredPhonemes.size} />

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-secondary/40 border border-border max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab("ipa_matrix")}
          className={cn(
            "w-1/2 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
            activeTab === "ipa_matrix"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Layers className="h-4 w-4 text-primary" />
          <span>Bảng 44 Âm IPA</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("minimal_pairs")}
          className={cn(
            "w-1/2 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
            activeTab === "minimal_pairs"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Zap className="h-4 w-4 text-amber-500" />
          <span>Đấu Trường Cặp Âm</span>
        </button>
      </div>

      {/* Tab 1: 44 IPA Matrix */}
      {activeTab === "ipa_matrix" && (
        <div className="animate-in fade-in duration-200">
          <IPABoard
            masteredPhonemes={masteredPhonemes}
            onSelectPhoneme={setSelectedPhoneme}
            onSpeakPhoneme={speakPhoneme}
          />
        </div>
      )}

      {/* Tab 2: Minimal Pairs Challenge */}
      {activeTab === "minimal_pairs" && (
        <div className="animate-in fade-in duration-200 max-w-3xl mx-auto">
          <MinimalPairDrill
            currentPair={currentPair}
            currentIndex={minimalPairIndex}
            totalCount={MINIMAL_PAIRS_DATA.length}
            currentTargetWord={currentTargetWord}
            earScore={earScore}
            onAnswer={answerMinimalPair}
            onSpeakWord={(w) => speakText(w, 0.85)}
          />
        </div>
      )}

      {/* Detail Anatomical Modal */}
      <PhonemeDetailModal
        phoneme={selectedPhoneme}
        isMastered={selectedPhoneme ? masteredPhonemes.has(selectedPhoneme.symbol) : false}
        onClose={() => setSelectedPhoneme(null)}
        onSpeak={speakPhoneme}
        onToggleMastered={togglePhonemeMastered}
      />

      {/* Minimal Pair Result Summary Modal */}
      <MinimalPairResultModal
        isOpen={showResultModal}
        score={earScore}
        totalCount={MINIMAL_PAIRS_DATA.length}
        history={drillHistory}
        onRestart={resetDrill}
      />
    </div>
  );
}
