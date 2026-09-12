"use client";

import React, { useState } from "react";
import {
  Sparkles,
  BarChart3,
  TrendingUp,
  Info,
  Maximize2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Task1Prompt } from "@/data/mockTask1Data";
import { cn } from "@/lib/utils";

interface InteractiveChartViewerProps {
  prompt: Task1Prompt;
  spotlightActive: boolean;
  onToggleSpotlight: () => void;
  className?: string;
}

export function InteractiveChartViewer({
  prompt,
  spotlightActive,
  onToggleSpotlight,
  className,
}: InteractiveChartViewerProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    name: string;
    year: number;
    value: number;
  } | null>(null);

  // SVG dimensions for Line Chart
  const svgWidth = 520;
  const svgHeight = 280;
  const paddingLeft = 45;
  const paddingBottom = 40;
  const paddingTop = 25;
  const paddingRight = 25;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // X scale (1980 - 2020)
  const minYear = 1980;
  const maxYear = 2020;
  const getX = (year: number) =>
    paddingLeft + ((year - minYear) / (maxYear - minYear)) * chartWidth;

  // Y scale (0 - 60)
  const minY = 0;
  const maxY = 60;
  const getY = (val: number) =>
    paddingTop + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header & Spotlight Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
              {prompt.chartType.toUpperCase()} GRAPH
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              Đơn vị: {prompt.unit}
            </span>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-foreground">
            {prompt.title}
          </h4>
        </div>

        <button
          type="button"
          onClick={onToggleSpotlight}
          className={cn(
            "px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs self-start sm:self-auto",
            spotlightActive
              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40"
              : "bg-secondary text-muted-foreground border-border hover:text-foreground"
          )}
        >
          {spotlightActive ? (
            <>
              <Eye className="h-3.5 w-3.5 text-amber-500" />
              <span>Đang Soi Điểm Nổi Bật (Key Features)</span>
            </>
          ) : (
            <>
              <EyeOff className="h-3.5 w-3.5" />
              <span>Bật Soi Điểm Nổi Bật</span>
            </>
          )}
        </button>
      </div>

      {/* SVG Canvas */}
      <div className="relative bg-secondary/15 rounded-2xl border border-border/60 p-2 sm:p-4 flex flex-col items-center overflow-x-auto">
        {prompt.chartType === "line" && prompt.lineSeries && (
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[540px] h-auto font-mono text-[10px]"
          >
            {/* Horizontal Gridlines */}
            {[0, 10, 20, 30, 40, 50, 60].map((val) => (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={getY(val)}
                  x2={svgWidth - paddingRight}
                  y2={getY(val)}
                  stroke="currentColor"
                  strokeOpacity="0.12"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 8}
                  y={getY(val) + 3}
                  textAnchor="end"
                  className="fill-muted-foreground text-[9px]"
                >
                  {val}
                </text>
              </g>
            ))}

            {/* Vertical Year Gridlines */}
            {[1980, 1990, 2000, 2010, 2020].map((year) => (
              <g key={year}>
                <line
                  x1={getX(year)}
                  y1={paddingTop}
                  x2={getX(year)}
                  y2={paddingTop + chartHeight}
                  stroke="currentColor"
                  strokeOpacity="0.08"
                />
                <text
                  x={getX(year)}
                  y={svgHeight - paddingBottom + 18}
                  textAnchor="middle"
                  className="fill-muted-foreground font-bold text-[10px]"
                >
                  {year}
                </text>
              </g>
            ))}

            {/* Line Series Paths */}
            {prompt.lineSeries.map((series) => {
              const pathData = series.data.reduce((acc, pt, idx) => {
                const x = getX(pt.year);
                const y = getY(pt.value);
                return idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
              }, "");

              return (
                <g key={series.name}>
                  {/* Glowing Stroke */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={series.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300 drop-shadow-xs"
                  />

                  {/* Data Points */}
                  {series.data.map((pt) => {
                    const cx = getX(pt.year);
                    const cy = getY(pt.value);

                    return (
                      <circle
                        key={pt.year}
                        cx={cx}
                        cy={cy}
                        r="4.5"
                        fill={series.color}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        className="cursor-pointer hover:scale-150 transition-transform"
                        onMouseEnter={() =>
                          setHoveredPoint({
                            name: series.name,
                            year: pt.year,
                            value: pt.value,
                          })
                        }
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* Spotlight Key Feature Indicators */}
            {spotlightActive &&
              prompt.spotlightPoints?.map((sp, idx) => {
                const cx = getX(sp.x);
                const cy = getY(sp.y);

                return (
                  <g key={idx} className="animate-pulse">
                    <circle
                      cx={cx}
                      cy={cy}
                      r="12"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                    <circle cx={cx} cy={cy} r="3" fill="#f59e0b" />
                    <rect
                      x={cx - 50}
                      y={cy - 26}
                      width="100"
                      height="18"
                      rx="6"
                      className="fill-background/90 stroke-amber-500/50"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy - 14}
                      textAnchor="middle"
                      className="fill-amber-600 dark:fill-amber-400 font-sans font-bold text-[8px]"
                    >
                      {sp.label}
                    </text>
                  </g>
                );
              })}
          </svg>
        )}

        {/* Bar Chart Fallback */}
        {prompt.chartType === "bar" && prompt.barSeries && (
          <div className="w-full max-w-lg space-y-3 py-2 text-xs">
            {prompt.barSeries.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between font-mono font-bold text-[11px]">
                  <span>{item.category}</span>
                  <span className="text-muted-foreground">
                    2010: <strong className="text-blue-500">{item.year2010}%</strong> | 2020:{" "}
                    <strong className="text-emerald-500">{item.year2020}%</strong>
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-blue-500/20 overflow-hidden">
                    <div
                      style={{ width: `${item.year2010}%` }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  <div className="h-2 rounded-full bg-emerald-500/20 overflow-hidden">
                    <div
                      style={{ width: `${item.year2020}%` }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hover Tooltip display */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-card border border-border shadow-md text-xs font-mono">
            <span className="font-bold text-foreground">{hoveredPoint.name}</span>:{" "}
            <span className="text-primary font-black">
              {hoveredPoint.value} {prompt.unit}
            </span>{" "}
            (Năm {hoveredPoint.year})
          </div>
        )}
      </div>

      {/* Series Legend */}
      {prompt.lineSeries && (
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-1">
          {prompt.lineSeries.map((s) => (
            <div key={s.name} className="flex items-center gap-1.5">
              <span
                style={{ backgroundColor: s.color }}
                className="h-3 w-3 rounded-full shrink-0 shadow-xs"
              />
              <span className="font-medium text-foreground">{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
