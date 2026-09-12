"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MOCK_WRITING_BLUEPRINTS,
  WritingBlueprintLesson,
} from "@/data/mockWritingBlueprintsData";
import { useProductiveTheorySession } from "@/hooks/useProductiveTheorySession";
import { ThreeStepBlueprintViewer } from "@/components/theory/blueprints/ThreeStepBlueprintViewer";
import { ModelEssayAnnotator } from "@/components/theory/blueprints/ModelEssayAnnotator";
import { ProductiveGatewayQuiz } from "@/components/theory/blueprints/ProductiveGatewayQuiz";
import { BlueprintUnlockModal } from "@/components/theory/blueprints/BlueprintUnlockModal";
import { BandDescriptorsQuickMatrix } from "@/components/theory/blueprints/BandDescriptorsQuickMatrix";
import { PronounceWordButton } from "@/components/theory/PronounceWordButton";
import { Band75RecommendationBadge } from "@/components/theory/Band75RecommendationBadge";
import {
  useTheoryBookmarks,
  saveWordToVocabMatrix,
  isRecommendedBand75Word,
  getRecommendationBadgeInfo,
} from "@/lib/theoryBookmarks";
import { VocabBreakdownWord } from "@/types/theoryBookmarks";
import {
  ChevronLeft,
  PenTool,
  Clock,
  Sparkles,
  Star,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
  Table,
  Layers,
  Award,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Languages,
  Plus,
  Check,
  Lightbulb,
} from "lucide-react";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { TheoryBookmarkButton } from "@/components/theory/TheoryBookmarkButton";
import { TheoryItemRecallBox } from "@/components/theory/TheoryItemRecallBox";
import { TheoryMaskableContent } from "@/components/theory/TheoryMaskableContent";
import { StudentJargonClarifier } from "@/components/theory/StudentJargonClarifier";
import { cn } from "@/lib/utils";

export default function WritingBlueprintDetailPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params?.topicId as string;

  const [showMatrixModal, setShowMatrixModal] = useState<boolean>(false);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const { isSaved, toggleBookmark } = useTheoryBookmarks();

  const lesson = MOCK_WRITING_BLUEPRINTS.find((l) => l.id === topicId);

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
  } = useProductiveTheorySession(
    lesson?.id || "",
    lesson?.title || "",
    "writing",
    lesson?.gatewayQuiz || []
  );

  const handleSaveWord = async (item: VocabBreakdownWord, contextSentence?: string) => {
    if (savedWords[item.word]) return;
    const ok = await saveWordToVocabMatrix({
      word: item.word,
      ipa: item.ipa,
      type: item.type,
      meaningVi: item.meaningVi,
      context: contextSentence || "",
      sourceModule: "writing",
    });
    if (ok) {
      setSavedWords((prev) => ({ ...prev, [item.word]: true }));
    }
  };

  const handleSaveAllWords = async (words: VocabBreakdownWord[], contextSentence?: string) => {
    for (const item of words) {
      await saveWordToVocabMatrix({
        word: item.word,
        ipa: item.ipa,
        type: item.type,
        meaningVi: item.meaningVi,
        context: contextSentence || "",
        sourceModule: "writing",
      });
    }
    const updated = { ...savedWords };
    words.forEach((w) => {
      updated[w.word] = true;
    });
    setSavedWords(updated);
  };

  if (!lesson) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Không tìm thấy chuyên đề bài giảng</h2>
        <p className="text-muted-foreground text-sm">
          Chuyên đề bạn đang tìm kiếm không tồn tại hoặc đã được chuyển dời.
        </p>
        <Link
          href="/theory/writing-blueprints"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm shadow-md shadow-amber-500/20 hover:bg-amber-600 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Về Danh Mục Writing Blueprints
        </Link>
      </div>
    );
  }

  const isTask1 = lesson.taskType === "task1";

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto select-none">
      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/theory"
            className="hover:text-foreground transition-colors"
          >
            Lý Thuyết
          </Link>
          <span>/</span>
          <Link
            href="/theory/writing-blueprints"
            className="hover:text-foreground transition-colors font-medium"
          >
            Writing Blueprints
          </Link>
          <span>/</span>
          <span className="text-foreground font-bold truncate max-w-[240px] sm:max-w-md">
            {lesson.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMatrixModal(true)}
            className="px-3 py-1.5 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Table className="h-3.5 w-3.5 text-amber-500" />
            <span>Band Descriptors</span>
          </button>
          <Link
            href="/theory/writing-blueprints"
            className="px-3 py-1.5 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Quay Lại</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Title & Badges */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-card to-orange-500/5 border border-amber-500/20 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "px-3 py-1 rounded-full font-mono text-xs font-bold uppercase",
              isTask1
                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
            )}
          >
            {lesson.taskTypeNameVi}
          </span>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground uppercase">
            Mục Tiêu: {lesson.bandTarget}
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            ~{lesson.estimatedMinutes} phút học
          </span>
          {isAlreadyPassed && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Đã Vượt Cổng Khảo Thí
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {lesson.subtitle}
          </p>
        </div>
      </div>

      {/* 3. 3-Step Navigation Tabs */}
      <ThreeStepBlueprintViewer
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
        isPassed={isAlreadyPassed}
        skill="writing"
      />

      {/* Student Jargon Clarifier */}
      <StudentJargonClarifier currentSkill="writing" />

      {/* 4. Step 1: Bản Chất Tiêu Chí & Cấu Trúc Khảo Thí */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Core Philosophy Box */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    Tư Duy & Triết Lý Chấm Điểm Cambridge
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Nguyên tắc sống còn để tránh bị trừ điểm đáng tiếc
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <TheorySpeakerButton
                  text={`Tư duy và triết lý chấm điểm Cambridge: ${lesson.step1Principles.corePhilosophyVi}`}
                  title="Nghe đọc triết lý chấm điểm"
                  label="Đọc"
                  size="sm"
                />
                <TheoryBookmarkButton
                  item={{
                    id: `bm_writing_${lesson.id}_philosophy`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "writing",
                    category: "rule",
                    categoryLabelVi: "Triết Lý Chấm Điểm",
                    title: `${lesson.title} • Triết Lý Chấm Điểm`,
                    content: lesson.step1Principles.corePhilosophyVi,
                    lessonHref: `/theory/writing-blueprints/${lesson.id}`,
                  }}
                  label="Lưu quy tắc"
                  savedLabel="Đã lưu quy tắc ✓"
                  size="sm"
                />
              </div>
            </div>
            <TheoryMaskableContent
              itemId={`recall_writing_${lesson.id}_philosophy`}
              itemTitle="Tư Duy & Triết Lý Chấm Điểm Cambridge"
            >
              <p className="text-sm text-foreground/90 leading-relaxed bg-amber-500/5 p-4 rounded-2xl border border-amber-500/15">
                {lesson.step1Principles.corePhilosophyVi}
              </p>
            </TheoryMaskableContent>
            <TheoryItemRecallBox
              itemId={`recall_writing_${lesson.id}_philosophy`}
              itemTitle="Tư Duy & Triết Lý Chấm Điểm Cambridge"
              targetText={lesson.step1Principles.corePhilosophyVi}
              lessonTitle={lesson.title}
            />
          </div>

          {/* 4 Criteria Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-extrabold text-foreground uppercase tracking-wider">
                <Layers className="h-4 w-4 text-amber-500" />
                4 Tiêu Chí Chấm Điểm Chính Thức (Band Descriptors Breakdown)
              </div>
              <TheoryBookmarkButton
                item={{
                  id: `bm_writing_${lesson.id}_criteria_all`,
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                  skill: "writing",
                  category: "rule",
                  categoryLabelVi: "Tiêu Chí Chấm Điểm",
                  title: `${lesson.title} • 4 Tiêu Chí Chấm Điểm`,
                  content: `${isTask1 ? "TA" : "TR"}: ${lesson.step1Principles.fourCriteriaBreakdownVi.taOrTr}\nCC: ${lesson.step1Principles.fourCriteriaBreakdownVi.cc}\nLR: ${lesson.step1Principles.fourCriteriaBreakdownVi.lr}\nGRA: ${lesson.step1Principles.fourCriteriaBreakdownVi.gra}`,
                  lessonHref: `/theory/writing-blueprints/${lesson.id}`,
                }}
                label="Lưu 4 tiêu chí"
                savedLabel="Đã lưu 4 tiêu chí ✓"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-blue-500/20 pb-1.5">
                  <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                    {isTask1 ? "Task Achievement (TA)" : "Task Response (TR)"}
                  </span>
                  <div className="flex items-center gap-1">
                    <TheorySpeakerButton
                      text={`${isTask1 ? "Task Achievement" : "Task Response"}: ${lesson.step1Principles.fourCriteriaBreakdownVi.taOrTr}`}
                      size="icon-only"
                    />
                    <TheoryBookmarkButton
                      item={{
                        id: `bm_writing_${lesson.id}_criteria_ta_tr`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "writing",
                        category: "rule",
                        categoryLabelVi: "Tiêu Chí Chấm Điểm",
                        title: `${lesson.title} • ${isTask1 ? "Task Achievement (TA)" : "Task Response (TR)"}`,
                        content: lesson.step1Principles.fourCriteriaBreakdownVi.taOrTr,
                        lessonHref: `/theory/writing-blueprints/${lesson.id}`,
                      }}
                      size="icon-only"
                    />
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {lesson.step1Principles.fourCriteriaBreakdownVi.taOrTr}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-indigo-500/20 pb-1.5">
                  <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    Coherence & Cohesion (CC)
                  </span>
                  <div className="flex items-center gap-1">
                    <TheorySpeakerButton
                      text={`Coherence and Cohesion: ${lesson.step1Principles.fourCriteriaBreakdownVi.cc}`}
                      size="icon-only"
                    />
                    <TheoryBookmarkButton
                      item={{
                        id: `bm_writing_${lesson.id}_criteria_cc`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "writing",
                        category: "rule",
                        categoryLabelVi: "Tiêu Chí Chấm Điểm",
                        title: `${lesson.title} • Coherence & Cohesion (CC)`,
                        content: lesson.step1Principles.fourCriteriaBreakdownVi.cc,
                        lessonHref: `/theory/writing-blueprints/${lesson.id}`,
                      }}
                      size="icon-only"
                    />
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {lesson.step1Principles.fourCriteriaBreakdownVi.cc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-emerald-500/20 pb-1.5">
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    Lexical Resource (LR)
                  </span>
                  <div className="flex items-center gap-1">
                    <TheorySpeakerButton
                      text={`Lexical Resource: ${lesson.step1Principles.fourCriteriaBreakdownVi.lr}`}
                      size="icon-only"
                    />
                    <TheoryBookmarkButton
                      item={{
                        id: `bm_writing_${lesson.id}_criteria_lr`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "writing",
                        category: "rule",
                        categoryLabelVi: "Tiêu Chí Chấm Điểm",
                        title: `${lesson.title} • Lexical Resource (LR)`,
                        content: lesson.step1Principles.fourCriteriaBreakdownVi.lr,
                        lessonHref: `/theory/writing-blueprints/${lesson.id}`,
                      }}
                      size="icon-only"
                    />
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {lesson.step1Principles.fourCriteriaBreakdownVi.lr}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-purple-500/20 pb-1.5">
                  <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                    Grammatical Range & Accuracy (GRA)
                  </span>
                  <div className="flex items-center gap-1">
                    <TheorySpeakerButton
                      text={`Grammatical Range and Accuracy: ${lesson.step1Principles.fourCriteriaBreakdownVi.gra}`}
                      size="icon-only"
                    />
                    <TheoryBookmarkButton
                      item={{
                        id: `bm_writing_${lesson.id}_criteria_gra`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "writing",
                        category: "rule",
                        categoryLabelVi: "Tiêu Chí Chấm Điểm",
                        title: `${lesson.title} • Grammatical Range & Accuracy (GRA)`,
                        content: lesson.step1Principles.fourCriteriaBreakdownVi.gra,
                        lessonHref: `/theory/writing-blueprints/${lesson.id}`,
                      }}
                      size="icon-only"
                    />
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {lesson.step1Principles.fourCriteriaBreakdownVi.gra}
                </p>
              </div>
            </div>
          </div>

          {/* Structural Blueprint */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    Phác Đồ Cấu Trúc Khung Chuẩn (Structural Formula)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Quy chuẩn từng đoạn văn và thứ tự triển khai ý
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <TheorySpeakerButton
                  text={`Phác đồ cấu trúc khung chuẩn: ${lesson.step1Principles.structuralBlueprintVi.join(". ")}`}
                  title="Nghe đọc phác đồ cấu trúc"
                  label="Đọc phác đồ"
                  size="sm"
                />

                <TheoryBookmarkButton
                  item={{
                    id: `bm_writing_${lesson.id}_structure`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "writing",
                    category: "rule",
                    categoryLabelVi: "Cấu Trúc Writing",
                    title: `Phác Đồ Cấu Trúc: ${lesson.title}`,
                    content: lesson.step1Principles.structuralBlueprintVi.join("\n"),
                    lessonHref: `/theory/writing-blueprints/${lesson.id}`,
                  }}
                  label="Lưu phác đồ"
                  savedLabel="Đã lưu phác đồ ✓"
                  size="sm"
                />
              </div>
            </div>

            <TheoryMaskableContent
              itemId={`recall_writing_${lesson.id}_structure`}
              itemTitle="Phác Đồ Cấu Trúc Khung Chuẩn"
            >
              <div className="space-y-3">
                {lesson.step1Principles.structuralBlueprintVi.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-secondary/40 border border-border/60 text-xs text-foreground/90"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white font-mono font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="mt-0.5 leading-relaxed font-medium">{step}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <TheorySpeakerButton
                        text={`Bước ${idx + 1}: ${step}`}
                        size="icon-only"
                      />
                      <TheoryBookmarkButton
                        item={{
                          id: `bm_writing_${lesson.id}_struct_step_${idx}`,
                          lessonId: lesson.id,
                          lessonTitle: lesson.title,
                          skill: "writing",
                          category: "rule",
                          categoryLabelVi: "Cấu Trúc Đoạn Văn",
                          title: `${lesson.title} • Bước ${idx + 1}`,
                          content: step,
                          lessonHref: `/theory/writing-blueprints/${lesson.id}`,
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
              itemId={`recall_writing_${lesson.id}_structure`}
              itemTitle="Phác Đồ Cấu Trúc Khung Chuẩn"
              targetText={lesson.step1Principles.structuralBlueprintVi.join(". ")}
              lessonTitle={lesson.title}
            />
          </div>

          {/* Action Step Next */}
          <div className="flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:bg-amber-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Tiếp Tục: Vạch Trần Bẫy Khảo Thí (Bước 2)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Step 2: Vạch Trần Bẫy Khảo Thí & Đối Chiếu Band 5.0 vs 8.0 */}
      {currentStep === 2 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-500" />
              Phân Tích Các Bẫy Khảo Thí Điển Hình & Cách Hóa Giải
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              So sánh trực quan giữa câu văn Band 5.0 (mắc lỗi phổ biến) và câu văn Band 8.0+ (chuẩn học thuật).
            </p>
          </div>

          <div className="space-y-6">
            {lesson.step2ExaminerTraps.map((trap, idx) => {
              const trapBmId = `bm_writing_${lesson.id}_trap_${idx}`;
              const isTrapSaved = isSaved(trapBmId);

              return (
                <div
                  key={idx}
                  className={cn(
                    "p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4 transition-all",
                    isTrapSaved && "ring-2 ring-amber-500/30 border-amber-500/40"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold font-mono text-xs">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-extrabold text-foreground">
                          {trap.trapNameVi}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {trap.trapMechanismVi}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
                      <TheorySpeakerButton
                        text={`Bẫy ${idx + 1}: ${trap.trapNameVi}. Cơ chế bẫy: ${trap.trapMechanismVi}. Nhận định giám khảo: ${trap.examinerInsightVi}`}
                        title={`Nghe đọc bẫy ${idx + 1}`}
                        label="Đọc bẫy"
                        size="sm"
                      />

                      {/* Dedicated Trap Bookmark Button */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleBookmark({
                            id: trapBmId,
                            lessonId: lesson.id,
                            lessonTitle: lesson.title,
                            skill: "writing",
                            category: "trap",
                            categoryLabelVi: "Bẫy Giám Khảo Writing",
                            title: `Bẫy #${idx + 1}: ${trap.trapNameVi}`,
                            content: `Lỗi Band 5.0: "${trap.band50WrongSample}"\nChuẩn Band 8.0+: "${trap.band80CorrectSample}"\nCơ chế: ${trap.trapMechanismVi}\nExaminer Insight: ${trap.examinerInsightVi}`,
                            excerptText: trap.band80CorrectSample,
                            translationVi: trap.band80TranslationVi,
                            wordBreakdown: trap.wordBreakdown,
                            lessonHref: `/theory/writing-blueprints/${lesson.id}`,
                          })
                        }
                        className={cn(
                          "px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs shrink-0",
                          isTrapSaved
                            ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                            : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
                        )}
                        title="Lưu bẫy Writing này vào Sổ Cần Nhớ để ôn tập"
                      >
                        {isTrapSaved ? (
                          <>
                            <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
                            <span>★ Đã Lưu Bẫy</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                            <span>☆ Lưu Bẫy Này</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <TheoryMaskableContent
                    itemId={`recall_writing_${lesson.id}_trap_${idx}`}
                    itemTitle={`Bẫy Khảo Thí: ${trap.trapNameVi}`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Band 5.0 Flawed Sample */}
                      <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2.5">
                        <div className="flex items-center justify-between gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <XCircle className="h-4 w-4 shrink-0" />
                            <span>Band 5.0 Lỗi / Bị Trừ Điểm:</span>
                          </div>
                          <PronounceWordButton word={trap.band50WrongSample} size="xs" title="Nghe câu mẫu Band 5.0" />
                        </div>
                        <blockquote className="text-xs italic font-serif text-foreground/80 pl-2 border-l-2 border-rose-500/40">
                          &ldquo;{trap.band50WrongSample}&rdquo;
                        </blockquote>
                        {trap.band50TranslationVi && (
                          <div className="pt-2 border-t border-rose-500/20 text-[11px] text-muted-foreground flex items-start gap-1.5">
                            <Languages className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span className="italic leading-relaxed">
                              <strong className="text-rose-600 dark:text-rose-400 not-italic">Dịch nghĩa:</strong> {trap.band50TranslationVi}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Band 8.0+ Correct Sample */}
                      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
                        <div className="flex items-center justify-between gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            <span>Band 8.0+ Chuẩn Khảo Thí:</span>
                          </div>
                          <PronounceWordButton word={trap.band80CorrectSample} size="xs" title="Nghe câu chuẩn Band 8.0+" />
                        </div>
                        <blockquote className="text-xs font-serif text-foreground/90 font-medium pl-2 border-l-2 border-emerald-500/40">
                          &ldquo;{trap.band80CorrectSample}&rdquo;
                        </blockquote>
                        {trap.band80TranslationVi && (
                          <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-foreground/90 flex items-start gap-1.5">
                            <Languages className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">
                              <strong className="text-emerald-600 dark:text-emerald-400">Dịch nghĩa:</strong> {trap.band80TranslationVi}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border text-xs text-muted-foreground leading-relaxed mt-3">
                      <strong className="text-foreground">Examiner Insight: </strong>
                      {trap.examinerInsightVi}
                    </div>
                  </TheoryMaskableContent>

                  {/* Vocabulary Breakdown for Trap */}
                  {trap.wordBreakdown && trap.wordBreakdown.length > 0 && (() => {
                    const recWords = trap.wordBreakdown.filter((w) => isRecommendedBand75Word(w, "writing"));
                    return (
                      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                              Tách Nghĩa Từng Từ Học Thuật (Lưu Vào Sổ FSRS):
                            </span>
                            <span className="text-[9px] font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border/70">
                              🎯 Lộ trình 7.5: <strong>Mục tiêu 6.5 Writing</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {recWords.length > 0 && (
                              <button
                                type="button"
                                onClick={() => handleSaveAllWords(recWords, trap.band80CorrectSample)}
                                className="text-[10px] font-black text-amber-800 dark:text-amber-200 border border-amber-500/40 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                                title="Chỉ lưu các collocation & liên từ chuẩn xác cho mục tiêu 6.5 Writing trong lộ trình 7.5"
                              >
                                <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                                <span>Lưu {recWords.length} từ cần cho 6.5 Wri</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleSaveAllWords(trap.wordBreakdown || [], trap.band80CorrectSample)}
                              className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                              <span>Lưu toàn bộ từ</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {trap.wordBreakdown.map((item, wIdx) => {
                            const isWordSaved = savedWords[item.word];
                            const recInfo = getRecommendationBadgeInfo(item, "writing");
                            return (
                              <div
                                key={wIdx}
                                className={cn(
                                  "p-2.5 rounded-xl bg-card border flex items-center justify-between gap-2 shadow-2xs transition-all",
                                  recInfo.isRecommended
                                    ? "border-amber-500/40 bg-amber-500/[0.03]"
                                    : "border-border/80"
                                )}
                              >
                                <div className="min-w-0 flex-1 space-y-0.5">
                                  {recInfo.isRecommended && (
                                    <div className="pb-0.5">
                                      <Band75RecommendationBadge
                                        skill="writing"
                                        bandTarget={recInfo.bandTarget}
                                        reasonVi={recInfo.reasonVi}
                                        compact
                                      />
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-bold text-foreground font-mono text-xs">{item.word}</span>
                                    <PronounceWordButton word={item.word} size="xs" />
                                    <span className="text-[10px] text-muted-foreground font-mono">{item.ipa}</span>
                                    <span className="text-[9px] px-1 rounded bg-secondary text-muted-foreground uppercase">{item.type}</span>
                                  </div>
                                  <p className="text-[11px] text-foreground/80 truncate mt-0.5">{item.meaningVi}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleSaveWord(item, trap.band80CorrectSample)}
                                  className={cn(
                                    "px-2 py-1 rounded-lg text-[10px] font-bold shrink-0 flex items-center gap-1 cursor-pointer transition-all",
                                    isWordSaved
                                      ? "bg-emerald-500 text-white font-black"
                                      : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                  )}
                                  title="Lưu từ vào Sổ Từ Vựng FSRS"
                                >
                                  {isWordSaved ? (
                                    <>
                                      <Check className="h-3 w-3" />
                                      <span>Đã lưu</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="h-3 w-3" />
                                      <span>Lưu</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  <TheoryItemRecallBox
                    itemId={`recall_writing_${lesson.id}_trap_${idx}`}
                    itemTitle={`Bẫy Khảo Thí: ${trap.trapNameVi}`}
                    targetText={`Cơ chế: ${trap.trapMechanismVi}. Nhận định giám khảo: ${trap.examinerInsightVi}`}
                    lessonTitle={lesson.title}
                  />
                </div>
              );
            })}
          </div>

          {/* Action Step Next */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-secondary transition-colors"
            >
              Bước 1: Tiêu Chí
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:bg-amber-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Tiếp Tục: Mổ Xẻ Bài Mẫu Band 8.5+ (Bước 3)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 6. Step 3: Mổ Xẻ Bài Mẫu Band 8.5+ & Gán Nhãn Token */}
      {currentStep === 3 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Mổ Xẻ Bài Mẫu Band 8.5+ & Ma Trận Gán Nhãn Token
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {lesson.step3ModelEssayDissection.overviewSummaryVi}
            </p>
          </div>

          {/* Annotated Model Essay Component with lesson info */}
          <ModelEssayAnnotator
            promptTitle={lesson.step3ModelEssayDissection.promptTitle}
            paragraphs={lesson.step3ModelEssayDissection.annotatedParagraphs}
            academicCollocations={lesson.step3ModelEssayDissection.academicCollocations}
            concludingFormulaVi={lesson.step3ModelEssayDissection.concludingFormulaVi}
            lessonId={lesson.id}
            lessonTitle={lesson.title}
          />

          {/* Action Step Next */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-secondary transition-colors"
            >
              Bước 2: Bẫy Khảo Thí
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 hover:bg-purple-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Vào Cổng Khảo Thí Gateway Quiz (Bước 4)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 7. Step 4: Cổng Trắc Nghiệm Gateway Quiz (5 Câu Hỏi Mở Khóa) */}
      {currentStep === 4 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <ProductiveGatewayQuiz
            questions={lesson.gatewayQuiz}
            userAnswers={quizAnswers}
            onSelectOption={selectOption}
            isSubmitted={isSubmitted}
            evaluation={evaluation}
            onSubmit={submitQuiz}
            onRetake={retakeQuiz}
            onOpenUnlockModal={() => setIsUnlockModalOpen(true)}
          />

          {/* Step Back Action */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-secondary transition-colors"
            >
              Bước 3: Mổ Xẻ Bài Mẫu
            </button>
          </div>
        </div>
      )}

      {/* 8. Modals */}
      <BlueprintUnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        topicTitle={lesson.title}
        skill="writing"
        scorePercentage={evaluation?.scorePercentage || 0}
        correctCount={evaluation?.correctCount || 0}
        totalCount={evaluation?.totalQuestions || lesson.gatewayQuiz.length}
        unlockedPracticeRoute={lesson.unlockedPracticeRoute.href}
        unlockedPracticeTitle={lesson.unlockedPracticeRoute.nameVi}
      />

      <BandDescriptorsQuickMatrix
        skill="writing"
        isOpen={showMatrixModal}
        onClose={() => setShowMatrixModal(false)}
      />
    </div>
  );
}
