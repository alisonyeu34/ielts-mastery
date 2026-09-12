export interface Task1DataPoint {
  year: number;
  value: number;
}

export interface Task1LineSeries {
  name: string;
  color: string;
  data: Task1DataPoint[];
}

export interface Task1BarItem {
  category: string;
  year2010: number;
  year2020: number;
}

export interface Task1PieSector {
  sector: string;
  percentage: number;
  color: string;
}

export interface Task1PieGroup {
  region: string;
  data: Task1PieSector[];
}

export interface KeyFeatureItem {
  id: string;
  text: string;
  isKeyFeature: boolean;
  category: "extreme" | "overall_trend" | "anomaly_crossing" | "minor_detail";
  feedbackVi: string;
}

export interface TrendExercise {
  id: string;
  verbSentence: string;
  targetSubject: string;
  expectedNounPhrase: string;
  explanationVi: string;
}

export interface PrepositionExercise {
  id: string;
  sentencePrefix: string;
  sentenceSuffix: string;
  targetPrep: "by" | "to" | "at" | "of";
  options: ("by" | "to" | "at" | "of")[];
  explanationVi: string;
}

export interface Task1Prompt {
  id: string;
  title: string;
  chartType: "line" | "bar" | "pie";
  prompt: string;
  unit: string;
  timePeriod: string;
  lineSeries?: Task1LineSeries[];
  barSeries?: Task1BarItem[];
  pieGroups?: Task1PieGroup[];
  spotlightPoints?: { x: number; y: number; label: string }[];
  keyFeatures: KeyFeatureItem[];
  modelIntroduction: string;
  modelOverview: string;
  modelBody1: string;
  modelBody2: string;
  modelFullEssay: string;
  trendExercises: TrendExercise[];
  prepositionExercises: PrepositionExercise[];
}

export const MOCK_TASK1_PROMPTS: Task1Prompt[] = [
  {
    id: "task1_line_energy",
    title: "Đề 1: Mức Tiêu Thụ Năng Lượng Châu Âu (1980 - 2020)",
    chartType: "line",
    prompt:
      "The graph below shows the consumption of 4 different energy sources (Petroleum, Natural Gas, Coal, Nuclear) in a European nation from 1980 to 2020.",
    unit: "Million Tonnes of Oil Equivalent (Mtoe)",
    timePeriod: "1980 - 2020 (40-year period)",
    lineSeries: [
      {
        name: "Petroleum",
        color: "#06b6d4", // Cyan
        data: [
          { year: 1980, value: 35 },
          { year: 1990, value: 40 },
          { year: 2000, value: 48 },
          { year: 2010, value: 46 },
          { year: 2020, value: 44 },
        ],
      },
      {
        name: "Natural Gas",
        color: "#10b981", // Emerald
        data: [
          { year: 1980, value: 20 },
          { year: 1990, value: 24 },
          { year: 2000, value: 31 },
          { year: 2010, value: 36 },
          { year: 2020, value: 42 },
        ],
      },
      {
        name: "Coal",
        color: "#f59e0b", // Amber
        data: [
          { year: 1980, value: 28 },
          { year: 1990, value: 26 },
          { year: 2000, value: 22 },
          { year: 2010, value: 18 },
          { year: 2020, value: 14 },
        ],
      },
      {
        name: "Nuclear",
        color: "#f43f5e", // Rose
        data: [
          { year: 1980, value: 4 },
          { year: 1990, value: 8 },
          { year: 2000, value: 12 },
          { year: 2010, value: 16 },
          { year: 2020, value: 19 },
        ],
      },
    ],
    spotlightPoints: [
      { x: 2000, y: 48, label: "Đỉnh Petroleum (48 Mtoe)" },
      { x: 1980, y: 4, label: "Đáy Nuclear (4 Mtoe)" },
      { x: 1995, y: 25, label: "Điểm giao cắt Natural Gas vượt Coal (~1995)" },
    ],
    keyFeatures: [
      {
        id: "kf_1",
        text: "Petroleum giữ vị thế nhiên liệu được tiêu thụ nhiều nhất trong suốt giai đoạn dù có xu hướng chững lại về cuối kỳ.",
        isKeyFeature: true,
        category: "extreme",
        feedbackVi: "Chính xác! Đây là đặc điểm cực trị thống trị (Highest fuel source throughout the timeline) cực kỳ then chốt cho Overview.",
      },
      {
        id: "kf_2",
        text: "Natural Gas và Nuclear ghi nhận xu hướng gia tăng liên tục, trong đó Natural Gas tăng trưởng mạnh nhất.",
        isKeyFeature: true,
        category: "overall_trend",
        feedbackVi: "Tuyệt vời! Đây là xu hướng chung tăng trưởng (Upward trajectory), phản ánh sự chuyển dịch sang năng lượng sạch hơn.",
      },
      {
        id: "kf_3",
        text: "Coal là nguồn năng lượng duy nhất chứng kiến sự sụt giảm bền vững từ vị trí thứ hai xuống gần chạm đáy.",
        isKeyFeature: true,
        category: "overall_trend",
        feedbackVi: "Rất chuẩn! Xu hướng đối nghịch duy nhất (Contrasting downward trend) giúp tạo câu so sánh 'whereas/while' hoàn hảo.",
      },
      {
        id: "kf_4",
        text: "Năm 1990 lượng tiêu thụ Petroleum tăng đúng 5 Mtoe so với năm 1980.",
        isKeyFeature: false,
        category: "minor_detail",
        feedbackVi: "Bẫy chi tiết vụn vặt! Số liệu cụ thể từng năm chỉ được đưa vào Body paragraphs, đưa vào Overview sẽ bị trừ điểm Task Achievement.",
      },
      {
        id: "kf_5",
        text: "Nuclear tiêu thụ đạt chính xác 16 Mtoe vào năm 2010.",
        isKeyFeature: false,
        category: "minor_detail",
        feedbackVi: "Bẫy số liệu đơn lẻ! Không có giá trị khái quát toàn cảnh biểu đồ.",
      },
      {
        id: "kf_6",
        text: "Khoảng giữa thập niên 1990, lượng tiêu thụ Natural Gas đã chính thức vượt qua Coal.",
        isKeyFeature: true,
        category: "anomaly_crossing",
        feedbackVi: "Chính xác! Điểm giao cắt (Crossing point) phản ánh bước ngoặt cơ cấu năng lượng.",
      },
    ],
    modelIntroduction:
      "The line graph illustrates the consumption levels of four distinct fuel sources in a particular European country between 1980 and 2020, measured in million tonnes of oil equivalent (Mtoe).",
    modelOverview:
      "Overall, what stands out from the graph is that petroleum remained the predominant source of energy throughout the 40-year period, despite a slight decline in later years. Additionally, while natural gas and nuclear power exhibited pronounced upward trajectories, coal was the only fuel type to experience a sustained downward trend.",
    modelBody1:
      "Looking first at the rising fuel categories, petroleum consumption commenced at 35 Mtoe in 1980 before climbing steadily to a peak of 48 Mtoe in 2000. It subsequently experienced a marginal drop, finishing at 44 Mtoe by 2020. In stark contrast, natural gas demonstrated the most substantial expansion, surging from 20 Mtoe in 1980 to 42 Mtoe at the end of the timeframe, thereby eclipsing coal and closing the gap with petroleum.",
    modelBody2:
      "Turning to the remaining energy sources, coal usage initially stood at 28 Mtoe, making it the second most consumed fuel in 1980. However, it underwent a relentless downturn, ultimately plummeting by 50% to 14 Mtoe in 2020. Conversely, nuclear energy, which started as the least utilized source at merely 4 Mtoe, saw an almost fivefold escalation to reach 19 Mtoe in the final year.",
    modelFullEssay:
      "The line graph illustrates the consumption levels of four distinct fuel sources in a particular European country between 1980 and 2020, measured in million tonnes of oil equivalent (Mtoe).\n\nOverall, what stands out from the graph is that petroleum remained the predominant source of energy throughout the 40-year period, despite a slight decline in later years. Additionally, while natural gas and nuclear power exhibited pronounced upward trajectories, coal was the only fuel type to experience a sustained downward trend.\n\nLooking first at the rising fuel categories, petroleum consumption commenced at 35 Mtoe in 1980 before climbing steadily to a peak of 48 Mtoe in 2000. It subsequently experienced a marginal drop, finishing at 44 Mtoe by 2020. In stark contrast, natural gas demonstrated the most substantial expansion, surging from 20 Mtoe in 1980 to 42 Mtoe at the end of the timeframe, thereby eclipsing coal and closing the gap with petroleum.\n\nTurning to the remaining energy sources, coal usage initially stood at 28 Mtoe, making it the second most consumed fuel in 1980. However, it underwent a relentless downturn, ultimately plummeting by 50% to 14 Mtoe in 2020. Conversely, nuclear energy, which started as the least utilized source at merely 4 Mtoe, saw an almost fivefold escalation to reach 19 Mtoe in the final year.",
    trendExercises: [
      {
        id: "tr_1",
        verbSentence: "Natural gas consumption increased significantly from 20 Mtoe to 42 Mtoe.",
        targetSubject: "Natural gas consumption witnessed...",
        expectedNounPhrase: "a significant increase",
        explanationVi: "Chuyển động từ + trạng từ 'increased significantly' sang cụm danh từ 'witnessed a significant increase'.",
      },
      {
        id: "tr_2",
        verbSentence: "Coal usage plummeted dramatically over the 40-year timeframe.",
        targetSubject: "Coal usage underwent...",
        expectedNounPhrase: "a dramatic plummet",
        explanationVi: "Chuyển 'plummeted dramatically' sang cụm danh từ 'underwent a dramatic plummet / drop'.",
      },
      {
        id: "tr_3",
        verbSentence: "Nuclear energy grew steadily from 4 Mtoe in 1980.",
        targetSubject: "There was...",
        expectedNounPhrase: "a steady growth",
        explanationVi: "Cấu trúc 'There was + a steady growth in nuclear energy...'.",
      },
    ],
    prepositionExercises: [
      {
        id: "prep_1",
        sentencePrefix: "Petroleum consumption commenced ",
        sentenceSuffix: " 35 Mtoe in 1980 before climbing to 48 Mtoe.",
        targetPrep: "at",
        options: ["at", "by", "to", "of"],
        explanationVi: "Dùng giới từ 'at' để chỉ mốc số liệu tại một thời điểm bắt đầu (commenced at / stood at 35 Mtoe).",
      },
      {
        id: "prep_2",
        sentencePrefix: "Coal consumption plummeted ",
        sentenceSuffix: " 14 Mtoe by the end of 2020.",
        targetPrep: "to",
        options: ["at", "by", "to", "of"],
        explanationVi: "Dùng 'to' để chỉ mốc đích đến của số liệu (rơi xuống chạm mốc 14 Mtoe).",
      },
      {
        id: "prep_3",
        sentencePrefix: "The figure for natural gas grew ",
        sentenceSuffix: " 22 Mtoe across the four decades.",
        targetPrep: "by",
        options: ["at", "by", "to", "of"],
        explanationVi: "Dùng 'by' để chỉ độ chênh lệch hoặc lượng gia tăng (tăng thêm 22 Mtoe = 42 - 20).",
      },
      {
        id: "prep_4",
        sentencePrefix: "There was a dramatic expansion ",
        sentenceSuffix: " 22 Mtoe in natural gas consumption.",
        targetPrep: "of",
        options: ["at", "by", "to", "of"],
        explanationVi: "Dùng 'an expansion / increase of [X]' khi đứng sau cụm danh từ chỉ mức độ thay đổi.",
      },
    ],
  },
  {
    id: "task1_bar_internet",
    title: "Đề 2: Tỷ Lệ Hộ Gia Đình Truy Cập Internet (2010 vs 2020)",
    chartType: "bar",
    prompt:
      "The bar chart compares the percentage of households with internet access across 5 different geographic regions in 2010 and 2020.",
    unit: "Percentage of households (%)",
    timePeriod: "2010 vs 2020",
    barSeries: [
      { category: "North America", year2010: 72, year2020: 91 },
      { category: "Western Europe", year2010: 68, year2020: 89 },
      { category: "East Asia", year2010: 52, year2020: 82 },
      { category: "Latin America", year2010: 34, year2020: 65 },
      { category: "Sub-Saharan Africa", year2010: 12, year2020: 38 },
    ],
    keyFeatures: [
      {
        id: "kf_b1",
        text: "Tất cả 5 khu vực đều chứng kiến sự gia tăng rõ rệt về tỷ lệ hộ gia đình có internet từ năm 2010 đến 2020.",
        isKeyFeature: true,
        category: "overall_trend",
        feedbackVi: "Rất chính xác! Xu hướng toàn diện (Uniform upward trend) là ý chính đầu tiên của Overview.",
      },
      {
        id: "kf_b2",
        text: "North America luôn dẫn đầu bảng xếp hạng trong khi Sub-Saharan Africa luôn ở vị trí thấp nhất.",
        isKeyFeature: true,
        category: "extreme",
        feedbackVi: "Xuất sắc! Cực trị cao nhất và thấp nhất (Highest vs Lowest) trong biểu đồ so sánh.",
      },
      {
        id: "kf_b3",
        text: "Latin America và Sub-Saharan Africa có tốc độ tăng trưởng tương đối vượt bậc, gần như gấp đôi/gấp ba.",
        isKeyFeature: true,
        category: "overall_trend",
        feedbackVi: "Tuyệt vời! Nhận diện được nhóm có tốc độ gia tăng nhanh nhất.",
      },
      {
        id: "kf_b4",
        text: "East Asia đạt đúng 52% vào năm 2010.",
        isKeyFeature: false,
        category: "minor_detail",
        feedbackVi: "Số liệu chi tiết đơn lẻ, chỉ phân tích trong Body.",
      },
    ],
    modelIntroduction:
      "The bar chart provides a comparison of household internet penetration rates in five distinct global regions in two separate years, 2010 and 2020.",
    modelOverview:
      "Overall, it is readily apparent that internet connectivity experienced widespread growth across all surveyed regions over the ten-year period. Furthermore, while North America and Western Europe maintained their positions with the highest proportions of connected households, Sub-Saharan Africa consistently recorded the lowest figures despite displaying the fastest relative acceleration.",
    modelBody1:
      "Looking first at the developed regions, North America had the highest proportion in 2010 at 72%, which subsequently rose to 91% by 2020. Similarly, Western Europe followed closely behind, expanding from 68% to 89% over the decade. East Asia also demonstrated significant progress, with internet access jumping from just over half (52%) to over four-fifths (82%) of households.",
    modelBody2:
      "Turning to the emerging regions, Latin America experienced an impressive surge, nearly doubling from 34% in 2010 to 65% in 2020. Lastly, although Sub-Saharan Africa remained at the bottom of the spectrum throughout the timeframe, its internet adoption more than tripled, soaring from a modest 12% to 38% by 2020.",
    modelFullEssay:
      "The bar chart provides a comparison of household internet penetration rates in five distinct global regions in two separate years, 2010 and 2020.\n\nOverall, it is readily apparent that internet connectivity experienced widespread growth across all surveyed regions over the ten-year period. Furthermore, while North America and Western Europe maintained their positions with the highest proportions of connected households, Sub-Saharan Africa consistently recorded the lowest figures despite displaying the fastest relative acceleration.\n\nLooking first at the developed regions, North America had the highest proportion in 2010 at 72%, which subsequently rose to 91% by 2020. Similarly, Western Europe followed closely behind, expanding from 68% to 89% over the decade. East Asia also demonstrated significant progress, with internet access jumping from just over half (52%) to over four-fifths (82%) of households.\n\nTurning to the emerging regions, Latin America experienced an impressive surge, nearly doubling from 34% in 2010 to 65% in 2020. Lastly, although Sub-Saharan Africa remained at the bottom of the spectrum throughout the timeframe, its internet adoption more than tripled, soaring from a modest 12% to 38% by 2020.",
    trendExercises: [
      {
        id: "tr_b1",
        verbSentence: "Internet access grew rapidly in Latin America.",
        targetSubject: "Latin America experienced...",
        expectedNounPhrase: "a rapid growth",
        explanationVi: "Chuyển 'grew rapidly' sang 'experienced a rapid growth'.",
      },
    ],
    prepositionExercises: [
      {
        id: "prep_b1",
        sentencePrefix: "Internet adoption jumped ",
        sentenceSuffix: " 30% to reach 82% in East Asia.",
        targetPrep: "by",
        options: ["at", "by", "to", "of"],
        explanationVi: "Dùng 'by' để chỉ mức chênh lệch tăng thêm 30% (82 - 52 = 30).",
      },
    ],
  },
];
