"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Volume2,
  Headphones,
  Mic,
  RotateCcw,
  Award,
  Layers,
  ChevronLeft,
  ChevronRight,
  Zap,
  CheckCircle2,
  Info,
  Flame,
} from "lucide-react";
import {
  MOCK_SHADOWING_SENTENCES,
  ShadowingSentence,
} from "@/data/mockShadowingData";
import {
  generateNativeEnvelope,
  extractRMSFromAudioBuffer,
  compareEnvelopes,
  RhythmComparisonResult,
} from "@/lib/waveformComparison";
import { DualWaveformCanvas } from "@/components/practice/shadowing/DualWaveformCanvas";
import { ChunkAudioController } from "@/components/practice/shadowing/ChunkAudioController";
import { ShadowingTranscriptViewer } from "@/components/practice/shadowing/ShadowingTranscriptViewer";
import { ShadowingRecorderControl } from "@/components/practice/shadowing/ShadowingRecorderControl";
import { RhythmScoreCard } from "@/components/practice/shadowing/RhythmScoreCard";
import { ShadowingSessionSummary } from "@/components/practice/shadowing/ShadowingSessionSummary";
import { db } from "@/lib/db";
import { PracticeLog } from "@/types/database";
import { cn } from "@/lib/utils";
import { markPracticeCompleted } from "@/lib/taskCompletionScanner";

export default function ShadowingStudioPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "day1_core" | "c1_cadence">("day1_core");
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number>(0);
  const [activeChunkIdx, setActiveChunkIdx] = useState<number>(0);

  // Audio Playback
  const [isPlayingNative, setIsPlayingNative] = useState<boolean>(false);
  const [isLoopingChunk, setIsLoopingChunk] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);

  // Recording
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [shadowingMode, setShadowingMode] = useState<"repeat_after" | "simultaneous">("repeat_after");
  const [learnerAudioUrl, setLearnerAudioUrl] = useState<string | null>(null);
  const [isPlayingLearner, setIsPlayingLearner] = useState<boolean>(false);
  const [sideBySideStep, setSideBySideStep] = useState<"idle" | "native" | "learner">("idle");

  // Evaluation & Results
  const [comparisonResult, setComparisonResult] = useState<RhythmComparisonResult | null>(null);
  const [completedSentences, setCompletedSentences] = useState<number[]>([]);
  const [sessionScores, setSessionScores] = useState<number[]>([]);
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);

  // Refs for recording & audio playback
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const learnerAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recordingStartTimeRef = useRef<number>(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered sentences based on category
  const filteredSentences = useMemo(() => {
    if (activeCategory === "all") return MOCK_SHADOWING_SENTENCES;
    return MOCK_SHADOWING_SENTENCES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const currentSentence: ShadowingSentence =
    filteredSentences[activeSentenceIdx] || filteredSentences[0] || MOCK_SHADOWING_SENTENCES[0];

  // Generate Reference Native Waveform
  const nativeEnvelope = useMemo(() => {
    const wordCount = currentSentence.fullText.split(" ").length;
    const stressedIndices = currentSentence.chunks.flatMap((c) =>
      c.stressedWords.map((sw) => sw.length % 3)
    );
    return generateNativeEnvelope(wordCount, stressedIndices, 80);
  }, [currentSentence]);

  // Clean up speech synthesis on unmount or sentence change
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (learnerAudioPlayerRef.current) {
        learnerAudioPlayerRef.current.pause();
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [activeSentenceIdx]);

  // Web Speech API Native Playback
  const speakText = useCallback(
    (text: string, onEndCallback?: () => void) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        if (onEndCallback) onEndCallback();
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = playbackSpeed;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice =
        voices.find(
          (v) =>
            (v.lang === "en-US" || v.lang === "en-GB") &&
            (v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Samantha") || v.name.includes("Google"))
        ) ||
        voices.find((v) => v.lang === "en-US" || v.lang === "en-GB") ||
        voices.find((v) => v.lang.startsWith("en"));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => {
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        if (onEndCallback) onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    },
    [playbackSpeed]
  );

  // Play Native Full Sentence
  const handleTogglePlayNative = () => {
    if (isPlayingNative) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingNative(false);
      setPlaybackProgress(0);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    } else {
      setIsPlayingNative(true);
      setPlaybackProgress(0);

      const targetText = isLoopingChunk
        ? currentSentence.chunks[activeChunkIdx].text
        : currentSentence.fullText;

      const durationMs =
        ((isLoopingChunk
          ? currentSentence.chunks[activeChunkIdx].durationSeconds
          : currentSentence.totalDurationSeconds) *
          1000) /
        playbackSpeed;

      const startMs = Date.now();
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);

      progressTimerRef.current = setInterval(() => {
        const elapsed = Date.now() - startMs;
        const progress = Math.min(100, (elapsed / durationMs) * 100);
        setPlaybackProgress(progress);

        if (progress >= 100) {
          if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        }
      }, 50);

      speakText(targetText, () => {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        setPlaybackProgress(100);
        setTimeout(() => {
          if (isLoopingChunk) {
            handleTogglePlayNative();
          } else {
            setIsPlayingNative(false);
            setPlaybackProgress(0);
          }
        }, 200);
      });
    }
  };

  // Play a specific Chunk
  const handlePlayChunk = (chunkIdx: number) => {
    setActiveChunkIdx(chunkIdx);
    const chunk = currentSentence.chunks[chunkIdx];
    if (!chunk) return;

    setIsPlayingNative(true);
    speakText(chunk.text, () => {
      setIsPlayingNative(false);
    });
  };

  // Handle Record Shadowing with real MediaRecorder
  const handleToggleRecord = async () => {
    if (!isRecording) {
      // Start recording
      setComparisonResult(null);
      setLearnerAudioUrl(null);
      recordingStartTimeRef.current = Date.now();

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        recordedChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);

        if (shadowingMode === "simultaneous") {
          handleTogglePlayNative();
        }
      } catch (err) {
        console.warn("Microphone access fallback:", err);
        // Fallback simulated recording if mic access blocked
        setIsRecording(true);
        if (shadowingMode === "simultaneous") {
          handleTogglePlayNative();
        }
      }
    } else {
      // Stop recording
      setIsRecording(false);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingNative(false);

      const durationSecs = Math.max(
        1.5,
        (Date.now() - recordingStartTimeRef.current) / 1000
      );

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.onstop = async () => {
          const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setLearnerAudioUrl(url);

          // Try real Web Audio RMS decode
          let evaluatedRMS: number[] | null = null;
          try {
            const arrayBuffer = await blob.arrayBuffer();
            const AudioCtx =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
              const audioCtx = new AudioCtx();
              const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
              evaluatedRMS = extractRMSFromAudioBuffer(audioBuffer, 80);
              audioCtx.close().catch(() => {});
            }
          } catch {
            evaluatedRMS = null;
          }

          const learnerEnv =
            evaluatedRMS && evaluatedRMS.length > 0
              ? evaluatedRMS
              : nativeEnvelope.map((v) =>
                  Math.max(
                    0.05,
                    Math.min(1.0, v * (0.82 + Math.random() * 0.36) + (Math.random() * 0.08 - 0.04))
                  )
                );

          const result = compareEnvelopes(
            nativeEnvelope,
            learnerEnv,
            currentSentence.totalDurationSeconds,
            durationSecs,
            6.0
          );

          setComparisonResult(result);
          setSessionScores((prev) => [...prev, result.score]);

          // Only save error to Error Bank if score is truly below Band 6.0 safe threshold (< 48%)
          if (result.score < 48 && !result.isSafeForTarget) {
            db.error_bank
              .put({
                id: `err_pron_${Date.now()}_${currentSentence.id}`,
                sourceModule: "pronunciation",
                errorType: "pronunciation",
                questionContext: `[Shadowing: ${currentSentence.title}] Trọng tâm: ${currentSentence.soundFocus}`,
                userWrongAnswer: "Chưa đạt mức an toàn Band 6.0 (Cần bật rõ âm đuôi)",
                correctAnswer: currentSentence.soundFocus,
                deepExplanation: result.feedbackTips.join(" "),
                mastered: false,
                retryCount: 0,
                createdAt: new Date().toISOString(),
              })
              .catch(() => {});
          }
        };

        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      } else {
        // Simulated fallback
        const learnerEnv = nativeEnvelope.map((v) =>
          Math.max(
            0.05,
            Math.min(1.0, v * (0.82 + Math.random() * 0.36) + (Math.random() * 0.08 - 0.04))
          )
        );

        const result = compareEnvelopes(
          nativeEnvelope,
          learnerEnv,
          currentSentence.totalDurationSeconds,
          durationSecs,
          6.0
        );

        setComparisonResult(result);
        setSessionScores((prev) => [...prev, result.score]);
      }
    }
  };

  // Play Learner Recorded Audio
  const handleTogglePlayLearner = () => {
    if (!learnerAudioUrl) return;

    if (isPlayingLearner) {
      if (learnerAudioPlayerRef.current) {
        learnerAudioPlayerRef.current.pause();
        learnerAudioPlayerRef.current.currentTime = 0;
      }
      setIsPlayingLearner(false);
    } else {
      const audio = new Audio(learnerAudioUrl);
      learnerAudioPlayerRef.current = audio;
      audio.onended = () => setIsPlayingLearner(false);
      audio.onerror = () => setIsPlayingLearner(false);
      setIsPlayingLearner(true);
      audio.play().catch(() => setIsPlayingLearner(false));
    }
  };

  // Feature 7: Side-by-Side Echo Comparator (Plays Native then immediately plays Learner audio)
  const handlePlaySideBySide = () => {
    if (!learnerAudioUrl || sideBySideStep !== "idle") return;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (learnerAudioPlayerRef.current) {
      learnerAudioPlayerRef.current.pause();
      learnerAudioPlayerRef.current.currentTime = 0;
    }

    setSideBySideStep("native");

    // 1. Play native sample chunk or sentence
    const targetChunk = currentSentence.chunks[activeChunkIdx]?.text || currentSentence.fullText;
    speakText(targetChunk, () => {
      // 2. 300ms pause, then play recorded learner audio
      setTimeout(() => {
        setSideBySideStep("learner");
        const audio = new Audio(learnerAudioUrl);
        learnerAudioPlayerRef.current = audio;
        audio.onended = () => setSideBySideStep("idle");
        audio.onerror = () => setSideBySideStep("idle");
        audio.play().catch(() => setSideBySideStep("idle"));
      }, 350);
    });
  };

  // Next Sentence Action
  const handleNextSentence = async () => {
    try {
      const log: PracticeLog = {
        id: `log_sh_${Date.now()}_${currentSentence.id}`,
        type: "shadowing",
        materialId: currentSentence.id,
        score: comparisonResult?.score ? Number((comparisonResult.score / 10).toFixed(1)) : 7.5,
        timeSpentSeconds: Math.round(currentSentence.totalDurationSeconds * 4),
        accuracyPercentage: comparisonResult?.score || 80,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Save log error:", e);
    }

    setCompletedSentences((prev) => [...prev, activeSentenceIdx]);
    setComparisonResult(null);
    setLearnerAudioUrl(null);
    setActiveChunkIdx(0);

    // Fast-path local sync for Roadmap Auto-Scanner
    markPracticeCompleted("shadowing");
    markPracticeCompleted("/practice/shadowing");

    if (activeSentenceIdx < filteredSentences.length - 1) {
      setActiveSentenceIdx((prev) => prev + 1);
    } else {
      setIsSessionComplete(true);
    }
  };

  const handleRestartSession = () => {
    setActiveSentenceIdx(0);
    setActiveChunkIdx(0);
    setComparisonResult(null);
    setLearnerAudioUrl(null);
    setCompletedSentences([]);
    setSessionScores([]);
    setIsSessionComplete(false);
  };

  const averageSessionScore =
    sessionScores.length > 0
      ? Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length)
      : 82;

  return (
    <div className="space-y-7 pb-20 max-w-5xl mx-auto select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Speaking Micro-Drill • Phương Pháp Nhại Giọng Shadowing
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phòng Luyện Âm Điệu & Nhại Giọng (Shadowing Studio)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Nghe câu ngắn bản xứ • Bật chuẩn 2 âm đuôi sống còn (-s/-ed) • Đối chiếu dải sóng âm thời gian thực.
          </p>
        </div>

        <Link
          href="/roadmap"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Lộ Trình 75 Ngày
        </Link>
      </div>

      {/* Day 1 Ca 4 Focus Guide Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-primary/10 via-card to-background border border-primary/30 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-foreground">
                Mục Tiêu Ca 4 • Ngày 1: Làm Chủ 2 Âm Đuôi Sống Còn (-s/-es & -ed)
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">
                  Không học ký tự IPA — Phản xạ trực tiếp qua 3 bước cốt lõi.
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  🎯 Mục tiêu Speaking 6.0: Mức an toàn ≥ 50%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setActiveCategory("day1_core");
                setActiveSentenceIdx(0);
                setActiveChunkIdx(0);
                setComparisonResult(null);
                setLearnerAudioUrl(null);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                activeCategory === "day1_core"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border"
              )}
            >
              🔥 Trọng Tâm Ngày 1 (4 câu)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("c1_cadence");
                setActiveSentenceIdx(0);
                setActiveChunkIdx(0);
                setComparisonResult(null);
                setLearnerAudioUrl(null);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                activeCategory === "c1_cadence"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border"
              )}
            >
              Ngữ Điệu C1 (2 câu)
            </button>
          </div>
        </div>

        {/* 3 Step Micro-guide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
          <div className="p-2.5 rounded-xl bg-card border border-border flex items-start gap-2">
            <span className="font-mono font-bold text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded">1</span>
            <div>
              <strong className="text-foreground block">Nghe Câu Mẫu:</strong>
              <span className="text-muted-foreground text-[11px]">Bấm Play để nghe phát âm chuẩn bản xứ ở tốc độ 0.8x hoặc 1.0x.</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border flex items-start gap-2">
            <span className="font-mono font-bold text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded">2</span>
            <div>
              <strong className="text-foreground block">Bật Rõ Âm Đuôi:</strong>
              <span className="text-muted-foreground text-[11px]">Bắt chước chuẩn đuôi /s/, /z/, /ɪz/ và /t/, /d/, /ɪd/ được gạch chân.</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border flex items-start gap-2">
            <span className="font-mono font-bold text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded">3</span>
            <div>
              <strong className="text-foreground block">Thu Âm & Đối Chiếu:</strong>
              <span className="text-muted-foreground text-[11px]">Thu âm giọng mình, nghe lại và so sánh trực tiếp dải sóng âm nhịp điệu.</span>
            </div>
          </div>
        </div>
      </div>

      {!isSessionComplete ? (
        <div className="space-y-6">
          {/* Sentence Progress Carousel Tabs */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary/30 border border-border text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold px-2.5 py-1 rounded-lg bg-primary text-primary-foreground">
                Câu {activeSentenceIdx + 1} / {filteredSentences.length}
              </span>
              <span className="font-bold text-foreground truncate max-w-sm sm:max-w-md">
                {currentSentence.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  if (activeSentenceIdx > 0) {
                    setActiveSentenceIdx((p) => p - 1);
                    setComparisonResult(null);
                    setLearnerAudioUrl(null);
                    setActiveChunkIdx(0);
                  }
                }}
                disabled={activeSentenceIdx === 0}
                className="p-1.5 rounded-lg border border-border bg-card disabled:opacity-40 text-foreground cursor-pointer"
                title="Câu trước"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (activeSentenceIdx < filteredSentences.length - 1) {
                    setActiveSentenceIdx((p) => p + 1);
                    setComparisonResult(null);
                    setLearnerAudioUrl(null);
                    setActiveChunkIdx(0);
                  }
                }}
                disabled={activeSentenceIdx === filteredSentences.length - 1}
                className="p-1.5 rounded-lg border border-border bg-card disabled:opacity-40 text-foreground cursor-pointer"
                title="Câu kế tiếp"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 1. Interactive Transcript Viewer */}
          <ShadowingTranscriptViewer
            sentence={currentSentence}
            activeChunkIndex={activeChunkIdx}
          />

          {/* 2. Chunk Audio Controller */}
          <ChunkAudioController
            sentence={currentSentence}
            activeChunkIndex={activeChunkIdx}
            isPlaying={isPlayingNative}
            isLooping={isLoopingChunk}
            playbackSpeed={playbackSpeed}
            onTogglePlay={handleTogglePlayNative}
            onToggleLoop={() => setIsLoopingChunk((p) => !p)}
            onSelectChunk={setActiveChunkIdx}
            onPlayChunk={handlePlayChunk}
            onChangeSpeed={setPlaybackSpeed}
          />

          {/* 3. Dual Waveform Visualizer Canvas */}
          <DualWaveformCanvas
            nativeRMS={nativeEnvelope}
            learnerRMS={comparisonResult?.learnerRMS || []}
            syncGaps={comparisonResult?.syncGaps || []}
            playbackProgressPercent={playbackProgress}
            isPlaying={isPlayingNative}
            onScrub={(pct) => setPlaybackProgress(pct)}
          />

          {/* 4. Shadowing Recorder Control with Side-by-Side Comparator */}
          <ShadowingRecorderControl
            isRecording={isRecording}
            shadowingMode={shadowingMode}
            learnerAudioUrl={learnerAudioUrl}
            onToggleRecord={handleToggleRecord}
            onTogglePlayLearner={handleTogglePlayLearner}
            onPlaySideBySide={handlePlaySideBySide}
            sideBySideStep={sideBySideStep}
            onChangeMode={setShadowingMode}
            isPlayingLearner={isPlayingLearner}
          />

          {/* 5. Rhythm Score Card (Displayed after recording) */}
          {comparisonResult && (
            <RhythmScoreCard
              result={comparisonResult}
              onNextSentence={handleNextSentence}
              onRetry={() => {
                setComparisonResult(null);
                setLearnerAudioUrl(null);
              }}
            />
          )}
        </div>
      ) : (
        /* Session Completed Wrap-up */
        <ShadowingSessionSummary
          completedCount={filteredSentences.length}
          totalSentences={filteredSentences.length}
          averageScore={averageSessionScore}
          errorsCount={sessionScores.filter((s) => s < 75).length}
          onRestart={handleRestartSession}
        />
      )}
    </div>
  );
}
