"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ParaphrasePair,
  FSRSVocabPayload,
} from "@/data/mockSpeedReadingData";
import {
  Network,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookMarked,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface ParaphraseBezierLinkerProps {
  paraphrasePairs: ParaphrasePair[];
  selectedQuestionPhraseId: string | null;
  selectedPassagePhraseId: string | null;
  matchedPairs: ParaphrasePair[];
  activeModalPair: ParaphrasePair | null;
  setActiveModalPair: (pair: ParaphrasePair | null) => void;
  paraphraseErrorShake: boolean;
  onSelectQuestionPhrase: (id: string) => void;
  onSelectPassagePhrase: (id: string) => void;
  onAddToVocabMatrix: (entry: FSRSVocabPayload) => Promise<boolean>;
}

export const ParaphraseBezierLinker: React.FC<ParaphraseBezierLinkerProps> = ({
  paraphrasePairs,
  selectedQuestionPhraseId,
  selectedPassagePhraseId,
  matchedPairs,
  activeModalPair,
  setActiveModalPair,
  paraphraseErrorShake,
  onSelectQuestionPhrase,
  onSelectPassagePhrase,
  onAddToVocabMatrix,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svgPaths, setSvgPaths] = useState<
    Array<{ id: string; d: string; isCorrect: boolean }>
  >([]);
  const [addedVocabIds, setAddedVocabIds] = useState<Record<string, boolean>>({});

  // Recalculate SVG Bezier Curves between matched pairs
  const updateBezierCables = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPaths: Array<{ id: string; d: string; isCorrect: boolean }> = [];

    matchedPairs.forEach((pair) => {
      const qEl = document.getElementById(`q_phrase_${pair.id}`);
      const pEl = document.getElementById(`p_phrase_${pair.id}`);

      if (qEl && pEl) {
        const qRect = qEl.getBoundingClientRect();
        const pRect = pEl.getBoundingClientRect();

        const x1 = qRect.right - containerRect.left;
        const y1 = qRect.top + qRect.height / 2 - containerRect.top;
        const x2 = pRect.left - containerRect.left;
        const y2 = pRect.top + pRect.height / 2 - containerRect.top;

        const controlX1 = x1 + (x2 - x1) * 0.45;
        const controlX2 = x1 + (x2 - x1) * 0.55;

        const pathData = `M ${x1} ${y1} C ${controlX1} ${y1}, ${controlX2} ${y2}, ${x2} ${y2}`;
        newPaths.push({ id: pair.id, d: pathData, isCorrect: true });
      }
    });

    setSvgPaths(newPaths);
  }, [matchedPairs]);

  useEffect(() => {
    updateBezierCables();
    window.addEventListener("resize", updateBezierCables);
    return () => window.removeEventListener("resize", updateBezierCables);
  }, [updateBezierCables]);

  const handleAddFSRS = async (pair: ParaphrasePair) => {
    const success = await onAddToVocabMatrix(pair.fsrsVocabEntry);
    if (success) {
      setAddedVocabIds((prev) => ({ ...prev, [pair.id]: true }));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`bg-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-2xl relative mb-6 ${
        paraphraseErrorShake ? "animate-shake ring-2 ring-rose-500" : ""
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Bản Đồ Nối Paraphrase 2 Chiều (2-Way Paraphrase Matrix)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-mono">
                {matchedPairs.length}/{paraphrasePairs.length} Cặp đã nối
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Chọn 1 cụm từ trong Câu hỏi (Cột trái) và chọn cụm từ tương đương trong Bài đọc (Cột phải).
            </p>
          </div>
        </div>
      </div>

      {/* SVG Canvas for Bezier Cables */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="neonCyanPurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {svgPaths.map((item) => (
          <g key={`cable_${item.id}`}>
            <path
              d={item.d}
              fill="none"
              stroke="url(#neonCyanPurple)"
              strokeWidth="3.5"
              filter="url(#neonGlow)"
              className="transition-all duration-300"
            />
          </g>
        ))}
      </svg>

      {/* 2-Column Interactive Linking Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
        {/* Left Column: Question Prompts */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>1. Cụm từ trong Đề Thi / Câu Hỏi</span>
          </div>

          {paraphrasePairs.map((pair) => {
            const isSelected = selectedQuestionPhraseId === pair.id;
            const isMatched = matchedPairs.some((p) => p.id === pair.id);

            return (
              <div
                key={`q_${pair.id}`}
                id={`q_phrase_${pair.id}`}
                onClick={() => {
                  if (!isMatched) onSelectQuestionPhrase(pair.id);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isMatched
                    ? "bg-purple-950/40 border-purple-500/60 text-purple-200 shadow-md shadow-purple-500/10"
                    : isSelected
                    ? "bg-purple-600 text-white font-bold ring-2 ring-purple-300 shadow-xl scale-[1.02]"
                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-purple-500/40 hover:bg-slate-950"
                }`}
              >
                <div className="text-xs text-slate-400 mb-1.5 italic">
                  "{pair.questionContext}"
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-purple-300 font-mono">
                    "{pair.questionPhrase}"
                  </span>
                  {isMatched && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đã ghép
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Passage Excerpts */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>2. Cụm từ tương đương trong Bài Đọc</span>
          </div>

          {paraphrasePairs.map((pair) => {
            const isSelected = selectedPassagePhraseId === pair.id;
            const isMatched = matchedPairs.some((p) => p.id === pair.id);

            return (
              <div
                key={`p_${pair.id}`}
                id={`p_phrase_${pair.id}`}
                onClick={() => {
                  if (!isMatched) onSelectPassagePhrase(pair.id);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isMatched
                    ? "bg-cyan-950/40 border-cyan-500/60 text-cyan-200 shadow-md shadow-cyan-500/10"
                    : isSelected
                    ? "bg-cyan-600 text-white font-bold ring-2 ring-cyan-300 shadow-xl scale-[1.02]"
                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-950"
                }`}
              >
                <div className="text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 font-mono">
                    Đoạn {pair.passageParagraphIndex + 1}
                  </span>
                  <span>Từ bài đọc Passage:</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-cyan-300 font-mono">
                    "{pair.passagePhrase}"
                  </span>
                  {isMatched && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalPair(pair);
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 border border-cyan-500/40 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Chi tiết luật
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popover / Rule Breakdown Card for Matched Pair */}
      {activeModalPair && (
        <div className="mt-8 bg-slate-950 border border-purple-500/40 rounded-2xl p-6 shadow-2xl relative z-30 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 border border-purple-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {activeModalPair.ruleNameVi}
                </span>
                <h4 className="text-base font-extrabold text-slate-100 mt-1">
                  Giải Mã Quy Luật Paraphrase Cambridge
                </h4>
              </div>
            </div>

            <button
              onClick={() => handleAddFSRS(activeModalPair)}
              disabled={addedVocabIds[activeModalPair.id]}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                addedVocabIds[activeModalPair.id]
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg"
              }`}
            >
              <BookMarked className="w-4 h-4" />
              <span>
                {addedVocabIds[activeModalPair.id]
                  ? "Đã Thêm Vào FSRS Vocab"
                  : "+ Nạp Vào Sổ Từ Vựng FSRS"}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                <span>Cơ Chế Biến Đổi:</span>
              </div>
              <p className="text-slate-400 leading-relaxed">{activeModalPair.explanation}</p>
            </div>

            <div className="p-3.5 bg-rose-950/20 rounded-xl border border-rose-500/30">
              <div className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Cảnh Báo Bẫy Từ Gây Nhiễu (Distractor Trap):</span>
              </div>
              <p className="text-rose-200/80 leading-relaxed">
                {activeModalPair.distractorTrapWarning}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
