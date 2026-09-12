"use client";

import React, { useRef, useEffect } from "react";
import { SpeedReadingMode } from "@/hooks/useSpeedReadingSession";
import { SaccadeChunk, StructuredParagraph } from "@/lib/saccadesEngine";
import { SpeedReadingPassage } from "@/data/mockSpeedReadingData";
import { BookOpen, Sparkles } from "lucide-react";

interface SaccadesPacerCanvasProps {
  mode: SpeedReadingMode;
  passage: SpeedReadingPassage;
  paragraphs: StructuredParagraph[];
  chunks: SaccadeChunk[];
  currentChunkIndex: number;
  isPacingActive: boolean;
  isSkimmingActive: boolean;
  onScanChunkClick: (chunk: SaccadeChunk) => void;
  selectedPassagePhraseId: string | null;
  onSelectPassagePhrase: (pairId: string) => void;
}

export const SaccadesPacerCanvas: React.FC<SaccadesPacerCanvasProps> = ({
  mode,
  passage,
  paragraphs,
  chunks,
  currentChunkIndex,
  isPacingActive,
  isSkimmingActive,
  onScanChunkClick,
  selectedPassagePhraseId,
  onSelectPassagePhrase,
}) => {
  const activeChunkRef = useRef<HTMLSpanElement | null>(null);

  // Auto-scroll passage to keep the active chunk visible during high WPM pacing
  useEffect(() => {
    if (isPacingActive && activeChunkRef.current) {
      activeChunkRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentChunkIndex, isPacingActive]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
      {/* Passage Header */}
      <div className="pb-5 mb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
              {passage.passageType}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {passage.academicDomain}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">
            {passage.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{passage.subTitle}</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>{passage.wordCount} words</span>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <div className="text-slate-400">
            Mục tiêu: <span className="text-amber-400 font-bold">{passage.targetWpmDefault} WPM</span>
          </div>
        </div>
      </div>

      {/* Main Reading Surface */}
      <div className="space-y-6 text-base md:text-lg leading-relaxed text-slate-300 font-serif max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
        {paragraphs.map((p) => {
          return (
            <p
              key={`paragraph_${p.index}`}
              className={`transition-all duration-300 relative pl-4 border-l-2 ${
                mode === "skim"
                  ? "border-cyan-500/40"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {p.chunks.map((chunk) => {
                const isCurrent = isPacingActive && chunk.globalIndex === currentChunkIndex;
                const isPast = isPacingActive && chunk.globalIndex < currentChunkIndex;
                const isFuture = isPacingActive && chunk.globalIndex > currentChunkIndex;

                // Skim Mode highlighting
                const shouldHighlightInSkim =
                  mode === "skim" && (chunk.isTopicSentence || chunk.isConnector);

                // Paraphrase mode matching phrase
                const matchedParaPair = passage.paraphrasePairs.find((pair) =>
                  chunk.text.toLowerCase().includes(pair.passagePhrase.toLowerCase()) ||
                  pair.passagePhrase.toLowerCase().includes(chunk.text.toLowerCase())
                );

                return (
                  <span
                    key={chunk.id}
                    ref={isCurrent ? activeChunkRef : null}
                    onClick={() => {
                      if (mode === "scan") {
                        onScanChunkClick(chunk);
                      } else if (mode === "paraphrase" && matchedParaPair) {
                        onSelectPassagePhrase(matchedParaPair.id);
                      }
                    }}
                    className={`inline-block mx-0.5 my-0.5 px-1.5 py-0.5 rounded transition-all duration-150 ${
                      // 1. Pacer Active State
                      isCurrent
                        ? "bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/30 scale-105 ring-2 ring-amber-300 z-10"
                        : // 2. Pacer Dimming State (Anti-regression)
                        isPacingActive && (isPast || isFuture)
                        ? "opacity-30 text-slate-400 filter blur-[0.3px]"
                        : // 3. Skim Mode Highlighting
                        mode === "skim"
                        ? shouldHighlightInSkim
                          ? chunk.isTopicSentence
                            ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-semibold"
                            : "bg-emerald-500/20 text-emerald-300 font-bold underline decoration-emerald-400/50"
                          : "opacity-25 filter blur-[0.5px]"
                        : // 4. Scan Mode Clickable Target
                        mode === "scan"
                        ? "cursor-crosshair hover:bg-emerald-500/20 hover:text-emerald-200 hover:ring-1 hover:ring-emerald-400 rounded"
                        : // 5. Paraphrase Matchable Node
                        mode === "paraphrase" && matchedParaPair
                        ? selectedPassagePhraseId === matchedParaPair.id
                          ? "bg-purple-500 text-white font-bold ring-2 ring-purple-300 shadow-md cursor-pointer animate-pulse"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/50 font-medium cursor-pointer hover:bg-purple-500/30"
                        : "text-slate-300"
                    }`}
                  >
                    {isCurrent && (
                      <span className="inline-block mr-1 text-slate-950">
                        <Sparkles className="w-3.5 h-3.5 inline animate-spin" />
                      </span>
                    )}
                    {chunk.text}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>

      {/* Saccadic Guidance Tip */}
      {mode === "pacer" && !isPacingActive && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>
              Mẹo chống đọc thầm (Anti Sub-vocalization): Không phát âm từng từ trong cổ họng. Giữ mắt di chuyển nhịp nhàng theo vệt sáng màu vàng!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
