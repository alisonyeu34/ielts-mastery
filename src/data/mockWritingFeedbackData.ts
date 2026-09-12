export interface FlaggedIssue {
  type: "gra" | "lr" | "cc" | "tr";
  errorSnippet: string;
  issueDescription: string;
}

export interface TargetVocabCollocation {
  phrase: string;
  ipa: string;
  meaningVi: string;
  contextSentence: string;
}

export interface AnnotatedSentence {
  id: string;
  paragraphIndex: number;
  originalSentence: string;
  flaggedIssues: FlaggedIssue[];
  band65Correction: string;
  band80Upgrade: string;
  upgradeTechnique: string; // e.g. "Nominalization & Passive Inversion", "Advanced Collocation & Cleft Sentence"
  targetVocabCollocation?: TargetVocabCollocation;
}

export interface WritingCriteriaEvaluation {
  score: number;
  bandLabel: string;
  strengths: string[];
  weaknesses: string[];
  examinerAdvice: string;
}

export interface WritingFeedbackReport {
  id: string;
  taskType: "task1" | "task2";
  prompt: string;
  originalEssay: string;
  wordCount: number;
  timeSpentSeconds: number;
  overallBand: number;
  criteria: {
    tr: WritingCriteriaEvaluation;
    cc: WritingCriteriaEvaluation;
    lr: WritingCriteriaEvaluation;
    gra: WritingCriteriaEvaluation;
  };
  annotatedSentences: AnnotatedSentence[];
  generalExaminerComment: string;
}

export const MOCK_BAND55_ESSAY = `In contemporary society, many people argue that unpaid community service should be compulsory for every high school students. In my opinion, I completely agree with this viewpoint because doing voluntary works brings numerous benefits for students and the community.

First of all, doing community service help teenagers develop essential soft skills. When young people take part in social activities such as cleaning streets or helping elderly people in nursing home, they learn teamwork and communication. In addition, this experience helps them understand the hardship of poor people, so they can become more responsible citizens. If students only study academic subjects at school, they will lack of practical life experience.

On the other hand, compulsory voluntary work can reduce juvenile crime rates. Nowadays, many adolescents have too much free time, so they easily do a crime or engage in antisocial behaviors. Therefore, if the government make community service mandatory, teenagers will spend their leisure time constructively. Furthermore, this policy helps local charities save a lot of money because they do not need to hire expensive workers.

In conclusion, I firmly believe that high school programmes should include unpaid community service. This policy not only equips young students with vital life skills but also makes positive contributions to society.`;

export const MOCK_WRITING_FEEDBACK: WritingFeedbackReport = {
  id: "wf_compulsory_service_01",
  taskType: "task2",
  prompt: "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?",
  originalEssay: MOCK_BAND55_ESSAY,
  wordCount: 228,
  timeSpentSeconds: 2100, // 35 mins
  overallBand: 5.5,
  criteria: {
    tr: {
      score: 6.0,
      bandLabel: "Band 6.0 (Competent Response)",
      strengths: [
        "Đưa ra lập trường rõ ràng (Thesis Statement) ngay tại phần Mở bài.",
        "Trả lời đúng trọng tâm đề bài về lợi ích đối với học sinh và xã hội.",
      ],
      weaknesses: [
        "Luận điểm ở Thân bài 2 còn mang tính suy diễn một chiều: cho rằng thiếu niên phạm tội chỉ vì có quá nhiều thời gian rảnh rỗi.",
        "Chưa đề cập hoặc phản biện lại góc nhìn ngược lại (Counter-argument) về áp lực bài vở của học sinh THPT.",
      ],
      examinerAdvice: "Để bứt phá lên Band 7.0+ TR, hãy phát triển luận điểm theo mô hình Toulmin (Claim -> Reason -> Evidence -> Concession).",
    },
    cc: {
      score: 5.5,
      bandLabel: "Band 5.5 (Modest Cohesion)",
      strengths: [
        "Phân bổ bố cục 4 đoạn văn tiêu chuẩn (Introduction - Body 1 - Body 2 - Conclusion).",
      ],
      weaknesses: [
        "Lạm dụng liên từ nối ở đầu câu một cách máy móc ('First of all', 'In addition', 'Furthermore').",
        "Sử dụng sai liên từ chuyển ý: Dùng 'On the other hand' ở đầu Body 2 trong khi cả 2 đoạn đều nêu lý do ủng hộ (không hề có sự tương phản).",
      ],
      examinerAdvice: "Thay thế các liên từ máy móc bằng kỹ thuật liên kết ngầm (Lexical Cohesion & Anaphoric Pronoun Referencing).",
    },
    lr: {
      score: 5.5,
      bandLabel: "Band 5.5 (Limited Academic Collocations)",
      strengths: [
        "Sử dụng được một số từ vựng đúng ngữ cảnh: 'juvenile crime rates', 'essential soft skills', 'constructively'.",
      ],
      weaknesses: [
        "Lặp lại nhiều lần các động từ và danh từ cơ bản: 'doing voluntary works', 'doing community service'.",
        "Sai Collocation nghiêm trọng: Dùng 'do a crime' thay vì 'commit a crime' / 'engage in delinquent acts'.",
      ],
      examinerAdvice: "Ứng dụng các cụm Collocation học thuật C1 như 'civic engagement', 'altruistic endeavors', 'inculcate social responsibility'.",
    },
    gra: {
      score: 5.0,
      bandLabel: "Band 5.0 (Frequent Basic Errors)",
      strengths: [
        "Có nỗ lực sử dụng câu điều kiện loại 1 ('If students only study...').",
        "Sử dụng cấu trúc tương quan 'not only ... but also ...' ở kết bài.",
      ],
      weaknesses: [
        "Lỗi hòa hợp Chủ ngữ - Động từ (S-V Agreement): 'doing community service help', 'the government make'.",
        "Lỗi số ít / số nhiều và danh từ không đếm được: 'every high school students' (sau every phải là số ít), 'voluntary works' (work nghĩa là công việc tình nguyện là không đếm được).",
        "Lỗi dùng thừa giới từ: 'lack of practical experience' (động từ 'lack' không đi với 'of').",
      ],
      examinerAdvice: "Kiểm soát triệt để lỗi chia động từ và số nhiều để đạt tỷ lệ > 70% Error-Free Sentences.",
    },
  },
  annotatedSentences: [
    {
      id: "s_01",
      paragraphIndex: 1,
      originalSentence: "In contemporary society, many people argue that unpaid community service should be compulsory for every high school students.",
      flaggedIssues: [
        {
          type: "gra",
          errorSnippet: "every high school students",
          issueDescription: "Lỗi ngữ pháp: Sau 'every' bắt buộc dùng danh từ đếm được số ít (every high school student).",
        },
      ],
      band65Correction: "In contemporary society, many people argue that unpaid community service should be compulsory for every high school student.",
      band80Upgrade: "It is widely contended that integrating mandatory community service into secondary school curricula serves as a catalyst for holistic youth development.",
      upgradeTechnique: "Passive Impersonal Construction & Nominalization ('integrating mandatory community service')",
      targetVocabCollocation: {
        phrase: "mandatory community service",
        ipa: "/ˈmændətəri kəˈmjuːnəti ˈsɜːvɪs/",
        meaningVi: "Dịch vụ cộng đồng bắt buộc",
        contextSentence: "Integrating mandatory community service into high school curricula fosters civic engagement.",
      },
    },
    {
      id: "s_02",
      paragraphIndex: 1,
      originalSentence: "In my opinion, I completely agree with this viewpoint because doing voluntary works brings numerous benefits for students and the community.",
      flaggedIssues: [
        {
          type: "lr",
          errorSnippet: "doing voluntary works",
          issueDescription: "Lỗi Collocation & Danh từ: 'work' khi chỉ hoạt động tình nguyện là danh từ không đếm được, và nên dùng cụm 'participating in voluntary activities'.",
        },
        {
          type: "cc",
          errorSnippet: "In my opinion, I completely agree",
          issueDescription: "Lỗi thừa thãi (Redundancy): 'In my opinion' và 'I agree' cùng xuất hiện gây trùng lặp.",
        },
      ],
      band65Correction: "I completely agree with this viewpoint because participating in volunteer work brings numerous benefits to students and the community.",
      band80Upgrade: "I unequivocally subscribe to this stance, as active engagement in civic initiatives confers multifaceted benefits upon both adolescents and society at large.",
      upgradeTechnique: "Advanced Stance Lexicon ('unequivocally subscribe') & Collocation ('confer multifaceted benefits')",
      targetVocabCollocation: {
        phrase: "confer multifaceted benefits",
        ipa: "/kənˈfɜːr ˌmʌltiˈfæsɪtɪd ˈbenɪfɪts/",
        meaningVi: "Mang lại những lợi ích đa diện / đa chiều",
        contextSentence: "Civic initiatives confer multifaceted benefits upon impressionable youths.",
      },
    },
    {
      id: "s_03",
      paragraphIndex: 2,
      originalSentence: "First of all, doing community service help teenagers develop essential soft skills.",
      flaggedIssues: [
        {
          type: "gra",
          errorSnippet: "doing community service help",
          issueDescription: "Lỗi S-V Agreement: Danh động từ 'doing' làm chủ ngữ là số ít, động từ phải chia 'helps'.",
        },
        {
          type: "cc",
          errorSnippet: "First of all",
          issueDescription: "Lỗi văn phong: 'First of all' mang sắc thái văn nói, nên dùng 'Chief among these is that...'.",
        },
      ],
      band65Correction: "First of all, performing community service helps teenagers develop essential interpersonal skills.",
      band80Upgrade: "Chief among these is that involvement in altruistic endeavors nurtures indispensable interpersonal competencies and emotional resilience.",
      upgradeTechnique: "Academic Topical Fronting ('Chief among these is that...') & C1 Lexicon ('altruistic endeavors')",
      targetVocabCollocation: {
        phrase: "altruistic endeavors",
        ipa: "/ˌæltruˈɪstɪk ɪnˈdevərz/",
        meaningVi: "Những nỗ lực / hoạt động vị tha, vì cộng đồng",
        contextSentence: "Involvement in altruistic endeavors fosters deep social empathy among teenagers.",
      },
    },
    {
      id: "s_04",
      paragraphIndex: 2,
      originalSentence: "If students only study academic subjects at school, they will lack of practical life experience.",
      flaggedIssues: [
        {
          type: "gra",
          errorSnippet: "lack of practical",
          issueDescription: "Lỗi thừa giới từ: Động từ 'lack' là ngoại động từ (transitive verb), đi trực tiếp với tân ngữ: 'lack practical experience'.",
        },
      ],
      band65Correction: "If students only focus on academic subjects at school, they will lack practical life experience.",
      band80Upgrade: "An exclusive focus on scholastic curricula inevitably leaves adolescents devoid of pragmatic competencies and real-world acumen.",
      upgradeTechnique: "Nominalization ('An exclusive focus on scholastic curricula') & Adjective Phrase ('devoid of pragmatic competencies')",
      targetVocabCollocation: {
        phrase: "real-world acumen",
        ipa: "/ˌrɪəl ˈwɜːld ˈækjəmən/",
        meaningVi: "Sự nhạy bén và kinh nghiệm thực tiễn cuộc sống",
        contextSentence: "Classroom instruction alone rarely equips learners with real-world acumen.",
      },
    },
    {
      id: "s_05",
      paragraphIndex: 3,
      originalSentence: "On the other hand, compulsory voluntary work can reduce juvenile crime rates.",
      flaggedIssues: [
        {
          type: "cc",
          errorSnippet: "On the other hand",
          issueDescription: "Lỗi liên từ sai logic: Đoạn này vẫn tiếp tục ủng hộ đề bài, không được dùng 'On the other hand' (vốn dùng để mở đoạn đối lập). Nên dùng 'From a broader societal standpoint'.",
        },
        {
          type: "lr",
          errorSnippet: "compulsory voluntary",
          issueDescription: "Lỗi mâu thuẫn từ nghĩa (Oxymoron): 'compulsory' (bắt buộc) đi liền với 'voluntary' (tự nguyện) là phản logic.",
        },
      ],
      band65Correction: "Furthermore, mandatory community involvement can help curb juvenile delinquency.",
      band80Upgrade: "From a broader socioeconomic perspective, obligatory public service acts as an effective deterrent against juvenile delinquency.",
      upgradeTechnique: "Discourse Marker Upgrade ('From a broader socioeconomic perspective') & Metaphorical Collocation ('acts as an effective deterrent')",
      targetVocabCollocation: {
        phrase: "juvenile delinquency",
        ipa: "/ˈdʒuːvənaɪl dɪˈlɪŋkwənsi/",
        meaningVi: "Tội phạm / hành vi phạm pháp ở lứa tuổi vị thành niên",
        contextSentence: "Structured community programmes mitigate the risks of juvenile delinquency.",
      },
    },
    {
      id: "s_06",
      paragraphIndex: 3,
      originalSentence: "Nowadays, many adolescents have too much free time, so they easily do a crime or engage in antisocial behaviors.",
      flaggedIssues: [
        {
          type: "lr",
          errorSnippet: "do a crime",
          issueDescription: "Lỗi Collocation nặng: Không dùng 'do a crime', phải dùng 'commit a crime' hoặc 'resort to criminal activities'.",
        },
        {
          type: "tr",
          errorSnippet: "easily do a crime",
          issueDescription: "Lỗi võ đoán / khái quát hóa quá mức (Over-generalization): Không phải thanh thiếu niên có thời gian rảnh là 'dễ phạm tội'.",
        },
      ],
      band65Correction: "Nowadays, unsupervised adolescents with excessive leisure time are more prone to committing crimes or engaging in antisocial behavior.",
      band80Upgrade: "Unoccupied leisure hours often leave impressionable youths susceptible to peer pressure and subversive behavioral patterns.",
      upgradeTechnique: "Hedging Academic Stance ('susceptible to') & High-band Lexicon ('subversive behavioral patterns')",
      targetVocabCollocation: {
        phrase: "susceptible to peer pressure",
        ipa: "/səˈseptəbl tə pɪə ˈpreʃər/",
        meaningVi: "Dễ bị ảnh hưởng tiêu cực bởi áp lực bạn bè",
        contextSentence: "Unsupervised teenagers remain acutely susceptible to peer pressure.",
      },
    },
  ],
  generalExaminerComment: "Bài viết nắm được cấu trúc cơ bản của IELTS Writing Task 2 và trả lời trực tiếp đề bài. Tuy nhiên, điểm số bị kìm hãm ở Band 5.5 do các lỗi ngữ pháp cơ bản (chia động từ, số nhiều), lạm dụng liên từ sai ngữ cảnh ('On the other hand') và các lỗi collocation nghiêm trọng ('do a crime', 'doing voluntary works'). Việc nâng cấp từ vựng học thuật C1 và kiểm soát triệt để câu không mắc lỗi (Error-free sentences) sẽ giúp bạn nhanh chóng bứt phá lên Band 7.0+.",
};
