"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  MOCK_SECTION3_CONSENSUS_DATA,
  Section3ConsensusExerciseData,
  DialogueTurn,
  S3MultipleChoiceQuestion,
  S3MatchingQuestion,
} from "@/data/mockSection3ConsensusData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export function useSection3Session() {
  const data = MOCK_SECTION3_CONSENSUS_DATA;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, string[]>>({});
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(
    data.mcQuestions[0].id
  );

  // Audio Playback
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(data.totalAudioDurationSeconds);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Blind Mode (Hide transcript while listening)
  const [isBlindMode, setIsBlindMode] = useState<boolean>(true);

  // Review & Forensic Mode
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isForensicActive, setIsForensicActive] = useState<boolean>(false);
  const [focusedConsensusQuestionId, setFocusedConsensusQuestionId] = useState<number | null>(
    data.mcQuestions[0].id
  );

  // Modals
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showDisagreementModal, setShowDisagreementModal] = useState<boolean>(false);

  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active Dialogue Turn & Speaker based on currentTime
  const currentTurn = useMemo<DialogueTurn | null>(() => {
    return (
      data.dialogueTurns.find(
        (t) => currentTime >= t.startTime && currentTime <= t.endTime
      ) || null
    );
  }, [data.dialogueTurns, currentTime]);

  const activeSpeakerId = currentTurn?.speakerId || null;

  // Answer Assignment
  const setAnswer = useCallback((questionId: number, option: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  }, [isSubmitted]);

  // Strike-through elimination toggle
  const toggleEliminateOption = useCallback((questionId: number, option: string) => {
    setEliminatedOptions((prev) => {
      const currentList = prev[questionId] || [];
      const updated = currentList.includes(option)
        ? currentList.filter((o) => o !== option)
        : [...currentList, option];
      return {
        ...prev,
        [questionId]: updated,
      };
    });
  }, []);

  // Audio Controls Simulation
  const playAudio = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pauseAudio = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const seekToSecond = useCallback((seconds: number) => {
    setCurrentTime(Math.min(data.totalAudioDurationSeconds, Math.max(0, seconds)));
  }, [data.totalAudioDurationSeconds]);

  // Jump to turn
  const jumpToSpeakerTurn = useCallback((turnId: number) => {
    const turn = data.dialogueTurns.find((t) => t.turnId === turnId);
    if (turn) {
      seekToSecond(turn.startTime);
      setIsPlaying(true);
    }
  }, [data.dialogueTurns, seekToSecond]);

  // Jump to question evidence
  const jumpToQuestionEvidence = useCallback((questionId: number) => {
    const mcQ = data.mcQuestions.find((q) => q.id === questionId);
    const matchQ = data.matchingQuestions.find((q) => q.id === questionId);
    const targetSeconds = mcQ?.audioTimestampSeconds || matchQ?.audioTimestampSeconds || 0;

    seekToSecond(targetSeconds);
    setSelectedQuestionId(questionId);
    setFocusedConsensusQuestionId(mcQ ? questionId : null);
    setIsPlaying(true);
  }, [data.mcQuestions, data.matchingQuestions, seekToSecond]);

  // Audio timeline ticker
  useEffect(() => {
    if (isPlaying) {
      audioTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= data.totalAudioDurationSeconds) {
            setIsPlaying(false);
            return data.totalAudioDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    }

    return () => {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    };
  }, [isPlaying, playbackRate, data.totalAudioDurationSeconds]);

  // Compute Scores
  const scoreResult = useMemo(() => {
    let correctCount = 0;
    const totalCount = data.mcQuestions.length + data.matchingQuestions.length;

    const mcDetails = data.mcQuestions.map((q) => {
      const userAns = answers[q.id] || "";
      const isCorrect = userAns.toUpperCase() === q.correctOption.toUpperCase();
      if (isCorrect) correctCount++;
      return {
        id: q.id,
        prompt: q.prompt,
        userAnswer: userAns,
        correctOption: q.correctOption,
        isCorrect,
        consensusFlow: q.consensusFlow,
        explanationVi: q.explanationVi,
      };
    });

    const matchingDetails = data.matchingQuestions.map((q) => {
      const userAns = answers[q.id] || "";
      const isCorrect = userAns.toUpperCase() === q.correctOption.toUpperCase();
      if (isCorrect) correctCount++;
      return {
        id: q.id,
        prompt: q.taskTitle,
        userAnswer: userAns,
        correctOption: q.correctOption,
        isCorrect,
        debateSummaryVi: q.debateSummaryVi,
      };
    });

    const accuracy = Math.round((correctCount / totalCount) * 100);

    return {
      correctCount,
      totalCount,
      accuracy,
      mcDetails,
      matchingDetails,
    };
  }, [answers, data.mcQuestions, data.matchingQuestions]);

  // Submit and Save to Dexie DB
  const submitTest = useCallback(async () => {
    setIsSubmitted(true);
    setIsForensicActive(true);
    setIsBlindMode(false);
    setShowSummaryModal(true);
    setIsPlaying(false);

    // Save Practice Log
    try {
      const log: PracticeLog = {
        id: `log_s3_${Date.now()}`,
        type: "listening_s3_consensus",
        materialId: data.id,
        score: scoreResult.correctCount,
        accuracyPercentage: scoreResult.accuracy,
        timeSpentSeconds: currentTime || 180,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving section 3 practice log:", e);
    }

    // Save Incorrect Answers into Error Bank
    for (const item of scoreResult.mcDetails) {
      if (!item.isCorrect) {
        try {
          await db.error_bank.put({
            id: `err_s3_q${item.id}_${Date.now()}`,
            sourceModule: "listening",
            errorType: "careless_reading",
            questionContext: `Listening Section 3 Consensus Trap: ${item.prompt}`,
            userWrongAnswer: item.userAnswer ? `Lựa chọn [${item.userAnswer}]` : "Chưa chọn",
            correctAnswer: `Phương án [${item.correctOption}]`,
            deepExplanation: `Bạn đã vội chọn đề xuất ban đầu của ${item.consensusFlow.rejectedProposal.speaker} (${item.consensusFlow.rejectedProposal.idea}). Cần chú ý lý do phản bác của ${item.consensusFlow.counterReason.speaker} và câu chốt hạ thỏa hiệp: "${item.consensusFlow.ultimateDecision.reversalQuote}".`,
            mastered: false,
            retryCount: 0,
            consecutiveSuccesses: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (e) {
          console.error("Error saving Section 3 MC error:", e);
        }
      }
    }

    for (const item of scoreResult.matchingDetails) {
      if (!item.isCorrect) {
        try {
          await db.error_bank.put({
            id: `err_s3_match_q${item.id}_${Date.now()}`,
            sourceModule: "listening",
            errorType: "careless_reading",
            questionContext: `Listening Section 3 Matching: ${item.prompt}`,
            userWrongAnswer: item.userAnswer ? `Người thực hiện [${item.userAnswer}]` : "Chưa chọn",
            correctAnswer: `Phương án [${item.correctOption}]`,
            deepExplanation: item.debateSummaryVi,
            mastered: false,
            retryCount: 0,
            consecutiveSuccesses: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (e) {
          console.error("Error saving Section 3 Matching error:", e);
        }
      }
    }
  }, [data, scoreResult, currentTime]);

  // Save Disagreement Vocabulary to FSRS
  const saveDisagreementVocabToFSRS = useCallback(async () => {
    for (const item of data.subtleDisagreementDrill) {
      const card: VocabCard = {
        id: `vocab_s3_${item.id}`,
        word: item.phrase,
        ipa: "/ˈdɪs.kɔːs/",
        meaning: item.meaningVi,
        collocations: [item.phrase, "Academic Negotiation"],
        originalContext: item.exampleContext,
        category: "topic_specific",
        status: "new",
        stepInterval: 1,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        sourceModule: "listening",
        createdAt: new Date().toISOString(),
      };
      try {
        await db.vocab_matrix.put(card);
      } catch (e) {
        console.error("Error saving Section 3 vocab:", e);
      }
    }
  }, [data.subtleDisagreementDrill]);

  const resetSession = useCallback(() => {
    setAnswers({});
    setEliminatedOptions({});
    setSelectedQuestionId(data.mcQuestions[0].id);
    setIsSubmitted(false);
    setIsForensicActive(false);
    setIsBlindMode(true);
    setFocusedConsensusQuestionId(data.mcQuestions[0].id);
    setCurrentTime(0);
    setIsPlaying(false);
    setShowSummaryModal(false);
  }, [data.mcQuestions]);

  return {
    data,
    answers,
    eliminatedOptions,
    selectedQuestionId,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    isBlindMode,
    isSubmitted,
    isForensicActive,
    focusedConsensusQuestionId,
    activeSpeakerId,
    currentTurn,
    showSummaryModal,
    showDisagreementModal,
    scoreResult,
    setSelectedQuestionId,
    setPlaybackRate,
    setIsBlindMode,
    setFocusedConsensusQuestionId,
    setAnswer,
    toggleEliminateOption,
    playAudio,
    pauseAudio,
    togglePlay,
    seekToSecond,
    jumpToSpeakerTurn,
    jumpToQuestionEvidence,
    submitTest,
    resetSession,
    saveDisagreementVocabToFSRS,
    setShowSummaryModal,
    setShowDisagreementModal,
    setIsForensicActive,
  };
}
