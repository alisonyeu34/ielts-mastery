import { ErrorItem } from "@/types/database";
import { AnnotatedSentence } from "@/data/mockWritingFeedbackData";

const COMMON_FUNCTION_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with",
  "by", "of", "from", "as", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "this", "that", "these", "those",
  "it", "its", "they", "them", "their", "we", "us", "our", "i", "me", "my",
  "you", "your", "he", "him", "his", "she", "her", "so", "if", "not", "no",
  "can", "could", "will", "would", "should", "may", "might", "must", "there",
  "here", "when", "where", "why", "how", "what", "which", "who", "whom",
]);

const AWL_SEEDS = new Set([
  "contemporary", "compulsory", "community", "numerous", "benefit", "essential",
  "activities", "responsible", "academic", "adolescents", "mandatory", "constructively",
  "policy", "positive", "contributions", "integrating", "secondary", "curricula",
  "catalyst", "development", "unequivocally", "perspective", "initiatives",
  "multifaceted", "altruistic", "endeavors", "indispensable", "competencies",
  "resilience", "curriculum", "scholastic", "devoid", "pragmatic", "acumen",
  "socioeconomic", "deterrent", "delinquency", "susceptible", "subversive",
  "mitigate", "engagement", "empathy", "interpersonal", "individual", "criteria",
]);

export interface LexicalDensityResult {
  totalWords: number;
  uniqueWords: number;
  contentWordsCount: number;
  lexicalDensityPercentage: number;
  awlWordsCount: number;
  awlPercentage: number;
}

/**
 * Calculate lexical density and AWL ratio of an essay
 */
export function calculateLexicalDensity(essayText: string): LexicalDensityResult {
  const tokens = essayText
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const totalWords = Math.max(1, tokens.length);
  const uniqueWordsSet = new Set(tokens);
  const uniqueWords = uniqueWordsSet.size;

  let contentWordsCount = 0;
  let awlWordsCount = 0;

  tokens.forEach((word) => {
    if (!COMMON_FUNCTION_WORDS.has(word)) {
      contentWordsCount++;
    }
    if (AWL_SEEDS.has(word)) {
      awlWordsCount++;
    }
  });

  const lexicalDensityPercentage = Math.round((contentWordsCount / totalWords) * 100);
  const awlPercentage = Math.round((awlWordsCount / totalWords) * 100);

  return {
    totalWords,
    uniqueWords,
    contentWordsCount,
    lexicalDensityPercentage,
    awlWordsCount,
    awlPercentage,
  };
}

/**
 * Calculate official IELTS Writing overall score from 4 criteria with Cambridge rounding
 */
export function calculateOfficialWritingBand(
  tr: number,
  cc: number,
  lr: number,
  gra: number
): number {
  const average = (tr + cc + lr + gra) / 4;
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
 * Extract structured errors from annotated sentences to persist in Dexie DB's error_bank
 */
export function extractErrorsForErrorBank(
  annotatedSentences: AnnotatedSentence[],
  promptTitle: string
): ErrorItem[] {
  const items: ErrorItem[] = [];

  annotatedSentences.forEach((sentence) => {
    sentence.flaggedIssues.forEach((issue, idx) => {
      let errorClassification: ErrorItem["errorType"] = "grammar";
      if (issue.type === "lr") {
        errorClassification = "paraphrase_trap";
      } else if (issue.type === "gra" && issue.errorSnippet.includes("students")) {
        errorClassification = "singular_plural";
      } else if (issue.type === "tr" || issue.type === "cc") {
        errorClassification = "careless_reading";
      }

      items.push({
        id: `err_writing_${Date.now()}_${sentence.id}_${idx}`,
        sourceModule: "writing",
        errorType: errorClassification,
        questionContext: `[Writing Task 2: ${promptTitle.substring(0, 45)}...] Câu: "${sentence.originalSentence}"`,
        userWrongAnswer: issue.errorSnippet,
        correctAnswer: sentence.band65Correction,
        deepExplanation: `${issue.issueDescription} Gợi ý nâng cấp Band 8.0+: "${sentence.band80Upgrade}"`,
        mastered: false,
        retryCount: 0,
        consecutiveSuccesses: 0,
        createdAt: new Date().toISOString(),
      });
    });
  });

  return items;
}
