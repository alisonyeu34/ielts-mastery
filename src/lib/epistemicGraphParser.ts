/**
 * Epistemic Discourse Mapping & Abstract Anatomy Engine
 * IELTS Reading Passage 3 Epistemic Concept Network (Band 7.5 - 8.5+)
 */

export type EpistemicNodeType = 'concept' | 'proponent' | 'skeptic' | 'author_stance';

export type EpistemicRelation = 'supports' | 'undermines' | 'qualifies' | 'originates_from';

export interface EpistemicNode {
  id: string;
  label: string; // Tên nhà khoa học hoặc khái niệm
  type: EpistemicNodeType;
  roleTitle?: string;
  summary: string;
  paragraphIndex: number; // 1-indexed paragraph in reading passage
  keyQuotes: string[];
  x: number; // SVG ViewBox coordinate (0 - 800)
  y: number; // SVG ViewBox coordinate (0 - 450)
  domain: string;
}

export interface EpistemicEdge {
  id: string;
  source: string; // source node id
  target: string; // target node id
  relation: EpistemicRelation;
  label: string;
  evidenceSnippet: string;
  paragraphIndex: number;
}

export interface AbstractSummarySlot {
  id: string;
  slotNumber: number;
  preText: string;
  correctTermId: string;
  correctTerm: string;
  postText: string;
  explanation: string;
  epistemicTrap: string;
}

export interface AbstractBoxOption {
  id: string;
  term: string;
  ipa: string;
  definitionEn: string;
  definitionVi: string;
  band: 'C1' | 'C2';
  isDistractor: boolean;
  distractorRationale?: string;
}

export interface AuthorialStanceAnalysis {
  stanceType: 'cautious_synthesis' | 'skeptical_rejection' | 'qualified_endorsement' | 'pragmatic_neutrality';
  stanceTitle: string;
  coreThesis: string;
  keyHedgingExpressions: string[];
  concludingParagraphIndex: number;
  cambridgeTrapExplanation: string;
}

export interface AbstractConstruct {
  id: string;
  name: string;
  definition: string;
  implications: string;
  collocations: string[];
}

export interface DialecticalFactions {
  proponents: Array<{
    name: string;
    institution: string;
    coreClaim: string;
    methodology?: string;
    counterArgument?: string;
  }>;
  skeptics: Array<{
    name: string;
    institution: string;
    coreClaim: string;
    counterArgument?: string;
    methodology?: string;
  }>;
}

export interface Passage3EpistemicItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  wordCount: number;
  paragraphs: string[];
  nodes: EpistemicNode[];
  edges: EpistemicEdge[];
  constructs: AbstractConstruct[];
  factions: DialecticalFactions;
  authorStance: AuthorialStanceAnalysis;
  summaryTask: {
    title: string;
    instructions: string;
    options: AbstractBoxOption[];
    slots: AbstractSummarySlot[];
  };
}

export interface SummaryEvaluationResult {
  score: number;
  total: number;
  percentage: number;
  isPassed: boolean;
  results: Record<string, {
    isCorrect: boolean;
    userTermId: string;
    userTerm: string;
    correctTerm: string;
    explanation: string;
    epistemicTrap: string;
  }>;
}

export function evaluateSummaryAnswers(
  userSlots: Record<string, string>, // slotId -> optionId
  slots: AbstractSummarySlot[],
  options: AbstractBoxOption[]
): SummaryEvaluationResult {
  const optionMap = new Map(options.map(opt => [opt.id, opt.term]));
  let correctCount = 0;
  const results: SummaryEvaluationResult['results'] = {};

  slots.forEach(slot => {
    const userOptionId = userSlots[slot.id] || '';
    const userTerm = optionMap.get(userOptionId) || '(Chưa chọn)';
    const isCorrect = userOptionId === slot.correctTermId;

    if (isCorrect) {
      correctCount++;
    }

    results[slot.id] = {
      isCorrect,
      userTermId: userOptionId,
      userTerm,
      correctTerm: slot.correctTerm,
      explanation: slot.explanation,
      epistemicTrap: slot.epistemicTrap
    };
  });

  const total = slots.length;
  const percentage = Math.round((correctCount / total) * 100);

  return {
    score: correctCount,
    total,
    percentage,
    isPassed: percentage >= 70,
    results
  };
}

export function getNodeTheme(type: EpistemicNodeType): {
  border: string;
  bg: string;
  text: string;
  ring: string;
  badgeBg: string;
  glow: string;
} {
  switch (type) {
    case 'concept':
      return {
        border: 'border-cyan-500/60',
        bg: 'bg-cyan-950/80',
        text: 'text-cyan-200',
        ring: 'ring-cyan-500/30',
        badgeBg: 'bg-cyan-500/20 text-cyan-300',
        glow: 'rgba(6, 182, 212, 0.4)'
      };
    case 'proponent':
      return {
        border: 'border-emerald-500/60',
        bg: 'bg-emerald-950/80',
        text: 'text-emerald-200',
        ring: 'ring-emerald-500/30',
        badgeBg: 'bg-emerald-500/20 text-emerald-300',
        glow: 'rgba(16, 185, 129, 0.4)'
      };
    case 'skeptic':
      return {
        border: 'border-rose-500/60',
        bg: 'bg-rose-950/80',
        text: 'text-rose-200',
        ring: 'ring-rose-500/30',
        badgeBg: 'bg-rose-500/20 text-rose-300',
        glow: 'rgba(244, 63, 94, 0.4)'
      };
    case 'author_stance':
      return {
        border: 'border-amber-500/80',
        bg: 'bg-amber-950/90',
        text: 'text-amber-200',
        ring: 'ring-amber-500/50',
        badgeBg: 'bg-amber-500/20 text-amber-300',
        glow: 'rgba(245, 158, 11, 0.6)'
      };
  }
}

export function getEdgeTheme(relation: EpistemicRelation): {
  stroke: string;
  strokeDasharray?: string;
  labelBg: string;
  text: string;
} {
  switch (relation) {
    case 'supports':
      return {
        stroke: '#10b981', // emerald-500
        labelBg: 'bg-emerald-950 border-emerald-500/50 text-emerald-300',
        text: 'Đồng thuận / Mở rộng'
      };
    case 'undermines':
      return {
        stroke: '#f43f5e', // rose-500
        strokeDasharray: '6,4',
        labelBg: 'bg-rose-950 border-rose-500/50 text-rose-300',
        text: 'Phản bác / Nghi vấn'
      };
    case 'qualifies':
      return {
        stroke: '#f59e0b', // amber-500
        strokeDasharray: '4,3',
        labelBg: 'bg-amber-950 border-amber-500/50 text-amber-300',
        text: 'Giới hạn / Ràng buộc'
      };
    case 'originates_from':
      return {
        stroke: '#06b6d4', // cyan-500
        labelBg: 'bg-cyan-950 border-cyan-500/50 text-cyan-300',
        text: 'Kế thừa / Bắt nguồn'
      };
  }
}
