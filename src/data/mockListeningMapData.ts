export interface MapAnchorFeature {
  id: string;
  nameVi: string;
  nameEn: string;
  type: "building" | "water" | "forest" | "bridge" | "road" | "entrance" | "parking";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  labelX: number;
  labelY: number;
}

export interface MapLetterLocation {
  letter: string; // 'A', 'B', 'C', 'D', 'E', 'F'
  x: number;
  y: number;
  label: string;
  descriptionVi: string;
}

export interface MapQuestionItem {
  id: number; // 11, 12, 13, 14, 15
  facilityName: string;
  correctLetter: string; // 'A', 'B', 'C', etc.
  audioTimestampSeconds: number;
  isRelocationTrap: boolean;
  trapType: "relocation_change" | "left_right_confusion" | "compass_polar_opposite";
  directionalExplanation: string;
  keyCues: string[];
  trapExplanationVi: string;
}

export interface SpeakerPathNode {
  nodeId: string;
  x: number;
  y: number;
  timestamp: number;
  instructionVi: string;
  targetLetter?: string;
}

export interface SpatialPrepositionItem {
  category: "compass" | "proximity" | "junctions" | "redirection";
  categoryVi: string;
  phrase: string;
  meaningVi: string;
  exampleInMap: string;
  dangerLevel: "medium" | "high" | "extreme";
}

export interface ListeningMapExerciseData {
  id: string;
  title: string;
  section: number;
  topic: string;
  audioDurationSeconds: number;
  audioUrl: string;
  contextDescriptionVi: string;
  startingPoint: {
    name: string;
    x: number;
    y: number;
    facingDirection: "North" | "South" | "East" | "West";
  };
  anchors: MapAnchorFeature[];
  letterLocations: MapLetterLocation[];
  questions: MapQuestionItem[];
  pathNodes: SpeakerPathNode[];
  transcriptParagraphs: Array<{
    speaker: string;
    startSecond: number;
    endSecond: number;
    text: string;
    highlightRanges?: Array<{
      text: string;
      type: "correct_cue" | "trap";
    }>;
  }>;
  spatialLexicon: SpatialPrepositionItem[];
}

export const MOCK_SECTION2_MAP_DATA: ListeningMapExerciseData = {
  id: "sec2_map_greenvale_farm",
  title: "Section 2: Greenvale Nature Reserve & Community Farm",
  section: 2,
  topic: "Visitor Orientation & Facility Upgrades Plan",
  audioDurationSeconds: 135,
  audioUrl: "/audio/listening_sec2_map_greenvale.mp3",
  contextDescriptionVi:
    "Bạn sẽ nghe giám đốc khu bảo tồn thiên nhiên Greenvale thuyết minh sơ đồ quy hoạch mới và chỉ đường đến các tiện ích cho đoàn du khách.",
  startingPoint: {
    name: "Main Entrance (You Are Here)",
    x: 400,
    y: 560,
    facingDirection: "North",
  },
  anchors: [
    {
      id: "anchor_lake",
      nameVi: "Hồ Thiên Nga & Vịt Trời",
      nameEn: "Duck Pond & Wetlands",
      type: "water",
      x: 400,
      y: 320,
      radius: 55,
      labelX: 400,
      labelY: 320,
    },
    {
      id: "anchor_admin",
      nameVi: "Tòa Nhà Điều Hành",
      nameEn: "Administration Office",
      type: "building",
      x: 360,
      y: 470,
      width: 80,
      height: 45,
      labelX: 400,
      labelY: 495,
    },
    {
      id: "anchor_forest",
      nameVi: "Rừng Sồi Cổ Thụ",
      nameEn: "Ancient Oak Wood",
      type: "forest",
      x: 100,
      y: 130,
      width: 140,
      height: 120,
      labelX: 170,
      labelY: 185,
    },
    {
      id: "anchor_bridge",
      nameVi: "Cầu Gỗ Phía Bắc",
      nameEn: "North Footbridge",
      type: "bridge",
      x: 375,
      y: 200,
      width: 50,
      height: 25,
      labelX: 400,
      labelY: 215,
    },
    {
      id: "anchor_carpark",
      nameVi: "Bãi Đỗ Xe Chính",
      nameEn: "Main Car Park",
      type: "parking",
      x: 620,
      y: 510,
      width: 130,
      height: 60,
      labelX: 685,
      labelY: 545,
    },
    {
      id: "anchor_picnic",
      nameVi: "Bãi Cỏ Dã Ngoại",
      nameEn: "Picnic Meadow",
      type: "forest",
      x: 620,
      y: 310,
      width: 120,
      height: 80,
      labelX: 680,
      labelY: 350,
    },
  ],
  letterLocations: [
    {
      letter: "A",
      x: 170,
      y: 440,
      label: "Khu đất phía Tây (Cạnh Vườn Táo)",
      descriptionVi: "Ngay sau khi rẽ trái từ cổng vào, nằm bên tay trái của con đường phía Tây.",
    },
    {
      letter: "B",
      x: 140,
      y: 260,
      label: "Góc Tây Bắc (Sau Rừng Sồi)",
      descriptionVi: "Nằm ở cuối con đường mòn xuyên qua Rừng Sồi Cổ Thụ về góc Tây Bắc.",
    },
    {
      letter: "C",
      x: 310,
      y: 130,
      label: "Bắc Cầu Gỗ (Bên Tay Trái)",
      descriptionVi: "Đi qua Cầu Gỗ về phía Bắc rồi rẽ ngay sang nhánh bên trái.",
    },
    {
      letter: "D",
      x: 490,
      y: 130,
      label: "Bắc Cầu Gỗ (Bên Tay Phải)",
      descriptionVi: "Đi qua Cầu Gỗ về phía Bắc rồi rẽ sang nhánh bên phải.",
    },
    {
      letter: "E",
      x: 690,
      y: 190,
      label: "Góc Đông Bắc (Phía Sau Bãi Cỏ Dã Ngoại)",
      descriptionVi: "Nằm ở góc xa nhất phía Đông Bắc, đi qua khu vực Dã Ngoại.",
    },
    {
      letter: "F",
      x: 540,
      y: 450,
      label: "Phía Đông Tòa Điều Hành (Giữa Đường Chính & Bãi Xe)",
      descriptionVi: "Rẽ phải ở ngã ba đầu tiên, nằm ngay phía sau Tòa Điều Hành trước khi tới Bãi Xe.",
    },
  ],
  questions: [
    {
      id: 11,
      facilityName: "Organic Farm Shop",
      correctLetter: "A",
      audioTimestampSeconds: 15,
      isRelocationTrap: true,
      trapType: "relocation_change",
      directionalExplanation:
        "Người nói hướng dẫn: Từ cổng chính đi vào, rẽ trái theo con đường phía Tây. Vừa đi qua vườn táo thì Organic Farm Shop nằm ngay bên tay trái (Vị trí A). Bẫy thông tin: Trước đây quầy bán nông sản nằm trong Tòa Điều Hành nhưng hiện đã dời ra vị trí A.",
      keyCues: ["take the left-hand path heading west", "just past the orchard on your left", "location A"],
      trapExplanationVi:
        "Bẫy di dời: Người nói nhắc tới 'previously housed inside the administration block' nhằm đánh lừa thí sinh chọn gần tòa Admin.",
    },
    {
      id: 12,
      facilityName: "Children's Play Barn",
      correctLetter: "C",
      audioTimestampSeconds: 42,
      isRelocationTrap: true,
      trapType: "relocation_change",
      directionalExplanation:
        "Người nói hướng dẫn: Tiếp tục đi thẳng về hướng Bắc, qua cây cầu gỗ bắc ngang hồ nước, sau đó rẽ ngay sang trái. Nhà vui chơi trẻ em nằm ngay tại vị trí C.",
      keyCues: ["crossing the wooden footbridge", "take the immediate left turn", "location C"],
      trapExplanationVi:
        "Bẫy chuyển hướng: Kế hoạch ban đầu đặt tại đồng cỏ phía Đông nhưng vì bảo tồn vùng ngập nước nên đã dời sang bờ Bắc hồ nước bên trái (C).",
    },
    {
      id: 13,
      facilityName: "Rare Birds Aviary",
      correctLetter: "B",
      audioTimestampSeconds: 68,
      isRelocationTrap: false,
      trapType: "compass_polar_opposite",
      directionalExplanation:
        "Người nói hướng dẫn: Chuồng bảo tồn các loài chim quý hiếm nằm ở góc xa nhất phía Tây Bắc, đi dọc theo lối mòn của Rừng Sồi Cổ Thụ đến khu đất trống tại vị trí B.",
      keyCues: ["western perimeter", "far end of the Ancient Oak Wood", "north-western clearing", "location B"],
      trapExplanationVi:
        "Phải giữ vững góc nhìn la bàn: Phía Tây Bắc (North-West) đối diện với Đông Nam.",
    },
    {
      id: 14,
      facilityName: "Solar Charging Station",
      correctLetter: "F",
      audioTimestampSeconds: 92,
      isRelocationTrap: false,
      trapType: "left_right_confusion",
      directionalExplanation:
        "Người nói hướng dẫn: Từ cổng vào, rẽ phải theo con đường dẫn tới bãi đỗ xe. Trạm sạc năng lượng mặt trời nằm ở nửa đường, ngay phía sau Tòa Điều Hành (Vị trí F).",
      keyCues: ["take the right branch towards the car park", "situated halfway along", "directly behind the Administration block", "location F"],
      trapExplanationVi:
        "Chú ý vị trí tương quan 'directly behind' nhìn từ hướng cổng đi vào.",
    },
    {
      id: 15,
      facilityName: "Campsite Reception",
      correctLetter: "E",
      audioTimestampSeconds: 115,
      isRelocationTrap: false,
      trapType: "compass_polar_opposite",
      directionalExplanation:
        "Người nói hướng dẫn: Khu cắm trại sinh thái và quầy lễ tân mới nằm ở góc Đông Bắc của khu bảo tồn, đi qua Bãi Cỏ Dã Ngoại sẽ thấy tại vị trí E.",
      keyCues: ["north-east corner", "past the picnic meadow", "location E"],
      trapExplanationVi:
        "Xác định đúng hướng Đông Bắc (North-East) ở góc trên bên phải bản đồ.",
    },
  ],
  pathNodes: [
    {
      nodeId: "start",
      x: 400,
      y: 560,
      timestamp: 0,
      instructionVi: "Xuất phát tại Cổng Chính (Main Entrance). Nhìn thẳng về hướng Bắc.",
    },
    {
      nodeId: "west_turn",
      x: 280,
      y: 490,
      timestamp: 12,
      instructionVi: "Rẽ trái theo con đường phía Tây...",
    },
    {
      nodeId: "node_A",
      x: 170,
      y: 440,
      timestamp: 22,
      instructionVi: "Đến Vị trí A: Organic Farm Shop (cạnh Vườn Táo).",
      targetLetter: "A",
    },
    {
      nodeId: "forest_trail",
      x: 130,
      y: 350,
      timestamp: 60,
      instructionVi: "Đi xuyên qua đường mòn Rừng Sồi Cổ Thụ...",
    },
    {
      nodeId: "node_B",
      x: 140,
      y: 260,
      timestamp: 75,
      instructionVi: "Đến Vị trí B: Rare Birds Aviary ở góc Tây Bắc.",
      targetLetter: "B",
    },
    {
      nodeId: "bridge_cross",
      x: 400,
      y: 200,
      timestamp: 38,
      instructionVi: "Băng qua Cầu Gỗ Phía Bắc bên trên hồ nước...",
    },
    {
      nodeId: "node_C",
      x: 310,
      y: 130,
      timestamp: 50,
      instructionVi: "Rẽ trái ngay sau cầu đến Vị trí C: Children's Play Barn.",
      targetLetter: "C",
    },
    {
      nodeId: "east_loop",
      x: 620,
      y: 250,
      timestamp: 110,
      instructionVi: "Đi vòng qua Bãi Cỏ Dã Ngoại lên hướng Đông Bắc...",
    },
    {
      nodeId: "node_E",
      x: 690,
      y: 190,
      timestamp: 122,
      instructionVi: "Đến Vị trí E: Campsite Reception.",
      targetLetter: "E",
    },
    {
      nodeId: "east_branch",
      x: 480,
      y: 490,
      timestamp: 88,
      instructionVi: "Từ cổng rẽ phải về hướng Bãi Đỗ Xe...",
    },
    {
      nodeId: "node_F",
      x: 540,
      y: 450,
      timestamp: 100,
      instructionVi: "Đến Vị trí F: Solar Charging Station (phía sau Tòa Điều Hành).",
      targetLetter: "F",
    },
  ],
  transcriptParagraphs: [
    {
      speaker: "Park Director",
      startSecond: 0,
      endSecond: 14,
      text: "Good morning everyone, and welcome to Greenvale Nature Reserve and Community Farm. Before you begin exploring our redesigned grounds, let me quickly orient you with this layout map. As you can see, you are currently standing right here at the Main Entrance, facing north towards our central duck pond.",
    },
    {
      speaker: "Park Director",
      startSecond: 15,
      endSecond: 38,
      text: "Now, many of you asked about our Organic Farm Shop. Previously, fresh produce was sold inside the administration office, but to accommodate larger deliveries, we have relocated it. If you take the left-hand path heading west from the entrance, just past the apple orchard on your left, you will find the new farm shop situated at location A.",
      highlightRanges: [
        { text: "Previously, fresh produce was sold inside the administration office", type: "trap" },
        { text: "take the left-hand path heading west", type: "correct_cue" },
        { text: "just past the apple orchard on your left", type: "correct_cue" },
        { text: "situated at location A", type: "correct_cue" },
      ],
    },
    {
      speaker: "Park Director",
      startSecond: 39,
      endSecond: 64,
      text: "For families with energetic young toddlers, the Children's Play Barn is an absolute must. Our initial architectural draft proposed placing it over on the eastern meadow, however due to wetland drainage considerations, we repositioned it. To reach it, walk straight up towards the duck pond, cross the wooden footbridge to the north bank, and take the immediate left turn. It stands right there at location C.",
      highlightRanges: [
        { text: "Our initial architectural draft proposed placing it over on the eastern meadow", type: "trap" },
        { text: "cross the wooden footbridge to the north bank", type: "correct_cue" },
        { text: "take the immediate left turn", type: "correct_cue" },
        { text: "location C", type: "correct_cue" },
      ],
    },
    {
      speaker: "Park Director",
      startSecond: 65,
      endSecond: 88,
      text: "Nature enthusiasts will certainly want to visit our Rare Birds Aviary. To reach this sanctuary, venture along the western perimeter through our Ancient Oak Wood. At the far end of this peaceful forest trail, in the secluded north-western clearing, you'll discover the aviary marked as location B.",
      highlightRanges: [
        { text: "western perimeter through our Ancient Oak Wood", type: "correct_cue" },
        { text: "secluded north-western clearing", type: "correct_cue" },
        { text: "marked as location B", type: "correct_cue" },
      ],
    },
    {
      speaker: "Park Director",
      startSecond: 89,
      endSecond: 110,
      text: "Next, we have recently installed a cutting-edge Solar Charging Station for electric bicycles and mobile devices. From the main gate, take the right branch towards the car park. Situated about halfway along, directly behind the Administration block, is the charging facility at location F.",
      highlightRanges: [
        { text: "take the right branch towards the car park", type: "correct_cue" },
        { text: "directly behind the Administration block", type: "correct_cue" },
        { text: "location F", type: "correct_cue" },
      ],
    },
    {
      speaker: "Park Director",
      startSecond: 111,
      endSecond: 135,
      text: "Finally, for visitors staying overnight, our new Campsite Reception is located in the far north-east corner of the grounds. Just follow the path past the picnic meadow and you will arrive at location E. Enjoy your day with us!",
      highlightRanges: [
        { text: "far north-east corner", type: "correct_cue" },
        { text: "past the picnic meadow", type: "correct_cue" },
        { text: "location E", type: "correct_cue" },
      ],
    },
  ],
  spatialLexicon: [
    {
      category: "compass",
      categoryVi: "Phương Hướng Địa Lý",
      phrase: "in the north-western clearing",
      meaningVi: "ở bãi đất trống phía Tây Bắc",
      exampleInMap: "In the secluded north-western clearing at location B.",
      dangerLevel: "high",
    },
    {
      category: "proximity",
      categoryVi: "Vị Trí Tương Quan",
      phrase: "directly behind the Administration block",
      meaningVi: "ngay phía sau khối nhà điều hành",
      exampleInMap: "Directly behind the Administration block at location F.",
      dangerLevel: "medium",
    },
    {
      category: "junctions",
      categoryVi: "Ngã Rẽ & Cây Cầu",
      phrase: "cross the footbridge and take the immediate left turn",
      meaningVi: "băng qua cầu đi bộ và rẽ trái ngay lập tức",
      exampleInMap: "Cross the wooden footbridge and take the immediate left turn to C.",
      dangerLevel: "high",
    },
    {
      category: "redirection",
      categoryVi: "Bẫy Di Dời / Thay Đổi Kế Hoạch",
      phrase: "our initial draft proposed..., however we repositioned it to...",
      meaningVi: "bản thảo ban đầu đề xuất ở..., tuy nhiên chúng tôi đã đổi sang...",
      exampleInMap: "Initial draft proposed the eastern meadow, however we repositioned it to C.",
      dangerLevel: "extreme",
    },
  ],
};
