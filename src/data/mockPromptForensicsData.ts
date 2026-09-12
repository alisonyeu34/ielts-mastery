/**
 * Mock Data for Stealth Off-Topic Surgery & Nuanced Prompt Deconstruction Studio
 * Step 93 / 100 - IELTS Writing Task 2 Task Response Forensics (Band 7.5 - 8.5+)
 */

import { PromptComponentType } from '@/lib/promptDeconstructionValidator';

export interface PromptForensicCase {
  id: string;
  cambridgeRef: string;
  topicCategory: 'Technology & AI' | 'Environmental Policy' | 'Education & Pedagogy' | 'Socio-Economics' | 'Urbanization' | 'Public Health' | 'Culture & Globalization';
  promptType: 'agree_disagree' | 'discuss_both_views' | 'advantages_disadvantages' | 'causes_solutions' | 'two_part_question';
  promptText: string;
  components: {
    context: { text: string; startIndex: number; endIndex: number };
    core_subject: { text: string; startIndex: number; endIndex: number };
    limitingQualifiers: Array<{ text: string; startIndex: number; endIndex: number; trapExplanation: string }>;
    directive_task: { text: string; startIndex: number; endIndex: number };
  };
  expectedKeywords: Record<PromptComponentType, string[]>;
  stealthDriftAnalysis: {
    trapSummaryVi: string;
    commonDriftMistake: string;
    whyItCapsBand6: string;
    band85DefenseStrategy: string;
  };
  watertightTheses: {
    band85Sample: string;
    band85ConcessionStance: string;
    weakWishyWashyTrap: string;
    weakTrapCritiqueVi: string;
  };
}

export const MOCK_PROMPT_FORENSIC_CASES: PromptForensicCase[] = [
  {
    id: 'pf-01',
    cambridgeRef: 'Cambridge 18 Test 2',
    topicCategory: 'Environmental Policy',
    promptType: 'agree_disagree',
    promptText: 'Some people believe that the only effective way to reduce global carbon emissions is for governments to impose heavy taxes on fossil fuel companies. To what extent do you agree or disagree?',
    components: {
      context: { text: 'Some people believe that', startIndex: 0, endIndex: 24 },
      core_subject: { text: 'to reduce global carbon emissions is for governments to impose heavy taxes on fossil fuel companies', startIndex: 52, endIndex: 151 },
      limitingQualifiers: [
        {
          text: 'the only effective way',
          startIndex: 25,
          endIndex: 47,
          trapExplanation: 'Từ "the only" là bẫy tuyệt đối hóa. Nếu thí sinh chỉ viết về lợi ích của thuế carbon mà không phản bác tính "độc tôn/duy nhất" thì tối đa chỉ đạt Band 6.0 TR.'
        }
      ],
      directive_task: { text: 'To what extent do you agree or disagree?', startIndex: 153, endIndex: 193 }
    },
    expectedKeywords: {
      context: ['Some people believe'],
      core_subject: ['reduce global carbon emissions', 'impose heavy taxes', 'fossil fuel companies'],
      limiting_qualifier: ['the only effective way', 'only'],
      directive_task: ['To what extent do you agree or disagree']
    },
    stealthDriftAnalysis: {
      trapSummaryVi: 'Bẫy Tuyệt Đối Hóa "The Only Effective Way" (Biện pháp Duy Nhất)',
      commonDriftMistake: 'Viết 2 đoạn thân bài chỉ ca ngợi tác dụng của việc đánh thuế nhiên liệu hóa thạch mà quên chứng minh rằng còn có các giải pháp quan trọng khác (năng lượng tái tạo, ý thức tiêu dùng).',
      whyItCapsBand6: 'Đề bài không hỏi "Đánh thuế có tốt không?", mà hỏi "Đó có phải là cách DUY NHẤT hiệu quả không?". Bỏ qua từ "only" khiến bài viết trả lời sai trọng tâm câu hỏi (Addresses the task only partially).',
      band85DefenseStrategy: 'Bác bỏ tính "duy nhất" (Disagree): Thừa nhận thuế là công cụ đắc lực, nhưng khẳng định cần kết hợp song hành với trợ cấp năng lượng sạch và chuyển đổi công nghệ giao thông công cộng.'
    },
    watertightTheses: {
      band85Sample: 'While levying punitive taxes on fossil fuel corporations is undoubtedly a potent deterrent, this essay firmly disagrees that it represents the sole viable mechanism to mitigate global emissions, maintaining that renewable subsidies and green infrastructure investment are equally indispensable.',
      band85ConcessionStance: 'Nhượng bộ tính hiệu quả của thuế, nhưng kiên quyết phủ định tính "duy nhất".',
      weakWishyWashyTrap: 'There are both advantages and disadvantages to taxing fossil fuel companies, and this essay will examine both sides before drawing a conclusion.',
      weakTrapCritiqueVi: 'Luận đề ba phải, né tránh câu hỏi "To what extent", không thể hiện lập trường xuyên suốt (lack of clear position throughout).'
    }
  },
  {
    id: 'pf-02',
    cambridgeRef: 'Cambridge 17 Test 4',
    topicCategory: 'Technology & AI',
    promptType: 'agree_disagree',
    promptText: 'In many countries, paying for goods and services using mobile phone applications is becoming more common than using cash. Is this a positive or negative development?',
    components: {
      context: { text: 'In many countries', startIndex: 0, endIndex: 17 },
      core_subject: { text: 'paying for goods and services using mobile phone applications is becoming more common than using cash', startIndex: 19, endIndex: 119 },
      limitingQualifiers: [
        {
          text: 'more common than using cash',
          startIndex: 92,
          endIndex: 119,
          trapExplanation: 'Quan hệ so sánh "more common than cash" đòi hỏi thí sinh phải so sánh tính vượt trội hoặc hệ lụy của thanh toán điện tử SO VỚI tiền mặt, không chỉ liệt kê tiện ích của smartphone.'
        }
      ],
      directive_task: { text: 'Is this a positive or negative development?', startIndex: 121, endIndex: 164 }
    },
    expectedKeywords: {
      context: ['In many countries'],
      core_subject: ['paying for goods and services', 'mobile phone applications'],
      limiting_qualifier: ['more common than using cash', 'more common'],
      directive_task: ['Is this a positive or negative development']
    },
    stealthDriftAnalysis: {
      trapSummaryVi: 'Bẫy Lạc Sang "Lợi ích chung của điện thoại thông minh"',
      commonDriftMistake: 'Mở rộng viết về smartphone giúp lướt web, học tập, chụp ảnh thay vì tập trung vào sự chuyển dịch phương thức thanh toán tiền mặt sang số hóa.',
      whyItCapsBand6: 'Lạc phạm vi (Scope Drift): Mất điểm TR vì phân tích các tính năng smartphone ngoài phạm vi tài chính giao dịch.',
      band85DefenseStrategy: 'Tập trung tuyệt đối vào cán cân kinh tế: Tối ưu hóa chu chuyển dòng tiền, tính minh bạch chống trốn thuế vs Rủi ro an ninh mạng & loại trừ nhóm người cao tuổi.'
    },
    watertightTheses: {
      band85Sample: 'Although the eclipse of physical currency by cashless mobile transactions poses marginal cybersecurity vulnerabilities for vulnerable demographics, I contend that this shift is overwhelmingly positive due to enhanced transaction efficiency and superior fiscal transparency.',
      band85ConcessionStance: 'Xác định rõ ràng là "overwhelmingly positive" kèm nhượng bộ rủi ro an ninh mạng.',
      weakWishyWashyTrap: 'Mobile payment has some benefits but also some drawbacks, so people have different opinions on whether it is good or bad.',
      weakTrapCritiqueVi: 'Hoàn toàn không trả lời trực diện câu hỏi "Is this a positive or negative development?".'
    }
  },
  {
    id: 'pf-03',
    cambridgeRef: 'Cambridge 19 Test 1',
    topicCategory: 'Education & Pedagogy',
    promptType: 'discuss_both_views',
    promptText: 'Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake, regardless of whether the course is useful to an employer. Discuss both views and give your opinion.',
    components: {
      context: { text: 'Some people think that', startIndex: 0, endIndex: 22 },
      core_subject: { text: 'universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake', startIndex: 23, endIndex: 226 },
      limitingQualifiers: [
        {
          text: 'for its own sake, regardless of whether the course is useful to an employer',
          startIndex: 153,
          endIndex: 227,
          trapExplanation: 'Cụm "for its own sake, regardless of utility" nhấn mạnh giáo dục khai phóng hàn lâm thuần túy (pure academia/intellectual inquiry). Bỏ qua sẽ không làm rõ được xung đột giữa Vocational Training vs Liberal Arts.'
        }
      ],
      directive_task: { text: 'Discuss both views and give your opinion.', startIndex: 229, endIndex: 270 }
    },
    expectedKeywords: {
      context: ['Some people think'],
      core_subject: ['universities provide knowledge and skills needed in the workplace', 'true function of a university'],
      limiting_qualifier: ['for its own sake', 'regardless of whether the course is useful to an employer', 'needed in the workplace'],
      directive_task: ['Discuss both views and give your opinion']
    },
    stealthDriftAnalysis: {
      trapSummaryVi: 'Bẫy Không Cân Bằng Cả Hai Luồng Ý Kiến Hoặc Thiếu Quan Điểm Cá Nhân',
      commonDriftMistake: 'Chỉ phân tích quan điểm 1 (Dạy nghề), lướt qua quan điểm 2 (Nghiên cứu thuần túy) hoặc viết kết bài mới đưa ra quan điểm cá nhân một cách vội vàng.',
      whyItCapsBand6: 'Không đáp ứng yêu cầu "discuss both views equally with a sustained personal opinion throughout".',
      band85DefenseStrategy: 'Khung hòa giải nhị nguyên: Phân tích giá trị kinh tế của kỹ năng nghề nghiệp, song khẳng định nghiên cứu lý thuyết nền tảng mới là bệ phóng cho đổi mới sáng tạo dài hạn.'
    },
    watertightTheses: {
      band85Sample: 'While proponents of vocational tertiary education reasonably emphasize immediate graduate employability, this essay argues that the preservation of pure academic inquiry is paramount, as abstract theoretical mastery constitutes the bedrock of long-term societal innovation.',
      band85ConcessionStance: 'Thừa nhận tính thực dụng của đào tạo nghề nhưng ủng hộ nghiên cứu hàn lâm.',
      weakWishyWashyTrap: 'Both views will be discussed in this essay before my personal stance is presented.',
      weakTrapCritiqueVi: 'Mở bài máy móc rập khuôn, không hề nêu rõ quan điểm cá nhân ủng hộ bên nào.'
    }
  },
  {
    id: 'pf-04',
    cambridgeRef: 'Cambridge 16 Test 3',
    topicCategory: 'Socio-Economics',
    promptType: 'agree_disagree',
    promptText: 'In many countries today, people in cities are deciding to have children at an older age than in the past. Why is this happening? Do the advantages of this trend outweigh the disadvantages?',
    components: {
      context: { text: 'In many countries today', startIndex: 0, endIndex: 23 },
      core_subject: { text: 'people in cities are deciding to have children at an older age than in the past', startIndex: 25, endIndex: 104 },
      limitingQualifiers: [
        {
          text: 'people in cities',
          startIndex: 25,
          endIndex: 41,
          trapExplanation: 'Giới hạn chủ thể "in cities" (người sống ở đô thị: áp lực giá nhà, chi phí sinh hoạt đắt đỏ, nhịp sống cạnh tranh). Nếu viết về người nông thôn là lạc đề.'
        },
        {
          text: 'at an older age than in the past',
          startIndex: 73,
          endIndex: 104,
          trapExplanation: 'Yếu tố thời gian so sánh "older age than past" (kết hôn/sinh con muộn).'
        }
      ],
      directive_task: { text: 'Why is this happening? Do the advantages of this trend outweigh the disadvantages?', startIndex: 106, endIndex: 188 }
    },
    expectedKeywords: {
      context: ['In many countries today'],
      core_subject: ['deciding to have children at an older age'],
      limiting_qualifier: ['people in cities', 'in cities', 'at an older age than in the past'],
      directive_task: ['Why is this happening', 'advantages of this trend outweigh the disadvantages']
    },
    stealthDriftAnalysis: {
      trapSummaryVi: 'Bẫy Hai Câu Hỏi (Two-Part Question) Bỏ Quên Một Vế Hoặc Sai Địa Bàn Đô Thị',
      commonDriftMistake: 'Chỉ phân tích nguyên nhân mà quên cân đo Đực - Hại (Outweigh), hoặc đưa ra nguyên nhân thuần túy nông thôn.',
      whyItCapsBand6: 'Bỏ sót một trong hai nhiệm vụ khảo thí (Partially addresses task).',
      band85DefenseStrategy: 'Mở bài 2 vế rõ ràng: (1) Khái quát nguyên nhân cốt lõi (Chi phí sinh hoạt đô thị & thăng tiến sự nghiệp) + (2) Khẳng định rủi ro nhân khẩu học/sinh học vượt trội hơn sự chuẩn bị tài chính.'
    },
    watertightTheses: {
      band85Sample: 'This postponement of parenthood among urbanites is primarily driven by exorbitant living costs and intense career competition; furthermore, while it affords greater financial stability to families, I maintain that its demographic and biological repercussions significantly outweigh these personal advantages.',
      band85ConcessionStance: 'Trả lời súc tích cả 2 câu hỏi với lập trường rõ ràng về vế "Outweigh".',
      weakWishyWashyTrap: 'There are many reasons for this phenomenon and it brings both positive and negative consequences to society.',
      weakTrapCritiqueVi: 'Không chỉ ra được nguyên nhân cốt lõi và không cân đo bên nào "outweigh" bên nào.'
    }
  },
  {
    id: 'pf-05',
    cambridgeRef: 'Cambridge 15 Test 1',
    topicCategory: 'Public Health',
    promptType: 'agree_disagree',
    promptText: 'In some countries, governments are encouraging industries and businesses to move out of large cities and into regional areas. Do you think the advantages of this development outweigh the disadvantages?',
    components: {
      context: { text: 'In some countries', startIndex: 0, endIndex: 17 },
      core_subject: { text: 'governments are encouraging industries and businesses to move out of large cities and into regional areas', startIndex: 19, endIndex: 124 },
      limitingQualifiers: [
        {
          text: 'move out of large cities and into regional areas',
          startIndex: 73,
          endIndex: 124,
          trapExplanation: 'Hướng di chuyển cụ thể: từ Đô thị lớn sang Khu vực ngoại ô/vùng ven (Regional areas). Phải phân tích tác động hai chiều đối với cả đại đô thị lẫn vùng nông thôn tiếp nhận.'
        }
      ],
      directive_task: { text: 'Do you think the advantages of this development outweigh the disadvantages?', startIndex: 126, endIndex: 201 }
    },
    expectedKeywords: {
      context: ['In some countries'],
      core_subject: ['encouraging industries and businesses'],
      limiting_qualifier: ['move out of large cities and into regional areas', 'regional areas', 'large cities'],
      directive_task: ['advantages of this development outweigh the disadvantages']
    },
    stealthDriftAnalysis: {
      trapSummaryVi: 'Bẫy Lạc Vào Việc Đóng Cửa Nhà Máy Thay Vì Di Dời Vùng',
      commonDriftMistake: 'Viết về việc cấm hoặc đóng cửa doanh nghiệp gây ô nhiễm thay vì tập trung vào chính sách di dời phân bổ không gian địa lý.',
      whyItCapsBand6: 'Sai lệch bản chất hành động của đề bài (Relocation vs Banning).',
      band85DefenseStrategy: 'Phân tích đa chiều: Giải phóng quỹ đất & giảm ách tắc đô thị, kích cầu kinh tế địa phương vùng ven vs Chi phí hạ tầng và xáo trộn chuỗi cung ứng.'
    },
    watertightTheses: {
      band85Sample: 'Although decentralizing commercial enterprises to rural peripheries entails formidable logistical expenses and environmental disruption to previously pristine habitats, this essay contends that the alleviation of megacity congestion and equitable regional economic revitalization render this policy overwhelmingly advantageous.',
      band85ConcessionStance: 'Khẳng định lợi ích vượt trội với luận điểm cân bằng về chi phí logistics.',
      weakWishyWashyTrap: 'Moving factories out of big cities has pros and cons which will be explored in the paragraphs below.',
      weakTrapCritiqueVi: 'Thiếu hoàn toàn sự đánh giá "outweigh" và thiếu tính học thuật.'
    }
  },
  {
    id: 'pf-06',
    cambridgeRef: 'Cambridge 18 Test 3',
    topicCategory: 'Culture & Globalization',
    promptType: 'agree_disagree',
    promptText: 'Some people believe that international tourism always brings benefits to a country, while others think it has solely negative impacts. Discuss both views and give your opinion.',
    components: {
      context: { text: 'Some people believe that', startIndex: 0, endIndex: 24 },
      core_subject: { text: 'international tourism brings benefits to a country, while others think it has negative impacts', startIndex: 25, endIndex: 120 },
      limitingQualifiers: [
        {
          text: 'always brings benefits',
          startIndex: 47,
          endIndex: 69,
          trapExplanation: 'Từ "always" là bẫy tuyệt đối hóa cực đoan ở vế 1.'
        },
        {
          text: 'solely negative impacts',
          startIndex: 97,
          endIndex: 120,
          trapExplanation: 'Từ "solely" là bẫy tuyệt đối hóa cực đoan ở vế 2.'
        }
      ],
      directive_task: { text: 'Discuss both views and give your opinion.', startIndex: 122, endIndex: 163 }
    },
    expectedKeywords: {
      context: ['Some people believe'],
      core_subject: ['international tourism', 'benefits', 'negative impacts'],
      limiting_qualifier: ['always', 'solely negative impacts', 'always brings benefits'],
      directive_task: ['Discuss both views and give your opinion']
    },
    stealthDriftAnalysis: {
      trapSummaryVi: 'Bẫy Hai Thái Cực Tuyệt Đối "Always" vs "Solely"',
      commonDriftMistake: 'Ủng hộ 100% một trong hai thái cực mà không nhìn ra rằng cả 2 phát biểu đều mang tính ngụy biện tuyệt đối hóa sai lệch.',
      whyItCapsBand6: 'Không làm chủ được tư duy phản biện tinh tế (Nuanced critical thinking).',
      band85DefenseStrategy: 'Bác bỏ cả 2 thái cực: Du lịch quốc tế không thể "luôn luôn tốt" (vì gây thương mại hóa văn hóa và hủy hoại sinh thái) cũng không thể "hoàn toàn tiêu cực" (vì tạo doanh thu ngoại tệ khổng lồ).'
    },
    watertightTheses: {
      band85Sample: 'While unmanaged mass tourism unquestionably induces severe ecological strain and cultural erosion, portraying it as entirely detrimental is profoundly reductive; I argue that when strictly regulated, its socio-economic dividends substantially outweigh its localized drawbacks.',
      band85ConcessionStance: 'Bác bỏ sự quy chụp cực đoan và đưa ra lập trường có điều kiện quy chuẩn quản lý.',
      weakWishyWashyTrap: 'Tourism has both good points and bad points and people disagree about it.',
      weakTrapCritiqueVi: 'Văn phong tiểu học, không chạm vào được bản chất ngụy biện của đề bài.'
    }
  }
];
