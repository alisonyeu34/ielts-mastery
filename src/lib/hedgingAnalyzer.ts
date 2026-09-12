/**
 * Academic Hedging & Epistemic Modality Analyzer (Step 83)
 * Detects Dogmatic Overstatements, Measures Hedging Density, and Calibrates Epistemic Probability
 */

export interface DogmaticTermMatch {
  matchedText: string;
  index: number;
  length: number;
  category: "absolute_quantifier" | "unwarranted_certainty" | "hyperbolic_assertion";
  critique: string;
  hedgedReplacements: string[];
}

export interface HedgingMarkerMatch {
  marker: string;
  tier: 1 | 2 | 3 | 4 | 5;
  tierName: "Modal Auxiliary" | "Epistemic Adverb" | "Attitudinal Verb" | "Noun Qualifier" | "Boundary Clause";
}

export interface HedgingAnalysisReport {
  rawText: string;
  sentenceCount: number;
  dogmaticTerms: DogmaticTermMatch[];
  hedgingMarkers: HedgingMarkerMatch[];
  hedgingDensityPercentage: number;
  epistemicCalibrationScore: number; // 0 - 100
  certaintyLevel: "Dogmatic Overstatement (100%)" | "High Likelihood (75%)" | "Calibrated Academic Hypothesis (50%)" | "Cautious Epistemic Skepticism (25%)";
  taskResponseEstimatedBand: number; // 5.0 - 9.0
  recommendations: string[];
}

export const DOGMATIC_OVERSTATEMENTS: {
  regex: RegExp;
  category: DogmaticTermMatch["category"];
  critique: string;
  hedgedReplacements: string[];
}[] = [
  {
    regex: /\b(always|every single time|at all times)\b/i,
    category: "absolute_quantifier",
    critique: "Khẳng định tuyệt đối hóa thời gian. Trong nghiên cứu học thuật, luôn tồn tại các biến số ngoại lệ.",
    hedgedReplacements: ["predominantly", "frequently tend to", "in a substantial majority of recorded instances"]
  },
  {
    regex: /\b(never|under no circumstances will it ever)\b/i,
    category: "absolute_quantifier",
    critique: "Phủ định tuyệt đối không chừa khoảng trống cho các phát hiện thực nghiệm mới.",
    hedgedReplacements: ["rarely", "seldom exhibits", "is scarcely observed under baseline conditions"]
  },
  {
    regex: /\b(definitely|undeniably|indisputably|without (a )?doubt|100%)\b/i,
    category: "unwarranted_certainty",
    critique: "Võ đoán quá mức (Dogmatic assertion). Làm suy giảm nghiêm trọng độ khách quan của bài viết học thuật.",
    hedgedReplacements: ["arguably", "the available evidence strongly indicates", "there is a distinct likelihood that"]
  },
  {
    regex: /\b(obviously|clearly|it is crystal clear that|anyone can see that)\b/i,
    category: "unwarranted_certainty",
    critique: "Văn phong cảm tính áp đặt người đọc. Những vấn đề học thuật phức tạp không thể quy là 'hiển nhiên'.",
    hedgedReplacements: ["ostensibly", "empirical metrics suggest that", "current observations lend credence to the notion that"]
  },
  {
    regex: /\b(everyone|all people|every citizen|everybody)\b/i,
    category: "absolute_quantifier",
    critique: "Khái quát hóa vội vã (Overgeneralization) toàn bộ dân số.",
    hedgedReplacements: ["a substantial proportion of the populace", "many demographic cohorts", "citizens across diverse socioeconomic strata"]
  },
  {
    regex: /\b(impossible|cannot ever happen|there is no way)\b/i,
    category: "hyperbolic_assertion",
    critique: "Phán đoán bất khả thi mang tính phỏng đoán cá nhân.",
    hedgedReplacements: ["highly improbable", "faces formidable feasibility constraints", "remains scarcely tenable under current paradigms"]
  },
  {
    regex: /\b(prove(s)? (that|100%)|irrefutable proof)\b/i,
    category: "unwarranted_certainty",
    critique: "Khoa học xã hội và kinh tế học hiếm khi dùng từ 'chứng minh tuyệt đối' (prove) mà dùng 'chỉ ra/gợi ý' (suggest/indicate).",
    hedgedReplacements: ["indicates that", "postulates that", "lends substantial empirical support to"]
  }
];

const HEDGING_TIERS: {
  tier: 1 | 2 | 3 | 4 | 5;
  name: HedgingMarkerMatch["tierName"];
  regex: RegExp;
}[] = [
  { tier: 1, name: "Modal Auxiliary", regex: /\b(may|might|could|would seem to|tends? to|appear(s)? to)\b/i },
  { tier: 2, name: "Epistemic Adverb", regex: /\b(arguably|ostensibly|conceivably|presumably|predominantly|scarcely|potentially|tentatively|largely)\b/i },
  { tier: 3, name: "Attitudinal Verb", regex: /\b(suggest(s)?|indicate(s)?|impl(y|ies)|postulate(s)?|hypothesize(s)?|point(s)? toward)\b/i },
  { tier: 4, name: "Noun Qualifier", regex: /\b(distinct likelihood|empirical indication|plausible rationale|available evidence|moderate probability|substantive prospect)\b/i },
  { tier: 5, name: "Boundary Clause", regex: /\b(subject to the caveat|insofar as|in the absence of confounding variables|under specific parameters|within defined scopes)\b/i }
];

export function detectDogmaticTerms(text: string): DogmaticTermMatch[] {
  const matches: DogmaticTermMatch[] = [];

  DOGMATIC_OVERSTATEMENTS.forEach(({ regex, category, critique, hedgedReplacements }) => {
    let match: RegExpExecArray | null;
    const globalRegex = new RegExp(regex.source, "gi");
    while ((match = globalRegex.exec(text)) !== null) {
      matches.push({
        matchedText: match[0],
        index: match.index,
        length: match[0].length,
        category,
        critique,
        hedgedReplacements
      });
    }
  });

  return matches;
}

export function calculateHedgingMarkers(text: string): HedgingMarkerMatch[] {
  const markers: HedgingMarkerMatch[] = [];

  HEDGING_TIERS.forEach(({ tier, name, regex }) => {
    let match: RegExpExecArray | null;
    const globalRegex = new RegExp(regex.source, "gi");
    while ((match = globalRegex.exec(text)) !== null) {
      markers.push({
        marker: match[0],
        tier,
        tierName: name
      });
    }
  });

  return markers;
}

export function evaluateEpistemicCalibration(text: string): HedgingAnalysisReport {
  const clean = text.trim();
  if (!clean) {
    return {
      rawText: "",
      sentenceCount: 0,
      dogmaticTerms: [],
      hedgingMarkers: [],
      hedgingDensityPercentage: 0,
      epistemicCalibrationScore: 0,
      certaintyLevel: "Dogmatic Overstatement (100%)",
      taskResponseEstimatedBand: 0,
      recommendations: ["Nhập câu văn hoặc đoạn văn Task 2 / Speaking Part 3 để bắt đầu phân tích độ rào đón."]
    };
  }

  const sentences = clean.split(/[.!?]+/).filter((s) => s.trim().length > 3);
  const sentenceCount = Math.max(sentences.length, 1);

  const dogmaticTerms = detectDogmaticTerms(clean);
  const hedgingMarkers = calculateHedgingMarkers(clean);

  // Hedging density = (Number of unique markers / Sentences) * 100
  const hedgingDensityPercentage = Math.round((hedgingMarkers.length / sentenceCount) * 100);

  // Calibration score calculation (0 - 100)
  let calibrationScore = 40; // baseline
  calibrationScore += Math.min(hedgingMarkers.length * 15, 60);
  calibrationScore -= dogmaticTerms.length * 20;
  calibrationScore = Math.max(Math.min(calibrationScore, 100), 10);

  // Certainty Level
  let certaintyLevel: HedgingAnalysisReport["certaintyLevel"] = "Calibrated Academic Hypothesis (50%)";
  if (dogmaticTerms.length >= 2 || (dogmaticTerms.length > 0 && hedgingMarkers.length === 0)) {
    certaintyLevel = "Dogmatic Overstatement (100%)";
  } else if (dogmaticTerms.length === 1) {
    certaintyLevel = "High Likelihood (75%)";
  } else if (hedgingMarkers.length >= 3) {
    certaintyLevel = "Cautious Epistemic Skepticism (25%)";
  }

  // Task Response Estimated Band
  let trBand = 5.5;
  if (dogmaticTerms.length === 0) trBand += 1.0;
  if (hedgingMarkers.length >= 2) trBand += 1.0;
  if (hedgingMarkers.length >= 4) trBand += 0.5;
  if (dogmaticTerms.length > 0) trBand -= Math.min(dogmaticTerms.length * 0.5, 1.5);
  trBand = Math.min(Math.max(trBand, 5.0), 9.0);

  // Recommendations
  const recommendations: string[] = [];
  if (dogmaticTerms.length > 0) {
    recommendations.push(
      `Phát hiện ${dogmaticTerms.length} từ khẳng định võ đoán (Dogmatic Overstatements). Hãy thay thế bằng các từ rào đón (Hedging markers) để tránh bị trừ điểm Task Response.`
    );
  }
  if (hedgingMarkers.length < 2) {
    recommendations.push(
      "Bổ sung các động từ thái độ hoặc trạng từ xác suất: 'tends to', 'arguably', 'ostensibly', 'distinct likelihood'."
    );
  }
  if (hedgingMarkers.some((m) => m.tier === 5)) {
    recommendations.push("Sử dụng mệnh đề giới hạn biên (Boundary clauses: 'subject to the caveat that') giúp bài viết đạt độ chín chắn tư duy C2.");
  }
  if (recommendations.length === 0) {
    recommendations.push("Khả năng rào đón học thuật hoàn hảo! Luận điểm khách quan, có độ mở và kiểm soát xác suất nhận thức chặt chẽ.");
  }

  return {
    rawText: clean,
    sentenceCount,
    dogmaticTerms,
    hedgingMarkers,
    hedgingDensityPercentage,
    epistemicCalibrationScore: calibrationScore,
    certaintyLevel,
    taskResponseEstimatedBand: trBand,
    recommendations
  };
}
