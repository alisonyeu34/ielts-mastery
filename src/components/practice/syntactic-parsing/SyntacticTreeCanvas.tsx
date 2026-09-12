"use client";

import React from "react";
import { DependencyNode, DependencyEdge } from "@/lib/syntacticTreeParser";
import { GitGraph, Sparkles, Layers, Info, CheckCircle2 } from "lucide-react";

interface SyntacticTreeCanvasProps {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  isSkeletonStripped: boolean;
}

export const SyntacticTreeCanvas: React.FC<SyntacticTreeCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  isSkeletonStripped
}) => {
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <GitGraph className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Cây Cú Pháp Phụ Thuộc Tương Tác (Dependency Syntax Tree)
            </h3>
            <p className="text-[11px] text-slate-400">
              Trực quan hóa luồng quan hệ cú pháp giữa Động từ vị ngữ chính và các mệnh đề bổ nghĩa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Universal Dependencies v2.0
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full overflow-x-auto bg-slate-950/80 rounded-xl border border-slate-800/90 p-4 min-h-[340px] flex items-center justify-center">
        <svg
          className="w-[860px] h-[300px] shrink-0 select-none"
          viewBox="0 0 860 300"
        >
          <defs>
            <marker
              id="arrow-core"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
            <marker
              id="arrow-mod"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Edges (Curves) */}
          {edges.map((edge) => {
            const isFaded = isSkeletonStripped && !edge.isCore;
            return (
              <g key={edge.id} className={`transition-opacity duration-300 ${isFaded ? "opacity-15" : "opacity-100"}`}>
                <path
                  d={edge.pathD}
                  fill="none"
                  stroke={edge.isCore ? "#10b981" : "#64748b"}
                  strokeWidth={edge.isCore ? 2.5 : 1.5}
                  strokeDasharray={edge.isCore ? undefined : "4 3"}
                  markerEnd={edge.isCore ? "url(#arrow-core)" : "url(#arrow-mod)"}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isFaded = isSkeletonStripped && !node.isCoreSkeleton;

            let nodeFill = "#1e293b";
            let nodeStroke = "#475569";
            let textFill = "#e2e8f0";

            if (node.dep === "root") {
              nodeFill = "#083344";
              nodeStroke = "#06b6d4";
              textFill = "#67e8f9";
            } else if (node.isCoreSkeleton) {
              nodeFill = "#064e3b";
              nodeStroke = "#10b981";
              textFill = "#6ee7b7";
            }

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => onSelectNode(node.id)}
                className={`cursor-pointer transition-all duration-300 ${
                  isFaded ? "opacity-20" : "opacity-100"
                }`}
              >
                {/* Node Box */}
                <rect
                  x="-55"
                  y="-22"
                  width="110"
                  height="44"
                  rx="10"
                  fill={nodeFill}
                  stroke={isSelected ? "#ec4899" : nodeStroke}
                  strokeWidth={isSelected ? 3 : 1.5}
                  className="transition-all hover:filter hover:brightness-125"
                />

                {/* Word Label */}
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fill={textFill}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.word}
                </text>

                {/* Dependency Tag */}
                <text
                  x="0"
                  y="12"
                  textAnchor="middle"
                  fill={node.isCoreSkeleton ? "#a7f3d0" : "#94a3b8"}
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  :{node.dep} ({node.pos})
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Inspector Footer */}
      {selectedNode && (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mt-0.5 shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  {selectedNode.word}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {selectedNode.dep === "root" ? "ĐỘNG TỪ VỊ NGỮ CHÍNH (ROOT)" : selectedNode.dep.toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-400">
                  POS: {selectedNode.pos} | Tầng sâu: {selectedNode.depth}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {selectedNode.vietnameseRole}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                selectedNode.isCoreSkeleton
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500/50"
                  : "bg-slate-850 text-slate-400 border-slate-700"
              }`}
            >
              {selectedNode.isCoreSkeleton ? "★ Xương Sống Nòng Cốt" : "Vỏ Bổ Ngữ Tầng Bậc"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
