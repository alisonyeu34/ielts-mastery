"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Headphones,
  FileText,
  SplitSquareHorizontal,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Award,
  Layers,
  ArrowLeft,
  Volume2,
  BookmarkCheck,
  GitFork,
  Radio,
  PenTool,
  Mic,
  Activity,
  RotateCcw,
  Bug,
  Compass,
  Users,
  GraduationCap,
  Wand2,
  BookOpen,
  ShieldAlert,
  Swords,
  FileSearch,
  BatteryCharging,
  Tag,
  Brain,
  Target,
  ShieldCheck,
  Printer,
  Trophy,
} from "lucide-react";
import { usePracticeLogs } from "@/hooks/useIeltsDB";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { SentenceUpgraderModal } from "@/components/study-tools/SentenceUpgraderModal";
import { WeeklyCheatSheetModal } from "@/components/study-tools/WeeklyCheatSheetModal";
import { EmergencyLowEnergyModal } from "@/components/common/EmergencyLowEnergyModal";

const PRACTICE_MODES = [
  {
    id: "dictation",
    title: "Chép Chính Tả Từng Câu (Dictation Engine)",
    subtitle: "Luyện tai nghe tinh & Âm đuôi -s/ed",
    description: "Nghe câu ngắn tốc độ 0.8x - 1.0x, gõ lại và nhận diện lỗi sai từng từ qua thuật toán so khớp Diff Engine.",
    href: "/practice/dictation",
    icon: Headphones,
    color: "from-amber-500/20 via-card to-background",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    badgeText: "Trọng tâm Phase 1 (4.5 ➔ 5.5)",
    actionText: "Bắt đầu Chép chính tả ➔",
    highlight: "5 Câu ngắn chuẩn AWL",
    safeTarget: "Mức an toàn Lis 8.0: ≥ 85% đúng từ",
  },
  {
    id: "split_reading",
    title: "Luyện Đọc Hiểu 2 Cột (Split-view Reading)",
    subtitle: "14 Dạng bài Reading & Ma Trận Paraphrase",
    description: "Giao diện chia đôi màn hình: Đoạn văn đọc hiểu bên trái kèm công cụ highlight 4 màu, soi dẫn chứng tức thì và bóc tách ma trận Paraphrase 1-1.",
    href: "/practice/reading-split",
    icon: FileText,
    color: "from-rose-600/20 via-card to-background",
    badgeColor: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Phase 1 & 2 Focus",
    actionText: "Luyện Reading 2 Cột ➔",
    highlight: "The Biomimetic Revolution (13 Câu)",
    safeTarget: "Mức an toàn Read 8.5: ≥ 12/13 câu (≥ 92%)",
  },
  {
    id: "pronunciation",
    title: "Phòng Luyện Âm Điệu & Nhại Giọng (Shadowing Studio)",
    subtitle: "Luyện ngữ điệu, ngắt cụm & âm đuôi không cần bảng IPA",
    description: "Phương pháp bắt chước âm thanh trực tiếp: Nghe câu ngắn bản xứ, nhại lại nhịp điệu (Echo method), bật chuẩn âm đuôi (-s/-ed) và luyện ngắt cụm tư duy (Chunking).",
    href: "/practice/shadowing",
    icon: Volume2,
    color: "from-rose-600/20 via-card to-background",
    badgeColor: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Nền tảng Phase 1",
    actionText: "Luyện Âm Điệu Shadowing ➔",
    highlight: "Nhại giọng tự nhiên & 2 Âm đuôi cốt lõi",
    safeTarget: "Mức an toàn Speak 6.0: ≥ 50% nhịp điệu (An toàn)",
  },
  {
    id: "grammar",
    title: "Luyện Cấu Trúc Câu & Sửa Lỗi Ngữ Pháp",
    subtitle: "Sentence Builder & Spot-the-Error",
    description: "Ghép khối từ theo cú pháp học thuật (Câu phức, Bị động, Câu điều kiện) và tìm sửa lỗi sai câu kinh điển.",
    href: "/practice/grammar",
    icon: Layers,
    color: "from-red-600/20 via-card to-background",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
    badgeText: "Nền tảng Phase 1",
    actionText: "Luyện Cú Pháp Câu ➔",
    highlight: "5 Chủ đề ngữ pháp trọng điểm",
    safeTarget: "Mức an toàn: ≥ 80% câu chuẩn ngữ pháp",
  },
  {
    id: "sentence_writing",
    title: "Phòng Thực Hành Viết Câu Trọng Tâm",
    subtitle: "Daily Sentence Writing Lab & Live AI Feedback",
    description: "Thực hành viết từng câu thực chiến cho Ca 3 của 7 trụ cột ngữ pháp (HTĐ & QKĐ, Hiện tại hoàn thành, Bị động, So sánh, Mệnh đề quan hệ, Điều kiện) kèm kiểm tra ngữ pháp tự động.",
    href: "/practice/sentence-writing",
    icon: PenTool,
    color: "from-red-700/20 via-card to-background",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
    badgeText: "Nhiệm vụ Ca 3 Phase 1",
    actionText: "Thực Hành Viết Câu Ca 3 ➔",
    highlight: "6 Bài thực hành viết câu tương tác",
    safeTarget: "Mức an toàn Writing: Đạt Band 6.0 – 6.5",
  },
  {
    id: "sentence_clinic",
    title: "Phòng Chẩn Đoán & Sửa Câu (Sentence Clinic)",
    subtitle: "Grammar Bug Hunter & C1 Rewriter",
    description: "Săn 5 loại bọ ngữ pháp tử thần (Fragment, Comma Splice, Dangling Modifier, Parallelism, SVA) và viết lại câu chuẩn C1.",
    href: "/practice/sentence-clinic",
    icon: Bug,
    color: "from-rose-600/20 via-card to-background",
    badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Phase 1 & 2 Core Drill",
    actionText: "Phòng Sửa Câu Clinic ➔",
    highlight: "Săn bọ 3 bước & Cẩm nang 5 lỗi",
    safeTarget: "Mức an toàn: Sửa đúng ≥ 8/10 câu",
  },
  {
    id: "paraphrase",
    title: "Bản Đồ Từ Đồng Nghĩa & Kỹ Thuật Scanning",
    subtitle: "Paraphrase Mapping & 4 Bẫy Khảo Thí",
    description: "Nhận diện 4 cơ chế bẫy từ đồng nghĩa (Synonym, Word Class, Negation, Restatement) và bài tập quét nhanh dưới áp lực thời gian.",
    href: "/practice/paraphrase",
    icon: Sparkles,
    color: "from-purple-500/20 via-card to-background",
    badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    badgeText: "Phase 2 Focus (5.5 ➔ 6.5)",
    actionText: "Luyện Paraphrase Mapping ➔",
    highlight: "15+ Cặp từ học thuật Cambridge",
  },
  {
    id: "reading_tfng",
    title: "Chuyên Sâu True / False / Not Given",
    subtitle: "TFNG Decision Tree & 5 Bẫy Khảo Thí",
    description: "Cây quyết định 3 bước phân biệt FALSE vs NOT GIVEN, bóc tách bẫy lượng từ, so sánh giả định và neo dẫn chứng bài đọc.",
    href: "/practice/reading-tfng",
    icon: GitFork,
    color: "from-emerald-500/20 via-card to-background",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeText: "Phase 2 Mastery (5.5 ➔ 6.5)",
    actionText: "Luyện Dạng Bài TFNG ➔",
    highlight: "Cây quyết định 3 bước logic",
  },
  {
    id: "reading_headings",
    title: "Chuyên Sâu Matching Headings",
    subtitle: "Topic Sentence & Word-Match Traps",
    description: "Kéo thả gán tiêu đề La Mã (i - viii), nhận diện câu chủ đề mở đoạn và bóc tách bẫy quá hẹp (Too Narrow) vs quá rộng (Too Broad).",
    href: "/practice/reading-headings",
    icon: Layers,
    color: "from-red-600/20 via-card to-background",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
    badgeText: "Phase 2 Mastery (5.5 ➔ 6.5)",
    actionText: "Luyện Ghép Tiêu Đề ➔",
    highlight: "Kéo thả tiêu đề La Mã & Topic Sentences",
  },
  {
    id: "reading_completion",
    title: "Điền Tóm Tắt & Gán Nhãn Sơ Đồ",
    subtitle: "Summary Completion & Diagram Labelling",
    description: "Kỹ thuật dự đoán từ loại (POS), kiểm soát giới hạn số từ (Word Limit) và bắt lỗi danh từ số ít/số nhiều (-s/-es).",
    href: "/practice/reading-completion",
    icon: FileText,
    color: "from-teal-500/20 via-card to-background",
    badgeColor: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20",
    badgeText: "Phase 2 Mastery (5.5 ➔ 6.5)",
    actionText: "Luyện Điền Từ & Sơ Đồ ➔",
    highlight: "Sơ đồ SVG & Bộ đếm từ Real-time",
  },
  {
    id: "reading_passage3_studio",
    title: "Giải Mã Reading Passage 3 Trừu Tượng",
    subtitle: "Abstract Discourse, De-nesting & Author Stance",
    description: "Máy bóc tách câu phức lồng tầng (Sentence De-nesting), quang phổ 5 mức lập trường tác giả và xử lý trọn vẹn 14 câu hỏi C1/C2.",
    href: "/practice/reading-passage3",
    icon: BookOpen,
    color: "from-red-700/20 via-card to-background",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
    badgeText: "Phase 3 Mastery (6.5 ➔ 7.5+)",
    actionText: "Vào Passage 3 Studio ➔",
    highlight: "Bóc tách câu 3 tầng & Lập trường tác giả",
  },
  {
    id: "listening_s1_s2",
    title: "Listening Section 1 & 2 Bẫy Khảo Thí",
    subtitle: "Self-Correction & Map Labelling",
    description: "Làm chủ bẫy đánh vần tên riêng, bẫy số teen/ty, bẫy tự đính chính (Self-correction) và bản đồ tương tác (Map Labelling).",
    href: "/practice/listening-s1-s2",
    icon: Headphones,
    color: "from-amber-500/20 via-card to-background",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    badgeText: "Phase 2 Mastery (5.5 ➔ 6.5)",
    actionText: "Luyện Listening S1-S2 ➔",
    highlight: "Audio bản xứ & Bản đồ tương tác",
  },
  {
    id: "listening_s3_s4",
    title: "Listening Section 3 & 4 Chuyên Sâu",
    subtitle: "Group Consensus & Signpost Radar",
    description: "Bóc tách bẫy sự đồng thuận nhóm (Multiple Choice) và kỹ thuật bám sát ghi chú bài giảng phân cấp (Signposting Language).",
    href: "/practice/listening-s3-s4",
    icon: Radio,
    color: "from-rose-500/20 via-card to-background",
    badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Phase 2 Mastery (5.5 ➔ 6.5)",
    actionText: "Luyện Listening S3-S4 ➔",
    highlight: "Gạch bỏ nhiễu & Radar chuyển ý",
  },
  {
    id: "listening_split",
    title: "Luyện Nghe 2 Cột (Split-view Listening)",
    subtitle: "Interactive Synchronized Transcript & Audio Pinpointer",
    description: "Giao diện chia đôi màn hình: Trình phát audio chuyên dụng, transcript đồng bộ thời gian thực (Blind & Forensic Mode) và soi dẫn chứng âm thanh.",
    href: "/practice/listening-split",
    icon: Headphones,
    color: "from-amber-600/20 via-card to-background",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    badgeText: "Module 2B Core",
    actionText: "Luyện Listening 2 Cột ➔",
    highlight: "Campus Energy Project (10 Câu)",
  },
  {
    id: "listening_map",
    title: "Listening Section 2: Bản Đồ & Sơ Đồ Không Gian",
    subtitle: "Interactive Map Labelling & Forensic Path Tracer",
    description: "Bản đồ SVG tương tác, la bàn xoay góc nhìn (-90°/+90°), bẫy chuyển hướng phút chót và hoạt ảnh đường di chuyển người nói.",
    href: "/practice/listening-map",
    icon: Compass,
    color: "from-rose-500/20 via-card to-background",
    badgeColor: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Phase 2 Core Drill (5.5 ➔ 6.5)",
    actionText: "Luyện Bản Đồ Section 2 ➔",
    highlight: "SVG Interactive Map & Forensic Path",
  },
  {
    id: "listening_s3_consensus",
    title: "Listening Section 3: Bắt Bẫy Đồng Thuận Nhóm",
    subtitle: "Multi-Speaker Tracker & Consensus Flowchart",
    description: "Theo dấu 3 người nói, bóc tách bất đồng ngầm & nhượng bộ giả vờ, sơ đồ tiến trình 3 bước Đề xuất ➔ Bác bỏ ➔ Chốt hạ.",
    href: "/practice/listening-s3-consensus",
    icon: Users,
    color: "from-purple-600/20 via-card to-background",
    badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    badgeText: "Phase 2 Core Drill (5.5 ➔ 6.5)",
    actionText: "Luyện Đồng Thuận Section 3 ➔",
    highlight: "Theo dấu 3 Speakers & Sơ đồ Flowchart",
  },
  {
    id: "listening_s4_lecture",
    title: "Listening Section 4: Ghi Chú Bài Giảng Phân Cấp",
    subtitle: "Hierarchical Note Canvas & Signposting Radar",
    description: "Độc thoại học thuật 7 phút liên tục, bản đồ lộ trình bài giảng theo thời gian thực, bóc tách từ tín hiệu dẫn đường và bắt lỗi -s/-es.",
    href: "/practice/listening-s4",
    icon: GraduationCap,
    color: "from-red-600/20 via-card to-background",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
    badgeText: "Phase 2 & 3 Mastery (5.5 ➔ 7.5+)",
    actionText: "Luyện Bài Giảng Section 4 ➔",
    highlight: "Dàn ý phân cấp & Radar Signposting",
  },
  {
    id: "writing_task1",
    title: "Khung Soạn Thảo Writing Task 1",
    subtitle: "4-Paragraph Scaffolding & Key Features",
    description: "Cấu trúc 4 đoạn chuẩn, chọn lọc Key Features, bộ từ vựng xu hướng & so sánh và tự động bắt lỗi số liệu trong Overview.",
    href: "/practice/writing-task1",
    icon: PenTool,
    color: "from-red-700/20 via-card to-background",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
    badgeText: "Phase 2 Mastery (5.5 ➔ 6.5)",
    actionText: "Luyện Viết Task 1 ➔",
    highlight: "Trình dựng 4 đoạn & Kiểm soát Overview",
  },
  {
    id: "writing_task1_pm",
    title: "Task 1 Quy Trình (Process) & Bản Đồ (Map)",
    subtitle: "Process Pipeline & Map Mutation Slider",
    description: "Khắc phục nỗi sợ dạng phi số liệu: Thể bị động học thuật cho quy trình nhân tạo, thể chủ động cho vòng đời sinh học, và thanh trượt Before/After bắt trọn biến đổi đô thị.",
    href: "/practice/writing-task1-process-map",
    icon: Compass,
    color: "from-emerald-600/20 via-card to-background",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeText: "Phase 2 & 3 Non-Data Focus (7.5+ Target)",
    actionText: "Luyện Process & Map ➔",
    highlight: "Thanh trượt Before/After & Thước đo Bị động",
  },
  {
    id: "writing_task2",
    title: "Khung Dựng PEEL Writing Task 2",
    subtitle: "2-Sentence Intro & PEEL Body Scaffolding",
    description: "Phân tích đề (Prompt Deconstruction), viết Mở bài 2 câu chuẩn barem và dựng thân bài 4 khối P-E-E-L chặt chẽ.",
    href: "/practice/writing-task2",
    icon: Layers,
    color: "from-purple-600/20 via-card to-background",
    badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    badgeText: "Phase 2 Mastery (5.5 ➔ 6.5)",
    actionText: "Luyện Viết Task 2 ➔",
    highlight: "Khung dựng PEEL & Bộ soi Thesis",
  },
  {
    id: "writing_peel_studio",
    title: "Phòng Luyện Cấu Trúc PEEL & Luận Đề",
    subtitle: "Thesis Statement Guard & Causal Domino Tree",
    description: "Giải phẫu đề 3 bước, bảo vệ luận đề tránh lạc đề, xưởng 4 mắt xích PEEL và sơ đồ nhân quả chống nhảy cóc logic.",
    href: "/practice/writing-peel",
    icon: PenTool,
    color: "from-red-700/20 via-card to-background",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
    badgeText: "Phase 2 Focus (5.5 ➔ 6.5)",
    actionText: "Vào PEEL Studio ➔",
    highlight: "4 Mắt xích & Cây nhân quả Domino",
  },
  {
    id: "advanced_syntax_studio",
    title: "Cú Pháp Học Thuật Đỉnh Cao C1/C2",
    subtitle: "Nominalization, Inversion & Cleft Sentences",
    description: "Máy nén danh từ hóa, phòng luyện đảo ngữ trạng từ phủ định/câu điều kiện và câu chẻ nhấn mạnh đạt Band 8.0+ GRA & LR.",
    href: "/practice/advanced-syntax",
    icon: Wand2,
    color: "from-purple-600/20 via-card to-background",
    badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    badgeText: "Phase 3 Mastery (6.5 ➔ 7.5+)",
    actionText: "Luyện Cú Pháp C1/C2 ➔",
    highlight: "Danh từ hóa • Đảo ngữ • Câu chẻ",
  },
  {
    id: "writing_grader",
    title: "Phòng Chấm & Chữa Bài Writing AI",
    subtitle: "4 Tiêu Chí Cambridge & Nâng Cấp Câu C1/C2",
    description: "Bóc tách chi tiết TR - CC - LR - GRA, chỉ báo lỗi sai trực tiếp trên bài viết và nâng cấp câu văn lên chuẩn Band 8.0+.",
    href: "/practice/writing-grader",
    icon: Sparkles,
    color: "from-emerald-600/20 via-card to-background",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeText: "Module 3A Core",
    actionText: "Thẩm Định Bài Viết ➔",
    highlight: "Soi 4 tiêu chí & Nâng cấp 3 tầng",
  },
  {
    id: "speaking_p1_p2",
    title: "Speaking Part 1 & Part 2 Nâng Cao",
    subtitle: "Timeline Expander & 5 Senses Cue Card",
    description: "Khung mở rộng 3 mốc thời gian Past-Present-Future, đồng hồ chuẩn bị 1 phút và mô hình 5 giác quan / lâu đài trí nhớ.",
    href: "/practice/speaking-p1-p2",
    icon: Mic,
    color: "from-rose-600/20 via-card to-background",
    badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Phase 2 Mastery (5.5 ➔ 6.5)",
    actionText: "Luyện Speaking P1-P2 ➔",
    highlight: "Khung 3 thì & Dàn ý 60s 5 giác quan",
  },
  {
    id: "speaking_grader",
    title: "Phòng Chấm & Chữa Bài Speaking AI",
    subtitle: "4 Tiêu Chí Cambridge, WPM & Sóng Âm",
    description: "Bóc tách FC - LR - GRA - PR, phát hiện khoảng lặng ngập ngừng (>1.5s), đếm từ đệm và cung cấp bài nói mẫu Band 8.5+.",
    href: "/practice/speaking-grader",
    icon: Volume2,
    color: "from-amber-600/20 via-card to-background",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    badgeText: "Module 3B Core",
    actionText: "Thẩm Định Bài Nói ➔",
    highlight: "Bản đồ sóng âm & Câu mẫu C1",
  },
  {
    id: "shadowing",
    title: "Phòng Luyện Nói Shadowing Tương Tác",
    subtitle: "Dual Waveform & Rhythm Alignment",
    description: "Nhại giọng người bản xứ theo cụm nghĩa, đối chiếu dải sóng âm thời gian thực và đo độ tương đồng nhịp điệu & nối âm.",
    href: "/practice/shadowing",
    icon: Headphones,
    color: "from-emerald-600/20 via-card to-background",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeText: "Phase 1 & 2 Focus",
    actionText: "Phòng Luyện Shadowing ➔",
    highlight: "So sánh sóng âm kép & Chấm Rhythm Match",
  },
  {
    id: "speaking_p3",
    title: "Speaking Part 3: Tư Duy C1 & Ngữ Điệu",
    subtitle: "6 Perspectives & Academic Hedging",
    description: "6 lăng kính chủ thể xã hội, kỹ thuật rào đón học thuật (Academic Hedging) và bắt lỗi lên giọng cuối câu (Uptalk).",
    href: "/practice/speaking-p3",
    icon: Activity,
    color: "from-indigo-600/20 via-card to-background",
    badgeColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    badgeText: "Phase 3 Mastery (6.5 ➔ 7.5+)",
    actionText: "Luyện Speaking Part 3 ➔",
    highlight: "6 Lăng kính xã hội & Pitch Tracker",
  },
  {
    id: "writing_toulmin",
    title: "Lập Luận Toulmin & Phản Biện Task 2",
    subtitle: "Toulmin 6-Block & Counter-Rebuttal Arsenal",
    description: "Nâng cấp từ cấu trúc PEEL lên mô hình 6 khối Toulmin và 4 chiến thuật bẻ gãy luận điểm đối lập (Counter-argument & Rebuttal).",
    href: "/practice/writing-toulmin",
    icon: Zap,
    color: "from-amber-600/20 via-card to-background",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    badgeText: "Phase 3 Mastery (6.5 ➔ 7.5+)",
    actionText: "Luyện Lập Luận Toulmin ➔",
    highlight: "Khung 6 khối & 4 Đòn bẩy phản đòn",
  },
  {
    id: "syntax_transform",
    title: "Biến Đổi Cú Pháp C1/C2 Nâng Cao",
    subtitle: "Nominalization, Inversion & Cleft Sentences",
    description: "Nâng tầm văn phong học thuật: Danh từ hóa, Đảo ngữ phủ định/điều kiện và Câu chẻ nhấn mạnh trọng tâm.",
    href: "/practice/syntax-transform",
    icon: Layers,
    color: "from-red-600/20 via-card to-background",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
    badgeText: "Phase 3 Mastery (6.5 ➔ 7.5+)",
    actionText: "Luyện Cú Pháp C1/C2 ➔",
    highlight: "Danh từ hóa & Đảo ngữ chuẩn Band 8+",
  },
  {
    id: "reading_passage3",
    title: "Giải Mã Reading Passage 3 Trừu Tượng",
    subtitle: "Writer's Stance & Complex Syntax Decoding",
    description: "Bóc tách bài đọc trừu tượng 1000 từ, nhận diện thái độ/sắc thái tác giả (Writer's Stance) và mổ xẻ câu phức 3 tầng.",
    href: "/practice/reading-passage3",
    icon: FileText,
    color: "from-rose-600/20 via-card to-background",
    badgeColor: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Phase 3 Mastery (6.5 ➔ 7.5+)",
    actionText: "Luyện Passage 3 Nâng Cao ➔",
    highlight: "Lớp phủ thái độ & Mổ xẻ câu phức",
  },
  {
    id: "listening_s4_dense",
    title: "Listening Section 4 Mật Độ Cao",
    subtitle: "Shorthand Note-Taking & Dropoff Heatmap",
    description: "Chinh phục bài giảng không quãng nghỉ, làm chủ kỹ thuật tốc ký ký hiệu logic và khắc phục điểm rơi nhận thức.",
    href: "/practice/listening-s4",
    icon: Headphones,
    color: "from-purple-600/20 via-card to-background",
    badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    badgeText: "Phase 3 Mastery (6.5 ➔ 7.5+)",
    actionText: "Luyện Section 4 Tốc Ký ➔",
    highlight: "Bảng tốc ký & Bản đồ điểm rơi",
  },
  {
    id: "three_pass",
    title: "Phân Hệ '1 Đề Làm 3 Lần' (3-Pass Engine)",
    subtitle: "Timed Sprint ➔ Untimed Deep Dive ➔ Post-Mortem",
    description: "Chất lượng hơn số lượng: Vòng 1 Áp lực thời gian ➔ Vòng 2 Đào sâu không giới hạn ➔ Vòng 3 Mổ xẻ giải phẫu & Thu hoạch FSRS.",
    href: "/practice/three-pass",
    icon: RotateCcw,
    color: "from-emerald-600/20 via-card to-background",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeText: "Phase 3 Mastery (6.5 ➔ 7.5+)",
    actionText: "Luyện 3-Pass Method ➔",
    highlight: "So sánh Delta Score & Thu hoạch FSRS",
  },
  {
    id: "prompt_deconstruction",
    title: "Phẫu Thuật Luận Đề & Lạc Đề Ngầm Task 2",
    subtitle: "4-Component Dissector & Watertight Thesis Lock",
    description: "Bóc tách 4 thành phần vi cấu trúc đề bài, bắt bẫy từ hạn định phạm vi (only/solely) và thẩm định câu Luận đề đanh thép chuẩn Band 8.5+ TR.",
    href: "/practice/prompt-deconstruction",
    icon: FileSearch,
    color: "from-indigo-600/20 via-card to-background",
    badgeColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    badgeText: "Phase 3 Step 93 (Band 8.0 - 8.5+)",
    actionText: "Phẫu Thuật Đề Task 2 ➔",
    highlight: "4 Bút tô màu • Khóa Luận đề • Chống Ba phải",
  },
  {
    id: "adversarial_speaking",
    title: "Tác Chiến Giám Khảo Ngắt Lời Speaking Part 3",
    subtitle: "Tactical Interruption, VAD & Paradox Pivot",
    description: "Mô phỏng giám khảo ngắt lời chiến thuật giữa chừng, đo độ trễ phục hồi mạch nói (FRL ms) và xoay chuyển nghịch lý logic dưới 1.2s.",
    href: "/practice/adversarial-speaking",
    icon: Swords,
    color: "from-rose-600/20 via-card to-background",
    badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Phase 3 Step 94 (Band 8.0 - 8.5+)",
    actionText: "Vào Phòng Oral Combat ➔",
    highlight: "Đo độ trễ ms • Sóng âm Live • Khung Pivot 3s",
  },
  {
    id: "reverse_engineering",
    title: "Giải Phẫu Ngược Bẫy Khảo Thí Cambridge",
    subtitle: "Reverse Item Engineering & 4 Distractor Blueprints",
    description: "Đóng vai chuyên gia soạn đề Cambridge: Tạo 1 Key chuẩn và 3 Distractors bẫy sâu (Đảo cực tính, Đúng một nửa, Tuyệt đối hóa, Suy diễn).",
    href: "/practice/reverse-engineering",
    icon: Tag,
    color: "from-indigo-600/20 via-card to-background",
    badgeColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    badgeText: "Phase 3 Step 95 (Band 8.0 - 8.5+)",
    actionText: "Vào Xưởng Chế Tác Bẫy ➔",
    highlight: "Item Writer Sandbox • Đấu trường gán nhãn",
  },
  {
    id: "cognitive_stamina",
    title: "Đo Lường & Quản Trị Suy Giảm Nhận Thức 3 Giờ",
    subtitle: "3-Hour Stamina, Keystroke Dynamics & Micro-Reset",
    description: "Mô phỏng chuỗi 3 kỹ năng liên tục L-R-W, đo lường hệ số Brain Fog Factor (BFF) qua nhịp gõ phím và kích hoạt Box Breathing 30s.",
    href: "/practice/cognitive-stamina",
    icon: BatteryCharging,
    color: "from-rose-600/20 via-card to-background",
    badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    badgeText: "Phase 3 Step 96 (Band 8.0 - 8.5+)",
    actionText: "Vào Phòng Thi 3 Giờ ➔",
    highlight: "Đo độ trễ Keystroke • BFF Gauge • Box Breathing",
  },
  {
    id: "irt_calibration",
    title: "Định Cỡ Năng Lực Ẩn IRT 3 Tham Số & Dự Báo Band",
    subtitle: "Item Response Theory 3PL, Fisher Info & 95% CI",
    description: "Đo lường năng lực học thuật tiềm ẩn θ qua 3 tham số a, b, c, vẽ đường cong đặc trưng ICC và dự báo khoảng tin cậy 95% Band điểm IELTS.",
    href: "/practice/irt-calibration",
    icon: Brain,
    color: "from-indigo-600/20 via-card to-background",
    badgeColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    badgeText: "Phase 3 Step 97 (Band 7.5 - 8.5+)",
    actionText: "Vào Xưởng Khảo Thí IRT ➔",
    highlight: "3PL Logistic Engine • Đường cong ICC Canvas • 95% CI",
  },
  {
    id: "acoustic_chaos",
    title: "Giả Lập Nhiễu Loạn Giác Quan & Tạp Âm Phòng Thi",
    subtitle: "Web Audio Mixer, SNR 3-18dB & Noise Immunity Index",
    description: "Huấn luyện thính giác miễn dịch tạp âm: Bàn phím cơ, tiếng ho, quạt thông gió HVAC và xung kích giật mình dưới các ngưỡng SNR khắc nghiệt.",
    href: "/practice/acoustic-chaos",
    icon: Volume2,
    color: "from-sky-600/20 via-card to-background",
    badgeColor: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
    badgeText: "Phase 3 Step 98 (Band 7.5 - 8.5+)",
    actionText: "Vào Phòng Tác Chiến Tạp Âm ➔",
    highlight: "Rack 4 Kênh Audio • Tự động hạ bậc SNR • Radar Xung Kích",
  },
  {
    id: "readiness_audit",
    title: "Hợp Nhất 5 Module & Chứng Thực Band 7.5+",
    subtitle: "Unified Telemetry, CRI Pentagram & SHA-256 Seal",
    description: "Tổng hợp toàn bộ 5 vector năng lực học thuật, tính toán chỉ số Cambridge Readiness Index (CRI) và cấp con dấu số học Band 7.5 Verified.",
    href: "/readiness-audit",
    icon: Award,
    color: "from-emerald-600/20 via-card to-background",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeText: "Phase 3 Step 99 (Band 7.5+ Certified)",
    actionText: "Kiểm Định Sẵn Sàng CRI ➔",
    highlight: "Radar 5 Trục • Toa thuốc khắc phục • SHA-256 Seal",
  },
  {
    id: "exam_day_protocol",
    title: "Nghi Thức Phòng Thi Ngày 180 & Két Sắt Dữ Liệu",
    subtitle: "PWA Hardening, Multi-Accent Ear Warm-up & 1-Page Cheat Sheet",
    description: "Khởi động thính giác 3 phút, luyện thanh khớp khẩu hình, đồng hồ thở Box Breathing 4-4-4-4 và két sắt mã hóa AES-GCM 256-bit.",
    href: "/exam-day-protocol",
    icon: ShieldAlert,
    color: "from-amber-600/20 via-card to-background",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    badgeText: "Phase 3 Step 100 (Cột Mốc Về Đích)",
    actionText: "Kích Hoạt Nghi Thức Ngày 180 ➔",
    highlight: "Khởi động thính giác • Box Breathing • Két sắt .ieltsvault",
  },
];

export default function PracticeDashboardPage() {
  const { logs, isLoading } = usePracticeLogs(10);
  const [showUpgrader, setShowUpgrader] = useState<boolean>(false);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [showLowEnergy, setShowLowEnergy] = useState<boolean>(false);

  const totalSessions = logs.length;
  const avgAccuracy =
    totalSessions > 0
      ? Math.round(logs.reduce((acc, curr) => acc + (curr.accuracyPercentage ?? 0), 0) / totalSessions)
      : 0;
  const totalSeconds = logs.reduce((acc, curr) => acc + (curr.timeSpentSeconds ?? 0), 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
            <Zap className="h-4 w-4" /> Kỹ Năng Thực Hành
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phòng Luyện 4 Kỹ Năng IELTS (Nghe • Đọc • Viết • Nói)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Tổng hợp các dạng bài luyện tập bám sát đề thi Cambridge: Chép chính tả, Đọc hiểu chia đôi màn hình, Luyện âm điệu Shadowing (không cần học IPA) và Viết câu.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 shadow-sm self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trang Chủ
        </Link>
      </div>

      {/* Target Safety Zone Overview Banner */}
      <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/20 via-card to-rose-950/20 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-foreground">
                Hồ Sơ Mục Tiêu & Bảng Mức An Toàn Từng Kỹ Năng (Huyền Phạm)
              </h2>
              <span className="text-xs text-muted-foreground">
                Chiến lược thực chiến: Reading 8.5 & Listening 8.0 gánh điểm • Writing 6.5 & Speaking 6.0 mức an toàn ➔ Overall Band 7.5
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-black px-3 py-1 rounded-xl bg-primary/15 text-primary border border-primary/30 self-start sm:self-auto">
            TARGET OVERALL: BAND 7.5
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Reading */}
          <div className="p-3.5 rounded-2xl bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">📖 Reading</span>
              <span className="font-mono font-black text-primary text-sm">Band 8.5</span>
            </div>
            <div className="p-2 rounded-xl bg-secondary/40 font-mono text-[11px] text-muted-foreground space-y-0.5">
              <div>Mức an toàn: <strong className="text-foreground">≥ 37-38 / 40 câu</strong></div>
              <div>Độ chính xác: <strong className="text-emerald-600 dark:text-emerald-400">≥ 92%</strong></div>
            </div>
            <span className="text-[10px] text-muted-foreground block leading-tight">
              Giữ trọn Passage 1 & 2 (26/26 câu), P3 được phép sai 2-3 câu.
            </span>
          </div>

          {/* Listening */}
          <div className="p-3.5 rounded-2xl bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">🎧 Listening</span>
              <span className="font-mono font-black text-primary text-sm">Band 8.0</span>
            </div>
            <div className="p-2 rounded-xl bg-secondary/40 font-mono text-[11px] text-muted-foreground space-y-0.5">
              <div>Mức an toàn: <strong className="text-foreground">≥ 35-36 / 40 câu</strong></div>
              <div>Độ chính xác: <strong className="text-emerald-600 dark:text-emerald-400">≥ 88%</strong></div>
            </div>
            <span className="text-[10px] text-muted-foreground block leading-tight">
              Không sai Section 1 & 2 (20/20 câu), Sec 3 & 4 sai tối đa 4-5 câu.
            </span>
          </div>

          {/* Writing */}
          <div className="p-3.5 rounded-2xl bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">✍️ Writing</span>
              <span className="font-mono font-black text-primary text-sm">Band 6.5</span>
            </div>
            <div className="p-2 rounded-xl bg-secondary/40 font-mono text-[11px] text-muted-foreground space-y-0.5">
              <div>Mức an toàn: <strong className="text-foreground">≥ 6.0 - 6.5 điểm AI</strong></div>
              <div>Tỷ lệ câu đúng: <strong className="text-emerald-600 dark:text-emerald-400">≥ 70% error-free</strong></div>
            </div>
            <span className="text-[10px] text-muted-foreground block leading-tight">
              Đủ số từ (T1: 150+, T2: 250+), cấu trúc 4 đoạn, không lạc đề.
            </span>
          </div>

          {/* Speaking */}
          <div className="p-3.5 rounded-2xl bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">🎙️ Speaking</span>
              <span className="font-mono font-black text-primary text-sm">Band 6.0</span>
            </div>
            <div className="p-2 rounded-xl bg-secondary/40 font-mono text-[11px] text-muted-foreground space-y-0.5">
              <div>Mức an toàn Shadowing: <strong className="text-emerald-600 dark:text-emerald-400">≥ 50%</strong></div>
              <div>Ngưỡng an tâm: <strong className="text-foreground">48% - 65% là an toàn</strong></div>
            </div>
            <span className="text-[10px] text-muted-foreground block leading-tight">
              Rõ chữ, bật đuôi -s/-ed, ngắt cụm hợp lý, không cần ngữ điệu 90%+.
            </span>
          </div>
        </div>
      </div>

      {/* Feature 6 & 3 & 1: Accelerator Tools for Huyen Pham */}
      <div className="rounded-3xl border border-border bg-secondary/30 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-red-700 dark:text-red-400">
              Công Cụ Bứt Phá Mục Tiêu Band 7.5
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-500/15 text-red-600 dark:text-red-400">
              Độc Quyền
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Bí kíp A4 in được • Máy biến hình câu C1 • Chế độ cứu chuỗi bảo toàn phong độ.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          {/* Tool 1: Sentence Upgrader */}
          <button
            type="button"
            onClick={() => setShowUpgrader(true)}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-red-700/20 transition-all cursor-pointer"
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span>✍️ Máy Biến Hình Câu C1</span>
          </button>

          {/* Tool 2: Printable Cheat Sheet */}
          <button
            type="button"
            onClick={() => setShowCheatSheet(true)}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-red-600" />
            <span>📄 Tờ Bí Kíp A4 Tuần 1</span>
          </button>

          {/* Tool 3: Low Energy Mode */}
          <button
            type="button"
            onClick={() => setShowLowEnergy(true)}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            <span>🛡️ Cứu Chuỗi Mệt Mỏi</span>
          </button>
        </div>
      </div>

      {/* Analytics & Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1.5 shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground">Số Phiên Đã Luyện Tập</span>
          <div className="text-2xl font-extrabold text-foreground">
            {isLoading ? "..." : `${totalSessions} phiên`}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {totalSessions === 0 ? "Chưa luyện bài nào (Bắt đầu 19/9)" : "Ghi nhận bài làm thực tế"}
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1.5 shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground">Độ Chính Xác Trung Bình</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {isLoading ? "..." : totalSessions > 0 ? `${avgAccuracy}%` : "--%"}
          </div>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            {totalSessions > 0 ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Đạt chuẩn chuyển cấp Phase 1
              </>
            ) : (
              "Sẽ tính sau khi bạn làm bài đầu tiên"
            )}
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1.5 shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground">Tổng Thời Gian Luyện</span>
          <div className="text-2xl font-extrabold text-primary">
            {Math.round(totalSeconds / 60)} phút
          </div>
          <span className="text-[11px] text-muted-foreground">
            {totalSessions === 0 ? "Mục tiêu 3 - 4 giờ / ngày" : "Tính theo thời gian làm bài thực tế"}
          </span>
        </div>
      </div>

      {/* Core Practice Modes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            Các Dạng Bài Luyện Tập Trọng Tâm
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRACTICE_MODES.map((mode) => {
            const Icon = mode.icon;

            return (
              <div
                key={mode.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-[10px] font-bold px-2.5 py-0.5 rounded-md border", mode.badgeColor)}>
                      {mode.badgeText}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {mode.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-secondary/40 border border-border/60 text-xs text-muted-foreground">
                    🎯 <strong>Đặc sắc:</strong> {mode.highlight}
                  </div>

                  {"safeTarget" in mode && Boolean(mode.safeTarget) && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      <span>{mode.safeTarget as string}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-border/60">
                  <Link
                    href={mode.href}
                    className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 transition-all group-hover:scale-[1.02]"
                  >
                    <span>{mode.actionText}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Practice Logs Section */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-500" />
            Nhật Ký Luyện Tập Gần Đây ({logs.length})
          </h3>
          <span className="text-xs text-muted-foreground">Lưu trữ Offline-first</span>
        </div>

        {logs.length > 0 ? (
          <div className="space-y-2.5">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl border border-border/70 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white shrink-0",
                      log.type === "dictation" ? "bg-amber-600" : "bg-blue-600"
                    )}
                  >
                    {log.type === "dictation" ? <Headphones className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground capitalize">
                        {log.type === "dictation" ? "Chép chính tả" : "Split Reading"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">• ID: {log.materialId}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      Thời gian làm: {log.timeSpentSeconds}s • Ngày: {new Date(log.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {log.accuracyPercentage}% Chính xác
                    </span>
                    <div className="text-[10px] text-muted-foreground">Điểm số: {log.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-muted-foreground">
            Chưa có lượt làm bài nào. Hãy bấm "Bắt đầu Chép chính tả" để luyện câu đầu tiên!
          </div>
        )}
      </div>

      {/* Feature Modals */}
      <SentenceUpgraderModal
        isOpen={showUpgrader}
        onClose={() => setShowUpgrader(false)}
      />

      <WeeklyCheatSheetModal
        isOpen={showCheatSheet}
        onClose={() => setShowCheatSheet(false)}
      />

      <EmergencyLowEnergyModal
        isOpen={showLowEnergy}
        onClose={() => setShowLowEnergy(false)}
      />
    </div>
  );
}
