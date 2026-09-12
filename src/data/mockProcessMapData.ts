export type PMExerciseType =
  | "process_manmade"
  | "process_natural"
  | "map_past_present"
  | "map_present_future";

export interface ProcessStageItem {
  stepNumber: number;
  title: string;
  descriptionEn: string;
  descriptionVi: string;
  coreVerb: string;
  passiveForm: string;
  activeForm: string;
  isPassiveRecommended: boolean;
  suggestedSignposts: string[];
  keyEquipmentOrActors?: string[];
  iconName: string;
  badgeColor: string;
}

export interface MapMutationHotspot {
  id: string;
  x: number; // 0 - 100 percentage
  y: number; // 0 - 100 percentage
  name: string;
  category: "demolition" | "construction" | "conversion" | "expansion" | "unaltered";
  categoryLabelVi: string;
  beforeStateEn: string;
  afterStateEn: string;
  vocabPair: {
    verb: string;
    noun: string;
  };
  sampleSentence: string;
}

export interface MapSvgFeature {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  textColor?: string;
  type: "building" | "road" | "greenery" | "water" | "facility" | "residential";
}

export interface SpatialLexiconItem {
  verb: string;
  noun: string;
  category: "demolition" | "construction" | "conversion" | "expansion" | "unaltered";
  meaningVi: string;
  example: string;
}

export interface ProcessLexiconItem {
  word: string;
  type: "verb" | "noun" | "signpost";
  meaningVi: string;
  exampleSentence: string;
}

export interface Task1PMExercise {
  id: string;
  title: string;
  diagramType: PMExerciseType;
  categoryLabelVi: string;
  prompt: string;
  estimatedTimeMin: number;
  recommendedMinWords: number;
  
  // Specific to Process
  totalStages?: number;
  stages?: ProcessStageItem[];
  processLexicon?: ProcessLexiconItem[];

  // Specific to Map
  yearA?: string;
  yearB?: string;
  overallThemeVi?: string;
  mutationHotspots?: MapMutationHotspot[];
  mapFeaturesEpochA?: MapSvgFeature[];
  mapFeaturesEpochB?: MapSvgFeature[];
  spatialLexicon?: SpatialLexiconItem[];

  // Model Essay & Scoring
  modelOverview: {
    text: string;
    keyElementsVi: string[];
  };
  modelBody1: string;
  modelBody2: string;
  modelFullEssay: string;
  examinerNotesVi: string[];
}

export const MOCK_PROCESS_MAP_EXERCISES: Task1PMExercise[] = [
  // -------------------------------------------------------------
  // 1. MAN-MADE PROCESS: Recycled Paper Manufacturing
  // -------------------------------------------------------------
  {
    id: "pm_paper_recycling",
    title: "The Industrial Process of Manufacturing Recycled Paper",
    diagramType: "process_manmade",
    categoryLabelVi: "Quy Trình Nhân Tạo (Man-Made Industrial Process)",
    prompt:
      "The diagram illustrates the sequential stages involved in the production of recycled paper from collected waste paper. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    estimatedTimeMin: 20,
    recommendedMinWords: 150,
    totalStages: 6,
    stages: [
      {
        stepNumber: 1,
        title: "Collection & Sorting",
        descriptionEn: "Used paper is collected from households and sorted into grades.",
        descriptionVi: "Thu gom giấy phế liệu từ hộ gia đình và phân loại chất lượng.",
        coreVerb: "collect & sort",
        passiveForm: "is collected and sorted",
        activeForm: "collects and sorts",
        isPassiveRecommended: true,
        suggestedSignposts: ["Commencing with", "In the initial phase", "First and foremost"],
        keyEquipmentOrActors: ["Collection trucks", "Automated sorting conveyors"],
        iconName: "Truck",
        badgeColor: "emerald",
      },
      {
        stepNumber: 2,
        title: "Shredding & Pulverization",
        descriptionEn: "Sorted paper is shredded into small fibers and soaked in hot water.",
        descriptionVi: "Giấy sau phân loại được cắt vụn và ngâm nước nóng để tạo bột nhão.",
        coreVerb: "shred & soak",
        passiveForm: "is shredded and soaked in a pulping vat",
        activeForm: "shreds and soaks",
        isPassiveRecommended: true,
        suggestedSignposts: ["Following this", "Subsequently", "In the subsequent stage"],
        keyEquipmentOrActors: ["Industrial shredders", "Hydrapulper vat"],
        iconName: "Scissors",
        badgeColor: "cyan",
      },
      {
        stepNumber: 3,
        title: "De-inking & Chemical Cleansing",
        descriptionEn: "Air bubbles and soapy chemicals remove printer ink from the pulp.",
        descriptionVi: "Bọt khí và hóa chất tẩy rửa tách sạch mực in ra khỏi khối bột giấy.",
        coreVerb: "de-ink & purify",
        passiveForm: "is de-inked and chemically purified",
        activeForm: "de-inks and purifies",
        isPassiveRecommended: true,
        suggestedSignposts: ["Concurrently", "At this juncture", "Afterwards"],
        keyEquipmentOrActors: ["Flotation de-inking tank", "Surfactant injectors"],
        iconName: "Droplets",
        badgeColor: "blue",
      },
      {
        stepNumber: 4,
        title: "Bleaching & Refining",
        descriptionEn: "The clean pulp is bleached with hydrogen peroxide to whiten fibers.",
        descriptionVi: "Bột giấy sạch được tẩy trắng bằng chất oxy hóa để sợi giấy trắng mịn.",
        coreVerb: "bleach & refine",
        passiveForm: "is bleached and refined with bleaching agents",
        activeForm: "bleaches and refines",
        isPassiveRecommended: true,
        suggestedSignposts: ["Prior to rolling", "Next", "During the fourth step"],
        keyEquipmentOrActors: ["Bleaching chamber", "Fiber refiner"],
        iconName: "Sparkles",
        badgeColor: "purple",
      },
      {
        stepNumber: 5,
        title: "Pressing & Heated Drying",
        descriptionEn: "Pulp passes through heated heavy rollers to squeeze out moisture.",
        descriptionVi: "Bột ướt chạy qua các trục lăn nặng có gia nhiệt để ép hết nước và làm khô.",
        coreVerb: "press & dry",
        passiveForm: "is pressed between heated rollers to eliminate excess moisture",
        activeForm: "presses and dries",
        isPassiveRecommended: true,
        suggestedSignposts: ["In the penultimate phase", "Once drained", "Thereafter"],
        keyEquipmentOrActors: ["Mechanical press rollers", "Steam-heated drying cylinders"],
        iconName: "Flame",
        badgeColor: "amber",
      },
      {
        stepNumber: 6,
        title: "Rolling into Finished Reels",
        descriptionEn: "Dried paper sheets are wound onto giant commercial reels ready for shipment.",
        descriptionVi: "Các dải giấy khô được cuộn vào các cuộn lớn sẵn sàng đóng gói và phân phối.",
        coreVerb: "wind & distribute",
        passiveForm: "is wound into monumental reels and distributed for commercial use",
        activeForm: "winds and distributes",
        isPassiveRecommended: true,
        suggestedSignposts: ["The process culminates in", "Finally", "In the concluding stage"],
        keyEquipmentOrActors: ["Reel winder", "Packaging dock"],
        iconName: "Package",
        badgeColor: "indigo",
      },
    ],
    processLexicon: [
      {
        word: "commence with",
        type: "signpost",
        meaningVi: "Khởi đầu bằng giai đoạn...",
        exampleSentence: "The procedure commences with the comprehensive collection and sorting of discarded paper.",
      },
      {
        word: "be subjected to",
        type: "verb",
        meaningVi: "Được đưa vào xử lý / trải qua quy trình...",
        exampleSentence: "The paper pulp is subjected to rigorous flotation de-inking.",
      },
      {
        word: "eliminate excess moisture",
        type: "verb",
        meaningVi: "Loại bỏ hoàn toàn độ ẩm dư thừa",
        exampleSentence: "Heated compression rollers eliminate excess moisture from the pulp sheet.",
      },
      {
        word: "culminate in",
        type: "signpost",
        meaningVi: "Khép lại / Đạt tới kết quả cuối cùng là...",
        exampleSentence: "The entire manufacturing cycle culminates in the rolling of pristine recycled paper.",
      },
    ],
    modelOverview: {
      text: "Overall, the recycling cycle comprises six linear stages, commencing with the gathering and sorting of waste paper, proceeding through extensive chemical pulping and bleaching, and culminating in the winding of finished paper reels for commercial distribution.",
      keyElementsVi: [
        "Nêu rõ tổng số 6 bước (six linear stages)",
        "Điểm bắt đầu: thu gom & phân loại phế liệu (gathering and sorting of waste paper)",
        "Điểm kết thúc: cuộn thành phẩm thương mại (winding of finished paper reels)",
      ],
    },
    modelBody1:
      "In the initial stage, discarded paper from domestic and commercial sources is systematically collected and transported to processing facilities, where it is sorted according to material grade. Subsequently, the sorted paper is fed into industrial shredders before being immersed in a hot water vat to form a thick, fibrous pulp.",
    modelBody2:
      "The third and fourth steps focus on chemical purification: surfactant soap bubbles are injected into a flotation chamber to strip printing ink away from the slurry, after which the sanitized pulp is treated with hydrogen peroxide for bleaching. In the penultimate phase, the refined pulp is driven through heavy, steam-heated rollers to squeeze out residual water and compact the fibers into uniform continuous sheets. Finally, the procedure culminates in the paper being tightly wound onto giant cylindrical reels, ready for commercial distribution to printing houses.",
    modelFullEssay:
      "The diagram illustrates the sequential stages involved in the production of recycled paper from collected waste paper.\n\nOverall, the recycling cycle comprises six linear stages, commencing with the gathering and sorting of waste paper, proceeding through extensive chemical pulping and bleaching, and culminating in the winding of finished paper reels for commercial distribution.\n\nIn the initial stage, discarded paper from domestic and commercial sources is systematically collected and transported to processing facilities, where it is sorted according to material grade. Subsequently, the sorted paper is fed into industrial shredders before being immersed in a hot water vat to form a thick, fibrous pulp.\n\nThe third and fourth steps focus on chemical purification: surfactant soap bubbles are injected into a flotation chamber to strip printing ink away from the slurry, after which the sanitized pulp is treated with hydrogen peroxide for bleaching. In the penultimate phase, the refined pulp is driven through heavy, steam-heated rollers to squeeze out residual water and compact the fibers into uniform continuous sheets. Finally, the procedure culminates in the paper being tightly wound onto giant cylindrical reels, ready for commercial distribution to printing houses.",
    examinerNotesVi: [
      "Task Achievement (Band 9.0): Overview tóm tắt hoàn hảo 3 yếu tố cốt lõi (Số bước, Điểm đầu, Điểm cuối). Không bỏ sót bất kỳ chi tiết công đoạn nào trong Body.",
      "Grammatical Range & Accuracy (Band 9.0): Sử dụng 100% thể bị động học thuật cho các công đoạn sản xuất (is collected, is fed, are injected, is treated, is tightly wound).",
      "Coherence & Cohesion (Band 8.5+): Hệ thống liên từ liên kết tuần tự cực kỳ phong phú (In the initial stage, Subsequently, In the penultimate phase, Finally culminates in).",
    ],
  },

  // -------------------------------------------------------------
  // 2. NATURAL LIFE CYCLE: Monarch Butterfly
  // -------------------------------------------------------------
  {
    id: "pm_butterfly_lifecycle",
    title: "The Natural Life Cycle of the Monarch Butterfly",
    diagramType: "process_natural",
    categoryLabelVi: "Quy Trình Tự Nhiên (Natural Biological Life Cycle)",
    prompt:
      "The diagram shows the developmental stages in the life cycle of the Monarch butterfly (Danaus plexippus). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    estimatedTimeMin: 20,
    recommendedMinWords: 150,
    totalStages: 5,
    stages: [
      {
        stepNumber: 1,
        title: "Egg Deposition",
        descriptionEn: "The adult female butterfly deposits tiny spherical eggs on milkweed leaves.",
        descriptionVi: "Bướm cái trưởng thành đẻ những quả trứng hình cầu li ti lên mặt dưới lá cây bông tai.",
        coreVerb: "deposit / lay",
        passiveForm: "are deposited on leaves",
        activeForm: "lays / deposits eggs on milkweed foliage",
        isPassiveRecommended: false,
        suggestedSignposts: ["The life cycle begins when", "In the initial developmental phase"],
        keyEquipmentOrActors: ["Adult female butterfly", "Milkweed host plant"],
        iconName: "Egg",
        badgeColor: "emerald",
      },
      {
        stepNumber: 2,
        title: "Larval Hatching & Feeding",
        descriptionEn: "Larvae (caterpillars) hatch after 3-5 days and voraciously consume milkweed.",
        descriptionVi: "Sau 3-5 ngày, trứng nở thành sâu bướm phàm ăn và lớn nhanh nhờ ăn lá cây liên tục.",
        coreVerb: "hatch & feed",
        passiveForm: "are hatched after several days",
        activeForm: "hatches from the egg and feeds voraciously",
        isPassiveRecommended: false,
        suggestedSignposts: ["Following an incubation period", "Once hatched", "During the larval stage"],
        keyEquipmentOrActors: ["Striped caterpillar larva", "Plant foliage"],
        iconName: "Bug",
        badgeColor: "amber",
      },
      {
        stepNumber: 3,
        title: "Pupation & Chrysalis Formation",
        descriptionEn: "The mature caterpillar hangs upside down and forms a protective chrysalis.",
        descriptionVi: "Sâu bướm trưởng thành treo ngược mình và tạo thành kén nhộng bảo vệ cứng cáp.",
        coreVerb: "pupate & encase",
        passiveForm: "is encased within a chrysalis",
        activeForm: "attaches itself upside down and pupates into a chrysalis",
        isPassiveRecommended: false,
        suggestedSignposts: ["After reaching maximum size", "In the pupal phase", "Subsequently"],
        keyEquipmentOrActors: ["Silk button anchor", "Jade-green chrysalis shell"],
        iconName: "Shield",
        badgeColor: "cyan",
      },
      {
        stepNumber: 4,
        title: "Metamorphosis & Emergence",
        descriptionEn: "Over 10-14 days, tissues reorganize and a fully-formed butterfly emerges.",
        descriptionVi: "Trong 10-14 ngày, mô sinh học tái cấu trúc và bướm hoàn chỉnh phá kén chui ra.",
        coreVerb: "undergo & emerge",
        passiveForm: "is transformed into a winged insect",
        activeForm: "undergoes metamorphosis and emerges from the pupal case",
        isPassiveRecommended: false,
        suggestedSignposts: ["Inside the chrysalis", "Upon completion of metamorphosis"],
        keyEquipmentOrActors: ["Splitting chrysalis", "Wet-winged emerging butterfly"],
        iconName: "Sparkles",
        badgeColor: "purple",
      },
      {
        stepNumber: 5,
        title: "Wing Expansion & Adult Migration",
        descriptionEn: "The adult pumps fluid into its wings to fly, reproduce, and repeat the cycle.",
        descriptionVi: "Bướm trưởng thành bơm dịch làm căng cánh để bay, giao phối và bắt đầu vòng đời mới.",
        coreVerb: "expand & reproduce",
        passiveForm: "are expanded and dried",
        activeForm: "expands its wings, reaches sexual maturity, and reproduces",
        isPassiveRecommended: false,
        suggestedSignposts: ["The developmental cycle completes when", "Ultimately", "Finally"],
        keyEquipmentOrActors: ["Fully-expanded wings", "Migratory adult butterfly"],
        iconName: "Wind",
        badgeColor: "indigo",
      },
    ],
    processLexicon: [
      {
        word: "undergo metamorphosis",
        type: "verb",
        meaningVi: "Trải qua quá trình biến thái sinh học",
        exampleSentence: "The insect undergoes a radical physiological metamorphosis inside the protective pupal casing.",
      },
      {
        word: "feed voraciously",
        type: "verb",
        meaningVi: "Ăn một cách ngấu nghiến/phàm ăn để tích trữ năng lượng",
        exampleSentence: "During its larval stage, the caterpillar feeds voraciously on milkweed leaves.",
      },
      {
        word: "emerge from",
        type: "verb",
        meaningVi: "Phá kén chui ra ngoài",
        exampleSentence: "A fully developed butterfly emerges from the translucent chrysalis.",
      },
      {
        word: "perpetuate the cycle",
        type: "verb",
        meaningVi: "Duy trì / tiếp nối vòng lặp sinh tồn",
        exampleSentence: "The mature adults mate and lay eggs, thereby perpetuating the cyclical process.",
      },
    ],
    modelOverview: {
      text: "Overall, the biological cycle of the Monarch butterfly is a cyclical natural process comprising five principal stages, commencing with egg deposition on milkweed foliage, advancing through larval feeding and pupation, and culminating in the emergence of a winged adult that perpetuates the cycle.",
      keyElementsVi: [
        "Tính chất vòng tròn khép kín (cyclical natural process)",
        "Nêu rõ 5 giai đoạn chính (five principal stages)",
        "Sự chuyển tiếp từ trứng -> sâu bướm -> nhộng -> bướm trưởng thành",
      ],
    },
    modelBody1:
      "The cycle begins when an adult female Monarch butterfly lays several miniature eggs directly onto the underside of milkweed leaves. Following an incubation interval of roughly three to five days, tiny caterpillars hatch and immediately begin feeding voraciously on the surrounding foliage, undergoing several molting cycles as they rapidly expand in physical size.",
    modelBody2:
      "Once the caterpillar attains maximum developmental growth, it anchors itself upside down to a plant stem and encases its body in a hard, jade-green chrysalis. Within this protective casing, the insect undergoes profound anatomical metamorphosis over a period of ten to fourteen days. The process concludes when the adult butterfly splits the pupal shell, pumps fluid to inflate its vibrant orange-and-black wings, and takes flight to seek a mate, thereby initiating the cycle anew.",
    modelFullEssay:
      "The diagram shows the developmental stages in the life cycle of the Monarch butterfly (Danaus plexippus).\n\nOverall, the biological cycle of the Monarch butterfly is a cyclical natural process comprising five principal stages, commencing with egg deposition on milkweed foliage, advancing through larval feeding and pupation, and culminating in the emergence of a winged adult that perpetuates the cycle.\n\nThe cycle begins when an adult female Monarch butterfly lays several miniature eggs directly onto the underside of milkweed leaves. Following an incubation interval of roughly three to five days, tiny caterpillars hatch and immediately begin feeding voraciously on the surrounding foliage, undergoing several molting cycles as they rapidly expand in physical size.\n\nOnce the caterpillar attains maximum developmental growth, it anchors itself upside down to a plant stem and encases its body in a hard, jade-green chrysalis. Within this protective casing, the insect undergoes profound anatomical metamorphosis over a period of ten to fourteen days. The process concludes when the adult butterfly splits the pupal shell, pumps fluid to inflate its vibrant orange-and-black wings, and takes flight to seek a mate, thereby initiating the cycle anew.",
    examinerNotesVi: [
      "Văn phong chủ động chuẩn sinh học (Active Voice): Dùng chủ ngữ sinh học tự nhiên ('The cycle begins', 'caterpillars hatch and begin feeding', 'anchors itself', 'takes flight') thay vì lạm dụng bị động cơ học.",
      "Từ vựng học thuật C1/C2: 'cyclical natural process', 'incubation interval', 'anatomical metamorphosis', 'perpetuates the cycle'.",
    ],
  },

  // -------------------------------------------------------------
  // 3. MAP EVOLUTION: Past vs Present (Coastal Town 1990 - 2020)
  // -------------------------------------------------------------
  {
    id: "pm_map_coastal_redevelopment",
    title: "The Urban Transformation of Portville Town (1990 - 2020)",
    diagramType: "map_past_present",
    categoryLabelVi: "Bản Đồ Quá Khứ vs Hiện Tại (Past vs Present Evolution)",
    prompt:
      "The maps below show the changes that took place in the coastal town of Portville between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    estimatedTimeMin: 20,
    recommendedMinWords: 150,
    yearA: "1990",
    yearB: "2020",
    overallThemeVi: "Hiện đại hóa từ thị trấn cảng công nghiệp sang trung tâm du lịch & nghỉ dưỡng cao cấp",
    mutationHotspots: [
      {
        id: "mut_docklands",
        x: 20,
        y: 35,
        name: "Old Cargo Docks & Shipyards",
        category: "conversion",
        categoryLabelVi: "Chuyển Đổi Công Năng (Industrial to Tourism)",
        beforeStateEn: "Heavy industrial cargo docks with polluting cranes in 1990.",
        afterStateEn: "Repurposed into a luxurious leisure yacht marina and promenade by 2020.",
        vocabPair: {
          verb: "convert / redevelop",
          noun: "conversion / redevelopment",
        },
        sampleSentence: "The disused cargo docks were converted into a luxury marina for recreational yachts.",
      },
      {
        id: "mut_warehouses",
        x: 45,
        y: 30,
        name: "Derelict Warehouses",
        category: "demolition",
        categoryLabelVi: "Phá Hủy / Giải Tỏa Xây Mới (Demolition & Construction)",
        beforeStateEn: "Three large commercial brick warehouses in 1990.",
        afterStateEn: "Completely demolished to make way for high-rise residential apartment blocks in 2020.",
        vocabPair: {
          verb: "demolish / clear",
          noun: "demolition / clearance",
        },
        sampleSentence: "The old warehouses were flattened to make way for multi-story waterfront apartments.",
      },
      {
        id: "mut_fish_market",
        x: 75,
        y: 40,
        name: "Local Fish Market",
        category: "conversion",
        categoryLabelVi: "Chuyển Đổi Thương Mại (Repurposing)",
        beforeStateEn: "Traditional open-air wholesale fish market in 1990.",
        afterStateEn: "Reconstructed into a string of modern seafood restaurants and seaside cafes by 2020.",
        vocabPair: {
          verb: "repurpose / replace",
          noun: "repurposing / replacement",
        },
        sampleSentence: "The historic fish market gave way to a vibrant boulevard of upscale seafood cafes.",
      },
      {
        id: "mut_woodland",
        x: 80,
        y: 80,
        name: "Southern Woodland Area",
        category: "expansion",
        categoryLabelVi: "Mở Rộng Tiện Ích Đô Thị (Urban Encroachment)",
        beforeStateEn: "Dense pine forest occupying the entire southeastern quadrant in 1990.",
        afterStateEn: "Partially deforested and downsized to establish a public park and a spacious parking lot in 2020.",
        vocabPair: {
          verb: "downsize / clear",
          noun: "reduction / deforestation",
        },
        sampleSentence: "The woodland area was significantly curtailed to accommodate a public car park and parkland.",
      },
      {
        id: "mut_railway",
        x: 15,
        y: 85,
        name: "Railway Infrastructure",
        category: "construction",
        categoryLabelVi: "Xây Dựng & Nâng Cấp Tuyến Đường (Infrastructure Upgrade)",
        beforeStateEn: "A single freight railway line terminating abruptly at the docks in 1990.",
        afterStateEn: "Upgraded into an electrified high-speed passenger terminal connected to the town center in 2020.",
        vocabPair: {
          verb: "upgrade / extend",
          noun: "modernization / extension",
        },
        sampleSentence: "The outdated freight line was upgraded to a high-speed passenger rail terminal.",
      },
      {
        id: "mut_historic_castle",
        x: 50,
        y: 85,
        name: "Old Town Castle & Fortress",
        category: "unaltered",
        categoryLabelVi: "Giữ Nguyên Không Đổi (Preserved Heritage)",
        beforeStateEn: "16th-century stone fortress situated in the south-central district in 1990.",
        afterStateEn: "Preserved completely intact without structural alteration throughout the 30-year period.",
        vocabPair: {
          verb: "remain intact / stand unaltered",
          noun: "preservation / heritage conservation",
        },
        sampleSentence: "The historical fortress remained virtually unchanged amidst the surrounding modern development.",
      },
    ],
    mapFeaturesEpochA: [
      { id: "sea", label: "Northern Sea / Bay", x: 0, y: 0, width: 100, height: 25, color: "#38bdf8", type: "water" },
      { id: "docks", label: "Cargo Docks", x: 10, y: 25, width: 25, height: 18, color: "#64748b", type: "facility" },
      { id: "warehouses", label: "Commercial Warehouses", x: 40, y: 25, width: 25, height: 18, color: "#94a3b8", type: "building" },
      { id: "fish_mkt", label: "Fish Market", x: 70, y: 28, width: 22, height: 14, color: "#cbd5e1", type: "building" },
      { id: "main_road", label: "Main Highway", x: 0, y: 55, width: 100, height: 8, color: "#475569", type: "road" },
      { id: "freight_rail", label: "Freight Track", x: 10, y: 43, width: 6, height: 50, color: "#334155", type: "road" },
      { id: "castle", label: "16th-Century Castle", x: 45, y: 75, width: 18, height: 18, color: "#78716c", type: "building" },
      { id: "forest", label: "Dense Pine Woodland", x: 70, y: 68, width: 26, height: 28, color: "#22c55e", type: "greenery" },
    ],
    mapFeaturesEpochB: [
      { id: "sea", label: "Northern Sea / Bay", x: 0, y: 0, width: 100, height: 25, color: "#38bdf8", type: "water" },
      { id: "marina", label: "Luxury Yacht Marina", x: 10, y: 25, width: 25, height: 18, color: "#0ea5e9", type: "facility" },
      { id: "apartments", label: "High-Rise Waterfront Apartments", x: 40, y: 25, width: 25, height: 18, color: "#6366f1", type: "residential" },
      { id: "restaurants", label: "Seafood Cafes & Promenade", x: 70, y: 28, width: 22, height: 14, color: "#ec4899", type: "building" },
      { id: "main_road", label: "Dual Carriageway", x: 0, y: 55, width: 100, height: 8, color: "#334155", type: "road" },
      { id: "hs_rail", label: "High-Speed Rail Terminal", x: 8, y: 70, width: 16, height: 24, color: "#8b5cf6", type: "facility" },
      { id: "castle", label: "Historic Castle (Preserved)", x: 45, y: 75, width: 18, height: 18, color: "#78716c", type: "building" },
      { id: "public_park", label: "Public Park", x: 70, y: 68, width: 14, height: 28, color: "#16a34a", type: "greenery" },
      { id: "car_park", label: "Spacious Car Park", x: 86, y: 68, width: 10, height: 28, color: "#94a3b8", type: "facility" },
    ],
    spatialLexicon: [
      {
        verb: "demolish / knock down / flatten",
        noun: "demolition / clearance",
        category: "demolition",
        meaningVi: "Phá bỏ / Giải tỏa hoàn toàn công trình cũ",
        example: "The industrial warehouses were demolished to make way for residential housing.",
      },
      {
        verb: "erect / construct / develop",
        noun: "construction / erection",
        category: "construction",
        meaningVi: "Xây dựng mới / Dựng lên công trình",
        example: "A luxury yacht marina was erected in place of the old cargo docks.",
      },
      {
        verb: "convert into / repurpose as / give way to",
        noun: "conversion / transformation",
        category: "conversion",
        meaningVi: "Chuyển đổi công năng từ mục đích A sang B",
        example: "The traditional fish market was repurposed as a string of waterfront dining venues.",
      },
      {
        verb: "expand / enlarge / extend",
        noun: "expansion / enlargement",
        category: "expansion",
        meaningVi: "Mở rộng diện tích hoặc quy mô",
        example: "The transportation network was substantially expanded with high-speed rail connectivity.",
      },
      {
        verb: "remain intact / stand unaltered",
        noun: "preservation / permanence",
        category: "unaltered",
        meaningVi: "Giữ nguyên trạng không bị thay đổi",
        example: "The historic fortress stood unaltered across the three decades.",
      },
    ],
    modelOverview: {
      text: "Overall, the town of Portville witnessed a dramatic infrastructural modernization over the 30-year timeframe, transitioning from a heavy industrial shipping harbor into an upscale residential and tourist destination, while its historical landmark was preserved intact.",
      keyElementsVi: [
        "Khái quát xu hướng chuyển dịch: từ cảng công nghiệp (industrial harbor) sang du lịch & cư dân (residential & tourist destination)",
        "Điểm nhấn di sản được giữ nguyên (historic landmark preserved intact)",
      ],
    },
    modelBody1:
      "Looking first at the northern waterfront district, the most salient transformation occurred in the heavy industrial sector. The old cargo docks and shipyards from 1990 were thoroughly redeveloped into a luxury marina catering to recreational yachts. Concurrently, the adjacent brick warehouses were flattened to facilitate the construction of modern waterfront apartment towers, while the former open-air fish market gave way to an elegant promenade lined with seafood restaurants and cafes.",
    modelBody2:
      "Turning to the southern half of the town, notable developments took place in transportation and recreational amenities. The outdated freight railway line was replaced by a modern high-speed passenger rail terminal. In the southeast, the extensive pine forest was downsized considerably, making room for a landscaped public park and an adjoining car park. In stark contrast to these sweeping modifications, the 16th-century stone castle in the south-central zone remained completely unaltered throughout the entire 30-year period.",
    modelFullEssay:
      "The maps below show the changes that took place in the coastal town of Portville between 1990 and 2020.\n\nOverall, the town of Portville witnessed a dramatic infrastructural modernization over the 30-year timeframe, transitioning from a heavy industrial shipping harbor into an upscale residential and tourist destination, while its historical landmark was preserved intact.\n\nLooking first at the northern waterfront district, the most salient transformation occurred in the heavy industrial sector. The old cargo docks and shipyards from 1990 were thoroughly redeveloped into a luxury marina catering to recreational yachts. Concurrently, the adjacent brick warehouses were flattened to facilitate the construction of modern waterfront apartment towers, while the former open-air fish market gave way to an elegant promenade lined with seafood restaurants and cafes.\n\nTurning to the southern half of the town, notable developments took place in transportation and recreational amenities. The outdated freight railway line was replaced by a modern high-speed passenger rail terminal. In the southeast, the extensive pine forest was downsized considerably, making room for a landscaped public park and an adjoining car park. In stark contrast to these sweeping modifications, the 16th-century stone castle in the south-central zone remained completely unaltered throughout the entire 30-year period.",
    examinerNotesVi: [
      "Task Achievement (Band 9.0): Phân chia cấu trúc Body theo địa lý rõ ràng (Northern waterfront vs Southern sector). Khái quát hóa được tính chất chuyển đổi kinh tế xã hội.",
      "Lexical Resource (Band 9.0): Đa dạng hóa linh hoạt các động từ biến đổi đô thị (redeveloped, flattened, gave way to, downsized, stood unaltered).",
      "Coherence & Cohesion (Band 8.5+): Cụm định hướng không gian hoàn hảo ('Looking first at the northern waterfront', 'Turning to the southern half', 'In stark contrast to these sweeping modifications').",
    ],
  },

  // -------------------------------------------------------------
  // 4. MAP FUTURE PLAN: University Campus 10-Year Masterplan
  // -------------------------------------------------------------
  {
    id: "pm_map_campus_masterplan",
    title: "Proposed 10-Year Masterplan for St. Jude University Campus",
    diagramType: "map_present_future",
    categoryLabelVi: "Bản Đồ Hiện Tại vs Quy Hoạch Tương Lai (Present vs Future Plan)",
    prompt:
      "The plans illustrate the current layout of St. Jude University Campus and the proposed redevelopment scheme for the next decade. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    estimatedTimeMin: 20,
    recommendedMinWords: 150,
    yearA: "Present",
    yearB: "2035 (Proposed)",
    overallThemeVi: "Chuyển dịch sang mô hình trường đại học thông minh, sinh thái (Eco-smart pedestrianized campus)",
    mutationHotspots: [
      {
        id: "mut_car_park_ai",
        x: 25,
        y: 30,
        name: "Northwest Surface Parking Lot",
        category: "conversion",
        categoryLabelVi: "Chuyển Đổi Sang Công Nghệ (Repurposing into AI Hub)",
        beforeStateEn: "Open asphalt car park for 300 vehicles currently.",
        afterStateEn: "Proposed to be replaced by a 5-story AI & Innovation Research Center by 2035.",
        vocabPair: {
          verb: "replace / construct",
          noun: "replacement / construction",
        },
        sampleSentence: "The open surface car park is slated to be replaced by a futuristic AI & Innovation Research Center.",
      },
      {
        id: "mut_union_dorm",
        x: 75,
        y: 35,
        name: "Old Single-Story Student Union",
        category: "demolition",
        categoryLabelVi: "Phá Dỡ Tầng Thấp Để Xây Cao Ốc Ký Túc Xá",
        beforeStateEn: "Sprawling single-level student union building at present.",
        afterStateEn: "Planned for demolition to erect a multi-tier eco-dormitory complex with retail spaces.",
        vocabPair: {
          verb: "demolish / construct",
          noun: "demolition / redevelopment",
        },
        sampleSentence: "The single-story student union will be demolished to erect an 8-story eco-dormitory complex.",
      },
      {
        id: "mut_central_lawn",
        x: 50,
        y: 50,
        name: "Central Traffic Circle & Lawn",
        category: "conversion",
        categoryLabelVi: "Đi Bộ Hóa Tuyến Đường Trung Tâm (Pedestrianization)",
        beforeStateEn: "Vehicular roundabout cutting through the main green quadrangle.",
        afterStateEn: "To be completely pedestrianized into an expanded botanical garden and solar pavilion.",
        vocabPair: {
          verb: "pedestrianize / expand",
          noun: "pedestrianization / expansion",
        },
        sampleSentence: "The central vehicular thoroughfare will be completely pedestrianized into a botanical green quad.",
      },
      {
        id: "mut_main_library",
        x: 50,
        y: 80,
        name: "Historic Central Library",
        category: "expansion",
        categoryLabelVi: "Mở Rộng Thêm Cánh Mới (Extension)",
        beforeStateEn: "Neo-classical library building currently standing alone in the south.",
        afterStateEn: "Retained with the addition of a modern glass digital wing on its eastern flank.",
        vocabPair: {
          verb: "expand / add an extension to",
          noun: "extension / enlargement",
        },
        sampleSentence: "The historic central library will be preserved, with a glass digital media wing annexed to its east.",
      },
    ],
    mapFeaturesEpochA: [
      { id: "car_park", label: "Surface Car Park", x: 10, y: 15, width: 30, height: 28, color: "#94a3b8", type: "facility" },
      { id: "union", label: "1-Story Student Union", x: 60, y: 15, width: 30, height: 28, color: "#f59e0b", type: "building" },
      { id: "road_roundabout", label: "Traffic Roundabout", x: 40, y: 48, width: 20, height: 16, color: "#475569", type: "road" },
      { id: "library", label: "Central Library", x: 35, y: 70, width: 30, height: 22, color: "#6366f1", type: "building" },
    ],
    mapFeaturesEpochB: [
      { id: "ai_center", label: "AI & Innovation Center", x: 10, y: 15, width: 30, height: 28, color: "#06b6d4", type: "building" },
      { id: "eco_dorm", label: "8-Story Eco-Dormitory", x: 60, y: 15, width: 30, height: 28, color: "#10b981", type: "residential" },
      { id: "pedestrian_quad", label: "Pedestrian Botanical Quad", x: 30, y: 45, width: 40, height: 22, color: "#22c55e", type: "greenery" },
      { id: "library_ext", label: "Library + Digital Wing", x: 30, y: 70, width: 40, height: 22, color: "#6366f1", type: "building" },
    ],
    spatialLexicon: [
      {
        verb: "is projected to be / is slated to be",
        noun: "projection / proposal",
        category: "construction",
        meaningVi: "Được lên kế hoạch / dự kiến sẽ...",
        example: "The open parking lot is slated to be replaced by an innovation center.",
      },
      {
        verb: "undergo pedestrianization",
        noun: "pedestrianization",
        category: "conversion",
        meaningVi: "Được chuyển đổi thành khu vực chỉ dành cho người đi bộ",
        example: "The central roundabout will undergo total pedestrianization.",
      },
      {
        verb: "annex an extension to",
        noun: "annexation / wing addition",
        category: "expansion",
        meaningVi: "Mở rộng thêm một cánh kiến trúc mới",
        example: "A digital media wing will be annexed to the existing library structure.",
      },
      {
        verb: "be demolished in favor of",
        noun: "demolition",
        category: "demolition",
        meaningVi: "Bị phá dỡ để nhường chỗ cho...",
        example: "The single-level building will be demolished in favor of high-density housing.",
      },
    ],
    modelOverview: {
      text: "Overall, the proposed masterplan entails a comprehensive modernization of St. Jude University Campus, pivoting toward sustainable high-density accommodation, cutting-edge technology hubs, and an entirely pedestrianized green environment.",
      keyElementsVi: [
        "Khái quát xu hướng tương lai: hiện đại hóa toàn diện (comprehensive modernization)",
        "Định hướng sinh thái & công nghệ cao (sustainable high-density accommodation & tech hubs)",
        "Khuôn viên đi bộ xanh (pedestrianized green environment)",
      ],
    },
    modelBody1:
      "In the northern sector, substantial infrastructural changes are anticipated. The current surface car park in the northwest is projected to be superseded by a five-story AI & Innovation Research Center. Meanwhile, the outdated single-level student union on the northeastern flank will be demolished in favor of a modern eight-story eco-dormitory complex featuring integrated communal amenities.",
    modelBody2:
      "Turning to the central and southern zones, emphasis will be placed on sustainability and digital modernization. The vehicular roundabout currently bifurcating the campus is slated for total pedestrianization, expanding the central lawn into a continuous botanical quad. Lastly, while the historic central library will be retained, its operational capacity will be significantly enhanced through the construction of a contemporary glass digital wing on its eastern perimeter.",
    modelFullEssay:
      "The plans illustrate the current layout of St. Jude University Campus and the proposed redevelopment scheme for the next decade.\n\nOverall, the proposed masterplan entails a comprehensive modernization of St. Jude University Campus, pivoting toward sustainable high-density accommodation, cutting-edge technology hubs, and an entirely pedestrianized green environment.\n\nIn the northern sector, substantial infrastructural changes are anticipated. The current surface car park in the northwest is projected to be superseded by a five-story AI & Innovation Research Center. Meanwhile, the outdated single-level student union on the northeastern flank will be demolished in favor of a modern eight-story eco-dormitory complex featuring integrated communal amenities.\n\nTurning to the central and southern zones, emphasis will be placed on sustainability and digital modernization. The vehicular roundabout currently bifurcating the campus is slated for total pedestrianization, expanding the central lawn into a continuous botanical quad. Lastly, while the historic central library will be retained, its operational capacity will be significantly enhanced through the construction of a contemporary glass digital wing on its eastern perimeter.",
    examinerNotesVi: [
      "Ngữ pháp thì Tương lai & Thể giả định (Future Predictions & Passive Formulations): Sử dụng nhuần nhuyễn 'is projected to be superseded', 'is slated for total pedestrianization', 'will be retained'.",
      "Từ vựng học thuật đỉnh cao: 'superseded', 'bifurcating', 'annexed', 'integrated communal amenities'.",
    ],
  },
];
