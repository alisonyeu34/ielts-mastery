export type SpeakerStance =
  | "proposal"
  | "hesitation"
  | "disagreement"
  | "concession"
  | "final_agreement"
  | "supervisor_advice";

export interface S3Speaker {
  id: string; // "liam" | "olivia" | "prof_davies"
  name: string;
  roleVi: string;
  roleEn: string;
  colorHex: string;
  avatarBg: string;
  textColor: string;
  borderActive: string;
}

export interface DialogueTurn {
  turnId: number;
  speakerId: string;
  startTime: number;
  endTime: number;
  text: string;
  stance: SpeakerStance;
  stanceLabelVi: string;
  trapForQuestionId?: number;
  isConsensusClimax?: boolean;
  highlightCue?: {
    phrase: string;
    type: "reversal_cue" | "false_agreement" | "agreed_resolution";
    explanationVi: string;
  };
}

export interface S3MultipleChoiceQuestion {
  id: number; // 21, 22, 23, 24, 25
  type: "multiple_choice";
  prompt: string;
  options: Array<{
    letter: string; // 'A' | 'B' | 'C'
    text: string;
    isCorrect: boolean;
    trapSpeaker?: string;
    trapReasonVi?: string;
  }>;
  correctOption: string;
  consensusFlow: {
    rejectedProposal: {
      speaker: string;
      idea: string;
    };
    counterReason: {
      speaker: string;
      critique: string;
    };
    ultimateDecision: {
      summary: string;
      reversalQuote: string;
    };
  };
  audioTimestampSeconds: number;
  explanationVi: string;
}

export interface S3MatchingQuestion {
  id: number; // 26, 27, 28, 29, 30
  type: "matching_classification";
  taskTitle: string;
  correctOption: "A" | "B" | "C"; // A: Liam only, B: Olivia only, C: Both Liam & Olivia
  audioTimestampSeconds: number;
  debateSummaryVi: string;
  keyQuote: string;
}

export interface SubtleDisagreementItem {
  id: string;
  phrase: string;
  meaningVi: string;
  dangerPatternVi: string;
  exampleContext: string;
}

export interface Section3ConsensusExerciseData {
  id: string;
  title: string;
  sectionNumber: 3;
  topicTitle: string;
  contextVi: string;
  totalAudioDurationSeconds: number;
  speakers: S3Speaker[];
  dialogueTurns: DialogueTurn[];
  mcQuestions: S3MultipleChoiceQuestion[];
  matchingQuestions: S3MatchingQuestion[];
  subtleDisagreementDrill: SubtleDisagreementItem[];
}

export const MOCK_SECTION3_SPEAKERS: S3Speaker[] = [
  {
    id: "liam",
    name: "Liam",
    roleVi: "Sinh Viên Sinh Học (Thực tập sinh)",
    roleEn: "Undergraduate Student",
    colorHex: "#3b82f6",
    avatarBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    textColor: "text-blue-600 dark:text-blue-400",
    borderActive: "border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/30",
  },
  {
    id: "olivia",
    name: "Olivia",
    roleVi: "Sinh Viên Sinh Học (Trưởng nhóm dự án)",
    roleEn: "Project Team Lead",
    colorHex: "#a855f7",
    avatarBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    textColor: "text-purple-600 dark:text-purple-400",
    borderActive: "border-purple-500 bg-purple-500/5 ring-2 ring-purple-500/30",
  },
  {
    id: "prof_davies",
    name: "Prof. Davies",
    roleVi: "Giáo Sư Hướng Dẫn Hải Dương Học",
    roleEn: "Academic Research Supervisor",
    colorHex: "#f59e0b",
    avatarBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    textColor: "text-amber-600 dark:text-amber-400",
    borderActive: "border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/30",
  },
];

export const MOCK_SECTION3_CONSENSUS_DATA: Section3ConsensusExerciseData = {
  id: "sec3_marine_microplastics",
  title: "Section 3: Marine Microplastics Field Study Consultation",
  sectionNumber: 3,
  topicTitle: "Investigation into Coastal Microplastic Contamination & Biota Ingestion",
  contextVi:
    "Bạn sẽ nghe hai sinh viên ngành sinh học biển là Liam và Olivia thảo luận với Giáo sư hướng dẫn Davies về kế hoạch thu thập mẫu hạt vi nhựa và phân công nhiệm vụ viết báo cáo nghiên cứu.",
  totalAudioDurationSeconds: 195,
  speakers: MOCK_SECTION3_SPEAKERS,
  dialogueTurns: [
    {
      turnId: 1,
      speakerId: "prof_davies",
      startTime: 0,
      endTime: 12,
      text: "Come on in, Liam, Olivia. I have looked over your initial research proposal on marine microplastics along the southern coastline. Overall, it's very promising, but we need to refine your methodology before fieldwork begins.",
      stance: "supervisor_advice",
      stanceLabelVi: "Lời mở đầu của Giáo sư hướng dẫn",
    },
    {
      turnId: 2,
      speakerId: "liam",
      startTime: 13,
      endTime: 27,
      text: "Thanks Professor Davies. Regarding our primary sampling site, I strongly feel we should collect sediment from the commercial harbor area because the shipping traffic guarantees high plastic concentration.",
      stance: "proposal",
      stanceLabelVi: "Liam đề xuất lấy mẫu ở Cảng thương mại",
      trapForQuestionId: 21,
    },
    {
      turnId: 3,
      speakerId: "olivia",
      startTime: 28,
      endTime: 45,
      text: "I see what you mean, Liam, but wouldn't commercial fuel runoff severely contaminate our chemical spectroscopy? I'd argue that sampling the public rocky shoreline will provide a much cleaner baseline of domestic polymer pollution.",
      stance: "disagreement",
      stanceLabelVi: "Olivia phản bác & đề xuất bờ biển đá công cộng",
      trapForQuestionId: 21,
      highlightCue: {
        phrase: "I see what you mean, but wouldn't...",
        type: "reversal_cue",
        explanationVi: "Olivia dùng cấu trúc phản biện lịch sự để bác bỏ ý tưởng của Liam vì dầu tàu biển gây nhiễu phổ quang.",
      },
    },
    {
      turnId: 4,
      speakerId: "prof_davies",
      startTime: 46,
      endTime: 56,
      text: "Olivia makes an important point. Industrial solvents in harbors distort infrared spectra. You'll obtain much more reliable academic data from the public coastal stretch.",
      stance: "supervisor_advice",
      stanceLabelVi: "Giáo sư nghiêng về quan điểm của Olivia",
    },
    {
      turnId: 5,
      speakerId: "liam",
      startTime: 57,
      endTime: 65,
      text: "Fair enough, that makes complete sense. Let's lock in the public rocky shoreline as our primary site then.",
      stance: "final_agreement",
      stanceLabelVi: "Liam đồng thuận chốt bờ biển đá công cộng",
      isConsensusClimax: true,
      highlightCue: {
        phrase: "Fair enough, that makes complete sense. Let's lock in...",
        type: "agreed_resolution",
        explanationVi: "Cả nhóm chính thức chốt phương án B (Public rocky shoreline).",
      },
    },
    {
      turnId: 6,
      speakerId: "olivia",
      startTime: 66,
      endTime: 80,
      text: "Now, about the specimen organisms for ingestion analysis. I was initially convinced we should dissect wild seabird carcasses found on beaches, since their digestive tracts accumulate massive plastic fragments.",
      stance: "proposal",
      stanceLabelVi: "Olivia đề xuất mổ xác chim biển",
      trapForQuestionId: 22,
    },
    {
      turnId: 7,
      speakerId: "liam",
      startTime: 81,
      endTime: 95,
      text: "Yes, up to a point, Olivia, but wild birds migrate across thousands of miles, so we couldn't prove the plastics originated locally. Wouldn't blue mussels be far better bio-indicators since they are stationary filter feeders?",
      stance: "disagreement",
      stanceLabelVi: "Liam phản biện & đề xuất vẹm xanh (Blue mussels)",
      trapForQuestionId: 22,
      highlightCue: {
        phrase: "Yes, up to a point, but...",
        type: "false_agreement",
        explanationVi: "Bẫy đồng thuận giả: Liam đồng ý một phần rồi lật ngược vấn đề vì chim biển di cư làm loãng nguồn gốc ô nhiễm.",
      },
    },
    {
      turnId: 8,
      speakerId: "olivia",
      startTime: 96,
      endTime: 106,
      text: "You are totally right, Liam. Mussels filter liters of local seawater daily. Testing sedentary shellfish will give us localized data.",
      stance: "final_agreement",
      stanceLabelVi: "Olivia hoàn toàn đồng ý chọn Vẹm xanh",
      isConsensusClimax: true,
    },
    {
      turnId: 9,
      speakerId: "prof_davies",
      startTime: 107,
      endTime: 120,
      text: "Excellent scientific reasoning from both of you. Now, what about your data presentation strategy for the faculty symposium next month?",
      stance: "supervisor_advice",
      stanceLabelVi: "Giáo sư hỏi về hình thức trình bày báo cáo",
    },
    {
      turnId: 10,
      speakerId: "liam",
      startTime: 121,
      endTime: 135,
      text: "We were thinking of showing a 15-minute documentary video of our field collection process.",
      stance: "proposal",
      stanceLabelVi: "Liam đề xuất làm video tài liệu 15 phút",
      trapForQuestionId: 23,
    },
    {
      turnId: 11,
      speakerId: "prof_davies",
      startTime: 136,
      endTime: 152,
      text: "I must caution you against that. The symposium jury values statistical rigor. An interactive digital dashboard showing spatial density heatmaps will score substantially higher with peer reviewers.",
      stance: "supervisor_advice",
      stanceLabelVi: "Giáo sư khuyến nghị làm Dashboard bản đồ nhiệt",
    },
    {
      turnId: 12,
      speakerId: "olivia",
      startTime: 153,
      endTime: 164,
      text: "That sounds much more rigorous. We'll scrap the video and build the interactive heatmap dashboard instead.",
      stance: "final_agreement",
      stanceLabelVi: "Hai sinh viên thống nhất làm Heatmap Dashboard",
      isConsensusClimax: true,
    },
    {
      turnId: 13,
      speakerId: "prof_davies",
      startTime: 165,
      endTime: 195,
      text: "Good. Now let's finalize division of labor. Who is doing the spectrometer calibration, ethical clearance documentation, and statistical regression modeling?",
      stance: "supervisor_advice",
      stanceLabelVi: "Phân công nhiệm vụ thực hiện dự án",
    },
  ],
  mcQuestions: [
    {
      id: 21,
      type: "multiple_choice",
      prompt: "What sampling site do Liam and Olivia ultimately agree to use for their study?",
      options: [
        {
          letter: "A",
          text: "The industrial commercial shipping harbor",
          isCorrect: false,
          trapSpeaker: "Liam",
          trapReasonVi: "Ý tưởng ban đầu của Liam, bị loại vì dầu tàu biển gây nhiễu quang phổ.",
        },
        {
          letter: "B",
          text: "The public rocky coastal shoreline",
          isCorrect: true,
        },
        {
          letter: "C",
          text: "An offshore deep-sea research station",
          isCorrect: false,
          trapReasonVi: "Phương án gây nhiễu không được đề cập trong cuộc thảo luận.",
        },
      ],
      correctOption: "B",
      consensusFlow: {
        rejectedProposal: {
          speaker: "Liam",
          idea: "Lấy mẫu tại Cảng tàu thương mại (Commercial harbor) vì nhiều rác thải.",
        },
        counterReason: {
          speaker: "Olivia",
          critique: "Dầu nhiên liệu tàu biển sẽ làm hỏng kết quả phân tích quang phổ hóa học.",
        },
        ultimateDecision: {
          summary: "Chốt bờ biển đá công cộng (Public rocky shoreline) để có mẫu sạch.",
          reversalQuote: "Fair enough, that makes complete sense. Let's lock in the public rocky shoreline then.",
        },
      },
      audioTimestampSeconds: 28,
      explanationVi:
        "Liam đề xuất Cảng thương mại (A), nhưng Olivia phản bác vì dầu máy tàu biển gây nhiễu quang phổ. Cả hai cùng Giáo sư thống nhất chọn bờ biển đá công cộng (B).",
    },
    {
      id: 22,
      type: "multiple_choice",
      prompt: "Why do the students decide to examine blue mussels instead of seabirds?",
      options: [
        {
          letter: "A",
          text: "Because seabirds are legally protected from dissection",
          isCorrect: false,
          trapReasonVi: "Không nhắc đến quy định pháp lý cấm giải phẫu chim.",
        },
        {
          letter: "B",
          text: "Because mussels provide accurate local contamination data",
          isCorrect: true,
        },
        {
          letter: "C",
          text: "Because mussels ingest significantly larger plastic pieces",
          isCorrect: false,
          trapSpeaker: "Olivia",
          trapReasonVi: "Olivia từng nói chim biển tích tụ mảnh nhựa lớn hơn, nhưng bị Liam lật ngược.",
        },
      ],
      correctOption: "B",
      consensusFlow: {
        rejectedProposal: {
          speaker: "Olivia",
          idea: "Mổ xác chim biển (Seabird carcasses) vì dạ dày chứa nhiều mảnh nhựa lớn.",
        },
        counterReason: {
          speaker: "Liam",
          critique: "Chim biển di cư bay hàng ngàn dặm nên không thể chứng minh rác nhựa ở vùng biển địa phương.",
        },
        ultimateDecision: {
          summary: "Vẹm xanh sống cố định lọc nước liên tục, phản ánh chuẩn xác mức độ ô nhiễm tại chỗ.",
          reversalQuote: "Wouldn't blue mussels be far better bio-indicators since they are stationary filter feeders?",
        },
      },
      audioTimestampSeconds: 81,
      explanationVi:
        "Olivia ban đầu muốn mổ chim biển, nhưng Liam chỉ ra chim biển di cư xa không phản ánh ô nhiễm tại chỗ; Vẹm xanh sống cố định (stationary) nên cho số liệu chuẩn xác tại địa phương (B).",
    },
    {
      id: 23,
      type: "multiple_choice",
      prompt: "How will the students present their findings at the faculty symposium?",
      options: [
        {
          letter: "A",
          text: "A 15-minute documentary video of their field trip",
          isCorrect: false,
          trapSpeaker: "Liam",
          trapReasonVi: "Liam đề xuất video tài liệu, nhưng Giáo sư Davies cảnh báo hội đồng không chuộng.",
        },
        {
          letter: "B",
          text: "A printed academic poster containing text summaries",
          isCorrect: false,
          trapReasonVi: "Phương án poster giấy truyền thống không được lựa chọn.",
        },
        {
          letter: "C",
          text: "An interactive digital dashboard featuring spatial heatmaps",
          isCorrect: true,
        },
      ],
      correctOption: "C",
      consensusFlow: {
        rejectedProposal: {
          speaker: "Liam",
          idea: "Chiếu video tài liệu 15 phút (Documentary video).",
        },
        counterReason: {
          speaker: "Prof. Davies",
          critique: "Hội đồng giám khảo cần số liệu thống kê khoa học khắt khe chứ không phải phóng sự.",
        },
        ultimateDecision: {
          summary: "Xây dựng bảng điều khiển bản đồ nhiệt kỹ thuật số (Interactive heatmap dashboard).",
          reversalQuote: "We'll scrap the video and build the interactive heatmap dashboard instead.",
        },
      },
      audioTimestampSeconds: 136,
      explanationVi:
        "Giáo sư Davies bác bỏ ý tưởng chiếu video của Liam và khuyên nhóm làm Bảng điều khiển bản đồ nhiệt tương tác (C) để đạt điểm cao từ ban giám khảo.",
    },
    {
      id: 24,
      type: "multiple_choice",
      prompt: "What major challenge do Liam and Olivia anticipate during laboratory microplastic extraction?",
      options: [
        {
          letter: "A",
          text: "Airborne airborne synthetic fiber contamination inside the lab",
          isCorrect: true,
        },
        {
          letter: "B",
          text: "Inadequate chemical solvents to dissolve organic tissue",
          isCorrect: false,
          trapReasonVi: "Dung môi hóa chất đã được phòng thí nghiệm cung cấp đủ.",
        },
        {
          letter: "C",
          text: "High cost of renting infrared spectroscopy equipment",
          isCorrect: false,
          trapReasonVi: "Thiết bị quang phổ do khoa tài trợ miễn phí.",
        },
      ],
      correctOption: "A",
      consensusFlow: {
        rejectedProposal: {
          speaker: "Olivia",
          idea: "Lo ngại dung môi không hòa tan hết mẫu sinh học.",
        },
        counterReason: {
          speaker: "Liam",
          critique: "Dung môi KOH 10% tiêu chuẩn đã xử lý triệt để mô hữu cơ.",
        },
        ultimateDecision: {
          summary: "Bụi sợi tổng hợp từ quần áo trong không khí phòng lab mới là nguy cơ gây sai lệch mẫu lớn nhất.",
          reversalQuote: "Airborne microfibers from cotton-polyester clothing are our biggest threat of false positives.",
        },
      },
      audioTimestampSeconds: 155,
      explanationVi:
        "Cả hai nhận định thách thức lớn nhất là nguy cơ sợi tổng hợp trong không khí phòng lab rơi vào mẫu gây dương tính giả (A).",
    },
    {
      id: 25,
      type: "multiple_choice",
      prompt: "What is Professor Davies' final advice regarding the research project timeline?",
      options: [
        {
          letter: "A",
          text: "Postpone the beach sediment collection until summer",
          isCorrect: false,
          trapReasonVi: "Không hoãn lấy mẫu sang mùa hè.",
        },
        {
          letter: "B",
          text: "Conduct a trial pilot run before launching full sampling",
          isCorrect: true,
        },
        {
          letter: "C",
          text: "Reduce the number of sampling transects from ten to five",
          isCorrect: false,
          trapReasonVi: "Không cắt giảm số lượng trắc tuyến lấy mẫu.",
        },
      ],
      correctOption: "B",
      consensusFlow: {
        rejectedProposal: {
          speaker: "Liam",
          idea: "Tiến hành thu thập toàn bộ 100 mẫu ngay trong tuần đầu tiên.",
        },
        counterReason: {
          speaker: "Prof. Davies",
          critique: "Nếu phương pháp lọc gặp lỗi sẽ lãng phí toàn bộ công sức thu thập mẫu lớn.",
        },
        ultimateDecision: {
          summary: "Tiến hành một đợt thử nghiệm quy mô nhỏ (Pilot trial run) trước để chuẩn hóa quy trình.",
          reversalQuote: "Run a small pilot test with five samples first to calibrate your filters.",
        },
      },
      audioTimestampSeconds: 180,
      explanationVi:
        "Giáo sư hướng dẫn khuyên hai bạn làm một đợt chạy thử quy mô nhỏ (pilot run) để hiệu chuẩn màng lọc trước khi triển khai toàn diện (B).",
    },
  ],
  matchingQuestions: [
    {
      id: 26,
      type: "matching_classification",
      taskTitle: "Calibrating the Fourier-transform infrared spectrometer (FTIR)",
      correctOption: "A", // Liam only
      audioTimestampSeconds: 168,
      debateSummaryVi:
        "Olivia nói cô chưa từng vận hành máy FTIR; Liam xung phong nhận vì anh đã hoàn thành khóa đào tạo chứng chỉ phòng lab tháng trước.",
      keyQuote: "I hold the certified operator badge for the FTIR machine, so I'll handle all the spectroscopy calibration.",
    },
    {
      id: 27,
      type: "matching_classification",
      taskTitle: "Drafting the university ethics committee clearance form",
      correctOption: "B", // Olivia only
      audioTimestampSeconds: 174,
      debateSummaryVi:
        "Liam thừa nhận văn phong hành chính của mình không tốt; Olivia đồng ý tự mình soạn thảo hồ sơ đạo đức nghiên cứu.",
      keyQuote: "Leave the ethics application to me. I've drafted several compliance forms for marine wildlife before.",
    },
    {
      id: 28,
      type: "matching_classification",
      taskTitle: "Collecting coastal sediment core samples during low tide",
      correctOption: "C", // Both Liam & Olivia
      audioTimestampSeconds: 182,
      debateSummaryVi:
        "Giáo sư Davies yêu cầu quy tắc an toàn luôn phải có 2 người cùng đi trên bãi triều; cả Liam và Olivia cùng thực hiện.",
      keyQuote: "Field safety regulations mandate buddy pairs on mudflats, so both of us must go out for sediment coring.",
    },
    {
      id: 29,
      type: "matching_classification",
      taskTitle: "Running statistical multivariate regression analysis in R",
      correctOption: "B", // Olivia only
      audioTimestampSeconds: 188,
      debateSummaryVi:
        "Liam gặp khó khăn với code R; Olivia đảm nhiệm toàn bộ phần thống kê hồi quy đa biến.",
      keyQuote: "I've already scripted the R package for spatial regression, so I'll run the statistical models.",
    },
    {
      id: 30,
      type: "matching_classification",
      taskTitle: "Designing the interactive web dashboard for the symposium",
      correctOption: "C", // Both Liam & Olivia
      audioTimestampSeconds: 192,
      debateSummaryVi:
        "Liam xây dựng cấu trúc dữ liệu bản đồ nhiệt còn Olivia phụ trách thiết kế giao diện UI và biểu đồ trực quan.",
      keyQuote: "Let's collaborate on the dashboard—Liam can write the mapping engine and I'll polish the UI graphics.",
    },
  ],
  subtleDisagreementDrill: [
    {
      id: "drill_1",
      phrase: "Yes, up to a point, but...",
      meaningVi: "Đúng là như vậy ở một chừng mực nào đó, tuy nhiên...",
      dangerPatternVi: "Bẫy đồng thuận giả vờ (False Agreement). Người nói tỏ ra đồng ý ở vế đầu nhưng ngay sau 'but' sẽ lật ngược lại hoàn toàn.",
      exampleContext: "Yes, up to a point, but wild birds migrate across thousands of miles, so we couldn't prove localized pollution.",
    },
    {
      id: "drill_2",
      phrase: "I see what you mean, but wouldn't...?",
      meaningVi: "Tôi hiểu ý bạn, nhưng liệu điều đó có...?",
      dangerPatternVi: "Cấu trúc phản biện khéo léo dưới dạng câu hỏi tu từ, chỉ ra lỗi sai hoặc rủi ro trong đề xuất của đối phương.",
      exampleContext: "I see what you mean, but wouldn't commercial fuel runoff severely contaminate our chemical spectroscopy?",
    },
    {
      id: "drill_3",
      phrase: "That was my initial thought as well, until...",
      meaningVi: "Ban đầu tôi cũng nghĩ như vậy, cho đến khi...",
      dangerPatternVi: "Bẫy thay đổi quan điểm theo thời gian. Ý tưởng đầu tiên luôn là đáp án nhiễu bị loại bỏ.",
      exampleContext: "That was my initial thought as well, until I realized the laboratory lacks certified organic digestion ovens.",
    },
    {
      id: "drill_4",
      phrase: "I'd go along with that if we had more time, however...",
      meaningVi: "Tôi sẽ ủng hộ phương án đó nếu có nhiều thời gian hơn, tuy nhiên...",
      dangerPatternVi: "Bẫy điều kiện bất khả thi. Nhận diện việc thiếu thời gian / ngân sách dẫn đến việc phải chọn giải pháp thỏa hiệp.",
      exampleContext: "I'd go along with documentary filming if we had more time, however the symposium jury values statistical rigor.",
    },
  ],
};
