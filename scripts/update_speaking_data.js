const fs = require('fs');
const path = require('path');

// 1. Update mockSpeakingBlueprintsData.ts
const speakingFile = path.resolve(__dirname, '../src/data/mockSpeakingBlueprintsData.ts');
let spContent = fs.readFileSync(speakingFile, 'utf8');

// Ensure import
if (!spContent.includes('VocabBreakdownWord')) {
  spContent = spContent.replace(
    'import { WritingGatewayQuizItem } from "@/data/mockWritingBlueprintsData";',
    'import { WritingGatewayQuizItem } from "@/data/mockWritingBlueprintsData";\nimport { VocabBreakdownWord } from "@/types/theoryBookmarks";'
  );
}

// Update interfaces
spContent = spContent.replace(
  `export interface SpeakingAudioContrastSample {
  band55Text: string;
  band55FlawVi: string;
  band85Text: string;
  band85FeatureVi: string;
}`,
  `export interface SpeakingAudioContrastSample {
  band55Text: string;
  band55TranslationVi?: string;
  band55FlawVi: string;
  band85Text: string;
  band85TranslationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  band85FeatureVi: string;
}`
);

spContent = spContent.replace(
  `export interface SpeakingExaminerTrapItem {
  trapNameVi: string;
  trapMechanismVi: string;
  band50WrongSample: string;
  band80CorrectSample: string;
  examinerInsightVi: string;
}`,
  `export interface SpeakingExaminerTrapItem {
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

spContent = spContent.replace(
  `  step3ModelDeliveryDissection: {
    examinerQuestion: string;
    transcriptAnalysisVi: string[];
    lexicalCollocations: string[];
    concludingStrategyVi: string;
  };`,
  `  step3ModelDeliveryDissection: {
    examinerQuestion: string;
    examinerQuestionVi?: string;
    modelFullTranscript?: string;
    modelTranscriptTranslationVi?: string;
    wordBreakdown?: VocabBreakdownWord[];
    transcriptAnalysisVi: string[];
    lexicalCollocations: string[];
    concludingStrategyVi: string;
  };`
);

// Lesson 1 data
spContent = spContent.replace(
  `        band50WrongSample: "Yes, I like swimming because it helps me relax and keep fit.",
        band80CorrectSample:
          "To be perfectly frank, I'm quite passionate about swimming. In the past, I barely had time for exercise due to intense schoolwork, but recently I've made it a habit to hit the local pool twice a week. It does wonders for my mental clarity.",
        examinerInsightVi:`,
  `        band50WrongSample: "Yes, I like swimming because it helps me relax and keep fit.",
        band50TranslationVi: "Vâng, tôi thích bơi lội vì nó giúp tôi thư giãn và giữ dáng.",
        band80CorrectSample:
          "To be perfectly frank, I'm quite passionate about swimming. In the past, I barely had time for exercise due to intense schoolwork, but recently I've made it a habit to hit the local pool twice a week. It does wonders for my mental clarity.",
        band80TranslationVi:
          "Nói một cách hoàn toàn thành thật thì tôi khá đam mê môn bơi lội. Trước đây, tôi hầu như chẳng có thời gian tập thể dục do lịch học ở trường quá dày đặc, nhưng gần đây tôi đã tạo thói quen đến hồ bơi địa phương hai lần một tuần. Điều này mang lại hiệu quả kỳ diệu cho sự minh mẫn của tâm trí tôi.",
        wordBreakdown: [
          { word: "passionate about", ipa: "/ˈpæʃ.ən.ət əˈbaʊt/", type: "phrase", meaningVi: "say mê, đam mê mãnh liệt" },
          { word: "barely", ipa: "/ˈbeə.li/", type: "adv", meaningVi: "hầu như không, hiếm khi" },
          { word: "intense schoolwork", ipa: "/ɪnˈtens ˈskuːl.wɜːk/", type: "phrase", meaningVi: "bài vở học tập dồn dập, căng thẳng" },
          { word: "hit the local pool", ipa: "/hɪt ðə ˈləʊ.kəl puːl/", type: "idiom", meaningVi: "đến hồ bơi khu vực" },
          { word: "mental clarity", ipa: "/ˈmen.təl ˈklær.ə.ti/", type: "phrase", meaningVi: "sự thông suốt, minh mẫn của trí óc" },
          { word: "do wonders for", ipa: "/duː ˈwʌn.dəz fɔːr/", type: "idiom", meaningVi: "mang lại hiệu quả kỳ diệu cho" },
        ],
        examinerInsightVi:`
);

spContent = spContent.replace(
  `    audioContrast: {
      band55Text: "I like reading books. It is very interesting and I read books every weekend with my sister.",
      band55FlawVi: "Câu đơn điệu, lặp từ 'books' 2 lần, ngữ điệu đều đều thiếu điểm nhấn và độ dài quá ngắn.",
      band85Text:
        "To be honest, I'd consider myself an avid reader. Back when I was in secondary school, I rarely picked up a novel, but lately I've developed a keen interest in historical non-fiction. It really broadens my perspective on world cultures.",
      band85FeatureVi:`,
  `    audioContrast: {
      band55Text: "I like reading books. It is very interesting and I read books every weekend with my sister.",
      band55TranslationVi: "Tôi thích đọc sách. Nó rất thú vị và tôi đọc sách mỗi cuối tuần với em gái tôi.",
      band55FlawVi: "Câu đơn điệu, lặp từ 'books' 2 lần, ngữ điệu đều đều thiếu điểm nhấn và độ dài quá ngắn.",
      band85Text:
        "To be honest, I'd consider myself an avid reader. Back when I was in secondary school, I rarely picked up a novel, but lately I've developed a keen interest in historical non-fiction. It really broadens my perspective on world cultures.",
      band85TranslationVi:
        "Thành thật mà nói, tôi tự thấy mình là một người ham đọc sách. Hồi còn học cấp hai, tôi hiếm khi cầm một cuốn tiểu thuyết lên đọc, nhưng dạo gần đây tôi đã phát triển niềm hứng thú sâu sắc với sách phi hư cấu lịch sử. Nó thực sự mở rộng góc nhìn của tôi về các nền văn hóa thế giới.",
      wordBreakdown: [
        { word: "avid reader", ipa: "/ˈæv.ɪd ˈriː.dər/", type: "phrase", meaningVi: "người ham đọc sách, mọt sách" },
        { word: "keen interest in", ipa: "/kiːn ˈɪn.trəst ɪn/", type: "phrase", meaningVi: "niềm quan tâm say mê sâu sắc" },
        { word: "historical non-fiction", ipa: "/hɪˈstɒr.ɪ.kəl nɒn ˈfɪk.ʃən/", type: "phrase", meaningVi: "sách phi hư cấu lịch sử" },
        { word: "broadens my perspective", ipa: "/ˈbrɔː.dənz maɪ pəˈspek.tɪv/", type: "phrase", meaningVi: "mở rộng tầm nhìn, nhân sinh quan" },
      ],
      band85FeatureVi:`
);

spContent = spContent.replace(
  `    step3ModelDeliveryDissection: {
      examinerQuestion: "Do you prefer living in a house or an apartment?",
      transcriptAnalysisVi:`,
  `    step3ModelDeliveryDissection: {
      examinerQuestion: "Do you prefer living in a house or an apartment?",
      examinerQuestionVi: "Bạn thích sống trong một ngôi nhà riêng hay một căn hộ chung cư hơn?",
      modelFullTranscript:
        "At this point in my life, I definitely lean towards living in a high-rise apartment. Growing up, my family resided in a traditional landed house, which was spacious but required relentless maintenance. By contrast, modern apartments offer round-the-clock security and integrated amenities like gyms and rooftop gardens.",
      modelTranscriptTranslationVi:
        "Ở thời điểm này trong cuộc đời, tôi chắc chắn nghiêng về việc sống trong một căn hộ chung cư cao tầng. Khi lớn lên, gia đình tôi từng sinh sống trong một ngôi nhà mặt đất truyền thống, nơi khá rộng rãi nhưng lại đòi hỏi việc bảo trì không ngừng nghỉ. Trái lại, các căn hộ hiện đại cung cấp an ninh túc trực 24/7 và các tiện ích tích hợp sẵn như phòng gym và khu vườn trên tầng thượng.",
      wordBreakdown: [
        { word: "lean towards", ipa: "/liːn təˈwɔːdz/", type: "phrase", meaningVi: "nghiêng về, thiên vị lựa chọn nào" },
        { word: "landed house", ipa: "/ˈlæn.dɪd haʊs/", type: "phrase", meaningVi: "nhà gắn liền với đất, nhà mặt đất" },
        { word: "relentless maintenance", ipa: "/rɪˈlent.ləs ˈmeɪn.tən.əns/", type: "phrase", meaningVi: "việc bảo dưỡng sửa chữa liên tục" },
        { word: "round-the-clock security", ipa: "/ˌraʊnd.ðəˈklɒk sɪˈkjʊə.rə.ti/", type: "phrase", meaningVi: "an ninh bảo vệ 24/7 suốt ngày đêm" },
        { word: "integrated amenities", ipa: "/ˈɪn.tɪ.ɡreɪ.tɪd əˈmiː.nə.tiz/", type: "phrase", meaningVi: "tiện ích sinh hoạt tích hợp" },
      ],
      transcriptAnalysisVi:`
);

// Lesson 2 data (Part 3)
spContent = spContent.replace(
  `        band50WrongSample: "Because when I work at home, I can eat snacks and save money for my family.",
        band80CorrectSample:
          "From an employee standpoint, remote working significantly curtails daily commuting stress and fosters flexible work-life integration. However, from a corporate perspective, management often grapples with maintaining team cohesion and measuring actual productivity.",
        examinerInsightVi:`,
  `        band50WrongSample: "Because when I work at home, I can eat snacks and save money for my family.",
        band50TranslationVi: "Bởi vì khi làm việc ở nhà, tôi có thể ăn vặt và tiết kiệm tiền cho gia đình tôi.",
        band80CorrectSample:
          "From an employee standpoint, remote working significantly curtails daily commuting stress and fosters flexible work-life integration. However, from a corporate perspective, management often grapples with maintaining team cohesion and measuring actual productivity.",
        band80TranslationVi:
          "Xét từ góc độ người lao động, làm việc từ xa giúp cắt giảm đáng kể sự căng thẳng khi đi lại hàng ngày và thúc đẩy sự dung hòa linh hoạt giữa công việc và cuộc sống. Tuy nhiên, từ góc nhìn doanh nghiệp, ban điều hành thường phải vật lộn với việc duy trì tính gắn kết đội ngũ và đo lường năng suất làm việc thực tế.",
        wordBreakdown: [
          { word: "employee standpoint", ipa: "/ˌem.plɔɪˈiː ˈstænd.pɔɪnt/", type: "phrase", meaningVi: "góc độ người lao động" },
          { word: "curtail", ipa: "/kəˈteɪl/", type: "v", meaningVi: "cắt giảm bớt, hạn chế đáng kể" },
          { word: "commuting stress", ipa: "/kəˈmjuː.tɪŋ stres/", type: "phrase", meaningVi: "áp lực di chuyển đi lại hàng ngày" },
          { word: "work-life integration", ipa: "/wɜːk laɪf ˌɪn.tɪˈɡreɪ.ʃən/", type: "phrase", meaningVi: "sự dung hòa công việc - đời sống" },
          { word: "corporate perspective", ipa: "/ˈkɔː.pər.ət pəˈspek.tɪv/", type: "phrase", meaningVi: "góc nhìn doanh nghiệp" },
          { word: "grapple with", ipa: "/ˈɡræp.əl wɪð/", type: "v", meaningVi: "vật lộn giải quyết bài toán khó" },
          { word: "team cohesion", ipa: "/tiːm kəʊˈhiː.ʒən/", type: "phrase", meaningVi: "tính gắn kết nội bộ đội ngũ" },
          { word: "productivity", ipa: "/ˌprɒd.ʌkˈtɪv.ə.ti/", type: "n", meaningVi: "năng suất làm việc" },
        ],
        examinerInsightVi:`
);

spContent = spContent.replace(
  `    audioContrast: {
      band55Text: "I think artificial intelligence is dangerous because it will take all human jobs and make people poor.",
      band55FlawVi: "Phát biểu võ đoán 100%, dùng từ ngữ cá nhân, thiếu tính cẩn trọng học thuật (Hedging).",
      band85Text:
        "It is widely contended that rapid advancements in artificial intelligence may precipitate localized labor market disruptions. Nonetheless, from a macroeconomic perspective, automation is also projected to generate novel specialized industries and optimize operational efficiency.",
      band85FeatureVi:`,
  `    audioContrast: {
      band55Text: "I think artificial intelligence is dangerous because it will take all human jobs and make people poor.",
      band55TranslationVi: "Tôi nghĩ trí tuệ nhân tạo nguy hiểm vì nó sẽ cướp hết việc làm của con người và khiến mọi người nghèo đói.",
      band55FlawVi: "Phát biểu võ đoán 100%, dùng từ ngữ cá nhân, thiếu tính cẩn trọng học thuật (Hedging).",
      band85Text:
        "It is widely contended that rapid advancements in artificial intelligence may precipitate localized labor market disruptions. Nonetheless, from a macroeconomic perspective, automation is also projected to generate novel specialized industries and optimize operational efficiency.",
      band85TranslationVi:
        "Nhiều quan điểm cho rằng những tiến bộ nhanh chóng của trí tuệ nhân tạo có thể châm ngòi cho những gián đoạn cục bộ trên thị trường lao động. Tuy nhiên, từ góc nhìn kinh tế vĩ mô, tự động hóa cũng được dự báo sẽ tạo ra các ngành công nghiệp chuyên biệt mới và tối ưu hóa hiệu quả vận hành.",
      wordBreakdown: [
        { word: "widely contended", ipa: "/ˈwaɪd.li kənˈten.dɪd/", type: "phrase", meaningVi: "được nhiều người nhận định, lập luận" },
        { word: "precipitate", ipa: "/prɪˈsɪp.ɪ.teɪt/", type: "v", meaningVi: "gây ra, châm ngòi đột ngột" },
        { word: "labor market disruption", ipa: "/ˈleɪ.bər ˌmɑː.kɪt dɪsˈrʌp.ʃən/", type: "phrase", meaningVi: "sự gián đoạn thị trường lao động" },
        { word: "macroeconomic perspective", ipa: "/ˌmæk.rəʊ.iː.kəˈnɒm.ɪk pəˈspek.tɪv/", type: "phrase", meaningVi: "góc nhìn kinh tế vĩ mô" },
        { word: "operational efficiency", ipa: "/ˌɒp.ərˈeɪ.ʃən.əl ɪˈfɪʃ.ən.si/", type: "phrase", meaningVi: "hiệu quả vận hành" },
      ],
      band85FeatureVi:`
);

spContent = spContent.replace(
  `    step3ModelDeliveryDissection: {
      examinerQuestion: "How can municipal authorities encourage citizens to adopt sustainable transportation?",
      transcriptAnalysisVi:`,
  `    step3ModelDeliveryDissection: {
      examinerQuestion: "How can municipal authorities encourage citizens to adopt sustainable transportation?",
      examinerQuestionVi: "Chính quyền đô thị có thể làm thế nào để khuyến khích công dân sử dụng phương tiện giao thông bền vững?",
      modelFullTranscript:
        "Primarily, governments could invest heavily in upgrading public transit infrastructure, ensuring that metro networks are affordable, punctual, and seamlessly interconnected. Simultaneously, implementing financial disincentives, such as congestion pricing in metropolitan centers, would effectively discourage private vehicle usage. Ultimately, community awareness campaigns must highlight the collective environmental dividends of reducing individual carbon footprints.",
      modelTranscriptTranslationVi:
        "Trước hết, các chính phủ có thể đầu tư mạnh mẽ vào việc nâng cấp cơ sở hạ tầng giao thông công cộng, đảm bảo mạng lưới tàu điện ngầm có giá cả phải chăng, đúng giờ và kết nối liền mạch. Đồng thời, việc thực thi các chế tài tài chính, chẳng hạn như thu phí chống ùn tắc ở các trung tâm đại đô thị, sẽ ngăn chặn hiệu quả việc sử dụng xe cá nhân. Sau cùng, các chiến dịch nâng cao nhận thức cộng đồng phải nêu bật những lợi ích môi trường tập thể của việc giảm lượng khí thải carbon cá nhân.",
      wordBreakdown: [
        { word: "transit infrastructure", ipa: "/ˈtræn.zɪt ˈɪn.frəˌstrʌk.tʃər/", type: "phrase", meaningVi: "hạ tầng giao thông công cộng" },
        { word: "financial disincentives", ipa: "/faɪˈnæn.ʃəl ˌdɪs.ɪnˈsen.tɪvz/", type: "phrase", meaningVi: "các chế tài / biện pháp răn đe tài chính" },
        { word: "congestion pricing", ipa: "/kənˈdʒes.tʃən ˈpraɪ.sɪŋ/", type: "phrase", meaningVi: "thu phí chống ùn tắc giao thông" },
        { word: "environmental dividends", ipa: "/ɪnˌvaɪ.rənˈmen.təl ˈdɪv.ɪ.dendz/", type: "phrase", meaningVi: "các lợi ích / thành quả môi trường mang lại" },
      ],
      transcriptAnalysisVi:`
);

fs.writeFileSync(speakingFile, spContent, 'utf8');
console.log('Successfully updated mockSpeakingBlueprintsData.ts!');
