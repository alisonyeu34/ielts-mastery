"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  SocietalPrismsPrompt,
  MOCK_SOCIETAL_PRISMS_PROMPTS
} from "@/data/mockSocietalPrismsPromptsData";
import {
  SocietalPrismId,
  PrismAnalysisResult,
  evaluatePrismCoverage,
  SOCIETAL_PRISMS
} from "@/lib/societalPrismsAnalyzer";
import { db } from "@/lib/db";

export function useSocietalPrismsSession(initialPromptId?: string) {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(
    initialPromptId || MOCK_SOCIETAL_PRISMS_PROMPTS[0].id
  );

  const currentPrompt: SocietalPrismsPrompt = useMemo(() => {
    return (
      MOCK_SOCIETAL_PRISMS_PROMPTS.find((p) => p.id === selectedPromptId) ||
      MOCK_SOCIETAL_PRISMS_PROMPTS[0]
    );
  }, [selectedPromptId]);

  // Selected prisms (minimum 2 recommended)
  const [selectedPrisms, setSelectedPrisms] = useState<SocietalPrismId[]>([
    currentPrompt.recommendedPrisms[0],
    currentPrompt.recommendedPrisms[1]
  ]);

  const [speechTranscript, setSpeechTranscript] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Analysis & Modals
  const [prismAnalysis, setPrismAnalysis] = useState<PrismAnalysisResult | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isTradeoffBuilderOpen, setIsTradeoffBuilderOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Audio refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Switch Prompt
  const handleSelectPrompt = (promptId: string) => {
    resetSession();
    setSelectedPromptId(promptId);
    const p = MOCK_SOCIETAL_PRISMS_PROMPTS.find((item) => item.id === promptId) || MOCK_SOCIETAL_PRISMS_PROMPTS[0];
    setSelectedPrisms([p.recommendedPrisms[0], p.recommendedPrisms[1]]);
  };

  // Toggle Prism
  const handleTogglePrism = (prismId: SocietalPrismId) => {
    setSelectedPrisms((prev) => {
      if (prev.includes(prismId)) {
        return prev.filter((id) => id !== prismId);
      }
      return [...prev, prismId];
    });
  };

  const handleUpdateTranscript = (text: string) => {
    setSpeechTranscript(text);
    setIsSaved(false);
  };

  const handleLoadSampleResponse = () => {
    setSpeechTranscript(currentPrompt.band8SampleResponse);
  };

  // Start Recording
  const startRecording = useCallback(async () => {
    setAudioUrl(null);
    setRecordingSeconds(0);
    setIsSaved(false);

    try {
      if (typeof window !== 'undefined' && navigator?.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

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
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
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
          if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
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
      setIsRecording(true);
    }

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  }, []);

  // Stop Recording
  const stopRecording = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }

    setIsRecording(false);
    setAudioLevel(0);
  }, []);

  // Analyze Speech
  const handleAnalyzeDiscourse = () => {
    const analysis = evaluatePrismCoverage(speechTranscript);
    setPrismAnalysis(analysis);
    setIsSummaryModalOpen(true);
  };

  // Reset Session
  const resetSession = () => {
    stopRecording();
    setSpeechTranscript("");
    setPrismAnalysis(null);
    setAudioUrl(null);
    setRecordingSeconds(0);
    setIsSaved(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Save to Dexie DB
  const saveResultsToDatabase = useCallback(async () => {
    if (!prismAnalysis) return;
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `societal_prisms_log_${Date.now()}`,
        type: "societal_prisms",
        title: `Speaking Part 3 (6 Prisms): ${currentPrompt.question.substring(0, 50)}...`,
        score: prismAnalysis.fluencyBandEstimate,
        totalQuestions: 6,
        accuracyPercentage: prismAnalysis.breadthScore,
        timeSpentSeconds: Math.max(45, recordingSeconds),
        durationSeconds: Math.max(45, recordingSeconds),
        details: {
          promptId: currentPrompt.id,
          activePrismCount: prismAnalysis.activePrismCount,
          breadthScore: prismAnalysis.breadthScore,
          egocentricCount: prismAnalysis.egocentricCount,
          policyTradeoffDetected: prismAnalysis.policyTradeoffDetected
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Add Egocentric Trap to Error Bank
      if (prismAnalysis.isEgocentricTrap) {
        await db.error_bank.put({
          id: `err_egocentric_${Date.now()}`,
          sourceModule: "speaking",
          errorType: "careless_reading",
          questionContext: `Speaking Part 3: "${currentPrompt.question}"`,
          userWrongAnswer: prismAnalysis.egocentricSnippets.join(", ") || "Lạm dụng ngôi thứ nhất",
          correctAnswer: "Institutional Macro-Prisms (Government, Corporate, Scientific, Global)",
          deepExplanation: "Part 3 yêu cầu phân tích chính sách công và xã hội học khách quan. Cần thay thế 'I think / In my opinion' bằng các lăng kính thể chế như 'From a regulatory perspective' hoặc 'Examining market dynamics'.",
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      // 3. Save Institutional Vocabulary from Active Prisms
      for (const p of SOCIETAL_PRISMS) {
        for (const term of p.keyTerms.slice(0, 3)) {
          await db.vocab_matrix.put({
            id: `vocab_prism_${term.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
            word: term,
            ipa: '/ˌɪn.stəˈtuː.ʃən.əl/',
            meaning: `Thuật ngữ lăng kính ${p.vietnameseName}`,
            definitionEn: `Key term in institutional discourse for ${p.name}`,
            collocations: [p.starterFormula],
            originalContext: `Speaking Part 3 Institutional Lens: ${p.name}`,
            category: "c1_academic",
            status: "learning",
            stepInterval: 1,
            nextReviewDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
            repetitionCount: 1,
            lapsesCount: 0,
            stability: 1.0,
            difficulty: 5.0,
            bandLevel: "C1",
            sourceModule: "speaking",
            createdAt: new Date().toISOString(),
            lastReviewedAt: new Date().toISOString()
          });
        }
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save Societal Prisms session:", err);
    }
  }, [prismAnalysis, currentPrompt, recordingSeconds]);

  return {
    currentPrompt,
    allPrompts: MOCK_SOCIETAL_PRISMS_PROMPTS,
    selectedPromptId,
    handleSelectPrompt,
    selectedPrisms,
    handleTogglePrism,
    speechTranscript,
    handleUpdateTranscript,
    handleLoadSampleResponse,
    isRecording,
    recordingSeconds,
    startRecording,
    stopRecording,
    audioUrl,
    audioLevel,
    prismAnalysis,
    handleAnalyzeDiscourse,
    resetSession,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isTradeoffBuilderOpen,
    setIsTradeoffBuilderOpen,
    isSaved,
    saveResultsToDatabase
  };
}
