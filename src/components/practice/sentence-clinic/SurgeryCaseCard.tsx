"use client";

import React from "react";
import { Activity, AlertTriangle, ShieldAlert, Sparkles, BookOpen, CheckCircle2 } from "lucide-react";
import { SentenceSurgeryCase } from "@/data/mockSentenceSurgeryData";
import { cn } from "@/lib/utils";

interface SurgeryCaseCardProps {
  caseData: SentenceSurgeryCase;
  currentIndex: number;
  totalCount: number;
}

export function SurgeryCaseCard({ caseData, currentIndex, totalCount }: SurgeryCaseCardProps) {
  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case "fragment":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "comma_splice_runon":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "subject_verb":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "spoken_tone":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5 transition-all">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-xl bg-secondary font-mono text-xs font-bold text-foreground">
            Ca bệnh {currentIndex + 1} / {totalCount}
          </span>
          <span className={cn("px-3 py-1 rounded-xl text-xs font-bold border uppercase tracking-wider", getBadgeStyle(caseData.category))}>
            {caseData.categoryLabel}
          </span>
        </div>

        <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-primary" />
          <span>Chủ đề: <strong className="text-foreground">{caseData.contextTopic}</strong></span>
        </div>
      </div>

      {/* Buggy Sentence Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-rose-500">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" /> Câu Văn Bị Nhiễm Khuẩn (Band 4.5 - 5.0)
          </span>
          <span className="text-[11px] text-muted-foreground">Cần phẫu thuật cú pháp</span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-foreground font-serif text-base sm:text-lg leading-relaxed">
          <p>{caseData.buggySentence}</p>
        </div>
      </div>

      {/* Pathology Diagnosis & Cambridge Penalty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Activity className="h-4 w-4 text-amber-500" />
            <span>Chẩn Đoán Lâm Sàng ({caseData.pathologyTitle})</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {caseData.clinicalDiagnosis}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            <span>Hậu Quả Khảo Thí Cambridge (GRA Penalty)</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {caseData.cambridgeGRAImpact}
          </p>
        </div>
      </div>
    </div>
  );
}
