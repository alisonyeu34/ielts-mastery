"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  Task1PMExercise,
  MapSvgFeature,
  MapMutationHotspot,
} from "@/data/mockProcessMapData";
import {
  Sliders,
  Columns2,
  Maximize2,
  MapPin,
  Sparkles,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DualEpochMapSliderProps {
  exercise: Task1PMExercise;
  sliderPos: number;
  onSliderChange: (pos: number) => void;
  isSideBySideView: boolean;
  onToggleSideBySide: () => void;
  selectedHotspotId: string | null;
  onSelectHotspot: (id: string) => void;
  className?: string;
}

export function DualEpochMapSlider({
  exercise,
  sliderPos,
  onSliderChange,
  isSideBySideView,
  onToggleSideBySide,
  selectedHotspotId,
  onSelectHotspot,
  className,
}: DualEpochMapSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const yearA = exercise.yearA || "Năm Cũ";
  const yearB = exercise.yearB || "Năm Mới";
  const featuresA = exercise.mapFeaturesEpochA || [];
  const featuresB = exercise.mapFeaturesEpochB || [];
  const hotspots = exercise.mutationHotspots || [];

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    onSliderChange(Math.round(percentage));
  };

  const renderMapSvg = (
    features: MapSvgFeature[],
    epochLabel: string,
    isOverlay: boolean = false
  ) => {
    return (
      <div className="relative w-full h-full min-h-[320px] bg-slate-900/90 rounded-2xl overflow-hidden border border-border/80 select-none">
        {/* Epoch Watermark / Header */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white font-mono text-xs font-extrabold border border-white/20 shadow-md">
            📍 {epochLabel}
          </span>
        </div>

        {/* Compass Rose */}
        <div className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md text-white/80 border border-white/20 shadow-md flex items-center gap-1 text-[10px] font-mono">
          <Compass className="h-3.5 w-3.5 text-indigo-400" />
          <span>N ⇧</span>
        </div>

        {/* SVG Canvas */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full absolute inset-0"
          preserveAspectRatio="none"
        >
          {/* Background Grid Lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Render Geographic & Urban Features */}
          {features.map((feat) => (
            <g key={feat.id}>
              <rect
                x={feat.x}
                y={feat.y}
                width={feat.width}
                height={feat.height}
                fill={feat.color}
                fillOpacity={0.85}
                rx={feat.type === "building" || feat.type === "residential" ? 1.5 : 0}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.4"
                className="transition-all duration-300"
              />
              <text
                x={feat.x + feat.width / 2}
                y={feat.y + feat.height / 2 + 1}
                fill={feat.textColor || "#ffffff"}
                fontSize="2.4"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-mono tracking-tight pointer-events-none drop-shadow-md"
              >
                {feat.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Hotspot Markers */}
        {hotspots.map((h) => {
          const isSelected = h.id === selectedHotspotId;

          return (
            <button
              key={h.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot(h.id);
              }}
              style={{
                left: `${h.x}%`,
                top: `${h.y}%`,
              }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all cursor-pointer group",
                isSelected ? "scale-125" : "hover:scale-110"
              )}
              title={h.name}
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-lg transition-all",
                  isSelected
                    ? "bg-emerald-500 border-white text-white shadow-emerald-500/50 animate-bounce"
                    : "bg-slate-950/90 border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                )}
              >
                <MapPin className="h-3.5 w-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none", className)}>
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Bản Đồ Biến Đổi Không Gian
          </span>
          <h3 className="text-base font-extrabold text-foreground mt-1">
            {exercise.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSideBySide}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
              isSideBySideView
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-secondary text-foreground border-border hover:bg-secondary/80"
            )}
          >
            {isSideBySideView ? (
              <>
                <Sliders className="h-3.5 w-3.5" />
                <span>Chế độ Kéo Trượt (Swipe)</span>
              </>
            ) : (
              <>
                <Columns2 className="h-3.5 w-3.5" />
                <span>Chế độ Song Song (Dual)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Map Display View */}
      {isSideBySideView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {renderMapSvg(featuresA, yearA)}
          {renderMapSvg(featuresB, yearB)}
        </div>
      ) : (
        <div className="space-y-3">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full h-[360px] rounded-2xl overflow-hidden cursor-ew-resize border border-border shadow-inner"
          >
            {/* Base Layer: Epoch A (Year A) */}
            <div className="absolute inset-0 w-full h-full">
              {renderMapSvg(featuresA, yearA)}
            </div>

            {/* Overlay Layer: Epoch B (Year B) with clip-path */}
            <div
              className="absolute inset-0 w-full h-full transition-none"
              style={{
                clipPath: `inset(0 0 0 ${sliderPos}%)`,
              }}
            >
              {renderMapSvg(featuresB, yearB, true)}
            </div>

            {/* Vertical Splitter Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-40 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-xl border-2 border-emerald-500">
                ⇄
              </div>
            </div>
          </div>

          {/* Slider Position Range Input & Instruction */}
          <div className="flex items-center justify-between gap-3 px-2 text-xs">
            <span className="font-mono font-bold text-muted-foreground">
              ◀ {yearA}
            </span>

            <div className="flex-1 max-w-xs flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPos}
                onChange={(e) => onSliderChange(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-ew-resize"
              />
              <span className="font-mono text-[11px] text-muted-foreground w-8 text-right">
                {sliderPos}%
              </span>
            </div>

            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {yearB} ▶
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
