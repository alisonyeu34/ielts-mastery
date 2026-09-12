"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Smile,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TheoryBookmarkButton } from "@/components/theory/TheoryBookmarkButton";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { TheoryItemRecallBox } from "@/components/theory/TheoryItemRecallBox";
import { TheoryMaskableContent } from "@/components/theory/TheoryMaskableContent";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";

export interface JargonEntry {
  term: string;
  pronunciation?: string;
  shortDefinitionVi: string;
  studentAnalogyVi: string;
  realExampleVi: string;
  studentTipVi: string;
  skills: Array<"all" | "reading" | "listening" | "writing" | "speaking" | "grammar">;
  tag: string;
}

export const IELTS_STUDENT_JARGON_LIST: JargonEntry[] = [
  {
    term: "Paraphrase",
    pronunciation: "pe-rờ-phrâyz",
    shortDefinitionVi: "Đổi chữ nhưng giữ nguyên nghĩa",
    studentAnalogyVi:
      "Giống như trong tiếng Việt bạn có thể nói 'chiếc xe đạp màu đỏ' hoặc 'phương tiện hai bánh sắc đỏ thắm'. Đề thi IELTS cực kỳ thích chơi trò này để thử xem bạn có hiểu nghĩa hay chỉ chăm chăm nhìn đúng từng mặt chữ!",
    realExampleVi:
      "Trong câu hỏi đề ghi: 'The number of cars increased' (Số lượng xe tăng lên).\nVào bài đọc đề sẽ đổi thành: 'Car sales experienced a sharp rise' hoặc 'witnessed a significant surge'.",
    studentTipVi:
      "Đừng bao giờ tìm đúng từng chữ của câu hỏi trong bài đọc! Hãy chuẩn bị tinh thần tìm 'từ đồng nghĩa' của nó.",
    skills: ["all", "reading", "listening", "writing"],
    tag: "Kỹ năng sống còn",
  },
  {
    term: "Hard Keywords (Từ khóa CỨNG)",
    shortDefinitionVi: "Những từ 'bất di bất dịch' không thể bị đổi chữ",
    studentAnalogyVi:
      "Giống như số chứng minh nhân dân hay tên riêng của bạn — không ai có thể tự tiện đổi sang tên khác được! Đề thi cũng vậy, những từ này họ buộc phải giữ nguyên.",
    realExampleVi:
      "Tên người (Alexander Fleming), Năm tháng (1928, in the 19th century), Tên địa danh (London, Australia), Số liệu (75%, 200 meters), Thuật ngữ khoa học viết hoa hoặc in nghiêng.",
    studentTipVi:
      "Khi làm bài, dùng mắt quét thật nhanh (Scan) tìm những từ CỨNG này trước để 'bắt dính' đoạn văn chứa đáp án chỉ trong 5 giây!",
    skills: ["reading", "listening"],
    tag: "Định vị 5 giây",
  },
  {
    term: "Soft Keywords (Từ khóa MỀM)",
    shortDefinitionVi: "Những từ CHẮC CHẮN sẽ bị đổi bằng từ đồng nghĩa (Paraphrase)",
    studentAnalogyVi:
      "Giống như nguyên liệu mềm dễ uốn nắn. Đề thi sẽ nhào nặn các từ này thành từ khác để xem bạn có nhận ra ý nghĩa thật sự không.",
    realExampleVi:
      "Động từ (improve ➔ enhance / boost), Tính từ (important ➔ crucial / paramount), Danh từ chung (danger ➔ peril / hazard).",
    studentTipVi:
      "Dùng từ Cứng để tìm ra đoạn văn, rồi dùng từ Mềm để đối chiếu ý nghĩa và chốt đáp án đúng/sai.",
    skills: ["reading", "listening"],
    tag: "Chốt đáp án",
  },
  {
    term: "Skimming (Đọc lướt)",
    shortDefinitionVi: "Đọc lướt 90 giây để nắm bức tranh tổng thể",
    studentAnalogyVi:
      "Giống như bạn mở Facebook/TikTok lướt nhanh tiêu đề trong 1 phút để xem hôm nay có tin gì hot, chứ không đọc hết từng bình luận của mọi người.",
    realExampleVi:
      "Đọc Tiêu đề bài đọc, Tiêu đề phụ, và 1-2 câu đầu mỗi đoạn để biết đoạn A nói về lịch sử, đoạn B nói về khó khăn, đoạn C nói về giải pháp.",
    studentTipVi:
      "Gặp từ mới khi Skim? Hãy KỆ NÓ! Mục tiêu duy nhất là biết đoạn đó nói về chủ đề gì, không phải là dịch hết bài.",
    skills: ["reading"],
    tag: "Nắm bản đồ tư duy",
  },
  {
    term: "Scanning (Quét mắt tìm kiếm)",
    shortDefinitionVi: "Đảo mắt thật nhanh để tìm đúng 1 chi tiết cụ thể",
    studentAnalogyVi:
      "Giống như khi danh sách điểm thi được dán lên bảng, mắt bạn không đọc từ đầu đến cuối mà chỉ lia thật nhanh tìm đúng TÊN BẠN hoặc SỐ BÁO DANH của bạn.",
    realExampleVi:
      "Câu hỏi nhắc đến năm '1945', mắt bạn quét theo đường zíc-zắc từ trên xuống chỉ để bắt lấy con số '1945' rồi dừng lại đọc kỹ câu đó.",
    studentTipVi:
      "Đừng đọc hiểu trong lúc Scan! Chỉ dùng mắt như một chiếc máy quét quang học tìm hình dạng mặt chữ.",
    skills: ["reading"],
    tag: "Tìm mục tiêu",
  },
  {
    term: "Distractor (Mồi nhử / Bẫy lừa)",
    shortDefinitionVi: "Thông tin mồi nhử đề cố tình gài vào để bẫy người vội vàng",
    studentAnalogyVi:
      "Giống như miếng pho mát trong bẫy chuột! Đề thi sẽ phát âm hoặc viết một từ y hệt trong câu hỏi để bạn hí hửng chọn ngay, nhưng thực ra đó là đáp án sai.",
    realExampleVi:
      "Bài nghe: 'Vé ban đầu là 100 đô (mồi nhử)... nhưng vì bạn là học sinh nên được giảm còn 70 đô (đáp án thật)'. Ai vội vàng nghe thấy 100 đô là dính bẫy ngay!",
    studentTipVi:
      "Thấy một từ quá giống câu hỏi xuất hiện lộ liễu? Hãy cẩn thận giật mình 1 nhịp, nghe/đọc tiếp câu kế bên xem có bị 'quay xe' không!",
    skills: ["listening", "reading"],
    tag: "Cảnh giác cao độ",
  },
  {
    term: "Self-Correction (Tự sửa lời phút chót)",
    shortDefinitionVi: "Người nói lỡ miệng rồi tự đính chính lại",
    studentAnalogyVi:
      "Giống như khi bạn bè hẹn bạn: 'Gặp nhau lúc 5 giờ nhé... à thôi chết, 5 giờ tao bận rồi, đổi sang 6 giờ đi!'. Ai ghi số 5 là sai, số 6 mới là giờ hẹn chuẩn.",
    realExampleVi:
      "Người nói: 'My phone number is 0912... oh sorry, that's my old number, my new one is 0988...'.",
    studentTipVi:
      "Trong Listening Section 1, luôn giữ đầu bút lơ lửng thêm 2 giây sau khi nghe con số đầu tiên, để xem người ta có đính chính bằng 'Sorry', 'Actually', 'No wait' không!",
    skills: ["listening"],
    tag: "Bắt trọn Section 1",
  },
  {
    term: "Data Dumping (Liệt kê số liệu dàn trải)",
    shortDefinitionVi: "Bệnh kê khai số liệu như người bán hàng rong",
    studentAnalogyVi:
      "Giống như bạn kể chuyện: 'Năm 90 là 10, năm 95 là 15, năm 2000 là 20, năm 2005 là 25...'. Nghe cực kỳ buồn ngủ và không có tư duy phân tích!",
    realExampleVi:
      "Thay vì liệt kê 5 năm liên tục, bạn chỉ cần gộp lại: 'Doanh số tăng liên tục gấp đôi trong 15 năm, từ 10 lên đến đỉnh 25 vào năm 2005'.",
    studentTipVi:
      "Trong Writing Task 1, giám khảo chấm khả năng SO SÁNH và TÓM TẮT, không phải đếm số! Chỉ chọn điểm đầu, điểm cuối, điểm cao nhất và xu hướng chung.",
    skills: ["writing"],
    tag: "Cứu điểm Task 1",
  },
  {
    term: "Overview (Đoạn tổng quan)",
    shortDefinitionVi: "Bức tranh toàn cảnh nhìn từ trên máy bay",
    studentAnalogyVi:
      "Giống như bạn đứng trên đỉnh núi nhìn xuống thành phố và nói: 'Nhìn chung thành phố này rất đông đúc và khu phía Đông phát triển nhanh nhất'. Bạn không cần đếm từng ngôi nhà.",
    realExampleVi:
      "Đoạn 2 của Task 1: Nêu 1 xu hướng lớn nhất (Cái gì tăng, cái gì giảm?) và 1 đối tượng nổi bật nhất (Ai luôn dẫn đầu?).",
    studentTipVi:
      "Thiếu đoạn Overview, bài viết Task 1 của bạn TỐI ĐA chỉ được 5.0 điểm Task Achievement dù từ vựng có hay đến đâu!",
    skills: ["writing"],
    tag: "Bắt buộc trong Task 1",
  },
  {
    term: "Collocation (Cặp từ tự nhiên)",
    shortDefinitionVi: "Những từ tiếng Anh luôn 'đi thành đôi' với nhau",
    studentAnalogyVi:
      "Giống như tiếng Việt chúng ta nói 'chó sủa gâu gâu', 'mèo kêu meo meo' chứ không ai nói 'chó kêu meo meo'. Người bản xứ cũng có những cặp từ mặc định đi chung như vậy!",
    realExampleVi:
      "Người Việt hay dịch 'làm ra tiền' thành 'make money', nhưng trong văn học thuật họ dùng 'generate income'. Dịch 'mở mang tầm mắt' thành 'open mind', nhưng chuẩn là 'broaden horizons'.",
    studentTipVi:
      "Học từ vựng đừng học từ đơn lẻ! Hãy học cả cụm đi kèm để viết và nói tự nhiên như người bản xứ.",
    skills: ["writing", "speaking", "all"],
    tag: "Nâng Band 7.0+",
  },
  {
    term: "Hedging (Nói năng chừng mực học thuật)",
    shortDefinitionVi: "Cách nói khiêm tốn, tránh khẳng định 100%",
    studentAnalogyVi:
      "Giống như một nhà khoa học nói: 'Nhiều khả năng thời tiết sẽ mưa' chứ không ai dám vỗ ngực: 'Chắc chắn 1000% trời sẽ mưa'. Trong văn học thuật, khẳng định tuyệt đối là tự sát!",
    realExampleVi:
      "Thay vì nói: 'Technology causes laziness' (Công nghệ gây lười biếng - câu khẳng định cực đoan), hãy nói: 'Technology tends to make individuals more sedentary' (Công nghệ có xu hướng khiến con người ít vận động hơn).",
    studentTipVi:
      "Thêm các từ như 'tend to', 'appear to', 'likely', 'in many cases' để lập luận của bạn trở nên khoa học và thuyết phục hơn.",
    skills: ["writing", "speaking"],
    tag: "Tư duy C1/C2",
  },
  {
    term: "One-Sentence Dead End (Trả lời cộc lốc)",
    shortDefinitionVi: "Trả lời đúng 1 câu rồi im bặt nhìn giám khảo",
    studentAnalogyVi:
      "Giống như đi hẹn hò, đối phương hỏi: 'Em có thích xem phim không?', bạn chỉ trả lời: 'Có' rồi ngồi im nhìn người ta. Cuộc trò chuyện rơi vào ngõ cụt!",
    realExampleVi:
      "Giám khảo: 'Do you like sports?'. Thí sinh: 'Yes, I like sports very much because it is good for health' (Hết câu).",
    studentTipVi:
      "Công thức vàng cứu cánh: Trả lời trực tiếp ➔ Kể thêm chuyện quá khứ ('In the past...') ➔ Hoặc so sánh với hiện tại ('Nowadays...'). Kéo dài ra 3-4 câu là đạt Band 6.5+ ngay!",
    skills: ["speaking"],
    tag: "Phá băng Speaking",
  },
];

interface StudentJargonClarifierProps {
  currentSkill?: "all" | "reading" | "listening" | "writing" | "speaking" | "grammar";
  initialOpen?: boolean;
  highlightTerms?: string[];
  className?: string;
}

export function StudentJargonClarifier({
  currentSkill = "all",
  initialOpen = false,
  highlightTerms = [],
  className,
}: StudentJargonClarifierProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>(currentSkill);
  const { isSaved, toggleBookmark } = useTheoryBookmarks();

  const filteredJargon = IELTS_STUDENT_JARGON_LIST.filter((item) => {
    const matchesSkill =
      selectedSkillFilter === "all" ||
      item.skills.includes("all") ||
      item.skills.includes(selectedSkillFilter as any);

    const matchesSearch =
      searchQuery.trim() === "" ||
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDefinitionVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentAnalogyVi.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSkill && matchesSearch;
  });

  const getJargonBookmarkId = (term: string) => {
    return `bm_jargon_${term.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
  };

  const handleSaveAllDisplayed = () => {
    filteredJargon.forEach((jargon) => {
      const bId = getJargonBookmarkId(jargon.term);
      if (!isSaved(bId)) {
        toggleBookmark({
          id: bId,
          lessonId: "student_jargon_glossary",
          lessonTitle: "Thuật Ngữ IELTS Dành Cho Học Sinh",
          skill: (selectedSkillFilter !== "all" ? selectedSkillFilter : jargon.skills.find((s) => s !== "all") || "reading") as any,
          category: "rule",
          categoryLabelVi: "Thuật Ngữ Cốt Lõi",
          title: `${jargon.term}: ${jargon.shortDefinitionVi}`,
          content: `🎯 Hiểu nôm na: ${jargon.studentAnalogyVi}\n\n🔍 Ví dụ thực tế: ${jargon.realExampleVi}\n\n💡 Mẹo cho học sinh: ${jargon.studentTipVi}`,
          lessonHref: "/theory/saved-notes",
        });
      }
    });
  };

  const allDisplayedSaved = filteredJargon.length > 0 && filteredJargon.every((j) => isSaved(getJargonBookmarkId(j.term)));

  return (
    <div
      className={cn(
        "rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent transition-all shadow-sm",
        className
      )}
    >
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-amber-500/10 transition-colors rounded-2xl"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold shrink-0">
            <Lightbulb className="h-5 w-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-foreground flex items-center gap-1.5">
                <span>💡 Góc Giải Ngố Thuật Ngữ IELTS Dành Cho Bạn</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Dễ hiểu 100%
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 flex items-center gap-1">
                  <Bookmark className="h-2.5 w-2.5 fill-current" />
                  <span>Có lưu & nghe đọc</span>
                </span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground truncate mt-0.5">
              Paraphrase là gì? Hard/Soft Keywords là gì? Bấm vào để xem giải thích bình dân kèm lưu vào Sổ Cần Nhớ!
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 px-3 py-1 rounded-xl bg-amber-500/15 shrink-0 ml-2"
        >
          <span>{isOpen ? "Thu gọn" : "Mở xem giải thích"}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-amber-500/20 space-y-4 bg-background/50 rounded-b-2xl">
          {/* Filter & Search & Bulk Save */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {[
                { id: "all", label: "Tất Cả" },
                { id: "reading", label: "📖 Reading" },
                { id: "listening", label: "🎧 Listening" },
                { id: "writing", label: "✍️ Writing" },
                { id: "speaking", label: "🎙️ Speaking" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedSkillFilter(tab.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer",
                    selectedSkillFilter === tab.id
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={handleSaveAllDisplayed}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border shrink-0 cursor-pointer",
                  allDisplayedSaved
                    ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30"
                    : "bg-amber-500 text-white hover:bg-amber-600 border-amber-600 shadow-sm"
                )}
                title="Lưu tất cả các thuật ngữ đang hiển thị vào Sổ Cần Nhớ"
              >
                {allDisplayedSaved ? (
                  <>
                    <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
                    <span>Đã lưu tất cả ({filteredJargon.length})</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>Lưu nhanh tất cả ({filteredJargon.length})</span>
                  </>
                )}
              </button>

              <div className="relative flex-1 sm:w-60">
                <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm thuật ngữ (ví dụ: paraphrase)..."
                  className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredJargon.map((jargon, idx) => {
              const bId = getJargonBookmarkId(jargon.term);
              const recallId = `recall_jargon_${jargon.term.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
              const targetSkill = (selectedSkillFilter !== "all" ? selectedSkillFilter : jargon.skills.find((s) => s !== "all") || "reading") as any;

              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl border border-border bg-card hover:border-amber-500/40 transition-all space-y-2.5 shadow-sm"
                >
                  {/* Card Header with Speaker and Bookmark Button */}
                  <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-black text-foreground flex items-center gap-1.5 flex-wrap">
                        <span className="text-amber-600 dark:text-amber-400">{jargon.term}</span>
                        {jargon.pronunciation && (
                          <span className="text-[10px] font-mono text-muted-foreground">
                            ({jargon.pronunciation})
                          </span>
                        )}
                      </h4>
                      <p className="text-xs font-bold text-foreground/85 mt-0.5">
                        👉 {jargon.shortDefinitionVi}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 hidden sm:inline-block">
                        {jargon.tag}
                      </span>

                      {/* TTS Audio Reader */}
                      <TheorySpeakerButton
                        text={`${jargon.term}. Định nghĩa: ${jargon.shortDefinitionVi}. Hiểu nôm na: ${jargon.studentAnalogyVi}. Ví dụ trong đề: ${jargon.realExampleVi}. Mẹo cho bạn: ${jargon.studentTipVi}`}
                        title={`Nghe giải thích thuật ngữ ${jargon.term}`}
                        size="icon-only"
                      />

                      {/* Dedicated Bookmark Button */}
                      <TheoryBookmarkButton
                        item={{
                          id: bId,
                          lessonId: "student_jargon_glossary",
                          lessonTitle: "Thuật Ngữ IELTS Dành Cho Học Sinh",
                          skill: targetSkill,
                          category: "rule",
                          categoryLabelVi: "Thuật Ngữ Cốt Lõi",
                          title: `${jargon.term}: ${jargon.shortDefinitionVi}`,
                          content: `🎯 Hiểu nôm na: ${jargon.studentAnalogyVi}\n\n🔍 Ví dụ thực tế: ${jargon.realExampleVi}\n\n💡 Mẹo cho học sinh: ${jargon.studentTipVi}`,
                          lessonHref: "/theory/saved-notes",
                        }}
                        label="Lưu"
                        savedLabel="Đã lưu ✓"
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Anti-peek Maskable Content */}
                  <TheoryMaskableContent
                    itemId={recallId}
                    itemTitle={`Thuật ngữ: ${jargon.term}`}
                    className="space-y-2.5"
                  >
                    {/* Analogy */}
                    <div className="p-2.5 rounded-lg bg-secondary/60 text-xs text-foreground/90 leading-relaxed">
                      <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">
                        🎯 Hiểu nôm na là gì?
                      </span>
                      {jargon.studentAnalogyVi}
                    </div>

                    {/* Real Example */}
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-foreground/90 leading-relaxed font-mono">
                      <span className="font-bold text-amber-700 dark:text-amber-300 block mb-0.5 font-sans">
                        🔍 Ví dụ thực tế trong đề thi:
                      </span>
                      <span className="whitespace-pre-line text-[11px] font-sans">
                        {jargon.realExampleVi}
                      </span>
                    </div>

                    {/* Student Tip */}
                    <div className="flex items-start gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" />
                      <span>
                        <strong className="font-bold">Mẹo cho học sinh:</strong> {jargon.studentTipVi}
                      </span>
                    </div>
                  </TheoryMaskableContent>

                  {/* Active Recall Test Box */}
                  <TheoryItemRecallBox
                    itemId={recallId}
                    itemTitle={`Thuật ngữ: ${jargon.term}`}
                    targetText={`${jargon.shortDefinitionVi}. ${jargon.studentAnalogyVi}. Mẹo: ${jargon.studentTipVi}`}
                    lessonTitle="Thuật Ngữ IELTS Dành Cho Học Sinh"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
