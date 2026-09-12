/**
 * Mock Task 2 Academic Paragraphs Dataset for Theme-Rheme & Mechanical Linker Drills
 * Demonstrates mechanical linker traps vs Band 8.5 seamless invisible cohesion.
 */

export interface CohesionDrillItem {
  id: string;
  topicTitle: string;
  promptQuestion: string;
  essayParagraphType: "Body 1 (Causes / Advantages)" | "Body 2 (Solutions / Counter-arguments)";
  currentBandCC: string;
  originalParagraph: string;
  band8RewrittenParagraph: string;
  pedagogicalAnalysis: string;
  mechanicalLinkersDetected: string[];
  progressionModelDescription: string;
}

export const MOCK_COHESION_DRILLS: CohesionDrillItem[] = [
  {
    id: "cohesion_drill_01",
    topicTitle: "Urban Traffic Congestion & Public Transportation Subsidies",
    promptQuestion: "Some people believe that the best way to solve traffic congestion in cities is to provide free public transport. To what extent do you agree or disagree?",
    essayParagraphType: "Body 1 (Causes / Advantages)",
    currentBandCC: "Band 6.0 (Mechanical Cohesive Devices Trap)",
    originalParagraph:
      "Firstly, providing free public transport encourages commuters to leave their private vehicles at home. Secondly, this shift leads to a noticeable reduction in vehicular exhaust emissions. Furthermore, fewer private cars on municipal roads alleviate chronic bottlenecks during peak rush hours. In addition, the government can save substantial funds on asphalt road maintenance.",
    band8RewrittenParagraph:
      "Eliminating public transport fares creates an immediate economic incentive for daily commuters to abandon private automobiles. This modal shift naturally precipitates a marked reduction in vehicular exhaust emissions, while simultaneously alleviating chronic bottlenecks across municipal road networks. Consequently, local authorities can redirect maintenance expenditures toward modernizing transit infrastructure.",
    pedagogicalAnalysis:
      "Đoạn văn gốc bắt đầu 100% câu bằng các liên từ cơ học 'Firstly, Secondly, Furthermore, In addition'. Giám khảo trừ điểm CC xuống Band 6.0. Bản viết lại Band 8.5 sử dụng 'This modal shift' (Summary Nominalization) và '..., while simultaneously alleviating...' (Participial Flow) để tạo liên kết vô hình.",
    mechanicalLinkersDetected: ["firstly", "secondly", "furthermore", "in addition"],
    progressionModelDescription: "Chuyển hóa từ chuỗi liên từ máy móc sang Tiến trình Bậc thang (Linear Progression: T1->R1 => T2(=R1)->R2).",
  },
  {
    id: "cohesion_drill_02",
    topicTitle: "Artificial Intelligence & Technological Unemployment",
    promptQuestion: "The rapid development of artificial intelligence will lead to mass unemployment. Do the disadvantages outweigh the advantages?",
    essayParagraphType: "Body 2 (Solutions / Counter-arguments)",
    currentBandCC: "Band 5.5 (Broken Cohesion & Topic Leaps)",
    originalParagraph:
      "Automation threatens routine blue-collar occupations. Medical researchers are developing sophisticated machine learning diagnostics. Furthermore, governments should implement universal basic income schemes. In conclusion, retraining workers is extremely expensive.",
    band8RewrittenParagraph:
      "While automation indisputably threatens routine manual occupations, technological disruption concurrently spurs demand for specialized high-tier skillsets. To buffer the socioeconomic friction caused by this transition, governments must institute comprehensive vocational reskilling programs. Such proactive policy interventions ensure that displaced laborers remain economically viable in an AI-driven economy.",
    pedagogicalAnalysis:
      "Đoạn văn gốc bị đứt gãy mạch hoàn toàn (Cohesion Breakpoints): câu 1 nói về công nhân, câu 2 nhảy cóc sang y tế, câu 3 nhảy sang thu nhập cơ bản UBI. Bản viết lại Band 8.5 tạo chuỗi khái niệm đồng quy: 'technological disruption' -> 'this transition' -> 'Such proactive policy interventions'.",
    mechanicalLinkersDetected: ["furthermore", "in conclusion"],
    progressionModelDescription: "Hàn gắn các điểm gãy mạch bằng Tiến trình Đồng trục (Constant Theme: Quản trị quá trình chuyển đổi lao động).",
  },
  {
    id: "cohesion_drill_03",
    topicTitle: "Renewable Energy Transition & Grid Modernization",
    promptQuestion: "Fossil fuels should be completely replaced by renewable energy sources within the next decade. Discuss both views.",
    essayParagraphType: "Body 1 (Causes / Advantages)",
    currentBandCC: "Band 8.5 (Masterpiece Invisible Cohesion)",
    originalParagraph:
      "The rapid decentralization of renewable energy architectures poses profound technical hurdles for legacy power grids. These traditional distribution networks, originally engineered for predictable baseload power from coal turbines, struggle to accommodate the stochastic fluctuations inherent in solar and wind generation. To mitigate this intermittency dilemma, municipal grid operators are deploying utility-scale lithium-iron-phosphate battery arrays, thereby stabilizing regional voltage frequencies during unexpected demand surges.",
    band8RewrittenParagraph:
      "The rapid decentralization of renewable energy architectures poses profound technical hurdles for legacy power grids. These traditional distribution networks, originally engineered for predictable baseload power from coal turbines, struggle to accommodate the stochastic fluctuations inherent in solar and wind generation. To mitigate this intermittency dilemma, municipal grid operators are deploying utility-scale lithium-iron-phosphate battery arrays, thereby stabilizing regional voltage frequencies during unexpected demand surges.",
    pedagogicalAnalysis:
      "Đoạn văn hoàn hảo đạt Band 9.0 tiêu chí Coherence & Cohesion: 'legacy power grids' ở Rheme 1 trở thành Theme 2 'These traditional distribution networks'. Tiếp theo, 'stochastic fluctuations' ở Rheme 2 được tóm tắt thành 'this intermittency dilemma' ở Theme 3, kết thúc bằng mệnh đề phân từ 'thereby stabilizing...'.",
    mechanicalLinkersDetected: [],
    progressionModelDescription: "Tiến trình Bậc thang Thuần khiết (Pure Linear Progression) với 100% liên kết vô hình qua Đại từ Quy chiếu.",
  },
];
