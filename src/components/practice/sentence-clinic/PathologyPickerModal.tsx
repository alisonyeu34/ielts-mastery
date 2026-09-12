"use client";

import React from "react";
import {
  Stethoscope,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import {
  GRAMMAR_PATHOLOGIES,
  GrammarPathologyType,
  SentenceClinicExercise,
} from "@/data/mockSentenceClinicData";
import { cn } from "@/lib/utils";

interface PathologyPickerModalProps {
  exercise: SentenceClinicExercise;
  selectedPathology: GrammarPathologyType | null;
  onSelectPathology: (type: GrammarPathologyType) => void;
  className?: string;
}

export function PathologyPickerModal({
  exercise,
  selectedPathology,
  onSelectPathology,
  className,
}: PathologyPickerModalProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 shadow-md space-y-6 select-none animate-in zoom-in-95 duration-200",
        className
      )}
    >
      {/* Top Header */}
      <div className="border-b border-border/70 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
            Bước 2 / 3 • Chẩn Đoán Bệnh Ngữ Pháp
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-foreground">
          Câu Văn Trên Đang Mắc Phải Loại Lỗi Cú Pháp Nào?
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Chọn đúng bản chất ngữ pháp của lỗi để chuyển sang bước viết lại câu chuẩn C1.
        </p>
      </div>

      {/* 5 Pathology Selection Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {GRAMMAR_PATHOLOGIES.map((p) => {
          const isSelected = selectedPathology === p.type;
          const isCorrectChoice = p.type === exercise.pathologyType;

          return (
            <button
              key={p.type}
              type="button"
              onClick={() => onSelectPathology(p.type)}
              disabled={selectedPathology !== null}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all space-y-2 cursor-pointer",
                selectedPathology === null
                  ? "bg-secondary/30 border-border hover:border-primary hover:bg-secondary/50"
                  : isSelected
                  ? isCorrectChoice
                    ? "bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/30 text-foreground"
                    : "bg-rose-500/15 border-rose-500 ring-2 ring-rose-500/30 text-foreground"
                  : "bg-card border-border/50 opacity-50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-foreground text-xs sm:text-sm">
                  {p.nameVi}
                </span>
                <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border", p.badgeColor)}>
                  {p.nameEn}
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground leading-snug">
                {p.shortDescription}
              </p>
            </button>
          );
        })}
      </div>

      {/* Pathology Explanation after choice */}
      {selectedPathology !== null && (
        <div
          className={cn(
            "p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in duration-200",
            selectedPathology === exercise.pathologyType
              ? "bg-emerald-500/[0.05] border-emerald-500/30"
              : "bg-rose-500/[0.05] border-rose-500/30"
          )}
        >
          <div className="flex items-center gap-1.5 font-bold">
            {selectedPathology === exercise.pathologyType ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>Chẩn Đoán Chính Xác 100%!</span>
              </span>
            ) : (
              <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                <span>Chẩn Đoán Chưa Đúng (Đã lưu vào Error Bank)</span>
              </span>
            )}
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {exercise.pathologyExplanation}
          </p>

          <p className="text-[10px] text-muted-foreground font-serif italic pt-1 border-t border-border/60">
            🔍 <strong>Tác động điểm thi:</strong> {exercise.cambridgeGRAImpact}
          </p>
        </div>
      )}
    </div>
  );
}
