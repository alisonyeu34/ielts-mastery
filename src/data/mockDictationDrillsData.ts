/**
 * Cambridge IELTS Intelligent Dictation Studio Mock Dataset
 * 15 Progressive Audio Drills across 3 Levels:
 * Level 1: Functional Cloze (Articles, Prepositions, Auxiliaries)
 * Level 2: Connected Speech & Acoustic Traps (Linking, Elision, Weak Forms, -s/-ed endings)
 * Level 3: Full Academic Reconstruction (15-25 words complex monologue/dialogue)
 */

export interface PhoneticDetail {
  trapType: "linking" | "elision" | "weak_form" | "ending_sound" | "assimilation";
  trapNameVi: string;
  phonemicSymbol: string;
  ruleVi: string;
  acousticExplanationVi: string;
}

export interface DictationDrillItem {
  id: string;
  level: 1 | 2 | 3;
  levelNameVi: string;
  category: "cloze" | "connected_speech" | "full_reconstruction";
  title: string;
  topicDomain: string;
  targetSentence: string;
  clozeIndices?: number[]; // Array of word indices that should be blank in Level 1
  phoneticNotes: PhoneticDetail;
  ieltsContextVi: string;
  speakerAccent: "British RP" | "Australian" | "North American";
  recommendedPlayLimit: number;
}

export const MOCK_DICTATION_DRILLS: DictationDrillItem[] = [
  // =========================================================================
  // LEVEL 1: CLOZE DICTATION (TỪ KHUYẾT CHỨC NĂNG - MẠO TỪ / GIỚI TỪ / TRỢ ĐỘNG TỪ)
  // =========================================================================
  {
    id: "dict_l1_01",
    level: 1,
    levelNameVi: "Cấp độ 1 • Điền từ khuyết chức năng (Cloze Dictation)",
    category: "cloze",
    title: "Mạo từ & Giới từ trong mô tả cơ sở vật chất",
    topicDomain: "Campus Facilities & Library Rules",
    targetSentence: "Students must register at the reception desk before entering the archives.",
    clozeIndices: [2, 3, 4, 7, 8], // "register", "at", "the", "entering", "the"
    phoneticNotes: {
      trapType: "weak_form",
      trapNameVi: "Dạng yếu của giới từ 'at' & mạo từ 'the'",
      phonemicSymbol: "/ət/ & /ðə/",
      ruleVi: "Giới từ và mạo từ bị giảm nguyên âm thành âm Schwa /ə/ khi không mang trọng âm câu.",
      acousticExplanationVi: "Âm /æt/ phát âm lướt nhẹ thành /ət/, gắn liền mạch với động từ 'register' đứng trước tạo thành 'register-at /rɛdʒɪstərət/'.",
    },
    ieltsContextVi: "Listening Section 1: Hướng dẫn thủ tục đăng ký thẻ thư viện hoặc đăng ký khóa học.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },
  {
    id: "dict_l1_02",
    level: 1,
    levelNameVi: "Cấp độ 1 • Điền từ khuyết chức năng (Cloze Dictation)",
    category: "cloze",
    title: "Trợ động từ hoàn thành & Giới từ chỉ nguồn gốc",
    topicDomain: "Environmental Biology Survey",
    targetSentence: "The research team has been investigating the migration of marine species.",
    clozeIndices: [0, 3, 4, 6, 7], // "The", "has", "been", "the", "of"
    phoneticNotes: {
      trapType: "weak_form",
      trapNameVi: "Âm yếu của 'has been' và 'of'",
      phonemicSymbol: "/həz bɪn/ & /əv/",
      ruleVi: "Trợ động từ 'has been' thường lướt thành /həzbɪn/ và 'of' lướt thành /əv/.",
      acousticExplanationVi: "Người học hay bỏ quên 'has been' do chỉ tập trung bắt từ mang nghĩa chính 'investigating'.",
    },
    ieltsContextVi: "Listening Section 4: Mở đầu báo cáo nghiên cứu sinh học biển.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },
  {
    id: "dict_l1_03",
    level: 1,
    levelNameVi: "Cấp độ 1 • Điền từ khuyết chức năng (Cloze Dictation)",
    category: "cloze",
    title: "Mạo từ xác định & Cụm giới từ thời gian",
    topicDomain: "Academic History & Museum Tour",
    targetSentence: "All artifacts on display date back to the late seventeenth century.",
    clozeIndices: [2, 6, 7, 8], // "on", "to", "the", "late"
    phoneticNotes: {
      trapType: "linking",
      trapNameVi: "Nối phụ âm sang nguyên âm 'artifacts on'",
      phonemicSymbol: "/ˈɑːtɪfækts‿ɒn/",
      ruleVi: "Phụ âm cuối /s/ của 'artifacts' nối thẳng vào giới từ 'on'.",
      acousticExplanationVi: "Âm nối /ts‿ɒn/ khiến người học tưởng là một từ mới và bỏ quên mạo từ 'the' đứng trước 'late seventeenth'.",
    },
    ieltsContextVi: "Listening Section 2: Thuyết minh hướng dẫn tại viện bảo tàng lịch sử.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },
  {
    id: "dict_l1_04",
    level: 1,
    levelNameVi: "Cấp độ 1 • Điền từ khuyết chức năng (Cloze Dictation)",
    category: "cloze",
    title: "Động từ khiếm khuyết trong đề xuất học thuật",
    topicDomain: "Tutorial Discussion & Assignment Feedback",
    targetSentence: "You should have submitted the preliminary draft by yesterday morning.",
    clozeIndices: [1, 2, 4, 6], // "should", "have", "the", "by"
    phoneticNotes: {
      trapType: "weak_form",
      trapNameVi: "Rút gọn 'should have' thành /ʃʊdəv/",
      phonemicSymbol: "/ˈʃʊd.əv/",
      ruleVi: "'Should have' trong văn nói nhanh bị nuốt âm /h/ và giảm /æv/ thành /əv/.",
      acousticExplanationVi: "Âm thanh nghe như 'should-a', người học hay gõ nhầm thành 'should' hoặc bỏ sót hoàn toàn 'have'.",
    },
    ieltsContextVi: "Listening Section 3: Buổi trao đổi giữa giảng viên hướng dẫn và sinh viên về hạn nộp bài.",
    speakerAccent: "Australian",
    recommendedPlayLimit: 3,
  },
  {
    id: "dict_l1_05",
    level: 1,
    levelNameVi: "Cấp độ 1 • Điền từ khuyết chức năng (Cloze Dictation)",
    category: "cloze",
    title: "Giới từ kép & Mạo từ không xác định",
    topicDomain: "Urban Architecture & Housing Survey",
    targetSentence: "The survey was conducted across a wide range of residential districts.",
    clozeIndices: [0, 2, 4, 5, 8], // "The", "was", "across", "a", "of"
    phoneticNotes: {
      trapType: "weak_form",
      trapNameVi: "Trợ động từ 'was' & Mạo từ 'a' /wəz ə/",
      phonemicSymbol: "/wəz‿ə/",
      ruleVi: "'Was' và mạo từ 'a' đi liền nhau bị nối thành chuỗi âm liên tục /wəzə/.",
      acousticExplanationVi: "Người học dễ bỏ sót mạo từ 'a' trước cụm 'wide range of'.",
    },
    ieltsContextVi: "Listening Section 4: Khảo sát quy hoạch đô thị và khu dân cư.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },

  // =========================================================================
  // LEVEL 2: CONNECTED SPEECH & ACOUSTIC TRAPS (MỔ XẺ BIẾN ÂM & BẪY ÂM VỊ)
  // =========================================================================
  {
    id: "dict_l2_01",
    level: 2,
    levelNameVi: "Cấp độ 2 • Biến âm & Bẫy âm vị (Connected Speech & Traps)",
    category: "connected_speech",
    title: "Nuốt âm /t/ (Elision) & Đuôi quá khứ -ed",
    topicDomain: "Campus Laboratory Experiment",
    targetSentence: "The technician asked him to double check the chemical components.",
    phoneticNotes: {
      trapType: "elision",
      trapNameVi: "Nuốt âm /h/ trong 'him' & Nối phụ âm /k/ 'asked-him'",
      phonemicSymbol: "/ɑːskt‿ɪm/ ➔ /ɑːsk.tɪm/",
      ruleVi: "Đại từ 'him' bị nuốt âm /h/ thành /ɪm/, âm /t/ đuôi '-ed' của 'asked' nối thẳng sang /ɪm/.",
      acousticExplanationVi: "Bạn sẽ nghe như 'ask tim'. Nếu không vững ngữ pháp quá khứ đơn, học viên thường gõ nhầm thành 'ask him' (rơi đuôi -ed).",
    },
    ieltsContextVi: "Listening Section 3: Sinh viên tường thuật lại sự cố trong phòng thí nghiệm hóa học.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },
  {
    id: "dict_l2_02",
    level: 2,
    levelNameVi: "Cấp độ 2 • Biến âm & Bẫy âm vị (Connected Speech & Traps)",
    category: "connected_speech",
    title: "Nối âm phụ âm sang nguyên âm & Bẫy số nhiều -s/-es",
    topicDomain: "Agriculture & Botany Innovations",
    targetSentence: "Ancient farmers gathered seeds and developed sustainable irrigation systems.",
    phoneticNotes: {
      trapType: "ending_sound",
      trapNameVi: "Đuôi số nhiều /z/ trong 'seeds' & 'systems' và đuôi /-d/ 'gathered'",
      phonemicSymbol: "/siːdz/ & /ˈsɪs.təmz/",
      ruleVi: "Đuôi -s sau nguyên âm và phụ âm hữu thanh /d/ đọc là /z/. Nối âm 'seeds and' thành /siːd.zənd/.",
      acousticExplanationVi: "Thí sinh Việt Nam thường bị 'điếc âm đuôi' (omission of finals), chỉ gõ 'seed' và 'system'.",
    },
    ieltsContextVi: "Listening Section 4: Lịch sử nông nghiệp cổ đại và hệ thống dẫn thủy nhập điền.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },
  {
    id: "dict_l2_03",
    level: 2,
    levelNameVi: "Cấp độ 2 • Biến âm & Bẫy âm vị (Connected Speech & Traps)",
    category: "connected_speech",
    title: "Chèn âm bán nguyên âm /j/ (Intrusive /j/ Linking)",
    topicDomain: "University Enrollment & Student Union",
    targetSentence: "We agreed to see everyone at the orientation lecture tomorrow morning.",
    phoneticNotes: {
      trapType: "linking",
      trapNameVi: "Chèn âm /j/ giữa 'see' và 'everyone'",
      phonemicSymbol: "/siː‿j‿ˈɛv.ri.wʌn/",
      ruleVi: "Khi từ trước kết thúc bằng nguyên âm /iː/ và từ sau bắt đầu bằng nguyên âm, âm /j/ xuất hiện tự nhiên.",
      acousticExplanationVi: "Nghe như 'see yeveryone'. Người học không quen sẽ bối rối khi tìm kiếm từ khóa.",
    },
    ieltsContextVi: "Listening Section 1: Lịch hẹn gặp mặt tuần lễ định hướng tân sinh viên.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },
  {
    id: "dict_l2_04",
    level: 2,
    levelNameVi: "Cấp độ 2 • Biến âm & Bẫy âm vị (Connected Speech & Traps)",
    category: "connected_speech",
    title: "Nuốt âm /t/ trong cụm phụ âm (Consonant Cluster Elision)",
    topicDomain: "Sociology & Demographic Shifts",
    targetSentence: "Last night the committee postponed the meeting until next Friday.",
    phoneticNotes: {
      trapType: "elision",
      trapNameVi: "Nuốt âm /t/ trong 'Last night' & 'next Friday'",
      phonemicSymbol: "/lɑːs naɪt/ & /nɛks ˈfraɪ.deɪ/",
      ruleVi: "Khi /t/ đứng giữa hai phụ âm, nó bị triệt tiêu hoàn toàn để tăng tốc độ nói.",
      acousticExplanationVi: "Người bản xứ phát âm 'las-night' và 'nex-Friday'. Thí sinh dễ bỏ sót chữ cái 't' khi chép chính tả.",
    },
    ieltsContextVi: "Listening Section 2: Thông báo hoãn cuộc họp ban chấp hành hội đồng.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },
  {
    id: "dict_l2_05",
    level: 2,
    levelNameVi: "Cấp độ 2 • Biến âm & Bẫy âm vị (Connected Speech & Traps)",
    category: "connected_speech",
    title: "Đồng hóa âm (Assimilation of /n/ to /m/)",
    topicDomain: "Economics & Retail Market Trends",
    targetSentence: "The marketing department launched ten new promotions in May.",
    phoneticNotes: {
      trapType: "assimilation",
      trapNameVi: "Đồng hóa âm 'in May' ➔ /ɪm meɪ/",
      phonemicSymbol: "/ɪn meɪ/ ➔ /ɪm meɪ/",
      ruleVi: "Âm /n/ đứng trước âm môi /m/ hoặc /p/ sẽ biến thành âm môi /m/.",
      acousticExplanationVi: "Âm /ɪm meɪ/ nghe như 'im May', dễ làm học viên nhầm lẫn giới từ 'in' thành 'im'.",
    },
    ieltsContextVi: "Listening Section 4: Chiến dịch tiếp thị và chu kỳ khuyến mãi bán lẻ.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 3,
  },

  // =========================================================================
  // LEVEL 3: FULL ACOUSTIC RECONSTRUCTION (TÁI TẠO 100% CÂU HỌC THUẬT)
  // =========================================================================
  {
    id: "dict_l3_01",
    level: 3,
    levelNameVi: "Cấp độ 3 • Tái tạo toàn bộ câu học thuật (Full Reconstruction)",
    category: "full_reconstruction",
    title: "Khảo cổ học & Bằng chứng nông nghiệp tiền sử",
    topicDomain: "Archaeology & Anthropology",
    targetSentence: "The archaeological expedition uncovered substantial evidence of prehistoric agricultural cultivation across the river valley.",
    phoneticNotes: {
      trapType: "ending_sound",
      trapNameVi: "Đuôi quá khứ /d/ 'uncovered' & Trọng âm đa âm tiết",
      phonemicSymbol: "/ˌɑː.ki.əˈlɒdʒ.ɪ.kəl/ & /ʌnˈkʌv.əd/",
      ruleVi: "Từ học thuật dài 6 âm tiết 'archaeological' có trọng âm chính rơi vào âm tiết thứ tư.",
      acousticExplanationVi: "Yêu cầu tái tạo nguyên văn 15 từ học thuật C1, bắt trọn vẹn thuật ngữ 'prehistoric agricultural cultivation'.",
    },
    ieltsContextVi: "Listening Section 4: Bài giảng độc thoại chuyên sâu về khảo cổ học thung lũng sông Nile.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 4,
  },
  {
    id: "dict_l3_02",
    level: 3,
    levelNameVi: "Cấp độ 3 • Tái tạo toàn bộ câu học thuật (Full Reconstruction)",
    category: "full_reconstruction",
    title: "Chính sách năng lượng tái tạo & Phát thải khí nhà kính",
    topicDomain: "Renewable Energy & Climate Science",
    targetSentence: "Governmental subsidies have accelerated the adoption of solar panels, significantly reducing greenhouse gas emissions.",
    phoneticNotes: {
      trapType: "linking",
      trapNameVi: "Mệnh đề phân từ rút gọn 'significantly reducing'",
      phonemicSymbol: "/sɪɡˈnɪf.ɪ.kənt.li rɪˈdjuː.sɪŋ/",
      ruleVi: "Nhịp điệu câu ngắt nhẹ sau dấu phẩy nhưng ngữ điệu tiếp tục hạ xuống ở âm tiết cuối của 'emissions'.",
      acousticExplanationVi: "Bẫy số nhiều 'subsidies' (đuôi -ies) và 'emissions' (đuôi -s) kết hợp trợ động từ 'have'.",
    },
    ieltsContextVi: "Listening Section 4: Thuyết trình về chuyển dịch cơ cấu năng lượng xanh.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 4,
  },
  {
    id: "dict_l3_03",
    level: 3,
    levelNameVi: "Cấp độ 3 • Tái tạo toàn bộ câu học thuật (Full Reconstruction)",
    category: "full_reconstruction",
    title: "Tâm lý học hành vi & Quá trình ra quyết định của người tiêu dùng",
    topicDomain: "Cognitive Psychology & Marketing",
    targetSentence: "Cognitive psychologists suggest that emotional impulses exert a greater influence on purchase decisions than rational calculations.",
    phoneticNotes: {
      trapType: "weak_form",
      trapNameVi: "Liên từ so sánh 'than' /ðən/ & Bẫy số nhiều 'decisions, calculations'",
      phonemicSymbol: "/ðən/ & /dɪˈsɪʒ.ənz/",
      ruleVi: "'Than' bị đọc lướt thành /ðən/, nối liền vào 'purchase decisions'.",
      acousticExplanationVi: "Cấu trúc so sánh học thuật 'exert a greater influence on... than...'.",
    },
    ieltsContextVi: "Listening Section 3: Buổi bảo vệ đề cương nghiên cứu tâm lý học hành vi.",
    speakerAccent: "North American",
    recommendedPlayLimit: 4,
  },
  {
    id: "dict_l3_04",
    level: 3,
    levelNameVi: "Cấp độ 3 • Tái tạo toàn bộ câu học thuật (Full Reconstruction)",
    category: "full_reconstruction",
    title: "Quy hoạch đô thị & Giải pháp tắc nghẽn giao thông",
    topicDomain: "Urban Planning & Civil Engineering",
    targetSentence: "Urban planners emphasize that expanding pedestrian zones can alleviate severe traffic congestion in metropolitan centers.",
    phoneticNotes: {
      trapType: "elision",
      trapNameVi: "Nuốt âm /t/ trong 'pedestrian zones' & Từ vựng C1 'alleviate'",
      phonemicSymbol: "/pəˈdɛs.tri.ən zəʊnz/ & /əˈliː.vi.eɪt/",
      ruleVi: "Thuật ngữ học thuật 'alleviate' phát âm với nguyên âm dài /iː/.",
      acousticExplanationVi: "Yêu cầu bắt đúng đuôi số nhiều 'planners, zones, centers' và động từ học thuật 'alleviate'.",
    },
    ieltsContextVi: "Listening Section 4: Bài giảng về giao thông công cộng và phố đi bộ.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 4,
  },
  {
    id: "dict_l3_05",
    level: 3,
    levelNameVi: "Cấp độ 3 • Tái tạo toàn bộ câu học thuật (Full Reconstruction)",
    category: "full_reconstruction",
    title: "Đa dạng sinh học & Sự phân mảnh môi trường sống",
    topicDomain: "Ecology & Wildlife Conservation",
    targetSentence: "Habitat fragmentation poses an imminent threat to endangered species, disrupting natural ecological corridors.",
    phoneticNotes: {
      trapType: "linking",
      trapNameVi: "Nối âm 'poses an' /pəʊ.zɪz‿ən/ & Trọng âm 'imminent'",
      phonemicSymbol: "/ˈpəʊ.zɪz‿ən ˈɪm.ɪ.nənt θrɛt/",
      ruleVi: "Động từ 'poses' chia ngôi thứ 3 số ít (/zɪz/) nối thẳng sang mạo từ 'an'.",
      acousticExplanationVi: "Học viên rất dễ nhầm 'poses an' thành 'pose a' hoặc 'position' nếu không nghe rõ đuôi /zɪz/.",
    },
    ieltsContextVi: "Listening Section 4: Chuyên đề bảo tồn động vật hoang dã nguy cấp.",
    speakerAccent: "British RP",
    recommendedPlayLimit: 4,
  },
];
