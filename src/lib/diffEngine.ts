import { ErrorClassification } from "@/types/database";

export type DiffStatus = "correct" | "wrong" | "missing" | "extra";

export interface DiffToken {
  id: string;
  originalText: string;
  userText?: string;
  targetText?: string;
  status: DiffStatus;
  errorClassification?: ErrorClassification;
  explanation?: string;
}

export interface DiffResult {
  tokens: DiffToken[];
  totalTargetWords: number;
  correctWordsCount: number;
  wrongWordsCount: number;
  missingWordsCount: number;
  extraWordsCount: number;
  accuracyPercentage: number;
  identifiedErrors: Array<{
    userWord: string;
    targetWord: string;
    classification: ErrorClassification;
    reason: string;
  }>;
}

/**
 * Clean a word token by stripping punctuation and converting to lowercase for fair matching
 */
export function cleanWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, "")
    .trim();
}

/**
 * Calculate Levenshtein distance between two strings
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Check if the difference between user word and target word is solely a singular/plural or tense inflection
 */
export function detectSingularPluralMismatch(userWord: string, targetWord: string): boolean {
  const u = cleanWord(userWord);
  const t = cleanWord(targetWord);

  if (u === t) return false;

  // Regular s / es / ies
  if (u + "s" === t || t + "s" === u) return true;
  if (u + "es" === t || t + "es" === u) return true;
  if (u.replace(/y$/, "ies") === t || t.replace(/y$/, "ies") === u) return true;

  // Irregular plurals
  const irregularPairs: Array<[string, string]> = [
    ["child", "children"],
    ["person", "people"],
    ["man", "men"],
    ["woman", "women"],
    ["foot", "feet"],
    ["tooth", "teeth"],
    ["datum", "data"],
    ["criterion", "criteria"],
    ["phenomenon", "phenomena"],
    ["analysis", "analyses"],
  ];

  for (const [sing, plur] of irregularPairs) {
    if ((u === sing && t === plur) || (u === plur && t === sing)) {
      return true;
    }
  }

  return false;
}

/**
 * Compare user typed sentence against the target transcript using Longest Common Subsequence (LCS)
 */
export function compareSentences(userInput: string, targetTranscript: string): DiffResult {
  const userWords = userInput.trim().split(/\s+/).filter(Boolean);
  const targetWords = targetTranscript.trim().split(/\s+/).filter(Boolean);

  const uClean = userWords.map(cleanWord);
  const tClean = targetWords.map(cleanWord);

  const n = uClean.length;
  const m = tClean.length;

  // LCS DP table
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (uClean[i - 1] === tClean[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff alignment
  let i = n;
  let j = m;
  const rawDiff: Array<{
    userText?: string;
    targetText?: string;
    status: DiffStatus;
  }> = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && uClean[i - 1] === tClean[j - 1]) {
      rawDiff.unshift({
        userText: userWords[i - 1],
        targetText: targetWords[j - 1],
        status: "correct",
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rawDiff.unshift({
        targetText: targetWords[j - 1],
        status: "missing",
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      rawDiff.unshift({
        userText: userWords[i - 1],
        status: "extra",
      });
      i--;
    }
  }

  // Refine alignments (Pair adjacent extra & missing as 'wrong' substitution)
  const tokens: DiffToken[] = [];
  const identifiedErrors: DiffResult["identifiedErrors"] = [];
  let correctWordsCount = 0;
  let wrongWordsCount = 0;
  let missingWordsCount = 0;
  let extraWordsCount = 0;

  for (let k = 0; k < rawDiff.length; k++) {
    const current = rawDiff[k];
    const next = rawDiff[k + 1];

    if (current.status === "correct") {
      correctWordsCount++;
      tokens.push({
        id: `token_${k}`,
        originalText: current.targetText || current.userText || "",
        userText: current.userText,
        targetText: current.targetText,
        status: "correct",
      });
    } else if (
      (current.status === "extra" && next && next.status === "missing") ||
      (current.status === "missing" && next && next.status === "extra")
    ) {
      // Combined into a substitution / wrong word
      const userTxt = current.status === "extra" ? current.userText! : next.userText!;
      const targetTxt = current.status === "missing" ? current.targetText! : next.targetText!;

      const isSingularPlural = detectSingularPluralMismatch(userTxt, targetTxt);
      const classification: ErrorClassification = isSingularPlural
        ? "singular_plural"
        : levenshteinDistance(cleanWord(userTxt), cleanWord(targetTxt)) <= 2
        ? "pronunciation"
        : "vocabulary";

      const reason = isSingularPlural
        ? `Lỗi số ít / số nhiều: Bạn gõ '${userTxt}' trong khi câu chuẩn là '${targetTxt}'.`
        : `Nghe nhầm hoặc sai chính tả: Bạn gõ '${userTxt}', câu chuẩn là '${targetTxt}'.`;

      wrongWordsCount++;
      identifiedErrors.push({
        userWord: userTxt,
        targetWord: targetTxt,
        classification,
        reason,
      });

      tokens.push({
        id: `token_${k}`,
        originalText: targetTxt,
        userText: userTxt,
        targetText: targetTxt,
        status: "wrong",
        errorClassification: classification,
        explanation: reason,
      });

      k++; // Skip paired next item
    } else if (current.status === "missing") {
      missingWordsCount++;
      tokens.push({
        id: `token_${k}`,
        originalText: current.targetText!,
        targetText: current.targetText,
        status: "missing",
        explanation: `Bạn đã bỏ sót từ '${current.targetText}' trong bài nghe.`,
      });
    } else if (current.status === "extra") {
      extraWordsCount++;
      tokens.push({
        id: `token_${k}`,
        originalText: current.userText!,
        userText: current.userText,
        status: "extra",
        explanation: `Bạn đã gõ thừa từ '${current.userText}'.`,
      });
    }
  }

  const totalTargetWords = targetWords.length;
  const accuracyPercentage =
    totalTargetWords > 0
      ? Math.max(0, Math.min(100, Math.round((correctWordsCount / totalTargetWords) * 100)))
      : 0;

  return {
    tokens,
    totalTargetWords,
    correctWordsCount,
    wrongWordsCount,
    missingWordsCount,
    extraWordsCount,
    accuracyPercentage,
    identifiedErrors,
  };
}
