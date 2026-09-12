export type TokenDiffStatus = "correct" | "incorrect" | "missing" | "extra";

export interface TokenDiff {
  targetWord: string;
  userWord?: string;
  status: TokenDiffStatus;
  isPunctuationOnlyDifference?: boolean;
  phonemicWarning?: string;
}

export interface WordDiffResult {
  tokens: TokenDiff[];
  correctCount: number;
  totalTargetWords: number;
  accuracyPercentage: number;
  hasPluralOrTenseError: boolean;
  hasPhonemicError: boolean;
  detectedErrors: Array<{
    type: "singular_plural" | "pronunciation";
    word: string;
    expected: string;
    message: string;
  }>;
}

function normalizeWord(w: string): string {
  return w.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").trim().toLowerCase();
}

/**
 * Advanced Levenshtein / Token alignment diff engine for Dictation
 */
export function computeWordDiff(targetText: string, userInputText: string): WordDiffResult {
  const targetWords = targetText.trim().split(/\s+/).filter(Boolean);
  const userWords = userInputText.trim().split(/\s+/).filter(Boolean);

  const tokens: TokenDiff[] = [];
  const detectedErrors: WordDiffResult["detectedErrors"] = [];

  let userIdx = 0;
  let correctCount = 0;
  let hasPluralOrTenseError = false;
  let hasPhonemicError = false;

  for (let tIdx = 0; tIdx < targetWords.length; tIdx++) {
    const rawTarget = targetWords[tIdx];
    const normTarget = normalizeWord(rawTarget);

    if (userIdx >= userWords.length) {
      // Missing remaining words
      const isWeak = ["a", "an", "the", "of", "to", "at", "in", "was", "has", "had"].includes(normTarget);
      tokens.push({
        targetWord: rawTarget,
        status: "missing",
        phonemicWarning: isWeak ? "Nghe sót từ chức năng do hiện tượng Weak Form / Nuốt âm" : undefined,
      });

      if (isWeak) {
        hasPhonemicError = true;
        detectedErrors.push({
          type: "pronunciation",
          word: "(bỏ sót)",
          expected: rawTarget,
          message: `Nghe sót từ chức năng '${rawTarget}' do bị nuốt âm hoặc phát âm dạng yếu (Weak Form).`,
        });
      }
      continue;
    }

    const rawUser = userWords[userIdx];
    const normUser = normalizeWord(rawUser);

    if (normTarget === normUser) {
      // 1. Exact Match
      tokens.push({
        targetWord: rawTarget,
        userWord: rawUser,
        status: "correct",
      });
      correctCount++;
      userIdx++;
    } else {
      // 2. Check for Missing -s / -es / -ed / Plural traps
      const isPluralTrap =
        normTarget === normUser + "s" ||
        normTarget === normUser + "es" ||
        normTarget + "s" === normUser ||
        normTarget + "es" === normUser;

      const isTenseTrap =
        normTarget === normUser + "ed" ||
        normTarget === normUser + "d" ||
        normTarget + "ed" === normUser;

      if (isPluralTrap) {
        hasPluralOrTenseError = true;
        tokens.push({
          targetWord: rawTarget,
          userWord: rawUser,
          status: "incorrect",
          phonemicWarning: "Lỗi số ít/số nhiều (Bỏ quên hoặc thêm nhầm đuôi -s/-es)",
        });
        detectedErrors.push({
          type: "singular_plural",
          word: rawUser,
          expected: rawTarget,
          message: `Sai đuôi số ít/số nhiều: Bạn gõ '${rawUser}' nhưng bài nói là '${rawTarget}'.`,
        });
        userIdx++;
      } else if (isTenseTrap) {
        hasPluralOrTenseError = true;
        tokens.push({
          targetWord: rawTarget,
          userWord: rawUser,
          status: "incorrect",
          phonemicWarning: "Lỗi thì quá khứ (Bỏ quên đuôi chia động từ -ed)",
        });
        detectedErrors.push({
          type: "singular_plural",
          word: rawUser,
          expected: rawTarget,
          message: `Sai đuôi chia thì quá khứ: Bạn gõ '${rawUser}' nhưng bài nói là '${rawTarget}'.`,
        });
        userIdx++;
      } else {
        // Lookahead check: Did user skip this word or type an extra word?
        const nextUserMatch = userWords[userIdx + 1] ? normalizeWord(userWords[userIdx + 1]) === normTarget : false;
        const nextTargetMatch = targetWords[tIdx + 1] ? normalizeWord(targetWords[tIdx + 1]) === normUser : false;

        if (nextTargetMatch) {
          // User skipped current target word
          tokens.push({
            targetWord: rawTarget,
            status: "missing",
            phonemicWarning: "Nghe sót từ do nối âm",
          });
          hasPhonemicError = true;
          detectedErrors.push({
            type: "pronunciation",
            word: "(bỏ sót)",
            expected: rawTarget,
            message: `Bỏ sót từ '${rawTarget}' trong chuỗi âm thanh liên tục.`,
          });
        } else {
          // Normal substitution error
          tokens.push({
            targetWord: rawTarget,
            userWord: rawUser,
            status: "incorrect",
          });
          userIdx++;
        }
      }
    }
  }

  // Handle any remaining extra words typed by user
  while (userIdx < userWords.length) {
    tokens.push({
      targetWord: "",
      userWord: userWords[userIdx],
      status: "extra",
    });
    userIdx++;
  }

  const accuracyPercentage = Math.max(
    0,
    Math.min(100, Math.round((correctCount / Math.max(1, targetWords.length)) * 100))
  );

  return {
    tokens,
    correctCount,
    totalTargetWords: targetWords.length,
    accuracyPercentage,
    hasPluralOrTenseError,
    hasPhonemicError,
    detectedErrors,
  };
}
