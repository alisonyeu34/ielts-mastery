"use client";

import React, { useState } from "react";
import {
  FullMockExamData,
  ExamQuestion,
  ListeningPartData,
  ReadingPassageData,
} from "@/data/mockFullExamData";
import { MockSkillType } from "@/hooks/useCDIELTSMockSession";
import { AudioSinglePlayGuard } from "@/components/mock-test/AudioSinglePlayGuard";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  CheckCircle2,
  HelpCircle,
  FileText,
  Volume2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Pass1TimedRunnerProps {
  examData: FullMockExamData;
  currentSkill: MockSkillType;
  activeQuestionNumber: number;
  onSelectQuestionNumber: (num: number) => void;
  userAnswers: Record<string, string>;
  onSetAnswer: (qId: string, answer: string) => void;
  writingSubmissions: { task1: string; task2: string };
  onSetWriting: (task: "task1" | "task2", text: string) => void;
  speakingSubmissions: Record<string, string>;
  onSetSpeaking: (id: string, text: string) => void;
  className?: string;
}

export function Pass1TimedRunner({
  examData,
  currentSkill,
  activeQuestionNumber,
  onSelectQuestionNumber,
  userAnswers,
  onSetAnswer,
  writingSubmissions,
  onSetWriting,
  speakingSubmissions,
  onSetSpeaking,
  className,
}: Pass1TimedRunnerProps) {
  // 1. LISTENING VIEW
  if (currentSkill === "listening") {
    // Find active part based on question number (1-10: P1, 11-20: P2, 21-30: P3, 31-40: P4)
    const partIndex = Math.floor((activeQuestionNumber - 1) / 10);
    const activePart: ListeningPartData = examData.listening.parts[partIndex] || examData.listening.parts[0];

    return (
      <div className={cn("space-y-4", className)}>
        {/* Audio Single Play Guard */}
        <AudioSinglePlayGuard
          currentPass="pass1"
          totalDurationSeconds={activePart.audioDurationSeconds}
          partNumber={activePart.partNumber}
          partTitle={activePart.title}
        />

        {/* Questions Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Context / Instructions (Cols 1-5) */}
          <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase">
              Bối cảnh Phần {activePart.partNumber}
            </span>
            <h3 className="text-sm font-extrabold text-foreground">{activePart.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              {activePart.contextVi}
            </p>

            <div className="p-3 rounded-xl bg-secondary/40 border border-border/80 text-[11px] text-muted-foreground leading-relaxed">
              💡 <strong>Hướng dẫn thi Listening:</strong> Điền chính xác từ nghe được vào chỗ trống hoặc chọn 1 đáp án A/B/C. Không dùng quá số từ quy định (NO MORE THAN TWO WORDS AND/OR A NUMBER).
            </div>
          </div>

          {/* Right Question Input List (Cols 6-12) */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-foreground border-b border-border/80 pb-2">
              Danh Sách Câu Hỏi (Phần {activePart.partNumber}: Câu {activePart.questions[0]?.questionNumber} - {activePart.questions[activePart.questions.length - 1]?.questionNumber})
            </h4>

            <div className="space-y-3.5">
              {activePart.questions.map((q) => {
                const isActive = activeQuestionNumber === q.questionNumber;
                const currentVal = userAnswers[q.id] || "";

                return (
                  <div
                    key={q.id}
                    onClick={() => onSelectQuestionNumber(q.questionNumber)}
                    className={cn(
                      "p-3.5 rounded-xl border transition-all space-y-2 cursor-pointer",
                      isActive
                        ? "border-red-500/60 bg-red-500/[0.03] ring-1 ring-red-500/30 shadow-sm"
                        : "border-border/80 bg-secondary/20 hover:border-border"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-white font-mono text-xs font-bold shrink-0">
                        {q.questionNumber}
                      </span>
                      <p className="text-xs font-bold text-foreground leading-snug">{q.prompt}</p>
                    </div>

                    {q.type === "multiple_choice" && q.options ? (
                      <div className="space-y-1.5 pl-8">
                        {q.options.map((opt, oIdx) => {
                          const optLetter = opt.charAt(0);
                          const isSelected = currentVal === optLetter;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSetAnswer(q.id, optLetter);
                              }}
                              className={cn(
                                "w-full text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-2 cursor-pointer",
                                isSelected
                                  ? "bg-red-600 text-white border-red-600 shadow-sm"
                                  : "bg-card border-border hover:bg-secondary text-foreground"
                              )}
                            >
                              <span className="font-mono font-bold">{optLetter}.</span>
                              <span>{opt.substring(3)}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="pl-8 pt-1">
                        <input
                          type="text"
                          value={currentVal}
                          onChange={(e) => onSetAnswer(q.id, e.target.value)}
                          placeholder={`Nhập đáp án câu ${q.questionNumber}...`}
                          className="w-full max-w-sm px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 font-mono"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. READING VIEW
  if (currentSkill === "reading") {
    // Find active passage (1-13: P1, 14-26: P2, 27-40: P3)
    const passageIndex = activeQuestionNumber <= 13 ? 0 : activeQuestionNumber <= 26 ? 1 : 2;
    const activePassage: ReadingPassageData = examData.reading.passages[passageIndex] || examData.reading.passages[0];

    return (
      <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-5 items-start select-none", className)}>
        {/* Left Column: Reading Passage Text (Cols 1-6) */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 max-h-[72vh] overflow-y-auto">
          <div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 uppercase">
              Academic Reading • Passage {activePassage.passageNumber}
            </span>
            <h3 className="text-base font-extrabold text-foreground mt-1">{activePassage.title}</h3>
            <span className="text-xs text-muted-foreground">Chủ đề: {activePassage.topicDomainVi}</span>
          </div>

          <div className="space-y-4 text-xs leading-relaxed font-serif text-foreground/90 pt-2 border-t border-border/80">
            {activePassage.paragraphs.map((para) => (
              <div key={para.letter} className="relative pl-7 group">
                <span className="absolute left-0 top-0 font-mono font-extrabold text-xs text-red-600 dark:text-red-400">
                  [{para.letter}]
                </span>
                <p>{para.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Questions Panel (Cols 7-12) */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 max-h-[72vh] overflow-y-auto">
          <h4 className="text-xs font-bold text-foreground border-b border-border/80 pb-2">
            Câu Hỏi Đoạn {activePassage.passageNumber} (Câu {activePassage.questions[0]?.questionNumber} - {activePassage.questions[activePassage.questions.length - 1]?.questionNumber})
          </h4>

          <div className="space-y-4">
            {activePassage.questions.map((q) => {
              const isActive = activeQuestionNumber === q.questionNumber;
              const currentVal = userAnswers[q.id] || "";

              return (
                <div
                  key={q.id}
                  onClick={() => onSelectQuestionNumber(q.questionNumber)}
                  className={cn(
                    "p-3.5 rounded-xl border transition-all space-y-2.5 cursor-pointer",
                    isActive
                      ? "border-red-500/60 bg-red-500/[0.03] ring-1 ring-red-500/30 shadow-sm"
                      : "border-border/80 bg-secondary/20 hover:border-border"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-white font-mono text-xs font-bold shrink-0">
                      {q.questionNumber}
                    </span>
                    <p className="text-xs font-bold text-foreground leading-snug">{q.prompt}</p>
                  </div>

                  {/* TFNG or Yes/No/NG Buttons */}
                  {q.type === "tfng" || q.type === "yes_no_not_given" ? (
                    <div className="flex flex-wrap gap-2 pl-8">
                      {(q.type === "tfng" ? ["TRUE", "FALSE", "NOT GIVEN"] : ["YES", "NO", "NOT GIVEN"]).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSetAnswer(q.id, opt);
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                            currentVal === opt
                              ? "bg-red-600 text-white border-red-600 shadow-sm"
                              : "bg-card border-border hover:bg-secondary text-foreground"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : q.type === "summary_box" && q.boxOptions ? (
                    <div className="space-y-1.5 pl-8">
                      <div className="flex flex-wrap gap-1.5">
                        {q.boxOptions.map((b) => (
                          <button
                            key={b.code}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSetAnswer(q.id, b.code);
                            }}
                            className={cn(
                              "px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer",
                              currentVal === b.code
                                ? "bg-red-600 text-white border-red-600 shadow-sm"
                                : "bg-card border-border hover:bg-secondary text-foreground"
                            )}
                          >
                            <span className="font-mono font-bold">{b.code}.</span>
                            <span>{b.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : q.type === "multiple_choice" && q.options ? (
                    <div className="space-y-1.5 pl-8">
                      {q.options.map((opt, oIdx) => {
                        const optLetter = opt.charAt(0);
                        const isSelected = currentVal === optLetter;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSetAnswer(q.id, optLetter);
                            }}
                            className={cn(
                              "w-full text-left p-2 rounded-lg border text-xs font-medium transition-all flex items-center gap-2 cursor-pointer",
                              isSelected
                                ? "bg-red-600 text-white border-red-600 shadow-sm"
                              : "bg-card border-border hover:bg-secondary text-foreground"
                            )}
                          >
                            <span className="font-mono font-bold">{optLetter}.</span>
                            <span>{opt.substring(3)}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="pl-8 pt-1">
                      <input
                        type="text"
                        value={currentVal}
                        onChange={(e) => onSetAnswer(q.id, e.target.value)}
                        placeholder={`Nhập đáp án câu ${q.questionNumber}...`}
                        className="w-full max-w-sm px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 font-mono"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. WRITING VIEW
  if (currentSkill === "writing") {
    const wordCountT1 = writingSubmissions.task1.trim().split(/\s+/).filter(Boolean).length;
    const wordCountT2 = writingSubmissions.task2.trim().split(/\s+/).filter(Boolean).length;

    return (
      <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-5 items-start", className)}>
        {/* Task 1 Box */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-border/80 pb-2">
            <span className="text-xs font-extrabold text-foreground font-mono">
              Writing Task 1 (Min 150 words)
            </span>
            <span
              className={cn(
                "text-xs font-mono font-bold px-2 py-0.5 rounded",
                wordCountT1 >= 150 ? "bg-emerald-500/10 text-emerald-600" : "bg-secondary text-muted-foreground"
              )}
            >
              {wordCountT1} / 150 từ
            </span>
          </div>

          <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 text-xs space-y-1">
            <p className="font-bold text-foreground">{examData.writing.task1.prompt}</p>
          </div>

          <textarea
            value={writingSubmissions.task1}
            onChange={(e) => onSetWriting("task1", e.target.value)}
            placeholder="Type your Task 1 response here..."
            rows={12}
            className="w-full p-3.5 rounded-xl border border-border bg-secondary/20 text-xs text-foreground font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
          />
        </div>

        {/* Task 2 Box */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-border/80 pb-2">
            <span className="text-xs font-extrabold text-foreground font-mono">
              Writing Task 2 (Min 250 words)
            </span>
            <span
              className={cn(
                "text-xs font-mono font-bold px-2 py-0.5 rounded",
                wordCountT2 >= 250 ? "bg-emerald-500/10 text-emerald-600" : "bg-secondary text-muted-foreground"
              )}
            >
              {wordCountT2} / 250 từ
            </span>
          </div>

          <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 text-xs space-y-1">
            <p className="font-bold text-foreground">{examData.writing.task2.prompt}</p>
          </div>

          <textarea
            value={writingSubmissions.task2}
            onChange={(e) => onSetWriting("task2", e.target.value)}
            placeholder="Type your Task 2 essay here..."
            rows={12}
            className="w-full p-3.5 rounded-xl border border-border bg-secondary/20 text-xs text-foreground font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
          />
        </div>
      </div>
    );
  }

  // 4. SPEAKING VIEW
  return (
    <div className={cn("max-w-4xl mx-auto rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", className)}>
      <div className="border-b border-border/80 pb-3">
        <span className="text-xs font-mono font-bold text-red-600 uppercase">Speaking Simulation Room</span>
        <h3 className="text-base font-extrabold text-foreground mt-1">
          IELTS Speaking Full 3-Part Examination
        </h3>
      </div>

      {/* Part 1 */}
      <div className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border/70 text-xs">
        <h4 className="font-extrabold text-foreground font-mono">Part 1: Introduction & Daily Life</h4>
        <div className="space-y-2">
          {examData.speaking.part1.map((p1) => (
            <div key={p1.id} className="p-2.5 rounded-lg bg-card border border-border/60 space-y-1.5">
              <p className="font-bold text-foreground">Q: {p1.question}</p>
              <textarea
                value={speakingSubmissions[p1.id] || ""}
                onChange={(e) => onSetSpeaking(p1.id, e.target.value)}
                placeholder="Ghi chú ý tưởng hoặc bản thảo câu trả lời..."
                rows={2}
                className="w-full p-2 rounded-lg border border-border bg-secondary/20 text-xs text-foreground focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Part 2 */}
      <div className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border/70 text-xs">
        <h4 className="font-extrabold text-foreground font-mono">Part 2: Individual Long Turn (Cue Card)</h4>
        <div className="p-3.5 rounded-lg bg-card border border-border/60 space-y-2">
          <p className="font-extrabold text-foreground">{examData.speaking.part2.cueCardTopic}</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {examData.speaking.part2.bulletPoints.map((bp, bIdx) => (
              <li key={bIdx}>{bp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Part 3 */}
      <div className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border/70 text-xs">
        <h4 className="font-extrabold text-foreground font-mono">Part 3: Two-Way Academic Discussion</h4>
        {examData.speaking.part3.map((p3) => (
          <div key={p3.id} className="p-2.5 rounded-lg bg-card border border-border/60 space-y-1.5">
            <p className="font-bold text-foreground">Q: {p3.question}</p>
            <textarea
              value={speakingSubmissions[p3.id] || ""}
              onChange={(e) => onSetSpeaking(p3.id, e.target.value)}
              placeholder="Ghi chú luận điểm mở rộng..."
              rows={2}
              className="w-full p-2 rounded-lg border border-border bg-secondary/20 text-xs text-foreground focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
