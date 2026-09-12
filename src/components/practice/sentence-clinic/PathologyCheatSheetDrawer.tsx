"use client";

import React from "react";
import {
  BookOpen,
  X,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { GRAMMAR_PATHOLOGIES } from "@/data/mockSentenceClinicData";
import { cn } from "@/lib/utils";

interface PathologyCheatSheetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function PathologyCheatSheetDrawer({
  isOpen,
  onClose,
  className,
}: PathologyCheatSheetDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl bg-card border-l border-border h-full shadow-2xl overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-foreground">
                  Cẩm Nang 5 Bệnh Ngữ Pháp Tử Thần
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Sổ tay nhận diện & hóa giải bẫy cấu trúc câu IELTS Band 8.0+ GRA
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Pathologies List */}
          <div className="space-y-4 text-xs">
            {GRAMMAR_PATHOLOGIES.map((pathology, idx) => (
              <div
                key={pathology.type}
                className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-3"
              >
                {/* Title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono font-bold text-xs">
                      {idx + 1}
                    </span>
                    <h4 className="font-extrabold text-foreground text-xs sm:text-sm">
                      {pathology.nameVi}
                    </h4>
                  </div>
                  <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border", pathology.badgeColor)}>
                    {pathology.nameEn}
                  </span>
                </div>

                {/* Mechanism */}
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {pathology.shortDescription}
                </p>

                {/* Bad Example */}
                <div className="p-2.5 rounded-xl bg-rose-500/[0.05] border border-rose-500/20 text-[11px] space-y-1">
                  <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                    <XCircle className="h-3 w-3" /> Câu sai kinh điển:
                  </span>
                  <p className="font-mono text-foreground/90 italic">"{pathology.badExample}"</p>
                </div>

                {/* Good Example */}
                <div className="p-2.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 text-[11px] space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Câu sửa chuẩn Band 8.0+:
                  </span>
                  <p className="font-mono text-foreground/90 font-semibold">"{pathology.goodExample}"</p>
                </div>

                {/* Cambridge Examiner Rule */}
                <p className="text-[10px] text-muted-foreground italic font-serif">
                  🔍 <strong>Tiêu chí chấm thi:</strong> {pathology.cambridgeRule}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bottom */}
        <div className="pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            Đã Nắm Rõ • Quay Lại Bắt Bọ Ngữ Pháp
          </button>
        </div>
      </div>
    </div>
  );
}
