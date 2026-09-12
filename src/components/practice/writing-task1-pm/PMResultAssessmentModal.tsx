"use client";

import React, { useState } from "react";
import {
  BandScoreAssessment,
  PassiveAnalysisResult,
  OverviewValidationResult,
} from "@/lib/processMapValidator";
import {
  Task1PMExercise,
} from "@/data/mockProcessMapData";
import {
  Award,
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  BookmarkPlus,
  Check,
  Columns2,
  FileText,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PMResultAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: BandScoreAssessment | null;
  exercise: Task1PMExercise;
  userFullEssay: string;
  passiveAnalysis: PassiveAnalysisResult;
  overviewValidation: OverviewValidationResult;
  onSaveVocabToDb: (items: Array<{ word: string; meaningVi: string }>) => Promise<void>;
  className?: string;
}

export function PMResultAssessmentModal({
  isOpen,
  onClose,
  assessment,
  exercise,
  userFullEssay,
  passiveAnalysis,
  overviewValidation,
  onSaveVocabToDb,
  className,
}: PMResultAssessmentModalProps) {
  const [activeTab, setActiveTab] = useState<"scores" | "comparison" | "examiner">("scores");
  const [savedVocab, setSavedVocab] = useState<boolean>(false);

  if (!isOpen || !assessment) return null;

  const handleSaveVocab = async () => {
    const list: Array<{ word: string; meaningVi: string }> = [];

    if (exercise.spatialLexicon) {
      exercise.spatialLexicon.forEach((s) => {
        list.push({
          word: `${s.verb} (${s.noun})`,
          meaningVi: s.meaningVi,
        });
      });
    }

    if (exercise.processLexicon) {
      exercise.processLexicon.forEach((p) => {
        list.push({
          word: p.word,
          meaningVi: p.meaningVi,
        });
      });
    }

    if (list.length > 0) {
      await onSaveVocabToDb(list);
      setSavedVocab(true);
      setTimeout(() => setSavedVocab(false), 3000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 6.5) return "text-indigo-600 dark:text-indigo-400";
    if (score >= 5.5) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-600 text-white shadow-lg shadow-indigo-600/30">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-foreground">
                  Bảng Chấm Điểm & Đánh Giá Task 1 Band 7.5+
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  Đã Lưu Dexie DB
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{exercise.title}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Overall Score Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-emerald-500/10 to-teal-500/10 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              ĐIỂM ƯỚC TÍNH (ESTIMATED BAND SCORE):
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span
                className={cn(
                  "text-3xl sm:text-4xl font-black font-mono tracking-tight",
                  getScoreColor(assessment.overallBand)
                )}
              >
                Band {assessment.overallBand.toFixed(1)}
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                ({assessment.wordCount} từ • Thể bị động: {passiveAnalysis.passiveRatioPercentage}%)
              </span>
            </div>
          </div>

          {/* 4 Criteria Mini Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-xl bg-card border border-border/80">
              <span className="text-[10px] text-muted-foreground block font-bold">Task Achieve</span>
              <span className="text-sm font-extrabold font-mono text-foreground">
                {assessment.taskAchievement.toFixed(1)}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-card border border-border/80">
              <span className="text-[10px] text-muted-foreground block font-bold">Coherence</span>
              <span className="text-sm font-extrabold font-mono text-foreground">
                {assessment.coherenceCohesion.toFixed(1)}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-card border border-border/80">
              <span className="text-[10px] text-muted-foreground block font-bold">Lexical Res</span>
              <span className="text-sm font-extrabold font-mono text-foreground">
                {assessment.lexicalResource.toFixed(1)}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-card border border-border/80">
              <span className="text-[10px] text-muted-foreground block font-bold">Grammar Acc</span>
              <span className="text-sm font-extrabold font-mono text-foreground">
                {assessment.grammaticalRange.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-border/70 pb-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("scores")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              activeTab === "scores"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Phân Tích 4 Tiêu Chí</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("comparison")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              activeTab === "comparison"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Columns2 className="h-3.5 w-3.5" />
            <span>Đối Chiếu Bài Mẫu Band 8.5+</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("examiner")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              activeTab === "examiner"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Ghi Chú Giám Khảo Band 9.0</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          {activeTab === "scores" && (
            <div className="space-y-3.5">
              {/* Criteria Feedback Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-foreground font-mono">
                      1. Task Achievement (TA)
                    </span>
                    <span className="font-mono font-bold text-indigo-600">
                      {assessment.taskAchievement.toFixed(1)}/9.0
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {assessment.taFeedbackVi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-foreground font-mono">
                      2. Coherence & Cohesion (CC)
                    </span>
                    <span className="font-mono font-bold text-indigo-600">
                      {assessment.coherenceCohesion.toFixed(1)}/9.0
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {assessment.ccFeedbackVi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-foreground font-mono">
                      3. Lexical Resource (LR)
                    </span>
                    <span className="font-mono font-bold text-indigo-600">
                      {assessment.lexicalResource.toFixed(1)}/9.0
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {assessment.lrFeedbackVi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-foreground font-mono">
                      4. Grammatical Range & Accuracy (GRA)
                    </span>
                    <span className="font-mono font-bold text-indigo-600">
                      {assessment.grammaticalRange.toFixed(1)}/9.0
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {assessment.graFeedbackVi}
                  </p>
                </div>
              </div>

              {/* Actionable Improvement Tips */}
              {assessment.actionableTipsVi.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-2">
                  <h5 className="font-extrabold text-foreground flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Chiến Lược Tối Ưu Hóa Bài Viết:</span>
                  </h5>
                  <ul className="space-y-1 pl-1">
                    {assessment.actionableTipsVi.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground/90">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Essay */}
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2 flex flex-col">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="font-bold text-foreground">Bài viết của bạn</span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {assessment.wordCount} từ
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[360px] font-serif text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                  {userFullEssay || "(Chưa có nội dung bài viết)"}
                </div>
              </div>

              {/* Model Essay */}
              <div className="p-4 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/30 space-y-2 flex flex-col">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">
                    Bài mẫu Band 8.5+ Cambridge
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600">Band 9.0</span>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[360px] font-serif text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                  {exercise.modelFullEssay}
                </div>
              </div>
            </div>
          )}

          {activeTab === "examiner" && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-3">
                <h5 className="font-extrabold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Điểm Sáng Học Thuật Của Đề Bài Này:</span>
                </h5>
                <ul className="space-y-2.5">
                  {exercise.examinerNotesVi.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground/90 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border/80 shrink-0">
          <button
            type="button"
            onClick={handleSaveVocab}
            disabled={savedVocab}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
              savedVocab
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                : "bg-secondary text-foreground border-border hover:bg-secondary/80"
            )}
          >
            {savedVocab ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Đã lưu vào Sổ Từ Vựng (FSRS)</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="h-3.5 w-3.5 text-emerald-500" />
                <span>Lưu toàn bộ cụm từ vào Sổ Từ Vựng</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md cursor-pointer"
          >
            Hoàn Thành & Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
