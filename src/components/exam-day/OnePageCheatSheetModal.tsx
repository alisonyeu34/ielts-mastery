'use client';

import React, { useState } from 'react';
import { CheatSheetSection } from '@/data/mockExamDayWarmupKit';
import {
  FileText,
  Zap,
  PenTool,
  Layers,
  Compass,
  X,
  BookOpen,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface OnePageCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: CheatSheetSection[];
}

export const OnePageCheatSheetModal: React.FC<OnePageCheatSheetModalProps> = ({
  isOpen,
  onClose,
  sections
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(sections[0]?.id || 'cs-shorthand');

  if (!isOpen) return null;

  const currentSection = sections.find((s) => s.id === activeTabId) || sections[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return Zap;
      case 'PenTool':
        return PenTool;
      case 'Layers':
        return Layers;
      case 'Compass':
        return Compass;
      default:
        return FileText;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
                  The 1-Page Exam Day Cheat Sheet
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Cẩm Nang Bỏ Túi Cứu Nguy 60 Giây Trước Giờ G
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sections.map((sec) => {
            const Icon = getIcon(sec.iconName);
            const isSelected = sec.id === activeTabId;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveTabId(sec.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500/60 text-amber-300 shadow-md shadow-amber-950/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold truncate">{sec.titleVi.split(' ')[1] || sec.titleVi}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {currentSection.titleVi}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {currentSection.summaryPoints.map((pt, i) => (
              <div
                key={i}
                className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <strong className="text-white font-medium">{pt.heading}</strong>
                </div>
                <p className="text-slate-300 leading-relaxed pl-5">
                  {pt.body}
                </p>
                {pt.codeSnippet && (
                  <div className="mt-2 p-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300/90 italic">
                    {pt.codeSnippet}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-500">
            Tất cả công thức đã được kiểm chứng bởi Cambridge Assessment Examiners.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20"
          >
            Đã Thuộc Lòng • Sẵn Sàng Vào Phòng Thi
          </button>
        </div>
      </div>
    </div>
  );
};
