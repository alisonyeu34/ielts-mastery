'use client';

import React from 'react';
import { MultiAccentTrack } from '@/data/mockExamDayWarmupKit';
import { Headphones, Play, Pause, Radio, Volume2, Globe, Sparkles } from 'lucide-react';

interface AcousticIgnitionPlayerProps {
  tracks: MultiAccentTrack[];
  selectedAccentIndex: number;
  onSelectAccentIndex: (index: number) => void;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export const AcousticIgnitionPlayer: React.FC<AcousticIgnitionPlayerProps> = ({
  tracks,
  selectedAccentIndex,
  onSelectAccentIndex,
  isPlaying,
  onPlay,
  onPause
}) => {
  const currentTrack = tracks[selectedAccentIndex] || tracks[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Khởi Động Thính Giác Đa Ngữ Điệu (3-Min Ear Warm-up)</h3>
            <p className="text-xs text-slate-400">Kích hoạt độ nhạy màng nhĩ trước khi bước vào phòng thi Listening</p>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div>
          {isPlaying ? (
            <button
              type="button"
              onClick={onPause}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-600/30"
            >
              <Pause className="w-4 h-4" />
              Tạm Dừng Nghe
            </button>
          ) : (
            <button
              type="button"
              onClick={onPlay}
              className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-600/30 animate-pulse"
            >
              <Play className="w-4 h-4" />
              Bật Audio Khởi Động
            </button>
          )}
        </div>
      </div>

      {/* Accent Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {tracks.map((t, index) => {
          const isSelected = index === selectedAccentIndex;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectAccentIndex(index)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-950/40 border-sky-500/60 shadow-md shadow-sky-950/40'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${isSelected ? 'text-sky-400' : 'text-slate-300'}`}>
                  {t.accent}
                </span>
                <Radio className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-600'}`} />
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-1">{t.speakerTitle}</p>
            </button>
          );
        })}
      </div>

      {/* Active Track Audio Script & Phonetic Focus */}
      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-sky-400">Audio Script (Đoạn văn khởi động):</span>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic">
            "{currentTrack.audioScript}"
          </p>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
          <span className="font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Trọng tâm ngữ âm cần bắt nhịp:
          </span>
          <p className="text-slate-300 leading-relaxed">
            {currentTrack.phoneticFocusVi}
          </p>
        </div>
      </div>
    </div>
  );
};
