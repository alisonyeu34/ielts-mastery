export type GrammarTopicId =
  | "complex_sentences"
  | "passive_voice"
  | "relative_clauses"
  | "conditionals"
  | "subject_verb_agreement";

export interface GrammarTopic {
  id: GrammarTopicId;
  name: string;
  tag: string;
  description: string;
  targetBandBenefit: string;
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "complex_sentences",
    name: "Câu Phức & Liên Từ Phụ Thuộc",
    tag: "Complex Sentences",
    description: "Làm chủ cấu trúc câu chứa mệnh đề phụ thuộc (Although, While, Whereas, Because) để đẩy điểm GRA lên 6.5+.",
    targetBandBenefit: "Tiêu chí GRA yêu cầu 'a variety of complex structures'.",
  },
  {
    id: "passive_voice",
    name: "Câu Bị Động Học Thuật",
    tag: "Passive Voice",
    description: "Sử dụng câu bị động khách quan (It is widely acknowledged that...) và các thì hoàn thành trong Writing Task 1 & 2.",
    targetBandBenefit: "Tạo văn phong học thuật khách quan, trang trọng (Objective Tone).",
  },
  {
    id: "relative_clauses",
    name: "Mệnh Đề Quan Hệ (Relative Clauses)",
    tag: "Relative Clauses",
    description: "Sử dụng mệnh đề quan hệ xác định và không xác định (which, who, where, whose) để nối ý mượt mà.",
    targetBandBenefit: "Tăng tính liên kết Cohesion và đa dạng hóa câu.",
  },
  {
    id: "conditionals",
    name: "Câu Điều Kiện Nâng Cao",
    tag: "Conditionals",
    description: "Vận dụng câu điều kiện loại 2, loại 3 và đảo ngữ điều kiện (Had it not been for...) để đưa ra giả định sắc bén.",
    targetBandBenefit: "Gây ấn tượng mạnh với giám khảo ở phần thảo luận giải pháp Task 2.",
  },
  {
    id: "subject_verb_agreement",
    name: "Hòa Hợp Chủ - Vị & Danh Từ Số Nhiều",
    tag: "S-V Agreement",
    description: "Triệt tiêu hoàn toàn các lỗi chia động từ cơ bản với danh từ không đếm được, cụm danh từ dài và đại từ bất định.",
    targetBandBenefit: "Đảm bảo tỷ lệ câu 'error-free sentences' trên 70%.",
  },
];

export interface SentenceBuilderExercise {
  id: string;
  topicId: GrammarTopicId;
  title: string;
  vietnameseMeaning: string;
  scrambledTokens: string[];
  correctSentence: string;
  structureFormula: string;
  syntaxBreakdown: {
    part: string;
    role: string;
  }[];
  ieltsApplication: string;
}

export interface SpotTheErrorExercise {
  id: string;
  topicId: GrammarTopicId;
  title: string;
  fullSentence: string;
  words: string[];
  errorWordIndex: number;
  errorWord: string;
  correctWord: string;
  grammarRule: string;
  whyWrongInIelts: string;
}

export const MOCK_BUILDER_EXERCISES: SentenceBuilderExercise[] = [
  {
    id: "sb_complex_1",
    topicId: "complex_sentences",
    title: "Câu Phức Với Liên Từ Đối Lập 'Although'",
    vietnameseMeaning: "Mặc dù năng lượng tái tạo đòi hỏi vốn đầu tư ban đầu cao, nó mang lại những lợi ích sinh thái lâu dài to lớn.",
    scrambledTokens: [
      "renewable energy",
      "capital investment,",
      "substantial long-term",
      "requires high initial",
      "it yields",
      "Although",
      "ecological benefits.",
    ],
    correctSentence: "Although renewable energy requires high initial capital investment, it yields substantial long-term ecological benefits.",
    structureFormula: "Although + [Mệnh đề phụ S1 + V1 + O1] + , + [Mệnh đề chính S2 + V2 + O2]",
    syntaxBreakdown: [
      { part: "Although renewable energy requires high initial capital investment,", role: "Mệnh đề trạng ngữ nhượng bộ (Concessive Dependent Clause)" },
      { part: "it yields substantial long-term ecological benefits.", role: "Mệnh đề độc lập chính (Independent Main Clause)" },
    ],
    ieltsApplication: "Mở rộng góc nhìn hai chiều trong IELTS Writing Task 2 (Discussion Essay).",
  },
  {
    id: "sb_passive_1",
    topicId: "passive_voice",
    title: "Câu Bị Động Thì Hiện Tại Hoàn Thành",
    vietnameseMeaning: "Nhiều chính sách nghiêm ngặt đã được chính phủ ban hành nhằm giảm thiểu lượng khí thải công nghiệp.",
    scrambledTokens: [
      "have been implemented",
      "to mitigate",
      "Stringent policies",
      "by the government",
      "industrial emissions.",
    ],
    correctSentence: "Stringent policies have been implemented by the government to mitigate industrial emissions.",
    structureFormula: "S (plural) + have been + V3/ed + by O + to-V (chỉ mục đích)",
    syntaxBreakdown: [
      { part: "Stringent policies", role: "Chủ ngữ chịu tác động (Subject)" },
      { part: "have been implemented", role: "Động từ bị động thì Hiện tại hoàn thành" },
      { part: "by the government", role: "Tác nhân gây hành động (Agent)" },
      { part: "to mitigate industrial emissions.", role: "Cụm chỉ mục đích (Infinitive of Purpose)" },
    ],
    ieltsApplication: "Miêu tả giải pháp đã được thực thi trong Writing Task 2.",
  },
  {
    id: "sb_relative_1",
    topicId: "relative_clauses",
    title: "Mệnh Đề Quan Hệ Không Xác Định Với 'Which'",
    vietnameseMeaning: "Tỷ lệ đô thị hóa tăng vọt lên 65%, điều này đặt ra áp lực nặng nề lên hạ tầng công cộng.",
    scrambledTokens: [
      "surged to 65%,",
      "immense pressure",
      "The urbanization rate",
      "on public infrastructure.",
      "which exerted",
    ],
    correctSentence: "The urbanization rate surged to 65%, which exerted immense pressure on public infrastructure.",
    structureFormula: "[Main Clause] + , which + [Verb phrase bổ nghĩa cho cả mệnh đề đứng trước]",
    syntaxBreakdown: [
      { part: "The urbanization rate surged to 65%,", role: "Mệnh đề chính nêu số liệu (Task 1)" },
      { part: "which exerted immense pressure on public infrastructure.", role: "Mệnh đề quan hệ bổ nghĩa cho toàn bộ sự việc phía trước (Sentential Relative Clause)" },
    ],
    ieltsApplication: "Viết câu nhận xét xu hướng nguyên nhân - kết quả trong IELTS Writing Task 1.",
  },
  {
    id: "sb_conditional_1",
    topicId: "conditionals",
    title: "Câu Điều Kiện Loại 2 Đưa Ra Giải Định",
    vietnameseMeaning: "Nếu các nhà lập pháp áp thuế cao hơn đối với đồ uống có đường, tỷ lệ béo phì ở trẻ em sẽ giảm đáng kể.",
    scrambledTokens: [
      "on sugary drinks,",
      "childhood obesity rates",
      "imposed higher taxes",
      "would decline significantly.",
      "If policymakers",
    ],
    correctSentence: "If policymakers imposed higher taxes on sugary drinks, childhood obesity rates would decline significantly.",
    structureFormula: "If + S1 + V2/ed, S2 + would + V_inf",
    syntaxBreakdown: [
      { part: "If policymakers imposed higher taxes on sugary drinks,", role: "Mệnh đề điều kiện giả định ở hiện tại (If-clause)" },
      { part: "childhood obesity rates would decline significantly.", role: "Mệnh đề kết quả giả định (Result clause)" },
    ],
    ieltsApplication: "Đề xuất giải pháp và dự đoán kết quả trong bài luận IELTS Writing Task 2.",
  },
];

export const MOCK_SPOT_ERROR_EXERCISES: SpotTheErrorExercise[] = [
  {
    id: "se_sva_1",
    topicId: "subject_verb_agreement",
    title: "Lỗi Hòa Hợp Chủ - Vị Với Cụm Danh Từ Dài",
    fullSentence: "The rapid development of modern artificial intelligence tools have transformed various sectors.",
    words: [
      "The",
      "rapid",
      "development",
      "of",
      "modern",
      "artificial",
      "intelligence",
      "tools",
      "have",
      "transformed",
      "various",
      "sectors.",
    ],
    errorWordIndex: 8,
    errorWord: "have",
    correctWord: "has",
    grammarRule: "Chủ ngữ cốt lõi của câu là danh từ số ít 'The rapid development' (sự phát triển), không phải 'tools' đứng sau giới từ 'of'. Vì vậy động từ phải chia số ít là 'has transformed'.",
    whyWrongInIelts: "Lỗi bị phân tâm bởi danh từ đứng sát động từ (Proximity Agreement Error) làm tụt tiêu chí GRA xuống Band 5.0.",
  },
  {
    id: "se_relative_1",
    topicId: "relative_clauses",
    title: "Nhầm Lẫn Giữa Đại Từ Quan Hệ 'where' Và 'which'",
    fullSentence: "Many students prefer to study in universities where offer state-of-the-art laboratory facilities.",
    words: [
      "Many",
      "students",
      "prefer",
      "to",
      "study",
      "in",
      "universities",
      "where",
      "offer",
      "state-of-the-art",
      "laboratory",
      "facilities.",
    ],
    errorWordIndex: 7,
    errorWord: "where",
    correctWord: "which",
    grammarRule: "Sau đại từ quan hệ là động từ 'offer' (thiếu chủ ngữ), do đó bắt buộc phải dùng đại từ quan hệ đóng vai trò chủ ngữ ('which' hoặc 'that'). 'Where' là trạng từ chỉ nơi chốn chỉ đi với một mệnh đề hoàn chỉnh (S + V).",
    whyWrongInIelts: "Nhầm lẫn giữa nơi chốn làm chủ ngữ vs nơi chốn làm trạng ngữ là lỗi kinh điển trong Writing Task 2.",
  },
  {
    id: "se_passive_1",
    topicId: "passive_voice",
    title: "Thiếu Trợ Động Từ Bị Động 'been'",
    fullSentence: "Over the past decade, numerous technological innovations have introduced into healthcare systems.",
    words: [
      "Over",
      "the",
      "past",
      "decade,",
      "numerous",
      "technological",
      "innovations",
      "have",
      "introduced",
      "into",
      "healthcare",
      "systems.",
    ],
    errorWordIndex: 8,
    errorWord: "introduced",
    correctWord: "been introduced",
    grammarRule: "Chủ ngữ là 'innovations' (các đột phá công nghệ) không thể tự giới thiệu mà phải 'được đưa vào áp dụng'. Cần thể bị động thì Hiện tại hoàn thành: 'have been introduced'.",
    whyWrongInIelts: "Nhầm lẫn giữa thể chủ động và bị động khiến câu văn vô nghĩa và bị trừ điểm nặng tiêu chí GRA.",
  },
  {
    id: "se_complex_1",
    topicId: "complex_sentences",
    title: "Lỗi Dùng Cả 'Although' Và 'But' Trong Một Câu (Double Conjunction)",
    fullSentence: "Although online education provides flexible learning schedules, but it lacks face-to-face interaction.",
    words: [
      "Although",
      "online",
      "education",
      "provides",
      "flexible",
      "learning",
      "schedules,",
      "but",
      "it",
      "lacks",
      "face-to-face",
      "interaction.",
    ],
    errorWordIndex: 7,
    errorWord: "but",
    correctWord: "",
    grammarRule: "Trong tiếng Anh học thuật, khi câu đã bắt đầu bằng liên từ phụ thuộc 'Although', mệnh đề chính KHÔNG ĐƯỢC dùng thêm liên từ đẳng lập 'but'. Chỉ cần dùng dấu phẩy ngăn cách giữa 2 mệnh đề.",
    whyWrongInIelts: "Tư duy dịch thô 'Mặc dù... nhưng...' từ tiếng Việt sang tiếng Anh gây lỗi ngữ pháp cấu trúc câu ghép/phức.",
  },
];
