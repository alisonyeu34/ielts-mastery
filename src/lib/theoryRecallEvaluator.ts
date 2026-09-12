// Stop words to exclude from keyword matching (both Vietnamese and English)
const STOP_WORDS = new Set([
  "là", "của", "và", "trong", "được", "có", "khi", "để", "với", "cho", "thì",
  "các", "những", "một", "này", "đó", "nào", "gì", "rằng", "bởi", "vì", "do",
  "ở", "từ", "vào", "ra", "lại", "đến", "theo", "như", "hay", "hoặc", "nếu",
  "mà", "nên", "phải", "không", "chưa", "sẽ", "đã", "đang", "rất", "quá",
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of",
  "with", "by", "from", "as", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "can", "could", "will", "would",
  "it", "this", "that", "these", "those"
]);

export interface RecallEvaluationResult {
  scorePercent: number;
  grade: "excellent" | "good" | "needs_practice";
  title: string;
  feedbackVi: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  wordCount: number;
  originalText: string;
  userText: string;
}

/**
 * Extracts meaningful content keywords from text
 */
function extractKeywords(text: string): string[] {
  const clean = text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9a-zA-Zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const rawTokens = clean.split(" ").filter((w) => w.length > 1);
  const meaningful = rawTokens.filter((w) => !STOP_WORDS.has(w));

  // Deduplicate
  return Array.from(new Set(meaningful));
}

/**
 * Intelligent semantic evaluation of a user's rewrite of a single theory item
 */
export function evaluateTheoryItemRecall(
  userText: string,
  targetText: string
): RecallEvaluationResult {
  const userClean = userText.trim();
  const userWords = userClean.split(/\s+/).filter(Boolean);
  const wordCount = userWords.length;

  if (wordCount < 3) {
    return {
      scorePercent: 15,
      grade: "needs_practice",
      title: "Ghi chú còn quá ngắn",
      feedbackVi: "Bạn mới chỉ viết vài từ ngắn. Hãy cố gắng diễn giải lại ít nhất 1 câu hoàn chỉnh nêu rõ quy tắc, công thức hoặc cách dùng nhé!",
      matchedKeywords: [],
      missingKeywords: extractKeywords(targetText).slice(0, 5),
      wordCount,
      originalText: targetText,
      userText: userClean,
    };
  }

  const targetKeywords = extractKeywords(targetText);
  const userKeywords = new Set(extractKeywords(userClean));
  const userLower = userClean.toLowerCase();

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  targetKeywords.forEach((kw) => {
    if (userKeywords.has(kw) || userLower.includes(kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // Calculate base score from keyword coverage
  const totalKeywords = Math.max(targetKeywords.length, 1);
  let coverageRatio = matchedKeywords.length / totalKeywords;

  // Bonus for thoroughness
  if (wordCount >= 10 && coverageRatio > 0.4) {
    coverageRatio = Math.min(1, coverageRatio + 0.15);
  } else if (wordCount >= 20 && coverageRatio > 0.3) {
    coverageRatio = Math.min(1, coverageRatio + 0.2);
  }

  let scorePercent = Math.round(coverageRatio * 100);
  if (scorePercent < 25 && wordCount >= 6) {
    scorePercent = 35;
  }
  scorePercent = Math.min(100, Math.max(15, scorePercent));

  let grade: "excellent" | "good" | "needs_practice" = "needs_practice";
  let title = "Cần bổ sung thêm ý";
  let feedbackVi = "Bạn đã bước đầu ghi nhớ được một phần, nhưng còn thiếu các từ khóa kỹ thuật hoặc điều kiện áp dụng quan trọng.";

  if (scorePercent >= 75) {
    grade = "excellent";
    title = "Xuất sắc! Bạn đã nắm vững 100% bản chất";
    feedbackVi = "Bạn đã diễn đạt lại rất chuẩn xác và đầy đủ các từ khóa then chốt của quy tắc này. Trí nhớ chủ động (Active Recall) rất tốt!";
  } else if (scorePercent >= 50) {
    grade = "good";
    title = "Khá tốt! Đã nắm được ý chính";
    feedbackVi = "Bạn đã nhớ được khung ý tưởng cơ bản. Hãy quan sát thêm các từ khóa còn thiếu bên dưới để làm phong phú câu trả lời hơn.";
  }

  return {
    scorePercent,
    grade,
    title,
    feedbackVi,
    matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 6),
    wordCount,
    originalText: targetText,
    userText: userClean,
  };
}
