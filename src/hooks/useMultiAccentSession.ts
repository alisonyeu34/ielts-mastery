"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { db } from "@/lib/db";
import {
  AccentType,
  WebAudioLooperEngine,
  speakMultiAccentUtterance,
  stopMultiAccentUtterance,
} from "@/lib/webAudioLooperEngine";
import {
  MOCK_MULTI_ACCENT_SCENARIOS,
  MultiAccentDialogueScenario,
  ForensicTrapSegment,
} from "@/data/mockMultiAccentAudioData";

export function useMultiAccentSession() {
  const [selectedScenario, setSelectedScenario] = useState<MultiAccentDialogueScenario>(
    MOCK_MULTI_ACCENT_SCENARIOS[0]
  );
  const [currentAccent, setCurrentAccent] = useState<AccentType>("british");
  const [playbackSpeed, setPlaybackSpeedState] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);

  // Active Trap segment
  const [activeTrapIndex, setActiveTrapIndex] = useState<number>(0);
  const activeTrap: ForensicTrapSegment | undefined = selectedScenario.forensicTraps[activeTrapIndex];

  // Micro-Looper A-B Region
  const [loopStartSec, setLoopStartSec] = useState<number>(
    activeTrap ? activeTrap.loopStartSec : 5.0
  );
  const [loopEndSec, setLoopEndSec] = useState<number>(
    activeTrap ? activeTrap.loopEndSec : 11.0
  );

  // Waveform & Playhead state
  const [currentPlayheadSec, setCurrentPlayheadSec] = useState<number>(0);
  const [waveformPeaks, setWaveformPeaks] = useState<number[]>([]);

  // Trap Quiz state
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);

  // Statistics
  const [drillAttemptCount, setDrillAttemptCount] = useState<number>(0);
  const [drillSuccessCount, setDrillSuccessCount] = useState<number>(0);

  const engineRef = useRef<WebAudioLooperEngine | null>(null);
  const playheadIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio Looper Engine
  useEffect(() => {
    const engine = new WebAudioLooperEngine();
    engineRef.current = engine;
    const peaks = engine.getWaveformPeaks(null, 120);
    setWaveformPeaks(peaks);

    return () => {
      engine.stop();
      stopMultiAccentUtterance();
      if (playheadIntervalRef.current) clearInterval(playheadIntervalRef.current);
    };
  }, []);

  // Sync trap segment bounds when scenario or active trap changes
  useEffect(() => {
    if (activeTrap) {
      setLoopStartSec(activeTrap.loopStartSec);
      setLoopEndSec(activeTrap.loopEndSec);
      if (engineRef.current) {
        engineRef.current.setLoopPoints(activeTrap.loopStartSec, activeTrap.loopEndSec, activeTrap.trapType);
      }
      setUserSelectedOption(null);
      setIsAnswerSubmitted(false);
      setIsAnswerCorrect(null);
    }
  }, [activeTrap, selectedScenario]);

  // Playhead update ticker
  useEffect(() => {
    if (isPlaying) {
      playheadIntervalRef.current = setInterval(() => {
        setCurrentPlayheadSec((prev) => {
          if (isLooping) {
            if (prev >= loopEndSec) return loopStartSec;
            return parseFloat((prev + 0.1 * playbackSpeed).toFixed(2));
          } else {
            if (prev >= selectedScenario.durationSec) {
              setIsPlaying(false);
              return 0;
            }
            return parseFloat((prev + 0.1 * playbackSpeed).toFixed(2));
          }
        });
      }, 100);
    } else {
      if (playheadIntervalRef.current) clearInterval(playheadIntervalRef.current);
    }

    return () => {
      if (playheadIntervalRef.current) clearInterval(playheadIntervalRef.current);
    };
  }, [isPlaying, isLooping, loopStartSec, loopEndSec, playbackSpeed, selectedScenario.durationSec]);

  // Set playback speed
  const setPlaybackSpeed = useCallback((speed: number) => {
    setPlaybackSpeedState(speed);
    if (engineRef.current) {
      engineRef.current.setPlaybackSpeed(speed);
    }
  }, []);

  // Switch Accent
  const switchAccent = useCallback((accent: AccentType) => {
    setCurrentAccent(accent);
    stopMultiAccentUtterance();
    if (engineRef.current) {
      engineRef.current.stop();
    }
    setIsPlaying(false);
    setIsLooping(false);
  }, []);

  // Play Full Audio dialogue with synthetic/speech voice
  const playFullAudio = useCallback(async () => {
    if (isPlaying) {
      stopMultiAccentUtterance();
      if (engineRef.current) engineRef.current.stop();
      setIsPlaying(false);
      setIsLooping(false);
      return;
    }

    setIsPlaying(true);
    setIsLooping(false);
    setCurrentPlayheadSec(0);

    if (engineRef.current) {
      engineRef.current.playFullTrack(0, () => {
        setIsPlaying(false);
      });
    }

    // Simultaneously invoke speech synthesis for accurate accent voice delivery
    speakMultiAccentUtterance(
      selectedScenario.fullTranscript,
      currentAccent,
      playbackSpeed,
      () => {
        setIsPlaying(false);
      }
    );
  }, [isPlaying, selectedScenario.fullTranscript, currentAccent, playbackSpeed]);

  // Play A-B Micro-Loop
  const startMicroLoop = useCallback(() => {
    if (isLooping && isPlaying) {
      stopMultiAccentUtterance();
      if (engineRef.current) engineRef.current.stop();
      setIsPlaying(false);
      setIsLooping(false);
      return;
    }

    setIsPlaying(true);
    setIsLooping(true);
    setCurrentPlayheadSec(loopStartSec);

    if (engineRef.current) {
      engineRef.current.setLoopPoints(loopStartSec, loopEndSec, activeTrap?.trapType);
      engineRef.current.setPlaybackSpeed(playbackSpeed);
      engineRef.current.startABLoop();
    }

    // Micro-loop text utterance
    if (activeTrap) {
      speakMultiAccentUtterance(
        activeTrap.layer2StandardOrthography,
        currentAccent,
        playbackSpeed
      );
    }
  }, [isLooping, isPlaying, loopStartSec, loopEndSec, activeTrap, playbackSpeed, currentAccent]);

  // Pause / Stop Audio
  const stopAudio = useCallback(() => {
    stopMultiAccentUtterance();
    if (engineRef.current) engineRef.current.stop();
    setIsPlaying(false);
    setIsLooping(false);
  }, []);

  // Update A-B loop boundaries manually
  const updateLoopPoints = useCallback((start: number, end: number) => {
    const validStart = Math.max(0, parseFloat(start.toFixed(1)));
    const validEnd = Math.max(validStart + 0.5, parseFloat(end.toFixed(1)));
    setLoopStartSec(validStart);
    setLoopEndSec(validEnd);
    if (engineRef.current) {
      engineRef.current.setLoopPoints(validStart, validEnd);
    }
  }, []);

  // Submit Trap Question Answer
  const submitTrapAnswer = useCallback(
    async (optionIndex: number) => {
      if (!activeTrap) return;

      setUserSelectedOption(optionIndex);
      setIsAnswerSubmitted(true);
      const isCorrect = optionIndex === activeTrap.drillQuestion.correctIndex;
      setIsAnswerCorrect(isCorrect);
      setDrillAttemptCount((prev) => prev + 1);

      if (isCorrect) {
        setDrillSuccessCount((prev) => prev + 1);
      } else {
        // Auto-save error to Error Bank
        const userWrongText = activeTrap.drillQuestion.options[optionIndex] || "Unknown Option";
        const correctText = activeTrap.drillQuestion.options[activeTrap.drillQuestion.correctIndex];

        try {
          await db.error_bank.add({
            id: `err_accent_${Date.now()}`,
            sourceModule: "listening",
            errorType: "pronunciation",
            questionContext: `Multi-Accent Drill (${currentAccent.toUpperCase()}): ${activeTrap.drillQuestion.prompt}`,
            userWrongAnswer: userWrongText,
            correctAnswer: correctText,
            deepExplanation: `Bẫy ngữ âm giọng ${currentAccent.toUpperCase()}: ${activeTrap.drillQuestion.accentPhoneticNote}. Thí sinh nghe nhầm do biến âm đặc thù và hiện tượng nuốt âm/đổi ý.`,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (e) {
          console.error("Failed to add accent error to Error Bank:", e);
        }
      }

      // Log to practice logs
      try {
        await db.practice_logs.put({
          id: `log_multi_accent_${Date.now()}`,
          type: "listening_accent_drill",
          materialId: selectedScenario.id,
          title: `Multi-Accent Forensic: ${selectedScenario.title} (${currentAccent})`,
          score: isCorrect ? 100 : 0,
          totalQuestions: 1,
          accuracyPercentage: isCorrect ? 100 : 0,
          timeSpentSeconds: 30,
          details: {
            accent: currentAccent,
            trapType: activeTrap.trapType,
            loopDurationSec: loopEndSec - loopStartSec,
            playbackSpeed,
          },
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Failed to log multi-accent practice:", err);
      }
    },
    [activeTrap, currentAccent, loopEndSec, loopStartSec, playbackSpeed, selectedScenario]
  );

  return {
    selectedScenario,
    setSelectedScenario,
    currentAccent,
    switchAccent,
    playbackSpeed,
    setPlaybackSpeed,
    isPlaying,
    isLooping,
    playFullAudio,
    startMicroLoop,
    stopAudio,
    loopStartSec,
    loopEndSec,
    updateLoopPoints,
    currentPlayheadSec,
    waveformPeaks,
    activeTrapIndex,
    setActiveTrapIndex,
    activeTrap,
    userSelectedOption,
    isAnswerSubmitted,
    isAnswerCorrect,
    submitTrapAnswer,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    drillAttemptCount,
    drillSuccessCount,
  };
}
