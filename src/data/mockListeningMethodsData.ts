/**
 * Cambridge Listening 4-Section Blueprint Strategy Dataset
 * Sections 1, 2, 3, and 4 Blueprint Traps & Mastery Workflows
 * Structured into 3 Pedagogical Steps + Mini Audio Snippets + 5-Question Gateway Quiz
 */

import { MethodologyQuizItem } from "@/data/mockReadingMethodsData";
import { VocabBreakdownWord } from "@/types/theoryBookmarks";

export interface AudioSnippetTrapSample {
  id: string;
  titleVi: string;
  transcriptText: string;
  translationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  trapExplanationVi: string;
  correctAnswerText: string;
}

export interface ListeningSectionBlueprintLesson {
  id: string;
  sectionNumber: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  targetBand: string;
  estimatedMinutes: number;
  timeBudgetSeconds: number;
  step1Principles: {
    contextOverviewVi: string;
    keySkillsRequiredVi: string[];
    preListeningTechniqueVi: string;
  };
  step2ExaminerTraps: Array<{
    trapNameVi: string;
    trapMechanismVi: string;
    dialogueExcerpt: string;
    translationVi?: string;
    wordBreakdown?: VocabBreakdownWord[];
    wrongChoiceVi: string;
    correctAnswer: string;
    examinerInsightVi: string;
  }>;
  audioSnippets: AudioSnippetTrapSample[];
  step3ModelWalkthrough: {
    questionPrompt: string;
    audioDialogueText: string;
    translationVi?: string;
    wordBreakdown?: VocabBreakdownWord[];
    audioTimestampAuditVi: string[];
    concludingStrategyVi: string;
  };
  gatewayQuiz: MethodologyQuizItem[];
  unlockedPracticeRoute: {
    nameVi: string;
    href: string;
    descriptionVi: string;
  };
}

export const MOCK_LISTENING_METHODS: ListeningSectionBlueprintLesson[] = [
  // =========================================================================
  // SECTION 1: GIAO DỊCH XÃ HỘI THƯỜNG NHẬT & BẪY TỰ SỬA (SELF-CORRECTION)
  // =========================================================================
  {
    id: "listening-section1-self-correction",
    sectionNumber: 1,
    title: "Kỹ Năng Nền Tảng: Quy Trình 3 Bước Chuẩn 30s & Bắt Số, Tên Riêng, Ngày Tháng & Hóa Giải Bẫy Tự Sửa (Self-Correction)",
    subtitle: "Dạy kỹ năng nghe Section 1 trước khi luyện tập • Bắt trọn 10/10 câu khởi động chuẩn Cambridge",
    targetBand: "Band 4.5 ➔ 6.5+",
    estimatedMinutes: 20,
    timeBudgetSeconds: 45,
    step1Principles: {
      contextOverviewVi:
        "Section 1 là phần 'kiếm điểm dễ nhất' trong IELTS Listening! Đây luôn là cuộc gọi hoặc trò chuyện giữa 2 người về những việc rất đời thường (Đặt phòng khách sạn, thuê nhà, hỏi tour du lịch). Đề thi chỉ yêu cầu bạn điền từ hoặc số vào một tờ biểu mẫu.\n💡 Bẫy kinh điển: Người nói rất hay 'quay xe phút chót' (Self-Correction) — đọc một con số rất rõ ràng, nhưng 2 giây sau liền bảo 'Ấy chết xin lỗi, số đó là số cũ, số mới là...'!",
      keySkillsRequiredVi: [
        "1. Kỹ năng nghe đánh vần tên riêng (Spelling): Chú ý các chữ cái người Việt hay nhầm lẫn: A (ây) / E (i) / I (ai), J (giây) / G (đi), H (ếch) / 8 (eight), W (đắp-bồ-diu).",
        "2. Kỹ năng nghe số điện thoại: Số 0 thường đọc là 'oh' (như chữ O) hoặc 'zero', hai số giống nhau đọc là 'double' (double five = 55), ba số đọc là 'triple' (triple seven = 777).",
        "3. Kỹ năng nghe mã bưu điện (Postcode Anh): Luôn gồm cả chữ cái và con số (ví dụ: 'BS8 1TH'). Hãy viết hoa toàn bộ chữ cái!",
        "4. Kỹ năng nghe ngày tháng: Ngày thường có đuôi thứ tự (1st, 2nd, 3rd, 14th) và tên tháng viết bằng chữ (March, October...).",
      ],
      preListeningTechniqueVi:
        "Tận dụng 30 giây vàng trước khi băng chạy: 1) Đọc kỹ giới hạn từ (ví dụ 'NO MORE THAN ONE WORD AND/OR A NUMBER' nghĩa là tối đa 1 từ và/hoặc 1 số); 2) Nhìn vào ô trống và 'đoán trước thông tin': Chỗ này cần Tên người, Số điện thoại, Địa chỉ hay Giá tiền? Đoán trước là tai bạn sẽ tự động 'bắt sóng' thông tin đó!",
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Tự Sửa Thông Tin Phút Chót (Self-Correction Trap)",
        trapMechanismVi:
          "Người nói ban đầu đưa ra một thông tin (số nhà, ngày, giá tiền) rất rõ ràng để thí sinh vội vàng ghi chép, nhưng ngay câu tiếp theo liền đính chính lại bằng cụm từ sửa sai ('Oh sorry', 'Actually no', 'That was my previous flat').",
        dialogueExcerpt:
          "OFFICER: What is your current residential address?\nAPPLICANT: It's 14 Park Avenue... oh wait, sorry, that was my old apartment. We moved to 40 Park Road last month.",
        translationVi:
          "CÁN BỘ: Địa chỉ thường trú hiện tại của bạn là gì?\nỨNG VIÊN: Là số 14 Đại lộ Park... ồ khoan đã, xin lỗi, đó là căn hộ cũ của tôi. Chúng tôi đã chuyển đến số 40 Đường Park vào tháng trước.",
        wordBreakdown: [
          { word: "residential address", ipa: "/ˌrez.ɪˈden.ʃəl əˈdres/", type: "phrase", meaningVi: "địa chỉ thường trú" },
          { word: "apartment", ipa: "/əˈpɑːt.mənt/", type: "n", meaningVi: "căn hộ chung cư" },
          { word: "applicant", ipa: "/ˈæp.lɪ.kənt/", type: "n", meaningVi: "người nộp đơn, ứng viên" },
        ],
        wrongChoiceVi: "14 Park Avenue (Ghi ngay khi vừa nghe thấy)",
        correctAnswer: "40 Park Road",
        examinerInsightVi: "Luôn giữ bút lơ lửng thêm 2 giây sau khi nghe con số đầu tiên để bắt tín hiệu tự sửa lỗi.",
      },
    ],
    audioSnippets: [
      {
        id: "snip_s1_1",
        titleVi: "Minh họa Bẫy Tự Sửa Giá Thuê",
        transcriptText:
          "CLIENT: So how much is the standard weekly rent?\nLANDLORD: It's usually 185 pounds per person, but since you are booking for the whole academic semester, I can reduce it to 165 pounds.",
        translationVi:
          "KHÁCH HÀNG: Vậy giá thuê tiêu chuẩn hàng tuần là bao nhiêu?\nCHỦ NHÀ: Thường là 185 bảng mỗi người, nhưng vì bạn đặt thuê cho cả học kỳ, tôi có thể giảm xuống còn 165 bảng.",
        wordBreakdown: [
          { word: "weekly rent", ipa: "/ˈwiːk.li rent/", type: "phrase", meaningVi: "giá tiền thuê theo tuần" },
          { word: "academic semester", ipa: "/ˌæk.əˈdem.ɪk sɪˈmes.tər/", type: "phrase", meaningVi: "học kỳ đại học" },
        ],
        trapExplanationVi: "Con số 185 là giá gốc gây nhiễu, con số thực tế thanh toán là 165 bảng.",
        correctAnswerText: "165",
      },
    ],
    step3ModelWalkthrough: {
      questionPrompt: "Notes: Total advance deposit: £ [ _____ ]",
      audioDialogueText:
        "OFFICER: The security deposit will be £300... although if you pay today by bank transfer, we only take £250 upfront.",
      translationVi:
        "CÁN BỘ: Tiền đặt cọc an toàn sẽ là 300 bảng... mặc dù nếu bạn chuyển khoản ngân hàng ngay hôm nay, chúng tôi chỉ thu trước 250 bảng.",
      wordBreakdown: [
        { word: "security deposit", ipa: "/sɪˈkjʊə.rə.ti dɪˈpɒz.ɪt/", type: "phrase", meaningVi: "tiền đặt cọc đảm bảo" },
        { word: "bank transfer", ipa: "/ˈbæŋk ˌtræns.fɜːr/", type: "phrase", meaningVi: "chuyển khoản qua ngân hàng" },
        { word: "upfront", ipa: "/ʌpˈfrʌnt/", type: "adv", meaningVi: "thanh toán trước, trả trước" },
      ],
      audioTimestampAuditVi: [
        "00:03 - Người nói phát âm '£300' ➔ Đây là con số mồi nhử (Distractor).",
        "00:06 - Người nói dùng liên từ nhượng bộ 'although... we only take £250 upfront' ➔ Con số 250 mới là tiền đặt cọc trước.",
        "00:09 - Điền '250' vào bài thi.",
      ],
      concludingStrategyVi: "Nguyên tắc: Thông tin sau liên từ 'although / but / actually / wait' mới là đáp án chốt.",
    },
    gatewayQuiz: [
      {
        id: "s1_q1",
        prompt:
          "Trong Section 1, người nói đọc: 'My telephone is 0794... wait, double nine four, 812.' Số điện thoại đúng là gì?",
        options: [
          "A. 0794 812",
          "B. 0799 4812",
          "C. 0799 94812",
          "D. 0794 4812",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "'double nine four' nghĩa là hai số 9 và một số 4 (07994812).",
      },
      {
        id: "s1_q2",
        prompt: "Khi gặp bẫy Self-Correction trong Listening, từ nối nào sau đây báo hiệu người nói sắp đổi đáp án?",
        options: [
          "A. Furthermore, in addition",
          "B. Oh wait, actually, sorry, no, let me check",
          "C. Consequently, as a result",
          "D. Similarly, likewise",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "Các từ cảm thán và xin lỗi (Oh wait, actually, sorry) là dấu hiệu kinh điển của việc đính chính thông tin.",
      },
      {
        id: "s1_q3",
        prompt: "Nếu đề bài yêu cầu: 'ONE WORD AND/OR A NUMBER', đáp án nào sau đây hợp lệ?",
        options: [
          "A. 14 Park Avenue",
          "B. July 14th",
          "C. 250 pounds",
          "D. Large red car",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "'July 14th' là 1 từ ('July') và 1 số ('14th') ➔ Khớp đúng quy định ONE WORD AND/OR A NUMBER.",
      },
      {
        id: "s1_q4",
        prompt: "Khi người bản xứ đọc số 0 trong dãy số điện thoại hoặc mã số, họ thường phát âm thế nào?",
        options: [
          "A. 'Nil'",
          "B. 'Oh' hoặc 'Zero'",
          "C. 'None'",
          "D. 'Ought'",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Số 0 trong tiếng Anh Anh/Úc thường đọc là âm 'Oh' /oʊ/.",
      },
      {
        id: "s1_q5",
        prompt: "Người nói nói: 'The flight leaves at quarter to five.' Thời gian bay là mấy giờ?",
        options: [
          "A. 5:15",
          "B. 4:45",
          "C. 5:45",
          "D. 4:15",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "'Quarter to five' là 5 giờ kém 15 phút, tức 4:45.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Nghe Section 1 & 2 Dictation",
      href: "/practice/listening-s1-s2",
      descriptionVi: "Thực hành bắt số, tên riêng và vượt bẫy tự sửa trên 10 bài hội thoại thực tế.",
    },
  },

  // =========================================================================
  // SECTION 2: BẢN ĐỒ/SƠ ĐỒ KHÔNG GIAN & BẪY ĐỔI HƯỚNG
  // =========================================================================
  {
    id: "listening-section2-map-orientation",
    sectionNumber: 2,
    title: "Section 2: Chiến Lược Đọc Bản Đồ/Sơ Đồ (Map & Plan Labelling) & Hệ Từ Vựng Không Gian",
    subtitle: "Kỹ thuật ghim Điểm Xuất Phát (Anchor Point) • Định vị chính xác trong 30 giây",
    targetBand: "Band 6.0 ➔ 7.0+",
    estimatedMinutes: 25,
    timeBudgetSeconds: 60,
    step1Principles: {
      contextOverviewVi:
        "Section 2 là một bài thuyết trình của 1 người (như hướng dẫn viên du lịch, nhân viên bảo tàng) giới thiệu về một địa điểm hoặc sự kiện. Dạng bài hay gặp nhất và khiến học sinh bối rối nhất là: Nghe chỉ đường trên Bản đồ (Map/Plan Labelling).\n💡 Hiểu nôm na là gì? Giống như bạn đang đứng ở cổng công viên và lắng nghe bảo vệ chỉ đường: 'Đi thẳng, rẽ trái, đối diện hồ nước là nhà vệ sinh'. Điểm mấu chốt là bạn phải tưởng tượng mình đang đứng ở đó và bước đi theo lời người ta!",
      keySkillsRequiredVi: [
        "1. Xác định ngay 'Điểm xuất phát' (Anchor Point): Tìm chữ 'You are here' (Bạn đang ở đây) hoặc 'Main Entrance' (Cổng chính). Đặt đầu bút chì sẵn ở điểm đó!",
        "2. Nhận diện các từ chỉ hướng: Nhìn la bàn góc bản đồ (North = Bắc/Trên, South = Nam/Dưới, East = Đông/Phải, West = Tây/Trái) và hướng cơ thể (Left = Trái, Right = Phải, Straight ahead = Đi thẳng, Opposite = Đối diện, Next to / Adjacent = Ngay bên cạnh).",
        "3. Kỹ thuật 'di chuyển ngòi bút': Băng đọc đến đâu, rê đầu bút chì theo đường đi của người nói đến đó, không bao giờ để mắt rời khỏi bản đồ.",
      ],
      preListeningTechniqueVi:
        "Trong 30 giây chuẩn bị: Dùng mắt quét thật nhanh các địa điểm ĐÃ CÓ TÊN trên bản đồ (Cây cầu, Hồ nước, Quán cà phê). Đây chính là các 'cột mốc vàng' giúp bạn lấy lại phương hướng nếu lỡ nghe mất 1 nhịp.",
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Đổi Hướng Phút Chót (Directional Flip Trap)",
        trapMechanismVi:
          "Người nói hướng dẫn đi về một hướng, nhưng sau đó bất ngờ rẽ ngoặt hoặc chỉ một địa điểm nằm ở phía đối diện.",
        dialogueExcerpt:
          "GUIDE: As you walk along the River Path towards the Old Mill, don't cross the wooden bridge; instead, take the narrow gravel trail to your immediate right...",
        translationVi:
          "HƯỚNG DẪN VIÊN: Khi bạn đi dọc theo Con đường ven sông hướng về phía Cối xay gió cổ, đừng băng qua cây cầu gỗ; thay vào đó, hãy rẽ vào lối mòn rải sỏi hẹp ngay bên tay phải của bạn...",
        wordBreakdown: [
          { word: "gravel trail", ipa: "/ˈɡræv.əl treɪl/", type: "phrase", meaningVi: "lối mòn nhỏ rải sỏi" },
          { word: "immediate right", ipa: "/ɪˈmiː.di.ət raɪt/", type: "phrase", meaningVi: "ngay sát bên tay phải" },
        ],
        wrongChoiceVi: "Khu vực bên kia cầu gỗ (vì nghe thấy 'wooden bridge')",
        correctAnswer: "Khu vực bên phải lối mòn rải sỏi",
        examinerInsightVi: "Cụm 'don't cross the bridge; instead...' là bẫy phủ định hành động.",
      },
    ],
    audioSnippets: [
      {
        id: "snip_s2_1",
        titleVi: "Minh họa Định Vị Không Gian",
        transcriptText:
          "GUIDE: Starting from the Visitor Centre, if you head due north past the duck pond, the Butterfly Sanctuary is situated in the far northwest corner, right next to the Rose Garden.",
        translationVi:
          "HƯỚNG DẪN VIÊN: Bắt đầu từ Trung tâm đón tiếp du khách, nếu bạn đi thẳng về hướng Bắc qua hồ vịt, Khu bảo tồn bướm nằm ở góc xa nhất phía Tây Bắc, ngay sát cạnh Vườn hoa hồng.",
        wordBreakdown: [
          { word: "sanctuary", ipa: "/ˈsæŋk.tʃʊə.ri/", type: "n", meaningVi: "khu bảo tồn thiên nhiên" },
          { word: "head due north", ipa: "/hed djuː nɔːθ/", type: "phrase", meaningVi: "đi thẳng hướng chính Bắc" },
        ],
        trapExplanationVi: "Xác định điểm mốc duck pond ➔ Đi về hướng Tây Bắc (northwest corner).",
        correctAnswerText: "Butterfly Sanctuary",
      },
    ],
    step3ModelWalkthrough: {
      questionPrompt: "Map Label A: Location of the [ _____ ]",
      audioDialogueText:
        "GUIDE: Right opposite the main ticket booth, on your left-hand side as you enter through the south gate, you will spot the newly constructed Café.",
      translationVi:
        "HƯỚNG DẪN VIÊN: Nằm ngay đối diện quầy vé chính, ở bên tay trái khi bạn bước vào qua cổng Nam, bạn sẽ thấy Quán Cà phê mới xây.",
      wordBreakdown: [
        { word: "ticket booth", ipa: "/ˈtɪk.ɪt buːð/", type: "phrase", meaningVi: "quầy bán vé" },
        { word: "opposite", ipa: "/ˈɒp.ə.zɪt/", type: "adj", meaningVi: "đối diện" },
      ],
      audioTimestampAuditVi: [
        "00:03 - Định vị điểm xuất phát: 'enter through the south gate' (Cổng Nam).",
        "00:06 - Xác định hướng cơ thể: 'on your left-hand side' (bên tay trái).",
        "00:08 - Đối chiếu mốc phụ: 'opposite the main ticket booth' ➔ Điền 'Café'.",
      ],
      concludingStrategyVi: "Luôn đặt ngón tay hoặc con trỏ chuột di chuyển theo lời hướng dẫn của Audio.",
    },
    gatewayQuiz: [
      {
        id: "s2_q1",
        prompt: "Bước đầu tiên QUAN TRỌNG NHẤT khi làm dạng bài Map/Plan Labelling là gì?",
        options: [
          "A. Đọc câu hỏi cuối cùng trước.",
          "B. Tìm Điểm Xuất Phát (Anchor Point - ví dụ 'You are here' hoặc 'Main Entrance') trên bản đồ.",
          "C. Nhắm mắt lại để tập trung nghe.",
          "D. Đếm số lượng tòa nhà.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Nếu không xác định đúng điểm xuất phát (Anchor Point), bạn sẽ bị lạc hướng toàn bộ bản đồ.",
      },
      {
        id: "s2_q2",
        prompt: "Cụm từ 'adjacent to the Botanical Greenhouse' có nghĩa là gì?",
        options: [
          "A. Nằm đối diện nhà kính thực vật",
          "B. Nằm ngay sát cạnh / liền kề nhà kính thực vật",
          "C. Nằm bên trong nhà kính thực vật",
          "D. Nằm cách xa nhà kính thực vật",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "'adjacent to' = 'next to' / 'adjoining' = ngay sát cạnh, liền kề.",
      },
      {
        id: "s2_q3",
        prompt: "Nếu người nói hướng mặt về phía Bắc (North), hướng bên tay TRÁI của họ là hướng nào?",
        options: ["A. East (Đông)", "B. South (Nam)", "C. West (Tây)", "D. North-East (Đông Bắc)"],
        correctIndex: 2,
        trapCategory: "careless_reading",
        trapAnalysis: "Đứng nhìn về hướng Bắc, bên tay trái là hướng Tây (West), bên tay phải là hướng Đông (East).",
      },
      {
        id: "s2_q4",
        prompt: "Khi người nói nói: 'Before reaching the bridge, take a sharp left', địa điểm nằm ở đâu?",
        options: [
          "A. Sau khi đã đi qua cầu",
          "B. Ở ngay trên cầu",
          "C. Rẽ trái trước khi đi đến cây cầu",
          "D. Rẽ phải ở chân cầu",
        ],
        correctIndex: 2,
        trapCategory: "careless_reading",
        trapAnalysis: "'Before reaching the bridge' ➔ Tuyệt đối chưa đi qua cầu.",
      },
      {
        id: "s2_q5",
        prompt: "Trong Section 2, thứ tự các câu hỏi trên bản đồ được đánh số như thế nào?",
        options: [
          "A. Đi ngẫu nhiên không theo quy luật.",
          "B. Tuân thủ 100% theo lộ trình di chuyển của người nói trong bài audio.",
          "C. Luôn đi từ trái sang phải.",
          "D. Luôn đi theo chiều kim đồng hồ.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Các câu hỏi được đọc theo đúng lộ trình di chuyển tuyến tính của người nói.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Nghe Bản Đồ Không Gian Section 2",
      href: "/practice/listening-map",
      descriptionVi: "Thực hành 4 bản đồ sơ đồ chuẩn Cambridge với các bẫy đổi hướng thời gian thực.",
    },
  },

  // =========================================================================
  // SECTION 3: HỘI THOẠI HỌC THUẬT & BẪY ĐỒNG THUẬN GIẢ (FALSE CONSENSUS)
  // =========================================================================
  {
    id: "listening-section3-false-consensus",
    sectionNumber: 3,
    title: "Section 3: Chiến Lược Hội Thoại Đa Chủ Thể & Bẫy Đồng Thuận GiẢ (False Consensus)",
    subtitle: "Theo dấu lượt nói 2-3 người • Bắt bẫy nhượng bộ và lật ngược quan điểm học thuật",
    targetBand: "Band 6.5 ➔ 7.5+",
    estimatedMinutes: 25,
    timeBudgetSeconds: 50,
    step1Principles: {
      contextOverviewVi:
        "Section 3 là cuộc thảo luận học thuật giữa 2-3 sinh viên với giáo sư hướng dẫn về đề tài nghiên cứu, thuyết trình, luận văn tốt nghiệp. Thách thức lớn nhất là phân biệt ai là người đưa ra ý kiến và sự đồng thuận cuối cùng.",
      keySkillsRequiredVi: [
        "1. Kỹ năng gán nhãn giọng nói nhân vật (Speaker Attribution: Ai là Maya, ai là Liam, ai là Professor?).",
        "2. Kỹ năng nhận diện cấu trúc đồng ý một phần rồi phủ định (*'I agree up to a point, but...', 'That sounds plausible, however...'*)",
        "3. Kỹ năng phân biệt quan điểm ban đầu (Initial view) vs Thỏa hiệp cuối cùng (Consensus reached).",
      ],
      preListeningTechniqueVi:
        "Đọc kỹ câu hỏi để biết đề đang hỏi ý kiến của RIÊNG MỘT NGƯỜI (ví dụ 'What does Maya think...?') hay là ý kiến ĐỒNG THUẬN CẢ NHÓM ('What do BOTH students agree on?').",
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Đồng Thuận Giả (False Consensus Trap)",
        trapMechanismVi:
          "Sinh viên A đề xuất một phương án rất nhiệt tình, Sinh viên B ban đầu nói 'Yes/Sure', nhưng ngay sau đó đưa ra lý do bác bỏ và đề xuất phương án khác mà cả hai cùng gật đầu.",
        dialogueExcerpt:
          "LIAM: We could focus our presentation on marine microplastics in the Pacific.\nMAYA: Yeah, that's interesting, but Professor Jones mentioned that everyone is doing that topic. How about we examine river pollution instead?\nLIAM: That's a much better idea.",
        translationVi:
          "LIAM: Chúng ta có thể tập trung bài thuyết trình vào các hạt vi nhựa trong đại dương ở Thái Bình Dương.\nMAYA: Ừm, đề tài đó thú vị, nhưng Giáo sư Jones có nhắc rằng ai cũng làm đề tài đó rồi. Hay là chúng ta nghiên cứu về ô nhiễm sông ngòi thay vào đó?\nLIAM: Đó là một ý tưởng hay hơn nhiều.",
        wordBreakdown: [
          { word: "microplastics", ipa: "/ˈmaɪ.krəʊˌplæs.tɪks/", type: "n", meaningVi: "hạt vi nhựa" },
          { word: "river pollution", ipa: "/ˈrɪv.ər pəˈluː.ʃən/", type: "phrase", meaningVi: "ô nhiễm nguồn nước sông" },
          { word: "presentation", ipa: "/ˌprez.ənˈteɪ.ʃən/", type: "n", meaningVi: "bài thuyết trình học thuật" },
        ],
        wrongChoiceVi: "Pacific ocean microplastics (vì cả hai đều nhắc đến)",
        correctAnswer: "River pollution",
        examinerInsightVi: "Cụm 'Yeah, but...' là tín hiệu từ chối khéo, không phải là đồng thuận thực sự.",
      },
    ],
    audioSnippets: [
      {
        id: "snip_s3_1",
        titleVi: "Minh họa Bẫy Nhượng Bộ Học Thuật",
        transcriptText:
          "PROFESSOR: Have you decided on the sample size for your experiment?\nSTUDENT: I originally planned thirty samples, but after reviewing similar dissertations, fifty appears to be the minimum for statistical significance.",
        translationVi:
          "GIÁO SƯ: Các em đã chốt kích thước mẫu cho thí nghiệm chưa?\nSINH VIÊN: Ban đầu em dự tính 30 mẫu, nhưng sau khi tham khảo các luận văn tương tự, 50 mẫu dường như là mức tối thiểu để đạt độ tin cậy thống kê.",
        wordBreakdown: [
          { word: "sample size", ipa: "/ˈsɑːm.pəl saɪz/", type: "phrase", meaningVi: "cỡ mẫu điều tra / thí nghiệm" },
          { word: "dissertation", ipa: "/ˌdɪs.əˈteɪ.ʃən/", type: "n", meaningVi: "luận văn tốt nghiệp" },
          { word: "statistical significance", ipa: "/stəˈtɪs.tɪ.kəl sɪɡˈnɪf.ɪ.kəns/", type: "phrase", meaningVi: "ý nghĩa thống kê" },
        ],
        trapExplanationVi: "Số 30 là dự định ban đầu, số 50 mới là quyết định chốt.",
        correctAnswerText: "50",
      },
    ],
    step3ModelWalkthrough: {
      questionPrompt: "What do the students agree was the main flaw of their pilot survey?",
      audioDialogueText:
        "MAYA: I thought the questionnaire was too lengthy.\nLIAM: Well, the length was fine, but the questions were phrased too ambiguously, leading to misleading responses.\nMAYA: You're right, several respondents misunderstood question four completely.",
      translationVi:
        "MAYA: Mình thấy bảng câu hỏi quá dài dòng.\nLIAM: Ồ, độ dài thì không sao, nhưng các câu hỏi được đặt quá mơ hồ, dẫn đến các câu trả lời sai lệch.\nMAYA: Cậu nói chuẩn, một số người trả lời đã hiểu nhầm hoàn toàn câu hỏi số 4.",
      wordBreakdown: [
        { word: "questionnaire", ipa: "/ˌkwes.tʃəˈneər/", type: "n", meaningVi: "bảng câu hỏi khảo sát" },
        { word: "lengthy", ipa: "/ˈleŋ.θi/", type: "adj", meaningVi: "dài dòng lê thê" },
        { word: "ambiguously", ipa: "/æmˈbɪɡ.ju.əs.li/", type: "adv", meaningVi: "một cách mơ hồ, đa nghĩa" },
        { word: "misleading", ipa: "/mɪsˈliː.dɪŋ/", type: "adj", meaningVi: "gây hiểu sai lệch" },
      ],
      audioTimestampAuditVi: [
        "00:03 - Maya nêu ý kiến: 'questionnaire too lengthy' ➔ Liam phản bác 'length was fine'.",
        "00:06 - Liam đưa ra lỗi thực sự: 'phrased too ambiguously'.",
        "00:09 - Maya đồng thuận: 'You're right, misunderstood completely' ➔ Chốt đáp án: Ambiguous phrasing.",
      ],
      concludingStrategyVi: "Chỉ chọn đáp án khi CẢ HAI nhân vật cùng xác nhận tán thành.",
    },
    gatewayQuiz: [
      {
        id: "s3_q1",
        prompt: "Khi nghe thấy nhân vật nói: 'I agree in principle, but...', điều này có nghĩa là gì?",
        options: [
          "A. Nhân vật hoàn toàn đồng ý 100% với ý kiến trước.",
          "B. Nhân vật đang chuẩn bị đưa ra lý do phản bác hoặc hạn chế của ý kiến đó.",
          "C. Cuộc hội thoại đã kết thúc.",
          "D. Nhân vật không hiểu câu hỏi.",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "'In principle, but...' là cấu trúc nhượng bộ kinh điển để mở đường cho sự phản bác.",
      },
      {
        id: "s3_q2",
        prompt: "Nếu câu hỏi là 'What does Liam think about the research topic?', bạn phải làm gì?",
        options: [
          "A. Chọn bất kỳ ý kiến nào được nhắc đến đầu tiên.",
          "B. Chỉ tập trung nghe phát ngôn và lập trường của riêng nhân vật Liam, bỏ qua bẫy của Maya.",
          "C. Chỉ nghe lời của Giáo sư.",
          "D. Chọn ý kiến của Maya.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Bẫy Speaker Attribution: Đề hỏi riêng Liam thì chỉ ghi nhận quan điểm của Liam.",
      },
      {
        id: "s3_q3",
        prompt: "Cụm từ nào sau đây thể hiện sự đồng thuận tuyệt đối (Consensus) giữa 2 sinh viên?",
        options: [
          "A. 'I suppose we could, if there's no other choice.'",
          "B. 'Exactly, that solves our primary dilemma.'",
          "C. 'I'm not so sure about that.'",
          "D. 'Let's ask the tutor first.'",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "'Exactly, that solves our primary dilemma' thể hiện sự tán thành và đồng thuận hoàn toàn.",
      },
      {
        id: "s3_q4",
        prompt: "Trong Section 3, tại sao thí sinh hay bị mất dấu câu hỏi?",
        options: [
          "A. Vì các nhân vật nói xen kẽ nhau với tốc độ nhanh và có sự đảo ngược quan điểm liên tục.",
          "B. Vì bài thi quá ngắn.",
          "C. Vì chỉ có một người nói.",
          "D. Vì đề thi không có từ khóa.",
        ],
        correctIndex: 0,
        trapCategory: "careless_reading",
        trapAnalysis: "Sự thay đổi lượt nói (Turn-taking) nhanh đòi hỏi phải luôn nhìn trước 2 câu hỏi trong đề.",
      },
      {
        id: "s3_q5",
        prompt: "Quy tắc vàng khi làm bài trắc nghiệm Multiple Choice trong Section 3 là gì?",
        options: [
          "A. Nghe thấy từ nào giống trong đáp án là khoanh ngay.",
          "B. Cảnh giác với các từ khóa xuất hiện trong đáp án sai (Distractor Trap) và đợi đến khi cả nhóm chốt quyết định.",
          "C. Luôn chọn đáp án dài nhất.",
          "D. Luôn chọn đáp án C.",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "Tất cả các phương án A, B, C đều sẽ được nhắc đến trong bài, nhưng chỉ có 1 phương án là thỏa hiệp cuối cùng.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Nghe Section 3 Consensus",
      href: "/practice/listening-s3-consensus",
      descriptionVi: "Thực hành bắt bẫy đồng thuận giả trên 5 bài hội thoại nhóm học thuật chuẩn C1.",
    },
  },

  // =========================================================================
  // SECTION 4: BÀI GIẢNG ĐỘC THOẠI HỌC THUẬT & GHI CHÚ PHÂN CẤP
  // =========================================================================
  {
    id: "listening-section4-hierarchical-notes",
    sectionNumber: 4,
    title: "Section 4: Chiến Lược Bài Giảng Độc Thoại Học Thuật (Lecture Monologue) & Ghi Chú Phân Cấp",
    subtitle: "Kỹ thuật bắt từ tín hiệu dẫn đường (Signposting Cues) • Triệt tiêu lỗi số ít/số nhiều",
    targetBand: "Band 7.0 ➔ 8.5+",
    estimatedMinutes: 25,
    timeBudgetSeconds: 40,
    step1Principles: {
      contextOverviewVi:
        "Section 4 là bài giảng đại học độc thoại kéo dài 6-7 phút không có thời gian nghỉ giữa chừng (No Pause in Middle). Dạng bài duy nhất là Note/Flowchart/Summary Completion với 10 câu hỏi liên tiếp đòi hỏi sự tập trung cực độ.",
      keySkillsRequiredVi: [
        "1. Kỹ năng nhận diện Từ Tín Hiệu Dẫn Đường (Signposting Cues: 'Turning now to...', 'The fundamental characteristic is...', 'In contrast to previous findings...').",
        "2. Kỹ năng dự đoán từ loại và đuôi số nhiều '-s' / '-es' trong 60 giây đọc đề ban đầu.",
        "3. Kỹ năng ghi chép tốc ký phân cấp (Hierarchical Note-Taking) theo tiêu đề lớn (Major Headings) và gạch đầu dòng (Sub-bullets).",
      ],
      preListeningTechniqueVi:
        "Tận dụng toàn bộ 60 giây đọc lướt qua cả 10 câu hỏi, khoanh tròn các Heading lớn để tạo khung bản đồ dẫn đường (Signpost Map) giúp không bao giờ bị lạc khi giáo sư chuyển ý.",
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Rơi Đuôi Số Nhiều (-s / -es Trap)",
        trapMechanismVi:
          "Giáo sư phát âm từ khóa ở dạng số nhiều với âm đuôi nhẹ ('specimens', 'catalysts'), nhưng thí sinh chỉ nghe được từ gốc và viết dạng số ít ('specimen'), dẫn đến mất điểm oan uổng.",
        dialogueExcerpt:
          "LECTURER: When examining ancient archaeological sediment, researchers must preserve delicate bone specimens under controlled atmospheric pressure...",
        translationVi:
          "GIẢNG VIÊN: Khi kiểm tra trầm tích khảo cổ học cổ đại, các nhà nghiên cứu phải bảo quản các mẫu xương mỏng manh dưới áp suất khí quyển được kiểm soát nghiêm ngặt...",
        wordBreakdown: [
          { word: "sediment", ipa: "/ˈsed.ɪ.mənt/", type: "n", meaningVi: "trầm tích địa chất" },
          { word: "archaeological", ipa: "/ˌɑː.ki.əˈlɒdʒ.ɪ.kəl/", type: "adj", meaningVi: "thuộc khảo cổ học" },
          { word: "specimens", ipa: "/ˈspes.ə.mɪnz/", type: "n", meaningVi: "mẫu vật khảo nghiệm (số nhiều)" },
        ],
        wrongChoiceVi: "specimen (thiếu 's')",
        correctAnswer: "specimens (hoặc bone specimens)",
        examinerInsightVi: "Nếu câu hỏi có mạo từ 'a/an' ➔ Số ít; nếu không có mạo từ và là danh từ đếm được ➔ 90% là số nhiều có 's'.",
      },
    ],
    audioSnippets: [
      {
        id: "snip_s4_1",
        titleVi: "Minh họa Bắt Từ Tín Hiệu Dẫn Đường",
        transcriptText:
          "LECTURER: Having covered the evolutionary ancestry of cetaceans, I'd like to now shift our focus towards their echolocation capabilities.",
        translationVi:
          "GIẢNG VIÊN: Sau khi đã nói về tổ tiên tiến hóa của bộ cá voi, bây giờ tôi muốn chuyển sự chú ý sang khả năng định vị bằng sóng âm của chúng.",
        wordBreakdown: [
          { word: "evolutionary ancestry", ipa: "/ˌiː.vəˈluː.ʃən.ər.i ˈæn.ses.tri/", type: "phrase", meaningVi: "tổ tiên theo tiến hóa" },
          { word: "echolocation", ipa: "/ˌek.əʊ.ləʊˈkeɪ.ʃən/", type: "n", meaningVi: "khả năng định vị bằng tiếng vang" },
        ],
        trapExplanationVi: "Cụm 'shift our focus towards...' báo hiệu giáo sư chuyển sang mục Heading tiếp theo trong đề thi.",
        correctAnswerText: "echolocation",
      },
    ],
    step3ModelWalkthrough: {
      questionPrompt: "Lecture Notes: Deep-sea coral reefs rely heavily on ambient [ _____ ] for sustenance.",
      audioDialogueText:
        "LECTURER: Contrary to shallow-water species which depend on sunlight, abyssal coral colonies derive their vital nutrients primarily from subterranean hydrothermal currents.",
      translationVi:
        "GIẢNG VIÊN: Trái ngược với các loài ở vùng nước nông phụ thuộc vào ánh sáng mặt trời, các rạn san hô dưới vực thẳm lấy chất dinh dưỡng thiết yếu chủ yếu từ các dòng thủy nhiệt ngầm.",
      wordBreakdown: [
        { word: "abyssal", ipa: "/əˈbɪs.əl/", type: "adj", meaningVi: "thuộc vực thẳm đại dương" },
        { word: "vital nutrients", ipa: "/ˈvaɪ.təl ˈnjuː.tri.ənts/", type: "phrase", meaningVi: "dưỡng chất sống còn" },
        { word: "hydrothermal currents", ipa: "/ˌhaɪ.drəʊˈθɜː.məl ˈkʌr.ənts/", type: "phrase", meaningVi: "các dòng thủy nhiệt" },
      ],
      audioTimestampAuditVi: [
        "00:03 - Giáo sư đối chiếu loài nước nông ('depend on sunlight') ➔ Mồi nhử.",
        "00:07 - Giáo sư nói về loài san hô biển sâu: 'derive nutrients primarily from hydrothermal currents'.",
        "00:10 - Điền 'hydrothermal currents' hoặc 'currents'.",
      ],
      concludingStrategyVi: "Chú ý cấu trúc 'derive nutrients from' = 'rely for sustenance'.",
    },
    gatewayQuiz: [
      {
        id: "s4_q1",
        prompt: "Trong Section 4, có khoảng thời gian nghỉ 30 giây ở giữa câu 35 và câu 36 không?",
        options: [
          "A. Có, giống như Section 1, 2 và 3.",
          "B. Tuyệt đối KHÔNG, Section 4 phát liên tục 10 câu từ câu 31 đến 40 không nghỉ.",
          "C. Chỉ có khi thi trên máy tính.",
          "D. Tùy thuộc vào từng bài thi.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Section 4 là phần thi duy nhất phát liên tục 10 câu không có quãng nghỉ giữa bài.",
      },
      {
        id: "s4_q2",
        prompt: "Cụm từ nào sau đây là Từ Tín Hiệu (Signposting Cue) báo hiệu bài giảng sắp chuyển sang mục lớn tiếp theo?",
        options: [
          "A. 'And', 'Also'",
          "B. 'Now, turning to the commercial implications...', 'Let us now examine...'",
          "C. 'For example', 'Such as'",
          "D. 'In other words'",
        ],
        correctIndex: 1,
        trapCategory: "paraphrase_trap",
        trapAnalysis: "'Now, turning to...' hoặc 'Let us examine...' là signposts chuyển mục lớn.",
      },
      {
        id: "s4_q3",
        prompt: "Chỗ trống trong câu: 'The primary cause of coastal erosion is strong _____' đứng sau tính từ 'strong' không có mạo từ 'a'. Danh từ điền vào khả năng cao ở dạng nào?",
        options: [
          "A. Danh từ đếm được số ít (e.g. wind)",
          "B. Danh từ không đếm được hoặc Danh từ số nhiều (e.g. currents / waves)",
          "C. Động từ thêm ing",
          "D. Trạng từ",
        ],
        correctIndex: 1,
        trapCategory: "grammar",
        trapAnalysis: "Không có 'a/an' nên nếu là danh từ đếm được bắt buộc phải ở dạng số nhiều (waves, currents).",
      },
      {
        id: "s4_q4",
        prompt: "Nếu trong Section 4 bạn vô tình bị lỡ mất đáp án của câu 33, hành động CHÍNH XÁC NHẤT là gì?",
        options: [
          "A. Ngồi nghĩ lại câu 33 xem vừa nghe thấy gì.",
          "B. Bỏ qua câu 33 ngay lập tức, nhìn ngay sang câu 34 và 35 để không bị trượt dốc liên hoàn cả bài.",
          "C. Giơ tay xin giám thị phát lại đoạn băng.",
          "D. Dừng làm bài.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "Nguyên tắc vàng: Khi bị lỡ 1 câu, buông bỏ ngay lập tức để bảo vệ các câu tiếp theo.",
      },
      {
        id: "s4_q5",
        prompt: "Trong Section 4, các từ cần điền vào chỗ trống được lấy từ đâu?",
        options: [
          "A. Tự suy nghĩ từ vựng ngoài đời để điền.",
          "B. Lấy chính xác nguyên xi từ ngữ (Exact words) mà giáo sư phát âm trong bài giảng.",
          "C. Tự biến đổi ngữ pháp của từ.",
          "D. Luôn viết hoa tất cả các chữ cái.",
        ],
        correctIndex: 1,
        trapCategory: "careless_reading",
        trapAnalysis: "IELTS Listening Completion yêu cầu lấy chính xác từ người nói phát âm, không tự ý biến đổi dạng từ.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Nghe Section 4 Note-Taking",
      href: "/practice/listening-s4",
      descriptionVi: "Thực hành ghi chú phân cấp trên 4 bài giảng học thuật mật độ cao chuẩn C1/C2.",
    },
  },
];
