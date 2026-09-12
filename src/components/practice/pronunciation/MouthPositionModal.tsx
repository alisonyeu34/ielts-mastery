"use client";

import React from "react";
import {
  X,
  Volume2,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Smile,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";
import { IPAPhoneme } from "@/data/mockIPAData";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { cn } from "@/lib/utils";

interface MouthPositionModalProps {
  phoneme: IPAPhoneme | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MouthPositionModal({
  phoneme,
  isOpen,
  onClose,
}: MouthPositionModalProps) {
  const { playSound, currentlyPlayingId, isPlaying } = useAudioPlayer();

  if (!isOpen || !phoneme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with Symbol and Audio */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono">
                /{phoneme.symbol}/
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                  {(phoneme.category || "Phoneme").toUpperCase()} • {phoneme.type.replace("_", " ").toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
                <span>{phoneme.sampleWord}</span>
                <span className="text-sm font-mono text-muted-foreground">
                  {phoneme.sampleWordIpa}
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Nghĩa: <strong>{phoneme.sampleWordMeaningVi}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => playSound(phoneme.id, phoneme.sampleWord)}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer",
              currentlyPlayingId === phoneme.id && isPlaying
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:scale-105"
            )}
          >
            <Volume2 className="h-4 w-4" />
            <span>Nghe mẫu âm</span>
          </button>
        </div>

        {/* Mouth Mechanics Breakdown Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Smile className="h-4 w-4 text-indigo-500" />
            Giải Phẫu Khẩu Hình & Vị Trí Đặt Lưỡi (Mouth Mechanics):
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Lip Shape */}
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-1.5">
              <span className="font-bold text-foreground block">👄 Khẩu hình Môi:</span>
              <p className="text-muted-foreground leading-relaxed">
                {phoneme.mouthGuide?.lipShape || phoneme.mouthPosition?.lips || phoneme.vietnameseGuide}
              </p>
            </div>

            {/* Tongue Placement */}
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-1.5">
              <span className="font-bold text-foreground block">👅 Vị trí Lưỡi:</span>
              <p className="text-muted-foreground leading-relaxed">
                {phoneme.mouthGuide?.tonguePlacement || phoneme.mouthPosition?.tongue || `${phoneme.tongueHeight} height, ${phoneme.tonguePosition} position`}
              </p>
            </div>

            {/* Voicing */}
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-1.5">
              <span className="font-bold text-foreground block">🎙️ Luồng hơi & Dây thanh:</span>
              <p className="text-muted-foreground leading-relaxed">
                {phoneme.mouthGuide?.voicing || phoneme.mouthPosition?.vocalCords || (phoneme.isVoiced ? "Rung thanh quản (Voiced)" : "Bật hơi (Voiceless)")}
              </p>
            </div>
          </div>
        </div>

        {/* Common Vietnamese Mistake Warning */}
        {(phoneme.mouthGuide?.commonMistake || phoneme.commonMistakeVi) && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1 shadow-sm">
            <span className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              Lỗi Sai Kinh Điển Người Việt Cần Tránh:
            </span>
            <p className="text-foreground/80 leading-relaxed font-medium">
              {phoneme.mouthGuide?.commonMistake || phoneme.commonMistakeVi}
            </p>
          </div>
        )}

        {/* 3 Positions Examples (Initial, Medial, Final) */}
        <div className="space-y-3 pt-2 border-t border-border/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-purple-500" />
            Ví Dụ Xuất Hiện Ở Các Vị Trí Của Từ:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(phoneme.examples || [
              { position: "initial", word: phoneme.sampleWord || phoneme.exampleWord, ipa: phoneme.sampleWordIpa || `/${phoneme.symbol}/`, meaningVi: phoneme.sampleWordMeaningVi || phoneme.vietnameseMeaning || "" }
            ]).map((ex, idx) => {
              const exPlayId = `ex_${phoneme.id}_${idx}`;
              const isExPlaying = currentlyPlayingId === exPlayId && isPlaying;

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-border bg-secondary/20 flex items-center justify-between gap-2 text-xs hover:border-indigo-500/30 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">
                      {ex.position === "initial" && "Đầu từ"}
                      {ex.position === "medial" && "Giữa từ"}
                      {ex.position === "final" && "Cuối từ"}
                    </span>
                    <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      <span>{ex.word}</span>
                      <span className="text-[11px] font-mono text-muted-foreground font-normal">
                        {ex.ipa}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground block">
                      {ex.meaningVi}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => playSound(exPlayId, ex.word)}
                    className={cn(
                      "p-2 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer shrink-0",
                      isExPlaying && "bg-indigo-600 text-white border-indigo-600 animate-pulse"
                    )}
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
