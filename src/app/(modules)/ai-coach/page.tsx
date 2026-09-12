"use client";

import React, { useState } from "react";
import { ExaminerPersonaSelector } from "@/components/ai-coach/ExaminerPersonaSelector";
import { SpeakingExaminerVoiceChat } from "@/components/ai-coach/SpeakingExaminerVoiceChat";
import { ActiveStudyTimeTracker } from "@/components/ai-coach/ActiveStudyTimeTracker";
import { CloudSyncStatusWidget } from "@/components/ai-coach/CloudSyncStatusWidget";
import { StageUnlockGuard } from "@/components/ai-coach/StageUnlockGuard";
import { BandScoreForecastChart } from "@/components/ai-coach/BandScoreForecastChart";
import { SocraticExplainerDrawer } from "@/components/ai-coach/SocraticExplainerDrawer";
import { ExaminerPersonaId } from "@/lib/aiExaminerClient";
import {
  Bot,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Microscope,
  HardDrive,
  Headphones,
  Award,
  Zap,
} from "lucide-react";

export default function AICoachTelemetryStudioPage() {
  const [selectedPersona, setSelectedPersona] = useState<ExaminerPersonaId>("strict_examiner");
  const [isSocraticDemoOpen, setIsSocraticDemoOpen] = useState<boolean>(false);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto select-none">
      {/* 1. Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Trợ Giảng & Giám Khảo AI
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Luyện Nói Phản Xạ & Trợ Giảng AI (AI Coach)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Luyện phỏng vấn nói trực tiếp cùng giám khảo AI • Trợ giảng gợi mở câu hỏi Nghe & Đọc • Tự động đếm giờ học thực tế mỗi ngày.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 self-start sm:self-auto shadow-sm">
          <Bot className="h-6 w-6" />
          <div>
            <span className="text-[10px] uppercase font-bold block leading-none">Trợ Giảng Trực Tuyến</span>
            <span className="text-xs font-black font-mono">Cambridge AI Coach</span>
          </div>
        </div>
      </div>

      {/* 2. Top Telemetry & Cloud Sync Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7">
          <ActiveStudyTimeTracker dailyTargetSeconds={12600} />
        </div>
        <div className="lg:col-span-5">
          <CloudSyncStatusWidget />
        </div>
      </div>

      {/* 3. Stage Unlock Gate Guard */}
      <StageUnlockGuard
        completedIpaCount={0}
        grammarQuizzesPassed={0}
        masteredErrorsCount={0}
        totalErrorsCount={0}
        latestMockBand={4.5}
      />

      {/* 4. Socratic Sandbox Banner Callout */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-card to-emerald-500/10 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30">
            <Microscope className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground">
              Gợi Mở Tư Duy Socratic: Tự Nhận Diện Bẫy Paraphrase
            </h4>
            <span className="text-muted-foreground">
              Trải nghiệm cơ chế gợi mở 2 bước của Trợ giảng AI trước khi xem lời giải bài Nghe / Đọc.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSocraticDemoOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/25 cursor-pointer self-start sm:self-auto"
        >
          Xem Cách Trợ Giảng Gợi Ý ➔
        </button>
      </div>

      {/* 5. Examiner Persona Selector */}
      <ExaminerPersonaSelector
        selectedPersonaId={selectedPersona}
        onSelectPersona={setSelectedPersona}
      />

      {/* 6. Live Speaking Voice Interview Room */}
      <SpeakingExaminerVoiceChat
        initialPersonaId={selectedPersona}
      />

      {/* 7. Band Score Forecast Trajectory Graph */}
      <BandScoreForecastChart
        currentDay={1}
        actualCurrentBand={4.5}
        masteredErrorsRate={0}
        fsrsRetentionRate={0}
      />

      {/* Socratic Explainer Demo Drawer */}
      <SocraticExplainerDrawer
        isOpen={isSocraticDemoOpen}
        onClose={() => setIsSocraticDemoOpen(false)}
        questionContext="[Passage 3 - Câu 28]: The Chinese Room thought experiment demonstrates that formal symbol manipulation yields true semantic understanding."
        userWrongAnswer="YES"
        correctAnswer="NO"
        evidenceSnippet="Searle concluded that syntactic manipulation can never yield semantic intentionality."
        questionType="Yes/No/Not Given"
        distractorTrapExplanation="Bẫy phủ định và mâu thuẫn trực tiếp giữa 'yields true understanding' và 'can never yield semantic intentionality'."
      />
    </div>
  );
}
