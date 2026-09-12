export interface PhonemicDetail {
  id: string;
  phrase: string;
  type: "linking" | "elision" | "assimilation" | "weak_form" | "flap_t";
  typeLabel: string;
  ipa: string;
  explanation: string;
  acousticTip: string;
}

export interface DictationSentence {
  id: string;
  level: "Cơ bản (Band 4.0 - 5.0)" | "Trung cấp (Band 5.5 - 6.5)" | "Nâng cao (Band 7.0+)";
  topic: string;
  audioUrl: string;
  fullTranscript: string;
  wordsCount: number;
  phonemicDetails: PhonemicDetail[];
  hints: string[];
}

export const MOCK_DICTATION_SENTENCES: DictationSentence[] = [
  // 1. Basic Level - Item 1 (Weak forms & Schwa)
  {
    id: "dict_01",
    level: "Cơ bản (Band 4.0 - 5.0)",
    topic: "Campus Life & Library",
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    fullTranscript: "The student was at the main library.",
    wordsCount: 7,
    hints: ["Chủ ngữ là 'The student'", "Địa điểm là 'main library'"],
    phonemicDetails: [
      {
        id: "pd_01_1",
        phrase: "was at the",
        type: "weak_form",
        typeLabel: "Weak Forms / Schwa",
        ipa: "/wəz ət ðə/",
        explanation: "Các từ chức năng 'was' và 'at' phát âm ở dạng yếu /wəz ət/ chứ không phát âm mạnh /wɒz æt/.",
        acousticTip: "Lướt nhanh âm /ə/, tai người học Band 4.0 thường chỉ nghe thấy /zət/.",
      },
    ],
  },

  // 2. Basic Level - Item 2 (Consonant-to-vowel linking)
  {
    id: "dict_02",
    level: "Cơ bản (Band 4.0 - 5.0)",
    topic: "Accommodation Booking",
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    fullTranscript: "Please fill in an application form.",
    wordsCount: 6,
    hints: ["Cụm động từ điền đơn: 'fill in an'", "Danh từ 'application form'"],
    phonemicDetails: [
      {
        id: "pd_02_1",
        phrase: "fill in an",
        type: "linking",
        typeLabel: "Consonant-to-Vowel Linking",
        ipa: "/fɪl ɪn ən/ -> [fɪ-lɪ-nən]",
        explanation: "Phụ âm cuối /l/ nối sang nguyên âm /ɪ/, và /n/ nối tiếp sang /ə/ tạo thành chuỗi âm thanh liền mạch [fɪ-lɪ-nən].",
        acousticTip: "Tránh nhầm 'fill in an' thành một từ lạ 'filinan'.",
      },
    ],
  },

  // 3. Basic Level - Item 3 (Plural & Ending Sounds)
  {
    id: "dict_03",
    level: "Cơ bản (Band 4.0 - 5.0)",
    topic: "Travel & Tours",
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    fullTranscript: "The buses leave at six in the morning.",
    wordsCount: 8,
    hints: ["Phương tiện số nhiều 'The buses'", "Thời gian 'six in the morning'"],
    phonemicDetails: [
      {
        id: "pd_03_1",
        phrase: "leave at six in",
        type: "linking",
        typeLabel: "Consonant Linking",
        ipa: "/liːv æt sɪks ɪn/ -> [liː-væt sɪk-sɪn]",
        explanation: "Âm /v/ trong 'leave' nối sang 'at', và /s/ trong 'six' nối sang 'in'.",
        acousticTip: "Chú ý đuôi số nhiều /ɪz/ trong 'buses' và âm cuối /ks/ trong 'six'.",
      },
    ],
  },

  // 4. Intermediate Level - Item 4 (Elision of /t/ and /d/)
  {
    id: "dict_04",
    level: "Trung cấp (Band 5.5 - 6.5)",
    topic: "Academic Lecture & Science",
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    fullTranscript: "The last project focused on renewable energy sources.",
    wordsCount: 8,
    hints: ["Cụm danh từ 'The last project'", "Chủ đề 'renewable energy sources'"],
    phonemicDetails: [
      {
        id: "pd_04_1",
        phrase: "last project",
        type: "elision",
        typeLabel: "Elision of /t/",
        ipa: "/lɑːst ˈprɒdʒekt/ -> [lɑːs ˈprɒdʒekt]",
        explanation: "Âm /t/ ở cuối từ 'last' bị nuốt (Elided) khi đứng trước phụ âm /p/ của từ 'project'.",
        acousticTip: "Không chờ nghe âm bật /t/ rõ ràng, nhận biết từ qua ngữ cảnh 'last project'.",
      },
      {
        id: "pd_04_2",
        phrase: "focused on",
        type: "linking",
        typeLabel: "Consonant-to-Vowel Linking",
        ipa: "/ˈfəʊkəst ɒn/ -> [ˈfəʊ-kə-stɒn]",
        explanation: "Đuôi '-ed' phát âm là /t/ và nối thẳng sang giới từ 'on' thành [stɒn].",
        acousticTip: "Đây là dấu hiệu nhận biết thì quá khứ đơn trong bài thi Listening.",
      },
    ],
  },

  // 5. Intermediate Level - Item 5 (Flap T & Assimilation)
  {
    id: "dict_05",
    level: "Trung cấp (Band 5.5 - 6.5)",
    topic: "Customer Service & Enquiry",
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    fullTranscript: "Did you ask for a better water bottle?",
    wordsCount: 8,
    hints: ["Câu hỏi bắt đầu bằng 'Did you ask'", "Đồ vật 'water bottle'"],
    phonemicDetails: [
      {
        id: "pd_05_1",
        phrase: "Did you",
        type: "assimilation",
        typeLabel: "Palatalization Assimilation",
        ipa: "/dɪd juː/ -> [dɪdʒuː]",
        explanation: "Âm /d/ kết hợp với âm /j/ biến đổi thành âm đồng hóa /dʒ/ giống như 'didju'.",
        acousticTip: "Cực kỳ phổ biến trong các câu hỏi Section 1 và Part 1 Speaking.",
      },
      {
        id: "pd_05_2",
        phrase: "better water bottle",
        type: "flap_t",
        typeLabel: "Flap /t/ (Alveolar Tap)",
        ipa: "/ˈbetər ˈwɔːtər ˈbɒtl/ -> [ˈbeɾər ˈwɔːɾər ˈbɒtl]",
        explanation: "Âm /t/ giữa 2 nguyên âm bị biến thành âm Flap /ɾ/ nhẹ giống như âm /d/ trong tiếng Anh - Mỹ và Úc.",
        acousticTip: "Nghe giống như 'bedder wader boddle'.",
      },
    ],
  },

  // 6. Intermediate Level - Item 6 (Intrusive /r/ and Linking)
  {
    id: "dict_06",
    level: "Trung cấp (Band 5.5 - 6.5)",
    topic: "Arts & Exhibition",
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    fullTranscript: "The media and the public are interested in the exhibition.",
    wordsCount: 10,
    hints: ["Chủ ngữ kép 'The media and the public'", "Tính từ 'interested in'"],
    phonemicDetails: [
      {
        id: "pd_06_1",
        phrase: "media and",
        type: "linking",
        typeLabel: "Intrusive /r/",
        ipa: "/ˈmiːdiə ænd/ -> [ˈmiːdiər ənd]",
        explanation: "Trong giọng Anh - Anh chuẩn (RP), khi từ kết thúc bằng nguyên âm /ə/ gặp nguyên âm tiếp theo, âm /r/ mượn tự động xuất hiện.",
        acousticTip: "Tai sẽ nghe thấy âm 'media-r-and'.",
      },
      {
        id: "pd_06_2",
        phrase: "interested in the",
        type: "linking",
        typeLabel: "Connected Speech",
        ipa: "/ˈɪntrəstɪd ɪn ðə/ -> [ˈɪn-trə-stɪ-dɪn-ðə]",
        explanation: "Âm /d/ cuối 'interested' nối sang 'in'.",
        acousticTip: "Chú ý từ 'interested' chỉ phát âm 3 âm tiết /ˈɪn.trəs.tɪd/ thay vì 4 âm tiết.",
      },
    ],
  },

  // 7. Advanced Level - Item 7 (Complex sentence & High density)
  {
    id: "dict_07",
    level: "Nâng cao (Band 7.0+)",
    topic: "Environmental Science Lecture",
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    fullTranscript: "You must have asked about the significant reduction in carbon emissions.",
    wordsCount: 11,
    hints: ["Cấu trúc phỏng đoán quá khứ 'You must have asked'", "Cụm danh từ C1 'significant reduction in carbon emissions'"],
    phonemicDetails: [
      {
        id: "pd_07_1",
        phrase: "must have asked",
        type: "elision",
        typeLabel: "Double Elision & Weak Form",
        ipa: "/mʌst həv ɑːskt/ -> [məs-əv-ɑːskt]",
        explanation: "Nuốt âm /t/ trong 'must', 'have' phát âm dạng yếu /əv/ và nối liền sang 'asked' thành [məs-ə-vɑːskt].",
        acousticTip: "Người học rất dễ nghe sót trợ động từ 'have' trong chuỗi âm thanh này.",
      },
      {
        id: "pd_07_2",
        phrase: "reduction in",
        type: "linking",
        typeLabel: "Consonant-to-Vowel Linking",
        ipa: "/rɪˈdʌkʃn ɪn/ -> [rɪ-ˈdʌk-ʃnɪn]",
        explanation: "Âm mũi /n/ nối liền sang 'in'.",
        acousticTip: "Nhấn mạnh vào âm tiết thứ hai của 're-DUC-tion'.",
      },
    ],
  },

  // 8. Advanced Level - Item 8 (Fast pace Section 4 Monologue)
  {
    id: "dict_08",
    level: "Nâng cao (Band 7.0+)",
    topic: "Urban Planning & Economy",
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    fullTranscript: "Rapid technological advancement has completely transformed traditional workplace environments.",
    wordsCount: 9,
    hints: ["Chủ ngữ 'Rapid technological advancement'", "Vị ngữ 'has completely transformed'"],
    phonemicDetails: [
      {
        id: "pd_08_1",
        phrase: "advancement has",
        type: "weak_form",
        typeLabel: "Weak Form & Unstressed 'has'",
        ipa: "/ədˈvɑːnsmənt həz/ -> [əd-ˈvɑːns-mən-təz]",
        explanation: "Trợ động từ 'has' bị nuốt âm /h/ thành /əz/ và nối liền vào âm /t/ của 'advancement'.",
        acousticTip: "Nghe gần như [təz] thay vì tách bạch 'advancement has'.",
      },
      {
        id: "pd_08_2",
        phrase: "completely transformed",
        type: "elision",
        typeLabel: "Elision of /t/ cluster",
        ipa: "/kəmˈpliːtli trænsˈfɔːmd/ -> [kəmˈpliːli trænsˈfɔːmd]",
        explanation: "Âm /t/ giữa /iː/ và /l/ trong 'completely' thường bị nghẽn (Glottal Stop) hoặc nuốt nhẹ.",
        acousticTip: "Tập trung bắt nhịp trọng âm chính ở 'transFORMED'.",
      },
    ],
  },
];
