"use client";

import React from "react";
import {
  Timer,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Zap,
  HelpCircle,
  ShieldAlert
} from "lucide-react";
import { GardenPathChallenge } from "@/lib/syntacticTreeParser";

interface GardenPathPuzzleCardProps {
  challenge: GardenPathChallenge;
  timeLeft: number;
  isRunning: boolean;
  onStart: () => void;
  selectedVerb: string | null;
  onSelectVerb: (verb: string) => void;
  puzzleResult: "idle" | "correct" | "wrong" | "timeout";
  onOpenSummary: () => void;
}

export const GardenPathPuzzleCard: React.FC<GardenPathPuzzleCardProps> = ({
  challenge,
  timeLeft,
  isRunning,
  onStart,
  selectedVerb,
  onSelectVerb,
  puzzleResult,
  onOpenSummary
}) => {
  // Combine true main verb + decoy verbs and shuffle deterministically
  const candidateVerbs = React.useMemo(() => {
    const list = [
      { verb: challenge.trueMainVerb, isTrue: true },
      ...challenge.decoyVerbs.map((d) => ({ verb: d.verb, isTrue: false }))
    ];
    return list.sort((a, b) => a.verb.localeCompare(b.verb));
  }, [challenge]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Đấu Trường Bẫy Não (Garden-Path Puzzle Arena)
            </h3>
            <p className="text-[11px] text-slate-400">
              Định vị chính xác Động từ vị ngữ chính (Main Finite Verb) trong 15 giây
            </p>
          </div>
        </div>

        {/* Timer Badge */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-xl border flex items-center gap-1.5 font-mono text-xs font-bold ${
              isRunning
                ? timeLeft <= 5
                  ? "bg-rose-950 text-rose-300 border-rose-500 animate-pulse"
                  : "bg-indigo-950 text-indigo-300 border-indigo-500"
                : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>00:{timeLeft.toString().padStart(2, "0")}s</span>
          </div>
        </div>
      </div>

      {/* Instructions / Status Banner */}
      {puzzleResult === "idle" && !isRunning && (
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            Nhấn <strong>Bắt Đầu Thử Thách</strong> để khởi động đồng hồ 15s. Nhiệm vụ của bạn là click chọn từ thực sự đóng vai trò Vị Ngữ Chính trong câu học thuật trên.
          </p>
          <button
            onClick={onStart}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-pink-600/30 flex items-center justify-center gap-1.5 shrink-0 transition-transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5" />
            Bắt Đầu (15s)
          </button>
        </div>
      )}

      {/* Candidate Verbs Click Arena */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
        {candidateVerbs.map((item) => {
          const isSelected = selectedVerb === item.verb;
          let btnStyle = "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200";

          if (puzzleResult !== "idle") {
            if (item.isTrue) {
              btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500";
            } else if (isSelected && !item.isTrue) {
              btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500";
            } else {
              btnStyle = "bg-slate-950/40 border-slate-850 text-slate-500 opacity-50";
            }
          } else if (isRunning) {
            btnStyle = "bg-slate-850 hover:bg-pink-950/50 border-slate-700 hover:border-pink-500 text-slate-100 hover:text-pink-200 cursor-pointer";
          } else {
            btnStyle = "bg-slate-950/40 border-slate-800 text-slate-500 cursor-not-allowed";
          }

          return (
            <button
              key={item.verb}
              onClick={() => onSelectVerb(item.verb)}
              disabled={!isRunning || puzzleResult !== "idle"}
              className={`p-3 rounded-xl border text-center font-mono text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${btnStyle}`}
            >
              <span>{item.verb}</span>
              {puzzleResult !== "idle" && item.isTrue && (
                <span className="text-[10px] text-emerald-400 font-sans font-medium flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Root Verb
                </span>
              )}
              {puzzleResult !== "idle" && isSelected && !item.isTrue && (
                <span className="text-[10px] text-rose-400 font-sans font-medium flex items-center gap-0.5">
                  <XCircle className="w-3 h-3" /> Decoy Trap
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Result Diagnostic Feedback */}
      {puzzleResult === "correct" && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Phán Đoán Chuẩn Xác Tuyệt Đối (Band 8.5+ Precision)</span>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            {challenge.fullDisentangledAnalysis}
          </p>
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onStart}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              Luyện Lại
            </button>
            <button
              onClick={onOpenSummary}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/30"
            >
              Xem Tổng Kết & Lưu Lịch Sử
            </button>
          </div>
        </div>
      )}

      {puzzleResult === "wrong" && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Bạn Đã Mắc Bẫy Phân Từ Rút Gọn / Mệnh Đề Lồng Ghép!</span>
          </div>
          <p className="text-xs text-rose-100/90 leading-relaxed">
            {challenge.decoyVerbs.find((d) => d.verb === selectedVerb)?.trapReason || challenge.ieltsTrapExplanation}
          </p>
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onStart}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              Thử Lại Ngay
            </button>
            <button
              onClick={onOpenSummary}
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow-md shadow-rose-600/30"
            >
              Lưu Lỗi Vào Error Bank
            </button>
          </div>
        </div>
      )}

      {puzzleResult === "timeout" && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Hết Thời Gian (Quá tải nhận thức cú pháp - Syntax Overload)</span>
          </div>
          <p className="text-xs text-amber-100/90 leading-relaxed">
            Trong phòng thi IELTS Reading, bạn chỉ có trung bình 6 - 8 giây để phân tích một câu phức. Vị ngữ chính của câu này là: <strong>{challenge.trueMainVerb}</strong>.
          </p>
          <div className="pt-2">
            <button
              onClick={onStart}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              Thử Lại Ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
