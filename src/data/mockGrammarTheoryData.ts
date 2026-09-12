/**
 * Core Academic Grammar Theory Lessons Dataset (Cambridge Assessment Standards)
 * Covers Phase 1 Foundation (Band 4.0 -> 5.5): 12 Tenses, Relative Clauses, Impersonal Passive, Mixed Conditionals
 * Structured into 3 Pedagogical Steps + 5-Question Gateway Mastery Quiz
 */

export interface GrammarFoundationalExample {
  en: string;
  vi: string;
  syntacticBreakdown: string;
}

export interface GrammarExaminerTrap {
  trapNameVi: string;
  band50WrongExample: string;
  band50TranslationVi?: string;
  band50FlawAnalysisVi: string;
  band80CorrectExample: string;
  band80TranslationVi?: string;
  wordBreakdown?: { word: string; ipa: string; type: string; meaningVi: string }[];
  examinerNoteVi: string;
}

export interface GrammarBand85Dissection {
  originalSentence: string;
  vietnameseTranslation?: string;
  bandLevel: string;
  grammaticalFeature: string;
  academicNuanceVi: string;
  keyCollocations: string[];
  wordBreakdown?: { word: string; ipa: string; type: string; meaningVi: string }[];
}

export interface GatewayQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  trapExplanation: string;
  targetPracticeModule: string;
}

export interface GrammarDetailedUsage {
  scenarioTitle: string;
  badgeIelts?: string;
  explanationVi: string;
  signalClues?: string[];
  ieltsApplicationVi: string;
  examples: {
    en: string;
    vi: string;
    analysis: string;
  }[];
}

export interface GrammarConjugationRow {
  subjectGroup: string;
  affirmative: string;
  negative: string;
  interrogative: string;
  shortAnswer?: string;
}

export interface GrammarSpellingRule {
  ruleNameVi: string;
  conditionVi: string;
  transformationVi: string;
  examples: string[];
  memoryTrickVi?: string;
}

export interface GrammarPronunciationGuide {
  soundIpa: string;
  ruleDescriptionVi: string;
  phoneticConditionVi: string;
  examples: { word: string; ipa: string; meaningVi: string }[];
  memoryMnemonicVi: string;
}

export interface GrammarStativeVerbCategory {
  categoryName: string;
  verbs: string[];
  notesVi: string;
}

export interface GrammarDualMeaningVerb {
  verb: string;
  stativeMeaning: string;
  stativeExample: string;
  dynamicMeaning: string;
  dynamicExample: string;
  explanationVi: string;
}

export interface GrammarFrequencyAdverbItem {
  adverb: string;
  percentage: number;
  meaningVi: string;
  sampleSentence: string;
}

export interface GrammarTenseComparison {
  otherTenseName: string;
  keyDifferencesVi: string[];
  comparisonExamples: {
    currentTenseExample: string;
    currentMeaningVi: string;
    otherTenseExample: string;
    otherMeaningVi: string;
    distinctionAnalysisVi: string;
  }[];
}

export interface CoreGrammarTheoryLesson {
  id: string;
  title: string;
  subtitle: string;
  targetBand: string;
  estimatedMinutes: number;
  category: "tenses" | "relative_clauses" | "passive_voice" | "conditionals" | "present_simple" | "past_simple" | "present_perfect" | "comparisons";
  step1Concept: {
    corePrinciplesVi: string[];
    mechanismAnalysisVi: string;
    formulaSummary: string;
    foundationalExamples: GrammarFoundationalExample[];
    detailedUsages?: GrammarDetailedUsage[];
    conjugationTableBe?: GrammarConjugationRow[];
    conjugationTableAction?: GrammarConjugationRow[];
    spellingRules?: GrammarSpellingRule[];
    pronunciationGuides?: GrammarPronunciationGuide[];
    stativeVerbsGuide?: {
      overviewVi: string;
      categories: GrammarStativeVerbCategory[];
      dualMeaningVerbs?: GrammarDualMeaningVerb[];
    };
    frequencyAdverbsGuide?: {
      overviewVi: string;
      positionRulesVi: string[];
      adverbsList: GrammarFrequencyAdverbItem[];
    };
    tenseComparison?: GrammarTenseComparison;
  };
  step2Traps: {
    examinerTraps: GrammarExaminerTrap[];
  };
  step3Band85Dissections: {
    academicDissections: GrammarBand85Dissection[];
  };
  gatewayQuestions: GatewayQuizQuestion[];
  unlockedPracticeModule: {
    id: string;
    nameVi: string;
    href: string;
    descriptionVi: string;
  };
}

export const MOCK_GRAMMAR_THEORY_LESSONS: CoreGrammarTheoryLesson[] = [
  // =========================================================================
  // [PHASE 1 — GIAI ĐOẠN 1] LỘ TRÌNH 14 NGÀY CỨU NGỮ PHÁP CẤP TỐC (12/9 - 25/9/2026)
  // =========================================================================
{
    "id": "day1-present-simple-to-be",
    "title": "Ngày 1: Động Từ To Be (Am / Is / Are) • Xóa Sổ Lỗi 'I Am Agree'",
    "subtitle": "Bản chất dấu bằng (=) • Cách dùng Am/Is/Are • Thần chú diệt thói quen dịch word-by-word",
    "targetBand": "Band 4.0 ➔ 5.0",
    "estimatedMinutes": 12,
    "category": "present_simple",
    "step1Concept": {
      "corePrinciplesVi": [
        "Bản chất Dấu Bằng (=): Động từ 'To Be' trong tiếng Anh hoạt động hệt như một dấu bằng trong toán học. Nó dùng để nối Chủ ngữ với một Tính từ (mô tả tính chất, cảm xúc) hoặc một Danh từ (mô tả danh tính, chức vụ). Nó KHÔNG hề có bất kỳ một hành động chuyển động nào ở đây.",
        "Phân chia thần tốc: 'I' đi với 'am'; 'He / She / It / Danh từ số ít' đi với 'is'; 'You / We / They / Danh từ số nhiều' đi với 'are'. Hãy ghi nhớ bằng âm điệu: 'I am - He is - They are'.",
        "Thần chú triệt tiêu thói quen dịch word-by-word: Trong tiếng Việt ta nói 'Tôi đồng ý', người mới học hay nghĩ 'Tôi là = I am' rồi ghép thành 'I am agree'. Đây là lỗi sai ngớ ngẩn và phổ biến nhất thế giới! 'Agree' là một động từ thường chỉ quan điểm, KHÔNG BAO GIỜ đi kèm 'am'. Chỉ được nói 'I agree' hoặc 'I am in agreement'."
      ],
      "mechanismAnalysisVi": "Tại sao tiếng Anh bắt buộc có 'To Be'? Trong ngôn ngữ học, To Be là một 'copula' (từ liên kết). Khác với tiếng Việt (ta có thể nói 'Cô ấy đẹp' mà không cần từ nào ở giữa), tiếng Anh quy định mọi câu độc lập bắt buộc phải có Động từ. Vì 'beautiful' chỉ là tính từ nên tiếng Anh phải mượn 'is' để làm cầu nối ngữ pháp: 'She is beautiful'.",
      "formulaSummary": "1. KHẲNG ĐỊNH:\n   (+) S + am / is / are + Adj / Noun\n   • I am a university student.\n   • Higher education is essential.\n\n2. PHỦ ĐỊNH:\n   (-) S + am / is / are + not + Adj / Noun\n   • The tuition fee is not cheap.\n   • We are not in agreement.\n\n3. CÂU HỎI:\n   (?) Am / Is / Are + S + Adj / Noun?\n   • Is public transport effective in your city?\n   ➔ Yes, it is. / No, it isn't.",
      "foundationalExamples": [
        {
          "en": "Public transport in metropolitan areas is relatively efficient.",
          "vi": "Phương tiện giao thông công cộng tại các vùng đô thị tương đối hiệu quả.",
          "syntacticBreakdown": "Public transport (S - không đếm được) + is (To Be) + relatively efficient (Cụm tính từ)."
        },
        {
          "en": "Renewable energy is a viable solution for climate change.",
          "vi": "Năng lượng tái tạo là một giải pháp khả thi cho biến đổi khí hậu.",
          "syntacticBreakdown": "Renewable energy (S) + is (To Be) + a viable solution (Cụm danh từ)."
        },
        {
          "en": "Many young graduates are anxious about their future employment.",
          "vi": "Nhiều sinh viên mới tốt nghiệp cảm thấy lo lắng về cơ hội việc làm tương lai.",
          "syntacticBreakdown": "Many young graduates (S số nhiều) + are (To Be) + anxious (Adj) + about their future employment."
        }
      ],
      "detailedUsages": [
        {
          "scenarioTitle": "Định nghĩa khái niệm trong IELTS Writing Task 2 (Thesis Statement / Topic Sentence)",
          "badgeIelts": "Writing Task 2",
          "explanationVi": "Dùng To Be để đưa ra định nghĩa hoặc nhận định mang tính chân lý khách quan, tạo sự đanh thép cho luận điểm.",
          "ieltsApplicationVi": "Viết câu mở bài hoặc câu chủ đề (Topic sentence) trong thân bài.",
          "examples": [
            {
              "en": "Education is the primary catalyst for economic development.",
              "vi": "Giáo dục là chất xúc tác hàng đầu cho sự phát triển kinh tế.",
              "analysis": "Dùng 'is' để liên kết chủ ngữ 'Education' với định nghĩa 'the primary catalyst'."
            }
          ]
        },
        {
          "scenarioTitle": "Giới thiệu bản thân và bộc lộ cảm xúc trong IELTS Speaking Part 1",
          "badgeIelts": "Speaking Part 1",
          "explanationVi": "Mô tả nghề nghiệp, trạng thái hiện tại hoặc tính cách một cách trôi chảy, phản xạ tự nhiên.",
          "ieltsApplicationVi": "Trả lời các câu hỏi về Hometown, Studies, Work, Hobbies.",
          "examples": [
            {
              "en": "I am an undergraduate majoring in computer science.",
              "vi": "Tôi là sinh viên đại học chuyên ngành khoa học máy tính.",
              "analysis": "Dùng 'am' đi liền sau 'I' để giới thiệu danh tính nghề nghiệp."
            }
          ]
        }
      ],
      "conjugationTableBe": [
        {
          "subjectGroup": "I",
          "affirmative": "I am (I'm) a student.",
          "negative": "I am not (I'm not) ready.",
          "interrogative": "Am I on the right track?",
          "shortAnswer": "Yes, you are. / No, you aren't."
        },
        {
          "subjectGroup": "He / She / It / N số ít",
          "affirmative": "He is (He's) diligent.",
          "negative": "He is not (isn't) careless.",
          "interrogative": "Is the policy effective?",
          "shortAnswer": "Yes, it is. / No, it isn't."
        },
        {
          "subjectGroup": "You / We / They / N số nhiều",
          "affirmative": "They are (They're) supportive.",
          "negative": "They are not (aren't) opposed.",
          "interrogative": "Are renewable sources reliable?",
          "shortAnswer": "Yes, they are. / No, they aren't."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy 'I am agree' — Lỗi sai kinh điển số 1 của người Việt",
          "band50WrongExample": "I am agree with the opinion that smoking should be banned.",
          "band50TranslationVi": "Tôi đồng ý với quan điểm rằng hút thuốc nên bị cấm.",
          "band50FlawAnalysisVi": "Thí sinh ghép 'I am' (Tôi là) với 'agree' (đồng ý). Vì 'agree' đã là một động từ thường hoàn chỉnh, việc nhét thêm 'am' khiến câu có 2 động từ chính chen chúc, phá vỡ cấu trúc ngữ pháp cơ bản.",
          "band80CorrectExample": "I completely agree with the viewpoint that smoking should be strictly prohibited.",
          "band80TranslationVi": "Tôi hoàn toàn đồng ý với quan điểm rằng việc hút thuốc nên bị nghiêm cấm.",
          "examinerNoteVi": "Quy tắc vàng: Nếu đã dùng 'agree', 'disagree', 'think', 'believe', TUYỆT ĐỐI KHÔNG dùng To Be phía trước!"
        },
        {
          "trapNameVi": "Bẫy bỏ quên To Be khi dịch theo quán tính tiếng Việt",
          "band50WrongExample": "Online learning very convenient for busy workers.",
          "band50TranslationVi": "Học trực tuyến rất tiện lợi cho người đi làm bận rộn.",
          "band50FlawAnalysisVi": "Trong tiếng Việt ta nói 'Học trực tuyến rất tiện', không có chữ 'là'. Thí sinh dịch thô từng từ nên quên mất 'convenient' là tính từ và câu đang thiếu hoàn toàn vị ngữ (To Be).",
          "band80CorrectExample": "Online learning is exceptionally convenient for full-time employees.",
          "band80TranslationVi": "Học trực tuyến đặc biệt thuận tiện cho các nhân viên làm việc toàn thời gian.",
          "examinerNoteVi": "Mọi tính từ khi làm vị ngữ trong tiếng Anh bắt buộc phải có To Be làm cầu nối!"
        },
        {
          "trapNameVi": "Bẫy nhầm lẫn tính từ đuôi -ed và đuôi -ing với To Be",
          "band50WrongExample": "I am boring because the lecture is not interesting.",
          "band50TranslationVi": "Tôi là người nhàm chán vì bài giảng không thú vị.",
          "band50FlawAnalysisVi": "'I am boring' nghĩa là bản thân tôi là người tẻ nhạt, gây chán chường cho người khác! Khi muốn mô tả cảm xúc bản thân bị tác động, phải dùng đuôi -ed: 'I am bored'.",
          "band80CorrectExample": "I feel bored whenever the speaker presents monotonous statistics.",
          "band80TranslationVi": "Tôi cảm thấy buồn chán bất cứ khi nào diễn giả trình bày các số liệu đơn điệu.",
          "examinerNoteVi": "Chủ thể người cảm nhận ➔ Dùng To Be + V-ed/Adj-ed (bored, interested, excited). Sự vật tạo ra tính chất ➔ Dùng To Be + V-ing/Adj-ing (boring, interesting, exciting)."
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Vocational education is an indispensable catalyst for long-term economic stability.",
          "vietnameseTranslation": "Giáo dục nghề nghiệp là một chất xúc tác không thể thiếu cho sự ổn định kinh tế lâu dài.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "To Be (is) + Cụm danh từ cao cấp (Noun Phrase) + Giới từ chỉ mục đích",
          "academicNuanceVi": "Câu sử dụng 'is' để đưa ra một định nghĩa đanh thép, mang tính chân lý học thuật không thể tranh cãi trong phần Thesis Statement của Writing Task 2.",
          "keyCollocations": [
            "indispensable catalyst (chất xúc tác không thể thiếu)",
            "long-term economic stability (sự ổn định kinh tế dài hạn)"
          ]
        },
        {
          "originalSentence": "Public healthcare systems are undeniably overwhelmed by the rapidly growing elderly demographic.",
          "vietnameseTranslation": "Các hệ thống y tế công cộng không thể phủ nhận đang bị quá tải bởi nhóm nhân khẩu học người cao tuổi đang gia tăng nhanh chóng.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Chủ ngữ số nhiều + are + Trạng từ học thuật (undeniably) + Phân từ tính từ (overwhelmed)",
          "academicNuanceVi": "Chèn trạng từ 'undeniably' giữa 'are' và tính từ 'overwhelmed' giúp tăng trọng lượng học thuật và thể hiện sự tinh tế trong kiểm soát ngữ điệu.",
          "keyCollocations": [
            "undeniably overwhelmed (không thể phủ nhận bị quá tải)",
            "elderly demographic (nhóm dân số người cao tuổi)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d1_q1",
        "question": "Chọn câu đúng ngữ pháp hoàn toàn trong các câu sau:",
        "options": [
          "A. I am agree with the government's decision.",
          "B. I agree with the government's decision.",
          "C. I am agree with government's decision.",
          "D. I am agreed with the government's decision."
        ],
        "correctIndex": 1,
        "trapExplanation": "Agree là động từ thường chỉ quan điểm, tuyệt đối không ghép To Be 'am' vào trước. Câu B là đáp án chuẩn xác nhất.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d1_q2",
        "question": "Điền dạng To Be thích hợp: 'The consequences of environmental degradation _____ severe.'",
        "options": [
          "A. is",
          "B. are",
          "C. be",
          "D. was"
        ],
        "correctIndex": 1,
        "trapExplanation": "Chủ ngữ chính là 'The consequences' (danh từ số nhiều), không phải 'environmental degradation'. Vì vậy To Be bắt buộc phải là 'are'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d1_q3",
        "question": "Câu nào mắc lỗi sai ngữ pháp khi dùng To Be?",
        "options": [
          "A. The new public library is extremely modern.",
          "B. Many university graduates are anxious about job prospects.",
          "C. Solar energy very effective in tropical countries.",
          "D. These solutions are practical and cost-effective."
        ],
        "correctIndex": 2,
        "trapExplanation": "Câu C bị thiếu động từ To Be 'is' trước cụm tính từ 'very effective' (Solar energy is very effective...).",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Viết Câu Chuẩn S-V-O",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành viết 10 câu IELTS Writing chuẩn cấu trúc To Be không mắc lỗi dịch thô."
    }
  },
  {
    "id": "day2-present-simple-verbs",
    "title": "Ngày 2: Động Từ Thường & Quy Tắc 'Một Chữ S Duy Nhất' (He / She / It)",
    "subtitle": "Thói quen & Chân lý • Thần chú số ít ăn S • Trợ động từ Do / Does mượn trả",
    "targetBand": "Band 4.0 ➔ 5.0",
    "estimatedMinutes": 15,
    "category": "present_simple",
    "step1Concept": {
      "corePrinciplesVi": [
        "Động từ thường là 'Động cơ xe máy': Khác với To Be chỉ đứng yên mô tả tính chất, động từ thường (work, provide, facilitate, generate) mang hành động chuyển động thực tế.",
        "Quy tắc 'Một chữ S duy nhất': Khi chủ ngữ là ngôi thứ 3 số ít (He, She, It, the government, an individual), động từ BẮT BUỘC phải mang đuôi '-s' hoặc '-es' (He works, The policy facilitates). Nếu chủ ngữ đã là số nhiều (They, Students, People), động từ giữ nguyên thể (They work).",
        "Thần chú 'Mượn Does trả V nguyên': Khi ở dạng phủ định (doesn't) hoặc câu hỏi (Does...?), chữ 'S' đã nhảy vào trợ động từ 'Does' rồi, vì vậy động từ chính PHẢI trả về nguyên thể. Tuyệt đối KHÔNG được viết 'He doesn't works'!"
      ],
      "mechanismAnalysisVi": "Quy tắc hòa hợp Chủ - Vị (Subject-Verb Agreement) là tiêu chí hàng đầu mà giám khảo IELTS dùng để đo độ chuẩn xác ngữ pháp ở Band 5.0 - 6.0. Sai sót ở đuôi -s/-es thể hiện sự thiếu phản xạ cơ bản, ngay lập tức kéo điểm Grammatical Range & Accuracy xuống dưới 5.0.",
      "formulaSummary": "1. KHẲNG ĐỊNH:\n   • S (I/You/We/They/Ns) + V(nguyên thể)\n   • S (He/She/It/N số ít) + V(-s / -es)\n\n2. PHỦ ĐỊNH:\n   • S (I/You/We/They) + do not (don't) + V(nguyên thể)\n   • S (He/She/It) + does not (doesn't) + V(nguyên thể)\n\n3. CÂU HỎI:\n   • Do / Does + S + V(nguyên thể)?",
      "foundationalExamples": [
        {
          "en": "The government allocates a substantial budget to scientific research each year.",
          "vi": "Chính phủ phân bổ một ngân sách đáng kể cho nghiên cứu khoa học mỗi năm.",
          "syntacticBreakdown": "The government (S số ít) + allocates (V thêm -s) + a substantial budget (O) + to scientific research."
        },
        {
          "en": "Social media platforms provide instant access to global information.",
          "vi": "Các nền tảng mạng xã hội cung cấp khả năng tiếp cận tức thì với thông tin toàn cầu.",
          "syntacticBreakdown": "Social media platforms (S số nhiều) + provide (V nguyên thể) + instant access (O)."
        },
        {
          "en": "Excessive stress does not improve academic performance.",
          "vi": "Căng thẳng quá mức không hề cải thiện kết quả học tập.",
          "syntacticBreakdown": "Excessive stress (S không đếm được) + does not improve (doesn't + V nguyên thể) + academic performance."
        }
      ],
      "spellingRules": [
        {
          "ruleNameVi": "Động từ tận cùng bằng -o, -ch, -sh, -ss, -x, -z",
          "conditionVi": "Khi đi với He/She/It và danh từ số ít",
          "transformationVi": "Thêm đuôi '-es'",
          "examples": [
            "watch ➔ watches",
            "go ➔ goes",
            "focus ➔ focuses",
            "reach ➔ reaches"
          ],
          "memoryTrickVi": "Mẹo nhớ câu thần chú: 'Ông (o) Chín (ch) Sợ (sh) Sâu (ss) Xuất (x) Xứ (z)'"
        },
        {
          "ruleNameVi": "Động từ tận cùng bằng 'Phụ âm + y'",
          "conditionVi": "Trước 'y' là một phụ âm (như d, r, l, t...)",
          "transformationVi": "Đổi 'y' thành 'i' rồi thêm '-es'",
          "examples": [
            "study ➔ studies",
            "apply ➔ applies",
            "rely ➔ relies"
          ],
          "memoryTrickVi": "Nếu trước 'y' là nguyên âm (u, e, o, a, i) thì CHỈ thêm -s thông thường: play ➔ plays, employ ➔ employs."
        }
      ],
      "frequencyAdverbsGuide": {
        "overviewVi": "Trạng từ chỉ tần suất (always, usually, often, sometimes, rarely, never) đứng TRƯỚC động từ thường nhưng đứng SAU động từ To Be.",
        "positionRulesVi": [
          "Đứng TRƯỚC động từ thường: S + Adv + V (e.g., 'He often exercises.')",
          "Đứng SAU động từ To Be: S + To Be + Adv (e.g., 'He is always punctual.')"
        ],
        "adverbsList": [
          {
            "adverb": "Always",
            "percentage": 100,
            "meaningVi": "Luôn luôn",
            "sampleSentence": "She always reviews her notes before lectures."
          },
          {
            "adverb": "Frequently",
            "percentage": 80,
            "meaningVi": "Thường xuyên",
            "sampleSentence": "Urban residents frequently encounter traffic congestion."
          },
          {
            "adverb": "Occasionally",
            "percentage": 40,
            "meaningVi": "Thỉnh thoảng",
            "sampleSentence": "I occasionally read scientific journals."
          },
          {
            "adverb": "Rarely",
            "percentage": 10,
            "meaningVi": "Hiếm khi",
            "sampleSentence": "Rural areas rarely experience severe air pollution."
          }
        ]
      }
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy 'People thinks' — Nhầm lẫn danh từ số nhiều bất quy tắc",
          "band50WrongExample": "Many people thinks that money brings happiness.",
          "band50TranslationVi": "Nhiều người nghĩ rằng tiền bạc mang lại hạnh phúc.",
          "band50FlawAnalysisVi": "'People' là danh từ số nhiều của 'person'. Vì là chủ ngữ số nhiều, động từ bắt buộc phải giữ nguyên thể không có 's'.",
          "band80CorrectExample": "Many people believe that financial wealth inherently fosters contentment.",
          "band80TranslationVi": "Nhiều người tin rằng của cải tài chính vốn dĩ nuôi dưỡng sự hài lòng.",
          "examinerNoteVi": "Hãy nhớ danh từ số nhiều không có đuôi -s: people, children, women, men, teeth, feet ➔ Động từ giữ nguyên!"
        },
        {
          "trapNameVi": "Bẫy giữ đuôi -s sau trợ động từ 'doesn't'",
          "band50WrongExample": "The modern lifestyle doesn't encourages physical activity.",
          "band50TranslationVi": "Lối sống hiện đại không khuyến khích hoạt động thể chất.",
          "band50FlawAnalysisVi": "Đã mượn 'doesn't' (chữ 's' đã nằm trong does) nhưng thí sinh vẫn chia 'encourages'. Đây là lỗi thừa thãi nghiêm trọng.",
          "band80CorrectExample": "A sedentary lifestyle does not encourage regular physical exercise.",
          "band80TranslationVi": "Lối sống ít vận động không hề khuyến khích việc tập thể dục đều đặn.",
          "examinerNoteVi": "Công thức bất di bất dịch: Do / Does / Don't / Doesn't + V NGUYÊN THỂ 100%."
        },
        {
          "trapNameVi": "Bẫy dùng 'don't' cho chủ ngữ số ít",
          "band50WrongExample": "He don't have enough time to finish the assignment.",
          "band50TranslationVi": "Anh ấy không có đủ thời gian để hoàn thành bài tập.",
          "band50FlawAnalysisVi": "Chủ ngữ 'He' là ngôi thứ 3 số ít, trợ động từ phủ định bắt buộc phải là 'doesn't', không được nói bồi 'don't'.",
          "band80CorrectExample": "He does not possess sufficient time to complete the academic assignment.",
          "band80TranslationVi": "Anh ấy không có đủ thời gian để hoàn tất bài tập học thuật.",
          "examinerNoteVi": "Phản xạ: He / She / It ➔ Đi với DOES / DOESN'T."
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Technological innovation continuously transforms conventional manufacturing paradigms worldwide.",
          "vietnameseTranslation": "Sự đổi mới công nghệ liên tục biến đổi các mô hình sản xuất truyền thống trên toàn cầu.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Chủ ngữ số ít (Technological innovation) + Trạng từ (continuously) + Động từ số ít thêm -s (transforms)",
          "academicNuanceVi": "Động từ 'transforms' diễn tả một sự thật khách quan đang định hình thế giới, dùng hiện tại đơn để khẳng định giá trị chân lý lâu dài.",
          "keyCollocations": [
            "technological innovation (sự đổi mới công nghệ)",
            "conventional manufacturing paradigms (các mô hình sản xuất truyền thống)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d2_q1",
        "question": "Chọn câu đúng ngữ pháp nhất:",
        "options": [
          "A. The government provide financial subsidies to green businesses.",
          "B. The government provides financial subsidies to green businesses.",
          "C. The government does provides financial subsidies to green businesses.",
          "D. The government don't provide financial subsidies to green businesses."
        ],
        "correctIndex": 1,
        "trapExplanation": "'The government' là danh từ số ít, động từ thường phải thêm đuôi -s (provides). Đáp án B hoàn toàn chính xác.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d2_q2",
        "question": "Tìm lỗi sai trong câu: 'She doesn't understands why the experiment failed.'",
        "options": [
          "A. She doesn't",
          "B. understands",
          "C. why",
          "D. failed"
        ],
        "correctIndex": 1,
        "trapExplanation": "Sau trợ động từ 'doesn't', động từ chính phải ở dạng nguyên thể không có 's' (understand, không phải understands).",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d2_q3",
        "question": "Điền dạng đúng của động từ: 'Scientific research consistently _____ (demonstrate) the benefits of a balanced diet.'",
        "options": [
          "A. demonstrate",
          "B. demonstrates",
          "C. is demonstrate",
          "D. demonstrated"
        ],
        "correctIndex": 1,
        "trapExplanation": "'Scientific research' là danh từ không đếm được (tương đương số ít), vì vậy động từ phải thêm -s thành 'demonstrates'.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Hòa Hợp Chủ - Vị S-V",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Luyện phản xạ thêm -s/-es và dùng do/does chuẩn 100% không còn vấp váp."
    }
  },
  {
    "id": "day3-present-continuous",
    "title": "Ngày 3: Hiện Tại Tiếp Diễn (Be + V-ing) • Đang Diễn Ra vs Thói Quen & Bẫy Stative Verbs",
    "subtitle": "Hành động ngay lúc nói • Xu hướng biến đổi trong Task 1 & 2 • Tuyệt đối không thêm -ing với know/understand",
    "targetBand": "Band 4.5 ➔ 5.5",
    "estimatedMinutes": 15,
    "category": "tenses",
    "step1Concept": {
      "corePrinciplesVi": [
        "Bộ đôi không tách rời: Công thức bất di bất dịch của thì tiếp diễn là: `S + am / is / are + V-ing`. Tuyệt đối không được 'ăn bớt' To Be như thói quen tiếng bồi: 'I studying English' (SAI ➔ 'I am studying English').",
        "2 Ứng dụng sống còn trong IELTS: (1) Mô tả hành động đang diễn ra tạm thời ở Speaking Part 1 ('Currently, I am preparing for my graduation thesis'); (2) Mô tả một XU HƯỚNG đang chuyển dịch mạnh mẽ trong xã hội ở Task 2 ('The number of remote workers is increasing rapidly').",
        "Bẫy Stative Verbs (Động từ chỉ trạng thái): Nhóm động từ chỉ nhận thức, cảm xúc, sở hữu (know, understand, believe, think, like, want, belong, contain) KHÔNG BAO GIỜ chia ở thì tiếp diễn. Không ai nói 'I am knowing this' (SAI ➔ 'I know this')."
      ],
      "mechanismAnalysisVi": "Trong học thuật, Hiện tại tiếp diễn được gọi là thì mang tính 'aspectual change' (thay đổi diện mạo). Khi thí sinh dùng 'is rising' hay 'is shifting', người đọc cảm nhận được chuyển động của số liệu hoặc xu hướng xã hội đang diễn ra trước mắt.",
      "formulaSummary": "1. KHẲNG ĐỊNH:\n   (+) S + am / is / are + V-ing\n   • The global temperature is rising.\n   • Many companies are adopting artificial intelligence.\n\n2. PHỦ ĐỊNH:\n   (-) S + am / is / are + not + V-ing\n   • The unemployment rate is not decreasing.\n\n3. CÂU HỎI:\n   (?) Am / Is / Are + S + V-ing?\n   • Are renewable energies becoming more affordable?",
      "foundationalExamples": [
        {
          "en": "The proportion of elderly citizens is growing steadily in many developed nations.",
          "vi": "Tỷ lệ công dân cao tuổi đang gia tăng đều đặn tại nhiều quốc gia phát triển.",
          "syntacticBreakdown": "The proportion of elderly citizens (S số ít) + is growing (is + V-ing) + steadily (Adv)."
        },
        {
          "en": "More students are opting for vocational training instead of university degrees.",
          "vi": "Ngày càng nhiều học sinh đang lựa chọn học nghề thay vì bằng đại học.",
          "syntacticBreakdown": "More students (S số nhiều) + are opting (are + V-ing) + for vocational training."
        }
      ],
      "stativeVerbsGuide": {
        "overviewVi": "Stative Verbs là những động từ chỉ cảm xúc, nhận thức, giác quan và sự sở hữu. Chúng không thể chia ở thì tiếp diễn (-ing) trừ khi đổi nghĩa sang hành động có chủ đích.",
        "categories": [
          {
            "categoryName": "Cảm xúc & Ý muốn",
            "verbs": [
              "like",
              "love",
              "hate",
              "prefer",
              "want",
              "wish",
              "need"
            ],
            "notesVi": "Không dùng: I am wanting ➔ Dùng: I want."
          },
          {
            "categoryName": "Nhận thức & Suy nghĩ",
            "verbs": [
              "know",
              "understand",
              "believe",
              "remember",
              "recognize",
              "doubt"
            ],
            "notesVi": "Không dùng: I am knowing ➔ Dùng: I know."
          },
          {
            "categoryName": "Sở hữu & Bản chất",
            "verbs": [
              "belong",
              "own",
              "possess",
              "contain",
              "consist of",
              "include"
            ],
            "notesVi": "Không dùng: It is belonging to ➔ Dùng: It belongs to."
          }
        ],
        "dualMeaningVerbs": [
          {
            "verb": "think",
            "stativeMeaning": "Có quan điểm, tin rằng",
            "stativeExample": "I think this policy is effective. (Quan điểm - KHÔNG chia -ing)",
            "dynamicMeaning": "Đang suy ngẫm, cân nhắc trong đầu",
            "dynamicExample": "I am thinking about changing my major. (Hành động cân nhắc - DÙNG -ing)",
            "explanationVi": "Khi mang nghĩa suy nghĩ/cân nhắc hành động thì chia -ing được, khi mang nghĩa 'tin rằng' thì chỉ dùng Hiện tại đơn."
          }
        ]
      }
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy chia -ing cho Stative Verbs",
          "band50WrongExample": "I am understanding the lecture very well today.",
          "band50TranslationVi": "Tôi đang hiểu bài giảng rất rõ hôm nay.",
          "band50FlawAnalysisVi": "'Understand' là trạng thái nhận thức của não bộ, không thể diễn tiến như một hành động chân tay, bắt buộc phải dùng Hiện tại đơn.",
          "band80CorrectExample": "I thoroughly understand the lecturer's core arguments.",
          "band80TranslationVi": "Tôi thấu hiểu triệt để các lập luận cốt lõi của giảng viên.",
          "examinerNoteVi": "Nhớ danh sách cấm -ing: know, understand, believe, want, need."
        },
        {
          "trapNameVi": "Bẫy rơi rụng To Be trong câu tiếp diễn",
          "band50WrongExample": "The cost of living increasing dramatically in large cities.",
          "band50TranslationVi": "Chi phí sinh hoạt đang tăng chóng mặt ở các thành phố lớn.",
          "band50FlawAnalysisVi": "Thí sinh chỉ viết 'increasing' mà quên mất 'is'. Đây là câu què cụt (Sentence fragment) vì không có động từ hữu hạn.",
          "band80CorrectExample": "The cost of living is increasing dramatically in major urban centers.",
          "band80TranslationVi": "Chi phí sinh hoạt đang gia tăng một cách chóng mặt tại các trung tâm đô thị lớn.",
          "examinerNoteVi": "Tuyệt đối không để V-ing đứng một mình làm vị ngữ chính mà thiếu To Be!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Consumer behavior is rapidly shifting toward sustainable and environmentally friendly products.",
          "vietnameseTranslation": "Hành vi người tiêu dùng đang chuyển dịch nhanh chóng sang các sản phẩm bền vững và thân thiện với môi trường.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Present Continuous diễn đạt xu hướng xã hội (is rapidly shifting) + Giới từ định hướng (toward)",
          "academicNuanceVi": "Cấu trúc này mô tả một làn sóng chuyển động đương đại trong xã hội, rất được giám khảo ưa chuộng khi viết mở đoạn thân bài Task 2.",
          "keyCollocations": [
            "consumer behavior (hành vi người tiêu dùng)",
            "rapidly shifting toward (chuyển dịch nhanh chóng về phía)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d3_q1",
        "question": "Chọn câu đúng chuẩn ngữ pháp IELTS:",
        "options": [
          "A. The number of international students is increasing significantly.",
          "B. The number of international students increasing significantly.",
          "C. The number of international students are increasing significantly.",
          "D. The number of international students is increase significantly."
        ],
        "correctIndex": 0,
        "trapExplanation": "'The number of...' luôn đi với động từ số ít 'is'. Câu cần đầy đủ 'is increasing'. Đáp án A chính xác.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d3_q2",
        "question": "Động từ nào sau đây KHÔNG ĐƯỢC chia ở thì tiếp diễn trong câu 'I _____ this solution is practical'?",
        "options": [
          "A. believe",
          "B. consider",
          "C. propose",
          "D. discuss"
        ],
        "correctIndex": 0,
        "trapExplanation": "'Believe' là động từ trạng thái chỉ niềm tin/quan điểm, không bao giờ dùng 'I am believing'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d3_q3",
        "question": "Phân biệt nghĩa: 'What are you thinking?' khác với 'What do you think about the movie?' ở điểm nào?",
        "options": [
          "A. Không khác nhau về nghĩa.",
          "B. Câu 1 hỏi bạn đang suy nghĩ gì trong đầu; câu 2 hỏi quan điểm/nhận xét của bạn về bộ phim.",
          "C. Câu 1 sai ngữ pháp vì think không được thêm -ing.",
          "D. Cả hai câu đều hỏi về quá khứ."
        ],
        "correctIndex": 1,
        "trapExplanation": "Think ở thì tiếp diễn hỏi hành động đang suy nghĩ trong tâm trí; think ở hiện tại đơn hỏi quan điểm, ý kiến đánh giá.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Mô Tả Xu Hướng Task 1 & 2",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành viết câu mô tả xu hướng biến đổi và phân biệt chuẩn xác Stative Verbs."
    }
  },
  {
    "id": "day4-past-simple-to-be",
    "title": "Ngày 4: Quá Khứ Đơn với To Be (Was / Were) • Kể Bối Cảnh & Trạng Thái Ngày Xưa",
    "subtitle": "Chân lý quá khứ chấm dứt • Phân biệt Was/Were thần tốc • Tuyệt đối không lẫn lộn Was với Did",
    "targetBand": "Band 4.0 ➔ 5.0",
    "estimatedMinutes": 12,
    "category": "past_simple",
    "step1Concept": {
      "corePrinciplesVi": [
        "Tấm gương soi quá khứ: Was / Were dùng để mô tả trạng thái, cảm xúc, vị trí hoặc thân phận của người/vật trong một khoảng thời gian ĐÃ CHẤM DỨT HOÀN TOÀN trong quá khứ, không còn dính dáng đến hiện tại.",
        "Quy tắc ngón tay phân loại Was / Were: WAS (3 chữ cái - ngắn) dành cho chủ ngữ số ít (I, He, She, It, 1 người/1 vật). WERE (4 chữ cái - dài) dành cho chủ ngữ số nhiều (You, We, They, 2 người/vật trở lên).",
        "Tuyệt đối không ghép Was/Were với Did: Was/Were là động từ To Be, tự nó làm phủ định (was not / were not) và tự đảo lên đầu làm câu hỏi. KHÔNG BAO GIỜ có chuyện 'I didn't was there' (SAI ➔ 'I was not there') hay 'Was you visit him?' (SAI ➔ 'Did you visit him?')."
      ],
      "mechanismAnalysisVi": "Khi làm bài Speaking Part 2 (Kể về một kỷ niệm thời thơ ấu, một chuyến đi trong quá khứ), giám khảo sẽ lắng nghe Was/Were để đánh giá khả năng duy trì khung thời gian quá khứ của bạn.",
      "formulaSummary": "1. KHẲNG ĐỊNH:\n   (+) S (I/He/She/It/N số ít) + was + Adj / Noun\n       S (You/We/They/N số nhiều) + were + Adj / Noun\n   • The event was extremely successful.\n   • The participants were satisfied.\n\n2. PHỦ ĐỊNH:\n   (-) S + was not (wasn't) / were not (weren't) + Adj / Noun\n   • The infrastructure was not adequate in 1990.\n\n3. CÂU HỎI:\n   (?) Was / Were + S + Adj / Noun?\n   • Were you interested in science as a child?",
      "foundationalExamples": [
        {
          "en": "In the 1990s, mobile phones were luxurious items accessible only to wealthy individuals.",
          "vi": "Vào những năm 1990, điện thoại di động là những món đồ xa xỉ chỉ người giàu mới tiếp cận được.",
          "syntacticBreakdown": "In the 1990s (Trạng ngữ thời gian) + mobile phones (S số nhiều) + were (To Be quá khứ) + luxurious items (Cụm danh từ)."
        },
        {
          "en": "The initial cost of solar panel installation was remarkably high.",
          "vi": "Chi phí ban đầu của việc lắp đặt tấm pin năng lượng mặt trời từng cao đáng kể.",
          "syntacticBreakdown": "The initial cost (S số ít) + was (To Be quá khứ) + remarkably high (Cụm tính từ)."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy dùng trợ động từ Did để phủ định To Be",
          "band50WrongExample": "I didn't was at the conference yesterday because of illness.",
          "band50TranslationVi": "Hôm qua tôi không có mặt ở hội thảo vì bị ốm.",
          "band50FlawAnalysisVi": "To Be tự nó phủ định bằng cách thêm 'not' (was not / wasn't). Dùng 'didn't was' là lỗi sai nghiêm trọng.",
          "band80CorrectExample": "I was absent from the conference yesterday due to an unexpected illness.",
          "band80TranslationVi": "Tôi đã vắng mặt tại buổi hội thảo hôm qua do một cơn ốm bất ngờ.",
          "examinerNoteVi": "Chỉ dùng didn't với ĐỘNG TỪ THƯỜNG (didn't go, didn't attend). Với To Be: dùng wasn't / weren't!"
        },
        {
          "trapNameVi": "Bẫy dùng Was cho chủ ngữ You hoặc We/They",
          "band50WrongExample": "You was very supportive during my preparation.",
          "band50TranslationVi": "Bạn đã rất ủng hộ trong suốt quá trình chuẩn bị của tôi.",
          "band50FlawAnalysisVi": "'You' trong tiếng Anh luôn luôn đi với động từ số nhiều 'were', không phân biệt là một người hay nhiều người.",
          "band80CorrectExample": "You were exceptionally supportive throughout my examination preparation.",
          "band80TranslationVi": "Bạn đã đặc biệt ủng hộ tôi trong suốt quá trình chuẩn bị kỳ thi.",
          "examinerNoteVi": "Ghi nhớ: You WERE, We WERE, They WERE."
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Prior to the industrial revolution, agrarian practices were the dominant source of national livelihood.",
          "vietnameseTranslation": "Trước cuộc cách mạng công nghiệp, các tập quán nông nghiệp từng là nguồn sinh kế chủ đạo của quốc gia.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Trạng ngữ quá khứ (Prior to...) + S số nhiều (agrarian practices) + were + Noun phrase",
          "academicNuanceVi": "Dùng 'were' kết hợp với 'Prior to...' để thiết lập bối cảnh lịch sử đối chiếu trong Writing Task 2.",
          "keyCollocations": [
            "prior to (trước thời điểm)",
            "agrarian practices (các tập quán canh tác nông nghiệp)",
            "dominant source of livelihood (nguồn sinh kế chủ đạo)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d4_q1",
        "question": "Chọn câu đúng ngữ pháp:",
        "options": [
          "A. The participants was extremely satisfied with the workshop.",
          "B. The participants were extremely satisfied with the workshop.",
          "C. The participants didn't were satisfied with the workshop.",
          "D. The participants were satisfy with the workshop."
        ],
        "correctIndex": 1,
        "trapExplanation": "'The participants' là danh từ số nhiều nên To Be quá khứ bắt buộc là 'were'. Đáp án B chính xác.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d4_q2",
        "question": "Điền từ vào chỗ trống: 'In 2005, the inflation rate in that country _____ approximately 8%.'",
        "options": [
          "A. is",
          "B. was",
          "C. were",
          "D. has been"
        ],
        "correctIndex": 1,
        "trapExplanation": "Năm 2005 là mốc thời gian quá khứ xác định, chủ ngữ 'the inflation rate' là số ít, vì vậy chọn 'was'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d4_q3",
        "question": "Câu nào sau đây sai ngữ pháp?",
        "options": [
          "A. Why weren't you present at the lecture yesterday?",
          "B. The weather was pleasant during our field trip.",
          "C. She didn't was ready for the interview.",
          "D. Computers were not as prevalent thirty years ago."
        ],
        "correctIndex": 2,
        "trapExplanation": "Câu C sai vì không dùng 'didn't was' mà phải dùng 'wasn't' (She wasn't ready).",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Bối Cảnh Quá Khứ Was/Were",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành thiết lập bối cảnh thời gian quá khứ chuẩn xác cho Speaking Part 2."
    }
  },
  {
    "id": "day5-past-simple-verbs",
    "title": "Ngày 5: Quá Khứ Đơn với Động Từ Thường • Chìa Khóa Vàng Số Liệu Task 1",
    "subtitle": "Đuôi -ed & 50 động từ bất quy tắc cốt lõi • Trợ động từ Did mượn trả • Mô tả năm quá khứ",
    "targetBand": "Band 4.5 ➔ 5.5",
    "estimatedMinutes": 15,
    "category": "past_simple",
    "step1Concept": {
      "corePrinciplesVi": [
        "Chìa khóa vàng chiếm 70% Writing Task 1: Hầu hết các biểu đồ (Line graph, Bar chart, Table) đều có mốc năm trong quá khứ (e.g., between 2000 and 2015, in 2010). Khi thấy năm quá khứ, 100% động từ mô tả xu hướng phải chia Quá Khứ Đơn.",
        "2 Nhóm động từ quá khứ: (1) Có quy tắc: Thêm đuôi -ed (increase ➔ increased, decrease ➔ decreased); (2) Bất quy tắc bắt buộc thuộc: rise ➔ rose, fall ➔ fell, grow ➔ grew, see ➔ saw, spend ➔ spent, choose ➔ chose.",
        "Thần chú 'Mượn Did trả V0': Khi dùng câu phủ định (didn't) hoặc câu hỏi (Did...?), động từ chính PHẢI trả về nguyên thể: 'The figure didn't increase' (KHÔNG PHẢI 'didn't increased')."
      ],
      "mechanismAnalysisVi": "Trong Writing Task 1, thí sinh thường nhầm lẫn giữa nội động từ chỉ xu hướng tự thân (The price increased) và ngoại động từ bị tác động (The tax was increased by the government). Việc dùng sai 'The price was increased' khiến bạn mất trọn điểm Grammar.",
      "formulaSummary": "1. KHẲNG ĐỊNH:\n   (+) S + V-ed / V2 (bất quy tắc)\n   • The figure rose from 20% to 45% in 2015.\n   • The government launched a nationwide campaign.\n\n2. PHỦ ĐỊNH:\n   (-) S + did not (didn't) + V(nguyên thể)\n   • The unemployment rate did not drop significantly.\n\n3. CÂU HỎI:\n   (?) Did + S + V(nguyên thể)?\n   • Did sales figures recover after the crisis?",
      "foundationalExamples": [
        {
          "en": "Between 2000 and 2010, car ownership in the country doubled.",
          "vi": "Từ năm 2000 đến năm 2010, tỷ lệ sở hữu ô tô tại quốc gia này đã tăng gấp đôi.",
          "syntacticBreakdown": "Between 2000 and 2010 (Cụm thời gian) + car ownership (S) + doubled (V quá khứ)."
        },
        {
          "en": "The expenditure on healthcare increased dramatically over the ten-year period.",
          "vi": "Chi tiêu cho y tế đã tăng mạnh mẽ trong suốt giai đoạn 10 năm.",
          "syntacticBreakdown": "The expenditure on healthcare (S) + increased (V-ed) + dramatically (Adv) + over the ten-year period."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy bị động hóa xu hướng tự thân trong Task 1",
          "band50WrongExample": "The number of internet users was increased significantly between 2005 and 2015.",
          "band50TranslationVi": "Số lượng người dùng internet đã được tăng lên đáng kể giữa năm 2005 và 2015.",
          "band50FlawAnalysisVi": "'Increase' trong ngữ cảnh miêu tả số liệu biểu đồ là nội động từ tự biến đổi theo thời gian. Thêm 'was' biến nó thành câu bị động ngớ ngẩn (như thể có ai cầm con số kéo lên).",
          "band80CorrectExample": "The number of internet users increased significantly between 2005 and 2015.",
          "band80TranslationVi": "Số lượng người dùng internet đã tăng lên đáng kể trong khoảng thời gian từ 2005 đến 2015.",
          "examinerNoteVi": "Quy tắc vàng Task 1: Các từ xu hướng (increase, decrease, rise, fall, climb, drop) dùng thể CHỦ ĐỘNG dạng quá khứ: increased, dropped, rose, fell!"
        },
        {
          "trapNameVi": "Bẫy giữ nguyên thì hiện tại khi đề bài có năm quá khứ",
          "band50WrongExample": "In 2010, the proportion of female students rises to 52%.",
          "band50TranslationVi": "Vào năm 2010, tỷ lệ nữ sinh tăng lên 52%.",
          "band50FlawAnalysisVi": "Đề bài đã ghi rõ năm 2010 nhưng thí sinh viết 'rises' (Hiện tại đơn) do thói quen dịch trong đầu.",
          "band80CorrectExample": "In 2010, the proportion of female students rose to 52%.",
          "band80TranslationVi": "Vào năm 2010, tỷ lệ nữ sinh đã tăng lên mức 52%.",
          "examinerNoteVi": "Nhìn thấy năm trong quá khứ ➔ Lập tức khóa chặt động từ ở dạng Quá Khứ Đơn!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "The volume of international trade expanded dramatically throughout the final decade of the twentieth century.",
          "vietnameseTranslation": "Khối lượng thương mại quốc tế đã mở rộng một cách ấn tượng trong suốt thập kỷ cuối cùng của thế kỷ hai mươi.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "S (The volume of international trade) + V-ed quá khứ (expanded) + Adv (dramatically) + Cụm thời gian lịch sử",
          "academicNuanceVi": "Dùng động từ học thuật 'expanded' thay vì 'went up', kết hợp trạng từ 'dramatically' để diễn đạt độ biến thiên mạnh mẽ của số liệu.",
          "keyCollocations": [
            "volume of international trade (khối lượng thương mại quốc tế)",
            "expanded dramatically (mở rộng ấn tượng)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d5_q1",
        "question": "Chọn câu viết đúng chuẩn Task 1 cho số liệu năm 2015:",
        "options": [
          "A. The percentage of graduates was decreased to 30% in 2015.",
          "B. The percentage of graduates decreased to 30% in 2015.",
          "C. The percentage of graduates decreases to 30% in 2015.",
          "D. The percentage of graduates didn't decreased in 2015."
        ],
        "correctIndex": 1,
        "trapExplanation": "'Decreased' là nội động từ mô tả xu hướng số liệu trong quá khứ, chia chủ động ở quá khứ đơn. Câu B hoàn toàn chính xác.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d5_q2",
        "question": "Dạng quá khứ của động từ bất quy tắc 'rise' và 'fall' lần lượt là gì?",
        "options": [
          "A. rised và falled",
          "B. rose và fell",
          "C. risen và fallen",
          "D. rose và felt"
        ],
        "correctIndex": 1,
        "trapExplanation": "Rise ➔ Rose (V2) ➔ Risen (V3). Fall ➔ Fell (V2) ➔ Fallen (V3). Đáp án B đúng.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d5_q3",
        "question": "Tìm lỗi sai trong câu: 'The government didn't implemented the tax reform last year.'",
        "options": [
          "A. The government",
          "B. didn't implemented",
          "C. tax reform",
          "D. last year"
        ],
        "correctIndex": 1,
        "trapExplanation": "Sau trợ động từ 'didn't', động từ chính phải về nguyên thể: 'didn't implement', không được chia -ed.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Viết Xu Hướng Biểu Đồ Task 1",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành viết 10 câu số liệu quá khứ chuẩn xác cho Writing Task 1."
    }
  },
  {
    "id": "day6-present-perfect",
    "title": "Ngày 6: Hiện Tại Hoàn Thành (Have / Has + V3) • Cây Cầu Nối Quá Khứ Tới Hiện Tại",
    "subtitle": "Trải nghiệm không mốc • Hành động kéo dài từ quá khứ tới nay (Since / For) • Vừa mới hoàn thành",
    "targetBand": "Band 4.5 ➔ 5.5",
    "estimatedMinutes": 15,
    "category": "present_perfect",
    "step1Concept": {
      "corePrinciplesVi": [
        "Cây cầu thời gian: Quá khứ nối tới Hiện tại. Nếu một sự việc bắt đầu trong quá khứ, kéo dài qua thời gian và VẪN ĐANG TIẾP TỤC hoặc ĐỂ LẠI KẾT QUẢ RÕ RỆT ở hiện tại ➔ Bắt buộc dùng Hiện Tại Hoàn Thành.",
        "Công thức vàng: `S + have / has + V3 / V-ed`. I/You/We/They đi với `have`; He/She/It/Danh từ số ít đi với `has`.",
        "Bộ đôi song sát: SINCE (đi với mốc thời gian điểm: since 2015, since graduation) vs FOR (đi với khoảng độ dài thời gian: for 10 years, for a long time)."
      ],
      "mechanismAnalysisVi": "Thí sinh Việt Nam hay dùng thì Hiện tại đơn để nói về một việc đã làm nhiều năm ('I live in Hanoi for 5 years'). Người bản xứ nghe câu này sẽ thấy vô cùng gượng gạo vì nó vi phạm nguyên lý thời gian căn bản của tiếng Anh.",
      "formulaSummary": "1. KHẲNG ĐỊNH:\n   (+) S + have / has + V3 / V-ed\n   • I have worked as an engineer for five years.\n   • Technology has revolutionized communication.\n\n2. PHỦ ĐỊNH:\n   (-) S + have not (haven't) / has not (hasn't) + V3 / V-ed\n   • The authorities haven't resolved the housing shortage yet.\n\n3. CÂU HỎI:\n   (?) Have / Has + S + V3 / V-ed?\n   • Have you ever participated in volunteer work?",
      "foundationalExamples": [
        {
          "en": "The widespread adoption of smartphones has fundamentally altered interpersonal relationships.",
          "vi": "Việc ứng dụng rộng rãi điện thoại thông minh đã thay đổi căn bản các mối quan hệ giữa các cá nhân.",
          "syntacticBreakdown": "The widespread adoption... (S số ít) + has fundamentally altered (has + Adv + V3) + interpersonal relationships (O)."
        },
        {
          "en": "Renewable energy technologies have improved substantially over the past two decades.",
          "vi": "Các công nghệ năng lượng tái tạo đã cải thiện đáng kể trong suốt hai thập kỷ qua.",
          "syntacticBreakdown": "Renewable energy technologies (S số nhiều) + have improved (have + V3) + substantially + over the past two decades."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy dùng thì Hiện Tại Đơn cho hành động kéo dài",
          "band50WrongExample": "I live in this city for ten years and I like it very much.",
          "band50TranslationVi": "Tôi sống ở thành phố này được mười năm và tôi rất thích nó.",
          "band50FlawAnalysisVi": "Hành động sống bắt đầu từ 10 năm trước và kéo dài đến nay, bắt buộc phải dùng Hiện tại hoàn thành (have lived). Dùng 'live' là sai thì hoàn toàn.",
          "band80CorrectExample": "I have resided in this city for over a decade, which has given me a deep appreciation for its culture.",
          "band80TranslationVi": "Tôi đã sinh sống tại thành phố này hơn một thập kỷ, điều này mang lại cho tôi sự thấu hiểu sâu sắc văn hóa nơi đây.",
          "examinerNoteVi": "Cứ có 'for + khoảng thời gian' kéo dài tới nay ➔ Dùng HAVE / HAS + V3!"
        },
        {
          "trapNameVi": "Bẫy nhầm lẫn giữa 'Since' và 'For'",
          "band50WrongExample": "She has worked at this hospital since five years.",
          "band50TranslationVi": "Cô ấy đã làm việc tại bệnh viện này từ 5 năm.",
          "band50FlawAnalysisVi": "'Five years' là một khoảng thời gian (khoảng độ dài), bắt buộc phải đi với 'for'. 'Since' chỉ đi với mốc thời gian điểm (since 2018, since last year).",
          "band80CorrectExample": "She has been employed at this hospital for five consecutive years.",
          "band80TranslationVi": "Cô ấy đã làm việc tại bệnh viện này trong năm năm liên tiếp.",
          "examinerNoteVi": "Thần chú: Since + MỐC (điểm xuất phát); For + KHOẢNG (độ dài thời gian)."
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Global carbon emissions have witnessed an unprecedented escalation since the dawn of the industrial era.",
          "vietnameseTranslation": "Lượng khí thải carbon toàn cầu đã chứng kiến sự gia tăng chưa từng có kể từ buổi bình minh của kỷ nguyên công nghiệp.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "S (Global carbon emissions) + have witnessed (Present Perfect) + Noun phrase + Since + mốc thời gian lịch sử",
          "academicNuanceVi": "Cấu trúc 'have witnessed an unprecedented escalation' là vũ khí từ vựng - ngữ pháp đỉnh cao cho Writing Task 2 về môi trường.",
          "keyCollocations": [
            "unprecedented escalation (sự gia tăng chưa từng có)",
            "since the dawn of (kể từ buổi bình minh của)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d6_q1",
        "question": "Chọn câu đúng ngữ pháp nhất:",
        "options": [
          "A. The government has introduced several policies since 2020.",
          "B. The government have introduced several policies since 2020.",
          "C. The government has introduced several policies for 2020.",
          "D. The government introduced several policies since 2020."
        ],
        "correctIndex": 0,
        "trapExplanation": "'The government' là danh từ số ít nên dùng 'has introduced'. '2020' là mốc thời gian nên đi với 'since'. Đáp án A đúng.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d6_q2",
        "question": "Điền từ thích hợp: 'They have collaborated on this research project _____ six months.'",
        "options": [
          "A. since",
          "B. for",
          "C. during",
          "D. in"
        ],
        "correctIndex": 1,
        "trapExplanation": "'Six months' là một khoảng độ dài thời gian, vì vậy phải dùng 'for'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d6_q3",
        "question": "Câu nào mắc lỗi sai ngữ pháp?",
        "options": [
          "A. I have lived here since I was a child.",
          "B. She has finished her assignment already.",
          "C. I live in Hanoi for three years and I still work here.",
          "D. Has the committee reached a final verdict yet?"
        ],
        "correctIndex": 2,
        "trapExplanation": "Câu C sai vì hành động sống kéo dài 3 năm đến hiện tại phải dùng Hiện tại hoàn thành: 'I have lived in Hanoi for three years'.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Cây Cầu Hiện Tại Hoàn Thành",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành viết câu trải nghiệm và hành động kéo dài với Since/For."
    }
  },
  {
    "id": "day7-past-vs-present-perfect",
    "title": "Ngày 7: Đại Chiến Quá Khứ Đơn vs Hiện Tại Hoàn Thành • Quyết Định Đúng Thì Trong 3 Giây",
    "subtitle": "Có mốc quá khứ (chấm dứt) vs Không mốc (hậu quả tới nay) • Từ khóa tín hiệu phân loại",
    "targetBand": "Band 5.0 ➔ 6.0",
    "estimatedMinutes": 15,
    "category": "tenses",
    "step1Concept": {
      "corePrinciplesVi": [
        "Thước đo tư duy 3 giây: Có mốc thời gian ĐÃ KẾT THÚC (yesterday, in 2010, two years ago, last month, when I was young) ➔ 100% QUÁ KHỨ ĐƠN. KHÔNG CÓ mốc thời gian cụ thể hoặc có tín hiệu nối dài (since, for, recently, so far, over the past decade) ➔ 100% HIỆN TẠI HOÀN THÀNH.",
        "So sánh đối đầu kinh điển: (1) 'I lived in London for two years' ➔ Quá khứ đơn: Hiện tại tôi KHÔNG CÒN sống ở London nữa (đã chuyển đi). (2) 'I have lived in London for two years' ➔ Hiện tại hoàn thành: Hiện tại tôi VẪN ĐANG sống ở London.",
        "Ứng dụng trong IELTS Writing Task 1: Nếu biểu đồ ghi 'From 1995 to 2010' ➔ 100% dùng Quá Khứ Đơn. Nếu biểu đồ kéo dài 'From 2000 to the present' hoặc 'Over the last 10 years' ➔ 100% dùng Hiện Tại Hoàn Thành."
      ],
      "mechanismAnalysisVi": "Sự phân biệt giữa Past Simple và Present Perfect là bài kiểm tra 'tư duy bản xứ' quan trọng nhất. Nếu bạn ghép một mốc thời gian quá khứ đóng (in 2018) với Hiện tại hoàn thành, giám khảo sẽ trừ điểm nặng ở tiêu chí Grammatical Accuracy.",
      "formulaSummary": "1. QUÁ KHỨ ĐƠN:\n   S + V2/ed + MỐC THỜI GIAN ĐÃ KẾT THÚC (yesterday, in 2015, ago, when...)\n   • In 2015, the government enacted a new legislation.\n\n2. HIỆN TẠI HOÀN THÀNH:\n   S + have/has + V3/ed + KHÔNG MỐC HOẶC KÉO DÀI TỚI NAY (since, for, so far, recently)\n   • Since 2015, the government has enacted several legislative reforms.",
      "tenseComparison": {
        "otherTenseName": "Quá Khứ Đơn vs Hiện Tại Hoàn Thành",
        "keyDifferencesVi": [
          "Quá Khứ Đơn: Thời điểm ĐÃ CHẤM DỨT trong quá khứ, không còn tiếp diễn ở hiện tại.",
          "Hiện Tại Hoàn Thành: Bắt đầu từ quá khứ, KÉO DÀI hoặc ĐỂ LẠI HẬU QUẢ tại thời điểm nói."
        ],
        "comparisonExamples": [
          {
            "currentTenseExample": "The country's economy grew by 5% in 2019.",
            "currentMeaningVi": "Nền kinh tế quốc gia đã tăng trưởng 5% vào năm 2019 (năm 2019 đã qua hoàn toàn).",
            "otherTenseExample": "The country's economy has grown by 15% over the past five years.",
            "otherMeaningVi": "Nền kinh tế đã tăng trưởng 15% trong suốt 5 năm qua (tính dồn đến tận thời điểm này).",
            "distinctionAnalysisVi": "Năm 2019 là mốc quá khứ đã đóng ➔ Dùng Past Simple (grew). 'Over the past five years' là giai đoạn kéo dài tới nay ➔ Dùng Present Perfect (has grown)."
          }
        ]
      },
      "foundationalExamples": [
        {
          "en": "The company suffered heavy financial losses during the 2008 recession.",
          "vi": "Công ty đã gánh chịu những tổn thất tài chính nặng nề trong cuộc suy thoái năm 2008.",
          "syntacticBreakdown": "The company (S) + suffered (V2 quá khứ) + heavy financial losses + during the 2008 recession (mốc quá khứ)."
        },
        {
          "en": "The company has maintained steady revenue growth since its restructuring in 2015.",
          "vi": "Công ty đã duy trì mức tăng trưởng doanh thu ổn định kể từ đợt tái cấu trúc năm 2015.",
          "syntacticBreakdown": "The company (S) + has maintained (Present Perfect) + steady revenue growth + since its restructuring."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy ghép 'In + năm quá khứ' với thì Hiện Tại Hoàn Thành",
          "band50WrongExample": "In 2012, the crime rate has decreased noticeably.",
          "band50TranslationVi": "Vào năm 2012, tỷ lệ tội phạm đã giảm đáng kể.",
          "band50FlawAnalysisVi": "'In 2012' là một mốc thời gian quá khứ cụ thể đã chấm dứt hoàn toàn, không thể dùng 'has decreased'. Bắt buộc phải dùng Quá khứ đơn 'decreased'.",
          "band80CorrectExample": "In 2012, the crime rate decreased noticeably.",
          "band80TranslationVi": "Vào năm 2012, tỷ lệ tội phạm đã giảm xuống một cách đáng chú ý.",
          "examinerNoteVi": "Công thức cấm kỵ: In + năm quá khứ KHÔNG BAO GIỜ đi với have/has + V3!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "While the initial stimulus package failed to stimulate growth in 2009, subsequent monetary interventions have yielded promising economic indicators.",
          "vietnameseTranslation": "Trong khi gói kích thích ban đầu đã thất bại trong việc thúc đẩy tăng trưởng vào năm 2009, các biện pháp can thiệp tiền tệ sau đó đã mang lại những chỉ số kinh tế đầy hứa hẹn.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Đối chiếu 2 vế: Vế 1 dùng Past Simple (failed in 2009) + Vế 2 dùng Present Perfect (have yielded)",
          "academicNuanceVi": "Sự kết hợp điêu luyện giữa 2 thì trong cùng một câu ghép phức thể hiện khả năng kiểm soát mốc thời gian hoàn hảo của thí sinh Band 8.5+.",
          "keyCollocations": [
            "stimulus package (gói kích thích kinh tế)",
            "yielded promising economic indicators (mang lại các chỉ số kinh tế triển vọng)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d7_q1",
        "question": "Chọn thì chính xác cho câu sau: 'In the nineteenth century, steam engines _____ the primary mode of transportation.'",
        "options": [
          "A. have become",
          "B. became",
          "C. become",
          "D. are becoming"
        ],
        "correctIndex": 1,
        "trapExplanation": "'In the nineteenth century' (vào thế kỷ 19) là mốc thời gian lịch sử đã kết thúc, bắt buộc dùng Quá khứ đơn 'became'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d7_q2",
        "question": "Câu nào dưới đây thể hiện rằng người nói HIỆN TẠI VẪN ĐANG làm việc tại công ty?",
        "options": [
          "A. I worked at that tech company for two years.",
          "B. I have worked at that tech company for two years.",
          "C. I was working at that tech company for two years.",
          "D. I had worked at that tech company for two years."
        ],
        "correctIndex": 1,
        "trapExplanation": "Câu B dùng Hiện tại hoàn thành (have worked for two years), biểu thị hành động bắt đầu trong quá khứ và vẫn tiếp diễn đến nay.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d7_q3",
        "question": "Tìm câu SAI ngữ pháp:",
        "options": [
          "A. Between 2000 and 2005, the population rose steadily.",
          "B. Over the past decade, solar energy has become much cheaper.",
          "C. In 2018, the government has launched a new education policy.",
          "D. She visited Japan twice when she was a teenager."
        ],
        "correctIndex": 2,
        "trapExplanation": "Câu C sai vì có 'In 2018' (mốc năm quá khứ) mà lại dùng Hiện tại hoàn thành 'has launched'. Phải sửa thành 'launched'.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Quyết Định Đúng Thì Trong 3 Giây",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành phân biệt nhanh chóng Past Simple và Present Perfect trong các ngữ cảnh IELTS."
    }
  },
  {
    "id": "day8-passive-voice",
    "title": "Ngày 8: Câu Bị Động Căn Bản (Be + V3/ed) • Nghệ Thuật 'Giấu Chủ Thể' & Miêu Tả Quy Trình",
    "subtitle": "Tại sao văn học thuật chuộng bị động • Công thức vạn năng Be + V3 • Tuyệt đối không bị động hóa nội động từ",
    "targetBand": "Band 5.0 ➔ 6.0",
    "estimatedMinutes": 15,
    "category": "passive_voice",
    "step1Concept": {
      "corePrinciplesVi": [
        "Nghệ thuật khách quan trong IELTS: Trong văn học thuật, việc AI làm không quan trọng bằng VIỆC GÌ ĐƯỢC LÀM. Nói 'People recycle plastic bottles' nghe như văn nói trẻ con; đổi thành 'Plastic bottles are recycled' nghe cực kỳ chuyên nghiệp, khoa học và khách quan.",
        "Công thức vạn năng 2 bước: (1) Đưa Tân ngữ lên làm Chủ ngữ mới; (2) Chia động từ theo công thức: `BE (chia theo thì gốc) + V3 / V-ed`.",
        "Bẫy chết người: Bị động hóa nội động từ (Intransitive Verbs). Các từ như occur, happen, rise, fall, increase, decrease, appear KHÔNG có tân ngữ nên KHÔNG BAO GIỜ được dùng ở thể bị động. Cấm nói 'A car accident was occurred' (SAI ➔ 'A car accident occurred')."
      ],
      "mechanismAnalysisVi": "Trong tiêu chí Coherence & Cohesion và Lexical Resource của Writing Task 1 dạng Process (Quy trình sản xuất cà phê, tái chế rác, v.v.), 80% câu văn bắt buộc phải viết ở thể bị động hiện tại đơn (is harvested, are roasted, is packaged). Không làm chủ câu bị động, bạn sẽ thất bại hoàn toàn ở dạng bài này.",
      "formulaSummary": "CÔNG THỨC CHUNG: S (chịu tác động) + BE (chia thì) + V3 / V-ed + (by O)\n\n1. Hiện tại đơn: is / are + V3/ed\n   • Raw materials are collected and sorted.\n\n2. Quá khứ đơn: was / were + V3/ed\n   • The facility was established in 2005.\n\n3. Hiện tại hoàn thành: have / has been + V3/ed\n   • Millions of dollars have been allocated to the project.",
      "foundationalExamples": [
        {
          "en": "Hazardous industrial waste must be treated before being discharged into water bodies.",
          "vi": "Chất thải công nghiệp độc hại phải được xử lý trước khi xả ra các nguồn nước.",
          "syntacticBreakdown": "Hazardous industrial waste (S) + must be treated (Modal passive: must be + V3) + before being discharged."
        },
        {
          "en": "The historic building was thoroughly renovated to attract international visitors.",
          "vi": "Tòa nhà lịch sử đã được trùng tu kỹ lưỡng để thu hút du khách quốc tế.",
          "syntacticBreakdown": "The historic building (S số ít) + was thoroughly renovated (was + Adv + V-ed) + to attract visitors."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy bị động hóa nội động từ chỉ xu hướng tự nhiên",
          "band50WrongExample": "The price was dropped significantly last month.",
          "band50TranslationVi": "Mức giá đã bị giảm đáng kể vào tháng trước.",
          "band50FlawAnalysisVi": "'Drop' là nội động từ diễn tả sự sụt giảm tự thân của số liệu, không thể dùng thể bị động 'was dropped'.",
          "band80CorrectExample": "The retail price dropped significantly last month.",
          "band80TranslationVi": "Mức giá bán lẻ đã giảm đáng kể vào tháng trước.",
          "examinerNoteVi": "Nhóm từ cấm chia bị động: happen, occur, rise, fall, increase, decrease, appear, disappear."
        },
        {
          "trapNameVi": "Bẫy rơi rụng 'been' trong Hiện tại hoàn thành bị động",
          "band50WrongExample": "Many effective solutions have proposed by researchers.",
          "band50TranslationVi": "Nhiều giải pháp hiệu quả đã đề xuất bởi các nhà nghiên cứu.",
          "band50FlawAnalysisVi": "'Solutions' (giải pháp) không thể tự đề xuất được mà PHẢI ĐƯỢC đề xuất. Viết 'have proposed' là thể chủ động, câu trở nên vô nghĩa. Phải có 'been': 'have been proposed'.",
          "band80CorrectExample": "Numerous viable solutions have been proposed by contemporary scholars.",
          "band80TranslationVi": "Nhiều giải pháp khả thi đã được đề xuất bởi các học giả đương đại.",
          "examinerNoteVi": "Hiện tại hoàn thành bị động: HAVE / HAS + BEEN + V3/ed!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Rigorous environmental standards should be imposed on multinational corporations to curb ecological destruction.",
          "vietnameseTranslation": "Các tiêu chuẩn môi trường nghiêm ngặt nên được áp đặt lên các tập đoàn đa quốc gia nhằm kiềm chế sự hủy hoại sinh thái.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Modal verb passive (should be imposed on) + Cụm danh từ cao cấp + To-infinitive chỉ mục đích",
          "academicNuanceVi": "Câu bị động học thuật giúp bài viết mang tính khách quan trung lập của một báo cáo chính sách xã hội, tránh dùng ngôi xưng cá nhân 'I think we should impose'.",
          "keyCollocations": [
            "rigorous environmental standards (tiêu chuẩn môi trường nghiêm ngặt)",
            "imposed on multinational corporations (áp đặt lên các tập đoàn đa quốc gia)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d8_q1",
        "question": "Chuyển câu sau sang thể bị động: 'The municipal government constructed a modern stadium in 2018.'",
        "options": [
          "A. A modern stadium constructed by the municipal government in 2018.",
          "B. A modern stadium was constructed in 2018 by the municipal government.",
          "C. A modern stadium is constructed in 2018 by the municipal government.",
          "D. A modern stadium had constructed in 2018 by the municipal government."
        ],
        "correctIndex": 1,
        "trapExplanation": "Câu gốc ở thì Quá khứ đơn, vì vậy câu bị động phải dùng 'was constructed'. Đáp án B hoàn toàn chính xác.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d8_q2",
        "question": "Câu nào dưới đây SAI ngữ pháp vì bị động hóa nội động từ?",
        "options": [
          "A. A major breakthrough was achieved by scientists.",
          "B. An unexpected crisis was occurred in that region.",
          "C. The new law has been approved by parliament.",
          "D. Plastic containers are recycled at this processing facility."
        ],
        "correctIndex": 1,
        "trapExplanation": "'Occur' là nội động từ không bao giờ có thể bị động, câu B sai (phải sửa thành: An unexpected crisis occurred).",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d8_q3",
        "question": "Điền dạng đúng của động từ: 'Extensive measures _____ (implement) to combat air pollution recently.'",
        "options": [
          "A. have implemented",
          "B. have been implemented",
          "C. were implemented",
          "D. are being implement"
        ],
        "correctIndex": 1,
        "trapExplanation": "Có từ 'recently' nên dùng Hiện tại hoàn thành, chủ ngữ 'Extensive measures' (các biện pháp) là đối tượng chịu tác động nên dùng bị động: 'have been implemented'.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Bị Động Quy Trình Task 1 & Học Thuật Task 2",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành chuyển đổi câu chủ động sang bị động học thuật chuẩn Cambridge."
    }
  },
  {
    "id": "day9-comparatives",
    "title": "Ngày 9: So Sánh Hơn (Tính Từ Ngắn / Dài / Bất Quy Tắc) • Vũ Khí So Sánh Task 1",
    "subtitle": "Quy tắc 1 âm tiết vs đa âm tiết • Than thần thánh • Bẫy 'more higher' & 'different than'",
    "targetBand": "Band 4.5 ➔ 5.5",
    "estimatedMinutes": 15,
    "category": "comparisons",
    "step1Concept": {
      "corePrinciplesVi": [
        "Vũ khí sống còn trong IELTS: Đề bài Writing Task 1 luôn yêu cầu: 'make comparisons where relevant'. Nếu không biết so sánh hơn, bạn không thể vượt qua Band 5.0.",
        "Quy tắc 1 âm tiết (Tính từ ngắn): Thêm đuôi `-er` + `than` (high ➔ higher than, low ➔ lower than, cheap ➔ cheaper than). Nếu tính từ tận cùng bằng 1 phụ âm đứng sau 1 nguyên âm ➔ Gấp đôi phụ âm: big ➔ bigger than.",
        "Quy tắc 2 âm tiết trở lên (Tính từ dài): Thêm `more` + Tính từ + `than` (more expensive than, more significant than). Ngoại lệ đuôi -y: biến thành -ier: happy ➔ happier than, heavy ➔ heavier than.",
        "Bất quy tắc bắt buộc thuộc: good ➔ better than, bad ➔ worse than, far ➔ farther / further than."
      ],
      "mechanismAnalysisVi": "Trong Writing Task 1, giám khảo không chỉ chấm xem bạn có dùng so sánh không, mà còn chấm trạng từ bổ trợ mức độ (intensifiers): much higher (cao hơn nhiều), slightly lower (thấp hơn một chút), considerably more expensive (đắt hơn đáng kể).",
      "formulaSummary": "1. TÍNH TỪ NGẮN:\n   S1 + To Be + Adj-er + than + S2\n   • The consumption of beef was higher than that of pork.\n\n2. TÍNH TỪ DÀI:\n   S1 + To Be + more + Adj + than + S2\n   • Solar energy is more sustainable than fossil fuels.\n\n3. BỔ TRỢ MỨC ĐỘ (INTENSIFIERS):\n   [much / significantly / considerably] + higher than (cao hơn nhiều)\n   [slightly / marginally] + lower than (thấp hơn một chút)",
      "foundationalExamples": [
        {
          "en": "The proportion of university graduates was significantly higher in urban regions than in rural counterparts.",
          "vi": "Tỷ lệ cử nhân đại học ở các vùng đô thị cao hơn đáng kể so với các vùng nông thôn đối ứng.",
          "syntacticBreakdown": "The proportion... (S1) + was (To Be) + significantly higher than (So sánh hơn có bổ trợ) + in rural counterparts (S2)."
        },
        {
          "en": "Private transport is considerably more expensive to maintain than public commuting options.",
          "vi": "Phương tiện cá nhân tốn kém hơn đáng kể để duy trì so với các lựa chọn đi lại công cộng.",
          "syntacticBreakdown": "Private transport (S1) + is + considerably more expensive (Tính từ dài) + than + public commuting options (S2)."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy Double Comparative ('more higher')",
          "band50WrongExample": "The expenditure on education was more higher than health.",
          "band50TranslationVi": "Chi tiêu cho giáo dục cao hơn y tế.",
          "band50FlawAnalysisVi": "Đã thêm đuôi '-er' (higher) mà thí sinh vẫn nhét thêm 'more' phía trước. Đây là lỗi sai ngữ pháp ấu trĩ.",
          "band80CorrectExample": "Expenditure on education was substantially higher than that on healthcare.",
          "band80TranslationVi": "Chi tiêu cho giáo dục cao hơn đáng kể so với chi tiêu cho y tế.",
          "examinerNoteVi": "Chỉ chọn 1 trong 2: hoặc Adj-er (higher), hoặc more + Adj dài (more expensive). Muốn nhấn mạnh mức độ, dùng 'much / significantly higher'!"
        },
        {
          "trapNameVi": "Bẫy so sánh khập khiễng (The salary of teachers is lower than doctors)",
          "band50WrongExample": "The salary of teachers is lower than doctors.",
          "band50TranslationVi": "Lương của giáo viên thấp hơn bác sĩ.",
          "band50FlawAnalysisVi": "Câu này đang so sánh 'tiền lương' (salary) với 'con người' (doctors). Đây là lỗi sai logic học thuật cực kỳ phổ biến.",
          "band80CorrectExample": "The average salary of teachers is lower than that of medical practitioners.",
          "band80TranslationVi": "Mức lương trung bình của giáo viên thấp hơn mức lương của các bác sĩ y khoa.",
          "examinerNoteVi": "Dùng đại từ thay thế: 'that of...' (cho danh từ số ít) hoặc 'those of...' (cho danh từ số nhiều) để tránh so sánh khập khiễng!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Electric vehicles are considerably cleaner than internal combustion counterparts, yet their upfront acquisition costs remain noticeably higher.",
          "vietnameseTranslation": "Xe điện sạch hơn đáng kể so với các dòng xe động cơ đốt trong đối ứng, tuy nhiên chi phí mua ban đầu của chúng vẫn cao hơn thấy rõ.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Cấu trúc kép: (considerably cleaner than) đối lập (noticeably higher than) với liên từ 'yet'",
          "academicNuanceVi": "Việc sử dụng các trạng từ chỉ mức độ 'considerably' và 'noticeably' giúp câu so sánh đạt độ tinh tế và học thuật chuẩn Band 8.5.",
          "keyCollocations": [
            "internal combustion counterparts (các phiên bản động cơ đốt trong đối ứng)",
            "upfront acquisition costs (chi phí mua sắm ban đầu)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d9_q1",
        "question": "Chọn câu so sánh chuẩn ngữ pháp và logic nhất:",
        "options": [
          "A. The population of Tokyo is larger than London.",
          "B. The population of Tokyo is more larger than that of London.",
          "C. The population of Tokyo is significantly larger than that of London.",
          "D. The population of Tokyo is larger then that of London."
        ],
        "correctIndex": 2,
        "trapExplanation": "Câu C tránh được lỗi so sánh khập khiễng nhờ dùng 'that of London', dùng đúng 'significantly larger' và không nhầm 'then/than'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d9_q2",
        "question": "Từ nào sau đây có thể đứng trước 'higher than' để nhấn mạnh mức độ chênh lệch lớn?",
        "options": [
          "A. very",
          "B. more",
          "C. considerably",
          "D. so"
        ],
        "correctIndex": 2,
        "trapExplanation": "Trong so sánh hơn, không dùng 'very' hay 'more' trước tính từ ngắn có đuôi -er. Phải dùng: much / considerably / significantly / far.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d9_q3",
        "question": "Dạng so sánh hơn của 'bad' là gì?",
        "options": [
          "A. badder",
          "B. more bad",
          "C. worse",
          "D. worst"
        ],
        "correctIndex": 2,
        "trapExplanation": "'Bad' là tính từ bất quy tắc, dạng so sánh hơn là 'worse' (worse than).",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Vũ Khí So Sánh Task 1",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Luyện viết câu so sánh số liệu kèm trạng từ bổ trợ mức độ chuẩn Band 6.5+."
    }
  },
  {
    "id": "day10-advanced-comparisons",
    "title": "Ngày 10: So Sánh Nhất, So Sánh Bằng & Bội Số • Vẽ Trọn Bức Tranh Toàn Cảnh Task 1",
    "subtitle": "The + -est / most • Cấu trúc as... as • Gấp đôi (Twice as much / Double) • Tránh quên The",
    "targetBand": "Band 5.0 ➔ 6.0",
    "estimatedMinutes": 15,
    "category": "comparisons",
    "step1Concept": {
      "corePrinciplesVi": [
        "So Sánh Nhất (Superlatives): Dùng để xác định điểm cao nhất / thấp nhất trên biểu đồ Task 1. BẮT BUỘC phải có mạo từ `THE` (`the highest`, `the lowest`, `the most popular`). Quên 'the' là lỗi mất điểm ngớ ngẩn nhất của học sinh.",
        "So Sánh Bằng & Không Bằng: Cấu trúc `as + Adj/Adv + as` (bằng nhau) và phủ định `not as... as` (không bằng). Dùng khi 2 đối tượng có số liệu ngang ngửa trên biểu đồ.",
        "Cấu trúc Bội Số (Gấp n lần) — Chìa khóa vàng nâng Band: (1) Gấp 2 lần: `twice as + much/many/Adj + as`; (2) Gấp 3, 4 lần: `three / four times as + Adj + as`; (3) Dùng động từ: `doubled`, `tripled` (`The figure doubled over the period`)."
      ],
      "mechanismAnalysisVi": "Trong phần Overview của Writing Task 1, bạn bắt buộc phải chỉ ra điểm vượt trội nhất (e.g. 'Overall, Country A had the highest proportion of...'). Thành thạo so sánh nhất và bội số giúp câu tổng quan đạt điểm tối đa ở tiêu chí Task Achievement.",
      "formulaSummary": "1. SO SÁNH NHẤT:\n   S + To Be + THE + Adj-est / THE MOST + Adj\n   • Sweden recorded the highest rate of renewable energy usage.\n\n2. SO SÁNH BẰNG:\n   S1 + To Be + as + Adj + as + S2\n   • Hydropower is as dependable as conventional coal power.\n\n3. BỘI SỐ (GẤP N LẦN):\n   S1 + To Be + [twice / three times] + as + Adj + as + S2\n   • The figure for China was twice as high as that for Japan.\n   • Car sales doubled between 2010 and 2020.",
      "foundationalExamples": [
        {
          "en": "Fossil fuels remained the most dominant energy source throughout the surveyed timeframe.",
          "vi": "Nhiên liệu hóa thạch vẫn là nguồn năng lượng chiếm ưu thế nhất trong suốt khung thời gian được khảo sát.",
          "syntacticBreakdown": "Fossil fuels (S) + remained (V) + the most dominant energy source (So sánh nhất: the most + Adj) + throughout..."
        },
        {
          "en": "In 2015, consumer spending on entertainment was twice as high as expenditure on books.",
          "vi": "Năm 2015, chi tiêu tiêu dùng cho giải trí cao gấp đôi chi tiêu cho sách.",
          "syntacticBreakdown": "Consumer spending on entertainment (S1) + was + twice as high as (Bội số) + expenditure on books (S2)."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy bỏ quên mạo từ 'THE' trong so sánh nhất",
          "band50WrongExample": "France had highest percentage of wine consumption in 2010.",
          "band50TranslationVi": "Pháp có tỷ lệ tiêu thụ rượu vang cao nhất năm 2010.",
          "band50FlawAnalysisVi": "So sánh nhất bắt buộc phải có mạo từ xác định 'the'. Bỏ quên 'the' là lỗi mất điểm ngữ pháp rất đáng tiếc.",
          "band80CorrectExample": "France accounted for the highest percentage of wine consumption in 2010.",
          "band80TranslationVi": "Nước Pháp chiếm tỷ lệ tiêu thụ rượu vang cao nhất vào năm 2010.",
          "examinerNoteVi": "Luôn luôn tự nhẩm: 'THE highest', 'THE lowest', 'THE most significant'!"
        },
        {
          "trapNameVi": "Bẫy viết sai cấu trúc gấp đôi ('twice higher than')",
          "band50WrongExample": "The rate in 2020 was twice higher than in 2010.",
          "band50TranslationVi": "Tỷ lệ năm 2020 cao gấp đôi so với năm 2010.",
          "band50FlawAnalysisVi": "'Twice higher than' là cấu trúc sai ngữ pháp chuẩn tiếng Anh. Chuẩn mực học thuật bắt buộc là 'twice as high as'.",
          "band80CorrectExample": "The rate in 2020 was twice as high as that recorded in 2010.",
          "band80TranslationVi": "Tỷ lệ trong năm 2020 cao gấp đôi so với con số được ghi nhận vào năm 2010.",
          "examinerNoteVi": "Công thức bội số chuẩn Cambridge: TWICE AS + ADJ + AS (không dùng twice higher than)!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "By the end of the survey period, production outputs in emerging markets had nearly tripled, reaching their highest historical peak.",
          "vietnameseTranslation": "Đến cuối giai đoạn khảo sát, sản lượng tại các thị trường mới nổi đã tăng gần gấp ba lần, đạt đỉnh lịch sử cao nhất.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Động từ bội số (had nearly tripled) + Mệnh đề phân từ rút gọn (reaching their highest historical peak)",
          "academicNuanceVi": "Sử dụng động từ 'tripled' kết hợp cụm phân từ 'reaching their highest peak' thể hiện khả năng mô tả số liệu cô đọng và mạnh mẽ.",
          "keyCollocations": [
            "production outputs (sản lượng sản xuất)",
            "emerging markets (thị trường mới nổi)",
            "highest historical peak (đỉnh cao lịch sử)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d10_q1",
        "question": "Chọn câu đúng chuẩn ngữ pháp học thuật diễn tả mức gấp đôi:",
        "options": [
          "A. The number of cars was twice higher than the number of bikes.",
          "B. The number of cars was twice as high as that of bikes.",
          "C. The number of cars was two times higher then bikes.",
          "D. The number of cars was as twice high as bikes."
        ],
        "correctIndex": 1,
        "trapExplanation": "Cấu trúc gấp đôi chuẩn tiếng Anh là: 'twice as + adj + as' kết hợp với đại từ 'that of bikes' để tránh lặp từ. Đáp án B đúng.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d10_q2",
        "question": "Tìm lỗi sai trong câu: 'Germany generated largest amount of wind energy in Europe.'",
        "options": [
          "A. generated",
          "B. largest amount",
          "C. wind energy",
          "D. in Europe"
        ],
        "correctIndex": 1,
        "trapExplanation": "So sánh nhất bắt buộc phải có mạo từ 'the' (the largest amount, không được để 'largest amount' đứng trơ trọi).",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d10_q3",
        "question": "Điền dạng đúng: 'Between 2005 and 2015, online retail revenue _____ (triple) from 10 to 30 billion dollars.'",
        "options": [
          "A. tripled",
          "B. was tripled",
          "C. is tripled",
          "D. has tripled"
        ],
        "correctIndex": 0,
        "trapExplanation": "Năm trong quá khứ (2005-2015), động từ chỉ số liệu tự thân tăng gấp ba chia Quá khứ đơn chủ động: 'tripled'.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: So Sánh Nhất & Bội Số Task 1",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành viết câu Overview và thân bài sử dụng đỉnh cao so sánh nhất và bội số."
    }
  },
  {
    "id": "day11-relative-clauses-who-which",
    "title": "Ngày 11: Mệnh Đề Quan Hệ (Who, Which, That) • Ghép 2 Câu Đơn Thành 1 Câu Phức",
    "subtitle": "Biến câu rời rạc thành câu phức học thuật • Who chỉ người, Which chỉ vật, That đa năng • Cấm lặp lại tân ngữ",
    "targetBand": "Band 5.0 ➔ 6.0",
    "estimatedMinutes": 15,
    "category": "relative_clauses",
    "step1Concept": {
      "corePrinciplesVi": [
        "Tại sao giám khảo chấm điểm cao Mệnh Đề Quan Hệ? Trong bảng tiêu chí Grammatical Range and Accuracy, nếu chỉ dùng các câu đơn S-V-O rời rạc, điểm ngữ pháp bị kẹt cứng ở Band 5.0. Mệnh đề quan hệ là cách nhanh nhất và hiệu quả nhất để biến 2 câu đơn trẻ con thành 1 câu phức học thuật.",
        "Bộ ba đại từ quan hệ cốt lõi: (1) WHO: Thay thế cho danh từ chỉ NGƯỜI (`Students who study consistently...`); (2) WHICH: Thay thế cho danh từ chỉ ĐỒ VẬT, CON VẬT hoặc SỰ VIỆC (`Policies which encourage recycling...`); (3) THAT: Thay thế cho cả người và vật trong mệnh đề xác định (không có dấu phẩy).",
        "Bẫy lặp lại tân ngữ (The Shadow Pronoun Trap): Đại từ quan hệ 'who/which/that' đã đóng vai trò làm tân ngữ rồi, nên ở mệnh đề phía sau TUYỆT ĐỐI KHÔNG để lại đại từ nhân xưng 'it / them / him'. Cấm nói: 'The book which I bought it yesterday' (SAI ➔ 'The book which I bought yesterday')."
      ],
      "mechanismAnalysisVi": "Trong Writing Task 2, mệnh đề quan hệ giúp bạn mở rộng chủ ngữ hoặc bổ nghĩa cho một luận điểm mà không cần phải chấm câu rồi bắt đầu lại bằng 'They' hay 'It'. Điều này tạo nên độ kết dính mạch lạc (Cohesion) vượt trội.",
      "formulaSummary": "1. LÀM CHỦ NGỮ:\n   • N (người) + WHO + V + O\n     ➔ Individuals who possess high emotional intelligence adapt well.\n   • N (vật) + WHICH / THAT + V + O\n     ➔ Technologies that reduce carbon footprints must be subsidized.\n\n2. LÀM TÂN NGỮ:\n   • N + (which / that / whom) + S + V\n     ➔ The solutions which the committee proposed were pragmatic.",
      "foundationalExamples": [
        {
          "en": "Employees who work remotely often enjoy greater flexibility in managing their daily schedules.",
          "vi": "Những nhân viên làm việc từ xa thường được hưởng sự linh hoạt lớn hơn trong việc quản lý lịch trình hàng ngày.",
          "syntacticBreakdown": "Employees (Chủ ngữ chính) + who work remotely (Mệnh đề quan hệ bổ nghĩa) + often enjoy (V chính) + greater flexibility..."
        },
        {
          "en": "Countries which prioritize vocational training tend to experience lower youth unemployment rates.",
          "vi": "Những quốc gia ưu tiên đào tạo nghề có xu hướng trải qua tỷ lệ thất nghiệp trong giới trẻ thấp hơn.",
          "syntacticBreakdown": "Countries (S chính) + which prioritize vocational training (MĐQH) + tend to experience (V chính) + lower unemployment..."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy lặp lại tân ngữ thừa (Shadow Pronoun)",
          "band50WrongExample": "The research paper which the professor assigned it last week is challenging.",
          "band50TranslationVi": "Bài nghiên cứu mà giáo sư đã giao nó tuần trước rất thử thách.",
          "band50FlawAnalysisVi": "'Which' đã thay thế cho 'The research paper' rồi, việc giữ lại từ 'it' ở phía sau khiến câu bị thừa thãi và sai cấu trúc cú pháp.",
          "band80CorrectExample": "The research paper which the professor assigned last week presents considerable academic challenges.",
          "band80TranslationVi": "Bài nghiên cứu mà giáo sư đã giao tuần trước đặt ra những thách thức học thuật đáng kể.",
          "examinerNoteVi": "Quy tắc sống còn: Khi đã có WHO / WHICH / THAT làm tân ngữ ➔ XÓA NGAY it / them / him / her ở phía sau!"
        },
        {
          "trapNameVi": "Bẫy dùng 'Which' thay thế cho danh từ chỉ người",
          "band50WrongExample": "Graduates which have practical skills can find jobs easily.",
          "band50TranslationVi": "Những sinh viên tốt nghiệp mà có kỹ năng thực tế có thể tìm việc dễ dàng.",
          "band50FlawAnalysisVi": "'Graduates' là danh từ chỉ người, bắt buộc phải dùng đại từ quan hệ 'who', không được dùng 'which'.",
          "band80CorrectExample": "Graduates who possess hands-on vocational skills readily secure employment.",
          "band80TranslationVi": "Những sinh viên tốt nghiệp sở hữu kỹ năng nghề nghiệp thực tế có thể dễ dàng đảm bảo được việc làm.",
          "examinerNoteVi": "Người ➔ WHO; Vật/Sự việc ➔ WHICH!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Governments that enact stringent carbon taxation can effectively deter corporate practices which compromise ecological integrity.",
          "vietnameseTranslation": "Các chính phủ ban hành luật thuế carbon nghiêm ngặt có thể ngăn chặn hiệu quả những hoạt động doanh nghiệp làm tổn hại đến tính toàn vẹn sinh thái.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Cấu trúc 2 mệnh đề quan hệ lồng ghép: 'that enact...' bổ nghĩa cho Governments + 'which compromise...' bổ nghĩa cho corporate practices",
          "academicNuanceVi": "Câu phức kép này thể hiện tư duy lập luận chính sách sắc sảo, đạt chuẩn mực tối đa của bài viết luận Band 8.5+.",
          "keyCollocations": [
            "enact stringent carbon taxation (ban hành thuế carbon nghiêm ngặt)",
            "compromise ecological integrity (làm tổn hại đến sự toàn vẹn sinh thái)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d11_q1",
        "question": "Ghép 2 câu đơn thành 1 câu phức: 'The scientist discovered a new compound. She won the prestigious award.'",
        "options": [
          "A. The scientist which discovered a new compound won the prestigious award.",
          "B. The scientist who discovered a new compound she won the award.",
          "C. The scientist who discovered a new compound won the prestigious award.",
          "D. The scientist who she discovered a new compound won the award."
        ],
        "correctIndex": 2,
        "trapExplanation": "Dùng 'who' thay cho người, loại bỏ đại từ thừa 'she' trong mệnh đề phụ và mệnh đề chính. Câu C hoàn hảo.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d11_q2",
        "question": "Tìm lỗi sai trong câu sau: 'The measures which the authorities introduced them failed to curb traffic jams.'",
        "options": [
          "A. The measures",
          "B. which",
          "C. introduced them",
          "D. to curb"
        ],
        "correctIndex": 2,
        "trapExplanation": "'Which' đã thay thế cho 'The measures' rồi, từ 'them' là đại từ thừa thãi (shadow pronoun) phải lược bỏ.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d11_q3",
        "question": "Chọn đại từ quan hệ thích hợp: 'Renewable energy is an alternative _____ generates zero carbon emissions.'",
        "options": [
          "A. who",
          "B. which",
          "C. whose",
          "D. whom"
        ],
        "correctIndex": 1,
        "trapExplanation": "'An alternative' (một giải pháp thay thế) là danh từ chỉ vật/khái niệm, vì vậy dùng 'which' hoặc 'that'.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Nối Câu Phức MĐQH",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành nối các câu đơn cộc lốc thành câu phức học thuật Band 6.5+."
    }
  },
  {
    "id": "day12-relative-clauses-where-when-whose",
    "title": "Ngày 12: Mệnh Đề Quan Hệ Nơi Chốn, Thời Gian & Sở Hữu (Where, When, Whose)",
    "subtitle": "Phân biệt Where vs Which • Whose chỉ sở hữu • Dấu phẩy mệnh đề không xác định",
    "targetBand": "Band 5.0 ➔ 6.0",
    "estimatedMinutes": 15,
    "category": "relative_clauses",
    "step1Concept": {
      "corePrinciplesVi": [
        "Mở rộng không gian, thời gian và quyền sở hữu: (1) WHERE: Thay cho danh từ nơi chốn khi có hành động diễn ra TẠI ĐÓ (= in / at which); (2) WHEN: Thay cho danh từ thời gian khi có sự việc xảy ra VÀO LÚC ĐÓ (= at / on / in which); (3) WHOSE: Thay cho tính từ sở hữu (his, her, their, its) - luôn đi kèm danh từ.",
        "Phân biệt kinh điển WHERE vs WHICH: Nếu mệnh đề sau là một câu hoàn chỉnh có S + V diễn ra tại nơi đó ➔ Dùng WHERE (`The city where I live`). Nhưng nếu danh từ nơi chốn trực tiếp làm CHỦ NGỮ hoặc TÂN NGỮ của động từ phía sau ➔ Bắt buộc dùng WHICH (`The city which attracts millions of tourists`).",
        "Bẫy dấu phẩy Mệnh đề không xác định (Non-defining Relative Clause): Khi danh từ đã quá rõ ràng (tên riêng như Vietnam, London, Mr. Smith, hoặc có my / this / that), mệnh đề quan hệ bắt buộc phải nằm giữa HAI DẤU PHẨY và TUYỆT ĐỐI KHÔNG dùng 'that'. E.g. `Hanoi, which is the capital of Vietnam, has rich culture.` (Cấm dùng 'that')."
      ],
      "mechanismAnalysisVi": "Dấu phẩy trong mệnh đề quan hệ không chỉ là vấn đề chính tả, mà nó thay đổi hoàn toàn ý nghĩa của câu. 'My brother who lives in Paris is a doctor' (ngụ ý tôi có nhiều anh trai). 'My brother, who lives in Paris, is a doctor' (ngụ ý tôi chỉ có duy nhất một người anh trai). Giám khảo IELTS cực kỳ chú ý chi tiết này.",
      "formulaSummary": "1. NƠI CHỐN (WHERE = in/at which):\n   N (địa điểm) + WHERE + S + V\n   • Metropolitan centers where living costs are exorbitant pose challenges.\n\n2. SỞ HỮU (WHOSE + Noun):\n   N + WHOSE + Noun + V\n   • Families whose financial resources are constrained need scholarships.\n\n3. DẤU PHẨY (NON-DEFINING - CẤM DÙNG THAT):\n   Danh từ riêng / duy nhất, WHICH / WHO + V..., V chính...\n   • Singapore, which possesses minimal natural resources, thrives on trade.",
      "foundationalExamples": [
        {
          "en": "Rural communities where healthcare infrastructure is scarce require urgent state investment.",
          "vi": "Các cộng đồng nông thôn nơi mà cơ sở hạ tầng y tế còn khan hiếm đòi hỏi sự đầu tư khẩn cấp từ nhà nước.",
          "syntacticBreakdown": "Rural communities (S chính) + where healthcare infrastructure is scarce (MĐQH nơi chốn) + require (V chính)..."
        },
        {
          "en": "Students whose academic performance is outstanding frequently receive merit-based scholarships.",
          "vi": "Những học sinh có thành tích học tập xuất sắc thường xuyên nhận được học bổng dựa trên năng lực.",
          "syntacticBreakdown": "Students (S chính) + whose academic performance (Cụm sở hữu) + is outstanding + frequently receive..."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy dùng 'Where' làm chủ ngữ thay vì 'Which'",
          "band50WrongExample": "I live in a city where has many green parks.",
          "band50TranslationVi": "Tôi sống ở một thành phố nơi mà có nhiều công viên xanh.",
          "band50FlawAnalysisVi": "Phía sau là động từ 'has' (thiếu chủ ngữ). 'Where' chỉ là trạng từ quan hệ chỉ nơi chốn, không thể làm chủ ngữ của 'has'. Bắt buộc phải dùng đại từ quan hệ 'which' hoặc 'that'.",
          "band80CorrectExample": "I reside in a city which boasts numerous expansive green spaces.",
          "band80TranslationVi": "Tôi sinh sống tại một thành phố tự hào sở hữu nhiều không gian xanh rộng lớn.",
          "examinerNoteVi": "Thần chú: Sau WHERE phải là S + V hoàn chỉnh. Nếu sau đó là ĐỘNG TỪ ngay lập tức ➔ 100% dùng WHICH!"
        },
        {
          "trapNameVi": "Bẫy dùng 'That' sau dấu phẩy",
          "band50WrongExample": "Oxford University, that was founded centuries ago, is globally renowned.",
          "band50TranslationVi": "Đại học Oxford, trường được thành lập nhiều thế kỷ trước, nổi tiếng toàn cầu.",
          "band50FlawAnalysisVi": "Sau dấu phẩy (mệnh đề không xác định bổ nghĩa cho tên riêng Oxford University), tiếng Anh cấm kỵ dùng 'that'. Bắt buộc phải dùng 'which'.",
          "band80CorrectExample": "Oxford University, which was founded centuries ago, remains globally renowned for academic excellence.",
          "band80TranslationVi": "Đại học Oxford, ngôi trường được thành lập từ nhiều thế kỷ trước, vẫn nổi tiếng toàn cầu về chất lượng học thuật xuất sắc.",
          "examinerNoteVi": "Quy tắc vàng: CÓ DẤU PHẨY THÌ NÉ 'THAT' RA!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "Developing nations whose domestic manufacturing sectors are vulnerable to global market volatility require targeted protective policies.",
          "vietnameseTranslation": "Các quốc gia đang phát triển có các ngành sản xuất nội địa dễ bị tổn thương trước sự biến động của thị trường toàn cầu cần có các chính sách bảo hộ có mục tiêu.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Mệnh đề sở hữu (whose domestic manufacturing sectors are vulnerable to...) làm chủ ngữ phức hợp",
          "academicNuanceVi": "Cấu trúc sở hữu 'whose + Noun' thể hiện năng lực viết câu học thuật chặt chẽ, được dùng rất phổ biến trong các bài luận về kinh tế xã hội.",
          "keyCollocations": [
            "vulnerable to global market volatility (dễ bị tổn thương trước biến động thị trường toàn cầu)",
            "targeted protective policies (chính sách bảo hộ có mục tiêu)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d12_q1",
        "question": "Chọn từ điền vào chỗ trống: 'This is the laboratory _____ the groundbreaking vaccine was developed.'",
        "options": [
          "A. which",
          "B. where",
          "C. whose",
          "D. that"
        ],
        "correctIndex": 1,
        "trapExplanation": "Phía sau là một mệnh đề hoàn chỉnh 'the vaccine was developed' diễn ra TẠI phòng thí nghiệm đó, vì vậy dùng 'where'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d12_q2",
        "question": "Điền từ thích hợp: 'Ho Chi Minh City, _____ has a population of over nine million, faces severe traffic congestion.'",
        "options": [
          "A. that",
          "B. which",
          "C. where",
          "D. whose"
        ],
        "correctIndex": 1,
        "trapExplanation": "Có dấu phẩy sau danh từ riêng và phía sau là động từ 'has' (cần một đại từ làm chủ ngữ), cấm dùng 'that', bắt buộc phải chọn 'which'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d12_q3",
        "question": "Chọn câu đúng ngữ pháp diễn đạt quyền sở hữu:",
        "options": [
          "A. Candidates who's qualifications are impressive will be invited.",
          "B. Candidates whose qualifications are impressive will be invited.",
          "C. Candidates which qualifications are impressive will be invited.",
          "D. Candidates who qualifications are impressive will be invited."
        ],
        "correctIndex": 1,
        "trapExplanation": "'Whose' là đại từ quan hệ chỉ sở hữu (bằng cấp của các ứng viên). Không nhầm lẫn với 'who's' (viết tắt của who is). Đáp án B đúng.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Nơi Chốn, Sở Hữu & Dấu Phẩy",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Luyện viết câu phức có mệnh đề quan hệ nơi chốn và dấu phẩy chính xác tuyệt đối."
    }
  },
  {
    "id": "day13-first-conditional",
    "title": "Ngày 13: Câu Điều Kiện Loại 1 (First Conditional) • Dự Báo & Đề Xuất Giải Pháp Task 2",
    "subtitle": "Có thật ở hiện tại/tương lai • If + Hiện Tại Đơn, S + will / can + V • Tuyệt đối không dùng will trong mệnh đề If",
    "targetBand": "Band 5.0 ➔ 6.0",
    "estimatedMinutes": 15,
    "category": "conditionals",
    "step1Concept": {
      "corePrinciplesVi": [
        "Vũ khí lập luận giải pháp trong Writing Task 2: Khi đề xuất giải pháp (Solutions) cho các vấn đề nhức nhối như ô nhiễm môi trường, kẹt xe hay thất nghiệp, câu điều kiện loại 1 là công cụ đắc lực nhất để chỉ rõ: 'Nếu chính phủ hành động A ➔ Thì kết quả B tích cực chắc chắn sẽ xảy ra'.",
        "Công thức vàng: `If + S + V(hiện tại đơn), S + will / can / may + V(nguyên thể)`.",
        "Bẫy tử thần số 1: Nhét 'will' vào mệnh đề IF. Trong tiếng Việt ta quen nghĩ 'Nếu chính phủ SẼ đầu tư...' nên thí sinh hay dịch 'If the government will invest...'. Đây là lỗi sai cấm kỵ trong tiếng Anh! Mệnh đề IF luôn luôn giữ ở HIỆN TẠI ĐƠN: 'If the government invests...'."
      ],
      "mechanismAnalysisVi": "Trong lập luận học thuật, Câu điều kiện loại 1 thể hiện tư duy Nguyên nhân - Hệ quả tất yếu (Cause and Effect). Khi bạn dùng 'If... will...', lập luận mang tính thuyết phục rất cao vì nó chỉ ra tính khả thi thực tế của giải pháp.",
      "formulaSummary": "1. KHẲNG ĐỊNH:\n   (+) If + S + V(hiện tại đơn), S + will / can / may + V(nguyên thể)\n   • If authorities subsidize public transit, traffic congestion will decrease.\n\n2. PHỦ ĐỊNH:\n   (-) If + S + don't / doesn't + V, S + will not (won't) + V\n   • If citizens do not recycle waste, landfills will soon become overwhelmed.\n\n3. ĐẢO MỆNH ĐỀ:\n   S + will + V + IF + S + V(hiện tại đơn) (Không cần dấu phẩy)\n   • Carbon emissions will decline if industries adopt green energy.",
      "foundationalExamples": [
        {
          "en": "If the government allocates more funding to renewable energy, carbon emissions will decline substantially.",
          "vi": "Nếu chính phủ phân bổ thêm kinh phí cho năng lượng tái tạo, lượng khí thải carbon sẽ giảm đáng kể.",
          "syntacticBreakdown": "If (Liên từ) + the government allocates (Mệnh đề If hiện tại đơn) +, + carbon emissions will decline (Mệnh đề chính will + V)."
        },
        {
          "en": "Unless individuals reduce their plastic consumption, marine ecosystems will suffer irreparable damage.",
          "vi": "Trừ khi các cá nhân giảm mức tiêu thụ nhựa, các hệ sinh thái biển sẽ phải gánh chịu thiệt hại không thể cứu vãn.",
          "syntacticBreakdown": "Unless (= If not) + individuals reduce... +, + marine ecosystems will suffer..."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy dùng 'will' trong mệnh đề IF",
          "band50WrongExample": "If the government will subsidize electric cars, more people will buy them.",
          "band50TranslationVi": "Nếu chính phủ sẽ trợ cấp xe điện, nhiều người sẽ mua chúng hơn.",
          "band50FlawAnalysisVi": "Mệnh đề điều kiện IF trong tiếng Anh không bao giờ chấp nhận 'will' khi diễn tả điều kiện ở tương lai. Bắt buộc phải chia ở Hiện Tại Đơn: 'subsidizes'.",
          "band80CorrectExample": "If the government subsidizes electric vehicles, consumer adoption will expand considerably.",
          "band80TranslationVi": "Nếu chính phủ trợ cấp cho xe điện, tỷ lệ người tiêu dùng đón nhận sẽ mở rộng đáng kể.",
          "examinerNoteVi": "Quy tắc vàng: MỆNH ĐỀ IF CẤM DÙNG WILL!"
        },
        {
          "trapNameVi": "Bẫy quên chia -s/-es trong mệnh đề If với chủ ngữ số ít",
          "band50WrongExample": "If an employee work overtime consistently, their mental health will deteriorate.",
          "band50TranslationVi": "Nếu một nhân viên làm thêm giờ liên tục, sức khỏe tâm thần của họ sẽ giảm sút.",
          "band50FlawAnalysisVi": "'An employee' là chủ ngữ số ít, động từ trong mệnh đề If ở thì hiện tại đơn bắt buộc phải thêm '-s' (works).",
          "band80CorrectExample": "If an employee works overtime consistently, their psychological well-being will inevitably deteriorate.",
          "band80TranslationVi": "Nếu một nhân viên làm thêm giờ liên tục, sức khỏe tâm lý của họ chắc chắn sẽ suy giảm.",
          "examinerNoteVi": "Mệnh đề If chia đúng quy tắc Hiện Tại Đơn: Chủ ngữ số ít ➔ Động từ thêm -s/-es!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "If policymakers implement comprehensive educational reforms, socio-economic mobility among underprivileged demographics will be noticeably enhanced.",
          "vietnameseTranslation": "Nếu các nhà hoạch định chính sách thực hiện các cải cách giáo dục toàn diện, sự dịch chuyển kinh tế xã hội trong các nhóm yếu thế sẽ được nâng cao rõ rệt.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "If + S số nhiều + V hiện tại (implement) + S + will be noticeably enhanced (Bị động will be V3)",
          "academicNuanceVi": "Kết hợp câu điều kiện loại 1 với thể bị động 'will be enhanced' ở mệnh đề chính tạo nên phong thái học thuật đĩnh đạc của một bài luận Band 8.5.",
          "keyCollocations": [
            "comprehensive educational reforms (cải cách giáo dục toàn diện)",
            "socio-economic mobility (sự dịch chuyển kinh tế xã hội)",
            "underprivileged demographics (các nhóm nhân khẩu học yếu thế)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d13_q1",
        "question": "Chọn câu điều kiện loại 1 đúng chuẩn ngữ pháp:",
        "options": [
          "A. If the company will invest in AI, productivity will rise.",
          "B. If the company invests in AI, productivity will rise.",
          "C. If the company invest in AI, productivity will rise.",
          "D. If the company invests in AI, productivity rises."
        ],
        "correctIndex": 1,
        "trapExplanation": "Mệnh đề If chia Hiện tại đơn với chủ ngữ số ít 'invests', mệnh đề chính dùng 'will rise'. Câu B chính xác.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d13_q2",
        "question": "Từ 'Unless' trong câu 'Unless the city expands public transit, traffic will worsen' tương đương với cụm từ nào?",
        "options": [
          "A. If the city expands",
          "B. If the city does not expand",
          "C. When the city expands",
          "D. Because the city expands"
        ],
        "correctIndex": 1,
        "trapExplanation": "Unless tương đương với 'If... not' (Trừ khi = Nếu không). Vì vậy 'Unless the city expands' = 'If the city does not expand'.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d13_q3",
        "question": "Tìm lỗi sai trong câu: 'If global temperatures will continue to climb, polar ice caps will melt.'",
        "options": [
          "A. will continue",
          "B. to climb",
          "C. polar ice caps",
          "D. will melt"
        ],
        "correctIndex": 0,
        "trapExplanation": "Không được dùng 'will' trong mệnh đề If. Sửa 'will continue' thành 'continue'.",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Sentence Lab: Lập Luận Giải Pháp Điều Kiện Loại 1",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Thực hành viết các câu đề xuất giải pháp Task 2 mạch lạc bằng câu điều kiện loại 1."
    }
  },
  {
    "id": "day14-second-conditional",
    "title": "Ngày 14: Câu Điều Kiện Loại 2 (Second Conditional) • Giả Định Phi Thực & Tốt Nghiệp 14 Ngày",
    "subtitle": "Giả định trái thực tế hiện tại • If + Quá Khứ Đơn, S + would + V • To Be luôn dùng Were • Đánh giá tốt nghiệp 14 ngày",
    "targetBand": "Band 5.0 ➔ 6.0",
    "estimatedMinutes": 15,
    "category": "conditionals",
    "step1Concept": {
      "corePrinciplesVi": [
        "Giả định một thế giới song song: Câu điều kiện loại 2 diễn tả một điều KHÔNG CÓ THẬT hoặc TRÁI NGƯỢC với thực tế ở hiện tại. Thường dùng trong Speaking Part 2 & Part 3 khi giám khảo hỏi: 'If you were the leader of your city, what changes would you make?'.",
        "Công thức lùi thì: (1) Mệnh đề IF: Động từ lùi về Quá Khứ Đơn (V2/ed). Đặc biệt: Động từ To Be luôn chia `WERE` cho MỌI NGÔI trong văn học thuật ('If I were you', 'If the policy were enacted'); (2) Mệnh đề chính: `S + would / could / might + V(nguyên thể)`.",
        "Bẫy kinh điển: Dùng 'will' trong câu giả định trái thực tế ('If I had more time, I will travel' ➔ 'I would travel').",
        "CHÚC MỪNG TỐT NGHIỆP 14 NGÀY CỨU NGỮ PHÁP: Bạn đã chính thức đi hết 14 ngày cứu ngữ pháp nền tảng! Từ chỗ lẫn lộn 'I am agree', sai thì liên miên, sợ câu bị động và so sánh, giờ đây bạn đã làm chủ 14 trụ cột ngữ pháp cốt lõi để tự tin bước sang giai đoạn luyện đề chuyên sâu."
      ],
      "mechanismAnalysisVi": "Ngữ pháp học thuật gọi câu điều kiện loại 2 là 'Hypothetical Mood' (Thể giả định). Khi dùng 'were' và 'would', người nói báo hiệu cho người nghe rằng đây là một kịch bản giả tưởng đầy tính triết lý, thể hiện chiều sâu tư duy ngôn ngữ.",
      "formulaSummary": "1. KHẲNG ĐỊNH:\n   (+) If + S + V2 / V-ed (To Be dùng WERE cho mọi ngôi), S + would / could + V(nguyên thể)\n   • If higher education were free, many low-income students could attend university.\n   • If I had more leisure time, I would pursue creative writing.\n\n2. PHỦ ĐỊNH:\n   (-) If + S + didn't + V, S + would not (wouldn't) + V\n   • If companies didn't prioritize profit, environmental pollution wouldn't be so severe.\n\n3. CÂU HỎI:\n   (?) Would + S + V + if + S + V2/ed?",
      "foundationalExamples": [
        {
          "en": "If governments invested heavily in public healthcare, vulnerable demographics would experience better living conditions.",
          "vi": "Nếu các chính phủ đầu tư mạnh mẽ vào y tế công, các nhóm nhân khẩu học dễ bị tổn thương sẽ có được điều kiện sống tốt hơn.",
          "syntacticBreakdown": "If + governments invested (Quá khứ lùi thì) +, + vulnerable demographics would experience (would + V) + better conditions."
        },
        {
          "en": "If I were in charge of urban planning, I would prioritize pedestrian zones over vehicular highways.",
          "vi": "Nếu tôi phụ trách quy hoạch đô thị, tôi sẽ ưu tiên các khu vực dành cho người đi bộ hơn là đường cao tốc xe cơ giới.",
          "syntacticBreakdown": "If I were (To Be dùng were cho ngôi I) + in charge of urban planning +, + I would prioritize..."
        }
      ]
    },
    "step2Traps": {
      "examinerTraps": [
        {
          "trapNameVi": "Bẫy dùng 'will' thay vì 'would' trong câu giả định",
          "band50WrongExample": "If I had enough savings, I will purchase an electric car.",
          "band50TranslationVi": "Nếu tôi có đủ tiền tiết kiệm, tôi sẽ mua một chiếc xe điện.",
          "band50FlawAnalysisVi": "Mệnh đề If đã lùi thì 'had' (giả định hiện tại không có tiền), nhưng mệnh đề chính lại dùng 'will'. Đây là sự mất cân bằng thì nghiêm trọng.",
          "band80CorrectExample": "If I possessed sufficient financial savings, I would certainly acquire an electric vehicle.",
          "band80TranslationVi": "Nếu tôi sở hữu đủ tiền tiết kiệm tài chính, tôi chắc chắn sẽ mua một chiếc xe điện.",
          "examinerNoteVi": "Công thức loại 2 bắt buộc: IF + V2/ed ➔ S + WOULD + V nguyên thể!"
        },
        {
          "trapNameVi": "Bẫy dùng 'was' thay vì 'were' trong văn viết học thuật",
          "band50WrongExample": "If the tuition was cheaper, more students could enroll.",
          "band50TranslationVi": "Nếu học phí rẻ hơn, nhiều sinh viên hơn có thể đăng ký.",
          "band50FlawAnalysisVi": "Trong văn nói thông thường người bản xứ đôi khi nói 'was', nhưng trong văn viết học thuật IELTS và Cambridge chuẩn mực, To Be trong mệnh đề If loại 2 BẮT BUỘC dùng 'were' cho mọi ngôi.",
          "band80CorrectExample": "If tertiary tuition were more affordable, enrolment rates among low-income students would rise dramatically.",
          "band80TranslationVi": "Nếu học phí đại học phải chăng hơn, tỷ lệ nhập học trong các sinh viên có thu nhập thấp sẽ tăng lên đáng kể.",
          "examinerNoteVi": "Hãy nhớ: If I were, If he were, If the policy were!"
        }
      ]
    },
    "step3Band85Dissections": {
      "academicDissections": [
        {
          "originalSentence": "If stringent environmental accountability were enforced globally, multinational corporations would inevitably adopt circular economic models.",
          "vietnameseTranslation": "Nếu trách nhiệm môi trường nghiêm ngặt được thực thi trên toàn cầu, các tập đoàn đa quốc gia chắc chắn sẽ áp dụng các mô hình kinh tế tuần hoàn.",
          "bandLevel": "Band 8.5+",
          "grammaticalFeature": "Subjunctive Were bị động (were enforced) + S + would inevitably adopt + Cụm danh từ C2 (circular economic models)",
          "academicNuanceVi": "Cấu trúc giả định hoàn hảo kết hợp trạng từ học thuật 'inevitably' tạo nên một câu lập luận Band 8.5 xuất sắc.",
          "keyCollocations": [
            "environmental accountability (trách nhiệm giải trình về môi trường)",
            "circular economic models (mô hình kinh tế tuần hoàn)"
          ]
        }
      ]
    },
    "gatewayQuestions": [
      {
        "id": "d14_q1",
        "question": "Chọn câu điều kiện loại 2 đúng chuẩn học thuật:",
        "options": [
          "A. If I was the minister of education, I will change the curriculum.",
          "B. If I were the minister of education, I would reform the curriculum.",
          "C. If I am the minister of education, I would reform the curriculum.",
          "D. If I were the minister of education, I will reform the curriculum."
        ],
        "correctIndex": 1,
        "trapExplanation": "Mệnh đề If dùng giả định 'were' cho ngôi I, mệnh đề chính dùng 'would reform'. Đáp án B chuẩn xác 100%.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d14_q2",
        "question": "Phân biệt: Câu 'If it rains tomorrow, we will cancel the trip' khác câu 'If it rained tomorrow, we would cancel the trip' ở điểm nào?",
        "options": [
          "A. Không khác nhau.",
          "B. Câu 1 (loại 1) coi việc trời mưa là hoàn toàn có thể xảy ra; câu 2 (loại 2) coi việc trời mưa là rất khó xảy ra hoặc chỉ là giả định tưởng tượng.",
          "C. Cả hai câu đều nói về quá khứ.",
          "D. Câu 2 là thì quá khứ của hôm qua."
        ],
        "correctIndex": 1,
        "trapExplanation": "Câu điều kiện loại 1 diễn tả khả năng có thật ở tương lai; câu điều kiện loại 2 diễn tả kịch bản phi thực hoặc khả năng cực kỳ thấp.",
        "targetPracticeModule": "sentence-writing"
      },
      {
        "id": "d14_q3",
        "question": "ĐIỀU KIỆN TỐT NGHIỆP 14 NGÀY: Để đạt điểm tối đa tiêu chí Grammatical Range and Accuracy trong IELTS, yếu tố nào quan trọng nhất?",
        "options": [
          "A. Chỉ cần viết toàn câu đơn thật dài.",
          "B. Nắm chắc bản chất 14 bài ngữ pháp cốt lõi, không sai thì cơ bản và phối hợp linh hoạt câu đơn - câu ghép - câu phức.",
          "C. Nhồi nhét thật nhiều cấu trúc lạ dù chưa hiểu rõ cách dùng.",
          "D. Chỉ học ngữ pháp mà không cần luyện viết câu."
        ],
        "correctIndex": 1,
        "trapExplanation": "Chính xác! Nền tảng vững chắc, chính xác 100% không mắc lỗi ngớ ngẩn và linh hoạt cấu trúc là chìa khóa đạt Band 7.0+ Ngữ pháp!",
        "targetPracticeModule": "sentence-writing"
      }
    ],
    "unlockedPracticeModule": {
      "id": "sentence-writing",
      "nameVi": "Tốt Nghiệp: Sentence Lab Đỉnh Cao",
      "href": "/practice/sentence-writing",
      "descriptionVi": "Chúc mừng bạn đã hoàn thành 14 Ngày Cứu Ngữ Pháp! Bắt đầu luyện tập tổng hợp ngay."
    }
  },

  // =========================================================================
  // [PHASE 2 — GIAI ĐOẠN 2] CÁC CHUYÊN ĐỀ NGỮ PHÁP HỌC THUẬT NÂNG BAND 7.0+
  // =========================================================================
  {
    id: "academic-tenses-matrix",
    title: "12 Thì Học Thuật & Bẫy Hòa Hợp Thì Trong IELTS Writing Task 1 & Task 2",
    subtitle: "Chấm dứt lỗi sai thì kinh điển • Phân biệt Past Simple vs Present Perfect vs Future Projections",
    targetBand: "Band 4.0 ➔ 5.5+",
    estimatedMinutes: 25,
    category: "tenses",
    step1Concept: {
      corePrinciplesVi: [
        "Thì (Tense) trong văn cảnh IELTS không đơn thuần là công thức chia động từ, mà là 'Lăng kính định vị thời gian và tính hoàn tất của sự kiện' (Temporal & Aspectual Framing).",
        "Writing Task 1 có mốc thời gian quá khứ cố định (e.g. 1990 - 2020) bắt buộc dùng Quá Khứ Đơn (Past Simple). Tuy nhiên, khi mô tả biểu đồ không mốc thời gian hoặc xu hướng kéo dài đến hiện tại, ta phải linh hoạt chuyển sang Hiện Tại Đơn hoặc Hiện Tại Hoàn Thành.",
        "Writing Task 2 sử dụng Hiện Tại Đơn để nêu định đề khoa học, sự thật hiển nhiên; dùng Hiện Tại Hoàn Thành để nói về hệ quả kéo dài đến hiện nay (*'Urbanization has precipitated severe traffic congestion'*); và dùng cấu trúc dự phóng tương lai (*'is projected to...', 'is anticipated to...'*) thay vì chỉ dùng 'will + V' ngô nghê.",
      ],
      mechanismAnalysisVi:
        "Bản chất của Present Perfect (Have/Has + V3) là 'Kết nối quá khứ với thực tại'. Khi giám khảo đọc câu dùng Present Perfect, họ mong đợi một hệ quả hoặc trạng thái còn ảnh hưởng đến hiện tại. Ngược lại, Past Simple khóa chặt sự kiện trong một điểm thời gian đã chấm dứt hoàn toàn.",
      formulaSummary:
        "• Past Simple: S + V2/ed (Dùng cho số liệu Task 1 có năm quá khứ)\n• Present Perfect: S + have/has + V3/ed (Dùng cho hệ quả đến nay)\n• Future Projections: S + is/are projected / predicted / expected to + V (Dự báo tương lai)",
      foundationalExamples: [
        {
          en: "Between 2000 and 2015, global renewable energy consumption surged by 45%.",
          vi: "Từ năm 2000 đến 2015, mức tiêu thụ năng lượng tái tạo toàn cầu đã tăng vọt 45%.",
          syntacticBreakdown: "Trạng từ thời gian xác định 'Between 2000 and 2015' ➔ Động từ chính 'surged' chia Quá khứ đơn (Past Simple).",
        },
        {
          en: "The proliferation of digital technologies has fundamentally transformed contemporary pedagogy.",
          vi: "Sự gia tăng nhanh chóng của công nghệ kỹ thuật số đã thay đổi căn bản phương pháp giáo dục đương đại.",
          syntacticBreakdown: "Hành động bắt đầu trong quá khứ và hệ quả kéo dài đến nay ➔ Động từ 'has fundamentally transformed' chia Hiện tại hoàn thành.",
        },
      ],
    },
    step2Traps: {
      examinerTraps: [
        {
          trapNameVi: "Bẫy Nhầm Lẫn Past Simple Với Present Perfect Trong Task 1",
          band50WrongExample: "In 1995, the proportion of car owners has increased significantly to 65%.",
          band50FlawAnalysisVi: "Sai lầm nghiêm trọng: Dùng Present Perfect 'has increased' khi đã có mốc thời gian xác định trong quá khứ 'In 1995'.",
          band80CorrectExample: "In 1995, the proportion of car owners increased significantly to 65%.",
          examinerNoteVi: "Giám khảo Cambridge sẽ trừ điểm GRA ngay lập tức nếu xuất hiện Present Perfect đi kèm mốc năm quá khứ cụ thể.",
        },
        {
          trapNameVi: "Bẫy Lạm Dụng 'Will' Thay Vì Cấu Trúc Dự Báo Học Thuật",
          band50WrongExample: "By 2030, solar energy will account for 50% of the market.",
          band50FlawAnalysisVi: "Dùng 'will account' tạo cảm giác khẳng định 100% sự việc tương lai chắc chắn xảy ra, vi phạm tính cẩn trọng (Hedging) trong văn phong học thuật.",
          band80CorrectExample: "By 2030, solar energy is projected to account for approximately 50% of the total energy matrix.",
          examinerNoteVi: "Sử dụng 'is projected to + V' hoặc 'is anticipated to + V' giúp bài viết đạt chuẩn Band 7.5+ về tính khách quan.",
        },
      ],
    },
    step3Band85Dissections: {
      academicDissections: [
        {
          originalSentence:
            "While fossil fuel dependence experienced a precipitous decline throughout the previous decade, solar infrastructure has witnessed unprecedented capital investment, and is projected to dominate the energy sector by 2035.",
          bandLevel: "Band 8.5",
          grammaticalFeature: "Sự phối hợp 3 thì hoàn hảo: Quá khứ đơn ➔ Hiện tại hoàn thành ➔ Dự phóng tương lai",
          academicNuanceVi:
            "Câu văn kết hợp nhịp nhàng 3 thì khác nhau trong cùng một câu ghép phức mà không gây rối rắm về thời gian, thể hiện tư duy điều phối thì đỉnh cao của Band 8.5+.",
          keyCollocations: ["experienced a precipitous decline", "witnessed unprecedented capital investment", "is projected to dominate"],
        },
      ],
    },
    gatewayQuestions: [
      {
        id: "t_q1",
        question: "Chọn câu có cách chia thì chính xác nhất cho biểu đồ có mốc thời gian 'From 1990 to 2010':",
        options: [
          "A. From 1990 to 2010, the volume of industrial emissions has risen by 25%.",
          "B. From 1990 to 2010, the volume of industrial emissions rose by 25%.",
          "C. From 1990 to 2010, the volume of industrial emissions is rising by 25%.",
          "D. From 1990 to 2010, the volume of industrial emissions will rise by 25%.",
        ],
        correctIndex: 1,
        trapExplanation: "Mốc thời gian xác định trong quá khứ (1990-2010) bắt buộc dùng Past Simple 'rose', không được dùng Present Perfect hay Present Continuous.",
        targetPracticeModule: "writing_task1",
      },
      {
        id: "t_q2",
        question: "Trong Writing Task 2, câu nào sau đây thể hiện dự đoán tương lai mang tính học thuật (Hedging) chuẩn nhất?",
        options: [
          "A. Artificial intelligence will definitely replace human teachers by 2040.",
          "B. Artificial intelligence is projected to augment traditional classroom instruction by 2040.",
          "C. Artificial intelligence is replacing all teachers in the year 2040.",
          "D. Artificial intelligence had replaced human teachers by 2040.",
        ],
        correctIndex: 1,
        trapExplanation: "Cấu trúc 'is projected to augment' thể hiện tính cẩn trọng và chuẩn mực học thuật hơn là 'will definitely replace'.",
        targetPracticeModule: "writing_task2",
      },
      {
        id: "t_q3",
        question: "Khi mô tả một xu hướng bắt đầu từ 10 năm trước và vẫn đang tiếp tục tăng ở thời điểm hiện tại, thì nào là chuẩn xác nhất?",
        options: [
          "A. Past Simple (S + V2)",
          "B. Past Continuous (S + was/were + V-ing)",
          "C. Present Perfect (S + have/has + V3/ed)",
          "D. Past Perfect (S + had + V3/ed)",
        ],
        correctIndex: 2,
        trapExplanation: "Present Perfect (Hiện tại hoàn thành) diễn tả hành động bắt đầu trong quá khứ kéo dài đến hiện tại và còn để lại kết quả.",
        targetPracticeModule: "grammar",
      },
      {
        id: "t_q4",
        question: "Tìm lỗi sai trong câu: 'Over the last three decades, human activities caused unprecedented environmental degradation.'",
        options: [
          "A. 'Over the last three decades' phải sửa thành 'In three decades'",
          "B. 'caused' phải sửa thành 'have caused'",
          "C. 'unprecedented' phải sửa thành 'unprecedently'",
          "D. 'environmental' phải sửa thành 'environment'",
        ],
        correctIndex: 1,
        trapExplanation: "Cụm 'Over the last three decades' (Trong suốt 3 thập kỷ qua) đòi hỏi động từ chia ở Hiện tại hoàn thành 'have caused' chứ không dùng Quá khứ đơn.",
        targetPracticeModule: "sentence_clinic",
      },
      {
        id: "t_q5",
        question: "Trong Listening Section 1, khi người nói nói 'I used to live in Bristol, but I've recently relocated to Oxford', người này HIỆN TẠI đang sống ở đâu?",
        options: [
          "A. Bristol",
          "B. Oxford",
          "C. Cả Bristol và Oxford",
          "D. Không xác định được",
        ],
        correctIndex: 1,
        trapExplanation: "Cấu trúc 'used to' chỉ thói quen/trạng thái quá khứ đã chấm dứt; 'have relocated to Oxford' xác nhận hiện tại sống ở Oxford.",
        targetPracticeModule: "listening_split",
      },
    ],
    unlockedPracticeModule: {
      id: "writing_task1",
      nameVi: "Phòng Luyện Viết Task 1 (Split-view Data Trends)",
      href: "/practice/writing-task1",
      descriptionVi: "Áp dụng thuần thục các thì quá khứ và dự phóng tương lai vào biểu đồ đường và bảng số liệu.",
    },
  },

  // =========================================================================
  // BÀI 2: MỆNH ĐỀ QUAN HỆ & RÚT GỌN PHÂN TỪ (V-ING / V-ED)
  // =========================================================================
  {
    id: "relative-clauses-participial-reduction",
    title: "Mệnh Đề Quan Hệ & Kỹ Thuật Rút Gọn Mệnh Đề Bằng Phân Từ (V-ing / V-ed)",
    subtitle: "Vũ khí tối thượng nâng điểm Grammatical Range (GRA) từ Band 5.0 lên 7.0+",
    targetBand: "Band 4.5 ➔ 6.0+",
    estimatedMinutes: 30,
    category: "relative_clauses",
    step1Concept: {
      corePrinciplesVi: [
        "Mệnh đề quan hệ (Relative Clauses) cho phép bạn gộp 2 câu đơn vụn vặt thành 1 câu phức mạch lạc, nâng cao tiêu chí Coherence & Cohesion (CC) và Grammatical Range (GRA).",
        "Phân biệt rõ ràng Mệnh đề xác định (Defining - không có dấu phẩy, bắt buộc phải có để xác định danh từ) và Mệnh đề không xác định (Non-defining - có dấu phẩy, chỉ bổ sung thông tin phụ).",
        "Kỹ thuật Rút gọn phân từ (Participial Reduction): Chuyển mệnh đề quan hệ chủ động thành 'V-ing' và bị động thành 'V-ed/V3', giúp câu văn cô đọng, súc tích và đậm chất học thuật.",
      ],
      mechanismAnalysisVi:
        "Khi rút gọn, ta lược bỏ Đại từ quan hệ (who, which, that) và Trợ động từ to-be. Nếu động từ ở thể chủ động ➔ V-ing (*'Students who attend top universities'* ➔ *'Students attending top universities'*). Nếu động từ ở thể bị động ➔ V-ed/V3 (*'Measures which were implemented by the government'* ➔ *'Measures implemented by the government'*).",
      formulaSummary:
        "• Chủ động: Danh từ + [Who/Which + V] ➔ Danh từ + V-ing\n• Bị động: Danh từ + [Which + is/are/was/were + V3/ed] ➔ Danh từ + V3/ed\n• Mệnh đề phân từ chỉ nguyên nhân/hệ quả: [Since/Because S + V] ➔ V-ing / Having + V3, S + V",
      foundationalExamples: [
        {
          en: "Individuals residing in metropolitan centers face elevated levels of psychological stress.",
          vi: "Những cá nhân sinh sống tại các trung tâm đô thị phải đối mặt với mức độ căng thẳng tâm lý tăng cao.",
          syntacticBreakdown: "Rút gọn chủ động từ 'Individuals who reside in metropolitan centers' ➔ 'Individuals residing...'",
        },
        {
          en: "Policies enacted during the economic downturn failed to stabilize inflation.",
          vi: "Các chính sách được ban hành trong thời kỳ suy thoái kinh tế đã không thể ổn định lạm phát.",
          syntacticBreakdown: "Rút gọn bị động từ 'Policies which were enacted...' ➔ 'Policies enacted...'",
        },
      ],
    },
    step2Traps: {
      examinerTraps: [
        {
          trapNameVi: "Bẫy Dùng 'That' Trong Mệnh Đề Có Dấu Phẩy (Non-defining)",
          band50WrongExample: "Hanoi, that is the capital of Vietnam, has experienced rapid urban growth.",
          band50FlawAnalysisVi: "Quy tắc cấm kỵ: 'That' không bao giờ được đứng sau dấu phẩy trong mệnh đề quan hệ không xác định.",
          band80CorrectExample: "Hanoi, which is the capital of Vietnam, has experienced rapid urban growth.",
          examinerNoteVi: "Chỉ dùng 'which' hoặc 'who' cho mệnh đề không xác định có dấu phẩy.",
        },
        {
          trapNameVi: "Bẫy Lơ Lửng Chủ Ngữ Phân Từ (Dangling Modifier Trap)",
          band50WrongExample: "Walking through the city park, the pollution was extremely severe.",
          band50FlawAnalysisVi: "Chủ ngữ của mệnh đề chính là 'the pollution', nhưng ô nhiễm không thể 'walking' được. Đây là lỗi chủ ngữ lơ lửng khiến câu mất nghĩa.",
          band80CorrectExample: "Walking through the city park, pedestrians observed extremely severe levels of pollution.",
          examinerNoteVi: "Chủ ngữ của mệnh đề V-ing rút gọn phải trùng khớp 100% với chủ ngữ của mệnh đề chính đứng sau dấu phẩy.",
        },
      ],
    },
    step3Band85Dissections: {
      academicDissections: [
        {
          originalSentence:
            "Comprehensive infrastructural reforms, spearheaded by municipal authorities and financed through public-private partnerships, have dramatically curtailed commuter transit times.",
          bandLevel: "Band 8.5",
          grammaticalFeature: "Kẹp 2 cụm phân từ bị động rút gọn (spearheaded by... and financed through...)",
          academicNuanceVi:
            "Tác giả chèn 2 cụm phân từ rút gọn bị động vào giữa chủ ngữ và vị ngữ chính, tạo nên câu văn nhiều tầng thông tin nhưng cấu trúc vẫn vững như bàn thạch.",
          keyCollocations: ["spearheaded by municipal authorities", "public-private partnerships", "curtailed commuter transit times"],
        },
      ],
    },
    gatewayQuestions: [
      {
        id: "rc_q1",
        question: "Rút gọn câu sau thành cụm phân từ chuẩn nhất: 'Students who submit their assignments past the deadline will receive a penalty.'",
        options: [
          "A. Students submitted their assignments past the deadline will receive a penalty.",
          "B. Students submitting their assignments past the deadline will receive a penalty.",
          "C. Students to submit their assignments past the deadline will receive a penalty.",
          "D. Students who submitting their assignments past the deadline will receive a penalty.",
        ],
        correctIndex: 1,
        trapExplanation: "Hành động 'submit' là chủ động nên rút gọn thành 'submitting'. Không giữ lại đại từ 'who'.",
        targetPracticeModule: "sentence_clinic",
      },
      {
        id: "rc_q2",
        question: "Rút gọn câu bị động sau: 'The novel which was written by Gabriel García Márquez won international acclaim.'",
        options: [
          "A. The novel writing by Gabriel García Márquez won international acclaim.",
          "B. The novel written by Gabriel García Márquez won international acclaim.",
          "C. The novel was written by Gabriel García Márquez won international acclaim.",
          "D. The novel having written by Gabriel García Márquez won international acclaim.",
        ],
        correctIndex: 1,
        trapExplanation: "Thể bị động rút gọn bằng quá khứ phân từ V3/ed 'written by...', lược bỏ cả 'which' và 'was'.",
        targetPracticeModule: "syntax_transform",
      },
      {
        id: "rc_q3",
        question: "Chọn câu có dấu câu và đại từ quan hệ CHÍNH XÁC nhất:",
        options: [
          "A. Cambridge University, that was founded in 1209, is among the world's oldest institutions.",
          "B. Cambridge University which was founded in 1209 is among the world's oldest institutions.",
          "C. Cambridge University, which was founded in 1209, is among the world's oldest institutions.",
          "D. Cambridge University, who was founded in 1209, is among the world's oldest institutions.",
        ],
        correctIndex: 2,
        trapExplanation: "Cambridge University là tên riêng xác định nên bắt buộc dùng mệnh đề không xác định có 2 dấu phẩy và dùng đại từ 'which', cấm dùng 'that'.",
        targetPracticeModule: "grammar",
      },
      {
        id: "rc_q4",
        question: "Câu nào sau đây mắc lỗi Dangling Modifier (Chủ ngữ phân từ lơ lửng)?",
        options: [
          "A. Having analyzed the statistical survey, researchers discovered significant anomalies.",
          "B. Having analyzed the statistical survey, significant anomalies were discovered by researchers.",
          "C. Analyzing the statistical survey, the team noticed clear trends.",
          "D. After analyzing the statistical survey, the scientists published their findings.",
        ],
        correctIndex: 1,
        trapExplanation: "Ở câu B, 'Having analyzed...' là hành động của con người, nhưng chủ ngữ sau dấu phẩy lại là 'significant anomalies' (các bất thường), dẫn đến lỗi lơ lửng.",
        targetPracticeModule: "sentence_clinic",
      },
      {
        id: "rc_q5",
        question: "Rút gọn 2 mệnh đề nguyên nhân - kết quả: 'Because they lacked financial resources, small enterprises struggled to survive the pandemic.'",
        options: [
          "A. Lacking financial resources, small enterprises struggled to survive the pandemic.",
          "B. Lacked financial resources, small enterprises struggled to survive the pandemic.",
          "C. Because lacking financial resources, small enterprises struggled to survive the pandemic.",
          "D. To lack financial resources, small enterprises struggled to survive the pandemic.",
        ],
        correctIndex: 0,
        trapExplanation: "Rút gọn mệnh đề nguyên nhân chủ động: Bỏ liên từ 'Because', đổi 'lacked' thành 'Lacking financial resources...'.",
        targetPracticeModule: "writing_task2",
      },
    ],
    unlockedPracticeModule: {
      id: "sentence_clinic",
      nameVi: "Phòng Khám Câu & Bóc Tách Cú Pháp (Sentence Clinic Studio)",
      href: "/practice/sentence-clinic",
      descriptionVi: "Luyện nối câu ghép và rút gọn mệnh đề phân từ để nâng điểm GRA lên 7.0+.",
    },
  },

  // =========================================================================
  // BÀI 3: THỂ BỊ ĐỘNG KHÁCH QUAN (IMPERSONAL PASSIVE)
  // =========================================================================
  {
    id: "academic-impersonal-passive",
    title: "Thể Bị Động Khách Quan (Impersonal Passive) Nâng Cao Tính Học Thuật",
    subtitle: "Chuyển hóa văn phong từ cá nhân, chủ quan sang chuẩn mực nghiên cứu quốc tế",
    targetBand: "Band 5.0 ➔ 6.5+",
    estimatedMinutes: 25,
    category: "passive_voice",
    step1Concept: {
      corePrinciplesVi: [
        "Văn phong học thuật IELTS Writing Task 2 đòi hỏi tính Khách quan (Objectivity) và Tính cẩn trọng (Hedging). Việc lạm dụng 'I think', 'Many people say' làm giảm uy lực của luận điểm.",
        "Thể bị động khách quan (Impersonal Passive) cho phép trình bày một quan điểm như một đồng thuận xã hội hoặc giả thuyết khoa học được thừa nhận rộng rãi.",
        "Có 2 cấu trúc bị động khách quan kinh điển:\n  1. It is + V3 (believed/argued/contended/postulated) + that + S + V\n  2. S + is/are + V3 (believed/reported/estimated) + to + V / to have + V3",
      ],
      mechanismAnalysisVi:
        "Thay vì nói *'People believe that climate change causes floods'*, ta chuyển sang *'It is widely believed that climate change triggers severe flooding'* hoặc *'Climate change is believed to trigger severe flooding'*. Cấu trúc thứ 2 đưa chủ ngữ quan trọng (Climate change) lên đầu câu để nhấn mạnh tâm điểm thông tin (Topic Prominence).",
      formulaSummary:
        "• Công thức 1: It is widely + argued / acknowledged / asserted / believed + that + Clause\n• Công thức 2: Subject + is/are + considered / reported / estimated + to + Inf (Hiện tại)\n• Công thức 3: Subject + is/are + believed / thought + to have + V3/ed (Xảy ra trong quá khứ)",
      foundationalExamples: [
        {
          en: "It is widely acknowledged that early childhood education plays a pivotal role in cognitive development.",
          vi: "Người ta thừa nhận rộng rãi rằng giáo dục mầm non đóng vai trò then chốt trong sự phát triển nhận thức.",
          syntacticBreakdown: "Cấu trúc 'It is widely acknowledged that...' thay thế hoàn toàn cho 'Everyone knows that...'",
        },
        {
          en: "The ancient monument is estimated to date back more than three millennia.",
          vi: "Di tích cổ đại này được ước tính có niên đại hơn ba thiên niên kỷ.",
          syntacticBreakdown: "Cấu trúc 'S + is estimated to date back...' đưa di tích lên làm tiêu điểm câu.",
        },
      ],
    },
    step2Traps: {
      examinerTraps: [
        {
          trapNameVi: "Bẫy Dùng 'To-Be' Thiếu Khi Chia Bị Động Khách Quan",
          band50WrongExample: "It argued that university tuition should be subsidized by the state.",
          band50FlawAnalysisVi: "Thiếu trợ động từ 'is' khiến câu biến thành thể chủ động vô nghĩa ('Nó đã lập luận rằng...').",
          band80CorrectExample: "It is convincingly argued that university tuition should be subsidized by the state.",
          examinerNoteVi: "Bắt buộc phải có 'is/are/was/were' trước quá khứ phân từ V3.",
        },
        {
          trapNameVi: "Bẫy Nhầm Lẫn Giữa 'To V' Và 'To Have V3' Khi Nói Về Sự Kiện Quá Khứ",
          band50WrongExample: "The fire is believed to start due to an electrical malfunction yesterday.",
          band50FlawAnalysisVi: "Vụ hỏa hoạn đã xảy ra hôm qua (quá khứ) nhưng lại dùng 'to start' (hiện tại). Phải dùng 'to have started'.",
          band80CorrectExample: "The fire is believed to have started due to an electrical malfunction yesterday.",
          examinerNoteVi: "Dùng 'to have + V3' để diễn tả hành động xảy ra trước thời điểm đánh giá của động từ bị động chính.",
        },
      ],
    },
    step3Band85Dissections: {
      academicDissections: [
        {
          originalSentence:
            "While it is frequently asserted that technological automation induces widespread structural unemployment, innovative industrial sectors are increasingly reported to experience acute labor deficits.",
          bandLevel: "Band 8.5",
          grammaticalFeature: "Đối xứng 2 cấu trúc bị động khách quan trong cùng một câu nhượng bộ",
          academicNuanceVi:
            "Vế 1 dùng 'It is frequently asserted that...', vế 2 dùng 'S + are reported to experience...', tạo ra thế cân bằng học thuật tuyệt mỹ cho câu mở đoạn Task 2.",
          keyCollocations: ["frequently asserted that", "structural unemployment", "acute labor deficits"],
        },
      ],
    },
    gatewayQuestions: [
      {
        id: "ip_q1",
        question: "Chuyển câu 'People believe that exercise improves mental health' sang bị động khách quan chuẩn nhất:",
        options: [
          "A. It believes that exercise improves mental health.",
          "B. It is widely believed that exercise improves mental health.",
          "C. Exercise is believe to improve mental health.",
          "D. People are believed that exercise improves mental health.",
        ],
        correctIndex: 1,
        trapExplanation: "Cấu trúc chuẩn là 'It is widely believed that + clause'. Câu C sai chính tả 'believe' thay vì 'believed'.",
        targetPracticeModule: "writing_task2",
      },
      {
        id: "ip_q2",
        question: "Chọn câu đúng khi nói về sự việc xảy ra trong quá khứ: 'The ancient city _____ during the 5th century.'",
        options: [
          "A. is believed to establish",
          "B. is believed to have been established",
          "C. was believed to establishing",
          "D. is believing to establish",
        ],
        correctIndex: 1,
        trapExplanation: "Thành phố được thành lập trong quá khứ (5th century) và ở thể bị động nên phải dùng 'is believed to have been established'.",
        targetPracticeModule: "sentence_clinic",
      },
      {
        id: "ip_q3",
        question: "Động từ nào sau đây KHÔNG THƯỜNG đi với cấu trúc 'It is + V3 + that'?",
        options: [
          "A. argued",
          "B. hypothesized",
          "C. said",
          "D. wanted",
        ],
        correctIndex: 3,
        trapExplanation: "'Wanted' thể hiện ý muốn chủ quan, không dùng trong cấu trúc bị động khách quan học thuật như argued, hypothesized, postulated.",
        targetPracticeModule: "grammar",
      },
      {
        id: "ip_q4",
        question: "Tìm lỗi sai trong câu: 'It is commonly claim that modern lifestyles cause chronic illnesses.'",
        options: [
          "A. 'is' sửa thành 'are'",
          "B. 'claim' sửa thành 'claimed'",
          "C. 'cause' sửa thành 'causing'",
          "D. 'chronic' sửa thành 'chronically'",
        ],
        correctIndex: 1,
        trapExplanation: "Sau 'It is commonly...' bắt buộc dùng quá khứ phân từ V3 'claimed'.",
        targetPracticeModule: "sentence_clinic",
      },
      {
        id: "ip_q5",
        question: "Trong Writing Task 2, câu nào thể hiện lập trường khách quan Band 7.5+?",
        options: [
          "A. In my humble opinion, I think social media is bad.",
          "B. It is contended by numerous sociologists that excessive social media usage undermines interpersonal communication.",
          "C. Many people say that social media is very harmful for human.",
          "D. I and my friends believe social media destroys relations.",
        ],
        correctIndex: 1,
        trapExplanation: "'It is contended by numerous sociologists that...' nâng tầm học thuật và tính khách quan vượt trội so với văn phong khẩu ngữ.",
        targetPracticeModule: "writing_task2",
      },
    ],
    unlockedPracticeModule: {
      id: "writing_toulmin",
      nameVi: "Phòng Lập Luận Toulmin Task 2 (Claim - Data - Warrant)",
      href: "/practice/writing-toulmin",
      descriptionVi: "Ứng dụng thể bị động khách quan vào xây dựng Luận điểm (Claim) và Bằng chứng học thuật (Data).",
    },
  },

  // =========================================================================
  // BÀI 4: CÂU ĐIỀU KIỆN LOẠI 1-2-3 & HỖN HỢP (MIXED CONDITIONALS)
  // =========================================================================
  {
    id: "conditionals-mixed-forms",
    title: "Câu Điều Kiện Loại 1-2-3 & Câu Điều Kiện Hỗn Hợp (Mixed Conditionals)",
    subtitle: "Công cụ lập luận giả định phản biện (Counterfactual Reasoning) trong Writing & Speaking",
    targetBand: "Band 5.0 ➔ 7.0+",
    estimatedMinutes: 30,
    category: "conditionals",
    step1Concept: {
      corePrinciplesVi: [
        "Câu điều kiện (Conditionals) không chỉ dùng để nói 'Nếu... thì...', mà là công cụ then chốt để 'Lập luận giả định phản chứng' (Counter-argument & Hypothetical Deduction) trong Writing Task 2 và Speaking Part 3.",
        "Câu điều kiện loại 2 giả định tình huống trái với hiện tại (*'If governments imposed heavier taxes on carbon emissions, corporations would innovate cleaner technologies'*).",
        "Câu điều kiện loại 3 giả định tình huống trái với quá khứ (*'If the quarantine protocols had been enacted earlier, the contagion would not have proliferated'*).",
        "Câu điều kiện hỗn hợp (Mixed Conditionals): Kết nối 'Giả định quá khứ ➔ Hệ quả hiện tại' (If + had + V3, S + would + V) hoặc 'Bản chất hiện tại ➔ Hành động quá khứ' (If + V2, S + would have + V3).",
      ],
      mechanismAnalysisVi:
        "Cấu trúc Mixed Conditional loại 1 (Past condition ➔ Present result) cực kỳ phổ biến trong giải thích chính sách: *'If the country had invested in green infrastructure a decade ago, it would not suffer from acute energy shortages today'*. Vế 'If' ở quá khứ (had invested), vế chính ở hiện tại (would not suffer today).",
      formulaSummary:
        "• Type 2 (Hiện tại): If + S + V2/were, S + would/could + V\n• Type 3 (Quá khứ): If + S + had + V3/ed, S + would/could have + V3/ed\n• Mixed 1 (Quá khứ ➔ Hiện tại): If + S + had + V3/ed, S + would/could + V (now/today)\n• Inversion (Đảo ngữ điều kiện): Had S + V3, S + would have... / Were S to V, S would...",
      foundationalExamples: [
        {
          en: "Were governments to subsidize tertiary education, socio-economic mobility would improve markedly.",
          vi: "Nếu các chính phủ trợ cấp giáo dục đại học, khả năng dịch chuyển kinh tế - xã hội sẽ cải thiện rõ rệt.",
          syntacticBreakdown: "Đảo ngữ câu điều kiện loại 2: 'Were governments to subsidize...' thay cho 'If governments subsidized...'",
        },
        {
          en: "Had municipal authorities implemented flood defenses earlier, the city would not face severe inundation today.",
          vi: "Nếu chính quyền đô thị triển khai đê kè sớm hơn, thành phố đã không phải đối mặt với ngập lụt nghiêm trọng hôm nay.",
          syntacticBreakdown: "Mixed Conditional: Giả định quá khứ (Had implemented) dẫn đến hệ quả hiện tại (would not face today).",
        },
      ],
    },
    step2Traps: {
      examinerTraps: [
        {
          trapNameVi: "Bẫy Dùng 'Would' Ngay Trong Mệnh Đề 'If'",
          band50WrongExample: "If the government would invest more money, public health will improve.",
          band50FlawAnalysisVi: "Quy tắc cấm kỵ: Mệnh đề 'If' không bao giờ chứa modal verb 'would'.",
          band80CorrectExample: "If the government invested more funds, public health would improve substantially.",
          examinerNoteVi: "Mệnh đề 'If' chỉ chia ở thì quá khứ đơn (Type 2) hoặc quá khứ hoàn thành (Type 3). 'Would' chỉ nằm ở mệnh đề chính.",
        },
        {
          trapNameVi: "Bẫy Lẫn Lộn Giữa Type 3 Thuần Túy Và Mixed Conditional",
          band50WrongExample: "If he had taken the advice yesterday, he would have been rich today.",
          band50FlawAnalysisVi: "Có từ 'today' chỉ hiện tại nhưng lại dùng 'would have been' (quá khứ). Phải dùng 'would be rich today'.",
          band80CorrectExample: "If he had taken the advice yesterday, he would be financially secure today.",
          examinerNoteVi: "Kiểm tra dấu hiệu thời gian ở mệnh đề chính (today, now, currently) để chọn đúng thể Mixed Conditional.",
        },
      ],
    },
    step3Band85Dissections: {
      academicDissections: [
        {
          originalSentence:
            "Had developing economies not prioritized rapid industrialization over ecological preservation during the late twentieth century, contemporary metropolitan areas would not be grappling with unprecedented particulate pollution levels today.",
          bandLevel: "Band 8.5",
          grammaticalFeature: "Đảo ngữ câu điều kiện hỗn hợp (Had S not V3... would not be V-ing today)",
          academicNuanceVi:
            "Câu văn kết hợp Đảo ngữ phủ định quá khứ hoàn thành với thì Hiện tại tiếp diễn ở mệnh đề chính, tạo nên sức nặng phản biện thuyết phục tuyệt đối.",
          keyCollocations: ["prioritized rapid industrialization over ecological preservation", "grappling with unprecedented pollution", "particulate pollution levels"],
        },
      ],
    },
    gatewayQuestions: [
      {
        id: "con_q1",
        question: "Chọn câu điều kiện loại 2 CHÍNH XÁC:",
        options: [
          "A. If cities would ban private cars, air quality will improve.",
          "B. If cities banned private cars, air quality would improve.",
          "C. If cities bans private cars, air quality would improve.",
          "D. If cities had banned private cars, air quality will improve.",
        ],
        correctIndex: 1,
        trapExplanation: "Cấu trúc Type 2 chuẩn: If + S + V2 (banned), S + would + V (would improve).",
        targetPracticeModule: "grammar",
      },
      {
        id: "con_q2",
        question: "Chọn câu Mixed Conditional chuẩn cho tình huống: 'Quá khứ không học ngoại ngữ ➔ Hiện tại không xin được việc':",
        options: [
          "A. If I had learned a foreign language, I would have got a job today.",
          "B. If I learned a foreign language, I would get a job today.",
          "C. If I had acquired foreign language proficiency, I would hold a competitive job today.",
          "D. If I acquire foreign language proficiency, I would hold a competitive job today.",
        ],
        correctIndex: 2,
        trapExplanation: "Vế 'If' ở quá khứ (had acquired), vế chính có 'today' nên dùng 'would hold' (Mixed Conditional).",
        targetPracticeModule: "writing_task2",
      },
      {
        id: "con_q3",
        question: "Đảo ngữ câu điều kiện loại 3 của 'If the policy had succeeded, the economy would have recovered':",
        options: [
          "A. Had the policy succeeded, the economy would have recovered.",
          "B. Did the policy succeed, the economy would have recovered.",
          "C. Were the policy to succeed, the economy would have recovered.",
          "D. Should the policy succeed, the economy would have recovered.",
        ],
        correctIndex: 0,
        trapExplanation: "Đảo ngữ Type 3: Đưa 'Had' lên đầu câu và bỏ 'If' ➔ 'Had the policy succeeded...'.",
        targetPracticeModule: "syntax_transform",
      },
      {
        id: "con_q4",
        question: "Tìm lỗi sai trong câu: 'Were the government to intervenes promptly, the crisis would be resolved.'",
        options: [
          "A. 'Were' sửa thành 'Was'",
          "B. 'intervenes' sửa thành 'intervene'",
          "C. 'would' sửa thành 'will'",
          "D. 'resolved' sửa thành 'resolving'",
        ],
        correctIndex: 1,
        trapExplanation: "Sau 'Were S to...' động từ phải ở dạng nguyên mẫu không chia 'intervene', không thêm 's'.",
        targetPracticeModule: "sentence_clinic",
      },
      {
        id: "con_q5",
        question: "Trong Speaking Part 3, khi giám khảo hỏi 'How would society change if everyone worked remotely?', cấu trúc nào sau đây ăn điểm GRA cao nhất?",
        options: [
          "A. I think everyone will be happy and work at home.",
          "B. Were remote working to become universally mandatory, urban transit congestion would diminish dramatically.",
          "C. If people work from home, they would feel lazy.",
          "D. Maybe people would have been working at home in the future.",
        ],
        correctIndex: 1,
        trapExplanation: "Cấu trúc đảo ngữ 'Were remote working to become...' kết hợp từ vựng C1 (diminish dramatically) tạo điểm nhấn ngữ pháp xuất sắc.",
        targetPracticeModule: "speaking_p3",
      },
    ],
    unlockedPracticeModule: {
      id: "advanced_syntax",
      nameVi: "Phòng Luyện Cú Pháp Học Thuật Đỉnh Cao (Inversion & Nominalization)",
      href: "/practice/advanced-syntax",
      descriptionVi: "Thực hành đảo ngữ điều kiện và câu chẻ để đạt Band 8.0+ Ngữ pháp.",
    },
  },
];
