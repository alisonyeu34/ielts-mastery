"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Award,
  Sparkles,
  Clock,
  CheckCircle2,
  Play,
  ArrowRight,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Maximize2,
  Calendar,
  Microscope,
  SearchCode,
  Timer,
  Layers,
} from "lucide-react";
import { db } from "@/lib/db";
import { MOCK_FULL_EXAM_DATA } from "@/data/mockFullExamData";
import { cn } from "@/lib/utils";

export default function MockTestCatalogPage() {
  const practiceLogs = useLiveQuery(async () => {
    try {
      const logs = await db.practice_logs
        .where("type")
        .equals("mock_test")
        .reverse()
        .toArray();
      return logs;
    } catch {
      return [];
    }
  }, []);

  const exam = MOCK_FULL_EXAM_DATA;

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-extrabold text-red-600 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Trụ Cột 4 / 4 • Thi Thử Tổng Duyệt Chuẩn Khảo Thí Quốc Tế
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Phòng Thi Thử CD-IELTS 4 Kỹ Năng & Quy Trình "1 Đề Làm 3 Lần"
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Mô phỏng 100% áp lực phòng thi trên máy tính của Hội đồng Cambridge / IDP / BC. Tích hợp quy trình giải phẫu khảo thí 3 bước: <strong>Pass 1 (Áp lực thời gian) ➔ Pass 2 (Đào sâu tự lực) ➔ Pass 3 (Mổ xẻ bẫy & Thu hoạch từ vựng)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 self-start sm:self-auto shadow-sm">
          <Award className="h-6 w-6" />
          <div>
            <span className="text-[10px] uppercase font-bold block leading-none">Bản Quyền Khảo Thí</span>
            <span className="text-xs font-black font-mono">Cambridge TRF 2026</span>
          </div>
        </div>
      </div>

      {/* Featured Exam Hero Card */}
      <div className="rounded-3xl border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 via-card to-indigo-500/10 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black px-3 py-1 rounded-full bg-red-600 text-white uppercase tracking-wider">
                {exam.code}
              </span>
              <span className="text-xs font-bold text-muted-foreground">
                Tổng thời lượng: 165 Phút • 4 Kỹ Năng
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              {exam.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Bộ đề chuẩn hóa gồm 40 câu Listening (4 Parts), 40 câu Reading Academic (3 Passages), Writing Task 1 & 2, và Speaking mô phỏng 3 phần.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/mock-test/${exam.id}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Vào Phòng Thi CD-IELTS ➔</span>
            </Link>
          </div>
        </div>

        {/* 4 Skill Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border/80">
          <div className="p-3.5 rounded-2xl bg-card border border-border flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
              <Headphones className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-bold">Listening</span>
              <span className="text-xs font-extrabold text-foreground font-mono">
                40 Câu • 32 Phút
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-card border border-border flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-bold">Reading</span>
              <span className="text-xs font-extrabold text-foreground font-mono">
                40 Câu • 60 Phút
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-card border border-border flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <PenTool className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-bold">Writing</span>
              <span className="text-xs font-extrabold text-foreground font-mono">
                Task 1 & 2 • 60 Phút
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-card border border-border flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Mic className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-bold">Speaking</span>
              <span className="text-xs font-extrabold text-foreground font-mono">
                3 Phần • 14 Phút
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The 3-Pass Methodology Explanation Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          <span>Tại Sao "1 Đề Làm 3 Lần" Hiệu Quả Gấp 5 Lần Làm 5 Đề Khác Nhau?</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-extrabold font-mono">
              <Timer className="h-4 w-4" />
              <span>PASS 1: ÁP LỰC PHÒNG THI</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Làm đề dưới áp lực thời gian chuẩn, không từ điển, không gợi ý. Đo lường chính xác phong độ và điểm số thực tế dưới áp lực tâm lý.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold font-mono">
              <SearchCode className="h-4 w-4" />
              <span>PASS 2: ĐÀO SÂU TỰ LỰC</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Mở lại đề không giới hạn thời gian. Cho phép tra từ điển và tự sửa đáp án. So sánh Pass 1 vs Pass 2 để cô lập: <strong>Sai do thiếu giờ</strong> hay <strong>Sai do hổng kiến thức</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold font-mono">
              <Microscope className="h-4 w-4" />
              <span>PASS 3: GIẢI PHẪU KHẢO THÍ</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Mở bung transcript và bài đọc song ngữ, định vị dẫn chứng đáp án, bóc tách toàn bộ bẫy gây nhiễu và thu hoạch từ vựng AWL vào Sổ từ vựng (FSRS).
            </p>
          </div>
        </div>
      </div>

      {/* Historical Attempts (Live from Dexie DB) */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-emerald-500" />
          <span>Lịch Sử Thi Thử & Phân Tích Lỗ Hổng Kiến Thức</span>
        </h3>

        {!practiceLogs || practiceLogs.length === 0 ? (
          <div className="p-8 rounded-2xl bg-card border border-border/80 text-center text-xs text-muted-foreground space-y-2">
            <p>Bạn chưa thực hiện bài thi thử nào trong hệ thống.</p>
            <Link
              href={`/mock-test/${exam.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline"
            >
              Bắt đầu bài thi thử Cambridge 18 Test 1 ngay ➔
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {practiceLogs.map((log) => {
              const details: any = log.details || {};
              return (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-foreground">
                        {details.examTitle || "Cambridge Mock Test"}
                      </strong>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-bold">
                        Band {(log.score / 10).toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleString("vi-VN")} • L: {details.listeningBand} | R: {details.readingBand} | W: {details.writingBand} | S: {details.speakingBand}
                    </span>
                  </div>

                  <Link
                    href={`/mock-test/${log.materialId || exam.id}`}
                    className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Xem Lại & Mổ Xẻ Pass 3</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
