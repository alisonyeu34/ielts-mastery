"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PenTool,
  ArrowLeft,
  Sparkles,
  Layers,
  FileText,
  Lightbulb,
  Send,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import {
  MOCK_TASK2_PROMPTS,
  Task2PromptData,
} from "@/data/mockTask2Prompts";
import { usePEELEditor } from "@/hooks/usePEELEditor";
import { Task2PromptDeconstructor } from "@/components/practice/writing-task2/Task2PromptDeconstructor";
import { ThesisStatementBuilder } from "@/components/practice/writing-task2/ThesisStatementBuilder";
import { PEELParagraphBuilder } from "@/components/practice/writing-task2/PEELParagraphBuilder";
import { PEELGuidanceDrawer } from "@/components/practice/writing-task2/PEELGuidanceDrawer";
import { Task2DraftViewer } from "@/components/practice/writing-task2/Task2DraftViewer";
import { cn } from "@/lib/utils";

export default function WritingTask2Page() {
  const {
    activePromptId,
    activePrompt,
    intro,
    body1,
    body2,
    conclusion,
    isAssembled,
    introWordCount,
    body1WordCount,
    body2WordCount,
    conclusionWordCount,
    totalWordCount,
    thesisValidation,
    setActivePromptId,
    setIntroField,
    setBody1Field,
    setBody2Field,
    setConclusion,
    loadModelEssay,
    assembleFullEssay,
    saveEssayDraft,
    resetAll,
  } = usePEELEditor();

  const handlePromptChange = (promptId: string) => {
    setActivePromptId(promptId);
    resetAll();
  };

  const isWordCountSufficient = totalWordCount >= 250;

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Chuyên Sâu IELTS Writing Task 2
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phương Pháp Luận & Khung Dựng PEEL Task 2
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Làm chủ kỹ thuật phân tích đề (Prompt Deconstruction), viết Mở bài 2 câu và dựng thân bài theo mô hình 4 khối PEEL.
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* Prompt Selector Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/60 border border-border/80">
        {MOCK_TASK2_PROMPTS.map((p) => {
          const isActive = activePromptId === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePromptChange(p.id)}
              className={cn(
                "flex-1 min-w-[220px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
                isActive
                  ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="h-4 w-4 text-indigo-500" />
              <span>{p.essayTypeVi}</span>
            </button>
          );
        })}
      </div>

      {/* Main Split-View Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Prompt Deconstruction & Model Essay Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <Task2PromptDeconstructor prompt={activePrompt} />

          {/* Model Band 8.5+ PEEL Breakdown Accordion */}
          <div className="p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-3 select-none">
            <div className="flex items-center justify-between border-b border-border/70 pb-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                <span>Bài Mẫu Band 8.5+ Mổ Xẻ PEEL</span>
              </h4>
              <button
                type="button"
                onClick={loadModelEssay}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 cursor-pointer"
              >
                Tải vào khung soạn thảo ➔
              </button>
            </div>

            <div className="space-y-2 text-xs font-serif text-muted-foreground leading-relaxed">
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/70 space-y-1">
                <span className="font-sans font-bold text-[10px] uppercase text-indigo-600 dark:text-indigo-400 block">
                  Introduction:
                </span>
                <p>"{activePrompt.modelIntro.background} {activePrompt.modelIntro.thesis}"</p>
              </div>

              <div className="p-3 rounded-xl bg-secondary/30 border border-border/70 space-y-1">
                <span className="font-sans font-bold text-[10px] uppercase text-blue-600 dark:text-blue-400 block">
                  Body 1 (PEEL):
                </span>
                <p>"{activePrompt.modelPEELBody1.point} {activePrompt.modelPEELBody1.explain} {activePrompt.modelPEELBody1.example} {activePrompt.modelPEELBody1.link}"</p>
              </div>

              <div className="p-3 rounded-xl bg-secondary/30 border border-border/70 space-y-1">
                <span className="font-sans font-bold text-[10px] uppercase text-purple-600 dark:text-purple-400 block">
                  Body 2 (PEEL):
                </span>
                <p>"{activePrompt.modelPEELBody2.point} {activePrompt.modelPEELBody2.explain} {activePrompt.modelPEELBody2.example} {activePrompt.modelPEELBody2.link}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Guidance Drawer + Intro Builder + PEEL Builder + Conclusion + Actions */}
        <div className="lg:col-span-7 space-y-6">
          <PEELGuidanceDrawer />

          {!isAssembled ? (
            <div className="space-y-6">
              {/* Step 2: Introduction */}
              <ThesisStatementBuilder
                background={intro.background}
                thesis={intro.thesis}
                validation={thesisValidation}
                wordCount={introWordCount}
                onSetBackground={(val) => setIntroField("background", val)}
                onSetThesis={(val) => setIntroField("thesis", val)}
              />

              {/* Step 3: PEEL Paragraph Builder */}
              <PEELParagraphBuilder
                body1={body1}
                body2={body2}
                body1WordCount={body1WordCount}
                body2WordCount={body2WordCount}
                onSetBody1Field={setBody1Field}
                onSetBody2Field={setBody2Field}
              />

              {/* Step 4: Conclusion Box */}
              <div className="p-5 sm:p-7 rounded-3xl border border-border bg-card shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-600 text-white font-mono text-[11px] font-bold">
                      4
                    </span>
                    <span>Step 4: Kết Luận (Conclusion - 1-2 Câu Khẳng Định Lại Luận Đề)</span>
                  </label>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {conclusionWordCount} từ
                  </span>
                </div>

                <textarea
                  rows={3}
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  placeholder="Khẳng định lại luận điểm cốt lõi và tóm tắt giải pháp/triển vọng (ví dụ: In conclusion, while X offers temporary merits, I firmly maintain that Y...)"
                  className="w-full rounded-2xl border border-border bg-secondary/20 p-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-serif leading-relaxed"
                />
              </div>

              {/* Assemble / Submit Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-secondary/40 border border-border">
                <div className="text-xs font-mono font-bold text-foreground">
                  Tổng dung lượng bài:{" "}
                  <span
                    className={cn(
                      "font-extrabold text-sm",
                      isWordCountSufficient
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400"
                    )}
                  >
                    {totalWordCount} / 250 từ
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => saveEssayDraft(activePrompt)}
                  disabled={totalWordCount < 50}
                  className={cn(
                    "px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
                    totalWordCount >= 50
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                      : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                  )}
                >
                  <Send className="h-4 w-4" />
                  <span>Ghép khối & Xem bài hoàn chỉnh</span>
                </button>
              </div>
            </div>
          ) : (
            <Task2DraftViewer
              prompt={activePrompt}
              intro={intro}
              body1={body1}
              body2={body2}
              conclusion={conclusion}
              totalWordCount={totalWordCount}
              thesisValidation={thesisValidation}
              onEditAgain={() => assembleFullEssay()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
