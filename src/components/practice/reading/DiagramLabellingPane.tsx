"use client";

import React from "react";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Pin,
  Eye,
} from "lucide-react";
import { DiagramLabellingTask } from "@/data/mockCompletionPassages";
import { WordLimitBadge } from "@/components/practice/reading/WordLimitBadge";
import { QuestionEvaluation } from "@/hooks/useCompletionValidator";
import { cn } from "@/lib/utils";

interface DiagramLabellingPaneProps {
  task: DiagramLabellingTask;
  inputs: Record<string, string>;
  activeQuestionId: string | null;
  evaluations?: QuestionEvaluation[];
  isSubmitted: boolean;
  onInputChange: (questionId: string, value: string) => void;
  onSelectQuestion: (questionId: string) => void;
  className?: string;
}

export function DiagramLabellingPane({
  task,
  inputs,
  activeQuestionId,
  evaluations,
  isSubmitted,
  onInputChange,
  onSelectQuestion,
  className,
}: DiagramLabellingPaneProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header & Word Limit Instructions */}
      <div className="space-y-1.5 border-b border-border/80 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Diagram / Flow-Chart Labelling
          </span>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
            {task.wordLimitInstruction}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-foreground">
          {task.diagramTitle}
        </h3>
        <p className="text-xs text-muted-foreground">
          {task.diagramSubtitle}
        </p>
      </div>

      {/* Interactive SVG Diagram Viewport */}
      <div className="relative rounded-3xl border border-border bg-gradient-to-b from-card via-secondary/20 to-card p-4 sm:p-6 shadow-sm overflow-hidden select-none">
        {/* SVG Schematic Graphics */}
        <div className="relative w-full aspect-[16/9] min-h-[260px] rounded-2xl bg-secondary/30 border border-border/70 overflow-hidden flex items-center justify-center">
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full text-foreground/80 pointer-events-none"
          >
            <defs>
              <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="chamberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.05"
                strokeWidth="1"
              />
            </pattern>
            <rect width="800" height="450" fill="url(#grid)" />

            {/* Stage 1: Intake Pipe & Spiral Centrifuge (Pin 1) */}
            <path
              d="M 40 180 L 160 180 L 180 140 L 220 140 L 200 240 L 160 240 Z"
              fill="url(#pipeGrad)"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Spiral lines in centrifuge */}
            <path
              d="M 175 160 Q 190 190 175 220"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              strokeDasharray="4 4"
            />

            {/* Stage 2: Settlement Chamber (Pin 2) */}
            <rect
              x="280"
              y="120"
              width="200"
              height="220"
              rx="16"
              fill="url(#chamberGrad)"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Sediment layers at base */}
            <path
              d="M 280 300 Q 380 320 480 300 L 480 340 L 280 340 Z"
              fill="#d97706"
              fillOpacity="0.25"
            />

            {/* Connecting Pipe */}
            <line
              x1="220"
              y1="190"
              x2="280"
              y2="190"
              stroke="#6366f1"
              strokeWidth="4"
            />

            {/* Stage 3: Condenser Coil (Pin 3) */}
            <path
              d="M 540 100 Q 580 80 620 100 Q 660 120 540 150 Q 580 170 620 150"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="5"
            />
            <rect
              x="520"
              y="70"
              width="140"
              height="120"
              rx="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />

            {/* Vertical Flow Pipe to Condenser */}
            <path
              d="M 480 180 L 530 180 L 530 130"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
            />

            {/* Stage 4: Electrical Turbine Generator (Pin 4) */}
            <circle
              cx="690"
              cy="320"
              r="45"
              fill="url(#pipeGrad)"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Turbine blades */}
            <line
              x1="690"
              y1="280"
              x2="690"
              y2="360"
              stroke="currentColor"
              strokeWidth="3"
            />
            <line
              x1="650"
              y1="320"
              x2="730"
              y2="320"
              stroke="currentColor"
              strokeWidth="3"
            />

            {/* Flow to turbine */}
            <path
              d="M 600 190 L 600 320 L 645 320"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
            />

            {/* Direction Arrows */}
            <polygon points="120,175 135,180 120,185" fill="#6366f1" />
            <polygon points="255,185 270,190 255,195" fill="#6366f1" />
            <polygon points="600,260 595,275 605,275" fill="#10b981" />
          </svg>

          {/* Interactive Clickable Pins (Positioned over coordinates) */}
          {task.questions.map((q) => {
            const coords = q.pinCoordinates || { x: 50, y: 50 };
            const isSelected = activeQuestionId === q.id;
            const evalItem = evaluations?.find((e) => e.questionId === q.id);
            const isFilled = (inputs[q.id] || "").trim().length > 0;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(q.id)}
                style={{ top: `${coords.y}%`, left: `${coords.x}%` }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition-all duration-200 cursor-pointer border-2 z-10 select-none",
                  // Selected
                  isSelected &&
                    "bg-indigo-600 text-white border-white scale-110 ring-4 ring-indigo-500/40 shadow-indigo-600/50",
                  // Normal filled
                  !isSelected &&
                    !isSubmitted &&
                    isFilled &&
                    "bg-card text-indigo-600 dark:text-indigo-400 border-indigo-500 shadow-sm",
                  // Normal unfilled
                  !isSelected &&
                    !isSubmitted &&
                    !isFilled &&
                    "bg-card text-foreground border-border hover:border-indigo-500 hover:scale-105",
                  // Submitted & Correct
                  isSubmitted &&
                    evalItem?.isCorrect &&
                    "bg-emerald-600 text-white border-emerald-400 shadow-emerald-600/30",
                  // Submitted & Wrong
                  isSubmitted &&
                    evalItem &&
                    !evalItem.isCorrect &&
                    "bg-rose-600 text-white border-rose-400 shadow-rose-600/30"
                )}
              >
                <Pin className="h-3 w-3" />
                <span>Pin {q.questionNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Fields for the 4 Pins */}
      <div className="space-y-4 pt-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-indigo-500" />
          Nhập từ tương ứng cho từng bộ phận trên sơ đồ:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {task.questions.map((q) => {
            const isSelected = activeQuestionId === q.id;
            const evalItem = evaluations?.find((e) => e.questionId === q.id);
            const value = inputs[q.id] || "";

            return (
              <div
                key={q.id}
                onClick={() => onSelectQuestion(q.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-200 space-y-2 bg-card",
                  isSelected && !isSubmitted && "border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm",
                  !isSelected && !isSubmitted && "border-border/80 hover:border-border",
                  isSubmitted && evalItem?.isCorrect && "border-emerald-500/40 bg-emerald-500/[0.02]",
                  isSubmitted && evalItem && !evalItem.isCorrect && "border-rose-500/40 bg-rose-500/[0.02]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    {q.label}
                  </span>
                  <WordLimitBadge input={value} maxWords={q.maxWords} />
                </div>

                <input
                  type="text"
                  value={value}
                  onChange={(e) => onInputChange(q.id, e.target.value)}
                  disabled={isSubmitted}
                  placeholder="Nhập 1 từ duy nhất từ bài đọc..."
                  className="w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                />

                {/* Post-submit feedback */}
                {isSubmitted && evalItem && (
                  <div className="pt-2 border-t border-border/60 text-xs space-y-1">
                    {evalItem.isCorrect ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Chính xác!</span>
                      </div>
                    ) : (
                      <div className="space-y-1 text-rose-600 dark:text-rose-400">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>Đáp án đúng: {evalItem.expectedAnswers.join(" / ")}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {evalItem.explanationDetail}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
