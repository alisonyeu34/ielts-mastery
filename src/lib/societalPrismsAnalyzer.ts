/**
 * 6 Institutional Macro-Prisms & Policy Dilemma Analyzer
 * IELTS Speaking Part 3 Discourse Engineering (Band 7.5 - 8.5+)
 */

export type SocietalPrismId =
  | 'individual'
  | 'corporate'
  | 'government'
  | 'scientific'
  | 'vulnerable'
  | 'global';

export interface SocietalPrismDefinition {
  id: SocietalPrismId;
  name: string;
  vietnameseName: string;
  shortLabel: string;
  icon: string;
  color: string;
  badgeColor: string;
  bgGradient: string;
  borderGlow: string;
  corePerspective: string;
  starterFormula: string;
  keyTerms: string[];
}

export interface PrismMatchItem {
  prismId: SocietalPrismId;
  prismName: string;
  count: number;
  matches: string[];
}

export interface PrismAnalysisResult {
  detectedPrisms: PrismMatchItem[];
  activePrismCount: number;
  breadthScore: number; // 0 - 100
  egocentricCount: number;
  egocentricSnippets: string[];
  isEgocentricTrap: boolean;
  policyTradeoffDetected: boolean;
  fluencyBandEstimate: number; // 5.5 -> 8.5
  warnings: string[];
  strengths: string[];
  recommendations: string[];
}

export const SOCIETAL_PRISMS: SocietalPrismDefinition[] = [
  {
    id: 'government',
    name: 'Government & Regulatory',
    vietnameseName: 'Chính Phủ & Khung Pháp Lý',
    shortLabel: 'Chính Phủ',
    icon: '🏛️',
    color: 'emerald',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    bgGradient: 'from-emerald-950/60 to-slate-900',
    borderGlow: 'border-emerald-500/50 shadow-emerald-950/50',
    corePerspective: 'Ngân sách công, luật pháp cưỡng chế, chính sách trợ giá, kiểm toán vĩ mô.',
    starterFormula: 'From a regulatory and macroeconomic standpoint, municipal authorities must balance...',
    keyTerms: [
      'regulatory', 'municipal', 'statutory', 'legislation', 'subsidize', 'subsidies',
      'policymakers', 'public expenditure', 'fiscal deficit', 'statutory enforcement',
      'governmental mandates', 'tax incentives', 'infrastructure investment'
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate & Market Dynamics',
    vietnameseName: 'Doanh Nghiệp & Động Lực Thị Trường',
    shortLabel: 'Doanh Nghiệp',
    icon: '🏢',
    color: 'cyan',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    bgGradient: 'from-cyan-950/60 to-slate-900',
    borderGlow: 'border-cyan-500/50 shadow-cyan-950/50',
    corePerspective: 'Biên lợi nhuận, chi phí tuân thủ, cạnh tranh thị trường, trách nhiệm CSR.',
    starterFormula: 'From an enterprise and commercial viability angle, private corporations inevitably face...',
    keyTerms: [
      'profit margins', 'commercial viability', 'enterprise', 'shareholders',
      'market-driven', 'corporate social responsibility', 'csr', 'cost of compliance',
      'supply chain efficiency', 'market volatility', 'capital expenditure'
    ]
  },
  {
    id: 'scientific',
    name: 'Scientific & Technological',
    vietnameseName: 'Khoa Học & Đổi Mới Công Nghệ',
    shortLabel: 'Khoa Học',
    icon: '🔬',
    color: 'indigo',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    bgGradient: 'from-indigo-950/60 to-slate-900',
    borderGlow: 'border-indigo-500/50 shadow-indigo-950/50',
    corePerspective: 'Dữ liệu thực nghiệm, tính khả thi kỹ thuật, tự động hóa, chuyển giao công nghệ.',
    starterFormula: 'Examining the empirical and technological dimension, research data conclusively illustrates...',
    keyTerms: [
      'empirical', 'technological innovation', 'feasibility', 'automation',
      'longitudinal data', 'scientific consensus', 'ecological degradation',
      'algorithmic efficiency', 'renewable alternatives', 'technical infrastructure'
    ]
  },
  {
    id: 'vulnerable',
    name: 'Socioeconomic Equity & Vulnerable Strata',
    vietnameseName: 'Nhóm Yếu Thế & Công Bằng Xã Hội',
    shortLabel: 'Công Bằng Xã Hội',
    icon: '🤝',
    color: 'rose',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    bgGradient: 'from-rose-950/60 to-slate-900',
    borderGlow: 'border-rose-500/50 shadow-rose-950/50',
    corePerspective: 'Khoảng cách giàu nghèo, quyền tiếp cận bình đẳng, bảo trợ người lao động nghèo.',
    starterFormula: 'Through the lens of socioeconomic equity, failing to intervene disproportionately penalizes...',
    keyTerms: [
      'socioeconomic disparity', 'low-income cohorts', 'underprivileged', 'marginalized',
      'equity', 'vulnerable demographics', 'disproportionately affected', 'accessibility divide',
      'social safety net', 'intergenerational mobility'
    ]
  },
  {
    id: 'global',
    name: 'Global & Multilateral Accords',
    vietnameseName: 'Toàn Cầu & Hiệp Ước Đa Phương',
    shortLabel: 'Toàn Cầu',
    icon: '🌍',
    color: 'purple',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    bgGradient: 'from-purple-950/60 to-slate-900',
    borderGlow: 'border-purple-500/50 shadow-purple-950/50',
    corePerspective: 'Biến đổi khí hậu xuyên biên giới, hiệp định quốc tế, chuỗi cung ứng toàn cầu.',
    starterFormula: 'On a broader multilateral scale, cross-border issues cannot be solved in isolation because...',
    keyTerms: [
      'multilateral', 'international accords', 'cross-border', 'transnational',
      'global supply chain', 'geopolitical ramifications', 'united nations',
      'diplomatic synergy', 'carbon footprint quotas', 'global commons'
    ]
  },
  {
    id: 'individual',
    name: 'Individual & Consumer Behavior',
    vietnameseName: 'Cá Nhân & Người Tiêu Dùng',
    shortLabel: 'Người Tiêu Dùng',
    icon: '👤',
    color: 'amber',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    bgGradient: 'from-amber-950/60 to-slate-900',
    borderGlow: 'border-amber-500/50 shadow-amber-950/50',
    corePerspective: 'Thói quen tiêu dùng, gánh nặng tài chính hộ gia đình, sức khỏe tinh thần/thể chất.',
    starterFormula: 'At the grassroots consumer level, the average citizen faces acute psychological and financial trade-offs...',
    keyTerms: [
      'consumer habits', 'personal well-being', 'psychological toll', 'domestic expenditure',
      'household budget', 'cost of living', 'grassroots behavior', 'lifestyle choices',
      'discretionary income', 'civic awareness'
    ]
  }
];

export const EGOCENTRIC_PHRASES = [
  'i think',
  'in my opinion',
  'from my experience',
  'i believe that',
  'people should',
  'in my country everyone',
  'for me personally',
  'as far as i know'
];

export const POLICY_TRADEOFF_TEMPLATES = [
  {
    prismA: 'government' as SocietalPrismId,
    prismB: 'vulnerable' as SocietalPrismId,
    template: 'From a regulatory standpoint, municipal authorities face severe fiscal deficits; however, curtailing subsidies disproportionately penalizes lower-income socioeconomic cohorts.',
    contextVi: 'Mâu thuẫn giữa thắt chặt ngân sách chính phủ và bảo trợ xã hội cho tầng lớp thu nhập thấp.'
  },
  {
    prismA: 'corporate' as SocietalPrismId,
    prismB: 'scientific' as SocietalPrismId,
    template: 'While commercial enterprises inevitably resist stringent environmental mandates due to squeezed profit margins, the empirical scientific consensus highlights irreversible ecological degradation in the absence of statutory enforcement.',
    contextVi: 'Xung đột giữa biên lợi nhuận ngắn hạn của doanh nghiệp và tính cấp thiết khoa học về môi trường.'
  },
  {
    prismA: 'individual' as SocietalPrismId,
    prismB: 'global' as SocietalPrismId,
    template: 'At the consumer level, individuals prioritize immediate convenience and low cost; yet, on a multilateral scale, this collective indifference precipitates systemic transnational carbon footprints.',
    contextVi: 'Đánh đổi giữa thói quen tiêu dùng tiện lợi cá nhân và nghĩa vụ hiệp ước giảm phát thải toàn cầu.'
  }
];

/**
 * Evaluates the institutional breadth and egocentric speech traps in Speaking Part 3 transcripts
 */
export function evaluatePrismCoverage(transcript: string): PrismAnalysisResult {
  const lower = transcript.toLowerCase();
  const detectedPrisms: PrismMatchItem[] = [];

  // Check each societal prism
  SOCIETAL_PRISMS.forEach((prism) => {
    const matches: string[] = [];
    prism.keyTerms.forEach((term) => {
      const regex = new RegExp(`\\b${term.replace(/\s+/g, '\\s+')}\\b`, 'gi');
      if (regex.test(lower)) {
        matches.push(term);
      }
    });

    if (matches.length > 0) {
      detectedPrisms.push({
        prismId: prism.id,
        prismName: prism.name,
        count: matches.length,
        matches: Array.from(new Set(matches))
      });
    }
  });

  // Detect Egocentric speech markers
  const egocentricSnippets: string[] = [];
  let egocentricCount = 0;

  EGOCENTRIC_PHRASES.forEach((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) {
      egocentricCount += matches.length;
      egocentricSnippets.push(phrase);
    }
  });

  const activePrismCount = detectedPrisms.length;
  const isEgocentricTrap = egocentricCount >= 2 || (activePrismCount === 0 && transcript.length > 50);

  // Check for policy tradeoff indicators (while, however, conversely, on the one hand, trade-off, dilemma)
  const tradeoffRegex = /\b(?:while|whereas|however|conversely|on\s+the\s+other\s+hand|trade-off|dilemma|squeezed\s+between|tension\s+between)\b/i;
  const policyTradeoffDetected = tradeoffRegex.test(transcript) && activePrismCount >= 2;

  // Breadth scoring
  let breadthScore = Math.min(100, activePrismCount * 30 + (policyTradeoffDetected ? 20 : 0) - egocentricCount * 15);
  breadthScore = Math.max(20, Math.min(100, breadthScore));

  const warnings: string[] = [];
  const strengths: string[] = [];
  const recommendations: string[] = [];

  if (isEgocentricTrap) {
    warnings.push(`Phát hiện ${egocentricCount} cấu trúc xưng hô cá nhân vị kỷ ("I think", "my opinion"). Part 3 khảo thí khả năng phân tích xã hội học khách quan, không phải câu chuyện phiếm cá nhân.`);
    recommendations.push('Thay thế "I think people should..." bằng "From a regulatory perspective, municipal authorities ought to..."');
  }

  if (activePrismCount >= 3) {
    strengths.push(`Tư duy vĩ mô xuất sắc: Kích hoạt thành công ${activePrismCount} lăng kính chủ thể (${detectedPrisms.map(p => p.prismName).join(', ')}).`);
  } else if (activePrismCount >= 2) {
    strengths.push(`Phân tích đa chiều vững chắc với ${activePrismCount} nhóm chủ thể thể chế.`);
  } else {
    warnings.push(`Chỉ kích hoạt được ${activePrismCount}/6 lăng kính thể chế. Bài nói có nguy cơ bị đánh giá là một chiều (One-dimensional response).`);
    recommendations.push('Hãy áp dụng Vòng quay 6 Lăng kính để kích hoạt ít nhất 2 nhóm đối lập (ví dụ: Doanh nghiệp vs Chính phủ).');
  }

  if (policyTradeoffDetected) {
    strengths.push('Bóc tách thành công sự mâu thuẫn đánh đổi lợi ích chính sách (Policy Dilemma) chuẩn Band 8.5+ Lexical & Fluency.');
  }

  // Band estimation
  let fluencyBandEstimate = 6.0;
  if (breadthScore >= 90) fluencyBandEstimate = 8.5;
  else if (breadthScore >= 80) fluencyBandEstimate = 8.0;
  else if (breadthScore >= 70) fluencyBandEstimate = 7.5;
  else if (breadthScore >= 60) fluencyBandEstimate = 7.0;
  else if (breadthScore >= 50) fluencyBandEstimate = 6.5;

  return {
    detectedPrisms,
    activePrismCount,
    breadthScore,
    egocentricCount,
    egocentricSnippets,
    isEgocentricTrap,
    policyTradeoffDetected,
    fluencyBandEstimate,
    warnings,
    strengths,
    recommendations
  };
}
