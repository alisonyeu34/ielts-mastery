"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  HelpCircle,
} from "lucide-react";
import { Task1Dataset, KeyFeatureItem } from "@/data/mockTask1Datasets";
import { cn } from "@/lib/utils";

interface KeyFeaturesDrillProps {
  dataset: Task1Dataset;
  selections: Record<string, boolean>; // id -> isSelected
  isSubmitted: boolean;
  result: {
    score: number;
    totalKeyFeatures: number;
    falsePositives: number;
  } | null;
  onToggleSelection: (id: string) => void;
  onSubmit: (dataset: Task1Dataset) => void;
  className?: string;
}

export function KeyFeaturesDrill({
  dataset,
  selections,
  isSubmitted,
  result,
  onToggleSelection,
  onSubmit,
  className,
}: KeyFeaturesDrillProps) {
  const selectedCount = Object.values(selections).filter(Boolean).length;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wider">
            Examiner Mindset Drill
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Chọn Lọc Số Liệu Nổi Bật (Key Features Spotting)
          </h3>
          <p className="text-xs text-muted-foreground">
            Bấm chọn 3-4 đặc điểm số liệu thực sự có giá trị khảo thí (tránh bẫy chọn chi tiết vụn vặt của Band 5.0).
          </p>
        </div>

        <span className="text-xs font-bold text-muted-foreground self-start sm:self-auto">
          Đã chọn: <strong className="text-indigo-600 dark:text-indigo-400">{selectedCount}</strong> / {dataset.keyFeaturesList.length}
        </span>
      </div>

      {/* List of 6 Feature Candidates */}
      <div className="space-y-3">
        {dataset.keyFeaturesList.map((item) => {
          const isSelected = !!selections[item.id];

          return (
            <div
              key={item.id}
              onClick={() => onToggleSelection(item.id)}
              className={cn(
                "p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2",
                // Unsubmitted & unselected
                !isSelected && !isSubmitted && "border-border/70 bg-secondary/20 hover:border-indigo-500/50 hover:bg-secondary/40",
                // Unsubmitted & selected
                isSelected && !isSubmitted && "border-indigo-600 bg-indigo-500/10 ring-2 ring-indigo-500/30",
                // Submitted & Correct Key Feature selected
                isSubmitted && isSelected && item.isKeyFeature && "border-emerald-500/50 bg-emerald-500/10",
                // Submitted & False positive selected (Minor detail)
                isSubmitted && isSelected && !item.isKeyFeature && "border-rose-500/50 bg-rose-500/10",
                // Submitted & Missed key feature
                isSubmitted && !isSelected && item.isKeyFeature && "border-amber-500/40 bg-amber-500/[0.04]",
                // Submitted & Correctly skipped minor detail
                isSubmitted && !isSelected && !item.isKeyFeature && "border-border/40 opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors mt-0.5",
                      isSelected && !isSubmitted && "bg-indigo-600 text-white border-indigo-600",
                      !isSelected && !isSubmitted && "border-border bg-card",
                      isSubmitted && isSelected && item.isKeyFeature && "bg-emerald-600 text-white border-emerald-600",
                      isSubmitted && isSelected && !item.isKeyFeature && "bg-rose-600 text-white border-rose-600"
                    )}
                  >
                    {isSelected ? "✓" : ""}
                  </div>

                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-foreground block">
                      {item.description}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Phân loại: {item.categoryVi}
                    </span>
                  </div>
                </div>

                {/* Badge post submission */}
                {isSubmitted && (
                  <span
                    className={cn(
                      "text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider shrink-0",
                      item.isKeyFeature
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                    )}
                  >
                    {item.isKeyFeature ? "Key Feature" : "Minor Detail"}
                  </span>
                )}
              </div>

              {/* Post-submit explanation */}
              {isSubmitted && (
                <div className="pt-2 border-t border-border/60 text-xs space-y-1 animate-in fade-in duration-150">
                  <p
                    className={cn(
                      "text-[11px] leading-relaxed",
                      item.isKeyFeature
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-rose-700 dark:text-rose-300"
                    )}
                  >
                    💡 {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!isSubmitted ? (
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => onSubmit(dataset)}
            disabled={selectedCount === 0}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
              selectedCount > 0
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="h-3.5 w-3.5" />
            <span>Kiểm tra Key Features đã chọn</span>
          </button>
        </div>
      ) : (
        result && (
          <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border flex items-center justify-between text-xs">
            <span className="font-bold text-foreground">
              Kết quả: {result.score}/{result.totalKeyFeatures} Key Features chính xác
              {result.falsePositives > 0 && ` (Đã chọn nhầm ${result.falsePositives} chi tiết vụn vặt)`}
            </span>
            <span
              className={cn(
                "font-extrabold",
                result.score === result.totalKeyFeatures && result.falsePositives === 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              )}
            >
              {result.score === result.totalKeyFeatures && result.falsePositives === 0
                ? "Xuất sắc (Band 7.5+ Spotting)"
                : "Cần cải thiện chọn lọc"}
            </span>
          </div>
        )
      )}
    </div>
  );
}
