export type ParaphraseTechnique =
  | "synonym"
  | "word_class"
  | "negation_of_antonym"
  | "conceptual_restatement";

export interface ParaphrasePair {
  id: string;
  topic: string;
  technique: ParaphraseTechnique;
  techniqueLabelVi: string;
  questionKeyword: string;
  passageMatch: string;
  vietnameseMeaning: string;
  explanation: string;
  ieltsExampleContext: {
    questionSentence: string;
    passageSentence: string;
  };
}

export interface ScanningDrillItem {
  id: string;
  title: string;
  topic: string;
  timeLimitSeconds: number;
  questionPrompt: string;
  targetKeyword: string;
  passageText: string;
  passageSegments: Array<{
    id: string;
    text: string;
    isTarget: boolean;
  }>;
  correctExplanation: string;
  trapExplanation: string;
}

export const MOCK_PARAPHRASE_PAIRS: ParaphrasePair[] = [
  // 1. Synonym Substitution
  {
    id: "para_syn_1",
    topic: "Economy & Statistics",
    technique: "synonym",
    techniqueLabelVi: "Đồng Nghĩa Trực Tiếp (Synonym)",
    questionKeyword: "dramatic decrease",
    passageMatch: "plummeted sharply",
    vietnameseMeaning: "sụt giảm nghiêm trọng / lao dốc nhanh",
    explanation: "Động từ học thuật 'plummet' kết hợp trạng từ 'sharply' là paraphrase hoàn hảo cho 'dramatic decrease' trong Writing Task 1 & Reading.",
    ieltsExampleContext: {
      questionSentence: "There was a dramatic decrease in the consumption of coal after 2015.",
      passageSentence: "Following 2015, reliance on coal as an energy source plummeted sharply.",
    },
  },
  {
    id: "para_syn_2",
    topic: "Ecology & Wildlife",
    technique: "synonym",
    techniqueLabelVi: "Đồng Nghĩa Trực Tiếp (Synonym)",
    questionKeyword: "vital element",
    passageMatch: "indispensable component",
    vietnameseMeaning: "thành tố thiết yếu / không thể thiếu",
    explanation: "'Indispensable' mang nghĩa tương đương 100% với 'vital', được giám khảo Cambridge dùng thường xuyên ở bài đọc Khoa học.",
    ieltsExampleContext: {
      questionSentence: "Coral reefs represent a vital element for preserving oceanic equilibrium.",
      passageSentence: "Reefs function as an indispensable component in sustaining marine ecosystems.",
    },
  },
  {
    id: "para_syn_3",
    topic: "Public Policy",
    technique: "synonym",
    techniqueLabelVi: "Đồng Nghĩa Trực Tiếp (Synonym)",
    questionKeyword: "strictly prohibit",
    passageMatch: "impose an outright ban on",
    vietnameseMeaning: "nghiêm cấm hoàn toàn",
    explanation: "Cụm danh từ 'impose an outright ban on' là cách diễn đạt học thuật trang trọng thay thế cho 'strictly prohibit'.",
    ieltsExampleContext: {
      questionSentence: "The government decided to strictly prohibit single-use plastics.",
      passageSentence: "Authorities moved to impose an outright ban on disposable polymer products.",
    },
  },

  // 2. Word Class Transition
  {
    id: "para_wordclass_1",
    topic: "Urbanization",
    technique: "word_class",
    techniqueLabelVi: "Biến Đổi Dạng Từ (Word Class Transition)",
    questionKeyword: "industrial expansion",
    passageMatch: "industries expanded significantly",
    vietnameseMeaning: "sự mở rộng công nghiệp -> các ngành công nghiệp mở rộng mạnh",
    explanation: "Chuyển từ Cụm danh từ (Noun Phrase) trong câu hỏi sang Cụm động từ (Verb Phrase) trong bài đọc là bẫy phổ biến nhất trong dạng bài Gap-fill.",
    ieltsExampleContext: {
      questionSentence: "The region witnessed rapid industrial expansion during the nineteenth century.",
      passageSentence: "Throughout the nineteenth century, regional manufacturing industries expanded significantly.",
    },
  },
  {
    id: "para_wordclass_2",
    topic: "Education & Psychology",
    technique: "word_class",
    techniqueLabelVi: "Biến Đổi Dạng Từ (Word Class Transition)",
    questionKeyword: "cognitive development",
    passageMatch: "develop cognitive capabilities",
    vietnameseMeaning: "sự phát triển nhận thức -> phát triển các năng lực nhận thức",
    explanation: "Chuyển đổi từ 'cognitive development' sang cấu trúc hành động 'develop cognitive capabilities'.",
    ieltsExampleContext: {
      questionSentence: "Early childhood play fosters healthy cognitive development.",
      passageSentence: "Engaging in play helps young children develop their cognitive capabilities naturally.",
    },
  },
  {
    id: "para_wordclass_3",
    topic: "Health & Nutrition",
    technique: "word_class",
    techniqueLabelVi: "Biến Đổi Dạng Từ (Word Class Transition)",
    questionKeyword: "dietary modification",
    passageMatch: "modify daily eating habits",
    vietnameseMeaning: "sự điều chỉnh chế độ ăn -> điều chỉnh thói quen ăn uống",
    explanation: "Tính từ 'dietary' biến đổi thành 'eating habits', danh từ 'modification' thành động từ 'modify'.",
    ieltsExampleContext: {
      questionSentence: "Patients achieved recovery through dietary modification.",
      passageSentence: "The road to recovery involved patients choosing to modify daily eating habits.",
    },
  },

  // 3. Negation of Antonym
  {
    id: "para_neg_1",
    topic: "Sociology & Work",
    technique: "negation_of_antonym",
    techniqueLabelVi: "Phủ Định Từ Trái Nghĩa (Negation of Antonym)",
    questionKeyword: "fail to acknowledge",
    passageMatch: "ignore completely",
    vietnameseMeaning: "không công nhận / làm ngơ",
    explanation: "'Fail to acknowledge' (không thừa nhận) là phép phủ định của 'acknowledge', đồng nghĩa với 'ignore completely'.",
    ieltsExampleContext: {
      questionSentence: "Corporate executives fail to acknowledge the mental health concerns of employees.",
      passageSentence: "Management seemed to ignore completely the growing psychological fatigue among staff.",
    },
  },
  {
    id: "para_neg_2",
    topic: "Meteorology & Climate",
    technique: "negation_of_antonym",
    techniqueLabelVi: "Phủ Định Từ Trái Nghĩa (Negation of Antonym)",
    questionKeyword: "not uncommon",
    passageMatch: "frequently observed",
    vietnameseMeaning: "không hiếm gặp -> diễn ra thường xuyên",
    explanation: "Cấu trúc phủ định kép 'not uncommon' = 'common' = 'frequently observed'. Đây là bẫy T/F/NG kinh điển.",
    ieltsExampleContext: {
      questionSentence: "Severe heatwaves are not uncommon in this arid territory.",
      passageSentence: "Episodes of extreme temperature spikes are frequently observed across the desert landscape.",
    },
  },
  {
    id: "para_neg_3",
    topic: "Archaeology",
    technique: "negation_of_antonym",
    techniqueLabelVi: "Phủ Định Từ Trái Nghĩa (Negation of Antonym)",
    questionKeyword: "unable to determine",
    passageMatch: "remains uncertain",
    vietnameseMeaning: "không thể xác định -> vẫn còn chưa chắc chắn",
    explanation: "'Unable to determine' (phủ định năng lực xác minh) đồng nghĩa với 'remains uncertain' trong bài đọc.",
    ieltsExampleContext: {
      questionSentence: "Researchers were unable to determine the exact origin of the ancient relic.",
      passageSentence: "The geographic provenance of the unearthed artifact remains entirely uncertain.",
    },
  },

  // 4. Conceptual Restatement (Định nghĩa diễn giải)
  {
    id: "para_con_1",
    topic: "Government & Social Welfare",
    technique: "conceptual_restatement",
    techniqueLabelVi: "Diễn Giải Khái Niệm (Conceptual Restatement)",
    questionKeyword: "financial aid",
    passageMatch: "monetary assistance provided by the state",
    vietnameseMeaning: "viện trợ tài chính -> hỗ trợ tiền tệ do chính phủ cấp",
    explanation: "Khái niệm 'financial aid' được mở rộng thành một cụm giải nghĩa định nghĩa chi tiết trong bài đọc.",
    ieltsExampleContext: {
      questionSentence: "Underprivileged students were granted financial aid to attend university.",
      passageSentence: "Eligible low-income applicants received monetary assistance provided by the state for tuition.",
    },
  },
  {
    id: "para_con_2",
    topic: "Oceanography & Biodiversity",
    technique: "conceptual_restatement",
    techniqueLabelVi: "Diễn Giải Khái Niệm (Conceptual Restatement)",
    questionKeyword: "marine biodiversity",
    passageMatch: "the wide variety of living species inhabiting ocean ecosystems",
    vietnameseMeaning: "đa dạng sinh học biển -> sự phong phú của các loài sinh vật biển",
    explanation: "Từ chuyên ngành 'biodiversity' được paraphrase thành định nghĩa sinh học đầy đủ.",
    ieltsExampleContext: {
      questionSentence: "Overfishing severely threatens marine biodiversity.",
      passageSentence: "Commercial trawling endangers the wide variety of living species inhabiting ocean ecosystems.",
    },
  },
  {
    id: "para_con_3",
    topic: "Renewable Energy",
    technique: "conceptual_restatement",
    techniqueLabelVi: "Diễn Giải Khái Niệm (Conceptual Restatement)",
    questionKeyword: "carbon footprint",
    passageMatch: "the total amount of greenhouse gases generated by human activities",
    vietnameseMeaning: "dấu chân carbon -> tổng lượng khí thải nhà kính do con người tạo ra",
    explanation: "'Carbon footprint' được định nghĩa khoa học trong bài đọc chuyên ngành biến đổi khí hậu.",
    ieltsExampleContext: {
      questionSentence: "Switching to solar power helps reduce an individual's carbon footprint.",
      passageSentence: "Adopting photovoltaics minimizes the total amount of greenhouse gases generated by domestic energy use.",
    },
  },
];

export const MOCK_SCANNING_DRILLS: ScanningDrillItem[] = [
  {
    id: "drill_scan_1",
    title: "Định Vị Tác Động Năng Lượng Tái Tạo",
    topic: "Renewable Energy Transition",
    timeLimitSeconds: 20,
    questionPrompt: "Tìm cụm từ trong đoạn văn mang nghĩa tương đương với: 'drastic reduction in emissions'",
    targetKeyword: "drastic reduction in emissions",
    passageText:
      "Recent statistical evaluations indicate that the widespread deployment of wind turbines has precipitated a sharp decline in carbon output across northern European municipalities. While conventional fossil fuels continue to generate baseline power, municipal authorities have accelerated their clean grid investments to meet carbon-neutral deadlines.",
    passageSegments: [
      { id: "seg_1", text: "Recent statistical evaluations indicate that", isTarget: false },
      { id: "seg_2", text: "the widespread deployment of wind turbines", isTarget: false },
      { id: "seg_3", text: "has precipitated a sharp decline in carbon output", isTarget: true },
      { id: "seg_4", text: "across northern European municipalities.", isTarget: false },
      { id: "seg_5", text: "While conventional fossil fuels continue to generate baseline power,", isTarget: false },
      { id: "seg_6", text: "municipal authorities have accelerated their clean grid investments.", isTarget: false },
    ],
    correctExplanation:
      "Chính xác! Cụm từ 'a sharp decline in carbon output' chính là paraphrase hoàn hảo cho 'drastic reduction in emissions' ('sharp decline' = 'drastic reduction', 'carbon output' = 'emissions').",
    trapExplanation:
      "Cụm từ bạn chọn không chứa từ đồng nghĩa với 'drastic reduction in emissions'. Đáp án đúng nằm ở cụm: 'has precipitated a sharp decline in carbon output'.",
  },
  {
    id: "drill_scan_2",
    title: "Định Vị Bằng Chứng Khảo Cổ Học",
    topic: "Ancient Civilizations",
    timeLimitSeconds: 20,
    questionPrompt: "Tìm cụm từ trong đoạn văn mang nghĩa tương đương với: 'undeniable historical proof'",
    targetKeyword: "undeniable historical proof",
    passageText:
      "Excavations conducted near the Nile delta unearthed intricate pottery and bronze tools, providing irrefutable empirical evidence of trade routes connecting ancient Egypt with Minoan Crete. Archaeologists had long hypothesized these exchanges, but previous surveys lacked tangible validation.",
    passageSegments: [
      { id: "seg_2_1", text: "Excavations conducted near the Nile delta unearthed intricate pottery,", isTarget: false },
      { id: "seg_2_2", text: "providing irrefutable empirical evidence", isTarget: true },
      { id: "seg_2_3", text: "of trade routes connecting ancient Egypt with Minoan Crete.", isTarget: false },
      { id: "seg_2_4", text: "Archaeologists had long hypothesized these exchanges,", isTarget: false },
      { id: "seg_2_5", text: "but previous surveys lacked tangible validation.", isTarget: false },
    ],
    correctExplanation:
      "Chính xác! 'Irrefutable empirical evidence' = 'undeniable historical proof' ('irrefutable' = 'undeniable', 'evidence' = 'proof').",
    trapExplanation:
      "Đáp án đúng là: 'providing irrefutable empirical evidence' (Tính từ 'irrefutable' đồng nghĩa với 'undeniable').",
  },
];
