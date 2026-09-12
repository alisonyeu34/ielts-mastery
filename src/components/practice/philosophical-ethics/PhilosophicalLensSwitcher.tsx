"use client";

import React from "react";
import { PhilosophicalTopic, NormativeLensDetail } from "@/data/mockPhilosophicalEthicsData";
import { Scale, ShieldCheck, Users2, Sparkles, Copy, Check } from "lucide-react";

interface PhilosophicalLensSwitcherProps {
  topic: PhilosophicalTopic;
  activeLens: "utilitarian" | "deontology" | "socialContract";
  onSelectLens: (lens: "utilitarian" | "deontology" | "socialContract") => void;
  onInsertPhrase: (phrase: string) => void;
}

export const PhilosophicalLensSwitcher: React.FC<PhilosophicalLensSwitcherProps> = ({
  topic,
  activeLens,
  onSelectLens,
  onInsertPhrase
}) => {
  const [copiedPhrase, setCopiedPhrase] = React.useState<string | null>(null);

  const handleCopyAndInsert = (phrase: string) => {
    onInsertPhrase(phrase);
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 1500);
  };

  const lenses: {
    id: "utilitarian" | "deontology" | "socialContract";
    name: string;
    subName: string;
    icon: React.ElementType;
    color: string;
    activeBorder: string;
    activeBg: string;
    detail: NormativeLensDetail;
  }[] = [
    {
      id: "utilitarian",
      name: "Chủ Nghĩa Vị Lợi",
      subName: "Utilitarianism (Bentham & Mill)",
      icon: Scale,
      color: "text-amber-400",
      activeBorder: "border-amber-500",
      activeBg: "bg-amber-950/40 shadow-amber-500/10",
      detail: topic.utilitarianLens
    },
    {
      id: "deontology",
      name: "Nghĩa Vụ Luận",
      subName: "Deontological Ethics (Kant)",
      icon: ShieldCheck,
      color: "text-rose-400",
      activeBorder: "border-rose-500",
      activeBg: "bg-rose-950/40 shadow-rose-500/10",
      detail: topic.deontologyLens
    },
    {
      id: "socialContract",
      name: "Khế Ước Xã Hội & Công Bằng",
      subName: "Social Contract & Distributive Justice (Rawls)",
      icon: Users2,
      color: "text-cyan-400",
      activeBorder: "border-cyan-500",
      activeBg: "bg-cyan-950/40 shadow-cyan-500/10",
      detail: topic.socialContractLens
    }
  ];

  const currentLensObj = lenses.find((l) => l.id === activeLens) || lenses[0];

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            3 Khung Biện Luận Triết Lý Đạo Đức Học (Normative Lenses)
          </h3>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full font-mono">
          Band 8.0+ Macro Logic
        </span>
      </div>

      {/* 3 Lens Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {lenses.map((lens) => {
          const Icon = lens.icon;
          const isActive = activeLens === lens.id;
          return (
            <button
              key={lens.id}
              type="button"
              onClick={() => onSelectLens(lens.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? `${lens.activeBg} ${lens.activeBorder} shadow-lg ring-1 ${lens.activeBorder}`
                  : "bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`w-4 h-4 ${lens.color}`} />
                <span className="font-bold text-xs text-slate-100">{lens.name}</span>
              </div>
              <span className="text-[10px] text-slate-400 line-clamp-1">{lens.subName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Lens Detail Card */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Triết Gia Đại Diện &amp; Nguyên Lý Cốt Lõi:
            </span>
            <h4 className="font-semibold text-sm text-slate-200">
              {currentLensObj.detail.philosopher} &bull; {currentLensObj.detail.corePrinciple}
            </h4>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/90 p-3 rounded-lg border border-slate-800/80">
          &ldquo;{currentLensObj.detail.argumentPerspective}&rdquo;
        </p>

        {/* C2 Lexical Toolkit Pills */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Từ Khóa Học Thuật C2 (Click để chèn vào bài):
          </span>
          <div className="flex flex-wrap gap-2">
            {currentLensObj.detail.c2LexicalToolkit.map((term, i) => {
              const isCopied = copiedPhrase === term;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleCopyAndInsert(term)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-400 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>{term}</span>
                  {isCopied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sample C2 Sentence */}
        <div className="pt-2 border-t border-slate-800/80 flex items-start justify-between gap-3 text-xs">
          <div className="text-slate-400">
            <strong className="text-slate-300 block mb-0.5">Mẫu Câu Lập Luận C2 Chuẩn Mực:</strong>
            <span className="text-indigo-300 font-sans leading-relaxed">
              &ldquo;{currentLensObj.detail.sampleSentence}&rdquo;
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopyAndInsert(currentLensObj.detail.sampleSentence)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shrink-0 transition-colors shadow-md"
          >
            Chèn Mẫu Câu
          </button>
        </div>
      </div>
    </div>
  );
};
