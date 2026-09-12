"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useIsRecallItemMasked } from "@/lib/theoryRecallMaskStore";
import { cn } from "@/lib/utils";

export interface TheoryMaskableContentProps {
  itemId: string;
  children: React.ReactNode;
  className?: string;
  itemTitle?: string;
}

export function TheoryMaskableContent({
  itemId,
  children,
  className,
  itemTitle,
}: TheoryMaskableContentProps) {
  const isMaskedFromStore = useIsRecallItemMasked(itemId);
  const [tempReveal, setTempReveal] = useState<boolean>(false);

  // When recall box is closed, reset tempReveal so next time it opens it will be masked again
  useEffect(() => {
    if (!isMaskedFromStore) {
      setTempReveal(false);
    }
  }, [isMaskedFromStore]);

  const shouldMask = isMaskedFromStore && !tempReveal;

  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        shouldMask && "min-h-[76px]",
        className
      )}
    >
      {/* Target Content */}
      <div
        className={cn(
          "transition-all duration-300",
          shouldMask && "filter blur-md select-none pointer-events-none opacity-0 invisible"
        )}
        aria-hidden={shouldMask}
      >
        {children}
      </div>

      {/* Mask Overlay when Active Recall is Open */}
      {shouldMask && (
        <div className="absolute inset-0 z-10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2.5 bg-secondary/90 dark:bg-slate-900/92 backdrop-blur-md rounded-2xl border-2 border-dashed border-amber-500/50 p-3.5 shadow-xs animate-in fade-in zoom-in-95 duration-200 text-center sm:text-left">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl shrink-0 select-none">🙈</span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <p className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono uppercase tracking-wide">
                  Đang Che Lý Thuyết Để Tự Nhớ Lại!
                </p>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium leading-tight">
                {itemTitle ? `Tự viết lại "${itemTitle}" vào ô bên dưới, không nhìn lén nhé 🎯` : "Hãy tự viết lại vào ô bên dưới, không nhìn lén tài liệu nhé 🎯"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTempReveal(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-background hover:bg-secondary border border-border text-[10px] font-extrabold text-foreground/90 hover:text-foreground shrink-0 transition-all cursor-pointer shadow-2xs flex items-center gap-1 hover:border-amber-500/40"
            title="Bấm vào đây nếu bạn thực sự bị quên kiến thức"
          >
            <Eye className="h-3 w-3 text-amber-500" />
            <span>Xem lén bản gốc</span>
          </button>
        </div>
      )}

      {/* Temporary Reveal indicator with re-mask button */}
      {tempReveal && isMaskedFromStore && (
        <div className="pt-1.5 flex items-center justify-between gap-2 text-[10px] text-muted-foreground border-t border-amber-500/20 mt-1">
          <span className="italic text-amber-700 dark:text-amber-300">
            👀 Bạn đang xem tài liệu để nhớ lại
          </span>
          <button
            type="button"
            onClick={() => setTempReveal(false)}
            className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>🙈 Che lại để tiếp tục viết</span>
          </button>
        </div>
      )}
    </div>
  );
}
