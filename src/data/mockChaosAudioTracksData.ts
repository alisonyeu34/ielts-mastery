/**
 * Mock Data for High-Fidelity Ambient Acoustic Chaos Simulation
 * Step 98 / 100 - Sensory Stress Inoculation & Acoustic Telemetry (Band 7.5 - 8.5+)
 */

export interface ChaosQuestionItem {
  id: string;
  questionNumber: number;
  stem: string;
  expectedKeyword: string;
  options?: string[]; // If MCQ
  correctOptionId?: string;
  timestampSec: number;
  snrBenchmarkDb: number; // The target noise level at this timestamp
  acousticVulnerabilityVi: string;
}

export interface ChaosExamTrack {
  id: string;
  title: string;
  sectionType: 'section_3_dialogue' | 'section_4_lecture';
  cambridgeRef: string;
  topicDomain: string;
  durationSeconds: number;
  audioScriptMarkdown: string;
  questions: ChaosQuestionItem[];
}

export const MOCK_CHAOS_EXAM_TRACKS: ChaosExamTrack[] = [
  {
    id: 'chaos-s4-01',
    title: 'Listening Section 4: Anthropogenic Ambient Noise & Marine Biosystems',
    sectionType: 'section_4_lecture',
    cambridgeRef: 'Cambridge 18 Test 4 Section 4',
    topicDomain: 'Bio-Acoustics & Marine Ecology',
    durationSeconds: 180,
    audioScriptMarkdown: `
Good morning, everyone. In today's lecture on Marine Bio-Acoustics, we examine the severe auditory disruption caused by commercial shipping and naval sonar operations.

Unlike terrestrial mammals, cetaceans rely almost exclusively on low-frequency echolocation for foraging and long-distance navigation. When container vessels navigate shallow straits, their massive propeller cavitation produces continuous broadband noise between twenty and two hundred Hertz.

Recent underwater telemetry recorded in the North Atlantic indicates that this ambient background hum forces right whales to increase the amplitude of their contact calls by roughly twelve decibels—a phenomenon known biologically as the **Lombard effect**.

Furthermore, high-intensity military tactical sonar triggers profound disorientation. Autopsies of stranded beaked whales have revealed microscopic hemorrhages in the **auditory bulla**, directly caused by rapid decompression when panicking animals surface too abruptly.
    `,
    questions: [
      {
        id: 'cq-01',
        questionNumber: 31,
        stem: 'Cetaceans depend on low-frequency echolocation primarily for foraging and ______ navigation.',
        expectedKeyword: 'long-distance',
        timestampSec: 28,
        snrBenchmarkDb: 15,
        acousticVulnerabilityVi: 'Âm ghép có gạch nối "long-distance", dễ bị át bởi tiếng gõ bàn phím nhịp nhanh.'
      },
      {
        id: 'cq-02',
        questionNumber: 32,
        stem: 'Continuous broadband noise is produced in shallow straits by vessel propeller ______.',
        expectedKeyword: 'cavitation',
        timestampSec: 54,
        snrBenchmarkDb: 12,
        acousticVulnerabilityVi: 'Thuật ngữ học thuật "cavitation" (/ˌkæv.ɪˈteɪ.ʃən/), dễ nhầm với "gravitation" dưới tiếng ù thông gió HVAC.'
      },
      {
        id: 'cq-03',
        questionNumber: 33,
        stem: 'The biological adaptation where whales raise their call volume in noise is called the ______ effect.',
        expectedKeyword: 'Lombard',
        timestampSec: 92,
        snrBenchmarkDb: 8,
        acousticVulnerabilityVi: 'Tên riêng khoa học "Lombard", dễ bị mất âm đuôi /-d/ khi có tiếng ho hoặc sột soạt giấy nháp.'
      },
      {
        id: 'cq-04',
        questionNumber: 34,
        stem: 'Microscopic hemorrhages in stranded beaked whales were discovered inside the auditory ______.',
        expectedKeyword: 'bulla',
        timestampSec: 135,
        snrBenchmarkDb: 4,
        acousticVulnerabilityVi: 'Vùng SNR cực thấp (4dB): Từ "bulla" (/ˈbʊl.ə/) rất ngắn, đòi hỏi thính giác tập trung tuyệt đối để không bị lấn át.'
      }
    ]
  },
  {
    id: 'chaos-s3-01',
    title: 'Listening Section 3: Renewable Kinetic Harvesting in Architecture',
    sectionType: 'section_3_dialogue',
    cambridgeRef: 'Cambridge 17 Test 3 Section 3',
    topicDomain: 'Sustainable Engineering & Piezoelectrics',
    durationSeconds: 160,
    audioScriptMarkdown: `
**Professor Vance:** Come in, Chloe, Liam. Let's review your proposal on harvesting pedestrian kinetic energy in urban railway terminals.

**Liam:** Thanks, Professor. Our main roadblock is that standard piezoelectric sub-floor tiles degrade rapidly under continuous heavy pedestrian footfall.

**Chloe:** That's right. However, we found that integrating **electromagnetic suspension** dampeners directly under the central turnstiles absorbs shock while generating steady micro-currents.

**Professor Vance:** Interesting. But what is your strategy for storing those intermittent electrical surges safely without overheating the battery arrays?

**Liam:** We've incorporated solid-state **graphene ultracapacitors**, which boast an energy discharge cycle twenty times faster than conventional lithium-ion cells.
    `,
    questions: [
      {
        id: 'cq-05',
        questionNumber: 21,
        stem: 'Standard piezoelectric floor tiles suffer rapid degradation under continuous pedestrian ______.',
        expectedKeyword: 'footfall',
        timestampSec: 32,
        snrBenchmarkDb: 14,
        acousticVulnerabilityVi: 'Từ ghép "footfall", âm đầu /f/ nhẹ dễ bị tiếng click chuột cơ học lấn át.'
      },
      {
        id: 'cq-06',
        questionNumber: 22,
        stem: 'Shock absorption and micro-currents are achieved using ______ suspension dampeners.',
        expectedKeyword: 'electromagnetic',
        timestampSec: 68,
        snrBenchmarkDb: 10,
        acousticVulnerabilityVi: 'Tính từ dài 6 âm tiết "electromagnetic", nguy cơ rơi âm tiết giữa khi bị phân tâm.'
      },
      {
        id: 'cq-07',
        questionNumber: 23,
        stem: 'Intermittent electrical surges are safely buffered using graphene ______.',
        expectedKeyword: 'ultracapacitors',
        timestampSec: 120,
        snrBenchmarkDb: 5,
        acousticVulnerabilityVi: 'Từ chuyên ngành "ultracapacitors" ở mức SNR khắc nghiệt (5dB).'
      }
    ]
  }
];
