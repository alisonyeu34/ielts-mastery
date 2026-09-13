"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  ShieldAlert,
  GraduationCap,
  Award,
  Zap,
} from "lucide-react";
import { db } from "@/lib/db";
import {
  MOCK_GRAMMAR_THEORY_LESSONS,
  CoreGrammarTheoryLesson,
} from "@/data/mockGrammarTheoryData";
import { GrammarSyllabusCard } from "@/components/theory/GrammarSyllabusCard";
import { MethodologyTabSwitcher } from "@/components/theory/methodology/MethodologyTabSwitcher";
import { cn } from "@/lib/utils";

export default function TheoryCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const practiceLogs = useLiveQuery(async () => {
    try {
      return await db.practice_logs.toArray();
    } catch {
      return [];
    }
  }, []);

  const lessons = MOCK_GRAMMAR_THEORY_LESSONS;

  const phase1PillarIds = [
    "day1-present-simple-to-be",
    "day2-present-simple-verbs",
    "day3-present-continuous",
    "day4-past-simple-to-be",
    "day5-past-simple-verbs",
    "day6-present-perfect",
    "day7-past-vs-present-perfect",
    "day8-passive-voice",
    "day9-comparatives",
    "day10-advanced-comparisons",
    "day11-relative-clauses-who-which",
    "day12-relative-clauses-where-when-whose",
    "day13-first-conditional",
    "day14-second-conditional",
  ];

  const filteredLessons = lessons.filter((l) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "phase1_pillars") {
      return phase1PillarIds.includes(l.id);
    }
    if (selectedCategory === "phase2_advanced") {
      return !phase1PillarIds.includes(l.id);
    }
    if (selectedCategory === "tenses") {
      return (
        l.category === "tenses" ||
        l.category === "present_simple" ||
        l.category === "past_simple" ||
        l.category === "present_perfect"
      );
    }
    return l.category === selectedCategory;
  });

  const phase1Count = lessons.filter((l) => phase1PillarIds.includes(l.id)).length;
  const phase2Count = lessons.filter((l) => !phase1PillarIds.includes(l.id)).length;

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto select-none">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-extrabold text-red-700 dark:text-red-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Học Ngữ Pháp & Kỹ Năng Làm Bài
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Các Bài Học Ngữ Pháp Cốt Lõi Cho IELTS
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Học theo lộ trình: <strong>Hiểu bản chất ➔ Tránh bẫy hay gặp ➔ Phân tích câu mẫu Band cao</strong>. Làm bài tập nhanh cuối mỗi bài để củng cố kiến thức trước khi sang phần luyện đề.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 self-start sm:self-auto shadow-sm">
          <GraduationCap className="h-6 w-6" />
          <div>
            <span className="text-[10px] uppercase font-bold block leading-none">Toàn Bộ Lộ Trình</span>
            <span className="text-xs font-black font-mono">Band 4.5 ➔ 7.5+</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <MethodologyTabSwitcher activeTab="grammar" />

      {/* 2. Educational Rule Callout Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-red-950/20 via-card to-rose-950/20 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-700 text-white font-bold shadow-md shadow-red-700/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground">
              Nguyên Tắc Bất Di Bất Dịch: Học Lý Thuyết Trước ➔ Luyện Dạng Bài ➔ Mới Giải Đề
            </h4>
            <span className="text-muted-foreground">
              Khi ở Band 4.5 - 5.5, bắt buộc xây vững <strong>14 Ngày Cứu Ngữ Pháp Cấp Tốc (14/9 - 27/9)</strong> trước khi giải đề Cam và học từ vựng C1/C2.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold text-muted-foreground">
          <span>{lessons.length} Chủ điểm ngữ pháp</span>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-3 text-xs">
        {[
          { id: "all", label: `Tất Cả Bài Học (${lessons.length})` },
          { id: "phase1_pillars", label: `⭐ 14 Ngày Cứu Ngữ Pháp (${phase1Count})` },
          { id: "phase2_advanced", label: `🚀 Chuyên Đề Nâng Band (${phase2Count})` },
          { id: "tenses", label: "Các Thì Động Từ" },
          { id: "passive_voice", label: "Câu Bị Động" },
          { id: "comparisons", label: "So Sánh" },
          { id: "relative_clauses", label: "Mệnh Đề Quan Hệ" },
          { id: "conditionals", label: "Câu Điều Kiện" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              selectedCategory === tab.id
                ? "bg-red-700 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Syllabus Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLessons.map((lesson, idx) => (
          <GrammarSyllabusCard
            key={lesson.id}
            lesson={lesson}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
