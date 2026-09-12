"use client";

import React from "react";
import { IPAPhoneme } from "@/data/mockIPAData";
import { VoicingVibrationBadge } from "./VoicingVibrationBadge";
import { cn } from "@/lib/utils";

interface VocalTractVisualizerProps {
  phoneme: IPAPhoneme;
  className?: string;
}

export function VocalTractVisualizer({
  phoneme,
  className,
}: VocalTractVisualizerProps) {
  // Calculate dynamic tongue anchor points based on height & position
  const getTongueCoordinates = () => {
    let tipX = 135;
    let tipY = 150;
    let bodyX = 100;
    let bodyY = 170;

    // Tongue Height adjustments
    if (phoneme.tongueHeight === "high") {
      tipY -= 22;
      bodyY -= 25;
    } else if (phoneme.tongueHeight === "low") {
      tipY += 15;
      bodyY += 18;
    }

    // Tongue Position adjustments
    if (phoneme.tonguePosition === "front") {
      tipX += 20;
      bodyX += 15;
    } else if (phoneme.tonguePosition === "back") {
      tipX -= 15;
      bodyX -= 25;
    }

    return { tipX, tipY, bodyX, bodyY };
  };

  const { tipX, tipY, bodyX, bodyY } = getTongueCoordinates();

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <h4 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
            <span>Sơ Đồ Mặt Cắt Khẩu Hình (Sagittal Vocal Tract)</span>
          </h4>
          <span className="text-[10px] font-mono text-muted-foreground">
            Mô phỏng vị trí Môi, Lưỡi, Ngạc & Dây thanh quản
          </span>
        </div>

        <VoicingVibrationBadge isVoiced={phoneme.isVoiced} />
      </div>

      {/* SVG Diagram Canvas */}
      <div className="flex justify-center p-2 bg-secondary/15 rounded-2xl border border-border/60">
        <svg
          viewBox="0 0 240 240"
          className="w-full max-w-[260px] h-auto transition-all duration-300"
        >
          {/* Background definitions */}
          <defs>
            <linearGradient id="vocalTractGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="tongueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* 1. Upper Vocal Tract & Palate (Fixed Profile) */}
          <path
            d="M 180,120 C 180,80 150,50 100,50 C 60,50 40,75 40,110 L 40,210"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted-foreground/40"
          />

          {/* Hard Palate & Alveolar Ridge & Upper Teeth */}
          <path
            d="M 65,190 L 65,140 C 65,95 90,80 140,80 C 160,80 170,95 170,115"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-foreground"
          />

          {/* Upper Lip */}
          <path
            d="M 170,115 C 185,115 190,125 180,130"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-rose-500"
          />

          {/* Lower Lip */}
          <path
            d="M 180,150 C 190,155 180,165 165,165"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-rose-500"
          />

          {/* Lower Jaw & Teeth */}
          <path
            d="M 165,165 L 155,165 C 150,185 130,200 90,200"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted-foreground/50"
          />

          {/* 2. Dynamic Tongue Body (Red Organic Shape) */}
          <path
            d={`M 75,195 Q ${bodyX},${bodyY} ${tipX},${tipY} Q ${tipX - 15},${tipY + 25} 90,195 Z`}
            fill="url(#tongueGrad)"
            stroke="#be123c"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* 3. Vocal Cords / Glottis Indicator */}
          <g transform="translate(60, 205)">
            {phoneme.isVoiced ? (
              <>
                <circle cx="0" cy="0" r="7" className="fill-amber-500 animate-pulse" />
                <path d="M -12,-4 Q -6,-10 0,-4 Q 6,2 12,-4" fill="none" stroke="#f59e0b" strokeWidth="2.5" className="animate-bounce" />
              </>
            ) : (
              <circle cx="0" cy="0" r="5" className="fill-blue-500/60" />
            )}
          </g>

          {/* 4. Anatomical Text Labels */}
          <text x="185" y="105" className="text-[9px] fill-muted-foreground font-mono font-bold">Môi trên</text>
          <text x="135" y="68" className="text-[9px] fill-muted-foreground font-mono font-bold">Vòm ngạc</text>
          <text x={tipX + 8} y={tipY - 6} className="text-[10px] fill-rose-600 dark:text-rose-400 font-sans font-bold">Lưỡi</text>
          <text x="10" y="215" className="text-[9px] fill-muted-foreground font-mono font-bold">Dây thanh</text>
        </svg>
      </div>

      {/* 3 Mechanical Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
        <div className="p-2 rounded-xl bg-secondary/30 border border-border">
          <span className="text-[10px] text-muted-foreground block">Độ Mở Môi</span>
          <strong className="text-foreground capitalize text-xs">
            {phoneme.mouthShape === "spread" ? "Bè Ngang" : phoneme.mouthShape === "rounded" ? "Tròn Môi" : "Tự Nhiên"}
          </strong>
        </div>

        <div className="p-2 rounded-xl bg-secondary/30 border border-border">
          <span className="text-[10px] text-muted-foreground block">Độ Nâng Lưỡi</span>
          <strong className="text-foreground capitalize text-xs">
            {phoneme.tongueHeight === "high" ? "Nâng Cao" : phoneme.tongueHeight === "mid" ? "Vừa Phải" : "Hạ Thấp"}
          </strong>
        </div>

        <div className="p-2 rounded-xl bg-secondary/30 border border-border">
          <span className="text-[10px] text-muted-foreground block">Vị Trí Lưỡi</span>
          <strong className="text-foreground capitalize text-xs">
            {phoneme.tonguePosition === "front" ? "Đầu Lưỡi" : phoneme.tonguePosition === "central" ? "Thân Lưỡi" : "Cuống Lưỡi"}
          </strong>
        </div>
      </div>
    </div>
  );
}
