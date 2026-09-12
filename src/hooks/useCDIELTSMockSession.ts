"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  MOCK_FULL_EXAM_DATA,
  FullMockExamData,
  ExamQuestion,
  HarvestableVocabItem,
} from "@/data/mockFullExamData";
import {
  rawToReadingBand,
  rawToListeningBand,
  calculateWritingComposite,
  calculateSpeakingComposite,
  calculateCambridgeOverallBand,
  analyzeKnowledgeGap,
  MockTestOverallScore,
  GapAnalysisResult,
} from "@/lib/cambridgeScoringEngine";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export type MockSkillType = "listening" | "reading" | "writing" | "speaking";
export type MockPassType = "pass1" | "pass2" | "pass3";

export interface ExamNote {
  id: string;
  questionNumber: number;
  text: string;
  timestamp: string;
}

export function useCDIELTSMockSession(initialExamData: FullMockExamData = MOCK_FULL_EXAM_DATA) {
  const [examData] = useState<FullMockExamData>(initialExamData);

  // 1. Skill & Pass State
  const [currentSkill, setCurrentSkill] = useState<MockSkillType>("listening");
  const [currentPass, setCurrentPass] = useState<MockPassType>("pass1");
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number>(1);

  // 2. Answers State
  const [pass1Answers, setPass1Answers] = useState<Record<string, string>>({});
  const [pass2Answers, setPass2Answers] = useState<Record<string, string>>({});
  const [writingSubmissions, setWritingSubmissions] = useState<{ task1: string; task2: string }>({
    task1: "",
    task2: "",
  });
  const [speakingSubmissions, setSpeakingSubmissions] = useState<Record<string, string>>({});

  // 3. Flags & Navigation
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([1]));

  const toggleFlagQuestion = useCallback((qNum: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(qNum)) {
        next.delete(qNum);
      } else {
        next.add(qNum);
      }
      return next;
    });
  }, []);

  // 4. Timer State
  const getInitialTimeForSkill = useCallback((skill: MockSkillType) => {
    switch (skill) {
      case "listening":
        return 32 * 60;
      case "reading":
        return 60 * 60;
      case "writing":
        return 60 * 60;
      case "speaking":
        return 14 * 60;
      default:
        return 60 * 60;
    }
  }, []);

  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(getInitialTimeForSkill("listening"));
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isTimeHidden, setIsTimeHidden] = useState<boolean>(false);

  // Auto-switch timer when skill changes in Pass 1
  useEffect(() => {
    if (currentPass === "pass1") {
      setTimeLeftSeconds(getInitialTimeForSkill(currentSkill));
      setIsTimerRunning(true);
    }
  }, [currentSkill, currentPass, getInitialTimeForSkill]);

  // Countdown clock tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && currentPass === "pass1" && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentPass, timeLeftSeconds]);

  // Auto unhide timer when time is <= 300 seconds (5 minutes)
  const isTimeCriticallyLow = timeLeftSeconds <= 300;
  const effectiveTimeHidden = isTimeHidden && !isTimeCriticallyLow;

  const toggleHideTime = useCallback(() => {
    if (!isTimeCriticallyLow) {
      setIsTimeHidden((prev) => !prev);
    }
  }, [isTimeCriticallyLow]);

  // 5. Questions for Active Skill
  const activeQuestionsList: ExamQuestion[] = useMemo(() => {
    if (currentSkill === "listening") {
      return examData.listening.parts.flatMap((p) => p.questions);
    } else if (currentSkill === "reading") {
      return examData.reading.passages.flatMap((p) => p.questions);
    }
    return [];
  }, [currentSkill, examData]);

  const activeQuestionItem: ExamQuestion | undefined = useMemo(() => {
    return activeQuestionsList.find((q) => q.questionNumber === activeQuestionNumber);
  }, [activeQuestionsList, activeQuestionNumber]);

  // Record answered values
  const setAnswer = useCallback(
    (qId: string, answer: string) => {
      if (currentPass === "pass1") {
        setPass1Answers((prev) => ({ ...prev, [qId]: answer }));
      } else {
        setPass2Answers((prev) => ({ ...prev, [qId]: answer }));
      }
    },
    [currentPass]
  );

  const selectQuestionNumber = useCallback((num: number) => {
    setActiveQuestionNumber(num);
    setVisitedQuestions((prev) => new Set(prev).add(num));
  }, []);

  const goToNextQuestion = useCallback(() => {
    const max = activeQuestionsList.length || 40;
    if (activeQuestionNumber < max) {
      selectQuestionNumber(activeQuestionNumber + 1);
    }
  }, [activeQuestionNumber, activeQuestionsList.length, selectQuestionNumber]);

  const goToPrevQuestion = useCallback(() => {
    if (activeQuestionNumber > 1) {
      selectQuestionNumber(activeQuestionNumber - 1);
    }
  }, [activeQuestionNumber, selectQuestionNumber]);

  // Keyboard Shortcuts (CD-IELTS Standard)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in a textarea or text input
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if (e.altKey && (e.key === "n" || e.key === "N")) {
        e.preventDefault();
        goToNextQuestion();
      } else if (e.altKey && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        goToPrevQuestion();
      } else if (e.altKey && (e.key === "f" || e.key === "F")) {
        e.preventDefault();
        toggleFlagQuestion(activeQuestionNumber);
      } else if (e.altKey && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        toggleHideTime();
      } else if (!isInput && e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          goToPrevQuestion();
        } else {
          goToNextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeQuestionNumber, goToNextQuestion, goToPrevQuestion, toggleFlagQuestion, toggleHideTime]);

  // 6. Notes Feature
  const [notes, setNotes] = useState<ExamNote[]>([]);

  const addNote = useCallback((text: string) => {
    const newNote: ExamNote = {
      id: `note_${Date.now()}`,
      questionNumber: activeQuestionNumber,
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  }, [activeQuestionNumber]);

  const removeNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // 7. Scoring & Diagnostic Assessment
  const [isScoreReportOpen, setIsScoreReportOpen] = useState<boolean>(false);
  const [scoreReportData, setScoreReportData] = useState<MockTestOverallScore | null>(null);
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysisResult | null>(null);

  const calculateScores = useCallback(() => {
    // 1. Listening Scores (Pass 1 & Pass 2)
    const listeningQuestions = examData.listening.parts.flatMap((p) => p.questions);
    let pass1ListeningRaw = 0;
    let pass2ListeningRaw = 0;

    listeningQuestions.forEach((q) => {
      const userAns1 = (pass1Answers[q.id] || "").trim().toLowerCase();
      const userAns2 = (pass2Answers[q.id] || pass1Answers[q.id] || "").trim().toLowerCase();
      const correct = q.correctAnswer.trim().toLowerCase();
      const acceptable = (q.acceptableAnswers || []).map((a) => a.trim().toLowerCase());

      if (userAns1 === correct || acceptable.includes(userAns1)) {
        pass1ListeningRaw++;
      }
      if (userAns2 === correct || acceptable.includes(userAns2)) {
        pass2ListeningRaw++;
      }
    });

    // 2. Reading Scores (Pass 1 & Pass 2)
    const readingQuestions = examData.reading.passages.flatMap((p) => p.questions);
    let pass1ReadingRaw = 0;
    let pass2ReadingRaw = 0;

    readingQuestions.forEach((q) => {
      const userAns1 = (pass1Answers[q.id] || "").trim().toLowerCase();
      const userAns2 = (pass2Answers[q.id] || pass1Answers[q.id] || "").trim().toLowerCase();
      const correct = q.correctAnswer.trim().toLowerCase();
      const acceptable = (q.acceptableAnswers || []).map((a) => a.trim().toLowerCase());

      if (userAns1 === correct || acceptable.includes(userAns1)) {
        pass1ReadingRaw++;
      }
      if (userAns2 === correct || acceptable.includes(userAns2)) {
        pass2ReadingRaw++;
      }
    });

    const lBand1 = rawToListeningBand(pass1ListeningRaw);
    const rBand1 = rawToReadingBand(pass1ReadingRaw);

    const lBand2 = rawToListeningBand(pass2ListeningRaw);
    const rBand2 = rawToReadingBand(pass2ReadingRaw);

    // 3. Writing (Simulated or Evaluated)
    const task1Length = writingSubmissions.task1.trim().split(/\s+/).filter(Boolean).length;
    const task2Length = writingSubmissions.task2.trim().split(/\s+/).filter(Boolean).length;
    let wT1 = 6.0;
    let wT2 = 6.0;
    if (task1Length >= 150) wT1 += 1.0;
    if (task2Length >= 250) wT2 += 1.0;
    const writingBand = calculateWritingComposite(wT1, wT2);

    // 4. Speaking (Default estimation)
    const speakingBand = calculateSpeakingComposite(7.0, 7.0, 7.0, 7.0);

    // 5. Overall Band calculation (Cambridge Rounding)
    const overallPass1 = calculateCambridgeOverallBand(lBand1, rBand1, writingBand, speakingBand);
    const overallPass2 = calculateCambridgeOverallBand(lBand2, rBand2, writingBand, speakingBand);

    const gap = analyzeKnowledgeGap(
      pass1ReadingRaw,
      pass1ListeningRaw,
      pass2ReadingRaw,
      pass2ListeningRaw
    );

    const overallScore: MockTestOverallScore = {
      listening: {
        rawScore: pass1ListeningRaw,
        maxRawScore: 40,
        bandScore: lBand1,
      },
      reading: {
        rawScore: pass1ReadingRaw,
        maxRawScore: 40,
        bandScore: rBand1,
      },
      writing: {
        task1Band: wT1,
        task2Band: wT2,
        compositeBand: writingBand,
      },
      speaking: {
        fluencyBand: 7.0,
        lexicalBand: 7.0,
        grammarBand: 7.0,
        pronunciationBand: 7.0,
        compositeBand: speakingBand,
      },
      overallBand: overallPass1.overallBand,
      rawAverage: overallPass1.rawAverage,
      pass1Overall: overallPass1.overallBand,
      pass2Overall: overallPass2.overallBand,
      knowledgePotentialGap: gap.bandGap,
    };

    return { overallScore, gap };
  }, [
    examData,
    pass1Answers,
    pass2Answers,
    writingSubmissions,
  ]);

  // Submit Pass 1 -> Transition to Pass 2
  const submitPass1 = useCallback(async () => {
    setIsTimerRunning(false);
    const { overallScore, gap } = calculateScores();
    setScoreReportData(overallScore);
    setGapAnalysis(gap);

    // Automatically transition to Pass 2 Untimed Mode
    setCurrentPass("pass2");
  }, [calculateScores]);

  // Submit Pass 2 -> Save to Dexie DB and open Pass 3 Forensic Audit
  const submitPass2AndSaveDb = useCallback(async () => {
    const { overallScore, gap } = calculateScores();
    setScoreReportData(overallScore);
    setGapAnalysis(gap);

    try {
      // 1. Save Practice Log
      const logEntry: PracticeLog = {
        id: `pl_mock_${Date.now()}_${examData.id}`,
        type: "mock_test",
        materialId: examData.id,
        score: Math.round(overallScore.overallBand * 10),
        timeSpentSeconds: 165 * 60 - timeLeftSeconds,
        accuracyPercentage: Math.round(
          ((overallScore.listening.rawScore + overallScore.reading.rawScore) / 80) * 100
        ),
        details: {
          examTitle: examData.title,
          pass1Overall: overallScore.pass1Overall,
          pass2Overall: overallScore.pass2Overall,
          listeningBand: overallScore.listening.bandScore,
          readingBand: overallScore.reading.bandScore,
          writingBand: overallScore.writing.compositeBand,
          speakingBand: overallScore.speaking.compositeBand,
          knowledgeGap: gap.bandGap,
          bottleneck: gap.bottleneckType,
        },
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.add(logEntry);

      // 2. Identify Incorrect Questions and add to Error Bank
      const allQuestions = [
        ...examData.listening.parts.flatMap((p) => p.questions),
        ...examData.reading.passages.flatMap((p) => p.questions),
      ];

      for (const q of allQuestions) {
        const userAns1 = (pass1Answers[q.id] || "").trim();
        const correct = q.correctAnswer.trim();
        const acceptable = (q.acceptableAnswers || []).map((a) => a.trim().toLowerCase());

        if (userAns1.toLowerCase() !== correct.toLowerCase() && !acceptable.includes(userAns1.toLowerCase())) {
          const errorItem: ErrorItem = {
            id: `err_mock_${Date.now()}_${q.id}`,
            sourceModule: q.id.startsWith("l_") ? "listening" : "reading",
            errorType: q.distractorTrapType?.includes("paraphrase")
              ? "paraphrase_trap"
              : q.distractorTrapType?.includes("spelling")
              ? "pronunciation"
              : "careless_reading",
            questionContext: `[Full Mock Test - ${examData.code}] Câu ${q.questionNumber}: ${q.prompt}`,
            userWrongAnswer: userAns1 || "(Chưa làm câu này trong Pass 1)",
            correctAnswer: q.correctAnswer,
            deepExplanation: q.distractorExplanationVi,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.add(errorItem);
        }
      }
    } catch (e) {
      console.error("Failed to save Mock Test to Dexie DB:", e);
    }

    setCurrentPass("pass3");
    setIsScoreReportOpen(true);
  }, [calculateScores, examData, pass1Answers, timeLeftSeconds]);

  // Harvest Vocab to Dexie DB (vocab_matrix)
  const harvestVocabToMatrix = useCallback(async (items: HarvestableVocabItem[]) => {
    try {
      for (const item of items) {
        const card: VocabCard = {
          id: `vocab_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          word: item.word,
          ipa: item.ipa,
          meaning: item.meaningVi,
          definitionEn: item.word,
          collocations: [],
          originalContext: item.exampleSentence,
          category: "c1_academic",
          status: "learning",
          stepInterval: 1,
          nextReviewDate: new Date().toISOString(),
          repetitionCount: 0,
          lapsesCount: 0,
          bandLevel: "7.5+",
          sourceModule: item.sourceSkill,
          createdAt: new Date().toISOString(),
        };
        await db.vocab_matrix.put(card);
      }
    } catch (e) {
      console.error("Failed to harvest mock vocab to matrix:", e);
    }
  }, []);

  return {
    examData,
    currentSkill,
    setCurrentSkill,
    currentPass,
    setCurrentPass,
    activeQuestionNumber,
    selectQuestionNumber,
    activeQuestionItem,
    activeQuestionsList,
    goToNextQuestion,
    goToPrevQuestion,

    // Answers
    pass1Answers,
    pass2Answers,
    setAnswer,
    writingSubmissions,
    setWritingSubmissions,
    speakingSubmissions,
    setSpeakingSubmissions,

    // Flags & Visited
    flaggedQuestions,
    toggleFlagQuestion,
    visitedQuestions,

    // Timer
    timeLeftSeconds,
    isTimerRunning,
    effectiveTimeHidden,
    isTimeCriticallyLow,
    toggleHideTime,

    // Notes
    notes,
    addNote,
    removeNote,

    // Scores & Modals
    isScoreReportOpen,
    setIsScoreReportOpen,
    scoreReportData,
    gapAnalysis,
    submitPass1,
    submitPass2AndSaveDb,
    harvestVocabToMatrix,
  };
}
