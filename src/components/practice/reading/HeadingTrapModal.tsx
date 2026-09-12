"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const HEADING_TRAP_TYPES = [
  {
    id: "word_match",
    title: "1. Bẫy Trùng Khớp Mặt Chữ (Word-Match Trap)",
    tag: "Bẫy Phổ Biến Nhất",
    color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    description:
      "Tiêu đề chứa y hệt các từ vựng xuất hiện trong đoạn văn (ví dụ: 'Satellite thermal imagery'). Tuy nhiên, đây chỉ là một ví dụ phụ hoặc công cụ hỗ trợ ở 1 câu, KHÔNG PHẢI ý tưởng chủ đạo (Main Idea) của toàn đoạn.",
    solution: "Không chọn tiêu đề chỉ vì nó chứa từ vựng giống trong bài. Hãy tự hỏi: 'Toàn bộ đoạn văn này đang chứng minh điều gì?'",
  },
  {
    id: "too_narrow",
    title: "2. Bẫy Phạm Vi Quá Hẹp (Too Narrow Trap)",
    tag: "Bẫy Chi Tiết Phụ",
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    description:
      "Tiêu đề chỉ tóm tắt đúng một câu đơn lẻ hoặc một khía cạnh hẹp (ví dụ: chỉ nhắc đến 'asphalt pavements' trong khi đoạn nói về tất cả vật liệu xây dựng bê tông, kính, thép).",
    solution: "Kiểm tra xem các câu còn lại trong đoạn có nằm dưới phạm trù của tiêu đề đó không.",
  },
  {
    id: "too_broad",
    title: "3. Bẫy Phạm Vi Quá Rộng (Too Broad Trap)",
    tag: "Bẫy Khái Quát Hóa",
    color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    description:
      "Tiêu đề mang ý niệm vĩ mô vượt quá nội dung đoạn (ví dụ: 'Global climate change across the world' trong khi đoạn văn chỉ thảo luận về vi khí hậu đô thị).",
    solution: "Cảnh giác với các tiêu đề chứa từ ngữ vĩ mô như 'Global', 'Worldwide', 'Universal' khi đoạn văn chỉ mang tính cục bộ.",
  },
  {
    id: "distractor",
    title: "4. Bẫy 'Bẻ Lái' Câu Cuối (Distractor / Twist Trap)",
    tag: "Bẫy Câu Chốt Ý",
    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
    description:
      "Đoạn văn mở đầu bằng việc thảo luận một quan điểm cũ, nhưng ở câu cuối dùng liên từ chuyển hướng (*However, Ultimately, Consequently*) để đưa ra kết luận hoàn toàn khác.",
    solution: "Luôn đọc kỹ câu kết đoạn / câu chốt ý trước khi đưa ra quyết định ghép tiêu đề.",
  },
];

export function HeadingTrapModal({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              4 Bẫy Khảo Thí Matching Headings Của Cambridge
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Mổ xẻ bẫy trùng mặt chữ, bẫy quá hẹp và bẫy quá rộng
            </p>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 space-y-3 border-t border-border/70 text-xs animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HEADING_TRAP_TYPES.map((trap) => (
              <div
                key={trap.id}
                className="p-3.5 rounded-xl bg-secondary/30 border border-border/70 space-y-1.5"
              >
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-md border",
                    trap.color
                  )}
                >
                  {trap.title}
                </span>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {trap.description}
                </p>
                <div className="pt-1 border-t border-border/50 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  💡 <strong>Cách xử lý:</strong> {trap.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
