/**
 * Mixed Chart Analysis & Validation Engine (IELTS Writing Task 1 - Step 77)
 * Evaluates Cross-Graph Synthesis, Dual Overview Structure, and Higher-Order Comparative Lexis
 */

export interface DualOverviewAnalysis {
  hasOverviewKeyword: boolean;
  addressesChart1: boolean;
  addressesChart2: boolean;
  hasSynthesisLink: boolean;
  isDualOverviewValid: boolean;
  feedback: string;
}

export interface SynthesisSentenceDetail {
  text: string;
  isComparative: boolean;
  matchedLinkers: string[];
  mentionsChart1Metric: boolean;
  mentionsChart2Metric: boolean;
  isCrossGraphSynthesis: boolean;
}

export interface HigherOrderLexisMatch {
  category: "multiplicative" | "proportional" | "inverse" | "juxtaposition" | "correlation";
  pattern: string;
  foundInText: string;
}

export interface MixedChartValidationResult {
  totalWords: number;
  paragraphCount: number;
  totalSentences: number;
  synthesisSentenceCount: number;
  synthesisRatio: number; // percentage (0 - 100%)
  targetRatioMet: boolean; // >= 40%
  dualOverview: DualOverviewAnalysis;
  higherOrderLexis: HigherOrderLexisMatch[];
  isolatedDumpingDetected: boolean;
  bandScoreEstimate: {
    overall: number;
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
  };
  recommendations: string[];
}

const OVERVIEW_KEYWORDS = [
  "overall",
  "in general",
  "it is noticeable that",
  "it is clear that",
  "it is apparent that",
  "a glance at the graphs reveals",
  "broadly speaking",
  "in summary"
];

const CROSS_GRAPH_COMPARATIVE_LINKERS = [
  "while",
  "whilst",
  "whereas",
  "in contrast",
  "on the other hand",
  "conversely",
  "in comparison with",
  "compared to",
  "as opposed to",
  "in parallel with",
  "coincided with",
  "mirrored by",
  "corresponds to",
  "in inverse proportion to",
  "inversely related",
  "positively correlated",
  "outstripped",
  "eclipsed",
  "dwarfed by",
  "surpassed",
  "accounted for a predominant proportion",
  "threefold",
  "fourfold",
  "twofold",
  "double that of",
  "triple that of",
  "a significant discrepancy",
  "a stark contrast",
  "despite the surge in",
  "notwithstanding the drop in"
];

const HIGHER_ORDER_PATTERNS: { category: HigherOrderLexisMatch["category"]; regex: RegExp; name: string }[] = [
  { category: "multiplicative", regex: /\b(twofold|threefold|fourfold|fivefold|doubled|tripled|quadrupled|double that of|triple that of)\b/i, name: "Multiplicative Comparison" },
  { category: "proportional", regex: /\b(predominant proportion|lion's share|vast majority|marginal fraction|two-thirds share|constituting nearly half)\b/i, name: "Proportional Representation" },
  { category: "inverse", regex: /\b(in inverse proportion|inversely related|an inverse relationship|diverged sharply|opposite trajectory)\b/i, name: "Inverse / Divergent Dynamics" },
  { category: "juxtaposition", regex: /\b(outstripped|eclipsed|dwarfed|surpassed|exceeded by a factor of|a stark contrast)\b/i, name: "Asymmetric Juxtaposition" },
  { category: "correlation", regex: /\b(coincided with|mirrored by|corresponded with|aligned closely with|parallel trend)\b/i, name: "Correlational Linkage" }
];

export function analyzeMixedChartEssay(
  essayText: string,
  chart1Keywords: string[] = ["production", "consumption", "rate", "units", "tons", "sales", "energy", "car", "petrol"],
  chart2Keywords: string[] = ["revenue", "percentage", "cost", "expenditure", "share", "diesel", "electric", "price", "profit"]
): MixedChartValidationResult {
  const cleanText = essayText.trim();
  if (!cleanText) {
    return {
      totalWords: 0,
      paragraphCount: 0,
      totalSentences: 0,
      synthesisSentenceCount: 0,
      synthesisRatio: 0,
      targetRatioMet: false,
      dualOverview: {
        hasOverviewKeyword: false,
        addressesChart1: false,
        addressesChart2: false,
        hasSynthesisLink: false,
        isDualOverviewValid: false,
        feedback: "Vui lòng nhập bài viết để bắt đầu phân tích."
      },
      higherOrderLexis: [],
      isolatedDumpingDetected: false,
      bandScoreEstimate: { overall: 0, taskAchievement: 0, coherenceCohesion: 0, lexicalResource: 0, grammaticalRange: 0 },
      recommendations: ["Bắt đầu viết bài Task 1 phân tích cả 2 biểu đồ."]
    };
  }

  const words = cleanText.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  const paragraphs = cleanText
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const paragraphCount = paragraphs.length;

  // Split into sentences
  const sentenceRegex = /[^.!?]+[.!?]+/g;
  const sentenceMatches = cleanText.match(sentenceRegex) || [cleanText];
  const sentences = sentenceMatches.map((s) => s.trim()).filter((s) => s.length > 5);
  const totalSentences = Math.max(sentences.length, 1);

  // Analyze Synthesis Sentences
  let synthesisCount = 0;
  sentences.forEach((sent) => {
    const lower = sent.toLowerCase();
    const matchedLinkers = CROSS_GRAPH_COMPARATIVE_LINKERS.filter((linker) =>
      lower.includes(linker.toLowerCase())
    );

    const mentionsChart1 = chart1Keywords.some((k) => lower.includes(k.toLowerCase()));
    const mentionsChart2 = chart2Keywords.some((k) => lower.includes(k.toLowerCase()));
    const isCrossGraph = (mentionsChart1 && mentionsChart2) || matchedLinkers.length > 0;

    if (isCrossGraph) {
      synthesisCount++;
    }
  });

  const synthesisRatio = Math.round((synthesisCount / totalSentences) * 100);
  const targetRatioMet = synthesisRatio >= 40;

  // Analyze Overview Paragraph (usually Paragraph 2 or 4)
  let overviewParagraph = "";
  for (const p of paragraphs) {
    const pLower = p.toLowerCase();
    if (OVERVIEW_KEYWORDS.some((kw) => pLower.includes(kw))) {
      overviewParagraph = p;
      break;
    }
  }

  // If no explicit keyword, fallback to paragraph 2
  if (!overviewParagraph && paragraphs.length >= 2) {
    overviewParagraph = paragraphs[1];
  }

  const overviewLower = overviewParagraph.toLowerCase();
  const hasOverviewKeyword = OVERVIEW_KEYWORDS.some((kw) => overviewLower.includes(kw));
  const addressesChart1 = chart1Keywords.some((kw) => overviewLower.includes(kw.toLowerCase()));
  const addressesChart2 = chart2Keywords.some((kw) => overviewLower.includes(kw.toLowerCase()));
  const hasSynthesisLink = CROSS_GRAPH_COMPARATIVE_LINKERS.some((kw) => overviewLower.includes(kw.toLowerCase()));

  const isDualOverviewValid =
    hasOverviewKeyword && addressesChart1 && addressesChart2 && (hasSynthesisLink || overviewParagraph.split(/[.!?]+/).length >= 2);

  let overviewFeedback = "";
  if (!overviewParagraph) {
    overviewFeedback = "Thiếu đoạn Overview rõ ràng. Cần có đoạn tổng quan 2-3 câu nêu xu hướng chủ đạo của CẢ 2 biểu đồ.";
  } else if (!hasOverviewKeyword) {
    overviewFeedback = "Đoạn Overview nên mở đầu bằng các cụm từ học thuật như 'Overall, it is noticeable that...'";
  } else if (!addressesChart1 || !addressesChart2) {
    overviewFeedback = "Overview chưa bao quát cả 2 biểu đồ! Band 8.0+ Task 1 bắt buộc phải tóm tắt key features của cả Biểu đồ 1 lẫn Biểu đồ 2.";
  } else if (!hasSynthesisLink) {
    overviewFeedback = "Overview đã nhắc 2 biểu đồ nhưng nên kết nối chúng bằng liên từ đối sánh (while, whereas, in contrast).";
  } else {
    overviewFeedback = "Đoạn Dual Overview xuất sắc! Bao quát đầy đủ xu hướng trọng yếu của cả 2 biểu đồ và có liên kết đối sánh.";
  }

  // Higher-Order Lexis Scanner
  const higherOrderLexis: HigherOrderLexisMatch[] = [];
  HIGHER_ORDER_PATTERNS.forEach(({ category, regex, name }) => {
    const match = cleanText.match(regex);
    if (match) {
      higherOrderLexis.push({
        category,
        pattern: name,
        foundInText: match[0]
      });
    }
  });

  // Isolated Data Dumping Detector (Body 1 purely C1, Body 2 purely C2 without any comparison)
  let isolatedDumpingDetected = false;
  if (paragraphs.length >= 4) {
    const body1 = paragraphs[2].toLowerCase();
    const body2 = paragraphs[3].toLowerCase();

    const body1OnlyC1 = chart1Keywords.some((k) => body1.includes(k)) && !chart2Keywords.some((k) => body1.includes(k));
    const body2OnlyC2 = chart2Keywords.some((k) => body2.includes(k)) && !chart1Keywords.some((k) => body2.includes(k));

    if (body1OnlyC1 && body2OnlyC2 && synthesisRatio < 30) {
      isolatedDumpingDetected = true;
    }
  }

  // Score estimation
  let taScore = 5.0;
  if (totalWords >= 150) taScore += 0.5;
  if (isDualOverviewValid) taScore += 1.0;
  if (targetRatioMet) taScore += 1.0;
  if (!isolatedDumpingDetected && synthesisRatio >= 40) taScore += 0.5;
  taScore = Math.min(taScore, 9.0);

  let ccScore = 5.5;
  if (paragraphCount >= 4) ccScore += 0.5;
  if (synthesisCount >= 3) ccScore += 1.0;
  if (hasSynthesisLink) ccScore += 0.5;
  ccScore = Math.min(ccScore, 8.5);

  let lrScore = 5.5;
  if (higherOrderLexis.length >= 2) lrScore += 1.0;
  if (higherOrderLexis.length >= 4) lrScore += 1.0;
  lrScore = Math.min(lrScore, 8.5);

  let graScore = 6.0;
  if (totalWords >= 160) graScore += 0.5;
  if (synthesisRatio >= 35) graScore += 1.0;
  graScore = Math.min(graScore, 8.5);

  const overall = Number(((taScore + ccScore + lrScore + graScore) / 4).toFixed(1));

  // Recommendations
  const recommendations: string[] = [];
  if (totalWords < 150) {
    recommendations.push(`Độ dài bài viết (${totalWords} từ) chưa đạt chuẩn tối thiểu 150 từ của IELTS Task 1.`);
  }
  if (!isDualOverviewValid) {
    recommendations.push("Nâng cấp Dual Overview: Viết 2-3 câu tổng hợp xu hướng lớn nhất của cả Biểu đồ 1 & Biểu đồ 2.");
  }
  if (synthesisRatio < 40) {
    recommendations.push(`Tỷ lệ câu tổng hợp chéo biểu đồ hiện tại là ${synthesisRatio}%. Cần đạt tối thiểu 40% để tránh bẫy liệt kê số liệu rời rạc (Isolated Data Dumping).`);
  }
  if (higherOrderLexis.length < 2) {
    recommendations.push("Bổ sung cấu trúc so sánh bậc cao: 'threefold increase', 'accounted for the lion\\'s share', 'in inverse proportion to'.");
  }
  if (isolatedDumpingDetected) {
    recommendations.push("CẢNH BÁO BẪY TÁCH BIỆT: Bạn đang tả Biểu đồ 1 ở Body 1 và Biểu đồ 2 ở Body 2 mà không có câu đối sánh chéo nào. Hãy gom nhóm theo correlation (tương quan)!");
  }
  if (recommendations.length === 0) {
    recommendations.push("Bài viết xuất sắc! Đạt tiêu chuẩn cấu trúc Task 1 Band 8.0+ với khả năng tổng hợp dữ liệu bất đối xứng chuẩn xác.");
  }

  return {
    totalWords,
    paragraphCount,
    totalSentences,
    synthesisSentenceCount: synthesisCount,
    synthesisRatio,
    targetRatioMet,
    dualOverview: {
      hasOverviewKeyword,
      addressesChart1,
      addressesChart2,
      hasSynthesisLink,
      isDualOverviewValid,
      feedback: overviewFeedback
    },
    higherOrderLexis,
    isolatedDumpingDetected,
    bandScoreEstimate: {
      overall,
      taskAchievement: taScore,
      coherenceCohesion: ccScore,
      lexicalResource: lrScore,
      grammaticalRange: graScore
    },
    recommendations
  };
}
