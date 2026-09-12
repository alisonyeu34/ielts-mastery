'use client';

import React from 'react';
import { ExamSectionDefinition } from '@/data/mockThreeHourExamPackage';
import { CognitiveTelemetryMetrics } from '@/lib/keystrokeDynamicsEngine';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Clock,
  Layers,
  FileText,
  PenTool,
  Headphones,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

interface ThreeHourSimulationCanvasProps {
  activeSection: ExamSectionDefinition;
  telemetry: CognitiveTelemetryMetrics;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onComplete: () => void;
  onJumpToMinute: (min: number) => void;
  speedMultiplier: number;
  setSpeedMultiplier: (speed: number) => void;
  candidateEssayText: string;
  onEssayChange: (text: string) => void;
  onEssayKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onEssayKeyUp: () => void;
  onTriggerMicroReset: () => void;
}

export const ThreeHourSimulationCanvas: React.FC<ThreeHourSimulationCanvasProps> = ({
  activeSection,
  telemetry,
  isRunning,
  onStart,
  onPause,
  onReset,
  onComplete,
  onJumpToMinute,
  speedMultiplier,
  setSpeedMultiplier,
  candidateEssayText,
  onEssayChange,
  onEssayKeyDown,
  onEssayKeyUp,
  onTriggerMicroReset
}) => {
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWritingSection = telemetry.activeExamSection === 'writing_task1' || telemetry.activeExamSection === 'writing_task2';

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-6">
      {/* Top Header with 180-min Chronometer & Speed Multiplier */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              CD-IELTS 3-HOUR NON-STOP SIMULATOR
            </span>
            <span className="text-xs text-slate-400">
              Phút thứ: {telemetry.elapsedMinutes} / 180
            </span>
          </div>
          <h3 className="text-xl font-black text-white mt-1 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            {formatTime(telemetry.elapsedSeconds)}
          </h3>
        </div>

        {/* Speed Multiplier & Navigation Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-xl p-1">
            {[1, 5, 20].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  speedMultiplier === s
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x Tốc Độ
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {!isRunning ? (
              <button
                onClick={onStart}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                Bắt Đầu
              </button>
            ) : (
              <button
                onClick={onPause}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
              >
                <Pause className="w-3.5 h-3.5" />
                Tạm Dừng
              </button>
            )}

            <button
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-xl hover:bg-slate-800 transition-colors"
              title="Đặt lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4-Stage Timeline Stepper */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { id: 'listening', name: '1. Listening (40p)', icon: Headphones, range: '0 - 40m' },
          { id: 'reading', name: '2. Reading (60p)', icon: FileText, range: '40 - 100m' },
          { id: 'writing_task1', name: '3. Task 1 (20p)', icon: Layers, range: '100 - 120m' },
          { id: 'writing_task2', name: '4. Task 2 (40p)', icon: PenTool, range: '120 - 180m' }
        ].map((st) => {
          const isActive = telemetry.activeExamSection === st.id;
          const Icon = st.icon;

          return (
            <div
              key={st.id}
              className={`p-3 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="text-[10px] font-mono text-slate-400">{st.range}</span>
              </div>
              <div className={`text-xs font-bold mt-1.5 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {st.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Shortcut Timeline Jumper */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-semibold">Nhảy nhanh mốc kiệt sức:</span>
        <button
          onClick={() => onJumpToMinute(0)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          Min 0 (Khởi đầu)
        </button>
        <button
          onClick={() => onJumpToMinute(40)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          Min 40 (Bắt đầu Reading)
        </button>
        <button
          onClick={() => onJumpToMinute(100)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          Min 100 (Bắt đầu Task 1)
        </button>
        <button
          onClick={() => onJumpToMinute(140)}
          className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold hover:bg-rose-500/30"
        >
          Min 140 (Đỉnh Điểm Brain Fog Task 2)
        </button>
      </div>

      {/* Active Section Prompt Box */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-400 uppercase">
            {activeSection.title}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {activeSection.totalQuestionsOrTasks}
          </span>
        </div>
        <p className="text-sm font-serif text-slate-100 leading-relaxed">
          {activeSection.taskPrompt}
        </p>
        <div className="text-xs text-amber-300/90 pt-1 border-t border-slate-800/80">
          <span className="font-bold">Cảnh báo sinh lý học:</span> {activeSection.fatigueRiskDescriptionVi}
        </div>
      </div>

      {/* Live Writing Workspace (With Keystroke Listeners) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            {isWritingSection ? 'Khu Vực Viết Bài (Đang thu thập Keystroke Telemetry)' : 'Mô Phỏng Nhập Liệu Đáp Án'}
          </span>
          <span>
            {candidateEssayText.trim().split(/\s+/).filter(Boolean).length} từ • {telemetry.currentWpm} WPM
          </span>
        </div>

        <textarea
          rows={7}
          value={candidateEssayText}
          onChange={(e) => onEssayChange(e.target.value)}
          onKeyDown={onEssayKeyDown}
          onKeyUp={onEssayKeyUp}
          placeholder="Hãy gõ bài viết hoặc đáp án vào đây... Hệ thống sẽ theo dõi thời gian chuyển ngón (Flight Time), tần suất Backspace và phát hiện dấu hiệu kiệt quệ nhận thức..."
          className="w-full bg-slate-950/90 border border-slate-700 rounded-2xl p-4 text-slate-100 text-sm font-serif leading-relaxed placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
        />
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onTriggerMicroReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
        >
          <Zap className="w-4 h-4" />
          Kích Hoạt Giao Thức Micro-Reset 30s
        </button>

        <button
          onClick={onComplete}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 shadow-lg transition-all"
        >
          Kết Thúc Bài Thi & Xem Báo Cáo Sinh Học
        </button>
      </div>
    </div>
  );
};
