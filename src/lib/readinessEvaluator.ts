/**
 * Cambridge 7.5 Readiness Index (CRI) Engine & 5-Vector Telemetry Evaluator
 * Step 99 / 100 - The Unified 5-Module Telemetry Orchestrator & Certification Engine
 */

export interface VectorMetrics {
  theoryMastery: number;    // V_theory: 0 - 100 (Gateway quiz >= 80% completion)
  fsrsStability: number;    // V_vocab: 0 - 100 (Words with R >= 90% and S >= 30 days)
  errorExtinction: number;  // V_error: 0 - 100 (Errors marked mastered via 2-strike rule)
  mockConvergence: number;  // V_mock: 0 - 100 (Timed Mock Band >= 7.5 & Delta < 0.5)
  staminaScore: number;     // V_stamina: 0 - 100 (BFF < 30% and endurance under noise)
}

export interface CRICalculationResult {
  criScore: number;         // 0 - 100
  readinessTier: 'uncertified' | 'foundation_building' | 'approaching_7_0' | 'certified_band_7_5_master';
  tierLabelVi: string;
  tierDescriptionVi: string;
  predictedBand: number;    // e.g. 7.5 or 8.0
  vectorMetrics: VectorMetrics;
  isEligibleForCertificate: boolean;
  sha256VerificationHash: string;
  deficits: Array<{
    vector: keyof VectorMetrics;
    titleVi: string;
    descriptionVi: string;
    actionHref: string;
    actionLabelVi: string;
  }>;
}

/**
 * Generate a deterministic SHA-256 verification hash using Web Crypto API
 */
export async function generateCertificateHash(
  studentName: string,
  criScore: number,
  issuedTimestamp: string
): Promise<string> {
  const payload = `IELTS-FORME-CAMBRIDGE-7.5-SEAL:${studentName}:${criScore.toFixed(2)}:${issuedTimestamp}:VERIFIED-PASS-180`;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simple hash for non-browser environments
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    hash = (hash << 5) - hash + payload.charCodeAt(i);
    hash |= 0;
  }
  return `ielts75_${Math.abs(hash).toString(16).padStart(16, '0')}`;
}

/**
 * Compute Cambridge Readiness Index (CRI) from 5 telemetry vectors
 * CRI = (V_theory * 0.15) + (V_vocab * 0.20) + (V_error * 0.25) + (V_mock * 0.25) + (V_stamina * 0.15)
 */
export function computeCRIMetrics(metrics: VectorMetrics, studentName = 'Học Viên Vượt Vũ Môn'): CRICalculationResult {
  const { theoryMastery, fsrsStability, errorExtinction, mockConvergence, staminaScore } = metrics;

  const rawCRI =
    theoryMastery * 0.15 +
    fsrsStability * 0.20 +
    errorExtinction * 0.25 +
    mockConvergence * 0.25 +
    staminaScore * 0.15;

  const criScore = Math.round(Math.min(100, Math.max(0, rawCRI)));

  // Estimate Predicted Band
  let predictedBand = 5.5;
  if (criScore >= 95) predictedBand = 8.5;
  else if (criScore >= 88) predictedBand = 8.0;
  else if (criScore >= 80) predictedBand = 7.5;
  else if (criScore >= 70) predictedBand = 7.0;
  else if (criScore >= 60) predictedBand = 6.5;
  else if (criScore >= 50) predictedBand = 6.0;

  const isEligibleForCertificate = criScore >= 88;

  let readinessTier: CRICalculationResult['readinessTier'] = 'uncertified';
  let tierLabelVi = 'Cần Bồi Dưỡng Nền Tảng (Band <6.0)';
  let tierDescriptionVi = 'Học viên chưa hoàn tất các cổng kiểm soát cốt lõi. Cần gia cố từ vựng và ngữ pháp.';

  if (criScore >= 88) {
    readinessTier = 'certified_band_7_5_master';
    tierLabelVi = 'Đủ Điều Kiện Cấp Chứng Chỉ Sẵn Sàng Band 7.5 - 8.5+';
    tierDescriptionVi = 'Bạn đã hội tụ đầy đủ 5 vector: Nắm vững bản chất, vốn từ vựng bất biến, sạch lỗi sai và thần kinh thép trong phòng thi!';
  } else if (criScore >= 75) {
    readinessTier = 'approaching_7_0';
    tierLabelVi = 'Ngưỡng Chạm Band 7.0 - Sắp Hoàn Tất';
    tierDescriptionVi = 'Các kỹ năng đã đạt độ chín. Chỉ cần triệt tiêu nốt các lỗi sai sót trong Error Bank và luyện đề 3-Pass.';
  } else if (criScore >= 60) {
    readinessTier = 'foundation_building';
    tierLabelVi = 'Đang Tích Lũy Phase 2 (Band 6.0 - 6.5)';
    tierDescriptionVi = 'Đã nắm vững lý thuyết và các dạng bài cơ bản. Cần đẩy mạnh tốc độ xử lý và sự bền bỉ nhận thức.';
  }

  // Detect Deficits and prescribe immediate remedies
  const deficits: CRICalculationResult['deficits'] = [];

  if (theoryMastery < 85) {
    deficits.push({
      vector: 'theoryMastery',
      titleVi: 'Hổng Cổng Kiểm Soát Lý Thuyết Bản Chất (Theory Gateway)',
      descriptionVi: `Độ hoàn thiện bài học hiện tại là ${theoryMastery}%. Cần vượt qua toàn bộ Gateway Quiz đạt tối thiểu 80%.`,
      actionHref: '/theory',
      actionLabelVi: 'Vào Module 1 (Theory Hub)'
    });
  }

  if (fsrsStability < 85) {
    deficits.push({
      vector: 'fsrsStability',
      titleVi: 'Chưa Khóa Ổn Định Trí Nhớ FSRS (S < 30 Ngày)',
      descriptionVi: `Tỷ lệ từ vựng AWL đạt chỉ số ghi nhớ R >= 90% hiện tại là ${fsrsStability}%. Cần ôn tập các Flashcards tới hạn.`,
      actionHref: '/vocab',
      actionLabelVi: 'Vào Module 4 (FSRS Vocab Matrix)'
    });
  }

  if (errorExtinction < 88) {
    deficits.push({
      vector: 'errorExtinction',
      titleVi: 'Tồn Đọng Lỗi Tái Diễn Trong Ngân Hàng Lỗi Sai (Error Bank)',
      descriptionVi: `Tỷ lệ xóa lỗi Two-Strike Mastery mới đạt ${errorExtinction}%. Cần làm đúng 2 lần liên tiếp các bẫy Reading & Paraphrase.`,
      actionHref: '/error-bank',
      actionLabelVi: 'Vào Module 5 (Error Bank Triage)'
    });
  }

  if (mockConvergence < 85) {
    deficits.push({
      vector: 'mockConvergence',
      titleVi: 'Độ Lệch Điểm Thi Thử (Delta Score) Chưa Hội Tụ',
      descriptionVi: `Độ hội tụ điểm Mock Test đạt ${mockConvergence}%. Cần làm tối thiểu 3 bài Full Mock Test với Delta Pass 1 vs Pass 2 < 0.5 band.`,
      actionHref: '/mock-test',
      actionLabelVi: 'Vào Phòng Thi Thử Full Mock'
    });
  }

  if (staminaScore < 85) {
    deficits.push({
      vector: 'staminaScore',
      titleVi: 'Suy Giảm Nhận Thức & Nhạy Cảm Tạp Âm Phòng Thi',
      descriptionVi: `Chỉ số sức bền thính giác & sương mù não đạt ${staminaScore}%. Cần luyện tập phòng giả lập tạp âm Acoustic Chaos và chuỗi 3 giờ.`,
      actionHref: '/practice/acoustic-chaos',
      actionLabelVi: 'Vào Phòng Acoustic Chaos'
    });
  }

  // Pre-generate a pseudo-hash for instantaneous sync
  const verificationDate = new Date().toISOString();
  const sha256VerificationHash = `SHA256-${criScore >= 88 ? 'CERT-75' : 'PENDING'}-${Math.abs(rawCRI * 1000).toString(16).toUpperCase()}-${Date.now().toString(16)}`;

  return {
    criScore,
    readinessTier,
    tierLabelVi,
    tierDescriptionVi,
    predictedBand,
    vectorMetrics: metrics,
    isEligibleForCertificate,
    sha256VerificationHash,
    deficits
  };
}
