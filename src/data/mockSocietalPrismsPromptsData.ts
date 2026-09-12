/**
 * Mock Data for Speaking Part 3: 6 Institutional Prisms & Policy Dilemmas
 * IELTS Institutional Discourse & Macroeconomic Analysis (Band 7.5 - 8.5+)
 */

import { SocietalPrismId } from '../lib/societalPrismsAnalyzer';

export interface SocietalPrismsPrompt {
  id: string;
  question: string;
  topicDomain: string;
  recommendedPrisms: [SocietalPrismId, SocietalPrismId];
  policyDilemmaSummary: string;
  band8SampleResponse: string;
  egocentricVsInstitutionalContrast: {
    egocentricBand5Sample: string;
    institutionalBand8Sample: string;
    explanation: string;
  };
}

export const MOCK_SOCIETAL_PRISMS_PROMPTS: SocietalPrismsPrompt[] = [
  {
    id: 'sp-01',
    question: 'Should public transportation be completely subsidized through municipal taxation and made free for all urban citizens?',
    topicDomain: 'Urban Governance & Public Infrastructure',
    recommendedPrisms: ['government', 'vulnerable'],
    policyDilemmaSummary: 'Mâu thuẫn giữa gánh nặng thâm hụt ngân sách công của chính quyền đô thị và quyền tiếp cận giao thông công bằng cho tầng lớp thu nhập thấp.',
    band8SampleResponse: 'From a macroeconomic and regulatory perspective, municipal authorities inevitably confront severe fiscal constraints when eliminating farebox revenues, which could trigger budgetary shortfalls for essential public health or education. However, through the lens of socioeconomic equity, universal free transit acts as a powerful equalizer. It relieves severe financial burdens on low-income demographics and systematically dismantles geographic barriers to employment. Furthermore, from an ecological standpoint, incentivizing modal shift from private vehicles directly curtails urban emissions.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'Well, I think buses should be free because for me, bus tickets are quite expensive and my friends also like free transport.',
      institutionalBand8Sample: 'From a municipal regulatory standpoint, eliminating transit fares presents substantial fiscal challenges; nevertheless, it significantly bolsters socioeconomic mobility for vulnerable demographics.',
      explanation: 'Câu trả lời Band 5.5 chỉ xoay quanh trải nghiệm cá nhân ("I think", "for me", "my friends"). Câu trả lời Band 8.5+ sử dụng lăng kính Chính phủ và Công bằng Xã hội với thuật ngữ thể chế vĩ mô.'
    }
  },
  {
    id: 'sp-02',
    question: 'Should governments impose statutory limits on corporate automation and artificial intelligence to protect manufacturing jobs?',
    topicDomain: 'Labor Economics & Artificial Intelligence',
    recommendedPrisms: ['corporate', 'scientific'],
    policyDilemmaSummary: 'Xung đột giữa tính tất yếu của đổi mới công nghệ nhằm tối ưu hóa năng suất và nguy cơ thất nghiệp cơ cấu của tầng lớp lao động chân tay.',
    band8SampleResponse: 'Examining this through the prism of market dynamics, commercial enterprises rely on automation to maximize algorithmic efficiency, lower marginal costs, and maintain global competitiveness in volatile markets. Imposing statutory caps could cripple industrial innovation. Conversely, from the vantage point of socioeconomic equity, unbridled technological disruption precipitates sudden structural unemployment among vulnerable blue-collar cohorts. Therefore, rather than stalling technological feasibility, policymakers should mandate corporate reskilling levies and strengthen the social safety net.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'I believe robots are dangerous for workers because my uncle lost his factory job last year so the government should stop robots.',
      institutionalBand8Sample: 'While enterprise entities prioritize technological productivity gains, statutory mandates should balance automation with targeted workforce transition subsidies.',
      explanation: 'Chuyển từ câu chuyện cá nhân gia đình sang phân tích sự đánh đổi giữa năng suất doanh nghiệp và chính sách an sinh xã hội.'
    }
  },
  {
    id: 'sp-03',
    question: 'Is it ethical to implement a punitive carbon tax on domestic consumer flights to curb greenhouse gas emissions?',
    topicDomain: 'Environmental Economics & Climate Policy',
    recommendedPrisms: ['individual', 'global'],
    policyDilemmaSummary: 'Đánh đổi giữa quyền tự do đi lại với chi phí hợp lý của người tiêu dùng và nghĩa vụ hiệp ước giảm phát thải toàn cầu.',
    band8SampleResponse: 'At the consumer level, a punitive aviation levy directly inflates household travel expenditures, disproportionately restricting domestic mobility for middle- and lower-income families while leaving affluent executives unaffected. Nonetheless, from a multilateral climate perspective, international accords mandate decisive carbon reductions. Without statutory fiscal disincentives, airline corporations have little motivation to accelerate investment in sustainable aviation fuels. Thus, carbon taxes must be coupled with heavy public investment in high-speed electrified rail networks.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'In my opinion, plane tickets are already too expensive so I think people should not pay more taxes when they travel on holiday.',
      institutionalBand8Sample: 'Although carbon levies inflate domestic consumer expenditures, they provide an indispensable price signal to align aviation with multilateral emission targets.',
      explanation: 'Sử dụng khái niệm kinh tế "price signal" và "multilateral emission targets" thay cho ý kiến cá nhân về giá vé máy bay.'
    }
  },
  {
    id: 'sp-04',
    question: 'To what extent should tertiary university education be universally funded by the state rather than funded through student debt?',
    topicDomain: 'Educational Policy & Human Capital',
    recommendedPrisms: ['government', 'vulnerable'],
    policyDilemmaSummary: 'Sự cân bằng giữa phân bổ ngân sách công quốc gia và việc đảm bảo công bằng cơ hội học thuật cho thế hệ trẻ.',
    band8SampleResponse: 'From a fiscal policy standpoint, state-funded higher education demands immense public expenditure, potentially diverting capital from foundational primary schooling or healthcare infrastructure. However, when viewed through the lens of socioeconomic equity, commercialized student debt models entrench intergenerational wealth disparities. Underprivileged students frequently forgo high-impact professional careers due to debt aversion. Therefore, treating tertiary education as a collective public investment enhances human capital and long-term tax revenues.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'I think university should be totally free because students have no money and it is very hard to study when you have debt.',
      institutionalBand8Sample: 'From a human capital investment perspective, state-subsidized higher education dismantles systemic barriers to intergenerational socioeconomic mobility.',
      explanation: 'Nâng cấp từ than phiền học sinh nghèo thành luận điểm "đầu tư vốn con người" (human capital investment).'
    }
  },
  {
    id: 'sp-05',
    question: 'Should multinational tech conglomerates be held legally accountable for the mental health impacts of their algorithmic recommendation feeds?',
    topicDomain: 'Digital Ethics & Corporate Governance',
    recommendedPrisms: ['corporate', 'scientific'],
    policyDilemmaSummary: 'Mâu thuẫn giữa mô hình kinh doanh tối đa hóa thời gian tương tác của mạng xã hội và bằng chứng khoa học về tổn thương tâm lý vị thành niên.',
    band8SampleResponse: 'From an enterprise governance perspective, social media corporations argue that algorithms simply optimize user engagement and content discovery, asserting that statutory liability would undermine digital platform innovation. However, longitudinal psychiatric and neuroscientific data conclusively links hyper-personalized recommendation loops to acute adolescent anxiety and cognitive fragmentation. Therefore, regulatory authorities must enforce statutory algorithmic transparency and hold commercial platforms accountable under duty-of-care legislation.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'I feel that TikTok is very addictive and my younger sister spends too much time on her phone so companies must be punished.',
      institutionalBand8Sample: 'Given the empirical psychiatric consensus regarding dopamine-driven algorithmic loops, regulatory bodies must institute statutory duty-of-care frameworks.',
      explanation: 'Thay thế ví dụ cá nhân em gái bằng "empirical psychiatric consensus" và "statutory duty-of-care frameworks".'
    }
  },
  {
    id: 'sp-06',
    question: 'Should urban municipalities ban private motor vehicles from city centres to enforce zero-emission zones?',
    topicDomain: 'Urban Planning & Public Health',
    recommendedPrisms: ['government', 'individual'],
    policyDilemmaSummary: 'Sự xung đột giữa quyền tự do di chuyển tiện lợi của người dân và mục tiêu sức khỏe cộng đồng của chính quyền.',
    band8SampleResponse: 'At the individual consumer level, total vehicular prohibitions cause acute friction for residents requiring private transport, especially suburban commuters and individuals with physical disabilities. Conversely, from an urban governance and public health viewpoint, pedestrianizing downtown cores dramatically mitigates particulate air pollution, alleviates chronic traffic congestion, and revitalizes street-level retail commerce. The policy dilemma requires municipal authorities to guarantee seamless park-and-ride networks before enforcing statutory bans.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'I think cars make too much traffic and noise so people should ride bicycles instead of driving in the city.',
      institutionalBand8Sample: 'While vehicular bans impose transitional friction on daily commuters, municipal pedestrianization generates profound longitudinal public health and commercial dividends.',
      explanation: 'Sử dụng cấu trúc nhượng bộ C1/C2 (While... municipal pedestrianization generates longitudinal dividends).'
    }
  },
  {
    id: 'sp-07',
    question: 'Who should bear the financial burden of transitioning to renewable energy: ordinary taxpayers or fossil fuel corporations?',
    topicDomain: 'Energy Transition & Climate Justice',
    recommendedPrisms: ['corporate', 'vulnerable'],
    policyDilemmaSummary: 'Tranh cãi về công lý khí hậu giữa biên lợi nhuận lịch sử của tập đoàn năng lượng và gánh nặng chi phí sinh hoạt của hộ gia đình.',
    band8SampleResponse: 'Through the lens of corporate accountability and climate justice, multinational energy conglomerates have accumulated unprecedented windfall profits while generating systemic negative externalities; hence, they should absorb the primary capital expenditure. If governments pass these costs directly onto domestic utility bills, it precipitates severe energy poverty among lower-income socioeconomic cohorts. Therefore, a hybrid fiscal policy—combining targeted windfall taxes on fossil profits with state-backed green bond subsidies—is the most equitable approach.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'I believe big oil companies have a lot of money so they should pay everything because normal people are poor.',
      institutionalBand8Sample: 'Corporate energy entities ought to internalize their negative externalities through windfall levies, preventing regressive tariff hikes on vulnerable households.',
      explanation: 'Sử dụng thuật ngữ kinh tế học hàn lâm "negative externalities" và "regressive tariff hikes".'
    }
  },
  {
    id: 'sp-08',
    question: 'Should developing nations be exempt from mandatory carbon emission caps under international climate treaties?',
    topicDomain: 'Geopolitics & Multilateral Environmental Treaties',
    recommendedPrisms: ['global', 'vulnerable'],
    policyDilemmaSummary: 'Cân bằng giữa trách nhiệm lịch sử phát thải của các nước công nghiệp phát triển và tính cấp bách của mục tiêu khí hậu toàn cầu.',
    band8SampleResponse: 'From a multilateral treaty perspective, international agreements recognize the principle of "common but differentiated responsibilities." Historically, industrialized economies generated the vast majority of cumulative atmospheric greenhouse gases, enabling their economic prosperity. Forcing developing nations to accept identical caps without financial compensation constrains their basic industrialization and poverty alleviation efforts. However, because emerging economies now account for substantial forward emissions, global accords must pair emissions targets with robust technological and financial transfers from the Global North.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'In my opinion it is not fair for poor countries to stop factories because they need to develop their economy like rich countries.',
      institutionalBand8Sample: 'Multilateral climate accords must adhere to differentiated historic accountability while facilitating green technology transfers to emerging economies.',
      explanation: 'Sử dụng thuật ngữ ngoại giao quốc tế "differentiated historic accountability".'
    }
  },
  {
    id: 'sp-09',
    question: 'Are statutory quota regulations the most effective mechanism to eliminate gender disparities on corporate executive boards?',
    topicDomain: 'Corporate Governance & Social Equality',
    recommendedPrisms: ['corporate', 'government'],
    policyDilemmaSummary: 'Tranh luận giữa sự can thiệp cưỡng chế của pháp luật và nguyên tắc tự do tuyển dụng dựa trên năng lực của doanh nghiệp.',
    band8SampleResponse: 'From a free-market and corporate governance perspective, opponents argue that statutory gender quotas interfere with enterprise autonomy and meritocratic appointment processes. However, empirical sociological research indicates that voluntary corporate guidelines fail to dismantle entrenched old-boy networks. Statutory enforcement provides the necessary systemic shock to diversify decision-making, which financial studies correlate with superior longitudinal risk management and broader talent acquisition.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'I think women should have equal chances on company boards because women are just as smart as men.',
      institutionalBand8Sample: 'While enterprise traditionalists defend unregulated appointments, statutory quotas provide an essential regulatory catalyst to overcome structural hiring biases.',
      explanation: 'Nâng tầm từ sự bình đẳng giới chung chung lên "regulatory catalyst to overcome structural hiring biases".'
    }
  },
  {
    id: 'sp-10',
    question: 'Should pharmaceutical corporations be compelled to waive intellectual property patents on life-saving medical treatments during global health emergencies?',
    topicDomain: 'Bioethics & Global Public Health',
    recommendedPrisms: ['corporate', 'global'],
    policyDilemmaSummary: 'Xung đột giữa động lực bảo hộ sáng chế để thu hồi vốn R&D của doanh nghiệp dược và nghĩa vụ nhân đạo toàn cầu cứu sống con người.',
    band8SampleResponse: 'From an enterprise and pharmaceutical R&D perspective, patent protections are crucial to recoup billions invested in high-risk clinical trials; waiving patents risks disincentivizing future biotechnology innovation. Nonetheless, during transnational health crises, global humanitarian obligations and epidemic containment must supersede commercial profitability. Failure to distribute treatments equitably enables pathogen mutations that threaten global security. Thus, multilateral institutions like the WHO should implement compulsory licensing coupled with predetermined sovereign compensation.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'I believe medicine should be free for dying people because money is not as important as human lives.',
      institutionalBand8Sample: 'Although intellectual property rights safeguard future research capital, multilateral compulsory licensing is imperative during transnational crises.',
      explanation: 'Giải quyết bài toán hài hòa giữa bảo hộ sở hữu trí tuệ (IP rights) và cấp phép bắt buộc (compulsory licensing).'
    }
  },
  {
    id: 'sp-11',
    question: 'Should governments subsidize healthy organic foods or impose steep excise taxes on ultra-processed and sugary food products?',
    topicDomain: 'Public Health Policy & Consumer Nutrition',
    recommendedPrisms: ['government', 'individual'],
    policyDilemmaSummary: 'Lựa chọn chính sách giữa can thiệp giá cả tiêu dùng và trách nhiệm giảm tải gánh nặng bệnh tật cho hệ thống y tế công cộng.',
    band8SampleResponse: 'At the consumer level, aggressive sugar and fat excise taxes are often criticized as paternalistic and regressive, disproportionately raising grocery bills for lower-income households with limited dietary choices. However, from a public health and municipal expenditure standpoint, diet-related metabolic disorders impose billions in preventative healthcare costs annually. An optimal policy response requires reinvesting excise tax proceeds into direct subsidies for fresh produce, making nutritious food economically accessible rather than purely punitive.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'I think fast food is very unhealthy so the government should make junk food expensive so people eat salad.',
      institutionalBand8Sample: 'Rather than enacting purely punitive excise tariffs, regulatory bodies should cross-subsidize fresh agricultural produce to incentivize voluntary consumer transitions.',
      explanation: 'Sử dụng khái niệm "cross-subsidize" (trợ cấp chéo) và "paternalistic tariffs" chuẩn C1/C2.'
    }
  },
  {
    id: 'sp-12',
    question: 'Is the widespread growth of remote teleworking accelerating economic decentralization or widening the digital socioeconomic divide?',
    topicDomain: 'Urban Sociology & Digital Infrastructure',
    recommendedPrisms: ['corporate', 'vulnerable'],
    policyDilemmaSummary: 'Tác động kép của làm việc từ xa: giải phóng nhân sự trí thức và phân hóa cơ hội đối với lao động trực tiếp tại chỗ.',
    band8SampleResponse: 'From an enterprise and knowledge-worker perspective, remote teleworking reduces corporate commercial real estate overheads and stimulates regional economic decentralization by allowing employees to relocate away from congested megacities. Conversely, through the lens of socioeconomic equity, teleworking is heavily stratified: blue-collar service workers in hospitality, logistics, and retail cannot work remotely and bear higher inflationary transport costs. Without state investment in universal rural broadband and digital literacy, teleworking risks polarizing the modern labor market.',
    egocentricVsInstitutionalContrast: {
      egocentricBand5Sample: 'In my experience I love working from home because I don\'t have to wake up early or sit in traffic.',
      institutionalBand8Sample: 'While flexible teleworking yields commercial efficiencies for knowledge sectors, it risks deepening labor market polarization for service-oriented socioeconomic cohorts.',
      explanation: 'Chuyển từ sự tiện lợi cá nhân ngủ dậy muộn thành phân tích sự phân hóa thị trường lao động (labor market polarization).'
    }
  }
];
