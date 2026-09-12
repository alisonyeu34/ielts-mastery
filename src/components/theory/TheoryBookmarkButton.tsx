"use client";

import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";
import { TheoryBookmarkItem } from "@/types/theoryBookmarks";
import { cn } from "@/lib/utils";

export interface TheoryBookmarkButtonProps {
  item: Omit<TheoryBookmarkItem, "savedAt">;
  size?: "sm" | "md" | "icon-only";
  label?: string;
  savedLabel?: string;
  className?: string;
  title?: string;
}

export function TheoryBookmarkButton({
  item,
  size = "sm",
  label = "Lưu quy tắc",
  savedLabel = "Đã lưu quy tắc ✓",
  className,
  title,
}: TheoryBookmarkButtonProps) {
  const { isSaved, toggleBookmark } = useTheoryBookmarks();
  const saved = isSaved(item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(item);
  };

  const defaultTitle = saved ? "Bỏ lưu khỏi Sổ Cần Nhớ" : "Lưu vào Sổ Cần Nhớ";

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title || defaultTitle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl font-bold transition-all cursor-pointer select-none shrink-0 border shadow-2xs",
        saved
          ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black shadow-amber-500/20"
          : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border-border/80",
        size === "icon-only" && "p-1.5",
        size === "sm" && "px-2.5 py-1 text-[10px]",
        size === "md" && "px-3 py-1.5 text-xs",
        className
      )}
    >
      {saved ? (
        <>
          <BookmarkCheck className={cn("fill-current", size === "icon-only" ? "h-3.5 w-3.5" : "h-3 w-3")} />
          {size !== "icon-only" && <span>{savedLabel}</span>}
        </>
      ) : (
        <>
          <Bookmark className={cn("text-amber-500", size === "icon-only" ? "h-3.5 w-3.5" : "h-3 w-3")} />
          {size !== "icon-only" && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
