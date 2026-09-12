"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  PalaceRoomId,
  PacingBalanceAssessment,
  evaluatePacingBalance,
  getRoomByTime,
  SensoryAdjective
} from "@/lib/memoryPalacePacer";
import { MOCK_MEMORY_PALACE_PROMPTS, MemoryPalacePrompt } from "@/data/mockMemoryPalacePromptsData";
import { db } from "@/lib/db";

export type SessionPhase = 'idle' | 'prep' | 'speaking' | 'completed';

export function useMemoryPalaceSession(initialPromptId?: string) {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(
    initialPromptId || MOCK_MEMORY_PALACE_PROMPTS[0].id
  );

  const currentPrompt: MemoryPalacePrompt = useMemo(() => {
    return (
      MOCK_MEMORY_PALACE_PROMPTS.find((p) => p.id === selectedPromptId) ||
      MOCK_MEMORY_PALACE_PROMPTS[0]
    );
  }, [selectedPromptId]);

  // Session state
  const [phase, setPhase] = useState<SessionPhase>('idle');
  const [prepTimeRemaining, setPrepTimeRemaining] = useState<number>(60);
  const [speakingTime, setSpeakingTime] = useState<number>(0);
  const [activeRoomManual, setActiveRoomManual] = useState<PalaceRoomId>(1);

  // 4-room notes (max 3 keywords per room)
  const [roomNotes, setRoomNotes] = useState<Record<PalaceRoomId, string[]>>({
    1: [],
    2: [],
    3: [],
    4: []
  });

  // Timestamps when candidate entered each room
  const [roomTransitions, setRoomTransitions] = useState<number[]>([30, 60, 90]);

  // Audio recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Assessment & Modals
  const [pacingAssessment, setPacingAssessment] = useState<PacingBalanceAssessment | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isFormulaCardOpen, setIsFormulaCardOpen] = useState<boolean>(false);
  const [isSensoryPaletteOpen, setIsSensoryPaletteOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Audio refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Timer intervals
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speakingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active room calculation based on phase
  const activeRoom: PalaceRoomId = useMemo(() => {
    if (phase === 'speaking') {
      return getRoomByTime(speakingTime);
    }
    return activeRoomManual;
  }, [phase, speakingTime, activeRoomManual]);

  // Handle switching prompts
  const handleSelectPrompt = (promptId: string) => {
    resetSession();
    setSelectedPromptId(promptId);
  };

  // Populate sample plan into notes
  const handleLoadSamplePlan = () => {
    if (!currentPrompt) return;
    setRoomNotes({
      1: [...currentPrompt.samplePalacePlan.room1.keywords],
      2: [...currentPrompt.samplePalacePlan.room2.keywords],
      3: [...currentPrompt.samplePalacePlan.room3.keywords],
      4: [...currentPrompt.samplePalacePlan.room4.keywords]
    });
  };

  // Add keyword to a room (max 3)
  const handleAddKeyword = (roomId: PalaceRoomId, keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    setRoomNotes((prev) => {
      const currentList = prev[roomId] || [];
      if (currentList.length >= 3) return prev; // Limit to 3 keywords
      if (currentList.includes(trimmed)) return prev;
      return {
        ...prev,
        [roomId]: [...currentList, trimmed]
      };
    });
  };

  // Remove keyword from room
  const handleRemoveKeyword = (roomId: PalaceRoomId, index: number) => {
    setRoomNotes((prev) => ({
      ...prev,
      [roomId]: prev[roomId].filter((_, i) => i !== index)
    }));
  };

  // Insert sensory word from palette into room 2
  const handleInsertSensoryWord = (sensoryItem: SensoryAdjective) => {
    handleAddKeyword(2, `${sensoryItem.word} (${sensoryItem.meaningVi})`);
  };

  // Start Prep Phase (60s)
  const startPrepPhase = () => {
    setPhase('prep');
    setPrepTimeRemaining(60);
    setSpeakingTime(0);
    setAudioUrl(null);
    setIsSaved(false);

    if (prepTimerRef.current) clearInterval(prepTimerRef.current);

    prepTimerRef.current = setInterval(() => {
      setPrepTimeRemaining((prev) => {
        if (prev <= 1) {
          if (prepTimerRef.current) clearInterval(prepTimerRef.current);
          startSpeakingPhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start Speaking Phase (120s) with Web Audio Recording
  const startSpeakingPhase = useCallback(async () => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);

    setPhase('speaking');
    setSpeakingTime(0);
    setRoomTransitions([30, 60, 90]);

    // Start Audio Recording
    try {
      if (typeof window !== 'undefined' && navigator?.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        // Set up Web Audio analyzer for live waveform visualization
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        audioContextRef.current = audioCtx;
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const updateAudioMeter = () => {
          if (analyserRef.current) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
          }
          animFrameRef.current = requestAnimationFrame(updateAudioMeter);
        };
        updateAudioMeter();

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        };

        mediaRecorder.start(250);
        setIsRecording(true);
      }
    } catch {
      // Fallback if mic permission denied
      setIsRecording(true);
    }

    if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);

    speakingTimerRef.current = setInterval(() => {
      setSpeakingTime((prev) => {
        const nextTime = prev + 1;
        if (nextTime >= 120) {
          if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
          finishSpeaking(120);
          return 120;
        }
        return nextTime;
      });
    }, 1000);
  }, []);

  // Finish Speaking Phase
  const finishSpeaking = useCallback((finalDuration?: number) => {
    if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);

    const duration = finalDuration !== undefined ? finalDuration : speakingTime;

    // Stop recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }

    setIsRecording(false);
    setAudioLevel(0);
    setPhase('completed');

    // Run evaluation
    const assessment = evaluatePacingBalance(
      Math.max(1, duration),
      roomTransitions,
      roomNotes
    );
    setPacingAssessment(assessment);
    setIsSummaryModalOpen(true);
  }, [speakingTime, roomTransitions, roomNotes]);

  // Reset Session
  const resetSession = () => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    setPhase('idle');
    setPrepTimeRemaining(60);
    setSpeakingTime(0);
    setIsRecording(false);
    setAudioUrl(null);
    setAudioLevel(0);
    setPacingAssessment(null);
    setIsSummaryModalOpen(false);
    setIsSaved(false);
    setRoomNotes({ 1: [], 2: [], 3: [], 4: [] });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Save Results to Dexie DB
  const saveResultsToDatabase = useCallback(async () => {
    if (!pacingAssessment) return;
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `palace_log_${Date.now()}`,
        type: "memory_palace_speaking",
        title: `Memory Palace Speaking Part 2: ${currentPrompt.topic}`,
        score: pacingAssessment.fluencyBandEstimate,
        totalQuestions: 4,
        accuracyPercentage: pacingAssessment.balanceScore,
        timeSpentSeconds: pacingAssessment.totalDuration + 60,
        durationSeconds: pacingAssessment.totalDuration,
        details: {
          promptId: currentPrompt.id,
          category: currentPrompt.category,
          roomDurations: pacingAssessment.roomDurations,
          omittedRooms: pacingAssessment.omittedRooms,
          balanceScore: pacingAssessment.balanceScore,
          isUnderLength: pacingAssessment.isUnderLength
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Add to Error Bank if under-length or balance score < 70
      if (pacingAssessment.isUnderLength || pacingAssessment.balanceScore < 70) {
        await db.error_bank.put({
          id: `err_palace_${currentPrompt.id}_${Date.now()}`,
          sourceModule: "speaking",
          errorType: "careless_reading",
          questionContext: `Speaking Part 2 Cue Card: "${currentPrompt.topic}"`,
          userWrongAnswer: `Spoke for ${pacingAssessment.totalDuration}s (Under-length). Omitted: ${pacingAssessment.omittedRooms.join(", ") || "None"}`,
          correctAnswer: "Sustained 110-120s delivery across all 4 rooms of the Memory Palace",
          deepExplanation: pacingAssessment.warnings.join(" ") || "Bài nói bị ngắt quãng do phân bổ thời lượng không đều giữa các gian phòng.",
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      // 3. Save sensory adjectives into Vocab Matrix with FSRS
      for (const sensory of currentPrompt.sensorySuggestions) {
        await db.vocab_matrix.put({
          id: `vocab_sensory_${sensory.word.toLowerCase()}`,
          word: sensory.word,
          ipa: sensory.ipa,
          meaning: sensory.meaningVi,
          definitionEn: sensory.example,
          collocations: [sensory.example],
          originalContext: `Speaking Part 2 (${currentPrompt.category}): ${currentPrompt.topic}`,
          category: "c1_academic",
          status: "learning",
          stepInterval: 1,
          nextReviewDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          repetitionCount: 1,
          lapsesCount: 0,
          stability: 1.0,
          difficulty: 5.0,
          bandLevel: sensory.band,
          sourceModule: "speaking",
          createdAt: new Date().toISOString(),
          lastReviewedAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save Memory Palace session:", err);
    }
  }, [pacingAssessment, currentPrompt]);

  return {
    currentPrompt,
    allPrompts: MOCK_MEMORY_PALACE_PROMPTS,
    selectedPromptId,
    handleSelectPrompt,
    phase,
    prepTimeRemaining,
    speakingTime,
    activeRoom,
    setActiveRoomManual,
    roomNotes,
    handleAddKeyword,
    handleRemoveKeyword,
    handleInsertSensoryWord,
    handleLoadSamplePlan,
    startPrepPhase,
    startSpeakingPhase,
    finishSpeaking,
    resetSession,
    isRecording,
    audioUrl,
    audioLevel,
    pacingAssessment,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isFormulaCardOpen,
    setIsFormulaCardOpen,
    isSensoryPaletteOpen,
    setIsSensoryPaletteOpen,
    isSaved,
    saveResultsToDatabase
  };
}
