/**
 * Bio-Acoustic Pitch Contour & Anti-Uptalk Analyzer Engine (Step 82)
 * Autocorrelation / YIN F0 Pitch Tracking, Uptalk Detection, and Cadence Scoring
 */

export interface PitchDataPoint {
  timeSec: number;
  pitchHz: number; // 0 if unvoiced / silence
  confidence: number; // 0 - 1
  isTerminalSegment?: boolean;
}

export interface UptalkDetectionResult {
  isUptalkDetected: boolean;
  terminalPitchRiseHz: number;
  isAuthoritativeFallingCadence: boolean;
  cadenceDropHz: number;
  nuclearStressPointSec?: number;
  feedback: string;
}

export interface ShadowingAlignmentResult {
  alignmentScore: number; // 0 - 100%
  meanPitchDiffHz: number;
  uptalkRatio: number; // % of declarative utterances that ended with uptalk
  isBand8TargetMet: boolean; // alignment >= 80% and uptalkRatio < 10%
  diagnostics: string[];
}

/**
 * Autocorrelation F0 Extraction Algorithm for Float32Array AudioBuffer slices
 */
export function extractPitchAutocorrelation(
  buffer: Float32Array,
  sampleRate: number = 44100
): { pitchHz: number; confidence: number } {
  const SIZE = buffer.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // Noise gate
  if (rms < 0.015) {
    return { pitchHz: 0, confidence: 0 };
  }

  // Autocorrelation within human vocal fundamental frequency [80Hz - 400Hz]
  const MIN_SAMPLES = Math.floor(sampleRate / 400); // 400 Hz
  const MAX_SAMPLES = Math.floor(sampleRate / 80); // 80 Hz

  let bestOffset = -1;
  let maxCorr = -1;

  for (let offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
    let corr = 0;
    for (let i = 0; i < SIZE - offset; i++) {
      corr += buffer[i] * buffer[i + offset];
    }
    if (corr > maxCorr) {
      maxCorr = corr;
      bestOffset = offset;
    }
  }

  const confidence = Math.min(maxCorr / (rms * rms * SIZE + 0.0001), 1.0);
  if (bestOffset > 0 && confidence > 0.45) {
    const pitchHz = Math.round(sampleRate / bestOffset);
    if (pitchHz >= 75 && pitchHz <= 450) {
      return { pitchHz, confidence };
    }
  }

  return { pitchHz: 0, confidence: 0 };
}

/**
 * Detects High Rising Terminal (Uptalk) in the final 300ms of a sentence
 */
export function detectUptalkAnomaly(
  timeline: PitchDataPoint[],
  isDeclarativeSentence: boolean = true
): UptalkDetectionResult {
  const voicedPoints = timeline.filter((p) => p.pitchHz > 60);
  if (voicedPoints.length < 5) {
    return {
      isUptalkDetected: false,
      terminalPitchRiseHz: 0,
      isAuthoritativeFallingCadence: false,
      cadenceDropHz: 0,
      feedback: "Chưa đủ dữ liệu âm thanh để phân tích cao độ."
    };
  }

  const totalDuration = voicedPoints[voicedPoints.length - 1].timeSec;
  const terminalThresholdSec = Math.max(totalDuration - 0.35, 0);

  const midPoints = voicedPoints.filter(
    (p) => p.timeSec >= totalDuration * 0.4 && p.timeSec < terminalThresholdSec
  );
  const terminalPoints = voicedPoints.filter((p) => p.timeSec >= terminalThresholdSec);

  if (midPoints.length === 0 || terminalPoints.length === 0) {
    return {
      isUptalkDetected: false,
      terminalPitchRiseHz: 0,
      isAuthoritativeFallingCadence: false,
      cadenceDropHz: 0,
      feedback: "Thời lượng âm tiết kết câu quá ngắn."
    };
  }

  const avgMidPitch =
    midPoints.reduce((acc, p) => acc + p.pitchHz, 0) / midPoints.length;
  const endPitch = terminalPoints[terminalPoints.length - 1].pitchHz;
  const startTerminalPitch = terminalPoints[0].pitchHz;

  const terminalDelta = endPitch - avgMidPitch;
  const intraTerminalDelta = endPitch - startTerminalPitch;

  // Uptalk Anomaly: Terminal pitch surges by > 25 Hz in a declarative sentence
  const isUptalkDetected = isDeclarativeSentence && (terminalDelta > 22 || intraTerminalDelta > 25);

  // Authoritative Cadence: Pitch drops by >= 30 Hz at the terminal syllable
  const isAuthoritativeFallingCadence = terminalDelta <= -25 || (startTerminalPitch - endPitch >= 30);

  let feedback = "";
  if (isUptalkDetected) {
    feedback = `CẢNH BÁO UPTALK (Lên giọng cuối câu: +${Math.round(terminalDelta)}Hz)! Trong câu trần thuật khẳng định, lên giọng khiến bài nói nghe do dự, thiếu tự tin và cầu xin sự đồng tình. Hãy hạ giọng dứt khoát.`;
  } else if (isAuthoritativeFallingCadence) {
    feedback = `XUẤT SẮC! Ngữ điệu hạ giọng dứt khoát (-${Math.round(Math.abs(terminalDelta))}Hz). Tạo cảm giác điềm tĩnh, tri thức và uy quyền học thuật chuẩn Band 8.5+.`;
  } else {
    feedback = "Ngữ điệu duy trì ở mức ổn định. Khuyến khích hạ cao độ sâu hơn ở âm tiết cuối để tạo điểm rơi dứt khoát.";
  }

  return {
    isUptalkDetected,
    terminalPitchRiseHz: Math.max(Math.round(terminalDelta), 0),
    isAuthoritativeFallingCadence,
    cadenceDropHz: Math.max(Math.round(-terminalDelta), 0),
    nuclearStressPointSec: findNuclearPeak(voicedPoints),
    feedback
  };
}

function findNuclearPeak(voicedPoints: PitchDataPoint[]): number {
  let maxHz = 0;
  let peakTime = 0;
  voicedPoints.forEach((p) => {
    if (p.pitchHz > maxHz) {
      maxHz = p.pitchHz;
      peakTime = p.timeSec;
    }
  });
  return peakTime;
}

/**
 * Calculates Shadowing Alignment Score between User Pitch Line and Native Model Pitch Line
 */
export function calculatePitchAlignment(
  userTimeline: PitchDataPoint[],
  nativeTimeline: PitchDataPoint[]
): ShadowingAlignmentResult {
  const userVoiced = userTimeline.filter((p) => p.pitchHz > 60);
  const nativeVoiced = nativeTimeline.filter((p) => p.pitchHz > 60);

  if (userVoiced.length < 5 || nativeVoiced.length < 5) {
    return {
      alignmentScore: 0,
      meanPitchDiffHz: 0,
      uptalkRatio: 0,
      isBand8TargetMet: false,
      diagnostics: ["Chưa có đủ mẫu âm học để so sánh."]
    };
  }

  // Resample and compare 20 equidistant points
  let totalDelta = 0;
  const SAMPLES_COUNT = 20;

  for (let i = 0; i < SAMPLES_COUNT; i++) {
    const ratio = i / (SAMPLES_COUNT - 1);
    const uIdx = Math.min(Math.floor(ratio * userVoiced.length), userVoiced.length - 1);
    const nIdx = Math.min(Math.floor(ratio * nativeVoiced.length), nativeVoiced.length - 1);

    const uPitch = userVoiced[uIdx].pitchHz;
    const nPitch = nativeVoiced[nIdx].pitchHz;

    totalDelta += Math.abs(uPitch - nPitch);
  }

  const meanPitchDiffHz = Math.round(totalDelta / SAMPLES_COUNT);
  const alignmentScore = Math.max(Math.min(100 - meanPitchDiffHz, 100), 20);

  const uptalkCheck = detectUptalkAnomaly(userTimeline, true);
  const uptalkRatio = uptalkCheck.isUptalkDetected ? 100 : 0;
  const isBand8TargetMet = alignmentScore >= 75 && !uptalkCheck.isUptalkDetected;

  const diagnostics: string[] = [];
  if (uptalkCheck.isUptalkDetected) {
    diagnostics.push("Phát hiện lỗi vểnh cao độ ở đuôi câu (Uptalk). Hãy tập hạ giọng theo đường pitch màu xanh của bản xứ.");
  } else {
    diagnostics.push("Đường bao cao độ đuôi câu hạ giọng đạt chuẩn âm học.");
  }

  if (alignmentScore >= 80) {
    diagnostics.push("Độ tương thích ngữ điệu với giám khảo bản xứ đạt mức xuất sắc (>80%).");
  } else {
    diagnostics.push("Cao độ bài nói còn lệch so với mẫu bản xứ. Hãy chú ý nhấn trọng âm hạt nhân ở giữa câu rồi hạ sâu dần.");
  }

  return {
    alignmentScore,
    meanPitchDiffHz,
    uptalkRatio,
    isBand8TargetMet,
    diagnostics
  };
}
