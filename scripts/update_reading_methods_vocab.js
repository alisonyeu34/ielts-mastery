const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/mockReadingMethodsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Ensure import of VocabBreakdownWord
if (!content.includes('VocabBreakdownWord')) {
  content = content.replace(
    'export interface ReadingExaminerTrapItem {',
    `import { VocabBreakdownWord } from "@/types/theoryBookmarks";\n\nexport interface ReadingExaminerTrapItem {`
  );
}

// 2. Add translationVi and wordBreakdown to ReadingExaminerTrapItem
content = content.replace(
  `export interface ReadingExaminerTrapItem {
  trapNameVi: string;
  trapMechanismVi: string;
  originalTextExcerpt: string;
  deceptiveQuestionStatement: string;
  deceptiveOptionOrAnswer: string;
  correctAnswer: string;
  examinerInsightVi: string;
}`,
  `export interface ReadingExaminerTrapItem {
  trapNameVi: string;
  trapMechanismVi: string;
  originalTextExcerpt: string;
  translationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  deceptiveQuestionStatement: string;
  deceptiveOptionOrAnswer: string;
  correctAnswer: string;
  examinerInsightVi: string;
}`
);

// 3. Add translationVi and wordBreakdown to ReadingModelWalkthrough
content = content.replace(
  `export interface ReadingModelWalkthrough {
  passageSnippet: string;
  questionItem: string;
  stepByStepAuditVi: string[];
  paraphrasePairs: Array<{ questionKeyword: string; passageKeyword: string }>;
  concludingTipVi: string;
}`,
  `export interface ReadingModelWalkthrough {
  passageSnippet: string;
  translationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  questionItem: string;
  stepByStepAuditVi: string[];
  paraphrasePairs: Array<{ questionKeyword: string; passageKeyword: string }>;
  concludingTipVi: string;
}`
);

// 4. Update Lesson 0 Traps and Walkthrough
content = content.replace(
  `        originalTextExcerpt:
          "The indigenous flora exhibited idiosyncratic adaptations to withstand subterranean geothermal fluctuations.",
        deceptiveQuestionStatement:`,
  `        originalTextExcerpt:
          "The indigenous flora exhibited idiosyncratic adaptations to withstand subterranean geothermal fluctuations.",
        translationVi:
          "Hệ thực vật bản địa đã thể hiện những sự thích nghi đặc dị nhằm chống chịu lại những biến đổi nhiệt địa chất dưới lòng đất.",
        wordBreakdown: [
          { word: "indigenous", ipa: "/ɪnˈdɪdʒ.ɪ.nəs/", type: "adj", meaningVi: "thuộc về bản địa, nguyên sản" },
          { word: "flora", ipa: "/ˈflɔː.rə/", type: "n", meaningVi: "hệ thực vật" },
          { word: "exhibit", ipa: "/ɪɡˈzɪb.ɪt/", type: "v", meaningVi: "thể hiện, biểu lộ, phô bày" },
          { word: "idiosyncratic", ipa: "/ˌɪd.i.ə.sɪŋˈkræt.ɪk/", type: "adj", meaningVi: "đặc dị, mang nét đặc thù cá biệt" },
          { word: "adaptation", ipa: "/ˌæd.æpˈteɪ.ʃən/", type: "n", meaningVi: "sự thích nghi sinh học" },
          { word: "withstand", ipa: "/wɪðˈstænd/", type: "v", meaningVi: "chống chịu, chịu đựng thử thách" },
          { word: "subterranean", ipa: "/ˌsʌb.təˈreɪ.ni.ən/", type: "adj", meaningVi: "dưới lòng đất, ngầm" },
          { word: "geothermal", ipa: "/ˌdʒiː.əʊˈθɜː.məl/", type: "adj", meaningVi: "thuộc địa nhiệt" },
          { word: "fluctuation", ipa: "/ˌflʌk.tʃuˈeɪ.ʃən/", type: "n", meaningVi: "sự dao động, biến thiên liên tục" },
        ],
        deceptiveQuestionStatement:`
);

content = content.replace(
  `        originalTextExcerpt:
          "Although the city council initially approved funding for the solar power initiative, the project was ultimately vetoed due to municipal budgetary constraints.",
        deceptiveQuestionStatement:`,
  `        originalTextExcerpt:
          "Although the city council initially approved funding for the solar power initiative, the project was ultimately vetoed due to municipal budgetary constraints.",
        translationVi:
          "Mặc dù hội đồng thành phố ban đầu đã phê chuẩn kinh phí cho sáng kiến năng lượng mặt trời, dự án rốt cuộc đã bị phủ quyết do những hạn chế về ngân sách đô thị.",
        wordBreakdown: [
          { word: "initially", ipa: "/ɪˈnɪʃ.əl.i/", type: "adv", meaningVi: "ban đầu, thoạt tiên" },
          { word: "approve", ipa: "/əˈpruːv/", type: "v", meaningVi: "phê chuẩn, đồng thuận" },
          { word: "initiative", ipa: "/ɪˈnɪʃ.ə.tɪv/", type: "n", meaningVi: "sáng kiến, chương trình hành động" },
          { word: "ultimately", ipa: "/ˈʌl.tɪ.mət.li/", type: "adv", meaningVi: "rốt cuộc, kết cục cuối cùng" },
          { word: "veto", ipa: "/ˈviː.təʊ/", type: "v", meaningVi: "phủ quyết, bác bỏ" },
          { word: "municipal", ipa: "/mjuːˈnɪs.ɪ.pəl/", type: "adj", meaningVi: "thuộc về chính quyền thành phố / đô thị" },
          { word: "budgetary constraints", ipa: "/ˈbʌdʒ.ɪ.tər.i kənˈstreɪnts/", type: "phrase", meaningVi: "sự eo hẹp / ràng buộc về mặt ngân sách" },
        ],
        deceptiveQuestionStatement:`
);

content = content.replace(
  `    step3ModelWalkthrough: {
      passageSnippet:
        "Scottish physician Sir Alexander Fleming discovered penicillin in 1928 when he noticed that a stray mold called Penicillium notatum had contaminated a petri dish containing Staphylococcus bacteria, creating a clear zone where bacterial growth was completely halted.",
      questionItem:`,
  `    step3ModelWalkthrough: {
      passageSnippet:
        "Scottish physician Sir Alexander Fleming discovered penicillin in 1928 when he noticed that a stray mold called Penicillium notatum had contaminated a petri dish containing Staphylococcus bacteria, creating a clear zone where bacterial growth was completely halted.",
      translationVi:
        "Bác sĩ người Scotland Sir Alexander Fleming phát hiện ra penicillin vào năm 1928 khi ông nhận thấy một bào tử nấm mốc lạc có tên Penicillium notatum đã làm nhiễm bẩn chiếc đĩa petri chứa vi khuẩn tụ cầu Staphylococcus, tạo ra một vùng sáng sạch nơi sự sinh sôi của vi khuẩn bị chặn đứng hoàn toàn.",
      wordBreakdown: [
        { word: "physician", ipa: "/fɪˈzɪʃ.ən/", type: "n", meaningVi: "bác sĩ điều trị, danh y" },
        { word: "stray", ipa: "/streɪ/", type: "adj", meaningVi: "đi lạc, trôi dạt, rải rác" },
        { word: "mold", ipa: "/məʊld/", type: "n", meaningVi: "nấm mốc" },
        { word: "contaminate", ipa: "/kənˈtæm.ɪ.neɪt/", type: "v", meaningVi: "làm nhiễm bẩn, làm ô nhiễm" },
        { word: "petri dish", ipa: "/ˈpet.ri ˌdɪʃ/", type: "n", meaningVi: "đĩa nuôi cấy thí nghiệm petri" },
        { word: "bacteria", ipa: "/bækˈtɪə.ri.ə/", type: "n", meaningVi: "vi khuẩn (dạng số nhiều)" },
        { word: "halt", ipa: "/hɔːlt/", type: "v", meaningVi: "ngăn chặn dứt điểm, làm khựng lại" },
      ],
      questionItem:`
);

// 5. Update Lesson 1 (TFNG)
content = content.replace(
  `        originalTextExcerpt: "Students attending the experimental academy achieved exceptional scores in mathematics examinations.",
        deceptiveQuestionStatement:`,
  `        originalTextExcerpt: "Students attending the experimental academy achieved exceptional scores in mathematics examinations.",
        translationVi: "Các học sinh theo học tại học viện thực nghiệm đã đạt được những điểm số phi thường trong các kỳ thi toán học.",
        wordBreakdown: [
          { word: "experimental academy", ipa: "/ɪkˌsper.ɪˈmen.təl əˈkæd.ə.mi/", type: "phrase", meaningVi: "học viện / trường thử nghiệm" },
          { word: "exceptional", ipa: "/ɪkˈsep.ʃən.əl/", type: "adj", meaningVi: "phi thường, xuất chúng, vượt trội" },
          { word: "examination", ipa: "/ɪɡˌzæm.ɪˈneɪ.ʃən/", type: "n", meaningVi: "kỳ thi khảo hạch" },
        ],
        deceptiveQuestionStatement:`
);

content = content.replace(
  `        originalTextExcerpt: "Urban densification can frequently exacerbate localized microclimate temperatures.",
        deceptiveQuestionStatement:`,
  `        originalTextExcerpt: "Urban densification can frequently exacerbate localized microclimate temperatures.",
        translationVi: "Mật độ đô thị hóa dày đặc có thể thường xuyên làm trầm trọng thêm nhiệt độ vi khí hậu cục bộ.",
        wordBreakdown: [
          { word: "densification", ipa: "/ˌden.sɪ.fɪˈkeɪ.ʃən/", type: "n", meaningVi: "sự tăng mật độ, gia tăng áp lực xây dựng" },
          { word: "exacerbate", ipa: "/ɪɡˈzæs.ə.beɪt/", type: "v", meaningVi: "làm trầm trọng thêm, làm xấu đi tình hình" },
          { word: "microclimate", ipa: "/ˈmaɪ.krəʊˌklaɪ.mət/", type: "n", meaningVi: "vi khí hậu (vùng nhiệt độ nhỏ riêng biệt)" },
          { word: "elevation", ipa: "/ˌel.ɪˈveɪ.ʃən/", type: "n", meaningVi: "sự nâng cao, sự gia tăng" },
        ],
        deceptiveQuestionStatement:`
);

content = content.replace(
  `    step3ModelWalkthrough: {
      passageSnippet:
        "Although maritime trading corridors flourished across the Mediterranean during the 3rd century BCE, historical records indicate that overland caravan routes remained active only during the arid spring months.",
      questionItem:`,
  `    step3ModelWalkthrough: {
      passageSnippet:
        "Although maritime trading corridors flourished across the Mediterranean during the 3rd century BCE, historical records indicate that overland caravan routes remained active only during the arid spring months.",
      translationVi:
        "Mặc dù các hành lang thương mại hàng hải đã phát triển rực rỡ khắp Địa Trung Hải trong thế kỷ thứ 3 trước Công nguyên, các tài liệu lịch sử chỉ ra rằng các tuyến đường đoàn buôn trên bộ chỉ duy trì hoạt động trong các tháng mùa xuân khô hạn.",
      wordBreakdown: [
        { word: "maritime", ipa: "/ˈmær.ɪ.taɪm/", type: "adj", meaningVi: "thuộc về biển cả, ngành hàng hải" },
        { word: "corridor", ipa: "/ˈkɒr.ɪ.dɔːr/", type: "n", meaningVi: "hành lang thông thương, tuyến đường" },
        { word: "flourish", ipa: "/ˈflʌr.ɪʃ/", type: "v", meaningVi: "phồn thịnh, hưng thịnh, phát triển rực rỡ" },
        { word: "caravan", ipa: "/ˈkær.ə.væn/", type: "n", meaningVi: "đoàn thương buôn, đoàn lữ hành trên bộ" },
        { word: "arid", ipa: "/ˈær.ɪd/", type: "adj", meaningVi: "khô cằn, khô hạn khắc nghiệt" },
      ],
      questionItem:`
);

// 6. Update Lesson 2 (Matching Headings)
content = content.replace(
  `        originalTextExcerpt:
          "Although genetic engineering has generated substantial controversy, the primary obstacle facing agricultural yields in sub-Saharan Africa remains inadequate irrigation infrastructure and soil nitrogen depletion.",
        deceptiveQuestionStatement:`,
  `        originalTextExcerpt:
          "Although genetic engineering has generated substantial controversy, the primary obstacle facing agricultural yields in sub-Saharan Africa remains inadequate irrigation infrastructure and soil nitrogen depletion.",
        translationVi:
          "Mặc dù kỹ thuật di truyền đã gây ra nhiều tranh cãi gay gắt, rào cản chính yếu đối với sản lượng nông nghiệp tại vùng châu Phi cận Sahara vẫn là cơ sở hạ tầng thủy lợi thiếu thốn và tình trạng cạn kiệt nitơ trong đất.",
        wordBreakdown: [
          { word: "genetic engineering", ipa: "/dʒəˈnet.ɪk ˌen.dʒɪˈnɪə.rɪŋ/", type: "phrase", meaningVi: "kỹ thuật công nghệ biến đổi gen" },
          { word: "substantial controversy", ipa: "/səbˈstæn.ʃəl ˈkɒn.trə.vɜː.si/", type: "phrase", meaningVi: "sự tranh cãi kịch liệt trên diện rộng" },
          { word: "obstacle", ipa: "/ˈɒb.stə.kəl/", type: "n", meaningVi: "chướng ngại vật, rào cản" },
          { word: "agricultural yields", ipa: "/ˌæɡ.rɪˈkʌl.tʃər.əl jiːldz/", type: "phrase", meaningVi: "năng suất thu hoạch nông nghiệp" },
          { word: "inadequate", ipa: "/ɪnˈæd.ə.kwət/", type: "adj", meaningVi: "bất cập, không đủ đáp ứng" },
          { word: "irrigation infrastructure", ipa: "/ˌɪr.ɪˈɡeɪ.ʃən ˈɪn.frəˌstrʌk.tʃər/", type: "phrase", meaningVi: "hạ tầng tưới tiêu thủy lợi" },
          { word: "depletion", ipa: "/dɪˈpliː.ʃən/", type: "n", meaningVi: "sự cạn kiệt tài nguyên" },
        ],
        deceptiveQuestionStatement:`
);

content = content.replace(
  `    step3ModelWalkthrough: {
      passageSnippet:
        "To mitigate catastrophic flash floods, urban hydrologists have deployed porous concrete alongside subterranean retention reservoirs. These engineering solutions not only absorb ninety percent of surface runoff during monsoon downpours but also recycle filtered precipitation into municipal irrigation systems.",
      questionItem:`,
  `    step3ModelWalkthrough: {
      passageSnippet:
        "To mitigate catastrophic flash floods, urban hydrologists have deployed porous concrete alongside subterranean retention reservoirs. These engineering solutions not only absorb ninety percent of surface runoff during monsoon downpours but also recycle filtered precipitation into municipal irrigation systems.",
      translationVi:
        "Nhằm giảm thiểu những trận lũ quét thảm khốc, các nhà thủy văn học đô thị đã triển khai bê tông thấm hút nước song song với các bể chứa ngầm dưới lòng đất. Các giải pháp công trình này không chỉ hấp thụ chín mươi phần trăm lượng nước chảy tràn trên bề mặt trong các trận mưa rào gió mùa, mà còn tái chế lượng mưa đã được lọc sạch vào các hệ thống tưới tiêu của thành phố.",
      wordBreakdown: [
        { word: "mitigate", ipa: "/ˈmɪt.ɪ.ɡeɪt/", type: "v", meaningVi: "giảm nhẹ tác hại, xoa dịu tổn thất" },
        { word: "catastrophic", ipa: "/ˌkæt.əˈstrɒf.ɪk/", type: "adj", meaningVi: "thảm khốc, mang tính thảm họa lớn" },
        { word: "hydrologist", ipa: "/haɪˈdrɒl.ə.dʒɪst/", type: "n", meaningVi: "chuyên gia thủy văn học" },
        { word: "porous concrete", ipa: "/ˈpɔː.rəs ˈkɒŋ.kriːt/", type: "phrase", meaningVi: "bê tông có lỗ rỗng thoát nước" },
        { word: "retention reservoir", ipa: "/rɪˈten.ʃən ˈrez.əv.wɑːr/", type: "phrase", meaningVi: "bể / hồ chứa nước điều tiết lũ" },
        { word: "surface runoff", ipa: "/ˈsɜː.fɪs ˈrʌn.ɒf/", type: "phrase", meaningVi: "nước chảy tràn trên mặt đất" },
        { word: "precipitation", ipa: "/prɪˌsɪp.ɪˈteɪ.ʃən/", type: "n", meaningVi: "lượng mưa, giáng thủy học thuật" },
      ],
      questionItem:`
);

// 7. Update Lesson 3 (Summary Completion Box)
content = content.replace(
  `        originalTextExcerpt:
          "Early civilizations learned to domesticate wild equines, which dramatically accelerated regional communication.",
        deceptiveQuestionStatement:`,
  `        originalTextExcerpt:
          "Early civilizations learned to domesticate wild equines, which dramatically accelerated regional communication.",
        translationVi:
          "Các nền văn minh sơ khai đã học được cách thuần hóa loài ngựa hoang, điều này đã đẩy nhanh đáng kể sự giao tiếp và kết nối giữa các vùng miền.",
        wordBreakdown: [
          { word: "civilization", ipa: "/ˌsɪv.əl.aɪˈzeɪ.ʃən/", type: "n", meaningVi: "nền văn minh nhân loại" },
          { word: "domesticate", ipa: "/dəˈmes.tɪ.keɪt/", type: "v", meaningVi: "thuần hóa thú hoang" },
          { word: "equines", ipa: "/ˈek.waɪnz/", type: "n", meaningVi: "loài thuộc họ ngựa" },
          { word: "accelerate", ipa: "/əkˈsel.ə.reɪt/", type: "v", meaningVi: "gia tốc, đẩy nhanh tiến trình" },
        ],
        deceptiveQuestionStatement:`
);

content = content.replace(
  `    step3ModelWalkthrough: {
      passageSnippet:
        "Excavations at the ancient subterranean temple revealed murals coated with an extraordinarily resilient pigment that has withstood millenary dampness without fading.",
      questionItem:`,
  `    step3ModelWalkthrough: {
      passageSnippet:
        "Excavations at the ancient subterranean temple revealed murals coated with an extraordinarily resilient pigment that has withstood millenary dampness without fading.",
      translationVi:
        "Các cuộc khai quật tại ngôi đền ngầm cổ kính đã hé lộ những bức tranh tường được quét bằng một lớp chất nhuộm bền bỉ phi thường, thứ đã chống chọi lại độ ẩm ngàn năm mà không hề bị phai màu.",
      wordBreakdown: [
        { word: "excavation", ipa: "/ˌek.skəˈveɪ.ʃən/", type: "n", meaningVi: "hoạt động khai quật khảo cổ" },
        { word: "mural", ipa: "/ˈmjʊə.rəl/", type: "n", meaningVi: "tranh bích họa trên tường" },
        { word: "resilient", ipa: "/rɪˈzɪl.i.ənt/", type: "adj", meaningVi: "kiên cường, bền bỉ, đàn hồi tốt" },
        { word: "pigment", ipa: "/ˈpɪɡ.mənt/", type: "n", meaningVi: "sắc tố màu, chất tạo màu tự nhiên" },
        { word: "millenary", ipa: "/ˈmɪl.ɪ.nər.i/", type: "adj", meaningVi: "kéo dài hàng thiên niên kỷ" },
        { word: "dampness", ipa: "/ˈdæmp.nəs/", type: "n", meaningVi: "độ ẩm thấp, sự ẩm ướt" },
      ],
      questionItem:`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated mockReadingMethodsData.ts with bilingual translations and word breakdowns!');
