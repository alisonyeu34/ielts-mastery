export interface SyllableItem {
  text: string;
  stressLevel: "primary" | "secondary" | "unstressed";
  ipa: string;
}

export interface WordStressRuleItem {
  id: string;
  word: string;
  partOfSpeech: string;
  meaning: string;
  ruleCategory: "2_syllable_shift" | "direct_suffix" | "penultimate_suffix" | "compound";
  ruleNameVi: string;
  explanation: string;
  syllables: SyllableItem[];
  ipaFull: string;
  pairedWord?: {
    word: string;
    partOfSpeech: string;
    ipa: string;
    meaning: string;
    stressOnSyllableIndex: number;
  };
}

export interface LinkingPoint {
  indexBeforeWord: number; // word index in sentence
  type: "c_to_v" | "intrusive_w" | "intrusive_j" | "intrusive_r" | "elision" | "assimilation";
  symbol: string;
  label: string;
  explanation: string;
}

export interface ConnectedSpeechSentenceItem {
  id: string;
  plainText: string;
  annotatedText: string; // e.g. "Hold‿on for a‿moment"
  ipaConnected: string;
  audioDurationSeconds: number;
  linkingPoints: LinkingPoint[];
  topic: string;
}

export interface ThoughtGroupChunk {
  chunkIndex: number;
  text: string;
  isTerminal: boolean; // true for ||, false for |
  suggestedPauseSeconds: number;
  contentWords: string[]; // words receiving sentence stress
  functionWords: string[]; // words reduced to Schwa
}

export interface ThoughtGroupSentenceItem {
  id: string;
  fullSentence: string;
  topic: string;
  contextType: "reading_academic" | "speaking_p2" | "speaking_p3" | "lecture_s4";
  chunks: ThoughtGroupChunk[];
  metronomeBPM: number; // Suggested speaking tempo (e.g. 100 - 130 BPM)
  audioExampleUrl?: string;
}

export const MOCK_WORD_STRESS_ITEMS: WordStressRuleItem[] = [
  {
    id: "ws_01",
    word: "PREsent",
    partOfSpeech: "Noun",
    meaning: "món quà / hiện tại",
    ruleCategory: "2_syllable_shift",
    ruleNameVi: "Quy luật 1: Danh từ 2 âm tiết nhấn âm 1",
    explanation: "Đa số danh từ & tính từ 2 âm tiết có trọng âm rơi vào âm tiết đầu tiên (/ˈprez.ənt/).",
    syllables: [
      { text: "PRE", stressLevel: "primary", ipa: "ˈprez" },
      { text: "sent", stressLevel: "unstressed", ipa: "ənt" },
    ],
    ipaFull: "/ˈprez.ənt/",
    pairedWord: {
      word: "preSENT",
      partOfSpeech: "Verb",
      ipa: "/prɪˈzent/",
      meaning: "trình bày / trao tặng",
      stressOnSyllableIndex: 1,
    },
  },
  {
    id: "ws_02",
    word: "PROduce",
    partOfSpeech: "Noun",
    meaning: "nông sản / sản phẩm",
    ruleCategory: "2_syllable_shift",
    ruleNameVi: "Quy luật 1: Động từ 2 âm tiết nhấn âm 2",
    explanation: "Động từ 'proDUCE' nhấn âm 2 (/prəˈdjuːs/), khác với danh từ 'PROduce' nhấn âm 1 (/ˈprɒd.juːs/).",
    syllables: [
      { text: "PRO", stressLevel: "primary", ipa: "ˈprɒd" },
      { text: "duce", stressLevel: "unstressed", ipa: "juːs" },
    ],
    ipaFull: "/ˈprɒd.juːs/",
    pairedWord: {
      word: "proDUCE",
      partOfSpeech: "Verb",
      ipa: "/prəˈdjuːs/",
      meaning: "sản xuất / chế tạo",
      stressOnSyllableIndex: 1,
    },
  },
  {
    id: "ws_03",
    word: "employEE",
    partOfSpeech: "Noun",
    meaning: "nhân viên / người làm công",
    ruleCategory: "direct_suffix",
    ruleNameVi: "Quy luật 2: Hậu tố nhận trọng âm trực tiếp (-ee, -eer, -ique)",
    explanation: "Các từ có hậu tố '-ee', '-eer', '-ique', '-ese' trọng âm rơi ngay chính hậu tố đó.",
    syllables: [
      { text: "em", stressLevel: "secondary", ipa: "ˌɪm" },
      { text: "ploy", stressLevel: "unstressed", ipa: "plɔɪ" },
      { text: "EE", stressLevel: "primary", ipa: "ˈiː" },
    ],
    ipaFull: "/ɪmˌplɔɪˈiː/",
  },
  {
    id: "ws_04",
    word: "engiNEER",
    partOfSpeech: "Noun",
    meaning: "kỹ sư",
    ruleCategory: "direct_suffix",
    ruleNameVi: "Quy luật 2: Hậu tố nhận trọng âm trực tiếp (-eer)",
    explanation: "Hậu tố '-eer' luôn hút trọng âm chính (/ˌen.dʒɪˈnɪər/).",
    syllables: [
      { text: "en", stressLevel: "secondary", ipa: "ˌen" },
      { text: "gi", stressLevel: "unstressed", ipa: "dʒɪ" },
      { text: "NEER", stressLevel: "primary", ipa: "ˈnɪər" },
    ],
    ipaFull: "/ˌen.dʒɪˈnɪər/",
  },
  {
    id: "ws_05",
    word: "polluTION",
    partOfSpeech: "Noun",
    meaning: "sự ô nhiễm",
    ruleCategory: "penultimate_suffix",
    ruleNameVi: "Quy luật 3: Hậu tố kéo trọng âm về trước nó (-tion, -sion, -ic, -ity)",
    explanation: "Hậu tố '-tion/-sion' làm trọng âm rơi vào âm tiết liền trước nó.",
    syllables: [
      { text: "pol", stressLevel: "unstressed", ipa: "pə" },
      { text: "LU", stressLevel: "primary", ipa: "ˈluː" },
      { text: "tion", stressLevel: "unstressed", ipa: "ʃən" },
    ],
    ipaFull: "/pəˈluː.ʃən/",
  },
  {
    id: "ws_06",
    word: "ecoNOmic",
    partOfSpeech: "Adjective",
    meaning: "thuộc về kinh tế",
    ruleCategory: "penultimate_suffix",
    ruleNameVi: "Quy luật 3: Hậu tố '-ic' kéo trọng âm về âm tiết kế trước",
    explanation: "Danh từ 'eCOnomy' nhấn âm 2 (/ɪˈkɒn.ə.mi/), nhưng tính từ 'ecoNOmic' chuyển trọng âm sang âm 3 (/ˌiː.kəˈnɒm.ɪk/).",
    syllables: [
      { text: "e", stressLevel: "secondary", ipa: "ˌiː" },
      { text: "co", stressLevel: "unstressed", ipa: "kə" },
      { text: "NO", stressLevel: "primary", ipa: "ˈnɒm" },
      { text: "mic", stressLevel: "unstressed", ipa: "ɪk" },
    ],
    ipaFull: "/ˌiː.kəˈnɒm.ɪk/",
  },
  {
    id: "ws_07",
    word: "GREENhouse",
    partOfSpeech: "Compound Noun",
    meaning: "nhà kính (hiệu ứng nhà kính)",
    ruleCategory: "compound",
    ruleNameVi: "Quy luật 4: Danh từ ghép nhấn âm tiết đầu",
    explanation: "Danh từ ghép (Compound Nouns) nhấn vào từ đứng đầu ('GREENhouse'). Tính từ ghép (Compound Adjectives) thường nhấn từ thứ 2 ('well-KNOWN').",
    syllables: [
      { text: "GREEN", stressLevel: "primary", ipa: "ˈɡriːn" },
      { text: "house", stressLevel: "unstressed", ipa: "haʊs" },
    ],
    ipaFull: "/ˈɡriːn.haʊs/",
  },
];

export const MOCK_CONNECTED_SPEECH_ITEMS: ConnectedSpeechSentenceItem[] = [
  {
    id: "cs_01",
    plainText: "First of all, hold on for an hour.",
    annotatedText: "First‿of‿all, hold‿on for‿an‿hour.",
    ipaConnected: "/fɜːst‿əv‿ɔːl, həʊld‿ɒn fər‿ən‿aʊər/",
    audioDurationSeconds: 3.2,
    topic: "Consonant-to-Vowel Linking (Nối Phụ âm sang Nguyên âm)",
    linkingPoints: [
      {
        indexBeforeWord: 0,
        type: "c_to_v",
        symbol: "‿",
        label: "Nối /t/ sang /ə/",
        explanation: "Âm cuối /t/ trong 'First' nối liền mạch sang nguyên âm /ə/ trong 'of' -> /fɜːstəv/.",
      },
      {
        indexBeforeWord: 1,
        type: "c_to_v",
        symbol: "‿",
        label: "Nối /v/ sang /ɔː/",
        explanation: "Âm /v/ trong 'of' nối sang /ɔː/ trong 'all' -> /əvɔːl/.",
      },
      {
        indexBeforeWord: 3,
        type: "c_to_v",
        symbol: "‿",
        label: "Nối /d/ sang /ɒ/",
        explanation: "Âm /d/ trong 'hold' nối sang /ɒ/ trong 'on' -> /həʊldɒn/.",
      },
    ],
  },
  {
    id: "cs_02",
    plainText: "We need to go out and see it right now.",
    annotatedText: "We need to go‿ʷ‿out and see‿ʲ‿it right now.",
    ipaConnected: "/wiː niːd tə ɡəʊ‿w‿aʊt ənd siː‿j‿ɪt raɪt naʊ/",
    audioDurationSeconds: 3.8,
    topic: "Intrusive /w/ and /j/ Linking (Nối Nguyên âm sang Nguyên âm)",
    linkingPoints: [
      {
        indexBeforeWord: 3,
        type: "intrusive_w",
        symbol: "^w",
        label: "Chèn âm /w/",
        explanation: "Âm đôi /əʊ/ kết thúc bằng môi tròn trước nguyên âm /aʊ/ tự động sinh ra âm lướt /w/ -> /ɡəʊwaʊt/.",
      },
      {
        indexBeforeWord: 6,
        type: "intrusive_j",
        symbol: "^j",
        label: "Chèn âm /j/",
        explanation: "Âm /iː/ kết thúc bằng mép bè trước nguyên âm /ɪ/ tự động sinh ra âm lướt /j/ -> /siːjɪt/.",
      },
    ],
  },
  {
    id: "cs_03",
    plainText: "The media attention caused a huge public backlash.",
    annotatedText: "The media‿ʳ‿attention caused a huge public backlash.",
    ipaConnected: "/ðə ˈmiːdiə‿r‿əˈtenʃn kɔːzd ə hjuːdʒ ˈpʌblɪk ˈbæklæʃ/",
    audioDurationSeconds: 4.2,
    topic: "Intrusive /r/ Linking (Âm r nối trong giọng Anh-Anh)",
    linkingPoints: [
      {
        indexBeforeWord: 1,
        type: "intrusive_r",
        symbol: "^r",
        label: "Chèn âm /r/",
        explanation: "Trong giọng RP British, nguyên âm /ə/ (media) đứng trước nguyên âm /ə/ (attention) được chèn âm /r/ để nối liền hơi.",
      },
    ],
  },
  {
    id: "cs_04",
    plainText: "You must tell the next door neighbor about last night.",
    annotatedText: "You mus(t) tell the nex(t) door neighbor about las(t) night.",
    ipaConnected: "/ju mʌs tel ðə neks dɔː ˈneɪbər əˈbaʊt lɑːs naɪt/",
    audioDurationSeconds: 4.5,
    topic: "Elision of /t/ and /d/ (Nuốt âm giữa hai phụ âm)",
    linkingPoints: [
      {
        indexBeforeWord: 4,
        type: "elision",
        symbol: "×t",
        label: "Nuốt âm /t/ trong 'next door'",
        explanation: "Âm /t/ đứng giữa 2 phụ âm /ks/ và /d/ bị triệt tiêu hoàn toàn -> đọc là /neks dɔː/.",
      },
      {
        indexBeforeWord: 8,
        type: "elision",
        symbol: "×t",
        label: "Nuốt âm /t/ trong 'last night'",
        explanation: "Âm /t/ đứng giữa /s/ và /n/ bị nuốt -> đọc là /lɑːs naɪt/.",
      },
    ],
  },
];

export const MOCK_THOUGHT_GROUP_ITEMS: ThoughtGroupSentenceItem[] = [
  {
    id: "tg_01",
    fullSentence: "In recent decades, the rapid expansion of urban centers has triggered severe housing shortages.",
    topic: "Urbanization & Infrastructure (IELTS Writing/Speaking Part 3)",
    contextType: "speaking_p3",
    metronomeBPM: 110,
    chunks: [
      {
        chunkIndex: 0,
        text: "In recent decades,",
        isTerminal: false,
        suggestedPauseSeconds: 0.35,
        contentWords: ["recent", "decades"],
        functionWords: ["In"],
      },
      {
        chunkIndex: 1,
        text: "the rapid expansion of urban centers",
        isTerminal: false,
        suggestedPauseSeconds: 0.4,
        contentWords: ["rapid", "expansion", "urban", "centers"],
        functionWords: ["the", "of"],
      },
      {
        chunkIndex: 2,
        text: "has triggered severe housing shortages.",
        isTerminal: true,
        suggestedPauseSeconds: 0.8,
        contentWords: ["triggered", "severe", "housing", "shortages"],
        functionWords: ["has"],
      },
    ],
  },
  {
    id: "tg_02",
    fullSentence: "Although technological innovations enhance productivity, they inevitably widen the socioeconomic divide.",
    topic: "Technology & Social Equality (Academic Complex Sentence)",
    contextType: "reading_academic",
    metronomeBPM: 105,
    chunks: [
      {
        chunkIndex: 0,
        text: "Although technological innovations",
        isTerminal: false,
        suggestedPauseSeconds: 0.3,
        contentWords: ["technological", "innovations"],
        functionWords: ["Although"],
      },
      {
        chunkIndex: 1,
        text: "enhance productivity,",
        isTerminal: false,
        suggestedPauseSeconds: 0.45,
        contentWords: ["enhance", "productivity"],
        functionWords: [],
      },
      {
        chunkIndex: 2,
        text: "they inevitably widen the socioeconomic divide.",
        isTerminal: true,
        suggestedPauseSeconds: 0.8,
        contentWords: ["inevitably", "widen", "socioeconomic", "divide"],
        functionWords: ["they", "the"],
      },
    ],
  },
  {
    id: "tg_03",
    fullSentence: "Governments should allocate substantial funding to renewable energy infrastructure rather than subsidizing fossil fuels.",
    topic: "Environmental Policy & Fiscal Expenditure",
    contextType: "lecture_s4",
    metronomeBPM: 115,
    chunks: [
      {
        chunkIndex: 0,
        text: "Governments should allocate substantial funding",
        isTerminal: false,
        suggestedPauseSeconds: 0.35,
        contentWords: ["Governments", "allocate", "substantial", "funding"],
        functionWords: ["should"],
      },
      {
        chunkIndex: 1,
        text: "to renewable energy infrastructure",
        isTerminal: false,
        suggestedPauseSeconds: 0.4,
        contentWords: ["renewable", "energy", "infrastructure"],
        functionWords: ["to"],
      },
      {
        chunkIndex: 2,
        text: "rather than subsidizing fossil fuels.",
        isTerminal: true,
        suggestedPauseSeconds: 0.8,
        contentWords: ["rather", "subsidizing", "fossil", "fuels"],
        functionWords: ["than"],
      },
    ],
  },
];
