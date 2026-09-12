"use client";

import React, { useState } from "react";
import { useAIExaminerVoice } from "@/hooks/useAIExaminerVoice";
import {
  ExaminerPersonaId,
  EXAMINER_PERSONAS,
} from "@/lib/aiExaminerClient";
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  RotateCcw,
  Send,
  Timer,
  CheckCircle2,
  Radio,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakingExaminerVoiceChatProps {
  initialPersonaId?: ExaminerPersonaId;
  className?: string;
}

export function SpeakingExaminerVoiceChat({
  initialPersonaId = "strict_examiner",
  className,
}: SpeakingExaminerVoiceChatProps) {
  const {
    selectedPersonaId,
    setSelectedPersonaId,
    currentPart,
    setCurrentPart,
    messages,
    isRecording,
    isExaminerSpeaking,
    isProcessingAI,
    audioVolumeLevel,
    startRecording,
    stopRecordingAndSubmit,
    cueCardPrepSeconds,
    isPrepTimerRunning,
    startPart2Preparation,
    restartSession,
  } = useAIExaminerVoice(initialPersonaId);

  const [textInput, setTextInput] = useState<string>("");

  const activePersona =
    EXAMINER_PERSONAS.find((p) => p.id === selectedPersonaId) || EXAMINER_PERSONAS[0];

  const handleManualSend = () => {
    if (!textInput.trim()) return;
    stopRecordingAndSubmit(textInput.trim());
    setTextInput("");
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card shadow-lg p-5 sm:p-7 space-y-6 select-none",
        className
      )}
    >
      {/* Top Header: Examiner Card & Part Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-4">
        {/* Examiner Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-md transition-all",
                isExaminerSpeaking ? "ring-4 ring-indigo-500/40 scale-105" : ""
              )}
            >
              {activePersona.name.charAt(0)}
            </div>

            {isExaminerSpeaking && (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-card">
                <Volume2 className="h-2.5 w-2.5 text-white animate-pulse" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-foreground">{activePersona.name}</h3>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-mono text-[10px] font-bold">
                {activePersona.accent}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{activePersona.roleTitle}</span>
          </div>
        </div>

        {/* Part 1 / 2 / 3 Navigation Tabs */}
        <div className="flex items-center gap-1.5 self-start md:self-auto">
          {([1, 2, 3] as const).map((p) => {
            const isActive = currentPart === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPart(p)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                Part {p}
              </button>
            );
          })}

          <button
            type="button"
            onClick={restartSession}
            className="p-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Làm mới cuộc hội thoại"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Part 2 Cue Card Banner (if Part 2 active) */}
      {currentPart === 2 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-foreground font-mono uppercase text-[10px]">
              CUE CARD: INDIVIDUAL LONG TURN (PART 2)
            </span>

            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-amber-600 dark:text-amber-400">
                Chuẩn bị: {cueCardPrepSeconds}s
              </span>
              {!isPrepTimerRunning && cueCardPrepSeconds === 60 && (
                <button
                  type="button"
                  onClick={startPart2Preparation}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-600"
                >
                  Bắt Đầu 1 Phút Chuẩn Bị
                </button>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-card border border-amber-500/20 space-y-1">
            <p className="font-bold text-foreground">
              Describe a significant environmental initiative in your country that produced positive results.
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-0.5">
              <li>What the initiative was and who organized it</li>
              <li>How it was executed across different communities</li>
              <li>And explain why it was considered exceptionally successful</li>
            </ul>
          </div>
        </div>
      )}

      {/* Main Conversation Feed */}
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
        {messages.map((msg) => {
          const isEx = msg.sender === "examiner";
          return (
            <div
              key={msg.id}
              className={cn("flex flex-col space-y-1 text-xs", isEx ? "items-start" : "items-end")}
            >
              <span className="text-[10px] font-mono text-muted-foreground px-1">
                {isEx ? activePersona.name : "Bạn (Candidate)"} • {msg.timestamp}
              </span>

              <div
                className={cn(
                  "p-4 rounded-2xl max-w-xl leading-relaxed space-y-2",
                  isEx
                    ? "bg-secondary/40 border border-border text-foreground rounded-tl-sm"
                    : "bg-indigo-600 text-white rounded-tr-sm shadow-sm"
                )}
              >
                <p className="font-medium text-xs sm:text-sm">{msg.text}</p>

                {/* Suggested C1 Upgrades in Examiner Feedback */}
                {isEx && msg.suggestedC1Upgrades && msg.suggestedC1Upgrades.length > 0 && (
                  <div className="pt-2 border-t border-border/60 text-[11px] space-y-1 text-muted-foreground">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-mono text-[10px] uppercase">
                      <Lightbulb className="h-3 w-3" /> Gợi ý cụm từ C1 phản xạ:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedC1Upgrades.map((upg, uIdx) => (
                        <span
                          key={uIdx}
                          className="px-2 py-0.5 rounded bg-card border border-border text-foreground font-mono font-bold"
                        >
                          {upg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isProcessingAI && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono animate-pulse p-2">
            <Radio className="h-4 w-4 text-indigo-500 animate-spin" />
            <span>Giám khảo đang lắng nghe và hình thành câu hỏi phản biện...</span>
          </div>
        )}
      </div>

      {/* Bottom Microphone Control Bar */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Big Mic Push-to-Talk / Auto-VAD Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={isRecording ? () => stopRecordingAndSubmit() : startRecording}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl font-bold transition-all shadow-md cursor-pointer",
              isRecording
                ? "bg-rose-600 text-white ring-4 ring-rose-500/30 animate-pulse scale-105"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30"
            )}
            title={isRecording ? "Dừng nói & Gửi câu trả lời" : "Bắt đầu nói (Tự động gửi sau 2s im lặng)"}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          <div>
            <span className="text-xs font-bold text-foreground block">
              {isRecording ? "Đang ghi âm (VAD Tự Động Gửi Sau 2s Im Lặng)..." : "Bấm Micro Để Trả Lời Giọng Nói"}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              Web Audio Stream • Nhận diện giọng nói tức thì
            </span>
          </div>
        </div>

        {/* Manual Text Input Fallback */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleManualSend()}
            placeholder="Hoặc gõ câu trả lời dự phòng..."
            className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <button
            type="button"
            onClick={handleManualSend}
            className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
