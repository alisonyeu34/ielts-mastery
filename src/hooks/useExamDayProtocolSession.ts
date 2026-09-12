'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/lib/db';
import {
  MOCK_MULTI_ACCENT_TRACKS,
  MOCK_VOCAL_CHANTS,
  MOCK_EXAM_CHEAT_SHEET,
  MultiAccentTrack,
  VocalChantItem
} from '@/data/mockExamDayWarmupKit';
import { getOfflineStorageTelemetry, OfflineCacheStatus } from '@/lib/pwaServiceWorkerManager';

export function useExamDayProtocolSession() {
  // Multi-Accent Player State
  const [selectedAccentIndex, setSelectedAccentIndex] = useState<number>(0);
  const [isPlayingAccent, setIsPlayingAccent] = useState<boolean>(false);
  const [accentElapsedSeconds, setAccentElapsedSeconds] = useState<number>(0);

  // Vocal Chant State
  const [selectedChantIndex, setSelectedChantIndex] = useState<number>(0);
  const [isChanting, setIsChanting] = useState<boolean>(false);
  const [chantStep, setChantStep] = useState<number>(0);

  // Box Breathing State (4-4-4-4 seconds: Inhale 4s -> Hold 4s -> Exhale 4s -> Hold 4s)
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold_in' | 'exhale' | 'hold_out'>('inhale');
  const [breathingCountdown, setBreathingCountdown] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // Cheat Sheet Modal State
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);

  // Offline PWA Telemetry
  const [offlineStatus, setOfflineStatus] = useState<OfflineCacheStatus | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Load PWA Telemetry on mount
  useEffect(() => {
    getOfflineStorageTelemetry().then(setOfflineStatus);
  }, []);

  const currentAccent = MOCK_MULTI_ACCENT_TRACKS[selectedAccentIndex] || MOCK_MULTI_ACCENT_TRACKS[0];
  const currentChant = MOCK_VOCAL_CHANTS[selectedChantIndex] || MOCK_VOCAL_CHANTS[0];

  // Synthesize multi-accent audio speech or tone burst
  const playAccentAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentAccent.audioScript);
      utterance.rate = 0.95;

      // Select voice based on accent target
      const voices = window.speechSynthesis.getVoices();
      if (currentAccent.accent === 'British RP') {
        utterance.lang = 'en-GB';
        const gbVoice = voices.find((v) => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
        if (gbVoice) utterance.voice = gbVoice;
      } else if (currentAccent.accent === 'Australian') {
        utterance.lang = 'en-AU';
        const auVoice = voices.find((v) => v.lang === 'en-AU' || v.name.includes('AU') || v.name.includes('Australian'));
        if (auVoice) utterance.voice = auVoice;
      } else {
        utterance.lang = 'en-US';
        const usVoice = voices.find((v) => v.lang === 'en-US' || v.name.includes('US') || v.name.includes('American'));
        if (usVoice) utterance.voice = usVoice;
      }

      utterance.onend = () => {
        setIsPlayingAccent(false);
        setAccentElapsedSeconds(0);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAccent(true);
    } else {
      // Fallback synthetic beep
      setIsPlayingAccent(true);
      setTimeout(() => setIsPlayingAccent(false), 5000);
    }
  }, [currentAccent]);

  const pauseAccentAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAccent(false);
  }, []);

  // Box Breathing cycle runner
  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathingCountdown((prev) => {
        if (prev <= 1) {
          // Switch phase
          setBreathingPhase((currPhase) => {
            if (currPhase === 'inhale') return 'hold_in';
            if (currPhase === 'hold_in') return 'exhale';
            if (currPhase === 'exhale') return 'hold_out';
            // Completed 1 full cycle
            setCompletedCycles((c) => c + 1);
            return 'inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const startBreathing = useCallback(() => {
    setIsBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingCountdown(4);
  }, []);

  const pauseBreathing = useCallback(() => {
    setIsBreathingActive(false);
  }, []);

  const resetBreathing = useCallback(() => {
    setIsBreathingActive(false);
    setBreathingPhase('inhale');
    setBreathingCountdown(4);
    setCompletedCycles(0);
  }, []);

  return {
    // Multi Accent
    accentTracks: MOCK_MULTI_ACCENT_TRACKS,
    selectedAccentIndex,
    setSelectedAccentIndex,
    currentAccent,
    isPlayingAccent,
    playAccentAudio,
    pauseAccentAudio,
    accentElapsedSeconds,

    // Vocal Chant
    vocalChants: MOCK_VOCAL_CHANTS,
    selectedChantIndex,
    setSelectedChantIndex,
    currentChant,
    isChanting,
    setIsChanting,

    // Box Breathing
    isBreathingActive,
    breathingPhase,
    breathingCountdown,
    completedCycles,
    startBreathing,
    pauseBreathing,
    resetBreathing,

    // Cheat Sheet
    cheatSheetSections: MOCK_EXAM_CHEAT_SHEET,
    showCheatSheet,
    setShowCheatSheet,

    // PWA Offline status
    offlineStatus
  };
}
