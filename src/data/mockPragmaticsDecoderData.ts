/**
 * Mock Data for Academic Pragmatics, Implicit Stance & Skepticism Decoder Studio (Step 80)
 * 15 Authentic Cambridge Passage 3 & Listening Section 3/4 Implicit Stance Scenarios
 */

import { PragmaticTrapType } from "@/lib/pragmaticsSubtextEngine";

export interface PragmaticExcerptItem {
  id: string;
  sourceType: "reading_passage3" | "listening_section3_4";
  discipline: string;
  title: string;
  difficulty: "Band 7.5" | "Band 8.0" | "Band 8.5+";
  excerpt: string;
  audioSimulatedUrl?: string;
  speakerIntonationNote?: string;
  ironicMarker: string;
  trapType: PragmaticTrapType;
  toneClassification: string;
  literalMeaning: string;
  intendedPragmaticImplicature: string;
  cambridgeExamTrapAnalysis: string;
  drillQuestion: {
    questionText: string;
    options: string[];
    correctIndex: number;
    literalTrapIndex: number;
    explanation: string;
  };
}

export const MOCK_PRAGMATICS_EXCERPTS: PragmaticExcerptItem[] = [
  {
    id: "prag_01_archaeology_faint_praise",
    sourceType: "reading_passage3",
    discipline: "Archaeology & Anthropological Epistemology",
    title: "The Solutrean Hypothesis & Transatlantic Migration",
    difficulty: "Band 8.5+",
    excerpt: "While Professor Vance’s hypothesis regarding pre-Clovis transatlantic seafaring is undeniably audacious and displays commendable narrative flair, rigorous empirical corroboration remains conspicuous by its absence in the stratigraphical record.",
    ironicMarker: "undeniably audacious... empirical corroboration remains conspicuous by its absence",
    trapType: "praise_faint_damning",
    toneClassification: "Faint Praise Damning (Khen Đãi Bôi Để Hạ Bệ)",
    literalMeaning: "Nghiên cứu của Giáo sư Vance rất táo bạo và có lối hành văn đáng khen ngợi.",
    intendedPragmaticImplicature: "Tác giả thực chất coi giả thuyết này là chuyện viễn tưởng thuần túy, hoàn toàn thiếu chứng cứ địa chất học xác thực và không đáng tin cậy.",
    cambridgeExamTrapAnalysis: "Thí sinh Band 6.5 nhìn thấy 'audacious' và 'commendable' sẽ chọn nhầm đáp án 'The author praises Vance's creative contribution'.",
    drillQuestion: {
      questionText: "What is the author's primary attitude toward Professor Vance's seafaring hypothesis?",
      options: [
        "Admiration for its innovative methodological rigor.",
        "Deep skepticism regarding its lack of substantiated archaeological evidence.",
        "Neutral acknowledgment of its historical plausibility.",
        "Enthusiasm for its potential to overturn conventional migration models."
      ],
      correctIndex: 1,
      literalTrapIndex: 0,
      explanation: "Cụm 'conspicuous by its absence' (vắng bóng một cách lộ liễu) là dấu hiệu mỉa mai phủ định hoàn toàn lời khen 'audacious' trước đó."
    }
  },
  {
    id: "prag_02_neuroscience_scare_quotes",
    sourceType: "reading_passage3",
    discipline: "Cognitive Neuroscience & AI",
    title: "Quantum Consciousness & Penrose Microtubules",
    difficulty: "Band 8.0",
    excerpt: "The laboratory boasts of having achieved a 'revolutionary breakthrough' in quantum neurobiology; yet, when independent peer reviewers attempted to replicate the frequency oscillations, the results dissolved into statistical noise.",
    ironicMarker: "'revolutionary breakthrough'",
    trapType: "rhetorical_skepticism",
    toneClassification: "Rhetorical Skepticism & Scare Quotes (Ngoặc Kép Mỉa Mai)",
    literalMeaning: "Phòng thí nghiệm đạt được một bước đột phá mang tính cách mạng.",
    intendedPragmaticImplicature: "Tác giả dùng dấu ngoặc kép để mỉa mai tuyên bố tự mãn phóng đại của phòng thí nghiệm, vạch trần rằng kết quả không thể tái lập và chỉ là sai số ngẫu nhiên.",
    cambridgeExamTrapAnalysis: "Dấu ngoặc kép (Scare quotes) trong bài đọc học thuật IELTS luôn báo hiệu tác giả đang gián tiếp nghi ngờ hoặc từ chối công nhận thuật ngữ đó.",
    drillQuestion: {
      questionText: "Why does the author place the phrase 'revolutionary breakthrough' in quotation marks?",
      options: [
        "To quote directly an established scientific consensus.",
        "To indicate that the laboratory's claim is exaggerated and unverified.",
        "To emphasize the prestigious nature of the research grant.",
        "To define a technical terminology specific to quantum physics."
      ],
      correctIndex: 1,
      literalTrapIndex: 0,
      explanation: "Dấu ngoặc kép nhằm chỉ ra tính chất tự xưng, thiếu kiểm chứng của phòng thí nghiệm, đối lập với việc 'kết quả tan biến thành nhiễu thống kê'."
    }
  },
  {
    id: "prag_03_economics_litotes",
    sourceType: "reading_passage3",
    discipline: "Behavioral Macroeconomics",
    title: "Fiscal Austerity & Post-Crisis Equilibrium",
    difficulty: "Band 8.5+",
    excerpt: "The proposal to unilaterally eliminate sovereign debt obligations while simultaneously maintaining currency pegging is not entirely unfeasible, though history suggests that central banks undertaking such ventures have scarcely emerged unscathed.",
    ironicMarker: "not entirely unfeasible... scarcely emerged unscathed",
    trapType: "litotes_double_negative",
    toneClassification: "Litotes / Double Negative Understatement (Phủ Định Kép Giảm Nhẹ)",
    literalMeaning: "Đề xuất này không hẳn là hoàn toàn không khả thi.",
    intendedPragmaticImplicature: "Tác giả ngầm khẳng định chính sách này cực kỳ nguy hiểm, gần như chắc chắn sẽ dẫn tới khủng hoảng tài chính trầm trọng cho các ngân hàng trung ương.",
    cambridgeExamTrapAnalysis: "'Not entirely unfeasible' là phép nói giảm (litotes). Nghĩa thực chất là 'về mặt lý thuyết thì có thể tưởng tượng ra nhưng trên thực tế là thảm họa'.",
    drillQuestion: {
      questionText: "What does the author suggest about the sovereign debt proposal?",
      options: [
        "It represents a practical and proven path toward debt stabilization.",
        "It is theoretically conceivable but practically fraught with catastrophic risks.",
        "It is totally impossible and has never been attempted in monetary history.",
        "It is strongly recommended for developing economies with fixed exchange rates."
      ],
      correctIndex: 1,
      literalTrapIndex: 0,
      explanation: "Phủ định kép 'not entirely unfeasible' kết hợp với 'scarcely emerged unscathed' diễn đạt sự rủi ro cực độ dưới lớp vỏ học thuật điềm đạm."
    }
  },
  {
    id: "prag_04_listening_intonation_reluctant",
    sourceType: "listening_section3_4",
    discipline: "Environmental Sociology (Seminar Dialogue)",
    title: "Corporate Carbon Offsetting Protocols",
    difficulty: "Band 8.0",
    speakerIntonationNote: "Speaker hạ giọng dài ở đuôi câu, thở dài nhẹ và kéo dài âm tiết 'perspective' với ngữ điệu ngập ngừng.",
    excerpt: "Student A: 'So planting monoculture pine plantations in South America fully offsets airline emissions?'\nProfessor: 'Well... that is certainly one perspective that the aviation marketing department would be delighted for us to embrace.'",
    ironicMarker: "certainly one perspective... marketing department would be delighted",
    trapType: "rhetorical_skepticism",
    toneClassification: "Sarcastic / Dismissive Intonation (Mỉa Mai Qua Ngữ Điệu & Từ Chỉ Thái Độ)",
    literalMeaning: "Đó chắc chắn là một góc nhìn mà phòng tiếp thị rất vui nếu chúng ta chấp nhận.",
    intendedPragmaticImplicature: "Giáo sư ngầm bác bỏ hoàn toàn tính xác thực của tuyên bố này, vạch trần nó là chiêu bài tẩy xanh (greenwashing) mang tính quảng cáo giả tạo.",
    cambridgeExamTrapAnalysis: "Trong Listening Section 3, cụm từ 'that is one perspective' kèm ngữ điệu hạ thấp là dấu hiệu bác bỏ 100%.",
    drillQuestion: {
      questionText: "What does the professor imply about the carbon offset program?",
      options: [
        "He believes it is a scientifically validated ecological countermeasure.",
        "He views it as a corporate public relations deception rather than genuine mitigation.",
        "He enthusiastically endorses the airline's reforestation initiative.",
        "He is uncertain and requests more statistical data from the student."
      ],
      correctIndex: 1,
      literalTrapIndex: 2,
      explanation: "Lời châm biếm về 'phòng tiếp thị của hãng hàng không' chỉ ra rằng việc trồng rừng độc canh này chỉ là chiêu bài PR."
    }
  },
  {
    id: "prag_05_climate_reluctant_concession",
    sourceType: "reading_passage3",
    discipline: "Atmospheric Geophysics & Geoengineering",
    title: "Stratospheric Aerosol Injection Feasibility",
    difficulty: "Band 8.5+",
    excerpt: "Admittedly, solar radiation management offers an immediate, mathematically quantifiable drop in mean surface temperatures; nevertheless, to treat this thermodynamic plaster as a substitute for decarbonization is to confuse symptom suppression with systemic cure.",
    ironicMarker: "thermodynamic plaster... confuse symptom suppression with systemic cure",
    trapType: "reluctant_concession",
    toneClassification: "Reluctant Concession & Metaphorical Critique",
    literalMeaning: "Thừa nhận rằng phun hạt phản xạ giúp giảm nhiệt độ bề mặt ngay lập tức theo tính toán số học.",
    intendedPragmaticImplicature: "Tác giả coi công nghệ này chỉ là giải pháp chắp vá tạm thời (như miếng dán vết thương) và cảnh báo nguy cơ nó làm xã hội lơ là việc cắt giảm khí thải cốt lõi.",
    cambridgeExamTrapAnalysis: "Mệnh đề sau 'nevertheless' mang hàm ý chỉ trích gay gắt việc xem công nghệ này như thần dược cứu cánh.",
    drillQuestion: {
      questionText: "The author refers to geoengineering as a 'thermodynamic plaster' in order to:",
      options: [
        "Highlight its durability and long-term economic sustainability.",
        "Criticize it as a superficial, stopgap measure that ignores root causes.",
        "Explain the physical composition of aerosol particles in the stratosphere.",
        "Praise engineers for developing rapid temperature reduction tools."
      ],
      correctIndex: 1,
      literalTrapIndex: 3,
      explanation: "Ẩn dụ 'plaster' (miếng dán vết thương) khẳng định bản chất tạm bợ, chữa triệu chứng chứ không trị tận gốc căn bệnh."
    }
  }
];
