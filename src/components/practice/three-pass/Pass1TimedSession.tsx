"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  AlertTriangle,
  Send,
  Lock,
  Sparkles,
  FileText,
} from "lucide-react";
import { ThreePassTestData, ThreePassQuestion } from "@/data/mockThreePassTest";
import { cn } from "@/lib/utils";

interface Pass1TimedSessionProps {
  testData: ThreePassTestData;
  onCompletePass1: (answers: Record<string, string>, timeSpentSeconds: number) => void;
  className?: string;
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function Pass1TimedSession({
  testData,
  onCompletePass1,
  className,
}: Pass1TimedSessionProps) {
  const [timeLeft, setTimeLeft] = useState<number>(testData.pass1TimeLimitSeconds);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleInputChange = (qId: string, val: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleFinalSubmit = () => {
    const timeSpent = testData.pass1TimeLimitSeconds - timeLeft;
    onCompletePass1(userAnswers, timeSpent);
  };

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k]?.trim().length > 0
  ).length;

  const isLowTime = timeLeft <= 300 && timeLeft > 0; // <= 5 mins

  return (
    <div className={cn("space-y-6 select-none", className)}>
      {/* Timer Bar & Exam Rules Banner */}
      <div className="p-4 rounded-3xl border border-border bg-card shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-2xl font-mono text-xs font-extrabold border",
              isLowTime
                ? "bg-rose-500/10 text-rose-600 border-rose-500/30 animate-pulse"
                : "bg-blue-500/10 text-blue-600 border-blue-500/30"
            )}
          >
            <Clock className="h-4 w-4" />
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <span>Đồng hồ đếm ngược phòng thi (Pass 1 - Timed Sprint)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600">
                {answeredCount}/10 câu đã điền
              </span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Không tra từ điển • Không xem đáp án • Đo lường áp lực thực chiến
            </p>
          </div>
        </div>

        {/* Live Countdown Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={cn(
              "font-mono text-base sm:text-lg font-black px-4 py-1.5 rounded-2xl border flex items-center gap-1.5",
              isLowTime
                ? "bg-rose-600 text-white border-rose-600 animate-pulse shadow-md shadow-rose-600/30"
                : "bg-secondary text-foreground border-border"
            )}
          >
            <span>{formatCountdown(timeLeft)}</span>
          </span>
        </div>
      </div>

      {/* Split View: Passage on Left, Questions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Passage */}
        <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-border/80 pb-3 space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 uppercase tracking-wider">
              Reading Passage (Pass 1)
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
                <span className="font-sans font-bold text-[11px] text-blue-600 bg-secondary/80 px-2 py-0.5 rounded inline-block font-mono">
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
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 uppercase tracking-wider">
              Questions 1 - 10
            </span>
            <h3 className="text-sm font-extrabold text-foreground mt-1">
              Phiếu Trả Lời Vòng 1
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
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
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
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
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
                        className="w-full px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Pass 1 Button */}
          <div className="pt-2 border-t border-border/80 flex justify-end">
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Nộp bài Pass 1 & Mở khóa Pass 2</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
