/**
 * Mock Data for C1/C2 Syntactic Engineering Studio (Step 81)
 * 20 Authentic Task 2 Sentence Transformation Drills & C1/C2 Nominalization Palette
 */

export interface SyntacticDrillItem {
  id: string;
  topic: string;
  band6SpokenSentence: string;
  idiBand6: number;
  critiqueBand6: string;
  tier2Band75Sentence: string;
  tier3Band85Sentence: string;
  idiBand85: number;
  syntacticWeaponsUsed: ("Nominalization" | "Negative Inversion" | "Conditional Inversion" | "It-Cleft" | "Wh-Cleft")[];
  nominalizationRoots: { base: string; c2Nominal: string; meaning: string }[];
  inversionFormulaHint?: string;
  cleftFormulaHint?: string;
}

export const NOMINALIZATION_DICTIONARY: {
  base: string;
  c2Nominal: string;
  collocations: string[];
  example: string;
}[] = [
  {
    base: "automate (v)",
    c2Nominal: "industrial automation",
    collocations: ["accelerating industrial automation", "ubiquitous automation"],
    example: "Accelerating industrial automation precipitates structural labor displacement."
  },
  {
    base: "displace (v)",
    c2Nominal: "worker displacement",
    collocations: ["widespread worker displacement", "involuntary displacement"],
    example: "The policy mitigated catastrophic worker displacement across manufacturing sectors."
  },
  {
    base: "degrade (v)",
    c2Nominal: "environmental degradation",
    collocations: ["irreversible environmental degradation", "accelerating degradation"],
    example: "Unrestrained extraction triggers irreversible environmental degradation."
  },
  {
    base: "proliferate (v)",
    c2Nominal: "rapid proliferation",
    collocations: ["the proliferation of disinformation", "nuclear proliferation"],
    example: "The proliferation of synthetic media undermines democratic discourse."
  },
  {
    base: "subsidize (v)",
    c2Nominal: "state subsidization",
    collocations: ["targeted state subsidization", "fiscal subsidization"],
    example: "Direct state subsidization is indispensable for renewable energy transitions."
  },
  {
    base: "deplete (v)",
    c2Nominal: "resource depletion",
    collocations: ["acute resource depletion", "groundwater depletion"],
    example: "Acute resource depletion threatens the food security of future generations."
  },
  {
    base: "mitigate (v)",
    c2Nominal: "disparity mitigation",
    collocations: ["systemic mitigation", "climate mitigation framework"],
    example: "Effective mitigation requires coordinated multilateral intervention."
  },
  {
    base: "reallocate (v)",
    c2Nominal: "capital reallocation",
    collocations: ["strategic capital reallocation", "budgetary reallocation"],
    example: "Progressive taxation facilitates the reallocation of capital to public schools."
  }
];

export const MOCK_SYNTACTIC_DRILLS: SyntacticDrillItem[] = [
  {
    id: "drill_01_automation_poverty",
    topic: "Technological Unemployment & Poverty",
    band6SpokenSentence: "When machines automate manufacturing, many laborers lose their jobs, and this causes poverty to increase in society.",
    idiBand6: 38,
    critiqueBand6: "Câu văn lỏng lẻo mang hơi hướng văn nói (When + Subject + Verb + and this causes). IDI thấp (38%) làm loãng luận điểm.",
    tier2Band75Sentence: "By automating manufacturing processes, corporations displace numerous workers, thereby exacerbating socioeconomic poverty.",
    tier3Band85Sentence: "Industrial automation precipitates widespread worker displacement, thereby exacerbating socioeconomic precarity.",
    idiBand85: 64,
    syntacticWeaponsUsed: ["Nominalization"],
    nominalizationRoots: [
      { base: "automate manufacturing", c2Nominal: "industrial automation", meaning: "tự động hóa công nghiệp" },
      { base: "lose their jobs", c2Nominal: "worker displacement", meaning: "sự dịch chuyển/mất việc làm của lao động" },
      { base: "poverty", c2Nominal: "socioeconomic precarity", meaning: "tình trạng bấp bênh kinh tế - xã hội" }
    ]
  },
  {
    id: "drill_02_climate_inversion",
    topic: "Environmental Policy & Renewable Subsidies",
    band6SpokenSentence: "Governments rarely invest enough money in green energy, so carbon emissions keep rising every single year.",
    idiBand6: 41,
    critiqueBand6: "Cấu trúc nối liên từ 'so' đơn giản. Chưa sử dụng đảo ngữ phủ định để tạo sức nặng tu từ học thuật.",
    tier2Band75Sentence: "Because governments rarely allocate sufficient capital to renewable energy, carbon emissions continue their upward trajectory.",
    tier3Band85Sentence: "Seldom have governments allocated sufficient fiscal capital to clean infrastructure, with the consequence that industrial emissions have escalated unabated.",
    idiBand85: 62,
    syntacticWeaponsUsed: ["Negative Inversion", "Nominalization"],
    nominalizationRoots: [
      { base: "invest money", c2Nominal: "fiscal allocation", meaning: "phân bổ ngân sách" },
      { base: "emissions keep rising", c2Nominal: "unabated escalation", meaning: "sự leo thang không ngừng" }
    ],
    inversionFormulaHint: "Seldom + have/do + Subject + Verb (e.g., 'Seldom have governments allocated...')"
  },
  {
    id: "drill_03_corporate_cleft",
    topic: "Corporate Accountability & Greenwashing",
    band6SpokenSentence: "Companies are not held accountable by the government, and that is why they continue to pollute rivers and lakes.",
    idiBand6: 35,
    critiqueBand6: "Lối diễn đạt 'and that is why' là văn nói khẩu ngữ. Cần sử dụng It-cleft để làm nổi bật nguyên nhân cốt lõi.",
    tier2Band75Sentence: "A lack of regulatory accountability allows corporations to discharge pollutants into natural waterways.",
    tier3Band85Sentence: "It is this systemic lack of regulatory accountability that fosters corporate negligence across industrial manufacturing.",
    idiBand85: 58,
    syntacticWeaponsUsed: ["It-Cleft", "Nominalization"],
    nominalizationRoots: [
      { base: "not held accountable", c2Nominal: "systemic lack of regulatory accountability", meaning: "sự thiếu trách nhiệm giải trình mang tính hệ thống" },
      { base: "continue to pollute", c2Nominal: "corporate negligence", meaning: "sự bất cẩn/vi phạm của doanh nghiệp" }
    ],
    cleftFormulaHint: "It is + [Focused Noun Phrase] + that + [Main Clause]"
  },
  {
    id: "drill_04_conditional_inversion",
    topic: "Universal Healthcare Mandates",
    band6SpokenSentence: "If governments were to provide free medical care for all citizens, the national tax burden would increase significantly.",
    idiBand6: 42,
    critiqueBand6: "Mệnh đề 'If governments were to...' thông thường. Nâng cấp sang đảo ngữ điều kiện bỏ 'If' để đạt sự trang trọng C2.",
    tier2Band75Sentence: "Providing universal healthcare to all citizens would inevitably escalate national tax obligations.",
    tier3Band85Sentence: "Were governments to institute universal healthcare entitlements, national fiscal burdens would inevitably escalate.",
    idiBand85: 60,
    syntacticWeaponsUsed: ["Conditional Inversion", "Nominalization"],
    nominalizationRoots: [
      { base: "provide free medical care", c2Nominal: "universal healthcare entitlements", meaning: "quyền lợi y tế toàn dân" },
      { base: "tax burden increase", c2Nominal: "fiscal escalation", meaning: "sự leo thang gánh nặng tài khóa" }
    ],
    inversionFormulaHint: "Were + Subject + to + Verb (e.g., 'Were governments to institute...')"
  },
  {
    id: "drill_05_wh_cleft_education",
    topic: "Higher Education Reform & Critical Thinking",
    band6SpokenSentence: "Universities only need to reform their old curriculum to teach students how to think critically.",
    idiBand6: 39,
    critiqueBand6: "Văn phong đơn giản với 'only need to'. Cần sử dụng Wh-cleft (Pseudo-cleft) để nhấn mạnh giải pháp sống còn.",
    tier2Band75Sentence: "Universities must fundamentally modernize their pedagogical curricula to foster independent critical analysis.",
    tier3Band85Sentence: "What remains indispensable is a fundamental curricular modernization that foregrounds analytical inquiry over rote memorization.",
    idiBand85: 63,
    syntacticWeaponsUsed: ["Wh-Cleft", "Nominalization"],
    nominalizationRoots: [
      { base: "reform curriculum", c2Nominal: "curricular modernization", meaning: "hiện đại hóa chương trình giảng dạy" },
      { base: "teach how to think critically", c2Nominal: "foreground analytical inquiry", meaning: "đặt tư duy phân tích lên hàng đầu" }
    ],
    cleftFormulaHint: "What + [Clause] + is/remains + [Focused Complement]"
  }
];
