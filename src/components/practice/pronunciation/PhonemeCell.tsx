"use client";

import React from "react";
import { Volume2, Sparkles, Info } from "lucide-react";
import { IPAPhoneme, PhonemeType } from "@/data/mockIPAData";
import { cn } from "@/lib/utils";

interface PhonemeCellProps {
  phoneme: IPAPhoneme;
  isPlaying: boolean;
  onPlaySound: (phoneme: IPAPhoneme, e: React.MouseEvent) => void;
  onSelect: (phoneme: IPAPhoneme) => void;
  className?: string;
}

export function PhonemeCell({
  phoneme,
  isPlaying,
  onPlaySound,
  onSelect,
  className,
}: PhonemeCellProps) {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "monophthong_long":
        return {
          label: "Long Vowel",
          color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
          borderHover: "hover:border-indigo-500/50 hover:bg-indigo-500/[0.04]",
        };
      case "monophthong_short":
      case "monophthong":
        return {
          label: "Short Vowel",
          color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          borderHover: "hover:border-blue-500/50 hover:bg-blue-500/[0.04]",
        };
      case "diphthong":
        return {
          label: "Diphthong",
          color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
          borderHover: "hover:border-purple-500/50 hover:bg-purple-500/[0.04]",
        };
      case "consonant_voiced":
        return {
          label: "Voiced (Rung)",
          color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          borderHover: "hover:border-emerald-500/50 hover:bg-emerald-500/[0.04]",
        };
      case "consonant_voiceless":
      case "consonant":
      default:
        return {
          label: "Consonant",
          color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          borderHover: "hover:border-amber-500/50 hover:bg-amber-500/[0.04]",
        };
    }
  };

  const badge = getTypeBadge(phoneme.type);

  return (
    <div
      onClick={() => onSelect(phoneme)}
      className={cn(
        "group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card shadow-sm cursor-pointer transition-all duration-200 select-none",
        badge.borderHover,
        isPlaying && "ring-2 ring-indigo-500 border-indigo-500 bg-indigo-500/10 shadow-md",
        className
      )}
    >
      {/* Top row: Type Tag & Play Audio Button */}
      <div className="flex items-center justify-between gap-1">
        <span
          className={cn(
            "text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md border uppercase tracking-wider",
            badge.color
          )}
        >
          {badge.label}
        </span>

        <button
          type="button"
          onClick={(e) => onPlaySound(phoneme, e)}
          className={cn(
            "p-1.5 rounded-lg transition-colors cursor-pointer",
            isPlaying
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 animate-pulse"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
          title={`Nghe phát âm từ '${phoneme.sampleWord}'`}
        >
          <Volume2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main IPA Symbol */}
      <div className="py-2.5 sm:py-3 text-center">
        <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono tracking-wide group-hover:scale-110 group-hover:text-indigo-500 transition-all inline-block">
          /{phoneme.symbol}/
        </span>
      </div>

      {/* Bottom Sample Word */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
        <div className="space-y-0.5 text-left">
          <span className="font-bold text-foreground block">{phoneme.sampleWord}</span>
          <span className="text-[10px] text-muted-foreground font-mono">{phoneme.sampleWordIpa}</span>
        </div>

        <span className="text-[10px] text-muted-foreground group-hover:text-indigo-500 transition-colors flex items-center gap-0.5 opacity-0 group-hover:opacity-100">
          <Info className="h-3 w-3" /> Chi tiết
        </span>
      </div>
    </div>
  );
}
