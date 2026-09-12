/**
 * Anti-Subvocalization & Ocular Anti-Regression Engine
 * Powers the Vanishing Text Stream and Multi-Word RSVP visual compression system.
 */

export interface VanishingWordItem {
  id: string;
  word: string;
  globalIndex: number;
  paragraphIndex: number;
  wordIndexInParagraph: number;
  durationPerWordMs: number;
}

export interface RSVPChunk {
  id: string;
  chunkText: string;
  wordsCount: number;
  paragraphIndex: number;
  globalIndex: number;
  displayIntervalMs: number;
}

export interface ERREvaluation {
  rawWpm: number;
  comprehensionPercentage: number;
  effectiveReadingRate: number; // ERR
  bandEstimate: string;
  performanceGrade: "Outstanding" | "Proficient" | "Sub-vocalizing" | "Critical";
  pedagogicalFeedback: string;
}

/**
 * Calculates per-word interval in milliseconds from target WPM
 * Formula: interval = (60 * 1000) / WPM
 */
export function calculateWordIntervalMs(wpm: number): number {
  const safeWpm = Math.max(120, Math.min(500, wpm));
  return Math.round((60 * 1000) / safeWpm);
}

/**
 * Prepares array of words with vanishing schedules
 */
export function prepareVanishingWords(
  paragraphs: string[],
  targetWpm: number
): { words: VanishingWordItem[]; wordCount: number } {
  const intervalMs = calculateWordIntervalMs(targetWpm);
  const words: VanishingWordItem[] = [];
  let globalCount = 0;

  paragraphs.forEach((pText, pIdx) => {
    const rawWords = pText.trim().split(/\s+/).filter(Boolean);
    rawWords.forEach((word, wIdx) => {
      words.push({
        id: `word_p${pIdx}_w${wIdx}_${globalCount}`,
        word,
        globalIndex: globalCount++,
        paragraphIndex: pIdx,
        wordIndexInParagraph: wIdx,
        durationPerWordMs: intervalMs,
      });
    });
  });

  return { words, wordCount: globalCount };
}

/**
 * Groups text into multi-word RSVP chunks (3-4 words per block)
 */
export function prepareRSVPChunks(
  paragraphs: string[],
  targetWpm: number,
  wordsPerChunk = 3
): { chunks: RSVPChunk[]; totalChunks: number } {
  const chunks: RSVPChunk[] = [];
  let globalIndex = 0;

  paragraphs.forEach((pText, pIdx) => {
    const rawWords = pText.trim().split(/\s+/).filter(Boolean);
    let buffer: string[] = [];

    rawWords.forEach((word, wIdx) => {
      buffer.push(word);
      const isEnd = buffer.length >= wordsPerChunk || wIdx === rawWords.length - 1;

      if (isEnd) {
        const text = buffer.join(" ");
        const wordsInChunk = buffer.length;
        const intervalMs = Math.round(((60 * 1000) / targetWpm) * wordsInChunk);

        chunks.push({
          id: `rsvp_p${pIdx}_c${chunks.length}`,
          chunkText: text,
          wordsCount: wordsInChunk,
          paragraphIndex: pIdx,
          globalIndex: globalIndex++,
          displayIntervalMs: intervalMs,
        });

        buffer = [];
      }
    });
  });

  return { chunks, totalChunks: globalIndex };
}

/**
 * Evaluates Effective Reading Rate (ERR)
 * Formula: ERR = WPM * (Comprehension % / 100)
 */
export function evaluateERR(rawWpm: number, comprehensionRate: number): ERREvaluation {
  const err = Math.round(rawWpm * Math.max(0, Math.min(1, comprehensionRate / 100)));

  let bandEstimate = "Band 5.5 - 6.0";
  let grade: ERREvaluation["performanceGrade"] = "Sub-vocalizing";
  let feedback = "";

  if (err >= 240 && comprehensionRate >= 75) {
    bandEstimate = "Band 8.0 - 9.0";
    grade = "Outstanding";
    feedback = "Khả năng quét thị giác đỉnh cao! Bạn đã triệt tiêu hoàn toàn thói quen đọc thầm và nhảy giật lùi mắt, sẵn sàng giải quyết Passage 3 trong 14 phút.";
  } else if (err >= 180 && comprehensionRate >= 65) {
    bandEstimate = "Band 7.0 - 7.5";
    grade = "Proficient";
    feedback = "Tốc độ đọc tiếp thu rất tốt. Duy trì phản xạ dòng chảy ép tiến (Forced-forward flow) để tránh bị quá tải thời gian thi.";
  } else if (err >= 130 && comprehensionRate >= 50) {
    bandEstimate = "Band 6.0 - 6.5";
    grade = "Sub-vocalizing";
    feedback = "Tốc độ nhận thức bị kìm hãm do thói quen đọc dịch thầm trong đầu. Hãy tăng tốc độ nhịp pacing lên 280 WPM để ép não bộ tiếp thu theo cụm ý.";
  } else {
    bandEstimate = "Band 4.5 - 5.5";
    grade = "Critical";
    feedback = "Điểm nghẽn nghiêm trọng về nhận thức: bạn đang dừng mắt quá lâu và nhảy lùi liên tục. Cần rèn luyện chế độ Vanishing Text hàng ngày.";
  }

  return {
    rawWpm,
    comprehensionPercentage: comprehensionRate,
    effectiveReadingRate: err,
    bandEstimate,
    performanceGrade: grade,
    pedagogicalFeedback: feedback,
  };
}
