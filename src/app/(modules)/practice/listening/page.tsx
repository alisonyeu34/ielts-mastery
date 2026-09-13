"use client";

import React from "react";
import Link from "next/link";
import {
  Headphones,
  ArrowLeft,
  Sparkles,
  ArrowRight,
  Radio,
  Compass,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LISTENING_SECTIONS = [
  {
    id: "s1-s2",
    title: "Cambridge Listening Section 1 & Section 2",
    subtitle: "Form Filling • Map Labelling • Độc thoại đời sống",
    description:
      "Tập trung điền số điện thoại, tên riêng đánh vần, giá tiền, địa điểm và định vị phương hướng trên bản đồ. Bắt buộc 10/10 ở Section 1 để xây nền móng 5.5+.",
    href: "/practice/listening-s1-s2",
    badge: "Phase 1: Cam 11 - 14",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    icon: Compass,
    recommendedFor: "Giai đoạn 1 (14/9 - 14/10)",
  },
  {
    id: "dictation",
    title: "Chép Chính Tả Từng Câu (Dictation Engine)",
    subtitle: "Luyện tai bắt âm nối, nuốt âm & âm đuôi -s/ed",
    description:
      "Nghe từng câu ngắn theo phương pháp Nghe sâu (Deep Listening), gõ lại nguyên văn và xem báo cáo sai sót chi tiết theo thuật toán Diff.",
    href: "/practice/dictation",
    badge: "Luyện Phản Xạ Âm",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    icon: Headphones,
    recommendedFor: "Hàng ngày (15-30 phút)",
  },
  {
    id: "s3-s4",
    title: "Cambridge Listening Section 3 & Section 4",
    subtitle: "Multiple Choice • Matching • Academic Monologue",
    description:
      "Thảo luận học thuật giữa sinh viên và giảng viên (Section 3) và bài giảng độc thoại 100% chuyên ngành (Section 4). Luyện kỹ thuật bắt bẫy Distractors.",
    href: "/practice/listening-s3-s4",
    badge: "Phase 2 & 3: Cam 15 - 19",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    icon: Radio,
    recommendedFor: "Giai đoạn 2 (11/10 trở đi)",
  },
  {
    id: "full-mock",
    title: "Thi Thử Trọn Vẹn 4 Sections (Full Mock Test)",
    subtitle: "40 câu liên tục • Áp lực phòng thi thật • Bấm giờ chuẩn",
    description:
      "Môi trường mô phỏng 100% bài thi IELTS Listening trên máy tính. Chấm điểm ngay lập tức và phân tích phổ điểm theo từng Section.",
    href: "/mock-test",
    badge: "Full Test Cambridge",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    icon: Zap,
    recommendedFor: "Cuối tuần & Ngày Kiểm Định",
  },
];

export default function ListeningHubPage() {
  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Phòng Luyện Nghe Cambridge Chuyên Sâu
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Trung Tâm Luyện Nghe IELTS & Giải Đề Cambridge
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl">
            Lựa chọn phân hệ luyện tập phù hợp với tiến độ lộ trình: từ bắt âm cơ bản (S1-S2, Dictation) đến xử lý bẫy đa phương án (S3) và độc thoại học thuật (S4).
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-2xl border border-border bg-card self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Về Trung Tâm Luyện Tập
        </Link>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {LISTENING_SECTIONS.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.id}
              className="p-6 rounded-3xl border border-border bg-card shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase",
                          sec.badgeColor
                        )}
                      >
                        {sec.badge}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-muted-foreground font-mono">
                    {sec.recommendedFor}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-foreground">
                    {sec.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {sec.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                    {sec.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/70">
                <Link
                  href={sec.href}
                  className="w-full py-2.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Bắt đầu luyện tập ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
