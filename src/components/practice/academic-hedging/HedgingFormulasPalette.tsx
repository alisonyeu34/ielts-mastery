"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

interface HedgingFormulasPaletteProps {
  onInsertPhrase: (phrase: string) => void;
}

const HEDGING_TIERS_PALETTE = [
  {
    tierName: "1. Epistemic Modal Auxiliaries (Trợ Động Từ Khả Năng)",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    phrases: [
      { text: "tends to precipitate", desc: "có xu hướng dẫn đến..." },
      { text: "would seem to indicate", desc: "dường như chỉ ra rằng..." },
      { text: "could plausibly alleviate", desc: "rất có thể sẽ làm giảm bớt..." }
    ]
  },
  {
    tierName: "2. Epistemic & Probability Adverbs (Trạng Từ Xác Suất)",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    phrases: [
      { text: "arguably constitutes", desc: "được cho là cấu thành..." },
      { text: "ostensibly maximizes", desc: "về mặt bề nổi dường như tối đa hóa..." },
      { text: "scarcely establishes", desc: "hầu như chưa thể xác lập..." }
    ]
  },
  {
    tierName: "3. Attitudinal Lexical Verbs (Động Từ Thái Độ Học Thuật)",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    phrases: [
      { text: "empirical metrics suggest that", desc: "số liệu thực nghiệm gợi ý rằng..." },
      { text: "the available evidence points toward", desc: "chứng cứ hiện có hướng tới..." },
      { text: "theorists postulate that", desc: "các nhà lý thuyết đặt giả thuyết rằng..." }
    ]
  },
  {
    tierName: "4. Noun-Based Qualifiers (Cụm Danh Từ Rào Đón)",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    phrases: [
      { text: "There is a distinct likelihood that", desc: "Có một khả năng rõ rệt rằng..." },
      { text: "lends considerable credence to the notion that", desc: "tăng thêm độ tin cậy cho quan điểm rằng..." },
      { text: "with a high degree of probability", desc: "với xác suất tương đối cao..." }
    ]
  },
  {
    tierName: "5. Boundary Limiting Clauses (Mệnh Đề Giới Hạn Biên C2)",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    phrases: [
      { text: "subject to the caveat that", desc: "với điều kiện rào đón là..." },
      { text: "insofar as empirical data indicates", desc: "trong chừng mực dữ liệu thực nghiệm chỉ ra..." },
      { text: "in the absence of confounding variables", desc: "trong điều kiện không có biến số gây nhiễu..." }
    ]
  }
];

export const HedgingFormulasPalette: React.FC<HedgingFormulasPaletteProps> = ({
  onInsertPhrase
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  const handleCopy = (phrase: string) => {
    onInsertPhrase(phrase);
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 1500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            5 Tầng Kiến Trúc Rào Đón Học Thuật C1/C2 (Hedging Architecture)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{isOpen ? "Thu gọn" : "Xem 5 tầng công thức"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-slate-800 space-y-4">
          {HEDGING_TIERS_PALETTE.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded border inline-block ${group.badgeColor}`}
              >
                {group.tierName}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {group.phrases.map((p, pIdx) => {
                  const isCopied = copiedPhrase === p.text;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleCopy(p.text)}
                      className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-900 text-left transition-all text-xs flex flex-col justify-between group"
                    >
                      <div className="flex items-center justify-between font-mono font-bold text-slate-200 group-hover:text-cyan-300">
                        <span>{p.text}</span>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">
                        &bull; {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
