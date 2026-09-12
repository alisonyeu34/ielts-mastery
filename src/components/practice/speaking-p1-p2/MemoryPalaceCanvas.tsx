"use client";

import React from "react";
import {
  Compass,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { MemoryPalaceNotes } from "@/data/mockSpeakingP1P2Data";
import { cn } from "@/lib/utils";

interface MemoryPalaceCanvasProps {
  notes: MemoryPalaceNotes;
  onChangeStation: (station: keyof MemoryPalaceNotes, val: string) => void;
  className?: string;
}

const STATIONS: Array<{
  key: keyof MemoryPalaceNotes;
  label: string;
  step: string;
  color: string;
  badgeColor: string;
  placeholder: string;
}> = [
  {
    key: "station1",
    label: "Trạm 1: Khởi Đầu & Cổng Vào (Entrance / Arrival)",
    step: "1",
    color: "border-blue-500/30 bg-blue-500/[0.02]",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    placeholder: "Ghi chú từ khóa: Xếp hàng soát vé, bối cảnh thời gian, cảm xúc háo hức ban đầu...",
  },
  {
    key: "station2",
    label: "Trạm 2: Không Gian Chính (Main Setting / Arena)",
    step: "2",
    color: "border-purple-500/30 bg-purple-500/[0.02]",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    placeholder: "Ghi chú từ khóa: Bước vào khán đài, hiệu ứng ánh sáng, người đồng hành...",
  },
  {
    key: "station3",
    label: "Trạm 3: Điểm Nhấn Cao Trào (The Climax / Peak Event)",
    step: "3",
    color: "border-amber-500/30 bg-amber-500/[0.02]",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    placeholder: "Ghi chú từ khóa: Khoảnh khắc bùng nổ, bài hát yêu thích, tiếng reo hò, pháo hoa...",
  },
  {
    key: "station4",
    label: "Trạm 4: Ra Về & Cảm Xúc Đọng Lại (Departure / Reflection)",
    step: "4",
    color: "border-emerald-500/30 bg-emerald-500/[0.02]",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    placeholder: "Ghi chú từ khóa: Bước ra đường phố ban đêm, cảm giác được tiếp thêm năng lượng...",
  },
];

export function MemoryPalaceCanvas({
  notes,
  onChangeStation,
  className,
}: MemoryPalaceCanvasProps) {
  return (
    <div className={cn("space-y-3 select-none", className)}>
      <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
        <Compass className="h-4 w-4 text-purple-500" />
        <span>Dàn Ý Theo 4 Trạm Không Gian (Memory Palace Spatial Journey):</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STATIONS.map((station) => (
          <div
            key={station.key}
            className={cn("p-3.5 rounded-2xl border space-y-2", station.color)}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                  station.badgeColor
                )}
              >
                Trạm {station.step}
              </span>
              <span className="text-[11px] font-bold text-foreground truncate max-w-[200px]">
                {station.label.split(":")[1]}
              </span>
            </div>

            <textarea
              rows={3}
              value={notes[station.key]}
              onChange={(e) => onChangeStation(station.key, e.target.value)}
              placeholder={station.placeholder}
              className="w-full rounded-xl border border-border bg-card p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/30 font-sans leading-relaxed"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
