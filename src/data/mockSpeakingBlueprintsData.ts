/**
 * Cambridge IELTS Speaking Master Blueprints Dataset
 * 3 Parts Strategy: Part 1 Timeframe Expansion, Part 2 Sensory Grid & Memory Palace, Part 3 6 Social Lenses & Hedging
 * Structured into 3 Pedagogical Steps + Dual Audio Contrast Samples + 5-Question Gateway Mastery Quiz
 */

import { WritingGatewayQuizItem } from "@/data/mockWritingBlueprintsData";
import { VocabBreakdownWord } from "@/types/theoryBookmarks";

export interface SpeakingAudioContrastSample {
  band55Text: string;
  band55TranslationVi?: string;
  band55FlawVi: string;
  band85Text: string;
  band85TranslationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  band85FeatureVi: string;
}

export interface SpeakingExaminerTrapItem {
  trapNameVi: string;
  trapMechanismVi: string;
  band50WrongSample: string;
  band50TranslationVi?: string;
  band80CorrectSample: string;
  band80TranslationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  examinerInsightVi: string;
}

export interface SpeakingBlueprintLesson {
  id: string;
  partNumber: 1 | 2 | 3 | 0; // 0 for all parts
  partNameVi: string;
  title: string;
  subtitle: string;
  bandTarget: string;
  estimatedMinutes: number;
  step1Principles: {
    corePhilosophyVi: string;
    fourCriteriaBreakdownVi: {
      fc: string;
      lr: string;
      gra: string;
      pr: string;
    };
    tacticalFrameworkVi: string[];
  };
  step2ExaminerTraps: SpeakingExaminerTrapItem[];
  audioContrast: SpeakingAudioContrastSample;
  step3ModelDeliveryDissection: {
    examinerQuestion: string;
    examinerQuestionVi?: string;
    modelFullTranscript?: string;
    modelTranscriptTranslationVi?: string;
    wordBreakdown?: VocabBreakdownWord[];
    transcriptAnalysisVi: string[];
    lexicalCollocations: string[];
    concludingStrategyVi: string;
  };
  gatewayQuiz: WritingGatewayQuizItem[];
  unlockedPracticeRoute: {
    nameVi: string;
    href: string;
    descriptionVi: string;
  };
}

export const MOCK_SPEAKING_BLUEPRINTS: SpeakingBlueprintLesson[] = [
  // =========================================================================
  // PART 1: KHUNG MỞ RỘNG 3 MỐC QUÁ KHỨ - HIỆN TẠI - TƯƠNG LAI
  // =========================================================================
  {
    id: "speaking-p1-timeframe-expansion",
    partNumber: 1,
    partNameVi: "Speaking Part 1 • Phản Xạ & Mở Rộng",
    title: "Part 1: Phá Vỡ Phản Xạ Trả Lời Cộc Lốc: Khung Mở Rộng 3 Mốc Quá Khứ - Hiện Tại - Tương Lai",
    subtitle: "Kỹ thuật kéo dài câu trả lời tự nhiên từ 3-4 câu • Tránh bẫy im lặng hoặc học vẹt",
    bandTarget: "Band 5.5 ➔ 7.0+",
    estimatedMinutes: 20,
    step1Principles: {
      corePhilosophyVi:
        "Speaking Part 1 là phần khởi động để tạo ấn tượng đầu tiên tốt đẹp với giám khảo! Bạn hãy tưởng tượng mình đang trò chuyện thoải mái với một người bạn nước ngoài mới quen về cuộc sống hàng ngày.\n💡 Bẫy 'Trả lời cộc lốc rồi im bặt' (One-Sentence Dead End) là gì? Giám khảo hỏi: 'Do you like sports?' (Bạn có thích thể thao không?), bạn chỉ trả lời: 'Yes, I like sports because it is good for health' rồi dừng lại nhìn chằm chằm giám khảo! Cuộc trò chuyện bị rơi vào ngõ cụt và điểm Fluency bị ghim ở mức 5.0.\n✨ Công thức thần thánh 'Kéo dài 3 mốc Quá khứ - Hiện tại': Đừng học vẹt bài mẫu! Chỉ cần kể thêm một mẩu chuyện ngắn: Câu 1: Trả lời trực tiếp ➔ Câu 2: Kể chuyện ngày xưa (*'In the past, I barely had time...'*) ➔ Câu 3: Kể hiện tại (*'Recently, I\'ve made it a habit...'*) là câu trả lời tự nhiên, trôi chảy đạt Band 7.0 ngay!",
      fourCriteriaBreakdownVi: {
        fc: "Fluency & Coherence (Nói trôi chảy liền mạch): Nói liên tục 3-4 câu mà không bị ngập ngừng 'à... ừm...' dịch từ tiếng Việt sang.",
        lr: "Lexical Resource (Từ vựng tự nhiên): Dùng các cụm từ đời sống tự nhiên (*'hit the gym' - đi tập gym, 'mental clarity' - đầu óc thư thái*) thay vì từ đao to búa lớn gượng gạo.",
        gra: "Grammatical Range (Ngữ pháp đa dạng): Khéo léo khoe thì Quá khứ (*'used to'*) và Hiện tại hoàn thành (*'have been'*) trong câu trả lời.",
        pr: "Pronunciation (Phát âm rõ ràng): Phát âm rõ các âm đuôi /s/, /z/, /t/, /d/ và giữ ngữ điệu tự tin, mỉm cười thân thiện.",
      },
      tacticalFrameworkVi: [
        "1. Câu 1 (Trả lời trực tiếp): Bắn ngay câu trả lời thẳng vào trọng tâm ('To be completely honest, I'm quite passionate about...').",
        "2. Câu 2 (Kể chuyện quá khứ / Nêu lý do): 'In the past, I used to...' (Hồi trước tôi thường...) hoặc 'Back when I was in school...' (Hồi còn đi học...).",
        "3. Câu 3 (So sánh với hiện tại): 'However, nowadays I tend to...' (Tuy nhiên, dạo này tôi thường...).",
      ],
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Trả Lời Cộc Lốc 'Yes/No' (One-Sentence Dead End)",
        trapMechanismVi:
          "Giám khảo hỏi: 'Do you like sports?', thí sinh chỉ trả lời: 'Yes, I like sports very much because it is good for health' rồi dừng lại nhìn giám khảo.",
        band50WrongSample: "Yes, I like swimming because it helps me relax and keep fit.",
        band50TranslationVi: "Vâng, tôi thích bơi lội vì nó giúp tôi thư giãn và giữ dáng.",
        band80CorrectSample:
          "To be perfectly frank, I'm quite passionate about swimming. In the past, I barely had time for exercise due to intense schoolwork, but recently I've made it a habit to hit the local pool twice a week. It does wonders for my mental clarity.",
        band80TranslationVi:
          "Nói một cách hoàn toàn thành thật thì tôi khá đam mê môn bơi lội. Trước đây, tôi hầu như chẳng có thời gian tập thể dục do lịch học ở trường quá dày đặc, nhưng gần đây tôi đã tạo thói quen đến hồ bơi địa phương hai lần một tuần. Điều này mang lại hiệu quả kỳ diệu cho sự minh mẫn của tâm trí tôi.",
        wordBreakdown: [
          { word: "passionate about", ipa: "/ˈpæʃ.ən.ət əˈbaʊt/", type: "phrase", meaningVi: "say mê, đam mê mãnh liệt" },
          { word: "barely", ipa: "/ˈbeə.li/", type: "adv", meaningVi: "hầu như không, hiếm khi" },
          { word: "intense schoolwork", ipa: "/ɪnˈtens ˈskuːl.wɜːk/", type: "phrase", meaningVi: "bài vở học tập dồn dập, căng thẳng" },
          { word: "hit the local pool", ipa: "/hɪt ðə ˈləʊ.kəl puːl/", type: "idiom", meaningVi: "đến hồ bơi khu vực" },
          { word: "mental clarity", ipa: "/ˈmen.təl ˈklær.ə.ti/", type: "phrase", meaningVi: "sự thông suốt, minh mẫn của trí óc" },
          { word: "do wonders for", ipa: "/duː ˈwʌn.dəz fɔːr/", type: "idiom", meaningVi: "mang lại hiệu quả kỳ diệu cho" },
        ],
        examinerInsightVi: "Mở rộng góc nhìn sang quá khứ ('barely had time') và hệ quả tinh thần ('does wonders for mental clarity') giúp điểm FC nhảy vọt lên 7.5+.",
      },
    ],
    audioContrast: {
      band55Text: "I like reading books. It is very interesting and I read books every weekend with my sister.",
      band55TranslationVi: "Tôi thích đọc sách. Nó rất thú vị và tôi đọc sách mỗi cuối tuần với em gái tôi.",
      band55FlawVi: "Câu đơn điệu, lặp từ 'books' 2 lần, ngữ điệu đều đều thiếu điểm nhấn và độ dài quá ngắn.",
      band85Text:
        "To be honest, I'd consider myself an avid reader. Back when I was in secondary school, I rarely picked up a novel, but lately I've developed a keen interest in historical non-fiction. It really broadens my perspective on world cultures.",
      band85TranslationVi:
        "Thành thật mà nói, tôi tự thấy mình là một người ham đọc sách. Hồi còn học cấp hai, tôi hiếm khi cầm một cuốn tiểu thuyết lên đọc, nhưng dạo gần đây tôi đã phát triển niềm hứng thú sâu sắc với sách phi hư cấu lịch sử. Nó thực sự mở rộng góc nhìn của tôi về các nền văn hóa thế giới.",
      wordBreakdown: [
        { word: "avid reader", ipa: "/ˈæv.ɪd ˈriː.dər/", type: "phrase", meaningVi: "người ham đọc sách, mọt sách" },
        { word: "keen interest in", ipa: "/kiːn ˈɪn.trəst ɪn/", type: "phrase", meaningVi: "niềm quan tâm say mê sâu sắc" },
        { word: "historical non-fiction", ipa: "/hɪˈstɒr.ɪ.kəl nɒn ˈfɪk.ʃən/", type: "phrase", meaningVi: "sách phi hư cấu lịch sử" },
        { word: "broadens my perspective", ipa: "/ˈbrɔː.dənz maɪ pəˈspek.tɪv/", type: "phrase", meaningVi: "mở rộng tầm nhìn, nhân sinh quan" },
      ],
      band85FeatureVi: "Sử dụng cụm từ tự nhiên ('avid reader', 'keen interest in', 'broadens my perspective') kết hợp cấu trúc thời gian quá khứ đối lập hiện tại.",
    },
    step3ModelDeliveryDissection: {
      examinerQuestion: "Do you prefer living in a house or an apartment?",
      examinerQuestionVi: "Bạn thích sống trong một ngôi nhà riêng hay một căn hộ chung cư hơn?",
      modelFullTranscript:
        "At this point in my life, I definitely lean towards living in a high-rise apartment. Growing up, my family resided in a traditional landed house, which was spacious but required relentless maintenance. By contrast, modern apartments offer round-the-clock security and integrated amenities like gyms and rooftop gardens.",
      modelTranscriptTranslationVi:
        "Ở thời điểm này trong cuộc đời, tôi chắc chắn nghiêng về việc sống trong một căn hộ chung cư cao tầng. Khi lớn lên, gia đình tôi từng sinh sống trong một ngôi nhà mặt đất truyền thống, nơi khá rộng rãi nhưng lại đòi hỏi việc bảo trì không ngừng nghỉ. Trái lại, các căn hộ hiện đại cung cấp an ninh túc trực 24/7 và các tiện ích tích hợp sẵn như phòng gym và khu vườn trên tầng thượng.",
      wordBreakdown: [
        { word: "lean towards", ipa: "/liːn təˈwɔːdz/", type: "phrase", meaningVi: "nghiêng về, thiên vị lựa chọn nào" },
        { word: "landed house", ipa: "/ˈlæn.dɪd haʊs/", type: "phrase", meaningVi: "nhà gắn liền với đất, nhà mặt đất" },
        { word: "relentless maintenance", ipa: "/rɪˈlent.ləs ˈmeɪn.tən.əns/", type: "phrase", meaningVi: "việc bảo dưỡng sửa chữa liên tục" },
        { word: "round-the-clock security", ipa: "/ˌraʊnd.ðəˈklɒk sɪˈkjʊə.rə.ti/", type: "phrase", meaningVi: "an ninh bảo vệ 24/7 suốt ngày đêm" },
        { word: "integrated amenities", ipa: "/ˈɪn.tɪ.ɡreɪ.tɪd əˈmiː.nə.tiz/", type: "phrase", meaningVi: "tiện ích sinh hoạt tích hợp" },
      ],
      transcriptAnalysisVi: [
        "Câu 1 (Direct Answer): 'At this point in my life, I definitely lean towards living in a high-rise apartment.' ➔ Khẳng định lập trường tự nhiên.",
        "Câu 2 (Reason / Contrast): 'Growing up, my family resided in a traditional landed house, which was spacious but required relentless maintenance.' ➔ Khai thác bối cảnh quá khứ.",
        "Câu 3 (Present Benefit): 'By contrast, modern apartments offer round-the-clock security and integrated amenities like gyms and rooftop gardens.' ➔ Nêu bật lợi ích hiện tại.",
      ],
      lexicalCollocations: ["lean towards", "landed house", "relentless maintenance", "integrated amenities"],
      concludingStrategyVi: "Công thức Part 1 3 chặng: [Direct Answer] + [Past context / Contrast] + [Present benefit].",
    },
    gatewayQuiz: [
      {
        id: "sp_q1",
        prompt: "Độ dài lý tưởng cho MỘT câu trả lời trong Speaking Part 1 là bao nhiêu?",
        options: [
          "A. 1 câu ngắn gọn (khoảng 5 giây).",
          "B. 3 đến 4 câu hoàn chỉnh (khoảng 15 - 25 giây).",
          "C. Nói liên tục 2 phút không dừng.",
          "D. Đọc thuộc lòng một bài thơ.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Part 1 là phần hỏi đáp nhanh, 3-4 câu (15-25s) là độ dài hoàn hảo để thể hiện sự lưu loát mà không bị lan man.",
      },
      {
        id: "sp_q2",
        prompt: "Phương pháp nào sau đây giúp bạn mở rộng câu trả lời Part 1 tự nhiên nhất mà không bị bí ý?",
        options: [
          "A. Khung 3 mốc thời gian: Trả lời trực tiếp ➔ So sánh với Quá khứ ➔ Nêu Hiện tại / Tương lai.",
          "B. Lặp lại câu hỏi của giám khảo 3 lần.",
          "C. Nói 'I don't know' khi không thích chủ đề đó.",
          "D. Dịch từng từ tiếng Việt sang tiếng Anh trong đầu.",
        ],
        correctIndex: 0,
        isGrammarRelated: false,
        examinerReasoning: "Khung thời gian Quá khứ - Hiện tại giúp bạn tự động có thêm 2 câu văn giàu ngữ pháp và từ vựng.",
      },
      {
        id: "sp_q3",
        prompt: "Nếu giám khảo phát hiện bạn đang đọc thuộc lòng một câu trả lời mẫu (Memorized response) trong Part 1, họ sẽ làm gì?",
        options: [
          "A. Cho bạn điểm 9.0 tuyệt đối.",
          "B. Ngắt lời ngay lập tức và chuyển sang một câu hỏi hoàn toàn bất ngờ để kiểm tra phản xạ thực tế.",
          "C. Ngồi nghe hết bài.",
          "D. Hát cùng bạn.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Giám khảo Cambridge được đào tạo để phát hiện giọng điệu học vẹt và sẽ ngắt lời ngay để đổi chủ đề.",
      },
      {
        id: "sp_q4",
        prompt: "Cụm từ nào sau đây là 'Filler tự nhiên' giúp bạn có 2 giây suy nghĩ mà không bị trừ điểm Fluency?",
        options: [
          "A. 'Uh... um... uh...'",
          "B. 'Well, to be perfectly candid...', 'That's an interesting question...'",
          "C. 'Wait for me 1 minute.'",
          "D. Im lặng tuyệt đối không phát ra âm thanh gì.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Các cụm discourse markers tự nhiên giúp duy trì luồng nói trôi chảy (Fluency).",
      },
      {
        id: "sp_q5",
        prompt: "Ngữ điệu (Intonation) chuẩn khảo thí khi kết thúc một câu trần thuật khẳng định trong Speaking là gì?",
        options: [
          "A. Ngữ điệu lên giọng ở cuối câu (Uptalk).",
          "B. Ngữ điệu hạ giọng dứt khoát ở âm tiết cuối cùng (Falling Pitch Contour).",
          "C. Nói thì thầm.",
          "D. Hét to.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Hạ giọng cuối câu khẳng định tạo cảm giác tự tin, chắc chắn và kết thúc câu trọn vẹn, triệt tiêu lỗi Uptalk.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Nói Phản Xạ Speaking Part 1 & 2",
      href: "/practice/speaking-p1-p2",
      descriptionVi: "Thực hành phản xạ trả lời 3 mốc thời gian với giám khảo AI và VAD mic thời gian thực.",
    },
  },

  // =========================================================================
  // PART 3: 6 LĂNG KÍNH CHỦ THỂ & RÀO ĐÓN HỌC THUẬT (ACADEMIC HEDGING)
  // =========================================================================
  {
    id: "speaking-p3-six-social-lenses",
    partNumber: 3,
    partNameVi: "Speaking Part 3 • Phản Biện & Đa Chiều C1/C2",
    title: "Part 3: Đột Phá Tư Duy Xã Hội: Phương Pháp Phân Tích 6 Lăng Kính Chủ Thể & Rào Đón Học Thuật",
    subtitle: "Chuyển dịch từ góc nhìn cá nhân sang tầm nhìn vĩ mô • Làm chủ tiêu chí Fluency & Lexical Resource Band 8.0+",
    bandTarget: "Band 6.5 ➔ 8.0+",
    estimatedMinutes: 25,
    step1Principles: {
      corePhilosophyVi:
        "Speaking Part 3 là bài thảo luận sâu về các vấn đề của xã hội.\n💡 Khác biệt lớn nhất giữa Part 1 và Part 3 là gì? Part 1 hỏi về BẠN (Bạn thích ăn gì, bạn làm nghề gì). Nhưng sang Part 3 thì hỏi về MỌI NGƯỜI / XÃ HỘI (Tại sao người trẻ lại chuộng mua sắm trên mạng?).\n⚠️ Lỗi ngớ ngẩn của học sinh: Vẫn tiếp tục lôi chuyện cá nhân ra kể (*'Vì em thích ngủ nướng nên em hay mua đồ online...'*). Giám khảo muốn nghe phân tích khách quan: 'Đối với người tiêu dùng thì tiện lợi, nhưng đối với các cửa hàng truyền thống thì gặp nhiều khó khăn'! Bật công tắc tư duy xã hội là bạn ăn trọn điểm Band 7.0+!",
      fourCriteriaBreakdownVi: {
        fc: "Fluency & Coherence (Tư duy đa chiều): Biết nhìn nhận vấn đề từ cả 2 mặt tốt và xấu (*'Mặc dù việc này mang lại lợi ích A, nhưng nó cũng kéo theo rủi ro B...'*)",
        lr: "Lexical Resource (Từ vựng học thuật chuẩn xác): Dùng các cụm chỉ góc nhìn (*'from an economic standpoint' - từ góc độ kinh tế, 'corporate perspective' - góc nhìn doanh nghiệp*).",
        gra: "Grammatical Range (Cấu trúc câu phức): Sử dụng câu bị động khách quan (*'It is widely acknowledged that...' - Người ta thường công nhận rằng...*).",
        pr: "Pronunciation (Nhấn nhá trọng âm): Nhấn giọng vào các từ mang nội dung chính để tạo sức thuyết phục như một diễn giả.",
      },
      tacticalFrameworkVi: [
        "1. Góc nhìn Người lao động / Người tiêu dùng: Họ được lợi gì về mặt thời gian và chi phí?",
        "2. Góc nhìn Doanh nghiệp / Người quản lý: Họ đối mặt với bài toán doanh thu và năng suất ra sao?",
        "3. Góc nhìn Chính phủ & Xã hội: Cần có luật lệ hay chính sách hỗ trợ gì?",
        "4. Góc nhìn Môi trường & Tương lai lâu dài: Xu hướng này để lại hệ quả gì cho thế hệ mai sau?",
      ],
    },
    step2ExaminerTraps: [
      {
        trapNameVi: "Bẫy Trả Lời Theo Trải Nghiệm Cá Nhân Vụn Vặt (Personal Perspective Trap)",
        trapMechanismVi:
          "Giám khảo hỏi: 'Why do some people prefer working remotely?', thí sinh trả lời về bản thân: 'Because I like sleeping late and my boss is very nice.'",
        band50WrongSample: "Because when I work at home, I can eat snacks and save money for my family.",
        band50TranslationVi: "Bởi vì khi làm việc ở nhà, tôi có thể ăn vặt và tiết kiệm tiền cho gia đình tôi.",
        band80CorrectSample:
          "From an employee standpoint, remote working significantly curtails daily commuting stress and fosters flexible work-life integration. However, from a corporate perspective, management often grapples with maintaining team cohesion and measuring actual productivity.",
        band80TranslationVi:
          "Xét từ góc độ người lao động, làm việc từ xa giúp cắt giảm đáng kể sự căng thẳng khi đi lại hàng ngày và thúc đẩy sự dung hòa linh hoạt giữa công việc và cuộc sống. Tuy nhiên, từ góc nhìn doanh nghiệp, ban điều hành thường phải vật lộn với việc duy trì tính gắn kết đội ngũ và đo lường năng suất làm việc thực tế.",
        wordBreakdown: [
          { word: "employee standpoint", ipa: "/ˌem.plɔɪˈiː ˈstænd.pɔɪnt/", type: "phrase", meaningVi: "góc độ người lao động" },
          { word: "curtail", ipa: "/kəˈteɪl/", type: "v", meaningVi: "cắt giảm bớt, hạn chế đáng kể" },
          { word: "commuting stress", ipa: "/kəˈmjuː.tɪŋ stres/", type: "phrase", meaningVi: "áp lực di chuyển đi lại hàng ngày" },
          { word: "work-life integration", ipa: "/wɜːk laɪf ˌɪn.tɪˈɡreɪ.ʃən/", type: "phrase", meaningVi: "sự dung hòa công việc - đời sống" },
          { word: "corporate perspective", ipa: "/ˈkɔː.pər.ət pəˈspek.tɪv/", type: "phrase", meaningVi: "góc nhìn doanh nghiệp" },
          { word: "grapple with", ipa: "/ˈɡræp.əl wɪð/", type: "v", meaningVi: "vật lộn giải quyết bài toán khó" },
          { word: "team cohesion", ipa: "/tiːm kəʊˈhiː.ʒən/", type: "phrase", meaningVi: "tính gắn kết nội bộ đội ngũ" },
          { word: "productivity", ipa: "/ˌprɒd.ʌkˈtɪv.ə.ti/", type: "n", meaningVi: "năng suất làm việc" },
        ],
        examinerInsightVi: "Đối chiếu 2 lăng kính (Người lao động vs Doanh nghiệp) giúp câu trả lời lập tức đạt chuẩn Band 8.0+ về tư duy phản biện.",
      },
    ],
    audioContrast: {
      band55Text: "I think artificial intelligence is dangerous because it will take all human jobs and make people poor.",
      band55TranslationVi: "Tôi nghĩ trí tuệ nhân tạo nguy hiểm vì nó sẽ cướp hết việc làm của con người và khiến mọi người nghèo đói.",
      band55FlawVi: "Phát biểu võ đoán 100%, dùng từ ngữ cá nhân, thiếu tính cẩn trọng học thuật (Hedging).",
      band85Text:
        "It is widely contended that rapid advancements in artificial intelligence may precipitate localized labor market disruptions. Nonetheless, from a macroeconomic perspective, automation is also projected to generate novel specialized industries and optimize operational efficiency.",
      band85TranslationVi:
        "Nhiều quan điểm cho rằng những tiến bộ nhanh chóng của trí tuệ nhân tạo có thể châm ngòi cho những gián đoạn cục bộ trên thị trường lao động. Tuy nhiên, từ góc nhìn kinh tế vĩ mô, tự động hóa cũng được dự báo sẽ tạo ra các ngành công nghiệp chuyên biệt mới và tối ưu hóa hiệu quả vận hành.",
      wordBreakdown: [
        { word: "widely contended", ipa: "/ˈwaɪd.li kənˈten.dɪd/", type: "phrase", meaningVi: "được nhiều người nhận định, lập luận" },
        { word: "precipitate", ipa: "/prɪˈsɪp.ɪ.teɪt/", type: "v", meaningVi: "gây ra, châm ngòi đột ngột" },
        { word: "labor market disruption", ipa: "/ˈleɪ.bər ˌmɑː.kɪt dɪsˈrʌp.ʃən/", type: "phrase", meaningVi: "sự gián đoạn thị trường lao động" },
        { word: "macroeconomic perspective", ipa: "/ˌmæk.rəʊ.iː.kəˈnɒm.ɪk pəˈspek.tɪv/", type: "phrase", meaningVi: "góc nhìn kinh tế vĩ mô" },
        { word: "operational efficiency", ipa: "/ˌɒp.ərˈeɪ.ʃən.əl ɪˈfɪʃ.ən.si/", type: "phrase", meaningVi: "hiệu quả vận hành" },
      ],
      band85FeatureVi: "Sử dụng Hedging ('may precipitate', 'projected to generate') và lăng kính kinh tế vĩ mô ('macroeconomic perspective').",
    },
    step3ModelDeliveryDissection: {
      examinerQuestion: "How can municipal authorities encourage citizens to adopt sustainable transportation?",
      examinerQuestionVi: "Chính quyền đô thị có thể làm thế nào để khuyến khích công dân sử dụng phương tiện giao thông bền vững?",
      modelFullTranscript:
        "Primarily, governments could invest heavily in upgrading public transit infrastructure, ensuring that metro networks are affordable, punctual, and seamlessly interconnected. Simultaneously, implementing financial disincentives, such as congestion pricing in metropolitan centers, would effectively discourage private vehicle usage. Ultimately, community awareness campaigns must highlight the collective environmental dividends of reducing individual carbon footprints.",
      modelTranscriptTranslationVi:
        "Trước hết, các chính phủ có thể đầu tư mạnh mẽ vào việc nâng cấp cơ sở hạ tầng giao thông công cộng, đảm bảo mạng lưới tàu điện ngầm có giá cả phải chăng, đúng giờ và kết nối liền mạch. Đồng thời, việc thực thi các chế tài tài chính, chẳng hạn như thu phí chống ùn tắc ở các trung tâm đại đô thị, sẽ ngăn chặn hiệu quả việc sử dụng xe cá nhân. Sau cùng, các chiến dịch nâng cao nhận thức cộng đồng phải nêu bật những lợi ích môi trường tập thể của việc giảm lượng khí thải carbon cá nhân.",
      wordBreakdown: [
        { word: "transit infrastructure", ipa: "/ˈtræn.zɪt ˈɪn.frəˌstrʌk.tʃər/", type: "phrase", meaningVi: "hạ tầng giao thông công cộng" },
        { word: "financial disincentives", ipa: "/faɪˈnæn.ʃəl ˌdɪs.ɪnˈsen.tɪvz/", type: "phrase", meaningVi: "các chế tài / biện pháp răn đe tài chính" },
        { word: "congestion pricing", ipa: "/kənˈdʒes.tʃən ˈpraɪ.sɪŋ/", type: "phrase", meaningVi: "thu phí chống ùn tắc giao thông" },
        { word: "environmental dividends", ipa: "/ɪnˌvaɪ.rənˈmen.təl ˈdɪv.ɪ.dendz/", type: "phrase", meaningVi: "các lợi ích / thành quả môi trường mang lại" },
      ],
      transcriptAnalysisVi: [
        "Lăng kính 1 (Chính sách & Hạ tầng): 'Primarily, governments could invest heavily in upgrading public transit infrastructure, ensuring that metro networks are affordable, punctual, and seamlessly interconnected.'",
        "Lăng kính 2 (Kinh tế & Chế tài): 'Simultaneously, implementing financial disincentives, such as congestion pricing in metropolitan centers, would effectively discourage private vehicle usage.'",
        "Lăng kính 3 (Giáo dục & Nhận thức): 'Ultimately, community awareness campaigns must highlight the collective environmental dividends of reducing individual carbon footprints.'",
      ],
      lexicalCollocations: ["public transit infrastructure", "financial disincentives", "congestion pricing", "environmental dividends"],
      concludingStrategyVi: "Công thức Part 3: [Lăng kính Chính sách] + [Lăng kính Kinh tế/Chế tài] + [Lăng kính Nhận thức].",
    },
    gatewayQuiz: [
      {
        id: "sp3_q1",
        prompt: "Sự khác biệt BẮT BUỘC về phong cách trả lời giữa Speaking Part 1 và Speaking Part 3 là gì?",
        options: [
          "A. Không có gì khác biệt.",
          "B. Part 1 tập trung vào trải nghiệm cá nhân đời thường; Part 3 bắt buộc phải bàn luận về các vấn đề xã hội trừu tượng dưới góc nhìn vĩ mô.",
          "C. Part 3 phải nói chậm hơn Part 1.",
          "D. Part 3 chỉ được dùng thì Hiện tại đơn.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Part 3 kiểm tra khả năng tư duy học thuật xã hội, việc mang chuyện cá nhân vào Part 3 sẽ bị ghim điểm ở Band 5.5.",
      },
      {
        id: "sp3_q2",
        prompt: "Khi gặp câu hỏi hóc búa trong Part 3, kỹ thuật '6 Lăng Kính Chủ Thể' giúp bạn điều gì?",
        options: [
          "A. Đứng dậy nhảy múa.",
          "B. Ngay lập tức tiếp cận vấn đề từ 2-3 góc độ khác nhau (Cá nhân, Doanh nghiệp, Chính phủ, Môi trường) để bài nói sâu sắc và đa chiều.",
          "C. Nhìn đồng hồ của giám khảo.",
          "D. Chờ giám khảo giải thích hộ.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "6 Lăng kính xã hội là chìa khóa mở ra vô số ý tưởng học thuật logic trong 3 giây.",
      },
      {
        id: "sp3_q3",
        prompt: "Kỹ thuật 'Academic Hedging' (Rào đón học thuật) trong Speaking Part 3 có tác dụng gì?",
        options: [
          "A. Giúp câu nói mang tính cẩn trọng, khách quan (dùng 'tends to', 'may precipitate', 'it is argued that') thay vì khẳng định tuyệt đối 100%.",
          "B. Làm cho câu nói dài ra mà không có ý nghĩa.",
          "C. Thể hiện sự thiếu tự tin.",
          "D. Làm cho giám khảo bối rối.",
        ],
        correctIndex: 0,
        isGrammarRelated: false,
        examinerReasoning: "Hedging là dấu hiệu nhận biết của thí sinh Band 7.5 - 8.5 trong tư duy học thuật.",
      },
      {
        id: "sp3_q4",
        prompt: "Nếu giám khảo đặt câu hỏi Part 3 mà bạn chưa hiểu rõ một thuật ngữ khó, bạn nên làm gì?",
        options: [
          "A. Im lặng và mỉm cười.",
          "B. Lịch sự yêu cầu giám khảo diễn giải lại câu hỏi (*'Could you clarify what you mean by X?'*) mà không bị trừ điểm.",
          "C. Bỏ thi ra về.",
          "D. Nói về một chủ đề khác.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Trong IELTS Speaking, thí sinh hoàn toàn có quyền hỏi lại giám khảo để làm rõ câu hỏi trong Part 3.",
      },
      {
        id: "sp3_q5",
        prompt: "Để đạt Band 8.0 tiêu chí Lexical Resource trong Speaking Part 3, bạn cần:",
        options: [
          "A. Chèn các thành ngữ cổ điển không tự nhiên.",
          "B. Sử dụng từ ngữ học thuật và kết hợp từ (Collocations) chính xác, tự nhiên theo từng chủ đề xã hội.",
          "C. Nói thật nhiều từ lóng.",
          "D. Phát âm tất cả các từ bằng giọng Mỹ.",
        ],
        correctIndex: 1,
        isGrammarRelated: false,
        examinerReasoning: "Band 8.0 LR yêu cầu 'skillfully uses uncommon and idiomatic vocabulary with high naturalness'.",
      },
    ],
    unlockedPracticeRoute: {
      nameVi: "Phòng Luyện Nói Phản Biện Speaking Part 3 Hedging Studio",
      href: "/practice/speaking-p3-hedging",
      descriptionVi: "Thực hành lập luận 6 lăng kính và rào đón học thuật với Examiner AI Cambridge.",
    },
  },
];
