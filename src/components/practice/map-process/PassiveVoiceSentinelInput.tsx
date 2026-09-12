"use client";

import React from "react";
import {
  analyzeProcessPassiveRatio,
  validateSpatialPrepositions
} from "@/lib/mapProcessValidator";

interface PassiveVoiceSentinelInputProps {
  taskType: 'map' | 'process';
  essayText: string;
  onUpdateEssay: (text: string) => void;
  onLoadSample: () => void;
  onReset: () => void;
  onEvaluate: () => void;
  onOpenPrepositionHelper: () => void;
}

export const PassiveVoiceSentinelInput: React.FC<PassiveVoiceSentinelInputProps> = ({
  taskType,
  essayText,
  onUpdateEssay,
  onLoadSample,
  onReset,
  onEvaluate,
  onOpenPrepositionHelper
}) => {
  const words = essayText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const passiveAudit = taskType === 'process' ? analyzeProcessPassiveRatio(essayText) : null;
  const prepAudit = taskType === 'map' ? validateSpatialPrepositions(essayText) : null;

  const isWordCountSufficient = wordCount >= 150;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-md">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-base">
              ✍️
            </span>
            <h3 className="text-base font-bold text-white">
              Trình Soạn Thảo & Radar Kiểm Soát Ngữ Pháp Task 1
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {taskType === 'map'
              ? 'Tự động kiểm soát giới từ không gian in/to/on và động từ quy hoạch đô thị'
              : 'Bộ canh gác thể bị động (Passive Voice Sentinel) bắt lỗi chủ ngữ con người chủ động'}
          </p>
        </div>

        {/* Word Count Indicator & Load Sample Button */}
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Số từ đã viết
            </span>
            <span className={`font-mono text-base font-bold ${isWordCountSufficient ? 'text-emerald-400' : 'text-amber-400'}`}>
              {wordCount} <span className="text-xs text-slate-500">/ 150+ từ</span>
            </span>
          </div>

          <button
            onClick={onLoadSample}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
          >
            Nạp Bài Mẫu Band 8.5+
          </button>
        </div>
      </div>

      {/* Live Warning Banners */}
      {taskType === 'process' && passiveAudit && passiveAudit.activeHumanSubjectViolations.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 space-y-1 animate-pulse">
          <span className="font-bold flex items-center gap-1.5 text-rose-400">
            <span>⚠️</span>
            <span>Cảnh Báo Thể Chủ Động Trong Quy Trình:</span>
          </span>
          <p className="pl-5">
            Phát hiện {passiveAudit.activeHumanSubjectViolations.length} câu sử dụng chủ ngữ con người ({passiveAudit.activeHumanSubjectViolations.map(v => v.snippet).join(', ')}). Bắt buộc phải chuyển thành thể bị động khách quan (is/are + V3).
          </p>
        </div>
      )}

      {taskType === 'map' && prepAudit && prepAudit.errors.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-300 space-y-1">
          <span className="font-bold flex items-center gap-1.5 text-amber-400">
            <span>⚠️</span>
            <span>Cảnh Báo Giới Từ Không Gian:</span>
          </span>
          <p className="pl-5">
            {prepAudit.errors[0]?.ruleExplanation}
          </p>
        </div>
      )}

      {/* Main Textarea */}
      <div className="space-y-2">
        <textarea
          rows={10}
          value={essayText}
          onChange={(e) => onUpdateEssay(e.target.value)}
          placeholder={
            taskType === 'map'
              ? 'Viết bài mô tả bản đồ tại đây...\nĐoạn 1: Introduction (Paraphrase đề bài)\nĐoạn 2: Overview (2 xu hướng biến đổi chính: công nghiệp hóa & mở rộng dân cư)\nĐoạn 3: Chi tiết khu vực phía Tây/Bắc\nĐoạn 4: Chi tiết khu vực phía Đông/Nam'
              : 'Viết bài mô tả quy trình tại đây...\nĐoạn 1: Introduction (Paraphrase đề bài)\nĐoạn 2: Overview (Tổng số bước từ nguyên liệu thô đến thành phẩm)\nĐoạn 3: Các công đoạn xử lý ban đầu (Sử dụng 100% bị động)\nĐoạn 4: Các công đoạn hoàn thiện và đóng gói'
          }
          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-600 leading-relaxed resize-y font-sans"
        />
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          {taskType === 'map' && (
            <button
              onClick={onOpenPrepositionHelper}
              className="px-3.5 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>📖</span>
              <span>Quy Tắc Giới Từ In/To/On</span>
            </button>
          )}

          <button
            onClick={onReset}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium transition-all"
          >
            Xóa Trắng
          </button>
        </div>

        <button
          onClick={onEvaluate}
          disabled={wordCount < 30}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-indigo-950/50 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>📊</span>
          <span>Chấm Điểm & Phân Tích Lỗi Task 1</span>
        </button>
      </div>
    </div>
  );
};
