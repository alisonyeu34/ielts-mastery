"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionTransitionModalProps {
  completedSection: "listening" | "reading" | "writing" | "speaking";
  nextSection: "reading" | "writing" | "speaking" | "finished";
  onProceedNext: () => void;
  className?: string;
}

export function SectionTransitionModal({
  completedSection,
  nextSection,
  onProceedNext,
  className,
}: SectionTransitionModalProps) {
  const [restSecondsLeft, setRestSecondsLeft] = useState<number>(60);

  useEffect(() => {
    if (restSecondsLeft <= 0) {
      onProceedNext();
      return;
    }

    const timer = setInterval(() => {
      setRestSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [restSecondsLeft, onProceedNext]);

  const sectionInfo = {
    listening: { name: "IELTS Listening (40 câu)", icon: Headphones, color: "text-blue-500" },
    reading: { name: "IELTS Reading (60 phút • 3 Passages)", icon: BookOpen, color: "text-emerald-500" },
    writing: { name: "IELTS Writing (60 phút • Task 1 & 2)", icon: PenTool, color: "text-amber-500" },
    speaking: { name: "IELTS Speaking (14 phút • 3 Parts)", icon: Mic, color: "text-purple-500" },
    finished: { name: "Tổng kết bài thi", icon: Sparkles, color: "text-primary" },
  };

  const nextInfo = sectionInfo[nextSection];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-center space-y-6">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary border border-primary/20 ring-4 ring-primary/10 animate-bounce">
            <Clock className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase tracking-wider">
            Đã hoàn thành phần {completedSection.toUpperCase()}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Quãng Nghỉ Chuyển Tiếp Giữa Các Phần Thi
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Bạn có 60 giây để uống nước và thả lỏng trước khi hệ thống tự động bắt đầu phần thi tiếp theo.
          </p>
        </div>

        {/* Countdown Badge */}
        <div className="py-2">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-secondary border border-border text-foreground font-mono font-black text-xl sm:text-2xl">
            <Clock className="h-5 w-5 text-primary" />
            <span>00:{restSecondsLeft.toString().padStart(2, "0")}</span>
          </div>
        </div>

        {/* Next Section Preview */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border text-xs flex items-center justify-between">
          <span className="text-muted-foreground font-bold">Phần thi tiếp theo:</span>
          <span className="font-extrabold text-foreground flex items-center gap-1.5">
            <nextInfo.icon className={cn("h-4 w-4", nextInfo.color)} />
            <span>{nextInfo.name}</span>
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onProceedNext}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Bắt Đầu Ngay (Bỏ qua thời gian nghỉ)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
