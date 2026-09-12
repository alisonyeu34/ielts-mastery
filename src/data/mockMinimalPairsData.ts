export interface MinimalPairWordItem {
  wordA: string;
  wordB: string;
  ipaA: string;
  ipaB: string;
  meaningA: string;
  meaningB: string;
}

export interface MinimalPairSet {
  id: string;
  soundA: string;
  soundB: string;
  category: "vowel" | "consonant";
  contrastName: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  anatomyTip: string;
  words: MinimalPairWordItem[];
}

export const MOCK_MINIMAL_PAIRS: MinimalPairSet[] = [
  // ================= 1. VOWEL CONTRASTS =================
  {
    id: "pair_v_01",
    soundA: "iː",
    soundB: "ɪ",
    category: "vowel",
    contrastName: "Cặp Âm /iː/ Dài vs /ɪ/ Ngắn",
    difficulty: "beginner",
    anatomyTip: "Với /iː/, khóe môi kéo căng sang hai bên như cười tươi và giữ hơi 0.3s. Với /ɪ/, môi thả lỏng hơi hé, ngắt âm dứt khoát 0.1s.",
    words: [
      { wordA: "sheep", wordB: "ship", ipaA: "/ʃiːp/", ipaB: "/ʃɪp/", meaningA: "con cừu", meaningB: "con tàu" },
      { wordA: "seat", wordB: "sit", ipaA: "/siːt/", ipaB: "/sɪt/", meaningA: "chỗ ngồi", meaningB: "ngồi" },
      { wordA: "lead", wordB: "lid", ipaA: "/liːd/", ipaB: "/lɪd/", meaningA: "dẫn dắt", meaningB: "nắp vung" },
      { wordA: "feet", wordB: "fit", ipaA: "/fiːt/", ipaB: "/fɪt/", meaningA: "bàn chân", meaningB: "vừa vặn" },
    ],
  },
  {
    id: "pair_v_02",
    soundA: "e",
    soundB: "æ",
    category: "vowel",
    contrastName: "Cặp Âm /e/ Ngắn vs /æ/ (A Bẹt)",
    difficulty: "beginner",
    anatomyTip: "Với /e/, miệng mở vừa phải. Với /æ/, quai hàm phải hạ sâu tối đa và kéo bè mép môi.",
    words: [
      { wordA: "bed", wordB: "bad", ipaA: "/bed/", ipaB: "/bæd/", meaningA: "cái giường", meaningB: "xấu / tồi" },
      { wordA: "men", wordB: "man", ipaA: "/men/", ipaB: "/mæn/", meaningA: "đàn ông (pl)", meaningB: "người đàn ông" },
      { wordA: "pen", wordB: "pan", ipaA: "/pen/", ipaB: "/pæn/", meaningA: "cây bút", meaningB: "cái chảo" },
      { wordA: "said", wordB: "sad", ipaA: "/sed/", ipaB: "/sæd/", meaningA: "đã nói", meaningB: "buồn bã" },
    ],
  },
  {
    id: "pair_v_03",
    soundA: "ʊ",
    soundB: "uː",
    category: "vowel",
    contrastName: "Cặp Âm /ʊ/ Ngắn vs /uː/ Dài",
    difficulty: "intermediate",
    anatomyTip: "Với /ʊ/, môi hơi tròn thả lỏng. Với /uː/, môi chu tròn nhỏ và đưa hẳn ra phía trước, phát âm sâu trong cuống họng.",
    words: [
      { wordA: "look", wordB: "luke", ipaA: "/lʊk/", ipaB: "/luːk/", meaningA: "nhìn", meaningB: "tên Luke" },
      { wordA: "pull", wordB: "pool", ipaA: "/pʊl/", ipaB: "/puːl/", meaningA: "kéo", meaningB: "hồ bơi" },
      { wordA: "full", wordB: "fool", ipaA: "/fʊl/", ipaB: "/fuːl/", meaningA: "đầy", meaningB: "kẻ ngốc" },
      { wordA: "soot", wordB: "suit", ipaA: "/sʊt/", ipaB: "/suːt/", meaningA: "bồ hóng", meaningB: "bộ âu phục" },
    ],
  },
  {
    id: "pair_v_04",
    soundA: "ɔː",
    soundB: "ɒ",
    category: "vowel",
    contrastName: "Cặp Âm /ɔː/ Dài vs /ɒ/ Ngắn",
    difficulty: "intermediate",
    anatomyTip: "Với /ɔː/, nâng nhẹ cuống lưỡi và giữ môi tròn ngân dài. Với /ɒ/, hạ thấp hàm dưới và ngắt dứt khoát.",
    words: [
      { wordA: "cord", wordB: "cod", ipaA: "/kɔːd/", ipaB: "/kɒd/", meaningA: "dây thừng", meaningB: "cá tuyết" },
      { wordA: "port", wordB: "pot", ipaA: "/pɔːt/", ipaB: "/pɒt/", meaningA: "cảng biển", meaningB: "cái nồi" },
      { wordA: "sport", wordB: "spot", ipaA: "/spɔːt/", ipaB: "/spɒt/", meaningA: "thể thao", meaningB: "điểm / vết" },
      { wordA: "short", wordB: "shot", ipaA: "/ʃɔːt/", ipaB: "/ʃɒt/", meaningA: "ngắn", meaningB: "phát bắn" },
    ],
  },
  {
    id: "pair_v_05",
    soundA: "ʌ",
    soundB: "ɑː",
    category: "vowel",
    contrastName: "Cặp Âm /ʌ/ (Á Ngắn) vs /ɑː/ (A Dài)",
    difficulty: "beginner",
    anatomyTip: "Với /ʌ/, miệng mở tự nhiên dứt khoát. Với /ɑː/, hạ quai hàm sâu tối đa, ép lưỡi phẳng xuống đáy miệng.",
    words: [
      { wordA: "cut", wordB: "cart", ipaA: "/kʌt/", ipaB: "/kɑːt/", meaningA: "cắt", meaningB: "xe đẩy" },
      { wordA: "duck", wordB: "dark", ipaA: "/dʌk/", ipaB: "/dɑːk/", meaningA: "con vịt", meaningB: "bóng tối" },
      { wordA: "cup", wordB: "carp", ipaA: "/kʌp/", ipaB: "/kɑːp/", meaningA: "cái tách", meaningB: "cá chép" },
      { wordA: "luck", wordB: "lark", ipaA: "/lʌk/", ipaB: "/lɑːk/", meaningA: "may mắn", meaningB: "chim sơn ca" },
    ],
  },
  {
    id: "pair_v_06",
    soundA: "e",
    soundB: "eɪ",
    category: "vowel",
    contrastName: "Cặp Âm /e/ Đơn vs /eɪ/ Đôi",
    difficulty: "intermediate",
    anatomyTip: "Với /e/, giữ nguyên vị trí miệng. Với /eɪ/, bắt đầu từ /e/ rồi khép dần hàm trượt mượt mà về phía /ɪ/.",
    words: [
      { wordA: "pen", wordB: "pain", ipaA: "/pen/", ipaB: "/peɪn/", meaningA: "cây bút", meaningB: "nỗi đau" },
      { wordA: "let", wordB: "late", ipaA: "/let/", ipaB: "/leɪt/", meaningA: "để cho", meaningB: "muộn" },
      { wordA: "wet", wordB: "wait", ipaA: "/wet/", ipaB: "/weɪt/", meaningA: "ẩm ướt", meaningB: "chờ đợi" },
      { wordA: "pepper", wordB: "paper", ipaA: "/ˈpep.ər/", ipaB: "/ˈpeɪ.pər/", meaningA: "hạt tiêu", meaningB: "tờ giấy" },
    ],
  },

  // ================= 2. CONSONANT CONTRASTS =================
  {
    id: "pair_c_01",
    soundA: "θ",
    soundB: "s",
    category: "consonant",
    contrastName: "Cặp Âm /θ/ (Kẹp Lưỡi) vs /s/ (Xì Hơi)",
    difficulty: "beginner",
    anatomyTip: "Với /θ/, đầu lưỡi bắt buộc phải đưa ra ngoài giữa 2 hàm răng. Với /s/, đầu lưỡi nằm phía trong sát gờ nướu.",
    words: [
      { wordA: "think", wordB: "sink", ipaA: "/θɪŋk/", ipaB: "/sɪŋk/", meaningA: "suy nghĩ", meaningB: "chìm / bồn rửa" },
      { wordA: "thick", wordB: "sick", ipaA: "/θɪk/", ipaB: "/sɪk/", meaningA: "dày", meaningB: "ốm yếu" },
      { wordA: "thumb", wordB: "sum", ipaA: "/θʌm/", ipaB: "/sʌm/", meaningA: "ngón tay cái", meaningB: "tổng số" },
      { wordA: "path", wordB: "pass", ipaA: "/pɑːθ/", ipaB: "/pɑːs/", meaningA: "con đường", meaningB: "vượt qua" },
    ],
  },
  {
    id: "pair_c_02",
    soundA: "θ",
    soundB: "t",
    category: "consonant",
    contrastName: "Cặp Âm /θ/ (Thổi Khí) vs /t/ (Bật Nướu)",
    difficulty: "beginner",
    anatomyTip: "Với /θ/, luồng khí ma sát thoát liên tục qua kẽ răng. Với /t/, đầu lưỡi nén chặt vào nướu rồi bật nổ dứt khoát.",
    words: [
      { wordA: "three", wordB: "tree", ipaA: "/θriː/", ipaB: "/triː/", meaningA: "số ba", meaningB: "cái cây" },
      { wordA: "thanks", wordB: "tanks", ipaA: "/θæŋks/", ipaB: "/tæŋks/", meaningA: "cảm ơn", meaningB: "bình chứa / xe tăng" },
      { wordA: "thin", wordB: "tin", ipaA: "/θɪn/", ipaB: "/tɪn/", meaningA: "mỏng", meaningB: "thiếc / lon" },
      { wordA: "both", wordB: "boat", ipaA: "/bəʊθ/", ipaB: "/bəʊt/", meaningA: "cả hai", meaningB: "con thuyền" },
    ],
  },
  {
    id: "pair_c_03",
    soundA: "ð",
    soundB: "d",
    category: "consonant",
    contrastName: "Cặp Âm /ð/ (Kẹp Lưỡi Rung) vs /d/ (Bật Nướu Rung)",
    difficulty: "beginner",
    anatomyTip: "Với /ð/, đầu lưỡi đặt giữa 2 răng và RUNG rè. Với /d/, đầu lưỡi chạm gờ nướu trên bật ra kèm RUNG cổ họng.",
    words: [
      { wordA: "they", wordB: "day", ipaA: "/ðeɪ/", ipaB: "/deɪ/", meaningA: "họ", meaningB: "ngày" },
      { wordA: "then", wordB: "den", ipaA: "/ðen/", ipaB: "/den/", meaningA: "sau đó", meaningB: "hang thú" },
      { wordA: "there", wordB: "dare", ipaA: "/ðeə/", ipaB: "/deə/", meaningA: "ở đó", meaningB: "dám" },
      { wordA: "breathe", wordB: "breed", ipaA: "/briːð/", ipaB: "/briːd/", meaningA: "thở", meaningB: "nhân giống" },
    ],
  },
  {
    id: "pair_c_04",
    soundA: "ʃ",
    soundB: "s",
    category: "consonant",
    contrastName: "Cặp Âm /ʃ/ (Chu Môi Suỵt) vs /s/ (Răng Xì Nhẹ)",
    difficulty: "beginner",
    anatomyTip: "Với /ʃ/, môi chu tròn hướng ra phía trước, thân lưỡi nâng cao. Với /s/, môi bè nhẹ, răng khép hờ.",
    words: [
      { wordA: "she", wordB: "sea", ipaA: "/ʃiː/", ipaB: "/siː/", meaningA: "cô ấy", meaningB: "biển cả" },
      { wordA: "ship", wordB: "sip", ipaA: "/ʃɪp/", ipaB: "/sɪp/", meaningA: "con tàu", meaningB: "nhấp ngụm" },
      { wordA: "shoe", wordB: "sue", ipaA: "/ʃuː/", ipaB: "/suː/", meaningA: "chiếc giày", meaningB: "kiện cáo" },
      { wordA: "cash", wordB: "gas", ipaA: "/kæʃ/", ipaB: "/ɡæs/", meaningA: "tiền mặt", meaningB: "khí gas" },
    ],
  },
  {
    id: "pair_c_05",
    soundA: "v",
    soundB: "w",
    category: "consonant",
    contrastName: "Cặp Âm /v/ (Cắn Môi) vs /w/ (Chu Tròn Môi)",
    difficulty: "intermediate",
    anatomyTip: "Với /v/, răng cửa trên cắn nhẹ vành môi dưới. Với /w/, hai môi chu tròn nhỏ không chạm vào răng.",
    words: [
      { wordA: "vine", wordB: "wine", ipaA: "/vaɪn/", ipaB: "/waɪn/", meaningA: "cây nho", meaningB: "rượu vang" },
      { wordA: "vest", wordB: "west", ipaA: "/vest/", ipaB: "/west/", meaningA: "áo gi-lê", meaningB: "phương tây" },
      { wordA: "vet", wordB: "wet", ipaA: "/vet/", ipaB: "/wet/", meaningA: "bác sĩ thú y", meaningB: "ẩm ướt" },
      { wordA: "veil", wordB: "whale", ipaA: "/veɪl/", ipaB: "/weɪl/", meaningA: "khăn che mặt", meaningB: "cá voi" },
    ],
  },
  {
    id: "pair_c_06",
    soundA: "p",
    soundB: "b",
    category: "consonant",
    contrastName: "Cặp Âm /p/ (Vô Thanh) vs /b/ (Hữu Thanh)",
    difficulty: "beginner",
    anatomyTip: "Cả hai đều mím 2 môi rồi bật mở. Với /p/, luồng hơi bật mạnh KHÔNG rung họng. Với /b/, RUNG MẠNH thanh quản.",
    words: [
      { wordA: "pat", wordB: "bat", ipaA: "/pæt/", ipaB: "/bæt/", meaningA: "vỗ nhẹ", meaningB: "con dơi" },
      { wordA: "pin", wordB: "bin", ipaA: "/pɪn/", ipaB: "/bɪn/", meaningA: "cây ghim", meaningB: "thùng rác" },
      { wordA: "cap", wordB: "cab", ipaA: "/kæp/", ipaB: "/kæb/", meaningA: "mũ lưỡi trai", meaningB: "xe taxi" },
      { wordA: "rope", wordB: "robe", ipaA: "/rəʊp/", ipaB: "/rəʊb/", meaningA: "dây thừng", meaningB: "áo choàng" },
    ],
  },
  {
    id: "pair_c_07",
    soundA: "tʃ",
    soundB: "dʒ",
    category: "consonant",
    contrastName: "Cặp Âm /tʃ/ (Vô Thanh) vs /dʒ/ (Hữu Thanh)",
    difficulty: "intermediate",
    anatomyTip: "Cả hai đều chu môi nén bật. /tʃ/ chỉ bật luồng khí không rung. /dʒ/ kích hoạt rung dây thanh quản rõ ràng.",
    words: [
      { wordA: "choke", wordB: "joke", ipaA: "/tʃəʊk/", ipaB: "/dʒəʊk/", meaningA: "nghẹt thở", meaningB: "lời nói đùa" },
      { wordA: "cheap", wordB: "jeep", ipaA: "/tʃiːp/", ipaB: "/dʒiːp/", meaningA: "rẻ", meaningB: "xe jeep" },
      { wordA: "rich", wordB: "ridge", ipaA: "/rɪtʃ/", ipaB: "/rɪdʒ/", meaningA: "giàu có", meaningB: "rặng núi" },
      { wordA: "chin", wordB: "gin", ipaA: "/tʃɪn/", ipaB: "/dʒɪn/", meaningA: "cái cằm", meaningB: "rượu gin" },
    ],
  },
  {
    id: "pair_c_08",
    soundA: "s",
    soundB: "z",
    category: "consonant",
    contrastName: "Cặp Âm Đuôi /s/ (Vô Thanh) vs /z/ (Hữu Thanh)",
    difficulty: "beginner",
    anatomyTip: "Vị trí lưỡi và răng giống hệt nhau. Âm /s/ xì hơi lạnh không rung. Âm /z/ phát âm có tiếng rung rè như tiếng ong.",
    words: [
      { wordA: "ice", wordB: "eyes", ipaA: "/aɪs/", ipaB: "/aɪz/", meaningA: "nước đá", meaningB: "đôi mắt" },
      { wordA: "peace", wordB: "peas", ipaA: "/piːs/", ipaB: "/piːz/", meaningA: "hòa bình", meaningB: "đậu Hà Lan" },
      { wordA: "bus", wordB: "buzz", ipaA: "/bʌs/", ipaB: "/bʌz/", meaningA: "xe buýt", meaningB: "tiếng vo ve" },
      { wordA: "niece", wordB: "knees", ipaA: "/niːs/", ipaB: "/niːz/", meaningA: "cháu gái", meaningB: "đầu gối" },
    ],
  },
  {
    id: "pair_c_09",
    soundA: "f",
    soundB: "v",
    category: "consonant",
    contrastName: "Cặp Âm /f/ (Vô Thanh) vs /v/ (Hữu Thanh)",
    difficulty: "beginner",
    anatomyTip: "Răng trên cắn nhẹ vành môi dưới. /f/ chỉ có luồng khí ma sát. /v/ rung mạnh thanh quản trong cổ họng.",
    words: [
      { wordA: "fan", wordB: "van", ipaA: "/fæn/", ipaB: "/væn/", meaningA: "cái quạt", meaningB: "xe tải nhỏ" },
      { wordA: "few", wordB: "view", ipaA: "/fjuː/", ipaB: "/vjuː/", meaningA: "một vài", meaningB: "tầm nhìn" },
      { wordA: "safe", wordB: "save", ipaA: "/seɪf/", ipaB: "/seɪv/", meaningA: "an toàn", meaningB: "tiết kiệm / cứu" },
      { wordA: "leaf", wordB: "leave", ipaA: "/liːf/", ipaB: "/liːv/", meaningA: "chiếc lá", meaningB: "rời đi" },
    ],
  },
  {
    id: "pair_c_10",
    soundA: "l",
    soundB: "n",
    category: "consonant",
    contrastName: "Cặp Âm /l/ (Cạnh Lưỡi) vs /n/ (Mũi)",
    difficulty: "intermediate",
    anatomyTip: "Với /l/, luồng hơi thoát ra hai bên mép lưỡi. Với /n/, đầu lưỡi chặn hoàn toàn khoang miệng, hơi thoát ra qua mũi.",
    words: [
      { wordA: "light", wordB: "night", ipaA: "/laɪt/", ipaB: "/naɪt/", meaningA: "ánh sáng", meaningB: "ban đêm" },
      { wordA: "low", wordB: "no", ipaA: "/ləʊ/", ipaB: "/nəʊ/", meaningA: "thấp", meaningB: "không" },
      { wordA: "lead", wordB: "need", ipaA: "/liːd/", ipaB: "/niːd/", meaningA: "dẫn đầu", meaningB: "cần thiết" },
      { wordA: "line", wordB: "nine", ipaA: "/laɪn/", ipaB: "/naɪn/", meaningA: "đường kẻ", meaningB: "số chín" },
    ],
  },
];
