/**
 * Theme-Rheme NLP Parser (Systemic Functional Linguistics)
 * Dissects Academic IELTS Writing sentences into Theme (Known information) and Rheme (New information)
 * Evaluates Information Flow Progression Patterns (Linear, Constant, Derived, Broken).
 */

export type ProgressionPattern = "linear" | "constant" | "hyper_theme" | "broken" | "first_sentence";

export interface ThemeRhemeSentence {
  id: string;
  sentenceIndex: number;
  fullSentence: string;
  theme: string;
  rheme: string;
  hasMechanicalLinker: boolean;
  linkerDetected?: string;
  keywordsInTheme: string[];
  keywordsInRheme: string[];
  connectionStatusToPrev: ProgressionPattern;
  cohesionNote: string;
}

export interface ParagraphCohesionAnalysis {
  sentences: ThemeRhemeSentence[];
  overallCohesionScore: number; // 0 - 100
  bandEstimate: string;
  brokenPointsCount: number;
  mechanicalLinkersCount: number;
  dominantPattern: ProgressionPattern;
  flowSummary: string;
}

const STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "and", "or", "but", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "can", "could", "will", "would",
  "shall", "should", "may", "might", "must", "it", "they", "them", "their",
]);

/**
 * Extracts key semantic noun/adjective tokens from a text chunk
 */
export function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

/**
 * Checks if two text spans share semantic or lexical stems
 */
export function calculateSemanticOverlap(spanA: string, spanB: string): {
  hasOverlap: boolean;
  sharedWords: string[];
  hasDeicticAnchor: boolean;
} {
  const kwA = extractKeywords(spanA);
  const kwB = extractKeywords(spanB);

  const sharedWords = kwA.filter((w) =>
    kwB.some((b) => b.includes(w) || w.includes(b))
  );

  // Check for deictic anaphoric reference (e.g., 'this discrepancy', 'such measures', 'these challenges')
  const lowerB = spanB.toLowerCase();
  const hasDeicticAnchor = /\b(this|these|such|that|those|the latter|the former)\b/.test(lowerB);

  return {
    hasOverlap: sharedWords.length > 0 || hasDeicticAnchor,
    sharedWords,
    hasDeicticAnchor,
  };
}

/**
 * Identifies the boundary between Theme and Rheme in an academic sentence
 */
export function splitThemeRheme(sentenceText: string): { theme: string; rheme: string } {
  const trimmed = sentenceText.trim();
  if (!trimmed) return { theme: "", rheme: "" };

  // Common main verbs indicating Rheme onset
  const verbRegex = /\b(is|are|was|were|has|have|had|can|could|will|would|may|might|must|should|creates|generates|leads|results|causes|precipitates|exacerbates|mitigates|reflects|demonstrates|indicates|reveals|suggests|remains|becomes|plays|constitutes|requires|enables|fosters)\b/i;

  const match = trimmed.match(verbRegex);

  if (match && match.index && match.index > 5) {
    const themePart = trimmed.substring(0, match.index).trim();
    const rhemePart = trimmed.substring(match.index).trim();
    return {
      theme: themePart || trimmed.substring(0, Math.min(25, trimmed.length)),
      rheme: rhemePart || trimmed.substring(Math.min(25, trimmed.length)),
    };
  }

  // Fallback: Split by first comma if exists, or first 4-5 words
  const commaIndex = trimmed.indexOf(",");
  if (commaIndex > 8 && commaIndex < trimmed.length - 15) {
    return {
      theme: trimmed.substring(0, commaIndex + 1).trim(),
      rheme: trimmed.substring(commaIndex + 1).trim(),
    };
  }

  const words = trimmed.split(/\s+/);
  if (words.length <= 4) {
    return { theme: words.slice(0, 2).join(" "), rheme: words.slice(2).join(" ") };
  }

  const themeWordCount = Math.max(3, Math.min(6, Math.floor(words.length * 0.35)));
  return {
    theme: words.slice(0, themeWordCount).join(" "),
    rheme: words.slice(themeWordCount).join(" "),
  };
}

/**
 * Parses a paragraph into Theme-Rheme structured sentences and evaluates information flow
 */
export function parseThemeRheme(paragraph: string): ParagraphCohesionAnalysis {
  const cleanP = paragraph.trim();
  if (!cleanP) {
    return {
      sentences: [],
      overallCohesionScore: 0,
      bandEstimate: "Band 4.0",
      brokenPointsCount: 0,
      mechanicalLinkersCount: 0,
      dominantPattern: "first_sentence",
      flowSummary: "Chưa có nội dung đoạn văn để phân tích.",
    };
  }

  // Split sentences while respecting common academic abbreviations
  const rawSentences = cleanP
    .replace(/(e\.g\.|i\.e\.|etc\.|Dr\.|Prof\.|approx\.)/gi, (match) => match.replace(/\./g, "_DOT_"))
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/_DOT_/g, ".").trim())
    .filter((s) => s.length > 5);

  const parsedSentences: ThemeRhemeSentence[] = [];
  let brokenCount = 0;
  let mechanicalCount = 0;
  let linearCount = 0;
  let constantCount = 0;

  const mechanicalRegex = /^(firstly|secondly|thirdly|furthermore|moreover|in addition|besides|on the other hand|in conclusion|to sum up|lastly|first of all)\b/i;

  rawSentences.forEach((rawSent, sIdx) => {
    const { theme, rheme } = splitThemeRheme(rawSent);
    const linkerMatch = rawSent.match(mechanicalRegex);
    const hasMechanical = !!linkerMatch;
    const linkerWord = linkerMatch ? linkerMatch[0] : undefined;

    if (hasMechanical) mechanicalCount++;

    const kwTheme = extractKeywords(theme);
    const kwRheme = extractKeywords(rheme);

    if (sIdx === 0) {
      parsedSentences.push({
        id: `sent_${sIdx}`,
        sentenceIndex: sIdx,
        fullSentence: rawSent,
        theme,
        rheme,
        hasMechanicalLinker: hasMechanical,
        linkerDetected: linkerWord,
        keywordsInTheme: kwTheme,
        keywordsInRheme: kwRheme,
        connectionStatusToPrev: "first_sentence",
        cohesionNote: "Câu chủ đề (Topic Sentence / Hyper-Theme) thiết lập điểm neo ban đầu cho người đọc.",
      });
      return;
    }

    const prevSent = parsedSentences[sIdx - 1];

    // Evaluate progression with previous sentence
    const linearCheck = calculateSemanticOverlap(prevSent.rheme, theme);
    const constantCheck = calculateSemanticOverlap(prevSent.theme, theme);

    let status: ProgressionPattern = "broken";
    let note = "";

    if (linearCheck.hasOverlap) {
      status = "linear";
      linearCount++;
      note = linearCheck.hasDeicticAnchor
        ? `Tiến trình bậc thang hoàn hảo (Linear Flow) qua đại từ quy chiếu định danh '${linearCheck.sharedWords.join(", ") || "this/these"}'.`
        : `Tiến trình bậc thang (Linear Progression): Rheme câu trước chuyển hóa mượt mà thành Theme câu này (${linearCheck.sharedWords.join(", ")}).`;
    } else if (constantCheck.hasOverlap) {
      status = "constant";
      constantCount++;
      note = `Tiến trình đồng trục (Constant Theme): Duy trì cùng một chủ thể '${constantCheck.sharedWords.join(", ")}' nhưng mở rộng đa chiều.`;
    } else {
      status = "broken";
      brokenCount++;
      note = "⚠️ Cảnh báo gãy mạch thông tin (Cohesion Breakpoint): Đề ngữ câu này không bắt nguồn từ thông tin đã biết của câu trước.";
    }

    parsedSentences.push({
      id: `sent_${sIdx}`,
      sentenceIndex: sIdx,
      fullSentence: rawSent,
      theme,
      rheme,
      hasMechanicalLinker: hasMechanical,
      linkerDetected: linkerWord,
      keywordsInTheme: kwTheme,
      keywordsInRheme: kwRheme,
      connectionStatusToPrev: status,
      cohesionNote: note,
    });
  });

  // Calculate Overall Cohesion Band Score (Scale 0 - 100)
  const totalTransitions = Math.max(1, parsedSentences.length - 1);
  const validTransitions = totalTransitions - brokenCount;
  const transitionRatio = validTransitions / totalTransitions;

  // Mechanical penalty
  const mechanicalPenalty = Math.min(30, mechanicalCount * 10);
  const baseScore = Math.round(transitionRatio * 85 + 15 - mechanicalPenalty);
  const overallCohesionScore = Math.max(35, Math.min(98, baseScore));

  let bandEstimate = "Band 5.5 - 6.0";
  if (overallCohesionScore >= 88 && mechanicalCount === 0) {
    bandEstimate = "Band 8.0 - 9.0 (Cohesion attracts no attention)";
  } else if (overallCohesionScore >= 75) {
    bandEstimate = "Band 7.0 - 7.5 (Well-managed Progression)";
  } else if (overallCohesionScore >= 60) {
    bandEstimate = "Band 6.0 - 6.5 (Mechanical Cohesive Devices)";
  } else {
    bandEstimate = "Band 5.0 - 5.5 (Faulty Incoherent Progression)";
  }

  let dominantPattern: ProgressionPattern = "linear";
  if (linearCount >= constantCount && linearCount > 0) {
    dominantPattern = "linear";
  } else if (constantCount > 0) {
    dominantPattern = "constant";
  } else if (brokenCount > 0) {
    dominantPattern = "broken";
  }

  const flowSummary =
    mechanicalCount > 0
      ? `Phát hiện ${mechanicalCount} liên từ máy móc đầu câu. Cần thay thế bằng Kỹ thuật Đại từ Quy chiếu hoặc Phân từ bổ nghĩa để đạt Band 8.0+ CC.`
      : brokenCount === 0
      ? `Dòng chảy thông tin Đề - Thuyết đạt chuẩn C1/C2! Các mắt xích luận điểm kết nối tự nhiên, không gây chú ý lộ liễu.`
      : `Phát hiện ${brokenCount} điểm gãy mạch. Người đọc sẽ bị hẫng vì thông tin mới xuất hiện đột ngột mà không có cầu nối chuyển tiếp.`;

  return {
    sentences: parsedSentences,
    overallCohesionScore,
    bandEstimate,
    brokenPointsCount: brokenCount,
    mechanicalLinkersCount: mechanicalCount,
    dominantPattern,
    flowSummary,
  };
}
