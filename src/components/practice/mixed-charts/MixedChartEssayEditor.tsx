"use client";

import React, { useState } from "react";
import { MixedChartEssaySections } from "@/hooks/useMixedChartSession";
import { MixedChartValidationResult } from "@/lib/mixedChartValidator";
import { PenLine, FileText, CheckCircle2, Clock, Sparkles, BookOpen } from "lucide-react";

interface MixedChartEssayEditorProps {
  sections: MixedChartEssaySections;
  onUpdateSection: (key: keyof MixedChartEssaySections, text: string) => void;
  validationResult: MixedChartValidationResult;
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onInsertModelTemplate: () => void;
  onOpenEvaluation: () => void;
  activePhraseToInsert?: string | null;
}

export const MixedChartEssayEditor: React.FC<MixedChartEssayEditorProps> = ({
  sections,
  onUpdateSection,
  validationResult,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onInsertModelTemplate,
  onOpenEvaluation
}) => {
  const [activeTab, setActiveTab] = useState<keyof MixedChartEssaySections>("overview");

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getSectionWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const tabs: { key: keyof MixedChartEssaySections; label: string; placeholder: string; advice: string }[] = [
    {
      key: "introduction",
      label: "1. Paraphrased Intro",
      placeholder: "The bar chart illustrates [Metric 1], while the line graph demonstrates [Metric 2]...",
      advice: "Paraphrase cả 2 biểu đồ độc lập trong 1 câu phức (dùng while / whilst / and)."
    },
    {
      key: "overview",
      label: "2. Dual Overview (Band 8+)",
      placeholder: "Overall, it is noticeable that [Key Trend Chart 1]. Furthermore, [Key Trend Chart 2], establishing a clear correlation between...",
      advice: "Bắt buộc 2-3 câu: Nêu xu hướng lớn nhất của CẢ 2 biểu đồ + Chỉ ra tương quan chéo."
    },
    {
      key: "body1",
      label: "3. Correlated Body 1",
      placeholder: "Regarding the high-performing group, [Category] experienced a twofold surge, which coincided with...",
      advice: "Gom nhóm theo tương quan (ví dụ: nhóm dẫn đầu ở cả 2 biểu đồ). Tránh chỉ tả C1!"
    },
    {
      key: "body2",
      label: "4. Correlated Body 2",
      placeholder: "In stark contrast, [Laggard Category] exhibited a marginal output, dwarfed by...",
      advice: "Gom nhóm dữ liệu đối lập/còn lại với các cấu trúc so sánh bậc cao (in stark contrast, dwarfed by)."
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col space-y-4">
      {/* Header bar with timer and word count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <PenLine className="w-4 h-4 text-indigo-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            4-Paragraph Task 1 Synthesis Studio
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Word Count Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Total Words:</span>
            <span
              className={`font-mono font-bold ${
                validationResult.totalWords >= 150
                  ? "text-emerald-400"
                  : "text-amber-400"
              }`}
            >
              {validationResult.totalWords}/150
            </span>
          </div>

          {/* 20-min Countdown Timer */}
          <button
            type="button"
            onClick={onToggleTimer}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border transition-colors ${
              isTimerRunning
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(timerSeconds)}</span>
            <span className="text-[10px]">{isTimerRunning ? "PAUSE" : "START"}</span>
          </button>

          {/* Load Model Sample */}
          <button
            type="button"
            onClick={onInsertModelTemplate}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 text-xs font-medium transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Xem Bài Mẫu Band 8.5</span>
          </button>
        </div>
      </div>

      {/* Paragraph Tab Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tabs.map((tab) => {
          const isCurrent = activeTab === tab.key;
          const wordCount = getSectionWordCount(sections[tab.key]);
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isCurrent
                  ? "bg-indigo-950/60 border-indigo-500 text-indigo-100 shadow-md shadow-indigo-500/10"
                  : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
              }`}
            >
              <span className="font-semibold text-xs truncate">{tab.label}</span>
              <span className="text-[10px] font-mono text-slate-500 mt-1">
                {wordCount} words
              </span>
            </button>
          );
        })}
      </div>

      {/* Editor Active Panel */}
      {tabs.map((tab) => {
        if (tab.key !== activeTab) return null;
        return (
          <div key={tab.key} className="space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-slate-400 italic">{tab.advice}</span>
              <span className="text-[11px] font-mono text-slate-500">
                {getSectionWordCount(sections[tab.key])} words
              </span>
            </div>

            <textarea
              value={sections[tab.key]}
              onChange={(e) => onUpdateSection(tab.key, e.target.value)}
              placeholder={tab.placeholder}
              rows={6}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-600 font-sans leading-relaxed resize-y"
            />
          </div>
        );
      })}

      {/* Evaluation Trigger Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onOpenEvaluation}
          disabled={validationResult.totalWords < 20}
          className={`px-5 py-2.5 rounded-xl font-semibold text-xs shadow-lg transition-all flex items-center gap-2 ${
            validationResult.totalWords >= 20
              ? "bg-gradient-to-r from-indigo-600 to-emerald-600 text-white hover:from-indigo-500 hover:to-emerald-500 shadow-indigo-500/20"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Đánh Giá Chi Tiết Bài Viết (AI Diagnostic)</span>
        </button>
      </div>
    </div>
  );
};
