export type HeadingTrapCategory =
  | "word_match" // Repeats exact keywords from supporting sentences
  | "too_narrow" // Only describes a minor sub-point or specific statistic
  | "too_broad" // Overly general concept exceeding the paragraph scope
  | "contradiction"; // Conflicts with the final sentence

export interface HeadingItem {
  id: string; // e.g. 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'
  romanNumeral: string;
  title: string;
  isDistractor: boolean;
  trapType?: HeadingTrapCategory;
  trapTitleVi?: string;
  trapExplanation?: string;
}

export interface StructuralParagraph {
  id: string; // 'A', 'B', 'C', 'D', 'E'
  paragraphNumber: number;
  topicSentence: string;
  supportingText: string;
  concludingSentence: string;
  correctHeadingId: string;
  explanationMarkdown: string;
}

export interface HeadingsPassage {
  id: string;
  title: string;
  topic: string;
  wordCount: number;
  timeLimitMinutes: number;
  headings: HeadingItem[];
  paragraphs: StructuralParagraph[];
}

export const MOCK_HEADINGS_PASSAGE: HeadingsPassage = {
  id: "passage_heat_islands",
  title: "The Genesis and Mitigation of the Urban Heat Island Phenomenon",
  topic: "Urban Climatology & Sustainable Architecture",
  wordCount: 680,
  timeLimitMinutes: 15,
  headings: [
    {
      id: "h_i",
      romanNumeral: "i",
      title: "The thermal disparity between metropolitan centers and rural peripheries",
      isDistractor: false,
    },
    {
      id: "h_ii",
      romanNumeral: "ii",
      title: "Physical properties of construction materials that amplify thermal retention",
      isDistractor: false,
    },
    {
      id: "h_iii",
      romanNumeral: "iii",
      title: "Vegetative and architectural strategies for urban temperature reduction",
      isDistractor: false,
    },
    {
      id: "h_iv",
      romanNumeral: "iv",
      title: "Socio-economic inequalities in exposure to metropolitan heat stress",
      isDistractor: false,
    },
    {
      id: "h_v",
      romanNumeral: "v",
      title: "Predictive meteorological modeling and future urban resilience policies",
      isDistractor: false,
    },
    {
      id: "h_vi",
      romanNumeral: "vi",
      title: "The exclusive role of asphalt pavements in nocturnal radiation",
      isDistractor: true,
      trapType: "too_narrow",
      trapTitleVi: "Bẫy Phạm Vi Quá Hẹp (Too Narrow)",
      trapExplanation:
        "Tiêu đề này chỉ nói về 'asphalt pavements' (mặt đường nhựa) ở một câu ví dụ nhỏ trong đoạn B, trong khi ý chính của cả đoạn là tất cả các vật liệu xây dựng (bê tông, kính, thép).",
    },
    {
      id: "h_vii",
      romanNumeral: "vii",
      title: "Global climate change and its worldwide ecological ramifications",
      isDistractor: true,
      trapType: "too_broad",
      trapTitleVi: "Bẫy Phạm Vi Quá Rộng (Too Broad)",
      trapExplanation:
        "Tiêu đề này nói về 'biến đổi khí hậu toàn cầu trên toàn thế giới', vượt quá phạm vi bài đọc vốn chỉ tập trung vào vi khí hậu trong các đô thị (Urban Heat Islands).",
    },
    {
      id: "h_viii",
      romanNumeral: "viii",
      title: "Satellite thermal imagery measurements across Western Europe",
      isDistractor: true,
      trapType: "word_match",
      trapTitleVi: "Bẫy Lặp Từ Khóa (Word-Match Trap)",
      trapExplanation:
        "Tiêu đề lặp lại y hệt từ khóa 'Satellite thermal imagery' ở câu 2 đoạn A, nhưng đây chỉ là công cụ đo đạc phụ được nhắc đến lướt qua, không phải ý chính của đoạn.",
    },
  ],
  paragraphs: [
    {
      id: "A",
      paragraphNumber: 1,
      topicSentence:
        "The urban heat island (UHI) effect is a well-documented microclimatic phenomenon characterized by substantially elevated atmospheric temperatures in heavily built environments compared to their surrounding rural hinterlands.",
      supportingText:
        " High-resolution satellite thermal imagery reveals that metropolitan cores frequently register surface temperatures 3 to 7 degrees Celsius higher than adjacent agrarian landscapes. This localized thermal disparity is primarily attributable to the replacement of permeable soil and natural vegetation with dense impermeable matrices of concrete, brick, and asphalt, which absorb solar radiation with exceptional efficiency during diurnal hours.",
      concludingSentence:
        " Consequently, the temperature contrast between urban centers and countryside reaches its maximum intensity during nocturnal periods, as accumulated heat is continuously radiated into the lower atmosphere.",
      correctHeadingId: "h_i",
      explanationMarkdown:
        "Đoạn A tập trung định nghĩa và miêu tả sự chênh lệch nhiệt độ giữa trung tâm đô thị và vùng nông thôn ngoại thành (3 đến 7 độ C). Tiêu đề **i (The thermal disparity between metropolitan centers and rural peripheries)** tóm tắt chuẩn xác 100% ý chính của toàn đoạn.",
    },
    {
      id: "B",
      paragraphNumber: 2,
      topicSentence:
        "At the fundamental physical level, the primary driver of localized urban heating resides in the distinct thermal properties of conventional construction materials.",
      supportingText:
        " Building materials such as dark asphalt, dense concrete, and structural masonry exhibit low solar reflectance (albedo) alongside remarkably high thermal mass. During peak daylight hours, these surfaces absorb up to 90 percent of incident solar radiation rather than reflecting it back into space. Furthermore, the three-dimensional geometric canyon geometry of towering high-rises traps longwave radiation, preventing heat dissipation through turbulent wind currents.",
      concludingSentence:
        " In essence, the engineered physical fabric of modern cities inadvertently functions as an immense heat reservoir.",
      correctHeadingId: "h_ii",
      explanationMarkdown:
        "Đoạn B mổ xẻ các đặc tính vật lý (suất phản chiếu albedo thấp, khối nhiệt cao, hình học hẻm đô thị) của các vật liệu xây dựng khiến chúng giữ nhiệt. Tiêu đề **ii (Physical properties of construction materials that amplify thermal retention)** khái quát trọn vẹn toàn bộ đoạn.",
    },
    {
      id: "C",
      paragraphNumber: 3,
      topicSentence:
        "To mitigate extreme urban temperatures, environmental engineers and urban planners have developed an array of nature-based and technological interventions.",
      supportingText:
        " The strategic installation of extensive green roofs and vertical living walls provides evaporative cooling, while high-albedo 'cool roofs' coated with reflective elastomeric polymers can reduce surface temperatures by up to 28 degrees Celsius. Concurrently, urban forestry programs prioritizing dense canopy shade along transport corridors have demonstrated measurable success in lowering ambient air temperatures across multiple climate zones.",
      concludingSentence:
        " When integrated holistically, these architectural and vegetative solutions significantly depress the local urban heat index.",
      correctHeadingId: "h_iii",
      explanationMarkdown:
        "Đoạn C liệt kê và phân tích các giải pháp kiến trúc xanh và giải pháp công nghệ (mái nhà xanh, sơn phản xạ, trồng cây bóng mát) để hạ nhiệt độ đô thị. Tiêu đề **iii (Vegetative and architectural strategies for urban temperature reduction)** là đáp án chính xác.",
    },
    {
      id: "D",
      paragraphNumber: 4,
      topicSentence:
        "Crucially, the spatial distribution of urban heat stress is not uniform across metropolitan populations, frequently reflecting entrenched socio-economic disparities.",
      supportingText:
        " Historical discriminatory zoning practices and commercial disinvestment have concentrated low-income communities in densely paved neighborhoods with minimal tree canopy cover and scarce public parks. Empirical epidemiological data demonstrates that residents in these underserved districts experience heat-related hospitalizations and respiratory illnesses at rates three times higher than residents in affluent, vegetated suburbs.",
      concludingSentence:
        " Thus, urban heat vulnerability represents not merely a technical climatic problem, but an urgent issue of environmental justice.",
      correctHeadingId: "h_iv",
      explanationMarkdown:
        "Đoạn D nhấn mạnh sự bất bình đẳng xã hội - kinh tế trong việc hứng chịu nhiệt độ cao giữa các khu dân cư thu nhập thấp và khu vực giàu có. Tiêu đề **iv (Socio-economic inequalities in exposure to metropolitan heat stress)** nêu bật được từ khóa 'inequalities / disparities'.",
    },
    {
      id: "E",
      paragraphNumber: 5,
      topicSentence:
        "Looking toward the coming decades, municipal governance must integrate predictive climatological modeling into statutory urban master plans.",
      supportingText:
        " Advanced computational simulations combining climate projections with spatial demographic modeling enable city planners to simulate the microclimatic impact of new infrastructure before construction commences. Forward-thinking municipalities in Singapore and Stuttgart have already mandated microclimate assessment corridors to ensure continuous ventilation pathways.",
      concludingSentence:
        " Only through predictive, science-based urban governance can future megacities maintain livable environmental standards in an era of accelerating global warming.",
      correctHeadingId: "h_v",
      explanationMarkdown:
        "Đoạn E hướng tới tương lai và đề xuất việc ứng dụng mô hình dự báo thời tiết vào quy hoạch tổng thể đô thị để tăng khả năng chống chịu. Tiêu đề **v (Predictive meteorological modeling and future urban resilience policies)** là tiêu đề bao quát chính xác.",
    },
  ],
};
