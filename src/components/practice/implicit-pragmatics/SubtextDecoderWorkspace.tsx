"use client";

import React from "react";
import { PragmaticExcerptItem } from "@/data/mockPragmaticsDecoderData";
import { PragmaticAnalysisResult } from "@/lib/pragmaticsSubtextEngine";
import { Eye, Sparkles, BookOpen, Volume2, HelpCircle } from "lucide-react";

interface SubtextDecoderWorkspaceProps {
  excerpt: PragmaticExcerptItem;
  highlightedText: string;
  onSelectFluoroscopeText: (text: string) => void;
  fluoroscopeAnalysis: PragmaticAnalysisResult;
}

export const SubtextDecoderWorkspace: React.FC<SubtextDecoderWorkspaceProps> = ({
  excerpt,
  highlightedText,
  onSelectFluoroscopeText,
  fluoroscopeAnalysis
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Không Gian Soi Ngữ Dụng Học (Pragmatic Fluoroscope Workspace)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/30">
            {excerpt.sourceType === "reading_passage3" ? "Reading Passage 3" : "Listening Section 3/4"}
          </span>
          <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full font-medium">
            {excerpt.difficulty}
          </span>
        </div>
      </div>

      {/* Topic Title & Context */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-slate-200">{excerpt.title}</span>
          <span>&bull;</span>
          <span>{excerpt.discipline}</span>
        </div>
      </div>

      {/* Interactive Excerpt Display */}
      <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-slate-200 leading-relaxed font-serif relative">
        <p className="whitespace-pre-line select-text">
          {renderHighlightedExcerpt(excerpt.excerpt, excerpt.ironicMarker, onSelectFluoroscopeText)}
        </p>
      </div>

      {/* Fluoroscope Trigger Action Cue */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Bấm vào cụm từ được gạch chân sáng màu để kích hoạt <strong>Đèn Soi Ngữ Dụng (Fluoroscope)</strong>:</span>
        </div>

        <button
          type="button"
          onClick={() => onSelectFluoroscopeText(excerpt.ironicMarker)}
          className="px-3 py-1 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 text-xs font-mono transition-colors"
        >
          Soi Tín Hiệu: &ldquo;{excerpt.ironicMarker.slice(0, 30)}...&rdquo;
        </button>
      </div>
    </div>
  );
};

function renderHighlightedExcerpt(
  fullText: string,
  marker: string,
  onSelect: (text: string) => void
) {
  if (!marker || !fullText.includes(marker)) {
    return fullText;
  }

  const parts = fullText.split(marker);
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span
              onClick={() => onSelect(marker)}
              className="bg-cyan-950/80 text-cyan-200 border-b-2 border-cyan-400 px-1 py-0.5 rounded cursor-pointer hover:bg-cyan-900/90 transition-all font-sans font-medium"
              title="Click để soi hàm ý ngữ dụng"
            >
              {marker}
            </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
