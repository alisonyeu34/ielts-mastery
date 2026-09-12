"use client";

import React from "react";
import {
  Layers,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { ToulminElements, ToulminPromptData } from "@/data/mockToulminPrompts";
import { ToulminElementCard, ToulminFieldKey } from "@/components/practice/writing-toulmin/ToulminElementCard";
import { ArgumentIntegrityModal } from "@/components/practice/writing-toulmin/ArgumentIntegrityModal";
import { ArgumentIntegrityReport } from "@/hooks/useToulminBuilder";
import { cn } from "@/lib/utils";

interface ToulminCanvasProps {
  prompt: ToulminPromptData;
  toulminData: ToulminElements;
  templateStyle: "standard" | "counter_first";
  integrityReport: ArgumentIntegrityReport;
  onSetField: (field: ToulminFieldKey, val: string) => void;
  onSetTemplateStyle: (style: "standard" | "counter_first") => void;
  onLoadSample: () => void;
  className?: string;
}

export function ToulminCanvas({
  prompt,
  toulminData,
  templateStyle,
  integrityReport,
  onSetField,
  onSetTemplateStyle,
  onLoadSample,
  className,
}: ToulminCanvasProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header with Style Switcher & Guide */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            6-Block Toulmin Canvas
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Khung Dựng 6 Khối Lập Luận Toulmin
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <ArgumentIntegrityModal />

          <button
            type="button"
            onClick={onLoadSample}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground bg-secondary px-3 py-1.5 rounded-xl border border-border flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span>Tải mẫu 6 khối</span>
          </button>
        </div>
      </div>

      {/* Paragraph Structure Flow Template Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/60 border border-border/80">
        <button
          type="button"
          onClick={() => onSetTemplateStyle("standard")}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
            templateStyle === "standard"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>Dạng 1: Thuận - Nghịch (Claim ➔ Data ➔ Counter ➔ Rebuttal)</span>
        </button>

        <button
          type="button"
          onClick={() => onSetTemplateStyle("counter_first")}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
            templateStyle === "counter_first"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>Dạng 2: Phản biện trước (Counter ➔ Rebuttal ➔ Claim ➔ Data)</span>
        </button>
      </div>

      {/* 6 Toulmin Element Cards */}
      <div className="space-y-4">
        <ToulminElementCard
          field="claim"
          value={toulminData.claim}
          onChange={(val) => onSetField("claim", val)}
        />

        <ToulminElementCard
          field="data"
          value={toulminData.data}
          onChange={(val) => onSetField("data", val)}
        />

        <ToulminElementCard
          field="warrant"
          value={toulminData.warrant}
          onChange={(val) => onSetField("warrant", val)}
          isWarning={integrityReport.hasMissingWarrant}
        />

        <ToulminElementCard
          field="backing"
          value={toulminData.backing}
          onChange={(val) => onSetField("backing", val)}
        />

        <ToulminElementCard
          field="counterArgument"
          value={toulminData.counterArgument}
          onChange={(val) => onSetField("counterArgument", val)}
        />

        <ToulminElementCard
          field="rebuttal"
          value={toulminData.rebuttal}
          onChange={(val) => onSetField("rebuttal", val)}
          isWarning={integrityReport.hasOrphanedCounter}
        />
      </div>
    </div>
  );
}
