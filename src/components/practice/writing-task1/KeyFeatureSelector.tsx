"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
  Layers,
  ArrowRight,
  Filter,
} from "lucide-react";
import { KeyFeatureItem } from "@/data/mockTask1Data";
import { cn } from "@/lib/utils";

interface KeyFeatureSelectorProps {
  features: KeyFeatureItem[];
  selectedIds: string[];
  isEvaluated: boolean;
  onToggleFeature: (id: string) => void;
  onEvaluate: () => void;
  className?: string;
}

export function KeyFeatureSelector({
  features,
  selectedIds,
  isEvaluated,
  onToggleFeature,
  onEvaluate,
  className,
}: KeyFeatureSelectorProps) {
  const getCategoryBadge = (cat: KeyFeatureItem["category"]) => {
    switch (cat) {
      case "extreme":
        return {
          label: "Cực trị (Cao nhất / Thấp nhất)",
          color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        };
      case "overall_trend":
        return {
          label: "Xu hướng chung (Tăng / Giảm)",
          color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        };
      case "anomaly_crossing":
        return {
          label: "Giao cắt / Đột biến",
          color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        };
      case "minor_detail":
      default:
        return {
          label: "Bẫy số liệu vụn vặt",
          color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        };
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
              Bước 1 • Trích Xuất Key Features
            </span>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-foreground">
            Lọc 3 Đặc Điểm Nổi Bật Cho Đoạn Overview
          </h4>
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          Đã chọn: <strong className="text-primary">{selectedIds.length}</strong> / 3 điểm
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Chọn các nhận định mang tính <strong>khái quát toàn cảnh</strong> (Điểm cao/thấp nhất, xu hướng tăng/giảm, điểm giao cắt). Hãy cảnh giác với các câu chứa số liệu cụ thể vì chúng là <strong>bẫy chi tiết vụn vặt</strong>!
      </p>

      {/* Feature Cards */}
      <div className="space-y-3">
        {features.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          const badge = getCategoryBadge(item.category);
          const isCorrect = item.isKeyFeature;

          return (
            <div
              key={item.id}
              onClick={() => onToggleFeature(item.id)}
              className={cn(
                "p-4 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2.5 shadow-2xs",
                isSelected
                  ? "border-primary/60 bg-primary/[0.04] ring-1 ring-primary/30"
                  : "border-border bg-secondary/15 hover:bg-secondary/30",
                isEvaluated && isSelected && isCorrect ? "border-emerald-500/60 bg-emerald-500/[0.04]" : "",
                isEvaluated && isSelected && !isCorrect ? "border-rose-500/60 bg-rose-500/[0.04]" : ""
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-colors mt-0.5",
                      isSelected
                        ? "bg-primary text-white border-primary"
                        : "border-muted-foreground/30 bg-card"
                    )}
                  >
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>

                  <p className="text-xs font-medium text-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>

                <span
                  className={cn(
                    "text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0",
                    badge.color
                  )}
                >
                  {badge.label}
                </span>
              </div>

              {/* Feedback after evaluation */}
              {isEvaluated && (
                <div className="pt-2 border-t border-border/50 text-[11px] flex items-start gap-1.5">
                  {isCorrect ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <p
                    className={cn(
                      "leading-relaxed font-sans",
                      isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                    )}
                  >
                    {item.feedbackVi}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onEvaluate}
          disabled={selectedIds.length === 0}
          className={cn(
            "w-full py-3 rounded-2xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer",
            selectedIds.length > 0
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.01]"
              : "bg-secondary text-muted-foreground border border-border cursor-not-allowed"
          )}
        >
          <Filter className="h-3.5 w-3.5" />
          <span>Thẩm Định Lựa Chọn Key Features</span>
        </button>
      </div>
    </div>
  );
}
