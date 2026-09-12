/**
 * Mock Data for Academic Hedging & Epistemic Modality Studio (Step 83)
 * 20 Dogmatic Academic Sentences with 4-Tier Epistemic Calibrations (100% -> 75% -> 50% -> 25%)
 */

export interface EpistemicCalibrationTier {
  percentage: 100 | 75 | 50 | 25;
  levelTitle: string;
  sentence: string;
  epistemicTone: string;
  cambridgeEvaluation: string;
}

export interface HedgingDrillItem {
  id: string;
  topic: string;
  dogmaticSentence: string; // 100% Certainty
  critique: string;
  calibrations: EpistemicCalibrationTier[];
  dogmaticTriggers: string[];
  suggestedHedgingPills: string[];
}

export const MOCK_HEDGING_DRILLS: HedgingDrillItem[] = [
  {
    id: "hedge_01_poverty_ubi",
    topic: "Universal Basic Income & Poverty Eradication",
    dogmaticSentence: "Universal Basic Income will definitely eliminate extreme poverty and completely solve economic inequality.",
    critique: "Sử dụng 'will definitely' và 'completely solve' là lối khẳng định võ đoán thô thiển (Dogmatic overstatement), phớt lờ các biến số lạm phát và thâm hụt tài khóa.",
    dogmaticTriggers: ["will definitely", "completely solve"],
    suggestedHedgingPills: ["arguably offers a plausible mechanism", "tends to mitigate", "subject to the caveat that fiscal sustainability is maintained"],
    calibrations: [
      {
        percentage: 100,
        levelTitle: "Dogmatic Overstatement (Võ Đoán Tuyệt Đối)",
        sentence: "Universal Basic Income will definitely eliminate extreme poverty and completely solve economic inequality.",
        epistemicTone: "Văn phong cảm tính, thiếu tư duy phản biện khoa học xã hội.",
        cambridgeEvaluation: "Band 6.0 TR: Luận điểm ngây thơ, coi chính sách như viên đạn bạc giải quyết 100% vấn đề."
      },
      {
        percentage: 75,
        levelTitle: "High Likelihood (Xác Suất Cao Có Căn Cứ)",
        sentence: "Universal Basic Income is highly likely to alleviate severe poverty and substantially diminish economic disparities.",
        epistemicTone: "Tự tin nhưng đã chuyển từ 'eliminate' sang 'alleviate' và dùng 'highly likely'.",
        cambridgeEvaluation: "Band 7.5 TR: Lập luận hợp lý, đã có sự cân nhắc phạm vi tác động."
      },
      {
        percentage: 50,
        levelTitle: "Calibrated Hypothesis (Giả Thuyết Học Thuật Chuẩn C1/C2)",
        sentence: "Universal Basic Income arguably presents a viable mechanism to mitigate extreme poverty, potentially narrowing socioeconomic inequalities.",
        epistemicTone: "Khách quan, sử dụng trạng từ nhận thức 'arguably' và 'potentially narrowing'.",
        cambridgeEvaluation: "Band 8.0 - 8.5 TR: Độ chín chắn học thuật cao, nhìn nhận chính sách dưới dạng giải pháp khả dĩ."
      },
      {
        percentage: 25,
        levelTitle: "Cautious Epistemic Skepticism (Thận Trọng Tối Đa)",
        sentence: "While UBI may ostensibly alleviate baseline destitution, its efficacy remains subject to the caveat that inflationary pressures do not erode net purchasing power.",
        epistemicTone: "Rào đón toàn diện với mệnh đề giới hạn biên (Boundary limiting clause).",
        cambridgeEvaluation: "Band 8.5+ TR/LR: Hoàn hảo! Vừa thừa nhận tiềm năng vừa lường trước rủi ro kinh tế học vĩ mô."
      }
    ]
  },
  {
    id: "hedge_02_videogames_aggression",
    topic: "Media Psychology & Adolescent Behavior",
    dogmaticSentence: "Playing violent video games always makes all teenagers extremely aggressive in real life.",
    critique: "Khái quát hóa quá mức với 'always' và 'all teenagers', biến mối tương quan (correlation) thành quan hệ nhân quả tuyệt đối (causation).",
    dogmaticTriggers: ["always makes", "all teenagers"],
    suggestedHedgingPills: ["tends to correlate with", "certain adolescent cohorts", "empirical studies suggest"],
    calibrations: [
      {
        percentage: 100,
        levelTitle: "Dogmatic Overstatement",
        sentence: "Playing violent video games always makes all teenagers extremely aggressive in real life.",
        epistemicTone: "Khẳng định võ đoán, sai lệch dữ liệu tâm lý học.",
        cambridgeEvaluation: "Band 5.5 - 6.0: Lập luận cảm tính, thiếu cơ sở khoa học."
      },
      {
        percentage: 75,
        levelTitle: "High Likelihood",
        sentence: "Exposure to violent interactive media frequently correlates with heightened aggressive tendencies among adolescent players.",
        epistemicTone: "Thay 'always makes' bằng 'frequently correlates with'.",
        cambridgeEvaluation: "Band 7.5: Sử dụng thuật ngữ tương quan chuẩn xác."
      },
      {
        percentage: 50,
        levelTitle: "Calibrated Hypothesis",
        sentence: "The available psychological evidence suggests that immersive violent gaming may moderately amplify hostile attribution bias in certain predisposed youths.",
        epistemicTone: "Rào đón 'may moderately amplify' và 'predisposed youths'.",
        cambridgeEvaluation: "Band 8.5: Tinh tế, phân hóa đối tượng có yếu tố nguy cơ thay vì gán cho toàn bộ thanh thiếu niên."
      },
      {
        percentage: 25,
        levelTitle: "Cautious Epistemic Skepticism",
        sentence: "Although violent gameplay could ostensibly heighten transient behavioral arousal, empirical research scarcely establishes a direct causal link to real-world violent delinquency.",
        epistemicTone: "Phân biệt rõ ràng giữa 'hưng phấn tâm lý tạm thời' và 'hành vi phạm pháp thực tế'.",
        cambridgeEvaluation: "Band 8.5+: Tư duy phản biện khoa học tâm lý đỉnh cao."
      }
    ]
  },
  {
    id: "hedge_03_ai_surveillance",
    topic: "Workplace Privacy & Productivity",
    dogmaticSentence: "Surveillance software is obviously the only way for companies to stop workers from being lazy.",
    critique: "Dùng từ áp đặt 'obviously' và 'the only way' cùng từ ngữ văn nói mang tính phán xét 'being lazy'.",
    dogmaticTriggers: ["obviously", "the only way", "being lazy"],
    suggestedHedgingPills: ["ostensibly optimizes", "marginal productivity monitoring", "one potential administrative instrument among several alternatives"],
    calibrations: [
      {
        percentage: 100,
        levelTitle: "Dogmatic Overstatement",
        sentence: "Surveillance software is obviously the only way for companies to stop workers from being lazy.",
        epistemicTone: "Văn nói sáo rỗng, áp đặt.",
        cambridgeEvaluation: "Band 5.5: Ngữ điệu thiếu khách quan."
      },
      {
        percentage: 75,
        levelTitle: "High Likelihood",
        sentence: "Algorithmic monitoring tools are widely regarded as an effective method to curtail workplace time theft and optimize labor output.",
        epistemicTone: "Nâng cấp từ vựng sang 'time theft' và 'optimize labor output'.",
        cambridgeEvaluation: "Band 7.5: Trang trọng và học thuật."
      },
      {
        percentage: 50,
        levelTitle: "Calibrated Hypothesis",
        sentence: "Algorithmic oversight arguably serves as an effective deterrent against productivity losses, though its net utility depends heavily on employee trust.",
        epistemicTone: "Thêm yếu tố điều kiện 'depends heavily on employee trust'.",
        cambridgeEvaluation: "Band 8.0+: Đa chiều, tính đến yếu tố tâm lý lao động."
      },
      {
        percentage: 25,
        levelTitle: "Cautious Epistemic Skepticism",
        sentence: "While continuous digital tracking may ostensibly yield marginal efficiency dividends, empirical studies indicate that such measures could conceivably erode intrinsic worker motivation.",
        epistemicTone: "Chỉ ra mâu thuẫn giữa hiệu quả ngắn hạn và động lực nội tại dài hạn.",
        cambridgeEvaluation: "Band 8.5+: Lập luận sắc bén, rào đón hoàn hảo."
      }
    ]
  }
];
