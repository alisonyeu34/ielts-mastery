/**
 * Academic Sentence Diagnostic & Pathology Parser
 */

export interface DetectedPathology {
  type: "fragment" | "comma_splice" | "run_on" | "subject_verb" | "spoken_tone" | "dangling_modifier";
  label: string;
  severity: "critical" | "moderate" | "minor";
  message: string;
  offendingSnippet?: string;
  remedy: string;
}

export interface SentenceDiagnosticResult {
  hasErrors: boolean;
  isClearOfCriticalFlaws: boolean;
  score: number;
  estimatedBand: number;
  academicToneScore: number;
  grammaticalAccuracyScore: number;
  detectedPathologies: DetectedPathology[];
  recommendations: string[];
}

const INFORMAL_PATTERNS: Array<{ regex: RegExp; term: string; suggestion: string }> = [
  { regex: /\b(a lot of|lots of)\b/i, term: "a lot of", suggestion: "a substantial number of / a considerable proportion of" },
  { regex: /\b(get|got|getting)\b/i, term: "get", suggestion: "obtain / acquire / receive / experience" },
  { regex: /\b(big problem|huge problem)\b/i, term: "big problem", suggestion: "pressing issue / formidable challenge" },
  { regex: /\b(kids|kid)\b/i, term: "kids", suggestion: "children / adolescents / juveniles" },
  { regex: /\b(stuff|things)\b/i, term: "stuff/things", suggestion: "factors / elements / aspects / phenomena" },
  { regex: /\b(very good|really good)\b/i, term: "very good", suggestion: "exceptional / advantageous / efficacious" },
  { regex: /\b(very bad)\b/i, term: "very bad", suggestion: "detrimental / catastrophic / adverse" },
  { regex: /\b(gonna|wanna|kinda)\b/i, term: "slang/spoken contraction", suggestion: "formal academic phrasing" },
  { regex: /\b(like\s+[a-z]+,\s+like)\b/i, term: "spoken filler like", suggestion: "such as / for instance" },
];

const FRAGMENT_INTRO_CONJUNCTIONS = ["although", "even though", "because", "since", "whereas", "while", "if", "unless", "which", "who"];

export function diagnoseSentenceFault(sentence: string, targetPathologyCategory?: string): SentenceDiagnosticResult {
  const trimmed = sentence.trim();
  const pathologies: DetectedPathology[] = [];
  const recommendations: string[] = [];

  if (!trimmed) {
    return {
      hasErrors: true,
      isClearOfCriticalFlaws: false,
      score: 0,
      estimatedBand: 4.0,
      academicToneScore: 0,
      grammaticalAccuracyScore: 0,
      detectedPathologies: [{
        type: "fragment",
        label: "Văn bản trống",
        severity: "critical",
        message: "Bạn chưa nhập câu văn để phẫu thuật.",
        remedy: "Hãy viết lại câu hoàn chỉnh.",
      }],
      recommendations: ["Nhập câu văn hoàn chỉnh có đầy đủ Chủ ngữ và Vị ngữ."],
    };
  }

  // 1. Check Comma Splice
  const commaSpliceMatch = trimmed.match(/([a-zA-Z0-9\s]{4,}),\s*(it|they|he|she|this|these|the\s+[a-z]+|governments|students|people)\s+(is|are|was|were|has|have|can|will|should|must|causes|leads|plays)\s+/i);
  if (commaSpliceMatch) {
    const precedingText = commaSpliceMatch[1].trim();
    const startsWithSubordinate = FRAGMENT_INTRO_CONJUNCTIONS.some((c) => trimmed.toLowerCase().startsWith(c));
    if (!startsWithSubordinate && !precedingText.includes("which") && !precedingText.includes("who") && !precedingText.includes("that")) {
      pathologies.push({
        type: "comma_splice",
        label: "Comma Splice (Phẩy nối 2 mệnh đề độc lập)",
        severity: "critical",
        message: "Nối hai mệnh đề độc lập chỉ bằng dấu phẩy mà không có liên từ kết hợp (FANBOYS) hoặc chấm phẩy.",
        offendingSnippet: commaSpliceMatch[0],
        remedy: "Thay dấu phẩy bằng chấm phẩy (;), hoặc thêm liên từ đẳng lập (and/but/so), hoặc biến một vế thành mệnh đề phụ thuộc (Because/While...).",
      });
      recommendations.push("Dùng dấu chấm phẩy (;) hoặc liên từ kết hợp (FANBOYS) để phân tách 2 mệnh đề độc lập.");
    }
  }

  // 2. Check Sentence Fragment
  const startsWithSub = FRAGMENT_INTRO_CONJUNCTIONS.some((c) => trimmed.toLowerCase().startsWith(c));
  const hasComma = trimmed.includes(",");
  if (startsWithSub && !hasComma && !trimmed.includes(";")) {
    pathologies.push({
      type: "fragment",
      label: "Sentence Fragment (Mệnh đề phụ thuộc đứng cô lập)",
      severity: "critical",
      message: "Câu bắt đầu bằng liên từ phụ thuộc nhưng thiếu mệnh đề chính để hoàn thiện cấu trúc.",
      offendingSnippet: trimmed,
      remedy: "Thêm mệnh đề độc lập đằng sau dấu phẩy để giải quyết hành động chính.",
    });
    recommendations.push("Đảm bảo mỗi mệnh đề phụ thuộc (Because/Although...) luôn đi kèm một mệnh đề chính độc lập.");
  }

  if (/^[A-Z][a-z]+ing\s+[a-z\s]+$/i.test(trimmed) && !trimmed.includes(",") && !/\b(is|are|was|were|can|will|causes|leads|enhances|facilitates)\b/i.test(trimmed)) {
    pathologies.push({
      type: "fragment",
      label: "Gerund Fragment (Cụm danh động từ thiếu vị ngữ)",
      severity: "critical",
      message: "Cụm V-ing đứng đầu câu nhưng không có động từ chính chia theo thì.",
      offendingSnippet: trimmed,
      remedy: "Thêm động từ vị ngữ chính hoặc liên kết cụm V-ing với mệnh đề hoàn chỉnh.",
    });
  }

  // 3. Check Subject-Verb Agreement Discord
  const svMismatches = [
    { regex: /\b(The development of [a-z\s]+) have\b/i, subj: "The development", error: "have", correct: "has" },
    { regex: /\b(The number of [a-z\s]+) are\b/i, subj: "The number of", error: "are", correct: "is" },
    { regex: /\b(Every [a-z]+s)\b/i, subj: "Every", error: "plural noun after Every", correct: "singular noun" },
    { regex: /\b(Each of the [a-z\s]+) are\b/i, subj: "Each", error: "are", correct: "is" },
    { regex: /\b(A wide range of [a-z\s]+) have\b/i, subj: "A range", error: "have", correct: "has" },
  ];

  svMismatches.forEach((sv) => {
    if (sv.regex.test(trimmed)) {
      pathologies.push({
        type: "subject_verb",
        label: "Subject-Verb Disagreement (Bất hòa hợp Chủ-Vị)",
        severity: "critical",
        message: "Chủ ngữ \"" + sv.subj + "\" là số ít nhưng động từ lại chia số nhiều (\"" + sv.error + "\").",
        remedy: "Sửa \"" + sv.error + "\" thành \"" + sv.correct + "\".",
      });
      recommendations.push("Chú ý danh từ trung tâm đứng trước giới từ 'of' để chia động từ chính xác (" + sv.correct + ").");
    }
  });

  // 4. Check Spoken / Informal Tone
  let informalCount = 0;
  INFORMAL_PATTERNS.forEach((pat) => {
    const match = trimmed.match(pat.regex);
    if (match) {
      informalCount++;
      pathologies.push({
        type: "spoken_tone",
        label: "Spoken / Weak Style (Từ vựng văn nói thông tục)",
        severity: "moderate",
        message: "Từ \"" + match[0] + "\" mang sắc thái văn nói, làm hạ tiêu chí Lexical Resource & GRA trong IELTS Academic.",
        offendingSnippet: match[0],
        remedy: "Thay thế bằng cụm học thuật C1: \"" + pat.suggestion + "\".",
      });
      recommendations.push("Nâng cấp từ \"" + match[0] + "\" thành \"" + pat.suggestion + "\".");
    }
  });

  const criticalCount = pathologies.filter((p) => p.severity === "critical").length;
  const moderateCount = pathologies.filter((p) => p.severity === "moderate").length;

  let grammaticalAccuracyScore = Math.max(20, 100 - criticalCount * 35 - moderateCount * 10);
  let academicToneScore = Math.max(30, 100 - informalCount * 25);

  let score = Math.round((grammaticalAccuracyScore * 0.6 + academicToneScore * 0.4));
  let estimatedBand = 5.0;

  if (criticalCount === 0 && moderateCount === 0) {
    if (score >= 90) estimatedBand = 8.5;
    else if (score >= 80) estimatedBand = 7.5;
    else estimatedBand = 7.0;
  } else if (criticalCount === 0) {
    estimatedBand = 6.5;
  } else if (criticalCount === 1) {
    estimatedBand = 5.5;
  } else {
    estimatedBand = 5.0;
  }

  const isClearOfCriticalFlaws = criticalCount === 0;

  return {
    hasErrors: pathologies.length > 0,
    isClearOfCriticalFlaws,
    score,
    estimatedBand,
    academicToneScore,
    grammaticalAccuracyScore,
    detectedPathologies: pathologies,
    recommendations,
  };
}
