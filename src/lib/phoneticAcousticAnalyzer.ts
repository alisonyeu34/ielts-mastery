"use client";

/**
 * Phonetic Acoustic Analyzer Utility powered by Web Audio API
 */

export interface AcousticFrameAnalysis {
  rmsVolume: number; // 0.0 to 1.0 (Root Mean Square Volume)
  peakAmplitude: number; // 0 to 255
  frequencyCentroidHz?: number;
}

export interface PauseDetectionResult {
  detectedPauses: Array<{ startSeconds: number; durationSeconds: number }>;
  expectedPausesCount: number;
  pauseAccuracyScore: number; // 0 - 100%
  feedbackMessage: string;
}

/**
 * Compute RMS (Root Mean Square) volume from raw audio time-domain byte array
 */
export function calculateRMSVolume(timeDomainData: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < timeDomainData.length; i++) {
    // Normalise 0..255 byte value to -1.0 .. 1.0 range
    const normalized = (timeDomainData[i] - 128) / 128;
    sum += normalized * normalized;
  }
  const rms = Math.sqrt(sum / timeDomainData.length);
  return Math.min(1, rms * 3); // Scaled for UI visual sensitivity
}

/**
 * Evaluate if recorded audio has pause breaks aligned with expected Thought Group boundaries
 */
export function evaluatePauseAccuracy(
  recordedVolumeTimeline: Array<{ timeSec: number; volume: number }>,
  expectedPauseTimestamps: number[],
  pauseThreshold = 0.08
): PauseDetectionResult {
  const detectedPauses: Array<{ startSeconds: number; durationSeconds: number }> = [];

  let inPause = false;
  let pauseStart = 0;

  for (let i = 0; i < recordedVolumeTimeline.length; i++) {
    const point = recordedVolumeTimeline[i];
    if (point.volume < pauseThreshold) {
      if (!inPause) {
        inPause = true;
        pauseStart = point.timeSec;
      }
    } else {
      if (inPause) {
        inPause = false;
        const duration = point.timeSec - pauseStart;
        if (duration >= 0.25) {
          detectedPauses.push({
            startSeconds: Math.round(pauseStart * 10) / 10,
            durationSeconds: Math.round(duration * 10) / 10,
          });
        }
      }
    }
  }

  const expectedCount = expectedPauseTimestamps.length;
  let matches = 0;

  expectedPauseTimestamps.forEach((expectedTime) => {
    const match = detectedPauses.some(
      (dp) => Math.abs(dp.startSeconds - expectedTime) <= 0.8
    );
    if (match) matches++;
  });

  const accuracy = expectedCount > 0 ? Math.round((matches / expectedCount) * 100) : 100;

  let feedbackMessage = "Ngắt nghỉ đúng nhịp cụm ý nghĩa!";
  if (accuracy < 50) {
    feedbackMessage = "Cảnh báo: Bạn đang nói quá nhanh hoặc ngắt tùy tiện giữa các cụm danh từ.";
  } else if (accuracy < 80) {
    feedbackMessage = "Khá tốt: Cần hạ giọng dứt khoát hơn ở cuối câu và giữ khoảng ngắt 0.3s giữa các mệnh đề.";
  }

  return {
    detectedPauses,
    expectedPausesCount: expectedCount,
    pauseAccuracyScore: accuracy,
    feedbackMessage,
  };
}

/**
 * Web Speech Synthesis fallback for native RP British English audio pronunciation
 */
export function playNativeAudio(text: string, lang = "en-GB", rate = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    // Pick British or American voice if available
    const voices = window.speechSynthesis.getVoices();
    const britishVoice = voices.find(
      (v) => v.lang === "en-GB" || v.name.includes("British") || v.name.includes("UK")
    );
    if (britishVoice) {
      utterance.voice = britishVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
