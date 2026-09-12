"use client";

import React from "react";
import {
  ProcessStageItem,
  Task1PMExercise,
} from "@/data/mockProcessMapData";
import {
  ArrowRight,
  Repeat,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Copy,
  PlusCircle,
  Truck,
  Scissors,
  Droplets,
  Flame,
  Package,
  Egg,
  Bug,
  Shield,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveProcessPipelineProps {
  exercise: Task1PMExercise;
  selectedStepIndex: number | null;
  onSelectStep: (index: number) => void;
  onInsertSignpost?: (text: string) => void;
  className?: string;
}

export function InteractiveProcessPipeline({
  exercise,
  selectedStepIndex,
  onSelectStep,
  onInsertSignpost,
  className,
}: InteractiveProcessPipelineProps) {
  const stages = exercise.stages || [];
  const isNatural = exercise.diagramType === "process_natural";
  const activeStage =
    selectedStepIndex !== null && stages[selectedStepIndex]
      ? stages[selectedStepIndex]
      : stages[0];

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case "Truck":
        return <Truck className="h-4 w-4" />;
      case "Scissors":
        return <Scissors className="h-4 w-4" />;
      case "Droplets":
        return <Droplets className="h-4 w-4" />;
      case "Sparkles":
        return <Sparkles className="h-4 w-4" />;
      case "Flame":
        return <Flame className="h-4 w-4" />;
      case "Package":
        return <Package className="h-4 w-4" />;
      case "Egg":
        return <Egg className="h-4 w-4" />;
      case "Bug":
        return <Bug className="h-4 w-4" />;
      case "Shield":
        return <Shield className="h-4 w-4" />;
      case "Wind":
        return <Wind className="h-4 w-4" />;
      default:
        return <Layers className="h-4 w-4" />;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3.5">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            {isNatural ? "Vòng Đời Khép Kín (Cyclical Life Cycle)" : "Quy Trình Tuyến Tính (Linear Process)"}
          </span>
          <h3 className="text-base font-extrabold text-foreground mt-1">
            {exercise.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <span>Tổng số giai đoạn:</span>
          <strong className="text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
            {stages.length} Bước
          </strong>
        </div>
      </div>

      {/* SVG / Flex Stage Nodes Flowchart */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-indigo-500" />
            <span>Sơ Đồ Luồng Các Giai Đoạn (Bấm vào từng bước để mổ xẻ):</span>
          </span>

          {isNatural && (
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Repeat className="h-3.5 w-3.5" />
              <span>Vòng lặp khép kín</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {stages.map((st, idx) => {
            const isSelected = selectedStepIndex === idx;

            return (
              <button
                key={st.stepNumber}
                type="button"
                onClick={() => onSelectStep(idx)}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[95px] cursor-pointer group",
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 scale-102"
                    : "bg-card border-border hover:border-indigo-500/40 hover:bg-secondary/60 text-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-[10px] font-mono font-extrabold h-5 w-5 rounded-full flex items-center justify-center",
                      isSelected ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {st.stepNumber}
                  </span>

                  <div
                    className={cn(
                      "p-1 rounded-lg",
                      isSelected ? "text-white" : "text-indigo-600 dark:text-indigo-400"
                    )}
                  >
                    {getStageIcon(st.iconName)}
                  </div>
                </div>

                <div className="space-y-0.5 mt-2">
                  <h5
                    className={cn(
                      "text-[11px] font-bold line-clamp-2 leading-tight",
                      isSelected ? "text-white" : "text-foreground"
                    )}
                  >
                    {st.title}
                  </h5>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detailed Dissection Card */}
      {activeStage && (
        <div className="p-5 rounded-2xl bg-indigo-500/[0.03] border border-indigo-500/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-mono font-bold shadow-sm">
                {activeStage.stepNumber}
              </span>
              <div>
                <h4 className="text-sm font-extrabold text-foreground">
                  Giai đoạn {activeStage.stepNumber}: {activeStage.title}
                </h4>
                <p className="text-[11px] text-muted-foreground">{activeStage.descriptionVi}</p>
              </div>
            </div>

            <span
              className={cn(
                "text-[10px] font-bold px-2.5 py-1 rounded-full border self-start sm:self-auto",
                activeStage.isPassiveRecommended
                  ? "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
              )}
            >
              {activeStage.isPassiveRecommended ? "Khuyên dùng: Thể bị động (Passive)" : "Khuyên dùng: Thể chủ động (Active)"}
            </span>
          </div>

          {/* Grammar & Verb Form Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase block">
                CẤU TRÚC BỊ ĐỘNG HỌC THUẬT (PASSIVE FORM):
              </span>
              <p className="font-serif font-bold text-foreground text-xs leading-relaxed">
                "{activeStage.passiveForm}"
              </p>
              <span className="text-[10px] text-muted-foreground block">
                Động từ gốc: <code className="text-indigo-500 font-bold">{activeStage.coreVerb}</code>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                CẤU TRÚC CHỦ ĐỘNG TỰ NHIÊN (ACTIVE FORM):
              </span>
              <p className="font-serif font-bold text-foreground text-xs leading-relaxed">
                "{activeStage.activeForm}"
              </p>
              <span className="text-[10px] text-muted-foreground block">
                Thiết bị / Tác nhân: {activeStage.keyEquipmentOrActors?.join(", ") || "Tự nhiên"}
              </span>
            </div>
          </div>

          {/* Suggested Sequencing Signposts for this step */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>Liên từ nối gợi ý cho bước này (Click để chèn nhanh):</span>
            </span>

            <div className="flex flex-wrap gap-1.5">
              {activeStage.suggestedSignposts.map((sp, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => onInsertSignpost && onInsertSignpost(sp + ", ")}
                  className="px-2.5 py-1 rounded-lg bg-card hover:bg-indigo-500/10 border border-border/80 hover:border-indigo-500/30 text-foreground font-mono text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                  title="Chèn liên từ vào khung soạn thảo"
                >
                  <PlusCircle className="h-3 w-3 text-indigo-500" />
                  <span>{sp}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
