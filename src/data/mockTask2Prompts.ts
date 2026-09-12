export type Task2EssayType =
  | "opinion" // Agree / Disagree
  | "discussion" // Discuss both views & give opinion
  | "problem_solution" // Causes & Solutions / Problems & Solutions
  | "two_part"; // Direct two-question prompt

export interface PEELBlockData {
  point: string;
  explain: string;
  example: string;
  link: string;
}

export interface Task2PromptData {
  id: string;
  essayType: Task2EssayType;
  essayTypeVi: string;
  topicTitle: string;
  promptText: string;
  topicKeywords: string[];
  microLimiters: string[];
  commonOffTopicTraps: string[];
  modelIntro: {
    background: string;
    thesis: string;
  };
  modelPEELBody1: PEELBlockData;
  modelPEELBody2: PEELBlockData;
  modelConclusion: string;
}

export const MOCK_TASK2_PROMPTS: Task2PromptData[] = [
  {
    id: "task2_opinion_car_ban",
    essayType: "opinion",
    essayTypeVi: "Opinion Essay (Agree / Disagree)",
    topicTitle: "Urban Transport & Environmental Quality",
    promptText:
      "Some people argue that private cars should be completely banned from city centres to reduce air pollution and traffic congestion. To what extent do you agree or disagree?",
    topicKeywords: ["private cars", "city centres", "air pollution", "traffic congestion"],
    microLimiters: [
      "completely banned (từ khóa tuyệt đối: cấm hoàn toàn, không phải hạn chế một phần)",
      "city centres (chỉ trong lõi trung tâm thành phố, không phải toàn bộ vùng ngoại ô)",
    ],
    commonOffTopicTraps: [
      "Chỉ nói về ô nhiễm không khí nói chung mà quên phân tích tính khả thi của việc 'cấm hoàn toàn'.",
      "Viết về xe điện (EVs) mà không đề cập đến giải pháp giao thông công cộng thay thế ở khu trung tâm.",
    ],
    modelIntro: {
      background:
        "It is increasingly argued that municipalities should impose a total ban on personal automobiles in downtown metropolitan districts to combat toxic emissions and gridlock.",
      thesis:
        "While I acknowledge the temporary inconvenience this may cause to certain commuters, I completely agree with this proposal because it dramatically improves public health and catalyzes the modernization of public transit systems.",
    },
    modelPEELBody1: {
      point:
        "The primary justification for prohibiting private vehicles in central zones is the immediate and substantial reduction in ambient toxic air pollution.",
      explain:
        "When thousands of internal combustion engines are concentrated in dense commercial corridors, they release hazardous concentrations of particulate matter (PM2.5) and nitrogen dioxide, which become trapped between high-rise buildings and directly degrade urban respiratory health.",
      example:
        "For instance, following the pedestrianization and car-free initiative in central Madrid and Oslo, local environmental agencies recorded a remarkable 30% decline in roadside nitrogen dioxide emissions within the first two years.",
      link:
        "Consequently, eliminating personal automobiles serves as a direct and indispensable catalyst for safeguarding the well-being of urban residents.",
    },
    modelPEELBody2: {
      point:
        "Furthermore, banning private cars stimulates mass transit ridership and creates pedestrian-friendly public spaces that foster local economic vitality.",
      explain:
        "When private vehicular access is restricted, citizens naturally transition to high-capacity subway, light rail, and cycling networks, which optimizes roadway space and allows city planners to convert congested roads into vibrant commercial plazas.",
      example:
        "A compelling illustration is Pontevedra in Spain, where pedestrianizing the central core led to a 70% decrease in carbon emissions alongside a significant surge in foot traffic for local boutique businesses.",
      link:
        "Thus, a car-free urban centre not only resolves traffic bottlenecks but also rejuvenates community social and economic life.",
    },
    modelConclusion:
      "In conclusion, I firmly agree that private cars should be entirely excluded from city centres, as this policy mitigates hazardous air pollution and creates thriving, livable urban spaces supported by sustainable public transit.",
  },
  {
    id: "task2_discussion_university_vs_work",
    essayType: "discussion",
    essayTypeVi: "Discussion Essay (Discuss Both Views & Give Opinion)",
    topicTitle: "Higher Education vs Immediate Workforce Entry",
    promptText:
      "Some people believe that attending university is the best way to ensure career success, while others argue that getting practical work experience straight after school is more beneficial. Discuss both views and give your own opinion.",
    topicKeywords: ["attending university", "career success", "practical work experience", "straight after school"],
    microLimiters: [
      "career success (thành công nghề nghiệp lâu dài vs thu nhập sớm)",
      "straight after school (ngay sau khi tốt nghiệp cấp 3)",
    ],
    commonOffTopicTraps: [
      "Chỉ thảo luận một vế mà quên vế còn lại (lỗi Task Response không đáp ứng yêu cầu 'Discuss both views').",
      "Quên đưa ra lập trường cá nhân (Give your own opinion) trong Mở bài và Kết luận.",
    ],
    modelIntro: {
      background:
        "While some individuals contend that obtaining a university degree remains the definitive prerequisite for professional advancement, others maintain that entering the job market directly after secondary education provides superior practical advantages.",
      thesis:
        "In my perspective, although immediate employment offers early financial independence and vocational skills, tertiary education ultimately provides broader long-term career mobility and higher earning potential.",
    },
    modelPEELBody1: {
      point:
        "On the one hand, entering the workforce straight after secondary school allows young individuals to accumulate hands-on experience and attain early financial stability.",
      explain:
        "By commencing employment at an early age, school leavers bypass the burdensome debt of student loans while mastering specialized workplace competencies, client communication, and operational skills that theoretical university textbooks rarely teach.",
      example:
        "For example, in fast-evolving sectors such as digital marketing or technical trades, young professionals with four years of tangible portfolio experience often outperform recent university graduates who lack operational familiarity.",
      link:
        "Therefore, early workforce entry presents undeniable pragmatic advantages for those pursuing skill-oriented career paths.",
    },
    modelPEELBody2: {
      point:
        "On the other hand, a comprehensive university education equips students with advanced theoretical foundations and specialized credentials essential for high-level professional progression.",
      explain:
        "Rigorous academic institutions cultivate critical analytical thinking, research acumen, and formal qualifications that are mandatory prerequisites for entering regulated industries such as medicine, engineering, law, and corporate leadership.",
      example:
        "Statistical data from the OECD consistently indicates that individuals holding a bachelor's degree earn on average 40% higher lifetime incomes and experience significantly lower rates of long-term unemployment compared to non-graduates.",
      link:
        "Hence, tertiary education remains the most reliable vehicle for securing senior managerial and high-compensation positions over a lifetime.",
    },
    modelConclusion:
      "In conclusion, while starting work immediately after school affords rapid practical exposure, I believe that pursuing university education is ultimately more advantageous for achieving sustainable, high-tier career success.",
  },
  {
    id: "task2_problem_solution_youth_exercise",
    essayType: "problem_solution",
    essayTypeVi: "Problem & Solution Essay",
    topicTitle: "Sedentary Youth Lifestyle & Public Health",
    promptText:
      "In many countries, young people are doing significantly less physical exercise compared to previous generations. What are the main causes of this trend, and what solutions can be implemented to address it?",
    topicKeywords: ["young people", "less physical exercise", "previous generations", "causes", "solutions"],
    microLimiters: [
      "young people (thanh thiếu niên, học sinh, sinh viên)",
      "significantly less (giảm sút rõ rệt so với thế hệ trước)",
    ],
    commonOffTopicTraps: [
      "Chỉ nêu nguyên nhân mà quên đề xuất giải pháp khả thi tương ứng.",
      "Đề xuất các giải pháp chung chung cho người lớn mà không nhắm vào đối tượng thanh thiếu niên.",
    ],
    modelIntro: {
      background:
        "In recent decades, physical activity levels among adolescents and young adults have plummeted dramatically in numerous nations worldwide.",
      thesis:
        "This alarming trend is primarily driven by the proliferation of digital entertainment and excessive academic workloads; however, it can be effectively mitigated through nationwide school curriculum reforms and community sporting initiatives.",
    },
    modelPEELBody1: {
      point:
        "The primary catalyst behind the declining physical activity among youth is the dominance of sedentary digital entertainment alongside intense academic pressure.",
      explain:
        "Modern teenagers spend excessive hours immersed in smartphones, video games, and social media platforms, which deliver instant gratification while discouraging outdoor recreation. Furthermore, highly competitive education systems compel students to dedicate evenings and weekends to private tutoring rather than athletic pursuits.",
      example:
        "For instance, recent public health surveys in East Asian nations indicate that teenagers spend over six hours daily in front of screens, resulting in widespread physical inactivity and rising adolescent obesity rates.",
      link:
        "Thus, a combination of digital addiction and heavy academic burdens has systematically displaced physical movement from youth daily routines.",
    },
    modelPEELBody2: {
      point:
        "To reverse this concerning trajectory, governments and educational authorities must implement mandatory daily sports curricula and subsidize accessible community sports infrastructure.",
      explain:
        "Schools should integrate at least one hour of compulsory, diverse physical activity into daily schedules, while municipal councils should construct free neighborhood athletic facilities to lower financial barriers for recreational exercise.",
      example:
        "A successful model is observed in Finland, where schools embed active outdoor breaks between classroom lessons, keeping youth physical fitness levels among the highest in Europe.",
      link:
        "Consequently, institutional reform in school schedules paired with accessible public facilities will re-engage young generations in active, healthy lifestyles.",
    },
    modelConclusion:
      "In conclusion, excessive screen immersion and academic demands are the core drivers of youth physical inactivity. Nonetheless, through compulsory school fitness programs and municipal sports investments, this public health crisis can be decisively resolved.",
  },
];
