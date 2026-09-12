'use client';

import React from 'react';
import { PassageEngineeringCase } from '@/data/mockReverseEngineeringData';
import {
  DistractorMechanism,
  DistractorDraft,
  DISTRACTOR_BLUEPRINTS,
  PsychometricAuditResult
} from '@/lib/distractorPsychometrics';
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Wand2,
  Copy,
  Info,
  ShieldAlert
} from 'lucide-react';

interface ItemWriterWorkbenchProps {
  currentCase: PassageEngineeringCase;
  selectedSourceSentence: string;
  setSelectedSourceSentence: (s: string) => void;
  questionPromptInput: string;
  setQuestionPromptInput: (q: string) => void;
  keyInput: string;
  setKeyInput: (k: string) => void;
  distractorDrafts: DistractorDraft[];
  onUpdateDistractorText: (id: string, text: string) => void;
  onUpdateDistractorType: (id: string, type: DistractorMechanism) => void;
  onLoadPreset: () => void;
  onEvaluate: () => void;
  auditResult: PsychometricAuditResult | null;
}

export const ItemWriterWorkbench: React.FC<ItemWriterWorkbenchProps> = ({
  currentCase,
  selectedSourceSentence,
  setSelectedSourceSentence,
  questionPromptInput,
  setQuestionPromptInput,
  keyInput,
  setKeyInput,
  distractorDrafts,
  onUpdateDistractorText,
  onUpdateDistractorType,
  onLoadPreset,
  onEvaluate,
  auditResult
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Panel: Passage 3 Source & Target Sentence (5 cols) */}
      <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {currentCase.cambridgeRef}
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              {currentCase.passageTitle}
            </h3>
          </div>
          <button
            onClick={onLoadPreset}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            Tải Mẫu Cambridge
          </button>
        </div>

        {/* Passage Text */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-300 font-serif leading-relaxed space-y-2 max-h-[340px] overflow-y-auto">
          <p>{currentCase.passageText}</p>
        </div>

        {/* Target Source Sentence Box */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-900/50 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase">
            <Info className="w-4 h-4" />
            Câu Gốc Được Chọn Để Chế Tác Câu Hỏi:
          </div>
          <p className="text-xs font-serif italic text-indigo-100 leading-relaxed">
            "{selectedSourceSentence}"
          </p>
        </div>
      </div>

      {/* Right Panel: Item Writer Sandbox (7 cols) */}
      <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PenTool className="w-5 h-5 text-indigo-400" />
              Cambridge Item Writer Studio (Chế Tác 1 Key + 3 Distractors)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Đóng vai chuyên gia Cambridge: Thiết kế câu hỏi có 1 đáp án chuẩn và 3 bẫy tư duy sâu sắc.
            </p>
          </div>
        </div>

        {/* 1. Question Stem */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            1. Câu Hỏi Khảo Thí (Question Stem):
          </label>
          <input
            type="text"
            value={questionPromptInput}
            onChange={(e) => setQuestionPromptInput(e.target.value)}
            placeholder="Ví dụ: According to the passage, what did recent telemetry reveal...?"
            className="w-full bg-slate-950/90 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-serif"
          />
        </div>

        {/* 2. Key (Correct Option) */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span className="flex items-center gap-1.5 uppercase">
              <CheckCircle2 className="w-4 h-4" />
              2. Đáp Án Đúng (Key - Paraphrase C1/C2):
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
              PARAPHRASE FIDELITY
            </span>
          </div>
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Viết đáp án đúng bằng cách diễn đạt lại câu gốc với từ đồng nghĩa C1..."
            className="w-full bg-slate-950/90 border border-emerald-800/80 rounded-xl px-4 py-2.5 text-xs text-emerald-100 placeholder:text-emerald-800/60 focus:outline-none focus:border-emerald-500 transition-all font-serif"
          />
        </div>

        {/* 3. Three Distractor Crafting Cards */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            3. Thiết Kế 3 Phương Án Nhiễu Theo 4 Cơ Chế Bẫy Cambridge:
          </span>

          {distractorDrafts.map((draft, idx) => {
            const blueprint = DISTRACTOR_BLUEPRINTS[draft.type];

            return (
              <div
                key={draft.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-300">
                    Distractor #{idx + 1}:
                  </span>

                  {/* Blueprint Selector */}
                  <select
                    value={draft.type}
                    onChange={(e) => onUpdateDistractorType(draft.id, e.target.value as DistractorMechanism)}
                    className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1 text-indigo-300 focus:outline-none focus:border-indigo-500"
                  >
                    {(Object.keys(DISTRACTOR_BLUEPRINTS) as DistractorMechanism[]).map((t) => (
                      <option key={t} value={t}>
                        {DISTRACTOR_BLUEPRINTS[t].labelVi} ({DISTRACTOR_BLUEPRINTS[t].labelEn})
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  rows={2}
                  value={draft.text}
                  onChange={(e) => onUpdateDistractorText(draft.id, e.target.value)}
                  placeholder={`Viết phương án bẫy theo cơ chế ${blueprint.labelVi}...`}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-serif"
                />

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full bg-${blueprint.colorClass}-400`} />
                  <span>{blueprint.examinerTrickVi}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Button */}
        <button
          onClick={onEvaluate}
          disabled={!keyInput.trim() || distractorDrafts.some((d) => !d.text.trim())}
          className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Thẩm Định Độ Hiểm Hóc Khảo Thí (Psychometric Trap Audit)
        </button>
      </div>
    </div>
  );
};
