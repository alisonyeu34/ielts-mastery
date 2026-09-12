"use client";

import React from "react";
import { RSVPChunk } from "@/lib/antiSubvocalizationEngine";
import { FastForward, Sparkles, Target, Zap } from "lucide-react";

interface MultiWordRSVPViewerProps {
  chunks: RSVPChunk[];
  activeChunkIndex: number;
  isRSVPActive: boolean;
  targetWpm: number;
}

export const MultiWordRSVPViewer: React.FC<MultiWordRSVPViewerProps> = ({
  chunks,
  activeChunkIndex,
  isRSVPActive,
  targetWpm,
}) => {
  const currentChunk = chunks[activeChunkIndex] || chunks[0];
  const progressPercent =
    chunks.length > 0 ? Math.round(((activeChunkIndex + 1) / chunks.length) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6 flex flex-col items-center justify-center min-h-[400px]">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between pb-4 mb-8 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
          <FastForward className="w-4 h-4" />
          <span>Bộ Nén Thị Giác RSVP Đa Từ (Multi-Word RSVP Compression)</span>
        </div>
        <div className="font-mono text-xs text-slate-400">
          Khối: <span className="text-cyan-300 font-bold">{activeChunkIndex + 1}</span>/{chunks.length} ({progressPercent}%)
        </div>
      </div>

      {/* Center RSVP Visual Box with Focal Target */}
      <div className="relative w-full max-w-xl p-10 rounded-3xl bg-slate-950 border-2 border-cyan-500/40 shadow-2xl flex flex-col items-center justify-center text-center my-6">
        {/* Central Focal Crosshairs */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-cyan-500/30">
          <Target className="w-4 h-4" />
        </div>

        {/* Flashing Visual Word Group */}
        <div className="text-2xl sm:text-4xl font-black font-serif text-slate-100 tracking-wide min-h-[60px] flex items-center justify-center">
          {isRSVPActive ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-300 animate-fadeIn">
              {currentChunk?.chunkText}
            </span>
          ) : (
            <span className="text-slate-500 text-lg font-sans font-normal">
              Nhấn 'Bắt Đầu Đọc Ép Tiến' để kích hoạt RSVP
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-400 font-bold">
          {targetWpm} WPM FOCUS POINT
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xl bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
        <div
          className="bg-cyan-500 h-full rounded-full transition-all duration-200"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className="text-xs text-slate-400 text-center max-w-md italic">
        * Nhìn cố định vào điểm trung tâm. Não bộ sẽ tự động tiếp thu nghĩa của cả cụm 3-4 từ mà không cần mắt quét ngang hay thanh quản rung phát âm thầm.
      </p>
    </div>
  );
};
