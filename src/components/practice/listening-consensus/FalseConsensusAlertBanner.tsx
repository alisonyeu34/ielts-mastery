"use client";

import React from "react";
import { AlertTriangle, ShieldAlert, Zap } from "lucide-react";
import { ConsensusResolutionResult } from "@/lib/consensusStateMachine";

interface FalseConsensusAlertBannerProps {
  consensusResolution: ConsensusResolutionResult;
}

export const FalseConsensusAlertBanner: React.FC<FalseConsensusAlertBannerProps> = ({
  consensusResolution
}) => {
  const isTrapState =
    consensusResolution.currentConsensusState === "QUALIFIED_CONCESSION" ||
    consensusResolution.currentConsensusState === "SKEPTICAL_PUSHBACK";

  if (!isTrapState) return null;

  return (
    <div className="bg-gradient-to-r from-amber-950/60 via-rose-950/40 to-slate-900 border border-amber-500/50 rounded-2xl p-4 shadow-lg shadow-amber-950/30 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Cảnh Báo Vùng Bẫy Đồng Thuận Giả (False Consensus Trap Active)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-500/40 font-semibold">
              Cambridge Trap Danger
            </span>
          </div>

          <p className="text-xs text-amber-100/90 leading-relaxed mb-2">
            Đoạn hội thoại hiện tại đang ở trạng thái <strong>{consensusResolution.currentConsensusState}</strong>.
            Thí sinh thường dễ mất điểm khi nghe thấy từ tán đồng ban đầu (&ldquo;Sure&rdquo;, &ldquo;Sounds good&rdquo;) nhưng không nghe tiếp vế chuyển tiếp (&ldquo;...however&rdquo;, &ldquo;...except we have a strict deadline&rdquo;).
          </p>

          <div className="flex items-center gap-2 text-[11px] text-amber-300/80 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Quy tắc C1/C2: KHÔNG BAO GIỜ chọn phương án chốt nếu chưa nghe thấy lời xác nhận cuối cùng của CẢ 3 nhân vật!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
