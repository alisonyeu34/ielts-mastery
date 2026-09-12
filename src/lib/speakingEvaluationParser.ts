import { ErrorItem } from "@/types/database";
import { AnnotatedToken } from "@/data/mockSpeakingFeedbackData";

const FILLER_WORD_REGEX = /\b(um|uh|like|you know|sort of|kind of|actually|basically)\b/gi;

export interface FillerAnalysisResult {
  totalFillers: number;
  totalWords: number;
  fillerPercentage: number;
  counts: Record<string, number>;
}

/**
 * Calculate Words Per Minute (WPM)
 */
export function calculateWPM(wordCount: number, durationSeconds: number): number {
  if (durationSeconds <= 0) return 0;
  return Math.round((wordCount / durationSeconds) * 60);
}

/**
 * Analyze frequency of filler words in speech transcript
 */
export function analyzeFillerWords(transcript: string): FillerAnalysisResult {
  const words = transcript
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const totalWords = Math.max(1, words.length);

  const counts: Record<string, number> = {
    um: 0,
    uh: 0,
    like: 0,
    "you know": 0,
    actually: 0,
    basically: 0,
  };

  let totalFillers = 0;

  // Check 2-word fillers first
  const lowerText = transcript.toLowerCase();
  const youKnowMatches = lowerText.match(/\byou know\b/g);
  if (youKnowMatches) {
    counts["you know"] = youKnowMatches.length;
    totalFillers += youKnowMatches.length;
  }

  // Single word fillers
  words.forEach((w) => {
    const cleanWord = w.toLowerCase().replace(/[^a-z]/g, "");
    if (cleanWord === "um" || cleanWord === "uh" || cleanWord === "like" || cleanWord === "actually" || cleanWord === "basically") {
      counts[cleanWord] = (counts[cleanWord] || 0) + 1;
      totalFillers++;
    }
  });

  const fillerPercentage = Number(((totalFillers / totalWords) * 100).toFixed(1));

  return {
    totalFillers,
    totalWords,
    fillerPercentage,
    counts,
  };
}

/**
 * Calculate official IELTS Speaking overall score from 4 criteria with Cambridge rounding
 */
export function calculateOfficialSpeakingBand(
  fc: number,
  lr: number,
  gra: number,
  pr: number
): number {
  const average = (fc + lr + gra + pr) / 4;
  const fractional = average - Math.floor(average);

  let roundedBand = Math.floor(average);
  if (fractional < 0.25) {
    roundedBand += 0.0;
  } else if (fractional < 0.75) {
    roundedBand += 0.5;
  } else {
    roundedBand += 1.0;
  }

  return Number(roundedBand.toFixed(1));
}

/**
 * Extract structured errors from speaking annotated tokens to persist in Dexie DB's error_bank
 */
export function extractSpeakingErrorsForErrorBank(
  annotatedTokens: AnnotatedToken[],
  promptTitle: string
): ErrorItem[] {
  const items: ErrorItem[] = [];

  annotatedTokens.forEach((token, idx) => {
    if (token.type === "gra" || token.type === "lr" || token.type === "pr") {
      let errorType: ErrorItem["errorType"] = "grammar";
      if (token.type === "pr") errorType = "pronunciation";
      else if (token.type === "lr") errorType = "paraphrase_trap";

      items.push({
        id: `err_speaking_${Date.now()}_${idx}`,
        sourceModule: "speaking",
        errorType,
        questionContext: `[Speaking: ${promptTitle.substring(0, 45)}...] Cụm nói: "${token.text.trim()}"`,
        userWrongAnswer: token.text.trim(),
        correctAnswer: token.correction || "Cần diễn đạt chuẩn học thuật",
        deepExplanation: token.explanation || "Lỗi ngữ pháp/từ vựng phát hiện trong bài nói Speaking.",
        mastered: false,
        retryCount: 0,
        consecutiveSuccesses: 0,
        createdAt: new Date().toISOString(),
      });
    }
  });

  return items;
}
