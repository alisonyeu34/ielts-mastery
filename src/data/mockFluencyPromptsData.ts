/**
 * Mock Speaking Prompts & Biofeedback Fluency Standards Dataset
 * Covers abstract IELTS Speaking Part 2 & Part 3 scenarios with acoustic targets.
 */

export interface SpeakingFluencyPrompt {
  id: string;
  part: "Part 2" | "Part 3";
  topicTitle: string;
  promptQuestion: string;
  cueCards?: string[];
  targetWpmRange: { min: number; max: number };
  recommendedDurationSec: number;
  band8ModelAnswer: string;
  acousticPedagogyTips: string[];
}

export const MOCK_FLUENCY_PROMPTS: SpeakingFluencyPrompt[] = [
  {
    id: "fluency_prompt_01",
    part: "Part 3",
    topicTitle: "Automation & The Future of Human Intellect",
    promptQuestion: "Do you think artificial intelligence will diminish human critical thinking abilities?",
    targetWpmRange: { min: 115, max: 140 },
    recommendedDurationSec: 45,
    band8ModelAnswer:
      "From my perspective, AI will not necessarily erode human cognition, provided that individuals use it as an intellectual amplifier rather than an outsourced cognitive crutch. While automated algorithms can instantaneously synthesize vast bibliographic archives, the capacity for epistemological skepticism and ethical nuance remains uniquely human. Consequently, educators should pivot toward fostering interpretive discernment rather than rote factual memorization.",
    acousticPedagogyTips: [
      "Áp dụng Silent Pause: Khi cần suy nghĩ cấu trúc câu phức tạp ở giữa câu, hãy chấp nhận 0.5s im lặng thay vì chêm 'um/uh'.",
      "Duy trì nhịp độ ổn định từ 120 - 135 WPM để giữ độ tròn vành rõ chữ cho các thuật ngữ C1 như 'epistemological', 'discernment'.",
    ],
  },
  {
    id: "fluency_prompt_02",
    part: "Part 2",
    topicTitle: "Describe a Major Scientific Breakthrough that Transformed Society",
    promptQuestion: "Describe a scientific development that you believe has fundamentally changed modern life.",
    cueCards: [
      "What the breakthrough is",
      "When and how it was discovered",
      "How it influences daily human interactions",
      "And explain whether you consider its long-term impact positive or negative",
    ],
    targetWpmRange: { min: 120, max: 145 },
    recommendedDurationSec: 90,
    band8ModelAnswer:
      "I would like to discuss CRISPR gene-editing technology, which has fundamentally revolutionized molecular biology. Developed over the past decade, this molecular mechanism enables biochemists to surgically alter DNA sequences with unprecedented precision. In terms of societal repercussions, it holds the potential to eradicate hereditary pathologies and bolster agricultural resilience amid climatic volatility. However, this transformative capability simultaneously precipitates profound bioethical dilemmas regarding genetic inequality.",
    acousticPedagogyTips: [
      "Kiểm soát nhịp thở giữa 4 gợi ý Cue Card để duy trì luồng âm thanh liên tục không bị đứt quãng.",
      "Tuyệt đối loại bỏ các từ đệm rác 'like', 'you know' khi chuyển ý giữa các ý chính.",
    ],
  },
  {
    id: "fluency_prompt_03",
    part: "Part 3",
    topicTitle: "Urban Architecture & Psychological Well-being",
    promptQuestion: "How does the architectural design of modern cities influence the mental health of residents?",
    targetWpmRange: { min: 110, max: 135 },
    recommendedDurationSec: 50,
    band8ModelAnswer:
      "High-density urban architecture exerts a profound psychological impact on urban dwellers. Monolithic concrete geometries and a deficiency of biophilic green spaces can exacerbate chronic stress and feelings of alienation. In contrast, incorporating vegetative communal plazas and natural daylight corridors fosters social cohesion and diminishes cortisol levels.",
    acousticPedagogyTips: [
      "Ngắt nhịp tại ranh giới mệnh đề 'In contrast, ...' để tạo điểm nhấn âm học cho giám khảo.",
      "Tốc độ lý tưởng: ~125 WPM với 4.0 âm tiết/giây.",
    ],
  },
];
