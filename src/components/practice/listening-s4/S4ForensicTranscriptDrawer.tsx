"use client";

import React, { useState } from "react";
import {
  Section4LectureExerciseData,
} from "@/data/mockSection4LectureData";
import {
  FileText,
  Sparkles,
  X,
  Volume2,
  BookmarkPlus,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface S4ForensicTranscriptDrawerProps {
  isOpen: boolean;
  data: Section4LectureExerciseData;
  onSeekToSecond: (seconds: number) => void;
  onSaveAwlVocab: () => void;
  onClose: () => void;
  className?: string;
}

export function S4ForensicTranscriptDrawer({
  isOpen,
  data,
  onSeekToSecond,
  onSaveAwlVocab,
  onClose,
  className,
}: S4ForensicTranscriptDrawerProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSaveVocab = () => {
    onSaveAwlVocab();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `0${mins}:${rem < 10 ? `0${rem}` : rem}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-3xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/20">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase">
                Section 4 Forensic Transcript
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Giải Phẫu Bài Giảng: Signposting & Target Answers
            </h3>
          </div>
        </div>

        {/* Color Coding Legend */}
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-secondary/30 border border-border text-xs">
          <span className="font-bold text-foreground">Ký hiệu bóc tách:</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500 inline-block" />
            <span className="text-purple-600 dark:text-purple-400 font-bold">
              Từ Tín Hiệu Signposting
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              Từ Cần Điền (Target Answer)
            </span>
          </span>
        </div>

        {/* Transcript Paragraphs List */}
        <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
          {data.transcriptParagraphs.map((para, idx) => (
            <div
              key={idx}
              onClick={() => onSeekToSecond(para.startSecond)}
              className="p-4 rounded-2xl border border-border bg-secondary/15 hover:bg-secondary/30 transition-colors cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span className="font-bold text-primary">
                  {data.speaker} • {formatTime(para.startSecond)} - {formatTime(para.endSecond)}
                </span>
                {para.questionNumber && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                    Câu {para.questionNumber}: [{para.targetWordHighlight}]
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-foreground/90 font-serif leading-relaxed">
                {para.text}
              </p>

              {para.signpostingHighlight && (
                <div className="pt-1 text-[11px] font-mono text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <Radio className="h-3 w-3" />
                  <span>Tín hiệu chuyển ý: "{para.signpostingHighlight}"</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/70">
          <button
            type="button"
            onClick={handleSaveVocab}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Đã lưu 4 thuật ngữ AWL vào Sổ Từ Vựng!</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="h-4 w-4" />
                <span>Lưu 4 Thuật Ngữ AWL (FSRS)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors cursor-pointer"
          >
            Đóng Giải Phẫu
          </button>
        </div>
      </div>
    </div>
  );
}
