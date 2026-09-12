'use client';

import React from 'react';
import { ThetaEstimationResult } from '@/lib/irtEngine';
import { BarChart3, Users, Award } from 'lucide-react';

interface ThetaAbilityDistributionChartProps {
  thetaResult: ThetaEstimationResult;
}

export const ThetaAbilityDistributionChart: React.FC<ThetaAbilityDistributionChartProps> = ({
  thetaResult
}) => {
  const theta = thetaResult.theta;
  const clampedTheta = Math.max(-3.0, Math.min(3.0, theta));

  // Normal distribution curve points
  const points = [];
  for (let t = -3.0; t <= 3.0; t += 0.2) {
    const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * t * t);
    points.push({ t, y });
  }

  const width = 500;
  const height = 140;
  const pad = 20;

  const maxY = 0.42;

  const svgPoints = points.map((p) => {
    const x = pad + ((p.t + 3.0) / 6.0) * (width - 2 * pad);
    const y = height - pad - (p.y / maxY) * (height - 2 * pad);
    return `${x},${y}`;
  });

  const pathD = `M ${svgPoints.join(' L ')}`;
  const currentX = pad + ((clampedTheta + 3.0) / 6.0) * (width - 2 * pad);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          Phân Phối Năng Lực Tiềm Ẩn Toàn Cầu (Theta Distribution)
        </h3>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
          Top {100 - thetaResult.abilityPercentile}% Thí Sinh Toàn Cầu
        </span>
      </div>

      {/* SVG Bell Curve */}
      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32 select-none">
          {/* Base axes */}
          <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#334155" strokeWidth="1" />

          {/* Bell Curve Area Fill */}
          <path d={`${pathD} L ${width - pad},${height - pad} L ${pad},${height - pad} Z`} fill="rgba(99, 102, 241, 0.12)" />
          <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" />

          {/* Band anchors */}
          {[
            { t: -1.5, band: '5.0' },
            { t: -0.5, band: '6.0' },
            { t: 0.5, band: '7.0' },
            { t: 1.3, band: '7.5' },
            { t: 2.2, band: '8.5' }
          ].map((b) => {
            const x = pad + ((b.t + 3.0) / 6.0) * (width - 2 * pad);
            return (
              <g key={b.band}>
                <line x1={x} y1={height - pad} x2={x} y2={height - pad + 5} stroke="#64748b" strokeWidth="1" />
                <text x={x} y={height - 2} fill="#64748b" fontSize="8" textAnchor="middle">
                  B{b.band}
                </text>
              </g>
            );
          })}

          {/* Candidate Position Line */}
          <line x1={currentX} y1={pad} x2={currentX} y2={height - pad} stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx={currentX} cy={height - pad - ((1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * clampedTheta * clampedTheta) / maxY) * (height - 2 * pad)} r="4.5" fill="#10b981" />
        </svg>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>Năng lực ước lượng: <strong className="text-white font-mono">θ = {thetaResult.theta > 0 ? `+${thetaResult.theta}` : thetaResult.theta}</strong></span>
        <span>Phần trăm thứ bậc (Percentile): <strong className="text-emerald-400 font-mono">{thetaResult.abilityPercentile}th</strong></span>
      </div>
    </div>
  );
};
