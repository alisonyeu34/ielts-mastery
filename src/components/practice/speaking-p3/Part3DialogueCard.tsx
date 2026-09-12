"use client";

import React, { useState } from "react";
import {
  Volume2,
  Mic,
  Square,
  Sparkles,
  Lightbulb,
  Send,
  HelpCircle,
  FileText,
} from "lucide-react";
import { Part3QuestionTopic } from "@/data/mockSpeakingP3Data";
import { cn } from "@/lib/utils";

interface Part3DialogueCardProps {
  topic: Part3QuestionTopic;
  isRecording: boolean;
  transcriptText: string;
  onSetTranscript: (text: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onLoadSample: () => void;
  onSubmit: () => void;
  className?: string;
}

export function Part3DialogueCard({
  topic,
  isRecording,
  transcriptText,
  onSetTranscript,
  onStartRecording,
  onStopRecording,
  onLoadSample,
  onSubmit,
  className,
}: Part3DialogueCardProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const speakQuestion = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(topic.questionText);
    utterance.lang = "en-GB"; // Standard British English
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          Part 3: Discussion & Two-way Dialogue
        </span>
        <span className="text-xs font-semibold text-muted-foreground">
          Chủ đề: {topic.category}
        </span>
      </div>

      {/* AI Examiner Question Card */}
      <div className="p-5 rounded-2xl bg-secondary/30 border border-border flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/30">
          AI
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Cambridge Examiner Question:
            </span>

            <button
              type="button"
              onClick={speakQuestion}
              className={cn(
                "p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors cursor-pointer",
                isPlayingAudio
                  ? "bg-indigo-600 text-white border-indigo-600 animate-pulse"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              )}
              title="Phát âm thanh câu hỏi giọng Anh - Anh (en-GB)"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold">Nghe câu hỏi</span>
            </button>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-foreground font-serif leading-relaxed">
            "{topic.questionText}"
          </h3>
        </div>
      </div>

      {/* Candidate Speech Input & Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-indigo-500" />
            <span>Câu trả lời của bạn (Bật Mic để đo Ngữ điệu & Pitch Tracker):</span>
          </label>

          <button
            type="button"
            onClick={onLoadSample}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground bg-secondary px-3 py-1.5 rounded-xl border border-border flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span>Tải bài mẫu Band 8.5+</span>
          </button>
        </div>

        <textarea
          rows={5}
          value={transcriptText}
          onChange={(e) => onSetTranscript(e.target.value)}
          placeholder="Nói vào mic hoặc soạn thảo câu trả lời (kết hợp 2 lăng kính chủ thể và sử dụng các từ rào đón it could be argued that, evidence suggests that...)"
          className="w-full rounded-2xl border border-border bg-secondary/20 p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-serif leading-relaxed"
        />
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {!isRecording ? (
            <button
              type="button"
              onClick={onStartRecording}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Mic className="h-4 w-4" />
              <span>Bật Mic & Bắt đầu luyện nói</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStopRecording}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/30 flex items-center gap-2 transition-all cursor-pointer animate-pulse"
            >
              <Square className="h-3.5 w-3.5 fill-white" />
              <span>Dừng ghi âm & Phân tích</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={transcriptText.trim().length < 20}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
            transcriptText.trim().length >= 20
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          )}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Tổng kết & Phân tích Đa chiều</span>
        </button>
      </div>
    </div>
  );
}
