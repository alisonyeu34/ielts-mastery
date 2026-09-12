'use client';

import React from 'react';
import { IRTItemParameters, calculate3PLProbability } from '@/lib/irtEngine';
import { Layers, CheckCircle2, XCircle, Info } from 'lucide-react';

interface ItemParametersBreakdownTableProps {
  items: IRTItemParameters[];
  selectedItemId: string;
  onSelectItem: (id: string) => void;
  userResponses: Record<string, boolean>;
  onToggleResponse: (id: string) => void;
  studentTheta: number;
}

export const ItemParametersBreakdownTable: React.FC<ItemParametersBreakdownTableProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  userResponses,
  onToggleResponse,
  studentTheta
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Bảng Phân Rã 3 Tham Số Khảo Thí (IRT Item Parameter Matrix)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click vào câu hỏi để vẽ đồ thị ICC hoặc toggle Đúng/Sai để quan sát sự dịch chuyển của Theta.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Section / Passage</th>
              <th className="py-2.5 px-3">Nội Dung Câu Hỏi</th>
              <th className="py-2.5 px-2 text-center">Phân Cách (a)</th>
              <th className="py-2.5 px-2 text-center">Độ Khó (b)</th>
              <th className="py-2.5 px-2 text-center">Đoán Mò (c)</th>
              <th className="py-2.5 px-2 text-center">P(θ) Lý Thuyết</th>
              <th className="py-2.5 px-3 text-center">Kết Quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => {
              const isSelected = item.id === selectedItemId;
              const isCorrect = !!userResponses[item.id];
              const theoreticalP = calculate3PLProbability(studentTheta, item.a, item.b, item.c);

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-950/40 text-white' : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-indigo-400">
                    {item.itemNumber}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-semibold">{item.passageOrSection}</span>
                  </td>
                  <td className="py-2.5 px-3 max-w-[280px] truncate text-slate-400">
                    "{item.questionText}"
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-indigo-300">
                    {item.a.toFixed(2)}
                  </td>
                  <td className={`py-2.5 px-2 text-center font-mono ${item.b > 1.0 ? 'text-rose-400 font-bold' : item.b < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.b > 0 ? `+${item.b.toFixed(2)}` : item.b.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-400">
                    {item.c.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-emerald-400 font-bold">
                    {(theoreticalP * 100).toFixed(0)}%
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleResponse(item.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {isCorrect ? '✓ Đúng' : '✗ Sai'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
