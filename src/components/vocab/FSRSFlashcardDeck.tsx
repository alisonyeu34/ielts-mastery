"use client";

import React from "react";
import { Volume2, Sparkles, BookOpen, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { VocabCard } from "@/types/database";
import { cn } from "@/lib/utils";

interface FSRSFlashcardDeckProps {
  card: VocabCard;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onSpeak: (word: string) => void;
}

export function FSRSFlashcardDeck({
  card,
  isFlipped,
  onToggleFlip,
  onSpeak,
}: FSRSFlashcardDeckProps) {
  const maskedContext = React.useMemo(() => {
    if (!card.originalContext || !card.word) return "";
    try {
      const parts = card.originalContext.split(new RegExp('\\b' + card.word + '\\b', 'i'));
      return parts.join('[ _____ ]');
    } catch {
      return card.originalContext;
    }
  }, [card.originalContext, card.word]);

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      <div
        onClick={onToggleFlip}
        className={cn(
          "relative min-h-[340px] sm:min-h-[380px] w-full rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-lg transition-all duration-500 cursor-pointer select-none flex flex-col justify-between group",
          isFlipped ? "bg-card/95 border-primary/40" : "hover:border-primary/30 hover:shadow-xl"
        )}
      >
        {/* Top Card Badge */}
        <div className="flex items-center justify-between border-b border-border/70 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase tracking-wider">
              {card.category === "awl_570" ? "570 Academic Word List" : "C1 Academic Vocabulary"}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground">
              Interval: {card.stepInterval}d
            </span>
          </div>

          <div className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
            <span>{isFlipped ? "Mặt Sau (Chi Tiết)" : "Nhấn Space / Click để lật thẻ"}</span>
          </div>
        </div>

        {/* Card Body */}
        {!isFlipped ? (
          <div className="space-y-6 py-6 text-center my-auto">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Câu Văn Ngữ Cảnh Khuyết Từ:
              </span>
              <p className="font-serif text-lg sm:text-xl text-foreground leading-relaxed px-2">
                {maskedContext ? ('"' + maskedContext + '"') : ('[ _____ ]: ' + card.meaning)}
              </p>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="text-sm font-mono text-primary font-semibold">
                {card.ipa}
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                Gợi ý nghĩa: <strong className="text-foreground">{card.meaning}</strong>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5 py-4 my-auto animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-foreground font-serif tracking-tight">
                    {card.word}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(card.word);
                    }}
                    className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors cursor-pointer"
                    title="Phát âm thanh chuẩn RP British"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs font-mono text-primary block">{card.ipa}</span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  Độ Ổn Định: S={card.stability || 2.4}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-left">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Định Nghĩa Học Thuật:
              </span>
              <p className="text-sm font-bold text-foreground">
                {card.meaning}
              </p>
              {card.definitionEn && (
                <p className="text-xs text-muted-foreground italic">
                  {card.definitionEn}
                </p>
              )}
            </div>

            {card.collocations && card.collocations.length > 0 && (
              <div className="space-y-1.5 text-left">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  Cụm Collocations Đi Kèm:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {card.collocations.map((colloc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-secondary border border-border text-xs font-medium text-foreground"
                    >
                      {colloc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border text-xs text-left space-y-1">
              <span className="font-bold text-foreground block">Ngữ cảnh gốc:</span>
              <p className="font-serif text-xs sm:text-sm text-foreground leading-relaxed">
                "{card.originalContext}"
              </p>
            </div>
          </div>
        )}

        <div className="text-center pt-3 border-t border-border/60 text-[11px] text-muted-foreground">
          {!isFlipped ? (
            <span>💡 Hãy tự hồi tưởng nghĩa và phát âm trong đầu trước khi lật mặt sau</span>
          ) : (
            <span>Đánh giá mức độ nhớ của bạn ở 4 nút phản xạ bên dưới 👇</span>
          )}
        </div>
      </div>
    </div>
  );
}
