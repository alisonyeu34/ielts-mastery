"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

interface HighOrderComparisonPaletteProps {
  onInsertPhrase: (phrase: string) => void;
}

interface PaletteItem {
  category: string;
  badgeColor: string;
  templates: {
    label: string;
    snippet: string;
    vietnameseMeaning: string;
  }[];
}

const COMPARISON_TEMPLATES: PaletteItem[] = [
  {
    category: "Multiplicative Comparison (Gấp bội / Phân số)",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    templates: [
      {
        label: "More than doubled / tripled",
        snippet: "more than doubled, surging from [X] to [Y]",
        vietnameseMeaning: "tăng hơn gấp đôi / gấp ba"
      },
      {
        label: "Double / Triple that of",
        snippet: "recording [X], double that of [Country/Category] at [Y]",
        vietnameseMeaning: "gấp đôi / gấp ba con số của..."
      },
      {
        label: "Exceeded by a factor of...",
        snippet: "exceeded the output of [Category] by a factor of three",
        vietnameseMeaning: "vượt qua gấp 3 lần"
      }
    ]
  },
  {
    category: "Proportional Representation (Tỷ trọng áp đảo)",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    templates: [
      {
        label: "Predominant proportion / Lion's share",
        snippet: "accounted for a predominant proportion of [X]%",
        vietnameseMeaning: "chiếm tỷ trọng áp đảo / phần lớn nhất"
      },
      {
        label: "Two-thirds / Seven-tenths share",
        snippet: "commanding a two-thirds share of total volume",
        vietnameseMeaning: "nắm giữ 2/3 tổng thị phần"
      },
      {
        label: "Marginal fraction / Negligible niche",
        snippet: "occupied a marginal fraction, constituting a mere [X]%",
        vietnameseMeaning: "chỉ chiếm một phần nhỏ không đáng kể"
      }
    ]
  },
  {
    category: "Inverse / Divergent Dynamics (Nghịch biến / Phân kỳ)",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    templates: [
      {
        label: "In inverse proportion to",
        snippet: "fluctuated in inverse proportion to the changes observed in [Metric]",
        vietnameseMeaning: "tỷ lệ nghịch với..."
      },
      {
        label: "Diverged sharply from",
        snippet: "the trajectory of [A] diverged sharply from that of [B]",
        vietnameseMeaning: "phân kỳ / đi ngược hướng rõ rệt với"
      },
      {
        label: "Stark contrast / Opposite trend",
        snippet: "In stark contrast to the upward surge in [A], [B] dropped by [X]%",
        vietnameseMeaning: "Trái ngược hoàn toàn với sự tăng vọt của..."
      }
    ]
  },
  {
    category: "Asymmetric Juxtaposition (Lấn át / Lu mờ)",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    templates: [
      {
        label: "Dwarfed by / Eclipsed",
        snippet: "a figure dwarfed by the massive output of [Leading Category]",
        vietnameseMeaning: "bị lu mờ / áp đảo hoàn toàn bởi..."
      },
      {
        label: "Outstripped / Surpassed",
        snippet: "easily outstripped the collective figures of [B] and [C]",
        vietnameseMeaning: "vượt xa tổng số liệu của..."
      }
    ]
  },
  {
    category: "Correlational Linkage (Tương quan đồng hành)",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    templates: [
      {
        label: "Coincided with a dramatic...",
        snippet: "This surge coincided with a dramatic [X]% reduction in [Metric]",
        vietnameseMeaning: "Sự tăng vọt này diễn ra đồng thời với..."
      },
      {
        label: "Directly mirrored by...",
        snippet: "was directly mirrored by a corresponding rise in [Metric]",
        vietnameseMeaning: "được phản ánh tương ứng qua sự gia tăng của..."
      },
      {
        label: "Positively correlated with",
        snippet: "was positively correlated with [Metric], establishing a clear link",
        vietnameseMeaning: "có tương quan đồng biến trực tiếp với..."
      }
    ]
  }
];

export const HighOrderComparisonPalette: React.FC<HighOrderComparisonPaletteProps> = ({
  onInsertPhrase
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleCopyAndInsert = (snippet: string) => {
    onInsertPhrase(snippet);
    setCopiedSnippet(snippet);
    setTimeout(() => setCopiedSnippet(null), 1500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Higher-Order Comparative Palette (Band 8.5+ Structures)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Click để chèn vào bài viết</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4 pt-3 border-t border-slate-800">
          {COMPARISON_TEMPLATES.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border inline-block ${group.badgeColor}`}
              >
                {group.category}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {group.templates.map((tpl, tIdx) => {
                  const isCopied = copiedSnippet === tpl.snippet;
                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => handleCopyAndInsert(tpl.snippet)}
                      className="text-left p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition-all text-xs group flex flex-col justify-between"
                    >
                      <div className="font-semibold text-slate-200 group-hover:text-indigo-300 flex items-center justify-between mb-1">
                        <span>{tpl.label}</span>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                        {tpl.snippet}
                      </p>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        {tpl.vietnameseMeaning}
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
