export interface TranscriptSentence {
  id: string;
  startTimeSec: number;
  endTimeSec: number;
  speaker: string;
  text: string;
  trapType?: "evidence" | "distractor" | "paraphrase";
  relatedQuestionId?: string;
  trapExplanation?: string;
}

export interface ListeningQuestion {
  id: string;
  number: number;
  type: "form_completion" | "multiple_choice";
  prompt: string;
  options?: { key: string; text: string }[];
  correctAnswer: string;
  trapType: "singular_plural" | "careless_reading" | "paraphrase_trap";
  evidenceStartTimeSec: number;
  evidenceEndTimeSec: number;
  distractorText?: string;
  redirectingMarker?: string; // e.g. "However", "In fact", "Originally planned"
  trapExplanation: string;
}

export interface ListeningSplitData {
  id: string;
  sectionNumber: number;
  title: string;
  subtitle: string;
  totalDurationSec: number;
  transcript: TranscriptSentence[];
  questions: ListeningQuestion[];
}

export const MOCK_LISTENING_SPLIT_SECTION3: ListeningSplitData = {
  id: "ls_section3_campus_energy",
  sectionNumber: 3,
  title: "Campus Renewable Energy Feasibility Project",
  subtitle: "University Tutorial Discussion between Dr. Stevens (Tutor) and Students (Liam & Maya)",
  totalDurationSec: 240, // 4 mins
  transcript: [
    {
      id: "t_01",
      startTimeSec: 0,
      endTimeSec: 6.5,
      speaker: "Dr. Stevens",
      text: "Good morning, Liam and Maya. Let's look over your preliminary proposal for the university renewable energy initiative.",
    },
    {
      id: "t_02",
      startTimeSec: 6.8,
      endTimeSec: 14.2,
      speaker: "Liam",
      text: "Thanks, Dr. Stevens. Initially, we considered investigating rooftop wind turbines, but the engineering department suggested that solar panels on the library roof would be far more feasible.",
      trapType: "distractor",
      relatedQuestionId: "q_01",
      trapExplanation: "Bẫy thay đổi ý định: Đề xuất ban đầu là 'wind turbines', nhưng quyết định cuối cùng là 'solar panels'.",
    },
    {
      id: "t_03",
      startTimeSec: 14.5,
      endTimeSec: 22.0,
      speaker: "Dr. Stevens",
      text: "That makes sense. Now, looking at your budget projections, what is the estimated initial capital expenditure required?",
    },
    {
      id: "t_04",
      startTimeSec: 22.3,
      endTimeSec: 32.5,
      speaker: "Maya",
      text: "Well, the supplier quoted fifty thousand pounds at first. However, after applying for the government environmental grant, our net installation cost drops to thirty-five thousand pounds.",
      trapType: "evidence",
      relatedQuestionId: "q_02",
      trapExplanation: "Bẫy số liệu: Con số ban đầu là 50,000 bảng, nhưng chi phí thực tế sau trợ cấp là 35,000 bảng.",
    },
    {
      id: "t_05",
      startTimeSec: 32.8,
      endTimeSec: 41.5,
      speaker: "Dr. Stevens",
      text: "Excellent saving. And what is the primary maintenance requirement during the winter months?",
    },
    {
      id: "t_06",
      startTimeSec: 41.8,
      endTimeSec: 51.0,
      speaker: "Liam",
      text: "We will need regular inspections of the electrical inverters, rather than surface washing, which is only needed in summer.",
      trapType: "evidence",
      relatedQuestionId: "q_03",
      trapExplanation: "Bẫy mùa vụ: 'surface washing' chỉ làm vào mùa hè, còn mùa đông cần kiểm tra 'inverters'.",
    },
    {
      id: "t_07",
      startTimeSec: 51.3,
      endTimeSec: 61.2,
      speaker: "Maya",
      text: "Also, we calculated that the system will offset carbon emissions by roughly eighty metric tons annually.",
      trapType: "evidence",
      relatedQuestionId: "q_04",
      trapExplanation: "Số liệu giảm phát thải hàng năm: 80 metric tons.",
    },
    {
      id: "t_08",
      startTimeSec: 61.5,
      endTimeSec: 72.0,
      speaker: "Liam",
      text: "And all the energy generation data will be monitored in real time via an online dashboard accessible to all students.",
      trapType: "evidence",
      relatedQuestionId: "q_05",
      trapExplanation: "Phương thức giám sát dữ liệu: online dashboard.",
    },
    {
      id: "t_09",
      startTimeSec: 72.5,
      endTimeSec: 84.0,
      speaker: "Dr. Stevens",
      text: "Now, let's discuss your survey on student attitudes. Maya, why did you decide to survey second-year students in particular?",
    },
    {
      id: "t_10",
      startTimeSec: 84.3,
      endTimeSec: 96.5,
      speaker: "Maya",
      text: "We thought first-years were still adjusting to campus life, and final-year students were overwhelmed with dissertations, so sophomores offered the most balanced perspective.",
      trapType: "evidence",
      relatedQuestionId: "q_06",
      trapExplanation: "Lý do chọn sinh viên năm 2: Sinh viên năm 1 đang bận làm quen, năm cuối bận luận văn, năm 2 cho góc nhìn cân bằng nhất.",
    },
    {
      id: "t_11",
      startTimeSec: 97.0,
      endTimeSec: 109.0,
      speaker: "Dr. Stevens",
      text: "What surprised you most about the survey results regarding campus recycling habits?",
    },
    {
      id: "t_12",
      startTimeSec: 109.3,
      endTimeSec: 122.5,
      speaker: "Liam",
      text: "Most respondents were not motivated by financial penalties. Instead, clear signage and convenient bin locations were the decisive factors.",
      trapType: "evidence",
      relatedQuestionId: "q_07",
      trapExplanation: "Yếu tố bất ngờ: Không phải hình phạt tiền, mà là biển chỉ dẫn rõ ràng (clear signage).",
    },
    {
      id: "t_13",
      startTimeSec: 123.0,
      endTimeSec: 136.0,
      speaker: "Dr. Stevens",
      text: "And what is the main hurdle in presenting this proposal to the university board of directors next month?",
    },
    {
      id: "t_14",
      startTimeSec: 136.3,
      endTimeSec: 150.0,
      speaker: "Maya",
      text: "The board is not worried about technical feasibility, but they are skeptical about the payback period, which takes around seven years to break even.",
      trapType: "evidence",
      relatedQuestionId: "q_08",
      trapExplanation: "Mối lo lớn nhất của hội đồng trường: thời gian hoàn vốn (payback period / financial return timeline).",
    },
    {
      id: "t_15",
      startTimeSec: 150.5,
      endTimeSec: 164.0,
      speaker: "Dr. Stevens",
      text: "How do you plan to address their concerns regarding potential roof structural damage during installation?",
    },
    {
      id: "t_16",
      startTimeSec: 164.3,
      endTimeSec: 178.0,
      speaker: "Liam",
      text: "We are partnering with a certified structural engineering firm who will conduct ultrasound load testing prior to mounting any brackets.",
      trapType: "evidence",
      relatedQuestionId: "q_09",
      trapExplanation: "Biện pháp kiểm tra độ chịu lực mái: ultrasound load testing.",
    },
    {
      id: "t_17",
      startTimeSec: 178.5,
      endTimeSec: 195.0,
      speaker: "Dr. Stevens",
      text: "Great. For your final submission, make sure you include a comprehensive risk mitigation appendix. That will ensure full marks.",
      trapType: "evidence",
      relatedQuestionId: "q_10",
      trapExplanation: "Yêu cầu bắt buộc trong báo cáo cuối cùng: Risk mitigation appendix.",
    },
  ],
  questions: [
    {
      id: "q_01",
      number: 1,
      type: "form_completion",
      prompt: "Selected Technology: roof-mounted (1) _____________________ (NO MORE THAN TWO WORDS)",
      correctAnswer: "solar panels",
      trapType: "careless_reading",
      evidenceStartTimeSec: 6.8,
      evidenceEndTimeSec: 14.2,
      distractorText: "rooftop wind turbines",
      redirectingMarker: "Initially considered... but suggested that...",
      trapExplanation: "Bẫy thông tin ban đầu: Người nói nhắc tới 'rooftop wind turbines' trước, nhưng sau đó chốt lại chọn 'solar panels'.",
    },
    {
      id: "q_02",
      number: 2,
      type: "form_completion",
      prompt: "Net installation cost after grant: £(2) _____________________ (A NUMBER)",
      correctAnswer: "35,000",
      trapType: "careless_reading",
      evidenceStartTimeSec: 22.3,
      evidenceEndTimeSec: 32.5,
      distractorText: "50,000",
      redirectingMarker: "quoted fifty thousand... However, net cost drops to...",
      trapExplanation: "Bẫy số tiền ban đầu: Giá gốc 50,000 bảng, sau trợ cấp còn 35,000 (hoặc thirty-five thousand).",
    },
    {
      id: "q_03",
      number: 3,
      type: "form_completion",
      prompt: "Winter maintenance: regular inspection of (3) _____________________ (ONE WORD)",
      correctAnswer: "inverters",
      trapType: "singular_plural",
      evidenceStartTimeSec: 41.8,
      evidenceEndTimeSec: 51.0,
      distractorText: "surface washing",
      redirectingMarker: "rather than surface washing... need regular inspections of...",
      trapExplanation: "Bẫy số nhiều (-s): Người nói phát âm rõ danh từ số nhiều 'inverters'. Nghe sót đuôi -s sẽ bị mất điểm.",
    },
    {
      id: "q_04",
      number: 4,
      type: "form_completion",
      prompt: "Annual carbon reduction: (4) _____________________ metric tons",
      correctAnswer: "80",
      trapType: "careless_reading",
      evidenceStartTimeSec: 51.3,
      evidenceEndTimeSec: 61.2,
      trapExplanation: "Số lượng giảm phát thải: 80 (eighty).",
    },
    {
      id: "q_05",
      number: 5,
      type: "form_completion",
      prompt: "Performance tracking tool: an online (5) _____________________",
      correctAnswer: "dashboard",
      trapType: "paraphrase_trap",
      evidenceStartTimeSec: 61.5,
      evidenceEndTimeSec: 72.0,
      trapExplanation: "Từ khóa dẫn chứng: 'monitored in real time via an online dashboard'.",
    },
    {
      id: "q_06",
      number: 6,
      type: "multiple_choice",
      prompt: "Why did the students target second-year undergraduates for their survey?",
      options: [
        { key: "A", text: "They had the highest participation in previous campus projects." },
        { key: "B", text: "They provided a more balanced viewpoint than other cohorts." },
        { key: "C", text: "They were more willing to complete lengthy online questionnaires." },
      ],
      correctAnswer: "B",
      trapType: "paraphrase_trap",
      evidenceStartTimeSec: 84.3,
      evidenceEndTimeSec: 96.5,
      distractorText: "First-years adjusting, final-years overwhelmed",
      redirectingMarker: "so sophomores offered the most balanced perspective",
      trapExplanation: "Paraphrase: 'balanced perspective' <=> 'more balanced viewpoint than other cohorts'.",
    },
    {
      id: "q_07",
      number: 7,
      type: "multiple_choice",
      prompt: "According to Liam, what was the most surprising factor influencing recycling behaviour?",
      options: [
        { key: "A", text: "The threat of financial penalties for non-compliance." },
        { key: "B", text: "The presence of distinct labels and accessible disposal points." },
        { key: "C", text: "Peer recommendations on university social media." },
      ],
      correctAnswer: "B",
      trapType: "paraphrase_trap",
      evidenceStartTimeSec: 109.3,
      evidenceEndTimeSec: 122.5,
      distractorText: "financial penalties",
      redirectingMarker: "not motivated by financial penalties. Instead, clear signage and convenient bin locations...",
      trapExplanation: "Bẫy phủ định: Loại bỏ A vì 'not motivated by penalties'. Chọn B vì 'clear signage and convenient bins' = 'distinct labels and accessible disposal points'.",
    },
    {
      id: "q_08",
      number: 8,
      type: "multiple_choice",
      prompt: "What is the primary concern of the university board regarding the proposal?",
      options: [
        { key: "A", text: "The length of time required to recover initial financial investments." },
        { key: "B", text: "The reliability of power supply during inclement weather." },
        { key: "C", text: "Opposition from residents living in nearby neighborhoods." },
      ],
      correctAnswer: "A",
      trapType: "paraphrase_trap",
      evidenceStartTimeSec: 136.3,
      evidenceEndTimeSec: 150.0,
      distractorText: "technical feasibility",
      redirectingMarker: "not worried about technical feasibility, but skeptical about the payback period",
      trapExplanation: "Paraphrase: 'payback period / break even in 7 years' <=> 'length of time required to recover initial financial investments'.",
    },
    {
      id: "q_09",
      number: 9,
      type: "multiple_choice",
      prompt: "How will roof structural integrity be verified prior to installation?",
      options: [
        { key: "A", text: "By reviewing original building blueprints with university architects." },
        { key: "B", text: "By applying physical weights to the roof surface over one month." },
        { key: "C", text: "By conducting ultrasound testing with certified engineers." },
      ],
      correctAnswer: "C",
      trapType: "paraphrase_trap",
      evidenceStartTimeSec: 164.3,
      evidenceEndTimeSec: 178.0,
      trapExplanation: "Dẫn chứng nguyên bản: 'certified structural engineering firm who will conduct ultrasound load testing'.",
    },
    {
      id: "q_10",
      number: 10,
      type: "multiple_choice",
      prompt: "What does Dr. Stevens recommend adding to the final project submission?",
      options: [
        { key: "A", text: "A detailed section outlining risk mitigation strategies." },
        { key: "B", text: "A letter of endorsement from student union representatives." },
        { key: "C", text: "A video demonstration of the monitoring dashboard." },
      ],
      correctAnswer: "A",
      trapType: "paraphrase_trap",
      evidenceStartTimeSec: 178.5,
      evidenceEndTimeSec: 195.0,
      trapExplanation: "Paraphrase: 'risk mitigation appendix' <=> 'section outlining risk mitigation strategies'.",
    },
  ],
};
