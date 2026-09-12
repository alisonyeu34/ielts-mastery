export interface ActionRecommendation {
  id: string;
  priority: "critical" | "recommended" | "optional";
  title: string;
  reasoning: string;
  targetRoute: string;
  actionLabel: string;
  category: "vocab" | "error_bank" | "roadmap" | "mock_test" | "drills";
  iconName: "Brain" | "ShieldAlert" | "Target" | "Award" | "Zap" | "BookOpen";
  estimatedMinutes: number;
  badgeText?: string;
}

export interface RecommenderInputData {
  dueVocabCount: number;
  totalVocabCount: number;
  unresolvedErrorsCount: number;
  topErrorType?: string;
  currentRoadmapDay: number;
  mockTestCount: number;
  recentMockBand?: number;
}

/**
 * Pedagogical Next-Best-Action (NBA) Recommender Algorithm
 * Prioritizes: Due FSRS Vocab -> Unresolved Error Drills -> Roadmap Progress -> Mock Test
 */
export function generateNextBestActions(
  data: RecommenderInputData
): ActionRecommendation[] {
  const recommendations: ActionRecommendation[] = [];

  // Priority 1: Due FSRS Vocabulary Review
  if (data.dueVocabCount > 0) {
    recommendations.push({
      id: "nba_vocab_due",
      priority: "critical",
      title: `Ôn tập ${data.dueVocabCount} từ vựng FSRS đến hạn`,
      reasoning: `Thuật toán FSRS phát hiện ${data.dueVocabCount} từ vựng học thuật đang ở điểm rơi của đường cong lãng quên (Retrievability < 90%). Ôn ngay để lưu vào trí nhớ dài hạn.`,
      targetRoute: "/vocab",
      actionLabel: "Bắt đầu Ôn Từ Vựng Ngay",
      category: "vocab",
      iconName: "Brain",
      estimatedMinutes: Math.min(30, Math.max(10, Math.ceil(data.dueVocabCount * 0.75))),
      badgeText: `${data.dueVocabCount} từ cần ôn`,
    });
  }

  // Priority 2: Unresolved Error Bank Drills
  if (data.unresolvedErrorsCount > 0) {
    const errorTypeLabelMap: Record<string, string> = {
      grammar: "Ngữ pháp (Grammar)",
      pronunciation: "Phát âm (Pronunciation)",
      spelling_typo: "Chính tả & Số ít/số nhiều (Spelling)",
      paraphrase_trap: "Bẫy Paraphrase",
      careless_reading: "Đọc ẩu / Bẫy câu hỏi",
      vocabulary: "Từ vựng (Vocabulary)",
    };

    const topTypeFormatted = data.topErrorType
      ? errorTypeLabelMap[data.topErrorType] || data.topErrorType
      : "Ngữ pháp & Bẫy khảo thí";

    recommendations.push({
      id: "nba_error_drill",
      priority: data.unresolvedErrorsCount >= 5 ? "critical" : "recommended",
      title: `Triệt tiêu ${data.unresolvedErrorsCount} lỗi sai còn tồn đọng`,
      reasoning: `Hệ thống ghi nhận nhóm lỗi "${topTypeFormatted}" xuất hiện lặp lại. Thực hiện phiên Drill 10 phút để hóa giải bẫy của giám khảo Cambridge.`,
      targetRoute: "/error-bank/drill",
      actionLabel: "Vào Phòng Sửa Lỗi Sâu",
      category: "error_bank",
      iconName: "ShieldAlert",
      estimatedMinutes: 15,
      badgeText: `${data.unresolvedErrorsCount} lỗi chưa xử lý`,
    });
  }

  // Priority 3: Daily Roadmap 165-Day Progression
  recommendations.push({
    id: "nba_roadmap_day",
    priority: recommendations.length === 0 ? "critical" : "recommended",
    title: `Nhiệm vụ Ngày ${data.currentRoadmapDay}/165 trên Bản đồ Lộ trình`,
    reasoning: `Duy trì kỷ luật học tập với các ca học trọng tâm của Ngày ${data.currentRoadmapDay} trên bản đồ lộ trình.`,
    targetRoute: "/roadmap",
    actionLabel: "Mở Bản Đồ Lộ Trình",
    category: "roadmap",
    iconName: "Target",
    estimatedMinutes: 45,
    badgeText: `Ngày ${data.currentRoadmapDay}`,
  });

  // Priority 4: Mock Test Simulation
  if (data.mockTestCount === 0 || data.currentRoadmapDay % 30 === 0) {
    recommendations.push({
      id: "nba_mock_test",
      priority: "optional",
      title: "Thi thử tổng duyệt 4 kỹ năng (Computer-Delivered IELTS)",
      reasoning: "Kiểm tra phong độ thực chiến dưới áp lực phòng thi thật và đo lường khoảng cách Band điểm so với mục tiêu 7.5.",
      targetRoute: "/mock-test",
      actionLabel: "Vào Phòng Thi Thử",
      category: "mock_test",
      iconName: "Award",
      estimatedMinutes: 165,
      badgeText: "Full 4 Kỹ Năng",
    });
  }

  return recommendations;
}
