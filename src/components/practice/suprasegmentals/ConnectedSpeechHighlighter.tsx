"use client";

import React from "react";
import {
  Volume2,
  Sparkles,
  Layers,
  Eye,
  EyeOff,
  BookOpen,
} from "lucide-react";
import { ConnectedSpeechSentenceItem } from "@/data/mockSuprasegmentalData";
import { playNativeAudio } from "@/lib/phoneticAcousticAnalyzer";

interface ConnectedSpeechHighlighterProps {
  items: ConnectedSpeechSentenceItem[];
  selectedItem: ConnectedSpeechSentenceItem;
  onSelectItem: (item: ConnectedSpeechSentenceItem) => void;
  showLinkingMarks: boolean;
  onToggleLinkingMarks: () => void;
}

export function ConnectedSpeechHighlighter({
  items,
  selectedItem,
  onSelectItem,
  showLinkingMarks,
  onToggleLinkingMarks,
}: ConnectedSpeechHighlighterProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
            {selectedItem.topic}
          </span>
          <h3 className="text-base font-black text-foreground">
            Phòng Thực Hành Biến Âm & Nối Âm (Connected Speech)
          </h3>
        </div>

        {/* Toggle Show/Hide Marks */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLinkingMarks}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showLinkingMarks
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-secondary border-border text-muted-foreground"
            }`}
          >
            {showLinkingMarks ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span>{showLinkingMarks ? "Đang Hiện Ký Hiệu Nối Âm" : "Ẩn Ký Hiệu (Tự Nhận Diện)"}</span>
          </button>
        </div>
      </div>

      {/* Sentence Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectItem(item)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedItem.id === item.id
                ? "bg-primary text-primary-foreground font-black shadow-xs scale-102"
                : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/80"
            }`}
          >
            {item.plainText.slice(0, 24)}...
          </button>
        ))}
      </div>

      {/* Sentence Display Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-secondary/30 border border-border text-center space-y-4">
        {/* Main Sentence */}
        <h4 className="text-lg sm:text-2xl font-serif font-black text-foreground leading-relaxed tracking-wide">
          {showLinkingMarks ? selectedItem.annotatedText : selectedItem.plainText}
        </h4>

        {/* Connected IPA */}
        <p className="font-mono text-xs sm:text-sm font-bold text-primary">
          {selectedItem.ipaConnected}
        </p>

        {/* Audio Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => playNativeAudio(selectedItem.plainText)}
            className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs inline-flex items-center gap-2 shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <Volume2 className="h-4 w-4" />
            <span>Nghe Phát Âm Nối Chuẩn Bản Xứ</span>
          </button>
        </div>
      </div>

      {/* Linking Points Breakdown List */}
      <div className="space-y-3 pt-1">
        <span className="text-xs font-bold text-foreground">
          Chi Tiết Các Điểm Nối & Biến Âm Trong Câu:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedItem.linkingPoints.map((lp, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-card border border-border space-y-1 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded-md bg-primary/10 text-primary font-mono font-black text-[11px]">
                    {lp.symbol}
                  </span>
                  <span>{lp.label}</span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  {lp.type}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {lp.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
