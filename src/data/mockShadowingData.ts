export interface EndingSoundTag {
  word: string;
  ending: "-s" | "-es" | "-ed";
  sound: string; // e.g. "/z/", "/s/", "/ɪz/", "/t/", "/d/", "/ɪd/"
  pronounceGuide: string; // e.g. "Bật âm 'z' rung nhẹ cuối từ", "Bật âm 't' gió dứt khoát"
}

export interface ShadowingChunk {
  id: string;
  chunkIndex: number;
  text: string;
  pronunciationGuide: string; // Actionable plain guidance in Vietnamese (NO theoretical IPA)
  phoneticIPA?: string;
  stressedWords: string[];
  endingSounds?: EndingSoundTag[];
  linkingPairs: Array<{ fromWord: string; toWord: string; label: string }>;
  elisions: Array<{ word: string; droppedSound: string; explanation: string }>;
  startSeconds: number;
  durationSeconds: number;
}

export interface ShadowingSentence {
  id: string;
  title: string;
  topic: string;
  category: "day1_core" | "c1_cadence";
  part: string;
  targetBand: string;
  soundFocus: string;
  fullText: string;
  audioUrl?: string;
  totalDurationSeconds: number;
  tempoWPM: number;
  chunks: ShadowingChunk[];
  pedagogicalFocus: string;
  cambridgeTip: string;
}

export const MOCK_SHADOWING_SENTENCES: ShadowingSentence[] = [
  // =========================================================================
  // BỘ MICRO-DRILL NGÀY 1: 2 ÂM ĐUÔI SỐNG CÒN (-S/-ES & -ED)
  // =========================================================================
  {
    id: "sh_sent_01",
    title: "Ca 4 • Ngày 1: Âm Đuôi -es (/ɪz/) & -s (/z/) — Hiện Tại Đơn",
    topic: "Work & Daily Routine (Part 1)",
    category: "day1_core",
    part: "Phase 1 • Day 1",
    targetBand: "Band 6.5 - 7.5+",
    soundFocus: "Bật chuẩn đuôi /ɪz/ ở 'watches' & đuôi /z/ ở 'provides'",
    fullText: "My manager usually watches presentations and provides feedback.",
    totalDurationSeconds: 5.4,
    tempoWPM: 125,
    pedagogicalFocus: "Quy tắc phát âm -es (/ɪz/) sau âm ch, và -s (/z/) sau nguyên âm/phụ âm rung.",
    cambridgeTip: "Giám khảo chấm điểm rất nặng lỗi nuốt âm -s/-es của thí sinh Việt Nam. Hãy kéo nhẹ đuôi 'watches' thành 2 âm tiết rõ ràng (watch-iz).",
    chunks: [
      {
        id: "chunk_01_1",
        chunkIndex: 0,
        text: "My manager usually watches",
        pronunciationGuide: "Nhấn vào 'manager' và 'watches'. Đuôi 'watches' phát âm là /ɪz/ (uất-chịt-z), tuyệt đối không nuốt âm.",
        phoneticIPA: "maɪ ˈmænɪdʒə ˈjuːʒuəli ˈwɒtʃɪz",
        stressedWords: ["manager", "watches"],
        endingSounds: [
          {
            word: "watches",
            ending: "-es",
            sound: "/ɪz/",
            pronounceGuide: "Thêm 1 âm tiết nhẹ: 'watch-iz'. Bật rõ âm 'z' rung ở cuối.",
          },
        ],
        linkingPairs: [],
        elisions: [],
        startSeconds: 0,
        durationSeconds: 2.2,
      },
      {
        id: "chunk_01_2",
        chunkIndex: 1,
        text: "presentations",
        pronunciationGuide: "Trọng âm rơi vào vần 'ta' (pre-zen-TA-shunz). Bật đuôi /z/ nhẹ ở cuối từ.",
        phoneticIPA: "ˌpreznˈteɪʃnz",
        stressedWords: ["presentations"],
        endingSounds: [
          {
            word: "presentations",
            ending: "-s",
            sound: "/z/",
            pronounceGuide: "Âm /z/ ở cuối từ số nhiều: rung nhẹ dây thanh quản.",
          },
        ],
        linkingPairs: [],
        elisions: [],
        startSeconds: 2.2,
        durationSeconds: 1.4,
      },
      {
        id: "chunk_01_3",
        chunkIndex: 2,
        text: "and provides feedback.",
        pronunciationGuide: "Nối âm 'and' sang 'provides'. Động từ 'provides' có đuôi /z/ (pro-vaidz). Hạ giọng ở từ cuối 'feedback'.",
        phoneticIPA: "ənd prəˈvaɪdz ˈfiːdbæk",
        stressedWords: ["provides", "feedback"],
        endingSounds: [
          {
            word: "provides",
            ending: "-s",
            sound: "/z/",
            pronounceGuide: "Đuôi 's' sau âm 'd' đọc là /z/ rung.",
          },
        ],
        linkingPairs: [
          { fromWord: "and", toWord: "provides", label: "Phụ âm sang phụ âm liền mạch" },
        ],
        elisions: [
          { word: "and", droppedSound: "/d/ nuốt nhẹ", explanation: "Từ 'and' đọc lướt thành 'ən' trước phụ âm 'p'" },
        ],
        startSeconds: 3.6,
        durationSeconds: 1.8,
      },
    ],
  },

  {
    id: "sh_sent_02",
    title: "Ca 4 • Ngày 1: Phân Biệt Âm Đuôi /s/ vs /z/ — Hiện Tại Đơn",
    topic: "Personal Background (Part 1)",
    category: "day1_core",
    part: "Phase 1 • Day 1",
    targetBand: "Band 6.5 - 7.5+",
    soundFocus: "Phân biệt: lives (/z/) vs works (/s/) vs speaks (/s/)",
    fullText: "She lives downtown, works in marketing, and speaks three languages.",
    totalDurationSeconds: 5.6,
    tempoWPM: 130,
    pedagogicalFocus: "Âm đuôi vô thanh /s/ (works, speaks) vs âm đuôi hữu thanh /z/ (lives, languages /ɪz/).",
    cambridgeTip: "Đừng đọc mọi âm 's' giống hệt nhau. 'Works' và 'Speaks' bật gió /s/ xì nhẹ, còn 'Lives' bật rung nhẹ /z/.",
    chunks: [
      {
        id: "chunk_02_1",
        chunkIndex: 0,
        text: "She lives downtown,",
        pronunciationGuide: "Nhấn vào 'lives' và 'downtown'. Từ 'lives' kết thúc bằng /z/ rung nhẹ.",
        phoneticIPA: "ʃi lɪvz ˈdaʊntaʊn",
        stressedWords: ["lives", "downtown"],
        endingSounds: [
          {
            word: "lives",
            ending: "-s",
            sound: "/z/",
            pronounceGuide: "Âm hữu thanh: rung dây thanh quản /lɪvz/.",
          },
        ],
        linkingPairs: [],
        elisions: [],
        startSeconds: 0,
        durationSeconds: 1.8,
      },
      {
        id: "chunk_02_2",
        chunkIndex: 1,
        text: "works in marketing,",
        pronunciationGuide: "Nối âm: 'works' kết thúc bằng /s/ nối liền sang 'in' thành 'work-sin'. Nhấn 'marketing'.",
        phoneticIPA: "wɜːks ɪn ˈmɑːkɪtɪŋ",
        stressedWords: ["works", "marketing"],
        endingSounds: [
          {
            word: "works",
            ending: "-s",
            sound: "/s/",
            pronounceGuide: "Âm gió /s/: bật hơi dứt khoát không rung cổ họng.",
          },
        ],
        linkingPairs: [
          { fromWord: "works", toWord: "in", label: "Nối âm đuôi /s/ + nguyên âm /ɪ/ (work-sin)" },
        ],
        elisions: [],
        startSeconds: 1.8,
        durationSeconds: 1.8,
      },
      {
        id: "chunk_02_3",
        chunkIndex: 2,
        text: "and speaks three languages.",
        pronunciationGuide: "Bật gió /s/ ở 'speaks'. Từ 'languages' có đuôi /ɪz/ (lan-gwi-jiz).",
        phoneticIPA: "ənd spiːks θriː ˈlæŋɡwɪdʒɪz",
        stressedWords: ["speaks", "languages"],
        endingSounds: [
          {
            word: "speaks",
            ending: "-s",
            sound: "/s/",
            pronounceGuide: "Bật gió /s/ dứt khoát sau âm k.",
          },
          {
            word: "languages",
            ending: "-es",
            sound: "/ɪz/",
            pronounceGuide: "Thêm âm tiết nhẹ /ɪz/ ở cuối từ (lan-gwi-jiz).",
          },
        ],
        linkingPairs: [],
        elisions: [],
        startSeconds: 3.6,
        durationSeconds: 2.0,
      },
    ],
  },

  {
    id: "sh_sent_03",
    title: "Ca 4 • Ngày 1: Âm Đuôi -ed Dạng Vô Thanh (/t/) — Quá Khứ Đơn",
    topic: "Past Experience (Part 1)",
    category: "day1_core",
    part: "Phase 1 • Day 1",
    targetBand: "Band 6.5 - 7.5+",
    soundFocus: "Bật dứt khoát đuôi /t/ ở 'worked' và 'finished'",
    fullText: "Yesterday, I worked late at the office and finished all my tasks.",
    totalDurationSeconds: 6.0,
    tempoWPM: 130,
    pedagogicalFocus: "Đuôi -ed đi sau phụ âm vô thanh (/k/, /ʃ/) phát âm là /t/ bật hơi dứt khoát.",
    cambridgeTip: "Lỗi phổ biến nhất của người Việt là đọc 'work-kịt' hay 'finish-sịt'. Chuẩn bản xứ: 'worked' = /wɜːkt/, 'finished' = /ˈfɪnɪʃt/ (bật âm 't' cực nhanh dứt khoát).",
    chunks: [
      {
        id: "chunk_03_1",
        chunkIndex: 0,
        text: "Yesterday, I worked late",
        pronunciationGuide: "Nhấn mạnh 'Yesterday' và 'worked'. 'Worked' phát âm là 'uất-t' (bật nhẹ âm t gió ở cuối).",
        phoneticIPA: "ˈjestədeɪ aɪ wɜːkt leɪt",
        stressedWords: ["Yesterday", "worked", "late"],
        endingSounds: [
          {
            word: "worked",
            ending: "-ed",
            sound: "/t/",
            pronounceGuide: "Bật âm 't' gió dứt khoát sau âm /k/. Không đọc thêm âm tiết.",
          },
        ],
        linkingPairs: [],
        elisions: [],
        startSeconds: 0,
        durationSeconds: 2.2,
      },
      {
        id: "chunk_03_2",
        chunkIndex: 1,
        text: "at the office",
        pronunciationGuide: "Cụm phụ âm lướt nhẹ, nối âm tự nhiên, không nhấn vào 'at' và 'the'.",
        phoneticIPA: "ət ði ˈɒfɪs",
        stressedWords: ["office"],
        endingSounds: [],
        linkingPairs: [
          { fromWord: "at", toWord: "the", label: "Nối âm liền mạch" },
        ],
        elisions: [],
        startSeconds: 2.2,
        durationSeconds: 1.4,
      },
      {
        id: "chunk_03_3",
        chunkIndex: 2,
        text: "and finished all my tasks.",
        pronunciationGuide: "'Finished' có đuôi /t/ (phi-ních-t). Nối âm 'finished' sang 'all' thành 'finish-tall'. Từ 'tasks' bật rõ âm /s/.",
        phoneticIPA: "ənd ˈfɪnɪʃt ɔːl maɪ tɑːsks",
        stressedWords: ["finished", "tasks"],
        endingSounds: [
          {
            word: "finished",
            ending: "-ed",
            sound: "/t/",
            pronounceGuide: "Sau âm sột soạt /ʃ/, đuôi -ed bật gió /t/ (phi-ních-t).",
          },
          {
            word: "tasks",
            ending: "-s",
            sound: "/s/",
            pronounceGuide: "Bật gió /s/ ở cuối từ danh từ số nhiều.",
          },
        ],
        linkingPairs: [
          { fromWord: "finished", toWord: "all", label: "Nối đuôi /t/ sang nguyên âm /ɔː/ (finish-tall)" },
        ],
        elisions: [],
        startSeconds: 3.6,
        durationSeconds: 2.4,
      },
    ],
  },

  {
    id: "sh_sent_04",
    title: "Ca 4 • Ngày 1: Âm Đuôi -ed Dạng Thêm Âm Tiết (/ɪd/) — Quá Khứ Đơn",
    topic: "Leisure & Education (Part 1)",
    category: "day1_core",
    part: "Phase 1 • Day 1",
    targetBand: "Band 6.5 - 7.5+",
    soundFocus: "Chỉ thêm âm tiết /ɪd/ khi động từ tận cùng bằng T hoặc D: decided & started",
    fullText: "We decided to visit a local museum and started our research.",
    totalDurationSeconds: 5.8,
    tempoWPM: 130,
    pedagogicalFocus: "Đuôi -ed chỉ được đọc thành vần riêng (/ɪd/) khi động từ gốc kết thúc bằng /t/ hoặc /d/.",
    cambridgeTip: "Nhớ mẹo thần chú 'T-D': Chỉ khi từ gốc tận cùng là T hoặc D thì mới đọc là '-id' (decide -> de-ci-did; start -> star-tid).",
    chunks: [
      {
        id: "chunk_04_1",
        chunkIndex: 0,
        text: "We decided to visit",
        pronunciationGuide: "Từ gốc 'decide' kết thúc bằng 'd' -> 'decided' đọc là 'đi-sai-địt' (/dɪˈsaɪdɪd/).",
        phoneticIPA: "wi dɪˈsaɪdɪd tə ˈvɪzɪt",
        stressedWords: ["decided", "visit"],
        endingSounds: [
          {
            word: "decided",
            ending: "-ed",
            sound: "/ɪd/",
            pronounceGuide: "Tận cùng là 'd' nên thêm âm tiết /ɪd/ (đi-sai-địt).",
          },
        ],
        linkingPairs: [],
        elisions: [
          { word: "to", droppedSound: "Weak form /tə/", explanation: "Giới từ 'to' đọc nhẹ thành 'tờ'" },
        ],
        startSeconds: 0,
        durationSeconds: 2.0,
      },
      {
        id: "chunk_04_2",
        chunkIndex: 1,
        text: "a local museum",
        pronunciationGuide: "Nhấn 'local' và 'museum'. Giữ nhịp điệu trôi chảy.",
        phoneticIPA: "ə ˈləʊkl mjuˈziːəm",
        stressedWords: ["local", "museum"],
        endingSounds: [],
        linkingPairs: [],
        elisions: [],
        startSeconds: 2.0,
        durationSeconds: 1.6,
      },
      {
        id: "chunk_04_3",
        chunkIndex: 2,
        text: "and started our research.",
        pronunciationGuide: "Từ gốc 'start' kết thúc bằng 't' -> 'started' đọc là 'ìt-ta-tịt' (/ˈstɑːtɪd/). Nối âm 'started' sang 'our'.",
        phoneticIPA: "ənd ˈstɑːtɪd ˈaʊə rɪˈsɜːtʃ",
        stressedWords: ["started", "research"],
        endingSounds: [
          {
            word: "started",
            ending: "-ed",
            sound: "/ɪd/",
            pronounceGuide: "Tận cùng là 't' nên thêm âm tiết /ɪd/ (star-tid).",
          },
        ],
        linkingPairs: [
          { fromWord: "started", toWord: "our", label: "Nối đuôi /d/ sang nguyên âm /aʊ/ (starti-dour)" },
        ],
        elisions: [],
        startSeconds: 3.6,
        durationSeconds: 2.2,
      },
    ],
  },

  // =========================================================================
  // BỘ LUYỆN NGỮ ĐIỆU C1 & CỤM TƯ DUY (THOUGHT GROUPS)
  // =========================================================================
  {
    id: "sh_sent_05",
    title: "Luyện Ngữ Điệu C1: Thói Quen Đọc Sách & Ngắt Cụm Nhịp Nhàng",
    topic: "Reading Habits (Part 1)",
    category: "c1_cadence",
    part: "Part 1 • Speaking Flow",
    targetBand: "Band 7.5 - 8.0+",
    soundFocus: "Ngắt cụm tư duy (Thought Groups) & Nối âm mượt mà",
    fullText: "To be completely honest, back when I was a student, I used to read classic fiction.",
    totalDurationSeconds: 6.2,
    tempoWPM: 135,
    pedagogicalFocus: "Connected speech 'used to', weak form 'was a', và ngữ điệu rơi ở cuối câu.",
    cambridgeTip: "Nhấn mạnh vào các Content Words: 'honest', 'student', 'read', 'classic fiction'.",
    chunks: [
      {
        id: "chunk_05_1",
        chunkIndex: 0,
        text: "To be completely honest,",
        pronunciationGuide: "Cụm mở đầu quen thuộc: Nhấn vào 'completely' và 'honest'. Giữ giọng hơi ngân lên nhẹ ở dấu phẩy.",
        phoneticIPA: "tə bi kəmˈpliːtli ˈɒnɪst",
        stressedWords: ["completely", "honest"],
        endingSounds: [
          {
            word: "honest",
            ending: "-s",
            sound: "/st/",
            pronounceGuide: "Bật nhẹ âm cụm phụ âm /st/ ở cuối.",
          },
        ],
        linkingPairs: [],
        elisions: [],
        startSeconds: 0,
        durationSeconds: 1.8,
      },
      {
        id: "chunk_05_2",
        chunkIndex: 1,
        text: "back when I was a student,",
        pronunciationGuide: "Nối âm: 'was' nối sang 'a' (/wəz ə/). Nhấn vào 'student'.",
        phoneticIPA: "bæk wen aɪ wəz ə ˈstjuːdnt",
        stressedWords: ["back", "student"],
        endingSounds: [],
        linkingPairs: [
          { fromWord: "was", toWord: "a", label: "Phụ âm sang nguyên âm (/z/ + /ə/)" },
        ],
        elisions: [
          { word: "was", droppedSound: "Weak form /wəz/", explanation: "Đọc lướt nhanh giảm nhẹ nguyên âm" },
        ],
        startSeconds: 1.8,
        durationSeconds: 2.1,
      },
      {
        id: "chunk_05_3",
        chunkIndex: 2,
        text: "I used to read classic fiction.",
        pronunciationGuide: "'Used to' đọc lướt thành 'yúss-tờ' (nuốt âm d). Nhấn rõ 'classic fiction' và hạ giọng ở cuối câu.",
        phoneticIPA: "aɪ ˈjuːst tə riːd ˈklæsɪk ˈfɪkʃn",
        stressedWords: ["used", "read", "classic", "fiction"],
        endingSounds: [],
        linkingPairs: [],
        elisions: [
          { word: "used to", droppedSound: "/d/ nuốt trước /t/", explanation: "Nuốt âm /d/ đọc thành /juːstə/" },
        ],
        startSeconds: 3.9,
        durationSeconds: 2.3,
      },
    ],
  },

  {
    id: "sh_sent_06",
    title: "Luyện Ngữ Điệu C1: Ứng Dụng Công Nghệ & Trọng Âm Từ Đa Âm Tiết",
    topic: "Smartphones & Productivity (Part 1)",
    category: "c1_cadence",
    part: "Part 1 • Speaking Flow",
    targetBand: "Band 8.0+",
    soundFocus: "Trọng âm từ đa âm tiết 'predominantly' & 'applications'",
    fullText: "Nowadays, owing to my hectic schedule, I rely heavily on mobile applications.",
    totalDurationSeconds: 5.8,
    tempoWPM: 140,
    pedagogicalFocus: "C1 Adverbs 'predominantly/heavily', rhythm stress on 'hectic' and 'applications'.",
    cambridgeTip: "Tránh nhấn mạnh vào các từ chức năng như 'to', 'my', 'on'. Chỉ nhấn vào từ mang ý nghĩa chính.",
    chunks: [
      {
        id: "chunk_06_1",
        chunkIndex: 0,
        text: "Nowadays, owing to my hectic schedule,",
        pronunciationGuide: "'Nowadays' bật đuôi /z/. Nhấn rõ từ 'hectic' và 'schedule'.",
        phoneticIPA: "ˈnaʊədeɪz ˈəʊɪŋ tə maɪ ˈhektɪk ˈʃedjuːl",
        stressedWords: ["Nowadays", "hectic", "schedule"],
        endingSounds: [
          {
            word: "Nowadays",
            ending: "-s",
            sound: "/z/",
            pronounceGuide: "Bật đuôi /z/ rung nhẹ.",
          },
        ],
        linkingPairs: [],
        elisions: [],
        startSeconds: 0,
        durationSeconds: 2.8,
      },
      {
        id: "chunk_06_2",
        chunkIndex: 1,
        text: "I rely heavily on mobile applications.",
        pronunciationGuide: "Nối âm: 'rely' sang 'heavily', 'heavily' sang 'on'. Nhấn vào 'applications' (trọng âm rơi vào vần ca: appli-CA-tions).",
        phoneticIPA: "aɪ rɪˈlaɪ ˈhevɪli ɒn ˈməʊbaɪl ˌæplɪˈkeɪʃnz",
        stressedWords: ["rely", "heavily", "applications"],
        endingSounds: [
          {
            word: "applications",
            ending: "-s",
            sound: "/z/",
            pronounceGuide: "Đuôi số nhiều phát âm là /z/ rung nhẹ.",
          },
        ],
        linkingPairs: [
          { fromWord: "heavily", toWord: "on", label: "Nối âm lướt tự nhiên" },
        ],
        elisions: [],
        startSeconds: 2.8,
        durationSeconds: 3.0,
      },
    ],
  },
];
