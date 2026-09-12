/**
 * Academic Sentence Clinic Evaluator & Diagnostic Engine
 * Evaluates rewritten sentences against Cambridge Band 6.5, 7.5, 8.5+ solutions
 * Calculates lexical sophistication, grammatical precision, and logs mistakes to Error Bank
 */

import { SentenceClinicCase, SentenceClinicalSolution } from "@/data/mockSentenceClinicData";
import { calculateLevenshteinDistance, calculateWordSimilarity, cleanPunctuation } from "@/lib/levenshteinDiffEngine";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export interface SentenceEvaluationFeedback {
  estimatedBand: number; // 5.5, 6.5, 7.0, 7.5, 8.0, 8.5
  closestSolution: SentenceClinicalSolution;
  similarityPercentage: number;
  matchedCollocations: string[];
  diagnosedStrengthsVi: string[];
  diagnosedImprovementsVi: string[];
  isPassed: boolean; // Band >= 6.5
}

/**
 * Evaluates user rewritten sentence against clinic case benchmark solutions
 */
export function evaluateSentenceRevision(
  userInput: string,
  clinicCase: SentenceClinicCase
): SentenceEvaluationFeedback {
  const trimmed = userInput.trim();
  if (!trimmed) {
    return {
      estimatedBand: 5.0,
      closestSolution: clinicCase.solutions[0],
      similarityPercentage: 0,
      matchedCollocations: [],
      diagnosedStrengthsVi: [],
      diagnosedImprovementsVi: ["Bạn chưa nhập câu chỉnh sửa."],
      isPassed: false,
    };
  }

  // 1. Check similarity with each benchmark solution
  let bestSimilarity = 0;
  let bestSolution = clinicCase.solutions[0];

  for (const sol of clinicCase.solutions) {
    const sim = calculateSentenceSimilarity(sol.text, trimmed);
    if (sim > bestSimilarity) {
      bestSimilarity = sim;
      bestSolution = sol;
    }
  }

  // 2. Scan for C1 collocations from the palette
  const matchedCollocations: string[] = [];
  const lowerInput = trimmed.toLowerCase();

  clinicCase.collocationPalette.forEach((palette) => {
    palette.c1Alternatives.forEach((alt) => {
      const cleanAlt = cleanPunctuation(alt).toLowerCase();
      // Check if multi-word alt or key terms exist in input
      const altWords = cleanAlt.split(/\s+/).filter((w) => w.length > 3);
      const isPresent = altWords.length > 0 && altWords.every((w) => lowerInput.includes(w));
      if (isPresent || lowerInput.includes(cleanAlt)) {
        if (!matchedCollocations.includes(alt)) {
          matchedCollocations.push(alt);
        }
      }
    });
  });

  // 3. Determine Estimated Band
  let estimatedBand = clinicCase.originalBand;
  const diagnosedStrengths: string[] = [];
  const diagnosedImprovements: string[] = [];

  // Check if user simply retyped faulty sentence
  const faultySim = calculateSentenceSimilarity(clinicCase.faultySentence, trimmed);
  if (faultySim > 0.85) {
    diagnosedImprovements.push(
      "Câu của bạn vẫn giữ lại hầu hết các lỗi ngữ pháp/từ vựng gốc của bệnh án ban đầu."
    );
    estimatedBand = clinicCase.originalBand;
  } else {
    // Determine band based on similarity to solutions and collocation count
    if (bestSimilarity >= 0.8 || (bestSimilarity >= 0.65 && bestSolution.band === 8.5)) {
      estimatedBand = bestSolution.band;
    } else if (bestSimilarity >= 0.6) {
      estimatedBand = Math.max(6.5, bestSolution.band - 0.5);
    } else if (bestSimilarity >= 0.45) {
      estimatedBand = 6.5;
    } else {
      estimatedBand = 6.0;
    }

    // Boost band if rich collocations are present
    if (matchedCollocations.length >= 2 && estimatedBand < 8.0) {
      estimatedBand = Math.min(8.5, estimatedBand + 0.5);
    }

    // Strengths
    if (estimatedBand >= 8.0) {
      diagnosedStrengths.push(
        "Ứng dụng xuất sắc cấu trúc cú pháp nâng cao (Nominalization / Inversion / Participial clauses)."
      );
      diagnosedStrengths.push(
        "Sắc thái từ vựng C1/C2 trang trọng, khách quan và lập luận đanh thép."
      );
    } else if (estimatedBand >= 7.0) {
      diagnosedStrengths.push(
        "Khắc phục triệt để lỗi ngữ pháp cơ bản và sử dụng các cụm từ kết hợp tự nhiên (Collocations)."
      );
    } else {
      diagnosedStrengths.push("Đã sửa được lỗi cú pháp cơ bản của câu gốc.");
    }

    // Improvements
    if (estimatedBand < 8.0) {
      diagnosedImprovements.push(
        `Tham khảo phương án Band 8.5+: "${clinicCase.solutions.find((s) => s.band === 8.5)?.text || bestSolution.text}"`
      );
      diagnosedImprovements.push(
        "Thử vận dụng các cụm từ gợi ý trong Bảng Collocations Palette để nâng cao điểm Lexical Resource."
      );
    }
  }

  const isPassed = estimatedBand >= 6.5;

  return {
    estimatedBand,
    closestSolution: bestSolution,
    similarityPercentage: Math.round(bestSimilarity * 100),
    matchedCollocations,
    diagnosedStrengthsVi: diagnosedStrengths,
    diagnosedImprovementsVi: diagnosedImprovements,
    isPassed,
  };
}

/**
 * Calculates sentence-level token overlap and word similarity
 */
function calculateSentenceSimilarity(target: string, input: string): number {
  const targetWords = target.toLowerCase().split(/\s+/).map(cleanPunctuation).filter(Boolean);
  const inputWords = input.toLowerCase().split(/\s+/).map(cleanPunctuation).filter(Boolean);

  if (targetWords.length === 0 || inputWords.length === 0) return 0;

  let matchedWeight = 0;
  targetWords.forEach((tw) => {
    let bestWordSim = 0;
    inputWords.forEach((iw) => {
      const sim = calculateWordSimilarity(tw, iw);
      if (sim > bestWordSim) bestWordSim = sim;
    });
    if (bestWordSim >= 0.7) {
      matchedWeight += bestWordSim;
    }
  });

  const precision = matchedWeight / targetWords.length;
  const lengthPenalty = Math.min(1.0, inputWords.length / targetWords.length);
  return precision * lengthPenalty;
}

/**
 * Persist sentence clinic results to Dexie DB
 */
export async function saveSentenceClinicLog(
  clinicCase: SentenceClinicCase,
  userRevision: string,
  feedback: SentenceEvaluationFeedback
) {
  try {
    const isSuccess = feedback.isPassed;

    // 1. Log to practice_logs
    const logItem: PracticeLog = {
      id: `clinic_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type: "sentence_clinic",
      title: `Sentence Clinic: ${clinicCase.title}`,
      score: feedback.estimatedBand,
      totalQuestions: 9, // Max band
      completedAt: new Date().toISOString(),
      durationSeconds: 90,
      phase: 2,
      createdAt: new Date().toISOString(),
    };
    await db.practice_logs.put(logItem);

    // 2. If not passed or band < 6.5, log to error_bank
    if (!isSuccess || feedback.estimatedBand < 6.5) {
      const errItem: ErrorItem = {
        id: `err_clinic_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        sourceModule: "grammar",
        errorType: "grammar",
        questionContext: `[${clinicCase.stationNameVi}] Câu lỗi: "${clinicCase.faultySentence}"`,
        userWrongAnswer: userRevision || "(Chưa hoàn thành)",
        correctAnswer: feedback.closestSolution.text,
        deepExplanation: `${clinicCase.errorDescriptionVi} | Giải pháp: ${feedback.closestSolution.rationaleVi}`,
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      };
      await db.error_bank.put(errItem);
    }
  } catch (err) {
    console.error("Failed to save sentence clinic log to Dexie DB:", err);
  }
}

/**
 * Sync C1 Collocations to FSRS Vocab Matrix
 */
export async function syncCollocationsToVocabMatrix(
  collocations: Array<{ word: string; definitionVi: string; example: string }>
) {
  try {
    for (const col of collocations) {
      const vocabItem: VocabCard = {
        id: `colloc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        word: col.word,
        ipa: "/C1 Academic Collocation/",
        meaning: col.definitionVi,
        collocations: [col.word],
        originalContext: col.example,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        nextReviewDate: new Date().toISOString().split("T")[0],
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        createdAt: new Date().toISOString(),
      };
      await db.vocab_matrix.put(vocabItem);
    }
    return true;
  } catch (err) {
    console.error("Failed to sync collocations to Vocab Matrix:", err);
    return false;
  }
}
