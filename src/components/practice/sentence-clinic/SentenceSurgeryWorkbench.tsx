"use client";

import React from "react";
import {
  Wand2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Plus,
  Zap,
  RotateCcw,
  Eye,
  Layers,
} from "lucide-react";
import { SentenceSurgeryCase } from "@/data/mockSentenceSurgeryData";
import { SentenceDiagnosticResult } from "@/lib/sentenceDiagnosticParser";
import { cn } from "@/lib/utils";

interface SentenceSurgeryWorkbenchProps {
  caseData: SentenceSurgeryCase;
  draft: string;
  onDraftChange: (text: string) => void;
  diagnosticResult: SentenceDiagnosticResult | null;
  onEvaluate: () => void;
  onSaveAndAdvance: () => void;
  onApplyCollocation: (colloc: string) => void;
  onSyncCollocationToFSRS: (colloc: string, topic: string) => void;
  onOpenDiffModal: () => void;
}

export function SentenceSurgeryWorkbench({
  caseData,
  draft,
  onDraftChange,
  diagnosticResult,
  onEvaluate,
  onSaveAndAdvance,
  onApplyCollocation,
  onSyncCollocationToFSRS,
  onOpenDiffModal,
}: SentenceSurgeryWorkbenchProps) {
  const wordCount = draft.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6">
      {/* Title & Collocation Palette */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-primary" />
            Bàn Mổ Cú Pháp & Bơm Collocations C1
          </h3>
          <span className="text-xs font-mono text-muted-foreground">
            {wordCount} từ
          </span>
        </div>

        {/* Collocation Palette */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Bơm Cụm Collocations C1 Đề Xuất (Click để chèn vào câu):
          </span>
          <div className="flex flex-wrap gap-2">
            {caseData.collocationPalette.map((colloc, idx) => (
              <div
                key={idx}
                className="inline-flex items-center rounded-xl bg-secondary/70 hover:bg-secondary border border-border text-xs font-medium text-foreground transition-all overflow-hidden group"
              >
                <button
                  type="button"
                  onClick={() => onApplyCollocation(colloc)}
                  className="px-3 py-1.5 text-left hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Chèn cụm từ vào bài"
                >
                  <Plus className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
                  <span>{colloc}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSyncCollocationToFSRS(colloc, caseData.contextTopic)}
                  className="px-2 py-1.5 bg-border/40 hover:bg-primary hover:text-primary-foreground border-l border-border transition-colors cursor-pointer text-[10px] font-mono"
                  title="Lưu vào Sổ từ vựng FSRS"
                >
                  +FSRS
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editing Textarea */}
      <div className="space-y-2">
        <textarea
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder="Nhập phiên bản câu đã phẫu thuật và nâng cấp chuẩn Band 7.5+ tại đây..."
          rows={4}
          className="w-full rounded-2xl border border-border bg-background p-4 text-sm sm:text-base font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed resize-y"
        />

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onEvaluate}
            disabled={!draft.trim()}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <Zap className="h-4 w-4" />
            Thẩm Định Cú Pháp Tức Thì
          </button>

          <button
            type="button"
            onClick={onOpenDiffModal}
            className="px-4 py-2.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5 text-primary" />
            So Kính Hiển Vi 3 Mức Band Mẫu
          </button>
        </div>
      </div>

      {/* Diagnostic Evaluation Result Panel */}
      {diagnosticResult && (
        <div
          className={cn(
            "p-5 rounded-2xl border space-y-4 animate-in fade-in duration-200",
            diagnosticResult.isClearOfCriticalFlaws
              ? "bg-emerald-500/5 border-emerald-500/20"
              : "bg-rose-500/5 border-rose-500/20"
          )}
        >
          {/* Header Score Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "h-9 w-9 rounded-xl flex items-center justify-center font-black text-sm",
                  diagnosticResult.isClearOfCriticalFlaws
                    ? "bg-emerald-500 text-white"
                    : "bg-rose-500 text-white"
                )}
              >
                {diagnosticResult.score}%
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  {diagnosticResult.isClearOfCriticalFlaws
                    ? "Phẫu Thuật Thành Công! Đã Diệt Sạch Mầm Mống Bệnh"
                    : "Vết Mổ Chưa Sạch! Vẫn Còn Lỗi Ngữ Pháp Cơ Bản"}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Ước lượng Band điểm tiêu chí GRA: <strong className="text-primary">Band {diagnosticResult.estimatedBand.toFixed(1)}</strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onSaveAndAdvance}
              className="px-4 py-2 rounded-xl bg-foreground text-background font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <span>Lưu Bệnh Án & Sang Ca Tiếp</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Detected Pathologies List */}
          {diagnosticResult.detectedPathologies.length > 0 ? (
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                Các điểm cần lưu ý triệt tiêu:
              </span>
              <div className="space-y-2">
                {diagnosticResult.detectedPathologies.map((pathology, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl bg-card border border-border text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>{pathology.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                        {pathology.severity}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">{pathology.message}</p>
                    <p className="text-primary text-[11px] font-medium">💡 {pathology.remedy}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Câu văn đã giải quyết triệt để lỗi bệnh, cấu trúc ngữ pháp đạt chuẩn học thuật Cambridge.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
