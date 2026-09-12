export interface Section4BlankItem {
  questionNumber: number; // 31 to 40
  timestampSeconds: number; // Approx audio timestamp
  targetAnswer: string;
  acceptableAnswers: string[];
  contextBefore: string;
  contextAfter: string;
  signpostSignal: string;
  explanation: string;
  idealShorthand: string;
}

export interface SignpostMarker {
  timestampSeconds: number;
  phrase: string;
  functionVi: string;
}

export interface ShorthandRule {
  symbol: string;
  meaning: string;
  shortcut: string;
  example: string;
}

export interface Section4DenseData {
  id: string;
  title: string;
  topic: string;
  wordCount: number;
  audioDurationSeconds: number;
  audioUrl: string;
  introductionVi: string;
  notesTitle: string;
  subsections: Array<{
    heading: string;
    items: Array<{
      textTemplate: string; // contains {31}, {32}, etc.
      questionNumbers: number[];
    }>;
  }>;
  blanks: Section4BlankItem[];
  signposts: SignpostMarker[];
  transcriptParagraphs: Array<{
    id: string;
    timestampLabel: string;
    text: string;
    highlightQuestionNums?: number[];
  }>;
  shorthandDictionary: ShorthandRule[];
}

export const MOCK_SECTION4_DENSE_DATA: Section4DenseData = {
  id: "s4_dense_neolithic",
  title: "The Neolithic Agricultural Transition and Cereal Domestication",
  topic: "Archaeology & Anthropological Evolutionary Biology",
  wordCount: 1180,
  audioDurationSeconds: 420, // 7 minutes
  audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
  introductionVi:
    "Bài giảng đại học chuyên sâu về cuộc cách mạng nông nghiệp thời kỳ Đồ Đá Mới tại Lưỡi Liềm Màu Mỡ (Fertile Crescent), phân tích sự chuyển dịch từ săn bắt hái lượm sang định cư canh tác ngũ cốc.",
  notesTitle: "The Neolithic Agricultural Transition in the Fertile Crescent",
  subsections: [
    {
      heading: "Initial Climatic & Environmental Triggers",
      items: [
        {
          textTemplate:
            "Abrupt warming after the Younger Dryas forced communities to adopt a {31} lifestyle near perennial water basins.",
          questionNumbers: [31],
        },
        {
          textTemplate:
            "Wild cereals possessed brittle stems known as rachis, which facilitated natural seed {32} by seasonal winds.",
          questionNumbers: [32],
        },
      ],
    },
    {
      heading: "Morphological Mutations in Early Cultivated Grains",
      items: [
        {
          textTemplate:
            "Human harvesters inadvertently selected grains with non-shattering rachis, enhancing crop {33} for storage.",
          questionNumbers: [33],
        },
        {
          textTemplate:
            "Enlarged seed dimensions provided emergent seedlings with vital {34} during drought spells.",
          questionNumbers: [34],
        },
        {
          textTemplate:
            "Archaeological soil analysis indicates ancient cultivators utilized {35} made of animal bone to till fertile alluvial soil.",
          questionNumbers: [35],
        },
      ],
    },
    {
      heading: "Socio-Demographic Repercussions",
      items: [
        {
          textTemplate:
            "Permanent granary storage necessitated strict defensive {36} to safeguard surplus yields from rival clans.",
          questionNumbers: [36],
        },
        {
          textTemplate:
            "Skeletal bio-archaeology reveals higher rates of spinal {37} among female processors grinding wheat on stone querns.",
          questionNumbers: [37],
        },
        {
          textTemplate:
            "High carbohydrate intake caused a sharp surge in infant {38} across densely populated proto-villages.",
          questionNumbers: [38],
        },
      ],
    },
    {
      heading: "Long-Term Ecological Consequences",
      items: [
        {
          textTemplate:
            "Intensive slash-and-burn horticulture triggered catastrophic soil {39} across upland slopes.",
          questionNumbers: [39],
        },
        {
          textTemplate:
            "Genetic bottlenecking severely diminished the {40} of modern staple crops against emergent pathogens.",
          questionNumbers: [40],
        },
      ],
    },
  ],
  blanks: [
    {
      questionNumber: 31,
      timestampSeconds: 45,
      targetAnswer: "sedentary",
      acceptableAnswers: ["sedentary"],
      contextBefore: "communities to adopt a",
      contextAfter: "lifestyle near perennial water basins",
      signpostSignal: "Let us commence by examining the initial environmental catalyst...",
      explanation:
        "Giảng viên nhắc đến sự ấm lên sau kỷ Younger Dryas buộc các bộ tộc phải từ bỏ lối sống du mục (nomadic) và chuyển sang lối sống 'sedentary' (định cư).",
      idealShorthand: "clim warm -> nomadic -> sedentary life nr H2O",
    },
    {
      questionNumber: 32,
      timestampSeconds: 85,
      targetAnswer: "dispersal",
      acceptableAnswers: ["dispersal", "dispersion"],
      contextBefore: "facilitated natural seed",
      contextAfter: "by seasonal winds",
      signpostSignal: "Turning our attention now to the morphology of wild grains...",
      explanation:
        "Phần cuống giòn (brittle rachis) giúp phát tán hạt tự nhiên nhờ gió ('natural seed dispersal by seasonal winds').",
      idealShorthand: "brittle stem -> seed dispersal via wind",
    },
    {
      questionNumber: 33,
      timestampSeconds: 135,
      targetAnswer: "durability",
      acceptableAnswers: ["durability"],
      contextBefore: "enhancing crop",
      contextAfter: "for storage",
      signpostSignal: "What is particularly remarkable about early human selection...",
      explanation:
        "Việc chọn giống cuống dai giúp hạt không bị rụng trước khi thu hoạch, tăng độ bền và thời gian lưu trữ ('enhancing crop durability for storage').",
      idealShorthand: "human sel -> non-shatter -> ^ crop durability",
    },
    {
      questionNumber: 34,
      timestampSeconds: 175,
      targetAnswer: "nutrients",
      acceptableAnswers: ["nutrients", "nutrition"],
      contextBefore: "seedlings with vital",
      contextAfter: "during drought spells",
      signpostSignal: "In addition to non-shattering ears, seed size underwent a dramatic expansion...",
      explanation:
        "Hạt to hơn giúp cung cấp các chất dinh dưỡng thiết yếu ('vital nutrients') cho cây con trong đợt hạn hán.",
      idealShorthand: "seed size ^ -> supply vital nutrients during drought",
    },
    {
      questionNumber: 35,
      timestampSeconds: 215,
      targetAnswer: "shovels",
      acceptableAnswers: ["shovels", "hoes", "tools"],
      contextBefore: "ancient cultivators utilized",
      contextAfter: "made of animal bone to till fertile alluvial soil",
      signpostSignal: "Archaeological excavation in the Levant reveals crucial tool innovations...",
      explanation:
        "Các nhà khảo cổ tìm thấy các công cụ xới đất như 'shovels' (xẻng / cuốc xới) làm từ xương động vật.",
      idealShorthand: "excav Levant -> bone shovels to till soil",
    },
    {
      questionNumber: 36,
      timestampSeconds: 260,
      targetAnswer: "fortifications",
      acceptableAnswers: ["fortifications", "walls", "barriers"],
      contextBefore: "necessitated strict defensive",
      contextAfter: "to safeguard surplus yields from rival clans",
      signpostSignal: "Now, let us shift our focus to the sociological ramifications...",
      explanation:
        "Kho lương thực dư thừa đòi hỏi phải dựng các công trình phòng thủ kiên cố ('defensive fortifications') để chống cướp bóc.",
      idealShorthand: "granary surplus -> need defensive fortifications",
    },
    {
      questionNumber: 37,
      timestampSeconds: 300,
      targetAnswer: "deformation",
      acceptableAnswers: ["deformation", "deformations", "damage"],
      contextBefore: "higher rates of spinal",
      contextAfter: "among female processors grinding wheat",
      signpostSignal: "Skeletal evidence paints a remarkably harsh physiological picture...",
      explanation:
        "Phụ nữ nghiền ngũ cốc bằng cối đá hàng giờ bị biến dạng cột sống ('spinal deformation').",
      idealShorthand: "quern grind -> female spinal deformation",
    },
    {
      questionNumber: 38,
      timestampSeconds: 340,
      targetAnswer: "mortality",
      acceptableAnswers: ["mortality"],
      contextBefore: "sharp surge in infant",
      contextAfter: "across densely populated proto-villages",
      signpostSignal: "Paradoxically, despite abundant grain calories...",
      explanation:
        "Nghịch lý là chế độ ăn nhiều tinh bột nhưng thiếu vi chất cùng với mầm bệnh trong làng đông đúc đã làm tăng tỷ lệ tử vong ở trẻ sơ sinh ('infant mortality').",
      idealShorthand: "^ carbs + dense pop -> ^ infant mortality",
    },
    {
      questionNumber: 39,
      timestampSeconds: 380,
      targetAnswer: "erosion",
      acceptableAnswers: ["erosion"],
      contextBefore: "triggered catastrophic soil",
      contextAfter: "across upland slopes",
      signpostSignal: "Finally, the environmental toll of continuous agriculture was severe...",
      explanation:
        "Kỹ thuật đốt rừng làm rẫy liên tục khiến sườn đồi bị xói mòn đất nghiêm trọng ('catastrophic soil erosion').",
      idealShorthand: "slash-burn -> catast soil erosion",
    },
    {
      questionNumber: 40,
      timestampSeconds: 410,
      targetAnswer: "resilience",
      acceptableAnswers: ["resilience", "resistance"],
      contextBefore: "severely diminished the",
      contextAfter: "of modern staple crops against emergent pathogens",
      signpostSignal: "To conclude this lecture, consider the evolutionary legacy...",
      explanation:
        "Sự thu hẹp đa dạng di truyền (bottlenecking) làm suy giảm khả năng phục hồi / chống chịu ('resilience') của cây trồng trước dịch bệnh.",
      idealShorthand: "genetic bottleneck -> diminish crop resilience vs pathogen",
    },
  ],
  signposts: [
    {
      timestampSeconds: 40,
      phrase: "Let us commence by examining the initial environmental catalyst...",
      functionVi: "Mở đầu bài giảng: Giới thiệu tác nhân khí hậu ban đầu",
    },
    {
      timestampSeconds: 80,
      phrase: "Turning our attention now to the morphology of wild grains...",
      functionVi: "Chuyển ý 1: Sang phân tích hình thái thực vật của lúa hoang dại",
    },
    {
      timestampSeconds: 130,
      phrase: "What is particularly remarkable about early human selection...",
      functionVi: "Nhấn mạnh cơ chế: Sự chọn lọc nhân tạo của người tiền sử",
    },
    {
      timestampSeconds: 210,
      phrase: "Archaeological excavation in the Levant reveals crucial tool innovations...",
      functionVi: "Chuyển ý 2: Sang bằng chứng công cụ khảo cổ học",
    },
    {
      timestampSeconds: 255,
      phrase: "Now, let us shift our focus to the sociological ramifications...",
      functionVi: "Chuyển phần lớn: Sang hệ quả nhân khẩu học & xã hội",
    },
    {
      timestampSeconds: 335,
      phrase: "Paradoxically, despite abundant grain calories...",
      functionVi: "Tín hiệu nghịch lý: Tỷ lệ tử vong trẻ sơ sinh tăng cao",
    },
    {
      timestampSeconds: 375,
      phrase: "Finally, the environmental toll of continuous agriculture was severe...",
      functionVi: "Chuyển phần cuối: Hệ quả suy thoái môi trường lâu dài",
    },
  ],
  transcriptParagraphs: [
    {
      id: "tp_1",
      timestampLabel: "00:00 - 01:10",
      text: "Good morning, everyone. Today we are exploring the profound epochal transformation that reshaped human evolutionary history: the Neolithic transition to cereal agriculture in the Fertile Crescent roughly eleven thousand years ago. Let us commence by examining the initial environmental catalyst. Following the abrupt termination of the Younger Dryas glacial epoch, rapid warming transformed arid steppes into lush savannas. Faced with shifting animal migrations, prehistoric hunter-gatherer bands began congregating around perennial water sources, gradually abandoning their nomadic existence in favor of a sedentary lifestyle near lake basins and river valleys.",
      highlightQuestionNums: [31],
    },
    {
      id: "tp_2",
      timestampLabel: "01:11 - 02:20",
      text: "Turning our attention now to the morphology of wild grains, wild emmer wheat and barley possessed brittle rachis stems. In natural ecologies, this fragility is an evolutionary asset: as mature grains dry, the brittle rachis fractures easily under autumn gusts, facilitating widespread seed dispersal by seasonal winds. However, for human foragers attempting to harvest ears with flint sickles, brittle ears shattered prematurely upon contact, scattering seeds into the brush. What is particularly remarkable about early human selection is that foragers preferentially gathered mutant ears with non-shattering rachis. Over successive generations of replanting, this deliberate selective pressure drastically enhanced crop durability for storage.",
      highlightQuestionNums: [32, 33],
    },
    {
      id: "tp_3",
      timestampLabel: "02:21 - 03:35",
      text: "In addition to non-shattering ears, seed size underwent a dramatic expansion under early cultivation. Larger grain kernels contained substantially greater carbohydrate reserves, which provided emergent seedlings with vital nutrients during periodic drought spells before root networks could reach groundwater. Archaeological excavation across the Levant reveals crucial tool innovations that accelerated this agrarian expansion. Rather than relying solely on simple digging sticks, ancient cultivators utilized sturdy shovels fashioned from polished animal bone and ox scapulae to till the dense alluvial soils of river plains.",
      highlightQuestionNums: [34, 35],
    },
    {
      id: "tp_4",
      timestampLabel: "03:36 - 05:00",
      text: "Now, let us shift our focus to the sociological ramifications of this agricultural boom. While food production skyrocketed, grain storage introduced unprecedented geopolitical vulnerability. Permanent granary silos packed with barley reserves necessitated strict defensive fortifications—such as the massive stone walls and watchtowers famously unearthed at ancient Jericho—to safeguard surplus yields from rival nomadic raiders. Skeletal evidence paints a remarkably harsh physiological picture of daily farming life. Bio-archaeological analysis of Neolithic burials exhibits alarming rates of spinal deformation among female processors, whose vertebrae were crushed by kneeling for eight to ten hours daily over basalt quern stones to mill hard wheat into flour. Paradoxically, despite abundant grain calories, infant mortality spiked precipitously in proto-urban settlements due to dense microbial transmission and chronic micronutrient deficiencies.",
      highlightQuestionNums: [36, 37, 38],
    },
    {
      id: "tp_5",
      timestampLabel: "05:01 - 07:00",
      text: "Finally, the environmental toll of continuous agriculture was severe and lasting. To clear expansive fields for monoculture cereals, early farmers engaged in aggressive slash-and-burn horticulture across hilly terrains. Without deep-rooted forest canopies to anchor topsoil, winter torrents triggered catastrophic soil erosion across upland slopes, transforming previously fertile valleys into barren limestone badlands. To conclude this lecture, consider the evolutionary legacy we inherit today: this extreme genetic bottlenecking, initiated in the Fertile Crescent, severely diminished the overall resilience of modern staple crops against emergent pathogens. Next Tuesday, we shall examine the parallel domestication of livestock.",
      highlightQuestionNums: [39, 40],
    },
  ],
  shorthandDictionary: [
    {
      symbol: "→",
      meaning: "Dẫn đến / Kết quả là (Leads to / Results in)",
      shortcut: "->",
      example: "clim warm -> sedentary life",
    },
    {
      symbol: "←",
      meaning: "Bắt nguồn từ (Caused by / Originates from)",
      shortcut: "<-",
      example: "spinal def <- quern grinding",
    },
    {
      symbol: "↑",
      meaning: "Tăng / Nâng cao (Increase / Enhance)",
      shortcut: "^",
      example: "^ crop durability",
    },
    {
      symbol: "↓",
      meaning: "Giảm / Suy thoái (Decrease / Diminish)",
      shortcut: "v",
      example: "v genetic resilience",
    },
    {
      symbol: "b/c",
      meaning: "Bởi vì (Because)",
      shortcut: "bc",
      example: "bc infant mortality ^",
    },
    {
      symbol: "w/",
      meaning: "Với (With)",
      shortcut: "w/",
      example: "till w/ bone shovels",
    },
    {
      symbol: "nr",
      meaning: "Gần (Near / Adjacent to)",
      shortcut: "nr",
      example: "nr perennial H2O",
    },
    {
      symbol: "Δ",
      meaning: "Thay đổi (Change / Transformation)",
      shortcut: "delta",
      example: "climate delta -> farming",
    },
  ],
};
