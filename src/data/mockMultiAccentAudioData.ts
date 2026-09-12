/**
 * Mock Multi-Accent Acoustic Dataset: Authentic IELTS Listening Scenarios
 * Covers Section 1 to Section 4 with 4 test accents, phonetic shift dictionaries, and 3-layer forensic traps.
 */

import { AccentType } from "@/lib/webAudioLooperEngine";

export interface PhoneticShiftItem {
  word: string;
  standardIpa: string;
  accentedIpa: string;
  explanation: string;
}

export interface AccentDialectNote {
  accent: AccentType;
  accentLabel: string;
  summary: string;
  keyPhoneticShifts: PhoneticShiftItem[];
}

export interface ForensicTrapSegment {
  id: string;
  title: string;
  trapType: "self_correction" | "consensus_reversal" | "accent_vowel_distortion" | "acoustic_assimilation";
  trapTypeLabelVi: string;
  loopStartSec: number;
  loopEndSec: number;
  layer1AcousticScript: string; // What the acoustic signal actually delivers
  layer2StandardOrthography: string; // Standard written text
  layer3TrapDeconstruction: string; // Why Band 5.0-6.0 candidates fall for this
  drillQuestion: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    accentPhoneticNote: string;
  };
}

export interface MultiAccentDialogueScenario {
  id: string;
  title: string;
  section: "Section 1" | "Section 2" | "Section 3" | "Section 4";
  contextDescription: string;
  durationSec: number;
  fullTranscript: string;
  dialogueLines: Array<{ speaker: string; text: string; startSec: number; endSec: number }>;
  accentDialectNotes: Record<AccentType, AccentDialectNote>;
  forensicTraps: ForensicTrapSegment[];
}

export const MOCK_MULTI_ACCENT_SCENARIOS: MultiAccentDialogueScenario[] = [
  {
    id: "listening_scenario_sec1",
    title: "Eco-Lodge Reservation & Arrival Confirmation",
    section: "Section 1",
    contextDescription: "Hội thoại đặt phòng khách sạn sinh thái giữa nhân viên lễ tân và du khách, cài cắm bẫy đổi ngày (Self-Correction) và biến âm giọng Úc.",
    durationSec: 16,
    fullTranscript:
      "Receptionist: Good morning, Blue Bay Eco-Resort. How can I assist you today?\nCustomer: Hello, I'd like to book a family cabin for the 14th of August.\nReceptionist: Let me check... ah, on the 14th we are fully booked due to the local regatta. However, we have a vacancy starting from the 18th. Or wait, my apologies, a cancellation just came in for the 16th!\nCustomer: Perfect, let's lock in the 16th then.",
    dialogueLines: [
      { speaker: "Receptionist", text: "Good morning, Blue Bay Eco-Resort. How can I assist you today?", startSec: 0, endSec: 3.5 },
      { speaker: "Customer", text: "Hello, I'd like to book a family cabin for the 14th of August.", startSec: 3.6, endSec: 7.2 },
      {
        speaker: "Receptionist",
        text: "Let me check... ah, on the 14th we are fully booked. We have a vacancy starting from the 18th. Or wait, my apologies, a cancellation just came in for the 16th!",
        startSec: 7.3,
        endSec: 13.0,
      },
      { speaker: "Customer", text: "Perfect, let's lock in the 16th then.", startSec: 13.1, endSec: 15.8 },
    ],
    accentDialectNotes: {
      british: {
        accent: "british",
        accentLabel: "RP British (Anh - Anh)",
        summary: "Ngữ điệu chuẩn học thuật, nguyên âm dài chuẩn xác, không uốn lưỡi âm /r/ cuối từ (non-rhotic).",
        keyPhoneticShifts: [
          { word: "August", standardIpa: "/ˈɔː.ɡəst/", accentedIpa: "[ˈɔː.ɡəst]", explanation: "Nguyên âm /ɔː/ tròn môi rõ nét, kết thúc bật âm /t/ nhẹ." },
          { word: "cancellation", standardIpa: "/ˌkæn.səlˈeɪ.ʃən/", accentedIpa: "[ˌkæn.slˈeɪ.ʃn̩]", explanation: "Nuốt âm schwa /ə/ ở âm tiết giữa và đuôi." },
        ],
      },
      australian: {
        accent: "australian",
        accentLabel: "Australian (Anh - Úc)",
        summary: "Đặc trưng biến đổi nguyên âm đôi /eɪ/ thành /aɪ/, khiến các từ như 'day', 'eighteenth', 'cabin' nghe rất giống 'die', 'iteenth'.",
        keyPhoneticShifts: [
          { word: "today", standardIpa: "/təˈdeɪ/", accentedIpa: "[təˈdaɪ]", explanation: "Nguyên âm /eɪ/ chuyển dịch sâu thành /aɪ/, nghe như 'to die'." },
          { word: "vacant", standardIpa: "/ˈveɪ.kənt/", accentedIpa: "[ˈvaɪ.kənt]", explanation: "Âm /eɪ/ biến thành /aɪ/ ('vaikant')." },
          { word: "18th", standardIpa: "/ˌeɪtˈtiːnθ/", accentedIpa: "[ˌaɪtˈtiːnθ]", explanation: "Nghe tương tự như 'eye-teenth', dễ làm thí sinh ghi nhầm." },
        ],
      },
      american: {
        accent: "american",
        accentLabel: "North American (Anh - Mỹ)",
        summary: "Uốn lưỡi âm /r/ rõ ràng, biến âm /t/ giữa hai nguyên âm thành Flap T (/ɾ/) nghe giống âm /d/ lướt nhanh.",
        keyPhoneticShifts: [
          { word: "regatta", standardIpa: "/rɪˈɡæt.ə/", accentedIpa: "[rɪˈɡɑː.ɾə]", explanation: "Âm /t/ giữa 2 nguyên âm biến thành Flap T [ɾ]." },
          { word: "resort", standardIpa: "/rɪˈzɔːt/", accentedIpa: "[rɪˈzɔːrt]", explanation: "Uốn lưỡi âm /r/ ở giữa và cuối từ." },
        ],
      },
      scottish: {
        accent: "scottish",
        accentLabel: "Scottish Regional (Scotland)",
        summary: "Rung đầu lưỡi âm /r/ (rolled r), rút ngắn nguyên âm đôi thành nguyên âm đơn.",
        keyPhoneticShifts: [
          { word: "cabin", standardIpa: "/ˈkæb.ɪn/", accentedIpa: "[ˈkab.ɪn]", explanation: "Nguyên âm /æ/ phát âm mở rộng và trầm hơn." },
          { word: "resort", standardIpa: "/rɪˈzɔːt/", accentedIpa: "[rɪˈzɔrt]", explanation: "Âm /r/ rung mạnh đầu lưỡi đặc trưng vùng cao nguyên Scotland." },
        ],
      },
    },
    forensicTraps: [
      {
        id: "trap_sec1_01",
        title: "Bẫy Đổi Ý Liền Tay (Double Self-Correction Distractor)",
        trapType: "self_correction",
        trapTypeLabelVi: "Bẫy Đổi Ý & Tự Đính Chính (Self-Correction Trap)",
        loopStartSec: 7.2,
        loopEndSec: 13.2,
        layer1AcousticScript:
          "[…ɒn ðə fɔːˈtiːnθ wiː ɑː fʊli bʊkt… weɪkənsi stɑːtɪŋ frəm ðiː ˌaɪtˈtiːnθ… ɔː weɪt maɪ əˈpɒlədʒiz… kænsəˈleɪʃn̩ dʒʌst keɪm ɪn fə ðə sɪksˈtiːnθ!]",
        layer2StandardOrthography:
          "...on the 14th we are fully booked. We have a vacancy starting from the 18th. Or wait, my apologies, a cancellation just came in for the 16th!",
        layer3TrapDeconstruction:
          "Người nói liên tiếp đưa ra 3 mốc ngày: 14th (bị từ chối), 18th (mốc ban đầu) và cuối cùng chốt lại bằng từ phủ định 'Or wait, my apologies' chuyển sang 16th. Thí sinh Band 5.0 thường vội vàng ghi 14th hoặc 18th ngay khi vừa nghe thấy.",
        drillQuestion: {
          prompt: "What is the confirmed date for the family cabin reservation?",
          options: ["14th of August", "18th of August", "16th of August", "15th of August"],
          correctIndex: 2,
          explanation: "Người nói từ chối ngày 14, gợi ý ngày 18, nhưng đã tự sửa lại thành ngày 16 ('cancellation just came in for the 16th').",
          accentPhoneticNote: "Khi nghe giọng Úc, từ '18th' phát âm lệch thành 'aighteenth' dễ gây hoang mang, làm phân tán sự chú ý vào từ khóa chốt '16th'.",
        },
      },
    ],
  },
  {
    id: "listening_scenario_sec3",
    title: "Marine Ecology Thesis: Coral Bleaching Mechanisms",
    section: "Section 3",
    contextDescription: "Cuộc trao đổi học thuật giữa giáo sư và sinh viên cao học về nguyên nhân tẩy trắng san hô, chứa bẫy đồng thuận đảo chiều (Consensus Trap) và biến âm nuốt âm.",
    durationSec: 15,
    fullTranscript:
      "Student: I initially hypothesized that elevated salinity was the primary catalyst for the bleaching event.\nProfessor: That was the prevailing theory in the late nineties, yes. But if you scrutinize the telemetry from the Great Barrier Reef sensors, it was actually prolonged thermal anomalies, not salinity shifts, that triggered the symbiont expulsion.\nStudent: Ah, I see. I'll recalibrate my regression model accordingly.",
    dialogueLines: [
      {
        speaker: "Student",
        text: "I initially hypothesized that elevated salinity was the primary catalyst for the bleaching event.",
        startSec: 0,
        endSec: 4.8,
      },
      {
        speaker: "Professor",
        text: "That was the prevailing theory in the late nineties, yes. But if you scrutinize the telemetry, it was actually prolonged thermal anomalies, not salinity shifts, that triggered it.",
        startSec: 4.9,
        endSec: 11.5,
      },
      {
        speaker: "Student",
        text: "Ah, I see. I'll recalibrate my regression model accordingly.",
        startSec: 11.6,
        endSec: 14.8,
      },
    ],
    accentDialectNotes: {
      british: {
        accent: "british",
        accentLabel: "RP British (Anh - Anh)",
        summary: "Giọng học thuật chuẩn Cambridge, nhấn mạnh các âm tắc vô thanh /p/, /t/, /k/.",
        keyPhoneticShifts: [
          { word: "catalyst", standardIpa: "/ˈkæt.əl.ɪst/", accentedIpa: "[ˈkæt.l̩.ɪst]", explanation: "Nuốt âm schwa /ə/ ở âm tiết giữa." },
          { word: "scrutinize", standardIpa: "/ˈskruː.tɪ.naɪz/", accentedIpa: "[ˈskruː.tɪ.naɪz]", explanation: "Âm /t/ rõ và sắc bén." },
        ],
      },
      australian: {
        accent: "australian",
        accentLabel: "Australian (Anh - Úc)",
        summary: "Ngữ điệu tăng dần đều (High Rising Terminal), nguyên âm /aɪ/ kéo dài rõ rệt.",
        keyPhoneticShifts: [
          { word: "salinity", standardIpa: "/səˈlɪn.ə.ti/", accentedIpa: "[səˈlɪn.ə.tiː]", explanation: "Âm cuối /iː/ kéo dài với ngữ điệu vút lên." },
          { word: "late", standardIpa: "/leɪt/", accentedIpa: "[laɪt]", explanation: "Âm /eɪ/ chuyển thành /aɪ/ ('light nineties')." },
        ],
      },
      american: {
        accent: "american",
        accentLabel: "North American (Anh - Mỹ)",
        summary: "Flap T trong 'scrutinize' và 'telemetry', uốn lưỡi /r/ sâu trong 'thermal'.",
        keyPhoneticShifts: [
          { word: "telemetry", standardIpa: "/təˈlem.ə.tri/", accentedIpa: "[təˈlem.ə.tri]", explanation: "Trọng âm rõ ở âm tiết hai." },
          { word: "thermal", standardIpa: "/ˈθɜː.məl/", accentedIpa: "[ˈθɝː.məl]", explanation: "Uốn lưỡi âm r-colored vowel /ɝː/." },
        ],
      },
      scottish: {
        accent: "scottish",
        accentLabel: "Scottish Regional (Scotland)",
        summary: "Âm /r/ rung mạnh trong 'coral', 'barrier', 'primary', nguyên âm sắc gọn.",
        keyPhoneticShifts: [
          { word: "primary", standardIpa: "/ˈpraɪ.mər.i/", accentedIpa: "[ˈprɾaɪ.mər.i]", explanation: "Rung đầu lưỡi âm /r/." },
        ],
      },
    },
    forensicTraps: [
      {
        id: "trap_sec3_01",
        title: "Bẫy Giả Đồng Thuận (False Consensus & Disconfirmation Trap)",
        trapType: "consensus_reversal",
        trapTypeLabelVi: "Bẫy Bác Bỏ Giả Định Ban Đầu (Consensus Reversal)",
        loopStartSec: 4.8,
        loopEndSec: 11.5,
        layer1AcousticScript:
          "[ðæt wəz ðə prɪˈveɪlɪŋ ˈθɪəri ɪn ðə leɪt ˈnaɪntiz jɛs… bʌt ɪf juː ˈskruːtɪnaɪz ðə təˈlɛmɪtri… ɪt wəz ˈæktʃuəli prəˈlɒŋd ˈθɜːml̩ əˈnɒməlɪz nɒt səˈlɪnəti ʃɪfts…]",
        layer2StandardOrthography:
          "That was the prevailing theory in the late nineties, yes. But if you scrutinize the telemetry, it was actually prolonged thermal anomalies, not salinity shifts...",
        layer3TrapDeconstruction:
          "Giáo sư dùng từ 'yes' để công nhận đó là giả thuyết trong quá khứ, khiến người nghe tưởng là đồng ý với sinh viên. Nhưng ngay sau đó dùng liên từ 'But' và 'it was actually...' để chỉ ra nguyên nhân thực sự là nhiệt độ ('thermal anomalies'), không phải độ mặn ('salinity').",
        drillQuestion: {
          prompt: "What was identified as the actual primary driver of the coral bleaching event?",
          options: [
            "Drastic fluctuations in ocean salinity levels",
            "Prolonged thermal anomalies and heat stress",
            "Anthropogenic plastic pollution run-off",
            "Deficiencies in telemetry sensor calibration",
          ],
          correctIndex: 1,
          explanation: "Giáo sư khẳng định: 'it was actually prolonged thermal anomalies, not salinity shifts'.",
          accentPhoneticNote: "Từ 'late' trong giọng Úc đọc như 'light', và liên từ 'But' được nhấn mạnh như một chỉ dấu đảo chiều luận điểm.",
        },
      },
    ],
  },
];
