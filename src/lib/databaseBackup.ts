import { db } from "@/lib/db";
import {
  UserProgress,
  TheoryLesson,
  VocabCard,
  ErrorItem,
  PracticeLog,
  AISubmission,
} from "@/types/database";

export interface DatabaseBackupPayload {
  version: number;
  exportedAt: string;
  app: "IELTSMasteryPlatform";
  data: {
    user_progress: UserProgress[];
    theory_lessons: TheoryLesson[];
    vocab_matrix: VocabCard[];
    error_bank: ErrorItem[];
    practice_logs: PracticeLog[];
    ai_submissions: AISubmission[];
  };
  recordCounts: {
    user_progress: number;
    theory_lessons: number;
    vocab_matrix: number;
    error_bank: number;
    practice_logs: number;
    ai_submissions: number;
  };
}

/**
 * Export all Dexie tables into a structured JSON file and trigger browser download
 */
export async function exportDatabaseToJSON(): Promise<DatabaseBackupPayload> {
  const user_progress = await db.user_progress.toArray();
  const theory_lessons = await db.theory_lessons.toArray();
  const vocab_matrix = await db.vocab_matrix.toArray();
  const error_bank = await db.error_bank.toArray();
  const practice_logs = await db.practice_logs.toArray();
  const ai_submissions = await db.ai_submissions.toArray();

  const payload: DatabaseBackupPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    app: "IELTSMasteryPlatform",
    data: {
      user_progress,
      theory_lessons,
      vocab_matrix,
      error_bank,
      practice_logs,
      ai_submissions,
    },
    recordCounts: {
      user_progress: user_progress.length,
      theory_lessons: theory_lessons.length,
      vocab_matrix: vocab_matrix.length,
      error_bank: error_bank.length,
      practice_logs: practice_logs.length,
      ai_submissions: ai_submissions.length,
    },
  };

  // Trigger client download
  if (typeof window !== "undefined") {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ielts_mastery_backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  return payload;
}

/**
 * Import and restore Dexie database from a JSON backup string
 */
export async function importDatabaseFromJSON(jsonString: string): Promise<{
  success: boolean;
  message: string;
  recordCounts?: DatabaseBackupPayload["recordCounts"];
}> {
  try {
    const parsed = JSON.parse(jsonString) as DatabaseBackupPayload;

    if (parsed.app !== "IELTSMasteryPlatform" || !parsed.data) {
      return {
        success: false,
        message: "Tệp JSON không hợp lệ hoặc không thuộc hệ thống IELTS Mastery.",
      };
    }

    // Execute atomic transaction to clear and reload all tables
    await db.transaction(
      "rw",
      [
        db.user_progress,
        db.theory_lessons,
        db.vocab_matrix,
        db.error_bank,
        db.practice_logs,
        db.ai_submissions,
      ],
      async () => {
        await db.user_progress.clear();
        await db.theory_lessons.clear();
        await db.vocab_matrix.clear();
        await db.error_bank.clear();
        await db.practice_logs.clear();
        await db.ai_submissions.clear();

        if (parsed.data.user_progress?.length) {
          await db.user_progress.bulkAdd(parsed.data.user_progress);
        }
        if (parsed.data.theory_lessons?.length) {
          await db.theory_lessons.bulkAdd(parsed.data.theory_lessons);
        }
        if (parsed.data.vocab_matrix?.length) {
          await db.vocab_matrix.bulkAdd(parsed.data.vocab_matrix);
        }
        if (parsed.data.error_bank?.length) {
          await db.error_bank.bulkAdd(parsed.data.error_bank);
        }
        if (parsed.data.practice_logs?.length) {
          await db.practice_logs.bulkAdd(parsed.data.practice_logs);
        }
        if (parsed.data.ai_submissions?.length) {
          await db.ai_submissions.bulkAdd(parsed.data.ai_submissions);
        }
      }
    );

    return {
      success: true,
      message: `Khôi phục thành công! Đã nạp ${parsed.data.vocab_matrix?.length || 0} từ vựng, ${
        parsed.data.error_bank?.length || 0
      } lỗi sai và ${parsed.data.practice_logs?.length || 0} lượt luyện tập.`,
      recordCounts: parsed.recordCounts,
    };
  } catch (err: unknown) {
    console.error("Import database error:", err);
    return {
      success: false,
      message: `Lỗi xử lý file: ${err instanceof Error ? err.message : "Định dạng không hợp lệ"}`,
    };
  }
}

/**
 * Reset all user learning records to factory settings
 */
export async function resetDatabase(): Promise<void> {
  await db.transaction(
    "rw",
    [
      db.user_progress,
      db.vocab_matrix,
      db.error_bank,
      db.practice_logs,
      db.ai_submissions,
    ],
    async () => {
      await db.user_progress.clear();
      await db.vocab_matrix.clear();
      await db.error_bank.clear();
      await db.practice_logs.clear();
      await db.ai_submissions.clear();
    }
  );
}
