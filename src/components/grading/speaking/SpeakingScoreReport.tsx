"use client";

import React, { useState } from "react";
import {
  Award,
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Zap,
  Plus,
  Check,
  RotateCcw,
} from "lucide-react";
import { AISpeakingEvaluationResponse } from "@/lib/speakingPrompts";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { db } from "@/lib/db";
import { ErrorItem } from "@/types/database";
import { cn } from "@/lib/utils";

interface SpeakingScoreReportProps {
  evaluation: AISpeakingEvaluationResponse;
  topicTitle: string;
  onRetry: () => void;
  className?: string;
}

export function SpeakingScoreReport({
  evaluation,
  topicTitle,
  onRetry,
  className,
}: SpeakingScoreReportProps) {
  const [savedErrors, setSavedErrors] = useState<Record<number, boolean>>({});

  const {
    overallScore,
    criteriaScores,
    examinerVerdict,
    fluencyFeedback,
    vocabularyFeedback,
    grammarErrors,
    pronunciationTips,
    modelAnswerBand8,
  } = evaluation;

  const criteriaList = [
    {
      name: "Fluency & Coherence",
      short: "FC",
      score: criteriaScores.fc,
      desc: "Tốc độ nói, liên kết câu và mức độ ngập ngừng",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      name: "Lexical Resource",
      short: "LR",
      score: criteriaScores.lr,
      desc: "Vốn từ học thuật, cụm collocations tự nhiên & linh hoạt",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      name: "Grammar Range & Accuracy",
      short: "GRA",
      score: criteriaScores.gra,
      desc: "Độ chính xác khi nói câu phức, thì và cấu trúc câu",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      name: "Pronunciation & Intonation",
      short: "PR",
      score: criteriaScores.pr,
      desc: "Ngữ điệu bản xứ, nối âm và phát âm rõ âm đuôi",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  const handleSaveSpokenError = async (err: { original: string; corrected: string; rule: string }, idx: number) => {
    try {
      const errorItem: ErrorItem = {
        id: `err_spk_${Date.now()}_${idx}`,
        sourceModule: "speaking",
        errorType: "grammar",
        questionContext: `[Speaking AI Grader] - ${topicTitle}`,
        userWrongAnswer: err.original,
        correctAnswer: err.corrected,
        deepExplanation: err.rule,
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      };
      await db.error_bank.put(errorItem);
      setSavedErrors((prev) => ({ ...prev, [idx]: true }));
    } catch (e) {
      console.error("Failed to save spoken error:", e);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top Overall Score Banner */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-r from-card via-indigo-500/[0.05] to-purple-500/[0.05] p-6 sm:p-7 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest block opacity-90">
                Speaking
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold leading-none">
                {overallScore.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Cambridge Examiner Diagnostic Feedback
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
              Kết Quả Đánh Giá IELTS Speaking
            </h3>
            <p className="text-xs text-muted-foreground">
              Chủ đề: <strong>{topicTitle}</strong> • Hiệu chuẩn theo barem FC - LR - GRA - PR
            </p>
          </div>
        </div>

        {/* 4 Criteria Badges */}
        <div className="grid grid-cols-4 gap-2 text-center shrink-0">
          {criteriaList.map((c) => (
            <div
              key={c.short}
              className="p-2.5 rounded-2xl bg-secondary/60 border border-border/80 min-w-[65px]"
            >
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                {c.short}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-foreground">
                {c.score.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Examiner Verdict */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 space-y-1.5 shadow-sm">
        <span className="text-xs font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Nhận Xét Toàn Diện Của Giám Khảo Khảo Thí:
        </span>
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
          {examinerVerdict}
        </p>
      </div>

      {/* 4 Criteria Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteriaList.map((c) => (
          <div
            key={c.short}
            className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md border uppercase mr-2", c.bg, c.color, c.border)}>
                  {c.short}
                </span>
                <span className="text-sm font-bold text-foreground">{c.name}</span>
              </div>
              <span className="text-xl font-extrabold text-foreground">{c.score.toFixed(1)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">{c.desc}</p>
            <ProgressBar value={(c.score / 9.0) * 100} size="sm" variant="primary" />
          </div>
        ))}
      </div>

      {/* Fluency & Telemetry Analysis */}
      <div className="p-5 rounded-2xl border border-border bg-card space-y-3 shadow-sm text-xs">
        <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
          <Zap className="h-4 w-4 text-indigo-500" />
          Phân Tích Độ Trôi Chảy & Nhịp Điệu (Fluency Analysis)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
            <span className="font-bold text-foreground block">Đánh giá tốc độ nói:</span>
            <p className="text-muted-foreground">{fluencyFeedback.speedAssessment}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
            <span className="font-bold text-foreground block">Phân tích khoảng lặng & từ đệm:</span>
            <p className="text-muted-foreground">{fluencyFeedback.pauseAnalysis}</p>
          </div>
        </div>
      </div>

      {/* Grammar & Spoken Errors if any */}
      {grammarErrors && grammarErrors.length > 0 && (
        <div className="p-5 rounded-2xl border border-rose-500/25 bg-card space-y-3.5 shadow-sm text-xs">
          <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            Lỗi Ngữ Pháp & Diễn Đạt Khi Nói ({grammarErrors.length} lỗi):
          </h4>

          <div className="space-y-3">
            {grammarErrors.map((err, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-border bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-rose-600 dark:text-rose-400 font-medium line-through">
                      "{err.original}"
                    </span>
                    <span>➔</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      "{err.corrected}"
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{err.rule}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSaveSpokenError(err, i)}
                  disabled={savedErrors[i]}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer",
                    savedErrors[i]
                      ? "bg-emerald-600 text-white"
                      : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                  )}
                >
                  {savedErrors[i] ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Đã lưu Error Bank</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3 text-rose-500" />
                      <span>Lưu vào Error Bank</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pronunciation Recommendations */}
      {pronunciationTips && pronunciationTips.length > 0 && (
        <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.03] space-y-2 text-xs">
          <h4 className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Chiến Lược Nâng Cao Phát Âm & Ngữ Điệu (Pronunciation Mastery):
          </h4>
          <ul className="space-y-1 pl-2 text-muted-foreground">
            {pronunciationTips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Band 8.5+ Model Answer */}
      {modelAnswerBand8 && (
        <div className="p-5 sm:p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-card to-purple-500/[0.04] space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider flex items-center gap-1">
              <Award className="h-3.5 w-3.5" /> Câu Trả Lời Mẫu Band 8.5+ (Model Answer)
            </span>
          </div>

          <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed italic">
            "{modelAnswerBand8}"
          </p>
        </div>
      )}

      {/* Footer Action */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Luyện tập câu hỏi khác</span>
        </button>
      </div>
    </div>
  );
}
