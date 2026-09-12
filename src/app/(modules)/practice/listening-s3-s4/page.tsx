"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  ArrowLeft,
  Sparkles,
  Layers,
  FileText,
  Users,
  Radio,
  RotateCcw,
  Send,
  HelpCircle,
} from "lucide-react";
import {
  MOCK_SECTION_3_TASK,
  MOCK_SECTION_4_TASK,
} from "@/data/mockListeningS3S4Data";
import {
  useLectureTracker,
  S3QuestionEvaluation,
  S4QuestionEvaluation,
} from "@/hooks/useLectureTracker";
import { AudioSpeedController } from "@/components/practice/listening/AudioSpeedController";
import { Section3MultipleChoice } from "@/components/practice/listening/Section3MultipleChoice";
import { Section4LectureNotes } from "@/components/practice/listening/Section4LectureNotes";
import { SignpostRadarBar } from "@/components/practice/listening/SignpostRadarBar";
import { S3S4FeedbackModal } from "@/components/practice/listening/S3S4FeedbackModal";
import { cn } from "@/lib/utils";

type SectionTab = "section3" | "section4";

export default function ListeningS3S4Page() {
  const [activeTab, setActiveTab] = useState<SectionTab>("section3");

  const s3Task = MOCK_SECTION_3_TASK;
  const s4Task = MOCK_SECTION_4_TASK;

  const {
    s3Selections,
    s3Eliminated,
    s4Inputs,
    activeSignpostIndex,
    isSubmitted,
    summary,
    selectS3Option,
    toggleEliminateS3Option,
    setS4Input,
    setActiveSignpostIndex,
    evaluateSection3,
    evaluateSection4,
    resetAll,
  } = useLectureTracker();

  const handleTabChange = (tab: SectionTab) => {
    setActiveTab(tab);
    resetAll();
  };

  const handleSubmit = async () => {
    if (activeTab === "section3") {
      await evaluateSection3(s3Task);
    } else {
      await evaluateSection4(s4Task);
    }
  };

  const s3Answered = Object.keys(s3Selections).length;
  const s4Answered = Object.values(s4Inputs).filter((v) => v.trim().length > 0).length;

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Chuyên Sâu Listening Section 3 & Section 4
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Bóc Tách Bẫy Listening Section 3 & Section 4
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Làm chủ bẫy sự đồng thuận nhóm (Group Consensus), gạch bỏ phương án nhiễu và bám sát ghi chú bài giảng phân cấp (Signposting Radar).
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
          onClick={() => handleTabChange("section3")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "section3"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Users className="h-4 w-4 text-indigo-500" />
          <span>Section 3: Thảo Luận Học Thuật & Đồng Thuận Nhóm</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("section4")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeTab === "section4"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Radio className="h-4 w-4 text-purple-500" />
          <span>Section 4: Bài Giảng & Ghi Chú Phân Cấp</span>
        </button>
      </div>

      {/* Persistent Audio Player Bar */}
      <AudioSpeedController
        key={activeTab}
        transcript={activeTab === "section3" ? s3Task.fullTranscript : s4Task.fullTranscript}
        durationSeconds={activeTab === "section3" ? s3Task.audioDurationSeconds : s4Task.audioDurationSeconds}
        title={activeTab === "section3" ? s3Task.title : s4Task.title}
        onTimeUpdate={(t) => {
          if (activeTab === "section4") {
            if (t < 50) setActiveSignpostIndex(0);
            else if (t < 75) setActiveSignpostIndex(1);
            else if (t < 100) setActiveSignpostIndex(2);
            else if (t < 125) setActiveSignpostIndex(3);
            else setActiveSignpostIndex(4);
          }
        }}
      />

      {/* Main Workspace Area */}
      {activeTab === "section3" ? (
        /* SECTION 3 VIEW */
        <div className="space-y-6">
          <Section3MultipleChoice
            task={s3Task}
            selections={s3Selections}
            eliminations={s3Eliminated}
            evaluations={summary?.evaluations as S3QuestionEvaluation[] | undefined}
            isSubmitted={isSubmitted}
            onSelectOption={selectS3Option}
            onToggleEliminate={toggleEliminateS3Option}
          />

          {/* Submit Action or Result Modal */}
          {!isSubmitted ? (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={s3Answered === 0}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
                  s3Answered > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                    : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4" />
                <span>Nộp bài & Chấm điểm Section 3 ({s3Answered}/{s3Task.questions.length})</span>
              </button>
            </div>
          ) : (
            summary && (
              <S3S4FeedbackModal
                summary={summary}
                taskTitle={s3Task.title}
                onRestart={resetAll}
              />
            )
          )}
        </div>
      ) : (
        /* SECTION 4 VIEW */
        <div className="space-y-6">
          {/* Signpost Radar Bar */}
          <SignpostRadarBar
            signposts={s4Task.signposts}
            activeSignpostIndex={activeSignpostIndex}
          />

          {/* Hierarchical Lecture Notes */}
          <Section4LectureNotes
            task={s4Task}
            inputs={s4Inputs}
            evaluations={summary?.evaluations as S4QuestionEvaluation[] | undefined}
            isSubmitted={isSubmitted}
            onInputChange={setS4Input}
          />

          {/* Submit Action or Result Modal */}
          {!isSubmitted ? (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={s4Answered === 0}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
                  s4Answered > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                    : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4" />
                <span>Nộp bài & Chấm điểm Section 4 ({s4Answered}/{s4Task.questions.length})</span>
              </button>
            </div>
          ) : (
            summary && (
              <S3S4FeedbackModal
                summary={summary}
                taskTitle={s4Task.title}
                onRestart={resetAll}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
