/**
 * Mock Data for Writing Task 1 Map & Process Engineering
 * IELTS Non-Numeric Cartography & Process Flow (Band 7.5 - 8.5+)
 */

export interface MapFeatureChange {
  id: string;
  name: string;
  quadrant: 'North-West' | 'North-East' | 'South-West' | 'South-East';
  changeType: 'constructed' | 'demolished' | 'expanded' | 'converted' | 'unchanged';
  coordinates1995: { x: number; y: number; width: number; height: number };
  coordinates2025: { x: number; y: number; width: number; height: number };
  descriptionVi: string;
}

export interface ProcessStageNode {
  stageNumber: number;
  name: string;
  passiveSentence: string;
  sequencer: string;
  equipment: string;
  inputOutput: string;
  x: number;
  y: number;
}

export interface MapProcessTaskItem {
  id: string;
  type: 'map' | 'process';
  title: string;
  prompt: string;
  subtitle: string;
  timeFrames?: [string, string];
  mapFeatures?: MapFeatureChange[];
  processStages?: ProcessStageNode[];
  band8SampleEssay: string;
  overviewFormula: string;
  vocabularyCheatSheet: Array<{ term: string; ipa: string; meaningVi: string; category: string }>;
  examinerNotes: string[];
}

export const MOCK_MAP_PROCESS_DATA: MapProcessTaskItem[] = [
  {
    id: 'mp-task-01',
    type: 'map',
    title: 'The Urban Transformation of Coastal Penzance (1995 vs 2025)',
    subtitle: 'From a Quaint Maritime Fishing Settlement to a Modernized Commercial Resort',
    prompt: 'The two maps below show the developments that have taken place in the coastal town of Penzance between 1995 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    timeFrames: ['1995', '2025'],
    mapFeatures: [
      {
        id: 'feat-1',
        name: 'Industrial Fish Market ➔ Luxury Marina & Yacht Club',
        quadrant: 'South-East',
        changeType: 'converted',
        coordinates1995: { x: 500, y: 300, width: 220, height: 100 },
        coordinates2025: { x: 500, y: 300, width: 240, height: 110 },
        descriptionVi: 'Chợ cá truyền thống ở bờ biển đông nam bị dỡ bỏ và thay thế bằng bến du thuyền cao cấp.'
      },
      {
        id: 'feat-2',
        name: 'Farmland ➔ High-Density Residential Estate',
        quadrant: 'North-West',
        changeType: 'constructed',
        coordinates1995: { x: 80, y: 60, width: 250, height: 120 },
        coordinates2025: { x: 80, y: 60, width: 250, height: 130 },
        descriptionVi: 'Diện tích đất nông nghiệp ở phía tây bắc bị chuyển đổi hoàn toàn thành khu dân cư hiện đại.'
      },
      {
        id: 'feat-3',
        name: 'Main High Street ➔ Pedestrianized Commercial Boulevard',
        quadrant: 'South-West',
        changeType: 'converted',
        coordinates1995: { x: 120, y: 220, width: 260, height: 40 },
        coordinates2025: { x: 120, y: 220, width: 260, height: 50 },
        descriptionVi: 'Đường phố chính cho xe cơ giới được cải tạo thành phố đi bộ cấm xe hơi kết hợp trung tâm mua sắm.'
      },
      {
        id: 'feat-4',
        name: 'Forest Park ➔ Diminished Footprint for Wind Turbines',
        quadrant: 'North-East',
        changeType: 'expanded',
        coordinates1995: { x: 480, y: 50, width: 240, height: 140 },
        coordinates2025: { x: 480, y: 50, width: 240, height: 140 },
        descriptionVi: 'Rừng cây phía đông bắc bị thu hẹp một phần để dựng các turbine điện gió tái tạo.'
      }
    ],
    band8SampleEssay: `The two maps illustrate the extensive urban and commercial modernization that took place in the coastal settlement of Penzance over a thirty-year period from 1995 to 2025.\n\nOverall, it is immediately clear that Penzance was transformed from a quiet, fishing-oriented maritime village into a sophisticated residential and tourism hub. The most notable modifications include the complete eradication of agricultural land in favor of housing and the substantial upgrading of leisure facilities along the southern coastline.\n\nIn the north-western sector of the town, the extensive farmland that existed in 1995 was demolished and replaced by a high-density residential complex, complete with integrated access roads. Adjacent to this development, the central High Street was completely pedestrianized, with vehicular access removed to make way for boutique retail establishments and open-air cafes.\n\nTurning to the eastern periphery, the traditional fish processing market located on the south-eastern coast was flattened and converted into a luxury marina and yacht pavilion. Meanwhile, in the north-east, the natural woodland area diminished slightly in footprint to accommodate the installation of three offshore-facing wind turbines, while the central historic church remained virtually unchanged in its original position throughout the entire period.`,
    overviewFormula: 'Overall, it is immediately clear that [Town] was transformed from [Old State] into [New State]. The most notable modifications include [Major Change 1] and [Major Change 2].',
    vocabularyCheatSheet: [
      { term: 'pedestrianize', ipa: '/pəˈdes.tri.ə.naɪz/', meaningVi: 'biến thành phố đi bộ cấm xe', category: 'Urban Modernization' },
      { term: 'raze to the ground', ipa: '/reɪz tuː ðə ɡraʊnd/', meaningVi: 'san phẳng hoàn toàn', category: 'Demolition' },
      { term: 'in the north-western sector', ipa: '/ɪn ðə nɔːrθ ˈwes.tɚn ˈsek.tɚ/', meaningVi: 'ở khu vực góc phía tây bắc', category: 'Spatial Preposition' },
      { term: 'make way for', ipa: '/meɪk weɪ fɔːr/', meaningVi: 'nhường chỗ cho công trình mới', category: 'Transformation' }
    ],
    examinerNotes: [
      'Task Achievement: Band 8.5 - Overview highlights dual transformation (industrial to tourism & agriculture to residential).',
      'Coherence: Logical division into North-West (land) and South-East (coast).',
      'GRA: 100% accurate spatial prepositions without confusing "in the north" with "to the north".'
    ]
  },
  {
    id: 'mp-task-02',
    type: 'map',
    title: 'Redevelopment Plans for Southside Docklands (2000 vs 2024)',
    subtitle: 'Industrial Dereliction to Mixed-Use Eco-District',
    prompt: 'The maps below demonstrate the structural redevelopment of Southside Industrial Docklands between 2000 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    timeFrames: ['2000', '2024'],
    mapFeatures: [
      {
        id: 'sd-1',
        name: 'Derelict Warehouses ➔ Waterfront Promenade & Cafes',
        quadrant: 'South-West',
        changeType: 'converted',
        coordinates1995: { x: 100, y: 250, width: 240, height: 120 },
        coordinates2025: { x: 100, y: 250, width: 240, height: 120 },
        descriptionVi: 'Các kho hàng cũ kỹ được phá dỡ để xây dựng đường đi dạo ven sông và quán cà phê.'
      },
      {
        id: 'sd-2',
        name: 'Railway Freight Depot ➔ High-Tech Innovation Park',
        quadrant: 'North-East',
        changeType: 'constructed',
        coordinates1995: { x: 480, y: 80, width: 240, height: 130 },
        coordinates2025: { x: 480, y: 80, width: 250, height: 130 },
        descriptionVi: 'Ga hàng hóa đường sắt được thay thế bằng khu công viên công nghệ cao.'
      }
    ],
    band8SampleEssay: `The provided maps delineate the structural regeneration of the Southside industrial docklands district from 2000 to 2024.\n\nOverall, the docklands experienced a comprehensive shift from a neglected heavy-industrial freight zone to a dynamic mixed-use commercial and recreational precinct. The most conspicuous alterations were the repurposing of obsolete warehouse space and the vast expansion of public green infrastructure.\n\nIn 2000, the south-western riverbank was dominated by rowed industrial storage warehouses. By 2024, these structures had been completely demolished to make way for a paved waterfront promenade flanked by cafes and boutique commercial outlets. Adjacent to this, the central crane depot was dismantled and transformed into an open-air public amphitheatre.\n\nIn the north-eastern quadrant, the disused freight railway line was uprooted, and the land was subsequently repurposed into a high-technology research park and co-working campus. Throughout this comprehensive redevelopment, the historic maritime customs house located on the eastern dock entrance was meticulously preserved in its original footprint.`,
    overviewFormula: 'Overall, the district experienced a comprehensive shift from [Past State] to [Present State], characterized by [Transformation A] and [Preservation B].',
    vocabularyCheatSheet: [
      { term: 'repurpose', ipa: '/riːˈpɝː.pəs/', meaningVi: 'tái sử dụng mục đích mới', category: 'Urban Modernization' },
      { term: 'preserved in its original footprint', ipa: '/prɪˈzɝːvd ɪn ɪts əˈrɪdʒ.ən.əl ˈfʊt.prɪnt/', meaningVi: 'bảo tồn nguyên trạng diện tích ban đầu', category: 'Preservation' },
      { term: 'adjacent to', ipa: '/əˈdʒeɪ.sənt tuː/', meaningVi: 'liền kề với', category: 'Spatial Preposition' }
    ],
    examinerNotes: [
      'Lexical Resource: Exquisite urban terminology ("mixed-use precinct", "obsolete warehouse", "promenade").',
      'Grammatical Range: High variety of passive perfect tenses ("had been demolished", "was subsequently repurposed").'
    ]
  },
  {
    id: 'mp-task-03',
    type: 'process',
    title: 'The Industrial Manufacturing of Portland Cement & Concrete',
    subtitle: 'A Linear Mechanical Production Flow (Raw Minerals to Ready-Mix)',
    prompt: 'The diagrams below illustrate the stages in the industrial production of cement and the subsequent manufacturing of concrete for construction purposes. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    processStages: [
      {
        stageNumber: 1,
        name: 'Mineral Crushing',
        passiveSentence: 'Limestone and clay are extracted and introduced into an industrial crusher to produce fine powder.',
        sequencer: 'In the initial phase',
        equipment: 'Heavy-duty mechanical crusher',
        inputOutput: 'Limestone & Clay ➔ Crushed Powder',
        x: 100,
        y: 120
      },
      {
        stageNumber: 2,
        name: 'Mixing & Blending',
        passiveSentence: 'The crushed powder is thoroughly blended in a cylindrical mixing chamber.',
        sequencer: 'Following this',
        equipment: 'Rotating mixer drum',
        inputOutput: 'Dry Powder ➔ Uniform Mixture',
        x: 280,
        y: 120
      },
      {
        stageNumber: 3,
        name: 'Thermal Kiln Heating (1500°C)',
        passiveSentence: 'The blended raw material is transferred into a rotating kiln and subjected to extreme heat exceeding 1500°C.',
        sequencer: 'Subsequently',
        equipment: 'Rotating thermal kiln with gas burner',
        inputOutput: 'Mixture ➔ Raw Clinker',
        x: 460,
        y: 120
      },
      {
        stageNumber: 4,
        name: 'Grinding & Packaging',
        passiveSentence: 'The resulting clinker is cooled and milled through a fine grinder before being bagged as finished Portland cement.',
        sequencer: 'In the penultimate phase',
        equipment: 'Fine ball grinder & bagging machine',
        inputOutput: 'Clinker ➔ Packaged Cement Bags',
        x: 640,
        y: 120
      },
      {
        stageNumber: 5,
        name: 'Concrete Formulation & Agitation',
        passiveSentence: 'In the final independent process, cement (15%) is combined with water (10%), sand (25%), and gravel (50%) inside a concrete mixer.',
        sequencer: 'Culminating in',
        equipment: 'Rotating concrete agitator drum',
        inputOutput: 'Cement + Aggregates ➔ Ready-mix Concrete',
        x: 400,
        y: 300
      }
    ],
    band8SampleEssay: `The diagrams outline the multi-stage industrial procedure involved in manufacturing Portland cement and its subsequent integration into concrete production.\n\nOverall, the entire process comprises two distinct stages: a four-step linear thermal and mechanical sequence that converts raw limestone and clay into powdered cement, followed by a proportionate blending process that produces concrete for construction use.\n\nIn the initial stage of cement production, raw limestone and clay are excavated and crushed into a fine powder by a heavy-duty mechanical crusher. Following this, the powder is passed through a cylindrical mixer to ensure an even consistency prior to entering a rotating kiln. Within the kiln, the mixture is subjected to intense thermal energy reaching 1500°C, fueled by an internal gas burner. The resulting clinker is subsequently cooled and milled in a fine grinder, culminating in finished Portland cement packaged into industrial bags.\n\nIn the secondary phase, concrete is produced by combining specific proportions of raw materials inside a rotating mixer drum. Cement accounts for 15% of the total volume, which is blended with 10% water, 25% sand, and a dominant 50% gravel aggregate to produce ready-mix concrete.`,
    overviewFormula: 'Overall, the entire process comprises [Number] distinct phases: an initial sequence converting [Raw Materials] into [Intermediate Product], followed by [Final Product Formulation].',
    vocabularyCheatSheet: [
      { term: 'subjected to extreme heat', ipa: '/səbˈdʒek.tɪd tuː ɪkˈstriːm hiːt/', meaningVi: 'được đưa qua nhiệt độ cao khắc nghiệt', category: 'Passive Flow' },
      { term: 'prior to entering', ipa: '/praɪ.ɚ tuː ˈen.t̬ɚ.ɪŋ/', meaningVi: 'trước khi đi vào công đoạn tiếp theo', category: 'Sequencer' },
      { term: 'culminating in', ipa: '/ˈkʌl.mə.neɪ.t̬ɪŋ ɪn/', meaningVi: 'kết thúc bằng công đoạn...', category: 'Sequencer' },
      { term: 'milled in a fine grinder', ipa: '/mɪld ɪn ə faɪn ˈɡraɪn.dɚ/', meaningVi: 'được nghiền mịn trong máy nghiền', category: 'Passive Flow' }
    ],
    examinerNotes: [
      'Task Achievement: Flawless coverage of all proportions (15% cement, 10% water, 25% sand, 50% gravel).',
      'Passive Accuracy: 100% passive constructions for mechanical actions without awkward active pronouns.',
      'Sequencers: Natural transition flow ("In the initial stage", "Following this", "Within the kiln", "In the secondary phase").'
    ]
  },
  {
    id: 'mp-task-04',
    type: 'process',
    title: 'The Closed-Loop Mechanical Recycling of Plastic Bottles',
    subtitle: 'Transforming Post-Consumer PET into High-Grade Polyester Yarn',
    prompt: 'The flow chart illustrates the recycling process of used plastic bottles into commercial polyester yarn. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    processStages: [
      {
        stageNumber: 1,
        name: 'Sorting & Baling',
        passiveSentence: 'Discarded PET bottles are collected, optically sorted by polymer type, and compressed into dense rectangular bales.',
        sequencer: 'Initially',
        equipment: 'Optical sensor sorter & hydraulic baler',
        inputOutput: 'Loose Bottles ➔ Compressed Bales',
        x: 100,
        y: 120
      },
      {
        stageNumber: 2,
        name: 'Crushing & Flaking',
        passiveSentence: 'The compressed bales are dismantled and shredded into micro-flakes by rotary blades.',
        sequencer: 'Next',
        equipment: 'Industrial rotary shredder',
        inputOutput: 'Bales ➔ Plastic Flakes',
        x: 280,
        y: 120
      },
      {
        stageNumber: 3,
        name: 'Chemical Washing & Decontamination',
        passiveSentence: 'The plastic flakes undergo high-temperature decontamination baths to strip adhesives and contaminants.',
        sequencer: 'In the subsequent phase',
        equipment: 'Thermal detergent bath',
        inputOutput: 'Dirty Flakes ➔ Purified Flakes',
        x: 460,
        y: 120
      },
      {
        stageNumber: 4,
        name: 'Extrusion & Pelletizing',
        passiveSentence: 'The dried flakes are melted and extruded through fine dies into uniform polymer pellets.',
        sequencer: 'Thereafter',
        equipment: 'Thermal extruder & cooling pelletizer',
        inputOutput: 'Flakes ➔ Polymer Pellets',
        x: 640,
        y: 120
      },
      {
        stageNumber: 5,
        name: 'Spinning into Yarn',
        passiveSentence: 'Finally, the pellets are re-melted and drawn through spinnerets to produce continuous spools of polyester fiber.',
        sequencer: 'Culminating in',
        equipment: 'Multi-nozzle spinneret & winding spindle',
        inputOutput: 'Pellets ➔ Spools of Polyester Yarn',
        x: 400,
        y: 300
      }
    ],
    band8SampleEssay: `The flow chart illustrates the cyclical industrial process by which discarded plastic beverage bottles are systematically recycled and converted into commercial polyester yarn.\n\nOverall, the procedure consists of five sequential stages, starting with the mechanical collection and optical sorting of post-consumer waste, progressing through intensive chemical decontamination, and culminating in the thermal extrusion and spinning of recycled synthetic fibers.\n\nIn the first stage, used plastic bottles are deposited into specialized recycling bins, gathered, and optically sorted according to plastic grade before being compacted into large bales. Subsequently, these compressed bales are shredded by industrial rotary blades into minute plastic flakes. To remove residual labels and organic impurities, the flakes undergo high-temperature washing in specialized detergent baths.\n\nOnce thoroughly cleansed and dried, the plastic flakes are transferred to an extruder where they are heated, melted, and formed into uniform polymer pellets. In the final phase, these pellets are reheated and forced through fine spinneret nozzles, yielding continuous strands of polyester yarn that are wound onto spools for textile manufacturing.`,
    overviewFormula: 'Overall, the procedure consists of [Number] sequential stages, starting with [Collection/Raw Input], progressing through [Decontamination/Processing], and culminating in [Final Form].',
    vocabularyCheatSheet: [
      { term: 'undergo decontamination', ipa: '/ˌʌn.dɚˈɡoʊ diː.kənˌtæm.əˈneɪ.ʃən/', meaningVi: 'trải qua quá trình khử trùng làm sạch', category: 'Passive Flow' },
      { term: 'extruded through fine dies', ipa: '/ɪkˈstruːdɪd θruː faɪn daɪz/', meaningVi: 'được đùn ép qua khuôn định hình', category: 'Technical Passive' },
      { term: 'compacted into large bales', ipa: '/kəmˈpæk.tɪd ˈɪn.tuː lɑːrdʒ beɪlz/', meaningVi: 'được nén thành các kiện lớn', category: 'Passive Flow' }
    ],
    examinerNotes: [
      'Task Achievement: Every single intermediate stage (sorting, shredding, washing, pelletizing, spinning) is explicitly identified.',
      'Lexical Diversity: High precision terms (PET, post-consumer waste, spinneret, extrusion, spools).'
    ]
  }
];
