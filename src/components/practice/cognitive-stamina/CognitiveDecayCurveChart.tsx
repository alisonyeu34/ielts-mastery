'use client';

import React from 'react';
import { CognitiveCurvePoint } from '@/lib/keystrokeDynamicsEngine';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface CognitiveDecayCurveChartProps {
  curvePoints: CognitiveCurvePoint[];
  currentMinute: number;
}

export const CognitiveDecayCurveChart: React.FC<CognitiveDecayCurveChartProps> = ({
  curvePoints,
  currentMinute
}) => {
  const width = 600;
  const height = 180;
  const padding = 30;

  const maxMin = 180;
  const maxBff = 100;

  // Build SVG path
  const points = curvePoints.map((p) => {
    const x = padding + (p.minute / maxMin) * (width - 2 * padding);
    const y = height - padding - (p.brainFogFactor / maxBff) * (height - 2 * padding);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const currentX = padding + (Math.min(180, currentMinute) / maxMin) * (width - 2 * padding);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Đường Cong Suy Giảm Nhận Thức 180 Phút (Cognitive Fatigue Curve)
        </h3>
        <span className="text-[11px] text-slate-400 font-mono">
          Vùng Nguy Hiểm: &gt; 65% BFF
        </span>
      </div>

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 select-none">
          {/* Danger zone threshold */}
          <line
            x1={padding}
            y1={height - padding - (65 / maxBff) * (height - 2 * padding)}
            x2={width - padding}
            y2={height - padding - (65 / maxBff) * (height - 2 * padding)}
            stroke="#f43f5e"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <text
            x={width - padding - 75}
            y={height - padding - (65 / maxBff) * (height - 2 * padding) - 4}
            fill="#f43f5e"
            fontSize="9"
            fontWeight="bold"
          >
            Ngưỡng Brain Fog
          </text>

          {/* Section demarcations */}
          <line x1={padding + (40 / maxMin) * (width - 2 * padding)} y1={padding} x2={padding + (40 / maxMin) * (width - 2 * padding)} y2={height - padding} stroke="#334155" strokeWidth="1" />
          <line x1={padding + (100 / maxMin) * (width - 2 * padding)} y1={padding} x2={padding + (100 / maxMin) * (width - 2 * padding)} y2={height - padding} stroke="#334155" strokeWidth="1" />
          <line x1={padding + (120 / maxMin) * (width - 2 * padding)} y1={padding} x2={padding + (120 / maxMin) * (width - 2 * padding)} y2={height - padding} stroke="#334155" strokeWidth="1" />

          {/* Section labels */}
          <text x={padding + 10} y={height - 10} fill="#64748b" fontSize="8">Listening (40p)</text>
          <text x={padding + (40 / maxMin) * (width - 2 * padding) + 10} y={height - 10} fill="#64748b" fontSize="8">Reading (60p)</text>
          <text x={padding + (100 / maxMin) * (width - 2 * padding) + 4} y={height - 10} fill="#64748b" fontSize="8">T1 (20p)</text>
          <text x={padding + (120 / maxMin) * (width - 2 * padding) + 10} y={height - 10} fill="#f43f5e" fontSize="8" fontWeight="bold">Task 2 (40p)</text>

          {/* Curve Path */}
          <path d={pathD} fill="none" stroke="url(#fatigueGradient)" strokeWidth="3" strokeLinecap="round" />

          {/* Current minute cursor */}
          <line x1={currentX} y1={padding} x2={currentX} y2={height - padding} stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx={currentX} cy={height - padding - (Math.min(100, currentMinute > 100 ? 55 + (currentMinute - 100) * 0.4 : 35) / maxBff) * (height - 2 * padding)} r="4" fill="#38bdf8" />

          <defs>
            <linearGradient id="fatigueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="40%" stopColor="#3b82f6" />
              <stop offset="65%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
