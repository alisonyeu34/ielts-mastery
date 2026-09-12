/**
 * Socratic Debate Engine & Dialectical Resilience Evaluator
 * Powers 3-Round Socratic dialectical challenges for Speaking Part 3 & Writing Task 2.
 * Evaluates Hedging Density, Societal Lenses, Concession Patterns, and Fallacy Risks.
 */

export type SocietalLensKey =
  | "individual"
  | "corporate"
  | "governmental"
  | "scientific"
  | "communal"
  | "global";

export interface SocietalLensConfig {
  key: SocietalLensKey;
  labelVi: string;
  labelEn: string;
  keywords: string[];
  iconName: string;
  description: string;
}

export const SOCIETAL_LENSES: Record<SocietalLensKey, SocietalLensConfig> = {
  individual: {
    key: "individual",
    labelVi: "Lăng Kính Cá Nhân (Individual)",
    labelEn: "Individual & Psychological",
    keywords: ["individual", "personal", "autonomy", "psychological", "consumer", "citizen", "lifestyle", "privacy", "well-being", "mental health"],
    iconName: "User",
    description: "Xem xét quyền tự do cá nhân, sức khỏe tinh thần và trải nghiệm của người dân.",
  },
  corporate: {
    key: "corporate",
    labelVi: "Lăng Kính Doanh Nghiệp (Corporate)",
    labelEn: "Corporate & Market",
    keywords: ["business", "company", "corporation", "profit", "market", "industry", "commercial", "enterprise", "competitiveness", "economic"],
    iconName: "Building2",
    description: "Đánh giá tính khả thi kinh tế, chi phí vận hành và lợi nhuận của giới doanh nghiệp.",
  },
  governmental: {
    key: "governmental",
    labelVi: "Lăng Kính Chính Phủ (Governmental)",
    labelEn: "Governmental & Policy",
    keywords: ["government", "state", "authorities", "policy", "legislation", "taxation", "regulation", "infrastructure", "subsidies", "enforcement"],
    iconName: "Landmark",
    description: "Xem xét vai trò quản lý vĩ mô, chính sách thuế, pháp luật và ngân sách công.",
  },
  scientific: {
    key: "scientific",
    labelVi: "Lăng Kính Khoa Học & Môi Trường (Scientific)",
    labelEn: "Scientific & Ecological",
    keywords: ["scientific", "empirical", "technological", "evidence", "climate", "carbon", "biodiversity", "ecological", "research", "feasibility"],
    iconName: "FlaskConical",
    description: "Dẫn chứng nghiên cứu thực nghiệm, rào cản công nghệ và bảo vệ hệ sinh thái.",
  },
  communal: {
    key: "communal",
    labelVi: "Lăng Kính Cộng Đồng & Xã Hội (Communal)",
    labelEn: "Communal & Cultural",
    keywords: ["society", "community", "social", "equity", "vulnerable", "demographic", "cultural", "tradition", "marginalized", "harmony"],
    iconName: "Users",
    description: "Tập trung vào công bằng xã hội, nhóm người yếu thế và sự gắn kết cộng đồng.",
  },
  global: {
    key: "global",
    labelVi: "Lăng Kính Toàn Cầu & Địa Chính Trị (Global)",
    labelEn: "Global & Geopolitical",
    keywords: ["global", "international", "treaties", "cross-border", "geopolitical", "nations", "worldwide", "diplomatic", "multinational", "un"],
    iconName: "Globe",
    description: "Nhìn nhận dưới góc độ quan hệ ngoại giao, hiệp ước quốc tế và thách thức toàn cầu.",
  },
};

export const C1_HEDGING_DEVICES: string[] = [
  "arguably",
  "ostensibly",
  "plausibly",
  "conceivably",
  "to a certain extent",
  "in large measure",
  "subject to the caveat",
  "tends to",
  "is predisposed to",
  "under certain conditions",
  "appears to be",
  "it is reasonable to hypothesize",
  "on balance",
];

export const CONCESSION_TRIGGERS: string[] = [
  "admittedly",
  "while it is true that",
  "granted that",
  "even though",
  "notwithstanding",
  "despite the valid concern that",
  "albeit",
];

export const REBUTTAL_CONTRAST_TRIGGERS: string[] = [
  "nonetheless",
  "nevertheless",
  "this perspective overlooks",
  "fails to account for",
  "conversely",
  "a more nuanced analysis reveals",
  "however, this must be balanced against",
];

export interface DebateTurn {
  id: string;
  round: 1 | 2 | 3;
  speaker: "user" | "scholar";
  text: string;
  timestamp: string;
  detectedLenses: SocietalLensKey[];
  hedgingWords: string[];
  concessionUsed: boolean;
}

export interface DialecticalResilienceScore {
  overallScore: number; // 0 - 100
  hedgingDensity: number; // percentage
  rebuttalPower: number; // 0 - 100
  premiseSolidity: number; // 0 - 100
  activeLensesCount: number;
  activeLenses: SocietalLensKey[];
  bandEstimate: string;
  fallaciesDetected: string[];
  strengths: string[];
  pedagogicalAdvice: string;
}

/**
 * Detects which societal lenses are active in a text segment
 */
export function detectSocietalLenses(text: string): SocietalLensKey[] {
  const lower = text.toLowerCase();
  const activeLenses: SocietalLensKey[] = [];

  (Object.keys(SOCIETAL_LENSES) as SocietalLensKey[]).forEach((key) => {
    const config = SOCIETAL_LENSES[key];
    const matchCount = config.keywords.filter((kw) => lower.includes(kw)).length;
    if (matchCount >= 1) {
      activeLenses.push(key);
    }
  });

  return activeLenses;
}

/**
 * Detects C1/C2 hedging words in a text segment
 */
export function detectHedgingWords(text: string): string[] {
  const lower = text.toLowerCase();
  return C1_HEDGING_DEVICES.filter((hedge) => lower.includes(hedge));
}

/**
 * Checks whether the student implemented a structured concession (Admittedly... nonetheless...)
 */
export function checkConcessionStructure(text: string): boolean {
  const lower = text.toLowerCase();
  const hasConcession = CONCESSION_TRIGGERS.some((c) => lower.includes(c));
  const hasRebuttal = REBUTTAL_CONTRAST_TRIGGERS.some((r) => lower.includes(r));
  return hasConcession && hasRebuttal;
}

/**
 * Evaluates the overall argument resilience across the 3 rounds
 */
export function evaluateArgumentResilience(
  turns: DebateTurn[],
  resolutionTitle: string
): DialecticalResilienceScore {
  const userTurns = turns.filter((t) => t.speaker === "user");
  const combinedUserText = userTurns.map((t) => t.text).join(" ");
  const wordCount = combinedUserText.split(/\s+/).filter(Boolean).length;

  const allLenses = Array.from(new Set(detectSocietalLenses(combinedUserText)));
  const hedgingList = detectHedgingWords(combinedUserText);
  const hasConcession = checkConcessionStructure(combinedUserText);

  // 1. Hedging Density Metric
  const hedgingDensity = wordCount > 0 ? Math.min(100, Math.round((hedgingList.length / (wordCount / 40)) * 100)) : 0;

  // 2. Rebuttal Power Metric
  let rebuttalPower = 60;
  if (hasConcession) rebuttalPower += 20;
  if (allLenses.length >= 3) rebuttalPower += 15;
  if (userTurns.length >= 2) rebuttalPower += 5;
  rebuttalPower = Math.min(100, rebuttalPower);

  // 3. Fallacies Check
  const fallacies: string[] = [];
  const lower = combinedUserText.toLowerCase();

  // False Dilemma / Absolute Assertion check
  if (/\b(always|never|every single|100%|completely useless|impossible)\b/.test(lower) && hedgingList.length === 0) {
    fallacies.push("Ngụy biện Tuyệt đối hóa (Absolutist Language) - Thiếu ngôn ngữ rào đón học thuật.");
  }
  // Hasty Generalization check
  if (/\b(all people|everyone knows|obviously|clearly true)\b/.test(lower)) {
    fallacies.push("Khái quát hóa vội vã (Hasty Generalization) - Cần dẫn chứng cụ thể theo từng nhóm đối tượng.");
  }

  // 4. Premise Solidity
  let premiseSolidity = 85;
  premiseSolidity -= fallacies.length * 15;
  premiseSolidity = Math.max(40, premiseSolidity);

  // Overall Composite Score
  const overall = Math.round(rebuttalPower * 0.4 + hedgingDensity * 0.3 + premiseSolidity * 0.3);

  let bandEstimate = "Band 6.0 - 6.5";
  if (overall >= 88 && allLenses.length >= 3 && fallacies.length === 0) {
    bandEstimate = "Band 8.0 - 8.5+ (Master Dialectical Thinker)";
  } else if (overall >= 75 && allLenses.length >= 2) {
    bandEstimate = "Band 7.0 - 7.5 (Nuanced Academic Argumentation)";
  } else if (overall >= 60) {
    bandEstimate = "Band 6.0 - 6.5 (One-sided Assertion)";
  } else {
    bandEstimate = "Band 5.0 - 5.5 (Vulnerable to Counter-examples)";
  }

  const strengths: string[] = [];
  if (allLenses.length >= 2) {
    strengths.push(`Kích hoạt thành công ${allLenses.length} lăng kính chủ thể (${allLenses.map((l) => SOCIETAL_LENSES[l].labelEn).join(", ")}).`);
  }
  if (hasConcession) {
    strengths.push("Làm chủ kỹ thuật nhượng bộ có điều kiện (Admittedly... Nonetheless...).");
  }
  if (hedgingList.length >= 2) {
    strengths.push(`Vận dụng tốt ngôn ngữ rào đón học thuật: ${hedgingList.join(", ")}.`);
  }

  const advice =
    fallacies.length > 0
      ? `Lập luận của bạn còn điểm hở do: ${fallacies[0]}. Hãy bổ sung cấu trúc nhượng bộ C1 để dung hòa các góc nhìn đối lập.`
      : allLenses.length < 2
      ? "Lập luận khá vững nhưng còn đóng khung trong 1 góc nhìn hẹp. Hãy mở rộng thêm lăng kính Doanh nghiệp hoặc Toàn cầu."
      : "Lập luận sắc bén, đa chiều và có tính rào đón tuyệt vời chuẩn phong cách học giả Oxford/Cambridge!";

  return {
    overallScore: overall,
    hedgingDensity,
    rebuttalPower,
    premiseSolidity,
    activeLensesCount: allLenses.length,
    activeLenses: allLenses,
    bandEstimate,
    fallaciesDetected: fallacies,
    strengths,
    pedagogicalAdvice: advice,
  };
}
