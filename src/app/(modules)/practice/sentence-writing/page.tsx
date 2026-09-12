"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Copy,
  Trophy,
  Target,
  ShieldCheck,
  Flame,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
} from "lucide-react";
import {
  SENTENCE_WRITING_DRILLS,
  SentenceWritingDrillLesson,
  SentencePromptItem,
} from "@/data/mockSentenceWritingDrills";
import {
  evaluateSentenceSubmission,
  SentenceEvaluationResult,
} from "@/lib/sentenceWritingEvaluator";
import { SafeZoneGauge } from "@/components/practice/SafeZoneGauge";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { markPracticeCompleted } from "@/lib/taskCompletionScanner";

function SentenceWritingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Day resolution from query params
  const dayParam = searchParams.get("day");
  const initialDay = dayParam ? parseInt(dayParam, 10) : 1;
  const [selectedDay, setSelectedDay] = useState<number>(
    SENTENCE_WRITING_DRILLS[initialDay] ? initialDay : 1
  );

  const currentLesson: SentenceWritingDrillLesson =
    SENTENCE_WRITING_DRILLS[selectedDay] || SENTENCE_WRITING_DRILLS[1];

  // User submissions & evaluations state: Record<promptId, string>
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<
    Record<string, SentenceEvaluationResult>
  >({});
  const [revealedSamples, setRevealedSamples] = useState<Record<string, boolean>>(
    {}
  );
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [isSavingCompletion, setIsSavingCompletion] = useState<boolean>(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState<boolean>(false);

  // Load any saved draft for this day from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAnswers = localStorage.getItem(`sentence_drill_day_${selectedDay}`);
      if (savedAnswers) {
        try {
          setUserAnswers(JSON.parse(savedAnswers));
        } catch {
          // ignore parsing error
        }
      } else {
        setUserAnswers({});
      }
      setEvaluations({});
      setRevealedSamples({});
      setActivePromptIndex(0);
    }
  }, [selectedDay]);

  // Save drafts to localStorage on change
  const handleTextChange = (promptId: string, text: string) => {
    const updated = { ...userAnswers, [promptId]: text };
    setUserAnswers(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `sentence_drill_day_${selectedDay}`,
        JSON.stringify(updated)
      );
    }
  };

  // Evaluate a specific sentence
  const handleEvaluate = (prompt: SentencePromptItem) => {
    const text = userAnswers[prompt.id] || "";
    const result = evaluateSentenceSubmission(text, prompt);
    setEvaluations((prev) => ({ ...prev, [prompt.id]: result }));
  };

  // Copy sample to clipboard or fill into input
  const handleUseSample = (prompt: SentencePromptItem) => {
    handleTextChange(prompt.id, prompt.sampleSentenceEn);
    const result = evaluateSentenceSubmission(prompt.sampleSentenceEn, prompt);
    setEvaluations((prev) => ({ ...prev, [prompt.id]: result }));
  };

  const handleCopySample = (prompt: SentencePromptItem) => {
    navigator.clipboard.writeText(prompt.sampleSentenceEn);
    setCopiedStates((prev) => ({ ...prev, [prompt.id]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [prompt.id]: false }));
    }, 2000);
  };

  // Stats
  const completedCount = Object.values(evaluations).filter(
    (ev) => ev.isValid
  ).length;
  const totalPrompts = currentLesson.prompts.length;
  const progressPercent = Math.round((completedCount / totalPrompts) * 100);
  const isTargetMet = completedCount >= Math.min(totalPrompts, 10);

  // Save entire lesson completion to DB and update roadmap progress
  const handleCompleteCa3 = async () => {
    setIsSavingCompletion(true);
    try {
      // 1. Log to practice_logs
      await db.practice_logs.add({
        id: `prac_sentence_${Date.now()}`,
        type: "sentence_writing",
        title: currentLesson.title,
        score: Math.min(100, progressPercent),
        durationSeconds: 45 * 60,
        phase: 1,
        details: {
          dayNumber: selectedDay,
          completedSentences: completedCount,
          totalPrompts,
          evaluationsSummary: Object.entries(evaluations).map(([id, ev]) => ({
            id,
            scoreBand: ev.scoreBand,
            isValid: ev.isValid,
          })),
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      });

      // 2. Mark Ca 3 (task slot 2: vocabReviewed/drill) as completed in user_progress
      const user = await db.user_progress.get("main_user");
      if (user) {
        const currentDaily = user.dailyChecklistStatus || {};
        const dayChecklist = currentDaily[selectedDay] || {
          theoryCompleted: false,
          drillCompleted: false,
          vocabReviewed: false,
          errorBankCleared: false,
        };

        // Ca 3 corresponds to the 3rd task slot in the daily roadmap drawer
        dayChecklist.vocabReviewed = true;
        currentDaily[selectedDay] = dayChecklist;

        await db.user_progress.update("main_user", {
          dailyChecklistStatus: currentDaily,
          updatedAt: new Date().toISOString(),
        });
      }

      // Mark practice completed for auto-scanner
      markPracticeCompleted("sentence-writing");
      markPracticeCompleted(`/practice/sentence-writing?day=${selectedDay}`);

      setIsCompletedModalOpen(true);
    } catch (e) {
      console.error("Failed to save Ca 3 completion:", e);
      setIsCompletedModalOpen(true);
    } finally {
      setIsSavingCompletion(false);
    }
  };

  return (
    <div className="space-y-8 pb-24 max-w-5xl mx-auto select-none">
      {/* Navigation Breadcrumb & Back */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-red-700 dark:hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại Lộ Trình 180 Ngày</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
            🎯 Giai Đoạn 1: Cứu Ngữ Pháp Nền Tảng (12/9 - 12/10)
          </span>
          <span className="text-[11px] font-mono font-bold px-2 py-1 rounded-lg bg-secondary text-foreground">
            Ngày {selectedDay}/180
          </span>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/20 via-card to-rose-950/20 p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider">
            <PenTool className="h-4 w-4" />
            <span>Phòng Thực Hành Viết Câu Trọng Tâm (Sentence Writing Lab)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            {currentLesson.title}
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
            {currentLesson.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-semibold">
              <Target className="h-3.5 w-3.5" />
              Mục tiêu: Đạt chuẩn an toàn Writing Band 6.0 – 6.5
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              Tự động kiểm tra ngữ pháp & gợi ý nâng cấp câu thời gian thực
            </span>
          </div>
        </div>
      </div>

      {/* Day / Topic Switcher Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
          <span>Chọn Bài Thực Hành Viết Câu (Phase 1):</span>
          <span className="text-[11px] text-red-600 dark:text-red-400 font-semibold">
            Chủ điểm đúng theo Lịch 180 Ngày
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.values(SENTENCE_WRITING_DRILLS).map((drill) => {
            const isSelected = selectedDay === drill.dayNumber;
            return (
              <button
                key={drill.dayNumber}
                type="button"
                onClick={() => {
                  setSelectedDay(drill.dayNumber);
                  router.push(`/practice/sentence-writing?day=${drill.dayNumber}`, {
                    scroll: false,
                  });
                }}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1",
                  isSelected
                    ? "bg-red-700 text-white border-red-700 shadow-md shadow-red-700/20 ring-2 ring-red-500/30"
                    : "bg-card border-border hover:border-border/80 hover:bg-secondary/40 text-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase px-1.5 py-0.5 rounded",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    Ngày {drill.dayNumber}
                  </span>
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                </div>

                <span
                  className={cn(
                    "text-xs font-bold line-clamp-2 mt-1",
                    isSelected ? "text-white" : "text-foreground"
                  )}
                >
                  {drill.dayNumber === 1 && "HTĐ & QKĐ (20 câu)"}
                  {drill.dayNumber === 2 && "Hiện Tại Hoàn Thành"}
                  {drill.dayNumber === 3 && "Câu Bị Động 3 Thì"}
                  {drill.dayNumber === 4 && "So Sánh Biểu Đồ"}
                  {drill.dayNumber === 5 && "Mệnh Đề Quan Hệ"}
                  {drill.dayNumber === 6 && "Câu Điều Kiện 1 & 2"}
                </span>

                <span
                  className={cn(
                    "text-[10px] truncate",
                    isSelected ? "text-white/80" : "text-muted-foreground"
                  )}
                >
                  {drill.prompts.length} câu thực hành
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress & Safe-Zone Live Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Card */}
        <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-foreground block">
                  Tiến Độ Hoàn Thành Ca 3
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Đã đạt chuẩn: <strong>{completedCount}</strong> / {totalPrompts} câu
                </span>
              </div>
            </div>

            <span className="font-mono text-base font-black text-red-600 dark:text-red-400">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                completedCount >= totalPrompts
                  ? "bg-emerald-600"
                  : completedCount >= 10
                  ? "bg-gradient-to-r from-red-600 to-rose-600"
                  : "bg-red-600"
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
            <span>
              {completedCount === 0
                ? "Bắt đầu viết câu đầu tiên bên dưới và bấm 'Kiểm Tra Câu'."
                : completedCount < totalPrompts
                ? `Còn ${totalPrompts - completedCount} câu nữa để hoàn thành 100% ca học.`
                : "🎉 Tuyệt vời! Bạn đã hoàn thành toàn bộ câu hỏi của Ca 3!"}
            </span>
            <span className="font-semibold text-foreground">
              Mức an toàn: ≥ {Math.min(totalPrompts, 10)} câu
            </span>
          </div>
        </div>

        {/* Safe-Zone Badge Card */}
        <div className="p-5 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/[0.06] via-card to-secondary/30 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Vùng An Toàn Writing 6.5</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mục tiêu Writing: <strong>Band 6.5</strong>. Tiêu chuẩn GRA yêu cầu:
              Hơn 50% câu không có lỗi ngữ pháp (error-free) và dùng đa dạng câu phức.
            </p>
          </div>

          <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Trạng thái hiện tại:</span>
            <span
              className={cn(
                "font-bold px-2 py-0.5 rounded-lg text-[11px]",
                isTargetMet
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
              )}
            >
              {isTargetMet ? "🟢 Chạm Vùng An Toàn" : "🟡 Đang Tích Lũy"}
            </span>
          </div>
        </div>
      </div>

      {/* Instructions Accordion / Checklist */}
      <div className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-2 text-xs">
        <span className="font-bold text-foreground block">
          📋 Hướng Dẫn Thực Hành Ca 3:
        </span>
        <ul className="space-y-1 text-muted-foreground list-disc list-inside">
          {currentLesson.instructionsVi.map((ins, i) => (
            <li key={i} className="leading-relaxed">
              {ins}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Jump Pills for Prompts */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Danh Sách Câu Hỏi ({totalPrompts} câu):</span>
          <span className="text-[10px] text-muted-foreground">
            Bấm số câu để cuộn nhanh đến câu đó
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {currentLesson.prompts.map((p, idx) => {
            const ev = evaluations[p.id];
            const hasText = Boolean(userAnswers[p.id]?.trim());

            return (
              <a
                key={p.id}
                href={`#prompt_${p.id}`}
                className={cn(
                  "h-8 min-w-8 px-2 rounded-xl text-xs font-bold flex items-center justify-center border transition-all cursor-pointer",
                  ev?.isValid
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                    : ev && !ev.isValid
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30"
                    : hasText
                    ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                    : "bg-card border-border text-muted-foreground hover:bg-secondary"
                )}
                title={`Câu ${p.orderNumber}: ${p.promptVi}`}
              >
                {p.orderNumber}
              </a>
            );
          })}
        </div>
      </div>

      {/* List of Interactive Sentence Cards */}
      <div className="space-y-6">
        {currentLesson.prompts.map((prompt) => {
          const answer = userAnswers[prompt.id] || "";
          const evaluation = evaluations[prompt.id];
          const isSampleRevealed = Boolean(revealedSamples[prompt.id]);
          const isCopied = Boolean(copiedStates[prompt.id]);

          return (
            <div
              key={prompt.id}
              id={`prompt_${prompt.id}`}
              className={cn(
                "rounded-3xl border bg-card p-5 sm:p-7 space-y-4 shadow-sm transition-all scroll-mt-20",
                evaluation?.isValid
                  ? "border-emerald-500/40 bg-gradient-to-b from-emerald-500/[0.02] to-card"
                  : evaluation && !evaluation.isValid
                  ? "border-amber-500/40 bg-gradient-to-b from-amber-500/[0.02] to-card"
                  : "border-border hover:border-border/90"
              )}
            >
              {/* Optional Section Header */}
              {prompt.sectionTitle && (
                <div className="pb-3 border-b border-border/80 flex items-center gap-2 text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-wider">
                  <Flame className="h-4 w-4" />
                  <span>{prompt.sectionTitle}</span>
                </div>
              )}

              {/* Card Header: Question Number, Prompt Text & Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-lg bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
                      Câu {prompt.orderNumber} / {totalPrompts}
                    </span>

                    {evaluation?.isValid ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Đạt Chuẩn Band {evaluation.scoreBand}
                      </span>
                    ) : evaluation && !evaluation.isValid ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Cần Tinh Chỉnh (Band {evaluation.scoreBand})
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug pt-1">
                    {prompt.promptVi}
                  </h3>

                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 pt-0.5">
                    <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>{prompt.grammarHintVi}</span>
                  </p>
                </div>

                {/* Quick Model Sample Toggle Button */}
                <button
                  type="button"
                  onClick={() =>
                    setRevealedSamples((prev) => ({
                      ...prev,
                      [prompt.id]: !prev[prompt.id],
                    }))
                  }
                  className="px-3 py-1.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <BookOpen className="h-3.5 w-3.5 text-red-600" />
                  <span>{isSampleRevealed ? "Ẩn câu mẫu" : "Xem câu mẫu 6.5+"}</span>
                  {isSampleRevealed ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </div>

              {/* Revealable Sample Model Box */}
              {isSampleRevealed && (
                <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/[0.04] space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      Câu Mẫu Chuẩn Band {prompt.sampleBand}:
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUseSample(prompt)}
                        className="px-2.5 py-1 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-[11px] transition-colors cursor-pointer"
                        title="Điền câu này vào ô viết để học cấu trúc"
                      >
                        Dùng câu mẫu này
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopySample(prompt)}
                        className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title="Sao chép câu tiếng Anh"
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="font-serif text-sm font-semibold text-foreground italic leading-relaxed">
                    &ldquo;{prompt.sampleSentenceEn}&rdquo;
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <strong>Nghĩa:</strong> {prompt.sampleSentenceVi}
                  </div>

                  {prompt.upgradeTipVi && (
                    <div className="text-[11px] text-red-600 dark:text-red-400 bg-red-500/10 p-2 rounded-xl border border-red-500/20">
                      💡 <strong>Mẹo nâng band:</strong> {prompt.upgradeTipVi}
                    </div>
                  )}
                </div>
              )}

              {/* User Textarea Input */}
              <div className="space-y-1.5">
                <textarea
                  value={answer}
                  onChange={(e) => handleTextChange(prompt.id, e.target.value)}
                  placeholder={`Nhập câu tiếng Anh của bạn tại đây... (Ví dụ: viết câu đầy đủ S + V theo cấu trúc hướng dẫn)`}
                  rows={2}
                  className="w-full rounded-2xl border border-border bg-secondary/20 p-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-red-600/40 focus:border-red-600 transition-all font-sans leading-relaxed"
                />

                <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
                  <span>
                    Số từ: <strong>{answer.trim().split(/\s+/).filter(Boolean).length}</strong> từ
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEvaluate(prompt)}
                      disabled={!answer.trim()}
                      className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Kiểm Tra Câu & Bắt Lỗi</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Evaluation Result Card */}
              {evaluation && (
                <div
                  className={cn(
                    "p-4 rounded-2xl border space-y-2.5 animate-in fade-in duration-200 text-xs",
                    evaluation.isValid
                      ? "bg-emerald-500/[0.06] border-emerald-500/30 text-foreground"
                      : "bg-amber-500/[0.06] border-amber-500/30 text-foreground"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold flex items-center gap-1.5">
                      {evaluation.isValid ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      )}
                      <span>{evaluation.statusTitleVi}</span>
                    </span>

                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-card border border-border text-[11px]">
                      Band ước lượng: {evaluation.scoreBand}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {evaluation.feedbackVi}
                  </p>

                  {/* Strengths */}
                  {evaluation.identifiedStrengths.length > 0 && (
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        ✓ Điểm sáng ngữ pháp:
                      </span>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {evaluation.identifiedStrengths.map((st, sIdx) => (
                          <li key={sIdx}>{st}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {evaluation.suggestionsVi.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-border/40">
                      <span className="font-bold text-amber-700 dark:text-amber-400">
                        ⚡ Gợi ý hoàn thiện câu:
                      </span>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {evaluation.suggestionsVi.map((sg, gIdx) => (
                          <li key={gIdx}>{sg}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action / Completion Bar */}
      <div className="sticky bottom-4 z-40 p-4 rounded-3xl border border-red-500/30 bg-card/95 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-foreground">
              Tiến Độ Ca 3: {completedCount} / {totalPrompts} câu đạt chuẩn
            </span>
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                isTargetMet
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
              )}
            >
              {isTargetMet ? "Đạt Tiêu Chuẩn Ca Học" : "Cần Thêm Câu Đạt Chuẩn"}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground block">
            Hoàn thành tối thiểu 10 câu (khuyến khích 20/20) để tự động tick hoàn thành Ca 3 trên Lộ Trình.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCompleteCa3}
            disabled={isSavingCompletion}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-rose-700 hover:from-red-800 hover:to-rose-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-700/30 transition-all cursor-pointer"
          >
            <Trophy className="h-4 w-4" />
            <span>
              {isSavingCompletion
                ? "Đang lưu kết quả..."
                : "Hoàn Thành Ca 3 & Cập Nhật Lộ Trình"}
            </span>
          </button>
        </div>
      </div>

      {/* Celebration Completion Modal */}
      {isCompletedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-red-500/30 bg-card p-6 sm:p-8 shadow-2xl space-y-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-800 via-red-600 to-rose-600 text-white shadow-lg shadow-red-700/30">
              <Trophy className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-foreground">
                🎉 Hoàn Thành Xuất Sắc Ca 3!
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Bạn đã hoàn thành <strong>{completedCount} câu</strong> đúng cấu trúc
                ngữ pháp trọng tâm của Ngày {selectedDay}. Tiến độ đã được ghi nhận
                vào cơ sở dữ liệu và đánh dấu hoàn thành trên Lộ Trình 180 Ngày.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border text-xs space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kỹ năng rèn luyện:</span>
                <span className="font-bold text-foreground">
                  {currentLesson.targetSkill}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mức điểm an toàn:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  Band 6.0 – 6.5 (GRA An Toàn)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <Link
                href="/roadmap"
                className="px-4 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center justify-center transition-colors"
              >
                Về Lộ Trình 180 Ngày
              </Link>

              <Link
                href="/practice/shadowing"
                className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Sang Ca 4 (Shadowing)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SentenceWritingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center text-xs text-muted-foreground">
          Đang tải Phòng Thực Hành Viết Câu Trọng Tâm...
        </div>
      }
    >
      <SentenceWritingContent />
    </Suspense>
  );
}
