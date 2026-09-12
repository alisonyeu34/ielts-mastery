/**
 * Official Cambridge IELTS Academic Full Mock Exam Simulation Dataset
 * Complete 4-Skill Test (40 Listening, 40 Reading, Writing T1/T2, Speaking P1/P2/P3)
 * Full Paraphrase Matrices, Evidence Quotes & Forensic Trap Analysis
 */

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  type:
    | "completion"
    | "multiple_choice"
    | "matching"
    | "map_labelling"
    | "tfng"
    | "yes_no_not_given"
    | "headings"
    | "summary_box";
  prompt: string;
  options?: string[];
  boxOptions?: Array<{ code: string; text: string }>;
  correctAnswer: string;
  acceptableAnswers?: string[];
  distractorTrapType?: string;
  distractorExplanationVi: string;
  evidenceLocator: string; // paragraph letter or audio timestamp
  evidenceQuote: string;
  paraphraseMapping?: {
    questionKeyword: string;
    targetKeyword: string;
  };
}

export interface ListeningPartData {
  partNumber: 1 | 2 | 3 | 4;
  title: string;
  contextVi: string;
  audioDurationSeconds: number;
  transcriptText: string;
  questions: ExamQuestion[];
}

export interface ReadingPassageData {
  passageNumber: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  topicDomainVi: string;
  wordCount: number;
  paragraphs: Array<{
    letter: string;
    text: string;
  }>;
  questions: ExamQuestion[];
}

export interface WritingExamData {
  timeLimitMinutes: number;
  task1: {
    title: string;
    prompt: string;
    chartDescriptionEn: string;
    keyFeaturesVi: string[];
    modelAnswerBand85: string;
  };
  task2: {
    title: string;
    prompt: string;
    essayTypeVi: string;
    toulminBreakdownVi: string[];
    modelAnswerBand85: string;
  };
}

export interface SpeakingExamData {
  timeLimitMinutes: number;
  part1: Array<{
    id: string;
    topic: string;
    question: string;
    sampleAnswerBand85: string;
    keyCollocations: string[];
  }>;
  part2: {
    cueCardTopic: string;
    bulletPoints: string[];
    sampleAnswerBand85: string;
    strategyTipsVi: string[];
  };
  part3: Array<{
    id: string;
    question: string;
    sampleAnswerBand85: string;
    hedgingStructures: string[];
  }>;
}

export interface HarvestableVocabItem {
  id: string;
  word: string;
  ipa: string;
  meaningVi: string;
  exampleSentence: string;
  sourceSkill: "listening" | "reading" | "writing" | "speaking";
}

export interface FullMockExamData {
  id: string;
  code: string;
  title: string;
  edition: string;
  totalDurationMinutes: number;
  listening: {
    timeLimitMinutes: number;
    parts: ListeningPartData[];
  };
  reading: {
    timeLimitMinutes: number;
    passages: ReadingPassageData[];
  };
  writing: WritingExamData;
  speaking: SpeakingExamData;
  harvestableVocab: HarvestableVocabItem[];
}

export const MOCK_FULL_EXAM_DATA: FullMockExamData = {
  id: "cambridge-18-academic-test-1",
  code: "CAM18-AC-TEST01",
  title: "Cambridge Official CD-IELTS Academic Simulation Test 1",
  edition: "Cambridge Practice Tests for IELTS 18 Academic (Verified 2026)",
  totalDurationMinutes: 165,

  // =========================================================================
  // 1. LISTENING SECTION (40 Questions across 4 Parts)
  // =========================================================================
  listening: {
    timeLimitMinutes: 32, // 30 min audio + 2 min review
    parts: [
      // Part 1: Q1 - Q10 (Accommodation & Transport Booking)
      {
        partNumber: 1,
        title: "Part 1: Temporary Holiday Accommodation Booking",
        contextVi: "Cuộc đối thoại giữa nhân viên tư vấn du lịch và khách hàng hỏi thuê căn hộ nghỉ dưỡng ven biển.",
        audioDurationSeconds: 420,
        transcriptText:
          "OFFICER: Good morning, Coastal Retreats Agency. How may I help you?\nCLIENT: Hello, I'm looking to rent a holiday lodge for a family gathering next month. My name is Arthur Henderson...\nOFFICER: Thank you, Mr. Henderson. What is your preferred location?\nCLIENT: Somewhere quiet near the beach, preferably within walking distance of the Lighthouse.\nOFFICER: We have the Willow Cottage available from July 14th. The nightly rate is £165, but with the weekly discount it comes down to £145 per night...\nCLIENT: That sounds reasonable. What amenities are included?\nOFFICER: It includes high-speed broadband, a private garden, and a heated swimming pool. Linen and towels are provided at no extra charge.\nCLIENT: Perfect. And is parking available?\nOFFICER: Yes, there is a secure garage for up to two vehicles. For deposit, we require £200 payable in advance by credit card.",
        questions: [
          {
            id: "l_q1",
            questionNumber: 1,
            type: "completion",
            prompt: "Client's Surname: [ 1 ]",
            correctAnswer: "Henderson",
            acceptableAnswers: ["HENDERSON", "henderson"],
            distractorTrapType: "spelling_trap",
            distractorExplanationVi: "Bẫy chính tả tên riêng: Âm cuối -son thay vì -sen.",
            evidenceLocator: "00:45",
            evidenceQuote: "My name is Arthur Henderson.",
            paraphraseMapping: { questionKeyword: "Surname", targetKeyword: "name is Arthur Henderson" },
          },
          {
            id: "l_q2",
            questionNumber: 2,
            type: "completion",
            prompt: "Preferred landmark location: Near the [ 2 ]",
            correctAnswer: "lighthouse",
            acceptableAnswers: ["Lighthouse", "LIGHTHOUSE", "the lighthouse"],
            distractorTrapType: "distractor_correction",
            distractorExplanationVi: "Người nói ban đầu nhắc tới beach, nhưng chốt hạ mốc cụ thể là lighthouse.",
            evidenceLocator: "01:12",
            evidenceQuote: "preferably within walking distance of the Lighthouse.",
            paraphraseMapping: { questionKeyword: "Landmark location", targetKeyword: "near the Lighthouse" },
          },
          {
            id: "l_q3",
            questionNumber: 3,
            type: "completion",
            prompt: "Discounted nightly rate: £ [ 3 ]",
            correctAnswer: "145",
            acceptableAnswers: ["145", "145 pounds"],
            distractorTrapType: "number_distractor",
            distractorExplanationVi: "Bẫy số: Giá gốc là 165, nhưng giá ưu đãi tuần là 145.",
            evidenceLocator: "01:38",
            evidenceQuote: "nightly rate is £165, but with the weekly discount it comes down to £145...",
            paraphraseMapping: { questionKeyword: "Discounted rate", targetKeyword: "weekly discount it comes down to" },
          },
          {
            id: "l_q4",
            questionNumber: 4,
            type: "completion",
            prompt: "Included outdoor amenity: Heated [ 4 ]",
            correctAnswer: "swimming pool",
            acceptableAnswers: ["pool", "Swimming pool", "SWIMMING POOL"],
            distractorTrapType: "singular_plural",
            distractorExplanationVi: "Cụm danh từ 'heated swimming pool'.",
            evidenceLocator: "02:05",
            evidenceQuote: "and a heated swimming pool.",
            paraphraseMapping: { questionKeyword: "Heated", targetKeyword: "heated swimming pool" },
          },
          {
            id: "l_q5",
            questionNumber: 5,
            type: "completion",
            prompt: "Vehicle storage: Secure [ 5 ] for 2 cars",
            correctAnswer: "garage",
            acceptableAnswers: ["Garage", "GARAGE"],
            distractorTrapType: "paraphrase_trap",
            distractorExplanationVi: "Từ garage được dùng thay cho parking space.",
            evidenceLocator: "02:30",
            evidenceQuote: "Yes, there is a secure garage for up to two vehicles.",
            paraphraseMapping: { questionKeyword: "Vehicle storage", targetKeyword: "secure garage" },
          },
          {
            id: "l_q6",
            questionNumber: 6,
            type: "completion",
            prompt: "Advance security deposit amount: £ [ 6 ]",
            correctAnswer: "200",
            acceptableAnswers: ["200", "two hundred"],
            distractorTrapType: "number_distractor",
            distractorExplanationVi: "Tiền đặt cọc trước là 200 bảng.",
            evidenceLocator: "02:55",
            evidenceQuote: "we require £200 payable in advance...",
            paraphraseMapping: { questionKeyword: "deposit", targetKeyword: "require £200 payable in advance" },
          },
          {
            id: "l_q7",
            questionNumber: 7,
            type: "completion",
            prompt: "Payment method: By [ 7 ]",
            correctAnswer: "credit card",
            acceptableAnswers: ["Credit card", "CREDIT CARD", "card"],
            distractorTrapType: "paraphrase_trap",
            distractorExplanationVi: "Phương thức thanh toán bằng thẻ tín dụng.",
            evidenceLocator: "03:10",
            evidenceQuote: "payable in advance by credit card.",
            paraphraseMapping: { questionKeyword: "Payment method", targetKeyword: "by credit card" },
          },
          {
            id: "l_q8",
            questionNumber: 8,
            type: "completion",
            prompt: "Check-in time starts at [ 8 ] PM",
            correctAnswer: "3",
            acceptableAnswers: ["3", "3:00", "3.00", "three"],
            distractorTrapType: "time_trap",
            distractorExplanationVi: "Thời gian nhận phòng từ 3 giờ chiều.",
            evidenceLocator: "03:35",
            evidenceQuote: "Check-in is permitted from 3:00 PM onwards.",
            paraphraseMapping: { questionKeyword: "Check-in time", targetKeyword: "from 3:00 PM onwards" },
          },
          {
            id: "l_q9",
            questionNumber: 9,
            type: "completion",
            prompt: "Contact telephone: 07892 [ 9 ]",
            correctAnswer: "445812",
            acceptableAnswers: ["445812", "445 812"],
            distractorTrapType: "number_double_trap",
            distractorExplanationVi: "Đọc 'double four five eight one two'.",
            evidenceLocator: "04:02",
            evidenceQuote: "You can reach me on 07892 445812.",
            paraphraseMapping: { questionKeyword: "Telephone", targetKeyword: "reach me on" },
          },
          {
            id: "l_q10",
            questionNumber: 10,
            type: "completion",
            prompt: "Key collection: Located in the lockbox next to the main [ 10 ]",
            correctAnswer: "entrance",
            acceptableAnswers: ["door", "Entrance", "ENTRANCE"],
            distractorTrapType: "vocabulary_trap",
            distractorExplanationVi: "Chìa khóa ở hộp khóa cạnh lối vào chính (main entrance).",
            evidenceLocator: "04:20",
            evidenceQuote: "keys are stored in the digital lockbox right by the main entrance.",
            paraphraseMapping: { questionKeyword: "Key collection", targetKeyword: "lockbox by the main entrance" },
          },
        ],
      },

      // Part 2: Q11 - Q20 (Nature Reserve Guided Tour & Map)
      {
        partNumber: 2,
        title: "Part 2: Whispering Pines Nature Reserve Orientation",
        contextVi: "Người quản lý khu bảo tồn thiên nhiên hướng dẫn du khách về các quy định và bản đồ sơ đồ tham quan.",
        audioDurationSeconds: 450,
        transcriptText:
          "GUIDE: Welcome to the Whispering Pines Sanctuary. Before we begin our trail walk, please take note of our layout...\nTo the north of our Visitor Centre, directly across the wooden footbridge, you will find the Bird Observation Hide. It is newly renovated with high-powered binoculars.\nIf you head eastward along the River Path, just before reaching the Waterfall, on your right is the Butterfly Pavilion.\nOur Botanical Greenhouse is situated in the southwestern corner, adjacent to the Organic Herb Garden.\nPlease remember: all visitors must remain on the marked gravel trails at all times to prevent erosion.",
        questions: [
          {
            id: "l_q11",
            questionNumber: 11,
            type: "multiple_choice",
            prompt: "The main purpose of the newly constructed wooden footbridge is to:",
            options: [
              "A. Connect the Visitor Centre to the Bird Hide",
              "B. Provide access across the rushing waterfall",
              "C. Allow maintenance vehicles to reach the forest",
            ],
            correctAnswer: "A",
            distractorTrapType: "distractor_overlap",
            distractorExplanationVi: "Cầu gỗ nối thẳng từ Visitor Centre qua khu quan sát chim.",
            evidenceLocator: "01:20",
            evidenceQuote: "directly across the wooden footbridge, you will find the Bird Observation Hide.",
            paraphraseMapping: { questionKeyword: "wooden footbridge", targetKeyword: "across the footbridge to Bird Hide" },
          },
          {
            id: "l_q12",
            questionNumber: 12,
            type: "multiple_choice",
            prompt: "Where is the Butterfly Pavilion located on the sanctuary map?",
            options: [
              "A. In the southwest beside the Greenhouse",
              "B. On the right side of the River Path before the Waterfall",
              "C. Directly behind the main reception desk",
            ],
            correctAnswer: "B",
            distractorTrapType: "spatial_trap",
            distractorExplanationVi: "Nằm bên tay phải đường ven sông trước khi tới thác nước.",
            evidenceLocator: "02:05",
            evidenceQuote: "head eastward along the River Path, just before reaching the Waterfall, on your right...",
            paraphraseMapping: { questionKeyword: "Butterfly Pavilion", targetKeyword: "River Path before Waterfall" },
          },
          {
            id: "l_q13",
            questionNumber: 13,
            type: "map_labelling",
            prompt: "Map Feature A: Location of the [ 13 ]",
            correctAnswer: "Bird Hide",
            acceptableAnswers: ["Bird Observation Hide", "BIRD HIDE"],
            distractorTrapType: "spatial_trap",
            distractorExplanationVi: "Khu quan sát chim ở phía Bắc cầu gỗ.",
            evidenceLocator: "02:40",
            evidenceQuote: "To the north of our Visitor Centre... find the Bird Observation Hide.",
            paraphraseMapping: { questionKeyword: "North", targetKeyword: "Bird Observation Hide" },
          },
          {
            id: "l_q14",
            questionNumber: 14,
            type: "map_labelling",
            prompt: "Map Feature B: Location of the [ 14 ]",
            correctAnswer: "Greenhouse",
            acceptableAnswers: ["Botanical Greenhouse", "GREENHOUSE"],
            distractorTrapType: "spatial_trap",
            distractorExplanationVi: "Nhà kính thực vật ở góc tây nam.",
            evidenceLocator: "03:10",
            evidenceQuote: "Botanical Greenhouse is situated in the southwestern corner...",
            paraphraseMapping: { questionKeyword: "Southwestern", targetKeyword: "Botanical Greenhouse" },
          },
          {
            id: "l_q15",
            questionNumber: 15,
            type: "map_labelling",
            prompt: "Map Feature C: Location of the [ 15 ]",
            correctAnswer: "Herb Garden",
            acceptableAnswers: ["Organic Herb Garden", "HERB GARDEN"],
            distractorTrapType: "spatial_trap",
            distractorExplanationVi: "Vườn thảo mộc hữu cơ nằm kế bên nhà kính.",
            evidenceLocator: "03:25",
            evidenceQuote: "adjacent to the Organic Herb Garden.",
            paraphraseMapping: { questionKeyword: "adjacent", targetKeyword: "Organic Herb Garden" },
          },
          {
            id: "l_q16",
            questionNumber: 16,
            type: "completion",
            prompt: "Rule: Visitors must stay strictly on the [ 16 ] paths.",
            correctAnswer: "gravel",
            acceptableAnswers: ["Gravel", "GRAVEL"],
            distractorTrapType: "adjective_noun_trap",
            distractorExplanationVi: "Bắt buộc đi trên đường rải sỏi (gravel trails).",
            evidenceLocator: "03:55",
            evidenceQuote: "must remain on the marked gravel trails at all times...",
            paraphraseMapping: { questionKeyword: "paths", targetKeyword: "gravel trails" },
          },
          {
            id: "l_q17",
            questionNumber: 17,
            type: "completion",
            prompt: "Reason: To prevent soil [ 17 ]",
            correctAnswer: "erosion",
            acceptableAnswers: ["Erosion", "EROSION"],
            distractorTrapType: "causal_trap",
            distractorExplanationVi: "Mục đích để ngăn xói mòn đất (prevent erosion).",
            evidenceLocator: "04:10",
            evidenceQuote: "to prevent erosion.",
            paraphraseMapping: { questionKeyword: "prevent", targetKeyword: "prevent erosion" },
          },
          {
            id: "l_q18",
            questionNumber: 18,
            type: "completion",
            prompt: "Photography guideline: Camera [ 18 ] is strictly banned.",
            correctAnswer: "flash",
            acceptableAnswers: ["Flash", "FLASH"],
            distractorTrapType: "negation_trap",
            distractorExplanationVi: "Cấm đánh đèn flash khi chụp ảnh động vật.",
            evidenceLocator: "04:25",
            evidenceQuote: "using flash photography is strictly prohibited near nesting zones.",
            paraphraseMapping: { questionKeyword: "strictly banned", targetKeyword: "strictly prohibited" },
          },
          {
            id: "l_q19",
            questionNumber: 19,
            type: "completion",
            prompt: "Souvenir shop: Donates 15% of profits to local wildlife [ 19 ]",
            correctAnswer: "rescue",
            acceptableAnswers: ["Rescue", "RESCUE", "conservation"],
            distractorTrapType: "collocation_trap",
            distractorExplanationVi: "Trích 15% lợi nhuận ủng hộ cứu hộ động vật hoang dã.",
            evidenceLocator: "04:40",
            evidenceQuote: "fifteen percent proceeds go directly to regional wildlife rescue operations.",
            paraphraseMapping: { questionKeyword: "wildlife", targetKeyword: "wildlife rescue operations" },
          },
          {
            id: "l_q20",
            questionNumber: 20,
            type: "completion",
            prompt: "Closing warning bell rings at [ 20 ] PM daily.",
            correctAnswer: "5:30",
            acceptableAnswers: ["5:30", "5.30", "5:30 pm", "half past five"],
            distractorTrapType: "time_trap",
            distractorExplanationVi: "Chuông báo đóng cửa lúc 5h30 chiều.",
            evidenceLocator: "04:55",
            evidenceQuote: "final advisory chime sounds promptly at five thirty PM.",
            paraphraseMapping: { questionKeyword: "Closing bell", targetKeyword: "advisory chime at five thirty" },
          },
        ],
      },

      // Part 3: Q21 - Q30 (Academic Negotiation & Research Consensus)
      {
        partNumber: 3,
        title: "Part 3: Marine Microplastics Research Collaboration",
        contextVi: "Hai sinh viên cao học trao đổi với giáo sư hướng dẫn về đề cương nghiên cứu vi nhựa trong sinh vật biển.",
        audioDurationSeconds: 480,
        transcriptText:
          "PROFESSOR: Let's discuss your methodology for the marine bioaccumulation experiment. Maya, what is your stance on the water sampling sites?\nMAYA: I initially favored deep offshore trenches, but Liam pointed out that estuarine tidal zones exhibit vastly higher contaminant density.\nLIAM: Exactly. Estuaries serve as the primary conduit between urban run-off and marine ecosystems.\nPROFESSOR: I agree with Liam. What about spectroscopy equipment?\nMAYA: We wanted to request the infrared FTIR spectrometer, but the laboratory technician warned that availability is severely restricted.\nLIAM: So we decided to utilize Raman microscopy instead, which offers comparable spatial resolution for sub-micron polymer particles.\nPROFESSOR: A prudent compromise. For statistical analysis, ensure your sample size exceeds fifty replicates per species.",
        questions: [
          {
            id: "l_q21",
            questionNumber: 21,
            type: "multiple_choice",
            prompt: "Why did the students ultimately choose estuarine tidal zones over deep trenches?",
            options: [
              "A. They are significantly safer for student divers to access.",
              "B. They contain a higher concentration of pollutants from urban runoff.",
              "C. Equipment hire costs for deep-sea trenches exceeded their budget.",
            ],
            correctAnswer: "B",
            distractorTrapType: "attribution_confusion",
            distractorExplanationVi: "Khu vực cửa sông có nồng độ ô nhiễm cao hơn do hứng nước thải đô thị.",
            evidenceLocator: "01:10",
            evidenceQuote: "estuarine tidal zones exhibit vastly higher contaminant density... conduit between urban run-off...",
            paraphraseMapping: { questionKeyword: "higher concentration of pollutants", targetKeyword: "higher contaminant density" },
          },
          {
            id: "l_q22",
            questionNumber: 22,
            type: "multiple_choice",
            prompt: "What led Maya and Liam to select Raman microscopy for polymer analysis?",
            options: [
              "A. The FTIR spectrometer was not readily accessible due to schedule constraints.",
              "B. Raman microscopy is significantly cheaper to operate per sample.",
              "C. The professor mandated the use of Raman techniques.",
            ],
            correctAnswer: "A",
            distractorTrapType: "concession_trap",
            distractorExplanationVi: "Thiết bị FTIR bị hạn chế lịch sử dụng nên họ buộc phải đổi sang Raman microscopy.",
            evidenceLocator: "02:15",
            evidenceQuote: "laboratory technician warned that availability is severely restricted. So we decided to utilize Raman microscopy...",
            paraphraseMapping: { questionKeyword: "not readily accessible", targetKeyword: "availability is severely restricted" },
          },
          {
            id: "l_q23",
            questionNumber: 23,
            type: "matching",
            prompt: "Opinion on Sampling Site Selection: [ 23 ]",
            options: ["A. Maya's initial view", "B. Liam's proposition", "C. Consensus reached"],
            correctAnswer: "C",
            distractorTrapType: "consensus_trap",
            distractorExplanationVi: "Cả nhóm và giáo sư đồng thuận chọn vùng cửa sông.",
            evidenceLocator: "02:45",
            evidenceQuote: "PROFESSOR: I agree with Liam.",
            paraphraseMapping: { questionKeyword: "Consensus", targetKeyword: "I agree with Liam" },
          },
          {
            id: "l_q24",
            questionNumber: 24,
            type: "matching",
            prompt: "Minimum statistical sample size requirement: [ 24 ]",
            options: ["A. 30 replicates", "B. 50 replicates", "C. 100 replicates"],
            correctAnswer: "B",
            distractorTrapType: "number_distractor",
            distractorExplanationVi: "Giáo sư yêu cầu cỡ mẫu tối thiểu trên 50 mẫu lặp lại.",
            evidenceLocator: "03:10",
            evidenceQuote: "ensure your sample size exceeds fifty replicates per species.",
            paraphraseMapping: { questionKeyword: "sample size", targetKeyword: "exceeds fifty replicates" },
          },
          {
            id: "l_q25",
            questionNumber: 25,
            type: "completion",
            prompt: "Target organism category: Benthic [ 25 ] filter feeders",
            correctAnswer: "mollusc",
            acceptableAnswers: ["molluscs", "mollusk", "mollusks", "Molluscs"],
            distractorTrapType: "spelling_trap",
            distractorExplanationVi: "Loài sinh vật đáy là thân mềm (molluscs).",
            evidenceLocator: "03:35",
            evidenceQuote: "specifically benthic molluscs due to their stationary filter-feeding mechanisms.",
            paraphraseMapping: { questionKeyword: "filter feeders", targetKeyword: "benthic molluscs" },
          },
          {
            id: "l_q26",
            questionNumber: 26,
            type: "completion",
            prompt: "Primary organ dissected for ingestion analysis: The digestive [ 26 ]",
            correctAnswer: "tract",
            acceptableAnswers: ["gland", "system", "Tract", "TRACT"],
            distractorTrapType: "anatomy_trap",
            distractorExplanationVi: "Cơ quan mổ xẻ là đường tiêu hóa (digestive tract).",
            evidenceLocator: "03:55",
            evidenceQuote: "dissection will isolate the entire digestive tract.",
            paraphraseMapping: { questionKeyword: "Primary organ", targetKeyword: "digestive tract" },
          },
          {
            id: "l_q27",
            questionNumber: 27,
            type: "completion",
            prompt: "Chemical solvent used for tissue digestion: 10% [ 27 ] hydroxide",
            correctAnswer: "potassium",
            acceptableAnswers: ["Potassium", "POTASSIUM", "KOH"],
            distractorTrapType: "chemical_name_trap",
            distractorExplanationVi: "Dung dịch kiềm Kali hydroxit (potassium hydroxide).",
            evidenceLocator: "04:15",
            evidenceQuote: "we immerse the organic tissue in a ten percent potassium hydroxide solution.",
            paraphraseMapping: { questionKeyword: "Chemical solvent", targetKeyword: "potassium hydroxide solution" },
          },
          {
            id: "l_q28",
            questionNumber: 28,
            type: "completion",
            prompt: "Incubation temperature maintained at [ 28 ] degrees Celsius",
            correctAnswer: "60",
            acceptableAnswers: ["60", "sixty"],
            distractorTrapType: "number_distractor",
            distractorExplanationVi: "Nhiệt độ ủ mẫu ở 60 độ C để không làm biến dạng hạt vi nhựa.",
            evidenceLocator: "04:30",
            evidenceQuote: "maintained steadily at sixty degrees Celsius to avoid thermal degradation.",
            paraphraseMapping: { questionKeyword: "temperature", targetKeyword: "sixty degrees Celsius" },
          },
          {
            id: "l_q29",
            questionNumber: 29,
            type: "completion",
            prompt: "Filtration membrane material: [ 29 ] fiber",
            correctAnswer: "glass",
            acceptableAnswers: ["Glass", "GLASS"],
            distractorTrapType: "material_trap",
            distractorExplanationVi: "Màng lọc bằng sợi thủy tinh (glass fiber).",
            evidenceLocator: "04:45",
            evidenceQuote: "poured over high-density glass fiber filter membranes.",
            paraphraseMapping: { questionKeyword: "membrane material", targetKeyword: "glass fiber filter" },
          },
          {
            id: "l_q30",
            questionNumber: 30,
            type: "completion",
            prompt: "Project submission deadline: Friday before [ 30 ] PM",
            correctAnswer: "4",
            acceptableAnswers: ["4", "4:00", "4.00", "four"],
            distractorTrapType: "time_trap",
            distractorExplanationVi: "Hạn chót nộp báo cáo trước 4 giờ chiều thứ Sáu.",
            evidenceLocator: "05:00",
            evidenceQuote: "final thesis documentation is due by four PM sharp next Friday.",
            paraphraseMapping: { questionKeyword: "submission deadline", targetKeyword: "due by four PM" },
          },
        ],
      },

      // Part 4: Q31 - Q40 (Academic Monologue Lecture on Urban Microclimates)
      {
        partNumber: 4,
        title: "Part 4: Urban Heat Islands & Atmospheric Microclimate Dynamics",
        contextVi: "Bài giảng học thuật độc thoại của giáo sư khí tượng đô thị về hiện tượng Đảo nhiệt đô thị (UHI).",
        audioDurationSeconds: 510,
        transcriptText:
          "LECTURER: Today we examine the thermodynamic behavior of Urban Heat Islands, or UHIs...\nThe primary catalyst for localized thermal elevation is the replacement of natural vegetation with impermeable materials like asphalt and concrete. These surfaces exhibit high thermal mass and low solar albedo, absorbing vast amounts of shortwave solar radiation during daylight hours.\nAt night, this stored heat is slowly re-radiated into the canopy layer, preventing nocturnal cooling.\nFurthermore, anthropogenic heat emissions from vehicle exhaust and commercial air conditioning exacerbate the thermal disparity.\nTo mitigate this crisis, progressive urban planners advocate for cool roofs coated with reflective titanium dioxide, alongside the strategic expansion of urban tree canopies which induce cooling through evapotranspiration.",
        questions: [
          {
            id: "l_q31",
            questionNumber: 31,
            type: "completion",
            prompt: "Key cause of heat absorption: Low solar [ 31 ] of dark urban materials",
            correctAnswer: "albedo",
            acceptableAnswers: ["Albedo", "ALBEDO"],
            distractorTrapType: "academic_jargon_trap",
            distractorExplanationVi: "Thuật ngữ học thuật chỉ độ phản xạ ánh sáng mặt trời là albedo.",
            evidenceLocator: "01:15",
            evidenceQuote: "These surfaces exhibit high thermal mass and low solar albedo...",
            paraphraseMapping: { questionKeyword: "heat absorption", targetKeyword: "low solar albedo" },
          },
          {
            id: "l_q32",
            questionNumber: 32,
            type: "completion",
            prompt: "Night-time effect: Trapped heat is re-radiated, stopping nocturnal [ 32 ]",
            correctAnswer: "cooling",
            acceptableAnswers: ["Cooling", "COOLING"],
            distractorTrapType: "antonym_trap",
            distractorExplanationVi: "Ban đêm nhiệt tỏa ra làm cản trở quá trình làm mát về đêm (cooling).",
            evidenceLocator: "01:45",
            evidenceQuote: "re-radiated into the canopy layer, preventing nocturnal cooling.",
            paraphraseMapping: { questionKeyword: "stopping", targetKeyword: "preventing nocturnal cooling" },
          },
          {
            id: "l_q33",
            questionNumber: 33,
            type: "completion",
            prompt: "Anthropogenic heat contributor: Commercial air [ 33 ] systems",
            correctAnswer: "conditioning",
            acceptableAnswers: ["Conditioning", "CONDITIONING"],
            distractorTrapType: "collocation_trap",
            distractorExplanationVi: "Hệ thống điều hòa không khí thương mại (air conditioning).",
            evidenceLocator: "02:15",
            evidenceQuote: "emissions from vehicle exhaust and commercial air conditioning...",
            paraphraseMapping: { questionKeyword: "heat contributor", targetKeyword: "commercial air conditioning" },
          },
          {
            id: "l_q34",
            questionNumber: 34,
            type: "completion",
            prompt: "Cool roofs are coated with reflective [ 34 ] dioxide",
            correctAnswer: "titanium",
            acceptableAnswers: ["Titanium", "TITANIUM"],
            distractorTrapType: "scientific_name_trap",
            distractorExplanationVi: "Mái nhà làm mát phủ lớp sơn titan dioxit (titanium dioxide).",
            evidenceLocator: "03:00",
            evidenceQuote: "cool roofs coated with reflective titanium dioxide...",
            paraphraseMapping: { questionKeyword: "coated with", targetKeyword: "coated with reflective titanium dioxide" },
          },
          {
            id: "l_q35",
            questionNumber: 35,
            type: "completion",
            prompt: "Biological cooling mechanism of trees: [ 35 ]",
            correctAnswer: "evapotranspiration",
            acceptableAnswers: ["Evapotranspiration", "EVAPOTRANSPIRATION"],
            distractorTrapType: "scientific_spelling_trap",
            distractorExplanationVi: "Quá trình thoát hơi nước của cây xanh (evapotranspiration).",
            evidenceLocator: "03:30",
            evidenceQuote: "which induce cooling through evapotranspiration.",
            paraphraseMapping: { questionKeyword: "cooling mechanism", targetKeyword: "cooling through evapotranspiration" },
          },
          {
            id: "l_q36",
            questionNumber: 36,
            type: "completion",
            prompt: "Wind corridor design: Streets aligned parallel to prevailing [ 37 ] currents",
            correctAnswer: "air",
            acceptableAnswers: ["wind", "Air", "AIR"],
            distractorTrapType: "collocation_trap",
            distractorExplanationVi: "Đại lộ thẳng hàng với các luồng không khí/gió chủ đạo.",
            evidenceLocator: "04:00",
            evidenceQuote: "aligned parallel to prevailing air currents to optimize ventilation.",
            paraphraseMapping: { questionKeyword: "prevailing", targetKeyword: "prevailing air currents" },
          },
          {
            id: "l_q37",
            questionNumber: 37,
            type: "completion",
            prompt: "Urban canyon geometry: Ratio between building height and street [ 37 ]",
            correctAnswer: "width",
            acceptableAnswers: ["Width", "WIDTH"],
            distractorTrapType: "dimension_trap",
            distractorExplanationVi: "Tỷ lệ giữa chiều cao tòa nhà và độ rộng lòng đường (street width).",
            evidenceLocator: "04:25",
            evidenceQuote: "determined by the geometric aspect ratio between building height and street width.",
            paraphraseMapping: { questionKeyword: "building height and", targetKeyword: "building height and street width" },
          },
          {
            id: "l_q38",
            questionNumber: 38,
            type: "completion",
            prompt: "Permeable pavements allow rainwater infiltration to recharge [ 38 ] reserves",
            correctAnswer: "groundwater",
            acceptableAnswers: ["ground water", "Groundwater", "GROUNDWATER"],
            distractorTrapType: "compound_noun_trap",
            distractorExplanationVi: "Thấm nước mưa để bổ sung nguồn nước ngầm (groundwater).",
            evidenceLocator: "04:45",
            evidenceQuote: "allowing subterranean rainwater percolation to recharge groundwater aquifers.",
            paraphraseMapping: { questionKeyword: "recharge", targetKeyword: "recharge groundwater aquifers" },
          },
          {
            id: "l_q39",
            questionNumber: 39,
            type: "completion",
            prompt: "Economic benefit: Reduces municipal expenditure on peak electricity [ 39 ]",
            correctAnswer: "demand",
            acceptableAnswers: ["Demand", "DEMAND", "grid"],
            distractorTrapType: "collocation_trap",
            distractorExplanationVi: "Giảm áp lực chi phí cho nhu cầu điện giờ cao điểm (peak electricity demand).",
            evidenceLocator: "05:05",
            evidenceQuote: "curtailing municipal expenditures during periods of peak electricity demand.",
            paraphraseMapping: { questionKeyword: "peak electricity", targetKeyword: "peak electricity demand" },
          },
          {
            id: "l_q40",
            questionNumber: 40,
            type: "completion",
            prompt: "Conclusion: Urban climate resilience requires holistic policy [ 40 ]",
            correctAnswer: "integration",
            acceptableAnswers: ["Integration", "INTEGRATION", "coordination"],
            distractorTrapType: "academic_conclusion_trap",
            distractorExplanationVi: "Cần sự tích hợp chính sách toàn diện (policy integration).",
            evidenceLocator: "05:25",
            evidenceQuote: "demanding holistic cross-sectoral policy integration across all municipal departments.",
            paraphraseMapping: { questionKeyword: "holistic policy", targetKeyword: "holistic policy integration" },
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 2. READING SECTION (40 Questions across 3 Passages)
  // =========================================================================
  reading: {
    timeLimitMinutes: 60,
    passages: [
      // Passage 1: Q1 - Q13 (History of Tea Cultivation)
      {
        passageNumber: 1,
        title: "Passage 1: The Global History & Agro-Economics of Camellia Sinensis",
        topicDomainVi: "Lịch sử nông nghiệp & Kinh tế học về cây Chè",
        wordCount: 820,
        paragraphs: [
          {
            letter: "A",
            text: "Legend attributes the discovery of tea to the Chinese Emperor Shennong in 2737 BCE, when windblown leaves from a Camellia sinensis tree drifted into his cauldron of boiling drinking water. Intrigued by the invigorating aroma and restorative flavor, the emperor cataloged the plant in his pharmacological treatise, initiating a millenary tradition of infusion that evolved from a medicinal elixir into an imperial social ritual.",
          },
          {
            letter: "B",
            text: "By the Tang Dynasty (618–907 CE), tea consumption had transcended aristocratic courts to become a ubiquitous commodity across all social strata. The scholar Lu Yu penned 'The Classic of Tea' (Cha Jing), establishing rigorous horticultural principles, roasting techniques, and water quality criteria. Monks transported tea seeds across the Yellow Sea to Japan, where the practice transformed into the spiritually disciplined Japanese tea ceremony (Chanoyu).",
          },
          {
            letter: "C",
            text: "In the seventeenth century, Dutch merchants introduced Chinese green and black tea to European mercantile ports. The British East India Company swiftly established a monopolistic maritime trade corridor, exchanging silver bullion and Indian opium for Fujianese tea leaves. To circumvent Chinese trade restrictions, British botanist Robert Fortune disguised himself in traditional Chinese attire to illicitly harvest viable tea saplings and recruit master tea processors from the Wuyi Mountains, covertly transplanting them into colonial plantations in Darjeeling and Assam.",
          },
        ],
        questions: [
          {
            id: "r_q1",
            questionNumber: 1,
            type: "tfng",
            prompt: "Emperor Shennong initially utilized tea primarily for its medicinal properties.",
            correctAnswer: "TRUE",
            distractorTrapType: "paraphrase_trap",
            distractorExplanationVi: "Bài đọc nêu rõ: 'evolved from a medicinal elixir into an imperial social ritual' ➔ TRUE.",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "evolved from a medicinal elixir into an imperial social ritual.",
            paraphraseMapping: { questionKeyword: "medicinal properties", targetKeyword: "medicinal elixir" },
          },
          {
            id: "r_q2",
            questionNumber: 2,
            type: "tfng",
            prompt: "During the Tang Dynasty, tea drinking was strictly restricted to members of the royal court.",
            correctAnswer: "FALSE",
            distractorTrapType: "contradiction_trap",
            distractorExplanationVi: "Bài đọc ghi 'transcended aristocratic courts to become a ubiquitous commodity across all social strata' ➔ FALSE.",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "transcended aristocratic courts to become a ubiquitous commodity across all social strata.",
            paraphraseMapping: { questionKeyword: "strictly restricted to royal court", targetKeyword: "ubiquitous commodity across all social strata" },
          },
          {
            id: "r_q3",
            questionNumber: 3,
            type: "tfng",
            prompt: "Lu Yu received financial sponsorship from the emperor to publish 'The Classic of Tea'.",
            correctAnswer: "NOT GIVEN",
            distractorTrapType: "outside_knowledge_trap",
            distractorExplanationVi: "Bài đọc chỉ nói Lu Yu viết sách nhưng không nhắc việc có nhận tài trợ tài chính từ vua hay không ➔ NOT GIVEN.",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "The scholar Lu Yu penned 'The Classic of Tea' (Cha Jing)...",
            paraphraseMapping: { questionKeyword: "financial sponsorship", targetKeyword: "Not mentioned" },
          },
          {
            id: "r_q4",
            questionNumber: 4,
            type: "tfng",
            prompt: "Robert Fortune openly negotiated with Chinese authorities to purchase tea saplings.",
            correctAnswer: "FALSE",
            distractorTrapType: "negation_trap",
            distractorExplanationVi: "Robert Fortune cải trang và thu thập trộm (illicitly harvest, covertly transplant) chứ không hề đàm phán công khai ➔ FALSE.",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "disguised himself in traditional Chinese attire to illicitly harvest viable tea saplings...",
            paraphraseMapping: { questionKeyword: "openly negotiated", targetKeyword: "illicitly harvest, covertly transplant" },
          },
          {
            id: "r_q5",
            questionNumber: 5,
            type: "completion",
            prompt: "Discovery legend: Tea leaves fell into Emperor Shennong's boiling [ 5 ].",
            correctAnswer: "water",
            acceptableAnswers: ["drinking water", "WATER"],
            distractorTrapType: "noun_trap",
            distractorExplanationVi: "Lá chè rơi vào vạc nước uống đang sôi (boiling drinking water).",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "drifted into his cauldron of boiling drinking water.",
            paraphraseMapping: { questionKeyword: "boiling", targetKeyword: "cauldron of boiling drinking water" },
          },
          {
            id: "r_q6",
            questionNumber: 6,
            type: "completion",
            prompt: "Lu Yu's manual defined essential guidelines for roasting and [ 6 ] quality.",
            correctAnswer: "water",
            acceptableAnswers: ["Water", "WATER"],
            distractorTrapType: "collocation_trap",
            distractorExplanationVi: "Quy chuẩn về chất lượng nước (water quality criteria).",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "roasting techniques, and water quality criteria.",
            paraphraseMapping: { questionKeyword: "roasting and", targetKeyword: "roasting techniques, and water quality" },
          },
          {
            id: "r_q7",
            questionNumber: 7,
            type: "completion",
            prompt: "Japanese spiritual adaptation: The formal ritual known as [ 7 ].",
            correctAnswer: "Chanoyu",
            acceptableAnswers: ["tea ceremony", "chanoyu", "CHANOYU"],
            distractorTrapType: "foreign_term_trap",
            distractorExplanationVi: "Nghi lễ trà đạo Nhật Bản là Chanoyu.",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "disciplined Japanese tea ceremony (Chanoyu).",
            paraphraseMapping: { questionKeyword: "ritual known as", targetKeyword: "Japanese tea ceremony (Chanoyu)" },
          },
          {
            id: "r_q8",
            questionNumber: 8,
            type: "completion",
            prompt: "Trade exchange: British traders paid for tea using Indian [ 8 ] and silver.",
            correctAnswer: "opium",
            acceptableAnswers: ["Opium", "OPIUM"],
            distractorTrapType: "noun_trap",
            distractorExplanationVi: "Trao đổi bằng bạc và thuốc phiện Ấn Độ (Indian opium).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "exchanging silver bullion and Indian opium for Fujianese tea leaves.",
            paraphraseMapping: { questionKeyword: "Indian", targetKeyword: "Indian opium" },
          },
          {
            id: "r_q9",
            questionNumber: 9,
            type: "completion",
            prompt: "Botanist disguise: Fortune wore traditional [ 9 ] clothing.",
            correctAnswer: "Chinese",
            acceptableAnswers: ["Chinese attire", "CHINESE"],
            distractorTrapType: "adjective_trap",
            distractorExplanationVi: "Mặc trang phục truyền thống Trung Hoa (traditional Chinese attire).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "disguised himself in traditional Chinese attire...",
            paraphraseMapping: { questionKeyword: "traditional", targetKeyword: "traditional Chinese attire" },
          },
          {
            id: "r_q10",
            questionNumber: 10,
            type: "completion",
            prompt: "Mountain origin: Seeds were smuggled from the [ 10 ] Mountains.",
            correctAnswer: "Wuyi",
            acceptableAnswers: ["wuyi", "WUYI"],
            distractorTrapType: "proper_noun_trap",
            distractorExplanationVi: "Thu thập từ dãy núi Vũ Di (Wuyi Mountains).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "master tea processors from the Wuyi Mountains...",
            paraphraseMapping: { questionKeyword: "Mountains", targetKeyword: "Wuyi Mountains" },
          },
          {
            id: "r_q11",
            questionNumber: 11,
            type: "completion",
            prompt: "Indian colonial plantation site 1: Darjeeling and [ 11 ].",
            correctAnswer: "Assam",
            acceptableAnswers: ["assam", "ASSAM"],
            distractorTrapType: "geographic_trap",
            distractorExplanationVi: "Đồn điền tại Darjeeling và Assam.",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "colonial plantations in Darjeeling and Assam.",
            paraphraseMapping: { questionKeyword: "Darjeeling and", targetKeyword: "Darjeeling and Assam" },
          },
          {
            id: "r_q12",
            questionNumber: 12,
            type: "completion",
            prompt: "Commercial monopoly: Controlled by the British East [ 12 ] Company.",
            correctAnswer: "India",
            acceptableAnswers: ["india", "INDIA"],
            distractorTrapType: "organization_trap",
            distractorExplanationVi: "Công ty Đông Ấn Anh (British East India Company).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "The British East India Company swiftly established...",
            paraphraseMapping: { questionKeyword: "East", targetKeyword: "East India Company" },
          },
          {
            id: "r_q13",
            questionNumber: 13,
            type: "completion",
            prompt: "European pioneers: First brought to Europe by [ 13 ] merchants.",
            correctAnswer: "Dutch",
            acceptableAnswers: ["dutch", "DUTCH"],
            distractorTrapType: "nationality_trap",
            distractorExplanationVi: "Thương nhân Hà Lan (Dutch merchants) đưa chè sang châu Âu đầu tiên.",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "Dutch merchants introduced Chinese green and black tea to European mercantile ports.",
            paraphraseMapping: { questionKeyword: "merchants", targetKeyword: "Dutch merchants" },
          },
        ],
      },

      // Passage 2: Q14 - Q26 (Bioluminescence in Deep-Sea Ecosystems)
      {
        passageNumber: 2,
        title: "Passage 2: The Biochemical Dynamics of Marine Bioluminescence",
        topicDomainVi: "Sinh học biển & Hóa sinh phát quang",
        wordCount: 890,
        paragraphs: [
          {
            letter: "A",
            text: "In the abyssal depths where sunlight cannot penetrate, more than seventy-five percent of pelagic organisms generate their own light through enzymatic bioluminescence. This biochemical marvel relies on the catalytic oxidation of a luciferin substrate by the luciferase enzyme in the presence of adenosine triphosphate (ATP) and dissolved oxygen, producing photon emissions with near-hundred-percent thermal efficiency.",
          },
          {
            letter: "B",
            text: "Marine species leverage luminescence for multifaceted ecological functions. Counter-illumination represents an ingenious camouflage adaptation: predators looking upward from the deep abyss see light emitted from photophores on a squid's ventral underbelly that precisely matches the intensity and spectral wavelength of downwelling sunlight, effectively erasing the organism's silhouette against surface illumination.",
          },
          {
            letter: "C",
            text: "Beyond concealment, bioluminescence functions as a dynamic weapon of deterrence and predation. The deep-sea anglerfish dangles an esca—a fleshy luminous lure inhabited by symbiotic bioluminescent bacteria—directly above its cavernous jaws to entice unsuspecting prey. Conversely, the burglar alarm hypothesis explains why certain dinoflagellates flash brilliantly when agitated by grazing zooplankton: the abrupt flash illuminates the grazier, exposing it to higher-trophic predators and indirectly shielding the microscopic algae.",
          },
        ],
        questions: [
          {
            id: "r_q14",
            questionNumber: 14,
            type: "multiple_choice",
            prompt: "What is the primary biochemical role of luciferase in the bioluminescent reaction?",
            options: [
              "A. It acts as the primary fuel source providing photon energy.",
              "B. It catalyzes the oxidation of the luciferin substrate.",
              "C. It absorbs excess thermal energy to prevent tissue damage.",
            ],
            correctAnswer: "B",
            distractorTrapType: "biochemical_role_trap",
            distractorExplanationVi: "Luciferase đóng vai trò là enzym xúc tác quá trình oxy hóa hợp chất luciferin.",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "catalytic oxidation of a luciferin substrate by the luciferase enzyme...",
            paraphraseMapping: { questionKeyword: "catalyzes the oxidation", targetKeyword: "catalytic oxidation of a luciferin substrate" },
          },
          {
            id: "r_q15",
            questionNumber: 15,
            type: "multiple_choice",
            prompt: "How does counter-illumination protect deep-sea cephalopods from predators?",
            options: [
              "A. By blinding the predator's sensitive retinal cells with brilliant strobes.",
              "B. By matching downward sunlight to erase the prey's shadow silhouette.",
              "C. By mimicking the toxic glow of venomous jellyfish species.",
            ],
            correctAnswer: "B",
            distractorTrapType: "mechanism_trap",
            distractorExplanationVi: "Cơ chế phát sáng đối nghịch khớp với ánh sáng từ trên chiếu xuống để xóa bóng kẻ săn mồi nhìn từ dưới lên.",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "matches the intensity and spectral wavelength of downwelling sunlight, effectively erasing the organism's silhouette...",
            paraphraseMapping: { questionKeyword: "erase silhouette", targetKeyword: "erasing the organism's silhouette" },
          },
          {
            id: "r_q16",
            questionNumber: 16,
            type: "headings",
            prompt: "Matching Heading for Paragraph A: [ 16 ]",
            options: [
              "i. The Molecular Mechanism of Cold Light Generation",
              "ii. Defensive Visual Strategies in the Epipelagic Zone",
              "iii. Symbiotic Bacterial Colonization in Anglerfish",
            ],
            correctAnswer: "i",
            distractorTrapType: "heading_scope_trap",
            distractorExplanationVi: "Đoạn A tập trung giải thích cơ chế phân tử của phản ứng sinh quang học (luciferin, luciferase, ATP).",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "biochemical marvel relies on the catalytic oxidation of a luciferin substrate...",
            paraphraseMapping: { questionKeyword: "Molecular Mechanism", targetKeyword: "biochemical marvel relies on catalytic oxidation" },
          },
          {
            id: "r_q17",
            questionNumber: 17,
            type: "headings",
            prompt: "Matching Heading for Paragraph B: [ 17 ]",
            options: [
              "i. The Molecular Mechanism of Cold Light Generation",
              "ii. Camouflage Adaptations and Silhouette Erasure",
              "iii. Symbiotic Bacterial Colonization in Anglerfish",
            ],
            correctAnswer: "ii",
            distractorTrapType: "heading_scope_trap",
            distractorExplanationVi: "Đoạn B giải thích kỹ thuật ngụy trang đối quang (counter-illumination camouflage).",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "Counter-illumination represents an ingenious camouflage adaptation...",
            paraphraseMapping: { questionKeyword: "Camouflage Adaptations", targetKeyword: "ingenious camouflage adaptation" },
          },
          {
            id: "r_q18",
            questionNumber: 18,
            type: "headings",
            prompt: "Matching Heading for Paragraph C: [ 18 ]",
            options: [
              "i. Predatory Traps and Tri-Trophic Alarm Signals",
              "ii. The Commercial Extraction of Luciferin",
              "iii. Depth-Dependent Wavelength Absorption",
            ],
            correctAnswer: "i",
            distractorTrapType: "heading_scope_trap",
            distractorExplanationVi: "Đoạn C nói về bẫy săn mồi của cá vây chân và cơ chế chuông báo trộm 3 bậc dinh dưỡng (burglar alarm hypothesis).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "weapon of deterrence and predation... burglar alarm hypothesis...",
            paraphraseMapping: { questionKeyword: "Predatory Traps and Alarm", targetKeyword: "predation... burglar alarm hypothesis" },
          },
          {
            id: "r_q19",
            questionNumber: 19,
            type: "completion",
            prompt: "Reaction substrate oxidized by enzyme: [ 19 ]",
            correctAnswer: "luciferin",
            acceptableAnswers: ["Luciferin", "LUCIFERIN"],
            distractorTrapType: "spelling_trap",
            distractorExplanationVi: "Cơ chất bị oxy hóa là luciferin.",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "catalytic oxidation of a luciferin substrate...",
            paraphraseMapping: { questionKeyword: "substrate", targetKeyword: "luciferin substrate" },
          },
          {
            id: "r_q20",
            questionNumber: 20,
            type: "completion",
            prompt: "Energy molecule required for light emission: [ 20 ]",
            correctAnswer: "ATP",
            acceptableAnswers: ["adenosine triphosphate", "atp"],
            distractorTrapType: "acronym_trap",
            distractorExplanationVi: "Phân tử năng lượng ATP (adenosine triphosphate).",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "in the presence of adenosine triphosphate (ATP)...",
            paraphraseMapping: { questionKeyword: "Energy molecule", targetKeyword: "adenosine triphosphate (ATP)" },
          },
          {
            id: "r_q21",
            questionNumber: 21,
            type: "completion",
            prompt: "Specialized ventral light organs: [ 21 ]",
            correctAnswer: "photophores",
            acceptableAnswers: ["Photophores", "PHOTOPHORES"],
            distractorTrapType: "anatomical_term_trap",
            distractorExplanationVi: "Cơ quan phát sáng dưới bụng gọi là photophores.",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "light emitted from photophores on a squid's ventral underbelly...",
            paraphraseMapping: { questionKeyword: "light organs", targetKeyword: "photophores on ventral underbelly" },
          },
          {
            id: "r_q22",
            questionNumber: 22,
            type: "completion",
            prompt: "Anglerfish luminous appendage name: [ 22 ]",
            correctAnswer: "esca",
            acceptableAnswers: ["Esca", "ESCA", "an esca"],
            distractorTrapType: "biological_term_trap",
            distractorExplanationVi: "Phần mồi nhử phát sáng của cá vây chân gọi là esca.",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "anglerfish dangles an esca—a fleshy luminous lure...",
            paraphraseMapping: { questionKeyword: "luminous appendage", targetKeyword: "an esca—a fleshy luminous lure" },
          },
          {
            id: "r_q23",
            questionNumber: 23,
            type: "completion",
            prompt: "Esca light source: Symbiotic [ 23 ] colonies",
            correctAnswer: "bacteria",
            acceptableAnswers: ["bioluminescent bacteria", "Bacteria", "BACTERIA"],
            distractorTrapType: "organism_trap",
            distractorExplanationVi: "Ánh sáng do vi khuẩn cộng sinh (symbiotic bioluminescent bacteria) tạo ra.",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "inhabited by symbiotic bioluminescent bacteria...",
            paraphraseMapping: { questionKeyword: "Symbiotic", targetKeyword: "symbiotic bioluminescent bacteria" },
          },
          {
            id: "r_q24",
            questionNumber: 24,
            type: "completion",
            prompt: "Defensive hypothesis name: Burglar [ 24 ] hypothesis",
            correctAnswer: "alarm",
            acceptableAnswers: ["Alarm", "ALARM"],
            distractorTrapType: "theory_name_trap",
            distractorExplanationVi: "Giả thuyết chuông báo trộm (burglar alarm hypothesis).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "Conversely, the burglar alarm hypothesis explains why...",
            paraphraseMapping: { questionKeyword: "hypothesis name", targetKeyword: "burglar alarm hypothesis" },
          },
          {
            id: "r_q25",
            questionNumber: 25,
            type: "completion",
            prompt: "Organism flashing when grazed: Single-celled [ 25 ]",
            correctAnswer: "dinoflagellates",
            acceptableAnswers: ["Dinoflagellates", "DINOFLAGELLATES", "algae"],
            distractorTrapType: "organism_spelling_trap",
            distractorExplanationVi: "Sinh vật phát sáng cảnh báo khi bị ăn là dinoflagellates (tảo giáp).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "certain dinoflagellates flash brilliantly when agitated by grazing zooplankton...",
            paraphraseMapping: { questionKeyword: "flashing when grazed", targetKeyword: "dinoflagellates flash brilliantly" },
          },
          {
            id: "r_q26",
            questionNumber: 26,
            type: "completion",
            prompt: "Thermal trait: Produces light with near-100% thermal [ 26 ]",
            correctAnswer: "efficiency",
            acceptableAnswers: ["Efficiency", "EFFICIENCY"],
            distractorTrapType: "collocation_trap",
            distractorExplanationVi: "Hiệu suất nhiệt gần như 100% (thermal efficiency).",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "producing photon emissions with near-hundred-percent thermal efficiency.",
            paraphraseMapping: { questionKeyword: "thermal", targetKeyword: "near-hundred-percent thermal efficiency" },
          },
        ],
      },

      // Passage 3: Q27 - Q40 (Philosophy of Cognitive Computing & Machine Consciousness)
      {
        passageNumber: 3,
        title: "Passage 3: Functionalism, Intentionality, and the Architecture of Artificial Cognition",
        topicDomainVi: "Triết học nhận thức luận, Trí tuệ nhân tạo & Nghịch lý Căn phòng Trung Hoa",
        wordCount: 960,
        paragraphs: [
          {
            letter: "A",
            text: "Since Alan Turing formulated his eponymous behavioral test in 1950, artificial intelligence research has been dominated by functionalism—the epistemological premise that mental states are defined exclusively by their causal roles and behavioral outputs rather than their physical substrate. Proponents argue that if an artificial neural network demonstrates computational parity with human dialogue, we are philosophically obliged to attribute genuine cognitive comprehension to the system.",
          },
          {
            letter: "B",
            text: "However, in 1980, philosopher John Searle published his celebrated Chinese Room thought experiment to expose the fatal flaw of functionalism. Searle imagined an English speaker locked in an enclosed chamber, provided with a comprehensive rulebook that correlates incoming sequences of Chinese ideograms with appropriate response symbols. To external observers slipping questions under the door, the room outputs flawless Mandarin prose; yet the human inside understands not a single syllable of Chinese. Searle concluded that syntactic manipulation can never yield semantic intentionality.",
          },
          {
            letter: "C",
            text: "Defenders of machine consciousness countered with the 'Systems Reply', asserting that while the isolated human inside lacks understanding, the holistic system—encompassing the rulebook, storage bins, and communicative architecture—does indeed comprehend Chinese. Searle dismissed this rebuttal as a category error: even if the person memorizes every lookup table and internalizes the entire apparatus, they remain entirely devoid of genuine semantic awareness. Contemporary generative language models operate on identical syntactic optimization, cautioning against premature assertions of machine sentience.",
          },
        ],
        questions: [
          {
            id: "r_q27",
            questionNumber: 27,
            type: "yes_no_not_given",
            prompt: "Functionalism maintains that biological brains are irreplaceable for genuine thought.",
            correctAnswer: "NO",
            distractorTrapType: "contradiction_trap",
            distractorExplanationVi: "Thuyết chức năng (Functionalism) khẳng định trạng thái tâm trí được định nghĩa bởi vai trò nhân quả chứ KHÔNG phụ thuộc vào chất nền vật lý não bộ (rather than their physical substrate) ➔ NO.",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "mental states are defined exclusively by their causal roles... rather than their physical substrate.",
            paraphraseMapping: { questionKeyword: "biological brains are irreplaceable", targetKeyword: "rather than physical substrate" },
          },
          {
            id: "r_q28",
            questionNumber: 28,
            type: "yes_no_not_given",
            prompt: "The Chinese Room experiment proves that accurate symbol matching generates true understanding.",
            correctAnswer: "NO",
            distractorTrapType: "negation_trap",
            distractorExplanationVi: "Thí nghiệm Căn phòng Trung Hoa chứng minh thao tác ký hiệu (syntax) KHÔNG BAO GIỜ tạo ra thấu hiểu ngữ nghĩa (never yield semantic intentionality) ➔ NO.",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "syntactic manipulation can never yield semantic intentionality.",
            paraphraseMapping: { questionKeyword: "generates true understanding", targetKeyword: "can never yield semantic intentionality" },
          },
          {
            id: "r_q29",
            questionNumber: 29,
            type: "yes_no_not_given",
            prompt: "John Searle accepted the Systems Reply as a valid refutation of his argument.",
            correctAnswer: "NO",
            distractorTrapType: "attribution_trap",
            distractorExplanationVi: "Searle bác bỏ phản biện của Lời giải hệ thống (dismissed this rebuttal as a category error) ➔ NO.",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "Searle dismissed this rebuttal as a category error...",
            paraphraseMapping: { questionKeyword: "accepted the Systems Reply", targetKeyword: "dismissed this rebuttal as a category error" },
          },
          {
            id: "r_q30",
            questionNumber: 30,
            type: "yes_no_not_given",
            prompt: "Leading tech corporations currently fund research into biological naturalism.",
            correctAnswer: "NOT GIVEN",
            distractorTrapType: "outside_data_trap",
            distractorExplanationVi: "Bài đọc không đề cập đến việc các tập đoàn công nghệ có tài trợ cho thuyết tự nhiên sinh học hay không ➔ NOT GIVEN.",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "Contemporary generative language models operate on identical syntactic optimization...",
            paraphraseMapping: { questionKeyword: "fund research", targetKeyword: "Not mentioned" },
          },
          {
            id: "r_q31",
            questionNumber: 31,
            type: "yes_no_not_given",
            prompt: "The author expresses skepticism toward claiming modern language models possess real sentience.",
            correctAnswer: "YES",
            distractorTrapType: "author_stance_trap",
            distractorExplanationVi: "Tác giả cảnh báo việc vội vàng tuyên bố máy móc có tri giác (cautioning against premature assertions of machine sentience) ➔ YES.",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "cautioning against premature assertions of machine sentience.",
            paraphraseMapping: { questionKeyword: "skepticism toward claiming machine sentience", targetKeyword: "cautioning against premature assertions of machine sentience" },
          },
          {
            id: "r_q32",
            questionNumber: 32,
            type: "summary_box",
            prompt: "Turing's test assumed that mental comprehension could be measured purely through (32) [_____] outputs.",
            boxOptions: [
              { code: "A", text: "behavioral" },
              { code: "B", text: "biological" },
              { code: "C", text: "subjective" },
              { code: "D", text: "epistemological" },
            ],
            correctAnswer: "A",
            distractorTrapType: "paraphrase_trap",
            distractorExplanationVi: "Turing và phái hành vi luận giả định nhận thức đo bằng đầu ra hành vi (behavioral outputs).",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "mental states are defined exclusively by their causal roles and behavioral outputs...",
            paraphraseMapping: { questionKeyword: "outputs", targetKeyword: "behavioral outputs" },
          },
          {
            id: "r_q33",
            questionNumber: 33,
            type: "summary_box",
            prompt: "Searle's thought experiment demonstrated that formal (33) [_____] processing does not produce meaning.",
            boxOptions: [
              { code: "A", text: "syntactic" },
              { code: "B", text: "biological" },
              { code: "C", text: "philosophical" },
              { code: "D", text: "neurological" },
            ],
            correctAnswer: "A",
            distractorTrapType: "jargon_trap",
            distractorExplanationVi: "Xử lý cú pháp thuần túy (syntactic manipulation) không tạo ra ngữ nghĩa.",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "syntactic manipulation can never yield semantic intentionality.",
            paraphraseMapping: { questionKeyword: "processing", targetKeyword: "syntactic manipulation" },
          },
          {
            id: "r_q34",
            questionNumber: 34,
            type: "summary_box",
            prompt: "The operator in the room simply executes algorithmic (34) [_____] using lookup books.",
            boxOptions: [
              { code: "A", text: "manipulations" },
              { code: "B", text: "intuitions" },
              { code: "C", text: "translations" },
              { code: "D", text: "perceptions" },
            ],
            correctAnswer: "A",
            distractorTrapType: "collocation_trap",
            distractorExplanationVi: "Người bên trong chỉ thực hiện thao tác ký hiệu (syntactic manipulation / algorithmic lookups).",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "syntactic manipulation can never yield semantic intentionality.",
            paraphraseMapping: { questionKeyword: "algorithmic", targetKeyword: "syntactic manipulation" },
          },
          {
            id: "r_q35",
            questionNumber: 35,
            type: "summary_box",
            prompt: "The Systems Reply was rejected by Searle as an ontological (35) [_____] error.",
            boxOptions: [
              { code: "A", text: "category" },
              { code: "B", text: "arithmetic" },
              { code: "C", text: "linguistic" },
              { code: "D", text: "biological" },
            ],
            correctAnswer: "A",
            distractorTrapType: "philosophy_term_trap",
            distractorExplanationVi: "Searle bác bỏ phản biện hệ thống là lỗi ngụy biện đánh tráo phạm trù (category error).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "Searle dismissed this rebuttal as a category error...",
            paraphraseMapping: { questionKeyword: "error", targetKeyword: "category error" },
          },
          {
            id: "r_q36",
            questionNumber: 36,
            type: "completion",
            prompt: "Turing published his behavioral test in the year [ 36 ].",
            correctAnswer: "1950",
            acceptableAnswers: ["1950"],
            distractorTrapType: "date_trap",
            distractorExplanationVi: "Alan Turing công bố phép thử vào năm 1950.",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "Since Alan Turing formulated his eponymous behavioral test in 1950...",
            paraphraseMapping: { questionKeyword: "year", targetKeyword: "in 1950" },
          },
          {
            id: "r_q37",
            questionNumber: 37,
            type: "completion",
            prompt: "Functionalism defines mental states by their [ 37 ] roles and outputs.",
            correctAnswer: "causal",
            acceptableAnswers: ["Causal", "CAUSAL"],
            distractorTrapType: "adjective_trap",
            distractorExplanationVi: "Định nghĩa bởi vai trò nhân quả (causal roles).",
            evidenceLocator: "Đoạn A",
            evidenceQuote: "defined exclusively by their causal roles and behavioral outputs...",
            paraphraseMapping: { questionKeyword: "roles and outputs", targetKeyword: "causal roles" },
          },
          {
            id: "r_q38",
            questionNumber: 38,
            type: "completion",
            prompt: "Searle's thought experiment was published in the year [ 38 ].",
            correctAnswer: "1980",
            acceptableAnswers: ["1980"],
            distractorTrapType: "date_trap",
            distractorExplanationVi: "John Searle công bố thí nghiệm vào năm 1980.",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "However, in 1980, philosopher John Searle published...",
            paraphraseMapping: { questionKeyword: "published in", targetKeyword: "in 1980" },
          },
          {
            id: "r_q39",
            questionNumber: 39,
            type: "completion",
            prompt: "Symbol matching in the room yields syntax but lacks semantic [ 39 ].",
            correctAnswer: "intentionality",
            acceptableAnswers: ["Intentionality", "INTENTIONALITY", "meaning", "awareness"],
            distractorTrapType: "philosophical_noun_trap",
            distractorExplanationVi: "Thao tác ký hiệu không bao giờ tạo ra tính hướng đích ngữ nghĩa (semantic intentionality).",
            evidenceLocator: "Đoạn B",
            evidenceQuote: "syntactic manipulation can never yield semantic intentionality.",
            paraphraseMapping: { questionKeyword: "semantic", targetKeyword: "semantic intentionality" },
          },
          {
            id: "r_q40",
            questionNumber: 40,
            type: "completion",
            prompt: "Rebuttal claiming the entire room understands: The [ 40 ] Reply.",
            correctAnswer: "Systems",
            acceptableAnswers: ["systems", "SYSTEMS", "System", "system"],
            distractorTrapType: "rebuttal_name_trap",
            distractorExplanationVi: "Lời giải phản biện hệ thống (Systems Reply).",
            evidenceLocator: "Đoạn C",
            evidenceQuote: "Defenders of machine consciousness countered with the 'Systems Reply'...",
            paraphraseMapping: { questionKeyword: "Rebuttal claiming", targetKeyword: "Systems Reply" },
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 3. WRITING SECTION (Task 1 & Task 2)
  // =========================================================================
  writing: {
    timeLimitMinutes: 60,
    task1: {
      title: "Writing Task 1: Comparative Energy Consumption by Source (1995 - 2025)",
      prompt:
        "The bar chart and table illustrate global energy consumption across four primary fuel sources (Fossil Fuels, Nuclear, Hydroelectric, and Solar/Wind Renewables) between 1995 and 2025 (with projections for 2025). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chartDescriptionEn:
        "Bar chart showing Fossil Fuels (8,500 Mtoe in 1995 -> 10,200 in 2025), Nuclear (600 Mtoe -> 750 Mtoe), Hydroelectric (500 Mtoe -> 900 Mtoe), Solar/Wind (50 Mtoe -> 1,800 Mtoe).",
      keyFeaturesVi: [
        "Fossil fuels duy trì vị thế áp đảo tuyệt đối trong suốt 30 năm.",
        "Năng lượng tái tạo (Solar/Wind) chứng kiến mức tăng trưởng đột biến nhất (gấp 36 lần từ 50 lên 1,800 Mtoe).",
        "Hydroelectric và Nuclear tăng trưởng đều đặn ở mức vừa phải.",
      ],
      modelAnswerBand85:
        "The bar chart and table delineate global energy consumption across four distinct fuel categories between 1995 and 2025, including projections for the final year.\n\nOverall, fossil fuels remained the overwhelmingly dominant source of energy throughout the entire 30-year period despite experiencing slower relative growth. Conversely, renewable energy derived from solar and wind power exhibited an explosive exponential surge, establishing itself as the fastest-expanding energy sector.\n\nIn 1995, fossil fuels accounted for the lion's share of global consumption at approximately 8,500 million tonnes of oil equivalent (Mtoe). This figure followed a continuous upward trajectory, projected to reach 10,200 Mtoe by 2025. In stark contrast, solar and wind energy registered a negligible 50 Mtoe in 1995, before witnessing a dramatic thirty-six-fold increase to reach a projected 1,800 Mtoe by the end of the period.\n\nRegarding the remaining two sources, hydroelectric power expanded steadily from 500 Mtoe to 900 Mtoe over the three decades. Nuclear energy mirrored a similar moderate upward trend, rising gradually from 600 Mtoe in 1995 to plateau at approximately 750 Mtoe by 2025.",
    },
    task2: {
      title: "Writing Task 2: Artificial Intelligence Integration in Higher Education",
      prompt:
        "Some educators argue that generative artificial intelligence tools (such as ChatGPT) should be completely prohibited in academic coursework to preserve critical thinking, while others contend that universities should actively integrate AI into their curricula. Discuss both views and give your own opinion.",
      essayTypeVi: "Discussion Essay with Personal Stance (Thảo luận 2 quan điểm & Luận điểm cá nhân)",
      toulminBreakdownVi: [
        "View 1 (Ban AI): Claim (Nguy cơ thui chột tư duy phản biện) -> Data (Sinh viên lười tra cứu) -> Warrant (Học thuật cần tự lực).",
        "View 2 (Integrate AI): Claim (Chuẩn bị kỹ năng thực tế) -> Data (Thị trường lao động 4.0 cần AI literacy) -> Warrant (Công cụ trợ lực nhận thức).",
        "Author Stance (Nuanced Integration): Ủng hộ tích hợp có kiểm soát kèm quy tắc trích dẫn liêm chính học thuật (Ethical AI Governance).",
      ],
      modelAnswerBand85:
        "The rapid proliferation of generative artificial intelligence has ignited a contentious pedagogical debate regarding its place in higher education. While some educators advocate for a blanket prohibition of AI tools to safeguard cognitive autonomy, others argue that academic institutions must proactively integrate these technologies into their curricula. This essay examines both perspectives before arguing that regulated pedagogical integration, coupled with ethical literacy, represents the most progressive approach.\n\nProponents of banning generative AI contend that unconstrained access fundamentally undermines intellectual rigor and critical thinking skills. When students rely on algorithmic models to draft analytical essays or synthesize complex literature, they bypass the essential cognitive struggles of problem formulation, logical deduction, and syntactic composition. Over time, excessive reliance on automated outputs could lead to cognitive atrophy and compromise academic integrity, producing graduates who lack genuine epistemic mastery.\n\nConversely, advocates of AI integration assert that generative models are indispensable cognitive scaffolds that mirror real-world professional environments. Modern industries increasingly demand AI literacy—the ability to formulate precise prompt architectures, critically audit machine-generated assertions for hallucinations, and iterate upon synthetic drafts. By incorporating AI into classroom exercises, universities can shift their evaluative focus from low-level memorization toward higher-order analytical critique, challenging students to deconstruct and refine algorithmic proposals.\n\nIn conclusion, while concerns regarding academic dishonesty and cognitive complacency are undeniably legitimate, outright prohibition remains a futile and regressive measure. Universities should instead embrace structured integration, establishing transparent ethical frameworks and redesigning assessments to prioritize authentic inquiry, creative synthesis, and critical verification.",
    },
  },

  // =========================================================================
  // 4. SPEAKING SECTION (Part 1, Part 2, Part 3)
  // =========================================================================
  speaking: {
    timeLimitMinutes: 14,
    part1: [
      {
        id: "sp_p1_1",
        topic: "Technology Habits",
        question: "How frequently do you use digital devices for your daily studies or work?",
        sampleAnswerBand85:
          "On a daily basis, I am practically tethered to my laptop and tablet. I utilize cloud-based productivity suites for collaborative projects and specialized software for data visualization, which drastically streamlines my analytical workflow.",
        keyCollocations: ["practically tethered to", "cloud-based suites", "streamlines my analytical workflow"],
      },
      {
        id: "sp_p1_2",
        topic: "Hometown Changes",
        question: "Has your hometown experienced substantial infrastructural modernization in recent years?",
        sampleAnswerBand85:
          "Unquestionably. Over the past decade, my city has witnessed radical urban renewal. Former derelict industrial zones have been repurposed into vibrant commercial hubs, while an extensive rapid transit network has considerably alleviated traffic congestion.",
        keyCollocations: ["witnessed radical urban renewal", "repurposed into commercial hubs", "alleviated traffic congestion"],
      },
    ],
    part2: {
      cueCardTopic: "Describe a challenging problem you solved using modern technology",
      bulletPoints: [
        "What the problem was and when it occurred",
        "What technological tool or software you utilized",
        "How you approached solving the issue",
        "And explain why modern technology was essential to resolving it successfully",
      ],
      sampleAnswerBand85:
        "I would like to recount an experience from my penultimate year at university when my research team faced a daunting computational bottleneck during our environmental statistics dissertation. We were tasked with analyzing a massive longitudinal dataset comprising over ten thousand air quality sensor logs across metropolitan Hanoi. Attempting to parse and cross-reference these multi-dimensional records manually or via rudimentary spreadsheets was proving catastrophically inefficient.\n\nTo circumvent this gridlock, I took the initiative to deploy Python alongside an open-source data analytics library called Pandas. I engineered an automated parsing script that systematically cleaned corrupted telemetry records, interpolated missing data points through linear regression, and aggregated the findings into coherent heatmaps. Technology was utterly indispensable here, as it condensed what would have been months of error-prone manual labor into a few seconds of algorithmic execution.",
      strategyTipsVi: [
        "Mở bài trực diện vào trọng tâm với cụm từ C1: 'I would like to recount an experience...'",
        "Xây dựng cấu trúc PEEL tự nhiên: Bối cảnh nghẽn (Context) ➔ Công cụ công nghệ (Action) ➔ Kết quả ngoạn mục (Result).",
      ],
    },
    part3: [
      {
        id: "sp_p3_1",
        question: "To what extent do you believe artificial intelligence might displace cognitive professions in the near future?",
        sampleAnswerBand85:
          "It is plausible to hypothesize that routine cognitive tasks, such as rudimentary financial auditing or standard legal document review, will inevitably undergo automated displacement. Nevertheless, professions demanding nuanced empathetic negotiation, deep ethical discernment, and divergent creative vision are likely to remain firmly within the human domain.",
        hedgingStructures: [
          "It is plausible to hypothesize that...",
          "will inevitably undergo automated displacement...",
          "Nevertheless, professions demanding nuanced discernment are likely to remain...",
        ],
      },
    ],
  },

  // =========================================================================
  // 5. HARVESTABLE VOCABULARY MATRIX (AWL & C1 Academic)
  // =========================================================================
  harvestableVocab: [
    {
      id: "hv_1",
      word: "functionalism",
      ipa: "/ˈfʌŋk.ʃən.əl.ɪ.zəm/",
      meaningVi: "Thuyết chức năng (Tâm trí được định nghĩa bởi vai trò nhân quả)",
      exampleSentence: "AI research has long been dominated by the premise of functionalism.",
      sourceSkill: "reading",
    },
    {
      id: "hv_2",
      word: "intentionality",
      ipa: "/ɪnˌten.ʃəˈnæl.ə.ti/",
      meaningVi: "Tính hướng đích / Ý niệm nội tại về ý nghĩa",
      exampleSentence: "Syntactic manipulation can never yield genuine semantic intentionality.",
      sourceSkill: "reading",
    },
    {
      id: "hv_3",
      word: "bioluminescence",
      ipa: "/ˌbaɪ.oʊˌluː.mɪˈnes.əns/",
      meaningVi: "Hiện tượng phát quang sinh học",
      exampleSentence: "Deep-sea organisms generate photon emissions through enzymatic bioluminescence.",
      sourceSkill: "reading",
    },
    {
      id: "hv_4",
      word: "counter-illumination",
      ipa: "/ˌkaʊn.tər.ɪˌluː.mɪˈneɪ.ʃən/",
      meaningVi: "Ngụy trang đối quang (Xóa bóng kẻ săn mồi nhìn từ dưới lên)",
      exampleSentence: "Counter-illumination effectively erases the organism's silhouette.",
      sourceSkill: "reading",
    },
    {
      id: "hv_5",
      word: "evapotranspiration",
      ipa: "/ɪˌvæp.oʊˌtræn.spəˈreɪ.ʃən/",
      meaningVi: "Hiện tượng thoát hơi nước của cây xanh làm mát khí hậu",
      exampleSentence: "Urban tree canopies induce microclimatic cooling via evapotranspiration.",
      sourceSkill: "listening",
    },
    {
      id: "hv_6",
      word: "anthropogenic",
      ipa: "/ˌæn.θrə.pəˈdʒen.ɪk/",
      meaningVi: "Do con người gây ra (Nhân sinh)",
      exampleSentence: "Anthropogenic heat emissions from vehicle exhaust exacerbate thermal islands.",
      sourceSkill: "listening",
    },
  ],
};
