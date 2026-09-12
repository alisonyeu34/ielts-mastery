"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { db } from "@/lib/db";
import {
  MOCK_SOCRATIC_TOPICS,
  SocraticDebateTopic,
} from "@/data/mockSocraticDebateData";
import {
  DebateTurn,
  DialecticalResilienceScore,
  SocietalLensKey,
  detectSocietalLenses,
  detectHedgingWords,
  checkConcessionStructure,
  evaluateArgumentResilience,
} from "@/lib/socraticDebateEngine";

export function useSocraticDebateSession() {
  const [selectedTopic, setSelectedTopic] = useState<SocraticDebateTopic>(
    MOCK_SOCRATIC_TOPICS[0]
  );
  const [currentRound, setCurrentRound] = useState<1 | 2 | 3>(1);
  const [turns, setTurns] = useState<DebateTurn[]>([]);
  const [userDraftText, setUserDraftText] = useState<string>("");
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [roundSecondsLeft, setRoundSecondsLeft] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isScholarTyping, setIsScholarTyping] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<unknown>(null);

  // Initialize Round 1 prompt turn from Scholar
  useEffect(() => {
    setTurns([
      {
        id: `scholar_turn_0`,
        round: 1,
        speaker: "scholar",
        text: selectedTopic.round1Prompt,
        timestamp: new Date().toLocaleTimeString(),
        detectedLenses: ["governmental", "individual"],
        hedgingWords: ["arguably"],
        concessionUsed: false,
      },
    ]);
    setCurrentRound(1);
    setUserDraftText("");
    setRoundSecondsLeft(90);
    setIsTimerRunning(true);
  }, [selectedTopic]);

  // Round Timer Handler
  useEffect(() => {
    if (isTimerRunning && roundSecondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setRoundSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, roundSecondsLeft]);

  // Active societal lenses detected in current user draft + history
  const activeLenses: SocietalLensKey[] = useMemo(() => {
    const combined = turns.map((t) => t.text).join(" ") + " " + userDraftText;
    return detectSocietalLenses(combined);
  }, [turns, userDraftText]);

  // Dialectical Resilience Score
  const resilienceScore: DialecticalResilienceScore = useMemo(() => {
    return evaluateArgumentResilience(turns, selectedTopic.title);
  }, [turns, selectedTopic.title]);

  // Switch Debate Topic
  const handleSelectTopic = useCallback((topic: SocraticDebateTopic) => {
    setSelectedTopic(topic);
  }, []);

  // Voice-to-Text Rebuttal input via Web Speech API
  const toggleVoiceRecording = useCallback(() => {
    if (isRecordingVoice) {
      if (recognitionRef.current) {
        try {
          (recognitionRef.current as { stop: () => void }).stop();
        } catch {}
      }
      setIsRecordingVoice(false);
      return;
    }

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      const recognition = new (SpeechRecognitionClass as new () => {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onresult: (e: {
          resultIndex: number;
          results: Array<{ 0: { transcript: string } }>;
        }) => void;
        start: () => void;
        stop: () => void;
      })();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let currentFull = "";
        for (let i = 0; i < event.results.length; i++) {
          currentFull += event.results[i][0].transcript + " ";
        }
        setUserDraftText(currentFull.trim());
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecordingVoice(true);
    } else {
      alert("Trình duyệt không hỗ trợ Web Speech API. Vui lòng gõ văn bản trực tiếp.");
    }
  }, [isRecordingVoice]);

  // Submit User Turn and Advance Dialectical Round
  const submitUserTurn = useCallback(async () => {
    if (!userDraftText.trim()) return;

    const userText = userDraftText.trim();
    const lenses = detectSocietalLenses(userText);
    const hedging = detectHedgingWords(userText);
    const concession = checkConcessionStructure(userText);

    const userTurn: DebateTurn = {
      id: `user_turn_${currentRound}_${Date.now()}`,
      round: currentRound,
      speaker: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString(),
      detectedLenses: lenses,
      hedgingWords: hedging,
      concessionUsed: concession,
    };

    const nextTurns = [...turns, userTurn];
    setTurns(nextTurns);
    setUserDraftText("");
    setRoundSecondsLeft(90);

    if (currentRound === 1) {
      // Advance to Round 2: Scholar launches Socratic Counter-Strike
      setIsScholarTyping(true);
      setTimeout(() => {
        const scholarTurn: DebateTurn = {
          id: `scholar_turn_2_${Date.now()}`,
          round: 2,
          speaker: "scholar",
          text: `${selectedTopic.round2CounterStrike.scholarArgument}\n\n[Dilemma Case]: ${selectedTopic.round2CounterStrike.dilemmaPosed}`,
          timestamp: new Date().toLocaleTimeString(),
          detectedLenses: ["communal", "corporate"],
          hedgingWords: ["ostensibly", "disregards"],
          concessionUsed: false,
        };
        setTurns((prev) => [...prev, scholarTurn]);
        setCurrentRound(2);
        setIsScholarTyping(false);
      }, 1200);
    } else if (currentRound === 2) {
      // Advance to Round 3: Scholar challenges for final defense & synthesis
      setIsScholarTyping(true);
      setTimeout(() => {
        const scholarTurn: DebateTurn = {
          id: `scholar_turn_3_${Date.now()}`,
          round: 3,
          speaker: "scholar",
          text: `Your counter-argument addresses the primary facet, yet how do you synthesize this position without contradicting your initial premise? Deliver your definitive rebuttal using nuanced hedging and multifold societal lenses.`,
          timestamp: new Date().toLocaleTimeString(),
          detectedLenses: ["global", "scientific"],
          hedgingWords: ["plausibly"],
          concessionUsed: false,
        };
        setTurns((prev) => [...prev, scholarTurn]);
        setCurrentRound(3);
        setIsScholarTyping(false);
      }, 1200);
    } else if (currentRound === 3) {
      // Completed all 3 rounds: Compute Score and Log to Dexie DB
      setIsSummaryModalOpen(true);
      setIsTimerRunning(false);

      const finalScore = evaluateArgumentResilience(nextTurns, selectedTopic.title);

      try {
        await db.practice_logs.put({
          id: `log_socratic_${Date.now()}`,
          type: "socratic_debate_drill",
          materialId: selectedTopic.id,
          title: `Socratic Debate: ${selectedTopic.title}`,
          score: finalScore.overallScore,
          totalQuestions: 3,
          accuracyPercentage: finalScore.overallScore,
          timeSpentSeconds: 180,
          details: {
            hedgingDensity: finalScore.hedgingDensity,
            activeLensesCount: finalScore.activeLensesCount,
            bandEstimate: finalScore.bandEstimate,
            fallaciesCount: finalScore.fallaciesDetected.length,
          },
          createdAt: new Date().toISOString(),
        });

        // Auto-save fallacy or weak rebuttal to Error Bank
        if (finalScore.fallaciesDetected.length > 0 || finalScore.overallScore < 70) {
          await db.error_bank.add({
            id: `err_socratic_${Date.now()}`,
            sourceModule: "speaking",
            errorType: "careless_reading",
            questionContext: `Socratic Debate: ${selectedTopic.resolution}`,
            userWrongAnswer: userText,
            correctAnswer: selectedTopic.modelSynthesizedPosition,
            deepExplanation: `Lập luận của bạn bị đối phương bóc trần do: ${
              finalScore.fallaciesDetected[0] || "Thiếu cấu trúc nhượng bộ và lăng kính đa chiều"
            }. Cần vận dụng cấu trúc 'While it is true that... nonetheless...' để bảo vệ luận điểm.`,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (e) {
        console.error("Failed to save Socratic debate log:", e);
      }
    }
  }, [userDraftText, currentRound, turns, selectedTopic]);

  // Insert C1 Template phrase into user draft
  const insertTemplatePhrase = useCallback((phrase: string) => {
    setUserDraftText((prev) => (prev ? `${prev} ${phrase} ` : `${phrase} `));
  }, []);

  // Add C1 Collocation to Vocab Matrix
  const addCollocationToVocab = useCallback(
    async (item: { phrase: string; meaning: string; pos: string }) => {
      try {
        const today = new Date().toISOString().split("T")[0];
        await db.vocab_matrix.put({
          id: `vocab_soc_${Date.now()}`,
          word: item.phrase,
          ipa: "/C1 Academic Collocation/",
          meaning: item.meaning,
          collocations: [item.phrase],
          originalContext: `Socratic Debate on ${selectedTopic.title}`,
          category: "c1_academic",
          status: "learning",
          stepInterval: 1,
          nextReviewDate: today,
          repetitionCount: 0,
          lapsesCount: 0,
          stability: 2.5,
          difficulty: 4.5,
          createdAt: new Date().toISOString(),
        });
        return true;
      } catch (err) {
        console.error("Failed to add collocation to vocab matrix:", err);
        return false;
      }
    },
    [selectedTopic.title]
  );

  return {
    selectedTopic,
    handleSelectTopic,
    currentRound,
    turns,
    userDraftText,
    setUserDraftText,
    isRecordingVoice,
    toggleVoiceRecording,
    roundSecondsLeft,
    isScholarTyping,
    activeLenses,
    resilienceScore,
    submitUserTurn,
    insertTemplatePhrase,
    addCollocationToVocab,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
  };
}
