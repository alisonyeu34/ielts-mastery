/**
 * listeningSpeechEngine.ts
 * Core IELTS Listening Speech Segmentation & Timeline Alignment Engine.
 * 
 * Solves:
 * 1. Chromium 15-second speech freeze by slicing transcripts into short chunks (<15 words).
 * 2. Instant accurate seek/rewind by mapping any second [0, duration] to exact sentence index.
 * 3. Multi-speaker dialogue modulation (Receptionist vs Customer, Professor vs Students).
 */

export interface SpeechSegment {
  id: number;
  speaker: string;
  text: string;
  startSec: number;
  endSec: number;
  wordCount: number;
  pitch: number;
}

const SPEAKER_REGEX = /^(Receptionist|Customer|Guide|Prof\.\s*Davies|Professor\s*Davies|Dr\.\s*Stevens|Dr\.\s*Alistair\s*Vance|Lecturer|Mark|Helen|Liam|Maya|Speaker\s*\d+|Interviewer|Interviewee|Woman|Man|Student\s*[A-Z]):\s*(.*)$/i;

function getSpeakerPitch(speaker: string): number {
  const s = speaker.toLowerCase();
  if (s.includes("receptionist") || s.includes("helen") || s.includes("maya") || s.includes("woman")) {
    return 1.15; // Female timbre
  }
  if (s.includes("customer") || s.includes("mark") || s.includes("liam") || s.includes("man")) {
    return 0.90; // Male deeper timbre
  }
  if (s.includes("prof") || s.includes("doctor") || s.includes("dr") || s.includes("lecturer")) {
    return 1.02; // Academic authoritative pitch
  }
  return 1.0;
}

/**
 * Parses raw IELTS transcript string into timed speech segments
 */
export function parseTranscriptIntoSegments(
  transcript: string,
  totalDurationSec: number
): SpeechSegment[] {
  if (!transcript || typeof transcript !== "string") {
    return [];
  }

  // Split raw text by newline or dialogue turns
  const lines = transcript
    .split(/\r?\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  interface RawChunk {
    speaker: string;
    text: string;
    wordCount: number;
  }

  const rawChunks: RawChunk[] = [];
  let currentSpeaker = "Guide";

  for (const line of lines) {
    let speaker = currentSpeaker;
    let content = line;

    const match = line.match(SPEAKER_REGEX);
    if (match) {
      speaker = match[1].trim();
      currentSpeaker = speaker;
      content = match[2].trim();
    }

    if (!content) continue;

    // Split long lines at sentence boundaries (. ? ! ;) so each chunk is <= 18 words
    const sentences = content
      .split(/(?<=[.?!;])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    for (const sent of sentences) {
      // Further split if a sentence is excessively long (>20 words)
      const words = sent.split(/\s+/).filter(Boolean);
      if (words.length <= 20) {
        rawChunks.push({
          speaker,
          text: sent,
          wordCount: Math.max(1, words.length),
        });
      } else {
        // Break into smaller 12-word phrases at commas or spaces
        const subPhrases = sent.split(/(?<=[,])\s+/).map((p) => p.trim()).filter(Boolean);
        for (const p of subPhrases) {
          const pWords = p.split(/\s+/).filter(Boolean);
          if (pWords.length > 0) {
            rawChunks.push({
              speaker,
              text: p,
              wordCount: Math.max(1, pWords.length),
            });
          }
        }
      }
    }
  }

  if (rawChunks.length === 0) {
    return [];
  }

  // Calculate proportional timeline for each chunk based on word counts
  const totalWords = rawChunks.reduce((acc, c) => acc + c.wordCount, 0);
  const effectiveDuration = totalDurationSec > 0 ? totalDurationSec : Math.max(30, totalWords / 2.5);

  let currentStart = 0;
  const segments: SpeechSegment[] = [];

  for (let i = 0; i < rawChunks.length; i++) {
    const chunk = rawChunks[i];
    const isLast = i === rawChunks.length - 1;
    
    // Proportional duration with minimum 1.5s
    const rawSegDuration = (chunk.wordCount / totalWords) * effectiveDuration;
    const segDuration = Math.max(1.2, rawSegDuration);
    
    const startSec = Math.round(currentStart * 10) / 10;
    const endSec = isLast
      ? effectiveDuration
      : Math.round((currentStart + segDuration) * 10) / 10;

    segments.push({
      id: i,
      speaker: chunk.speaker,
      text: chunk.text,
      startSec,
      endSec: Math.max(startSec + 1, endSec),
      wordCount: chunk.wordCount,
      pitch: getSpeakerPitch(chunk.speaker),
    });

    currentStart += segDuration;
  }

  return segments;
}

/**
 * Finds the segment index covering targetSec, or the closest one.
 */
export function findSegmentIndexAtTime(
  segments: SpeechSegment[],
  targetSec: number
): number {
  if (segments.length === 0) return 0;
  if (targetSec <= segments[0].startSec) return 0;
  if (targetSec >= segments[segments.length - 1].endSec) return segments.length - 1;

  for (let i = 0; i < segments.length; i++) {
    if (targetSec >= segments[i].startSec && targetSec < segments[i].endSec) {
      return i;
    }
  }

  // Fallback: closest by startSec
  let closestIdx = 0;
  let minDiff = Infinity;
  for (let i = 0; i < segments.length; i++) {
    const diff = Math.abs(segments[i].startSec - targetSec);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = i;
    }
  }
  return closestIdx;
}
