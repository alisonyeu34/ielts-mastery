"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  MOCK_SECTION4_LECTURES,
  Section4Lecture,
  ShorthandQuestion
} from "@/data/mockShorthandLecturesData";
import {
  autoExpandShorthandText,
  validateSection4Answer,
  AnswerValidationResult
} from "@/lib/shorthandLexiconEngine";
import { db } from "@/lib/db";

export type SessionPhase = "listen_and_shorthand" | "reconstruction_sprint" | "review_summary";

export function useAcademicShorthandSession(initialLectureId?: string) {
  const [selectedLectureId, setSelectedLectureId] = useState<string>(
    initialLectureId || MOCK_SECTION4_LECTURES[0].id
  );

  const currentLecture: Section4Lecture = useMemo(() => {
    return (
      MOCK_SECTION4_LECTURES.find((l) => l.id === selectedLectureId) ||
      MOCK_SECTION4_LECTURES[0]
    );
  }, [selectedLectureId]);

  // Phase management
  const [phase, setPhase] = useState<SessionPhase>("listen_and_shorthand");

  // Phase 1: Shorthand Audio & Note Taking
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [rawNotes, setRawNotes] = useState<string>("");
  const [lastKeystrokeTime, setLastKeystrokeTime] = useState<number>(Date.now());
  const [latencyWarning, setLatencyWarning] = useState<boolean>(false);

  // Phase 2: Reconstruction Sprint
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [sprintTimeRemaining, setSprintTimeRemaining] = useState<number>(120); // 2 minutes sprint
  const [isSprintTimerActive, setIsSprintTimerActive] = useState<boolean>(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Audio simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = prev + 1 * playbackSpeed;
          if (nextTime >= currentLecture.durationSeconds) {
            setIsPlaying(false);
            return currentLecture.durationSeconds;
          }
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, currentLecture.durationSeconds]);

  // Reconstruction Sprint Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === "reconstruction_sprint" && isSprintTimerActive && sprintTimeRemaining > 0) {
      interval = setInterval(() => {
        setSprintTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsSprintTimerActive(false);
            setPhase("review_summary");
            setIsSummaryOpen(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, isSprintTimerActive, sprintTimeRemaining]);

  // Handle note taking with auto expansion and latency warning
  const handleNoteChange = (text: string) => {
    const expanded = autoExpandShorthandText(text);
    setRawNotes(expanded);

    const now = Date.now();
    const intervalFromLastKey = (now - lastKeystrokeTime) / 1000;
    if (isPlaying && intervalFromLastKey > 4.5 && text.length > 10) {
      setLatencyWarning(true);
    } else {
      setLatencyWarning(false);
    }
    setLastKeystrokeTime(now);
  };

  const insertSymbolToNotes = (symbol: string) => {
    setRawNotes((prev) => prev + " " + symbol + " ");
  };

  const handleSelectLecture = (id: string) => {
    setSelectedLectureId(id);
    setPhase("listen_and_shorthand");
    setIsPlaying(false);
    setCurrentTime(0);
    setRawNotes("");
    setUserAnswers({});
    setSprintTimeRemaining(120);
    setIsSprintTimerActive(false);
    setIsSummaryOpen(false);
    setIsSaved(false);
    setLatencyWarning(false);
  };

  const handleAnswerInput = (questionId: string, val: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: val
    }));
  };

  const startReconstructionSprint = () => {
    setIsPlaying(false);
    setPhase("reconstruction_sprint");
    setIsSprintTimerActive(true);
    setSprintTimeRemaining(120);
  };

  // Grade user responses
  const gradingResults = useMemo(() => {
    return currentLecture.questions.map((q) => {
      const uAnswer = userAnswers[q.id] || "";
      const validation = validateSection4Answer(
        uAnswer,
        q.expectedAnswer,
        q.acceptableAlternatives,
        q.maxWords,
        q.distractor
      );
      return {
        question: q,
        validation
      };
    });
  }, [currentLecture, userAnswers]);

  const totalScore = useMemo(() => {
    return gradingResults.filter((r) => r.validation.isCorrect).length;
  }, [gradingResults]);

  const singularPluralErrors = useMemo(() => {
    return gradingResults.filter((r) => r.validation.errorClassification === "singular_plural");
  }, [gradingResults]);

  const saveResultsToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `shorthand_log_${Date.now()}`,
        type: "academic_shorthand",
        title: `Section 4 Shorthand: ${currentLecture.title}`,
        score: Number(((totalScore / currentLecture.questions.length) * 9).toFixed(1)),
        totalQuestions: currentLecture.questions.length,
        accuracyPercentage: Math.round((totalScore / currentLecture.questions.length) * 100),
        timeSpentSeconds: 120 - sprintTimeRemaining + currentTime,
        details: {
          totalScore,
          singularPluralErrors: singularPluralErrors.length
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Save individual errors to Error Bank
      for (const res of gradingResults) {
        if (!res.validation.isCorrect) {
          await db.error_bank.put({
            id: `err_shorthand_${res.question.id}_${Date.now()}`,
            sourceModule: "listening",
            errorType: res.validation.errorClassification === "singular_plural" ? "singular_plural" : "careless_reading",
            questionContext: res.question.sentencePrompt,
            userWrongAnswer: res.validation.userAnswer || "(Empty)",
            correctAnswer: res.question.expectedAnswer,
            deepExplanation: res.validation.diagnosticExplanation,
            mastered: false,
            retryCount: 1,
            createdAt: new Date().toISOString()
          });
        }
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save shorthand session:", err);
    }
  }, [totalScore, currentLecture, sprintTimeRemaining, currentTime, singularPluralErrors, gradingResults]);

  return {
    currentLecture,
    allLectures: MOCK_SECTION4_LECTURES,
    selectedLectureId,
    handleSelectLecture,
    phase,
    setPhase,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    playbackSpeed,
    setPlaybackSpeed,
    rawNotes,
    handleNoteChange,
    insertSymbolToNotes,
    latencyWarning,
    userAnswers,
    handleAnswerInput,
    sprintTimeRemaining,
    isSprintTimerActive,
    startReconstructionSprint,
    gradingResults,
    totalScore,
    singularPluralErrors,
    isSummaryOpen,
    setIsSummaryOpen,
    isSaved,
    saveResultsToDatabase
  };
}
