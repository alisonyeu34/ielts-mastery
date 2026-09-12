/**
 * Academic Shorthand & Stenographic Lexicon Engine (IELTS Listening Section 4 - Step 78)
 * Working Memory Mitigation, 20 Stenographic Symbols, and Singular/Plural Diagnostic Engine
 */

export interface StenographySymbol {
  id: string;
  symbol: string;
  shortcut: string;
  keyboardAlt?: string;
  meaning: string;
  academicExamples: string[];
  category: "trend" | "logic" | "quantity" | "abbreviation";
}

export const ACADEMIC_STENOGRAPHY_SYMBOLS: StenographySymbol[] = [
  {
    id: "increase",
    symbol: "↑",
    shortcut: "\\inc",
    keyboardAlt: "Alt+1",
    meaning: "Increase / Surge / Rise / Soar",
    academicExamples: ["temp ↑ by 2°C", "demand for energy ↑"],
    category: "trend"
  },
  {
    id: "decrease",
    symbol: "↓",
    shortcut: "\\dec",
    keyboardAlt: "Alt+2",
    meaning: "Decrease / Drop / Decline / Plummet",
    academicExamples: ["forest density ↓ sharply", "pop ↓ in rural areas"],
    category: "trend"
  },
  {
    id: "delta",
    symbol: "Δ",
    shortcut: "\\delta",
    keyboardAlt: "Alt+3",
    meaning: "Change / Fluctuation / Variation",
    academicExamples: ["seasonal Δ in rainfall", "climate Δ policy"],
    category: "trend"
  },
  {
    id: "leads_to",
    symbol: "→",
    shortcut: "\\to",
    keyboardAlt: "Alt+4",
    meaning: "Leads to / Causes / Triggers / Results in",
    academicExamples: ["urbanization → habitat loss", "pollution → acidic soil"],
    category: "logic"
  },
  {
    id: "caused_by",
    symbol: "←",
    shortcut: "\\from",
    keyboardAlt: "Alt+5",
    meaning: "Stems from / Caused by / Driven by",
    academicExamples: ["coral bleaching ← warming ocean", "extinction ← poaching"],
    category: "logic"
  },
  {
    id: "because",
    symbol: "∵",
    shortcut: "\\bec",
    keyboardAlt: "Alt+6",
    meaning: "Because / Since / Due to / Owing to",
    academicExamples: ["study abandoned ∵ lack of funding", "species extinct ∵ drought"],
    category: "logic"
  },
  {
    id: "therefore",
    symbol: "∴",
    shortcut: "\\there",
    keyboardAlt: "Alt+7",
    meaning: "Therefore / Consequently / As a result",
    academicExamples: ["high toxicity ∴ prohibited", "soil degraded ∴ crop yield drop"],
    category: "logic"
  },
  {
    id: "approx",
    symbol: "≈",
    shortcut: "\\app",
    keyboardAlt: "Alt+8",
    meaning: "Approximately / Roughly / Estimated at",
    academicExamples: ["≈ 450 specimens", "duration ≈ 3 centuries"],
    category: "quantity"
  },
  {
    id: "not_equal",
    symbol: "≠",
    shortcut: "\\neq",
    keyboardAlt: "Alt+9",
    meaning: "Differs from / Not equal to / Distinct",
    academicExamples: ["behavior in lab ≠ wild behavior", "male diet ≠ female diet"],
    category: "quantity"
  },
  {
    id: "greater",
    symbol: ">",
    shortcut: "\\gt",
    meaning: "Greater than / Exceeds / Higher than",
    academicExamples: ["depth > 2000m", "lifespan > 50 yrs"],
    category: "quantity"
  },
  {
    id: "less",
    symbol: "<",
    shortcut: "\\lt",
    meaning: "Less than / Fewer than / Below",
    academicExamples: ["oxygen level < 15%", "infant mortality < 2%"],
    category: "quantity"
  },
  {
    id: "with",
    symbol: "w/",
    shortcut: "\\w",
    meaning: "With / Accompanied by",
    academicExamples: ["nesting sites w/ direct sunlight", "alloy w/ copper"],
    category: "abbreviation"
  },
  {
    id: "without",
    symbol: "w/o",
    shortcut: "\\wo",
    meaning: "Without / Devoid of / Lacking",
    academicExamples: ["growth w/o sunlight", "reaction w/o catalyst"],
    category: "abbreviation"
  },
  {
    id: "bc_text",
    symbol: "b/c",
    shortcut: "\\bc",
    meaning: "Because / Due to",
    academicExamples: ["delayed b/c equipment failure"],
    category: "abbreviation"
  },
  {
    id: "govt",
    symbol: "govt",
    shortcut: "\\govt",
    meaning: "Government / Regulatory authority",
    academicExamples: ["govt grant allocated for marine sanctuary"],
    category: "abbreviation"
  },
  {
    id: "env",
    symbol: "env",
    shortcut: "\\env",
    meaning: "Environment / Environmental",
    academicExamples: ["severe env impact from microplastics"],
    category: "abbreviation"
  },
  {
    id: "ind",
    symbol: "ind",
    shortcut: "\\ind",
    meaning: "Industry / Industrial sector",
    academicExamples: ["heavy ind emissions regulated"],
    category: "abbreviation"
  },
  {
    id: "tech",
    symbol: "tech",
    shortcut: "\\tech",
    meaning: "Technology / Technological advancement",
    academicExamples: ["satellite tech utilized for migration tracking"],
    category: "abbreviation"
  },
  {
    id: "pop",
    symbol: "pop",
    shortcut: "\\pop",
    meaning: "Population / Demographic group",
    academicExamples: ["indigenous pop declining in northern territories"],
    category: "abbreviation"
  },
  {
    id: "econ",
    symbol: "econ",
    shortcut: "\\econ",
    meaning: "Economy / Economic viability",
    academicExamples: ["sustainable econ model required for green transition"],
    category: "abbreviation"
  }
];

export interface AnswerValidationResult {
  isCorrect: boolean;
  userAnswer: string;
  expectedAnswer: string;
  acceptableAlternatives: string[];
  errorClassification: "correct" | "singular_plural" | "spelling" | "word_limit" | "distractor_trap" | "incorrect";
  diagnosticExplanation: string;
}

export function autoExpandShorthandText(rawText: string): string {
  let expanded = rawText;
  ACADEMIC_STENOGRAPHY_SYMBOLS.forEach((item) => {
    // Replace shortcuts when surrounded by space or punctuation
    const regex = new RegExp(escapeRegex(item.shortcut) + "(\\s|$)", "g");
    expanded = expanded.replace(regex, `${item.symbol}$1`);
  });
  return expanded;
}

function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function validateSection4Answer(
  userRawAnswer: string,
  expectedAnswer: string,
  acceptableAlternatives: string[] = [],
  maxWords: number = 1,
  distractor: string = ""
): AnswerValidationResult {
  const cleanUser = userRawAnswer.trim().toLowerCase();
  const cleanExpected = expectedAnswer.trim().toLowerCase();
  const cleanAlternatives = acceptableAlternatives.map((a) => a.trim().toLowerCase());

  const userWords = cleanUser.split(/\s+/).filter(Boolean);

  // Check word limit
  if (userWords.length > maxWords) {
    return {
      isCorrect: false,
      userAnswer: userRawAnswer,
      expectedAnswer,
      acceptableAlternatives,
      errorClassification: "word_limit",
      diagnosticExplanation: `Vi phạm số lượng từ cho phép! Đề bài yêu cầu tối đa ${maxWords} từ (NO MORE THAN ${maxWords} WORD${maxWords > 1 ? "S" : ""}), nhưng bạn đã điền ${userWords.length} từ.`
    };
  }

  // Exact match with primary or alternatives
  if (cleanUser === cleanExpected || cleanAlternatives.includes(cleanUser)) {
    return {
      isCorrect: true,
      userAnswer: userRawAnswer,
      expectedAnswer,
      acceptableAlternatives,
      errorClassification: "correct",
      diagnosticExplanation: "Chính xác tuyệt đối! Định dạng danh từ và chính tả đạt chuẩn 100%."
    };
  }

  // Check singular / plural discrepancy (The #1 Section 4 Killer Error)
  const isSingularPluralMismatch =
    (cleanUser + "s" === cleanExpected ||
      cleanUser + "es" === cleanExpected ||
      cleanUser === cleanExpected + "s" ||
      cleanUser === cleanExpected + "es" ||
      (cleanExpected.endsWith("ies") && cleanUser.endsWith("y") && cleanExpected.slice(0, -3) === cleanUser.slice(0, -1))) &&
    cleanUser !== cleanExpected;

  if (isSingularPluralMismatch) {
    return {
      isCorrect: false,
      userAnswer: userRawAnswer,
      expectedAnswer,
      acceptableAlternatives,
      errorClassification: "singular_plural",
      diagnosticExplanation: `Bẫy Số Ít / Số Nhiều (-s/-es)! Đáp án chính xác là "${expectedAnswer}", bạn điền "${userRawAnswer}". Trong Section 4, thiếu hoặc thừa đuôi số nhiều sẽ bị trừ điểm trực tiếp.`
    };
  }

  // Check Acoustic Distractor Trap
  if (distractor && cleanUser === distractor.toLowerCase()) {
    return {
      isCorrect: false,
      userAnswer: userRawAnswer,
      expectedAnswer,
      acceptableAlternatives,
      errorClassification: "distractor_trap",
      diagnosticExplanation: `Bẫy Âm Học Gây Nhiễu (Acoustic Distractor)! "${distractor}" là thông tin người thuyết trình đã đề cập trước đó nhưng ngay sau đó đã tự đính chính hoặc bác bỏ để đưa ra "${expectedAnswer}".`
    };
  }

  // Check Levenshtein / Spelling error
  const distance = levenshteinDistance(cleanUser, cleanExpected);
  if (distance <= 2 && cleanUser.length >= 4) {
    return {
      isCorrect: false,
      userAnswer: userRawAnswer,
      expectedAnswer,
      acceptableAlternatives,
      errorClassification: "spelling",
      diagnosticExplanation: `Lỗi Chính Tả (Spelling Error)! Bạn viết "${userRawAnswer}" thay vì "${expectedAnswer}". Điểm thi IELTS không chấp nhận lỗi sai chính tả.`
    };
  }

  return {
    isCorrect: false,
    userAnswer: userRawAnswer,
    expectedAnswer,
    acceptableAlternatives,
    errorClassification: "incorrect",
    diagnosticExplanation: `Chưa chính xác. Đáp án học thuật chuẩn là "${expectedAnswer}".`
  };
}

function levenshteinDistance(a: string, b: string): number {
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
