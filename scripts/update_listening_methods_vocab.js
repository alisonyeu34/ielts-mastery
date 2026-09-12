const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/mockListeningMethodsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Ensure import of VocabBreakdownWord
if (!content.includes('VocabBreakdownWord')) {
  content = content.replace(
    'import { MethodologyQuizItem } from "@/data/mockReadingMethodsData";',
    `import { MethodologyQuizItem } from "@/data/mockReadingMethodsData";\nimport { VocabBreakdownWord } from "@/types/theoryBookmarks";`
  );
}

// 2. Update ListeningSectionBlueprintLesson interface
content = content.replace(
  `export interface AudioSnippetTrapSample {
  id: string;
  titleVi: string;
  transcriptText: string;
  trapExplanationVi: string;
  correctAnswerText: string;
}`,
  `export interface AudioSnippetTrapSample {
  id: string;
  titleVi: string;
  transcriptText: string;
  translationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  trapExplanationVi: string;
  correctAnswerText: string;
}`
);

content = content.replace(
  `  step2ExaminerTraps: Array<{
    trapNameVi: string;
    trapMechanismVi: string;
    dialogueExcerpt: string;
    wrongChoiceVi: string;
    correctAnswer: string;
    examinerInsightVi: string;
  }>;`,
  `  step2ExaminerTraps: Array<{
    trapNameVi: string;
    trapMechanismVi: string;
    dialogueExcerpt: string;
    translationVi?: string;
    wordBreakdown?: VocabBreakdownWord[];
    wrongChoiceVi: string;
    correctAnswer: string;
    examinerInsightVi: string;
  }>;`
);

content = content.replace(
  `  step3ModelWalkthrough: {
    questionPrompt: string;
    audioDialogueText: string;
    audioTimestampAuditVi: string[];
    concludingStrategyVi: string;
  };`,
  `  step3ModelWalkthrough: {
    questionPrompt: string;
    audioDialogueText: string;
    translationVi?: string;
    wordBreakdown?: VocabBreakdownWord[];
    audioTimestampAuditVi: string[];
    concludingStrategyVi: string;
  };`
);

// 3. Section 1 data
content = content.replace(
  `        dialogueExcerpt:
          "OFFICER: What is your current residential address?\\nAPPLICANT: It's 14 Park Avenue... oh wait, sorry, that was my old apartment. We moved to 40 Park Road last month.",
        wrongChoiceVi:`,
  `        dialogueExcerpt:
          "OFFICER: What is your current residential address?\\nAPPLICANT: It's 14 Park Avenue... oh wait, sorry, that was my old apartment. We moved to 40 Park Road last month.",
        translationVi:
          "CÁN BỘ: Địa chỉ thường trú hiện tại của bạn là gì?\\nỨNG VIÊN: Là số 14 Đại lộ Park... ồ khoan đã, xin lỗi, đó là căn hộ cũ của tôi. Chúng tôi đã chuyển đến số 40 Đường Park vào tháng trước.",
        wordBreakdown: [
          { word: "residential address", ipa: "/ˌrez.ɪˈden.ʃəl əˈdres/", type: "phrase", meaningVi: "địa chỉ thường trú" },
          { word: "apartment", ipa: "/əˈpɑːt.mənt/", type: "n", meaningVi: "căn hộ chung cư" },
          { word: "applicant", ipa: "/ˈæp.lɪ.kənt/", type: "n", meaningVi: "người nộp đơn, ứng viên" },
        ],
        wrongChoiceVi:`
);

content = content.replace(
  `        transcriptText:
          "CLIENT: So how much is the standard weekly rent?\\nLANDLORD: It's usually 185 pounds per person, but since you are booking for the whole academic semester, I can reduce it to 165 pounds.",
        trapExplanationVi:`,
  `        transcriptText:
          "CLIENT: So how much is the standard weekly rent?\\nLANDLORD: It's usually 185 pounds per person, but since you are booking for the whole academic semester, I can reduce it to 165 pounds.",
        translationVi:
          "KHÁCH HÀNG: Vậy giá thuê tiêu chuẩn hàng tuần là bao nhiêu?\\nCHỦ NHÀ: Thường là 185 bảng mỗi người, nhưng vì bạn đặt thuê cho cả học kỳ, tôi có thể giảm xuống còn 165 bảng.",
        wordBreakdown: [
          { word: "weekly rent", ipa: "/ˈwiːk.li rent/", type: "phrase", meaningVi: "giá tiền thuê theo tuần" },
          { word: "academic semester", ipa: "/ˌæk.əˈdem.ɪk sɪˈmes.tər/", type: "phrase", meaningVi: "học kỳ đại học" },
        ],
        trapExplanationVi:`
);

content = content.replace(
  `    step3ModelWalkthrough: {
      questionPrompt: "Notes: Total advance deposit: £ [ _____ ]",
      audioDialogueText:
        "OFFICER: The security deposit will be £300... although if you pay today by bank transfer, we only take £250 upfront.",
      audioTimestampAuditVi:`,
  `    step3ModelWalkthrough: {
      questionPrompt: "Notes: Total advance deposit: £ [ _____ ]",
      audioDialogueText:
        "OFFICER: The security deposit will be £300... although if you pay today by bank transfer, we only take £250 upfront.",
      translationVi:
        "CÁN BỘ: Tiền đặt cọc an toàn sẽ là 300 bảng... mặc dù nếu bạn chuyển khoản ngân hàng ngay hôm nay, chúng tôi chỉ thu trước 250 bảng.",
      wordBreakdown: [
        { word: "security deposit", ipa: "/sɪˈkjʊə.rə.ti dɪˈpɒz.ɪt/", type: "phrase", meaningVi: "tiền đặt cọc đảm bảo" },
        { word: "bank transfer", ipa: "/ˈbæŋk ˌtræns.fɜːr/", type: "phrase", meaningVi: "chuyển khoản qua ngân hàng" },
        { word: "upfront", ipa: "/ʌpˈfrʌnt/", type: "adv", meaningVi: "thanh toán trước, trả trước" },
      ],
      audioTimestampAuditVi:`
);

// 4. Section 2 data
content = content.replace(
  `        dialogueExcerpt:
          "GUIDE: As you walk along the River Path towards the Old Mill, don't cross the wooden bridge; instead, take the narrow gravel trail to your immediate right...",
        wrongChoiceVi:`,
  `        dialogueExcerpt:
          "GUIDE: As you walk along the River Path towards the Old Mill, don't cross the wooden bridge; instead, take the narrow gravel trail to your immediate right...",
        translationVi:
          "HƯỚNG DẪN VIÊN: Khi bạn đi dọc theo Con đường ven sông hướng về phía Cối xay gió cổ, đừng băng qua cây cầu gỗ; thay vào đó, hãy rẽ vào lối mòn rải sỏi hẹp ngay bên tay phải của bạn...",
        wordBreakdown: [
          { word: "gravel trail", ipa: "/ˈɡræv.əl treɪl/", type: "phrase", meaningVi: "lối mòn nhỏ rải sỏi" },
          { word: "immediate right", ipa: "/ɪˈmiː.di.ət raɪt/", type: "phrase", meaningVi: "ngay sát bên tay phải" },
        ],
        wrongChoiceVi:`
);

content = content.replace(
  `        transcriptText:
          "GUIDE: Starting from the Visitor Centre, if you head due north past the duck pond, the Butterfly Sanctuary is situated in the far northwest corner, right next to the Rose Garden.",
        trapExplanationVi:`,
  `        transcriptText:
          "GUIDE: Starting from the Visitor Centre, if you head due north past the duck pond, the Butterfly Sanctuary is situated in the far northwest corner, right next to the Rose Garden.",
        translationVi:
          "HƯỚNG DẪN VIÊN: Bắt đầu từ Trung tâm đón tiếp du khách, nếu bạn đi thẳng về hướng Bắc qua hồ vịt, Khu bảo tồn bướm nằm ở góc xa nhất phía Tây Bắc, ngay sát cạnh Vườn hoa hồng.",
        wordBreakdown: [
          { word: "sanctuary", ipa: "/ˈsæŋk.tʃʊə.ri/", type: "n", meaningVi: "khu bảo tồn thiên nhiên" },
          { word: "head due north", ipa: "/hed djuː nɔːθ/", type: "phrase", meaningVi: "đi thẳng hướng chính Bắc" },
        ],
        trapExplanationVi:`
);

content = content.replace(
  `    step3ModelWalkthrough: {
      questionPrompt: "Map Label A: Location of the [ _____ ]",
      audioDialogueText:
        "GUIDE: Right opposite the main ticket booth, on your left-hand side as you enter through the south gate, you will spot the newly constructed Café.",
      audioTimestampAuditVi:`,
  `    step3ModelWalkthrough: {
      questionPrompt: "Map Label A: Location of the [ _____ ]",
      audioDialogueText:
        "GUIDE: Right opposite the main ticket booth, on your left-hand side as you enter through the south gate, you will spot the newly constructed Café.",
      translationVi:
        "HƯỚNG DẪN VIÊN: Nằm ngay đối diện quầy vé chính, ở bên tay trái khi bạn bước vào qua cổng Nam, bạn sẽ thấy Quán Cà phê mới xây.",
      wordBreakdown: [
        { word: "ticket booth", ipa: "/ˈtɪk.ɪt buːð/", type: "phrase", meaningVi: "quầy bán vé" },
        { word: "opposite", ipa: "/ˈɒp.ə.zɪt/", type: "adj", meaningVi: "đối diện" },
      ],
      audioTimestampAuditVi:`
);

// 5. Section 3 data
content = content.replace(
  `        dialogueExcerpt:
          "LIAM: We could focus our presentation on marine microplastics in the Pacific.\\nMAYA: Yeah, that's interesting, but Professor Jones mentioned that everyone is doing that topic. How about we examine river pollution instead?\\nLIAM: That's a much better idea.",
        wrongChoiceVi:`,
  `        dialogueExcerpt:
          "LIAM: We could focus our presentation on marine microplastics in the Pacific.\\nMAYA: Yeah, that's interesting, but Professor Jones mentioned that everyone is doing that topic. How about we examine river pollution instead?\\nLIAM: That's a much better idea.",
        translationVi:
          "LIAM: Chúng ta có thể tập trung bài thuyết trình vào các hạt vi nhựa trong đại dương ở Thái Bình Dương.\\nMAYA: Ừm, đề tài đó thú vị, nhưng Giáo sư Jones có nhắc rằng ai cũng làm đề tài đó rồi. Hay là chúng ta nghiên cứu về ô nhiễm sông ngòi thay vào đó?\\nLIAM: Đó là một ý tưởng hay hơn nhiều.",
        wordBreakdown: [
          { word: "microplastics", ipa: "/ˈmaɪ.krəʊˌplæs.tɪks/", type: "n", meaningVi: "hạt vi nhựa" },
          { word: "river pollution", ipa: "/ˈrɪv.ər pəˈluː.ʃən/", type: "phrase", meaningVi: "ô nhiễm nguồn nước sông" },
          { word: "presentation", ipa: "/ˌprez.ənˈteɪ.ʃən/", type: "n", meaningVi: "bài thuyết trình học thuật" },
        ],
        wrongChoiceVi:`
);

content = content.replace(
  `        transcriptText:
          "PROFESSOR: Have you decided on the sample size for your experiment?\\nSTUDENT: I originally planned thirty samples, but after reviewing similar dissertations, fifty appears to be the minimum for statistical significance.",
        trapExplanationVi:`,
  `        transcriptText:
          "PROFESSOR: Have you decided on the sample size for your experiment?\\nSTUDENT: I originally planned thirty samples, but after reviewing similar dissertations, fifty appears to be the minimum for statistical significance.",
        translationVi:
          "GIÁO SƯ: Các em đã chốt kích thước mẫu cho thí nghiệm chưa?\\nSINH VIÊN: Ban đầu em dự tính 30 mẫu, nhưng sau khi tham khảo các luận văn tương tự, 50 mẫu dường như là mức tối thiểu để đạt độ tin cậy thống kê.",
        wordBreakdown: [
          { word: "sample size", ipa: "/ˈsɑːm.pəl saɪz/", type: "phrase", meaningVi: "cỡ mẫu điều tra / thí nghiệm" },
          { word: "dissertation", ipa: "/ˌdɪs.əˈteɪ.ʃən/", type: "n", meaningVi: "luận văn tốt nghiệp" },
          { word: "statistical significance", ipa: "/stəˈtɪs.tɪ.kəl sɪɡˈnɪf.ɪ.kəns/", type: "phrase", meaningVi: "ý nghĩa thống kê" },
        ],
        trapExplanationVi:`
);

content = content.replace(
  `    step3ModelWalkthrough: {
      questionPrompt: "What do the students agree was the main flaw of their pilot survey?",
      audioDialogueText:
        "MAYA: I thought the questionnaire was too lengthy.\\nLIAM: Well, the length was fine, but the questions were phrased too ambiguously, leading to misleading responses.\\nMAYA: You're right, several respondents misunderstood question four completely.",
      audioTimestampAuditVi:`,
  `    step3ModelWalkthrough: {
      questionPrompt: "What do the students agree was the main flaw of their pilot survey?",
      audioDialogueText:
        "MAYA: I thought the questionnaire was too lengthy.\\nLIAM: Well, the length was fine, but the questions were phrased too ambiguously, leading to misleading responses.\\nMAYA: You're right, several respondents misunderstood question four completely.",
      translationVi:
        "MAYA: Mình thấy bảng câu hỏi quá dài dòng.\\nLIAM: Ồ, độ dài thì không sao, nhưng các câu hỏi được đặt quá mơ hồ, dẫn đến các câu trả lời sai lệch.\\nMAYA: Cậu nói chuẩn, một số người trả lời đã hiểu nhầm hoàn toàn câu hỏi số 4.",
      wordBreakdown: [
        { word: "questionnaire", ipa: "/ˌkwes.tʃəˈneər/", type: "n", meaningVi: "bảng câu hỏi khảo sát" },
        { word: "lengthy", ipa: "/ˈleŋ.θi/", type: "adj", meaningVi: "dài dòng lê thê" },
        { word: "ambiguously", ipa: "/æmˈbɪɡ.ju.əs.li/", type: "adv", meaningVi: "một cách mơ hồ, đa nghĩa" },
        { word: "misleading", ipa: "/mɪsˈliː.dɪŋ/", type: "adj", meaningVi: "gây hiểu sai lệch" },
      ],
      audioTimestampAuditVi:`
);

// 6. Section 4 data
content = content.replace(
  `        dialogueExcerpt:
          "LECTURER: When examining ancient archaeological sediment, researchers must preserve delicate bone specimens under controlled atmospheric pressure...",
        wrongChoiceVi:`,
  `        dialogueExcerpt:
          "LECTURER: When examining ancient archaeological sediment, researchers must preserve delicate bone specimens under controlled atmospheric pressure...",
        translationVi:
          "GIẢNG VIÊN: Khi kiểm tra trầm tích khảo cổ học cổ đại, các nhà nghiên cứu phải bảo quản các mẫu xương mỏng manh dưới áp suất khí quyển được kiểm soát nghiêm ngặt...",
        wordBreakdown: [
          { word: "sediment", ipa: "/ˈsed.ɪ.mənt/", type: "n", meaningVi: "trầm tích địa chất" },
          { word: "archaeological", ipa: "/ˌɑː.ki.əˈlɒdʒ.ɪ.kəl/", type: "adj", meaningVi: "thuộc khảo cổ học" },
          { word: "specimens", ipa: "/ˈspes.ə.mɪnz/", type: "n", meaningVi: "mẫu vật khảo nghiệm (số nhiều)" },
        ],
        wrongChoiceVi:`
);

content = content.replace(
  `        transcriptText:
          "LECTURER: Having covered the evolutionary ancestry of cetaceans, I'd like to now shift our focus towards their echolocation capabilities.",
        trapExplanationVi:`,
  `        transcriptText:
          "LECTURER: Having covered the evolutionary ancestry of cetaceans, I'd like to now shift our focus towards their echolocation capabilities.",
        translationVi:
          "GIẢNG VIÊN: Sau khi đã nói về tổ tiên tiến hóa của bộ cá voi, bây giờ tôi muốn chuyển sự chú ý sang khả năng định vị bằng sóng âm của chúng.",
        wordBreakdown: [
          { word: "evolutionary ancestry", ipa: "/ˌiː.vəˈluː.ʃən.ər.i ˈæn.ses.tri/", type: "phrase", meaningVi: "tổ tiên theo tiến hóa" },
          { word: "echolocation", ipa: "/ˌek.əʊ.ləʊˈkeɪ.ʃən/", type: "n", meaningVi: "khả năng định vị bằng tiếng vang" },
        ],
        trapExplanationVi:`
);

content = content.replace(
  `    step3ModelWalkthrough: {
      questionPrompt: "Lecture Notes: Deep-sea coral reefs rely heavily on ambient [ _____ ] for sustenance.",
      audioDialogueText:
        "LECTURER: Contrary to shallow-water species which depend on sunlight, abyssal coral colonies derive their vital nutrients primarily from subterranean hydrothermal currents.",
      audioTimestampAuditVi:`,
  `    step3ModelWalkthrough: {
      questionPrompt: "Lecture Notes: Deep-sea coral reefs rely heavily on ambient [ _____ ] for sustenance.",
      audioDialogueText:
        "LECTURER: Contrary to shallow-water species which depend on sunlight, abyssal coral colonies derive their vital nutrients primarily from subterranean hydrothermal currents.",
      translationVi:
        "GIẢNG VIÊN: Trái ngược với các loài ở vùng nước nông phụ thuộc vào ánh sáng mặt trời, các rạn san hô dưới vực thẳm lấy chất dinh dưỡng thiết yếu chủ yếu từ các dòng thủy nhiệt ngầm.",
      wordBreakdown: [
        { word: "abyssal", ipa: "/əˈbɪs.əl/", type: "adj", meaningVi: "thuộc vực thẳm đại dương" },
        { word: "vital nutrients", ipa: "/ˈvaɪ.təl ˈnjuː.tri.ənts/", type: "phrase", meaningVi: "dưỡng chất sống còn" },
        { word: "hydrothermal currents", ipa: "/ˌhaɪ.drəʊˈθɜː.məl ˈkʌr.ənts/", type: "phrase", meaningVi: "các dòng thủy nhiệt" },
      ],
      audioTimestampAuditVi:`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated mockListeningMethodsData.ts with bilingual translations and word breakdowns!');
