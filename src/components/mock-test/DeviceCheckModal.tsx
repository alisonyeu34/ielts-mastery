"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Headphones,
  Mic,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Maximize2,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceCheckModalProps {
  onStartExam: () => void;
  className?: string;
}

export function DeviceCheckModal({
  onStartExam,
  className,
}: DeviceCheckModalProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTestPassed, setAudioTestPassed] = useState(false);
  const [micTestPassed, setMicTestPassed] = useState(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [isMicTesting, setIsMicTesting] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Test Sound
  const playSampleSound = () => {
    setIsPlayingAudio(true);
    const audio = new Audio("https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg");
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => {
      setIsPlayingAudio(false);
      setAudioTestPassed(true);
    };
  };

  // Test Mic Input
  const startMicTest = async () => {
    try {
      setIsMicTesting(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setMicVolume(Math.min(100, Math.round(avg * 2)));

        if (avg > 15) {
          setMicTestPassed(true);
        }

        if (micStreamRef.current) {
          requestAnimationFrame(checkVolume);
        }
      };

      checkVolume();
    } catch (err) {
      console.error("Mic access denied:", err);
      setIsMicTesting(false);
    }
  };

  const stopMicTest = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsMicTesting(false);
  };

  useEffect(() => {
    return () => {
      stopMicTest();
    };
  }, []);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-7 select-none max-w-2xl mx-auto",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-border/70 pb-4 space-y-1 text-center">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
          Pre-Exam Hardware Verification
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-foreground">
          Kiểm Tra Thiết Bị & Quy Chế Phòng Thi
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Đảm bảo tai nghe và microphone hoạt động hoàn hảo trước khi bước vào phòng thi chính thức.
        </p>
      </div>

      {/* 1. Headphone Audio Test */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <Headphones className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">
                1. Kiểm tra Tai nghe (Audio Output)
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Bấm nút để phát đoạn âm thanh mẫu kiểm tra âm lượng
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={playSampleSound}
            className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Volume2 className="h-3.5 w-3.5" />
            <span>{isPlayingAudio ? "Đang phát..." : "Phát âm thanh"}</span>
          </button>
        </div>

        {audioTestPassed && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
            <CheckCircle2 className="h-4 w-4" />
            <span>Tai nghe đã hoạt động tốt!</span>
          </div>
        )}
      </div>

      {/* 2. Microphone Test */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <Mic className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">
                2. Kiểm tra Microphone (Speaking Input)
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Nói vào mic để kiểm tra vạch sóng âm thu được
              </p>
            </div>
          </div>

          {!isMicTesting ? (
            <button
              type="button"
              onClick={startMicTest}
              className="px-3.5 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Mic className="h-3.5 w-3.5" />
              <span>Bật thử Micro</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopMicTest}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Dừng thử</span>
            </button>
          )}
        </div>

        {/* Mic Volume Level Bar */}
        {isMicTesting && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Cường độ âm thanh thu:</span>
              <span className="font-mono font-bold">{micVolume}%</span>
            </div>
            <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
              <div
                style={{ width: `${micVolume}%` }}
                className={cn(
                  "h-full rounded-full transition-all duration-75",
                  micVolume > 50 ? "bg-emerald-500" : "bg-purple-500"
                )}
              />
            </div>
          </div>
        )}

        {micTestPassed && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
            <CheckCircle2 className="h-4 w-4" />
            <span>Microphone bắt âm thanh rõ ràng!</span>
          </div>
        )}
      </div>

      {/* 3. Strict Exam Rules Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/30 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
          <ShieldAlert className="h-4 w-4" />
          <span>Quy Chế Phòng Thi Computer-Delivered IELTS:</span>
        </div>
        <p className="text-muted-foreground text-[11px] leading-relaxed">
          1. Bài thi sẽ chạy liên tục dưới đồng hồ đếm ngược tiêu chuẩn không thể tạm dừng.
          <br />
          2. Không tải lại trang hoặc mở tab khác trong lúc làm bài để tránh mất kết quả thi.
          <br />
          3. Hệ thống sẽ tự động thu bài và chấm điểm ngay khi đồng hồ về 00:00.
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onStartExam}
          className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Maximize2 className="h-4 w-4" />
          <span>Xác Nhận & Bắt Đầu Bài Thi Thử IELTS ➔</span>
        </button>
      </div>
    </div>
  );
}
