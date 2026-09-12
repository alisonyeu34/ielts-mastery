"use client";

import React, { useState } from "react";
import {
  MOCK_WRITING_BLUEPRINTS,
  WritingBlueprintLesson,
} from "@/data/mockWritingBlueprintsData";
import { BlueprintTabSwitcher } from "@/components/theory/blueprints/BlueprintTabSwitcher";
import { WritingTopicCard } from "@/components/theory/blueprints/WritingTopicCard";
import { BandDescriptorsQuickMatrix } from "@/components/theory/blueprints/BandDescriptorsQuickMatrix";
import {
  PenTool,
  Sparkles,
  Layers,
  GraduationCap,
  Target,
  Table,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function WritingBlueprintsCatalogPage() {
  const [selectedTaskFilter, setSelectedTaskFilter] = useState<"all" | "task1" | "task2">("all");
  const [showMatrixModal, setShowMatrixModal] = useState<boolean>(false);

  const lessons = MOCK_WRITING_BLUEPRINTS;

  const filteredLessons = lessons.filter((l) => {
    if (selectedTaskFilter === "all") return true;
    return l.taskType === selectedTaskFilter;
  });

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto select-none">
      {/* 1. Header with Global Tab Switcher */}
      <div className="flex flex-col gap-4 border-b border-border/80 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Module 1C • Phân Hệ Lý Thuyết & Chiến Lược Khảo Thí Writing Task 1 & 2
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Chiến Lược Khảo Thí & Phác Đồ Lập Luận Writing Chuẩn Cambridge
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Giải mã 4 tiêu chí chấm thi (TA/TR, CC, LR, GRA) • Tránh bẫy lạc đề & liệt kê ý rời rạc • Mổ xẻ bài mẫu Band 8.5+ với hệ thống gán nhãn token trực quan • Vượt qua Gateway Quiz (≥80%) để mở khóa phòng thực hành AI.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 self-start sm:self-auto shadow-sm">
            <GraduationCap className="h-6 w-6" />
            <div>
              <span className="text-[10px] uppercase font-bold block leading-none">Giai Đoạn 2</span>
              <span className="text-xs font-black font-mono">Band 5.5 ➔ 7.5+</span>
            </div>
          </div>
        </div>

        {/* Global 5-Branch Theory Switcher */}
        <BlueprintTabSwitcher activeTab="writing" />
      </div>

      {/* 2. Educational Banner & Cambridge Band Matrix CTA */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-card to-orange-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white font-bold shadow-md shadow-amber-500/30">
            <PenTool className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground">
              Quy Trình 3 Bước: Bản Chất Tiêu Chí ➔ Vạch Trần Bẫy Khảo Thí ➔ Mổ Xẻ Bài Mẫu Band 8.5+
            </h4>
            <span className="text-muted-foreground">
              Học lý thuyết trước ➔ Luyện dạng bài ➔ Mới làm đề thi thử: Đảm bảo độ chắc chắn trong từng câu viết.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowMatrixModal(true)}
          className="px-4 py-2.5 rounded-xl bg-card border border-border hover:bg-secondary text-foreground font-bold flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto shadow-sm transition-all"
        >
          <Table className="h-4 w-4 text-amber-500" />
          <span>Bảng Đối Chiếu Band Descriptors</span>
        </button>
      </div>

      {/* 3. Task Type Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-2 text-xs">
        {[
          { id: "all", label: "Tất Cả Chuyên Đề Writing", count: lessons.length },
          {
            id: "task1",
            label: "Writing Task 1 (Báo Cáo Số Liệu, Quy Trình & Bản Đồ)",
            count: lessons.filter((l) => l.taskType === "task1").length,
          },
          {
            id: "task2",
            label: "Writing Task 2 (Nghị Luận Xã Hội & Học Thuật)",
            count: lessons.filter((l) => l.taskType === "task2").length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTaskFilter(tab.id as "all" | "task1" | "task2")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer",
              selectedTaskFilter === tab.id
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-xs"
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
          <WritingTopicCard key={lesson.id} lesson={lesson} index={idx} />
        ))}
      </div>

      {/* 5. Cambridge Band Descriptors Matrix Modal */}
      <BandDescriptorsQuickMatrix
        skill="writing"
        isOpen={showMatrixModal}
        onClose={() => setShowMatrixModal(false)}
      />
    </div>
  );
}
