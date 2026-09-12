import { CoreGrammarTheoryLesson } from "@/data/mockGrammarTheoryData";

export interface MisconceptionItem {
  whatUserWrote: string;
  correction: string;
  explanation: string;
}

export interface ActiveRecallFeedback {
  scorePercent: number;
  scoreLevel: "excellent" | "good" | "needs_improvement";
  statusLabel: string;
  summaryFeedback: string;
  accuratePoints: string[];
  missingPoints: string[];
  misconceptions: MisconceptionItem[];
  mentorAdvice: string;
  timestamp: string;
}

/**
 * Intelligent Semantic Evaluator for Active Recall
 * Analyzes student free-form recall against lesson step knowledge.
 */
export function evaluateActiveRecall(
  userText: string,
  lesson: CoreGrammarTheoryLesson,
  stepNumber: 1 | 2 | 3
): ActiveRecallFeedback {
  const trimmed = userText.trim();
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);

  if (words.length < 5) {
    return {
      scorePercent: 20,
      scoreLevel: "needs_improvement",
      statusLabel: "Ghi chú còn quá ngắn",
      summaryFeedback: "Bạn mới chỉ ghi lại vài từ ngắn. Hãy cố gắng viết lại câu hoàn chỉnh hoặc liệt kê các ý bạn nhớ được (công thức, quy tắc, bẫy cần tránh).",
      accuratePoints: ["Đã bước đầu ghi lại phản xạ trí nhớ."],
      missingPoints: ["Hầu như toàn bộ các ý cốt lõi của bước học này."],
      misconceptions: [],
      mentorAdvice: "Mẹo: Hãy tự đặt câu hỏi: 'Bước này dạy quy tắc gì? Khi nào dùng? Có trường hợp đặc biệt nào không?' rồi viết câu trả lời xuống.",
      timestamp: new Date().toISOString(),
    };
  }

  const accuratePoints: string[] = [];
  const missingPoints: string[] = [];
  const misconceptions: MisconceptionItem[] = [];

  // =========================================================================
  // STEP 1: CONCEPT & FIRST-PRINCIPLES EVALUATION
  // =========================================================================
  if (stepNumber === 1) {
    const { corePrinciplesVi, formulaSummary, foundationalExamples } = lesson.step1Concept;

    // 1. Check for Formula / Structure awareness
    const formulaKeywords = ["công thức", "s +", "v+", "v-ed", "v2", "v3", "have", "has", "to be", "am/is/are", "was/were", "would", "if", "who", "which", "that", "whose", "more", "most", "-er", "-est", "as...as", "bị động", "chủ ngữ", "động từ"];
    const hasFormulaMention = formulaKeywords.some((kw) => lower.includes(kw));

    if (hasFormulaMention) {
      accuratePoints.push("Đã nắm được cấu trúc / công thức ngữ pháp cốt lõi của bài.");
    } else {
      missingPoints.push("Chưa ghi lại công thức cụ thể (Chủ ngữ + Động từ chia như thế nào).");
    }

    // 2. Check lesson specific concepts
    if (lesson.id === "present-simple-foundation" || lesson.id === "day1-present-simple-to-be" || lesson.id === "day2-present-simple-verbs") {
      if (lower.includes("to be") || lower.includes("am") || lower.includes("is") || lower.includes("are")) {
        accuratePoints.push("Nhớ rõ phân nhánh động từ TO BE (am/is/are).");
      } else {
        missingPoints.push("Nên nhớ bổ sung nhánh động từ TO BE (I am, He/She/It is, We/They are).");
      }

      if (lower.includes("s") || lower.includes("es") || lower.includes("he") || lower.includes("she") || lower.includes("it")) {
        accuratePoints.push("Nhớ chính xác quy tắc chia động từ thêm -s/-es với chủ ngữ số ít (He/She/It).");
      } else {
        missingPoints.push("Quên nhắc quy tắc vàng: He/She/It phải thêm đuôi -s hoặc -es vào động từ.");
      }

      if (lower.includes("thói quen") || lower.includes("sự thật") || lower.includes("always") || lower.includes("often") || lower.includes("every")) {
        accuratePoints.push("Nhớ đúng bản chất: Dùng cho thói quen lặp lại, sự thật hiển nhiên và dấu hiệu nhận biết.");
      } else {
        missingPoints.push("Bổ sung các dấu hiệu thời gian nhận biết (always, usually, every day...).");
      }

      // Check common mistakes in user text
      if (/\bhe\s+don'?t\b/i.test(lower) || /\bshe\s+don'?t\b/i.test(lower) || /\bit\s+don'?t\b/i.test(lower)) {
        misconceptions.push({
          whatUserWrote: "Dùng 'don't' với He/She/It",
          correction: "Phải dùng 'doesn't + V nguyên thể'",
          explanation: "He/She/It là ngôi thứ 3 số ít, trợ động từ phủ định bắt buộc là DOES NOT (doesn't), không dùng don't.",
        });
      }
      if (/\bi\s+is\b/i.test(lower) || /\bthey\s+is\b/i.test(lower)) {
        misconceptions.push({
          whatUserWrote: "I is / They is",
          correction: "I am / They are",
          explanation: "Chia sai động từ TO BE: I đi với 'am', They đi với 'are'.",
        });
      }
    } else if (lesson.id === "past-simple-foundation" || lesson.id === "day4-past-simple-to-be" || lesson.id === "day5-past-simple-verbs") {
      if (lower.includes("bất quy tắc") || lower.includes("v2") || lower.includes("cột 2") || lower.includes("-ed") || lower.includes("did")) {
        accuratePoints.push("Nhớ rõ động từ chia ở dạng V2 hoặc thêm đuôi -ed, trợ động từ là 'did'.");
      } else {
        missingPoints.push("Cần ghi nhớ phân biệt 2 nhóm động từ: có quy tắc (+ed) và bất quy tắc (cột 2 V2).");
      }

      if (lower.includes("chấm dứt") || lower.includes("kết thúc") || lower.includes("năm") || lower.includes("quá khứ") || lower.includes("task 1")) {
        accuratePoints.push("Nắm vững bản chất: Hành động đã chấm dứt hoàn toàn trong quá khứ, dùng cho Task 1 có năm.");
      } else {
        missingPoints.push("Bản chất quan trọng: Dùng cho sự kiện đã chấm dứt tại thời điểm quá khứ xác định (in 2010, yesterday...).");
      }

      if (/\bdidn'?t\s+\w+ed\b/i.test(lower) || /\bdid\s+not\s+\w+ed\b/i.test(lower) || /\bdidn'?t\s+went\b/i.test(lower)) {
        misconceptions.push({
          whatUserWrote: "didn't + V-ed / didn't went",
          correction: "didn't + V NGUYÊN THỂ (didn't go)",
          explanation: "Khi đã có trợ động từ 'did/didn't', động từ chính phải trở về dạng nguyên thể không chia.",
        });
      }
    } else if (lesson.id === "present-perfect-foundation" || lesson.id === "day6-present-perfect" || lesson.id === "day7-past-vs-present-perfect") {
      if (lower.includes("have") || lower.includes("has") || lower.includes("v3") || lower.includes("p2") || lower.includes("pii")) {
        accuratePoints.push("Nhớ chuẩn công thức: S + have/has + V3/PII.");
      } else {
        missingPoints.push("Công thức trọng tâm: have/has + V3 (Phân từ 2).");
      }

      if (lower.includes("since") || lower.includes("for") || lower.includes("kéo dài") || lower.includes("kết quả") || lower.includes("hiện tại")) {
        accuratePoints.push("Hiểu rõ sự kết nối quá khứ với hiện tại (kéo dài đến nay hoặc để lại kết quả) và cặp từ since/for.");
      } else {
        missingPoints.push("Lưu ý phân biệt 'since + mốc thời gian' (since 2015) và 'for + khoảng thời gian' (for 5 years).");
      }

      if (lower.includes("yesterday") || lower.includes("ago") || lower.includes("last year")) {
        misconceptions.push({
          whatUserWrote: "Kết hợp thì HTHT với mốc thời gian như yesterday / ago / in 2020",
          correction: "Các mốc này bắt buộc dùng Quá Khứ Đơn",
          explanation: "Hiện tại hoàn thành KHÔNG đi kèm mốc thời gian đã chấm dứt hoàn toàn.",
        });
      }
    } else if (lesson.id === "passive-voice-foundation" || lesson.id === "day8-passive-voice") {
      if (lower.includes("be") && (lower.includes("v3") || lower.includes("pii") || lower.includes("bị động"))) {
        accuratePoints.push("Nhớ công thức cốt lõi: Be (chia theo thì) + V3/ed.");
      } else {
        missingPoints.push("Công thức nền tảng: Bắt buộc phải có 'Be' chia đúng thì + Động từ V3/ed.");
      }

      if (lower.includes("map") || lower.includes("process") || lower.includes("bản đồ") || lower.includes("quy trình") || lower.includes("khách quan")) {
        accuratePoints.push("Nhớ ứng dụng đắt giá trong IELTS: Dùng cho Task 1 Map & Process để tăng tính khách quan.");
      } else {
        missingPoints.push("Nhớ ứng dụng thực chiến: Dùng cho Writing Task 1 dạng Map (was built) & Process (is collected).");
      }
    } else if (lesson.id === "comparisons-foundation" || lesson.id === "day9-comparatives" || lesson.id === "day10-advanced-comparisons") {
      if (lower.includes("hơn") || lower.includes("nhất") || lower.includes("more") || lower.includes("-er") || lower.includes("the more")) {
        accuratePoints.push("Đã nắm được các hình thái so sánh: hơn (-er/more), nhất (-est/most) và so sánh kép.");
      } else {
        missingPoints.push("Cần phân biệt tính từ ngắn (thêm -er/-est) và tính từ dài (dùng more/most).");
      }
      if (lower.includes("that of") || lower.includes("those of") || lower.includes("task 1")) {
        accuratePoints.push("Rất tốt! Đã nhớ cấu trúc so sánh học thuật 'that of / those of' cho biểu đồ số liệu.");
      } else {
        missingPoints.push("Lưu ý cấu trúc nâng band: Dùng 'higher than that of...' thay vì so sánh khập khiễng.");
      }
    } else if (lesson.id === "relative-clauses-basic" || lesson.id === "day11-relative-clauses-who-which" || lesson.id === "day12-relative-clauses-where-when-whose") {
      if (lower.includes("who") || lower.includes("which") || lower.includes("that") || lower.includes("whose")) {
        accuratePoints.push("Nhớ rõ các đại từ quan hệ: who (người), which (vật), whose (sở hữu), that.");
      } else {
        missingPoints.push("Cần liệt kê đủ đại từ quan hệ: Who (người), Which (vật), That (cả hai), Whose (sở hữu).");
      }
      if (lower.includes("phẩy") || lower.includes("xác định") || lower.includes("không xác định")) {
        accuratePoints.push("Nắm được sự khác biệt giữa mệnh đề có dấu phẩy (không xác định) và không có dấu phẩy (xác định).");
      } else {
        missingPoints.push("Bẫy lớn: Mệnh đề có dấu phẩy (không xác định) TUYỆT ĐỐI không dùng 'that'.");
      }
    } else if (lesson.id === "conditionals-type1-2" || lesson.id === "day13-first-conditional" || lesson.id === "day14-second-conditional") {
      if (lower.includes("loại 1") || lower.includes("loại 2") || lower.includes("will") || lower.includes("would") || lower.includes("were")) {
        accuratePoints.push("Đã phân biệt được Loại 1 (khả năng thực tế - will) và Loại 2 (giả định hiện tại - would/were).");
      } else {
        missingPoints.push("Cần nhớ: Loại 1 (If + HTĐ, S + will + V) vs Loại 2 (If + QKĐ/were, S + would + V).");
      }
      if (/\bif\s+.*\bwill\b/i.test(lower)) {
        misconceptions.push({
          whatUserWrote: "Dùng 'will' ngay trong mệnh đề If (ví dụ: If it will rain)",
          correction: "Mệnh đề If chỉ dùng Hiện tại đơn (If it rains)",
          explanation: "Mệnh đề chứa liên từ If trong Loại 1 KHÔNG BAO GIỜ dùng 'will'. Chỉ mệnh đề kết quả mới dùng will.",
        });
      }
    } else {
      // General advanced grammar checks
      accuratePoints.push("Đã chủ động tóm lược các quy luật cú pháp học thuật.");
      if (!lower.includes("văn cảnh") && !lower.includes("áp dụng") && !lower.includes("writing")) {
        missingPoints.push("Hãy liên hệ thêm cách đưa cấu trúc này vào bài viết Writing Task 1 hoặc Task 2.");
      }
    }
  }

  // =========================================================================
  // STEP 2: EXAMINER TRAPS EVALUATION
  // =========================================================================
  else if (stepNumber === 2) {
    const traps = lesson.step2Traps.examinerTraps;

    const trapKeywords = ["bẫy", "sai", "lỗi", "nhầm", "trừ điểm", "gra", "tránh", "không được", "wrong", "mistake", "careful", "lưu ý"];
    const hasTrapTone = trapKeywords.some((kw) => lower.includes(kw));

    if (hasTrapTone) {
      accuratePoints.push("Có ý thức phản xạ bẫy khảo thí rất tốt: Nhận diện rõ những lỗi sai khiến giám khảo trừ điểm.");
    } else {
      missingPoints.push("Nên nhấn mạnh cụ thể: Giám khảo thường cài bẫy ở đâu và học sinh hay mất điểm vì lý do gì.");
    }

    let detectedTrapCount = 0;
    traps.forEach((trap, idx) => {
      const trapWords = trap.trapNameVi.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      const isMentioned = trapWords.some((w) => lower.includes(w));
      if (isMentioned) {
        detectedTrapCount++;
        accuratePoints.push(`Đã ghi nhớ Bẫy ${idx + 1}: ${trap.trapNameVi}.`);
      } else {
        missingPoints.push(`Chưa đề cập Bẫy ${idx + 1}: ${trap.trapNameVi} (Lời giải: ${trap.band80CorrectExample}).`);
      }
    });
  }

  // =========================================================================
  // STEP 3: BAND 8.5+ DISSECTION EVALUATION
  // =========================================================================
  else if (stepNumber === 3) {
    const dissections = lesson.step3Band85Dissections.academicDissections;

    if (lower.includes("band") || lower.includes("collocation") || lower.includes("học thuật") || lower.includes("câu ghép") || lower.includes("nâng band") || lower.includes("cú pháp")) {
      accuratePoints.push("Đã nắm bắt được tiêu chí nâng Band: Phối hợp ngữ pháp linh hoạt và từ vựng học thuật cao cấp.");
    } else {
      missingPoints.push("Hãy chú ý đến các cụm từ Collocations đắt giá và cách tác giả kết nối các mệnh đề trong câu mẫu.");
    }

    dissections.forEach((d) => {
      d.keyCollocations.forEach((colloc) => {
        if (lower.includes(colloc.toLowerCase())) {
          accuratePoints.push(`Đã tự tay ứng dụng Collocation Band 8.5+: "${colloc}".`);
        }
      });
    });

    if (accuratePoints.length === 0) {
      missingPoints.push("Hãy thử tự viết lại 1 câu văn của chính bạn áp dụng cấu trúc Band 8.5+ vừa học.");
    }
  }

  // General presence of user's own examples
  if (lower.includes("ví dụ") || lower.includes("vd:") || lower.includes("example") || lower.includes("eg:") || /"[\w\s]+"/i.test(trimmed)) {
    accuratePoints.push("Rất tuyệt vời: Bạn đã tự đặt ví dụ minh họa bằng văn phong của riêng mình!");
  } else {
    missingPoints.push("Gợi ý: Nếu bạn tự viết thêm 1 ví dụ cụ thể của mình, kiến thức sẽ in sâu vào não gấp 3 lần.");
  }

  // =========================================================================
  // CALCULATE SCORE & OVERALL RATING
  // =========================================================================
  let rawScore = 50;
  rawScore += accuratePoints.length * 15;
  rawScore -= misconceptions.length * 20;
  rawScore -= Math.min(missingPoints.length * 5, 25);

  if (words.length > 25) rawScore += 10;
  if (words.length > 50) rawScore += 5;

  const scorePercent = Math.max(25, Math.min(98, rawScore));

  let scoreLevel: ActiveRecallFeedback["scoreLevel"] = "good";
  let statusLabel = "Nắm Khá Tốt Kiến Thức";
  let summaryFeedback = "Bạn đã nhớ được những ý chính quan trọng của bước học này. Hãy đọc thêm các điểm gợi ý bên dưới để hoàn thiện bức tranh ngữ pháp.";

  if (misconceptions.length > 0) {
    scoreLevel = "needs_improvement";
    statusLabel = "Phát Hiện Nhầm Lẫn / Cần Điều Chỉnh";
    summaryFeedback = "Có một số điểm bạn đang hiểu nhầm hoặc chia công thức chưa chuẩn. Xem kỹ phần đối chiếu lỗi sai bên dưới để chỉnh lại ngay nhé!";
  } else if (scorePercent >= 80) {
    scoreLevel = "excellent";
    statusLabel = "Khắc Sâu Kiến Thức Xuất Sắc!";
    summaryFeedback = "Tuyệt vời! Bạn đã ghi nhớ trọn vẹn bản chất và quy tắc của bước này bằng chính ngôn từ của bạn. Đây chính là phương pháp Feynman đỉnh cao!";
  }

  // Mentor Advice
  let mentorAdvice = "Quy tắc vàng: Đừng chỉ đọc thuộc lòng công thức — hãy gắn công thức với 1 câu chuyện thực tế về bản thân bạn để biến nó thành phản xạ vô điều kiện.";
  if (lesson.id === "present-simple-foundation" || lesson.id === "day1-present-simple-to-be" || lesson.id === "day2-present-simple-verbs") {
    mentorAdvice = "Mẹo phản xạ: Cứ nhìn thấy He / She / It ➔ Đầu tự động nảy số 'thêm s/es vào động từ ngay lập tức'. To Be dùng như dấu bằng (=).";
  } else if (lesson.id === "past-simple-foundation" || lesson.id === "day4-past-simple-to-be" || lesson.id === "day5-past-simple-verbs") {
    mentorAdvice = "Mẹo phản xạ: Viết Task 1 có năm quá khứ ➔ Khóa chặt thì Quá khứ đơn, không được lẫn lộn Hiện tại hoàn thành.";
  } else if (lesson.id === "present-perfect-foundation" || lesson.id === "day6-present-perfect" || lesson.id === "day7-past-vs-present-perfect") {
    mentorAdvice = "Mẹo phản xạ: Since + mốc thời gian điểm (Since 2020); For + khoảng độ dài thời gian (For 5 years).";
  } else if (lesson.id === "day8-passive-voice" || lesson.id === "passive-voice-foundation") {
    mentorAdvice = "Mẹo phản xạ: Be + V3/ed cho đối tượng bị tác động; cấm bị động hóa nội động từ như occur, happen, increase, rise!";
  } else if (lesson.id === "day9-comparatives" || lesson.id === "day10-advanced-comparisons" || lesson.id === "comparisons-foundation") {
    mentorAdvice = "Mẹo phản xạ: So sánh hơn ngắn thêm -er, dài dùng more. So sánh nhất BẮT BUỘC có 'THE'.";
  } else if (lesson.id === "day11-relative-clauses-who-which" || lesson.id === "day12-relative-clauses-where-when-whose" || lesson.id === "relative-clauses-basic") {
    mentorAdvice = "Mẹo phản xạ: Đã dùng who / which / that làm tân ngữ thì XÓA BỎ ngay it / them ở vế sau!";
  } else if (lesson.id === "day13-first-conditional" || lesson.id === "day14-second-conditional" || lesson.id === "conditionals-type1-2") {
    mentorAdvice = "Mẹo phản xạ: Mệnh đề IF cấm kỵ dùng 'will'. Loại 2 dùng 'were' cho mọi ngôi!";
  }

  return {
    scorePercent,
    scoreLevel,
    statusLabel,
    summaryFeedback,
    accuratePoints: Array.from(new Set(accuratePoints)),
    missingPoints: Array.from(new Set(missingPoints)),
    misconceptions,
    mentorAdvice,
    timestamp: new Date().toISOString(),
  };
}
