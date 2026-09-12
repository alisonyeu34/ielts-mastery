"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MOCK_LISTENING_METHODS,
  ListeningSectionBlueprintLesson,
} from "@/data/mockListeningMethodsData";
import { useMethodologySession } from "@/hooks/useMethodologySession";
import { ThreeStepMethodologyViewer } from "@/components/theory/methodology/ThreeStepMethodologyViewer";
import { ExaminerTrapSpotlight } from "@/components/theory/methodology/ExaminerTrapSpotlight";
import { AudioTrapSnippetPlayer } from "@/components/theory/methodology/AudioTrapSnippetPlayer";
import { ExcerptVocabularyCard } from "@/components/theory/ExcerptVocabularyCard";
import { MethodologyGatewayQuiz } from "@/components/theory/methodology/MethodologyGatewayQuiz";
import { StrategyUnlockModal } from "@/components/theory/methodology/StrategyUnlockModal";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";
import {
  ArrowLeft,
  Headphones,
  Clock,
  Sparkles,
  Award,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Volume2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { TheoryBookmarkButton } from "@/components/theory/TheoryBookmarkButton";
import { TheoryItemRecallBox } from "@/components/theory/TheoryItemRecallBox";
import { TheoryMaskableContent } from "@/components/theory/TheoryMaskableContent";
import { StudentJargonClarifier } from "@/components/theory/StudentJargonClarifier";
import { cn } from "@/lib/utils";

export default function ListeningSectionDetailPage() {
  const params = useParams();
  const rawId = (params?.sectionId as string) || (params?.id as string) || "listening-section1-self-correction";

  const lesson: ListeningSectionBlueprintLesson =
    MOCK_LISTENING_METHODS.find((l) => l.id === rawId) ||
    MOCK_LISTENING_METHODS[0];

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
    playingSnippetId,
    playAudioSnippet,
    stopAudioSnippet,
  } = useMethodologySession(lesson.id, lesson.title, "listening", lesson.gatewayQuiz);

  const { isSaved, toggleBookmark } = useTheoryBookmarks();
  const isStep3Saved = isSaved(`bm_${lesson.id}_step3_model`);
  const isPreListeningSaved = isSaved(`bm_${lesson.id}_pre_listening`);

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/theory/listening-methods"
            className="p-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground border border-border cursor-pointer transition-all"
            title="Quay lại danh mục chiến lược Listening"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase">
                Section {lesson.sectionNumber} • {lesson.targetBand}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {lesson.estimatedMinutes} Phút đọc • {lesson.audioSnippets.length} Audio mẫu
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
      <StudentJargonClarifier currentSkill="listening" />

      {/* 2. Step 1: Context & Pre-listening Technique */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border/80 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                BƯỚC 1 / 3 • BỐI CẢNH & KỸ THUẬT 30 GIÂY ĐỌC ĐỀ
              </span>
              <h2 className="text-lg sm:text-xl font-black text-foreground mt-0.5">
                Đặc Điểm Khảo Thí & Kỹ Năng Nghe Cốt Lõi
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 text-xs leading-relaxed space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">
                Bối Cảnh Khảo Thí Cambridge:
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <TheorySpeakerButton
                  text={lesson.step1Principles.contextOverviewVi}
                  title="Nghe đọc bối cảnh khảo thí"
                  label="Đọc"
                  size="sm"
                />
                <TheoryBookmarkButton
                  item={{
                    id: `bm_${lesson.id}_context_overview`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "listening",
                    category: "rule",
                    categoryLabelVi: "Bối Cảnh Section",
                    title: `Bối cảnh Section ${lesson.sectionNumber}: ${lesson.title.split(":")[0]}`,
                    content: lesson.step1Principles.contextOverviewVi,
                    lessonHref: `/theory/listening-methods/${lesson.id}`,
                  }}
                  label="Lưu quy tắc"
                  savedLabel="Đã lưu quy tắc ✓"
                  size="sm"
                />
              </div>
            </div>
            <TheoryMaskableContent
              itemId={`recall_listening_${lesson.id}_context`}
              itemTitle="Bối Cảnh Khảo Thí Section"
            >
              <p className="text-foreground/90 font-medium">
                {lesson.step1Principles.contextOverviewVi}
              </p>
            </TheoryMaskableContent>
            <TheoryItemRecallBox
              itemId={`recall_listening_${lesson.id}_context`}
              itemTitle="Bối Cảnh Khảo Thí Section"
              targetText={lesson.step1Principles.contextOverviewVi}
              lessonTitle={lesson.title}
            />
          </div>

          {/* Key Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>4 Kỹ Năng Bắt Buộc Để Đạt Điểm Tối Đa Section {lesson.sectionNumber} (Có loa đọc & nút lưu):</span>
            </h3>

            <div className="space-y-2.5">
              {lesson.step1Principles.keySkillsRequiredVi.map((skillText, idx) => {
                const skillBookmarkId = `bm_${lesson.id}_skill_${idx}`;
                const isSkillSaved = isSaved(skillBookmarkId);
                return (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 rounded-2xl bg-card border flex flex-col gap-2.5 text-xs leading-relaxed transition-all shadow-xs",
                      isSkillSaved ? "border-amber-500/40 bg-amber-500/[0.03]" : "border-border"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white font-mono font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <TheoryMaskableContent
                          itemId={`recall_listening_${lesson.id}_skill_${idx}`}
                          itemTitle={`Kỹ Năng Cốt Lõi #${idx + 1}`}
                          className="flex-1 min-w-0"
                        >
                          <p className="text-foreground/90 font-medium leading-relaxed">{skillText}</p>
                        </TheoryMaskableContent>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <TheorySpeakerButton
                          text={`Kỹ năng ${idx + 1}: ${skillText}`}
                          title={`Nghe đọc kỹ năng ${idx + 1}`}
                          size="icon-only"
                        />

                        <TheoryBookmarkButton
                          item={{
                            id: skillBookmarkId,
                            lessonId: lesson.id,
                            lessonTitle: lesson.title,
                            skill: "listening",
                            category: "rule",
                            categoryLabelVi: "Kỹ Năng Nghe Cốt Lõi",
                            title: `Kỹ năng ${idx + 1}: ${lesson.title.split(":")[0]}`,
                            content: skillText,
                            lessonHref: `/theory/listening-methods/${lesson.id}`,
                          }}
                          label="Lưu quy tắc"
                          savedLabel="Đã lưu ✓"
                          size="sm"
                        />
                      </div>
                    </div>

                    <TheoryItemRecallBox
                      itemId={`recall_listening_${lesson.id}_skill_${idx}`}
                      itemTitle={`Kỹ Năng Cốt Lõi #${idx + 1}`}
                      targetText={skillText}
                      lessonTitle={lesson.title}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pre-listening Technique with Bookmark */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="font-extrabold text-indigo-700 dark:text-indigo-300 font-mono text-[10px] uppercase block">
                KỸ THUẬT VÀNG TẬN DỤNG 30-60 GIÂY ĐỌC ĐỀ TRƯỚC KHI AUDIO PHÁT:
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                <TheorySpeakerButton
                  text={`Kỹ thuật tận dụng thời gian đọc đề: ${lesson.step1Principles.preListeningTechniqueVi}`}
                  title="Nghe đọc kỹ thuật đọc đề"
                  label="Đọc"
                  size="sm"
                />

                <TheoryBookmarkButton
                  item={{
                    id: `bm_${lesson.id}_pre_listening`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "listening",
                    category: "rule",
                    categoryLabelVi: "Kỹ Thuật Đọc Đề",
                    title: `Kỹ thuật đọc đề: ${lesson.title.split(":")[0]}`,
                    content: lesson.step1Principles.preListeningTechniqueVi,
                    lessonHref: `/theory/listening-methods/${lesson.id}`,
                  }}
                  label="Lưu quy tắc"
                  savedLabel="Đã lưu ✓"
                  size="sm"
                />
              </div>
            </div>

            <TheoryMaskableContent
              itemId={`recall_listening_${lesson.id}_pre_listening`}
              itemTitle="Kỹ Thuật Đọc Đề 30-60 Giây"
            >
              <p className="text-foreground/90 font-medium leading-relaxed">
                {lesson.step1Principles.preListeningTechniqueVi}
              </p>
            </TheoryMaskableContent>
            <TheoryItemRecallBox
              itemId={`recall_listening_${lesson.id}_pre_listening`}
              itemTitle="Kỹ Thuật Đọc Đề 30-60 Giây"
              targetText={lesson.step1Principles.preListeningTechniqueVi}
              lessonTitle={lesson.title}
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Tiếp Tục ➔ Bước 2: Bắt Bẫy Khảo Thí & Nghe Audio Mẫu</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Step 2: Examiner Traps & Mini Audio Player */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Trap Spotlight */}
          {lesson.step2ExaminerTraps.map((trap, tIdx) => (
            <ExaminerTrapSpotlight
              key={tIdx}
              id={`bm_${lesson.id}_trap_${tIdx}`}
              trapName={trap.trapNameVi}
              trapMechanism={trap.trapMechanismVi}
              excerptText={trap.dialogueExcerpt}
              translationVi={trap.translationVi}
              wordBreakdown={trap.wordBreakdown}
              deceptiveStatementOrChoice={trap.wrongChoiceVi}
              correctAnswerText={trap.correctAnswer}
              examinerInsight={trap.examinerInsightVi}
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              skill="listening"
            />
          ))}

          {/* Audio Snippet Samples */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Volume2 className="h-4 w-4 text-indigo-500" />
              <span>Các Đoạn Audio Mẫu Minh Họa Bẫy Thường Gặp (Có bản dịch & tách từ):</span>
            </h3>

            <div className="space-y-4">
              {lesson.audioSnippets.map((snippet) => (
                <AudioTrapSnippetPlayer
                  key={snippet.id}
                  snippet={snippet}
                  isPlaying={playingSnippetId === snippet.id}
                  onPlay={playAudioSnippet}
                  onStop={stopAudioSnippet}
                  lessonId={lesson.id}
                  lessonTitle={lesson.title}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-xs shadow-md shadow-amber-600/25 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Tiếp Tục ➔ Bước 3: Mổ Xẻ Transcript Band 8.5+</span>
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
                  BƯỚC 3 / 3 • MỔ XẺ AUDIO TRANSCRIPT CHUẨN BAND 8.5+
                </span>
                <h2 className="text-lg sm:text-xl font-black text-foreground mt-0.5">
                  Bóc Tách Từng Giây (Timestamp Audit) & Chốt Đáp Án
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
                  skill: "listening",
                  category: "model",
                  categoryLabelVi: "Mổ Xẻ Audio Transcript",
                  title: `Mổ xẻ Audio Band 8.5+: ${lesson.title.split(":")[0]}`,
                  content: `Câu hỏi: ${lesson.step3ModelWalkthrough.questionPrompt}\n\nDiễn biến âm thanh:\n${lesson.step3ModelWalkthrough.audioTimestampAuditVi.join("\n")}`,
                  excerptText: lesson.step3ModelWalkthrough.audioDialogueText,
                  translationVi: lesson.step3ModelWalkthrough.translationVi,
                  wordBreakdown: lesson.step3ModelWalkthrough.wordBreakdown,
                  lessonHref: `/theory/listening-methods/${lesson.id}`,
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
                  <span>☆ Lưu Mổ Xẻ Transcript Này</span>
                </>
              )}
            </button>
          </div>

          {/* Prompt Item */}
          <div className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-1">
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase block">
              Câu hỏi trong đề thi:
            </span>
            <p className="font-bold text-foreground text-xs sm:text-sm leading-relaxed">
              {lesson.step3ModelWalkthrough.questionPrompt}
            </p>
          </div>

          {/* Bilingual Audio Dialogue & Word Breakdown */}
          <ExcerptVocabularyCard
            label="Audio Transcript Ghi Âm Thực Tế:"
            englishText={lesson.step3ModelWalkthrough.audioDialogueText}
            translationVi={lesson.step3ModelWalkthrough.translationVi}
            wordBreakdown={lesson.step3ModelWalkthrough.wordBreakdown}
            sourceLessonTitle={lesson.title}
            sourceModule="listening"
          />

          {/* Timestamp Audit */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-foreground uppercase block">
              Phân tích diễn biến âm thanh theo từng giây:
            </span>
            <div className="space-y-2">
              {lesson.step3ModelWalkthrough.audioTimestampAuditVi.map((auditStep, aIdx) => (
                <div
                  key={aIdx}
                  className="p-3 rounded-xl bg-card border border-border text-foreground/90 font-medium font-mono text-[11px] flex items-start justify-between gap-2"
                >
                  <span className="flex-1 leading-relaxed">{auditStep}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <TheorySpeakerButton text={auditStep} size="icon-only" />
                    <TheoryBookmarkButton
                      item={{
                        id: `bm_listening_${lesson.id}_audit_${aIdx}`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "listening",
                        category: "tip",
                        categoryLabelVi: "Bóc Tách Giây Nghe",
                        title: `${lesson.title} • Nhịp ${aIdx + 1}`,
                        content: auditStep,
                        lessonHref: `/theory/listening-methods/${lesson.id}`,
                      }}
                      label="Lưu"
                      savedLabel="Đã lưu ✓"
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concluding Strategy with Bookmark & Speaker & Recall */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/30 flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase block">
                  💡 Chiến Lược Chốt Hạ:
                </span>
                <TheoryMaskableContent
                  itemId={`recall_listening_${lesson.id}_concluding_strategy`}
                  itemTitle="Chiến Lược Chốt Hạ"
                >
                  <p className="text-foreground/90 font-bold leading-relaxed text-xs sm:text-sm">
                    {lesson.step3ModelWalkthrough.concludingStrategyVi}
                  </p>
                </TheoryMaskableContent>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <TheorySpeakerButton
                  text={`Chiến lược chốt hạ: ${lesson.step3ModelWalkthrough.concludingStrategyVi}`}
                  title="Nghe đọc chiến lược chốt hạ"
                  size="icon-only"
                />
                <TheoryBookmarkButton
                  item={{
                    id: `bm_${lesson.id}_concluding_strategy`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "listening",
                    category: "tip",
                    categoryLabelVi: "Chiến Lược Chốt Hạ",
                    title: `Chiến lược: ${lesson.title.split(":")[0]}`,
                    content: lesson.step3ModelWalkthrough.concludingStrategyVi,
                    lessonHref: `/theory/listening-methods/${lesson.id}`,
                  }}
                  label="Lưu chiến lược"
                  savedLabel="Đã lưu ✓"
                  size="sm"
                />
              </div>
            </div>

            <TheoryItemRecallBox
              itemId={`recall_listening_${lesson.id}_concluding_strategy`}
              itemTitle="Chiến Lược Chốt Hạ"
              targetText={lesson.step3ModelWalkthrough.concludingStrategyVi}
              lessonTitle={lesson.title}
            />
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
