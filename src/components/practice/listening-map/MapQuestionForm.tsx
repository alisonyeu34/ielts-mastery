"use client";

import React from "react";
import {
  MapQuestionItem,
  ListeningMapExerciseData,
} from "@/data/mockListeningMapData";
import {
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  BookOpen,
  Send,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MapQuestionFormProps {
  mapData: ListeningMapExerciseData;
  answers: Record<number, string>;
  selectedQuestionId: number;
  isSubmitted: boolean;
  isForensicMode: boolean;
  onSelectQuestion: (id: number) => void;
  onAssignLetter: (questionId: number, letter: string) => void;
  onJumpToEvidence: (questionId: number) => void;
  onOpenLexiconModal: () => void;
  onSubmitAnswers: () => void;
  className?: string;
}

export function MapQuestionForm({
  mapData,
  answers,
  selectedQuestionId,
  isSubmitted,
  isForensicMode,
  onSelectQuestion,
  onAssignLetter,
  onJumpToEvidence,
  onOpenLexiconModal,
  onSubmitAnswers,
  className,
}: MapQuestionFormProps) {
  const letters = ["A", "B", "C", "D", "E", "F"];

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[Number(k)]
  ).length;
  const isAllAnswered = answeredCount === mapData.questions.length;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Header & Instruction */}
      <div className="space-y-2 border-b border-border/70 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Questions 11 - 15 • Map Labelling
          </span>

          <button
            type="button"
            onClick={onOpenLexiconModal}
            className="px-3 py-1 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Cẩm Nang Vị Trí</span>
          </button>
        </div>

        <h3 className="text-sm sm:text-base font-black text-foreground">
          Điền chữ cái đúng (A - F) tương ứng với từng cơ sở / địa danh:
        </h3>
        <p className="text-xs text-muted-foreground">
          Bấm vào hàng câu hỏi rồi click chữ cái trên bản đồ hoặc chọn trực tiếp bên dưới.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {mapData.questions.map((q) => {
          const isSelected = selectedQuestionId === q.id;
          const userAns = answers[q.id] || "";
          const isCorrect = userAns.toUpperCase() === q.correctLetter.toUpperCase();

          return (
            <div
              key={q.id}
              onClick={() => onSelectQuestion(q.id)}
              className={cn(
                "p-4 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2.5",
                isSelected
                  ? "border-primary bg-primary/[0.03] ring-1 ring-primary/40 shadow-xs"
                  : "border-border bg-secondary/15 hover:bg-secondary/30",
                isSubmitted &&
                  (isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                    : "border-rose-500/40 bg-rose-500/[0.02]")
              )}
            >
              {/* Question Row Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-secondary font-mono font-black text-xs text-foreground border border-border">
                    {q.id}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-foreground">
                    {q.facilityName}
                  </span>
                </div>

                {/* Status or Letter Selector */}
                {isSubmitted ? (
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-mono font-black text-xs px-2.5 py-1 rounded-xl border flex items-center gap-1",
                        isCorrect
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                      )}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Vị trí [{userAns}]</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5" />
                          <span>
                            [{userAns || "Trống"}] ➔ Đúng: [{q.correctLetter}]
                          </span>
                        </>
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onJumpToEvidence(q.id);
                      }}
                      title="Nghe lại đoạn dẫn chứng này"
                      className="p-1.5 rounded-xl border border-border bg-card hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <span
                    className={cn(
                      "font-mono font-black text-xs px-3 py-1 rounded-xl border transition-colors",
                      userAns
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : "bg-card text-muted-foreground border-border"
                    )}
                  >
                    {userAns ? `Vị trí [ ${userAns} ]` : "Chưa chọn"}
                  </span>
                )}
              </div>

              {/* Letter Buttons Grid */}
              {!isSubmitted && (
                <div className="flex items-center gap-1.5 pt-1">
                  {letters.map((letChoice) => {
                    const isPicked = userAns === letChoice;
                    return (
                      <button
                        key={letChoice}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAssignLetter(q.id, letChoice);
                        }}
                        className={cn(
                          "flex-1 py-1.5 rounded-xl font-mono font-bold text-xs border transition-all cursor-pointer",
                          isPicked
                            ? "bg-primary text-primary-foreground border-primary shadow-xs scale-105"
                            : "bg-card hover:bg-secondary text-foreground border-border"
                        )}
                      >
                        {letChoice}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Forensic Mode Deep Explanation */}
              {isSubmitted && isForensicMode && (
                <div className="pt-2 border-t border-border/60 text-xs space-y-2 animate-in fade-in">
                  <p className="text-muted-foreground leading-relaxed">
                    🧭 <strong>Phân tích hướng đi:</strong> {q.directionalExplanation}
                  </p>

                  {q.isRelocationTrap && (
                    <div className="p-2.5 rounded-xl bg-rose-500/[0.07] border border-rose-500/20 text-rose-700 dark:text-rose-400 flex items-start gap-1.5 text-[11px]">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>{q.trapExplanationVi}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action Button */}
      {!isSubmitted && (
        <button
          type="button"
          onClick={onSubmitAnswers}
          className={cn(
            "w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer",
            isAllAnswered
              ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.01]"
              : "bg-secondary text-muted-foreground border border-border"
          )}
        >
          <Send className="h-4 w-4" />
          <span>
            {isAllAnswered
              ? "Nộp Bài & Mở Hoạt Ảnh Dẫn Đường"
              : `Nộp Bài (Đã làm ${answeredCount}/${mapData.questions.length} câu)`}
          </span>
        </button>
      )}
    </div>
  );
}
