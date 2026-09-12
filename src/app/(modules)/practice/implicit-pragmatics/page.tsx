"use client";

import React from "react";
import { useImplicitPragmaticsSession } from "@/hooks/useImplicitPragmaticsSession";
import { SubtextDecoderWorkspace } from "@/components/practice/implicit-pragmatics/SubtextDecoderWorkspace";
import { LiteralVsPragmaticDiffViewer } from "@/components/practice/implicit-pragmatics/LiteralVsPragmaticDiffViewer";
import { AcademicIronyRadar } from "@/components/practice/implicit-pragmatics/AcademicIronyRadar";
import { PragmaticToneAudioPlayer } from "@/components/practice/implicit-pragmatics/PragmaticToneAudioPlayer";
import { SkepticismRapidFireDrill } from "@/components/practice/implicit-pragmatics/SkepticismRapidFireDrill";
import { PragmaticsSummaryModal } from "@/components/practice/implicit-pragmatics/PragmaticsSummaryModal";
import {
  Eye,
  Sparkles,
  Zap,
  ChevronRight,
  BookOpen,
  Volume2
} from "lucide-react";
import Link from "next/link";

export default function ImplicitPragmaticsPage() {
  const {
    currentExcerpt,
    allExcerpts,
    selectedExcerptId,
    handleSelectExcerpt,
    highlightedText,
    handleSelectFluoroscopeText,
    fluoroscopeAnalysis,
    userSelectedOption,
    isDrillSubmitted,
    handleSubmitDrillAnswer,
    totalAttempted,
    totalCorrect,
    totalLiteralTraps,
    isPlayingAudio,
    setIsPlayingAudio,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  } = useImplicitPragmaticsSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-slate-200 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/practice" className="hover:text-slate-200 transition-colors">
            Practice Arena
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-cyan-400 font-semibold">
            Step 80: Academic Pragmatics &amp; Subtext Decoder Studio
          </span>
        </div>

        {/* Excerpt Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Chọn Trích Đoạn:</span>
          <select
            value={selectedExcerptId}
            onChange={(e) => handleSelectExcerpt(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
          >
            {allExcerpts.map((e) => (
              <option key={e.id} value={e.id}>
                [{e.sourceType === "reading_passage3" ? "Reading" : "Listening"}] {e.title} ({e.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Reading Passage 3 &amp; Listening Section 3/4 &bull; Implicit Stance (Step 80/100)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Phòng Giải Mã Hàm Ý Ẩn, Mỉa Mai Học Thuật &amp; Ngữ Dụng Học
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Hóa giải <strong>bức tường vô hình giữa Band 7.0 và Band 8.5+</strong>.
            Sử dụng <strong>Đèn Soi Ngữ Dụng (Pragmatic Fluoroscope)</strong> để bóc tách 4 bẫy khảo thí kinh điển:
            Khen đãi bôi để hạ bệ (<em>Praise-Faint-Damning</em>), Phủ định kép (<em>Litotes</em>), Hoài nghi tu từ (<em>Scare Quotes</em>)
            và Ngữ điệu thoái thác trong Listening.
          </p>
        </div>
      </div>

      {/* Action Trigger for Summary Modal */}
      <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
        <div className="text-xs text-slate-400 px-3 flex items-center gap-2">
          <span>Tiến Độ Luyện Tập:</span>
          <strong className="text-cyan-400 font-mono">
            {totalCorrect}/{totalAttempted} câu chính xác
          </strong>
          {totalLiteralTraps > 0 && (
            <span className="text-amber-400 font-mono">
              ({totalLiteralTraps} câu mắc bẫy nghĩa đen)
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsSummaryModalOpen(true)}
          className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bảng Chẩn Đoán Ngữ Dụng Học</span>
        </button>
      </div>

      {/* Subtext Decoder Workspace */}
      <SubtextDecoderWorkspace
        excerpt={currentExcerpt}
        highlightedText={highlightedText}
        onSelectFluoroscopeText={handleSelectFluoroscopeText}
        fluoroscopeAnalysis={fluoroscopeAnalysis}
      />

      {/* Acoustic Pragmatics Player (if listening or tone note present) */}
      {currentExcerpt.speakerIntonationNote && (
        <PragmaticToneAudioPlayer
          speakerIntonationNote={currentExcerpt.speakerIntonationNote}
          isPlaying={isPlayingAudio}
          onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
        />
      )}

      {/* Split-Diff: Literal vs Pragmatic Subtext */}
      <LiteralVsPragmaticDiffViewer excerpt={currentExcerpt} />

      {/* Academic Irony Radar */}
      <AcademicIronyRadar analysis={fluoroscopeAnalysis} />

      {/* Rapid-Fire Skepticism Drill */}
      <SkepticismRapidFireDrill
        excerpt={currentExcerpt}
        userSelectedOption={userSelectedOption}
        isSubmitted={isDrillSubmitted}
        onSubmitAnswer={handleSubmitDrillAnswer}
      />

      {/* Diagnostic Summary Modal */}
      <PragmaticsSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        totalAttempted={totalAttempted}
        totalCorrect={totalCorrect}
        totalLiteralTraps={totalLiteralTraps}
        onSaveToDatabase={saveResultsToDatabase}
        isSaved={isSaved}
      />
    </div>
  );
}
