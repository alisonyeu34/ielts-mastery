"use client";

import React, { useState } from "react";
import {
  MOCK_SPEAKING_BLUEPRINTS,
  SpeakingBlueprintLesson,
} from "@/data/mockSpeakingBlueprintsData";
import { BlueprintTabSwitcher } from "@/components/theory/blueprints/BlueprintTabSwitcher";
import { SpeakingTopicCard } from "@/components/theory/blueprints/SpeakingTopicCard";
import { BandDescriptorsQuickMatrix } from "@/components/theory/blueprints/BandDescriptorsQuickMatrix";
import {
  Mic,
  Sparkles,
  GraduationCap,
  Table,
  Volume2,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SpeakingBlueprintsCatalogPage() {
  const [selectedPartFilter, setSelectedPartFilter] = useState<"all" | "1" | "2" | "3">("all");
  const [showMatrixModal, setShowMatrixModal] = useState<boolean>(false);

  const lessons = MOCK_SPEAKING_BLUEPRINTS;

  const filteredLessons = lessons.filter((l) => {
    if (selectedPartFilter === "all") return true;
    return l.partNumber.toString() === selectedPartFilter;
  });

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto select-none">
      {/* 1. Header with Global Tab Switcher */}
      <div className="flex flex-col gap-4 border-b border-border/80 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Module 1D • Phân Hệ Lý Thuyết & Chiến Lược Khảo Thí Speaking 3 Parts
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Khung Chiến Lược Khảo Thí & Phản Xạ Nói IELTS 3 Part Chuẩn Cambridge
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Làm chủ 4 tiêu chí Fluency, Lexical, Grammar, Pronunciation • Khung mở rộng thời gian Part 1 • Lưới 5 giác quan & Memory Palace Part 2 • 6 Lăng kính xã hội & Academic Hedging Part 3 • Mẫu đối âm Audio Contrast Band 5.5 vs 8.5+.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 self-start sm:self-auto shadow-sm">
            <GraduationCap className="h-6 w-6" />
            <div>
              <span className="text-[10px] uppercase font-bold block leading-none">Giai Đoạn 2</span>
              <span className="text-xs font-black font-mono">Band 5.5 ➔ 7.5+</span>
            </div>
          </div>
        </div>

        {/* Global 5-Branch Theory Switcher */}
        <BlueprintTabSwitcher activeTab="speaking" />
      </div>

      {/* 2. Educational Banner & Cambridge Band Matrix CTA */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-500/10 via-card to-blue-500/10 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-white font-bold shadow-md shadow-sky-500/30">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground">
              Phản Xạ 3 Bước: Khung Tư Duy Chiến Lược ➔ Vạch Trần Bẫy & Luyện Audio Contrast ➔ Mổ Xẻ Transcript Band 8.5+
            </h4>
            <span className="text-muted-foreground">
              Học phương pháp luận ➔ Luyện tập phòng Speaking AI ➔ Thi thử CD-IELTS: Nói mạch lạc, không ậm ừ, ngữ điệu tự nhiên.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowMatrixModal(true)}
          className="px-4 py-2.5 rounded-xl bg-card border border-border hover:bg-secondary text-foreground font-bold flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto shadow-sm transition-all"
        >
          <Table className="h-4 w-4 text-sky-500" />
          <span>Bảng Đối Chiếu Band Descriptors</span>
        </button>
      </div>

      {/* 3. Speaking Part Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-2 text-xs">
        {[
          { id: "all", label: "Tất Cả Chuyên Đề Speaking", count: lessons.length },
          {
            id: "1",
            label: "Part 1 (Mở Rộng Thời Gian Quá Khứ - Hiện Tại - Tương Lai)",
            count: lessons.filter((l) => l.partNumber === 1).length,
          },
          {
            id: "2",
            label: "Part 2 (Lưới Giác Quan & Lâu Đài Trí Nhớ 2 Phút)",
            count: lessons.filter((l) => l.partNumber === 2).length,
          },
          {
            id: "3",
            label: "Part 3 (6 Lăng Kính Xã Hội & Academic Hedging)",
            count: lessons.filter((l) => l.partNumber === 3).length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedPartFilter(tab.id as "all" | "1" | "2" | "3")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer",
              selectedPartFilter === tab.id
                ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 shadow-xs"
                : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
            )}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-secondary text-muted-foreground font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 4. Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson, idx) => (
          <SpeakingTopicCard key={lesson.id} lesson={lesson} index={idx} />
        ))}
      </div>

      {/* 5. Cambridge Band Descriptors Matrix Modal */}
      <BandDescriptorsQuickMatrix
        skill="speaking"
        isOpen={showMatrixModal}
        onClose={() => setShowMatrixModal(false)}
      />
    </div>
  );
}
