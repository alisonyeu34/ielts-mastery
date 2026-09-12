"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TFNG_TRAPS = [
  {
    id: "qualifier",
    title: "1. Bẫy Lượng Từ Tuyệt Đối (Extreme Qualifiers)",
    color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    description:
      "Câu hỏi thêm các từ tuyệt đối như 'All', 'Every', 'Only', 'Entirely', 'Unique' trong khi bài đọc chỉ nói 'Some', 'Many', hoặc 'A majority'.",
    example: "Question: 'All marine plants require sunlight' vs Passage: 'Many coastal plants...'",
  },
  {
    id: "comparison",
    title: "2. Bẫy So Sánh Hơn Giả Định (Unwarranted Comparatives)",
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    description:
      "Câu hỏi so sánh 'A is more cost-effective than B' hoặc 'X is faster than Y'. Bài đọc nhắc đến cả A và B nhưng KHÔNG hề so sánh đối đầu giữa 2 đối tượng -> Bẫy kinh điển NOT GIVEN.",
    example: "Bài đọc nói A nhanh, B cũng tốt, nhưng không nói ai rẻ hơn -> NOT GIVEN.",
  },
  {
    id: "over_inference",
    title: "3. Bẫy Suy Diễn Kiến Thức Đời Thực (Over-inference Trap)",
    color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    description:
      "Thí sinh dùng kiến thức đời sống (common knowledge) để tự kết luận là TRUE dù bài đọc không hề đề cập đến chi tiết đó -> Bẫy NOT GIVEN.",
    example: "Ngoài đời chim cánh cụt sống ở Nam Cực, nhưng nếu bài đọc không nói -> Vẫn là NOT GIVEN.",
  },
  {
    id: "frequency",
    title: "4. Bẫy Tần Suất & Chắc Chắn (Frequency & Certainty Traps)",
    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
    description:
      "Thay đổi sắc thái tần suất: 'Always/Never' (Luôn luôn/Không bao giờ) vs 'Occasionally/Sometimes' (Thỉnh thoảng), hoặc 'Will definitely' vs 'May possibly'.",
    example: "Question: 'Monks always prayed at night' vs Passage: 'Monks occasionally gathered...'",
  },
];

export function TFNGTrapCallout({ className }: { className?: string }) {
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
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              5 Bẫy Khảo Thí Cambridge Hay Mắc Phải Nhất
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Cảnh báo bẫy lượng từ, so sánh giả định và suy diễn ngoài bài
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
            {TFNG_TRAPS.map((trap) => (
              <div
                key={trap.id}
                className="p-3 rounded-xl bg-secondary/30 border border-border/70 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-md border",
                      trap.color
                    )}
                  >
                    {trap.title}
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {trap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
