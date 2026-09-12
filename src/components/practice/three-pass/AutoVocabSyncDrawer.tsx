"use client";

import React from "react";
import {
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Plus,
  BookmarkCheck,
} from "lucide-react";
import { ExtractableVocabItem } from "@/data/mockThreePassTest";
import { cn } from "@/lib/utils";

interface AutoVocabSyncDrawerProps {
  isOpen: boolean;
  vocabList: ExtractableVocabItem[];
  syncedVocabIds: string[];
  onSyncVocab: (item: ExtractableVocabItem) => void;
  onClose: () => void;
}

export function AutoVocabSyncDrawer({
  isOpen,
  vocabList,
  syncedVocabIds,
  onSyncVocab,
  onClose,
}: AutoVocabSyncDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Thu Hoạch Từ Vựng C1 Vào FSRS (Vocab Harvest)
              </h3>
              <span className="text-[11px] text-muted-foreground">
                Tự động đồng bộ các từ học thuật trong bài đọc vào thuật toán lặp lại ngắt quãng
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Vocab Items List */}
        <div className="space-y-3">
          {vocabList.map((item) => {
            const isSynced = syncedVocabIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-foreground">
                      {item.word}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {item.phonetic}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary border border-border/80 uppercase">
                      {item.partOfSpeech}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => !isSynced && onSyncVocab(item)}
                    disabled={isSynced}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer",
                      isSynced
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 cursor-default"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm"
                    )}
                  >
                    {isSynced ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Đã nạp FSRS</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" />
                        <span>Nạp vào Sổ Từ Vựng</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-foreground font-semibold">
                  🇻🇳 {item.meaningVi}
                </p>

                <p className="font-serif italic text-[11px] text-muted-foreground bg-card p-2.5 rounded-xl border border-border/60">
                  "{item.contextSentence}"
                </p>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Hoàn tất thu hoạch
          </button>
        </div>
      </div>
    </div>
  );
}
