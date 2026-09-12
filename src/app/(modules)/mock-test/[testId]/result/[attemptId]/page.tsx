"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Award,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  TrendingUp,
  Zap,
} from "lucide-react";
import { db } from "@/lib/db";
import { MOCK_FULL_IELTS_TEST } from "@/data/mockFullIELTSTest";
import { MockExamResult } from "@/lib/bandCalculator";
import { OfficialScoreBreakdown } from "@/components/mock-test/OfficialScoreBreakdown";
import { BandScoreRadarChart } from "@/components/mock-test/BandScoreRadarChart";
import { cn } from "@/lib/utils";

export default function MockExamResultPage() {
  const params = useParams();
  const router = useRouter();
  const testId = (params?.testId as string) || "cambridge_mock_19_full";
  const attemptId = (params?.attemptId as string) || "";

  const test = MOCK_FULL_IELTS_TEST;

  // Query Attempt from Dexie DB
  const practiceLog = useLiveQuery(async () => {
    try {
      if (!attemptId) return null;
      return await db.practice_logs.get(attemptId);
    } catch {
      return null;
    }
  }, [attemptId]);

  // Fallback Mock Exam Result if newly rendered
  const result: MockExamResult = (practiceLog?.details as unknown as MockExamResult) || {
    attemptId: attemptId || "att_demo",
    testId: test.id,
    testTitle: test.title,
    mode: "full",
    targetBand: 7.5,
    overallBand: practiceLog?.score || 7.5,
    listening: { rawScore: 34, maxScore: 40, bandScore: 7.5 },
    reading: { rawScore: 35, maxScore: 40, bandScore: 8.0 },
    writing: { bandScore: 7.0, criteriaScores: { tr: 7.0, cc: 7.5, lr: 7.0, gra: 7.5 } },
    speaking: { bandScore: 7.5, criteriaScores: { tr: 7.5, lr: 7.5, gra: 7.5, pr: 8.0 } },
    bandGap: 0,
    totalTimeSpentSeconds: 9900,
    completedAt: practiceLog?.createdAt || new Date().toISOString(),
  };

  const isTargetAchieved = result.overallBand >= result.targetBand;

  return (
    <div className="space-y-7 pb-20 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Báo Cáo Kết Quả Thi Thử • Cambridge TRF
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Bảng Điểm Tổng Hợp & Phân Tích Thực Lực
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Mã kết quả: <code className="font-mono">{result.attemptId}</code> • Hoàn tất lúc: {new Date(result.completedAt).toLocaleString("vi-VN")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/mock-test"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Danh mục đề thi
          </Link>
        </div>
      </div>

      {/* Grid: TRF Breakdown & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Official Score Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          <OfficialScoreBreakdown result={result} />
        </div>

        {/* Right Column: Radar Chart & Action Next Steps */}
        <div className="lg:col-span-4 space-y-6">
          <BandScoreRadarChart
            listening={result.listening.bandScore}
            reading={result.reading.bandScore}
            writing={result.writing.bandScore}
            speaking={result.speaking.bandScore}
            targetBand={result.targetBand}
          />

          {/* Action Recommendations Card */}
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Bước Tiếp Theo Đề Xuất (AI Pedagogy):</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {isTargetAchieved
                ? "🎉 Chúc mừng bạn đã chạm mốc Target Band 7.5! Hãy tiếp tục duy trì phong độ bằng cách giải quyết các lỗi sai còn tồn đọng trong Error Bank."
                : `Khoảng cách so với mục tiêu Band ${result.targetBand} là ${result.bandGap.toFixed(1)} Band. Hãy tập trung cải thiện kỹ năng còn yếu nhất.`}
            </p>

            <div className="space-y-2 pt-1">
              <Link
                href="/error-bank/drill"
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all hover:scale-105"
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Mổ Xẻ Câu Sai Trong Error Bank</span>
              </Link>

              <Link
                href={`/mock-test/${test.id}/checkin`}
                className="w-full py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Thi Lại Đề Này (Retry Exam)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
