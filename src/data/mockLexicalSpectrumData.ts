/**
 * Mock Data for Lexical Connotation Spectrum & Anti-Thesaurus Trap Studio (Step 86)
 * Academic Concept Clusters, 5-Tier Nuance Spectra, Register Calibrations & Collocation Quiz Arena
 */

import { LexicalConceptCluster, CollocationMatchItem } from "@/lib/lexicalSemanticsEngine";

export const MOCK_LEXICAL_CLUSTERS: LexicalConceptCluster[] = [
  {
    id: "concept_thrift_spending",
    conceptName: "Thrift & Financial Prudence (Mức Độ Tiết Kiệm & Chi Tiêu)",
    academicDomain: "Economics & Labor Markets",
    coreDescription: "Trường nghĩa miêu tả hành vi kiểm soát chi tiêu: từ keo kiệt bủn xỉn (tiêu cực) tới tiết kiệm khoa học và nhìn xa trông rộng (tán dương C2).",
    wordsSpectrum: [
      {
        word: "miserly / stingy",
        ipa: "/ˈmaɪ.zər.li/",
        partOfSpeech: "adjective",
        connotationScore: -2,
        connotationLevel: "severe_pejorative",
        connotationLabel: "Chỉ trích gay gắt (Keo kiệt, bủn xỉn)",
        registerScore: 40,
        registerCategory: "Neutral Everyday",
        bandLevel: 6.0,
        vietnameseMeaning: "Keo kiệt, ki bo, từ chối chi tiêu dù cho việc chính đáng.",
        nuanceExplanation: "Mang tính miệt thị đạo đức cá nhân hoặc sự bủn xỉn làm tổn hại đến phúc lợi xã hội.",
        thesaurusMisuseTrap: "Dùng để khen ngợi chính sách thắt chặt chi tiêu của chính phủ là sai sắc thái nghiêm trọng.",
        collocationalPartners: ["miserly wage", "stingy welfare allocation", "miserly attitude"],
        modelAcademicSentence: "Critics contend that the enterprise adopted a miserly stance toward employee healthcare provisions."
      },
      {
        word: "austere",
        ipa: "/ɔːˈstɪər/",
        partOfSpeech: "adjective",
        connotationScore: -1,
        connotationLevel: "mild_pejorative",
        connotationLabel: "Hạn hẹp / Khắc khổ (Thắt lưng buộc bụng)",
        registerScore: 85,
        registerCategory: "Formal Academic",
        bandLevel: 7.5,
        vietnameseMeaning: "Khắc khổ, thắt chặt chi tiêu gây khó khăn.",
        nuanceExplanation: "Miêu tả điều kiện kinh tế khắc nghiệt do cắt giảm ngân sách công.",
        thesaurusMisuseTrap: "Dùng 'austere' để nói về lối sống tối giản tích cực thay vì bối cảnh khó khăn tài chính.",
        collocationalPartners: ["austere economic climate", "austere living conditions", "fiscal austerity"],
        modelAcademicSentence: "The administration enforced austere budgetary measures in response to soaring sovereign debt."
      },
      {
        word: "frugal / economical",
        ipa: "/ˈfruː.ɡəl/",
        partOfSpeech: "adjective",
        connotationScore: 0,
        connotationLevel: "neutral_academic",
        connotationLabel: "Khách quan trung lập (Tiết kiệm hợp lý)",
        registerScore: 75,
        registerCategory: "Formal Academic",
        bandLevel: 7.5,
        vietnameseMeaning: "Tiết kiệm, tránh lãng phí tài nguyên một cách có ý thức.",
        nuanceExplanation: "Thuật ngữ trung tính miêu tả sự quản lý tài chính thận trọng và thực tế.",
        thesaurusMisuseTrap: "Hoàn toàn an toàn để dùng trong Task 2 khi nói về thói quen tiêu dùng của người dân.",
        collocationalPartners: ["frugal lifestyle", "economical utilization of resources", "frugal habits"],
        modelAcademicSentence: "Households adopting frugal consumption patterns demonstrated greater resilience during inflation."
      },
      {
        word: "judiciously prudent",
        ipa: "/dʒuːˈdɪʃ.əs.li ˈpruː.dənt/",
        partOfSpeech: "adjective",
        connotationScore: 1,
        connotationLevel: "mild_favorable",
        connotationLabel: "Được đánh giá cao (Thận trọng, sáng suốt)",
        registerScore: 90,
        registerCategory: "Formal Academic",
        bandLevel: 8.5,
        vietnameseMeaning: "Thận trọng sáng suốt, có tính toán rủi ro kỹ lưỡng.",
        nuanceExplanation: "Thể hiện sự khôn ngoan trong việc dự phòng cho các biến cố tương lai.",
        thesaurusMisuseTrap: "Không dùng cho việc tiết kiệm vặt vãnh; chỉ áp dụng cho quyết sách quản trị lớn.",
        collocationalPartners: ["judiciously prudent fiscal policy", "prudent investment strategy", "prudent governance"],
        modelAcademicSentence: "The central bank exercised a judiciously prudent monetary policy to curb speculative bubbles."
      },
      {
        word: "exemplary stewardship",
        ipa: "/ɪɡˈzem.plər.i ˈstjuː.əd.ʃɪp/",
        partOfSpeech: "noun",
        connotationScore: 2,
        connotationLevel: "high_laudatory",
        connotationLabel: "Tán dương đỉnh cao (Năng lực quản trị mẫu mực)",
        registerScore: 98,
        registerCategory: "High Academic C2",
        bandLevel: 9.0,
        vietnameseMeaning: "Sự quản lý tài nguyên mẫu mực, nhìn xa trông rộng.",
        nuanceExplanation: "Lời khen ngợi trang trọng nhất dành cho lãnh đạo hoặc cơ quan điều hành.",
        thesaurusMisuseTrap: "Chỉ dùng khi bài viết phân tích các chính sách vĩ mô đạt thành tựu xuất sắc.",
        collocationalPartners: ["exemplary ecological stewardship", "demonstrate exemplary stewardship of public funds"],
        modelAcademicSentence: "The municipality's exemplary stewardship of tax revenues generated sustainable municipal infrastructure."
      }
    ],
    thesaurusPitfalls: [
      {
        misusedWord: "miserly",
        intendedMeaning: "Thận trọng tiết kiệm ngân sách nhà nước",
        examinerCritique: "Từ 'miserly' mang hàm ý xúc phạm sự bủn xỉn cá nhân, không phù hợp để khen ngợi chính sách kinh tế.",
        correctAlternative: "judiciously prudent fiscal management"
      }
    ]
  },
  {
    id: "concept_inflexibility_resolve",
    conceptName: "Stubbornness vs Resolute Determination (Độ Cứng Nhắc vs Kiên Định)",
    academicDomain: "Psychology & Cognitive Science",
    coreDescription: "Trường nghĩa miêu tả sự kiên trì giữ vững lập trường: từ bảo thủ mù quáng (tiêu cực) tới kiên định không lay chuyển trước khó khăn (tán dương).",
    wordsSpectrum: [
      {
        word: "dogmatic / obstinate",
        ipa: "/dɒɡˈmæt.ɪk/",
        partOfSpeech: "adjective",
        connotationScore: -2,
        connotationLevel: "severe_pejorative",
        connotationLabel: "Chỉ trích gay gắt (Võ đoán, bảo thủ mù quáng)",
        registerScore: 85,
        registerCategory: "Formal Academic",
        bandLevel: 8.0,
        vietnameseMeaning: "Bảo thủ, khăng khăng ý kiến cá nhân bất chấp bằng chứng thực nghiệm.",
        nuanceExplanation: "Chỉ trích người hoặc tổ chức từ chối tiếp thu tri thức mới.",
        thesaurusMisuseTrap: "Không dùng để miêu tả sự bền bỉ của một vận động viên hay nhà khoa học theo đuổi chân lý.",
        collocationalPartners: ["dogmatic adherence to dogma", "obstinate refusal to reform", "dogmatic mindset"],
        modelAcademicSentence: "Dogmatic adherence to outdated pedagogical paradigms impedes curriculum modernization."
      },
      {
        word: "unyielding / inflexible",
        ipa: "/ʌnˈjiːl.dɪŋ/",
        partOfSpeech: "adjective",
        connotationScore: -1,
        connotationLevel: "mild_pejorative",
        connotationLabel: "Thiếu mềm dẻo (Cứng nhắc)",
        registerScore: 75,
        registerCategory: "Formal Academic",
        bandLevel: 7.0,
        vietnameseMeaning: "Không nhân nhượng, thiếu linh hoạt theo hoàn cảnh.",
        nuanceExplanation: "Nhấn mạnh vào điểm trừ về sự thiếu khả năng thích ứng (lack of adaptability).",
        thesaurusMisuseTrap: "Dùng để phê bình các quy định hành chính rườm rà.",
        collocationalPartners: ["unyielding bureaucracy", "inflexible timetable", "unyielding stance"],
        modelAcademicSentence: "The institution's inflexible stance alienated international collaborators."
      },
      {
        word: "steadfast",
        ipa: "/ˈsted.fɑːst/",
        partOfSpeech: "adjective",
        connotationScore: 0,
        connotationLevel: "neutral_academic",
        connotationLabel: "Trung lập (Vững vàng, không dao động)",
        registerScore: 80,
        registerCategory: "Formal Academic",
        bandLevel: 7.5,
        vietnameseMeaning: "Kiên định, giữ nguyên quan điểm trước áp lực.",
        nuanceExplanation: "Mô tả trạng thái tinh thần ổn định, không thiên vị hay khen chê thái quá.",
        thesaurusMisuseTrap: "Rất thích hợp cho các bài nghị luận về việc duy trì cam kết quốc tế.",
        collocationalPartners: ["steadfast commitment", "remain steadfast in one's conviction"],
        modelAcademicSentence: "Signatory nations remained steadfast in their commitment to carbon reduction targets."
      },
      {
        word: "resolute / tenaciously persistent",
        ipa: "/ˈrez.ə.luːt/",
        partOfSpeech: "adjective",
        connotationScore: 1,
        connotationLevel: "mild_favorable",
        connotationLabel: "Tích cực khen ngợi (Kiên định, có ý chí đanh thép)",
        registerScore: 90,
        registerCategory: "Formal Academic",
        bandLevel: 8.5,
        vietnameseMeaning: "Quyết tâm sắt đá, vượt qua mọi trở ngại để hoàn thành mục tiêu.",
        nuanceExplanation: "Khen ngợi ý chí kiên cường và phẩm chất kiên trì của con người.",
        thesaurusMisuseTrap: "Không dùng cho kẻ cố chấp làm việc phi nghĩa.",
        collocationalPartners: ["resolute leadership", "tenacious pursuit of scientific discovery", "resolute action"],
        modelAcademicSentence: "The healthcare workers exhibited resolute courage in mitigating the infectious outbreak."
      },
      {
        word: "unwavering fortitude",
        ipa: "/ʌnˈweɪ.vər.ɪŋ ˈfɔː.tɪ.tʃuːd/",
        partOfSpeech: "noun",
        connotationScore: 2,
        connotationLevel: "high_laudatory",
        connotationLabel: "Tán dương đỉnh cao (Nghị lực phi thường, bất khuất)",
        registerScore: 98,
        registerCategory: "High Academic C2",
        bandLevel: 9.0,
        vietnameseMeaning: "Sự kiên cường bất khuất, dũng khí không lay chuyển.",
        nuanceExplanation: "Tôn vinh nhân cách cao quý vượt qua nghịch cảnh cùng cực.",
        thesaurusMisuseTrap: "Chỉ sử dụng trong các bài luận có chiều sâu triết học hoặc nhân văn cao độ.",
        collocationalPartners: ["display unwavering fortitude", "with unwavering fortitude and integrity"],
        modelAcademicSentence: "Marginalized communities navigated systemic oppression with unwavering fortitude."
      }
    ],
    thesaurusPitfalls: [
      {
        misusedWord: "obstinate",
        intendedMeaning: "Kiên trì theo đuổi nghiên cứu khoa học",
        examinerCritique: "Từ 'obstinate' mang nghĩa tiêu cực là bướng bỉnh ngang ngạnh, làm bài viết nghe như đang chê bai nhà khoa học.",
        correctAlternative: "tenaciously persistent in scientific inquiry"
      }
    ]
  },
  {
    id: "concept_change_reform",
    conceptName: "Change & Transformation (Sự Thay Đổi & Cải Cách)",
    academicDomain: "Sociology & Demographics",
    coreDescription: "Trường nghĩa miêu tả sự biến đổi: từ xáo trộn hỗn loạn (tiêu cực) tới cải tổ có hệ thống (tán dương C2).",
    wordsSpectrum: [
      {
        word: "upheaval / convulsion",
        ipa: "/ʌpˈhiː.vəl/",
        partOfSpeech: "noun",
        connotationScore: -2,
        connotationLevel: "severe_pejorative",
        connotationLabel: "Tiêu cực nặng nề (Sự biến động dữ dội, xáo trộn)",
        registerScore: 88,
        registerCategory: "Formal Academic",
        bandLevel: 8.0,
        vietnameseMeaning: "Sự xáo trộn hỗn loạn làm đứt gãy trật tự xã hội.",
        nuanceExplanation: "Nhấn mạnh vào thiệt hại và sự bất ổn sâu sắc.",
        thesaurusMisuseTrap: "Không dùng để nói về sự cải cách tích cực mang lại tiến bộ.",
        collocationalPartners: ["geopolitical upheaval", "social convulsion", "economic upheaval"],
        modelAcademicSentence: "The rapid automation of manufacturing triggered severe socioeconomic upheaval."
      },
      {
        word: "alteration / modification",
        ipa: "/ˌɔːl.təˈreɪ.ʃən/",
        partOfSpeech: "noun",
        connotationScore: 0,
        connotationLevel: "neutral_academic",
        connotationLabel: "Khách quan trung lập (Sự chỉnh sửa, thay đổi)",
        registerScore: 80,
        registerCategory: "Formal Academic",
        bandLevel: 7.5,
        vietnameseMeaning: "Sự thay đổi về mặt cấu trúc hoặc tính năng mà không khen chê.",
        nuanceExplanation: "Thuật ngữ kỹ thuật tiêu chuẩn miêu tả sự điều chỉnh.",
        thesaurusMisuseTrap: "An toàn cho mọi chủ đề Task 1 và Task 2.",
        collocationalPartners: ["structural alteration", "minor modification to the protocol"],
        modelAcademicSentence: "Slight alterations in the genetic sequence produced divergent evolutionary traits."
      },
      {
        word: "paradigm shift / structural metamorphosis",
        ipa: "/ˈpær.ə.daɪm ʃɪft/",
        partOfSpeech: "noun",
        connotationScore: 2,
        connotationLevel: "high_laudatory",
        connotationLabel: "Tán dương bước ngoặt lịch sử (Sự chuyển dịch hệ hình)",
        registerScore: 95,
        registerCategory: "High Academic C2",
        bandLevel: 9.0,
        vietnameseMeaning: "Bước ngoặt làm thay đổi căn bản toàn bộ cách tư duy và vận hành.",
        nuanceExplanation: "Chỉ các cuộc cách mạng tri thức hoặc công nghệ mang tính đột phá toàn cầu.",
        thesaurusMisuseTrap: "Không dùng cho những thay đổi nhỏ, cục bộ.",
        collocationalPartners: ["trigger a paradigm shift", "represent a fundamental paradigm shift"],
        modelAcademicSentence: "The advent of generative artificial intelligence represents a profound paradigm shift in educational pedagogy."
      }
    ],
    thesaurusPitfalls: [
      {
        misusedWord: "upheaval",
        intendedMeaning: "Sự cải cách giáo dục tích cực",
        examinerCritique: "Từ 'upheaval' ám chỉ sự đảo lộn tai họa, đi ngược lại lập luận ủng hộ cải cách.",
        correctAlternative: "systemic educational reform / paradigm shift"
      }
    ]
  }
];

export const MOCK_COLLOCATION_QUIZ_ARENA: CollocationMatchItem[] = [
  {
    id: "colloc_hypothesis",
    targetNounOrKeyword: "hypothesis (giả thuyết nghiên cứu)",
    domain: "Scientific Inquiry",
    cambridgeAcademicContext: "Động từ nào kết hợp chuẩn C1/C2 để diễn đạt 'chứng minh tính xác thực của một giả thuyết khoa học'?",
    correctIndex: 0,
    options: [
      {
        verbOrModifier: "substantiate a hypothesis",
        affinityScore: 98,
        isNativeIdeal: true,
        isLiteralTranslationTrap: false,
        collocationPhrase: "substantiate a hypothesis",
        examinerRating: "Band 8.5+ Native Academic Collocation",
        feedback: "Chuẩn xác tuyệt đối! 'Substantiate' là động từ học thuật cao cấp đi kèm hoàn hảo với 'hypothesis' mang nghĩa cung cấp bằng chứng thực nghiệm để củng cố giả thuyết."
      },
      {
        verbOrModifier: "make a hypothesis true",
        affinityScore: 30,
        isNativeIdeal: false,
        isLiteralTranslationTrap: true,
        collocationPhrase: "make a hypothesis true",
        examinerRating: "Band 5.5 Literal Translation",
        feedback: "Bẫy dịch từng chữ từ tiếng Việt sang (làm cho giả thuyết đúng). Văn phong non nớt không được chấp nhận ở trình độ học thuật."
      },
      {
        verbOrModifier: "do a proof for hypothesis",
        affinityScore: 20,
        isNativeIdeal: false,
        isLiteralTranslationTrap: true,
        collocationPhrase: "do a proof for hypothesis",
        examinerRating: "Band 5.0 Colloquial Weak Linker",
        feedback: "Dùng trợ động từ rỗng 'do' kết hợp sai giới từ."
      },
      {
        verbOrModifier: "give birth to hypothesis",
        affinityScore: 40,
        isNativeIdeal: false,
        isLiteralTranslationTrap: false,
        collocationPhrase: "give birth to hypothesis",
        examinerRating: "Band 6.0 Inappropriate Idiom",
        feedback: "Lạm dụng thành ngữ văn học biểu cảm quá đà trong văn phong bài luận học thuật."
      }
    ]
  },
  {
    id: "colloc_disparity",
    targetNounOrKeyword: "socioeconomic disparity (sự bất bình đẳng kinh tế - xã hội)",
    domain: "Sociology & Economics",
    cambridgeAcademicContext: "Động từ nào thể hiện đúng hành động 'làm giảm bớt / xoa dịu sự chênh lệch giàu nghèo'?",
    correctIndex: 1,
    options: [
      {
        verbOrModifier: "make disparities small",
        affinityScore: 35,
        isNativeIdeal: false,
        isLiteralTranslationTrap: true,
        collocationPhrase: "make disparities small",
        examinerRating: "Band 5.5 Informal Phrase",
        feedback: "Dùng từ vựng cấp thấp 'make small'."
      },
      {
        verbOrModifier: "ameliorate socioeconomic disparities",
        affinityScore: 97,
        isNativeIdeal: true,
        isLiteralTranslationTrap: false,
        collocationPhrase: "ameliorate socioeconomic disparities",
        examinerRating: "Band 8.5+ Sophisticated Collocation",
        feedback: "Xuất sắc! 'Ameliorate' (làm dịu bớt, cải thiện tình trạng tồi tệ) là Collocation C1/C2 đắt giá thường gặp trong các bài báo học thuật quốc tế."
      },
      {
        verbOrModifier: "delete socioeconomic disparities",
        affinityScore: 25,
        isNativeIdeal: false,
        isLiteralTranslationTrap: true,
        collocationPhrase: "delete socioeconomic disparities",
        examinerRating: "Band 5.0 Semantic Clashing",
        feedback: "'Delete' chỉ dùng cho tập tin máy tính hoặc chữ viết, không thể dùng cho hiện tượng xã hội trừu tượng."
      },
      {
        verbOrModifier: "kill disparities",
        affinityScore: 10,
        isNativeIdeal: false,
        isLiteralTranslationTrap: true,
        collocationPhrase: "kill disparities",
        examinerRating: "Band 4.5 Street Slang",
        feedback: "Ngôn ngữ đường phố hoàn toàn cấm kỵ trong IELTS Academic Writing."
      }
    ]
  },
  {
    id: "colloc_reform",
    targetNounOrKeyword: "institutional reforms (các cải cách thể chế)",
    domain: "Public Administration",
    cambridgeAcademicContext: "Cụm từ nào chuẩn xác để diễn đạt 'thực thi và đem lại hiệu quả cải cách thể chế'?",
    correctIndex: 2,
    options: [
      {
        verbOrModifier: "carry reforms into house",
        affinityScore: 20,
        isNativeIdeal: false,
        isLiteralTranslationTrap: true,
        collocationPhrase: "carry reforms into house",
        examinerRating: "Band 5.0 Broken Metaphor",
        feedback: "Dịch nhầm từ 'đưa cải cách vào cuộc sống' thành 'into house'."
      },
      {
        verbOrModifier: "open institutional reforms",
        affinityScore: 40,
        isNativeIdeal: false,
        isLiteralTranslationTrap: true,
        collocationPhrase: "open institutional reforms",
        examinerRating: "Band 6.0 Loose Collocation",
        feedback: "'Open' không kết hợp tự nhiên với 'reforms'."
      },
      {
        verbOrModifier: "effect comprehensive institutional reforms",
        affinityScore: 99,
        isNativeIdeal: true,
        isLiteralTranslationTrap: false,
        collocationPhrase: "effect comprehensive institutional reforms",
        examinerRating: "Band 9.0 Master Collocation (Verb 'effect')",
        feedback: "Đỉnh cao! Động từ 'effect' (ngoại động từ mang nghĩa 'bring about / realize' - đem lại kết quả) kết hợp với 'reforms' là dấu ấn của các bài viết Band 8.5 - 9.0."
      },
      {
        verbOrModifier: "make reforms happen",
        affinityScore: 50,
        isNativeIdeal: false,
        isLiteralTranslationTrap: false,
        collocationPhrase: "make reforms happen",
        examinerRating: "Band 6.5 Conversational Register",
        feedback: "Đúng ngữ pháp nhưng mang hơi hướng văn nói (Spoken English)."
      }
    ]
  }
];
