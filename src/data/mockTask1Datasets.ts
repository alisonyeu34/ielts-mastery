export interface ChartDataPoint {
  label: string; // e.g. "1990", "France"
  values: Record<string, number>; // Series name -> value
}

export interface ChartSeries {
  key: string;
  name: string;
  color: string;
}

export interface KeyFeatureItem {
  id: string;
  description: string;
  isKeyFeature: boolean;
  category: "starting_point" | "peak_trough" | "crossover" | "final_trend" | "minor_fluctuation";
  categoryVi: string;
  explanation: string;
}

export interface TrendVocabItem {
  id: string;
  category: "upward" | "downward" | "fluctuation" | "stability" | "comparison";
  verbAdverb: string;
  adjNoun: string;
  exampleSentence: string;
  vietnameseMeaning: string;
}

export interface Task1Dataset {
  id: string;
  chartType: "line" | "bar";
  title: string;
  prompt: string;
  unit: string;
  timeframe: string;
  yAxisMin: number;
  yAxisMax: number;
  yAxisStep: number;
  series: ChartSeries[];
  dataPoints: ChartDataPoint[];
  keyFeaturesList: KeyFeatureItem[];
  sampleBand8Essay: {
    intro: string;
    overview: string;
    body1: string;
    body2: string;
  };
}

export const MOCK_TASK1_LINE_TASK: Task1Dataset = {
  id: "task1_line_electricity",
  chartType: "line",
  title: "Electricity Consumption in France, Germany, and the UK (1990 - 2020)",
  prompt:
    "The line graph below shows the electricity consumption in three European countries between 1990 and 2020, measured in Terawatt-hours (TWh).\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
  unit: "Terawatt-hours (TWh)",
  timeframe: "1990 - 2020 (30-year period)",
  yAxisMin: 0,
  yAxisMax: 600,
  yAxisStep: 100,
  series: [
    { key: "germany", name: "Germany", color: "#6366f1" },
    { key: "france", name: "France", color: "#10b981" },
    { key: "uk", name: "United Kingdom", color: "#f59e0b" },
  ],
  dataPoints: [
    { label: "1990", values: { germany: 450, france: 320, uk: 290 } },
    { label: "1995", values: { germany: 470, france: 360, uk: 310 } },
    { label: "2000", values: { germany: 510, france: 410, uk: 340 } },
    { label: "2005", values: { germany: 540, france: 460, uk: 350 } },
    { label: "2010", values: { germany: 530, france: 490, uk: 330 } },
    { label: "2015", values: { germany: 510, france: 480, uk: 300 } },
    { label: "2020", values: { germany: 490, france: 470, uk: 280 } },
  ],
  keyFeaturesList: [
    {
      id: "kf_1",
      description: "Germany remained the largest electricity consumer throughout the entire 30-year period.",
      isKeyFeature: true,
      category: "final_trend",
      categoryVi: "Xu hướng dẫn đầu tổng thể (Leader Trend)",
      explanation:
        "Đúng! Germany luôn giữ vị trí đứng đầu từ 1990 (450 TWh) đến 2020 (490 TWh), là một trong những Key Features quan trọng nhất cần đưa vào Overview.",
    },
    {
      id: "kf_2",
      description: "France experienced continuous growth to peak at nearly 500 TWh in 2010, significantly narrowing the gap with Germany.",
      isKeyFeature: true,
      category: "peak_trough",
      categoryVi: "Điểm cực trị & Rút ngắn khoảng cách",
      explanation:
        "Đúng! Sự bứt phá mạnh mẽ của Pháp từ 320 TWh lên đỉnh 490 TWh năm 2010 và áp sát Đức là điểm biến thiên nổi bật nhất biểu đồ.",
    },
    {
      id: "kf_3",
      description: "UK consumption rose modestly before declining back to below its initial 1990 level by 2020.",
      isKeyFeature: true,
      category: "final_trend",
      categoryVi: "Xu hướng tăng rồi thoái trào",
      explanation:
        "Đúng! Vương quốc Anh là quốc gia duy nhất có mức tiêu thụ điện cuối kỳ (280 TWh năm 2020) thấp hơn mức khởi điểm ban đầu (290 TWh năm 1990).",
    },
    {
      id: "kf_4",
      description: "UK consumption went from 290 TWh in 1990 to 310 TWh in 1995.",
      isKeyFeature: false,
      category: "minor_fluctuation",
      categoryVi: "Chi tiết vụn vặt (Minor Detail)",
      explanation:
        "Sai! Đây chỉ là một biến động nhỏ từng năm trong giai đoạn đầu. Đưa chi tiết này vào Overview hoặc coi là Key Feature sẽ làm loãng bài viết (lỗi Band 5.0).",
    },
    {
      id: "kf_5",
      description: "Germany had a small dip of 10 TWh between 2005 and 2010.",
      isKeyFeature: false,
      category: "minor_fluctuation",
      categoryVi: "Chi tiết vụn vặt (Minor Detail)",
      explanation:
        "Sai! Mức giảm nhẹ 10 TWh là chi tiết thứ yếu, chỉ cần tóm tắt xu hướng giảm chung từ sau năm 2005 thay vì liệt kê từng năm.",
    },
    {
      id: "kf_6",
      description: "All three countries saw their consumption peak around 2005-2010 before declining gradually in the final decade.",
      isKeyFeature: true,
      category: "peak_trough",
      categoryVi: "Điểm uốn chung của cả 3 đối tượng (Common Turning Point)",
      explanation:
        "Đúng! Cả 3 quốc gia đều đạt đỉnh trong khoảng 2005-2010 và đều có xu hướng giảm nhẹ trong thập kỷ cuối (2010-2020) nhờ các chính sách tiết kiệm năng lượng.",
    },
  ],
  sampleBand8Essay: {
    intro:
      "The line graph illustrates the total volume of electrical power consumed in France, Germany, and the United Kingdom over a 30-year timeframe from 1990 to 2020, measured in Terawatt-hours (TWh).",
    overview:
      "Overall, electricity consumption in Germany and France followed an upward trajectory despite mild declines in the final decade, whereas the UK witnessed an overall decrease. Furthermore, Germany consistently maintained its position as the largest consumer of electricity throughout the entire period examined.",
    body1:
      "In 1990, electricity consumption in Germany stood at 450 TWh, substantially higher than that of France (320 TWh) and the UK (290 TWh). German power usage experienced a steady climb over the next 15 years, reaching a peak of 540 TWh in 2005. Thereafter, this figure witnessed a gradual downward trend, settling at 490 TWh by 2020.",
    body2:
      "By contrast, electricity usage in France surged dramatically by over 50%, climbing from 320 TWh in 1990 to a high of 490 TWh in 2010, thereby significantly closing the gap with Germany. In the following decade, French consumption declined marginally to 470 TWh. Meanwhile, the UK saw modest growth to a peak of 350 TWh in 2005, before steadily decreasing to finish at 280 TWh in 2020, slightly below its starting figure.",
  },
};

export const MOCK_TASK1_BAR_TASK: Task1Dataset = {
  id: "task1_bar_expenditure",
  chartType: "bar",
  title: "Household Expenditure on Education and Leisure in 5 European Nations (2022)",
  prompt:
    "The bar chart below compares the percentage of household budget allocated to Education and Leisure in five European countries in 2022.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
  unit: "Percentage of Household Budget (%)",
  timeframe: "Year 2022 (Static Comparison)",
  yAxisMin: 0,
  yAxisMax: 30,
  yAxisStep: 5,
  series: [
    { key: "education", name: "Education", color: "#3b82f6" },
    { key: "leisure", name: "Leisure", color: "#ec4899" },
  ],
  dataPoints: [
    { label: "UK", values: { education: 8, leisure: 24 } },
    { label: "Germany", values: { education: 12, leisure: 22 } },
    { label: "France", values: { education: 15, leisure: 18 } },
    { label: "Spain", values: { education: 18, leisure: 14 } },
    { label: "Poland", values: { education: 22, leisure: 9 } },
  ],
  keyFeaturesList: [
    {
      id: "kf_bar_1",
      description: "Leisure expenditure was notably higher in Western European nations (UK, Germany, France), whereas Eastern/Southern nations spent more on Education.",
      isKeyFeature: true,
      category: "final_trend",
      categoryVi: "Quy luật phân hóa địa lý tổng thể (Overview Trend)",
      explanation:
        "Đúng! Đây là bức tranh bao quát (Overview) quan trọng nhất thể hiện sự phân hóa rõ rệt giữa các nhóm quốc gia.",
    },
    {
      id: "kf_bar_2",
      description: "The UK had the highest proportion for leisure (24%) but the lowest for education (8%), creating a threefold disparity.",
      isKeyFeature: true,
      category: "peak_trough",
      categoryVi: "Điểm cực trị đối nghịch (Extreme Contrast)",
      explanation:
        "Đúng! Sự tương phản cực độ giữa chi tiêu giải trí cao nhất và giáo dục thấp nhất của Anh là Key Feature đắt giá.",
    },
    {
      id: "kf_bar_3",
      description: "Poland exhibited the exact opposite pattern, allocating the largest share to education (22%) and the lowest to leisure (9%).",
      isKeyFeature: true,
      category: "peak_trough",
      categoryVi: "Điểm cực trị đảo ngược",
      explanation:
        "Đúng! Ba Lan là quốc gia có tỷ trọng ngược lại hoàn toàn so với Vương quốc Anh.",
    },
    {
      id: "kf_bar_4",
      description: "In Germany, leisure was 22% while education was 12%.",
      isKeyFeature: false,
      category: "minor_fluctuation",
      categoryVi: "Số liệu đơn lẻ (Isolated Figure)",
      explanation:
        "Sai! Chỉ nêu số liệu của Đức đơn lẻ mà không đặt vào mối tương quan với Anh hoặc Pháp là lỗi thiếu tính so sánh đối chiếu.",
    },
  ],
  sampleBand8Essay: {
    intro:
      "The bar chart compares the proportion of household income spent on education and leisure activities across five European nations (the UK, Germany, France, Spain, and Poland) in the year 2022.",
    overview:
      "Overall, households in Western European nations prioritized leisure activities over education, whereas the reverse was true for Spain and Poland. Additionally, the UK recorded the highest expenditure on leisure, while Poland allocated the largest share of budget to education.",
    body1:
      "Regarding leisure spending, the United Kingdom led the chart with 24% of domestic expenditure, closely followed by Germany at 22% and France at 18%. In stark contrast, leisure accounted for a significantly smaller fraction of household budgets in Southern and Eastern Europe, with Spain registering 14% and Poland recording the lowest figure at just 9%.",
    body2:
      "In terms of educational investment, the trend was inverted. Polish families directed 22% of their spending towards education, representing the highest proportion among all surveyed countries. Spain followed with 18%, and France stood at 15%. Conversely, educational expenditure was considerably lower in Germany and the UK, which recorded 12% and a modest 8% respectively.",
  },
};

export const TREND_VOCAB_COLLECTION: TrendVocabItem[] = [
  {
    id: "tv_1",
    category: "upward",
    verbAdverb: "increase dramatically / climb steadily",
    adjNoun: "a dramatic increase / a steady climb",
    exampleSentence: "French electricity consumption increased dramatically from 320 TWh to 490 TWh.",
    vietnameseMeaning: "Tăng mạnh mẽ / tăng đều đặn",
  },
  {
    id: "tv_2",
    category: "upward",
    verbAdverb: "soar rapidly / surge substantially",
    adjNoun: "a rapid soar / a substantial surge",
    exampleSentence: "There was a substantial surge in renewable power output after 2010.",
    vietnameseMeaning: "Tăng vọt / bùng nổ đáng kể",
  },
  {
    id: "tv_3",
    category: "downward",
    verbAdverb: "plummet sharply / plunge steeply",
    adjNoun: "a sharp plummet / a steep plunge",
    exampleSentence: "UK energy demand plummeted sharply following the implementation of conservation policies.",
    vietnameseMeaning: "Lao dốc thẳng đứng / sụt giảm nghiêm trọng",
  },
  {
    id: "tv_4",
    category: "downward",
    verbAdverb: "decline marginally / decrease gradually",
    adjNoun: "a marginal decline / a gradual decrease",
    exampleSentence: "German electricity usage experienced a gradual decrease between 2005 and 2020.",
    vietnameseMeaning: "Giảm nhẹ / giảm dần đều",
  },
  {
    id: "tv_5",
    category: "stability",
    verbAdverb: "plateau / level off / remain relatively constant",
    adjNoun: "a period of stability / a plateau in",
    exampleSentence: "The figures levelled off at around 350 TWh throughout the mid-2000s.",
    vietnameseMeaning: "Chững lại / đi ngang ổn định",
  },
  {
    id: "tv_6",
    category: "comparison",
    verbAdverb: "in stark contrast to / whereas / while",
    adjNoun: "a stark disparity between",
    exampleSentence: "In stark contrast to Poland, households in the UK prioritized leisure over education.",
    vietnameseMeaning: "Trái ngược hoàn toàn với / trong khi đó",
  },
];
