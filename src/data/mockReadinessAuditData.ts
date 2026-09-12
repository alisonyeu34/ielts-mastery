/**
 * Mock Data & Calibration Benchmarks for Cambridge 7.5 Readiness Certification
 * Step 99 / 100 - Unified Telemetry Orchestrator & Certification Engine
 */

import { VectorMetrics } from '@/lib/readinessEvaluator';

export interface ReadinessPresetScenario {
  id: string;
  labelVi: string;
  subtitleVi: string;
  expectedBand: number;
  expectedCRI: number;
  metrics: VectorMetrics;
}

export const MOCK_READINESS_SCENARIOS: ReadinessPresetScenario[] = [
  {
    id: 'scenario_master_75',
    labelVi: 'Hồ Sơ Chuẩn: Sẵn Sàng Vượt Vũ Môn Band 7.5 - 8.5+ (CRI 93%)',
    subtitleVi: 'Hội tụ đầy đủ 5 vector: Lý thuyết 100%, 570 AWL S>=30d, Sạch lỗi sai, Mock Test 7.5+ và Sức bền 3h.',
    expectedBand: 8.0,
    expectedCRI: 93,
    metrics: {
      theoryMastery: 98,
      fsrsStability: 94,
      errorExtinction: 92,
      mockConvergence: 90,
      staminaScore: 92
    }
  },
  {
    id: 'scenario_approaching_70',
    labelVi: 'Hồ Sơ Tiềm Năng: Chạm Ngưỡng 7.0 (CRI 77% - Cần Triage Lỗi)',
    subtitleVi: 'Lý thuyết vững (90%) nhưng còn sót 15% lỗi sai trong Error Bank và Mock Delta còn 0.6 band.',
    expectedBand: 7.0,
    expectedCRI: 77,
    metrics: {
      theoryMastery: 90,
      fsrsStability: 80,
      errorExtinction: 72,
      mockConvergence: 74,
      staminaScore: 78
    }
  },
  {
    id: 'scenario_phase2_mid',
    labelVi: 'Hồ Sơ Đang Tích Lũy: Band 6.0 - 6.5 (CRI 62% - Thiếu Sức Bền)',
    subtitleVi: 'Vốn từ AWL chưa khóa hạn FSRS và dễ suy sụp nhận thức khi làm bài 180 phút liên tục.',
    expectedBand: 6.5,
    expectedCRI: 62,
    metrics: {
      theoryMastery: 75,
      fsrsStability: 60,
      errorExtinction: 58,
      mockConvergence: 64,
      staminaScore: 55
    }
  }
];

export const CAMBRIDGE_75_BENCHMARKS = {
  vectorWeights: {
    theoryMastery: 0.15,
    fsrsStability: 0.20,
    errorExtinction: 0.25,
    mockConvergence: 0.25,
    staminaScore: 0.15
  },
  targetThresholds: {
    theoryMastery: 85,
    fsrsStability: 90,
    errorExtinction: 90,
    mockConvergence: 85,
    staminaScore: 85,
    minCRIForCertification: 88
  }
};
