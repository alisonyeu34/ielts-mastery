'use client';

import React from 'react';
import { PromptForensicCase } from '@/data/mockPromptForensicsData';
import { X, ShieldAlert, AlertTriangle, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

interface StealthDriftDetectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: PromptForensicCase;
}

export const StealthDriftDetectorModal: React.FC<StealthDriftDetectorModalProps> = ({
  isOpen,
  onClose,
  currentCase
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Phòng Giải Phẫu Lạc Đề Ngầm (Stealth Drift Forensics)
              </h3>
              <p className="text-xs text-slate-400">
                {currentCase.cambridgeRef} • {currentCase.topicCategory}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Statement */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-sm font-serif text-slate-200 leading-relaxed italic">
          "{currentCase.promptText}"
        </div>

        {/* Deep Dissection Grid */}
        <div className="space-y-4">
          {/* Trap Explanation */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/60 space-y-2">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Bẫy Lạc Đề Ngầm Phổ Biến (Common Drift Trap)
            </div>
            <p className="text-sm text-rose-200 leading-relaxed">
              {currentCase.stealthDriftAnalysis.commonDriftMistake}
            </p>
          </div>

          {/* Why it caps band 6.0 */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/60 space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Tiêu Chí Chấm Band Descriptors Task Response
            </div>
            <p className="text-sm text-amber-200 leading-relaxed">
              {currentCase.stealthDriftAnalysis.whyItCapsBand6}
            </p>
          </div>

          {/* Band 8.5 Defense Strategy */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/60 space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Chiến Lược Phòng Vệ & Biện Luận Band 8.5+
            </div>
            <p className="text-sm text-emerald-200 leading-relaxed">
              {currentCase.stealthDriftAnalysis.band85DefenseStrategy}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors"
          >
            Đã Hiểu Bản Chất Bẫy • Quay Lại Luyện Tập
          </button>
        </div>
      </div>
    </div>
  );
};
