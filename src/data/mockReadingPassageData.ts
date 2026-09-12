export interface PassageSentence {
  id: string; // e.g. "p_a_s1"
  text: string;
}

export interface PassageParagraph {
  id: "A" | "B" | "C" | "D" | "E" | "F";
  title?: string;
  sentences: PassageSentence[];
}

export type ReadingQuestionType = "tfng" | "matching_info" | "summary_completion";

export interface ParaphrasePair {
  questionPhrase: string;
  passagePhrase: string;
  strategy: string; // e.g. "Direct Synonym", "Part of Speech Transformation", "Negative of Opposite", "Generalization"
}

export interface ReadingQuestion {
  id: string;
  number: number;
  type: ReadingQuestionType;
  prompt: string;
  options?: string[]; // for dropdown or choices
  correctAnswer: string;
  wordLimit?: string; // e.g. "NO MORE THAN TWO WORDS"
  evidenceParagraphId: "A" | "B" | "C" | "D" | "E" | "F";
  evidenceSentenceId: string;
  evidenceSentenceText: string;
  paraphrasePairs: ParaphrasePair[];
  explanation: string;
  isParaphraseTrap: boolean;
}

export interface ReadingPassageData {
  id: string;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  wordCount: number;
  paragraphs: PassageParagraph[];
  questions: ReadingQuestion[];
}

export const MOCK_BIOMIMETIC_PASSAGE: ReadingPassageData = {
  id: "passage_biomimetics_01",
  title: "The Biomimetic Revolution: Engineering Inspired by Nature",
  subtitle: "How biological adaptations evolved over millions of years are reshaping modern architecture, materials science, and energy efficiency.",
  readingTimeMinutes: 20,
  wordCount: 880,
  paragraphs: [
    {
      id: "A",
      sentences: [
        { id: "p_a_s1", text: "For nearly 3.8 billion years, biological evolution has served as the planet's most rigorous research and development laboratory." },
        { id: "p_a_s2", text: "Organisms that failed to adapt efficiently to severe thermodynamic constraints, physical stresses, and resource scarcities were systematically eliminated through natural selection." },
        { id: "p_a_s3", text: "Today, a rapidly expanding multidisciplinary paradigm known as biomimetics—or biomimicry—seeks to reverse-engineer these time-tested biological strategies to solve acute anthropogenic challenges in engineering, architecture, and sustainable materials synthesis." },
        { id: "p_a_s4", text: "Popularized by biologist Janine Benyus in the late 1990s, the core ethos of biomimetics asserts that nature should be treated not as an inexhaustible warehouse of commodities to extract, but rather as an invaluable mentor of structural efficiency." },
      ],
    },
    {
      id: "B",
      sentences: [
        { id: "p_b_s1", text: "One of the most celebrated manifestations of architectural biomimicry is the Eastgate Centre, a mid-rise shopping and office complex located in Harare, Zimbabwe." },
        { id: "p_b_s2", text: "Designed by architect Mick Pearce in collaboration with Arup engineers, the edifice maintains a remarkably stable interior thermal climate without conventional air-conditioning systems." },
        { id: "p_b_s3", text: "Pearce drew inspiration directly from the subterranean architecture of indigenous Macrotermes bellicosus termite mounds." },
        { id: "p_b_s4", text: "These insects construct intricate vertical flues and convective chimney networks that constantly cycle warm air upward while drawing cooler subterranean drafts into the lower chambers." },
        { id: "p_b_s5", text: "By mimicking this passive convective venting mechanism, the Eastgate Centre consumes approximately 35% less energy than conventionally refrigerated buildings of comparable volume in southern Africa." },
      ],
    },
    {
      id: "C",
      sentences: [
        { id: "p_c_s1", text: "In the realm of materials science, the remarkable biomechanics of the gecko lizard have ignited revolutionary breakthroughs in dry adhesion technologies." },
        { id: "p_c_s2", text: "Unlike conventional synthetic glues that rely on chemical bonds or liquid matrices that degrade under temperature fluctuations, geckos scale perpendicular glass walls via millions of microscopic keratinous setae on their foot pads." },
        { id: "p_c_s3", text: "Each seta branches into hundreds of nanoscale spatulae that come into such intimate proximity with surfaces that intermolecular van der Waals forces are spontaneously activated." },
        { id: "p_c_s4", text: "Engineers at Stanford and DARPA have successfully manufactured synthetic micro-patterned elastomer adhesives replicating this geometry." },
        { id: "p_c_s5", text: "These reversible bio-inspired dry adhesives have enabled wall-climbing autonomous reconnaissance robots and gentle grasping mechanisms for delicate orbital satellite repairs in the vacuum of space." },
      ],
    },
    {
      id: "D",
      sentences: [
        { id: "p_d_s1", text: "Fluid dynamics and industrial aerodynamics have similarly witnessed profound disruptions inspired by pelagic marine life." },
        { id: "p_d_s2", text: "The humpback whale (Megaptera novaeangliae), despite weighing upwards of 30 metric tons, exhibits extraordinary acrobatic agility when executing tight underwater turns while hunting krill." },
        { id: "p_d_s3", text: "Biologists discovered that this agility stems from prominent bumpy nodules, termed tubercles, arrayed along the leading edge of the whale's pectoral flippers." },
        { id: "p_d_s4", text: "Wind tunnel experiments revealed that these tubercles channel airflow into localized high-velocity streams, delaying aerodynamic stall and maintaining lift at steep angles of attack." },
        { id: "p_d_s5", text: "Aeronautical firms implementing scalloped tubercle profiles on commercial wind turbine blades have recorded a 32% reduction in turbulent aerodynamic drag and a corresponding 20% increase in electrical power generation during low-speed wind regimes." },
      ],
    },
    {
      id: "E",
      sentences: [
        { id: "p_e_s1", text: "Surface engineering has achieved substantial advancements through the investigation of botanical micro-topography, most prominently exemplified by the sacred lotus (Nelumbo nucifera)." },
        { id: "p_e_s2", text: "The leaves of the lotus plant exhibit an exceptional property termed superhydrophobicity, colloquially known as the 'Lotus Effect'." },
        { id: "p_e_s3", text: "Under scanning electron microscopy, the leaf surface reveals a dense forest of microscopic epidermal papillae coated with hydrophobic epicuticular wax crystals." },
        { id: "p_e_s4", text: "Water droplets falling onto the surface are unable to spread; instead, they maintain a nearly spherical contact angle exceeding 150 degrees, rolling off effortlessly while collecting extraneous dirt particles, fungal spores, and pollutants." },
        { id: "p_e_s5", text: "Industrial chemists have commercialized self-cleaning exterior facade paints, non-staining textiles, and self-washing solar panel glass coatings modeled directly upon this hierarchical roughness." },
      ],
    },
    {
      id: "F",
      sentences: [
        { id: "p_f_s1", text: "Notwithstanding these successes, bridging the transition from biological prototype to economically viable industrial manufacturing remains fraught with formidable technological bottlenecks." },
        { id: "p_f_s2", text: "Nature synthesizes complex hierarchical composites at ambient temperatures using benign aqueous chemistries and universally abundant elements." },
        { id: "p_f_s3", text: "In stark contrast, modern anthropogenic fabrication processes frequently require high-temperature smelting, toxic solvents, and energy-intensive cleanrooms." },
        { id: "p_f_s4", text: "Furthermore, replicating cellular self-assembly at metric-ton scale poses severe cost constraints that prevent many promising laboratory biomimetic prototypes from reaching commercial fruition." },
        { id: "p_f_s5", text: "Nonetheless, as computational nanofabrication and generative molecular modeling mature, biomimetics is poised to become the cornerstone of twenty-first-century sustainable industrial design." },
      ],
    },
  ],
  questions: [
    // 1-5: True / False / Not Given
    {
      id: "q_01",
      number: 1,
      type: "tfng",
      prompt: "Janine Benyus argued that human industries should view nature primarily as an endless repository of raw resources.",
      correctAnswer: "FALSE",
      evidenceParagraphId: "A",
      evidenceSentenceId: "p_a_s4",
      evidenceSentenceText: "Popularized by biologist Janine Benyus in the late 1990s, the core ethos of biomimetics asserts that nature should be treated not as an inexhaustible warehouse of commodities to extract, but rather as an invaluable mentor of structural efficiency.",
      paraphrasePairs: [
        { questionPhrase: "primarily as an endless repository of raw resources", passagePhrase: "not as an inexhaustible warehouse of commodities to extract, but rather as an invaluable mentor", strategy: "Negative of Opposite & Direct Contradiction" },
      ],
      explanation: "Đoạn A khẳng định quan điểm của Janine Benyus là: 'nature should be treated NOT as an inexhaustible warehouse of commodities to extract' (thiên nhiên KHÔNG phải là kho hàng vô tận để khai thác). Do đó khẳng định trong câu hỏi trái ngược trực tiếp với bài đọc -> FALSE.",
      isParaphraseTrap: true,
    },
    {
      id: "q_02",
      number: 2,
      type: "tfng",
      prompt: "The Eastgate Centre in Zimbabwe operates entirely without standard electrical cooling equipment.",
      correctAnswer: "TRUE",
      evidenceParagraphId: "B",
      evidenceSentenceId: "p_b_s2",
      evidenceSentenceText: "Designed by architect Mick Pearce in collaboration with Arup engineers, the edifice maintains a remarkably stable interior thermal climate without conventional air-conditioning systems.",
      paraphrasePairs: [
        { questionPhrase: "operates entirely without standard electrical cooling equipment", passagePhrase: "maintains a remarkably stable interior thermal climate without conventional air-conditioning systems", strategy: "Direct Synonym (standard electrical cooling = conventional air-conditioning)" },
      ],
      explanation: "Đoạn B chỉ rõ: tòa nhà duy trì nhiệt độ ổn định mà 'without conventional air-conditioning systems' (không có hệ thống điều hòa không khí truyền thống) -> TRUE.",
      isParaphraseTrap: false,
    },
    {
      id: "q_03",
      number: 3,
      type: "tfng",
      prompt: "Synthetic gecko-inspired adhesives lose their gripping strength when subjected to zero-gravity environments.",
      correctAnswer: "FALSE",
      evidenceParagraphId: "C",
      evidenceSentenceId: "p_c_s5",
      evidenceSentenceText: "These reversible bio-inspired dry adhesives have enabled wall-climbing autonomous reconnaissance robots and gentle grasping mechanisms for delicate orbital satellite repairs in the vacuum of space.",
      paraphrasePairs: [
        { questionPhrase: "lose their gripping strength when subjected to zero-gravity", passagePhrase: "enabled gentle grasping mechanisms for delicate orbital satellite repairs in the vacuum of space", strategy: "Direct Contradiction" },
      ],
      explanation: "Đoạn C khẳng định loại keo này đã cho phép các cơ chế kẹp nắm hoạt động hiệu quả khi sửa chữa vệ tinh trong môi trường chân không của vũ trụ ('vacuum of space'), do đó nó không hề mất lực dính -> FALSE.",
      isParaphraseTrap: true,
    },
    {
      id: "q_04",
      number: 4,
      type: "tfng",
      prompt: "The bumps on humpback whale flippers were first discovered through satellite tracking devices.",
      correctAnswer: "NOT GIVEN",
      evidenceParagraphId: "D",
      evidenceSentenceId: "p_d_s3",
      evidenceSentenceText: "Biologists discovered that this agility stems from prominent bumpy nodules, termed tubercles, arrayed along the leading edge of the whale's pectoral flippers.",
      paraphrasePairs: [
        { questionPhrase: "first discovered through satellite tracking devices", passagePhrase: "Biologists discovered that this agility stems from prominent bumpy nodules", strategy: "Absence of specific methodology information" },
      ],
      explanation: "Đoạn D có đề cập đến việc các nhà sinh học phát hiện ra các nốt sần (tubercles), nhưng hoàn toàn KHÔNG nhắc đến việc phát hiện này có phải thông qua thiết bị theo dõi vệ tinh (satellite tracking) hay không -> NOT GIVEN.",
      isParaphraseTrap: true,
    },
    {
      id: "q_05",
      number: 5,
      type: "tfng",
      prompt: "Lotus leaves are capable of cleansing themselves because water forms beads that roll across the surface.",
      correctAnswer: "TRUE",
      evidenceParagraphId: "E",
      evidenceSentenceId: "p_e_s4",
      evidenceSentenceText: "Water droplets falling onto the surface are unable to spread; instead, they maintain a nearly spherical contact angle exceeding 150 degrees, rolling off effortlessly while collecting extraneous dirt particles, fungal spores, and pollutants.",
      paraphrasePairs: [
        { questionPhrase: "cleansing themselves", passagePhrase: "collecting extraneous dirt particles, fungal spores, and pollutants", strategy: "Paraphrase of Mechanism (self-cleaning)" },
        { questionPhrase: "forms beads that roll across", passagePhrase: "maintain a nearly spherical contact angle... rolling off effortlessly", strategy: "Direct Description Synonym (beads = spherical droplets)" },
      ],
      explanation: "Đoạn E mô tả giọt nước duy trì góc tiếp xúc hình cầu (spherical), lăn đi dễ dàng và cuốn theo bụi bẩn, chất ô nhiễm, tạo nên khả năng tự làm sạch -> TRUE.",
      isParaphraseTrap: false,
    },

    // 6-9: Matching Information (Which paragraph contains the following info)
    {
      id: "q_06",
      number: 6,
      type: "matching_info",
      prompt: "An explanation of why natural synthesis is more environmentally sustainable than human factory methods.",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "F",
      evidenceParagraphId: "F",
      evidenceSentenceId: "p_f_s2",
      evidenceSentenceText: "Nature synthesizes complex hierarchical composites at ambient temperatures using benign aqueous chemistries and universally abundant elements.",
      paraphrasePairs: [
        { questionPhrase: "more environmentally sustainable", passagePhrase: "at ambient temperatures using benign aqueous chemistries and universally abundant elements", strategy: "Conceptual Generalization to Technical Attributes" },
        { questionPhrase: "human factory methods", passagePhrase: "modern anthropogenic fabrication processes", strategy: "Direct Academic Synonym" },
      ],
      explanation: "Đoạn F so sánh phương thức tự nhiên (ở nhiệt độ môi trường, dung môi nước lành tính) với các quy trình công nghiệp của con người (nhiệt độ cao, dung môi độc hại) -> Đoạn F.",
      isParaphraseTrap: false,
    },
    {
      id: "q_07",
      number: 7,
      type: "matching_info",
      prompt: "A reference to microscopic physical structures that interact without chemical bonding.",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "C",
      evidenceParagraphId: "C",
      evidenceSentenceId: "p_c_s3",
      evidenceSentenceText: "Each seta branches into hundreds of nanoscale spatulae that come into such intimate proximity with surfaces that intermolecular van der Waals forces are spontaneously activated.",
      paraphrasePairs: [
        { questionPhrase: "microscopic physical structures", passagePhrase: "hundreds of nanoscale spatulae / microscopic keratinous setae", strategy: "Synonym Replacement" },
        { questionPhrase: "without chemical bonding", passagePhrase: "Unlike conventional synthetic glues that rely on chemical bonds... van der Waals forces", strategy: "Contrast Explanation" },
      ],
      explanation: "Đoạn C nói về cấu trúc lông chân tắc kè với hàng triệu sợi setae và spatulae kích hoạt lực van der Waals mà không cần liên kết hóa học -> Đoạn C.",
      isParaphraseTrap: false,
    },
    {
      id: "q_08",
      number: 8,
      type: "matching_info",
      prompt: "Statistical evidence of energy efficiency gains in power-generating equipment.",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "D",
      evidenceParagraphId: "D",
      evidenceSentenceId: "p_d_s5",
      evidenceSentenceText: "Aeronautical firms implementing scalloped tubercle profiles on commercial wind turbine blades have recorded a 32% reduction in turbulent aerodynamic drag and a corresponding 20% increase in electrical power generation during low-speed wind regimes.",
      paraphrasePairs: [
        { questionPhrase: "Statistical evidence of energy efficiency gains", passagePhrase: "recorded a 32% reduction in turbulent aerodynamic drag and a corresponding 20% increase in electrical power generation", strategy: "Number/Percentage Data Paraphrase" },
        { questionPhrase: "power-generating equipment", passagePhrase: "commercial wind turbine blades", strategy: "Category Exemplification" },
      ],
      explanation: "Đoạn D đưa ra số liệu thống kê: giảm 32% lực cản khí động và tăng 20% sản lượng phát điện ở tuabin gió -> Đoạn D.",
      isParaphraseTrap: false,
    },
    {
      id: "q_09",
      number: 9,
      type: "matching_info",
      prompt: "The historical originator of the terminology and philosophical approach behind natural emulation.",
      options: ["A", "B", "C", "D", "E", "F"],
      correctAnswer: "A",
      evidenceParagraphId: "A",
      evidenceSentenceId: "p_a_s4",
      evidenceSentenceText: "Popularized by biologist Janine Benyus in the late 1990s, the core ethos of biomimetics asserts that nature should be treated not as an inexhaustible warehouse of commodities to extract, but rather as an invaluable mentor of structural efficiency.",
      paraphrasePairs: [
        { questionPhrase: "historical originator of the terminology", passagePhrase: "Popularized by biologist Janine Benyus in the late 1990s", strategy: "Biographical Context Paraphrase" },
        { questionPhrase: "philosophical approach behind natural emulation", passagePhrase: "the core ethos of biomimetics... nature as an invaluable mentor", strategy: "Nominalization & Meaning Equivalence" },
      ],
      explanation: "Đoạn A giới thiệu nhà sinh vật học Janine Benyus vào cuối thập niên 1990 là người phổ biến thuật ngữ và triết lý coi tự nhiên là người thầy -> Đoạn A.",
      isParaphraseTrap: false,
    },

    // 10-13: Summary Completion (NO MORE THAN TWO WORDS)
    {
      id: "q_10",
      number: 10,
      type: "summary_completion",
      prompt: "The Eastgate Centre maintains comfortable internal temperatures by replicating the cooling ducts found in [ ____________ ] mounds.",
      wordLimit: "NO MORE THAN TWO WORDS",
      correctAnswer: "termite",
      evidenceParagraphId: "B",
      evidenceSentenceId: "p_b_s3",
      evidenceSentenceText: "Pearce drew inspiration directly from the subterranean architecture of indigenous Macrotermes bellicosus termite mounds.",
      paraphrasePairs: [
        { questionPhrase: "replicating the cooling ducts found in", passagePhrase: "drew inspiration directly from the subterranean architecture of indigenous... termite mounds", strategy: "Sentence Reversal & Synonym" },
      ],
      explanation: "Đoạn B ghi rõ: 'indigenous Macrotermes bellicosus termite mounds' -> Từ cần điền là 'termite' (hoặc 'termite mounds', nhưng đề bài đã có chữ mounds nên đáp án chính xác là 'termite').",
      isParaphraseTrap: false,
    },
    {
      id: "q_11",
      number: 11,
      type: "summary_completion",
      prompt: "Gecko feet cling to smooth vertical surfaces due to spontaneous attraction generated by [ ____________ ] forces.",
      wordLimit: "NO MORE THAN TWO WORDS",
      correctAnswer: "van der Waals",
      evidenceParagraphId: "C",
      evidenceSentenceId: "p_c_s3",
      evidenceSentenceText: "Each seta branches into hundreds of nanoscale spatulae that come into such intimate proximity with surfaces that intermolecular van der Waals forces are spontaneously activated.",
      paraphrasePairs: [
        { questionPhrase: "spontaneous attraction generated by", passagePhrase: "intermolecular van der Waals forces are spontaneously activated", strategy: "Active to Passive Voice Transformation" },
      ],
      explanation: "Đoạn C chỉ ra lực hút phân tử là 'van der Waals forces' -> Đáp án: 'van der Waals'.",
      isParaphraseTrap: false,
    },
    {
      id: "q_12",
      number: 12,
      type: "summary_completion",
      prompt: "Adding whale-inspired nodules to wind turbines substantially decreases turbulent aerodynamic [ ____________ ].",
      wordLimit: "NO MORE THAN TWO WORDS",
      correctAnswer: "drag",
      evidenceParagraphId: "D",
      evidenceSentenceId: "p_d_s5",
      evidenceSentenceText: "Aeronautical firms implementing scalloped tubercle profiles on commercial wind turbine blades have recorded a 32% reduction in turbulent aerodynamic drag...",
      paraphrasePairs: [
        { questionPhrase: "substantially decreases", passagePhrase: "recorded a 32% reduction in", strategy: "Verb to Noun Transformation (decrease = reduction)" },
      ],
      explanation: "Đoạn D nêu: 'recorded a 32% reduction in turbulent aerodynamic drag' -> Từ cần điền là 'drag'.",
      isParaphraseTrap: false,
    },
    {
      id: "q_13",
      number: 13,
      type: "summary_completion",
      prompt: "The self-cleaning capability of lotus leaves has been utilized by chemists to develop innovative [ ____________ ] for solar equipment.",
      wordLimit: "NO MORE THAN TWO WORDS",
      correctAnswer: "glass coatings",
      evidenceParagraphId: "E",
      evidenceSentenceId: "p_e_s5",
      evidenceSentenceText: "Industrial chemists have commercialized self-cleaning exterior facade paints, non-staining textiles, and self-washing solar panel glass coatings modeled directly upon this hierarchical roughness.",
      paraphrasePairs: [
        { questionPhrase: "utilized by chemists to develop innovative", passagePhrase: "Industrial chemists have commercialized", strategy: "Synonym Replacement" },
        { questionPhrase: "for solar equipment", passagePhrase: "solar panel glass coatings", strategy: "Prepositional Phrase Conversion" },
      ],
      explanation: "Đoạn E nêu: 'self-washing solar panel glass coatings' -> Từ điền vào sau solar equipment là 'glass coatings' (hoặc 'coatings').",
      isParaphraseTrap: false,
    },
  ],
};
