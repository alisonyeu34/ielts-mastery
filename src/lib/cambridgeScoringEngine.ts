/**
 * Official Cambridge IELTS Scoring Engine & 3-Pass Gap Analysis Algorithm
 * Accurate conversion tables for Academic Reading, Listening, Writing Composite & Overall Band Rounding
 */

export interface SkillBandScore {
  rawScore: number;
  maxRawScore: number;
  bandScore: number;
}

export interface MockTestOverallScore {
  listening: SkillBandScore;
  reading: SkillBandScore;
  writing: {
    task1Band: number;
    task2Band: number;
    compositeBand: number;
  };
  speaking: {
    fluencyBand: number;
    lexicalBand: number;
    grammarBand: number;
    pronunciationBand: number;
    compositeBand: number;
  };
  overallBand: number;
  rawAverage: number;
  pass1Overall?: number;
  pass2Overall?: number;
  knowledgePotentialGap?: number;
}

export interface GapAnalysisResult {
  pass1Band: number;
  pass2Band: number;
  bandGap: number;
  bottleneckType: "speed_pressure" | "conceptual_void" | "high_mastery";
  titleVi: string;
  diagnosisVi: string;
  prescribedRemedyVi: string[];
}

/**
 * Cambridge Academic Reading Raw Score (0 - 40) to Band Score (0 - 9.0)
 */
export function rawToReadingBand(raw: number): number {
  const r = Math.max(0, Math.min(40, Math.round(raw)));
  if (r >= 39) return 9.0;
  if (r >= 37) return 8.5;
  if (r >= 35) return 8.0;
  if (r >= 33) return 7.5;
  if (r >= 30) return 7.0;
  if (r >= 27) return 6.5;
  if (r >= 23) return 6.0;
  if (r >= 19) return 5.5;
  if (r >= 15) return 5.0;
  if (r >= 13) return 4.5;
  if (r >= 10) return 4.0;
  if (r >= 8) return 3.5;
  if (r >= 6) return 3.0;
  if (r >= 4) return 2.5;
  return 2.0;
}

/**
 * Cambridge Listening Raw Score (0 - 40) to Band Score (0 - 9.0)
 */
export function rawToListeningBand(raw: number): number {
  const r = Math.max(0, Math.min(40, Math.round(raw)));
  if (r >= 39) return 9.0;
  if (r >= 37) return 8.5;
  if (r >= 35) return 8.0;
  if (r >= 32) return 7.5;
  if (r >= 30) return 7.0;
  if (r >= 26) return 6.5;
  if (r >= 23) return 6.0;
  if (r >= 18) return 5.5;
  if (r >= 16) return 5.0;
  if (r >= 13) return 4.5;
  if (r >= 10) return 4.0;
  if (r >= 8) return 3.5;
  if (r >= 6) return 3.0;
  if (r >= 4) return 2.5;
  return 2.0;
}

/**
 * Calculate Writing Composite Band: (Task 1 * 1 + Task 2 * 2) / 3
 * Rounded to nearest 0.5 step according to Cambridge writing criteria
 */
export function calculateWritingComposite(task1: number, task2: number): number {
  const weighted = (task1 * 1 + task2 * 2) / 3;
  return Math.round(weighted * 2) / 2;
}

/**
 * Calculate Speaking Composite Band: Average of 4 criteria rounded to 0.5
 */
export function calculateSpeakingComposite(
  fluency: number,
  lexical: number,
  grammar: number,
  pronunciation: number
): number {
  const avg = (fluency + lexical + grammar + pronunciation) / 4;
  return Math.round(avg * 2) / 2;
}

/**
 * Official Cambridge Overall Band Rounding Algorithm:
 * - Average = (L + R + W + S) / 4
 * - Decimal < 0.25 -> Round Down to whole band (e.g. 6.125 -> 6.0)
 * - 0.25 <= Decimal < 0.75 -> Round to Half band .5 (e.g. 6.25 -> 6.5, 6.625 -> 6.5)
 * - Decimal >= 0.75 -> Round Up to next whole band (e.g. 6.75 -> 7.0, 6.875 -> 7.0)
 */
export function calculateCambridgeOverallBand(
  listeningBand: number,
  readingBand: number,
  writingBand: number,
  speakingBand: number
): { overallBand: number; rawAverage: number } {
  const rawAvg = (listeningBand + readingBand + writingBand + speakingBand) / 4;
  const wholePart = Math.floor(rawAvg);
  const decimal = rawAvg - wholePart;

  let overallBand: number;
  if (decimal < 0.25) {
    overallBand = wholePart;
  } else if (decimal < 0.75) {
    overallBand = wholePart + 0.5;
  } else {
    overallBand = wholePart + 1.0;
  }

  return {
    overallBand: Math.min(9.0, Math.max(1.0, overallBand)),
    rawAverage: Math.round(rawAvg * 1000) / 1000,
  };
}

/**
 * 3-Pass Gap Analysis:
 * Compares Pass 1 (Strict Timed) vs Pass 2 (Untimed Deep Dive) to isolate
 * Time Pressure / Speed Bottleneck vs Conceptual Deficit
 */
export function analyzeKnowledgeGap(
  pass1ReadingRaw: number,
  pass1ListeningRaw: number,
  pass2ReadingRaw: number,
  pass2ListeningRaw: number
): GapAnalysisResult {
  const pass1L = rawToListeningBand(pass1ListeningRaw);
  const pass1R = rawToListeningBand(pass1ReadingRaw);
  const pass1Avg = (pass1L + pass1R) / 2;

  const pass2L = rawToListeningBand(pass2ListeningRaw);
  const pass2R = rawToListeningBand(pass2ReadingRaw);
  const pass2Avg = (pass2L + pass2R) / 2;

  const bandGap = Math.round((pass2Avg - pass1Avg) * 10) / 10;

  if (bandGap >= 1.0) {
    return {
      pass1Band: pass1Avg,
      pass2Band: pass2Avg,
      bandGap,
      bottleneckType: "speed_pressure",
      titleVi: "Nghẽn Tốc Độ & Áp Lực Phòng Thi (Speed & Psychological Barrier)",
      diagnosisVi: `Điểm Pass 2 cao hơn Pass 1 tới +${bandGap.toFixed(1)} Band! Điều này chứng minh năng lực từ vựng và tư duy của bạn ĐÃ ĐẠT chuẩn Band ${pass2Avg.toFixed(1)}, nhưng bị tụt điểm trong Pass 1 do kỹ thuật phân bổ thời gian (Time Management) và hoảng loạn tâm lý khi đồng hồ đếm ngược.`,
      prescribedRemedyVi: [
        "Áp dụng quy tắc 'Cắt lỗ 90 giây': Không bao giờ dừng lại ở một câu hỏi quá 90 giây.",
        "Luyện kỹ thuật Scanning với bài tập Paraphrase dưới áp lực đếm ngược 60 giây.",
        "Chia nhỏ bài đọc Passage 3: Đọc lướt bắt Keyword xương sống trước khi làm câu hỏi chi tiết.",
      ],
    };
  } else if (bandGap >= 0.5) {
    return {
      pass1Band: pass1Avg,
      pass2Band: pass2Avg,
      bandGap,
      bottleneckType: "speed_pressure",
      titleVi: "Khoảng Cách Tiềm Năng Vừa Phải (+0.5 Band)",
      diagnosisVi: `Khi có thêm thời gian suy ngẫm, bạn tăng được +${bandGap.toFixed(1)} Band. Có khoảng 3 - 5 câu sai ở Pass 1 bắt nguồn từ việc đọc ẩu hoặc dính bẫy từ đồng nghĩa (Distractor Trap) khi bị hối thúc.`,
      prescribedRemedyVi: [
        "Xem lại các câu bẫy trong Pass 3 để ghi nhớ các cặp Paraphrase kinh điển.",
        "Kiểm tra cờ Review Flag trong 5 phút cuối của bài thi.",
        "Luyện thêm kỹ thuật gạch bỏ phương án nhiễu (Elimination Method).",
      ],
    };
  } else {
    return {
      pass1Band: pass1Avg,
      pass2Band: pass2Avg,
      bandGap,
      bottleneckType: pass1Avg >= 7.5 ? "high_mastery" : "conceptual_void",
      titleVi:
        pass1Avg >= 7.5
          ? "Phong Độ Đỉnh Cao & Ổn Định Tuyệt Đối (Elite Mastery)"
          : "Lỗ Hổng Kiến Thức Cốt Lõi (Core Knowledge Deficit)",
      diagnosisVi:
        pass1Avg >= 7.5
          ? `Xuất sắc! Điểm Pass 1 (${pass1Avg.toFixed(1)}) và Pass 2 (${pass2Avg.toFixed(1)}) đồng nhất ở mức điểm rất cao. Năng lực làm bài dưới áp lực thời gian của bạn đã hoàn toàn chín muồi!`
          : `Điểm Pass 2 không chênh lệch nhiều so với Pass 1 (+${bandGap.toFixed(1)} Band). Điều này chỉ ra rằng vấn đề cốt lõi không phải do thiếu thời gian, mà do chưa nắm vững từ vựng học thuật C1 (AWL) hoặc chưa hiểu bản chất cấu trúc câu phức lồng tầng.`,
      prescribedRemedyVi: [
        "Mổ xẻ kỹ lưỡng Pass 3: Thu hoạch toàn bộ từ vựng chưa biết vào Sổ từ vựng (Vocab Matrix).",
        "Luyện module Bóc tách câu phức (Sentence De-nesting Engine) tại Passage 3 Studio.",
        "Tập trung ôn luyện các bài tập ngữ pháp đảo ngữ, danh từ hóa và mệnh đề quan hệ rút gọn.",
      ],
    };
  }
}
