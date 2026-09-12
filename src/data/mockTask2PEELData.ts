export type Task2PromptType =
  | "opinion"
  | "discussion"
  | "problem_solution"
  | "advantage_outweigh";

export interface Task2PEELPrompt {
  id: string;
  type: Task2PromptType;
  typeLabelVi: string;
  topicTitleVi: string;
  promptText: string;
  topicAnalysis: {
    generalTopic: string;
    microTopic: string;
    instructionType: string;
    offTopicPitfallVi: string;
    targetKeywords: string[];
  };
  thesisGuidance: {
    ruleVi: string;
    modelBackgroundParaphrase: string;
    modelThesisStatement: string;
    badNeutralExample: string;
    badNeutralWarningVi: string;
  };
  samplePEEL: {
    point: string;
    explain: string;
    example: string;
    link: string;
    fullParagraph: string;
    wordCount: number;
    breakdownVi: {
      pointExplanation: string;
      explainMechanisms: string[];
      exampleNature: string;
      linkClosure: string;
    };
  };
  causalChain: {
    rootCause: string;
    directMechanism: string;
    ultimateImpact: string;
  };
}

export interface AcademicConnectorItem {
  category: "cause" | "consequence" | "example" | "link";
  categoryVi: string;
  connector: string;
  meaningVi: string;
  exampleInTask2: string;
}

export const MOCK_TASK2_PEEL_PROMPTS: Task2PEELPrompt[] = [
  {
    id: "prompt_tech_inequality",
    type: "opinion",
    typeLabelVi: "Agree / Disagree (Nêu quan điểm)",
    topicTitleVi: "Tiến Bộ Công Nghệ & Khoảng Cách Giàu Nghèo",
    promptText:
      "Some people argue that technological progress increases the gap between rich and poor nations, rather than narrowing it. To what extent do you agree or disagree?",
    topicAnalysis: {
      generalTopic: "Technological innovation and economic globalization",
      microTopic:
        "Whether advanced tech widens or bridges the financial/development disparity between rich and developing countries",
      instructionType: "To what extent do you agree or disagree (Clear stance required)",
      offTopicPitfallVi:
        "Chỉ viết chung chung về lợi ích của công nghệ (smartphone, internet) cho đời sống cá nhân mà không tập trung vào cán cân kinh tế giữa các quốc gia giàu vs nghèo.",
      targetKeywords: ["technological progress", "economic gap", "rich and poor nations", "narrowing disparity"],
    },
    thesisGuidance: {
      ruleVi:
        "Mở bài dạng Opinion bắt buộc phải khẳng định rõ mức độ đồng ý/không đồng ý ngay từ câu thứ 2 (Thesis), cấm tuyệt đối viết mở bài trung lập kiểu 'Bài viết này sẽ bàn luận cả 2 mặt'.",
      modelBackgroundParaphrase:
        "While technological advancements are ostensibly heralded as catalysts for global equity, a compelling argument posits that they disproportionately enrich prosperous states.",
      modelThesisStatement:
        "I firmly agree with this viewpoint, as high research capital requirements and digital infrastructure disparities systematically marginalize developing economies.",
      badNeutralExample:
        "Technology has many benefits and drawbacks. In this essay, I will discuss both sides before reaching a conclusion.",
      badNeutralWarningVi:
        "Đây là lỗi Fencing-sitting (ngồi trên hàng rào)! Giám khảo chấm Task Response Band 5.0 nếu không thấy rõ lập trường xuyên suốt trong Mở bài.",
    },
    samplePEEL: {
      point:
        "The primary reason why technological innovation exacerbates global economic inequality is the immense capital expenditure required to develop and deploy cutting-edge automation.",
      explain:
        "Because wealthy nations possess substantial research budgets and advanced intellectual property ecosystems, they are able to monopolize breakthrough technologies such as artificial intelligence and biotechnology. Consequently, this monopolization allows their domestic corporations to operate with unprecedented operational efficiency and higher profit margins, while developing countries—which lack the financial reserves to upgrade infrastructure—are relegated to low-value raw material suppliers.",
      example:
        "A salient manifestation of this disparity is observed in the semiconductor manufacturing supply chain, where a handful of developed economies dominate microchip patents, thereby capturing over eighty percent of aggregate industry profits.",
      link:
        "Hence, without equitable knowledge transfers, technological superiority serves to entrench rather than diminish international financial stratification.",
      fullParagraph:
        "The primary reason why technological innovation exacerbates global economic inequality is the immense capital expenditure required to develop and deploy cutting-edge automation. Because wealthy nations possess substantial research budgets and advanced intellectual property ecosystems, they are able to monopolize breakthrough technologies such as artificial intelligence and biotechnology. Consequently, this monopolization allows their domestic corporations to operate with unprecedented operational efficiency and higher profit margins, while developing countries—which lack the financial reserves to upgrade infrastructure—are relegated to low-value raw material suppliers. A salient manifestation of this disparity is observed in the semiconductor manufacturing supply chain, where a handful of developed economies dominate microchip patents, thereby capturing over eighty percent of aggregate industry profits. Hence, without equitable knowledge transfers, technological superiority serves to entrench rather than diminish international financial stratification.",
      wordCount: 135,
      breakdownVi: {
        pointExplanation: "Khẳng định trực diện: Rào cản vốn khổng lồ trong phát triển tự động hóa làm gia tăng khoảng cách.",
        explainMechanisms: [
          "Nước giàu có ngân sách R&D lớn ➔ Độc quyền AI/công nghệ sinh học.",
          "Doanh nghiệp nước giàu đạt năng suất siêu việt ➔ Nước nghèo bị đẩy xuống làm gia công giá trị thấp.",
        ],
        exampleNature: "Dẫn chứng chuỗi cung ứng bán dẫn toàn cầu (Semiconductors) do nhóm nước phát triển thâu tóm 80% lợi nhuận.",
        linkClosure: "Neo ngược lại Thesis: Ưu thế công nghệ đào sâu phân tầng tài chính nếu không có chuyển giao tri thức.",
      },
    },
    causalChain: {
      rootCause: "High R&D capital expenditure in developed nations",
      directMechanism: "Monopolization of proprietary patents & automation efficiency",
      ultimateImpact: "Developing nations relegated to low-margin manual manufacturing",
    },
  },
  {
    id: "prompt_uni_curriculum",
    type: "discussion",
    typeLabelVi: "Discuss Both Views & Opinion (Bàn luận 2 mặt)",
    topicTitleVi: "Mục Tiêu Đại Học: Kỹ Năng Nghề Hay Tri Thức Học Thuật",
    promptText:
      "Some people believe that university education should focus primarily on practical skills for future employment, while others argue that its main purpose is to provide broad academic theory. Discuss both views and give your own opinion.",
    topicAnalysis: {
      generalTopic: "Higher education philosophy and curriculum design",
      microTopic:
        "Vocational job-market readiness vs theoretical academic inquiry as the primary objective of tertiary institutions",
      instructionType: "Discuss both views and give your opinion",
      offTopicPitfallVi:
        "Chỉ viết về học phí đại học đắt đỏ hoặc lợi ích của việc đi làm sớm mà quên so sánh 2 trường phái: Practical employment skills vs Broad academic theory.",
      targetKeywords: ["university education", "practical skills", "employment", "academic theory", "tertiary curriculum"],
    },
    thesisGuidance: {
      ruleVi:
        "Mở bài Discussion phải tóm tắt ngắn gọn 2 trường phái trong câu 1 và nêu rõ quan điểm nghiêng về bên nào trong câu 2.",
      modelBackgroundParaphrase:
        "Opinions diverge regarding whether tertiary institutions should function primarily as vocational training hubs for the labor market or as bastions of pure academic scholarship.",
      modelThesisStatement:
        "While practical job readiness is indisputably essential for immediate economic integration, I contend that cultivating broad theoretical reasoning remains the fundamental pillar of transformative higher education.",
      badNeutralExample:
        "Both views have strong arguments. This essay will examine practical skills and theory before providing an opinion.",
      badNeutralWarningVi:
        "Không được hoãn việc đưa ra quan điểm cá nhân đến tận Kết bài! Hãy báo trước lập trường ngay tại Thesis Statement.",
    },
    samplePEEL: {
      point:
        "Advocates of theoretical education legitimately argue that abstract academic inquiry equips students with foundational cognitive agility that outlasts transient vocational trends.",
      explain:
        "In rapidly evolving economies where automated tools render specific software skills obsolete within years, individuals grounded in fundamental scientific and philosophical theories possess the analytical frameworks necessary to assimilate emerging paradigms. As a result, theoretical scholars demonstrate superior adaptability and long-term problem-solving capabilities compared to those narrowly trained for a singular workplace task.",
      example:
        "For instance, tertiary graduates with rigorous backgrounds in pure mathematics and logical philosophy seamlessly transitioned into pioneering machine learning architectures, despite never having received formal instruction in modern programming languages.",
      link:
        "Thus, prioritizing theoretical depth ensures enduring career resilience rather than short-lived technical utility.",
      fullParagraph:
        "Advocates of theoretical education legitimately argue that abstract academic inquiry equips students with foundational cognitive agility that outlasts transient vocational trends. In rapidly evolving economies where automated tools render specific software skills obsolete within years, individuals grounded in fundamental scientific and philosophical theories possess the analytical frameworks necessary to assimilate emerging paradigms. As a result, theoretical scholars demonstrate superior adaptability and long-term problem-solving capabilities compared to those narrowly trained for a singular workplace task. For instance, tertiary graduates with rigorous backgrounds in pure mathematics and logical philosophy seamlessly transitioned into pioneering machine learning architectures, despite never having received formal instruction in modern programming languages. Thus, prioritizing theoretical depth ensures enduring career resilience rather than short-lived technical utility.",
      wordCount: 128,
      breakdownVi: {
        pointExplanation: "Luận điểm: Tri thức lý thuyết rèn luyện tư duy linh hoạt bền vững hơn kỹ năng nghề tạm thời.",
        explainMechanisms: [
          "Kỹ năng phần mềm cụ thể nhanh lỗi thời ➔ Người nắm lý thuyết nền tảng dễ dàng tiếp thu công nghệ mới.",
          "Tạo ra khả năng giải quyết vấn đề vượt trội trong dài hạn.",
        ],
        exampleNature: "Sinh viên toán học lý thuyết và triết học logic chuyển dịch xuất sắc sang kiến trúc Machine Learning.",
        linkClosure: "Khẳng định: Lý thuyết đảm bảo sự thích ứng nghề nghiệp lâu dài.",
      },
    },
    causalChain: {
      rootCause: "Grounded understanding of fundamental theories",
      directMechanism: "Cognitive agility & analytical framework to absorb new tools",
      ultimateImpact: "Long-term career adaptability in an automated job market",
    },
  },
  {
    id: "prompt_city_traffic",
    type: "problem_solution",
    typeLabelVi: "Causes & Solutions (Nguyên nhân & Giải pháp)",
    topicTitleVi: "Ùn Tắc Giao Thông Đô Thị & Ô Nhiễm Không Khí",
    promptText:
      "In many major cities worldwide, the overwhelming reliance on private motor vehicles is causing critical traffic gridlock and environmental degradation. What are the principal causes of this issue, and what viable solutions can municipal authorities implement?",
    topicAnalysis: {
      generalTopic: "Urban planning and municipal transport management",
      microTopic:
        "Private car dominance generating congestion & air pollution; mechanisms to diagnose causes and engineer policy solutions",
      instructionType: "Causes and Solutions (Two-part layout)",
      offTopicPitfallVi:
        "Chỉ liệt kê các loại ô nhiễm (rác thải nhựa, nước) thay vì tập trung vào nguyên nhân sâu xa của việc phụ thuộc vào xe cá nhân.",
      targetKeywords: ["traffic gridlock", "private vehicles", "air pollution", "public transit infrastructure", "municipal policy"],
    },
    thesisGuidance: {
      ruleVi:
        "Mở bài dạng Causes/Solutions cần chỉ rõ nguyên nhân gốc rễ trong câu Thesis và giới thiệu ngắn gọn hướng can thiệp của chính quyền.",
      modelBackgroundParaphrase:
        "The pervasive proliferation of private automobiles has precipitated acute urban congestion alongside severe atmospheric pollution across contemporary metropolises.",
      modelThesisStatement:
        "This dilemma is primarily attributable to inadequate public transit infrastructure, and it can be effectively remedied through congestion pricing mechanisms alongside heavy subsidies for electric commuter rail networks.",
      badNeutralExample:
        "There are many causes of traffic problems and many solutions. I will explain them below.",
      badNeutralWarningVi:
        "Câu luận đề quá hời hợt, không chứa nội dung phân tích thực tế.",
    },
    samplePEEL: {
      point:
        "The foremost catalyst behind excessive private vehicle usage is the glaring insufficiency and unreliability of municipal public transport networks.",
      explain:
        "When suburban commuters encounter overcrowded buses, erratic railway schedules, and fragmented route connectivity, driving a personal vehicle becomes a logistical necessity rather than a lifestyle luxury. This widespread behavioral default exponentially elevates vehicle volume on arterial roads, thereby triggering chronic gridlock and compounding carbon emissions per capita.",
      example:
        "In metropolitan Jakarta, decades of underinvestment in comprehensive mass transit led to private motorcycle ownership exceeding twenty million units, directly contributing to hazardous air quality indices.",
      link:
        "Therefore, overcoming car dependency fundamentally requires establishing punctual, high-capacity commuter alternatives rather than merely appealing to civic conscience.",
      fullParagraph:
        "The foremost catalyst behind excessive private vehicle usage is the glaring insufficiency and unreliability of municipal public transport networks. When suburban commuters encounter overcrowded buses, erratic railway schedules, and fragmented route connectivity, driving a personal vehicle becomes a logistical necessity rather than a lifestyle luxury. This widespread behavioral default exponentially elevates vehicle volume on arterial roads, thereby triggering chronic gridlock and compounding carbon emissions per capita. In metropolitan Jakarta, decades of underinvestment in comprehensive mass transit led to private motorcycle ownership exceeding twenty million units, directly contributing to hazardous air quality indices. Therefore, overcoming car dependency fundamentally requires establishing punctual, high-capacity commuter alternatives rather than merely appealing to civic conscience.",
      wordCount: 122,
      breakdownVi: {
        pointExplanation: "Nguyên nhân cốt lõi: Hệ thống giao thông công cộng thiếu thốn và không đúng giờ.",
        explainMechanisms: [
          "Xe buýt quá tải, giờ tàu thất thường ➔ Người dân buộc phải dùng xe cá nhân để đi lại.",
          "Mật độ phương tiện bùng nổ ➔ Tắc nghẽn kinh niên và tăng lượng khí thải carbon.",
        ],
        exampleNature: "Minh chứng thủ đô Jakarta do thiếu đầu tư tàu điện dẫn đến bùng nổ 20 triệu xe máy.",
        linkClosure: "Kết luận: Muốn giảm phụ thuộc xe cá nhân phải xây dựng phương tiện công cộng đúng giờ, công suất lớn.",
      },
    },
    causalChain: {
      rootCause: "Underdeveloped & unreliable public transit infrastructure",
      directMechanism: "Commuters forced to rely on personal vehicles as logistical necessity",
      ultimateImpact: "Exponential traffic volume surge & severe atmospheric pollution",
    },
  },
  {
    id: "prompt_single_living",
    type: "advantage_outweigh",
    typeLabelVi: "Advantages vs Disadvantages (Cân đo lợi hại)",
    topicTitleVi: "Xu Hướng Sống Độc Thân Ở Đô Thị Hiện Đại",
    promptText:
      "In many developed nations, an increasing proportion of adults are choosing to live alone in single-person households. Do the advantages of this demographic shift outweigh its drawbacks?",
    topicAnalysis: {
      generalTopic: "Demographic and sociological lifestyle trends",
      microTopic:
        "Solitary living arrangements: personal autonomy vs social isolation & higher housing footprint",
      instructionType: "Do advantages outweigh disadvantages? (Direct weighing required)",
      offTopicPitfallVi:
        "Bàn lan man về việc giới trẻ không chịu kết hôn hay sinh con, quên phân tích trực diện ưu/nhược điểm của việc 'ở một mình trong một căn hộ' (Single-person household).",
      targetKeywords: ["live alone", "single-person households", "personal autonomy", "social isolation", "housing footprint"],
    },
    thesisGuidance: {
      ruleVi:
        "Dạng bài Outweigh bắt buộc phải tuyên bố rõ bên nào áp đảo hơn ngay tại Mở bài, không được viết nửa vời.",
      modelBackgroundParaphrase:
        "A growing demographic trend across modernized societies is the noticeable expansion of single-person domestic households.",
      modelThesisStatement:
        "Although solitary living grants individuals unprecedented personal autonomy and lifestyle flexibility, I firmly believe that its drawbacks—namely heightened social isolation and inefficient resource utilization—are far more profound.",
      badNeutralExample:
        "Living alone has some advantages and some disadvantages. Both sides will be discussed.",
      badNeutralWarningVi:
        "Cần dùng mệnh đề tương phản 'Although [Minor Side], I firmly believe [Major Side] is far more profound' để cân đo lập trường.",
    },
    samplePEEL: {
      point:
        "The primary drawback of the surge in solitary living is its exacerbation of psychological vulnerability and chronic social isolation.",
      explain:
        "Without the organic emotional support network inherently present in multi-generational or shared households, individuals living independently must bear workplace stresses and personal crises in complete seclusion. Over extended periods, this emotional insulation frequently precipitates clinical depressive disorders, particularly among elderly demographics who lack daily domestic interactions.",
      example:
        "Recent public health surveys conducted in Scandinavian nations revealed that solitary dwellers reported a thirty-five percent higher incidence of loneliness-induced anxiety compared to cohabiting counterparts.",
      link:
        "Consequently, the illusion of individual independence often exacts a severe toll on collective communal well-being.",
      fullParagraph:
        "The primary drawback of the surge in solitary living is its exacerbation of psychological vulnerability and chronic social isolation. Without the organic emotional support network inherently present in multi-generational or shared households, individuals living independently must bear workplace stresses and personal crises in complete seclusion. Over extended periods, this emotional insulation frequently precipitates clinical depressive disorders, particularly among elderly demographics who lack daily domestic interactions. Recent public health surveys conducted in Scandinavian nations revealed that solitary dwellers reported a thirty-five percent higher incidence of loneliness-induced anxiety compared to cohabiting counterparts. Consequently, the illusion of individual independence often exacts a severe toll on collective communal well-being.",
      wordCount: 114,
      breakdownVi: {
        pointExplanation: "Tác hại cốt lõi: Gia tăng tính tổn thương tâm lý và cô lập xã hội mãn tính.",
        explainMechanisms: [
          "Thiếu mạng lưới hỗ trợ tình cảm gia đình ➔ Tự chịu đựng áp lực trong sự cô độc.",
          "Cách ly cảm xúc kéo dài ➔ Dẫn đến trầm cảm, đặc biệt ở người cao tuổi.",
        ],
        exampleNature: "Dẫn chứng khảo sát y tế công cộng vùng Scandinavia: Người sống độc thân có tỷ lệ lo âu cao hơn 35%.",
        linkClosure: "Kết luận: Sự tự do ảo ảnh thường phải trả giá bằng sức khỏe tinh thần cộng đồng.",
      },
    },
    causalChain: {
      rootCause: "Absence of cohabiting emotional support networks",
      directMechanism: "Prolonged domestic isolation under workplace/lifestyle stress",
      ultimateImpact: "Elevated incidence of depressive disorders & communal fragmentation",
    },
  },
];

export const ACADEMIC_CONNECTORS: AcademicConnectorItem[] = [
  {
    category: "cause",
    categoryVi: "Diễn Giải Nguyên Nhân",
    connector: "This phenomenon is primarily attributable to...",
    meaningVi: "Hiện tượng này chủ yếu xuất phát từ...",
    exampleInTask2: "This phenomenon is primarily attributable to inadequate public transit infrastructure.",
  },
  {
    category: "cause",
    categoryVi: "Diễn Giải Nguyên Nhân",
    connector: "This stems from the fundamental reality that...",
    meaningVi: "Điều này bắt nguồn từ một thực tế căn bản là...",
    exampleInTask2: "This stems from the fundamental reality that research capital is heavily concentrated.",
  },
  {
    category: "consequence",
    categoryVi: "Chuỗi Hệ Quả Logic",
    connector: "Consequently, this invariably precipitates...",
    meaningVi: "Hệ quả là, điều này chắc chắn sẽ gây ra...",
    exampleInTask2: "Consequently, this invariably precipitates acute traffic gridlock in central business districts.",
  },
  {
    category: "consequence",
    categoryVi: "Chuỗi Hệ Quả Logic",
    connector: "Thereby leading to a substantial escalation in...",
    meaningVi: "Từ đó dẫn đến sự gia tăng đáng kể trong...",
    exampleInTask2: "Thereby leading to a substantial escalation in per capita carbon emissions.",
  },
  {
    category: "example",
    categoryVi: "Dẫn Chứng Học Thuật",
    connector: "A salient manifestation of this is observed in...",
    meaningVi: "Một biểu hiện rõ nét của điều này được ghi nhận trong...",
    exampleInTask2: "A salient manifestation of this is observed in the semiconductor manufacturing supply chain.",
  },
  {
    category: "example",
    categoryVi: "Dẫn Chứng Học Thuật",
    connector: "Empirical studies conducted by... reveal that...",
    meaningVi: "Các nghiên cứu thực nghiệm được thực hiện bởi... chỉ ra rằng...",
    exampleInTask2: "Empirical studies conducted by municipal planners reveal that dedicated bus lanes double transit speed.",
  },
  {
    category: "link",
    categoryVi: "Câu Neo Luận Đề",
    connector: "Hence, it stands to reason that...",
    meaningVi: "Do đó, hoàn toàn có cơ sở logic để khẳng định rằng...",
    exampleInTask2: "Hence, it stands to reason that sustainable mobility requires heavy transit subsidies.",
  },
  {
    category: "link",
    categoryVi: "Câu Neo Luận Đề",
    connector: "Thus, this unequivocally demonstrates that...",
    meaningVi: "Như vậy, điều này chứng minh một cách rõ ràng rằng...",
    exampleInTask2: "Thus, this unequivocally demonstrates that theoretical foundations ensure long-term career agility.",
  },
];
