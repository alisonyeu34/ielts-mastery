/**
 * Mock Speed-Reading Dataset: Authentic IELTS Academic Passages
 * Includes chunking metadata, hard/soft scanning targets, 2-way paraphrase mapping, and comprehension tests.
 */

import { QuizQuestion } from "@/types/database";

export type ParaphraseTransformationType =
  | "synonym"
  | "nominalization"
  | "voice_shift"
  | "antonym_negation"
  | "idiomatic_expansion";

export interface FSRSVocabPayload {
  word: string;
  meaning: string;
  ipa: string;
  collocations: string[];
  originalContext: string;
  category: "awl_570" | "c1_academic" | "core_3000";
}

export interface ParaphrasePair {
  id: string;
  questionPhrase: string;
  questionContext: string;
  passagePhrase: string;
  passageParagraphIndex: number;
  ruleType: ParaphraseTransformationType;
  ruleNameVi: string;
  explanation: string;
  distractorTrapWarning: string;
  fsrsVocabEntry: FSRSVocabPayload;
}

export interface ScanningKeywordTarget {
  id: string;
  type: "hard" | "soft";
  keyword: string;
  targetParagraphIndex: number;
  hint: string;
  maxTargetTimeSeconds: number;
}

export interface SpeedReadingPassage {
  id: string;
  title: string;
  subTitle: string;
  academicDomain: string;
  passageType: "Passage 1 (Foundation)" | "Passage 2 (Argumentative)" | "Passage 3 (Abstract Science)";
  wordCount: number;
  recommendedTimeMinutes: number;
  targetWpmDefault: number;
  paragraphs: string[];
  scanningTargets: ScanningKeywordTarget[];
  paraphrasePairs: ParaphrasePair[];
  comprehensionQuestions: QuizQuestion[];
}

export const MOCK_SPEED_READING_PASSAGES: SpeedReadingPassage[] = [
  {
    id: "passage_saccades_01",
    title: "The Neurobiology of Reading Speed & The Sub-vocalization Trap",
    subTitle: "How Saccadic Eye Movements and Cognitive Buffers Determine Reading Velocity",
    academicDomain: "Cognitive Neuroscience & Psycholinguistics",
    passageType: "Passage 3 (Abstract Science)",
    wordCount: 785,
    recommendedTimeMinutes: 3,
    targetWpmDefault: 260,
    paragraphs: [
      "Sub-vocalization, the internalized auditory repetition of words during reading, constitutes the single most formidable impediment to attaining reading velocities above 250 words per minute. For the majority of adult readers, the neurological mechanism of ocular fixation remains tethered to the phonic acquisition model instilled during primary schooling. When reading silently, tiny micro-movements in the vocal cords and larynx mirror the speech articulators, inadvertently capping the information throughput at the maximum rate of spoken conversation, which rarely exceeds 160 words per minute.",
      "Furthermore, electro-oculographic telemetry reveals that novice readers perform frequent regressive saccades—involuntary reverse eye movements that backtrack across previously decoded lexical items. Dr. Alistair Finch and his colleagues at the Cambridge Cognitive Lab discovered that up to 30 percent of total reading time in lower-band candidates is squandered on redundant fixations. These ocular regressions do not stem from profound comprehension deficits, but rather from an ingrained psychological insecurity regarding short-term working memory retention.",
      "Conversely, proficient readers process textual syntax via wide parafoveal visual spans, decoding words in holistic semantic clusters rather than discrete alphabetical components. By training the ocular muscles to execute rhythmic ballistic saccades across predetermined fixation anchors, learners can double their perceptual span. Consequently, visual information is transmitted directly from the primary visual cortex (V1) to Wernicke's area, completely bypassing the Broca-laryngeal articulatory loop.",
      "In particular, recent empirical trials conducted in 2021 demonstrated that pacing engines utilizing synchronized luminous focus beams reduced ocular regression rates by 68 percent. Participants who sustained an average pacing velocity of 320 words per minute exhibited a marginal four percent drop in semantic recall compared to baseline reading rates. Ultimately, dismantling the sub-vocalizing reflex enables candidates to navigate dense IELTS Passage 3 texts with unprecedented cognitive agility, reserving vital cognitive bandwidth for synthesizing complex argumentative structures.",
    ],
    scanningTargets: [
      {
        id: "scan_01_hard_1",
        type: "hard",
        keyword: "2021",
        targetParagraphIndex: 3,
        hint: "Mốc năm diễn ra các thử nghiệm thực nghiệm mới nhất",
        maxTargetTimeSeconds: 6,
      },
      {
        id: "scan_01_hard_2",
        type: "hard",
        keyword: "Dr. Alistair Finch",
        targetParagraphIndex: 1,
        hint: "Tên riêng của nhà nghiên cứu tại phòng lab Cambridge",
        maxTargetTimeSeconds: 8,
      },
      {
        id: "scan_01_soft_1",
        type: "soft",
        keyword: "parafoveal visual spans",
        targetParagraphIndex: 2,
        hint: "Cụm thuật ngữ chỉ vùng thị giác mở rộng ngoại vi",
        maxTargetTimeSeconds: 10,
      },
      {
        id: "scan_01_soft_2",
        type: "soft",
        keyword: "regressive saccades",
        targetParagraphIndex: 1,
        hint: "Khái niệm hiện tượng đảo mắt lùi về phía trước",
        maxTargetTimeSeconds: 10,
      },
    ],
    paraphrasePairs: [
      {
        id: "para_01_1",
        questionPhrase: "greatest obstacle to accelerating reading pace",
        questionContext: "Internalized speech represents the greatest obstacle to accelerating reading pace.",
        passagePhrase: "single most formidable impediment to attaining reading velocities",
        passageParagraphIndex: 0,
        ruleType: "synonym",
        ruleNameVi: "Thay Thế Từ Đồng Nghĩa Học Thuật (Academic Synonym Substitution)",
        explanation: "'greatest obstacle' được paraphrase hoàn hảo thành 'single most formidable impediment'. Cả hai đều chỉ rào cản lớn nhất ngăn cản tiến độ.",
        distractorTrapWarning: "Cảnh giác với các từ mang nghĩa đối lập như 'catalyst' hay 'facilitator'.",
        fsrsVocabEntry: {
          word: "Impediment",
          ipa: "/ɪmˈped.ə.mənt/",
          meaning: "Rào cản, trở ngại lớn ngăn cản sự phát triển hoặc tốc độ của một quá trình.",
          collocations: ["formidable impediment", "major impediment to", "remove an impediment"],
          originalContext: "Sub-vocalization constitutes the single most formidable impediment to attaining reading velocities.",
          category: "awl_570",
        },
      },
      {
        id: "para_01_2",
        questionPhrase: "squandered on redundant fixations",
        questionContext: "A significant portion of time is wasted on unnecessary eye pauses.",
        passagePhrase: "squandered on redundant fixations",
        passageParagraphIndex: 1,
        ruleType: "nominalization",
        ruleNameVi: "Danh Từ Hóa & Cụm Tính Từ Học Thuật (Nominalization)",
        explanation: "'wasted on unnecessary pauses' được biến đổi học thuật thành động từ 'squandered' đi kèm cụm danh từ 'redundant fixations'.",
        distractorTrapWarning: "Bẫy thí sinh nhầm 'redundant' với 'useful' hoặc 'essential'.",
        fsrsVocabEntry: {
          word: "Squander",
          ipa: "/ˈskwɑːn.dɚ/",
          meaning: "Lãng phí, phung phí (thời gian, tiền bạc, cơ hội quý giá) một cách vô ích.",
          collocations: ["squander time", "squander an opportunity", "squander resources"],
          originalContext: "Up to 30 percent of total reading time in lower-band candidates is squandered on redundant fixations.",
          category: "c1_academic",
        },
      },
      {
        id: "para_01_3",
        questionPhrase: "decoding words in holistic semantic clusters",
        questionContext: "Advanced readers grasp meaning by processing entire word groupings simultaneously.",
        passagePhrase: "decoding words in holistic semantic clusters",
        passageParagraphIndex: 2,
        ruleType: "idiomatic_expansion",
        ruleNameVi: "Mở Rộng Định Nghĩa Khái Niệm (Conceptual Elaboration)",
        explanation: "'grasp meaning by processing entire word groupings' được nâng cấp thành 'decoding words in holistic semantic clusters'.",
        distractorTrapWarning: "Bẫy suy luận: 'holistic' đối lập hoàn toàn với 'isolated' hoặc 'discrete alphabetical'.",
        fsrsVocabEntry: {
          word: "Holistic",
          ipa: "/hoʊˈlɪs.tɪk/",
          meaning: "Mang tính tổng thể, toàn diện, xem xét tổng hòa các bộ phận liên kết với nhau.",
          collocations: ["holistic approach", "holistic view", "holistic assessment"],
          originalContext: "Proficient readers process textual syntax via wide parafoveal visual spans, decoding words in holistic semantic clusters.",
          category: "c1_academic",
        },
      },
    ],
    comprehensionQuestions: [
      {
        id: "comp_01_q1",
        question: "According to paragraph 1, what is the primary physiological cause limiting silent reading speed?",
        options: [
          "Deficiencies in primary school phonics instruction curricula",
          "Subtle micro-movements of vocal cords mirroring spoken dialogue speed",
          "Ocular fatigue caused by inadequate illumination",
          "A neurological disconnect between the retina and Wernicke's area",
        ],
        correctIndex: 1,
        explanation: "Đoạn 1 nêu rõ: 'When reading silently, tiny micro-movements in the vocal cords and larynx mirror the speech articulators, inadvertently capping the information throughput at the maximum rate of spoken conversation'.",
      },
      {
        id: "comp_01_q2",
        question: "Dr. Finch's research suggests that backward eye movements (regressions) are mostly triggered by:",
        options: [
          "Severely impaired cognitive reasoning abilities",
          "Poor lexical vocabulary size in academic contexts",
          "Psychological insecurity concerning short-term memory storage",
          "Physiological abnormalities in saccadic muscle coordination",
        ],
        correctIndex: 2,
        explanation: "Đoạn 2 chỉ ra: 'These ocular regressions do not stem from profound comprehension deficits, but rather from an ingrained psychological insecurity regarding short-term working memory retention'.",
      },
      {
        id: "comp_01_q3",
        question: "What outcome was observed when pacing engines were used in the 2021 empirical trials?",
        options: [
          "Reading comprehension collapsed by over fifty percent",
          "Ocular regressions decreased by 68% with only a negligible loss in recall",
          "Participants could no longer comprehend abstract Passage 3 structures",
          "Reading velocity exceeded 600 words per minute instantaneously",
        ],
        correctIndex: 1,
        explanation: "Đoạn 4 nêu rõ: 'reduced ocular regression rates by 68 percent' và 'exhibited a marginal four percent drop in semantic recall'.",
      },
    ],
  },
  {
    id: "passage_saccades_02",
    title: "Urban Heat Islands & Microclimatic Geo-Engineering",
    subTitle: "Mitigating Anthropogenic Thermal Anomalies Through Albedo Modification and Passive Cooling",
    academicDomain: "Urban Climatology & Civil Engineering",
    passageType: "Passage 2 (Argumentative)",
    wordCount: 810,
    recommendedTimeMinutes: 3,
    targetWpmDefault: 280,
    paragraphs: [
      "The phenomenon of Urban Heat Islands (UHIs), whereby metropolitan conglomerations register ambient temperatures up to 8.5 degrees Celsius higher than surrounding rural peripheries, poses an existential public health threat. Dense configurations of low-albedo asphalt, thermal mass concrete, and the canyon geometry of skyscrapers relentlessly absorb solar radiation throughout daylight hours, re-radiating thermal energy long after dusk. Furthermore, anthropogenic heat emissions from internal combustion vehicles and centralized air conditioning compressors exacerbate the diurnal thermal baseline.",
      "In response, municipal urban planners in Tokyo and Singapore have pioneered retroreflective cool roofs and vertical vegetative facades. Materials engineered with specialized dielectric coatings achieve solar reflectance indexes (SRIs) exceeding 105, reflecting incoming shortwave radiation back into outer space without warming adjacent lower atmospheric layers. However, aerodynamic analyses indicate that high-density vertical green walls can occasionally obstruct natural pedestrian-level wind corridors if improperly aligned.",
      "Consequently, hydrologic geo-engineering has emerged as an indispensable supplementary mitigation paradigm. Permeable porous pavements combined with sub-surface stormwater bioretention basins enhance evaporative cooling rates during heatwave episodes. Recent sensor telemetry from Melbourne's 2023 climate grid revealed that streets paved with permeable asphalt experienced surface temperature reductions of approximately 4.2 degrees Celsius relative to conventional impermeable bitumen.",
    ],
    scanningTargets: [
      {
        id: "scan_02_hard_1",
        type: "hard",
        keyword: "8.5 degrees Celsius",
        targetParagraphIndex: 0,
        hint: "Mức chênh lệch nhiệt độ tối đa giữa đô thị và ngoại ô",
        maxTargetTimeSeconds: 6,
      },
      {
        id: "scan_02_hard_2",
        type: "hard",
        keyword: "Melbourne's 2023",
        targetParagraphIndex: 2,
        hint: "Tên thành phố và mốc năm triển khai lưới cảm biến khí hậu",
        maxTargetTimeSeconds: 7,
      },
      {
        id: "scan_02_soft_1",
        type: "soft",
        keyword: "dielectric coatings",
        targetParagraphIndex: 1,
        hint: "Vật liệu phủ màng điện môi phản xạ nhiệt",
        maxTargetTimeSeconds: 9,
      },
    ],
    paraphrasePairs: [
      {
        id: "para_02_1",
        questionPhrase: "absorb solar radiation throughout daylight hours",
        questionContext: "Modern building structures store enormous amounts of heat from sunlight during the day.",
        passagePhrase: "relentlessly absorb solar radiation throughout daylight hours",
        passageParagraphIndex: 0,
        ruleType: "voice_shift",
        ruleNameVi: "Biến Đổi Cấu Trúc Chủ Động / Bị Động (Grammatical Voice Shift)",
        explanation: "'store heat from sunlight' được chuyển sang 'absorb solar radiation' với trạng từ gia tăng cường độ 'relentlessly'.",
        distractorTrapWarning: "Tránh nhầm lẫn giữa 'absorb' (hấp thụ) và 'reflect' (phản chiếu).",
        fsrsVocabEntry: {
          word: "Relentless",
          ipa: "/rɪˈlent.ləs/",
          meaning: "Liên tục không ngừng nghỉ, khốc liệt và không suy giảm cường độ.",
          collocations: ["relentless pressure", "relentless heat", "relentless effort"],
          originalContext: "Dense configurations of concrete relentlessly absorb solar radiation throughout daylight hours.",
          category: "c1_academic",
        },
      },
      {
        id: "para_02_2",
        questionPhrase: "indispensable supplementary mitigation paradigm",
        questionContext: "Water-based cooling technologies have become an essential complementary strategy.",
        passagePhrase: "indispensable supplementary mitigation paradigm",
        passageParagraphIndex: 2,
        ruleType: "synonym",
        ruleNameVi: "Cụm Danh Từ Học Thuật Cấp Cao (C1 Collocation Mapping)",
        explanation: "'essential complementary strategy' được nâng cấp thành 'indispensable supplementary mitigation paradigm'.",
        distractorTrapWarning: "Không nhầm 'indispensable' (không thể thiếu) với 'dispensable' (có thể bỏ qua).",
        fsrsVocabEntry: {
          word: "Indispensable",
          ipa: "/ˌɪn.dɪˈspen.sə.bəl/",
          meaning: "Không thể thiếu được, hoàn toàn thiết yếu cho sự thành công.",
          collocations: ["indispensable role", "prove indispensable", "indispensable tool"],
          originalContext: "Hydrologic geo-engineering has emerged as an indispensable supplementary mitigation paradigm.",
          category: "awl_570",
        },
      },
    ],
    comprehensionQuestions: [
      {
        id: "comp_02_q1",
        question: "What is cited as a potential drawback of poorly aligned vertical green facades?",
        options: [
          "They rapidly decay under excessive ultraviolet exposure",
          "They can inadvertently impede urban airflow channels at ground level",
          "They release substantial anthropogenic thermal radiation after sunset",
          "They require toxic chemical solvents for maintenance",
        ],
        correctIndex: 1,
        explanation: "Đoạn 2 nêu rõ: 'aerodynamic analyses indicate that high-density vertical green walls can occasionally obstruct natural pedestrian-level wind corridors if improperly aligned'.",
      },
      {
        id: "comp_02_q2",
        question: "Data from Melbourne's 2023 grid showed that permeable asphalt surfaces:",
        options: [
          "Warmed surrounding areas by 8.5 degrees Celsius",
          "Had no noticeable impact on urban heat accumulation",
          "Achieved a temperature drop of about 4.2°C compared to conventional roads",
          "Obstructed sub-surface stormwater bioretention basins",
        ],
        correctIndex: 2,
        explanation: "Đoạn 3 khẳng định: 'streets paved with permeable asphalt experienced surface temperature reductions of approximately 4.2 degrees Celsius relative to conventional impermeable bitumen'.",
      },
    ],
  },
];
