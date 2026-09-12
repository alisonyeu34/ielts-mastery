"use client";

import React, { useState } from "react";
import { X, BookmarkPlus, Sparkles, BookOpen, Plus } from "lucide-react";
import { VocabCategory } from "@/types/database";

interface VocabHarvestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onHarvest: (data: {
    term: string;
    ipa: string;
    meaning: string;
    collocations: string[];
    contextSentence: string;
    sourceModule: string;
    category?: VocabCategory;
  }) => void;
}

export function VocabHarvestDrawer({
  isOpen,
  onClose,
  onHarvest,
}: VocabHarvestDrawerProps) {
  const [term, setTerm] = useState<string>("");
  const [ipa, setIpa] = useState<string>("");
  const [meaning, setMeaning] = useState<string>("");
  const [collocationsText, setCollocationsText] = useState<string>("");
  const [contextSentence, setContextSentence] = useState<string>("");
  const [sourceModule, setSourceModule] = useState<string>("reading");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !meaning.trim()) return;

    const collocations = collocationsText
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    onHarvest({
      term: term.trim(),
      ipa: ipa.trim() || "/.../",
      meaning: meaning.trim(),
      collocations: collocations.length > 0 ? collocations : [term.trim()],
      contextSentence: contextSentence.trim() || `Example with ${term.trim()}.`,
      sourceModule,
      category: "c1_academic",
    });

    // Reset & close
    setTerm("");
    setIpa("");
    setMeaning("");
    setCollocationsText("");
    setContextSentence("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md h-full bg-card border-l border-border p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        {/* Top Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3.5">
            <div className="flex items-center gap-2">
              <BookmarkPlus className="h-5 w-5 text-primary" />
              <h3 className="text-base font-black text-foreground">
                Thu Hoạch Từ Vựng Mới
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            Lưu từ vựng học được từ bài đọc/nghe kèm câu văn ngữ cảnh gốc để thuật toán FSRS tự động lên lịch ôn tập ngắt quãng (1d, 3d, 7d, 14d, 30d).
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Từ Vựng Gốc (Term) *</label>
              <input
                type="text"
                required
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="VD: mitigate, detrimental, inevitable..."
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Phiên Âm IPA (Tùy chọn)</label>
              <input
                type="text"
                value={ipa}
                onChange={(e) => setIpa(e.target.value)}
                placeholder="VD: /ˈmɪt.ɪ.ɡeɪt/"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Nghĩa Tiếng Việt Học Thuật *</label>
              <input
                type="text"
                required
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="VD: Làm giảm nhẹ mức độ nghiêm trọng..."
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Collocations Đi Kèm (Cách nhau bằng dấu phẩy)</label>
              <input
                type="text"
                value={collocationsText}
                onChange={(e) => setCollocationsText(e.target.value)}
                placeholder="VD: mitigate the risk, mitigate climate change"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Câu Văn Ngữ Cảnh Gốc (Context Sentence)</label>
              <textarea
                rows={3}
                value={contextSentence}
                onChange={(e) => setContextSentence(e.target.value)}
                placeholder="VD: Sustainable urban planning can mitigate the adverse effects of global warming."
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground font-serif focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Nguồn Thu Hoạch</label>
              <select
                value={sourceModule}
                onChange={(e) => setSourceModule(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value="reading">Reading Split-view</option>
                <option value="listening">Listening Split-view</option>
                <option value="writing">Writing Clinic</option>
                <option value="speaking">Speaking Practice</option>
                <option value="custom">Tự thêm thủ công</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm mt-4"
            >
              Nạp Vào Ma Trận FSRS
            </button>
          </form>
        </div>

        <div className="text-[11px] text-muted-foreground pt-4 border-t border-border text-center">
          Thẻ sẽ được gán chu kỳ ban đầu S=1.5 ngày và sẵn sàng ôn tập.
        </div>
      </div>
    </div>
  );
}
