"use client";

import React from "react";
import {
  BookOpen,
  X,
  Sparkles,
  Volume2,
  CheckCircle2,
  Ear,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectedSpeechGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const PHENOMENA_GUIDE = [
  {
    title: "1. Nối Âm Phụ Âm Sang Nguyên Âm (Consonant-to-Vowel Linking)",
    badge: "Linking",
    color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
    mechanism: "Khi một từ kết thúc bằng phụ âm và từ tiếp theo bắt đầu bằng nguyên âm, phụ âm cuối sẽ tự động nhảy sang làm phụ âm đầu của từ sau.",
    example: "Hold on -> [hol-don] • Fill in an -> [fɪ-lɪ-nən]",
    acousticTip: "Không có khoảng dừng giữa 2 từ. Hãy nghe chuỗi âm thanh như một từ dài.",
  },
  {
    title: "2. Nuốt Âm /t/ và /d/ (Elision)",
    badge: "Elision",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    mechanism: "Âm /t/ hoặc /d/ ở vị trí cuối từ sẽ bị nuốt hoàn toàn khi từ tiếp theo bắt đầu bằng một phụ âm khác.",
    example: "Last night -> /lɑːs naɪt/ • You must go -> /juː mʌs ɡəʊ/",
    acousticTip: "Đừng chờ nghe âm bật /t/ rõ ràng, hãy suy luận từ vựng dựa trên ngữ cảnh câu.",
  },
  {
    title: "3. Đồng Hóa Âm (Assimilation)",
    badge: "Assimilation",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    mechanism: "Hai âm đứng cạnh nhau bị ảnh hưởng lẫn nhau và biến đổi thành một âm hoàn toàn mới (đặc biệt là /t, d/ + /j/ -> /tʃ, dʒ/).",
    example: "Did you -> /dɪdʒuː/ • Don't you -> /dəʊntʃuː/",
    acousticTip: "Cực kỳ phổ biến trong các đoạn hội thoại IELTS Section 1 và Part 1 Speaking.",
  },
  {
    title: "4. Dạng Yếu & Âm Schwa (Weak Forms of Function Words)",
    badge: "Weak Forms",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    mechanism: "Các từ chức năng (to, of, at, was, can, have) khi không mang trọng âm sẽ bị rút ngắn thành âm schwa /ə/.",
    example: "was at the -> /wəz ət ðə/ • cup of tea -> /kʌp əv tiː/",
    acousticTip: "Tập trung tai nghe vào các Content Words (Danh từ, Động từ chính), lướt nhanh các Weak forms.",
  },
  {
    title: "5. Âm Flap /t/ Trong Giọng Bắc Mỹ & Úc",
    badge: "Flap T",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    mechanism: "Âm /t/ đứng giữa 2 nguyên âm phát âm nhanh thành âm vỗ nhẹ /ɾ/ giống như âm /d/.",
    example: "water bottle -> [wɔːɾər bɒtl] • better -> [beɾər]",
    acousticTip: "Xuất hiện thường xuyên khi người nói trong bài thi IELTS mang quốc tịch Úc hoặc Mỹ.",
  },
];

export function ConnectedSpeechGuideModal({
  isOpen,
  onClose,
  className,
}: ConnectedSpeechGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl bg-card border-l border-border h-full shadow-2xl overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Ear className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-foreground">
                  Cẩm Nang Biến Đổi Âm Connected Speech
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Bí quyết triệt tiêu "điếc âm vị" và bắt trọn chuỗi âm thanh IELTS
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Guide List */}
          <div className="space-y-4 text-xs">
            {PHENOMENA_GUIDE.map((p, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-foreground text-xs sm:text-sm">
                    {p.title}
                  </h4>
                  <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border", p.color)}>
                    {p.badge}
                  </span>
                </div>

                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {p.mechanism}
                </p>

                <div className="p-2.5 rounded-xl bg-card border border-border text-[11px] font-mono text-foreground font-semibold">
                  Ví dụ: {p.example}
                </div>

                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-serif italic">
                  💡 <strong>Kinh nghiệm nghe thi:</strong> {p.acousticTip}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            Đã Hiểu • Tiếp Tục Luyện Chép Chính Tả
          </button>
        </div>
      </div>
    </div>
  );
}
