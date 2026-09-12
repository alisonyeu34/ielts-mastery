export type TFNGAnswer = "TRUE" | "FALSE" | "NOT_GIVEN";

export type TFNGTrapType =
  | "qualifier" // All/Every/Only vs Some/Many
  | "comparison" // X is better/faster than Y (not mentioned)
  | "over_inference" // Real-world assumptions outside text
  | "frequency" // Always/Never vs Frequently/Sometimes
  | "contradiction" // 180-degree direct factual conflict
  | "valid_paraphrase"; // Multi-layer synonym match

export interface TFNGQuestion {
  id: string;
  passageId: string;
  statement: string;
  correctAnswer: TFNGAnswer;
  evidenceParagraphId: string;
  evidenceQuote: string;
  trapType: TFNGTrapType;
  trapTitleVi: string;
  explanationMarkdown: string;
}

export interface TFNGParagraph {
  id: string; // e.g. 'A', 'B', 'C', 'D'
  content: string;
}

export interface TFNGPassage {
  id: string;
  title: string;
  topic: string;
  wordCount: number;
  timeLimitMinutes: number;
  paragraphs: TFNGParagraph[];
  questions: TFNGQuestion[];
}

export const MOCK_TFNG_PASSAGES: TFNGPassage[] = [
  {
    id: "tfng_passage_seagrass",
    title: "The Resurgence of Seagrass Meadows: Blue Carbon and Coastal Ecology",
    topic: "Marine Biology & Climate Mitigation",
    wordCount: 520,
    timeLimitMinutes: 12,
    paragraphs: [
      {
        id: "A",
        content:
          "Seagrass meadows, submerged marine flowering plants carpeting shallow coastal waters across the globe, constitute one of the planet's most prolific biological habitats. Although occupying less than 0.2 percent of the global ocean seafloor, these subaquatic ecosystems are responsible for sequestering approximately 10 to 18 percent of all oceanic carbon, a phenomenon known in contemporary climate science as 'blue carbon'. Unlike terrestrial rainforests, which store carbon predominantly in biological biomass for decades, seagrass meadows trap particulate carbon within anaerobic sediment layers, preserving it for millennia without releasing greenhouse gases into the atmosphere.",
      },
      {
        id: "B",
        content:
          "Despite their immense ecological utility, seagrass habitats have undergone severe global decline over the past century. Anthropogenic factors—specifically agricultural nutrient runoff, industrial dredging, and port construction—have precipitated a drastic reduction in water clarity. Because seagrasses rely entirely on solar photosynthetic radiation to synthesize organic compounds, prolonged turbidity deprives them of essential sunlight, triggering widespread meadow die-offs. Marine biologists estimate that nearly one-third of the earth's historical seagrass extent has perished since the late nineteenth century.",
      },
      {
        id: "C",
        content:
          "In response to this ecological crisis, coastal restoration initiatives have expanded dramatically across Western Europe and North America. Recent experimental projects in the Chesapeake Bay utilized mechanized seed-dispersal vessels rather than manual seedling transplantation. The automated approach allowed researchers to seed tens of thousands of acres in a fraction of the time required by traditional volunteer divers, leading to the natural resurgence of diverse marine fauna, including scallops, juvenile crabs, and migratory waterfowl.",
      },
      {
        id: "D",
        content:
          "However, several environmental economists caution that large-scale seagrass restoration may occasionally encounter unanticipated legal and financial impediments. In certain jurisdictions, commercial fishermen have voiced concerns that the establishment of legally protected marine reserves will restrict their customary trawling zones. Furthermore, securing continuous multi-year state funding remains an arduous challenge, as the tangible carbon sequestration returns of newly planted meadows require up to seven years to become statistically quantifiable.",
      },
    ],
    questions: [
      {
        id: "q_tfng_1",
        passageId: "tfng_passage_seagrass",
        statement:
          "Seagrass meadows hold carbon in underlying marine sediments for a longer period than tropical rainforests store carbon in their vegetation.",
        correctAnswer: "TRUE",
        evidenceParagraphId: "A",
        evidenceQuote:
          "Unlike terrestrial rainforests, which store carbon predominantly in biological biomass for decades, seagrass meadows trap particulate carbon within anaerobic sediment layers, preserving it for millennia...",
        trapType: "valid_paraphrase",
        trapTitleVi: "Paraphrase Đa Tầng (Decades vs Millennia)",
        explanationMarkdown:
          "Đáp án là **TRUE**. Bài đọc khẳng định rừng trên cạn giữ carbon trong 'decades' (hàng thập kỷ), trong khi seagrass giữ trong các lớp trầm tích 'for millennia' (hàng thiên niên kỷ). Như vậy seagrass giữ carbon lâu hơn (longer period) rừng nhiệt đới.",
      },
      {
        id: "q_tfng_2",
        passageId: "tfng_passage_seagrass",
        statement:
          "All marine seagrass species require direct exposure to freshwater streams to achieve optimal growth rates.",
        correctAnswer: "FALSE",
        evidenceParagraphId: "B",
        evidenceQuote:
          "Because seagrasses rely entirely on solar photosynthetic radiation to synthesize organic compounds, prolonged turbidity deprives them of essential sunlight...",
        trapType: "qualifier",
        trapTitleVi: "Bẫy Lượng Từ Tuyệt Đối ('All seagrass species require...')",
        explanationMarkdown:
          "Đáp án là **FALSE**. Đoạn B chỉ ra rằng yếu tố sinh tồn bắt buộc của seagrass là ánh sáng mặt trời ('solar photosynthetic radiation'), đồng thời chúng sống ở 'shallow coastal waters' (nước mặn/lợ ven biển). Khẳng định 'tất cả loài cỏ biển đòi hỏi nước ngọt (freshwater)' mâu thuẫn trực tiếp với bản chất của loài thực vật biển này.",
      },
      {
        id: "q_tfng_3",
        passageId: "tfng_passage_seagrass",
        statement:
          "Mechanized seed-dispersal vessels are more cost-effective per acre than using volunteer divers for seedling transplantation.",
        correctAnswer: "NOT_GIVEN",
        evidenceParagraphId: "C",
        evidenceQuote:
          "The automated approach allowed researchers to seed tens of thousands of acres in a fraction of the time required by traditional volunteer divers...",
        trapType: "comparison",
        trapTitleVi: "Bẫy So Sánh Hơn Giả Định (Cost-effective Comparison)",
        explanationMarkdown:
          "Đáp án là **NOT GIVEN**. Đoạn C đề cập tàu gieo hạt tự động giúp tiết kiệm thời gian ('in a fraction of the time'), nhưng bài đọc **hoàn toàn không so sánh về chi phí tài chính (cost-effective / money)** giữa hai phương pháp gieo trồng. Thí sinh hay tự suy diễn 'nhanh hơn thì rẻ hơn' và chọn TRUE/FALSE là mắc bẫy so sánh hơn giả định.",
      },
      {
        id: "q_tfng_4",
        passageId: "tfng_passage_seagrass",
        statement:
          "Local commercial fishermen universally supported the creation of protected seagrass restoration zones.",
        correctAnswer: "FALSE",
        evidenceParagraphId: "D",
        evidenceQuote:
          "In certain jurisdictions, commercial fishermen have voiced concerns that the establishment of legally protected marine reserves will restrict their customary trawling zones.",
        trapType: "contradiction",
        trapTitleVi: "Mâu Thuẫn 180 Độ ('Universally supported' vs 'Voiced concerns')",
        explanationMarkdown:
          "Đáp án là **FALSE**. Câu hỏi khẳng định ngư dân 'hoàn toàn ủng hộ' (universally supported), trong khi đoạn D chỉ rõ ngư dân 'bày tỏ lo ngại và phản đối' (voiced concerns) vì các khu bảo tồn sẽ hạn chế ngư trường đánh bắt truyền thống của họ.",
      },
    ],
  },
  {
    id: "tfng_passage_clockwork",
    title: "The Genesis of Mechanical Horology in Medieval Monasteries",
    topic: "History of Technology",
    wordCount: 480,
    timeLimitMinutes: 10,
    paragraphs: [
      {
        id: "A",
        content:
          "The emergence of weight-driven mechanical clocks during the late thirteenth century represented a profound technological rupture in European history. Prior to this innovation, time measurement relied exclusively on shadow sundials, hourglass sandglasses, and hydro-mechanical clepsydras (water clocks). However, these ancient instruments suffered from acute operational limitations: sundials were rendered entirely useless under cloudy skies or during nocturnal hours, while water clocks frequently malfunctioned in northern European winters due to fluid freezing.",
      },
      {
        id: "B",
        content:
          "The initial impetus for horological mechanization did not originate in bustling merchant guilds, but rather within secluded monastic communities, notably those observing the strict Benedictine Rule. Monks were required to perform canonical prayers at eight rigorous intervals throughout the day and night, including Matins at dawn and Nocturns in total darkness. Consequently, monastics required an infallible, weather-resilient acoustic alerting mechanism to summon the brethren to communal worship with absolute temporal regularity.",
      },
      {
        id: "C",
        content:
          "The critical technical breakthrough enabling continuous mechanical oscillation was the verge and foliot escapement mechanism. By arresting and releasing a falling gravitational weight at precise, periodic ticks, the escapement converted continuous downward gravitational pull into discrete, measurable units of time. The earliest medieval clockwork devices lacked visual dials or rotating hands; instead, their sole function was to trigger a mechanical hammer that struck an audible bronze bell.",
      },
      {
        id: "D",
        content:
          "By the mid-fourteenth century, mechanical clocks had migrated from secluded monastic belfries to civic town squares in northern Italy and England. These monumental astronomical clocks, such as Giovanni de' Dondi's Astrarium, incorporated elaborate planetary dials and automated brass automatons. However, despite their intricate mechanical sophistication, their internal timekeeping accuracy remained surprisingly crude by modern metrics, drifting by as much as fifteen to thirty minutes per day.",
      },
    ],
    questions: [
      {
        id: "q_tfng_5",
        passageId: "tfng_passage_clockwork",
        statement:
          "Before the 13th century, water clocks were completely unaffected by freezing winter temperatures.",
        correctAnswer: "FALSE",
        evidenceParagraphId: "A",
        evidenceQuote:
          "...while water clocks frequently malfunctioned in northern European winters due to fluid freezing.",
        trapType: "contradiction",
        trapTitleVi: "Mâu Thuẫn Thực Tế Trực Tiếp",
        explanationMarkdown:
          "Đáp án là **FALSE**. Đoạn A chỉ rõ đồng hồ nước thời bấy giờ 'thường xuyên hỏng hóc vào mùa đông do nước bị đóng băng' ('frequently malfunctioned... due to fluid freezing'), mâu thuẫn 180 độ với khẳng định 'completely unaffected'.",
      },
      {
        id: "q_tfng_6",
        passageId: "tfng_passage_clockwork",
        statement:
          "The earliest medieval mechanical clocks were designed primarily to display the hour visually using metal hands.",
        correctAnswer: "FALSE",
        evidenceParagraphId: "C",
        evidenceQuote:
          "The earliest medieval clockwork devices lacked visual dials or rotating hands; instead, their sole function was to trigger a mechanical hammer that struck an audible bronze bell.",
        trapType: "contradiction",
        trapTitleVi: "Bẫy Ngược Chiều (Visual Hands vs Audible Bell)",
        explanationMarkdown:
          "Đáp án là **FALSE**. Đoạn C khẳng định đồng hồ cơ học sơ khai 'hoàn toàn không có mặt số hiển thị hay kim quay' ('lacked visual dials or rotating hands') mà chỉ có cơ chế búa gõ chuông báo âm thanh.",
      },
      {
        id: "q_tfng_7",
        passageId: "tfng_passage_clockwork",
        statement:
          "Benedictine monks were paid substantial financial compensation by local governments for maintaining monastic clocks.",
        correctAnswer: "NOT_GIVEN",
        evidenceParagraphId: "B",
        evidenceQuote:
          "Monks were required to perform canonical prayers at eight rigorous intervals throughout the day and night...",
        trapType: "over_inference",
        trapTitleVi: "Bẫy Thông Tin Không Đề Cập (No Financial Compensation Mentioned)",
        explanationMarkdown:
          "Đáp án là **NOT GIVEN**. Đoạn B giải thích các tu sĩ phát minh đồng hồ để phục vụ giờ cầu nguyện tôn giáo của chính họ. Bài đọc **hoàn toàn không nhắc tới bất kỳ khoản tiền thù lao hay tài trợ nào từ chính quyền địa phương**.",
      },
      {
        id: "q_tfng_8",
        passageId: "tfng_passage_clockwork",
        statement:
          "Fourteenth-century astronomical clocks exhibited substantial deviations in daily timekeeping accuracy.",
        correctAnswer: "TRUE",
        evidenceParagraphId: "D",
        evidenceQuote:
          "...their internal timekeeping accuracy remained surprisingly crude by modern metrics, drifting by as much as fifteen to thirty minutes per day.",
        trapType: "valid_paraphrase",
        trapTitleVi: "Paraphrase Từ Vựng ('Substantial deviations' = 'Drifting 15-30 mins')",
        explanationMarkdown:
          "Đáp án là **TRUE**. Đoạn D nêu rõ đồng hồ thiên văn thế kỷ 14 có độ chính xác rất thô sơ ('crude') và bị lệch từ 15 đến 30 phút mỗi ngày ('drifting by as much as fifteen to thirty minutes per day'), hoàn toàn tương đương với 'exhibited substantial deviations in daily timekeeping accuracy'.",
      },
    ],
  },
];
