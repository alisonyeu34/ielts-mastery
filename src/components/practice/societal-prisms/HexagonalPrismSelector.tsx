"use client";

import React from "react";
import { SOCIETAL_PRISMS, SocietalPrismId } from "@/lib/societalPrismsAnalyzer";

interface HexagonalPrismSelectorProps {
  selectedPrisms: SocietalPrismId[];
  onTogglePrism: (prismId: SocietalPrismId) => void;
  onOpenTradeoffBuilder: () => void;
}

// 6 Vertices on a 600x500 SVG canvas centered at (300, 250), radius = 170
const HEX_VERTICES: Array<{ id: SocietalPrismId; x: number; y: number }> = [
  { id: 'government', x: 300, y: 70 },       // Top (12 o'clock)
  { id: 'corporate', x: 450, y: 155 },       // Top-Right (2 o'clock)
  { id: 'scientific', x: 450, y: 345 },      // Bottom-Right (4 o'clock)
  { id: 'vulnerable', x: 300, y: 430 },      // Bottom (6 o'clock)
  { id: 'global', x: 150, y: 345 },          // Bottom-Left (8 o'clock)
  { id: 'individual', x: 150, y: 155 }       // Top-Left (10 o'clock)
];

export const HexagonalPrismSelector: React.FC<HexagonalPrismSelectorProps> = ({
  selectedPrisms,
  onTogglePrism,
  onOpenTradeoffBuilder
}) => {
  const prismMap = new Map(SOCIETAL_PRISMS.map((p) => [p.id, p]));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 text-base">
              💎
            </span>
            <h3 className="text-base font-bold text-white">
              Vòng Quay Lục Giác 6 Lăng Kính Chủ Thể Xã Hội (Hexagonal Prism Spinner)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Nhấp chọn ít nhất 2 lăng kính đối nghịch để tạo lập luận đánh đổi chính sách Band 8.5+
          </p>
        </div>

        {/* Selected Count & Trade-off Button */}
        <div className="flex items-center gap-2.5">
          <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
            selectedPrisms.length >= 2
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
          }`}>
            Đã kích hoạt: {selectedPrisms.length}/6 Lăng kính
          </span>

          <button
            onClick={onOpenTradeoffBuilder}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <span>⚖️</span>
            <span>Mẫu Đánh Đổi Chính Sách</span>
          </button>
        </div>
      </div>

      {/* Hexagonal Interactive SVG Canvas */}
      <div className="relative w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center p-2">
        <svg viewBox="0 0 600 500" className="w-full max-w-[540px] h-[340px] md:h-[400px] select-none">
          <defs>
            <filter id="hex-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hexagon Outer Perimeter Lines */}
          <polygon
            points={HEX_VERTICES.map(v => `${v.x},${v.y}`).join(' ')}
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Draw Connection Web between Center and Vertices */}
          {HEX_VERTICES.map((v, idx) => (
            <line
              key={idx}
              x1="300"
              y1="250"
              x2={v.x}
              y2={v.y}
              stroke={selectedPrisms.includes(v.id) ? '#818cf8' : '#1e293b'}
              strokeWidth={selectedPrisms.includes(v.id) ? 2.5 : 1}
              className="transition-all duration-300"
            />
          ))}

          {/* Active Lines connecting selected vertices together */}
          {HEX_VERTICES.map((v1, i) => {
            if (!selectedPrisms.includes(v1.id)) return null;
            return HEX_VERTICES.map((v2, j) => {
              if (i >= j || !selectedPrisms.includes(v2.id)) return null;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={v1.x}
                  y1={v1.y}
                  x2={v2.x}
                  y2={v2.y}
                  stroke="#a855f7"
                  strokeWidth="2"
                  filter="url(#hex-glow)"
                  className="animate-pulse"
                />
              );
            });
          })}

          {/* Center Hub: Policy Dilemma Core */}
          <circle
            cx="300"
            cy="250"
            r="42"
            fill="#0f172a"
            stroke="#6366f1"
            strokeWidth="2"
            className="shadow-xl"
          />
          <text
            x="300"
            y="244"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#a5b4fc"
            fontSize="10"
            fontWeight="bold"
          >
            MACRO
          </text>
          <text
            x="300"
            y="258"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize="9"
            fontWeight="bold"
          >
            DISCOURSE
          </text>

          {/* Render 6 Interactive Vertices */}
          {HEX_VERTICES.map((v) => {
            const prism = prismMap.get(v.id);
            if (!prism) return null;
            const isSelected = selectedPrisms.includes(v.id);

            return (
              <g
                key={v.id}
                transform={`translate(${v.x}, ${v.y})`}
                onClick={() => onTogglePrism(v.id)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Glow ring if selected */}
                {isSelected && (
                  <circle
                    r="46"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    filter="url(#hex-glow)"
                    className="animate-pulse"
                  />
                )}

                {/* Node Body */}
                <circle
                  r="36"
                  fill={isSelected ? '#1e1b4b' : '#090d16'}
                  stroke={isSelected ? '#c084fc' : '#475569'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  className="transition-all hover:scale-110"
                />

                {/* Icon */}
                <text
                  textAnchor="middle"
                  y="-8"
                  fontSize="16"
                  className="pointer-events-none"
                >
                  {prism.icon}
                </text>

                {/* Label Text */}
                <text
                  textAnchor="middle"
                  y="12"
                  fill={isSelected ? '#ffffff' : '#94a3b8'}
                  fontSize="9.5"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {prism.shortLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Prisms Formula Starters */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-300">
          Khung Mở Lời Học Thuật Cho Các Lăng Kính Đã Kích Hoạt:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {selectedPrisms.map((prismId) => {
            const prism = prismMap.get(prismId);
            if (!prism) return null;

            return (
              <div
                key={prismId}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{prism.icon}</span>
                    <span>{prism.name}</span>
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prism.badgeColor}`}>
                    {prism.shortLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-serif italic leading-relaxed">
                  &ldquo;{prism.starterFormula}&rdquo;
                </p>
                <p className="text-[11px] text-slate-500">
                  💡 Trọng tâm: {prism.corePerspective}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
