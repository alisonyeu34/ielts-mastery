"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MOCK_READING_METHODS,
  ReadingMethodLesson,
} from "@/data/mockReadingMethodsData";
import { useMethodologySession } from "@/hooks/useMethodologySession";
import { ThreeStepMethodologyViewer } from "@/components/theory/methodology/ThreeStepMethodologyViewer";
import { ExaminerTrapSpotlight } from "@/components/theory/methodology/ExaminerTrapSpotlight";
import { ExcerptVocabularyCard } from "@/components/theory/ExcerptVocabularyCard";
import { MethodologyGatewayQuiz } from "@/components/theory/methodology/MethodologyGatewayQuiz";
import { StrategyUnlockModal } from "@/components/theory/methodology/StrategyUnlockModal";
import { useTheoryBookmarks, saveWordToVocabMatrix } from "@/lib/theoryBookmarks";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  Award,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Target,
  ArrowRightLeft,
  Bookmark,
  BookmarkCheck,
  BookmarkPlus,
  Check,
} from "lucide-react";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { TheoryBookmarkButton } from "@/components/theory/TheoryBookmarkButton";
import { TheoryItemRecallBox } from "@/components/theory/TheoryItemRecallBox";
import { TheoryMaskableContent } from "@/components/theory/TheoryMaskableContent";
import { StudentJargonClarifier } from "@/components/theory/StudentJargonClarifier";
import { cn } from "@/lib/utils";

export default function ReadingMethodDetailPage() {
  const params = useParams();
  const rawId = (params?.methodId as string) || (params?.id as string) || "reading-foundation-skimming-scanning";

  const lesson: ReadingMethodLesson =
    MOCK_READING_METHODS.find((l) => l.id === rawId) ||
    MOCK_READING_METHODS[0];

  const {
    currentStep,
    setCurrentStep,
    quizAnswers,
    selectOption,
    isSubmitted,
    evaluation,
    isAlreadyPassed,
    isUnlockModalOpen,
    setIsUnlockModalOpen,
    submitQuiz,
    retakeQuiz,
  } = useMethodologySession(lesson.id, lesson.title, "reading", lesson.gatewayQuiz);

  const { isSaved, toggleBookmark } = useTheoryBookmarks();
  const [savedPairs, setSavedPairs] = useState<Record<number, boolean>>({});

  const handleSaveParaphrasePair = async (pair: { questionKeyword: string; passageKeyword: string }, idx: number) => {
    await saveWordToVocabMatrix({
      word: pair.questionKeyword,
      meaningVi: `Cặp từ đồng nghĩa đối ứng: "${pair.questionKeyword}" ⇄ "${pair.passageKeyword}"`,
      context: lesson.step3ModelWalkthrough.passageSnippet,
      sourceModule: "reading_paraphrase",
    });
    setSavedPairs((prev) => ({ ...prev, [idx]: true }));
  };

  const isStep3Saved = isSaved(`bm_${lesson.id}_step3_model`);
  const isCognitiveFlowSaved = isSaved(`bm_${lesson.id}_cognitive_flow`);

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/theory/reading-methods"
            className="p-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground border border-border cursor-pointer transition-all"
            title="Quay lại danh mục chiến lược Reading"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase">
                {lesson.clusterNameVi} • {lesson.difficulty}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {lesson.estimatedMinutes} Phút đọc • Ngân sách {lesson.timeBudgetSeconds}s/câu
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-foreground mt-0.5">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Quick Link to Saved Notes */}
        <Link
          href="/theory/saved-notes"
          className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all"
        >
          <Bookmark className="h-3.5 w-3.5 fill-current" />
          <span>Sổ Cần Nhớ Đã Lưu</span>
        </Link>
      </div>

      {/* 1. Step Progress Navigator */}
      <ThreeStepMethodologyViewer
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
        isGatePassed={isAlreadyPassed}
      />

      {/* Student Jargon Clarifier */}
      <StudentJargonClarifier currentSkill="reading" />

      {/* 2. Step 1: Principles & Mindset */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border/80 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold shadow-sm">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                BƯỚC 1 / 3 • BẢN CHẤT HỌC THUẬT & QUY TẮC CỐT LÕI
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground mt-0.5">
                Quy Tắc Quản Trị & Tư Duy Nhận Diện Dạng Bài
              </h2>
            </div>
          </div>

          {/* Concept Summary */}
          <div className="p-5 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                Bản chất kiểm tra của Giám khảo Cambridge:
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <TheorySpeakerButton
                  text={lesson.step1Principles.conceptSummaryVi}
                  title="Nghe đọc bản chất khảo thí"
                  label="Đọc"
                  size="sm"
                />
                <TheoryBookmarkButton
                  item={{
                    id: `bm_${lesson.id}_concept_summary`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "reading",
                    category: "rule",
                    categoryLabelVi: "Bản Chất Khảo Thí",
                    title: `Bản chất khảo thí: ${lesson.title.split(":")[0]}`,
                    content: lesson.step1Principles.conceptSummaryVi,
                    lessonHref: `/theory/reading-methods/${lesson.id}`,
                  }}
                  label="Lưu quy tắc"
                  savedLabel="Đã lưu quy tắc ✓"
                  size="sm"
                />
              </div>
            </div>
            <TheoryMaskableContent
              itemId={`recall_reading_${lesson.id}_concept`}
              itemTitle="Bản chất kiểm tra của Giám khảo Cambridge"
            >
              <p className="text-foreground/90 font-medium text-xs sm:text-sm leading-relaxed">
                {lesson.step1Principles.conceptSummaryVi}
              </p>
            </TheoryMaskableContent>
            <TheoryItemRecallBox
              itemId={`recall_reading_${lesson.id}_concept`}
              itemTitle="Bản chất kiểm tra của Giám khảo Cambridge"
              targetText={lesson.step1Principles.conceptSummaryVi}
              lessonTitle={lesson.title}
            />
          </div>

          {/* Tactical Rules with individual bookmark buttons */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              <span>3 Quy Tắc Vàng Khi Xử Lý Dạng Bài (Mỗi phần có loa đọc & nút lưu riêng):</span>
            </h3>

            <div className="space-y-2.5">
              {lesson.step1Principles.tacticalRulesVi.map((rule, idx) => {
                const ruleBookmarkId = `bm_${lesson.id}_rule_${idx}`;
                const ruleSaved = isSaved(ruleBookmarkId);
                return (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 rounded-2xl bg-card border flex flex-col gap-2.5 text-xs leading-relaxed transition-all shadow-xs",
                      ruleSaved ? "border-amber-500/40 bg-amber-500/[0.03]" : "border-border"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <TheoryMaskableContent
                          itemId={`recall_reading_${lesson.id}_rule_${idx}`}
                          itemTitle={`Quy Tắc Vàng #${idx + 1}`}
                          className="flex-1 min-w-0"
                        >
                          <p className="text-foreground/90 font-medium leading-relaxed">{rule}</p>
                        </TheoryMaskableContent>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <TheorySpeakerButton
                          text={`Quy tắc ${idx + 1}: ${rule}`}
                          title={`Nghe đọc quy tắc ${idx + 1}`}
                          size="icon-only"
                        />

                        <TheoryBookmarkButton
                          item={{
                            id: ruleBookmarkId,
                            lessonId: lesson.id,
                            lessonTitle: lesson.title,
                            skill: "reading",
                            category: "rule",
                            categoryLabelVi: "Quy Tắc Vàng",
                            title: `Quy tắc ${idx + 1}: ${lesson.title.split(":")[0]}`,
                            content: rule,
                            lessonHref: `/theory/reading-methods/${lesson.id}`,
                          }}
                          label="Lưu quy tắc"
                          savedLabel="Đã lưu ✓"
                          size="sm"
                        />
                      </div>
                    </div>

                    <TheoryItemRecallBox
                      itemId={`recall_reading_${lesson.id}_rule_${idx}`}
                      itemTitle={`Quy Tắc Vàng #${idx + 1}`}
                      targetText={rule}
                      lessonTitle={lesson.title}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cognitive Flow with individual bookmark button */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20 space-y-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="font-extrabold text-blue-700 dark:text-blue-300 font-mono text-[10px] uppercase block">
                QUY TRÌNH TƯ DUY 3 BƯỚC XỬ LÝ NHANH TRONG PHÒNG THI (COGNITIVE FLOW):
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                <TheorySpeakerButton
                  text={`Quy trình tư duy 3 bước xử lý nhanh: ${lesson.step1Principles.cognitiveFlowVi.join(". ")}`}
                  title="Nghe đọc quy trình tư duy"
                  label="Đọc"
                  size="sm"
                />

                <button
                  type="button"
                  onClick={() =>
                    toggleBookmark({
                      id: `bm_${lesson.id}_cognitive_flow`,
                      lessonId: lesson.id,
                      lessonTitle: lesson.title,
                      skill: "reading",
                      category: "rule",
                      categoryLabelVi: "Quy Trình Tư Duy",
                      title: `Quy trình tư duy: ${lesson.title.split(":")[0]}`,
                      content: lesson.step1Principles.cognitiveFlowVi.join("\n"),
                      lessonHref: `/theory/reading-methods/${lesson.id}`,
                    })
                  }
                  className={cn(
                    "px-2.5 py-1 rounded-xl text-[10px] font-bold shrink-0 flex items-center gap-1 cursor-pointer transition-all border shadow-2xs",
                    isCognitiveFlowSaved
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                      : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
                  )}
                  title="Lưu toàn bộ quy trình tư duy vào Sổ Cần Nhớ"
                >
                  {isCognitiveFlowSaved ? (
                    <>
                      <BookmarkCheck className="h-3 w-3 fill-current" />
                      <span>Đã lưu quy trình ✓</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3 w-3 text-amber-500" />
                      <span>Lưu quy trình</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <TheoryMaskableContent
              itemId={`recall_reading_${lesson.id}_cognitive_flow`}
              itemTitle="Quy Trình Tư Duy 3 Bước"
            >
              <div className="space-y-1.5">
                {lesson.step1Principles.cognitiveFlowVi.map((stepText, sIdx) => (
                  <p key={sIdx} className="text-foreground/90 font-medium">
                    {stepText}
                  </p>
                ))}
              </div>
            </TheoryMaskableContent>

            <TheoryItemRecallBox
              itemId={`recall_reading_${lesson.id}_cognitive_flow`}
              itemTitle="Quy Trình Tư Duy 3 Bước"
              targetText={lesson.step1Principles.cognitiveFlowVi.join(". ")}
              lessonTitle={lesson.title}
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Tiếp Tục ➔ Bước 2: Vạch Trần Bẫy Khảo Thí</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Step 2: Examiner Trap Spotlight */}
      {currentStep === 2 && (
        <div className="space-y-5">
          {lesson.step2ExaminerTraps.map((trap, tIdx) => (
            <ExaminerTrapSpotlight
              key={tIdx}
              id={`bm_${lesson.id}_trap_${tIdx}`}
              trapName={trap.trapNameVi}
              trapMechanism={trap.trapMechanismVi}
              excerptText={trap.originalTextExcerpt}
              translationVi={trap.translationVi}
              wordBreakdown={trap.wordBreakdown}
              deceptiveStatementOrChoice={trap.deceptiveOptionOrAnswer}
              correctAnswerText={trap.correctAnswer}
              examinerInsight={trap.examinerInsightVi}
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              skill="reading"
            />
          ))}

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-xs shadow-md shadow-amber-600/25 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Tiếp Tục ➔ Bước 3: Mổ Xẻ Câu Hỏi Band 8.5+</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Step 3: Model Walkthrough */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 text-xs">
          {/* Header with Dedicated Save Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  BƯỚC 3 / 3 • MỔ XẺ CÂU HỎI MẪU CHUẨN BAND 8.5+ (MODEL AUDIT)
                </span>
                <h2 className="text-lg sm:text-xl font-black text-foreground mt-0.5">
                  Bóc Tách Từng Bước & Lập Bản Đồ Paraphrase
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                toggleBookmark({
                  id: `bm_${lesson.id}_step3_model`,
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                  skill: "reading",
                  category: "model",
                  categoryLabelVi: "Mổ Xẻ Đoạn Văn Mẫu",
                  title: `Mổ xẻ mẫu Band 8.5+: ${lesson.title.split(":")[0]}`,
                  content: `Câu hỏi: ${lesson.step3ModelWalkthrough.questionItem}\n\nQuy trình mổ xẻ:\n${lesson.step3ModelWalkthrough.stepByStepAuditVi.join("\n")}`,
                  excerptText: lesson.step3ModelWalkthrough.passageSnippet,
                  translationVi: lesson.step3ModelWalkthrough.translationVi,
                  wordBreakdown: lesson.step3ModelWalkthrough.wordBreakdown,
                  lessonHref: `/theory/reading-methods/${lesson.id}`,
                })
              }
              className={cn(
                "px-3.5 py-2 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all shadow-2xs",
                isStep3Saved
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                  : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
              )}
              title="Lưu toàn bộ bài mổ xẻ này vào Sổ Cần Nhớ"
            >
              {isStep3Saved ? (
                <>
                  <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
                  <span>★ Đã Lưu Vào Sổ Cần Nhớ</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                  <span>☆ Lưu Mổ Xẻ Câu Hỏi Này</span>
                </>
              )}
            </button>
          </div>

          {/* Bilingual Passage Snippet & Word Breakdown */}
          <ExcerptVocabularyCard
            label="ĐOẠN VĂN TRÍCH MẪU:"
            englishText={lesson.step3ModelWalkthrough.passageSnippet}
            translationVi={lesson.step3ModelWalkthrough.translationVi}
            wordBreakdown={lesson.step3ModelWalkthrough.wordBreakdown}
            sourceLessonTitle={lesson.title}
            sourceModule="reading"
          />

          {/* Question Item */}
          <div className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-1">
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase block">
              Câu hỏi trong đề thi:
            </span>
            <p className="font-bold text-foreground text-xs sm:text-sm leading-relaxed">
              {lesson.step3ModelWalkthrough.questionItem}
            </p>
          </div>

          {/* Step-by-Step Audit */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-foreground uppercase block">
              Quy trình bóc tách từng bước của chuyên gia:
            </span>
            <TheoryMaskableContent
              itemId={`recall_reading_${lesson.id}_step_by_step_audit`}
              itemTitle="Quy Trình Bóc Tách Từng Bước Chuyên Gia"
            >
              <div className="space-y-2">
                {lesson.step3ModelWalkthrough.stepByStepAuditVi.map((auditStep, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-3 rounded-xl bg-card border border-border text-foreground/90 font-medium flex items-start justify-between gap-2"
                  >
                    <span className="flex-1 leading-relaxed">{auditStep}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <TheorySpeakerButton text={auditStep} size="icon-only" />
                      <TheoryBookmarkButton
                        item={{
                          id: `bm_reading_${lesson.id}_audit_step_${aIdx}`,
                          lessonId: lesson.id,
                          lessonTitle: lesson.title,
                          skill: "reading",
                          category: "tip",
                          categoryLabelVi: "Bóc Tách Chuyên Gia",
                          title: `${lesson.title} • Bước ${aIdx + 1}`,
                          content: auditStep,
                          lessonHref: `/theory/reading-methods/${lesson.id}`,
                        }}
                        label="Lưu"
                        savedLabel="Đã lưu ✓"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TheoryMaskableContent>
            <TheoryItemRecallBox
              itemId={`recall_reading_${lesson.id}_step_by_step_audit`}
              itemTitle="Quy Trình Bóc Tách Từng Bước Chuyên Gia"
              targetText={lesson.step3ModelWalkthrough.stepByStepAuditVi.join(". ")}
              lessonTitle={lesson.title}
            />
          </div>

          {/* Paraphrase Pairs with 1-click vocab save */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1.5">
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Bản Đồ Cặp Từ Paraphrase Đối Ứng 1-1 (Bấm lưu từ vựng):</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {lesson.step3ModelWalkthrough.paraphrasePairs.map((pair, pIdx) => {
                const isPairSaved = !!savedPairs[pIdx];
                return (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground font-mono text-[11px]">
                        {pair.questionKeyword}
                      </span>
                      <span className="text-muted-foreground text-[10px]">⇄</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                        {pair.passageKeyword}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSaveParaphrasePair(pair, pIdx)}
                      disabled={isPairSaved}
                      className={cn(
                        "px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all",
                        isPairSaved
                          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 cursor-default"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      )}
                      title="Lưu cặp từ đồng nghĩa này vào Sổ Từ Vựng"
                    >
                      {isPairSaved ? <Check className="h-3 w-3" /> : <BookmarkPlus className="h-3 w-3" />}
                      <span>{isPairSaved ? "Đã lưu" : "Lưu cặp từ"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concluding Tip */}
          <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/30 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase block">
                💡 Đúc Kết Bí Kíp:
              </span>
              <p className="text-foreground/90 font-bold leading-relaxed">
                {lesson.step3ModelWalkthrough.concludingTipVi}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                toggleBookmark({
                  id: `bm_${lesson.id}_concluding_tip`,
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                  skill: "reading",
                  category: "tip",
                  categoryLabelVi: "Bí Kíp Đúc Kết",
                  title: `Bí kíp: ${lesson.title.split(":")[0]}`,
                  content: lesson.step3ModelWalkthrough.concludingTipVi,
                  lessonHref: `/theory/reading-methods/${lesson.id}`,
                })
              }
              className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] shrink-0 cursor-pointer shadow-2xs"
            >
              Lưu bí kíp
            </button>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <span>Làm Cổng Trắc Nghiệm Mở Khóa Thực Hành (≥80%)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Step 4: Gateway Mastery Quiz */}
      {currentStep === 4 && (
        <MethodologyGatewayQuiz
          questions={lesson.gatewayQuiz}
          userAnswers={quizAnswers}
          onSelectOption={selectOption}
          isSubmitted={isSubmitted}
          evaluation={evaluation}
          onSubmit={submitQuiz}
          onRetake={retakeQuiz}
          onOpenUnlockModal={() => setIsUnlockModalOpen(true)}
        />
      )}

      {/* Unlock Modal */}
      <StrategyUnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        title={lesson.title}
        scorePercentage={evaluation?.scorePercentage || 100}
        unlockedRoute={lesson.unlockedPracticeRoute}
      />
    </div>
  );
}
