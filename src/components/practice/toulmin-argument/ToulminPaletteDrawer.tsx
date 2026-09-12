"use client";

import React from "react";
import { X, BookOpen, Plus, Sparkles, Check } from "lucide-react";
import { ToulminDebateTopic } from "@/data/mockToulminDebatesData";
import { ToulminRole, TOULMIN_ROLES_CONFIG } from "@/lib/toulminStructureValidator";

interface ToulminPaletteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  topic: ToulminDebateTopic;
  onInsertConnector: (role: ToulminRole, connector: string) => void;
}

export const ToulminPaletteDrawer: React.FC<ToulminPaletteDrawerProps> = ({
  isOpen,
  onClose,
  topic,
  onInsertConnector
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-indigo-950/50 p-6 text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Cẩm Nang Mẫu Câu & Liên Từ Phản Biện Toulmin C1/C2
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of 6 Categories */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {topic.transitionVocabularyList.map((item) => {
            const roleConfig = TOULMIN_ROLES_CONFIG[item.role];

            return (
              <div
                key={item.role}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${roleConfig.colorTheme.badgeBg}`}>
                    {roleConfig.label} - {roleConfig.vietnameseTitle.split(" (")[0]}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.connectors.map((conn, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onInsertConnector(item.role, conn);
                        onClose();
                      }}
                      className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-750 hover:border-indigo-500/50 text-left text-xs text-slate-200 transition-all flex items-center justify-between group"
                    >
                      <span className="font-serif italic line-clamp-1">{conn}</span>
                      <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 mt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
