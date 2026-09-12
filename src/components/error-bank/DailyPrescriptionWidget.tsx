"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Sparkles,
  Clock,
  ArrowRight,
  ShieldAlert,
  Zap,
  Headphones,
  FileCode2,
  Crosshair,
  BookOpen,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { ErrorItem, UserProgress, ErrorClassification } from "@/types/database";
import { generateDailyPrescription, PrescriptionDrillItem } from "@/lib/adaptiveDispatcher";

interface DailyPrescriptionWidgetProps {
  errors: ErrorItem[];
  progress?: UserProgress | null;
  onStartArenaWithCategory?: (category: ErrorClassification) => void;
}

export function DailyPrescriptionWidget({
  errors,
  progress,
  onStartArenaWithCategory,
}: DailyPrescriptionWidgetProps) {
  const prescription = useMemo(
    () => generateDailyPrescription(errors, progress),
    [errors, progress]
  );

  const getDrillIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert":
        return <ShieldAlert className="h-5 w-5 text-rose-500" />;
      case "FileCode2":
        return <FileCode2 className="h-5 w-5 text-amber-500" />;
      case "Headphones":
        return <Headphones className="h-5 w-5 text-purple-500" />;
      case "Crosshair":
        return <Crosshair className="h-5 w-5 text-blue-500" />;
      case "BookOpen":
        return <BookOpen className="h-5 w-5 text-emerald-500" />;
      default:
        return <Zap className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-background p-5 sm:p-6 shadow-sm space-y-5">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Stethoscope className="h-4 w-4" />
            </span>
            <h2 className="font-black text-base text-foreground tracking-tight">
              Phác Đồ Luyện Tập Khắc Phục Lỗ Hổng Hàng Ngày
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Hệ thống tự động phân tích ma trận lỗi sai và chỉ định 3 bài tập vi mô ưu tiên cho ngày hôm nay.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border uppercase ${
              prescription.urgencyLevel === "HIGH"
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                : prescription.urgencyLevel === "MODERATE"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
            }`}
          >
            Mức Độ Ưu Tiên: {prescription.urgencyLevel}
          </span>
        </div>
      </div>

      {/* Clinical Diagnosis Callout */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3.5 flex items-start gap-3">
        <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs text-foreground">
          <p className="font-bold text-primary">Kết Luận Chuẩn Đoán Thích Ứng:</p>
          <p className="text-muted-foreground leading-relaxed">
            {prescription.clinicalDiagnosis}
          </p>
        </div>
      </div>

      {/* 3 Prescription Drill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {prescription.drills.map((drill) => (
          <div
            key={drill.id}
            className="rounded-2xl border border-border bg-card/90 p-4 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 hover:shadow-md transition-all group"
          >
            {/* Top Tag & Order */}
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-secondary font-mono text-xs font-black text-foreground">
                #{drill.orderNumber}
              </span>

              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${drill.priorityColor}`}
              >
                {drill.priority}
              </span>
            </div>

            {/* Drill Content */}
            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-secondary/60 shrink-0 group-hover:scale-110 transition-transform">
                  {getDrillIcon(drill.icon)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                    {drill.targetSkill}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-snug">
                    {drill.title}
                  </h3>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {drill.diagnosticRationale}
              </p>
            </div>

            {/* Meta and Action Footer */}
            <div className="space-y-3 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> ~{drill.estimatedMinutes} phút
                </span>
                <span className="font-bold text-foreground">
                  Mục tiêu: {drill.targetCount} câu
                </span>
              </div>

              {drill.id === "rx_drill_01_arena" && onStartArenaWithCategory ? (
                <button
                  type="button"
                  onClick={() => onStartArenaWithCategory(drill.category)}
                  className="w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <span>{drill.actionTitle}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <Link
                  href={drill.actionHref}
                  className="w-full py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center justify-center gap-1.5 border border-border/80 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>{drill.actionTitle}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
