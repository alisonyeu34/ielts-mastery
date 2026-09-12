"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { db } from "@/lib/db";
import {
  evaluateWritingEssay,
  evaluateSpeakingAudio,
  convertToErrorBankItems,
  AIGradingReportRecord,
  C1UpgradeItem,
} from "@/lib/aiGraderAPIClient";

export interface WritingTaskConfig {
  taskType: "task1" | "task2";
  title: string;
  prompt: string;
  targetWords: number;
  timeLimitMinutes: number;
  diagramUrl?: string;
}

export const DEFAULT_WRITING_PROMPTS: WritingTaskConfig[] = [
  {
    taskType: "task1",
    title: "Task 1: Renewable Energy Generation (Line Graph)",
    prompt: "The line graph below shows renewable electricity generation (in Terawatt-hours) across four countries between 2010 and 2025. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
    targetWords: 150,
    timeLimitMinutes: 20,
  },
  {
    taskType: "task2",
    title: "Task 2: Academic Curriculum vs Vocational Training (Discussion & Opinion)",
    prompt: "Some people believe that universities should focus exclusively on providing specialized vocational skills for the job market. Others argue that universities should offer a comprehensive academic education regardless of immediate employment prospects. Discuss both views and give your own opinion.",
    targetWords: 250,
    timeLimitMinutes: 40,
  },
];

export const DEFAULT_SPEAKING_PROMPTS = [
  {
    part: "part1",
    topic: "Hometown & Urban Living",
    question: "Do you prefer living in a bustling city or in a quiet countryside? Why?",
    suggestedDurationSec: 45,
  },
  {
    part: "part2_3",
    topic: "Describe an Environmental Initiative (Part 2 Cue Card)",
    question: "Describe a law or initiative in your country that aims to protect the environment. You should say: what it is, when it was introduced, how it works, and explain whether you think it is effective.",
    suggestedDurationSec: 120,
  },
];

export function useAIGradingSession() {
  // Mode selection: "writing" | "speaking"
  const [activeTab, setActiveTab] = useState<"writing" | "speaking">("writing");

  // --- Writing State ---
  const [selectedWritingPrompt, setSelectedWritingPrompt] = useState<WritingTaskConfig>(DEFAULT_WRITING_PROMPTS[1]);
  const [writingEssay, setWritingEssay] = useState<string>("");
  const [isWritingTimerRunning, setIsWritingTimerRunning] = useState<boolean>(false);
  const [writingSecondsRemaining, setWritingSecondsRemaining] = useState<number>(40 * 60);
  const [isAnalyzingWriting, setIsAnalyzingWriting] = useState<boolean>(false);

  // --- Speaking State ---
  const [selectedSpeakingPrompt, setSelectedSpeakingPrompt] = useState(DEFAULT_SPEAKING_PROMPTS[0]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAnalyzingSpeaking, setIsAnalyzingSpeaking] = useState<boolean>(false);
  const [audioWaveformLevels, setAudioWaveformLevels] = useState<number[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Results & Modals ---
  const [currentReport, setCurrentReport] = useState<AIGradingReportRecord | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [activeUpgraderItem, setActiveUpgraderItem] = useState<C1UpgradeItem | null>(null);
  const [isUpgraderDrawerOpen, setIsUpgraderDrawerOpen] = useState<boolean>(false);

  // Countdown timer for writing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWritingTimerRunning && writingSecondsRemaining > 0) {
      timer = setInterval(() => {
        setWritingSecondsRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isWritingTimerRunning, writingSecondsRemaining]);

  // Handle prompt change for writing
  const handleSelectWritingPrompt = useCallback((config: WritingTaskConfig) => {
    setSelectedWritingPrompt(config);
    setWritingSecondsRemaining(config.timeLimitMinutes * 60);
    setIsWritingTimerRunning(false);
  }, []);

  // Submit Writing for AI Evaluation
  const submitWriting = useCallback(async () => {
    if (!writingEssay.trim()) return;

    setIsAnalyzingWriting(true);
    try {
      const report = await evaluateWritingEssay(
        writingEssay,
        selectedWritingPrompt.prompt,
        selectedWritingPrompt.taskType
      );

      setCurrentReport(report);
      setIsReportModalOpen(true);
      setIsWritingTimerRunning(false);

      // Save to Dexie DB (ai_submissions and practice_logs)
      try {
        await db.ai_submissions.put({
          id: report.id,
          skill: report.skillType,
          promptQuestion: report.promptText,
          userContent: report.userSubmission,
          wordCount: report.wordCount,
          scores: {
            tr: report.scores.criteria1,
            cc: report.scores.criteria2,
            lr: report.scores.criteria3,
            gra: report.scores.criteria4,
            overall: report.scores.overallBand,
          },
          detailedFeedback: {
            grammarErrors: report.feedbackComments.detectedErrors.map((e) => ({
              original: e.original,
              corrected: e.corrected,
              rule: e.rule,
            })),
            c1Upgrades: report.feedbackComments.upgradedSentences.map((u) => ({
              original: u.original,
              upgraded: u.upgraded,
              explanation: u.explanation,
            })),
            generalComment: report.feedbackComments.generalComment,
          },
          createdAt: report.createdAt,
        });

        // Inject detected errors into db.error_bank
        const errorItems = convertToErrorBankItems(report);
        if (errorItems.length > 0) {
          await db.error_bank.bulkPut(errorItems);
        }

        // Log to practice_logs
        await db.practice_logs.put({
          id: `log_ai_writing_${Date.now()}`,
          type: "writing_grader",
          materialId: selectedWritingPrompt.taskType,
          title: `Writing AI Grader: ${selectedWritingPrompt.title}`,
          score: Math.round(report.scores.overallBand * 10),
          timeSpentSeconds: selectedWritingPrompt.timeLimitMinutes * 60 - writingSecondsRemaining,
          accuracyPercentage: Math.round((report.scores.overallBand / 9) * 100),
          createdAt: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.error("Failed to sync AI grading to Dexie DB:", dbErr);
      }
    } catch (e) {
      console.error("AI Writing Grading Error:", e);
    } finally {
      setIsAnalyzingWriting(false);
    }
  }, [writingEssay, selectedWritingPrompt, writingSecondsRemaining]);

  // Start Speaking Recording
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingSeconds(0);

      // Waveform simulation
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
        setAudioWaveformLevels((prev) => {
          const nextLevel = Math.floor(Math.random() * 80) + 20;
          return [...prev.slice(-30), nextLevel];
        });
      }, 1000);
    } catch (err) {
      console.warn("Microphone access unavailable, using simulated recording mode:", err);
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
        setAudioWaveformLevels((prev) => {
          const nextLevel = Math.floor(Math.random() * 80) + 20;
          return [...prev.slice(-30), nextLevel];
        });
      }, 1000);
    }
  }, []);

  // Stop Speaking Recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.error("Error stopping media recorder:", e);
      }
    }
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
  }, [isRecording]);

  // Submit Speaking for AI Evaluation
  const submitSpeaking = useCallback(async () => {
    setIsAnalyzingSpeaking(true);
    try {
      const report = await evaluateSpeakingAudio(
        audioBlob,
        selectedSpeakingPrompt.question,
        selectedSpeakingPrompt.part as "part1" | "part2_3",
        recordingSeconds || 45
      );

      setCurrentReport(report);
      setIsReportModalOpen(true);

      // Save to Dexie DB
      try {
        await db.ai_submissions.put({
          id: report.id,
          skill: report.skillType,
          promptQuestion: report.promptText,
          userContent: "[Recorded Audio Stream]",
          wordCount: report.wordCount,
          scores: {
            tr: report.scores.criteria1,
            cc: report.scores.criteria2,
            lr: report.scores.criteria3,
            gra: report.scores.criteria4,
            overall: report.scores.overallBand,
          },
          detailedFeedback: {
            grammarErrors: report.feedbackComments.detectedErrors.map((e) => ({
              original: e.original,
              corrected: e.corrected,
              rule: e.rule,
            })),
            c1Upgrades: report.feedbackComments.upgradedSentences.map((u) => ({
              original: u.original,
              upgraded: u.upgraded,
              explanation: u.explanation,
            })),
            generalComment: report.feedbackComments.generalComment,
          },
          createdAt: report.createdAt,
        });

        const errorItems = convertToErrorBankItems(report);
        if (errorItems.length > 0) {
          await db.error_bank.bulkPut(errorItems);
        }

        await db.practice_logs.put({
          id: `log_ai_speaking_${Date.now()}`,
          type: "speaking_grader",
          materialId: selectedSpeakingPrompt.part,
          title: `Speaking AI Grader: ${selectedSpeakingPrompt.topic}`,
          score: Math.round(report.scores.overallBand * 10),
          timeSpentSeconds: recordingSeconds,
          accuracyPercentage: Math.round((report.scores.overallBand / 9) * 100),
          createdAt: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.error("Failed to sync AI speaking grading to Dexie:", dbErr);
      }
    } catch (e) {
      console.error("AI Speaking Grading Error:", e);
    } finally {
      setIsAnalyzingSpeaking(false);
    }
  }, [audioBlob, selectedSpeakingPrompt, recordingSeconds]);

  const openUpgraderDrawer = useCallback((item: C1UpgradeItem) => {
    setActiveUpgraderItem(item);
    setIsUpgraderDrawerOpen(true);
  }, []);

  const closeUpgraderDrawer = useCallback(() => {
    setIsUpgraderDrawerOpen(false);
    setActiveUpgraderItem(null);
  }, []);

  return {
    activeTab,
    setActiveTab,
    // Writing
    selectedWritingPrompt,
    handleSelectWritingPrompt,
    writingEssay,
    setWritingEssay,
    isWritingTimerRunning,
    setIsWritingTimerRunning,
    writingSecondsRemaining,
    isAnalyzingWriting,
    submitWriting,
    // Speaking
    selectedSpeakingPrompt,
    setSelectedSpeakingPrompt,
    isRecording,
    recordingSeconds,
    audioUrl,
    audioWaveformLevels,
    isAnalyzingSpeaking,
    startRecording,
    stopRecording,
    submitSpeaking,
    // Modals
    currentReport,
    isReportModalOpen,
    setIsReportModalOpen,
    activeUpgraderItem,
    isUpgraderDrawerOpen,
    openUpgraderDrawer,
    closeUpgraderDrawer,
  };
}
