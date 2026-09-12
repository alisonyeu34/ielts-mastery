/**
 * Pitch Detection Engine (Autocorrelation DSP & Terminal Intonation Analyzer)
 * Identifies fundamental voice frequency F0 and detects terminal falling pitch vs Uptalk error.
 */

export interface PitchAnalysisResult {
  direction: "falling" | "rising_uptalk" | "flat" | "insufficient_data";
  slope: number;
  startPitch: number;
  endPitch: number;
  deltaHz: number;
  messageVi: string;
  isUptalk: boolean;
  isAuthoritative: boolean;
}

/**
 * Autocorrelation algorithm to calculate fundamental frequency F0 (in Hz)
 * Range for human vocal fundamental frequency: 80Hz - 400Hz.
 */
export function autoCorrelate(
  buffer: Float32Array,
  sampleRate: number
): number {
  const size = buffer.length;
  let sumOfSquares = 0;

  for (let i = 0; i < size; i++) {
    const val = buffer[i];
    sumOfSquares += val * val;
  }

  const rms = Math.sqrt(sumOfSquares / size);
  // Silence or ambient noise threshold
  if (rms < 0.01) {
    return -1;
  }

  // Clip limits based on human pitch boundaries
  const minPeriod = Math.floor(sampleRate / 400); // 400 Hz
  const maxPeriod = Math.floor(sampleRate / 80); // 80 Hz

  let bestPeriod = -1;
  let bestCorrelation = 0;

  for (let period = minPeriod; period <= maxPeriod; period++) {
    let correlation = 0;
    for (let i = 0; i < size - period; i++) {
      correlation += buffer[i] * buffer[i + period];
    }

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestPeriod = period;
    }
  }

  if (bestPeriod > 0 && bestCorrelation > 0.01) {
    return Math.round(sampleRate / bestPeriod);
  }

  return -1;
}

/**
 * Analyzes the terminal boundary (last 20-30% of voiced samples)
 * to detect if the speaker lowered their pitch (Falling Intonation) or raised it (Uptalk).
 */
export function detectTerminalIntonation(
  pitchSamples: number[]
): PitchAnalysisResult {
  const voiced = pitchSamples.filter((p) => p >= 75 && p <= 450);

  if (voiced.length < 8) {
    return {
      direction: "insufficient_data",
      slope: 0,
      startPitch: 0,
      endPitch: 0,
      deltaHz: 0,
      messageVi: "Chưa đủ dữ liệu âm thanh giọng nói để xác định đường cao độ.",
      isUptalk: false,
      isAuthoritative: false,
    };
  }

  // Analyze the last 30% of voiced pitch samples
  const tailLength = Math.max(5, Math.floor(voiced.length * 0.3));
  const tailSamples = voiced.slice(-tailLength);

  const startPitch = tailSamples[0];
  const endPitch = tailSamples[tailSamples.length - 1];
  const deltaHz = endPitch - startPitch;

  // Linear regression slope
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  const n = tailSamples.length;

  for (let i = 0; i < n; i++) {
    const x = i;
    const y = tailSamples[i];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1);

  // Classification logic
  if (slope < -0.8 || deltaHz <= -15) {
    return {
      direction: "falling",
      slope,
      startPitch,
      endPitch,
      deltaHz,
      messageVi:
        "Ngữ điệu hạ giọng cuối câu chuẩn xác (Falling Cadence ↘). Giọng nói toát lên phong thái học thuật vững vàng và quyết đoán.",
      isUptalk: false,
      isAuthoritative: true,
    };
  } else if (slope > 0.9 || deltaHz >= 20) {
    return {
      direction: "rising_uptalk",
      slope,
      startPitch,
      endPitch,
      deltaHz,
      messageVi:
        "Cảnh báo lỗi Uptalk (Ngữ điệu vểnh cao ở cuối câu khẳng định ↗). Làm câu nói nghe như câu hỏi nghi vấn, thể hiện sự ngập ngừng thiếu tự tin.",
      isUptalk: true,
      isAuthoritative: false,
    };
  } else {
    return {
      direction: "flat",
      slope,
      startPitch,
      endPitch,
      deltaHz,
      messageVi:
        "Ngữ điệu tương đối bằng phẳng. Hãy chủ động hạ giọng dứt khoát hơn ở từ cuối cùng để tăng sức nặng học thuật.",
      isUptalk: false,
      isAuthoritative: false,
    };
  }
}
