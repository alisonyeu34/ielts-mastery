/**
 * Mock Data for Advanced Toulmin Argumentation Studio (Step 87)
 * Authentic IELTS Task 2 & Speaking Part 3 Topics with 6-Component Toulmin Chains & PEEL Comparators
 */

import { ToulminRole } from "@/lib/toulminStructureValidator";

export interface ToulminDebateTopic {
  id: string;
  topicTitle: string;
  academicDomain: "Economics & Welfare" | "Bioethics & Medicine" | "Environmental Policy" | "AI & Technological Governance" | "Urban Sociology";
  prompt: string;
  peelParagraph: {
    band: number;
    text: string;
    critique: string;
  };
  toulminParagraph: {
    band: number;
    text: string;
    strengthsAnalysis: string;
  };
  initialBlocks: Record<ToulminRole, string>;
  transitionVocabularyList: {
    role: ToulminRole;
    connectors: string[];
  }[];
}

export const MOCK_TOULMIN_DEBATES: ToulminDebateTopic[] = [
  {
    id: "topic_ubi_automation",
    topicTitle: "Universal Basic Income in the Age of AI Automation",
    academicDomain: "Economics & Welfare",
    prompt: "Some economists argue that governments should introduce a Universal Basic Income (UBI) to protect citizens against technological unemployment. Discuss both views and give your opinion.",
    peelParagraph: {
      band: 6.0,
      text: "Firstly, governments should give free money to citizens because automation is taking away jobs. For example, in many factories, robots are replacing humans, so people have no income. This leads to poverty. Therefore, basic income is necessary to help people survive.",
      critique: "Đoạn văn viết theo lối PEEL đơn giản: Luận điểm một chiều, dẫn chứng chung chung, không giải thích cơ chế kinh tế và hoàn toàn bỏ qua các lo ngại về lạm phát hoặc thâm hụt ngân sách."
    },
    toulminParagraph: {
      band: 8.5,
      text: "It is readily demonstrable that instituting an unconditional basic income creates an essential macroeconomic buffer against algorithmic worker displacement. Primary empirical grounds for this contention stem from pilot trials in Finland, which revealed marked reductions in psychological distress and sustained entrepreneurial activity among recipients. This phenomenon operates under the fundamental premise that when baseline subsistence is decoupled from precarious wage-labor, individuals possess the cognitive bandwidth to upskill and engage in non-routine economic contributions. Underpinning this causal relationship is the established scholarly consensus in behavioral economics that poverty imposes a crippling mental tax that impedes long-term decision-making. Admittedly, fiscal conservatives frequently raise the objection that universal disbursements precipitate catastrophic sovereign debt and disincentivize productive labor. Nonetheless, such apprehensions are decisively neutralized by empirical tax models demonstrating that automated digital transaction levies effortlessly recoup funding, while employment withdrawal is confined almost exclusively to caregivers and students furthering their qualifications.",
      strengthsAnalysis: "Đoạn văn 6 khối Toulmin mẫu mực: Thiết lập luận điểm vững chắc, giải thích cơ chế nhận thức thông qua tâm lý học hành vi, dự báo trước phản đề về thâm hụt ngân sách và bẻ gãy hoàn toàn bằng số liệu thuế tự động."
    },
    initialBlocks: {
      claim: "Instituting an unconditional basic income creates an essential macroeconomic buffer against algorithmic worker displacement.",
      data: "Pilot trials in Finland revealed marked reductions in psychological distress and sustained entrepreneurial activity among recipients.",
      warrant: "When baseline subsistence is decoupled from precarious wage-labor, individuals possess the cognitive bandwidth to upskill and engage in non-routine economic contributions.",
      backing: "Scholarship in behavioral economics proves that severe financial precarity imposes a severe cognitive bandwidth tax that impairs forward-looking vocational choices.",
      counterArgument: "Fiscal conservatives argue that universal disbursements precipitate catastrophic sovereign debt and disincentivize productive labor.",
      rebuttal: "Empirical tax models demonstrate that automated capital-gains levies effortlessly recoup disbursements, while labor reduction is strictly confined to informal caregivers and students."
    },
    transitionVocabularyList: [
      {
        role: "claim",
        connectors: ["It is readily demonstrable that...", "The primary thesis to be advanced is that...", "A compelling case can be made that..."]
      },
      {
        role: "data",
        connectors: ["Primary empirical grounds for this contention stem from...", "Substantiating this assertion is the observed phenomenon that...", "Documented case studies demonstrate that..."]
      },
      {
        role: "warrant",
        connectors: ["This operates under the fundamental premise that...", "The underlying causal mechanism dictates that...", "This correlation is anchored in the logic that..."]
      },
      {
        role: "backing",
        connectors: ["Underpinning this rationale is the established scholarly consensus that...", "Theoretical foundations in institutional economics confirm that...", "This aligns seamlessly with foundational research showing that..."]
      },
      {
        role: "counterArgument",
        connectors: ["Admittedly, detractors frequently raise the objection that...", "Critics may reasonably contend that...", "A prominent counter-thesis posits that..."]
      },
      {
        role: "rebuttal",
        connectors: ["Nonetheless, such apprehensions are decisively neutralized by the reality that...", "However, this objection collapses under closer scrutiny because...", "This skepticism, while understandable, overlooks the empirical fact that..."]
      }
    ]
  },
  {
    id: "topic_carbon_tax_subsidies",
    topicTitle: "Mandatory Carbon Taxation vs Green Subsidies",
    academicDomain: "Environmental Policy",
    prompt: "Should high-polluting industries be penalized through punitive carbon taxes, or should green innovation be exclusively supported through governmental subsidies?",
    peelParagraph: {
      band: 6.5,
      text: "Carbon taxes should be imposed on heavy polluters to reduce emissions. For instance, factories in Europe pay high fees when they emit greenhouse gases. This makes them reduce pollution. In conclusion, taxes are the best method.",
      critique: "Đoạn văn thiếu phân tích kinh tế vi mô: Không tính đến rủi ro các tập đoàn chuyển chi phí thuế sang người tiêu dùng hoặc chuyển nhà máy sang các quốc gia thiên đường ô nhiễm (Carbon Leakage)."
    },
    toulminParagraph: {
      band: 8.5,
      text: "It is readily demonstrable that rigorous carbon price floors serve as the most potent market mechanism to internalize environmental externalities. Primary empirical grounds for this contention stem from the European Union Emissions Trading System, which achieved a 35% decline in industrial emissions over a single decade. This operates under the fundamental premise that artificially elevating the marginal cost of fossil combustion compels corporate balance sheets to prioritize decarbonization. Underpinning this rationale is the Pigouvian tax theory in environmental economics, which establishes that negative externalities must be priced into market equilibrium. Admittedly, industrial lobbyists frequently raise the objection that unilateral carbon levies trigger carbon leakage, wherein enterprises simply relocate manufacturing to jurisdictions with lax regulatory regimes. Nonetheless, such apprehensions are decisively neutralized by the implementation of Carbon Border Adjustment Mechanisms (CBAM), which impose equivalent tariffs on imported goods, thereby neutralizing competitive disadvantages and enforcing global compliance.",
      strengthsAnalysis: "Toulmin đa tầng tuyệt hảo: Sử dụng lý thuyết thuế Pigou làm Backing, dự báo phản đề về hiện tượng dịch chuyển nhà máy (Carbon Leakage) và bẻ gãy bằng cơ chế hàng rào thuế quan carbon CBAM."
    },
    initialBlocks: {
      claim: "Rigorous carbon price floors serve as the most potent market mechanism to internalize environmental externalities.",
      data: "The European Union Emissions Trading System generated a 35% decline in power sector emissions over a single decade.",
      warrant: "Artificially elevating the marginal cost of fossil combustion compels corporate balance sheets to prioritize capital allocation toward clean energy.",
      backing: "Pigouvian welfare economics posits that negative externalities cannot be self-corrected without statutory price internalization.",
      counterArgument: "Industrial lobbies contend that unilateral carbon taxes trigger industrial flight and carbon leakage to lax jurisdictions.",
      rebuttal: "Border Carbon Adjustment Mechanisms (CBAM) neutralize geographical evasion by imposing equal import tariffs on goods manufactured without carbon pricing."
    },
    transitionVocabularyList: [
      {
        role: "claim",
        connectors: ["It is fundamentally evident that...", "Statutory intervention is imperative because..."]
      },
      {
        role: "data",
        connectors: ["Empirical evidence from longitudinal economic data reveals that..."]
      },
      {
        role: "warrant",
        connectors: ["This dynamic is driven by the structural incentive whereby..."]
      },
      {
        role: "backing",
        connectors: ["Classical welfare economics confirms that..."]
      },
      {
        role: "counterArgument",
        connectors: ["Opponents frequently argue that..."]
      },
      {
        role: "rebuttal",
        connectors: ["Nevertheless, this concern is effectively addressed by..."]
      }
    ]
  },
  {
    id: "topic_ai_medical_diagnosis",
    topicTitle: "Algorithmic Autonomy in Clinical Diagnostics",
    academicDomain: "Bioethics & Medicine",
    prompt: "Should artificial intelligence systems be permitted to make autonomous clinical decisions without physician oversight?",
    peelParagraph: {
      band: 6.0,
      text: "AI should not replace doctors because machines can make mistakes. If an AI misdiagnoses a patient, nobody will take responsibility. Doctors have empathy and understand patients better than computers. So human doctors are still needed.",
      critique: "Lập luận cảm tính: Khẳng định máy móc có thể sai nhưng không so sánh với tỷ lệ sai sót thực tế của con người, không đưa ra được nguyên lý pháp lý chịu trách nhiệm."
    },
    toulminParagraph: {
      band: 8.5,
      text: "It is readily demonstrable that fully autonomous AI diagnostics must remain restricted to an advisory capacity rather than independent clinical execution. Primary empirical grounds for this contention stem from radiological audits where deep neural networks exhibited catastrophic diagnostic drift when encountering atypical demographic outliers. This operates under the fundamental premise that machine learning algorithms derive classifications from statistical pattern matching without contextual ontological comprehension. Underpinning this rationale is the bioethical doctrine of non-maleficence and clinical accountability, which requires unambiguous legal agency in life-altering medical determinations. Admittedly, technocrats frequently raise the objection that autonomous diagnostic algorithms dramatically outperform general practitioners in raw pattern recognition speed and early oncology detection. Nonetheless, such apprehensions are decisively neutralized by hybrid collaborative models ('Human-in-the-Loop'), which harness AI predictive acuity while preserving physician ethical oversight and personalized patient contextualization.",
      strengthsAnalysis: "Đoạn văn kết hợp hoàn hảo giữa luận lý kỹ thuật (Statistical Pattern Matching) và đạo đức y sinh (Non-maleficence), hóa giải thành công phản biện của phe sùng bái công nghệ bằng mô hình Human-in-the-Loop."
    },
    initialBlocks: {
      claim: "Autonomous algorithmic diagnostics must remain restricted to an advisory role rather than independent clinical execution.",
      data: "Radiological clinical trials demonstrated algorithmic diagnostic drift and high false-positive rates when encountering atypical demographic outliers.",
      warrant: "Deep neural networks derive decisions from statistical correlations rather than causal biological comprehension, making edge-case accountability impossible.",
      backing: "The bioethical doctrine of clinical non-maleficence dictates that statutory fiduciary responsibility cannot be delegated to non-human algorithmic agents.",
      counterArgument: "Proponents argue that autonomous AI vastly outstrips human clinicians in processing velocity and micro-lesion detection sensitivity.",
      rebuttal: "A 'Human-in-the-Loop' collaborative architecture captures AI computational precision while retaining irreplaceable human contextual wisdom and ethical accountability."
    },
    transitionVocabularyList: [
      {
        role: "claim",
        connectors: ["A principled boundary must be maintained whereby..."]
      },
      {
        role: "data",
        connectors: ["Clinical validation trials consistently indicate that..."]
      },
      {
        role: "warrant",
        connectors: ["This limitation arises because..."]
      },
      {
        role: "backing",
        connectors: ["Established medical jurisprudence affirms that..."]
      },
      {
        role: "counterArgument",
        connectors: ["Technological advocates persistently point out that..."]
      },
      {
        role: "rebuttal",
        connectors: ["However, the optimal synthesis lies in..."]
      }
    ]
  }
];
