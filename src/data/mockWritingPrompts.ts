export interface WritingPrompt {
  id: string;
  taskType: "task1" | "task2";
  title: string;
  topic: string;
  promptText: string;
  chartDetails?: {
    type: "bar_chart" | "line_graph" | "pie_chart" | "table";
    summary: string;
    dataPoints: Array<{ label: string; value2010: string; value2020: string }>;
  };
  recommendedWords: number;
  timeLimitMinutes: number;
  keyVocabulary: string[];
  sampleOutline: {
    overviewOrIntro: string;
    bodyParagraph1: string;
    bodyParagraph2: string;
    conclusion?: string;
  };
}

export const MOCK_WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: "prompt_wt2_tech",
    taskType: "task2",
    title: "Công Nghệ & Sự Bảo Tồn Văn Hóa Truyền Thống",
    topic: "Technology & Culture",
    promptText:
      "Some people argue that technological developments have led to the loss of traditional cultures, while others believe that technology helps preserve them. Discuss both views and give your opinion.",
    recommendedWords: 250,
    timeLimitMinutes: 40,
    keyVocabulary: [
      "cultural heritage",
      "digitization",
      "erosion of indigenous customs",
      "globalized media",
      "safeguard tangible and intangible values",
    ],
    sampleOutline: {
      overviewOrIntro:
        "Paraphrase đề bài (sự phát triển công nghệ tác động hai chiều lên văn hóa) + Đưa ra luận điểm cá nhân (công nghệ đe dọa nhưng mở ra cơ hội bảo tồn số hóa chưa từng có).",
      bodyParagraph1:
        "Góc nhìn 1: Công nghệ gây xói mòn văn hóa bản địa qua sự bành trướng của truyền thông phương Tây và giới trẻ xa rời tập tục truyền thống.",
      bodyParagraph2:
        "Góc nhìn 2: Công nghệ là công cụ số hóa, lưu trữ tư liệu bảo tàng trực tuyến (Virtual Reality) và kết nối cộng đồng toàn cầu tiếp cận di sản.",
      conclusion:
        "Khẳng định lại: Cần tận dụng công nghệ như một phương tiện bảo tồn thay vì bài xích.",
    },
  },
  {
    id: "prompt_wt1_energy",
    taskType: "task1",
    title: "Tỷ Trọng Năng Lượng Tái Tạo Tại 4 Quốc Gia Châu Âu (2010 - 2020)",
    topic: "Renewable Energy Statistics",
    promptText:
      "The chart below shows the percentage of electricity generated from renewable sources in four European countries between 2010 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
    chartDetails: {
      type: "bar_chart",
      summary:
        "So sánh tỷ lệ điện sạch tại Đan Mạch, Đức, Tây Ban Nha và Ý trong giai đoạn 10 năm.",
      dataPoints: [
        { label: "Đan Mạch (Denmark)", value2010: "30%", value2020: "65%" },
        { label: "Đức (Germany)", value2010: "15%", value2020: "42%" },
        { label: "Tây Ban Nha (Spain)", value2010: "22%", value2020: "38%" },
        { label: "Ý (Italy)", value2010: "12%", value2020: "20%" },
      ],
    },
    recommendedWords: 150,
    timeLimitMinutes: 20,
    keyVocabulary: [
      "witnessed a sharp upward trajectory",
      "surpassed",
      "comprised nearly two-thirds",
      "doubled in volume",
      "remained the lowest contributor",
    ],
    sampleOutline: {
      overviewOrIntro:
        "Introduction: Paraphrase đề bài (biểu đồ so sánh tỷ trọng điện tái tạo tại 4 nước 2010-2020). Overview: Tất cả các quốc gia đều tăng trưởng; Đan Mạch luôn dẫn đầu, Ý luôn thấp nhất.",
      bodyParagraph1:
        "Body 1 (Nhóm tăng trưởng vượt bậc): Chi tiết số liệu Đan Mạch (tăng hơn gấp đôi từ 30% lên 65%) và Đức (tăng vọt từ 15% lên 42%).",
      bodyParagraph2:
        "Body 2 (Nhóm tăng trưởng trung bình): Phân tích số liệu Tây Ban Nha (22% lên 38%) và Ý (12% lên 20%).",
    },
  },
  {
    id: "prompt_wt2_health",
    taskType: "task2",
    title: "Đánh Thuế Nước Ngọt & Thực Phẩm Chế Biến Sẵn",
    topic: "Public Health & Taxation",
    promptText:
      "Many governments are encouraging citizens to adopt healthier lifestyles by increasing taxes on sugary drinks and heavily processed foods. To what extent do you agree or disagree with this policy?",
    recommendedWords: 250,
    timeLimitMinutes: 40,
    keyVocabulary: [
      "fiscal deterrent",
      "dietary habits",
      "combat the obesity epidemic",
      "regressive taxation",
      "subsidize wholesome alternatives",
    ],
    sampleOutline: {
      overviewOrIntro:
        "Giới thiệu bối cảnh bệnh lý dinh dưỡng + Tuyên bố quan điểm: Đồng ý một phần (thuế là đòn bẩy tốt nhưng cần kết hợp giáo dục & trợ giá thực phẩm tươi).",
      bodyParagraph1:
        "Lý do đồng ý: Đánh thuế tăng giá bán, tạo rào cản tài chính giảm hành vi tiêu thụ nước ngọt & tạo nguồn thu tái đầu tư y tế.",
      bodyParagraph2:
        "Hạn chế & Giải pháp bổ trợ: Thuế đánh vào người thu nhập thấp (regressive); cần trợ giá rau củ sạch và giáo dục lối sống học đường.",
      conclusion:
        "Tóm lược: Thuế là giải pháp cần thiết nhưng không phải duy nhất.",
    },
  },
];
