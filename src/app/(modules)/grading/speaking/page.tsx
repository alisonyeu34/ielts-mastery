"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Mic,
  ArrowLeft,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  Volume2,
  History,
  RotateCcw,
  Zap,
} from "lucide-react";
import { MOCK_SPEAKING_TOPICS, SpeakingTopic } from "@/data/mockSpeakingTopics";
import { AISpeakingEvaluationResponse } from "@/lib/speakingPrompts";
import { SpeakingExaminerCard } from "@/components/grading/speaking/SpeakingExaminerCard";
import { VoiceRecorder } from "@/components/grading/speaking/VoiceRecorder";
import { SpeakingScoreReport } from "@/components/grading/speaking/SpeakingScoreReport";
import { db } from "@/lib/db";
import { AISubmission } from "@/types/database";
import { PauseStats } from "@/hooks/useAudioRecorder";
import { cn } from "@/lib/utils";

export default function SpeakingGraderPage() {
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3>(1);
  const [selectedTopic, setSelectedTopic] = useState<SpeakingTopic>(
    MOCK_SPEAKING_TOPICS[0]
  );
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] =
    useState<AISpeakingEvaluationResponse | null>(null);

  // Live Query for past Speaking AI submissions
  const pastSpeakingSubmissions = useLiveQuery(async () => {
    return await db.ai_submissions
      .where("skill")
      .startsWith("speaking")
      .reverse()
      .sortBy("createdAt");
  }) || [];

  // Filter topics by selected Part
  const filteredTopics = MOCK_SPEAKING_TOPICS.filter((t) => t.part === selectedPart);

  const handlePartChange = (part: 1 | 2 | 3) => {
    setSelectedPart(part);
    const firstInPart = MOCK_SPEAKING_TOPICS.find((t) => t.part === part);
    if (firstInPart) setSelectedTopic(firstInPart);
    setEvaluationResult(null);
  };

  const handleEvaluateSpeaking = async (
    transcript: string,
    audioBlob: Blob | null,
    pauseStats: PauseStats
  ) => {
    setIsEvaluating(true);
    try {
      const response = await fetch("/api/ai/grade-speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part: selectedTopic.part,
          questionText: selectedTopic.questionText,
          transcript,
          pauseStats,
          targetBand: 7.5,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể kết nối với hệ thống chấm Speaking AI.");
      }

      const data: AISpeakingEvaluationResponse = await response.json();
      setEvaluationResult(data);

      // Save submission to IndexedDB
      const newSubmission: AISubmission = {
        id: `ai_spk_${Date.now()}`,
        skill: `speaking_part${selectedTopic.part}` as any,
        promptQuestion: selectedTopic.questionText,
        userContent: transcript,
        wordCount: transcript.split(/\s+/).length,
        scores: {
          tr: data.criteriaScores.fc,
          cc: data.criteriaScores.fc,
          lr: data.criteriaScores.lr,
          gra: data.criteriaScores.gra,
          overall: data.overallScore,
        },
        detailedFeedback: {
          grammarErrors: data.grammarErrors,
          c1Upgrades: [],
          generalComment: data.examinerVerdict,
        },
        createdAt: new Date().toISOString(),
      };

      await db.ai_submissions.put(newSubmission);
    } catch (err) {
      console.error("Speaking evaluation error:", err);
      alert("Đã xảy ra lỗi khi chấm bài Speaking. Vui lòng thử lại.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-500 uppercase tracking-wider mb-1">
            <Mic className="h-4 w-4" /> Module 3 / 5 • Chấm & Chữa AI
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            AI Speaking Diagnostic Room (Phòng Thi Thử 1-1)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Luyện nói trực tiếp với Examiner AI, quan sát sóng âm 60 FPS, đo độ trôi chảy & nhận xét 4 tiêu chí FC-LR-GRA-PR.
          </p>
        </div>

        <Link
          href="/grading"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Chấm AI
        </Link>
      </div>

      {/* Part Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-secondary/60 border border-border/80">
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePartChange(p as 1 | 2 | 3)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                selectedPart === p
                  ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Part {p} {p === 1 && "(Phỏng vấn)"} {p === 2 && "(Cue Card)"} {p === 3 && "(Thảo luận sâu)"}
            </button>
          ))}
        </div>

        {/* Topic selector */}
        <select
          value={selectedTopic.id}
          onChange={(e) => {
            const found = MOCK_SPEAKING_TOPICS.find((t) => t.id === e.target.value);
            if (found) {
              setSelectedTopic(found);
              setEvaluationResult(null);
            }
          }}
          className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {filteredTopics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {/* Network & Offline Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-purple-500/[0.05] border border-purple-500/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-foreground">
            AI Cloud Examiner:
          </span>
          <span className="text-muted-foreground">
            Cần kết nối Internet để ghi âm và gửi bài tới Giám khảo AI chuẩn BC / IDP (đo độ ngập ngừng dịch thô & trừ điểm nếu dùng ví dụ cá nhân ở Part 3).
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
          <span className="px-2 py-0.5 rounded-md bg-secondary border border-border">
            Lịch sử & Âm thanh: Lưu Offline (IndexedDB)
          </span>
        </div>
      </div>

      {/* Tactical Strategy Hints for Selected Part */}
      {selectedPart === 2 && (
        <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-300">
            <Sparkles className="h-4 w-4" />
            Chiến Thuật 1 Phút Chuẩn Bị Part 2: Công Thức Dòng Thời Gian PPF (Chống Trắng Não)
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Tuyệt đối không cố viết cả câu trong 1 phút! Chỉ viết <strong>4 - 6 từ khóa (bullet points)</strong> theo trình tự <strong>PPF</strong>:
            <br />
            • <strong>Past (Quá khứ):</strong> Bắt đầu từ khi nào, bối cảnh lúc đó ra sao (dùng <em>used to, occurred, initially</em>).
            <br />
            • <strong>Present (Hiện tại):</strong> Thực tế hiện nay, cảm xúc cốt lõi (dùng <em>currently, what strikes me is</em>).
            <br />
            • <strong>Future (Tương lai):</strong> Dự định tiếp theo hoặc bài học rút ra (dùng <em>in the foreseeable future, looking ahead</em>) để nói trôi chảy đủ 2 phút.
          </p>
        </div>
      )}

      {selectedPart === 3 && (
        <div className="p-4 rounded-2xl bg-sky-500/[0.08] border border-sky-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
            <Sparkles className="h-4 w-4" />
            Chiến Thuật Phản Xạ Part 3: Mô Hình A-R-E-A & Góc Nhìn Xã Hội Khách Quan (Bứt Phá 6.5+)
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Giám khảo quyết định chặn thí sinh ở 5.0 - 5.5 hay cho lên 6.5+ phụ thuộc lớn vào Part 3. <strong>TUYỆT ĐỐI KHÔNG dùng ví dụ cá nhân ("tôi, gia đình tôi")</strong>! Hãy triển khai theo công thức:
            <br />
            • <strong>A - Answer:</strong> Trả lời trực diện vào hiện tượng xã hội.
            <br />
            • <strong>R - Reason:</strong> Đưa ra lý do giải thích sâu (nguyên nhân kinh tế, tâm lý, công nghệ).
            <br />
            • <strong>E - Example:</strong> Ví dụ khách quan mang tính cộng đồng (ví dụ: <em>young professionals in metropolitan areas, urban planners</em>).
            <br />
            • <strong>A - Alternative:</strong> Mở rộng trường hợp ngược lại (<em>Conversely, were there no regulations, ...</em>).
          </p>
        </div>
      )}

      {/* Main Interactive Speaking Flow */}
      {!evaluationResult ? (
        <div className="space-y-6">
          {/* 1. Virtual Examiner Card */}
          <SpeakingExaminerCard topic={selectedTopic} />

          {/* 2. Audio Recorder with Waveform & Transcript */}
          <VoiceRecorder
            onEvaluate={handleEvaluateSpeaking}
            isEvaluating={isEvaluating}
            sampleTranscriptHint={selectedTopic.sampleBand8Answer}
          />
        </div>
      ) : (
        /* 3. Diagnostic Score Report */
        <SpeakingScoreReport
          evaluation={evaluationResult}
          topicTitle={selectedTopic.title}
          onRetry={() => setEvaluationResult(null)}
        />
      )}

      {/* Past Speaking History Log */}
      {pastSpeakingSubmissions.length > 0 && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              <History className="h-4 w-4 text-purple-500" />
              Lịch Sử Các Lần Luyện Nói Gần Đây ({pastSpeakingSubmissions.length})
            </h3>
            <span className="text-xs text-muted-foreground">IndexedDB Offline-first</span>
          </div>

          <div className="space-y-2.5">
            {pastSpeakingSubmissions.slice(0, 4).map((sub) => (
              <div
                key={sub.id}
                className="p-3.5 rounded-xl border border-border/70 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold uppercase text-[10px] border border-purple-500/20">
                      {sub.skill}
                    </span>
                    <span className="text-muted-foreground font-medium line-clamp-1">
                      {sub.promptQuestion}
                    </span>
                  </div>
                  <p className="text-muted-foreground italic line-clamp-1">
                    "{sub.userContent}"
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Band {sub.scores.overall.toFixed(1)}
                  </span>
                  <div className="text-[10px] text-muted-foreground">
                    {new Date(sub.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
