/**
 * Saccades Engine: Academic Speed-Reading & Visual Chunking System
 * Designed to eliminate sub-vocalization and regression habits in IELTS Academic Reading
 */

export interface SaccadeChunk {
  id: string;
  text: string;
  wordCount: number;
  paragraphIndex: number;
  chunkIndexInParagraph: number;
  globalIndex: number;
  isTopicSentence: boolean;
  isConnector: boolean;
  isKeyFact: boolean;
  charOffset: number;
}

export interface StructuredParagraph {
  index: number;
  rawText: string;
  topicSentence: string;
  chunks: SaccadeChunk[];
}

export const ACADEMIC_DISCOURSE_CONNECTORS: string[] = [
  "furthermore",
  "moreover",
  "consequently",
  "however",
  "nevertheless",
  "in contrast",
  "on the other hand",
  "as a result",
  "therefore",
  "in particular",
  "significantly",
  "subsequently",
  "meanwhile",
  "conversely",
  "accordingly",
  "nonetheless",
  "in addition",
  "specifically",
  "for instance",
  "notably",
  "ultimately",
];

/**
 * Calculates the display interval in milliseconds for each chunk based on target WPM.
 * Formula: interval = (60,000 / WPM) * avgWordsPerChunk
 */
export function calculateChunkIntervalMs(wpm: number, avgWordsPerChunk = 3.2): number {
  const safeWpm = Math.max(100, Math.min(600, wpm));
  return Math.round((60000 / safeWpm) * avgWordsPerChunk);
}

/**
 * Calculates Effective Reading Rate (E-WPM):
 * Formula: E-WPM = Raw WPM * (Comprehension Score % / 100)
 */
export function calculateEffectiveWPM(rawWpm: number, comprehensionRate: number): number {
  return Math.round(rawWpm * Math.max(0, Math.min(1, comprehensionRate / 100)));
}

/**
 * Tokenizes and groups text into logical visual chunks (3-4 words)
 * adhering to syntactic clause boundaries and punctuation.
 */
export function chunkTextIntoSaccades(
  paragraphs: string[],
  targetWordsPerChunk = 3
): { chunks: SaccadeChunk[]; paragraphs: StructuredParagraph[] } {
  const allChunks: SaccadeChunk[] = [];
  const structuredParagraphs: StructuredParagraph[] = [];
  let globalChunkCounter = 0;
  let runningCharOffset = 0;

  paragraphs.forEach((paragraphText, pIndex) => {
    const trimmedP = paragraphText.trim();
    if (!trimmedP) return;

    // Sentence splitting
    const sentenceRegex = /[^.!?]+[.!?]+|[^.!?]+$/g;
    const sentences = trimmedP.match(sentenceRegex) || [trimmedP];
    const pChunks: SaccadeChunk[] = [];

    // The first and last sentences of an academic paragraph are typically topic or concluding sentences
    const firstSentence = (sentences[0] || "").trim();

    sentences.forEach((sentence, sIndex) => {
      const isTopicSentence = sIndex === 0 || sIndex === sentences.length - 1;
      const rawWords = sentence.trim().split(/\s+/).filter(Boolean);

      if (rawWords.length === 0) return;

      let currentWordGroup: string[] = [];

      rawWords.forEach((word, wIdx) => {
        currentWordGroup.push(word);

        const isPunctuationBound = /[,;:"'—–\-]/.test(word);
        const hasReachedTarget = currentWordGroup.length >= targetWordsPerChunk;
        const isLastWordInSentence = wIdx === rawWords.length - 1;

        if (isPunctuationBound || hasReachedTarget || isLastWordInSentence) {
          const chunkText = currentWordGroup.join(" ");
          const lowerText = chunkText.toLowerCase();

          const isConnector = ACADEMIC_DISCOURSE_CONNECTORS.some((conn) =>
            lowerText.startsWith(conn) || lowerText.includes(` ${conn}`)
          );

          const hasNumbersOrCaps = /\b[A-Z][a-z]+|\d+%?|\b(19|20)\d{2}\b/.test(chunkText);

          const chunk: SaccadeChunk = {
            id: `chunk_p${pIndex}_c${pChunks.length}`,
            text: chunkText,
            wordCount: currentWordGroup.length,
            paragraphIndex: pIndex,
            chunkIndexInParagraph: pChunks.length,
            globalIndex: globalChunkCounter++,
            isTopicSentence,
            isConnector,
            isKeyFact: hasNumbersOrCaps,
            charOffset: runningCharOffset,
          };

          pChunks.push(chunk);
          allChunks.push(chunk);
          runningCharOffset += chunkText.length + 1;
          currentWordGroup = [];
        }
      });
    });

    structuredParagraphs.push({
      index: pIndex,
      rawText: trimmedP,
      topicSentence: firstSentence,
      chunks: pChunks,
    });
  });

  return { chunks: allChunks, paragraphs: structuredParagraphs };
}

/**
 * Search helper for Scanning Radar:
 * Finds the exact location of a hard/soft keyword within the passage chunks.
 */
export function findKeywordInChunks(
  keyword: string,
  chunks: SaccadeChunk[]
): { chunkIndex: number; matchedText: string } | null {
  const cleanKeyword = keyword.trim().toLowerCase();
  for (let i = 0; i < chunks.length; i++) {
    const chunkClean = chunks[i].text.toLowerCase();
    if (chunkClean.includes(cleanKeyword)) {
      return { chunkIndex: i, matchedText: chunks[i].text };
    }
  }
  return null;
}

/**
 * Calculates Band Score rating according to speed reading metric.
 */
export function getSpeedReadingBandRating(wpm: number, comprehensionRate: number): {
  band: string;
  title: string;
  badgeColor: string;
  advice: string;
} {
  const eWpm = calculateEffectiveWPM(wpm, comprehensionRate);

  if (eWpm >= 300 && comprehensionRate >= 75) {
    return {
      band: "Band 8.0 - 9.0",
      title: "Master Saccadic Scanner (Tốc độ & Tiếp thu Thần tốc)",
      badgeColor: "emerald",
      advice: "Khả năng quét cụm và định vị thông tin đạt đỉnh cao. Đủ khả năng làm Passage 3 chỉ trong 14-16 phút.",
    };
  } else if (eWpm >= 230 && comprehensionRate >= 65) {
    return {
      band: "Band 7.0 - 7.5",
      title: "Proficient Academic Reader (Đọc Học Thuật Chuẩn Xác)",
      badgeColor: "cyan",
      advice: "Tốc độ đọc lướt tốt, hạn chế tối đa việc đọc thầm. Duy trì nhịp độ này để tránh bị quá giờ thi.",
    };
  } else if (eWpm >= 170 && comprehensionRate >= 50) {
    return {
      band: "Band 5.5 - 6.5",
      title: "Developing Pacer (Đang Phá Vỡ Thói Quen Đọc Dịch)",
      badgeColor: "amber",
      advice: "Vẫn còn hiện tượng dừng mắt quá lâu ở từng từ đơn lẻ. Hãy tăng kích thước cụm từ lên 4-5 từ.",
    };
  } else {
    return {
      band: "Band 4.0 - 5.0",
      title: "Sub-vocalizing Reader (Bẫy Đọc Dịch Từng Chữ)",
      badgeColor: "rose",
      advice: "Tốc độ chậm do thói quen phát âm từng từ trong đầu. Cần tập trung nhìn cụm từ và di chuyển mắt liên tục theo con trỏ.",
    };
  }
}
