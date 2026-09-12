"use client";

import React, { useState } from "react";
import { VeilOfIgnoranceScenario } from "@/data/mockPhilosophicalEthicsData";
import { EyeOff, Users, ArrowRight, CheckCircle2, Sparkles, HelpCircle } from "lucide-react";

interface DistributiveJusticeSimulatorProps {
  scenario: VeilOfIgnoranceScenario;
  selectedOptionId: string | null;
  onSelectOption: (optionId: "option_a" | "option_b" | "option_c") => void;
}

export const DistributiveJusticeSimulator: React.FC<DistributiveJusticeSimulatorProps> = ({
  scenario,
  selectedOptionId,
  onSelectOption
}) => {
  const [revealedSocialStatus, setRevealedSocialStatus] = useState<string | null>(null);

  const socialStatuses = [
    "Người lao động tự do thu nhập bấp bênh (Vulnerable Freelancer)",
    "Tổng giám đốc điều hành tập đoàn đa quốc gia (Corporate Executive)",
    "Bệnh nhân mắc bệnh mãn tính bẩm sinh (Chronic Patient)",
    "Chuyên gia nghiên cứu công nghệ cao (Elite Researcher)"
  ];

  const handlePick = (optId: "option_a" | "option_b" | "option_c") => {
    onSelectOption(optId);
    // Randomize assigned social status after decision
    const randomStatus = socialStatuses[Math.floor(Math.random() * socialStatuses.length)];
    setRevealedSocialStatus(randomStatus);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Mô Phỏng &ldquo;Bức Màn Vô Tri&rdquo; Của John Rawls (The Veil of Ignorance Simulator)
          </h3>
        </div>
        <span className="text-xs text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded-full font-mono font-medium">
          Rawlsian Experiment
        </span>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
        <h4 className="font-bold text-slate-200">{scenario.title}</h4>
        <p className="text-slate-400 leading-relaxed">{scenario.dilemma}</p>
      </div>

      {/* 3 Policy Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenario.policyOptions.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => handlePick(opt.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500 shadow-lg shadow-cyan-500/10"
                  : "bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-200">{opt.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    {opt.philosophicalAlignment}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {opt.description}
                </p>
              </div>

              <button
                type="button"
                className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                <span>{isSelected ? "Đã Chọn Chính Sách Này" : "Chọn Dưới Bức Màn"}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Post-Choice Rawlsian Reflection */}
      {selectedOptionId && revealedSocialStatus && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/40 space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Bức Màn Vô Tri Được Hé Lộ! Thân Phận Xã Hội Của Bạn:</span>
            <strong className="text-amber-300 font-bold font-mono">
              &ldquo;{revealedSocialStatus}&rdquo;
            </strong>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic pt-1 border-t border-slate-800">
            {
              scenario.policyOptions.find((o) => o.id === selectedOptionId)
                ?.rawlsianC2Reflection
            }
          </p>

          <span className="text-[11px] text-slate-400 block pt-1">
            &rarr; Luận điểm triết học này đã được tự động định dạng và tích hợp vào khung soạn thảo bài viết của bạn!
          </span>
        </div>
      )}
    </div>
  );
};
