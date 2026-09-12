"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { TargetSkill } from "@/types/theoryBookmarks";

interface Band75RecommendationBadgeProps {
  skill?: TargetSkill;
  bandTarget?: string;
  reasonVi?: string;
  className?: string;
  compact?: boolean;
}

export function Band75RecommendationBadge({
  skill,
  bandTarget,
  reasonVi,
  className,
  compact = false,
}: Band75RecommendationBadgeProps) {
  // Determine skill from skill prop or bandTarget string
  let detectedSkill: TargetSkill | undefined = skill;
  if (!detectedSkill && bandTarget) {
    if (bandTarget.includes("8.5") || bandTarget.toLowerCase().includes("read")) detectedSkill = "reading";
    else if (bandTarget.includes("8.0") || bandTarget.toLowerCase().includes("lis")) detectedSkill = "listening";
    else if (bandTarget.includes("6.5") || bandTarget.toLowerCase().includes("wri")) detectedSkill = "writing";
    else if (bandTarget.includes("6.0") || bandTarget.toLowerCase().includes("speak")) detectedSkill = "speaking";
    else if (bandTarget.includes("Cú pháp") || bandTarget.toLowerCase().includes("gram")) detectedSkill = "grammar";
  }

  let displayText = "Cần cho 7.5";
  let colorTheme = "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/35";
  let starColor = "fill-amber-500 text-amber-500";
  let defaultReason = "Từ vựng trọng điểm cho chiến lược Band 7.5 Overall";

  if (detectedSkill === "reading") {
    displayText = "Cần cho 8.5 Read";
    colorTheme = "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/35";
    starColor = "fill-sky-500 text-sky-500";
    defaultReason = "Mục tiêu 8.5 Reading: Từ vựng học thuật C1-C2 & paraphrase then chốt";
  } else if (detectedSkill === "listening") {
    displayText = "Cần cho 8.0 Lis";
    colorTheme = "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/35";
    starColor = "fill-indigo-500 text-indigo-500";
    defaultReason = "Mục tiêu 8.0 Listening: Từ vựng học thuật Sec 3-4 & bẫy tín hiệu nghe";
  } else if (detectedSkill === "writing") {
    displayText = "Cần cho 6.5 Wri";
    colorTheme = "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/35";
    starColor = "fill-amber-500 text-amber-500";
    defaultReason = "Mục tiêu 6.5 Writing: Collocation chuẩn xác & liên từ thực dụng (tránh từ hiếm gượng gạo)";
  } else if (detectedSkill === "speaking") {
    displayText = "Cần cho 6.0 Speak";
    colorTheme = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/35";
    starColor = "fill-emerald-500 text-emerald-500";
    defaultReason = "Mục tiêu 6.0 Speaking: Cụm từ tự nhiên & từ nối đệm trôi chảy (tránh gượng gạo)";
  } else if (detectedSkill === "grammar") {
    displayText = "Chuẩn 7.5 (Cú pháp 6.5+)";
    colorTheme = "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/35";
    starColor = "fill-amber-500 text-amber-500";
    defaultReason = "Chiến lược 7.5: Cú pháp chuẩn điểm hỗ trợ Writing 6.5+ & hiểu sâu Receptive 8.0+";
  } else if (bandTarget) {
    displayText = `Cần cho ${bandTarget}`;
  }

  const titleText = reasonVi || `Chiến lược Band 7.5 Overall: ${defaultReason}`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md font-mono font-black tracking-wide shadow-2xs select-none transition-all",
        colorTheme,
        compact ? "px-1.5 py-0.5 text-[8px]" : "px-2 py-0.5 text-[9px]",
        className
      )}
      title={titleText}
    >
      <Star className={cn("h-2.5 w-2.5 shrink-0", starColor)} />
      <span>{displayText}</span>
    </span>
  );
}
