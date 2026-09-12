"use client";

import React from "react";
import { Target, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BandScoreRadarChartProps {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  targetBand?: number;
  className?: string;
}

export function BandScoreRadarChart({
  listening,
  reading,
  writing,
  speaking,
  targetBand = 7.5,
  className,
}: BandScoreRadarChartProps) {
  const size = 260;
  const center = size / 2;
  const maxRadius = 95;
  const maxBand = 9.0;

  // 4 coordinates: Top (L), Right (R), Bottom (W), Left (S)
  const getCoordinates = (value: number, angleIndex: number) => {
    const angle = (Math.PI / 2) * angleIndex - Math.PI / 2;
    const r = (value / maxBand) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const candidatePoints = [
    getCoordinates(listening, 0), // Top: Listening
    getCoordinates(reading, 1), // Right: Reading
    getCoordinates(writing, 2), // Bottom: Writing
    getCoordinates(speaking, 3), // Left: Speaking
  ];

  const targetPoints = [
    getCoordinates(targetBand, 0),
    getCoordinates(targetBand, 1),
    getCoordinates(targetBand, 2),
    getCoordinates(targetBand, 3),
  ];

  const candidatePolygon = candidatePoints.map((p) => `${p.x},${p.y}`).join(" ");
  const targetPolygon = targetPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none flex flex-col items-center justify-center text-center",
        className
      )}
    >
      <div className="space-y-0.5">
        <h4 className="text-xs sm:text-sm font-bold text-foreground">
          Biểu Đồ Cân Đối 4 Kỹ Năng (Radar Chart)
        </h4>
        <p className="text-[11px] text-muted-foreground">
          Đối chiếu thực lực bài thi với mục tiêu Band {targetBand}
        </p>
      </div>

      <div className="relative flex items-center justify-center py-2">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid Rings */}
          {[3.0, 5.0, 7.0, 9.0].map((ringBand) => {
            const r = (ringBand / maxBand) * maxRadius;
            return (
              <circle
                key={ringBand}
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke="currentColor"
                strokeDasharray="3 3"
                className="text-border/80"
              />
            );
          })}

          {/* Cross Axes */}
          <line
            x1={center}
            y1={center - maxRadius}
            x2={center}
            y2={center + maxRadius}
            stroke="currentColor"
            className="text-border/80"
          />
          <line
            x1={center - maxRadius}
            y1={center}
            x2={center + maxRadius}
            y2={center}
            stroke="currentColor"
            className="text-border/80"
          />

          {/* Target Band Polygon (Gold Dashed) */}
          <polygon
            points={targetPolygon}
            fill="rgba(245, 158, 11, 0.08)"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Candidate Band Polygon (Primary Filled) */}
          <polygon
            points={candidatePolygon}
            fill="rgba(99, 102, 241, 0.25)"
            stroke="#6366f1"
            strokeWidth="2.5"
          />

          {/* Data Points */}
          {candidatePoints.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="4.5"
              className="fill-indigo-600 stroke-card stroke-2"
            />
          ))}

          {/* Axis Labels */}
          {/* Top: Listening */}
          <text
            x={center}
            y={center - maxRadius - 12}
            textAnchor="middle"
            className="fill-foreground font-bold text-[11px] font-sans"
          >
            Listening ({listening.toFixed(1)})
          </text>

          {/* Right: Reading */}
          <text
            x={center + maxRadius + 10}
            y={center + 4}
            textAnchor="start"
            className="fill-foreground font-bold text-[11px] font-sans"
          >
            Reading ({reading.toFixed(1)})
          </text>

          {/* Bottom: Writing */}
          <text
            x={center}
            y={center + maxRadius + 18}
            textAnchor="middle"
            className="fill-foreground font-bold text-[11px] font-sans"
          >
            Writing ({writing.toFixed(1)})
          </text>

          {/* Left: Speaking */}
          <text
            x={center - maxRadius - 10}
            y={center + 4}
            textAnchor="end"
            className="fill-foreground font-bold text-[11px] font-sans"
          >
            Speaking ({speaking.toFixed(1)})
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs pt-1">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-indigo-600" />
          <span className="text-muted-foreground font-medium">Điểm thi thực tế</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border border-dashed border-amber-500 bg-amber-500/20" />
          <span className="text-muted-foreground font-medium">Mục tiêu Band {targetBand}</span>
        </div>
      </div>
    </div>
  );
}
