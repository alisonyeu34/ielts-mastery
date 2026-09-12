import { VocabCard } from "@/types/database";
import { db } from "@/lib/db";

export const MOCK_VOCAB_SEEDS: VocabCard[] = [
  // 1. Disproportionate
  {
    id: "vocab_01",
    word: "disproportionate",
    ipa: "/ˌdɪsprəˈpɔːʃənət/",
    meaning: "Không cân xứng, không tương xứng (quá lớn hoặc quá nhỏ so với tổng thể)",
    definitionEn: "Too large or too small in comparison to something else, or not in proportion.",
    collocations: ["disproportionate impact", "disproportionate amount", "disproportionate influence"],
    originalContext: "Low-income households bear a disproportionate burden of carbon taxation policies.",
    category: "570_awl",
    status: "learning",
    stepInterval: 1,
    nextReviewDate: new Date(Date.now() - 3600000).toISOString(), // Due now
    repetitionCount: 1,
    lapsesCount: 0,
    stability: 1.2,
    difficulty: 5.2,
    bandLevel: "Band 7.5+",
    sourceModule: "reading",
    wordFamily: [
      { pos: "Adjective", word: "disproportionate" },
      { pos: "Adverb", word: "disproportionately" },
      { pos: "Noun", word: "disproportion" },
    ],
    createdAt: new Date().toISOString(),
  },

  // 2. Exacerbate
  {
    id: "vocab_02",
    word: "exacerbate",
    ipa: "/ɪɡˈzæsəbeɪt/",
    meaning: "Làm trầm trọng thêm, làm xấu đi (tình trạng, căn bệnh, vấn đề)",
    definitionEn: "To make a problem, bad situation, or negative feeling much worse.",
    collocations: ["exacerbate the problem", "exacerbate existing inequalities", "exacerbate symptoms"],
    originalContext: "Rapid unplanned urbanization inevitably exacerbates municipal traffic congestion.",
    category: "c1_academic",
    status: "learning",
    stepInterval: 3,
    nextReviewDate: new Date(Date.now() - 7200000).toISOString(), // Due now
    repetitionCount: 2,
    lapsesCount: 1,
    stability: 2.5,
    difficulty: 6.0,
    bandLevel: "Band 8.0+",
    sourceModule: "writing",
    wordFamily: [
      { pos: "Verb", word: "exacerbate" },
      { pos: "Noun", word: "exacerbation" },
    ],
    createdAt: new Date().toISOString(),
  },

  // 3. Substantiate
  {
    id: "vocab_03",
    word: "substantiate",
    ipa: "/səbˈstænʃieɪt/",
    meaning: "Chứng minh, đưa ra bằng chứng xác thực cho một luận điểm",
    definitionEn: "To provide evidence or factual proof to support the truth of a claim.",
    collocations: ["substantiate a claim", "substantiate findings", "substantiate allegations"],
    originalContext: "Empirical scientific data is indispensable to substantiate the researcher's hypotheses.",
    category: "570_awl",
    status: "new",
    stepInterval: 1,
    nextReviewDate: new Date().toISOString(), // Due now
    repetitionCount: 0,
    lapsesCount: 0,
    stability: 1.0,
    difficulty: 5.0,
    bandLevel: "Band 8.0+",
    sourceModule: "reading",
    wordFamily: [
      { pos: "Verb", word: "substantiate" },
      { pos: "Noun", word: "substantiation" },
      { pos: "Adjective", word: "substantial" },
    ],
    createdAt: new Date().toISOString(),
  },

  // 4. Ubiquitous
  {
    id: "vocab_04",
    word: "ubiquitous",
    ipa: "/juːˈbɪkwɪtəs/",
    meaning: "Phổ biến ở khắp mọi nơi, nhan nhản (e.g. smartphone, mạng xã hội)",
    definitionEn: "Present, appearing, or found everywhere simultaneously.",
    collocations: ["ubiquitous presence", "ubiquitous technology", "ubiquitous nature"],
    originalContext: "Smartphones and handheld digital displays have become ubiquitous in contemporary society.",
    category: "c1_academic",
    status: "learning",
    stepInterval: 7,
    nextReviewDate: new Date(Date.now() + 86400000 * 2).toISOString(), // Not due yet
    repetitionCount: 3,
    lapsesCount: 0,
    stability: 6.8,
    difficulty: 4.5,
    bandLevel: "Band 8.0+",
    sourceModule: "speaking",
    wordFamily: [
      { pos: "Adjective", word: "ubiquitous" },
      { pos: "Noun", word: "ubiquity" },
      { pos: "Adverb", word: "ubiquitously" },
    ],
    createdAt: new Date().toISOString(),
  },

  // 5. Unprecedented
  {
    id: "vocab_05",
    word: "unprecedented",
    ipa: "/ʌnˈpresɪdentɪd/",
    meaning: "Chưa từng có tiền lệ, chưa từng thấy trong lịch sử",
    definitionEn: "Never done, known, or experienced before in history.",
    collocations: ["unprecedented scale", "unprecedented growth", "unprecedented challenge"],
    originalContext: "The sudden global pandemic caused unprecedented disruption to global logistics networks.",
    category: "570_awl",
    status: "mastered",
    stepInterval: 14,
    nextReviewDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    repetitionCount: 4,
    lapsesCount: 0,
    stability: 14.5,
    difficulty: 3.8,
    bandLevel: "Band 7.5+",
    sourceModule: "reading",
    wordFamily: [
      { pos: "Adjective", word: "unprecedented" },
      { pos: "Noun", word: "precedent" },
    ],
    createdAt: new Date().toISOString(),
  },

  // 6. Mitigate
  {
    id: "vocab_06",
    word: "mitigate",
    ipa: "/ˈmɪtɪɡeɪt/",
    meaning: "Làm giảm nhẹ, xoa dịu (thiệt hại, rủi ro, tác động tiêu cực)",
    definitionEn: "To make something bad or harmful less severe, serious, or painful.",
    collocations: ["mitigate the risk", "mitigate adverse effects", "mitigate environmental damage"],
    originalContext: "Stricter regulations on industrial waste discharge help mitigate freshwater pollution.",
    category: "570_awl",
    status: "learning",
    stepInterval: 1,
    nextReviewDate: new Date().toISOString(), // Due now
    repetitionCount: 1,
    lapsesCount: 0,
    stability: 1.4,
    difficulty: 4.8,
    bandLevel: "Band 7.5+",
    sourceModule: "writing",
    wordFamily: [
      { pos: "Verb", word: "mitigate" },
      { pos: "Noun", word: "mitigation" },
      { pos: "Adjective", word: "mitigating" },
    ],
    createdAt: new Date().toISOString(),
  },

  // 7. Deteriorate
  {
    id: "vocab_07",
    word: "deteriorate",
    ipa: "/dɪˈtɪəriəreɪt/",
    meaning: "Xuống cấp, suy thoái theo thời gian (chất lượng cuộc sống, sức khỏe, cơ sở hạ tầng)",
    definitionEn: "To become progressively worse in quality or condition over time.",
    collocations: ["rapidly deteriorate", "deteriorate into chaos", "conditions deteriorate"],
    originalContext: "Air quality in metropolitan basins continues to deteriorate due to heavy vehicle emissions.",
    category: "3000_core",
    status: "learning",
    stepInterval: 3,
    nextReviewDate: new Date(Date.now() - 1000).toISOString(), // Due now
    repetitionCount: 2,
    lapsesCount: 2,
    stability: 2.0,
    difficulty: 6.4,
    bandLevel: "Band 7.0+",
    sourceModule: "listening",
    wordFamily: [
      { pos: "Verb", word: "deteriorate" },
      { pos: "Noun", word: "deterioration" },
    ],
    createdAt: new Date().toISOString(),
  },

  // 8. Inevitably
  {
    id: "vocab_08",
    word: "inevitably",
    ipa: "/ɪnˈevɪtəbli/",
    meaning: "Tất yếu, chắc chắn sẽ xảy ra (không thể tránh khỏi)",
    definitionEn: "As is certain to happen; unavoidably.",
    collocations: ["inevitably lead to", "inevitably result in", "inevitably follow"],
    originalContext: "Over-reliance on automated algorithms will inevitably lead to cognitive stagnation.",
    category: "570_awl",
    status: "new",
    stepInterval: 1,
    nextReviewDate: new Date().toISOString(), // Due now
    repetitionCount: 0,
    lapsesCount: 0,
    stability: 1.0,
    difficulty: 4.0,
    bandLevel: "Band 7.0+",
    sourceModule: "dictation",
    wordFamily: [
      { pos: "Adverb", word: "inevitably" },
      { pos: "Adjective", word: "inevitable" },
      { pos: "Noun", word: "inevitability" },
    ],
    createdAt: new Date().toISOString(),
  },
];

/**
 * Seed initial vocabulary cards into Dexie DB if empty
 */
export async function seedVocabDatabaseIfEmpty(): Promise<void> {
  try {
    const count = await db.vocab_matrix.count();
    if (count === 0) {
      await db.vocab_matrix.bulkPut(MOCK_VOCAB_SEEDS);
    }
  } catch (err) {
    console.error("Failed to seed vocab database:", err);
  }
}
