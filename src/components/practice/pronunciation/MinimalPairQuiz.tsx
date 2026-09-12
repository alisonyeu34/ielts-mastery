"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Award,
  ArrowRight,
  Smile,
  Zap,
} from "lucide-react";
import { MOCK_MINIMAL_PAIRS, MinimalPairItem } from "@/data/mockMinimalPairs";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { db } from "@/lib/db";
import { ErrorItem } from "@/types/database";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

interface QuestionState {
  pair: MinimalPairItem;
  targetWord: "A" | "B";
  selectedWord: "A" | "B" | null;
  isAnswered: boolean;
  isCorrect: boolean;
}

export function MinimalPairQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionState | null>(null);

  const { playSound, currentlyPlayingId, isPlaying } = useAudioPlayer();

  const totalQuestions = 10;

  // Initialize new question
  const loadQuestion = (index: number) => {
    const pair = MOCK_MINIMAL_PAIRS[index % MOCK_MINIMAL_PAIRS.length];
    const target: "A" | "B" = Math.random() > 0.5 ? "A" : "B";

    setCurrentQuestion({
      pair,
      targetWord: target,
      selectedWord: null,
      isAnswered: false,
      isCorrect: false,
    });

    // Auto-play audio
    setTimeout(() => {
      const wordToPlay = target === "A" ? pair.wordA : pair.wordB;
      playSound(`quiz_${pair.id}`, wordToPlay);
    }, 300);
  };

  useEffect(() => {
    loadQuestion(0);
  }, []);

  const handlePlayCurrentWord = () => {
    if (!currentQuestion) return;
    const { pair, targetWord } = currentQuestion;
    const wordToPlay = targetWord === "A" ? pair.wordA : pair.wordB;
    playSound(`quiz_${pair.id}`, wordToPlay);
  };

  const handleSelectOption = async (choice: "A" | "B") => {
    if (!currentQuestion || currentQuestion.isAnswered) return;

    const { pair, targetWord } = currentQuestion;
    const isCorrect = choice === targetWord;

    setCurrentQuestion({
      ...currentQuestion,
      selectedWord: choice,
      isAnswered: true,
      isCorrect,
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);

      // Auto-save pronunciation mistake into Dexie DB error_bank
      try {
        const userWrongWord = choice === "A" ? pair.wordA : pair.wordB;
        const correctWord = targetWord === "A" ? pair.wordA : pair.wordB;

        const errorItem: ErrorItem = {
          id: `err_pronun_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          sourceModule: "pronunciation",
          errorType: "pronunciation",
          questionContext: `Phân biệt cặp âm tương phản: ${pair.wordA} (${pair.ipaA}) vs ${pair.wordB} (${pair.ipaB})`,
          userWrongAnswer: userWrongWord,
          correctAnswer: correctWord,
          deepExplanation: `Bạn đã nhầm lẫn giữa âm /${pair.phonemeA}/ và /${pair.phonemeB}/. ${pair.mouthGuideDiff}`,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        };

        await db.error_bank.put(errorItem);
      } catch (dbErr) {
        console.error("Failed to auto-save pronunciation error into bank:", dbErr);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 >= totalQuestions) {
      setIsQuizCompleted(true);
    } else {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      loadQuestion(nextIdx);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setIsQuizCompleted(false);
    loadQuestion(0);
  };

  if (!currentQuestion) return null;

  const { pair, targetWord, selectedWord, isAnswered, isCorrect } = currentQuestion;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Progress Header */}
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">
              Câu {currentQuestionIndex + 1} / {totalQuestions}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px] border border-indigo-500/20">
              Cặp Âm /{pair.phonemeA}/ vs /{pair.phonemeB}/
            </span>
          </div>

          <div className="flex items-center gap-3">
            {streak > 1 && (
              <span className="text-[11px] font-extrabold text-amber-500 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Zap className="h-3 w-3 fill-amber-500" /> Chuỗi {streak} câu đúng!
              </span>
            )}
            <span className="font-bold text-foreground">
              Điểm: <strong>{score}</strong>
            </span>
          </div>
        </div>

        <ProgressBar
          value={((currentQuestionIndex + 1) / totalQuestions) * 100}
          size="sm"
          variant="primary"
        />
      </div>

      {!isQuizCompleted ? (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm text-center">
          {/* Audio trigger card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-secondary/50 via-secondary/20 to-card border border-border/80 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              Hãy lắng nghe âm thanh và chọn từ phát âm chính xác:
            </span>

            <button
              type="button"
              onClick={handlePlayCurrentWord}
              className={cn(
                "h-20 w-20 sm:h-24 sm:w-24 rounded-3xl mx-auto flex items-center justify-center transition-all shadow-xl cursor-pointer",
                currentlyPlayingId === `quiz_${pair.id}` && isPlaying
                  ? "bg-rose-600 text-white shadow-rose-600/30 animate-pulse scale-105"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
              )}
              title="Bấm để nghe lại từ"
            >
              <Volume2 className="h-10 w-10" />
            </button>

            <span className="text-xs text-muted-foreground block font-medium">
              [ Bấm vào loa để nghe lại âm thanh ]
            </span>
          </div>

          {/* 2 Interactive Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option A */}
            <button
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption("A")}
              className={cn(
                "p-5 rounded-2xl border-2 text-center transition-all duration-200 select-none cursor-pointer flex flex-col items-center justify-center space-y-1.5 shadow-sm",
                !isAnswered && "border-border hover:border-indigo-500 hover:bg-indigo-500/[0.04]",
                isAnswered && targetWord === "A" && "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200",
                isAnswered && selectedWord === "A" && targetWord !== "A" && "border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-200"
              )}
            >
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Lựa chọn A (Âm /{pair.phonemeA}/)
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                {pair.wordA}
              </span>
              <span className="text-xs font-mono text-muted-foreground font-medium">
                {pair.ipaA} • {pair.meaningViA}
              </span>
            </button>

            {/* Option B */}
            <button
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption("B")}
              className={cn(
                "p-5 rounded-2xl border-2 text-center transition-all duration-200 select-none cursor-pointer flex flex-col items-center justify-center space-y-1.5 shadow-sm",
                !isAnswered && "border-border hover:border-indigo-500 hover:bg-indigo-500/[0.04]",
                isAnswered && targetWord === "B" && "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200",
                isAnswered && selectedWord === "B" && targetWord !== "B" && "border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-200"
              )}
            >
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Lựa chọn B (Âm /{pair.phonemeB}/)
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                {pair.wordB}
              </span>
              <span className="text-xs font-mono text-muted-foreground font-medium">
                {pair.ipaB} • {pair.meaningViB}
              </span>
            </button>
          </div>

          {/* Feedback & Contrast Explanation when answered */}
          {isAnswered && (
            <div
              className={cn(
                "p-5 rounded-2xl border text-left space-y-3 animate-in fade-in duration-200",
                isCorrect
                  ? "bg-emerald-500/[0.04] border-emerald-500/30"
                  : "bg-rose-500/[0.04] border-rose-500/30"
              )}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      Chính xác! Bạn đã nhận diện chuẩn xác âm /{targetWord === "A" ? pair.phonemeA : pair.phonemeB}/.
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                      Chưa chính xác! Đáp án đúng là "{targetWord === "A" ? pair.wordA : pair.wordB}" (Âm /{targetWord === "A" ? pair.phonemeA : pair.phonemeB}/).
                    </span>
                  </>
                )}
              </div>

              {/* Contrast tips */}
              <div className="p-3.5 rounded-xl bg-card border border-border/80 text-xs space-y-1">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <Smile className="h-3.5 w-3.5 text-indigo-500" /> Bí quyết phân biệt khẩu hình:
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {pair.mouthGuideDiff}
                </p>
              </div>

              {/* Listen comparison audio buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Nghe lại so sánh:</span>
                  <button
                    type="button"
                    onClick={() => playSound("comp_A", pair.wordA)}
                    className="px-2.5 py-1 rounded-lg border border-border bg-secondary hover:bg-secondary/80 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="h-3 w-3" /> {pair.wordA}
                  </button>
                  <button
                    type="button"
                    onClick={() => playSound("comp_B", pair.wordB)}
                    className="px-2.5 py-1 rounded-lg border border-border bg-secondary hover:bg-secondary/80 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="h-3 w-3" /> {pair.wordB}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{currentQuestionIndex + 1 === totalQuestions ? "Xem kết quả" : "Câu tiếp theo"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Summary */
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 mx-auto">
            <Award className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-foreground">
              Hoàn Thành Thử Thách Phân Biệt Cặp Âm!
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Độ chính xác: <strong>{score} / {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)</strong>
            </p>
          </div>

          {score < totalQuestions && (
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 text-xs text-muted-foreground text-left space-y-1">
              <span className="font-bold text-foreground">💡 Tự động gom lỗi:</span>
              <p>
                Toàn bộ các cặp âm bạn nghe nhầm đã được tự động lưu vào <strong>Ngân Hàng Lỗi Sai (Error Bank)</strong> để ôn tập triệt để ở Module 5.
              </p>
            </div>
          )}

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Luyện tập lại 10 câu mới</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
