"use client";

import React from "react";
import { X, Sparkles, AlertCircle, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { ToulminDebateTopic } from "@/data/mockToulminDebatesData";

interface PEELvsToulminModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: ToulminDebateTopic;
}

export const PEELvsToulminModal: React.FC<PEELvsToulminModalProps> = ({
  isOpen,
  onClose,
  topic
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-indigo-950/50 p-6 md:p-8 text-slate-100 overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-emerald-200">
              Đối Chiếu Lập Luận: PEEL (Band 6.0) vs Toulmin (Band 8.5)
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              Chủ đề: {topic.topicTitle}
            </p>
          </div>
        </div>

        {/* 2-Column Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column: PEEL Band 6.0 */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Mô Hình PEEL Tuyến Tính (Band 6.0)
              </span>
              <span className="text-xs font-mono font-black bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                Band 6.0
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-serif text-xs text-slate-300 leading-relaxed italic">
              &ldquo;{topic.peelParagraph.text}&rdquo;
            </div>

            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-900/40 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300 block mb-0.5">Nhận xét của giám khảo:</strong>
              {topic.peelParagraph.critique}
            </div>
          </div>

          {/* Right Column: Toulmin Band 8.5 */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Mô Hình Toulmin Đa Tầng (Band 8.5+)
              </span>
              <span className="text-xs font-mono font-black bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                Band 8.5
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-serif text-xs text-slate-200 leading-relaxed italic">
              &ldquo;{topic.toulminParagraph.text}&rdquo;
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-xs text-emerald-200/90 leading-relaxed">
              <strong className="text-emerald-300 block mb-0.5">Tại sao đạt Band 8.5+ Task Response:</strong>
              {topic.toulminParagraph.strengthsAnalysis}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700 transition-colors"
          >
            Đóng Khung Đối Chiếu
          </button>
        </div>
      </div>
    </div>
  );
};
