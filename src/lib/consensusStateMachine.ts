/**
 * Multi-Speaker Consensus Mapping & Dialectical State Machine (Step 84)
 * Models Dialogue Progression, Qualified Concessions, and False Consensus Traps in Section 3
 */

export type ConsensusState =
  | "PROPOSITION"
  | "SKEPTICAL_PUSHBACK"
  | "QUALIFIED_CONCESSION"
  | "COUNTER_PROPOSAL"
  | "GROUP_CONSENSUS";

export interface DialogueTurn {
  id: string;
  speakerId: "speaker_a" | "speaker_b" | "tutor";
  speakerName: string;
  speakerRole: "Student A" | "Student B" | "Course Tutor";
  avatarColor: string;
  startSec: number;
  endSec: number;
  state: ConsensusState;
  stateBadgeLabel: string;
  utteranceText: string;
  corePointSummary: string;
  isFalseConsensusTrap?: boolean;
  trapDistractorOption?: string;
  trapExplanation?: string;
}

export interface DialecticalNode {
  id: string;
  label: string;
  speaker: string;
  status: "rejected" | "modified" | "final_consensus";
  x: number;
  y: number;
  connectedTo?: string[];
  evidenceText: string;
}

export interface ConsensusResolutionResult {
  activeTurn: DialogueTurn | null;
  currentConsensusState: ConsensusState;
  isInsideFalseConsensusWindow: boolean;
  activeDistractorPrompt?: string;
}

export const STATE_METADATA: Record<
  ConsensusState,
  { label: string; color: string; badgeBg: string; description: string }
> = {
  PROPOSITION: {
    label: "Proposition (Đề Xuất Ban Đầu)",
    color: "text-indigo-400 border-indigo-500/40",
    badgeBg: "bg-indigo-950/80 text-indigo-300",
    description: "Nhân vật đưa ra ý tưởng hoặc phương pháp nghiên cứu ban đầu."
  },
  SKEPTICAL_PUSHBACK: {
    label: "Skeptical Pushback (Hoài Nghi & Phản Đối)",
    color: "text-rose-400 border-rose-500/40",
    badgeBg: "bg-rose-950/80 text-rose-300",
    description: "Nhân vật thứ hai chỉ ra thiếu sót, hạn chế kinh phí hoặc trở ngại thực tế."
  },
  QUALIFIED_CONCESSION: {
    label: "Qualified Concession (Nhượng Bộ Có Điều Kiện)",
    color: "text-amber-400 border-amber-500/40",
    badgeBg: "bg-amber-950/80 text-amber-300",
    description: "Đồng ý nửa vời hoặc chỉ chấp thuận nếu thỏa mãn điều kiện nghiêm ngặt ('Up to a point, provided that...')."
  },
  COUNTER_PROPOSAL: {
    label: "Counter-Proposal (Đề Xuất Thay Thế)",
    color: "text-purple-400 border-purple-500/40",
    badgeBg: "bg-purple-950/80 text-purple-300",
    description: "Đưa ra giải pháp khác để dung hòa mâu thuẫn giữa các bên."
  },
  GROUP_CONSENSUS: {
    label: "Group Consensus (Đồng Thuận Chung Cuộc)",
    color: "text-emerald-400 border-emerald-500/40",
    badgeBg: "bg-emerald-950/80 text-emerald-300",
    description: "Tất cả các nhân vật cùng nhất trí quyết định cuối cùng (NƠI CHỨA ĐÁP ÁN ĐÚNG)."
  }
};

export function resolveActiveSpeakerTurn(
  currentTimeSec: number,
  turns: DialogueTurn[]
): ConsensusResolutionResult {
  const activeTurn =
    turns.find((t) => currentTimeSec >= t.startSec && currentTimeSec <= t.endSec) ||
    (turns.length > 0 ? turns[0] : null);

  if (!activeTurn) {
    return {
      activeTurn: null,
      currentConsensusState: "PROPOSITION",
      isInsideFalseConsensusWindow: false
    };
  }

  return {
    activeTurn,
    currentConsensusState: activeTurn.state,
    isInsideFalseConsensusWindow: !!activeTurn.isFalseConsensusTrap,
    activeDistractorPrompt: activeTurn.trapDistractorOption
  };
}
