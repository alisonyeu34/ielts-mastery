export interface ParaphraseMapItem {
  questionWord: string;
  passageWord: string;
  mechanismVi: string;
}

export interface ThreePassQuestion {
  id: string;
  questionNumber: number;
  type: "tfng" | "multiple_choice" | "completion";
  questionText: string;
  options?: Array<{ id: string; text: string }>;
  correctAnswer: string; // "TRUE" | "FALSE" | "NOT GIVEN" or option "A" | "B" | "C" | "D" or word
  evidenceParagraph: string; // e.g. "Paragraph B"
  evidenceSentence: string;
  paraphraseMap: ParaphraseMapItem[];
  explanation: string;
  commonTrap: string;
}

export interface ExtractableVocabItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaningVi: string;
  contextSentence: string;
}

export interface ThreePassTestData {
  id: string;
  title: string;
  topic: string;
  wordCount: number;
  pass1TimeLimitSeconds: number; // 720 seconds = 12 minutes
  paragraphs: Array<{
    id: string;
    label: string;
    text: string;
  }>;
  questions: ThreePassQuestion[];
  extractableVocab: ExtractableVocabItem[];
}

export const MOCK_THREE_PASS_TEST: ThreePassTestData = {
  id: "three_pass_urban_rewilding",
  title: "Urban Rewilding and Biodiversity Corridors in Modern Metropolises",
  topic: "Urban Ecology & Conservation Biology",
  wordCount: 820,
  pass1TimeLimitSeconds: 720, // 12 mins
  paragraphs: [
    {
      id: "para_a",
      label: "Paragraph A",
      text: "As global urbanization accelerates, metropolitan landscapes have traditionally been characterized by severe ecological fragmentation. Concrete infrastructure, road networks, and manicured lawns create vast biological deserts, severing genetic gene flow between isolated wildlife populations. In response to this crisis, urban planners and ecologists have pioneered the concept of 'urban rewilding'—a management philosophy that rejects conventional manicured landscaping in favor of restoring spontaneous, self-sustaining natural processes within city boundaries.",
    },
    {
      id: "para_b",
      label: "Paragraph B",
      text: "Central to the rewilding paradigm is the establishment of continuous biodiversity corridors. Unlike isolated city parks, which function merely as fragmented ecological islands, corridors serve as functional conduits connecting peri-urban wilderness to urban hearts. In Singapore, the 'Park Connector Network' integrates elevated green bridges, canal restorations, and native canopy corridors, enabling arboreal mammals such as the common palm civet and diverse avian species to traverse the metropolis without encountering vehicular traffic.",
    },
    {
      id: "para_c",
      label: "Paragraph C",
      text: "Empirical field data demonstrates that these green arteries provide profound microclimatic benefits alongside ecological connectivity. Densely vegetated corridors reduce the urban heat island effect by up to 3.5 degrees Celsius through evapotranspiration and solar shading. Furthermore, permeable natural soil matrices absorb intense tropical storm runoff, significantly curtailing flash flooding risks that plague conventional concrete drainage basins. Municipal authorities in Frankfurt report that their green belt system saves millions of euros annually in stormwater management infrastructure.",
    },
    {
      id: "para_d",
      label: "Paragraph D",
      text: "Despite these documented successes, urban rewilding frequently encounters intense socio-cultural resistance from metropolitan residents. Public perception studies reveal that many citizens associate unkempt native meadows with municipal neglect, rodent infestation, and heightened tick-borne disease risks. Landscape architects argue that public acceptance hinges on 'cues to care'—deliberate aesthetic interventions such as mown path borders, informational signage, and perimeter wooden fencing that signal intentional ecological design rather than abandonment.",
    },
    {
      id: "para_e",
      label: "Paragraph E",
      text: "Ultimately, the long-term viability of urban rewilding depends on multi-scale policy integration. Micro-scale residential initiatives, such as private pollinator gardens and green roofs, must synchronize with macro-scale municipal zoning mandates. By transforming urban centers from ecological barriers into permeable living matrices, metropolises can reconcile expanding anthropogenic density with the urgent imperative of planetary biodiversity preservation.",
    },
  ],
  questions: [
    // Questions 1 - 4: True / False / Not Given
    {
      id: "tp_q1",
      questionNumber: 1,
      type: "tfng",
      questionText:
        "Conventional urban parks are just as effective as continuous corridors in maintaining animal genetic diversity.",
      correctAnswer: "FALSE",
      evidenceParagraph: "Paragraph B",
      evidenceSentence:
        "Unlike isolated city parks, which function merely as fragmented ecological islands, corridors serve as functional conduits connecting peri-urban wilderness to urban hearts.",
      paraphraseMap: [
        {
          questionWord: "just as effective",
          passageWord: "merely as fragmented ecological islands",
          mechanismVi: "Mâu thuẫn đối lập hoàn toàn (Contradiction)",
        },
      ],
      explanation:
        "Đoạn B khẳng định công viên truyền thống chỉ là các 'ốc đảo sinh thái bị phân mảnh' (fragmented ecological islands), trong khi các hành lang liên tục mới là cầu nối thực sự giúp duy trì liên kết gen. Do đó phát biểu trên là FALSE.",
      commonTrap:
        "Bẫy so sánh ngang bằng (just as effective): Thí sinh đọc lướt thấy cả hai đối tượng đều được nhắc đến nên dễ nhầm sang NOT GIVEN.",
    },
    {
      id: "tp_q2",
      questionNumber: 2,
      type: "tfng",
      questionText:
        "Singapore's Park Connector Network was the first urban rewilding initiative implemented in Southeast Asia.",
      correctAnswer: "NOT GIVEN",
      evidenceParagraph: "Paragraph B",
      evidenceSentence:
        "In Singapore, the 'Park Connector Network' integrates elevated green bridges, canal restorations, and native canopy corridors...",
      paraphraseMap: [],
      explanation:
        "Đoạn B chỉ giới thiệu Singapore có hệ thống Park Connector Network, nhưng hoàn toàn KHÔNG có thông tin nói rằng đây là dự án 'đầu tiên' (the first initiative) tại Đông Nam Á.",
      commonTrap:
        "Bẫy thứ tự thời gian cực trị ('the first'): Đề bài đưa thông tin có thật về Singapore nhưng gài thêm từ chỉ tính tiên phong không có trong bài đọc.",
    },
    {
      id: "tp_q3",
      questionNumber: 3,
      type: "tfng",
      questionText:
        "Vegetated corridors help mitigate extreme city temperatures through natural moisture evaporation.",
      correctAnswer: "TRUE",
      evidenceParagraph: "Paragraph C",
      evidenceSentence:
        "Densely vegetated corridors reduce the urban heat island effect by up to 3.5 degrees Celsius through evapotranspiration and solar shading.",
      paraphraseMap: [
        {
          questionWord: "mitigate extreme city temperatures",
          passageWord: "reduce the urban heat island effect",
          mechanismVi: "Paraphrase đồng nghĩa (Synonymy)",
        },
        {
          questionWord: "natural moisture evaporation",
          passageWord: "evapotranspiration",
          mechanismVi: "Giải thích thuật ngữ khoa học",
        },
      ],
      explanation:
        "Đoạn C nêu rõ các hành lang xanh làm giảm hiệu ứng đảo nhiệt đô thị tới 3.5 độ C nhờ quá trình thoát hơi nước của thực vật (evapotranspiration) và che bóng râm. Trùng khớp hoàn toàn với câu hỏi -> TRUE.",
      commonTrap: "none",
    },
    {
      id: "tp_q4",
      questionNumber: 4,
      type: "tfng",
      questionText:
        "All city dwellers immediately welcomed the replacement of manicured lawns with wild meadows.",
      correctAnswer: "FALSE",
      evidenceParagraph: "Paragraph D",
      evidenceSentence:
        "Despite these documented successes, urban rewilding frequently encounters intense socio-cultural resistance from metropolitan residents.",
      paraphraseMap: [
        {
          questionWord: "All city dwellers immediately welcomed",
          passageWord: "frequently encounters intense socio-cultural resistance",
          mechanismVi: "Mâu thuẫn 180 độ đối kháng",
        },
      ],
      explanation:
        "Đoạn D khẳng định việc tái hoang dã đô thị thường xuyên gặp phải sự phản đối dữ dội (intense socio-cultural resistance) từ cư dân đô thị vì họ coi cỏ dại là sự bỏ bê và nguy cơ dịch bệnh. Trái ngược với 'all welcomed' -> FALSE.",
      commonTrap: "Bẫy lượng từ tuyệt đối (All / Immediately).",
    },

    // Questions 5 - 7: Multiple Choice
    {
      id: "tp_q5",
      questionNumber: 5,
      type: "multiple_choice",
      questionText:
        "According to Paragraph C, how does Frankfurt's green belt save municipal funds?",
      options: [
        { id: "A", text: "By producing commercial timber for municipal construction." },
        { id: "B", text: "By diminishing the financial burden of managing storm runoff water." },
        { id: "C", text: "By charging entrance fees to international eco-tourists." },
        { id: "D", text: "By replacing the entire underground subway network." },
      ],
      correctAnswer: "B",
      evidenceParagraph: "Paragraph C",
      evidenceSentence:
        "Municipal authorities in Frankfurt report that their green belt system saves millions of euros annually in stormwater management infrastructure.",
      paraphraseMap: [
        {
          questionWord: "diminishing financial burden of storm runoff",
          passageWord: "saves millions in stormwater management",
          mechanismVi: "Diễn đạt lại ý nghĩa",
        },
      ],
      explanation:
        "Đoạn C nêu hệ thống vành đai xanh của Frankfurt tiết kiệm hàng triệu euro mỗi năm cho chi phí cơ sở hạ tầng quản lý nước mưa (stormwater management) -> Phương án B chính xác.",
      commonTrap: "none",
    },
    {
      id: "tp_q6",
      questionNumber: 6,
      type: "multiple_choice",
      questionText:
        "What is the primary objective of 'cues to care' mentioned in Paragraph D?",
      options: [
        { id: "A", text: "To eliminate all wild animal species from urban zones." },
        { id: "B", text: "To reassure residents that wild areas are intentionally designed rather than neglected." },
        { id: "C", text: "To increase the commercial real estate value of surrounding apartments." },
        { id: "D", text: "To attract government funding for artificial pesticide application." },
      ],
      correctAnswer: "B",
      evidenceParagraph: "Paragraph D",
      evidenceSentence:
        "Landscape architects argue that public acceptance hinges on 'cues to care'—deliberate aesthetic interventions... that signal intentional ecological design rather than abandonment.",
      paraphraseMap: [
        {
          questionWord: "intentionally designed rather than neglected",
          passageWord: "intentional ecological design rather than abandonment",
          mechanismVi: "Paraphrase cấu trúc câu đối sánh",
        },
      ],
      explanation:
        "Đoạn D giải thích các dấu hiệu chăm sóc (cues to care) giúp người dân hiểu rằng đây là thiết kế sinh thái có chủ đích chứ không phải bỏ hoang (abandonment) -> Phương án B.",
      commonTrap: "none",
    },
    {
      id: "tp_q7",
      questionNumber: 7,
      type: "multiple_choice",
      questionText:
        "Which phrase best summarizes the author's final conclusion in Paragraph E?",
      options: [
        { id: "A", text: "Cities must reduce their human population immediately to save biodiversity." },
        { id: "B", text: "Urban rewilding is an unrealistic dream that should be abandoned." },
        { id: "C", text: "Harmonizing micro-scale actions with city zoning is essential for sustainable co-existence." },
        { id: "D", text: "Private homeowners should take full financial responsibility for green corridors." },
      ],
      correctAnswer: "C",
      evidenceParagraph: "Paragraph E",
      evidenceSentence:
        "Ultimately, the long-term viability of urban rewilding depends on multi-scale policy integration. Micro-scale residential initiatives... must synchronize with macro-scale municipal zoning mandates.",
      paraphraseMap: [
        {
          questionWord: "Harmonizing micro-scale actions with city zoning",
          passageWord: "Micro-scale initiatives must synchronize with macro-scale zoning",
          mechanismVi: "Tóm tắt đại ý đoạn kết",
        },
      ],
      explanation:
        "Đoạn E khẳng định sự thành công lâu dài đòi hỏi sự đồng bộ giữa sáng kiến quy mô nhỏ của cư dân với quy hoạch vĩ mô của thành phố -> Phương án C.",
      commonTrap: "none",
    },

    // Questions 8 - 10: Summary Completion (ONE WORD ONLY)
    {
      id: "tp_q8",
      questionNumber: 8,
      type: "completion",
      questionText:
        "Traditional manicured landscaping causes severe genetic {8} among separate wildlife populations.",
      correctAnswer: "fragmentation",
      evidenceParagraph: "Paragraph A",
      evidenceSentence:
        "As global urbanization accelerates, metropolitan landscapes have traditionally been characterized by severe ecological fragmentation.",
      paraphraseMap: [
        {
          questionWord: "genetic [fragmentation]",
          passageWord: "severe ecological fragmentation",
          mechanismVi: "Điền danh từ chỉ tình trạng",
        },
      ],
      explanation:
        "Đoạn A nêu cảnh quan đô thị truyền thống gây ra 'severe ecological fragmentation' (sự phân mảnh sinh thái nghiêm trọng) chia cắt các quần thể sinh vật.",
      commonTrap: "none",
    },
    {
      id: "tp_q9",
      questionNumber: 9,
      type: "completion",
      questionText:
        "Permeable soil layers absorb stormwater, effectively reducing the risk of sudden flash {9}.",
      correctAnswer: "flooding",
      evidenceParagraph: "Paragraph C",
      evidenceSentence:
        "Furthermore, permeable natural soil matrices absorb intense tropical storm runoff, significantly curtailing flash flooding risks...",
      paraphraseMap: [
        {
          questionWord: "flash [flooding]",
          passageWord: "flash flooding risks",
          mechanismVi: "Trích xuất cụm danh từ trực tiếp",
        },
      ],
      explanation:
        "Đoạn C nêu đất tự nhiên thấm nước giúp giảm thiểu nguy cơ ngập lụt cục bộ ('flash flooding risks') -> Điền 'flooding'.",
      commonTrap: "Điền dư từ 'flash' hoặc 'floods'.",
    },
    {
      id: "tp_q10",
      questionNumber: 10,
      type: "completion",
      questionText:
        "Citizens frequently mistake wild native vegetation for municipal {10} and pest infestation.",
      correctAnswer: "neglect",
      evidenceParagraph: "Paragraph D",
      evidenceSentence:
        "Public perception studies reveal that many citizens associate unkempt native meadows with municipal neglect, rodent infestation...",
      paraphraseMap: [
        {
          questionWord: "municipal [neglect]",
          passageWord: "municipal neglect",
          mechanismVi: "Trích xuất danh từ chỉ sự bỏ bê",
        },
      ],
      explanation:
        "Đoạn D nêu người dân thường quy chụp đồng cỏ tự nhiên với sự bỏ bê của chính quyền ('municipal neglect') -> Điền 'neglect'.",
      commonTrap: "none",
    },
  ],
  extractableVocab: [
    {
      id: "v_fragmentation",
      word: "Fragmentation",
      phonetic: "/ˌfræɡmənˈteɪʃn/",
      partOfSpeech: "noun",
      meaningVi: "Sự phân mảnh, chia cắt thành từng mảnh nhỏ",
      contextSentence: "Severe ecological fragmentation severs genetic gene flow between populations.",
    },
    {
      id: "v_conduit",
      word: "Conduit",
      phonetic: "/ˈkɒndjuɪt/",
      partOfSpeech: "noun",
      meaningVi: "Ống dẫn, kênh kết nối lưu thông",
      contextSentence: "Biodiversity corridors serve as functional conduits connecting wilderness to cities.",
    },
    {
      id: "v_evapotranspiration",
      word: "Evapotranspiration",
      phonetic: "/ɪˌvæpəʊˌtrænspɪˈreɪʃn/",
      partOfSpeech: "noun",
      meaningVi: "Hiện tượng thoát hơi nước của thảm thực vật",
      contextSentence: "Corridors reduce city heat by up to 3.5°C through evapotranspiration.",
    },
    {
      id: "v_permeable",
      word: "Permeable",
      phonetic: "/ˈpɜːmiəbl/",
      partOfSpeech: "adjective",
      meaningVi: "Thấm nước, có thể thẩm thấu",
      contextSentence: "Permeable soil matrices absorb intense storm runoff and prevent floods.",
    },
    {
      id: "v_anthropogenic",
      word: "Anthropogenic",
      phonetic: "/ˌænθrəpəˈdʒenɪk/",
      partOfSpeech: "adjective",
      meaningVi: "Bắt nguồn từ con người / Do con người tạo ra",
      contextSentence: "Metropolises must reconcile anthropogenic density with planetary biodiversity.",
    },
  ],
};
