"use client";

import React from "react";
import Link from "next/link";
import {
  PenTool,
  ArrowLeft,
  Sparkles,
  Award,
  CheckCircle2,
  Mic,
  ArrowRight,
  ShieldAlert,
  Layers,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useAISubmissions } from "@/hooks/useIeltsDB";
import { cn } from "@/lib/utils";

export default function GradingHubPage() {
  const { submissions, isLoading } = useAISubmissions(5);

  const hasSubmissions = submissions.length > 0;
  const avgOverall = hasSubmissions
    ? `Band ${(
        submissions.reduce((acc, curr) => acc + curr.scores.overall, 0) /
        submissions.length
      ).toFixed(1)}`
    : "--";

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module Chấm Bài
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Chấm Bài Viết & Nói Tự Động (AI)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Chấm điểm chi tiết và chỉ ra lỗi sai theo 4 tiêu chí chuẩn của kỳ thi IELTS Cambridge.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Tổng quan
        </Link>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground">Số Bài Đã Chấm AI</span>
          <div className="text-2xl font-extrabold text-foreground">
            {isLoading ? "..." : `${submissions.length} bài`}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {hasSubmissions ? `${submissions.filter(s => s.skill.startsWith("writing")).length} bài Writing` : "Chưa có bài nào được gửi chấm"}
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground">Band Score Trung Bình</span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {isLoading ? "..." : avgOverall}
          </div>
          <span className="text-[11px] text-indigo-500 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Mục tiêu lộ trình: Band 7.5
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground">Độ Chuẩn Barem Khảo Thí</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            100%
          </div>
          <span className="text-[11px] text-muted-foreground">
            Chuẩn theo tiêu chí chấm điểm IELTS chính thức
          </span>
        </div>
      </div>

      {/* 2 Core Grader Engines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Writing AI Grader */}
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-card via-card to-indigo-500/[0.03] p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                IELTS Academic Writing
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                <PenTool className="h-5 w-5" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-foreground">
                Chấm Điểm Bài Viết IELTS (Writing)
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Soạn thảo chuẩn phòng thi (đếm từ thời gian thực, đồng hồ 20/40 phút), chấm điểm 4 tiêu chí TR - CC - LR - GRA, vạch trần lỗi ngữ pháp và đề xuất viết lại câu chuẩn C1/C2.
              </p>
            </div>

            <div className="space-y-1.5 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Chấm chi tiết Task 1 (Charts/Graphs) & Task 2 (Essays)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Tự động gom lỗi ngữ pháp vào Ngân Hàng Lỗi Sai (Module 5)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Nâng cấp câu văn học thuật (Nominalization, Inversion)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <Link
              href="/grading/writing"
              className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Vào Phòng Chấm IELTS Writing</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Card 2: Speaking AI Grader */}
        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-card via-card to-purple-500/[0.03] p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-md hover:border-purple-500/50 transition-all flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                IELTS Speaking 1-2-3
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30">
                <Mic className="h-5 w-5" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-foreground">
                Chấm & Luyện Nói IELTS (Speaking)
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Phòng thi thử 1-1 với giám khảo AI ảo: Thu âm câu trả lời, nhận diện độ trôi chảy (Fluency), phát âm ngữ điệu (Pronunciation) và gợi ý mở rộng ý tưởng Band 7.5+.
              </p>
            </div>

            <div className="space-y-1.5 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                <span>Chấm điểm Part 1, Part 2 (Cue Card), Part 3</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                <span>Phát hiện từ đệm ('uhm', 'ah') và nhịp điệu phát âm</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                <span>Đề xuất câu trả lời mẫu Band 8.5+</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <Link
              href="/grading/speaking"
              className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Vào Phòng Luyện Thi IELTS Speaking</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
