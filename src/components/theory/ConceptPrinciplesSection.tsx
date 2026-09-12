"use client";

import React, { useState } from "react";
import {
  CoreGrammarTheoryLesson,
} from "@/data/mockGrammarTheoryData";
import {
  Lightbulb,
  CheckCircle2,
  Code2,
  BookOpen,
  Sparkles,
  ArrowRight,
  Table as TableIcon,
  Volume2,
  AlertCircle,
  Layers,
  Zap,
  Split,
  BookMarked,
  Scale,
  Compass,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { TheoryBookmarkButton } from "@/components/theory/TheoryBookmarkButton";
import { TheoryItemRecallBox } from "@/components/theory/TheoryItemRecallBox";
import { TheoryMaskableContent } from "@/components/theory/TheoryMaskableContent";
import { ActiveRecallCheckWidget } from "@/components/theory/ActiveRecallCheckWidget";
import { StudentJargonClarifier } from "@/components/theory/StudentJargonClarifier";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";
import { cn } from "@/lib/utils";

interface ConceptPrinciplesSectionProps {
  lesson: CoreGrammarTheoryLesson;
  onProceedToStep2: () => void;
  className?: string;
}

type TabType = "all" | "usages" | "conjugation" | "rules" | "comparison" | "examples";

export function ConceptPrinciplesSection({
  lesson,
  onProceedToStep2,
  className,
}: ConceptPrinciplesSectionProps) {
  const { step1Concept } = lesson;
  const { isSaved, toggleBookmark } = useTheoryBookmarks();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const hasUsages = Boolean(step1Concept.detailedUsages && step1Concept.detailedUsages.length > 0);
  const hasConjugation = Boolean(
    (step1Concept.conjugationTableBe && step1Concept.conjugationTableBe.length > 0) ||
    (step1Concept.conjugationTableAction && step1Concept.conjugationTableAction.length > 0)
  );
  const hasRules = Boolean(
    (step1Concept.spellingRules && step1Concept.spellingRules.length > 0) ||
    (step1Concept.pronunciationGuides && step1Concept.pronunciationGuides.length > 0)
  );
  const hasComparison = Boolean(
    step1Concept.stativeVerbsGuide ||
    step1Concept.frequencyAdverbsGuide ||
    step1Concept.tenseComparison
  );

  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-8 select-none",
        className
      )}
    >
      {/* Header with Navigation and View Mode */}
      <div className="space-y-4 border-b border-border/80 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold shadow-sm shrink-0">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  BƯỚC 1 / 3 • GIÁO TRÌNH LÝ THUYẾT TOÀN DIỆN
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                  Mục tiêu {lesson.targetBand}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground mt-1">
                {lesson.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <BookMarked className="h-3.5 w-3.5" />
            <span>Toàn Bộ Bài Giảng</span>
          </button>

          {hasUsages && (
            <button
              type="button"
              onClick={() => setActiveTab("usages")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
                activeTab === "usages"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Cách Dùng & IELTS ({step1Concept.detailedUsages?.length})</span>
            </button>
          )}

          {hasConjugation && (
            <button
              type="button"
              onClick={() => setActiveTab("conjugation")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
                activeTab === "conjugation"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Bảng Chia Động Từ</span>
            </button>
          )}

          {hasRules && (
            <button
              type="button"
              onClick={() => setActiveTab("rules")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
                activeTab === "rules"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>Chính Tả & Phát Âm IPA</span>
            </button>
          )}

          {hasComparison && (
            <button
              type="button"
              onClick={() => setActiveTab("comparison")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
                activeTab === "comparison"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Dấu Hiệu & So Sánh</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab("examples")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
              activeTab === "examples"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Ví Dụ Bóc Tách ({step1Concept.foundationalExamples.length})</span>
          </button>
        </div>
      </div>

      {/* Student Jargon Clarifier */}
      <StudentJargonClarifier currentSkill="grammar" />

      {/* ========================================================================= */}
      {/* 1. CORE PRINCIPLES & MECHANISM (First-Principles) */}
      {/* ========================================================================= */}
      {(activeTab === "all" || activeTab === "usages") && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>I. Bản Chất Ngôn Ngữ & 3 Nguyên Tắc Cốt Lõi:</span>
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              {step1Concept.corePrinciplesVi.map((principle, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-secondary/30 border border-border/80 flex flex-col justify-between space-y-2 text-xs leading-relaxed"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-foreground text-[11px] uppercase tracking-wide">
                        Nguyên Tắc #{idx + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <TheorySpeakerButton
                        text={`Nguyên tắc ${idx + 1}: ${principle}`}
                        title={`Nghe đọc nguyên tắc #${idx + 1}`}
                        size="icon-only"
                      />
                      <TheoryBookmarkButton
                        item={{
                          id: `bm_grammar_${lesson.id}_principle_${idx}`,
                          lessonId: lesson.id,
                          lessonTitle: lesson.title,
                          skill: "grammar",
                          category: "rule",
                          categoryLabelVi: "Nguyên Tắc Cốt Lõi",
                          title: `${lesson.title} • Nguyên Tắc #${idx + 1}`,
                          content: principle,
                          lessonHref: `/theory/${lesson.id}`,
                        }}
                        label="Lưu quy tắc"
                        savedLabel="Đã lưu ✓"
                        size="sm"
                      />
                    </div>
                  </div>
                  <TheoryMaskableContent
                    itemId={`recall_grammar_${lesson.id}_principle_${idx}`}
                    itemTitle={`Nguyên Tắc #${idx + 1}`}
                  >
                    <p className="text-foreground/90 font-medium text-xs leading-relaxed">
                      {principle}
                    </p>
                  </TheoryMaskableContent>
                  <TheoryItemRecallBox
                    itemId={`recall_grammar_${lesson.id}_principle_${idx}`}
                    itemTitle={`Nguyên Tắc #${idx + 1}`}
                    targetText={principle}
                    lessonTitle={lesson.title}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Why the Rule Exists (Mechanism Analysis) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20 space-y-2 text-xs">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-extrabold text-blue-700 dark:text-blue-300 font-mono text-[10px] uppercase flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Tại Sao Quy Tắc Này Tồn Tại Trong Khảo Thí Cambridge?</span>
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <TheorySpeakerButton
                  text={step1Concept.mechanismAnalysisVi}
                  title="Nghe đọc phân tích bản chất khảo thí"
                  label="Nghe đọc"
                  size="sm"
                />
                <TheoryBookmarkButton
                  item={{
                    id: `bm_grammar_${lesson.id}_cambridge_mechanism`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "grammar",
                    category: "rule",
                    categoryLabelVi: "Bản Chất Khảo Thí",
                    title: `${lesson.title} • Khảo Thí Cambridge`,
                    content: step1Concept.mechanismAnalysisVi,
                    lessonHref: `/theory/${lesson.id}`,
                  }}
                  label="Lưu quy tắc"
                  savedLabel="Đã lưu quy tắc ✓"
                  size="sm"
                />
              </div>
            </div>
            <TheoryMaskableContent
              itemId={`recall_grammar_${lesson.id}_cambridge_mechanism`}
              itemTitle="Bản Chất Khảo Thí Cambridge"
            >
              <p className="text-foreground/90 leading-relaxed font-medium text-xs sm:text-sm">
                {step1Concept.mechanismAnalysisVi}
              </p>
            </TheoryMaskableContent>
            <TheoryItemRecallBox
              itemId={`recall_grammar_${lesson.id}_cambridge_mechanism`}
              itemTitle="Bản Chất Khảo Thí Cambridge"
              targetText={step1Concept.mechanismAnalysisVi}
              lessonTitle={lesson.title}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FORMULA BOX & CONJUGATION TABLES */}
      {/* ========================================================================= */}
      {(activeTab === "all" || activeTab === "conjugation") && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
              <Code2 className="h-4 w-4 text-blue-500" />
              <span>II. Khung Cấu Trúc Tổng Quát & Bảng Chia Động Từ Mọi Ngôi:</span>
            </h3>

            {/* Formula Summary Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-blue-400" />
                  <span>KHUNG CÔNG THỨC CHUẨN:</span>
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <TheorySpeakerButton
                    text={`Khung công thức: ${step1Concept.formulaSummary}`}
                    title="Nghe đọc công thức"
                    label="Đọc"
                    size="sm"
                  />
                  <TheoryBookmarkButton
                    item={{
                      id: `bm_grammar_${lesson.id}_formula_summary`,
                      lessonId: lesson.id,
                      lessonTitle: lesson.title,
                      skill: "grammar",
                      category: "rule",
                      categoryLabelVi: "Khung Công Thức",
                      title: `${lesson.title} • Công Thức Chuẩn`,
                      content: step1Concept.formulaSummary,
                      lessonHref: `/theory/${lesson.id}`,
                    }}
                    label="Lưu công thức"
                    savedLabel="Đã lưu công thức ✓"
                    size="sm"
                  />
                </div>
              </div>
              <TheoryMaskableContent
                itemId={`recall_grammar_${lesson.id}_formula_summary`}
                itemTitle="Khung Công Thức Chuẩn"
              >
                <pre className="text-xs font-mono font-bold text-blue-300 leading-relaxed whitespace-pre-wrap">
                  {step1Concept.formulaSummary}
                </pre>
              </TheoryMaskableContent>
              <TheoryItemRecallBox
                itemId={`recall_grammar_${lesson.id}_formula_summary`}
                itemTitle="Khung Công Thức Chuẩn"
                targetText={step1Concept.formulaSummary}
                lessonTitle={lesson.title}
              />
            </div>
          </div>

          {/* Conjugation Tables if present */}
          {step1Concept.conjugationTableBe && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-foreground font-mono flex items-center gap-2">
                <TableIcon className="h-3.5 w-3.5 text-indigo-500" />
                <span>Bảng Chia Động Từ To Be (Am / Is / Are hoặc Was / Were):</span>
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-secondary/60 border-b border-border text-[11px] font-mono text-muted-foreground font-bold">
                      <th className="p-3">Nhóm Ngôi / Chủ Ngữ</th>
                      <th className="p-3 text-emerald-600 dark:text-emerald-400">Khẳng Định (+)</th>
                      <th className="p-3 text-rose-600 dark:text-rose-400">Phủ Định (-)</th>
                      <th className="p-3 text-amber-600 dark:text-amber-400">Nghi Vấn (?)</th>
                      <th className="p-3 text-blue-600 dark:text-blue-400">Trả Lời Ngắn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {step1Concept.conjugationTableBe.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-3 font-mono font-bold text-foreground">{row.subjectGroup}</td>
                        <td className="p-3 font-mono text-foreground/90">{row.affirmative}</td>
                        <td className="p-3 font-mono text-foreground/90">{row.negative}</td>
                        <td className="p-3 font-mono text-foreground/90">{row.interrogative}</td>
                        <td className="p-3 font-mono text-muted-foreground text-[11px]">{row.shortAnswer || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step1Concept.conjugationTableAction && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-foreground font-mono flex items-center gap-2">
                <TableIcon className="h-3.5 w-3.5 text-blue-500" />
                <span>Bảng Chia Động Từ Thường (Action Verbs / Main Verbs):</span>
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-secondary/60 border-b border-border text-[11px] font-mono text-muted-foreground font-bold">
                      <th className="p-3">Nhóm Ngôi / Chủ Ngữ</th>
                      <th className="p-3 text-emerald-600 dark:text-emerald-400">Khẳng Định (+)</th>
                      <th className="p-3 text-rose-600 dark:text-rose-400">Phủ Định (-)</th>
                      <th className="p-3 text-amber-600 dark:text-amber-400">Nghi Vấn (?)</th>
                      <th className="p-3 text-blue-600 dark:text-blue-400">Trả Lời Ngắn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {step1Concept.conjugationTableAction.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-3 font-mono font-bold text-foreground">{row.subjectGroup}</td>
                        <td className="p-3 font-mono text-foreground/90">{row.affirmative}</td>
                        <td className="p-3 font-mono text-foreground/90">{row.negative}</td>
                        <td className="p-3 font-mono text-foreground/90">{row.interrogative}</td>
                        <td className="p-3 font-mono text-muted-foreground text-[11px]">{row.shortAnswer || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DETAILED USAGE SCENARIOS WITH IELTS APPLICATIONS */}
      {/* ========================================================================= */}
      {(activeTab === "all" || activeTab === "usages") && step1Concept.detailedUsages && (
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
            <Compass className="h-4 w-4 text-blue-500" />
            <span>III. Các Trường Hợp Sử Dụng Chi Tiết & Ứng Dụng IELTS:</span>
          </h3>

          <div className="space-y-4">
            {step1Concept.detailedUsages.map((usage, uIdx) => (
              <div
                key={uIdx}
                className="p-5 rounded-2xl bg-secondary/25 border border-border space-y-3 text-xs"
              >
                {/* Title & Badge & Bookmark Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-extrabold text-sm text-foreground flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px]">
                        {uIdx + 1}
                      </span>
                      <span>{usage.scenarioTitle}</span>
                    </h4>
                    {usage.badgeIelts && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 w-fit">
                        {usage.badgeIelts}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <TheorySpeakerButton
                      text={`${usage.scenarioTitle}. ${usage.explanationVi}. Ứng dụng thi IELTS: ${usage.ieltsApplicationVi}`}
                      title={`Nghe đọc trường hợp ${uIdx + 1}`}
                      label="Đọc"
                      size="sm"
                    />

                    <TheoryBookmarkButton
                      item={{
                        id: `bm_grammar_${lesson.id}_usage_${uIdx}`,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "grammar",
                        category: "rule",
                        categoryLabelVi: "Quy Tắc Ngữ Pháp",
                        title: `${lesson.title} • ${usage.scenarioTitle}`,
                        content: `${usage.explanationVi}\nỨng dụng IELTS: ${usage.ieltsApplicationVi}`,
                        lessonHref: `/theory/${lesson.id}`,
                      }}
                      label="Lưu quy tắc"
                      savedLabel="Đã lưu quy tắc ✓"
                      size="sm"
                    />
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-foreground/90 leading-relaxed font-medium text-xs">
                  {usage.explanationVi}
                </p>

                {/* Signal Clues */}
                {usage.signalClues && usage.signalClues.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap text-[11px]">
                    <span className="font-bold text-muted-foreground font-mono text-[10px] uppercase">
                      Dấu hiệu nhận biết:
                    </span>
                    {usage.signalClues.map((clue, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded-md bg-secondary border border-border text-foreground font-mono text-[10px]"
                      >
                        {clue}
                      </span>
                    ))}
                  </div>
                )}

                {/* IELTS Application */}
                <div className="p-3 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                  💡 <strong>Ứng dụng IELTS:</strong> {usage.ieltsApplicationVi}
                </div>

                {/* Examples */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">
                    Ví dụ phân tích:
                  </span>
                  <div className="grid gap-2">
                    {usage.examples.map((eg, egIdx) => (
                      <div
                        key={egIdx}
                        className="p-3 rounded-xl bg-card border border-border/80 space-y-1 text-xs"
                      >
                        <p className="font-serif font-bold text-foreground text-xs sm:text-sm">
                          "{eg.en}"
                        </p>
                        <p className="text-muted-foreground text-[11px] italic">➔ {eg.vi}</p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium pt-1 border-t border-border/60">
                          ⚙️ <strong>Phân tích:</strong> {eg.analysis}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <TheoryItemRecallBox
                  itemId={`recall_grammar_${lesson.id}_usage_${uIdx}`}
                  itemTitle={`Trường Hợp: ${usage.scenarioTitle}`}
                  targetText={`${usage.explanationVi} Ứng dụng IELTS: ${usage.ieltsApplicationVi}`}
                  lessonTitle={lesson.title}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SPELLING RULES & PRONUNCIATION GUIDES */}
      {/* ========================================================================= */}
      {(activeTab === "all" || activeTab === "rules") && (step1Concept.spellingRules || step1Concept.pronunciationGuides) && (
        <div className="space-y-6">
          <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-blue-500" />
            <span>IV. Quy Tắc Chính Tả & Phát Âm IPA Chuẩn Quốc Tế:</span>
          </h3>

          {/* Spelling Rules Table */}
          {step1Concept.spellingRules && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground font-mono flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
                <span>Bảng Quy Tắc Biến Đổi Chính Tả (Spelling Rules):</span>
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                {step1Concept.spellingRules.map((rule, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-border/70 pb-1.5 flex-wrap gap-2">
                      <span className="font-extrabold text-foreground font-mono text-[11px]">
                        {rule.ruleNameVi}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                          {rule.transformationVi}
                        </span>
                        <TheoryBookmarkButton
                          item={{
                            id: `bm_grammar_${lesson.id}_spelling_${rIdx}`,
                            lessonId: lesson.id,
                            lessonTitle: lesson.title,
                            skill: "grammar",
                            category: "rule",
                            categoryLabelVi: "Quy Tắc Chính Tả",
                            title: `${lesson.title} • ${rule.ruleNameVi}`,
                            content: `Điều kiện: ${rule.conditionVi}\nBiến đổi: ${rule.transformationVi}\nVí dụ: ${rule.examples.join(", ")}${rule.memoryTrickVi ? "\nMẹo nhớ: " + rule.memoryTrickVi : ""}`,
                            lessonHref: `/theory/${lesson.id}`,
                          }}
                          label="Lưu quy tắc"
                          savedLabel="Đã lưu ✓"
                          size="sm"
                        />
                      </div>
                    </div>

                    <TheoryMaskableContent
                      itemId={`recall_grammar_${lesson.id}_spelling_${rIdx}`}
                      itemTitle={`Quy Tắc: ${rule.ruleNameVi}`}
                    >
                      <p className="text-muted-foreground text-xs">
                        <strong>Điều kiện:</strong> {rule.conditionVi}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {rule.examples.map((ex, exIdx) => (
                          <span
                            key={exIdx}
                            className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground font-mono text-[10px]"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>

                      {rule.memoryTrickVi && (
                        <div className="p-2 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 font-medium mt-1">
                          ✨ <strong>Mẹo nhớ:</strong> {rule.memoryTrickVi}
                        </div>
                      )}
                    </TheoryMaskableContent>

                    <TheoryItemRecallBox
                      itemId={`recall_grammar_${lesson.id}_spelling_${rIdx}`}
                      itemTitle={`Quy Tắc: ${rule.ruleNameVi}`}
                      targetText={`Điều kiện: ${rule.conditionVi}. Biến đổi: ${rule.transformationVi}. Ví dụ: ${rule.examples.join(", ")}`}
                      lessonTitle={lesson.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pronunciation Guides */}
          {step1Concept.pronunciationGuides && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground font-mono flex items-center gap-2">
                <Volume2 className="h-3.5 w-3.5 text-blue-500" />
                <span>Quy Tắc Phát Âm Chuẩn IPA & Câu Thần Chú Ghi Nhớ:</span>
              </h4>

              <div className="grid gap-4 sm:grid-cols-3">
                {step1Concept.pronunciationGuides.map((guide, gIdx) => (
                  <div
                    key={gIdx}
                    className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between space-y-3 text-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-border/80 pb-2 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black font-mono text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md bg-blue-500/10">
                            {guide.soundIpa}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground font-bold">
                            {guide.ruleDescriptionVi}
                          </span>
                        </div>
                        <TheoryBookmarkButton
                          item={{
                            id: `bm_grammar_${lesson.id}_pronunciation_${gIdx}`,
                            lessonId: lesson.id,
                            lessonTitle: lesson.title,
                            skill: "grammar",
                            category: "rule",
                            categoryLabelVi: "Quy Tắc Phát Âm IPA",
                            title: `${lesson.title} • Phát Âm ${guide.soundIpa}`,
                            content: `${guide.ruleDescriptionVi}\nĐiều kiện: ${guide.phoneticConditionVi}\nThần chú: "${guide.memoryMnemonicVi}"`,
                            lessonHref: `/theory/${lesson.id}`,
                          }}
                          label="Lưu quy tắc"
                          savedLabel="Đã lưu ✓"
                          size="sm"
                        />
                      </div>

                      <p className="text-foreground/90 text-[11px] leading-relaxed">
                        {guide.phoneticConditionVi}
                      </p>

                      {/* Words list */}
                      <div className="space-y-1 pt-1">
                        {guide.examples.map((item, wIdx) => (
                          <div
                            key={wIdx}
                            className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-secondary/40 font-mono"
                          >
                            <span className="font-bold text-foreground">{item.word}</span>
                            <span className="text-blue-600 dark:text-blue-400 font-serif">{item.ipa}</span>
                            <span className="text-muted-foreground text-[10px] italic">{item.meaningVi}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mnemonic callout */}
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-[11px] text-amber-800 dark:text-amber-200 font-medium">
                      🎯 <strong>Thần chú:</strong> "{guide.memoryMnemonicVi}"
                    </div>

                    <TheoryItemRecallBox
                      itemId={`recall_grammar_${lesson.id}_pronunciation_${gIdx}`}
                      itemTitle={`Phát Âm IPA ${guide.soundIpa}`}
                      targetText={`${guide.ruleDescriptionVi}. Điều kiện: ${guide.phoneticConditionVi}. Thần chú: ${guide.memoryMnemonicVi}`}
                      lessonTitle={lesson.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. STATIVE VERBS / FREQUENCY ADVERBS / TENSE COMPARISONS */}
      {/* ========================================================================= */}
      {(activeTab === "all" || activeTab === "comparison") && (
        <div className="space-y-6">
          {/* Stative Verbs Section */}
          {step1Concept.stativeVerbsGuide && (
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>V. Động Từ Trạng Thái (Stative Verbs) & Cặp Từ Đa Nghĩa:</span>
              </h3>

              <div className="p-4 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 text-xs text-foreground/90 leading-relaxed font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">{step1Concept.stativeVerbsGuide.overviewVi}</div>
                <TheoryBookmarkButton
                  item={{
                    id: `bm_grammar_${lesson.id}_stative_overview`,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    skill: "grammar",
                    category: "rule",
                    categoryLabelVi: "Động Từ Trạng Thái",
                    title: `${lesson.title} • Quy Tắc Stative Verbs`,
                    content: step1Concept.stativeVerbsGuide.overviewVi,
                    lessonHref: `/theory/${lesson.id}`,
                  }}
                  label="Lưu quy tắc"
                  savedLabel="Đã lưu ✓"
                  size="sm"
                />
              </div>

              {/* Categories */}
              <div className="grid gap-3 sm:grid-cols-2">
                {step1Concept.stativeVerbsGuide.categories.map((cat, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-border/70 pb-1.5">
                      <span className="font-extrabold text-foreground font-mono text-[11px]">
                        {cat.categoryName}
                      </span>
                      <TheoryBookmarkButton
                        item={{
                          id: `bm_grammar_${lesson.id}_stative_cat_${cIdx}`,
                          lessonId: lesson.id,
                          lessonTitle: lesson.title,
                          skill: "grammar",
                          category: "rule",
                          categoryLabelVi: "Nhóm Stative Verbs",
                          title: `${lesson.title} • ${cat.categoryName}`,
                          content: `Các động từ: ${cat.verbs.join(", ")}\nGhi chú: ${cat.notesVi}`,
                          lessonHref: `/theory/${lesson.id}`,
                        }}
                        label="Lưu nhóm"
                        savedLabel="Đã lưu ✓"
                        size="sm"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.verbs.map((v, vIdx) => (
                        <span
                          key={vIdx}
                          className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground font-mono text-[10px] font-bold"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-[11px] italic">{cat.notesVi}</p>
                  </div>
                ))}
              </div>

              {/* Dual Meaning Verbs */}
              {step1Concept.stativeVerbsGuide.dualMeaningVerbs && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground font-mono flex items-center gap-2">
                    <Split className="h-3.5 w-3.5 text-blue-500" />
                    <span>Cặp Từ Đa Nghĩa: Stative (Không V-ing) vs Dynamic (Có V-ing):</span>
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {step1Concept.stativeVerbsGuide.dualMeaningVerbs.map((dm, dmIdx) => (
                      <div
                        key={dmIdx}
                        className="p-4 rounded-2xl bg-card border border-border space-y-2.5 text-xs"
                      >
                        <div className="flex items-center justify-between border-b border-border/60 pb-2">
                          <span className="font-black text-blue-600 dark:text-blue-400 font-mono text-sm uppercase">
                            Động từ: "{dm.verb}"
                          </span>
                          <div className="flex items-center gap-1.5">
                            <TheorySpeakerButton
                              text={`Động từ ${dm.verb}. Nghĩa trạng thái: ${dm.stativeMeaning}. Ví dụ: ${dm.stativeExample}. Nghĩa hành động: ${dm.dynamicMeaning}. Ví dụ: ${dm.dynamicExample}. Phân tích: ${dm.explanationVi}`}
                              title={`Nghe phân biệt từ ${dm.verb}`}
                              size="icon-only"
                            />
                            <TheoryBookmarkButton
                              item={{
                                id: `bm_grammar_${lesson.id}_dual_verb_${dmIdx}`,
                                lessonId: lesson.id,
                                lessonTitle: lesson.title,
                                skill: "grammar",
                                category: "rule",
                                categoryLabelVi: "Cặp Từ Đa Nghĩa",
                                title: `${lesson.title} • Động từ ${dm.verb}`,
                                content: `Nghĩa trạng thái: ${dm.stativeMeaning} ("${dm.stativeExample}")\nNghĩa hành động: ${dm.dynamicMeaning} ("${dm.dynamicExample}")\nGiải thích: ${dm.explanationVi}`,
                                lessonHref: `/theory/${lesson.id}`,
                              }}
                              label="Lưu"
                              savedLabel="Đã lưu ✓"
                              size="sm"
                            />
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60 space-y-1">
                          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                            1. Nghĩa Trạng Thái ({dm.stativeMeaning}):
                          </span>
                          <p className="font-serif text-foreground text-xs italic">"{dm.stativeExample}"</p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60 space-y-1">
                          <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                            2. Nghĩa Hành Động ({dm.dynamicMeaning}):
                          </span>
                          <p className="font-serif text-foreground text-xs italic">"{dm.dynamicExample}"</p>
                        </div>

                        <p className="text-muted-foreground text-[11px] pt-1 border-t border-border/60">
                          💡 {dm.explanationVi}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Frequency Adverbs Section */}
          {step1Concept.frequencyAdverbsGuide && (
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-500" />
                <span>Trạng Từ Chỉ Tần Suất & 3 Vị Trí Vàng Trong Câu:</span>
              </h3>

              <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-foreground font-mono text-[11px] uppercase">
                    3 Quy Tắc Vị Trí Cốt Lõi:
                  </span>
                  <TheoryBookmarkButton
                    item={{
                      id: `bm_grammar_${lesson.id}_adverbs_position`,
                      lessonId: lesson.id,
                      lessonTitle: lesson.title,
                      skill: "grammar",
                      category: "rule",
                      categoryLabelVi: "Vị Trí Trạng Từ",
                      title: `${lesson.title} • Vị Trí Trạng Từ Chỉ Tần Suất`,
                      content: step1Concept.frequencyAdverbsGuide.positionRulesVi.join("\n"),
                      lessonHref: `/theory/${lesson.id}`,
                    }}
                    label="Lưu quy tắc"
                    savedLabel="Đã lưu ✓"
                    size="sm"
                  />
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-foreground/90 text-xs">
                  {step1Concept.frequencyAdverbsGuide.positionRulesVi.map((r, rIdx) => (
                    <li key={rIdx} className="leading-relaxed">{r}</li>
                  ))}
                </ul>
              </div>

              {/* Percentage Bar Visualization */}
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {step1Concept.frequencyAdverbsGuide.adverbsList.map((adv, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-3 rounded-2xl bg-card border border-border flex flex-col justify-between space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black font-mono text-sm text-foreground">
                          {adv.adverb}
                        </span>
                        <TheorySpeakerButton
                          text={`${adv.adverb}. Nghĩa: ${adv.meaningVi}. Ví dụ: ${adv.sampleSentence}`}
                          size="icon-only"
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                          {adv.percentage}%
                        </span>
                        <TheoryBookmarkButton
                          item={{
                            id: `bm_grammar_${lesson.id}_adv_${aIdx}`,
                            lessonId: lesson.id,
                            lessonTitle: lesson.title,
                            skill: "grammar",
                            category: "rule",
                            categoryLabelVi: "Trạng Từ Tần Suất",
                            title: `${adv.adverb} (${adv.percentage}%): ${adv.meaningVi}`,
                            content: `Mức độ: ${adv.percentage}%\nÝ nghĩa: ${adv.meaningVi}\nVí dụ: "${adv.sampleSentence}"`,
                            lessonHref: `/theory/${lesson.id}`,
                          }}
                          size="icon-only"
                        />
                      </div>
                    </div>

                    {/* Mini bar */}
                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: `${adv.percentage}%` }}
                      />
                    </div>

                    <div className="space-y-0.5 pt-1 border-t border-border/60">
                      <p className="text-muted-foreground text-[10px] font-medium">{adv.meaningVi}</p>
                      <p className="font-serif text-[11px] text-foreground/90 italic">"{adv.sampleSentence}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tense Comparison Section */}
          {step1Concept.tenseComparison && (
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
                <Scale className="h-4 w-4 text-indigo-500" />
                <span>So Sánh Đối Chiếu Với: {step1Concept.tenseComparison.otherTenseName}</span>
              </h3>

              <div className="p-4 rounded-2xl bg-indigo-500/[0.06] border border-indigo-500/20 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 font-mono text-[10px] uppercase">
                    Điểm Khác Biệt Cốt Lõi:
                  </span>
                  <TheoryBookmarkButton
                    item={{
                      id: `bm_grammar_${lesson.id}_tense_diff`,
                      lessonId: lesson.id,
                      lessonTitle: lesson.title,
                      skill: "grammar",
                      category: "rule",
                      categoryLabelVi: "So Sánh Ngữ Pháp",
                      title: `${lesson.title} • So Sánh Với ${step1Concept.tenseComparison.otherTenseName}`,
                      content: step1Concept.tenseComparison.keyDifferencesVi.join("\n"),
                      lessonHref: `/theory/${lesson.id}`,
                    }}
                    label="Lưu quy tắc"
                    savedLabel="Đã lưu ✓"
                    size="sm"
                  />
                </div>
                <ul className="space-y-1 list-disc list-inside text-foreground/90 text-xs">
                  {step1Concept.tenseComparison.keyDifferencesVi.map((diff, dIdx) => (
                    <li key={dIdx} className="leading-relaxed">{diff}</li>
                  ))}
                </ul>
              </div>

              {/* Comparison Examples */}
              <div className="space-y-3">
                {step1Concept.tenseComparison.comparisonExamples.map((item, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-card border border-border space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-border/60 pb-2">
                      <span className="font-mono font-bold text-muted-foreground text-[11px] uppercase">
                        Cặp So Sánh #{cIdx + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <TheorySpeakerButton
                          text={`Hiện tại: ${item.currentTenseExample}. Thì đối chiếu: ${item.otherTenseExample}. Phân biệt: ${item.distinctionAnalysisVi}`}
                          size="icon-only"
                        />
                        <TheoryBookmarkButton
                          item={{
                            id: `bm_grammar_${lesson.id}_tense_comp_${cIdx}`,
                            lessonId: lesson.id,
                            lessonTitle: lesson.title,
                            skill: "grammar",
                            category: "rule",
                            categoryLabelVi: "So Sánh Ngữ Pháp",
                            title: `${lesson.title} • Cặp So Sánh #${cIdx + 1}`,
                            content: `Câu 1: "${item.currentTenseExample}" (${item.currentMeaningVi})\nCâu 2: "${item.otherTenseExample}" (${item.otherMeaningVi})\nPhân biệt: ${item.distinctionAnalysisVi}`,
                            lessonHref: `/theory/${lesson.id}`,
                          }}
                          label="Lưu so sánh"
                          savedLabel="Đã lưu ✓"
                          size="sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-blue-500/[0.04] border border-blue-500/20 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                          {lesson.title.split(":")[1]?.trim() || "Thì Hiện Tại"}
                        </span>
                        <p className="font-serif font-bold text-foreground text-xs sm:text-sm">
                          "{item.currentTenseExample}"
                        </p>
                        <p className="text-muted-foreground text-[11px] italic">➔ {item.currentMeaningVi}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-purple-500/[0.04] border border-purple-500/20 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                          {step1Concept.tenseComparison?.otherTenseName}
                        </span>
                        <p className="font-serif font-bold text-foreground text-xs sm:text-sm">
                          "{item.otherTenseExample}"
                        </p>
                        <p className="text-muted-foreground text-[11px] italic">➔ {item.otherMeaningVi}</p>
                      </div>

                      <div className="sm:col-span-2 pt-1 border-t border-border/70 text-[11px] text-foreground/80 font-medium">
                        💡 <strong>Phân biệt:</strong> {item.distinctionAnalysisVi}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. FOUNDATIONAL EXAMPLES WITH SYNTACTIC BREAKDOWN */}
      {/* ========================================================================= */}
      {(activeTab === "all" || activeTab === "examples") && (
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <span>VI. Ví Dụ Nền Tảng Kèm Bóc Tách Cú Pháp Chuyên Sâu:</span>
          </h3>

          <div className="space-y-3">
            {step1Concept.foundationalExamples.map((ex, exIdx) => (
              <div
                key={exIdx}
                className="p-4 sm:p-5 rounded-2xl bg-card border border-border space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="font-serif font-bold text-foreground text-sm sm:text-base leading-snug">
                      "{ex.en}"
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm italic">➔ {ex.vi}</p>
                  </div>
                  <TheoryBookmarkButton
                    item={{
                      id: `bm_grammar_${lesson.id}_foundational_ex_${exIdx}`,
                      lessonId: lesson.id,
                      lessonTitle: lesson.title,
                      skill: "grammar",
                      category: "model",
                      categoryLabelVi: "Câu Mẫu Phân Tích",
                      title: `${lesson.title} • Ví Dụ Bóc Tách #${exIdx + 1}`,
                      content: `Dịch nghĩa: ${ex.vi}\nBóc tách cú pháp: ${ex.syntacticBreakdown}`,
                      excerptText: ex.en,
                      translationVi: ex.vi,
                      lessonHref: `/theory/${lesson.id}`,
                    }}
                    label="Lưu câu mẫu"
                    savedLabel="Đã lưu ✓"
                    size="sm"
                  />
                </div>

                <div className="pt-2 border-t border-border/70 text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-mono font-medium">
                  💡 <strong>Bóc tách cú pháp:</strong> {ex.syntacticBreakdown}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. ACTIVE RECALL KNOWLEDGE CHECK WIDGET */}
      {/* ========================================================================= */}
      <div className="pt-2 border-t border-border/80">
        <ActiveRecallCheckWidget
          lesson={lesson}
          stepNumber={1}
          stepTitle="Bản Chất & Khái Niệm Cốt Lõi"
        />
      </div>

      {/* Bottom CTA to Step 2 */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onProceedToStep2}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Tiếp Tục ➔ Bước 2: Vạch Trần Bẫy Khảo Thí</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
