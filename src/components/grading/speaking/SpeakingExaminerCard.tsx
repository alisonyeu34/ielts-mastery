"use client";

import React from "react";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  Layers,
  HelpCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import { SpeakingTopic } from "@/data/mockSpeakingTopics";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { cn } from "@/lib/utils";

interface SpeakingExaminerCardProps {
  topic: SpeakingTopic;
  className?: string;
}

export function SpeakingExaminerCard({ topic, className }: SpeakingExaminerCardProps) {
  const { speakText, stopSpeaking, isSpeaking, supported } = useSpeechSynthesis();

  const handleSpeakQuestion = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textToRead =
        topic.part === 2 && topic.bulletPoints
          ? `${topic.questionText}. You should say: ${topic.bulletPoints.join(". ")}`
          : topic.questionText;
      speakText(textToRead);
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-indigo-500/25 bg-gradient-to-b from-card via-card to-indigo-500/[0.03] p-5 sm:p-7 space-y-5 shadow-sm",
        className
      )}
    >
      {/* Examiner Avatar & Audio Trigger Bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <Bot className="h-6 w-6" />
            {isSpeaking && (
              <span className="absolute -inset-1 rounded-2xl bg-indigo-500/30 animate-ping pointer-events-none" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-foreground">
                AI Cambridge Examiner
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isSpeaking ? "Đang đọc câu hỏi chuẩn giọng Anh - Anh..." : "Sẵn sàng tương tác phỏng vấn"}
            </p>
          </div>
        </div>

        {/* Listen Button */}
        {supported && (
          <button
            type="button"
            onClick={handleSpeakQuestion}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer",
              isSpeaking
                ? "bg-rose-600 text-white shadow-rose-600/30 animate-pulse"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:scale-105"
            )}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span>Dừng đọc</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5" />
                <span>Nghe câu hỏi (Audio)</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Part Tag & Question Text */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            IELTS Speaking Part {topic.part} • {topic.title}
          </span>

          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-indigo-500" />
            Thời lượng nói: ~{topic.recommendedSpeakingSeconds}s
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-secondary/40 border border-border/70 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
            "{topic.questionText}"
          </h3>

          {/* Part 2 Bullet Points if Cue Card */}
          {topic.part === 2 && topic.bulletPoints && (
            <div className="space-y-1.5 pt-2 border-t border-border/60 text-xs text-foreground/90">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                You should say:
              </span>
              <ul className="space-y-1 pl-2">
                {topic.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-1.5 font-medium">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Target Vocabulary Suggestions */}
      {topic.suggestedVocabulary && topic.suggestedVocabulary.length > 0 && (
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Cụm Collocations Gợi Ý Nên Dùng:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {topic.suggestedVocabulary.map((word, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-secondary/80 border border-border text-[11px] font-semibold text-foreground"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
