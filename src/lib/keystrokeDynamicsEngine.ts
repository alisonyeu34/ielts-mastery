/**
 * 3-Hour Cognitive Stamina & Keystroke Dynamics Telemetry Engine
 * IELTS Exam Ergonomics & Mental Fatigue Management (Band 7.5 - 8.5+)
 */

export interface KeystrokeSample {
  timestamp: number;
  key: string;
  flightTimeMs: number; // Interval from previous keyup to this keydown
  isCorrection: boolean; // Backspace or Delete
}

export interface CognitiveTelemetryMetrics {
  elapsedSeconds: number;
  elapsedMinutes: number;
  currentWpm: number;
  totalKeystrokes: number;
  backspaceCount: number;
  meanFlightTimeMs: number;
  baselineFlightTimeMs: number;
  prolongedPauseCount: number; // Pauses > 3.0s
  brainFogFactor: number; // 0 - 100 (BFF)
  fatigueZone: 'optimal' | 'moderate' | 'strain' | 'critical_fog';
  fatigueLabelVi: string;
  isMicroResetRecommended: boolean;
  activeExamSection: 'listening' | 'reading' | 'writing_task1' | 'writing_task2';
}

export interface CognitiveCurvePoint {
  minute: number;
  examSection: string;
  brainFogFactor: number;
  wpm: number;
  syntaxDecayRisk: number; // 0 - 100%
}

export const EXAM_TIMELINE_STAGES = [
  {
    id: 'listening',
    name: 'Listening (Sections 1-4)',
    startMin: 0,
    endMin: 40,
    description: 'Thính giác cao độ & Bắt bẫy âm thanh',
    expectedCognitiveLoad: 'Moderate (30-45 BFF)'
  },
  {
    id: 'reading',
    name: 'Reading (Passages 1-3)',
    startMin: 40,
    endMin: 100,
    description: 'Xử lý văn bản dày đặc & Bóc tách câu phức C1/C2',
    expectedCognitiveLoad: 'High (45-60 BFF)'
  },
  {
    id: 'writing_task1',
    name: 'Writing Task 1',
    startMin: 100,
    endMin: 120,
    description: 'Tổng hợp số liệu & Cú pháp bị động/so sánh',
    expectedCognitiveLoad: 'Severe Strain (60-70 BFF)'
  },
  {
    id: 'writing_task2',
    name: 'Writing Task 2 (Peak Exhaustion)',
    startMin: 120,
    endMin: 180,
    description: 'Lập luận triết học/xã hội dưới tình trạng cạn kiệt glucose não bộ',
    expectedCognitiveLoad: 'Critical Brain Fog Zone (70-85+ BFF)'
  }
];

/**
 * Calculates Brain Fog Factor (BFF) based on keystroke telemetry
 */
export function calculateBrainFogFactor(
  meanFlightTimeMs: number,
  baselineFlightTimeMs: number,
  backspaceCount: number,
  totalKeystrokes: number,
  prolongedPauses: number
): number {
  if (totalKeystrokes < 10) return 20;

  const baseline = baselineFlightTimeMs > 0 ? baselineFlightTimeMs : 140;
  const flightRatio = Math.min(2.5, Math.max(0.5, meanFlightTimeMs / baseline));
  const correctionRatio = Math.min(1, backspaceCount / totalKeystrokes);
  const pauseFactor = Math.min(15, prolongedPauses * 1.5);

  // BFF Formula: (FlightRatio * 35) + (CorrectionRatio * 50) + PauseFactor
  const rawScore = (flightRatio * 35) + (correctionRatio * 50) + pauseFactor;
  return Math.min(100, Math.max(10, Math.round(rawScore)));
}

/**
 * Evaluates cognitive fatigue zone
 */
export function evaluateFatigueZone(bff: number): {
  zone: CognitiveTelemetryMetrics['fatigueZone'];
  labelVi: string;
  colorClass: string;
  recommendReset: boolean;
} {
  if (bff < 40) {
    return {
      zone: 'optimal',
      labelVi: 'Tỉnh Táo Cao Độ (Peak Focus)',
      colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      recommendReset: false
    };
  }
  if (bff < 58) {
    return {
      zone: 'moderate',
      labelVi: 'Bền Bỉ Ổn Định (Sustainable Stamina)',
      colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      recommendReset: false
    };
  }
  if (bff < 68) {
    return {
      zone: 'strain',
      labelVi: 'Căng Thẳng Nhận Thức (Cognitive Strain)',
      colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      recommendReset: false
    };
  }
  return {
    zone: 'critical_fog',
    labelVi: 'Sương Mù Não / Kiệt Sức (Critical Brain Fog)',
    colorClass: 'text-rose-400 bg-rose-500/10 border-rose-500/40 animate-pulse',
    recommendReset: true
  };
}

/**
 * Generates initial 180-minute curve simulation data
 */
export function generateBaselineCurveData(currentBff: number, elapsedMinutes: number): CognitiveCurvePoint[] {
  const points: CognitiveCurvePoint[] = [];
  const totalMinutes = 180;

  for (let m = 0; m <= totalMinutes; m += 10) {
    let section = 'Listening';
    let baseBff = 25;
    let baseWpm = 52;

    if (m >= 40 && m < 100) {
      section = 'Reading';
      baseBff = 42 + (m - 40) * 0.25;
      baseWpm = 48;
    } else if (m >= 100 && m < 120) {
      section = 'Writing Task 1';
      baseBff = 58 + (m - 100) * 0.5;
      baseWpm = 40;
    } else if (m >= 120) {
      section = 'Writing Task 2';
      baseBff = 68 + (m - 120) * 0.3;
      baseWpm = 34;
    }

    // Blend with real-time measured BFF if past elapsed time
    if (m <= elapsedMinutes) {
      baseBff = Math.round((baseBff + currentBff) / 2);
    }

    const syntaxDecay = Math.min(95, Math.round(baseBff * 0.95));

    points.push({
      minute: m,
      examSection: section,
      brainFogFactor: Math.min(100, Math.round(baseBff)),
      wpm: Math.max(20, Math.round(baseWpm - (baseBff * 0.15))),
      syntaxDecayRisk: syntaxDecay
    });
  }

  return points;
}
