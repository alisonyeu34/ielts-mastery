import { ToulminParts } from "@/data/mockToulminData";

export interface FallacyDetectionResult {
  hasHastyGeneralization: boolean;
  hasSlipperySlope: boolean;
  hasFalseDilemma: boolean;
  detectedPhrases: string[];
  fallacyExplanationsVi: string[];
}

export interface ToulminEvaluationResult {
  totalWordCount: number;
  wordCountByBlock: {
    claim: number;
    data: number;
    warrant: number;
    backing: number;
    counterArgument: number;
    rebuttal: number;
  };
  hasClaim: boolean;
  hasData: boolean;
  hasWarrant: boolean;
  hasBacking: boolean;
  hasCounter: boolean;
  hasRebuttal: boolean;
  hasConcessionWithoutRebuttal: boolean;
  fallacies: FallacyDetectionResult;
  dialecticalScore: number; // 0 to 100%
  estimatedBand: number; // 5.5 to 8.5
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function detectFallacies(text: string): FallacyDetectionResult {
  const detectedPhrases: string[] = [];
  const fallacyExplanationsVi: string[] = [];

  // 1. Hasty Generalization (Khái quát hóa vội vã / Tuyệt đối hóa)
  const hastyRegex =
    /\b(all|every single|always|never|completely impossible|everyone knows|nobody can deny|all people will|everyone will)\b/gi;
  const hastyMatches = text.match(hastyRegex);
  const hasHastyGeneralization = !!hastyMatches && hastyMatches.length > 0;
  if (hasHastyGeneralization) {
    detectedPhrases.push(...hastyMatches);
    fallacyExplanationsVi.push(
      "Ngụy biện Khái quát hóa vội vã (Hasty Generalization): Tránh dùng từ tuyệt đối hóa ('all', 'every single', 'always'). Hãy dùng kỹ thuật Hedging học thuật ('frequently', 'a substantial proportion', 'tends to')."
    );
  }

  // 2. Slippery Slope (Dốc trượt logic / Phóng đại hậu quả)
  const slipperyRegex =
    /\b(will inevitably lead to the destruction|will result in catastrophic collapse|will destroy the entire society|will surely ruin everything|will lead to complete chaos)\b/gi;
  const slipperyMatches = text.match(slipperyRegex);
  const hasSlipperySlope = !!slipperyMatches && slipperyMatches.length > 0;
  if (hasSlipperySlope) {
    detectedPhrases.push(...slipperyMatches);
    fallacyExplanationsVi.push(
      "Ngụy biện Dốc trượt logic (Slippery Slope): Phóng đại chuỗi hậu quả cực đoan mà không chứng minh được các mắt xích trung gian."
    );
  }

  // 3. False Dilemma (Nhị nguyên giả tạo)
  const dilemmaRegex =
    /\b(either we .+ or the .+ will die|only two choices|must choose between .+ or total failure|there is no middle ground)\b/gi;
  const dilemmaMatches = text.match(dilemmaRegex);
  const hasFalseDilemma = !!dilemmaMatches && dilemmaMatches.length > 0;
  if (hasFalseDilemma) {
    detectedPhrases.push(...dilemmaMatches);
    fallacyExplanationsVi.push(
      "Ngụy biện Nhị nguyên giả tạo (False Dilemma): Ép người đọc chỉ chọn 1 trong 2 thái cực mà bỏ qua các phương án dung hòa chính sách."
    );
  }

  return {
    hasHastyGeneralization,
    hasSlipperySlope,
    hasFalseDilemma,
    detectedPhrases: Array.from(new Set(detectedPhrases)),
    fallacyExplanationsVi,
  };
}

export function evaluateToulminIntegrity(parts: ToulminParts): ToulminEvaluationResult {
  const fullText = `${parts.claim} ${parts.data} ${parts.warrant} ${parts.backing} ${parts.counterArgument} ${parts.rebuttal}`;

  const wordCountByBlock = {
    claim: countWords(parts.claim),
    data: countWords(parts.data),
    warrant: countWords(parts.warrant),
    backing: countWords(parts.backing),
    counterArgument: countWords(parts.counterArgument),
    rebuttal: countWords(parts.rebuttal),
  };

  const totalWordCount = Object.values(wordCountByBlock).reduce((a, b) => a + b, 0);

  const hasClaim = wordCountByBlock.claim >= 10;
  const hasData = wordCountByBlock.data >= 15;
  const hasWarrant = wordCountByBlock.warrant >= 15;
  const hasBacking = wordCountByBlock.backing >= 10;
  const hasCounter = wordCountByBlock.counterArgument >= 10;
  const hasRebuttal = wordCountByBlock.rebuttal >= 15;

  // Severe Trap: Concession without Rebuttal (Self-inflicted wound)
  const hasConcessionWithoutRebuttal = hasCounter && !hasRebuttal;

  const fallacies = detectFallacies(fullText);

  // Compute Dialectical Rigor Score (0 to 100%)
  let score = 0;
  if (hasClaim) score += 15;
  if (hasData) score += 15;
  if (hasWarrant) score += 20;
  if (hasBacking) score += 15;
  if (hasCounter) score += 15;
  if (hasRebuttal) score += 20;

  // Penalties
  if (hasConcessionWithoutRebuttal) score -= 30;
  if (fallacies.hasHastyGeneralization) score -= 10;
  if (fallacies.hasSlipperySlope) score -= 15;
  if (fallacies.hasFalseDilemma) score -= 10;

  const dialecticalScore = Math.max(0, Math.min(100, score));

  // Estimate IELTS Task Response Band
  let estimatedBand = 6.0;
  if (dialecticalScore >= 90) estimatedBand = 8.5;
  else if (dialecticalScore >= 75) estimatedBand = 8.0;
  else if (dialecticalScore >= 60) estimatedBand = 7.5;
  else if (dialecticalScore >= 45) estimatedBand = 7.0;
  else if (dialecticalScore >= 30) estimatedBand = 6.5;
  else estimatedBand = 6.0;

  if (hasConcessionWithoutRebuttal) {
    estimatedBand = Math.min(6.0, estimatedBand);
  }

  return {
    totalWordCount,
    wordCountByBlock,
    hasClaim,
    hasData,
    hasWarrant,
    hasBacking,
    hasCounter,
    hasRebuttal,
    hasConcessionWithoutRebuttal,
    fallacies,
    dialecticalScore,
    estimatedBand,
  };
}
