"use client";

import React from "react";
import { Activity, Flame, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import { LectureScenario } from "@/lib/timeStretchingDSP";

interface AcousticLatencyHeatmapProps {
  scenario: LectureScenario;
  scoreStats: {
    correctCount: number;
    total: number;
    accuracy: number;
    detailsList: {
      questionNumber: number;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      isPluralTrap: boolean;
    }[];
  };
}

export const AcousticLatencyHeatmap: React.FC<AcousticLatencyHeatmapProps> = ({
  scenario,
  scoreStats
}) => {
  // Find first drop-out point
  const firstMissed = scoreStats.detailsList.find((d) => !d.isCorrect);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Bản Đồ Nhiệt Điểm Gãy Nhận Thức (Cognitive Drop-out Heatmap)
            </h3>
            <p className="text-[11px] text-slate-400">
              Định vị các phân đoạn bài giảng nơi não bộ bị hụt hơi và mất dấu thông tin
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-400">
          Chính xác: <strong className="text-emerald-400">{scoreStats.correctCount}/{scoreStats.total}</strong>
        </span>
      </div>

      {/* 10-Block Heatmap Row */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {scoreStats.detailsList.map((item) => {
          let blockColor = "bg-slate-950 border-slate-800 text-slate-500";

          if (item.isCorrect) {
            blockColor = "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40";
          } else if (item.isPluralTrap) {
            blockColor = "bg-amber-950/80 border-amber-500 text-amber-300 shadow-md shadow-amber-950/40";
          } else {
            blockColor = "bg-rose-950/80 border-rose-500 text-rose-300 shadow-md shadow-rose-950/40";
          }

          return (
            <div
              key={item.questionNumber}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${blockColor}`}
            >
              <span className="text-[10px] font-mono font-bold">Q{item.questionNumber}</span>
              <div className="mt-1">
                {item.isCorrect ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : item.isPluralTrap ? (
                  <span className="text-[9px] font-bold text-amber-400">(-s)</span>
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Drop-out Point Diagnostic Commentary */}
      {firstMissed ? (
        <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-200">
            <span className="font-bold block mb-0.5">
              Phát hiện điểm gãy phản xạ tại câu Q{firstMissed.questionNumber}:
            </span>
            Khi giáo sư nói với mật độ dày, thí sinh thường bị mất dấu do chưa kịp chuyển dịch tầm mắt sang câu kế tiếp sau khi điền đáp án trước đó.
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/50 flex items-center gap-2.5 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Khả năng duy trì phản xạ thính giác hoàn hảo xuyên suốt toàn bộ 10 câu hỏi!</span>
        </div>
      )}
    </div>
  );
};
