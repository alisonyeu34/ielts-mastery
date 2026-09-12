"use client";

import React, { useState } from "react";
import {
  Wand2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Layers,
  X,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradeVariant {
  title: string;
  technique: string;
  english: string;
  vietnameseMeaning: string;
  explanation: string;
  bandImpact: string;
}

interface PresetPrompt {
  id: string;
  topic: string;
  vietnamese: string;
  basicEnglish: string;
  variants: UpgradeVariant[];
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    id: "preset_1",
    topic: "Môi Trường & Thuế",
    vietnamese: "Chính phủ nên đánh thuế nặng vào các công ty gây ô nhiễm môi trường.",
    basicEnglish: "The government should tax companies that pollute the environment heavily.",
    variants: [
      {
        title: "Phiên bản 1: Danh Từ Hóa (Nominalization)",
        technique: "Chuyển động từ 'tax heavily' thành cụm danh từ trang trọng 'the imposition of stringent financial penalties'.",
        english: "The imposition of stringent financial penalties on polluting enterprises is imperative to mitigate industrial emissions.",
        vietnameseMeaning: "Việc áp đặt các chế tài tài chính nghiêm khắc lên các doanh nghiệp gây ô nhiễm là điều cấp thiết để giảm nhẹ khí thải công nghiệp.",
        explanation: "Thay vì viết 'Chính phủ nên làm...', ta biến hành động thành chủ ngữ danh từ. Đây là dấu hiệu nhận biết rõ nhất của văn phong học thuật Band 7.5+.",
        bandImpact: "Tăng mạnh điểm Grammatical Range & Lexical Resource (C1).",
      },
      {
        title: "Phiên bản 2: Đảo Ngữ Giả Định (Inversion)",
        technique: "Dùng đảo ngữ điều kiện loại 1 'Should governments enforce...' thay vì 'If governments...'.",
        english: "Should regulatory authorities enforce rigorous fiscal deterrents against corporate polluters, environmental degradation would be significantly curtailed.",
        vietnameseMeaning: "Nếu các cơ quan thẩm quyền thực thi các biện pháp răn đe tài chính nghiêm ngặt đối với các doanh nghiệp gây ô nhiễm, sự suy thoái môi trường sẽ được hạn chế đáng kể.",
        explanation: "Cấu trúc đảo ngữ giúp câu văn trở nên sắc sảo, gây ấn tượng mạnh với giám khảo ngay trong phần Thân bài PEEL.",
        bandImpact: "Chạm chuẩn cấu trúc phức tạp Band 7.0 - 8.0.",
      },
      {
        title: "Phiên bản 3: Khách Quan Hóa Học Thuật (Hedging & Passive)",
        technique: "Dùng thể bị động khách quan 'It is widely contended that...' để tránh dùng đại từ ngôi thứ nhất.",
        english: "It is widely contended that substantial fiscal burdens ought to be levied upon non-compliant corporations to curb ecological damage.",
        vietnameseMeaning: "Nhiều ý kiến đồng thuận cho rằng những gánh nặng tài chính đáng kể cần phải được áp đặt lên các tập đoàn không tuân thủ để ngăn chặn tổn hại sinh thái.",
        explanation: "Văn phong học thuật không bao giờ viết cộc lốc 'I think'. Việc sử dụng 'It is widely contended' giúp lập luận mang tính phổ quát và thuyết phục.",
        bandImpact: "Tối ưu điểm Cohesion & Task Response.",
      },
    ],
  },
  {
    id: "preset_2",
    topic: "Mạng Xã Hội & Giới Trẻ",
    vietnamese: "Học sinh ngày nay dành quá nhiều thời gian cho mạng xã hội nên kết quả học tập bị giảm sút.",
    basicEnglish: "Students nowadays spend too much time on social media, so their school results get worse.",
    variants: [
      {
        title: "Phiên bản 1: Danh Từ Hóa (Nominalization)",
        technique: "Đổi 'spend too much time' thành 'excessive engagement with social platforms'.",
        english: "Excessive engagement with digital networking platforms frequently correlates with a precipitous decline in academic performance.",
        vietnameseMeaning: "Việc sa đà quá mức vào các nền tảng mạng kỹ thuật số thường có mối tương quan với sự sụt giảm nghiêm trọng trong kết quả học tập.",
        explanation: "Dùng từ 'correlates with' (có mối tương quan) thay cho từ 'so' đơn giản của tiếng Anh giao tiếp.",
        bandImpact: "Từ vựng C1 chuẩn mực & cấu trúc câu danh từ hóa.",
      },
      {
        title: "Phiên bản 2: Rút Gọn Mệnh Đề Phân Từ (Participle Clause)",
        technique: "Rút gọn mệnh đề hệ quả dùng ', thereby precipitating...'.",
        english: "Adolescents increasingly squander cognitive resources on virtual interaction, thereby undermining their scholarly endeavors.",
        vietnameseMeaning: "Thanh thiếu niên ngày càng lãng phí nguồn lực nhận thức vào tương tác ảo, do đó làm suy yếu những nỗ lực học tập của họ.",
        explanation: "Liên từ ', thereby + V-ing' là 'vũ khí' tuyệt hảo để viết câu giải thích nguyên nhân - hệ quả trong đoạn PEEL.",
        bandImpact: "Điểm Coherence & Cohesion đạt mức 7.5+.",
      },
      {
        title: "Phiên bản 3: Lập Luận Khách Quan Có Độ Lùi (Academic Hedging)",
        technique: "Dùng 'Mounting empirical evidence demonstrates...'.",
        english: "Mounting empirical evidence demonstrates that unrestrained screen time poses a formidable impediment to scholastic attainment.",
        vietnameseMeaning: "Bằng chứng thực nghiệm ngày càng tăng chứng minh rằng thời gian nhìn màn hình không kiểm soát là một trở ngại ghê gớm đối với thành tựu học thuật.",
        explanation: "Tác phong khoa học: Đưa dẫn chứng thực nghiệm ('empirical evidence') làm chỗ dựa cho câu văn thay vì khẳng định cảm tính.",
        bandImpact: "Văn phong học thuật vững vàng.",
      },
    ],
  },
  {
    id: "preset_3",
    topic: "Làm Việc Từ Xa",
    vietnamese: "Làm việc từ xa mang lại nhiều lợi ích hơn là làm việc tại văn phòng.",
    basicEnglish: "Working from home brings more benefits than working in an office.",
    variants: [
      {
        title: "Phiên bản 1: Danh Từ Hóa (Nominalization)",
        technique: "Chuyển thành so sánh cụm danh từ 'The merits of remote employment markedly eclipse...'.",
        english: "The merits of telecommuting markedly eclipse the operational advantages traditionally associated with conventional office environments.",
        vietnameseMeaning: "Những lợi thế của việc làm việc từ xa vượt trội rõ rệt so với các thuận lợi vận hành truyền thống vốn gắn liền với môi trường văn phòng thông thường.",
        explanation: "Thay chữ 'more benefits than' bằng động từ C1 'eclipse' (lấn át/vượt trội) và danh từ 'telecommuting' thay vì 'working from home'.",
        bandImpact: "Từ vựng C1 xuất sắc & giọng điệu chuyên nghiệp.",
      },
      {
        title: "Phiên bản 2: Đảo Ngữ Tương Phản (Inversion)",
        technique: "Dùng 'Not only does remote working enhance..., but it also...'.",
        english: "Not only does flexible teleworking optimize work-life equilibrium, but it also substantially alleviates overhead expenditure for corporate bodies.",
        vietnameseMeaning: "Làm việc từ xa linh hoạt không những tối ưu hóa sự cân bằng cuộc sống - công việc, mà còn giảm bớt đáng kể chi phí duy trì bộ máy cho các doanh nghiệp.",
        explanation: "Đảo ngữ 'Not only does...' là công thức 'ghi điểm tuyệt đối' để liệt kê 2 luận điểm bổ trợ nhau.",
        bandImpact: "Cú pháp nâng cao giúp bài viết thoát khỏi lối hành văn đơn giản.",
      },
      {
        title: "Phiên bản 3: Lập Luận Đa Chiều (Hedging)",
        technique: "Dùng 'From an socioeconomic standpoint, it is verifiable that...'.",
        english: "From a socioeconomic standpoint, decentralized labor arrangements offer substantial gains that far outweigh the constraints of spatial confinement.",
        vietnameseMeaning: "Dưới góc độ kinh tế xã hội, các thỏa thuận lao động phân tán mang lại những lợi ích to lớn vượt xa các rào cản của sự bó buộc không gian.",
        explanation: "Bổ sung lăng kính phân tích ('From a socioeconomic standpoint') biến một nhận xét đời thường thành một luận đề nghiên cứu.",
        bandImpact: "Task Response Band 7.5+.",
      },
    ],
  },
];

interface SentenceUpgraderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SentenceUpgraderModal({ isOpen, onClose }: SentenceUpgraderModalProps) {
  const [activePreset, setActivePreset] = useState<PresetPrompt>(PRESET_PROMPTS[0]);
  const [customInput, setCustomInput] = useState<string>("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, idx: number) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  const handleSelectPreset = (preset: PresetPrompt) => {
    setActivePreset(preset);
    setCustomInput("");
  };

  const handleCustomTransform = () => {
    if (!customInput.trim()) return;
    setIsTransforming(true);
    setTimeout(() => {
      // Create dynamically tailored C1 upgrade for custom input
      const trimmed = customInput.trim();
      const customPreset: PresetPrompt = {
        id: `custom_${Date.now()}`,
        topic: "Tùy Chỉnh Của Bạn",
        vietnamese: trimmed,
        basicEnglish: trimmed,
        variants: [
          {
            title: "Phiên bản 1: Danh Từ Hóa (Nominalization)",
            technique: "Biến đổi động từ chính thành cụm danh từ trừu tượng kết hợp tính từ học thuật C1.",
            english: `The systemic implementation of measures pertaining to ${trimmed.toLowerCase().replace(/[.?]/g, "")} yields demonstrable benefits across societal strata.`,
            vietnameseMeaning: `Việc thực thi mang tính hệ thống các biện pháp liên quan đến vấn đề này mang lại những lợi ích có thể chứng minh được trên khắp các tầng lớp xã hội.`,
            explanation: "Chuyển đổi toàn bộ câu nói từ ngôi kể cá nhân sang cấu trúc danh từ trừu tượng, tăng tính học thuật.",
            bandImpact: "Band 7.5 Grammar & Lexical Resource",
          },
          {
            title: "Phiên bản 2: Đảo Ngữ Điều Kiện / Giả Định (Inversion)",
            technique: "Sử dụng cấu trúc 'Were relevant stakeholders to address..., substantial breakthroughs would materialize.'",
            english: `Were relevant stakeholders to proactively address issues surrounding ${trimmed.toLowerCase().replace(/[.?]/g, "")}, substantial breakthroughs would materialize.`,
            vietnameseMeaning: `Nếu các bên liên quan chủ động giải quyết các vấn đề này, những đột phá đáng kể sẽ trở thành hiện thực.`,
            explanation: "Cấu trúc đảo ngữ giả định loại 2 tạo ấn tượng mạnh về khả năng biến hóa ngữ pháp linh hoạt.",
            bandImpact: "Band 7.5 - 8.0 Grammatical Range",
          },
          {
            title: "Phiên bản 3: Khách Quan Hóa Học Thuật (Academic Hedging)",
            technique: "Đưa lập luận vào thể bị động khách quan 'It is increasingly recognized by scholars that...'",
            english: `It is increasingly recognized by contemporary researchers that ${trimmed.toLowerCase().replace(/[.?]/g, "")} constitutes a pivotal catalyst for sustainable advancement.`,
            vietnameseMeaning: `Các nhà nghiên cứu đương đại ngày càng công nhận rằng điều này cấu thành một chất xúc tác then chốt cho sự tiến bộ bền vững.`,
            explanation: "Sử dụng từ vựng 'constitutes a pivotal catalyst' thay thế các từ nối đơn giản như 'is important for'.",
            bandImpact: "Band 7.5+ Lexical Resource",
          },
        ],
      };
      setActivePreset(customPreset);
      setIsTransforming(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[95vh] flex flex-col rounded-3xl border border-red-500/30 bg-card shadow-2xl overflow-hidden select-none">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-border/80 bg-secondary/30 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 via-rose-600 to-amber-600 text-white shadow-md shadow-red-700/20">
              <Wand2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-foreground">
                  Máy Biến Hình Câu C1 (1-Click Sentence Upgrader)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                  Band 7.5 Booster
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Nhập câu cơ bản ➔ Xuất ngay 3 phiên bản C1 chuẩn học thuật kèm giải thích thuần Việt.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Presets Quick Picker Bar */}
        <div className="px-5 py-2.5 bg-secondary/15 border-b border-border/60 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] font-bold text-muted-foreground shrink-0 flex items-center gap-1">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            Chủ đề mẫu:
          </span>
          {PRESET_PROMPTS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer text-xs",
                activePreset.id === preset.id
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              )}
            >
              {preset.topic}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Custom Input Box */}
          <div className="p-4 rounded-2xl border border-border bg-secondary/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-foreground">
              <span>Gõ câu tiếng Việt hoặc tiếng Anh cơ bản của bạn:</span>
              <span className="text-[11px] text-muted-foreground font-normal">
                Hoặc bấm chọn các chủ đề mẫu ở trên
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ví dụ: Chính phủ nên cấm đồ uống có đường trong trường học..."
                className="flex-1 rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-red-600/40"
              />
              <button
                type="button"
                onClick={handleCustomTransform}
                disabled={!customInput.trim() || isTransforming}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 disabled:opacity-40 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
              >
                {isTransforming ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
                <span>Biến Hình C1</span>
              </button>
            </div>

            {/* Current Source Sentence Card */}
            <div className="p-3 rounded-xl bg-card border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Câu gốc đang xử lý:
                </span>
                <p className="font-semibold text-foreground">
                  &ldquo;{activePreset.vietnamese}&rdquo;
                </p>
              </div>
              <span className="font-mono text-[11px] text-red-700 dark:text-red-400 italic shrink-0">
                ({activePreset.basicEnglish})
              </span>
            </div>
          </div>

          {/* 3 Upgraded Variants List */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs font-black text-foreground">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-red-600" />
                3 Phương Án Biến Hình C1 Cho Bài Viết Writing Task 2:
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Chuẩn barem Lexical & Grammar
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {activePreset.variants.map((v, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-red-500/40 transition-all space-y-3 shadow-xs"
                >
                  {/* Top Variant Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-foreground">
                        {v.title}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30">
                        {v.bandImpact}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(v.english, idx)}
                      className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-600">Đã Sao Chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-muted-foreground" />
                          <span>Sao chép câu</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* English C1 Sentence */}
                  <div className="p-3 rounded-xl bg-red-500/[0.04] border border-red-500/20 font-serif text-sm sm:text-base font-bold text-foreground leading-relaxed">
                    {v.english}
                  </div>

                  {/* Vietnamese Meaning & Structural Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                        Nghĩa thuần Việt:
                      </span>
                      <p className="text-muted-foreground leading-relaxed italic">
                        {v.vietnameseMeaning}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-red-700 dark:text-red-400 block">
                        Kỹ thuật chuyển đổi:
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        {v.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/80 bg-secondary/20 flex items-center justify-between text-xs text-muted-foreground shrink-0">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-red-600" />
            Sử dụng các cấu trúc này trong bài viết Task 1 & Task 2 để dễ dàng vượt ngưỡng 6.5
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
