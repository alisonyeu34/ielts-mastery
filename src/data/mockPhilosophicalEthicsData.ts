/**
 * Mock Data for Normative Ethics & Socio-Philosophical Framework Studio (Step 79)
 * 10 Cambridge-Level Philosophical Prompts with 3 Normative Lenses & Rawlsian Simulation Scenarios
 */

export interface NormativeLensDetail {
  philosopher: string;
  corePrinciple: string;
  argumentPerspective: string;
  c2LexicalToolkit: string[];
  sampleSentence: string;
}

export interface VeilOfIgnoranceScenario {
  title: string;
  dilemma: string;
  policyOptions: {
    id: "option_a" | "option_b" | "option_c";
    title: string;
    description: string;
    philosophicalAlignment: "Utilitarianism" | "Deontology" | "Rawlsian Justice";
    rawlsianC2Reflection: string;
  }[];
}

export interface PhilosophicalTopic {
  id: string;
  title: string;
  skillType: "writing_task2" | "speaking_part3";
  difficulty: "Band 7.5 - 8.0" | "Band 8.5+";
  prompt: string;
  normativeContext: string;
  utilitarianLens: NormativeLensDetail;
  deontologyLens: NormativeLensDetail;
  socialContractLens: NormativeLensDetail;
  c2SynthesizedModel: {
    thesisStatement: string;
    bodyParagraph: string;
    keyMarkers: string[];
  };
  veilOfIgnoranceScenario: VeilOfIgnoranceScenario;
}

export const MOCK_PHILOSOPHICAL_TOPICS: PhilosophicalTopic[] = [
  {
    id: "topic_ai_surveillance",
    title: "Algorithmic Workplace Surveillance & Cognitive Privacy",
    skillType: "writing_task2",
    difficulty: "Band 8.5+",
    prompt: "In an era of ubiquitous digital infrastructure, some corporations deploy continuous algorithmic monitoring—tracking keystrokes, biometrics, and active screen time—to optimize worker productivity.\n\nTo what extent does the maximization of economic efficiency justify the erosion of personal privacy in the workplace?",
    normativeContext: "Xung đột cốt lõi giữa Hiệu suất Kinh tế Tập thể (Utilitarianism) và Nhân phẩm / Quyền Riêng tư Bất khả Xâm phạm (Kantian Deontology).",
    utilitarianLens: {
      philosopher: "Jeremy Bentham & John Stuart Mill",
      corePrinciple: "Net Aggregate Societal Welfare & Macroeconomic Output",
      argumentPerspective: "Từ góc nhìn Vị Lợi, giám sát thuật toán có thể tăng năng suất lao động thêm 25%, giảm thiểu gian lận thời gian và hạ giá thành sản phẩm cho toàn xã hội.",
      c2LexicalToolkit: [
        "hedonic calculus",
        "aggregate economic output",
        "marginal productivity gains",
        "quantifiable efficiency dividend"
      ],
      sampleSentence: "From a strictly utilitarian standpoint, continuous surveillance ostensibly maximizes corporate output and lowers operational overheads, thereby generating a net surplus for the wider economy."
    },
    deontologyLens: {
      philosopher: "Immanuel Kant (Categorical Imperative)",
      corePrinciple: "Inviolable Human Dignity & Principle of Ends-in-Themselves",
      argumentPerspective: "Theo Nghĩa Vụ Luận, con người là cứu cánh tự thân, không bao giờ được coi là phương tiện đơn thuần phục vụ sản lượng. Giám sát liên tục là hành vi xâm phạm nhân phẩm không thể biện minh.",
      c2LexicalToolkit: [
        "categorical imperative",
        "inviolable cognitive privacy",
        "instrumentalization of labor",
        "deontic moral constraint"
      ],
      sampleSentence: "However, such an economic calculus collapses under Kantian scrutiny, for treating employees as mere instruments of productivity violates the categorical imperative of respecting human dignity."
    },
    socialContractLens: {
      philosopher: "John Rawls & Jean-Jacques Rousseau",
      corePrinciple: "The Veil of Ignorance & Asymmetric Bargaining Power",
      argumentPerspective: "Khế ước lao động hợp pháp chỉ tồn tại khi các bên có quyền lực thương lượng bình đẳng. Dưới 'Bức màn Vô tri', không công dân nào chấp nhận một xã hội nơi người lao động bị tước đoạt quyền tự chủ tinh thần.",
      c2LexicalToolkit: [
        "veil of ignorance",
        "coercive asymmetrical contract",
        "substantive autonomy",
        "civic legitimacy"
      ],
      sampleSentence: "Under a Rawlsian framework, an employment agreement forged under extreme economic precarity lacks genuine civic legitimacy, as no rational agent beneath the 'Veil of Ignorance' would sanction perpetual cognitive subjugation."
    },
    c2SynthesizedModel: {
      thesisStatement: "While continuous surveillance is ostensibly championed on utilitarian grounds of corporate efficiency, it fundamentally transgresses deontological imperatives regarding worker autonomy and subverts the ethical foundations of the employment contract.",
      bodyParagraph: "From a utilitarian perspective, corporate executives frequently argue that continuous biometric tracking minimizes logistical friction and accelerates productivity, thereby generating macro-level consumer surpluses. Nonetheless, this consequentialist defense fails when subjected to deontological critique. By reducing sentient workers into quantifiable data streams, surveillance systems commodify human consciousness, violating the Kantian principle that individuals must be treated as ends in themselves rather than mere instruments of capital accumulation.",
      keyMarkers: [
        "utilitarian perspective",
        "consequentialist defense",
        "deontological critique",
        "Kantian principle",
        "ends in themselves",
        "instruments of capital accumulation"
      ]
    },
    veilOfIgnoranceScenario: {
      title: "Phân Bổ Quyền Kiểm Soát Nơi Làm Việc (Workplace Autonomy Policy)",
      dilemma: "Xã hội đang thiết lập quy chuẩn pháp lý về quyền giám sát của tập đoàn công nghệ. Bạn phải chọn 1 trong 3 mô hình chính sách trước khi biết bạn là Tổng giám đốc hay Nhân viên hợp đồng thời vụ:",
      policyOptions: [
        {
          id: "option_a",
          title: "Mô hình Vị Lợi Tự Do (Unrestricted Utilitarian)",
          description: "Cho phép doanh nghiệp cài phần mềm giám sát 100% thời gian để tối đa hóa sản lượng GDP quốc gia.",
          philosophicalAlignment: "Utilitarianism",
          rawlsianC2Reflection: "Lựa chọn này tối đa hóa sản lượng nhưng tạo ra rủi ro khủng khiếp cho bạn nếu bạn sinh ra là người lao động bị giám sát liên tục."
        },
        {
          id: "option_b",
          title: "Mô hình Nghĩa Vụ Tuyệt Đối (Strict Deontological)",
          description: "Cấm tuyệt đối mọi hình thức theo dõi số liệu cá nhân, ưu tiên tuyệt đối quyền riêng tư dù có thể giảm tốc độ tăng trưởng.",
          philosophicalAlignment: "Deontology",
          rawlsianC2Reflection: "Lựa chọn này bảo vệ nhân phẩm tuyệt đối, đặt quyền tự do cá nhân lên trên mọi toan tính kinh tế tập thể."
        },
        {
          id: "option_c",
          title: "Mô hình Khế Ước Phân Phối (Rawlsian Balanced Compact)",
          description: "Chỉ cho phép giám sát khối lượng sản phẩm đầu ra, nghiêm cấm theo dõi sinh trắc học và đảm bảo quyền ngắt kết nối tuyệt đối sau giờ làm việc.",
          philosophicalAlignment: "Rawlsian Justice",
          rawlsianC2Reflection: "Lựa chọn này cân bằng hoàn hảo theo Bức màn Vô tri: Bảo vệ nhóm yếu thế nhất khỏi sự bóc lột tinh thần trong khi vẫn duy trì trật tự sản xuất."
        }
      ]
    }
  },
  {
    id: "topic_gene_editing",
    title: "Germline Genetic Engineering & Biological Stratification",
    skillType: "writing_task2",
    difficulty: "Band 8.5+",
    prompt: "Recent breakthroughs in CRISPR-Cas9 allow for the genetic modification of human embryos, promising to eradicate hereditary diseases but also raising the prospect of 'designer babies' for the wealthy.\n\nShould governments permit human germline gene editing, or does it pose an unacceptable ethical threat to human equality?",
    normativeContext: "Xung đột giữa Phúc lợi Y tế (Utilitarian Disease Eradication) và Nguy cơ Bất bình đẳng Sinh học Vĩnh viễn (Rawlsian Genetic Aristocracy).",
    utilitarianLens: {
      philosopher: "John Stuart Mill (Utilitarian Bioethics)",
      corePrinciple: "Alleviation of Suffering & Disease Burden Minimization",
      argumentPerspective: "Xóa bỏ các căn bệnh di truyền quái ác (Huntington, xơ nang) sẽ giúp giảm gánh nặng y tế hàng nghìn tỷ đô la và nâng cao chất lượng cuộc sống ròng cho hàng triệu gia đình.",
      c2LexicalToolkit: [
        "alleviation of existential suffering",
        "disease burden minimization",
        "hedonic surplus",
        "biomedical utility"
      ],
      sampleSentence: "Utilitarian ethicists argue that germline therapies offer an unprecedented mechanism to eradicate debilitating hereditary pathologies, thereby producing immense aggregate welfare gains."
    },
    deontologyLens: {
      philosopher: "Jürgen Habermas & Immanuel Kant",
      corePrinciple: "Species Ethics & The Right to an Open Future",
      argumentPerspective: "Can thiệp vào bộ gen phôi thai biến đứa trẻ thành 'sản phẩm thiết kế' theo ý muốn của cha mẹ, tước đoạt quyền tự quyết sinh học nguyên bản và sự bình đẳng căn bản giữa các thế hệ.",
      c2LexicalToolkit: [
        "biological self-determination",
        "commodification of human progeny",
        "categorical prohibition",
        "intergenerational dignity"
      ],
      sampleSentence: "Conversely, deontological species ethics posits that modifying the germline commodifies future generations, irrevocably undermining their inherent right to an open, unprogrammed future."
    },
    socialContractLens: {
      philosopher: "John Rawls (Distributive Natural Lotteries)",
      corePrinciple: "Mitigation of Arbitrary Biological Advantages",
      argumentPerspective: "Bộ gen tự nhiên là một 'xổ số sinh học'. Nếu công nghệ chỉnh sửa gen được thương mại hóa cho tầng lớp thượng lưu, nó sẽ biến bất bình đẳng kinh tế thành bất bình đẳng sinh thái sinh học vĩnh cửu.",
      c2LexicalToolkit: [
        "natural lottery of birth",
        "hereditary biological stratification",
        "unbridgeable caste system",
        "egalitarian difference principle"
      ],
      sampleSentence: "From a Rawlsian vantage point, commercialized germline enhancement would convert socio-economic disparity into an unbridgeable biological caste system, directly violating the difference principle."
    },
    c2SynthesizedModel: {
      thesisStatement: "Although genetic intervention possesses profound utilitarian merit in eradicating congenital afflictions, unregulated enhancement threatens to inaugurate a permanent biological caste system, thereby violating foundational Rawlsian egalitarianism.",
      bodyParagraph: "Advocates of genetic therapy legitimately emphasize the immense utilitarian surplus realized when lethal monogenic disorders are eliminated at conception. Nonetheless, this health calculus collapses when the technology transcends therapy into non-medical cognitive and physiological enhancement. Under a Rawlsian analysis of distributive justice, permitting affluent elites to genetically augment their progeny translates arbitrary financial privilege into immutable biological superiority, dismantling the democratic ideal of equality of opportunity.",
      keyMarkers: [
        "utilitarian surplus",
        "health calculus",
        "Rawlsian analysis of distributive justice",
        "distributive justice",
        "arbitrary financial privilege",
        "immutable biological superiority"
      ]
    },
    veilOfIgnoranceScenario: {
      title: "Chính Sách Điều Tiết Công Nghệ Gen Phôi Thai (CRISPR Policy Compact)",
      dilemma: "Xã hội chuẩn bị thông qua đạo luật điều chỉnh công nghệ chỉnh sửa gen. Bạn phải chọn trước khi biết mình là con của tỷ phú hay con của gia đình nghèo vùng sâu vùng xa:",
      policyOptions: [
        {
          id: "option_a",
          title: "Tự Do Hóa Thương Mại (Laissez-Faire Biomedical)",
          description: "Cho phép bất kỳ ai có tiền được tự do chỉnh sửa ngoại hình, trí thông minh và sức mạnh thể chất cho con cái.",
          philosophicalAlignment: "Utilitarianism",
          rawlsianC2Reflection: "Mô hình này thúc đẩy đổi mới y học nhanh nhất nhưng sẽ biến con cái người nghèo thành tầng lớp hạ đẳng sinh học vĩnh viễn."
        },
        {
          id: "option_b",
          title: "Cấm Đoán Toàn Diện (Categorical Ban)",
          description: "Cấm tuyệt đối mọi can thiệp gen trên phôi người, chấp nhận để các bệnh di truyền tiếp tục tồn tại.",
          philosophicalAlignment: "Deontology",
          rawlsianC2Reflection: "Bảo vệ sự bình đẳng tự nhiên nhưng bỏ lỡ cơ hội cứu hàng triệu người khỏi các bệnh hiểm nghèo đau đớn."
        },
        {
          id: "option_c",
          title: "Công Bằng Bù Đắp (Rawlsian Public Therapeutic Monopsony)",
          description: "Nhà nước tài trợ 100% chỉnh sửa gen cho các bệnh hiểm nghèo, đồng thời hình sự hóa mọi hình thức chỉnh sửa nâng cấp thẩm mỹ thương mại.",
          philosophicalAlignment: "Rawlsian Justice",
          rawlsianC2Reflection: "Lựa chọn chuẩn mực theo Bức màn Vô tri: Đạt tối đa phúc lợi chữa bệnh trong khi bảo vệ bình đẳng xã hội cho đứa trẻ sinh ra trong bất kỳ gia đình nào."
        }
      ]
    }
  },
  {
    id: "topic_universal_basic_income",
    title: "Universal Basic Income (UBI) & Post-Scarcity Distributive Justice",
    skillType: "writing_task2",
    difficulty: "Band 8.5+",
    prompt: "As artificial intelligence automates vast swathes of cognitive and physical labor, several economists propose implementing a Universal Basic Income (UBI) funded by progressive automation taxes.\n\nDo the socioeconomic benefits of UBI outweigh its potential drawbacks on individual work ethic and fiscal sustainability?",
    normativeContext: "Định hình lại Khế ước Xã hội trong kỷ nguyên tự động hóa: An sinh tối thiểu vô điều kiện (Rawlsian Safety Floor) vs Trách nhiệm cống hiến lao động.",
    utilitarianLens: {
      philosopher: "John Stuart Mill & Contemporary Economists",
      corePrinciple: "Macroeconomic Demand Stabilization & Friction Reduction",
      argumentPerspective: "UBI duy trì sức mua của người tiêu dùng khi thất nghiệp công nghệ gia tăng, giảm chi phí hành chính quan liêu của các gói trợ cấp phức tạp.",
      c2LexicalToolkit: [
        "macroeconomic demand stabilization",
        "administrative friction reduction",
        "consumption floor",
        "counter-cyclical stabilizer"
      ],
      sampleSentence: "From a utilitarian viewpoint, establishing a universal income floor bolsters aggregate consumer demand and mitigates the macroeconomic shock of structural technological unemployment."
    },
    deontologyLens: {
      philosopher: "John Locke & The Protestant Work Ethic",
      corePrinciple: "Moral Reciprocity & The Duty to Labor",
      argumentPerspective: "Phê phán nghĩa vụ luận: Tước đoạt động lực lao động làm xói mòn trách nhiệm đóng góp tương hỗ và nhân phẩm gắn liền với sự nỗ lực của cá nhân.",
      c2LexicalToolkit: [
        "moral reciprocity",
        "dignity of productive labor",
        "unearned entitlements",
        "civic contribution duty"
      ],
      sampleSentence: "Critiques grounded in Lockean duty argue that unconditional stipends sever the essential nexus between personal endeavor and civic reward, undermining the moral dignity derived from labor."
    },
    socialContractLens: {
      philosopher: "John Rawls (Difference Principle)",
      corePrinciple: "The Veil of Ignorance & Inalienable Subsistence Rights",
      argumentPerspective: "Khi của cải do AI tạo ra là tài sản chung của nhân loại, việc đảm bảo mức sống cơ bản vô điều kiện cho người yếu thế là nghĩa vụ công bằng phân phối tối cao.",
      c2LexicalToolkit: [
        "inalienable subsistence baseline",
        "social dividend of automation",
        "Rawlsian difference principle",
        "emancipation from wage slavery"
      ],
      sampleSentence: "According to Rawlsian distributive justice, distributing an automated social dividend is a mandatory civic obligation to maximize the welfare baseline of the least advantaged."
    },
    c2SynthesizedModel: {
      thesisStatement: "While critics emphasize traditional Lockean duties of reciprocal labor, the implementation of UBI represents a vital Rawlsian adaptation of the social contract to prevent catastrophic deprivation in an automated economy.",
      bodyParagraph: "Opponents frequently argue that unconditional stipends erode the moral reciprocity that binds citizens to productive labor. However, this classical critique becomes obsolete in an automated economy where capital owners capture disproportionate surpluses through algorithmic productivity. Within a modernized Rawlsian framework, UBI functions not as mere charity, but as a legitimate civic dividend—reallocating the collective dividends of technological progress to guarantee that the least advantaged retain substantive autonomy and economic survival.",
      keyMarkers: [
        "Lockean duties of reciprocal labor",
        "modernized Rawlsian framework",
        "civic dividend",
        "substantive autonomy",
        "social contract"
      ]
    },
    veilOfIgnoranceScenario: {
      title: "Phân Phối Lợi Tức Tự Động Hóa (Automation Dividend Framework)",
      dilemma: "Robot và AI sẽ thay thế 40% việc làm. Bạn phải chọn chính sách an sinh trước khi biết bạn là chủ sở hữu bằng sáng chế AI hay là công nhân vừa mất việc:",
      policyOptions: [
        {
          id: "option_a",
          title: "Thị Trường Thuần Túy (No Safety Net)",
          description: "Để thị trường tự điều tiết, ai mất việc phải tự học nghề mới mà không có trợ cấp vô điều kiện.",
          philosophicalAlignment: "Utilitarianism",
          rawlsianC2Reflection: "Nếu bạn rơi vào nhóm mất việc ở tuổi 50, bạn sẽ rơi vào cảnh bần cùng tuyệt đối."
        },
        {
          id: "option_b",
          title: "Trợ Cấp Có Điều Kiện Nghiêm Ngặt (Conditional Welfare)",
          description: "Chỉ phát tiền cho người chứng minh được mình đang đi nộp hồ sơ xin việc hàng tuần.",
          philosophicalAlignment: "Deontology",
          rawlsianC2Reflection: "Tạo ra bộ máy quan liêu tốn kém và gây tổn thương nhân phẩm cho người nhận trợ cấp."
        },
        {
          id: "option_c",
          title: "Thu Nhập Phổ Quát Vô Điều Kiện (Rawlsian UBI)",
          description: "Đánh thuế tự động hóa 15% để cấp mức lương tối thiểu sống được cho mọi công dân bất kể hoàn cảnh.",
          philosophicalAlignment: "Rawlsian Justice",
          rawlsianC2Reflection: "Lựa chọn tối ưu dưới Bức màn Vô tri: Đảm bảo bạn không bao giờ bị chết đói dù nền kinh tế biến động thế nào."
        }
      ]
    }
  },
  {
    id: "topic_progressive_taxation",
    title: "Progressive Wealth Taxation & The Legitimacy of Wealth Accumulation",
    skillType: "writing_task2",
    difficulty: "Band 7.5 - 8.0",
    prompt: "Some argue that imposing steep progressive wealth taxes on billionaires disincentivizes innovation, while others maintain that extreme wealth concentration threatens democratic institutions.\n\nDiscuss both views and give your opinion.",
    normativeContext: "Xung đột giữa Quyền Sở hữu Tư nhân Tự do (Nozickian Libertarian Entitlement) và Công bằng Phân phối Dân chủ (Rawlsian Distributive Equity).",
    utilitarianLens: {
      philosopher: "Utilitarian Public Finance",
      corePrinciple: "Diminishing Marginal Utility of Wealth",
      argumentPerspective: "Một triệu đô la đối với tỷ phú mang lại rất ít lợi ích cận biên, nhưng một triệu đô đó đầu tư vào trường học công sẽ tạo ra thặng dư hạnh phúc khổng lồ cho hàng ngàn trẻ em.",
      c2LexicalToolkit: ["diminishing marginal utility", "aggregate social return", "optimal fiscal redistribution", "infrastructure multiplier"],
      sampleSentence: "Applying the law of diminishing marginal utility, redistributing capital from ultra-high-net-worth individuals to public education yields exponential aggregate societal benefits."
    },
    deontologyLens: {
      philosopher: "Robert Nozick (Libertarian Rights)",
      corePrinciple: "Self-Ownership & Non-Aggression Principle",
      argumentPerspective: "Nếu của cải được tạo ra thông qua các giao dịch tự nguyện hợp pháp, việc nhà nước cưỡng chế tịch thu một phần lớn là vi phạm quyền sở hữu tài sản tự thân.",
      c2LexicalToolkit: ["inviolable property rights", "just acquisition", "uncoerced voluntary exchange", "confiscatory taxation"],
      sampleSentence: "Libertarian ethicists contend that confiscatory taxation constitutes an unjust coercion, infringing upon the inviolable property rights established through uncoerced market exchange."
    },
    socialContractLens: {
      philosopher: "John Rawls & Thomas Piketty",
      corePrinciple: "Democratic Plutocracy Prevention",
      argumentPerspective: "Khối tài sản khổng lồ không thể tồn tại nếu không có cơ sở hạ tầng, pháp luật và sự ổn định do xã hội cung cấp. Thuế tài sản là khoản tái đầu tư bắt buộc để bảo vệ khế ước dân chủ.",
      c2LexicalToolkit: ["systemic wealth concentration", "oligarchic capture", "democratic reciprocity", "difference principle"],
      sampleSentence: "Under a Rawlsian framework, extreme wealth concentration inevitably subverts democratic parity, justifying progressive levies to ensure that economic inequalities work to the benefit of the least advantaged."
    },
    c2SynthesizedModel: {
      thesisStatement: "While libertarian theorists assert the inviolability of justly acquired wealth, the principle of diminishing marginal utility and the necessity of preventing plutocratic capture overwhelmingly justify progressive wealth levies.",
      bodyParagraph: "From a libertarian standpoint, excessive wealth taxation penalizes entrepreneurial innovation and infringes upon voluntary property agreements. However, this individualist defense overlooks the collective infrastructure that enables immense capital accumulation in the first place. When analyzed through Rawlsian distributive justice, unrestrained wealth concentration fosters systemic oligarchy, eroding democratic parity. Therefore, progressive taxation is essential to uphold the social contract, channeling surplus capital into public goods that maximize opportunities for disadvantaged citizens.",
      keyMarkers: ["libertarian standpoint", "Rawlsian distributive justice", "unrestrained wealth concentration", "social contract", "diminishing marginal utility"]
    },
    veilOfIgnoranceScenario: {
      title: "Biểu Thuế Thu Nhập & Tài Sản Quốc Gia (Tax Policy Compact)",
      dilemma: "Xã hội đang xây dựng biểu thuế tài sản. Hãy chọn mức thuế trước khi biết bạn là tỷ phú thừa kế hay công nhân làm công ăn lương:",
      policyOptions: [
        {
          id: "option_a",
          title: "Thuế Đồng Phẳng 10% (Flat Tax Rate)",
          description: "Mọi người đều đóng 10% bất kể kiếm được 10 triệu hay 100 tỷ mỗi năm.",
          philosophicalAlignment: "Utilitarianism",
          rawlsianC2Reflection: "10% đối với người nghèo là tiền mua thức ăn, trong khi với người giàu là không đáng kể."
        },
        {
          id: "option_b",
          title: "Thuế Tịch Thu 90% (Confiscatory Equalization)",
          description: "Đánh thuế 90% tất cả thu nhập trên 1 tỷ đồng để san bằng của cải xã hội.",
          philosophicalAlignment: "Deontology",
          rawlsianC2Reflection: "Triệt tiêu toàn bộ động lực làm việc và sáng tạo của các doanh nhân tài năng."
        },
        {
          id: "option_c",
          title: "Thuế Lũy Tiến Tối Ưu (Rawlsian Progressive Model)",
          description: "Miễn thuế cho người thu nhập thấp, đánh thuế lũy tiến 35-50% cho tầng lớp giàu có để tài trợ y tế và giáo dục miễn phí.",
          philosophicalAlignment: "Rawlsian Justice",
          rawlsianC2Reflection: "Lựa chọn an toàn và nhân văn nhất: Giữ động lực làm giàu trong khi đảm bảo người yếu thế nhất luôn được hỗ trợ phát triển."
        }
      ]
    }
  }
];
