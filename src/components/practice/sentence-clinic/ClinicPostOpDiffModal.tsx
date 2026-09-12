"use client";

import React from "react";
import { X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { SentenceSurgeryCase } from "@/data/mockSentenceSurgeryData";

interface ClinicPostOpDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: SentenceSurgeryCase;
  userRevisedDraft: string;
}

export function ClinicPostOpDiffModal({
  isOpen,
  onClose,
  caseData,
  userRevisedDraft,
}: ClinicPostOpDiffModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="space-y-0.5">
            <h3 className="text-lg font-black text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Kính Hiển Vi So Sánh 3 Chuẩn Band Điểm
            </h3>
            <p className="text-xs text-muted-foreground">
              Đối chiếu câu sửa của bạn với các giải pháp chuẩn hóa Cambridge
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-4 text-xs">
          {/* User's Current Draft */}
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1.5">
            <span className="font-bold text-primary uppercase text-[10px] tracking-wider">
              Phiên Bản Của Bạn:
            </span>
            <p className="font-serif text-sm sm:text-base text-foreground leading-relaxed">
              {userRevisedDraft || "(Chưa có nội dung chỉnh sửa)"}
            </p>
          </div>

          {/* Band 6.0 */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1.5">
            <div className="flex items-center justify-between font-bold text-foreground">
              <span className="text-amber-500 font-mono text-[11px]">Band 6.0 (Chuẩn ngữ pháp cơ bản)</span>
            </div>
            <p className="font-serif text-sm text-foreground leading-relaxed">
              {caseData.modelSolutions.band60}
            </p>
          </div>

          {/* Band 7.0 */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1.5">
            <div className="flex items-center justify-between font-bold text-foreground">
              <span className="text-primary font-mono text-[11px]">Band 7.0 (Dùng Collocations C1 Tự Nhiên)</span>
            </div>
            <p className="font-serif text-sm text-foreground leading-relaxed">
              {caseData.modelSolutions.band70}
            </p>
          </div>

          {/* Band 8.5+ */}
          <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-purple-500 font-mono text-[11px]">
              <span>Band 8.5+ (Đỉnh Cao Cú Pháp Học Thuật C2)</span>
            </div>
            <p className="font-serif text-sm text-foreground leading-relaxed font-semibold">
              {caseData.modelSolutions.band85}
            </p>
          </div>

          {/* Pedagogical Takeaway */}
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-1">
            <strong className="text-foreground text-[11px] block">💡 Lời Khuyên Sư Phạm:</strong>
            <p className="text-muted-foreground leading-relaxed">
              {caseData.pedagogicalAnalysis}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-border/60">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Đã Hiểu & Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
}
