'use client';

import React from 'react';
import { ChannelState, ChaosChannelType } from '@/lib/spatialAudioChaosMixer';
import {
  Sliders,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Zap,
  RotateCcw
} from 'lucide-react';

interface MultiChannelNoiseRackProps {
  channels: ChannelState[];
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
  onUpdateVolume: (ch: ChaosChannelType, vol: number) => void;
  onToggleMute: (ch: ChaosChannelType) => void;
  autoInoculation: boolean;
  onToggleAutoInoculation: () => void;
}

export const MultiChannelNoiseRack: React.FC<MultiChannelNoiseRackProps> = ({
  channels,
  isPlaying,
  onStart,
  onPause,
  onUpdateVolume,
  onToggleMute,
  autoInoculation,
  onToggleAutoInoculation
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-5">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-base font-bold text-white">
              Multi-Channel Acoustic Disturbance Rack (Bàn Mixer Tạp m 4 Kênh)
            </h3>
            <p className="text-xs text-slate-400">
              Web Audio API đa luồng tạo môi trường âm học chân thực của phòng thi máy tính IDP/BC.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Auto Inoculation Mode Toggle */}
          <button
            onClick={onToggleAutoInoculation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              autoInoculation
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg animate-pulse'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {autoInoculation ? 'Inoculation ON (Tạp âm tăng dần)' : 'Inoculation OFF'}
          </button>

          {/* Play/Pause Button */}
          {!isPlaying ? (
            <button
              onClick={onStart}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 shadow-lg transition-all"
            >
              <Play className="w-4 h-4" />
              Bật Audio Phòng Thi
            </button>
          ) : (
            <button
              onClick={onPause}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <Pause className="w-4 h-4 text-rose-400" />
              Tạm Dừng Audio
            </button>
          )}
        </div>
      </div>

      {/* 4-Channel Mixer Faders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map((ch) => {
          const isExam = ch.id === 'exam_audio';
          const volPercent = Math.round(ch.volume * 100);

          return (
            <div
              key={ch.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 ${
                isExam
                  ? 'bg-indigo-950/30 border-indigo-500/40'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate max-w-[130px]">
                  {ch.labelVi}
                </span>
                <button
                  onClick={() => onToggleMute(ch.id)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    ch.isMuted
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'text-slate-400 hover:text-white bg-slate-800'
                  }`}
                  title={ch.isMuted ? 'Bỏ Mute' : 'Mute Kênh'}
                >
                  {ch.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Fader Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Level</span>
                  <span className={isExam ? 'text-indigo-300 font-bold' : 'text-slate-300'}>
                    {ch.isMuted ? 'MUTED' : `${volPercent}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ch.isMuted ? 0 : ch.volume}
                  onChange={(e) => onUpdateVolume(ch.id, parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Animated VU Meter simulation */}
              <div className="flex items-center gap-1 h-2 bg-slate-900 rounded p-0.5 overflow-hidden">
                {[...Array(12)].map((_, i) => {
                  const isActive = isPlaying && !ch.isMuted && (i / 12) < (ch.volume * 0.95);
                  const isPeak = i >= 9;
                  const isWarn = i >= 6 && i < 9;

                  return (
                    <div
                      key={i}
                      className={`flex-1 h-full rounded-xs transition-opacity duration-75 ${
                        isActive
                          ? isPeak
                            ? 'bg-rose-500 opacity-100'
                            : isWarn
                            ? 'bg-amber-400 opacity-100'
                            : 'bg-emerald-400 opacity-100'
                          : 'bg-slate-800 opacity-30'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
