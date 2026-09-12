import { PMExerciseType } from "@/data/mockProcessMapData";

export interface PassiveAnalysisResult {
  passiveSentenceCount: number;
  totalSentenceCount: number;
  passiveRatioPercentage: number;
  detectedPassives: string[];
  detectedActives: string[];
  assessmentVi: string;
  isOptimal: boolean;
}

export interface OverviewValidationResult {
  isValid: boolean;
  scoreOutOf10: number;
  hasOverviewSignpost: boolean;
  hasTotalStages?: boolean;
  hasStartingPoint?: boolean;
  hasFinalOutput?: boolean;
  hasUrbanizationTrend?: boolean;
  hasPeriodComparison?: boolean;
  missingElementsVi: string[];
  praisedElementsVi: string[];
  feedbackSummaryVi: string;
}

export interface BandScoreAssessment {
  overallBand: number;
  taskAchievement: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
  wordCount: number;
  taFeedbackVi: string;
  ccFeedbackVi: string;
  lrFeedbackVi: string;
  graFeedbackVi: string;
  actionableTipsVi: string[];
}

// Irregular / common past participles for passive voice detection
const PASSIVE_PARTICIPLE_PATTERN =
  /\b(is|are|was|were|been|being|be|to be)\s+([a-z]+ed|[a-z]+en|bound|cut|fed|wound|spread|built|cast|made|set|drawn|held|paid|shut|sold|spent|split|struck|swept|torn|told|won|written|laid|grown|born|sent|kept|found|left)\b/gi;

const COMMON_ACTIVE_VERBS_PATTERN =
  /\b(collects|sorts|shreds|soaks|heats|bleaches|presses|winds|deposits|lays|hatches|feeds|attaches|pupates|emerges|expands|transforms|flies|reproduces|migrates|witnesses|undergoes)\b/gi;

export function calculatePassiveRatio(text: string, diagramType: PMExerciseType): PassiveAnalysisResult {
  if (!text || text.trim().length === 0) {
    return {
      passiveSentenceCount: 0,
      totalSentenceCount: 0,
      passiveRatioPercentage: 0,
      detectedPassives: [],
      detectedActives: [],
      assessmentVi: "Chưa có nội dung văn bản để phân tích thể bị động.",
      isOptimal: false,
    };
  }

  // Split into sentences (by . ! ?)
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const totalSentenceCount = Math.max(sentences.length, 1);
  const detectedPassives: string[] = [];
  const detectedActives: string[] = [];

  let passiveSentenceCount = 0;

  sentences.forEach((sentence) => {
    const passiveMatches = sentence.match(PASSIVE_PARTICIPLE_PATTERN);
    if (passiveMatches && passiveMatches.length > 0) {
      passiveSentenceCount++;
      passiveMatches.forEach((m) => {
        if (!detectedPassives.includes(m.toLowerCase())) {
          detectedPassives.push(m.toLowerCase());
        }
      });
    }

    const activeMatches = sentence.match(COMMON_ACTIVE_VERBS_PATTERN);
    if (activeMatches && activeMatches.length > 0) {
      activeMatches.forEach((m) => {
        if (!detectedActives.includes(m.toLowerCase())) {
          detectedActives.push(m.toLowerCase());
        }
      });
    }
  });

  const passiveRatioPercentage = Math.round((passiveSentenceCount / totalSentenceCount) * 100);

  let assessmentVi = "";
  let isOptimal = false;

  if (diagramType === "process_manmade") {
    if (passiveRatioPercentage >= 50) {
      assessmentVi = "Tuyệt vời! Bạn đang sử dụng thể bị động học thuật rất tốt (>50%) để giữ tính khách quan cho quy trình công nghiệp.";
      isOptimal = true;
    } else if (passiveRatioPercentage >= 30) {
      assessmentVi = "Khá tốt, tuy nhiên hãy chuyển đổi thêm một số câu chủ động sang bị động để văn phong chuẩn báo cáo công nghiệp hơn.";
      isOptimal = false;
    } else {
      assessmentVi = "Cảnh báo: Tỷ lệ câu bị động quá thấp (<30%). Trong quy trình nhân tạo, hãy tránh dùng đại từ nhân xưng hoặc câu chủ động không cần thiết.";
      isOptimal = false;
    }
  } else if (diagramType === "process_natural") {
    if (passiveRatioPercentage <= 40) {
      assessmentVi = "Tuyệt vời! Vòng đời sinh thái tự nhiên cần chủ yếu thể chủ động của sinh vật (Active voice), bạn đã sử dụng rất chuẩn xác.";
      isOptimal = true;
    } else {
      assessmentVi = "Lưu ý: Bạn đang dùng hơi nhiều câu bị động cho vòng đời sinh học tự nhiên. Hãy chuyển sang thể chủ động của sinh vật (ví dụ: 'the caterpillar feeds', 'the butterfly emerges').";
      isOptimal = false;
    }
  } else {
    // Map evolution
    if (passiveRatioPercentage >= 40 && passiveRatioPercentage <= 75) {
      assessmentVi = "Tỷ lệ câu bị động cân bằng lý tưởng (40% - 75%) cho bài miêu tả quy hoạch và biến đổi không gian đô thị.";
      isOptimal = true;
    } else {
      assessmentVi = "Hãy phối hợp linh hoạt giữa câu bị động (ví dụ: 'was demolished', 'was erected') và câu chủ động miêu tả không gian (ví dụ: 'the park occupies', 'witnessed radical changes').";
      isOptimal = false;
    }
  }

  return {
    passiveSentenceCount,
    totalSentenceCount,
    passiveRatioPercentage,
    detectedPassives,
    detectedActives,
    assessmentVi,
    isOptimal,
  };
}

export function validateProcessOverview(text: string): OverviewValidationResult {
  if (!text || text.trim().length === 0) {
    return {
      isValid: false,
      scoreOutOf10: 0,
      hasOverviewSignpost: false,
      hasTotalStages: false,
      hasStartingPoint: false,
      hasFinalOutput: false,
      missingElementsVi: ["Chưa viết đoạn Overview."],
      praisedElementsVi: [],
      feedbackSummaryVi: "Vui lòng hoàn thành câu Overview để nhận đánh giá chi tiết.",
    };
  }

  const hasOverviewSignpost = /\b(overall|in general|to summarize|it is noticeable that|it is evident that|as an overall trend)\b/i.test(
    text
  );
  const hasTotalStages = /\b(\d+|two|three|four|five|six|seven|eight|nine|ten|several|multiple)\s+(stages|steps|phases|cycles|processes)\b/i.test(
    text
  );
  const hasStartingPoint = /\b(commenc|begin|start|initial|first|originat|from the gathering|from the collection|from egg)\b/i.test(
    text
  );
  const hasFinalOutput = /\b(culminat|end|final|conclud|finish|complet|result in|winding|winged adult|commercial distribution|finished)\b/i.test(
    text
  );

  const missingElementsVi: string[] = [];
  const praisedElementsVi: string[] = [];
  let score = 2; // base score for writing

  if (hasOverviewSignpost) {
    score += 2;
    praisedElementsVi.push("Có từ nối mở đầu Overview chuẩn học thuật (Overall / It is evident that).");
  } else {
    missingElementsVi.push("Thiếu từ nối định danh Overview (Nên mở đầu bằng 'Overall,...').");
  }

  if (hasTotalStages) {
    score += 2;
    praisedElementsVi.push("Đã nêu rõ tổng số bước / giai đoạn của quy trình.");
  } else {
    missingElementsVi.push("Chưa nêu rõ tổng số giai đoạn (ví dụ: 'comprises six linear stages').");
  }

  if (hasStartingPoint) {
    score += 2;
    praisedElementsVi.push("Đã xác định chính xác điểm bắt đầu / nguyên liệu đầu vào.");
  } else {
    missingElementsVi.push("Chưa nêu rõ điểm bắt đầu (ví dụ: 'commencing with the collection of...').");
  }

  if (hasFinalOutput) {
    score += 2;
    praisedElementsVi.push("Đã xác định kết quả / sản phẩm đầu ra cuối cùng.");
  } else {
    missingElementsVi.push("Chưa nêu rõ kết quả hoàn thành (ví dụ: 'culminating in finished paper reels').");
  }

  const isValid = score >= 8;
  const feedbackSummaryVi = isValid
    ? "Overview xuất sắc! Đầy đủ cả 3 trụ cột: Tổng số bước, Điểm đầu và Điểm cuối theo chuẩn Band 8.0+."
    : `Overview còn thiếu ${missingElementsVi.length} yếu tố quan trọng để đạt Band 7.5+ Task Achievement.`;

  return {
    isValid,
    scoreOutOf10: score,
    hasOverviewSignpost,
    hasTotalStages,
    hasStartingPoint,
    hasFinalOutput,
    missingElementsVi,
    praisedElementsVi,
    feedbackSummaryVi,
  };
}

export function validateMapOverview(text: string): OverviewValidationResult {
  if (!text || text.trim().length === 0) {
    return {
      isValid: false,
      scoreOutOf10: 0,
      hasOverviewSignpost: false,
      hasUrbanizationTrend: false,
      hasPeriodComparison: false,
      missingElementsVi: ["Chưa viết đoạn Overview."],
      praisedElementsVi: [],
      feedbackSummaryVi: "Vui lòng hoàn thành câu Overview để nhận đánh giá chi tiết.",
    };
  }

  const hasOverviewSignpost = /\b(overall|in general|to summarize|it is noticeable that|it is evident that|as an overall trend)\b/i.test(
    text
  );
  const hasUrbanizationTrend = /\b(modernis|moderniz|transform|urbanis|urbaniz|develop|commercial|residential|amenit|redevelop|infrastructur|pedestrian|renovat|high-density|sustainable)\b/i.test(
    text
  );
  const hasPeriodComparison = /\b(from\s+.*\s+to|between\s+.*\s+and|transition|over the.*period|over the.*timeframe|prior to|subsequent|decades?|years?)\b/i.test(
    text
  );
  const hasPreservationOrContrast = /\b(while|whereas|intact|unaltered|unchanged|contrast|preserved|retained)\b/i.test(
    text
  );

  const missingElementsVi: string[] = [];
  const praisedElementsVi: string[] = [];
  let score = 2;

  if (hasOverviewSignpost) {
    score += 2;
    praisedElementsVi.push("Có từ nối mở đầu Overview chuẩn mực (Overall,...).");
  } else {
    missingElementsVi.push("Thiếu từ khóa báo hiệu Overview (Nên mở đầu bằng 'Overall,...').");
  }

  if (hasUrbanizationTrend) {
    score += 3;
    praisedElementsVi.push("Khái quát hóa được xu hướng biến đổi/đô thị hóa tổng thể.");
  } else {
    missingElementsVi.push("Chưa nêu được xu hướng chuyển đổi chính (ví dụ: 'modernization', 'commercial and residential transition').");
  }

  if (hasPeriodComparison) {
    score += 2;
    praisedElementsVi.push("Đã xác định mốc thời gian hoặc khoảng biến đổi.");
  } else {
    missingElementsVi.push("Chưa liên hệ mốc thời gian so sánh (ví dụ: 'over the 30-year period').");
  }

  if (hasPreservationOrContrast) {
    score += 1;
    praisedElementsVi.push("Có điểm nhấn so sánh yếu tố giữ nguyên không đổi hoặc sự tương phản nổi bật.");
  }

  const isValid = score >= 8;
  const feedbackSummaryVi = isValid
    ? "Overview Map cực kỳ sắc bén! Khái quát hóa được xu hướng biến đổi hạ tầng không gian tổng thể."
    : `Overview Map cần bổ sung ${missingElementsVi.length} điểm để nâng tầm lên Band 7.5+.`;

  return {
    isValid,
    scoreOutOf10: score,
    hasOverviewSignpost,
    hasUrbanizationTrend,
    hasPeriodComparison,
    missingElementsVi,
    praisedElementsVi,
    feedbackSummaryVi,
  };
}

export function detectSequencingSignposts(text: string): string[] {
  const signpostsList = [
    "commencing with",
    "in the initial stage",
    "in the initial phase",
    "first and foremost",
    "following this",
    "subsequently",
    "in the subsequent stage",
    "in the subsequent phase",
    "concurrently",
    "at this juncture",
    "prior to",
    "in the penultimate phase",
    "in the penultimate stage",
    "thereafter",
    "culminates in",
    "the process culminates in",
    "in the concluding stage",
    "afterwards",
    "upon completion of",
    "once hatched",
    "the cycle begins when",
  ];

  const found: string[] = [];
  const lower = text.toLowerCase();
  signpostsList.forEach((sp) => {
    if (lower.includes(sp)) {
      found.push(sp);
    }
  });

  return found;
}

export function detectSpatialLexicon(text: string): string[] {
  const spatialList = [
    "demolished",
    "flattened",
    "knocked down",
    "cleared to make way for",
    "erected",
    "constructed",
    "developed",
    "converted into",
    "repurposed as",
    "replaced by",
    "gave way to",
    "superseded by",
    "expanded",
    "enlarged",
    "widened",
    "downsized",
    "curtailed",
    "remained intact",
    "stood unaltered",
    "pedestrianized",
    "annexed",
    "modernized",
  ];

  const found: string[] = [];
  const lower = text.toLowerCase();
  spatialList.forEach((sp) => {
    if (lower.includes(sp)) {
      found.push(sp);
    }
  });

  return found;
}

export function estimateBandScore(
  fullText: string,
  diagramType: PMExerciseType,
  wordCount: number,
  overviewValidation: OverviewValidationResult,
  passiveAnalysis: PassiveAnalysisResult
): BandScoreAssessment {
  let ta = 6.0;
  let cc = 6.0;
  let lr = 6.0;
  let gra = 6.0;

  // 1. Task Achievement (TA)
  if (wordCount >= 150) ta += 0.5;
  if (wordCount >= 170) ta += 0.5;
  if (overviewValidation.isValid) ta += 1.0;
  else if (overviewValidation.scoreOutOf10 >= 5) ta += 0.5;
  if (wordCount < 140) ta -= 1.0;

  // 2. Coherence & Cohesion (CC)
  const signposts = detectSequencingSignposts(fullText);
  if (signposts.length >= 4) cc += 1.0;
  else if (signposts.length >= 2) cc += 0.5;

  const paragraphs = fullText.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  if (paragraphs.length >= 3 && paragraphs.length <= 4) cc += 0.5;

  // 3. Lexical Resource (LR)
  const spatialWords = detectSpatialLexicon(fullText);
  if (diagramType.startsWith("map")) {
    if (spatialWords.length >= 4) lr += 1.5;
    else if (spatialWords.length >= 2) lr += 0.5;
  } else {
    if (signposts.length + passiveAnalysis.detectedPassives.length >= 6) lr += 1.5;
    else if (signposts.length >= 3) lr += 0.5;
  }

  // 4. Grammatical Range & Accuracy (GRA)
  if (passiveAnalysis.isOptimal) gra += 1.5;
  else if (passiveAnalysis.passiveRatioPercentage >= 25) gra += 0.5;

  // Clamping to standard IELTS 0.5 steps
  const clamp = (val: number) => Math.min(9.0, Math.max(4.0, Math.round(val * 2) / 2));

  const taScore = clamp(ta);
  const ccScore = clamp(cc);
  const lrScore = clamp(lr);
  const graScore = clamp(gra);

  const overall = clamp((taScore + ccScore + lrScore + graScore) / 4);

  const actionableTipsVi: string[] = [];
  if (!overviewValidation.isValid) {
    actionableTipsVi.push("Viết lại Overview theo công thức 3 trụ cột (Tổng số bước + Điểm đầu + Điểm cuối) để tối đa hóa điểm Task Achievement.");
  }
  if (!passiveAnalysis.isOptimal) {
    actionableTipsVi.push(
      diagramType === "process_manmade"
        ? "Tăng cường sử dụng thể bị động (Passive Voice) để đạt tiêu chí Grammatical Range cho bài quy trình công nghiệp."
        : "Cân bằng linh hoạt giữa câu chủ động và bị động phù hợp với ngữ cảnh thực tế của đề bài."
    );
  }
  if (wordCount < 150) {
    actionableTipsVi.push("Độ dài bài viết chưa đạt mốc tối thiểu 150 từ (sẽ bị trừ điểm nặng về Task Response).");
  }

  return {
    overallBand: overall,
    taskAchievement: taScore,
    coherenceCohesion: ccScore,
    lexicalResource: lrScore,
    grammaticalRange: graScore,
    wordCount,
    taFeedbackVi:
      taScore >= 8.0
        ? "Overview bao quát trọn vẹn đặc trưng chính và không bỏ sót chi tiết quan trọng."
        : "Cần cải thiện độ chính xác của Overview và đảm bảo báo cáo đầy đủ các biến đổi/công đoạn.",
    ccFeedbackVi:
      ccScore >= 8.0
        ? "Cấu trúc 4 đoạn chặt chẽ, các liên từ chỉ thứ tự và liên kết không gian luân chuyển rất mượt mà."
        : "Nên phân đoạn rõ ràng (Intro -> Overview -> Body 1 -> Body 2) và chèn thêm liên từ tuần tự.",
    lrFeedbackVi:
      lrScore >= 8.0
        ? "Vốn từ vựng biến đổi không gian / thuật ngữ quy trình rất phong phú và chính xác tuyệt đối."
        : "Hãy tích cực tận dụng bộ từ vựng chuyên dụng (Urban Lexicon / Process Signposts) trong cẩm nang.",
    graFeedbackVi:
      graScore >= 8.0
        ? "Sử dụng thể bị động học thuật và thì ngữ pháp chuẩn xác không tì vết."
        : "Chú ý kiểm soát tỷ lệ thể bị động và cấu trúc câu phức bổ ngữ.",
    actionableTipsVi,
  };
}
