"use client";

import React, { useState } from "react";
import { PALACE_ROOMS, PalaceRoomId, formatTimer } from "@/lib/memoryPalacePacer";
import { MemoryPalacePrompt } from "@/data/mockMemoryPalacePromptsData";

interface SixtySecondPalaceScratchpadProps {
  currentPrompt: MemoryPalacePrompt;
  phase: 'idle' | 'prep' | 'speaking' | 'completed';
  prepTimeRemaining: number;
  activeRoom: PalaceRoomId;
  roomNotes: Record<PalaceRoomId, string[]>;
  onAddKeyword: (roomId: PalaceRoomId, keyword: string) => void;
  onRemoveKeyword: (roomId: PalaceRoomId, index: number) => void;
  onSetActiveRoom: (roomId: PalaceRoomId) => void;
  onOpenSensoryPalette: () => void;
  onOpenFormulaCard: () => void;
  onLoadSamplePlan: () => void;
  onStartPrep: () => void;
  onStartSpeaking: () => void;
}

export const SixtySecondPalaceScratchpad: React.FC<SixtySecondPalaceScratchpadProps> = ({
  currentPrompt,
  phase,
  prepTimeRemaining,
  activeRoom,
  roomNotes,
  onAddKeyword,
  onRemoveKeyword,
  onSetActiveRoom,
  onOpenSensoryPalette,
  onOpenFormulaCard,
  onLoadSamplePlan,
  onStartPrep,
  onStartSpeaking
}) => {
  const [inputValues, setInputValues] = useState<Record<PalaceRoomId, string>>({
    1: "",
    2: "",
    3: "",
    4: ""
  });

  const handleKeyDown = (roomId: PalaceRoomId, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = inputValues[roomId].trim();
      if (val) {
        onAddKeyword(roomId, val);
        setInputValues((prev) => ({ ...prev, [roomId]: "" }));
      }
    }
  };

  const handleAddClick = (roomId: PalaceRoomId) => {
    const val = inputValues[roomId].trim();
    if (val) {
      onAddKeyword(roomId, val);
      setInputValues((prev) => ({ ...prev, [roomId]: "" }));
    }
  };

  const isPrep = phase === 'prep';
  const isSpeaking = phase === 'speaking';
  const isUrgent = isPrep && prepTimeRemaining <= 10;

  return (
    <div className="space-y-6">
      {/* Top Header with Topic and Prep Action Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Speaking Part 2 Cue Card
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {currentPrompt.category}
              </span>
              <span className="text-xs text-amber-400/90 font-medium">
                🎯 Target: 110s - 120s Không Ngắc Ngứ
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {currentPrompt.topic}
            </h2>
          </div>

          {/* Prep Timer & Primary Action Button */}
          <div className="flex items-center gap-3">
            {isPrep && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                isUrgent
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse ring-2 ring-rose-500/50'
                  : 'bg-slate-800/80 border-slate-700 text-slate-200'
              }`}>
                <span className="text-xs font-medium uppercase tracking-wider">Chuẩn bị:</span>
                <span className="font-mono text-xl font-bold">{formatTimer(prepTimeRemaining)}</span>
              </div>
            )}

            {phase === 'idle' && (
              <button
                onClick={onStartPrep}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>⏱️</span>
                <span>Bắt Đầu 60s Chuẩn Bị</span>
              </button>
            )}

            {phase === 'prep' && (
              <button
                onClick={onStartSpeaking}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-amber-950/50 transition-all flex items-center gap-2 animate-pulse active:scale-95"
              >
                <span>🎙️</span>
                <span>Vào Nói Ngay (Bỏ qua đếm ngược)</span>
              </button>
            )}

            <button
              onClick={onLoadSamplePlan}
              className="px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5"
              title="Tải dàn ý mẫu chuẩn C1/C2 vào 4 phòng"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">Dàn Ý Mẫu</span>
            </button>

            <button
              onClick={onOpenFormulaCard}
              className="px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-semibold transition-all flex items-center gap-1.5"
              title="Xem công thức mở đầu và chuyển phòng"
            >
              <span>📖</span>
              <span className="hidden sm:inline">Công Thức C1</span>
            </button>
          </div>
        </div>

        {/* Cambridge Sub-prompts */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
          {currentPrompt.cueCardSubPrompts.map((sub, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span>{sub}</span>
            </div>
          ))}
        </div>

        {/* Prep Progress Bar */}
        {isPrep && (
          <div className="mt-4">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  isUrgent ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${(prepTimeRemaining / 60) * 100}%` }}
              />
            </div>
            {isUrgent && (
              <p className="text-xs text-rose-400 font-semibold mt-1.5 animate-bounce">
                ⚠️ Còn 10 giây! Hãy hoàn thiện nhanh các từ khóa cốt lõi và chuẩn bị bật mic.
              </p>
            )}
          </div>
        )}
      </div>

      {/* 4-Room Interactive Memory Palace Circuit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {PALACE_ROOMS.map((room) => {
          const isActive = activeRoom === room.id;
          const notes = roomNotes[room.id] || [];
          const isFull = notes.length >= 3;

          return (
            <div
              key={room.id}
              onClick={() => onSetActiveRoom(room.id)}
              className={`rounded-2xl border p-5 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? `bg-gradient-to-br ${room.bgGlow} ring-2 ring-indigo-500/50 shadow-2xl scale-[1.01]`
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/90'
              }`}
            >
              {/* Top Room Indicator & Time Range */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{room.icon}</span>
                    <div>
                      <span className="text-xs text-slate-400 font-medium">
                        Phòng {room.id}
                      </span>
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {room.name}
                        {isActive && isSpeaking && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                        )}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${room.badgeColor}`}>
                    {room.timeRange}
                  </span>
                </div>

                <p className="text-xs text-slate-300/80 mb-3 line-clamp-1">
                  {room.subtitle}
                </p>

                {/* Starter phrase peek */}
                <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800 text-[11px] text-slate-300 italic mb-4">
                  <span className="text-indigo-400 font-semibold not-italic">Starter: </span>
                  &ldquo;{room.starterPhrase}&rdquo;
                </div>

                {/* Keyword Badges (Max 3) */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      Từ khóa ghi chú (Tối đa 3):
                    </span>
                    <span className={`text-[11px] font-semibold ${isFull ? 'text-amber-400' : 'text-slate-500'}`}>
                      {notes.length}/3 từ
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[36px] p-2 bg-slate-950/40 rounded-xl border border-slate-800/60">
                    {notes.length === 0 ? (
                      <span className="text-slate-600 text-xs italic self-center">
                        (Chưa có từ khóa. Nhập tối đa 3 cụm từ ngắn gọn...)
                      </span>
                    ) : (
                      notes.map((kw, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-xs font-medium"
                        >
                          <span>{kw}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveKeyword(room.id, idx);
                            }}
                            className="text-indigo-400 hover:text-rose-400 text-xs font-bold ml-1"
                            title="Xóa từ khóa"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Input for new keyword & Room-specific helpers */}
              <div className="space-y-3 pt-3 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    disabled={isFull}
                    value={inputValues[room.id]}
                    onChange={(e) =>
                      setInputValues((prev) => ({
                        ...prev,
                        [room.id]: e.target.value
                      }))
                    }
                    onKeyDown={(e) => handleKeyDown(room.id, e)}
                    placeholder={
                      isFull
                        ? "Đã đủ 3 từ khóa tối đa"
                        : "Nhập từ khóa ngắn rồi nhấn Enter..."
                    }
                    className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-600 disabled:opacity-50"
                  />
                  <button
                    disabled={isFull || !inputValues[room.id].trim()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddClick(room.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-200 border border-slate-700 transition-all"
                  >
                    Thêm
                  </button>
                </div>

                {/* Sensory Palette Trigger specifically for Room 2 */}
                {room.id === 2 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSensoryPalette();
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>🎨</span>
                    <span>Mở Bảng Lưới 5 Giác Quan (Thị/Thính/Xúc/Khứu/Cảm)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
