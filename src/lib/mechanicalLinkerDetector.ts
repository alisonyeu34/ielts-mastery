/**
 * Mechanical Linker Detector & Natural Cohesion Stripper
 * Detects Band 6.0 mechanical linkers and proposes Band 8.0+ seamless replacements
 */

export interface CohesionRewriteOption {
  strategyType: "participial_flow" | "summary_nominalization" | "mid_sentence_push" | "lexical_chaining";
  strategyLabelVi: string;
  rewrittenSentence: string;
  cohesiveDeviceExplanation: string;
  nominalizationVocabPayload?: {
    word: string;
    ipa: string;
    meaning: string;
    collocations: string[];
    originalContext: string;
  };
}

export interface DetectedMechanicalLinker {
  id: string;
  originalSentence: string;
  linkerFound: string;
  charIndex: number;
  rewriteOptions: CohesionRewriteOption[];
}

export const MECHANICAL_LINKER_MAP: Record<
  string,
  {
    category: "addition" | "contrast" | "sequence" | "conclusion";
    c1Nominalizations: string[];
    participialPhrases: string[];
    midSentenceAdverbs: string[];
  }
> = {
  furthermore: {
    category: "addition",
    c1Nominalizations: ["This multifaceted strategy", "Such supplementary initiatives", "This comprehensive approach"],
    participialPhrases: ["..., thereby further compounding the issue", "..., while simultaneously fostering innovation"],
    midSentenceAdverbs: [", moreover,", ", in turn,", ", additionally,"],
  },
  moreover: {
    category: "addition",
    c1Nominalizations: ["These compounding factors", "This synergistic outcome", "Such widespread repercussions"],
    participialPhrases: ["..., thereby extending the scope of...", "..., reinforcing the hypothesis that..."],
    midSentenceAdverbs: [", furthermore,", ", similarly,", ", likewise,"],
  },
  "in addition": {
    category: "addition",
    c1Nominalizations: ["This ancillary benefit", "These concurrent developments", "Such supplementary measures"],
    participialPhrases: ["..., which concurrently precipitates...", "..., augmenting the overall efficacy of..."],
    midSentenceAdverbs: [", additionally,", ", likewise,", ", as well,"],
  },
  firstly: {
    category: "sequence",
    c1Nominalizations: ["The foremost rationale for this", "The primary catalyst behind", "Chief among these factors is"],
    participialPhrases: ["Beginning with the economic dimensions, ..."],
    midSentenceAdverbs: ["primarily", "principally", "predominantly"],
  },
  secondly: {
    category: "sequence",
    c1Nominalizations: ["A secondary consideration pertains to", "Closely linked to this is", "Another salient aspect involves"],
    participialPhrases: ["Extending beyond this primary facet, ..."],
    midSentenceAdverbs: ["subsequently", "secondarily", "in tandem"],
  },
  "on the other hand": {
    category: "contrast",
    c1Nominalizations: ["A diametrically opposed perspective argues that", "Critics, conversely, emphasize", "This rationale, however, overlooks"],
    participialPhrases: ["..., contrasting sharply with previous assumptions"],
    midSentenceAdverbs: [", conversely,", ", however,", ", nonetheless,"],
  },
  "in conclusion": {
    category: "conclusion",
    c1Nominalizations: ["In the final analysis,", "Synthesizing these disparate perspectives,", "Ultimately, weighing both arguments,"],
    participialPhrases: ["Taking all aforementioned factors into consideration, ..."],
    midSentenceAdverbs: ["ultimately", "in retrospect", "on balance"],
  },
  besides: {
    category: "addition",
    c1Nominalizations: ["Beyond these immediate repercussions,", "Apart from the evident fiscal burden,"],
    participialPhrases: ["..., leaving aside peripheral concerns, ..."],
    midSentenceAdverbs: [", furthermore,", ", in addition,"],
  },
};

/**
 * Scans a sentence for mechanical linkers and generates 3 C1/C2 rewrites
 */
export function detectAndRewriteMechanicalLinker(
  sentenceText: string,
  contextPrev?: string
): DetectedMechanicalLinker | null {
  const trimmed = sentenceText.trim();
  const match = trimmed.match(
    /^(firstly|secondly|thirdly|furthermore|moreover|in addition|besides|on the other hand|in conclusion|to sum up|lastly|first of all)\b[,:\s]*/i
  );

  if (!match) return null;

  const linker = match[1].toLowerCase();
  const remainder = trimmed.substring(match[0].length).trim();
  const capitalizedRemainder = remainder.charAt(0).toUpperCase() + remainder.slice(1);

  const rule = MECHANICAL_LINKER_MAP[linker] || MECHANICAL_LINKER_MAP["furthermore"];

  const options: CohesionRewriteOption[] = [];

  // Strategy 1: Summary Nominalization (C1 Deictic Anaphoric Group)
  const nominalPhrase = rule.c1Nominalizations[0] || "This phenomenon";
  options.push({
    strategyType: "summary_nominalization",
    strategyLabelVi: "Chiến thuật 1: Cụm Danh Từ Tóm Lược (Summary Nominalization)",
    rewrittenSentence: `${nominalPhrase} ${remainder.charAt(0).toLowerCase() + remainder.slice(1)}`,
    cohesiveDeviceExplanation: `Thay vì dùng liên từ rời rạc '${linker}', ta tóm tắt nội dung câu trước thành cụm danh từ trừu tượng '${nominalPhrase}', tạo sợi dây liên kết vô hình.`,
    nominalizationVocabPayload: {
      word: nominalPhrase.split(" ").slice(-1)[0] || "Catalyst",
      ipa: "/ˈkæt.əl.ɪst/",
      meaning: "Tác nhân thúc đẩy hoặc hiện tượng học thuật đóng vai trò chủ đạo.",
      collocations: ["serve as a catalyst", "primary catalyst", "catalyst for change"],
      originalContext: `${nominalPhrase} ${remainder}`,
    },
  });

  // Strategy 2: Participial Flow (Phân từ bổ nghĩa nối dòng)
  const participial = rule.participialPhrases[0] || "..., thereby reinforcing the argument";
  options.push({
    strategyType: "participial_flow",
    strategyLabelVi: "Chiến thuật 2: Phân Từ Hiện Tại Nối Dòng (Participial Flow)",
    rewrittenSentence: `${capitalizedRemainder} ${participial}`,
    cohesiveDeviceExplanation: `Chuyển hóa liên từ thô thành mệnh đề phân từ hiện tại (V-ing) ở cuối câu để tạo nhịp điệu học thuật tự nhiên.`,
  });

  // Strategy 3: Mid-sentence push (Đẩy liên từ vào giữa câu sau chủ ngữ)
  const midAdv = rule.midSentenceAdverbs[0] || ", however,";
  const words = capitalizedRemainder.split(" ");
  let midRewritten = `${capitalizedRemainder}`;
  if (words.length >= 3) {
    const subject = words.slice(0, 2).join(" ");
    const predicate = words.slice(2).join(" ");
    midRewritten = `${subject}${midAdv} ${predicate}`;
  }
  options.push({
    strategyType: "mid_sentence_push",
    strategyLabelVi: "Chiến thuật 3: Đẩy Trạng Từ Vào Giữa Câu (Mid-Sentence Inversion)",
    rewrittenSentence: midRewritten,
    cohesiveDeviceExplanation: `Đưa trạng từ liên kết vào vị trí xen giữa chủ ngữ và động từ chính, giảm tính lộ liễu của liên từ đầu câu.`,
  });

  return {
    id: `mech_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    originalSentence: trimmed,
    linkerFound: match[1],
    charIndex: match.index || 0,
    rewriteOptions: options,
  };
}
