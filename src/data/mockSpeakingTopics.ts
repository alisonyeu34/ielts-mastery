export interface SpeakingTopic {
  id: string;
  part: 1 | 2 | 3;
  title: string;
  topic: string;
  questionText: string;
  bulletPoints?: string[]; // For Part 2 Cue Cards
  prepTimeSeconds?: number; // 60s for Part 2
  recommendedSpeakingSeconds: number; // 30s for P1, 120s for P2, 60s for P3
  suggestedVocabulary: string[];
  sampleBand8Answer: string;
}

export const MOCK_SPEAKING_TOPICS: SpeakingTopic[] = [
  // --- PART 1 ---
  {
    id: "spk_p1_work",
    part: 1,
    title: "Công Việc & Học Tập (Work & Studies)",
    topic: "Work & Education",
    questionText: "Do you currently work or are you a student?",
    recommendedSpeakingSeconds: 25,
    suggestedVocabulary: [
      "currently pursuing a degree in",
      "fast-paced corporate environment",
      "demanding yet rewarding",
    ],
    sampleBand8Answer:
      "At present, I am working as a software developer at a dynamic technology firm. My daily responsibilities revolve around building interactive web applications and collaborating with international clients, which is exceptionally demanding yet immensely rewarding.",
  },
  {
    id: "spk_p1_tech",
    part: 1,
    title: "Thiết Bị Số & Giao Tiếp (Digital Communication)",
    topic: "Technology & Daily Habits",
    questionText: "How often do you rely on digital devices for your daily communication?",
    recommendedSpeakingSeconds: 30,
    suggestedVocabulary: [
      "virtually indispensable",
      "streamline communications",
      "instantaneous interaction",
    ],
    sampleBand8Answer:
      "To be completely honest, digital devices have become virtually indispensable in my day-to-day routine. Whether it is coordinating tasks with colleagues via instant messaging or staying in touch with distant relatives, I rely on my smartphone and laptop almost continuously from morning until dusk.",
  },

  // --- PART 2 CUE CARD ---
  {
    id: "spk_p2_decision",
    part: 2,
    title: "Quyết Định Thay Đổi Cuộc Đời (A Momentous Life Decision)",
    topic: "Personal Growth & Major Decisions",
    questionText: "Describe a momentous decision you made that significantly influenced your life.",
    bulletPoints: [
      "What the decision was and when you made it",
      "Why you were confronted with this difficult choice",
      "What alternative options you considered at that time",
      "And explain how this decision shaped your personal or career trajectory.",
    ],
    prepTimeSeconds: 60,
    recommendedSpeakingSeconds: 120,
    suggestedVocabulary: [
      "momentous turning point",
      "step out of my comfort zone",
      "broaden my horizons",
      "profound ramifications",
      "valuable life lesson",
    ],
    sampleBand8Answer:
      "I would like to talk about a momentous turning point in my life, which was my decision to transition from a secure corporate position to pursue full-time postgraduate studies in data science approximately two years ago. At the time, I was at a critical career crossroads: while my previous job offered financial stability, I felt an overwhelming urge to step out of my comfort zone and acquire forward-looking computational skills. Despite the financial uncertainties, taking that bold leap proved to be one of the most rewarding gambles I have ever made, as it fundamentally transformed my intellectual perspective and opened up unprecedented career opportunities.",
  },

  // --- PART 3 DISCUSSION ---
  {
    id: "spk_p3_ai_decision",
    part: 3,
    title: "Trí Tuệ Nhân Tạo & Ra Quyết Định Xã Hội",
    topic: "Artificial Intelligence & Ethics",
    questionText: "To what extent should artificial intelligence algorithms be entrusted with critical societal decisions?",
    recommendedSpeakingSeconds: 60,
    suggestedVocabulary: [
      "data-driven objectivity",
      "algorithmic bias",
      "moral nuances",
      "human oversight is paramount",
      "ethical safeguards",
    ],
    sampleBand8Answer:
      "From my perspective, while algorithmic systems offer unparalleled computational efficiency and data-driven objectivity, they should strictly serve as advisory mechanisms rather than ultimate decision-makers. Critical societal matters—such as judicial sentencing or healthcare triage—require profound empathy, moral nuance, and ethical accountability that no synthetic neural network can authentically replicate. Therefore, human oversight remains absolutely paramount.",
  },
];
