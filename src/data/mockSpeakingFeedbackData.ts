export interface PauseInterval {
  id: string;
  startTimeSec: number;
  endTimeSec: number;
  durationSec: number;
  reason: string;
}

export interface AnnotatedToken {
  text: string;
  type?: "filler" | "gra" | "lr" | "pr";
  correction?: string;
  explanation?: string;
}

export interface SpeakingCollocation {
  phrase: string;
  ipa: string;
  meaningVi: string;
  contextSentence: string;
}

export interface SpeakingCriteriaEvaluation {
  score: number;
  bandLabel: string;
  strengths: string[];
  weaknesses: string[];
  examinerAdvice: string;
}

export interface SpeakingFeedbackReport {
  id: string;
  part: 1 | 2 | 3;
  prompt: string;
  originalTranscript: string;
  durationSeconds: number;
  wordCount: number;
  wordsPerMinute: number;
  pauseCount: number;
  fillerWordCount: number;
  overallBand: number;
  criteria: {
    fc: SpeakingCriteriaEvaluation;
    lr: SpeakingCriteriaEvaluation;
    gra: SpeakingCriteriaEvaluation;
    pr: SpeakingCriteriaEvaluation;
  };
  pauseIntervals: PauseInterval[];
  annotatedTokens: AnnotatedToken[];
  modelAnswer: string;
  modelCollocations: SpeakingCollocation[];
  generalExaminerComment: string;
}

export const MOCK_BAND55_SPEAKING_TRANSCRIPT = `Well, um, to be honest, I think technology, like, makes our life very easy, you know? In the past, people don't have smartphone, so they, uh, must go to the post office to send letters. But now, with internet, we can, like, talk with friends very fast. But, um... on the other hand, it also makes life complicated because people, like, spend too much time on screen and they don't, you know, do exercise or talk directly. So, yeah, it has both sides.`;

export const MOCK_SPEAKING_FEEDBACK: SpeakingFeedbackReport = {
  id: "sf_tech_part3_01",
  part: 3,
  prompt: "Do you think technology has made people's lives easier or more complicated?",
  originalTranscript: MOCK_BAND55_SPEAKING_TRANSCRIPT,
  durationSeconds: 42,
  wordCount: 86,
  wordsPerMinute: 122,
  pauseCount: 4,
  fillerWordCount: 9,
  overallBand: 5.5,
  criteria: {
    fc: {
      score: 5.5,
      bandLabel: "Band 5.5 (Hesitant & Overuses Fillers)",
      strengths: [
        "Duy trì được dòng câu trả lời liên tục và trả lời đúng cả hai khía cạnh (easier vs complicated).",
        "Tốc độ nói trung bình đạt 122 WPM (nằm trong ngưỡng chấp nhận được).",
      ],
      weaknesses: [
        "Lạm dụng quá nhiều từ đệm vô nghĩa: 9 từ đệm trong 86 từ (chiếm tới 10.4% bài nói) như 'um', 'like', 'you know'.",
        "Có 4 khoảng lặng ngập ngừng bất thường kéo dài > 1.5 giây do mất thời gian tìm từ vựng và sắp xếp ngữ pháp.",
      ],
      examinerAdvice: "Thay vì dùng từ đệm 'um, like', hãy sử dụng các cụm câu kéo dài thời gian học thuật (Fillers/Discourse Markers) như: 'That is an intriguing question...', 'From an objective standpoint...'.",
    },
    lr: {
      score: 5.5,
      bandLabel: "Band 5.5 (Basic & Repetitive Lexicon)",
      strengths: [
        "Sử dụng được một số từ vựng đúng chủ đề: 'post office', 'smartphone', 'complicated', 'screen'.",
      ],
      weaknesses: [
        "Lặp từ vựng cơ bản nhiều lần: 'very easy', 'very fast', 'talk directly'.",
        "Thiếu các cụm Collocations và Idiomatic Expressions học thuật để đẩy lên Band 7.0+.",
      ],
      examinerAdvice: "Nâng cấp các tính từ/động từ thường ngày thành các cụm C1 như 'streamline daily logistics', 'engender cognitive complexity', 'pervasive intrusion'.",
    },
    gra: {
      score: 5.0,
      bandLabel: "Band 5.0 (Frequent Tense & Agreement Errors)",
      strengths: [
        "Có sử dụng được liên từ cơ bản ('because', 'so', 'but').",
      ],
      weaknesses: [
        "Lỗi thì trong quá khứ: Nói 'In the past, people don't have smartphone' (đúng phải là: 'didn't have smartphones').",
        "Lỗi danh từ số ít / số nhiều: 'smartphone' (thiếu đuôi số nhiều -s).",
        "Lỗi Collocation động từ: 'do exercise' (văn phong nói hơi thô, nên dùng 'engage in physical exercise').",
      ],
      examinerAdvice: "Kiểm soát độ chính xác của thì Quá khứ đơn (Past Simple) khi kể lại các sự việc trong quá khứ.",
    },
    pr: {
      score: 6.0,
      bandLabel: "Band 6.0 (Generally Clear Pronunciation)",
      strengths: [
        "Phát âm rõ ràng, người nghe bản xứ có thể hiểu được phần lớn nội dung mà không cần cố gắng quá mức.",
        "Ngữ điệu có lên xuống ở cuối các mệnh đề liệt kê.",
      ],
      weaknesses: [
        "Nuốt âm cuối (Ending Sounds): Âm /s/ và /t/ trong 'post office', 'letters', 'friends' phát âm chưa dứt khoát.",
        "Trọng âm từ chưa chuẩn ở từ 'complicated' (nhấn nhầm âm tiết thứ 2 thay vì âm tiết thứ 1: /ˈkɒmplɪkeɪtɪd/).",
      ],
      examinerAdvice: "Chú ý bật rõ các phụ âm cuối /s/, /z/, /t/, /d/ để không bị trừ điểm tiêu chí Pronunciation.",
    },
  },
  pauseIntervals: [
    {
      id: "pause_01",
      startTimeSec: 1.2,
      endTimeSec: 3.1,
      durationSec: 1.9,
      reason: "Ngập ngừng mở đầu: Dùng 'um' để câu giờ tìm ý tưởng.",
    },
    {
      id: "pause_02",
      startTimeSec: 14.5,
      endTimeSec: 16.3,
      durationSec: 1.8,
      reason: "Đứng hình tìm từ vựng: Ngập ngừng trước cụm 'must go to the post office'.",
    },
    {
      id: "pause_03",
      startTimeSec: 25.0,
      endTimeSec: 27.2,
      durationSec: 2.2,
      reason: "Khoảng lặng chuyển ý: Bị nghẽn mạch tư duy khi cố gắng đổi sang khía cạnh tiêu cực.",
    },
    {
      id: "pause_04",
      startTimeSec: 36.8,
      endTimeSec: 38.5,
      durationSec: 1.7,
      reason: "Ngập ngừng kết luận: Cạn ý tưởng nên chốt lại bằng câu cụt 'So, yeah, it has both sides'.",
    },
  ],
  annotatedTokens: [
    { text: "Well, " },
    { text: "um, ", type: "filler", explanation: "Từ đệm vô nghĩa (Filler word)" },
    { text: "to be honest, I think technology, " },
    { text: "like, ", type: "filler", explanation: "Từ đệm lặp lại nhiều lần" },
    { text: "makes our life " },
    { text: "very easy, ", type: "lr", correction: "immensely convenient / streamlined", explanation: "Từ vựng cơ bản, nên nâng cấp thành 'streamlines daily tasks'" },
    { text: "you know? ", type: "filler", explanation: "Từ đệm gây giảm độ trôi chảy" },
    { text: "In the past, people " },
    { text: "don't have smartphone, ", type: "gra", correction: "didn't have smartphones", explanation: "Lỗi thì quá khứ (didn't) và danh từ số nhiều (smartphones)" },
    { text: "so they, " },
    { text: "uh, ", type: "filler", explanation: "Âm ngập ngừng" },
    { text: "must go to the post office to send letters. But now, with internet, we can, " },
    { text: "like, ", type: "filler", explanation: "Từ đệm" },
    { text: "talk with friends " },
    { text: "very fast. ", type: "lr", correction: "instantaneously", explanation: "Nên dùng trạng từ học thuật 'instantaneously'" },
    { text: "But, " },
    { text: "um... ", type: "filler", explanation: "Khoảng lặng 2.2 giây" },
    { text: "on the other hand, it also makes life complicated because people, " },
    { text: "like, ", type: "filler", explanation: "Từ đệm" },
    { text: "spend too much time on screen and they don't, " },
    { text: "you know, ", type: "filler", explanation: "Từ đệm" },
    { text: "do exercise ", type: "lr", correction: "engage in physical exercise", explanation: "Sai collocation tự nhiên" },
    { text: "or talk directly. So, yeah, it has both sides." },
  ],
  modelAnswer: `While it is indisputable that technological advancements have streamlined daily logistics and facilitated instantaneous global communication, I would contend that they simultaneously engender unprecedented layers of cognitive complexity. On the one hand, digital automation eliminates mundane friction in banking, navigation, and commerce. On the other hand, the pervasive intrusion of smart devices tends to exacerbate cognitive overload, blur work-life boundaries, and foster superficial interpersonal connections. Therefore, whether technology simplifies or complicates human existence fundamentally hinges upon individual digital discipline.`,
  modelCollocations: [
    {
      phrase: "streamlined daily logistics",
      ipa: "/ˈstriːmlaɪnd ˈdeɪli ləˈdʒɪstɪks/",
      meaningVi: "Đơn giản hóa và tối ưu hóa các công việc sinh hoạt hàng ngày",
      contextSentence: "Mobile applications have streamlined daily logistics for urban commuters.",
    },
    {
      phrase: "engender unprecedented complexity",
      ipa: "/ɪnˈdʒendər ʌnˈpresɪdentɪd kəmˈpleksəti/",
      meaningVi: "Gây ra / tạo ra sự phức tạp chưa từng có tiền lệ",
      contextSentence: "Algorithmic decision-making engenders unprecedented complexity in modern governance.",
    },
    {
      phrase: "pervasive intrusion of smart devices",
      ipa: "/pəˈveɪsɪv ɪnˈtruːʒn əv smɑːt dɪˈvaɪsɪz/",
      meaningVi: "Sự xâm nhập tràn lan ở khắp mọi nơi của các thiết bị thông minh",
      contextSentence: "The pervasive intrusion of smart devices disrupts face-to-face familial interactions.",
    },
    {
      phrase: "exacerbate cognitive overload",
      ipa: "/ɪɡˈzæsəbeɪt ˈkɒɡnətɪv ˌəʊvəˈləʊd/",
      meaningVi: "Làm trầm trọng thêm tình trạng quá tải nhận thức / thông tin",
      contextSentence: "Continuous push notifications inevitably exacerbate cognitive overload in students.",
    },
  ],
  generalExaminerComment: "Thí sinh thể hiện phản xạ giao tiếp tự nhiên và giải quyết được câu hỏi đa chiều. Tuy nhiên, bài nói bị kìm hãm ở Band 5.5 do mật độ từ đệm quá dày đặc (10.4%), nhiều khoảng dừng ngập ngừng kéo dài và các lỗi thì quá khứ cơ bản ('don't have smartphone'). Việc rèn luyện cấu trúc rào đón (Hedging) và bổ sung các Collocations C1 trong bài mẫu sẽ giúp bạn nâng điểm Fluency và Lexical lên Band 7.5+.",
};
