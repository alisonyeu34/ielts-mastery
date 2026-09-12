'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { db } from '@/lib/db';
import {
  SpatialAudioChaosMixer,
  ChaosChannelType,
  ChannelState
} from '@/lib/spatialAudioChaosMixer';
import {
  MOCK_CHAOS_EXAM_TRACKS,
  ChaosExamTrack,
  ChaosQuestionItem
} from '@/data/mockChaosAudioTracksData';

export function useAcousticChaosSession(initialTrackId?: string) {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(
    initialTrackId || MOCK_CHAOS_EXAM_TRACKS[0].id
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [snrDb, setSnrDb] = useState<number>(12); // Default 12dB
  const [autoInoculation, setAutoInoculation] = useState<boolean>(false);

  // Channel States for Audio Rack
  const [channels, setChannels] = useState<ChannelState[]>([
    { id: 'exam_audio', labelVi: 'Exam Audio Master', volume: 0.9, isMuted: false, isSolo: false, currentLevel: 85 },
    { id: 'keyboard_clatter', labelVi: 'Keyboard Clatter', volume: 0.35, isMuted: false, isSolo: false, currentLevel: 45 },
    { id: 'human_ambient', labelVi: 'Coughs & Paper Shuffle', volume: 0.25, isMuted: false, isSolo: false, currentLevel: 30 },
    { id: 'hvac_hum', labelVi: 'HVAC Room Ventilation', volume: 0.3, isMuted: false, isSolo: false, currentLevel: 40 }
  ]);

  // User input answers
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scorePercentage, setScorePercentage] = useState<number>(0);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [lastSpikeEvent, setLastSpikeEvent] = useState<{ type: string; timestamp: number } | null>(null);

  const mixerRef = useRef<SpatialAudioChaosMixer | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = useMemo<ChaosExamTrack>(() => {
    return (
      MOCK_CHAOS_EXAM_TRACKS.find((t) => t.id === selectedTrackId) ||
      MOCK_CHAOS_EXAM_TRACKS[0]
    );
  }, [selectedTrackId]);

  // Initialize mixer on mount
  useEffect(() => {
    mixerRef.current = new SpatialAudioChaosMixer();
    mixerRef.current.setOnSpikeListener((spikeType) => {
      setLastSpikeEvent({ type: spikeType, timestamp: Date.now() });
    });

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAmbientChaos();
      }
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const selectTrack = useCallback((trackId: string) => {
    setSelectedTrackId(trackId);
    setElapsedSeconds(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setShowSummaryModal(false);
    if (mixerRef.current) mixerRef.current.stopAmbientChaos();
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(async () => {
    if (!mixerRef.current) return;
    const ok = await mixerRef.current.initAudio();
    if (ok) {
      mixerRef.current.startAmbientChaos(snrDb);
      setIsPlaying(true);

      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;
          // Auto inoculation: gradually reduce SNR every 30s
          if (autoInoculation && next % 25 === 0) {
            setSnrDb((prevSnr) => {
              const newSnr = Math.max(3, prevSnr - 2);
              if (mixerRef.current) mixerRef.current.setSNR(newSnr);
              return newSnr;
            });
          }
          if (next >= currentTrack.durationSeconds) {
            pausePlayback();
          }
          return next;
        });
      }, 1000);
    }
  }, [snrDb, autoInoculation, currentTrack.durationSeconds]);

  const pausePlayback = useCallback(() => {
    if (mixerRef.current) mixerRef.current.stopAmbientChaos();
    setIsPlaying(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, []);

  const updateSNR = useCallback((newSnr: number) => {
    setSnrDb(newSnr);
    if (mixerRef.current) {
      mixerRef.current.setSNR(newSnr);
    }
  }, []);

  const updateChannelVolume = useCallback((channelId: ChaosChannelType, volume: number) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === channelId ? { ...ch, volume } : ch))
    );
    if (mixerRef.current) {
      mixerRef.current.setChannelVolume(channelId, volume);
    }
  }, []);

  const toggleMute = useCallback((channelId: ChaosChannelType) => {
    setChannels((prev) =>
      prev.map((ch) => {
        if (ch.id === channelId) {
          const isMuted = !ch.isMuted;
          if (mixerRef.current) {
            mixerRef.current.setChannelVolume(channelId, isMuted ? 0 : ch.volume);
          }
          return { ...ch, isMuted };
        }
        return ch;
      })
    );
  }, []);

  const triggerManualSpike = useCallback((type: 'loud_cough' | 'dropped_pen' | 'chair_screech') => {
    if (mixerRef.current) {
      mixerRef.current.triggerAcousticSpike(type);
    }
  }, []);

  const handleAnswerChange = useCallback((questionId: string, text: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: text }));
  }, []);

  const submitExam = useCallback(async () => {
    pausePlayback();
    let correct = 0;
    const total = currentTrack.questions.length;

    currentTrack.questions.forEach((q) => {
      const userText = (userAnswers[q.id] || '').trim().toLowerCase();
      const expected = q.expectedKeyword.toLowerCase();
      if (userText === expected || userText.includes(expected) || expected.includes(userText)) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / total) * 100);
    setScorePercentage(scorePct);
    setIsSubmitted(true);
    setShowSummaryModal(true);

    try {
      await db.practice_logs.add({
        id: `chaos-${Date.now()}`,
        type: 'acoustic_chaos',
        title: `Acoustic Chaos Simulation: ${currentTrack.title} (SNR: ${snrDb}dB)`,
        score: scorePct,
        totalQuestions: total,
        durationSeconds: Math.max(30, elapsedSeconds),
        timeSpentSeconds: Math.max(30, elapsedSeconds),
        accuracyPercentage: scorePct,
        phase: 3,
        details: {
          trackId: currentTrack.id,
          snrDb,
          autoInoculation,
          noiseImmunityIndex: scorePct
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // Log errors under high noise to error bank
      currentTrack.questions.forEach(async (q) => {
        const userText = (userAnswers[q.id] || '').trim().toLowerCase();
        const expected = q.expectedKeyword.toLowerCase();
        const isAnswerCorrect = userText === expected || userText.includes(expected);

        if (!isAnswerCorrect) {
          await db.error_bank.add({
            id: `err-chaos-${Date.now()}-${q.id}`,
            sourceModule: 'listening',
            errorType: 'pronunciation',
            questionContext: `[Acoustic Chaos SNR ${snrDb}dB] ${q.stem}`,
            userWrongAnswer: userAnswers[q.id] || '(Bỏ trống do tạp âm)',
            correctAnswer: q.expectedKeyword,
            deepExplanation: `${q.acousticVulnerabilityVi} Mức nhiễu tại thời điểm này là SNR ${q.snrBenchmarkDb}dB.`,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString()
          });
        }
      });
    } catch (e) {
      console.error('Dexie logging error for acoustic chaos:', e);
    }
  }, [pausePlayback, currentTrack, userAnswers, snrDb, autoInoculation, elapsedSeconds]);

  // Noise Immunity Index (0 - 100)
  const noiseImmunityIndex = useMemo(() => {
    // Weighted by difficulty of SNR (Lower SNR with high accuracy = higher NII)
    const snrMultiplier = (20 - snrDb) / 20; // 0.1 to 0.85
    return Math.min(100, Math.round(scorePercentage * (0.7 + snrMultiplier * 0.4)));
  }, [scorePercentage, snrDb]);

  return {
    tracks: MOCK_CHAOS_EXAM_TRACKS,
    currentTrack,
    selectedTrackId,
    selectTrack,
    isPlaying,
    elapsedSeconds,
    snrDb,
    updateSNR,
    autoInoculation,
    setAutoInoculation,
    channels,
    updateChannelVolume,
    toggleMute,
    startPlayback,
    pausePlayback,
    triggerManualSpike,
    lastSpikeEvent,
    userAnswers,
    handleAnswerChange,
    submitExam,
    isSubmitted,
    scorePercentage,
    noiseImmunityIndex,
    showSummaryModal,
    setShowSummaryModal
  };
}
