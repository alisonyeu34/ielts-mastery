export interface ToulminElements {
  claim: string;
  data: string;
  warrant: string;
  backing: string;
  counterArgument: string;
  rebuttal: string;
}

export type RebuttalTacticKey =
  | "feasibility"
  | "unintended_consequences"
  | "superior_alternative"
  | "internal_contradiction";

export interface RebuttalTacticOption {
  key: RebuttalTacticKey;
  tacticNameVi: string;
  tacticNameEn: string;
  starterPhrase: string;
  sampleRebuttal: string;
  rationale: string;
}

export interface ToulminPromptData {
  id: string;
  topicTitle: string;
  promptText: string;
  essayType: string;
  sampleToulmin: ToulminElements;
  sampleCounterArguments: Array<{
    id: string;
    counterStatement: string;
    tactics: Record<RebuttalTacticKey, RebuttalTacticOption>;
  }>;
  modelAssembledStandard: string;
  modelAssembledCounterFirst: string;
  band8KeyPhrases: string[];
}

export const MOCK_TOULMIN_PROMPTS: ToulminPromptData[] = [
  {
    id: "toulmin_automation_tax",
    topicTitle: "Automation Tax & Artificial Intelligence",
    promptText:
      "To protect human employment from rapid artificial intelligence integration, some economists argue that governments should levy a high tax on corporations replacing human workers with robots. To what extent do you agree or disagree?",
    essayType: "Opinion (Disagree)",
    sampleToulmin: {
      claim:
        "Levying a punitive tax on automated robotics is fundamentally counterproductive to sustainable national economic competitiveness.",
      data:
        "Empirical studies across OECD economies demonstrate that nations with the highest robot density, such as South Korea and Germany, consistently maintain lower manufacturing unemployment rates alongside higher wage growth.",
      warrant:
        "This outcome occurs because automation lowers unit production costs, stimulating consumer demand and spawning auxiliary high-value industries that expand overall net employment.",
      backing:
        "Classic economic principles of creative destruction indicate that technological capital accumulation drives long-term productivity and prosperity.",
      counterArgument:
        "Admittedly, proponents of a robot tax legitimately contend that rapid automation causes acute transitional friction and sudden income loss for low-skilled manual laborers.",
      rebuttal:
        "However, penalizing technological innovation fails to address the root issue of skill deficits; instead, governments should fund universal technical retraining subsidized by broad-based corporate profit taxes rather than stifling capital investment.",
    },
    sampleCounterArguments: [
      {
        id: "ca_unemployment_shock",
        counterStatement:
          "Automation creates immediate structural unemployment for vulnerable factory workers who cannot adapt quickly.",
        tactics: {
          feasibility: {
            key: "feasibility",
            tacticNameVi: "Bác bỏ bằng Tính khả thi kém",
            tacticNameEn: "Feasibility Flaw",
            starterPhrase: "However, defining what constitutes a 'job-displacing robot' is practically unenforceable...",
            sampleRebuttal:
              "However, distinguishing between software that replaces labor and software that enhances worker efficiency is technically impossible, rendering tax enforcement completely arbitrary.",
            rationale: "Chỉ ra việc định nghĩa 'robot' để thu thuế trong thực tế là bất khả thi.",
          },
          unintended_consequences: {
            key: "unintended_consequences",
            tacticNameVi: "Bác bỏ bằng Hệ quả ngoài ý muốn",
            tacticNameEn: "Long-term Unintended Consequences",
            starterPhrase: "Such a punitive policy would inevitably trigger severe economic repercussions...",
            sampleRebuttal:
              "Such a punitive policy would inevitably prompt domestic enterprises to offshore their operations to competitor nations with lenient tech regulations, causing a catastrophic net loss in domestic tax revenues.",
            rationale: "Cảnh báo nguy cơ chảy máu doanh nghiệp và công nghệ ra nước ngoài.",
          },
          superior_alternative: {
            key: "superior_alternative",
            tacticNameVi: "Bác bỏ bằng Giải pháp thay thế ưu việt",
            tacticNameEn: "Superior Policy Alternative",
            starterPhrase: "Rather than disincentivizing modernization, a more constructive approach is...",
            sampleRebuttal:
              "Rather than penalizing automation, state authorities should leverage general corporate revenue to subsidize lifelong STEM scholarships and vocational apprenticeship programs.",
            rationale: "Đề xuất giải pháp đào tạo chuyển đổi nghề thay vì cấm đoán công nghệ.",
          },
          internal_contradiction: {
            key: "internal_contradiction",
            tacticNameVi: "Bác bỏ bằng Mâu thuẫn nội tại",
            tacticNameEn: "Internal Inconsistency",
            starterPhrase: "This reasoning rests on the flawed premise that human labor is a fixed pie...",
            sampleRebuttal:
              "This reasoning commits the classic Luddite fallacy by assuming the total volume of jobs in an economy is static, ignoring how automation lowers prices and generates entirely new consumer industries.",
            rationale: "Bẻ gãy ngụy biện coi thị trường lao động là một chiếc bánh cố định.",
          },
        },
      },
    ],
    modelAssembledStandard:
      "Levying a punitive tax on automated robotics is fundamentally counterproductive to sustainable national economic competitiveness. Empirical studies across OECD economies demonstrate that nations with the highest robot density, such as South Korea and Germany, consistently maintain lower manufacturing unemployment rates alongside higher wage growth. This outcome occurs because automation lowers unit production costs, which stimulates broader consumer demand and spawns auxiliary technical sectors that expand net employment. This principle is underpinned by economic theories of capital accumulation driving long-term productivity. Admittedly, proponents legitimately point out that rapid automation causes transitional disruption for low-skilled laborers. However, penalizing technological innovation fails to address the underlying skill deficit; instead, governments should fund targeted vocational retraining through general corporate revenues rather than stifling productive investment.",
    modelAssembledCounterFirst:
      "Admittedly, it is frequently asserted that an automation tax is imperative to cushion the transitional shock experienced by displaced manual laborers. However, this premise commits the classic economic fallacy of treating human labor as a fixed quantity. In reality, empirical data from leading industrial nations reveals that high automation density directly correlates with robust wage expansion and lower long-term unemployment. The underlying mechanism is that robotics drastically reduce marginal production costs, thereby enabling enterprises to reinvest surplus capital into novel high-skilled services. Consequently, rather than penalizing technological modernization, state authorities should prioritize vocational upskilling programs to ensure workforce adaptability.",
    band8KeyPhrases: [
      "punitive tax on automated robotics",
      "fundamentally counterproductive",
      "empirical studies across OECD economies",
      "underlying mechanism is that",
      "transitional friction and displacement",
      "commits the classic fallacy of",
      "superior policy alternative",
    ],
  },
  {
    id: "toulmin_space_exploration",
    topicTitle: "Space Exploration vs Earthly Crises",
    promptText:
      "Some people believe that spending billions of dollars on space exploration is unjustified when there are critical unsolved problems on Earth such as poverty and climate change. To what extent do you agree or disagree?",
    essayType: "Discussion & Opinion",
    sampleToulmin: {
      claim:
        "Investing in space exploration is not an extravagant indulgence, but rather an essential catalyst for solving complex terrestrial ecological and technological challenges.",
      data:
        "Technologies initially pioneered for space missions—including photovoltaic solar cells, water purification filtration, and orbital climate-monitoring satellites—are now the primary tools utilized to combat global global warming and drought.",
      warrant:
        "The extreme constraints of extraterrestrial environments compel scientists to innovate radical resource-efficiency breakthroughs that would rarely emerge under conventional commercial research conditions.",
      backing:
        "Historical innovation data shows that every dollar invested in aerospace generates an estimated eightfold return in downstream commercial technology patents.",
      counterArgument:
        "Opponents understandably argue that direct humanitarian funding toward immediate poverty alleviation yields more instantaneous relief for underprivileged populations.",
      rebuttal:
        "Nonetheless, direct aid merely treats immediate symptoms, whereas space-derived innovations in satellite agricultural forecasting and renewable energy provide the structural, long-term foundations necessary to eradicate systemic poverty permanently.",
    },
    sampleCounterArguments: [
      {
        id: "ca_immediate_poverty",
        counterStatement:
          "Directing billions to space when children are starving on Earth is morally irresponsible.",
        tactics: {
          feasibility: {
            key: "feasibility",
            tacticNameVi: "Bác bỏ bằng Tính khả thi",
            tacticNameEn: "Feasibility Flaw",
            starterPhrase: "However, cancelling space budgets would not automatically redirect funds to humanitarian causes...",
            sampleRebuttal:
              "However, national budget allocations are not zero-sum; terminating space initiatives would disperse funds across military spending rather than directly feeding the impoverished.",
            rationale: "Chỉ ra việc cắt ngân sách vũ trụ không đồng nghĩa với tiền chuyển sang cứu trợ.",
          },
          unintended_consequences: {
            key: "unintended_consequences",
            tacticNameVi: "Bác bỏ bằng Hệ quả lâu dài",
            tacticNameEn: "Long-term Consequences",
            starterPhrase: "Halting space investment would critically blind global climate agencies...",
            sampleRebuttal:
              "Halting space research would dismantle orbital earth-monitoring satellite networks, making it impossible to forecast catastrophic climate disasters that disproportionately devastate developing nations.",
            rationale: "Cảnh báo việc mất vệ tinh theo dõi khí hậu sẽ hại chính người nghèo.",
          },
          superior_alternative: {
            key: "superior_alternative",
            tacticNameVi: "Bác bỏ bằng Giải pháp cốt lõi",
            tacticNameEn: "Superior Alternative",
            starterPhrase: "A more comprehensive perspective reveals that space technology is the very tool needed...",
            sampleRebuttal:
              "Space technology provides the precise GPS agriculture and weather-tracking tools required to optimize crop yields and permanently eliminate global food insecurity.",
            rationale: "Chứng minh công nghệ vũ trụ chính là chìa khóa giải quyết nạn đói.",
          },
          internal_contradiction: {
            key: "internal_contradiction",
            tacticNameVi: "Bác bỏ bằng Mâu thuẫn logic",
            tacticNameEn: "Internal Inconsistency",
            starterPhrase: "This critique creates a false dichotomy between scientific advancement and humanitarian aid...",
            sampleRebuttal:
              "This perspective falsely presumes that advancing foundational science and combating poverty are mutually exclusive, ignoring that all modern poverty reduction stems from technological breakthroughs.",
            rationale: "Vạch trần ngụy biện phân cực giả tạo giữa khoa học và cứu trợ.",
          },
        },
      },
    ],
    modelAssembledStandard:
      "Investing in space exploration is not an extravagant indulgence, but rather an indispensable catalyst for resolving severe terrestrial crises. Technologies originally pioneered for aerospace endeavors—ranging from high-efficiency solar cells to orbital weather-monitoring satellites—represent the frontline mechanisms currently deployed against climate volatility and agricultural disruption. The underlying rationale is that the hostile vacuum of space necessitates extreme resource-efficiency breakthroughs that would seldom materialize under routine commercial market pressures. This correlation is backed by economic data indicating that aerospace expenditure yields massive downstream multiplier effects across civilian industries. Admittedly, critics argue that finite public funds should be channeled exclusively toward immediate famine and poverty relief. Nonetheless, humanitarian aid merely addresses surface symptoms, whereas space-derived satellite data and renewable technologies provide the systemic infrastructure required to eradicate food insecurity permanently.",
    modelAssembledCounterFirst:
      "Admittedly, skeptics frequently assert that allocating vast capital to extraterrestrial missions is unconscionable when acute poverty persists on Earth. However, this argument rests on a flawed zero-sum dichotomy between scientific exploration and social welfare. In reality, modern poverty alleviation is intimately dependent on space-derived innovations, such as satellite-guided precision agriculture and global communication constellations. The fundamental mechanism is that extreme aerospace environments force radical breakthroughs in clean water filtration and energy density that civilian laboratories rarely prioritize. Therefore, far from diverting resources from earthly issues, space exploration equips humanity with the essential technological arsenal to overcome them.",
    band8KeyPhrases: [
      "not an extravagant indulgence",
      "indispensable catalyst for resolving",
      "extreme resource-efficiency breakthroughs",
      "aerospace expenditure yields massive multiplier effects",
      "flawed zero-sum dichotomy",
      "systemic infrastructure required to eradicate",
    ],
  },
  {
    id: "toulmin_free_university",
    topicTitle: "Universal Free Higher Education",
    promptText:
      "Some educational theorists propose that university tuition should be completely free for all students, regardless of their family background. To what extent do you agree or disagree?",
    essayType: "Opinion (Partially Agree / Calibrated)",
    sampleToulmin: {
      claim:
        "Universal free higher education should not be extended blindly to affluent households; instead, state funding should be targeted progressively toward disadvantaged demographics.",
      data:
        "Fiscal data from nations implementing blanket free tuition, such as Scotland and parts of Scandinavia, shows that wealthy students continue to capture a disproportionate share of elite university admissions while university budgets face acute per-student funding deficits.",
      warrant:
        "Blanket subsidies act as a regressive transfer of wealth from general taxpayers to future high-earning graduates who possess the personal resources to fund their own degrees.",
      backing:
        "Public finance economic theory confirms that targeted means-tested subsidies maximize social equity while preserving institutional academic quality.",
      counterArgument:
        "Advocates of universal free college argue that removing all upfront fees completely eliminates financial anxiety and establishes education as a fundamental civic right for every citizen.",
      rebuttal:
        "While eliminating upfront barriers is noble, blanket free tuition invariably dilutes educational quality through severe institutional underfunding, making targeted income-contingent loans and full scholarships for low-income students a far more equitable mechanism.",
    },
    sampleCounterArguments: [
      {
        id: "ca_universal_right",
        counterStatement:
          "Higher education is a human right, so charging any tuition fees is inherently discriminatory.",
        tactics: {
          feasibility: {
            key: "feasibility",
            tacticNameVi: "Bác bỏ bằng Tính khả thi tài khóa",
            tacticNameEn: "Fiscal Sustainability",
            starterPhrase: "However, the fiscal strain of blanket subsidies inevitably leads to...",
            sampleRebuttal:
              "However, fully funding every student irrespective of wealth strains national treasuries, inevitably forcing universities to cap enrollment and freeze faculty salaries, which compromises academic excellence.",
            rationale: "Chỉ ra việc miễn học phí đại trà làm suy kiệt ngân sách trường đại học.",
          },
          unintended_consequences: {
            key: "unintended_consequences",
            tacticNameVi: "Bác bỏ bằng Nghịch lý bất bình đẳng",
            tacticNameEn: "Regressive Redistribution",
            starterPhrase: "This policy inadvertently results in a regressive subsidy...",
            sampleRebuttal:
              "This policy paradoxically uses taxes collected from working-class citizens to subsidize the education of affluent children who already enjoy substantial systemic advantages.",
            rationale: "Vạch trần việc dùng tiền thuế của người nghèo để tài trợ cho con nhà giàu.",
          },
          superior_alternative: {
            key: "superior_alternative",
            tacticNameVi: "Bác bỏ bằng Giải pháp Học bổng lũy tiến",
            tacticNameEn: "Targeted Aid",
            starterPhrase: "A far more equitable mechanism is income-contingent loans paired with...",
            sampleRebuttal:
              "A far more progressive model is charging tuition based on parental income while granting 100% means-tested stipends and living grants to underprivileged scholars.",
            rationale: "Đề xuất chính sách học bổng phân tầng theo thu nhập gia đình.",
          },
          internal_contradiction: {
            key: "internal_contradiction",
            tacticNameVi: "Bác bỏ bằng Mâu thuẫn chất lượng",
            tacticNameEn: "Quality Paradox",
            starterPhrase: "Treating higher education as entirely free often degrades the very value...",
            sampleRebuttal:
              "Treating tertiary education as free without sufficient state revenue degrades the quality of degrees, ultimately harming the career prospects of the very disadvantaged students it intended to empower.",
            rationale: "Mâu thuẫn: Miễn phí nhưng làm giảm chất lượng bằng cấp của người nghèo.",
          },
        },
      },
    ],
    modelAssembledStandard:
      "Universal free higher education should not be extended indiscriminately to affluent households; rather, state educational funding must be targeted progressively toward underprivileged demographics. Fiscal data from jurisdictions implementing blanket free tuition reveals that wealthy students continue to capture a disproportionate quota of prestigious university seats, while institutions grapple with severe per-student budgetary constraints. The underlying economic logic is that blanket subsidies function as a regressive redistribution, channeling tax revenues collected from general workers toward future high-earning graduates. This mechanism is reinforced by public finance principles dictating that means-tested aid maximizes equity without degrading academic standards. Admittedly, proponents argue that eliminating tuition entirely guarantees higher education as an unconditional civic right. However, blanket subsidies inevitably dilute university research quality through underfunding, rendering generous need-based scholarships and income-contingent repayments a vastly superior policy vehicle.",
    modelAssembledCounterFirst:
      "Admittedly, it is widely contended that higher education should be unconditionally free to eliminate all socioeconomic barriers to entry. However, this egalitarian ideal overlooks the harsh fiscal realities of tertiary institutional funding. In practice, blanket free tuition paradoxically functions as a regressive wealth transfer, wherein general taxpayers subsidize the degrees of affluent youths who already possess ample financial resources. The critical mechanism is that without tuition revenue, universities are forced to implement enrollment caps and cut laboratory budgets, directly degrading educational quality. Therefore, a targeted approach combining means-tested grants for disadvantaged students with progressive tuition for wealthy families represents a vastly more sustainable solution.",
    band8KeyPhrases: [
      "not be extended indiscriminately",
      "targeted progressively toward underprivileged demographics",
      "blanket subsidies function as a regressive redistribution",
      "means-tested aid maximizes equity",
      "dilute university research quality through underfunding",
      "income-contingent repayments",
    ],
  },
];
