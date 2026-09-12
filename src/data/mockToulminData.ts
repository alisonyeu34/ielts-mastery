export interface ToulminParts {
  claim: string;
  data: string;
  warrant: string;
  backing: string;
  counterArgument: string;
  rebuttal: string;
}

export interface RebuttalStrategyItem {
  strategyType: "flawed_premise" | "disproportionate_cost" | "viable_alternative";
  strategyNameVi: string;
  descriptionVi: string;
  samplePhrase: string;
}

export interface OppositionArgumentItem {
  id: string;
  opponentPointEn: string;
  opponentPointVi: string;
  suggestedRebuttal: string;
  strategy: "flawed_premise" | "disproportionate_cost" | "viable_alternative";
}

export interface ToulminPromptItem {
  id: string;
  topicTitleVi: string;
  promptText: string;
  backgroundContextVi: string;
  scaffoldingCollocations: string[];
  modelToulmin: ToulminParts;
  modelFullParagraph: string;
  oppositionBank: OppositionArgumentItem[];
}

export interface AcademicRebuttalPhraseItem {
  category: "concession" | "rebuttal_pivot" | "flaw_exposure" | "final_affirmation";
  categoryVi: string;
  phrase: string;
  meaningVi: string;
  exampleContext: string;
}

export const MOCK_TOULMIN_DATA: ToulminPromptItem[] = [
  {
    id: "toulmin_ubi",
    topicTitleVi: "Thu Nhập Cơ Bản Phổ Quát (Universal Basic Income - UBI)",
    promptText:
      "Some economists advocate for the nationwide implementation of an unconditional Universal Basic Income (UBI) to mitigate poverty and automation-induced job displacement. To what extent do you agree or disagree?",
    backgroundContextVi:
      "UBI là chính sách cấp tiền định kỳ vô điều kiện cho mọi công dân. Tranh luận xoay quanh việc UBI bảo vệ người lao động trước AI vs nguy cơ triệt tiêu động lực làm việc và gánh nặng ngân sách khổng lồ.",
    scaffoldingCollocations: [
      "unconditional cash transfer",
      "automation-induced displacement",
      "socioeconomic safety net",
      "fiscal sustainability",
      "workplace disincentive",
    ],
    modelToulmin: {
      claim:
        "Implementing an unconditional universal basic income constitutes a crucial imperative to insulate vulnerable workforces against structural technological unemployment.",
      data:
        "Recent empirical trials across European municipalities demonstrated that recipients of guaranteed monthly stipends experienced a forty percent reduction in acute poverty while maintaining active job search endeavors.",
      warrant:
        "Because financial liquidity alleviates cognitive overload associated with subsistence anxiety, individuals gain the necessary stability to undertake vocational retraining and seek higher-value occupations.",
      backing:
        "This psychological principle is extensively substantiated by developmental economic literature, which establishes that unconditional security stimulates entrepreneurial risk-taking rather than societal complacency.",
      counterArgument:
        "Admittedly, detractors legitimately caution that unconditional welfare disbursements could trigger fiscal insolvency and foster widespread workforce disengagement.",
      rebuttal:
        "Nonetheless, this apprehension is rendered untenable when considering that funding can be sustainably generated through targeted automation taxes, while labor participation data consistently disproves the assumption of voluntary mass idleness.",
    },
    modelFullParagraph:
      "Implementing an unconditional universal basic income constitutes a crucial imperative to insulate vulnerable workforces against structural technological unemployment. Recent empirical trials across European municipalities demonstrated that recipients of guaranteed monthly stipends experienced a forty percent reduction in acute poverty while maintaining active job search endeavors. Because financial liquidity alleviates cognitive overload associated with subsistence anxiety, individuals gain the necessary stability to undertake vocational retraining and seek higher-value occupations. This psychological principle is extensively substantiated by developmental economic literature, which establishes that unconditional security stimulates entrepreneurial risk-taking rather than societal complacency. Admittedly, detractors legitimately caution that unconditional welfare disbursements could trigger fiscal insolvency and foster widespread workforce disengagement. Nonetheless, this apprehension is rendered untenable when considering that funding can be sustainably generated through targeted automation taxes, while labor participation data consistently disproves the assumption of voluntary mass idleness.",
    oppositionBank: [
      {
        id: "opp_ubi_1",
        opponentPointEn:
          "Guaranteed cash transfers will eradicate the intrinsic incentive to seek employment, resulting in a lethargic workforce.",
        opponentPointVi:
          "Cấp tiền miễn phí sẽ triệt tiêu động lực làm việc, tạo ra một lực lượng lao động lười biếng, ỷ lại.",
        suggestedRebuttal:
          "Empirical trial data across Canada and Finland reveals that over 95% of recipients continued working or utilized the financial buffer to pursue higher vocational credentials.",
        strategy: "flawed_premise",
      },
      {
        id: "opp_ubi_2",
        opponentPointEn:
          "The exorbitant fiscal expenditure of UBI will inevitably bankrupt sovereign budgets or necessitate crippling income tax hikes.",
        opponentPointVi:
          "Chi phí ngân sách khổng lồ sẽ làm phá sản ngân khố quốc gia hoặc buộc phải tăng thuế thu nhập lên mức bóp nghẹt nền kinh tế.",
        suggestedRebuttal:
          "Capital can be raised through progressive automation tariffs and corporate carbon dividends without placing undue fiscal burdens on middle-class taxpayers.",
        strategy: "viable_alternative",
      },
    ],
  },
  {
    id: "toulmin_carbon_tax",
    topicTitleVi: "Thuế Carbon Bắt Buộc Đối Với Doanh Nghiệp Xả Thải",
    promptText:
      "Governments should impose heavy mandatory environmental taxes on major corporations proportional to their carbon emissions. To what extent do you agree or disagree?",
    backgroundContextVi:
      "Áp thuế carbon nhằm nội hóa chi phí ô nhiễm môi trường. Phe phản đối lo ngại doanh nghiệp sẽ chuyển giá sang người tiêu dùng hoặc di dời nhà máy sang các nước lỏng lẻo luật môi trường.",
    scaffoldingCollocations: [
      "mandatory carbon levy",
      "internalizing negative externalities",
      "green technological transition",
      "carbon leakage",
      "regressive consumer burden",
    ],
    modelToulmin: {
      claim:
        "Levying aggressive carbon taxation on industrial conglomerates is an indispensable market mechanism to compel corporate decarbonization.",
      data:
        "In jurisdictions operating comprehensive carbon pricing, such as the European Union Emission Trading System, industrial greenhouse gas emissions declined by over thirty percent within a decade.",
      warrant:
        "By internalizing the negative externalities of fossil fuel consumption, punitive financial penalties fundamentally alter corporate capital allocation in favor of renewable energy infrastructure.",
      backing:
        "This economic logic is deeply anchored in Pigouvian tax principles, which prove that price signals remain the most efficient deterrent against ecological degradation.",
      counterArgument:
        "Opponents frequently argue that such levies will merely induce corporate relocation to deregulated developing nations and escalate consumer commodity prices.",
      rebuttal:
        "However, this critique overlooks the efficacy of Carbon Border Adjustment Mechanisms, which penalize high-carbon imports, thereby neutralizing competitive disadvantages while financing green consumer rebates.",
    },
    modelFullParagraph:
      "Levying aggressive carbon taxation on industrial conglomerates is an indispensable market mechanism to compel corporate decarbonization. In jurisdictions operating comprehensive carbon pricing, such as the European Union Emission Trading System, industrial greenhouse gas emissions declined by over thirty percent within a decade. By internalizing the negative externalities of fossil fuel consumption, punitive financial penalties fundamentally alter corporate capital allocation in favor of renewable energy infrastructure. This economic logic is deeply anchored in Pigouvian tax principles, which prove that price signals remain the most efficient deterrent against ecological degradation. Opponents frequently argue that such levies will merely induce corporate relocation to deregulated developing nations and escalate consumer commodity prices. However, this critique overlooks the efficacy of Carbon Border Adjustment Mechanisms, which penalize high-carbon imports, thereby neutralizing competitive disadvantages while financing green consumer rebates.",
    oppositionBank: [
      {
        id: "opp_carb_1",
        opponentPointEn:
          "Heavy carbon taxes will cause 'carbon leakage', forcing corporations to migrate manufacturing facilities to lax regulatory havens.",
        opponentPointVi:
          "Thuế nặng gây hiện tượng rò rỉ carbon: Doanh nghiệp tháo chạy sang các nước nghèo lỏng lẻo luật môi trường.",
        suggestedRebuttal:
          "Carbon border tariffs effectively penalize imports from non-compliant jurisdictions, completely disincentivizing geographic evasion.",
        strategy: "flawed_premise",
      },
      {
        id: "opp_carb_2",
        opponentPointEn:
          "Corporations will simply pass increased operational taxes directly onto everyday consumers through inflated retail prices.",
        opponentPointVi:
          "Doanh nghiệp sẽ chỉ chuyển tiếp chi phí thuế sang người tiêu dùng bằng cách tăng giá hàng hóa thiết yếu.",
        suggestedRebuttal:
          "Revenues from carbon levies can be directly redistributed as progressive citizen dividends to fully offset consumer price inflations.",
        strategy: "viable_alternative",
      },
    ],
  },
  {
    id: "toulmin_micro_credentials",
    topicTitleVi: "Chứng Chỉ Doanh Nghiệp Thay Thế Bằng Đại Học Truyền Thống",
    promptText:
      "Some tech industry leaders suggest that corporate-backed professional micro-credentials should replace traditional four-year university degrees. Do the advantages of this trend outweigh the disadvantages?",
    backgroundContextVi:
      "Các khóa đào tạo chứng chỉ ngắn hạn (Google, IBM certificates) có ưu điểm thực chiến và chi phí thấp, nhưng thiếu nền tảng học thuật toàn diện và tư duy phản biện sâu sắc.",
    scaffoldingCollocations: [
      "proprietary micro-credentials",
      "tertiary academic tenure",
      "narrow technical specialization",
      "holistic intellectual inquiry",
      "democratizing skill acquisition",
    ],
    modelToulmin: {
      claim:
        "Wholesale substitution of university degrees with proprietary corporate credentials would dangerously undermine long-term intellectual adaptability.",
      data:
        "Labor market longitudinal surveys demonstrate that over seventy percent of specific coding frameworks and software proficiencies become obsolete within six years.",
      warrant:
        "While corporate certifications excel at rapid short-term technical onboarding, they lack the foundational theoretical rigor required for interdisciplinary innovation.",
      backing:
        "Educational pedagogy universally establishes that pure sciences and humanities cultivate systemic cognitive agility that cannot be condensed into vocational modules.",
      counterArgument:
        "It is undeniable that corporate credentials democratize professional entry by bypassing exorbitant university tuition fees and offering immediate employer alignment.",
      rebuttal:
        "Yet, this initial economic accessibility creates a deceptive career ceiling, ultimately trapping workers in specialized operational roles vulnerable to automated obsolescence.",
    },
    modelFullParagraph:
      "Wholesale substitution of university degrees with proprietary corporate credentials would dangerously undermine long-term intellectual adaptability. Labor market longitudinal surveys demonstrate that over seventy percent of specific coding frameworks and software proficiencies become obsolete within six years. While corporate certifications excel at rapid short-term technical onboarding, they lack the foundational theoretical rigor required for interdisciplinary innovation. Educational pedagogy universally establishes that pure sciences and humanities cultivate systemic cognitive agility that cannot be condensed into vocational modules. It is undeniable that corporate credentials democratize professional entry by bypassing exorbitant university tuition fees and offering immediate employer alignment. Yet, this initial economic accessibility creates a deceptive career ceiling, ultimately trapping workers in specialized operational roles vulnerable to automated obsolescence.",
    oppositionBank: [
      {
        id: "opp_micro_1",
        opponentPointEn:
          "Traditional degrees are obsolete and burdened by irrelevant academic theories that do not translate into workplace productivity.",
        opponentPointVi:
          "Bằng đại học đã lỗi thời và gánh nặng bởi các lý thuyết hàn lâm vô dụng không đem lại năng suất lao động.",
        suggestedRebuttal:
          "Deep foundational theories in mathematics and logic are precisely what enable innovators to architect revolutionary technologies rather than merely operate them.",
        strategy: "flawed_premise",
      },
    ],
  },
  {
    id: "toulmin_data_privacy",
    topicTitleVi: "Giới Hạn Quyền Riêng Tư Dữ Liệu Vì An Ninh Mạng Quốc Gia",
    promptText:
      "Governments should be permitted to access private citizen data and encrypted communications to safeguard national security against cyber threats. To what extent do you agree or disagree?",
    backgroundContextVi:
      "Cân bằng giữa an ninh quốc gia (chống khủng bố, gián điệp mạng) và quyền tự do riêng tư cá nhân. Trọng tâm là nguy cơ lạm quyền và xói mòn dân chủ.",
    scaffoldingCollocations: [
      "surveillance overreach",
      "end-to-end encryption",
      "national cybersecurity architecture",
      "chilling effect on civil liberties",
      "warrantless data interception",
    ],
    modelToulmin: {
      claim:
        "Sanctioning indiscriminate state surveillance under the pretext of cybersecurity poses an existential threat to democratic civil liberties.",
      data:
        "Historical precedents across numerous constitutional democracies illustrate that warrantless mass surveillance inevitably expands to target political dissidents and journalists.",
      warrant:
        "When private communications are systematically intercepted, it produces an acute chilling effect on freedom of expression and institutional transparency.",
      backing:
        "International human rights jurisprudence consistently upholds that arbitrary infringement of digital privacy violates the core tenets of democratic governance.",
      counterArgument:
        "Proponents of state surveillance maintain that backdoors into encrypted networks are indispensable to preempt sophisticated foreign cyber espionage and terrorism.",
      rebuttal:
        "Nevertheless, weakening digital encryption inherently creates systemic cryptographic vulnerabilities that hostile threat actors and cybercriminals can exploit, thereby undermining the very security the state seeks to defend.",
    },
    modelFullParagraph:
      "Sanctioning indiscriminate state surveillance under the pretext of cybersecurity poses an existential threat to democratic civil liberties. Historical precedents across numerous constitutional democracies illustrate that warrantless mass surveillance inevitably expands to target political dissidents and journalists. When private communications are systematically intercepted, it produces an acute chilling effect on freedom of expression and institutional transparency. International human rights jurisprudence consistently upholds that arbitrary infringement of digital privacy violates the core tenets of democratic governance. Proponents of state surveillance maintain that backdoors into encrypted networks are indispensable to preempt sophisticated foreign cyber espionage and terrorism. Nevertheless, weakening digital encryption inherently creates systemic cryptographic vulnerabilities that hostile threat actors and cybercriminals can exploit, thereby undermining the very security the state seeks to defend.",
    oppositionBank: [
      {
        id: "opp_priv_1",
        opponentPointEn:
          "Law-abiding citizens have nothing to fear from government data collection if they have engaged in no criminal activity.",
        opponentPointVi:
          "Công dân tuân thủ pháp luật không có gì phải sợ nếu bản thân không phạm tội.",
        suggestedRebuttal:
          "Privacy is not merely about concealing wrongdoing, but about safeguarding personal autonomy against arbitrary state coercion and unauthorized commercial profiling.",
        strategy: "flawed_premise",
      },
    ],
  },
];

export const ACADEMIC_REBUTTAL_PHRASES: AcademicRebuttalPhraseItem[] = [
  {
    category: "concession",
    categoryVi: "1. Thừa Nhận Quan Điểm Đối Lập (Concession)",
    phrase: "Admittedly, detractors legitimately caution that...",
    meaningVi: "Phải thừa nhận rằng, những người phản đối có lý khi cảnh báo rằng...",
    exampleContext: "Admittedly, detractors legitimately caution that universal basic income could strain public coffers.",
  },
  {
    category: "concession",
    categoryVi: "1. Thừa Nhận Quan Điểm Đối Lập (Concession)",
    phrase: "It is undeniable that proponents of X raise a valid concern regarding...",
    meaningVi: "Không thể phủ nhận rằng những người ủng hộ X đưa ra một quan ngại xác đáng về...",
    exampleContext: "It is undeniable that proponents of state surveillance raise a valid concern regarding terrorism.",
  },
  {
    category: "rebuttal_pivot",
    categoryVi: "2. Chuyển Hướng Lật Kèo (Rebuttal Pivot)",
    phrase: "Nonetheless, this apprehension is rendered untenable when considering...",
    meaningVi: "Tuy nhiên, mối lo ngại này trở nên không thể đứng vững khi xem xét...",
    exampleContext: "Nonetheless, this apprehension is rendered untenable when considering revenue from carbon dividends.",
  },
  {
    category: "rebuttal_pivot",
    categoryVi: "2. Chuyển Hướng Lật Kèo (Rebuttal Pivot)",
    phrase: "However, such an argument fails to account for the fundamental reality that...",
    meaningVi: "Tuy nhiên, lập luận như vậy đã không tính đến một thực tế căn bản rằng...",
    exampleContext: "However, such an argument fails to account for the fundamental reality of systemic automation.",
  },
  {
    category: "flaw_exposure",
    categoryVi: "3. Vạch Trần Lỗ Hổng Logic (Flaw Exposure)",
    phrase: "This perspective rests on the flawed premise that...",
    meaningVi: "Góc nhìn này dựa trên một tiền đề sai lầm rằng...",
    exampleContext: "This perspective rests on the flawed premise that recipients will voluntarily choose idleness.",
  },
  {
    category: "flaw_exposure",
    categoryVi: "3. Vạch Trần Lỗ Hổng Logic (Flaw Exposure)",
    phrase: "While offering short-term expediency, this approach exacts severe long-term costs in...",
    meaningVi: "Dù mang lại lợi ích nhất thời, cách tiếp cận này phải trả giá đắt trong dài hạn về...",
    exampleContext: "While offering short-term expediency, micro-credentials exact severe long-term costs in intellectual depth.",
  },
  {
    category: "final_affirmation",
    categoryVi: "4. Khẳng Định Lập Trường Chốt Hạ (Final Affirmation)",
    phrase: "Hence, the affirmative stance remains overwhelmingly persuasive because...",
    meaningVi: "Do đó, lập trường ủng hộ ban đầu vẫn hoàn toàn có sức thuyết phục áp đảo vì...",
    exampleContext: "Hence, the affirmative stance remains overwhelmingly persuasive because carbon taxes internalize pollution.",
  },
];
