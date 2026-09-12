export type SyntaxCategory = "nominalization" | "inversion" | "cleft";

export interface SyntaxExerciseItem {
  id: string;
  category: SyntaxCategory;
  categoryTitleVi: string;
  title: string;
  level5Sentence: string;
  highlightedWeakParts?: string[];
  suggestedPivotVerbs?: string[];
  targetBand8Sentences: string[];
  grammarRule: string;
  commonMistakeRegex?: string; // Regex to catch typical grammatical mistakes
  commonMistakeExplanation?: string;
  explanation: string;
  c1LexicalUpgrades: Array<{ original: string; upgraded: string }>;
}

export const MOCK_SYNTAX_EXERCISES: SyntaxExerciseItem[] = [
  // ==================== 1. NOMINALIZATION (5 ITEMS) ====================
  {
    id: "nom_1_rural_migration",
    category: "nominalization",
    categoryTitleVi: "Danh Từ Hóa (Nominalization)",
    title: "Di cư nông thôn & Ùn tắc đô thị",
    level5Sentence:
      "Because people are migrating rapidly from rural areas to cities, traffic is becoming severely congested in urban centres.",
    highlightedWeakParts: ["migrating rapidly", "is becoming severely congested"],
    suggestedPivotVerbs: ["precipitates", "exacerbates", "triggers", "is attributable to"],
    targetBand8Sentences: [
      "Rapid rural-to-urban migration precipitates severe traffic congestion in urban centres.",
      "The rapid migration of rural populations to cities exacerbates traffic congestion in urban centres.",
      "Severe traffic congestion in urban centres is directly attributable to rapid rural-to-urban migration.",
      "Rapid migration from rural areas to cities triggers severe traffic congestion in urban centres.",
    ],
    grammarRule:
      "Biến đổi mệnh đề trạng ngữ [Because people migrate rapidly...] thành cụm danh từ [Rapid rural-to-urban migration] làm chủ ngữ + Động từ học thuật [precipitates / exacerbates] + Cụm danh từ tân ngữ [severe traffic congestion].",
    explanation:
      "Chuyển từ cấu trúc liên từ 'Because + S + V' sang cấu trúc cụm danh từ cô đọng giúp tăng mật độ từ vựng (Lexical Density) và tính trang trọng khách quan cho bài viết Task 2.",
    c1LexicalUpgrades: [
      { original: "migrating rapidly", upgraded: "rapid rural-to-urban migration" },
      { original: "becoming severely congested", upgraded: "severe traffic congestion" },
    ],
  },
  {
    id: "nom_2_fossil_fuels",
    category: "nominalization",
    categoryTitleVi: "Danh Từ Hóa (Nominalization)",
    title: "Tiêu thụ nhiên liệu & Biến đổi khí hậu",
    level5Sentence:
      "When industries consume fossil fuels excessively, global temperatures increase dramatically.",
    highlightedWeakParts: ["consume fossil fuels excessively", "increase dramatically"],
    suggestedPivotVerbs: ["drives", "fuels", "leads to", "underpins"],
    targetBand8Sentences: [
      "Excessive industrial consumption of fossil fuels drives a dramatic increase in global temperatures.",
      "The excessive consumption of fossil fuels by industries leads to a dramatic rise in global temperatures.",
      "A dramatic increase in global temperatures is primarily driven by excessive industrial fossil fuel consumption.",
      "Excessive fossil fuel consumption by industrial sectors triggers dramatic global temperature rises.",
    ],
    grammarRule:
      "[When industries consume fossil fuels excessively...] ➔ [Excessive industrial fossil fuel consumption] + [drives / triggers] + [a dramatic increase in global temperatures].",
    explanation:
      "Loại bỏ mệnh đề phụ thuộc 'When...', thay bằng danh từ hóa 'consumption' và 'increase' để biến câu thành một khẳng định mang tính quy luật khoa học.",
    c1LexicalUpgrades: [
      { original: "consume excessively", upgraded: "excessive industrial consumption" },
      { original: "increase dramatically", upgraded: "a dramatic rise / increase" },
    ],
  },
  {
    id: "nom_3_tourism_culture",
    category: "nominalization",
    categoryTitleVi: "Danh Từ Hóa (Nominalization)",
    title: "Du lịch đại chúng & Xói mòn văn hóa",
    level5Sentence:
      "If governments commercialize historical sites too aggressively, local traditional cultures will be eroded irreversibly.",
    highlightedWeakParts: ["commercialize historical sites too aggressively", "will be eroded irreversibly"],
    suggestedPivotVerbs: ["results in", "leads to", "culminates in", "risks"],
    targetBand8Sentences: [
      "Overly aggressive commercialization of historical sites results in the irreversible erosion of local traditional cultures.",
      "The aggressive commercialization of historical heritage culminates in the irreversible erosion of local culture.",
      "Aggressive commercialization of historical sites risks irreversible cultural erosion.",
      "Irreversible erosion of local traditional cultures is a direct consequence of the aggressive commercialization of historical sites.",
    ],
    grammarRule:
      "[If governments commercialize...] ➔ [Aggressive commercialization of historical sites] + [results in / culminates in] + [the irreversible erosion of local cultures].",
    explanation:
      "Danh từ hóa động từ 'commercialize' thành 'commercialization' và 'erode' thành 'erosion', chuyển đổi tính từ miêu tả mức độ 'irreversible'.",
    c1LexicalUpgrades: [
      { original: "commercialize aggressively", upgraded: "aggressive commercialization" },
      { original: "eroded irreversibly", upgraded: "irreversible erosion" },
    ],
  },
  {
    id: "nom_4_automation_skills",
    category: "nominalization",
    categoryTitleVi: "Danh Từ Hóa (Nominalization)",
    title: "Tự động hóa & Tái đào tạo nhân lực",
    level5Sentence:
      "Because artificial intelligence is integrating into offices, workers must upskill their digital competencies constantly.",
    highlightedWeakParts: ["is integrating into offices", "must upskill their digital competencies constantly"],
    suggestedPivotVerbs: ["necessitates", "demands", "requires", "mandates"],
    targetBand8Sentences: [
      "The integration of artificial intelligence into workplaces necessitates continuous digital upskilling among workers.",
      "Rapid workplace artificial intelligence integration demands continuous digital competency upskilling.",
      "Continuous digital upskilling is necessitated by the widespread integration of artificial intelligence across workplaces.",
      "The integration of AI into offices mandates continuous upskilling of worker digital competencies.",
    ],
    grammarRule:
      "[Because AI is integrating...] ➔ [The integration of AI into workplaces] + [necessitates / demands] + [continuous digital upskilling].",
    explanation:
      "Sử dụng động từ học thuật 'necessitates' (bắt buộc / đòi hỏi) kết hợp với danh từ hóa 'integration' và 'upskilling'.",
    c1LexicalUpgrades: [
      { original: "is integrating", upgraded: "widespread integration" },
      { original: "upskill constantly", upgraded: "continuous digital upskilling" },
    ],
  },
  {
    id: "nom_5_remote_work",
    category: "nominalization",
    categoryTitleVi: "Danh Từ Hóa (Nominalization)",
    title: "Làm việc từ xa & Cân bằng cuộc sống",
    level5Sentence:
      "When companies allow employees to work flexibly from home, productivity improves significantly and work-life balance becomes better.",
    highlightedWeakParts: ["allow employees to work flexibly", "productivity improves significantly"],
    suggestedPivotVerbs: ["fosters", "enhances", "yields", "promotes"],
    targetBand8Sentences: [
      "The adoption of flexible remote working arrangements fosters significant productivity improvements and superior work-life balance.",
      "Flexible remote working arrangements yield substantial improvements in worker productivity and work-life balance.",
      "The provision of flexible telecommuting options enhances productivity while promoting better work-life balance.",
      "Substantial productivity improvements and enhanced work-life balance stem from flexible remote work arrangements.",
    ],
    grammarRule:
      "[When companies allow...] ➔ [The adoption of flexible remote working arrangements] + [fosters / yields] + [significant productivity improvements].",
    explanation:
      "Biến đổi hành động dài dòng 'allow employees to work from home' thành thuật ngữ học thuật 'flexible remote working arrangements'.",
    c1LexicalUpgrades: [
      { original: "allow to work flexibly", upgraded: "flexible remote working arrangements" },
      { original: "improves significantly", upgraded: "significant productivity improvements" },
    ],
  },

  // ==================== 2. INVERSION (5 ITEMS) ====================
  {
    id: "inv_1_not_only",
    category: "inversion",
    categoryTitleVi: "Đảo Ngữ Phủ Định & Điều Kiện (Inversion)",
    title: "Đảo ngữ với 'Not only... but also'",
    level5Sentence:
      "The new carbon tax policy not only failed to reduce factory emissions, but it also placed heavy financial burdens on small businesses.",
    highlightedWeakParts: ["not only failed to reduce", "but it also placed"],
    targetBand8Sentences: [
      "Not only did the new carbon tax policy fail to reduce factory emissions, but it also placed heavy financial burdens on small businesses.",
      "Not only did the carbon tax fail to curb emissions, but it also imposed severe financial burdens on small enterprises.",
      "Not only did the policy fail to curtail industrial emissions, but it also exerted immense financial pressure on small firms.",
    ],
    grammarRule:
      "Cấu trúc: Not only + Trợ động từ (did/does/should/can) + Chủ ngữ + Động từ nguyên mẫu..., but (also)...",
    commonMistakeRegex: "not only (the|a|this|[a-z]+) (policy|tax|government|measure) (failed|did fail)",
    commonMistakeExplanation:
      "Lỗi sai trật tự từ: Quên đảo trợ động từ 'did' lên trước chủ ngữ 'the new carbon tax policy'. Cần viết: 'Not only did the new policy fail...'",
    explanation:
      "Đưa 'Not only' lên đầu câu tạo ấn tượng nhấn mạnh mạnh mẽ cho tiêu chí Grammatical Range & Accuracy (GRA Band 8.0+).",
    c1LexicalUpgrades: [
      { original: "placed heavy burdens", upgraded: "imposed severe financial burdens" },
      { original: "reduce emissions", upgraded: "curb / curtail industrial emissions" },
    ],
  },
  {
    id: "inv_2_under_no_circumstances",
    category: "inversion",
    categoryTitleVi: "Đảo Ngữ Phủ Định & Điều Kiện (Inversion)",
    title: "Đảo ngữ với 'Under no circumstances'",
    level5Sentence:
      "Governments should under no circumstances sacrifice environmental standards for short-term economic profit.",
    highlightedWeakParts: ["should under no circumstances sacrifice"],
    targetBand8Sentences: [
      "Under no circumstances should governments sacrifice environmental standards for short-term economic profit.",
      "Under no circumstances should public authorities compromise ecological integrity for short-term commercial gains.",
      "Under no circumstances should state regulators subordinate environmental protection to short-term economic considerations.",
    ],
    grammarRule:
      "Cấu trúc: Under no circumstances + Modal Verb (should/must/can) + Chủ ngữ + Động từ nguyên mẫu...",
    commonMistakeRegex: "under no circumstances governments should",
    commonMistakeExplanation:
      "Lỗi trật tự từ: Đặt 'governments' trước 'should'. Phải đảo 'should' lên trước 'governments' ➔ 'Under no circumstances should governments...'",
    explanation:
      "Cấu trúc 'Under no circumstances' đứng đầu câu thể hiện lập trường dứt khoát, mang sắc thái học thuật cao cấp.",
    c1LexicalUpgrades: [
      { original: "sacrifice environmental standards", upgraded: "compromise ecological integrity" },
      { original: "economic profit", upgraded: "short-term commercial gains" },
    ],
  },
  {
    id: "inv_3_seldom",
    category: "inversion",
    categoryTitleVi: "Đảo Ngữ Phủ Định & Điều Kiện (Inversion)",
    title: "Đảo ngữ với 'Seldom / Rarely'",
    level5Sentence:
      "Developing countries have seldom witnessed such rapid technological transitions without experiencing substantial social friction.",
    highlightedWeakParts: ["have seldom witnessed"],
    targetBand8Sentences: [
      "Seldom have developing countries witnessed such rapid technological transitions without experiencing substantial social friction.",
      "Rarely have emerging economies experienced such swift technological disruption without undergoing significant societal strain.",
      "Seldom have developing nations undergone such accelerated technological transformations without confronting profound social challenges.",
    ],
    grammarRule:
      "Cấu trúc: Seldom / Rarely + Trợ động từ (have/has/do/did) + Chủ ngữ + V3/ed...",
    commonMistakeRegex: "seldom developing (countries|nations) have",
    commonMistakeExplanation:
      "Lỗi sai trật tự từ: Phải đảo 'have' lên trước 'developing countries' ➔ 'Seldom have developing countries witnessed...'",
    explanation:
      "Dùng 'Seldom have + S + V3' để mở đầu câu bình luận về tính hiếm có hoặc mức độ nghiêm trọng của một hiện tượng xã hội.",
    c1LexicalUpgrades: [
      { original: "rapid transitions", upgraded: "swift technological disruption" },
      { original: "social friction", upgraded: "profound societal strain" },
    ],
  },
  {
    id: "inv_4_had_conditional",
    category: "inversion",
    categoryTitleVi: "Đảo Ngữ Phủ Định & Điều Kiện (Inversion)",
    title: "Đảo ngữ câu điều kiện loại 3 với 'Had'",
    level5Sentence:
      "If municipal authorities had implemented strict zoning laws earlier, historic city centers would not have been ruined by uncontrolled skyscrapers.",
    highlightedWeakParts: ["If municipal authorities had implemented"],
    targetBand8Sentences: [
      "Had municipal authorities implemented strict zoning regulations earlier, historic city centers would not have been degraded by uncontrolled skyscrapers.",
      "Had city planners enacted rigorous zoning laws earlier, historical heritage districts would not have been compromised by unbridled commercial development.",
      "Had stringent zoning mandates been implemented earlier, historic urban quarters would have avoided severe architectural degradation.",
    ],
    grammarRule:
      "Cấu trúc điều kiện loại 3 đảo ngữ: Had + Chủ ngữ + (been) + V3/ed, Main Clause (would have + V3)...",
    commonMistakeRegex: "if had municipal|had municipal authorities have",
    commonMistakeExplanation:
      "Lỗi: Bỏ hẳn chữ 'If' khi dùng đảo ngữ 'Had + S + V3'. Không viết 'If had municipal...' mà viết trực tiếp 'Had municipal authorities implemented...'",
    explanation:
      "Bỏ 'if' và đảo 'Had' lên đầu câu là cấu trúc kinh điển trong văn nghị luận học thuật để phân tích giả định quá khứ.",
    c1LexicalUpgrades: [
      { original: "strict zoning laws", upgraded: "rigorous zoning mandates / regulations" },
      { original: "ruined by skyscrapers", upgraded: "degraded by unbridled high-rise construction" },
    ],
  },
  {
    id: "inv_5_were_conditional",
    category: "inversion",
    categoryTitleVi: "Đảo Ngữ Phủ Định & Điều Kiện (Inversion)",
    title: "Đảo ngữ câu điều kiện loại 2 với 'Were'",
    level5Sentence:
      "If governments were to eliminate university tuition entirely, universities would face severe funding deficits.",
    highlightedWeakParts: ["If governments were to eliminate"],
    targetBand8Sentences: [
      "Were governments to eliminate university tuition entirely, tertiary institutions would inevitably face severe budgetary deficits.",
      "Were state authorities to abolish tuition fees indiscriminately, universities would confront acute funding shortages.",
      "Were higher education to be made entirely tuition-free, academic institutions would grapple with severe financial constraints.",
    ],
    grammarRule:
      "Cấu trúc điều kiện loại 2 đảo ngữ: Were + Chủ ngữ + to V-infinitive, Main Clause (would/could + V)...",
    commonMistakeRegex: "if were governments|were governments eliminate",
    commonMistakeExplanation:
      "Lỗi: Cấu trúc đúng phải là 'Were + S + to + V-inf'. Không viết 'Were governments eliminate' mà phải có 'to eliminate'.",
    explanation:
      "Cấu trúc 'Were governments to + V' dùng để đặt giả định trang trọng về các chính sách nhà nước trong tương lai.",
    c1LexicalUpgrades: [
      { original: "eliminate tuition entirely", upgraded: "abolish tuition fees indiscriminately" },
      { original: "funding deficits", upgraded: "acute budgetary / financial constraints" },
    ],
  },

  // ==================== 3. CLEFT SENTENCES (5 ITEMS) ====================
  {
    id: "cleft_1_it_cleft_subject",
    category: "cleft",
    categoryTitleVi: "Câu Chẻ Nhấn Mạnh (Cleft Sentences)",
    title: "Câu chẻ 'It is... that...' nhấn mạnh Chủ ngữ",
    level5Sentence:
      "Excessive industrial wastewater discharge causes irreparable damage to local river ecosystems.",
    highlightedWeakParts: ["Excessive industrial wastewater discharge causes"],
    targetBand8Sentences: [
      "It is excessive industrial wastewater discharge that causes irreparable damage to local river ecosystems.",
      "It is the unchecked discharge of industrial effluent that inflicts irreparable harm on aquatic ecosystems.",
      "It is aggressive industrial pollution that poses the most catastrophic threat to freshwater ecosystems.",
    ],
    grammarRule:
      "Cấu trúc It-cleft: It is/was + [Thành phần cần nhấn mạnh] + that/who + [Phần còn lại của câu].",
    explanation:
      "Dùng It-cleft để đóng đinh thủ phạm chính gây ra vấn đề, hướng toàn bộ sự chú ý của người đọc vào đối tượng cốt lõi.",
    c1LexicalUpgrades: [
      { original: "wastewater discharge", upgraded: "unchecked discharge of industrial effluent" },
      { original: "causes damage", upgraded: "inflicts irreparable harm on" },
    ],
  },
  {
    id: "cleft_2_it_cleft_adverbial",
    category: "cleft",
    categoryTitleVi: "Câu Chẻ Nhấn Mạnh (Cleft Sentences)",
    title: "Câu chẻ 'It is only by/through... that...' nhấn mạnh Giải pháp",
    level5Sentence:
      "Governments can achieve carbon neutrality only through international climate collaboration.",
    highlightedWeakParts: ["only through international climate collaboration"],
    targetBand8Sentences: [
      "It is only through multilateral climate collaboration that governments can attain genuine carbon neutrality.",
      "It is only through rigorous international cooperation that nations can achieve sustainable carbon neutrality.",
      "It is only by fostering cross-border environmental partnerships that carbon neutrality can be realistically achieved.",
    ],
    grammarRule:
      "Cấu trúc It-cleft với giải pháp: It is only through/by + [Cụm giải pháp] + that + [Mệnh đề kết quả].",
    explanation:
      "Cực kỳ hữu dụng trong phần Thân bài 2 hoặc Kết luận khi bạn muốn nhấn mạnh giải pháp duy nhất khả thi.",
    c1LexicalUpgrades: [
      { original: "international climate collaboration", upgraded: "multilateral climate cooperation" },
      { original: "achieve carbon neutrality", upgraded: "attain genuine carbon neutrality" },
    ],
  },
  {
    id: "cleft_3_wh_cleft_pseudo",
    category: "cleft",
    categoryTitleVi: "Câu Chẻ Nhấn Mạnh (Cleft Sentences)",
    title: "Câu chẻ giả định 'What... is...' (Wh-cleft)",
    level5Sentence:
      "Policy makers must address the systemic inequality in public education funding.",
    highlightedWeakParts: ["Policy makers must address"],
    targetBand8Sentences: [
      "What policy makers must urgently address is the systemic disparity in public education funding.",
      "What municipal authorities need to prioritize is the institutional inequality embedded in school resource allocation.",
      "What governments ought to tackle first is the acute financial disparity across public academic institutions.",
    ],
    grammarRule:
      "Cấu trúc Wh-cleft: What + [Chủ ngữ + Động từ] + is/was + [Nội dung trọng tâm cần làm nổi bật].",
    explanation:
      "Wh-cleft tạo nhịp điệu mở đầu đoạn văn đầy lôi cuốn, nêu bật trọng tâm hành động mà các bên hữu quan cần can thiệp.",
    c1LexicalUpgrades: [
      { original: "systemic inequality", upgraded: "systemic / institutional disparity" },
      { original: "must address", upgraded: "must urgently address / prioritize" },
    ],
  },
  {
    id: "cleft_4_all_that_cleft",
    category: "cleft",
    categoryTitleVi: "Câu Chẻ Nhấn Mạnh (Cleft Sentences)",
    title: "Câu chẻ 'All that... is...' (Thu hẹp trọng tâm)",
    level5Sentence:
      "Direct humanitarian cash handouts only provide temporary relief for impoverished communities.",
    highlightedWeakParts: ["only provide temporary relief"],
    targetBand8Sentences: [
      "All that direct cash transfers provide is temporary relief for impoverished communities, failing to solve systemic poverty.",
      "All that unconditional cash handouts achieve is ephemeral relief for low-income households.",
      "All that direct financial aid offers is short-term alleviation, leaving structural causes unaddressed.",
    ],
    grammarRule:
      "Cấu trúc All-cleft: All that + [Chủ ngữ + Động từ] + is/was + [Giới hạn tác dụng].",
    explanation:
      "Thường được ứng dụng trong đoạn Counter-Argument & Rebuttal để chỉ ra sự hạn chế của một giải pháp phe đối lập đề xuất.",
    c1LexicalUpgrades: [
      { original: "cash handouts", upgraded: "direct cash transfers / financial aid" },
      { original: "temporary relief", upgraded: "ephemeral relief / short-term alleviation" },
    ],
  },
  {
    id: "cleft_5_reason_why_cleft",
    category: "cleft",
    categoryTitleVi: "Câu Chẻ Nhấn Mạnh (Cleft Sentences)",
    title: "Câu chẻ 'The reason why... is that...' (Nhấn mạnh Nguyên nhân)",
    level5Sentence:
      "Young people are physically inactive mainly because they are addicted to smartphones.",
    highlightedWeakParts: ["mainly because they are addicted to smartphones"],
    targetBand8Sentences: [
      "The primary reason why youth physical activity has plummeted is that modern adolescents are excessively immersed in digital entertainment.",
      "The underlying reason why teenagers lead sedentary lifestyles is that smartphones and social media monopolize their leisure hours.",
      "The fundamental reason why young generations exercise less is that digital screens have systematically displaced outdoor recreation.",
    ],
    grammarRule:
      "Cấu trúc Reason-cleft: The primary / underlying reason why + [Mệnh đề hiện tượng] + is that + [Mệnh đề nguyên nhân cốt lõi].",
    explanation:
      "Nâng tầm câu giải thích nguyên nhân đơn điệu 'X happens because Y' thành cấu trúc lập luận học thuật chuẩn mực.",
    c1LexicalUpgrades: [
      { original: "physically inactive", upgraded: "lead sedentary lifestyles / plummeted physical activity" },
      { original: "addicted to smartphones", upgraded: "excessively immersed in digital entertainment" },
    ],
  },
];
