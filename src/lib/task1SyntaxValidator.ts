export interface OverviewValidationResult {
  hasData: boolean;
  foundItems: string[];
  warningMessage: string;
}

/**
 * Detects specific numbers, percentages, or years in an Overview paragraph.
 * Rule: Band 7.0+ Overview should NOT contain specific data points.
 */
export function detectDataInOverview(overviewText: string): OverviewValidationResult {
  if (!overviewText || overviewText.trim().length === 0) {
    return { hasData: false, foundItems: [], warningMessage: "" };
  }

  const foundItems: string[] = [];

  // Match numbers, decimals, percentages (e.g. 48, 14.5%, 50%)
  const numberRegex = /\b\d+(\.\d+)?%?\b/g;
  const numbers = overviewText.match(numberRegex);
  if (numbers) {
    numbers.forEach((num) => {
      // Exclude generic number words if needed
      if (!foundItems.includes(num)) {
        foundItems.push(num);
      }
    });
  }

  // Match specific unit words tied to data (e.g. 10 million, 5 Mtoe)
  const unitRegex = /\b(million|billion|thousand|mtoe|tonnes?)\b/gi;
  const units = overviewText.match(unitRegex);
  if (units) {
    units.forEach((u) => {
      if (!foundItems.includes(u.toLowerCase())) {
        foundItems.push(u.toLowerCase());
      }
    });
  }

  const hasData = foundItems.length > 0;
  const warningMessage = hasData
    ? `⚠️ CẢNH BÁO BĂNG ĐIỂM BAND 7.0+: Phát hiện số liệu chi tiết (${foundItems.join(
        ", "
      )}) trong đoạn Overview! Quy tắc sống còn của IELTS Task Achievement là đoạn Tổng quan KHÔNG ĐƯỢC chứa số liệu cụ thể. Hãy chuyển chi tiết này xuống Body Paragraphs.`
    : "";

  return {
    hasData,
    foundItems,
    warningMessage,
  };
}

/**
 * Accurately counts words in an English essay.
 */
export function countWords(text: string): number {
  if (!text) return 0;
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

/**
 * Verifies Preposition usage for Writing Task 1
 */
export function verifyPrepositionUsage(
  userInput: string,
  targetPrep: "by" | "to" | "at" | "of"
): boolean {
  return userInput.trim().toLowerCase() === targetPrep.toLowerCase();
}

/**
 * Validates Trend transformation (e.g. "a significant increase")
 */
export function validateTrendTransformation(
  userInput: string,
  expectedNounPhrase: string
): { isCorrect: boolean; feedback: string } {
  const cleanUser = userInput.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
  const cleanExpected = expectedNounPhrase.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

  const isCorrect = cleanUser === cleanExpected || cleanUser.includes(cleanExpected);

  return {
    isCorrect,
    feedback: isCorrect
      ? "Chính xác! Cấu trúc Noun Phrase chuẩn xác giúp tăng điểm Grammatical Range & Accuracy (GRA)."
      : `Chưa chuẩn. Cụm từ mong đợi là: "${expectedNounPhrase}".`,
  };
}
