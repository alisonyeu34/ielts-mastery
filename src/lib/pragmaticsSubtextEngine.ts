/**
 * Academic Pragmatics, Implicit Stance & Skepticism Decoder Engine (Step 80)
 * Unlocks Reading Passage 3 & Listening Section 3/4 Implicit Pragmatic Traps
 */

export type PragmaticTrapType =
  | "praise_faint_damning"
  | "litotes_double_negative"
  | "rhetorical_skepticism"
  | "reluctant_concession"
  | "genuine_endorsement";

export interface PragmaticMarkerPattern {
  trapType: PragmaticTrapType;
  regex: RegExp;
  label: string;
  toneDescription: string;
  extractIronicMarker: (match: string) => string;
}

export interface PragmaticAnalysisResult {
  hasPragmaticSubtext: boolean;
  trapType: PragmaticTrapType;
  detectedMarker: string;
  toneCategory: "Sarcastic / Mocking" | "Nuanced Skepticism" | "Faint Praise Damning" | "Reluctant Concession" | "Direct Endorsement" | "Neutral";
  literalMeaning: string;
  pragmaticSubtext: string;
  cambridgeExamTip: string;
  confidence: number;
}

export const PRAGMATIC_MARKERS: PragmaticMarkerPattern[] = [
  {
    trapType: "praise_faint_damning",
    regex: /\b(audacious|imaginative|ambitious|novel|intriguing|pioneering)\b.*?\b(conspicuous by its absence|remains unproven|fatally flawed|devoid of empirical|lacks rigorous|crumbles under scrutiny)\b/i,
    label: "Praise-Faint-Damning Trap (Khen Đãi Bôi Để Hạ Bệ)",
    toneDescription: "Tác giả dùng từ hoa mỹ ở vế đầu chỉ để tạo đà đập tan và bác bỏ hoàn toàn tính xác thực của nghiên cứu ở vế sau.",
    extractIronicMarker: (m) => m
  },
  {
    trapType: "litotes_double_negative",
    regex: /\b(not (entirely|completely|wholly) (unfeasible|impossible|implausible|unfounded|unreasonable)|hardly (uncontroversial|insignificant|negligible)|scarcely (inconsequential|unambiguous)|cannot be deemed (negligible|unfounded))\b/i,
    label: "Litotes & Double Negative (Phủ Định Kép Giảm Nhẹ)",
    toneDescription: "Sử dụng phủ định kép để thể hiện sự dè dặt học thuật (Academic Understatement) hoặc chỉ trích kín đáo.",
    extractIronicMarker: (m) => m
  },
  {
    trapType: "rhetorical_skepticism",
    regex: /\b(so-called|purported|ostensibly|supposed(ly)?|alleged(ly)?|professes to|superficially attractive|leaves much to be desired|hardly compelling)\b|"[^"]{3,25}"/i,
    label: "Rhetorical Skepticism & Scare Quotes (Hoài Nghi Tu Từ & Ngoặc Kép Mỉa Mai)",
    toneDescription: "Tác giả dùng từ định kiến hoặc đóng mở ngoặc kép để ngầm báo hiệu lý thuyết này là 'hữu danh vô thực' hoặc thiếu độ tin cậy.",
    extractIronicMarker: (m) => m
  },
  {
    trapType: "reluctant_concession",
    regex: /\b(granted that|admittedly|while one might concede|to be fair|it is true that).*?\b(nevertheless|nonetheless|the overarching reality|fails to account for|overshadowed by)\b/i,
    label: "Reluctant Concession (Nhượng Bộ Miễn Cưỡng)",
    toneDescription: "Thừa nhận một điểm nhỏ mang tính hình thức trước khi tung ra luận cứ trọng tâm để phản bác toàn bộ tiền đề.",
    extractIronicMarker: (m) => m
  }
];

export function analyzePragmaticSubtext(text: string): PragmaticAnalysisResult {
  const clean = text.trim();
  if (!clean) {
    return {
      hasPragmaticSubtext: false,
      trapType: "genuine_endorsement",
      detectedMarker: "",
      toneCategory: "Neutral",
      literalMeaning: "Chưa có nội dung phân tích.",
      pragmaticSubtext: "Chưa có nội dung phân tích.",
      cambridgeExamTip: "Chọn một câu văn hoặc đoạn hội thoại để quét hàm ý ngữ dụng.",
      confidence: 0
    };
  }

  for (const pattern of PRAGMATIC_MARKERS) {
    const match = clean.match(pattern.regex);
    if (match) {
      const markerText = match[0];

      if (pattern.trapType === "praise_faint_damning") {
        return {
          hasPragmaticSubtext: true,
          trapType: "praise_faint_damning",
          detectedMarker: markerText,
          toneCategory: "Faint Praise Damning",
          literalMeaning: "Nghiên cứu rất táo bạo/đầy tham vọng nhưng dữ liệu thực nghiệm còn vắng bóng.",
          pragmaticSubtext: "Tác giả thực chất coi nghiên cứu này là hoàn toàn vô căn cứ và không đáng tin cậy trong giới học thuật.",
          cambridgeExamTip: "BẪY CAMBRIDGE: Đáp án đúng sẽ là 'The author is skeptical of the methodology', KHÔNG PHẢI 'The author praises the creativity'.",
          confidence: 95
        };
      }

      if (pattern.trapType === "litotes_double_negative") {
        return {
          hasPragmaticSubtext: true,
          trapType: "litotes_double_negative",
          detectedMarker: markerText,
          toneCategory: "Nuanced Skepticism",
          literalMeaning: "Không hoàn toàn bất khả thi / Không hẳn là không gây tranh cãi.",
          pragmaticSubtext: "Tác giả ngầm chỉ ra sự việc cực kỳ khó khăn hoặc đang là tâm điểm tranh cãi gay gắt, nhưng diễn đạt giảm nhẹ.",
          cambridgeExamTip: "CHÚ Ý: 'Not entirely unfeasible' mang nghĩa 'cực kỳ gian nan' chứ không phải 'dễ dàng thực hiện'.",
          confidence: 90
        };
      }

      if (pattern.trapType === "rhetorical_skepticism") {
        return {
          hasPragmaticSubtext: true,
          trapType: "rhetorical_skepticism",
          detectedMarker: markerText,
          toneCategory: "Sarcastic / Mocking",
          literalMeaning: "Cái gọi là 'đột phá' / Về mặt bề nổi có vẻ hấp dẫn.",
          pragmaticSubtext: "Tác giả đang dùng giọng điệu mỉa mai học thuật để hạ bệ tuyên bố phóng đại của các nhà nghiên cứu.",
          cambridgeExamTip: "TỪ KHÓA BẪY: Từ 'so-called' và dấu ngoặc kép trích dẫn là tín hiệu mạnh mẽ nhất cho thấy tác giả KHÔNG TIN vào tuyên bố đó.",
          confidence: 92
        };
      }

      if (pattern.trapType === "reluctant_concession") {
        return {
          hasPragmaticSubtext: true,
          trapType: "reluctant_concession",
          detectedMarker: markerText,
          toneCategory: "Reluctant Concession",
          literalMeaning: "Thừa nhận rằng điều X có lý, tuy nhiên thực tế là Y.",
          pragmaticSubtext: "Tác giả chấp nhận điều X chỉ là tiểu tiết, lập trường cốt lõi của tác giả nằm trọn vẹn ở vế Y phía sau liên từ phản biện.",
          cambridgeExamTip: "ĐÁP ÁN KHẢO THÍ: Luôn bám sát mệnh đề sau 'nevertheless/nonetheless' để tìm quan điểm chính xác của tác giả.",
          confidence: 88
        };
      }
    }
  }

  // Fallback: Genuine or Neutral
  return {
    hasPragmaticSubtext: false,
    trapType: "genuine_endorsement",
    detectedMarker: "",
    toneCategory: "Direct Endorsement",
    literalMeaning: "Phát biểu trực tiếp không chứa các yếu tố mỉa mai hay hoài nghi tu từ ẩn.",
    pragmaticSubtext: "Nghĩa đen của câu trùng khớp với ý định giao tiếp thực tế của tác giả.",
    cambridgeExamTip: "Đối với các câu mang nghĩa trực tiếp, có thể áp dụng kỹ thuật định vị từ khóa thông thường.",
    confidence: 80
  };
}
