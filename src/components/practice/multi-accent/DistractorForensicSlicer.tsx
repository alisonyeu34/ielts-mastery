"use client";

import React, { useState } from "react";
import { ForensicTrapSegment } from "@/data/mockMultiAccentAudioData";
import { AccentType } from "@/lib/webAudioLooperEngine";
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileText,
  AudioWaveform,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Brain,
} from "lucide-react";

interface DistractorForensicSlicerProps {
  trap: ForensicTrapSegment;
  currentAccent: AccentType;
  userSelectedOption: number | null;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean | null;
  onSubmitAnswer: (optionIndex: number) => void;
  onOpenSummary: () => void;
}

export const DistractorForensicSlicer: React.FC<DistractorForensicSlicerProps> = ({
  trap,
  currentAccent,
  userSelectedOption,
  isAnswerSubmitted,
  isAnswerCorrect,
  onSubmitAnswer,
  onOpenSummary,
}) => {
  const [activeLayerTab, setActiveLayerTab] = useState<"all" | "layer1" | "layer2" | "layer3">("all");

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                {trap.trapTypeLabelVi}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                [{trap.loopStartSec.toFixed(1)}s &rarr; {trap.loopEndSec.toFixed(1)}s]
              </span>
            </div>
            <h3 className="text-base font-black text-slate-100 mt-0.5">
              {trap.title}
            </h3>
          </div>
        </div>

        {/* Layer Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveLayerTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayerTab === "all"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Tất Cả 3 Lớp
          </button>
          <button
            onClick={() => setActiveLayerTab("layer1")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayerTab === "layer1"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Lớp 1 (Acoustic)
          </button>
          <button
            onClick={() => setActiveLayerTab("layer2")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayerTab === "layer2"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Lớp 2 (Text)
          </button>
          <button
            onClick={() => setActiveLayerTab("layer3")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayerTab === "layer3"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Lớp 3 (Trap)
          </button>
        </div>
      </div>

      {/* 3-Layer Diagnostic Stack */}
      <div className="space-y-4 mb-8">
        {/* Layer 1: Acoustic Reality */}
        {(activeLayerTab === "all" || activeLayerTab === "layer1") && (
          <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-2">
              <AudioWaveform className="w-4 h-4 text-cyan-400" />
              <span>LỚP 1 - TÍN HIỆU ÂM HỌC THỰC TẾ (Acoustic Phonetic Script):</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl font-mono text-sm text-cyan-200 tracking-wide leading-relaxed border border-cyan-500/20">
              {trap.layer1AcousticScript}
            </div>
            <p className="text-[11px] text-slate-400 mt-2 italic">
              * Đây là chuỗi âm thanh tai bạn thực sự nhận được, phản ánh các hiện tượng biến đổi nguyên âm, nuốt âm schwa và nối âm của giọng bản xứ.
            </p>
          </div>
        )}

        {/* Layer 2: Standard Orthography */}
        {(activeLayerTab === "all" || activeLayerTab === "layer2") && (
          <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>LỚP 2 - VĂN BẢN CHÍNH TẢ CHUẨN (Standard Written Orthography):</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl font-serif text-sm text-purple-200 leading-relaxed border border-purple-500/20">
              "{trap.layer2StandardOrthography}"
            </div>
          </div>
        )}

        {/* Layer 3: Trap Deconstruction */}
        {(activeLayerTab === "all" || activeLayerTab === "layer3") && (
          <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>LỚP 3 - GIẢI PHẪU MÁNH LỪA CAMBRIDGE (Cambridge Distractor Anatomy):</span>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-amber-500/20">
              {trap.layer3TrapDeconstruction}
            </p>
          </div>
        )}
      </div>

      {/* Interactive MCQ Drill on this Looped Segment */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2.5 mb-4">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-slate-100">
            Thử Thách Thính Giác: {trap.drillQuestion.prompt}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {trap.drillQuestion.options.map((opt, optIdx) => {
            const isSelected = userSelectedOption === optIdx;
            const isCorrectOption = optIdx === trap.drillQuestion.correctIndex;

            let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-500/20";
              } else if (isSelected && !isCorrectOption) {
                btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200 font-bold";
              } else {
                btnStyle = "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "bg-cyan-600 text-white font-bold ring-2 ring-cyan-400 shadow-lg";
            }

            return (
              <button
                key={`opt_${optIdx}`}
                disabled={isAnswerSubmitted}
                onClick={() => onSubmitAnswer(optIdx)}
                className={`p-3.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswerSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrectOption && (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Alert upon Submission */}
        {isAnswerSubmitted && (
          <div
            className={`p-4 rounded-xl border mb-4 text-xs leading-relaxed animate-fadeIn ${
              isAnswerCorrect
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                : "bg-rose-950/40 border-rose-500/50 text-rose-200"
            }`}
          >
            <div className="font-bold flex items-center gap-2 mb-1">
              {isAnswerCorrect ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Chính xác 100%! Bạn đã bắt trúng thông tin cốt lõi mà không bị phân tâm bởi bẫy.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Chưa chính xác! Bạn đã bị mắc bẫy ngữ âm hoặc bẫy đính chính.</span>
                </>
              )}
            </div>
            <p className="text-slate-300 mt-1">{trap.drillQuestion.explanation}</p>
            <div className="text-[11px] text-amber-300 mt-2 italic bg-slate-950/60 p-2 rounded border border-slate-800">
              💡 Lưu ý ngữ âm giọng {currentAccent.toUpperCase()}: {trap.drillQuestion.accentPhoneticNote}
            </div>
            {!isAnswerCorrect && (
              <div className="text-[10px] text-slate-400 mt-2">
                * Bẫy ngữ âm này đã được tự động gom vào <strong>Ngân Hàng Lỗi Sai (Error Bank)</strong> để ôn tập.
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onOpenSummary}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            <span>Xem Báo Cáo Nhạy Tai (Summary Modal)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
