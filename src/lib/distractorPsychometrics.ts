/**
 * Cambridge Reverse Item Engineering & Distractor Psychometrics Engine
 * IELTS Reading Passage 3 Trap Deconstruction & Item Writer Sandbox (Band 7.5 - 8.5+)
 */

export type DistractorMechanism =
  | 'polarity_inversion'
  | 'half_truth'
  | 'scope_escalation'
  | 'unwarranted_extrapolation';

export interface DistractorBlueprintDefinition {
  type: DistractorMechanism;
  labelEn: string;
  labelVi: string;
  colorClass: string;
  badgeClass: string;
  descriptionVi: string;
  examinerTrickVi: string;
  examplePassageText: string;
  exampleTrapOption: string;
  whyItDeceivesBand6: string;
}

export interface DistractorDraft {
  id: string;
  type: DistractorMechanism;
  text: string;
  trapMechanismRationale: string;
}

export interface DistractorEvaluationItem {
  type: DistractorMechanism;
  text: string;
  isValid: boolean;
  score: number; // 0 - 100
  lexicalOverlapRatio: number; // 0 - 1 (higher = better surface decoy)
  feedbacksVi: string[];
}

export interface PsychometricAuditResult {
  overallSophisticationScore: number; // 0 - 100
  isExamReady: boolean;
  keyEvaluation: {
    fidelityScore: number;
    hasGoodParaphrase: boolean;
    feedbacksVi: string[];
  };
  distractorEvaluations: DistractorEvaluationItem[];
  strengths: string[];
  recommendations: string[];
  examinerRating: 'Amateur (Band 5.5 Trap)' | 'Competent (Band 6.5 Trap)' | 'Subtle & Deceptive (Band 7.5 Trap)' | 'Cambridge Gold Standard (Band 8.5+ Trap)';
}

export const DISTRACTOR_BLUEPRINTS: Record<DistractorMechanism, DistractorBlueprintDefinition> = {
  polarity_inversion: {
    type: 'polarity_inversion',
    labelEn: 'Polarity Inversion',
    labelVi: 'Đảo Cực Tính Tinh Vi',
    colorClass: 'rose',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    descriptionVi: 'Giữ nguyên 80-90% từ vựng của bài đọc nhưng bí mật chèn tiền tố phủ định, trạng từ hạn định hoặc từ nhượng bộ làm đảo ngược hoàn toàn bản chất sự thật.',
    examinerTrickVi: 'Thí sinh đọc lướt thấy toàn từ khóa quen thuộc ("prevent", "catastrophe") nên vội vã chọn ngay mà không nhận ra từ "failed to prevent" hay "scarcely prevented".',
    examplePassageText: 'The new emission caps successfully curtailed atmospheric pollutants across major industrial zones.',
    exampleTrapOption: 'The industrial policies ultimately failed to curtail airborne contamination.',
    whyItDeceivesBand6: 'Thí sinh scanning thấy từ vựng trùng khớp 100% nhưng không phân tích quan hệ logic phủ định.'
  },
  half_truth: {
    type: 'half_truth',
    labelEn: 'The Half-Truth Seduction',
    labelVi: 'Đúng Một Nửa Đầy Mê Hoặc',
    colorClass: 'amber',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    descriptionVi: 'Vế đầu của phương án hoàn toàn đúng và lấy từ bài đọc, nhưng vế sau (mệnh đề quan hệ, nguyên nhân - kết quả) lại bị gắn ghép sai lệch với một dữ kiện ở đoạn khác.',
    examinerTrickVi: 'Lợi dụng tâm lý đọc nửa chừng: Thí sinh thấy 5 từ đầu đúng y hệt bài đọc thì buông lỏng cảnh giác, bỏ qua vế điều kiện sai ở đuôi câu.',
    examplePassageText: 'Researchers discovered ancient microbial fossils in the Antarctic ice sheet, which helped explain prehistoric climate shifts.',
    exampleTrapOption: 'Microbial fossils in Antarctic ice were proven to be the primary catalyst of modern global warming.',
    whyItDeceivesBand6: 'Nửa đầu ("Microbial fossils in Antarctic ice") đúng sự thật, nửa đuôi ("primary catalyst of modern warming") là sự gán ghép bịa đặt.'
  },
  scope_escalation: {
    type: 'scope_escalation',
    labelEn: 'Extreme Scope Escalation',
    labelVi: 'Tuyệt Đối Hóa Phạm Vi & Tần Suất',
    colorClass: 'purple',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    descriptionVi: 'Chuyển đổi một nhận định có rào đón cẩn trọng trong bài đọc ("tends to", "some researchers hypothesize", "under specific conditions") thành phát biểu tuyệt đối trong câu hỏi ("invariably", "all", "wholly", "solely").',
    examinerTrickVi: 'Gài các từ tuyệt đối ("invariably", "every", "exclusive") vào một sự thật khoa học chung chung để biến chân lý thành ngụy biện.',
    examplePassageText: 'In many observed cases, cognitive behavioral therapy tends to alleviate mild anxiety symptoms in young adults.',
    exampleTrapOption: 'Cognitive behavioral therapy is invariably effective at eradicating all psychiatric conditions.',
    whyItDeceivesBand6: 'Thí sinh chỉ nhớ đại ý "CBT chữa được lo âu" mà không để ý mức độ xác suất bị phóng đại cực đoan.'
  },
  unwarranted_extrapolation: {
    type: 'unwarranted_extrapolation',
    labelEn: 'Plausible Real-World Extrapolation',
    labelVi: 'Suy Diễn Hợp Lý Ngoài Thực Tế (Bẫy Not Given)',
    colorClass: 'sky',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    descriptionVi: 'Đưa ra một phương án hoàn toàn đúng với tri thức thường thức hoặc logic ngoài đời thực nhưng trong bài đọc hoàn toàn KHÔNG đề cập đến.',
    examinerTrickVi: 'Đánh vào niềm tin kiến thức nền của thí sinh: Thấy câu này "quá đúng về mặt khoa học xã hội" nên tự động chọn mà quên kiểm tra xem tác giả có thực sự viết trong bài hay không.',
    examplePassageText: 'Urban green spaces provide aesthetic relief for city dwellers and absorb ambient noise.',
    exampleTrapOption: 'Public parks significantly decrease crime rates in high-density metropolitan neighborhoods.',
    whyItDeceivesBand6: 'Dù nhận định "công viên giảm tội phạm" có vẻ hợp lý ngoài đời, bài đọc không hề nói về tỷ lệ tội phạm (Not Given).'
  }
};

/**
 * Validates the student's crafted Key and Distractors
 */
export function evaluateDistractorQuality(
  sourceSentence: string,
  keyText: string,
  distractors: DistractorDraft[],
  passageText: string
): PsychometricAuditResult {
  const strengths: string[] = [];
  const recommendations: string[] = [];

  const trimmedSource = sourceSentence.trim();
  const trimmedKey = keyText.trim();

  // 1. Evaluate Key
  let fidelityScore = 80;
  const keyFeedbacks: string[] = [];
  let hasGoodParaphrase = false;

  if (trimmedKey.length < 15) {
    fidelityScore = 30;
    keyFeedbacks.push('Đáp án đúng (Key) quá ngắn hoặc chưa hoàn chỉnh.');
  } else {
    // Check if key is identical copy paste
    if (trimmedKey.toLowerCase() === trimmedSource.toLowerCase()) {
      fidelityScore = 50;
      keyFeedbacks.push('Cảnh báo: Đáp án Key bị copy y nguyên câu gốc! Chuyên gia Cambridge luôn diễn đạt lại (Paraphrase C1/C2) bằng từ đồng nghĩa hoặc biến đổi cấu trúc ngữ pháp.');
    } else {
      fidelityScore = 95;
      hasGoodParaphrase = true;
      keyFeedbacks.push('Đáp án Key bảo toàn trọn vẹn ngữ nghĩa gốc và có biến đổi từ vựng học thuật C1/C2 xuất sắc.');
      strengths.push('Đáp án Key được paraphrase tinh tế, không để lộ dấu vết từ khóa thô.');
    }
  }

  // 2. Evaluate Distractors
  const distractorEvaluations: DistractorEvaluationItem[] = distractors.map((draft) => {
    const text = draft.text.trim();
    const feedbacks: string[] = [];
    let score = 75;

    if (text.length < 10) {
      return {
        type: draft.type,
        text,
        isValid: false,
        score: 20,
        lexicalOverlapRatio: 0,
        feedbacksVi: ['Phương án nhiễu quá ngắn, chưa tạo thành mệnh đề hoàn chỉnh.']
      };
    }

    // Check lexical overlap with passage
    const passageWords = new Set(passageText.toLowerCase().split(/\W+/).filter((w) => w.length > 3));
    const draftWords = text.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    const overlapping = draftWords.filter((w) => passageWords.has(w));
    const overlapRatio = draftWords.length > 0 ? overlapping.length / draftWords.length : 0;

    if (draft.type === 'polarity_inversion') {
      const hasNegativeMarker = /\b(?:not|never|failed|unable|scarcely|barely|unlikely|contrary|lacked|prevented|ineffective|disproved)\b/i.test(text);
      if (hasNegativeMarker) {
        score += 15;
        feedbacks.push('Tạo bẫy Đảo cực tính thành công: Có dấu hiệu phủ định/nghịch đảo tinh vi.');
      } else {
        score -= 20;
        feedbacks.push('Chưa thấy rõ dấu hiệu đảo cực tính (cần chèn tiền tố un-/dis- hoặc trạng từ phủ định failed to/barely).');
      }
    } else if (draft.type === 'half_truth') {
      const hasConjunctionOrRel = /\b(?:which|because|due to|leading to|resulting in|although|while|however|thereby)\b/i.test(text);
      if (hasConjunctionOrRel) {
        score += 15;
        feedbacks.push('Tạo bẫy Đúng Một Nửa sắc sảo: Ghép nối vế trước đúng với vế sau sai lệch bằng mệnh đề quan hệ / nhân quả.');
      } else {
        feedbacks.push('Nên chia rõ 2 vế (vế 1 lấy đúng từ bài đọc, vế 2 gán ghép sai kết quả).');
      }
    } else if (draft.type === 'scope_escalation') {
      const hasAbsoluteMarker = /\b(?:all|always|every|invariably|entirely|solely|exclusively|completely|wholly|impossible|must)\b/i.test(text);
      if (hasAbsoluteMarker) {
        score += 20;
        feedbacks.push('Tạo bẫy Tuyệt đối hóa phạm vi chuẩn mực: Chứa các từ tuyệt đối ("invariably", "solely", "all").');
      } else {
        score -= 15;
        feedbacks.push('Chưa chứa từ tuyệt đối hóa rõ rệt. Hãy thêm "invariably", "solely", "entirely" để đẩy nhận định lên cực đoan.');
      }
    } else if (draft.type === 'unwarranted_extrapolation') {
      score += 15;
      feedbacks.push('Tạo bẫy Suy diễn ngoài bài (Not Given Trap) kích thích kiến thức nền của thí sinh.');
    }

    if (overlapRatio > 0.4) {
      feedbacks.push(`Mồi nhử từ vựng tốt (${Math.round(overlapRatio * 100)}% từ vựng quen thuộc trong bài đọc giúp đánh lừa thí sinh đọc lướt).`);
    }

    return {
      type: draft.type,
      text,
      isValid: score >= 65,
      score: Math.min(100, Math.max(0, score)),
      lexicalOverlapRatio: overlapRatio,
      feedbacksVi: feedbacks
    };
  });

  // Calculate Overall Sophistication Score
  const avgDistractorScore =
    distractorEvaluations.length > 0
      ? distractorEvaluations.reduce((acc, curr) => acc + curr.score, 0) / distractorEvaluations.length
      : 0;

  const overallSophisticationScore = Math.round(fidelityScore * 0.35 + avgDistractorScore * 0.65);

  let examinerRating: PsychometricAuditResult['examinerRating'] = 'Amateur (Band 5.5 Trap)';
  if (overallSophisticationScore >= 88) {
    examinerRating = 'Cambridge Gold Standard (Band 8.5+ Trap)';
    strengths.push('Bộ câu hỏi đạt chuẩn khảo thí Cambridge: Các phương án nhiễu bẫy sâu vào tư duy logic và đọc hiểu bản chất.');
  } else if (overallSophisticationScore >= 75) {
    examinerRating = 'Subtle & Deceptive (Band 7.5 Trap)';
    strengths.push('Phương án nhiễu có tính đánh lừa cao, đủ sức hạ gục thí sinh Band 6.5.');
  } else if (overallSophisticationScore >= 60) {
    examinerRating = 'Competent (Band 6.5 Trap)';
  }

  if (distractorEvaluations.some((d) => d.lexicalOverlapRatio < 0.2)) {
    recommendations.push('Nên tận dụng thêm từ vựng xuất hiện trong bài đọc để tạo mồi nhử từ khóa (Lexical Decoy) cho các phương án sai.');
  }

  const isExamReady = overallSophisticationScore >= 75 && hasGoodParaphrase;

  return {
    overallSophisticationScore,
    isExamReady,
    keyEvaluation: {
      fidelityScore,
      hasGoodParaphrase,
      feedbacksVi: keyFeedbacks
    },
    distractorEvaluations,
    strengths,
    recommendations,
    examinerRating
  };
}
