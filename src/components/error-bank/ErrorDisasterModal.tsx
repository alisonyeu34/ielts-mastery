"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  RotateCcw,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorDisasterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetAllMastery: () => Promise<void>;
  onClearAllErrors: () => Promise<void>;
  className?: string;
}

export function ErrorDisasterModal({
  isOpen,
  onClose,
  onResetAllMastery,
  onClearAllErrors,
  className,
}: ErrorDisasterModalProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleReset = async () => {
    setIsProcessing(true);
    await onResetAllMastery();
    setIsProcessing(false);
    onClose();
  };

  const handleClear = async () => {
    setIsProcessing(true);
    await onClearAllErrors();
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                Tùy Chọn Ngân Hàng Lỗi
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Quản trị dữ liệu lỗ hổng kiến thức
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

        {/* Options */}
        <div className="space-y-4 text-xs">
          {/* 1. Reset all mastery */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>Reset Tiến Độ Làm Chủ (0/2)</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Đặt lại toàn bộ các câu hỏi về trạng thái chưa làm chủ để bạn có thể bắt đầu một đợt tổng ôn luyện lại từ đầu.
            </p>
            <button
              type="button"
              onClick={handleReset}
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors cursor-pointer"
            >
              Reset Tất Cả Về 0/2
            </button>
          </div>

          {/* 2. Clear all */}
          <div className="p-4 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
              <Trash2 className="h-4 w-4" />
              <span>Xóa Sạch Ngân Hàng Lỗi</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Xóa hoàn toàn mọi câu lỗi sai đã lưu trong cơ sở dữ liệu IndexedDB của trình duyệt.
            </p>
            <button
              type="button"
              onClick={handleClear}
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Xóa Toàn Bộ Lỗi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
