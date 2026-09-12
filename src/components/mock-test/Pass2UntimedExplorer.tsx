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
  SearchCode,
  BookOpen,
  Headphones,
  Search,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Send,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Pass2UntimedExplorerProps {
  examData: FullMockExamData;
  currentSkill: MockSkillType;
  activeQuestionNumber: number;
  onSelectQuestionNumber: (num: number) => void;
  pass1Answers: Record<string, string>;
  pass2Answers: Record<string, string>;
  onSetPass2Answer: (qId: string, answer: string) => void;
  onSubmitPass2: () => void;
  className?: string;
}

export function Pass2UntimedExplorer({
  examData,
  currentSkill,
  activeQuestionNumber,
  onSelectQuestionNumber,
  pass1Answers,
  pass2Answers,
  onSetPass2Answer,
  onSubmitPass2,
  className,
}: Pass2UntimedExplorerProps) {
  const [dictQuery, setDictQuery] = useState("");
  const [dictResult, setDictResult] = useState<{ word: string; meaningVi: string } | null>(null);

  const handleSearchDict = () => {
    if (!dictQuery.trim()) return;
    const found = examData.harvestableVocab.find(
      (v) => v.word.toLowerCase() === dictQuery.trim().toLowerCase()
    );
    if (found) {
      setDictResult({ word: found.word, meaningVi: found.meaningVi });
    } else {
      setDictResult({
        word: dictQuery,
        meaningVi: `(Từ vựng học thuật ngữ cảnh): Thuộc hệ thống thuật ngữ chuyên sâu ${currentSkill.toUpperCase()}.`,
      });
    }
  };

  const isListening = currentSkill === "listening";
  const partIndex = Math.floor((activeQuestionNumber - 1) / 10);
  const activePart: ListeningPartData = examData.listening.parts[partIndex] || examData.listening.parts[0];

  const passageIndex = activeQuestionNumber <= 13 ? 0 : activeQuestionNumber <= 26 ? 1 : 2;
  const activePassage: ReadingPassageData = examData.reading.passages[passageIndex] || examData.reading.passages[0];

  const activeQuestions: ExamQuestion[] = isListening ? activePart.questions : activePassage.questions;

  return (
    <div className={cn("space-y-5 select-none", className)}>
      {/* Top Banner Guide for Pass 2 */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
            <SearchCode className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-foreground">
              Pass 2: Đào Sâu Tự Lực Không Giới Hạn Thời Gian
            </h4>
            <span className="text-muted-foreground">
              Đọc lại kỹ lưỡng, tra cứu ngữ cảnh và tự sửa các câu chưa chắc chắn ở Pass 1 để cô lập lỗi do áp lực thời gian.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onSubmitPass2}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/25 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Hoàn Thành Pass 2 & Mổ Xẻ Pass 3</span>
        </button>
      </div>

      {/* Dictionary Search Bar */}
      <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 flex flex-col sm:flex-row sm:items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tra cứu nhanh nghĩa từ vựng ngữ cảnh (ví dụ: functionalism, intentionality, albedo...)"
            value={dictQuery}
            onChange={(e) => setDictQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchDict()}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
        <button
          type="button"
          onClick={handleSearchDict}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          Tra Cứu
        </button>

        {dictResult && (
          <div className="sm:max-w-xs px-3 py-1.5 rounded-xl bg-card border border-border text-xs flex items-center gap-1.5 font-medium">
            <span className="font-mono font-bold text-indigo-600">{dictResult.word}:</span>
            <span className="text-muted-foreground truncate">{dictResult.meaningVi}</span>
          </div>
        )}
      </div>

      {/* Main Comparison Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Passage or Audio (Cols 1-6) */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 max-h-[72vh] overflow-y-auto">
          {isListening ? (
            <div className="space-y-4">
              <AudioSinglePlayGuard
                currentPass="pass2"
                totalDurationSeconds={activePart.audioDurationSeconds}
                partNumber={activePart.partNumber}
                partTitle={activePart.title}
              />
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/70 space-y-2 text-xs">
                <span className="font-bold text-foreground font-mono">Bối cảnh Phần {activePart.partNumber}:</span>
                <p className="text-muted-foreground leading-relaxed">{activePart.contextVi}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 uppercase">
                  Passage {activePassage.passageNumber}
                </span>
                <h3 className="text-base font-extrabold text-foreground mt-1">{activePassage.title}</h3>
              </div>

              <div className="space-y-4 text-xs leading-relaxed font-serif text-foreground/90 pt-2 border-t border-border/80">
                {activePassage.paragraphs.map((para) => (
                  <div key={para.letter} className="relative pl-7 group">
                    <span className="absolute left-0 top-0 font-mono font-extrabold text-xs text-indigo-600">
                      [{para.letter}]
                    </span>
                    <p>{para.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Side-by-Side Pass 1 vs Pass 2 Inputs (Cols 7-12) */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 max-h-[72vh] overflow-y-auto">
          <h4 className="text-xs font-bold text-foreground border-b border-border/80 pb-2 flex items-center justify-between">
            <span>Đối Chiếu & Sửa Đổi Đáp Án</span>
            <span className="text-[10px] font-mono text-muted-foreground">Pass 1 ➔ Pass 2</span>
          </h4>

          <div className="space-y-4">
            {activeQuestions.map((q) => {
              const isActive = activeQuestionNumber === q.questionNumber;
              const ans1 = pass1Answers[q.id] || "(Chưa làm ở Pass 1)";
              const ans2 = pass2Answers[q.id] !== undefined ? pass2Answers[q.id] : pass1Answers[q.id] || "";
              const hasChanged = pass2Answers[q.id] && pass2Answers[q.id] !== pass1Answers[q.id];

              return (
                <div
                  key={q.id}
                  onClick={() => onSelectQuestionNumber(q.questionNumber)}
                  className={cn(
                    "p-4 rounded-xl border transition-all space-y-3 cursor-pointer",
                    isActive
                      ? "border-indigo-500/60 bg-indigo-500/[0.03] ring-1 ring-indigo-500/30 shadow-sm"
                      : "border-border/80 bg-secondary/20 hover:border-border"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-white font-mono text-xs font-bold shrink-0">
                        {q.questionNumber}
                      </span>
                      <p className="text-xs font-bold text-foreground leading-snug">{q.prompt}</p>
                    </div>

                    {hasChanged && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 shrink-0">
                        Đã đổi đáp án
                      </span>
                    )}
                  </div>

                  {/* Dual Answers Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {/* Pass 1 Snapshot */}
                    <div className="p-2.5 rounded-lg bg-secondary/50 border border-border text-xs space-y-1">
                      <span className="text-[10px] font-mono text-muted-foreground block font-bold">
                        ĐÁP ÁN PASS 1:
                      </span>
                      <span className="font-mono font-bold text-foreground">
                        {ans1}
                      </span>
                    </div>

                    {/* Pass 2 Editable Field */}
                    <div className="p-2.5 rounded-lg bg-indigo-500/[0.04] border border-indigo-500/30 text-xs space-y-1">
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 block font-bold">
                        ĐÁP ÁN PASS 2 (SỬA LẠI):
                      </span>
                      <input
                        type="text"
                        value={ans2}
                        onChange={(e) => onSetPass2Answer(q.id, e.target.value)}
                        placeholder="Nhập đáp án Pass 2..."
                        className="w-full px-2.5 py-1 rounded-md border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
