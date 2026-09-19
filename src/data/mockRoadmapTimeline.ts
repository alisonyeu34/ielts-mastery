import { PhaseNumber } from "@/types/database";

export interface RoadmapTask {
  id: string;
  type: "theory" | "drill" | "vocab" | "errorBank";
  title: string;
  durationMinutes: number;
  linkUrl: string;
  theoryUrl?: string;
  practiceUrl?: string;
  skillBadge?: string;
}

export interface GatekeeperChallengeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GatekeeperDetails {
  title: string;
  minScorePercent: number;
  description: string;
  challengeQuestions: GatekeeperChallengeQuestion[];
}

export interface RoadmapDayNode {
  dayNumber: number;
  phase: PhaseNumber;
  week: number;
  title: string;
  summary: string;
  focusSkill: "pronunciation" | "grammar" | "reading" | "listening" | "writing" | "speaking" | "vocab" | "all";
  isGatekeeper: boolean;
  gatekeeperDetails?: GatekeeperDetails;
  tasks: RoadmapTask[];
}

// =============================================================================
// GIAI ĐOẠN 1: "CỨU NGỮ PHÁP NỀN TẢNG & XÂY GỐC" (19/9 - 19/10/2026) — Ngày 1-31
// =============================================================================

const PHASE1_MILESTONES: Record<number, Partial<RoadmapDayNode>> = {
  1: {
    title: "19/9 — Ngày 1: Khởi Động 4 Kỹ Năng • Dạy Kỹ Năng Trước - Luyện Tập Sau",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m) • 3h nghỉ ngơi: Ca 1 Reading (Học Skimming 90s & Scanning ➔ Đọc hiểu 2 cột), Ca 2 Listening (Học quy trình 3 bước 30s & Bắt số Section 1 ➔ Dictation Cam 11 S1), Ca 3 Writing (Học 7 trụ cột ngữ pháp S-V-O ➔ Sentence Lab), Ca 4 Speaking (Học phản xạ Echo Shadowing ➔ Phản xạ Part 1 không IPA).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d1_1", type: "theory", title: "Ca 1 (105m) — Reading: [Học Kỹ Năng] Skimming 90s & Scanning 2 Tầng Keywords ➔ [Luyện Tập] Đọc Hiểu 2 Cột & Nạp Từ Vựng", durationMinutes: 105, linkUrl: "/theory/reading-methods/reading-foundation-skimming-scanning", theoryUrl: "/theory/reading-methods/reading-foundation-skimming-scanning", practiceUrl: "/practice/reading-split", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d1_2", type: "theory", title: "Ca 2 (105m) — Listening: [Học Kỹ Năng] Quy Trình 3 Bước 30s & Bắt Số/Tên Riêng Section 1 ➔ [Luyện Tập] Nghe Dictation Cam 11 S1", durationMinutes: 105, linkUrl: "/theory/listening-methods/listening-section1-self-correction", theoryUrl: "/theory/listening-methods/listening-section1-self-correction", practiceUrl: "/practice/dictation", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d1_3", type: "theory", title: "Ca 3 (105m) — Writing: [Học Kỹ Năng] 7 Trụ Cột Ngữ Pháp Câu S-V-O Chuẩn IELTS ➔ [Luyện Tập] Sentence Lab Viết 10 Câu", durationMinutes: 105, linkUrl: "/theory/present-simple-foundation", theoryUrl: "/theory/present-simple-foundation", practiceUrl: "/practice/sentence-writing", skillBadge: "Học Ngữ Pháp Trước" },
      { id: "p1_d1_4", type: "theory", title: "Ca 4 (105m) — Speaking: [Học Kỹ Năng] Phương Pháp Echo Shadowing & Nhịp Điệu Cụm Ý ➔ [Luyện Tập] Phản Xạ Part 1 (Hometown/Studies) — Không học IPA", durationMinutes: 105, linkUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", theoryUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", practiceUrl: "/practice/shadowing", skillBadge: "Học Chiến Lược Trước" },
    ],
  },
  2: {
    title: "20/9 — Ngày 2: True/False/Not Given & Hiện Tại Hoàn Thành",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Học chiến thuật TFNG & Bẫy Over-inference ➔ Luyện Scan), Ca 2 Listening (Học bắt bưu điện, ngày tháng & Bẫy tự sửa ➔ Cam 11 T2-S1), Ca 3 Writing (HTHT vs QKĐ ➔ 10 câu kinh nghiệm), Ca 4 Speaking (Làm chủ cụm ý Thought Chunking ➔ Shadowing tự nhiên).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d2_1", type: "theory", title: "Ca 1 (105m) — Reading: [Học Kỹ Năng] True/False/Not Given — Nhận Diện Ranh Giới Thông Tin & Bẫy ➔ [Luyện Tập] Scan & Định Vị", durationMinutes: 105, linkUrl: "/theory/reading-methods/reading-tfng-ynng", theoryUrl: "/theory/reading-methods/reading-tfng-ynng", practiceUrl: "/practice/reading-tfng", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d2_2", type: "theory", title: "Ca 2 (105m) — Listening: [Học Kỹ Năng] Bắt Mã Bưu Điện, Ngày Tháng & Bẫy Tự Sửa ➔ [Luyện Tập] Cam 11 T2-S1 & Dictation", durationMinutes: 105, linkUrl: "/theory/listening-methods/listening-section1-self-correction", theoryUrl: "/theory/listening-methods/listening-section1-self-correction", practiceUrl: "/practice/dictation", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d2_3", type: "theory", title: "Ca 3 (105m) — Writing: [Học Kỹ Năng] Hiện Tại Hoàn Thành vs QKĐ ➔ [Luyện Tập] Viết 10 Câu Kinh Nghiệm 'I have never...'", durationMinutes: 105, linkUrl: "/theory/present-perfect-foundation", theoryUrl: "/theory/present-perfect-foundation", practiceUrl: "/practice/sentence-writing", skillBadge: "Học Ngữ Pháp Trước" },
      { id: "p1_d2_4", type: "theory", title: "Ca 4 (105m) — Speaking: [Học Kỹ Năng] Làm Chủ Cụm Ý (Thought Chunking) ➔ [Luyện Tập] Shadowing Ngắt Nghỉ Tự Nhiên", durationMinutes: 105, linkUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", theoryUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", practiceUrl: "/practice/shadowing", skillBadge: "Học Chiến Lược Trước" },
    ],
  },
  3: {
    title: "21/9 — Ngày 3: Điền Từ Khuyết & Câu Bị Động Khách Quan",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Học Summary Completion & Soi từ loại ➔ Luyện điền từ), Ca 2 Listening (Học bắt âm nối & Điền Form ➔ Cam 11 T3-S1), Ca 3 Writing (Câu bị động 3 thì ➔ Chuyển đổi 10 câu Task 1), Ca 4 Speaking (Cơ miệng âm đuôi -s/z ➔ Công thức 1-2-3 Part 1).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d3_1", type: "theory", title: "Ca 1 (105m) — Reading: [Học Kỹ Năng] Summary Completion — Soi Từ Loại & Paraphrase Biến Dạng ➔ [Luyện Tập] Điền Từ Chuẩn Xác", durationMinutes: 105, linkUrl: "/theory/reading-methods/reading-summary-completion-box", theoryUrl: "/theory/reading-methods/reading-summary-completion-box", practiceUrl: "/practice/reading-completion", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d3_2", type: "theory", title: "Ca 2 (105m) — Listening: [Học Kỹ Năng] Section 1 Bắt Âm Nối & Điền Form Dịch Vụ ➔ [Luyện Tập] Cam 11 T3-S1 & Dictation", durationMinutes: 105, linkUrl: "/theory/listening-methods/listening-section1-self-correction", theoryUrl: "/theory/listening-methods/listening-section1-self-correction", practiceUrl: "/practice/dictation", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d3_3", type: "theory", title: "Ca 3 (105m) — Writing: [Học Kỹ Năng] Câu Bị Động 3 Thì Học Thuật ➔ [Luyện Tập] Chuyển Đổi 10 Câu Chủ Động → Bị Động Task 1", durationMinutes: 105, linkUrl: "/theory/passive-voice-foundation", theoryUrl: "/theory/passive-voice-foundation", practiceUrl: "/practice/sentence-writing", skillBadge: "Học Ngữ Pháp Trước" },
      { id: "p1_d3_4", type: "theory", title: "Ca 4 (105m) — Speaking: [Học Kỹ Năng] Quán Tính Cơ Miệng 2 Âm Đuôi Sống Còn (-s/-es) ➔ [Luyện Tập] Công Thức 1-2-3 Part 1", durationMinutes: 105, linkUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", theoryUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", practiceUrl: "/practice/shadowing", skillBadge: "Học Chiến Lược Trước" },
    ],
  },
  4: {
    title: "22/9 — Ngày 4: Matching Headings & Cấu Trúc So Sánh",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Học bóc tách Topic Sentence & Né bẫy Headings ➔ Luyện ghép tiêu đề), Ca 2 Listening (Học Section 2 Bản đồ & Anchor Point ➔ Cam 11 T4-S1), Ca 3 Writing (So sánh hơn, nhất, kép ➔ 10 câu Task 1), Ca 4 Speaking (Cơ miệng âm đuôi -ed ➔ Kể chuyện quá khứ).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d4_1", type: "theory", title: "Ca 1 (105m) — Reading: [Học Kỹ Năng] Matching Headings — Bóc Tách Topic Sentence & Né Bẫy ➔ [Luyện Tập] Ghép Tiêu Đề Đoạn Văn", durationMinutes: 105, linkUrl: "/theory/reading-methods/reading-matching-headings", theoryUrl: "/theory/reading-methods/reading-matching-headings", practiceUrl: "/practice/reading-headings", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d4_2", type: "theory", title: "Ca 2 (105m) — Listening: [Học Kỹ Năng] Section 2 Đọc Bản Đồ Sơ Đồ & Ghim Điểm Xuất Phát ➔ [Luyện Tập] Cam 11 T4-S1 Đặt Bàn", durationMinutes: 105, linkUrl: "/theory/listening-methods/listening-section2-map-orientation", theoryUrl: "/theory/listening-methods/listening-section2-map-orientation", practiceUrl: "/practice/listening-map", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d4_3", type: "theory", title: "Ca 3 (105m) — Writing: [Học Kỹ Năng] Cấu Trúc So Sánh Hơn, Nhất & So Sánh Kép ➔ [Luyện Tập] Viết 10 Câu So Sánh Số Liệu Task 1", durationMinutes: 105, linkUrl: "/theory/comparisons-foundation", theoryUrl: "/theory/comparisons-foundation", practiceUrl: "/practice/sentence-writing", skillBadge: "Học Ngữ Pháp Trước" },
      { id: "p1_d4_4", type: "theory", title: "Ca 4 (105m) — Speaking: [Học Kỹ Năng] Quán Tính Cơ Miệng Âm Đuôi Quá Khứ (-ed) ➔ [Luyện Tập] Phản Xạ Kể Chuyện Kỷ Niệm (Past Reflex)", durationMinutes: 105, linkUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", theoryUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", practiceUrl: "/practice/shadowing", skillBadge: "Học Chiến Lược Trước" },
    ],
  },
  5: {
    title: "23/9 — Ngày 5: Multiple Choice & Mệnh Đề Quan Hệ",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Học Multiple Choice bẫy đối lập ➔ Luyện trắc nghiệm), Ca 2 Listening (Học Section 2 Hệ từ vựng không gian ➔ Cam 12 T1-S1), Ca 3 Writing (MĐQH Who/Which/That ➔ Nối câu phức), Ca 4 Speaking (Trọng âm câu & Fillers tự nhiên).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d5_1", type: "theory", title: "Ca 1 (105m) — Reading: [Học Kỹ Năng] Multiple Choice — Bẫy Đối Lập & Phương Án Nhiễu ➔ [Luyện Tập] Trắc Nghiệm Học Thuật", durationMinutes: 105, linkUrl: "/theory/reading-methods/reading-foundation-skimming-scanning", theoryUrl: "/theory/reading-methods/reading-foundation-skimming-scanning", practiceUrl: "/practice/reading-split", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d5_2", type: "theory", title: "Ca 2 (105m) — Listening: [Học Kỹ Năng] Section 2 Hệ Từ Vựng Không Gian & Bẫy Đổi Hướng ➔ [Luyện Tập] Cam 12 T1-S1 & Bắt Số Thẻ", durationMinutes: 105, linkUrl: "/theory/listening-methods/listening-section2-map-orientation", theoryUrl: "/theory/listening-methods/listening-section2-map-orientation", practiceUrl: "/practice/dictation", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d5_3", type: "theory", title: "Ca 3 (105m) — Writing: [Học Kỹ Năng] Mệnh Đề Quan Hệ Who/Which/That ➔ [Luyện Tập] Nối 2 Câu Đơn Thành Câu Phức Học Thuật", durationMinutes: 105, linkUrl: "/theory/relative-clauses-basic", theoryUrl: "/theory/relative-clauses-basic", practiceUrl: "/practice/sentence-writing", skillBadge: "Học Ngữ Pháp Trước" },
      { id: "p1_d5_4", type: "theory", title: "Ca 4 (105m) — Speaking: [Học Kỹ Năng] Trọng Âm Câu & Fillers Tự Nhiên Chống Im Lặng ➔ [Luyện Tập] Shadowing Podcast Ngắn", durationMinutes: 105, linkUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", theoryUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", practiceUrl: "/practice/shadowing", skillBadge: "Học Chiến Lược Trước" },
    ],
  },
  6: {
    title: "24/9 — Ngày 6: Matching Features & Câu Điều Kiện 1-2",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Học Matching Features tên người ➔ Luyện đối soát quan điểm), Ca 2 Listening (Học Section 3 Hội thoại & Bẫy đồng thuận giả ➔ Cam 12 T2-S1), Ca 3 Writing (Câu ĐK1 & ĐK2 Task 2 ➔ 10 câu nguyên nhân - kết quả), Ca 4 Speaking (Nối âm tự nhiên ➔ Phản xạ Part 1 Hobbies).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d6_1", type: "theory", title: "Ca 1 (105m) — Reading: [Học Kỹ Năng] Matching Features — Quét Nhanh Danh Từ Riêng & Đối Soát ➔ [Luyện Tập] Phân Tích Quan Điểm", durationMinutes: 105, linkUrl: "/theory/reading-methods/reading-tfng-ynng", theoryUrl: "/theory/reading-methods/reading-tfng-ynng", practiceUrl: "/practice/reading-split", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d6_2", type: "theory", title: "Ca 2 (105m) — Listening: [Học Kỹ Năng] Section 3 Hội Thoại Học Thuật & Bẫy Đồng Thuận Giả ➔ [Luyện Tập] Cam 12 T2-S1 Giờ Giấc", durationMinutes: 105, linkUrl: "/theory/listening-methods/listening-section3-false-consensus", theoryUrl: "/theory/listening-methods/listening-section3-false-consensus", practiceUrl: "/practice/listening-s3-consensus", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d6_3", type: "theory", title: "Ca 3 (105m) — Writing: [Học Kỹ Năng] Câu Điều Kiện Loại 1 & 2 Task 2 ➔ [Luyện Tập] Viết 10 Câu Lập Luận Nguyên Nhân - Hệ Quả", durationMinutes: 105, linkUrl: "/theory/conditionals-type1-2", theoryUrl: "/theory/conditionals-type1-2", practiceUrl: "/practice/sentence-writing", skillBadge: "Học Ngữ Pháp Trước" },
      { id: "p1_d6_4", type: "theory", title: "Ca 4 (105m) — Speaking: [Học Kỹ Năng] Nối Âm & Lướt Âm Tự Nhiên (Connected Speech) ➔ [Luyện Tập] Phản Xạ Part 1 Hobbies", durationMinutes: 105, linkUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", theoryUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", practiceUrl: "/practice/shadowing", skillBadge: "Học Chiến Lược Trước" },
    ],
  },
  7: {
    title: "25/9 — Ngày 7: Matching Info & Động Từ Khuyết Thiếu (Hedging)",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Học Matching Information ➔ Luyện bắt chi tiết), Ca 2 Listening (Học Section 4 Bài giảng & Signposts ➔ Cam 12 T3-S1), Ca 3 Writing (Modal Verbs & Hedging ➔ 10 câu khách quan hóa), Ca 4 Speaking (Ngữ điệu cảm xúc ➔ Phản xạ 10 câu Part 1).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d7_1", type: "theory", title: "Ca 1 (105m) — Reading: [Học Kỹ Năng] Matching Information — Kỹ Thuật Định Vị Chi Tiết ➔ [Luyện Tập] Bắt Manh Mối Văn Bản", durationMinutes: 105, linkUrl: "/theory/reading-methods/reading-matching-headings", theoryUrl: "/theory/reading-methods/reading-matching-headings", practiceUrl: "/practice/reading-split", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d7_2", type: "theory", title: "Ca 2 (105m) — Listening: [Học Kỹ Năng] Section 4 Bài Giảng Độc Thoại & Từ Tín Hiệu Dẫn Đường ➔ [Luyện Tập] Cam 12 T3-S1 Nghề Nghiệp", durationMinutes: 105, linkUrl: "/theory/listening-methods/listening-section4-hierarchical-notes", theoryUrl: "/theory/listening-methods/listening-section4-hierarchical-notes", practiceUrl: "/practice/listening-s4", skillBadge: "Học Kỹ Năng Trước" },
      { id: "p1_d7_3", type: "theory", title: "Ca 3 (105m) — Writing: [Học Kỹ Năng] Modal Verbs & Rào Đón Học Thuật (Hedging) ➔ [Luyện Tập] Viết 10 Câu Khách Quan Hóa Task 2", durationMinutes: 105, linkUrl: "/theory/modals-and-hedging", theoryUrl: "/theory/modals-and-hedging", practiceUrl: "/practice/sentence-writing", skillBadge: "Học Ngữ Pháp Trước" },
      { id: "p1_d7_4", type: "theory", title: "Ca 4 (105m) — Speaking: [Học Kỹ Năng] Ngữ Điệu Cảm Xúc & Nhấn Âm Ý Tứ ➔ [Luyện Tập] Phản Xạ 10 Câu Part 1 Thường Gặp", durationMinutes: 105, linkUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", theoryUrl: "/theory/speaking-blueprints/speaking-p1-timeframe-expansion", practiceUrl: "/practice/shadowing", skillBadge: "Học Chiến Lược Trước" },
    ],
  },
  8: {
    title: "26/9 — Ngày 8: Diagram Completion & Giới Từ Học Thuật",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Điền sơ đồ quy trình Diagram), Ca 2 Listening (Cam 12 T4-S1 thể thao), Ca 3 Writing (Giới từ In/On/At & Viết đoạn 150 từ), Ca 4 Speaking (Chiến thuật 1p Part 2 & khung PPF).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d8_1", type: "drill", title: "Ca 1 (105m) — Reading (Nạp): Diagram / Flowchart Completion — Điền sơ đồ quy trình khoa học", durationMinutes: 105, linkUrl: "/practice/reading-split" },
      { id: "p1_d8_2", type: "drill", title: "Ca 2 (105m) — Listening (Nạp): Cam 12 T4-S1 (Nghe bắt chi tiết hoạt động thể thao) + Dictation 1.0x", durationMinutes: 105, linkUrl: "/practice/dictation" },
      { id: "p1_d8_3", type: "theory", title: "Ca 3 (105m) — Writing (Xả): Giới Từ Thời Gian/Không Gian & Viết đoạn văn 150 từ vận dụng đủ 7 trụ cột", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p1_d8_4", type: "drill", title: "Ca 4 (105m) — Speaking (Xả): Khởi Động Chiến Thuật 1 Phút Ghi Chép Part 2 & Khung Dòng Thời Gian PPF (Past - Present - Future)", durationMinutes: 105, linkUrl: "/practice/shadowing" },
    ],
  },
  9: {
    title: "27/9 — Ngày 9: Full Passage 1 Thử Thách & 30 ĐT Bất Quy Tắc",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Đọc trọn vẹn Passage 1 trong 18 phút), Ca 2 Listening (Bóc tách 5 dạng bẫy S1), Ca 3 Writing (30 ĐT Bất Quy Tắc & câu phức), Ca 4 Speaking (Nói 2 phút Part 2 theo khung PPF).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d9_1", type: "drill", title: "Ca 1 (105m) — Reading (Nạp): Thử Thách Safe Zone — Đọc trọn 1 Passage 1 trong 18 phút (Mục tiêu ≥12/13)", durationMinutes: 105, linkUrl: "/practice/reading-split" },
      { id: "p1_d9_2", type: "drill", title: "Ca 2 (105m) — Listening (Nạp): Bóc Tách 5 Dạng Bẫy Điển Hình Section 1 Cambridge + Dictation tốc độ 1.0x", durationMinutes: 105, linkUrl: "/practice/dictation" },
      { id: "p1_d9_3", type: "theory", title: "Ca 3 (105m) — Writing (Xả): 30 Động Từ Bất Quy Tắc Cốt Lõi Hay Sai & Viết 10 câu phức nâng cao", durationMinutes: 105, linkUrl: "/theory" },
      { id: "p1_d9_4", type: "drill", title: "Ca 4 (105m) — Speaking (Xả): Thử Thách Nói Liên Tục 2 Phút Part 2 theo Khung PPF (Chủ đề Person/Memorable Event)", durationMinutes: 105, linkUrl: "/practice/speaking-p1-p2" },
    ],
  },
  10: {
    title: "28/9 — Ngày 10: Phân Tích C1 Cam 11 & Phòng Khám Lỗi Sâu",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Phân tích từ vựng C1 Cam 11), Ca 2 Listening (Mini-Mock S1 ép giờ 10/10), Ca 3 Writing (Phòng khám sửa lỗi sâu trong tuần), Ca 4 Speaking (Phản xạ không vấp).",
    focusSkill: "all",
    tasks: [
      { id: "p1_d10_1", type: "drill", title: "Ca 1 (105m) — Reading (Nạp): Phân Tích Chuyên Sâu Cam 11 T1-P1 & Nạp 20 từ vựng C1 vào Sổ FSRS", durationMinutes: 105, linkUrl: "/practice/reading-split" },
      { id: "p1_d10_2", type: "drill", title: "Ca 2 (105m) — Listening (Nạp): Mini-Mock Test Cam 11 Test 1 Section 1 (Ép giờ, mục tiêu 10/10 tuyệt đối)", durationMinutes: 105, linkUrl: "/practice/dictation" },
      { id: "p1_d10_3", type: "errorBank", title: "Ca 3 (105m) — Writing (Xả): Phòng Khám Lỗi Sâu — Xử lý triệt để các tật sai ngữ pháp ghi nhận trong tuần", durationMinutes: 105, linkUrl: "/error-bank/drill" },
      { id: "p1_d10_4", type: "drill", title: "Ca 4 (105m) — Speaking (Xả): Luyện Think On Your Feet — Phản xạ nói không vấp 5 câu hỏi bất ngờ cùng AI Examiner", durationMinutes: 105, linkUrl: "/grading/speaking" },
    ],
  },
  11: {
    title: "29/9 — Ngày 11: Củng Cố Cột Mốc Tuần 2 & Thử Thách 4 Kỹ Năng",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): Ca 1 Reading (Đọc hiểu 2 cột), Ca 2 Listening (Cam 11 T1-S2), Ca 3 Writing (Tổng ôn 7 trụ cột), Ca 4 Speaking (Ghép trọn Part 1 & 2 trôi chảy).",
    focusSkill: "all",
    isGatekeeper: false,
    tasks: [
      { id: "p1_d11_1", type: "drill", title: "Ca 1 (105m) — Reading (Nạp): Luyện tập Đọc hiểu Passage 1 nâng cao & Bóc tách paraphrase 1-1", durationMinutes: 105, linkUrl: "/practice/reading-split" },
      { id: "p1_d11_2", type: "drill", title: "Ca 2 (105m) — Listening (Nạp): Thử sức Cam 11 Section 2 — Bắt bẫy người nói thứ 2 & chỉ đường Map", durationMinutes: 105, linkUrl: "/practice/dictation" },
      { id: "p1_d11_3", type: "drill", title: "Ca 3 (105m) — Writing (Xả): Bài Viết Tổng Hợp — Vận dụng chuẩn 7 trụ cột ngữ pháp vào bài Task 2", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p1_d11_4", type: "drill", title: "Ca 4 (105m) — Speaking (Xả): Ghép Trọn Vẹn Part 1 & Part 2 — Luyện nhại giọng, giữ nhịp trôi chảy không ngập ngừng >3s", durationMinutes: 105, linkUrl: "/grading/speaking" },
    ],
  },
  31: {
    title: "19/10 — Ngày 31: ĐẠI KIỂM ĐỊNH TỐT NGHIỆP PHASE 1 (BAND 4.5 ➔ 5.5)",
    summary: "Ngồi bàn 10h • Thực học 7h (4 ca x 105m): 4 bài kiểm tra 4 kỹ năng chuyển cấp chính thức sau 31 ngày lấp trọn 12 thì, xóa dịch word-by-word và nạp 800 từ nền tảng. Hoàn thành để mở khóa Phase 2!",
    focusSkill: "all",
    isGatekeeper: true,
    gatekeeperDetails: {
      title: "Kiểm Định Giai Đoạn 1 — 12 Thì, Xóa Dịch Word-by-Word & 4 Kỹ Năng Nền Tảng",
      minScorePercent: 70,
      description: "Đạt tối thiểu 70% để chứng minh nền tảng đã vững và bước vào Giai đoạn 2 (Chiến thuật 14 dạng bài & 2.500 từ chuyên ngành Passage 3).",
      challengeQuestions: [
        {
          id: "gk1_q1",
          question: "Câu nào SAI về thì Hiện tại hoàn thành?",
          options: ["A. I have lived here since 5 years.", "B. I have lived here for 5 years.", "C. She has already finished her work.", "D. Have you ever been to London?"],
          correctIndex: 0,
          explanation: "'Since' đi với mốc thời gian (since 2018), 'for' đi với khoảng thời gian (for 5 years).",
        },
        {
          id: "gk1_q2",
          question: "Chuyển câu chủ động sang bị động: 'They built this school in 2010.'",
          options: ["A. This school was built in 2010.", "B. This school is built in 2010.", "C. This school has been built in 2010.", "D. This school built in 2010."],
          correctIndex: 0,
          explanation: "Quá khứ đơn bị động: was/were + V3 (This school was built).",
        },
        {
          id: "gk1_q3",
          question: "Điền từ quan hệ phù hợp: 'The book _____ I bought yesterday is interesting.'",
          options: ["A. which", "B. who", "C. whom", "D. border"],
          correctIndex: 0,
          explanation: "'The book' là vật nên dùng đại từ quan hệ 'which' hoặc 'that'.",
        },
        {
          id: "gk1_q4",
          question: "Cặp so sánh nào sau đây đúng ngữ pháp học thuật?",
          options: ["A. The rate was twice higher than in 2010.", "B. The rate was twice as high as in 2010.", "C. The rate was more twice than in 2010.", "D. The rate was higher twice as 2010."],
          correctIndex: 1,
          explanation: "Cấu trúc gấp đôi chuẩn IELTS: 'twice as + adj + as' hoặc 'two times as + adj + as'.",
        },
      ],
    },
    tasks: [
      { id: "p1_d31_1", type: "drill", title: "Ca 1 (105m) — Reading (Nạp): Test Đọc Hiểu 13 Câu Chuẩn Thời Gian — Đo chỉ số Safe Zone (Mục tiêu ≥11/13)", durationMinutes: 105, linkUrl: "/practice/reading-split" },
      { id: "p1_d31_2", type: "drill", title: "Ca 2 (105m) — Listening (Nạp): Test Nghe Section 1 & Section 2 — Bắt bẫy tốc độ 1.0x (Mục tiêu ≥16/20)", durationMinutes: 105, linkUrl: "/practice/dictation" },
      { id: "p1_d31_3", type: "drill", title: "Ca 3 (105m) — Writing (Xả): Bài Viết Luận Kiểm Định — Ứng dụng đủ 7 trụ cột ngữ pháp vào bài Task 2", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p1_d31_4", type: "drill", title: "Ca 4 (105m) — Speaking (Xả): Phỏng Vấn Tốt Nghiệp Speaking Phase 1 Cùng AI Examiner (Đo độ trôi chảy, ngữ điệu tự nhiên, phản xạ Part 1-2, KHÔNG học vẹt IPA) ➔ Lễ Chuyển Cấp Band 4.5 ➔ 5.5!", durationMinutes: 105, linkUrl: "/grading/speaking" },
    ],
  },
};

const PHASE2_MILESTONES: Record<number, Partial<RoadmapDayNode>> = {
  // --- Tuần 1 Giai đoạn 2 (22/9 - 28/9) ---
  12: {
    title: "2/10 (T6) — Environment: 20 Từ C1 + Đảo Ngữ Not only",
    summary: "Ca 1: 20 từ Environment C1 + Đảo ngữ Not only...but also. Ca 2: Cam 17 T1 S3+S4. Ca 3: Line graph + Opinion Essay (ép giờ). Ca 4: Part 3 'Environment' — phản biện Should governments take action?",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d12_1", type: "vocab", title: "Ca 1: 20 từ C1 Environment + Đảo ngữ Not only...but also (10 bài tập)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d12_2", type: "drill", title: "Ca 2: Cam 17 T1 — S3+S4 (3 lần nghe) + P2+P3 (3 lần đọc, tra từ)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d12_3", type: "drill", title: "Ca 3: Task 1 Line graph (ép 20p) + Task 2 Opinion Essay (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d12_4", type: "drill", title: "Ca 4: Speaking Part 3 'Environment' — Should governments regulate pollution?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  13: {
    title: "3/10 (T7) — Environment: 20 Từ C1/C2 + Mệnh Đề Nhượng Bộ",
    summary: "Ôn 20 từ ngày 1 + học 20 từ mới. Mệnh đề nhượng bộ Although/Despite/In spite of. Cam 17 T1 S4. Opinion Essay về Renewable energy. Speaking Part 3 về Environmental problems.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d13_1", type: "vocab", title: "Ca 1: Ôn 20 từ ngày 1 + 20 từ mới C1/C2 + Mệnh đề nhượng bộ", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d13_2", type: "drill", title: "Ca 2: Cam 17 T1-S4 (3 lần) + T1-P3 (3 lần đọc)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d13_3", type: "drill", title: "Ca 3: Task 1 Bar chart (ép 20p) + Task 2 Opinion (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d13_4", type: "drill", title: "Ca 4: Part 3 — Why do people ignore environmental issues? Consequences?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  14: {
    title: "30/9 (T4) — Environment: Collocations + Đảo Ngữ So/Such",
    summary: "Ôn tập từ vựng ngày 1+2. Học collocations Environment. Đảo ngữ So/Such. Review Cam 17 T1 S3+S4. Viết lại Task 1 và Task 2 đã sửa.",
    focusSkill: "grammar",
    tasks: [
      { id: "p2_d14_1", type: "vocab", title: "Ca 1: Collocations Environment + Đảo ngữ So...that / Such...that (10 bài)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d14_2", type: "drill", title: "Ca 2: Review Cam 17 T1 S3+S4 (nghe lại) + Review P2+P3 (highlight từ nối)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d14_3", type: "drill", title: "Ca 3: Viết lại Task 1 + Task 2 đã sửa (ép giờ cải thiện)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d14_4", type: "drill", title: "Ca 4: Part 3 — How can individuals reduce carbon footprint? Role of businesses?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  15: {
    title: "1/10 (T5) — Environment: Đảo Ngữ Only + Cam 17 T2",
    summary: "Collocations mới: combat climate change, promote sustainable development. Đảo ngữ với Only after/when/by. Cam 17 T2 S3+S4 và P2. Pie Chart + Opinion Essay.",
    focusSkill: "grammar",
    tasks: [
      { id: "p2_d15_1", type: "vocab", title: "Ca 1: Collocations hành động: tackle, address, reduce, invest + Đảo ngữ Only", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d15_2", type: "drill", title: "Ca 2: Cam 17 T2-S3+S4 (3 lần nghe) + T2-P2 (3 lần đọc)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d15_3", type: "drill", title: "Ca 3: Task 1 Pie chart (ép 20p) + Task 2 Opinion Body paragraphs (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d15_4", type: "drill", title: "Ca 4: Speaking Part 2 — Describe a gift + Part 3 Climate change questions", durationMinutes: 90, linkUrl: "/practice/speaking-p1-p2" },
    ],
  },
  16: {
    title: "4/10 (CN) — Tổng Kết Từ Vựng Environment + Cam 17 T2 P3",
    summary: "Ôn tập 60+ từ C1/C2 về Environment. Viết đoạn văn 200 từ dùng 15 từ. Ôn đảo ngữ. Cam 17 T2-S4 + P3. Full test Task 1+2 ép giờ. Mock Part 3 Environment.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d16_1", type: "vocab", title: "Ca 1: Tổng hợp 60+ từ Environment + viết đoạn 200 từ + ôn đảo ngữ", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d16_2", type: "drill", title: "Ca 2: Cam 17 T2-S4 (3 lần nghe) + T2-P3 (3 lần đọc)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d16_3", type: "drill", title: "Ca 3: Full test Task 1 bất kỳ (ép 20p) + Task 2 bất kỳ (ép 40p) + tự sửa", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d16_4", type: "drill", title: "Ca 4: Mock Part 3 — 5 câu hỏi Environment liên tục, mỗi câu 1 phút", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  17: {
    title: "5/10 (T2) — Chuyển Tiếp Education + Câu Chẻ Cleft Sentences",
    summary: "Ôn 20 câu từ vựng Environment + giới thiệu 8 từ Education C1. Câu chẻ It is...that/who. Cam 17 T3-S3+S4 + P2. Task 1 Table + Opinion Essay. Shadowing Part 3 Education.",
    focusSkill: "grammar",
    tasks: [
      { id: "p2_d17_1", type: "vocab", title: "Ca 1: Ôn Environment + giới thiệu từ Education + Câu chẻ Cleft sentences", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d17_2", type: "drill", title: "Ca 2: Cam 17 T3-S3+S4 + T3-P2 (3 lần mỗi loại)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d17_3", type: "drill", title: "Ca 3: Task 1 Table (ép 20p) + Task 2 Opinion Conclusion (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d17_4", type: "drill", title: "Ca 4: Shadowing Part 3 'Education' + trả lời What is the purpose of education?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  18: {
    title: "6/10 (T3) — Education: 20 Từ C1 + Phân Từ Participles + Cam 17 T3",
    summary: "Học 20 từ Education C1/C2. Phân từ rút gọn mệnh đề (V-ing chủ động / V-ed bị động). Cam 17 T3-S4 + P3. Mixed Graphs + Opinion Essay. Tự đánh giá tiến bộ 1 tuần.",
    focusSkill: "grammar",
    tasks: [
      { id: "p2_d18_1", type: "vocab", title: "Ca 1: 20 từ Education C1/C2 + Phân từ rút gọn mệnh đề (10 bài tập)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d18_2", type: "drill", title: "Ca 2: Cam 17 T3-S4 (3 lần nghe) + T3-P3 (3 lần đọc)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d18_3", type: "drill", title: "Ca 3: Task 1 Mixed Graphs (ép 20p) + Task 2 Opinion hoàn chỉnh (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d18_4", type: "drill", title: "Ca 4: Mock Part 3 — 5 câu Education + tự đánh giá tiến bộ tuần 1", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },

  // --- Tuần 2 Giai đoạn 2 (29/9 - 5/10) ---
  19: {
    title: "7/10 (T4) — Education Nâng Cao + Câu Chẻ Chuyên Sâu + Cam 18 T1",
    summary: "Collocations Education: acquire knowledge, foster creativity, holistic development. Câu chẻ nâng cao nhấn mạnh S/O/Adv. Cam 18 T1-S3+S4. Pie Chart + Discuss both views.",
    focusSkill: "grammar",
    tasks: [
      { id: "p2_d19_1", type: "vocab", title: "Ca 1: Collocations Education học thuật + Câu chẻ chuyên sâu nhấn mạnh 3 thành phần", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d19_2", type: "drill", title: "Ca 2: Cam 18 T1-S3+S4 (3 lần nghe, highlight paraphrase) + T1-P2 (Matching Headings, TFNG)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d19_3", type: "drill", title: "Ca 3: Task 1 Pie chart (ép 20p) + Task 2 Discuss both views (ép 40p) — cấu trúc mới", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d19_4", type: "drill", title: "Ca 4: Part 3 'Education' — Shadowing + Group study advantages? Traditional exams?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  20: {
    title: "8/10 (T5) — Technology in Education + Đảo Ngữ Hardly/Scarcely + Cam 18 T1 P3",
    summary: "20 từ Technology in Education: cutting-edge, adaptive software, gamification. Đảo ngữ Hardly/Scarcely...when + Past Perfect. Cam 18 T1-S4 + P3. Table + Discuss both views.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d20_1", type: "vocab", title: "Ca 1: 20 từ Technology in Education + Đảo ngữ Hardly had...when (10 bài)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d20_2", type: "drill", title: "Ca 2: Cam 18 T1-S4 (liaison bẫy âm nối) + T1-P3 (câu dài, phân tích mệnh đề)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d20_3", type: "drill", title: "Ca 3: Task 1 Table (ép 20p) + Task 2 Discuss — Intro chuẩn 'While...others contend'", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d20_4", type: "drill", title: "Ca 4: Speaking — Technology + Education: How is edu today different from 50 years ago?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  21: {
    title: "9/10 (T6) — Tổng Hợp Tuần 2: Education + Tech + Review Cam 18 T1",
    summary: "Ôn tập toàn bộ từ vựng Education + Technology. Kết hợp Câu chẻ + Đảo ngữ. Review Cam 18 T1 (tốc độ 1.2x). Viết lại Mixed Pie+Table. Tự phản biện bài viết của mình.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d21_1", type: "vocab", title: "Ca 1: Tổng hợp Education + Tech + kết hợp câu chẻ & đảo ngữ trong viết", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d21_2", type: "drill", title: "Ca 2: Review Cam 18 T1 S3+S4 (1.2x) + Review P2+P3 (highlight linking words)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d21_3", type: "drill", title: "Ca 3: Task 1 Mixed Pie+Table (ép 20p) + Task 2 Discuss viết lại (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d21_4", type: "drill", title: "Ca 4: Speaking — đuôi -ed /t/ /d/ /ɪd/ + Should governments invest primary or higher edu?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  22: {
    title: "10/10 (T7) — Psychology & Learning + Phân Từ Hoàn Thành + Cam 18 T2",
    summary: "Từ vựng Psychology & Learning: cognitive overload, growth mindset, intrinsic motivation. Phân từ hoàn thành Having + V3. Cam 18 T2-S3+S4 + P2. Pie Chart khó + Discuss both views.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d22_1", type: "vocab", title: "Ca 1: Từ vựng Psychology & Learning + Phân từ hoàn thành Having V3 (10 bài)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d22_2", type: "drill", title: "Ca 2: Cam 18 T2-S3+S4 (bẫy distractors) + T2-P2 (Matching Features + Summary)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d22_3", type: "drill", title: "Ca 3: Task 1 Pie 6-8 thành phần — nhóm phần nhỏ (ép 20p) + Discuss Body cân xứng (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d22_4", type: "drill", title: "Ca 4: Speaking — 'What can schools do to reduce students stress?' (3 giải pháp)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  23: {
    title: "11/10 (CN) — Learning Methods + Mục Đích & Kết Quả + Cam 18 T3",
    summary: "Từ vựng Learning Styles: spaced repetition, active recall, growth mindset. Mệnh đề mục đích (in order that/so that) và kết quả (such that). Cam 18 T3-S3+S4. Task 1 Mixed Bar+Table.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d23_1", type: "vocab", title: "Ca 1: Learning Styles vocabulary + Mệnh đề mục đích & kết quả (10 bài tập)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d23_2", type: "drill", title: "Ca 2: Cam 18 T3-S3+S4 (Flow Chart Completion) + T3-P2 (ép 20p tốc độ)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d23_3", type: "drill", title: "Ca 3: Task 1 Mixed Bar+Table (ép 20p) + Task 2 Discuss both views đảo ngữ + câu chẻ (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d23_4", type: "drill", title: "Ca 4: Part 3 — Intonation luyện + Why do some prefer self-study over classroom?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  24: {
    title: "12/10 (T2) — Ôn Tập Tổng Hợp Tuần 2 + Cam 18 Full Test",
    summary: "Ôn 50 từ Education + Tech + Psychology. Làm Full Listening Cam 18 T1. Full Writing Test Task 1 + Task 2 (60 phút). Full Mock Speaking P1-P2-P3. CMA: Tổng ôn Forecasting.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d24_1", type: "vocab", title: "Ca 1: 40 câu trắc nghiệm từ vựng (Edu + Tech + Psychology) + ôn grammar tổng hợp", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d24_2", type: "drill", title: "Ca 2: Full Listening Cam 18 T1 (4 sections, không tua) + Full Reading Cam 18 T1", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d24_3", type: "drill", title: "Ca 3: Full Writing Test 60 phút liên tục — Task 1 + Task 2 (không ngắt quãng)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d24_4", type: "drill", title: "Ca 4: Full Mock Speaking — P1 (Edu/Routine) + P2 (Describe a teacher) + P3", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  25: {
    title: "13/10 (T3) — Tổng Kết Tuần 2 + Làm Nóng Tuần 3",
    summary: "50 câu trắc nghiệm tổng hợp 2 tuần. Viết 1 bài Discuss đủ 5 cấu trúc nâng cao. Nghe Cam 19 T2-S3 (làm nóng). Tự đánh giá KPI tuần 2.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d25_1", type: "vocab", title: "Ca 1: 50 câu trắc nghiệm tổng hợp 2 tuần + tổng ôn grammar nâng cao", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d25_2", type: "drill", title: "Ca 2: Nghe làm nóng Cam 19 T2-S3 + Đọc Cam 19 T2-P2 (gạch chân từ mới)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d25_3", type: "drill", title: "Ca 3: Full Writing Test 60 phút — Task 1 Mixed + Task 2 Opinion về Education", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d25_4", type: "drill", title: "Ca 4: Free-flow Speaking — tóm tắt TED Talk Education sau 2 phút xem", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },

  // --- Tuần 3 Giai đoạn 2 (13-19/10): Technology ---
  26: {
    title: "14/10 (T4) — Technology: 20 Từ C1 + Rút Gọn Mệnh Đề V-ing/V-ed + Cam 18 T4",
    summary: "20 từ Technology C1: groundbreaking, state-of-the-art, IoT, digital divide. Rút gọn mệnh đề quan hệ V-ing (chủ động) / V-ed (bị động). Cam 18 T4-S3+S4 + P2. Map + Problem/Solution.",
    focusSkill: "grammar",
    tasks: [
      { id: "p2_d26_1", type: "vocab", title: "Ca 1: 20 từ Technology C1 + Rút gọn mệnh đề V-ing/V-ed (10 bài chuyển đổi)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d26_2", type: "drill", title: "Ca 2: Cam 18 T4-S3+S4 (Multiple Choice, bẫy distractors) + T4-P2 (Matching + Summary)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d26_3", type: "drill", title: "Ca 3: Task 1 MAP — so sánh 2 bản đồ, từ vựng vị trí + Task 2 Problem/Solution về Tech (ép giờ)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d26_4", type: "drill", title: "Ca 4: Shadowing Part 3 Technology + How will tech change work in future? (điều kiện 1+2)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  27: {
    title: "15/10 (T5) — Technology & Internet + Rút Gọn Nâng Cao + Cam 18 T4 P3",
    summary: "20 từ Technology & Internet: cybercrime, identity theft, facial recognition, genetic engineering. Rút gọn V-ing/V-ed hỗn hợp nâng cao. Cam 18 T4-S4 + P3. Process + Problem/Solution.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d27_1", type: "vocab", title: "Ca 1: 20 từ Technology/Internet + Rút gọn hỗn hợp nâng cao (10 bài viết 2 cách)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d27_2", type: "drill", title: "Ca 2: Cam 18 T4-S4 (bật phụ đề lần 2) + T4-P3 (TFNG + Matching Information)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d27_3", type: "drill", title: "Ca 3: Task 1 PROCESS — từ vựng trình tự (Initially, subsequently) + Task 2 Problem/Sol Ô nhiễm (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d27_4", type: "drill", title: "Ca 4: Part 3 — Robots replace workers? (quan điểm cân bằng) + ghi âm sửa giới từ", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  28: {
    title: "16/10 (T6) — Technology Ethics + Phân Từ Hoàn Thành + Review Cam 18 T4",
    summary: "Từ vựng Tech Ethics: ethical dilemma, data privacy, deepfake, accountability. Phân từ hoàn thành Having + V3 ôn lại. Review Cam 18 T4 (S3+S4, tốc độ bình thường). Map so sánh lịch sử + P/S.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d28_1", type: "vocab", title: "Ca 1: Tech Ethics vocabulary + Phân từ hoàn thành Having V3 — ôn lại (10 bài)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d28_2", type: "drill", title: "Ca 2: Review Cam 18 T4 S3+S4 (ghi từ vựng) + Review P2+P3 (bảng paraphrase)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d28_3", type: "drill", title: "Ca 3: Task 1 Map so sánh quá khứ/hiện tại + Task 2 P/S sửa lại Body 2 cụ thể hơn", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d28_4", type: "drill", title: "Ca 4: Part 3 — Children using smartphones: 3 bất lợi cụ thể + ghi âm đuôi -ed", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  29: {
    title: "17/10 (T7) — Big Data & AI + Tổng Hợp Grammar + Cam 19 T1",
    summary: "Ôn 60 từ Tech trong tuần. Viết đoạn 200 từ về Big Data. Tổng hợp 15 câu Rút gọn + Phân từ + Đảo ngữ + Câu chẻ. Cam 19 T1-S3+S4 + P2 (Matching Headings).",
    focusSkill: "all",
    tasks: [
      { id: "p2_d29_1", type: "vocab", title: "Ca 1: Tổng hợp 60 từ Tech + viết 200 từ Big Data + 15 câu grammar tổng hợp", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d29_2", type: "drill", title: "Ca 2: Cam 19 T1-S3+S4 (Cam 19 khó hơn — nghe chậm hơn) + T1-P2 (Matching Headings)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d29_3", type: "drill", title: "Ca 3: Task 1 Process khó (tái chế nhựa) — bị động chuẩn + Task 2 P/S (thiếu kỹ năng Tech)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d29_4", type: "drill", title: "Ca 4: Part 3 — Digital Divide: How can governments ensure everyone access tech? (3 giải pháp)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  30: {
    title: "18/10 (CN) — Full Test Cam 19 T1 + Tổng Ôn 3 Tuần",
    summary: "Full Test Cam 19 T1 (Listening + Reading 60p). Full Writing Test (Map + P/S). Full Mock Speaking về Technology. Phân tích lỗi sai sâu.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d30_1", type: "vocab", title: "Ca 1: 30 câu trắc nghiệm từ vựng 3 tuần + viết đoạn 150 từ với 5 cấu trúc bắt buộc", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d30_2", type: "drill", title: "Ca 2: Full Listening Cam 19 T1 + Full Reading Cam 19 T1 (ghi điểm)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d30_3", type: "drill", title: "Ca 3: Full Writing Test (Task 1 Map + Task 2 P/S, 60p liền mạch)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d30_4", type: "drill", title: "Ca 4: Full Mock Speaking — P1 Routine + P2 Tech bạn dùng + P3 Technology & Society", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  31: {
    title: "19/10 (T2) — Cybersecurity + Ôn Toàn Bộ Rút Gọn Mệnh Đề + Cam 19 T1 P3",
    summary: "Từ vựng Cybersecurity: encryption, ransomware, digital footprint, phishing. Ôn tất cả cách rút gọn (V-ing, V-ed, to V, Having V3). Cam 19 T1-S4 + P3. Map tương lai + P/S Già hóa dân số.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d31_1", type: "vocab", title: "Ca 1: Cybersecurity vocabulary + Ôn toàn bộ 4 cách rút gọn mệnh đề (20 bài phân loại)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d31_2", type: "drill", title: "Ca 2: Cam 19 T1-S4 (3 lần nghe) + T1-P3 (Matching Info + Multiple Choice)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d31_3", type: "drill", title: "Ca 3: Task 1 Map tương lai (will be built, planned to be) + Task 2 P/S Già hóa (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d31_4", type: "drill", title: "Ca 4: Part 3 — Data privacy + Do people depend too much on tech? + ghi âm sửa lỗi 'um'", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  32: {
    title: "20/10 (T3) — Tổng Kết Tuần 3 + Super Review + Cam 19 T2 Làm Nóng",
    summary: "50 câu trắc nghiệm 3 chủ đề. Full Test Cam 19 T1 Writing. Nghe làm nóng Cam 19 T2-S3. Tự đánh giá KPI tuần 3 — Grammar rút gọn mệnh đề đạt 95%?",
    focusSkill: "all",
    tasks: [
      { id: "p2_d32_1", type: "vocab", title: "Ca 1: Super Review — 50 câu trắc nghiệm (Env + Edu + Tech) + 30 câu grammar + tự chấm 7.5", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d32_2", type: "drill", title: "Ca 2: Nghe làm nóng Cam 19 T2-S3 + Đọc Cam 19 T2-P2 (chưa làm câu hỏi, đọc hiểu)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d32_3", type: "drill", title: "Ca 3: Full Test Writing 60p (Task 1 bất kỳ + Task 2 bất kỳ) + phân tích feedback", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d32_4", type: "drill", title: "Ca 4: Free-flow — TED Talk Tech 2p → tóm tắt 3p bằng miệng (so sánh với video gốc)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },

  // --- Tuần 4 Giai đoạn 2 (13-19/10): Health ---
  33: {
    title: "19/10 (T2) — Health: 20 Từ C1 + So...That / Such...That + Cam 19 T2",
    summary: "20 từ Health C1: sedentary lifestyle, chronic diseases, immune system. Đảo ngữ So...That. Cam 19 T2-S3+S4 + P2. Mixed Graphs Line+Bar + Advantage/Disadvantage Essay.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d33_1", type: "vocab", title: "Ca 1: 20 từ Health C1 + Đảo ngữ So adj + be + S + that (10 bài chuyển câu)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d33_2", type: "drill", title: "Ca 2: Cam 19 T2-S3+S4 (bẫy but/however) + T2-P2 (Matching Headings + Summary)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d33_3", type: "drill", title: "Ca 3: Task 1 Mixed Graphs Line+Bar (ép 20p) + Task 2 Advantage/Disadvantage — cấu trúc mới (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d33_4", type: "drill", title: "Ca 4: Part 3 'Healthy eating' — Shadowing /θ/ health + Why do young people have unhealthy diets?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  34: {
    title: "20/10 (T3) — Mental Health + Mệnh Đề Nguyên Nhân + Cam 19 T2 P3",
    summary: "20 từ Mental Health: anxiety, burnout, resilience, mindfulness. Because vs Because of vs Due to. Cam 19 T2-S4 + P3. Table+Pie + Advantage/Disadvantage về Work from home.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d34_1", type: "vocab", title: "Ca 1: Mental Health vocabulary + Mệnh đề nguyên nhân (Because/Because of/Due to, 10 bài)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d34_2", type: "drill", title: "Ca 2: Cam 19 T2-S4 (Note Completion, chính tả) + T2-P3 (Matching Info, TFNG — từ đồng nghĩa)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d34_3", type: "drill", title: "Ca 3: Task 1 Table+Pie (ép 20p) + Task 2 Adv/Dis — Topic Sentence chuẩn (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d34_4", type: "drill", title: "Ca 4: Part 3 'Mental health' — What can companies do to improve employees' mental health? (3 giải pháp)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  35: {
    title: "21/10 (T4) — Healthcare Systems + Cause-Effect Nâng Cao + Cam 19 T3",
    summary: "Từ vựng Healthcare: universal healthcare, vaccination, epidemic, fatality rate. Consequently/Therefore ở đầu câu. Review Cam 19 T2. Mixed Line+Pie + Adv/Dis về online food delivery.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d35_1", type: "vocab", title: "Ca 1: Healthcare vocabulary + Cause-Effect nâng cao: Consequently / As a result / Therefore (10 bài)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d35_2", type: "drill", title: "Ca 2: Review Cam 19 T2 S3+S4 (1.2x) + Review P2+P3 (highlight từ nối Cause-Effect)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d35_3", type: "drill", title: "Ca 3: Task 1 Mixed Line+Pie nâng cao (ép 20p) + Task 2 Adv/Dis food delivery — Conclusion outweigh (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d35_4", type: "drill", title: "Ca 4: Part 3 — Healthcare urban vs rural (so sánh kép The more...the more) + ghi âm đuôi -s/-es", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  36: {
    title: "22/10 (T5) — Nutrition + Tổng Hợp Grammar Sức Khỏe + Cam 19 T3",
    summary: "Ôn 60+ từ Health. Viết 200 từ về sống khỏe mạnh. Tổng hợp Cause-Effect + đảo ngữ So...That. Cam 19 T3-S3+S4 + P2. Mixed Graphs 3 biểu đồ + Adv/Dis về công nghệ kết nối.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d36_1", type: "vocab", title: "Ca 1: Tổng hợp 60+ từ Health + viết 200 từ + tổng hợp grammar Cause-Effect + So...that", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d36_2", type: "drill", title: "Ca 2: Cam 19 T3-S3+S4 (Matching nối người-ý kiến) + T3-P2 (Matching Headings + Multiple Choice)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d36_3", type: "drill", title: "Ca 3: Task 1 Mixed 3 biểu đồ Overview đa chiều (ép 20p) + Task 2 Adv/Dis (ép 40p so với mẫu 7.5)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d36_4", type: "drill", title: "Ca 4: Part 3 — Should schools teach nutrition? + Lexical Resource check C1/C2", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  37: {
    title: "23/10 (T6) — Full Test Cam 19 T2 + Full Test Writing Health",
    summary: "Tổng ôn 4 chủ đề từ vựng. Full Listening Cam 19 T2. Full Reading Cam 19 T2. Full Writing Test (Mixed Graphs + Adv/Dis). Full Mock Speaking về Health.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d37_1", type: "vocab", title: "Ca 1: Tổng ôn 4 chủ đề + viết 200 từ 'bệnh mãn tính' — 1 đảo ngữ, 1 câu chẻ, 1 so...that, 1 due to, 1 rút gọn", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d37_2", type: "drill", title: "Ca 2: Full Listening Cam 19 T2 (4 sections, không tua) + Full Reading Cam 19 T2 (ghi điểm)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d37_3", type: "drill", title: "Ca 3: Full Writing 60p (Mixed Graphs + Adv/Dis Sugar Tax) + sửa lỗi theo YouPass", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d37_4", type: "drill", title: "Ca 4: Full Mock Speaking — P1 Health + P2 Describe a time you felt very tired + P3 Sleep importance", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  38: {
    title: "24/10 (T7) — Epidemics & Pandemics + Cam 19 T3 P3",
    summary: "Từ vựng Epidemics: outbreak, herd immunity, asymptomatic, contact tracing. Tổng hợp Cause-Effect + Đảo ngữ (15 câu viết lại). Cam 19 T3-S4 + P3. Mixed Graphs + Adv/Dis (sống thọ hơn).",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d38_1", type: "vocab", title: "Ca 1: Epidemics vocabulary + Tổng hợp Cause-Effect & đảo ngữ (15 câu) + phân tích giả định", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d38_2", type: "drill", title: "Ca 2: Cam 19 T3-S4 (Lecture lịch sử y học) + T3-P3 (bài khó nhất Cam 19)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d38_3", type: "drill", title: "Ca 3: Task 1 Mixed mới (ép 20p) + Task 2 Adv/Dis 'Sống thọ hơn' (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d38_4", type: "drill", title: "Ca 4: Part 3 — What lessons from COVID-19? + sửa lỗi giới từ die of/from", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  39: {
    title: "25/10 (CN) — Tổng Kết Tuần 4 + Làm Nóng Tuần 5",
    summary: "Super Review 4 chủ đề. Full Test Cam 19 T4-S3 làm nóng. Full Writing Test + đánh giá định kỳ. Thực hành tự do speaking cuối tuần. KPI tuần 4: Adv/Dis đúng cấu trúc, Cam 19 > 6.5.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d39_1", type: "vocab", title: "Ca 1: Super Review — 50 câu trắc nghiệm 4 chủ đề + 30 câu grammar tổng hợp", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d39_2", type: "drill", title: "Ca 2: Làm nóng Cam 19 T4-S3 + Đọc trước Cam 19 T4-P2 (chưa làm câu hỏi)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d39_3", type: "drill", title: "Ca 3: Full Test Writing 60p + Phân tích feedback + 5 điểm yếu cần cải thiện", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d39_4", type: "drill", title: "Ca 4: Thực hành tự do — nói về sở thích 5 phút không ngừng (không áp lực điểm số)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },

  // --- Tuần 5 Giai đoạn 2 (20-26/10): Economy + Mixed Conditionals ---
  40: {
    title: "26/10 (T2) — Economy: 25 Từ C1 + Câu Điều Kiện Hỗn Hợp (Mixed Cond P1) + Cam 19 T4",
    summary: "25 từ Economy C1: GDP, fiscal policy, trade deficit, recession, subsidy. Mixed Conditionals Loại 3+2 (quá khứ → hiện tại). Cam 19 T4-S3+S4 + P2. Line graph + Opinion về kinh tế.",
    focusSkill: "grammar",
    tasks: [
      { id: "p2_d40_1", type: "vocab", title: "Ca 1: 25 từ Economy C1 + Mixed Conditionals 3→2 (If I had invested... I would be...) — 10 bài", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d40_2", type: "drill", title: "Ca 2: Cam 19 T4-S3+S4 (Matching, highlight Mixed Cond trong transcript) + T4-P2 (TFNG + Matching)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d40_3", type: "drill", title: "Ca 3: Review Line Graph (ép 20p) + Task 2 Opinion Economy — GDP không phải chỉ số duy nhất (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d40_4", type: "drill", title: "Ca 4: Shadowing 'Spending money' + Is money the key to happiness? (Mixed Cond trong trả lời)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  41: {
    title: "27/10 (T3) — Personal Finance + Mixed Cond với could/might + Cam 19 T4 P3",
    summary: "20 từ Personal Finance: savings, mortgage, credit card, investment portfolio, bankruptcy. Mixed Cond với could/might/should thay cho would. Cam 19 T4-S4 + P3. Bar chart + Discuss.",
    focusSkill: "vocab",
    tasks: [
      { id: "p2_d41_1", type: "vocab", title: "Ca 1: 20 từ Finance + Mixed Cond với could/might/should (10 bài nâng cao)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d41_2", type: "drill", title: "Ca 2: Cam 19 T4-S4 (Note Completion) + T4-P3 (Matching Info + Multiple Choice)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d41_3", type: "drill", title: "Ca 3: Review Bar chart (ép 20p) + Task 2 Discuss 'Developed countries share wealth' (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d41_4", type: "drill", title: "Ca 4: Shadowing 'Taxes' + Do people pay too much tax? + sửa phát âm economic/international", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  42: {
    title: "28/10 (T4) — Thương Mại + Luyện Mixed Cond + Review Cam 19 T4",
    summary: "Ôn 50 từ Economy-Finance. Viết đoạn 180 từ về lạm phát. 20 câu bài tập Mixed Conditionals. Review Cam 19 T4 (1.2x). Pie chart + Problem/Solution về thất nghiệp giới trẻ.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d42_1", type: "vocab", title: "Ca 1: Tổng hợp 50 từ Economy + viết 180 từ về lạm phát + 20 câu Mixed Cond", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d42_2", type: "drill", title: "Ca 2: Review Cam 19 T4 S3+S4 (1.2x) + Review P2+P3 (highlight câu điều kiện)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d42_3", type: "drill", title: "Ca 3: Review Pie chart (ép 20p) + Task 2 P/S 'Thất nghiệp giới trẻ' (ép 40p)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d42_4", type: "drill", title: "Ca 4: Part 3 — /ʒ/ /ʃ/ âm khó + Why are some countries rich and others poor?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  43: {
    title: "29/10 (T5) — Full Test Tổng Hợp + Reading & Writing Marathon",
    summary: "Tổng ôn từ vựng 5 chủ đề. Full Reading (Cam 18 T1 hoặc 19 T4, ép 60p). Full Writing 60p liền mạch (Mixed Graphs + Opinion). Speaking về Money & Success.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d43_1", type: "vocab", title: "Ca 1: 40 câu trắc nghiệm 5 chủ đề + 5 câu viết dùng mỗi cấu trúc nâng cao một lần", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d43_2", type: "drill", title: "Ca 2: Full Reading Cam 19 T4 (ép 60p) + Phân tích lỗi sai", durationMinutes: 105, linkUrl: "/practice/reading-tfng" },
      { id: "p2_d43_3", type: "drill", title: "Ca 3: Full Writing 60p (Task 1 Mixed Graphs + Task 2 Opinion) + so sánh mẫu", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d43_4", type: "drill", title: "Ca 4: Shadowing 'Success and Money' + Is money the key to happiness? (không thiên vị)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  44: {
    title: "30/10 (T6) — Full Test Cam 19 T4 Listening + Full Writing",
    summary: "Full Listening Cam 19 T4. Full Writing 60p (Map + Discuss). Full Mock Speaking P1-P2-P3. Xác định Band điểm hiện tại. KPI: Listening Cam 19 > 6.5.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d44_1", type: "vocab", title: "Ca 1: Tổng ôn từ vựng + viết 250 từ 'Kinh tế tác động sức khỏe' + 30 câu grammar cuối", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p2_d44_2", type: "drill", title: "Ca 2: Full Listening Cam 19 T4 (40p, không tua) + phân tích lỗi sai sâu", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d44_3", type: "drill", title: "Ca 3: Full Writing 60p (Map + Discuss both views) + sửa Collocation", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d44_4", type: "drill", title: "Ca 4: Full Mock Speaking — P1 Shopping + P2 Describe a future goal + P3 Success & Ambition", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  45: {
    title: "31/10 (T7) — Ngày Khắc Phục Điểm Yếu",
    summary: "Dành riêng để vá lỗ hổng phát hiện trong 5 ngày vừa qua. Sửa lỗi grammar lặp lại. Luyện dạng Matching (Listening). Luyện dạng bài viết yếu nhất. Flashcard Speaking 20 câu.",
    focusSkill: "all",
    tasks: [
      { id: "p2_d45_1", type: "errorBank", title: "Ca 1: Grammar Error Hunting — viết lại 15 câu đơn thành câu phức (đảo ngữ/câu chẻ/rút gọn/Mixed Cond)", durationMinutes: 105, linkUrl: "/error-bank/drill" },
      { id: "p2_d45_2", type: "drill", title: "Ca 2: Luyện Matching (5 bài S3) + Multiple Choice (3 bài S3 từ Cam 15-16)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p2_d45_3", type: "drill", title: "Ca 3: Luyện dạng Writing yếu nhất (Map/Process hoặc Discuss — viết tăng tốc)", durationMinutes: 105, linkUrl: "/practice/writing-task2" },
      { id: "p2_d45_4", type: "drill", title: "Ca 4: Flashcard Speaking — 20 câu Part 3 (5 chủ đề), mỗi câu 5s chuẩn bị, 30s nói", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  46: {
    title: "1/11 (CN) — MOCK TEST TOÀN DIỆN NHƯ THI THẬT",
    summary: "Thi thử hoàn toàn như thi thật: Listening + Reading + Writing + Speaking theo lịch thi chuẩn. Tính điểm rough. Viết Báo cáo sau Mock: 3 lỗi chết người cần sửa ngay.",
    focusSkill: "all",
    isGatekeeper: true,
    gatekeeperDetails: {
      title: "Kiểm Định Giai Đoạn 2 — Mock Test Toàn Diện",
      minScorePercent: 70,
      description: "Đạt tối thiểu 70% để xác nhận đã hoàn thành Giai đoạn 2 và sẵn sàng bước vào Giai đoạn 3 (Bứt phá & Tăng tốc với Full Test mỗi ngày).",
      challengeQuestions: [
        {
          id: "gk2_q1",
          question: "Mixed Conditional (3+2): 'If I _____ the lottery, I _____ a billionaire now.'",
          options: ["A. had won / would be", "B. won / would be", "C. had won / am", "D. win / would have been"],
          correctIndex: 0,
          explanation: "Loại 3+2: If + had + V3 (giả định quá khứ) → would + V nguyên (kết quả hiện tại).",
        },
        {
          id: "gk2_q2",
          question: "Rút gọn mệnh đề: 'The man who is standing at the door is my teacher.' → ?",
          options: ["A. The man stood at the door is my teacher.", "B. The man standing at the door is my teacher.", "C. The man to stand at the door is my teacher.", "D. The man having stood at the door is my teacher."],
          correctIndex: 1,
          explanation: "Đại từ làm chủ ngữ, động từ chủ động → rút gọn thành V-ing.",
        },
        {
          id: "gk2_q3",
          question: "Câu chẻ nào ĐÚNG để nhấn mạnh 'education'?",
          options: ["A. It is education that is the key to success.", "B. It was education who is the key.", "C. It is the key that education success.", "D. Education is that the key."],
          correctIndex: 0,
          explanation: "It is + danh từ + that/who + phần còn lại của câu.",
        },
        {
          id: "gk2_q4",
          question: "Mệnh đề nhượng bộ nào KHÔNG đúng ngữ pháp?",
          options: ["A. Although it was raining, we went out.", "B. Despite the rain, we went out.", "C. Despite it was raining, we went out.", "D. Even though it rained, we went out."],
          correctIndex: 2,
          explanation: "'Despite' + N/V-ing, không dùng 'despite + mệnh đề đầy đủ'. Phải dùng 'Despite the fact that...' hoặc 'Although...'.",
        },
      ],
    },
    tasks: [
      { id: "p2_d46_1", type: "drill", title: "9:00-9:40: Listening — Cam 18 T2 hoặc đề YouPass mới (Full 4 sections)", durationMinutes: 40, linkUrl: "/practice/listening" },
      { id: "p2_d46_2", type: "drill", title: "9:40-10:40: Reading — Cam 18 T2 Full (60p chuẩn thi)", durationMinutes: 60, linkUrl: "/practice/reading-tfng" },
      { id: "p2_d46_3", type: "drill", title: "10:40-11:40: Writing — Task 1 + Task 2 (60p liền mạch, không nghỉ)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p2_d46_4", type: "drill", title: "13:00-14:30: Speaking Mock — Full P1+P2+P3 liền mạch, ghi âm + Tính điểm rough + Báo cáo sau Mock", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
};

// =============================================================================
// GIAI ĐOẠN 3: "BỨT PHÁ & TĂNG TỐC" (Tháng 10-12) — Ngày 47-180
// Tuần 1 tháng 10 (27/10-2/11): Urbanization & Government + Cụm danh từ phức hợp + Cam 16
// Tuần 2 (3/11-9/11): Globalization & Social Issues + V-ing/to V subject + Cam 15-16
// Tuần 3 (10-16/11): Crime, Justice & Ethics + Đảo ngữ Had/Should/Were + Cam 15
// Tuần 4+ (từ 17/11): Full Test mỗi ngày + Các chủ đề còn lại + Cam 15 đề lạ
// =============================================================================

const PHASE3_MILESTONES: Record<number, Partial<RoadmapDayNode>> = {
  47: {
    title: "2/11 (T2) — Urbanization: 25 Từ C1 + Cụm Danh Từ Phức Hợp + Cam 16 T1",
    summary: "25 từ Urbanization/Government C1: urban sprawl, gentrification, congestion, civic engagement. Cụm danh từ phức hợp làm chủ ngữ. Cam 16 T1-S3+S4 + P2. Full Test Writing #1. Part 3 Urban Life.",
    focusSkill: "grammar",
    tasks: [
      { id: "p3_d47_1", type: "vocab", title: "Ca 1: 25 từ Urbanization C1 + Cụm danh từ phức hợp làm chủ ngữ (10 bài chuyển đổi)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d47_2", type: "drill", title: "Ca 2: Cam 16 T1-S3+S4 (Multiple Choice, bắt distractors) + T1-P2 (Matching Headings + Summary)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d47_3", type: "drill", title: "Ca 3: FULL TEST #1 — 60p (Mixed Graphs + Discuss both views về Urbanization)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d47_4", type: "drill", title: "Ca 4: Shadowing 'Life in big cities' + Part 3 — Why do young people prefer cities? (cụm danh từ)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  48: {
    title: "3/11 (T3) — Law & Regulations + Error Hunting Grammar + Cam 16 T1 P3",
    summary: "20 từ Law & Regulations: enforcement, compliance, legal framework, transparency. Error Hunting — sửa lỗi mạo từ (articles). Cam 16 T1-S4 + P3. Full Test Writing #2 Map + P/S.",
    focusSkill: "grammar",
    tasks: [
      { id: "p3_d48_1", type: "vocab", title: "Ca 1: Law vocabulary + Error Hunting mạo từ a/an/the — 10 lỗi từ bài cũ", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d48_2", type: "drill", title: "Ca 2: Cam 16 T1-S4 (Note Completion) + T1-P3 (Matching Info + TFNG)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d48_3", type: "drill", title: "Ca 3: FULL TEST #2 — 60p (Map so sánh 2 bản đồ đô thị + P/S Ô nhiễm không khí)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d48_4", type: "drill", title: "Ca 4: Shadowing 'Traffic' + What are advantages of small town vs big city?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  49: {
    title: "4/11 (T4) — Infrastructure & Full Reading Cam 16 T2",
    summary: "Tổng hợp từ vựng Government-Urban-Law. Câu bị động trong Map/Process. Full Reading Cam 16 T2 (60p). Full Test Writing #3 Process + Adv/Dis. Speaking Part 2 về thành phố.",
    focusSkill: "reading",
    tasks: [
      { id: "p3_d49_1", type: "vocab", title: "Ca 1: Tổng hợp 50 từ Govt/Urban/Law + câu bị động phức tạp (tương lai, HTHT)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d49_2", type: "drill", title: "Ca 2: Full Reading Cam 16 T2 (3 passages, 60p chuẩn thi) + đối chiếu đáp án", durationMinutes: 105, linkUrl: "/practice/reading-tfng" },
      { id: "p3_d49_3", type: "drill", title: "Ca 3: FULL TEST #3 — 60p (Process xử lý rác thải + Adv/Dis sống đô thị)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d49_4", type: "drill", title: "Ca 4: Part 2 — Describe a city you want to visit (cụm danh từ phức hợp trong trả lời)", durationMinutes: 90, linkUrl: "/practice/speaking-p1-p2" },
    ],
  },
  50: {
    title: "5/11 (T5) — Full Test Cam 16 T1 Listening + Full Writing #4",
    summary: "Ôn bài mẫu 7.5+ (Discuss + P/S). Full Listening Cam 16 T1 (liền mạch, sức bền). Full Test Writing #4 (đề khó nhất YouPass). Full Mock Speaking P1+P2+P3.",
    focusSkill: "all",
    tasks: [
      { id: "p3_d50_1", type: "vocab", title: "Ca 1: 30 câu trắc nghiệm 6 chủ đề + đọc bài mẫu 7.5 (Discuss + P/S) — học 5 câu hay nhất", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d50_2", type: "drill", title: "Ca 2: Full Listening Cam 16 T1 (liền mạch, 2nd run) + phân tích lỗi chính tả điền từ", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d50_3", type: "drill", title: "Ca 3: FULL TEST #4 — 60p (đề khó nhất YouPass: Mixed Graphs + Discuss về kinh tế)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d50_4", type: "drill", title: "Ca 4: Full Mock Speaking — P1 Neighbourhood + P2 City change + P3 Migration & Urbanization", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  51: {
    title: "6/11 (T6) — Khắc Phục Kỹ Năng Yếu + Full Test #5",
    summary: "Khắc phục điểm yếu phát hiện trong tuần. Luyện Matching (Listening). Full Test Writing #5 (tăng tốc, Task 2 rút còn 35 phút). Part 3 xoay vòng 5 chủ đề.",
    focusSkill: "all",
    tasks: [
      { id: "p3_d51_1", type: "errorBank", title: "Ca 1: Viết lại 15 câu — đảo ngữ, câu chẻ, rút gọn, Mixed Cond (từ bài báo lấy câu)", durationMinutes: 105, linkUrl: "/error-bank/drill" },
      { id: "p3_d51_2", type: "drill", title: "Ca 2: Luyện 5 bài S3 dạng Matching liên tục (Cam 15-16) — nghe synonyms", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d51_3", type: "drill", title: "Ca 3: FULL TEST #5 — 55p (Task 1 ép 15p + Task 2 ép 35p) + sửa 250 từ đủ chưa?", durationMinutes: 55, linkUrl: "/practice/writing-task2" },
      { id: "p3_d51_4", type: "drill", title: "Ca 4: 10 câu Part 3 xoay vòng 5 chủ đề — 1 phút/câu, ghi âm kiểm tra Coherence", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  52: {
    title: "7/11 (T7) — Reading Tốc Độ + Full Test #6 + Tổng Kết Tuần 1",
    summary: "Học từ Social Issues (20 từ). Full Reading Cam 16 T3 (ép 50 phút). Full Test Writing #6 (Bar+Table + Opinion). Reading Phản Xạ: ép tốc độ. Báo cáo tiến độ tuần.",
    focusSkill: "reading",
    tasks: [
      { id: "p3_d52_1", type: "vocab", title: "Ca 1: 20 từ Social Issues (bất bình đẳng, đói nghèo, an sinh) + đọc báo The Guardian", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d52_2", type: "drill", title: "Ca 2: Full Reading Cam 16 T3 (ép 50p — rút 10p tạo áp lực) + kiểm tra điểm giảm không?", durationMinutes: 105, linkUrl: "/practice/reading-tfng" },
      { id: "p3_d52_3", type: "drill", title: "Ca 3: FULL TEST #6 — 60p (Bar+Table + Opinion) + tự cho điểm band descriptors", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d52_4", type: "drill", title: "Ca 4: 15 câu Quick Fire Part 3 (chuẩn bị 5s, nói 30s) — đếm lỗi 'um' / 'like'", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  53: {
    title: "8/11 (CN) — Globalization: 25 Từ C1 + V-ing/to V Chủ Ngữ + Cam 16 T3",
    summary: "25 từ Globalization C1: cultural homogenization, multinational corporations, brain drain, lingua franca. V-ing và to V làm chủ ngữ câu. Cam 16 T3-S3+S4 + P2. Full Test #7 Process + Discuss.",
    focusSkill: "vocab",
    tasks: [
      { id: "p3_d53_1", type: "vocab", title: "Ca 1: 25 từ Globalization C1 + V-ing/to V làm chủ ngữ (10 bài chuyển đổi)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d53_2", type: "drill", title: "Ca 2: Cam 16 T3-S3+S4 (Multiple Choice + Matching) + T3-P2 (Summary Completion + câu phức)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d53_3", type: "drill", title: "Ca 3: FULL TEST #7 — 60p (Process quy trình sản xuất toàn cầu + Discuss Globalization)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d53_4", type: "drill", title: "Ca 4: Shadowing 'International trade' + Is globalization making countries more similar or different?", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  54: {
    title: "9/11 (T2) — Social Inequality + Error Hunting Danh Từ + Cam 16 T3 P3",
    summary: "20 từ Social Inequality: income gap, social mobility, discrimination, marginalization. Error Hunting danh từ đếm/không đếm. Cam 16 T3-S4 + P3. Full Test #8 Line + Adv/Dis di cư.",
    focusSkill: "grammar",
    tasks: [
      { id: "p3_d54_1", type: "vocab", title: "Ca 1: Social Inequality vocabulary + Error Hunting danh từ đếm/không đếm (lấy lỗi từ bài cũ)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d54_2", type: "drill", title: "Ca 2: Cam 16 T3-S4 (Note Completion) + T3-P3 (Matching Info + TFNG)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d54_3", type: "drill", title: "Ca 3: FULL TEST #8 — 60p (Line Graph di cư + Adv/Dis sống làm việc nước ngoài)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d54_4", type: "drill", title: "Ca 4: Shadowing 'Moving to another country' + Challenges for migrants? + âm /ʃ/ /tʃ/", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  55: {
    title: "10/11 (T3) — Tổng Hợp Globalization + Full Listening Cam 16 T3 + Full Test #9",
    summary: "Ôn 50 từ Globalization + Social Issues. Full Listening Cam 16 T3. Full Test #9 Map + P/S thất nghiệp. Part 2 Social problem.",
    focusSkill: "all",
    tasks: [
      { id: "p3_d55_1", type: "vocab", title: "Ca 1: Tổng hợp 50 từ Globalization + Social Issues + viết 200 từ toàn cầu hóa & bất bình đẳng", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d55_2", type: "drill", title: "Ca 2: Full Listening Cam 16 T3 (liền mạch) + đọc 2 bài Cam 15 T1-P2+P3", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d55_3", type: "drill", title: "Ca 3: FULL TEST #9 — 60p (Map khu phố sau nhập cư + P/S Thất nghiệp giới trẻ)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d55_4", type: "drill", title: "Ca 4: Part 2 — Describe a social problem in your country + Part 3 mở rộng", durationMinutes: 90, linkUrl: "/practice/speaking-p1-p2" },
    ],
  },
  56: {
    title: "11/11 (T4) — Mock Full IELTS Test (Cam 15 T1) + Phân Tích Kết Quả",
    summary: "Thi thử hoàn toàn như thi thật với Cam 15 Test 1. Listening + Reading + Writing + Speaking liên tục. Tính điểm rough. Lập kế hoạch khắc phục.",
    focusSkill: "all",
    tasks: [
      { id: "p3_d56_1", type: "drill", title: "9:00-9:40: Full Listening Cam 15 T1 (mới, chưa làm)", durationMinutes: 40, linkUrl: "/practice/listening" },
      { id: "p3_d56_2", type: "drill", title: "9:40-10:40: Full Reading Cam 15 T1 (60p chuẩn thi)", durationMinutes: 60, linkUrl: "/practice/reading-tfng" },
      { id: "p3_d56_3", type: "drill", title: "10:40-11:40: Full Writing Cam 15 T1 (Task 1 + Task 2, 60p)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d56_4", type: "drill", title: "13:00-14:30: Full Speaking Mock + Tính điểm + Kế hoạch khắc phục 5 điểm yếu nhất", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  57: {
    title: "12/11 (T5) — Khắc Phục Sau Mock + Full Test #10",
    summary: "Khắc phục điểm yếu từ Mock hôm qua. Luyện Multiple Choice S3 (hay sai nhất). Full Test #10 Pie+Table + Discuss. 10 câu Part 3 nối tiếp.",
    focusSkill: "all",
    tasks: [
      { id: "p3_d57_1", type: "errorBank", title: "Ca 1: Grammar — 20 câu viết lại câu phức (đảo ngữ, câu chẻ, rút gọn, Mixed Cond) từ bài báo", durationMinutes: 105, linkUrl: "/error-bank/drill" },
      { id: "p3_d57_2", type: "drill", title: "Ca 2: Luyện 5 bài S3 Multiple Choice liên tục (Cam 15-16) — bắt bẫy distractors", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d57_3", type: "drill", title: "Ca 3: FULL TEST #10 — 60p (Pie+Table + Discuss cải cách tư pháp/kinh tế)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d57_4", type: "drill", title: "Ca 4: 10 câu Part 3 nối tiếp (Globalization + Social Issues) — ghi âm toàn bộ, kiểm tra Coherence", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  58: {
    title: "13/11 (T6) — Reading Tốc Độ 50p + Full Test #11",
    summary: "Từ Sustainable Development (20 từ). Full Reading Cam 15 T2 (ép 50p). Full Test #11 Mixed Graphs + Discuss. 15 câu Quick Fire Speaking.",
    focusSkill: "reading",
    tasks: [
      { id: "p3_d58_1", type: "vocab", title: "Ca 1: 20 từ Sustainable Development + đọc báo The Economist về globalization", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d58_2", type: "drill", title: "Ca 2: Full Reading Cam 15 T2 (ép 50p) + phân tích — điểm giảm nhiều chứng tỏ cần luyện Skimming", durationMinutes: 105, linkUrl: "/practice/reading-tfng" },
      { id: "p3_d58_3", type: "drill", title: "Ca 3: FULL TEST #11 — 60p (Mixed Line+Bar + Discuss both views bất kỳ)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d58_4", type: "drill", title: "Ca 4: 15 câu Quick Fire Part 3 (5s chuẩn bị, 30s nói) — đếm fillers", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  59: {
    title: "14/11 (T7) — Tổng Kết Tuần 2 + Full Test #12",
    summary: "50 câu trắc nghiệm tổng hợp Globalization + Social Issues. Full Test #12 (đề khó nhất). Tự cho điểm, so sánh tiến bộ. KPI: 6 bài Full Test, điểm trung bình 6.0-6.5.",
    focusSkill: "all",
    tasks: [
      { id: "p3_d59_1", type: "vocab", title: "Ca 1: 50 câu trắc nghiệm Globalization + Social Issues + viết đoạn 150 từ (3 cấu trúc nâng cao)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d59_2", type: "drill", title: "Ca 2: Full Listening Cam 15 T2 (toàn bộ) + phân tích điểm", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d59_3", type: "drill", title: "Ca 3: FULL TEST #12 — đề khó nhất YouPass + tự cho điểm band 6.5", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d59_4", type: "drill", title: "Ca 4: Free Talk — nói về sở thích tự nhiên (thư giãn cuối tuần, tự tin là chìa khóa)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },

  // --- Tuần 3+ (9/11 trở đi): Crime + các chủ đề nâng cao ---
  60: {
    title: "15/11 (CN) — Crime & Justice: 29 Từ C1 + Đảo Ngữ Had/Should/Were + Cam 15 T3",
    summary: "29 từ Crime & Justice C1: commit a crime, rehabilitation, recidivism, cybercrime, verdict. Đảo ngữ conditionals: Had/Should/Were. Cam 15 T3-S3+S4 + P2. Full Test #13 Bar + Opinion Crime.",
    focusSkill: "grammar",
    isGatekeeper: true,
    gatekeeperDetails: {
      title: "Kiểm Định Giai Đoạn 3 — Chất Lượng Full Test",
      minScorePercent: 70,
      description: "Tổng kết 2 tuần Giai đoạn 3: Viết 6 Full Test/tuần, Listening/Reading Cam 15-16 > 6.5, Cụm danh từ phức hợp và V-ing subject thành thạo.",
      challengeQuestions: [
        {
          id: "gk3_q1",
          question: "Đảo ngữ conditional nào thay thế cho 'If I had known the answer'?",
          options: ["A. Had I known the answer", "B. Should I know the answer", "C. Were I to know the answer", "D. If I would have known"],
          correctIndex: 0,
          explanation: "Điều kiện loại 3 đảo ngữ: Had + S + V3/Ved.",
        },
        {
          id: "gk3_q2",
          question: "Cụm danh từ phức hợp nào học thuật hơn?",
          options: ["A. Because the population grows rapidly", "B. The rapid growth of the urban population", "C. Population is growing fast", "D. Growing population rapidly"],
          correctIndex: 1,
          explanation: "Cụm danh từ phức hợp (adj + noun + prep phrase) tạo văn phong học thuật, trang trọng hơn.",
        },
        {
          id: "gk3_q3",
          question: "V-ing làm chủ ngữ nào ĐÚNG ngữ pháp?",
          options: ["A. To promote fair trade is essential.", "B. Promoting fair trade are essential.", "C. Promoting fair trade is essential.", "D. Promote fair trade is essential."],
          correctIndex: 2,
          explanation: "V-ing làm chủ ngữ là số ít → động từ chia số ít (is).",
        },
        {
          id: "gk3_q4",
          question: "Câu nào sử dụng Phân từ hoàn thành ĐÚNG?",
          options: ["A. Having finishing the report, he submitted it.", "B. Having finished the report, he submitted it.", "C. Having finish the report, he submitted it.", "D. Had finished the report, he submitted it."],
          correctIndex: 1,
          explanation: "Phân từ hoàn thành: Having + V3/Ved (hành động hoàn thành trước hành động chính).",
        },
      ],
    },
    tasks: [
      { id: "p3_d60_1", type: "vocab", title: "Ca 1: 29 từ Crime & Justice C1 + Đảo ngữ Had/Should/Were (10 bài chuyển đổi)", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d60_2", type: "drill", title: "Ca 2: Cam 15 T3-S3+S4 (Multiple Choice + Matching) + T3-P2 (Matching Headings)", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d60_3", type: "drill", title: "Ca 3: FULL TEST #13 — 60p (Bar về số vụ án + Opinion 'Longer sentences reduce crime?')", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d60_4", type: "drill", title: "Ca 4: Shadowing 'Why do people commit crimes?' + Part 3 (1 câu đảo ngữ conditional bắt buộc)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  90: {
    title: "Tuần 7 Giai Đoạn 3: Full Test Liên Tục + Chủ Đề Xã Hội Nâng Cao",
    summary: "Tiếp tục Full Test mỗi ngày (tất cả 4 dạng Task 2 xoay vòng). Luyện với Cam 15 Test 4 và đề YouPass. Từ vựng: Media, Advertising & Consumerism. Grammar: Cụm danh từ + Complex Noun Phrases.",
    focusSkill: "all",
    tasks: [
      { id: "p3_d90_1", type: "vocab", title: "Ca 1: Từ vựng Media & Advertising + Complex Noun Phrases nâng cao", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d90_2", type: "drill", title: "Ca 2: Full Listening Cam 15 T4 + Full Reading Cam 15 T4", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d90_3", type: "drill", title: "Ca 3: Full Test Writing 60p (xoay vòng 4 dạng Task 2) + phân tích feedback", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d90_4", type: "drill", title: "Ca 4: Full Mock Speaking (P1+P2+P3) — Media và Consumerism", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  120: {
    title: "Trạm Kiểm Soát Phase 2→3 (Tuần 12 Giai Đoạn 3): Mock Test Đặc Biệt",
    summary: "Thi thử đặc biệt với bộ đề chưa từng làm. Đánh giá tiến bộ tổng thể. Chuẩn bị cho tháng học cuối — luyện đề tăng cường và ép tốc độ tuyệt đối.",
    focusSkill: "all",
    isGatekeeper: true,
    gatekeeperDetails: {
      title: "Kiểm Định Tháng Thứ 4 — Full Band Estimation",
      minScorePercent: 75,
      description: "Đạt tối thiểu 75% để xác nhận đang tiến đúng hướng Band 7.5. Full Test với bộ đề chưa làm.",
      challengeQuestions: [
        {
          id: "gk4_q1",
          question: "Trong Matching Headings, lỗi phổ biến nhất là gì?",
          options: ["A. Chọn tiêu đề chứa Supporting Detail thay vì ý bao quát cả đoạn", "B. Đọc quá chậm", "C. Không tìm keyword", "D. Dịch từng từ"],
          correctIndex: 0,
          explanation: "Bẫy Supporting Detail: chọn tiêu đề khớp một chi tiết nhỏ thay vì ý chính của cả đoạn.",
        },
        {
          id: "gk4_q2",
          question: "Trong Writing Task 2, Collocation nào ĐÚNG?",
          options: ["A. make a decision", "B. do a decision", "C. take a decision (chỉ dùng trong British English)", "D. A và C đều đúng"],
          correctIndex: 3,
          explanation: "'Make a decision' (phổ biến) và 'take a decision' (British English) đều đúng. 'Do a decision' là SAI.",
        },
        {
          id: "gk4_q3",
          question: "Cấu trúc Overview chuẩn trong Task 1 phải có gì?",
          options: ["A. Số liệu chi tiết từng năm", "B. 2-3 xu hướng chính/điểm cực trị nổi bật, KHÔNG có số liệu", "C. Quan điểm cá nhân", "D. Dự đoán tương lai"],
          correctIndex: 1,
          explanation: "Overview: xu hướng tổng thể + cực trị. Tuyệt đối không điền số liệu vụn vặt.",
        },
        {
          id: "gk4_q4",
          question: "Để đạt Band 7.0+ Writing, tiêu chí nào QUAN TRỌNG nhất?",
          options: ["A. Task Achievement và Coherence & Cohesion (cả 2 đều quan trọng như nhau)", "B. Chỉ cần viết dài > 300 từ", "C. Chỉ cần không sai ngữ pháp", "D. Chỉ cần dùng nhiều từ C1/C2"],
          correctIndex: 0,
          explanation: "4 tiêu chí (TA, CC, LR, GRA) đều được tính bằng nhau. Tất cả phải ≥ 7.0 để đạt Band 7.0 overall.",
        },
      ],
    },
    tasks: [
      { id: "p3_d120_1", type: "drill", title: "Ca 1+2: Full Mock IELTS (Listening + Reading, 100 phút)", durationMinutes: 100, linkUrl: "/practice/listening" },
      { id: "p3_d120_2", type: "drill", title: "Ca 3: Full Writing 60p + Tự chấm band descriptors", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "p3_d120_3", type: "drill", title: "Ca 4: Full Speaking Mock + Tự đánh giá Band điểm hiện tại", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
      { id: "p3_d120_4", type: "errorBank", title: "Phân tích kết quả Mock + Viết Báo cáo tiến bộ", durationMinutes: 45, linkUrl: "/error-bank" },
    ],
  },
  150: {
    title: "Tuần 16 Giai Đoạn 3: Ép Tốc Độ + Luyện Đề Liên Tục",
    summary: "Giai đoạn ép tốc độ tuyệt đối — mỗi ngày 2 Full Test (Listening+Reading sáng, Writing chiều). Speaking: phản xạ tự nhiên không cần chuẩn bị. Từ vựng: ôn lại toàn bộ 5 chủ đề cốt lõi.",
    focusSkill: "all",
    tasks: [
      { id: "p3_d150_1", type: "vocab", title: "Ca 1: Tổng ôn 500 từ C1/C2 — 5 chủ đề cốt lõi + grammar tổng hợp siêu tốc", durationMinutes: 105, linkUrl: "/vocab" },
      { id: "p3_d150_2", type: "drill", title: "Ca 2: Full Listening + Reading (đề mới) ép đúng giờ thi thật", durationMinutes: 105, linkUrl: "/practice/listening" },
      { id: "p3_d150_3", type: "drill", title: "Ca 3: 2 Full Test Writing liên tục (Task 1: 15p, Task 2: 35p — dưới giờ thi thật)", durationMinutes: 100, linkUrl: "/practice/writing-task2" },
      { id: "p3_d150_4", type: "drill", title: "Ca 4: Speaking tự do — không cần chuẩn bị, phản xạ tự nhiên, 10 phút liên tục", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
    ],
  },
  165: {
    title: "Ngày 165 — VỀ ĐÍCH: Full Mock Exam & Đại Chung Kết Band 7.5+",
    summary: "Thi thử toàn diện 4 kỹ năng dưới áp lực phòng thi chuẩn quốc tế. Nhận chứng chỉ hoàn thành hành trình 165 ngày (5.5 tháng) chinh phục Band 7.5!",
    focusSkill: "all",
    isGatekeeper: true,
    gatekeeperDetails: {
      title: "Đại Chung Kết Band 7.5+ — Ngày Về Đích",
      minScorePercent: 75,
      description: "Hoàn tất hành trình 165 ngày từ Band 4.5 lên 7.5. Chứng minh bản thân đã sẵn sàng cho kỳ thi IELTS chính thức!",
      challengeQuestions: [
        {
          id: "final_q1",
          question: "Câu điều kiện hỗn hợp (2+3) nào ĐÚNG?",
          options: ["A. If I were smarter, I would have won the competition.", "B. If I were smarter, I would win the competition.", "C. If I had been smarter, I would win now.", "D. If I was smarter, I would have won."],
          correctIndex: 0,
          explanation: "Loại 2+3: If + V2 (giả định hiện tại) → would have + V3 (hậu quả quá khứ lẽ ra đã xảy ra).",
        },
        {
          id: "final_q2",
          question: "Chiến thuật tối ưu khi gặp câu hỏi True/False/Not Given là gì?",
          options: ["A. Đọc kỹ từng từ để tìm từ đồng nghĩa và phân biệt False (mâu thuẫn 180°) với Not Given (không đề cập)", "B. Tra từ điển mọi từ không biết", "C. Chọn True nếu thấy có từ giống đề bài", "D. Bỏ qua câu khó, chọn Not Given cho nhanh"],
          correctIndex: 0,
          explanation: "False = thông tin bài đọc MÂU THUẪN với câu hỏi. Not Given = bài đọc KHÔNG ĐỀ CẬP. Đây là điểm phân biệt quan trọng nhất.",
        },
        {
          id: "final_q3",
          question: "Để đạt Band 7.0+ Speaking, điều nào QUAN TRỌNG nhất?",
          options: ["A. Trả lời dài, mạch lạc, dùng từ vựng đa dạng và ít dừng lại", "B. Phát âm hoàn toàn giống người bản xứ", "C. Nói thật nhanh để tỏ ra thông thạo", "D. Tránh dùng từ đơn giản"],
          correctIndex: 0,
          explanation: "4 tiêu chí Speaking: Fluency (trôi chảy, ít ừm), Lexical Resource (từ vựng đa dạng), Grammar (đúng và đa dạng), Pronunciation (rõ ràng, không cần 100% như bản xứ).",
        },
        {
          id: "final_q4",
          question: "Trong 165 ngày, trụ cột nào là nền tảng không thể thiếu để đạt Band 7.5?",
          options: ["A. Cả 7 trụ cột ngữ pháp + từ vựng C1/C2 + luyện đề liên tục (thiếu bất kỳ trụ cột nào đều không đủ)", "B. Chỉ cần từ vựng C2 thật nhiều", "C. Chỉ cần luyện đề Cam 19 mỗi ngày", "D. Chỉ cần học ngữ pháp nâng cao"],
          correctIndex: 0,
          explanation: "Band 7.5 đòi hỏi sự kết hợp toàn diện: nền tảng ngữ pháp vững, từ vựng học thuật phong phú, và phản xạ làm bài qua luyện đề liên tục.",
        },
      ],
    },
    tasks: [
      { id: "final_1", type: "drill", title: "NGÀY VỀ ĐÍCH — Full Listening + Reading (100p, thi thật 100%)", durationMinutes: 100, linkUrl: "/practice/listening" },
      { id: "final_2", type: "drill", title: "NGÀY VỀ ĐÍCH — Full Writing Task 1 + Task 2 (60p, không dừng)", durationMinutes: 60, linkUrl: "/practice/writing-task2" },
      { id: "final_3", type: "drill", title: "NGÀY VỀ ĐÍCH — Full Speaking Mock (P1+P2+P3, tự quay video)", durationMinutes: 90, linkUrl: "/practice/speaking-p3" },
      { id: "final_4", type: "errorBank", title: "Tự chấm điểm + So sánh với Ngày 1 (Band 4.5) + Nhận Chứng Chỉ Hoàn Thành 7.5!", durationMinutes: 45, linkUrl: "/readiness-audit" },
    ],
  },
};

const ALL_MILESTONES: Record<number, Partial<RoadmapDayNode>> = {
  ...PHASE1_MILESTONES,
  ...PHASE2_MILESTONES,
  ...PHASE3_MILESTONES,
};

// Procedural generation for remaining days in each phase
function getProceduralDay(day: number, phase: PhaseNumber): Partial<RoadmapDayNode> {
  const cycle = day % 5;
  const phaseLabel =
    phase === 1 ? "Nền Tảng Ngữ Pháp" : phase === 2 ? "Tăng Tốc IELTS" : "Bứt Phá & Tăng Tốc";

  const skills: Array<RoadmapDayNode["focusSkill"]> = [
    "grammar", "vocab", "listening", "reading", "writing"
  ];
  const skillNames = ["Ngữ Pháp & Cú Pháp", "Từ Vựng C1/C2", "Listening & Dictation", "Reading & Paraphrase", "Writing Full Test"];
  const linkUrls = ["/practice/grammar", "/vocab", "/practice/listening", "/practice/reading-tfng", "/practice/writing-task2"];

  const idx = cycle;
  const skill = skills[idx];
  const skillName = skillNames[idx];
  const linkUrl = linkUrls[idx];

  const phaseSpecific = phase === 3
    ? `Luyện đề cường độ cao — Full Test mỗi ngày, xoay vòng 4 dạng Task 2, ép tốc độ sát giờ thi thật.`
    : phase === 2
      ? `Luyện đề theo Cam 17/18/19, từ vựng C1/C2 và cấu trúc ngữ pháp nâng cao.`
      : `Củng cố 7 trụ cột ngữ pháp, từ vựng cơ bản và kỹ năng nền tảng.`;

  const isSundayWeek6Plus = day >= 39 && day % 7 === 4;

  if (isSundayWeek6Plus) {
    return {
      title: `Ngày ${day} (Chủ Nhật): THI THỬ SỨC BỀN 2H40P LIÊN TỤC (ENDURANCE TEST)`,
      summary: `Rèn luyện sức chịu đựng não bộ (Cognitive Stamina) sát thực tế: Thi liên tục đúng 2 tiếng 40 phút không nghỉ (Listening 40p ➔ Reading 60p ➔ Writing 60p) + Phân tích lỗi sâu vào Sổ lỗi FSRS.`,
      focusSkill: "all",
      tasks: [
        { id: `auto_${day}_1`, type: "drill", title: `Ca Sáng (08:00 - 10:40 | 160m) — Full Test 3 Kỹ Năng Liên Tục (Listening 40p ➔ Reading 60p ➔ Writing 60p không nghỉ)`, durationMinutes: 160, linkUrl: "/mock-test" },
        { id: `auto_${day}_2`, type: "theory", title: `Ca Chiều 1 (13:15 - 15:00 | 105m) — Phân Tích Lỗi Sâu & Đồng Bộ FSRS Error Bank (Mổ xẻ bẫy trắc nghiệm & câu sai)`, durationMinutes: 105, linkUrl: "/error-bank" },
        { id: `auto_${day}_3`, type: "drill", title: `Ca Chiều 2 (16:15 - 18:00 | 105m) — Speaking Full Interview 1-1 với AI Examiner (Thực chiến Part 2 PPF & Part 3 AREA)`, durationMinutes: 105, linkUrl: "/grading/speaking" },
        { id: `auto_${day}_4`, type: "vocab", title: `Ca Tối (50m) — Thu hoạch 35 Passive Vocab & 10 Active Vocab vào FSRS Matrix`, durationMinutes: 50, linkUrl: "/vocab" },
      ],
    };
  }

  const writingTaskTitle =
    phase === 1
      ? `Ca 3 (105m) — Writing (Xả): Tháng 1 — Sentence Lab: Cấu trúc câu chuẩn S-V-O, Mệnh đề quan hệ & Liên từ tự nhiên`
      : phase === 2
      ? `Ca 3 (105m) — Writing (Xả): Tháng 2-3 — Paragraph Lab: Viết đoạn Overview Task 1 & Thân bài Task 2 chuẩn PEEL`
      : `Ca 3 (105m) — Writing (Xả): Tháng 4-5.5 — Full Essay Simulation: Bấm giờ nghiêm ngặt Task 1 (20p) & Task 2 (40p)`;

  return {
    title: `Ngày ${day}: Rèn Luyện 4 Kỹ Năng — Giai Đoạn ${phase} (${phaseLabel})`,
    summary: `Ngồi bàn 10h • Thực học 7h (4 ca x 105m) • 3h nghỉ ngơi phục hồi: ${phaseSpecific}`,
    focusSkill: "all",
    tasks: [
      { id: `auto_${day}_1`, type: "theory", title: `Ca 1 (105m) — Reading: [Học Kỹ Năng] Chiến Thuật 15p-20p-25p & Buông Bỏ 1.5p ➔ [Luyện Tập] Đọc Hiểu & Nạp 35 Passive Vocab`, durationMinutes: 105, linkUrl: "/theory/reading-methods", theoryUrl: "/theory/reading-methods", practiceUrl: "/practice/reading-split", skillBadge: "Học Kỹ Năng Trước" },
      { id: `auto_${day}_2`, type: "theory", title: `Ca 2 (105m) — Listening: [Học Kỹ Năng] 30s Đọc Đề & Bắt Signposts ➔ [Luyện Tập] Nghe Dictation & Keywords Mapping`, durationMinutes: 105, linkUrl: "/theory/listening-methods", theoryUrl: "/theory/listening-methods", practiceUrl: "/practice/dictation", skillBadge: "Học Kỹ Năng Trước" },
      { id: `auto_${day}_3`, type: "theory", title: writingTaskTitle, durationMinutes: 105, linkUrl: phase === 1 ? "/theory" : "/theory/writing-blueprints", theoryUrl: phase === 1 ? "/theory" : "/theory/writing-blueprints", practiceUrl: phase === 1 ? "/practice/sentence-writing" : "/practice/writing-task2", skillBadge: "Học Lý Thuyết Trước" },
      { id: `auto_${day}_4`, type: "theory", title: `Ca 4 (105m) — Speaking: [Học Kỹ Năng] Phản Xạ 1p Part 2 (PPF) & Part 3 (AREA) ➔ [Luyện Tập] Shadowing & Nhại Âm Bản Xứ`, durationMinutes: 105, linkUrl: "/theory/speaking-blueprints", theoryUrl: "/theory/speaking-blueprints", practiceUrl: "/practice/shadowing", skillBadge: "Học Chiến Lược Trước" },
    ],
  };
}

// Generates the full 165-day timeline (5.5 months)
export function generate165DaysRoadmap(): RoadmapDayNode[] {
  const nodes: RoadmapDayNode[] = [];

  for (let day = 1; day <= 165; day++) {
    // Phase mapping based on the actual plan:
    // Phase 1: Day 1-31 (19/9 - 19/10) — Lấp 12 thì, xóa dịch word-by-word, 800 từ nền tảng
    // Phase 2: Day 32-77 (19/10 - 3/12) — 14 dạng bài & 2.500 từ chuyên ngành Passage 3
    // Phase 3: Day 78-165 (4/12 - 1/3) — Luyện đề Cambridge 17-19 & Về đích 7.5
    let phase: PhaseNumber = 1;
    if (day > 77) phase = 3;
    else if (day > 31) phase = 2;

    const week = Math.ceil(day / 7);

    if (ALL_MILESTONES[day]) {
      const curated = ALL_MILESTONES[day];
      nodes.push({
        dayNumber: day,
        phase,
        week,
        title: curated.title || `Ngày ${day}: Rèn Luyện Toàn Diện`,
        summary: curated.summary || `Chương trình luyện tập cá nhân hóa ngày thứ ${day}.`,
        focusSkill: curated.focusSkill || "all",
        isGatekeeper: curated.isGatekeeper || false,
        gatekeeperDetails: curated.gatekeeperDetails,
        tasks: curated.tasks || [],
      });
    } else {
      const procedural = getProceduralDay(day, phase);
      nodes.push({
        dayNumber: day,
        phase,
        week,
        title: procedural.title!,
        summary: procedural.summary!,
        focusSkill: procedural.focusSkill!,
        isGatekeeper: false,
        tasks: procedural.tasks!,
      });
    }
  }

  return nodes;
}

export const MOCK_ROADMAP_165_DAYS: RoadmapDayNode[] = generate165DaysRoadmap();
export const generate180DaysRoadmap = generate165DaysRoadmap;
export const MOCK_ROADMAP_180_DAYS: RoadmapDayNode[] = MOCK_ROADMAP_165_DAYS;
