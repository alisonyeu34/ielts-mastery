/**
 * Mock Data for Hierarchical Syntactic Tree & Garden-Path Disentangler Studio (Step 85)
 * Authentic IELTS Reading Passage 3 Sentences with Nested Modifiers, Reduced Relatives & Garden-Path Traps
 */

import { GardenPathChallenge } from "@/lib/syntacticTreeParser";

export const MOCK_GARDEN_PATH_SENTENCES: GardenPathChallenge[] = [
  {
    id: "gp_astrophysics_dark_matter",
    passageTitle: "Gravitational Lensing and Non-Baryonic Matter Distribution",
    passageDomain: "Astrophysics & Cosmology",
    sentenceText: "The anomalous gravitational distortions observed through deep-space radio interferometry telescopes positioned across Chilean plateaus fundamentally challenge established cosmological assumptions regarding cold dark matter density.",
    wordCount: 27,
    decoyVerbs: [
      {
        verb: "observed",
        actualRole: "Past Participle Modifier (vmod / reduced relative)",
        trapReason: "Thí sinh dễ nhầm 'observed' là động từ chính ở thì quá khứ đơn (V-ed). Thực chất đây là mệnh đề phân từ rút gọn: '[which were] observed through...'"
      },
      {
        verb: "positioned",
        actualRole: "Past Participle Modifier (vmod)",
        trapReason: "Là phân từ rút gọn thứ hai bổ nghĩa cho 'telescopes' ('[which are] positioned across...')."
      }
    ],
    trueMainVerb: "challenge",
    coreSubject: "The anomalous gravitational distortions",
    coreObjectOrComplement: "established cosmological assumptions",
    reducedClauseSnippet: "observed through deep-space radio interferometry telescopes positioned across Chilean plateaus",
    fullDisentangledAnalysis: "Xương sống nòng cốt của câu chỉ đơn giản là: 'Distortions challenge assumptions' (Sự biến dạng thách thức các giả định). Toàn bộ 16 từ ở giữa chỉ là hai tầng phân từ rút gọn (-ed) mô tả công cụ và địa điểm quan sát.",
    cognitiveTrapType: "reduced_relative_verb_overlap",
    ieltsTrapExplanation: "Dạng bài True/False/Not Given thường hỏi: 'Did scientists observe dark matter directly?' Nếu thí sinh gắn 'observed' với 'telescopes' làm hành động chính của câu thay vì bổ ngữ, họ sẽ chọn nhầm TRUE thay vì NOT GIVEN.",
    cambridgeTip: "Gặp chuỗi danh từ + V-ed + giới từ + danh từ + V-ed, hãy bỏ qua các phân từ bị kẹp giữa và tìm động từ số nhiều chia thì hiện tại đơn ở vế sau ('challenge').",
    nodes: [
      { id: "n1", word: "distortions", pos: "NNS", dep: "nsubj", headId: "n4", isCoreSkeleton: true, x: 80, y: 180, depth: 0, vietnameseRole: "Chủ ngữ chính (Subject)" },
      { id: "n2", word: "observed", pos: "VBN", dep: "vmod", headId: "n1", isCoreSkeleton: false, x: 220, y: 220, depth: 1, vietnameseRole: "Phân từ rút gọn Tầng 1 ([which were] observed)" },
      { id: "n3", word: "positioned", pos: "VBN", dep: "vmod", headId: "n2", isCoreSkeleton: false, x: 380, y: 240, depth: 2, vietnameseRole: "Phân từ rút gọn Tầng 2 ([which are] positioned)" },
      { id: "n4", word: "challenge", pos: "VBP", dep: "root", headId: null, isCoreSkeleton: true, x: 540, y: 120, depth: 0, vietnameseRole: "Động từ vị ngữ chính (Root Finite Verb)" },
      { id: "n5", word: "assumptions", pos: "NNS", dep: "dobj", headId: "n4", isCoreSkeleton: true, x: 700, y: 180, depth: 0, vietnameseRole: "Tân ngữ trực tiếp (Direct Object)" }
    ]
  },
  {
    id: "gp_neurobiology_synaptic_plasticity",
    passageTitle: "Neuroplasticity and Long-Term Potentiation in Adult Primates",
    passageDomain: "Cognitive Neurobiology",
    sentenceText: "The intricate neuronal pathways neurobiologists investigating cerebral plasticity originally hypothesized would permanently degenerate under continuous neurotoxic exposure surprisingly exhibited remarkable regenerative resilience.",
    wordCount: 27,
    decoyVerbs: [
      {
        verb: "investigating",
        actualRole: "Present Participle Modifier (vmod)",
        trapReason: "Bổ nghĩa cho 'neurobiologists' ('neurobiologists [who are] investigating...')."
      },
      {
        verb: "hypothesized",
        actualRole: "Verb of Embedded Relative Clause",
        trapReason: "Động từ của mệnh đề quan hệ tỉnh lược 'that': '[which] neurobiologists originally hypothesized [that]...'"
      },
      {
        verb: "degenerate",
        actualRole: "Bare Infinitive in Subordinate Clause",
        trapReason: "Động từ trong mệnh đề phụ sau modal verb 'would'."
      }
    ],
    trueMainVerb: "exhibited",
    coreSubject: "The intricate neuronal pathways",
    coreObjectOrComplement: "remarkable regenerative resilience",
    reducedClauseSnippet: "neurobiologists investigating cerebral plasticity originally hypothesized would permanently degenerate under continuous neurotoxic exposure",
    fullDisentangledAnalysis: "Xương sống: 'Pathways exhibited resilience' (Các đường truyền thần kinh thể hiện sức phục hồi). Vế ở giữa là mệnh đề danh từ lồng ghép 3 tầng giả thuyết của nhà khoa học.",
    cognitiveTrapType: "nested_subordinate_illusion",
    ieltsTrapExplanation: "Câu hỏi Multiple Choice thường gài bẫy: 'What happened to the neuronal pathways?' Thí sinh đọc vội thấy từ 'degenerate' sẽ chọn đáp án 'They deteriorated permanently', trong khi kết quả thực tế ở vị ngữ chính là 'exhibited resilience' (phục hồi).",
    cambridgeTip: "Khi thấy chủ ngữ là vật ('pathways') theo sau ngay bởi danh từ chỉ người ('neurobiologists'), đây là dấu hiệu của Mệnh đề quan hệ tỉnh lược đại từ quan hệ (Contact Clause).",
    nodes: [
      { id: "nb1", word: "pathways", pos: "NNS", dep: "nsubj", headId: "nb5", isCoreSkeleton: true, x: 80, y: 180, depth: 0, vietnameseRole: "Chủ ngữ chính (Subject)" },
      { id: "nb2", word: "investigating", pos: "VBG", dep: "vmod", headId: "nb1", isCoreSkeleton: false, x: 220, y: 220, depth: 1, vietnameseRole: "Phân từ bổ nghĩa cho người nghiên cứu" },
      { id: "nb3", word: "hypothesized", pos: "VBD", dep: "rcmod", headId: "nb1", isCoreSkeleton: false, x: 360, y: 240, depth: 2, vietnameseRole: "Vị ngữ mệnh đề phụ giả thuyết" },
      { id: "nb4", word: "degenerate", pos: "VB", dep: "ccomp", headId: "nb3", isCoreSkeleton: false, x: 500, y: 260, depth: 3, vietnameseRole: "Động từ phụ trong giả thuyết" },
      { id: "nb5", word: "exhibited", pos: "VBD", dep: "root", headId: null, isCoreSkeleton: true, x: 640, y: 120, depth: 0, vietnameseRole: "Động từ vị ngữ chính (Root Finite Verb)" },
      { id: "nb6", word: "resilience", pos: "NN", dep: "dobj", headId: "nb5", isCoreSkeleton: true, x: 780, y: 180, depth: 0, vietnameseRole: "Tân ngữ trực tiếp (Direct Object)" }
    ]
  },
  {
    id: "gp_archaeology_mesoamerican_canals",
    passageTitle: "Hydrological Engineering of Pre-Columbian Wetland Agriculture",
    passageDomain: "Archaeological Anthropology",
    sentenceText: "The submerged stone aqueducts local indigenous populations engineered to divert torrential seasonal floods away from agricultural terraces ironically precipitated catastrophic soil salinization.",
    wordCount: 23,
    decoyVerbs: [
      {
        verb: "engineered",
        actualRole: "Verb of Contact Relative Clause",
        trapReason: "Động từ của mệnh đề quan hệ rút gọn đại từ 'that/which': '[which] indigenous populations engineered...'"
      },
      {
        verb: "divert",
        actualRole: "Infinitive of Purpose (to-infinitive)",
        trapReason: "Chỉ mục đích của việc xây cất, không phải hành động chính của hệ thống mương dẫn."
      }
    ],
    trueMainVerb: "precipitated",
    coreSubject: "The submerged stone aqueducts",
    coreObjectOrComplement: "catastrophic soil salinization",
    reducedClauseSnippet: "local indigenous populations engineered to divert torrential seasonal floods away from agricultural terraces",
    fullDisentangledAnalysis: "Nòng cốt câu: 'Aqueducts precipitated salinization' (Mương dẫn nước đã gây ra sự nhiễm mặn). Hành động 'divert floods' chỉ là mục đích ban đầu khi người dân xây dựng.",
    cognitiveTrapType: "long_distance_dependency_disruption",
    ieltsTrapExplanation: "Bẫy Matching Information: Đề bài yêu cầu tìm nguyên nhân gây ra ngập mặn đất. Thí sinh hay nhầm là do 'floods' (lũ lụt) thay vì do chính 'aqueducts' (mương dẫn nước).",
    cambridgeTip: "Hãy để ý trạng từ chỉ thái độ tương phản như 'ironically', 'surprisingly' - vị ngữ chính thường xuất hiện ngay sau những từ này.",
    nodes: [
      { id: "ar1", word: "aqueducts", pos: "NNS", dep: "nsubj", headId: "ar4", isCoreSkeleton: true, x: 100, y: 180, depth: 0, vietnameseRole: "Chủ ngữ chính (Subject)" },
      { id: "ar2", word: "engineered", pos: "VBD", dep: "rcmod", headId: "ar1", isCoreSkeleton: false, x: 260, y: 230, depth: 1, vietnameseRole: "Vị ngữ mệnh đề quan hệ tỉnh lược" },
      { id: "ar3", word: "divert", pos: "VB", dep: "advmod", headId: "ar2", isCoreSkeleton: false, x: 420, y: 250, depth: 2, vietnameseRole: "Cụm to-V chỉ mục đích" },
      { id: "ar4", word: "precipitated", pos: "VBD", dep: "root", headId: null, isCoreSkeleton: true, x: 580, y: 120, depth: 0, vietnameseRole: "Động từ vị ngữ chính (Root Finite Verb)" },
      { id: "ar5", word: "salinization", pos: "NN", dep: "dobj", headId: "ar4", isCoreSkeleton: true, x: 740, y: 180, depth: 0, vietnameseRole: "Tân ngữ trực tiếp (Direct Object)" }
    ]
  },
  {
    id: "gp_economics_algorithmic_pricing",
    passageTitle: "Automated Collusion in Algorithmic High-Frequency Markets",
    passageDomain: "Behavioral Economics",
    sentenceText: "The autonomous pricing algorithms antitrust regulatory agencies expected would foster competitive market equilibrium secretly converged on tacit monopolistic rent extraction.",
    wordCount: 20,
    decoyVerbs: [
      {
        verb: "expected",
        actualRole: "Verb of Embedded Attributive Clause",
        trapReason: "Mệnh đề nhúng kỳ vọng của cơ quan quản lý ('which agencies expected...')."
      },
      {
        verb: "foster",
        actualRole: "Infinitive in Modal Complement",
        trapReason: "Động từ trong mệnh đề kỳ vọng ('would foster equilibrium')."
      }
    ],
    trueMainVerb: "converged",
    coreSubject: "The autonomous pricing algorithms",
    coreObjectOrComplement: "tacit monopolistic rent extraction",
    reducedClauseSnippet: "antitrust regulatory agencies expected would foster competitive market equilibrium",
    fullDisentangledAnalysis: "Nòng cốt câu: 'Algorithms converged on monopolistic extraction' (Thuật toán đồng quy về việc bòn rút độc quyền). 'Fostering competition' chỉ là kỳ vọng sai lầm của cơ quan quản lý.",
    cognitiveTrapType: "nested_subordinate_illusion",
    ieltsTrapExplanation: "Bẫy Yes/No/Not Given: 'Did algorithms increase market competition?' -> NO, vì thực tế thuật toán đã ngầm cấu kết nâng giá.",
    cambridgeTip: "Tìm cặp động từ đối lập ngữ nghĩa giữa kỳ vọng ('expected to foster') và thực tế diễn biến sau trạng từ 'secretly' / 'actually' ('converged on monopolistic extraction').",
    nodes: [
      { id: "ec1", word: "algorithms", pos: "NNS", dep: "nsubj", headId: "ec4", isCoreSkeleton: true, x: 100, y: 180, depth: 0, vietnameseRole: "Chủ ngữ chính (Subject)" },
      { id: "ec2", word: "expected", pos: "VBD", dep: "rcmod", headId: "ec1", isCoreSkeleton: false, x: 260, y: 230, depth: 1, vietnameseRole: "Vị ngữ mệnh đề quan hệ lồng ghép" },
      { id: "ec3", word: "foster", pos: "VB", dep: "ccomp", headId: "ec2", isCoreSkeleton: false, x: 420, y: 250, depth: 2, vietnameseRole: "Động từ trong mệnh đề kỳ vọng" },
      { id: "ec4", word: "converged", pos: "VBD", dep: "root", headId: null, isCoreSkeleton: true, x: 580, y: 120, depth: 0, vietnameseRole: "Động từ vị ngữ chính (Root Finite Verb)" },
      { id: "ec5", word: "extraction", pos: "NN", dep: "pobj", headId: "ec4", isCoreSkeleton: true, x: 740, y: 180, depth: 0, vietnameseRole: "Bổ ngữ giới từ (Prepositional Object)" }
    ]
  }
];
