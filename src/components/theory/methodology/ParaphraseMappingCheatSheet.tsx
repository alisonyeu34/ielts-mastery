"use client";

import React from "react";
import {
  Sparkles,
  BookOpen,
  ArrowRightLeft,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { TheoryBookmarkButton } from "@/components/theory/TheoryBookmarkButton";
import { cn } from "@/lib/utils";

interface ParaphraseMappingCheatSheetProps {
  className?: string;
}

export function ParaphraseMappingCheatSheet({
  className,
}: ParaphraseMappingCheatSheetProps) {
  const rules = [
    {
      number: 1,
      ruleNameVi: "Từ Đồng Nghĩa Trực Tiếp (Synonyms Replacement)",
      formula: "Word A ➔ Exact Synonym B",
      examplePassage: "The company experienced exponential expansion.",
      exampleQuestion: "The firm witnessed rapid growth.",
      notesVi: "Chiếm 45% tổng số câu hỏi Reading & Listening.",
    },
    {
      number: 2,
      ruleNameVi: "Biến Đổi Từ Loại (Word Family Shift)",
      formula: "Verb / Adj ➔ Noun Phrase",
      examplePassage: "Researchers attempted to domesticate wild equines.",
      exampleQuestion: "The domestication of horses accelerated transit.",
      notesVi: "Đặc biệt phổ biến trong dạng Summary Completion và Sentence Completion.",
    },
    {
      number: 3,
      ruleNameVi: "Chuyển Đổi Thể Chủ Động ⇄ Bị Động (Voice Transformation)",
      formula: "Active Clause ➔ Passive Clause",
      examplePassage: "Municipal authorities constructed subterranean drainage tunnels.",
      exampleQuestion: "Underground tunnels were built by the city council.",
      notesVi: "Thường đi kèm việc đổi chủ ngữ để đánh lạc hướng vị trí đọc.",
    },
    {
      number: 4,
      ruleNameVi: "Phủ Định Của Từ Trái Nghĩa (Negative + Antonym)",
      formula: "Not + Antonym ➔ Positive Equivalent",
      examplePassage: "Reversing climatic degradation is by no means impossible.",
      exampleQuestion: "Restoring the environment is entirely feasible.",
      notesVi: "'Not impossible' biến thành 'feasible / achievable'.",
    },
    {
      number: 5,
      ruleNameVi: "Mô Tả Chức Năng Thay Thuật Ngữ (Functional Definition)",
      formula: "Technical Term ➔ Descriptive Explanation",
      examplePassage: "A seismograph was deployed near the fault line.",
      exampleQuestion: "An apparatus designed to measure tectonic tremors...",
      notesVi: "Dùng để giải thích các thuật ngữ khoa học khó mà không cần dịch từ chuyên ngành.",
    },
  ];

  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-border/80 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm">
          <ArrowRightLeft className="h-6 w-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            CẨM NANG KHẢO THÍ ĐỘT PHÁ BAND 7.5+
          </span>
          <h2 className="text-lg sm:text-xl font-black text-foreground mt-0.5">
            5 Quy Luật Biến Đổi Paraphrase Kinh Điển Của Cambridge
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rules.map((r) => (
          <div
            key={r.number}
            className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-3 text-xs"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold">
                  {r.number}
                </span>
                <h4 className="font-extrabold text-foreground text-xs sm:text-sm">
                  {r.ruleNameVi}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-card border border-border text-indigo-600 dark:text-indigo-400">
                  {r.formula}
                </span>
                <TheorySpeakerButton
                  text={`Quy luật paraphrase ${r.number}: ${r.ruleNameVi}. Công thức: ${r.formula}. Ví dụ đề bài: ${r.examplePassage}. Paraphrase trong câu hỏi: ${r.exampleQuestion}. Lưu ý: ${r.notesVi}`}
                  title={`Nghe đọc quy luật ${r.number}`}
                  label="Đọc"
                  size="sm"
                />
                <TheoryBookmarkButton
                  item={{
                    id: `bm_paraphrase_rule_${r.number}`,
                    lessonId: "reading-methods-paraphrase",
                    lessonTitle: "5 Quy Luật Paraphrase Kinh Điển",
                    skill: "reading",
                    category: "rule",
                    categoryLabelVi: "Quy Luật Paraphrase",
                    title: `Quy luật ${r.number}: ${r.ruleNameVi}`,
                    content: `Công thức: ${r.formula}\nBài đọc/Audio: "${r.examplePassage}"\nĐề thi: "${r.exampleQuestion}"\nLưu ý: ${r.notesVi}`,
                    excerptText: r.examplePassage,
                    translationVi: r.exampleQuestion,
                    lessonHref: "/theory/reading-methods",
                  }}
                  label="Lưu quy tắc"
                  savedLabel="Đã lưu quy tắc ✓"
                  size="sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                  Câu trong Bài đọc / Audio:
                </span>
                <p className="font-serif font-bold text-foreground">
                  "{r.examplePassage}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-card border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                  Cách Paraphrase trong Đề thi:
                </span>
                <p className="font-serif font-bold text-foreground">
                  "{r.exampleQuestion}"
                </p>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground font-mono">
              💡 {r.notesVi}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
