"use client";

import React from "react";
import { EGOCENTRIC_PHRASES } from "@/lib/societalPrismsAnalyzer";

interface EgocentricSpeechDetectorProps {
  transcript: string;
}

export const EgocentricSpeechDetector: React.FC<EgocentricSpeechDetectorProps> = ({
  transcript
}) => {
  const lower = transcript.toLowerCase();
  const foundPhrases: string[] = [];

  EGOCENTRIC_PHRASES.forEach((p) => {
    if (new RegExp(`\\b${p}\\b`, 'i').test(lower)) {
      foundPhrases.push(p);
    }
  });

  const isDetected = foundPhrases.length > 0;

  return (
    <div className={`rounded-2xl border p-4 transition-all ${
      isDetected
        ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
        : 'bg-slate-950/60 border-slate-800 text-slate-400'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold flex items-center gap-1.5">
          <span>{isDetected ? '⚠️' : '🛡️'}</span>
          <span className={isDetected ? 'text-rose-400' : 'text-slate-300'}>
            Bộ Cảnh Báo Lối Nói Vị Kỷ Cá Nhân (Anti-Egocentric Trap):
          </span>
        </span>
        <span className="text-[10px] font-mono">
          {isDetected ? `${foundPhrases.length} cụm từ bị phát hiện` : 'Không có bẫy xưng hô cá nhân'}
        </span>
      </div>

      {isDetected ? (
        <div className="space-y-1.5 text-xs">
          <p className="text-rose-300">
            Bạn đã sử dụng các cụm từ mang tính cảm tính cá nhân: <strong className="font-mono bg-rose-900/60 px-1 py-0.5 rounded text-white">{foundPhrases.join(', ')}</strong>.
          </p>
          <p className="text-[11px] text-slate-300">
            💡 Nâng cấp sang lăng kính thể chế: Thay vì <em className="text-rose-400">&ldquo;I think people should...&rdquo;</em>, hãy dùng <strong className="text-emerald-400">&ldquo;From a regulatory standpoint, municipal authorities must...&rdquo;</strong>.
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          Chưa phát hiện các đại từ nhân xưng phi học thuật. Giữ vững phong thái phân tích vĩ mô khách quan.
        </p>
      )}
    </div>
  );
};
