"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Award,
  Maximize2,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Zap,
} from "lucide-react";
import { MOCK_FULL_IELTS_TEST } from "@/data/mockFullIELTSTest";
import { DeviceCheckModal } from "@/components/mock-test/DeviceCheckModal";
import { cn } from "@/lib/utils";

export default function ExamCheckinPage() {
  const params = useParams();
  const router = useRouter();
  const testId = (params?.testId as string) || "cambridge_mock_19_full";
  const test = MOCK_FULL_IELTS_TEST;

  const [examMode, setExamMode] = useState<"full" | "listening" | "reading" | "writing" | "speaking">("full");

  const handleStartExam = () => {
    router.push(`/mock-test/${testId}/exam?mode=${examMode}`);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Exam Check-in Lounge
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground">
            Phòng Chờ Chuẩn Bị & Quy Chế Phòng Thi
          </h1>
          <p className="text-xs text-muted-foreground">
            {test.title} • Mã đề: <code className="font-mono">{test.code}</code>
          </p>
        </div>

        <Link
          href="/mock-test"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Hủy thi
        </Link>
      </div>

      {/* Mode Selector */}
      <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3">
        <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
          Lựa Chọn Chế Độ Thi Thử:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <button
            type="button"
            onClick={() => setExamMode("full")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all space-y-1 cursor-pointer",
              examMode === "full"
                ? "bg-primary/10 border-primary ring-2 ring-primary/20 shadow-xs"
                : "bg-secondary/20 border-border hover:bg-secondary/40"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-foreground">
                1. Full Simulation (Trọn gói 4 Kỹ năng)
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">
                2h45m
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Mô phỏng 100% phòng thi thật: Listening ➔ Reading ➔ Writing ➔ Speaking liên tục.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setExamMode("reading")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all space-y-1 cursor-pointer",
              examMode === "reading"
                ? "bg-primary/10 border-primary ring-2 ring-primary/20 shadow-xs"
                : "bg-secondary/20 border-border hover:bg-secondary/40"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-foreground">
                2. Thi Lẻ Từng Kỹ Năng
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                Tùy chọn
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Chỉ thi riêng một phần thi cụ thể để kiểm tra tiến độ vi mô.
            </p>
          </button>
        </div>
      </div>

      {/* Hardware & Rules Check */}
      <DeviceCheckModal onStartExam={handleStartExam} />
    </div>
  );
}
