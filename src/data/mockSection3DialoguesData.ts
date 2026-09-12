/**
 * Mock Data for Multi-Speaker Consensus Mapping Studio (Listening Section 3 - Step 84)
 * 4 Cambridge Section 3 Academic Research Dialogues with Dynamic State Machine & Dialectical Trees
 */

import { DialogueTurn, DialecticalNode } from "@/lib/consensusStateMachine";

export interface Section3Question {
  id: string;
  questionNumber: number;
  prompt: string;
  options: {
    key: string;
    text: string;
    isCorrect: boolean;
    isFalseConsensusTrap?: boolean;
    distractorSpeaker?: string;
  }[];
  correctKey: string;
  consensusEvidence: string;
  trapExplanation: string;
}

export interface Section3DialogueScenario {
  id: string;
  title: string;
  academicDiscipline: string;
  topic: string;
  durationSec: number;
  speakers: { id: string; name: string; role: string; avatarColor: string }[];
  dialogueTurns: DialogueTurn[];
  questions: Section3Question[];
  dialecticalTreeNodes: DialecticalNode[];
}

export const MOCK_SECTION3_DIALOGUES: Section3DialogueScenario[] = [
  {
    id: "sec3_marine_microplastics_survey",
    title: "Marine Microplastics Survey Methodology Seminar",
    academicDiscipline: "Environmental Oceanography",
    topic: "Designing Field Sampling Protocols for Estuarine Microplastics",
    durationSec: 180,
    speakers: [
      { id: "speaker_a", name: "Jack", role: "Undergraduate Researcher", avatarColor: "bg-indigo-500" },
      { id: "speaker_b", name: "Emily", role: "Postgraduate Student", avatarColor: "bg-rose-500" },
      { id: "tutor", name: "Dr. Davies", role: "Faculty Supervisor", avatarColor: "bg-emerald-500" }
    ],
    dialogueTurns: [
      {
        id: "turn_01",
        speakerId: "speaker_a",
        speakerName: "Jack",
        speakerRole: "Student A",
        avatarColor: "bg-indigo-500",
        startSec: 0,
        endSec: 25,
        state: "PROPOSITION",
        stateBadgeLabel: "Proposition: Surface Trawl",
        utteranceText: "For our field sampling in the estuary, I strongly propose deploying high-speed manta trawls across the surface waters. It's the standard protocol and will capture the largest volume of synthetic fragments in under two hours.",
        corePointSummary: "Jack đề xuất dùng lưới cào bề mặt Manta Trawl vì tốc độ nhanh.",
        isFalseConsensusTrap: true,
        trapDistractorOption: "Deploying surface manta trawls during high tide",
        trapExplanation: "BẪY ĐỒNG THUẬN GIẢ: Jack đề xuất phương án này rất tự tin ở đầu bài nghe, nhưng sau đó sẽ bị Emily và Giáo sư chỉ trích."
      },
      {
        id: "turn_02",
        speakerId: "speaker_b",
        speakerName: "Emily",
        speakerRole: "Student B",
        avatarColor: "bg-rose-500",
        startSec: 25,
        endSec: 55,
        state: "SKEPTICAL_PUSHBACK",
        stateBadgeLabel: "Pushback: Estuarine Flow Bias",
        utteranceText: "I'm not so convinced, Jack. Estuarine tidal currents in that bay are notoriously erratic. If we only sample the surface, we'll completely overlook denser polymer particles that sink into benthic sediments.",
        corePointSummary: "Emily phản đối vì dòng chảy cửa sông phức tạp, cào bề mặt sẽ bỏ sót hạt chìm xuống đáy."
      },
      {
        id: "turn_03",
        speakerId: "speaker_a",
        speakerName: "Jack",
        speakerRole: "Student A",
        avatarColor: "bg-indigo-500",
        startSec: 55,
        endSec: 85,
        state: "QUALIFIED_CONCESSION",
        stateBadgeLabel: "Qualified Concession: Depth Samples",
        utteranceText: "Right, fair point. We could perhaps take core sediment samples too, provided we have enough winch cables on the university boat.",
        corePointSummary: "Jack nhượng bộ có điều kiện: lấy thêm mẫu trầm tích nếu tàu có đủ dây kéo."
      },
      {
        id: "turn_04",
        speakerId: "tutor",
        speakerName: "Dr. Davies",
        speakerRole: "Course Tutor",
        avatarColor: "bg-emerald-500",
        startSec: 85,
        endSec: 130,
        state: "COUNTER_PROPOSAL",
        stateBadgeLabel: "Counter-Proposal: Automated Niskin Bottles",
        utteranceText: "Actually, both surface trawls and heavy sediment cores risk clogging our filters with organic silt. What I would suggest instead is utilizing automated Niskin depth bottles combined with peristaltic inline filtration.",
        corePointSummary: "Dr. Davies đưa ra đề xuất thay thế: dùng bình thu mẫu tầng sâu Niskin kèm bộ lọc nhu động."
      },
      {
        id: "turn_05",
        speakerId: "speaker_b",
        speakerName: "Emily",
        speakerRole: "Student B",
        avatarColor: "bg-rose-500",
        startSec: 130,
        endSec: 155,
        state: "GROUP_CONSENSUS",
        stateBadgeLabel: "Consensus: Adopting Niskin Array",
        utteranceText: "That makes total sense, Dr. Davies. That will avoid bio-fouling and give us stratified vertical density data across the water column.",
        corePointSummary: "Emily hoàn toàn đồng ý với giải pháp bình Niskin của giáo sư."
      },
      {
        id: "turn_06",
        speakerId: "speaker_a",
        speakerName: "Jack",
        speakerRole: "Student A",
        avatarColor: "bg-indigo-500",
        startSec: 155,
        endSec: 180,
        state: "GROUP_CONSENSUS",
        stateBadgeLabel: "Final Agreement: Equipment Requisition",
        utteranceText: "I agree. Let's requisition the Niskin apparatus from the oceanography department this afternoon.",
        corePointSummary: "Jack chính thức đồng thuận chốt phương án mượn thiết bị Niskin."
      }
    ],
    questions: [
      {
        id: "q21",
        questionNumber: 21,
        prompt: "Which field sampling method did the research team ultimately agree to employ?",
        options: [
          { key: "A", text: "High-speed surface manta trawls across tidal bays", isCorrect: false, isFalseConsensusTrap: true, distractorSpeaker: "Jack" },
          { key: "B", text: "Heavy benthic core sampling using winch cables", isCorrect: false, isFalseConsensusTrap: false },
          { key: "C", text: "Stratified Niskin depth bottles with inline filtration", isCorrect: true, isFalseConsensusTrap: false },
          { key: "D", text: "Manual bucket collection from estuarine mudflats", isCorrect: false, isFalseConsensusTrap: false }
        ],
        correctKey: "C",
        consensusEvidence: "Dr. Davies đề xuất bình Niskin ở phút 01:25 và cả Emily lẫn Jack đều đồng thanh đồng ý ở phút 02:40.",
        trapExplanation: "Đáp án A là bẫy đồng thuận giả! Jack đề xuất rất nhiệt tình ở đầu bài, nhưng đã bị cả nhóm bác bỏ vì nguy cơ tắc màng lọc."
      }
    ],
    dialecticalTreeNodes: [
      { id: "node_01", label: "Research Goal: Estuarine Sampling", speaker: "Group", status: "modified", x: 250, y: 30, evidenceText: "Khởi đầu đề tài khảo sát rác thải vi nhựa tại cửa sông." },
      { id: "node_02", label: "Idea A: Manta Surface Trawl", speaker: "Jack", status: "rejected", x: 100, y: 90, evidenceText: "Bị bác bỏ vì dòng chảy thất thường và bỏ sót hạt chìm dưới đáy." },
      { id: "node_03", label: "Skeptical Objection", speaker: "Emily", status: "modified", x: 100, y: 150, evidenceText: "Chỉ ra rằng mẫu trầm tích đáy sẽ làm tắc nghẽn màng lọc do bùn hữu cơ." },
      { id: "node_04", label: "Counter-Proposal: Niskin Array", speaker: "Dr. Davies", status: "final_consensus", x: 400, y: 110, evidenceText: "Bình Niskin phân tầng giúp đo đạc chính xác theo độ sâu." },
      { id: "node_05", label: "Final Consensus: Niskin Protocol", speaker: "All Members", status: "final_consensus", x: 400, y: 180, evidenceText: "Cả nhóm nhất trí thông qua và gửi đơn mượn thiết bị." }
    ]
  }
];
