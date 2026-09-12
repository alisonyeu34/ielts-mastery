export interface SpeakingPart1Item {
  id: string;
  topic: string;
  question: string;
  questionText: string;
  presentPrompt: string;
  pastPrompt: string;
  futurePrompt: string;
  signpostingPhrases: {
    present: string[];
    past: string[];
    future: string[];
  };
  modelAnswerBand85: {
    present: string;
    past: string;
    future: string;
    fullCombined: string;
  };
  sampleAnswer: {
    present: string;
    past: string;
    future: string;
  };
}

export interface SpeakingCueCardItem {
  id: string;
  title: string;
  cueCardTitle: string;
  topic: string;
  prompt: string;
  bulletPoints: string[];
  prompts: string[];
  sensoryPlanModel: {
    sight: string;
    sound: string;
    smellTaste: string;
    touchAtmosphere: string;
    emotion: string;
  };
  sample5Senses: FiveSensesNotes;
  memoryPalacePlanModel: {
    station1: string;
    station2: string;
    station3: string;
    station4?: string;
  };
  sampleMemoryPalace: MemoryPalaceNotes;
  modelSpeechBand85: string;
  highBandCollocations: Array<{
    phrase: string;
    meaningVi: string;
    example: string;
  }>;
}

export type Part2CueCardTask = SpeakingCueCardItem;
export type Part1QuestionItem = SpeakingPart1Item;

export interface FiveSensesNotes {
  sight: string;
  sound: string;
  smellTaste?: string;
  touchAtmosphere?: string;
  emotion?: string;
  smell?: string;
  taste?: string;
  touchEmotion?: string;
}

export interface MemoryPalaceNotes {
  station1: string;
  station2: string;
  station3: string;
  station4?: string;
}

export interface SpeakingSetData {
  id: string;
  topic: string;
  title: string;
  part1: SpeakingPart1Item[];
  part1Questions: SpeakingPart1Item[];
  part2: SpeakingCueCardItem;
  part2CueCard: SpeakingCueCardItem;
  part2Task: SpeakingCueCardItem;
}

export const MOCK_PART1_DATA: SpeakingPart1Item[] = [
  {
    id: "p1_reading",
    topic: "Reading Books",
    question: "Do you enjoy reading books in your spare time?",
    questionText: "Do you enjoy reading books in your spare time?",
    presentPrompt: "Trả lời trực tiếp vào sở thích hiện tại và thể loại sách yêu thích.",
    pastPrompt: "So sánh tương phản với thời thơ ấu hoặc thói quen đọc trong quá khứ.",
    futurePrompt: "Dự phóng mục tiêu hoặc dự định đọc sách trong tương lai gần.",
    signpostingPhrases: {
      present: ["To be perfectly honest...", "As a matter of fact...", "Without a shadow of a doubt..."],
      past: ["However, back in my school days...", "I used to be completely averse to...", "In stark contrast to my past..."],
      future: ["Provided that my schedule permits...", "Looking ahead, I anticipate that...", "I'm firmly resolved to..."],
    },
    modelAnswerBand85: {
      present: "To be perfectly honest, I consider myself an avid reader, particularly drawn to non-fiction and behavioral psychology treatises.",
      past: "However, back in my teenage years, I was virtually averse to reading and predominantly gravitated toward interactive video games.",
      future: "Looking ahead, provided that my demanding schedule permits, I'm firmly resolved to delve into classical world literature to broaden my cultural horizons.",
      fullCombined: "To be perfectly honest, I consider myself an avid reader, particularly drawn to non-fiction and behavioral psychology treatises. However, back in my teenage years, I was virtually averse to reading and predominantly gravitated toward interactive video games. Looking ahead, provided that my demanding schedule permits, I'm firmly resolved to delve into classical world literature to broaden my cultural horizons.",
    },
    sampleAnswer: {
      present: "To be perfectly honest, I consider myself an avid reader, particularly drawn to non-fiction and behavioral psychology treatises.",
      past: "However, back in my teenage years, I was virtually averse to reading and predominantly gravitated toward interactive video games.",
      future: "Looking ahead, provided that my demanding schedule permits, I'm firmly resolved to delve into classical world literature to broaden my cultural horizons.",
    },
  },
  {
    id: "p1_hometown",
    topic: "Hometown & Neighborhood",
    question: "What do you like most about your hometown?",
    questionText: "What do you like most about your hometown?",
    presentPrompt: "Nêu điểm ấn tượng nhất về thành phố/nơi bạn đang sinh sống.",
    pastPrompt: "Hồi tưởng lại diện mạo của quê hương nhiều năm trước đây.",
    futurePrompt: "Dự đoán sự chuyển dịch đô thị hóa trong 5-10 năm tới.",
    signpostingPhrases: {
      present: ["What I appreciate most is...", "Unquestionably, the most compelling aspect is...", "Above all else..."],
      past: ["Historically speaking...", "A decade or so ago, it was merely...", "In days gone by..."],
      future: ["In the foreseeable future...", "Given the current pace of urbanization...", "I foresee that..."],
    },
    modelAnswerBand85: {
      present: "Unquestionably, the most compelling facet of my hometown is its harmonious fusion of vibrant culinary nightlife and hospitable community atmosphere.",
      past: "A decade or so ago, it was merely a sleepy provincial town characterized by tranquil alleys and modest infrastructure.",
      future: "In the foreseeable future, given the rapid influx of foreign investment, I foresee it transforming into a prominent metropolitan tech hub.",
      fullCombined: "Unquestionably, the most compelling facet of my hometown is its harmonious fusion of vibrant culinary nightlife and hospitable community atmosphere. A decade or so ago, it was merely a sleepy provincial town characterized by tranquil alleys and modest infrastructure. In the foreseeable future, given the rapid influx of foreign investment, I foresee it transforming into a prominent metropolitan tech hub.",
    },
    sampleAnswer: {
      present: "Unquestionably, the most compelling facet of my hometown is its harmonious fusion of vibrant culinary nightlife and hospitable community atmosphere.",
      past: "A decade or so ago, it was merely a sleepy provincial town characterized by tranquil alleys and modest infrastructure.",
      future: "In the foreseeable future, given the rapid influx of foreign investment, I foresee it transforming into a prominent metropolitan tech hub.",
    },
  },
  {
    id: "p1_routine",
    topic: "Daily Routine",
    question: "Do you usually have the same routine every day?",
    questionText: "Do you usually have the same routine every day?",
    presentPrompt: "Miêu tả lịch trình sinh hoạt điển hình của bạn ở hiện tại.",
    pastPrompt: "So sánh với thời gian biểu tự do hoặc kỷ luật hơn trước đây.",
    futurePrompt: "Ý định cải thiện năng suất hoặc tái cấu trúc thời gian biểu sắp tới.",
    signpostingPhrases: {
      present: ["By and large, my schedule is...", "On typical weekdays, I adhere to...", "More often than not..."],
      past: ["Unlike during my university years when...", "Previously, my timetable was far more...", "I used to lead a chaotic..."],
      future: ["Moving forward, I intend to...", "I'm striving to incorporate...", "If circumstances allow..."],
    },
    modelAnswerBand85: {
      present: "By and large, my daily routine is structured around rigorous blocks of focused work followed by evening wellness practices.",
      past: "Unlike during my chaotic university years when my sleep schedule was completely erratic, I now prioritize strict circadian consistency.",
      future: "Moving forward, I intend to incorporate early morning meditation into my regimen to optimize cognitive clarity throughout the day.",
      fullCombined: "By and large, my daily routine is structured around rigorous blocks of focused work followed by evening wellness practices. Unlike during my chaotic university years when my sleep schedule was completely erratic, I now prioritize strict circadian consistency. Moving forward, I intend to incorporate early morning meditation into my regimen to optimize cognitive clarity throughout the day.",
    },
    sampleAnswer: {
      present: "By and large, my daily routine is structured around rigorous blocks of focused work followed by evening wellness practices.",
      past: "Unlike during my chaotic university years when my sleep schedule was completely erratic, I now prioritize strict circadian consistency.",
      future: "Moving forward, I intend to incorporate early morning meditation into my regimen to optimize cognitive clarity throughout the day.",
    },
  },
  {
    id: "p1_ai",
    topic: "Artificial Intelligence & Technology",
    question: "How often do you use AI tools in your daily life?",
    questionText: "How often do you use AI tools in your daily life?",
    presentPrompt: "Chia sẻ mức độ phụ thuộc vào trợ lý AI trong công việc / học tập hàng ngày.",
    pastPrompt: "Nhắc lại cách bạn xử lý công việc thủ công trước khi AI bùng nổ.",
    futurePrompt: "Dự đoán tầm ảnh hưởng của công nghệ tự động hóa trong sự nghiệp tương lai.",
    signpostingPhrases: {
      present: ["I incorporate AI solutions on a daily basis...", "Practically speaking, AI has become integral to...", "I rely quite heavily on..."],
      past: ["Prior to this technological breakthrough...", "Just a couple of years back, I had to manually...", "Before AI ubiquity..."],
      future: ["In years to come, I expect...", "As autonomous systems evolve, I anticipate...", "Looking further down the road..."],
    },
    modelAnswerBand85: {
      present: "Practically speaking, AI assistants have become integral to my workflow for summarizing technical documentation and debugging code.",
      past: "Just a couple of years back, I had to sift through hundreds of forum threads manually, which was exceedingly labor-intensive.",
      future: "As autonomous models evolve, I anticipate collaborating seamlessly with AI agents to orchestrate complex end-to-end software pipelines.",
      fullCombined: "Practically speaking, AI assistants have become integral to my workflow for summarizing technical documentation and debugging code. Just a couple of years back, I had to sift through hundreds of forum threads manually, which was exceedingly labor-intensive. As autonomous models evolve, I anticipate collaborating seamlessly with AI agents to orchestrate complex end-to-end software pipelines.",
    },
    sampleAnswer: {
      present: "Practically speaking, AI assistants have become integral to my workflow for summarizing technical documentation and debugging code.",
      past: "Just a couple of years back, I had to sift through hundreds of forum threads manually, which was exceedingly labor-intensive.",
      future: "As autonomous models evolve, I anticipate collaborating seamlessly with AI agents to orchestrate complex end-to-end software pipelines.",
    },
  },
];

export const MOCK_PART2_CUECARDS: SpeakingCueCardItem[] = [
  {
    id: "cue_old_person",
    title: "Đề 1 (Person): An Inspiring Elderly Person",
    cueCardTitle: "Describe an interesting old person you met recently",
    topic: "Describe an interesting old person you met recently",
    prompt: "You should say:\n• Who this person is and how you met them\n• What kind of person they are\n• What you talked about\n• And explain why you found them so interesting and inspiring.",
    bulletPoints: [
      "Who this person is & how you met them",
      "What kind of person they are",
      "What you talked about",
      "Why you found them so inspiring",
    ],
    prompts: [
      "Who this person is & how you met them",
      "What kind of person they are",
      "What you talked about",
      "Why you found them so inspiring",
    ],
    sensoryPlanModel: {
      sight: "Silver hair, kind crinkling eyes, vintage tweed jacket, well-worn leather journal",
      sound: "Resonant deep voice, gentle laughter, rustling autumn leaves in background",
      smellTaste: "Aroma of roasted Arabica coffee, faint cedarwood scent",
      touchAtmosphere: "Cozy neighborhood cafe, warm afternoon sunlight, peaceful ambiance",
      emotion: "Profound reverence, peaceful introspection, invigorated motivation",
    },
    sample5Senses: {
      sight: "Silver hair, kind crinkling eyes, vintage tweed jacket, well-worn leather journal",
      sound: "Resonant deep voice, gentle laughter, rustling autumn leaves in background",
      smellTaste: "Aroma of roasted Arabica coffee, faint cedarwood scent",
      touchAtmosphere: "Cozy neighborhood cafe, warm afternoon sunlight, peaceful ambiance",
      emotion: "Profound reverence, peaceful introspection, invigorated motivation",
      smell: "Aroma of roasted Arabica coffee",
      taste: "Faint cedarwood note in coffee",
      touchEmotion: "Cozy cafe, profound reverence",
    },
    memoryPalacePlanModel: {
      station1: "Cửa vào quán cafe: Gặp bác thợ mộc về hưu đang phác thảo bản vẽ trên sổ da",
      station2: "Bàn gỗ góc quán: Trò chuyện về triết lý chế tác mộc thủ công và sự kiên định sống",
      station3: "Hiên ban công lúc tạm biệt: Nhận được lời khuyên về lòng kiên trì và tư duy làm nghề sâu sắc",
      station4: "Khu vườn nhìn ra bờ sông: Bài học đọng lại về sự kiên định làm nghề",
    },
    sampleMemoryPalace: {
      station1: "Cửa vào quán cafe: Gặp bác thợ mộc về hưu đang phác thảo bản vẽ trên sổ da",
      station2: "Bàn gỗ góc quán: Trò chuyện về triết lý chế tác mộc thủ công và sự kiên định sống",
      station3: "Hiên ban công lúc tạm biệt: Nhận được lời khuyên về lòng kiên trì và tư duy làm nghề sâu sắc",
      station4: "Khu vườn nhìn ra bờ sông: Bài học đọng lại về sự kiên định làm nghề",
    },
    modelSpeechBand85:
      "I would like to talk about Mr. Arthur, a retired landscape architect and master carpenter in his late seventies whom I had the serendipitous fortune of meeting at a cozy neighborhood cafe last month.\n\nFrom the moment I noticed him, he radiated an undeniable aura of wisdom and serenity. He possessed striking silver hair and gentle, crinkling eyes that reflected a lifetime of rich experiences, dressed impeccably in a vintage tweed jacket while meticulously sketching architectural patterns in a well-worn leather journal.\n\nWe struck up a conversation when I complimented his intricate draftsmanship. What began as a brief exchange swiftly blossomed into a captivating two-hour dialogue spanning historical architecture, classical philosophy, and his reflections on navigating life's unpredictable setbacks. Despite his venerable age, he exhibited an insatiable intellectual curiosity and spoke with a resonant, comforting voice.\n\nWhat truly made him memorable was his perspective on craftsmanship and patience. He remarked that in an era dominated by instant gratification, dedicating oneself to mastering a single craft with meticulous care is the ultimate rebellion. That conversation left a lasting impression on me, serving as a poignant reminder to embrace deliberate practice and maintain composure in my own career journey.",
    highBandCollocations: [
      {
        phrase: "serendipitous fortune",
        meaningVi: "sự may mắn tình cờ đầy thú vị",
        example: "I had the serendipitous fortune of meeting a mentor at a conference.",
      },
      {
        phrase: "insatiable intellectual curiosity",
        meaningVi: "sự tò mò ham học hỏi vô tận",
        example: "Great scientists possess an insatiable intellectual curiosity.",
      },
      {
        phrase: "instant gratification",
        meaningVi: "sự thỏa mãn tức thời",
        example: "Social media fuels an addiction to instant gratification.",
      },
      {
        phrase: "poignant reminder",
        meaningVi: "lời nhắc nhở sâu sắc, thấm thía",
        example: "His story served as a poignant reminder of human resilience.",
      },
    ],
  },
  {
    id: "cue_natural_place",
    title: "Đề 2 (Place): A Serene Natural Landscape",
    cueCardTitle: "Describe a serene natural landscape you would like to revisit",
    topic: "Describe a serene natural landscape you would like to revisit",
    prompt: "You should say:\n• Where this place is located\n• When and with whom you went there\n• What you did while you were there\n• And explain why this place was so memorable and peaceful for you.",
    bulletPoints: [
      "Where this place is located",
      "When and with whom you visited",
      "What you did there",
      "Why it brought you profound peace",
    ],
    prompts: [
      "Where this place is located",
      "When and with whom you visited",
      "What you did there",
      "Why it brought you profound peace",
    ],
    sensoryPlanModel: {
      sight: "Emerald alpine lake, mist-shrouded pine forests, crystal clear waters",
      sound: "Gentle whispering pine breeze, melodic birdsong, soft water lapping",
      smellTaste: "Crisp pine resin scent, fresh mountain air, hot herbal tea",
      touchAtmosphere: "Chilly morning breeze, warm woolen blanket, tranquil solitude",
      emotion: "Mental rejuvenation, inner tranquility, awe-inspired bliss",
    },
    sample5Senses: {
      sight: "Emerald alpine lake, mist-shrouded pine forests, crystal clear waters",
      sound: "Gentle whispering pine breeze, melodic birdsong, soft water lapping",
      smellTaste: "Crisp pine resin scent, fresh mountain air, hot herbal tea",
      touchAtmosphere: "Chilly morning breeze, warm woolen blanket, tranquil solitude",
      emotion: "Mental rejuvenation, inner tranquility, awe-inspired bliss",
      smell: "Crisp pine resin scent",
      taste: "Hot herbal tea",
      touchEmotion: "Chilly breeze, mental rejuvenation",
    },
    memoryPalacePlanModel: {
      station1: "Bến bờ hồ buổi bình minh: Sương mù bảng lảng trôi trên mặt nước phẳng lặng",
      station2: "Con đường mòn xuyên rừng thông: Đi bộ chậm rãi hít thở bầu không khí tinh khiết",
      station3: "Chòi vọng cảnh trên đỉnh đồi: Ngắm hoàng hôn nhuộm vàng rặng núi và tìm thấy bình yên nội tâm",
      station4: "Bếp lửa nhà sàn: Hồi phục năng lượng tinh thần",
    },
    sampleMemoryPalace: {
      station1: "Bến bờ hồ buổi bình minh: Sương mù bảng lảng trôi trên mặt nước phẳng lặng",
      station2: "Con đường mòn xuyên rừng thông: Đi bộ chậm rãi hít thở bầu không khí tinh khiết",
      station3: "Chòi vọng cảnh trên đỉnh đồi: Ngắm hoàng hôn nhuộm vàng rặng núi và tìm thấy bình yên nội tâm",
      station4: "Bếp lửa nhà sàn: Hồi phục năng lượng tinh thần",
    },
    modelSpeechBand85:
      "I would like to share my experience visiting Lake Tuyen Lam, an idyllic alpine reservoir nestled among misty pine-covered valleys in the central highlands of Vietnam.\n\nI traveled there last autumn alongside a couple of close university peers seeking respite from our hectic academic schedules. The visual splendor of the landscape was breathtaking: an expansive emerald body of water surrounded by rolling hills cloaked in dense coniferous forests, with delicate morning fog hovering above the glassy surface.\n\nDuring our stay, we refrained from conventional tourist activities and instead engaged in immersive mindfulness. Early in the mornings, we rented wooden kayaks and glided silently across the pristine lake, enveloped by the crisp mountain breeze and the melodic chorus of highland birds. In the afternoons, we trekked along secluded trails where the earthy fragrance of pine resin and moist moss was invigorating.\n\nThis destination etched itself into my memory because it provided complete digital detoxification and mental rejuvenation. Standing on the lake shore as the twilight painted the sky in shades of amber allowed me to recalibrate my thoughts and cultivate profound inner serenity, which is why I am eager to return whenever I need a cognitive reset.",
    highBandCollocations: [
      {
        phrase: "visual splendor",
        meaningVi: "vẻ đẹp lộng lẫy mãn nhãn",
        example: "The national park is renowned for its visual splendor.",
      },
      {
        phrase: "digital detoxification",
        meaningVi: "cai nghiện thiết bị kỹ thuật số",
        example: "A weekend camping trip is the perfect digital detoxification.",
      },
      {
        phrase: "etched itself into my memory",
        meaningVi: "khắc sâu vào tâm trí",
        example: "That sunset over the canyon etched itself into my memory forever.",
      },
      {
        phrase: "inner serenity",
        meaningVi: "sự thanh tịnh bình yên nội tâm",
        example: "Meditation enables practitioners to cultivate inner serenity.",
      },
    ],
  },
  {
    id: "cue_tech_problem",
    title: "Đề 3 (Experience): Solving a Problem with Technology",
    cueCardTitle: "Describe a time you solved a challenging problem using technology",
    topic: "Describe a time you solved a challenging problem using technology",
    prompt: "You should say:\n• What the problem was\n• What technology or software you utilized\n• How you implemented the solution\n• And explain why this experience was so fulfilling for you.",
    bulletPoints: [
      "What the problem was",
      "What software or tool you used",
      "How you implemented the fix",
      "Why resolving it was so rewarding",
    ],
    prompts: [
      "What the problem was",
      "What software or tool you used",
      "How you implemented the fix",
      "Why resolving it was so rewarding",
    ],
    sensoryPlanModel: {
      sight: "Red compiler error logs, multiple glowing monitor displays, clean refactored code",
      sound: "Rhythmic mechanical keyboard clicks, fan hum, celebratory sigh of relief",
      smellTaste: "Strong dark roast espresso, crisp air-conditioned server room",
      touchAtmosphere: "Tense deadline pressure transitioning to triumphant euphoria",
      emotion: "Intellectual thrill, tenacity rewarded, overwhelming empowerment",
    },
    sample5Senses: {
      sight: "Red compiler error logs, multiple glowing monitor displays, clean refactored code",
      sound: "Rhythmic mechanical keyboard clicks, fan hum, celebratory sigh of relief",
      smellTaste: "Strong dark roast espresso, crisp air-conditioned server room",
      touchAtmosphere: "Tense deadline pressure transitioning to triumphant euphoria",
      emotion: "Intellectual thrill, tenacity rewarded, overwhelming empowerment",
      smell: "Strong dark roast espresso",
      taste: "Dark roast espresso",
      touchEmotion: "Tense pressure, triumphant euphoria",
    },
    memoryPalacePlanModel: {
      station1: "Bàn làm việc lúc nửa đêm: Hệ thống dữ liệu gặp lỗi nghẽn cổ chai nghiêm trọng",
      station2: "Màn hình mã nguồn: Thiết kế lại thuật toán caching và bất đồng bộ hóa pipeline",
      station3: "Bảng dashboard kiểm thử: Biểu đồ tải về 0 lỗi và tốc độ xử lý tăng gấp 5 lần",
      station4: "Phòng họp sáng hôm sau: Thuyết trình giải pháp thành công",
    },
    sampleMemoryPalace: {
      station1: "Bàn làm việc lúc nửa đêm: Hệ thống dữ liệu gặp lỗi nghẽn cổ chai nghiêm trọng",
      station2: "Màn hình mã nguồn: Thiết kế lại thuật toán caching và bất đồng bộ hóa pipeline",
      station3: "Bảng dashboard kiểm thử: Biểu đồ tải về 0 lỗi và tốc độ xử lý tăng gấp 5 lần",
      station4: "Phòng họp sáng hôm sau: Thuyết trình giải pháp thành công",
    },
    modelSpeechBand85:
      "I would like to recount a high-stakes technical bottleneck I resolved during my internship as a junior data engineer six months ago.\n\nThe challenge occurred when our web platform's reporting service began crashing under sudden traffic spikes. Millions of raw transaction records were being processed synchronously, resulting in catastrophic database timeouts and preventing thousands of enterprise clients from accessing their financial summaries right before quarterly reporting deadlines.\n\nTo remediate this crisis, I spearheaded the deployment of an asynchronous distributed queue leveraging Redis caching alongside a Python optimization script. I spent an intense 18-hour sprint profiling system memory leaks and rewriting the batch processing pipeline into non-blocking micro-tasks.\n\nWhen we finally rolled out the patch and monitored the real-time telemetry dashboard, latency plummeted by eighty percent and the CPU usage stabilized immediately. That moment was immensely gratifying because it not only averted a critical business disaster but also reinforced my technical self-efficacy and taught me how composure under acute pressure can turn a daunting crisis into a transformative learning milestone.",
    highBandCollocations: [
      {
        phrase: "high-stakes technical bottleneck",
        meaningVi: "nút thắt cổ chai kỹ thuật then chốt đầy rủi ro",
        example: "The engineering team resolved a high-stakes technical bottleneck.",
      },
      {
        phrase: "catastrophic timeouts",
        meaningVi: "lỗi quá thời gian nghiêm trọng làm tê liệt hệ thống",
        example: "Traffic overloads caused catastrophic timeouts across the network.",
      },
      {
        phrase: "technical self-efficacy",
        meaningVi: "niềm tin vững vàng vào năng lực kỹ thuật của bản thân",
        example: "Overcoming hard bugs bolsters a developer's technical self-efficacy.",
      },
      {
        phrase: "transformative learning milestone",
        meaningVi: "cột mốc học tập mang tính bước ngoặt",
        example: "Leading the project proved to be a transformative learning milestone.",
      },
    ],
  },
];

export const MOCK_SPEAKING_SETS: SpeakingSetData[] = [
  {
    id: "set_1_person",
    topic: "People & Relationships",
    title: "Speaking Set 1: Inspiring Elderly Person",
    part1: MOCK_PART1_DATA,
    part1Questions: MOCK_PART1_DATA,
    part2: MOCK_PART2_CUECARDS[0],
    part2CueCard: MOCK_PART2_CUECARDS[0],
    part2Task: MOCK_PART2_CUECARDS[0],
  },
  {
    id: "set_2_nature",
    topic: "Places & Nature",
    title: "Speaking Set 2: Serene Natural Landscape",
    part1: MOCK_PART1_DATA,
    part1Questions: MOCK_PART1_DATA,
    part2: MOCK_PART2_CUECARDS[1],
    part2CueCard: MOCK_PART2_CUECARDS[1],
    part2Task: MOCK_PART2_CUECARDS[1],
  },
  {
    id: "set_3_tech",
    topic: "Technology & Problem Solving",
    title: "Speaking Set 3: Solving a Problem with Technology",
    part1: MOCK_PART1_DATA,
    part1Questions: MOCK_PART1_DATA,
    part2: MOCK_PART2_CUECARDS[2],
    part2CueCard: MOCK_PART2_CUECARDS[2],
    part2Task: MOCK_PART2_CUECARDS[2],
  },
];
