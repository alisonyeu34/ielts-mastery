import { ErrorItem, UserProgress, ErrorClassification } from "@/types/database";
import { calculateRadarMetrics, ERROR_CATEGORY_DETAILS } from "./errorBankAnalytics";

export interface PrescriptionDrillItem {
  id: string;
  orderNumber: number;
  title: string;
  category: ErrorClassification;
  targetSkill: string;
  estimatedMinutes: number;
  priority: "CRITICAL" | "HIGH" | "MEDIUM";
  priorityColor: string;
  diagnosticRationale: string;
  actionTitle: string;
  actionHref: string;
  icon: string;
  targetCount: number;
  benefitStatement: string;
}

export interface DailyPrescriptionReport {
  generatedDate: string;
  dominantDeficitCategory: ErrorClassification;
  dominantDeficitLabel: string;
  dominantDeficitCount: number;
  totalPendingRemediations: number;
  urgencyLevel: "HIGH" | "MODERATE" | "LOW";
  clinicalDiagnosis: string;
  drills: PrescriptionDrillItem[];
}

/**
 * Generate 3 Personalized Daily Micro-Drill Prescriptions based on the student's error bank state
 */
export function generateDailyPrescription(
  errors: ErrorItem[],
  progress?: UserProgress | null
): DailyPrescriptionReport {
  const radar = calculateRadarMetrics(errors);
  const dominant = radar.dominantDeficit;
  const unmasteredTotal = errors.filter((e) => !e.mastered).length;
  const dominantUnmastered = dominant.unmasteredCount;

  const todayStr = new Date().toISOString().split("T")[0];

  let urgencyLevel: "HIGH" | "MODERATE" | "LOW" = "MODERATE";
  if (dominantUnmastered >= 4 || unmasteredTotal >= 10) {
    urgencyLevel = "HIGH";
  } else if (dominantUnmastered <= 1 && unmasteredTotal <= 3) {
    urgencyLevel = "LOW";
  }

  // Clinical diagnosis statement
  let clinicalDiagnosis = "";
  if (dominant.category === "grammar") {
    clinicalDiagnosis = `Phát hiện ${dominantUnmastered} lỗ hổng ngữ pháp cốt lõi (liên từ kép, chia thì, phân từ treo). Lỗi này đang trực tiếp kìm hãm tiêu chí GRA ở mức Band 5.5. Cần can thiệp phẫu thuật câu ngay.`;
  } else if (dominant.category === "pronunciation") {
    clinicalDiagnosis = `Phát hiện ${dominantUnmastered} lỗi nuốt ending sounds /s/, /z/, /d/ và mù âm vị connected speech. Cần kích hoạt phòng luyện chép chính tả và âm vị để tránh mất điểm Listening & Speaking.`;
  } else if (dominant.category === "paraphrase_trap") {
    clinicalDiagnosis = `Phát hiện ${dominantUnmastered} lần sập bẫy từ đồng nghĩa bóp méo nghĩa và bẫy đồng thuận giả. Cần rèn luyện nhận diện bẫy ngụy biện nhân quả vs tương quan trong Reading & Listening.`;
  } else if (dominant.category === "singular_plural") {
    clinicalDiagnosis = `Phát hiện ${dominantUnmastered} lỗi bất cẩn số ít / số nhiều và danh từ không đếm được. Đây là bẫy 'mất điểm oan' phổ biến nhất trong Section 1 và Task 1.`;
  } else if (dominant.category === "careless_reading") {
    clinicalDiagnosis = `Phát hiện ${dominantUnmastered} lỗi vi phạm Word Limit và thiên kiến chọn vội (First-mention bias). Cần rèn thói quen kiểm tra điều kiện đề thi trước khi chốt đáp án.`;
  } else {
    clinicalDiagnosis = `Hệ thống ghi nhận ${unmasteredTotal} điểm lỗi cần được xử lý theo quy tắc 2 lần liên tiếp chính xác để bảo toàn phản xạ thi chuẩn.`;
  }

  // Drill 1: Targeted Remediation Arena (Direct Error Bank Drill on Dominant Category)
  const drill1: PrescriptionDrillItem = {
    id: "rx_drill_01_arena",
    orderNumber: 1,
    title: `Triệt Tiêu Bẫy ${dominant.shortLabel} Trong Remediation Arena`,
    category: dominant.category,
    targetSkill: "Error Remediation Arena",
    estimatedMinutes: 8,
    priority: "CRITICAL",
    priorityColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    diagnosticRationale: `Giải quyết dứt điểm ${dominantUnmastered} câu sai thuộc nhóm ${dominant.label} bằng cơ chế Two-Strike Mastery (Đúng 2 lần liên tiếp).`,
    actionTitle: "Mở Phòng Luyện Arena",
    actionHref: `/error-bank?arena=true&category=${dominant.category}`,
    icon: "ShieldAlert",
    targetCount: Math.min(dominantUnmastered || 3, 5),
    benefitStatement: "+15% Tốc độ triệt tiêu lỗi (EEV) & Phục hồi điểm GRA/LR",
  };

  // Drill 2: Skill-Specific Micro-Lab (Sentence Clinic / Dictation / Split Reading)
  let drill2Title = "";
  let drill2Href = "";
  let drill2Skill = "";
  let drill2Rationale = "";
  let drill2Icon = "Zap";

  if (dominant.category === "grammar") {
    drill2Title = "Phòng Khám Câu: Phẫu Thuật Cấu Trúc Phức Band 7.0+";
    drill2Href = "/practice/sentence-clinic";
    drill2Skill = "Academic Sentence Clinic";
    drill2Rationale = "Rèn luyện sửa lỗi Comma Splice & Mệnh đề phân từ treo trên các bài tập thực chiến 3 bước.";
    drill2Icon = "FileCode2";
  } else if (dominant.category === "pronunciation" || dominant.category === "singular_plural") {
    drill2Title = "Dictation Studio: Chép Chính Tả Âm Đuôi /s/ & /ed/";
    drill2Href = "/practice/dictation";
    drill2Skill = "Acoustic Dictation Studio";
    drill2Rationale = "Luyện tai bắt âm vị dạng yếu (Weak Forms) và đuôi số nhiều trong câu thoại tốc độ 1.0x.";
    drill2Icon = "Headphones";
  } else if (dominant.category === "paraphrase_trap" || dominant.category === "careless_reading") {
    drill2Title = "Giải Mã Bẫy Reading Passage 3 & Listening S3";
    drill2Href = "/reading";
    drill2Skill = "Reading 14-Type Taxonomy";
    drill2Rationale = "Rèn luyện kỹ năng phân tích bẫy từ đồng nghĩa tuyệt đối và bẫy đồng thuận giả trước khi chọn đáp án.";
    drill2Icon = "Crosshair";
  } else {
    drill2Title = "Nâng Cấp Collocations AWL Học Thuật";
    drill2Href = "/vocab";
    drill2Skill = "Vocab Matrix FSRS";
    drill2Rationale = "Ôn tập 10 từ vựng học thuật đang đến hạn lặp lại ngắt quãng để tránh sai ngữ cảnh.";
    drill2Icon = "BookOpen";
  }

  const drill2: PrescriptionDrillItem = {
    id: "rx_drill_02_microlab",
    orderNumber: 2,
    title: drill2Title,
    category: dominant.category,
    targetSkill: drill2Skill,
    estimatedMinutes: 12,
    priority: "HIGH",
    priorityColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    diagnosticRationale: drill2Rationale,
    actionTitle: "Luyện Vi Mô Ngay",
    actionHref: drill2Href,
    icon: drill2Icon,
    targetCount: 5,
    benefitStatement: "Chuyển hóa kiến thức lý thuyết thành phản xạ làm bài tự động",
  };

  // Drill 3: FSRS Spaced Memory Anchor / Theory Gate
  const drill3: PrescriptionDrillItem = {
    id: "rx_drill_03_vocab_memory",
    orderNumber: 3,
    title: "Ôn Tập Sổ Từ Vựng AWL Đến Hạn (FSRS Memory Due)",
    category: "vocabulary",
    targetSkill: "Intelligent Vocab Matrix",
    estimatedMinutes: 5,
    priority: "MEDIUM",
    priorityColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    diagnosticRationale: "Củng cố độ bền trí nhớ (Stability) cho các từ vựng học thuật dễ nhầm lẫn trước khi bị suy giảm đường cong lãng quên.",
    actionTitle: "Ôn Thẻ FSRS Đến Hạn",
    actionHref: "/vocab",
    icon: "Sparkles",
    targetCount: 10,
    benefitStatement: "Duy trì chuỗi học tập hàng ngày & Tối ưu trí nhớ dài hạn",
  };

  return {
    generatedDate: todayStr,
    dominantDeficitCategory: dominant.category,
    dominantDeficitLabel: dominant.label,
    dominantDeficitCount: dominantUnmastered,
    totalPendingRemediations: unmasteredTotal,
    urgencyLevel,
    clinicalDiagnosis,
    drills: [drill1, drill2, drill3],
  };
}
