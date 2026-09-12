export type SocialPerspectiveKey =
  | "individual"
  | "corporate"
  | "government"
  | "scientific"
  | "civil_society"
  | "global";

export interface SocietalLensDetail {
  key: SocialPerspectiveKey;
  labelVi: string;
  titleVi?: string;
  labelEn: string;
  iconName: string;
  color: string;
  coreAngleVi: string;
  argumentPoint?: string;
  keyArguments: string[];
  samplePhrases: string[];
  c1Lexicon?: string[];
}

export type SocialPerspectiveDetail = SocietalLensDetail;

export interface HedgingTransformationItem {
  id: string;
  unhedgedPrompt: string; // Band 5.5 absolute statement
  crudeStatement?: string;
  flawVi: string;
  modelHedgedBand85: string;
  hedgedSample?: string;
  insertedHedgingElements: string[];
  explanationVi: string;
  explanation?: string;
}

export type HedgingDrillItem = HedgingTransformationItem;

export interface SpeakingP3Topic {
  id: string;
  title: string;
  topicTitle: string;
  topicCategory: string;
  category: string;
  question: string;
  questionText: string;
  macroSignificanceVi: string;
  lenses: Record<SocialPerspectiveKey, SocietalLensDetail>;
  hedgingDrill: HedgingTransformationItem;
  modelResponseBand85: {
    directHedgedStance: string;
    lensAExploration: string;
    lensBCounterbalance: string;
    fallingConclusion: string;
    fullCombined: string;
  };
  modelAnswer: {
    keyHedgingPhrases: string[];
    fullResponse: string;
  };
  sampleAnswer?: string;
  recommendedCadenceMarks: Array<{
    phrase: string;
    pitchDirection: "falling" | "rising";
    rationaleVi: string;
  }>;
}

// Backwards compatibility alias
export type Part3QuestionTopic = SpeakingP3Topic;

export const SOCIETAL_LENSES_METADATA: Record<
  SocialPerspectiveKey,
  {
    labelVi: string;
    labelEn: string;
    color: string;
    bgLight: string;
    borderColor: string;
    descriptionVi: string;
  }
> = {
  individual: {
    labelVi: "Cá Nhân & Hộ Gia Đình",
    labelEn: "Individual & Household Level",
    color: "#8b5cf6", // Purple
    bgLight: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-500/30",
    descriptionVi:
      "Quyền tự do cá nhân, thói quen sinh hoạt, hành vi tiêu dùng và sức khỏe tâm lý.",
  },
  corporate: {
    labelVi: "Doanh Nghiệp & Kinh Tế",
    labelEn: "Commercial & Corporate Sector",
    color: "#06b6d4", // Cyan
    bgLight: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    borderColor: "border-cyan-500/30",
    descriptionVi:
      "Tối ưu hóa lợi nhuận, chi phí tự động hóa, trách nhiệm xã hội doanh nghiệp (CSR).",
  },
  government: {
    labelVi: "Chính Phủ & Cơ Quan Pháp Quyền",
    labelEn: "State & Policymakers",
    color: "#f59e0b", // Amber
    bgLight: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/30",
    descriptionVi:
      "Khung pháp lý, chính sách thuế, trợ cấp an sinh và phân bổ ngân sách công.",
  },
  scientific: {
    labelVi: "Giới Khoa Học & Viện Hàn Lâm",
    labelEn: "Scientific & Academic Community",
    color: "#10b981", // Emerald
    bgLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/30",
    descriptionVi:
      "Bằng chứng thực nghiệm, nghiên cứu độc lập, đổi mới công nghệ và đạo đức khoa học.",
  },
  civil_society: {
    labelVi: "Tổ Chức Xã Hội & Cộng Đồng (NGOs)",
    labelEn: "Civil Society & Non-Profits",
    color: "#ec4899", // Pink
    bgLight: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    borderColor: "border-pink-500/30",
    descriptionVi:
      "Bảo vệ nhóm yếu thế, bình đẳng cơ hội, tiếng nói cộng đồng và nhân quyền.",
  },
  global: {
    labelVi: "Tổ Chức Toàn Cầu & Đa Phương",
    labelEn: "Supranational & Global Bodies",
    color: "#3b82f6", // Blue
    bgLight: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/30",
    descriptionVi:
      "Hiệp định đa phương, chuỗi cung ứng quốc tế, điều ước khí hậu và hòa bình thế giới.",
  },
};

export const MOCK_SPEAKING_P3_TOPICS: SpeakingP3Topic[] = [
  {
    id: "p3_automation_labor",
    title: "Chủ Đề 1: Tự Động Hóa & Trách Nhiệm Doanh Nghiệp Với Lao Động",
    topicTitle: "Chủ Đề 1: Tự Động Hóa & Trách Nhiệm Doanh Nghiệp",
    topicCategory: "Technology & Labor Economics",
    category: "Technology & Labor Economics",
    question:
      "To what extent should companies be held accountable for workforce redundancy caused by automation?",
    questionText:
      "To what extent should companies be held accountable for workforce redundancy caused by automation?",
    macroSignificanceVi:
      "Vấn đề xung đột giữa động lực tối ưu hóa lợi nhuận của kinh tế tư nhân và chi phí tái đào tạo xã hội khi làn sóng AI / Robot thay thế lao động.",
    lenses: {
      individual: {
        key: "individual",
        labelVi: "Góc nhìn Người Lao Động",
        labelEn: "Worker & Household",
        iconName: "User",
        color: "#8b5cf6",
        coreAngleVi:
          "Người lao động phổ thông đối mặt nguy cơ mất kế sinh nhai và bất an tài chính dài hạn.",
        keyArguments: [
          "Gia tăng bất bình đẳng thu nhập giữa lao động tay nghề cao và lao động giản đơn",
          "Áp lực tâm lý nặng nề khi kỹ năng truyền thống bị đào thải nhanh chóng",
        ],
        samplePhrases: [
          "From the perspective of vulnerable wage earners...",
          "Displaced workers arguably suffer from severe socio-economic shocks...",
        ],
      },
      corporate: {
        key: "corporate",
        labelVi: "Góc nhìn Doanh Nghiệp",
        labelEn: "Commercial Entities",
        iconName: "Building2",
        color: "#06b6d4",
        coreAngleVi:
          "Doanh nghiệp cần cắt giảm chi phí để duy trì năng lực cạnh tranh trong thị trường toàn cầu.",
        keyArguments: [
          "Tự động hóa giúp tăng năng suất và giảm biên độ sai sót sản xuất",
          "Buộc doanh nghiệp gánh toàn bộ chi phí bồi thường có thể kìm hãm đổi mới sáng tạo",
        ],
        samplePhrases: [
          "Corporate leaders tend to emphasize fiscal competitiveness...",
          "Excessive legal liabilities might conceivably discourage capital investment in R&D...",
        ],
      },
      government: {
        key: "government",
        labelVi: "Góc nhìn Chính Phủ",
        labelEn: "State & Regulators",
        iconName: "Scale",
        color: "#f59e0b",
        coreAngleVi:
          "Nhà nước cần thiết lập thuế tự động hóa (Robot Tax) và quỹ trợ cấp tái đào tạo kỹ năng.",
        keyArguments: [
          "Chính sách an sinh xã hội phải chuyển dịch sang mô hình học tập suốt đời (Lifelong Upskilling)",
          "Quy định khung pháp lý bắt buộc doanh nghiệp chia sẻ chi phí chuyển đổi nghề nghiệp",
        ],
        samplePhrases: [
          "Policymakers are inclined to enforce transition levies on automated corporations...",
          "State intervention is arguably indispensable to cushion macro structural unemployment...",
        ],
      },
      scientific: {
        key: "scientific",
        labelVi: "Giới Nghiên Cứu & Đổi Mới",
        labelEn: "Academia & Tech Innovators",
        iconName: "Microscope",
        color: "#10b981",
        coreAngleVi:
          "Khoa học chứng minh tự động hóa tạo ra việc làm mới giá trị gia tăng cao hơn trong dài hạn.",
        keyArguments: [
          "Sự chuyển dịch lịch sử từ nông nghiệp sang công nghiệp và dịch vụ số",
          "Nhu cầu cấp thiết về đào tạo kỹ năng tư duy phản biện và làm việc cùng AI",
        ],
        samplePhrases: [
          "Empirical economic research tends to indicate net job creation in knowledge-intensive domains...",
          "Scholars plausibly argue that workforce evolution is an inevitable historical trajectory...",
        ],
      },
      civil_society: {
        key: "civil_society",
        labelVi: "Công Đoàn & Tổ Chức Xã Hội",
        labelEn: "Labor Unions & NGOs",
        iconName: "Users",
        color: "#ec4899",
        coreAngleVi:
          "Công đoàn bảo vệ quyền được đào tạo lại và chuyển đổi công bằng (Just Transition).",
        keyArguments: [
          "Thúc đẩy đối thoại ba bên giữa Nhà nước - Doanh nghiệp - Người lao động",
          "Phản đối sa thải hàng loạt thiếu lộ trình thông báo và hỗ trợ thỏa đáng",
        ],
        samplePhrases: [
          "Labor advocacy groups consistently champion the principle of a just transition...",
          "Civil society predominantly urges equitable distribution of technological dividends...",
        ],
      },
      global: {
        key: "global",
        labelVi: "Tổ Chức Quốc Tế (ILO/OECD)",
        labelEn: "Supranational Bodies",
        iconName: "Globe2",
        color: "#3b82f6",
        coreAngleVi:
          "Các tiêu chuẩn lao động quốc tế nhằm ngăn chặn cuộc đua xuống đáy về chi phí nhân công.",
        keyArguments: [
          "Khung hướng dẫn đạo đức triển khai AI trong quản trị nguồn nhân lực",
          "Hợp tác quốc tế để giải quyết khủng hoảng di cư lao động xuyên biên giới",
        ],
        samplePhrases: [
          "Multilateral institutions such as the ILO advocate for harmonized ethical guidelines...",
          "Global compacts arguably prevent cross-border labor exploitation under the guise of efficiency...",
        ],
      },
    },
    hedgingDrill: {
      id: "drill_p3_1",
      unhedgedPrompt:
        "Companies always fire all old workers when they buy robots because bosses only care about profit.",
      crudeStatement:
        "Companies always fire all old workers when they buy robots because bosses only care about profit.",
      flawVi:
        "Câu mang tính phán xét tuyệt đối hóa ('always', 'all old workers', 'only care about profit') - lỗi Band 5.0.",
      modelHedgedBand85:
        "While private enterprises are predominantly driven by profitability, they arguably cannot bear sole liability, as sustainable workforce transitions tend to require co-funding between the state and corporate sectors.",
      hedgedSample:
        "While private enterprises are predominantly driven by profitability, they arguably cannot bear sole liability, as sustainable workforce transitions tend to require co-funding between the state and corporate sectors.",
      insertedHedgingElements: [
        "predominantly driven",
        "arguably cannot bear",
        "tend to require",
      ],
      explanationVi:
        "Thay thế 'only care about profit' bằng 'predominantly driven by profitability', chèn trạng từ xác suất 'arguably' và động từ dè dặt 'tend to require'.",
      explanation:
        "Thay thế 'only care about profit' bằng 'predominantly driven by profitability', chèn trạng từ xác suất 'arguably' và động từ dè dặt 'tend to require'.",
    },
    modelResponseBand85: {
      directHedgedStance:
        "To be perfectly honest, while corporations arguably have a moral obligation toward their long-tenured personnel, holding them exclusively liable appears somewhat impractical.",
      lensAExploration:
        "From a corporate perspective, businesses tend to adopt automation primarily to preserve global market competitiveness and eliminate operational hazards.",
      lensBCounterbalance:
        "However, looking through the lens of state policymakers, the public sector is inclined to institute targeted upskilling levies so that enterprises co-finance comprehensive retraining initiatives.",
      fallingConclusion:
        "Therefore, a balanced tripartite collaboration between employers, regulators, and labor unions seems to offer the most equitable resolution ↘.",
      fullCombined:
        "To be perfectly honest, while corporations arguably have a moral obligation toward their long-tenured personnel, holding them exclusively liable appears somewhat impractical. From a corporate perspective, businesses tend to adopt automation primarily to preserve global market competitiveness and eliminate operational hazards. However, looking through the lens of state policymakers, the public sector is inclined to institute targeted upskilling levies so that enterprises co-finance comprehensive retraining initiatives. Therefore, a balanced tripartite collaboration between employers, regulators, and labor unions seems to offer the most equitable resolution.",
    },
    modelAnswer: {
      keyHedgingPhrases: [
        "arguably",
        "appears somewhat impractical",
        "tend to adopt",
        "is inclined to institute",
        "seems to offer",
      ],
      fullResponse:
        "To be perfectly honest, while corporations arguably have a moral obligation toward their long-tenured personnel, holding them exclusively liable appears somewhat impractical. From a corporate perspective, businesses tend to adopt automation primarily to preserve global market competitiveness and eliminate operational hazards. However, looking through the lens of state policymakers, the public sector is inclined to institute targeted upskilling levies so that enterprises co-finance comprehensive retraining initiatives. Therefore, a balanced tripartite collaboration between employers, regulators, and labor unions seems to offer the most equitable resolution.",
    },
    sampleAnswer:
      "To be perfectly honest, while corporations arguably have a moral obligation toward their long-tenured personnel, holding them exclusively liable appears somewhat impractical. From a corporate perspective, businesses tend to adopt automation primarily to preserve global market competitiveness and eliminate operational hazards. However, looking through the lens of state policymakers, the public sector is inclined to institute targeted upskilling levies so that enterprises co-finance comprehensive retraining initiatives. Therefore, a balanced tripartite collaboration between employers, regulators, and labor unions seems to offer the most equitable resolution.",
    recommendedCadenceMarks: [
      {
        phrase: "appears somewhat impractical",
        pitchDirection: "falling",
        rationaleVi:
          "Hạ giọng ở cuối câu mở đầu để khẳng định lập trường vững vàng, tránh ngữ điệu vểnh lên.",
      },
      {
        phrase: "comprehensive retraining initiatives",
        pitchDirection: "falling",
        rationaleVi: "Hạ giọng dứt khoát ở cuối luận điểm chính phủ.",
      },
      {
        phrase: "the most equitable resolution",
        pitchDirection: "falling",
        rationaleVi:
          "Hạ cao độ F0 xuống dưới 110Hz để tạo điểm kết trang trọng, thuyết phục giám khảo.",
      },
    ],
  },
  {
    id: "p3_environment_policy",
    title: "Chủ Đề 2: Nỗ Lực Cá Nhân vs Can Thiệp Pháp Lý Về Môi Trường",
    topicTitle: "Chủ Đề 2: Nỗ Lực Cá Nhân vs Can Thiệp Pháp Lý Môi Trường",
    topicCategory: "Environmental Governance",
    category: "Environmental Governance",
    question:
      "Is individual conservation effort futile without stringent government intervention?",
    questionText:
      "Is individual conservation effort futile without stringent government intervention?",
    macroSignificanceVi:
      "Tranh luận về giới hạn của ý thức sinh thái cá nhân khi đối mặt với lượng phát thải công nghiệp khổng lồ đòi hỏi luật định chế tài.",
    lenses: {
      individual: {
        key: "individual",
        labelVi: "Ý Thức Cá Nhân",
        labelEn: "Consumer & Citizen",
        iconName: "User",
        color: "#8b5cf6",
        coreAngleVi:
          "Cá nhân thay đổi thói quen tiêu dùng tạo áp lực thị trường cho sản phẩm xanh.",
        keyArguments: [
          "Giảm thiểu rác thải nhựa đơn lẻ",
          "Lựa chọn phương tiện giao thông công cộng",
        ],
        samplePhrases: [
          "Individual behavioral shifts arguably cultivate grass-roots awareness...",
        ],
      },
      corporate: {
        key: "corporate",
        labelVi: "Khối Doanh Nghiệp Sản Xuất",
        labelEn: "Industrial Producers",
        iconName: "Building2",
        color: "#06b6d4",
        coreAngleVi:
          "Doanh nghiệp tạo ra 70% lượng khí thải carbon toàn cầu và chỉ đổi mới khi có luật siết chặt.",
        keyArguments: [
          "Chuyển đổi chuỗi cung ứng xanh",
          "Chi phí xử lý chất thải độc hại",
        ],
        samplePhrases: [
          "Heavy industries tend to resist voluntary decarbonization unless compelled by legislation...",
        ],
      },
      government: {
        key: "government",
        labelVi: "Chính Phủ & Thuế Carbon",
        labelEn: "Regulatory Authorities",
        iconName: "Scale",
        color: "#f59e0b",
        coreAngleVi:
          "Chế tài phạt nặng và trợ cấp năng lượng tái tạo là đòn bẩy quyết định.",
        keyArguments: [
          "Đánh thuế carbon nghiêm ngặt",
          "Quy hoạch hạ tầng năng lượng sạch",
        ],
        samplePhrases: [
          "State-level environmental mandates are predominantly decisive in curbing emissions...",
        ],
      },
      scientific: {
        key: "scientific",
        labelVi: "Giới Khoa Học Khí Hậu",
        labelEn: "Climate Scientists",
        iconName: "Microscope",
        color: "#10b981",
        coreAngleVi:
          "Báo cáo IPCC chỉ ra mục tiêu 1.5°C bất khả thi nếu thiếu chính sách công nghiệp vĩ mô.",
        keyArguments: [
          "Dữ liệu đo lường nồng độ CO2",
          "Mô hình dự báo biến đổi khí hậu",
        ],
        samplePhrases: [
          "Climatologists overwhelmingly assert that localized recycling alone is statistically insufficient...",
        ],
      },
      civil_society: {
        key: "civil_society",
        labelVi: "Phong Trào Xã Hội Dân Sự",
        labelEn: "Environmental Activists",
        iconName: "Users",
        color: "#ec4899",
        coreAngleVi:
          "Cộng đồng gây sức ép buộc các nhà lập pháp ban hành chính sách bảo vệ tài nguyên.",
        keyArguments: [
          "Chiến dịch vận động chính sách",
          "Giám sát độc lập các dự án khai khoáng",
        ],
        samplePhrases: [
          "Grassroots environmental coalitions serve to hold both politicians and conglomerates accountable...",
        ],
      },
      global: {
        key: "global",
        labelVi: "Hiệp Định Toàn Cầu (COP/UNFCCC)",
        labelEn: "Global Climate Frameworks",
        iconName: "Globe2",
        color: "#3b82f6",
        coreAngleVi:
          "Khí hậu không có biên giới quốc gia; cần sự đồng thuận cam kết giảm phát thải Net Zero.",
        keyArguments: [
          "Hiệp định Paris về biến đổi khí hậu",
          "Chuyển giao tài chính xanh cho các nước đang phát triển",
        ],
        samplePhrases: [
          "International climate treaties are indispensable to prevent carbon leakages across borders...",
        ],
      },
    },
    hedgingDrill: {
      id: "drill_p3_2",
      unhedgedPrompt:
        "Sorting household trash is completely useless because only big factories cause global warming.",
      crudeStatement:
        "Sorting household trash is completely useless because only big factories cause global warming.",
      flawVi:
        "Câu võ đoán phiến diện ('completely useless', 'only big factories') bỏ qua vai trò cộng hưởng văn hóa.",
      modelHedgedBand85:
        "While domestic recycling alone appears statistically insufficient to halt climate change, it arguably serves as a vital cultural catalyst alongside robust industrial regulations.",
      hedgedSample:
        "While domestic recycling alone appears statistically insufficient to halt climate change, it arguably serves as a vital cultural catalyst alongside robust industrial regulations.",
      insertedHedgingElements: [
        "appears statistically insufficient",
        "arguably serves as",
        "vital cultural catalyst",
      ],
      explanationVi:
        "Sử dụng 'appears statistically insufficient' thay cho 'completely useless' và dùng mệnh đề đối lập 'While...' để tạo lập luận C1/C2.",
      explanation:
        "Sử dụng 'appears statistically insufficient' thay cho 'completely useless' và dùng mệnh đề đối lập 'While...' để tạo lập luận C1/C2.",
    },
    modelResponseBand85: {
      directHedgedStance:
        "I am inclined to believe that while individual mindfulness is by no means futile, it remains inherently inadequate without binding statutory regulations.",
      lensAExploration:
        "On a micro level, citizen-led eco-friendly habits tend to foster an essential cultural shift toward sustainable consumption.",
      lensBCounterbalance:
        "Conversely, when viewed through an industrial lens, the overwhelming majority of greenhouse emissions emanate from energy and manufacturing conglomerates, which scarcely pivot without carbon taxation.",
      fallingConclusion:
        "Consequently, individual virtue and legislative enforcement must operate in tandem to achieve tangible ecological resilience ↘.",
      fullCombined:
        "I am inclined to believe that while individual mindfulness is by no means futile, it remains inherently inadequate without binding statutory regulations. On a micro level, citizen-led eco-friendly habits tend to foster an essential cultural shift toward sustainable consumption. Conversely, when viewed through an industrial lens, the overwhelming majority of greenhouse emissions emanate from energy and manufacturing conglomerates, which scarcely pivot without carbon taxation. Consequently, individual virtue and legislative enforcement must operate in tandem to achieve tangible ecological resilience.",
    },
    modelAnswer: {
      keyHedgingPhrases: [
        "am inclined to believe",
        "by no means futile",
        "inherently inadequate",
        "overwhelming majority",
        "scarcely pivot",
      ],
      fullResponse:
        "I am inclined to believe that while individual mindfulness is by no means futile, it remains inherently inadequate without binding statutory regulations. On a micro level, citizen-led eco-friendly habits tend to foster an essential cultural shift toward sustainable consumption. Conversely, when viewed through an industrial lens, the overwhelming majority of greenhouse emissions emanate from energy and manufacturing conglomerates, which scarcely pivot without carbon taxation. Consequently, individual virtue and legislative enforcement must operate in tandem to achieve tangible ecological resilience.",
    },
    sampleAnswer:
      "I am inclined to believe that while individual mindfulness is by no means futile, it remains inherently inadequate without binding statutory regulations. On a micro level, citizen-led eco-friendly habits tend to foster an essential cultural shift toward sustainable consumption. Conversely, when viewed through an industrial lens, the overwhelming majority of greenhouse emissions emanate from energy and manufacturing conglomerates, which scarcely pivot without carbon taxation. Consequently, individual virtue and legislative enforcement must operate in tandem to achieve tangible ecological resilience.",
    recommendedCadenceMarks: [
      {
        phrase: "binding statutory regulations",
        pitchDirection: "falling",
        rationaleVi: "Hạ giọng dứt khoát kết thúc câu mở đầu.",
      },
      {
        phrase: "tangible ecological resilience",
        pitchDirection: "falling",
        rationaleVi:
          "Ngữ điệu hạ sâu thể hiện sự chín chắn trong kết luận học thuật.",
      },
    ],
  },
  {
    id: "p3_education_vocational",
    title: "Chủ Đề 3: Đại Học Nghề vs Giáo Dục Khai Phóng",
    topicTitle: "Chủ Đề 3: Đại Học Nghề vs Giáo Dục Khai Phóng",
    topicCategory: "Higher Education & Social Philosophy",
    category: "Higher Education & Social Philosophy",
    question:
      "Should higher education prioritize vocational training over liberal arts?",
    questionText:
      "Should higher education prioritize vocational training over liberal arts?",
    macroSignificanceVi:
      "Cân bằng giữa nhu cầu đáp ứng thị trường việc làm ngắn hạn và sứ mệnh bồi dưỡng tư duy phản biện, nhân văn dài hạn của giáo dục đại học.",
    lenses: {
      individual: {
        key: "individual",
        labelVi: "Sinh Viên & Người Học",
        labelEn: "Students & Graduates",
        iconName: "User",
        color: "#8b5cf6",
        coreAngleVi:
          "Gánh nặng nợ học phí khiến sinh viên ưu tiên các bằng cấp có khả năng xin việc ngay.",
        keyArguments: [
          "Tỷ lệ có việc làm sau tốt nghiệp",
          "Thu hồi vốn đầu tư học phí (ROI)",
        ],
        samplePhrases: [
          "Undergraduates are increasingly inclined to pursue vocational credentials for immediate employability...",
        ],
      },
      corporate: {
        key: "corporate",
        labelVi: "Nhà Tuyển Dụng",
        labelEn: "Industry Employers",
        iconName: "Building2",
        color: "#06b6d4",
        coreAngleVi:
          "Doanh nghiệp cần nhân lực có kỹ năng thực hành nhưng cũng đòi hỏi khả năng thích ứng linh hoạt.",
        keyArguments: [
          "Thu hẹp khoảng cách kỹ năng thực tế",
          "Kỹ năng mềm và tư duy giải quyết vấn đề phức tạp",
        ],
        samplePhrases: [
          "Corporate recruiters often seek graduates with direct technical competence alongside adaptable soft skills...",
        ],
      },
      government: {
        key: "government",
        labelVi: "Bộ Giáo Dục & Quy Hoạch Nhân Lực",
        labelEn: "Educational Policymakers",
        iconName: "Scale",
        color: "#f59e0b",
        coreAngleVi:
          "Chính phủ cần phân bổ ngân sách hài hòa giữa các ngành kỹ thuật mũi nhọn và ngành khoa học xã hội.",
        keyArguments: [
          "Quy hoạch nhân lực quốc gia",
          "Bảo tồn di sản văn hóa và tư tưởng học thuật",
        ],
        samplePhrases: [
          "State educational planners are tasked with balancing industrial manpower with democratic civic literacy...",
        ],
      },
      scientific: {
        key: "scientific",
        labelVi: "Viện Hàn Lâm & Nhà Triết Học",
        labelEn: "Academic Scholars",
        iconName: "Microscope",
        color: "#10b981",
        coreAngleVi:
          "Giáo dục khai phóng (Liberal Arts) xây dựng nền tảng đạo đức và tư duy phản biện chống lại tin giả.",
        keyArguments: [
          "Nghiên cứu khoa học cơ bản",
          "Đạo đức công nghệ và phát triển xã hội bền vững",
        ],
        samplePhrases: [
          "Philosophers plausibly contend that liberal education nurtures the intellectual cornerstone of democracy...",
        ],
      },
      civil_society: {
        key: "civil_society",
        labelVi: "Cộng Đồng Xã Hội Dân Sự",
        labelEn: "Civic Organizations",
        iconName: "Users",
        color: "#ec4899",
        coreAngleVi:
          "Ngăn chặn việc biến trường đại học thành các nhà máy đào tạo thợ đơn thuần.",
        keyArguments: [
          "Bình đẳng cơ hội tiếp cận tri thức nhân loại",
          "Phát triển công dân toàn diện",
        ],
        samplePhrases: [
          "Civil advocacy groups argue against reducing tertiary education to mere corporate training grounds...",
        ],
      },
      global: {
        key: "global",
        labelVi: "Bối Cảnh Toàn Cầu Hóa & AI",
        labelEn: "Global Knowledge Economy",
        iconName: "Globe2",
        color: "#3b82f6",
        coreAngleVi:
          "Trong kỷ nguyên AI, các kỹ năng kỹ thuật hẹp có thể bị tự động hóa nhanh hơn kỹ năng nhân văn.",
        keyArguments: [
          "Khả năng học lại (Learnability) trong thế giới biến động (VUCA)",
          "Giao thoa liên ngành toàn cầu",
        ],
        samplePhrases: [
          "In a rapidly automating global economy, multidisciplinary versatility tends to outlast narrow vocational expertise...",
        ],
      },
    },
    hedgingDrill: {
      id: "drill_p3_3",
      unhedgedPrompt:
        "Liberal arts degrees are totally useless because they never help anyone get a high-paying job.",
      crudeStatement:
        "Liberal arts degrees are totally useless because they never help anyone get a high-paying job.",
      flawVi:
        "Phán xét cực đoan ('totally useless', 'never help anyone') bị bác bỏ trong môi trường học thuật.",
      modelHedgedBand85:
        "While humanities disciplines may not always confer immediate technical utility, they arguably cultivate critical thinking and ethical reasoning that prove indispensable over a lifetime career.",
      hedgedSample:
        "While humanities disciplines may not always confer immediate technical utility, they arguably cultivate critical thinking and ethical reasoning that prove indispensable over a lifetime career.",
      insertedHedgingElements: [
        "may not always confer",
        "arguably cultivate",
        "prove indispensable",
      ],
      explanationVi:
        "Chuyển đổi sang 'may not always confer' và 'arguably cultivate' để tạo chiều sâu lập luận đa chiều.",
      explanation:
        "Chuyển đổi sang 'may not always confer' và 'arguably cultivate' để tạo chiều sâu lập luận đa chiều.",
    },
    modelResponseBand85: {
      directHedgedStance:
        "In my estimation, prioritizing technical vocationalism at the total expense of liberal humanities would be fundamentally short-sighted.",
      lensAExploration:
        "From an economic and employment standpoint, vocational specialization undeniably provides immediate labor market absorption for youth.",
      lensBCounterbalance:
        "However, looking at the long-term societal horizon, liberal arts disciplines tend to equip citizens with ethical discernment and critical agility, attributes that AI cannot readily replicate.",
      fallingConclusion:
        "Ultimately, tertiary institutions should arguably pursue an integrated hybrid curriculum rather than a polarizing dichotomy ↘.",
      fullCombined:
        "In my estimation, prioritizing technical vocationalism at the total expense of liberal humanities would be fundamentally short-sighted. From an economic and employment standpoint, vocational specialization undeniably provides immediate labor market absorption for youth. However, looking at the long-term societal horizon, liberal arts disciplines tend to equip citizens with ethical discernment and critical agility, attributes that AI cannot readily replicate. Ultimately, tertiary institutions should arguably pursue an integrated hybrid curriculum rather than a polarizing dichotomy.",
    },
    modelAnswer: {
      keyHedgingPhrases: [
        "in my estimation",
        "fundamentally short-sighted",
        "tend to equip",
        "cannot readily replicate",
        "should arguably pursue",
      ],
      fullResponse:
        "In my estimation, prioritizing technical vocationalism at the total expense of liberal humanities would be fundamentally short-sighted. From an economic and employment standpoint, vocational specialization undeniably provides immediate labor market absorption for youth. However, looking at the long-term societal horizon, liberal arts disciplines tend to equip citizens with ethical discernment and critical agility, attributes that AI cannot readily replicate. Ultimately, tertiary institutions should arguably pursue an integrated hybrid curriculum rather than a polarizing dichotomy.",
    },
    sampleAnswer:
      "In my estimation, prioritizing technical vocationalism at the total expense of liberal humanities would be fundamentally short-sighted. From an economic and employment standpoint, vocational specialization undeniably provides immediate labor market absorption for youth. However, looking at the long-term societal horizon, liberal arts disciplines tend to equip citizens with ethical discernment and critical agility, attributes that AI cannot readily replicate. Ultimately, tertiary institutions should arguably pursue an integrated hybrid curriculum rather than a polarizing dichotomy.",
    recommendedCadenceMarks: [
      {
        phrase: "fundamentally short-sighted",
        pitchDirection: "falling",
        rationaleVi: "Hạ giọng rõ ràng thể hiện quan điểm dứt khoát.",
      },
      {
        phrase: "polarizing dichotomy",
        pitchDirection: "falling",
        rationaleVi: "Hạ cao độ ở cụm từ vựng C2 cuối câu.",
      },
    ],
  },
  {
    id: "p3_public_health_mandates",
    title: "Chủ Đề 4: Tự Do Cá Nhân vs Quy Định Y Tế Công Cộng",
    topicTitle: "Chủ Đề 4: Tự Do Cá Nhân vs Quy Định Y Tế Công Cộng",
    topicCategory: "Public Health & Bioethics",
    category: "Public Health & Bioethics",
    question:
      "How should societies balance personal autonomy with collective healthcare mandates?",
    questionText:
      "How should societies balance personal autonomy with collective healthcare mandates?",
    macroSignificanceVi:
      "Bài toán đạo đức sinh học giữa quyền tự quyết về cơ thể cá nhân và trách nhiệm bảo vệ sức khỏe cộng đồng trước các đại dịch.",
    lenses: {
      individual: {
        key: "individual",
        labelVi: "Quyền Tự Do Thân Thể",
        labelEn: "Bodily Autonomy",
        iconName: "User",
        color: "#8b5cf6",
        coreAngleVi:
          "Quyền con người cơ bản về tự quyết định phương pháp điều trị y tế.",
        keyArguments: [
          "Quyền riêng tư dữ liệu sức khỏe",
          "Sự đồng thuận có hiểu biết (Informed Consent)",
        ],
        samplePhrases: [
          "Individual rights advocates emphasize the inviolability of bodily autonomy...",
        ],
      },
      corporate: {
        key: "corporate",
        labelVi: "Khối Y Tế Tư Nhân & Dược Phẩm",
        labelEn: "Pharma & Private Health",
        iconName: "Building2",
        color: "#06b6d4",
        coreAngleVi:
          "Tối ưu hóa năng lực sản xuất vắc-xin và duy trì hoạt động kinh tế liên tục.",
        keyArguments: [
          "Bảo vệ chuỗi cung ứng y tế",
          "Chi phí điều trị cho doanh nghiệp khi bùng phát dịch",
        ],
        samplePhrases: [
          "Healthcare conglomerates tend to prioritize immunization coverage to safeguard economic stability...",
        ],
      },
      government: {
        key: "government",
        labelVi: "Nhà Nước & Y Tế Công",
        labelEn: "Public Health Authorities",
        iconName: "Scale",
        color: "#f59e0b",
        coreAngleVi:
          "Bảo vệ hệ thống bệnh viện khỏi nguy cơ sụp đổ và đạt miễn dịch cộng đồng.",
        keyArguments: [
          "Ngăn chặn quá tải phòng hồi sức tích cực (ICU)",
          "Biện pháp cách ly kiểm dịch khẩn cấp",
        ],
        samplePhrases: [
          "State authorities are mandated to implement proportionate restrictions during epidemiological emergencies...",
        ],
      },
      scientific: {
        key: "scientific",
        labelVi: "Giới Dịch Tễ Học",
        labelEn: "Epidemiological Scientists",
        iconName: "Microscope",
        color: "#10b981",
        coreAngleVi:
          "Dữ liệu dịch tễ chứng minh hiệu quả giảm tỷ lệ tử vong của các biện pháp phòng ngừa tập thể.",
        keyArguments: [
          "Chỉ số lây nhiễm R0",
          "Miễn dịch cộng đồng và bảo vệ người có bệnh nền",
        ],
        samplePhrases: [
          "Epidemiologists consistently demonstrate that collective compliance drastically curbs viral transmission...",
        ],
      },
      civil_society: {
        key: "civil_society",
        labelVi: "Nhóm Bảo Vệ Nhân Quyền",
        labelEn: "Human Rights Watchdogs",
        iconName: "Users",
        color: "#ec4899",
        coreAngleVi:
          "Giám sát để các quy định khẩn cấp không bị lạm dụng xâm phạm tự do lâu dài.",
        keyArguments: [
          "Tính tương xứng và thời hạn của các sắc lệnh khẩn cấp",
          "Bảo vệ các nhóm thiểu số bị kỳ thị",
        ],
        samplePhrases: [
          "Civil liberties organizations insist that emergency powers must remain strictly time-bound and proportionate...",
        ],
      },
      global: {
        key: "global",
        labelVi: "Tổ Chức Y Tế Thế Giới (WHO)",
        labelEn: "World Health Organization",
        iconName: "Globe2",
        color: "#3b82f6",
        coreAngleVi:
          "Phân phối công bằng vắc-xin và điều ước quốc tế về chuẩn bị ứng phó đại dịch.",
        keyArguments: [
          "Đoàn kết y tế toàn cầu",
          "Chia sẻ dữ liệu giải trình tự gen virus",
        ],
        samplePhrases: [
          "Supranational health agencies urge equitable resource distribution to avert global systemic vulnerability...",
        ],
      },
    },
    hedgingDrill: {
      id: "drill_p3_4",
      unhedgedPrompt:
        "Governments should force everybody to take vaccines because anti-vaxxers are all uneducated.",
      crudeStatement:
        "Governments should force everybody to take vaccines because anti-vaxxers are all uneducated.",
      flawVi:
        "Câu nói mang tính áp đặt độc đoán và miệt thị ('force everybody', 'are all uneducated').",
      modelHedgedBand85:
        "While public health authorities arguably need to encourage widespread vaccination, persuasion and transparent public education appear far more constructive than coercive blanket mandates.",
      hedgedSample:
        "While public health authorities arguably need to encourage widespread vaccination, persuasion and transparent public education appear far more constructive than coercive blanket mandates.",
      insertedHedgingElements: [
        "arguably need to encourage",
        "appear far more constructive",
        "coercive blanket mandates",
      ],
      explanationVi:
        "Chuyển từ ép buộc sang 'persuasion and transparent public education appear far more constructive'.",
      explanation:
        "Chuyển từ ép buộc sang 'persuasion and transparent public education appear far more constructive'.",
    },
    modelResponseBand85: {
      directHedgedStance:
        "Striking a viable equilibrium between individual liberty and societal wellness is arguably one of the most intricate ethical dilemmas of modern governance.",
      lensAExploration:
        "From an epidemiological perspective, mandatory health protocols tend to be indispensable during acute health emergencies to prevent the collapse of critical medical infrastructure.",
      lensBCounterbalance:
        "Nevertheless, civil liberties watchdogs rightfully contend that such interventions must be strictly proportionate, transparent, and subject to continuous democratic scrutiny.",
      fallingConclusion:
        "Thus, fostering voluntary civic solidarity through transparent communication appears far preferable to heavy-handed coercion ↘.",
      fullCombined:
        "Striking a viable equilibrium between individual liberty and societal wellness is arguably one of the most intricate ethical dilemmas of modern governance. From an epidemiological perspective, mandatory health protocols tend to be indispensable during acute health emergencies to prevent the collapse of critical medical infrastructure. Nevertheless, civil liberties watchdogs rightfully contend that such interventions must be strictly proportionate, transparent, and subject to continuous democratic scrutiny. Thus, fostering voluntary civic solidarity through transparent communication appears far preferable to heavy-handed coercion.",
    },
    modelAnswer: {
      keyHedgingPhrases: [
        "is arguably one of",
        "tend to be indispensable",
        "rightfully contend",
        "strictly proportionate",
        "appears far preferable",
      ],
      fullResponse:
        "Striking a viable equilibrium between individual liberty and societal wellness is arguably one of the most intricate ethical dilemmas of modern governance. From an epidemiological perspective, mandatory health protocols tend to be indispensable during acute health emergencies to prevent the collapse of critical medical infrastructure. Nevertheless, civil liberties watchdogs rightfully contend that such interventions must be strictly proportionate, transparent, and subject to continuous democratic scrutiny. Thus, fostering voluntary civic solidarity through transparent communication appears far preferable to heavy-handed coercion.",
    },
    sampleAnswer:
      "Striking a viable equilibrium between individual liberty and societal wellness is arguably one of the most intricate ethical dilemmas of modern governance. From an epidemiological perspective, mandatory health protocols tend to be indispensable during acute health emergencies to prevent the collapse of critical medical infrastructure. Nevertheless, civil liberties watchdogs rightfully contend that such interventions must be strictly proportionate, transparent, and subject to continuous democratic scrutiny. Thus, fostering voluntary civic solidarity through transparent communication appears far preferable to heavy-handed coercion.",
    recommendedCadenceMarks: [
      {
        phrase: "modern governance",
        pitchDirection: "falling",
        rationaleVi:
          "Hạ giọng chuẩn xác ở cuối câu giới thiệu thế tiến thoái lưỡng nan.",
      },
      {
        phrase: "heavy-handed coercion",
        pitchDirection: "falling",
        rationaleVi:
          "Hạ cao độ F0 sâu ở đuôi câu kết thúc để toát lên phong thái học thuật đĩnh đạc.",
      },
    ],
  },
];
