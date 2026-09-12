import { ErrorItem } from "@/types/database";

export type GradingSkillType =
  | "writing_task1"
  | "writing_task2"
  | "speaking_part1"
  | "speaking_part2_3";

export interface AIGradingScores {
  criteria1: number; // TR (Writing) / FC (Speaking)
  criteria2: number; // CC (Writing) / LR (Speaking)
  criteria3: number; // LR (Writing) / GRA (Speaking)
  criteria4: number; // GRA (Writing) / PR (Speaking)
  overallBand: number;
}

export interface C1UpgradeItem {
  id: string;
  original: string;
  upgraded: string;
  technique: "nominalization" | "cleft_sentence" | "inversion" | "academic_collocation" | "participle_clause";
  explanation: string;
  targetBand: "7.0" | "7.5" | "8.0" | "8.5+";
}

export interface DetectedErrorItem {
  id: string;
  original: string;
  corrected: string;
  rule: string;
  type: "grammar" | "collocation" | "cohesion" | "pronunciation" | "singular_plural";
  colorClass: string; // red = grammar, yellow = collocation, purple = cohesion
}

export interface SpeakingHesitationPoint {
  id: string;
  timestampSeconds: number;
  durationSeconds: number;
  note: string;
}

export interface AIGradingReportRecord {
  id: string;
  skillType: GradingSkillType;
  promptText: string;
  userSubmission: string; // Essay text or Transcript
  wordCount: number;
  audioDurationSeconds?: number;
  scores: AIGradingScores;
  criteriaLabels: {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
  };
  feedbackComments: {
    generalComment: string;
    strengths: string[];
    weaknesses: string[];
    upgradedSentences: C1UpgradeItem[];
    detectedErrors: DetectedErrorItem[];
    hesitations?: SpeakingHesitationPoint[];
    band8Sample?: string;
  };
  createdAt: string;
}

/**
 * 1. Evaluate Writing Essay (Task 1 or Task 2)
 */
export async function evaluateWritingEssay(
  text: string,
  promptText: string,
  taskType: "task1" | "task2"
): Promise<AIGradingReportRecord> {
  // Simulate network/AI compute delay
  await new Promise((resolve) => setTimeout(resolve, 1600));

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const targetMinWords = taskType === "task1" ? 150 : 250;

  // 1. Task Response / Achievement Analysis
  let trScore = 6.0;
  if (wordCount >= targetMinWords + 30) trScore += 1.0;
  else if (wordCount >= targetMinWords) trScore += 0.5;
  else if (wordCount < targetMinWords - 50) trScore -= 1.5;
  else if (wordCount < targetMinWords) trScore -= 0.5;

  // 2. Cohesion & Coherence Analysis
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const linkingWords = [
    "furthermore",
    "moreover",
    "however",
    "nevertheless",
    "consequently",
    "in contrast",
    "on the other hand",
    "specifically",
    "notably",
    "subsequently",
    "overall",
    "in addition",
  ];
  let linkingCount = 0;
  const lowerText = trimmed.toLowerCase();
  linkingWords.forEach((lw) => {
    if (lowerText.includes(lw)) linkingCount++;
  });

  let ccScore = 6.0;
  if (paragraphs.length >= 3 && linkingCount >= 4) ccScore = 7.0;
  else if (paragraphs.length >= 2 && linkingCount >= 2) ccScore = 6.5;
  else ccScore = 5.5;

  // 3. Lexical Resource (C1 Collocations vs Informal words)
  const informalWords = ["a lot of", "big problem", "bad things", "good thing", "kids", "stuff", "get worse"];
  const academicC1Terms = [
    "substantial",
    "predominant",
    "mitigate",
    "exacerbate",
    "deteriorate",
    "imperative",
    "exponential",
    "trajectory",
    "paramount",
    "infrastructure",
  ];

  let c1Count = 0;
  academicC1Terms.forEach((w) => {
    if (lowerText.includes(w)) c1Count++;
  });
  let informalCount = 0;
  informalWords.forEach((w) => {
    if (lowerText.includes(w)) informalCount++;
  });

  let lrScore = 6.0;
  if (c1Count >= 3 && informalCount === 0) lrScore = 7.5;
  else if (c1Count >= 2) lrScore = 7.0;
  else if (informalCount >= 2) lrScore = 5.5;

  // 4. Grammatical Range & Accuracy
  const detectedErrors: DetectedErrorItem[] = [];

  if (/although.+but/i.test(trimmed)) {
    detectedErrors.push({
      id: "err_gra_comma_splice",
      original: "Although ... but ...",
      corrected: "Although [Mệnh đề 1], [Mệnh đề 2] (Bỏ liên từ 'but')",
      rule: "Lỗi liên từ kép (Double Conjunction): Trong văn phong học thuật, 'Although' không đi cùng 'but'.",
      type: "grammar",
      colorClass: "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    });
  }

  if (/the number of\s+\w+\s+are/i.test(trimmed)) {
    detectedErrors.push({
      id: "err_gra_sv_agreement",
      original: "The number of [N] are...",
      corrected: "The number of [N] is / was...",
      rule: "Cấu trúc 'The number of + N(số nhiều)' luôn chia động từ số ít.",
      type: "grammar",
      colorClass: "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    });
  }

  if (/a lot of/i.test(trimmed)) {
    detectedErrors.push({
      id: "err_lr_collocation",
      original: "a lot of",
      corrected: "a substantial volume of / numerous / a multitude of",
      rule: "Tránh dùng từ ngữ khẩu ngữ ('a lot of') trong văn viết học thuật IELTS.",
      type: "collocation",
      colorClass: "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    });
  }

  if (paragraphs.length < 3) {
    detectedErrors.push({
      id: "err_cc_structure",
      original: "Bố cục thiếu phân đoạn",
      corrected: "Tách rõ 3-4 đoạn: Intro, Overview/Body 1, Body 2, Conclusion",
      rule: "Bài viết cần phân đoạn mạch lạc để đạt chuẩn tiêu chí Coherence & Cohesion 6.5+.",
      type: "cohesion",
      colorClass: "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    });
  }

  let graScore = 6.0;
  if (detectedErrors.length === 0 && wordCount >= targetMinWords) graScore = 7.0;
  else if (detectedErrors.length >= 3) graScore = 5.0;
  else if (detectedErrors.length >= 1) graScore = 5.5;

  // Round Overall Band to nearest 0.5
  const rawOverall = (trScore + ccScore + lrScore + graScore) / 4;
  const overallBand = Math.round(rawOverall * 2) / 2;

  // 5. C1 Upgrades Generation
  const upgradedSentences: C1UpgradeItem[] = [
    {
      id: "upg_01",
      original: "The government should do something to solve this big problem.",
      upgraded: "It is imperative that policymakers implement comprehensive statutory interventions to mitigate this pressing socioeconomic crisis.",
      technique: "cleft_sentence",
      explanation: "Dùng cấu trúc giả định thức 'It is imperative that...' kết hợp Collocations C1 (*implement statutory interventions*, *mitigate crisis*).",
      targetBand: "8.0",
    },
    {
      id: "upg_02",
      original: "People move to big cities because they want to find better jobs.",
      upgraded: "The relentless pace of rural-to-urban migration is primarily driven by the pursuit of lucrative employment prospects.",
      technique: "nominalization",
      explanation: "Danh từ hóa hành động 'people move' thành 'rural-to-urban migration', giúp câu văn cô đọng và trang trọng.",
      targetBand: "7.5",
    },
    {
      id: "upg_03",
      original: "If people do not reduce plastic waste, the environment will get worse.",
      upgraded: "Should proactive waste minimization strategies fail to materialize, environmental degradation will inevitably intensify.",
      technique: "inversion",
      explanation: "Đảo ngữ câu điều kiện loại 1 ('Should + S + V...') kết hợp từ vựng C1 (*waste minimization*, *environmental degradation*).",
      targetBand: "8.5+",
    },
  ];

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (wordCount >= targetMinWords) strengths.push(`Đạt và vượt mốc độ dài quy định (${wordCount}/${targetMinWords} từ).`);
  else weaknesses.push(`Chưa đạt đủ độ dài tối thiểu (${wordCount}/${targetMinWords} từ), bị trừ điểm Task Response.`);

  if (paragraphs.length >= 3) strengths.push("Phân chia đoạn văn rõ ràng, có luận điểm chính và câu mở đoạn.");
  else weaknesses.push("Bố cục đoạn văn còn dính liền, cần tách rõ Overview và các Body Paragraphs.");

  if (c1Count >= 2) strengths.push("Có sử dụng một số từ vựng và Collocations học thuật nâng cao.");
  else weaknesses.push("Từ vựng còn đơn giản, lặp từ nhiều, cần tăng cường danh từ hóa và từ vựng AWL.");

  const criteriaLabels =
    taskType === "task1"
      ? {
          c1: "Task Achievement (TA)",
          c2: "Coherence & Cohesion (CC)",
          c3: "Lexical Resource (LR)",
          c4: "Grammatical Range & Accuracy (GRA)",
        }
      : {
          c1: "Task Response (TR)",
          c2: "Coherence & Cohesion (CC)",
          c3: "Lexical Resource (LR)",
          c4: "Grammatical Range & Accuracy (GRA)",
        };

  return {
    id: `eval_w_${Date.now()}`,
    skillType: taskType === "task1" ? "writing_task1" : "writing_task2",
    promptText,
    userSubmission: text,
    wordCount,
    scores: {
      criteria1: trScore,
      criteria2: ccScore,
      criteria3: lrScore,
      criteria4: graScore,
      overallBand,
    },
    criteriaLabels,
    feedbackComments: {
      generalComment: `Bài viết thể hiện tư duy lập luận khá tốt ở mức Band ${overallBand}. Điểm nổi bật là ý tưởng bám sát đề bài, tuy nhiên cần khắc phục ${detectedErrors.length} điểm bất cẩn ngữ pháp/từ vựng để bứt phá lên Band 7.0+.`,
      strengths,
      weaknesses,
      upgradedSentences,
      detectedErrors,
      band8Sample:
        taskType === "task1"
          ? "The line graph delineates temporal variations in renewable electricity generation across four sovereign nations between 2010 and 2025. Overall, it is immediately apparent that all four countries witnessed an upward trajectory in green energy output..."
          : "Whether educational institutions should prioritize technical vocational training over liberal arts disciplines has ignited widespread academic debate. While technical expertise addresses immediate labor market shortages, I firmly contend that a holistic curriculum cultivates indispensable critical thinking...",
    },
    createdAt: new Date().toISOString(),
  };
}

/**
 * 2. Evaluate Speaking Audio (Part 1, Part 2 or Part 3)
 */
export async function evaluateSpeakingAudio(
  audioBlob: Blob | null,
  promptText: string,
  partType: "part1" | "part2_3",
  simulatedDurationSec = 45
): Promise<AIGradingReportRecord> {
  // Simulate Audio Signal Processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const duration = simulatedDurationSec || (partType === "part1" ? 30 : 90);

  // Fluency & Coherence
  const hesitations: SpeakingHesitationPoint[] = [];
  if (duration > 20) {
    hesitations.push({
      id: "hes_01",
      timestampSeconds: 12.4,
      durationSeconds: 2.3,
      note: "Khoảng lặng kéo dài > 2s khi tìm từ vựng miêu tả (Dead Air).",
    });
  }
  if (duration > 40) {
    hesitations.push({
      id: "hes_02",
      timestampSeconds: 31.8,
      durationSeconds: 1.8,
      note: "Ngập ngừng lặp lại cụm từ ('I think... I think that...').",
    });
  }

  let fcScore = 6.0;
  if (hesitations.length === 0 && duration >= 30) fcScore = 7.5;
  else if (hesitations.length <= 1) fcScore = 6.5;
  else fcScore = 5.5;

  // Lexical Resource
  const lrScore = partType === "part1" ? 6.5 : 6.0;

  // Grammatical Range & Accuracy
  const graScore = 6.0;

  // Pronunciation (Ending sounds, Intonation, Stress)
  const prScore = 6.5;

  const rawOverall = (fcScore + lrScore + graScore + prScore) / 4;
  const overallBand = Math.round(rawOverall * 2) / 2;

  const detectedErrors: DetectedErrorItem[] = [
    {
      id: "err_spk_01",
      original: "Phát âm đuôi /s/ trong 'students' và 'advantages'",
      corrected: "Bật rõ âm xát /s/ và /ɪz/ ở cuối danh từ số nhiều",
      rule: "Lỗi nuốt âm đuôi (Omission of ending consonants) làm tụt tiêu chí Pronunciation.",
      type: "pronunciation",
      colorClass: "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
  ];

  const upgradedSentences: C1UpgradeItem[] = [
    {
      id: "upg_spk_01",
      original: "I like living in the city because it has many interesting places.",
      upgraded: "What appeals to me most about urban life is the vibrant array of recreational amenities and cultural attractions.",
      technique: "cleft_sentence",
      explanation: "Dùng câu chẻ 'What appeals to me most...' để tạo điểm nhấn ngữ điệu tự nhiên cho Speaking.",
      targetBand: "8.0",
    },
    {
      id: "upg_spk_02",
      original: "Pollution is very bad and makes people sick.",
      upgraded: "Atmospheric pollution poses grave health hazards, significantly elevating the incidence of respiratory ailments.",
      technique: "academic_collocation",
      explanation: "Nâng cấp cụm từ thông thường thành Collocation Band 8.0 (*pose grave health hazards*, *respiratory ailments*).",
      targetBand: "8.5+",
    },
  ];

  return {
    id: `eval_s_${Date.now()}`,
    skillType: partType === "part1" ? "speaking_part1" : "speaking_part2_3",
    promptText,
    userSubmission: "[Audio Recording Transcript Processed via Web Speech / Audio API]",
    wordCount: Math.round(duration * 2.1),
    audioDurationSeconds: duration,
    scores: {
      criteria1: fcScore,
      criteria2: lrScore,
      criteria3: graScore,
      criteria4: prScore,
      overallBand,
    },
    criteriaLabels: {
      c1: "Fluency & Coherence (FC)",
      c2: "Lexical Resource (LR)",
      c3: "Grammatical Range & Accuracy (GRA)",
      c4: "Pronunciation (PR)",
    },
    feedbackComments: {
      generalComment: `Phần trả lời tự tin, ngữ điệu tự nhiên đạt mức Band ${overallBand}. Phát hiện ${hesitations.length} khoảng lặng ngập ngừng cần luyện kỹ thuật Filler Words / Pacing để nâng FC lên 7.0+.`,
      strengths: [
        "Phát âm rõ ràng, nguyên âm chuẩn, trọng âm câu tương đối ổn định.",
        "Trả lời đúng trọng tâm câu hỏi mà không bị lạc đề.",
      ],
      weaknesses: [
        `Ghi nhận ${hesitations.length} khoảng lặng > 1.5s, làm giảm độ mượt mà của bài nói.`,
        "Cần bổ sung cấu trúc câu phức và trạng từ liên kết tự nhiên (Well, To be completely honest, Interestingly enough).",
      ],
      upgradedSentences,
      detectedErrors,
      hesitations,
      band8Sample:
        "Well, from my perspective, the exponential expansion of metropolitan areas brings both immense economic vitality and severe environmental repercussions. For instance, urban dwellers enjoy unparalleled access to state-of-the-art healthcare...",
    },
    createdAt: new Date().toISOString(),
  };
}

/**
 * Helper to convert detected errors from AI Grading into ErrorItem for db.error_bank
 */
export function convertToErrorBankItems(
  report: AIGradingReportRecord
): ErrorItem[] {
  const sourceMod = report.skillType.startsWith("writing") ? "writing" : "speaking";

  return report.feedbackComments.detectedErrors.map((err) => ({
    id: `err_ai_${Date.now()}_${err.id}`,
    sourceModule: sourceMod,
    errorType: err.type === "pronunciation" ? "pronunciation" : "grammar",
    questionContext: `AI Grader Feedback on: "${report.promptText.slice(0, 120)}..."`,
    userWrongAnswer: err.original,
    correctAnswer: err.corrected,
    deepExplanation: `${err.rule} (Phát hiện bởi Cambridge AI Examiner Studio)`,
    mastered: false,
    retryCount: 1,
    consecutiveSuccesses: 0,
    createdAt: new Date().toISOString(),
  }));
}
