"use client";

import React from "react";
import {
  ExaminerPersonaId,
  EXAMINER_PERSONAS,
  ExaminerPersonaInfo,
} from "@/lib/aiExaminerClient";
import {
  UserCheck,
  Sparkles,
  Volume2,
  Award,
  BookOpen,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExaminerPersonaSelectorProps {
  selectedPersonaId: ExaminerPersonaId;
  onSelectPersona: (id: ExaminerPersonaId) => void;
  className?: string;
}

export function ExaminerPersonaSelector({
  selectedPersonaId,
  onSelectPersona,
  className,
}: ExaminerPersonaSelectorProps) {
  return (
    <div className={cn("space-y-3 select-none", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <UserCheck className="h-4 w-4 text-indigo-500" />
          <span>Chọn Giám Khảo & Trợ Giảng AI Đồng Hành:</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {EXAMINER_PERSONAS.map((persona) => {
          const isSelected = selectedPersonaId === persona.id;

          return (
            <button
              key={persona.id}
              type="button"
              onClick={() => onSelectPersona(persona.id)}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all space-y-2.5 relative overflow-hidden flex flex-col justify-between cursor-pointer",
                isSelected
                  ? "bg-indigo-500/[0.04] border-indigo-500 ring-2 ring-indigo-500/20 shadow-md"
                  : "bg-card border-border hover:border-border/80 hover:bg-secondary/40 text-foreground"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase">
                    Giọng {persona.accent}
                  </span>
                  <h4 className="text-xs font-black text-foreground pt-1">{persona.name}</h4>
                  <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 block">
                    {persona.roleTitle}
                  </span>
                </div>

                {isSelected && (
                  <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {persona.descriptionVi}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
