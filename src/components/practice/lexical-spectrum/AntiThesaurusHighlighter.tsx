"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, Sparkles, PenLine, ArrowRight } from "lucide-react";
import { LexicalConceptCluster } from "@/lib/lexicalSemanticsEngine";

interface AntiThesaurusHighlighterProps {
  cluster: LexicalConceptCluster;
  userDraft: string;
  onDraftChange: (text: string) => void;
  auditResult: {
    detectedPitfalls: LexicalConceptCluster["thesaurusPitfalls"];
    lexicalAccuracyScore: number;
  };
}

export const AntiThesaurusHighlighter: React.FC<AntiThesaurusHighlighterProps> = ({
  cluster,
  userDraft,
  onDraftChange,
  auditResult
}) => {
  const hasPitfalls = auditResult.detectedPitfalls.length > 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <PenLine className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Khung Bắt Lỗi Hội Chứng Từ Điển (Anti-Thesaurus Scanner)
            </h3>
            <p className="text-[11px] text-slate-400">
              Nhập câu văn Task 2 để rà soát các từ đồng nghĩa hoa mỹ bị dùng sai ngữ cảnh
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-400">
          Độ chính xác: <strong className={hasPitfalls ? "text-rose-400" : "text-emerald-400"}>{auditResult.lexicalAccuracyScore}%</strong>
        </span>
      </div>

      {/* Draft Textarea */}
      <div className="space-y-2">
        <textarea
          value={userDraft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder={`Nhập câu văn của bạn tại đây để kiểm tra sắc thái từ vựng cho chủ đề "${cluster.conceptName}"...`}
          className="w-full h-28 p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/60 font-sans resize-none leading-relaxed"
        />
      </div>

      {/* Pitfall Feedback Alert */}
      {hasPitfalls ? (
        <div className="space-y-3">
          {auditResult.detectedPitfalls.map((pitfall, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-600/50 space-y-2 animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Phát hiện lạm dụng từ: &ldquo;{pitfall.misusedWord}&rdquo;
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-900 text-rose-200 border border-rose-500/40">
                  Thesaurus Misuse
                </span>
              </div>

              <p className="text-xs text-rose-100/90 leading-relaxed">
                <strong>Nhận xét của giám khảo:</strong> {pitfall.examinerCritique}
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs">
                <span className="text-slate-400">Đề xuất thay thế chuẩn:</span>
                <span className="font-mono font-bold text-emerald-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
                  {pitfall.correctAlternative}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : userDraft ? (
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Không phát hiện từ vựng bị lệch sắc thái nghĩa hoặc vi phạm kết hợp từ!</span>
        </div>
      ) : null}
    </div>
  );
};
