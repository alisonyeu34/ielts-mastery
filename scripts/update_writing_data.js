const fs = require('fs');
const path = require('path');

const writingFile = path.resolve(__dirname, '../src/data/mockWritingBlueprintsData.ts');
let wtContent = fs.readFileSync(writingFile, 'utf8');

// Ensure import
if (!wtContent.includes('VocabBreakdownWord')) {
  wtContent = wtContent.replace(
    'export interface WritingExaminerTrapItem {',
    'import { VocabBreakdownWord } from "@/types/theoryBookmarks";\n\nexport interface WritingExaminerTrapItem {'
  );
}

// Update WritingExaminerTrapItem interface
wtContent = wtContent.replace(
  `export interface WritingExaminerTrapItem {
  trapNameVi: string;
  trapMechanismVi: string;
  band50WrongSample: string;
  band80CorrectSample: string;
  examinerInsightVi: string;
}`,
  `export interface WritingExaminerTrapItem {
  trapNameVi: string;
  trapMechanismVi: string;
  band50WrongSample: string;
  band50TranslationVi?: string;
  band80CorrectSample: string;
  band80TranslationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  examinerInsightVi: string;
}`
);

// Update step3ModelEssayDissection interface
wtContent = wtContent.replace(
  `    annotatedParagraphs: Array<{
      paragraphName: string;
      tokens: EssayAnnotationToken[];
    }>;`,
  `    annotatedParagraphs: Array<{
      paragraphName: string;
      tokens: EssayAnnotationToken[];
      paragraphTranslationVi?: string;
      wordBreakdown?: VocabBreakdownWord[];
    }>;`
);

// Lesson 1 (Task 1)
wtContent = wtContent.replace(
  `        band50WrongSample:
          "In 1990, car production was 3 million. In 1995, it was 3.5 million. In 2000, it rose to 4 million, and in 2005 it reached 4.5 million.",
        band80CorrectSample:
          "Automobile manufacturing witnessed an uninterrupted upward trajectory over the fifteen-year timeframe, advancing steadily from 3 million units in 1990 to an apex of 4.5 million by 2005.",
        examinerInsightVi:`,
  `        band50WrongSample:
          "In 1990, car production was 3 million. In 1995, it was 3.5 million. In 2000, it rose to 4 million, and in 2005 it reached 4.5 million.",
        band50TranslationVi:
          "Năm 1990, sản lượng ô tô là 3 triệu chiếc. Năm 1995 là 3.5 triệu chiếc. Năm 2000 nó tăng lên 4 triệu chiếc và năm 2005 đạt 4.5 triệu chiếc.",
        band80CorrectSample:
          "Automobile manufacturing witnessed an uninterrupted upward trajectory over the fifteen-year timeframe, advancing steadily from 3 million units in 1990 to an apex of 4.5 million by 2005.",
        band80TranslationVi:
          "Ngành sản xuất ô tô đã chứng kiến một quỹ đạo đi lên không hề bị gián đoạn trong suốt khung thời gian mười lăm năm, tiến đều đặn từ mức 3 triệu xe vào năm 1990 lên mức đỉnh điểm 4.5 triệu chiếc vào năm 2005.",
        wordBreakdown: [
          { word: "uninterrupted upward trajectory", ipa: "/ˌʌn.ɪn.tərˈʌp.tɪd ˈʌp.wəd trəˈdʒek.tər.i/", type: "phrase", meaningVi: "quỹ đạo đi lên liên tục không đứt đoạn" },
          { word: "advance steadily", ipa: "/ədˈvɑːns ˈsted.əl.i/", type: "phrase", meaningVi: "tăng trưởng, tiến lên vững chắc" },
          { word: "apex", ipa: "/ˈeɪ.peks/", type: "n", meaningVi: "đỉnh cao nhất, đỉnh điểm" },
          { word: "timeframe", ipa: "/ˈtaɪm.freɪm/", type: "n", meaningVi: "khung thời gian khảo sát" },
        ],
        examinerInsightVi:`
);

// Lesson 2 (Task 2)
wtContent = wtContent.replace(
  `        band50WrongSample:
          "Air pollution is bad because many people have asthma and dirty air makes city people cough every day.",
        band80CorrectSample:
          "Atmospheric degradation directly compromises urban public health by elevating the prevalence of chronic respiratory afflictions among densely populated metropolitan communities.",
        examinerInsightVi:`,
  `        band50WrongSample:
          "Air pollution is bad because many people have asthma and dirty air makes city people cough every day.",
        band50TranslationVi:
          "Ô nhiễm không khí rất tệ vì nhiều người bị hen suyễn và không khí bẩn làm người dân thành phố ho mỗi ngày.",
        band80CorrectSample:
          "Atmospheric degradation directly compromises urban public health by elevating the prevalence of chronic respiratory afflictions among densely populated metropolitan communities.",
        band80TranslationVi:
          "Sự suy thoái bầu khí quyển trực tiếp đe dọa sức khỏe cộng đồng đô thị thông qua việc làm gia tăng tỷ lệ mắc các chứng bệnh đường hô hấp mãn tính trong các cộng đồng đô thị đông đúc.",
        wordBreakdown: [
          { word: "atmospheric degradation", ipa: "/ˌæt.məsˈfer.ɪk ˌdeɡ.rəˈdeɪ.ʃən/", type: "phrase", meaningVi: "sự suy thoái chất lượng khí quyển" },
          { word: "compromise", ipa: "/ˈkɒm.prə.maɪz/", type: "v", meaningVi: "gây tổn hại, làm tổn thương" },
          { word: "prevalence", ipa: "/ˈprev.əl.əns/", type: "n", meaningVi: "tỷ lệ phổ biến, mức độ xuất hiện" },
          { word: "chronic respiratory afflictions", ipa: "/ˈkrɒn.ɪk rɪˈspɪr.ə.tər.i əˈflɪk.ʃənz/", type: "phrase", meaningVi: "các chứng bệnh hô hấp mãn tính" },
        ],
        examinerInsightVi:`
);

fs.writeFileSync(writingFile, wtContent, 'utf8');
console.log('Successfully updated mockWritingBlueprintsData.ts!');
