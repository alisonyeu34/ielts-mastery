/**
 * Mock Data for Adversarial Examiner Interruption & Paradox Navigation Studio
 * Step 94 / 100 - High-Stakes Oral Assessment & Tactful Interruption Defense (Band 7.5 - 8.5+)
 */

export interface AdversarialScenario {
  id: string;
  topicTitle: string;
  subTheme: string;
  examiner: {
    name: string;
    title: string;
    avatarUrl?: string;
    demeanor: string;
    accent: string;
  };
  openingQuestion: string;
  suggestedOpeningPoints: string[];
  interruptionPlan: {
    triggerSecondMin: number; // e.g., 20
    triggerSecondMax: number; // e.g., 32
    interruptionPrompt: string; // The words spoken by examiner
    paradoxType: 'economic_dilemma' | 'liberty_vs_security' | 'efficiency_vs_equity' | 'tradition_vs_progress' | 'individual_vs_collective';
    paradoxExplanationVi: string;
    recommendedPivotType: 'counter_concession' | 'paradox_resolution' | 'qualifier_reframe';
    modelBand85PivotResponse: string;
    keyVocabulary: Array<{ word: string; ipa: string; meaning: string; c1Usage: string }>;
  };
}

export const MOCK_ADVERSARIAL_SCENARIOS: AdversarialScenario[] = [
  {
    id: 'adv-01',
    topicTitle: 'Artificial Intelligence & Cognitive Labor',
    subTheme: 'Technological Unemployment vs Economic Evolution',
    examiner: {
      name: 'Dr. Alistair Finch',
      title: 'Senior Examiner & Dialectician (Cambridge ESOL)',
      demeanor: 'Skeptical, incisive, and prone to challenging over-generalized optimism.',
      accent: 'British Received Pronunciation (RP)'
    },
    openingQuestion: 'Do you believe that artificial intelligence will inevitably cause mass unemployment in white-collar professions, or will it simply create higher-level job categories?',
    suggestedOpeningPoints: [
      'Historical precedence of industrial revolutions creating net new jobs.',
      'Cognitive tasks vs routine automation.',
      'The speed of AI adoption surpassing historical retraining cycles.'
    ],
    interruptionPlan: {
      triggerSecondMin: 22,
      triggerSecondMax: 30,
      interruptionPrompt: 'Forgive me for interrupting, but if retraining takes decades while AI models advance exponentially in months, isn’t that historical analogy fundamentally flawed?',
      paradoxType: 'efficiency_vs_equity',
      paradoxExplanationVi: 'Nghịch lý: Lấy tiền lệ lịch sử (Cách mạng công nghiệp thế kỷ 19) để bao biện cho sự dịch chuyển lao động, trong khi tốc độ cấp số nhân của AI hiện nay không cho phép chu kỳ đào tạo lại kịp thích ứng.',
      recommendedPivotType: 'counter_concession',
      modelBand85PivotResponse: 'That is indeed a legitimate critique regarding velocity; however, the crux of the transition does not demand overnight retraining, but rather institutional restructuring, such as prompt-engineering curricula and human-in-the-loop oversight frameworks.',
      keyVocabulary: [
        { word: 'exponential velocity', ipa: '/ˌek.spəˈnen.ʃəl vəˈlɒs.ə.ti/', meaning: 'tốc độ cấp số nhân', c1Usage: 'The exponential velocity of technological disruption.' },
        { word: 'fundamental caveat', ipa: '/ˌfʌn.dəˈmen.təl ˈkæv.i.æt/', meaning: 'điều cảnh báo / ngoại lệ cốt lõi', c1Usage: 'That introduces a fundamental caveat to classical economic theory.' },
        { word: 'human-in-the-loop', ipa: '/ˌhjuː.mən ɪn ðə luːp/', meaning: 'mô hình người giám sát công nghệ', c1Usage: 'A transitional human-in-the-loop paradigm.' }
      ]
    }
  },
  {
    id: 'adv-02',
    topicTitle: 'Universal Basic Income & Human Productivity',
    subTheme: 'Socio-Economic Welfare vs Work Ethic',
    examiner: {
      name: 'Prof. Eleanor Vance',
      title: 'Oxford Socio-Economic Assessment Specialist',
      demeanor: 'Analytical, probes candidate into policy trade-offs.',
      accent: 'Neutral British'
    },
    openingQuestion: 'Some economists propose implementing a Universal Basic Income to eradicate poverty. What are the main societal implications of decoupling income from employment?',
    suggestedOpeningPoints: [
      'Poverty floor elimination and psychological wellbeing.',
      'Incentives to pursue entrepreneurial and artistic ventures.',
      'Fiscal feasibility and potential inflation.'
    ],
    interruptionPlan: {
      triggerSecondMin: 20,
      triggerSecondMax: 28,
      interruptionPrompt: 'Hold on a moment. Wouldn’t guaranteeing unconditional income inevitably lead to widespread labor shortages in vital, low-status occupations like sanitation and agriculture?',
      paradoxType: 'economic_dilemma',
      paradoxExplanationVi: 'Nghịch lý Động lực Lao động: Nếu ai cũng có tiền đủ sống, các công việc lao động chân tay thiết yếu nhưng mức lương thấp sẽ không còn ai làm, làm tê liệt chuỗi cung ứng xã hội.',
      recommendedPivotType: 'paradox_resolution',
      modelBand85PivotResponse: 'While that apparent paradox seems intuitive at first glance, empirical evidence from Finnish and Canadian trials demonstrates that unconditional safety nets actually force those essential sectors to offer dignified wages and humane conditions, thereby rebalancing market distortions rather than collapsing labor supply.',
      keyVocabulary: [
        { word: 'unconditional safety net', ipa: '/ˌʌn.kənˈdɪʃ.ən.əl ˈseɪf.ti net/', meaning: 'lưới an sinh vô điều kiện', c1Usage: 'Providing an unconditional safety net for all citizens.' },
        { word: 'market distortions', ipa: '/ˈmɑː.kɪt dɪˈstɔː.ʃənz/', meaning: 'những biến dạng / méo mó của thị trường', c1Usage: 'Rectifying chronic labor market distortions.' },
        { word: 'empirical trials', ipa: '/ɪmˈpɪr.ɪ.kəl traɪəlz/', meaning: 'các thử nghiệm thực nghiệm', c1Usage: 'Corroborated by nationwide empirical trials.' }
      ]
    }
  },
  {
    id: 'adv-03',
    topicTitle: 'State Surveillance & National Security',
    subTheme: 'Civil Liberties vs Public Safety',
    examiner: {
      name: 'Dr. Marcus Sterling',
      title: 'Senior Linguistic & Oral Proficiency Assessor',
      demeanor: 'Direct, challenges absolute statements on human rights.',
      accent: 'British / Scottish nuance'
    },
    openingQuestion: 'To what extent should democratic governments be permitted to monitor citizens’ digital communications in the name of counter-terrorism?',
    suggestedOpeningPoints: [
      'The primary duty of the state to protect physical lives.',
      'The slippery slope toward authoritarian surveillance.',
      'Judicial oversight and warrant-based interception.'
    ],
    interruptionPlan: {
      triggerSecondMin: 22,
      triggerSecondMax: 32,
      interruptionPrompt: 'Sorry to cut in, but you argue for absolute privacy, yet how can intelligence agencies intercept encrypted terrorist plots without bulk metadata access?',
      paradoxType: 'liberty_vs_security',
      paradoxExplanationVi: 'Nghịch lý Quyền riêng tư vs An ninh: Thí sinh đề cao quyền riêng tư tuyệt đối, nhưng thực tế công nghệ mã hóa đầu cuối khiến cơ quan an ninh mù lòa nếu không thu thập dữ liệu hàng loạt.',
      recommendedPivotType: 'qualifier_reframe',
      modelBand85PivotResponse: 'Precisely to avoid that dilemma, my argument distinguishes between targeted judicial warrants and unbridled mass surveillance; state agencies must retain forensic interception powers, provided they are bound by rigorous parliamentary scrutiny and third-party algorithmic audits.',
      keyVocabulary: [
        { word: 'unbridled mass surveillance', ipa: '/ʌnˈbraɪ.dəld mæs sɜːˈveɪ.ləns/', meaning: 'sự giám sát diện rộng không kiểm soát', c1Usage: 'Rejecting unbridled mass surveillance.' },
        { word: 'rigorous parliamentary scrutiny', ipa: '/ˈrɪɡ.ər.əs ˌpɑː.lɪˈmen.tər.i ˈskruː.tɪ.ni/', meaning: 'sự giám sát nghị viện nghiêm ngặt', c1Usage: 'Subjected to rigorous parliamentary scrutiny.' },
        { word: 'forensic interception', ipa: '/fəˈren.zɪk ˌɪn.təˈsep.ʃən/', meaning: 'can thiệp/chặn bắt pháp y có căn cứ', c1Usage: 'Authorizing targeted forensic interception.' }
      ]
    }
  },
  {
    id: 'adv-04',
    topicTitle: 'Meritocracy & Educational Disparity',
    subTheme: 'Standardized Testing vs Social Mobility',
    examiner: {
      name: 'Dr. Alistair Finch',
      title: 'Senior Examiner & Dialectician (Cambridge ESOL)',
      demeanor: 'Skeptical, incisive, and prone to challenging over-generalized optimism.',
      accent: 'British Received Pronunciation (RP)'
    },
    openingQuestion: 'Is standardized university admission truly meritocratic, or does it merely perpetuate intergenerational privilege?',
    suggestedOpeningPoints: [
      'Standardized tests provide an objective benchmark irrespective of background.',
      'Affluent families buy elite test preparation and private tutors.',
      'Holistic admissions models balancing socioeconomic context.'
    ],
    interruptionPlan: {
      triggerSecondMin: 24,
      triggerSecondMax: 33,
      interruptionPrompt: 'Excuse me, but if we abandon objective standardized testing, doesn’t subjective holistic admission open the door to even worse nepotism and corruption?',
      paradoxType: 'efficiency_vs_equity',
      paradoxExplanationVi: 'Nghịch lý Đánh giá Toàn diện vs Chuẩn hóa: Phê phán thi chuẩn hóa thiên vị người giàu, nhưng nếu bỏ thi chuẩn hóa thì xét tuyển chủ quan (portfolio, phỏng vấn) lại càng dễ để con cháu giới quyền thế thao túng.',
      recommendedPivotType: 'counter_concession',
      modelBand85PivotResponse: 'That is a pivotal counterpoint; indeed, discarding standardized metrics entirely would exacerbate systemic nepotism. Hence, the solution is not abolition, but contextual benchmarking, where academic scores are weighted against the socio-economic index of the candidate’s secondary school.',
      keyVocabulary: [
        { word: 'systemic nepotism', ipa: '/sɪˈstem.ɪk ˈnep.ə.tɪ.zəm/', meaning: 'chủ nghĩa gia đình trị/con ông cháu cha có hệ thống', c1Usage: 'Guarding against systemic nepotism in admissions.' },
        { word: 'contextual benchmarking', ipa: '/kənˈteks.tʃu.əl ˈbentʃ.mɑː.kɪŋ/', meaning: 'đối sánh theo ngữ cảnh kinh tế xã hội', c1Usage: 'Implementing contextual benchmarking models.' },
        { word: 'pivotal counterpoint', ipa: '/ˈpɪv.ə.təl ˈkaʊn.tə.pɔɪnt/', meaning: 'phản đề mang tính then chốt', c1Usage: 'You raise a pivotal counterpoint regarding subjectivity.' }
      ]
    }
  }
];
