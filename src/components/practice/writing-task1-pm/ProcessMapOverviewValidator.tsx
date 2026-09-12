"use client";

import React, { useState } from "react";
import { OverviewValidationResult } from "@/lib/processMapValidator";
import { PMExerciseType } from "@/data/mockProcessMapData";
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Eye,
  Copy,
  Check,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessMapOverviewValidatorProps {
  validationResult: OverviewValidationResult;
  diagramType: PMExerciseType;
  modelOverviewText: string;
  className?: string;
}

export function ProcessMapOverviewValidator({
  validationResult,
  diagramType,
  modelOverviewText,
  className,
}: ProcessMapOverviewValidatorProps) {
  const [showModel, setShowModel] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const isProcess = diagramType.startsWith("process");

  const handleCopyModel = () => {
    navigator.clipboard.writeText(modelOverviewText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "p-4 sm:p-5 rounded-2xl border bg-card/60 backdrop-blur-sm space-y-3.5 transition-all text-xs",
        validationResult.isValid
          ? "border-emerald-500/30 bg-emerald-500/[0.02]"
          : validationResult.scoreOutOf10 >= 5
          ? "border-amber-500/30 bg-amber-500/[0.02]"
          : "border-border",
        className
      )}
    >
      {/* Header & Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-xl",
              validationResult.isValid
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            )}
          >
            {validationResult.isValid ? (
              <Award className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </div>

          <div>
            <h4 className="font-extrabold text-foreground flex items-center gap-1.5">
              <span>Thẩm Định Câu Overview Chuẩn Band 7.5+</span>
              {validationResult.isValid && (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              )}
            </h4>
            <span className="text-[10px] text-muted-foreground">
              {isProcess
                ? "Yêu cầu: Tổng số bước + Điểm đầu + Điểm cuối"
                : "Yêu cầu: Xu hướng đô thị hóa + Mốc thời gian + Di sản/Tương phản"}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span
            className={cn(
              "text-base font-extrabold font-mono",
              validationResult.isValid
                ? "text-emerald-600 dark:text-emerald-400"
                : validationResult.scoreOutOf10 >= 5
                ? "text-amber-600 dark:text-amber-400"
                : "text-muted-foreground"
            )}
          >
            {validationResult.scoreOutOf10}/10
          </span>
          <span className="text-[10px] text-muted-foreground block">
            {validationResult.isValid ? "Đạt chuẩn Band 8.0+" : "Cần hoàn thiện"}
          </span>
        </div>
      </div>

      {/* Feedback Summary Banner */}
      <p
        className={cn(
          "p-2.5 rounded-xl border text-[11px] leading-relaxed",
          validationResult.isValid
            ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 border-emerald-500/20"
            : "bg-secondary/60 text-muted-foreground border-border/80"
        )}
      >
        {validationResult.feedbackSummaryVi}
      </p>

      {/* Criteria Breakdown Grid */}
      <div className="space-y-1.5 pt-1">
        {validationResult.praisedElementsVi.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}

        {validationResult.missingElementsVi.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Model Overview Reveal Toggle */}
      <div className="pt-2 border-t border-border/60">
        <button
          type="button"
          onClick={() => setShowModel((prev) => !prev)}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>{showModel ? "Ẩn Overview Mẫu Band 8.5+" : "Tham khảo Overview Mẫu Band 8.5+"}</span>
        </button>

        {showModel && (
          <div className="mt-2 p-3 rounded-xl bg-secondary/50 border border-border/80 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">
                Band 8.5+ Model Overview:
              </span>

              <button
                type="button"
                onClick={handleCopyModel}
                className="px-2 py-0.5 rounded-md bg-card hover:bg-secondary text-foreground text-[10px] font-bold border border-border flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-500">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-muted-foreground" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            <p className="font-serif italic text-foreground text-xs leading-relaxed">
              "{modelOverviewText}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
