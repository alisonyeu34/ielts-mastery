"use client";

import React, { useState } from "react";
import { BookMarked, Copy, Check, Sparkles, X, ChevronRight } from "lucide-react";

interface NaturalCohesionPaletteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NaturalCohesionPaletteDrawer: React.FC<NaturalCohesionPaletteDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const strategies = [
    {
      title: "1. Kỹ Thuật Đại Từ Quy Chiếu Định Danh (This / Such + Abstract Noun)",
      description: "Tóm gọn thông tin phức tạp của câu trước thành một danh từ học thuật trừu tượng để làm chủ ngữ cho câu sau.",
      phrases: [
        "This modal shift naturally precipitates...",
        "Such stringent regulatory measures ensure...",
        "These compounding socioeconomic disparities...",
        "This multifaceted initiative aims to...",
        "Such unprecedented technological disruption...",
      ],
    },
    {
      title: "2. Kỹ Thuật Phân Từ Bổ Nghĩa Nối Dòng (Participial Flow / V-ing)",
      description: "Gắn kết kết quả hoặc hệ quả tất yếu vào đuôi câu bằng mệnh đề phân từ thay vì mở đầu câu mới bằng 'Furthermore' hoặc 'As a result'.",
      phrases: [
        "..., thereby further alleviating municipal congestion.",
        "..., which in turn fosters economic resilience.",
        "..., while simultaneously diminishing environmental degradation.",
        "..., augmenting the overall efficacy of public services.",
        "..., compounding the existing fiscal deficit.",
      ],
    },
    {
      title: "3. Kỹ Thuật Đẩy Trạng Từ Vào Giữa Câu (Mid-Sentence Inversion)",
      description: "Dời các trạng từ liên kết vào xen giữa chủ ngữ và trợ động từ để tạo cảm giác tự nhiên, không lộ liễu.",
      phrases: [
        "Municipal authorities, however, must consider...",
        "This approach, furthermore, guarantees that...",
        "Educational institutions, conversely, emphasize...",
        "Such policies, in the final analysis, prove vital...",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-700 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <BookMarked className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-100">
                  Palette Chuyển Ý Tự Nhiên C1/C2
                </h3>
                <p className="text-[11px] text-slate-400">
                  Cẩm nang liên kết vô hình (Invisible Cohesion Handbook)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Strategy Sections */}
          <div className="space-y-6">
            {strategies.map((strat, sIdx) => (
              <div
                key={`strat_${sIdx}`}
                className="p-4 bg-slate-950/80 rounded-xl border border-slate-800"
              >
                <h4 className="text-xs font-bold text-amber-300 mb-1">
                  {strat.title}
                </h4>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  {strat.description}
                </p>

                <div className="space-y-2">
                  {strat.phrases.map((phrase, pIdx) => {
                    const isCopied = copiedText === phrase;
                    return (
                      <div
                        key={`phrase_${sIdx}_${pIdx}`}
                        className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80 flex items-center justify-between gap-2 hover:border-slate-700 transition-colors"
                      >
                        <span className="font-serif text-xs text-slate-200 truncate">
                          "{phrase}"
                        </span>
                        <button
                          onClick={() => handleCopy(phrase)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-400 transition-all shrink-0 text-[10px] flex items-center gap-1"
                          title="Copy cụm này"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Đã chép</span>
                            </>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors"
          >
            Đóng Cẩm Nang
          </button>
        </div>
      </div>
    </div>
  );
};
