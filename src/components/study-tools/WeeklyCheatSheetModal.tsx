"use client";

import React, { useState } from "react";
import {
  Printer,
  FileText,
  Sparkles,
  Download,
  X,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklyCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WeeklyCheatSheetModal({ isOpen, onClose }: WeeklyCheatSheetModalProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[95vh] flex flex-col rounded-3xl border border-red-500/30 bg-card shadow-2xl overflow-hidden select-none">
        {/* Modal Controls Bar (Hidden when printing) */}
        <div className="p-4 sm:p-5 border-b border-border/80 bg-secondary/30 flex items-center justify-between gap-4 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-700 text-white shadow-xs">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-foreground">
                  Tờ Bí Kíp Tóm Tắt A4 Tự Động Mỗi Tuần
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                  A4 Printable
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Tự động chắt lọc 10 công thức cốt lõi, 20 từ C1 hay gặp và top 3 bẫy lỗi sai cần tránh.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Print button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs flex items-center gap-1.5 shadow-sm shadow-red-700/30 transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>In Trang A4 / Lưu PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Week Selector Tab Bar (Hidden when printing) */}
        <div className="px-5 py-2.5 bg-secondary/10 border-b border-border/60 flex items-center justify-between gap-3 text-xs print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedWeek(1)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
                selectedWeek === 1
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              Tuần 1 (14/9 - 20/9): Cứu Ngữ Pháp Phần 1 (Day 1 - 7: Các Thì Cốt Lõi)
            </button>

            <button
              type="button"
              onClick={() => setSelectedWeek(2)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
                selectedWeek === 2
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              Tuần 2 (18/9 - 24/9): Cứu Ngữ Pháp Phần 2 (Day 8 - 14: Bị Động, So Sánh & Mệnh Đề)
            </button>
          </div>

          <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
            Khổ chuẩn: 210mm × 297mm (1 Mặt A4)
          </span>
        </div>

        {/* The Printable A4 Sheet Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-background print:p-0 print:overflow-visible">
          <div className="max-w-[800px] mx-auto bg-card print:bg-white print:text-black border border-border print:border-none rounded-2xl print:rounded-none p-6 sm:p-8 shadow-sm print:shadow-none space-y-6 text-foreground print:text-black">
            
            {/* Sheet Header */}
            <div className="border-b-2 border-red-700 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-red-700 print:text-red-700">
                    IELTS Mastery 7.5 • Weekly Blueprint
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-100 text-red-800 print:border print:border-red-800">
                    Tuần {selectedWeek}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground print:text-black mt-1">
                  {selectedWeek === 1
                    ? "TỜ BÍ KÍP TUẦN 1: CỨU NGỮ PHÁP NỀN TẢNG & ÂM ĐUÔI"
                    : "TỜ BÍ KÍP TUẦN 2: CÚ PHÁP HỌC THUẬT C1 & MA TRẬN PARAPHRASE"}
                </h1>
                <p className="text-xs text-muted-foreground print:text-gray-600">
                  Học viên: <strong>Huyền Phạm</strong> • Mục tiêu: 8.5R - 8.0L - 6.5W - 6.0S
                </p>
              </div>

              <div className="text-left sm:text-right font-mono text-[11px] text-muted-foreground print:text-gray-500 shrink-0">
                <div>Áp dụng: {selectedWeek === 1 ? "14/9/2026 - 20/9/2026" : "21/9/2026 - 27/9/2026"}</div>
                <div>Trang 1 / 1 (Khổ A4)</div>
              </div>
            </div>

            {/* Section 1: 10 Core Grammar Blueprints */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-border pb-1">
                <span className="text-xs font-black uppercase text-red-700 print:text-red-700 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" /> 1. Top 10 Mẫu Câu Ngữ Pháp Cốt Lõi
                </span>
                <span className="text-[10px] text-muted-foreground print:text-gray-500 font-sans">
                  (Thuộc lòng cấu trúc & ví dụ)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>1. Quá khứ đơn (Task 1 Trend):</span>
                    <span className="font-mono text-[10px] text-red-600">Bắt buộc đuôi -ed</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    Between 2010 and 2020, figures experienced a sharp surge.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>2. Rút gọn mệnh đề quan hệ (V-ing):</span>
                    <span className="font-mono text-[10px] text-red-600">Chủ động</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    Vehicles emitting toxic pollutants should be heavily taxed.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>3. Bị động khách quan học thuật:</span>
                    <span className="font-mono text-[10px] text-red-600">Thay cho &apos;I think&apos;</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    It is widely acknowledged that urban green spaces alleviate stress.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>4. Đảo ngữ điều kiện loại 1:</span>
                    <span className="font-mono text-[10px] text-red-600">Should + S + V</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    Should governments enforce stricter rules, air quality will improve.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>5. Danh từ hóa (Nominalization):</span>
                    <span className="font-mono text-[10px] text-red-600">C1 Upgrade</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    The rapid expansion of cities has triggered severe traffic congestion.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>6. Nhượng bộ tương phản:</span>
                    <span className="font-mono text-[10px] text-red-600">Despite + Noun</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    Despite initial skepticism, biomimetic design yielded breakthroughs.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>7. So sánh kép (The more... the more):</span>
                    <span className="font-mono text-[10px] text-red-600">Quan hệ tỷ lệ</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    The higher the tax on fossil fuels, the greater the transition to solar.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>8. Cấu trúc liên kết nhân quả:</span>
                    <span className="font-mono text-[10px] text-red-600">Account for / Yield</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    Industrial waste accounts for over 40% of aquatic contamination.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>9. Cấu trúc song hành (Parallelism):</span>
                    <span className="font-mono text-[10px] text-red-600">Cân bằng từ loại</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    The policy aims at reducing poverty, fostering education, and creating jobs.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 print:bg-gray-50 space-y-1">
                  <div className="font-bold text-foreground print:text-black flex items-center justify-between">
                    <span>10. Giả định loại 2 (Inversion):</span>
                    <span className="font-mono text-[10px] text-red-600">Were S to V</span>
                  </div>
                  <div className="font-mono text-[11px] text-red-700 print:text-red-700">
                    Were society to adopt renewable energy, emissions would plummet.
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: 20 High-Yield C1 Academic Words */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border pb-1">
                <span className="text-xs font-black uppercase text-red-700 print:text-red-700 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> 2. 20 Từ Vựng C1 Hay Gặp Nhất Trong Cambridge Tuần 1
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">mitigate (v)</strong>
                  <span className="text-muted-foreground print:text-gray-600">giảm nhẹ, xoa dịu</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">exacerbate (v)</strong>
                  <span className="text-muted-foreground print:text-gray-600">làm trầm trọng thêm</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">unprecedented (a)</strong>
                  <span className="text-muted-foreground print:text-gray-600">chưa từng có tiền lệ</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">disparity (n)</strong>
                  <span className="text-muted-foreground print:text-gray-600">sự chênh lệch, bất bình đẳng</span>
                </div>

                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">allocate (v)</strong>
                  <span className="text-muted-foreground print:text-gray-600">phân bổ (ngân sách, nguồn lực)</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">empirical (a)</strong>
                  <span className="text-muted-foreground print:text-gray-600">mang tính thực nghiệm</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">substantiate (v)</strong>
                  <span className="text-muted-foreground print:text-gray-600">chứng minh bằng bằng chứng</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">lucrative (a)</strong>
                  <span className="text-muted-foreground print:text-gray-600">sinh lợi cao, béo bở</span>
                </div>

                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">foster (v)</strong>
                  <span className="text-muted-foreground print:text-gray-600">thúc đẩy, nuôi dưỡng</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">diminish (v)</strong>
                  <span className="text-muted-foreground print:text-gray-600">thu nhỏ, giảm bớt</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">predominantly (adv)</strong>
                  <span className="text-muted-foreground print:text-gray-600">chủ yếu, phần lớn</span>
                </div>
                <div className="p-2 rounded-lg border border-border/70 bg-secondary/10 print:bg-gray-50">
                  <strong className="text-red-700 print:text-red-700 block">feasible (a)</strong>
                  <span className="text-muted-foreground print:text-gray-600">khả thi trong thực tế</span>
                </div>
              </div>
            </div>

            {/* Section 3: Top 3 Recurring Traps & 30-sec Checklist */}
            <div className="p-4 rounded-xl border-2 border-red-700/40 bg-red-500/[0.04] print:bg-gray-50 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-black text-red-700 print:text-red-700">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" /> 3. Checklist 30 Giây Phòng Chống Bọ Ngữ Pháp Trước Khi Nộp
                </span>
                <span className="text-[10px] font-mono">Bảo vệ Band 6.5 Writing & 6.0 Speaking</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground print:text-black block">1. Kiểm tra đuôi -s:</strong>
                    <span className="text-muted-foreground print:text-gray-600 text-[11px]">
                      Danh từ đếm được số nhiều có -s không? Chủ ngữ số ít động từ đã chia -s/-es chưa?
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground print:text-black block">2. Soi thì quá khứ:</strong>
                    <span className="text-muted-foreground print:text-gray-600 text-[11px]">
                      Task 1 mốc năm quá khứ tuyệt đối KHÔNG dùng hiện tại đơn (phải dùng saw/increased).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground print:text-black block">3. Âm đuôi khi nói:</strong>
                    <span className="text-muted-foreground print:text-gray-600 text-[11px]">
                      Tuyệt đối không nuốt âm /s/ và /t/. Bật rõ âm đuôi là chìa khóa Speaking 6.0!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Sign-off */}
            <div className="text-center pt-1 border-t border-border text-[10px] text-muted-foreground print:text-gray-500 font-mono">
              IELTS Mastery Platform • Bản in độc quyền của học viên Huyền Phạm • Kiên trì mỗi ngày, thành công tất yếu!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
