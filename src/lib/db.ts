import Dexie, { Table } from "dexie";
import {
  UserProgress,
  TheoryLesson,
  VocabCard,
  ErrorItem,
  PracticeLog,
  AISubmission,
} from "@/types/database";
import { MOCK_ERROR_BANK_ITEMS } from "@/data/mockErrorBankData";

export class IELTSMasterDB extends Dexie {
  user_progress!: Table<UserProgress, string>;
  theory_lessons!: Table<TheoryLesson, string>;
  vocab_matrix!: Table<VocabCard, string>;
  error_bank!: Table<ErrorItem, string>;
  practice_logs!: Table<PracticeLog, string>;
  ai_submissions!: Table<AISubmission, string>;

  constructor() {
    super("IELTSMasterDB");

    this.version(1).stores({
      user_progress: "id, currentPhase, lastActiveDate",
      theory_lessons: "id, phase, skill, isCompleted, orderIndex",
      vocab_matrix: "id, word, category, status, stepInterval, nextReviewDate, createdAt",
      error_bank: "id, sourceModule, errorType, mastered, createdAt",
      practice_logs: "id, type, materialId, createdAt",
      ai_submissions: "id, skill, createdAt",
    });
  }
}

// Singleton database instance
export const db = new IELTSMasterDB();

/**
 * Get current date string formatted as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

// In-memory singleton lock to guarantee initDefaultUserData only runs once per app session
let isDbInitialized = false;
let initPromise: Promise<void> | null = null;

/**
 * Seed initial mock & foundation data for Phase 1 (Band 4.5 -> 5.5)
 */
export async function initDefaultUserData(): Promise<void> {
  if (typeof window === "undefined") return;
  if (isDbInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // 1. Check if user progress exists
      const userCount = await db.user_progress.count();
      const today = getTodayDateString();

    if (userCount === 0) {
      const defaultUser: UserProgress = {
        id: "main_user",
        currentPhase: 1,
        streakDays: 0,
        lastActiveDate: today,
        targetBand: 7.5,
        phase1Unlocked: true,
        phase2Unlocked: false,
        phase3Unlocked: false,
        completedLessonIds: [],
        totalStudyMinutes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await db.user_progress.put(defaultUser);
    } else {
      // Auto-clean any legacy fake stats
      const existingUser = await db.user_progress.get("main_user");
      if (existingUser && (existingUser.streakDays === 12 || existingUser.totalStudyMinutes === 280)) {
        await db.user_progress.update("main_user", {
          streakDays: 0,
          totalStudyMinutes: 0,
          completedLessonIds: [],
          currentPhase: 1,
        });
      }
    }

    // Remove legacy fake practice and AI submissions
    await db.practice_logs.where("id").equals("practice_01").delete();
    await db.practice_logs.where("id").equals("practice_02").delete();
    await db.ai_submissions.where("id").equals("ai_sub_01").delete();

    // 2. Check and seed Phase 1 Theory Lessons
    const lessonCount = await db.theory_lessons.count();
    if (lessonCount === 0) {
      const initialLessons: TheoryLesson[] = [
        {
          id: "lesson_grammar_01",
          phase: 1,
          skill: "grammar",
          title: "12 Thì Cốt Lõi & Phân Biệt Thì Trong IELTS Writing Task 1",
          orderIndex: 1,
          estimatedMinutes: 20,
          isCompleted: false,
          conceptMarkdown: `### Bản chất của Hệ thống Thì trong IELTS
Trong bài thi IELTS, đặc biệt là **Writing Task 1**, việc lựa chọn sai thì là nguyên nhân hàng đầu khiến tiêu chí **Grammatical Range and Accuracy (GRA)** bị tụt xuống Band 5.0.

- **Dữ liệu hoàn toàn trong quá khứ** (VD: 2010 - 2020) ➔ Bắt buộc dùng **Past Simple** (*increased, dropped, fluctuated*).
- **Dữ liệu dự báo tương lai** (VD: 2030 - 2050) ➔ Sử dụng các cấu trúc dự đoán (*is projected to increase, is predicted to reach*), **tuyệt đối không** dùng trực tiếp *will increase* một cách khẳng định tuyệt đối.
- **Biểu đồ không mốc thời gian** ➔ Dùng **Present Simple**.`,
          trapAnalysis: `⚠️ **Bẫy đề thi kinh điển:** Trộn lẫn các mốc năm trong cùng một biểu đồ (ví dụ: giai đoạn 2015 đến 2040). Thí sinh thường có thói quen dùng 100% thì Quá khứ đơn cho cả giai đoạn tương lai.`,
          band8Sample: `**Câu Band 5.5:** "The number of cars will increase in 2035."
**Câu Band 8.0+:** "The quantity of passenger vehicles is projected to witness an upward trajectory, reaching a peak of approximately 4.5 million units by 2035."`,
          quiz: [
            {
              id: "q1",
              question: "Biểu đồ mô tả số liệu từ năm 2000 đến 2022. Câu nào sau đây sử dụng đúng thì học thuật?",
              options: [
                "The proportion of smartphone users is increasing significantly.",
                "The proportion of smartphone users increased significantly over the 22-year period.",
                "The proportion of smartphone users will increase significantly.",
                "The proportion of smartphone users has been increased significantly.",
              ],
              correctIndex: 1,
              explanation: "Vì toàn bộ mốc thời gian 2000-2022 nằm hoàn toàn trong quá khứ và đã kết thúc, ta phải dùng thì Quá khứ đơn (Past Simple).",
            },
            {
              id: "q2",
              question: "Khi biểu đồ đưa ra số liệu dự báo cho năm 2045, cụm từ nào mang tính học thuật cao nhất?",
              options: [
                "will certainly grow",
                "is going to climb",
                "is anticipated to undergo a steady growth",
                "grows surely",
              ],
              correctIndex: 2,
              explanation: "'is anticipated to undergo...' thể hiện ngôn ngữ thận trọng (hedging language) đạt chuẩn Band 8.0 trong IELTS Academic.",
            },
          ],
        },
        {
          id: "lesson_grammar_02",
          phase: 1,
          skill: "grammar",
          title: "Mệnh Đề Quan Hệ Rút Gọn & Cụm Phân Từ (Participle Clauses)",
          orderIndex: 2,
          estimatedMinutes: 25,
          isCompleted: false,
          conceptMarkdown: `### Nâng tầm câu ghép thành câu phức Band 7.0+
Mệnh đề quan hệ rút gọn giúp câu văn súc tích, tránh lặp từ và tạo nhịp điệu học thuật tự nhiên.

1. **Rút gọn dạng chủ động** ➔ Dùng **V-ing** (Present Participle):
   - *The government introduced laws that prohibit deforestation.*
   ➔ *The government introduced laws **prohibiting** deforestation.*
2. **Rút gọn dạng bị động** ➔ Dùng **V3/V-ed** (Past Participle):
   - *Data which was collected from three continents indicates...*
   ➔ *Data **collected** from three continents indicates...*`,
          trapAnalysis: `⚠️ **Bẫy Dangling Participle (Phân từ treo):** Khi rút gọn cụm phân từ ở đầu câu, chủ ngữ của mệnh đề chính phải chính là chủ thể thực hiện hành động của cụm phân từ đó.`,
          band8Sample: `**Câu Band 5.5:** "Students study online. They have more free time. They can work part-time."
**Câu Band 8.0+:** "Studying via virtual platforms allows students greater temporal flexibility, thereby enabling them to engage in remunerative employment."`,
          quiz: [
            {
              id: "q3",
              question: "Chọn câu rút gọn chính xác: 'The survey that was conducted by Cambridge University revealed surprising results.'",
              options: [
                "The survey conducting by Cambridge University revealed surprising results.",
                "The survey conducted by Cambridge University revealed surprising results.",
                "The survey was conducted by Cambridge University revealed surprising results.",
                "The survey which conducting by Cambridge University revealed surprising results.",
              ],
              correctIndex: 1,
              explanation: "Rút gọn mệnh đề quan hệ ở thể bị động 'which was conducted' thành 'conducted'.",
            },
          ],
        },
        {
          id: "lesson_pronun_03",
          phase: 1,
          skill: "pronunciation",
          title: "Làm Chủ 44 Âm IPA & Âm Đuôi (Ending Sounds) Cốt Lõi",
          orderIndex: 3,
          estimatedMinutes: 22,
          isCompleted: false,
          conceptMarkdown: `### Tiêu chí Pronunciation trong Speaking
Giám khảo không chấm theo chất giọng (accent) Anh-Anh hay Anh-Mỹ mà chấm theo độ rõ ràng và khả năng phân biệt âm.
- **Lỗi bỏ âm đuôi /s/, /z/, /t/, /d/, /ks/, /tʃ/**: Khiến người nghe hiểu sai từ loại và thì ngữ pháp.
- **Cặp nguyên âm ngắn - dài**: /ɪ/ vs /iː/ (*ship* vs *sheep*), /ʊ/ vs /uː/ (*pull* vs *pool*).`,
          trapAnalysis: `⚠️ **Bẫy phát âm đuôi -ed và -s/es:** Đa số thí sinh phát âm mọi đuôi '-ed' thành /ɪd/ thay vì phân biệt 3 quy tắc /t/, /d/, /ɪd/.`,
          band8Sample: `Phát âm chuẩn từ 'developed': /dɪˈvel.əpt/ (âm đuôi /t/, trọng âm rơi vào âm tiết thứ hai).`,
          quiz: [
            {
              id: "q4",
              question: "Từ nào sau đây có âm đuôi '-ed' được phát âm là /t/?",
              options: ["Wanted", "Decided", "Watched", "Played"],
              correctIndex: 2,
              explanation: "Từ kết thúc bằng âm vô thanh /tʃ/ (watch) khi thêm '-ed' được phát âm là /t/ -> /wɑːtʃt/.",
            },
          ],
        },
      ];

      await db.theory_lessons.bulkPut(initialLessons);
    }

    // 3. Check and seed Initial Vocab Cards (FSRS Spaced Repetition)
    const vocabCount = await db.vocab_matrix.count();
    if (vocabCount === 0) {
      const initialVocab: VocabCard[] = [
        {
          id: "vocab_mitigate",
          word: "Mitigate",
          ipa: "/ˈmɪt.ɪ.ɡeɪt/",
          meaning: "Làm dịu bớt, giảm nhẹ mức độ nghiêm trọng hoặc tác hại của một rủi ro/vấn đề.",
          collocations: ["mitigate the risk of", "mitigate environmental damage", "mitigate climate change"],
          originalContext: "Sustainable urban planning can mitigate the adverse effects of global warming.",
          category: "awl_570",
          status: "review",
          stepInterval: 1,
          nextReviewDate: today, // Due today
          repetitionCount: 1,
          lapsesCount: 0,
          stability: 3.4,
          difficulty: 4.2,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_detrimental",
          word: "Detrimental",
          ipa: "/ˌdet.rɪˈmen.təl/",
          meaning: "Có hại, gây tổn hại nghiêm trọng (thay thế cao cấp cho 'harmful').",
          collocations: ["detrimental effect on", "prove detrimental to", "detrimental consequence"],
          originalContext: "Sedentary lifestyle habits exert a detrimental impact on cardiovascular health.",
          category: "awl_570",
          status: "review",
          stepInterval: 1,
          nextReviewDate: today, // Due today
          repetitionCount: 2,
          lapsesCount: 0,
          stability: 2.1,
          difficulty: 5.0,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_predominant",
          word: "Predominant",
          ipa: "/prɪˈdɑː.mə.nənt/",
          meaning: "Chiếm ưu thế, là yếu tố chủ đạo hoặc nổi bật nhất.",
          collocations: ["predominant feature", "play a predominant role", "the predominant cause"],
          originalContext: "Fossil fuels remained the predominant source of electrical energy.",
          category: "awl_570",
          status: "review",
          stepInterval: 1,
          nextReviewDate: today, // Due today
          repetitionCount: 1,
          lapsesCount: 0,
          stability: 1.5,
          difficulty: 4.5,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_corroborate",
          word: "Corroborate",
          ipa: "/kəˈrɑː.bə.reɪt/",
          meaning: "Chứng minh, củng cố thêm bằng chứng xác thực cho một khẳng định.",
          collocations: ["corroborate evidence", "corroborate the findings", "corroborate the theory"],
          originalContext: "Recent empirical studies corroborate the hypothesis proposed by climate scientists.",
          category: "c1_academic",
          status: "learning",
          stepInterval: 3,
          nextReviewDate: today, // Due today
          repetitionCount: 3,
          lapsesCount: 0,
          stability: 4.8,
          difficulty: 6.2,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_ubiquitous",
          word: "Ubiquitous",
          ipa: "/juːˈbɪk.wə.t̬əs/",
          meaning: "Phổ biến khắp nơi, có mặt ở mọi nơi (thay thế cho 'everywhere').",
          collocations: ["become ubiquitous", "ubiquitous presence of", "ubiquitous computing"],
          originalContext: "Digital smartphones have become an ubiquitous fixture in modern human society.",
          category: "c1_academic",
          status: "learning",
          stepInterval: 3,
          nextReviewDate: today,
          repetitionCount: 2,
          lapsesCount: 0,
          stability: 3.8,
          difficulty: 5.8,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_allocate",
          word: "Allocate",
          ipa: "/ˈæl.ə.keɪt/",
          meaning: "Phân bổ, dành riêng ngân sách hoặc tài nguyên cho mục đích cụ thể.",
          collocations: ["allocate resources to", "allocate budget for", "allocate time"],
          originalContext: "Governments should allocate more public expenditure to healthcare infrastructure.",
          category: "awl_570",
          status: "new",
          stepInterval: 1,
          nextReviewDate: today,
          repetitionCount: 0,
          lapsesCount: 0,
          stability: 1.0,
          difficulty: 4.0,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_fluctuate",
          word: "Fluctuate",
          ipa: "/ˈflʌk.tʃu.eɪt/",
          meaning: "Dao động, biến động không đều lên xuống liên tục.",
          collocations: ["fluctuate wildly", "fluctuate between A and B", "prices fluctuate"],
          originalContext: "Oil prices fluctuated significantly over the course of the following decade.",
          category: "core_3000",
          status: "mastered",
          stepInterval: 14,
          nextReviewDate: "2026-09-15",
          repetitionCount: 5,
          lapsesCount: 0,
          stability: 14.0,
          difficulty: 3.2,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_exacerbate",
          word: "Exacerbate",
          ipa: "/ɪɡˈzæs.ɚ.beɪt/",
          meaning: "Làm trầm trọng thêm, làm xấu đi một tình trạng vốn đã tồi tệ.",
          collocations: ["exacerbate the problem", "exacerbate poverty", "exacerbate tensions"],
          originalContext: "The sudden influx of tourists exacerbated the existing housing shortage.",
          category: "c1_academic",
          status: "learning",
          stepInterval: 3,
          nextReviewDate: today,
          repetitionCount: 2,
          lapsesCount: 1,
          stability: 2.5,
          difficulty: 6.8,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_comprise",
          word: "Comprise",
          ipa: "/kəmˈpraɪz/",
          meaning: "Bao gồm, cấu thành từ (chú ý: không dùng 'is comprised of' trong văn cảnh trang trọng).",
          collocations: ["comprise several components", "the committee comprises", "comprise roughly 40%"],
          originalContext: "Renewable sources comprise nearly 30 percent of the nation's total electricity output.",
          category: "awl_570",
          status: "review",
          stepInterval: 7,
          nextReviewDate: today,
          repetitionCount: 4,
          lapsesCount: 0,
          stability: 7.2,
          difficulty: 4.8,
          createdAt: new Date().toISOString(),
        },
        {
          id: "vocab_feasible",
          word: "Feasible",
          ipa: "/ˈfiː.zə.bəl/",
          meaning: "Khả thi, có thể thực hiện được một cách thực tế.",
          collocations: ["economically feasible", "a feasible alternative", "technically feasible"],
          originalContext: "Transitioning to 100% solar power is technically feasible within the next two decades.",
          category: "awl_570",
          status: "new",
          stepInterval: 1,
          nextReviewDate: today,
          repetitionCount: 0,
          lapsesCount: 0,
          stability: 0,
          difficulty: 4.2,
          createdAt: new Date().toISOString(),
        },
      ];

      // Insert all cards as unreviewed new words
      const cleanedInitialVocab = initialVocab.map((v) => ({
        ...v,
        status: "new" as const,
        nextReviewDate: "",
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 0,
      }));

      await db.vocab_matrix.bulkPut(cleanedInitialVocab);
    } else {
      // If vocab cards exist, ensure none are marked due before user begins studying
      await db.vocab_matrix.toCollection().modify({
        status: "new",
        nextReviewDate: "",
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 0,
      });
    }

    // 4. Error bank: must be completely empty for a new student (0 errors)
    await db.error_bank.clear();

    // 5. Practice logs & AI submissions: must be empty (0 sessions, 0 essays)
    await db.practice_logs.clear();
    await db.ai_submissions.clear();

    // 6. One-time browser client purge to clean out user's existing IndexedDB
    if (typeof window !== "undefined") {
      const resetFlag = localStorage.getItem("ielts_mastery_clean_slate_20260909");
      if (!resetFlag) {
        await db.practice_logs.clear();
        await db.ai_submissions.clear();
        await db.error_bank.clear();
        await db.vocab_matrix.toCollection().modify({
          status: "new",
          nextReviewDate: "",
          repetitionCount: 0,
          lapsesCount: 0,
          stability: 0,
        });
        await db.user_progress.put({
          id: "main_user",
          currentPhase: 1,
          streakDays: 0,
          lastActiveDate: today,
          targetBand: 7.5,
          phase1Unlocked: true,
          phase2Unlocked: false,
          phase3Unlocked: false,
          completedLessonIds: [],
          totalStudyMinutes: 0,
          currentDay: 1,
          completedDayNodes: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        localStorage.setItem("ielts_mastery_clean_slate_20260909", "true");
      }
    }
    isDbInitialized = true;
  } catch (error) {
    console.error("Failed to initialize default IELTS database data:", error);
  }
  })();

  return initPromise;
}
