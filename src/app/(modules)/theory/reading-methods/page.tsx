"use client";

import React, { useState } from "react";
import {
  MOCK_READING_METHODS,
  ReadingMethodLesson,
} from "@/data/mockReadingMethodsData";
import { MethodologyTabSwitcher } from "@/components/theory/methodology/MethodologyTabSwitcher";
import { ReadingTaxonomyCard } from "@/components/theory/methodology/ReadingTaxonomyCard";
import { ParaphraseMappingCheatSheet } from "@/components/theory/methodology/ParaphraseMappingCheatSheet";
import {
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
  Target,
  ArrowRightLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReadingMethodsCatalogPage() {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);

  const lessons = MOCK_READING_METHODS;

  const filteredLessons = lessons.filter((l) => {
    if (selectedCluster === "all") return true;
    return l.cluster === selectedCluster;
  });

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto select-none">
      {/* 1. Header with Tab Switcher */}
      <div className="flex flex-col gap-4 border-b border-border/80 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Module 1B • Phân Hệ Phương Pháp Luận 14 Dạng Bài Reading
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Giải Mã 14 Dạng Bài Reading & Kỹ Thuật Bắt Bẫy Cambridge
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Chiến thuật 3 bước: <strong>Bản chất dạng bài ➔ Vạch trần bẫy khảo thí ➔ Mổ xẻ câu hỏi mẫu Band 8.5+</strong>. Vượt qua Gateway Quiz (≥80%) để mở khóa bài tập thực hành.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 self-start sm:self-auto shadow-sm">
            <GraduationCap className="h-6 w-6" />
            <div>
              <span className="text-[10px] uppercase font-bold block leading-none">Giai Đoạn 2</span>
              <span className="text-xs font-black font-mono">Band 5.5 ➔ 6.5+</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <MethodologyTabSwitcher activeTab="reading" />
      </div>

      {/* 2. Educational Rule Callout Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-500/10 via-card to-indigo-500/10 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground">
              Phương Pháp Luận Cốt Lõi: Skimming (90s) ➔ Scanning Từ Khóa Cứng ➔ Paraphrase Mapping
            </h4>
            <span className="text-muted-foreground">
              Không dịch từng chữ word-by-word. Định vị vùng thông tin và đối soát ma trận ý nghĩa 3 chiều.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCheatSheet(!showCheatSheet)}
          className="px-4 py-2 rounded-xl bg-card border border-border hover:bg-secondary text-foreground font-bold flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
        >
          <ArrowRightLeft className="h-4 w-4 text-indigo-500" />
          <span>{showCheatSheet ? "Ẩn Cheat Sheet" : "5 Quy Luật Paraphrase"}</span>
        </button>
      </div>

      {/* Cheat Sheet Toggle Section */}
      {showCheatSheet && <ParaphraseMappingCheatSheet />}

      {/* 3. Cluster Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-2 text-xs">
        {[
          { id: "all", label: "Tất Cả Dạng Bài" },
          { id: "foundation", label: "🌟 Kỹ Năng Nền Tảng (Skimming & Scanning)" },
          { id: "fact_opinion", label: "Nhóm 1: Sự Thật & Lập Trường (TFNG/YNNG)" },
          { id: "matching_headings", label: "Nhóm 2: Nối Tiêu Đề & Thông Tin" },
          { id: "summary_completion", label: "Nhóm 3: Điền Từ & Tóm Tắt (Box/Flowchart)" },
          { id: "multiple_choice", label: "Nhóm 4: Trắc Nghiệm Multiple Choice" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCluster(tab.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              selectedCluster === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Reading Method Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLessons.map((lesson, idx) => (
          <ReadingTaxonomyCard key={lesson.id} lesson={lesson} index={idx} />
        ))}
      </div>
    </div>
  );
}
