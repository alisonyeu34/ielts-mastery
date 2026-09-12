/**
 * Acoustic Fluency & Biofeedback DSP Analyzer
 * Evaluates real-time speech pacing (WPM / Syllables per sec),
 * detects filler words (um, uh, you know, like), and classifies Content Pauses vs Lexical Search Hesitations.
 */

export interface AcousticPauseInterval {
  id: string;
  startSec: number;
  endSec: number;
  durationSec: number;
  pauseType: "content_pause" | "lexical_hesitation";
  pauseTypeLabelVi: string;
  severity: "safe" | "warning" | "critical";
  contextSnippet?: string;
  advice: string;
}

export interface FillerWordEvent {
  id: string;
  word: string;
  timestampSec: number;
  category: "vocal_filler" | "discourse_crutch";
}

export interface FluencyMetrics {
  totalSpeakingTimeSec: number;
  wordsSpoken: number;
  currentWpm: number;
  averageWpm: number;
  syllablesPerSec: number;
  fillerCount: number;
  fillerRatePerMinute: number;
  contentPausesCount: number;
  lexicalHesitationsCount: number;
  hesitationRatio: number; // percentage of time spent hesitating
  fluencyBandEstimate: string;
  fluencyScore: number; // 0 - 100
}

export const COMMON_FILLER_WORDS = [
  "um",
  "uh",
  "er",
  "ah",
  "you know",
  "like",
  "actually",
  "basically",
  "to be honest",
  "sort of",
  "kind of",
];

/**
 * Calculates RMS volume from time domain audio bytes
 */
export function calculateVolumeRMS(dataArray: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const normalized = (dataArray[i] - 128) / 128;
    sum += normalized * normalized;
  }
  return Math.sqrt(sum / dataArray.length);
}

/**
 * Detects filler words in real-time transcription strings
 */
export function spotFillerWords(text: string, currentSec: number): FillerWordEvent[] {
  const fillersFound: FillerWordEvent[] = [];
  const lower = text.toLowerCase();

  COMMON_FILLER_WORDS.forEach((filler) => {
    const regex = new RegExp(`\\b${filler}\\b`, "gi");
    let match: RegExpExecArray | null;
    while ((match = regex.exec(lower)) !== null) {
      const isVocal = ["um", "uh", "er", "ah"].includes(filler);
      fillersFound.push({
        id: `filler_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        word: match[0],
        timestampSec: currentSec,
        category: isVocal ? "vocal_filler" : "discourse_crutch",
      });
    }
  });

  return fillersFound;
}

/**
 * Classifies silence gaps into Content Pauses vs Lexical Search Hesitations
 */
export function analyzeAcousticPauses(
  volumeTimeline: Array<{ timeSec: number; volume: number }>,
  silenceThreshold = 0.045,
  minPauseDurationSec = 0.4
): AcousticPauseInterval[] {
  const pauses: AcousticPauseInterval[] = [];
  let inPause = false;
  let pauseStart = 0;

  for (let i = 0; i < volumeTimeline.length; i++) {
    const point = volumeTimeline[i];
    const isSilent = point.volume < silenceThreshold;

    if (isSilent && !inPause) {
      inPause = true;
      pauseStart = point.timeSec;
    } else if (!isSilent && inPause) {
      inPause = false;
      const duration = parseFloat((point.timeSec - pauseStart).toFixed(2));

      if (duration >= minPauseDurationSec) {
        // Natural Content Pause: typically between 0.4s and 0.9s
        // Long / Mid-phrase Lexical Search Hesitation: > 1.0s
        const isLexicalHesitation = duration >= 1.05;

        pauses.push({
          id: `pause_${pauses.length}_${Math.round(pauseStart * 10)}`,
          startSec: parseFloat(pauseStart.toFixed(2)),
          endSec: parseFloat(point.timeSec.toFixed(2)),
          durationSec: duration,
          pauseType: isLexicalHesitation ? "lexical_hesitation" : "content_pause",
          pauseTypeLabelVi: isLexicalHesitation
            ? "Ngập Ngừng Tìm Từ / Ngữ Pháp (Lexical Hesitation)"
            : "Ngắt Nhịp Ý Nghĩa Học Thuật (Content Pause)",
          severity:
            duration > 1.8 ? "critical" : duration > 1.0 ? "warning" : "safe",
          advice: isLexicalHesitation
            ? "Khoảng dừng kéo dài (>1.0s) cho thấy bạn đang bị khựng tìm từ vựng. Hãy dùng chiến thuật Silent Pause nhẹ nhàng hoặc cụm mở rộng ý tưởng."
            : "Khoảng dừng học thuật tự nhiên tại ranh giới mệnh đề, giúp giám khảo theo kịp mạch tư duy logic.",
        });
      }
    }
  }

  return pauses;
}

/**
 * Computes comprehensive Speaking Fluency Metrics
 */
export function calculateFluencyMetrics(
  totalTimeSec: number,
  transcript: string,
  fillers: FillerWordEvent[],
  pauses: AcousticPauseInterval[]
): FluencyMetrics {
  const safeTime = Math.max(1, totalTimeSec);
  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const wpm = Math.round((wordCount / (safeTime / 60)));
  const syllablesPerSec = parseFloat(((wordCount * 1.35) / safeTime).toFixed(1));

  const fillerCount = fillers.length;
  const fillerRate = parseFloat(((fillerCount / (safeTime / 60))).toFixed(1));

  const contentPauses = pauses.filter((p) => p.pauseType === "content_pause").length;
  const lexicalHesitations = pauses.filter((p) => p.pauseType === "lexical_hesitation").length;

  const totalHesitationTimeSec = pauses
    .filter((p) => p.pauseType === "lexical_hesitation")
    .reduce((acc, curr) => acc + curr.durationSec, 0);

  const hesitationRatio = Math.round((totalHesitationTimeSec / safeTime) * 100);

  // Score Calculation (Scale 0 - 100)
  let score = 90;
  // Optimal WPM: 110 - 145 WPM
  if (wpm < 95) score -= (95 - wpm) * 0.4;
  else if (wpm > 165) score -= (wpm - 165) * 0.3;

  // Filler penalty: -5 pts per filler above 1/min
  if (fillerRate > 1.0) {
    score -= (fillerRate - 1.0) * 8;
  }

  // Hesitation penalty: -1 pt per 2% hesitation
  score -= hesitationRatio * 0.8;

  const finalScore = Math.max(35, Math.min(98, Math.round(score)));

  let bandEstimate = "Band 5.5 - 6.0";
  if (finalScore >= 88 && fillerRate <= 1.0 && hesitationRatio <= 8) {
    bandEstimate = "Band 8.0 - 9.0 (Effortless Native Fluency)";
  } else if (finalScore >= 76 && fillerRate <= 2.5) {
    bandEstimate = "Band 7.0 - 7.5 (Spontaneous Academic Flow)";
  } else if (finalScore >= 62) {
    bandEstimate = "Band 6.0 - 6.5 (Occasional Hesitation & Fillers)";
  } else {
    bandEstimate = "Band 5.0 - 5.5 (Noticeable Pauses & Crutches)";
  }

  return {
    totalSpeakingTimeSec: safeTime,
    wordsSpoken: wordCount,
    currentWpm: wpm,
    averageWpm: wpm,
    syllablesPerSec,
    fillerCount,
    fillerRatePerMinute: fillerRate,
    contentPausesCount: contentPauses,
    lexicalHesitationsCount: lexicalHesitations,
    hesitationRatio,
    fluencyBandEstimate: bandEstimate,
    fluencyScore: finalScore,
  };
}

/**
 * Synthesizes a subtle audio beep cue to condition anti-filler reflexes
 */
export function playAntiFillerAudioCue(): void {
  if (typeof window === "undefined") return;
  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtxClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime); // 440 Hz (A4)
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Audio Context blocked or unavailable
  }
}
