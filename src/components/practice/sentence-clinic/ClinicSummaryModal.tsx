"use client";

import React from "react";
import { Trophy, CheckCircle2, RotateCcw, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { SurgeryAttemptRecord } from "@/hooks/useSentenceClinicSession";

interface ClinicSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: SurgeryAttemptRecord[];
  errorBankCount: number;
  onRestart: () => void;
}

export function ClinicSummaryModal({
  isOpen,
  onClose,
  history,
  errorBankCount,
  onRestart,
}: ClinicSummaryModalProps) {
  if (!isOpen) return null;

  const totalAttempted = history.length;
  const avgScore =
    totalAttempted > 0
      ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / totalAttempted)
      : 0;
  const avgBand =
    totalAttempted > 0
      ? (history.reduce((acc, curr) => acc + curr.estimatedBand, 0) / totalAttempted).toFixed(1)
      : "7.0";

  const totalCollocsUsed = history.reduce((acc, curr) => acc + curr.collocationsUsed.length, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center max-h-[90vh] overflow-y-auto">
        {/* Celebration Header */}
        <div className="space-y-2">
          <div className="h-16 w-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Hoàn Thành Xuất Sắc Ca Phẫu Thuật!
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Bạn đã hoàn tất phiên sửa câu học thuật và rèn luyện kỹ thuật paraphrase theo chuẩn khảo thí Cambridge IELTS.
          </p>
        </div>

        {/* Stats 4-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border space-y-0.5">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Số Ca Xử Lý</span>
            <div className="text-lg font-black text-foreground">{totalAttempted}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border space-y-0.5">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Độ Chuẩn Xác</span>
            <div className="text-lg font-black text-emerald-500">{avgScore}%</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border space-y-0.5">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Ước Lượng Band</span>
            <div className="text-lg font-black text-primary">Band {avgBand}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border space-y-0.5">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Collocations C1</span>
            <div className="text-lg font-black text-purple-500">{totalCollocsUsed}</div>
          </div>
        </div>

        {/* Dexie Sync Notification */}
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5 text-left">
          <ShieldCheck className="h-5 w-5 shrink-0" />
          <div>
            <strong className="block font-bold">Đồng Bộ Thành Công Vào Dexie DB & Error Bank</strong>
            <span className="text-[11px] text-muted-foreground">
              Đã ghi nhận nhật ký vào practice_logs và lưu {errorBankCount} lỗi sai vào error_bank để phục vụ vòng lặp FSRS.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 font-bold text-xs text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Luyện Tập Lại Ca Bệnh
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            Đóng & Quay Lại Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
