"use client";

import React from "react";
import {
  Award,
  BookOpen,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import { AIScores } from "@/types/database";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

interface CriteriaScoreCardsProps {
  scores: AIScores;
  generalFeedback: string;
  detailedAnalysis?: {
    trAnalysis: string;
    ccAnalysis: string;
    lrAnalysis: string;
    graAnalysis: string;
  };
  targetBand?: number;
  className?: string;
}

export function CriteriaScoreCards({
  scores,
  generalFeedback,
  detailedAnalysis,
  targetBand = 7.5,
  className,
}: CriteriaScoreCardsProps) {
  const criteriaData = [
    {
      key: "tr",
      name: "Task Response / Achievement",
      short: "TR",
      score: scores.tr,
      desc: "Độ hoàn thiện yêu cầu đề bài, phát triển luận điểm & dẫn chứng",
      analysis: detailedAnalysis?.trAnalysis,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      key: "cc",
      name: "Coherence & Cohesion",
      short: "CC",
      score: scores.cc,
      desc: "Tính mạch lạc, liên kết câu đoạn & cấu trúc phân đoạn tự nhiên",
      analysis: detailedAnalysis?.ccAnalysis,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      key: "lr",
      name: "Lexical Resource",
      short: "LR",
      score: scores.lr,
      desc: "Vốn từ học thuật AWL, độ chính xác của collocation & văn phong",
      analysis: detailedAnalysis?.lrAnalysis,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      key: "gra",
      name: "Grammatical Range & Accuracy",
      short: "GRA",
      score: scores.gra,
      desc: "Đa dạng cấu trúc câu phức, câu đảo ngữ & tỷ lệ câu chuẩn ngữ pháp",
      analysis: detailedAnalysis?.graAnalysis,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 6.5) return "text-indigo-600 dark:text-indigo-400";
    if (score >= 5.5) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Overall Band Banner */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-r from-card via-indigo-500/[0.05] to-purple-500/[0.05] p-6 sm:p-7 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest block opacity-90">
                Overall
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold leading-none">
                {scores.overall.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Cambridge Band Descriptor Evaluation
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
              Đánh Giá Toàn Diện IELTS Writing
            </h3>
            <p className="text-xs text-muted-foreground">
              Mục tiêu lộ trình: <strong>Band {targetBand.toFixed(1)}</strong> • Khoảng cách còn lại:{" "}
              <strong className={scores.overall >= targetBand ? "text-emerald-500" : "text-amber-500"}>
                {scores.overall >= targetBand ? "Đã đạt mục tiêu 🎉" : `+${(targetBand - scores.overall).toFixed(1)} Band`}
              </strong>
            </p>
          </div>
        </div>

        {/* 4 Mini Criteria Badges in Banner */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center shrink-0">
          {criteriaData.map((c) => (
            <div
              key={c.key}
              className="p-2.5 rounded-2xl bg-secondary/60 border border-border/80 min-w-[65px]"
            >
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                {c.short}
              </span>
              <span className={cn("text-base sm:text-lg font-extrabold", getScoreColor(c.score))}>
                {c.score.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* General Feedback Box */}
      {generalFeedback && (
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 space-y-1.5 shadow-sm">
          <span className="text-xs font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Nhận Xét Tổng Quát Của Giám Khảo Khảo Thí:
          </span>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
            {generalFeedback}
          </p>
        </div>
      )}

      {/* 4 Detailed Criteria Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteriaData.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-border bg-card p-5 space-y-3.5 shadow-sm hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md border uppercase", item.bg, item.color, item.border)}>
                    {item.short}
                  </span>
                  <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                </div>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>

              <div className="text-right shrink-0">
                <span className={cn("text-2xl font-extrabold", getScoreColor(item.score))}>
                  {item.score.toFixed(1)}
                </span>
                <span className="text-[10px] text-muted-foreground block">/ 9.0</span>
              </div>
            </div>

            {/* Score progress */}
            <ProgressBar
              value={(item.score / 9.0) * 100}
              size="sm"
              variant={item.score >= 7.0 ? "emerald" : item.score >= 6.0 ? "primary" : "amber"}
            />

            {/* Specific analysis commentary */}
            {item.analysis && (
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 text-xs text-muted-foreground leading-relaxed">
                {item.analysis}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
