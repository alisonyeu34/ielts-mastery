"use client";

import React from "react";
import { ProcessStageNode } from "@/data/mockMapProcessData";

interface ProcessFlowViewerProps {
  processStages: ProcessStageNode[];
  activeStage: number;
  onSelectStage: (stageNum: number) => void;
}

export const ProcessFlowViewer: React.FC<ProcessFlowViewerProps> = ({
  processStages,
  activeStage,
  onSelectStage
}) => {
  const currentStage = processStages.find((s) => s.stageNumber === activeStage) || processStages[0];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 text-base">
              ⚙️
            </span>
            <h3 className="text-base font-bold text-white">
              Sơ Đồ Chuỗi Quy Trình Sản Xuất Tuyến Tính (Linear Process Flow)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Theo dõi từng công đoạn cơ khí, thiết bị xử lý và cấu trúc thể bị động chuẩn hóa
          </p>
        </div>

        {/* Linear Stage Counter Pill */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
            Giai đoạn {activeStage} / {processStages.length}
          </span>
        </div>
      </div>

      {/* Stage Step Progress Track */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {processStages.map((stage) => {
          const isSelected = activeStage === stage.stageNumber;
          return (
            <button
              key={stage.stageNumber}
              onClick={() => onSelectStage(stage.stageNumber)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-lg shadow-purple-950/50 scale-105'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-mono">
                {stage.stageNumber}
              </span>
              <span>{stage.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Process Flow SVG Canvas */}
      <div className="relative w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
        <svg viewBox="0 0 800 380" className="w-full h-[280px] md:h-[320px] select-none">
          <defs>
            <marker
              id="flow-arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
            </marker>
          </defs>

          {/* Draw Flow Lines between stages */}
          {processStages.map((stage, idx) => {
            if (idx === processStages.length - 1) return null;
            const next = processStages[idx + 1];

            return (
              <line
                key={idx}
                x1={stage.x + 60}
                y1={stage.y}
                x2={next.x - 60}
                y2={next.y}
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeDasharray="4,3"
                markerEnd="url(#flow-arrow)"
              />
            );
          })}

          {/* Render Stage Nodes */}
          {processStages.map((stage) => {
            const isSelected = activeStage === stage.stageNumber;

            return (
              <g
                key={stage.stageNumber}
                transform={`translate(${stage.x}, ${stage.y})`}
                onClick={() => onSelectStage(stage.stageNumber)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Glow ring */}
                {isSelected && (
                  <circle
                    r="44"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                )}

                {/* Node circle */}
                <circle
                  r="34"
                  fill={isSelected ? '#1e1b4b' : '#090d16'}
                  stroke={isSelected ? '#c084fc' : '#475569'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  className="transition-all hover:scale-110"
                />

                {/* Stage number */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontSize="16"
                  fontWeight="bold"
                  className="pointer-events-none font-mono"
                >
                  #{stage.stageNumber}
                </text>

                {/* Node Title below */}
                <text
                  textAnchor="middle"
                  y="52"
                  fill={isSelected ? '#e9d5ff' : '#94a3b8'}
                  fontSize="11"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {stage.name.length > 18 ? stage.name.substring(0, 16) + '...' : stage.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Stage Detailed Inspector */}
      {currentStage && (
        <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-5 space-y-3 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Giai Đoạn {currentStage.stageNumber}: {currentStage.name}
              </span>
              <p className="text-xs text-slate-400">
                Thiết bị xử lý: <strong className="text-slate-200">{currentStage.equipment}</strong>
              </p>
            </div>

            <span className="text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-xl border border-cyan-500/30 self-start sm:self-center">
              Liên từ gợi ý: &ldquo;{currentStage.sequencer}&rdquo;
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Đầu Vào ➔ Đầu Ra (Material Transformation):
            </span>
            <p className="text-xs font-mono text-emerald-300 font-semibold bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              {currentStage.inputOutput}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Câu Mẫu Thể Bị Động Chuẩn Khảo Thí (Passive Voice Formula):
            </span>
            <p className="text-xs text-slate-200 font-serif italic bg-purple-950/30 p-3 rounded-xl border border-purple-500/30 leading-relaxed">
              &ldquo;{currentStage.passiveSentence}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
