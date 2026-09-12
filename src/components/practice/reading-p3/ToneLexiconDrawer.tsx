"use client";

import React, { useState } from "react";
import {
  X,
  BookOpen,
  Sparkles,
  Search,
  Volume2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { ToneLexiconItem, StanceType } from "@/data/mockPassage3Data";
import { cn } from "@/lib/utils";

interface ToneLexiconDrawerProps {
  isOpen: boolean;
  lexicon: ToneLexiconItem[];
  onClose: () => void;
}

export function ToneLexiconDrawer({
  isOpen,
  lexicon,
  onClose,
}: ToneLexiconDrawerProps) {
  const [activeTab, setActiveTab] = useState<"all" | StanceType>("all");

  if (!isOpen) return null;

  const filtered =
    activeTab === "all" ? lexicon : lexicon.filter((item) => item.type === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Cẩm Nang Từ Chỉ Sắc Thái Tác Giả (Evaluative Tone Lexicon)
              </h3>
              <span className="text-[11px] text-muted-foreground">
                Các từ chỉ dấu giúp bắt chuẩn thái độ tán thành vs nghi ngờ của tác giả
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

        {/* Tone Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/60 border border-border/80 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={cn(
              "flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              activeTab === "all" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
            )}
          >
            Tất cả ({lexicon.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("positive")}
            className={cn(
              "flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              activeTab === "positive" ? "bg-blue-600 text-white shadow-xs" : "text-muted-foreground"
            )}
          >
            Tán thành (Positive)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("critical")}
            className={cn(
              "flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              activeTab === "critical" ? "bg-rose-600 text-white shadow-xs" : "text-muted-foreground"
            )}
          >
            Nghi ngờ (Critical)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("concession")}
            className={cn(
              "flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              activeTab === "concession" ? "bg-purple-600 text-white shadow-xs" : "text-muted-foreground"
            )}
          >
            Nhượng bộ (Concession)
          </button>
        </div>

        {/* Lexicon Cards Grid */}
        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
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
                </div>

                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                    item.type === "positive"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                      : item.type === "critical"
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                  )}
                >
                  {item.type}
                </span>
              </div>

              <p className="text-foreground font-semibold">
                🇻🇳 {item.vietnameseMeaning}
              </p>

              <div className="p-2.5 rounded-xl bg-card border border-border/80 space-y-1">
                <p className="text-[11px] text-muted-foreground">
                  💡 <strong>Sắc thái học thuật:</strong> {item.academicNuance}
                </p>
                <p className="font-serif italic text-[11px] text-foreground/90 pt-0.5">
                  Ví dụ: "{item.exampleSentence}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Đóng bảng tra cứu
          </button>
        </div>
      </div>
    </div>
  );
}
