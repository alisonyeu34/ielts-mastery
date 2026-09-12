'use client';

import React from 'react';
import { FileText, CheckCircle, XCircle, AlertCircle, Clock, Volume2 } from 'lucide-react';
import { ChaosExamTrack, ChaosQuestionItem } from '@/data/mockChaosAudioTracksData';

interface ChaosExamQuestionSheetProps {
  track: ChaosExamTrack;
  userAnswers: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
  isSubmitted: boolean;
  elapsedSeconds: number;
}

export const ChaosExamQuestionSheet: React.FC<ChaosExamQuestionSheetProps> = ({
  track,
  userAnswers,
  onAnswerChange,
  isSubmitted,
  elapsedSeconds
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-400 font-mono text-xs font-semibold uppercase">
              {track.cambridgeRef}
            </span>
            <span className="text-xs text-slate-400">{track.topicDomain}</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">{track.title}</h2>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Thời lượng:</span>
            <span className="font-mono font-bold text-white">
              {formatTime(elapsedSeconds)} / {formatTime(track.durationSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-200">
            HƯỚNG DẪN TÁC CHIẾN THÍNH GIÁC (Complete the notes below):
          </p>
          <p className="mt-0.5 text-slate-400">
            Write <strong className="text-amber-300">NO MORE THAN TWO WORDS</strong> for each answer. Chú ý duy trì định vị từ khóa dù âm thanh bị nhiễu do tiếng gõ phím, tiếng ho hay quạt điều hòa.
          </p>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {track.questions.map((q: ChaosQuestionItem) => {
          const userVal = userAnswers[q.id] || '';
          const expected = q.expectedKeyword.toLowerCase();
          const cleanUser = userVal.trim().toLowerCase();
          const isCorrect =
            isSubmitted &&
            (cleanUser === expected || cleanUser.includes(expected) || expected.includes(cleanUser));
          const isWrong = isSubmitted && !isCorrect;

          const isCurrentAudioWindow =
            elapsedSeconds >= q.timestampSec - 5 && elapsedSeconds <= q.timestampSec + 15;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-all ${
                isCurrentAudioWindow
                  ? 'bg-sky-950/30 border-sky-500/50 shadow-md shadow-sky-950/40'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 text-sky-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {q.questionNumber}
                  </span>
                  <div className="space-y-3 flex-1">
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">
                      {q.stem}
                    </p>

                    {/* Input Field */}
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1 max-w-md">
                        <input
                          type="text"
                          value={userVal}
                          disabled={isSubmitted}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          placeholder="Điền từ khóa nghe được..."
                          className={`w-full px-3.5 py-2 rounded-lg text-sm bg-slate-900 border font-medium transition-all ${
                            isSubmitted
                              ? isCorrect
                                ? 'border-emerald-500 text-emerald-300 bg-emerald-950/20'
                                : 'border-red-500 text-red-300 bg-red-950/20'
                              : 'border-slate-700 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                          }`}
                        />
                      </div>

                      {/* Submitted status indicator */}
                      {isSubmitted && (
                        <div className="flex items-center gap-1.5">
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                              <CheckCircle className="w-3.5 h-3.5" /> Chính xác
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
                              <XCircle className="w-3.5 h-3.5" /> Chưa chính xác
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Explanations when submitted */}
                    {isSubmitted && (
                      <div className="mt-3 p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-medium">Đáp án chuẩn:</span>
                          <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {q.expectedKeyword}
                          </span>
                        </div>
                        <div className="text-slate-400 leading-relaxed">
                          <strong className="text-amber-400">Bóc tách lỗ hổng thính giác: </strong>
                          {q.acousticVulnerabilityVi}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timing & Noise Level Badge */}
                <div className="text-right shrink-0 hidden sm:block">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-slate-300">
                    <Volume2 className="w-3 h-3 text-amber-400" />
                    <span>SNR: {q.snrBenchmarkDb}dB</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">
                    Xuất hiện tại: {formatTime(q.timestampSec)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
