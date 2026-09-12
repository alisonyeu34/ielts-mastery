"use client";

import { db } from "@/lib/db";
import { RoadmapTask, RoadmapDayNode } from "@/data/mockRoadmapTimeline";
import { THEORY_LESSON_BOXES_DATA } from "./theoryLessonBoxesData";

export interface TaskScanResult {
  taskId: string;
  isComplete: boolean;
  theory: {
    url?: string;
    scorePercent: number;
    isPassed: boolean;
    boxesFound: number;
    boxesCompleted: number;
    details: string;
  };
  practice: {
    url?: string;
    isDone: boolean;
    logsCount: number;
    details: string;
  };
  summaryReasonVi: string;
}

/**
 * Mapping legacy aliases to modern lesson identifiers
 */
const THEME_ALIAS_MAP: Record<string, string> = {
  "present-simple-foundation": "day1-present-simple-to-be",
  "past-simple-foundation": "day5-past-simple-verbs",
  "present-perfect-foundation": "day6-present-perfect",
  "passive-voice-foundation": "day8-passive-voice",
  "comparisons-foundation": "day9-comparatives",
  "relative-clauses-basic": "day11-relative-clauses-who-which",
  "conditionals-type1-2": "day13-first-conditional",
  "modals-and-hedging": "academic-impersonal-passive",
};

/**
 * Extract normalized lesson identifier from theoryUrl
 * e.g. "/theory/reading-methods/reading-foundation-skimming-scanning" -> "reading-foundation-skimming-scanning"
 * e.g. "/theory/present-simple-foundation" -> "day1-present-simple-to-be" or "present-simple-foundation"
 */
export function extractTheoryLessonId(theoryUrl?: string): string {
  if (!theoryUrl) return "";
  const parts = theoryUrl.split("/").filter(Boolean);
  const lastPart = parts[parts.length - 1] || "";
  return THEME_ALIAS_MAP[lastPart] || lastPart;
}

/**
 * Extract normalized practice identifier from practiceUrl or linkUrl
 * e.g. "/practice/reading-split" -> "reading-split"
 */
export function extractPracticeModuleKey(practiceUrl?: string): string {
  if (!practiceUrl) return "";
  const cleaned = practiceUrl.split("?")[0].replace(/\/$/, "");
  const parts = cleaned.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

/**
 * Map practice module key to Dexie practice_log types
 */
const PRACTICE_KEY_TO_LOG_TYPES: Record<string, string[]> = {
  "reading-split": ["reading_splitview", "reading_speed", "reading_passage"],
  "dictation": ["dictation", "listening_dictation", "listening"],
  "sentence-writing": ["sentence_writing", "sentence_clinic", "syntax_transform", "writing_task1"],
  "shadowing": ["shadowing", "ipa_studio", "suprasegmentals"],
  "reading-tfng": ["reading_tfng", "reading_splitview"],
  "reading-completion": ["reading_completion", "reading_splitview"],
  "reading-headings": ["reading_headings", "reading_splitview"],
  "listening-map": ["listening_map", "dictation"],
  "listening-s3-consensus": ["listening_consensus", "dictation"],
  "listening-s4": ["high_rate_lecture", "dictation"],
  "writing-task2": ["writing_task2", "writing_grader", "toulmin", "peel_paragraph"],
  "speaking": ["speaking_grader", "shadowing", "adversarial_speaking"],
  "speaking-p1-p2": ["speaking_p1_p2", "speaking_grader", "shadowing"],
  "speaking-p3": ["speaking_p3", "speaking_grader"],
  "mock-test": ["mock_test", "full_mock"],
  "error-bank": ["error_bank_drill", "triage"],
  "vocab": ["vocab_review", "vocab_fsrs"],
};

/**
 * Scan theory recall box submissions for a given theory lesson URL:
 * Requirements: Học sinh phải điền trên 70% số ô điền lý thuyết trong bài đó
 * (không đòi hỏi độ chính xác của từng ô phải trên 70%).
 */
export function scanTheoryRecall(theoryUrl?: string): {
  scorePercent: number;
  isPassed: boolean;
  boxesFound: number;
  boxesCompleted: number;
  details: string;
} {
  if (!theoryUrl) {
    // If no theoryUrl provided for this task, theory is not required
    return {
      scorePercent: 100,
      isPassed: true,
      boxesFound: 0,
      boxesCompleted: 0,
      details: "Ca học này không yêu cầu phần lý thuyết tiên quyết.",
    };
  }

  if (typeof window === "undefined") {
    return {
      scorePercent: 0,
      isPassed: false,
      boxesFound: 0,
      boxesCompleted: 0,
      details: "Đang tải dữ liệu...",
    };
  }

  const lessonId = extractTheoryLessonId(theoryUrl);
  const meta = THEORY_LESSON_BOXES_DATA[lessonId];

  // Track unique filled items
  const filledItemIds = new Set<string>();

  // 1. Check known itemIds from indexed lesson metadata
  if (meta && meta.itemIds) {
    for (const itemId of meta.itemIds) {
      try {
        const text = localStorage.getItem(`theory_item_recall_${itemId}`) || "";
        const res = localStorage.getItem(`theory_item_recall_res_${itemId}`);
        if (text.trim().length >= 3 || res !== null) {
          filledItemIds.add(itemId);
        }
      } catch {
        // ignore localStorage error
      }
    }
  }

  // 2. Also scan localStorage for any keys matching lessonId
  try {
    const textPrefix = "theory_item_recall_";
    const resPrefix = "theory_item_recall_res_";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      if (key.startsWith(resPrefix)) {
        const itemId = key.slice(resPrefix.length);
        if (
          itemId.toLowerCase().includes(lessonId.toLowerCase()) ||
          (theoryUrl && itemId.toLowerCase().includes(extractPracticeModuleKey(theoryUrl).toLowerCase()))
        ) {
          filledItemIds.add(itemId);
        }
      } else if (key.startsWith(textPrefix)) {
        const itemId = key.slice(textPrefix.length);
        if (
          itemId.toLowerCase().includes(lessonId.toLowerCase()) ||
          (theoryUrl && itemId.toLowerCase().includes(extractPracticeModuleKey(theoryUrl).toLowerCase()))
        ) {
          const val = localStorage.getItem(key) || "";
          if (val.trim().length >= 3) {
            filledItemIds.add(itemId);
          }
        }
      }
    }
  } catch (e) {
    console.error("Scanner failed to read localStorage recall keys", e);
  }

  const boxesCompleted = filledItemIds.size;
  const totalBoxes = meta ? meta.totalBoxes : Math.max(boxesCompleted, 6);
  const minRequired = meta ? meta.minBoxesRequired : Math.ceil(totalBoxes * 0.7);

  const fillPercent = totalBoxes > 0 ? Math.round((boxesCompleted / totalBoxes) * 100) : 100;
  // Học sinh phải điền trên 70% (hoặc >= 70%) số ô điền lý thuyết trong bài đó
  const isPassed = totalBoxes === 0 || fillPercent >= 70;

  if (boxesCompleted === 0) {
    return {
      scorePercent: 0,
      isPassed: false,
      boxesFound: totalBoxes,
      boxesCompleted: 0,
      details: `Chưa điền ô lý thuyết nào (0/${totalBoxes} ô). Cần điền trên 70% số ô (ít nhất ${minRequired} ô) để hoàn thành.`,
    };
  }

  return {
    scorePercent: fillPercent,
    isPassed,
    boxesFound: totalBoxes,
    boxesCompleted,
    details: isPassed
      ? `Đã điền ${boxesCompleted}/${totalBoxes} ô lý thuyết (${fillPercent}%) • Đạt yêu cầu trên 70% số ô trong bài.`
      : `Mới điền ${boxesCompleted}/${totalBoxes} ô lý thuyết (${fillPercent}%) • Chưa đạt trên 70% số ô (cần điền thêm ít nhất ${Math.max(1, minRequired - boxesCompleted)} ô nữa).`,
  };
}

/**
 * Scan practice log entries for a given practice URL
 */
export async function scanPracticeSession(practiceUrl?: string): Promise<{
  isDone: boolean;
  logsCount: number;
  details: string;
}> {
  if (!practiceUrl) {
    return {
      isDone: true,
      logsCount: 1,
      details: "Nhiệm vụ này không có bài thực hành riêng biệt.",
    };
  }

  const moduleKey = extractPracticeModuleKey(practiceUrl);

  // 1. Check direct localStorage flag first (< 1ms)
  if (typeof window !== "undefined") {
    const localFlag = localStorage.getItem(`practice_completed_${moduleKey}`);
    const localUrlFlag = localStorage.getItem(`practice_completed_${practiceUrl}`);
    if (localFlag === "true" || localUrlFlag === "true") {
      return {
        isDone: true,
        logsCount: 1,
        details: "Đã ghi nhận nộp bài thực hành thành công.",
      };
    }
  }

  // 2. Query IndexedDB practice_logs
  try {
    const targetTypes = PRACTICE_KEY_TO_LOG_TYPES[moduleKey] || [moduleKey];

    // Find any log matching target types
    const logs = await db.practice_logs.toArray();
    const matchingLogs = logs.filter((log) => {
      if (!log.type) return false;
      const logTypeNorm = log.type.toLowerCase().replace(/[_-]/g, "");
      return targetTypes.some((t) => {
        const targetNorm = t.toLowerCase().replace(/[_-]/g, "");
        return (
          logTypeNorm.includes(targetNorm) ||
          targetNorm.includes(logTypeNorm) ||
          (log.materialId && log.materialId.toLowerCase().includes(moduleKey.toLowerCase()))
        );
      });
    });

    if (matchingLogs.length > 0) {
      return {
        isDone: true,
        logsCount: matchingLogs.length,
        details: `Đã hoàn thành ${matchingLogs.length} lần luyện tập thực tế.`,
      };
    }
  } catch (e) {
    console.error("Scanner failed to query practice_logs:", e);
  }

  return {
    isDone: false,
    logsCount: 0,
    details: "Chưa hoàn thành và nộp bài thực hành của kĩ năng này.",
  };
}

/**
 * Core Scanner: Verify both Theory (>70% Recall) AND Practice (Completed)
 */
export async function scanTaskCompletion(task: RoadmapTask): Promise<TaskScanResult> {
  const theoryUrl = task.theoryUrl || (task.type === "theory" ? task.linkUrl : undefined);
  const practiceUrl = task.practiceUrl || (task.type === "drill" ? task.linkUrl : undefined);

  const theoryRes = scanTheoryRecall(theoryUrl);
  const practiceRes = await scanPracticeSession(practiceUrl);

  const isComplete = theoryRes.isPassed && practiceRes.isDone;

  let summaryReasonVi = "";
  if (isComplete) {
    summaryReasonVi = `✅ Đủ điều kiện: Đã điền trên 70% số ô lý thuyết (${theoryRes.boxesCompleted}/${theoryRes.boxesFound} ô) & nộp bài thực hành.`;
  } else if (!theoryRes.isPassed && !practiceRes.isDone) {
    summaryReasonVi = `❌ Chưa đủ điều kiện: Chưa điền đủ 70% số ô lý thuyết (mới điền ${theoryRes.boxesCompleted}/${theoryRes.boxesFound} ô) VÀ chưa làm bài thực hành.`;
  } else if (!theoryRes.isPassed) {
    summaryReasonVi = `⚠️ Thiếu điều kiện Lý thuyết: Mới điền ${theoryRes.boxesCompleted}/${theoryRes.boxesFound} ô (${theoryRes.scorePercent}%). Cần điền trên 70% số ô lý thuyết trong bài.`;
  } else {
    summaryReasonVi = `⚠️ Thiếu điều kiện Thực hành: Đã điền đủ lý thuyết (${theoryRes.boxesCompleted}/${theoryRes.boxesFound} ô), bạn cần vào làm và nộp bài luyện tập.`;
  }

  return {
    taskId: task.id,
    isComplete,
    theory: {
      url: theoryUrl,
      scorePercent: theoryRes.scorePercent,
      isPassed: theoryRes.isPassed,
      boxesFound: theoryRes.boxesFound,
      boxesCompleted: theoryRes.boxesCompleted,
      details: theoryRes.details,
    },
    practice: {
      url: practiceUrl,
      isDone: practiceRes.isDone,
      logsCount: practiceRes.logsCount,
      details: practiceRes.details,
    },
    summaryReasonVi,
  };
}

/**
 * Scan all 4 tasks for a day node
 */
export async function scanDayTasks(dayNode: RoadmapDayNode): Promise<{
  results: Record<number, TaskScanResult>;
  allDone: boolean;
  completedTasksCount: number;
}> {
  const results: Record<number, TaskScanResult> = {};
  let completedTasksCount = 0;

  for (let i = 0; i < dayNode.tasks.length; i++) {
    const task = dayNode.tasks[i];
    const res = await scanTaskCompletion(task);
    results[i] = res;
    if (res.isComplete) {
      completedTasksCount++;
    }
  }

  return {
    results,
    allDone: completedTasksCount === dayNode.tasks.length,
    completedTasksCount,
  };
}

/**
 * Mark a practice session as explicitly completed (for fast path local sync)
 */
export function markPracticeCompleted(practiceUrlOrKey: string): void {
  if (typeof window === "undefined") return;
  const key = extractPracticeModuleKey(practiceUrlOrKey);
  localStorage.setItem(`practice_completed_${key}`, "true");
  localStorage.setItem(`practice_completed_${practiceUrlOrKey}`, "true");
  window.dispatchEvent(new CustomEvent("ielts-practice-completed", { detail: { key, practiceUrlOrKey } }));
}
