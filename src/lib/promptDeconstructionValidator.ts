/**
 * Stealth Off-Topic Surgery & Nuanced Prompt Deconstruction Engine
 * IELTS Writing Task 2 Task Response Forensics (Band 7.5 - 8.5+)
 */

export type PromptComponentType =
  | 'context'
  | 'core_subject'
  | 'limiting_qualifier'
  | 'directive_task';

export interface PromptComponentDefinition {
  type: PromptComponentType;
  label: string;
  vietnameseLabel: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
  description: string;
}

export interface PromptHighlight {
  id: string;
  type: PromptComponentType;
  startIndex: number;
  endIndex: number;
  selectedText: string;
}

export interface DeconstructionAuditResult {
  isAllComponentsCovered: boolean;
  missedQualifiers: string[];
  coverageScore: number; // 0 - 100
  warnings: string[];
  strengths: string[];
  stealthDriftRisk: 'low' | 'moderate' | 'high';
}

export interface ThesisValidationResult {
  isValid: boolean;
  thesisScore: number; // 0 - 100
  isAmbiguousWishyWashy: boolean;
  hasClearStance: boolean;
  matchedStanceType: 'strong_agreement' | 'strong_disagreement' | 'balanced_concession' | 'ambiguous' | 'unrecognized';
  warnings: string[];
  strengths: string[];
  suggestedRevisions: string[];
}

export const PROMPT_COMPONENTS: Record<PromptComponentType, PromptComponentDefinition> = {
  context: {
    type: 'context',
    label: 'Broad Context',
    vietnameseLabel: 'Bối Cảnh Chủ Đề Chung',
    color: 'blue',
    textColor: 'text-blue-300',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/40',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    description: 'Chủ đề vĩ mô bao quát mà đề bài đặt ra (ví dụ: công nghệ, môi trường, giáo dục).'
  },
  core_subject: {
    type: 'core_subject',
    label: 'Core Subject / Action',
    vietnameseLabel: 'Đối Tượng / Hành Động Trọng Tâm',
    color: 'emerald',
    textColor: 'text-emerald-300',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/40',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Đối tượng hoặc hành động cụ thể đang được xem xét (ví dụ: việc xây thêm đường, quảng cáo thức ăn nhanh cho trẻ em).'
  },
  limiting_qualifier: {
    type: 'limiting_qualifier',
    label: 'Limiting Qualifier / Scope',
    vietnameseLabel: 'Từ Giới Hạn Phạm Vi / Bẫy Tuyệt Đối',
    color: 'rose',
    textColor: 'text-rose-300',
    bgColor: 'bg-rose-500/25',
    borderColor: 'border-rose-500/50',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    description: 'Các từ hạn định tuyệt đối hoặc phạm vi hẹp ("only", "solely", "primary", "inevitable", "children"). Bỏ qua từ này = Lạc đề ngầm.'
  },
  directive_task: {
    type: 'directive_task',
    label: 'Directive Instruction',
    vietnameseLabel: 'Mệnh Lệnh Khảo Thí',
    color: 'amber',
    textColor: 'text-amber-300',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/40',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'Yêu cầu của giám khảo ("To what extent do you agree", "Discuss both views and give your opinion", "Causes & solutions").'
  }
};

export const AMBIGUOUS_THESIS_PATTERNS = [
  /\b(?:both\s+views\s+have\s+merit|there\s+are\s+both\s+pros\s+and\s+cons|both\s+sides\s+will\s+be\s+discussed|this\s+essay\s+will\s+discuss\s+both\s+advantages\s+and\s+disadvantages)\b/i,
  /\b(?:it\s+depends\s+on\s+various\s+factors|there\s+are\s+arguments\s+on\s+both\s+sides)\b/i
];

export const STRONG_THESIS_PATTERNS = [
  /\b(?:i\s+(?:firmly|completely|totally)\s+(?:agree|disagree)\s+with\s+this\s+contention)\b/i,
  /\b(?:while\s+.+,\s+this\s+essay\s+firmly\s+maintains\s+that)\b/i,
  /\b(?:this\s+essay\s+argues\s+that\s+although\s+.+,\s+.+)\b/i,
  /\b(?:i\s+concur\s+with\s+the\s+former\s+viewpoint\s+for\s+two\s+primary\s+reasons)\b/i,
  /\b(?:this\s+essay\s+contends\s+that\s+.+\s+is\s+far\s+more\s+pivotal\s+than)\b/i
];

/**
 * Validates the student's 4-component prompt highlighting against expected keywords
 */
export function validatePromptDeconstruction(
  highlights: PromptHighlight[],
  expectedKeywords: Record<PromptComponentType, string[]>
): DeconstructionAuditResult {
  const warnings: string[] = [];
  const strengths: string[] = [];
  const missedQualifiers: string[] = [];

  const typesCovered = new Set(highlights.map((h) => h.type));
  let coverageScore = 0;

  // Check coverage of 4 components
  (['context', 'core_subject', 'limiting_qualifier', 'directive_task'] as PromptComponentType[]).forEach((type) => {
    if (typesCovered.has(type)) {
      coverageScore += 25;
    }
  });

  // Check Limiting Qualifiers specifically
  const qualifierHighlights = highlights
    .filter((h) => h.type === 'limiting_qualifier')
    .map((h) => h.selectedText.toLowerCase().trim());

  const expectedQualifiers = expectedKeywords.limiting_qualifier || [];

  expectedQualifiers.forEach((expected) => {
    const isCaptured = qualifierHighlights.some((text) =>
      text.includes(expected.toLowerCase()) || expected.toLowerCase().includes(text)
    );
    if (!isCaptured) {
      missedQualifiers.push(expected);
    }
  });

  if (missedQualifiers.length > 0) {
    warnings.push(`Bỏ sót từ giới hạn phạm vi then chốt: [${missedQualifiers.join(', ')}]. Điều này sẽ dẫn đến bẫy Lạc Đề Ngầm (Stealth Drift).`);
  } else if (typesCovered.has('limiting_qualifier')) {
    strengths.push('Bắt trúng 100% các từ hạn định phạm vi và bẫy tuyệt đối hóa của đề bài.');
  }

  if (!typesCovered.has('context')) {
    warnings.push('Chưa xác định Bối cảnh chủ đề vĩ mô (Context).');
  }
  if (!typesCovered.has('core_subject')) {
    warnings.push('Chưa xác định Đối tượng/Hành động trọng tâm (Core Subject).');
  }
  if (!typesCovered.has('directive_task')) {
    warnings.push('Chưa xác định Mệnh lệnh khảo thí (Directive Instruction).');
  }

  if (typesCovered.size === 4 && missedQualifiers.length === 0) {
    strengths.push('Bóc tách hoàn hảo 4 thành phần vi cấu trúc đề bài chuẩn Band 8.5+ Task Response.');
  }

  let stealthDriftRisk: 'low' | 'moderate' | 'high' = 'low';
  if (missedQualifiers.length > 0 || !typesCovered.has('limiting_qualifier')) {
    stealthDriftRisk = 'high';
  } else if (typesCovered.size < 4) {
    stealthDriftRisk = 'moderate';
  }

  return {
    isAllComponentsCovered: typesCovered.size === 4 && missedQualifiers.length === 0,
    missedQualifiers,
    coverageScore,
    warnings,
    strengths,
    stealthDriftRisk
  };
}

/**
 * Validates a candidate's Thesis Statement for decisiveness and coverage of qualifiers
 */
export function evaluateThesisStatement(
  thesisText: string,
  promptType: string,
  expectedQualifiers: string[]
): ThesisValidationResult {
  const trimmed = thesisText.trim();
  const warnings: string[] = [];
  const strengths: string[] = [];
  const suggestedRevisions: string[] = [];

  if (trimmed.length < 15) {
    return {
      isValid: false,
      thesisScore: 20,
      isAmbiguousWishyWashy: false,
      hasClearStance: false,
      matchedStanceType: 'unrecognized',
      warnings: ['Câu Luận đề (Thesis Statement) quá ngắn hoặc chưa hoàn chỉnh.'],
      strengths: [],
      suggestedRevisions: ['Viết câu Luận đề rõ ràng: "While [Counter-argument], this essay firmly contends that [Main position]..."']
    };
  }

  // Check for Wishy-Washy / Ambiguous Thesis patterns
  const isAmbiguousWishyWashy = AMBIGUOUS_THESIS_PATTERNS.some((pattern) =>
    pattern.test(trimmed)
  );

  if (isAmbiguousWishyWashy) {
    warnings.push('Bẫy Mở Bài Ba Phải: Câu luận đề của bạn chỉ thông báo "sẽ thảo luận cả 2 mặt" mà không đưa ra lập trường dứt khoát. Điều này vi phạm tiêu chí Band 7.0+ TR (presents a clear position throughout).');
    suggestedRevisions.push('Đưa ra quan điểm rõ ràng: "While there are valid arguments on both sides, this essay maintains that..."');
  }

  // Check for Strong Thesis patterns
  const isStrong = STRONG_THESIS_PATTERNS.some((pattern) => pattern.test(trimmed));
  let matchedStanceType: ThesisValidationResult['matchedStanceType'] = 'unrecognized';

  if (isAmbiguousWishyWashy) {
    matchedStanceType = 'ambiguous';
  } else if (/agree/i.test(trimmed) && !/disagree/i.test(trimmed)) {
    matchedStanceType = 'strong_agreement';
  } else if (/disagree/i.test(trimmed) && !/agree/i.test(trimmed)) {
    matchedStanceType = 'strong_disagreement';
  } else if (/while|although|whereas/i.test(trimmed)) {
    matchedStanceType = 'balanced_concession';
  }

  // Check if expected qualifiers are acknowledged
  const lowerThesis = trimmed.toLowerCase();
  const missedInThesis = expectedQualifiers.filter(
    (q) => !lowerThesis.includes(q.toLowerCase())
  );

  let thesisScore = 80;

  if (isAmbiguousWishyWashy) {
    thesisScore = 45;
  } else {
    if (isStrong || matchedStanceType === 'balanced_concession') {
      thesisScore = 95;
      strengths.push('Lập trường luận đề đanh thép, rõ ràng và có tính nhượng bộ học thuật (Concession Thesis) đạt chuẩn Band 8.5+ TR.');
    } else if (matchedStanceType !== 'unrecognized') {
      thesisScore = 85;
      strengths.push('Lập trường dứt khoát, định hướng tốt cho toàn bộ thân bài.');
    }
  }

  if (missedInThesis.length > 0 && !isAmbiguousWishyWashy) {
    warnings.push(`Luận đề nên phản hồi trực diện từ giới hạn [${missedInThesis.join(', ')}] để khóa chặt tính toàn vẹn.`);
  }

  const isValid = thesisScore >= 75;

  return {
    isValid,
    thesisScore,
    isAmbiguousWishyWashy,
    hasClearStance: !isAmbiguousWishyWashy && matchedStanceType !== 'unrecognized',
    matchedStanceType,
    warnings,
    strengths,
    suggestedRevisions
  };
}
