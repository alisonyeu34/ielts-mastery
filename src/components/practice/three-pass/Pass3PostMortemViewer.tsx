"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  ThreePassTestData,
  ThreePassQuestion,
} from "@/data/mockThreePassTest";
import { QuestionDiagnosisType } from "@/hooks/useThreePassSession";
import { cn } from "@/lib/utils";

interface Pass3PostMortemViewerProps {
  testData: ThreePassTestData;
  pass1Answers: Record<string, string>;
  pass2Answers: Record<string, string>;
  questionDiagnoses: Record<string, QuestionDiagnosisType>;
  className?: string;
}

export function Pass3PostMortemViewer({
  testData,
  pass1Answers,
  pass2Answers,
  questionDiagnoses,
  className,
}: Pass3PostMortemViewerProps) {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    testData.questions[0].id
  );

  const toggleExpand = (id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("space-y-6 select-none", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Passage with Highlighted Evidences */}
        <div className="lg:col-span-6 rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-border/80 pb-3 space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Passage Evidence Map (Pass 3)
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-foreground leading-snug">
              {testData.title}
            </h3>
            <p className="text-xs text-muted-foreground italic font-serif">
              Đối soát dẫn chứng & giải mã bẫy Paraphrase
            </p>
          </div>

          <div className="space-y-5 font-serif text-xs sm:text-sm text-foreground/90 leading-relaxed text-justify">
            {testData.paragraphs.map((p) => {
              // Find questions referring to this paragraph
              const relatedQuestions = testData.questions.filter(
                (q) => q.evidenceParagraph.toLowerCase() === p.label.toLowerCase()
              );

              return (
                <div key={p.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-[11px] text-emerald-600 dark:text-emerald-400 bg-secondary/80 px-2 py-0.5 rounded inline-block font-mono">
                      {p.label}
                    </span>

                    {relatedQuestions.length > 0 && (
                      <span className="text-[10px] font-mono text-muted-foreground">
                        Chứa dẫn chứng: {relatedQuestions.map((q) => `Q${q.questionNumber}`).join(", ")}
                      </span>
                    )}
                  </div>

                  <p className="p-3 rounded-2xl bg-secondary/20 border border-border/60">
                    {p.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 4-Column Comparison & Detailed Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Detailed Question Decomposition
            </span>
            <h3 className="text-base font-extrabold text-foreground">
              Giải Phẫu 10 Câu Hỏi & Bẫy Khảo Thí
            </h3>
          </div>

          <div className="space-y-3.5">
            {testData.questions.map((q) => {
              const p1Ans = pass1Answers[q.id] || "(Trống)";
              const p2Ans = pass2Answers[q.id] || "(Trống)";
              const diag = questionDiagnoses[q.id];
              const isExpanded = expandedQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "rounded-2xl border transition-all text-xs overflow-hidden shadow-xs",
                    diag === "mastered"
                      ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                      : diag === "time_management"
                      ? "border-amber-500/40 bg-amber-500/[0.02]"
                      : "border-rose-500/40 bg-rose-500/[0.02]"
                  )}
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() => toggleExpand(q.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer hover:bg-secondary/30 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-card border border-border">
                          Câu {q.questionNumber}
                        </span>

                        {/* Diagnosis Tag */}
                        <span
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                            diag === "mastered"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                              : diag === "time_management"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                          )}
                        >
                          {diag === "mastered"
                            ? "✓ Mastered"
                            : diag === "time_management"
                            ? "⏱️ Time Management Gap"
                            : "⚠️ Knowledge Gap"}
                        </span>
                      </div>

                      <p className="font-serif font-bold text-foreground text-xs leading-snug">
                        {q.questionText}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto text-[11px] shrink-0">
                      <span className="text-muted-foreground">
                        Đáp án: <strong className="text-emerald-600 font-mono">{q.correctAnswer}</strong>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Dissection Body */}
                  {isExpanded && (
                    <div className="p-4 pt-1 space-y-3 border-t border-border/70 text-xs bg-card/60 animate-in fade-in duration-150">
                      {/* 3 Answers Compare Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                          <span className="text-[10px] text-muted-foreground block font-mono">VÒNG 1 (TIMED)</span>
                          <strong className="text-blue-700 dark:text-blue-300 font-mono">{p1Ans}</strong>
                        </div>

                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                          <span className="text-[10px] text-muted-foreground block font-mono">VÒNG 2 (UNTIMED)</span>
                          <strong className="text-purple-700 dark:text-purple-300 font-mono">{p2Ans}</strong>
                        </div>

                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <span className="text-[10px] text-muted-foreground block font-mono">CAMBRIDGE CHUẨN</span>
                          <strong className="text-emerald-700 dark:text-emerald-300 font-mono">{q.correctAnswer}</strong>
                        </div>
                      </div>

                      {/* Evidence Quote */}
                      <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-1">
                        <span className="font-bold text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                          📍 Câu Dẫn Chứng ({q.evidenceParagraph}):
                        </span>
                        <p className="font-serif italic text-[11px] text-foreground/90">
                          "{q.evidenceSentence}"
                        </p>
                      </div>

                      {/* Paraphrase Mapping */}
                      {q.paraphraseMap.length > 0 && (
                        <div className="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-1.5">
                          <span className="font-bold text-[10px] text-emerald-600 uppercase tracking-wider block">
                            🔄 Ma Trận Từ Đồng Nghĩa (Paraphrase Mapping):
                          </span>
                          <div className="space-y-1">
                            {q.paraphraseMap.map((pm, pIdx) => (
                              <div key={pIdx} className="flex items-center justify-between text-[11px]">
                                <span>
                                  <code className="text-rose-500 font-mono">[{pm.questionWord}]</code>
                                  {" ➔ "}
                                  <code className="text-emerald-600 font-mono">[{pm.passageWord}]</code>
                                </span>
                                <span className="text-muted-foreground text-[10px] italic">
                                  {pm.mechanismVi}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Deep Explanation */}
                      <div className="text-[11px] text-muted-foreground leading-relaxed">
                        💡 <strong>Giải thích:</strong> {q.explanation}
                      </div>

                      {/* Common Trap Alert */}
                      {q.commonTrap !== "none" && (
                        <div className="p-2.5 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 text-[11px] text-rose-800 dark:text-rose-300 flex items-start gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span><strong>Bẫy khảo thí:</strong> {q.commonTrap}</span>
                        </div>
                      )}
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
