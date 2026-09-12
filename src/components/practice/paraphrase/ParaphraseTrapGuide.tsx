"use client";

import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Layers,
  Award,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TRAP_MECHANICS = [
  {
    id: "synonym",
    title: "1. Thay Thế Từ Đồng Nghĩa (Synonym Substitution)",
    tag: "Cơ bản -> Nâng cao",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    description:
      "Thay thế từ đơn lẻ bằng các từ vựng học thuật C1/C2 có nét nghĩa tương đương nhưng văn phong trang trọng hơn.",
    example: {
      question: "a dramatic decrease in costs",
      passage: "expenses plummeted sharply",
      note: "'Plummet' (lao dốc) = 'decrease dramatically', 'expenses' = 'costs'.",
    },
  },
  {
    id: "word_class",
    title: "2. Biến Đổi Dạng Từ (Word Class Transition)",
    tag: "Bẫy Phổ Biến Nhất",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    description:
      "Biến đổi Danh từ thành Động từ/Tính từ (hoặc ngược lại). Giám khảo dùng bẫy này để thử thách khả năng quét cấu trúc câu thay vì chỉ tìm mặt chữ.",
    example: {
      question: "The rapid industrial expansion was beneficial.",
      passage: "As regional industries expanded rapidly, the economy grew.",
      note: "Cụm danh từ 'industrial expansion' biến thành cụm động từ 'industries expanded'.",
    },
  },
  {
    id: "negation_of_antonym",
    title: "3. Phủ Định Của Từ Trái Nghĩa (Negation of Antonym)",
    tag: "Bẫy True / False / Not Given",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    description:
      "Dùng cấu trúc phủ định kết hợp với từ trái nghĩa để tạo ra nghĩa khẳng định (hoặc ngược lại).",
    example: {
      question: "This phenomenon is frequently observed in tropical zones.",
      passage: "It is not uncommon for such events to transpire in the tropics.",
      note: "'Not uncommon' (không hiếm gặp) = 'frequently observed' (thường xuyên quan sát thấy).",
    },
  },
  {
    id: "conceptual_restatement",
    title: "4. Diễn Giải Khái Niệm (Conceptual Restatement)",
    tag: "Band 7.0 -> 8.5+",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    description:
      "Thay vì dùng từ tương đương, tác giả giải thích trọn vẹn định nghĩa khoa học của khái niệm trong câu hỏi.",
    example: {
      question: "The project aimed to safeguard marine biodiversity.",
      passage: "Efforts were concentrated on preserving the wide variety of animal and plant species inhabiting oceans.",
      note: "'Marine biodiversity' được diễn giải thành 'the wide variety of animal and plant species inhabiting oceans'.",
    },
  },
];

export function ParaphraseTrapGuide({ className }: { className?: string }) {
  const [expandedId, setExpandedId] = useState<string | null>("synonym");

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-7 space-y-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Kỹ Thuật Đọc Hiểu Chuyên Sâu
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-foreground">
            4 Cơ Chế Bẫy Paraphrase Kinh Điển Của Giám Khảo Cambridge
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Hiểu rõ cách người ra đề biến đổi từ vựng giúp bạn quét bài đọc với tốc độ gấp 3 lần.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {TRAP_MECHANICS.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border/80 bg-secondary/20 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-secondary/40"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                      item.color
                    )}
                  >
                    {item.tag}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-foreground">
                    {item.title}
                  </h4>
                </div>

                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="p-4 pt-1 space-y-3 border-t border-border/60 text-xs bg-card/60 leading-relaxed animate-in fade-in duration-150">
                  <p className="text-muted-foreground">{item.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-secondary/40 border border-border/60 space-y-1">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">
                        ❓ Trong câu hỏi (Question):
                      </span>
                      <p className="font-medium text-foreground italic">
                        "{item.example.question}"
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                      <span className="font-bold text-purple-600 dark:text-purple-400 block text-[11px]">
                        📖 Trong bài đọc (Passage):
                      </span>
                      <p className="font-medium text-foreground italic">
                        "{item.example.passage}"
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-[11px] text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>
                      <strong>Mổ xẻ bản chất:</strong> {item.example.note}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
