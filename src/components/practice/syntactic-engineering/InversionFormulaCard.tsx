"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, ShieldCheck } from "lucide-react";

interface InversionFormulaCardProps {
  onInsertTemplate: (tpl: string) => void;
}

const INVERSION_FORMULAS = [
  {
    category: "Negative Adverbial Inversion (Đảo Ngữ Phủ Định)",
    color: "border-indigo-500/40 bg-indigo-950/20 text-indigo-300",
    templates: [
      {
        formula: "Seldom + have/do + Subject + Verb...",
        example: "Seldom have governments allocated sufficient fiscal resources to...",
        meaning: "Hiếm khi chính phủ phân bổ đủ nguồn lực tài khóa cho..."
      },
      {
        formula: "Under no circumstances + should/must + Subject + Verb...",
        example: "Under no circumstances should policymakers compromise fundamental privacy rights...",
        meaning: "Trong bất kỳ hoàn cảnh nào, các nhà hoạch định chính sách cũng không được..."
      },
      {
        formula: "Scarcely had + Subject + Verb-ed + when...",
        example: "Scarcely had the new legislation taken effect when public protests erupted...",
        meaning: "Đạo luật mới vừa có hiệu lực thì các cuộc phản đối đã bùng nổ..."
      }
    ]
  },
  {
    category: "Conditional Inversion (Đảo Ngữ Câu Điều Kiện Bỏ 'If')",
    color: "border-cyan-500/40 bg-cyan-950/20 text-cyan-300",
    templates: [
      {
        formula: "Were + Subject + to + Verb...",
        example: "Were authorities to institute progressive taxation schemes, wealth inequality would drop...",
        meaning: "Nếu chính quyền thiết lập các biểu thuế lũy tiến (Loại 2 trang trọng)..."
      },
      {
        formula: "Had + Subject + Verb-ed (Past Participle)...",
        example: "Had proactive mitigation measures been adopted earlier, the ecological collapse could have been averted...",
        meaning: "Nếu các biện pháp giảm thiểu được áp dụng sớm hơn (Loại 3)..."
      },
      {
        formula: "Should + Subject + Verb...",
        example: "Should this trend of automation persist, widespread labor displacement will accelerate...",
        meaning: "Nếu xu hướng tự động hóa này tiếp tục tiếp diễn (Loại 1)..."
      }
    ]
  }
];

export const InversionFormulaCard: React.FC<InversionFormulaCardProps> = ({
  onInsertTemplate
}) => {
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const handleCopy = (snippet: string) => {
    onInsertTemplate(snippet);
    setCopiedFormula(snippet);
    setTimeout(() => setCopiedFormula(null), 1500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Công Thức Đảo Ngữ Học Thuật (Academic Inversion Toolkit)
          </h3>
        </div>
        <span className="text-xs text-slate-400">Click để chèn mẫu vào khung soạn thảo</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INVERSION_FORMULAS.map((group, idx) => (
          <div key={idx} className={`p-4 rounded-xl border ${group.color} space-y-3`}>
            <span className="text-xs font-bold uppercase tracking-wider block opacity-90">
              {group.category}
            </span>

            <div className="space-y-2.5">
              {group.templates.map((tpl, tIdx) => {
                const isCopied = copiedFormula === tpl.example;
                return (
                  <div
                    key={tIdx}
                    onClick={() => handleCopy(tpl.example)}
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-400/60 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-200">
                      <span>{tpl.formula}</span>
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans italic">
                      &ldquo;{tpl.example}&rdquo;
                    </p>
                    <span className="text-[10px] text-slate-500">
                      &bull; {tpl.meaning}
                    </span>
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
