"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Award,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useErrorBankTriage } from "@/hooks/useErrorBankTriage";
import { selectDrillQueue } from "@/lib/errorBankHelpers";
import { ErrorClassification } from "@/types/database";
import { MistakeDrillSession } from "@/components/error-bank/MistakeDrillSession";

function MistakeDrillContent() {
  const searchParams = useSearchParams();
  const categoryParam = (searchParams.get("category") || "all") as ErrorClassification | "all";

  const { errors, recordDrillAttempt } = useErrorBankTriage();
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [sessionKey, setSessionKey] = useState<number>(1);

  // Queue of unmastered items (up to 10 items)
  const drillQueue = useMemo(() => {
    return selectDrillQueue(errors, 10, categoryParam);
  }, [errors, categoryParam, sessionKey]);

  return (
    <div className="space-y-7 pb-24 max-w-4xl mx-auto select-none">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" /> Mistake Drill Arena • Phòng Luyện Triệt Tiêu Lỗ Hổng
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Luyện Lại Riêng Các Câu Sai
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Quy tắc làm chủ: Trả lời chính xác 2 lần liên tiếp để triệt tiêu hoàn toàn lỗ hổng kiến thức.
          </p>
        </div>

        <Link
          href="/error-bank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Ngân hàng lỗi
        </Link>
      </div>

      {/* Main Drill Arena */}
      {!isFinished ? (
        <MistakeDrillSession
          key={sessionKey}
          queue={drillQueue}
          onAttempt={recordDrillAttempt}
          onFinishDrill={() => setIsFinished(true)}
        />
      ) : (
        /* Completion Summary Card */
        <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-8 shadow-xl space-y-6 text-center max-w-xl mx-auto animate-in zoom-in-95">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
              <Award className="h-8 w-8" />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Hoàn Tất Phiên Luyện Tập
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              Đã Cập Nhật Tiến Độ Làm Chủ
            </h3>
            <p className="text-xs text-muted-foreground">
              Toàn bộ kết quả thử thách và số lần đúng liên tiếp đã được đồng bộ vào IndexedDB.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsFinished(false);
                setSessionKey((p) => p + 1);
              }}
              className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Luyện Thêm Đợt Khác</span>
            </button>

            <Link
              href="/error-bank"
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-xs transition-all hover:scale-105"
            >
              Về Ngân Hàng Lỗi Sai
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MistakeDrillPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs font-mono text-muted-foreground animate-pulse">
          Đang nạp hàng đợi câu sai...
        </div>
      }
    >
      <MistakeDrillContent />
    </Suspense>
  );
}
