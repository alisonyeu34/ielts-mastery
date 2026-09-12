"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  Sparkles,
  Send,
  HelpCircle,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Layers,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { MOCK_WRITING_PROMPTS, WritingPrompt } from "@/data/mockWritingPrompts";
import { WritingTimer } from "@/components/grading/writing/WritingTimer";
import { AIWritingEvaluationResponse } from "@/lib/aiPrompts";
import { cn } from "@/lib/utils";

interface WritingWorkspaceProps {
  onEvaluationComplete: (
    prompt: WritingPrompt,
    essay: string,
    result: AIWritingEvaluationResponse
  ) => void;
  className?: string;
}

export function WritingWorkspace({
  onEvaluationComplete,
  className,
}: WritingWorkspaceProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt>(
    MOCK_WRITING_PROMPTS[0]
  );
  const [essay, setEssay] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationStage, setEvaluationStage] = useState<string>("");
  const [showOutline, setShowOutline] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Load draft from localStorage on prompt change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const draft = localStorage.getItem(`draft_${selectedPrompt.id}`);
      if (draft) {
        setEssay(draft);
      } else {
        setEssay("");
      }
    }
  }, [selectedPrompt.id]);

  // Auto-save draft
  const handleEssayChange = (val: string) => {
    setEssay(val);
    if (typeof window !== "undefined") {
      localStorage.setItem(`draft_${selectedPrompt.id}`, val);
    }
  };

  const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const minWords = selectedPrompt.recommendedWords;
  const isWordCountSufficient = words >= minWords;

  // Submit essay for AI grading
  const handleEvaluate = async () => {
    if (words < 20) {
      setErrorMessage("Vui lòng viết tối thiểu 20 từ trước khi gửi chấm.");
      return;
    }

    setErrorMessage("");
    setIsEvaluating(true);
    setEvaluationStage("Đang phân tích cấu trúc bài viết và Task Achievement...");

    try {
      const stageTimer1 = setTimeout(() => {
        setEvaluationStage("Đang quét lỗi ngữ pháp (GRA) & phân tích trường từ vựng (LR)...");
      }, 1200);

      const stageTimer2 = setTimeout(() => {
        setEvaluationStage("Đang xây dựng đề xuất nâng cấp câu văn chuẩn học thuật C1/C2...");
      }, 2400);

      const response = await fetch("/api/ai/grade-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: selectedPrompt.promptText,
          taskType: selectedPrompt.taskType,
          essay: essay.trim(),
          targetBand: 7.5,
        }),
      });

      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);

      if (!response.ok) {
        throw new Error("Không thể kết nối với hệ thống chấm AI.");
      }

      const data: AIWritingEvaluationResponse = await response.json();
      onEvaluationComplete(selectedPrompt, essay.trim(), data);
    } catch (err: any) {
      console.error("AI Evaluation error:", err);
      setErrorMessage(err.message || "Đã xảy ra lỗi khi chấm bài. Vui lòng thử lại.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleFillSample = () => {
    if (selectedPrompt.taskType === "task2") {
      setEssay(
        "In the contemporary era, the relentless proliferation of modern technology has sparked an intense debate regarding its impact on cultural heritage. While opponents argue that globalization accelerates the erosion of indigenous traditions, I contend that digital advancements serve as an indispensable catalyst for cultural preservation and cross-generational dissemination.\n\nOn the one hand, critics rightly emphasize that the ubiquitous presence of Western media creates a pervasive homogenization of lifestyles. Younger demographics frequently abandon ancestral customs and dialectal nuances in favor of digital trends. For instance, traditional craft-making in rural communities has witnessed a severe decline as mass industrial manufacturing dominates commercial markets.\n\nOn the other hand, technological innovation offers unprecedented mechanisms to safeguard tangible and intangible heritage. High-resolution 3D scanning and virtual reality archives enable global audiences to experience historical artifacts without exposing them to physical degradation. Furthermore, decentralized social networks empower minority communities to document oral histories and revitalize endangered languages.\n\nIn conclusion, although uncurated digital consumption poses legitimate risks, technology fundamentally provides robust tools to preserve cultural identity when deployed with deliberate pedagogical foresight."
      );
    } else {
      setEssay(
        "The bar chart illustrates the proportion of electricity generated from renewable sources in four distinct European nations (Denmark, Germany, Spain, and Italy) between 2010 and 2020.\n\nOverall, it is immediately apparent that all four countries experienced an upward trajectory in clean energy adoption over the ten-year period. Denmark consistently maintained the highest percentage throughout, whereas Italy remained the lowest contributor in both years.\n\nIn 2010, Denmark led the group with 30% of its electricity originating from renewables, followed by Spain at 22%. Germany and Italy recorded comparatively modest figures of 15% and 12%, respectively.\n\nBy 2020, clean energy generation expanded significantly across all nations. Denmark witnessed a dramatic surge to 65%, more than doubling its initial figure. Similarly, Germany experienced remarkable growth, reaching 42% and surpassing Spain, which stood at 38%. Meanwhile, Italy saw a moderate increase to 20%, remaining at the bottom of the ranking."
      );
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Prompt Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-500" />
          <span className="text-xs font-bold text-foreground">Chọn Đề Luyện Viết:</span>
        </div>

        <select
          value={selectedPrompt.id}
          onChange={(e) => {
            const found = MOCK_WRITING_PROMPTS.find((p) => p.id === e.target.value);
            if (found) setSelectedPrompt(found);
          }}
          className="rounded-xl border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {MOCK_WRITING_PROMPTS.map((p) => (
            <option key={p.id} value={p.id}>
              [{p.taskType.toUpperCase()}] {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* 2-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Prompt & Context (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-5 shadow-sm">
          {/* Prompt Header & Meta */}
          <div className="space-y-2 border-b border-border/80 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                IELTS Academic {selectedPrompt.taskType.toUpperCase()}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Yêu cầu: <strong>≥ {selectedPrompt.recommendedWords} từ</strong>
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
              {selectedPrompt.title}
            </h3>
          </div>

          {/* Prompt Question Box */}
          <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 text-xs sm:text-sm text-foreground font-medium leading-relaxed">
            {selectedPrompt.promptText}
          </div>

          {/* Task 1 Chart Details Table if available */}
          {selectedPrompt.chartDetails && (
            <div className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <BarChart3 className="h-4 w-4" />
                <span>Bảng Số Liệu Trích Xuất Từ Biểu Đồ:</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {selectedPrompt.chartDetails.summary}
              </p>

              <div className="overflow-x-auto rounded-xl border border-border/60">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary/60 text-muted-foreground uppercase text-[10px]">
                    <tr>
                      <th className="py-2 px-3">Quốc Gia</th>
                      <th className="py-2 px-3">Năm 2010</th>
                      <th className="py-2 px-3">Năm 2020</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {selectedPrompt.chartDetails.dataPoints.map((dp, i) => (
                      <tr key={i} className="hover:bg-secondary/20">
                        <td className="py-2 px-3 font-semibold text-foreground">{dp.label}</td>
                        <td className="py-2 px-3 font-mono text-muted-foreground">{dp.value2010}</td>
                        <td className="py-2 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{dp.value2020}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Key Vocabulary Chips */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Từ Vựng & Collocation Gợi Ý:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedPrompt.keyVocabulary.map((word, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-secondary/80 border border-border text-[11px] font-medium text-foreground"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Outline Expander */}
          <div className="border border-border/80 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowOutline(!showOutline)}
              className="w-full flex items-center justify-between p-3 bg-secondary/30 text-xs font-bold text-foreground cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
                <span>Gợi Ý Dàn Bài Chuẩn (Sample Outline)</span>
              </div>
              {showOutline ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showOutline && (
              <div className="p-3.5 space-y-2.5 text-xs text-muted-foreground bg-card border-t border-border/80 leading-relaxed">
                <div>
                  <strong className="text-foreground">1. Mở bài / Overview:</strong> {selectedPrompt.sampleOutline.overviewOrIntro}
                </div>
                <div>
                  <strong className="text-foreground">2. Thân bài 1:</strong> {selectedPrompt.sampleOutline.bodyParagraph1}
                </div>
                <div>
                  <strong className="text-foreground">3. Thân bài 2:</strong> {selectedPrompt.sampleOutline.bodyParagraph2}
                </div>
                {selectedPrompt.sampleOutline.conclusion && (
                  <div>
                    <strong className="text-foreground">4. Kết bài:</strong> {selectedPrompt.sampleOutline.conclusion}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Writing Editor & Controls (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-4 shadow-sm relative">
          {/* Editor Header: Word count & Timer */}
          <div className="flex items-center justify-between border-b border-border/80 pb-3.5">
            {/* Word count badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground">Số từ:</span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-lg text-xs font-extrabold border font-mono transition-colors",
                  isWordCountSufficient
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                )}
              >
                {words} / {minWords} từ
              </span>
            </div>

            {/* Countdown Timer */}
            <WritingTimer initialMinutes={selectedPrompt.timeLimitMinutes} />
          </div>

          {/* Textarea Editor */}
          <div className="relative">
            <textarea
              value={essay}
              onChange={(e) => handleEssayChange(e.target.value)}
              placeholder="Bắt đầu viết bài luận của bạn tại đây..."
              rows={16}
              disabled={isEvaluating}
              className="w-full resize-none rounded-2xl border border-border bg-secondary/15 p-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 font-normal leading-relaxed"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Editor Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleFillSample}
              disabled={isEvaluating}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              [ Điền bài mẫu thử nghiệm ]
            </button>

            <button
              type="button"
              disabled={isEvaluating || words < 20}
              onClick={handleEvaluate}
              className={cn(
                "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
                words >= 20 && !isEvaluating
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                  : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
              )}
            >
              <Sparkles className="h-4 w-4" />
              <span>Gửi bài Chấm & Chữa AI</span>
            </button>
          </div>

          {/* Evaluating Loading Overlay */}
          {isEvaluating && (
            <div className="absolute inset-0 z-30 rounded-3xl bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin" />
                <Sparkles className="h-5 w-5 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>

              <div className="space-y-1.5 max-w-sm">
                <h4 className="text-base font-bold text-foreground">
                  AI Examiner Đang Chấm Bài Theo Barem Cambridge...
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed animate-pulse">
                  {evaluationStage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
