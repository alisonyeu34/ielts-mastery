"use client";

import React, { useState } from "react";
import {
  Headphones,
  FileQuestion,
  Columns2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ListeningSplitLayoutProps {
  audioController: React.ReactNode;
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  className?: string;
}

export function ListeningSplitLayout({
  audioController,
  leftPane,
  rightPane,
  className,
}: ListeningSplitLayoutProps) {
  // Preset ratios: 50 (50/50), 60 (60/40), 40 (40/60)
  const [splitRatio, setSplitRatio] = useState<50 | 60 | 40>(50);
  // Mobile active tab: 'transcript' or 'questions'
  const [mobileTab, setMobileTab] = useState<"transcript" | "questions">("questions");

  return (
    <div className={cn("flex flex-col space-y-3 h-[calc(100vh-140px)] min-h-[650px]", className)}>
      {/* Top Audio Player Controller Bar */}
      <div className="shrink-0">
        {audioController}
      </div>

      {/* View Mode & Ratio Control Toolbar */}
      <div className="flex items-center justify-between px-1 shrink-0 select-none">
        {/* Mobile Tab Switcher */}
        <div className="flex sm:hidden items-center gap-1.5 p-1 rounded-2xl bg-secondary/40 border border-border w-full">
          <button
            type="button"
            onClick={() => setMobileTab("transcript")}
            className={cn(
              "w-1/2 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
              mobileTab === "transcript"
                ? "bg-card text-foreground shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Headphones className="h-3.5 w-3.5" />
            <span>Transcript</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileTab("questions")}
            className={cn(
              "w-1/2 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
              mobileTab === "questions"
                ? "bg-card text-foreground shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileQuestion className="h-3.5 w-3.5" />
            <span>Câu Hỏi</span>
          </button>
        </div>

        {/* Desktop Split Ratio Toggles */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-mono ml-auto">
          <span>Tỷ lệ hiển thị:</span>
          {(
            [
              { val: 50, label: "50 : 50" },
              { val: 60, label: "60 : 40" },
              { val: 40, label: "40 : 60" },
            ] as const
          ).map((ratio) => (
            <button
              key={ratio.val}
              type="button"
              onClick={() => setSplitRatio(ratio.val)}
              className={cn(
                "px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer",
                splitRatio === ratio.val
                  ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                  : "bg-card border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {ratio.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split Workspace */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Pane (Transcript) */}
        <div
          style={{ width: `${splitRatio}%` }}
          className={cn(
            "h-full overflow-hidden transition-all duration-200",
            "hidden sm:block",
            mobileTab === "transcript" ? "!block w-full sm:w-auto" : ""
          )}
        >
          {leftPane}
        </div>

        {/* Right Pane (Questions) */}
        <div
          style={{ width: `${100 - splitRatio}%` }}
          className={cn(
            "h-full overflow-hidden transition-all duration-200",
            "hidden sm:block",
            mobileTab === "questions" ? "!block w-full sm:w-auto" : ""
          )}
        >
          {rightPane}
        </div>
      </div>
    </div>
  );
}
