"use client";

import React from "react";
import { ToulminPromptItem, ToulminParts } from "@/data/mockToulminData";
import {
  Sparkles,
  Layers,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToulminModularCanvasProps {
  topic: ToulminPromptItem;
  parts: ToulminParts;
  activeBlock: keyof ToulminParts | null;
  wordCountByBlock: Record<keyof ToulminParts, number>;
  onSelectBlock: (block: keyof ToulminParts) => void;
  onUpdateBlock: (block: keyof ToulminParts, text: string) => void;
  onLoadSample: () => void;
  className?: string;
}

export function ToulminModularCanvas({
  topic,
  parts,
  activeBlock,
  wordCountByBlock,
  onSelectBlock,
  onUpdateBlock,
  onLoadSample,
  className,
}: ToulminModularCanvasProps) {
  const blocksConfig: Array<{
    key: keyof ToulminParts;
    nameEn: string;
    nameVi: string;
    subLabelVi: string;
    placeholder: string;
    colorBorder: string;
    colorBg: string;
    badgeBg: string;
    textColor: string;
    ringColor: string;
    minWords: number;
  }> = [
    {
      key: "claim",
      nameEn: "1. CLAIM",
      nameVi: "Luận Điểm Cốt Lõi",
      subLabelVi: "Khẳng định trực diện giải quyết câu hỏi của đề bài",
      placeholder: "Khẳng định lập trường dứt khoát của đoạn văn...",
      colorBorder: "border-blue-500/30",
      colorBg: "bg-blue-500/[0.02]",
      badgeBg: "bg-blue-500 text-white",
      textColor: "text-blue-600 dark:text-blue-400",
      ringColor: "ring-blue-500/40",
      minWords: 10,
    },
    {
      key: "data",
      nameEn: "2. DATA / GROUNDS",
      nameVi: "Dữ Kiện / Thực Nghiệm",
      subLabelVi: "Nghiên cứu, số liệu hoặc hiện tượng xã hội khách quan",
      placeholder: "Cung cấp bằng chứng thực nghiệm khách quan (Recent empirical studies...)...",
      colorBorder: "border-purple-500/30",
      colorBg: "bg-purple-500/[0.02]",
      badgeBg: "bg-purple-500 text-white",
      textColor: "text-purple-600 dark:text-purple-400",
      ringColor: "ring-purple-500/40",
      minWords: 15,
    },
    {
      key: "warrant",
      nameEn: "3. WARRANT",
      nameVi: "Cầu Nối Logic (Cơ Chế)",
      subLabelVi: "Nguyên lý ngầm định giải thích tại sao dữ kiện dẫn đến luận điểm",
      placeholder: "Giải thích cơ chế ngầm định (Because financial liquidity alleviates...)...",
      colorBorder: "border-emerald-500/30",
      colorBg: "bg-emerald-500/[0.02]",
      badgeBg: "bg-emerald-500 text-white",
      textColor: "text-emerald-600 dark:text-emerald-400",
      ringColor: "ring-emerald-500/40",
      minWords: 15,
    },
    {
      key: "backing",
      nameEn: "4. BACKING",
      nameVi: "Hậu Thuẫn Nguyên Lý",
      subLabelVi: "Cơ sở lý thuyết kinh tế/xã hội/pháp lý củng cố cho Warrant",
      placeholder: "Hậu thuẫn lý thuyết học thuật (This principle is substantiated by literature...)...",
      colorBorder: "border-indigo-500/30",
      colorBg: "bg-indigo-500/[0.02]",
      badgeBg: "bg-indigo-500 text-white",
      textColor: "text-indigo-600 dark:text-indigo-400",
      ringColor: "ring-indigo-500/40",
      minWords: 10,
    },
    {
      key: "counterArgument",
      nameEn: "5. COUNTER-ARGUMENT",
      nameVi: "Phản Đề Đối Lập",
      subLabelVi: "Thừa nhận một góc nhìn trái chiều hợp lý của phe đối lập",
      placeholder: "Thừa nhận quan điểm đối lập (Admittedly, detractors legitimately caution that...)...",
      colorBorder: "border-amber-500/30",
      colorBg: "bg-amber-500/[0.02]",
      badgeBg: "bg-amber-500 text-white",
      textColor: "text-amber-600 dark:text-amber-400",
      ringColor: "ring-amber-500/40",
      minWords: 10,
    },
    {
      key: "rebuttal",
      nameEn: "6. REBUTTAL",
      nameVi: "Bác Bỏ Chốt Hạ",
      subLabelVi: "Vạch trần lỗ hổng hoặc tính ngắn hạn của phản đề để chốt hạ",
      placeholder: "Bác bỏ triệt để phản đề (Nonetheless, this apprehension is rendered untenable when...)...",
      colorBorder: "border-rose-500/30",
      colorBg: "bg-rose-500/[0.02]",
      badgeBg: "bg-rose-500 text-white",
      textColor: "text-rose-600 dark:text-rose-400",
      ringColor: "ring-rose-500/40",
      minWords: 15,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Toulmin Modular Canvas • 6 Khối Lập Luận
          </span>
          <h3 className="text-sm sm:text-base font-black text-foreground pt-1">
            Mô Hình Lập Luận C1/C2 Đa Chiều Toulmin
          </h3>
        </div>

        <button
          type="button"
          onClick={onLoadSample}
          className="text-[11px] font-mono text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="h-3.5 w-3.5" /> Điền dàn ý mẫu Band 8.5+
        </button>
      </div>

      {/* 6 Modular Input Blocks */}
      <div className="space-y-4">
        {blocksConfig.map((blk) => {
          const isActive = activeBlock === blk.key;
          const wordCount = wordCountByBlock[blk.key] || 0;
          const isSatisfied = wordCount >= blk.minWords;

          return (
            <div
              key={blk.key}
              onClick={() => onSelectBlock(blk.key)}
              className={cn(
                "p-4 rounded-2xl border transition-all duration-200 space-y-2 cursor-pointer",
                blk.colorBorder,
                blk.colorBg,
                isActive ? `ring-2 ${blk.ringColor} shadow-xs` : "opacity-90 hover:opacity-100"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-mono font-black text-[10px] px-2 py-0.5 rounded-md",
                      blk.badgeBg
                    )}
                  >
                    {blk.nameEn}
                  </span>
                  <span className={cn("font-bold text-xs", blk.textColor)}>
                    {blk.nameVi}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-muted-foreground">
                    {wordCount} từ (Chuẩn: {blk.minWords}+)
                  </span>
                  {isSatisfied ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <span className="text-muted-foreground/60">Chưa đủ</span>
                  )}
                </div>
              </div>

              <span className="text-[11px] text-muted-foreground block">
                {blk.subLabelVi}
              </span>

              <textarea
                rows={2}
                value={parts[blk.key]}
                onFocus={() => onSelectBlock(blk.key)}
                onChange={(e) => onUpdateBlock(blk.key, e.target.value)}
                placeholder={blk.placeholder}
                className="w-full text-xs sm:text-sm p-3 rounded-xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
