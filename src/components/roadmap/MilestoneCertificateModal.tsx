"use client";

import React from "react";
import {
  X,
  Award,
  Sparkles,
  Trophy,
  CheckCircle2,
  Share2,
  Download,
  ArrowRight,
} from "lucide-react";
import { PhaseNumber } from "@/types/database";
import { cn } from "@/lib/utils";

interface MilestoneCertificateModalProps {
  isOpen: boolean;
  phase: PhaseNumber;
  onClose: () => void;
}

export function MilestoneCertificateModal({
  isOpen,
  phase,
  onClose,
}: MilestoneCertificateModalProps) {
  if (!isOpen) return null;

  const phaseDetails = {
    1: {
      name: "Phase 1: Xây Gốc Vững Chắc (Foundations Mastery)",
      band: "Band 5.5 Achieved",
      desc: "Đã xuất sắc hoàn thành 60 ngày huấn luyện 44 âm IPA, 12 thì ngữ pháp và 3.000 từ vựng cốt lõi.",
      color: "border-blue-500/40 from-blue-600/10 via-card to-background",
    },
    2: {
      name: "Phase 2: Phương Pháp Luận & 14 Dạng Bài (Techniques Mastery)",
      band: "Band 6.5 Achieved",
      desc: "Đã xuất sắc hoàn thành 60 ngày làm chủ 14 dạng Reading, Listening S1-S4, PEEL Writing và Speaking P1-P2.",
      color: "border-purple-500/40 from-purple-600/10 via-card to-background",
    },
    3: {
      name: "Phase 3: Tư Duy Phản Biện C1/C2 & Đại Chung Kết (Elite Mastery)",
      band: "Band 7.5+ Mastered",
      desc: "Đã hoàn thành toàn diện 165 ngày bứt phá ngoạn mục với Toulmin Model, Cú pháp học thuật và 3-Pass Method.",
      color: "border-amber-500/40 from-amber-600/10 via-card to-background",
    },
  }[phase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Certificate Container */}
        <div
          className={cn(
            "relative rounded-3xl border-2 p-6 sm:p-8 bg-gradient-to-b text-center space-y-5 shadow-inner",
            phaseDetails.color
          )}
        >
          {/* Top Seal */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-500 text-white shadow-xl shadow-amber-500/30 ring-4 ring-amber-500/20 animate-bounce">
              <Trophy className="h-8 w-8" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 block font-mono">
              IELTS MASTER PLATFORM • OFFICIAL MILESTONE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
              Chứng Chỉ Hoàn Thành
            </h2>
            <h3 className="text-sm sm:text-base font-extrabold text-primary">
              {phaseDetails.name}
            </h3>
          </div>

          {/* Band Stamp */}
          <div className="py-2">
            <span className="inline-block px-5 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-300 font-mono font-black text-lg sm:text-xl shadow-xs">
              🎖️ {phaseDetails.band}
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed font-serif max-w-md mx-auto">
            {phaseDetails.desc}
          </p>

          <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span>Ngày cấp: {new Date().toLocaleDateString("vi-VN")}</span>
            <span>Mã xác thực: IELTS-165D-P{phase}-{Date.now().toString().slice(-6)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => alert("Đã lưu ảnh chứng chỉ thành công!")}
              className="px-4 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto justify-center"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Tải chứng chỉ</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Tiếp tục hành trình 165 ngày</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
