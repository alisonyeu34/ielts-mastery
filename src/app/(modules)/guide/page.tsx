"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Zap,
  PenTool,
  Brain,
  ShieldAlert,
  Bot,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Flame,
  Search,
  Layers,
  FileText,
  Volume2,
  Mic,
  Calendar,
  ChevronDown,
  ChevronRight,
  Smile,
  ShieldCheck,
  Star,
  Compass,
  Target,
  Download,
  Printer,
  Coffee,
  Utensils,
  Footprints,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GuideSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const SECTIONS: GuideSection[] = [
  { id: "quickstart", title: "1. Khởi Động Nhanh (Lịch 4 Ca)", icon: Clock, color: "text-amber-500" },
  { id: "safe-zones", title: "2. Mức An Toàn 4 Kỹ Năng (8.5R-8.0L-6.5W-6.0S)", icon: Target, color: "text-emerald-500" },
  { id: "modules", title: "3. Hướng Dẫn 6 Khu Vực Học", icon: Layers, color: "text-red-700 dark:text-red-400" },
  { id: "memory-note", title: "4. Cách Viết Ghi Nhớ & AI Sửa", icon: Sparkles, color: "text-rose-600" },
  { id: "tips", title: "5. Mẹo Nhớ Lâu & Học Nhàn", icon: Zap, color: "text-red-600" },
  { id: "persistence-features", title: "6. 8 Tính Năng Học Bền Bỉ & Cứu Chuỗi", icon: ShieldCheck, color: "text-red-600" },
  { id: "faq", title: "7. Câu Hỏi Thường Gặp (FAQ)", icon: HelpCircle, color: "text-rose-500" },
];

export default function UserGuidePage() {
  const [activeSection, setActiveSection] = useState<string>("quickstart");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPrintingAll, setIsPrintingAll] = useState<boolean>(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handlePrintPdf = () => {
    setIsPrintingAll(true);
    // Allow React to re-render all sections before opening the print preview dialog
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsPrintingAll(false);
      }, 500);
    }, 200);
  };

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto select-none guide-print-root">
      {/* Print Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm 12mm 15mm 12mm;
          }
          body {
            background: #ffffff !important;
            color: #0f172a !important;
            font-size: 11pt !important;
          }
          header, aside, nav, .no-print, [data-no-print="true"] {
            display: none !important;
          }
          .guide-print-root {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            space-y: 1.5rem !important;
          }
          .guide-print-root section {
            display: block !important;
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 2rem !important;
          }
          .border, .border-border, [class*="border-"] {
            border-color: #cbd5e1 !important;
          }
          .bg-card, .bg-secondary, [class*="bg-"] {
            background-color: transparent !important;
            box-shadow: none !important;
          }
          .text-muted-foreground {
            color: #475569 !important;
          }
          .text-foreground {
            color: #0f172a !important;
          }
          button {
            display: none !important;
          }
        }
      `}</style>

      {/* 1. Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/20 via-card to-rose-950/20 p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-bold font-mono">
            <BookOpen className="h-3.5 w-3.5" /> Sổ Tay Bỏ Túi • Dành Riêng Cho Huyền Phạm
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            Hướng Dẫn Sử Dụng Hệ Thống Học IELTS 165 Ngày (5.5 Tháng)
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Chào mừng bạn đến với không gian học tập cá nhân hóa của mình! Web được thiết kế theo đúng nguyên tắc:{" "}
            <strong className="text-foreground">Đơn giản • Dễ dùng • Học đến đâu nhớ chắc đến đó</strong>. 
            Lịch học chuẩn khoa học: <strong className="text-foreground">Ngồi bàn 10 tiếng • Thực học tập trung 7 tiếng • 3 tiếng nghỉ ngơi phục hồi</strong>. Mỗi ngày chia đều thành <strong className="text-foreground">4 ca bằng nhau (105 phút / ca = 1h45m)</strong> cho 4 kỹ năng Writing, Reading, Listening, Speaking.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
              <CheckCircle2 className="h-4 w-4" /> Xuất phát: Band 4.5
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 font-bold">
              <Star className="h-4 w-4 fill-primary" /> Mục tiêu Overall: Band 7.5
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-mono font-bold">
              <Target className="h-4 w-4" /> R: 8.5 • L: 8.0 • W: 6.5 • S: 6.0
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Calendar className="h-4 w-4" /> Bắt đầu: 14/9/2026
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-mono font-bold">
              <Clock className="h-4 w-4" /> 7h Thực Học (4 ca x 105m) • 10h Ngồi Bàn
            </div>
          </div>

          {/* Action: Download PDF handbook */}
          <div className="pt-3 border-t border-red-500/20 flex flex-wrap items-center gap-3 no-print">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold shadow-lg shadow-red-700/30 transition-all hover:scale-105 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Tải Xuống PDF Sổ Tay (In Bản A4)</span>
            </button>
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-border bg-card hover:bg-secondary/70 text-foreground text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-muted-foreground" />
              <span>In Ngay</span>
            </button>
            <span className="text-[11px] text-muted-foreground hidden sm:inline">
              💡 Mẹo: Chọn mục <strong>"Save as PDF"</strong> trong hộp thoại in để lưu tài liệu toàn diện về máy.
            </span>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-red-500/15 blur-3xl pointer-events-none no-print" />
      </div>

      {/* 2. Quick Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/80 scrollbar-none">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                isActive
                  ? "bg-red-700 text-white shadow-md shadow-red-700/25 scale-[1.02]"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-white" : sec.color)} />
              <span>{sec.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3. SECTION 1: QUICKSTART (LỊCH 4 CA HỌC) */}
      {(activeSection === "quickstart" || isPrintingAll || activeSection === "all") && (
        <section className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-border/80 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
                <Flame className="h-4 w-4" /> Lịch Học Thực Chiến Chuẩn Khoa Học
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Khung Thời Gian 4 Ca Đều Nhau (105 Phút / Kỹ Năng)
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                ⏱️ Thực Học: 7 Giờ (420 Phút)
              </span>
              <span className="font-bold text-muted-foreground bg-secondary/70 border border-border px-3 py-1.5 rounded-xl">
                🪑 Ngồi Bàn: 10 Giờ (Kèm 3h Nghỉ)
              </span>
            </div>
          </div>

          {/* Scientific Rationale Callout Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-card to-red-500/10 border border-amber-500/20 flex items-start gap-3.5 text-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20 mt-0.5">
              <Brain className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-black text-foreground">
                Nguyên Lý Vàng: "Nạp Trước - Xả Sau" (Comprehensible Input ➔ Output Generation)
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Ở trình độ xuất phát <strong>Band 4.5</strong>, vốn từ vựng học thuật và phản xạ ngữ pháp còn rất mỏng. Nếu bắt não bộ "vắt" ra chữ (Output - Writing) ngay đầu ngày sẽ gây ức chế thần kinh cao (High Cognitive Anxiety) và rất dễ bỏ cuộc.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Vì vậy, thời gian biểu được thiết kế chuẩn khoa học tiếp thu ngôn ngữ:
                <br />• <strong>Buổi sáng (08:00 – 12:00) — Giai đoạn NẠP (Input):</strong> Não bộ tỉnh táo nhất sau giấc ngủ đêm, dung nạp từ vựng Passage 3 qua <strong>Reading (Ca 1)</strong> và hấp thu âm thanh chuẩn bản xứ qua <strong>Listening (Ca 2)</strong>.
                <br />• <strong>Buổi chiều (13:15 – 18:00) — Giai đoạn XẢ (Output):</strong> Não bộ đã tích lũy đủ ngữ liệu, chuyển sang thực hành sản sinh: viết câu học thuật <strong>Writing (Ca 3)</strong> và nhại giọng, bật âm phản xạ <strong>Speaking (Ca 4)</strong>.
                <br />• <strong>Xen kẽ 3 tiếng nghỉ ngơi phục hồi:</strong> 30p nghỉ mắt sáng, 75p cơm trưa & ngủ trưa sâu, 75p thể dục chiều giúp bạn giữ vững phong độ suốt 165 ngày mà không lo kiệt sức.
              </p>
            </div>
          </div>

          {/* Educational Principle Callout Banner */}
          <div className="p-5 rounded-3xl bg-blue-500/[0.08] border border-blue-500/20 flex items-start gap-3.5 text-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20 mt-0.5">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-black text-foreground">
                Nguyên Tắc Sư Phạm Bất Di Bất Dịch: Dạy Kỹ Năng & Chiến Thuật TRƯỚC ➔ Luyện Tập Thực Chiến SAU
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Ở Band 4.5, tuyệt đối không được lao vào giải đề ngay khi chưa nắm phương pháp. Mỗi ca học trên hệ thống đều tuân thủ 2 bước chuẩn quốc tế:
                <br />• <strong>Bước 1 — Học Kỹ Năng / Chiến Thuật (30 – 40 phút đầu):</strong> Mở phân hệ Phương Pháp Luận để học bản chất dạng bài, vạch trần bẫy đề thi kinh điển (Over-inference, Self-correction, Directional Flip) và mổ xẻ câu hỏi mẫu điểm cao.
                <br />• <strong>Bước 2 — Luyện Tập Áp Dụng (60 – 75 phút sau):</strong> Sau khi đã hiểu phương pháp, mới bấm chuyển sang phòng thực hành để giải bài đọc, bài nghe, viết câu chuẩn ngữ pháp hoặc nhại giọng nói.
              </p>
            </div>
          </div>

          {/* 4 Shifts & 3 Rest Periods Grid (Nạp Trước - Xả Sau) */}
          <div className="space-y-4">
            {/* Ca 1: Reading (Nạp) */}
            <div className="rounded-2xl border border-blue-500/30 bg-card p-5 space-y-3 shadow-sm hover:border-blue-500/60 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
                  CA 1 • SÁNG: KỸ NĂNG ĐỌC (READING • NẠP TỪ VỰNG & CẤU TRÚC) • 105 PHÚT
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">08:00 – 09:45 (1h45m)</span>
              </div>
              <h3 className="text-base font-extrabold text-foreground">
                Học Kỹ Năng Skimming 90s & Scanning 2 Tầng Keywords ➔ Luyện Đọc 2 Cột Chuẩn Kỳ Thi
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Đầu ngày não bộ tỉnh táo nhất:
                <br />• <strong>Bước 1 (Học Kỹ Năng):</strong> Học phương pháp Skimming 90s nắm bản đồ tư duy, phân loại 2 tầng từ khóa: <em>Hard Keywords</em> (tên, số, năm) không đổi để định vị và <em>Soft Keywords</em> (động từ, tính từ) để bắt từ đồng nghĩa paraphrase.
                <br />• <strong>Bước 2 (Luyện Tập Áp Dụng):</strong> Mở giao diện <strong>Đọc Hiểu 2 Cột</strong>. Áp dụng kỷ luật thời gian cố định: <strong>Passage 1 (15 phút) ➔ Passage 2 (20 phút) ➔ Passage 3 (25 phút)</strong> và Quy tắc sống còn "Buông Bỏ" 1.5 phút.
              </p>
              <div className="pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-muted-foreground font-mono">Mục tiêu: Nắm vững phương pháp • Nạp 30-40 Passive Vocab</span>
                <div className="flex items-center gap-3">
                  <Link href="/theory/reading-methods/reading-foundation-skimming-scanning" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    📖 1. Học Kỹ Năng Reading ➔
                  </Link>
                  <Link href="/practice/reading-split" className="text-xs font-bold text-primary hover:underline">
                    🎯 2. Vào Luyện Đọc ➔
                  </Link>
                </div>
              </div>
            </div>

            {/* Rest Break 1 */}
            <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-dashed border-amber-500/30 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Coffee className="h-4 w-4 text-amber-500 shrink-0" />
                <span><strong>Khoảng Nghỉ Sáng 1 (30 phút • 09:45 – 10:15):</strong> Thư giãn mắt (nhìn xa 6m), uống 300ml nước ấm, thả lỏng vai gáy để não bộ chuyển giao thông tin vào bộ nhớ tạm.</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 shrink-0">Nghỉ 30p</span>
            </div>

            {/* Ca 2: Listening (Nạp) */}
            <div className="rounded-2xl border border-amber-500/30 bg-card p-5 space-y-3 shadow-sm hover:border-amber-500/60 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono">
                  CA 2 • TRƯA: KỸ NĂNG NGHE (LISTENING • NẠP ÂM THANH & TỪ DẪN ĐƯỜNG) • 105 PHÚT
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">10:15 – 12:00 (1h45m)</span>
              </div>
              <h3 className="text-base font-extrabold text-foreground">
                30 Phút Dictation (Section 1-2) + 75 Phút Keywords Mapping & Signposting Words (Section 3-4)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dictation rất tốt để bắt âm đuôi (-s/-ed) nhưng chưa đủ để kéo Listening lên 8.0 (cần đúng 35-36/40 câu). Do đó ca học được chia 2 nửa:
                <br />
                • <strong>30 phút đầu:</strong> Chép chính tả (Dictation Engine) để bắt âm đuôi, nối âm, số điện thoại, ngày tháng.
                <br />
                • <strong>75 phút còn lại:</strong> Rèn kỹ năng <strong>Keywords Mapping</strong> (quét đề, gạch chân từ khóa neo) và <strong>Signposting Words</strong> (nhận diện từ chuyển ý như <em>However, In contrast, Originally... but now, Turning to...</em>) để không bị trôi bài và hóa giải bẫy đổi hướng thông tin của Section 3 & 4.
              </p>
              <div className="pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-muted-foreground font-mono">Mục tiêu: Nắm chắc bẫy Self-correction • Bắt trọn 20 câu Section 1-2</span>
                <div className="flex items-center gap-3">
                  <Link href="/theory/listening-methods/listening-section1-self-correction" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    📖 1. Học Kỹ Năng Section 1 ➔
                  </Link>
                  <Link href="/practice/dictation" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
                    🎯 2. Vào Luyện Nghe ➔
                  </Link>
                </div>
              </div>
            </div>

            {/* Rest Break 2 (Lunch & Nap) */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-dashed border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Utensils className="h-4 w-4 text-emerald-500 shrink-0" />
                <span><strong>Khoảng Nghỉ Trưa & Tái Tạo Dopamine (75 phút • 12:00 – 13:15):</strong> Ăn trưa đầy đủ dinh dưỡng + Chợp mắt 25–35 phút (Power Nap). Giúp não bộ cố định dữ liệu nạp buổi sáng và nạp lại 100% năng lượng cho buổi chiều.</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 self-start sm:self-auto">Nghỉ 75p (Ăn + Ngủ)</span>
            </div>

            {/* Ca 3: Writing (Xả) */}
            <div className="rounded-2xl border border-red-500/30 bg-card p-5 space-y-3 shadow-sm hover:border-red-500/60 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20 font-mono">
                  CA 3 • ĐẦU CHIỀU: KỸ NĂNG VIẾT (WRITING • LỘ TRÌNH 3 GIAI ĐOẠN) • 105 PHÚT
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">13:15 – 15:00 (1h45m)</span>
              </div>
              <h3 className="text-base font-extrabold text-foreground">
                Lộ Trình Chuyển Tiếp 3 Giai Đoạn: Viết Câu ➔ Viết Đoạn PEEL/Overview ➔ Viết Bài Bấm Giờ
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Writing 6.5 không thể đạt được bằng cách ghép 10 câu đơn lẻ. Bạn được định hướng theo 3 giai đoạn rõ rệt:
                <br />
                • <strong>Tháng 1 (Phase 1):</strong> <em>Sentence Lab</em> — Luyện viết câu chuẩn ngữ pháp S-V-O, mệnh đề quan hệ (which/that/who), liên từ tương phản (Although/Whereas/Since). <strong>Tuyệt đối không lạm dụng đảo ngữ hay danh từ hóa cồng kềnh</strong> vì sẽ gây gãy cấu trúc và tụt điểm GRA.
                <br />
                • <strong>Tháng 2 – 3 (Phase 2):</strong> <em>Paragraph Lab</em> — Luyện viết từng đoạn đơn lẻ: đoạn Mở bài & Tổng quan (Overview) cho biểu đồ Task 1; viết đoạn Thân bài Task 2 theo cấu trúc chuẩn <strong>PEEL</strong> (Point - Explain - Example - Link).
                <br />
                • <strong>Tháng 4 – 5.5 (Phase 3):</strong> <em>Full Essay Simulation</em> — Viết hoàn chỉnh cả bài bấm giờ nghiêm ngặt: Task 1 đúng 20 phút (150-180 từ), Task 2 đúng 40 phút (250-280 từ).
              </p>
              <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-mono">Mục tiêu: Đạt 70% câu Error-free • Chấm AI bắt lỗi Collocation gượng</span>
                <Link href="/theory" className="text-xs font-bold text-red-700 dark:text-red-400 hover:underline">
                  Vào Luyện Viết Ca 3 ➔
                </Link>
              </div>
            </div>

            {/* Rest Break 3 (Exercise & Walk) */}
            <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-dashed border-indigo-500/30 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Footprints className="h-4 w-4 text-indigo-500 shrink-0" />
                <span><strong>Khoảng Nghỉ Chiều & Phục Hồi Thể Lực (75 phút • 15:00 – 16:15):</strong> Đi bộ ngoài trời, thể dục nhẹ nhàng, tắm rửa và ăn xế để cơ bắp thả lỏng và thanh quản sẵn sàng cho ca nói.</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">Nghỉ 75p</span>
            </div>

            {/* Ca 4: Speaking (Xả) */}
            <div className="rounded-2xl border border-purple-500/30 bg-card p-5 space-y-3 shadow-sm hover:border-purple-500/60 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-mono">
                  CA 4 • CUỐI CHIỀU: KỸ NĂNG NÓI (SPEAKING • NÓI KHÔNG VỚI IPA • 100% THỰC CHIẾN) • 105 PHÚT
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">16:15 – 18:00 (1h45m)</span>
              </div>
              <h3 className="text-base font-extrabold text-foreground">
                Luyện Âm Điệu Tự Nhiên (Shadowing Echo) • Chiến Thuật 1p Part 2 (PPF) • Phản Xạ Xã Hội Part 3 (Mô Hình A-R-E-A)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Phản xạ nói trôi chảy đến từ việc bắt chước âm thanh trực tiếp và đóng khung tư duy, <strong>hoàn toàn không cần học bảng ký tự phiên âm IPA hàn lâm</strong>:
                <br />
                • <strong>Nói KHÔNG với ký hiệu IPA:</strong> Học thuộc 44 ký hiệu IPA ép não bộ phải "dịch trung gian" 2 lần (Chữ ➔ Ký tự ngữ âm ➔ Miệng), gây khựng và nghẽn phản xạ. Bạn sẽ học theo <strong>Kỹ thuật Echo & Shadowing</strong>: Nghe câu ngắn từ audio bản xứ ➔ Để âm thanh vang trong đầu 1 giây ➔ Nhại lại ngay lập tức theo ngữ điệu, trọng âm và ngắt cụm ý (Thought Chunking).
                <br />
                • <strong>Làm chủ 2 âm đuôi sống còn (-s/-es & -ed) bằng quán tính cơ miệng:</strong> Luyện bật âm dứt khoát theo phản xạ cửa miệng (rung cổ họng / bật hơi gió) mà không cần tra từ điển phiên âm.
                <br />
                • <strong>Chiến thuật 1 phút Part 2:</strong> Chỉ ghi <strong>4 - 6 từ khóa (bullet points)</strong> theo công thức dòng thời gian <strong>PPF (Past - Present - Future)</strong> để nói đủ 1.5 - 2 phút không sợ cạn ý.
                <br />
                • <strong>Chiến thuật phản xạ Part 3 (Mô hình A-R-E-A):</strong> Luyện trả lời theo cấu trúc <em>Answer ➔ Reason ➔ Example ➔ Alternative</em>. <strong>Cấm dùng ví dụ cá nhân ("tôi, gia đình tôi")</strong>, bắt buộc dùng góc nhìn xã hội, cộng đồng khách quan.
              </p>
              <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-mono">Mục tiêu: Nhại nói tự nhiên • Part 1 (1-2-3) • Part 2 (PPF) • Part 3 (AREA)</span>
                <Link href="/practice/shadowing" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                  Vào Luyện Nói Ca 4 ➔
                </Link>
              </div>
            </div>

            {/* Endurance Test Protocol (Sunday Special) */}
            <div className="rounded-3xl border-2 border-dashed border-red-500/40 bg-gradient-to-r from-red-500/[0.08] via-card to-amber-500/[0.08] p-5 sm:p-6 space-y-3 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-black px-3 py-1 rounded-full bg-red-600 text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5" /> BÀI THI SỨC BỀN PHÒNG THI THẬT (ENDURANCE TEST)
                </span>
                <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400">
                  Cố định sáng Chủ Nhật từ Tuần thứ 6 trở đi
                </span>
              </div>
              <h3 className="text-base font-black text-foreground">
                Rèn Luyện Thể Lực Não Bộ: Full Test Liên Tục Đúng 2 Tiếng 40 Phút Không Nghỉ
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Chia 4 ca 105 phút trong tuần giúp não không kiệt sức khi học hàng ngày. Nhưng thi thật là cuộc chiến bào mòn thể lực: Bạn phải ngồi liên tục <strong>Listening (40p) ➔ Reading (60p) ➔ Writing (60p)</strong> mà không có bất kỳ khoảng nghỉ nào.
                <br />
                Do đó, từ <strong>Tuần 6 (18/10/2026)</strong>, mỗi sáng Chủ nhật sẽ dành trọn 2h40p bấm giờ nghiêm ngặt để não bộ rèn luyện sức bền nhận thức (Cognitive Stamina), triệt tiêu hoàn toàn hiện tượng quá tải não và "sập nguồn" khi bước vào Passage 3 của Reading hoặc Task 2 của Writing.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. SECTION 2: SAFE ZONES & TARGET BENCHMARKS */}
      {(activeSection === "safe-zones" || isPrintingAll || activeSection === "all") && (
        <section className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-border/80 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Target className="h-4 w-4" /> Bản Đồ Mức An Toàn 4 Kỹ Năng
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Chuẩn Đạt Mục Tiêu: Reading 8.5 • Listening 8.0 • Writing 6.5 • Speaking 6.0
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-primary/10 text-primary border border-primary/20 self-start sm:self-auto">
              Overall Target: Band 7.5
            </span>
          </div>

          {/* Strategy Callout */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-red-950/15 via-card to-emerald-950/15 border border-border space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h3 className="text-sm sm:text-base font-black text-foreground">
                Chiến Lược Phân Bổ Điểm: Tại Sao Cấu Hình Này Cực Kỳ Khả Thi & Thông Minh?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Điểm tổng IELTS tính theo trung bình cộng: <code className="text-foreground font-bold font-mono">(8.5 + 8.0 + 6.5 + 6.0) / 4 = 7.25</code> ➔ Theo quy chế làm tròn của Cambridge, <strong>7.25 sẽ tự động làm tròn lên Band 7.5!</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                <strong className="text-foreground block">🎯 2 Kỹ năng Receptive (Nghe 8.0 & Đọc 8.5) — MŨI NHỌN GÁNH ĐIỂM:</strong>
                <span className="text-muted-foreground leading-relaxed">
                  Là 2 bài thi trắc nghiệm có đáp án Đúng/Sai tuyệt đối 100%. Luyện đúng phương pháp có thể đạt điểm số tối đa một cách an toàn mà không phụ thuộc vào cảm tính của giám khảo.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                <strong className="text-foreground block">🛡️ 2 Kỹ năng Productive (Viết 6.5 & Nói 6.0) — MỨC AN TOÀN VỮNG CHẮC:</strong>
                <span className="text-muted-foreground leading-relaxed">
                  Không cần mạo hiểm dùng từ C2 hiếm gặp hay cố nhại giọng bản xứ 90%+. Chỉ cần đúng ngữ pháp, rõ ràng, mạch lạc, không nuốt âm là nắm chắc Band 6.0 - 6.5!
                </span>
              </div>
            </div>
          </div>

          {/* Detailed 4-Skill Safety Zone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. READING 8.5 */}
            <div className="rounded-3xl border border-rose-500/30 bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">📖</span>
                  <div>
                    <h3 className="text-base font-black text-foreground">Reading — Mục Tiêu Band 8.5</h3>
                    <span className="text-xs text-muted-foreground">Kỹ năng cốt lõi kéo điểm Overall</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
                  ≥ 92% Chính Xác
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-secondary/30 border border-border flex items-center justify-between font-mono">
                  <span className="font-bold text-foreground">Số câu an toàn cần đúng:</span>
                  <span className="text-sm font-black text-primary">≥ 37 – 38 / 40 câu</span>
                </div>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <div>• <strong>Mức sai số cho phép:</strong> Tối đa chỉ được sai từ <strong>2 đến 3 câu</strong> trong toàn bộ 3 bài đọc.</div>
                  
                  {/* Quản trị thời gian 15-20-25 & Buông bỏ */}
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1 text-foreground">
                    <strong className="block text-blue-700 dark:text-blue-300 font-bold">⏱️ Chiến Thuật Quản Trị Thời Gian 15p – 20p – 25p:</strong>
                    <span className="text-muted-foreground leading-relaxed">
                      Tuyệt đối không ép mình phải đúng 25-26/26 câu ở Passage 1 & 2! Ở Passage 2 thường có các dạng Matching Information rất khó. Nếu sa đà tìm bằng được, bạn sẽ cháy giờ và chỉ còn 10 phút cho Passage 3 dẫn đến vỡ trận. Hãy cố định: <strong>Passage 1 (15 phút) ➔ Passage 2 (20 phút) ➔ Passage 3 (25 phút)</strong>.
                      <br />
                      <strong className="text-amber-600 dark:text-amber-400">Quy tắc "Buông Bỏ" 1.5 phút:</strong> Một câu tìm quá 1.5 phút không ra manh mối, lập tức chọn phương án khả dĩ nhất, đánh dấu lại và đi tiếp!
                    </span>
                  </div>

                  {/* Active Vocab vs Passive Vocab */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                    <strong className="text-foreground block text-amber-700 dark:text-amber-400 font-bold">⚠️ Phân Tách Kho Từ Vựng Khoa Học Cho Mục Tiêu Reading 8.5:</strong>
                    <div className="space-y-1 text-muted-foreground leading-relaxed">
                      <div>• <strong>Active Vocab (Writing & Speaking):</strong> Giữ nguyên <strong>10 – 15 từ/ngày</strong>. Yêu cầu học sâu: nhớ chính tả, bấm nghe audio chuẩn từ điển (Oxford/Cam) và nhại lại trực tiếp (không cần học ký hiệu IPA), học trọn bộ collocations tự nhiên và tự đặt câu.</div>
                      <div>• <strong>Passive Vocab (Reading 8.5 & Listening):</strong> Nạp <strong>30 – 40 từ/ngày</strong> trực tiếp từ bài đọc Cambridge. Đọc hiểu không cần nhớ chính tả của từ chuyên ngành, chỉ cần <strong>nhìn mặt chữ hiểu nghĩa</strong> để lướt qua Passage 3. Sau 165 ngày sẽ nạp được ~5.000+ từ thụ động, đủ xử lý trọn vẹn cả 5 chủ đề Passage 3 kinh điển (Môi trường, Khảo cổ, Tâm lý học, AI/Công nghệ, Y sinh học).</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. LISTENING 8.0 */}
            <div className="rounded-3xl border border-amber-500/30 bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🎧</span>
                  <div>
                    <h3 className="text-base font-black text-foreground">Listening — Mục Tiêu Band 8.0</h3>
                    <span className="text-xs text-muted-foreground">Kỹ năng phản xạ tai nghe nhạy bén</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  ≥ 88% Chính Xác
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-secondary/30 border border-border flex items-center justify-between font-mono">
                  <span className="font-bold text-foreground">Số câu an toàn cần đúng:</span>
                  <span className="text-sm font-black text-amber-600 dark:text-amber-400">≥ 35 – 36 / 40 câu</span>
                </div>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <div>• <strong>Mức sai số cho phép:</strong> Tối đa chỉ được sai từ <strong>4 đến 5 câu</strong> trong cả bài nghe.</div>
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-1">
                    <strong className="text-foreground block font-bold">🎯 Chiến Thuật Vượt Bẫy Section 3 & Section 4:</strong>
                    <span>
                      Dictation (Chép chính tả) rất tốt để bắt âm đuôi (-s/-ed) ở Section 1-2, nhưng không đủ để kéo điểm lên 8.0. Nút thắt lớn nhất là Section 3 (hội thoại 3 người, bẫy trắc nghiệm dài) và Section 4 (bài giảng học thuật).
                      <br />
                      Vì vậy, <strong>75 phút sau của Ca 2</strong> bắt buộc phải luyện:
                      <br />
                      1. <strong>Keywords Mapping:</strong> Quét đề 30-45 giây trước khi băng chạy, khoanh tròn từ khóa neo và dự đoán ngữ cảnh để không bị trôi bài.
                      <br />
                      2. <strong>Signposting Words:</strong> Nhận diện từ dẫn đường chuyển ý (<em>However, In contrast, Originally... but now, What surprised me was...</em>) để tránh bẫy lật ngược đáp án.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. WRITING 6.5 */}
            <div className="rounded-3xl border border-red-500/30 bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">✍️</span>
                  <div>
                    <h3 className="text-base font-black text-foreground">Writing — Mục Tiêu Band 6.5</h3>
                    <span className="text-xs text-muted-foreground">Chiến thuật an toàn không mạo hiểm</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
                  Điểm AI ≥ 6.0 - 6.5
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-secondary/30 border border-border flex items-center justify-between font-mono">
                  <span className="font-bold text-foreground">Tiêu chí vượt ngưỡng Band 6.5:</span>
                  <span className="text-sm font-black text-primary">≥ 70% câu Error-free</span>
                </div>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  {/* Cảnh báo bẫy C1 */}
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 space-y-1 text-foreground">
                    <strong className="block text-rose-700 dark:text-rose-400 font-bold">⚠️ Bẫy Phản Tác Dụng Từ "Ép Dùng Đảo Ngữ & Danh Từ Hóa":</strong>
                    <span className="text-muted-foreground leading-relaxed">
                      Ở band 4.5, cố gượng ép dùng đảo ngữ (Inversion) hoặc nhồi nhét danh từ hóa (Nominalization) sẽ làm bài viết trở nên tối nghĩa, gãy cấu trúc và điểm GRA sẽ bị kéo tụt xuống 5.0 thay vì đạt 6.5!
                      <br />
                      <strong>Chỉ nâng cấp câu phức tự nhiên:</strong>
                      <br />• Mệnh đề quan hệ (<em>which, that, who</em>).
                      <br />• Liên từ tương phản, nguyên nhân (<em>Although, Whereas, Since, Therefore, However</em>).
                      <br />• Mệnh đề phân từ rút gọn dạng cơ bản (<em>V-ing, V-ed</em>).
                    </span>
                  </div>

                  {/* Lộ trình 3 giai đoạn */}
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-1">
                    <strong className="text-foreground block font-bold">📈 Lộ Trình 3 Giai Đoạn Của Ca Viết:</strong>
                    <span>
                      • <strong>Tháng 1 (Phase 1):</strong> Sentence Lab — Luyện viết câu chuẩn ngữ pháp S-V-O, liên từ tự nhiên, xóa lỗi chia thì và Vietlish.
                      <br />
                      • <strong>Tháng 2 – 3 (Phase 2):</strong> Paragraph Lab — Viết đoạn Overview Task 1 & Viết đoạn Thân bài Task 2 chuẩn PEEL (Point - Explain - Example - Link).
                      <br />
                      • <strong>Tháng 4 – 5.5 (Phase 3):</strong> Full Essay Simulation — Viết bài hoàn chỉnh bấm giờ Task 1 (20p) & Task 2 (40p).
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. SPEAKING 6.0 & CHIẾN THUẬT PHÒNG THI */}
            <div className="rounded-3xl border border-emerald-500/40 bg-card p-6 space-y-4 shadow-sm ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🎙️</span>
                  <div>
                    <h3 className="text-base font-black text-foreground">Speaking — Mục Tiêu Band 6.0</h3>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Giải tỏa nỗi sợ & Chiến thuật Part 2 - Part 3</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  Nhại Nói ≥ 50% là Đạt
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between font-mono">
                  <span className="font-bold text-foreground">Mức an toàn bài tập Shadowing:</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">48% – 65% là AN TOÀN!</span>
                </div>

                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  {/* NÓI KHÔNG VỚI BẢNG KÝ TỰ IPA */}
                  <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/25 space-y-1.5 text-foreground">
                    <strong className="block text-purple-700 dark:text-purple-300 font-bold">
                      🚫 Nói KHÔNG Với Ký Hiệu IPA Hàn Lâm — Thay Bằng 3 Trụ Cột Thực Chiến:
                    </strong>
                    <div className="space-y-1 text-muted-foreground leading-relaxed">
                      <div>
                        • <strong>Tại sao bỏ học ký hiệu IPA?</strong> Giám khảo IELTS KHÔNG chấm xem bạn có thuộc ký tự IPA hay không. Ép học 44 ký hiệu IPA khiến não bộ phải dịch trung gian 2 lần (Chữ ➔ Ký hiệu ➔ Miệng), gây khựng giật cục và sợ phát âm sai.
                      </div>
                      <div>
                        • <strong>Trụ cột 1: Echo & Shadowing (Bắt chước âm thanh trực tiếp):</strong> Nghe audio bản xứ (BBC / Cambridge) ➔ để âm vang trong đầu 1 giây ➔ nhại lại ngay lập tức ngữ điệu, trọng âm câu và cách ngắt cụm ý (Thought Chunking) mà không cần nhìn ký tự ngữ âm.
                      </div>
                      <div>
                        • <strong>Trụ cột 2: Tự động hóa 2 âm đuôi (-s/-es & -ed) bằng cơ miệng:</strong> Luyện quán tính bật âm dứt khoát theo cơ chế cơ học (rung cổ họng / bật hơi gió) thay vì tra bảng phiên âm.
                      </div>
                      <div>
                        • <strong>Trụ cột 3: Bộ khung tư duy 3 phần:</strong> Part 1 dùng Công thức 1-2-3 (Trả lời ➔ Lý do ➔ Chi tiết); Part 2 dùng Dòng thời gian PPF; Part 3 dùng cấu trúc A-R-E-A khách quan xã hội.
                      </div>
                    </div>
                  </div>

                  {/* Chiến thuật 1p Part 2 */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1 text-foreground">
                    <strong className="block text-amber-700 dark:text-amber-400 font-bold">💡 Chiến Thuật 1 Phút Part 2: Công Thức PPF (Chống Trắng Não):</strong>
                    <span className="text-muted-foreground leading-relaxed">
                      Khi gặp chủ đề lạ, thí sinh thường bị bí ý tưởng vì cố viết cả câu. Hãy chỉ ghi <strong>4 - 6 từ khóa (bullet points)</strong> theo dòng thời gian:
                      <br />• <strong>Past (Quá khứ):</strong> Khi nào, hoàn cảnh bắt đầu (<em>used to, originally</em>).
                      <br />• <strong>Present (Hiện tại):</strong> Thực tế hiện nay, cảm xúc cốt lõi (<em>currently, what stands out</em>).
                      <br />• <strong>Future (Tương lai):</strong> Kỳ vọng hoặc bài học rút ra (<em>in the years to come</em>).
                    </span>
                  </div>

                  {/* Phản xạ Part 3 */}
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-1 text-foreground">
                    <strong className="block text-sky-700 dark:text-sky-300 font-bold">🎯 Phản Xạ Part 3: Mô Hình A-R-E-A & Góc Nhìn Xã Hội Khách Quan:</strong>
                    <span className="text-muted-foreground leading-relaxed">
                      Giám khảo quyết định thí sinh đạt 6.0 hay bị chặn ở 5.0 - 5.5 phụ thuộc phần lớn vào Part 3.
                      <br />
                      • <strong>TUYỆT ĐỐI KHÔNG dùng ví dụ cá nhân ("tôi, gia đình tôi")</strong> mà phải dùng góc nhìn xã hội ("người trẻ ngày nay", "các đô thị lớn", "chính sách công").
                      <br />
                      • <strong>Trả lời theo cấu trúc A-R-E-A:</strong> <em>Answer (Trả lời trực tiếp) ➔ Reason (Nêu lý do sâu) ➔ Example (Ví dụ xã hội khách quan) ➔ Alternative (Giả định trường hợp ngược lại)</em>.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-secondary/30 border border-border space-y-1">
                    <strong className="text-foreground block">⚠️ Tại sao bạn dao động 43% - 45% mà không cần phải sợ hãi?</strong>
                    <span>
                      1. Máy đo độ trùng sóng âm tính cả thời gian bạn bấm micro, hít thở và bấm dừng. Việc lệch 1-2 giây làm điểm số trên máy chỉ ở mức 45% - 50%.<br />
                      2. Tiêu chí chính thức <strong>Pronunciation Band 6.0</strong> của Cambridge chỉ yêu cầu: <em>"Can generally be understood throughout"</em> (Người nghe hiểu được bạn nói gì, phát âm có thể chưa hoàn hảo nhưng không gây hiểu nhầm nghiêm trọng).
                    </span>
                  </div>

                  <div>• <strong>Chỉ cần 3 điều sau để nắm chắc Speaking 6.0:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li><strong>Bật rõ 2 âm đuôi sống còn (-s/-ed):</strong> Như đã luyện ở Ca 4, đừng nuốt âm đuôi khi chia động từ số ít hoặc quá khứ.</li>
                      <li><strong>Nói theo cụm tư duy (Chunking):</strong> Ngắt nghỉ đúng nhịp theo cụm 3-4 từ, không đọc từng từ một giật cục.</li>
                      <li><strong>Độ dài câu trả lời:</strong> Part 1 nói 2-3 câu (20-30s), Part 2 nói đủ 1.5 - 2 phút, không im lặng quá 3 giây.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. SECTION 3: 6 MODULES HƯỚNG DẪN CHI TIẾT */}
      {(activeSection === "modules" || isPrintingAll || activeSection === "all") && (
        <section className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
              <Layers className="h-4 w-4" /> Chi tiết tính năng
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              Cách Dùng Từng Khu Vực Trên Web (Cực Kỳ Đơn Giản)
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Mỗi module phụ trách một mắt xích giúp bạn nâng band điểm vững chắc:
            </p>
          </div>

          <div className="space-y-4">
            {/* Module 1 */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-700 dark:text-red-400 font-bold">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    1. Học Ngữ Pháp & Lý Thuyết (`/theory`)
                  </h3>
                  <span className="text-xs text-muted-foreground">Xây gốc chắc chắn cho 10 chuyên đề cốt lõi</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                <li>
                  <strong>Học 3 bước chuẩn khảo thí:</strong> Bước 1 (Bản chất học thuật & Quy tắc vàng) ➔ Bước 2 (Vạch trần bẫy khảo thí Cambridge) ➔ Bước 3 (Mổ xẻ câu hỏi mẫu Band 8.5+).
                </li>
                <li>
                  <strong>Bản dịch tiếng Việt dễ hiểu & Bóc tách từng từ:</strong> Toàn bộ trích đoạn bài đọc, audio và câu mẫu đều có bản dịch tiếng Việt trôi chảy kèm khối <em>"Bóc tách nghĩa từng từ"</em> (từ loại, phiên âm IPA, giải nghĩa) và nút <strong>1-Click [+ Lưu vào Từ Vựng]</strong> tự động nạp vào thuật toán ôn tập lặp ngắt quãng FSRS.
                </li>
                <li>
                  <strong>Nút lưu riêng biệt từng phần lý thuyết:</strong> Mỗi quy tắc vàng, mỗi bẫy khảo thí hay bí kíp đều có 1 nút bấm <code>[☆ Lưu Bẫy Này / Lưu Quy Tắc Này]</code> độc lập.
                </li>
                <li>
                  <strong>Tab Cá Nhân Cần Nhớ (`/theory/saved-notes`):</strong> Truy cập nhanh từ thanh điều hướng hoặc nút <code>[🔖 Sổ Cần Nhớ]</code> trên Header để xem lại toàn bộ các bẫy đề và mẹo thi đã đánh dấu, hỗ trợ lọc theo kỹ năng và tìm kiếm tức thì.
                </li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    2. Luyện 4 Kỹ Năng (`/practice`)
                  </h3>
                  <span className="text-xs text-muted-foreground">Phòng luyện tập chuyên sâu cho từng dạng bài thi</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                <li>
                  <strong>Chép chính tả (Dictation):</strong> Bấm nghe câu ➔ gõ lại ➔ hệ thống tô màu xanh chữ gõ đúng, màu đỏ chữ gõ sai và chỉ ra âm đuôi bạn bỏ sót (-s, -ed).
                </li>
                <li>
                  <strong>Đọc hiểu 2 cột (Split-view Reading):</strong> Đề bài bên trái, câu hỏi bên phải. Có sẵn 4 bút highlight để gạch chân từ khóa và bảng đối chiếu từ đồng nghĩa (Paraphrase).
                </li>
                <li>
                  <strong>Luyện âm điệu & Nhại giọng (Shadowing):</strong> Nghe câu ngắn bản xứ và nhại lại trực tiếp nhịp điệu, ngắt cụm và ngữ điệu tự nhiên mà không cần học bảng ký tự IPA hàn lâm.
                </li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-700 dark:text-red-400 font-bold">
                  <PenTool className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    3. Chấm Bài Viết & Nói Tự Động (`/grading`)
                  </h3>
                  <span className="text-xs text-muted-foreground">Chấm điểm chuẩn khảo thí British Council & IDP</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                <li>
                  <strong>Chấm Writing:</strong> Dán bài Task 1 hoặc Task 2. AI áp dụng rubric khắt khe chuẩn khảo thí: bắt lỗi tư duy dịch thô (Vietlish) & collocation gượng gạo, khóa trần điểm GRA 5.5 nếu còn lỗi cơ bản (chia thì, số ít/số nhiều, hòa hợp S-V). Gợi ý <em>nâng cấp câu phức tự nhiên</em> (Mệnh đề quan hệ, Although/Whereas, Phân từ rút gọn V-ing/V-ed) thay vì ép đảo ngữ gây gãy cấu trúc.
                </li>
                <li>
                  <strong>Chấm Speaking:</strong> Bấm thu âm trực tiếp với Giám khảo AI. Đo chính xác các khoảng lặng ngập ngừng do dịch nhẩm trong đầu (cắt trần Fluency 5.0 - 5.5), phạt nặng nếu dùng ví dụ cá nhân ở Part 3, hướng dẫn công thức phản xạ A-R-E-A và dòng thời gian PPF ở Part 2.
                </li>
              </ul>
            </div>

            {/* Module 4 */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 font-bold">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    4. Sổ Từ Vựng Phân Tầng Thông Minh FSRS (`/vocab`)
                  </h3>
                  <span className="text-xs text-muted-foreground">Kho 2.500 từ chuyên ngành Passage 3 & 570 từ AWL nền tảng</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                <li>
                  <strong>Phân tách Active Vocab vs Passive Vocab:</strong>
                  <br />• <em>Active Vocab (Writing & Speaking):</em> 10 – 15 từ/ngày, học thật sâu collocations, gia đình từ, đặt câu chuẩn.
                  <br />• <em>Passive Vocab (Reading 8.5 & Listening):</em> 30 – 40 từ/ngày trực tiếp từ các bài đọc Cambridge. Không cần nhớ cách viết chính tả, chỉ cần nhìn mặt chữ nhận diện nghĩa để lướt qua Passage 3.
                </li>
                <li>
                  <strong>Thuật toán FSRS v4:</strong> Bạn không cần nhớ hôm nay phải ôn từ nào. Hệ thống tự tính ngày từ đó sắp quên và đưa vào danh sách cần ôn tập ngắt quãng.
                </li>
                <li>
                  <strong>Cách đánh giá 4 mức độ:</strong> Xem từ ➔ lật mặt sau xem ngữ cảnh & phát âm ➔ chọn 1 trong 4 nút: <em>Quên (Again) • Khó (Hard) • Tốt (Good) • Dễ (Easy)</em>. Hệ thống sẽ tự động xếp lịch ôn tiếp theo.
                </li>
              </ul>
            </div>

            {/* Module 5 */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 font-bold">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    5. Sổ Tay Lỗi Sai FSRS (`/error-bank`)
                  </h3>
                  <span className="text-xs text-muted-foreground">Khắc phục thói quen tiếng mẹ đẻ qua chu kỳ lặp 3d - 7d - 21d</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                <li>
                  <strong>Tự động lưu lỗi:</strong> Mọi câu sai ở bài tập viết, bài đọc hoặc trắc nghiệm ngữ pháp đều tự động lưu vào đây kèm phân tích nguyên nhân vì sao sai.
                </li>
                <li>
                  <strong>Thuật toán FSRS lặp ngắt quãng (Không xóa vĩnh viễn vội vã):</strong> Ở band 4.5, làm đúng 2-3 lần liên tiếp trong ngày chỉ là do trí nhớ ngắn hạn. Hệ thống áp dụng chu kỳ lặp: <strong>Vòng 1 (sau 3 ngày) ➔ Vòng 2 (sau 7 ngày) ➔ Vòng 3 (sau 21 ngày)</strong>. Vượt qua cả 3 vòng thì lỗi đó mới chính thức chuyển thành "Phản xạ tiềm thức" và không bao giờ tái phạm!
                </li>
              </ul>
            </div>

            {/* Module 6 */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    6. Trợ Giảng & Luyện Nói AI (`/ai-coach`)
                  </h3>
                  <span className="text-xs text-muted-foreground">Phỏng vấn nói trực tiếp & Trợ giảng gợi mở tư duy</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                <li>
                  <strong>Phỏng vấn nói 1-1:</strong> Chọn tính cách giám khảo (Thân thiện hoặc Nghiêm khắc) ➔ bật mic nói chuyện như đang thi Speaking thật.
                </li>
                <li>
                  <strong>Trợ giảng gợi mở (Socratic):</strong> Khi bạn làm sai một câu Đọc hoặc Nghe, Trợ giảng sẽ đặt 2 câu hỏi gợi ý để bạn tự tìm ra bẫy, giúp bạn nhớ sâu gấp 5 lần so với việc đọc vẹt đáp án.
                </li>
                <li>
                  <strong>Đồng hồ đếm giờ thực tế:</strong> Tự động tích lũy thời gian bạn thực sự gõ phím, nghe audio, tra từ (nếu bạn rời máy quá 60 giây, đồng hồ sẽ tự dừng để số liệu hoàn toàn trung thực).
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 5. SECTION 3: CÁCH VIẾT GHI NHỚ TỰ DO & AI SỬA */}
      {(activeSection === "memory-note" || isPrintingAll || activeSection === "all") && (
        <section className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-500 uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Tính năng yêu thích của bạn
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              Cách Dùng Ô "Viết Lại Kiến Thức Tự Do & AI Kiểm Tra"
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Bạn yêu cầu tính năng này để viết lại theo cách hiểu của mình và kiểm tra xem có sai sót không. Dưới đây là cách sử dụng đạt hiệu quả cao nhất:
            </p>
          </div>

          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/[0.05] via-card to-card p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-xs">
                  1
                </div>
                <h4 className="text-sm font-bold text-foreground">Viết Tự Do Bằng Lời Của Bạn</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Không cần chép lại nguyên văn sách vở. Hãy viết ngắn gọn: thì này dùng khi nào, công thức ra sao, ví dụ bạn tự nghĩ ra là gì.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-xs">
                  2
                </div>
                <h4 className="text-sm font-bold text-foreground">Bấm "Kiểm Tra Ngay"</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hệ thống AI sẽ phân tích văn bản của bạn, đối chiếu với các ý cốt lõi của bài học trong tích tắc mà không làm phiền bạn.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-xs">
                  3
                </div>
                <h4 className="text-sm font-bold text-foreground">Xem Báo Cáo Nhận Xét</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  AI sẽ tích xanh những ý bạn nhớ đúng, và chỉ ra những ý quan trọng bạn còn quên hoặc bị nhầm lẫn để bạn bổ sung ngay.
                </p>
              </div>
            </div>

            {/* Example Box Demonstration */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border space-y-3">
              <span className="text-[11px] font-bold text-muted-foreground uppercase font-mono">
                Ví dụ thực tế khi học bài "Hiện tại đơn":
              </span>
              <div className="p-3 rounded-xl bg-secondary/60 text-xs font-mono text-foreground border border-border/60">
                <em>"Hiện tại đơn dùng cho thói quen hàng ngày hoặc chân lý sự thật. Câu khẳng định chủ ngữ số ít thì động từ thêm s hoặc es, số nhiều giữ nguyên. Câu hỏi mượn do hoặc does."</em>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <strong>Kết quả kiểm tra AI:</strong> Bạn đã nhớ đúng 3/3 ý cốt lõi (Bản chất thói quen, quy tắc chia động từ số ít, và trợ động từ Do/Does). Rất tốt, kiến thức đã được khắc sâu!
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. SECTION 4: MẸO HỌC NHÀN MÀ NHỚ LÂU */}
      {(activeSection === "tips" || isPrintingAll || activeSection === "all") && (
        <section className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider">
              <Zap className="h-4 w-4" /> Bí kíp đạt 7.5
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              4 Nguyên Tắc Vàng Giúp Bạn Học Nhàn & Không Bị Nản
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Phương pháp học đúng đắn sẽ giúp bạn tiết kiệm hàng trăm giờ mò mẫm:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <span className="text-xl">🎯</span>
              <h4 className="text-sm font-extrabold text-foreground">1. Phân Tách Active Vocab (10-15 từ) vs Passive Vocab (30-40 từ)</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                • <strong>Active Vocab (Writing & Speaking):</strong> Giữ nguyên <strong>10 – 15 từ/ngày</strong>. Yêu cầu nạp sâu: nhớ chính tả, bấm nghe audio chuẩn từ điển và nhại lại trực tiếp (không học vẹt ký hiệu IPA), học trọn bộ collocations và đặt câu.
                <br />
                • <strong>Passive Vocab (Reading 8.5 & Listening):</strong> Nạp <strong>30 – 40 từ/ngày</strong> trực tiếp từ bài đọc Cambridge. Không cần nhớ chính tả, chỉ cần nhìn mặt chữ nhận diện nghĩa đại cương để lướt qua Passage 3.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <span className="text-xl">🛡️</span>
              <h4 className="text-sm font-extrabold text-foreground">2. Sổ Lỗi Sai FSRS (3 Ngày – 7 Ngày – 21 Ngày)</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Không được gạch bỏ vĩnh viễn vội vã sau 2-3 lần làm đúng (vì chỉ là trí nhớ ngắn hạn)! Một câu sai được đưa vào chu kỳ FSRS: xuất hiện lại sau <strong>3 ngày, 7 ngày và 21 ngày</strong>. Vượt qua cả 3 vòng thì lỗi đó mới chính thức chuyển thành "Phản xạ tiềm thức" và không bao giờ tái phạm khi viết luận.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <span className="text-xl">📶</span>
              <h4 className="text-sm font-extrabold text-foreground">3. Minh Bạch: Chế Độ Offline vs Online AI Cloud</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                • <strong>Chế độ Offline (100% trong máy qua IndexedDB):</strong> Ôn thẻ từ vựng FSRS, đọc bài reading đã tải, làm trắc nghiệm ngữ pháp tĩnh, nghe audio đã cache mà không cần mạng.
                <br />
                • <strong>Chế độ Online (Cần Internet):</strong> Chấm bài AI Writing 4 tiêu chí, AI Examiner phỏng vấn Speaking 1-1, Speech-to-Text phân tích độ trôi chảy, Trợ giảng Socratic AI.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <span className="text-xl">🌙</span>
              <h4 className="text-sm font-extrabold text-foreground">4. Giữ Chuỗi Streak & Bài Thi Sức Bền Chủ Nhật</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hàng ngày duy trì tối thiểu <strong>10-15 phút</strong> (dùng nút <em>"Cứu Chuỗi"</em> nếu quá mệt) để ngọn lửa không tắt. Đặc biệt, từ <strong>Tuần 6 trở đi</strong>, cố định sáng Chủ nhật làm bài <strong>Full Test liên tục 2h40p không nghỉ</strong> để rèn thể lực phòng thi thật.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 6. SECTION 6: 8 TÍNH NĂNG HỌC BỀN BỈ & CỨU CHUỖI */}
      {(activeSection === "persistence-features" || isPrintingAll || activeSection === "all") && (
        <section className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> Vũ khí học bền bỉ & Chống nản
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              8 Tính Năng Học Bền Bỉ, Dễ Hiểu & Chạm Chuẩn An Toàn
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Được thiết kế riêng cho mục tiêu: <strong>8.5 Reading • 8.0 Listening • 6.5 Writing • 6.0 Speaking</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* 1. Low Energy Mode */}
            <div className="p-5 rounded-2xl border border-red-500/30 bg-card space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <h4 className="text-sm font-black text-foreground">
                  1. Chế Độ "Cứu Chuỗi Ngày Mệt Mỏi"
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Khi ốm, bận việc đột xuất hoặc kiệt sức: Bấm nút <strong>"Cứu Chuỗi"</strong> trên Header. Nhiệm vụ hôm đó rút gọn thành 1 bài 10-15 phút (ôn 10 thẻ từ vựng hoặc 1 câu Shadowing). Hoàn thành là ngọn lửa Streak được bảo toàn 100%!
              </p>
            </div>

            {/* 2. Micro-Wins */}
            <div className="p-5 rounded-2xl border border-red-500/30 bg-card space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <h4 className="text-sm font-black text-foreground">
                  2. Chiến Thắng Nhỏ & Lễ Tốt Nghiệp Phase 1
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Vinh danh từng cột mốc thực chiến: "Bậc Thầy Âm Đuôi", "Tai Thính Tuyệt Đối", "Chiến Thần Đọc Hiểu", và Lễ Chuyển Cấp Band 4.5 ➔ 5.5 vào ngày 11/10/2026 (sau 31 ngày lấp 12 thì, xóa phản xạ dịch word-by-word và nạp 800 từ nền tảng theo chuẩn sinh học não bộ).
              </p>
            </div>

            {/* 3. Printable Cheat Sheet */}
            <div className="p-5 rounded-2xl border border-red-500/30 bg-card space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📄</span>
                <h4 className="text-sm font-black text-foreground">
                  3. Tờ Bí Kíp Tóm Tắt A4 In Được Mỗi Tuần
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Tự động tổng hợp 10 công thức cốt lõi, 20 từ C1 hay gặp nhất và checklist 30 giây phòng chống bọ ngữ pháp. Bấm <strong>"In Trang A4 / Lưu PDF"</strong> để dán lên bàn học.
              </p>
            </div>

            {/* 4. Live Safe Zone Gauge */}
            <div className="p-5 rounded-2xl border border-red-500/30 bg-card space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                <h4 className="text-sm font-black text-foreground">
                  4. Thước Đo Vùng An Toàn Trực Tiếp
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Luôn hiển thị vạch mốc an toàn trong từng bài: Reading ≥ 12/13 câu, Listening ≥ 35/40, Writing ≥ 6.5 điểm, Speaking ≥ 50% nhịp điệu. Chạm vạch an toàn là hoàn toàn yên tâm.
              </p>
            </div>

            {/* 5. Recurring Error Radar */}
            <div className="p-5 rounded-2xl border border-red-500/30 bg-card space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <h4 className="text-sm font-black text-foreground">
                  5. Radar "Bắt Bệnh Ký Sinh" & Sổ Lỗi Sai FSRS (3d – 7d – 21d)
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Phát hiện các tật sai lặp lại (quên đuôi -ed, nuốt âm -s, sai mạo từ). Lỗi sai không bị xóa vội vã mà đưa vào chu kỳ lặp FSRS: kiểm tra lại sau 3 ngày, 7 ngày và 21 ngày để đảm bảo hình thành phản xạ tự nhiên.
              </p>
            </div>

            {/* 6. Natural Complex Sentence Upgrader */}
            <div className="p-5 rounded-2xl border border-red-500/30 bg-card space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">✍️</span>
                <h4 className="text-sm font-black text-foreground">
                  6. Máy Nâng Cấp Câu Phức Tự Nhiên (Natural Complex Upgrader)
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Gõ câu đơn giản ➔ Gợi ý nâng cấp thành câu phức tự nhiên: Mệnh đề quan hệ (<em>which, that, who</em>), Liên từ tương phản (<em>Although, Whereas, Since</em>), hoặc Phân từ rút gọn (<em>V-ing, V-ed</em>). Tránh bẫy đảo ngữ hay danh từ hóa cồng kềnh làm gãy cấu trúc.
              </p>
            </div>

            {/* 7. Side-by-Side Audio Comparator */}
            <div className="p-5 rounded-2xl border border-red-500/30 bg-card space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">👂</span>
                <h4 className="text-sm font-black text-foreground">
                  7. Nghe Đối Chiếu Âm Đôi (Mẫu ➔ Bạn)
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Trong phòng Shadowing: Bấm nút đối chiếu để máy phát 1 giây câu mẫu rồi phát ngay giọng của bạn. Tự động soi chuẩn âm đuôi (-s/-ed) mà không cần bận tâm ký hiệu IPA.
              </p>
            </div>

            {/* 8. Contextual Dictionary & Paraphrase */}
            <div className="p-5 rounded-2xl border border-red-500/30 bg-card space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <h4 className="text-sm font-black text-foreground">
                  8. Từ Điển Ngữ Cảnh & Bóc Tách Paraphrase
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Bôi đen bất kỳ từ vựng nào trong bài Đọc 2 cột: Bật tooltip hiện nghĩa chuẩn ngữ cảnh + cặp từ đồng nghĩa bẫy Cambridge + 1 click lưu vào Sổ Từ Vựng FSRS.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 7. SECTION 7: CÂU HỎI THƯỜNG GẶP (FAQ) */}
      {(activeSection === "faq" || isPrintingAll || activeSection === "all") && (
        <section className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-500 uppercase tracking-wider">
              <HelpCircle className="h-4 w-4" /> Giải đáp thắc mắc
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              Những Câu Hỏi Thường Gặp Khi Mới Bắt Đầu
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Bấm vào câu hỏi để xem câu trả lời nhanh:
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Tôi nên bắt đầu từ bài nào trong ngày đầu tiên (14/9/2026)?",
                a: "Theo đúng quy luật 'Nạp trước - Xả sau', hãy bắt đầu từ Ca 1: Vào mục 'Luyện Đọc Hiểu 2 Cột' (Reading Split-View), chọn bài đầu tiên 'The Biomimetic Revolution'. Đọc văn bản, áp dụng quản trị thời gian 15-20-25p, nạp 35 từ Passive Vocab vào Sổ FSRS. Sau đó nghỉ 30 phút rồi chuyển sang Ca 2 Listening!",
              },
              {
                q: "Mục tiêu Reading 8.5 đòi hỏi bao nhiêu từ vựng, và phân biệt Active vs Passive Vocab ra sao?",
                a: "Bộ 570 từ AWL chỉ đủ làm nền móng 5.5 - 6.0. Để đạt Reading 8.5 (đúng 37-38/40 câu), bạn cần mở rộng thêm 2.000 – 2.500 thuật ngữ Passage 3. Cách học khoa học: Phân tách rõ Active Vocab (10-15 từ/ngày cho Viết & Nói, học kỹ collocations) và Passive Vocab (30-40 từ/ngày từ bài đọc Cambridge, chỉ cần nhìn mặt chữ nhận diện nghĩa đại cương, không cần nhớ chính tả). Sau 165 ngày bạn sẽ có hơn 5.000 từ thụ động, đủ tự tin càn quét cả Passage 3.",
              },
              {
                q: "Tại sao không nên ép dùng Đảo ngữ (Inversion) hay Danh từ hóa cồng kềnh trong bài Viết?",
                a: "Ở trình độ Band 4.5, nếu cố gượng ép dùng đảo ngữ hoặc nhồi nhét cụm danh từ dài ngoằng, bài viết sẽ trở nên tối nghĩa, cấu trúc gãy vụn và điểm Ngữ pháp (GRA) sẽ bị giám khảo kéo tụt xuống 5.0 thay vì đạt 6.5! Với mục tiêu Writing 6.5, hãy tập trung viết câu phức tự nhiên: Mệnh đề quan hệ (which/that/who), Liên từ tương phản/nguyên nhân (Although/Whereas/Since/Therefore), và Phân từ rút gọn dạng cơ bản (V-ing, V-ed).",
              },
              {
                q: "Tại sao chỉ chép chính tả (Dictation) là chưa đủ để kéo Listening lên 8.0?",
                a: "Dictation rất tốt để bắt âm đuôi (-s/-ed) và ăn trọn 20 câu Section 1-2. Tuy nhiên để đạt Listening 8.0, bạn chỉ được phép sai tối đa 4-5 câu toàn bài. Nút thắt lớn nhất là Section 3 (hội thoại 3 người, bẫy trắc nghiệm dài) và Section 4 (bài giảng học thuật). Do đó, 75 phút sau của Ca 2 bắt buộc phải dành cho: 1) Keywords Mapping (quét đề, gạch từ khóa neo trước khi băng chạy) và 2) Signposting Words (nhận diện từ chuyển ý như However, In contrast, But now... để không bị lừa đáp án).",
              },
              {
                q: "Tại sao ở Speaking Part 3 tuyệt đối không được dùng ví dụ cá nhân ('tôi, gia đình tôi')?",
                a: "Giám khảo quyết định thí sinh đạt 6.0 hay bị chặn ở 5.0 - 5.5 phụ thuộc phần lớn vào Part 3. Part 3 là bài thảo luận trừu tượng mang tính xã hội, không phải trò chuyện đời tư như Part 1. Hãy áp dụng công thức A-R-E-A: Answer (Trả lời trực tiếp) ➔ Reason (Nêu lý do sâu) ➔ Example (Ví dụ khách quan mang tính xã hội như 'younger generation', 'urban dwellers') ➔ Alternative (Giả định trường hợp ngược lại). Dùng 'In my family...' sẽ bị giám khảo trừ điểm tư duy Task Response ngay lập tức!",
              },
              {
                q: "Chiến thuật 1 phút Part 2 với công thức PPF (Past - Present - Future) hoạt động thế nào?",
                a: "Trong 1 phút chuẩn bị, tuyệt đối không cố viết cả câu hoàn chỉnh (sẽ không kịp giờ). Hãy viết 4 - 6 từ khóa (bullet points) theo dòng thời gian PPF: Past (bắt đầu từ khi nào trong quá khứ) ➔ Present (cảm xúc và thực tế hiện tại) ➔ Future (kỳ vọng hoặc bài học rút ra trong tương lai). Công thức này giúp bạn duy trì mạch nói trôi chảy suốt 1.5 - 2 phút mà không bao giờ bị 'trắng não' bí ý tưởng.",
              },
              {
                q: "Tại sao từ Tuần 6 trở đi lại có bài thi thử sức bền (Endurance Test) 2h40p sáng Chủ nhật?",
                a: "Học 4 ca 105 phút trong tuần giúp não không kiệt sức khi học hàng ngày. Nhưng phòng thi thật là cuộc chiến bào mòn thể lực: bạn phải ngồi liên tục Listening (40p) ➔ Reading (60p) ➔ Writing (60p) không có bất kỳ khoảng nghỉ nào. Nếu không rèn sức bền nhận thức (Cognitive Stamina) từ tuần thứ 6, bạn sẽ bị quá tải não và 'sập nguồn' ngay khi bước vào Passage 3 hoặc Task 2!",
              },
              {
                q: "Tại sao Sổ lỗi sai không xóa vĩnh viễn sau 2-3 lần làm đúng mà dùng chu kỳ FSRS?",
                a: "Ở band 4.5, các lỗi chia thì quá khứ, quên mạo từ (a/an/the) hay quên âm đuôi (-s/-ed) là do thói quen tiếng mẹ đẻ ăn sâu vào tiềm thức. Việc bạn làm đúng 2-3 lần liên tiếp trong ngày chỉ là do trí nhớ ngắn hạn (working memory) đang hoạt động. Sang tuần sau bạn sẽ tái phạm! Hệ thống áp dụng FSRS: câu sai phải xuất hiện lại sau 3 ngày, 7 ngày và 21 ngày. Vượt qua cả 3 vòng thì lỗi đó mới chính thức biến thành phản xạ tiềm thức dài hạn.",
              },
              {
                q: "Tại sao lộ trình Speaking hoàn toàn không dạy bảng ký hiệu phiên âm IPA?",
                a: "Bảng ký tự phiên âm IPA sinh ra cho các nhà ngôn ngữ học và thời kỳ từ điển in giấy cũ. Trong phòng thi IELTS Speaking, giám khảo chỉ chấm độ dễ hiểu (Intelligibility), ngữ điệu (Intonation), trọng âm và âm đuôi, TUYỆT ĐỐI KHÔNG chấm xem bạn có thuộc ký hiệu IPA hay không! Việc bắt ép học 44 ký tự IPA chỉ làm não bộ bị 'nghẽn mạch' vì phải dịch trung gian 2 lần (Chữ viết ➔ Ký tự IPA ➔ Cơ miệng), gây ngập ngừng và sợ sai. Lộ trình của bạn thay thế 100% bằng Phương pháp Echo & Shadowing thực chiến: Nghe trực tiếp audio bản xứ (BBC/Cambridge) và nhại lại ngay lập tức ngữ điệu, ngắt cụm ý (Thought Chunking) và trọng âm câu; tự động hóa 2 âm đuôi (-s/-es & -ed) bằng phản xạ cơ miệng. Vừa học nhàn, vừa nói trôi chảy tự nhiên!",
              },
              {
                q: "Khi mất mạng (Offline), tôi có thể học được những gì và tính năng nào cần Internet?",
                a: "Hệ thống hoạt động theo cơ chế minh bạch: 1) Chế độ Offline (100% trên máy qua IndexedDB): Ôn thẻ từ vựng FSRS, đọc bài reading đã tải, làm trắc nghiệm ngữ pháp tĩnh, nghe audio đã cache mà không cần mạng. 2) Chế độ Online (Cần kết nối Internet): Chấm bài AI Writing 4 tiêu chí, AI Examiner phỏng vấn Speaking 1-1, Speech-to-Text phân tích âm điệu, Trợ giảng Socratic AI (vì cần gửi dữ liệu lên mô hình ngôn ngữ lớn).",
              },
              {
                q: "Tôi muốn đổi giao diện sang nền Tối (Dark mode) hoặc Sáng thì bấm ở đâu?",
                a: "Ở góc trên cùng bên phải màn hình (thanh Header), có biểu tượng hình Mặt Trời / Mặt Trăng. Bạn chỉ cần bấm vào đó để chuyển đổi giao diện theo ý thích bất kỳ lúc nào.",
              },
            ].map((item, idx) => {
              const isOpen = openFaqIndex === idx || isPrintingAll;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-secondary/30 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-foreground flex items-center gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-bold">
                        {idx + 1}
                      </span>
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/60 bg-secondary/10">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 8. Bottom Ready CTA Callout */}
      <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-800 via-red-700 to-rose-800 p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-lg shadow-red-800/25">
        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-extrabold flex items-center gap-2">
            <Smile className="h-5 w-5 text-amber-300" />
            Bạn Đã Sẵn Sàng Cho Ngày Mai Chưa?
          </h3>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl leading-relaxed">
            Hành trình chinh phục Band 7.5 bắt đầu từ bước chân đầu tiên. Hãy ngủ thật ngon và bắt đầu Ca 1 vào sáng mai nhé!
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-red-800 font-extrabold text-xs sm:text-sm shadow-md hover:bg-red-50 transition-all hover:scale-105 cursor-pointer shrink-0"
        >
          <span>Về Bảng Theo Dõi Học Tập</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
