import { ErrorItem, ErrorClassification, ErrorSourceModule } from "@/types/database";

export interface ErrorStatsSummary {
  total: number;
  mastered: number;
  unmastered: number;
  ratePercentage: number;
}

export interface CategoryGroupInfo {
  count: number;
  unmastered: number;
  label: string;
  badgeColor: string;
  description: string;
}

export const ERROR_CATEGORY_METADATA: Record<
  ErrorClassification,
  { label: string; badgeColor: string; description: string }
> = {
  grammar: {
    label: "Ngữ Pháp (Grammar)",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    description: "Lỗi chia thì, câu què (Fragment), hòa hợp S-V, mệnh đề phân từ treo.",
  },
  pronunciation: {
    label: "Phát Âm (Pronunciation)",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    description: "Lỗi nuốt ending sounds, sai trọng âm, nhầm lẫn âm schwa / weak forms.",
  },
  paraphrase_trap: {
    label: "Bẫy Paraphrase",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    description: "Lỗi sập bẫy từ đồng nghĩa bóp méo ngữ nghĩa trong Reading/Listening.",
  },
  singular_plural: {
    label: "Số Ít / Số Nhiều (-s/-es)",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    description: "Lỗi quên thêm đuôi -s/-es, nhầm lẫn danh từ đếm được vs không đếm được.",
  },
  careless_reading: {
    label: "Đọc Ẩu / Bất Cẩn",
    badgeColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    description: "Lỗi chọn vội phương án đầu tiên, không đọc kỹ Word Limit hoặc phủ định ngầm.",
  },
  vocabulary: {
    label: "Từ Vựng (Vocabulary)",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    description: "Lỗi hiểu sai nghĩa từ học thuật, nhầm lẫn Collocations hoặc từ hay quên FSRS.",
  },
};

/**
 * Calculate overall mastery statistics from an array of error items
 */
export function calculateMasteryRate(errors: ErrorItem[]): ErrorStatsSummary {
  const total = errors.length;
  const mastered = errors.filter((e) => e.mastered).length;
  const unmastered = total - mastered;
  const ratePercentage = total > 0 ? Math.round((mastered / total) * 100) : 100;

  return {
    total,
    mastered,
    unmastered,
    ratePercentage,
  };
}

/**
 * Group errors by the 5 official Cambridge taxonomy classifications
 */
export function groupErrorsByType(
  errors: ErrorItem[]
): Record<ErrorClassification, CategoryGroupInfo> {
  const groups: Record<ErrorClassification, CategoryGroupInfo> = {
    grammar: { count: 0, unmastered: 0, ...ERROR_CATEGORY_METADATA.grammar },
    pronunciation: { count: 0, unmastered: 0, ...ERROR_CATEGORY_METADATA.pronunciation },
    paraphrase_trap: { count: 0, unmastered: 0, ...ERROR_CATEGORY_METADATA.paraphrase_trap },
    singular_plural: { count: 0, unmastered: 0, ...ERROR_CATEGORY_METADATA.singular_plural },
    careless_reading: { count: 0, unmastered: 0, ...ERROR_CATEGORY_METADATA.careless_reading },
    vocabulary: { count: 0, unmastered: 0, ...ERROR_CATEGORY_METADATA.vocabulary },
  };

  errors.forEach((err) => {
    if (groups[err.errorType]) {
      groups[err.errorType].count++;
      if (!err.mastered) {
        groups[err.errorType].unmastered++;
      }
    }
  });

  return groups;
}

/**
 * Group errors by their origin source module
 */
export function groupErrorsByModule(
  errors: ErrorItem[]
): Record<ErrorSourceModule, number> {
  const moduleCounts: Record<ErrorSourceModule, number> = {
    dictation: 0,
    reading: 0,
    listening: 0,
    writing: 0,
    speaking: 0,
    pronunciation: 0,
    grammar: 0,
    vocab: 0,
  };

  errors.forEach((e) => {
    if (moduleCounts[e.sourceModule] !== undefined) {
      moduleCounts[e.sourceModule]++;
    }
  });

  return moduleCounts;
}

/**
 * Select a prioritized drill queue of unmastered items (sorted by retryCount desc and recency)
 */
export function selectDrillQueue(
  errors: ErrorItem[],
  maxItems = 10,
  categoryFilter: ErrorClassification | "all" = "all"
): ErrorItem[] {
  let filtered = errors;
  if (categoryFilter !== "all") {
    filtered = filtered.filter((e) => e.errorType === categoryFilter);
  }

  // Prioritize unmastered first
  return [...filtered]
    .sort((a, b) => {
      if (a.mastered !== b.mastered) {
        return a.mastered ? 1 : -1; // unmastered comes first
      }
      if (b.retryCount !== a.retryCount) {
        return b.retryCount - a.retryCount; // higher retries first
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, maxItems);
}
