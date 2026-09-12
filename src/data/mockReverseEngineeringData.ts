/**
 * Mock Data for Reverse Item Engineering & Cambridge Distractor Anatomy Studio
 * Step 95 / 100 - IELTS Reading Passage 3 Psychometrics & Distractor Blueprints (Band 7.5 - 8.5+)
 */

import { DistractorMechanism } from '@/lib/distractorPsychometrics';

export interface PassageEngineeringCase {
  id: string;
  cambridgeRef: string;
  topicDomain: 'Neurobiology' | 'Synthetic Biology' | 'Evolutionary Linguistics' | 'Urban Microclimates' | 'Philosophy of AI' | 'Cognitive Ergonomics';
  passageTitle: string;
  passageText: string;
  targetSourceSentence: string;
  modelItemDraft: {
    questionPrompt: string;
    modelKey: string;
    keyParaphraseExplanation: string;
    distractors: Array<{
      id: string;
      type: DistractorMechanism;
      text: string;
      trapMechanismRationale: string;
      whyItDeceivesBand6: string;
    }>;
  };
}

export interface DistractorTaggingDrillItem {
  id: string;
  questionNumber: number;
  sourceContext: string;
  questionStem: string;
  correctOptionId: string;
  options: Array<{
    id: string;
    text: string;
    isKey: boolean;
    assignedTrapType?: DistractorMechanism; // Correct trap mechanism to identify
    explanationVi: string;
  }>;
}

export const MOCK_REVERSE_ENGINEERING_CASES: PassageEngineeringCase[] = [
  {
    id: 'rec-01',
    cambridgeRef: 'Cambridge 18 Test 3 Passage 3',
    topicDomain: 'Cognitive Ergonomics',
    passageTitle: 'Neuro-Ergonomics and Deep Submersible Operating Systems',
    passageText: 'During prolonged saturation diving operations, human operators are subjected to extreme sensory deprivation and cognitive load. Early navigational consoles relied heavily on tactile feedback switches; however, modern submersibles feature touch-capacitive glass interfaces. While sleek, these flat displays lack haptic differentiation, which under high-stress anomalous conditions frequently leads to operational miscalculations. Contrary to initial engineering assumptions that touch displays would eliminate manual latency, recent empirical telemetry reveals that tactile physical dials drastically curtail reaction latency during critical system failures.',
    targetSourceSentence: 'Contrary to initial engineering assumptions that touch displays would eliminate manual latency, recent empirical telemetry reveals that tactile physical dials drastically curtail reaction latency during critical system failures.',
    modelItemDraft: {
      questionPrompt: 'What did recent operational telemetry reveal regarding submersible interfaces?',
      modelKey: 'Physical dials proved more expeditious than flat glass interfaces during emergencies.',
      keyParaphraseExplanation: 'Paraphrase C1/C2: "tactile physical dials drastically curtail reaction latency" -> "Physical dials proved more expeditious".',
      distractors: [
        {
          id: 'dis-01',
          type: 'polarity_inversion',
          text: 'Tactile physical switches ultimately failed to reduce reaction latency in emergency trials.',
          trapMechanismRationale: 'Đảo ngược cực tính: Chèn cụm phủ định "failed to reduce" đối nghịch với sự thật "drastically curtail latency".',
          whyItDeceivesBand6: 'Thí sinh thấy cụm từ "tactile physical switches" và "reaction latency" trùng bài đọc nên chọn vội.'
        },
        {
          id: 'dis-02',
          type: 'half_truth',
          text: 'Modern flat touchscreens eliminate manual latency, making them superior for high-stress anomalies.',
          trapMechanismRationale: 'Đúng nửa đầu (đó là giả định kỹ thuật ban đầu "initial assumptions"), nhưng sai nửa đuôi vì thực tế chúng không tối ưu cho tình huống khẩn cấp.',
          whyItDeceivesBand6: 'Thí sinh nhớ mang máng vế "touch displays eliminate manual latency" mà quên từ "Contrary to initial assumptions".'
        },
        {
          id: 'dis-03',
          type: 'scope_escalation',
          text: 'Touch-capacitive screens are invariably hazardous in every type of marine navigation.',
          trapMechanismRationale: 'Tuyệt đối hóa phạm vi: Đẩy từ "under high-stress anomalous conditions" thành "invariably hazardous in every type".',
          whyItDeceivesBand6: 'Phóng đại nhận định từ tình huống khẩn cấp cá biệt thành quy luật phổ quát cho mọi loại hình hàng hải.'
        }
      ]
    }
  },
  {
    id: 'rec-02',
    cambridgeRef: 'Cambridge 17 Test 2 Passage 3',
    topicDomain: 'Synthetic Biology',
    passageTitle: 'Epigenetic Reprogramming and Cellular Senescence',
    passageText: 'Cellular senescence, long perceived as an irreversible biological dead-end, is now recognized as a plastic metabolic state. By introducing a cocktail of Yamanaka transcription factors, researchers have successfully reversed nuclear age markers in mammalian tissue without triggering oncogenic mutations. Nevertheless, systemic tissue rejuvenation remains constrained by epigenetic memory; differentiated cells occasionally revert to their ancestral phenotypes when external chemical stimuli are withdrawn.',
    targetSourceSentence: 'By introducing a cocktail of Yamanaka transcription factors, researchers have successfully reversed nuclear age markers in mammalian tissue without triggering oncogenic mutations.',
    modelItemDraft: {
      questionPrompt: 'According to the passage, what milestone was achieved through Yamanaka factor interventions?',
      modelKey: 'Cellular aging traits were rolled back in mammals without inducing cancerous growths.',
      keyParaphraseExplanation: 'Paraphrase: "reversed nuclear age markers" -> "Cellular aging traits were rolled back", "without triggering oncogenic mutations" -> "without inducing cancerous growths".',
      distractors: [
        {
          id: 'dis-01',
          type: 'polarity_inversion',
          text: 'The intervention inevitably triggered oncogenic mutations across all treated mammalian samples.',
          trapMechanismRationale: 'Đảo cực tính: Chuyển từ "without triggering" thành "inevitably triggered".',
          whyItDeceivesBand6: 'Chứa toàn bộ từ khóa kỹ thuật "oncogenic mutations" và "mammalian samples".'
        },
        {
          id: 'dis-02',
          type: 'half_truth',
          text: 'Researchers successfully reversed nuclear age markers, permanently curing all forms of mammalian senescence.',
          trapMechanismRationale: 'Đúng nửa đầu ("reversed nuclear age markers"), sai và phóng đại nửa đuôi ("permanently curing all senescence").',
          whyItDeceivesBand6: 'Nửa đầu trùng khớp 100% với văn bản gốc.'
        },
        {
          id: 'dis-03',
          type: 'unwarranted_extrapolation',
          text: 'Epigenetic reprogramming will soon enable humans to extend their lifespans beyond 150 years.',
          trapMechanismRationale: 'Suy diễn ngoài đời (Not Given): Cảm giác rất logic và lạc quan ngoài đời, nhưng bài đọc chỉ nói về mô động vật có vú trong phòng thí nghiệm.',
          whyItDeceivesBand6: 'Đánh trúng kỳ vọng kéo dài tuổi thọ của con người mà không căn cứ vào văn bản.'
        }
      ]
    }
  },
  {
    id: 'rec-03',
    cambridgeRef: 'Cambridge 19 Test 4 Passage 3',
    topicDomain: 'Urban Microclimates',
    passageTitle: 'Aerodynamic Urban Geometry and Vortex Heat Dispersion',
    passageText: 'Urban canyon geometry substantially dictates localized convective heat dissipation in equatorial metropolises. Tall, staggered high-rises create dynamic wind corridors that channel high-altitude laminar winds down to pedestrian street levels. While this aerodynamic layout accelerates evaporative cooling during sweltering midday hours, it exacerbates particulate matter suspension if vehicular traffic volume exceeds threshold capacities.',
    targetSourceSentence: 'While this aerodynamic layout accelerates evaporative cooling during sweltering midday hours, it exacerbates particulate matter suspension if vehicular traffic volume exceeds threshold capacities.',
    modelItemDraft: {
      questionPrompt: 'What is a drawback of using staggered high-rise geometry in urban planning?',
      modelKey: 'It may intensify the circulation of airborne dust when road traffic is congested.',
      keyParaphraseExplanation: 'Paraphrase: "exacerbates particulate matter suspension if traffic volume exceeds threshold" -> "intensify circulation of airborne dust when road traffic is congested".',
      distractors: [
        {
          id: 'dis-01',
          type: 'polarity_inversion',
          text: 'It completely fails to facilitate evaporative cooling during midday hours.',
          trapMechanismRationale: 'Đảo cực tính phủ định vế đầu đúng ("accelerates evaporative cooling").',
          whyItDeceivesBand6: 'Khóa vào từ khóa "evaporative cooling" và "midday hours".'
        },
        {
          id: 'dis-02',
          type: 'half_truth',
          text: 'It accelerates midday cooling, which directly eliminates all vehicular pollution.',
          trapMechanismRationale: 'Đúng nửa đầu ("accelerates midday cooling"), nhưng bịa đặt nửa đuôi ("eliminates all pollution").',
          whyItDeceivesBand6: 'Thí sinh bị lừa bởi nửa đầu hoàn toàn chính xác.'
        },
        {
          id: 'dis-03',
          type: 'scope_escalation',
          text: 'High-rise aerodynamic layouts invariably produce toxic smog regardless of vehicle numbers.',
          trapMechanismRationale: 'Tuyệt đối hóa: Bỏ qua điều kiện "if vehicular traffic exceeds threshold" thành "invariably regardless of vehicle numbers".',
          whyItDeceivesBand6: 'Xóa bỏ mệnh đề điều kiện "if" để biến thành phát biểu cực đoan.'
        }
      ]
    }
  }
];

export const MOCK_DISTRACTOR_TAGGING_DRILLS: DistractorTaggingDrillItem[] = [
  {
    id: 'dtd-01',
    questionNumber: 1,
    sourceContext: 'Passage excerpt: "Early hominids did not possess complex syntax; however, their vocal tract morphology permitted a diverse repertoire of tonal emotional modulations."',
    questionStem: 'Which statement accurately reflects the vocal capacity of early hominids?',
    correctOptionId: 'opt-b',
    options: [
      {
        id: 'opt-a',
        text: 'Early hominids completely lacked the anatomical ability to produce tonal sounds.',
        isKey: false,
        assignedTrapType: 'polarity_inversion',
        explanationVi: 'Đảo Cực Tính: Bài đọc nói "permitted a diverse repertoire", phương án dùng "completely lacked the anatomical ability".'
      },
      {
        id: 'opt-b',
        text: 'Their anatomical structures enabled them to generate varied emotional pitches.',
        isKey: true,
        explanationVi: 'Đáp án Đúng (Key): Paraphrase chuẩn xác "vocal tract morphology permitted diverse tonal emotional modulations".'
      },
      {
        id: 'opt-c',
        text: 'They possessed rudimentary tonal modulations, which allowed them to formulate intricate grammatical rules.',
        isKey: false,
        assignedTrapType: 'half_truth',
        explanationVi: 'Đúng Một Nửa: Nửa đầu đúng, nhưng nửa sau bịa đặt quan hệ với "intricate grammatical rules" (trái với "did not possess complex syntax").'
      },
      {
        id: 'opt-d',
        text: 'Their tonal vocalizations were solely used to coordinate hunting strategies against predators.',
        isKey: false,
        assignedTrapType: 'unwarranted_extrapolation',
        explanationVi: 'Suy Diễn Ngoài Bài (Not Given): Bài đọc không hề đề cập đến "hunting strategies against predators".'
      }
    ]
  },
  {
    id: 'dtd-02',
    questionNumber: 2,
    sourceContext: 'Passage excerpt: "Under laboratory conditions, graphene membranes can filter minuscule salt ions with high throughput, though scaling this process to industrial desalination plants remains economically prohibitive."',
    questionStem: 'What is currently true about graphene membrane technology?',
    correctOptionId: 'opt-c',
    options: [
      {
        id: 'opt-a',
        text: 'Graphene filtration has already been successfully commercialized across all global desalination facilities.',
        isKey: false,
        assignedTrapType: 'scope_escalation',
        explanationVi: 'Tuyệt Đối Hóa Phạm Vi: Bài đọc nói chỉ ở "laboratory conditions" và "scaling remains economically prohibitive".'
      },
      {
        id: 'opt-b',
        text: 'Graphene membranes proved unable to separate minuscule salt ions even in controlled experiments.',
        isKey: false,
        assignedTrapType: 'polarity_inversion',
        explanationVi: 'Đảo Cực Tính: Bài đọc khẳng định "can filter minuscule salt ions with high throughput".'
      },
      {
        id: 'opt-c',
        text: 'It demonstrates effective salt extraction in tests, but commercial expansion is too costly at present.',
        isKey: true,
        explanationVi: 'Đáp án Đúng (Key): Paraphrase trọn vẹn cả 2 vế của câu gốc.'
      },
      {
        id: 'opt-d',
        text: 'It can filter salt ions at high throughput, thereby permanently resolving the Middle East water crisis.',
        isKey: false,
        assignedTrapType: 'half_truth',
        explanationVi: 'Đúng Một Nửa: Nửa đầu đúng, nửa đuôi gán ghép suy diễn phóng đại.'
      }
    ]
  }
];
