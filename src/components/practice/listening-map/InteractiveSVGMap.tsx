"use client";

import React, { useState } from "react";
import {
  ListeningMapExerciseData,
  MapLetterLocation,
} from "@/data/mockListeningMapData";
import { DirectionCompassWidget } from "./DirectionCompassWidget";
import { ForensicPathOverlay } from "./ForensicPathOverlay";
import { Footprints, MapPin, Eye, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveSVGMapProps {
  mapData: ListeningMapExerciseData;
  answers: Record<number, string>;
  selectedQuestionId: number;
  eliminatedLetters: string[];
  isForensicMode: boolean;
  focusedLetter?: string | null;
  compassBearing: number;
  onSelectLetter: (letter: string) => void;
  onToggleEliminate: (letter: string) => void;
  onRotateCompass: (delta: number) => void;
  className?: string;
}

export function InteractiveSVGMap({
  mapData,
  answers,
  selectedQuestionId,
  eliminatedLetters,
  isForensicMode,
  focusedLetter,
  compassBearing,
  onSelectLetter,
  onToggleEliminate,
  onRotateCompass,
  className,
}: InteractiveSVGMapProps) {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  const activeAssignedLetter = answers[selectedQuestionId] || null;

  return (
    <div
      className={cn(
        "relative rounded-3xl border border-border bg-card shadow-sm overflow-hidden select-none flex flex-col items-center justify-center p-2 sm:p-4",
        className
      )}
    >
      {/* Top Controls Overlay: Compass Widget */}
      <div className="absolute top-4 right-4 z-20">
        <DirectionCompassWidget
          bearing={compassBearing}
          onRotate={onRotateCompass}
        />
      </div>

      {/* Map Header Info Bar */}
      <div className="w-full flex items-center justify-between px-2 pb-2 text-xs border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
            Bản Đồ SVG Tương Tác
          </span>
          <span className="font-bold text-foreground text-xs hidden sm:inline">
            {mapData.title}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
          <span className="hidden sm:inline">Chuột trái: Chọn vị trí | Chuột phải: Gạch bỏ</span>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full max-w-2xl aspect-[4/3] flex items-center justify-center pt-2">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full rounded-2xl bg-[#0f172a] shadow-inner"
        >
          {/* Defs & Gradients */}
          <defs>
            <linearGradient id="pondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            <linearGradient id="forestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="800" height="600" fill="url(#grid)" />

          {/* ========================================================================= */}
          {/* 1. PATHWAYS & ROADS NETWORK */}
          {/* ========================================================================= */}
          {/* Main Ring & Branch Roads */}
          <g stroke="#94a3b8" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85">
            {/* Entrance North Spine */}
            <path d="M 400 560 L 400 480" />
            {/* Fork to West Path */}
            <path d="M 400 480 L 280 480 L 170 440 L 130 350 L 140 260 L 220 180" />
            {/* Central Avenue to Bridge */}
            <path d="M 400 480 L 400 200" />
            {/* North of Bridge Forks */}
            <path d="M 400 180 L 310 130" />
            <path d="M 400 180 L 490 130" />
            {/* East Path to Car Park & Meadow */}
            <path d="M 400 480 L 520 480 L 685 480 L 685 530" />
            <path d="M 520 480 L 540 450 L 620 350 L 690 190" />
          </g>

          {/* Inner Road Asphalt Line */}
          <g stroke="#cbd5e1" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 400 560 L 400 480" />
            <path d="M 400 480 L 280 480 L 170 440 L 130 350 L 140 260 L 220 180" />
            <path d="M 400 480 L 400 200" />
            <path d="M 400 180 L 310 130" />
            <path d="M 400 180 L 490 130" />
            <path d="M 400 480 L 520 480 L 685 480 L 685 530" />
            <path d="M 520 480 L 540 450 L 620 350 L 690 190" />
          </g>

          {/* ========================================================================= */}
          {/* 2. LANDMARKS & ANCHOR FEATURES */}
          {/* ========================================================================= */}

          {/* Central Lake / Duck Pond */}
          <g>
            <circle cx="400" cy="320" r="62" fill="url(#pondGrad)" stroke="#38bdf8" strokeWidth="3" />
            {/* Water ripple circles */}
            <circle cx="390" cy="315" r="30" fill="none" stroke="#7dd3fc" strokeWidth="1" strokeDasharray="6,6" opacity="0.6" />
            <circle cx="415" cy="335" r="18" fill="none" stroke="#7dd3fc" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
            <text x="400" y="324" textAnchor="middle" fill="#f0f9ff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
              DUCK POND
            </text>
          </g>

          {/* North Footbridge */}
          <g>
            <rect x="375" y="195" width="50" height="26" rx="4" fill="#78350f" stroke="#d97706" strokeWidth="2" />
            {/* Bridge Planks */}
            <line x1="385" y1="195" x2="385" y2="221" stroke="#fde68a" strokeWidth="1.5" />
            <line x1="395" y1="195" x2="395" y2="221" stroke="#fde68a" strokeWidth="1.5" />
            <line x1="405" y1="195" x2="405" y2="221" stroke="#fde68a" strokeWidth="1.5" />
            <line x1="415" y1="195" x2="415" y2="221" stroke="#fde68a" strokeWidth="1.5" />
            <text x="400" y="190" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
              Footbridge
            </text>
          </g>

          {/* Ancient Oak Forest */}
          <g>
            <rect x="80" y="120" width="160" height="130" rx="16" fill="url(#forestGrad)" stroke="#10b981" strokeWidth="2" />
            <text x="160" y="175" textAnchor="middle" fill="#ecfdf5" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
              ANCIENT OAK WOOD
            </text>
            <text x="160" y="195" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontFamily="sans-serif">
              (Forest Trail)
            </text>
          </g>

          {/* Administration Office */}
          <g>
            <rect x="350" y="450" width="100" height="42" rx="8" fill="url(#buildingGrad)" stroke="#64748b" strokeWidth="2" />
            <text x="400" y="475" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              ADMIN OFFICE
            </text>
          </g>

          {/* Main Car Park */}
          <g>
            <rect x="620" y="490" width="130" height="70" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            {/* Parking Bay Lines */}
            <line x1="640" y1="495" x2="640" y2="520" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="660" y1="495" x2="660" y2="520" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="680" y1="495" x2="680" y2="520" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="700" y1="495" x2="700" y2="520" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="685" y="545" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              MAIN CAR PARK
            </text>
          </g>

          {/* Picnic Meadow */}
          <g>
            <rect x="620" y="280" width="120" height="90" rx="16" fill="#14532d" stroke="#22c55e" strokeWidth="2" opacity="0.8" />
            <text x="680" y="325" textAnchor="middle" fill="#dcfce7" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
              PICNIC MEADOW
            </text>
          </g>

          {/* Apple Orchard */}
          <g>
            <rect x="90" y="420" width="60" height="60" rx="8" fill="#166534" stroke="#4ade80" strokeWidth="1.5" opacity="0.7" />
            <text x="120" y="455" textAnchor="middle" fill="#dcfce7" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
              Orchard
            </text>
          </g>

          {/* ========================================================================= */}
          {/* 3. STARTING ANCHOR: MAIN ENTRANCE / YOU ARE HERE */}
          {/* ========================================================================= */}
          <g>
            <circle cx="400" cy="560" r="16" fill="#f43f5e" fillOpacity="0.2" className="animate-ping" />
            <circle cx="400" cy="560" r="10" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
            <rect x="310" y="575" width="180" height="20" rx="6" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
            <text x="400" y="589" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="sans-serif">
              YOU ARE HERE (Entrance)
            </text>
          </g>

          {/* ========================================================================= */}
          {/* 4. FORENSIC PATH TRACER (Rendered after Submission) */}
          {/* ========================================================================= */}
          {isForensicMode && (
            <ForensicPathOverlay
              pathNodes={mapData.pathNodes}
              activeLetter={focusedLetter}
            />
          )}

          {/* ========================================================================= */}
          {/* 5. INTERACTIVE LETTER PINS (A, B, C, D, E, F) */}
          {/* ========================================================================= */}
          {mapData.letterLocations.map((loc) => {
            const isEliminated = eliminatedLetters.includes(loc.letter);
            const isSelectedForActiveQ = activeAssignedLetter === loc.letter;
            const isFocusedInForensic = focusedLetter === loc.letter;
            const isHovered = hoveredLetter === loc.letter;

            return (
              <g
                key={loc.letter}
                onClick={() => onSelectLetter(loc.letter)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onToggleEliminate(loc.letter);
                }}
                onMouseEnter={() => setHoveredLetter(loc.letter)}
                onMouseLeave={() => setHoveredLetter(null)}
                className="cursor-pointer transition-transform duration-200"
                style={{
                  transformOrigin: `${loc.x}px ${loc.y}px`,
                  transform: isHovered || isSelectedForActiveQ ? "scale(1.2)" : "scale(1)",
                }}
              >
                {/* Outer Target Glow */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="24"
                  fill={
                    isSelectedForActiveQ
                      ? "#3b82f6"
                      : isFocusedInForensic
                      ? "#f43f5e"
                      : isHovered
                      ? "#06b6d4"
                      : "#8b5cf6"
                  }
                  fillOpacity={isSelectedForActiveQ || isFocusedInForensic ? "0.35" : "0.15"}
                />

                {/* Pin Circle Body */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="16"
                  fill={
                    isEliminated
                      ? "#334155"
                      : isSelectedForActiveQ
                      ? "#2563eb"
                      : isFocusedInForensic
                      ? "#e11d48"
                      : isHovered
                      ? "#0891b2"
                      : "#6366f1"
                  }
                  stroke={isSelectedForActiveQ ? "#60a5fa" : "#ffffff"}
                  strokeWidth="2.5"
                  opacity={isEliminated ? 0.45 : 1}
                  className="filter drop-shadow-md"
                />

                {/* Letter Text */}
                <text
                  x={loc.x}
                  y={loc.y + 5}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="15"
                  fontWeight="black"
                  fontFamily="sans-serif"
                  opacity={isEliminated ? 0.5 : 1}
                >
                  {loc.letter}
                </text>

                {/* Strikethrough diagonal red line if eliminated */}
                {isEliminated && (
                  <line
                    x1={loc.x - 14}
                    y1={loc.y - 14}
                    x2={loc.x + 14}
                    y2={loc.y + 14}
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Helper Footer */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pt-3 text-[11px] text-muted-foreground border-t border-border/60">
        <div className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-primary" />
          <span>Click vào ký hiệu chữ cái (A-F) trên bản đồ để điền nhanh vào câu hỏi hiện tại.</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block" /> Đang chọn
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600 inline-block" /> Đã gạch bỏ
          </span>
        </div>
      </div>
    </div>
  );
}
