"use client";

import React, { useState } from "react";
import {
  Sparkles,
  BookmarkPlus,
  CheckCircle2,
  X,
  Highlighter,
} from "lucide-react";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ContextualWordPopover } from "./ContextualWordPopover";

interface FloatingAnnotationBarProps {
  selectedText: string;
  paragraphId: string;
  position: { top: number; left: number };
  onHighlight: (color: "yellow" | "green" | "red" | "purple") => void;
  onClose: () => void;
  className?: string;
}

export function FloatingAnnotationBar({
  selectedText,
  paragraphId,
  position,
  onHighlight,
  onClose,
  className,
}: FloatingAnnotationBarProps) {
  const [isSavedVocab, setIsSavedVocab] = useState<boolean>(false);
  const [showDict, setShowDict] = useState<boolean>(false);

  const handleSaveToVocab = async () => {
    if (!selectedText.trim()) return;
    try {
      await db.vocab_matrix.put({
        id: `vocab_rd_${Date.now()}_${selectedText.substring(0, 8)}`,
        word: selectedText.trim(),
        ipa: `/${selectedText.trim()}/`,
        meaning: "Từ vựng được bôi đen và lưu từ bài đọc Reading Split-View",
        collocations: [selectedText.trim()],
        originalContext: `Trích đoạn văn ${paragraphId}: "...${selectedText.trim()}..."`,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        nextReviewDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      setIsSavedVocab(true);
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (e) {
      console.error("Save to vocab failed:", e);
    }
  };

  return (
    <div
      style={{
        top: `${Math.max(10, position.top - 50)}px`,
        left: `${Math.max(10, position.left - 100)}px`,
      }}
      className={cn(
        "absolute z-40 flex items-center gap-1.5 p-1.5 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-md animate-in zoom-in-95 duration-150 select-none",
        className
      )}
    >
      {/* 4 Highlight Color Badges */}
      <div className="flex items-center gap-1 border-r border-border/80 pr-1.5">
        {/* Yellow (Main Idea) */}
        <button
          type="button"
          onClick={() => onHighlight("yellow")}
          className="h-6 w-6 rounded-lg bg-yellow-400/90 hover:scale-110 transition-transform cursor-pointer shadow-2xs"
          title="Ý chính (Main Idea)"
        />

        {/* Green (Keywords) */}
        <button
          type="button"
          onClick={() => onHighlight("green")}
          className="h-6 w-6 rounded-lg bg-emerald-500/90 hover:scale-110 transition-transform cursor-pointer shadow-2xs"
          title="Từ khóa (Keywords)"
        />

        {/* Red (Trap / Distractor) */}
        <button
          type="button"
          onClick={() => onHighlight("red")}
          className="h-6 w-6 rounded-lg bg-rose-500/90 hover:scale-110 transition-transform cursor-pointer shadow-2xs"
          title="Bẫy / Nhiễu (Traps)"
        />

        {/* Purple (Unfamiliar Vocab) */}
        <button
          type="button"
          onClick={() => onHighlight("purple")}
          className="h-6 w-6 rounded-lg bg-purple-500/90 hover:scale-110 transition-transform cursor-pointer shadow-2xs"
          title="Từ vựng mới (Vocab)"
        />
      </div>

      {/* Tra nghĩa & Paraphrase Button */}
      <button
        type="button"
        onClick={() => setShowDict((prev) => !prev)}
        className="px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30 transition-all cursor-pointer"
        title="Xem nghĩa chuẩn ngữ cảnh và cặp từ đồng nghĩa bẫy Cambridge"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Bóc Tách Paraphrase</span>
      </button>

      {/* Save to FSRS Vocab Matrix */}
      <button
        type="button"
        onClick={handleSaveToVocab}
        disabled={isSavedVocab}
        className={cn(
          "px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer",
          isSavedVocab
            ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
            : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
        )}
      >
        {isSavedVocab ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Đã Lưu FSRS</span>
          </>
        ) : (
          <>
            <BookmarkPlus className="h-3.5 w-3.5 text-primary" />
            <span>Lưu FSRS</span>
          </>
        )}
      </button>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Contextual Popover overlay */}
      {showDict && (
        <ContextualWordPopover
          selectedText={selectedText}
          paragraphId={paragraphId}
          position={{ top: 40, left: 0 }}
          onClose={() => setShowDict(false)}
        />
      )}
    </div>
  );
}
