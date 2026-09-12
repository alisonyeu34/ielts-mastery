"use client";

import React, { useState, useRef } from "react";
import {
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  X,
  HardDrive,
  Sparkles,
} from "lucide-react";
import {
  exportDatabaseToJSON,
  importDatabaseFromJSON,
  resetDatabase,
} from "@/lib/databaseBackup";
import { cn } from "@/lib/utils";

interface DataBackupManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData?: () => void;
  className?: string;
}

export function DataBackupManagerModal({
  isOpen,
  onClose,
  onRefreshData,
  className,
}: DataBackupManagerModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // 1. Export JSON
  const handleExport = async () => {
    setIsExporting(true);
    setStatusMessage(null);
    try {
      const payload = await exportDatabaseToJSON();
      setStatusMessage({
        type: "success",
        text: `Đã xuất thành công file sao lưu chứa ${payload.recordCounts.vocab_matrix} từ vựng và ${payload.recordCounts.error_bank} lỗi sai!`,
      });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Không thể xuất dữ liệu. Hãy thử lại!",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Import JSON
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setStatusMessage(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const res = await importDatabaseFromJSON(text);

        if (res.success) {
          setStatusMessage({ type: "success", text: res.message });
          if (onRefreshData) onRefreshData();
        } else {
          setStatusMessage({ type: "error", text: res.message });
        }
      } catch {
        setStatusMessage({
          type: "error",
          text: "Định dạng tệp JSON không hợp lệ.",
        });
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  // 3. Reset Database
  const handleResetConfirm = async () => {
    if (confirmInput.trim() !== "CONFIRM_RESET") return;

    try {
      await resetDatabase();
      setStatusMessage({
        type: "info",
        text: "Đã xóa toàn bộ dữ liệu học tập về trạng thái mặc định.",
      });
      setShowResetConfirm(false);
      setConfirmInput("");
      if (onRefreshData) onRefreshData();
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Lỗi xóa dữ liệu.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HardDrive className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                Quản Trị Dữ Liệu & Sao Lưu Ngoại Tuyến
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Dữ liệu Dexie DB lưu trữ 100% offline trên trình duyệt của bạn
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

        {/* Status Alert */}
        {statusMessage && (
          <div
            className={cn(
              "p-3.5 rounded-2xl border text-xs flex items-center gap-2",
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                : statusMessage.type === "error"
                ? "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
                : "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300"
            )}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Backup & Restore Action Panels */}
        <div className="space-y-4">
          {/* Export Panel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                <Download className="h-4 w-4 text-primary" />
                <span>1. Tải Về File Sao Lưu (.JSON)</span>
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Lưu toàn bộ từ vựng, lỗi sai, bài thi và nhật ký học tập về máy tính.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 shrink-0 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isExporting ? "Đang xuất..." : "Tải JSON"}</span>
            </button>
          </div>

          {/* Import Panel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                <Upload className="h-4 w-4 text-emerald-600" />
                <span>2. Khôi Phục Dữ Liệu Từ File</span>
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Nạp lại dữ liệu học tập đã lưu khi đổi máy hoặc khôi phục trình duyệt.
              </p>
            </div>

            <label className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 shrink-0 cursor-pointer">
              <Upload className="h-3.5 w-3.5" />
              <span>{isImporting ? "Đang nạp..." : "Chọn File JSON"}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Factory Reset Panel */}
          {!showResetConfirm ? (
            <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <RotateCcw className="h-4 w-4" />
                  <span>3. Xóa Trắng Dữ Liệu Học Tập (Reset)</span>
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Đặt lại toàn bộ tiến độ 165 ngày về trạng thái ban đầu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-3.5 py-1.5 rounded-xl border border-rose-500/40 text-rose-600 hover:bg-rose-500/10 font-bold text-xs transition-colors shrink-0 cursor-pointer"
              >
                Xóa dữ liệu
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 space-y-3">
              <div className="flex items-center gap-1.5 font-bold text-rose-600 text-xs">
                <AlertTriangle className="h-4 w-4" />
                <span>Xác nhận xóa dữ liệu: Nhập chính xác "CONFIRM_RESET"</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  placeholder="CONFIRM_RESET"
                  className="w-full px-3 py-1.5 rounded-xl border border-rose-500/40 bg-card text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />

                <button
                  type="button"
                  onClick={handleResetConfirm}
                  disabled={confirmInput.trim() !== "CONFIRM_RESET"}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 disabled:opacity-40 text-white font-bold text-xs shrink-0 cursor-pointer"
                >
                  Xác nhận
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowResetConfirm(false);
                    setConfirmInput("");
                  }}
                  className="px-3 py-1.5 rounded-xl border border-border bg-secondary text-muted-foreground font-semibold text-xs shrink-0 cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
