/**
 * Map & Process Linguistic Engineering & Validation Engine
 * IELTS Writing Task 1 Non-Numeric Studio (Band 7.5 - 8.5+)
 */

export interface PrepositionErrorItem {
  snippet: string;
  ruleExplanation: string;
  correctForm: string;
}

export interface MapPrepositionAudit {
  errors: PrepositionErrorItem[];
  validCount: number;
  score: number; // 0 - 100
}

export interface ProcessPassiveViolation {
  snippet: string;
  violation: string;
  suggestedPassive: string;
}

export interface ProcessPassiveAudit {
  totalClauses: number;
  passiveClauses: number;
  passiveRatio: number; // 0 - 100%
  activeHumanSubjectViolations: ProcessPassiveViolation[];
  stageSequencersFound: string[];
  isPass: boolean;
}

export interface MapProcessOverallScore {
  taskType: 'map' | 'process';
  wordCount: number;
  taScore: number;
  ccScore: number;
  lrScore: number;
  graScore: number;
  overallBand: number;
  strengths: string[];
  warnings: string[];
  recommendations: string[];
}

export const SPATIAL_PREPOSITION_RULES = [
  {
    rule: 'Inside the boundary (Bên trong địa giới)',
    correctPattern: 'in the north / south / east / west of [Town/Area]',
    incorrectTrap: 'to the north of (dùng khi nằm bên trong)',
    explanation: 'Khi một công trình hoặc khu vực nằm hoàn toàn BÊN TRONG phạm vi địa giới của thị trấn/thành phố, bắt buộc phải dùng "in the [direction] of". Ví dụ: "A new supermarket was constructed in the north-east of the town."'
  },
  {
    rule: 'Outside the boundary (Tách biệt bên ngoài)',
    correctPattern: 'to the north / south / east / west of [Town/Area]',
    incorrectTrap: 'in the north of (dùng khi nằm tách biệt bên ngoài)',
    explanation: 'Khi một công trình hoặc địa điểm nằm TÁCH BIỆT BÊN NGOÀI về một hướng xác định, bắt buộc phải dùng "to the [direction] of". Ví dụ: "An offshore wind farm was installed to the south of the coastal bay."'
  },
  {
    rule: 'Along the boundary or coastline (Dọc theo biên giới/bờ biển)',
    correctPattern: 'on the coast / on the eastern border / along the riverbank',
    incorrectTrap: 'in the coast / at the riverbank',
    explanation: 'Với địa hình bờ biển, bờ sông hoặc đường biên giới, sử dụng giới từ "on" hoặc "along". Ví dụ: "Residential apartments were erected on the southern coastline."'
  },
  {
    rule: 'Adjacent & Juxtaposition (Liền kề / Đối diện)',
    correctPattern: 'adjacent to / juxtaposed against / in close proximity to',
    incorrectTrap: 'adjacent with / close by to',
    explanation: 'Sử dụng các cụm giới từ học thuật C1/C2 để chỉ vị trí tương đối: "The medical centre was erected adjacent to the newly constructed roundabout."'
  }
];

export const STAGE_SEQUENCERS = [
  'prior to',
  'in the initial phase',
  'subsequently',
  'thereafter',
  'concurrently with',
  'simultaneously',
  'following this',
  'in the subsequent stage',
  'culminating in',
  'the cycle recommences',
  'the final step involves'
];

/**
 * Validates spatial preposition usage in Map essays
 */
export function validateSpatialPrepositions(text: string): MapPrepositionAudit {
  const errors: PrepositionErrorItem[] = [];
  let validCount = 0;

  // Regex patterns for common preposition pitfalls
  const insideTownWithToRegex = /(?:erected|built|constructed|situated|located)\s+to\s+the\s+(north|south|east|west|north-east|north-west|south-east|south-west)\s+of\s+the\s+(town|city|village|campus|centre|center|settlement)/gi;
  let match: RegExpExecArray | null;

  while ((match = insideTownWithToRegex.exec(text)) !== null) {
    errors.push({
      snippet: match[0],
      correctForm: match[0].replace(/\bto\s+the\b/i, 'in the'),
      ruleExplanation: `Lỗi giới từ không gian: Khi công trình nằm BÊN TRONG địa giới ${match[2]}, phải dùng "in the ${match[1]} of" thay vì "to the ${match[1]} of".`
    });
  }

  // Check for "in the coast"
  const inCoastRegex = /\bin\s+the\s+(?:southern|northern|eastern|western)?\s*coast\b/gi;
  while ((match = inCoastRegex.exec(text)) !== null) {
    errors.push({
      snippet: match[0],
      correctForm: match[0].replace(/\bin\b/i, 'on'),
      ruleExplanation: 'Lỗi giới từ bờ biển: Bắt buộc dùng "on the coast" hoặc "along the coastline", không dùng "in the coast".'
    });
  }

  // Check for "adjacent with"
  const adjacentWithRegex = /\badjacent\s+with\b/gi;
  while ((match = adjacentWithRegex.exec(text)) !== null) {
    errors.push({
      snippet: match[0],
      correctForm: 'adjacent to',
      ruleExplanation: 'Lỗi kết hợp giới từ: "adjacent" luôn đi kèm với giới từ "to" (adjacent to), không đi với "with".'
    });
  }

  // Count valid spatial patterns
  const validSpatialPatterns = [
    /\bin\s+the\s+(?:north|south|east|west|north-east|north-west|south-east|south-west)\b/gi,
    /\bon\s+the\s+(?:coast|coastline|bank|periphery)\b/gi,
    /\badjacent\s+to\b/gi,
    /\bin\s+the\s+vicinity\s+of\b/gi,
    /\bto\s+the\s+(?:north|south|east|west)\s+of\s+the\s+(?:island|border|boundary)\b/gi
  ];

  validSpatialPatterns.forEach((p) => {
    const matches = text.match(p);
    if (matches) validCount += matches.length;
  });

  const baseScore = Math.max(0, 100 - errors.length * 25);

  return {
    errors,
    validCount,
    score: baseScore
  };
}

/**
 * Analyzes passive voice ratio and detects informal active human subjects in Process essays
 */
export function analyzeProcessPassiveRatio(text: string): ProcessPassiveAudit {
  const activeHumanSubjectViolations: ProcessPassiveViolation[] = [];

  // Detect informal human subjects (workers, people, they, we, you) doing mechanical tasks
  const humanSubjectRegexes = [
    {
      regex: /\b(workers?|people|operators?|staff|employees?)\s+(?:put|place|take|pour|move|heat|pack|deliver|mix|grind|crush|collect|add|transport|press|filter|dry)s?\b/gi,
      desc: 'Lạm dụng chủ ngữ con người (workers/people) thay vì thể bị động khách quan'
    },
    {
      regex: /\b(we|they|you)\s+(?:can\s+see|put|pour|heat|mix|crush|add|pack|transport|extract|press)s?\b/gi,
      desc: 'Lạm dụng đại từ nhân xưng phi học thuật (we/they/you)'
    }
  ];

  humanSubjectRegexes.forEach(({ regex, desc }) => {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      activeHumanSubjectViolations.push({
        snippet: match[0],
        violation: desc,
        suggestedPassive: `Chuyển thành thể bị động khách quan: "... is/are [V-ed/V3] ..."`
      });
    }
  });

  // Count passive constructions: (is/are/was/were/being/been/undergoes/is subjected to) + V-ed/en
  const passivePattern = /\b(?:is|are|was|were|being|been|becomes|undergoes)\s+(?:subjected\s+to|[a-z]+(?:ed|en|wn|pt|lt|t))\b/gi;
  const passiveMatches = text.match(passivePattern) || [];
  const passiveClauses = passiveMatches.length;

  // Approximate clause count based on sentence punctuation and relative markers
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 15);
  const totalClauses = Math.max(1, Math.round(sentences.length * 1.8));

  const passiveRatio = Math.min(100, Math.round((passiveClauses / totalClauses) * 100));

  // Find stage sequencers
  const stageSequencersFound: string[] = [];
  STAGE_SEQUENCERS.forEach((seq) => {
    if (new RegExp(`\\b${seq}\\b`, 'i').test(text)) {
      stageSequencersFound.push(seq);
    }
  });

  const isPass = passiveRatio >= 60 && activeHumanSubjectViolations.length === 0;

  return {
    totalClauses,
    passiveClauses,
    passiveRatio,
    activeHumanSubjectViolations,
    stageSequencersFound,
    isPass
  };
}

/**
 * Comprehensive IELTS Task 1 Map & Process Essay Auditor
 */
export function auditMapProcessEssay(
  taskType: 'map' | 'process',
  text: string,
  totalStagesOrChanges: number
): MapProcessOverallScore {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const strengths: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  let taScore = 7.0;
  let ccScore = 7.0;
  let lrScore = 7.0;
  let graScore = 7.0;

  // Word count checks
  if (wordCount < 150) {
    taScore -= 1.5;
    warnings.push(`Độ dài bài viết (${wordCount} từ) chưa đạt ngưỡng chuẩn tối thiểu 150 từ của Task 1.`);
    recommendations.push('Hãy bổ sung đầy đủ 4 đoạn: Introduction, Overview (2 xu hướng chính), Body 1, và Body 2.');
  } else if (wordCount >= 170 && wordCount <= 220) {
    strengths.push(`Độ dài tối ưu (${wordCount} từ), cân đối hoàn hảo cho 20 phút làm bài Task 1.`);
  }

  // Overview check
  const overviewRegex = /\b(?:overall|in\s+general|it\s+is\s+(?:clear|evident|noticeable)\s+that)\b/i;
  if (!overviewRegex.test(text)) {
    taScore -= 1.5;
    warnings.push('Bài viết thiếu đoạn Tổng quan (Overview) rõ ràng, đây là nguyên nhân khiến Task Achievement bị giới hạn ở Band 5.0 - 6.0.');
    recommendations.push('Bắt đầu đoạn Overview bằng "Overall, it is clear that..." và nêu 2 đặc điểm biến đổi/xu hướng vĩ mô nhất.');
  } else {
    strengths.push('Đoạn Overview được định vị rõ ràng với các tín hiệu học thuật chuẩn mực.');
  }

  if (taskType === 'map') {
    const prepAudit = validateSpatialPrepositions(text);
    if (prepAudit.errors.length > 0) {
      graScore -= 0.5 * prepAudit.errors.length;
      warnings.push(`Phát hiện ${prepAudit.errors.length} lỗi giới từ không gian (in vs to vs on).`);
    } else if (prepAudit.validCount >= 3) {
      strengths.push(`Sử dụng chính xác và đa dạng các giới từ tọa độ không gian (${prepAudit.validCount} cụm chuẩn xác).`);
    }

    // Check transformation verbs
    const transformVerbs = [
      /\b(?:demolished|knocked\s+down|flattened|razed)\b/i,
      /\b(?:constructed|erected|introduced|built)\b/i,
      /\b(?:expanded|enlarged|widened|extended)\b/i,
      /\b(?:converted|transformed|made\s+way\s+for|replaced\s+by)\b/i,
      /\b(?:pedestrianized|modernized|industrialized)\b/i,
      /\b(?:remained\s+unchanged|persisted)\b/i
    ];
    let verbCount = 0;
    transformVerbs.forEach((v) => {
      if (v.test(text)) verbCount++;
    });

    if (verbCount >= 4) {
      lrScore += 0.5;
      strengths.push(`Vốn từ vựng biến đổi quy hoạch đô thị C1/C2 phong phú (${verbCount}/6 nhóm động từ).`);
    } else {
      warnings.push('Chưa sử dụng đa dạng các cặp động từ biến đổi đô thị (xây mới, phá dỡ, mở rộng, thay thế).');
    }
  } else {
    // Process task
    const passiveAudit = analyzeProcessPassiveRatio(text);
    if (passiveAudit.activeHumanSubjectViolations.length > 0) {
      graScore -= 1.0;
      warnings.push(`Lạm dụng chủ ngữ con người chủ động (${passiveAudit.activeHumanSubjectViolations.length} câu) trong quy trình nhân tạo.`);
      recommendations.push('Chuyển toàn bộ các công đoạn xử lý máy móc sang thể bị động khách quan (is/are + V3).');
    } else if (passiveAudit.passiveRatio >= 65) {
      graScore += 0.5;
      strengths.push(`Tỷ lệ thể bị động học thuật xuất sắc (${passiveAudit.passiveRatio}%), thể hiện tính khách quan cao độ.`);
    }

    if (passiveAudit.stageSequencersFound.length >= 4) {
      ccScore += 0.5;
      strengths.push(`Mạch liên kết giai đoạn mượt mà với ${passiveAudit.stageSequencersFound.length} liên từ chuyển tiếp C1/C2.`);
    } else {
      warnings.push('Cần bổ sung các liên từ nối chuỗi giai đoạn (prior to V-ing, subsequently, concurrently with).');
    }
  }

  taScore = Math.max(4.5, Math.min(9.0, Math.round(taScore * 2) / 2));
  ccScore = Math.max(4.5, Math.min(9.0, Math.round(ccScore * 2) / 2));
  lrScore = Math.max(4.5, Math.min(9.0, Math.round(lrScore * 2) / 2));
  graScore = Math.max(4.5, Math.min(9.0, Math.round(graScore * 2) / 2));

  const overallBand = Math.round(((taScore + ccScore + lrScore + graScore) / 4) * 2) / 2;

  return {
    taskType,
    wordCount,
    taScore,
    ccScore,
    lrScore,
    graScore,
    overallBand,
    strengths,
    warnings,
    recommendations
  };
}
