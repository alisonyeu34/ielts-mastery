"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Passage3SplitLayoutProps {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  className?: string;
}

export function Passage3SplitLayout({
  leftPane,
  rightPane,
  className,
}: Passage3SplitLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
        className
      )}
    >
      {/* Left Column: Abstract Passage (6 or 7 cols) */}
      <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-20 max-h-none lg:max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
        {leftPane}
      </div>

      {/* Right Column: Questions & Tools (6 or 5 cols) */}
      <div className="lg:col-span-6 space-y-6 max-h-none lg:max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
        {rightPane}
      </div>
    </div>
  );
}
