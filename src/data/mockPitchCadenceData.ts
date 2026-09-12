/**
 * Mock Data for Bio-Acoustic Pitch Contour & Anti-Uptalk Studio (Step 82)
 * 15 Authentic Speaking Part 3 Prompts with Native RP Pitch Lines and Tonic Stress Coordinates
 */

import { PitchDataPoint } from "@/lib/pitchTrackerEngine";

export interface SpeakingPart3PitchExercise {
  id: string;
  topic: string;
  question: string;
  nativeModelAnswer: string;
  tonicNuclearSyllable: string;
  nuclearStressExplanation: string;
  nativePitchTimeline: PitchDataPoint[];
  faultyUptalkPitchTimeline: PitchDataPoint[];
  durationSec: number;
}

export const MOCK_PITCH_EXERCISES: SpeakingPart3PitchExercise[] = [
  {
    id: "pitch_01_automation_tax",
    topic: "Macroeconomics & Artificial Intelligence",
    question: "Do you believe governments should impose specific automation taxes on corporations that replace human workers with AI?",
    nativeModelAnswer: "Such fiscal levies are indispensable to prevent widespread economic displacement.",
    tonicNuclearSyllable: "dis-PLACE-ment",
    nuclearStressExplanation: "Trọng âm hạt nhân (Tonic Nuclear Stress) rơi vào âm tiết 'PLACE' của từ 'displacement' (đạt đỉnh 215 Hz), sau đó hạ dứt khoát 45 Hz về mức 120 Hz ở âm tiết đuôi 'ment'.",
    durationSec: 3.5,
    nativePitchTimeline: [
      { timeSec: 0.2, pitchHz: 140, confidence: 0.9 },
      { timeSec: 0.5, pitchHz: 155, confidence: 0.92 },
      { timeSec: 0.8, pitchHz: 160, confidence: 0.95 },
      { timeSec: 1.2, pitchHz: 175, confidence: 0.94 },
      { timeSec: 1.6, pitchHz: 165, confidence: 0.9 },
      { timeSec: 2.1, pitchHz: 190, confidence: 0.96 }, // Tonic Peak on "disPLACE"
      { timeSec: 2.5, pitchHz: 215, confidence: 0.98 },
      { timeSec: 2.9, pitchHz: 160, confidence: 0.95 }, // Decisive Fall
      { timeSec: 3.2, pitchHz: 125, confidence: 0.92 },
      { timeSec: 3.4, pitchHz: 110, confidence: 0.9 }
    ],
    faultyUptalkPitchTimeline: [
      { timeSec: 0.2, pitchHz: 140, confidence: 0.9 },
      { timeSec: 0.5, pitchHz: 155, confidence: 0.92 },
      { timeSec: 1.2, pitchHz: 160, confidence: 0.95 },
      { timeSec: 2.1, pitchHz: 150, confidence: 0.9 },
      { timeSec: 2.5, pitchHz: 165, confidence: 0.92 },
      { timeSec: 2.9, pitchHz: 195, confidence: 0.94 }, // Faulty Uptalk Surge
      { timeSec: 3.2, pitchHz: 235, confidence: 0.96 }, // Questioning inflection (+40Hz)
      { timeSec: 3.4, pitchHz: 245, confidence: 0.9 }
    ]
  },
  {
    id: "pitch_02_environmental_duty",
    topic: "Environmental Governance",
    question: "Should individuals or multinational corporations bear the primary burden of climate mitigation?",
    nativeModelAnswer: "Corporate actors must shoulder the predominant financial obligation.",
    tonicNuclearSyllable: "ob-li-GA-tion",
    nuclearStressExplanation: "Đỉnh cao độ rơi vào 'GA' (220 Hz) và đổ dốc sâu xuống 'tion' (115 Hz). Tạo uy quyền tri thức tuyệt đối, không có hiện tượng vểnh cao độ.",
    durationSec: 3.2,
    nativePitchTimeline: [
      { timeSec: 0.2, pitchHz: 145, confidence: 0.9 },
      { timeSec: 0.6, pitchHz: 160, confidence: 0.92 },
      { timeSec: 1.1, pitchHz: 150, confidence: 0.93 },
      { timeSec: 1.7, pitchHz: 170, confidence: 0.95 },
      { timeSec: 2.2, pitchHz: 220, confidence: 0.98 }, // Nuclear Peak on "obliGAtion"
      { timeSec: 2.7, pitchHz: 155, confidence: 0.94 }, // Decisive Fall
      { timeSec: 3.0, pitchHz: 115, confidence: 0.91 }
    ],
    faultyUptalkPitchTimeline: [
      { timeSec: 0.2, pitchHz: 145, confidence: 0.9 },
      { timeSec: 0.6, pitchHz: 150, confidence: 0.9 },
      { timeSec: 1.7, pitchHz: 155, confidence: 0.9 },
      { timeSec: 2.2, pitchHz: 175, confidence: 0.92 },
      { timeSec: 2.7, pitchHz: 205, confidence: 0.95 }, // Uptalk Anomaly
      { timeSec: 3.0, pitchHz: 240, confidence: 0.93 }
    ]
  },
  {
    id: "pitch_03_algorithmic_curation",
    topic: "Social Media & Public Discourse",
    question: "How does algorithmic content filtering influence democratic decision-making among citizens?",
    nativeModelAnswer: "It systematically reinforces confirmation bias across the electorate.",
    tonicNuclearSyllable: "e-LEC-tor-ate",
    nuclearStressExplanation: "Đỉnh rơi vào 'LEC' (210 Hz), hạ dứt khoát qua 'tor-ate' xuống 120 Hz.",
    durationSec: 3.4,
    nativePitchTimeline: [
      { timeSec: 0.3, pitchHz: 140, confidence: 0.9 },
      { timeSec: 0.8, pitchHz: 165, confidence: 0.92 },
      { timeSec: 1.4, pitchHz: 155, confidence: 0.9 },
      { timeSec: 2.0, pitchHz: 180, confidence: 0.95 },
      { timeSec: 2.5, pitchHz: 210, confidence: 0.98 },
      { timeSec: 2.9, pitchHz: 150, confidence: 0.93 },
      { timeSec: 3.3, pitchHz: 120, confidence: 0.9 }
    ],
    faultyUptalkPitchTimeline: [
      { timeSec: 0.3, pitchHz: 140, confidence: 0.9 },
      { timeSec: 1.4, pitchHz: 150, confidence: 0.9 },
      { timeSec: 2.5, pitchHz: 170, confidence: 0.92 },
      { timeSec: 2.9, pitchHz: 210, confidence: 0.95 },
      { timeSec: 3.3, pitchHz: 250, confidence: 0.9 }
    ]
  }
];
