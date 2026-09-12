"use client";

import React from "react";
import { ChevronRight, Layers, Bookmark, Sparkles } from "lucide-react";
import { GardenPathChallenge } from "@/lib/syntacticTreeParser";

interface ClauseHierarchyBreadcrumbsProps {
  challenge: GardenPathChallenge;
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

export const ClauseHierarchyBreadcrumbs: React.FC<ClauseHierarchyBreadcrumbsProps> = ({
  challenge,
  selectedNodeId,
  onSelectNode
}) => {
  // Group nodes by depth
  const maxDepth = Math.max(...challenge.nodes.map((n) => n.depth));
  const depthLevels = Array.from({ length: maxDepth + 1 }, (_, i) => i);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-violet-400" />
          <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Phân Cấp Tầng Bậc Mệnh Đề Lồng Ghép (Clause Hierarchy Depth)
          </h3>
        </div>
        <span className="text-[10px] text-slate-400">
          Độ sâu cú pháp: <strong className="text-violet-400">{maxDepth + 1} Tầng Lồng Ghép</strong>
        </span>
      </div>

      {/* Breadcrumbs List */}
      <div className="space-y-2">
        {depthLevels.map((depth) => {
          const nodesAtDepth = challenge.nodes.filter((n) => n.depth === depth);
          const isMain = depth === 0;

          return (
            <div
              key={depth}
              className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                isMain
                  ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                  : "bg-slate-950/60 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 ${
                    isMain
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  L{depth}
                </span>

                <div>
                  <span className="text-xs font-bold block">
                    {isMain ? "Tầng 0: Mệnh Đề Nòng Cốt Độc Lập (Main Clause)" : `Tầng ${depth}: Mệnh Đề Phụ Lồng Ghép (Nested Modifier)`}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isMain
                      ? "Chứa bộ ba Subject - Main Verb - Object quyết định ý nghĩa toàn câu"
                      : "Bổ nghĩa chi tiết cho danh từ đứng trước, có thể bị tỉnh lược"}
                  </span>
                </div>
              </div>

              {/* Node Chips at this depth */}
              <div className="flex flex-wrap gap-1.5 self-start sm:self-center">
                {nodesAtDepth.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => onSelectNode(node.id)}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-mono transition-all ${
                        isSelected
                          ? "bg-pink-600 text-white font-bold ring-1 ring-pink-400"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {node.word}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
