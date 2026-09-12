export interface HedgingCategoryMatch {
  categoryName: string;
  foundItems: string[];
}

export interface HedgingAnalysisResult {
  score: number; // 0 - 100
  bandLevel: string; // e.g. "Band 8.0+"
  totalHedgingCount: number;
  tentativeVerbs: string[];
  probabilityAdverbs: string[];
  quantifiers: string[];
  conditionalFraming: string[];
  overgeneralizationFlaws: string[];
  isNuanced: boolean;
  feedbackVi: string;
  suggestionsVi: string[];
}

const TENTATIVE_VERBS = [
  "tend to",
  "tends to",
  "tended to",
  "appear to",
  "appears to",
  "seemed to",
  "seem to",
  "seems to",
  "be inclined to",
  "am inclined to",
  "is inclined to",
  "are inclined to",
  "could potentially",
  "might conceivably",
  "would arguably",
  "suggest that",
  "suggests that",
  "indicate that",
  "indicates that",
  "serve to",
  "serves to",
];

const PROBABILITY_ADVERBS = [
  "arguably",
  "predominantly",
  "plausibly",
  "ostensibly",
  "conceivably",
  "statistically",
  "substantially",
  "inherently",
  "scarcely",
  "largely",
  "primarily",
  "typically",
];

const APPROXIMATING_QUANTIFIERS = [
  "the vast majority of",
  "a considerable proportion",
  "a significant portion",
  "the overwhelming majority",
  "in certain circumstances",
  "to some degree",
  "somewhat",
  "partially",
  "by no means",
];

const CONDITIONAL_FRAMING = [
  "provided that",
  "subject to",
  "assuming that",
  "in my estimation",
  "from the perspective of",
  "looking through the lens of",
  "while it is undeniable that",
  "in stark contrast",
  "on a micro level",
  "on a macro level",
];

const OVERGENERALIZATION_PATTERNS = [
  /\balways\b/gi,
  /\bnever\b/gi,
  /\ball people\b/gi,
  /\ball workers\b/gi,
  /\beveryone\b/gi,
  /\beverybody\b/gi,
  /\bcompletely useless\b/gi,
  /\btotally useless\b/gi,
  /\bonly care about\b/gi,
  /\bforce everybody\b/gi,
  /\ball uneducated\b/gi,
  /\b100%\b/gi,
];

/**
 * Scans a text input for 4 tiers of Academic Hedging and overgeneralization flaws.
 */
export function evaluateHedgingDensity(text: string): HedgingAnalysisResult {
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      bandLevel: "Band 4.0",
      totalHedgingCount: 0,
      tentativeVerbs: [],
      probabilityAdverbs: [],
      quantifiers: [],
      conditionalFraming: [],
      overgeneralizationFlaws: [],
      isNuanced: false,
      feedbackVi: "Chưa có nội dung văn bản để đánh giá kỹ thuật rào đón.",
      suggestionsVi: [],
    };
  }

  const lower = text.toLowerCase();

  const foundVerbs = TENTATIVE_VERBS.filter((phrase) => lower.includes(phrase));
  const foundAdverbs = PROBABILITY_ADVERBS.filter((phrase) => lower.includes(phrase));
  const foundQuantifiers = APPROXIMATING_QUANTIFIERS.filter((phrase) =>
    lower.includes(phrase)
  );
  const foundConditionals = CONDITIONAL_FRAMING.filter((phrase) =>
    lower.includes(phrase)
  );

  const foundFlaws: string[] = [];
  OVERGENERALIZATION_PATTERNS.forEach((regex) => {
    const matches = text.match(regex);
    if (matches) {
      matches.forEach((m) => {
        if (!foundFlaws.includes(m.toLowerCase())) {
          foundFlaws.push(m.toLowerCase());
        }
      });
    }
  });

  const totalHedgingCount =
    foundVerbs.length +
    foundAdverbs.length +
    foundQuantifiers.length +
    foundConditionals.length;

  let rawScore = Math.min(100, totalHedgingCount * 25);
  // Penalty for overgeneralizations
  rawScore = Math.max(0, rawScore - foundFlaws.length * 20);

  const isNuanced = totalHedgingCount >= 2 && foundFlaws.length === 0;

  let bandLevel = "Band 5.5";
  if (rawScore >= 80) bandLevel = "Band 8.0 - 8.5";
  else if (rawScore >= 60) bandLevel = "Band 7.0 - 7.5";
  else if (rawScore >= 40) bandLevel = "Band 6.0 - 6.5";

  const suggestionsVi: string[] = [];
  if (foundVerbs.length === 0) {
    suggestionsVi.push("Chèn thêm động từ dè dặt như 'tend to', 'appear to suggest', 'could potentially'.");
  }
  if (foundAdverbs.length === 0) {
    suggestionsVi.push("Bổ sung trạng từ xác suất như 'arguably', 'predominantly', 'plausibly'.");
  }
  if (foundFlaws.length > 0) {
    suggestionsVi.push(`Loại bỏ các từ phát biểu tuyệt đối hóa võ đoán: (${foundFlaws.join(", ")}).`);
  }

  const feedbackVi = isNuanced
    ? "Tuyệt vời! Lập luận có độ rào đón học thuật tinh tế, bảo vệ quan điểm trước các ngoại lệ thực tế (Chuẩn mực Band 8.0+)."
    : foundFlaws.length > 0
    ? `⚠️ Phát hiện lỗi phát biểu tuyệt đối hóa (${foundFlaws.join(", ")}). Hãy thay bằng lượng từ tương đối để tăng tính học thuật.`
    : "Lập luận còn hơi trực diện. Hãy chèn ít nhất 2 yếu tố Hedging để đạt chuẩn Band 7.5+ Speaking Part 3.";

  return {
    score: rawScore,
    bandLevel,
    totalHedgingCount,
    tentativeVerbs: foundVerbs,
    probabilityAdverbs: foundAdverbs,
    quantifiers: foundQuantifiers,
    conditionalFraming: foundConditionals,
    overgeneralizationFlaws: foundFlaws,
    isNuanced,
    feedbackVi,
    suggestionsVi,
  };
}
