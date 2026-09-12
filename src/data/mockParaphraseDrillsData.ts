/**
 * 15 Cambridge-Standard Paraphrase Transformation Drills across 5 Core Techniques
 */

import { ParaphraseTechnique } from '@/lib/paraphraseVerifier';

export interface ParaphraseDrillItem {
  id: string;
  technique: ParaphraseTechnique;
  techniqueName: string;
  topic: string;
  originalSentence: string;
  promptInstruction: string;
  targetTerm?: string;
  requiredKeyword?: string;
  hints: string[];
  benchmarks: {
    band65: string;
    band75: string;
    band85: string;
  };
  examinerPedagogy: string;
}

export const MOCK_PARAPHRASE_DRILLS: ParaphraseDrillItem[] = [
  // 1. Academic Synonyms (3 drills)
  {
    id: 'para_syn_01',
    technique: 'synonyms',
    techniqueName: 'Academic Synonyms',
    topic: 'Urban Environmental Quality',
    originalSentence: 'Air quality in major metropolitan areas continues to deteriorate at an alarming rate.',
    promptInstruction: 'Hãy viết lại câu văn bằng cách thay thế động từ "deteriorate" và cụm "at an alarming rate" bằng các từ đồng nghĩa học thuật C1.',
    targetTerm: 'deteriorate',
    hints: ['deteriorate -> degrade / worsen / decline', 'at an alarming rate -> with unprecedented rapidity / at an exponential pace'],
    benchmarks: {
      band65: 'Air quality in big cities continues to degrade very quickly.',
      band75: 'Atmospheric conditions in major urban centers continue to decline at an unprecedented pace.',
      band85: 'Urban atmospheric quality continues to degrade with alarming velocity across major metropolises.',
    },
    examinerPedagogy: 'Thay thế từ vựng đồng nghĩa phải bảo đảm đúng trường nghĩa học thuật (Atmospheric conditions / urban atmospheric quality).',
  },
  {
    id: 'para_syn_02',
    technique: 'synonyms',
    techniqueName: 'Academic Synonyms',
    topic: 'Public Health Policy',
    originalSentence: 'Governments must mitigate the harmful effects of air pollution on citizens.',
    promptInstruction: 'Thay thế động từ "mitigate" và tính từ "harmful" bằng các từ vựng Band 7.5+.',
    targetTerm: 'mitigate',
    hints: ['mitigate -> alleviate / curb / attenuate', 'harmful effects -> adverse impacts / detrimental ramifications'],
    benchmarks: {
      band65: 'Governments must reduce the bad impacts of air pollution on people.',
      band75: 'Authorities must alleviate the detrimental effects of airborne pollution on the general public.',
      band85: 'State authorities are obligated to attenuate the adverse ramifications of atmospheric contamination on public well-being.',
    },
    examinerPedagogy: '"alleviate" và "attenuate" là các động từ cao cấp thường dùng trong báo cáo y tế công cộng.',
  },
  {
    id: 'para_syn_03',
    technique: 'synonyms',
    techniqueName: 'Academic Synonyms',
    topic: 'Renewable Energy Transition',
    originalSentence: 'Fossil fuels remain the predominant source of electrical power worldwide.',
    promptInstruction: 'Thay thế tính từ "predominant" và danh từ "electrical power".',
    targetTerm: 'predominant',
    hints: ['predominant -> primary / principal / dominant', 'electrical power -> electricity generation'],
    benchmarks: {
      band65: 'Fossil fuels remain the main source of electricity across the globe.',
      band75: 'Fossil fuels continue to serve as the principal source for global electricity generation.',
      band85: 'Hydrocarbon fuels persist as the primary cornerstone of global electricity production.',
    },
    examinerPedagogy: 'Sử dụng "Hydrocarbon fuels" thay cho "Fossil fuels" thể hiện vốn từ vựng học thuật chuyên sâu.',
  },

  // 2. Word Class Transformation (3 drills)
  {
    id: 'para_wc_01',
    technique: 'word_class',
    techniqueName: 'Word Class Transformation',
    topic: 'Economic Industrialization',
    originalSentence: 'The economy expanded rapidly following the implementation of tax reforms.',
    promptInstruction: 'Biến đổi động từ "expanded" thành danh từ "expansion" để viết lại câu văn mang tính nén thông tin.',
    requiredKeyword: 'expansion',
    hints: ['expanded (v) -> witnessed rapid expansion (n) / the rapid expansion of...'],
    benchmarks: {
      band65: 'The rapid expansion of the economy occurred after tax reforms were introduced.',
      band75: 'The economy experienced rapid expansion following the enactment of fiscal tax reforms.',
      band85: 'The enactment of fiscal tax reforms precipitated unprecedented economic expansion.',
    },
    examinerPedagogy: 'Chuyển đổi Verb -> Noun ("witnessed expansion") giúp bài viết chuyển dịch từ văn phong tường thuật sang văn phong phân tích.',
  },
  {
    id: 'para_wc_02',
    technique: 'word_class',
    techniqueName: 'Word Class Transformation',
    topic: 'Artificial Intelligence in Healthcare',
    originalSentence: 'Doctors diagnose diseases accurately by utilizing intelligent imaging software.',
    promptInstruction: 'Biến đổi động từ "diagnose" và trạng từ "accurately" thành cụm danh từ "diagnostic accuracy".',
    requiredKeyword: 'accuracy',
    hints: ['diagnose accurately -> enhance diagnostic accuracy / achieve higher diagnostic precision'],
    benchmarks: {
      band65: 'Intelligent software helps doctors achieve high diagnostic accuracy.',
      band75: 'The utilization of intelligent imaging software markedly enhances diagnostic accuracy among medical practitioners.',
      band85: 'Diagnostic accuracy is substantially elevated when medical practitioners deploy intelligent algorithmic imaging systems.',
    },
    examinerPedagogy: '"Diagnostic accuracy" là cụm danh từ học thuật chuẩn xác trong các bài báo y khoa quốc tế.',
  },
  {
    id: 'para_wc_03',
    technique: 'word_class',
    techniqueName: 'Word Class Transformation',
    topic: 'Student Academic Performance',
    originalSentence: 'Many students perform poorly because they are constantly distracted by smartphones.',
    promptInstruction: 'Biến đổi tính từ "distracted" thành danh từ "distraction" hoặc "poorly" thành "suboptimal performance".',
    requiredKeyword: 'distraction',
    hints: ['distracted (adj) -> constant digital distraction (n)', 'perform poorly -> suffer academic degradation'],
    benchmarks: {
      band65: 'Constant distraction from smartphones causes students to perform poorly in school.',
      band75: 'Persistent smartphone distractions frequently undermine the academic performance of students.',
      band85: 'Chronic digital distraction from portable devices directly precipitates suboptimal scholastic outcomes among learners.',
    },
    examinerPedagogy: 'Biến đổi tính từ bị động "distracted" thành danh từ chủ động "digital distraction" làm chủ ngữ.',
  },

  // 3. Voice Shift (Active <-> Passive) (3 drills)
  {
    id: 'para_vs_01',
    technique: 'voice_shift',
    techniqueName: 'Voice Shift',
    topic: 'Environmental Legislation',
    originalSentence: 'The government passed a new environmental legislation to curb industrial carbon emissions.',
    promptInstruction: 'Chuyển đổi câu chủ động sang Thể Bị Động khách quan (Passive Voice) để nhấn mạnh văn bản luật pháp.',
    hints: ['A new environmental legislation was enacted / ratified...'],
    benchmarks: {
      band65: 'A new environmental law was passed by the government to reduce emissions.',
      band75: 'New environmental legislation was officially ratified by state authorities in order to curb industrial emissions.',
      band85: 'Stringent environmental regulations were enacted by policymakers with the explicit objective of curtailing industrial emissions.',
    },
    examinerPedagogy: 'Thể bị động khách quan giúp loại bỏ góc nhìn chủ quan, tập trung vào đối tượng luật pháp được ban hành.',
  },
  {
    id: 'para_vs_02',
    technique: 'voice_shift',
    techniqueName: 'Voice Shift',
    topic: 'Historical Archeology',
    originalSentence: 'Archaeologists unearthed thousands of ancient bronze artifacts during the recent excavation.',
    promptInstruction: 'Chuyển đổi sang Thể Bị Động để đặt trọng tâm câu vào "thousands of ancient bronze artifacts".',
    hints: ['Thousands of ancient artifacts were unearthed / discovered...'],
    benchmarks: {
      band65: 'Thousands of ancient bronze artifacts were found during the recent excavation.',
      band75: 'Thousands of ancient bronze artifacts were unearthed during the recent archaeological excavation.',
      band85: 'A vast repository of ancient bronze artifacts was successfully unearthed throughout the course of recent archaeological excavations.',
    },
    examinerPedagogy: 'Trong IELTS Academic, các sự kiện khoa học/khảo cổ luôn ưu tiên Thể Bị Động.',
  },
  {
    id: 'para_vs_03',
    technique: 'voice_shift',
    techniqueName: 'Voice Shift',
    topic: 'Urban Traffic Planning',
    originalSentence: 'City planners designed the automated metro network to transport 500,000 commuters daily.',
    promptInstruction: 'Chuyển sang Thể Bị Động với cấu trúc "is engineered / conceived to...".',
    hints: ['The automated metro network was designed / engineered to accommodate...'],
    benchmarks: {
      band65: 'The automated metro network was designed to carry 500,000 passengers each day.',
      band75: 'The automated metro system was conceived to facilitate the transit of half a million daily commuters.',
      band85: 'The automated subterranean transit network is engineered to accommodate a daily passenger volume exceeding half a million commuters.',
    },
    examinerPedagogy: '"is engineered to accommodate" là cấu trúc bị động đạt chuẩn Band 8.0+ Task 1 & Task 2.',
  },

  // 4. Clause Restructuring (3 drills)
  {
    id: 'para_cr_01',
    technique: 'clause_restructuring',
    techniqueName: 'Clause Restructuring',
    topic: 'Higher Education Tuition Fees',
    originalSentence: 'University education has become exorbitantly expensive; nevertheless, the number of applicants continues to rise.',
    promptInstruction: 'Tái cấu trúc câu bằng cách sử dụng liên từ nhượng bộ "Despite" hoặc "Although" đặt ở đầu câu.',
    hints: ['Despite the exorbitant cost of..., the applicant volume...'],
    benchmarks: {
      band65: 'Although university education is very expensive, more students continue to apply.',
      band75: 'Despite the exorbitant cost of higher education, tertiary applicant numbers continue on an upward trajectory.',
      band85: 'Notwithstanding the escalating financial burden of tertiary tuition, student enrollment numbers persist in demonstrating robust growth.',
    },
    examinerPedagogy: 'Cấu trúc "Notwithstanding + Noun phrase, [Main Clause]" thể hiện độ tinh thông ngữ pháp vượt trội.',
  },
  {
    id: 'para_cr_02',
    technique: 'clause_restructuring',
    techniqueName: 'Clause Restructuring',
    topic: 'Public Transport vs Private Cars',
    originalSentence: 'Public transport is significantly cheaper than private vehicles, yet many commuters still prefer driving to work.',
    promptInstruction: 'Tái cấu trúc bằng liên từ tương phản "While" hoặc "Whereas" đứng đầu câu.',
    hints: ['While public transit offers substantial financial savings, many commuters...'],
    benchmarks: {
      band65: 'While public transport is much cheaper than cars, many people still choose to drive.',
      band75: 'While public transportation offers considerable cost advantages over private vehicles, a vast number of commuters remain devoted to driving.',
      band85: 'Whereas public transit represents a markedly more economical alternative to private automobiles, a substantial segment of the workforce continues to favor personal vehicular travel.',
    },
    examinerPedagogy: 'Sử dụng "Whereas [Vế A], [Vế B]" giúp đối sánh hai hiện tượng một cách trang trọng.',
  },
  {
    id: 'para_cr_03',
    technique: 'clause_restructuring',
    techniqueName: 'Clause Restructuring',
    topic: 'Remote Working Constraints',
    originalSentence: 'Employees enjoy greater schedule flexibility when working remotely, but they often experience feelings of professional isolation.',
    promptInstruction: 'Đảo trật tự mệnh đề kết hợp liên từ "Although" hoặc "In spite of".',
    hints: ['Although remote work affords greater temporal flexibility, employees frequently suffer from...'],
    benchmarks: {
      band65: 'Although working from home gives employees flexible hours, they often feel isolated.',
      band75: 'Although remote employment affords superior temporal flexibility, professionals frequently struggle with feelings of occupational isolation.',
      band85: 'In spite of the considerable temporal flexibility conferred by remote employment, practitioners frequently grapple with acute professional alienation.',
    },
    examinerPedagogy: 'Cụm "grapple with acute professional alienation" nâng tầm câu văn lên mức C2.',
  },

  // 5. Nominalization & Compression (3 drills)
  {
    id: 'para_nom_01',
    technique: 'nominalization',
    techniqueName: 'Nominalization & Compression',
    topic: 'Urban Migration & Housing',
    originalSentence: 'Because people are migrating from rural areas to cities at a rapid pace, housing prices have increased dramatically.',
    promptInstruction: 'Nén toàn bộ mệnh đề nguyên nhân "Because people are migrating..." thành một cụm danh từ hóa làm chủ ngữ.',
    hints: ['Rapid rural-to-urban migration has precipitated a dramatic escalation in housing prices.'],
    benchmarks: {
      band65: 'Rapid migration from countryside to cities has caused high housing prices.',
      band75: 'Accelerated rural-to-urban migration has precipitated a dramatic surge in residential property valuations.',
      band85: 'The relentless pace of rural-to-urban demographic migration has catalyzed an acute escalation in metropolitan housing expenditures.',
    },
    examinerPedagogy: 'Danh từ hóa "The relentless pace of migration..." giúp câu văn trở nên cô đọng và mang tính học thuật đỉnh cao.',
  },
  {
    id: 'para_nom_02',
    technique: 'nominalization',
    techniqueName: 'Nominalization & Compression',
    topic: 'Deforestation & Climate Impact',
    originalSentence: 'When corporations destroy tropical rainforests for commercial agriculture, they destroy vital habitats for endangered species.',
    promptInstruction: 'Danh từ hóa hành động "corporations destroy tropical rainforests" thành cụm danh từ "Commercial deforestation".',
    hints: ['Commercial deforestation for agricultural expansion leads to habitat destruction...'],
    benchmarks: {
      band65: 'Deforestation for agricultural use results in the destruction of animal habitats.',
      band75: 'Commercial deforestation for agricultural expansion inevitably leads to the severe destruction of critical wildlife habitats.',
      band85: 'The commercial clearing of tropical rainforests for agribusiness constitutes a direct catalyst for irreversible habitat fragmentation among endangered fauna.',
    },
    examinerPedagogy: 'Thay "destroy habitats" -> "catalyst for irreversible habitat fragmentation".',
  },
  {
    id: 'para_nom_03',
    technique: 'nominalization',
    techniqueName: 'Nominalization & Compression',
    topic: 'Consumer Expenditure & Inflation',
    originalSentence: 'When consumer spending declines because inflation rises, retail businesses suffer severe financial losses.',
    promptInstruction: 'Nén thông tin thành cụm quan hệ nhân quả danh từ hóa: "Inflationary pressures and the ensuing contraction in consumer expenditure...".',
    hints: ['The contraction in consumer spending driven by escalating inflation imposes severe losses...'],
    benchmarks: {
      band65: 'A decline in consumer spending due to rising inflation causes big losses for retail shops.',
      band75: 'The contraction in consumer expenditure induced by escalating inflation imposes acute financial strain on the retail sector.',
      band85: 'Escalating inflationary pressures and the subsequent contraction in discretionary consumer expenditure exert profound financial strain across the commercial retail sector.',
    },
    examinerPedagogy: 'Biến 2 mệnh đề điều kiện "When A... because B..." thành chuỗi danh từ hóa liên hoàn.',
  },
];
