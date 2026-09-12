export interface ReadingParagraph {
  id: string;
  label: string; // "A", "B", "C", "D"
  content: string;
}

export interface ReadingQuestion {
  id: string;
  order: number;
  type: "multiple_choice" | "true_false_not_given" | "sentence_completion";
  questionText: string;
  options?: string[]; // For multiple choice or T/F/NG
  correctAnswer: string;
  evidenceParagraphId: string;
  evidenceQuote: string;
  deepExplanation: string;
  trapType: string;
}

export interface ReadingPassageData {
  id: string;
  title: string;
  subtitle: string;
  category: "Environment & Clean Energy" | "Technology & Society" | "Education & Psychology";
  estimatedMinutes: number;
  wordCount: number;
  paragraphs: ReadingParagraph[];
  questions: ReadingQuestion[];
}

export const MOCK_READING_PASSAGE: ReadingPassageData = {
  id: "reading_passage_01",
  title: "Urban Decarbonization and the Transition to Clean Energy",
  subtitle: "Cambridge Academic Reading • Split-view Interactive Engine (Phase 1)",
  category: "Environment & Clean Energy",
  estimatedMinutes: 15,
  wordCount: 520,
  paragraphs: [
    {
      id: "p_a",
      label: "A",
      content:
        "The rapid expansion of metropolitan areas across the globe has precipitated unprecedented ecological strain, with urban centers now accounting for more than seventy percent of global carbon emissions. Driven predominantly by heating, vehicular transportation, and industrial manufacturing, this relentless reliance on fossil fuels exerts a detrimental impact on atmospheric stability. Consequently, contemporary urban planners are compelled to implement comprehensive decarbonization strategies to mitigate long-term climate vulnerabilities.",
    },
    {
      id: "p_b",
      label: "B",
      content:
        "At the vanguard of this green revolution is the deployment of decentralized renewable energy infrastructure. Recent technological breakthroughs in photovoltaic solar cells and floating offshore wind installations have substantially altered the economic landscape. Empirical data demonstrates that next-generation solar arrays achieve significantly higher energy conversion efficiencies while requiring fewer rare mineral resources. By decentralizing electricity generation and integrating rooftop panels into residential architectures, municipalities can substantially diminish their carbon footprint without destabilizing existing regional power grids.",
    },
    {
      id: "p_c",
      label: "C",
      content:
        "Nevertheless, the transition towards a carbon-neutral paradigm is frequently obstructed by fiscal and regulatory inertia. Although direct financial subsidies for fossil fuels have gradually diminished in several OECD nations, numerous developing economies still maintain substantial economic support for domestic coal industries to safeguard short-term employment. Environmental economists establish that without a standardized global carbon pricing mechanism, clean energy alternatives will struggle to compete on a genuinely equitable playing field.",
    },
    {
      id: "p_d",
      label: "D",
      content:
        "A further critical bottleneck resides in the intermittent nature of solar and wind generation. Because power output fluctuates according to meteorological conditions, municipal power networks require resilient high-capacity battery storage systems. Grid modernization is paramount to absorb sudden power surges and prevent acute overloads during peak consumption hours. Engineers and urban policy architects must collaborate closely to guarantee that future smart grids remain both commercially viable and environmentally sustainable.",
    },
  ],
  questions: [
    {
      id: "q_01",
      order: 1,
      type: "multiple_choice",
      questionText:
        "According to Paragraph B, what primary advantage do next-generation photovoltaic solar arrays offer?",
      options: [
        "A. They eliminate the requirement for municipal power networks entirely.",
        "B. They deliver superior energy conversion rates while utilizing fewer rare minerals.",
        "C. They generate floating electricity across offshore platforms exclusively.",
        "D. They are subsidized by international coal trade agreements.",
      ],
      correctAnswer: "B. They deliver superior energy conversion rates while utilizing fewer rare minerals.",
      evidenceParagraphId: "p_b",
      evidenceQuote:
        "Empirical data demonstrates that next-generation solar arrays achieve significantly higher energy conversion efficiencies while requiring fewer rare mineral resources.",
      deepExplanation:
        "Câu B paraphrase hoàn hảo cụm từ 'achieve significantly higher energy conversion efficiencies while requiring fewer rare mineral resources' thành 'deliver superior energy conversion rates while utilizing fewer rare minerals'. Câu A dính bẫy từ tuyệt đối 'entirely'.",
      trapType: "Paraphrase & Absolute Word Trap",
    },
    {
      id: "q_02",
      order: 2,
      type: "true_false_not_given",
      questionText:
        "Governments across all developing countries have completely abolished domestic coal subsidies.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "FALSE",
      evidenceParagraphId: "p_c",
      evidenceQuote:
        "numerous developing economies still maintain substantial economic support for domestic coal industries to safeguard short-term employment.",
      deepExplanation:
        "Thông tin trong bài khẳng định nhiều nền kinh tế đang phát triển 'vẫn duy trì hỗ trợ kinh tế đáng kể' (still maintain substantial economic support), mâu thuẫn trực tiếp với mệnh đề 'have completely abolished' (đã xóa bỏ hoàn toàn). Do đó đáp án chuẩn xác là FALSE.",
      trapType: "Contradiction Trap (False vs Not Given)",
    },
    {
      id: "q_03",
      order: 3,
      type: "sentence_completion",
      questionText:
        "Upgrading and modernizing the power grid is essential to absorb surges and prevent severe _________ during peak hours.",
      options: ["overloads", "subsidies", "emissions", "architectures"],
      correctAnswer: "overloads",
      evidenceParagraphId: "p_d",
      evidenceQuote:
        "Grid modernization is paramount to absorb sudden power surges and prevent acute overloads during peak consumption hours.",
      deepExplanation:
        "Từ cần điền là 'overloads'. Đoạn D sử dụng cấu trúc tương đương: 'prevent acute overloads' = 'prevent severe overloads'.",
      trapType: "Synonym Match & Collocation",
    },
  ],
};
