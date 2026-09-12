"use client";

import React from "react";
import { PALACE_ROOMS, PalaceRoomId, formatTimer, getRoomByTime } from "@/lib/memoryPalacePacer";

interface NarrativePacingChronometerProps {
  speakingTime: number; // 0 - 120 seconds
  isRecording: boolean;
  phase: 'idle' | 'prep' | 'speaking' | 'completed';
}

export const NarrativePacingChronometer: React.FC<NarrativePacingChronometerProps> = ({
  speakingTime,
  isRecording,
  phase
}) => {
  const currentRoomId: PalaceRoomId = getRoomByTime(speakingTime);
  const currentRoom = PALACE_ROOMS.find((r) => r.id === currentRoomId) || PALACE_ROOMS[0];

  const percentage = Math.min(100, (speakingTime / 120) * 100);
  const isSpeaking = phase === 'speaking';
  const isSafeZone = speakingTime >= 105;
  const isEarlyWarning = isSpeaking && speakingTime < 100 && speakingTime >= 85;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 backdrop-blur-md">
      {/* Top Chronometer Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⏱️</span>
            <h3 className="text-base font-bold text-white">
              Thước Đo Nhịp Độ 4 Chặng (2-Minute Narrative Pacing)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Duy trì độc thoại từ 110s đến 120s, phân bổ đều 30s cho từng gian phòng
          </p>
        </div>

        {/* Live Timer Counter */}
        <div className="flex items-center gap-3">
          {isRecording && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Đang Ghi Âm Trực Tiếp</span>
            </div>
          )}

          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block">
              Thời Gian Nói
            </span>
            <span className="font-mono text-2xl font-black text-white tracking-tight">
              {formatTimer(speakingTime)}
              <span className="text-xs text-slate-500 font-normal ml-1.5">/ 02:00</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4-Segment Visual Track */}
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-2">
          {PALACE_ROOMS.map((room) => {
            const isPassed = speakingTime >= room.endSec;
            const isCurrent = speakingTime >= room.startSec && speakingTime < room.endSec && isSpeaking;

            return (
              <div
                key={room.id}
                className={`p-2.5 rounded-xl border transition-all ${
                  isCurrent
                    ? `${room.badgeColor} ring-2 ring-indigo-500/40 shadow-lg scale-[1.02]`
                    : isPassed
                    ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="flex items-center gap-1">
                    <span>{room.icon}</span>
                    <span>Phòng {room.id}</span>
                  </span>
                  <span className="font-mono text-[10px]">{room.timeRange}</span>
                </div>
                <p className="text-[10px] truncate">
                  {room.name.replace('The ', '')}
                </p>
              </div>
            );
          })}
        </div>

        {/* Continuous Progress Bar with Room Milestones */}
        <div className="relative w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              isSafeZone
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400'
                : isSpeaking
                ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400'
                : 'bg-slate-700'
            }`}
            style={{ width: `${percentage}%` }}
          />

          {/* 30s, 60s, 90s, 105s milestone pins */}
          <div className="absolute top-0 left-[25%] w-0.5 h-full bg-slate-700/80" />
          <div className="absolute top-0 left-[50%] w-0.5 h-full bg-slate-700/80" />
          <div className="absolute top-0 left-[75%] w-0.5 h-full bg-slate-700/80" />
          <div className="absolute top-0 left-[87.5%] w-0.5 h-full bg-emerald-500/80" title="105s Safe Zone" />
        </div>
      </div>

      {/* Active Guidance Pill */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-base">{currentRoom.icon}</span>
          <div>
            <span className="font-bold text-white">
              Đang dẫn dắt: {currentRoom.vietnameseTitle}
            </span>
            <p className="text-[11px] text-slate-400">
              {currentRoom.pedagogyNote}
            </p>
          </div>
        </div>

        <div className="self-end sm:self-center">
          {isSafeZone ? (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
              ✅ Đạt Vùng An Toàn (105s+)
            </span>
          ) : isEarlyWarning ? (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold animate-pulse">
              ⚠️ Tiếp tục mở rộng đến 110s!
            </span>
          ) : isSpeaking ? (
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold">
              🎙️ Giữ nhịp ổn định 30s/phòng
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[11px] font-medium">
              Chưa bắt đầu ghi âm
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
