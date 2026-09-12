export interface AcademicDictionaryItem {
  word: string;
  phonetic: string;
  vietnameseMeaning: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms?: string[];
    }[];
  }[];
}

export const ACADEMIC_DICTIONARY_SEED: Record<string, AcademicDictionaryItem> = {
  mitigate: {
    word: "mitigate",
    phonetic: "/ˈmɪt.ɪ.ɡeɪt/",
    vietnameseMeaning: "Làm dịu bớt, giảm nhẹ mức độ nghiêm trọng hoặc tác hại",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Make something less severe, serious, or painful.",
            example: "Targeted policies help mitigate the adverse effects of urban congestion.",
            synonyms: ["alleviate", "reduce", "diminish", "lessen"],
          },
        ],
      },
    ],
  },
  detrimental: {
    word: "detrimental",
    phonetic: "/ˌdet.rɪˈmen.təl/",
    vietnameseMeaning: "Gây tổn hại, có hại nghiêm trọng",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Tending to cause harm or damage.",
            example: "Unregulated industrial discharge has a detrimental impact on local ecosystems.",
            synonyms: ["harmful", "damaging", "adverse", "injurious"],
          },
        ],
      },
    ],
  },
  comprise: {
    word: "comprise",
    phonetic: "/kəmˈpraɪz/",
    vietnameseMeaning: "Bao gồm, cấu thành nên, chiếm tỷ lệ",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Consist of; be made up of.",
            example: "Elderly demographics comprise approximately thirty percent of the national population.",
            synonyms: ["consist of", "constitute", "encompass", "make up"],
          },
        ],
      },
    ],
  },
  allocate: {
    word: "allocate",
    phonetic: "/ˈæl.ə.keɪt/",
    vietnameseMeaning: "Phân bổ, chỉ định tài nguyên hoặc ngân sách",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Distribute (resources or duties) for a particular purpose.",
            example: "The government allocated substantial fiscal resources to clean energy development.",
            synonyms: ["assign", "allot", "distribute", "designate"],
          },
        ],
      },
    ],
  },
  empirical: {
    word: "empirical",
    phonetic: "/ɪmˈpɪr.ɪ.kəl/",
    vietnameseMeaning: "Thực nghiệm, dựa trên quan sát và bằng chứng thực tế",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic.",
            example: "Researchers provided robust empirical evidence to support the hypothesis.",
            synonyms: ["observational", "verifiable", "practical", "experimental"],
          },
        ],
      },
    ],
  },
  ubiquitous: {
    word: "ubiquitous",
    phonetic: "/juːˈbɪk.wə.t̬əs/",
    vietnameseMeaning: "Phổ biến khắp nơi, có mặt ở mọi nơi",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Present, appearing, or found everywhere.",
            example: "Smartphones have become ubiquitous across all socio-economic strata.",
            synonyms: ["omnipresent", "pervasive", "widespread", "prevalent"],
          },
        ],
      },
    ],
  },
  sustainable: {
    word: "sustainable",
    phonetic: "/səˈsteɪ.nə.bəl/",
    vietnameseMeaning: "Bền vững, có thể duy trì lâu dài mà không gây kiệt quệ tài nguyên",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Able to be maintained at a certain rate or level without exhausting natural resources.",
            example: "Sustainable forestry initiatives preserve ecological biodiversity.",
            synonyms: ["viable", "renewable", "maintainable", "eco-friendly"],
          },
        ],
      },
    ],
  },
  predominant: {
    word: "predominant",
    phonetic: "/prɪˈdɑː.mə.nənt/",
    vietnameseMeaning: "Chiếm ưu thế, chủ đạo, vượt trội hơn các đối tượng khác",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Present as the strongest or main element.",
            example: "Fossil fuels remained the predominant source of electrical generation.",
            synonyms: ["dominant", "primary", "foremost", "prevailing"],
          },
        ],
      },
    ],
  },
  prevalent: {
    word: "prevalent",
    phonetic: "/ˈprev.əl.ənt/",
    vietnameseMeaning: "Thịnh hành, phổ biến rộng rãi trong một cộng đồng hoặc thời điểm",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Widespread in a particular area or at a particular time.",
            example: "Sedentary lifestyles are increasingly prevalent among urban office workers.",
            synonyms: ["widespread", "frequent", "common", "pervasive"],
          },
        ],
      },
    ],
  },
  scrutinize: {
    word: "scrutinize",
    phonetic: "/ˈskruː.t̬ən.aɪz/",
    vietnameseMeaning: "Xem xét, kiểm tra kỹ lưỡng đến từng chi tiết",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Examine or inspect closely and thoroughly.",
            example: "Independent auditors scrutinized the financial reports for irregular transactions.",
            synonyms: ["examine", "inspect", "investigate", "dissect"],
          },
        ],
      },
    ],
  },
  substantiate: {
    word: "substantiate",
    phonetic: "/səbˈstæn.ʃi.eɪt/",
    vietnameseMeaning: "Chứng minh, đưa ra bằng chứng xác thực cho một nhận định",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Provide evidence to support or prove the truth of.",
            example: "Statistical findings substantiate the claim that early education improves cognitive skills.",
            synonyms: ["prove", "corroborate", "validate", "authenticate"],
          },
        ],
      },
    ],
  },
  profound: {
    word: "profound",
    phonetic: "/prəˈfaʊnd/",
    vietnameseMeaning: "Sâu sắc, to lớn, có tầm ảnh hưởng sâu rộng",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Very great or intense; having or showing great knowledge or insight.",
            example: "The internet revolution has exerted a profound influence on communication.",
            synonyms: ["deep", "immense", "significant", "far-reaching"],
          },
        ],
      },
    ],
  },
  inevitable: {
    word: "inevitable",
    phonetic: "/ɪnˈev.ə.t̬ə.bəl/",
    vietnameseMeaning: "Không thể tránh khỏi, chắc chắn sẽ xảy ra",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Certain to happen; unavoidable.",
            example: "Technological disruptions are an inevitable facet of economic modernization.",
            synonyms: ["unavoidable", "inescapable", "certain", "fated"],
          },
        ],
      },
    ],
  },
  inherent: {
    word: "inherent",
    phonetic: "/ɪnˈhɪr.ənt/",
    vietnameseMeaning: "Vốn có, cố hữu, không thể tách rời khỏi bản chất sự vật",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Existing in something as a permanent, essential, or characteristic attribute.",
            example: "There are inherent risks associated with high-frequency financial trading.",
            synonyms: ["intrinsic", "innate", "ingrained", "deep-rooted"],
          },
        ],
      },
    ],
  },
  paradigm: {
    word: "paradigm",
    phonetic: "/ˈper.ə.daɪm/",
    vietnameseMeaning: "Mô hình, khuôn mẫu chuẩn mực hoặc hệ tư tưởng",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "A typical example or pattern of something; a model.",
            example: "The shift from hardware to cloud services represents a fundamental business paradigm.",
            synonyms: ["model", "framework", "pattern", "prototype"],
          },
        ],
      },
    ],
  },
  catalyst: {
    word: "catalyst",
    phonetic: "/ˈkæt̬.əl.ɪst/",
    vietnameseMeaning: "Chất xúc tác, tác nhân thúc đẩy sự thay đổi diễn ra nhanh hơn",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "A person or thing that precipitates an event or accelerates change.",
            example: "Tertiary education acts as an indispensable catalyst for socioeconomic mobility.",
            synonyms: ["stimulus", "impetus", "spark", "generator"],
          },
        ],
      },
    ],
  },
  exacerbate: {
    word: "exacerbate",
    phonetic: "/ɪɡˈzæs.ɚ.beɪt/",
    vietnameseMeaning: "Làm trầm trọng thêm, khiến vấn đề trở nên tồi tệ hơn",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Make (a problem, bad situation, or negative feeling) worse.",
            example: "Rapid urban migration exacerbates the shortage of affordable public housing.",
            synonyms: ["aggravate", "worsen", "inflame", "compound"],
          },
        ],
      },
    ],
  },
  escalate: {
    word: "escalate",
    phonetic: "/ˈes.kə.leɪt/",
    vietnameseMeaning: "Leo thang, tăng nhanh về mức độ hoặc quy mô",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Increase rapidly; become or make more intense or serious.",
            example: "Carbon emission levels escalated sharply throughout the nineteenth century.",
            synonyms: ["soar", "surge", "intensify", "skyrocket"],
          },
        ],
      },
    ],
  },
  fluctuate: {
    word: "fluctuate",
    phonetic: "/ˈflʌk.tʃu.eɪt/",
    vietnameseMeaning: "Dao động, biến động liên tục lên xuống",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Rise and fall irregularly in number or amount.",
            example: "Oil prices fluctuated wildly between twenty and fifty dollars per barrel.",
            synonyms: ["oscillate", "vary", "shift", "waver"],
          },
        ],
      },
    ],
  },
  stagnate: {
    word: "stagnate",
    phonetic: "/ˈstæɡ.neɪt/",
    vietnameseMeaning: "Đình trệ, không phát triển hoặc không có chuyển động tích cực",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Cease developing, growing, or progressing.",
            example: "Wage growth stagnated despite substantial increases in national productivity.",
            synonyms: ["languish", "stall", "stand still", "idle"],
          },
        ],
      },
    ],
  },
  disparity: {
    word: "disparity",
    phonetic: "/dɪˈsper.ə.t̬i/",
    vietnameseMeaning: "Sự chênh lệch, sự cách biệt lớn (về thu nhập, cơ hội, quyền lợi)",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "A great difference or inequality.",
            example: "The growing income disparity between urban and rural dwellers demands policy intervention.",
            synonyms: ["inequality", "imbalance", "discrepancy", "gap"],
          },
        ],
      },
    ],
  },
  demographic: {
    word: "demographic",
    phonetic: "/ˌdem.əˈɡræf.ɪk/",
    vietnameseMeaning: "Nhân khẩu học; nhóm dân số có đặc điểm chung",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "A particular sector of a population relating to age, income, or education.",
            example: "Young demographics demonstrate higher propensity for digital banking adoption.",
            synonyms: ["population sector", "stratum", "cohort"],
          },
        ],
      },
    ],
  },
  infrastructure: {
    word: "infrastructure",
    phonetic: "/ˈɪn.frəˌstrʌk.tʃɚ/",
    vietnameseMeaning: "Cơ sở hạ tầng (cầu đường, điện nước, giao thông viễn thông)",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The basic physical and organizational structures and facilities needed for society.",
            example: "Massive investment in public transit infrastructure alleviates urban congestion.",
            synonyms: ["framework", "foundations", "facilities"],
          },
        ],
      },
    ],
  },
  trajectory: {
    word: "trajectory",
    phonetic: "/trəˈdʒek.tɚ.i/",
    vietnameseMeaning: "Quỹ đạo phát triển, hướng đi của xu hướng số liệu hoặc sự nghiệp",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The path followed by a trend, development, or flying object.",
            example: "The trajectory of renewable energy adoption points toward complete grid decarbonization.",
            synonyms: ["path", "course", "route", "trend"],
          },
        ],
      },
    ],
  },
  underpin: {
    word: "underpin",
    phonetic: "/ˌʌn.dɚˈpɪn/",
    vietnameseMeaning: "Làm nền tảng, củng cố và nâng đỡ từ gốc rễ",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Support, justify, or form the basis for.",
            example: "Sound pedagogical theories underpin effective educational methodologies.",
            synonyms: ["support", "bolster", "reinforce", "buttress"],
          },
        ],
      },
    ],
  },
  proliferate: {
    word: "proliferate",
    phonetic: "/prəˈlɪf.ə.reɪt/",
    vietnameseMeaning: "Sinh sôi nảy nở nhanh chóng, tăng sinh số lượng vượt trội",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Increase rapidly in numbers; multiply.",
            example: "Online learning platforms have proliferated exponentially over the past five years.",
            synonyms: ["multiply", "mushroom", "burgeon", "escalate"],
          },
        ],
      },
    ],
  },
  pragmatic: {
    word: "pragmatic",
    phonetic: "/præɡˈmæt̬.ɪk/",
    vietnameseMeaning: "Thực tế, thực dụng, dựa trên tính khả thi thực tế thay vì lý thuyết suông",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.",
            example: "Policymakers must adopt pragmatic approaches to resolve traffic gridlock.",
            synonyms: ["practical", "realistic", "sensible", "down-to-earth"],
          },
        ],
      },
    ],
  },
  incentivize: {
    word: "incentivize",
    phonetic: "/ɪnˈsen.t̬ə.vaɪz/",
    vietnameseMeaning: "Khuyến khích, tạo động lực thúc đẩy bằng chính sách hoặc phần thưởng",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Motivate or encourage (someone) to do something; provide with an incentive.",
            example: "Tax deductions effectively incentivize enterprises to invest in green innovation.",
            synonyms: ["encourage", "motivate", "stimulate", "reward"],
          },
        ],
      },
    ],
  },
  nominalization: {
    word: "nominalization",
    phonetic: "/ˌnɑː.mə.nəl.əˈzeɪ.ʃən/",
    vietnameseMeaning: "Danh từ hóa (Kỹ thuật biến động từ/tính từ thành danh từ để tăng tính học thuật Band 8.0+)",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The grammatical process of forming a noun from a verb or adjective to elevate academic formality.",
            example: "Using nominalization ('the implementation of policies' instead of 'when we implement') elevates Writing Task 2 scores.",
            synonyms: ["noun formation", "academic phrasing"],
          },
        ],
      },
    ],
  },
  hedging: {
    word: "hedging",
    phonetic: "/ˈhedʒ.ɪŋ/",
    vietnameseMeaning: "Rào đón học thuật (Kỹ thuật dùng may/might/tends to để tránh khẳng định tuyệt đối cực đoan)",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The use of cautious language to express caution or avoid overgeneralization in academic writing.",
            example: "Effective academic hedging prevents essays from sounding dogmatic or exaggerated.",
            synonyms: ["cautious language", "academic qualification", "mitigation"],
          },
        ],
      },
    ],
  },
  paraphrase: {
    word: "paraphrase",
    phonetic: "/ˈper.ə.freɪz/",
    vietnameseMeaning: "Diễn đạt lại câu/ý bằng từ đồng nghĩa hoặc cấu trúc khác mà không đổi nghĩa",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Express the meaning of (the writer or speaker or something written or spoken) using different words.",
            example: "Candidates should paraphrase the prompt in the introductory paragraph.",
            synonyms: ["rephrase", "reword", "restate", "express differently"],
          },
        ],
      },
    ],
  },
  collocation: {
    word: "collocation",
    phonetic: "/ˌkɑː.ləˈkeɪ.ʃən/",
    vietnameseMeaning: "Cụm từ cố định tự nhiên hay đi liền với nhau trong tiếng Anh bản xứ",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The habitual juxtaposition of a particular word with another word or words with a frequency greater than chance.",
            example: "'Heavy rain' and 'make an effort' are natural English collocations.",
            synonyms: ["idiomatic combination", "word partnership"],
          },
        ],
      },
    ],
  },
};
