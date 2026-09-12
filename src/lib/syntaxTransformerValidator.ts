import { SyntaxExerciseItem, SyntaxModeType } from "@/data/mockAdvancedSyntaxData";

export interface SyntaxValidationResult {
  isCorrect: boolean;
  score: number; // 0 to 100
  syntacticDensity: number; // 0 to 100
  feedbackVi: string;
  hasInversionBug: boolean;
  hasCleftBug: boolean;
  detectedTriggers: string[];
}

// C1 Academic content word markers
const ACADEMIC_KEYWORD_PATTERNS = [
  /tion\b/i,
  /sion\b/i,
  /ment\b/i,
  /ance\b/i,
  /ence\b/i,
  /ity\b/i,
  /ness\b/i,
  /precipitat/i,
  /exacerbat/i,
  /undermin/i,
  /cultivat/i,
  /substantiat/i,
  /displace/i,
  /escalat/i,
  /mitigat/i,
  /authenticity/i,
  /indispensable/i,
  /profound/i,
  /transnational/i,
  /intergenerational/i,
  /unprecedented/i,
  /infrastructure/i,
];

export function calculateSyntacticDensity(sentence: string): number {
  const words = sentence.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;

  let academicHits = 0;
  for (const w of words) {
    if (ACADEMIC_KEYWORD_PATTERNS.some((pat) => pat.test(w))) {
      academicHits++;
    }
  }

  // Ratio of academic content words
  const contentWordRatio = (academicHits / words.length) * 100;

  // Length bonus (optimal 14 - 25 words)
  let lengthBonus = 0;
  if (words.length >= 12 && words.length <= 28) {
    lengthBonus = 20;
  } else if (words.length > 5) {
    lengthBonus = 10;
  }

  const rawScore = Math.round(contentWordRatio * 1.5 + lengthBonus + 40);
  return Math.max(30, Math.min(99, rawScore));
}

export function validateInversionStructure(
  sentence: string,
  triggerPhrase?: string
): { isValid: boolean; bugMessageVi?: string } {
  const trimmed = sentence.trim();
  if (!trimmed) return { isValid: false, bugMessageVi: "Câu chưa được nhập." };

  // Common Auxiliaries
  const auxRegex =
    /\b(do|does|did|should|can|could|had|were|would|will|is|are|was|have|has)\b/i;

  if (trimmed.startsWith("Not only")) {
    const afterTrigger = trimmed.replace(/^Not only\s+/i, "");
    const firstWord = afterTrigger.split(/\s+/)[0];
    if (!auxRegex.test(firstWord)) {
      return {
        isValid: false,
        bugMessageVi:
          "Lỗi Đảo Ngữ Nghiêm Trọng: Sau 'Not only' bắt buộc phải là trợ động từ (does/do/did/can/should) đứng trước chủ ngữ. Bạn đã quên đảo trợ động từ!",
      };
    }
  }

  if (trimmed.startsWith("Under no circumstances")) {
    const afterTrigger = trimmed.replace(/^Under no circumstances\s+/i, "");
    const firstWord = afterTrigger.split(/\s+/)[0];
    if (!auxRegex.test(firstWord)) {
      return {
        isValid: false,
        bugMessageVi:
          "Lỗi Đảo Ngữ: Sau 'Under no circumstances' phải đảo trợ động từ 'should/must/can' lên trước chủ ngữ.",
      };
    }
  }

  if (trimmed.startsWith("Seldom")) {
    const afterTrigger = trimmed.replace(/^Seldom\s+/i, "");
    const firstWord = afterTrigger.split(/\s+/)[0];
    if (!auxRegex.test(firstWord)) {
      return {
        isValid: false,
        bugMessageVi:
          "Lỗi Đảo Ngữ: Sau 'Seldom' phải đảo trợ động từ 'do/does/did' lên trước chủ ngữ.",
      };
    }
  }

  if (trimmed.startsWith("Had it not been")) {
    if (!trimmed.includes(",")) {
      return {
        isValid: false,
        bugMessageVi: "Cần có dấu phẩy ',' ngăn cách giữa mệnh đề điều kiện đảo ngữ và mệnh đề chính.",
      };
    }
  }

  return { isValid: true };
}

export function validateCleftStructure(
  sentence: string,
  subTypeLabelVi?: string
): { isValid: boolean; bugMessageVi?: string } {
  const trimmed = sentence.trim();
  if (!trimmed) return { isValid: false, bugMessageVi: "Câu chưa được nhập." };

  if (trimmed.startsWith("It is") || trimmed.startsWith("It was")) {
    if (!/\bthat\b/i.test(trimmed) && !/\bwho\b/i.test(trimmed)) {
      return {
        isValid: false,
        bugMessageVi:
          "Lỗi Câu Chẻ It-Cleft: Thiếu đại từ quan hệ liên kết 'that' hoặc 'who' để nối mệnh đề cần nhấn mạnh với phần còn lại.",
      };
    }
  }

  if (trimmed.startsWith("What ") || trimmed.startsWith("All that is")) {
    if (!/\bis\b/i.test(trimmed) && !/\bwas\b/i.test(trimmed)) {
      return {
        isValid: false,
        bugMessageVi:
          "Lỗi Câu Chẻ Wh-Cleft: Thiếu động từ 'is' hoặc 'was' làm cầu nối với yếu tố cần nhấn mạnh.",
      };
    }
  }

  return { isValid: true };
}

export function checkSentenceMatch(
  userSentence: string,
  exercise: SyntaxExerciseItem
): SyntaxValidationResult {
  const cleanUser = userSentence.trim().toLowerCase().replace(/[.,!?;:]/g, "");
  const density = calculateSyntacticDensity(userSentence);

  // Inversion Bug Check
  let hasInversionBug = false;
  let hasCleftBug = false;
  let feedbackVi = "Cú pháp học thuật chuẩn xác!";

  if (exercise.syntaxType === "inversion") {
    const invCheck = validateInversionStructure(userSentence, exercise.triggerPhrase);
    if (!invCheck.isValid) {
      hasInversionBug = true;
      feedbackVi = invCheck.bugMessageVi || "Sai cấu trúc đảo ngữ.";
    }
  }

  if (exercise.syntaxType === "cleft") {
    const cleftCheck = validateCleftStructure(userSentence, exercise.subTypeLabelVi);
    if (!cleftCheck.isValid) {
      hasCleftBug = true;
      feedbackVi = cleftCheck.bugMessageVi || "Sai cấu trúc câu chẻ.";
    }
  }

  // Exact or normalized match against model solutions
  const matchesModel = exercise.modelSolutions.some((sol) => {
    const cleanModel = sol.trim().toLowerCase().replace(/[.,!?;:]/g, "");
    if (cleanUser === cleanModel) return true;

    // Word overlap count >= 70%
    const userTokens = cleanUser.split(/\s+/);
    const modelTokens = cleanModel.split(/\s+/);
    const common = userTokens.filter((t) => modelTokens.includes(t));
    const ratio = common.length / Math.max(userTokens.length, modelTokens.length);
    return ratio >= 0.75;
  });

  // Pattern regex check
  let matchesRegex = false;
  if (exercise.patternRegex) {
    try {
      const reg = new RegExp(exercise.patternRegex, "i");
      matchesRegex = reg.test(userSentence.trim());
    } catch (e) {
      matchesRegex = false;
    }
  }

  const isCorrect = (matchesModel || matchesRegex) && !hasInversionBug && !hasCleftBug;
  const score = isCorrect ? Math.max(85, density) : Math.min(50, density);

  if (!isCorrect && !hasInversionBug && !hasCleftBug) {
    feedbackVi =
      "Câu văn chưa đạt chuẩn nén thông tin hoặc trật tự từ chưa khớp với cấu trúc Band 8.0+. Hãy đối chiếu với các phương án mẫu.";
  }

  return {
    isCorrect,
    score,
    syntacticDensity: density,
    feedbackVi: isCorrect ? `Xuất sắc! Mật độ cú pháp đạt ${density}% (Band 8.0+ GRA & LR).` : feedbackVi,
    hasInversionBug,
    hasCleftBug,
    detectedTriggers: exercise.triggerPhrase ? [exercise.triggerPhrase] : [],
  };
}
