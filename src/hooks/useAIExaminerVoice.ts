"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ExaminerPersonaId,
  EXAMINER_PERSONAS,
  generateSpeakingTurn,
  playExaminerSpeech,
  SpeakingTurnResult,
} from "@/lib/aiExaminerClient";

export interface ChatMessage {
  id: string;
  sender: "examiner" | "candidate";
  text: string;
  timestamp: string;
  suggestedC1Upgrades?: string[];
  feedbackNotes?: string;
}

export function useAIExaminerVoice(initialPersonaId: ExaminerPersonaId = "strict_examiner") {
  const [selectedPersonaId, setSelectedPersonaId] = useState<ExaminerPersonaId>(initialPersonaId);
  const [currentPart, setCurrentPart] = useState<1 | 2 | 3>(1);

  // Conversation history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_init",
      sender: "examiner",
      text: "Good afternoon. My name is Dr. Alistair Vance. Could you please tell me your full name, and what you currently do for study or work?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  // Voice States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isExaminerSpeaking, setIsExaminerSpeaking] = useState<boolean>(false);
  const [isProcessingAI, setIsProcessingAI] = useState<boolean>(false);
  const [audioVolumeLevel, setAudioVolumeLevel] = useState<number>(0);

  // Part 2 Timers
  const [cueCardPrepSeconds, setCueCardPrepSeconds] = useState<number>(60);
  const [isPrepTimerRunning, setIsPrepTimerRunning] = useState<boolean>(false);

  // VAD (Voice Activity Detection) Timer Ref
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);
  const userSpeechAccumulatorRef = useRef<string>("");

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }

        if (currentTranscript.trim()) {
          userSpeechAccumulatorRef.current = currentTranscript;
          setAudioVolumeLevel(Math.min(100, Math.round(Math.random() * 40 + 60)));

          // Reset silence VAD timer (2 seconds of silence triggers submission)
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            handleStopRecordingAndSubmit();
          }, 2500);
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

  // Part 2 Prep Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPrepTimerRunning && cueCardPrepSeconds > 0) {
      interval = setInterval(() => {
        setCueCardPrepSeconds((prev) => {
          if (prev <= 1) {
            setIsPrepTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPrepTimerRunning, cueCardPrepSeconds]);

  // Start Mic Recording
  const startRecording = useCallback(() => {
    if (isExaminerSpeaking || isProcessingAI) return;

    userSpeechAccumulatorRef.current = "";
    setIsRecording(true);
    setAudioVolumeLevel(25);

    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch {
      // Ignore if already started
    }
  }, [isExaminerSpeaking, isProcessingAI]);

  // Stop Mic Recording and Process Turn with AI
  const handleStopRecordingAndSubmit = useCallback(async (manualTranscript?: string) => {
    setIsRecording(false);
    setAudioVolumeLevel(0);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } catch {
      // Ignore
    }

    const candidateSpeech = manualTranscript || userSpeechAccumulatorRef.current.trim() || "I believe that modern technology has drastically altered our communication patterns.";

    // 1. Append Candidate Message
    const candidateMsg: ChatMessage = {
      id: `msg_can_${Date.now()}`,
      sender: "candidate",
      text: candidateSpeech,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, candidateMsg]);

    // 2. Generate Next Turn with AI Examiner
    setIsProcessingAI(true);
    const lastExaminerMsg = messages.filter((m) => m.sender === "examiner").slice(-1)[0]?.text || "";

    const turnResult: SpeakingTurnResult = await generateSpeakingTurn(
      selectedPersonaId,
      currentPart,
      lastExaminerMsg,
      candidateSpeech
    );

    setIsProcessingAI(false);

    // 3. Append Examiner Message
    const examinerMsg: ChatMessage = {
      id: `msg_ex_${Date.now()}`,
      sender: "examiner",
      text: turnResult.examinerResponseText + (turnResult.followUpQuestion ? ` ${turnResult.followUpQuestion}` : ""),
      timestamp: new Date().toLocaleTimeString(),
      suggestedC1Upgrades: turnResult.suggestedC1Upgrades,
      feedbackNotes: turnResult.feedbackQuickNotesVi,
    };
    setMessages((prev) => [...prev, examinerMsg]);

    // 4. Play Voice
    setIsExaminerSpeaking(true);
    playExaminerSpeech(examinerMsg.text, selectedPersonaId, () => {
      setIsExaminerSpeaking(false);
    });
  }, [messages, selectedPersonaId, currentPart]);

  // Start Part 2 Prep Timer
  const startPart2Preparation = useCallback(() => {
    setCueCardPrepSeconds(60);
    setIsPrepTimerRunning(true);
  }, []);

  // Clear and Restart Session
  const restartSession = useCallback(() => {
    window.speechSynthesis?.cancel();
    setMessages([
      {
        id: `msg_init_${Date.now()}`,
        sender: "examiner",
        text: "Good afternoon. Please introduce yourself and let me know which topics you'd like to explore today.",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setIsRecording(false);
    setIsExaminerSpeaking(false);
    setIsProcessingAI(false);
  }, []);

  return {
    selectedPersonaId,
    setSelectedPersonaId,
    currentPart,
    setCurrentPart,
    messages,
    isRecording,
    isExaminerSpeaking,
    isProcessingAI,
    audioVolumeLevel,
    startRecording,
    stopRecordingAndSubmit: handleStopRecordingAndSubmit,
    cueCardPrepSeconds,
    isPrepTimerRunning,
    startPart2Preparation,
    restartSession,
  };
}
