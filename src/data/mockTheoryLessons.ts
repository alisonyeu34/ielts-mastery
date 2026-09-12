import { PhaseNumber, SkillType } from "@/types/database";

export interface TheoryAnnotation {
  id: string;
  phrase: string;
  criteria: "LR" | "CC" | "GRA" | "TR";
  criteriaLabel: string;
  explanation: string;
  bandImpact: string;
}

export interface TheoryTrapItem {
  id: string;
  trapName: string;
  dangerLevel: "High" | "Critical" | "Extreme";
  trapMechanism: string;
  badExample: string;
  antidote: string;
  cambridgeSecret: string;
}

export interface TheoryQuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveTheoryLesson {
  id: string;
  skill: SkillType;
  phase: PhaseNumber;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  orderIndex: number;
  relatedPracticeRoute: string;
  relatedPracticeName: string;

  // Step 1: Core Concept & First Principles
  step1: {
    coreConceptSummary: string;
    firstPrincipleExplanation: string;
    comparisonTable: Array<{
      aspect: string;
      band55Approach: string;
      band85Approach: string;
    }>;
    goldenRules: string[];
  };

  // Step 2: Trap Exposure & Cambridge Mindset
  step2: {
    overview: string;
    traps: TheoryTrapItem[];
  };

  // Step 3: Model Dissection with Interactive Annotations
  step3: {
    modelPrompt: string;
    modelBand: string;
    modelParagraph: string; // contains annotated phrases
    annotations: TheoryAnnotation[];
  };

  // Comprehension Gatekeeper Quiz
  quiz: TheoryQuizItem[];
}

export const MOCK_INTERACTIVE_THEORY_LESSONS: InteractiveTheoryLesson[] = [
  // 1. Writing Task 2: PEEL Paragraph Structure
  {
    id: "writing_peel_task2",
    skill: "writing_task2",
    phase: 2,
    title: "Cấu Trúc Thân Bài PEEL & Hóa Giải Bẫy Liệt Kê Luận Điểm",
    subtitle: "Mô hình 4 câu chuẩn Cambridge: Point - Explanation - Example - Link",
    estimatedMinutes: 25,
    orderIndex: 1,
    relatedPracticeRoute: "/practice/writing-task2",
    relatedPracticeName: "Luyện Viết Thân Bài PEEL",
    step1: {
      coreConceptSummary:
        "Một đoạn thân bài Writing Task 2 Band 8.0+ không cần nhiều luận điểm mà cần MỘT luận điểm duy nhất được đào sâu triệt để qua 4 tầng tư duy logic: Khẳng định ý (Point) ➔ Giải thích cơ chế nhân quả (Explanation) ➔ Dẫn chứng cụ thể (Example) ➔ Chốt liên kết về luận đề (Link).",
      firstPrincipleExplanation:
        "Bản chất giám khảo chấm tiêu chí Task Achievement (TA) và Coherence & Cohesion (CC) dựa trên 'độ phát triển trọn vẹn của luận điểm' (fully developed position). Nếu bạn đưa 3-4 ý tưởng trong một đoạn nhưng không giải thích vì sao, bài viết sẽ bị kẹt ở Band 5.0 - 6.0 vì lỗi 'liệt kê ý tưởng sơ sài' (undeveloped list of points).",
      comparisonTable: [
        {
          aspect: "Số lượng luận điểm",
          band55Approach: "Liệt kê 3-4 ý tưởng rời rạc nối bằng Firstly, Secondly, Furthermore",
          band85Approach: "Chỉ 1 luận điểm cốt lõi duy nhất nhưng mổ xẻ 3 lớp nhân quả sâu sắc",
        },
        {
          aspect: "Cách triển khai câu",
          band55Approach: "Dừng lại ở bề mặt: 'X xấu vì nó gây hại cho xã hội'",
          band85Approach: "Giải thích cơ chế: 'X dẫn tới Y, từ đó làm trầm trọng hóa Z'",
        },
        {
          aspect: "Dẫn chứng thực tế",
          band55Approach: "Dẫn chứng chung chung: 'For example in my country many people do it'",
          band85Approach: "Dẫn chứng xác thực mang tính học thuật hoặc nghiên cứu thực tiễn",
        },
      ],
      goldenRules: [
        "Nguyên tắc 1 Đoạn = 1 Luận Điểm: Tuyệt đối không nhồi nhét nhiều ý vào cùng 1 body paragraph.",
        "Mỗi câu giải thích (Explanation) phải trả lời được câu hỏi 'Why does this happen?' hoặc 'What is the immediate consequence?'.",
        "Câu Link cuối đoạn phải có từ đồng nghĩa liên kết trực tiếp về câu chủ đề mở đoạn.",
      ],
    },
    step2: {
      overview:
        "Giám khảo chấm Task 2 được đào tạo để phát hiện 3 cạm bẫy tư duy mà 80% thí sinh Việt Nam mắc phải khi viết thân bài.",
      traps: [
        {
          id: "trap_w_1",
          trapName: "Bẫy Liệt Kê 'Shopping List' (Undeveloped Points Trap)",
          dangerLevel: "Critical",
          trapMechanism:
            "Thí sinh sợ bài viết ngắn nên cố nhồi nhét 3-4 luận điểm trong 1 đoạn. Kết quả: Mỗi ý chỉ được viết 1 câu đơn sơ, không có câu nào được giải thích cặn kẽ.",
          badExample:
            "Firstly, pollution harms health. Secondly, it damages tourism. Furthermore, it destroys marine life. Therefore we must stop it.",
          antidote:
            "Áp dụng quy tắc 'Bỏ bớt ý để đào sâu': Chỉ chọn duy nhất 1 ý mạnh nhất và viết 4-5 câu mổ xẻ theo mô hình PEEL.",
          cambridgeSecret:
            "Band Descriptors 7.0 TA yêu cầu: 'presents a clear central topic; extends and supports main ideas'. Liệt kê sẽ tự động tụt xuống Band 5.5.",
        },
        {
          id: "trap_w_2",
          trapName: "Bẫy Dẫn Chứng Vu Vơ 'In My Country / I Think' (Anecdotal Evidence Trap)",
          dangerLevel: "High",
          trapMechanism:
            "Đưa ví dụ kể chuyện đời tư cá nhân hoặc những câu chuyện không thể kiểm chứng khiến bài luận mất đi phong cách học thuật khách quan.",
          badExample:
            "For example, my brother bought a car last year and he always gets stuck in traffic jams.",
          antidote:
            "Chuyển đổi ví dụ cá nhân sang ví dụ mang tính xu hướng xã hội hoặc chính sách công (ví dụ: 'Case studies from urban centers like Tokyo demonstrate that...').",
          cambridgeSecret:
            "IELTS là bài thi học thuật (Academic). Ví dụ mang tính khái quát cao luôn đạt điểm Lexical Resource và Task Response vượt trội.",
        },
      ],
    },
    step3: {
      modelPrompt:
        "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake. Discuss both views.",
      modelBand: "Band 8.5+ Model Body Paragraph",
      modelParagraph:
        "Proponents of career-oriented higher education argue that tertiary curricula must align directly with evolving workforce demands. By embedding practical vocational training alongside theoretical modules, universities can significantly enhance graduate employability in highly competitive job sectors. For instance, engineering faculties that incorporate mandatory industry internships frequently report higher post-graduation employment rates, as students acquire tangible competencies rather than mere abstract principles. Consequently, this pragmatic pedagogical approach not only benefits individual career trajectories but also stimulates national economic productivity by supplying market-ready talent.",
      annotations: [
        {
          id: "ann_1",
          phrase: "Proponents of career-oriented higher education argue that tertiary curricula must align directly with evolving workforce demands.",
          criteria: "TR",
          criteriaLabel: "Point (Câu chủ đề sắc nét)",
          explanation: "Câu mở đoạn nêu ngay quan điểm cốt lõi: Chương trình đại học phải gắn liền với nhu cầu thị trường lao động.",
          bandImpact: "Xác định rõ ràng trọng tâm đoạn văn (Band 8.5 Task Achievement).",
        },
        {
          id: "ann_2",
          phrase: "By embedding practical vocational training alongside theoretical modules, universities can significantly enhance graduate employability in highly competitive job sectors.",
          criteria: "CC",
          criteriaLabel: "Explanation (Cơ chế giải thích 'By + V-ing')",
          explanation: "Giải thích cơ chế giải pháp: Lồng ghép thực hành song song lý thuyết giúp tăng khả năng có việc làm.",
          bandImpact: "Liên kết logic nguyên nhân - kết quả mượt mà (Band 8.5 Coherence).",
        },
        {
          id: "ann_3",
          phrase: "engineering faculties that incorporate mandatory industry internships frequently report higher post-graduation employment rates",
          criteria: "LR",
          criteriaLabel: "Example (Dẫn chứng học thuật cụ thể)",
          explanation: "Dẫn chứng khoa kỹ thuật có kỳ thực tập bắt buộc, dùng từ vựng C1 chuẩn xác ('mandatory industry internships', 'post-graduation employment rates').",
          bandImpact: "Nâng điểm Lexical Resource lên Band 8.5+.",
        },
        {
          id: "ann_4",
          phrase: "Consequently, this pragmatic pedagogical approach not only benefits individual career trajectories but also stimulates national economic productivity by supplying market-ready talent.",
          criteria: "GRA",
          criteriaLabel: "Link (Cấu trúc đảo ngữ / Not only... but also)",
          explanation: "Câu chốt kết hợp cấu trúc kép 'not only... but also' mở rộng lợi ích từ cá nhân lên toàn bộ nền kinh tế.",
          bandImpact: "Cú pháp câu phức đa tầng chuẩn Band 8.5+ GRA.",
        },
      ],
    },
    quiz: [
      {
        id: "qz_peel_1",
        question: "Trong cấu trúc đoạn PEEL, mục tiêu chính của câu Explanation (Giải thích) là gì?",
        options: [
          "A. Liệt kê thêm 2 luận điểm phụ khác cho bài viết dài hơn",
          "B. Trả lời câu hỏi 'Tại sao điều này xảy ra?' và phân tích cơ chế nhân quả",
          "C. Trích dẫn một câu chuyện đời tư cá nhân",
          "D. Lặp lại nguyên văn câu mở đoạn",
        ],
        correctIndex: 1,
        explanation: "Câu Explanation có nhiệm vụ làm rõ cơ chế logic tại sao Point lại đúng, tránh rơi vào bẫy liệt kê sơ sài.",
      },
      {
        id: "qz_peel_2",
        question: "Điều gì sẽ xảy ra nếu bạn đưa 3 luận điểm rời rạc vào cùng 1 đoạn thân bài mà không giải thích?",
        options: [
          "A. Được cộng điểm vì bài viết phong phú ý tưởng",
          "B. Bài viết bị đánh lỗi 'Shopping List' và giới hạn ở Band 5.5 - 6.0 Task Achievement",
          "C. Giám khảo sẽ tự động hiểu các ý ngầm",
          "D. Không ảnh hưởng đến điểm Coherence & Cohesion",
        ],
        correctIndex: 1,
        explanation: "Liệt kê ý mà không mở rộng phát triển (undeveloped points) là lỗi cấm kỵ khiến bài bị giam ở Band 5.5.",
      },
      {
        id: "qz_peel_3",
        question: "Câu Link cuối đoạn văn PEEL có vai trò gì?",
        options: [
          "A. Giới thiệu luận điểm của đoạn tiếp theo",
          "B. Tóm lược lại tác động và kết nối ngược về luận đề tổng quát của bài viết",
          "C. Đặt câu hỏi tu từ cho người đọc tự suy ngẫm",
          "D. Nêu ý kiến cá nhân phản đối luận điểm",
        ],
        correctIndex: 1,
        explanation: "Câu Link đóng vai trò neo giữ logic, kết nối toàn bộ đoạn văn về lại luận đề chính (Thesis statement).",
      },
    ],
  },

  // 2. Reading: True / False / Not Given Logic
  {
    id: "reading_tfng_concept",
    skill: "reading",
    phase: 2,
    title: "Bản Chất Logic True/False/Not Given & Bẫy Suy Diễn Cá Nhân",
    subtitle: "Phân biệt ranh giới tuyệt đối giữa False (Mâu thuẫn) và Not Given (Không đề cập)",
    estimatedMinutes: 20,
    orderIndex: 2,
    relatedPracticeRoute: "/practice/reading-tfng",
    relatedPracticeName: "Luyện Dạng Bài True / False / Not Given",
    step1: {
      coreConceptSummary:
        "True/False/Not Given kiểm tra khả năng bám sát văn bản (Strict Factual Verification). TRUE = Thông tin trùng khớp 100%; FALSE = Thông tin mâu thuẫn trực tiếp 180° với bài đọc; NOT GIVEN = Bài đọc không cung cấp đủ dữ liệu để khẳng định hay phủ định.",
      firstPrincipleExplanation:
        "Quy tắc vàng: 'Chỉ tin vào những gì có trên trang giấy'. Thí sinh thường mất điểm ở Not Given vì dùng kiến thức thực tế bên ngoài (Common Sense / Real-world Knowledge) để tự suy luận ngầm cho bài đọc.",
      comparisonTable: [
        {
          aspect: "TRUE",
          band55Approach: "Tìm từ khóa giống hệt 100% trong bài",
          band85Approach: "Nhận diện Paraphrase từ đồng nghĩa hoặc cấu trúc câu đảo",
        },
        {
          aspect: "FALSE",
          band55Approach: "Nghĩ rằng không thấy thông tin là False",
          band85Approach: "Chứng minh được bài đọc nói điều HOÀN TOÀN NGƯỢC LẠI (Contradiction)",
        },
        {
          aspect: "NOT GIVEN",
          band55Approach: "Tự suy luận: 'Ngoài đời điều này là đúng nên câu này đúng'",
          band85Approach: "Xác nhận bài đọc không hề đề cập đối tượng so sánh hoặc mối quan hệ đó",
        },
      ],
      goldenRules: [
        "Nếu bài đọc viết A > B, mà đề bài viết A = B ➔ FALSE (Mâu thuẫn so sánh).",
        "Nếu bài đọc viết A có tính chất X, mà đề bài viết A là 'duy nhất' (the only) có tính chất X ➔ NOT GIVEN (nếu bài không khẳng định tính duy nhất).",
        "Không bao giờ dùng kiến thức xã hội để 'bù đắp' thông tin thiếu trong bài đọc.",
      ],
    },
    step2: {
      overview: "2 bẫy khảo thí tinh vi nhất trong dạng bài TFNG khiến thí sinh nhầm lẫn giữa False và Not Given.",
      traps: [
        {
          id: "trap_r_1",
          trapName: "Bẫy Lượng Từ Tuyệt Đối (Extreme Quantifiers Trap)",
          dangerLevel: "Extreme",
          trapMechanism:
            "Đề bài thêm các từ chỉ tính tuyệt đối như 'all, always, only, completely, impossible' trong khi bài đọc chỉ dùng từ chỉ mức độ vừa phải như 'some, often, may, tend to'.",
          badExample:
            "Bài đọc: 'Many students experience stress during exams.' ➔ Đề bài: 'All students suffer from extreme anxiety during tests.' (Đáp án: FALSE vì all mâu thuẫn với many).",
          antidote: "Luôn khoanh tròn các từ chỉ lượng và tần suất (all, most, some, never, always) khi đối chiếu đề bài.",
          cambridgeSecret: "Giám khảo dùng Extreme Words để bẫy thí sinh đọc lướt chỉ bắt từ khóa chính mà bỏ qua sắc thái hạn định.",
        },
        {
          id: "trap_r_2",
          trapName: "Bẫy So Sánh Ngang Hàng Không Tồn Tại (Unverified Comparison Trap)",
          dangerLevel: "High",
          trapMechanism:
            "Bài đọc nhắc đến cả đối tượng A và đối tượng B, nhưng KHÔNG hề so sánh đối tượng nào tốt hơn hoặc phổ biến hơn.",
          badExample:
            "Bài đọc: 'Solar power and wind energy are renewable sources.' ➔ Đề bài: 'Solar power is more efficient than wind energy.' (Đáp án: NOT GIVEN).",
          antidote: "Nếu trong bài đọc không có từ so sánh (more, less, better, equal), hãy chọn NOT GIVEN ngay lập tức.",
          cambridgeSecret: "Thí sinh hay chọn FALSE vì nghĩ 'làm gì có chuyện solar tốt hơn wind', nhưng thực chất bài đọc không so sánh nên phải là NOT GIVEN.",
        },
      ],
    },
    step3: {
      modelPrompt: "Passage: The development of subterranean fungal networks allows forest trees to exchange vital nutrients.",
      modelBand: "Band 8.5+ Dissection Sample",
      modelParagraph:
        "Recent ecological research demonstrates that mycorrhizal fungi form intricate subterranean networks that interlink individual trees across temperate forests. These symbiotic pathways facilitate the bidirectional transfer of carbon, phosphorus, and defensive signaling molecules between mature trees and vulnerable saplings.",
      annotations: [
        {
          id: "ann_r1",
          phrase: "mycorrhizal fungi form intricate subterranean networks that interlink individual trees",
          criteria: "LR",
          criteriaLabel: "Paraphrase C1 cốt lõi",
          explanation: "'Subterranean networks' đồng nghĩa hoàn toàn với 'underground fungal connections'.",
          bandImpact: "Cơ sở xác định câu hỏi TRUE.",
        },
        {
          id: "ann_r2",
          phrase: "bidirectional transfer of carbon, phosphorus, and defensive signaling molecules",
          criteria: "TR",
          criteriaLabel: "Chi tiết trao đổi chất",
          explanation: "'Bidirectional transfer' = exchange (trao đổi hai chiều).",
          bandImpact: "Khẳng định quan hệ tương hỗ giữa các cây trong rừng.",
        },
      ],
    },
    quiz: [
      {
        id: "qz_tfng_1",
        question: "Sự khác biệt cốt lõi giữa đáp án FALSE và NOT GIVEN là gì?",
        options: [
          "A. FALSE là khi bài đọc nói điều ngược lại trực tiếp; NOT GIVEN là khi bài đọc không có đủ thông tin để kiểm chứng",
          "B. FALSE là câu ngắn, NOT GIVEN là câu dài",
          "C. FALSE và NOT GIVEN hoàn toàn giống nhau, chọn cái nào cũng được",
          "D. NOT GIVEN chỉ xuất hiện ở 2 câu cuối cùng của đề thi",
        ],
        correctIndex: 0,
        explanation: "FALSE đòi hỏi bằng chứng mâu thuẫn 180 độ. NOT GIVEN là khi thông tin bị khuyết, không thể khẳng định đúng hay sai.",
      },
      {
        id: "qz_tfng_2",
        question: "Nếu bài đọc viết 'Cà phê giúp tăng sự tỉnh táo ở một số người', mà đề bài viết 'Cà phê là thức uống duy nhất (the only drink) giúp tỉnh táo', bạn chọn đáp án nào?",
        options: ["A. TRUE", "B. FALSE", "C. NOT GIVEN", "D. Không xác định được"],
        correctIndex: 2,
        explanation: "Bài đọc không hề khẳng định cà phê là 'duy nhất' hay so sánh với trà/nước tăng lực, do đó câu này là NOT GIVEN.",
      },
    ],
  },

  // 3. Listening Section 1: Self-Correction Trap
  {
    id: "listening_s1_self_correction",
    skill: "listening",
    phase: 2,
    title: "Chiến Thuật Bắt Âm Section 1 & Hóa Giải Bẫy Tự Sửa Lời",
    subtitle: "Nhận diện từ tín hiệu chuyển hướng (Distractor Signals) và bắt đáp án cuối cùng",
    estimatedMinutes: 20,
    orderIndex: 3,
    relatedPracticeRoute: "/practice/listening-s1-s2",
    relatedPracticeName: "Luyện Bẫy Listening Section 1 & 2",
    step1: {
      coreConceptSummary:
        "Listening Section 1 là đoạn hội thoại thường nhật (Social Dialogue) yêu cầu điền thông tin cụ thể (Tên, Số điện thoại, Ngày tháng, Giá tiền). Thử thách lớn nhất không phải là từ vựng khó mà là bẫy người nói đổi ý (Self-correction).",
      firstPrincipleExplanation:
        "Trong giao tiếp tự nhiên, người nói thường đưa ra một thông tin ban đầu, sau đó phát hiện mình nhầm lẫn và đính chính lại bằng các từ tín hiệu: 'Actually, sorry, wait a second, let me check, no it is...'. Đáp án đúng LUÔN LÀ thông tin sau từ đính chính.",
      comparisonTable: [
        {
          aspect: "Tốc độ xử lý",
          band55Approach: "Ghi ngay con số hoặc cái tên đầu tiên nghe được vào bài",
          band85Approach: "Chờ 1-2 giây để kiểm tra xem người nói có từ đính chính hay không",
        },
        {
          aspect: "Đánh vần tên riêng",
          band55Approach: "Dễ nhầm lẫn các cặp âm A/E/I, G/J, W/V",
          band85Approach: "Luyện phản xạ chuẩn bảng chữ cái tiếng Anh và quy tắc phát âm 'double'",
        },
      ],
      goldenRules: [
        "Không bao giờ chốt đáp án ở thông tin đầu tiên nếu người nói chưa dứt câu.",
        "Chú ý các từ chuyển hướng: 'Actually', 'I thought so, but...', 'Hold on', 'In fact'.",
        "Kiểm soát nghiêm ngặt giới hạn từ: ONE WORD AND/OR A NUMBER.",
      ],
    },
    step2: {
      overview: "2 bẫy kinh điển trong Listening Section 1 khiến 70% thí sinh mất điểm ở 10 câu đầu.",
      traps: [
        {
          id: "trap_l_1",
          trapName: "Bẫy Tự Sửa Lời (Self-Correction Trap)",
          dangerLevel: "Extreme",
          trapMechanism: "Người nói đưa ra con số A, nhưng người nghe hỏi lại hoặc tự nhận ra nhầm lẫn và sửa thành số B.",
          badExample:
            "Speaker: 'The meeting is on Tuesday... oh sorry, my calendar says Wednesday morning.' ➔ Đáp án đúng là Wednesday, không phải Tuesday.",
          antidote: "Luôn đặt bút ở trạng thái sẵn sàng gạch bỏ thông tin số 1 và ghi đè thông tin số 2.",
          cambridgeSecret: "Cambridge cài bẫy này để kiểm tra sự tập trung liên tục, trừng phạt những thí sinh vừa nghe được từ khóa đã vội buông tai nghe.",
        },
      ],
    },
    step3: {
      modelPrompt: "Audio Transcript Section 1: Customer booking a car rental service.",
      modelBand: "Band 8.5+ Audio Script Dissection",
      modelParagraph:
        "Agent: 'Could you give me your contact number, please?' Customer: 'Sure, it is 07892 441 230... oh wait, that is my old office number. My new mobile number is 07892 441 890.' Agent: 'Got it, double 4-1, 8-9-0.'",
      annotations: [
        {
          id: "ann_l1",
          phrase: "07892 441 230... oh wait, that is my old office number.",
          criteria: "TR",
          criteriaLabel: "Distractor (Thông tin gây nhiễu)",
          explanation: "Số điện thoại ban đầu bị bác bỏ ngay lập tức bởi cụm từ 'oh wait, that is my old office number'.",
          bandImpact: "Loại bỏ để tránh bẫy.",
        },
        {
          id: "ann_l2",
          phrase: "My new mobile number is 07892 441 890",
          criteria: "TR",
          criteriaLabel: "Final Target Answer (Đáp án chính thức)",
          explanation: "Thông tin sau từ đính chính mới là đáp án đúng cần điền vào phiếu thi.",
          bandImpact: "Chấm điểm chính xác.",
        },
      ],
    },
    quiz: [
      {
        id: "qz_lis_1",
        question: "Khi nghe thấy người nói nói 'My appointment is at 2 PM... oh wait, the doctor rescheduled it to 4 PM', đáp án đúng là mấy giờ?",
        options: ["A. 2 PM", "B. 4 PM", "C. Cả 2 PM và 4 PM", "D. Không có giờ nào đúng"],
        correctIndex: 1,
        explanation: "Cụm từ 'oh wait, rescheduled to 4 PM' là tín hiệu tự đính chính. Đáp án cuối cùng luôn là 4 PM.",
      },
    ],
  },

  // 4. Speaking Part 1: Past - Present - Future Framework
  {
    id: "speaking_p1_timeline",
    skill: "speaking",
    phase: 2,
    title: "Xóa Bỏ Phản Xạ Cụt Lủn Với Khung 3 Mốc Thời Gian",
    subtitle: "Mở rộng câu trả lời Part 1 tự nhiên đạt 3-4 câu đa dạng thì ngữ pháp",
    estimatedMinutes: 20,
    orderIndex: 4,
    relatedPracticeRoute: "/practice/speaking-p1-p2",
    relatedPracticeName: "Luyện Nói Speaking Part 1 & Part 2",
    step1: {
      coreConceptSummary:
        "Khung 3 Mốc Thời Gian (Past - Present - Future) giúp thí sinh xóa bỏ hoàn toàn phản xạ trả lời cụt lủn 1 câu của Band 4.0 - 5.0. Bằng cách so sánh thói quen trong quá khứ $\rightarrow$ trạng thái hiện tại $\rightarrow$ dự định tương lai, câu trả lời sẽ tự động dài 3-4 câu với ngữ pháp đa dạng.",
      firstPrincipleExplanation:
        "Tiêu chí Fluency & Coherence và Grammatical Range yêu cầu thí sinh nói trôi chảy không bị gián đoạn và kết hợp linh hoạt các thì (Used to / HTĐ / Tương lai).",
      comparisonTable: [
        {
          aspect: "Độ dài câu trả lời",
          band55Approach: "Trả lời cụt: 'Yes, I like reading books because it is good.' (1 câu)",
          band85Approach: "Mở rộng 3-4 câu theo dòng thời gian Quá khứ ➔ Hiện tại ➔ Tương lai",
        },
        {
          aspect: "Đa dạng ngữ pháp",
          band55Approach: "Chỉ dùng thì Hiện tại đơn đơn điệu",
          band85Approach: "Kết hợp 'used to + V', 'currently tend to', 'in the foreseeable future'",
        },
      ],
      goldenRules: [
        "Không bao giờ dừng lại ở câu trả lời Yes/No cộc lốc.",
        "Công thức: Past (Hồi xưa thế nào) + Present (Bây giờ ra sao) + Future (Tương lai định làm gì).",
        "Duy trì ngữ điệu đi xuống (Falling Cadence) ở cuối câu trần thuật.",
      ],
    },
    step2: {
      overview: "2 bẫy khiến thí sinh Speaking Part 1 bị kẹt ở Band 5.0 dù nói trôi chảy.",
      traps: [
        {
          id: "trap_s_1",
          trapName: "Bẫy Trả Lời Cụt Lủn (One-Sentence Answer Trap)",
          dangerLevel: "High",
          trapMechanism: "Thí sinh trả lời trực diện câu hỏi trong 1 câu ngắn rồi im lặng chờ giám khảo hỏi tiếp.",
          badExample: "Examiner: 'Do you like sports?' ➔ Candidate: 'Yes, I love football.' (Hết câu).",
          antidote: "Áp dụng ngay mốc thời gian: 'Hồi nhỏ tôi đá bóng suốt, giờ bận nên chỉ chạy bộ, tương lai muốn học bơi.'",
          cambridgeSecret: "Câu trả lời quá ngắn khiến giám khảo không đủ mẫu ngôn ngữ để chấm tiêu chí Fluency và Grammar.",
        },
      ],
    },
    step3: {
      modelPrompt: "Examiner: Do you enjoy reading books?",
      modelBand: "Band 8.5+ Model Response",
      modelParagraph:
        "To be completely honest, back when I was a high school student, I used to be an avid reader of classic fiction. Nowadays, owing to my hectic university schedule, I predominantly read non-fiction articles and digital industry journals. Looking ahead, I certainly hope to carve out more leisure time to delve into historical biographies once this semester concludes.",
      annotations: [
        {
          id: "ann_s1",
          phrase: "back when I was a high school student, I used to be an avid reader of classic fiction",
          criteria: "GRA",
          criteriaLabel: "Mốc 1: Quá khứ (Past Habit)",
          explanation: "Sử dụng cấu trúc 'used to be an avid reader' thể hiện thói quen quá khứ mượt mà.",
          bandImpact: "Đa dạng hóa thì ngữ pháp (Band 8.5+ GRA).",
        },
        {
          id: "ann_s2",
          phrase: "Nowadays, owing to my hectic university schedule, I predominantly read non-fiction articles",
          criteria: "LR",
          criteriaLabel: "Mốc 2: Hiện tại (Present Routine)",
          explanation: "Sử dụng từ vựng C1: 'hectic schedule', 'predominantly read'.",
          bandImpact: "Nâng điểm Lexical Resource.",
        },
        {
          id: "ann_s3",
          phrase: "Looking ahead, I certainly hope to carve out more leisure time to delve into historical biographies",
          criteria: "CC",
          criteriaLabel: "Mốc 3: Tương lai (Future Aspiration)",
          explanation: "Kết câu bằng liên từ chuyển tiếp tương lai 'Looking ahead' và phrasal verb 'carve out time'.",
          bandImpact: "Trôi chảy và tự nhiên (Band 8.5+ FC).",
        },
      ],
    },
    quiz: [
      {
        id: "qz_spk_1",
        question: "Mục đích lớn nhất của việc mở rộng câu trả lời Speaking Part 1 theo 3 mốc thời gian là gì?",
        options: [
          "A. Giúp câu trả lời đạt độ dài chuẩn 3-4 câu và tự động phô diễn nhiều thì ngữ pháp khác nhau",
          "B. Nói càng nhanh càng tốt để giám khảo ngắt lời",
          "C. Tránh phải phát âm các từ khó",
          "D. Đổi chủ đề câu hỏi sang chuyện khác",
        ],
        correctIndex: 0,
        explanation: "Khung Quá khứ - Hiện tại - Tương lai giải quyết triệt để lỗi trả lời cụt lủn và đa dạng hóa thì ngữ pháp.",
      },
    ],
  },
];
