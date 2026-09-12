"use client";

import React from "react";
import { X, BookOpen, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { ShorthandRule } from "@/data/mockSection4DenseData";
import { cn } from "@/lib/utils";

interface ShorthandDictionaryModalProps {
  isOpen: boolean;
  rules: ShorthandRule[];
  onClose: () => void;
}

export function ShorthandDictionaryModal({
  isOpen,
  rules,
  onClose,
}: ShorthandDictionaryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Cẩm Nang Tốc Ký & Ký Hiệu Học Thuật (Academic Shorthand)
              </h3>
              <span className="text-[11px] text-muted-foreground">
                Chuẩn hóa ký hiệu take-notes tốc độ cao trong bài giảng Section 4
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shorthand Golden Rules */}
        <div className="p-3.5 rounded-2xl bg-purple-500/[0.05] border border-purple-500/20 text-xs space-y-1">
          <span className="font-bold text-purple-600 dark:text-purple-400 block">
            💡 3 Nguyên Tắc Vàng Khi Ghi Chú Section 4:
          </span>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            1. <strong>Tuyệt đối không chép từng từ (verbatim):</strong> Chỉ ghi lại danh từ gốc, số liệu, và mối quan hệ nguyên nhân - kết quả.
            <br />
            2. <strong>Bỏ qua mạo từ / giới từ:</strong> Bỏ qua <em>a, an, the, in, of</em> trong lúc ghi nháp.
            <br />
            3. <strong>Tận dụng ký hiệu mũi tên:</strong> Mũi tên giúp kết nối các khối logic mà không cần viết liên từ.
          </p>
        </div>

        {/* Rules Table */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Bảng Ký Hiệu & Phím Tắt Tương Ứng:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-extrabold text-purple-600 dark:text-purple-400">
                    {rule.symbol}
                  </span>
                  <code className="text-[10px] bg-card px-1.5 py-0.5 rounded border border-border">
                    Gõ: {rule.shortcut}
                  </code>
                </div>

                <p className="text-[11px] font-semibold text-foreground">
                  {rule.meaning}
                </p>

                <p className="font-mono text-[10px] text-muted-foreground pt-0.5">
                  Ví dụ: <em>{rule.example}</em>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Đã nắm quy tắc
          </button>
        </div>
      </div>
    </div>
  );
}
