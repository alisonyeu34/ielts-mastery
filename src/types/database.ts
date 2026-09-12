/**
 * Database Schema and Data Models for IELTS Mastery (Band 4.5 -> 7.5 in 165 Days)
 * Persistence Layer powered by Dexie.js (IndexedDB)
 */

export type PhaseNumber = 1 | 2 | 3;

export type SkillType =
  | "grammar"
  | "pronunciation"
  | "reading"
  | "listening"
  | "writing_task1"
  | "writing_task2"
  | "speaking";

export type VocabCategory =
  | "core_3000"
  | "awl_570"
  | "3000_core"
  | "570_awl"
  | "c1_academic"
  | "topic_specific"
  | "custom";

export type VocabStatus = "new" | "learning" | "review" | "mastered";

export type ErrorSourceModule =
  | "dictation"
  | "reading"
  | "listening"
  | "writing"
  | "speaking"
  | "pronunciation"
  | "grammar"
  | "vocab";

export type ErrorClassification =
  | "grammar"
  | "pronunciation"
  | "paraphrase_trap"
  | "singular_plural"
  | "careless_reading"
  | "vocabulary";

export type PracticeType =
  | "dictation"
  | "split_reading"
  | "reading_splitview"
  | "split_listening"
  | "listening_splitview"
  | "reading"
  | "reading_passage3"
  | "reading_passage3_abstract"
  | "listening"
  | "listening_map"
  | "listening_map_drill"
  | "listening_s3"
  | "listening_s3_consensus"
  | "listening_s4"
  | "listening_s4_lecture"
  | "pronunciation"
  | "ipa_studio"
  | "shadowing"
  | "grammar"
  | "sentence_clinic"
  | "sentence_writing"
  | "sentence_drill"
  | "syntax_transform"
  | "advanced_syntax"
  | "advanced_syntax_drill"
  | "paraphrase"
  | "writing"
  | "writing_task1"
  | "task1_drill"
  | "task1_process_map"
  | "task1_process_map_drill"
  | "writing_task1_pm"
  | "writing_task2"
  | "task2_peel"
  | "task2_peel_drill"
  | "writing_toulmin"
  | "task2_toulmin"
  | "task2_toulmin_drill"
  | "writing_grader"
  | "speaking"
  | "speaking_p1_p2"
  | "speaking_p1_p2_framework"
  | "speaking_p3"
  | "speaking_p3_lenses"
  | "speaking_grader"
  | "speed_reading"
  | "reading_speed_drill"
  | "multi_accent"
  | "listening_accent_drill"
  | "writing_cohesion"
  | "writing_cohesion_drill"
  | "speaking_fluency"
  | "speaking_fluency_drill"
  | "socratic_debate"
  | "socratic_debate_drill"
  | "cognitive_reading"
  | "cognitive_reading_drill"
  | "mixed_charts"
  | "task1_mixed_chart_drill"
  | "academic_shorthand"
  | "listening_shorthand_drill"
  | "philosophical_ethics"
  | "philosophical_ethics_drill"
  | "implicit_pragmatics"
  | "pragmatics_subtext_drill"
  | "syntactic_engineering"
  | "syntactic_engineering_drill"
  | "pitch_contour"
  | "pitch_contour_drill"
  | "academic_hedging"
  | "academic_hedging_drill"
  | "listening_consensus"
  | "listening_consensus_drill"
  | "syntactic_parsing"
  | "syntactic_parsing_drill"
  | "lexical_spectrum"
  | "lexical_connotation_drill"
  | "toulmin_argument"
  | "toulmin_argument_drill"
  | "high_rate_lecture"
  | "high_rate_lecture_drill"
  | "memory_palace_speaking"
  | "memory_palace_speaking_drill"
  | "passage3_epistemic"
  | "passage3_epistemic_drill"
  | "map_process"
  | "map_process_task1_drill"
  | "societal_prisms"
  | "societal_prisms_speaking_drill"
  | "prompt_deconstruction"
  | "prompt_deconstruction_drill"
  | "adversarial_speaking"
  | "adversarial_speaking_drill"
  | "reverse_engineering"
  | "reverse_engineering_drill"
  | "distractor_engineering_drill"
  | "cognitive_stamina"
  | "cognitive_stamina_drill"
  | "cognitive_stamina_full_run"
  | "irt_calibration"
  | "irt_calibration_drill"
  | "acoustic_chaos"
  | "acoustic_chaos_drill"
  | "readiness_audit"
  | "exam_day_protocol"
  | "mock_test";

export type AISkillType =
  | "writing_task1"
  | "writing_task2"
  | "speaking_part1"
  | "speaking_part2"
  | "speaking_part3"
  | "speaking_part2_3";

// 1. User Progress & Roadmap Tracker (165-Day Adaptive Journey)
export interface UserProgress {
  id: string; // Typically "main_user"
  currentPhase: PhaseNumber; // 1: 4.5-5.5 | 2: 5.5-6.5 | 3: 6.5-7.5+
  streakDays: number;
  lastActiveDate: string; // ISO date string (YYYY-MM-DD)
  targetBand: number; // Default 7.5
  phase1Unlocked: boolean;
  phase2Unlocked: boolean;
  phase3Unlocked: boolean;
  completedLessonIds: string[];
  totalStudyMinutes?: number;
  currentDay?: number; // 1 -> 165
  completedDayNodes?: number[]; // Array of completed day numbers
  dailyChecklistStatus?: Record<
    number,
    {
      theoryCompleted: boolean;
      drillCompleted: boolean;
      vocabReviewed: boolean;
      errorBankCleared: boolean;
    }
  >;
  createdAt: string;
  updatedAt: string;
}

// 2. Theory Lessons & Interactive Trap Quizzes
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TheoryLesson {
  id: string;
  phase: PhaseNumber;
  skill: SkillType;
  title: string;
  conceptMarkdown: string; // Bản chất kiến thức cốt lõi
  trapAnalysis: string; // Vạch trần bẫy đề thi
  band8Sample: string; // Phân tích bài mẫu Band 8.0+
  quiz: QuizQuestion[];
  isCompleted: boolean;
  orderIndex: number;
  estimatedMinutes: number;
}

// 3. Vocab Matrix (Spaced Repetition / FSRS Memory Algorithm)
export interface VocabCard {
  id: string;
  word: string;
  ipa: string;
  meaning: string;
  definitionEn?: string;
  collocations: string[];
  originalContext: string; // Ngữ cảnh thực tế trong bài đọc/nghe
  category: VocabCategory;
  status: VocabStatus;
  stepInterval: number; // 1, 3, 7, 14, 30 ngày
  nextReviewDate: string; // ISO date string (YYYY-MM-DD)
  repetitionCount: number;
  lapsesCount: number;
  stability?: number; // FSRS parameter S
  difficulty?: number; // FSRS parameter D (1-10)
  bandLevel?: string;
  sourceModule?: string;
  wordFamily?: Array<{ pos: string; word: string }>;
  lastReviewedAt?: string;
  createdAt: string;
}

// 4. Automated Error Bank (Targeted Weakness Remediation with FSRS Spaced Repetition)
export interface ErrorItem {
  id: string;
  sourceModule: ErrorSourceModule;
  errorType: ErrorClassification;
  questionContext: string;
  userWrongAnswer: string;
  correctAnswer: string;
  deepExplanation: string; // Phân tích nguyên nhân vì sao sai
  mastered: boolean; // Đã khắc phục triệt để sau cả 3 chu kỳ FSRS hay chưa
  retryCount: number;
  consecutiveSuccesses?: number;
  fsrsStage?: number; // 0: new, 1: 3 ngày, 2: 7 ngày, 3: 21 ngày, 4: mastered
  nextReviewDate?: string; // YYYY-MM-DD
  intervalDays?: number; // 3, 7, 21
  lastAttemptAt?: string;
  createdAt: string;
  updatedAt?: string;
}

// 5. Practice & Dictation Logs (Split-view & Micro-practice)
export interface PracticeLog {
  id: string;
  type: PracticeType;
  materialId?: string;
  title?: string;
  score: number;
  totalQuestions?: number;
  timeSpentSeconds?: number;
  durationSeconds?: number;
  accuracyPercentage?: number;
  phase?: number;
  details?: Record<string, unknown>;
  createdAt: string;
  completedAt?: string;
}

// 6. AI Submissions (Writing & Speaking Grader Logs)
export interface AIScores {
  tr: number; // Task Response / Task Achievement
  cc: number; // Cohesion & Coherence / Fluency & Coherence
  lr: number; // Lexical Resource
  gra: number; // Grammatical Range & Accuracy
  overall: number; // Overall IELTS Band
}

export interface DetailedGrammarError {
  original: string;
  corrected: string;
  rule: string;
}

export interface DetailedC1Upgrade {
  original: string;
  upgraded: string;
  explanation: string;
}

export interface AIDetailedFeedback {
  grammarErrors: DetailedGrammarError[];
  c1Upgrades: DetailedC1Upgrade[];
  generalComment: string;
}

export interface AISubmission {
  id: string;
  skill: AISkillType;
  promptQuestion: string;
  userContent: string; // Văn bản bài viết hoặc Transcript / Audio reference
  wordCount: number;
  scores: AIScores;
  detailedFeedback: AIDetailedFeedback;
  createdAt: string;
}

// Statistics Aggregates
export interface ErrorBankStats {
  totalErrors: number;
  unresolvedCount: number;
  masteredCount: number;
  byType: Record<ErrorClassification, number>;
  byModule: Record<ErrorSourceModule, number>;
}

export interface ReadinessCertificateRecord {
  id: string;
  studentName: string;
  issuedAt: string;
  criScore: number;
  predictedOverallBand: number;
  vectorBreakdown: {
    theoryMastery: number;
    fsrsStability: number;
    errorExtinction: number;
    mockConvergence: number;
    staminaScore: number;
  };
  verificationHash: string;
  vaultSignature: string;
}

