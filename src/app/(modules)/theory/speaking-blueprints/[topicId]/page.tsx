"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MOCK_SPEAKING_BLUEPRINTS,
  SpeakingBlueprintLesson,
} from "@/data/mockSpeakingBlueprintsData";
import { useProductiveTheorySession } from "@/hooks/useProductiveTheorySession";
import { ThreeStepBlueprintViewer } from "@/components/theory/blueprints/ThreeStepBlueprintViewer";
import { AudioContrastPlayer } from "@/components/theory/blueprints/AudioContrastPlayer";
import { ProductiveGatewayQuiz } from "@/components/theory/blueprints/ProductiveGatewayQuiz";
import { BlueprintUnlockModal } from "@/components/theory/blueprints/BlueprintUnlockModal";
import { BandDescriptorsQuickMatrix } from "@/components/theory/blueprints/BandDescriptorsQuickMatrix";
import { ExcerptVocabularyCard } from "@/components/theory/ExcerptVocabularyCard";
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
  Mic,
  Clock,
  Sparkles,
  Star,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Volume2,
  Table,
  Layers,
  Award,
  ArrowRight,
  MessageSquareQuote,
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  Languages,
  Plus,
  Check,
} from "lucide-react";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { TheoryBookmarkButton } from "@/components/theory/TheoryBookmarkButton";
import { TheoryItemRecallBox } from "@/components/theory/TheoryItemRecallBox";
import { TheoryMaskableContent } from "@/components/theory/TheoryMaskableContent";
import { StudentJargonClarifier } from "@/components/theory/StudentJargonClarifier";
import { cn } from "@/lib/utils";

export default function SpeakingBlueprintDetailPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params?.topicId as string;

  const [showMatrixModal, setShowMatrixModal] = useState<boolean>(false);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const { isSaved, toggleBookmark } = useTheoryBookmarks();

  const lesson = MOCK_SPEAKING_BLUEPRINTS.find((l) => l.id === topicId);

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
    activeAudioType,
    playAudioContrast,
    stopAudioContrast,
  } = useProductiveTheorySession(
    lesson?.id || "",
    lesson?.title || "",
    "speaking",
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
      sourceModule: "speaking",
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
        sourceModule: "speaking",
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
        <h2 className="text-2xl font-bold text-foreground">Không tìm thấy chuyên đề Speaking</h2>
        <p className="text-muted-foreground text-sm">
          Chuyên đề bạn đang tìm kiếm không tồn tại hoặc đã được chuyển dời.
        </p>
        <Link
          href="/theory/speaking-blueprints"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-500/20 hover:bg-sky-600 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Về Danh Mục Speaking Blueprints
        </Link>
      </div>
    );
  }

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
            href="/theory/speaking-blueprints"
            className="hover:text-foreground transition-colors font-medium"
          >
            Speaking Blueprints
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
            <Table className="h-3.5 w-3.5 text-sky-500" />
            <span>Band Descriptors</span>
          </button>
          <Link
            href="/theory/speaking-blueprints"
            className="px-3 py-1.5 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Quay Lại</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Title & Badges */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-500/10 via-card to-blue-500/5 border border-sky-500/20 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full font-mono text-xs font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400">
            {lesson.partNameVi}
          </span>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground uppercase">
            Mục Tiêu: {lesson.bandTarget}
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-sky-500" />
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
        skill="speaking"
      />

      {/* Student Jargon Clarifier */}
      <StudentJargonClarifier currentSkill="speaking" />

      {/* 4. Step 1: Bản Chất Tiêu Chí & Khung Chiến Thuật */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Core Philosophy Box */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    Tư Duy & Triết Lý Phản Xạ Khảo Thí Cambridge
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Bản chất giao tiếp tự nhiên và phản xạ ngôn ngữ học thuật
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <TheorySpeakerButton
                  text={`Triết lý phản xạ khảo thí Cambridge: ${lesson.step1Principles.corePhilosophyVi}`}
                  title="Nghe đọc triết lý phản xạ"
                  label="Đọc"
                  size="sm"
                />
                <TheoryBookmarkButton
                  item={{
                    id: `bm_speaking_${lesson.id}_philosophy`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "speaking",
                    category: "rule",
                    categoryLabelVi: "Triết Lý Phản Xạ",
                    title: `${lesson.title} • Triết Lý Phản Xạ`,
                    content: lesson.step1Principles.corePhilosophyVi,
                    lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
                  }}
                  label="Lưu quy tắc"
                  savedLabel="Đã lưu quy tắc ✓"
                  size="sm"
                />
              </div>
            </div>
            <TheoryMaskableContent
              itemId={`recall_speaking_${lesson.id}_philosophy`}
              itemTitle="Tư Duy & Triết Lý Phản Xạ Khảo Thí Cambridge"
            >
              <p className="text-sm text-foreground/90 leading-relaxed bg-sky-500/5 p-4 rounded-2xl border border-sky-500/15">
                {lesson.step1Principles.corePhilosophyVi}
              </p>
            </TheoryMaskableContent>
            <TheoryItemRecallBox
              itemId={`recall_speaking_${lesson.id}_philosophy`}
              itemTitle="Tư Duy & Triết Lý Phản Xạ Khảo Thí Cambridge"
              targetText={lesson.step1Principles.corePhilosophyVi}
              lessonTitle={lesson.title}
            />
          </div>

          {/* 4 Criteria Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-extrabold text-foreground uppercase tracking-wider">
                <Layers className="h-4 w-4 text-sky-500" />
                4 Tiêu Chí Chấm Điểm Speaking Chính Thức (Band Descriptors Breakdown)
              </div>
              <TheoryBookmarkButton
                item={{
                  id: `bm_speaking_${lesson.id}_criteria_all`,
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                  skill: "speaking",
                  category: "rule",
                  categoryLabelVi: "Tiêu Chí Speaking",
                  title: `${lesson.title} • 4 Tiêu Chí Speaking`,
                  content: `FC: ${lesson.step1Principles.fourCriteriaBreakdownVi.fc}\nLR: ${lesson.step1Principles.fourCriteriaBreakdownVi.lr}\nGRA: ${lesson.step1Principles.fourCriteriaBreakdownVi.gra}\nPR: ${lesson.step1Principles.fourCriteriaBreakdownVi.pr}`,
                  lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
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
                    Fluency & Coherence (FC)
                  </span>
                  <div className="flex items-center gap-1">
                    <TheorySpeakerButton
                      text={`Fluency and Coherence: ${lesson.step1Principles.fourCriteriaBreakdownVi.fc}`}
                      size="icon-only"
                    />
                    <TheoryBookmarkButton
                      item={{
                        id: `bm_speaking_${lesson.id}_criteria_fc`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "speaking",
                        category: "rule",
                        categoryLabelVi: "Tiêu Chí Speaking",
                        title: `${lesson.title} • Fluency & Coherence (FC)`,
                        content: lesson.step1Principles.fourCriteriaBreakdownVi.fc,
                        lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
                      }}
                      size="icon-only"
                    />
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {lesson.step1Principles.fourCriteriaBreakdownVi.fc}
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
                        id: `bm_speaking_${lesson.id}_criteria_lr`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "speaking",
                        category: "rule",
                        categoryLabelVi: "Tiêu Chí Speaking",
                        title: `${lesson.title} • Lexical Resource (LR)`,
                        content: lesson.step1Principles.fourCriteriaBreakdownVi.lr,
                        lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
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
                        id: `bm_speaking_${lesson.id}_criteria_gra`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "speaking",
                        category: "rule",
                        categoryLabelVi: "Tiêu Chí Speaking",
                        title: `${lesson.title} • Grammatical Range & Accuracy (GRA)`,
                        content: lesson.step1Principles.fourCriteriaBreakdownVi.gra,
                        lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
                      }}
                      size="icon-only"
                    />
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {lesson.step1Principles.fourCriteriaBreakdownVi.gra}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-1.5">
                  <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                    Pronunciation & Intonation (PR)
                  </span>
                  <div className="flex items-center gap-1">
                    <TheorySpeakerButton
                      text={`Pronunciation and Intonation: ${lesson.step1Principles.fourCriteriaBreakdownVi.pr}`}
                      size="icon-only"
                    />
                    <TheoryBookmarkButton
                      item={{
                        id: `bm_speaking_${lesson.id}_criteria_pr`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "speaking",
                        category: "rule",
                        categoryLabelVi: "Tiêu Chí Speaking",
                        title: `${lesson.title} • Pronunciation & Intonation (PR)`,
                        content: lesson.step1Principles.fourCriteriaBreakdownVi.pr,
                        lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
                      }}
                      size="icon-only"
                    />
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {lesson.step1Principles.fourCriteriaBreakdownVi.pr}
                </p>
              </div>
            </div>
          </div>

          {/* Tactical Framework */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    Khung Chiến Thuật Khảo Thí (Tactical Speaking Matrix)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Phác đồ mở rộng ý và liên kết logic câu trả lời
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <TheorySpeakerButton
                  text={`Khung chiến thuật phản xạ: ${lesson.step1Principles.tacticalFrameworkVi.join(". ")}`}
                  title="Nghe đọc khung chiến thuật"
                  label="Đọc chiến thuật"
                  size="sm"
                />

                <TheoryBookmarkButton
                  item={{
                    id: `bm_speaking_${lesson.id}_tactics`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "speaking",
                    category: "rule",
                    categoryLabelVi: "Chiến Thuật Speaking",
                    title: `Khung Chiến Thuật: ${lesson.title}`,
                    content: lesson.step1Principles.tacticalFrameworkVi.join("\n"),
                    lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
                  }}
                  label="Lưu chiến thuật"
                  savedLabel="Đã lưu chiến thuật ✓"
                  size="sm"
                />
            </div>
          </div>

            <TheoryMaskableContent
              itemId={`recall_speaking_${lesson.id}_tactics`}
              itemTitle="Khung Chiến Thuật Khảo Thí"
            >
              <div className="space-y-3">
                {lesson.step1Principles.tacticalFrameworkVi.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-secondary/40 border border-border/60 text-xs text-foreground/90"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500 text-white font-mono font-bold shrink-0 mt-0.5">
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
                          id: `bm_speaking_${lesson.id}_tactical_step_${idx}`,
                          lessonId: lesson.id,
                          lessonTitle: lesson.title,
                          skill: "speaking",
                          category: "rule",
                          categoryLabelVi: "Chiến Thuật Speaking",
                          title: `${lesson.title} • Bước ${idx + 1}`,
                          content: step,
                          lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
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
              itemId={`recall_speaking_${lesson.id}_tactics`}
              itemTitle="Khung Chiến Thuật Khảo Thí"
              targetText={lesson.step1Principles.tacticalFrameworkVi.join(". ")}
              lessonTitle={lesson.title}
            />
          </div>

          {/* Action Step Next */}
          <div className="flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-2xl bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 hover:bg-sky-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Tiếp Tục: Bẫy Khảo Thí & Luyện Audio Contrast (Bước 2)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Step 2: Vạch Trần Bẫy Khảo Thí & Dual Audio Contrast */}
      {currentStep === 2 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-500" />
              Phân Tích Các Bẫy Khảo Thí Speaking Điển Hình & Kỹ Thuật Né Bẫy
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              So sánh cách trả lời cộc lốc Band 5.0 và cách phản xạ mở rộng đa chiều Band 8.0+.
            </p>
          </div>

          {/* Examiner Traps */}
          <div className="space-y-6">
            {lesson.step2ExaminerTraps.map((trap, idx) => {
              const trapBmId = `bm_speaking_${lesson.id}_trap_${idx}`;
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
                            skill: "speaking",
                            category: "trap",
                            categoryLabelVi: "Bẫy Giám Khảo Speaking",
                            title: `Bẫy #${idx + 1}: ${trap.trapNameVi}`,
                            content: `Lỗi Band 5.0: "${trap.band50WrongSample}"\nChuẩn Band 8.0+: "${trap.band80CorrectSample}"\nCơ chế: ${trap.trapMechanismVi}\nExaminer Insight: ${trap.examinerInsightVi}`,
                            excerptText: trap.band80CorrectSample,
                            translationVi: trap.band80TranslationVi,
                            wordBreakdown: trap.wordBreakdown,
                            lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
                          })
                        }
                        className={cn(
                          "px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs shrink-0",
                          isTrapSaved
                            ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                            : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
                        )}
                        title="Lưu bẫy Speaking này vào Sổ Cần Nhớ để ôn tập"
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
                    itemId={`recall_speaking_${lesson.id}_trap_${idx}`}
                    itemTitle={`Bẫy Khảo Thí: ${trap.trapNameVi}`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Band 5.0 Flawed Sample */}
                      <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2.5">
                        <div className="flex items-center justify-between gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <XCircle className="h-4 w-4 shrink-0" />
                            <span>Band 5.0 Lỗi / Cộc Lốc / Thiếu Chiều Sâu:</span>
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

                  {/* Vocabulary Breakdown with 1-Click FSRS Save */}
                  {trap.wordBreakdown && trap.wordBreakdown.length > 0 && (() => {
                    const recWords = trap.wordBreakdown.filter((w) => isRecommendedBand75Word(w, "speaking"));
                    return (
                      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                              Tách Nghĩa Từng Từ C1/C2 (Lưu Vào Sổ Từ Vựng FSRS):
                            </span>
                            <span className="text-[9px] font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border/70">
                              🎯 Lộ trình 7.5: <strong>Mục tiêu 6.0 Speaking</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {recWords.length > 0 && (
                              <button
                                type="button"
                                onClick={() => handleSaveAllWords(recWords, trap.band80CorrectSample)}
                                className="text-[10px] font-black text-amber-800 dark:text-amber-200 border border-amber-500/40 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                                title="Chỉ lưu các cụm từ đệm & collocation tự nhiên cho mục tiêu 6.0 Speaking trong lộ trình 7.5"
                              >
                                <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                                <span>Lưu {recWords.length} từ cần cho 6.0 Speak</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleSaveAllWords(trap.wordBreakdown || [], trap.band80CorrectSample)}
                              className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                              <span>Lưu toàn bộ từ</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {trap.wordBreakdown.map((item, wIdx) => {
                            const isWordSaved = savedWords[item.word];
                            const recInfo = getRecommendationBadgeInfo(item, "speaking");
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
                                        skill="speaking"
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
                    itemId={`recall_speaking_${lesson.id}_trap_${idx}`}
                    itemTitle={`Bẫy Khảo Thí: ${trap.trapNameVi}`}
                    targetText={`Cơ chế: ${trap.trapMechanismVi}. Nhận định giám khảo: ${trap.examinerInsightVi}`}
                    lessonTitle={lesson.title}
                  />
                </div>
              );
            })}
          </div>

          {/* Dual Audio Contrast Player */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-foreground uppercase tracking-wider">
              <Volume2 className="h-4 w-4 text-sky-500" />
              Luyện Tai Chuẩn Khảo Thí (Dual Audio Contrast Studio)
            </div>
            <AudioContrastPlayer
              audioSample={lesson.audioContrast}
              activeAudioType={activeAudioType}
              onPlay={playAudioContrast}
              onStop={stopAudioContrast}
              lessonId={lesson.id}
              lessonTitle={lesson.title}
            />
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
              className="px-6 py-3 rounded-2xl bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 hover:bg-sky-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Tiếp Tục: Mổ Xẻ Transcript Band 8.5+ (Bước 3)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 6. Step 3: Mổ Xẻ Transcript Band 8.5+ & Cấu Trúc Khảo Thí */}
      {currentStep === 3 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-sky-500" />
                Mổ Xẻ Transcript Mẫu Band 8.5+ & C1/C2 Collocations
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Phân tích từng nhịp trả lời, ngữ điệu hạ giọng cuối câu khẳng định và hệ thống từ vựng ăn điểm.
              </p>
            </div>

            {/* Bookmark Model Transcript */}
            <button
              type="button"
              onClick={() =>
                toggleBookmark({
                  id: `bm_speaking_${lesson.id}_model`,
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                  skill: "speaking",
                  category: "model",
                  categoryLabelVi: "Transcript Mẫu Speaking Band 8.5+",
                  title: `Bài Mẫu: ${lesson.step3ModelDeliveryDissection.examinerQuestion}`,
                  content: lesson.step3ModelDeliveryDissection.modelFullTranscript || lesson.step3ModelDeliveryDissection.transcriptAnalysisVi.join("\n"),
                  excerptText: lesson.step3ModelDeliveryDissection.modelFullTranscript,
                  translationVi: lesson.step3ModelDeliveryDissection.modelTranscriptTranslationVi,
                  wordBreakdown: lesson.step3ModelDeliveryDissection.wordBreakdown,
                  lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
                })
              }
              className={cn(
                "px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all shadow-2xs shrink-0",
                isSaved(`bm_speaking_${lesson.id}_model`)
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                  : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
              )}
              title="Lưu toàn bộ Transcript mẫu này vào Sổ Cần Nhớ"
            >
              {isSaved(`bm_speaking_${lesson.id}_model`) ? (
                <>
                  <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
                  <span>★ Đã Lưu Transcript Mẫu</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                  <span>☆ Lưu Transcript Này Vào Sổ Cần Nhớ</span>
                </>
              )}
            </button>
          </div>

          {/* Examiner Question Box */}
          <div className="p-5 sm:p-6 rounded-3xl bg-secondary/50 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              <MessageSquareQuote className="h-4 w-4" />
              Câu Hỏi Khảo Thí Chuẩn Cambridge (Examiner Prompt):
            </div>
            <h4 className="text-base sm:text-lg font-extrabold text-foreground">
              &ldquo;{lesson.step3ModelDeliveryDissection.examinerQuestion}&rdquo;
            </h4>
            {lesson.step3ModelDeliveryDissection.examinerQuestionVi && (
              <div className="pt-2 border-t border-border/70 text-xs text-muted-foreground flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                <span className="italic">
                  <strong className="text-foreground not-italic">Dịch câu hỏi: </strong>
                  &ldquo;{lesson.step3ModelDeliveryDissection.examinerQuestionVi}&rdquo;
                </span>
              </div>
            )}
          </div>

          {/* Full Model Transcript Card with Bilingual Translation & Word Breakdown */}
          {lesson.step3ModelDeliveryDissection.modelFullTranscript && (
            <ExcerptVocabularyCard
              label="Bản ghi âm hoàn chỉnh chuẩn Band 8.5+ (Full Examiner Benchmark Transcript):"
              englishText={lesson.step3ModelDeliveryDissection.modelFullTranscript}
              translationVi={lesson.step3ModelDeliveryDissection.modelTranscriptTranslationVi}
              wordBreakdown={lesson.step3ModelDeliveryDissection.wordBreakdown}
              sourceLessonTitle={lesson.title}
              sourceModule="speaking"
              skill="speaking"
            />
          )}

          {/* Transcript Paragraphs Analysis */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-foreground uppercase tracking-wider border-b border-border/80 pb-3">
              <Sparkles className="h-4 w-4 text-sky-500" />
              Phân Tích Chi Tiết Từng Nhịp Phát Ngôn (Transcript Breakdown):
            </div>

            <div className="space-y-3">
              {lesson.step3ModelDeliveryDissection.transcriptAnalysisVi.map((analysis, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-secondary/30 border border-border/50 text-xs sm:text-sm text-foreground/90 space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                    <span>Nhịp {idx + 1}</span>
                  </div>
                  <p className="leading-relaxed">{analysis}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lexical Collocations & Concluding Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    C1/C2 Lexical Collocations Ăn Điểm
                  </span>
                  <Band75RecommendationBadge skill="speaking" bandTarget="6.0 Speak" compact />
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">Bấm [+] để lưu vào Sổ FSRS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {lesson.step3ModelDeliveryDissection.lexicalCollocations.map((item, idx) => {
                  const isSavedCol = savedWords[item];
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "px-2.5 py-1 rounded-xl text-xs font-bold font-mono border flex items-center gap-1.5 transition-all",
                        isSavedCol
                          ? "bg-emerald-600 text-white border-emerald-700 font-black"
                          : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleSaveWord(
                            { word: item, ipa: "", type: "collocation", meaningVi: "Cụm từ ghi điểm Speaking C1/C2" },
                            lesson.step3ModelDeliveryDissection.modelFullTranscript
                          )
                        }
                        className="flex items-center gap-1.5 cursor-pointer hover:underline"
                        title="Lưu cụm collocations này vào Sổ Từ Vựng FSRS"
                      >
                        <span>{item}</span>
                        {isSavedCol ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Plus className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </button>
                      <PronounceWordButton
                        word={item}
                        size="xs"
                        iconClassName={isSavedCol ? "text-white" : undefined}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-500/20 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
                    Chiến Lược Chốt Hạ & Thần Thái Khảo Thí
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <TheorySpeakerButton
                      text={`Chiến lược chốt hạ và thần thái khảo thí: ${lesson.step3ModelDeliveryDissection.concludingStrategyVi}`}
                      title="Nghe đọc chiến lược chốt hạ"
                      size="icon-only"
                    />
                    <TheoryBookmarkButton
                      item={{
                        id: `bm_speaking_${lesson.id}_concluding_strategy`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "speaking",
                        category: "tip",
                        categoryLabelVi: "Chiến Lược Chốt Hạ",
                        title: `${lesson.title} • Chiến Lược Chốt Hạ`,
                        content: lesson.step3ModelDeliveryDissection.concludingStrategyVi,
                        lessonHref: `/theory/speaking-blueprints/${lesson.id}`,
                      }}
                      label="Lưu chiến lược"
                      savedLabel="Đã lưu ✓"
                      size="sm"
                    />
                  </div>
                </div>
                <TheoryMaskableContent
                  itemId={`recall_speaking_${lesson.id}_concluding_strategy`}
                  itemTitle="Chiến Lược Chốt Hạ & Thần Thái Khảo Thí"
                >
                  <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                    {lesson.step3ModelDeliveryDissection.concludingStrategyVi}
                  </p>
                </TheoryMaskableContent>
              </div>

              <TheoryItemRecallBox
                itemId={`recall_speaking_${lesson.id}_concluding_strategy`}
                itemTitle="Chiến Lược Chốt Hạ & Thần Thái Khảo Thí"
                targetText={lesson.step3ModelDeliveryDissection.concludingStrategyVi}
                lessonTitle={lesson.title}
              />
            </div>
          </div>

          {/* Action Step Next */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-secondary transition-colors"
            >
              Bước 2: Bẫy & Audio Contrast
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
              Bước 3: Mổ Xẻ Transcript
            </button>
          </div>
        </div>
      )}

      {/* 8. Modals */}
      <BlueprintUnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        topicTitle={lesson.title}
        skill="speaking"
        scorePercentage={evaluation?.scorePercentage || 0}
        correctCount={evaluation?.correctCount || 0}
        totalCount={evaluation?.totalQuestions || lesson.gatewayQuiz.length}
        unlockedPracticeRoute={lesson.unlockedPracticeRoute.href}
        unlockedPracticeTitle={lesson.unlockedPracticeRoute.nameVi}
      />

      <BandDescriptorsQuickMatrix
        skill="speaking"
        isOpen={showMatrixModal}
        onClose={() => setShowMatrixModal(false)}
      />
    </div>
  );
}
