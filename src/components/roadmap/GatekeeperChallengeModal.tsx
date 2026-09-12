"use client";

import React, { useState } from "react";
import {
  X,
  Trophy,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Send,
  RotateCcw,
} from "lucide-react";
import { RoadmapDayNode } from "@/data/mockRoadmapTimeline";
import { PhaseNumber } from "@/types/database";
import { cn } from "@/lib/utils";

interface GatekeeperChallengeModalProps {
  isOpen: boolean;
  dayNode: RoadmapDayNode | null;
  onPassGatekeeper: (phase: PhaseNumber) => void;
  onClose: () => void;
}

export function GatekeeperChallengeModal({
  isOpen,
  dayNode,
  onPassGatekeeper,
  onClose,
}: GatekeeperChallengeModalProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [passed, setPassed] = useState<boolean>(false);
  const [scorePercent, setScorePercent] = useState<number>(0);

  if (!isOpen || !dayNode || !dayNode.gatekeeperDetails) return null;

  const details = dayNode.gatekeeperDetails;
  const questions = details.challengeQuestions;

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    setScorePercent(percent);
    setIsSubmitted(true);

    if (percent >= details.minScorePercent) {
      setPassed(true);
    } else {
      setPassed(false);
    }
  };

  const handleAcceptPass = () => {
    onPassGatekeeper(dayNode.phase);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setPassed(false);
    setScorePercent(0);
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-amber-500/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                <Trophy className="h-4 w-4" />
              </span>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Trạm Kiểm Soát Vượt Cấp (Gatekeeper Boss Challenge)
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              {details.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {details.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Result Banner after Submission */}
        {isSubmitted && (
          <div
            className={cn(
              "p-4 sm:p-5 rounded-2xl border text-xs space-y-2 animate-in zoom-in-95 duration-200",
              passed
                ? "bg-emerald-500/[0.08] border-emerald-500/40 text-emerald-900 dark:text-emerald-200"
                : "bg-rose-500/[0.08] border-rose-500/40 text-rose-900 dark:text-rose-200"
            )}
          >
            <div className="flex items-center justify-between font-bold text-sm">
              <span className="flex items-center gap-2">
                {passed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <ShieldAlert className="h-5 w-5 text-rose-600" />
                )}
                <span>
                  {passed
                    ? "🎉 Chúc mừng! Bạn đã vượt qua Gatekeeper thành công!"
                    : "⚠️ Chưa đạt chuẩn tối thiểu 75% số điểm"}
                </span>
              </span>
              <span className="font-mono font-black text-base">
                {scorePercent}% / {details.minScorePercent}%
              </span>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              {passed
                ? "Hệ thống đã chính thức mở khóa Giai đoạn tiếp theo và cấp Chứng chỉ hoàn thành mốc cho bạn!"
                : "Hãy rà soát lại các câu sai bên dưới, củng cố kiến thức trong Error Bank và thử lại bài thi sát hạch."}
            </p>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-5">
          {questions.map((q, qIdx) => {
            const userChoice = selectedAnswers[q.id];
            const isCorrect = userChoice === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-secondary/20 border border-border space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-lg bg-secondary text-foreground border border-border">
                    Câu hỏi {qIdx + 1}/{questions.length}
                  </span>

                  {isSubmitted && (
                    <span
                      className={cn(
                        "font-bold text-[11px] flex items-center gap-1",
                        isCorrect ? "text-emerald-600" : "text-rose-600"
                      )}
                    >
                      {isCorrect ? "✓ Đúng" : "✗ Sai"}
                    </span>
                  )}
                </div>

                <p className="font-serif font-bold text-foreground text-xs sm:text-sm leading-relaxed">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    const isCorrectOpt = optIdx === q.correctIndex;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={cn(
                          "w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer",
                          isSubmitted
                            ? isCorrectOpt
                              ? "bg-emerald-500/20 border-emerald-500 font-bold text-emerald-800 dark:text-emerald-300"
                              : isSelected
                              ? "bg-rose-500/20 border-rose-500 font-bold text-rose-800 dark:text-rose-300"
                              : "bg-card border-border/60 text-muted-foreground opacity-60"
                            : isSelected
                            ? "bg-amber-600 text-white border-amber-600 shadow-xs font-bold"
                            : "bg-card border-border hover:border-amber-500/60 text-foreground"
                        )}
                      >
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Post-submit explanation */}
                {isSubmitted && (
                  <div className="p-2.5 rounded-xl bg-card border border-border/80 text-[11px] text-muted-foreground leading-relaxed">
                    💡 <strong>Giải thích:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Footer */}
        <div className="pt-2 border-t border-border/80 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {isSubmitted
              ? passed
                ? "Sẵn sàng nhận chứng chỉ và mở khóa chặng mới"
                : "Bạn có thể thi lại ngay sau khi rà soát"
              : `Đã chọn ${answeredCount}/${questions.length} câu hỏi`}
          </span>

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-amber-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Nộp bài Sát Hạch Gatekeeper</span>
            </button>
          ) : passed ? (
            <button
              type="button"
              onClick={handleAcceptPass}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Nhận Chứng Chỉ & Mở Khóa Phase Kế Tiếp</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRetry}
              className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Thi lại Gatekeeper</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
