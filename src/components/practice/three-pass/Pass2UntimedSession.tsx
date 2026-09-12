"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  Send,
  HelpCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { ThreePassTestData } from "@/data/mockThreePassTest";
import { cn } from "@/lib/utils";

interface Pass2UntimedSessionProps {
  testData: ThreePassTestData;
  onCompletePass2: (answers: Record<string, string>, timeSpentSeconds: number) => void;
  className?: string;
}

function formatStopwatch(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function Pass2UntimedSession({
  testData,
  onCompletePass2,
  className,
}: Pass2UntimedSessionProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (qId: string, val: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleFinalSubmit = () => {
    onCompletePass2(userAnswers, elapsedSeconds);
  };

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k]?.trim().length > 0
  ).length;

  return (
    <div className={cn("space-y-6 select-none", className)}>
      {/* Untimed Mode Banner */}
      <div className="p-4 sm:p-5 rounded-3xl border border-purple-500/30 bg-purple-500/[0.04] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Search className="h-4 w-4" />
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <span>Vòng 2: Đào Sâu Không Giới Hạn (Untimed Deep Dive)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                {answeredCount}/10 câu đã điền
              </span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Đọc chậm rãi, bóc tách cấu trúc câu khó để kiểm tra xem bạn sai do thiếu thời gian hay hổng kiến thức
            </p>
          </div>
        </div>

        {/* Stopwatch */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="font-mono text-xs font-bold text-muted-foreground bg-card px-3 py-1.5 rounded-xl border border-border flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-purple-500" />
            <span>Thời gian đào sâu: {formatStopwatch(elapsedSeconds)}</span>
          </span>
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Passage */}
        <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-border/80 pb-3 space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Reading Passage (Pass 2 - Deep Dive)
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-foreground leading-snug">
              {testData.title}
            </h3>
            <p className="text-xs text-muted-foreground italic font-serif">
              Chủ đề: {testData.topic} • {testData.wordCount} words
            </p>
          </div>

          <div className="space-y-5 font-serif text-xs sm:text-sm text-foreground/90 leading-relaxed text-justify">
            {testData.paragraphs.map((p) => (
              <div key={p.id} className="space-y-1.5">
                <span className="font-sans font-bold text-[11px] text-purple-600 dark:text-purple-400 bg-secondary/80 px-2 py-0.5 rounded inline-block font-mono">
                  {p.label}
                </span>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 10 Questions */}
        <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5 sticky top-6">
          <div className="border-b border-border/80 pb-3">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Questions 1 - 10
            </span>
            <h3 className="text-sm font-extrabold text-foreground mt-1">
              Phiếu Trả Lời Vòng 2 (Untimed)
            </h3>
          </div>

          <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
            {testData.questions.map((q) => {
              const currentVal = userAnswers[q.id] || "";

              return (
                <div
                  key={q.id}
                  className="p-3.5 rounded-2xl bg-secondary/20 border border-border space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                      Câu {q.questionNumber}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {q.type.toUpperCase()}
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
                          onClick={() => handleInputChange(q.id, opt)}
                          className={cn(
                            "py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                            currentVal === opt
                              ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                              : "bg-card border-border text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Multiple Choice Options */}
                  {q.type === "multiple_choice" && q.options && (
                    <div className="space-y-1 pt-1">
                      {q.options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleInputChange(q.id, opt.id)}
                          className={cn(
                            "w-full p-2 rounded-xl border text-left text-xs transition-all flex items-start gap-1.5 cursor-pointer",
                            currentVal === opt.id
                              ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                              : "bg-card border-border text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span className="font-mono font-bold">{opt.id}.</span>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Completion Input */}
                  {q.type === "completion" && (
                    <div className="pt-1">
                      <input
                        type="text"
                        value={currentVal}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="Điền ONE WORD ONLY..."
                        className="w-full px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Pass 2 Button */}
          <div className="pt-2 border-t border-border/80 flex justify-end">
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Nộp bài Pass 2 & Mở khóa Mổ xẻ Pass 3</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
