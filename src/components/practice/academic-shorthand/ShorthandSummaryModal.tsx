"use client";

import React from "react";
import { ShorthandQuestion, Section4Lecture } from "@/data/mockShorthandLecturesData";
import { AnswerValidationResult } from "@/lib/shorthandLexiconEngine";
import { X, Award, CheckCircle2, XCircle, AlertTriangle, Save, Sparkles, BookOpen } from "lucide-react";

interface ShorthandSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecture: Section4Lecture;
  gradingResults: { question: ShorthandQuestion; validation: AnswerValidationResult }[];
  totalScore: number;
  onSaveToDatabase: () => void;
  isSaved: boolean;
}

export const ShorthandSummaryModal: React.FC<ShorthandSummaryModalProps> = ({
  isOpen,
  onClose,
  lecture,
  gradingResults,
  totalScore,
  onSaveToDatabase,
  isSaved
}) => {
  if (!isOpen) return null;

  const maxQuestions = lecture.questions.length;
  const accuracyPct = Math.round((totalScore / maxQuestions) * 100);
  const estimatedBand = Number(((totalScore / maxQuestions) * 9).toFixed(1));

  const singularPluralErrors = gradingResults.filter(
    (r) => r.validation.errorClassification === "singular_plural"
  );
  const distractorErrors = gradingResults.filter(
    (r) => r.validation.errorClassification === "distractor_trap"
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Section 4 Shorthand &amp; Reconstruction Diagnostic
              </h2>
              <span className="text-xs text-slate-400">{lecture.title}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/80 to-indigo-950/80 border border-cyan-500/40 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">
              Điểm Section 4
            </span>
            <span className="text-3xl font-extrabold text-cyan-100 font-mono mt-1">
              {totalScore}/{maxQuestions}
            </span>
            <span className="text-xs text-cyan-400 font-medium">({accuracyPct}% chính xác)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Bẫy Số Ít / Số Nhiều (-s/-es)
            </span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-1">
              {singularPluralErrors.length} lỗi
            </span>
            <span className="text-[11px] text-slate-500">Killer Trap Section 4</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Quy Đổi Band Điểm
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              Band {estimatedBand}
            </span>
            <span className="text-[11px] text-slate-500">Mục tiêu: Band 7.5+</span>
          </div>
        </div>

        {/* Question-by-Question Detailed Feedback */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Chi Tiết Chẩn Đoán Từng Câu Hỏi
          </h4>

          <div className="space-y-2.5">
            {gradingResults.map(({ question, validation }) => {
              const isCorrect = validation.isCorrect;
              return (
                <div
                  key={question.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                    isCorrect
                      ? "bg-emerald-950/30 border-emerald-500/30"
                      : "bg-rose-950/30 border-rose-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span className="font-semibold text-slate-200">
                        Q{question.questionNumber}: {question.sectionContext}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        isCorrect
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {validation.errorClassification.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-[11px] font-mono pt-1">
                    <span className="text-slate-400">
                      Bạn đã điền:{" "}
                      <strong className={isCorrect ? "text-emerald-300" : "text-rose-300"}>
                        {validation.userAnswer || "(Chưa điền)"}
                      </strong>
                    </span>
                    <span className="text-slate-400">
                      Đáp án chuẩn: <strong className="text-emerald-400">{question.expectedAnswer}</strong>
                    </span>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed pt-0.5">
                    {validation.diagnosticExplanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Model Shorthand Comparison */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sổ Tốc Ký Mẫu Chuẩn Khảo Thí (Model Shorthand Notes):</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-300 font-mono">
            {lecture.modelShorthandSheet.bulletPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-cyan-400">&bull;</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={onSaveToDatabase}
            disabled={isSaved}
            className={`px-5 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center gap-2 ${
              isSaved
                ? "bg-emerald-600 text-white cursor-default"
                : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? "Đã Lưu Vào Lộ Trình & Error Bank" : "Lưu Kết Quả Luyện Tập"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
