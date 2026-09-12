"use client";

import React, { useState } from "react";
import {
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Send,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { Part1QuestionItem } from "@/data/mockSpeakingP1P2Data";
import { countWords } from "@/hooks/useSpeakingSession";
import { cn } from "@/lib/utils";

interface Part1TimelineExpanderProps {
  questions: Part1QuestionItem[];
  answers: Record<string, { present: string; past: string; future: string }>;
  onSetField: (questionId: string, field: "present" | "past" | "future", value: string) => void;
  onSaveAll: () => void;
  className?: string;
}

export function Part1TimelineExpander({
  questions,
  answers,
  onSetField,
  onSaveAll,
  className,
}: Part1TimelineExpanderProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [showSample, setShowSample] = useState<Record<string, boolean>>({});

  const currentQ = questions[activeIdx] || questions[0];
  const currentAns = answers[currentQ.id] || { present: "", past: "", future: "" };

  const presentWords = countWords(currentAns.present);
  const pastWords = countWords(currentAns.past);
  const futureWords = countWords(currentAns.future);
  const totalWords = presentWords + pastWords + futureWords;

  const isComplete =
    currentAns.present.trim().length > 10 &&
    currentAns.past.trim().length > 10 &&
    currentAns.future.trim().length > 10;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Part 1: Timeline Answer Expander
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Khung Mở Rộng 3 Mốc Thời Gian (Past - Present - Future)
          </h3>
          <p className="text-xs text-muted-foreground">
            Xóa bỏ câu trả lời ngắn 1 câu bằng phản xạ tư duy 3 thì: Hiện tại ➔ Quá khứ đối chiếu ➔ Tương lai dự tính.
          </p>
        </div>

        {/* Question Selector Tabs */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "h-8 w-8 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer border",
                activeIdx === idx
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30"
                  : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
              )}
            >
              Q{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Question Box */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Chủ đề: {currentQ.topic}
          </span>
          <h4 className="text-sm sm:text-base font-bold text-foreground">
            "{currentQ.questionText}"
          </h4>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowSample((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))
          }
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
          <span>{showSample[currentQ.id] ? "Ẩn bài mẫu" : "Xem bài mẫu 3 mốc"}</span>
        </button>
      </div>

      {/* Model Answer Drawer if toggled */}
      {showSample[currentQ.id] && (
        <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 text-xs space-y-2 font-serif leading-relaxed animate-in fade-in duration-150">
          <span className="font-sans font-bold text-[10px] text-amber-600 uppercase tracking-wider block">
            Câu Trả Lời Mẫu Chuẩn Band 8.0+:
          </span>
          <p>
            <strong className="text-blue-600">[Hiện tại]</strong> "{currentQ.sampleAnswer.present}"
          </p>
          <p>
            <strong className="text-purple-600">[Quá khứ]</strong> "{currentQ.sampleAnswer.past}"
          </p>
          <p>
            <strong className="text-emerald-600">[Tương lai]</strong> "{currentQ.sampleAnswer.future}"
          </p>
        </div>
      )}

      {/* 3 Timeline Blocks */}
      <div className="space-y-4">
        {/* Block 1: Present */}
        <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/[0.02] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              1. Khối Hiện Tại (Present Reality): Trả lời trực diện
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">{presentWords} từ</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            <em>Gợi ý:</em> <code>At the moment, ... / Currently, I ... / On a daily basis, ...</code>
          </p>
          <textarea
            rows={2}
            value={currentAns.present}
            onChange={(e) => onSetField(currentQ.id, "present", e.target.value)}
            placeholder="Trả lời trực tiếp câu hỏi bằng thì Hiện tại đơn / Hiện tại hoàn thành..."
            className="w-full rounded-xl border border-border bg-card p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-serif leading-relaxed"
          />
        </div>

        {/* Block 2: Past */}
        <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/[0.02] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              2. Khối Quá Khứ (Past Contrast): So sánh đối chiếu
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">{pastWords} từ</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            <em>Gợi ý:</em> <code>However, when I was younger, ... / In the past, I used to ...</code>
          </p>
          <textarea
            rows={2}
            value={currentAns.past}
            onChange={(e) => onSetField(currentQ.id, "past", e.target.value)}
            placeholder="So sánh đối chiếu với thói quen hoặc trải nghiệm trong quá khứ..."
            className="w-full rounded-xl border border-border bg-card p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/30 font-serif leading-relaxed"
          />
        </div>

        {/* Block 3: Future */}
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.02] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              3. Khối Tương Lai (Future Speculation): Dự định & Kỳ vọng
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">{futureWords} từ</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            <em>Gợi ý:</em> <code>Looking ahead, I plan to ... / In the future, I aspire to ...</code>
          </p>
          <textarea
            rows={2}
            value={currentAns.future}
            onChange={(e) => onSetField(currentQ.id, "future", e.target.value)}
            placeholder="Mở rộng kế hoạch hoặc mong muốn trong tương lai..."
            className="w-full rounded-xl border border-border bg-card p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-serif leading-relaxed"
          />
        </div>
      </div>

      {/* Footer / Submit */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-xs font-mono font-bold text-foreground">
          Tổng dung lượng câu trả lời:{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{totalWords} từ</span>
          <span className="text-muted-foreground text-[11px] font-sans ml-1">
            {isComplete ? "✓ Đủ 3 mốc (Band 7.0+)" : "(Cần điền đủ 3 mốc thời gian)"}
          </span>
        </div>

        <button
          type="button"
          onClick={onSaveAll}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Lưu & Đồng bộ câu trả lời Part 1</span>
        </button>
      </div>
    </div>
  );
}
