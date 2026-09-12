"use client";

import React from "react";
import { PhoneticDetail } from "@/data/mockDictationDrillsData";
import { Zap, Volume2, ShieldAlert, Sparkles, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneticTrapBadgeProps {
  phoneticNotes: PhoneticDetail;
  className?: string;
}

export function PhoneticTrapBadge({
  phoneticNotes,
  className,
}: PhoneticTrapBadgeProps) {
  const getBadgeStyle = (trapType: PhoneticDetail["trapType"]) => {
    switch (trapType) {
      case "linking":
        return {
          bg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
          icon: <LinkIcon className="h-3.5 w-3.5 text-blue-500" />,
        };
      case "elision":
        return {
          bg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
          icon: <Zap className="h-3.5 w-3.5 text-rose-500" />,
        };
      case "weak_form":
        return {
          bg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
          icon: <Volume2 className="h-3.5 w-3.5 text-amber-500" />,
        };
      case "ending_sound":
        return {
          bg: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
          icon: <ShieldAlert className="h-3.5 w-3.5 text-purple-500" />,
        };
      case "assimilation":
        return {
          bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
          icon: <Sparkles className="h-3.5 w-3.5 text-emerald-500" />,
        };
      default:
        return {
          bg: "bg-secondary text-foreground border-border",
          icon: <Volume2 className="h-3.5 w-3.5" />,
        };
    }
  };

  const style = getBadgeStyle(phoneticNotes.trapType);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-xs font-mono font-bold select-none",
        style.bg,
        className
      )}
    >
      {style.icon}
      <span>{phoneticNotes.trapNameVi}</span>
      <span className="px-2 py-0.5 rounded-lg bg-card/60 text-foreground font-black text-[11px] border border-border/60">
        {phoneticNotes.phonemicSymbol}
      </span>
    </div>
  );
}
