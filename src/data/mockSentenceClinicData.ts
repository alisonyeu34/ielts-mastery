/**
 * Cambridge IELTS Academic Sentence Clinic Mock Dataset
 * 15 Real Clinical Cases across 3 Stations:
 * Station 1: Grammar Surgery (Sentence Fragments, Run-on Sentences, Subject-Verb & Tense Agreement)
 * Station 2: Collocation & Nuance Calibrator (Informal conversational phrases upgraded to C1 academic)
 * Station 3: Syntactic Upgrade Elevation (Nominalization, Participial Clauses, Inversion)
 */

export interface CollocationItem {
  originalWord: string;
  c1Alternatives: string[];
  usageContextVi: string;
}

export interface SentenceClinicalSolution {
  band: 6.5 | 7.5 | 8.5;
  titleVi: string;
  text: string;
  rationaleVi: string;
  stylisticFeatureVi: string;
}

export interface SentenceClinicCase {
  id: string;
  station: "grammar_surgery" | "collocation_nuance" | "syntactic_upgrade";
  stationNameVi: string;
  title: string;
  faultySentence: string;
  diagnosticTags: string[];
  originalBand: number; // 4.5, 5.0, 5.5
  errorDescriptionVi: string;
  clinicalSurgeryStepsVi: string[];
  collocationPalette: CollocationItem[];
  solutions: SentenceClinicalSolution[];
  ieltsEssayPromptVi: string;
}

export const MOCK_SENTENCE_CLINIC_CASES: SentenceClinicCase[] = [
  // =========================================================================
  // STATION 1: PHẪU THUẬT LỖI NGỮ PHÁP NỀN TẢNG (GRAMMAR SURGERY)
  // =========================================================================
  {
    id: "clinic_s1_01",
    station: "grammar_surgery",
    stationNameVi: "Trạm 1 • Phẫu thuật Lỗi Ngữ Pháp Nền Tảng (Grammar Surgery)",
    title: "Bệnh án 01: Lỗi Run-on & Nối hai mệnh đề độc lập bằng dấu phẩy (Comma Splice)",
    faultySentence: "Many students spend too much time on social media, this causes their academic performance to drop significantly.",
    diagnosticTags: ["Lỗi Comma Splice", "Lỗi Run-on Sentence", "GRA Band 5.0 Trap"],
    originalBand: 5.0,
    errorDescriptionVi: "Hai mệnh đề hoàn chỉnh (Independent Clauses) bị nối bằng một dấu phẩy đơn lẻ mà không có liên từ kết hợp (FANBOYS), đại từ quan hệ (which), hoặc liên từ phụ thuộc.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Tách thành 2 câu độc lập bằng dấu chấm hoặc dấu chấm phẩy (;).",
      "Bước 2: Sử dụng đại từ quan hệ 'which' tạo thành mệnh đề quan hệ không xác định thay thế cho cả ý trước.",
      "Bước 3: Dùng mệnh đề phân từ rút gọn (Participial Clause) 'thereby causing...'.",
    ],
    collocationPalette: [
      {
        originalWord: "spend too much time",
        c1Alternatives: ["allocate excessive screen time to", "be excessively preoccupied with"],
        usageContextVi: "Dùng để mô tả sự lạm dụng thời gian vào mạng xã hội một cách học thuật.",
      },
      {
        originalWord: "drop significantly",
        c1Alternatives: ["deteriorate substantially", "suffer a marked decline"],
        usageContextVi: "Thay thế từ 'drop' cơ bản bằng từ vựng chỉ sự suy thoái thành tích học tập.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Sạch Lỗi Cơ Bản)",
        text: "Many students spend excessive time on social media, and this leads to a significant decline in their academic performance.",
        rationaleVi: "Sử dụng liên từ kết hợp ', and this' để sửa triệt để lỗi Comma Splice.",
        stylisticFeatureVi: "Câu ghép tiêu chuẩn (Compound Sentence).",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Mệnh Đề Quan Hệ Thay Thế Cả Mệnh Đề)",
        text: "Many students devote excessive hours to social media, which substantially undermines their scholastic achievements.",
        rationaleVi: "Dùng 'which + verb' để quy chiếu cho toàn bộ mệnh đề chính phía trước và nâng cấp từ vựng 'devote excessive hours', 'undermines scholastic achievements'.",
        stylisticFeatureVi: "Non-defining Relative Clause quy chiếu ý nghĩa toàn câu.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Mệnh Đề Phân Từ Rút Gọn & Danh Từ Hóa)",
        text: "Excessive engagement with social media frequently distracts students, thereby precipitating a marked deterioration in their academic performance.",
        rationaleVi: "Danh từ hóa chủ ngữ 'Excessive engagement' kết hợp mệnh đề phân từ nguyên nhân - kết quả 'thereby precipitating a marked deterioration'.",
        stylisticFeatureVi: "Nominalization + Participial Result Clause + C2 Collocation.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Some people believe that social media has a detrimental effect on young people's education. Discuss both views.",
  },
  {
    id: "clinic_s1_02",
    station: "grammar_surgery",
    stationNameVi: "Trạm 1 • Phẫu thuật Lỗi Ngữ Pháp Nền Tảng (Grammar Surgery)",
    title: "Bệnh án 02: Câu cụt thiếu vị ngữ chính (Sentence Fragment)",
    faultySentence: "Although the government invested heavily in public transportation. Still traffic jams occur during peak hours.",
    diagnosticTags: ["Lỗi Sentence Fragment", "Câu Cụt Không Vị Ngữ", "GRA Band 5.0 Trap"],
    originalBand: 5.0,
    errorDescriptionVi: "'Although...' là mệnh đề phụ thuộc (Dependent Clause) nhưng bị ngắt bằng dấu chấm đứng đơn độc như một câu hoàn chỉnh, câu thứ hai dùng 'Still' không đúng chuẩn liên từ.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Ghép mệnh đề 'Although' trực tiếp vào mệnh đề chính bằng dấu phẩy.",
      "Bước 2: Loại bỏ từ 'Still' ở đầu mệnh đề chính vì 'Although' đã đảm nhận chức năng tương phản.",
      "Bước 3: Nâng cấp cụm từ 'traffic jams occur' thành 'severe vehicular congestion persists'.",
    ],
    collocationPalette: [
      {
        originalWord: "invested heavily in",
        c1Alternatives: ["allocated substantial funding to", "injected heavy capital into"],
        usageContextVi: "Diễn tả sự đầu tư ngân sách nhà nước quy mô lớn.",
      },
      {
        originalWord: "traffic jams occur",
        c1Alternatives: ["vehicular congestion persists", "gridlock remains rampant"],
        usageContextVi: "Mô tả tình trạng ùn tắc giao thông dai dẳng.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Sạch Lỗi Cơ Bản)",
        text: "Although the government has invested heavily in public transportation, traffic congestion still occurs during rush hours.",
        rationaleVi: "Nối liền mệnh đề nhượng bộ vào câu chính bằng dấu phẩy và chia thì Hiện tại hoàn thành.",
        stylisticFeatureVi: "Complex Sentence với liên từ nhượng bộ 'Although'.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Cấu Trúc Tương Phản Học Thuật 'Despite + Noun')",
        text: "Despite substantial governmental investment in public transit infrastructure, acute traffic congestion continues to plague metropolitan centers during peak periods.",
        rationaleVi: "Thay 'Although' bằng cụm giới từ 'Despite substantial governmental investment' và dùng động từ mạnh 'plague'.",
        stylisticFeatureVi: "Prepositional Phrase of Concession + Academic Collocations.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc Tương Phản Nhượng Bộ Kép & Bị Động)",
        text: "Notwithstanding massive capital injections into urban transit systems, severe vehicular gridlock remains an intractable dilemma during rush hours.",
        rationaleVi: "Sử dụng trạng từ học thuật đỉnh cao 'Notwithstanding' kết hợp cụm 'intractable dilemma' (nan đề khó giải quyết).",
        stylisticFeatureVi: "Advanced Academic Preposition + Metaphorical Idiom.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Despite technological advancements, traffic congestion in cities remains unsolved. What are the causes and solutions?",
  },
  {
    id: "clinic_s1_03",
    station: "grammar_surgery",
    stationNameVi: "Trạm 1 • Phẫu thuật Lỗi Ngữ Pháp Nền Tảng (Grammar Surgery)",
    title: "Bệnh án 03: Bất đồng hòa hợp Chủ - Vị & Lỗi bổ ngữ xen ngang",
    faultySentence: "The rapid development of digital technologies and online platforms are changing how people communicate.",
    diagnosticTags: ["Lỗi Subject-Verb Agreement", "Bất Đồng Hòa Hợp Số Ít/Nhiều", "GRA Band 5.5"],
    originalBand: 5.5,
    errorDescriptionVi: "Chủ ngữ thực sự là danh từ số ít 'The rapid development', nhưng người viết bị đánh lừa bởi cụm danh từ số nhiều xen ngang 'digital technologies and online platforms' nên chia động từ 'are' sai quy tắc.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Xác định danh từ trung tâm (Head Noun) đứng trước giới từ 'of' là 'development' (Số ít).",
      "Bước 2: Sửa trợ động từ 'are' thành 'is'.",
      "Bước 3: Nâng cấp 'changing how people communicate' thành 'fundamentally reshaping interpersonal communication'.",
    ],
    collocationPalette: [
      {
        originalWord: "changing how people communicate",
        c1Alternatives: ["revolutionizing interpersonal interaction", "transforming communication paradigms"],
        usageContextVi: "Mô tả sự thay đổi căn bản trong mô thức giao tiếp của xã hội.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Sạch Lỗi Cơ Bản)",
        text: "The rapid development of digital technologies and online platforms is changing how people interact with one another.",
        rationaleVi: "Sửa động từ 'is' chuẩn hòa hợp với chủ ngữ số ít 'development'.",
        stylisticFeatureVi: "Subject-Verb Agreement Corrected.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Động Từ Chuyển Hóa 'Is Revolutionizing')",
        text: "The proliferation of digital technologies is fundamentally revolutionizing contemporary patterns of human communication.",
        rationaleVi: "Thay 'rapid development' bằng 'proliferation' (sự nở rộ/bùng nổ) và dùng trạng từ 'fundamentally'.",
        stylisticFeatureVi: "Advanced Noun Head + Nuanced Adverb.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc Bị Động Khách Quan & Danh Từ Hóa)",
        text: "Interpersonal communication paradigms have been radically transformed by the exponential expansion of digital technologies.",
        rationaleVi: "Đưa tân ngữ 'Interpersonal communication paradigms' lên làm chủ ngữ bị động nhấn mạnh kết quả chuyển đổi sâu sắc.",
        stylisticFeatureVi: "Passive Transformation + Scientific Register.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Technology is changing the way people interact with each other. Is this a positive or negative development?",
  },
  {
    id: "clinic_s1_04",
    station: "grammar_surgery",
    stationNameVi: "Trạm 1 • Phẫu thuật Lỗi Ngữ Pháp Nền Tảng (Grammar Surgery)",
    title: "Bệnh án 04: Lỗi Cấu Trúc Song Hành Bị Gãy (Faulty Parallelism)",
    faultySentence: "Effective leaders must be able to inspire their team, communicating clearly, and make strategic decisions under pressure.",
    diagnosticTags: ["Lỗi Faulty Parallelism", "Gãy Song Hành Động Từ", "GRA Band 5.5"],
    originalBand: 5.5,
    errorDescriptionVi: "Sau cụm 'be able to', các động từ nối tiếp bằng liên từ 'and' phải đồng dạng nguyên mẫu (V-bare: inspire, communicate, make). Việc chèn 'communicating' làm gãy cấu trúc song hành.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Đưa 'communicating' về dạng nguyên thể 'communicate' để song hành với 'inspire' và 'make'.",
      "Bước 2: Nâng cấp các cụm thành ngữ học thuật về khả năng lãnh đạo.",
    ],
    collocationPalette: [
      {
        originalWord: "inspire their team",
        c1Alternatives: ["motivate subordinates", "galvanize their workforce"],
        usageContextVi: "Truyền cảm hứng và thúc đẩy đội ngũ nhân sự.",
      },
      {
        originalWord: "make strategic decisions",
        c1Alternatives: ["render critical strategic judgments", "formulate judicious policies"],
        usageContextVi: "Đưa ra các quyết sách chiến lược sáng suốt.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Sạch Lỗi Song Hành)",
        text: "Effective leaders must be able to inspire their team, communicate clearly, and make strategic decisions under pressure.",
        rationaleVi: "Đồng bộ hóa 3 động từ 'inspire, communicate, and make' sau 'be able to'.",
        stylisticFeatureVi: "Parallel Infinitive Structure.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Bộ Ba Song Hành Danh Từ 'The Capacity To...')",
        text: "Exemplary leadership requires the capacity to inspire subordinates, articulate visions with clarity, and execute critical decisions under acute pressure.",
        rationaleVi: "Sử dụng cụm 'the capacity to...' kết hợp bộ ba động từ C1 'inspire, articulate, execute'.",
        stylisticFeatureVi: "Parallel Triad + Executive Academic Register.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc Không Chỉ... Mà Còn... Song Hành Hoàn Hảo)",
        text: "True leadership entails not only galvanizing workforce morale and articulating strategic visions, but also rendering judicious judgments in high-stakes environments.",
        rationaleVi: "Cấu trúc song hành correlative 'not only... but also' với danh động từ (Gerunds) đồng dạng tuyệt đối.",
        stylisticFeatureVi: "Correlative Conjunction Parallelism + High-Stakes Lexicon.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: What qualities make an individual an effective business or political leader?",
  },
  {
    id: "clinic_s1_05",
    station: "grammar_surgery",
    stationNameVi: "Trạm 1 • Phẫu thuật Lỗi Ngữ Pháp Nền Tảng (Grammar Surgery)",
    title: "Bệnh án 05: Lỗi Đại từ không rõ đối tượng tham chiếu (Vague Pronoun Reference)",
    faultySentence: "When tourists visit historical monuments without respecting local rules, they get damaged, which angers the local community.",
    diagnosticTags: ["Lỗi Vague Pronoun", "Đại Từ Mơ Hồ", "GRA & CC Band 5.5"],
    originalBand: 5.5,
    errorDescriptionVi: "Đại từ 'they' có thể hiểu là 'tourists' (khách du lịch) hoặc 'historical monuments' (di tích lịch sử). Trong câu này, ý người viết là di tích bị hư hại nhưng đại từ gây hiểu lầm ngữ nghĩa nghiêm trọng.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Thay đại từ 'they' bằng danh từ cụ thể 'these heritage sites' hoặc 'the monuments'.",
      "Bước 2: Tái cấu trúc theo dạng nguyên nhân - kết quả trực tiếp.",
    ],
    collocationPalette: [
      {
        originalWord: "they get damaged",
        c1Alternatives: ["these cultural landmarks suffer structural deterioration", "irreparable damage is inflicted on these heritage sites"],
        usageContextVi: "Mô tả thiệt hại đối với các công trình di sản văn hóa.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Xác Định Danh Từ Rõ Ràng)",
        text: "When tourists visit historical monuments without respecting local regulations, these heritage sites often suffer damage, causing resentment among local residents.",
        rationaleVi: "Thay đại từ 'they' bằng 'these heritage sites' và 'angers' bằng 'causing resentment'.",
        stylisticFeatureVi: "Clear Noun Substitution + Participial Result.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Cấu Trúc Bị Động 'Irreparable Damage Is Inflicted')",
        text: "Irresponsible tourism frequently inflicts severe physical damage on historical monuments, thereby provoking widespread outrage among the local populace.",
        rationaleVi: "Danh từ hóa chủ ngữ 'Irresponsible tourism' và dùng cụm 'inflicts severe damage on'.",
        stylisticFeatureVi: "Nominalized Agent + Evocative Emotional Verb.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc 'The Failure To... Results In...')",
        text: "The failure of tourists to adhere to preservation guidelines inevitably subjects vulnerable historical landmarks to structural degradation, inciting deep-seated community grievance.",
        rationaleVi: "Cấu trúc danh từ trừu tượng 'The failure to adhere to... subjects X to structural degradation'.",
        stylisticFeatureVi: "Complex Abstract Nominalization + Formal Legalistic Tone.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: International tourism brings benefits to a country, but it can also cause damage. How can this be resolved?",
  },

  // =========================================================================
  // STATION 2: CHUẨN HÓA SẮC THÁI & COLLOCATIONS (COLLOCATION & NUANCE CALIBRATOR)
  // =========================================================================
  {
    id: "clinic_s2_01",
    station: "collocation_nuance",
    stationNameVi: "Trạm 2 • Chuẩn Hóa Sắc Thái & Collocations (Collocation & Nuance)",
    title: "Bệnh án 06: Dùng từ văn nói thông tục 'get money' & 'do good things'",
    faultySentence: "Developing countries should get more money from wealthy nations so they can do good things for their citizens.",
    diagnosticTags: ["Lỗi Văn Nói Thông Tục", "Collocation Yếu", "LR Band 5.0"],
    originalBand: 5.0,
    errorDescriptionVi: "Cụm 'get more money' và 'do good things' mang tính văn nói (Spoken English), thiếu tính học thuật và không mô tả được cơ chế viện trợ tài chính quốc tế.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Thay 'get more money' bằng 'secure financial subsidies / receive foreign development aid'.",
      "Bước 2: Thay 'do good things for their citizens' bằng 'enhance public welfare and foster socioeconomic development'.",
    ],
    collocationPalette: [
      {
        originalWord: "get more money",
        c1Alternatives: ["secure financial aid", "receive official development assistance (ODA)", "derive substantial grants"],
        usageContextVi: "Thu nhận nguồn vốn viện trợ phát triển quốc tế.",
      },
      {
        originalWord: "do good things for citizens",
        c1Alternatives: ["elevate civic living standards", "bolster public welfare infrastructure", "ameliorate domestic poverty"],
        usageContextVi: "Cải thiện phúc lợi xã hội và nâng cao đời sống nhân dân.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Từ Vựng Trang Trọng Hơn)",
        text: "Developing nations should receive financial assistance from wealthy countries to improve living standards for their citizens.",
        rationaleVi: "Thay 'money' bằng 'financial assistance' và 'do good things' bằng 'improve living standards'.",
        stylisticFeatureVi: "Formal Register Transformation.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Collocations Kinh Tế C1 'Foreign Aid' & 'Public Welfare')",
        text: "Developing countries ought to secure greater foreign aid from affluent economies to bolster public welfare and stimulate economic growth.",
        rationaleVi: "Sử dụng 'secure foreign aid', 'affluent economies' và 'bolster public welfare'.",
        stylisticFeatureVi: "Macro-economic Academic Collocations.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc 'Crucial Impetus' & Danh Từ Hóa)",
        text: "The provision of international financial subsidies by developed nations serves as a vital catalyst for socio-economic progress and poverty alleviation in impoverished regions.",
        rationaleVi: "Biến đổi thành 'The provision of international financial subsidies... serves as a vital catalyst'.",
        stylisticFeatureVi: "Nominal Subject + Catalyst Metaphor + Policy Tone.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Richer countries should provide financial assistance to poorer countries. To what extent do you agree?",
  },
  {
    id: "clinic_s2_02",
    station: "collocation_nuance",
    stationNameVi: "Trạm 2 • Chuẩn Hóa Sắc Thái & Collocations (Collocation & Nuance)",
    title: "Bệnh án 07: Lỗi lạm dụng tính từ chung chung 'big problem' & 'bad impact'",
    faultySentence: "Climate change is a big problem that makes a bad impact on the environment and creates a lot of disasters.",
    diagnosticTags: ["Lỗi Tính Từ Sáo Rỗng", "Cụm Từ 'Big Problem'", "LR Band 5.0"],
    originalBand: 5.0,
    errorDescriptionVi: "Từ 'big problem', 'bad impact', 'a lot of disasters' là những từ ngữ trẻ con, không thể hiện được mức độ đe dọa sinh thái khẩn cấp của biến đổi khí hậu.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Nâng cấp 'big problem' thành 'pressing existential crisis / grave ecological challenge'.",
      "Bước 2: Thay 'makes a bad impact on' bằng 'exerts catastrophic ramifications on'.",
      "Bước 3: Thay 'creates a lot of disasters' bằng 'triggers frequent extreme weather anomalies'.",
    ],
    collocationPalette: [
      {
        originalWord: "big problem",
        c1Alternatives: ["pressing global crisis", "grave ecological dilemma", "unprecedented environmental challenge"],
        usageContextVi: "Mô tả khủng hoảng sinh thái mang tính sống còn.",
      },
      {
        originalWord: "makes a bad impact on",
        c1Alternatives: ["exerts catastrophic ramifications on", "wreaks havoc on", "inflicts severe degradation on"],
        usageContextVi: "Gây ra những hệ lụy thảm khốc cho môi trường tự nhiên.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Chuẩn Hóa Từ Vựng Môi Trường)",
        text: "Climate change is a major global issue that has a negative impact on the environment and leads to frequent natural disasters.",
        rationaleVi: "Dùng 'major global issue', 'negative impact' và 'natural disasters'.",
        stylisticFeatureVi: "Standard Academic Word Choice.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Cụm Từ C1 'Catastrophic Ramifications')",
        text: "Global warming poses a formidable environmental threat, exerting devastating ramifications on natural ecosystems and precipitating extreme weather events.",
        rationaleVi: "Sử dụng 'poses a formidable threat', 'exerting devastating ramifications', 'precipitating extreme weather events'.",
        stylisticFeatureVi: "Environmental Science Register + Participle Modifier.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc 'Not Merely... But An Existential Threat')",
        text: "Anthropogenic climate change represents an existential ecological crisis, relentlessly disrupting biological equilibriums and exacerbating the frequency of catastrophic meteorological phenomena.",
        rationaleVi: "Từ vựng C2 'Anthropogenic', 'existential ecological crisis', 'disrupting biological equilibriums', 'meteorological phenomena'.",
        stylisticFeatureVi: "Scientific Climatology Discourse + Flawless Nuance.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Some people think climate change is the most serious threat to human survival today. Discuss.",
  },
  {
    id: "clinic_s2_03",
    station: "collocation_nuance",
    stationNameVi: "Trạm 2 • Chuẩn Hóa Sắc Thái & Collocations (Collocation & Nuance)",
    title: "Bệnh án 08: Kết hợp sai động từ đi kèm (Collocation Clash: 'make a research')",
    faultySentence: "Scientists should make more research about artificial intelligence to know if it is dangerous.",
    diagnosticTags: ["Lỗi Kết Hợp Động Từ", "Bẫy 'Make Research'", "LR Band 5.5"],
    originalBand: 5.5,
    errorDescriptionVi: "Trong tiếng Anh học thuật, danh từ không đếm được 'research' đi với động từ 'conduct / undertake / carry out', tuyệt đối không đi với 'make'. 'To know if it is dangerous' quá non nớt.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Thay 'make more research' bằng 'conduct comprehensive research / undertake rigorous investigations'.",
      "Bước 2: Thay 'to know if it is dangerous' bằng 'to assess its potential ethical and existential risks'.",
    ],
    collocationPalette: [
      {
        originalWord: "make research",
        c1Alternatives: ["conduct extensive research into", "undertake rigorous empirical investigations into", "pursue scholarly inquiries into"],
        usageContextVi: "Thực hiện các nghiên cứu khoa học chuyên sâu.",
      },
      {
        originalWord: "to know if it is dangerous",
        c1Alternatives: ["to evaluate potential hazards", "to ascertain the existential perils", "to gauge risk factors"],
        usageContextVi: "Đánh giá các nguy cơ và hiểm họa tiềm tàng.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Sửa Động Từ Chuẩn 'Conduct Research')",
        text: "Scientists ought to conduct more research on artificial intelligence to determine whether it poses safety risks to society.",
        rationaleVi: "Sửa 'make' thành 'conduct' và thay 'know if' bằng 'determine whether'.",
        stylisticFeatureVi: "Accurate Collocation Correction.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Cụm 'Undertake Rigorous Investigations')",
        text: "Researchers must undertake comprehensive investigations into artificial intelligence to evaluate its potential ethical implications and socioeconomic hazards.",
        rationaleVi: "Dùng 'undertake comprehensive investigations into', 'ethical implications', 'socioeconomic hazards'.",
        stylisticFeatureVi: "High-level Academic Collocations.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc 'Rigorous Empirical Scrutiny Is Imperative')",
        text: "Rigorous empirical scrutiny into autonomous algorithms is imperative to ascertain the extent to which artificial intelligence threatens human agency.",
        rationaleVi: "Danh từ hóa 'Rigorous empirical scrutiny', dùng tính từ 'imperative' và cụm C2 'threatens human agency'.",
        stylisticFeatureVi: "Philosophical AI Epistemology Register.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Artificial intelligence has the potential to transform our world. Do the advantages outweigh the disadvantages?",
  },
  {
    id: "clinic_s2_04",
    station: "collocation_nuance",
    stationNameVi: "Trạm 2 • Chuẩn Hóa Sắc Thái & Collocations (Collocation & Nuance)",
    title: "Bệnh án 09: Dịch thuật ngữ tiếng Việt sang tiếng Anh thô ráp ('do an improvement')",
    faultySentence: "The government needs to do an improvement in hospitals because many poor people cannot pay for expensive medical care.",
    diagnosticTags: ["Lỗi Dịch Word-by-Word", "Bẫy 'Do an Improvement'", "LR Band 5.0"],
    originalBand: 5.0,
    errorDescriptionVi: "Dịch từ tiếng Việt 'làm một sự cải thiện' thành 'do an improvement'. Chuẩn học thuật là 'upgrade healthcare infrastructure' hoặc 'overhaul the medical system'.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Thay 'do an improvement in' bằng 'upgrade / modernize / overhaul the healthcare infrastructure'.",
      "Bước 2: Thay 'cannot pay for expensive medical care' bằng 'are priced out of quality treatment / cannot afford exorbitant medical fees'.",
    ],
    collocationPalette: [
      {
        originalWord: "do an improvement in hospitals",
        c1Alternatives: ["upgrade public healthcare facilities", "overhaul medical infrastructure", "modernize hospital amenities"],
        usageContextVi: "Nâng cấp và hiện đại hóa hệ thống y tế công cộng.",
      },
      {
        originalWord: "cannot pay for expensive care",
        c1Alternatives: ["are economically marginalized from treatment", "face prohibitive healthcare costs", "struggle with exorbitant medical expenditures"],
        usageContextVi: "Bị cản trở tiếp cận y tế do chi phí đắt đỏ.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Sạch Lỗi Dịch Thô)",
        text: "The government should improve public hospitals because underprivileged citizens cannot afford expensive medical treatment.",
        rationaleVi: "Dùng động từ 'improve' trực tiếp và thay 'poor people' bằng 'underprivileged citizens'.",
        stylisticFeatureVi: "Standard Formal Transformation.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Cụm C1 'Subsidize Healthcare' & 'Exorbitant Fees')",
        text: "Authorities ought to substantially upgrade public healthcare facilities to ensure that marginalized demographics are not deprived of essential medical treatment due to exorbitant costs.",
        rationaleVi: "Sử dụng 'substantially upgrade public healthcare facilities', 'marginalized demographics', 'exorbitant costs'.",
        stylisticFeatureVi: "Public Policy Academic Discourse.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc 'State-Sponsored Overhaul Is Crucial')",
        text: "A state-sponsored overhaul of the public health infrastructure is paramount to dismantling financial barriers that currently exclude low-income households from adequate therapeutic care.",
        rationaleVi: "Cụm danh từ 'A state-sponsored overhaul', động từ ẩn dụ 'dismantling financial barriers', từ vựng C2 'therapeutic care'.",
        stylisticFeatureVi: "Systemic Healthcare Reform Register.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Some people believe that healthcare should be free for all citizens. To what extent do you agree or disagree?",
  },
  {
    id: "clinic_s2_05",
    station: "collocation_nuance",
    stationNameVi: "Trạm 2 • Chuẩn Hóa Sắc Thái & Collocations (Collocation & Nuance)",
    title: "Bệnh án 10: Dùng từ cảm tính chủ quan 'make people super happy'",
    faultySentence: "Having a good work-life balance will make people super happy and they will work much better for their company.",
    diagnosticTags: ["Lỗi Cảm Tính Chủ Quan", "Từ Vựng 'Super Happy'", "LR Band 5.0"],
    originalBand: 5.0,
    errorDescriptionVi: "Từ 'super happy' và 'work much better' mang sắc thái thân mật, thiếu khách quan khoa học. Trong văn học thuật cần dùng các khái niệm như 'psychological well-being' và 'workplace productivity'.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Thay 'make people super happy' bằng 'foster employee job satisfaction and psychological well-being'.",
      "Bước 2: Thay 'work much better' bằng 'maximize labor productivity and professional performance'.",
    ],
    collocationPalette: [
      {
        originalWord: "super happy",
        c1Alternatives: ["enhance occupational well-being", "bolster employee satisfaction", "foster mental tranquility"],
        usageContextVi: "Cải thiện mức độ hạnh phúc và thỏa mãn nghề nghiệp.",
      },
      {
        originalWord: "work much better",
        c1Alternatives: ["enhance workplace productivity", "optimize professional efficiency", "deliver superior vocational output"],
        usageContextVi: "Tối ưu hóa năng suất và hiệu quả lao động.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Khách Quan Hóa Từ Ngữ)",
        text: "Maintaining a healthy work-life balance enhances employee satisfaction and leads to higher productivity at work.",
        rationaleVi: "Thay 'super happy' bằng 'enhances employee satisfaction' và 'higher productivity'.",
        stylisticFeatureVi: "Objective Tone Calibration.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Cụm C1 'Psychological Well-being' & 'Efficiency')",
        text: "Achieving a sustainable work-life equilibrium not only fosters psychological well-being but also optimizes workplace efficiency and organizational loyalty.",
        rationaleVi: "Cấu trúc 'not only... but also', cụm từ C1 'sustainable work-life equilibrium', 'organizational loyalty'.",
        stylisticFeatureVi: "Correlative Structure + Human Resource Lexicon.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Danh Từ Hóa Kép & Cấu Trúc Nhân Quả Chặt Chẽ)",
        text: "The harmonious alignment of professional responsibilities with personal life serves as a prerequisite for mitigating occupational burnout, thereby driving superior corporate performance.",
        rationaleVi: "Chủ ngữ danh từ C2 'The harmonious alignment of...', cụm 'prerequisite for mitigating occupational burnout', mệnh đề phân từ 'thereby driving...'.",
        stylisticFeatureVi: "Advanced Organizational Psychology Discourse.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Some companies encourage employees to work long hours, while others emphasize work-life balance. Discuss.",
  },

  // =========================================================================
  // STATION 3: NÂNG CẤP CÚ PHÁP C1/C2 (SYNTACTIC UPGRADE ELEVATION)
  // =========================================================================
  {
    id: "clinic_s3_01",
    station: "syntactic_upgrade",
    stationNameVi: "Trạm 3 • Nâng Cấp Cú Pháp C1/C2 (Syntactic Upgrade Elevation)",
    title: "Bệnh án 11: Nâng cấp câu đơn ghép bằng Kỹ thuật Danh từ hóa (Nominalization)",
    faultySentence: "When cities expand quickly, they destroy natural habitats, and this makes many wild animals die out.",
    diagnosticTags: ["Câu Đơn Điệp Từ", "Thiếu Danh Từ Hóa", "GRA Band 5.5"],
    originalBand: 5.5,
    errorDescriptionVi: "Câu dùng quá nhiều mệnh đề phụ thuộc ngắn và liên từ kết hợp 'and this makes...', khiến câu văn mang tính tường thuật thời gian thay vì phân tích học thuật cô đọng.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Chuyển động từ 'cities expand quickly' thành cụm danh từ 'Rapid urban sprawl / Rapid urbanization'.",
      "Bước 2: Chuyển động từ 'destroy habitats' thành 'the destruction / fragmentation of natural habitats'.",
      "Bước 3: Chuyển 'makes animals die out' thành 'accelerates biodiversity loss / species extinction'.",
    ],
    collocationPalette: [
      {
        originalWord: "cities expand quickly",
        c1Alternatives: ["rapid urban sprawl", "uncontrolled metropolitan expansion", "accelerated urbanization"],
        usageContextVi: "Sự mở rộng và lan tỏa đô thị nhanh chóng.",
      },
      {
        originalWord: "makes animals die out",
        c1Alternatives: ["drives endemic fauna toward extinction", "precipitates catastrophic biodiversity loss", "threatens wildlife survival"],
        usageContextVi: "Đẩy các loài động vật hoang dã đến nguy cơ tuyệt chủng.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Rút Gọn Mệnh Đề)",
        text: "Rapid urban expansion destroys natural habitats, leading to the extinction of various wildlife species.",
        rationaleVi: "Danh từ hóa 'Rapid urban expansion' và dùng mệnh đề phân từ 'leading to...'.",
        stylisticFeatureVi: "Participle Result Clause.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Danh Từ Hóa Toàn Diện 'The Encroachment Of...')",
        text: "The relentless encroachment of urban sprawl into virgin ecosystems precipitates extensive habitat destruction, threatening vulnerable fauna with extinction.",
        rationaleVi: "Sử dụng cụm danh từ đắt giá 'The relentless encroachment of urban sprawl' và từ C1 'fauna'.",
        stylisticFeatureVi: "Dense Nominalization + Participial Modifier.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc Tác Động Ép Lực C2)",
        text: "Unchecked metropolitan expansion inexorably fragments indigenous ecosystems, thereby driving ecologically fragile species toward the precipice of extinction.",
        rationaleVi: "Trạng từ 'inexorably', động từ mạnh 'fragments indigenous ecosystems' và hình tượng ẩn dụ 'toward the precipice of extinction'.",
        stylisticFeatureVi: "Literary Academic Register + Precision Syntax.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Human activities have negative effects on plant and animal species. What are the causes and what measures can be taken?",
  },
  {
    id: "clinic_s3_02",
    station: "syntactic_upgrade",
    stationNameVi: "Trạm 3 • Nâng Cấp Cú Pháp C1/C2 (Syntactic Upgrade Elevation)",
    title: "Bệnh án 12: Ứng dụng Cấu trúc Đảo ngữ Trạng từ (Adverbial Inversion)",
    faultySentence: "Online learning has never become so popular as it is today, and traditional classrooms are rarely replaced completely.",
    diagnosticTags: ["Cú Pháp Đơn Điệu", "Thiếu Đảo Ngữ Học Thuật", "GRA Band 6.0"],
    originalBand: 6.0,
    errorDescriptionVi: "Câu ở trật tự từ xuôi thông thường. Khi có các phó từ phủ định 'Never' hoặc 'Rarely', việc đảo ngữ sẽ tạo ra trọng âm học thuật ấn tượng và phô diễn ngữ pháp Band 8.0+.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Đưa 'Never before' lên đầu câu và đảo trợ động từ 'has' lên trước chủ ngữ 'online education'.",
      "Bước 2: Sử dụng 'Seldom / Rarely' ở mệnh đề sau với cấu trúc đảo ngữ tương ứng.",
    ],
    collocationPalette: [
      {
        originalWord: "has never become so popular",
        c1Alternatives: ["has digital learning witnessed such widespread adoption", "has distance education achieved such prominence"],
        usageContextVi: "Sự phổ cập chưa từng có tiền lệ của giáo dục trực tuyến.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Câu Ghép Tiêu Chuẩn)",
        text: "Online learning has achieved unprecedented popularity in recent years, yet traditional classrooms remain essential.",
        rationaleVi: "Dùng tính từ C1 'unprecedented popularity' và liên từ 'yet'.",
        stylisticFeatureVi: "Compound Sentence with Advanced Lexis.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Đảo Ngữ 'Never Before Has...')",
        text: "Never before has digital education experienced such widespread adoption, transforming pedagogical paradigms on a global scale.",
        rationaleVi: "Cấu trúc đảo ngữ 'Never before has digital education experienced...' kết hợp mệnh đề phân từ.",
        stylisticFeatureVi: "Negative Adverbial Inversion.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Đảo Ngữ Kép Phức Hợp 'Seldom Has... Nor Can...')",
        text: "Seldom in modern history has the pedagogical landscape undergone such radical democratization through e-learning; nonetheless, physical academies remain irreplaceable anchors of holistic mentorship.",
        rationaleVi: "Đảo ngữ đỉnh cao 'Seldom in modern history has...', dùng từ C2 'pedagogical landscape', 'democratization', 'holistic mentorship'.",
        stylisticFeatureVi: "Classical Rhetorical Inversion + Semicolon Transition.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Some people believe that online education will completely replace traditional schools in the future. Discuss.",
  },
  {
    id: "clinic_s3_03",
    station: "syntactic_upgrade",
    stationNameVi: "Trạm 3 • Nâng Cấp Cú Pháp C1/C2 (Syntactic Upgrade Elevation)",
    title: "Bệnh án 13: Ứng dụng Mệnh đề Phân từ Đứng đầu câu (Fronted Participial Clause)",
    faultySentence: "Because governments face limited annual budgets, they have to prioritize funding for hospitals instead of museums.",
    diagnosticTags: ["Cấu Trúc 'Because' Điệp Lại", "Thiếu Rút Gọn Phân Từ", "GRA Band 5.5"],
    originalBand: 5.5,
    errorDescriptionVi: "Lạm dụng liên từ 'Because' ở đầu câu khiến nhịp văn đều đều. Có thể rút gọn thành phân từ quá khứ (Past Participle) hoặc phân từ hiện tại (Present Participle) để tăng tính linh hoạt cú pháp.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Rút gọn mệnh đề phụ 'Because governments face...' thành 'Confronted with / Constrained by finite fiscal resources...'.",
      "Bước 2: Mệnh đề chính giữ nguyên chủ ngữ 'policymakers' để đảm bảo tính hòa hợp chủ ngữ phân từ.",
    ],
    collocationPalette: [
      {
        originalWord: "face limited annual budgets",
        c1Alternatives: ["constrained by fiscal limitations", "grappling with budgetary deficits", "confronted with stringent financial constraints"],
        usageContextVi: "Bị gò bó bởi nguồn ngân sách hạn hẹp.",
      },
      {
        originalWord: "prioritize funding for hospitals",
        c1Alternatives: ["channel public capital toward essential healthcare infrastructure", "give precedence to medical expenditures"],
        usageContextVi: "Ưu tiên phân bổ vốn cho cơ sở hạ tầng y tế công.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Cấu Trúc 'Due to Fiscal Limits')",
        text: "Due to limited financial resources, state authorities must prioritize healthcare over cultural institutions such as museums.",
        rationaleVi: "Thay 'Because' bằng cụm giới từ 'Due to limited financial resources'.",
        stylisticFeatureVi: "Prepositional Cause Clause.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Phân Từ Bị Động 'Constrained by Fiscal Limitations')",
        text: "Constrained by finite municipal budgets, policymakers are compelled to prioritize public healthcare infrastructure over cultural institutions.",
        rationaleVi: "Mệnh đề phân từ quá khứ 'Constrained by finite municipal budgets' đứng đầu câu tạo độ nén thông tin cao.",
        stylisticFeatureVi: "Fronted Past Participial Modifier.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Phân Từ Hiện Tại Kết Hợp Bị Động Ép Buộc C2)",
        text: "Grappling with severe fiscal constraints, state treasuries are inevitably obliged to channel capital toward critical medical utilities rather than heritage conservation.",
        rationaleVi: "Phân từ 'Grappling with severe fiscal constraints', cấu trúc 'channel capital toward... rather than...'.",
        stylisticFeatureVi: "Advanced Participial Ingress + Resource Allocation Register.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Some people think that governments should spend more money on public services than on the arts. Discuss.",
  },
  {
    id: "clinic_s3_04",
    station: "syntactic_upgrade",
    stationNameVi: "Trạm 3 • Nâng Cấp Cú Pháp C1/C2 (Syntactic Upgrade Elevation)",
    title: "Bệnh án 14: Ứng dụng Thể Bị Động Khách Quan (Impersonal Passive / Academic Hedging)",
    faultySentence: "I think that artificial intelligence will take away many jobs, so people need to learn new skills.",
    diagnosticTags: ["Lỗi Dùng 'I Think' Cảm Tính", "Thiếu Bị Động Khách Quan", "GRA Band 5.5"],
    originalBand: 5.5,
    errorDescriptionVi: "Sử dụng 'I think that' trong câu lập luận chung làm giảm tính khách quan khoa học. Cần dùng cấu trúc Bị động khách quan 'It is widely contended that...' hoặc 'Artificial intelligence is anticipated to...'.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Thay 'I think that' bằng 'It is widely acknowledged that...' hoặc 'There is growing consensus that...'.",
      "Bước 2: Nâng cấp 'take away many jobs' thành 'automate routine employment / displace traditional labor'.",
      "Bước 3: Nâng cấp 'learn new skills' thành 'pursue continuous upskilling and professional agility'.",
    ],
    collocationPalette: [
      {
        originalWord: "I think that",
        c1Alternatives: ["It is widely contended that", "Empirical evidence suggests that", "A growing body of research indicates that"],
        usageContextVi: "Khách quan hóa lập trường học thuật.",
      },
      {
        originalWord: "take away many jobs",
        c1Alternatives: ["displace routine manual labor", "obviate traditional employment roles", "precipitate technological unemployment"],
        usageContextVi: "Hiện tượng thất nghiệp do công nghệ tự động hóa.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Bị Động Khách Quan Cơ Bản)",
        text: "It is widely believed that artificial intelligence will displace many traditional jobs, necessitating continuous reskilling for the workforce.",
        rationaleVi: "Thay 'I think' bằng 'It is widely believed that' và dùng phân từ 'necessitating continuous reskilling'.",
        stylisticFeatureVi: "Impersonal Passive Structure.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Cấu Trúc 'AI Is Projected To...')",
        text: "Artificial intelligence is widely projected to automate substantial segments of the labor market, thereby mandating extensive professional upskilling across diverse industries.",
        rationaleVi: "Sử dụng 'is widely projected to automate...', 'mandating extensive professional upskilling'.",
        stylisticFeatureVi: "Passive Expectation Syntax + Industry Lexicon.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc 'The Inevitable Proliferation Of AI Underscores...')",
        text: "The inexorable rise of autonomous automation underscores the imperative for continuous workforce retraining, lest widespread technological redundancy destabilize the economy.",
        rationaleVi: "Cấu trúc danh từ C2 'The inexorable rise of...', dùng liên từ giả định hiếm 'lest + subjunctive' (để không bị).",
        stylisticFeatureVi: "Archaic-Academic Subjunctive Structure + Labor Economics Discourse.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Robots and AI are replacing human workers. What are the consequences of this trend?",
  },
  {
    id: "clinic_s3_05",
    station: "syntactic_upgrade",
    stationNameVi: "Trạm 3 • Nâng Cấp Cú Pháp C1/C2 (Syntactic Upgrade Elevation)",
    title: "Bệnh án 15: Ứng dụng Câu Chẻ Nhấn Mạnh (Cleft Sentence: 'It is X that...')",
    faultySentence: "Individual awareness helps protect the environment, but strong government laws really stop big corporations from polluting.",
    diagnosticTags: ["Cú Pháp Bình Thường", "Thiếu Cấu Trúc Nhấn Mạnh", "GRA Band 6.0"],
    originalBand: 6.0,
    errorDescriptionVi: "Câu dùng từ nối đơn giản 'but strong government laws really stop...'. Việc sử dụng Câu chẻ 'It is stringent legislative enforcement that...' sẽ tạo điểm nhấn lập luận đanh thép chuẩn Band 8.0+.",
    clinicalSurgeryStepsVi: [
      "Bước 1: Chuyển vế đối lập thành câu chẻ: 'While individual awareness is commendable, it is rigorous state regulation that serves as the ultimate deterrent...'.",
      "Bước 2: Thay 'stop big corporations from polluting' bằng 'deter industrial conglomerates from discharging toxic effluents'.",
    ],
    collocationPalette: [
      {
        originalWord: "strong government laws",
        c1Alternatives: ["stringent legislative frameworks", "rigorous statutory mandates", "binding regulatory oversight"],
        usageContextVi: "Hệ thống khung pháp lý và chế tài nghiêm ngặt của nhà nước.",
      },
      {
        originalWord: "stop corporations from polluting",
        c1Alternatives: ["curb corporate ecological malpractice", "deter industrial conglomerates from environmental degradation", "penalize industrial polluters"],
        usageContextVi: "Ngăn chặn và trừng phạt các hành vi gây ô nhiễm của doanh nghiệp.",
      },
    ],
    solutions: [
      {
        band: 6.5,
        titleVi: "Phương án Band 6.5 (Cấu Trúc Tương Phản Chuẩn)",
        text: "While individual awareness contributes to environmental conservation, strict governmental regulations are essential to prevent corporate pollution.",
        rationaleVi: "Dùng liên từ nhượng bộ 'While' và thay 'strong laws' bằng 'strict governmental regulations'.",
        stylisticFeatureVi: "Subordinating Concession Clause.",
      },
      {
        band: 7.5,
        titleVi: "Phương án Band 7.5 (Câu Chẻ Nhấn Mạnh 'It Is X That Y')",
        text: "Although civic environmental consciousness is beneficial, it is stringent statutory regulation that genuinely deters corporate polluters from degrading natural ecosystems.",
        rationaleVi: "Ứng dụng câu chẻ 'it is stringent statutory regulation that genuinely deters...' để làm nổi bật tác nhân quyết định.",
        stylisticFeatureVi: "Cleft Sentence of Emphasis.",
      },
      {
        band: 8.5,
        titleVi: "Phương án Band 8.5+ (Cấu Trúc Nhượng Bộ Tuyệt Đối & Câu Chẻ Đa Tầng)",
        text: "Notwithstanding the merits of grassroots ecological awareness, it is robust legislative enforcement and prohibitive corporate sanctions that constitute the paramount bulwark against industrial contamination.",
        rationaleVi: "Cụm 'Notwithstanding the merits of...', câu chẻ 'it is robust legislative enforcement... that constitute the paramount bulwark' (lá chắn tối thượng).",
        stylisticFeatureVi: "Advanced Cleft Construction + Jurisprudential Metaphor.",
      },
    ],
    ieltsEssayPromptVi: "Writing Task 2: Some people believe that individuals can protect the environment, while others believe that only governments can make a difference. Discuss.",
  },
];

// Backward compatibility for legacy exercises
export interface ModelSolution {
  band: "Band 6.5" | "Band 7.5" | "Band 8.5+";
  text?: string;
  sentence?: string;
  explanation: string;
  upgrades?: string[];
}

export type GrammarPathologyType =
  | "fragment"
  | "run_on"
  | "comma_splice"
  | "dangling_modifier"
  | "parallelism"
  | "subject_verb";

export interface GrammarPathologyItem {
  type: GrammarPathologyType;
  nameVi: string;
  nameEn: string;
  badgeColor: string;
  shortDescription: string;
  badExample: string;
  goodExample: string;
  fixRule: string;
  cambridgeRule: string;
}

export const GRAMMAR_PATHOLOGIES: GrammarPathologyItem[] = [
  {
    type: "comma_splice",
    nameVi: "Bệnh Phẩy Nối Tùy Tiện",
    nameEn: "Comma Splice",
    badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    shortDescription: "Nối hai mệnh đề độc lập hoàn chỉnh chỉ bằng một dấu phẩy mà không có liên từ.",
    badExample: "Technology is advancing, it changes how we communicate.",
    goodExample: "Technology is advancing, which fundamentally changes how we communicate.",
    fixRule: "Thêm liên từ FANBOYS, dùng đại từ quan hệ 'which', hoặc thay bằng dấu chấm phẩy.",
    cambridgeRule: "Bị trừ điểm nặng ở tiêu chí GRA Band 5.0 do lỗi chấm câu cấu trúc cơ bản.",
  },
  {
    type: "fragment",
    nameVi: "Bệnh Câu Cụt Không Vị Ngữ",
    nameEn: "Sentence Fragment",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    shortDescription: "Một mệnh đề phụ thuộc đứng độc lập như câu hoàn chỉnh hoặc câu thiếu động từ chính.",
    badExample: "Although governments invest in public transport. Traffic remains congested.",
    goodExample: "Although governments invest in public transport, traffic remains congested.",
    fixRule: "Nối mệnh đề phụ thuộc vào mệnh đề chính bằng dấu phẩy.",
    cambridgeRule: "Khiến người đọc đứt mạch thông tin, giới hạn điểm GRA ở mức dưới 6.0.",
  },
  {
    type: "run_on",
    nameVi: "Bệnh Câu Dây Cà Ra Dây Muống",
    nameEn: "Run-on Sentence",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    shortDescription: "Ghép nhiều mệnh đề độc lập lại với nhau mà không có bất kỳ dấu câu hay từ nối nào.",
    badExample: "Many cities are crowded people struggle to find affordable housing.",
    goodExample: "Many cities are crowded; consequently, people struggle to find affordable housing.",
    fixRule: "Tách câu hoặc dùng trạng từ liên kết (Consequently, Therefore).",
    cambridgeRule: "Làm mất tính mạch lạc CC và gây lỗi cú pháp nghiêm trọng trong bài thi Task 2.",
  },
  {
    type: "parallelism",
    nameVi: "Bệnh Gãy Cấu Trúc Song Hành",
    nameEn: "Faulty Parallelism",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    shortDescription: "Các thành phần trong chuỗi liệt kê hoặc sau 'not only... but also' không cùng từ loại.",
    badExample: "Leaders must inspire, communicate clearly, and making decisions.",
    goodExample: "Leaders must inspire, communicate clearly, and make decisions.",
    fixRule: "Đồng bộ hóa tất cả các động từ về cùng dạng nguyên mẫu hoặc V-ing.",
    cambridgeRule: "Song hành chuẩn xác là điều kiện tiên quyết để đạt GRA Band 7.0+.",
  },
  {
    type: "subject_verb",
    nameVi: "Bệnh Bất Đồng Chủ - Vị",
    nameEn: "Subject-Verb Disagreement",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    shortDescription: "Chia động từ số nhiều theo cụm bổ ngữ xen ngang thay vì danh từ trung tâm số ít.",
    badExample: "The rapid expansion of online platforms are reshaping media.",
    goodExample: "The rapid expansion of online platforms is reshaping media.",
    fixRule: "Xác định đúng danh từ trung tâm đứng trước giới từ 'of'.",
    cambridgeRule: "Lỗi bất đồng số ít/nhiều làm giám khảo đánh giá bài viết thiếu độ chính xác (Accuracy).",
  },
];

export interface SentenceClinicExercise {
  id: string;
  contextType: string;
  topic: string;
  bugTokenIndices: number[];
  tokens: string[];
  faultySentence: string;
  buggySentence: string;
  pathologyId: string;
  pathologyName: string;
  pathologyType: GrammarPathologyType;
  pathologyExplanation: string;
  cambridgeGRAImpact: string;
  hint: string;
  explanation: string;
  band65Solution: string;
  band80Solution: string;
  collocations: string[];
  modelSolutions: ModelSolution[];
}

export const MOCK_SENTENCE_CLINIC_EXERCISES: SentenceClinicExercise[] = MOCK_SENTENCE_CLINIC_CASES.map((c, idx) => {
  const words = c.faultySentence.split(/\s+/);
  const pathTypes: GrammarPathologyType[] = [
    "comma_splice",
    "fragment",
    "subject_verb",
    "parallelism",
    "run_on",
  ];
  const assignedType: GrammarPathologyType = pathTypes[idx % pathTypes.length];

  return {
    id: c.id,
    contextType: c.stationNameVi,
    topic: c.title,
    bugTokenIndices: [0, 1],
    tokens: words,
    faultySentence: c.faultySentence,
    buggySentence: c.faultySentence,
    pathologyId: `path_${idx}`,
    pathologyName: c.diagnosticTags[0] || "Grammar Trap",
    pathologyType: assignedType,
    pathologyExplanation: c.errorDescriptionVi,
    cambridgeGRAImpact: "Giới hạn điểm tiêu chí GRA ở mức dưới Band 6.0 nếu không được khắc phục triệt để.",
    hint: c.errorDescriptionVi,
    explanation: c.errorDescriptionVi,
    band65Solution: c.solutions[0]?.text || c.faultySentence,
    band80Solution: c.solutions[1]?.text || c.solutions[0]?.text || c.faultySentence,
    collocations: c.collocationPalette.flatMap((p) => p.c1Alternatives),
    modelSolutions: c.solutions.map((s) => ({
      band: (s.band === 8.5 ? "Band 8.5+" : s.band === 7.5 ? "Band 7.5" : "Band 6.5") as "Band 6.5" | "Band 7.5" | "Band 8.5+",
      text: s.text,
      sentence: s.text,
      explanation: s.rationaleVi,
      upgrades: [s.stylisticFeatureVi],
    })),
  };
});

