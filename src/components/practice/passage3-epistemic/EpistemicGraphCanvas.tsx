"use client";

import React from "react";
import {
  EpistemicNode,
  EpistemicEdge,
  EpistemicNodeType,
  getNodeTheme,
  getEdgeTheme
} from "@/lib/epistemicGraphParser";

interface EpistemicGraphCanvasProps {
  nodes: EpistemicNode[];
  edges: EpistemicEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  activeFilter: EpistemicNodeType | 'all';
  onSelectNode: (nodeId: string | null) => void;
  onSelectEdge: (edgeId: string | null) => void;
  onChangeFilter: (filter: EpistemicNodeType | 'all') => void;
  onHighlightParagraph: (paragraphIndex: number) => void;
}

export const EpistemicGraphCanvas: React.FC<EpistemicGraphCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  selectedEdgeId,
  activeFilter,
  onSelectNode,
  onSelectEdge,
  onChangeFilter,
  onHighlightParagraph
}) => {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const selectedNode = selectedNodeId ? nodeMap.get(selectedNodeId) : null;
  const selectedEdge = selectedEdgeId ? edges.find((e) => e.id === selectedEdgeId) : null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-md">
      {/* Canvas Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-base">
              🕸️
            </span>
            <h3 className="text-base font-bold text-white">
              Sơ Đồ Mạng Lưới Nhận Thức Luận (Epistemic Concept Network)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Nhấp vào bất kỳ Node hoặc Liên kết nào để làm nổi bật dẫn chứng trong bài đọc
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'concept', 'proponent', 'skeptic', 'author_stance'] as const).map((filter) => {
            const isCurrent = activeFilter === filter;
            const labels: Record<string, string> = {
              all: 'Tất Cả',
              concept: 'Khái Niệm',
              proponent: 'Phe Ủng Hộ',
              skeptic: 'Phe Phản Bác',
              author_stance: 'Lập Trường Tác Giả'
            };

            return (
              <button
                key={filter}
                onClick={() => onChangeFilter(filter)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                  isCurrent
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {labels[filter]}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
        <svg
          viewBox="0 0 800 450"
          className="w-full h-[400px] md:h-[460px] select-none"
        >
          <defs>
            {/* Arrow Markers for Directed Graph */}
            <marker
              id="arrow-supports"
              viewBox="0 0 10 10"
              refX="28"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
            <marker
              id="arrow-undermines"
              viewBox="0 0 10 10"
              refX="28"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
            </marker>
            <marker
              id="arrow-qualifies"
              viewBox="0 0 10 10"
              refX="28"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
            </marker>
            <marker
              id="arrow-originates"
              viewBox="0 0 10 10"
              refX="28"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
            </marker>

            {/* Glowing filter */}
            <filter id="glow-gold" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw Edges */}
          {edges.map((edge) => {
            const sourceNode = nodeMap.get(edge.source);
            const targetNode = nodeMap.get(edge.target);
            if (!sourceNode || !targetNode) return null;

            const isSelected = selectedEdgeId === edge.id;
            const isDimmed =
              selectedNodeId &&
              edge.source !== selectedNodeId &&
              edge.target !== selectedNodeId;

            const edgeTheme = getEdgeTheme(edge.relation);
            const markerId = `arrow-${
              edge.relation === 'originates_from'
                ? 'originates'
                : edge.relation
            }`;

            // Midpoint coordinates for label
            const midX = (sourceNode.x + targetNode.x) / 2;
            const midY = (sourceNode.y + targetNode.y) / 2;

            return (
              <g
                key={edge.id}
                onClick={() => onSelectEdge(edge.id)}
                className={`cursor-pointer transition-opacity duration-300 ${
                  isDimmed ? 'opacity-20' : 'opacity-100'
                }`}
              >
                {/* Connecting Line */}
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={edgeTheme.stroke}
                  strokeWidth={isSelected ? 3.5 : 2}
                  strokeDasharray={edgeTheme.strokeDasharray}
                  markerEnd={`url(#${markerId})`}
                  className="transition-all hover:stroke-white"
                />

                {/* Edge Label Badge */}
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x="-65"
                    y="-12"
                    width="130"
                    height="24"
                    rx="12"
                    fill="#020617"
                    stroke={edgeTheme.stroke}
                    strokeWidth={isSelected ? 2 : 1}
                    className="shadow-md"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#f8fafc"
                    fontSize="9.5"
                    fontWeight="600"
                  >
                    {edge.label}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Draw Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isMatchFilter = activeFilter === 'all' || node.type === activeFilter;
            const isDimmed =
              (!isMatchFilter) ||
              (selectedNodeId && selectedNodeId !== node.id && !edges.some(
                (e) =>
                  (e.source === selectedNodeId && e.target === node.id) ||
                  (e.target === selectedNodeId && e.source === node.id)
              ));

            const theme = getNodeTheme(node.type);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => onSelectNode(isSelected ? null : node.id)}
                className={`cursor-pointer transition-all duration-300 ${
                  isDimmed ? 'opacity-25' : 'opacity-100'
                }`}
              >
                {/* Glow ring if selected */}
                {isSelected && (
                  <circle
                    r="48"
                    fill="none"
                    stroke={theme.glow}
                    strokeWidth="4"
                    filter="url(#glow-gold)"
                    className="animate-pulse"
                  />
                )}

                {/* Main Node Circle / Capsule */}
                <circle
                  r="36"
                  fill="#090d16"
                  stroke={isSelected ? '#ffffff' : theme.border.replace('border-', '')}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all hover:scale-110"
                />

                {/* Type Icon / Badge */}
                <text
                  textAnchor="middle"
                  y="-12"
                  fontSize="14"
                >
                  {node.type === 'concept'
                    ? '💡'
                    : node.type === 'proponent'
                    ? '🛡️'
                    : node.type === 'skeptic'
                    ? '⚔️'
                    : '👑'}
                </text>

                {/* Node Label Text */}
                <text
                  textAnchor="middle"
                  y="6"
                  fill="#ffffff"
                  fontSize="9.5"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {node.label.length > 16
                    ? node.label.substring(0, 14) + '...'
                    : node.label}
                </text>

                {/* Paragraph Badge */}
                <text
                  textAnchor="middle"
                  y="20"
                  fill="#94a3b8"
                  fontSize="8"
                  fontWeight="600"
                  className="pointer-events-none font-mono"
                >
                  [Đoạn {node.paragraphIndex}]
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay at bottom left */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-3 text-[10px] text-slate-300">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Khái niệm
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Ủng hộ
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Phản bác
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Lập trường tác giả
          </span>
        </div>
      </div>

      {/* Selected Node / Edge Deep Inspection Popover */}
      {selectedNode && (
        <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-5 space-y-3 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">
                {selectedNode.type === 'concept'
                  ? '💡'
                  : selectedNode.type === 'proponent'
                  ? '🛡️'
                  : selectedNode.type === 'skeptic'
                  ? '⚔️'
                  : '👑'}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {selectedNode.label}
                </h4>
                <span className="text-xs text-indigo-300/90">
                  {selectedNode.roleTitle || selectedNode.domain}
                </span>
              </div>
            </div>

            <button
              onClick={() => onHighlightParagraph(selectedNode.paragraphIndex)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all self-start sm:self-center"
            >
              📍 Nhảy Đến Đoạn {selectedNode.paragraphIndex} Trong Bài Đọc
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedNode.summary}
          </p>

          {selectedNode.keyQuotes.length > 0 && (
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 italic">
              <span className="text-indigo-400 font-semibold not-italic">Trích dẫn then chốt: </span>
              &ldquo;{selectedNode.keyQuotes[0]}&rdquo;
            </div>
          )}
        </div>
      )}

      {selectedEdge && (
        <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-5 space-y-3 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Mối Quan Hệ Nhận Thức: {selectedEdge.label}
              </span>
              <p className="text-xs text-slate-400">
                Từ [{nodeMap.get(selectedEdge.source)?.label}] ➔ Đến [{nodeMap.get(selectedEdge.target)?.label}]
              </p>
            </div>

            <button
              onClick={() => onHighlightParagraph(selectedEdge.paragraphIndex)}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-all self-start sm:self-center"
            >
              📍 Xem Dẫn Chứng Đoạn {selectedEdge.paragraphIndex}
            </button>
          </div>

          <p className="text-xs text-slate-300 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            &ldquo;{selectedEdge.evidenceSnippet}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
};
