"use client";

import React from "react";
import {
  Mic,
  Square,
  Send,
  Sparkles,
  Clock,
  BookMarked,
  Plus,
} from "lucide-react";

interface SocraticRebuttalWorkbenchProps {
  userDraftText: string;
  setUserDraftText: (text: string) => void;
  isRecordingVoice: boolean;
  onToggleVoice: () => void;
  roundSecondsLeft: number;
  currentRound: 1 | 2 | 3;
  onSubmitTurn: () => void;
  onInsertTemplate: (phrase: string) => void;
  collocations: Array<{ phrase: string; meaning: string; pos: string }>;
  onAddCollocation: (item: { phrase: string; meaning: string; pos: string }) => Promise<boolean>;
}

export const SocraticRebuttalWorkbench: React.FC<SocraticRebuttalWorkbenchProps> = ({
  userDraftText,
  setUserDraftText,
  isRecordingVoice,
  onToggleVoice,
  roundSecondsLeft,
  currentRound,
  onSubmitTurn,
  onInsertTemplate,
  collocations,
  onAddCollocation,
}) => {
  const templates = [
    "While it is true that...",
    "Admittedly, direct interventions pose...",
    "Nonetheless, this perspective fails to account for...",
    "To a certain extent, it is reasonable to hypothesize that...",
    "Subject to strict statutory oversight,...",
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header with Timer and Round Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-mono">
            R{currentRound}
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100">
              Bàn Soạn Thảo Phản Biện (Socratic Rebuttal Workbench)
            </h3>
            <p className="text-[11px] text-slate-400">
              {currentRound === 1
                ? "Thiết lập luận điểm ban đầu (Thesis Statement)"
                : currentRound === 2
                ? "Hóa giải phản đề và tình thế tiến thoái lưỡng nan"
                : "Tái khẳng định lập trường bằng ngôn ngữ rào đón đỉnh cao"}
            </p>
          </div>
        </div>

        {/* 90s Timer */}
        <div className="flex items-center gap-2 font-mono text-xs bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Thời gian phản xạ:</span>
          <span
            className={`font-bold text-sm ${
              roundSecondsLeft <= 20 ? "text-rose-400 animate-pulse" : "text-amber-400"
            }`}
          >
            {roundSecondsLeft}s
          </span>
        </div>
      </div>

      {/* C1 Concession & Hedging Quick Templates Palette */}
      <div className="mb-4">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Chèn Cấu Trúc Nhượng Bộ & Rào Đón C1:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {templates.map((tpl, idx) => (
            <button
              key={`tpl_${idx}`}
              onClick={() => onInsertTemplate(tpl)}
              className="px-2.5 py-1 rounded-lg text-xs font-serif bg-slate-950 hover:bg-purple-950/60 hover:border-purple-500 text-purple-200 border border-slate-800 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3 text-purple-400" />
              <span>"{tpl}"</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea */}
      <textarea
        value={userDraftText}
        onChange={(e) => setUserDraftText(e.target.value)}
        rows={4}
        placeholder="Soạn thảo câu trả lời của bạn (hoặc nhấn nút Mic để thu âm giọng nói trực tiếp)..."
        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-serif leading-relaxed custom-scrollbar mb-4"
      />

      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {/* Mic Toggle Button */}
        <button
          onClick={onToggleVoice}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            isRecordingVoice
              ? "bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/30"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          }`}
        >
          {isRecordingVoice ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Dừng Ghi m Giọng Nói</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bật Thu m Trả Lời (Voice Rebuttal)</span>
            </>
          )}
        </button>

        {/* Submit Turn Button */}
        <button
          onClick={onSubmitTurn}
          disabled={!userDraftText.trim()}
          className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${
            userDraftText.trim()
              ? "bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Gửi Luận Điểm [Hiệp {currentRound}]</span>
        </button>
      </div>

      {/* Collocations Suggestion footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
          <BookMarked className="w-3.5 h-3.5 text-cyan-400" />
          <span>Collocations khuyên dùng:</span>
          {collocations.slice(0, 2).map((col, idx) => (
            <button
              key={`col_${idx}`}
              onClick={() => onInsertTemplate(col.phrase)}
              className="text-cyan-300 hover:underline font-mono"
            >
              "{col.phrase}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
