/**
 * Normative Ethics & Socio-Philosophical Framework Validator (Step 79)
 * Detects Moral Platitudes, Evaluates Philosophical Depth, and Scores Normative Rigor
 */

export interface MoralPlatitudeMatch {
  matchedText: string;
  index: number;
  length: number;
  category: "vague_altruism" | "emotional_plea" | "oversimplified_equity" | "generic_consequence";
  critique: string;
  c2Replacements: string[];
}

export interface PhilosophicalLensDetection {
  utilitarianScore: number;
  utilitarianKeywords: string[];
  deontologyScore: number;
  deontologyKeywords: string[];
  socialContractScore: number;
  socialContractKeywords: string[];
  primaryFramework: "Utilitarianism" | "Deontology" | "Social Contract & Rawlsian Justice" | "Multi-Lens Synthesis" | "Unspecified";
}

export interface PhilosophicalEvaluationResult {
  wordCount: number;
  platitudesDetected: MoralPlatitudeMatch[];
  philosophicalDepthScore: number; // 0 - 100
  frameworkAnalysis: PhilosophicalLensDetection;
  synthesizedDualStance: boolean; // Utilizes at least 2 distinct normative lenses
  taskResponseBandEstimate: number; // 5.0 - 9.0
  recommendations: string[];
}

export const PLATITUDE_DICTIONARY: {
  regex: RegExp;
  category: MoralPlatitudeMatch["category"];
  critique: string;
  c2Replacements: string[];
}[] = [
  {
    regex: /\b(make(s)? people happy|bring(s)? happiness to everyone)\b/i,
    category: "vague_altruism",
    critique: "Khẩu hiệu cảm tính thiếu định lượng. Hãy sử dụng khái niệm Thặng Dư Phúc Lợi Xã Hội (Aggregate Societal Welfare).",
    c2Replacements: [
      "maximize aggregate societal utility",
      "enhance the subjective well-being and existential fulfillment of the citizenry",
      "yield optimal hedonic and utilitarian outcomes across demographic cohorts"
    ]
  },
  {
    regex: /\b(help(s)? (the )?poor( people)?|give money to poor people)\b/i,
    category: "emotional_plea",
    critique: "Lập luận mang tính từ thiện bề nổi. Cần nâng cấp lên khái niệm Công Bằng Phân Phối (Distributive Justice) hoặc Giảm Thiểu Bất Bình Đẳng Cấu Trúc.",
    c2Replacements: [
      "mitigate systemic socioeconomic disparity and alleviate generational poverty",
      "disproportionately ameliorate the conditions of the most vulnerable socioeconomic strata",
      "institute progressive redistribution mechanisms to uphold the Rawlsian difference principle"
    ]
  },
  {
    regex: /\b(do(ing)? good things|be a good person|people should be nice)\b/i,
    category: "vague_altruism",
    critique: "Sáo rỗng về đạo đức. Hãy dùng khái niệm Nghĩa Vụ Đạo Đức Quy Chuẩn (Deontological Moral Obligation).",
    c2Replacements: [
      "fulfill a categorical moral imperative",
      "adhere to normative ethical obligations inherent to civic duty",
      "embody pro-social virtue ethics in institutional governance"
    ]
  },
  {
    regex: /\b(bad for society|ruin(s)? society|destroys the world)\b/i,
    category: "generic_consequence",
    critique: "Phán đoán mơ hồ, thiếu bằng chứng nhân quả. Hãy chỉ rõ sự suy thoái liên kết xã hội (Social Cohesion Erosion).",
    c2Replacements: [
      "undermine social cohesion and erode public trust in governance",
      "subvert the fundamental tenets of the democratic social contract",
      "engender systemic externalities that destabilize socioeconomic equilibrium"
    ]
  },
  {
    regex: /\b(everyone is equal|everyone deserves (equal )?rights|fair for everyone)\b/i,
    category: "oversimplified_equity",
    critique: "Bình đẳng hóa cào bằng. Cần phân định giữa Bình Đẳng Cơ Hội (Equality of Opportunity) và Công Bằng Bù Đắp (Substantive Equity).",
    c2Replacements: [
      "safeguard inviolable fundamental human rights and egalitarian entitlements",
      "guarantee equitable access to foundational opportunities through structural parity",
      "align with the Rawlsian 'Veil of Ignorance', ensuring fairness devoid of arbitrary privileges"
    ]
  },
  {
    regex: /\b(save the (planet|earth|environment)|protect nature at all costs)\b/i,
    category: "emotional_plea",
    critique: "Khẩu hiệu tuyên truyền. Hãy sử dụng góc nhìn Đạo Đức Sinh Thái (Intergenerational Ecological Justice).",
    c2Replacements: [
      "preserve ecological integrity and fulfill intergenerational environmental stewardship",
      "internalize environmental externalities to prevent irreversible biodiversity collapse",
      "reconcile macroeconomic productivity with biospheric planetary boundaries"
    ]
  },
  {
    regex: /\b(freedom is the most important thing|we must have total freedom)\b/i,
    category: "oversimplified_equity",
    critique: "Tự do vô điều kiện là ngụy biện. Cần liên hệ với Giới Hạn Gây Hại (Harm Principle) của J.S. Mill hoặc Khế Ước Xã Hội.",
    c2Replacements: [
      "preserve inviolable civil liberties while acknowledging legitimate harm-principle boundaries",
      "balance negative freedoms (freedom from coercion) with positive capabilities",
      "navigate the delicate equilibrium between sovereign autonomy and collective public safety"
    ]
  }
];

const UTILITARIAN_KEYWORDS = [
  "utilitarian",
  "consequentialist",
  "aggregate utility",
  "net societal welfare",
  "hedonic calculus",
  "cost-benefit",
  "greatest good",
  "pragmatic outcome",
  "macroeconomic efficiency",
  "collective benefit",
  "surplus"
];

const DEONTOLOGY_KEYWORDS = [
  "deontological",
  "kantian",
  "categorical imperative",
  "inviolable rights",
  "moral duty",
  "inherent dignity",
  "non-negotiable",
  "fundamental entitlement",
  "ethical constraint",
  "deontic"
];

const SOCIAL_CONTRACT_KEYWORDS = [
  "social contract",
  "rawlsian",
  "distributive justice",
  "veil of ignorance",
  "difference principle",
  "civic legitimacy",
  "subsidiarity",
  "socioeconomic strata",
  "public trust",
  "civic obligation",
  "cohesion"
];

export function detectMoralPlatitudes(text: string): MoralPlatitudeMatch[] {
  const matches: MoralPlatitudeMatch[] = [];

  PLATITUDE_DICTIONARY.forEach(({ regex, category, critique, c2Replacements }) => {
    let match: RegExpExecArray | null;
    const globalRegex = new RegExp(regex.source, "gi");
    while ((match = globalRegex.exec(text)) !== null) {
      matches.push({
        matchedText: match[0],
        index: match.index,
        length: match[0].length,
        category,
        critique,
        c2Replacements
      });
    }
  });

  return matches;
}

export function evaluatePhilosophicalDepth(essayText: string): PhilosophicalEvaluationResult {
  const clean = essayText.trim();
  if (!clean) {
    return {
      wordCount: 0,
      platitudesDetected: [],
      philosophicalDepthScore: 0,
      frameworkAnalysis: {
        utilitarianScore: 0,
        utilitarianKeywords: [],
        deontologyScore: 0,
        deontologyKeywords: [],
        socialContractScore: 0,
        socialContractKeywords: [],
        primaryFramework: "Unspecified"
      },
      synthesizedDualStance: false,
      taskResponseBandEstimate: 0,
      recommendations: ["Vui lòng nhập bài viết hoặc câu lập luận triết học để bắt đầu phân tích."]
    };
  }

  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = clean.toLowerCase();

  // 1. Detect Platitudes
  const platitudesDetected = detectMoralPlatitudes(clean);

  // 2. Lens Detection
  const matchedUtil = UTILITARIAN_KEYWORDS.filter((k) => lower.includes(k));
  const matchedDeon = DEONTOLOGY_KEYWORDS.filter((k) => lower.includes(k));
  const matchedSoc = SOCIAL_CONTRACT_KEYWORDS.filter((k) => lower.includes(k));

  const utilScore = Math.min(matchedUtil.length * 20, 100);
  const deonScore = Math.min(matchedDeon.length * 20, 100);
  const socScore = Math.min(matchedSoc.length * 20, 100);

  const activeLensesCount = [matchedUtil.length > 0, matchedDeon.length > 0, matchedSoc.length > 0].filter(Boolean).length;
  const synthesizedDualStance = activeLensesCount >= 2;

  let primaryFramework: PhilosophicalLensDetection["primaryFramework"] = "Unspecified";
  if (synthesizedDualStance) {
    primaryFramework = "Multi-Lens Synthesis";
  } else if (utilScore >= deonScore && utilScore >= socScore && utilScore > 0) {
    primaryFramework = "Utilitarianism";
  } else if (deonScore >= utilScore && deonScore >= socScore && deonScore > 0) {
    primaryFramework = "Deontology";
  } else if (socScore > 0) {
    primaryFramework = "Social Contract & Rawlsian Justice";
  }

  // 3. Compute Depth Score (0 - 100)
  let depthScore = 20; // baseline
  depthScore += Math.min(matchedUtil.length + matchedDeon.length + matchedSoc.length, 6) * 10;
  if (synthesizedDualStance) depthScore += 20;
  // Penalty for platitudes
  depthScore -= platitudesDetected.length * 15;
  depthScore = Math.max(Math.min(depthScore, 100), 10);

  // 4. Task Response Band Estimate
  let trBand = 5.5;
  if (wordCount >= 100) trBand += 0.5;
  if (depthScore >= 60) trBand += 1.0;
  if (depthScore >= 80) trBand += 1.0;
  if (synthesizedDualStance) trBand += 0.5;
  if (platitudesDetected.length === 0 && depthScore >= 70) trBand += 0.5;
  trBand = Math.min(trBand, 9.0);

  // 5. Recommendations
  const recommendations: string[] = [];
  if (platitudesDetected.length > 0) {
    recommendations.push(
      `Phát hiện ${platitudesDetected.length} cụm từ khẩu hiệu sáo rỗng (Moral Platitudes). Hãy bấm vào từng cụm từ để thay thế bằng thuật ngữ C2 học thuật.`
    );
  }
  if (!synthesizedDualStance) {
    recommendations.push(
      "Để đạt Band 8.0+ Task Response, hãy kết hợp ít nhất 2 lăng kính đối kháng (Ví dụ: Utilitarianism để nêu luận điểm kinh tế -> Deontology để phản biện nhân quyền)."
    );
  }
  if (matchedUtil.length === 0 && matchedDeon.length === 0 && matchedSoc.length === 0) {
    recommendations.push(
      "Thiếu các khái niệm triết học chuẩn mực. Hãy tích hợp: 'aggregate utility', 'categorical imperative', hoặc 'Rawlsian distributive justice'."
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      "Lập luận xuất sắc! Đạt độ sâu triết học và tính chặt chẽ quy chuẩn tương đương thí sinh Band 8.5+."
    );
  }

  return {
    wordCount,
    platitudesDetected,
    philosophicalDepthScore: depthScore,
    frameworkAnalysis: {
      utilitarianScore: utilScore,
      utilitarianKeywords: matchedUtil,
      deontologyScore: deonScore,
      deontologyKeywords: matchedDeon,
      socialContractScore: socScore,
      socialContractKeywords: matchedSoc,
      primaryFramework
    },
    synthesizedDualStance,
    taskResponseBandEstimate: trBand,
    recommendations
  };
}
