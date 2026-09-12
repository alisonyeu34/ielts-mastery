/**
 * Mock Socratic Debate Dataset: Controversial Cambridge-Style Resolutions
 * Provides 3-round dialectical counter-strikes, dilemmas, and Band 8.5 model syntheses.
 */

export interface SocraticDebateTopic {
  id: string;
  title: string;
  academicDomain: string;
  resolution: string;
  contextBackground: string;
  stancePro: string;
  stanceCon: string;
  round1Prompt: string;
  round2CounterStrike: {
    scholarArgument: string;
    dilemmaPosed: string;
    exposedFallacy: string;
  };
  round3GuidingTips: string[];
  modelSynthesizedPosition: string;
  c1UsefulCollocations: Array<{ phrase: string; meaning: string; pos: string }>;
}

export const MOCK_SOCRATIC_TOPICS: SocraticDebateTopic[] = [
  {
    id: "socratic_01",
    title: "Universal Carbon Taxation on Livestock Agriculture",
    academicDomain: "Environmental Economics & Public Policy",
    resolution: "Governments should levy a direct carbon tax on red meat consumption to combat anthropogenic climate change.",
    contextBackground:
      "Ruminant livestock generation accounts for approximately 14.5% of global greenhouse emissions. However, taxing animal protein disproportionately inflates nutritional costs for socioeconomically vulnerable households.",
    stancePro: "Ủng hộ đánh thuế: Đòn bẩy tài khóa bắt buộc để chuyển đổi hành vi tiêu dùng và giảm tải khí thải metan.",
    stanceCon: "Phản đối đánh thuế: Gây bất công xã hội, đẩy người thu nhập thấp vào tình trạng thiếu hụt dinh dưỡng vi lượng.",
    round1Prompt:
      "Please state your initial thesis: Should municipal or federal governments introduce a carbon levy on meat producers and consumers?",
    round2CounterStrike: {
      scholarArgument:
        "Your proposition presumes that consumer demand for dietary protein is highly price-elastic. However, empirical studies in developmental economics demonstrate that regressive food taxes merely force lower-income families to substitute meat with ultra-processed carbohydrates, inadvertently exacerbating public healthcare expenditures on diabetes and obesity. Furthermore, why should developing agrarian nations be penalized when historical emissions originated overwhelmingly from industrial fossil fuels?",
      dilemmaPosed:
        "Tình thế tiến thoái lưỡng nan: Nếu đánh thuế cao để bảo vệ môi trường, bạn đang gián tiếp làm tổn hại sức khỏe và chi tiêu của tầng lớp lao động nghèo. Nếu miễn thuế, mục tiêu phát thải ròng bằng 0 (Net-Zero) sẽ sụp đổ.",
      exposedFallacy:
        "Ngụy biện Đơn nguyên Nhân quả (Single-Causal Fallacy) & Bỏ qua Hệ quả Kinh tế Xã hội Phân tầng.",
    },
    round3GuidingTips: [
      "Sử dụng cấu trúc nhượng bộ: 'Admittedly, direct taxation poses immediate nutritional risks to low-income demographics...'",
      "Kích hoạt lăng kính Chính phủ & Doanh nghiệp: Gắn kèm cơ chế bù trừ doanh thu thuế (Revenue-neutral recycling) trợ cấp nông nghiệp sinh thái.",
      "Vận dụng từ rào đón C1: 'arguably', 'to a certain extent', 'under the prerequisite that'.",
    ],
    modelSynthesizedPosition:
      "While a flat carbon levy on livestock indisputably threatens to exacerbate food insecurity among vulnerable populations, this fiscal policy remains arguably essential if paired with targeted revenue recycling. Specifically, tax revenues generated from industrial meat conglomerates should be ring-fenced to subsidize plant-based agricultural innovations and localized nutritional vouchers. Consequently, governments can achieve ecological decarbonization without compromising socioeconomic equity.",
    c1UsefulCollocations: [
      { phrase: "revenue-neutral recycling", meaning: "Tái phân bổ nguồn thu thuế một cách trung hòa ngân sách", pos: "Noun Phrase" },
      { phrase: "regressive taxation", meaning: "Thuế lũy thoái (gây gánh nặng lớn hơn cho người nghèo)", pos: "Noun Phrase" },
      { phrase: "ring-fence expenditures", meaning: "Dành riêng ngân sách cho một mục đích cố định", pos: "Verb Phrase" },
    ],
  },
  {
    id: "socratic_02",
    title: "Algorithmic Facial Recognition & Public Surveillance",
    academicDomain: "Jurisprudence, Ethics & AI Governance",
    resolution: "Biometric facial recognition in public spaces should be universally banned to safeguard individual civil liberties.",
    contextBackground:
      "Mass surveillance technology vastly enhances counter-terrorism and policing efficiency, yet poses existential threats to freedom of assembly, algorithmic bias against minorities, and state overreach.",
    stancePro: "Ủng hộ cấm triệt để: Ngăn chặn nguy cơ nhà nước độc tài giám sát và sự xâm phạm quyền riêng tư cơ bản.",
    stanceCon: "Phản đối lệnh cấm hoàn toàn: Tước bỏ công cụ thiết yếu để ngăn chặn tội phạm bạo lực và bảo vệ trật tự công cộng.",
    round1Prompt:
      "Do you believe that biometric surveillance technology in metropolitan centers constitutes an unacceptable infringement on civil liberties?",
    round2CounterStrike: {
      scholarArgument:
        "Advocating for an outright ban appears ostensibly principled, yet it entirely disregards the fundamental governmental mandate to protect citizens from imminent violent crime and human trafficking. If municipal police departments are prohibited from leveraging automated facial matching during high-stakes hostage or terror crises, are you prepared to accept the resultant loss of innocent lives in the name of abstract privacy ideals?",
      dilemmaPosed:
        "Tình thế tiến thoái lưỡng nan: Ưu tiên quyền riêng tư tuyệt đối đồng nghĩa với việc chấp nhận rủi ro an ninh tính mạng gia tăng trong không gian công cộng.",
      exposedFallacy: "Ngụy biện Lựa chọn Nhị phân Sai lầm (False Dilemma) giữa An ninh Tuyệt đối vs Quyền Riêng tư Hoàn hảo.",
    },
    round3GuidingTips: [
      "Nhượng bộ có điều kiện: 'Granted that rapid suspect apprehension is paramount during acute national security threats...'",
      "Kích hoạt lăng kính Pháp lý & Khoa học: Đề xuất khuôn khổ tư pháp giám sát chặt chẽ (Judicial warrants & independent audits).",
      "Sử dụng ngôn ngữ rào đón: 'ostensibly', 'plausibly', 'subject to strict statutory oversight'.",
    ],
    modelSynthesizedPosition:
      "Granted that real-time biometric scanning presents grave risks of Orwellian state overreach and racial misidentification, an outright ban arguably deprives law enforcement of a vital investigative asset. A more defensible middle ground involves enacting stringent statutory frameworks that restrict biometric deployment solely to acute judicial warrants for violent felonies, accompanied by mandatory open-source algorithmic audits.",
    c1UsefulCollocations: [
      { phrase: "statutory oversight", meaning: "Sự giám sát theo luật định nghiêm ngặt", pos: "Noun Phrase" },
      { phrase: "Orwellian overreach", meaning: "Sự lạm quyền kiểm soát độc tài kiểu Orwell", pos: "Noun Phrase" },
      { phrase: "judicial warrant", meaning: "Trát phê chuẩn của tòa án", pos: "Noun Phrase" },
    ],
  },
  {
    id: "socratic_03",
    title: "Tertiary Academic Degrees vs Practical Vocational Apprenticeships",
    academicDomain: "Sociology of Education & Labor Economics",
    resolution: "Governments should divert public funding away from university humanities degrees toward technical apprenticeships.",
    contextBackground:
      "Higher education expansion has produced rampant degree inflation and graduate underemployment, while skilled trades face severe chronic labor shortages.",
    stancePro: "Ủng hộ chuyển dịch vốn: Đáp ứng nhu cầu thị trường lao động thực tế và giảm gánh nặng nợ sinh viên.",
    stanceCon: "Bảo vệ giáo dục đại cương: Khoa học nhân văn bồi dưỡng tư duy phản biện, nền tảng dân chủ và chiều sâu văn hóa.",
    round1Prompt:
      "Should taxpayer subsidies be redirected away from abstract academic degrees toward pragmatic trade apprenticeships?",
    round2CounterStrike: {
      scholarArgument:
        "Reducing tertiary education to mere vocational utility completely degrades the intrinsic civilizing purpose of academia. If public policy purely optimizes for short-term labor market vacancies, who will cultivate ethical philosophers, historians, and literary scholars necessary to sustain democratic discourse and cultural memory? Furthermore, in an age where AI automates routine technical tasks, is not broad critical inquiry the most future-proof skill?",
      dilemmaPosed:
        "Tình thế tiến thoái lưỡng nan: Đào tạo kỹ năng thực dụng ngắn hạn giải quyết được việc làm trước mắt nhưng làm xói mòn năng lực tư duy trừu tượng dài hạn của xã hội.",
      exposedFallacy: "Ngụy biện Thực dụng Hẹp hòi (Reductionist Utilitarianism).",
    },
    round3GuidingTips: [
      "Kết hợp lăng kính Cá nhân & Kinh tế: 'While economic pragmatism dictates an expansion of vocational pipelines...'",
      "Đề xuất mô hình tích hợp: 'hybrid interdisciplinary curricula'.",
      "Dùng từ rào đón: 'tends to', 'conceivably', 'in large measure'.",
    ],
    modelSynthesizedPosition:
      "While economic pragmatism legitimately justifies bolstering vocational apprenticeship pipelines to address acute infrastructure deficits, starving humanities disciplines of public funding is arguably shortsighted. A sustainable educational paradigm must integrate foundational critical philosophy into technical curricula, thereby equipping future tradespeople with both specialized practical competence and broad ethical discernment.",
    c1UsefulCollocations: [
      { phrase: "degree inflation", meaning: "Hiện tượng lạm phát bằng cấp", pos: "Noun Phrase" },
      { phrase: "interdisciplinary curricula", meaning: "Chương trình giảng dạy liên ngành", pos: "Noun Phrase" },
      { phrase: "acute labor deficits", meaning: "Tình trạng thiếu hụt lao động trầm trọng", pos: "Noun Phrase" },
    ],
  },
];
