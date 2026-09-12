"use client";

import React, { useState } from "react";
import {
  GitFork,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Info,
  ShieldCheck,
  Flame
} from "lucide-react";
import { Section3DialogueScenario } from "@/data/mockSection3DialoguesData";
import { DialecticalNode } from "@/lib/consensusStateMachine";

interface DialecticalArgumentTreeProps {
  scenario: Section3DialogueScenario;
  activeTurnSpeaker?: string;
}

export const DialecticalArgumentTree: React.FC<DialecticalArgumentTreeProps> = ({
  scenario,
  activeTurnSpeaker
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    scenario.dialecticalTreeNodes[0]?.id || ""
  );

  const selectedNode = scenario.dialecticalTreeNodes.find(
    (n) => n.id === selectedNodeId
  );

  const getNodeStyle = (status: DialecticalNode["status"]) => {
    switch (status) {
      case "final_consensus":
        return {
          bg: "bg-emerald-950/40 border-emerald-500/60 text-emerald-200",
          badge: "bg-emerald-900/60 text-emerald-300 border-emerald-500/40",
          icon: CheckCircle2,
          iconColor: "text-emerald-400",
          label: "FINAL CONSENSUS (Đáp án đúng)"
        };
      case "rejected":
        return {
          bg: "bg-rose-950/40 border-rose-500/60 text-rose-200",
          badge: "bg-rose-900/60 text-rose-300 border-rose-500/40",
          icon: XCircle,
          iconColor: "text-rose-400",
          label: "REJECTED (Bẫy đồng thuận giả)"
        };
      case "modified":
      default:
        return {
          bg: "bg-amber-950/40 border-amber-500/60 text-amber-200",
          badge: "bg-amber-900/60 text-amber-300 border-amber-500/40",
          icon: HelpCircle,
          iconColor: "text-amber-400",
          label: "MODIFIED / QUALIFIED"
        };
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Cây Biện Luận Phản Biện (Dialectical Argument Tree)
            </h3>
            <p className="text-[11px] text-slate-400">
              Trực quan hóa luồng ý kiến từ Đề xuất ban đầu &rarr; Bác bỏ &rarr; Thống nhất phương án
            </p>
          </div>
        </div>

        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          {scenario.dialecticalTreeNodes.length} Điểm nút lập luận
        </span>
      </div>

      {/* Nodes Interactive Map / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {scenario.dialecticalTreeNodes.map((node, index) => {
          const style = getNodeStyle(node.status);
          const isSelected = selectedNodeId === node.id;
          const isSpeakerActive = activeTurnSpeaker === node.speaker;
          const NodeIcon = style.icon;

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`relative p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? `${style.bg} ring-2 ring-violet-500 shadow-lg scale-[1.02]`
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              {/* Step index pill */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Node 0{index + 1}
                </span>

                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${style.badge}`}>
                  {node.speaker}
                </span>
              </div>

              {/* Node Label */}
              <div className="flex items-start gap-2 mb-2">
                <NodeIcon className={`w-4 h-4 shrink-0 mt-0.5 ${style.iconColor}`} />
                <h4 className="text-xs font-bold text-white line-clamp-2">
                  {node.label}
                </h4>
              </div>

              {/* Node status label */}
              <div className="text-[10px] font-semibold tracking-wide uppercase mt-1">
                <span className={style.iconColor}>{style.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Deep-dive Card */}
      {selectedNode && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 animate-fade-in">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-bold text-violet-300">
                Chứng cứ hội thoại chi tiết (Dialectical Evidence):
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Nhân vật: <strong>{selectedNode.speaker}</strong>
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-300 font-serif italic mb-2">
            &ldquo;{selectedNode.evidenceText}&rdquo;
          </p>

          <div className="text-[11px] text-slate-400">
            {selectedNode.status === "final_consensus" && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Đây là điểm chốt đồng thuận chung cuộc chứa đáp án đúng của bài thi IELTS.
              </span>
            )}
            {selectedNode.status === "rejected" && (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                Phương án này bị bác bỏ do trở ngại thực tế. Tránh chọn phương án này!
              </span>
            )}
            {selectedNode.status === "modified" && (
              <span className="text-amber-400 font-semibold">
                Phương án nhượng bộ hoặc tranh luận dở dang, chưa đạt đồng thuận tuyệt đối.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
