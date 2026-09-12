"use client";

import React from "react";
import { MockSkillType } from "@/hooks/useCDIELTSMockSession";
import {
  Clock,
  Eye,
  EyeOff,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  StickyNote,
  HelpCircle,
  LogOut,
  Send,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CDIELTSHeaderBarProps {
  currentSkill: MockSkillType;
  onSelectSkill: (skill: MockSkillType) => void;
  timeLeftSeconds: number;
  isTimeHidden: boolean;
  isTimeCriticallyLow: boolean;
  onToggleHideTime: () => void;
  notesCount: number;
  onOpenNotes: () => void;
  onOpenHelp: () => void;
  onSubmitCurrentSkill: () => void;
  testCode: string;
  className?: string;
}

export function CDIELTSHeaderBar({
  currentSkill,
  onSelectSkill,
  timeLeftSeconds,
  isTimeHidden,
  isTimeCriticallyLow,
  onToggleHideTime,
  notesCount,
  onOpenNotes,
  onOpenHelp,
  onSubmitCurrentSkill,
  testCode,
  className,
}: CDIELTSHeaderBarProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const getSkillIcon = (skill: MockSkillType) => {
    switch (skill) {
      case "listening":
        return <Headphones className="h-4 w-4" />;
      case "reading":
        return <BookOpen className="h-4 w-4" />;
      case "writing":
        return <PenTool className="h-4 w-4" />;
      case "speaking":
        return <Mic className="h-4 w-4" />;
    }
  };

  const skillsList: Array<{ id: MockSkillType; label: string }> = [
    { id: "listening", label: "Listening" },
    { id: "reading", label: "Reading" },
    { id: "writing", label: "Writing" },
    { id: "speaking", label: "Speaking" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-slate-900 text-white px-4 sm:px-6 py-3 shadow-md select-none",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Candidate Info & Test Code */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 font-black text-white text-xs tracking-wider shadow-sm">
            IELTS
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200">
                Candidate: <strong className="text-white">IELTS Candidate 084</strong>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                ID: VN-2026-7890
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 block">{testCode}</span>
          </div>
        </div>

        {/* 4 Skills Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {skillsList.map((sk) => {
            const isActive = currentSkill === sk.id;
            return (
              <button
                key={sk.id}
                type="button"
                onClick={() => onSelectSkill(sk.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                )}
              >
                {getSkillIcon(sk.id)}
                <span>{sk.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timer & Header Actions */}
        <div className="flex items-center justify-between md:justify-end gap-2.5">
          {/* Digital Timer */}
          <div
            className={cn(
              "px-3 py-1.5 rounded-xl border flex items-center gap-2 font-mono font-extrabold text-xs transition-all",
              isTimeCriticallyLow
                ? "bg-red-950/80 text-red-400 border-red-500/50 animate-pulse shadow-md shadow-red-600/20"
                : timeLeftSeconds <= 600
                ? "bg-amber-950/80 text-amber-400 border-amber-500/50"
                : "bg-slate-800 text-white border-slate-700"
            )}
          >
            <Clock className="h-4 w-4 shrink-0" />
            <span>
              {isTimeHidden ? "Time Left: Hidden" : `${formatTime(timeLeftSeconds)} còn lại`}
            </span>

            <button
              type="button"
              onClick={onToggleHideTime}
              disabled={isTimeCriticallyLow}
              className={cn(
                "p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer",
                isTimeCriticallyLow ? "opacity-30 cursor-not-allowed" : ""
              )}
              title={
                isTimeCriticallyLow
                  ? "Đồng hồ bị khóa hiện trong 5 phút cuối"
                  : isTimeHidden
                  ? "Hiện đồng hồ"
                  : "Ẩn đồng hồ"
              }
            >
              {isTimeHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Notes Drawer Button */}
          <button
            type="button"
            onClick={onOpenNotes}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer relative"
            title="Mở bảng ghi chú phòng thi"
          >
            <StickyNote className="h-4 w-4 text-amber-400" />
            <span className="hidden sm:inline">Notes</span>
            {notesCount > 0 && (
              <span className="h-4 w-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {notesCount}
              </span>
            )}
          </button>

          {/* Help Button */}
          <button
            type="button"
            onClick={onOpenHelp}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            title="Hướng dẫn thi máy CD-IELTS"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* Submit / Finish Skill Button */}
          <button
            type="button"
            onClick={onSubmitCurrentSkill}
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Nộp Bài</span>
          </button>
        </div>
      </div>
    </header>
  );
}
