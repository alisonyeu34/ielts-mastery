export type SyntaxModeType = "nominalization" | "inversion" | "cleft";

export interface SyntaxExerciseItem {
  id: string;
  syntaxType: SyntaxModeType;
  subTypeLabelVi: string;
  topicTitleVi: string;
  originalSentence: string; // Band 5.5 - 6.0 loose/spoken style
  instructionVi: string;
  triggerPhrase?: string; // For inversion / cleft
  targetWordFamily?: {
    verb: string;
    noun: string;
    adjective: string;
    meaningVi: string;
  };
  dragTokens: string[];
  modelSolutions: string[];
  patternRegex?: string;
  academicDensityScore: number; // 75 to 98
  pedagogicalTipVi: string;
  comparisonBreakdown: {
    band6AnalysisVi: string;
    band8AnalysisVi: string;
    keyMechanismVi: string;
  };
}

export interface WordFamilyItem {
  verb: string;
  noun: string;
  adjective: string;
  meaningVi: string;
  exampleSentence: string;
}

export const MOCK_ADVANCED_SYNTAX_DATA: SyntaxExerciseItem[] = [
  // =========================================================================
  // 1. NOMINALIZATION (6 Exercises)
  // =========================================================================
  {
    id: "nom_1_urban_expansion",
    syntaxType: "nominalization",
    subTypeLabelVi: "Danh từ hóa hành động (Action Nominalization)",
    topicTitleVi: "Mở Rộng Đô Thị & Giá Nhà Ở",
    originalSentence:
      "Because the government rapidly expanded cities, housing prices escalated dramatically and people could not afford them.",
    instructionVi:
      "Biến đổi mệnh đề 'rapidly expanded' và 'escalated dramatically' thành các cụm danh từ học thuật làm chủ ngữ và tân ngữ.",
    targetWordFamily: {
      verb: "expand / escalate",
      noun: "expansion / escalation",
      adjective: "expansive / escalating",
      meaningVi: "Mở rộng / Leo thang",
    },
    dragTokens: [
      "The rapid expansion of urban areas",
      "precipitated",
      "a dramatic escalation in housing prices,",
      "thereby compromising housing affordability.",
    ],
    modelSolutions: [
      "The rapid expansion of urban areas precipitated a dramatic escalation in housing prices, thereby compromising housing affordability.",
      "The rapid expansion of urban areas caused a dramatic escalation in housing prices, which compromised housing affordability.",
    ],
    academicDensityScore: 92,
    pedagogicalTipVi:
      "Thay vì dùng liên từ 'Because' nối nhiều mệnh đề rời rạc, hãy dùng cụm danh từ 'The rapid expansion...' làm chủ ngữ kết hợp động từ chỉ tác động mạnh 'precipitated'.",
    comparisonBreakdown: {
      band6AnalysisVi: "Dùng liên từ thô 'Because... and...', động từ chia thì quá khứ đơn kể lể (expanded, escalated).",
      band8AnalysisVi: "Nén 3 mệnh đề thành 1 câu duy nhất với 2 cụm danh từ học thuật: 'The rapid expansion of urban areas' và 'a dramatic escalation in housing prices'.",
      keyMechanismVi: "Verb ➔ Noun + Adverb ➔ Adjective: 'rapidly expanded' ➔ 'rapid expansion'.",
    },
  },
  {
    id: "nom_2_industrial_pollution",
    syntaxType: "nominalization",
    subTypeLabelVi: "Danh từ hóa nguyên nhân - hệ quả (Causal Compression)",
    topicTitleVi: "Ô Nhiễm Công Nghiệp & Suy Thoái Đa Dạng Sinh Học",
    originalSentence:
      "Factories continuously discharge untreated toxic chemicals, and this severely destroys natural river ecosystems.",
    instructionVi:
      "Chuyển hành động 'continuously discharge' thành cụm danh từ chủ ngữ và 'severely destroys' thành cụm danh từ tân ngữ.",
    targetWordFamily: {
      verb: "discharge / destroy",
      noun: "discharge / destruction",
      adjective: "discharging / destructive",
      meaningVi: "Xả thải / Hủy hoại",
    },
    dragTokens: [
      "The continuous discharge of untreated industrial effluents",
      "results in",
      "the catastrophic destruction of riverine ecosystems.",
    ],
    modelSolutions: [
      "The continuous discharge of untreated industrial effluents results in the catastrophic destruction of riverine ecosystems.",
      "The continuous discharge of untreated industrial waste leads to the severe destruction of natural river ecosystems.",
    ],
    academicDensityScore: 94,
    pedagogicalTipVi:
      "Cụm từ 'The continuous discharge of untreated effluents' mang mật độ học thuật C1/C2 vượt trội so với 'Factories discharge...'.",
    comparisonBreakdown: {
      band6AnalysisVi: "Ghép câu bằng liên từ 'and this', dùng từ vựng phổ thông (factories, destroys).",
      band8AnalysisVi: "Danh từ hóa triệt để: 'continuous discharge' + 'catastrophic destruction', sử dụng thuật ngữ 'riverine ecosystems'.",
      keyMechanismVi: "Biến chủ ngữ chỉ người/vật (Factories) thành chủ ngữ trừu tượng (The continuous discharge).",
    },
  },
  {
    id: "nom_3_digital_automation",
    syntaxType: "nominalization",
    subTypeLabelVi: "Danh từ hóa trạng thái (Process Nominalization)",
    topicTitleVi: "Tự Động Hóa AI & Mất Việc Làm Truyền Thống",
    originalSentence:
      "If companies increasingly automate workplace processes, many low-skilled workers will inevitably lose their jobs.",
    instructionVi:
      "Biến đổi điều kiện 'increasingly automate' thành cụm danh từ 'The accelerating automation...' kết hợp động từ 'trigger'.",
    targetWordFamily: {
      verb: "automate / displace",
      noun: "automation / displacement",
      adjective: "automated / displaced",
      meaningVi: "Tự động hóa / Thay thế dịch chuyển",
    },
    dragTokens: [
      "The accelerating automation of workplace processes",
      "invariably precipitates",
      "the widespread displacement of manual laborers.",
    ],
    modelSolutions: [
      "The accelerating automation of workplace processes invariably precipitates the widespread displacement of manual laborers.",
      "The increasing automation of workplace operations inevitably triggers the mass displacement of low-skilled workers.",
    ],
    academicDensityScore: 95,
    pedagogicalTipVi:
      "Biến 'workers lose their jobs' thành cụm danh từ học thuật 'the widespread displacement of manual laborers'.",
    comparisonBreakdown: {
      band6AnalysisVi: "Dùng câu điều kiện If loại 1 cơ bản, văn phong văn nói 'lose their jobs'.",
      band8AnalysisVi: "Nén thành câu học thuật với danh từ 'displacement' (sự mất việc do chuyển dịch cơ cấu).",
      keyMechanismVi: "Lose jobs ➔ Occupational displacement.",
    },
  },
  {
    id: "nom_4_tourism_commercialization",
    syntaxType: "nominalization",
    subTypeLabelVi: "Danh từ hóa đặc tính (Quality Nominalization)",
    topicTitleVi: "Thương Mại Hóa Du Lịch & Bản Sắc Văn Hóa",
    originalSentence:
      "When local traditions become overly commercialized, indigenous communities gradually lose their cultural authenticity.",
    instructionVi:
      "Danh từ hóa 'become overly commercialized' thành 'The excessive commercialization of...' và 'lose cultural authenticity' thành 'an erosion of...'.",
    targetWordFamily: {
      verb: "commercialize / erode",
      noun: "commercialization / erosion",
      adjective: "commercial / erosive",
      meaningVi: "Thương mại hóa / Xói mòn",
    },
    dragTokens: [
      "The excessive commercialization of indigenous heritage",
      "invariably induces",
      "a gradual erosion of cultural authenticity.",
    ],
    modelSolutions: [
      "The excessive commercialization of indigenous heritage invariably induces a gradual erosion of cultural authenticity.",
      "The excessive commercialization of local traditions leads to a gradual erosion of cultural authenticity.",
    ],
    academicDensityScore: 93,
    pedagogicalTipVi:
      "Sử dụng 'erosion of cultural authenticity' thay cho mệnh đề dài 'lose their cultural authenticity'.",
    comparisonBreakdown: {
      band6AnalysisVi: "Dùng mệnh đề thời gian 'When...', động từ 'lose' thiếu tính học thuật.",
      band8AnalysisVi: "Cấu trúc A induces B: 'excessive commercialization' ➔ 'gradual erosion of authenticity'.",
      keyMechanismVi: "Lose authenticity ➔ Erosion of cultural authenticity.",
    },
  },
  {
    id: "nom_5_healthcare_investment",
    syntaxType: "nominalization",
    subTypeLabelVi: "Danh từ hóa hành động chính sách (Policy Action)",
    topicTitleVi: "Đầu Tư Y Tế Dự Phòng & Tuổi Thọ Dân Số",
    originalSentence:
      "Because municipal governments adequately invested in preventive medicine, overall life expectancy significantly increased.",
    instructionVi:
      "Biến 'adequately invested' thành 'Adequate municipal investment in...' và 'life expectancy increased' thành 'a substantial enhancement in...'.",
    targetWordFamily: {
      verb: "invest / enhance",
      noun: "investment / enhancement",
      adjective: "invested / enhanced",
      meaningVi: "Đầu tư / Nâng cao",
    },
    dragTokens: [
      "Adequate capital investment in preventive healthcare",
      "fosters",
      "a substantial enhancement in national life expectancy.",
    ],
    modelSolutions: [
      "Adequate capital investment in preventive healthcare fosters a substantial enhancement in national life expectancy.",
      "Adequate investment in preventive medicine leads to a substantial enhancement in overall life expectancy.",
    ],
    academicDensityScore: 91,
    pedagogicalTipVi:
      "Nâng cấp 'life expectancy increased' thành 'a substantial enhancement in national life expectancy'.",
    comparisonBreakdown: {
      band6AnalysisVi: "Dùng liên từ 'Because', động từ thường 'invested', 'increased'.",
      band8AnalysisVi: "Cụm danh từ 'Adequate capital investment' làm chủ ngữ kết hợp động từ C1 'fosters'.",
      keyMechanismVi: "Invest adequately ➔ Adequate capital investment.",
    },
  },
  {
    id: "nom_6_renewable_transition",
    syntaxType: "nominalization",
    subTypeLabelVi: "Danh từ hóa quá trình chuyển dịch (Transition Process)",
    topicTitleVi: "Năng Lượng Tái Tạo & Khí Thải Nhà Kính",
    originalSentence:
      "If we rapidly transition to solar and wind power, our society will successfully mitigate carbon emissions.",
    instructionVi:
      "Biến 'rapidly transition to...' thành 'A swift transition to renewable energy sources...' và 'mitigate carbon emissions' thành 'the successful mitigation of...'.",
    targetWordFamily: {
      verb: "transition / mitigate",
      noun: "transition / mitigation",
      adjective: "transitional / mitigated",
      meaningVi: "Chuyển dịch / Giảm thiểu",
    },
    dragTokens: [
      "A swift transition towards renewable energy infrastructure",
      "is indispensable for",
      "the effective mitigation of greenhouse gas emissions.",
    ],
    modelSolutions: [
      "A swift transition towards renewable energy infrastructure is indispensable for the effective mitigation of greenhouse gas emissions.",
      "A swift transition to solar and wind energy ensures the effective mitigation of carbon emissions.",
    ],
    academicDensityScore: 96,
    pedagogicalTipVi:
      "Cụm 'the effective mitigation of greenhouse gas emissions' là cấu trúc vàng đạt điểm tối đa Lexical Resource.",
    comparisonBreakdown: {
      band6AnalysisVi: "Câu điều kiện 'If we...', xưng hô ngôi 'our society' phi học thuật.",
      band8AnalysisVi: "Hoàn toàn khách quan, không có ngôi nhân xưng, sử dụng thuật ngữ 'mitigation of greenhouse gas emissions'.",
      keyMechanismVi: "We transition ➔ A swift transition towards.",
    },
  },

  // =========================================================================
  // 2. ACADEMIC INVERSION (6 Exercises)
  // =========================================================================
  {
    id: "inv_1_not_only",
    syntaxType: "inversion",
    subTypeLabelVi: "Đảo ngữ trạng từ phủ định kép (Not only... but also)",
    topicTitleVi: "Nghệ Thuật Trong Giáo Dục & Tư Duy Sáng Tạo",
    originalSentence:
      "Art education not only cultivates creative thinking, but it also improves students' emotional well-being.",
    instructionVi:
      "Bắt đầu câu bằng cụm từ 'Not only' và đảo trợ động từ 'does' lên trước chủ ngữ 'art education'.",
    triggerPhrase: "Not only",
    dragTokens: [
      "Not only",
      "does art education cultivate",
      "creative problem-solving,",
      "but it also fosters",
      "profound emotional resilience in students.",
    ],
    modelSolutions: [
      "Not only does art education cultivate creative problem-solving, but it also fosters profound emotional resilience in students.",
      "Not only does art education cultivate creative thinking, but it also improves students' emotional well-being.",
    ],
    patternRegex: "^Not only does [a-zA-Z\\s]+ (cultivate|enhance|foster)",
    academicDensityScore: 94,
    pedagogicalTipVi:
      "Quy tắc vàng: 'Not only + Trợ động từ (does/do/did) + Chủ ngữ + Động từ nguyên thể'. Quên trợ động từ sẽ bị trừ điểm GRA nặng.",
    comparisonBreakdown: {
      band6AnalysisVi: "Viết xuôi 'Art education not only cultivates...' - đúng ngữ pháp nhưng đơn điệu.",
      band8AnalysisVi: "Đảo ngữ 'Not only does art education cultivate...' tạo điểm nhấn tu từ mạnh mẽ chuẩn C1/C2.",
      keyMechanismVi: "Not only + Aux + Subject + Verb bare.",
    },
  },
  {
    id: "inv_2_under_no_circumstances",
    syntaxType: "inversion",
    subTypeLabelVi: "Đảo ngữ cấm đoán tuyệt đối (Under no circumstances)",
    topicTitleVi: "Bảo Tồn Di Sản & Lợi Nhuận Thương Mại",
    originalSentence:
      "Governments should never compromise historical conservation for short-term commercial profits under any circumstances.",
    instructionVi:
      "Bắt đầu câu bằng 'Under no circumstances' và đảo khiếm khuyết động từ 'should' lên trước 'governments'.",
    triggerPhrase: "Under no circumstances",
    dragTokens: [
      "Under no circumstances",
      "should sovereign governments compromise",
      "the preservation of historical heritage",
      "for transient commercial gains.",
    ],
    modelSolutions: [
      "Under no circumstances should sovereign governments compromise the preservation of historical heritage for transient commercial gains.",
      "Under no circumstances should governments compromise historical conservation for short-term commercial profits.",
    ],
    patternRegex: "^Under no circumstances should [a-zA-Z\\s]+ compromise",
    academicDensityScore: 96,
    pedagogicalTipVi:
      "Cấu trúc: 'Under no circumstances should [Subject] [Verb]...' dùng trong câu kết luận hoặc đúc kết luận điểm quan trọng.",
    comparisonBreakdown: {
      band6AnalysisVi: "Dùng từ phủ định 'should never... under any circumstances' ở cuối câu dài dòng.",
      band8AnalysisVi: "Đưa cụm 'Under no circumstances' lên đầu câu và đảo 'should' tạo giọng điệu đanh thép, học thuật.",
      keyMechanismVi: "Under no circumstances + should + Subject + Verb bare.",
    },
  },
  {
    id: "inv_3_seldom",
    syntaxType: "inversion",
    subTypeLabelVi: "Đảo ngữ trạng từ tần suất hiếm khi (Seldom / Rarely)",
    topicTitleVi: "Tự Quản Lý Ô Nhiễm Của Doanh Nghiệp",
    originalSentence:
      "Corporations seldom prioritize long-term environmental sustainability over quarterly profit margins without strict regulations.",
    instructionVi:
      "Bắt đầu câu bằng 'Seldom' và đảo trợ động từ 'do' lên trước 'corporations'.",
    triggerPhrase: "Seldom",
    dragTokens: [
      "Seldom",
      "do commercial conglomerates prioritize",
      "ecological sustainability",
      "over immediate financial profit margins",
      "in the absence of stringent state regulation.",
    ],
    modelSolutions: [
      "Seldom do commercial conglomerates prioritize ecological sustainability over immediate financial profit margins in the absence of stringent state regulation.",
      "Seldom do corporations prioritize long-term environmental sustainability over quarterly profit margins without strict regulations.",
    ],
    patternRegex: "^Seldom do [a-zA-Z\\s]+ prioritize",
    academicDensityScore: 95,
    pedagogicalTipVi:
      "Cấu trúc: 'Seldom do [Plural Nouns] [Verb]...' giúp bài viết mang đậm văn phong học thuật Cambridge.",
    comparisonBreakdown: {
      band6AnalysisVi: "Viết xuôi 'Corporations seldom prioritize...' thông thường.",
      band8AnalysisVi: "Đảo 'Seldom do conglomerates prioritize...' thể hiện sự thành thạo cấu trúc ngữ pháp nâng cao.",
      keyMechanismVi: "Seldom + do + Subject + Verb bare.",
    },
  },
  {
    id: "inv_4_had_it_not_been",
    syntaxType: "inversion",
    subTypeLabelVi: "Đảo ngữ điều kiện loại 3 (Had it not been for)",
    topicTitleVi: "Đột Phá Y Tế & Kiểm Soát Dịch Bệnh",
    originalSentence:
      "If international laboratories had not rapidly cooperated, humanity could not have contained the pandemic.",
    instructionVi:
      "Bỏ 'If' và dùng cấu trúc đảo ngữ điều kiện loại 3: 'Had it not been for [Noun Phrase], [Subject] could not have [V3]'.",
    triggerPhrase: "Had it not been for",
    dragTokens: [
      "Had it not been for",
      "the unprecedented global collaboration among biomedical researchers,",
      "the containment of the epidemic",
      "would have been utterly unachievable.",
    ],
    modelSolutions: [
      "Had it not been for the unprecedented global collaboration among biomedical researchers, the containment of the epidemic would have been utterly unachievable.",
      "Had it not been for rapid international laboratory cooperation, the pandemic could not have been contained.",
    ],
    patternRegex: "^Had it not been for [a-zA-Z\\s,]+ (the containment|humanity)",
    academicDensityScore: 98,
    pedagogicalTipVi:
      "Cấu trúc đảo ngữ điều kiện 'Had it not been for...' thay thế hoàn hảo cho câu If loại 3 sáo mòn.",
    comparisonBreakdown: {
      band6AnalysisVi: "Câu If loại 3 quen thuộc: 'If international laboratories had not...'.",
      band8AnalysisVi: "Đảo ngữ đỉnh cao: 'Had it not been for the unprecedented collaboration..., containment would have been unachievable'.",
      keyMechanismVi: "Had it not been for + Noun Phrase, S + would/could have V3.",
    },
  },
  {
    id: "inv_5_were_governments_to",
    syntaxType: "inversion",
    subTypeLabelVi: "Đảo ngữ điều kiện loại 2 (Were + Subject + to Verb)",
    topicTitleVi: "Trợ Cấp Giáo Dục Đại Học Miễn Phí",
    originalSentence:
      "If policymakers subsidized free tertiary tuition, social mobility would improve substantially.",
    instructionVi:
      "Bỏ 'If' và bắt đầu câu bằng 'Were policymakers to subsidize...'.",
    triggerPhrase: "Were policymakers to",
    dragTokens: [
      "Were sovereign policymakers to implement",
      "universal tertiary tuition waivers,",
      "socioeconomic mobility across marginalized demographics",
      "would experience a profound resurgence.",
    ],
    modelSolutions: [
      "Were sovereign policymakers to implement universal tertiary tuition waivers, socioeconomic mobility across marginalized demographics would experience a profound resurgence.",
      "Were policymakers to subsidize free tertiary tuition, social mobility would improve substantially.",
    ],
    patternRegex: "^Were [a-zA-Z\\s]+ to (implement|subsidize|provide)",
    academicDensityScore: 96,
    pedagogicalTipVi:
      "Công thức: 'Were + Subject + to Verb bare, Subject + would + Verb bare'.",
    comparisonBreakdown: {
      band6AnalysisVi: "Câu điều kiện If loại 2 cơ bản: 'If policymakers subsidized...'.",
      band8AnalysisVi: "Đảo ngữ giả định trang trọng 'Were policymakers to implement...', thể hiện năng lực cú pháp Band 8.5+.",
      keyMechanismVi: "Were + S + to-V, S + would-V.",
    },
  },
  {
    id: "inv_6_should_there_arise",
    syntaxType: "inversion",
    subTypeLabelVi: "Đảo ngữ điều kiện loại 1 (Should + Subject + Verb)",
    topicTitleVi: "Khủng Hoảng Năng Lượng & Kế Hoạch Dự Phòng",
    originalSentence:
      "If severe energy deficits occur in urban centers, authorities must activate emergency renewable grids.",
    instructionVi:
      "Bỏ 'If' và dùng cấu trúc đảo ngữ: 'Should severe energy deficits arise in urban centers, ...'.",
    triggerPhrase: "Should severe energy deficits",
    dragTokens: [
      "Should severe energy deficits arise",
      "within metropolitan sectors,",
      "municipal authorities must immediately mobilize",
      "decentralized renewable backup infrastructures.",
    ],
    modelSolutions: [
      "Should severe energy deficits arise within metropolitan sectors, municipal authorities must immediately mobilize decentralized renewable backup infrastructures.",
      "Should severe energy deficits occur in urban centers, authorities must activate emergency renewable grids.",
    ],
    patternRegex: "^Should [a-zA-Z\\s]+ (arise|occur|manifest)",
    academicDensityScore: 94,
    pedagogicalTipVi:
      "Công thức: 'Should + Subject + Verb bare, S + must/will + Verb bare'.",
    comparisonBreakdown: {
      band6AnalysisVi: "If loại 1 đơn giản: 'If severe energy deficits occur...'.",
      band8AnalysisVi: "Đảo ngữ 'Should severe energy deficits arise...', dùng động từ học thuật 'arise' và 'mobilize'.",
      keyMechanismVi: "Should + S + Verb bare, Main Clause.",
    },
  },

  // =========================================================================
  // 3. CLEFT SENTENCES (6 Exercises)
  // =========================================================================
  {
    id: "cleft_1_it_focal",
    syntaxType: "cleft",
    subTypeLabelVi: "Câu chẻ It-Cleft nhấn mạnh tác nhân chính",
    topicTitleVi: "Nguyên Nhân Thất Nghiệp Của Giới Trẻ",
    originalSentence:
      "The acute lack of vocational training programs exacerbates youth unemployment across developing nations.",
    instructionVi:
      "Dùng cấu trúc It-cleft 'It is precisely [Focal Element] that [Relative Clause]' để nhấn mạnh nguyên nhân cốt lõi.",
    triggerPhrase: "It is precisely",
    dragTokens: [
      "It is precisely",
      "the acute deficiency in pragmatic vocational apprenticeships",
      "that exacerbates",
      "widespread unemployment among recent graduates.",
    ],
    modelSolutions: [
      "It is precisely the acute deficiency in pragmatic vocational apprenticeships that exacerbates widespread unemployment among recent graduates.",
      "It is precisely the lack of vocational training programs that exacerbates youth unemployment across developing nations.",
    ],
    patternRegex: "^It is precisely [a-zA-Z\\s]+ that (exacerbates|drives|triggers)",
    academicDensityScore: 95,
    pedagogicalTipVi:
      "Công thức It-cleft: 'It is/was [Yếu tố cần nhấn mạnh] that [Mệnh đề còn lại]'. Thêm phó từ 'precisely' để tăng sức nặng.",
    comparisonBreakdown: {
      band6AnalysisVi: "Câu trần thuật thông thường, không có trọng âm nhấn mạnh.",
      band8AnalysisVi: "Cấu trúc It-cleft hướng toàn bộ sự chú ý của giám khảo vào tác nhân gốc rễ 'the acute deficiency...'.",
      keyMechanismVi: "It is precisely [X] that [Y].",
    },
  },
  {
    id: "cleft_2_it_policy",
    syntaxType: "cleft",
    subTypeLabelVi: "Câu chẻ It-Cleft nhấn mạnh giải pháp can thiệp",
    topicTitleVi: "Can Thiệp Luật Pháp Trong Bảo Vệ Động Vật Hoang Dã",
    originalSentence:
      "Strict legal sanctions against poaching deter international wildlife smuggling syndicates effectively.",
    instructionVi:
      "Biến đổi sang It-cleft: 'It is through [Focal Element] that [Relative Clause]'.",
    triggerPhrase: "It is through",
    dragTokens: [
      "It is through",
      "the rigorous enforcement of punitive judicial penalties",
      "that sovereign states can genuinely dismantle",
      "transnational wildlife trafficking syndicates.",
    ],
    modelSolutions: [
      "It is through the rigorous enforcement of punitive judicial penalties that sovereign states can genuinely dismantle transnational wildlife trafficking syndicates.",
      "It is through strict legal sanctions against poaching that authorities can deter wildlife smuggling effectively.",
    ],
    patternRegex: "^It is through [a-zA-Z\\s]+ that [a-zA-Z\\s]+ can",
    academicDensityScore: 97,
    pedagogicalTipVi:
      "Dùng 'It is through [Method] that...' khi muốn nhấn mạnh con đường / phương pháp duy nhất để giải quyết vấn đề.",
    comparisonBreakdown: {
      band6AnalysisVi: "Câu đơn giản 'Strict legal sanctions deter...'.",
      band8AnalysisVi: "It-cleft 'It is through the rigorous enforcement... that states can dismantle...', nâng tầm tính thuyết phục.",
      keyMechanismVi: "It is through [Method] that [Outcome achieved].",
    },
  },
  {
    id: "cleft_3_it_corporate",
    syntaxType: "cleft",
    subTypeLabelVi: "Câu chẻ It-Cleft nhấn mạnh trách nhiệm chủ thể",
    topicTitleVi: "Trách Nhiệm Rác Thải Nhựa Đại Dương",
    originalSentence:
      "Multinational beverage corporations generate the vast majority of non-biodegradable plastic packaging waste.",
    instructionVi:
      "Dùng It-cleft: 'It is [Corporations] that must bear primary accountability for...'.",
    triggerPhrase: "It is multinational",
    dragTokens: [
      "It is multinational consumer conglomerates",
      "rather than individual consumers",
      "that generate the overwhelming majority of",
      "non-biodegradable oceanic plastic waste.",
    ],
    modelSolutions: [
      "It is multinational consumer conglomerates rather than individual consumers that generate the overwhelming majority of non-biodegradable oceanic plastic waste.",
      "It is multinational beverage corporations that generate the vast majority of non-biodegradable plastic packaging waste.",
    ],
    patternRegex: "^It is multinational [a-zA-Z\\s]+ that [a-zA-Z\\s]+",
    academicDensityScore: 94,
    pedagogicalTipVi:
      "Kết hợp 'It is X rather than Y that...' để tạo sự tương phản gay gắt giữa 2 chủ thể trong bài viết Task 2.",
    comparisonBreakdown: {
      band6AnalysisVi: "Câu khẳng định một chiều 'Corporations generate waste'.",
      band8AnalysisVi: "It-cleft đối lập 'It is X rather than Y that generates...', giải quyết trọn vẹn chủ đề trách nhiệm cá nhân vs doanh nghiệp.",
      keyMechanismVi: "It is [X rather than Y] that [Verb].",
    },
  },
  {
    id: "cleft_4_wh_solution",
    syntaxType: "cleft",
    subTypeLabelVi: "Câu chẻ Wh- / Pseudo-Cleft nhấn mạnh điều cốt yếu",
    topicTitleVi: "Quy Hoạch Đô Thị Bền Vững",
    originalSentence:
      "City planners urgently need a decentralized public transit grid to eliminate chronic road congestion.",
    instructionVi:
      "Dùng cấu trúc Pseudo-cleft: 'What urban planners urgently require is [Focal Element]'.",
    triggerPhrase: "What urban planners urgently require",
    dragTokens: [
      "What urban planners urgently require",
      "is not merely expanding roadway capacity,",
      "but establishing a comprehensive, high-frequency mass transit network.",
    ],
    modelSolutions: [
      "What urban planners urgently require is not merely expanding roadway capacity, but establishing a comprehensive, high-frequency mass transit network.",
      "What city planners urgently need is a decentralized public transit grid to eliminate chronic road congestion.",
    ],
    patternRegex: "^What [a-zA-Z\\s]+ (require|need|demand) is",
    academicDensityScore: 96,
    pedagogicalTipVi:
      "Cấu trúc Wh-cleft: 'What [Subject] [Verb] is [Noun / Gerund Phrase]' giúp tạo nhịp điệu mở màn đoạn thân bài cực kỳ ấn tượng.",
    comparisonBreakdown: {
      band6AnalysisVi: "Viết xuôi 'City planners urgently need...'.",
      band8AnalysisVi: "Wh-cleft 'What urban planners urgently require is not X but Y' tạo cấu trúc tương phản kép C1/C2.",
      keyMechanismVi: "What [Clause] is [Focal Solution].",
    },
  },
  {
    id: "cleft_5_wh_imperative",
    syntaxType: "cleft",
    subTypeLabelVi: "Câu chẻ Wh-Cleft nhấn mạnh nhận thức",
    topicTitleVi: "Khoảng Cách Số Trong Kỷ Nguyên Trí Tuệ Nhân Tạo",
    originalSentence:
      "Policymakers must recognize that unequal digital access perpetuates generational poverty cycles.",
    instructionVi:
      "Dùng Wh-cleft: 'What remains imperative for policymakers to recognize is [Focal Clause]'.",
    triggerPhrase: "What remains imperative",
    dragTokens: [
      "What remains imperative for policymakers to recognize",
      "is that disparities in digital accessibility",
      "systematically perpetuate",
      "intergenerational socioeconomic stagnation.",
    ],
    modelSolutions: [
      "What remains imperative for policymakers to recognize is that disparities in digital accessibility systematically perpetuate intergenerational socioeconomic stagnation.",
      "What remains imperative for policymakers to recognize is that unequal digital access perpetuates generational poverty cycles.",
    ],
    patternRegex: "^What remains imperative [a-zA-Z\\s]+ is that",
    academicDensityScore: 97,
    pedagogicalTipVi:
      "Khung câu 'What remains imperative for [Entity] to recognize is that...' là vũ khí đắt giá cho câu Topic Sentence.",
    comparisonBreakdown: {
      band6AnalysisVi: "Mẫu câu đơn giản 'Policymakers must recognize that...'.",
      band8AnalysisVi: "Pseudo-cleft 'What remains imperative for policymakers to recognize is that...' nâng cao độ trang trọng học thuật.",
      keyMechanismVi: "What remains imperative for [S] to [V] is that [Clause].",
    },
  },
  {
    id: "cleft_6_all_that_is_needed",
    syntaxType: "cleft",
    subTypeLabelVi: "Câu chẻ All-Cleft nhấn mạnh điều kiện đủ",
    topicTitleVi: "Quyết Tâm Chính Trị Trong Ứng Phó Khí Hậu",
    originalSentence:
      "Sovereign states only need genuine political willpower to enforce binding carbon reductions globally.",
    instructionVi:
      "Dùng All-cleft: 'All that is genuinely required to [Goal] is [Focal Element]'.",
    triggerPhrase: "All that is genuinely required",
    dragTokens: [
      "All that is genuinely required",
      "to enforce binding international emissions caps",
      "is the unyielding political resolution",
      "of industrialized superpowers.",
    ],
    modelSolutions: [
      "All that is genuinely required to enforce binding international emissions caps is the unyielding political resolution of industrialized superpowers.",
      "All that is needed to enforce binding carbon reductions globally is genuine political willpower from governments.",
    ],
    patternRegex: "^All that is [a-zA-Z\\s]+ is [a-zA-Z\\s]+",
    academicDensityScore: 95,
    pedagogicalTipVi:
      "All-cleft: 'All that is [adverb] required to [V] is [Noun Phrase]' dùng để nhấn mạnh tính đơn giản nhưng quyết định của một giải pháp.",
    comparisonBreakdown: {
      band6AnalysisVi: "Dùng từ hạn định 'only need' văn nói: 'States only need political willpower'.",
      band8AnalysisVi: "All-cleft học thuật: 'All that is genuinely required... is the unyielding political resolution...'.",
      keyMechanismVi: "All that is required to [V] is [Focal Noun].",
    },
  },
];

export const ACADEMIC_WORD_FAMILIES: WordFamilyItem[] = [
  {
    verb: "escalate",
    noun: "escalation",
    adjective: "escalating",
    meaningVi: "Leo thang / Gia tăng đột biến",
    exampleSentence: "A rapid escalation in property values compromised housing affordability.",
  },
  {
    verb: "deteriorate",
    noun: "deterioration",
    adjective: "deteriorating",
    meaningVi: "Suy thoái / Xuống cấp",
    exampleSentence: "Environmental deterioration precipitates severe ecological imbalances.",
  },
  {
    verb: "precipitate",
    noun: "precipitation",
    adjective: "precipitous",
    meaningVi: "Gây ra / Thúc đẩy nhanh",
    exampleSentence: "Fiscal insolvency precipitated sudden operational restructuring.",
  },
  {
    verb: "displace",
    noun: "displacement",
    adjective: "displaced",
    meaningVi: "Dịch chuyển / Thay thế việc làm",
    exampleSentence: "Automation triggers occupational displacement across manufacturing sectors.",
  },
  {
    verb: "substantiate",
    noun: "substantiation",
    adjective: "substantive",
    meaningVi: "Chứng minh / Cung cấp căn cứ",
    exampleSentence: "Empirical research provides substantive substantiation for this policy.",
  },
];
