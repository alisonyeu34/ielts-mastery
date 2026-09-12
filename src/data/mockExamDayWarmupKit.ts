/**
 * Mock Data for Day-180 Exam Day Grand Protocol & Emergency Ignition Kit
 * Step 100 / 100 - Pre-Exam Priming, Multi-Accent Ear Warmup & 1-Page Cheat Sheet
 */

export interface MultiAccentTrack {
  id: string;
  accent: 'British RP' | 'Australian' | 'General American' | 'Scottish / Irish';
  speakerTitle: string;
  durationSeconds: number;
  audioScript: string;
  phoneticFocusVi: string;
  targetBpm: number;
}

export interface VocalChantItem {
  id: string;
  text: string;
  ipa: string;
  intonationPattern: 'falling_affirmative' | 'complex_concession_fall' | 'list_rising_then_fall';
  intonationNotation: string;
  rhythmBeatCount: number;
  purposeVi: string;
}

export interface CheatSheetSection {
  id: string;
  titleVi: string;
  iconName: string;
  summaryPoints: Array<{
    heading: string;
    body: string;
    codeSnippet?: string;
  }>;
}

export const MOCK_MULTI_ACCENT_TRACKS: MultiAccentTrack[] = [
  {
    id: 'accent-uk-rp',
    accent: 'British RP',
    speakerTitle: 'Academic Lecture Lead - Oxford Style (Non-Rhotic)',
    durationSeconds: 60,
    audioScript: 'The empirical data clearly demonstrates that urbanization has exacerbated environmental degradation in coastal estuaries.',
    phoneticFocusVi: 'Âm không bật đuôi /r/ (non-rhoticity), nguyên âm mở rộng /ɑː/ trong "data", "estuaries".',
    targetBpm: 120
  },
  {
    id: 'accent-au-sydney',
    accent: 'Australian',
    speakerTitle: 'Section 3 Seminar Debate - Sydney Colloquial Intonation',
    durationSeconds: 60,
    audioScript: 'No worries at all, mate. We analyzed the renewable kinetic energy output across five railway terminals.',
    phoneticFocusVi: 'Nguyên âm đôi /aɪ/ hơi bè thành /ɑɪ/, âm đuôi /l/ tối (dark-l) trong "terminals".',
    targetBpm: 135
  },
  {
    id: 'accent-us-general',
    accent: 'General American',
    speakerTitle: 'Section 4 Technological Discourse - Rhotic Flap /t/',
    durationSeconds: 60,
    audioScript: 'Graphene ultracapacitors boast significantly faster dissipation rates than conventional lithium-ion batteries.',
    phoneticFocusVi: 'Âm flap-t (/t/ đọc thành /d/ mềm), âm /r/ uốn lưỡi mạnh trong "ultracapacitors", "batteries".',
    targetBpm: 140
  }
];

export const MOCK_VOCAL_CHANTS: VocalChantItem[] = [
  {
    id: 'chant-01',
    text: 'It is widely acknowledged that technological innovation drives economic prosperity. \\',
    ipa: '/ɪt ɪz ˈwaɪd.li əkˈnɑː.lɪdʒd ðæt ˌtek.nəˈlɑː.dʒɪ.kəl ˌɪn.əˈveɪ.ʃən draɪvz ˌiː.kəˈnɑː.mɪk prɑːˈsper.ə.t̬i/',
    intonationPattern: 'falling_affirmative',
    intonationNotation: 'Low-Falling (↘) ở cuối câu: Triệt tiêu thói quen lên giọng Uptalk',
    rhythmBeatCount: 4,
    purposeVi: 'Khóa chặt ngữ điệu đanh thép khẳng định của Band 8.5 Speaking.'
  },
  {
    id: 'chant-02',
    text: 'While this policy might be financially viable in the short term, its long-term ramifications could be catastrophic. \\',
    ipa: '/waɪl ðɪs ˈpɑː.lə.si maɪt biː fɪˈnæn.ʃəl.i ˈvaɪ.ə.bəl.../',
    intonationPattern: 'complex_concession_fall',
    intonationNotation: 'Rise on concession (↗ term) ➔ Strong Fall on main clause (↘ catastrophic)',
    rhythmBeatCount: 5,
    purposeVi: 'Tạo độ uốn lượn tự nhiên cho câu nhượng bộ phức hợp.'
  },
  {
    id: 'chant-03',
    text: 'Sustainable development requires structural reform, strict enforcement, and civic engagement. \\',
    ipa: '/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt rɪˈkwaɪərz ˈstrʌk.tʃər.əl rɪˈfɔːrm.../',
    intonationPattern: 'list_rising_then_fall',
    intonationNotation: 'Rise (↗ reform), Rise (↗ enforcement), Final Fall (↘ engagement)',
    rhythmBeatCount: 4,
    purposeVi: 'Ngữ điệu liệt kê 3 thành phần chuẩn mực học thuật quốc tế.'
  }
];

export const MOCK_EXAM_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'cs-shorthand',
    titleVi: '20 Ký Hiệu Tốc Ký Thần Tốc Section 4',
    iconName: 'Zap',
    summaryPoints: [
      { heading: 'Δ (Delta)', body: 'Biến đổi, thay đổi (Change / Fluctuation)' },
      { heading: '↑ / ↓', body: 'Tăng vọt (Surge / Rise) / Sụt giảm mạnh (Plummet / Decline)' },
      { heading: '∴ (Therefore)', body: 'Hệ quả là, do đó (Consequently / As a result)' },
      { heading: '∵ (Because)', body: 'Bởi vì, nguyên nhân xuất phát từ (Due to / Attributable to)' },
      { heading: '≈ / ≠', body: 'Xấp xỉ (Roughly, approximately) / Tương phản (Differs from)' },
      { heading: 'w/ & w/o', body: 'Với (With) & Không có (Without)' }
    ]
  },
  {
    id: 'cs-task1',
    titleVi: 'Khung Overview Bất Bại Writing Task 1',
    iconName: 'PenTool',
    summaryPoints: [
      {
        heading: 'Công Thức 2 Vế (Two-Halves Overview)',
        body: 'Vế 1: Nêu bật đối tượng chiếm tỷ trọng/tốc độ cao nhất. Vế 2: Nêu xu hướng chung (Tăng/giảm/dao động). Tuyệt đối KHÔNG đưa số liệu chi tiết.',
        codeSnippet: 'Overall, while [Subject A] remained the predominant category throughout the period, [Subject B] witnessed the most pronounced upward trajectory.'
      }
    ]
  },
  {
    id: 'cs-toulmin',
    titleVi: 'Cấu Trúc Nhượng Bộ & Phản Đòn Task 2',
    iconName: 'Layers',
    summaryPoints: [
      {
        heading: 'Khung Bẻ Luận Điểm Đối Lập (Rebuttal Pivot)',
        body: 'Thừa nhận mặt tích cực của đối phương nhưng chỉ ra lỗ hổng chi phí cơ hội hoặc tính bất khả thi dài hạn.',
        codeSnippet: 'Proponents of [Counter View] often argue that [...]. However, this assertion overlooks the fundamental dilemma that [...], thereby rendering it untenable in the long run.'
      }
    ]
  },
  {
    id: 'cs-speaking-p3',
    titleVi: '6 Lăng Kính Chủ Thể Speaking Part 3',
    iconName: 'Compass',
    summaryPoints: [
      { heading: '1. Economic Prism', body: 'Chi phí, lợi tức đầu tư (ROI), gánh nặng tài khóa chính phủ.' },
      { heading: '2. Environmental Prism', body: 'Dấu chân carbon, suy thoái đa dạng sinh học, tính bền vững.' },
      { heading: '3. Sociological Prism', body: 'Bất bình đẳng thu nhập, gắn kết cộng đồng, khoảng cách thế hệ.' },
      { heading: '4. Technological Prism', body: 'Tự động hóa, an ninh dữ liệu, hiệu suất xử lý thuật toán.' },
      { heading: '5. Ethical / Moral Prism', body: 'Quyền riêng tư cá nhân, công bằng xã hội, trách nhiệm đạo đức.' },
      { heading: '6. Educational Prism', body: 'Nâng cao nhận thức cộng đồng, đào tạo kỹ năng số, tư duy phản biện.' }
    ]
  }
];
