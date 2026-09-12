"use client";

import React from "react";
import {
  GitCommit,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Shuffle
} from "lucide-react";
import { ConsensusState, ConsensusResolutionResult } from "@/lib/consensusStateMachine";

interface ConsensusStateMachineCardProps {
  consensusResolution: ConsensusResolutionResult;
}

const STATE_CONFIG: Record<
  ConsensusState,
  {
    title: string;
    description: string;
    acousticCues: string[];
    color: string;
    icon: React.ElementType;
  }
> = {
  PROPOSITION: {
    title: "1. Proposition (Đề xuất ban đầu)",
    description: "Một người đưa ra ý tưởng hoặc phương án giải quyết đề tài.",
    acousticCues: ["I was thinking we could...", "What if we focus on...", "How about..."],
    color: "from-blue-500/20 to-indigo-500/20 border-indigo-500/50 text-indigo-300",
    icon: GitCommit
  },
  SKEPTICAL_PUSHBACK: {
    title: "2. Skeptical Pushback (Phản biện / Nghi ngờ)",
    description: "Người nghe chỉ ra rủi ro, thiếu thời gian hoặc không khả thi.",
    acousticCues: ["I'm not so sure about that.", "Isn't that a bit too ambitious?", "The problem with that is..."],
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300",
    icon: AlertCircle
  },
  QUALIFIED_CONCESSION: {
    title: "3. Qualified Concession (Nhượng bộ có điều kiện)",
    description: "Công nhận 1 phần nhưng vẫn giữ băn khoăn (Bẫy False Consensus phổ biến).",
    acousticCues: ["You have a point, but...", "That sounds reasonable in theory, except...", "Granted, though..."],
    color: "from-violet-500/20 to-purple-500/20 border-violet-500/50 text-violet-300",
    icon: HelpCircle
  },
  COUNTER_PROPOSAL: {
    title: "4. Counter-Proposal (Phương án thay thế)",
    description: "Đề xuất hướng đi mới nhằm thỏa hiệp hoặc giải quyết các lo ngại.",
    acousticCues: ["Why don't we instead...", "Alternatively, we could...", "What about a middle ground where..."],
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/50 text-cyan-300",
    icon: Shuffle
  },
  GROUP_CONSENSUS: {
    title: "5. Group Consensus (Đồng thuận cuối cùng)",
    description: "Tất cả các bên (kể cả Giảng viên hướng dẫn) thống nhất chốt phương án.",
    acousticCues: ["That settles it then.", "Let's go with that.", "I'm completely on board with that."],
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-emerald-300",
    icon: CheckCircle
  }
};

export const ConsensusStateMachineCard: React.FC<ConsensusStateMachineCardProps> = ({
  consensusResolution
}) => {
  const activeState = consensusResolution.currentConsensusState;
  const currentConfig = STATE_CONFIG[activeState];

  const statesOrder: ConsensusState[] = [
    "PROPOSITION",
    "SKEPTICAL_PUSHBACK",
    "QUALIFIED_CONCESSION",
    "COUNTER_PROPOSAL",
    "GROUP_CONSENSUS"
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Cơ Chế Trạng Thái Hội Thoại Đa Chủ Thể (Consensus State Machine)
            </h3>
            <p className="text-[11px] text-slate-400">
              Mô hình 5 nấc biện chứng giải quyết bẫy đánh lừa Section 3 Listening
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-xs font-bold font-mono uppercase rounded-full bg-slate-800 border border-slate-700 text-indigo-300">
          State: {activeState}
        </span>
      </div>

      {/* 5-Step Horizontal Flow Indicator */}
      <div className="grid grid-cols-5 gap-1.5 mb-5">
        {statesOrder.map((st, index) => {
          const isCurrent = activeState === st;
          const conf = STATE_CONFIG[st];
          const Icon = conf.icon;

          return (
            <div
              key={st}
              className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                isCurrent
                  ? "bg-gradient-to-b from-indigo-950/80 to-slate-900 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-400"
                  : "bg-slate-950/50 border-slate-800/80 opacity-50"
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${isCurrent ? "text-indigo-300" : "text-slate-500"}`} />
              <span className={`text-[10px] font-bold leading-tight line-clamp-1 ${isCurrent ? "text-white" : "text-slate-400"}`}>
                {st.replace("_", " ")}
              </span>
              <span className="text-[9px] text-slate-500 mt-0.5">Nấc {index + 1}</span>
            </div>
          );
        })}
      </div>

      {/* Active State Detailed Insight Card */}
      <div className={`p-4 rounded-xl border bg-gradient-to-br ${currentConfig.color}`}>
        <div className="flex items-center gap-2 mb-1.5">
          <currentConfig.icon className="w-4 h-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">
            {currentConfig.title}
          </h4>
        </div>
        <p className="text-xs text-slate-200 mb-3">
          {currentConfig.description}
        </p>

        {/* Acoustic & Discourse Cues */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Dấu hiệu ngôn ngữ / Ngữ điệu nhận diện (Acoustic & Discourse Cues):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentConfig.acousticCues.map((cue, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 font-mono text-[11px] text-slate-200"
              >
                &ldquo;{cue}&rdquo;
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
