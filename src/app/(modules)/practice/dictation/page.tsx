"use client";

import React from "react";
import Link from "next/link";
import { useDictationSession } from "@/hooks/useDictationSession";
import { DictationLevelSelector } from "@/components/practice/micro-drills/dictation/DictationLevelSelector";
import { DictationAudioPlayer } from "@/components/practice/micro-drills/dictation/DictationAudioPlayer";
import { PhoneticTrapBadge } from "@/components/practice/micro-drills/dictation/PhoneticTrapBadge";
import { AcousticAnatomyCard } from "@/components/practice/micro-drills/dictation/AcousticAnatomyCard";
import { RealtimeDiffInput } from "@/components/practice/micro-drills/dictation/RealtimeDiffInput";
import { DictationSummaryModal } from "@/components/practice/micro-drills/dictation/DictationSummaryModal";
import {
  Headphones,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Award,
  Layers,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntelligentDictationStudioPage() {
  const {
    selectedLevel,
    handleLevelChange,
    currentIndex,
    totalDrills,
    currentDrill,
    userInput,
    setUserInput,
    isSubmitted,
    diffResult,
    playbackSpeed,
    setPlaybackSpeed,
    isPlaying,
    playCount,
    playAudio,
    stopAudio,
    toggleAudio,
    submitDictation,
    nextDrill,
    prevDrill,
    resetCurrentDrill,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    sessionResults,
  } = useDictationSession();

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto select-none">
      {/* 1. Breadcrumbs & Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/practice"
            className="hover:text-foreground transition-colors"
          >
            Luyện Tập
          </Link>
          <span>/</span>
          <span className="text-foreground font-bold">
            Chép Chính Tả 3 Cấp Độ (Intelligent Dictation Studio)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/theory/listening-methods/listening-section1-self-correction"
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Học Kỹ Năng Nghe Trước</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsSummaryModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-border"
          >
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>Xem Báo Cáo Phiên</span>
          </button>
          <Link
            href="/practice"
            className="px-3 py-1.5 rounded-xl border border-border hover:bg-secondary text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Quay Lại</span>
          </Link>
        </div>
      </div>

      {/* Strategy Guidance Banner */}
      <div className="p-4 rounded-2xl bg-indigo-500/[0.08] border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Phương Pháp Nghe Cốt Lõi:
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-bold">
              30s Dự Đoán ➔ Bắt Âm Đuôi & Nối Âm
            </span>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Dành 30 giây chuẩn bị để dự đoán từ loại (Danh từ, Động từ, Số hay Tên). Khi chép chính tả, tập trung bắt chuẩn âm đuôi (-s/-es, -ed) và các bẫy đổi ý phút chót (Self-correction).
          </p>
        </div>

        <Link
          href="/theory/listening-methods/listening-section1-self-correction"
          className="px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-card hover:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold text-[11px] shrink-0 self-start sm:self-auto flex items-center gap-1"
        >
          <BookOpen className="h-3 w-3" />
          <span>Xem Bài Giảng Section 1 ➔</span>
        </Link>
      </div>

      {/* 2. Hero Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-card to-purple-500/5 border border-indigo-500/20 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full font-mono text-xs font-bold uppercase bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              Module 2A • Luyện Tập Vi Mô (Micro-Drills)
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground uppercase">
              Tốc Độ: 0.8x - 1.0x
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-muted-foreground">
            <span>Câu {currentIndex + 1} / {totalDrills}</span>
            <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden border border-border">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / totalDrills) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Bộ Công Cụ Chép Chính Tả Thông Minh 3 Cấp Độ
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Luyện độ nhạy thính giác nhận diện biến âm bản xứ: Nối âm (Linking), Nuốt âm (Elision), Dạng yếu (Weak forms), Bắt bẫy rơi đuôi số nhiều <strong>-s/-es</strong> và quá khứ <strong>-ed</strong>.
          </p>
        </div>
      </div>

      {/* 3. Level Selector */}
      <DictationLevelSelector
        selectedLevel={selectedLevel}
        onSelectLevel={handleLevelChange}
      />

      {/* 4. Current Drill Context & Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-secondary/30 border border-border text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs">
            Bài #{currentIndex + 1}
          </span>
          <span className="font-bold text-foreground">
            {currentDrill.title}
          </span>
          <span className="text-muted-foreground">
            • {currentDrill.topicDomain}
          </span>
        </div>

        <PhoneticTrapBadge phoneticNotes={currentDrill.phoneticNotes} />
      </div>

      {/* 5. Audio Player */}
      <DictationAudioPlayer
        isPlaying={isPlaying}
        onTogglePlay={toggleAudio}
        onReplay={playAudio}
        playbackSpeed={playbackSpeed}
        onSpeedChange={setPlaybackSpeed}
        playCount={playCount}
        recommendedLimit={currentDrill.recommendedPlayLimit}
        speakerAccent={currentDrill.speakerAccent}
      />

      {/* 6. Realtime Diff Input Area */}
      <RealtimeDiffInput
        drill={currentDrill}
        userInput={userInput}
        onChangeInput={setUserInput}
        isSubmitted={isSubmitted}
        diffResult={diffResult}
        onSubmit={submitDictation}
        onReset={resetCurrentDrill}
        onNext={nextDrill}
      />

      {/* 7. Acoustic Anatomy Card (Visible post-submission) */}
      {isSubmitted && (
        <AcousticAnatomyCard
          phoneticNotes={currentDrill.phoneticNotes}
          ieltsContextVi={currentDrill.ieltsContextVi}
          targetSentence={currentDrill.targetSentence}
        />
      )}

      {/* 8. Bottom Navigation Footer */}
      <div className="flex items-center justify-between border-t border-border/80 pt-6">
        <button
          type="button"
          onClick={prevDrill}
          disabled={currentIndex === 0}
          className={cn(
            "px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer",
            currentIndex === 0
              ? "border-border text-muted-foreground/40 cursor-not-allowed"
              : "border-border text-foreground hover:bg-secondary"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Câu Trước</span>
        </button>

        <span className="text-xs font-mono text-muted-foreground font-bold">
          {currentIndex + 1} / {totalDrills} câu
        </span>

        <button
          type="button"
          onClick={nextDrill}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <span>{currentIndex === totalDrills - 1 ? "Xem Tổng Kết" : "Câu Kế Tiếp"}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* 9. End of Session Summary Modal */}
      <DictationSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        onRestart={() => {
          setIsSummaryModalOpen(false);
          handleLevelChange(selectedLevel);
        }}
        sessionResults={sessionResults}
      />
    </div>
  );
}
