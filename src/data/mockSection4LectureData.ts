export interface S4QuestionItem {
  number: number; // 31 to 40
  sectionIndex: number; // 0, 1, 2, 3
  correctWord: string; // strict lowercase
  acceptedAlternates?: string[];
  targetPos: "noun" | "plural_noun" | "verb" | "adjective";
  targetPosLabelVi: string;
  expectedSemanticFieldVi: string;
  anchorKeyword: string;
  signpostingPhrase: string;
  audioTimestampSeconds: number;
  isPlural: boolean;
  pedagogicalAdvice: string;
  noteContext: string;
}

export interface LectureSectionBlock {
  sectionIndex: number;
  romanNumeral: string;
  titleEn: string;
  titleVi: string;
  startTimestampSeconds: number;
  endTimestampSeconds: number;
  questionNumbers: number[];
  bullets: Array<{
    textPrefix: string;
    questionNumber?: number;
    textSuffix?: string;
  }>;
}

export interface SignpostingCueCategory {
  category: "topic_shift" | "emphasis_definition" | "cause_effect" | "empirical_evidence";
  titleVi: string;
  descriptionVi: string;
  colorHex: string;
  badgeBg: string;
  textColor: string;
  cues: Array<{
    phrase: string;
    functionVi: string;
    exampleInLecture: string;
  }>;
}

export interface AwlVocabItem {
  word: string;
  ipa: string;
  meaningVi: string;
  contextSentence: string;
}

export interface Section4LectureExerciseData {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  topicTitle: string;
  wordLimitRule: string; // "ONE WORD ONLY"
  totalAudioDurationSeconds: number;
  contextDescriptionVi: string;
  sections: LectureSectionBlock[];
  questions: S4QuestionItem[];
  signpostingCategories: SignpostingCueCategory[];
  awlVocabulary: AwlVocabItem[];
  transcriptParagraphs: Array<{
    sectionIndex: number;
    startSecond: number;
    endSecond: number;
    text: string;
    signpostingHighlight?: string;
    targetWordHighlight?: string;
    questionNumber?: number;
  }>;
}

export const MOCK_SECTION4_LECTURE_DATA: Section4LectureExerciseData = {
  id: "sec4_ancient_qanats",
  title: "Section 4: Ethnoarchaeology of Subterranean Irrigation Systems",
  speaker: "Dr. Alistair Vance",
  speakerRole: "Senior Lecturer in Arid-Zone Hydraulic Archaeology",
  topicTitle: "The Engineering, Governance, and Sustainability of Ancient Qanats",
  wordLimitRule: "Write ONE WORD ONLY for each answer.",
  totalAudioDurationSeconds: 225,
  contextDescriptionVi:
    "Bạn sẽ nghe một bài giảng học thuật liên tục từ Tiến sĩ Alistair Vance về công trình thủy lợi ngầm cổ đại (Qanat), nguyên lý thủy lực học, cơ chế phân bổ tài nguyên nước và các nỗ lực bảo tồn hiện đại.",
  sections: [
    {
      sectionIndex: 0,
      romanNumeral: "I",
      titleEn: "Historical Origins & Geographical Spread",
      titleVi: "Nguồn Gốc Lịch Sử & Phạm Vi Địa Lý",
      startTimestampSeconds: 0,
      endTimestampSeconds: 58,
      questionNumbers: [31, 32],
      bullets: [
        {
          textPrefix: "Engineers first developed qanats in the arid highlands of ancient",
          questionNumber: 31,
          textSuffix: "over 3,000 years ago.",
        },
        {
          textPrefix: "Spread along historic trading networks due to the expansion of the Silk",
          questionNumber: 32,
          textSuffix: "and early empires.",
        },
      ],
    },
    {
      sectionIndex: 1,
      romanNumeral: "II",
      titleEn: "Engineering Architecture & Gravitational Dynamics",
      titleVi: "Cấu Trúc Kỹ Thuật & Động Lực Học Trọng Lực",
      startTimestampSeconds: 59,
      endTimestampSeconds: 118,
      questionNumbers: [33, 34, 35],
      bullets: [
        {
          textPrefix: "Excavation commenced by finding a subterranean mother well tapped into deep",
          questionNumber: 33,
          textSuffix: "at the foot of mountain ranges.",
        },
        {
          textPrefix: "Vertical shafts served two vital purposes: removing excavated debris and providing",
          questionNumber: 34,
          textSuffix: "for underground diggers.",
        },
        {
          textPrefix: "Underground channels were engineered with a minimal downward",
          questionNumber: 35,
          textSuffix: "to avoid erosion while ensuring steady flow.",
        },
      ],
    },
    {
      sectionIndex: 2,
      romanNumeral: "III",
      titleEn: "Socio-Economic Governance & Water Allocation",
      titleVi: "Quản Trị Xã Hội & Cơ Chế Phân Bổ Nước",
      startTimestampSeconds: 119,
      endTimestampSeconds: 172,
      questionNumbers: [36, 37],
      bullets: [
        {
          textPrefix: "Water delivery time was traditionally quantified using an ancient water clock called a",
          questionNumber: 36,
          textSuffix: "to prevent disputes.",
        },
        {
          textPrefix: "Maintenance costs and digging risks were shared through communal shareholding by local",
          questionNumber: 37,
          textSuffix: "working the soil.",
        },
      ],
    },
    {
      sectionIndex: 3,
      romanNumeral: "IV",
      titleEn: "Modern Deterioration & Conservation Initiatives",
      titleVi: "Sự Suy Thoái Hiện Đại & Sáng Kiến Bảo Tồn",
      startTimestampSeconds: 173,
      endTimestampSeconds: 225,
      questionNumbers: [38, 39, 40],
      bullets: [
        {
          textPrefix: "The primary modern catalyst of aquifer depletion has been mechanical",
          questionNumber: 38,
          textSuffix: "installed since the mid-20th century.",
        },
        {
          textPrefix: "Rapid urban expansion has led to severe chemical",
          questionNumber: 39,
          textSuffix: "leaching into underground channels.",
        },
        {
          textPrefix: "Restoration projects are now supported globally by granting world heritage",
          questionNumber: 40,
          textSuffix: "recognition.",
        },
      ],
    },
  ],
  questions: [
    {
      number: 31,
      sectionIndex: 0,
      correctWord: "persia",
      acceptedAlternates: ["iran"],
      targetPos: "noun",
      targetPosLabelVi: "Danh từ riêng (Tên quốc gia/khu vực)",
      expectedSemanticFieldVi: "Tên địa danh lịch sử nơi bắt nguồn công nghệ",
      anchorKeyword: "arid highlands",
      signpostingPhrase: "To begin with the historical emergence...",
      audioTimestampSeconds: 22,
      isPlural: false,
      pedagogicalAdvice: "Từ neo: 'ancient...'. Trong bài giảng giáo sư nói 'in the arid plateau of ancient Persia'.",
      noteContext: "developed qanats in the arid highlands of ancient [31]",
    },
    {
      number: 32,
      sectionIndex: 0,
      correctWord: "road",
      acceptedAlternates: ["route"],
      targetPos: "noun",
      targetPosLabelVi: "Danh từ",
      expectedSemanticFieldVi: "Con đường thương mại nổi tiếng",
      anchorKeyword: "expansion of the Silk",
      signpostingPhrase: "Crucially, this technology diffused rapidly along...",
      audioTimestampSeconds: 44,
      isPlural: false,
      pedagogicalAdvice: "Cụm danh từ cố định: 'Silk Road' (Con đường tơ lụa).",
      noteContext: "due to the expansion of the Silk [32]",
    },
    {
      number: 33,
      sectionIndex: 1,
      correctWord: "aquifers",
      acceptedAlternates: ["aquifer"],
      targetPos: "plural_noun",
      targetPosLabelVi: "Danh từ số nhiều (hoặc số ít)",
      expectedSemanticFieldVi: "Tầng chứa nước ngầm",
      anchorKeyword: "tapped into deep",
      signpostingPhrase: "Now, let us turn our attention to the hydraulic engineering...",
      audioTimestampSeconds: 70,
      isPlural: true,
      pedagogicalAdvice: "Cần chú ý âm đuôi -s: 'tapped directly into alluvial aquifers'.",
      noteContext: "tapped into deep [33] at the foot of mountain ranges",
    },
    {
      number: 34,
      sectionIndex: 1,
      correctWord: "ventilation",
      acceptedAlternates: ["oxygen", "air"],
      targetPos: "noun",
      targetPosLabelVi: "Danh từ không đếm được",
      expectedSemanticFieldVi: "Sự thông gió / cung cấp không khí thở",
      anchorKeyword: "providing",
      signpostingPhrase: "The defining functional necessity of these vertical shafts...",
      audioTimestampSeconds: 92,
      isPlural: false,
      pedagogicalAdvice: "Giáo sư nói 'essential for providing continuous ventilation for subterranean workers'.",
      noteContext: "providing [34] for underground diggers",
    },
    {
      number: 35,
      sectionIndex: 1,
      correctWord: "gradient",
      acceptedAlternates: ["slope", "incline"],
      targetPos: "noun",
      targetPosLabelVi: "Danh từ",
      expectedSemanticFieldVi: "Độ dốc / góc nghiêng thủy lực",
      anchorKeyword: "minimal downward",
      signpostingPhrase: "A key technological triumph was maintaining...",
      audioTimestampSeconds: 108,
      isPlural: false,
      pedagogicalAdvice: "Thuật ngữ kỹ thuật 'gradient' (độ dốc). Giáo sư: 'engineered with a very gentle downward gradient'.",
      noteContext: "with a minimal downward [35] to avoid erosion",
    },
    {
      number: 36,
      sectionIndex: 2,
      correctWord: "bowl",
      acceptedAlternates: ["clepsydra"],
      targetPos: "noun",
      targetPosLabelVi: "Danh từ số ít",
      expectedSemanticFieldVi: "Dụng cụ đo lường / chiếc bát đồng bấm giờ",
      anchorKeyword: "called a",
      signpostingPhrase: "Moving on to social governance and water rights...",
      audioTimestampSeconds: 135,
      isPlural: false,
      pedagogicalAdvice: "Giáo sư: 'timed by a submerged perforated copper bowl... known locally as a fenjan'.",
      noteContext: "ancient water clock called a [36] to prevent disputes",
    },
    {
      number: 37,
      sectionIndex: 2,
      correctWord: "farmers",
      acceptedAlternates: ["farmer"],
      targetPos: "plural_noun",
      targetPosLabelVi: "Danh từ số nhiều (chỉ người)",
      expectedSemanticFieldVi: "Người nông dân / người canh tác",
      anchorKeyword: "by local",
      signpostingPhrase: "What is particularly fascinating about this economic model...",
      audioTimestampSeconds: 158,
      isPlural: true,
      pedagogicalAdvice: "Cần nghe chuẩn âm đuôi -s: 'jointly funded by cooperative associations of local farmers'.",
      noteContext: "communal shareholding by local [37] working the soil",
    },
    {
      number: 38,
      sectionIndex: 3,
      correctWord: "pumps",
      acceptedAlternates: ["pump"],
      targetPos: "plural_noun",
      targetPosLabelVi: "Danh từ số nhiều",
      expectedSemanticFieldVi: "Máy bơm cơ giới",
      anchorKeyword: "mechanical",
      signpostingPhrase: "Having examined its zenith, we must now confront its modern decline...",
      audioTimestampSeconds: 182,
      isPlural: true,
      pedagogicalAdvice: "Giáo sư: 'the widespread adoption of diesel-powered mechanical pumps'.",
      noteContext: "primary modern catalyst has been mechanical [38]",
    },
    {
      number: 39,
      sectionIndex: 3,
      correctWord: "pollution",
      acceptedAlternates: ["contamination"],
      targetPos: "noun",
      targetPosLabelVi: "Danh từ không đếm được",
      expectedSemanticFieldVi: "Sự ô nhiễm hóa chất",
      anchorKeyword: "severe chemical",
      signpostingPhrase: "Furthermore, urban sprawl has triggered an acute environmental crisis...",
      audioTimestampSeconds: 201,
      isPlural: false,
      pedagogicalAdvice: "Giáo sư: 'untreated municipal wastewater resulting in toxic chemical pollution'.",
      noteContext: "led to severe chemical [39] leaching into underground channels",
    },
    {
      number: 40,
      sectionIndex: 3,
      correctWord: "status",
      acceptedAlternates: ["designation"],
      targetPos: "noun",
      targetPosLabelVi: "Danh từ",
      expectedSemanticFieldVi: "Danh hiệu / tư cách di sản thế giới",
      anchorKeyword: "world heritage",
      signpostingPhrase: "To conclude on a proactive note, international heritage bodies...",
      audioTimestampSeconds: 218,
      isPlural: false,
      pedagogicalAdvice: "Cụm danh từ: 'world heritage status' (Danh hiệu Di sản Thế giới UNESCO).",
      noteContext: "granting world heritage [40] recognition",
    },
  ],
  signpostingCategories: [
    {
      category: "topic_shift",
      titleVi: "Chuyển Ý & Mở Phân Nhánh Mới",
      descriptionVi: "Dấu hiệu giáo sư chuyển sang một đề mục lớn khác trên trang ghi chú.",
      colorHex: "#8b5cf6",
      badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
      textColor: "text-purple-600 dark:text-purple-400",
      cues: [
        {
          phrase: "To begin with...",
          functionVi: "Mở đầu đề mục lịch sử (Section 1)",
          exampleInLecture: "To begin with the historical emergence of subterranean conduits...",
        },
        {
          phrase: "Now, let us turn our attention to...",
          functionVi: "Chuyển sang cấu trúc kỹ thuật (Section 2)",
          exampleInLecture: "Now, let us turn our attention to the hydraulic engineering...",
        },
        {
          phrase: "Moving on to...",
          functionVi: "Chuyển sang quản trị xã hội (Section 3)",
          exampleInLecture: "Moving on to social governance and water rights...",
        },
        {
          phrase: "Having examined X, we must now confront Y...",
          functionVi: "Chuyển sang thực trạng suy thoái hiện đại (Section 4)",
          exampleInLecture: "Having examined its zenith, we must now confront its modern decline...",
        },
      ],
    },
    {
      category: "emphasis_definition",
      titleVi: "Nhấn Mạnh Điểm Then Chốt",
      descriptionVi: "Tín hiệu báo trước từ cần điền là khái niệm hoặc đặc tính cốt lõi.",
      colorHex: "#3b82f6",
      badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
      textColor: "text-blue-600 dark:text-blue-400",
      cues: [
        {
          phrase: "The defining functional necessity lies in...",
          functionVi: "Giải thích chức năng then chốt (Q34 ventilation)",
          exampleInLecture: "The defining functional necessity of these vertical shafts was providing ventilation...",
        },
        {
          phrase: "A key technological triumph was...",
          functionVi: "Nhấn mạnh thành tựu kỹ thuật (Q35 gradient)",
          exampleInLecture: "A key technological triumph was maintaining a minimal downward gradient...",
        },
      ],
    },
    {
      category: "cause_effect",
      titleVi: "Mối Quan Hệ Nhân Quả & Tác Động",
      descriptionVi: "Tín hiệu lý giải nguyên nhân hoặc hệ quả của hiện tượng.",
      colorHex: "#f59e0b",
      badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
      textColor: "text-amber-600 dark:text-amber-400",
      cues: [
        {
          phrase: "The primary modern catalyst of... has been...",
          functionVi: "Chỉ ra nguyên nhân chính (Q38 pumps)",
          exampleInLecture: "The primary modern catalyst of aquifer exhaustion has been mechanical pumps...",
        },
        {
          phrase: "Triggered an acute crisis, resulting in...",
          functionVi: "Chỉ ra hệ quả ô nhiễm (Q39 pollution)",
          exampleInLecture: "Urban sprawl has resulted in toxic chemical pollution...",
        },
      ],
    },
    {
      category: "empirical_evidence",
      titleVi: "Minh Chứng & Di Sản Thực Nghiệm",
      descriptionVi: "Tín hiệu đưa ra số liệu hoặc quyết định bảo tồn.",
      colorHex: "#10b981",
      badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      textColor: "text-emerald-600 dark:text-emerald-400",
      cues: [
        {
          phrase: "To conclude on a proactive note...",
          functionVi: "Tổng kết giải pháp bảo tồn (Q40 status)",
          exampleInLecture: "To conclude on a proactive note, UNESCO granted world heritage status...",
        },
      ],
    },
  ],
  awlVocabulary: [
    {
      word: "aquifer",
      ipa: "/ˈæk.wɪ.fər/",
      meaningVi: "Tầng chứa nước ngầm",
      contextSentence: "Hydraulic engineers tapped directly into mountain aquifers.",
    },
    {
      word: "subterranean",
      ipa: "/ˌsʌb.təˈreɪ.ni.ən/",
      meaningVi: "Dưới lòng đất / ngầm",
      contextSentence: "Qanats represent monumental subterranean water transport channels.",
    },
    {
      word: "gradient",
      ipa: "/ˈɡreɪ.di.ənt/",
      meaningVi: "Độ dốc / góc nghiêng thủy lực",
      contextSentence: "Maintaining a precise gravitational gradient prevents channel sedimentation.",
    },
    {
      word: "catalyst",
      ipa: "/ˈkæt.əl.ɪst/",
      meaningVi: "Chất xúc tác / tác nhân thúc đẩy",
      contextSentence: "Diesel-powered extraction was the catalyst behind groundwater depletion.",
    },
  ],
  transcriptParagraphs: [
    {
      sectionIndex: 0,
      startSecond: 0,
      endSecond: 32,
      text: "Good afternoon, everyone. In today's seminar on historical hydraulic engineering in hyper-arid zones, we shall examine one of humanity's most ingenious hydrological inventions: the ancient qanat. To begin with the historical emergence of these subterranean conduits, archaeological excavations indicate that master well-diggers first developed qanats in the arid highlands of ancient Persia over 3,000 years ago.",
      signpostingHighlight: "To begin with the historical emergence",
      targetWordHighlight: "Persia",
      questionNumber: 31,
    },
    {
      sectionIndex: 0,
      startSecond: 33,
      endSecond: 58,
      text: "From this Iranian epicenter, the architectural knowledge diffused across the Middle East, North Africa, and the Mediterranean basin. Crucially, this technology diffused rapidly along trans-continental trading corridors, propelled by the expansion of the Silk Road and ancient imperial conquests.",
      signpostingHighlight: "Crucially, this technology diffused rapidly along",
      targetWordHighlight: "Road",
      questionNumber: 32,
    },
    {
      sectionIndex: 1,
      startSecond: 59,
      endSecond: 85,
      text: "Now, let us turn our attention to the hydraulic engineering and structural mechanics that make qanats uniquely sustainable. The construction process commenced with the excavation of a deep 'mother well' at the foothills of mountain ranges, which tapped into deep alluvial aquifers fed by seasonal snowmelt.",
      signpostingHighlight: "Now, let us turn our attention to the hydraulic engineering",
      targetWordHighlight: "aquifers",
      questionNumber: 33,
    },
    {
      sectionIndex: 1,
      startSecond: 86,
      endSecond: 100,
      text: "From there, miners excavated a gently sloping subterranean tunnel extending for miles. Along the tunnel route, vertical shafts were sunk every twenty to thirty meters. The defining functional necessity of these vertical shafts was dual: removing excavated earth and, crucially, providing continuous ventilation for underground diggers working in suffocating darkness.",
      signpostingHighlight: "The defining functional necessity of these vertical shafts was",
      targetWordHighlight: "ventilation",
      questionNumber: 34,
    },
    {
      sectionIndex: 1,
      startSecond: 101,
      endSecond: 118,
      text: "A key technological triumph was maintaining a minimal downward gradient. If the slope was too steep, turbulent water would cause structural erosion; if too shallow, water would stagnate. The gradient was calibrated so water flowed purely by natural gravity.",
      signpostingHighlight: "A key technological triumph was maintaining",
      targetWordHighlight: "gradient",
      questionNumber: 35,
    },
    {
      sectionIndex: 2,
      startSecond: 119,
      endSecond: 148,
      text: "Moving on to social governance and water rights, the qanat was not merely a physical structure, but an institutional masterpiece. In arid settlements, water shares were distributed with mathematical precision. To prevent violent disputes among irrigators, water delivery was timed using an ancient water clock called a floating copper bowl, which submerged at calibrated intervals.",
      signpostingHighlight: "Moving on to social governance and water rights",
      targetWordHighlight: "bowl",
      questionNumber: 36,
    },
    {
      sectionIndex: 2,
      startSecond: 149,
      endSecond: 172,
      text: "What is particularly fascinating about this economic model is that the substantial financial capital required for maintenance was shared through communal shareholding by local farmers who collectively owned shares proportional to their land holdings.",
      signpostingHighlight: "What is particularly fascinating about this economic model",
      targetWordHighlight: "farmers",
      questionNumber: 37,
    },
    {
      sectionIndex: 3,
      startSecond: 173,
      endSecond: 195,
      text: "Having examined its zenith, we must now confront its modern decline over the past seventy years. The primary modern catalyst of aquifer exhaustion has been mechanical pumps and deep diesel boreholes drilled since the 1950s, which rapidly lowered the water table below the reach of traditional qanat channels.",
      signpostingHighlight: "Having examined its zenith, we must now confront its modern decline",
      targetWordHighlight: "pumps",
      questionNumber: 38,
    },
    {
      sectionIndex: 3,
      startSecond: 196,
      endSecond: 210,
      text: "Furthermore, uncontrolled municipal urbanization has triggered an acute crisis, with untreated industrial sewage causing severe chemical pollution that leaches directly into ancient subterranean waterways.",
      signpostingHighlight: "Furthermore, uncontrolled municipal urbanization has triggered",
      targetWordHighlight: "pollution",
      questionNumber: 39,
    },
    {
      sectionIndex: 3,
      startSecond: 211,
      endSecond: 225,
      text: "To conclude on a proactive note, international restoration efforts have gained momentum. In recent years, UNESCO recognized eleven historic Persian qanats by officially granting them World Heritage status, ensuring their preservation as living hydraulic monuments.",
      signpostingHighlight: "To conclude on a proactive note",
      targetWordHighlight: "status",
      questionNumber: 40,
    },
  ],
};
