"use client";

import React, { useRef } from "react";
import { PenTool, Brain, ArrowRight, Sparkles } from "lucide-react";

interface ShorthandCapturePadProps {
  notes: string;
  onChangeNotes: (text: string) => void;
  onStartReconstruction: () => void;
  latencyWarning: boolean;
  isPlaying: boolean;
}

export const ShorthandCapturePad: React.FC<ShorthandCapturePadProps> = ({
  notes,
  onChangeNotes,
  onStartReconstruction,
  latencyWarning,
  isPlaying
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = notes.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Phase 1: Rapid Stenographic Capture Pad
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
            <span>{wordCount} shorthand tokens</span>
          </div>

          <button
            type="button"
            onClick={onStartReconstruction}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <span>Chuyển Sang Sprint Tái Tạo (Phase 2)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Latency / Working Memory Warning Banner */}
      {latencyWarning && (
        <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/50 text-amber-300 text-xs flex items-center gap-2 animate-pulse">
          <Brain className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Acoustic Latency Warning:</strong> Bạn đang dừng ghi chép quá 4.5 giây trong khi bài giảng đang phát! Bộ nhớ làm việc (Working Memory) có nguy cơ quá tải. Hãy ghi chú nhanh bằng các ký hiệu tốc ký viết tắt.
          </span>
        </div>
      )}

      {/* Main Textarea */}
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder="Gõ tốc ký trong lúc nghe Section 4...
Ví dụ: 
- microplastics + org matter → marine snow (dense particles) ↓ seabed
- vector ≠ nets | vector = \ind synthetic fibres
- bio tox localized in \bio enzymes of detritivores
- sharks: livers = severe \inc tox → \dec reproductive lifespan"
          rows={10}
          className="w-full bg-slate-950/90 border border-slate-700 rounded-xl p-4 text-cyan-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-slate-600 font-mono leading-relaxed resize-y"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Tốc ký không cần đúng ngữ pháp câu. Hãy tập trung bắt Danh Từ Cốt Lõi và Mối Quan Hệ Nhân Quả.</span>
        </div>
        <span className="font-mono text-slate-500 text-[11px]">
          {isPlaying ? "Đang ghi nhận tín hiệu âm học..." : "Sẵn sàng nghe"}
        </span>
      </div>
    </div>
  );
};
