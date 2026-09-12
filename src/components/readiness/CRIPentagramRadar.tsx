'use client';

import React from 'react';
import { VectorMetrics, CRICalculationResult } from '@/lib/readinessEvaluator';
import { ShieldCheck, Target, Award, Sparkles } from 'lucide-react';

interface CRIPentagramRadarProps {
  metrics: VectorMetrics;
  criResult: CRICalculationResult;
}

export const CRIPentagramRadar: React.FC<CRIPentagramRadarProps> = ({ metrics, criResult }) => {
  const cx = 160;
  const cy = 160;
  const r = 105;

  const axes = [
    { key: 'theoryMastery' as const, label: 'Lý Thuyết (V_th)', angle: -90, weight: '15%' },
    { key: 'fsrsStability' as const, label: 'Từ Vựng FSRS (V_voc)', angle: -18, weight: '20%' },
    { key: 'errorExtinction' as const, label: 'Sạch Lỗi Sai (V_err)', angle: 54, weight: '25%' },
    { key: 'mockConvergence' as const, label: 'Thi Thử Mock (V_mock)', angle: 126, weight: '25%' },
    { key: 'staminaScore' as const, label: 'Sức Bền Não (V_stm)', angle: 198, weight: '15%' }
  ];

  const getCoordinates = (angleDeg: number, distance: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + distance * Math.cos(rad),
      y: cy + distance * Math.sin(rad)
    };
  };

  // Concentric pentagon rings
  const ringLevels = [0.25, 0.5, 0.75, 1.0];
  const ringPolygons = ringLevels.map((lvl) => {
    return axes
      .map((axis) => {
        const { x, y } = getCoordinates(axis.angle, r * lvl);
        return `${x},${y}`;
      })
      .join(' ');
  });

  // Benchmark Band 7.5 Polygon (85% across all axes)
  const benchmarkPoints = axes
    .map((axis) => {
      const { x, y } = getCoordinates(axis.angle, r * 0.85);
      return `${x},${y}`;
    })
    .join(' ');

  // Candidate Polygon
  const candidatePoints = axes
    .map((axis) => {
      const val = metrics[axis.key] || 0;
      const normalized = Math.min(100, Math.max(0, val)) / 100;
      const { x, y } = getCoordinates(axis.angle, r * normalized);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">The Grand CRI Pentagram Radar</h3>
            <p className="text-xs text-slate-400">Đồ thị mạng nhện 5 trục thẩm định độ hội tụ Band 7.5+</p>
          </div>
        </div>

        {/* CRI Score Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Chỉ số CRI Tổng Hợp</span>
            <span className={`text-2xl font-black font-mono ${criResult.criScore >= 88 ? 'text-emerald-400' : criResult.criScore >= 70 ? 'text-amber-400' : 'text-slate-400'}`}>
              {criResult.criScore}%
            </span>
          </div>
          <div className={`p-3 rounded-2xl border ${criResult.criScore >= 88 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* SVG Radar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-2">
        <div className="relative w-72 h-72 shrink-0">
          <svg viewBox="0 0 320 320" className="w-full h-full select-none overflow-visible">
            {/* Background Rings */}
            {ringPolygons.map((pts, i) => (
              <polygon
                key={i}
                points={pts}
                fill="none"
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray={i === 3 ? '' : '3 3'}
              />
            ))}

            {/* Axis Lines */}
            {axes.map((axis, i) => {
              const { x, y } = getCoordinates(axis.angle, r);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#334155"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Benchmark Band 7.5 Polygon (Yellow dashed line) */}
            <polygon
              points={benchmarkPoints}
              fill="rgba(245, 158, 11, 0.05)"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Candidate Current Polygon (Glow Emerald) */}
            <polygon
              points={candidatePoints}
              fill="rgba(16, 185, 129, 0.25)"
              stroke="#10b981"
              strokeWidth="2.5"
            />

            {/* Axis Vertex Dots */}
            {axes.map((axis, i) => {
              const val = metrics[axis.key] || 0;
              const { x, y } = getCoordinates(axis.angle, r * (val / 100));
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="4.5" fill="#10b981" stroke="#0f172a" strokeWidth="1.5" />
                </g>
              );
            })}

            {/* Axis Labels */}
            {axes.map((axis, i) => {
              const { x, y } = getCoordinates(axis.angle, r + 24);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {axis.label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Radar Telemetry Breakdown */}
        <div className="space-y-3 flex-1 w-full text-xs">
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">Độ Hội Tụ Vector Năng Lực</span>
              <span className="font-mono text-emerald-400 font-bold">Predicted: Band {criResult.predictedBand.toFixed(1)}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {criResult.tierDescriptionVi}
            </p>
          </div>

          {/* Mini Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-2 p-2 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="w-3 h-0.5 bg-amber-400 border-b border-dashed border-amber-400" />
              <span className="text-slate-400">Chuẩn Band 7.5 (85%)</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="w-3 h-2 bg-emerald-500/40 border border-emerald-400 rounded-xs" />
              <span className="text-emerald-400 font-semibold">Thực Lực Hiện Tại</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
