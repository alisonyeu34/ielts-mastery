"use client";

import React from "react";
import { Compass, RotateCcw, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DirectionCompassWidgetProps {
  bearing: number; // in degrees
  onRotate: (deltaDegrees: number) => void;
  className?: string;
}

export function DirectionCompassWidget({
  bearing,
  onRotate,
  className,
}: DirectionCompassWidgetProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/90 backdrop-blur-md p-3 shadow-md select-none flex flex-col items-center gap-2",
        className
      )}
    >
      <div className="flex items-center justify-between w-full border-b border-border/60 pb-1 text-[10px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1 font-bold text-foreground">
          <Compass className="h-3.5 w-3.5 text-primary" /> La Bàn 4 Hướng
        </span>
        <span className="font-bold text-primary">{bearing}°</span>
      </div>

      {/* Interactive Compass Rose SVG */}
      <div className="relative flex items-center justify-center p-1">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          style={{ transform: `rotate(${bearing}deg)`, transition: "transform 0.4s ease-out" }}
          className="filter drop-shadow-sm"
        >
          {/* Compass Outer Ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2,3"
            className="text-border/60"
          />

          {/* North Point (Red/Primary) */}
          <polygon points="50,8 43,45 50,40" fill="#f43f5e" />
          <polygon points="50,8 57,45 50,40" fill="#e11d48" />

          {/* South Point (Blue/Muted) */}
          <polygon points="50,92 43,55 50,60" fill="#64748b" />
          <polygon points="50,92 57,55 50,60" fill="#475569" />

          {/* East Point */}
          <polygon points="92,50 55,43 60,50" fill="#94a3b8" />
          <polygon points="92,50 55,57 60,50" fill="#64748b" />

          {/* West Point */}
          <polygon points="8,50 45,43 40,50" fill="#94a3b8" />
          <polygon points="8,50 45,57 40,50" fill="#64748b" />

          {/* Center Pin */}
          <circle cx="50" cy="50" r="5" fill="#f43f5e" />
          <circle cx="50" cy="50" r="2" fill="#ffffff" />

          {/* Lettering */}
          <text
            x="50"
            y="22"
            textAnchor="middle"
            fill="#f43f5e"
            fontSize="12"
            fontWeight="bold"
            fontFamily="monospace"
          >
            N
          </text>
          <text
            x="50"
            y="86"
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
            fontWeight="bold"
            fontFamily="monospace"
          >
            S
          </text>
          <text
            x="84"
            y="54"
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
            fontWeight="bold"
            fontFamily="monospace"
          >
            E
          </text>
          <text
            x="16"
            y="54"
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
            fontWeight="bold"
            fontFamily="monospace"
          >
            W
          </text>
        </svg>
      </div>

      {/* Rotation Control Buttons */}
      <div className="flex items-center gap-1 w-full pt-1">
        <button
          type="button"
          onClick={() => onRotate(-90)}
          title="Xoay trái 90°"
          className="flex-1 py-1 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-foreground text-[10px] font-bold flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>-90°</span>
        </button>

        <button
          type="button"
          onClick={() => onRotate(90)}
          title="Xoay phải 90°"
          className="flex-1 py-1 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-foreground text-[10px] font-bold flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
        >
          <RotateCw className="h-3 w-3" />
          <span>+90°</span>
        </button>
      </div>
    </div>
  );
}
