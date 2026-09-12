export type POSCategory =
  | "noun"
  | "plural_noun"
  | "verb"
  | "adjective"
  | "number"
  | "noun_phrase";

export interface CompletionQuestion {
  id: string; // e.g. 'q_sc_1' or 'q_dl_1'
  questionNumber: number;
  label: string; // e.g. 'Blank 1' or 'Pin 1'
  expectedAnswers: string[]; // List of valid alternative spellings/forms
  maxWords: number; // e.g. 1 or 2
  posCategory: POSCategory;
  posHintVi: string;
  singularPluralTrap?: boolean;
  singularPluralNote?: string;
  explanationDetail: string;
  evidenceQuote: string;
  evidenceParagraphId: string;
  // For diagram labelling pins (coordinates in %)
  pinCoordinates?: {
    x: number; // percentage from left
    y: number; // percentage from top
  };
}

export interface CompletionParagraph {
  id: string; // 'A', 'B', 'C', 'D'
  content: string;
}

export interface SummaryCompletionTask {
  type: "summary_completion";
  id: string;
  title: string;
  topic: string;
  wordLimitInstruction: string;
  maxWordsAllowed: number;
  summaryTitle: string;
  summaryTemplate: string; // Text containing [1], [2], [3], etc.
  paragraphs: CompletionParagraph[];
  questions: CompletionQuestion[];
}

export interface DiagramLabellingTask {
  type: "diagram_labelling";
  id: string;
  title: string;
  topic: string;
  wordLimitInstruction: string;
  maxWordsAllowed: number;
  diagramTitle: string;
  diagramSubtitle: string;
  paragraphs: CompletionParagraph[];
  questions: CompletionQuestion[];
}

export const MOCK_SUMMARY_TASK: SummaryCompletionTask = {
  type: "summary_completion",
  id: "task_summary_photovoltaics",
  title: "Advanced Photovoltaic Systems and Solar Cell Engineering",
  topic: "Renewable Energy & Materials Science",
  wordLimitInstruction: "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
  maxWordsAllowed: 2,
  summaryTitle: "Summary: The Manufacturing and Operating Principles of Silicon Cells",
  summaryTemplate:
    "Modern photovoltaic modules convert solar photons into electricity utilizing high-purity [1]. During the manufacturing process, molten silicon is sliced into micro-thin [2] which receive an anti-reflective coating to maximize photon capture. When incident sunlight penetrates the cell matrix, it excites subatomic particles within the [3], thereby generating a continuous direct current. However, atmospheric [4] can accumulate on the protective glass exterior, significantly degrading overall operational efficiency. Consequently, engineers are deploying automated [5] to preserve optimal energy output throughout long-term field deployment.",
  paragraphs: [
    {
      id: "A",
      content:
        "The fundamental mechanism governing solar energy conversion resides in the photoelectric effect occurring within semiconductor crystals. Contemporary commercial solar arrays rely overwhelmingly on metallurgical-grade silicon that undergoes rigorous chemical refinement to produce crystalline ingots of exceptional purity. These solid monolithic ingots represent the foundational raw material for virtually all first-generation photovoltaic modules operating worldwide.",
    },
    {
      id: "B",
      content:
        "Once refined, these cylindrical ingots are precisely sliced using diamond wire saws into micro-thin silicon wafers, each measuring less than 180 micrometers in thickness. These fragile substrates undergo chemical texturization and receive a specialized anti-reflective dielectric coating, typically composed of silicon nitride, which prevents incident solar photons from bouncing off the metallic surface without exciting electrical carriers.",
    },
    {
      id: "C",
      content:
        "When incoming solar radiation strikes the engineered semiconductor matrix, photons transfer their kinetic energy to electrons located within the valence band. This energetic excitation forces free electrons to traverse the internal p-n junction toward conductive front metal contacts, creating a continuous stream of direct current (DC) electricity that can be converted into alternating current via inverters.",
    },
    {
      id: "D",
      content:
        "Despite their solid-state durability, the field performance of photovoltaic installations is vulnerable to environmental degradation. In arid and industrial regions, the atmospheric dust accumulation on the exterior protective glass layer creates an opaque physical barrier that attenuates light transmission. Field studies demonstrate that severe soiling can diminish seasonal electrical yield by up to 35 percent. To counter this, utility-scale solar farms increasingly employ specialized robotic wipers that systematically cleanse panels without consuming scarce freshwater supplies.",
    },
  ],
  questions: [
    {
      id: "q_sc_1",
      questionNumber: 1,
      label: "Ô trống 1",
      expectedAnswers: ["semiconductor crystals", "semiconductor crystal"],
      maxWords: 2,
      posCategory: "plural_noun",
      posHintVi: "Danh từ (Cụm danh từ chỉ vật liệu/cấu trúc lượng tử)",
      singularPluralTrap: true,
      singularPluralNote: "Bài đọc dùng danh từ số nhiều 'semiconductor crystals'.",
      explanationDetail:
        "Đoạn A khẳng định: 'The fundamental mechanism governing solar energy conversion resides in the photoelectric effect occurring within semiconductor crystals.' Đáp án đúng là 'semiconductor crystals'.",
      evidenceQuote:
        "...occurring within semiconductor crystals. Contemporary commercial solar arrays rely overwhelmingly on metallurgical-grade silicon...",
      evidenceParagraphId: "A",
    },
    {
      id: "q_sc_2",
      questionNumber: 2,
      label: "Ô trống 2",
      expectedAnswers: ["silicon wafers", "wafers"],
      maxWords: 2,
      posCategory: "plural_noun",
      posHintVi: "Danh từ số nhiều (sau tính từ micro-thin)",
      singularPluralTrap: true,
      singularPluralNote: "Cần dạng số nhiều 'silicon wafers' (hoặc 'wafers') vì sau đó dùng đại từ 'which receive'.",
      explanationDetail:
        "Đoạn B nêu rõ: '...precisely sliced using diamond wire saws into micro-thin silicon wafers, each measuring less than 180 micrometers...'. Đáp án chuẩn là 'silicon wafers' hoặc 'wafers'.",
      evidenceQuote:
        "...sliced using diamond wire saws into micro-thin silicon wafers, each measuring less than 180 micrometers in thickness.",
      evidenceParagraphId: "B",
    },
    {
      id: "q_sc_3",
      questionNumber: 3,
      label: "Ô trống 3",
      expectedAnswers: ["valence band"],
      maxWords: 2,
      posCategory: "noun",
      posHintVi: "Danh từ chỉ vị trí hạt electron (sau giới từ within the)",
      explanationDetail:
        "Đoạn C giải thích: '...photons transfer their kinetic energy to electrons located within the valence band.' Đáp án đúng là 'valence band'.",
      evidenceQuote:
        "...photons transfer their kinetic energy to electrons located within the valence band. This energetic excitation forces free electrons...",
      evidenceParagraphId: "C",
    },
    {
      id: "q_sc_4",
      questionNumber: 4,
      label: "Ô trống 4",
      expectedAnswers: ["dust", "dust accumulation"],
      maxWords: 2,
      posCategory: "noun",
      posHintVi: "Danh từ không đếm được (sau tính từ atmospheric)",
      explanationDetail:
        "Đoạn D chỉ ra: 'In arid and industrial regions, the atmospheric dust accumulation on the exterior protective glass layer creates an opaque physical barrier...'. Đáp án đúng là 'dust' hoặc 'dust accumulation'.",
      evidenceQuote:
        "...the atmospheric dust accumulation on the exterior protective glass layer creates an opaque physical barrier that attenuates light transmission.",
      evidenceParagraphId: "D",
    },
    {
      id: "q_sc_5",
      questionNumber: 5,
      label: "Ô trống 5",
      expectedAnswers: ["robotic wipers", "wipers"],
      maxWords: 2,
      posCategory: "plural_noun",
      posHintVi: "Danh từ số nhiều chỉ thiết bị tự động (sau automated)",
      singularPluralTrap: true,
      singularPluralNote: "Cần số nhiều 'robotic wipers' / 'wipers'. Nếu điền 'robotic wiper' số ít là vi phạm ngữ pháp.",
      explanationDetail:
        "Đoạn D kết luận: '...utility-scale solar farms increasingly employ specialized robotic wipers that systematically cleanse panels...'. Đáp án là 'robotic wipers' hoặc 'wipers'.",
      evidenceQuote:
        "...increasingly employ specialized robotic wipers that systematically cleanse panels without consuming scarce freshwater supplies.",
      evidenceParagraphId: "D",
    },
  ],
};

export const MOCK_DIAGRAM_TASK: DiagramLabellingTask = {
  type: "diagram_labelling",
  id: "task_diagram_filtration",
  title: "Hydrodynamic Geothermal Wellhead & Multi-Stage Filtration Mechanism",
  topic: "Environmental Engineering & Hydrology",
  wordLimitInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
  maxWordsAllowed: 1,
  diagramTitle: "Figure 1: Cross-Section of the Multi-Stage Hydro-Filtration Wellhead",
  diagramSubtitle: "Click on each numbered Pin on the diagram to input the corresponding component name.",
  paragraphs: [
    {
      id: "A",
      content:
        "In deep geothermal extraction facilities, subterranean brine surfaces under immense pressure and extreme temperatures, carrying suspended minerals and volatile gases. Before this superheated fluid enters heat exchangers, it must pass through an automated four-stage purification wellhead. At the initial intake conduit, the fluid encounters a high-velocity centrifuge that accelerates the mixture in a spiral vortex, separating heavy rock fragments from the pressurized liquid.",
    },
    {
      id: "B",
      content:
        "Following particulate separation, the liquid is directed into an expansive settlement chamber where gravitational settling allows fine silt to precipitate to the base reservoir. Positioned immediately above this reservoir is a permeable ceramic membrane engineered with microscopic pores that captures dissolved silica polymers while allowing purified saline flow to proceed upward.",
    },
    {
      id: "C",
      content:
        "The ascending fluid subsequently enters a specialized condenser coil where thermal transfer lowers the steam temperature, converting volatile vapors back into recyclable condensate. Finally, the pressurized clean stream drives a high-efficiency turbine that generates auxiliary electrical power for the extraction compound before the residual mineral-depleted brine is reinjected into the subterranean aquifer.",
    },
  ],
  questions: [
    {
      id: "q_dl_1",
      questionNumber: 1,
      label: "Pin 1: Bộ phận phân tách xoáy ban đầu",
      expectedAnswers: ["centrifuge"],
      maxWords: 1,
      posCategory: "noun",
      posHintVi: "Danh từ số ít (sau a high-velocity...)",
      explanationDetail:
        "Đoạn A nêu: '...the fluid encounters a high-velocity centrifuge that accelerates the mixture in a spiral vortex...'. Đáp án chuẩn ONE WORD là 'centrifuge'.",
      evidenceQuote:
        "...the fluid encounters a high-velocity centrifuge that accelerates the mixture in a spiral vortex, separating heavy rock fragments...",
      evidenceParagraphId: "A",
      pinCoordinates: { x: 22, y: 35 },
    },
    {
      id: "q_dl_2",
      questionNumber: 2,
      label: "Pin 2: Buồng lắng cặn trọng lực",
      expectedAnswers: ["chamber"],
      maxWords: 1,
      posCategory: "noun",
      posHintVi: "Danh từ số ít (sau an expansive settlement...)",
      explanationDetail:
        "Đoạn B mô tả: '...directed into an expansive settlement chamber where gravitational settling allows fine silt...'. Đáp án chuẩn là 'chamber'.",
      evidenceQuote:
        "Following particulate separation, the liquid is directed into an expansive settlement chamber where gravitational settling allows...",
      evidenceParagraphId: "B",
      pinCoordinates: { x: 48, y: 55 },
    },
    {
      id: "q_dl_3",
      questionNumber: 3,
      label: "Pin 3: Cuộn dây ngưng tụ hơi",
      expectedAnswers: ["condenser", "coil"],
      maxWords: 1,
      posCategory: "noun",
      posHintVi: "Danh từ số ít",
      explanationDetail:
        "Đoạn C chỉ rõ: '...enters a specialized condenser coil where thermal transfer lowers the steam temperature...'. Đáp án chuẩn là 'condenser' hoặc 'coil'.",
      evidenceQuote:
        "The ascending fluid subsequently enters a specialized condenser coil where thermal transfer lowers the steam temperature...",
      evidenceParagraphId: "C",
      pinCoordinates: { x: 74, y: 30 },
    },
    {
      id: "q_dl_4",
      questionNumber: 4,
      label: "Pin 4: Tuabin phát điện phụ trợ",
      expectedAnswers: ["turbine"],
      maxWords: 1,
      posCategory: "noun",
      posHintVi: "Danh từ số ít (sau a high-efficiency...)",
      explanationDetail:
        "Đoạn C kết luận: '...drives a high-efficiency turbine that generates auxiliary electrical power...'. Đáp án chuẩn là 'turbine'.",
      evidenceQuote:
        "Finally, the pressurized clean stream drives a high-efficiency turbine that generates auxiliary electrical power for the extraction compound...",
      evidenceParagraphId: "C",
      pinCoordinates: { x: 86, y: 72 },
    },
  ],
};
