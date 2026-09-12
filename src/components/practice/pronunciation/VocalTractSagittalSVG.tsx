"use client";

import React from "react";
import { IPAPhonemeData } from "@/data/mockIPA44Data";
import { Volume2, Wind, Sparkles } from "lucide-react";

interface VocalTractSagittalSVGProps {
  phoneme: IPAPhonemeData;
  isAirflowAnimating?: boolean;
}

export function VocalTractSagittalSVG({
  phoneme,
  isAirflowAnimating = false,
}: VocalTractSagittalSVGProps) {
  const { sagittal } = phoneme;
  const {
    tonguePointX,
    tonguePointY,
    tongueHeight,
    tongueBackness,
    lipShape,
    vocalCordsVibrating,
    airflowType,
  } = sagittal;

  // Compute Tongue Curve Path based on coordinates
  // Base origin: Lower jaw (x:25, y:80), tongue apex (tonguePointX, tonguePointY), tongue root (x:75, y:85)
  const tonguePath = `M 25 80 Q ${tonguePointX} ${tonguePointY} 75 85 L 65 95 L 25 95 Z`;

  // Lip Shape coordinates
  const upperLipY = lipShape === "rounded" ? 38 : lipShape === "spread" ? 34 : 36;
  const lowerLipY = lipShape === "rounded" ? 58 : lipShape === "spread" ? 64 : 60;
  const lipOpeningX = lipShape === "rounded" ? 14 : 18;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
            Giải Phẫu Học Khẩu Hình Sinh Học
          </span>
          <h4 className="text-sm font-black text-foreground">
            Mặt Cắt Thanh Âm (Sagittal Vocal Tract)
          </h4>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="px-2 py-0.5 rounded-md bg-secondary border border-border text-foreground font-bold">
            Âm: {phoneme.symbol}
          </span>
          {vocalCordsVibrating ? (
            <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-bold">
              Rung (Voiced)
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
              Vô thanh (Voiceless)
            </span>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative flex items-center justify-center py-2 select-none">
        <svg
          viewBox="0 0 100 100"
          className="w-full max-w-[280px] h-auto drop-shadow-sm overflow-visible"
        >
          {/* 1. Background Outline: Head & Vocal Cavity Silhouette */}
          {/* Hard Palate & Alveolar Ridge */}
          <path
            d="M 18 36 Q 30 25 50 25 Q 70 25 80 40 L 80 95 L 75 95 Q 75 45 50 32 Q 32 32 20 42 Z"
            fill="currentColor"
            className="text-secondary/60 stroke-border"
            strokeWidth="0.5"
          />

          {/* Upper Teeth */}
          <rect
            x="20"
            y="40"
            width="4"
            height="5"
            rx="1"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="0.5"
          />

          {/* Lower Teeth */}
          <rect
            x="22"
            y="65"
            width="4"
            height="5"
            rx="1"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="0.5"
          />

          {/* Upper Lip */}
          <path
            d={`M 8 32 Q 15 ${upperLipY} ${lipOpeningX} 40 L 15 44 Z`}
            fill="#f43f5e"
            className="opacity-75"
          />

          {/* Lower Lip */}
          <path
            d={`M 10 68 Q 15 ${lowerLipY} ${lipOpeningX} 62 L 15 58 Z`}
            fill="#f43f5e"
            className="opacity-75"
          />

          {/* Velum / Soft Palate (Ngạc mềm & Lưỡi gà) */}
          <path
            d={
              airflowType === "nasal"
                ? "M 65 30 Q 70 42 72 50 L 76 50 Q 74 38 68 28 Z" // lowered for nasal airflow
                : "M 65 30 Q 72 32 78 35 L 80 38 Q 74 35 68 28 Z" // raised closing nasal cavity
            }
            fill="#fb7185"
            className="transition-all duration-300"
          />

          {/* Vocal Cords (Thanh hầu / Dây thanh quản) at bottom neck */}
          <g transform="translate(72, 85)">
            <ellipse
              cx="0"
              cy="0"
              rx="4"
              ry="2.5"
              fill={vocalCordsVibrating ? "#f59e0b" : "#94a3b8"}
              className={vocalCordsVibrating ? "animate-pulse" : ""}
            />
            {vocalCordsVibrating && (
              <>
                <circle cx="0" cy="0" r="5" fill="none" stroke="#f59e0b" strokeWidth="0.5" className="animate-ping opacity-60" />
                <circle cx="0" cy="0" r="8" fill="none" stroke="#f59e0b" strokeWidth="0.3" className="opacity-40" />
              </>
            )}
          </g>

          {/* 2. Active Dynamic Tongue Body */}
          <path
            d={tonguePath}
            fill="url(#tongueGradient)"
            stroke="#e11d48"
            strokeWidth="1.2"
            strokeLinejoin="round"
            className="transition-all duration-400 ease-out"
          />

          {/* Tongue Apex Highlight Dot */}
          <circle
            cx={tonguePointX}
            cy={tonguePointY}
            r="2"
            fill="#ffffff"
            stroke="#e11d48"
            strokeWidth="0.8"
            className="animate-pulse"
          />

          {/* 3. Airflow Stream Dynamic Particles */}
          {isAirflowAnimating && (
            <path
              d={
                airflowType === "nasal"
                  ? "M 72 82 Q 65 50 65 20 Q 50 15 25 20"
                  : `M 72 82 Q ${tonguePointX + 5} ${tonguePointY - 5} 15 50`
              }
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeDasharray="3,2"
              className="animate-pulse"
            />
          )}

          {/* Gradients */}
          <defs>
            <linearGradient id="tongueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          {/* Landmarks Annotation Text */}
          <text x="24" y="24" className="text-[3.5px] font-mono fill-muted-foreground">Nướu (Alveolar)</text>
          <text x="48" y="20" className="text-[3.5px] font-mono fill-muted-foreground">Ngạc Cứng</text>
          <text x="75" y="26" className="text-[3.5px] font-mono fill-muted-foreground">Ngạc Mềm</text>
          <text x="56" y="96" className="text-[3.5px] font-mono fill-muted-foreground">Dây Thanh Quản</text>
        </svg>
      </div>

      {/* Anatomical Coordinates Legend */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-[11px] font-mono">
        <div className="p-2 rounded-xl bg-secondary/40 border border-border/70 text-center">
          <span className="text-muted-foreground text-[10px] block">Độ Cao Lưỡi</span>
          <strong className="text-foreground uppercase">{tongueHeight}</strong>
        </div>
        <div className="p-2 rounded-xl bg-secondary/40 border border-border/70 text-center">
          <span className="text-muted-foreground text-[10px] block">Vị Trí Lưỡi</span>
          <strong className="text-foreground uppercase">{tongueBackness}</strong>
        </div>
        <div className="p-2 rounded-xl bg-secondary/40 border border-border/70 text-center">
          <span className="text-muted-foreground text-[10px] block">Hình Dáng Môi</span>
          <strong className="text-foreground uppercase">{lipShape}</strong>
        </div>
      </div>
    </div>
  );
}
