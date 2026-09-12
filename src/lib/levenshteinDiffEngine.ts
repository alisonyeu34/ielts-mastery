/**
 * Real-time Character-level & Word Diff Engine
 * Levenshtein Distance & Phonetic Acoustic Trap Analyzer
 * Specializes in detecting omitted grammatical endings (-s, -es, -ed) and functional cloze words
 */

export interface WordDiffToken {
  word: string;
  userWord?: string;
  status: "correct" | "incorrect" | "missing" | "extra" | "ending_omitted";
  omittedEnding?: "-s" | "-es" | "-ed" | string;
  similarityScore?: number; // 0 to 1
}

export interface CharacterDiffToken {
  char: string;
  type: "correct" | "incorrect" | "missing" | "extra";
}

export interface DictationDiffResult {
  accuracyPercentage: number;
  wordTokens: WordDiffToken[];
  totalTargetWords: number;
  correctWordsCount: number;
  endingOmissionsCount: number;
  missingWordsCount: number;
  extraWordsCount: number;
  isFullyCorrect: boolean;
  rawInput: string;
  rawTarget: string;
}

/**
 * Standard Levenshtein Distance calculation
 */
export function calculateLevenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * Calculate similarity between two words (0.0 to 1.0)
 */
export function calculateWordSimilarity(target: string, input: string): number {
  const t = target.trim().toLowerCase();
  const inp = input.trim().toLowerCase();
  if (t === inp) return 1.0;
  if (!t || !inp) return 0.0;
  const maxLen = Math.max(t.length, inp.length);
  const distance = calculateLevenshteinDistance(t, inp);
  return Math.max(0, (maxLen - distance) / maxLen);
}

/**
 * Clean punctuation from word for acoustic comparison while preserving casing
 */
export function cleanPunctuation(str: string): string {
  return str.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, "").trim();
}

/**
 * Detect omitted phonetic endings (-s, -es, -ed, 's, etc.)
 */
export function detectPhoneticEndingsOmission(
  targetWord: string,
  userWord: string
): { isOmission: boolean; ending?: "-s" | "-es" | "-ed" | string } {
  const cleanTarget = cleanPunctuation(targetWord).toLowerCase();
  const cleanUser = cleanPunctuation(userWord).toLowerCase();

  if (cleanTarget === cleanUser) return { isOmission: false };

  // Check for plural / 3rd person -s or -es
  if (cleanTarget.endsWith("es") && cleanUser === cleanTarget.slice(0, -2)) {
    return { isOmission: true, ending: "-es" };
  }
  if (cleanTarget.endsWith("s") && cleanUser === cleanTarget.slice(0, -1)) {
    return { isOmission: true, ending: "-s" };
  }

  // Check for past tense -ed
  if (cleanTarget.endsWith("ed") && cleanUser === cleanTarget.slice(0, -2)) {
    return { isOmission: true, ending: "-ed" };
  }
  if (cleanTarget.endsWith("d") && cleanUser === cleanTarget.slice(0, -1)) {
    return { isOmission: true, ending: "-ed" };
  }

  return { isOmission: false };
}

/**
 * Compute word-level and character-level diff between target transcript and user input
 */
export function computeWordDiff(
  targetSentence: string,
  userInput: string
): DictationDiffResult {
  const targetWords = targetSentence.trim().split(/\s+/).filter(Boolean);
  const userWords = userInput.trim().split(/\s+/).filter(Boolean);

  const tokens: WordDiffToken[] = [];
  let correctCount = 0;
  let endingOmissionCount = 0;
  let missingCount = 0;
  let extraCount = 0;

  let uIdx = 0;
  for (let tIdx = 0; tIdx < targetWords.length; tIdx++) {
    const tWord = targetWords[tIdx];
    const cleanT = cleanPunctuation(tWord).toLowerCase();

    if (uIdx >= userWords.length) {
      // User ran out of words
      tokens.push({
        word: tWord,
        status: "missing",
      });
      missingCount++;
      continue;
    }

    const uWord = userWords[uIdx];
    const cleanU = cleanPunctuation(uWord).toLowerCase();

    if (cleanT === cleanU) {
      // Exact match
      tokens.push({
        word: tWord,
        userWord: uWord,
        status: "correct",
        similarityScore: 1.0,
      });
      correctCount++;
      uIdx++;
    } else {
      // Check for ending omission (-s, -es, -ed)
      const endingCheck = detectPhoneticEndingsOmission(tWord, uWord);
      if (endingCheck.isOmission) {
        tokens.push({
          word: tWord,
          userWord: uWord,
          status: "ending_omitted",
          omittedEnding: endingCheck.ending,
          similarityScore: 0.8,
        });
        endingOmissionCount++;
        uIdx++;
      } else {
        // Check if user skipped this word or substituted it
        const nextUserWord = userWords[uIdx + 1]
          ? cleanPunctuation(userWords[uIdx + 1]).toLowerCase()
          : "";
        const nextTargetWord = targetWords[tIdx + 1]
          ? cleanPunctuation(targetWords[tIdx + 1]).toLowerCase()
          : "";

        if (cleanT === nextUserWord) {
          // Current user word is extra / noise
          tokens.push({
            word: `[+${uWord}]`,
            userWord: uWord,
            status: "extra",
            similarityScore: 0,
          });
          extraCount++;
          uIdx += 2; // skip extra word and match next
          correctCount++;
        } else if (cleanU === nextTargetWord) {
          // Target word was skipped by user
          tokens.push({
            word: tWord,
            status: "missing",
          });
          missingCount++;
          // do not increment uIdx so uWord matches next tWord
        } else {
          // Word was typed incorrectly
          const similarity = calculateWordSimilarity(cleanT, cleanU);
          tokens.push({
            word: tWord,
            userWord: uWord,
            status: "incorrect",
            similarityScore: similarity,
          });
          uIdx++;
        }
      }
    }
  }

  // Any remaining user words are extra
  while (uIdx < userWords.length) {
    tokens.push({
      word: `[+${userWords[uIdx]}]`,
      userWord: userWords[uIdx],
      status: "extra",
      similarityScore: 0,
    });
    extraCount++;
    uIdx++;
  }

  const totalTargetWords = targetWords.length;
  // Calculate percentage: correct words + partial credit (0.5) for ending omission
  const rawScore = correctCount + endingOmissionCount * 0.6;
  const accuracyPercentage =
    totalTargetWords > 0 ? Math.min(100, Math.round((rawScore / totalTargetWords) * 100)) : 0;

  return {
    accuracyPercentage,
    wordTokens: tokens,
    totalTargetWords,
    correctWordsCount: correctCount,
    endingOmissionsCount: endingOmissionCount,
    missingWordsCount: missingCount,
    extraWordsCount: extraCount,
    isFullyCorrect: correctCount === totalTargetWords && extraCount === 0,
    rawInput: userInput,
    rawTarget: targetSentence,
  };
}

/**
 * Character diff generator for interactive placeholder views
 */
export function computeCharDiff(
  targetWord: string,
  userWord: string
): CharacterDiffToken[] {
  const cleanT = cleanPunctuation(targetWord);
  const cleanU = cleanPunctuation(userWord);
  const result: CharacterDiffToken[] = [];

  const maxLen = Math.max(cleanT.length, cleanU.length);
  for (let i = 0; i < maxLen; i++) {
    const tChar = cleanT[i];
    const uChar = cleanU[i];

    if (tChar && uChar) {
      if (tChar.toLowerCase() === uChar.toLowerCase()) {
        result.push({ char: uChar, type: "correct" });
      } else {
        result.push({ char: uChar, type: "incorrect" });
      }
    } else if (!tChar && uChar) {
      result.push({ char: uChar, type: "extra" });
    } else if (tChar && !uChar) {
      result.push({ char: tChar, type: "missing" });
    }
  }

  return result;
}
