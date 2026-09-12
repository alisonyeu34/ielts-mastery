/**
 * IELTS Academic Paraphrase Transformation Verifier
 */

export type ParaphraseTechnique = "synonyms" | "word_class" | "voice_shift" | "clause_restructuring" | "nominalization";

export interface ParaphraseVerificationResult {
  score: number;
  bandScore: number;
  techniqueApplied: boolean;
  meaningPreserved: boolean;
  overParaphrasing: boolean;
  feedback: string[];
  strengths: string[];
  improvements: string[];
}

export function verifyParaphrase(
  original: string,
  rewritten: string,
  technique: ParaphraseTechnique,
  targetTerm?: string,
  requiredKeyword?: string
): ParaphraseVerificationResult {
  const origClean = original.trim().toLowerCase();
  const rewClean = rewritten.trim().toLowerCase();

  const feedback: string[] = [];
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (!rewClean) {
    return {
      score: 0,
      bandScore: 4.0,
      techniqueApplied: false,
      meaningPreserved: false,
      overParaphrasing: false,
      feedback: ["Bạn chưa nhập câu paraphrase."],
      strengths: [],
      improvements: ["Hãy hoàn thiện câu viết lại."],
    };
  }

  if (origClean === rewClean) {
    return {
      score: 10,
      bandScore: 4.5,
      techniqueApplied: false,
      meaningPreserved: true,
      overParaphrasing: false,
      feedback: ["Câu viết lại hoàn toàn trùng khớp với câu gốc, chưa thực hiện biến đổi paraphrase."],
      strengths: [],
      improvements: ["Áp dụng kỹ thuật chỉ định để thay đổi cấu trúc câu hoặc từ vựng."],
    };
  }

  let techniqueScore = 60;
  let techniqueApplied = false;

  switch (technique) {
    case "synonyms": {
      if (targetTerm && origClean.includes(targetTerm.toLowerCase())) {
        if (!rewClean.includes(targetTerm.toLowerCase())) {
          techniqueApplied = true;
          techniqueScore += 30;
          strengths.push("Đã thay thế thành công từ mục tiêu \"" + targetTerm + "\" bằng từ đồng nghĩa học thuật.");
        } else {
          improvements.push("Từ mục tiêu \"" + targetTerm + "\" vẫn còn xuất hiện trong câu. Hãy thay bằng từ đồng nghĩa C1.");
        }
      } else {
        techniqueApplied = true;
        techniqueScore += 20;
      }
      break;
    }

    case "word_class": {
      if (requiredKeyword) {
        if (rewClean.includes(requiredKeyword.toLowerCase())) {
          techniqueApplied = true;
          techniqueScore += 35;
          strengths.push("Đã chuyển đổi thành công sang dạng từ loại mục tiêu \"" + requiredKeyword + "\".");
        } else {
          improvements.push("Chưa tìm thấy từ loại biến đổi mục tiêu \"" + requiredKeyword + "\" trong câu của bạn.");
        }
      } else {
        techniqueApplied = true;
        techniqueScore += 20;
      }
      break;
    }

    case "voice_shift": {
      const hasPassive = /\b(is|are|was|were|been|being)\s+[a-z]+(ed|en|t)\b/i.test(rewClean);
      const origHadPassive = /\b(is|are|was|were|been|being)\s+[a-z]+(ed|en|t)\b/i.test(origClean);

      if (hasPassive !== origHadPassive) {
        techniqueApplied = true;
        techniqueScore += 35;
        strengths.push("Đã thực hiện chuyển đổi linh hoạt giữa Thể Chủ động và Thể Bị động khách quan.");
      } else {
        improvements.push("Hãy chuyển đổi thể của câu (Chủ động <-> Bị động) để đáp ứng yêu cầu kỹ thuật Voice Shift.");
      }
      break;
    }

    case "clause_restructuring": {
      const conjunctions = ["while", "whereas", "although", "despite", "in spite of", "due to", "owing to", "consequently"];
      const hasRestructureConj = conjunctions.some((c) => rewClean.includes(c));
      if (hasRestructureConj) {
        techniqueApplied = true;
        techniqueScore += 35;
        strengths.push("Đã tái cấu trúc trật tự mệnh đề kết hợp liên từ tương phản / nhượng bộ học thuật.");
      } else {
        improvements.push("Hãy sử dụng liên từ tương phản hoặc nhượng bộ (While, Whereas, Although, Despite) để đảo cấu trúc vế câu.");
      }
      break;
    }

    case "nominalization": {
      const nominalSuffixes = ["tion", "sion", "ment", "ance", "ence", "ity", "ness"];
      const origWords = origClean.split(/\s+/);
      const rewWords = rewClean.split(/\s+/);
      const newNominalWords = rewWords.filter((w) => nominalSuffixes.some((s) => w.endsWith(s)) && !origWords.includes(w));

      if (newNominalWords.length > 0) {
        techniqueApplied = true;
        techniqueScore += 35;
        strengths.push("Đã nén thông tin bằng danh từ hóa học thuật (" + newNominalWords.slice(0, 2).join(", ") + ").");
      } else {
        improvements.push("Hãy biến đổi động từ/tính từ thành cụm danh từ nén (Nominalization) để tăng tính học thuật.");
      }
      break;
    }
  }

  const keyEntities = origClean.match(/\b(government|students|technology|environment|education|economy|health|emissions|energy)\b/gi) || [];
  let preservedCount = 0;
  keyEntities.forEach((ke) => {
    if (rewClean.includes(ke.toLowerCase())) preservedCount++;
  });

  const meaningPreserved = keyEntities.length === 0 || preservedCount / keyEntities.length >= 0.5;
  if (!meaningPreserved) {
    feedback.push("Lưu ý: Câu viết lại có dấu hiệu làm mất đi các thực thể chủ đề chính của câu gốc.");
  }

  const origWordsLen = origClean.split(/\s+/).filter(Boolean).length;
  const rewWordsLen = rewClean.split(/\s+/).filter(Boolean).length;
  const overParaphrasing = rewWordsLen > origWordsLen * 2.2;
  if (overParaphrasing) {
    improvements.push("Cảnh báo Over-paraphrasing: Câu viết lại quá dài dòng và thêm thắt chi tiết không có trong câu gốc.");
  }

  let finalScore = Math.min(100, Math.max(30, techniqueScore + (meaningPreserved ? 10 : -20) - (overParaphrasing ? 15 : 0)));
  let bandScore = 6.0;
  if (finalScore >= 90) bandScore = 8.5;
  else if (finalScore >= 80) bandScore = 7.5;
  else if (finalScore >= 70) bandScore = 7.0;
  else if (finalScore >= 60) bandScore = 6.5;
  else bandScore = 5.5;

  return {
    score: finalScore,
    bandScore,
    techniqueApplied,
    meaningPreserved,
    overParaphrasing,
    feedback,
    strengths,
    improvements,
  };
}
