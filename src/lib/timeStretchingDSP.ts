/**
 * Acoustic Time-Stretching & High-Rate Speech Signal Processing Utility (Step 88)
 * Overload Principle DSP: Preserving Pitch while Accelerating Speech Rate (1.0x -> 1.35x)
 */

export type PlaybackRateTier = 1.0 | 1.15 | 1.25 | 1.35;

export interface PlaybackRateConfig {
  rate: PlaybackRateTier;
  wpm: number;
  label: string;
  badgeColor: string;
  pedagogicalEffect: string;
}

export const PLAYBACK_RATE_TIERS: Record<PlaybackRateTier, PlaybackRateConfig> = {
  1.0: {
    rate: 1.0,
    wpm: 160,
    label: "1.0x (Chuẩn Khảo Thí Cambridge)",
    badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
    pedagogicalEffect: "Tốc độ đọc tự nhiên của giảng viên bản xứ trong kỳ thi IELTS thật."
  },
  1.15: {
    rate: 1.15,
    wpm: 184,
    label: "1.15x (Thử Thách Thính Giác)",
    badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-500/50",
    pedagogicalEffect: "Tăng áp lực nhận thức nhẹ, bắt đầu làm nổi bật các hiện tượng nuốt âm (Elision)."
  },
  1.25: {
    rate: 1.25,
    wpm: 200,
    label: "1.25x (Quá Tải Nhận Thức C1/C2)",
    badgeColor: "bg-amber-950 text-amber-300 border-amber-500/50",
    pedagogicalEffect: "Huấn luyện não bộ xử lý thông tin dày đặc mà không bị đơ phản xạ."
  },
  1.35: {
    rate: 1.35,
    wpm: 216,
    label: "1.35x (Đột Phá Phản Xạ Đỉnh Cao)",
    badgeColor: "bg-rose-950 text-rose-300 border-rose-500/50",
    pedagogicalEffect: "Khi hoàn thành ở 1.35x, quay về thi 1.0x sẽ thấy bài thi chậm và rõ ràng gấp đôi."
  }
};

export type SignpostCategory =
  | "transition"  // Chuyển ý sang luận điểm mới
  | "refutation"  // Phản biện / Giới hạn lý thuyết
  | "definition"  // Định nghĩa / Giải thích thuật ngữ
  | "emphasis";   // Nhấn mạnh kết quả cốt lõi

export interface SignpostMarker {
  id: string;
  timestampSec: number;
  category: SignpostCategory;
  cuePhrase: string;
  purposeSummary: string;
  approachingQuestionNumber?: number;
  acousticPhenomenon: string; // e.g. "Flapped T + Vowel Reduction"
}

export interface LectureQuestionItem {
  id: string;
  questionNumber: number;
  timestampSec: number;
  sentenceContext: string;
  blankPrefix: string;
  targetWord: string;
  blankSuffix: string;
  grammarConstraint: "singular_noun" | "plural_noun" | "adjective" | "number_statistic" | "verb_gerund";
  signpostCue: string;
  acousticTrapExplanation: string;
}

export interface LectureScenario {
  id: string;
  title: string;
  academicDiscipline: "Anthropology & Human Origins" | "Marine Ecology & Microplastics" | "Architecture & Bio-mimicry" | "Computational Linguistics";
  professorName: string;
  speakerAccent: "British RP Academic" | "Australian Maritime" | "Scottish Earth Science";
  durationSec: number;
  wordCount: number;
  outlineSections: {
    title: string;
    subpoints: string[];
  }[];
  signpostMarkers: SignpostMarker[];
  questions: LectureQuestionItem[];
}
