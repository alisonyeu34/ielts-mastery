"use client";

import React, { useState } from "react";
import { TheoryNote } from "@/hooks/useTheoryLessonSession";
import {
  StickyNote,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TheoryNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: TheoryNote[];
  onAddNote: (text: string) => void;
  onRemoveNote: (id: string) => void;
  currentStep: number;
  className?: string;
}

export function TheoryNotesDrawer({
  isOpen,
  onClose,
  notes,
  onAddNote,
  onRemoveNote,
  currentStep,
  className,
}: TheoryNotesDrawerProps) {
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    if (!inputText.trim()) return;
    onAddNote(inputText.trim());
    setInputText("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-amber-500" />
            <h4 className="font-extrabold text-foreground text-sm">
              Sổ Tay Ghi Chú Lý Thuyết (Inline Notes)
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={`Ghi chú cho Bước ${currentStep}...`}
            className="flex-1 px-3 py-2 rounded-xl border border-border bg-secondary/20 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold cursor-pointer"
          >
            Lưu
          </button>
        </div>

        {/* List */}
        <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
          {notes.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center">
              Chưa có ghi chú nào cho bài học này.
            </p>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                className="p-3 rounded-xl bg-secondary/40 border border-border/70 flex items-start justify-between gap-2"
              >
                <div>
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold block">
                    Bước {n.stepNumber} • {n.timestamp}
                  </span>
                  <p className="text-foreground mt-0.5 leading-relaxed font-medium">{n.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveNote(n.id)}
                  className="text-muted-foreground hover:text-rose-500 p-1 cursor-pointer"
                  title="Xóa ghi chú"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
