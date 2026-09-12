export interface S3Option {
  id: string;
  letter: string; // 'A', 'B', 'C'
  text: string;
  speaker: string; // 'Mark' | 'Helen' | 'Prof. Davies'
  status: "proposed" | "rejected" | "consensus";
  rejectionReason?: string;
  dialogueQuote: string;
}

export interface S3Question {
  id: string;
  questionNumber: number;
  prompt: string;
  options: S3Option[];
  correctOptionId: string;
  correctLetter: string;
  consensusTimestamp: string;
  trapTitleVi: string;
  explanationMarkdown: string;
}

export interface Section3Task {
  id: string;
  title: string;
  scenario: string;
  audioDurationSeconds: number;
  fullTranscript: string;
  questions: S3Question[];
}

export interface S4NoteItem {
  id: string;
  questionNumber: number;
  contextTextBefore: string;
  contextTextAfter: string;
  expectedAnswers: string[];
  maxWords: number;
  signpostCue: string;
  explanationDetail: string;
  audioTimestamp: string;
}

export interface S4NoteSection {
  sectionTitle: string;
  signpostHeader: string;
  bulletItems: Array<{
    type: "text" | "question";
    text?: string;
    questionData?: S4NoteItem;
  }>;
}

export interface Section4Task {
  id: string;
  title: string;
  scenario: string;
  wordLimitInstruction: string;
  audioDurationSeconds: number;
  fullTranscript: string;
  signposts: Array<{
    id: string;
    cuePhrase: string;
    timestamp: string;
    subTopic: string;
  }>;
  noteSections: S4NoteSection[];
  questions: S4NoteItem[];
}

export const MOCK_SECTION_3_TASK: Section3Task = {
  id: "listening_s3_microplastics",
  title: "Section 3: Academic Research Proposal on Estuarine Microplastics",
  scenario: "A tutorial discussion between two postgraduate students, Mark and Helen, and their academic supervisor, Professor Davies, planning their environmental research project.",
  audioDurationSeconds: 160,
  fullTranscript:
    "Prof. Davies: Welcome, Mark and Helen. Let's review your research proposal on microplastic contamination in the Thames Estuary. What methodology did you initially select for collecting coastal sediment samples?\n" +
    "Mark: Well, Professor, I originally proposed using a high-speed motorized dredger from a boat (Option A) to collect core sediment samples along the riverbed.\n" +
    "Helen: But when I checked the department budget and equipment availability, the marine dredger was far too expensive and currently booked by the PhD cohort. So I suggested we could just gather surface water using simple hand nets (Option B).\n" +
    "Prof. Davies: Hand nets wouldn't capture settled microplastics in the deep anaerobic sediment layer, though.\n" +
    "Mark: Exactly. That's why Helen and I finally agreed on using manual grab samplers during low tide along the shoreline (Option C), which costs almost nothing and guarantees sediment depth integrity.\n" +
    "Prof. Davies: Excellent compromise. Now, what about your chemical identification protocol in the laboratory?\n" +
    "Helen: Mark wanted to send our specimens to an external commercial laboratory for gas chromatography (Option A), but that would take six weeks.\n" +
    "Mark: And Helen thought we could just visually count the plastic particles under a standard optical microscope (Option B), but visual inspection has an error rate of over 40 percent for particles under 50 microns.\n" +
    "Helen: Right. So in the end, we decided to book the university's Raman spectrometer (Option C) for three consecutive afternoon sessions.\n" +
    "Prof. Davies: Perfect. That will provide definitive polymer fingerprinting. Keep me updated on your preliminary data!",
  questions: [
    {
      id: "q_s3_1",
      questionNumber: 1,
      prompt: "Which sampling technique did Mark and Helen finally agree to use for their sediment collection?",
      options: [
        {
          id: "opt_1_a",
          letter: "A",
          text: "Deploying a motorized marine dredger from a research vessel",
          speaker: "Mark",
          status: "rejected",
          rejectionReason: "Helen pointed out the dredger was too expensive and already booked by PhD students.",
          dialogueQuote: "I originally proposed using a high-speed motorized dredger... but the marine dredger was far too expensive.",
        },
        {
          id: "opt_1_b",
          letter: "B",
          text: "Collecting surface water samples using manual hand nets",
          speaker: "Helen",
          status: "rejected",
          rejectionReason: "Prof. Davies noted hand nets cannot sample the deep settled sediment layers.",
          dialogueQuote: "I suggested we could just gather surface water using simple hand nets... Hand nets wouldn't capture settled microplastics.",
        },
        {
          id: "opt_1_c",
          letter: "C",
          text: "Using manual grab samplers along the shoreline during low tide",
          speaker: "Mark & Helen",
          status: "consensus",
          dialogueQuote: "That's why Helen and I finally agreed on using manual grab samplers during low tide along the shoreline...",
        },
      ],
      correctOptionId: "opt_1_c",
      correctLetter: "C",
      consensusTimestamp: "0:50",
      trapTitleVi: "Bẫy Sự Đồng Thuận Nhóm (All Options Mentioned Trap)",
      explanationMarkdown:
        "Cả 3 phương án A, B, C đều được nhắc tới trong audio: Mark đề xuất A (bị từ chối vì đắt), Helen đề xuất B (bị từ chối vì không lấy được mẫu trầm tích sâu). Cả hai **thống nhất chọn phương án C (manual grab samplers during low tide)**.",
    },
    {
      id: "q_s3_2",
      questionNumber: 2,
      prompt: "How will the students identify the exact chemical polymer composition of the extracted microplastics?",
      options: [
        {
          id: "opt_2_a",
          letter: "A",
          text: "Outsourcing the specimens to an external commercial laboratory",
          speaker: "Mark",
          status: "rejected",
          rejectionReason: "Taking six weeks would exceed project submission deadlines.",
          dialogueQuote: "Mark wanted to send our specimens to an external commercial laboratory... but that would take six weeks.",
        },
        {
          id: "opt_2_b",
          letter: "B",
          text: "Performing visual identification under a standard optical microscope",
          speaker: "Helen",
          status: "rejected",
          rejectionReason: "Visual inspection has an unacceptable error rate of over 40%.",
          dialogueQuote: "Helen thought we could just visually count the plastic particles... but visual inspection has an error rate of over 40 percent.",
        },
        {
          id: "opt_2_c",
          letter: "C",
          text: "Utilizing the university's internal Raman spectrometer",
          speaker: "Mark & Helen",
          status: "consensus",
          dialogueQuote: "So in the end, we decided to book the university's Raman spectrometer for three consecutive afternoon sessions.",
        },
      ],
      correctOptionId: "opt_2_c",
      correctLetter: "C",
      consensusTimestamp: "1:35",
      trapTitleVi: "Bẫy Ý Kiến Bị Bác Bỏ (Rejected Alternative Trap)",
      explanationMarkdown:
        "Phương án A bị loại vì thời gian chờ 6 tuần quá lâu; Phương án B bị loại vì sai số thị giác 40%. Cả nhóm **đồng thuận đặt lịch dùng máy quang phổ Raman của trường đại học (Option C)**.",
    },
  ],
};

export const MOCK_SECTION_4_TASK: Section4Task = {
  id: "listening_s4_ancient_hydrology",
  title: "Section 4: Hydraulic Engineering & Urban Water Infrastructure in Ancient Civilizations",
  scenario: "An academic lecture by a Professor of Archaeology exploring subterranean water distribution and architectural engineering in the Roman and Minoan empires.",
  wordLimitInstruction: "Write ONE WORD ONLY for each answer.",
  audioDurationSeconds: 190,
  fullTranscript:
    "Lecturer: Good afternoon, everyone. In today's lecture on ancient civil engineering, we will examine the ingenious subterranean hydraulic networks that allowed ancient Mediterranean metropolises to sustain dense urban populations.\n" +
    "Let us begin by examining the primary source of incoming water. Contrary to the popular belief that Roman cities relied solely on river abstraction, the vast majority of monumental aqueducts were engineered to capture natural water directly from subterranean springs (Question 1) in high-altitude mountain catchments.\n" +
    "Turning now to the subterranean conduits, engineers lined these stone tunnels with a specialized waterproof hydraulic cement. To prevent excessive sediment accumulation from clogging the system, deep settling basins known as cisterns (Question 2) were constructed at regular intervals along the subterranean route.\n" +
    "Having considered the transport infrastructure, let us examine the urban distribution system. Upon reaching the municipal boundary, pressurized water entered a monumental distribution facility called a castellum divisorium. From this central reservoir, lead and terracotta pipes distributed pressurized flows directly to public baths, decorative fountains, and private residences of the wealthy elite.\n" +
    "To illustrate the governance of this massive system, municipal authorities maintained strict regulatory oversight. Water theft was severely prosecuted, and inspectors were tasked with installing calibrated bronze nozzles to measure the precise volume (Question 3) of water allocated to each commercial enterprise.\n" +
    "Furthermore, ancient engineers were acutely aware of environmental hygiene. Waste runoff was directed through underground vaulted sewers, the most famous of which was the Cloaca Maxima, which discharged domestic wastewater and urban drainage directly into the river (Question 4).\n" +
    "Finally, regarding the architectural legacy of these systems, contemporary urban planners frequently analyze Roman hydraulic networks because their gravity-driven operational principle required zero mechanical fuel (Question 5) to supply millions of daily liters.\n" +
    "Thank you for your attention.",
  signposts: [
    {
      id: "sp_1",
      cuePhrase: "Let us begin by examining...",
      timestamp: "0:25",
      subTopic: "1. Primary Water Source Catchment",
    },
    {
      id: "sp_2",
      cuePhrase: "Turning now to the subterranean conduits...",
      timestamp: "0:50",
      subTopic: "2. Tunnel Engineering & Sediment Traps",
    },
    {
      id: "sp_3",
      cuePhrase: "Having considered the transport, let us examine...",
      timestamp: "1:15",
      subTopic: "3. Urban Distribution & Governance",
    },
    {
      id: "sp_4",
      cuePhrase: "Furthermore, regarding environmental hygiene...",
      timestamp: "1:40",
      subTopic: "4. Sewage Discharge & Drainage",
    },
    {
      id: "sp_5",
      cuePhrase: "Finally, regarding the architectural legacy...",
      timestamp: "2:05",
      subTopic: "5. Modern Relevance & Energy Efficiency",
    },
  ],
  noteSections: [
    {
      sectionTitle: "1. Primary Water Catchment",
      signpostHeader: "Signpost: 'Let us begin by examining...'",
      bulletItems: [
        {
          type: "text",
          text: "Ancient engineers preferred high-altitude mountain locations rather than low-lying rivers.",
        },
        {
          type: "question",
          questionData: {
            id: "q_s4_1",
            questionNumber: 1,
            contextTextBefore: "Water was captured directly from subterranean",
            contextTextAfter: "in mountain catchments.",
            expectedAnswers: ["springs", "spring"],
            maxWords: 1,
            signpostCue: "Let us begin by examining the primary source...",
            explanationDetail:
              "Bài giảng chỉ rõ: '...aqueducts were engineered to capture natural water directly from subterranean springs...' Đáp án ONE WORD là 'springs' (hoặc 'spring').",
            audioTimestamp: "0:35",
          },
        },
      ],
    },
    {
      sectionTitle: "2. Conduit Engineering & Maintenance",
      signpostHeader: "Signpost: 'Turning now to the subterranean conduits...'",
      bulletItems: [
        {
          type: "text",
          text: "Tunnels lined with waterproof hydraulic cement to prevent leakage.",
        },
        {
          type: "question",
          questionData: {
            id: "q_s4_2",
            questionNumber: 2,
            contextTextBefore: "Deep settling basins called",
            contextTextAfter: "were installed to trap silt and sediment.",
            expectedAnswers: ["cisterns", "cistern"],
            maxWords: 1,
            signpostCue: "Turning now to the subterranean conduits...",
            explanationDetail:
              "Bài giảng nêu: '...deep settling basins known as cisterns were constructed at regular intervals...' Đáp án ONE WORD là 'cisterns'.",
            audioTimestamp: "1:00",
          },
        },
      ],
    },
    {
      sectionTitle: "3. Municipal Distribution & Regulation",
      signpostHeader: "Signpost: 'To illustrate the governance...'",
      bulletItems: [
        {
          type: "question",
          questionData: {
            id: "q_s4_3",
            questionNumber: 3,
            contextTextBefore: "Calibrated bronze nozzles measured the exact",
            contextTextAfter: "delivered to commercial businesses.",
            expectedAnswers: ["volume"],
            maxWords: 1,
            signpostCue: "To illustrate the governance of this massive system...",
            explanationDetail:
              "Bài giảng giải thích: '...installing calibrated bronze nozzles to measure the precise volume of water allocated...' Đáp án ONE WORD là 'volume'.",
            audioTimestamp: "1:25",
          },
        },
      ],
    },
    {
      sectionTitle: "4. Sanitation & Waste Disposal",
      signpostHeader: "Signpost: 'Furthermore, regarding environmental hygiene...'",
      bulletItems: [
        {
          type: "question",
          questionData: {
            id: "q_s4_4",
            questionNumber: 4,
            contextTextBefore: "Vaulted sewer tunnels discharged domestic wastewater into the",
            contextTextAfter: ".",
            expectedAnswers: ["river"],
            maxWords: 1,
            signpostCue: "Furthermore, ancient engineers were acutely aware...",
            explanationDetail:
              "Bài giảng nêu rõ: '...discharged domestic wastewater and urban drainage directly into the river.' Đáp án ONE WORD là 'river'.",
            audioTimestamp: "1:50",
          },
        },
      ],
    },
    {
      sectionTitle: "5. Sustainability & Energy",
      signpostHeader: "Signpost: 'Finally, regarding the architectural legacy...'",
      bulletItems: [
        {
          type: "question",
          questionData: {
            id: "q_s4_5",
            questionNumber: 5,
            contextTextBefore: "The gravity-powered system operated using zero mechanical",
            contextTextAfter: "to move water across distances.",
            expectedAnswers: ["fuel"],
            maxWords: 1,
            signpostCue: "Finally, regarding the architectural legacy...",
            explanationDetail:
              "Bài giảng kết luận: '...their gravity-driven operational principle required zero mechanical fuel...' Đáp án ONE WORD là 'fuel'.",
            audioTimestamp: "2:15",
          },
        },
      ],
    },
  ],
  questions: [
    {
      id: "q_s4_1",
      questionNumber: 1,
      contextTextBefore: "Water was captured directly from subterranean",
      contextTextAfter: "in mountain catchments.",
      expectedAnswers: ["springs", "spring"],
      maxWords: 1,
      signpostCue: "Let us begin by examining the primary source...",
      explanationDetail: "Đáp án đúng là 'springs' hoặc 'spring'.",
      audioTimestamp: "0:35",
    },
    {
      id: "q_s4_2",
      questionNumber: 2,
      contextTextBefore: "Deep settling basins called",
      contextTextAfter: "were installed to trap silt and sediment.",
      expectedAnswers: ["cisterns", "cistern"],
      maxWords: 1,
      signpostCue: "Turning now to the subterranean conduits...",
      explanationDetail: "Đáp án đúng là 'cisterns' hoặc 'cistern'.",
      audioTimestamp: "1:00",
    },
    {
      id: "q_s4_3",
      questionNumber: 3,
      contextTextBefore: "Calibrated bronze nozzles measured the exact",
      contextTextAfter: "delivered to commercial businesses.",
      expectedAnswers: ["volume"],
      maxWords: 1,
      signpostCue: "To illustrate the governance...",
      explanationDetail: "Đáp án đúng là 'volume'.",
      audioTimestamp: "1:25",
    },
    {
      id: "q_s4_4",
      questionNumber: 4,
      contextTextBefore: "Vaulted sewer tunnels discharged domestic wastewater into the",
      contextTextAfter: ".",
      expectedAnswers: ["river"],
      maxWords: 1,
      signpostCue: "Furthermore, ancient engineers...",
      explanationDetail: "Đáp án đúng là 'river'.",
      audioTimestamp: "1:50",
    },
    {
      id: "q_s4_5",
      questionNumber: 5,
      contextTextBefore: "The gravity-powered system operated using zero mechanical",
      contextTextAfter: "to move water across distances.",
      expectedAnswers: ["fuel"],
      maxWords: 1,
      signpostCue: "Finally, regarding the architectural legacy...",
      explanationDetail: "Đáp án đúng là 'fuel'.",
      audioTimestamp: "2:15",
    },
  ],
};
