/**
 * Mock Data for High-Rate Lecture Telemetry & Signposting Radar Studio (Step 88)
 * 4 Cambridge Section 4 Academic Lectures with High-Density WPM, Signpost Markers & 10 Blanks
 */

import { LectureScenario } from "@/lib/timeStretchingDSP";

export const MOCK_HIGH_RATE_LECTURES: LectureScenario[] = [
  {
    id: "sec4_biomimetic_architecture",
    title: "Thermoregulation and Passive Ventilation in Biomimetic Architecture",
    academicDiscipline: "Architecture & Bio-mimicry",
    professorName: "Prof. Alistair Sterling",
    speakerAccent: "British RP Academic",
    durationSec: 240,
    wordCount: 720,
    outlineSections: [
      {
        title: "I. Termite Mound Structural Mechanics",
        subpoints: [
          "Porous chimney network creating convective airflow",
          "Diurnal temperature buffering in subterranean tunnels"
        ]
      },
      {
        title: "II. Engineering Adaptations in Modern Commercial High-Rises",
        subpoints: [
          "Elimination of conventional mechanical HVAC chillers",
          "Significant reductions in long-term operational overheads"
        ]
      },
      {
        title: "III. Material Innovations and Microclimatic Monitoring",
        subpoints: [
          "Phase-change materials embedded within facade panels",
          "Automated sensor telemetry modulating airflow louvers"
        ]
      }
    ],
    signpostMarkers: [
      {
        id: "sp1",
        timestampSec: 15,
        category: "transition",
        cuePhrase: "To begin with, let us examine the fundamental biological model...",
        purposeSummary: "Khởi đầu bài giảng: Giới thiệu cấu trúc tổ mối châu Phi.",
        approachingQuestionNumber: 31,
        acousticPhenomenon: "Linking /r/ in 'for a start' + Vowel reduction in 'examination'"
      },
      {
        id: "sp2",
        timestampSec: 60,
        category: "definition",
        cuePhrase: "By this, I am referring to the phenomenon of thermal inertia...",
        purposeSummary: "Định nghĩa thuật ngữ 'Thermal Inertia' (Quán tính nhiệt).",
        approachingQuestionNumber: 33,
        acousticPhenomenon: "Flapped /t/ and elision of /h/ in 'to him'"
      },
      {
        id: "sp3",
        timestampSec: 120,
        category: "transition",
        cuePhrase: "Turning now to contemporary architectural applications in Harare...",
        purposeSummary: "Chuyển ý sang tòa nhà Eastgate Centre tại Zimbabwe.",
        approachingQuestionNumber: 35,
        acousticPhenomenon: "Intrusive /w/ in 'to contemporary'"
      },
      {
        id: "sp4",
        timestampSec: 180,
        category: "refutation",
        cuePhrase: "However, early engineering skeptics wrongly predicted that...",
        purposeSummary: "Bác bỏ định kiến về chi phí xây dựng ban đầu.",
        approachingQuestionNumber: 38,
        acousticPhenomenon: "Glottal stop /ʔ/ before 'predicted'"
      }
    ],
    questions: [
      {
        id: "q31",
        questionNumber: 31,
        timestampSec: 25,
        sentenceContext: "Termite mounds maintain a stable internal temperature due to an intricate system of porous [31]...",
        blankPrefix: "intricate system of porous",
        targetWord: "chimneys",
        blankSuffix: "spanning the outer walls.",
        grammarConstraint: "plural_noun",
        signpostCue: "To begin with, let us examine...",
        acousticTrapExplanation: "Giáo sư phát âm nuốt âm /z/ cuối 'chimneys' khi nối nhanh sang 'spanning' ('chimney-spanning'). Thí sinh thường quên viết số nhiều."
      },
      {
        id: "q32",
        questionNumber: 32,
        timestampSec: 50,
        sentenceContext: "The lower chambers are insulated by thick layers of damp [32]...",
        blankPrefix: "thick layers of damp",
        targetWord: "clay",
        blankSuffix: "harvested from water tables.",
        grammarConstraint: "singular_noun",
        signpostCue: "Deep beneath the surface...",
        acousticTrapExplanation: "Từ 'clay' được đọc lướt rất nhanh trong cụm 'damp clay harvested'."
      },
      {
        id: "q33",
        questionNumber: 33,
        timestampSec: 80,
        sentenceContext: "Architects utilized this principle to achieve passive [33] without active energy consumption.",
        blankPrefix: "to achieve passive",
        targetWord: "cooling",
        blankSuffix: "without active energy consumption.",
        grammarConstraint: "singular_noun",
        signpostCue: "By this, I am referring to...",
        acousticTrapExplanation: "Âm đuôi '-ing' bị nuốt nhẹ: 'passive coolin' without'."
      },
      {
        id: "q34",
        questionNumber: 34,
        timestampSec: 110,
        sentenceContext: "The Harare commercial complex requires 35% less [34] than conventional office buildings.",
        blankPrefix: "requires 35% less",
        targetWord: "electricity",
        blankSuffix: "than conventional office buildings.",
        grammarConstraint: "singular_noun",
        signpostCue: "Examining recorded utility statistics...",
        acousticTrapExplanation: "Giáo sư đọc liền 'less electricity' thành một luồng âm duy nhất."
      },
      {
        id: "q35",
        questionNumber: 35,
        timestampSec: 135,
        sentenceContext: "Air is drawn in at ground level through automated [35] installed in the basement.",
        blankPrefix: "through automated",
        targetWord: "fans",
        blankSuffix: "installed in the basement.",
        grammarConstraint: "plural_noun",
        signpostCue: "Turning now to contemporary...",
        acousticTrapExplanation: "Từ 'fans' là danh từ đếm được số nhiều, bị che khuất bởi âm /ɪ/ của 'installed'."
      },
      {
        id: "q36",
        questionNumber: 36,
        timestampSec: 160,
        sentenceContext: "Warm exhaust air escapes continuously through hollow [36] in the roof structure.",
        blankPrefix: "through hollow",
        targetWord: "columns",
        blankSuffix: "in the roof structure.",
        grammarConstraint: "plural_noun",
        signpostCue: "Convective displacement guarantees that...",
        acousticTrapExplanation: "Chữ 'n' câm trong 'columns', phát âm là /ˈkɒl.əmz/."
      },
      {
        id: "q37",
        questionNumber: 37,
        timestampSec: 185,
        sentenceContext: "The initial investment costs were amortized within three [37]...",
        blankPrefix: "amortized within three",
        targetWord: "years",
        blankSuffix: "due to utility savings.",
        grammarConstraint: "plural_noun",
        signpostCue: "However, early engineering skeptics...",
        acousticTrapExplanation: "Từ 'three years' bị phát âm dính liền 'three-years due'."
      },
      {
        id: "q38",
        questionNumber: 38,
        timestampSec: 205,
        sentenceContext: "Modern facade panels incorporate micro-encapsulated [38] to absorb daytime heat.",
        blankPrefix: "micro-encapsulated",
        targetWord: "paraffin",
        blankSuffix: "to absorb daytime heat.",
        grammarConstraint: "singular_noun",
        signpostCue: "Next-generation material research...",
        acousticTrapExplanation: "Thuật ngữ hóa học 'paraffin' có trọng âm rơi vào âm tiết đầu /ˈpær.ə.fɪn/."
      },
      {
        id: "q39",
        questionNumber: 39,
        timestampSec: 220,
        sentenceContext: "Internal sensors measure ambient [39] to adjust nocturnal ventilation rates.",
        blankPrefix: "measure ambient",
        targetWord: "humidity",
        blankSuffix: "to adjust nocturnal ventilation rates.",
        grammarConstraint: "singular_noun",
        signpostCue: "Digital telemetry ensures that...",
        acousticTrapExplanation: "Từ 'humidity' phát âm với âm /h/ nhẹ và âm /t/ bị nuốt nhẹ."
      },
      {
        id: "q40",
        questionNumber: 40,
        timestampSec: 235,
        sentenceContext: "The resulting design demonstrates that biomimicry ensures long-term environmental [40]...",
        blankPrefix: "long-term environmental",
        targetWord: "sustainability",
        blankSuffix: "in dense urban habitats.",
        grammarConstraint: "singular_noun",
        signpostCue: "In the final analysis, we can conclude that...",
        acousticTrapExplanation: "Từ dài 6 âm tiết 'sus-tain-a-bil-i-ty' bị đọc nhanh ở cuối câu kết luận."
      }
    ]
  }
];
