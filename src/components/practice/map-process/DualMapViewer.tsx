"use client";

import React, { useState } from "react";
import { MapFeatureChange } from "@/data/mockMapProcessData";

interface DualMapViewerProps {
  timeFrames: [string, string];
  mapFeatures: MapFeatureChange[];
  activeQuadrant: string;
  onSelectQuadrant: (quadrant: string) => void;
}

export const DualMapViewer: React.FC<DualMapViewerProps> = ({
  timeFrames,
  mapFeatures,
  activeQuadrant,
  onSelectQuadrant
}) => {
  const [isSplitSlider, setIsSplitSlider] = useState<boolean>(false);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [hoveredFeature, setHoveredFeature] = useState<MapFeatureChange | null>(null);

  const [yearPast, yearPresent] = timeFrames;

  const getFeatureColor = (type: MapFeatureChange['changeType']) => {
    switch (type) {
      case 'demolished':
        return { fill: 'rgba(244, 63, 94, 0.25)', stroke: '#f43f5e', text: '#f43f5e', label: 'Phá dỡ' };
      case 'constructed':
        return { fill: 'rgba(16, 185, 129, 0.25)', stroke: '#10b981', text: '#10b981', label: 'Xây mới' };
      case 'expanded':
        return { fill: 'rgba(245, 158, 11, 0.25)', stroke: '#f59e0b', text: '#f59e0b', label: 'Mở rộng' };
      case 'converted':
        return { fill: 'rgba(139, 92, 246, 0.25)', stroke: '#8b5cf6', text: '#8b5cf6', label: 'Chuyển đổi' };
      default:
        return { fill: 'rgba(148, 163, 184, 0.15)', stroke: '#94a3b8', text: '#94a3b8', label: 'Không đổi' };
    }
  };

  const QUADRANTS = ['All', 'North-West', 'North-East', 'South-West', 'South-East'];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-md">
      {/* Header with Mode Toggle & Quadrant Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-base">
              🗺️
            </span>
            <h3 className="text-base font-bold text-white">
              Bản Đồ Đối Chiếu Biến Đổi Không Gian ({yearPast} vs {yearPresent})
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Bóc tách 4 góc phần tư và các công trình được cải tạo, xây mới, phá dỡ
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setIsSplitSlider(false)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                !isSplitSlider
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Song Song (Side-by-Side)
            </button>
            <button
              onClick={() => setIsSplitSlider(true)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isSplitSlider
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Thanh Trượt (Slider Diff)
            </button>
          </div>
        </div>
      </div>

      {/* Quadrant Filter Pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-slate-400 mr-1">Phân vùng không gian:</span>
        {QUADRANTS.map((quad) => {
          const isSelected = activeQuadrant === quad;
          return (
            <button
              key={quad}
              onClick={() => onSelectQuadrant(quad)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {quad === 'All' ? 'Toàn Bản Đồ' : quad}
            </button>
          );
        })}
      </div>

      {/* Dual Maps or Slider View */}
      {!isSplitSlider ? (
        /* Side-by-side Dual SVG Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Map 1: Past (T0) */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700">
                Năm {yearPast} (Hiện trạng ban đầu)
              </span>
              <span className="text-[11px] text-slate-500 font-mono">T0 Baseline</span>
            </div>

            <svg viewBox="0 0 800 450" className="w-full h-[260px] select-none rounded-xl bg-slate-900/60 border border-slate-800/80">
              {/* Quadrant Axis Lines */}
              <line x1="400" y1="0" x2="400" y2="450" stroke="#334155" strokeDasharray="4,4" strokeWidth="1.5" />
              <line x1="0" y1="225" x2="800" y2="225" stroke="#334155" strokeDasharray="4,4" strokeWidth="1.5" />

              {/* Quadrant Labels */}
              <text x="20" y="30" fill="#64748b" fontSize="12" fontWeight="bold">NORTH-WEST</text>
              <text x="680" y="30" fill="#64748b" fontSize="12" fontWeight="bold">NORTH-EAST</text>
              <text x="20" y="435" fill="#64748b" fontSize="12" fontWeight="bold">SOUTH-WEST</text>
              <text x="680" y="435" fill="#64748b" fontSize="12" fontWeight="bold">SOUTH-EAST</text>

              {/* Render Map Features in 1995 */}
              {mapFeatures.map((feat) => {
                const colors = getFeatureColor(feat.changeType);
                const coords = feat.coordinates1995;
                const isFiltered = activeQuadrant !== 'All' && feat.quadrant !== activeQuadrant;

                return (
                  <g
                    key={feat.id}
                    onMouseEnter={() => setHoveredFeature(feat)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered ? 'opacity-20' : 'opacity-100'}`}
                  >
                    <rect
                      x={coords.x}
                      y={coords.y}
                      width={coords.width}
                      height={coords.height}
                      rx="12"
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth="2"
                    />
                    <text
                      x={coords.x + coords.width / 2}
                      y={coords.y + coords.height / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#f8fafc"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {feat.name.split('➔')[0].trim()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map 2: Present / Future (T1) */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Năm {yearPresent} (Sau khi quy hoạch)
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">T1 Modernized</span>
            </div>

            <svg viewBox="0 0 800 450" className="w-full h-[260px] select-none rounded-xl bg-slate-900/60 border border-slate-800/80">
              {/* Quadrant Axis Lines */}
              <line x1="400" y1="0" x2="400" y2="450" stroke="#334155" strokeDasharray="4,4" strokeWidth="1.5" />
              <line x1="0" y1="225" x2="800" y2="225" stroke="#334155" strokeDasharray="4,4" strokeWidth="1.5" />

              {/* Quadrant Labels */}
              <text x="20" y="30" fill="#64748b" fontSize="12" fontWeight="bold">NORTH-WEST</text>
              <text x="680" y="30" fill="#64748b" fontSize="12" fontWeight="bold">NORTH-EAST</text>
              <text x="20" y="435" fill="#64748b" fontSize="12" fontWeight="bold">SOUTH-WEST</text>
              <text x="680" y="435" fill="#64748b" fontSize="12" fontWeight="bold">SOUTH-EAST</text>

              {/* Render Map Features in 2025 */}
              {mapFeatures.map((feat) => {
                const colors = getFeatureColor(feat.changeType);
                const coords = feat.coordinates2025;
                const isFiltered = activeQuadrant !== 'All' && feat.quadrant !== activeQuadrant;

                return (
                  <g
                    key={feat.id}
                    onMouseEnter={() => setHoveredFeature(feat)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered ? 'opacity-20' : 'opacity-100'}`}
                  >
                    <rect
                      x={coords.x}
                      y={coords.y}
                      width={coords.width}
                      height={coords.height}
                      rx="12"
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth="2.5"
                    />
                    <text
                      x={coords.x + coords.width / 2}
                      y={coords.y + coords.height / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {feat.name.includes('➔')
                        ? feat.name.split('➔')[1].trim()
                        : feat.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      ) : (
        /* Split Diff Slider Layout */
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold">← Kéo thanh trượt để so sánh trước ({yearPast}) và sau ({yearPresent}):</span>
            <span className="font-mono text-amber-400 font-bold">{sliderPos}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
            {/* Year 1995 Layer */}
            <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full">
              {mapFeatures.map((feat) => {
                const colors = getFeatureColor(feat.changeType);
                const coords = feat.coordinates1995;
                return (
                  <rect
                    key={feat.id}
                    x={coords.x}
                    y={coords.y}
                    width={coords.width}
                    height={coords.height}
                    rx="12"
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* Year 2025 Layer Clipped */}
            <div
              className="absolute inset-0 overflow-hidden border-r-2 border-amber-400 bg-slate-950/80"
              style={{ width: `${sliderPos}%` }}
            >
              <svg viewBox="0 0 800 450" className="w-[800px] h-full">
                {mapFeatures.map((feat) => {
                  const colors = getFeatureColor(feat.changeType);
                  const coords = feat.coordinates2025;
                  return (
                    <rect
                      key={feat.id}
                      x={coords.x}
                      y={coords.y}
                      width={coords.width}
                      height={coords.height}
                      rx="12"
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth="2.5"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Feature Legend & Tooltip Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500/30 border border-emerald-500" /> Xây mới
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-rose-500/30 border border-rose-500" /> Phá dỡ
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-500/30 border border-amber-500" /> Mở rộng
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-purple-500/30 border border-purple-500" /> Chuyển đổi
          </span>
        </div>

        {hoveredFeature && (
          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/40 text-amber-300 font-medium">
            📍 [{hoveredFeature.quadrant}]: {hoveredFeature.descriptionVi}
          </div>
        )}
      </div>
    </div>
  );
};
