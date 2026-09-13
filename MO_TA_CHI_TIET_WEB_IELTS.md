# BẢN ĐẶC TẢ CHI TIẾT HỆ THỐNG NỀN TẢNG IELTS MASTERY 7.5
## (DỰ ÁN: IELTS-FORME — LỘ TRÌNH 165 NGÀY TỰ ĐỘNG)

---

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)
- **Tên dự án:** IELTS Mastery 7.5 (Tên mã: `ielts-forme`)
- **Định vị sản phẩm:** Nền tảng huấn luyện cá nhân hóa chuyên sâu, đưa người học từ **Band 4.5 lên Band 7.5+** trong lộ trình **165 Ngày (tương đương 5.5 tháng)**.
- **Triết lý đào tạo cốt lõi:** *"Dạy Kỹ Năng Trước — Luyện Tập Sau"* kết hợp với *"Phản Xạ Không Cần Dịch / Không Phụ Thuộc IPA"*.
- **Mục tiêu hiệu năng:** Tải trang siêu tốc (Sub-10ms), hoạt động mượt mà ngoại tuyến (Offline-First), tương thích hoàn hảo trên máy tính và điện thoại thông minh (iPhone/Android).

---

## 2. KIẾN TRÚC LỘ TRÌNH HỌC TẬP 165 NGÀY (ROADMAP TIMELINE)

Lộ trình được thiết kế chi tiết theo từng ngày, khởi động từ mốc **14/09/2026** và chia thành **3 Giai đoạn (Phases)** có cơ chế khóa/mở chốt chặn (Gatekeeper Milestones):

### Phase 1: Cứu Ngữ Pháp Nền Tảng & Xây Gốc Phản Xạ (Ngày 1 $\rightarrow$ Ngày 31)
- **Mục tiêu:** Quét sạch 14 trụ cột ngữ pháp học thuật, chuẩn hóa phát âm cốt lõi, xóa bỏ thói quen dịch ngầm từ tiếng Việt sang tiếng Anh.
- **Thời lượng học:** Ngồi bàn 10h/ngày $\rightarrow$ Thực học 7h (chia làm 4 ca x 105 phút) + 3h nghỉ ngơi hồi phục.
- **Cấu trúc 4 ca học mỗi ngày:**
  - **Ca 1 (105m) — Reading:** Học kỹ năng (Skimming 90s, Scanning 2 tầng từ khóa) $\rightarrow$ Đọc hiểu 2 cột & Nạp từ vựng.
  - **Ca 2 (105m) — Listening:** Học quy trình 30s đọc trước câu hỏi $\rightarrow$ Nghe bắt số & Chính tả (Dictation Cam 11-18).
  - **Ca 3 (105m) — Writing:** Học cấu trúc ngữ pháp nâng cao $\rightarrow$ Thực hành lắp ráp câu chuẩn Band 7.5+ tại Sentence Lab.
  - **Ca 4 (105m) — Speaking:** Học kỹ thuật Echo Shadowing $\rightarrow$ Phản xạ Part 1 không IPA, luyện ngữ điệu tự nhiên.

### Phase 2: Nâng Cao Band Điểm & Đột Phá Kỹ Năng (Ngày 32 $\rightarrow$ Ngày 100)
- **Mục tiêu:** Chinh phục các dạng đề bẫy khó nhất của IELTS:
  - *Reading:* Dạng True/False/Not Given, Matching Headings, Đọc hiểu bài Passage 3 phân tích triết học/khoa học nhận thức.
  - *Listening:* Nghe hội thoại tranh luận đồng thuận (Consensus S3), Nghe bài giảng tốc độ cao (High-rate Lecture S4), Nghe đa ngữ điệu (Multi-accent).
  - *Writing:* Tư duy lập luận Toulmin, mô hình viết đoạn PEEL, cấu trúc bài Task 1 biểu đồ hỗn hợp & bản đồ quy trình (Process/Map).
  - *Speaking:* Kỹ thuật cung điện ký ức (Memory Palace), Nói giảm nói tránh học thuật (Hedging), Tranh biện Socratic (Socratic Debate).

### Phase 3: Thực Chiến Phòng Thi & Tối Ưu Tốc Độ (Ngày 101 $\rightarrow$ Ngày 165)
- **Mục tiêu:** Rèn luyện áp lực thời gian thực tế, thi thử đề Cambridge chuẩn, kiểm toán mức độ sẵn sàng thi thật (Readiness Audit).

---

## 3. CÁC MODULE CHỨC NĂNG & "VŨ KHÍ SĂN BAND 7.5+"

### 3.1. Bảng Ca Học Ngày Tự Do Tích Lũy (`DailyTaskDrawer.tsx`)
- **Tự do tích hoàn thành (Manual Checkbox):** Học sinh trực tiếp click vào checkbox hoặc nút "Tích Xong" để ghi nhận hoàn thành bài mà không bị khóa cứng hay ràng buộc áp lực.
- **Thanh tiến độ trực quan:** Tự động tính toán tỷ lệ hoàn thành ngày (0/4 $\rightarrow$ 4/4 tương ứng 0% $\rightarrow$ 100%).
- **Lối tắt thông minh:** Cung cấp 2 nút bấm chuyển hướng trực tiếp: *"Học Kỹ Năng"* (vào bài lý thuyết) và *"Luyện Tập"* (vào phòng thực hành tương ứng).

### 3.2. Hệ Thống Lý Thuyết Tương Tác Chuyên Sâu (`/theory`)
- Hơn 14 bài giảng Ngữ pháp chuyên sâu (Present Simple, Past Simple, Passive Voice, Relative Clauses, Conditionals...).
- Mỗi bài gồm 4 chặng:
  1. *Khái niệm bản chất (First-Principles).*
  2. *Bẫy của giám khảo chấm thi (Examiner Trap).*
  3. *Mổ xẻ ví dụ Band 8.5 (Band 8.5 Dissection).*
  4. *Cổng trắc nghiệm mở khóa (Gateway Quiz).*
- **Ô tự viết lại nhớ bài (`TheoryItemRecallBox`):** Học sinh gõ lại kiến thức để khắc sâu trí nhớ (tự luyện tập tự nguyện, không ép buộc).

### 3.3. Phòng Thực Hành Đa Kỹ Năng (`/practice`)
- **Listening Studio:**
  - *Dictation Cam 11-18:* Nghe chép chính tả từng câu, đối soát sai sót theo thời gian thực.
  - *Acoustic Chaos:* Luyện nghe trong môi trường nhiễu âm thanh giả lập.
- **Speaking Studio:**
  - *Shadowing Recorder:* Thu âm so sánh sóng âm (Waveform), chấm phát âm và ngữ điệu.
  - *Pitch Contour:* Theo dõi cao độ giọng nói để tránh nói đều đều (monotone).
- **Writing Clinic:**
  - *Sentence Writing:* Rèn lắp ráp câu phức, câu đảo ngữ, mệnh đề quan hệ rút gọn.
  - *PEEL & Toulmin Lab:* Lắp ráp đoạn văn lập luận chặt chẽ logic.
- **Reading Split-View:**
  - Giao diện 2 cột chuẩn thi máy (Computer-delivered IELTS): Văn bản bên trái, câu hỏi bên phải, highlight từ khóa tức thì.

### 3.4. Ngân Hàng Lỗi Sai Thông Minh (`/error-bank`)
- Tự động thu thập mọi câu làm sai trong quá trình luyện tập.
- Thuật toán lặp lại ngắt quãng (FSRS / Spaced Repetition) định kỳ đưa câu hỏi quay trở lại ôn tập cho đến khi học sinh nắm vững bản chất.

### 3.5. Trợ Lý AI Gia Sư Sư Phạm 24/7 (`GlobalAIAssistant.tsx`)
- Nút AI nổi ở góc dưới màn hình, sẵn sàng hỗ trợ giải đáp từ vựng, sửa lỗi ngữ pháp, dịch ngữ cảnh và hướng dẫn phương pháp làm bài.

---

## 4. KIẾN TRÚC KỸ THUẬT & HẠ TẦNG CÔNG NGHỆ

### 4.1. Công Nghệ Nền Tảng (Frontend Stack)
- **Framework:** Next.js 14.2 (App Router), React 18, TypeScript.
- **Styling:** Tailwind CSS, Lucide Icons, Dark/Light Mode qua `next-themes`.
- **Cơ sở dữ liệu cục bộ (Offline Database):** Dexie.js (IndexedDB) lưu trữ toàn bộ tiến độ học, từ vựng, lỗi sai và ghi chú ngay trên trình duyệt mà không cần đăng nhập phức tạp.

### 4.2. Tối Ưu Backend Độ Trễ Thấp (Sub-10ms Server)
- **Máy chủ chuyên dụng `server.js`:**
  - Ưu tiên phân giải IPv4 (`dns.setDefaultResultOrder('ipv4first')`) loại bỏ trễ 100-300ms do phân giải IPv6 trên Windows.
  - Socket TCP NoDelay (`req.socket.setNoDelay(true)`) gửi gói tin ngay lập tức.
  - Cơ chế HTTP Keep-Alive 65s tái sử dụng kết nối.
- **Bộ nhớ đệm RAM hai lớp (`serverCache.ts`):** Pre-warming nạp sẵn hơn 500 từ vựng học thuật + Negative Caching ghi nhớ truy vấn lỗi.
- **Hỗ trợ Dual-Port:** Chạy song song trên cả cổng chính 3000 và cổng phụ 3001.

### 4.3. Đóng Gói Thành Ứng Dụng Di Động (PWA Cho iPhone X & Android)
- **Web App Manifest (`public/manifest.json`):** Cung cấp icon Retina 180x180, 192x192, 512x512.
- **Chế độ Standalone Toàn Màn Hình:** Ẩn hoàn toàn thanh công cụ Safari/Chrome khi mở từ màn hình chính.
- **Khử lỗi tai thỏ iPhone X:** Cấu hình `viewportFit: "cover"` và các lớp CSS an toàn (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`).
- **Service Worker (`public/sw.js`):** Lưu cache tài nguyên giao diện, giúp mở ứng dụng nhanh chóng kể cả khi mạng 4G chập chờn.
- **Triển khai Cloud 24/7:** Đã liên kết GitHub (`alisonyeu34/ielts-mastery`) và xuất bản thành công lên nền tảng đám mây Vercel.
