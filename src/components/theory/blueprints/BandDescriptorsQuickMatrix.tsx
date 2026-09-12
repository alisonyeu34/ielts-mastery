"use client";

import React, { useState } from "react";
import {
  Award,
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BandDescriptorsQuickMatrixProps {
  isOpen: boolean;
  onClose: () => void;
  skillType?: "writing" | "speaking";
  skill?: "writing" | "speaking";
  className?: string;
}

export function BandDescriptorsQuickMatrix({
  isOpen,
  onClose,
  skillType,
  skill,
  className,
}: BandDescriptorsQuickMatrixProps) {
  const activeSkill = skill || skillType || "writing";
  const [activeCriterion, setActiveCriterion] = useState<string>(
    activeSkill === "writing" ? "tr" : "fc"
  );

  if (!isOpen) return null;

  const writingCriteria = [
    {
      id: "tr",
      name: "Task Achievement / Response",
      band5: "Chỉ trả lời một phần đề bài, thiếu Overview rõ ràng, số liệu liệt kê chi tiết dàn trải hoặc thiếu luận điểm chính.",
      band65: "Nêu được Overview và luận điểm chính, nhưng một số ý giải thích chưa sâu hoặc còn mang tính chung chung.",
      band8: "Hoàn thành xuất sắc mọi yêu cầu; Overview nổi bật; Luận điểm phát triển sâu sắc với chuỗi nhân quả và bằng chứng thuyết phục.",
    },
    {
      id: "cc",
      name: "Coherence & Cohesion",
      band5: "Dùng từ nối cơ bản lặp đi lặp lại ('Firstly, Secondly, In addition'), phân đoạn chưa hợp lý hoặc chuyển ý gượng gạo.",
      band65: "Chia đoạn logic, dùng từ nối đa dạng nhưng thỉnh thoảng còn thiếu tự nhiên hoặc máy móc.",
      band8: "Mạch văn liền mạch tuyệt đối (Seamless flow); kỹ thuật tham chiếu (Referencing) và thế đại từ nhuần nhuyễn.",
    },
    {
      id: "lr",
      name: "Lexical Resource",
      band5: "Vốn từ vựng hạn chế, lặp từ nhiều, mắc lỗi chọn từ (Word choice) và chính tả làm cản trở thông hiểu.",
      band65: "Có vốn từ vựng phong phú cho chủ đề, sử dụng được collocations nhưng đôi khi dùng từ chưa chuẩn ngữ cảnh.",
      band8: "Sử dụng linh hoạt và tự nhiên các cụm từ học thuật C1/C2 (Uncommon lexical items), kiểm soát ngữ cảnh xuất sắc.",
    },
    {
      id: "gra",
      name: "Grammatical Range & Accuracy",
      band5: "Chủ yếu dùng câu đơn và câu ghép cơ bản, mắc nhiều lỗi chia thì, giới từ và trật tự từ.",
      band65: "Kết hợp câu đơn và câu phức linh hoạt, đa số câu chính xác nhưng vẫn còn lỗi nhỏ khi viết câu phức tạp.",
      band8: "Làm chủ hoàn toàn các cấu trúc ngữ pháp phức tạp (Đảo ngữ, Rút gọn phân từ, Câu chẻ, Bị động khách quan), câu văn hầu như không có lỗi.",
    },
  ];

  const speakingCriteria = [
    {
      id: "fc",
      name: "Fluency & Coherence",
      band5: "Nói ngập ngừng nhiều, tốc độ chậm, phải tự sửa lỗi liên tục hoặc trả lời cộc lốc rồi im lặng.",
      band65: "Nói trôi chảy với độ dài tốt, có thể ngập ngừng khi tìm từ vựng nhưng không làm mất mạch ý chính.",
      band8: "Nói tự nhiên, lưu loát với nhịp điệu bản xứ, sử dụng linh hoạt các liên từ và từ đệm tự nhiên (Discourse markers).",
    },
    {
      id: "lr",
      name: "Lexical Resource",
      band5: "Vốn từ đơn giản, khó diễn đạt các ý trừu tượng, lặp từ nhiều.",
      band65: "Có vốn từ đa dạng để thảo luận nhiều chủ đề, sử dụng thành ngữ và phrasal verbs nhưng đôi khi chưa chuẩn xác.",
      band8: "Vốn từ vựng tinh tế, diễn đạt thành ngữ và từ ngữ học thuật C1/C2 một cách tự nhiên như người bản xứ.",
    },
    {
      id: "gra",
      name: "Grammatical Range & Accuracy",
      band5: "Hay mắc lỗi thì cơ bản, câu phức thường bị sai ngữ pháp.",
      band65: "Dùng được nhiều cấu trúc câu phức tạp, tỷ lệ câu đúng cao dù đôi khi còn lỗi nhỏ.",
      band8: "Đa dạng hóa cấu trúc ngữ pháp linh hoạt (Mixed conditionals, Inversion, Passive), độ chính xác tuyệt đối.",
    },
    {
      id: "pr",
      name: "Pronunciation",
      band5: "Phát âm sai nhiều âm cơ bản, thiếu trọng âm từ và ngữ điệu đều đều (Monotone).",
      band65: "Phát âm rõ ràng, người nghe hiểu được hầu hết bài nói dù thỉnh thoảng còn phát âm sai âm khó.",
      band8: "Phát âm chuẩn xác, làm chủ trọng âm câu (Sentence stress), nối âm tự nhiên và ngữ điệu hạ giọng cuốn hút.",
    },
  ];

  const activeList = activeSkill === "writing" ? writingCriteria : speakingCriteria;
  const currentCriterionData = activeList.find((c) => c.id === activeCriterion) || activeList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl p-2 text-muted-foreground hover:bg-secondary cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold shadow-md">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              CAMBRIDGE OFFICIAL BAND DESCRIPTORS
            </span>
            <h3 className="text-lg font-black text-foreground mt-0.5">
              Barem Chấm Điểm Chuẩn {activeSkill === "writing" ? "Writing" : "Speaking"} (Band 5.0 - 6.5 - 8.0+)
            </h3>
          </div>
        </div>

        {/* Criteria Tab Switcher */}
        <div className="flex flex-wrap gap-2 border-b border-border/80 pb-3">
          {activeList.map((crit) => (
            <button
              key={crit.id}
              type="button"
              onClick={() => setActiveCriterion(crit.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
                activeCriterion === crit.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {crit.name}
            </button>
          ))}
        </div>

        {/* 3-Tier Band Comparison Cards */}
        <div className="space-y-3 text-xs">
          {/* Band 5.0 */}
          <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/30 space-y-1">
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-[10px] uppercase block">
              BAND 5.0 (CẦN KHẮC PHỤC):
            </span>
            <p className="text-foreground/90 leading-relaxed font-medium">
              {currentCriterionData.band5}
            </p>
          </div>

          {/* Band 6.5 */}
          <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/30 space-y-1">
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-[10px] uppercase block">
              BAND 6.5 (MỨC ĐỘ KHÁ):
            </span>
            <p className="text-foreground/90 leading-relaxed font-medium">
              {currentCriterionData.band65}
            </p>
          </div>

          {/* Band 8.0+ */}
          <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/30 space-y-1">
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase block">
              BAND 8.0+ (CHUẨN XUẤT SẮC C1/C2):
            </span>
            <p className="text-foreground/90 leading-relaxed font-bold">
              {currentCriterionData.band8}
            </p>
          </div>
        </div>

        {/* Close CTA */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border cursor-pointer"
          >
            Đóng Bảng Tra Cứu
          </button>
        </div>
      </div>
    </div>
  );
}
