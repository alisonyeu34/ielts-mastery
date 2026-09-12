import { ErrorItem, ErrorClassification, ErrorSourceModule } from "@/types/database";

export interface RadarAxisData {
  category: ErrorClassification;
  key: string;
  label: string;
  shortLabel: string;
  totalErrors: number;
  unmasteredCount: number;
  masteredCount: number;
  masteryPercentage: number;
  deficitSeverity: number; // 0 to 100 (100 = critical deficit, 0 = fully mastered)
  color: string;
  accentHex: string;
  icon: string;
  description: string;
}

export interface CognitiveRadarReport {
  axes: RadarAxisData[];
  dominantDeficit: RadarAxisData;
  strongestSkill: RadarAxisData;
  averageMastery: number;
}

export interface EEVMetrics {
  totalErrors: number;
  masteredCount: number;
  unmasteredCount: number;
  recent7DaysEliminated: number;
  prior7DaysEliminated: number;
  velocityScore: number; // 0 - 100
  extinctionRatePct: number; // % of total eliminated
  weeklyEliminationRate: number;
  trend: "up" | "down" | "neutral";
  trendPercentage: number;
  statusLabel: string;
  statusDescription: string;
  statusBadgeColor: string;
}

export interface ErrorModuleDistribution {
  module: ErrorSourceModule;
  label: string;
  count: number;
  unmastered: number;
  percentage: number;
}

export const ERROR_CATEGORY_DETAILS: Record<
  ErrorClassification,
  {
    label: string;
    shortLabel: string;
    color: string;
    accentHex: string;
    icon: string;
    description: string;
    targetModule: string;
  }
> = {
  grammar: {
    label: "Ngữ Pháp Học Thuật (Grammar)",
    shortLabel: "Grammar",
    color: "rose",
    accentHex: "#f43f5e",
    icon: "FileCode2",
    description: "Lỗi cấu trúc câu, liên từ kép, phân từ treo, thì trong Task 1.",
    targetModule: "/practice/sentence-clinic",
  },
  pronunciation: {
    label: "Phát Âm & Âm Vị (Pronunciation)",
    shortLabel: "Pronunciation",
    color: "purple",
    accentHex: "#a855f7",
    icon: "Volume2",
    description: "Lỗi nuốt ending sounds /s/, /z/, /t/, /d/, trọng âm từ & weak forms.",
    targetModule: "/practice/dictation",
  },
  paraphrase_trap: {
    label: "Bẫy Paraphrase Đề Thi",
    shortLabel: "Paraphrase Trap",
    color: "blue",
    accentHex: "#3b82f6",
    icon: "Crosshair",
    description: "Lỗi sập bẫy từ đồng nghĩa bóp méo nghĩa, bẫy đồng thuận Listening.",
    targetModule: "/reading",
  },
  singular_plural: {
    label: "Số Ít / Số Nhiều (-s / -es)",
    shortLabel: "Singular / Plural",
    color: "amber",
    accentHex: "#f59e0b",
    icon: "Layers",
    description: "Lỗi thiếu đuôi -s/-es, nhầm lẫn danh từ không đếm được.",
    targetModule: "/practice/dictation",
  },
  careless_reading: {
    label: "Đọc Ẩu & Bẫy Khảo Thí",
    shortLabel: "Careless / Exam Trap",
    color: "red",
    accentHex: "#ef4444",
    icon: "AlertTriangle",
    description: "Lỗi vi phạm Word Limit, thừa đơn vị $, chọn vội ý kiến ban đầu.",
    targetModule: "/reading",
  },
  vocabulary: {
    label: "Từ Vựng & Collocation (Vocab)",
    shortLabel: "Vocabulary",
    color: "emerald",
    accentHex: "#10b981",
    icon: "BookOpen",
    description: "Lỗi dùng sai ngữ cảnh học thuật AWL, nhầm lẫn cụm Collocations.",
    targetModule: "/vocab",
  },
};

export const SOURCE_MODULE_LABELS: Record<ErrorSourceModule, string> = {
  reading: "Reading Comprehension",
  listening: "Listening Audio",
  writing: "Writing Tasks (1 & 2)",
  speaking: "Speaking Fluency",
  dictation: "Dictation Studio",
  grammar: "Sentence Clinic / Theory",
  pronunciation: "IPA & Phonetics",
  vocab: "Vocab Matrix FSRS",
};

/**
 * 1. Compute 5-Axis Cognitive Deficit Radar Report
 */
export function calculateRadarMetrics(errors: ErrorItem[]): CognitiveRadarReport {
  const categories: ErrorClassification[] = [
    "grammar",
    "pronunciation",
    "paraphrase_trap",
    "singular_plural",
    "careless_reading",
  ];

  const axes: RadarAxisData[] = categories.map((cat) => {
    const meta = ERROR_CATEGORY_DETAILS[cat];
    const catErrors = errors.filter((e) => e.errorType === cat);
    const total = catErrors.length;
    const mastered = catErrors.filter((e) => e.mastered).length;
    const unmastered = total - mastered;
    const masteryPercentage = total > 0 ? Math.round((mastered / total) * 100) : 0;
    // Deficit severity: accounts for unmastered count and low mastery percentage
    const deficitSeverity = total > 0 ? Math.round(((unmastered + 1) / (total + 1)) * 100) : 0;

    return {
      category: cat,
      key: cat,
      label: meta.label,
      shortLabel: meta.shortLabel,
      totalErrors: total,
      unmasteredCount: unmastered,
      masteredCount: mastered,
      masteryPercentage,
      deficitSeverity,
      color: meta.color,
      accentHex: meta.accentHex,
      icon: meta.icon,
      description: meta.description,
    };
  });

  // Find dominant deficit (highest unmastered, then lowest mastery)
  const sortedByDeficit = [...axes].sort((a, b) => {
    if (b.unmasteredCount !== a.unmasteredCount) {
      return b.unmasteredCount - a.unmasteredCount;
    }
    return a.masteryPercentage - b.masteryPercentage;
  });

  const dominantDeficit = sortedByDeficit[0] || axes[0];

  // Strongest skill (highest mastery)
  const sortedByMastery = [...axes].sort((a, b) => b.masteryPercentage - a.masteryPercentage);
  const strongestSkill = sortedByMastery[0] || axes[0];

  const totalErrors = errors.length;
  const totalMastered = errors.filter((e) => e.mastered).length;
  const averageMastery = totalErrors > 0 ? Math.round((totalMastered / totalErrors) * 100) : 0;

  return {
    axes,
    dominantDeficit,
    strongestSkill,
    averageMastery,
  };
}

/**
 * 2. Calculate Error Extinction Velocity (EEV) Metrics
 */
export function calculateEEV(errors: ErrorItem[]): EEVMetrics {
  const totalErrors = errors.length;
  const masteredItems = errors.filter((e) => e.mastered);
  const masteredCount = masteredItems.length;
  const unmasteredCount = totalErrors - masteredCount;

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 86400000;
  const fourteenDaysAgo = now - 14 * 86400000;

  // Mastered in the last 7 days
  const recent7DaysEliminated = masteredItems.filter((e) => {
    const time = e.lastAttemptAt ? new Date(e.lastAttemptAt).getTime() : new Date(e.createdAt).getTime();
    return time >= sevenDaysAgo;
  }).length;

  // Mastered in prior 7 days window (14 to 7 days ago)
  const prior7DaysEliminated = masteredItems.filter((e) => {
    const time = e.lastAttemptAt ? new Date(e.lastAttemptAt).getTime() : new Date(e.createdAt).getTime();
    return time >= fourteenDaysAgo && time < sevenDaysAgo;
  }).length;

  const extinctionRatePct = totalErrors > 0 ? Math.round((masteredCount / totalErrors) * 100) : 0;

  // Velocity score (weighted combo of total rate and recent activity)
  const velocityScore = totalErrors > 0
    ? Math.min(100, Math.round(extinctionRatePct * 0.6 + Math.min(recent7DaysEliminated * 10, 40)))
    : 0;

  const weeklyEliminationRate = recent7DaysEliminated;

  let trend: "up" | "down" | "neutral" = "neutral";
  let trendPercentage = 0;
  if (prior7DaysEliminated > 0) {
    const diff = recent7DaysEliminated - prior7DaysEliminated;
    trendPercentage = Math.round((Math.abs(diff) / prior7DaysEliminated) * 100);
    trend = diff > 0 ? "up" : diff < 0 ? "down" : "neutral";
  } else if (recent7DaysEliminated > 0) {
    trend = "up";
    trendPercentage = 100;
  }

  let statusLabel = "Chưa Có Lỗi Sai";
  let statusDescription = "Sổ tay lỗi sai sạch tinh. Khi làm bài luyện tập, hệ thống sẽ tự động ghi nhận câu sai vào đây.";
  let statusBadgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";

  if (totalErrors === 0) {
    statusLabel = "Chưa Có Lỗi Sai";
    statusDescription = "Sổ tay lỗi sai sạch tinh. Khi làm bài luyện tập, hệ thống sẽ tự động ghi nhận câu sai vào đây.";
    statusBadgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  } else if (velocityScore >= 80) {
    statusLabel = "Thần tốc / Tối ưu";
    statusDescription = "Khả năng khắc phục lỗi sai phản xạ tức thì, tiệm cận chuẩn Band 7.5+.";
    statusBadgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  } else if (velocityScore >= 55) {
    statusLabel = "Đang bứt phá";
    statusDescription = "Tiến độ cải thiện tích cực, duy trì thêm 2-3 buổi luyện để về đích.";
    statusBadgeColor = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  } else {
    statusLabel = "Cần luyện tập";
    statusDescription = "Còn nhiều bẫy lỗi chưa được thực hành lặp lại 2 lần liên tiếp.";
    statusBadgeColor = "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
  }

  return {
    totalErrors,
    masteredCount,
    unmasteredCount,
    recent7DaysEliminated,
    prior7DaysEliminated,
    velocityScore,
    extinctionRatePct,
    weeklyEliminationRate,
    trend,
    trendPercentage,
    statusLabel,
    statusDescription,
    statusBadgeColor,
  };
}

/**
 * 3. Calculate Distribution across Source Modules
 */
export function calculateModuleDistribution(errors: ErrorItem[]): ErrorModuleDistribution[] {
  const modules: ErrorSourceModule[] = [
    "reading",
    "listening",
    "writing",
    "speaking",
    "dictation",
    "grammar",
    "pronunciation",
    "vocab",
  ];

  const total = errors.length || 1;

  return modules
    .map((mod) => {
      const modErrors = errors.filter((e) => e.sourceModule === mod);
      const count = modErrors.length;
      const unmastered = modErrors.filter((e) => !e.mastered).length;
      const percentage = Math.round((count / total) * 100);

      return {
        module: mod,
        label: SOURCE_MODULE_LABELS[mod] || mod,
        count,
        unmastered,
        percentage,
      };
    })
    .filter((d) => d.count > 0)
    .sort((a, b) => b.unmastered - a.unmastered);
}
