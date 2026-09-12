"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShieldAlert,
  Search,
  Sparkles,
  Zap,
  RotateCcw,
  BookOpen,
  Filter,
} from "lucide-react";
import { useErrorBankSession } from "@/hooks/useErrorBankSession";
import { ErrorClassification } from "@/types/database";
import { CognitiveDeficitRadar } from "@/components/error-bank/CognitiveDeficitRadar";
import { ErrorExtinctionVelocityGauge } from "@/components/error-bank/ErrorExtinctionVelocityGauge";
import { DailyPrescriptionWidget } from "@/components/error-bank/DailyPrescriptionWidget";
import { ErrorBankFilterBar } from "@/components/error-bank/ErrorBankFilterBar";
import { ErrorDossierCard } from "@/components/error-bank/ErrorDossierCard";
import { SingleErrorRetryModal } from "@/components/error-bank/SingleErrorRetryModal";
import { RemediationArenaModal } from "@/components/error-bank/RemediationArenaModal";
import { RecurringErrorTracker } from "@/components/error-bank/RecurringErrorTracker";

function ErrorBankDashboardContent() {
  const searchParams = useSearchParams();

  const {
    errors,
    filteredErrors,
    categoryFilter,
    setCategoryFilter,
    moduleFilter,
    setModuleFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    submitAttempt,
    markAsMastered,
    deleteError,
    resetAllMastery,
    seedSampleErrors,
    activeSingleError,
    openSingleRetry,
    closeSingleRetry,
    arenaState,
    startArena,
    submitArenaAnswer,
    closeArena,
    restartArena,
  } = useErrorBankSession();

  // Auto trigger arena if URL has params (e.g. ?arena=true&category=grammar)
  useEffect(() => {
    const arenaParam = searchParams.get("arena");
    const categoryParam = searchParams.get("category") as ErrorClassification | null;
    if (arenaParam === "true" && errors.length > 0 && !arenaState.isOpen) {
      startArena(categoryParam || "all", 8);
    }
  }, [searchParams, errors.length, arenaState.isOpen, startArena]);

  return (
    <div className="space-y-8 pb-24 max-w-6xl mx-auto select-none">
      {/* 1. Page Title & Mission Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" /> Sổ Tay Lỗi Sai & Khắc Phục Điểm Yếu
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Sổ Tay Tổng Hợp & Luyện Lại Lỗi Sai
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tự động lưu lại các câu làm sai • Làm đúng 2 lần liên tiếp để thành thạo và không lặp lại lỗi.
          </p>
        </div>

        <button
          type="button"
          onClick={() => startArena(categoryFilter, 8)}
          className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-transform hover:scale-105 self-start sm:self-auto cursor-pointer"
        >
          <Zap className="h-4 w-4 fill-white" />
          <span>Luyện Sửa Lỗi Ngay</span>
        </button>
      </div>

      {/* 2. Top Analytics Grid: Cognitive Radar + EEV Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <CognitiveDeficitRadar
            errors={errors}
            onSelectCategory={(cat) => setCategoryFilter(cat as ErrorClassification)}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <ErrorExtinctionVelocityGauge
            errors={errors}
            onTriggerArena={() => startArena(categoryFilter, 8)}
          />
        </div>
      </div>

      {/* Feature 5: Radar Bắt Bệnh Ký Sinh & Liều Thuốc Giải Độc 1 Phút */}
      <RecurringErrorTracker errors={errors} />

      {/* 3. Adaptive Diagnostic & Daily Remediation Prescription */}
      <DailyPrescriptionWidget
        errors={errors}
        onStartArenaWithCategory={(cat) => startArena(cat, 6)}
      />

      {/* 4. Filter Bar & Quick Tools */}
      <ErrorBankFilterBar
        errors={errors}
        selectedCategory={categoryFilter}
        onSelectCategory={setCategoryFilter}
        selectedModule={moduleFilter}
        onSelectModule={setModuleFilter}
        selectedStatus={statusFilter}
        onSelectStatus={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onStartArena={() => startArena(categoryFilter, 8)}
        onSeedSampleErrors={seedSampleErrors}
        onResetMastery={resetAllMastery}
      />

      {/* 5. Error Dossier Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono px-1">
          <span>Hồ sơ bẫy lỗi ({filteredErrors.length} mục phù hợp):</span>
          <span>Sắp xếp: Mới nhất & Chưa khắc phục trước</span>
        </div>

        {filteredErrors.length > 0 ? (
          <div className="space-y-4">
            {filteredErrors.map((err) => (
              <ErrorDossierCard
                key={err.id}
                error={err}
                onQuickRetry={openSingleRetry}
                onMarkMastered={markAsMastered}
                onDelete={deleteError}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-border bg-card text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary mx-auto text-muted-foreground">
              <Search className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-sm text-foreground">
              Không tìm thấy hồ sơ lỗi sai nào phù hợp
            </h4>
            <p className="text-xs text-muted-foreground">
              Hãy thử chọn lại danh mục hoặc bấm nút &quot;Nạp 25 Lỗi Cambridge Mẫu&quot; phía trên.
            </p>
          </div>
        )}
      </div>

      {/* 6. Modals */}
      {/* Single Error Instant Retry Modal */}
      <SingleErrorRetryModal
        error={activeSingleError}
        onClose={closeSingleRetry}
        onSubmitAttempt={submitAttempt}
      />

      {/* Multi-Item Remediation Arena Modal */}
      <RemediationArenaModal
        arenaState={arenaState}
        onClose={closeArena}
        onSubmitAnswer={submitArenaAnswer}
        onRestart={restartArena}
      />
    </div>
  );
}

export default function ErrorBankDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs font-mono text-muted-foreground animate-pulse">
          Đang nạp Trung tâm chuẩn đoán & Ngân hàng lỗi sai...
        </div>
      }
    >
      <ErrorBankDashboardContent />
    </Suspense>
  );
}
