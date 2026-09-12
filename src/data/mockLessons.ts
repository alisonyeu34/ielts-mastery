import { TheoryLesson } from "@/types/database";

export const MOCK_THEORY_LESSONS: TheoryLesson[] = [
  {
    id: "lesson_grammar_01",
    phase: 1,
    skill: "grammar",
    title: "Bản chất 12 Thì trong IELTS & 4 Thì Cốt Lõi (Present, Past, Perfect & Future)",
    orderIndex: 1,
    estimatedMinutes: 20,
    isCompleted: false,
    conceptMarkdown: `### 1. Bản chất của Trục Thời gian & Thể (Aspect) trong IELTS
Ngữ pháp tiếng Anh không đơn thuần là "công thức chia động từ", mà là **công cụ truyền tải góc nhìn thời gian (Time) và tính chất hoàn tất của hành động (Aspect)**.

Trong bài thi IELTS (đặc biệt là Writing & Speaking), 90% số câu văn xoay quanh **4 thì nòng cốt**:

1. **Hiện tại đơn (Present Simple)**:
   - *Bản chất*: Chân lý, quy luật phổ quát, số liệu của biểu đồ không có mốc thời gian (Static charts), hoặc giới thiệu nghiên cứu tổng quan.
   - *Ví dụ*: *"The bar chart compares the percentage of renewable energy..."*

2. **Quá khứ đơn (Past Simple)**:
   - *Bản chất*: Mọi sự kiện, biến động số liệu đã bắt đầu và kết thúc trọn vẹn trong quá khứ.
   - *Ví dụ*: *"Between 2000 and 2015, car ownership surged by 45%."*

3. **Hiện tại hoàn thành (Present Perfect)**:
   - *Bản chất*: Cầu nối giữa quá khứ và hiện tại. Nhấn mạnh **hệ quả kéo dài đến nay** hoặc các biến động bắt đầu từ quá khứ đến thời điểm hiện tại (*"Over the past decade..."*).
   - *Ví dụ*: *"Urbanization has exerted immense pressure on public infrastructure."*

4. **Cấu trúc Dự báo Tương lai (Future Projections)**:
   - *Bản chất*: Trong IELTS Academic Writing Task 1, **tuyệt đối không dùng "will" khẳng định 100%** cho các mốc năm tương lai (VD: 2035, 2050), mà bắt buộc sử dụng **ngôn ngữ phỏng đoán học thuật (Hedging)**:
   - *Cấu trúc vàng*: \`is/are projected to / predicted to / anticipated to + V\`.`,
    trapAnalysis: `### ⚠️ Vạch trần 3 Bẫy Khảo thí Kinh điển về Thì

#### ❌ Bẫy 1: Nhầm lẫn giữa Past Simple ("in 2010") vs Present Perfect ("since 2010")
- **Tư duy Band 5.0 (Sai)**: *"The price has increased sharply in 2010."* (Dùng HTHT với mốc thời gian đã chấm dứt hoàn toàn trong quá khứ).
- **Chuẩn Band 7.5+**: *"The price increased sharply in 2010."* HOẶC *"The price has increased sharply since 2010."*

---

#### ❌ Bẫy 2: Dùng thì Quá khứ đơn cho số liệu tương lai trong cùng biểu đồ
- **Bẫy đề thi**: Biểu đồ hiển thị dữ liệu từ 2010 đến 2040. Thí sinh theo thói quen dùng 100% thì quá khứ đơn cho cả giai đoạn sau 2026.
- **Cách xử lý chuẩn**:
  - Giai đoạn 2010 - 2025: Dùng **Past Simple** (*experienced an upward trend*).
  - Giai đoạn 2026 - 2040: Dùng **Future Projection** (*is expected to continue its upward trajectory*).

---

#### ❌ Bẫy 3: Lạm dụng Present Continuous cho xu hướng tổng quát
- **Tư duy sai**: Viết trong bài Task 1: *"The population is growing fast."*
- **Chuẩn xác**: Trong biểu đồ tĩnh hoặc tóm tắt xu hướng tổng quan, dùng thì Hiện tại đơn: *"The population exhibits steady growth."*`,
    band8Sample: `### 💎 Mổ xẻ Bài Mẫu Band 8.5+ (Deconstruction)

#### Ngữ cảnh Đề bài (Writing Task 1):
*"The line graph shows global carbon emissions from 2000 to 2040."*

\`\`\`text
[Band 5.5]:
"In 2000, carbon emissions were 20 gigatons. Then it increased and now it is 35 gigatons. In 2040 it will be 50 gigatons."

[Band 8.5+ Deconstruction]:
"In 2000, global carbon output stood at approximately 20 gigatons. Over the subsequent two decades, this figure has witnessed a substantial escalation, reaching 35 gigatons at present. Looking ahead, emissions are projected to peak at nearly 50 gigatons by 2040 before stabilizing."
\`\`\`

#### 🔍 Phân tích Kỹ thuật Nâng Band:
1. **\`stood at approximately 20 gigatons\`**: Dùng Quá khứ đơn chính xác cho mốc 2000.
2. **\`has witnessed a substantial escalation\`**: Hiện tại hoàn thành kết hợp danh từ hóa (Nominalization) mô tả xu hướng kéo dài đến hiện tại.
3. **\`are projected to peak at\`**: Dự báo tương lai chuẩn học thuật thay thế cho cấu trúc non nớt "will be".`,
    quiz: [
      {
        id: "q1_tenses",
        question: "Biểu đồ đường thể hiện tỷ lệ sử dụng năng lượng mặt trời từ năm 2005 đến năm 2022. Câu nào sau đây sử dụng thì và cấu trúc học thuật chuẩn nhất?",
        options: [
          "Solar energy consumption has risen significantly between 2005 and 2022.",
          "Solar energy consumption witnessed a significant rise over the 17-year period from 2005 to 2022.",
          "Solar energy consumption is rising significantly between 2005 and 2022.",
          "Solar energy consumption will rise significantly between 2005 and 2022.",
        ],
        correctIndex: 1,
        explanation: "Khoảng thời gian 2005 - 2022 hoàn toàn chấm dứt trong quá khứ, nên bắt buộc dùng Quá khứ đơn ('witnessed a significant rise'). Phương án A sai vì dùng Present Perfect với khoảng thời gian đã kết thúc.",
      },
      {
        id: "q2_tenses",
        question: "Khi biểu đồ mô tả số liệu dự đoán đến năm 2050, cấu trúc nào sau đây đạt chuẩn Academic Band 7.5+?",
        options: [
          "The proportion of electric vehicles will definitely become 80% by 2050.",
          "The proportion of electric vehicles is going to reach 80% by 2050.",
          "The proportion of electric vehicles is anticipated to reach approximately 80% by 2050.",
          "The proportion of electric vehicles reached 80% by 2050.",
        ],
        correctIndex: 2,
        explanation: "Trong IELTS Academic, dữ liệu tương lai phải dùng ngôn ngữ dự báo thận trọng (Hedging) như 'is anticipated to / projected to'. Không dùng 'will definitely' (quá khẳng định) hay 'is going to' (văn nói).",
      },
      {
        id: "q3_tenses",
        question: "Chọn câu viết đúng khi diễn đạt xu hướng bắt đầu từ 10 năm trước và vẫn đang tiếp diễn đến hiện tại:",
        options: [
          "Over the past decade, online education expanded rapidly.",
          "Over the past decade, online education has expanded rapidly.",
          "Since ten years, online education expanded rapidly.",
          "In the past decade, online education will expand rapidly.",
        ],
        correctIndex: 1,
        explanation: "Cụm 'Over the past decade' (trong suốt thập kỷ qua kéo đến nay) đòi hỏi thì Hiện tại hoàn thành (Present Perfect: 'has expanded'). Phương án C sai giới từ ('for ten years' hoặc 'since 2014').",
      },
    ],
  },
  {
    id: "lesson_pronun_01",
    phase: 1,
    skill: "pronunciation",
    title: "Phân biệt Cặp Âm /iː/ vs /ɪ/ & Nguyên lý Chặn Âm Kết Thúc (Ending Sounds)",
    orderIndex: 2,
    estimatedMinutes: 22,
    isCompleted: false,
    conceptMarkdown: `### 1. Bản chất Âm học: Nguyên âm Ngắn vs Nguyên âm Dài
Trong thang điểm IELTS Speaking (tiêu chí **Pronunciation**), lỗi phổ biến nhất của thí sinh Việt Nam là **làm phẳng độ dài nguyên âm** và **bỏ quên âm đuôi (Ending Sounds)**, dẫn đến việc giám khảo hiểu sai từ loại hoặc thì ngữ pháp.

#### Cặp âm /iː/ (Long E) vs /ɪ/ (Short I):
1. **/iː/ (Nguyên âm dài - Căng cơ môi)**:
   - *Khẩu hình*: Miệng bè ngang sang hai bên như đang cười mỉm, đầu lưỡi nâng cao chạm nhẹ vào răng hàm dưới, dây thanh rung kéo dài.
   - *Ví dụ*: *Sheep* /ʃiːp/, *Seat* /siːt/, *Leave* /liːv/, *Reach* /riːtʃ/.

2. **/ɪ/ (Nguyên âm ngắn - Thả lỏng cơ)**:
   - *Khẩu hình*: Miệng mở hơi tự nhiên, lưỡi thả lỏng ở vị trí trung tính, âm phát ra dứt khoát, trầm và ngắn (hơi lai giữa 'i' và 'ê').
   - *Ví dụ*: *Ship* /ʃɪp/, *Sit* /sɪt/, *Live* /lɪv/, *Rich* /rɪtʃ/.

---

### 2. Nguyên lý Âm đuôi (Ending Sounds) & Âm chặn (Stop Consonants)
Khi phát âm tiếng Anh, âm đuôi quyết định nghĩa của từ:
- /s/ vs /z/ vs /ɪz/: Thể hiện danh từ số nhiều và động từ ngôi thứ ba số ít.
- /t/ vs /d/ vs /ɪd/: Thể hiện thì Quá khứ đơn (Past Tense).
- /k/, /p/, /t/: Các phụ âm vô thanh chặn luồng khí ở cuối từ.`,
    trapAnalysis: `### ⚠️ Vạch trần 3 Bẫy Phát âm Khiến Mất Điểm Speaking

#### ❌ Bẫy 1: "Nuốt" âm đuôi làm mất thì Quá khứ đơn
- **Lỗi thường gặp**: Nói *"Yesterday I cook dinner and watch a movie"* nhưng phát âm *cook* và *watch* không có âm đuôi /t/. Giám khảo sẽ chấm bạn mắc lỗi Ngữ pháp (GRA) vì nghe như thì Hiện tại!
- **Cách sửa**: *Cooked* ➔ /kʊkt/ (bật âm /t/ rõ ràng), *Watched* ➔ /wɑːtʃt/.

---

#### ❌ Bẫy 2: Nhầm lẫn cặp từ tối nghĩa (/iː/ vs /ɪ/)
- **Tình huống tai hại**: 
  - Muốn nói *"I want to sit on this seat"* ➔ Phát âm thành *"I want to seat on this sit"*.
  - Muốn nói *"We need to leave"* ➔ Phát âm thành *"We need to live"*.

---

#### ❌ Bẫy 3: Phát âm mọi đuôi "-ed" thành /ɪd/
- **Quy tắc 3 nhóm đuôi '-ed'**:
  1. Phát âm **/ɪd/**: Chỉ khi từ gốc kết thúc bằng **/t/** hoặc **/d/** (*Wanted*, *Decided*).
  2. Phát âm **/t/**: Khi từ gốc kết thúc bằng phụ âm vô thanh /p/, /k/, /f/, /s/, /ʃ/, /tʃ/ (*Looked* /lʊkt/, *Laughed* /læft/).
  3. Phát âm **/d/**: Các trường hợp nguyên âm và phụ âm hữu thanh còn lại (*Played* /pleɪd/, *Cleaned* /kliːnd/).`,
    band8Sample: `### 💎 Mổ xẻ Phát Âm Đoạn Nói Band 8.5+ (Deconstruction)

#### Đoạn nói Speaking Part 2:
*"Describe a memorable journey you took."*

\`\`\`text
[Transcript Phiên âm IPA Band 8.5+]:
"Last year, I decided /dɪˈsaɪ.dɪd/ to embark on a trip to a peaceful /ˌpiːs.fəl/ coastal city. 
The moment I reached /riːtʃt/ the destination, I was captivated /ˌkæp.tə.veɪ.tɪd/ by the magnificent /mæɡˈnɪf.ə.sənt/ scenery. 
I particularly enjoyed /ɪnˈdʒɔɪd/ sitting /ˈsɪt.ɪŋ/ by the beach /biːtʃ/ and feeling /ˈfiː.lɪŋ/ the ocean breeze /briːz/."
\`\`\`

#### 🔍 Điểm Nhấn Âm học Cần Chú Ý:
1. **/dɪˈsaɪ.dɪd/**: Đuôi '-ed' phát âm chuẩn /ɪd/ vì gốc từ là 'decide' (/d/).
2. **/riːtʃt/**: Đuôi '-ed' phát âm thành /t/ dứt khoát.
3. **/biːtʃ/** (/iː/ dài) vs **/ˈsɪt.ɪŋ/** (/ɪ/ ngắn): Phân biệt rõ độ căng và độ dài âm.
4. **/briːz/**: Âm rung /z/ ở đuôi từ rõ nét, không bị biến thành âm vô thanh /s/.`,
    quiz: [
      {
        id: "q1_pronun",
        question: "Từ nào sau đây có phần đuôi '-ed' được phát âm là /t/?",
        options: ["Needed", "Developed", "Played", "Invited"],
        correctIndex: 1,
        explanation: "Từ 'develop' kết thúc bằng phụ âm vô thanh /p/, nên khi thêm '-ed' sẽ phát âm là /t/ -> /dɪˈvel.əpt/. 'Needed' và 'Invited' phát âm là /ɪd/, 'Played' phát âm là /d/.",
      },
      {
        id: "q2_pronun",
        question: "Cặp từ nào sau đây chứa nguyên âm /iː/ dài ở cả hai từ?",
        options: [
          "Ship - Sheep",
          "Reach - Rich",
          "Seat - Leave",
          "Fit - Feet",
        ],
        correctIndex: 2,
        explanation: "'Seat' (/siːt/) và 'Leave' (/liːv/) đều chứa nguyên âm dài /iː/. Các cặp còn lại đều là sự kết hợp giữa 1 từ âm ngắn /ɪ/ và 1 từ âm dài /iː/.",
      },
      {
        id: "q3_pronun",
        question: "Tại sao việc bỏ quên âm đuôi (Ending sounds) trong IELTS Speaking lại ảnh hưởng nghiêm trọng đến điểm số?",
        options: [
          "Chỉ làm mất điểm tiêu chí Fluency.",
          "Khiến giám khảo hiểu sai từ loại, thì ngữ pháp (GRA) và giảm độ rõ ràng của tiêu chí Pronunciation.",
          "Chỉ bị trừ điểm nếu nói giọng Anh-Mỹ.",
          "Không ảnh hưởng gì nếu nói nhanh và tự tin.",
        ],
        correctIndex: 1,
        explanation: "Âm đuôi thể hiện ngữ pháp cốt lõi (số nhiều /s/, thì quá khứ /t/, /d/) và phân biệt các từ tối nghĩa. Bỏ âm đuôi khiến bài nói bị trừ điểm nặng ở cả 2 tiêu chí Pronunciation và Grammatical Range & Accuracy.",
      },
    ],
  },
  {
    id: "lesson_grammar_02",
    phase: 1,
    skill: "grammar",
    title: "Mệnh Đề Quan Hệ Rút Gọn & Cụm Phân Từ (Participle Clauses)",
    orderIndex: 3,
    estimatedMinutes: 25,
    isCompleted: false,
    conceptMarkdown: `### 1. Nâng cấp Câu Đơn Điệu thành Cấu Trúc Phức Band 7.5+
Mệnh đề quan hệ rút gọn và Cụm phân từ (Participle Clauses) là một trong những đặc trưng quan trọng nhất của văn phong học thuật (**Academic English**). Chúng giúp câu văn cô đọng, giàu thông tin và tạo nhịp điệu chuyên nghiệp.

#### 2 Quy tắc Rút gọn Nòng cốt:
1. **Dạng Chủ động (Active) ➔ Rút gọn thành V-ing (Present Participle)**:
   - Câu gốc: *"The government introduced new regulations that aim to reduce carbon emissions."*
   - Câu rút gọn: *"The government introduced new regulations **aiming to reduce** carbon emissions."*

2. **Dạng Bị động (Passive) ➔ Rút gọn thành V3/V-ed (Past Participle)**:
   - Câu gốc: *"The data which was collected by Oxford researchers showed..."*
   - Câu rút gọn: *"The data **collected by Oxford researchers** showed..."*

3. **Cụm phân từ chỉ nguyên nhân / kết quả ở đầu hoặc cuối câu**:
   - *"Because they lacked financial resources, many startups failed."*
   ➔ *"**Lacking financial resources**, many startups failed."*
   - *"The factory closed down, which caused hundreds of workers to lose their jobs."*
   ➔ *"The factory closed down, **causing hundreds of workers to lose their jobs**."*`,
    trapAnalysis: `### ⚠️ Vạch trần Bẫy Phân Từ Treo (Dangling Participle)

#### ❌ Bẫy Phân từ treo là gì?
Khi bạn đặt cụm phân từ ở đầu câu, **chủ ngữ của mệnh đề chính bắt buộc phải là chủ thể thực hiện hành động của cụm phân từ đó**. Nếu chủ ngữ không khớp, câu sẽ trở nên vô nghĩa hoặc sai ngữ pháp nghiêm trọng.

- **Câu sai (Dangling Participle)**: 
  *"Walking through the forest, the trees looked majestic."*
  ➔ Cây cối (the trees) không thể tự đi bộ (walking)!
- **Sửa chuẩn Band 7.5+**: 
  *"Walking through the forest, **we** observed the majestic trees."* HOẶC *"As we walked through the forest, the trees looked majestic."*`,
    band8Sample: `### 💎 Mổ xẻ Cấu Trúc Câu Mẫu Band 8.5+ (Deconstruction)

#### Đề bài Writing Task 2:
*"Some people believe that university education should focus on practical skills rather than theory."*

\`\`\`text
[Band 5.5 - Dùng nhiều câu đơn ghép nối vụng về]:
"Students study practical skills. They can find jobs easily. This helps the economy grow faster."

[Band 8.5+ Deconstruction]:
"Equipping undergraduates with hands-on vocational competencies, tertiary institutions can substantially enhance graduates' employability, thereby fostering long-term economic prosperity."
\`\`\`

#### 🔍 Phân tích Kỹ thuật:
1. **\`Equipping undergraduates with hands-on vocational competencies, ...\`**: Cụm phân từ V-ing ở đầu câu làm chủ ngữ của mệnh đề chính (*tertiary institutions*) trở nên mạnh mẽ.
2. **\`thereby fostering long-term economic prosperity\`**: Rút gọn mệnh đề kết quả thành \`thereby + V-ing\`, đạt chuẩn C1/C2 Academic writing.`,
    quiz: [
      {
        id: "q1_participle",
        question: "Chọn câu rút gọn chính xác nhất cho: 'The survey which was conducted by the Ministry of Education revealed alarming figures.'",
        options: [
          "The survey conducting by the Ministry of Education revealed alarming figures.",
          "The survey was conducted by the Ministry of Education revealed alarming figures.",
          "The survey conducted by the Ministry of Education revealed alarming figures.",
          "The survey which conducted by the Ministry of Education revealed alarming figures.",
        ],
        correctIndex: 2,
        explanation: "Vì mệnh đề mang nghĩa bị động ('which was conducted'), khi rút gọn ta bỏ đại từ quan hệ và to-be, chỉ giữ lại V3/V-ed là 'conducted'.",
      },
      {
        id: "q2_participle",
        question: "Câu nào sau đây mắc lỗi Phân từ treo (Dangling Participle)?",
        options: [
          "Having finished the report, Sarah submitted it to the manager.",
          "Arriving at the airport, the flight had already departed.",
          "Driven by ambition, the young entrepreneur founded two tech companies.",
          "Working overtime every day, he managed to meet the project deadline.",
        ],
        correctIndex: 1,
        explanation: "Trong câu B, 'the flight' (chuyến bay) không thể tự 'Arriving at the airport' (đến sân bay). Chủ ngữ thực hiện hành động đến sân bay phải là con người.",
      },
      {
        id: "q3_participle",
        question: "Cụm nào sau đây diễn đạt kết quả theo phong cách học thuật chuẩn Band 8.0+: 'The company increased its marketing budget, _________ a 30% surge in quarterly revenue.'",
        options: [
          "and this resulted in",
          "thereby resulting in",
          "which was resulted in",
          "so it resulted in",
        ],
        correctIndex: 1,
        explanation: "'thereby resulting in + noun phrase' là cấu trúc rút gọn mệnh đề kết quả đặc trưng của văn phong học thuật Band 8.0+.",
      },
    ],
  },
];
