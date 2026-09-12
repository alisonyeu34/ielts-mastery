"use client";

import React, { useState } from "react";
import {
  Volume2,
  BookmarkPlus,
  CheckCircle2,
  X,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface ContextualWordInfo {
  word: string;
  ipa: string;
  pos: string;
  contextualMeaningVi: string;
  cambridgeParaphrasePair: string;
  cambridgeExplanation: string;
  exampleContext: string;
}

const READING_CONTEXT_DICTIONARY: Record<string, ContextualWordInfo> = {
  biomimetic: {
    word: "biomimetic",
    ipa: "/ˌbaɪ.oʊ.mɪˈmet̬.ɪk/",
    pos: "adjective",
    contextualMeaningVi: "Mô phỏng sinh học (bắt chước cơ chế tự nhiên của sinh vật để ứng dụng vào kỹ thuật)",
    cambridgeParaphrasePair: "biological imitation ↔ nature-inspired engineering",
    cambridgeExplanation: "Đề thi Cambridge thường bẫy thí sinh bằng cách thay từ 'biomimetic' bằng cụm 'copying animals / nature'.",
    exampleContext: "Biomimetic architectural designs drastically reduce energy consumption.",
  },
  biomimicry: {
    word: "biomimicry",
    ipa: "/ˌbaɪ.oʊˈmɪm.ɪ.kri/",
    pos: "noun",
    contextualMeaningVi: "Ngành khoa học mô phỏng sinh học",
    cambridgeParaphrasePair: "emulating nature ↔ bio-inspired innovation",
    cambridgeExplanation: "Paraphrase phổ biến: 'emulating natural processes'.",
    exampleContext: "Biomimicry is transforming contemporary engineering.",
  },
  aerodynamic: {
    word: "aerodynamic",
    ipa: "/ˌer.oʊ.daɪˈnæm.ɪk/",
    pos: "adjective",
    contextualMeaningVi: "Khí động học (giúp giảm lực cản không khí)",
    cambridgeParaphrasePair: "streamlined ↔ reducing drag / air resistance",
    cambridgeExplanation: "Câu hỏi Reading thường hỏi về cách giảm sức gió (drag), trong bài dùng 'aerodynamic'.",
    exampleContext: "The Kingfisher-inspired train has an aerodynamic nose.",
  },
  alleviate: {
    word: "alleviate",
    ipa: "/əˈliː.vi.eɪt/",
    pos: "verb",
    contextualMeaningVi: "Làm giảm bớt, xoa dịu (áp lực, ô nhiễm, đau đớn)",
    cambridgeParaphrasePair: "mitigate ↔ ease ↔ reduce ↔ lessen",
    cambridgeExplanation: "Cặp paraphrase kinh điển Cambridge C1: alleviate ↔ mitigate.",
    exampleContext: "Passive cooling alleviates the need for artificial air conditioning.",
  },
  mitigate: {
    word: "mitigate",
    ipa: "/ˈmɪt.ɪ.ɡeɪt/",
    pos: "verb",
    contextualMeaningVi: "Giảm thiểu tác hại, xoa dịu rủi ro",
    cambridgeParaphrasePair: "alleviate ↔ curtail ↔ minimize",
    cambridgeExplanation: "Xuất hiện với tần suất cực cao trong Passage 2 & 3.",
    exampleContext: "Proper insulation mitigates carbon emissions.",
  },
  imperative: {
    word: "imperative",
    ipa: "/ɪmˈper.ə.t̬ɪv/",
    pos: "adjective / noun",
    contextualMeaningVi: "Cấp bách, mang tính bắt buộc sống còn",
    cambridgeParaphrasePair: "vital ↔ essential ↔ of paramount importance",
    cambridgeExplanation: "Thay thế cho 'very important' trong các bài luận và đọc hiểu C1.",
    exampleContext: "Transitioning to green energy is an absolute imperative.",
  },
  unprecedented: {
    word: "unprecedented",
    ipa: "/ʌnˈpres.ə.den.t̬ɪd/",
    pos: "adjective",
    contextualMeaningVi: "Chưa từng có tiền lệ, chưa bao giờ xảy ra trước đây",
    cambridgeParaphrasePair: "never seen before ↔ unparalleled",
    cambridgeExplanation: "Dùng để nhấn mạnh quy mô lịch sử của sự kiện.",
    exampleContext: "The region is witnessing unprecedented temperatures.",
  },
  disparity: {
    word: "disparity",
    ipa: "/dɪˈsper.ə.t̬i/",
    pos: "noun",
    contextualMeaningVi: "Sự chênh lệch lớn, bất bình đẳng rõ rệt",
    cambridgeParaphrasePair: "inequality ↔ divergence ↔ imbalance",
    cambridgeExplanation: "Từ C1 then chốt trong chủ đề xã hội và kinh tế.",
    exampleContext: "Economic disparity between urban and rural sectors remains high.",
  },
};

interface ContextualWordPopoverProps {
  selectedText: string;
  paragraphId: string;
  position: { top: number; left: number };
  onClose: () => void;
  className?: string;
}

export function ContextualWordPopover({
  selectedText,
  paragraphId,
  position,
  onClose,
  className,
}: ContextualWordPopoverProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const cleanWord = selectedText.trim().toLowerCase().replace(/[^a-zA-Z]/g, "");

  // Lookup in context dictionary or generate intelligent context
  const wordData: ContextualWordInfo = READING_CONTEXT_DICTIONARY[cleanWord] || {
    word: selectedText.trim(),
    ipa: `/${cleanWord}/`,
    pos: "academic vocabulary",
    contextualMeaningVi: `Thuật ngữ học thuật trong đoạn văn ${paragraphId}`,
    cambridgeParaphrasePair: `${selectedText.trim()} ↔ academic equivalent`,
    cambridgeExplanation: "Từ vựng trọng tâm trong cấu trúc câu của bài đọc IELTS.",
    exampleContext: `Trích đoạn văn ${paragraphId}: "...${selectedText.trim()}..."`,
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(wordData.word);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSaveToFSRS = async () => {
    try {
      await db.vocab_matrix.put({
        id: `vocab_rd_${Date.now()}_${cleanWord.substring(0, 8)}`,
        word: wordData.word,
        ipa: wordData.ipa,
        meaning: wordData.contextualMeaningVi,
        collocations: [wordData.cambridgeParaphrasePair],
        originalContext: wordData.exampleContext,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        nextReviewDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      setIsSaved(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (e) {
      console.warn("Save vocab error:", e);
    }
  };

  return (
    <div
      style={{
        top: `${Math.max(10, position.top - 180)}px`,
        left: `${Math.max(10, Math.min(window.innerWidth - 340, position.left - 80))}px`,
      }}
      className={cn(
        "absolute z-50 w-80 rounded-2xl border border-red-500/40 bg-card p-4 shadow-2xl backdrop-blur-md space-y-3 animate-in zoom-in-95 duration-150 select-none text-foreground",
        className
      )}
    >
      {/* Word Header */}
      <div className="flex items-start justify-between gap-2 border-b border-border/70 pb-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black text-foreground">
              {wordData.word}
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground italic">
              {wordData.pos}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-red-700 dark:text-red-400 font-bold">
              {wordData.ipa}
            </span>
            <button
              type="button"
              onClick={handleSpeak}
              disabled={isPlayingAudio}
              className="p-1 rounded-md hover:bg-secondary text-primary transition-colors cursor-pointer"
              title="Phát âm từ này"
            >
              <Volume2 className={cn("h-3.5 w-3.5", isPlayingAudio && "animate-pulse text-red-600")} />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Contextual Meaning */}
      <div className="space-y-1 text-xs">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block">
          Nghĩa chuẩn ngữ cảnh:
        </span>
        <p className="font-semibold text-foreground leading-snug">
          {wordData.contextualMeaningVi}
        </p>
      </div>

      {/* Cambridge Paraphrase Box */}
      <div className="p-2.5 rounded-xl bg-red-500/[0.06] border border-red-500/25 space-y-1 text-xs">
        <div className="flex items-center gap-1 text-[10px] font-black uppercase text-red-700 dark:text-red-400">
          <Sparkles className="h-3 w-3" />
          <span>Cặp Từ Đồng Nghĩa Bẫy Cambridge:</span>
        </div>
        <div className="font-mono text-[11px] font-bold text-foreground">
          {wordData.cambridgeParaphrasePair}
        </div>
        <p className="text-[10px] text-muted-foreground leading-tight">
          {wordData.cambridgeExplanation}
        </p>
      </div>

      {/* 1-Click Save to Vocab Button */}
      <button
        type="button"
        onClick={handleSaveToFSRS}
        disabled={isSaved}
        className={cn(
          "w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs",
          isSaved
            ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/40"
            : "bg-red-700 hover:bg-red-800 text-white shadow-red-700/20"
        )}
      >
        {isSaved ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Đã lưu vào Sổ Từ Vựng FSRS!</span>
          </>
        ) : (
          <>
            <BookmarkPlus className="h-3.5 w-3.5" />
            <span>+ Lưu vào Sổ Từ Vựng (FSRS)</span>
          </>
        )}
      </button>
    </div>
  );
}
