"use client";

import React from "react";
import { Task2PEELPrompt } from "@/data/mockTask2PEELData";
import { GitBranch, ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogicChainVisualizerProps {
  causalChain: {
    rootCause: string;
    directMechanism: string;
    ultimateImpact: string;
  };
  className?: string;
}

export function LogicChainVisualizer({
  causalChain,
  className,
}: LogicChainVisualizerProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-primary" />
          <span className="font-bold text-xs text-foreground">
            Sơ Đồ Chuỗi Nhân Quả (Causal Domino Chain)
          </span>
        </div>

        <span className="text-[10px] font-mono text-muted-foreground">
          Tránh lỗi nhảy cóc logic
        </span>
      </div>

      {/* 3-Step Domino Chain */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 relative">
        {/* Domino 1: Root Cause */}
        <div className="p-3.5 rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] space-y-1.5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              1. Nguyên Nhân Gốc (Cause)
            </span>
            <p className="text-xs font-bold text-foreground leading-snug">
              {causalChain.rootCause}
            </p>
          </div>
          <span className="text-[10px] text-muted-foreground">Khởi nguồn hiện tượng</span>
        </div>

        {/* Domino 2: Direct Mechanism */}
        <div className="p-3.5 rounded-2xl border border-purple-500/30 bg-purple-500/[0.04] space-y-1.5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              2. Cơ Chế Trung Gian (Mechanism)
            </span>
            <p className="text-xs font-bold text-foreground leading-snug">
              {causalChain.directMechanism}
            </p>
          </div>
          <span className="text-[10px] text-muted-foreground">Tác động diễn tiến</span>
        </div>

        {/* Domino 3: Ultimate Impact */}
        <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] space-y-1.5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              3. Hệ Quả Cuối Cùng (Impact)
            </span>
            <p className="text-xs font-bold text-foreground leading-snug">
              {causalChain.ultimateImpact}
            </p>
          </div>
          <span className="text-[10px] text-muted-foreground">Kết luận logic</span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-secondary/30 border border-border text-[11px] text-muted-foreground leading-relaxed">
        💡 <strong>Mẹo sư phạm:</strong> Phần <strong>Explain</strong> phải luôn đi qua bước 2 (Cơ chế trung gian) để giải thích *tại sao* và *bằng cách nào*, tuyệt đối không nhảy thẳng từ Nguyên nhân ➔ Hệ quả gây cảm giác áp đặt chủ quan.
      </div>
    </div>
  );
}
