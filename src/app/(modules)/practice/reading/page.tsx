"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ArrowLeft,
  Sparkles,
  Zap,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { MOCK_READING_PASSAGE } from "@/data/mockReadingPassage";
import { SplitViewContainer } from "@/components/practice/split-view/SplitViewContainer";

export default function ReadingSplitViewPage() {
  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">
            <Zap className="h-4 w-4" /> Module 2 • Không Gian Luyện Tập 2 Cột (Split-view)
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
            Luyện Đọc Hiểu 2 Cột (Split-view Reading Engine)
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Bôi đen văn bản để Highlight màu sắc, Tra từ điển tức thì và Lưu thẳng vào Sổ Từ Vựng FSRS.
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về phòng Luyện tập
        </Link>
      </div>

      {/* Split View Interactive Container */}
      <SplitViewContainer passage={MOCK_READING_PASSAGE} />
    </div>
  );
}
