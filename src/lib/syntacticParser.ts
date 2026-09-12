/**
 * C1/C2 Syntactic Engineering & Information Density Parser (Step 81)
 * Algorithms for IDI (Information Density Index), Inversion Syntax, and Cleft Sentence Analysis
 */

export interface TokenClassification {
  word: string;
  isContentWord: boolean;
  category: "noun_or_verb_or_adj" | "function_word";
}

export interface InversionAnalysisResult {
  hasInversion: boolean;
  inversionType: "negative_adverbial" | "conditional_omitted_if" | "locative" | "none";
  triggerPhrase: string;
  auxiliary: string;
  subject: string;
  isSyntacticallyValid: boolean;
  feedback: string;
}

export interface CleftAnalysisResult {
  hasCleft: boolean;
  cleftType: "it_cleft" | "wh_cleft" | "none";
  focusedElement: string;
  subordinateClause: string;
  isSyntacticallyValid: boolean;
  feedback: string;
}

export interface SyntacticAnalysisReport {
  rawText: string;
  totalWords: number;
  contentWordsCount: number;
  functionWordsCount: number;
  informationDensityIndex: number; // IDI percentage (0 - 100%)
  densityTier: "Diluted / Spoken-Style (<40%)" | "Moderate Academic (40-54%)" | "C1/C2 Dense Precision (≥55%)";
  nominalizationWords: string[];
  inversion: InversionAnalysisResult;
  cleft: CleftAnalysisResult;
  graBandEstimate: number; // 5.0 - 9.0
  recommendations: string[];
}

const FUNCTION_WORDS = new Set([
  // Articles
  "a", "an", "the",
  // Pronouns
  "i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them",
  "my", "your", "his", "its", "our", "their", "mine", "yours", "hers", "ours", "theirs",
  "myself", "yourself", "himself", "herself", "itself", "ourselves", "themselves",
  "this", "that", "these", "those", "which", "who", "whom", "whose", "what",
  // Prepositions
  "in", "on", "at", "to", "for", "with", "about", "against", "between", "into",
  "through", "during", "before", "after", "above", "below", "from", "up", "down",
  "of", "off", "over", "under", "by", "near", "upon", "within", "without",
  // Conjunctions
  "and", "but", "or", "nor", "so", "yet", "because", "although", "though", "even",
  "if", "unless", "while", "whereas", "as", "since", "until", "than", "whether",
  // Auxiliary & Modals
  "is", "am", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "having",
  "do", "does", "did",
  "can", "could", "shall", "should", "will", "would", "may", "might", "must", "ought"
]);

const ABSTRACT_NOMINAL_SUFFIXES = [
  "tion", "sion", "ment", "ity", "ance", "ence", "ure", "ism", "ness", "ship", "ization", "isation"
];

export function calculateInformationDensity(sentence: string): {
  idi: number;
  totalWords: number;
  contentCount: number;
  functionCount: number;
  tokens: TokenClassification[];
} {
  const clean = sentence.trim();
  if (!clean) {
    return { idi: 0, totalWords: 0, contentCount: 0, functionCount: 0, tokens: [] };
  }

  const rawWords = clean.split(/\s+/).filter(Boolean);
  const totalWords = rawWords.length;

  let contentCount = 0;
  let functionCount = 0;

  const tokens: TokenClassification[] = rawWords.map((rawWord) => {
    const stripped = rawWord.toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!stripped) {
      return { word: rawWord, isContentWord: false, category: "function_word" };
    }

    if (FUNCTION_WORDS.has(stripped)) {
      functionCount++;
      return { word: rawWord, isContentWord: false, category: "function_word" };
    } else {
      contentCount++;
      return { word: rawWord, isContentWord: true, category: "noun_or_verb_or_adj" };
    }
  });

  const idi = totalWords > 0 ? Math.round((contentCount / totalWords) * 100) : 0;

  return {
    idi,
    totalWords,
    contentCount,
    functionCount,
    tokens
  };
}

export function verifyInversionSyntax(sentence: string): InversionAnalysisResult {
  const clean = sentence.trim();
  const lower = clean.toLowerCase();

  // 1. Negative Adverbial Inversion: Seldom / Under no circumstances / Scarcely / Rarely / Not only / Barely / Hardly
  const negativeRegex = /^(seldom|rarely|under no circumstances|scarcely|hardly|barely|not only|in no way|at no time)\s+(has|have|had|do|does|did|is|are|was|were|can|could|should|will|would|must)\s+([a-z0-9\s]+?)\s+([a-z]+)/i;
  const negMatch = clean.match(negativeRegex);
  if (negMatch) {
    return {
      hasInversion: true,
      inversionType: "negative_adverbial",
      triggerPhrase: negMatch[1],
      auxiliary: negMatch[2],
      subject: negMatch[3].trim(),
      isSyntacticallyValid: true,
      feedback: `Đảo ngữ phủ định xuất sắc (${negMatch[1]} + ${negMatch[2]} + ${negMatch[3]}). Trợ động từ đã đứng trước chủ ngữ chuẩn xác.`
    };
  }

  // 2. Conditional Inversion (Omitted "If"): Were / Had / Should
  const conditionalRegex = /^(were|had|should)\s+([a-z0-9\s]+?)\s+(to\s+[a-z]+|[a-z]+ed|[a-z]+en|persist|implement|adopt|take|occur|arise)/i;
  const condMatch = clean.match(conditionalRegex);
  if (condMatch) {
    return {
      hasInversion: true,
      inversionType: "conditional_omitted_if",
      triggerPhrase: condMatch[1],
      auxiliary: condMatch[1],
      subject: condMatch[2].trim(),
      isSyntacticallyValid: true,
      feedback: `Đảo ngữ câu điều kiện bỏ "If" chuẩn C1/C2 (${condMatch[1]} + ${condMatch[2]}...). Tạo sắc thái trang trọng, học thuật cao.`
    };
  }

  // Check for broken inversion attempt (e.g. "Seldom people do..." or "Under no circumstances governments should...")
  const faultyNegRegex = /^(seldom|rarely|under no circumstances|scarcely|not only)\s+([a-z]+)\s+(has|have|do|does|did|should|will|must)/i;
  const faultMatch = clean.match(faultyNegRegex);
  if (faultMatch) {
    return {
      hasInversion: true,
      inversionType: "negative_adverbial",
      triggerPhrase: faultMatch[1],
      auxiliary: faultMatch[3],
      subject: faultMatch[2],
      isSyntacticallyValid: false,
      feedback: `LỖI ĐẢO NGỮ: Sau trạng từ phủ định "${faultMatch[1]}", trợ động từ "${faultMatch[3]}" bắt buộc phải đứng trước chủ ngữ "${faultMatch[2]}". Ví dụ đúng: "${faultMatch[1]} ${faultMatch[3]} ${faultMatch[2]}..."`
    };
  }

  return {
    hasInversion: false,
    inversionType: "none",
    triggerPhrase: "",
    auxiliary: "",
    subject: "",
    isSyntacticallyValid: false,
    feedback: "Chưa phát hiện cấu trúc đảo ngữ học thuật (Negative hoặc Conditional Inversion)."
  };
}

export function detectCleftSentence(sentence: string): CleftAnalysisResult {
  const clean = sentence.trim();

  // 1. It-Cleft: It is/was [Focus] that/who [Clause]
  const itCleftRegex = /^it\s+(is|was)\s+([\s\S]+?)\s+(that|who|which)\s+([\s\S]+)/i;
  const itMatch = clean.match(itCleftRegex);
  if (itMatch) {
    return {
      hasCleft: true,
      cleftType: "it_cleft",
      focusedElement: itMatch[2].trim(),
      subordinateClause: itMatch[4].trim(),
      isSyntacticallyValid: true,
      feedback: `Câu chẻ It-cleft xuất sắc! Điểm nhấn trọng tâm (Foregrounding Focus) đặt vào: "${itMatch[2].trim()}".`
    };
  }

  // 2. Wh-Cleft / Pseudo-Cleft: What [Clause] is/was [Focus]
  const whCleftRegex = /^what\s+([\s\S]+?)\s+(is|was|remains)\s+([\s\S]+)/i;
  const whMatch = clean.match(whCleftRegex);
  if (whMatch) {
    return {
      hasCleft: true,
      cleftType: "wh_cleft",
      focusedElement: whMatch[3].trim(),
      subordinateClause: whMatch[1].trim(),
      isSyntacticallyValid: true,
      feedback: `Câu chẻ Wh-cleft (Pseudo-cleft) chuẩn C2! Điểm nhấn làm nổi bật: "${whMatch[3].trim()}".`
    };
  }

  return {
    hasCleft: false,
    cleftType: "none",
    focusedElement: "",
    subordinateClause: "",
    isSyntacticallyValid: false,
    feedback: "Chưa phát hiện câu chẻ (It-cleft hoặc Wh-cleft)."
  };
}

export function analyzeSyntacticStructure(text: string): SyntacticAnalysisReport {
  const clean = text.trim();
  if (!clean) {
    return {
      rawText: "",
      totalWords: 0,
      contentWordsCount: 0,
      functionWordsCount: 0,
      informationDensityIndex: 0,
      densityTier: "Diluted / Spoken-Style (<40%)",
      nominalizationWords: [],
      inversion: { hasInversion: false, inversionType: "none", triggerPhrase: "", auxiliary: "", subject: "", isSyntacticallyValid: false, feedback: "" },
      cleft: { hasCleft: false, cleftType: "none", focusedElement: "", subordinateClause: "", isSyntacticallyValid: false, feedback: "" },
      graBandEstimate: 0,
      recommendations: ["Nhập câu văn để bắt đầu phân tích cú pháp C1/C2."]
    };
  }

  const { idi, totalWords, contentCount, functionCount, tokens } = calculateInformationDensity(clean);

  // Scan nominalization words
  const nominalizationWords: string[] = [];
  tokens.forEach((t) => {
    if (t.isContentWord) {
      const stripped = t.word.toLowerCase().replace(/[^a-z]/g, "");
      if (stripped.length >= 6 && ABSTRACT_NOMINAL_SUFFIXES.some((suffix) => stripped.endsWith(suffix))) {
        if (!nominalizationWords.includes(stripped)) {
          nominalizationWords.push(stripped);
        }
      }
    }
  });

  // Analyze Inversion & Cleft
  const inversion = verifyInversionSyntax(clean);
  const cleft = detectCleftSentence(clean);

  // Determine Density Tier
  let densityTier: SyntacticAnalysisReport["densityTier"] = "Diluted / Spoken-Style (<40%)";
  if (idi >= 55) {
    densityTier = "C1/C2 Dense Precision (≥55%)";
  } else if (idi >= 40) {
    densityTier = "Moderate Academic (40-54%)";
  }

  // GRA Score calculation
  let graScore = 5.5;
  if (idi >= 45) graScore += 0.5;
  if (idi >= 55) graScore += 1.0;
  if (nominalizationWords.length >= 2) graScore += 0.5;
  if (nominalizationWords.length >= 4) graScore += 0.5;
  if (inversion.hasInversion && inversion.isSyntacticallyValid) graScore += 1.0;
  if (cleft.hasCleft && cleft.isSyntacticallyValid) graScore += 0.5;
  if (inversion.hasInversion && !inversion.isSyntacticallyValid) graScore -= 1.0; // penalty for broken inversion
  graScore = Math.min(Math.max(graScore, 5.0), 9.0);

  // Recommendations
  const recommendations: string[] = [];
  if (idi < 50) {
    recommendations.push(`Chỉ số mật độ thông tin (IDI = ${idi}%) còn loãng. Hãy nén các mệnh đề phụ (because/when) thành cụm danh từ trừu tượng (Nominalization).`);
  }
  if (nominalizationWords.length < 2) {
    recommendations.push("Tăng cường các gốc từ danh từ hóa học thuật (-tion, -ment, -ity) để chuyển ý kiến cá nhân thành thực thể khách quan.");
  }
  if (!inversion.hasInversion && !cleft.hasCleft) {
    recommendations.push("Bổ sung ít nhất 1 cấu trúc nâng cao (Đảo ngữ điều kiện 'Were/Had/Should' hoặc Câu chẻ 'It is... that') để mở khóa Band 8.0+ GRA.");
  }
  if (inversion.hasInversion && !inversion.isSyntacticallyValid) {
    recommendations.push(inversion.feedback);
  }
  if (recommendations.length === 0) {
    recommendations.push("Cấu trúc câu đạt chuẩn C1/C2 xuất sắc! Mật độ thông tin cao và cú pháp đảo ngữ/câu chẻ chuẩn xác.");
  }

  return {
    rawText: clean,
    totalWords,
    contentWordsCount: contentCount,
    functionWordsCount: functionCount,
    informationDensityIndex: idi,
    densityTier,
    nominalizationWords,
    inversion,
    cleft,
    graBandEstimate: graScore,
    recommendations
  };
}
