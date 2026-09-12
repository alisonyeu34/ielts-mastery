"use client";

import React, { useState } from "react";
import {
  MOCK_LISTENING_METHODS,
  ListeningSectionBlueprintLesson,
} from "@/data/mockListeningMethodsData";
import { MethodologyTabSwitcher } from "@/components/theory/methodology/MethodologyTabSwitcher";
import { ListeningSectionCard } from "@/components/theory/methodology/ListeningSectionCard";
import {
  Headphones,
  Sparkles,
  Layers,
  GraduationCap,
  Volume2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ListeningMethodsCatalogPage() {
  const [selectedSection, setSelectedSection] = useState<string>("all");

  const lessons = MOCK_LISTENING_METHODS;

  const filteredLessons = lessons.filter((l) => {
    if (selectedSection === "all") return true;
    return l.sectionNumber.toString() === selectedSection;
  });

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto select-none">
      {/* 1. Header with Tab Switcher */}
      <div className="flex flex-col gap-4 border-b border-border/80 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Module 1B • Phân Hệ Chiến Lược Bắt Bẫy 4 Section Listening
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Chiến Lược Khảo Thí & Bắt Bẫy 4 Section Listening Chuẩn Cambridge
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Giải mã 4 Section: <strong>Bẫy tự sửa thông tin Section 1 ➔ Bản đồ sơ đồ Section 2 ➔ Đồng thuận giả Section 3 ➔ Bài giảng học thuật mật độ cao Section 4</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 self-start sm:self-auto shadow-sm">
            <GraduationCap className="h-6 w-6" />
            <div>
              <span className="text-[10px] uppercase font-bold block leading-none">Giai Đoạn 2</span>
              <span className="text-xs font-black font-mono">Band 5.5 ➔ 6.5+</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <MethodologyTabSwitcher activeTab="listening" />
      </div>

      {/* 2. Educational Rule Callout Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-card to-purple-500/10 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30">
            <Headphones className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground">
              Nguyên Tắc Bất Di Bất Dịch: Tận Dụng 30-60 Giây Đọc Đề Để Dự Đoán Từ Loại & Bắt Signposts
            </h4>
            <span className="text-muted-foreground">
              Trong lúc nghe, chỉ có 1 lần phát duy nhất. Luôn nhìn trước 2 câu hỏi tiếp theo để không bao giờ bị mất dấu (Lost in Audio).
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold text-muted-foreground">
          <span>4 Section Blueprints</span>
        </div>
      </div>

      {/* 3. Section Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-2 text-xs">
        {[
          { id: "all", label: "Tất Cả 4 Section" },
          { id: "1", label: "Section 1: Giao Dịch & Bẫy Tự Sửa" },
          { id: "2", label: "Section 2: Bản Đồ & Không Gian" },
          { id: "3", label: "Section 3: Hội Thoại Đa Chủ Thể" },
          { id: "4", label: "Section 4: Bài Giảng Độc Thoại" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedSection(tab.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              selectedSection === tab.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Listening Section Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLessons.map((lesson, idx) => (
          <ListeningSectionCard key={lesson.id} lesson={lesson} index={idx} />
        ))}
      </div>
    </div>
  );
}
