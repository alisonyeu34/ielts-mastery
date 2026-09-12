export type ListeningTrapType =
  | "self_correction" // Speaker gives false info first then corrects with "actually/sorry"
  | "spelling_silent_letter" // Tricky spelling e.g. K in Knowles, double letters
  | "number_teen_ty" // 14 vs 40, 15 vs 50, double 7
  | "directional_spatial" // Compass/Left/Right/Opposite confusion
  | "distractor_alternative"; // Other places mentioned in monologue

export interface Section1FormField {
  id: string;
  fieldNumber: number;
  label: string;
  placeholder: string;
  expectedAnswers: string[];
  maxWords: number;
  trapType: ListeningTrapType;
  trapTitleVi: string;
  trapExplanation: string;
  audioTimestamp: string; // e.g. "0:45"
  dialogueSnippet: {
    speaker1: string;
    speaker2: string;
    correctionHighlight?: string;
  };
}

export interface Section1FormTask {
  id: string;
  title: string;
  scenario: string;
  wordLimitInstruction: string;
  audioDurationSeconds: number;
  fullTranscript: string;
  fields: Section1FormField[];
}

export interface MapPin {
  letter: string; // 'A', 'B', 'C', 'D', 'E', 'F', 'G'
  x: number; // percentage from left
  y: number; // percentage from top
  description: string;
}

export interface MapQuestion {
  id: string;
  questionNumber: number;
  targetName: string;
  correctLetter: string;
  directionalCue: string;
  trapType: ListeningTrapType;
  trapTitleVi: string;
  trapExplanation: string;
  audioTimestamp: string;
  transcriptSnippet: string;
}

export interface Section2MapTask {
  id: string;
  title: string;
  scenario: string;
  audioDurationSeconds: number;
  fullTranscript: string;
  pins: MapPin[];
  questions: MapQuestion[];
  breadcrumbPath: Array<{ x: number; y: number; label: string }>;
}

export const MOCK_SECTION_1_TASK: Section1FormTask = {
  id: "listening_s1_registration",
  title: "Section 1: Riverdale Health & Sports Club Membership Registration",
  scenario: "A telephone conversation between a club receptionist and a new customer enquiring about membership registration.",
  wordLimitInstruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
  audioDurationSeconds: 150,
  fullTranscript:
    "Receptionist: Good morning, Riverdale Health Club. How can I help you today?\n" +
    "Customer: Hello. I'd like to sign up for an individual sports membership, please.\n" +
    "Receptionist: Wonderful! I just need to take down a few personal details for the registration form. Could I have your surname, please?\n" +
    "Customer: Yes, it's Knowles. That's K-N-O-W-L-E-S.\n" +
    "Receptionist: K-N-O-W-L-E-S. Thank you. And your primary contact telephone number?\n" +
    "Customer: It's 07700 900548.\n" +
    "Receptionist: Let me verify that: 07700 900548. Got it. And what is your current postal code?\n" +
    "Customer: It's BS8 4TL.\n" +
    "Receptionist: BS8 4TL. Now, when would you like your membership pass to become active?\n" +
    "Customer: Well, I was thinking of starting on the 14th of October... oh wait, hang on, I just remembered I'll be travelling on business that whole week. Let's make it the 21st of October instead, please.\n" +
    "Receptionist: No problem at all, I've set your activation date for the 21st of October. And for the annual premium tier, the total annual subscription fee comes to £450 paid upfront.\n" +
    "Customer: That sounds great. Thank you!",
  fields: [
    {
      id: "s1_f_1",
      fieldNumber: 1,
      label: "Customer Surname",
      placeholder: "e.g. Smith / Davies (Nghe đánh vần...)",
      expectedAnswers: ["knowles", "Knowles"],
      maxWords: 1,
      trapType: "spelling_silent_letter",
      trapTitleVi: "Bẫy Đánh Vần Âm Câm 'K' (K-N-O-W-L-E-S)",
      trapExplanation:
        "Tên riêng 'Knowles' có chữ 'K' câm đứng trước 'N'. Giám khảo đánh vần từng ký tự 'K-N-O-W-L-E-S'. Nếu không chú ý sẽ dễ viết thiếu chữ K.",
      audioTimestamp: "0:25",
      dialogueSnippet: {
        speaker1: "Could I have your surname, please?",
        speaker2: "Yes, it's Knowles. That's K-N-O-W-L-E-S.",
        correctionHighlight: "K-N-O-W-L-E-S",
      },
    },
    {
      id: "s1_f_2",
      fieldNumber: 2,
      label: "Contact Number",
      placeholder: "e.g. 01234 567890 (Số điện thoại)",
      expectedAnswers: ["07700 900548", "07700900548", "07700-900548"],
      maxWords: 1,
      trapType: "number_teen_ty",
      trapTitleVi: "Bẫy Đọc Số 'Double Seven' & 'Nine Hundred'",
      trapExplanation:
        "Người nói đọc '07700' ('oh double-seven double-oh') và '900548' ('nine-double-oh-five-four-eight').",
      audioTimestamp: "0:45",
      dialogueSnippet: {
        speaker1: "And your primary contact telephone number?",
        speaker2: "It's 07700 900548.",
        correctionHighlight: "07700 900548",
      },
    },
    {
      id: "s1_f_3",
      fieldNumber: 3,
      label: "Postcode",
      placeholder: "e.g. NW1 4NP (Mã bưu chính)",
      expectedAnswers: ["bs8 4tl", "BS8 4TL", "bs84tl", "BS84TL"],
      maxWords: 2,
      trapType: "spelling_silent_letter",
      trapTitleVi: "Mã Bưu Chính Kết Hợp Chữ & Số (BS8 4TL)",
      trapExplanation:
        "Mã bưu điện Anh (UK Postcode) gồm 2 phần chữ và số: 'BS8 4TL'. Chú ý chữ cái 'B' và số '8'.",
      audioTimestamp: "1:05",
      dialogueSnippet: {
        speaker1: "And what is your current postal code?",
        speaker2: "It's BS8 4TL.",
        correctionHighlight: "BS8 4TL",
      },
    },
    {
      id: "s1_f_4",
      fieldNumber: 4,
      label: "Membership Start Date",
      placeholder: "e.g. 15th August (Ngày tháng)",
      expectedAnswers: [
        "21st october",
        "21 october",
        "october 21st",
        "october 21",
        "21st of october",
        "21/10",
      ],
      maxWords: 2,
      trapType: "self_correction",
      trapTitleVi: "Bẫy Người Nói Tự Đính Chính (Self-Correction Trap: 14th ➔ 21st)",
      trapExplanation:
        "Người nói ban đầu đưa ra ngày '14th of October', sau đó dùng từ đính chính 'oh wait, hang on... let's make it the 21st of October instead'. Đáp án đúng bắt buộc là ngày được chốt lại: '21st October'.",
      audioTimestamp: "1:30",
      dialogueSnippet: {
        speaker1: "Now, when would you like your membership pass to become active?",
        speaker2:
          "Well, I was thinking of starting on the 14th of October... oh wait, hang on, I just remembered I'll be travelling on business that whole week. Let's make it the 21st of October instead, please.",
        correctionHighlight: "21st of October",
      },
    },
    {
      id: "s1_f_5",
      fieldNumber: 5,
      label: "Annual Membership Fee (£)",
      placeholder: "e.g. 250 / 300 (Số tiền £)",
      expectedAnswers: ["450", "£450", "450 pounds", "four hundred and fifty"],
      maxWords: 1,
      trapType: "number_teen_ty",
      trapTitleVi: "Bẫy Số Hàng Trăm (£450)",
      trapExplanation:
        "Số tiền được đọc là 'four hundred and fifty pounds'. Điền '450' hoặc '£450'.",
      audioTimestamp: "1:55",
      dialogueSnippet: {
        speaker1:
          "...the total annual subscription fee comes to £450 paid upfront.",
        speaker2: "That sounds great. Thank you!",
        correctionHighlight: "£450",
      },
    },
  ],
};

export const MOCK_SECTION_2_TASK: Section2MapTask = {
  id: "listening_s2_nature_reserve",
  title: "Section 2: Woodland Heritage Nature Reserve Map Orientation",
  scenario: "A guide is giving a recorded orientation talk to visitors introducing the layout of the nature reserve.",
  audioDurationSeconds: 180,
  fullTranscript:
    "Guide: Welcome to Woodland Heritage Nature Reserve! Before you set off along our scenic walking paths, let me briefly orient you using this visitor map.\n" +
    "Right now, we are gathered at the Main Entrance gates at the very southern edge of the reserve.\n" +
    "As you walk forward along the main central path, you'll immediately see the large Central Pond directly ahead of you.\n" +
    "Now, if you want to rent a mountain bike, the Bicycle Rental booth is situated immediately to your left just as you pass through the entrance gate, right next to the western boundary fence (Location A).\n" +
    "If you proceed up the central path towards the pond and take the right-hand fork heading east, you will find our Souvenir Gift Shop nestled right beside the children's play meadow (Location C).\n" +
    "For birdwatchers, our famous Bird Hide is located on the far western side of the central pond, accessible by taking the wooden footbridge across the water and turning northwest (Location E).\n" +
    "If you continue along the path past the pond heading due north into the ancient oak forest, right in the far north-eastern corner of the reserve you'll discover our climate-controlled Botanical Greenhouse (Location F).\n" +
    "Finally, for those wanting to stop for lunch, the dedicated Picnic Area is positioned directly opposite the greenhouse on the northern boundary, featuring wooden benches beneath the pine canopy (Location G).\n" +
    "Please remember to keep to the marked trails, and enjoy your visit!",
  pins: [
    { letter: "A", x: 18, y: 82, description: "Immediately to the left of the main entrance gates, near the western fence." },
    { letter: "B", x: 28, y: 55, description: "On the southern bank of the central pond." },
    { letter: "C", x: 82, y: 72, description: "Taking the right-hand fork east of the entrance, near the meadow." },
    { letter: "D", x: 60, y: 48, description: "On the eastern bank of the central pond." },
    { letter: "E", x: 20, y: 35, description: "Far western side of the pond across the wooden footbridge." },
    { letter: "F", x: 80, y: 18, description: "In the far north-eastern corner of the ancient oak forest." },
    { letter: "G", x: 30, y: 15, description: "On the northern boundary, directly opposite the greenhouse." },
  ],
  breadcrumbPath: [
    { x: 50, y: 92, label: "Main Entrance (You are here)" },
    { x: 18, y: 82, label: "Turn left ➔ Bicycle Rental (A)" },
    { x: 50, y: 75, label: "Return to Central Path" },
    { x: 82, y: 72, label: "Fork right east ➔ Gift Shop (C)" },
    { x: 50, y: 50, label: "Central Pond" },
    { x: 20, y: 35, label: "Footbridge west ➔ Bird Hide (E)" },
    { x: 50, y: 30, label: "North forest trail" },
    { x: 80, y: 18, label: "North-east corner ➔ Greenhouse (F)" },
    { x: 30, y: 15, label: "Opposite on north boundary ➔ Picnic Area (G)" },
  ],
  questions: [
    {
      id: "q_map_1",
      questionNumber: 1,
      targetName: "Bicycle Rental",
      correctLetter: "A",
      directionalCue: "immediately to your left just as you pass through the entrance gate",
      trapType: "directional_spatial",
      trapTitleVi: "Định Vị Ngay Lối Vào Bên Trái (Location A)",
      trapExplanation:
        "Hướng dẫn: 'situated immediately to your left just as you pass through the entrance gate, right next to the western boundary fence' ➔ Khớp với vị trí A.",
      audioTimestamp: "0:45",
      transcriptSnippet:
        "...the Bicycle Rental booth is situated immediately to your left just as you pass through the entrance gate, right next to the western boundary fence.",
    },
    {
      id: "q_map_2",
      questionNumber: 2,
      targetName: "Souvenir Gift Shop",
      correctLetter: "C",
      directionalCue: "take the right-hand fork heading east beside the children's meadow",
      trapType: "directional_spatial",
      trapTitleVi: "Rẽ Nhánh Phải Về Phía Đông (Location C)",
      trapExplanation:
        "Hướng dẫn: 'take the right-hand fork heading east... nestled right beside the children's play meadow' ➔ Khớp với vị trí C.",
      audioTimestamp: "1:05",
      transcriptSnippet:
        "...take the right-hand fork heading east, you will find our Souvenir Gift Shop nestled right beside the children's play meadow.",
    },
    {
      id: "q_map_3",
      questionNumber: 3,
      targetName: "Bird Hide",
      correctLetter: "E",
      directionalCue: "far western side of the central pond, across the wooden footbridge and northwest",
      trapType: "directional_spatial",
      trapTitleVi: "Băng Qua Cầu Gỗ Về Phía Tây Bắc (Location E)",
      trapExplanation:
        "Hướng dẫn: 'far western side of the central pond, accessible by taking the wooden footbridge across the water and turning northwest' ➔ Khớp với vị trí E (phía tây bắc hồ).",
      audioTimestamp: "1:25",
      transcriptSnippet:
        "...Bird Hide is located on the far western side of the central pond, accessible by taking the wooden footbridge across the water and turning northwest.",
    },
    {
      id: "q_map_4",
      questionNumber: 4,
      targetName: "Botanical Greenhouse",
      correctLetter: "F",
      directionalCue: "in the far north-eastern corner of the reserve in the ancient oak forest",
      trapType: "directional_spatial",
      trapTitleVi: "Góc Đông Bắc Cực Bắc (Location F)",
      trapExplanation:
        "Hướng dẫn: 'heading due north... right in the far north-eastern corner of the reserve you'll discover our climate-controlled Botanical Greenhouse' ➔ Khớp với vị trí F.",
      audioTimestamp: "1:45",
      transcriptSnippet:
        "...past the pond heading due north into the ancient oak forest, right in the far north-eastern corner of the reserve you'll discover our climate-controlled Botanical Greenhouse.",
    },
    {
      id: "q_map_5",
      questionNumber: 5,
      targetName: "Picnic Area",
      correctLetter: "G",
      directionalCue: "directly opposite the greenhouse on the northern boundary",
      trapType: "directional_spatial",
      trapTitleVi: "Đối Diện Greenhouse Ở Ranh Giới Phía Bắc (Location G)",
      trapExplanation:
        "Hướng dẫn: 'directly opposite the greenhouse on the northern boundary, featuring wooden benches beneath the pine canopy' ➔ Khớp với vị trí G.",
      audioTimestamp: "2:05",
      transcriptSnippet:
        "...the dedicated Picnic Area is positioned directly opposite the greenhouse on the northern boundary, featuring wooden benches...",
    },
  ],
};
