"use client";

import React, { useState } from "react";
import {
  BarChart2,
  TrendingUp,
  Sparkles,
  Info,
  Maximize2,
} from "lucide-react";
import { Task1Dataset } from "@/data/mockTask1Datasets";
import { cn } from "@/lib/utils";

interface Task1ChartViewerProps {
  dataset: Task1Dataset;
  className?: string;
}

export function Task1ChartViewer({ dataset, className }: Task1ChartViewerProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    label: string;
    seriesName: string;
    value: number;
  } | null>(null);

  const isLineChart = dataset.chartType === "line";

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Chart Title & Prompt */}
      <div className="border-b border-border/70 pb-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            {isLineChart ? "Dynamic Line Graph" : "Static Bar Chart"}
          </span>
          <span className="text-xs font-mono font-bold text-muted-foreground">
            Đơn vị: {dataset.unit}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-extrabold text-foreground">
          {dataset.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {dataset.prompt}
        </p>
      </div>

      {/* Interactive SVG Chart Canvas */}
      <div className="relative w-full aspect-[16/10] min-h-[300px] rounded-2xl bg-secondary/20 border border-border/70 p-2 sm:p-4 flex items-center justify-center">
        {isLineChart ? (
          /* LINE GRAPH SVG */
          <svg viewBox="0 0 700 400" className="w-full h-full">
            {/* Grid lines */}
            {[0, 100, 200, 300, 400, 500, 600].map((val) => {
              const y = 350 - (val / 600) * 300;
              return (
                <g key={val}>
                  <line
                    x1="60"
                    y1={y}
                    x2="660"
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.08"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="50"
                    y={y + 4}
                    textAnchor="end"
                    fill="currentColor"
                    opacity="0.5"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* X-axis labels (Years) */}
            {dataset.dataPoints.map((dp, idx) => {
              const x = 90 + idx * 90;
              return (
                <g key={dp.label}>
                  <line
                    x1={x}
                    y1="350"
                    x2={x}
                    y2="355"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                  />
                  <text
                    x={x}
                    y="375"
                    textAnchor="middle"
                    fill="currentColor"
                    opacity="0.7"
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {dp.label}
                  </text>
                </g>
              );
            })}

            {/* Render Series Lines */}
            {dataset.series.map((s) => {
              const points = dataset.dataPoints.map((dp, idx) => {
                const x = 90 + idx * 90;
                const val = dp.values[s.key] || 0;
                const y = 350 - (val / 600) * 300;
                return `${x},${y}`;
              });

              const pathData = `M ${points.join(" L ")}`;

              return (
                <g key={s.key}>
                  {/* Line path */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Point Dots */}
                  {dataset.dataPoints.map((dp, idx) => {
                    const x = 90 + idx * 90;
                    const val = dp.values[s.key] || 0;
                    const y = 350 - (val / 600) * 300;

                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="6"
                        fill={s.color}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="cursor-pointer transition-transform hover:scale-150"
                        onMouseEnter={() =>
                          setHoveredPoint({
                            label: dp.label,
                            seriesName: s.name,
                            value: val,
                          })
                        }
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        ) : (
          /* BAR CHART SVG */
          <svg viewBox="0 0 700 400" className="w-full h-full">
            {/* Y Grid lines */}
            {[0, 5, 10, 15, 20, 25, 30].map((val) => {
              const y = 350 - (val / 30) * 300;
              return (
                <g key={val}>
                  <line
                    x1="60"
                    y1={y}
                    x2="660"
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.08"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="50"
                    y={y + 4}
                    textAnchor="end"
                    fill="currentColor"
                    opacity="0.5"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {val}%
                  </text>
                </g>
              );
            })}

            {/* X Groups (Countries) */}
            {dataset.dataPoints.map((dp, gIdx) => {
              const groupCenterX = 120 + gIdx * 115;
              const barWidth = 32;

              return (
                <g key={dp.label}>
                  {/* Country Label */}
                  <text
                    x={groupCenterX}
                    y="375"
                    textAnchor="middle"
                    fill="currentColor"
                    opacity="0.8"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {dp.label}
                  </text>

                  {/* Education Bar (Blue) */}
                  {(() => {
                    const eduVal = dp.values["education"] || 0;
                    const barHeight = (eduVal / 30) * 300;
                    const x = groupCenterX - barWidth - 2;
                    const y = 350 - barHeight;

                    return (
                      <g
                        onMouseEnter={() =>
                          setHoveredPoint({
                            label: dp.label,
                            seriesName: "Education",
                            value: eduVal,
                          })
                        }
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx="4"
                          fill="#3b82f6"
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                        />
                        <text
                          x={x + barWidth / 2}
                          y={y - 6}
                          textAnchor="middle"
                          fill="#3b82f6"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          {eduVal}%
                        </text>
                      </g>
                    );
                  })()}

                  {/* Leisure Bar (Pink) */}
                  {(() => {
                    const leisureVal = dp.values["leisure"] || 0;
                    const barHeight = (leisureVal / 30) * 300;
                    const x = groupCenterX + 2;
                    const y = 350 - barHeight;

                    return (
                      <g
                        onMouseEnter={() =>
                          setHoveredPoint({
                            label: dp.label,
                            seriesName: "Leisure",
                            value: leisureVal,
                          })
                        }
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx="4"
                          fill="#ec4899"
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                        />
                        <text
                          x={x + barWidth / 2}
                          y={y - 6}
                          textAnchor="middle"
                          fill="#ec4899"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          {leisureVal}%
                        </text>
                      </g>
                    );
                  })()}
                </g>
              );
            })}
          </svg>
        )}

        {/* Tooltip Overlay */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-card/95 border border-border shadow-lg text-xs space-y-0.5 pointer-events-none">
            <span className="font-bold text-foreground block">
              {hoveredPoint.label} • {hoveredPoint.seriesName}
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-extrabold text-sm">
              {hoveredPoint.value} {isLineChart ? "TWh" : "%"}
            </span>
          </div>
        )}
      </div>

      {/* Series Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
        {dataset.series.map((s) => (
          <div key={s.key} className="flex items-center gap-2 text-xs font-bold text-foreground">
            <span
              className="h-3 w-3 rounded-full shadow-sm"
              style={{ backgroundColor: s.color }}
            />
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
