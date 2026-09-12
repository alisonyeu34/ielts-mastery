"use client";

import React from "react";
import { ToulminEvaluationResult } from "@/lib/toulminLogicChecker";
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DialecticalBalanceMeterProps {
  evaluation: ToulminEvaluationResult;
  className?: string;
}

export function DialecticalBalanceMeter({
  evaluation,
  className,
}: DialecticalBalanceMeterProps) {
  const blocks = [
    { name: "Claim", label: "Luận điểm", filled: evaluation.hasClaim, color: "text-blue-500" },
    { name: "Data", label: "Dữ kiện", filled: evaluation.hasData, color: "text-purple-500" },
    { name: "Warrant", label: "Cầu nối logic", filled: evaluation.hasWarrant, color: "text-emerald-500" },
    { name: "Backing", label: "Hậu thuẫn", filled: evaluation.hasBacking, color: "text-indigo-500" },
    { name: "Counter", label: "Phản đề", filled: evaluation.hasCounter, color: "text-amber-500" },
    { name: "Rebuttal", label: "Bác bỏ", filled: evaluation.hasRebuttal, color: "text-rose-500" },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-primary" />
          <span className="font-bold text-xs text-foreground">
            Thước Đo Độ Sắc Bén Phản Biện (Dialectical Rigor Meter)
          </span>
        </div>

        <span className="text-xs font-mono font-black text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
          Band {evaluation.estimatedBand.toFixed(1)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground font-bold">
          <span>Độ Hoàn Thiện Khung Toulmin:</span>
          <span>{evaluation.dialecticalScore}% / 100%</span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden border border-border">
          <div
            style={{ width: `${evaluation.dialecticalScore}%` }}
            className={cn(
              "h-full transition-all duration-300",
              evaluation.dialecticalScore >= 80
                ? "bg-emerald-500"
                : evaluation.dialecticalScore >= 50
                ? "bg-amber-500"
                : "bg-rose-500"
            )}
          />
        </div>
      </div>

      {/* 6 Block Icons Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {blocks.map((b) => (
          <div
            key={b.name}
            className={cn(
              "p-2 rounded-xl border text-center transition-all space-y-0.5",
              b.filled
                ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                : "border-border/60 bg-secondary/10 opacity-60"
            )}
          >
            <div className="flex items-center justify-center">
              {b.filled ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
            <span className="text-[10px] font-mono font-bold text-foreground block">
              {b.name}
            </span>
            <span className="text-[9px] text-muted-foreground block truncate">
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {/* Concession without Rebuttal Warning */}
      {evaluation.hasConcessionWithoutRebuttal && (
        <div className="p-3 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span className="text-[11px] leading-snug">
            <strong>Nguy hiểm:</strong> Bạn đã nêu Counter-argument nhưng chưa viết Rebuttal! Giám khảo sẽ coi đây là mâu thuẫn lập trường và trừ điểm TR.
          </span>
        </div>
      )}
    </div>
  );
}
