/**
 * Cambridge Academic Reading 14-Type Taxonomy Dataset
 * 4 Tactical Clusters: Fact & Opinion, Matching & Headings, Summary & Completion, Multiple Choice
 * Structured into 3 Pedagogical Steps + 5-Question Gateway Mastery Quiz
 */

export interface ReadingMethodStep1Principles {
  conceptSummaryVi: string;
  recommendedTimeMinutes: number;
  tacticalRulesVi: string[];
  cognitiveFlowVi: string[];
}

import { VocabBreakdownWord } from "@/types/theoryBookmarks";

export interface ReadingExaminerTrapItem {
  trapNameVi: string;
  trapMechanismVi: string;
  originalTextExcerpt: string;
  translationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  deceptiveQuestionStatement: string;
  deceptiveOptionOrAnswer: string;
  correctAnswer: string;
  examinerInsightVi: string;
}

export interface ReadingModelWalkthrough {
  passageSnippet: string;
  translationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  questionItem: string;
  stepByStepAuditVi: string[];
  paraphrasePairs: Array<{ questionKeyword: string; passageKeyword: string }>;
  concludingTipVi: string;
}

export interface MethodologyQuizItem {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  trapCategory: "careless_reading" | "paraphrase_trap" | "singular_plural" | "grammar";
  trapAnalysis: string;
}

export interface ReadingMethodLesson {
  id: string;
  title: string;
  cluster: "foundation" | "fact_opinion" | "matching_headings" | "summary_completion" | "multiple_choice";
  clusterNameVi: string;
  difficulty: "Band 4.5" | "Band 5.0" | "Band 5.5" | "Band 6.0" | "Band 6.5" | "Band 7.0" | "Band 7.5" | "Band 8.0+" | string;
  estimatedMinutes: number;
  timeBudgetSeconds: number; // e.g. 90s per question
  step1Principles: ReadingMethodStep1Principles;
  step2ExaminerTraps: ReadingExaminerTrapItem[];
  step3ModelWalkthrough: ReadingModelWalkthrough;
  gatewayQuiz: MethodologyQuizItem[];
  unlockedPracticeRoute: {
    nameVi: string;
    href: string;
    descriptionVi: string;
  };
}

export const MOCK_READING_METHODS: ReadingMethodLesson[] = [
  // =========================================================================
  // 0. KỸ NĂNG NỀN TẢNG: SKIMMING 90S & SCANNING 2 TẦNG TỪ KHÓA
  // =========================================================================
  {
    id: "reading-foundation-skimming-scanning",
    title: "Kỹ Năng Nền Tảng: Chiến Thuật Skimming 90 Giây, Scanning 2 Tầng Từ Khóa & Quản Trị Thời Gian 15p - 20p - 25p",
    cluster: "foundation",
    clusterNameVi: "Kỹ Năng Cốt Lõi: Skimming & Scanning Nền Tảng",
    difficulty: "Band 4.5 ➔ 5.5+",
    estimatedMinutes: 20,
    timeBudgetSeconds: 60,
    step1Principles: {
      conceptSummaryVi:
        "Bài thi IELTS Reading gồm 3 bài đọc rất dài với 40 câu hỏi trong 60 phút. Các bạn học sinh mới bắt đầu TUYỆT ĐỐI KHÔNG đọc dịch từng chữ như đọc truyện (vừa mất thời gian vừa dễ hoảng khi gặp từ lạ!). Để đạt điểm cao, bạn chỉ cần làm chủ 2 tuyệt chiêu đơn giản: 1) Skimming (Đọc lướt 90 giây để biết bài nói về chuyện gì) và 2) Scanning (Quét mắt tìm 2 tầng từ khóa: Từ khóa Cứng để tìm vị trí và Từ khóa Mềm để bắt cặp từ đồng nghĩa Paraphrase). Chia thời gian vàng: Bài 1 dễ nhất làm 15 phút ➔ Bài 2 vừa sức làm 20 phút ➔ Bài 3 khó nhất dành 25 phút.",
      recommendedTimeMinutes: 15,
      tacticalRulesVi: [
        "Quy tắc 1: Skimming 90 giây đầu tiên (Đọc lướt bắt ý chính) — Giống như khi bạn lướt xem bảng tin Facebook/TikTok trong 1 phút để biết có tin gì hot! Bạn chỉ đọc Tiêu đề chính, Tiêu đề phụ và 1-2 câu đầu mỗi đoạn để biết 'đoạn A nói gì, đoạn B nói gì'. Gặp từ mới? Hãy KỆ NÓ, tuyệt đối không dừng lại tra từ điển ở bước này!",
        "Quy tắc 2: Phân loại 2 tầng từ khóa — Bí kíp 'tầm nhiệt' vị trí đáp án trong 5 giây mà không cần dịch cả bài:\n• Tầng 1 - Từ khóa CỨNG (Hard Keywords: Tên người viết hoa, năm tháng, số liệu, từ in nghiêng): Đây là những từ 'bất di bất dịch', người ra đề KHÔNG THỂ đổi sang chữ khác được (ví dụ: Alexander Fleming, năm 1928, 50%). Mắt bạn chỉ cần quét nhanh tìm đúng mặt chữ này là định vị ngay được đoạn văn chứa câu trả lời trong 5 giây!\n• Tầng 2 - Từ khóa MỀM (Soft Keywords: Động từ hành động, tính từ, danh từ chung): Đây là những từ CHẮC CHẮN sẽ bị 'Paraphrase'.\n💡 Paraphrase là gì? Paraphrase (phát âm: pe-rờ-phrâyz) hiểu đơn giản là trò 'đổi chữ nhưng giữ nguyên nghĩa' của đề thi! Ví dụ trong câu hỏi đề ghi 'increase' (tăng lên), nhưng vào bài đọc đề sẽ đổi thành 'rise' hoặc 'soar' (nhảy vọt) để thử thách bạn. Nhận ra từ đồng nghĩa này là bạn chốt ngay đáp án đúng!",
        "Quy tắc 3: Quy tắc buông bỏ 1.5 phút — Đừng bao giờ 'yêu say đắm' một câu khó! Mỗi câu dễ hay khó trong bài thi đều chỉ đáng giá đúng 1 điểm. Nếu tìm quá 1.5 phút mà vẫn mịt mù không thấy manh mối, hãy chọn ngay 1 phương án khả quan nhất, đánh dấu lại rồi chuyển sang câu tiếp theo ngay. Tuyệt đối không để 1 câu khó làm mất điểm của 5 câu dễ phía sau!",
      ],
      cognitiveFlowVi: [
        "Bước 1: Skim 90s — Đọc lướt tiêu đề và các câu đầu đoạn để biết bài viết nói về chủ đề gì (như lướt mục lục sách).",
        "Bước 2: Đọc câu hỏi — Gạch chân Từ khóa Cứng (để tìm vị trí đoạn văn) và Từ khóa Mềm (để chuẩn bị bắt từ đồng nghĩa Paraphrase).",
        "Bước 3: Scan mắt hình chữ Z — Quét mắt từ trên xuống dưới theo Từ khóa Cứng ➔ Dừng lại ngay khi thấy đoạn văn chứa từ đó.",
        "Bước 4: Đọc kỹ 1-2 câu chứa từ khóa — Đối chiếu Từ khóa Mềm với từ đồng nghĩa trong bài để chốt đáp án chắc chắn 100%.",
      ],
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Đọc Dịch Từng Từ (Word-by-Word Translation Trap)",
        trapMechanismVi:
          "Thí sinh cố dịch từng từ từ trái sang phải, gặp từ mới là dừng lại hoang mang, dẫn đến mất 30 phút cho Passage 1 và cháy giờ hoàn toàn ở Passage 3.",
        originalTextExcerpt:
          "The indigenous flora exhibited idiosyncratic adaptations to withstand subterranean geothermal fluctuations.",
        translationVi:
          "Hệ thực vật bản địa đã thể hiện những sự thích nghi đặc dị nhằm chống chịu lại những biến đổi nhiệt địa chất dưới lòng đất.",
        wordBreakdown: [
          { word: "indigenous", ipa: "/ɪnˈdɪdʒ.ɪ.nəs/", type: "adj", meaningVi: "thuộc về bản địa, nguyên sản" },
          { word: "flora", ipa: "/ˈflɔː.rə/", type: "n", meaningVi: "hệ thực vật" },
          { word: "exhibit", ipa: "/ɪɡˈzɪb.ɪt/", type: "v", meaningVi: "thể hiện, biểu lộ, phô bày" },
          { word: "idiosyncratic", ipa: "/ˌɪd.i.ə.sɪŋˈkræt.ɪk/", type: "adj", meaningVi: "đặc dị, mang nét đặc thù cá biệt" },
          { word: "adaptation", ipa: "/ˌæd.æpˈteɪ.ʃən/", type: "n", meaningVi: "sự thích nghi sinh học" },
          { word: "withstand", ipa: "/wɪðˈstænd/", type: "v", meaningVi: "chống chịu, chịu đựng thử thách" },
          { word: "subterranean", ipa: "/ˌsʌb.təˈreɪ.ni.ən/", type: "adj", meaningVi: "dưới lòng đất, ngầm" },
          { word: "geothermal", ipa: "/ˌdʒiː.əʊˈθɜː.məl/", type: "adj", meaningVi: "thuộc địa nhiệt" },
          { word: "fluctuation", ipa: "/ˌflʌk.tʃuˈeɪ.ʃən/", type: "n", meaningVi: "sự dao động, biến thiên liên tục" },
        ],
        deceptiveQuestionStatement: "Thí sinh hoảng sợ khi gặp từ 'idiosyncratic' hoặc 'geothermal' và bỏ cuộc.",
        deceptiveOptionOrAnswer: "Dừng lại 3 phút tra từ điển hoặc suy đoán vu vơ.",
        correctAnswer: "Bỏ qua từ khó, dựa vào ngữ cảnh 'adaptations to withstand fluctuations' (sự thích nghi để chống chịu biến đổi) để hiểu ý chính.",
        examinerInsightVi:
          "IELTS không yêu cầu bạn biết 100% từ vựng. Đề thi cố tình đưa các thuật ngữ chuyên ngành để thử thách khả năng đọc hiểu ngữ cảnh đại cương của bạn.",
      },
      {
        trapNameVi: "Bẫy Tìm Từ Khóa Mù Quáng (Blind Keyword Matching Trap)",
        trapMechanismVi:
          "Thí sinh nhìn thấy một từ vựng trong câu hỏi xuất hiện giống hệt trong bài đọc liền vội vã chọn ngay đáp án đó, trong khi câu trong bài đọc lại mang nghĩa phủ định hoặc điều kiện trái ngược.",
        originalTextExcerpt:
          "Although the city council initially approved funding for the solar power initiative, the project was ultimately vetoed due to municipal budgetary constraints.",
        translationVi:
          "Mặc dù hội đồng thành phố ban đầu đã phê chuẩn kinh phí cho sáng kiến năng lượng mặt trời, dự án rốt cuộc đã bị phủ quyết do những hạn chế về ngân sách đô thị.",
        wordBreakdown: [
          { word: "initially", ipa: "/ɪˈnɪʃ.əl.i/", type: "adv", meaningVi: "ban đầu, thoạt tiên" },
          { word: "approve", ipa: "/əˈpruːv/", type: "v", meaningVi: "phê chuẩn, đồng thuận" },
          { word: "initiative", ipa: "/ɪˈnɪʃ.ə.tɪv/", type: "n", meaningVi: "sáng kiến, chương trình hành động" },
          { word: "ultimately", ipa: "/ˈʌl.tɪ.mət.li/", type: "adv", meaningVi: "rốt cuộc, kết cục cuối cùng" },
          { word: "veto", ipa: "/ˈviː.təʊ/", type: "v", meaningVi: "phủ quyết, bác bỏ" },
          { word: "municipal", ipa: "/mjuːˈnɪs.ɪ.pəl/", type: "adj", meaningVi: "thuộc về chính quyền thành phố / đô thị" },
          { word: "budgetary constraints", ipa: "/ˈbʌdʒ.ɪ.tər.i kənˈstreɪnts/", type: "phrase", meaningVi: "sự eo hẹp / ràng buộc về mặt ngân sách" },
        ],
        deceptiveQuestionStatement: "The municipal government successfully launched a renewable solar energy project.",
        deceptiveOptionOrAnswer: "TRUE (Thấy bài đọc có 'solar power initiative' và 'city council approved')",
        correctAnswer: "FALSE (Dự án cuối cùng bị phủ quyết: ultimately vetoed)",
        examinerInsightVi:
          "Cambridge luôn giăng bẫy mồi nhử từ vựng y hệt nhau ở vế nhượng bộ (Although...) nhưng kết quả thực tế lại bị lật ngược ở vế chính.",
      },
    ],
    step3ModelWalkthrough: {
      passageSnippet:
        "Scottish physician Sir Alexander Fleming discovered penicillin in 1928 when he noticed that a stray mold called Penicillium notatum had contaminated a petri dish containing Staphylococcus bacteria, creating a clear zone where bacterial growth was completely halted.",
      translationVi:
        "Bác sĩ người Scotland Sir Alexander Fleming phát hiện ra penicillin vào năm 1928 khi ông nhận thấy một bào tử nấm mốc lạc có tên Penicillium notatum đã làm nhiễm bẩn chiếc đĩa petri chứa vi khuẩn tụ cầu Staphylococcus, tạo ra một vùng sáng sạch nơi sự sinh sôi của vi khuẩn bị chặn đứng hoàn toàn.",
      wordBreakdown: [
        { word: "physician", ipa: "/fɪˈzɪʃ.ən/", type: "n", meaningVi: "bác sĩ điều trị, danh y" },
        { word: "stray", ipa: "/streɪ/", type: "adj", meaningVi: "đi lạc, trôi dạt, rải rác" },
        { word: "mold", ipa: "/məʊld/", type: "n", meaningVi: "nấm mốc" },
        { word: "contaminate", ipa: "/kənˈtæm.ɪ.neɪt/", type: "v", meaningVi: "làm nhiễm bẩn, làm ô nhiễm" },
        { word: "petri dish", ipa: "/ˈpet.ri ˌdɪʃ/", type: "n", meaningVi: "đĩa nuôi cấy thí nghiệm petri" },
        { word: "bacteria", ipa: "/bækˈtɪə.ri.ə/", type: "n", meaningVi: "vi khuẩn (dạng số nhiều)" },
        { word: "halt", ipa: "/hɔːlt/", type: "v", meaningVi: "ngăn chặn dứt điểm, làm khựng lại" },
      ],
      questionItem: "Alexander Fleming was the first scientist to deliberately synthesize artificial penicillin in a laboratory setting.",
      stepByStepAuditVi: [
        "1. Xác định Hard Keywords: 'Alexander Fleming' (tên riêng), 'penicillin' (thuật ngữ), '1928' (mốc năm).",
        "2. Xác định Soft Keywords: 'deliberately synthesize' (cố tình tổng hợp nhân tạo), 'first scientist'.",
        "3. Scan định vị: Dễ dàng tìm thấy 'Alexander Fleming discovered penicillin in 1928' trong 3 giây nhờ Hard Keywords.",
        "4. Đối soát nghĩa: Bài đọc ghi 'noticed a stray mold... had contaminated' (phát hiện do nấm mốc vô tình rơi vào đĩa thí nghiệm) ➔ Mâu thuẫn trực tiếp với 'deliberately synthesize' (cố tình tổng hợp nhân tạo) ➔ Đáp án là FALSE.",
      ],
      paraphrasePairs: [
        { questionKeyword: "deliberately synthesize", passageKeyword: "stray mold contaminated (tình cờ rơi vào)" },
        { questionKeyword: "laboratory setting", passageKeyword: "petri dish containing bacteria" },
      ],
      concludingTipVi: "Hard Keyword dẫn bạn đến vị trí trong 3 giây. Soft Keyword giúp bạn đối soát nghĩa để không bị bẫy.",
    },
    gatewayQuiz: [
      {
        id: "skim_q1",
        prompt: "Kỹ năng Skimming trong IELTS Reading nên thực hiện trong bao lâu và nhằm mục đích gì?",
        options: [
          "A. 15 phút, dịch toàn bộ bài đọc sang tiếng Việt.",
          "B. Khoảng 90 giây, đọc tiêu đề và câu đầu/cuối các đoạn để nắm bản đồ tư duy nội dung bài đọc.",
          "C. Không cần Skim, lao vào làm bài ngay lập tức.",
          "D. Đọc ngược từ đoạn cuối lên đoạn đầu.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Skimming 90 giây giúp não bộ vẽ 'Mental Map' để định vị câu trả lời cực nhanh sau đó.",
      },
      {
        id: "skim_q2",
        prompt: "Sự khác biệt cốt lõi giữa Hard Keywords và Soft Keywords là gì?",
        options: [
          "A. Hard Keywords là từ dài, Soft Keywords là từ ngắn.",
          "B. Hard Keywords (tên riêng, số, năm) không bị paraphrase dùng để định vị; Soft Keywords (động từ, tính từ) bị paraphrase dùng để đối chiếu nghĩa.",
          "C. Không có sự khác biệt nào.",
          "D. Soft Keywords quan trọng hơn Hard Keywords.",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "Hard Keywords dùng để tìm vị trí đoạn văn, Soft Keywords dùng để chốt đáp án qua paraphrase.",
      },
      {
        id: "skim_q3",
        prompt: "Khi gặp một thuật ngữ khoa học khó hiểu trong bài đọc, phản xạ đúng đắn nhất của học viên là gì?",
        options: [
          "A. Dừng lại 5 phút cố dịch từng chữ.",
          "B. Bỏ qua từ khó đó, bám vào động từ chính và ngữ cảnh xung quanh để hiểu ý nghĩa đại cương.",
          "C. Nộp bài sớm vì đề quá khó.",
          "D. Tra từ điển giấy trong phòng thi.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "IELTS không yêu cầu biết 100% thuật ngữ, quan trọng là khả năng nắm bắt ý tưởng chính qua ngữ cảnh.",
      },
      {
        id: "skim_q4",
        prompt: "Quy tắc phân bổ thời gian chuẩn cho 3 Passages trong IELTS Reading là gì?",
        options: [
          "A. Chia đều 20 phút cho mỗi Passage.",
          "B. Passage 1 (15 phút) ➔ Passage 2 (20 phút) ➔ Passage 3 (25 phút).",
          "C. Passage 1 (30 phút) ➔ Passage 2 (20 phút) ➔ Passage 3 (10 phút).",
          "D. Làm Passage 3 trước trong 40 phút.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Passage 1 dễ nhất nên làm trong 15 phút để dành 25 phút cho Passage 3 nhiều thuật ngữ khó.",
      },
      {
        id: "skim_q5",
        prompt: "Nếu bạn đã tìm kiếm một câu hỏi quá 1.5 phút mà vẫn chưa thấy thông tin, bạn nên làm gì?",
        options: [
          "A. Ngồi nghĩ tiếp câu đó cho đến khi hết 60 phút.",
          "B. Áp dụng quy tắc buông bỏ: Chọn phương án khả dĩ nhất, đánh dấu lại và chuyển sang câu tiếp theo ngay lập tức.",
          "C. Bỏ trống không điền gì.",
          "D. Xóa toàn bộ bài làm.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Quy tắc buông bỏ 1.5 phút bảo vệ thời gian cho các câu hỏi dễ ăn điểm phía sau.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Đọc 2 Cột Split-View & Phân Tích Từ Khóa",
      href: "/practice/reading-split",
      descriptionVi: "Áp dụng ngay kỹ thuật Skimming 90s và Scanning 2 tầng từ khóa trên bài đọc thực tế.",
    },
  },

  // =========================================================================
  // 1. TRUE / FALSE / NOT GIVEN & YES / NO / NOT GIVEN
  // =========================================================================
  {
    id: "reading-tfng-ynng",
    title: "True / False / Not Given & Yes / No / Not Given: Giải Mã Bẫy Over-Inference & Phạm Vi Tuyệt Đối",
    cluster: "fact_opinion",
    clusterNameVi: "Nhóm 1: Nhận Định Sự Thật & Lập Trường",
    difficulty: "Band 6.0",
    estimatedMinutes: 25,
    timeBudgetSeconds: 90,
    step1Principles: {
      conceptSummaryVi:
        "Dạng bài Đúng / Sai / Không có trong bài (True / False / Not Given) là dạng bài kinh điển của IELTS. Hiểu đơn giản theo cách học sinh: TRUE = Giống 100% (bài nói A, đề hỏi A); FALSE = Ngược lại 100% (bài nói A, đề khẳng định B mâu thuẫn trực tiếp với A); NOT GIVEN = Đề bài không nhắc tới (dù ngoài đời bạn biết là đúng hay sai thì trong bài thi cấm tự suy diễn!).",
      recommendedTimeMinutes: 18,
      tacticalRulesVi: [
        "Quy tắc vàng 1: Cấm làm 'Thám tử Conan' suy diễn ngoài đời! Nếu bài đọc không nói tới, dù ngoài đời sự thật hiển nhiên đến đâu cũng dứt khoát chọn NOT GIVEN. Ví dụ: Bài đọc bảo 'Học sinh thi đỗ điểm cao', câu hỏi bảo 'Thầy giáo dạy rất giỏi' ➔ NOT GIVEN (vì bài không hề nhắc một chữ nào về thầy giáo!).",
        "Quy tắc vàng 2: Cảnh giác cao độ với 'Từ hạn định tuyệt đối' (all, only, always, never). Ví dụ trong bài đọc ghi 'nhiều người thích ăn kem' (many), nhưng câu hỏi ghi 'tất cả mọi người đều thích ăn kem' (all) ➔ Đáp án là FALSE ngay lập tức vì bị nói quá sự thật!",
        "Quy tắc vàng 3: Câu hỏi TFNG luôn xuất hiện theo đúng thứ tự từ trên xuống dưới trong bài đọc. Tìm thấy câu 1 ở Đoạn A, câu 3 ở Đoạn C ➔ Câu 2 chắc chắn nằm kẹp giữa Đoạn A và C, không bao giờ chạy ngược lên trên!",
      ],
      cognitiveFlowVi: [
        "Bước 1: Đọc câu hỏi, gạch chân từ khóa chính để biết câu này đang hỏi về ai, làm việc gì.",
        "Bước 2: Dùng Từ khóa Cứng (năm, tên riêng) tìm đúng vị trí câu đó trong bài đọc.",
        "Bước 3: So sánh từng chữ: Khớp nghĩa 100% ➔ TRUE; Đảo ngược mâu thuẫn ➔ FALSE; Không tìm thấy bằng chứng ➔ NOT GIVEN.",
      ],
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Suy Diễn Quá Mức (Over-Inference Trap)",
        trapMechanismVi:
          "Thí sinh tự suy luận logic ngoài đời rằng 'Học sinh đạt điểm cao thì chắc chắn có giáo viên giỏi', nhưng bài đọc không hề đề cập đến giáo viên.",
        originalTextExcerpt: "Students attending the experimental academy achieved exceptional scores in mathematics examinations.",
        translationVi: "Các học sinh theo học tại học viện thực nghiệm đã đạt được những điểm số phi thường trong các kỳ thi toán học.",
        wordBreakdown: [
          { word: "experimental academy", ipa: "/ɪkˌsper.ɪˈmen.təl əˈkæd.ə.mi/", type: "phrase", meaningVi: "học viện / trường thử nghiệm" },
          { word: "exceptional", ipa: "/ɪkˈsep.ʃən.əl/", type: "adj", meaningVi: "phi thường, xuất chúng, vượt trội" },
          { word: "examination", ipa: "/ɪɡˌzæm.ɪˈneɪ.ʃən/", type: "n", meaningVi: "kỳ thi khảo hạch" },
        ],
        deceptiveQuestionStatement: "The mathematics teachers at the experimental academy were recognized as the most qualified in the region.",
        deceptiveOptionOrAnswer: "TRUE (Thí sinh tự suy diễn trường điểm cao thì thầy cô phải giỏi nhất)",
        correctAnswer: "NOT GIVEN",
        examinerInsightVi: "Bài đọc chỉ nói về điểm số của học sinh, không hề có bất kỳ câu chữ nào đánh giá năng lực của giáo viên.",
      },
      {
        trapNameVi: "Bẫy Từ Hạn Định Tuyệt Đối Hóa (Absolute Scope Trap)",
        trapMechanismVi:
          "Bài đọc dùng từ chỉ xu hướng có điều kiện ('can induce', 'frequently'), nhưng câu hỏi lại dùng từ tuyệt đối ('inevitably', 'solely').",
        originalTextExcerpt: "Urban densification can frequently exacerbate localized microclimate temperatures.",
        translationVi: "Mật độ đô thị hóa dày đặc có thể thường xuyên làm trầm trọng thêm nhiệt độ vi khí hậu cục bộ.",
        wordBreakdown: [
          { word: "densification", ipa: "/ˌden.sɪ.fɪˈkeɪ.ʃən/", type: "n", meaningVi: "sự tăng mật độ, gia tăng áp lực xây dựng" },
          { word: "exacerbate", ipa: "/ɪɡˈzæs.ə.beɪt/", type: "v", meaningVi: "làm trầm trọng thêm, làm xấu đi tình hình" },
          { word: "microclimate", ipa: "/ˈmaɪ.krəʊˌklaɪ.mət/", type: "n", meaningVi: "vi khí hậu (vùng nhiệt độ nhỏ riêng biệt)" },
          { word: "elevation", ipa: "/ˌel.ɪˈveɪ.ʃən/", type: "n", meaningVi: "sự nâng cao, sự gia tăng" },
        ],
        deceptiveQuestionStatement: "Dense urban construction solely causes localized temperature elevation.",
        deceptiveOptionOrAnswer: "TRUE (Nhìn thấy từ 'temperature' và 'urban' tưởng đúng)",
        correctAnswer: "FALSE",
        examinerInsightVi: "Từ 'solely' (duy nhất) mâu thuẫn với thực tế bài đọc rằng mật độ đô thị chỉ là một trong các yếu tố ('frequently').",
      },
    ],
    step3ModelWalkthrough: {
      passageSnippet:
        "Although maritime trading corridors flourished across the Mediterranean during the 3rd century BCE, historical records indicate that overland caravan routes remained active only during the arid spring months.",
      translationVi:
        "Mặc dù các hành lang thương mại hàng hải đã phát triển rực rỡ khắp Địa Trung Hải trong thế kỷ thứ 3 trước Công nguyên, các tài liệu lịch sử chỉ ra rằng các tuyến đường đoàn buôn trên bộ chỉ duy trì hoạt động trong các tháng mùa xuân khô hạn.",
      wordBreakdown: [
        { word: "maritime", ipa: "/ˈmær.ɪ.taɪm/", type: "adj", meaningVi: "thuộc về biển cả, ngành hàng hải" },
        { word: "corridor", ipa: "/ˈkɒr.ɪ.dɔːr/", type: "n", meaningVi: "hành lang thông thương, tuyến đường" },
        { word: "flourish", ipa: "/ˈflʌr.ɪʃ/", type: "v", meaningVi: "phồn thịnh, hưng thịnh, phát triển rực rỡ" },
        { word: "caravan", ipa: "/ˈkær.ə.væn/", type: "n", meaningVi: "đoàn thương buôn, đoàn lữ hành trên bộ" },
        { word: "arid", ipa: "/ˈær.ɪd/", type: "adj", meaningVi: "khô cằn, khô hạn khắc nghiệt" },
      ],
      questionItem: "Caravan merchants conducted overland trade throughout the entire calendar year.",
      stepByStepAuditVi: [
        "1. Định vị từ khóa: 'overland caravan routes' ➔ Nằm ở nửa sau câu trích đoạn.",
        "2. So sánh thông tin câu hỏi ('throughout the entire calendar year' - quanh năm) với bài đọc ('only during the arid spring months' - chỉ vào những tháng mùa xuân khô ráo).",
        "3. Kết luận: Mâu thuẫn trực tiếp về khung thời gian ➔ Đáp án chắc chắn là FALSE.",
      ],
      paraphrasePairs: [
        { questionKeyword: "conducted overland trade", passageKeyword: "overland caravan routes" },
        { questionKeyword: "entire calendar year", passageKeyword: "only during the arid spring months" },
      ],
      concludingTipVi: "Khi thấy 'entire year' đối lập với 'only during spring', chọn ngay FALSE trong 10 giây!",
    },
    gatewayQuiz: [
      {
        id: "tfng_q1",
        prompt:
          "Trong bài đọc ghi: 'Certain species of Antarctic penguins migrate northward when winter approaches.' Câu hỏi: 'All Antarctic penguin species leave their colonies during winter.' Đáp án đúng là gì?",
        options: ["A. TRUE", "B. FALSE", "C. NOT GIVEN", "D. Không thể xác định"],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Bài đọc ghi 'Certain species' (Một số loài), câu hỏi dùng 'All species' (Tất cả các loài) ➔ Mâu thuẫn phạm vi tuyệt đối ➔ FALSE.",
      },
      {
        id: "tfng_q2",
        prompt:
          "Bài đọc ghi: 'The government allocated $50 million to subsidize electric vehicles in 2022.' Câu hỏi: 'The electric vehicle subsidy program significantly reduced municipal carbon emissions.' Đáp án là gì?",
        options: ["A. TRUE", "B. FALSE", "C. NOT GIVEN", "D. YES"],
        correctIndex: 2,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "Bài đọc chỉ nói ngân sách cấp 50 triệu USD, không có thông tin đánh giá liệu chương trình có 'giảm phát thải đáng kể' hay không ➔ Bẫy Over-inference ➔ NOT GIVEN.",
      },
      {
        id: "tfng_q3",
        prompt: "Sự khác biệt cốt lõi giữa TRUE/FALSE/NOT GIVEN và YES/NO/NOT GIVEN là gì?",
        options: [
          "A. Không có gì khác nhau, thích ghi từ nào cũng được giám khảo chấp nhận.",
          "B. TFNG kiểm tra sự thật dữ kiện khách quan (Fact), YNNG kiểm tra lập trường/quan điểm tác giả (Author's claim).",
          "C. YNNG chỉ xuất hiện ở Passage 1, TFNG xuất hiện ở Passage 3.",
          "D. TFNG không theo thứ tự đoạn văn, YNNG thì theo thứ tự.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "TFNG đo đếm dữ kiện thực tế; YNNG đối chiếu với quan điểm, ý kiến đánh giá của tác giả bài viết.",
      },
      {
        id: "tfng_q4",
        prompt: "Khi gặp câu hỏi chứa các từ 'only', 'all', 'never', 'exclusively', bạn nên đặc biệt cảnh giác với bẫy gì?",
        options: [
          "A. Bẫy số ít / số nhiều",
          "B. Bẫy phạm vi tuyệt đối hóa (Absolute Scope Trap)",
          "C. Bẫy chính tả tên riêng",
          "D. Bẫy từ nối",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "Các từ mang nghĩa tuyệt đối thường là công cụ Cambridge dùng để biến một phát biểu có điều kiện thành FALSE/NO.",
      },
      {
        id: "tfng_q5",
        prompt:
          "Nếu bạn đã tìm thấy câu 1 ở cuối Đoạn 1 và câu 3 ở đầu Đoạn 3, thông tin câu 2 PHẢI nằm ở đâu?",
        options: [
          "A. Ở Đoạn 4",
          "B. Ở bất kỳ đâu trong bài đọc",
          "C. Ở Đoạn 2 (giữa câu 1 và câu 3)",
          "D. Không có quy tắc cố định",
        ],
        correctIndex: 2,
        trapCategory: "careless_reading",
        trapAnalysis: "TFNG tuân thủ quy tắc Order of Appearance, câu 2 bắt buộc nằm trong khoảng giữa câu 1 và câu 3.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Đọc Split-view True/False/Not Given",
      href: "/practice/reading-tfng",
      descriptionVi: "Thực hành 20 câu TFNG bẫy phạm vi và suy diễn trên văn bản thực tế.",
    },
  },

  // =========================================================================
  // 2. MATCHING HEADINGS
  // =========================================================================
  {
    id: "reading-matching-headings",
    title: "Matching Headings: Kỹ Thuật Bắt Main Idea Toàn Đoạn & Né Bẫy Trùng Từ Khóa Đơn Lẻ",
    cluster: "matching_headings",
    clusterNameVi: "Nhóm 2: Nối Thông Tin & Tiêu Đề",
    difficulty: "Band 6.5",
    estimatedMinutes: 25,
    timeBudgetSeconds: 100,
    step1Principles: {
      conceptSummaryVi:
        "Matching Headings yêu cầu bạn ghép mỗi đoạn văn với một Tiêu đề tóm tắt đúng 'ý chính của cả đoạn' (Main Idea), giống như đặt tên tiêu đề cho một bài báo nhỏ. Bẫy lớn nhất ở đây là 'Mồi nhử chi tiết' (Detail Distractor Trap) — đề cố tình đưa một từ vựng lạ mắt trong đoạn vào một tiêu đề sai để lừa những bạn chỉ nhìn đúng một chữ!",
      recommendedTimeMinutes: 20,
      tacticalRulesVi: [
        "Quy tắc 1: Luôn làm bài Matching Headings ĐẦU TIÊN của Passage đó! Vì khi tìm tiêu đề cho từng đoạn, bạn đã vô tình đọc hiểu toàn bộ bài, giúp bạn làm các câu hỏi trắc nghiệm hay điền từ phía sau cực kỳ nhanh chóng.",
        "Quy tắc 2: Đừng chỉ đọc mỗi câu đầu và câu cuối! Ở các bài khó, câu chủ đề hay bị giấu ở giữa đoạn, đặc biệt là ngay sau các từ 'quay xe' như 'However' (Tuy nhiên), 'In contrast' (Trái lại). Nhìn thấy các từ này là phải đọc chậm lại ngay!",
        "Quy tắc 3: Tiêu đề đúng phải bao quát được 80-90% nội dung cả đoạn. Nếu tiêu đề chỉ nói về một ví dụ nhỏ xíu trong 1 dòng thì đó là 'Mồi nhử' (Distractor), gạch bỏ ngay không thương tiếc!",
      ],
      cognitiveFlowVi: [
        "Bước 1: Đọc qua danh sách các Tiêu đề trước, gạch chân từ khóa khác biệt giữa các tiêu đề gần giống nhau.",
        "Bước 2: Đọc đoạn văn, tự hỏi bản thân: 'Nếu tóm tắt đoạn này bằng 1 câu tiếng Việt thì tác giả đang muốn nói điều gì?'.",
        "Bước 3: Đối chiếu ý vừa nghĩ với danh sách Tiêu đề để chọn phương án khớp nghĩa nhất.",
      ],
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Trùng Từ Khóa Đơn Lẻ (Single Keyword Trap)",
        trapMechanismVi:
          "Cambridge cố tình thả 1 từ vựng hiếm xuất hiện trong Heading vào ngay câu đầu của đoạn, nhưng cả đoạn văn lại bàn về một khía cạnh hoàn toàn khác.",
        originalTextExcerpt:
          "Although genetic engineering has generated substantial controversy, the primary obstacle facing agricultural yields in sub-Saharan Africa remains inadequate irrigation infrastructure and soil nitrogen depletion.",
        translationVi:
          "Mặc dù kỹ thuật di truyền đã gây ra nhiều tranh cãi gay gắt, rào cản chính yếu đối với sản lượng nông nghiệp tại vùng châu Phi cận Sahara vẫn là cơ sở hạ tầng thủy lợi thiếu thốn và tình trạng cạn kiệt nitơ trong đất.",
        wordBreakdown: [
          { word: "genetic engineering", ipa: "/dʒəˈnet.ɪk ˌen.dʒɪˈnɪə.rɪŋ/", type: "phrase", meaningVi: "kỹ thuật công nghệ biến đổi gen" },
          { word: "substantial controversy", ipa: "/səbˈstæn.ʃəl ˈkɒn.trə.vɜː.si/", type: "phrase", meaningVi: "sự tranh cãi kịch liệt trên diện rộng" },
          { word: "obstacle", ipa: "/ˈɒb.stə.kəl/", type: "n", meaningVi: "chướng ngại vật, rào cản" },
          { word: "agricultural yields", ipa: "/ˌæɡ.rɪˈkʌl.tʃər.əl jiːldz/", type: "phrase", meaningVi: "năng suất thu hoạch nông nghiệp" },
          { word: "inadequate", ipa: "/ɪnˈæd.ə.kwət/", type: "adj", meaningVi: "bất cập, không đủ đáp ứng" },
          { word: "irrigation infrastructure", ipa: "/ˌɪr.ɪˈɡeɪ.ʃən ˈɪn.frəˌstrʌk.tʃər/", type: "phrase", meaningVi: "hạ tầng tưới tiêu thủy lợi" },
          { word: "depletion", ipa: "/dɪˈpliː.ʃən/", type: "n", meaningVi: "sự cạn kiệt tài nguyên" },
        ],
        deceptiveQuestionStatement: "Heading: 'The ethical controversies surrounding modern genetic modification'",
        deceptiveOptionOrAnswer: "Chọn Heading về Genetic Controversy vì thấy câu đầu có từ 'genetic engineering' và 'controversy'",
        correctAnswer: "Heading: 'Agronomic challenges and resource scarcity in African farming'",
        examinerInsightVi: "Cụm 'genetic engineering controversy' chỉ là mệnh đề nhượng bộ, ý chính thực sự của đoạn là hạ tầng thủy lợi và đất đai.",
      },
    ],
    step3ModelWalkthrough: {
      passageSnippet:
        "To mitigate catastrophic flash floods, urban hydrologists have deployed porous concrete alongside subterranean retention reservoirs. These engineering solutions not only absorb ninety percent of surface runoff during monsoon downpours but also recycle filtered precipitation into municipal irrigation systems.",
      translationVi:
        "Nhằm giảm thiểu những trận lũ quét thảm khốc, các nhà thủy văn học đô thị đã triển khai bê tông thấm hút nước song song với các bể chứa ngầm dưới lòng đất. Các giải pháp công trình này không chỉ hấp thụ chín mươi phần trăm lượng nước chảy tràn trên bề mặt trong các trận mưa rào gió mùa, mà còn tái chế lượng mưa đã được lọc sạch vào các hệ thống tưới tiêu của thành phố.",
      wordBreakdown: [
        { word: "mitigate", ipa: "/ˈmɪt.ɪ.ɡeɪt/", type: "v", meaningVi: "giảm nhẹ tác hại, xoa dịu tổn thất" },
        { word: "catastrophic", ipa: "/ˌkæt.əˈstrɒf.ɪk/", type: "adj", meaningVi: "thảm khốc, mang tính thảm họa lớn" },
        { word: "hydrologist", ipa: "/haɪˈdrɒl.ə.dʒɪst/", type: "n", meaningVi: "chuyên gia thủy văn học" },
        { word: "porous concrete", ipa: "/ˈpɔː.rəs ˈkɒŋ.kriːt/", type: "phrase", meaningVi: "bê tông có lỗ rỗng thoát nước" },
        { word: "retention reservoir", ipa: "/rɪˈten.ʃən ˈrez.əv.wɑːr/", type: "phrase", meaningVi: "bể / hồ chứa nước điều tiết lũ" },
        { word: "surface runoff", ipa: "/ˈsɜː.fɪs ˈrʌn.ɒf/", type: "phrase", meaningVi: "nước chảy tràn trên mặt đất" },
        { word: "precipitation", ipa: "/prɪˌsɪp.ɪˈteɪ.ʃən/", type: "n", meaningVi: "lượng mưa, giáng thủy học thuật" },
      ],
      questionItem: "Which heading best captures the essence of this paragraph?",
      stepByStepAuditVi: [
        "1. Phân tích cấu trúc đoạn: Giới thiệu giải pháp công nghệ ('porous concrete', 'subterranean reservoirs') ➔ Lợi ích kép ('absorb runoff' + 'recycle precipitation').",
        "2. Loại trừ Heading 'The economic damages of urban monsoon storms' (đây chỉ là bối cảnh).",
        "3. Chọn Heading: 'Dual-purpose civil engineering solutions for stormwater management'.",
      ],
      paraphrasePairs: [
        { questionKeyword: "Dual-purpose engineering", passageKeyword: "not only absorb... but also recycle" },
        { questionKeyword: "Stormwater management", passageKeyword: "mitigate flash floods... surface runoff" },
      ],
      concludingTipVi: "Heading chuẩn phải bao quát được 'Dual-purpose' (hấp thụ và tái chế), không chọn heading một chiều.",
    },
    gatewayQuiz: [
      {
        id: "head_q1",
        prompt: "Tại sao bạn nên làm dạng bài Matching Headings ĐẦU TIÊN khi giải một bài Reading?",
        options: [
          "A. Vì Matching Headings là dạng bài dễ nhất.",
          "B. Vì khi tìm Heading, bạn đọc hiểu mạch bài và nắm bản đồ vị trí thông tin cho toàn bộ câu hỏi chi tiết sau đó.",
          "C. Vì Matching Headings luôn theo thứ tự đoạn văn.",
          "D. Vì giám khảo yêu cầu phải nộp phần này trước.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Làm Headings trước tạo ra 'Mental Map' giúp bạn định vị đáp án cho các câu TFNG hoặc Completion sau đó cực nhanh.",
      },
      {
        id: "head_q2",
        prompt: "Nếu câu đầu tiên của đoạn văn chứa từ 'financial crisis', nhưng 4 câu sau phân tích chi tiết về 'staff psychological burnout', Heading nào là chuẩn?",
        options: [
          "A. The global financial crisis and macroeconomic instability",
          "B. Workplace mental health repercussions among corporate employees",
          "C. Investment strategies during market downturns",
          "D. Technological automation in corporate banking",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "Bẫy Single Keyword Trap: 'Financial crisis' chỉ là mồi nhử câu đầu, nội dung trọng tâm 4 câu sau là sức khỏe tinh thần nhân viên (B).",
      },
      {
        id: "head_q3",
        prompt: "Khi gặp từ nối 'However' hoặc 'In stark contrast' ở giữa đoạn văn, bạn cần lưu ý điều gì?",
        options: [
          "A. Bỏ qua câu đó không cần đọc.",
          "B. Main Idea thực sự của tác giả thường nằm ngay sau từ nối lật ngược quan điểm này.",
          "C. Chắc chắn đoạn văn không có Heading nào phù hợp.",
          "D. Đoạn văn đó nói về hai chủ đề không liên quan.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Các liên từ tương phản (However, Yet, Nevertheless) thường mở ra luận điểm trọng tâm mà tác giả muốn bảo vệ.",
      },
      {
        id: "head_q4",
        prompt: "Một Heading chuẩn cho đoạn văn KHÔNG ĐƯỢC có tính chất nào sau đây?",
        options: [
          "A. Khái quát được toàn bộ luận điểm của đoạn.",
          "B. Chỉ tóm tắt một chi tiết nhỏ hoặc một ví dụ minh họa vụn vặt (Detail Trap).",
          "C. Sử dụng từ đồng nghĩa với các ý trong bài đọc.",
          "D. Ngắn gọn và súc tích.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Heading tóm tắt 1 chi tiết nhỏ là bẫy kinh điển (Detail Trap).",
      },
      {
        id: "head_q5",
        prompt: "Nếu có 7 đoạn văn và 9 Heading trong danh sách, điều này có nghĩa là gì?",
        options: [
          "A. Có 2 Heading là phương án nhiễu (Distractors) không thuộc về đoạn nào.",
          "B. Một số đoạn văn sẽ được chọn 2 Heading.",
          "C. Bài thi bị in lỗi thừa đề.",
          "D. Bạn được phép bỏ qua 2 đoạn văn không làm.",
        ],
        correctIndex: 0,
        trapCategory: "careless_reading",
        trapAnalysis: "Số lượng Heading luôn nhiều hơn số đoạn văn từ 1 đến 2 phương án để tạo bẫy nhiễu.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Đọc Matching Headings Chuyên Sâu",
      href: "/practice/reading-headings",
      descriptionVi: "Thực hành ghép tiêu đề với 10 đoạn văn bẫy từ khóa và câu chủ đề lật ngược.",
    },
  },

  // =========================================================================
  // 3. SUMMARY COMPLETION WITH BOX OF OPTIONS
  // =========================================================================
  {
    id: "reading-summary-completion-box",
    title: "Summary Completion with Box of Options: Kỹ Thuật Soi Ngữ Pháp & Bắt Cặp Từ Paraphrase Biến Dạng",
    cluster: "summary_completion",
    clusterNameVi: "Nhóm 3: Điền Từ & Tóm Tắt",
    difficulty: "Band 7.0",
    estimatedMinutes: 25,
    timeBudgetSeconds: 85,
    step1Principles: {
      conceptSummaryVi:
        "Dạng bài Điền từ vào đoạn tóm tắt có sẵn Hộp từ vựng (Box of Options). Điểm mấu chốt là: Các từ trong Hộp KHÔNG BAO GIỜ giống y hệt từ trong bài đọc mà luôn là 'Từ đồng nghĩa' (Paraphrase). Bạn phải dùng mẹo đoán ngữ pháp để loại bớt các từ sai trước khi tìm.",
      recommendedTimeMinutes: 15,
      tacticalRulesVi: [
        "Quy tắc 1: 'Đoán trước loại từ' (Bộ lọc ngữ pháp thần thánh) — Trước khi nhìn vào Hộp từ, hãy nhìn vào chỗ trống: Đứng sau 'a / an / the' cần Danh từ; Đứng trước Danh từ cần Tính từ; Đứng sau Chủ ngữ cần Động từ. Biết được loại từ là bạn loại ngay được 70% các từ không phù hợp trong Hộp!",
        "Quy tắc 2: Đề thi luôn chơi trò Paraphrase (Đổi chữ) — Trong bài đọc ghi từ A, thì trong Hộp từ họ sẽ để từ đồng nghĩa A' của nó (ví dụ trong bài ghi 'accelerated' - tăng tốc, thì trong Hộp sẽ là từ 'speeded up' hoặc 'boosted').",
        "Quy tắc 3: Soi kỹ số ít và số nhiều — Nếu phía trước là 'These / Those / Many' thì chỗ trống bắt buộc phải là Danh từ số nhiều có đuôi 's/es'. Từ nào số ít gạch bỏ ngay lập tức.",
      ],
      cognitiveFlowVi: [
        "Bước 1: Đọc lướt bản tóm tắt, tìm từ khóa để xác định đoạn văn tương ứng trong bài đọc.",
        "Bước 2: Soi chỗ trống để đoán từ loại (Danh từ, Động từ, Tính từ, hay Số liệu?).",
        "Bước 3: Đọc đoạn văn tìm từ mang nghĩa tương ứng ➔ So vào Hộp từ chọn chữ cái (A, B, C...) có nghĩa giống nhất.",
      ],
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Bóp Méo Từ Loại & Biến Dạng Ngữ Pháp",
        trapMechanismVi:
          "Bài đọc dùng động từ ('to innovate'), nhưng chỗ trống trong bản tóm tắt lại cần tính từ ('innovative') hoặc danh từ ('innovation').",
        originalTextExcerpt:
          "Early civilizations learned to domesticate wild equines, which dramatically accelerated regional communication.",
        translationVi:
          "Các nền văn minh sơ khai đã học được cách thuần hóa loài ngựa hoang, điều này đã đẩy nhanh đáng kể sự giao tiếp và kết nối giữa các vùng miền.",
        wordBreakdown: [
          { word: "civilization", ipa: "/ˌsɪv.əl.aɪˈzeɪ.ʃən/", type: "n", meaningVi: "nền văn minh nhân loại" },
          { word: "domesticate", ipa: "/dəˈmes.tɪ.keɪt/", type: "v", meaningVi: "thuần hóa thú hoang" },
          { word: "equines", ipa: "/ˈek.waɪnz/", type: "n", meaningVi: "loài thuộc họ ngựa" },
          { word: "accelerate", ipa: "/əkˈsel.ə.reɪt/", type: "v", meaningVi: "gia tốc, đẩy nhanh tiến trình" },
        ],
        deceptiveQuestionStatement: "Summary: The (1) [_____] of horses revolutionized ancient travel.",
        deceptiveOptionOrAnswer: "Chọn nhầm từ dạng động từ 'domesticate' thay vì danh từ.",
        correctAnswer: "Option: 'domestication' (hoặc 'taming')",
        examinerInsightVi: "Chỗ trống đứng sau mạo từ 'The' bắt buộc phải là một Danh từ.",
      },
    ],
    step3ModelWalkthrough: {
      passageSnippet:
        "Excavations at the ancient subterranean temple revealed murals coated with an extraordinarily resilient pigment that has withstood millenary dampness without fading.",
      translationVi:
        "Các cuộc khai quật tại ngôi đền ngầm cổ kính đã hé lộ những bức tranh tường được quét bằng một lớp chất nhuộm bền bỉ phi thường, thứ đã chống chọi lại độ ẩm ngàn năm mà không hề bị phai màu.",
      wordBreakdown: [
        { word: "excavation", ipa: "/ˌek.skəˈveɪ.ʃən/", type: "n", meaningVi: "hoạt động khai quật khảo cổ" },
        { word: "mural", ipa: "/ˈmjʊə.rəl/", type: "n", meaningVi: "tranh bích họa trên tường" },
        { word: "resilient", ipa: "/rɪˈzɪl.i.ənt/", type: "adj", meaningVi: "kiên cường, bền bỉ, đàn hồi tốt" },
        { word: "pigment", ipa: "/ˈpɪɡ.mənt/", type: "n", meaningVi: "sắc tố màu, chất tạo màu tự nhiên" },
        { word: "millenary", ipa: "/ˈmɪl.ɪ.nər.i/", type: "adj", meaningVi: "kéo dài hàng thiên niên kỷ" },
        { word: "dampness", ipa: "/ˈdæmp.nəs/", type: "n", meaningVi: "độ ẩm thấp, sự ẩm ướt" },
      ],
      questionItem: "The wall paintings demonstrated surprising (1) [_____] against environmental decay.",
      stepByStepAuditVi: [
        "1. Dự đoán ngữ pháp: Đứng sau tính từ 'surprising' ➔ Cần một Danh từ chỉ phẩm chất/đặc tính.",
        "2. Định vị bài đọc: 'resilient pigment that has withstood dampness' (sắc tố bền bỉ chống chọi được ẩm ướt).",
        "3. So khớp với Box of Options: 'resilient' (tính từ) ➔ Danh từ tương đương là 'durability' hoặc 'resistance'.",
      ],
      paraphrasePairs: [
        { questionKeyword: "surprising resistance/durability", passageKeyword: "extraordinarily resilient pigment" },
        { questionKeyword: "environmental decay", passageKeyword: "withstood millenary dampness" },
      ],
      concludingTipVi: "Biến đổi từ loại: resilient (Adj) ➔ durability / resistance (Noun).",
    },
    gatewayQuiz: [
      {
        id: "box_q1",
        prompt:
          "Trước chỗ trống là: 'Researchers noted a marked _____ in migratory bird populations.' Bạn cần tìm từ loại nào trong Box?",
        options: [
          "A. Động từ nguyên mẫu (Verb)",
          "B. Danh từ số ít / không đếm được (Noun)",
          "C. Trạng từ (Adverb)",
          "D. Liên từ (Conjunction)",
        ],
        correctIndex: 1,
        trapCategory: "grammar",
        trapAnalysis: "Cấu trúc 'a marked + [Noun]' (tính từ 'marked' bổ nghĩa cho danh từ đứng sau).",
      },
      {
        id: "box_q2",
        prompt:
          "Trong bài đọc ghi 'The team encountered immense difficulties', trong Box of Options có các từ: A. challenges, B. solutions, C. benefits, D. easily. Bạn chọn từ nào?",
        options: ["A. challenges", "B. solutions", "C. benefits", "D. easily"],
        correctIndex: 0,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "'difficulties' (những khó khăn) được paraphrase bằng 'challenges' (thách thức).",
      },
      {
        id: "box_q3",
        prompt: "Khi điền đáp án dạng Summary with Box of Options vào phiếu trả lời, bạn phải ghi gì?",
        options: [
          "A. Ghi cả từ vựng tiếng Anh ra phiếu.",
          "B. Ghi ký tự chữ cái đại diện của từ đó (A, B, C, D...) theo quy định của đề.",
          "C. Ghi số thứ tự câu hỏi.",
          "D. Ghi nghĩa tiếng Việt.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Quy chuẩn thi IELTS: Dạng Box of Options yêu cầu ghi mã chữ cái (A, B, C...) thay vì chép lại từ.",
      },
      {
        id: "box_q4",
        prompt: "Nếu đoạn tóm tắt tóm tắt nội dung của cả bài đọc 800 từ, trật tự các câu hỏi trong Summary sẽ thế nào?",
        options: [
          "A. Không theo bất kỳ trật tự nào.",
          "B. Thường tuân thủ trật tự tuyến tính từ đầu bài đến cuối bài đọc.",
          "C. Đi ngược từ dưới lên trên.",
          "D. Luôn tập trung ở đoạn cuối cùng.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Dạng Summary toàn bài vẫn tuân theo trình tự thời gian và mạch ý của văn bản gốc.",
      },
      {
        id: "box_q5",
        prompt: "Cách nhanh nhất để loại trừ 50% phương án sai trong Box of Options là gì?",
        options: [
          "A. Chọn ngẫu nhiên từ đầu tiên.",
          "B. Soi kỹ từ loại (Part of Speech) của chỗ trống và gạch bỏ các từ không khớp ngữ pháp.",
          "C. Chỉ chọn những từ dài nhất.",
          "D. Đọc ngược bài đọc.",
        ],
        correctIndex: 1,
        trapCategory: "grammar",
        trapAnalysis: "Lọc theo từ loại (Noun/Verb/Adj) giúp loại bỏ ngay các từ sai ngữ pháp mà chưa cần đọc bài.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Đọc Summary Completion Box of Options",
      href: "/practice/reading-completion",
      descriptionVi: "Thực hành điền tóm tắt với các bẫy biến đổi từ loại và hòa hợp danh từ.",
    },
  },
];
