/**
 * Lexical Connotation Spectrum & Anti-Thesaurus Trap Engine (Step 86)
 * Semantic Nuance Calibration, Academic Register Verification, and Collocational Affinity Scoring
 */

export type ConnotationLevel =
  | "severe_pejorative"  // -2 (Đặc biệt tiêu cực, chỉ trích gay gắt)
  | "mild_pejorative"    // -1 (Có xu hướng tiêu cực hoặc hạ thấp)
  | "neutral_academic"   //  0 (Khách quan khoa học, trung lập)
  | "mild_favorable"     // +1 (Tích cực vừa phải, thiện chí)
  | "high_laudatory";    // +2 (Tán dương, ca ngợi sâu sắc)

export interface LexicalWordNuance {
  word: string;
  ipa: string;
  partOfSpeech: "verb" | "noun" | "adjective" | "adverb";
  connotationScore: -2 | -1 | 0 | 1 | 2;
  connotationLevel: ConnotationLevel;
  connotationLabel: string;
  registerScore: number; // 0 (Street Slang) -> 100 (C2 Academic Monograph)
  registerCategory: "Colloquial / Informal" | "Neutral Everyday" | "Formal Academic" | "High Academic C2";
  bandLevel: number; // 6.0 - 9.0
  nuanceExplanation: string;
  vietnameseMeaning: string;
  thesaurusMisuseTrap: string;
  collocationalPartners: string[];
  modelAcademicSentence: string;
}

export interface LexicalConceptCluster {
  id: string;
  conceptName: string;
  academicDomain: "Sociology & Demographics" | "Environmental Science" | "Economics & Labor Markets" | "Technology & AI Ethics" | "Psychology & Cognitive Science";
  coreDescription: string;
  wordsSpectrum: LexicalWordNuance[];
  thesaurusPitfalls: {
    misusedWord: string;
    intendedMeaning: string;
    examinerCritique: string;
    correctAlternative: string;
  }[];
}

export interface CollocationMatchItem {
  id: string;
  targetNounOrKeyword: string;
  domain: string;
  options: {
    verbOrModifier: string;
    affinityScore: number; // 0 - 100
    isNativeIdeal: boolean;
    isLiteralTranslationTrap: boolean;
    collocationPhrase: string;
    examinerRating: string;
    feedback: string;
  }[];
  correctIndex: number;
  cambridgeAcademicContext: string;
}

/**
 * Returns color tokens for connotation spectrum visualization
 */
export function getConnotationColor(score: -2 | -1 | 0 | 1 | 2): {
  bg: string;
  border: string;
  text: string;
  badgeBg: string;
  dotColor: string;
} {
  switch (score) {
    case -2:
      return {
        bg: "bg-rose-950/50",
        border: "border-rose-600/60",
        text: "text-rose-400",
        badgeBg: "bg-rose-900/60 text-rose-200 border-rose-500/50",
        dotColor: "#f43f5e"
      };
    case -1:
      return {
        bg: "bg-amber-950/40",
        border: "border-amber-600/50",
        text: "text-amber-400",
        badgeBg: "bg-amber-900/60 text-amber-200 border-amber-500/50",
        dotColor: "#fbbf24"
      };
    case 0:
      return {
        bg: "bg-slate-900/80",
        border: "border-cyan-500/50",
        text: "text-cyan-400",
        badgeBg: "bg-cyan-950/80 text-cyan-200 border-cyan-500/50",
        dotColor: "#06b6d4"
      };
    case 1:
      return {
        bg: "bg-emerald-950/40",
        border: "border-emerald-600/50",
        text: "text-emerald-400",
        badgeBg: "bg-emerald-900/60 text-emerald-200 border-emerald-500/50",
        dotColor: "#10b981"
      };
    case 2:
    default:
      return {
        bg: "bg-indigo-950/50",
        border: "border-indigo-600/60",
        text: "text-indigo-400",
        badgeBg: "bg-indigo-900/60 text-indigo-200 border-indigo-500/50",
        dotColor: "#6366f1"
      };
  }
}

/**
 * Evaluates user input for Thesaurus Syndrome pitfalls
 */
export function auditThesaurusPitfalls(
  text: string,
  pitfalls: LexicalConceptCluster["thesaurusPitfalls"]
): {
  detectedPitfalls: LexicalConceptCluster["thesaurusPitfalls"];
  lexicalAccuracyScore: number;
} {
  const detected: LexicalConceptCluster["thesaurusPitfalls"] = [];

  pitfalls.forEach((pitfall) => {
    const regex = new RegExp(`\\b${pitfall.misusedWord}\\b`, "i");
    if (regex.test(text)) {
      detected.push(pitfall);
    }
  });

  const accuracy = Math.max(0, 100 - detected.length * 30);

  return {
    detectedPitfalls: detected,
    lexicalAccuracyScore: accuracy
  };
}
