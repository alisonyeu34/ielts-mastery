"use client";

import React from "react";
import { SentenceClinicCase } from "@/data/mockSentenceClinicData";
import {
  Stethoscope,
  AlertTriangle,
  FileSpreadsheet,
  Activity,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClinicCaseCardProps {
  clinicCase: SentenceClinicCase;
  className?: string;
}

export function ClinicCaseCard({
  clinicCase,
  className,
}: ClinicCaseCardProps) {
  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Top Header & Clinical Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold shadow-xs">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
              {clinicCase.stationNameVi}
            </span>
            <h3 className="text-base sm:text-lg font-black text-foreground">
              {clinicCase.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 font-mono text-xs font-bold">
            Band Gốc: {clinicCase.originalBand}
          </span>
        </div>
      </div>

      {/* The Faulty Sentence ("Patient") */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5" />
          CÂU VĂN BỆNH NHÂN (FAULTY SENTENCE - BAND {clinicCase.originalBand}):
        </span>

        <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-950 dark:text-rose-100 font-serif text-sm sm:text-base leading-relaxed font-bold shadow-inner">
          &ldquo;{clinicCase.faultySentence}&rdquo;
        </div>
      </div>

      {/* Diagnostic Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">
          Chẩn đoán:
        </span>
        {clinicCase.diagnosticTags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-0.5 rounded-lg bg-secondary text-foreground text-xs font-mono font-bold border border-border"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Clinical Diagnosis Description */}
      <div className="p-4 rounded-2xl bg-secondary/40 border border-border text-xs space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <Activity className="h-4 w-4 text-rose-500" />
          <span>Bóc Tách Cơ Chế Lỗi Sư Phạm:</span>
        </div>
        <p className="text-foreground/80 leading-relaxed font-medium">
          {clinicCase.errorDescriptionVi}
        </p>

        {/* Surgical Steps */}
        <div className="pt-2 border-t border-border/60 space-y-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
            Phác Đồ Phẫu Thuật Gợi Ý:
          </span>
          {clinicCase.clinicalSurgeryStepsVi.map((step, sIdx) => (
            <div
              key={sIdx}
              className="flex items-start gap-2 text-[11px] text-foreground/85"
            >
              <ChevronRight className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
