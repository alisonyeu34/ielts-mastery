/**
 * Cambridge Academic Writing Task 1 & Task 2 Master Blueprints Dataset
 * Detailed Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range
 * Structured into 3 Pedagogical Steps + Annotated Model Essays + 5-Question Gateway Mastery Quiz
 */

export interface EssayAnnotationToken {
  text: string;
  type: "thesis" | "topic_sentence" | "causal_chain" | "example" | "hedging" | "standard";
  annotationNoteVi?: string;
}

import { VocabBreakdownWord } from "@/types/theoryBookmarks";

export interface WritingExaminerTrapItem {
  trapNameVi: string;
  trapMechanismVi: string;
  band50WrongSample: string;
  band50TranslationVi?: string;
  band80CorrectSample: string;
  band80TranslationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  examinerInsightVi: string;
}

export interface WritingGatewayQuizItem {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  isGrammarRelated: boolean;
  examinerReasoning: string;
}

export interface WritingBlueprintLesson {
  id: string;
  taskType: "task1" | "task2";
  taskTypeNameVi: string;
  title: string;
  subtitle: string;
  bandTarget: string;
  estimatedMinutes: number;
  step1Principles: {
    corePhilosophyVi: string;
    fourCriteriaBreakdownVi: {
      taOrTr: string;
      cc: string;
      lr: string;
      gra: string;
    };
    structuralBlueprintVi: string[];
  };
  step2ExaminerTraps: WritingExaminerTrapItem[];
  step3ModelEssayDissection: {
    promptTitle: string;
    overviewSummaryVi: string;
    annotatedParagraphs: Array<{
      paragraphName: string;
      tokens: EssayAnnotationToken[];
      paragraphTranslationVi?: string;
      wordBreakdown?: VocabBreakdownWord[];
    }>;
    academicCollocations: string[];
    concludingFormulaVi: string;
  };
  gatewayQuiz: WritingGatewayQuizItem[];
  unlockedPracticeRoute: {
    nameVi: string;
    href: string;
    descriptionVi: string;
  };
}

export const MOCK_WRITING_BLUEPRINTS: WritingBlueprintLesson[] = [
  // =========================================================================
  // TASK 1: BÀI 1 - CHỌN LỌC KEY FEATURES TRONG 3 PHÚT
  // =========================================================================
  {
    id: "task1-assessment-key-features",
    taskType: "task1",
    taskTypeNameVi: "Writing Task 1 • Báo Cáo Số Liệu & Xu Hướng",
    title: "Task 1: Tổng Quan 4 Tiêu Chí Chấm & Nghệ Thuật Chọn Lọc Key Features Trong 3 Phút",
    subtitle: "Chấm dứt thói quen liệt kê số liệu dàn trải (Data Dumping) • Đạt điểm tối đa Task Achievement (TA)",
    bandTarget: "Band 6.0 ➔ 7.5+",
    estimatedMinutes: 25,
    step1Principles: {
      corePhilosophyVi:
        "Viết báo cáo Task 1 KHÔNG PHẢI là bài kiểm tra đọc số toán học! Giám khảo không muốn bạn 'kê khai số liệu như người bán hàng rong' (Data Dumping). Bạn chỉ có 20 phút và viết khoảng 150 từ, nhiệm vụ của bạn là 'chọn lọc những đặc điểm nổi bật nhất' để tóm tắt cho một người bận rộn xem hiểu trong 30 giây.\n💡 Overview (Đoạn tổng quan) là gì? Là đoạn văn quan trọng nhất bài! Giống như bạn ngồi trên máy bay nhìn xuống toàn cảnh: 'Cái gì nhìn chung tăng? Cái gì giảm? Ai dẫn đầu suốt cả thời kỳ?'. Thiếu đoạn này, bài của bạn tối đa chỉ được Band 5.0!",
      fourCriteriaBreakdownVi: {
        taOrTr: "Task Achievement (Trả lời đúng trọng tâm): Chọn lọc 3-4 điểm đắt giá nhất (Điểm cao nhất, điểm thấp nhất, điểm giao nhau và xu hướng chung). Không kể lể toàn bộ các năm!",
        cc: "Coherence & Cohesion (Mạch lạc liên kết): Chia 2 đoạn thân bài hợp lý (Đoạn 1: Kể các đường tăng trưởng; Đoạn 2: Kể các đường giảm sút hoặc không đổi).",
        lr: "Lexical Resource (Từ vựng đa dạng): Thay vì lặp từ 'increase/decrease', dùng các từ hay như 'surge' (tăng vọt), 'plummet' (lao dốc), 'plateau' (chững lại đi ngang).",
        gra: "Grammatical Range (Ngữ pháp phong phú): Viết câu so sánh linh hoạt (*Trong khi A tăng mạnh thì B lại sụt giảm đáng kể*).",
      },
      structuralBlueprintVi: [
        "1. Introduction (Mở bài - 1 câu): Paraphrase lại đề bài (dùng từ đồng nghĩa viết lại câu giới thiệu đề bài bằng giọng văn của mình).",
        "2. Overview (Tổng quan - 1-2 câu): Nêu 2 điểm đập vào mắt nhất: 1) Xu hướng chung (tăng hay giảm?) và 2) Đối tượng nào luôn giữ chức 'vô địch' dẫn đầu?",
        "3. Body 1 (Thân bài 1 - 3-4 câu): Mô tả chi tiết số liệu cụ thể của nhóm thứ nhất (so sánh năm đầu và năm cuối).",
        "4. Body 2 (Thân bài 2 - 3-4 câu): So sánh đối chiếu số liệu của nhóm thứ hai.",
      ],
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Liệt Kê Số Liệu Dàn Trải (Data Dumping Trap)",
        trapMechanismVi:
          "Thí sinh viết lại từng mốc năm: 'In 1990 it was 10%, in 1995 it was 12%, in 2000 it was 15%...' khiến bài viết biến thành bảng kê khai vô cảm.",
        band50WrongSample:
          "In 1990, car sales was 10,000. In 1995, it was 15,000. Then in 2000, it increased to 22,000, and in 2005 it reached 30,000.",
        band50TranslationVi: "Vào năm 1990, doanh số bán xe là 10.000. Năm 1995 là 15.000. Sau đó năm 2000, con số tăng lên 22.000, và năm 2005 đạt 30.000.",
        band80CorrectSample:
          "Car sales witnessed a consistent upward trajectory over the fifteen-year timeframe, tripling from 10,000 units in 1990 to peak at 30,000 by 2005.",
        band80TranslationVi: "Doanh số bán ô tô chứng kiến quỹ đạo tăng trưởng liên tục trong khung thời gian 15 năm, tăng gấp ba lần từ 10.000 chiếc vào năm 1990 lên mức đỉnh điểm 30.000 chiếc vào năm 2005.",
        wordBreakdown: [
          { word: "upward trajectory", ipa: "/ˈʌp.wəd trəˈdʒek.tər.i/", type: "phrase", meaningVi: "quỹ đạo đi lên, xu hướng tăng trưởng" },
          { word: "timeframe", ipa: "/ˈtaɪm.freɪm/", type: "n", meaningVi: "khung thời gian khảo sát" },
          { word: "triple from", ipa: "/ˈtrɪp.əl frɒm/", type: "v", meaningVi: "tăng gấp ba lần từ mốc" },
          { word: "peak at", ipa: "/piːk æt/", type: "v", meaningVi: "đạt đỉnh điểm tại mức" }
        ],
        examinerInsightVi: "Gộp 4 mốc thời gian vào 1 câu văn so sánh điểm đầu, điểm cuối và tính chất xu hướng để tăng điểm TA và CC.",
      },
    ],
    step3ModelEssayDissection: {
      promptTitle: "The line graph shows oil consumption in four countries from 1990 to 2010.",
      overviewSummaryVi: "Phân tích mẫu cách nhóm dữ liệu và cấu trúc câu so sánh đắt giá.",
      annotatedParagraphs: [
        {
          paragraphName: "Đoạn 1: Mở Bài (Introduction)",
          tokens: [
            { text: "The line graph illustrates ", type: "standard" },
            { text: "the volume of petroleum consumed across four distinct nations ", type: "thesis", annotationNoteVi: "Paraphrase khéo léo từ 'oil consumption in four countries'" },
            { text: "over a twenty-year period commencing from 1990.", type: "standard" },
          ],
        },
        {
          paragraphName: "Đoạn 2: Tổng Quan (Overview)",
          tokens: [
            { text: "Overall, it is evident that ", type: "standard" },
            { text: "while oil consumption in Country A and B experienced significant upward trends, ", type: "topic_sentence", annotationNoteVi: "Đặc điểm tổng quan 1: Xu hướng chính của nhóm tăng" },
            { text: "the figures for the remaining two nations exhibited downward or relatively stagnant trajectories. ", type: "causal_chain", annotationNoteVi: "Đặc điểm tổng quan 2: Sự đối lập của nhóm còn lại" },
            { text: "Additionally, Country A remained the predominant consumer throughout the entire timeframe.", type: "hedging", annotationNoteVi: "Điểm nổi bật: Đối tượng luôn dẫn đầu" },
          ],
        },
      ],
      academicCollocations: ["witnessed a consistent upward trajectory", "predominant consumer", "exhibited stagnant trajectories"],
      concludingFormulaVi: "Công thức Overview chuẩn: Overall, it is evident that while [Nhóm 1 tăng], [Nhóm 2 giảm/ổn định]. Furthermore, [Đối tượng X] consistently maintained the highest figure.",
    },
    gatewayQuiz: [
      {
        id: "wb_q1",
        prompt: "Trong Writing Task 1, bạn có được phép đưa số liệu chi tiết (ví dụ: 'at 45%', '10,000 tons') vào đoạn Overview không?",
        options: [
          "A. Được, càng nhiều số liệu vào Overview càng tốt.",
          "B. TUYỆT ĐỐI KHÔNG. Overview chỉ tóm tắt xu hướng tổng quát và điểm cực trị, đưa số liệu chi tiết sẽ bị trừ điểm Task Achievement.",
          "C. Chỉ được đưa 1 số duy nhất.",
          "D. Tùy thuộc vào việc đề bài có nhiều hay ít số liệu.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Tiêu chuẩn chấm Cambridge: Overview phải mang tính khái quát (General overview). Số liệu chi tiết chỉ thuộc về 2 đoạn Body.",
      },
      {
        id: "wb_q2",
        prompt: "Tiêu chí Coherence & Cohesion (CC) trong Task 1 được tối ưu hóa tốt nhất bằng cách nào?",
        options: [
          "A. Liệt kê lần lượt từng năm từ trái sang phải.",
          "B. Nhóm các đường biểu đồ có cùng xu hướng (ví dụ: nhóm cùng tăng và nhóm cùng giảm) vào từng đoạn Body riêng biệt.",
          "C. Dùng thật nhiều từ nối 'Firstly, Secondly, Thirdly, Fourthly'.",
          "D. Viết cả bài thành một đoạn văn duy nhất.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Nhóm thông tin có cấu trúc logic (Logical Grouping) là tiêu chí quyết định để đạt Band 7.0+ CC.",
      },
      {
        id: "wb_q3",
        prompt: "Giới từ nào sau đây dùng để chỉ 'Mức chênh lệch tăng/giảm' (ví dụ: tăng thêm 15%)?",
        options: ["A. at", "B. to", "C. by", "D. with"],
        correctIndex: 2,
        isGrammarRelated: true,
        examinerReasoning: "'increased by 15%' = tăng thêm 15%; trong khi 'increased to 15%' = tăng đến mốc 15%.",
      },
      {
        id: "wb_q4",
        prompt: "Thời lượng phân bổ khuyến nghị chuẩn khảo thí cho Writing Task 1 là bao nhiêu phút?",
        options: ["A. 10 phút", "B. 20 phút", "C. 30 phút", "D. 40 phút"],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Task 1 chiếm 1/3 tổng số điểm Writing nên chỉ dành tối đa 20 phút, để lại 40 phút cho Task 2.",
      },
      {
        id: "wb_q5",
        prompt: "Khi biểu đồ KHÔNG có mốc thời gian năm tháng cụ thể (Biểu đồ tĩnh / Static Chart), ta sử dụng thì ngữ pháp nào?",
        options: [
          "A. Quá khứ đơn (Past Simple)",
          "B. Hiện tại đơn (Present Simple)",
          "C. Tương lai đơn (Future Simple)",
          "D. Hiện tại hoàn thành tiếp diễn",
        ],
        correctIndex: 1,
        isGrammarRelated: true,
        examinerReasoning: "Biểu đồ tĩnh không có năm quá khứ mặc định mô tả sự thật ở hiện tại ➔ Dùng Hiện tại đơn.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Viết Task 1 (Data & Trend Studio)",
      href: "/practice/writing-task1",
      descriptionVi: "Thực hành chọn lọc Key Features và viết báo cáo số liệu 4 đoạn chuẩn mực.",
    },
  },

  // =========================================================================
  // TASK 2: BÀI 4 - VIẾT LUẬN ĐỀ (THESIS STATEMENT) KHÔNG LẠC ĐỀ
  // =========================================================================
  {
    id: "task2-thesis-prompt-deconstruction",
    taskType: "task2",
    taskTypeNameVi: "Writing Task 2 • Luận Đề & Mở Bài",
    title: "Task 2: Nghệ Thuật Bóc Tách Đề Bài & Viết Luận Đề (Thesis Statement) Dứt Khoát Không Lạc Đề",
    subtitle: "Xác lập lập trường học thuật vững chắc • Đạt trọn vẹn điểm Task Response (TR) Band 7.5+",
    bandTarget: "Band 6.5 ➔ 8.0+",
    estimatedMinutes: 25,
    step1Principles: {
      corePhilosophyVi:
        "Viết bài luận Task 2 giống như khi bạn tham gia một cuộc tranh biện: Bạn phải có chính kiến dứt khoát!\n💡 Thesis Statement (Câu luận đề) là gì? Là câu quan trọng nhất bài luận, nằm ở câu cuối của Mở bài. Câu này dùng để 'tuyên bố lập trường của bạn': Bạn đồng ý hay phản đối? Bạn nghiêng về bên nào?\n⚠️ Tuyệt đối không viết kiểu 'ba phải': 'Vấn đề này có cả mặt tốt và xấu, bài viết sau đây sẽ bàn luận cả hai mặt rồi mới kết luận'. Giám khảo muốn thấy quan điểm rõ ràng của bạn ngay từ dòng đầu tiên!",
      fourCriteriaBreakdownVi: {
        taOrTr: "Task Response (Trả lời đủ yêu cầu đề bài): Đề hỏi gì trả lời nấy. Khẳng định lập trường dứt khoát ngay tại Mở bài và giữ vững đến Kết bài.",
        cc: "Coherence & Cohesion (Bố cục mạch lạc): Câu chủ đề (Topic sentence) đầu mỗi đoạn thân bài phải báo hiệu chính xác nội dung của đoạn đó.",
        lr: "Lexical Resource (Từ vựng học thuật): Sử dụng các cặp từ tự nhiên (Collocations) thay vì dịch từng từ theo kiểu tiếng Việt.",
        gra: "Grammatical Range (Cấu trúc câu phong phú): Dùng câu phức nhượng bộ (*Mặc dù tôi thừa nhận quan điểm A, nhưng tôi vẫn kiên quyết tin rằng quan điểm B đúng đắn hơn*).",
      },
      structuralBlueprintVi: [
        "1. Câu 1 (Dẫn dắt bối cảnh): Paraphrase lại ý của đề bài bằng từ đồng nghĩa (nói lại đề bài theo cách của bạn).",
        "2. Câu 2 (Thesis Statement - Tuyên bố lập trường): Nêu thẳng quan điểm của bạn và tóm tắt ngắn gọn 2 lý do chính bạn sẽ triển khai trong thân bài.",
      ],
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Luận Đề Trung Lập 'Ba Phải' (Neutral / Fence-sitting Trap)",
        trapMechanismVi:
          "Với dạng đề 'Agree or Disagree', thí sinh viết: 'There are both pros and cons, and this essay will discuss both sides' mà không nói rõ mình đồng ý hay phản đối.",
        band50WrongSample:
          "This issue has both advantages and disadvantages. In this essay, I will discuss both perspectives before reaching a conclusion.",
        band50TranslationVi: "Vấn đề này có cả ưu điểm và nhược điểm. Trong bài luận này, tôi sẽ thảo luận cả hai góc nhìn trước khi đưa ra kết luận.",
        band80CorrectSample:
          "Although financial subsidies may offer temporary relief, I firmly contend that comprehensive structural reforms constitute a far more sustainable solution.",
        band80TranslationVi: "Mặc dù các khoản trợ cấp tài chính có thể mang lại sự nhẹ nhõm tạm thời, tôi kiên quyết lập luận rằng những cải cách cơ cấu toàn diện cấu thành một giải pháp bền vững hơn nhiều.",
        wordBreakdown: [
          { word: "financial subsidies", ipa: "/faɪˈnæn.ʃəl ˈsʌb.sɪ.diz/", type: "phrase", meaningVi: "các khoản trợ cấp tài chính từ ngân sách" },
          { word: "temporary relief", ipa: "/ˈtem.pər.ər.i rɪˈliːf/", type: "phrase", meaningVi: "sự giải tỏa / thuyên giảm tạm thời" },
          { word: "firmly contend that", ipa: "/ˈfɜːm.li kənˈtend ðæt/", type: "phrase", meaningVi: "kiên quyết lập luận / khẳng định rằng" },
          { word: "structural reforms", ipa: "/ˈstrʌk.tʃər.əl rɪˈfɔːmz/", type: "phrase", meaningVi: "những cải cách mang tính cơ cấu gốc rễ" },
          { word: "sustainable solution", ipa: "/səˈsteɪ.nə.bəl səˈluː.ʃən/", type: "phrase", meaningVi: "giải pháp bền vững lâu dài" }
        ],
        examinerInsightVi: "Giám khảo cần biết quan điểm của bạn NGAY TỪ MỞ BÀI, không phải đợi đến Kết bài mới bật mí.",
      },
    ],
    step3ModelEssayDissection: {
      promptTitle: "Some people believe that unpaid community service should be compulsory in high school. To what extent do you agree or disagree?",
      overviewSummaryVi: "Phân tích câu Luận đề mẫu Band 8.5 thể hiện rõ lập trường ủng hộ có điều kiện.",
      annotatedParagraphs: [
        {
          paragraphName: "Mở Bài Hoàn Chỉnh (Introduction & Thesis)",
          tokens: [
            { text: "It is frequently asserted that ", type: "standard" },
            { text: "incorporating mandatory voluntary work into secondary school curricula yields substantial societal benefits. ", type: "topic_sentence", annotationNoteVi: "Paraphrase bối cảnh đề bài" },
            { text: "While I acknowledge that academic obligations place heavy demands on adolescents, ", type: "hedging", annotationNoteVi: "Mệnh đề nhượng bộ thể hiện tư duy đa chiều" },
            { text: "I firmly maintain that mandatory community participation fosters crucial civic responsibility and vital interpersonal competencies.", type: "thesis", annotationNoteVi: "Thesis Statement đanh thép với 2 luận điểm cốt lõi" },
          ],
        },
      ],
      academicCollocations: ["mandatory voluntary work", "civic responsibility", "interpersonal competencies", "academic obligations"],
      concludingFormulaVi: "Khung Thesis Statement Band 8.0+: While I acknowledge that [Vế đối lập], I firmly maintain / contend that [Lập trường của tôi] because [Lý do 1] and [Lý do 2].",
    },
    gatewayQuiz: [
      {
        id: "t2_q1",
        prompt: "Với đề bài 'To what extent do you agree or disagree?', câu Thesis Statement nào sau đây chuẩn Band 8.0?",
        options: [
          "A. This essay will discuss both sides of the argument.",
          "B. While I concede that online learning offers undeniable flexibility, I firmly maintain that traditional classrooms remain indispensable for holistic social development.",
          "C. I will tell you my opinion in the conclusion paragraph.",
          "D. People have different ideas about this topic.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Câu B thể hiện lập trường dứt khoát (firmly maintain) kết hợp nhượng bộ học thuật (While I concede) và nêu rõ lý do.",
      },
      {
        id: "t2_q2",
        prompt: "Yêu cầu cốt lõi của tiêu chí Task Response (TR) để đạt từ Band 7.0 trở lên là gì?",
        options: [
          "A. Phải viết dài hơn 400 từ.",
          "B. Phải trình bày một lập trường rõ ràng xuyên suốt toàn bộ bài viết (A clear position throughout the response).",
          "C. Phải dùng ít nhất 10 từ vựng hiếm C2.",
          "D. Phải đồng ý 100% với đề bài.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Band Descriptors tiêu chí TR: Band 7.0 yêu cầu 'presents a clear position throughout the response'.",
      },
      {
        id: "t2_q3",
        prompt: "Trong dạng bài 'Discuss both views and give your opinion', bạn nên nêu quan điểm cá nhân ở đâu?",
        options: [
          "A. Chỉ nêu duy nhất ở đoạn Kết luận.",
          "B. Nêu ngay tại Mở bài (Thesis Statement), nhắc lại trong Thân bài và khẳng định ở Kết luận.",
          "C. Không cần nêu quan điểm, chỉ cần thảo luận 2 bên.",
          "D. Chỉ nêu trong một câu hỏi tu từ.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Nêu quan điểm từ Mở bài giúp bài viết có 'clear position throughout', tránh bẫy thiếu quan điểm.",
      },
      {
        id: "t2_q4",
        prompt: "Đoạn văn Thân bài Task 2 nên được triển khai theo cấu trúc nào để tránh bẫy liệt kê ý rời rạc?",
        options: [
          "A. Cấu trúc PEEL (Point - Explain - Example - Link) hoặc Toulmin Argumentation.",
          "B. Liệt kê 5 ý tưởng liên tiếp không giải thích.",
          "C. Chỉ viết ví dụ cá nhân của bản thân.",
          "D. Viết một câu chuyện hư cấu.",
        ],
        correctIndex: 0,
        isGrammarRelated: false,
        examinerReasoning: "PEEL và Toulmin giúp đào sâu chuỗi nhân quả và chứng minh luận điểm chặt chẽ.",
      },
      {
        id: "t2_q5",
        prompt: "Số lượng từ tối thiểu bắt buộc cho bài thi IELTS Writing Task 2 là bao nhiêu?",
        options: ["A. 150 từ", "B. 200 từ", "C. 250 từ", "D. 350 từ"],
        correctIndex: 2,
        isGrammarRelated: false,
        examinerReasoning: "Writing Task 2 yêu cầu tối thiểu 250 từ. Viết dưới 250 từ sẽ bị phạt điểm Task Response.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Lập Luận PEEL & Toulmin Task 2 Studio",
      href: "/practice/writing-peel",
      descriptionVi: "Thực hành viết luận đề dứt khoát và xây dựng đoạn thân bài chuẩn mô hình PEEL.",
    },
  },
];
