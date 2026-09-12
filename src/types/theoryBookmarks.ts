export type TargetSkill = "reading" | "listening" | "writing" | "speaking" | "grammar";

export type SkillBandTarget =
  | "8.5 Read"
  | "8.0 Lis"
  | "6.5 Wri"
  | "6.0 Speak"
  | "7.5 (Cú pháp 6.5+)"
  | "7.5+"
  | "8.0+"
  | "7.0+"
  | "8.5+"
  | "6.5+"
  | "6.0+";

export interface VocabBreakdownWord {
  word: string;
  ipa?: string;
  type: string; // e.g. "adj", "n", "v", "adv", "phrase", "collocation"
  meaningVi: string;
  isRecommended?: boolean; // True if recommended for target band profile
  bandTarget?: SkillBandTarget | string;
  recommendationReasonVi?: string;
  skill?: TargetSkill;
}

export type TheoryBookmarkCategory =
  | "trap"
  | "rule"
  | "model"
  | "tip"
  | "concept"
  | "audio_snippet";

export interface TheoryBookmarkItem {
  id: string; // Unique ID (e.g. "bm_reading-foundation-skimming-scanning_trap_0")
  lessonId: string;
  lessonTitle: string;
  skill: "reading" | "listening" | "writing" | "speaking" | "grammar";
  category: TheoryBookmarkCategory;
  categoryLabelVi: string; // "Bẫy Khảo Thí", "Quy Tắc Vàng", "Mổ Xẻ Đoạn Văn Mẫu", etc.
  title: string;
  content: string; // The core concept or strategy text
  excerptText?: string; // English quote or dialogue
  translationVi?: string; // Natural Vietnamese translation
  wordBreakdown?: VocabBreakdownWord[];
  lessonHref: string; // Link to the lesson
  savedAt: string; // ISO date string
}
