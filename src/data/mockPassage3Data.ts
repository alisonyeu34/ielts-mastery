export interface DenestingSentence {
  id: string;
  paragraphLetter: string;
  paragraphId?: string;
  rawSentence: string;
  fullText: string;
  quoteText?: string;
  backbone: string; // Core S-V-O
  coreSubject: string;
  coreVerb: string;
  coreObject: string;
  primaryModifiers: string[]; // Relative clauses, participles
  subordinateClauses: string[];
  qualifications: string[]; // Parentheticals, concessions, dashes
  modifiersAndParentheticals: string[];
  simplifiedMeaningEn: string;
  simplifiedMeaningVi: string;
  vietnameseMeaning: string;
  syntacticBreakdownVi: string;
}

export interface PassageParagraph {
  letter: string; // A, B, C, D, E, F, G
  id: string;
  label: string;
  titleHeadingVi: string;
  text: string;
  denestingSentenceIds: string[];
  conceptualCoreVi: string;
}

export type StanceLevel =
  | "skeptical"
  | "dismissive"
  | "cautiously_optimistic"
  | "objective_detachment"
  | "ambivalent"
  | "explicit_endorsement"
  | "positive"
  | "critical"
  | "concession"
  | "none";

// Backwards compatibility aliases
export type Passage3Data = Passage3ExerciseData;
export type ComplexSentence = DenestingSentence;
export type StanceType = StanceLevel;

export interface EvaluativeWord {
  id: string;
  word: string;
  category: string;
  meaningVi: string;
  stanceLevel: string;
  paragraphId?: string;
}

export interface ToneLexiconItem {
  id: string;
  word: string;
  pos?: string;
  phonetic: string;
  type: StanceType;
  meaningVi?: string;
  vietnameseMeaning: string;
  example?: string;
  exampleSentence: string;
  nuanceVi?: string;
  academicNuance: string;
}

export interface AuthorStanceDrillItem {
  id: string;
  quoteText: string;
  speakerIdentity: "cited_researcher" | "author_stance" | "debunked_myth";
  explanation: string;
  paragraphLetter?: string;
}

export interface StanceAnalysisItem {
  level: StanceLevel;
  levelLabelVi: string;
  colorHex: string;
  quoteInText: string;
  hedgingMarkers: string[];
  explanationVi: string;
}

export interface SummaryBoxOption {
  letter: string; // A, B, C, D, E, F, G, H
  word: string;
  distractorType?: "opposite_tone" | "over_generalized" | "verbatim_trap" | "correct";
  explanationVi: string;
}

export interface Passage3QuestionOption {
  id: string;
  key?: string;
  text: string;
  isCorrect?: boolean;
  explanation?: string;
}

export interface Passage3Question {
  id: string;
  number: number; // 27 to 40
  questionNumber: number;
  questionText: string;
  type: "matching_headings" | "yes_no_not_given" | "summary_box" | "multiple_choice";
  sectionTitleVi: string;
  paragraphTarget?: string; // For headings (A-F)
  paragraphReference: string;
  prompt: string;
  options?: any[]; // For Headings or Multiple Choice
  boxOptions?: SummaryBoxOption[]; // For Summary Box
  correctAnswer: string;
  stanceLevel?: StanceLevel;
  stanceExplanation?: string;
  distractorExplanationVi: string;
  examinerExplanation?: string;
  trapType?: string;
  evidenceParagraphLetter: string;
  evidenceSentence: string;
}

export interface Passage3ExerciseData {
  id: string;
  title: string;
  subtitleEn: string;
  subtitle?: string;
  wordCount: number;
  topicDomainVi: string;
  paragraphs: PassageParagraph[];
  denestingSentences: Record<string, DenestingSentence>;
  questions: Passage3Question[];
  headingList: Array<{ id: string; romanNumeral: string; text: string }>;
  summaryBoxOptions: SummaryBoxOption[];
  authorOverallStance: {
    level: StanceLevel;
    titleVi: string;
    descriptionVi: string;
    evidenceQuotes: string[];
  };
  conceptualThread: Array<{
    paragraphLetter: string;
    stageTitleVi: string;
    coreArgumentVi: string;
  }>;
  abstractVocabAWL: Array<{
    word: string;
    ipa: string;
    meaningVi: string;
    context: string;
  }>;
  complexSentences: ComplexSentence[];
  evaluativeWords: EvaluativeWord[];
  stanceDrillItems: AuthorStanceDrillItem[];
  authorStanceDrillItems: AuthorStanceDrillItem[];
  toneLexicon: ToneLexiconItem[];
}

export const MOCK_DENESTING_SENTENCES: Record<string, DenestingSentence> = {
  denest_1: {
    id: "denest_1",
    paragraphLetter: "A",
    paragraphId: "para-A",
    rawSentence:
      "However, this staunchly behaviorist paradigm, despite its elegant pragmatism in engineering contexts, systematically sidesteps the phenomenological essence of consciousness: the subjective, qualitative experience of 'what it is like' to understand.",
    fullText:
      "However, this staunchly behaviorist paradigm, despite its elegant pragmatism in engineering contexts, systematically sidesteps the phenomenological essence of consciousness: the subjective, qualitative experience of 'what it is like' to understand.",
    quoteText:
      "However, this staunchly behaviorist paradigm systematically sidesteps the phenomenological essence of consciousness...",
    backbone: "This behaviorist paradigm systematically sidesteps the phenomenological essence of consciousness.",
    coreSubject: "This staunchly behaviorist paradigm",
    coreVerb: "systematically sidesteps",
    coreObject: "the phenomenological essence of consciousness",
    primaryModifiers: [
      "the subjective, qualitative experience of 'what it is like' to understand (Đồng vị ngữ giải thích)",
    ],
    subordinateClauses: [
      "the subjective, qualitative experience of 'what it is like' to understand",
    ],
    qualifications: [
      "despite its elegant pragmatism in engineering contexts (Cụm rào đón nhượng bộ)",
      "staunchly (Phó từ chỉ mức độ cực đoan)",
    ],
    modifiersAndParentheticals: [
      "despite its elegant pragmatism in engineering contexts",
    ],
    simplifiedMeaningEn: "Behavioral tests ignore the inner feelings of understanding.",
    simplifiedMeaningVi: "Phép thử hành vi bỏ qua cảm giác chủ quan thực sự của ý thức.",
    vietnameseMeaning:
      "Tuy nhiên, hệ hình mang nặng tính hành vi này—mặc dù rất hữu dụng và thực tế trong bối cảnh kỹ thuật—lại cố tình né tránh bản chất hiện tượng học của ý thức: trải nghiệm chủ quan và định tính về cảm giác 'hiểu thực sự là như thế nào'.",
    syntacticBreakdownVi:
      "Chủ ngữ chính: 'this behaviorist paradigm' | Động từ chính: 'systematically sidesteps' | Tân ngữ chính: 'the phenomenological essence'. Cụm 'despite...' là thành phần rào đón chen ngang.",
  },
  denest_2: {
    id: "denest_2",
    paragraphLetter: "B",
    paragraphId: "para-B",
    rawSentence:
      "To dismantle the functionalist presumption that computational simulation equates to genuine cognition, philosopher John Searle conceived the iconic Chinese Room thought experiment in 1980.",
    fullText:
      "To dismantle the functionalist presumption that computational simulation equates to genuine cognition, philosopher John Searle conceived the iconic Chinese Room thought experiment in 1980.",
    quoteText:
      "To dismantle the functionalist presumption, philosopher John Searle conceived the Chinese Room thought experiment...",
    backbone: "Philosopher John Searle conceived the Chinese Room thought experiment in 1980.",
    coreSubject: "Philosopher John Searle",
    coreVerb: "conceived",
    coreObject: "the iconic Chinese Room thought experiment",
    primaryModifiers: [
      "that computational simulation equates to genuine cognition (Mệnh đề đồng vị bổ nghĩa)",
    ],
    subordinateClauses: [
      "that computational simulation equates to genuine cognition",
    ],
    qualifications: [
      "To dismantle the functionalist presumption (Mục đích luận đứng đầu câu)",
    ],
    modifiersAndParentheticals: [
      "To dismantle the functionalist presumption",
    ],
    simplifiedMeaningEn: "Searle invented the Chinese Room experiment to challenge functionalism.",
    simplifiedMeaningVi: "Searle tạo ra thí nghiệm Căn phòng Trung Hoa để bác bỏ thuyết chức năng.",
    vietnameseMeaning:
      "Nhằm bác bỏ giả định của phái chức năng luận cho rằng việc mô phỏng trên máy tính tương đương với nhận thức thực thụ, nhà triết học John Searle đã sáng tạo ra thí nghiệm tư duy Căn phòng Trung Hoa mang tính biểu tượng vào năm 1980.",
    syntacticBreakdownVi:
      "Chủ ngữ: 'philosopher John Searle' | Vị ngữ: 'conceived' | Tân ngữ: 'the iconic Chinese Room thought experiment'.",
  },
  denest_3: {
    id: "denest_3",
    paragraphLetter: "C",
    paragraphId: "para-C",
    rawSentence:
      "To Searle, however, this rejoinder constitutes a category error: integrating more formal lookup tables or running the program on billions of vacuum tubes does not magically transmute non-conscious syntactic operations into intrinsic intentionality.",
    fullText:
      "To Searle, however, this rejoinder constitutes a category error: integrating more formal lookup tables or running the program on billions of vacuum tubes does not magically transmute non-conscious syntactic operations into intrinsic intentionality.",
    quoteText:
      "this rejoinder constitutes a category error: integrating more lookup tables does not transmute syntax into intentionality.",
    backbone: "This rejoinder constitutes a category error.",
    coreSubject: "This rejoinder",
    coreVerb: "constitutes",
    coreObject: "a category error",
    primaryModifiers: [
      "integrating more formal lookup tables or running the program on billions of vacuum tubes",
      "into intrinsic intentionality",
    ],
    subordinateClauses: [
      "integrating more formal lookup tables or running the program on billions of vacuum tubes does not magically transmute syntactic operations into intentionality",
    ],
    qualifications: [
      "To Searle, however (Góc nhìn tác giả)",
      "does not magically transmute (Phủ định bác bỏ)",
    ],
    modifiersAndParentheticals: ["To Searle, however"],
    simplifiedMeaningEn: "Adding more lookup tables cannot magically create true meaning.",
    simplifiedMeaningVi: "Bổ sung thêm bảng tra cứu không thể biến cú pháp thành ý thức.",
    vietnameseMeaning:
      "Tuy nhiên đối với Searle, lời phản bác này là một lỗi ngụy biện đánh tráo khái niệm: việc bổ sung thêm các bảng tra cứu hình thức hay chạy chương trình trên hàng tỷ bóng đèn chân không không thể biến đổi một cách thần kỳ các thao tác cú pháp vô thức thành ý niệm nội tại.",
    syntacticBreakdownVi:
      "Vế 1 nòng cốt: 'this rejoinder constitutes a category error'. Vế 2 sau dấu hai chấm giải thích chi tiết cơ chế phủ định.",
  },
  denest_4: {
    id: "denest_4",
    paragraphLetter: "D",
    paragraphId: "para-D",
    rawSentence:
      "While this embodied cognition approach aligns with contemporary robotics, critics caution that physical feedback loops do not automatically guarantee inner subjective qualia, leaving the explanatory gap between physical causality and conscious awareness fundamentally unbridged.",
    fullText:
      "While this embodied cognition approach aligns with contemporary robotics, critics caution that physical feedback loops do not automatically guarantee inner subjective qualia, leaving the explanatory gap between physical causality and conscious awareness fundamentally unbridged.",
    quoteText:
      "critics caution that physical feedback loops do not automatically guarantee inner subjective qualia...",
    backbone: "Critics caution that physical feedback loops do not guarantee subjective qualia.",
    coreSubject: "Critics",
    coreVerb: "caution",
    coreObject: "that physical feedback loops do not guarantee qualia",
    primaryModifiers: [
      "leaving the explanatory gap between physical causality and conscious awareness fundamentally unbridged",
    ],
    subordinateClauses: [
      "While this embodied cognition approach aligns with contemporary robotics",
    ],
    qualifications: [
      "While this embodied cognition approach aligns with contemporary robotics",
    ],
    modifiersAndParentheticals: [
      "leaving the explanatory gap fundamentally unbridged",
    ],
    simplifiedMeaningEn: "Physical robots still cannot bridge the gap to subjective feelings.",
    simplifiedMeaningVi: "Gắn robot tương tác vật lý vẫn chưa thể giải mã được cảm xúc chủ quan.",
    vietnameseMeaning:
      "Mặc dù cách tiếp cận nhận thức gắn liền thân thể này rất phù hợp với ngành robot hiện đại, các nhà phản biện cảnh báo rằng các vòng lặp phản hồi vật lý không tự động đảm bảo sự xuất hiện của cảm giác chủ quan nội tại, khiến cho hố sâu ngăn cách giữa quan hệ nhân quả vật lý và nhận thức có ý thức về căn bản vẫn chưa thể được bắc cầu.",
    syntacticBreakdownVi:
      "Chủ ngữ chính: 'critics' | Động từ: 'caution' | Mệnh đề tân ngữ: 'that physical feedback loops do not guarantee qualia'. Vế 'leaving...' là hệ quả triết học.",
  },
  denest_5: {
    id: "denest_5",
    paragraphLetter: "E",
    paragraphId: "para-E",
    rawSentence:
      "Consequently, while computers can simulate neural network dynamics with breathtaking fidelity, computational simulation of consciousness is no more identical to authentic awareness than a computer simulation of a rainstorm can make the hard drive wet.",
    fullText:
      "Consequently, while computers can simulate neural network dynamics with breathtaking fidelity, computational simulation of consciousness is no more identical to authentic awareness than a computer simulation of a rainstorm can make the hard drive wet.",
    quoteText:
      "computational simulation of consciousness is no more identical to authentic awareness than a rainstorm simulation makes a drive wet.",
    backbone: "Computational simulation of consciousness is not identical to authentic awareness.",
    coreSubject: "Computational simulation of consciousness",
    coreVerb: "is no more identical to",
    coreObject: "authentic awareness",
    primaryModifiers: [
      "than a computer simulation of a rainstorm can make the hard drive wet",
    ],
    subordinateClauses: [
      "while computers can simulate neural network dynamics with breathtaking fidelity",
    ],
    qualifications: [
      "while computers can simulate neural network dynamics with breathtaking fidelity",
    ],
    modifiersAndParentheticals: ["Consequently", "with breathtaking fidelity"],
    simplifiedMeaningEn: "Simulating a storm does not get you wet; simulating a brain does not create a mind.",
    simplifiedMeaningVi: "Mô phỏng mưa bão không làm ướt ổ cứng; mô phỏng não bộ không tạo ra tâm trí.",
    vietnameseMeaning:
      "Do đó, trong khi máy tính có thể mô phỏng các động lực của mạng nơ-ron với độ chính xác đáng kinh ngạc, thì sự mô phỏng ý thức trên máy tính cũng không hề đồng nhất với nhận thức thực thụ, giống như việc mô phỏng một cơn bão trên máy tính không thể làm cho ổ cứng bị ướt.",
    syntacticBreakdownVi:
      "Cấu trúc so sánh kép 'is no more X than Y' khẳng định sự bất khả thi của việc đánh đồng mô phỏng với thực tại.",
  },
};

export const MOCK_PASSAGE3_DATA: Passage3ExerciseData = {
  id: "p3_chinese_room_consciousness",
  title: "The Epistemology of Artificial Consciousness and the Chinese Room Paradox",
  subtitleEn: "Philosophical Inquiries into Machine Intentionality, Functionalism, and Biological Naturalism",
  subtitle: "Philosophical Inquiries into Machine Intentionality, Functionalism, and Biological Naturalism",
  wordCount: 960,
  topicDomainVi: "Triết Học Tâm Trí & Nhận Thức Luận Về Trí Tuệ Nhân Tạo (AI Epistemology)",
  paragraphs: [
    {
      letter: "A",
      id: "para-A",
      label: "Paragraph A",
      titleHeadingVi: "Khởi nguồn câu hỏi về ý thức máy móc",
      text: "For over seven decades, computer scientists and cognitive theorists have grappled with whether computational architectures can transcend syntactic symbol manipulation to attain authentic semantic comprehension. In 1950, Alan Turing famously proposed his operational criterion—the Imitation Game—which posited that if an entity's behavioral outputs are indistinguishable from those of a human intellect, we are philosophically obliged to grant it cognitive parity. However, this staunchly behaviorist paradigm, despite its elegant pragmatism in engineering contexts, systematically sidesteps the phenomenological essence of consciousness: the subjective, qualitative experience of 'what it is like' to understand.",
      denestingSentenceIds: ["denest_1"],
      conceptualCoreVi: "Phép thử Turing xem xét hành vi bên ngoài nhưng né tránh bản chất cảm nhận chủ quan (Phenomenological consciousness).",
    },
    {
      letter: "B",
      id: "para-B",
      label: "Paragraph B",
      titleHeadingVi: "Thí nghiệm tư duy Căn phòng Trung Hoa của John Searle",
      text: "To dismantle the functionalist presumption that computational simulation equates to genuine cognition, philosopher John Searle conceived the iconic Chinese Room thought experiment in 1980. Searle invites us to imagine a monolingual English speaker locked inside an isolated room, armed with a meticulous rulebook that correlates incoming Chinese characters with appropriate response symbols. To external observers slipping questions under the door, the room's outputs appear thoroughly articulate and linguistically competent. Yet, as Searle rigorously emphasizes, the human operator understands not a single word of Chinese; they are merely executing algorithmic lookups based on syntax without grasping the underlying semantics.",
      denestingSentenceIds: ["denest_2"],
      conceptualCoreVi: "Searle chứng minh thao tác ký hiệu cú pháp (Syntax) không đồng nghĩa với việc hiểu ngữ nghĩa (Semantics).",
    },
    {
      letter: "C",
      id: "para-C",
      label: "Paragraph C",
      titleHeadingVi: "Phản bác của phái Chức năng luận: Lời giải Hệ thống",
      text: "Proponents of Strong AI promptly mounted the 'Systems Reply', maintaining that while the isolated individual inside the room lacks comprehension, understanding legitimately resides in the entire systemic apparatus—encompassing the rulebook, memory storage, and recursive data conduits. According to functionalists, biological brains are themselves physical systems operating through electrochemical signal cascades; thus, mental states are substrate-neutral informational patterns. To Searle, however, this rejoinder constitutes a category error: integrating more formal lookup tables or running the program on billions of vacuum tubes does not magically transmute non-conscious syntactic operations into intrinsic intentionality.",
      denestingSentenceIds: ["denest_3"],
      conceptualCoreVi: "Functionalists cho rằng toàn bộ hệ thống hiểu, nhưng Searle coi đó là lỗi đánh tráo khái niệm (Category error).",
    },
    {
      letter: "D",
      id: "para-D",
      label: "Paragraph D",
      titleHeadingVi: "Phản biện Robot và Thuyết Tương Tác Thân Thể",
      text: "A more formidable counter-argument emerged through the 'Robot Reply', which asserts that the Chinese Room's failure to grasp semantics stems directly from its disembodied isolation from physical reality. If the computational program were embedded within a robotic sensory-motor nexus—enabling it to navigate physical terrain, manipulate objects, and causally anchor symbols to sensory inputs—grounded semantic reference would naturally crystallize. While this embodied cognition approach aligns with contemporary robotics, critics caution that physical feedback loops do not automatically guarantee inner subjective qualia, leaving the explanatory gap between physical causality and conscious awareness fundamentally unbridged.",
      denestingSentenceIds: ["denest_4"],
      conceptualCoreVi: "Tương tác thân thể (Embodied cognition) giúp neo giữ ký hiệu thực tế nhưng vẫn chưa giải mã được khoảng cách cảm xúc chủ quan (Qualia).",
    },
    {
      letter: "E",
      id: "para-E",
      label: "Paragraph E",
      titleHeadingVi: "Thuyết Tự Nhiên Sinh Học: Bản chất vật lý của não bộ",
      text: "Confronted by these divergent theories, Searle advanced 'Biological Naturalism', arguing that consciousness is a biological phenomenon causally produced by micro-level neurochemical processes within organic brains. Just as photosynthesis is unique to chloroplast biochemistry and cannot be realized by moving wooden blocks according to botanical rules, mental phenomena are intrinsically dependent on specific neurobiological substrates. Consequently, while computers can simulate neural network dynamics with breathtaking fidelity, computational simulation of consciousness is no more identical to authentic awareness than a computer simulation of a rainstorm can make the hard drive wet.",
      denestingSentenceIds: ["denest_5"],
      conceptualCoreVi: "Mô phỏng bão không làm ướt ổ cứng; mô phỏng thần kinh học không thể tạo ra ý thức sinh học thực sự.",
    },
    {
      letter: "F",
      id: "para-F",
      label: "Paragraph F",
      titleHeadingVi: "Mạng nơ-ron sâu và Thử thách Hiện đại",
      text: "The recent ascendancy of multi-billion-parameter Large Language Models has reinvigorated this philosophical dispute with unprecedented urgency. Modern transformers generate nuanced academic treatises, write coherent code, and exhibit emergent reasoning capabilities that appear to defy simple lookup table analogies. Some contemporary neuroscientists suggest that sufficiently complex recursive self-attention architectures might spontaneously develop proto-intentionality. Nevertheless, a critical distinction remains between statistical predictive mimicry and genuine subjective sentience, urging policymakers to avoid anthropomorphizing algorithmic sophistication.",
      denestingSentenceIds: [],
      conceptualCoreVi: "Mô hình ngôn ngữ lớn (LLMs) tạo ra văn bản học thuật tinh vi nhưng vẫn là sự bắt chước xác suất, chưa phải ý thức tri giác.",
    },
    {
      letter: "G",
      id: "para-G",
      label: "Paragraph G",
      titleHeadingVi: "Kết luận: Sự cẩn trọng nhận thức luận",
      text: "Ultimately, the persistent enigma of artificial consciousness exposes the epistemological boundaries of contemporary cognitive science. Until neurophilosophy achieves a definitive scientific account of how physical matter generates subjective experience, claiming machine sentience based solely on impressive conversational performance remains philosophically premature. Prudence dictates treating generative AI as powerful epistemic instruments rather than conscious moral agents.",
      denestingSentenceIds: [],
      conceptualCoreVi: "Kết luận thận trọng: Tuyên bố máy móc có ý thức chỉ dựa trên hành vi giao tiếp là quá sớm về mặt nhận thức luận.",
    },
  ],
  denestingSentences: MOCK_DENESTING_SENTENCES,
  complexSentences: Object.values(MOCK_DENESTING_SENTENCES),
  headingList: [
    { id: "h_i", romanNumeral: "i", text: "Physical interaction and the embodiment debate" },
    { id: "h_ii", romanNumeral: "ii", text: "The limitations of behavioral criteria for consciousness" },
    { id: "h_iii", romanNumeral: "iii", text: "The biological uniqueness of organic cognition" },
    { id: "h_iv", romanNumeral: "iv", text: "A thought experiment separating syntax from meaning" },
    { id: "h_v", romanNumeral: "v", text: "Statistical mimicry versus genuine sentience in modern AI" },
    { id: "h_vi", romanNumeral: "vi", text: "The systemic argument and its philosophical shortcomings" },
    { id: "h_vii", romanNumeral: "vii", text: "Economic ramifications of autonomous machine learning" },
    { id: "h_viii", romanNumeral: "viii", text: "An epistemological plea for scientific humility" },
  ],
  summaryBoxOptions: [
    { letter: "A", word: "phenomenological", distractorType: "correct", explanationVi: "Trải nghiệm hiện tượng học chủ quan (Đúng nghĩa)." },
    { letter: "B", word: "superficial", distractorType: "opposite_tone", explanationVi: "Nông cạn (Sai sắc thái)." },
    { letter: "C", word: "syntactic", distractorType: "correct", explanationVi: "Thao tác cú pháp ký hiệu (Đúng ngữ cảnh)." },
    { letter: "D", word: "biological", distractorType: "correct", explanationVi: "Cơ chế sinh học đặc thù của não (Đúng nghĩa)." },
    { letter: "E", word: "computational", distractorType: "verbatim_trap", explanationVi: "Từ bẫy xuất hiện trong bài nhưng sai vị trí." },
    { letter: "F", word: "premature", distractorType: "correct", explanationVi: "Quá vội vàng / Chưa chín muồi (Đúng nghĩa)." },
    { letter: "G", word: "irreversible", distractorType: "over_generalized", explanationVi: "Không thể đảo ngược (Sai logic)." },
    { letter: "H", word: "behavioral", distractorType: "verbatim_trap", explanationVi: "Thuộc về hành vi (Từ bẫy)." },
  ],
  questions: [
    // Matching Headings (Q27 - Q32)
    {
      id: "q_27",
      number: 27,
      questionNumber: 27,
      questionText: "Choose the correct heading for Paragraph A",
      type: "matching_headings",
      sectionTitleVi: "Matching Headings (Đoạn A - F)",
      paragraphTarget: "A",
      paragraphReference: "Đoạn A",
      prompt: "Choose the correct heading for Paragraph A",
      options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"],
      correctAnswer: "ii",
      distractorExplanationVi: "Đoạn A nói về phép thử Turing và chỉ ra điểm hạn chế của việc chỉ dựa vào hành vi bên ngoài (behavioral criteria).",
      evidenceParagraphLetter: "A",
      evidenceSentence: "However, this staunchly behaviorist paradigm systematically sidesteps the phenomenological essence of consciousness...",
    },
    {
      id: "q_28",
      number: 28,
      questionNumber: 28,
      questionText: "Choose the correct heading for Paragraph B",
      type: "matching_headings",
      sectionTitleVi: "Matching Headings (Đoạn A - F)",
      paragraphTarget: "B",
      paragraphReference: "Đoạn B",
      prompt: "Choose the correct heading for Paragraph B",
      options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"],
      correctAnswer: "iv",
      distractorExplanationVi: "Đoạn B giới thiệu thí nghiệm Căn phòng Trung Hoa nhằm bóc tách thao tác cú pháp (syntax) khỏi hiểu ngữ nghĩa (meaning).",
      evidenceParagraphLetter: "B",
      evidenceSentence: "they are merely executing algorithmic lookups based on syntax without grasping the underlying semantics.",
    },
    {
      id: "q_29",
      number: 29,
      questionNumber: 29,
      questionText: "Choose the correct heading for Paragraph C",
      type: "matching_headings",
      sectionTitleVi: "Matching Headings (Đoạn A - F)",
      paragraphTarget: "C",
      paragraphReference: "Đoạn C",
      prompt: "Choose the correct heading for Paragraph C",
      options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"],
      correctAnswer: "vi",
      distractorExplanationVi: "Đoạn C giải thích 'Systems Reply' của phái chức năng luận và lý do Searle coi đó là một khiếm khuyết triết học (philosophical shortcomings).",
      evidenceParagraphLetter: "C",
      evidenceSentence: "To Searle, however, this rejoinder constitutes a category error...",
    },
    {
      id: "q_30",
      number: 30,
      questionNumber: 30,
      questionText: "Choose the correct heading for Paragraph D",
      type: "matching_headings",
      sectionTitleVi: "Matching Headings (Đoạn A - F)",
      paragraphTarget: "D",
      paragraphReference: "Đoạn D",
      prompt: "Choose the correct heading for Paragraph D",
      options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"],
      correctAnswer: "i",
      distractorExplanationVi: "Đoạn D thảo luận về 'Robot Reply' và cuộc tranh luận về nhận thức gắn liền với thân thể (physical interaction & embodiment).",
      evidenceParagraphLetter: "D",
      evidenceSentence: "While this embodied cognition approach aligns with contemporary robotics, critics caution...",
    },
    {
      id: "q_31",
      number: 31,
      questionNumber: 31,
      questionText: "Choose the correct heading for Paragraph E",
      type: "matching_headings",
      sectionTitleVi: "Matching Headings (Đoạn A - F)",
      paragraphTarget: "E",
      paragraphReference: "Đoạn E",
      prompt: "Choose the correct heading for Paragraph E",
      options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"],
      correctAnswer: "iii",
      distractorExplanationVi: "Đoạn E phân tích Thuyết Tự Nhiên Sinh Học khẳng định ý thức là đặc tính sinh học đặc thù của não bộ (biological uniqueness).",
      evidenceParagraphLetter: "E",
      evidenceSentence: "mental phenomena are intrinsically dependent on specific neurobiological substrates.",
    },
    {
      id: "q_32",
      number: 32,
      questionNumber: 32,
      questionText: "Choose the correct heading for Paragraph F",
      type: "matching_headings",
      sectionTitleVi: "Matching Headings (Đoạn A - F)",
      paragraphTarget: "F",
      paragraphReference: "Đoạn F",
      prompt: "Choose the correct heading for Paragraph F",
      options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"],
      correctAnswer: "v",
      distractorExplanationVi: "Đoạn F so sánh mô hình ngôn ngữ lớn (LLMs) hiện đại với sự bắt chước thống kê thay vì tri giác thực sự (statistical mimicry vs sentience).",
      evidenceParagraphLetter: "F",
      evidenceSentence: "a critical distinction remains between statistical predictive mimicry and genuine subjective sentience...",
    },

    // Yes / No / Not Given (Q33 - Q36) - Author Claims
    {
      id: "q_33",
      number: 33,
      questionNumber: 33,
      questionText: "Alan Turing's Imitation Game provides a complete philosophical resolution to the nature of subjective experience.",
      type: "yes_no_not_given",
      sectionTitleVi: "Yes / No / Not Given (Lập Trường Tác Giả)",
      paragraphReference: "Đoạn A",
      prompt: "Alan Turing's Imitation Game provides a complete philosophical resolution to the nature of subjective experience.",
      correctAnswer: "NO",
      stanceLevel: "skeptical",
      stanceExplanation: "Tác giả chỉ trích phép thử của Turing là 'systematically sidesteps the phenomenological essence' (cố tình né tránh bản chất cảm nhận chủ quan). Do đó khẳng định này đi ngược lại quan điểm tác giả (NO).",
      distractorExplanationVi: "Bẫy quan điểm: Turing đề xuất phép thử nhưng tác giả bác bỏ tính toàn diện của nó.",
      evidenceParagraphLetter: "A",
      evidenceSentence: "However, this staunchly behaviorist paradigm systematically sidesteps the phenomenological essence of consciousness...",
    },
    {
      id: "q_34",
      number: 34,
      questionNumber: 34,
      questionText: "John Searle accepted that executing complex syntax inside an isolated chamber eventually creates semantic comprehension.",
      type: "yes_no_not_given",
      sectionTitleVi: "Yes / No / Not Given (Lập Trường Tác Giả)",
      paragraphReference: "Đoạn B",
      prompt: "John Searle accepted that executing complex syntax inside an isolated chamber eventually creates semantic comprehension.",
      correctAnswer: "NO",
      stanceLevel: "dismissive",
      stanceExplanation: "Searle khẳng định người trong phòng không hiểu một từ tiếng Trung nào và cú pháp không thể tự sinh ra ngữ nghĩa (NO).",
      distractorExplanationVi: "Bẫy đối tượng: Người quan sát bên ngoài tưởng là hiểu, nhưng người bên trong hoàn toàn không hiểu.",
      evidenceParagraphLetter: "B",
      evidenceSentence: "the human operator understands not a single word of Chinese; they are merely executing algorithmic lookups...",
    },
    {
      id: "q_35",
      number: 35,
      questionNumber: 35,
      questionText: "Robotic feedback mechanisms have definitively solved the explanatory gap between physical causality and conscious awareness.",
      type: "yes_no_not_given",
      sectionTitleVi: "Yes / No / Not Given (Lập Trường Tác Giả)",
      paragraphReference: "Đoạn D",
      prompt: "Robotic feedback mechanisms have definitively solved the explanatory gap between physical causality and conscious awareness.",
      correctAnswer: "NO",
      stanceLevel: "skeptical",
      stanceExplanation: "Tác giả nêu rõ khoảng cách giải thích giữa nhân quả vật lý và nhận thức có ý thức về căn bản 'remains fundamentally unbridged' (chưa hề được giải quyết) ➔ NO.",
      distractorExplanationVi: "Bẫy từ tuyệt đối: 'definitively solved' hoàn toàn trái ngược với 'fundamentally unbridged'.",
      evidenceParagraphLetter: "D",
      evidenceSentence: "leaving the explanatory gap between physical causality and conscious awareness fundamentally unbridged.",
    },
    {
      id: "q_36",
      number: 36,
      questionNumber: 36,
      questionText: "Most leading tech corporations currently fund research into artificial biological naturalism.",
      type: "yes_no_not_given",
      sectionTitleVi: "Yes / No / Not Given (Lập Trường Tác Giả)",
      paragraphReference: "Đoạn E",
      prompt: "Most leading tech corporations currently fund research into artificial biological naturalism.",
      correctAnswer: "NOT GIVEN",
      stanceLevel: "objective_detachment",
      stanceExplanation: "Trong bài đọc không hề đề cập đến việc các tập đoàn công nghệ lớn có tài trợ cho nghiên cứu thuyết tự nhiên sinh học hay không ➔ NOT GIVEN.",
      distractorExplanationVi: "Bẫy thông tin ngoài đời: Người đọc có thể tự suy diễn nhưng văn bản không có dữ liệu này.",
      evidenceParagraphLetter: "E",
      evidenceSentence: "Searle advanced 'Biological Naturalism', arguing that consciousness is a biological phenomenon...",
    },

    // Summary Completion with a Box (Q37 - Q40)
    {
      id: "q_37",
      number: 37,
      questionNumber: 37,
      questionText: "Critics of early behaviorist models argue that functional tests ignore the (37) [_____] dimensions of the mind.",
      type: "summary_box",
      sectionTitleVi: "Summary Completion with a Box of Options",
      paragraphReference: "Đoạn A",
      prompt: "Critics of early behaviorist models argue that functional tests ignore the (37) [_____] dimensions of the mind.",
      correctAnswer: "A",
      distractorExplanationVi: "Từ cần điền là Tính từ bổ nghĩa cho dimensions ➔ 'phenomenological' (thuộc hiện tượng học / cảm nhận chủ quan).",
      evidenceParagraphLetter: "A",
      evidenceSentence: "systematically sidesteps the phenomenological essence of consciousness...",
    },
    {
      id: "q_38",
      number: 38,
      questionNumber: 38,
      questionText: "In the Chinese Room analogy, the operator merely performs (38) [_____] operations without true comprehension.",
      type: "summary_box",
      sectionTitleVi: "Summary Completion with a Box of Options",
      paragraphReference: "Đoạn B",
      prompt: "In the Chinese Room analogy, the operator merely performs (38) [_____] operations without true comprehension.",
      correctAnswer: "C",
      distractorExplanationVi: "Từ cần điền là 'syntactic' (thao tác cú pháp ký hiệu máy móc).",
      evidenceParagraphLetter: "B",
      evidenceSentence: "they are merely executing algorithmic lookups based on syntax without grasping the underlying semantics.",
    },
    {
      id: "q_39",
      number: 39,
      questionNumber: 39,
      questionText: "Biological naturalists maintain that mental awareness requires specific (39) [_____] substrates unique to organic brains.",
      type: "summary_box",
      sectionTitleVi: "Summary Completion with a Box of Options",
      paragraphReference: "Đoạn E",
      prompt: "Biological naturalists maintain that mental awareness requires specific (39) [_____] substrates unique to organic brains.",
      correctAnswer: "D",
      distractorExplanationVi: "Từ cần điền là 'biological' (thuộc về cấu trúc sinh học đặc thù của não bộ).",
      evidenceParagraphLetter: "E",
      evidenceSentence: "mental phenomena are intrinsically dependent on specific neurobiological substrates.",
    },
    {
      id: "q_40",
      number: 40,
      questionNumber: 40,
      questionText: "Consequently, asserting that conversational AI possesses authentic sentience is philosophically (40) [_____].",
      type: "summary_box",
      sectionTitleVi: "Summary Completion with a Box of Options",
      paragraphReference: "Đoạn G",
      prompt: "Consequently, asserting that conversational AI possesses authentic sentience is philosophically (40) [_____].",
      correctAnswer: "F",
      distractorExplanationVi: "Từ cần điền là 'premature' (quá vội vàng / thiếu chín chắn về mặt nhận thức luận).",
      evidenceParagraphLetter: "G",
      evidenceSentence: "claiming machine sentience based solely on impressive conversational performance remains philosophically premature.",
    },
  ],
  authorOverallStance: {
    level: "skeptical",
    titleVi: "Hoài Nghi Học Thuật Có Căn Cứ (Rigorous Academic Skepticism)",
    descriptionVi:
      "Tác giả giữ thái độ hoài nghi sâu sắc trước những tuyên bố cho rằng AI đã đạt được ý thức thực sự; tác giả phân biệt rạch ròi giữa 'Mô phỏng cú pháp tinh vi' (Syntactic Simulation) và 'Cảm nhận chủ quan nội tại' (Phenomenological Consciousness).",
    evidenceQuotes: [
      "systematically sidesteps the phenomenological essence of consciousness",
      "simulation of consciousness is no more identical to authentic awareness than a computer simulation of a rainstorm can make the hard drive wet",
      "claiming machine sentience based solely on impressive conversational performance remains philosophically premature",
    ],
  },
  conceptualThread: [
    {
      paragraphLetter: "A",
      stageTitleVi: "1. Tiền Đề Hành Vi Luận",
      coreArgumentVi: "Phép thử Turing chỉ đo lường biểu hiện bên ngoài nhưng bỏ quên trải nghiệm chủ quan.",
    },
    {
      paragraphLetter: "B",
      stageTitleVi: "2. Nghịch Lý Căn Phòng Trung Hoa",
      coreArgumentVi: "Thao tác ký hiệu cú pháp (Syntax) $\\neq$ Thấu hiểu ngữ nghĩa (Semantics).",
    },
    {
      paragraphLetter: "C",
      stageTitleVi: "3. Phản Bác Hệ Thống",
      coreArgumentVi: "Ghép thêm bảng tra cứu không thể biến thao tác vô thức thành ý thức.",
    },
    {
      paragraphLetter: "D",
      stageTitleVi: "4. Nhận Thức Thân Thể",
      coreArgumentVi: "Gắn robot tương tác vật lý giúp neo giữ ký hiệu nhưng chưa giải mã được cảm xúc chủ quan (Qualia).",
    },
    {
      paragraphLetter: "E",
      stageTitleVi: "5. Tự Nhiên Sinh Học",
      coreArgumentVi: "Ý thức là đặc tính sinh học đặc thù của tế bào thần kinh sống, không thể thay bằng mạch silicon.",
    },
    {
      paragraphLetter: "F",
      stageTitleVi: "6. Thử Thách LLMs Hiện Đại",
      coreArgumentVi: "Mô hình ngôn ngữ lớn (GPT) bắt chước thống kê siêu đẳng nhưng không có tri giác.",
    },
    {
      paragraphLetter: "G",
      stageTitleVi: "7. Kết Luận Nhận Thức Luận",
      coreArgumentVi: "Tuyên bố máy móc có ý thức là quá sớm; hãy coi AI là công cụ tri thức.",
    },
  ],
  abstractVocabAWL: [
    {
      word: "epistemology",
      ipa: "/ɪˌpɪs.təˈmɒl.ə.dʒi/",
      meaningVi: "Nhận thức luận (Ngành triết học nghiên cứu về bản chất của tri thức)",
      context: "The persistent enigma exposes the epistemological boundaries of cognitive science.",
    },
    {
      word: "phenomenological",
      ipa: "/fɪˌnɒm.ɪ.nəˈlɒdʒ.ɪ.kəl/",
      meaningVi: "Thuộc về hiện tượng học / trải nghiệm cảm nhận chủ quan",
      context: "Sidesteps the phenomenological essence of consciousness.",
    },
    {
      word: "intentionality",
      ipa: "/ɪnˌten.ʃəˈnæl.ə.ti/",
      meaningVi: "Tính hướng đích / ý niệm nội tại (Khả năng tâm trí hướng về một đối tượng)",
      context: "Transmute non-conscious syntactic operations into intrinsic intentionality.",
    },
    {
      word: "qualia",
      ipa: "/ˈkwɑː.li.ə/",
      meaningVi: "Cảm giác định tính chủ quan (Ví dụ: cảm giác thấy màu đỏ, thấy đau)",
      context: "Physical feedback loops do not automatically guarantee inner subjective qualia.",
    },
    {
      word: "anthropomorphize",
      ipa: "/ˌæn.θrə.pəˈmɔː.faɪz/",
      meaningVi: "Nhân hóa (Gán đặc tính và cảm xúc con người cho đồ vật/máy móc)",
      context: "Urging policymakers to avoid anthropomorphizing algorithmic sophistication.",
    },
  ],
  evaluativeWords: [
    {
      id: "ew_1",
      word: "staunchly",
      category: "Adverb of Stance",
      meaningVi: "Một cách ngoan cố / kiên định cực đoan",
      stanceLevel: "critical",
      paragraphId: "para-A",
    },
    {
      id: "ew_2",
      word: "sidesteps",
      category: "Critical Verb",
      meaningVi: "Cố tình né tránh vấn đề cốt lõi",
      stanceLevel: "critical",
      paragraphId: "para-A",
    },
  ],
  stanceDrillItems: [
    {
      id: "drill_1",
      quoteText:
        "if an entity's behavioral outputs are indistinguishable from those of a human intellect, we are philosophically obliged to grant it cognitive parity.",
      speakerIdentity: "cited_researcher",
      explanation: "Đây là tiền đề phái hành vi luận của Alan Turing được tác giả trích dẫn để mổ xẻ phản biện.",
      paragraphLetter: "A",
    },
    {
      id: "drill_2",
      quoteText:
        "this staunchly behaviorist paradigm systematically sidesteps the phenomenological essence of consciousness",
      speakerIdentity: "author_stance",
      explanation: "Đây là lập trường phê phán trực tiếp của tác giả đối với phép thử hành vi.",
      paragraphLetter: "A",
    },
  ],
  authorStanceDrillItems: [
    {
      id: "drill_1",
      quoteText:
        "if an entity's behavioral outputs are indistinguishable from those of a human intellect, we are philosophically obliged to grant it cognitive parity.",
      speakerIdentity: "cited_researcher",
      explanation: "Đây là tiền đề phái hành vi luận của Alan Turing được tác giả trích dẫn để mổ xẻ phản biện.",
      paragraphLetter: "A",
    },
    {
      id: "drill_2",
      quoteText:
        "this staunchly behaviorist paradigm systematically sidesteps the phenomenological essence of consciousness",
      speakerIdentity: "author_stance",
      explanation: "Đây là lập trường phê phán trực tiếp của tác giả đối với phép thử hành vi.",
      paragraphLetter: "A",
    },
  ],
  toneLexicon: [
    {
      id: "tl_1",
      word: "staunchly",
      pos: "adverb",
      phonetic: "/ˈstɔːntʃ.li/",
      type: "critical",
      meaningVi: "Một cách cực đoan / cứng nhắc",
      vietnameseMeaning: "Một cách cực đoan / kiên định cứng nhắc",
      example: "this staunchly behaviorist paradigm",
      exampleSentence: "this staunchly behaviorist paradigm systematically sidesteps the phenomenological essence...",
      nuanceVi: "Thường dùng khi tác giả muốn báo hiệu sự phiến diện của quan điểm đối lập.",
      academicNuance: "Báo hiệu sự bảo thủ hoặc thiếu linh hoạt trong tư duy học thuật.",
    },
    {
      id: "tl_2",
      word: "sidesteps",
      pos: "verb",
      phonetic: "/ˈsaɪd.steps/",
      type: "critical",
      meaningVi: "Cố tình né tránh",
      vietnameseMeaning: "Cố tình né tránh vấn đề cốt lõi",
      example: "systematically sidesteps the phenomenological essence",
      exampleSentence: "systematically sidesteps the phenomenological essence of consciousness...",
      nuanceVi: "Chỉ trích trực diện hành động lảng tránh vấn đề cốt lõi.",
      academicNuance: "Chỉ trích trực tiếp việc bỏ qua các biến số quan trọng.",
    },
    {
      id: "tl_3",
      word: "premature",
      pos: "adjective",
      phonetic: "/ˌprem.əˈtʃʊər/",
      type: "skeptical",
      meaningVi: "Quá sớm / Chưa chín muồi",
      vietnameseMeaning: "Quá vội vàng / Chưa đủ cơ sở khoa học",
      example: "remains philosophically premature",
      exampleSentence: "claiming machine sentience based solely on impressive conversational performance remains philosophically premature.",
      nuanceVi: "Từ rào đón thể hiện sự hoài nghi học thuật thận trọng.",
      academicNuance: "Rào đón học thuật (academic hedging) cảnh báo sự vội vàng kết luận.",
    },
  ],
};
