"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  ArrowLeft,
  Sparkles,
  Layers,
  FileText,
  MapPin,
  HelpCircle,
  RotateCcw,
  Send,
  Check,
  X,
  Compass,
} from "lucide-react";
import {
  MOCK_SECTION_1_TASK,
  MOCK_SECTION_2_TASK,
} from "@/data/mockListeningS1S2Data";
import { useMapNavigation, S1FieldEvaluation, MapQuestionEvaluation } from "@/hooks/useMapNavigation";
import { ListeningAudioBar } from "@/components/practice/listening/ListeningAudioBar";
import { Section1FormFill } from "@/components/practice/listening/Section1FormFill";
import { InteractiveMapViewer } from "@/components/practice/listening/InteractiveMapViewer";
import { DirectionIndicator } from "@/components/practice/listening/DirectionIndicator";
import { SelfCorrectionExplainer } from "@/components/practice/listening/SelfCorrectionExplainer";
import { ListeningResultModal } from "@/components/practice/listening/ListeningResultModal";
import { cn } from "@/lib/utils";

type SectionTab = "section1" | "section2";

export default function ListeningS1S2Page() {
  const [activeTab, setActiveTab] = useState<SectionTab>("section1");
  const [mobileView, setMobileView] = useState<"workspace" | "tools">("workspace");

  const s1Task = MOCK_SECTION_1_TASK;
  const s2Task = MOCK_SECTION_2_TASK;

  const {
    section1Inputs,
    assignedLetters,
    activeQuestionId,
    showBreadcrumbs,
    isSubmitted,
    summary,
    setS1Input,
    assignLetter,
    removeLetter,
    setActiveQuestionId,
    toggleBreadcrumbs,
    evaluateSection1,
    evaluateSection2,
    resetAll,
  } = useMapNavigation();

  const handleTabChange = (tab: SectionTab) => {
    setActiveTab(tab);
    resetAll();
  };

  const handleSubmit = async () => {
    if (activeTab === "section1") {
      await evaluateSection1(s1Task);
    } else {
      await evaluateSection2(s2Task);
    }
  };

  const s1Answered = Object.values(section1Inputs).filter((v) => v.trim().length > 0).length;
  const s2Answered = Object.keys(assignedLetters).length;

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Chuyên Sâu Listening Section 1 & Section 2
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Bóc Tách Bẫy Listening Section 1 & Section 2
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Làm chủ bẫy đánh vần tên riêng, bẫy người nói tự sửa lời (Self-correction) và kỹ thuật định vị bản đồ (Map & Plan Labelling).
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/60 border border-border/80">
        <button
          type="button"
          onClick={() => handleTabChange("section1")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "section1"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="h-4 w-4 text-indigo-500" />
          <span>Section 1: Điền Form & Bẫy Tự Sửa Lời</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("section2")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "section2"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <MapPin className="h-4 w-4 text-emerald-500" />
          <span>Section 2: Bản Đồ & Định Vị Hướng (Map Labelling)</span>
        </button>
      </div>

      {/* Persistent Audio Player Bar */}
      <ListeningAudioBar
        key={activeTab}
        transcript={activeTab === "section1" ? s1Task.fullTranscript : s2Task.fullTranscript}
        durationSeconds={activeTab === "section1" ? s1Task.audioDurationSeconds : s2Task.audioDurationSeconds}
        title={activeTab === "section1" ? s1Task.title : s2Task.title}
      />

      {/* Main Split-View Content Area */}
      {activeTab === "section1" ? (
        /* SECTION 1 VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Form Completion */}
          <div className="lg:col-span-7">
            <Section1FormFill
              task={s1Task}
              inputs={section1Inputs}
              evaluations={summary?.evaluations as S1FieldEvaluation[] | undefined}
              isSubmitted={isSubmitted}
              onInputChange={setS1Input}
            />
          </div>

          {/* Right: Explainer & Action */}
          <div className="lg:col-span-5 space-y-6">
            <SelfCorrectionExplainer />

            {!isSubmitted ? (
              <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Đã điền: <strong>{s1Answered} / {s1Task.fields.length} mục</strong>
                </p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={s1Answered === 0}
                  className={cn(
                    "w-full py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer",
                    s1Answered > 0
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                      : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                  )}
                >
                  <Send className="h-4 w-4" />
                  <span>Nộp bài & Chấm điểm Section 1</span>
                </button>
              </div>
            ) : (
              summary && (
                <ListeningResultModal
                  summary={summary}
                  taskTitle={s1Task.title}
                  onRestart={resetAll}
                />
              )
            )}
          </div>
        </div>
      ) : (
        /* SECTION 2 MAP VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Map */}
          <div className="lg:col-span-7">
            <InteractiveMapViewer
              task={s2Task}
              assignedLetters={assignedLetters}
              activeQuestionId={activeQuestionId}
              evaluations={summary?.evaluations as MapQuestionEvaluation[] | undefined}
              showBreadcrumbs={showBreadcrumbs}
              isSubmitted={isSubmitted}
              onAssignLetter={assignLetter}
              onSelectQuestion={setActiveQuestionId}
              onToggleBreadcrumbs={toggleBreadcrumbs}
            />
          </div>

          {/* Right: Compass & Question List */}
          <div className="lg:col-span-5 space-y-6">
            <DirectionIndicator />

            {/* Target Locations Question List */}
            <div className="p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  <span>Danh Sách Địa Điểm Cần Gán Nhãn:</span>
                </h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  {s2Answered} / {s2Task.questions.length} đã gán
                </span>
              </div>

              <div className="space-y-3">
                {s2Task.questions.map((q) => {
                  const assignedLetter = assignedLetters[q.id];
                  const isSelected = activeQuestionId === q.id;
                  const evalItem = summary?.evaluations?.find(
                    (e) => (e as MapQuestionEvaluation).questionId === q.id
                  ) as MapQuestionEvaluation | undefined;

                  return (
                    <div
                      key={q.id}
                      onClick={() => !isSubmitted && setActiveQuestionId(q.id)}
                      className={cn(
                        "p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 select-none",
                        isSelected && !isSubmitted && "border-indigo-600 bg-indigo-500/10 ring-2 ring-indigo-500/30",
                        !isSelected && !isSubmitted && "border-border/80 bg-secondary/20 hover:border-indigo-400/40",
                        isSubmitted && evalItem?.isCorrect && "border-emerald-500/40 bg-emerald-500/[0.04]",
                        isSubmitted && evalItem && !evalItem.isCorrect && "border-rose-500/40 bg-rose-500/[0.04]"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-foreground font-mono text-xs font-bold">
                          {q.questionNumber}
                        </span>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-foreground block">
                            {q.targetName}
                          </span>
                          {isSubmitted && evalItem && (
                            <span className="text-[10px] text-muted-foreground block pt-0.5">
                              {evalItem.isCorrect ? (
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                  ✓ Chuẩn xác (Vị trí {q.correctLetter})
                                </span>
                              ) : (
                                <span className="text-rose-600 dark:text-rose-400 font-bold">
                                  ✗ Sai (Bạn chọn {evalItem.userSelectedLetter || "chưa chọn"} ➔ Đúng là {q.correctLetter})
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Assigned Letter Tag */}
                      <div className="flex items-center gap-1.5">
                        {assignedLetter ? (
                          <div className="flex items-center gap-1">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-extrabold shadow-sm">
                              {assignedLetter}
                            </span>
                            {!isSubmitted && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeLetter(q.id);
                                }}
                                className="h-5 w-5 rounded-md text-muted-foreground hover:text-rose-500 flex items-center justify-center"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] font-semibold text-muted-foreground px-2 py-1 rounded-md bg-secondary border border-border">
                            Chưa gán
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit Action Box */}
              {!isSubmitted ? (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={s2Answered === 0}
                    className={cn(
                      "w-full py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer",
                      s2Answered > 0
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                        : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Send className="h-4 w-4" />
                    <span>Nộp bài & Chấm điểm Bản đồ ({s2Answered}/{s2Task.questions.length})</span>
                  </button>
                </div>
              ) : (
                summary && (
                  <ListeningResultModal
                    summary={summary}
                    taskTitle={s2Task.title}
                    onRestart={resetAll}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
