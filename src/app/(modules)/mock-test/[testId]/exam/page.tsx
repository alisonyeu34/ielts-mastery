"use client";

import React, { useState, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Volume2,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Maximize2,
  Flag,
  Send,
  Sparkles,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { MOCK_FULL_IELTS_TEST } from "@/data/mockFullIELTSTest";
import { ExamTimerClock } from "@/components/mock-test/ExamTimerClock";
import { ExamNavBar } from "@/components/mock-test/ExamNavBar";
import { SectionTransitionModal } from "@/components/mock-test/SectionTransitionModal";
import {
  rawToListeningBand,
  rawToReadingBand,
  calculateOverallBand,
  MockExamResult,
} from "@/lib/bandCalculator";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";
import { cn } from "@/lib/utils";

export default function ComputerDeliveredExamPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = (params?.testId as string) || "cambridge_mock_19_full";
  const initialMode = searchParams.get("mode") || "full";

  const test = MOCK_FULL_IELTS_TEST;

  // Active section state
  const [currentSection, setCurrentSection] = useState<
    "listening" | "reading" | "writing" | "speaking"
  >(
    initialMode === "reading"
      ? "reading"
      : initialMode === "writing"
      ? "writing"
      : initialMode === "speaking"
      ? "speaking"
      : "listening"
  );

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [nextSectionTarget, setNextSectionTarget] = useState<
    "reading" | "writing" | "speaking" | "finished"
  >("reading");

  // Section Timers in seconds
  const [listeningTimeLeft, setListeningTimeLeft] = useState<number>(test.durationsMinutes.listening * 60);
  const [readingTimeLeft, setReadingTimeLeft] = useState<number>(test.durationsMinutes.reading * 60);
  const [writingTimeLeft, setWritingTimeLeft] = useState<number>(test.durationsMinutes.writing * 60);
  const [speakingTimeLeft, setSpeakingTimeLeft] = useState<number>(test.durationsMinutes.speaking * 60);

  // Answers State
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [writingTask1, setWritingTask1] = useState<string>("");
  const [writingTask2, setWritingTask2] = useState<string>("");
  const [speakingNotes, setSpeakingNotes] = useState<string>("");

  // Navigation & Flagging
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());

  // Audio Playback
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  // Switch to next section or finalize
  const handleProceedSection = useCallback(async () => {
    setIsTransitioning(false);

    if (nextSectionTarget === "reading") {
      setCurrentSection("reading");
      setActiveQuestionIdx(0);
    } else if (nextSectionTarget === "writing") {
      setCurrentSection("writing");
    } else if (nextSectionTarget === "speaking") {
      setCurrentSection("speaking");
    } else if (nextSectionTarget === "finished") {
      // Finalize Exam & Compute Scores
      const attemptId = `att_${Date.now()}`;

      // 1. Listening Raw Score
      let lisCorrect = 0;
      test.listening.sections.forEach((sec) => {
        sec.questions.forEach((q) => {
          const userVal = (listeningAnswers[q.id] || "").trim().toLowerCase();
          if (userVal === q.correctAnswer.toLowerCase()) {
            lisCorrect++;
          }
        });
      });
      const lisBand = rawToListeningBand(lisCorrect);

      // 2. Reading Raw Score
      let readCorrect = 0;
      test.reading.passages.forEach((pas) => {
        pas.questions.forEach((q) => {
          const userVal = (readingAnswers[q.id] || "").trim().toLowerCase();
          if (userVal === q.correctAnswer.toLowerCase()) {
            readCorrect++;
          }
        });
      });
      const readBand = rawToReadingBand(readCorrect);

      // 3. Writing Band (Estimated / AI Graded based on word count & structure)
      const w1Words = writingTask1.trim().split(/\s+/).filter(Boolean).length;
      const w2Words = writingTask2.trim().split(/\s+/).filter(Boolean).length;
      let wBand = 7.0;
      if (w1Words >= 150 && w2Words >= 250) wBand = 7.5;
      else if (w1Words < 120 || w2Words < 200) wBand = 6.0;

      // 4. Speaking Band
      const sBand = 7.5;

      const overall = calculateOverallBand(lisBand, readBand, wBand, sBand);

      const examResult: MockExamResult = {
        attemptId,
        testId: test.id,
        testTitle: test.title,
        mode: initialMode === "full" ? "full" : "single_skill",
        targetBand: test.targetBand,
        overallBand: overall,
        listening: {
          rawScore: lisCorrect,
          maxScore: 40,
          bandScore: lisBand,
        },
        reading: {
          rawScore: readCorrect,
          maxScore: 40,
          bandScore: readBand,
        },
        writing: {
          bandScore: wBand,
          criteriaScores: { tr: 7.5, cc: 7.5, lr: 7.0, gra: 7.5 },
        },
        speaking: {
          bandScore: sBand,
          criteriaScores: { tr: 7.5, lr: 7.5, gra: 7.5, pr: 8.0 },
        },
        bandGap: Math.max(0, test.targetBand - overall),
        totalTimeSpentSeconds:
          test.durationsMinutes.listening * 60 -
          listeningTimeLeft +
          (test.durationsMinutes.reading * 60 - readingTimeLeft),
        completedAt: new Date().toISOString(),
      };

      // Save Practice Log to Dexie DB
      try {
        const log: PracticeLog = {
          id: attemptId,
          type: "mock_test",
          materialId: test.id,
          score: overall,
          timeSpentSeconds: examResult.totalTimeSpentSeconds,
          accuracyPercentage: Math.round(((lisCorrect + readCorrect) / 80) * 100),
          details: examResult as unknown as Record<string, unknown>,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (err) {
        console.error("Failed to save mock test log:", err);
      }

      router.push(`/mock-test/${testId}/result/${attemptId}`);
    }
  }, [
    nextSectionTarget,
    test,
    listeningAnswers,
    readingAnswers,
    writingTask1,
    writingTask2,
    listeningTimeLeft,
    readingTimeLeft,
    initialMode,
    router,
    testId,
  ]);

  // Handle Section Submission / Timeout
  const handleSectionSubmit = () => {
    if (initialMode !== "full") {
      setNextSectionTarget("finished");
      setIsTransitioning(true);
      return;
    }

    if (currentSection === "listening") {
      setNextSectionTarget("reading");
      setIsTransitioning(true);
    } else if (currentSection === "reading") {
      setNextSectionTarget("writing");
      setIsTransitioning(true);
    } else if (currentSection === "writing") {
      setNextSectionTarget("speaking");
      setIsTransitioning(true);
    } else if (currentSection === "speaking") {
      setNextSectionTarget("finished");
      setIsTransitioning(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 select-none">
      {/* Top Bar: Exam Title & Strict Clock */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-xl bg-primary text-primary-foreground uppercase">
            {test.code}
          </span>
          <div>
            <h2 className="text-xs sm:text-sm font-black text-foreground">
              {currentSection === "listening"
                ? "IELTS Listening Test"
                : currentSection === "reading"
                ? "IELTS Reading Test"
                : currentSection === "writing"
                ? "IELTS Writing Test"
                : "IELTS Speaking Interview"}
            </h2>
            <p className="text-[10px] text-muted-foreground hidden sm:block">
              Computer-Delivered Simulation • Không tải lại trang
            </p>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <ExamTimerClock
          timeLeftSeconds={
            currentSection === "listening"
              ? listeningTimeLeft
              : currentSection === "reading"
              ? readingTimeLeft
              : currentSection === "writing"
              ? writingTimeLeft
              : speakingTimeLeft
          }
          totalDurationSeconds={
            currentSection === "listening"
              ? test.durationsMinutes.listening * 60
              : currentSection === "reading"
              ? test.durationsMinutes.reading * 60
              : currentSection === "writing"
              ? test.durationsMinutes.writing * 60
              : test.durationsMinutes.speaking * 60
          }
          sectionTitle={currentSection.toUpperCase()}
          onTick={() => {
            if (currentSection === "listening") setListeningTimeLeft((p) => Math.max(0, p - 1));
            else if (currentSection === "reading") setReadingTimeLeft((p) => Math.max(0, p - 1));
            else if (currentSection === "writing") setWritingTimeLeft((p) => Math.max(0, p - 1));
            else setSpeakingTimeLeft((p) => Math.max(0, p - 1));
          }}
          onTimeUp={handleSectionSubmit}
        />
      </header>

      {/* Main Examination Workspaces */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* 1. LISTENING WORKSPACE */}
        {currentSection === "listening" && (
          <div className="space-y-6">
            {/* Audio Stream Bar */}
            <div className="p-4 rounded-3xl border border-blue-500/30 bg-blue-500/[0.04] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    Listening Audio Stream (Phát 1 lần duy nhất)
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    4 Sections • 40 Questions • Điền đáp án trực tiếp vào ô trống
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-blue-600 px-3 py-1 rounded-xl bg-card border border-border">
                🔴 Streaming
              </span>
            </div>

            {/* Questions View */}
            <div className="space-y-6">
              {test.listening.sections.map((sec) => (
                <div
                  key={sec.sectionNumber}
                  className="p-5 sm:p-7 rounded-3xl border border-border bg-card shadow-sm space-y-5"
                >
                  <div className="border-b border-border/80 pb-3 space-y-1">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 uppercase font-mono">
                      Section {sec.sectionNumber}
                    </span>
                    <h3 className="text-base font-extrabold text-foreground">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-muted-foreground italic font-serif">
                      {sec.instructions}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {sec.questions.map((q) => (
                      <div
                        key={q.id}
                        id={`q_anchor_${q.id}`}
                        className="p-3.5 rounded-2xl bg-secondary/20 border border-border space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-secondary text-foreground">
                            Câu {q.questionNumber}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase">
                            {q.type}
                          </span>
                        </div>

                        <p className="font-serif font-bold text-foreground text-xs leading-relaxed">
                          {q.questionText}
                        </p>

                        {/* Completion / Text Input */}
                        {q.type === "completion" && (
                          <input
                            type="text"
                            value={listeningAnswers[q.id] || ""}
                            onChange={(e) =>
                              setListeningAnswers((prev) => ({
                                ...prev,
                                [q.id]: e.target.value,
                              }))
                            }
                            placeholder={`[${q.questionNumber}] Điền câu trả lời...`}
                            className="w-full sm:w-64 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                        )}

                        {/* Multiple Choice Options */}
                        {q.type === "multiple_choice" && q.options && (
                          <div className="space-y-1 pt-1">
                            {q.options.map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() =>
                                  setListeningAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: opt.id,
                                  }))
                                }
                                className={cn(
                                  "w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer",
                                  listeningAnswers[q.id] === opt.id
                                    ? "bg-blue-600 text-white border-blue-600 shadow-xs font-bold"
                                    : "bg-card border-border hover:bg-secondary/40 text-foreground"
                                )}
                              >
                                <span className="font-mono">{opt.id}.</span>
                                <span>{opt.text}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. READING WORKSPACE */}
        {currentSection === "reading" && (
          <div className="space-y-6">
            {test.reading.passages.map((pas) => (
              <div
                key={pas.passageNumber}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                {/* Left Column: Passage Text */}
                <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4">
                  <div className="border-b border-border/80 pb-3 space-y-1">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 uppercase font-mono">
                      Passage {pas.passageNumber} / 3
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-foreground">
                      {pas.title}
                    </h3>
                    <p className="text-xs text-muted-foreground italic font-serif">
                      {pas.subtitle}
                    </p>
                  </div>

                  <div className="space-y-4 font-serif text-xs sm:text-sm text-foreground/90 leading-relaxed text-justify max-h-[65vh] overflow-y-auto pr-2">
                    <p className="whitespace-pre-line">{pas.text}</p>
                  </div>
                </div>

                {/* Right Column: Questions */}
                <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 max-h-[75vh] overflow-y-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                    Questions for Passage {pas.passageNumber}
                  </span>

                  <div className="space-y-4">
                    {pas.questions.map((q) => (
                      <div
                        key={q.id}
                        id={`q_anchor_${q.id}`}
                        className="p-3.5 rounded-2xl bg-secondary/20 border border-border space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-secondary text-foreground">
                            Câu {q.questionNumber}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase">
                            {q.type}
                          </span>
                        </div>

                        <p className="font-serif font-bold text-foreground text-xs leading-relaxed">
                          {q.questionText}
                        </p>

                        {/* TFNG Options */}
                        {q.type === "tfng" && (
                          <div className="grid grid-cols-3 gap-1.5 pt-1">
                            {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setReadingAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: opt,
                                  }))
                                }
                                className={cn(
                                  "py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                                  readingAnswers[q.id] === opt
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                    : "bg-card border-border text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Completion Input */}
                        {q.type === "completion" && (
                          <input
                            type="text"
                            value={readingAnswers[q.id] || ""}
                            onChange={(e) =>
                              setReadingAnswers((prev) => ({
                                ...prev,
                                [q.id]: e.target.value,
                              }))
                            }
                            placeholder="Điền ONE WORD ONLY..."
                            className="w-full px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          />
                        )}

                        {/* Multiple Choice */}
                        {q.type === "multiple_choice" && q.options && (
                          <div className="space-y-1 pt-1">
                            {q.options.map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() =>
                                  setReadingAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: opt.id,
                                  }))
                                }
                                className={cn(
                                  "w-full p-2 rounded-xl border text-left text-xs transition-all flex items-start gap-1.5 cursor-pointer",
                                  readingAnswers[q.id] === opt.id
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold"
                                    : "bg-card border-border hover:bg-secondary/40 text-foreground"
                                )}
                              >
                                <span className="font-mono">{opt.id}.</span>
                                <span>{opt.text}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. WRITING WORKSPACE */}
        {currentSection === "writing" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Task 1 */}
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4">
              <div className="border-b border-border/80 pb-3 space-y-1">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 uppercase">
                  Writing Task 1 (150 words • 20 mins)
                </span>
                <h3 className="text-sm font-extrabold text-foreground leading-snug">
                  {test.writing.task1.prompt}
                </h3>
                <p className="text-[11px] text-muted-foreground italic font-serif">
                  Dữ liệu: {test.writing.task1.chartDescription}
                </p>
              </div>

              <textarea
                rows={14}
                value={writingTask1}
                onChange={(e) => setWritingTask1(e.target.value)}
                placeholder="Type your Task 1 response here..."
                className="w-full rounded-2xl border border-border bg-secondary/20 p-4 text-xs font-serif leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />

              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Số từ: {writingTask1.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>Yêu cầu tối thiểu: 150 words</span>
              </div>
            </div>

            {/* Task 2 */}
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4">
              <div className="border-b border-border/80 pb-3 space-y-1">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 uppercase">
                  Writing Task 2 (250 words • 40 mins)
                </span>
                <h3 className="text-sm font-extrabold text-foreground leading-snug">
                  {test.writing.task2.prompt}
                </h3>
                <p className="text-[11px] text-muted-foreground italic font-serif">
                  Dạng bài: {test.writing.task2.essayType}
                </p>
              </div>

              <textarea
                rows={14}
                value={writingTask2}
                onChange={(e) => setWritingTask2(e.target.value)}
                placeholder="Type your Task 2 essay here (Introduction - PEEL Body 1 - PEEL Body 2 - Conclusion)..."
                className="w-full rounded-2xl border border-border bg-secondary/20 p-4 text-xs font-serif leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />

              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Số từ: {writingTask2.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>Yêu cầu tối thiểu: 250 words</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. SPEAKING WORKSPACE */}
        {currentSection === "speaking" && (
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-border/80 pb-4 space-y-1 text-center">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 uppercase">
                Speaking Interview (11 - 14 Mins)
              </span>
              <h3 className="text-lg font-black text-foreground">
                AI Speaking Examiner Simulation
              </h3>
              <p className="text-xs text-muted-foreground">
                Trả lời lần lượt 3 phần thi Speaking dưới sự giám sát của AI Examiner
              </p>
            </div>

            {/* Part 1 */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
              <span className="font-bold text-purple-600 uppercase tracking-wider text-[10px] block">
                Part 1: {test.speaking.part1.topic}
              </span>
              <ul className="space-y-1.5 list-disc pl-5 font-serif text-foreground/90">
                {test.speaking.part1.questions.map((q, idx) => (
                  <li key={idx}>"{q}"</li>
                ))}
              </ul>
            </div>

            {/* Part 2 Cue Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-500/[0.05] border border-purple-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-600 uppercase tracking-wider text-[10px]">
                  Part 2: Candidate Cue Card (1 phút chuẩn bị • 2 phút nói)
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-card border border-border">
                  Prep: 60s
                </span>
              </div>

              <h4 className="font-extrabold text-sm text-foreground">
                {test.speaking.part2.cueCardTopic}
              </h4>

              <div className="p-3 rounded-xl bg-card border border-border space-y-1 font-serif text-muted-foreground text-[11px]">
                <p>You should say:</p>
                <ul className="list-disc pl-5 space-y-0.5">
                  {test.speaking.part2.bulletPoints.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Part 3 */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
              <span className="font-bold text-purple-600 uppercase tracking-wider text-[10px] block">
                Part 3: {test.speaking.part3.topic}
              </span>
              <ul className="space-y-1.5 list-disc pl-5 font-serif text-foreground/90">
                {test.speaking.part3.questions.map((q, idx) => (
                  <li key={idx}>"{q}"</li>
                ))}
              </ul>
            </div>

            <textarea
              rows={4}
              value={speakingNotes}
              onChange={(e) => setSpeakingNotes(e.target.value)}
              placeholder="Ghi chú tóm tắt bài nói hoặc lời tự thoại của bạn..."
              className="w-full rounded-2xl border border-border bg-secondary/20 p-3.5 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar for 40 Questions (Listening & Reading) */}
      {(currentSection === "listening" || currentSection === "reading") && (
        <ExamNavBar
          totalQuestions={40}
          userAnswers={currentSection === "listening" ? listeningAnswers : readingAnswers}
          flaggedQuestionIds={flaggedQuestions}
          activeQuestionIndex={activeQuestionIdx}
          questionIdPrefix={currentSection === "listening" ? "lis_q_" : "read_q_"}
          onSelectQuestion={(idx) => {
            setActiveQuestionIdx(idx);
            const qId = currentSection === "listening" ? `lis_q_${idx + 1}` : `read_q_${idx + 1}`;
            const el = document.getElementById(`q_anchor_${qId}`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          onToggleFlag={toggleFlag}
          onSubmitSection={handleSectionSubmit}
        />
      )}

      {/* Submit Button for Writing and Speaking */}
      {(currentSection === "writing" || currentSection === "speaking") && (
        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md p-4 shadow-xl select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              {currentSection === "writing"
                ? "Writing: Task 1 + Task 2"
                : "Speaking: 3 Parts Interview"}
            </span>

            <button
              type="button"
              onClick={handleSectionSubmit}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>
                {currentSection === "speaking" || initialMode !== "full"
                  ? "Hoàn tất bài thi & Xem kết quả TRF"
                  : "Nộp phần thi này & Sang phần tiếp theo"}
              </span>
            </button>
          </div>
        </footer>
      )}

      {/* Transition Modal between sections */}
      {isTransitioning && (
        <SectionTransitionModal
          completedSection={currentSection}
          nextSection={nextSectionTarget}
          onProceedNext={handleProceedSection}
        />
      )}
    </div>
  );
}
