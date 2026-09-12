"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lightbulb,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Award,
  ArrowRight,
  Clock,
  BookOpen,
  Share2,
} from "lucide-react";
import { TheoryLesson } from "@/types/database";
import { QuizEngine } from "@/components/theory/QuizEngine";
import { TrapComparisonCard } from "@/components/theory/TrapComparisonCard";
import { useTheoryLessons, useUserProgress } from "@/hooks/useIeltsDB";
import { cn } from "@/lib/utils";

interface LessonViewerProps {
  lesson: TheoryLesson;
  nextLessonId?: string;
  prevLessonId?: string;
  className?: string;
}

type TabKey = "concept" | "trap" | "band8" | "quiz";

const TABS: Array<{ key: TabKey; label: string; shortLabel: string; icon: any; number: number }> = [
  { key: "concept", label: "1. Khái Niệm & Bản Chất", shortLabel: "Bản chất", icon: Lightbulb, number: 1 },
  { key: "trap", label: "2. Vạch Trần Bẫy Khảo Thí", shortLabel: "Vạch bẫy", icon: ShieldAlert, number: 2 },
  { key: "band8", label: "3. Mổ Xẻ Band 8.5+", shortLabel: "Band 8.5+", icon: Sparkles, number: 3 },
  { key: "quiz", label: "4. Quiz Kiểm Tra", shortLabel: "Quiz", icon: HelpCircle, number: 4 },
];

/**
 * Lightweight Markdown / Formatted Text Renderer
 */
function MarkdownBlock({ content }: { content: string }) {
  // Split into paragraphs / code blocks
  const sections = content.split("\n\n");

  return (
    <div className="space-y-4 text-xs sm:text-sm text-foreground/90 leading-relaxed">
      {sections.map((sec, idx) => {
        const trimmed = sec.trim();

        // Fenced code block
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          const codeLines = lines.slice(1, lines.length - 1).join("\n");
          return (
            <pre
              key={idx}
              className="p-4 rounded-2xl bg-secondary/80 border border-border overflow-x-auto text-xs font-mono leading-relaxed text-foreground shadow-sm"
            >
              <code>{codeLines}</code>
            </pre>
          );
        }

        // H3 Header
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={idx}
              className="text-base sm:text-lg font-extrabold text-foreground pt-3 border-b border-border/50 pb-2 flex items-center gap-2"
            >
              {trimmed.replace("### ", "")}
            </h3>
          );
        }

        // H4 Header
        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={idx} className="text-sm sm:text-base font-bold text-foreground pt-2">
              {trimmed.replace("#### ", "")}
            </h4>
          );
        }

        // Warning / Trap alert block
        if (trimmed.startsWith("⚠️")) {
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/[0.05] text-amber-900 dark:text-amber-300 space-y-1.5"
            >
              <div className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-amber-500" />
                <span>Lưu ý Bẫy Khảo Thí:</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                {trimmed.replace("⚠️", "").trim()}
              </p>
            </div>
          );
        }

        // Bullet points
        if (trimmed.startsWith("- ") || trimmed.startsWith("1. ") || trimmed.startsWith("2. ")) {
          const lines = trimmed.split("\n");
          return (
            <div key={idx} className="space-y-2 pl-2">
              {lines.map((line, lIdx) => (
                <div key={lIdx} className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{renderInlineFormatted(line.replace(/^[-*•]\s+|\d+\.\s+/, ""))}</span>
                </div>
              ))}
            </div>
          );
        }

        // Standard Paragraph
        return <p key={idx}>{renderInlineFormatted(trimmed)}</p>;
      })}
    </div>
  );
}

function renderInlineFormatted(text: string) {
  // Simple regex for bold **text** and inline `code`
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded-md bg-secondary font-mono text-xs text-indigo-600 dark:text-indigo-400 border border-border/80"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function LessonViewer({
  lesson,
  nextLessonId,
  prevLessonId,
  className,
}: LessonViewerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("concept");
  const [quizPassed, setQuizPassed] = useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);

  const { toggleLessonCompletion } = useTheoryLessons();
  const { completeLesson } = useUserProgress();

  const handleQuizComplete = async (score: number, total: number, passed: boolean) => {
    if (passed) {
      setQuizPassed(true);
    }
  };

  const handleFinishLesson = async () => {
    setIsMarkingComplete(true);
    try {
      await toggleLessonCompletion(lesson.id, true);
      await completeLesson(lesson.id);
      if (nextLessonId) {
        router.push(`/theory/${nextLessonId}`);
      } else {
        router.push("/theory");
      }
    } catch (err) {
      console.error("Failed to mark lesson complete:", err);
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const currentTabIndex = TABS.findIndex((t) => t.key === activeTab);

  const handleNextStep = () => {
    if (currentTabIndex < TABS.length - 1) {
      setActiveTab(TABS[currentTabIndex + 1].key);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentTabIndex > 0) {
      setActiveTab(TABS[currentTabIndex - 1].key);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* 4-Step Stepper Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-card p-2 rounded-2xl border border-border shadow-sm">
        {TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const isPassed = idx < currentTabIndex || lesson.isCompleted;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer",
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30 font-bold"
                  : "bg-secondary/20 text-muted-foreground border-transparent hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold shrink-0 transition-colors",
                  isActive
                    ? "bg-white/20 text-white"
                    : isPassed
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {isPassed && !isActive ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <span>0{tab.number}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold truncate leading-none">
                  {tab.shortLabel}
                </span>
                <span className="text-[10px] opacity-75 truncate mt-0.5 hidden sm:inline">
                  {idx === 0
                    ? "Khái niệm"
                    : idx === 1
                    ? "Phân tích bẫy"
                    : idx === 2
                    ? "Bài mẫu 8.5+"
                    : "Làm Quiz"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Area based on Active Tab */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        {/* Step 1: Core Concept */}
        {activeTab === "concept" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 border-b border-border/80 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Bước 1 / 4
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
                  Khái Niệm & Bản Chất Cốt Lõi
                </h2>
              </div>
            </div>

            <MarkdownBlock content={lesson.conceptMarkdown} />
          </div>
        )}

        {/* Step 2: Trap Detection */}
        {activeTab === "trap" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 border-b border-border/80 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Bước 2 / 4
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
                  Vạch Trần Bẫy Khảo Thí & Phân Tích Sai Lầm
                </h2>
              </div>
            </div>

            {/* Visual Trap Comparison Card */}
            <TrapComparisonCard
              trapMindset="Áp dụng máy móc quy tắc thông thường, dễ rơi vào bẫy chia thì lệch thời gian hoặc bỏ quên âm đuôi/ngữ cảnh bẫy."
              trapExample="The number of cars will increase in 2035."
              masterMindset="Sử dụng ngôn ngữ dự báo thận trọng (Hedging) hoặc phân biệt chính xác nguyên âm/thì theo chuẩn Band Descriptors."
              masterExample="The quantity of passenger vehicles is projected to witness an upward trajectory by 2035."
              expertTip="Giám khảo IELTS luôn chú trọng tính chính xác tuyệt đối của ngữ cảnh thời gian và độ tự nhiên trong văn phong học thuật."
            />

            <MarkdownBlock content={lesson.trapAnalysis} />
          </div>
        )}

        {/* Step 3: Band 8.5+ Deconstruction */}
        {activeTab === "band8" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 border-b border-border/80 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Bước 3 / 4
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
                  Mổ Xẻ Bài Mẫu & Kỹ Thuật Viết/Nói Band 8.5+
                </h2>
              </div>
            </div>

            <MarkdownBlock content={lesson.band8Sample} />
          </div>
        )}

        {/* Step 4: Quiz Engine */}
        {activeTab === "quiz" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 border-b border-border/80 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Bước 4 / 4
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
                  Kiểm Tra Độ Hiểu & Bóc Tách Bẫy Thực Tế
                </h2>
              </div>
            </div>

            <QuizEngine
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              lessonSkill={lesson.skill}
              questions={lesson.quiz}
              onQuizComplete={handleQuizComplete}
            />

            {/* Complete Lesson Action Banner */}
            {(quizPassed || lesson.isCompleted) && (
              <div className="mt-8 p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                <div className="flex items-center gap-3 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 shrink-0">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-foreground">
                      Bạn đã hoàn thành đủ 4 bước của bài học!
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Lưu tiến độ vào lộ trình và mở khóa bài học kế tiếp.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isMarkingComplete}
                  onClick={handleFinishLesson}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{lesson.isCompleted ? "Cập nhật & Qua bài tiếp" : "Hoàn thành Bài học"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-border/80">
          <button
            type="button"
            disabled={currentTabIndex === 0}
            onClick={handlePrevStep}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-border transition-colors",
              currentTabIndex === 0
                ? "opacity-40 cursor-not-allowed bg-secondary/30"
                : "bg-card hover:bg-secondary text-foreground"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Bước trước</span>
          </button>

          <span className="text-xs font-semibold text-muted-foreground">
            Bước {currentTabIndex + 1} / 4
          </span>

          {currentTabIndex < TABS.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all"
            >
              <span>Bước tiếp theo</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href="/theory"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-border bg-secondary/50 text-foreground hover:bg-secondary"
            >
              <BookOpen className="h-4 w-4" />
              <span>Về danh sách bài</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
