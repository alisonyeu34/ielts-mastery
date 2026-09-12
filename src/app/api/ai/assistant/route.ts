import { NextRequest, NextResponse } from "next/server";
import { aiAssistantCache, MemoryLRUCache } from "@/lib/serverCache";

export interface AssistantChatMessage {
  role: "user" | "assistant";
  content: string;
  image?: string;
  timestamp?: number;
}

const SYSTEM_INSTRUCTION = `Bạn là "IELTS Master AI Tutor" — Trợ lý ảo gia sư học thuật IELTS cao cấp (Band 8.5+ Mentor) của nền tảng IELTS For Me.
Phong cách giao tiếp của bạn:
1. Thân thiện, gần gũi, ấm áp, kiên nhẫn và giải thích cực kỳ dễ hiểu bằng tiếng Việt cho học sinh Việt Nam.
2. Tuyệt đối không dùng những từ ngữ chuyên môn khô khan mà không giải thích. Khi nhắc tới các thuật ngữ như Paraphrase, Skimming, Scanning, Collocation, Coherence, Distractor, Nominalization, Hedging... bạn luôn mở ngoặc giải thích nôm na bằng đời sống thường nhật để học sinh hiểu ngay.
3. Khi học sinh GỬI ẢNH (Ảnh chụp đề thi, bài đọc, biểu đồ Task 1, bài viết tay, câu hỏi trắc nghiệm):
   - Đọc kỹ và bóc tách toàn bộ chữ, số liệu, câu hỏi xuất hiện trong ảnh.
   - Dịch nghĩa và phân tích ngữ pháp, từ vựng cốt lõi.
   - Chỉ ra bẫy của người ra đề (Examiner Traps) nếu có.
   - Cung cấp đáp án chính xác hoặc phương án nâng cấp lên Band 7.5 - 8.0 kèm giải thích chi tiết từng bước.
4. Trình bày câu trả lời rõ ràng: sử dụng gạch đầu dòng, in đậm từ khóa quan trọng, có phần "🎯 Mẹo cho học sinh" hoặc "💡 Chú ý bẫy" ở cuối.
`;

function generateLocalFallbackResponse(query: string, hasImage: boolean): string {
  const q = query.toLowerCase();

  if (hasImage) {
    return `### 📸 Đã nhận diện hình ảnh của bạn!

Dựa trên hình ảnh bạn vừa gửi, dưới đây là phân tích chi tiết từ Gia sư IELTS:

1. **Phân tích nội dung đề thi / tài liệu:**
   - Nếu đây là **Bài tập Reading / Trắc nghiệm:** Hãy chú ý xác định **Từ khóa Cứng** (Tên riêng, mốc năm, số liệu) để tìm vị trí câu hỏi trong 5 giây, sau đó đối soát **Từ khóa Mềm** (động từ, tính từ) để bắt cặp từ đồng nghĩa (Paraphrase).
   - Nếu đây là **Biểu đồ Task 1:** Tuyệt đối đừng liệt kê từng năm một (tránh bẫy *Data Dumping*). Hãy viết đoạn **Overview (Tổng quan)** nêu 1 xu hướng lớn nhất (tăng/giảm) và đối tượng luôn dẫn đầu.
   - Nếu đây là **Bài viết Writing / Đề luận:** Hãy xác lập câu **Thesis Statement (Luận đề)** dứt khoát ngay tại Mở bài và triển khai thân bài theo cấu trúc **PEEL** (Point ➔ Explain ➔ Example ➔ Link).

2. **💡 Lời khuyên tức thì cho bạn:**
   - Để kích hoạt khả năng bóc tách ảnh chi tiết bằng AI siêu thông minh, bạn có thể thiết lập GEMINI_API_KEY trong file .env.
   - Bạn có thể đặt câu hỏi cụ thể hơn về từ vựng nào trong ảnh mà bạn chưa hiểu để mình dịch ngay nhé!`;
  }

  if (q.includes("paraphrase")) {
    return `### 💡 Paraphrase là gì? Giải thích siêu dễ hiểu:

**Paraphrase** (phát âm: *pe-rờ-phrâyz*) hiểu nôm na là trò chơi **"đổi chữ nhưng giữ nguyên nghĩa"** của người ra đề thi IELTS!

* **Tại sao giám khảo lại dùng?** Để thử xem bạn có thực sự hiểu nghĩa hay chỉ chăm chăm đi tìm đúng từng mặt chữ của câu hỏi trong bài đọc.
* **Ví dụ thực tế:**
  - Trong câu hỏi đề ghi: *"The volume of cars increased"* (Lượng xe ô tô tăng lên).
  - Vào bài đọc đề sẽ đổi thành: *"Automobile sales experienced a sharp rise"* hoặc *"witnessed a significant surge"*.
* **🎯 Mẹo cho bạn:** Đừng bao giờ tìm đúng từng chữ của câu hỏi trong bài đọc! Hãy chuẩn bị tinh thần tìm **"từ đồng nghĩa"** của nó.`;
  }

  if (q.includes("not given") || q.includes("false") || q.includes("tfng")) {
    return `### 🔎 Phân biệt TRUE, FALSE và NOT GIVEN trong 1 phút:

1. **TRUE = Giống 100%:** Bài đọc nói A, câu hỏi cũng nói A (qua từ đồng nghĩa).
2. **FALSE = Ngược 100%:** Bài đọc nói A, nhưng câu hỏi lại nói B mâu thuẫn đối lập trực tiếp với A.
3. **NOT GIVEN = Đề không nhắc tới:** Bài đọc không hề có thông tin này, hoặc chỉ nói chung chung không đủ căn cứ để kết luận.

⚠️ **Cảnh giác:** Học sinh hay mắc bệnh *"Thám tử Conan"* suy diễn ngoài đời: Bài đọc chỉ bảo *"Học sinh đạt điểm cao"*, câu hỏi bảo *"Thầy giáo dạy rất giỏi"*. Dù ngoài đời điểm cao thì thầy hay giỏi, nhưng bài đọc KHÔNG NHẮC đến thầy giáo ➔ Đáp án bắt buộc phải là **NOT GIVEN**!`;
  }

  if (q.includes("task 1") || q.includes("overview")) {
    return `### 📊 Bí kíp ghi điểm tuyệt đối Writing Task 1:

1. **Đoạn Mở bài (Introduction):** Paraphrase đề bài trong 1 câu (nói lại đề bài bằng từ đồng nghĩa).
2. **Đoạn Tổng quan (Overview) — Quan trọng nhất:**
   - Giống như bạn ngồi trên máy bay nhìn xuống toàn cảnh: Không đếm từng cái cây mà chỉ nhìn thấy con sông uốn lượn và khu rừng xanh.
   - Nêu **1 xu hướng chung** (Cái gì nhìn chung tăng, cái gì giảm?) và **1 đối tượng nổi bật nhất** (Ai luôn dẫn đầu?).
   - *Thiếu đoạn này, bài viết tối đa chỉ được Band 5.0!*
3. **Thân bài 1 & 2:** Chia nhóm số liệu hợp lý, tránh bẫy *"Data Dumping"* (kê khai từng năm một như đọc hóa đơn).`;
  }

  if (q.includes("speaking") || q.includes("part 1")) {
    return `### 🎙️ Công thức "Kéo dài 3 câu" phá tan bẫy cộc lốc Speaking:

Khi giám khảo hỏi: *"Do you like sports?"*
* **Cách trả lời Band 5.0:** *"Yes, I like sports because it is good for health."* (Hết câu, im bặt nhìn giám khảo ➔ Rơi vào ngõ cụt!)
* **Công thức 3 câu Band 7.5+:**
  1. **Câu 1 (Trả lời trực tiếp):** *"To be completely honest, I'm quite passionate about swimming."*
  2. **Câu 2 (Kể chuyện quá khứ):** *"In the past, I barely had any time for exercise due to intense schoolwork..."*
  3. **Câu 3 (So sánh với hiện tại):** *"...but recently, I've made it a habit to hit the local pool twice a week. It really refreshes my mind."*

Nói như đang tâm sự thoải mái với bạn bè là giám khảo chấm điểm rất cao!`;
  }

  return `Chào bạn! Mình là **IELTS Master AI Tutor** luôn đồng hành cùng bạn 24/7.

Bạn có thể hỏi mình bất kỳ điều gì:
- 💡 **Giải thích thuật ngữ:** Paraphrase, Skimming, Scanning, Collocation, Distractor...
- 📸 **Gửi ảnh bài tập / đề thi:** Bạn chỉ cần bấm vào biểu tượng máy ảnh hoặc dán ảnh (Ctrl + V), mình sẽ đọc chữ và phân tích cặn kẽ từng câu cho bạn.
- ✍️ **Chấm và sửa bài:** Gửi một đoạn văn bạn vừa viết, mình sẽ chỉ ra lỗi sai và nâng cấp lên Band 7.5+.
- 🎧 **Bẫy trong Listening & Reading:** Cách nhận diện bẫy quay xe (Self-correction) hay bẫy đồng thuận giả.

Hãy gõ câu hỏi hoặc gửi ảnh để mình hỗ trợ bạn ngay nhé! 🎯`;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const { message = "", imageBase64 = "", history = [] } = body;

    const trimmedMsg = message.trim();
    if (!trimmedMsg && !imageBase64) {
      return NextResponse.json(
        { error: "Vui lòng nhập câu hỏi hoặc đính kèm ảnh." },
        { status: 400 }
      );
    }

    const hasImage = Boolean(imageBase64 && imageBase64.length > 50);

    // 1. Check in-memory LRU Cache for pure text questions (< 1ms)
    let cacheKey = "";
    if (!hasImage && trimmedMsg) {
      cacheKey = MemoryLRUCache.hashKey(trimmedMsg.toLowerCase());
      const cached = aiAssistantCache.get(cacheKey);
      if (cached) {
        const duration = Date.now() - startTime;
        return NextResponse.json(
          {
            reply: cached.reply,
            source: cached.source,
            durationMs: duration,
          },
          {
            headers: {
              "X-Cache": "HIT",
              "X-Response-Time": `${duration}ms`,
            },
          }
        );
      }
    }

    // 2. Call Gemini 1.5 Flash Vision with strict 3500ms timeout
    if (process.env.GEMINI_API_KEY) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const parts: any[] = [
          { text: `${SYSTEM_INSTRUCTION}\n\n[YÊU CẦU CỦA HỌC SINH]: ${trimmedMsg || "Hãy đọc và phân tích kỹ nội dung trong hình ảnh này giúp em."}` }
        ];

        // If image is attached, parse mimeType and pure base64 data
        if (hasImage) {
          let mimeType = "image/jpeg";
          let pureBase64 = imageBase64;

          const match = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            mimeType = match[1];
            pureBase64 = match[2];
          }

          parts.unshift({
            inlineData: {
              mimeType,
              data: pureBase64,
            },
          });
        }

        const aiResponse = await fetch(geminiUrl, {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts,
              },
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1200,
            },
          }),
        });

        clearTimeout(timeoutId);

        if (aiResponse.ok) {
          const data = await aiResponse.json();
          const responseText =
            data.candidates?.[0]?.content?.parts?.[0]?.text || "";

          if (responseText.trim().length > 0) {
            const duration = Date.now() - startTime;
            const source = hasImage ? "gemini_multimodal_vision" : "gemini_flash";

            if (cacheKey) {
              aiAssistantCache.set(cacheKey, { reply: responseText, source });
            }

            return NextResponse.json({
              reply: responseText,
              source,
              durationMs: duration,
            }, {
              headers: {
                "X-Cache": "MISS",
                "X-Response-Time": `${duration}ms`,
              },
            });
          }
        }
      } catch (geminiError: any) {
        clearTimeout(timeoutId);
        console.warn("Gemini Assistant call timed out or failed, switching to local diagnostic mentor:", geminiError?.message || geminiError);
      }
    }

    // 3. Local Fast-Path Diagnostic Mentor (< 1ms)
    const fallbackText = generateLocalFallbackResponse(trimmedMsg, hasImage);
    const duration = Date.now() - startTime;
    const source = "local_diagnostic_mentor";

    if (cacheKey) {
      aiAssistantCache.set(cacheKey, { reply: fallbackText, source });
    }

    return NextResponse.json({
      reply: fallbackText,
      source,
      durationMs: duration,
    }, {
      headers: {
        "X-Response-Time": `${duration}ms`,
        "X-Cache": "LOCAL_FAST",
      },
    });
  } catch (error: any) {
    console.error("Error in AI assistant route:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi trao đổi với trợ lý ảo. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
