"use client";

import React, { useState } from "react";
import {
  Eye,
  Ear,
  Wind,
  Coffee,
  Heart,
  HelpCircle,
  X,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function FiveSensesGuideModal({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const SENSES = [
    {
      icon: Eye,
      title: "1. Thị Giác (Sight)",
      color: "text-blue-500 bg-blue-500/10",
      description: "Miêu tả màu sắc, ánh sáng, chuyển động và bức tranh thị giác bao quát.",
      example: "Dazzling laser lights, ocean of glowing wristbands, dense murky smog.",
    },
    {
      icon: Ear,
      title: "2. Thính Giác (Sound)",
      color: "text-purple-500 bg-purple-500/10",
      description: "Tái hiện âm thanh nền, tiếng nhạc, tiếng người nói hoặc sự tĩnh lặng.",
      example: "Thumping acoustic bass, 50,000 voices chanting, incessant vehicle horns.",
    },
    {
      icon: Wind,
      title: "3. Khứu Giác (Smell)",
      color: "text-emerald-500 bg-emerald-500/10",
      description: "Gợi mở không khí, hương thơm hoặc mùi vị đặc trưng của không gian.",
      example: "Crisp outdoor evening air, freshly popped corn, pungent exhaust fumes.",
    },
    {
      icon: Coffee,
      title: "4. Vị Giác (Taste)",
      color: "text-amber-500 bg-amber-500/10",
      description: "Thức ăn, nước uống đi kèm hoặc vị giác đọng lại trong trải nghiệm.",
      example: "Refreshing chilled lemon iced tea, gritty metallic sensation in the mouth.",
    },
    {
      icon: Heart,
      title: "5. Xúc Giác & Cảm Xúc (Touch / Emotion)",
      color: "text-rose-500 bg-rose-500/10",
      description: "Cảm giác cơ thể (nổi da gà, rung chấn) và cao trào cảm xúc tâm lý.",
      example: "Instant goosebumps, surge of collective euphoria, profound rejuvenation.",
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
        <span>Bí quyết Mô hình 5 Giác Quan</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h3 className="text-base font-extrabold text-foreground">
                  Mô Hình 5 Giác Quan (5 Senses Technique)
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Trong 60 giây chuẩn bị, thay vì cố gắng viết cả câu văn, hãy ghi nhanh 1-2 từ khóa cho mỗi giác quan. Khi nói, bạn chỉ cần phóng tác từng giác quan theo thứ tự để bài nói đạt đúng 2 phút một cách tự nhiên và giàu hình ảnh sinh động.
            </p>

            {/* Senses Cards */}
            <div className="space-y-3">
              {SENSES.map((sense, idx) => {
                const IconComponent = sense.icon;

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-secondary/30 border border-border/70 space-y-1 text-xs"
                  >
                    <div className="flex items-center gap-2 font-bold text-foreground">
                      <div className={cn("p-1.5 rounded-lg", sense.color)}>
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
                      <span>{sense.title}</span>
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      {sense.description}
                    </p>
                    <p className="text-[11px] text-foreground/80 font-serif italic pt-0.5">
                      <em>Ví dụ:</em> "{sense.example}"
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Đã hiểu & Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
