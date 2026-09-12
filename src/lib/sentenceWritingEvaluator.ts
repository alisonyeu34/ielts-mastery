import { SentencePromptItem } from "@/data/mockSentenceWritingDrills";

export interface SentenceEvaluationResult {
  isValid: boolean;
  scoreBand: string; // e.g. "6.5", "6.0", "5.0"
  statusType: "safe" | "warning" | "error";
  statusTitleVi: string;
  feedbackVi: string;
  identifiedStrengths: string[];
  suggestionsVi: string[];
  wordCount: number;
}

export function evaluateSentenceSubmission(
  userText: string,
  promptItem: SentencePromptItem
): SentenceEvaluationResult {
  const text = userText.trim();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount < 4) {
    return {
      isValid: false,
      scoreBand: "4.5",
      statusType: "error",
      statusTitleVi: "Câu quá ngắn hoặc chưa hoàn chỉnh",
      feedbackVi: "Câu cần tối thiểu 4-5 từ và có đủ thành phần Chủ ngữ (Subject) + Động từ (Verb) hoàn chỉnh.",
      identifiedStrengths: [],
      suggestionsVi: [
        "Hãy viết thành câu đầy đủ có Chủ ngữ và Vị ngữ.",
        "Tham khảo gợi ý cấu trúc ở trên hoặc bấm 'Xem Câu Mẫu Chuẩn' để lấy cảm hứng.",
      ],
      wordCount,
    };
  }

  const lower = text.toLowerCase();
  const strengths: string[] = [];
  const suggestions: string[] = [];
  let isStructureValid = true;
  let detectedSpecificTense = false;

  // 1. Tense & Structure Verification
  switch (promptItem.requiredTenseOrStructure) {
    case "present_simple": {
      // Check for present simple indicators
      const presentTokens = [
        "am", "is", "are", "live", "lives", "work", "works", "wake", "wakes",
        "commute", "commutes", "enjoy", "enjoys", "prefer", "prefers", "love", "loves",
        "practice", "practices", "study", "studies", "inspire", "inspires",
        "aim", "aims", "lead", "leads", "play", "plays", "have", "has", "do", "does",
        "usually", "always", "often", "every", "daily", "reside", "resides", "boost", "boosts"
      ];
      detectedSpecificTense = presentTokens.some((tok) =>
        new RegExp(`\\b${tok}\\b`, "i").test(lower)
      );

      // Check if user accidentally wrote past tense in present drill
      const accidentalPast = /\b(went|saw|bought|had|took|was|were|graduated|visited)\b/i.test(lower);
      if (accidentalPast && !detectedSpecificTense) {
        suggestions.push("Lưu ý: Câu này thuộc Phần A yêu cầu thì Hiện Tại Đơn (Present Simple), dường như bạn đang dùng động từ ở quá khứ.");
      }

      if (detectedSpecificTense) {
        strengths.push("Đúng thì Hiện Tại Đơn (Present Simple) theo yêu cầu bài học.");
      }
      break;
    }

    case "past_simple": {
      // Check for past simple verbs
      const pastVerbs = [
        "was", "were", "went", "saw", "bought", "had", "took", "made", "gave",
        "graduated", "decided", "studied", "visited", "watched", "began", "struggled",
        "taught", "realized", "grew", "passed", "cooked", "spent", "received", "overcame",
        "chose", "found", "met", "started", "worked", "lived", "arrived"
      ];
      const hasEd = /\b\w+ed\b/i.test(lower);
      const hasPastVerb = pastVerbs.some((v) => new RegExp(`\\b${v}\\b`, "i").test(lower));

      detectedSpecificTense = hasEd || hasPastVerb;

      if (!detectedSpecificTense) {
        isStructureValid = false;
        suggestions.push("Yêu cầu thì Quá Khứ Đơn: Cần có động từ thêm đuôi '-ed' (regular) hoặc động từ bất quy tắc V2 (went, saw, bought, was, were, had, took...).");
      } else {
        strengths.push("Sử dụng chính xác động từ ở thì Quá Khứ Đơn (Past Simple).");
      }
      break;
    }

    case "present_perfect": {
      const hasHaveHas = /\b(have|has|'ve|'s)\b/i.test(lower);
      const hasPastParticiple =
        /\b(eaten|visited|seen|worked|lived|been|finished|completed|achieved|become|helped|enabled|attended|read|gone|done)\b/i.test(lower) ||
        /\b(have|has)\s+\w+ed\b/i.test(lower) ||
        /\b(have|has)\s+\w+\s+\w+ed\b/i.test(lower);

      detectedSpecificTense = hasHaveHas && hasPastParticiple;

      if (!hasHaveHas) {
        isStructureValid = false;
        suggestions.push("Thiếu trợ động từ 'have' hoặc 'has' đặc trưng của thì Hiện Tại Hoàn Thành.");
      } else if (!hasPastParticiple) {
        suggestions.push("Chú ý chia động từ chính ở dạng Quá khứ phân từ PII / V3 (ví dụ: eaten, visited, seen, worked, lived...).");
      } else {
        strengths.push("Đúng cấu trúc have/has + PII của thì Hiện Tại Hoàn Thành.");
      }

      if (/\b(never|ever|since|for|already|yet|so far|recently)\b/i.test(lower)) {
        strengths.push("Sử dụng trạng từ nhận diện đặc trưng (since, for, already, yet, never).");
      }
      break;
    }

    case "passive_voice": {
      const hasBe = /\b(is|are|was|were|been|be)\b/i.test(lower);
      const hasV3 = /\b\w+ed\b/i.test(lower) || /\b(built|released|constructed|discovered|exported|required|implemented|believed|destroyed|sorted|collected|produced)\b/i.test(lower);

      detectedSpecificTense = hasBe && hasV3;

      if (!detectedSpecificTense) {
        isStructureValid = false;
        suggestions.push("Cấu trúc câu bị động bắt buộc phải có dạng của động từ 'to be' (is/are/was/were/been) + Động từ phân từ 3 (V3/Ved).");
      } else {
        strengths.push("Áp dụng đúng công thức Thể Bị Động (be + V3/Ved), tạo văn phong học thuật khách quan.");
      }
      break;
    }

    case "comparisons": {
      const hasComparison =
        /\b(more|less|higher|lower|larger|smaller|greater|fewer|better|worse|highest|lowest|most|least)\b/i.test(lower) ||
        /\bas\s+\w+\s+as\b/i.test(lower) ||
        /\bthan\b/i.test(lower) ||
        /\b(twice|double|triple|the more|the higher)\b/i.test(lower);

      detectedSpecificTense = hasComparison;

      if (!detectedSpecificTense) {
        isStructureValid = false;
        suggestions.push("Bài tập yêu cầu cấu trúc So sánh: Cần có từ chỉ so sánh (higher than, as high as, twice as much, the most, the more... the more...).");
      } else {
        strengths.push("Vận dụng tốt cấu trúc so sánh số liệu Task 1.");
      }
      break;
    }

    case "relative_clauses": {
      const hasRelPronoun = /\b(who|which|that|whose|where|whom)\b/i.test(lower);
      detectedSpecificTense = hasRelPronoun;

      if (!detectedSpecificTense) {
        isStructureValid = false;
        suggestions.push("Yêu cầu Mệnh đề quan hệ: Cần nối câu bằng đại từ quan hệ (who, which, that, whose, where).");
      } else {
        strengths.push("Sử dụng đại từ quan hệ chính xác để tạo câu phức (Complex Sentence).");
      }
      break;
    }

    case "conditionals": {
      const hasIf = /\bif\b/i.test(lower);
      const hasModal = /\b(will|can|must|would|could|might)\b/i.test(lower);
      detectedSpecificTense = hasIf && hasModal;

      if (!hasIf) {
        isStructureValid = false;
        suggestions.push("Yêu cầu Câu Điều Kiện: Bắt buộc phải có liên từ 'If' mở đầu mệnh đề điều kiện.");
      } else if (!hasModal) {
        suggestions.push("Mệnh đề chính của câu điều kiện cần có trợ động từ khiếm khuyết (will/can đối với Loại 1, would/could đối với Loại 2).");
      } else {
        strengths.push("Đúng chuẩn cấu trúc Câu Điều Kiện (If-clause + Modal clause).");
      }
      break;
    }

    default:
      detectedSpecificTense = true;
      break;
  }

  // 2. Syntactic Quality & Length Checks
  if (wordCount >= 8) {
    strengths.push("Độ dài câu lý tưởng (≥ 8 từ), diễn đạt trọn vẹn ngữ nghĩa.");
  }
  if (/[.,;]/.test(text)) {
    strengths.push("Có dấu câu phân cách rõ ràng.");
  }

  // Check capitalization of first character
  if (/^[a-z]/.test(text)) {
    suggestions.push("Hãy viết hoa chữ cái đầu câu để đảm bảo quy tắc ngữ pháp chuẩn mực.");
  }
  // Check end punctuation
  if (!/[.!?]$/.test(text)) {
    suggestions.push("Đừng quên thêm dấu chấm (.) ở cuối câu.");
  }

  // Determine final score & safety status
  if (isStructureValid && wordCount >= 6) {
    const isBand65 = wordCount >= 10 || strengths.length >= 3;
    return {
      isValid: true,
      scoreBand: isBand65 ? "6.5" : "6.0",
      statusType: "safe",
      statusTitleVi: isBand65 ? "🟢 ĐẠT CHUẨN AN TOÀN BAND 6.5 (Rất Tốt)" : "🟢 ĐẠT CHUẨN AN TOÀN BAND 6.0 (Đạt)",
      feedbackVi: isBand65
        ? "Xuất sắc! Câu có cấu trúc ngữ pháp chuẩn xác, đúng thì trọng tâm và độ dài học thuật hoàn chỉnh."
        : "Tốt! Câu đúng ngữ pháp và đáp ứng đúng yêu cầu ca học. Bạn có thể kéo dài câu hoặc nâng cấp thêm từ vựng để bứt phá lên 6.5+.",
      identifiedStrengths: strengths,
      suggestionsVi: suggestions.length > 0 ? suggestions : ["Tiếp tục phát huy cấu trúc này trong các câu kế tiếp!"],
      wordCount,
    };
  }

  return {
    isValid: false,
    scoreBand: "5.0 - 5.5",
    statusType: "warning",
    statusTitleVi: "🟡 CẦN TINH CHỈNH ĐỂ ĐẠT MỨC AN TOÀN 6.0+",
    feedbackVi: "Câu đã có ý tưởng nhưng cần điều chỉnh để khớp chính xác với thì ngữ pháp yêu cầu và hoàn thiện cấu trúc câu chuẩn.",
    identifiedStrengths: strengths,
    suggestionsVi: suggestions.length > 0 ? suggestions : ["Kiểm tra lại động từ và thì ngữ pháp được hướng dẫn ở trên."],
    wordCount,
  };
}
