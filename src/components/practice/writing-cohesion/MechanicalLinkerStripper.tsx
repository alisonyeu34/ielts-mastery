"use client";

import React, { useState } from "react";
import {
  DetectedMechanicalLinker,
  CohesionRewriteOption,
} from "@/lib/mechanicalLinkerDetector";
import {
  Scissors,
  CheckCircle2,
  Sparkles,
  BookMarked,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface MechanicalLinkerStripperProps {
  detectedLinkers: DetectedMechanicalLinker[];
  onApplyRewrite: (originalSentence: string, rewrittenSentence: string) => void;
  onAddToVocab: (payload: {
    word: string;
    ipa: string;
    meaning: string;
    collocations: string[];
    originalContext: string;
  }) => Promise<boolean>;
}

export const MechanicalLinkerStripper: React.FC<MechanicalLinkerStripperProps> = ({
  detectedLinkers,
  onApplyRewrite,
  onAddToVocab,
}) => {
  const [addedVocabIndices, setAddedVocabIndices] = useState<Record<string, boolean>>({});

  const handleAddFSRS = async (key: string, option: CohesionRewriteOption) => {
    if (!option.nominalizationVocabPayload) return;
    const success = await onAddToVocab(option.nominalizationVocabPayload);
    if (success) {
      setAddedVocabIndices((prev) => ({ ...prev, [key]: true }));
    }
  };

  if (detectedLinkers.length === 0) {
    return (
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-emerald-300">
            Tuyệt Vời! Đoạn Văn Đã Sạch Bóng Liên Từ Máy Móc
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Không phát hiện các liên từ thô sơ như <em>Firstly, Furthermore, In addition</em>. Toàn bộ mạch lạc đã được xử lý tự nhiên theo chuẩn C1/C2 (Band 8.0+ CC).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Xưởng Triệt Tiêu Liên Từ Máy Móc (Mechanical Linker Stripper)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono">
                {detectedLinkers.length} Liên từ cần gỡ bỏ
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Chọn một chiến thuật bên dưới để thay thế 1-chạm liên từ đầu câu thành cấu trúc C1/C2 vô hình.
            </p>
          </div>
        </div>
      </div>

      {/* Detected Linkers List */}
      <div className="space-y-6">
        {detectedLinkers.map((item, itemIdx) => (
          <div
            key={item.id}
            className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800"
          >
            {/* Original Sentence */}
            <div className="mb-4 pb-3 border-b border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                !
              </span>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">
                  Câu Chứa Liên Từ Thô Sơ:
                </div>
                <div className="text-sm font-serif text-slate-200 mt-0.5">
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded font-bold mr-1">
                    {item.linkerFound}
                  </span>
                  {item.originalSentence.substring(item.linkerFound.length)}
                </div>
              </div>
            </div>

            {/* 3 Replacement Strategy Options */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {item.rewriteOptions.map((opt, optIdx) => {
                const vocabKey = `${item.id}_${optIdx}`;
                const isVocabAdded = addedVocabIndices[vocabKey];

                return (
                  <div
                    key={`opt_${item.id}_${optIdx}`}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-amber-400 uppercase mb-1.5">
                        {opt.strategyLabelVi}
                      </div>
                      <div className="text-xs font-serif text-slate-100 font-medium leading-relaxed mb-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                        "{opt.rewrittenSentence}"
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {opt.cohesiveDeviceExplanation}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() =>
                          onApplyRewrite(item.originalSentence, opt.rewrittenSentence)
                        }
                        className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/15"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Áp Dụng</span>
                      </button>

                      {opt.nominalizationVocabPayload && (
                        <button
                          onClick={() => handleAddFSRS(vocabKey, opt)}
                          disabled={isVocabAdded}
                          className={`p-2 rounded-lg text-xs font-bold border transition-colors ${
                            isVocabAdded
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : "bg-slate-800 hover:bg-purple-600 hover:text-white text-purple-300 border-purple-500/30"
                          }`}
                          title={isVocabAdded ? "Đã lưu vào FSRS" : "Lưu cụm từ này vào Sổ FSRS"}
                        >
                          <BookMarked className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
