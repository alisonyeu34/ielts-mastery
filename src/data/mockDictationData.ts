export interface DictationItem {
  id: string;
  order: number;
  title: string;
  category: "Grammar & 12 Tenses" | "AWL Academic Vocab" | "Ending Sounds & Trap";
  targetTranscript: string;
  ipaHint: string;
  meaning: string;
  audioUrl?: string; // Optional audio URL, system falls back to Web Speech Synthesis API
  keyVocabulary: string[];
  focusGrammar: string;
  estimatedDurationSeconds: number;
}

export const MOCK_DICTATION_DATA: DictationItem[] = [
  {
    id: "dict_01",
    order: 1,
    title: "Chính sách Giảm Thiểu Ô Nhiễm Đô Thị",
    category: "AWL Academic Vocab",
    targetTranscript: "The government has introduced strict regulations to mitigate urban pollution.",
    ipaHint: "/ðə ˈɡʌv.ən.mənt hæz ˌɪn.trəˈdʒuːst strɪkt ˌreɡ.jəˈleɪ.ʃənz tu ˈmɪt.ɪ.ɡeɪt ˈɜː.bən pəˈluː.ʃən/",
    meaning: "Chính phủ đã ban hành các quy định nghiêm ngặt nhằm giảm thiểu ô nhiễm tại các đô thị.",
    keyVocabulary: ["mitigate", "regulations", "urban pollution"],
    focusGrammar: "Thì Hiện tại hoàn thành ('has introduced') + Âm đuôi /st/ và danh từ số nhiều ('regulations').",
    estimatedDurationSeconds: 45,
  },
  {
    id: "dict_02",
    order: 2,
    title: "Tác Hại Của Việc Lạm Dụng Thiết Bị Số",
    category: "Grammar & 12 Tenses",
    targetTranscript: "Excessive smartphone usage exerts a detrimental impact on cognitive focus.",
    ipaHint: "/ɪkˈses.ɪv ˈsmɑːrt.foʊn ˈjuː.sɪdʒ ɪɡˈzɜːts ə ˌdet.rɪˈmen.təl ˈɪm.pækt ɒn ˈkɒɡ.nə.tɪv ˈfoʊ.kəs/",
    meaning: "Việc sử dụng điện thoại thông minh quá mức gây ra tác động tiêu cực đến khả năng tập trung nhận thức.",
    keyVocabulary: ["detrimental", "exert", "cognitive focus"],
    focusGrammar: "Sự hòa hợp Chủ - Vị thì Hiện tại đơn ('usage exerts') + Collocation ('exert an impact on').",
    estimatedDurationSeconds: 50,
  },
  {
    id: "dict_03",
    order: 3,
    title: "Dự Báo Tỷ Trọng Năng Lượng Tái Tạo",
    category: "AWL Academic Vocab",
    targetTranscript: "Empirical evidence indicates that renewable sources will comprise nearly forty percent of total electricity.",
    ipaHint: "/ɪmˈpɪr.ɪ.kəl ˈev.ə.dəns ˈɪn.də.keɪts ðæt rɪˈnjuː.ə.bəl ˈsɔːr.sɪz wɪl kəmˈpraɪz ˈnɪr.li ˈfɔːr.ti pɚˈsent əv ˈtoʊ.t̬əl ɪˌlekˈtrɪs.ə.t̬i/",
    meaning: "Bằng chứng thực nghiệm chỉ ra rằng các nguồn năng lượng tái tạo sẽ chiếm gần 40% tổng sản lượng điện.",
    keyVocabulary: ["empirical", "renewable sources", "comprise"],
    focusGrammar: "Mệnh đề danh từ sau động từ tường thuật ('indicates that...') + Ngôn ngữ dự báo.",
    estimatedDurationSeconds: 60,
  },
  {
    id: "dict_04",
    order: 4,
    title: "Lợi Ích Linh Hoạt Của Học Trực Tuyến",
    category: "Ending Sounds & Trap",
    targetTranscript: "Students studying online enjoy greater flexibility, thereby managing their time efficiently.",
    ipaHint: "/ˈstjuː.dənts ˈstʌd.i.ɪŋ ˈɒn.laɪn ɪnˈdʒɔɪ ˈɡreɪ.tər ˌflek.səˈbɪl.ə.ti ˈðer.baɪ ˈmæn.ɪ.dʒɪŋ ðer taɪm ɪˈfɪʃ.ənt.li/",
    meaning: "Sinh viên học tập trực tuyến được hưởng sự linh hoạt cao hơn, nhờ đó quản lý thời gian của họ một cách hiệu quả.",
    keyVocabulary: ["flexibility", "thereby", "efficiently"],
    focusGrammar: "Cụm phân từ rút gọn chủ động ('studying', 'thereby managing') + Âm đuôi /ts/ trong 'students'.",
    estimatedDurationSeconds: 55,
  },
  {
    id: "dict_05",
    order: 5,
    title: "Phân Bổ Ngân Sách Đúng Tiến Độ",
    category: "Ending Sounds & Trap",
    targetTranscript: "The project manager allocated additional financial resources to complete the task on schedule.",
    ipaHint: "/ðə ˈprɒdʒ.ekt ˈmæn.ɪ.dʒər ˈæl.ə.keɪ.tɪd əˈdɪʃ.ən.əl faɪˈnæn.ʃəl rɪˈzɔːr.sɪz tu kəmˈpliːt ðə tɑːsk ɒn ˈskedʒ.uːl/",
    meaning: "Người quản lý dự án đã phân bổ thêm các nguồn lực tài chính để hoàn thành nhiệm vụ đúng tiến độ.",
    keyVocabulary: ["allocate", "financial resources", "on schedule"],
    focusGrammar: "Phát âm đuôi '-ed' thành /ɪd/ trong 'allocated' + Cụm giới từ cố định ('on schedule').",
    estimatedDurationSeconds: 55,
  },
];
