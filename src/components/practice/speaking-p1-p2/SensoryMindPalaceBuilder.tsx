"use client";

import React from "react";
import {
  Sparkles,
  Eye,
  Volume2,
  Coffee,
  Wind,
  Heart,
  Compass,
  Lock,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SensoryMindPalaceBuilderProps {
  strategy: "sensory" | "memory_palace";
  isLocked: boolean;
  sensoryNotes: {
    sight: string;
    sound: string;
    smellTaste: string;
    touchAtmosphere: string;
    emotion: string;
  };
  memoryPalaceNotes: {
    station1: string;
    station2: string;
    station3: string;
  };
  onChangeStrategy: (strategy: "sensory" | "memory_palace") => void;
  onChangeSensoryField: (field: keyof SensoryMindPalaceBuilderProps["sensoryNotes"], val: string) => void;
  onChangePalaceField: (field: keyof SensoryMindPalaceBuilderProps["memoryPalaceNotes"], val: string) => void;
  onLoadModelNotes: () => void;
  className?: string;
}

export function SensoryMindPalaceBuilder({
  strategy,
  isLocked,
  sensoryNotes,
  memoryPalaceNotes,
  onChangeStrategy,
  onChangeSensoryField,
  onChangePalaceField,
  onLoadModelNotes,
  className,
}: SensoryMindPalaceBuilderProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none relative",
        isLocked ? "opacity-85" : "",
        className
      )}
    >
      {/* Top Header & Strategy Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          {/* Strategy Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/50 border border-border text-xs font-bold">
            <button
              type="button"
              onClick={() => onChangeStrategy("sensory")}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                strategy === "sensory"
                  ? "bg-card text-foreground shadow-2xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Mô Hình 5 Giác Quan
            </button>

            <button
              type="button"
              onClick={() => onChangeStrategy("memory_palace")}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                strategy === "memory_palace"
                  ? "bg-card text-foreground shadow-2xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Lâu Đài Trí Nhớ (3 Trạm)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onLoadModelNotes}
          className="px-3 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <BookOpen className="h-3.5 w-3.5 text-primary" />
          <span>Nạp Dàn Ý Mẫu</span>
        </button>
      </div>

      {/* STRATEGY 1: 5-SENSES GRID */}
      {strategy === "sensory" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Chỉ ghi chú <strong>từ khóa ngắn</strong> (tối đa 4-5 từ/ô) để kích hoạt hình dung giác quan:</span>
            {isLocked && <span className="font-mono text-rose-600 flex items-center gap-1"><Lock className="h-3 w-3" /> Đã Khóa</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* 1. Sight */}
            <div className="p-3.5 rounded-2xl bg-purple-500/[0.06] border border-purple-500/20 space-y-1.5">
              <span className="font-mono font-bold text-[11px] text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span>1. Thị Giác (Sight - Thấy gì?)</span>
              </span>
              <textarea
                rows={2}
                disabled={isLocked}
                value={sensoryNotes.sight}
                onChange={(e) => onChangeSensoryField("sight", e.target.value)}
                placeholder="Silver hair, vintage tweed jacket..."
                className="w-full p-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* 2. Sound */}
            <div className="p-3.5 rounded-2xl bg-blue-500/[0.06] border border-blue-500/20 space-y-1.5">
              <span className="font-mono font-bold text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Volume2 className="h-3.5 w-3.5" />
                <span>2. Thính Giác (Sound - Âm thanh)</span>
              </span>
              <textarea
                rows={2}
                disabled={isLocked}
                value={sensoryNotes.sound}
                onChange={(e) => onChangeSensoryField("sound", e.target.value)}
                placeholder="Resonant voice, gentle laughter..."
                className="w-full p-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* 3. Smell / Taste */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1.5">
              <span className="font-mono font-bold text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Coffee className="h-3.5 w-3.5" />
                <span>3. Khứu/Vị Giác (Smell/Taste)</span>
              </span>
              <textarea
                rows={2}
                disabled={isLocked}
                value={sensoryNotes.smellTaste}
                onChange={(e) => onChangeSensoryField("smellTaste", e.target.value)}
                placeholder="Roasted Arabica coffee aroma..."
                className="w-full p-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* 4. Touch / Atmosphere */}
            <div className="p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-1.5">
              <span className="font-mono font-bold text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Wind className="h-3.5 w-3.5" />
                <span>4. Xúc Giác & Không Khí</span>
              </span>
              <textarea
                rows={2}
                disabled={isLocked}
                value={sensoryNotes.touchAtmosphere}
                onChange={(e) => onChangeSensoryField("touchAtmosphere", e.target.value)}
                placeholder="Warm afternoon sunlight, cozy ambiance..."
                className="w-full p-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* 5. Core Emotion */}
            <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 space-y-1.5 sm:col-span-2 lg:col-span-2">
              <span className="font-mono font-bold text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" />
                <span>5. Cảm Xúc Cốt Lõi (Core Emotion & Impact)</span>
              </span>
              <textarea
                rows={2}
                disabled={isLocked}
                value={sensoryNotes.emotion}
                onChange={(e) => onChangeSensoryField("emotion", e.target.value)}
                placeholder="Profound reverence, peaceful introspection, inspired motivation..."
                className="w-full p-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* STRATEGY 2: MEMORY PALACE (3 LOCI STATIONS) */}
      {strategy === "memory_palace" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Neo câu chuyện vào 3 trạm không gian quen thuộc:</span>
            {isLocked && <span className="font-mono text-rose-600 flex items-center gap-1"><Lock className="h-3 w-3" /> Đã Khóa</span>}
          </div>

          <div className="space-y-3 text-xs">
            {/* Station 1 */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-1.5">
              <span className="font-mono font-bold text-xs text-primary block">
                🚪 Trạm 1: Cửa Vào / Bối Cảnh Ban Đầu (Who & Where)
              </span>
              <textarea
                rows={2}
                disabled={isLocked}
                value={memoryPalaceNotes.station1}
                onChange={(e) => onChangePalaceField("station1", e.target.value)}
                placeholder="Quán cafe góc phố: Gặp bác thợ mộc đang phác thảo sổ da..."
                className="w-full p-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Station 2 */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-1.5">
              <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400 block">
                🛋️ Trạm 2: Phòng Khách / Cao Trào Diễn Biến (What happened & Climax)
              </span>
              <textarea
                rows={2}
                disabled={isLocked}
                value={memoryPalaceNotes.station2}
                onChange={(e) => onChangePalaceField("station2", e.target.value)}
                placeholder="Bàn gỗ: Trò chuyện về triết lý chế tác mộc và sự kiên định sống..."
                className="w-full p-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Station 3 */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-1.5">
              <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 block">
                🌄 Trạm 3: Ban Công / Cảm Xúc & Bài Học Đọng Lại (Why it matters)
              </span>
              <textarea
                rows={2}
                disabled={isLocked}
                value={memoryPalaceNotes.station3}
                onChange={(e) => onChangePalaceField("station3", e.target.value)}
                placeholder="Hiên ban công: Lời nhắc nhở sâu sắc về lòng kiên trì và tư duy làm nghề..."
                className="w-full p-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
